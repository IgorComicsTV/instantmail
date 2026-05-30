import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { LanguageMenu } from "./components/ui/LanguageMenu";
import { SiteFooter } from "./components/ui/SiteFooter";
import { SiteLogo } from "./components/ui/SiteLogo";
import { ToolsMenu } from "./components/ui/ToolsMenu";
import { GuidesApp } from "./features/guides/GuidesApp";
import { getGuide, guidesHub, isGuideSlug, type GuideSlug } from "./features/guides/guidesContent";
import { MailApp } from "./features/mail/MailApp";
import { ToolsApp } from "./features/tools/ToolsApp";
import {
  getStandaloneToolCopy,
  isStandaloneToolSlug,
  toolsContent,
  type StandaloneToolSlug,
} from "./features/tools/toolsContent";
import {
  isLanguageCode,
  isTrustPageKey,
  languages,
  tenMinuteContent,
  tenMinuteSlug,
  type LanguageCode,
  type LanguageContent,
  type TrustPageKey,
} from "./features/mail/i18n";
import { isSeoToolSlug, seoToolPages, type SeoToolSlug, type ToolSlug } from "./features/mail/toolPages";

type RouteState = {
  language: LanguageCode;
  hasLanguagePrefix: boolean;
  page: TrustPageKey | "tenMinute" | SeoToolSlug | null;
  toolsPage: "hub" | StandaloneToolSlug | null;
  guidesPage: "hub" | GuideSlug | null;
  isFallbackRoute: boolean;
};

const CANONICAL_ORIGIN = "https://www.instantmail.online";
const ADSENSE_INDEX_LANGUAGES: LanguageCode[] = ["en", "pt", "es", "fr"];
const ADSENSE_INDEX_EMAIL_TOOLS: SeoToolSlug[] = [
  "temporary-email",
  "temporary-email-for-verification",
  "temp-mail-for-developers",
  "disposable-email-for-testing",
];

