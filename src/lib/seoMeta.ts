// Single source of truth for per-route SEO metadata.
//
// This pure module derives every SEO-relevant value (title, description,
// canonical, hreflang alternates, robots directive, JSON-LD) from the same
// content data the app renders. It is consumed in two places:
//
//   1. src/App.tsx (useSeo) — applies the result to the live DOM after the
//      SPA mounts, exactly as before.
//   2. scripts/prerender.mjs — runs in plain Node at build time (no browser)
//      to inject the same values into the static HTML shipped for each route.
//
// Keeping the computation here guarantees the prerendered HTML and the live
// client render can never drift apart.
import {
  isLanguageCode,
  isTrustPageKey,
  languages,
  tenMinuteContent,
  tenMinuteSlug,
  type LanguageCode,
  type TrustPageKey,
} from "../features/mail/i18n";
import {
  isSeoToolSlug,
  seoToolPages,
  type SeoToolSlug,
} from "../features/mail/toolPages";
import {
  getStandaloneToolCopy,
  isStandaloneToolSlug,
  toolsContent,
  type StandaloneToolSlug,
} from "../features/tools/toolsContent";
import {
  getGuide,
  guidesHub,
  isGuideSlug,
  type GuideSlug,
} from "../features/guides/guidesContent";

export const CANONICAL_ORIGIN = "https://www.instantmail.online";

const ADSENSE_INDEX_LANGUAGES: LanguageCode[] = ["en", "pt", "es", "fr"];
const ADSENSE_INDEX_EMAIL_TOOLS: SeoToolSlug[] = [
  "temporary-email",
  "temporary-email-for-verification",
  "temp-mail-for-developers",
  "disposable-email-for-testing",
];
const ADSENSE_INDEX_TOOLS_HUB_LANGUAGES: LanguageCode[] = ["en", "id"];
const ADSENSE_INDEX_TEN_MINUTE_LANGUAGES: LanguageCode[] = ["en", "es", "hi"];
const ADSENSE_INDEX_VERIFICATION_LANGUAGES: LanguageCode[] = ["en", "es", "id"];

export type RouteState = {
  language: LanguageCode;
  hasLanguagePrefix: boolean;
  page: TrustPageKey | "tenMinute" | SeoToolSlug | null;
  toolsPage: "hub" | StandaloneToolSlug | null;
  guidesPage: "hub" | GuideSlug | null;
  isFallbackRoute: boolean;
};

export type SeoAlternate = { hreflang: string; href: string };

export type SeoMeta = {
  lang: LanguageCode;
  title: string;
  description: string;
  robots: string;
  canonical: string;
  alternates: SeoAlternate[];
  jsonLd: unknown[];
};

export function parseRoute(pathname: string): RouteState {
  const [first, second, third] = pathname.split("/").filter(Boolean);
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
    return (
      !hasLanguagePrefix ||
      (toolsPage === "hub" && ADSENSE_INDEX_TOOLS_HUB_LANGUAGES.includes(code))
    );
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
    return ADSENSE_INDEX_TEN_MINUTE_LANGUAGES.includes(code);
  }

  if (page === "temporary-email-for-verification") {
    return ADSENSE_INDEX_VERIFICATION_LANGUAGES.includes(code);
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

export function computeSeoMeta(route: RouteState): SeoMeta {
  const { page, toolsPage, guidesPage, hasLanguagePrefix, isFallbackRoute } = route;
  const content = languages[route.language];

  const trustPage = page && isTrustPageKey(page) ? content.trustPages[page] : null;
  const toolPage = page && isSeoToolSlug(page) ? seoToolPages[page][content.code] : null;
  const tenMinutePage = page === "tenMinute" ? tenMinuteContent[content.code] : null;
  const standaloneTool = toolsPage && toolsPage !== "hub" ? getStandaloneToolCopy(content.code, toolsPage) : null;
  const toolsHub = toolsPage === "hub" ? toolsContent[content.code] : null;
  const guidePage = guidesPage && guidesPage !== "hub" ? getGuide(guidesPage) : null;
  const guideHub = guidesPage === "hub" ? guidesHub : null;

  const title = guidePage ? `${guidePage.title} | Instant Mail Guides` : guideHub?.title ?? standaloneTool?.title ?? toolsHub?.title ?? tenMinutePage?.title ?? toolPage?.title ?? (trustPage ? `${trustPage.title} | Instant Mail` : content.title);
  const description = guidePage?.description ?? guideHub?.description ?? standaloneTool?.description ?? toolsHub?.description ?? tenMinutePage?.description ?? toolPage?.description ?? trustPage?.description ?? content.description;

  // The unprefixed /tools URL *is* the English tools hub, so /en/tools is a
  // pure duplicate of it. Canonicalizing /en/tools to /tools (paired with a
  // 301 in vercel.json) keeps exactly one indexable English hub URL —
  // otherwise GSC reports the pair as "Duplicate/alternate page".
  const toolsPath = toolsPage === "hub"
    ? hasLanguagePrefix && content.code !== "en"
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

  const alternates: SeoAlternate[] = [];
  if (toolsPage === "hub") {
    // The tools hub has exactly two indexable language variants: /tools
    // (English, unprefixed — /en/tools 301s to it) and /id/tools. Emit the
    // bidirectional hreflang pair so the page agrees with the sitemap;
    // one-sided or mismatched hreflang gets ignored by Google.
    alternates.push({ hreflang: "en", href: `${CANONICAL_ORIGIN}/tools` });
    alternates.push({ hreflang: "id", href: `${CANONICAL_ORIGIN}/id/tools` });
  }
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
    alternates.push({ hreflang: code, href: `${CANONICAL_ORIGIN}${alternatePath}` });
  });
  alternates.push({
    hreflang: "x-default",
    href:
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
  });

  return {
    lang: content.code,
    title,
    description,
    robots: isIndexable ? "index, follow" : "noindex, follow",
    canonical,
    alternates,
    jsonLd,
  };
}
