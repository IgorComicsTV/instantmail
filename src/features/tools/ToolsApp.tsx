import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type FormEvent,
  type ReactNode,
  type SetStateAction,
} from "react";
import Check from "lucide-react/dist/esm/icons/check.js";
import Copy from "lucide-react/dist/esm/icons/copy.js";
import Fingerprint from "lucide-react/dist/esm/icons/fingerprint.js";
import KeyRound from "lucide-react/dist/esm/icons/key-round.js";
import MailCheck from "lucide-react/dist/esm/icons/mail-check.js";
import RefreshCw from "lucide-react/dist/esm/icons/refresh-cw.js";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check.js";
import type { LucideIcon } from "lucide-react";
import { LanguageMenu } from "../../components/ui/LanguageMenu";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { SiteLogo } from "../../components/ui/SiteLogo";
import { ToolsMenu } from "../../components/ui/ToolsMenu";
import { getToolNavigationItems } from "../mail/toolPages";
import { languages, type LanguageCode } from "../mail/i18n";
import {
  getStandaloneToolCopy,
  standaloneToolSlugs,
  toolsContent,
  type StandaloneToolSlug,
} from "./toolsContent";

type ToolsAppProps = {
  language: LanguageCode;
  tool?: StandaloneToolSlug | null;
  hasLanguagePrefix: boolean;
};

type DnsAnswer = {
  name: string;
  type: number;
  TTL: number;
  data: string;
};

type DnsSection = {
  title: string;
  status: "found" | "missing" | "error";
  records: string[];
  message: string;
};

const toolIcons: Record<StandaloneToolSlug, LucideIcon> = {
  "email-dns-checker": MailCheck,
  "what-is-my-ip": Fingerprint,
  "password-generator": KeyRound,
};

function normalizePath(path: string) {
  return path.replace(/\/{2,}/g, "/");
}

function Header({ language, hasLanguagePrefix, tool }: ToolsAppProps) {
  const basePath = hasLanguagePrefix ? `/${language}` : "";
  const toolsPath = hasLanguagePrefix ? `/${language}/tools` : "/tools";
  const nav = languages[language].nav;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a className="flex items-center gap-2.5" href={normalizePath(`${basePath}/`)}>
          <SiteLogo className="h-9 w-9" size={36} />
          <span className="text-lg font-bold tracking-tight text-white">Instant Mail</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
          <a className="transition hover:text-white" href={normalizePath(`${basePath}/`)}>
            {nav.inbox}
          </a>
          <a className="transition hover:text-white" href={toolsPath}>
            Tools
          </a>
          <a className="transition hover:text-white" href="/guides">
            Guides
          </a>
          <a className="transition hover:text-white" href="/safe-use-policy">
            Safe Use
          </a>
          <a className="transition hover:text-white" href={normalizePath(`${basePath}/#features`)}>
            {nav.features}
          </a>
          <a className="transition hover:text-white" href={normalizePath(`${basePath}/#faq`)}>
            {nav.faq}
          </a>
          <a className="transition hover:text-white" href={normalizePath(`${basePath}/#about`)}>
            {nav.about}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageMenu
            current={language}
            hrefFor={(code) => {
              const localizedToolPath = tool ? `/tools/${tool}` : "/tools";
              if (!hasLanguagePrefix && code === "en") {
                return localizedToolPath;
              }
              return `/${code}${localizedToolPath}`;
            }}
          />
          <ToolsMenu
            currentLanguage={language}
            currentSlug={tool ? `tools/${tool}` : "tools"}
            hrefFor={(slug) => normalizePath(`${basePath}/${slug}`)}
          />
        </div>
      </div>
    </header>
  );
}

function PageShell({
  children,
  language,
  hasLanguagePrefix,
  tool,
}: ToolsAppProps & { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header language={language} hasLanguagePrefix={hasLanguagePrefix} tool={tool} />
      {children}
      <SiteFooter languageCode={language} />
    </main>
  );
}

function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  button,
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  button: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon aria-hidden="true" size={22} />
      </div>
      <h3 className="mt-5 text-lg font-bold">{title}</h3>
      <p className="mt-2 min-h-12 text-sm leading-relaxed text-slate-600">{description}</p>
      <a
        className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
        href={href}
      >
        {button}
      </a>
    </article>
  );
}

