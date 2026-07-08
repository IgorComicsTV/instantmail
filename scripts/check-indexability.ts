// Sitemap ↔ indexing-signal consistency checker.
//
// Google Search Console keeps reporting mixed-signal exclusions
// ("Excluded by noindex", "Alternate page with proper canonical tag",
// "Duplicate", "Crawled - currently not indexed"). The root cause of the
// first two categories is always the same: the sitemap advertises a URL
// whose own page says "don't index me" (robots noindex) or "the real page
// is elsewhere" (canonical pointing to a different URL). A sitemap must
// only list canonical, indexable URLs — anything else wastes crawl budget
// and teaches Google to distrust the sitemap.
//
// This script runs the app's own SEO logic (src/lib/seoMeta.ts — the same
// module the client and the prerender use) over every <loc> in
// public/sitemap.xml and fails if any URL:
//   1. resolves to robots "noindex", or
//   2. declares a canonical different from its own URL.
//
// It runs as part of postbuild (after prerender), so any future route or
// indexability-rule change that would reintroduce mixed signals fails the
// build loudly instead of silently degrading GSC coverage.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeSeoMeta, parseRoute } from "../src/lib/seoMeta";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

async function main() {
  const xml = await readFile(path.join(ROOT, "public/sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = [...new Set(locs)];

  const problems: string[] = [];

  for (const url of urls) {
    const { pathname } = new URL(url);
    const meta = computeSeoMeta(parseRoute(pathname));

    if (!meta.robots.includes("index,") && !meta.robots.startsWith("index")) {
      problems.push(`NOINDEX in sitemap: ${url} (robots: "${meta.robots}")`);
    }

    // Normalize trailing slash for comparison: the app canonicalizes the
    // home routes with a trailing slash but sub-pages without one.
    const normalize = (value: string) => value.replace(/\/$/, "");
    if (normalize(meta.canonical) !== normalize(url)) {
      problems.push(`CANONICAL MISMATCH: ${url} → canonical ${meta.canonical}`);
    }
  }

  console.log(`Checked ${urls.length} sitemap URLs against seoMeta.`);

  if (problems.length > 0) {
    console.error(`\n${problems.length} indexing-signal conflict(s):`);
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
  }

  console.log("All sitemap URLs are indexable and self-canonical. ✔");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
