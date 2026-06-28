// Build-time prerendering — browserless.
//
// The app is a client-side SPA: the shipped HTML shell has an empty
// <div id="root"> and the real per-route <head> metadata (title,
// description, canonical, hreflang, robots, JSON-LD) is only applied
// client-side by useSeo after React mounts. Crawlers and clients that don't
// execute JS (Bing, AI/LLM crawlers, social link-preview bots) therefore see
// identical generic metadata on every URL.
//
// This script fixes that without a headless browser: it computes the exact
// same metadata the app would (via the shared src/lib/seoMeta.ts module) and
// injects it directly into a copy of dist/index.html for every route in the
// sitemap, written to dist/<route>/index.html. Vercel serves these static
// files before falling back to the SPA rewrite, so each route now ships
// correct unique metadata in its initial HTML response.
//
// It runs in plain Node (via tsx) with no browser, no local server, and no
// network calls — so it can't fail in a constrained CI/build sandbox the way
// a Chromium-based approach can. Runtime behavior is unchanged: main.tsx
// still hydrates the SPA, which overwrites this head as it does today.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeSeoMeta, parseRoute, type SeoMeta } from "../src/lib/seoMeta";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function jsonLdScript(jsonLd: unknown[]): string {
  // Escape "<" so a value containing "</script>" can't break out of the tag.
  const json = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}

// Replace exactly one occurrence of `regex` in `html`, throwing if it doesn't
// match — that way any drift in the HTML shell fails the build loudly instead
// of silently shipping a page with stale/missing metadata.
function replaceOnce(html: string, regex: RegExp, replacement: string, label: string): string {
  let matched = false;
  const out = html.replace(regex, () => {
    matched = true;
    return replacement;
  });
  if (!matched) {
    throw new Error(`prerender: expected to find ${label} in index.html shell`);
  }
  return out;
}

function injectMeta(shell: string, meta: SeoMeta): string {
  let html = shell;

  html = replaceOnce(html, /<html lang="[^"]*">/, `<html lang="${escapeAttr(meta.lang)}">`, "<html lang>");

  html = replaceOnce(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    "description meta",
  );

  html = replaceOnce(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`,
    "<title>",
  );

  html = replaceOnce(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    "og:title",
  );

  html = replaceOnce(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    "og:description",
  );

  html = replaceOnce(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`,
    "og:url",
  );

  html = replaceOnce(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    "twitter:title",
  );

  html = replaceOnce(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/s,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    "twitter:description",
  );

  html = replaceOnce(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`,
    "canonical link",
  );

  // Replace the single static WebSite JSON-LD block in the shell with the
  // full per-route JSON-LD array (Organization + WebSite + BreadcrumbList,
  // plus Article/FAQPage where applicable).
  html = replaceOnce(
    html,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    jsonLdScript(meta.jsonLd),
    "ld+json block",
  );

  // robots + hreflang alternates aren't in the static shell, so inject them
  // right before </head>.
  const alternates = meta.alternates
    .map((a) => `    <link rel="alternate" hreflang="${escapeAttr(a.hreflang)}" href="${escapeAttr(a.href)}" />`)
    .join("\n");
  const injected = `    <meta name="robots" content="${escapeAttr(meta.robots)}" />\n${alternates}\n  </head>`;
  html = replaceOnce(html, /\s*<\/head>/, `\n${injected}`, "</head>");

  return html;
}

async function getRoutes(): Promise<string[]> {
  const xml = await readFile(path.join(ROOT, "public/sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map((loc) => new URL(loc).pathname);
  return [...new Set(paths)];
}

function outputFileFor(routePath: string): string {
  const withSlash = routePath.endsWith("/") ? routePath : `${routePath}/`;
  return path.join(DIST, withSlash, "index.html");
}

async function main() {
  if (!existsSync(DIST)) {
    throw new Error("dist/ not found — run `vite build` before prerendering");
  }

  const shell = await readFile(path.join(DIST, "index.html"), "utf8");
  const routes = await getRoutes();
  console.log(`Prerendering ${routes.length} routes...`);

  let ok = 0;
  for (const routePath of routes) {
    const meta = computeSeoMeta(parseRoute(routePath));
    const html = injectMeta(shell, meta);
    const outFile = outputFileFor(routePath);
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html);
    ok += 1;
  }

  console.log(`Prerendered ${ok}/${routes.length} routes.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