function readRoute(): RouteState {
  const [first, second, third] = window.location.pathname.split("/").filter(Boolean);
  const hasLanguagePrefix = isLanguageCode(first);
  const language = hasLanguagePrefix ? first : "en";
  const pageSegment = hasLanguagePrefix ? second : first;
  const toolSegment = hasLanguagePrefix ? third : second;
  const isToolsRoute = pageSegment === "tools";
  const isGuidesRoute = pageSegment === "guides";
  const toolsPage =
    isToolsRoute
      ? toolSegment
        ? isStandaloneToolSlug(toolSegment)
          ? toolSegment
          : null
        : "hub"
      : null;
  const guidesPage =
    isGuidesRoute
      ? toolSegment
        ? isGuideSlug(toolSegment)
          ? toolSegment
          : null
        : "hub"
      : null;
  const page =
    isToolsRoute || isGuidesRoute
      ? null
      : pageSegment === tenMinuteSlug
      ? "tenMinute"
      : isSeoToolSlug(pageSegment)
        ? pageSegment
      : isTrustPageKey(pageSegment)
        ? pageSegment
        : null;
  const isKnownPage =
    !pageSegment ||
    !!toolsPage ||
    !!guidesPage ||
    pageSegment === tenMinuteSlug ||
    isSeoToolSlug(pageSegment) ||
    isTrustPageKey(pageSegment);
  const isFallbackRoute = !!pageSegment && !isKnownPage;

  return { language, hasLanguagePrefix, page, toolsPage, guidesPage, isFallbackRoute };
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

function clearAlternateLinks() {
  document
    .querySelectorAll<HTMLLinkElement>('link[rel="alternate"]')
    .forEach((element) => element.remove());
}

function setJsonLd(id: string, value: unknown) {
  let element = document.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(value);
}

function isAdsenseIndexableRoute(
  code: LanguageCode,
  page: RouteState["page"],
  toolsPage: RouteState["toolsPage"],
  guidesPage: RouteState["guidesPage"],
  hasLanguagePrefix: boolean,
  isFallbackRoute: boolean,
) {
  if (isFallbackRoute) {
    return false;
  }

  if (toolsPage) {
    return !hasLanguagePrefix;
  }

  if (guidesPage) {
    return !hasLanguagePrefix;
  }

  if (!page) {
    return hasLanguagePrefix && ADSENSE_INDEX_LANGUAGES.includes(code);
  }

  if (page === "safe-use-policy") {
    return code === "en" && !hasLanguagePrefix;
  }

  if (isTrustPageKey(page)) {
    return ADSENSE_INDEX_LANGUAGES.includes(code);
  }

  if (page === "tenMinute") {
    return code === "en";
  }

  return code === "en" && ADSENSE_INDEX_EMAIL_TOOLS.includes(page);
}

function getSeoAlternateCodes(
  page: RouteState["page"],
  toolsPage: RouteState["toolsPage"],
  guidesPage: RouteState["guidesPage"],
) {
  if (toolsPage || guidesPage || page === "safe-use-policy") {
    return [] as LanguageCode[];
  }

  if (!page || isTrustPageKey(page)) {
    return ADSENSE_INDEX_LANGUAGES;
  }

  return ["en"] as LanguageCode[];
}

function useSeo(
  content: LanguageContent,
  page: RouteState["page"],
  toolsPage: RouteState["toolsPage"],
  guidesPage: RouteState["guidesPage"],
  hasLanguagePrefix: boolean,
  isFallbackRoute: boolean,
) {
  useEffect(() => {
    const trustPage = page && isTrustPageKey(page) ? content.trustPages[page] : null;
    const toolPage = page && isSeoToolSlug(page) ? seoToolPages[page][content.code] : null;
    const tenMinutePage = page === "tenMinute" ? tenMinuteContent[content.code] : null;
    const standaloneTool = toolsPage && toolsPage !== "hub" ? getStandaloneToolCopy(content.code, toolsPage) : null;
    const toolsHub = toolsPage === "hub" ? toolsContent[content.code] : null;
    const guidePage = guidesPage && guidesPage !== "hub" ? getGuide(guidesPage) : null;
    const guideHub = guidesPage === "hub" ? guidesHub : null;
    const title = guidePage ? `${guidePage.title} | Instant Mail Guides` : guideHub?.title ?? standaloneTool?.title ?? toolsHub?.title ?? tenMinutePage?.title ?? toolPage?.title ?? (trustPage ? `${trustPage.title} | Instant Mail` : content.title);
    const description = guidePage?.description ?? guideHub?.description ?? standaloneTool?.description ?? toolsHub?.description ?? tenMinutePage?.description ?? toolPage?.description ?? trustPage?.description ?? content.description;
    const toolsPath = toolsPage === "hub"
      ? hasLanguagePrefix
        ? `/${content.code}/tools`
        : "/tools"
      : toolsPage
        ? hasLanguagePrefix
          ? `/${content.code}/tools/${toolsPage}`
          : `/tools/${toolsPage}`
        : null;
    const guidesPath = guidesPage === "hub" ? "/guides" : guidesPage ? `/guides/${guidesPage}` : null;
    const trustPath = page === "safe-use-policy" ? "/safe-use-policy" : null;
    const path = guidesPath ?? toolsPath ?? (page === "tenMinute"
      ? `/${content.code}/${tenMinuteSlug}`
      : page
        ? trustPath ?? `/${content.code}/${page}`
        : `/${content.code}/`);
    const canonical = `${CANONICAL_ORIGIN}${path}`;
    const isIndexable = isAdsenseIndexableRoute(
      content.code,
      page,
      toolsPage,
      guidesPage,
      hasLanguagePrefix,
      isFallbackRoute,
    );

    document.documentElement.lang = content.code;
    document.title = title;
    setMeta("description", description);
    setMeta("robots", isIndexable ? "index, follow" : "noindex, follow");
    setPropertyMeta("og:title", title);
    setPropertyMeta("og:description", description);
    setPropertyMeta("og:url", canonical);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setLink("canonical", canonical);

    const jsonLd: unknown[] = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Instant Mail",
        url: CANONICAL_ORIGIN,
        logo: `${CANONICAL_ORIGIN}/instant-mail-icon.png`,
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@instantmail.online",
          contactType: "customer support",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Instant Mail",
        url: CANONICAL_ORIGIN,
        description: languages.en.description,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${CANONICAL_ORIGIN}/en/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: guideHub ? "Guides" : guidePage ? "Guides" : toolsHub ? "Tools" : standaloneTool ? "Tools" : trustPage?.title ?? title,
            item: guideHub || guidePage
              ? `${CANONICAL_ORIGIN}/guides`
              : toolsHub || standaloneTool
                ? `${CANONICAL_ORIGIN}/tools`
                : canonical,
          },
          ...(guidePage
            ? [{
                "@type": "ListItem",
                position: 3,
                name: guidePage.title,
                item: canonical,
              }]
            : standaloneTool
              ? [{
                  "@type": "ListItem",
                  position: 3,
                  name: standaloneTool.h1,
                  item: canonical,
                }]
              : []),
        ],
      },
    ];

    if (guidePage) {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guidePage.title,
        description: guidePage.description,
        image: `${CANONICAL_ORIGIN}${guidePage.image}`,
        author: {
          "@type": "Person",
          name: guidePage.author,
        },
        publisher: {
          "@type": "Organization",
          name: "Instant Mail",
          logo: {
            "@type": "ImageObject",
            url: `${CANONICAL_ORIGIN}/instant-mail-icon.png`,
          },
        },
        dateModified: "2026-05-30",
        datePublished: "2026-05-30",
        mainEntityOfPage: canonical,
      });
    }

    if (page === "faq") {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }

    setJsonLd("instantmail-dynamic-schema", jsonLd);

    clearAlternateLinks();
    getSeoAlternateCodes(page, toolsPage, guidesPage).forEach((code) => {
      const alternatePath = toolsPage === "hub"
        ? `/${code}/tools`
        : toolsPage
          ? `/${code}/tools/${toolsPage}`
        : page === "tenMinute"
        ? `/${code}/${tenMinuteSlug}`
        : page
          ? `/${code}/${page}`
          : `/${code}/`;
      setLink("alternate", `${CANONICAL_ORIGIN}${alternatePath}`, code);
    });
    setLink(
      "alternate",
      guidesPage === "hub"
        ? `${CANONICAL_ORIGIN}/guides`
        : guidesPage
          ? `${CANONICAL_ORIGIN}/guides/${guidesPage}`
      : page === "safe-use-policy"
        ? `${CANONICAL_ORIGIN}/safe-use-policy`
      : toolsPage === "hub"
        ? `${CANONICAL_ORIGIN}/tools`
        : toolsPage
          ? `${CANONICAL_ORIGIN}/tools/${toolsPage}`
      : page === "tenMinute"
        ? `${CANONICAL_ORIGIN}/en/${tenMinuteSlug}`
        : page
          ? `${CANONICAL_ORIGIN}/en/${page}`
        : `${CANONICAL_ORIGIN}/en/`,
      "x-default",
    );
  }, [content, guidesPage, hasLanguagePrefix, isFallbackRoute, page, toolsPage]);
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
          <a className="transition hover:text-brand-600" href={`${basePath}/tools`}>
            Tools
          </a>
            <a className="transition hover:text-brand-600" href="/guides">
              Guides
            </a>
            <a className="transition hover:text-brand-600" href="/safe-use-policy">
              Safe Use
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageMenu current={content.code} hrefFor={(code) => `/${code}/${page}`} />
            <ToolsMenu
              currentLanguage={content.code}
              hrefFor={(slug: ToolSlug) => `${basePath}/${slug}`}
            />
          </div>
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

      <SiteFooter languageCode={content.code} />
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
  let currentSeoToolSlug: SeoToolSlug | null = null;
  if (route.page && isSeoToolSlug(route.page)) {
    currentSeoToolSlug = route.page;
  }
  const seoToolPage = currentSeoToolSlug ? seoToolPages[currentSeoToolSlug][route.language] : null;
  const seoToolMailContent: LanguageContent | null = seoToolPage
    ? {
        ...content,
        title: seoToolPage.title,
        description: seoToolPage.description,
        hero: seoToolPage.hero,
        inbox: seoToolPage.inbox,
        featuresIntro: seoToolPage.featuresIntro,
        faqIntro: seoToolPage.faqIntro,
        aboutIntro: seoToolPage.aboutIntro,
        features: seoToolPage.features,
        faqs: seoToolPage.faqs,
        aboutSections: seoToolPage.aboutSections,
      }
    : null;

  useSeo(
    content,
    route.page,
    route.toolsPage,
    route.guidesPage,
    route.hasLanguagePrefix,
    route.isFallbackRoute,
  );

  return (
    <>
      {route.guidesPage ? (
        <GuidesApp guide={route.guidesPage === "hub" ? null : route.guidesPage} />
      ) : route.toolsPage ? (
        <ToolsApp
          language={route.language}
          tool={route.toolsPage === "hub" ? null : route.toolsPage}
          hasLanguagePrefix={route.hasLanguagePrefix}
        />
      ) : route.page === "tenMinute" ? (
        <MailApp
          content={tenMinuteMailContent}
          basePath={`/${content.code}`}
          anchorBasePath={`/${content.code}/${tenMinuteSlug}`}
          languageHrefFor={(code) => `/${code}/${tenMinuteSlug}`}
          storageKey="instantmail.10-minute-session.v1"
          tenMinute={tenMinutePage}
          currentToolSlug={tenMinuteSlug}
        />
      ) : seoToolMailContent && currentSeoToolSlug ? (
        <MailApp
          content={seoToolMailContent}
          basePath={`/${content.code}`}
          anchorBasePath={`/${content.code}/${currentSeoToolSlug}`}
          languageHrefFor={(code) => `/${code}/${currentSeoToolSlug}`}
          currentToolSlug={currentSeoToolSlug}
        />
      ) : route.page && isTrustPageKey(route.page) ? (
        <TrustPage content={content} page={route.page} />
      ) : (
        <MailApp content={content} basePath={`/${content.code}`} />
      )}
      <Analytics />
    </>
  );
}
