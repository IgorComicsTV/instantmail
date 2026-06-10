import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import BookOpen from "lucide-react/dist/esm/icons/book-open.js";
import CalendarDays from "lucide-react/dist/esm/icons/calendar-days.js";
import Clock3 from "lucide-react/dist/esm/icons/clock-3.js";
import { AdsterraAd } from "../../components/ui/AdsterraAd";
import { MonetagTriggers } from "../../components/ui/MonetagTriggers";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { SiteLogo } from "../../components/ui/SiteLogo";
import { getGuide, guides, guidesHub, guideSlugs, type Guide, type GuideSlug } from "./guidesContent";

type GuidesAppProps = {
  guide?: GuideSlug | null;
};

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a className="flex items-center gap-2.5" href="/en/" aria-label="Instant Mail home">
          <SiteLogo className="h-9 w-9" size={36} />
          <span className="text-lg font-bold tracking-tight text-white">Instant Mail</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
          <a className="transition hover:text-white" href="/en/">
            Home
          </a>
          <a className="transition hover:text-white" href="/guides">
            Guides
          </a>
          <a className="transition hover:text-white" href="/tools">
            Tools
          </a>
          <a className="transition hover:text-white" href="/safe-use-policy">
            Safe Use
          </a>
          <a className="transition hover:text-white" href="/en/about">
            About
          </a>
          <a className="transition hover:text-white" href="/en/contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <a href={`/guides/${guide.slug}`} className="block">
        <div className="aspect-[16/9] overflow-hidden bg-slate-100">
          <img
            alt={guide.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            src={guide.image}
          />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue-700">
            <span>{guide.category}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{guide.readTime}</span>
          </div>
          <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-950">
            {guide.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {guide.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
            Read guide <ArrowRight size={16} aria-hidden="true" />
          </span>
        </div>
      </a>
    </article>
  );
}

function GuidesHub() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <MonetagTriggers />
      <Header />
      <section className="bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.28),_transparent_34%),linear-gradient(135deg,#020617,#0f172a)] px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-400/10 px-3 py-1 text-sm font-semibold text-blue-200">
            <BookOpen size={16} aria-hidden="true" />
            Instant Mail Guides
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {guidesHub.h1}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {guidesHub.intro}
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guideSlugs.map((slug) => (
            <GuideCard guide={guides[slug]} key={slug} />
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-6xl">
          <AdsterraAd placement="rectangle" />
        </div>
        <div className="mx-auto mt-12 max-w-6xl">
          <AdsterraAd placement="responsive-banner" />
        </div>
      </section>
      <SiteFooter languageCode="en" />
    </main>
  );
}

function MetaRow({ guide }: { guide: Guide }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
      <span>
        By <span className="font-semibold text-slate-700">{guide.author}</span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 size={16} aria-hidden="true" />
        {guide.readTime}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays size={16} aria-hidden="true" />
        Updated {guide.updated}
      </span>
    </div>
  );
}

function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
      />
    </div>
  );
}

