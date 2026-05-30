import { SiteLogo } from "./SiteLogo";

type SiteFooterProps = {
  languageCode?: string;
  showProviderNote?: boolean;
};

function localizedPath(languageCode: string | undefined, path: string) {
  const code = languageCode || "en";
  return `/${code}${path}`;
}

export function SiteFooter({ languageCode = "en", showProviderNote = false }: SiteFooterProps) {
  const columns = [
    {
      title: "Product",
      links: [
        { href: localizedPath(languageCode, "/"), label: "Temporary Email" },
        { href: "/tools", label: "Tools" },
        { href: "/guides", label: "Guides" },
      ],
    },
    {
      title: "Tools",
      links: [
        { href: "/tools/email-dns-checker", label: "Email DNS Checker" },
        { href: "/tools/what-is-my-ip", label: "What Is My IP" },
        { href: "/tools/password-generator", label: "Password Generator" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: localizedPath(languageCode, "/about"), label: "About" },
        { href: localizedPath(languageCode, "/contact"), label: "Contact" },
        { href: localizedPath(languageCode, "/privacy"), label: "Privacy Policy" },
        { href: localizedPath(languageCode, "/terms"), label: "Terms of Use" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: localizedPath(languageCode, "/faq"), label: "FAQ" },
        { href: "/safe-use-policy", label: "Safe Use Policy" },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-10 text-slate-700 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <SiteLogo className="h-9 w-9" size={36} />
            <span className="text-lg font-bold text-slate-950">Instant Mail</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
            Free privacy and email tools for safer browsing.
          </p>
          {showProviderNote ? (
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-500">
              Temporary inboxes are powered by third-party providers including{" "}
              <a className="font-semibold text-slate-700 hover:text-blue-700" href="https://mail.tm/" rel="noreferrer" target="_blank">
                Mail.tm
              </a>{" "}
              and Mail.gw. Instant Mail does not sell provider access.
            </p>
          ) : null}
        </div>
        <nav className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Footer navigation">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-bold text-slate-950">{column.title}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a className="transition hover:text-blue-700" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-slate-200 pt-5 text-xs text-slate-500">
        © 2026 Instant Mail. Use temporary inboxes responsibly and keep important accounts on email addresses you control.
      </div>
    </footer>
  );
}