function ToolsHub({ language, hasLanguagePrefix }: ToolsAppProps) {
  const content = toolsContent[language];
  const emailBasePath = hasLanguagePrefix ? `/${language}` : "/en";

  return (
    <PageShell language={language} hasLanguagePrefix={hasLanguagePrefix}>
      <section className="bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.35),_transparent_36%),linear-gradient(135deg,#020617,#0f172a)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-blue-300">Instant Mail Tools</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {content.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {content.intro}
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-14 text-slate-950 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight">{content.onlineTools}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {standaloneToolSlugs.map((slug) => {
              const copy = getStandaloneToolCopy(language, slug);
              return (
                <ToolCard
                  button={content.openTool}
                  description={copy.hubDescription}
                  href={hasLanguagePrefix ? `/${language}/tools/${slug}` : `/tools/${slug}`}
                  icon={toolIcons[slug]}
                  key={slug}
                  title={copy.hubTitle}
                />
              );
            })}
          </div>

          <h2 className="mt-14 text-2xl font-bold tracking-tight">{content.temporaryEmailTools}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getToolNavigationItems(language)
              .filter((item) => !item.slug.startsWith("tools"))
              .map((item) => (
                <ToolCard
                  button={content.openTool}
                  description={content.temporaryEmailCardDescription}
                  href={normalizePath(`${emailBasePath}/${item.slug}`)}
                  icon={ShieldCheck}
                  key={item.slug}
                  title={item.label}
                />
              ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function MoreTools({ language, hasLanguagePrefix }: Pick<ToolsAppProps, "language" | "hasLanguagePrefix">) {
  const content = toolsContent[language];
  const emailBasePath = hasLanguagePrefix ? `/${language}` : "/en";

  const links = [
    ...standaloneToolSlugs.map((slug) => ({
      href: hasLanguagePrefix ? `/${language}/tools/${slug}` : `/tools/${slug}`,
      label: getStandaloneToolCopy(language, slug).hubTitle,
    })),
    { href: normalizePath(`${emailBasePath}/`), label: content.homepage },
    ...getToolNavigationItems(language)
      .filter((item) => !item.slug.startsWith("tools"))
      .map((item) => ({
        href: normalizePath(`${emailBasePath}/${item.slug}`),
        label: item.label,
      })),
  ];

  return (
    <section className="border-t border-slate-200 bg-white px-4 py-10 text-slate-950 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-xl font-bold">{content.moreTools}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              href={link.href}
              key={`${link.href}-${link.label}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

async function dnsQuery(name: string, type: string) {
  const response = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`,
    { headers: { Accept: "application/dns-json" } },
  );

  if (!response.ok) {
    throw new Error("DNS request failed");
  }

  return (await response.json()) as { Answer?: DnsAnswer[] };
}

function normalizeDomain(value: string) {
  return value.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "").toLowerCase();
}

function isValidDomain(value: string) {
  return /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,63}$/i.test(value);
}

function EmailDnsChecker({ language, hasLanguagePrefix }: ToolsAppProps) {
  const content = toolsContent[language];
  const dns = content.dns;
  const [domain, setDomain] = useState("");
  const [selector, setSelector] = useState("");
  const [sections, setSections] = useState<DnsSection[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkRecords(event: FormEvent) {
    event.preventDefault();
    const normalizedDomain = normalizeDomain(domain);

    if (!isValidDomain(normalizedDomain)) {
      setError(dns.invalidDomain);
      setSections([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [mx, txt, dmarc, dkim] = await Promise.all([
        dnsQuery(normalizedDomain, "MX"),
        dnsQuery(normalizedDomain, "TXT"),
        dnsQuery(`_dmarc.${normalizedDomain}`, "TXT"),
        selector.trim() ? dnsQuery(`${selector.trim()}._domainkey.${normalizedDomain}`, "TXT") : Promise.resolve(null),
      ]);

      const txtRecords = txt.Answer?.map((answer) => answer.data.split('" "').join("")) ?? [];
      const spfRecords = txtRecords.filter((record) => record.toLowerCase().includes("v=spf1"));
      const dmarcRecords = dmarc.Answer?.map((answer) => answer.data).filter((record) => record.toLowerCase().includes("v=dmarc1")) ?? [];
      const dkimRecords = dkim?.Answer?.map((answer) => answer.data).filter((record) => record.toLowerCase().includes("v=dkim1") || record.includes("p=")) ?? [];

      setSections([
        {
          title: "MX",
          status: mx.Answer?.length ? "found" : "missing",
          records: mx.Answer?.map((answer) => answer.data) ?? [],
          message: mx.Answer?.length ? dns.found : `${dns.missing}: MX`,
        },
        {
          title: "SPF",
          status: spfRecords.length ? "found" : "missing",
          records: spfRecords,
          message: spfRecords.length ? dns.found : `${dns.missing}: SPF`,
        },
        {
          title: "DMARC",
          status: dmarcRecords.length ? "found" : "missing",
          records: dmarcRecords,
          message: dmarcRecords.length ? dns.found : `${dns.missing}: DMARC`,
        },
        ...(selector.trim()
          ? [{
              title: "DKIM",
              status: dkimRecords.length ? "found" as const : "missing" as const,
              records: dkimRecords,
              message: dkimRecords.length ? dns.found : `${dns.missing}: DKIM`,
            }]
          : []),
      ]);
    } catch {
      setError(content.common.error);
      setSections([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPageFrame copy={dns} language={language} hasLanguagePrefix={hasLanguagePrefix}>
      <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_1fr_auto]" onSubmit={checkRecords}>
        <label className="text-sm font-semibold text-slate-700">
          {dns.domainLabel}
          <input className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" onChange={(event) => setDomain(event.target.value)} placeholder={dns.domainPlaceholder} value={domain} />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          {dns.selectorLabel}
          <input className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" onChange={(event) => setSelector(event.target.value)} placeholder={dns.selectorPlaceholder} value={selector} />
        </label>
        <button className="mt-auto h-12 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60" disabled={loading} type="submit">
          {loading ? content.common.loading : dns.checkButton}
        </button>
      </form>
      {error ? <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
      {!sections.length && !error ? (
        <p className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800">
          Enter a domain to check the public email records used for receiving mail and authenticating senders.
        </p>
      ) : null}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={section.title}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${section.status === "found" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {section.message}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {section.records.length ? section.records.map((record) => (
                <code className="block overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs text-slate-700" key={record}>{record}</code>
              )) : <p className="text-sm text-slate-500">{section.message}</p>}
            </div>
          </article>
        ))}
      </div>
      <InfoBlocks title={dns.explanationTitle} body={dns.explanation} sections={dns.sections} />
    </ToolPageFrame>
  );
}

function WhatIsMyIp({ language, hasLanguagePrefix }: ToolsAppProps) {
  const content = toolsContent[language];
  const ip = content.ip;
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const loadIp = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      if (!response.ok) throw new Error("IP request failed");
      const data = (await response.json()) as { ip?: string };
      setValue(data.ip ?? "");
    } catch {
      setError(content.common.error);
    } finally {
      setLoading(false);
    }
  }, [content.common.error]);

  useEffect(() => {
    void loadIp();
  }, [loadIp]);

  async function copyIp() {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <ToolPageFrame copy={ip} language={language} hasLanguagePrefix={hasLanguagePrefix}>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{ip.yourIp}</p>
        <p className="mt-4 break-all text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          {loading ? content.common.loading : value || "--"}
        </p>
        {error ? <p className="mt-4 text-sm font-semibold text-red-600">{error}</p> : null}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="inline-flex h-11 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700" onClick={() => void loadIp()} type="button">
            <RefreshCw size={16} /> {content.common.refresh}
          </button>
          <button className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50" disabled={!value} onClick={() => void copyIp()} type="button">
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? content.common.copied : content.common.copy}
          </button>
        </div>
      </div>
      <InfoBlocks title={ip.explanationTitle} body={ip.explanation} sections={[{ title: ip.privacyTitle, body: ip.privacyNote }]} />
    </ToolPageFrame>
  );
}

function PasswordGenerator({ language, hasLanguagePrefix }: ToolsAppProps) {
  const content = toolsContent[language];
  const password = content.password;
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const pools = useMemo(() => [
    uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
    lowercase ? "abcdefghijklmnopqrstuvwxyz" : "",
    numbers ? "0123456789" : "",
    symbols ? "!@#$%^&*()_+-=[]{};:,.<>?" : "",
  ].filter(Boolean), [lowercase, numbers, symbols, uppercase]);

  const strength = length >= 18 && pools.length >= 3 ? password.strong : length >= 12 && pools.length >= 2 ? password.medium : password.weak;

  const generate = useCallback(() => {
    if (!pools.length) {
      setError(password.chooseOne);
      return;
    }
    const chars = pools.join("");
    const random = new Uint32Array(length);
    crypto.getRandomValues(random);
    setValue(Array.from(random, (number) => chars[number % chars.length]).join(""));
    setError("");
  }, [length, password.chooseOne, pools]);

  useEffect(() => {
    generate();
  }, [generate]);

  async function copyPassword() {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <ToolPageFrame copy={password} language={language} hasLanguagePrefix={hasLanguagePrefix}>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="break-all font-mono text-xl font-bold text-slate-950 sm:text-2xl">{value}</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <label className="text-sm font-semibold text-slate-700">
            {password.length}: {length}
            <input className="mt-3 w-full accent-blue-600" max={64} min={8} onChange={(event) => setLength(Number(event.target.value))} type="range" value={length} />
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              [password.uppercase, uppercase, setUppercase] as const,
              [password.lowercase, lowercase, setLowercase] as const,
              [password.numbers, numbers, setNumbers] as const,
              [password.symbols, symbols, setSymbols] as const,
            ].map(([label, checked, setter]: readonly [string, boolean, Dispatch<SetStateAction<boolean>>]) => (
              <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700" key={String(label)}>
                <input checked={checked} onChange={(event) => setter(event.target.checked)} type="checkbox" />
                {String(label)}
              </label>
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-700">{password.strength}: <span className="text-blue-700">{strength}</span></p>
        {error ? <p className="mt-3 text-sm font-semibold text-red-600">{error}</p> : null}
        <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">{password.localNote}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700" onClick={generate} type="button">{password.generate}</button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50" onClick={() => void copyPassword()} type="button">
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? content.common.copied : content.common.copy}
          </button>
        </div>
      </div>
      <InfoBlocks title={password.explanationTitle} body={password.explanation} sections={[]} />
    </ToolPageFrame>
  );
}

function InfoBlocks({ title, body, sections }: { title: string; body: string; sections: { title: string; body: string }[] }) {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{body}</p>
      {sections.length ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <article className="rounded-xl bg-slate-50 p-4" key={section.title}>
              <h3 className="font-bold text-slate-900">{section.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.body}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ToolTrustAndFaq({
  copy,
}: {
  copy: {
    privacyTitle: string;
    privacyBody: string;
    faqTitle: string;
    faq: { question: string; answer: string }[];
  };
}) {
  return (
    <section className="mt-10 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
      <article className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-xl font-bold text-slate-950">{copy.privacyTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          {copy.privacyBody}
        </p>
      </article>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">{copy.faqTitle}</h2>
        <div className="mt-5 grid gap-4">
          {copy.faq.map((item) => (
            <div className="rounded-xl bg-slate-50 p-4" key={item.question}>
              <h3 className="font-bold text-slate-900">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function ToolPageFrame({
  children,
  copy,
  language,
  hasLanguagePrefix,
}: {
  children: ReactNode;
  copy: {
    toolsLabel: string;
    h1: string;
    description: string;
    privacyTitle: string;
    privacyBody: string;
    faqTitle: string;
    faq: { question: string; answer: string }[];
  };
  language: LanguageCode;
  hasLanguagePrefix: boolean;
}) {
  return (
    <PageShell language={language} hasLanguagePrefix={hasLanguagePrefix}>
      <section className="bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.35),_transparent_36%),linear-gradient(135deg,#020617,#0f172a)] px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-blue-300">{copy.toolsLabel}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{copy.h1}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{copy.description}</p>
        </div>
      </section>
      <section className="bg-slate-50 px-4 py-12 text-slate-950 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {children}
          <ToolTrustAndFaq copy={copy} />
        </div>
      </section>
      <MoreTools language={language} hasLanguagePrefix={hasLanguagePrefix} />
    </PageShell>
  );
}

export function ToolsApp({ language, tool, hasLanguagePrefix }: ToolsAppProps) {
  if (tool === "email-dns-checker") {
    return <EmailDnsChecker language={language} tool={tool} hasLanguagePrefix={hasLanguagePrefix} />;
  }
  if (tool === "what-is-my-ip") {
    return <WhatIsMyIp language={language} tool={tool} hasLanguagePrefix={hasLanguagePrefix} />;
  }
  if (tool === "password-generator") {
    return <PasswordGenerator language={language} tool={tool} hasLanguagePrefix={hasLanguagePrefix} />;
  }
  return <ToolsHub language={language} tool={null} hasLanguagePrefix={hasLanguagePrefix} />;
}