function RelatedGuides({ currentSlug }: { currentSlug: GuideSlug }) {
  const relatedMap: Record<GuideSlug, GuideSlug[]> = {
    "what-is-a-temporary-email": [
      "disposable-email-vs-regular-email",
      "is-temporary-email-safe",
      "how-to-create-a-temp-mail-without-registration",
    ],
    "is-temporary-email-safe": [
      "how-to-protect-your-email-address-online",
      "what-is-a-data-breach-and-how-to-prevent-it",
      "what-is-a-temporary-email",
    ],
    "temporary-email-for-verification-codes": [
      "how-to-create-a-temp-mail-without-registration",
      "how-developers-can-test-email-signups",
      "is-temporary-email-safe",
    ],
    "how-to-avoid-spam-emails": [
      "what-is-a-temporary-email",
      "how-to-protect-your-email-address-online",
      "disposable-email-vs-regular-email",
    ],
    "disposable-email-vs-regular-email": [
      "what-is-a-temporary-email",
      "what-is-a-burner-email",
      "how-to-protect-your-email-address-online",
    ],
    "what-is-a-burner-email": [
      "disposable-email-vs-regular-email",
      "is-temporary-email-safe",
      "how-to-avoid-spam-emails",
    ],
    "how-developers-can-test-email-signups": [
      "temporary-email-for-verification-codes",
      "what-is-a-temporary-email",
      "is-temporary-email-safe",
    ],
    "how-to-protect-your-email-address-online": [
      "how-to-avoid-spam-emails",
      "what-is-a-data-breach-and-how-to-prevent-it",
      "is-temporary-email-safe",
    ],
    "what-is-a-data-breach-and-how-to-prevent-it": [
      "how-to-protect-your-email-address-online",
      "how-to-avoid-spam-emails",
      "disposable-email-vs-regular-email",
    ],
    "how-to-create-a-temp-mail-without-registration": [
      "what-is-a-temporary-email",
      "temporary-email-for-verification-codes",
      "is-temporary-email-safe",
    ],
  };
  const related = relatedMap[currentSlug];

  return (
    <section className="mt-12 border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        More practical guides
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {related.map((slug) => {
          const guide = getGuide(slug);
          return (
            <a
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
              href={`/guides/${guide.slug}`}
              key={guide.slug}
            >
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                {guide.category}
              </p>
              <h3 className="mt-2 font-bold text-slate-950">{guide.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {guide.description}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function UsefulLinks() {
  const links = [
    { href: "/en/", label: "Temporary Email Tool" },
    { href: "/tools", label: "All free tools" },
    { href: "/tools/password-generator", label: "Password Generator" },
    { href: "/tools/what-is-my-ip", label: "What Is My IP" },
    { href: "/tools/email-dns-checker", label: "Email DNS Checker" },
  ];

  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-lg font-bold text-slate-950">Useful next steps</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}

function GuideArticle({ slug }: { slug: GuideSlug }) {
  const guide = getGuide(slug);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <MonetagTriggers />
      <Header />
      <article>
        <header className="bg-white px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <a className="text-sm font-bold text-blue-700 hover:text-blue-800" href="/guides">
              Guides
            </a>
            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-blue-700">
              {guide.category}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              {guide.description}
            </p>
            <MetaRow guide={guide} />
          </div>
        </header>

        <section className="px-4 pb-14 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[1fr_180px]">
            <div className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img alt={guide.title} className="aspect-[16/9] w-full object-cover" src={guide.image} />
              </div>

            {guide.videoId ? (
              <VideoEmbed videoId={guide.videoId} title={guide.title} />
            ) : null}

            <AdsterraAd className="mt-8" placement="responsive-banner" />

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="space-y-5 text-base leading-8 text-slate-700">
                {guide.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 space-y-10">
                {guide.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.bullets ? (
                        <ul className="grid gap-2 pl-5">
                          {section.bullets.map((item) => (
                            <li className="list-disc" key={item}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </section>
                ))}
              </div>

              <aside className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <h2 className="text-lg font-bold text-slate-950">Key takeaway</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {guide.takeaway}
                </p>
              </aside>
              <UsefulLinks />
            </div>

            <AdsterraAd className="mt-10" placement="rectangle" />
            <AdsterraAd className="mt-10" placement="responsive-banner" />

              <RelatedGuides currentSlug={slug} />
            </div>
            <aside className="hidden xl:block">
              <div className="sticky top-24">
                <AdsterraAd placement="skyscraper" />
              </div>
            </aside>
          </div>
        </section>
      </article>
      <SiteFooter languageCode="en" />
    </main>
  );
}

export function GuidesApp({ guide }: GuidesAppProps) {
  if (guide) {
    return <GuideArticle slug={guide} />;
  }

  return <GuidesHub />;
}
