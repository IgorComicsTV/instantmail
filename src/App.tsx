import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { LanguageMenu } from "./components/ui/LanguageMenu";
import { SiteLogo } from "./components/ui/SiteLogo";
import { MailApp } from "./features/mail/MailApp";
import {
  isLanguageCode,
  isTrustPageKey,
  languageOrder,
  languages,
  tenMinuteContent,
  tenMinuteSlug,
  type LanguageCode,
  type LanguageContent,
  type TrustPageKey,
} from "./features/mail/i18n";

type RouteState = {
  language: LanguageCode;
  page: TrustPageKey | "tenMinute" | null;
};

const CANONICAL_ORIGIN = "https://www.instantmail.online";

function readRoute(): RouteState {
  const [first, second] = window.location.pathname.split("/").filter(Boolean);
  const language = isLanguageCode(first) ? first : "en";
  const page =
    second === tenMinuteSlug
      ? "tenMinute"
      : isTrustPageKey(second)
        ? second
        : null;

  return { language, page };
}

function setMeta(name: string, value: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }

  element.content = value;
}

function setPropertyMeta(property: string, value: string) {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.content = value;
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    if (hreflang) {
      element.hreflang = hreflang;
    }
    document.head.appendChild(element);
  }

  element.href = href;
}

function useSeo(content: LanguageContent, page: RouteState["page"]) {
  useEffect(() => {
    const trustPage = page && page !== "tenMinute" ? content.trustPages[page] : null;
    const tenMinutePage = page === "tenMinute" ? tenMinuteContent[content.code] : null;
    const title = tenMinutePage?.title ?? (trustPage ? `${trustPage.title} | Instant Mail` : content.title);
    const description = tenMinutePage?.description ?? trustPage?.description ?? content.description;
    const path = page === "tenMinute"
      ? `/${content.code}/${tenMinuteSlug}`
      : page
        ? `/${content.code}/${page}`
        : `/${content.code}/`;
    const canonical = `${CANONICAL_ORIGIN}${path}`;

    document.documentElement.lang = content.code;
    document.title = title;
    setMeta("description", description);
    setPropertyMeta("og:title", title);
    setPropertyMeta("og:description", description);
    setPropertyMeta("og:url", canonical);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setLink("canonical", canonical);

    languageOrder.forEach((code) => {
      const alternatePath = page === "tenMinute"
        ? `/${code}/${tenMinuteSlug}`
        : page
          ? `/${code}/${page}`
          : `/${code}/`;
      setLink("alternate", `${CANONICAL_ORIGIN}${alternatePath}`, code);
    });
    setLink(
      "alternate",
      page === "tenMinute"
        ? `${CANONICAL_ORIGIN}/en/${tenMinuteSlug}`
        : `${CANONICAL_ORIGIN}/en/`,
      "x-default",
    );
  }, [content, page]);
}

function TrustPage({
  content,
  page,
}: {
  content: LanguageContent;
  page: TrustPageKey;
}) {
  const trustPage = content.trustPages[page];
  const basePath = `/${content.code}`;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a className="flex items-center gap-2.5" href={`${basePath}/`}>
            <SiteLogo className="h-9 w-9" size={36} />
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Instant Mail
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-brand-600" href={`${basePath}/`}>
              {content.nav.inbox}
            </a>
            <a className="transition hover:text-brand-600" href={`${basePath}/about`}>
              {content.footer.about}
            </a>
            <a className="transition hover:text-brand-600" href={`${basePath}/privacy`}>
              {content.footer.privacy}
            </a>
            <a className="transition hover:text-brand-600" href={`${basePath}/terms`}>
              {content.footer.terms}
            </a>
            <a className="transition hover:text-brand-600" href={`${basePath}/contact`}>
              {content.footer.contact}
            </a>
          </nav>
          <LanguageMenu current={content.code} hrefFor={(code) => `/${code}/${page}`} />
        </div>
      </header>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {trustPage.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            {trustPage.description}
          </p>

          <div className="mt-10 space-y-8">
            {trustPage.sections.map((section) => (
              <article
                className="rounded-lg border border-slate-200 bg-white p-5"
                key={section.title}
              >
                <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.after ? <p>{section.after}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-5 text-sm font-medium text-slate-600">
          <a className="hover:text-brand-600" href={`${basePath}/privacy`}>
            {content.footer.privacy}
          </a>
          <a className="hover:text-brand-600" href={`${basePath}/terms`}>
            {content.footer.terms}
          </a>
          <a className="hover:text-brand-600" href={`${basePath}/contact`}>
            {content.footer.contact}
          </a>
          <a className="hover:text-brand-600" href={`${basePath}/about`}>
            {content.footer.about}
          </a>
          <a className="hover:text-brand-600" href={`${basePath}/faq`}>
            {content.footer.faq}
          </a>
        </div>
      </footer>
    </main>
  );
}

export function App() {
  const route = readRoute();
  const content = languages[route.language];
  const tenMinutePage = tenMinuteContent[route.language];
  const tenMinuteMailContent: LanguageContent = {
    ...content,
    title: tenMinutePage.title,
    description: tenMinutePage.description,
    hero: tenMinutePage.hero,
    inbox: tenMinutePage.inbox,
    featuresIntro: tenMinutePage.featuresIntro,
    faqIntro: tenMinutePage.faqIntro,
    aboutIntro: tenMinutePage.aboutIntro,
    features: tenMinutePage.features,
    faqs: tenMinutePage.faqs,
    aboutSections: tenMinutePage.aboutSections,
  };

  useSeo(content, route.page);

  return (
    <>
      {route.page === "tenMinute" ? (
        <MailApp
          content={tenMinuteMailContent}
          basePath={`/${content.code}`}
          languageHrefFor={(code) => `/${code}/${tenMinuteSlug}`}
          storageKey="instantmail.10-minute-session.v1"
          tenMinute={tenMinutePage}
        />
      ) : route.page ? (
        <TrustPage content={content} page={route.page} />
      ) : (
        <MailApp content={content} basePath={`/${content.code}`} />
      )}
      <Analytics />
    </>
  );
}
