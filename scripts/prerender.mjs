// Build-time prerendering: snapshots the built SPA for every route in
// public/sitemap.xml and writes static HTML so crawlers (and any client
// that doesn't execute JS) see the real per-route title, description,
// canonical, hreflang, robots meta, and JSON-LD that the app would
// otherwise only set client-side via useEffect (see src/App.tsx useSeo).
//
// This does NOT change runtime behavior: main.tsx still does
// createRoot(...).render(...), so the live app replaces the prerendered
// markup the instant JS loads, exactly as it does today. Nothing about
// the interactive app (the email inbox, tools, language switching) changes.
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PORT = 4319;
const ORIGIN = `http://127.0.0.1:${PORT}`;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".ico": "image/x-icon",
};

async function getRoutes() {
  const xml = await readFile(path.join(ROOT, "public/sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map((loc) => new URL(loc).pathname);
  return [...new Set(paths)];
}

function outputFileFor(routePath) {
  const withSlash = routePath.endsWith("/") ? routePath : `${routePath}/`;
  return path.join(DIST, withSlash, "index.html");
}

// A minimal static file server standing in for Vercel's static hosting,
// used instead of `vite preview` (an external CLI process) so the crawl has
// no dependency on a third-party tool's startup behavior, logging, or any
// network call it might make — this binds directly to 127.0.0.1 and serves
// only files already in dist/.
function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url, ORIGIN);
        let filePath = path.join(DIST, decodeURIComponent(url.pathname));

        let stats = null;
        try {
          stats = await stat(filePath);
        } catch {
          // Falls through to the SPA-shell fallback below.
        }

        if (!stats || stats.isDirectory()) {
          filePath = path.join(DIST, "index.html");
        }

        const ext = path.extname(filePath);
        res.writeHead(200, { "Content-Type": MIME_TYPES[ext] ?? "application/octet-stream" });
        createReadStream(filePath).pipe(res);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(String(err));
      }
    });

    server.on("error", reject);
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

async function main() {
  if (!existsSync(DIST)) {
    throw new Error("dist/ not found — run `vite build` before prerendering");
  }

  const routes = await getRoutes();
  console.log(`Prerendering ${routes.length} routes...`);

  const server = await startStaticServer();
  // --no-sandbox: Chromium's own internal sandbox can block loopback
  // networking in sandboxed CI/agent environments, which otherwise makes
  // every page.goto() to the local server fail with ERR_CONNECTION_REFUSED
  // even though the server is reachable via curl.
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let ok = 0;
  let failed = [];

  try {
    const page = await browser.newPage();
    // Only same-origin requests are allowed through. This blocks every
    // third-party call the app makes at runtime — ads (AdSense, Adsterra,
    // Monetag), analytics, and the mail.tm/mail.gw APIs used to create/poll
    // a real disposable mailbox. None of that matters for a static SEO
    // snapshot, and skipping it avoids both real side effects (creating
    // live mailboxes) and the page never reaching a quiet network state.
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (req.url().startsWith(ORIGIN)) {
        req.continue();
      } else {
        req.abort();
      }
    });

    const crawlRoute = async (routePath) => {
      await page.goto(`${ORIGIN}${routePath}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      // useSeo() runs in a useEffect after mount and always sets a
      // robots meta tag, so waiting for it confirms the route's real
      // SEO metadata has been written to the DOM before we snapshot it.
      await page.waitForSelector('meta[name="robots"]', { timeout: 15000 });

      const html = await page.content();
      const outFile = outputFileFor(routePath);
      await mkdir(path.dirname(outFile), { recursive: true });
      await writeFile(outFile, html);
    };

    for (const routePath of routes) {
      try {
        await crawlRoute(routePath);
        ok += 1;
      } catch (err) {
        failed.push({ routePath, error: err.message });
      }
    }

    // A second pass for routes that failed transiently (e.g. a slow first
    // load); most of these succeed on retry.
    if (failed.length > 0) {
      const retryList = failed;
      failed = [];
      for (const { routePath } of retryList) {
        try {
          await crawlRoute(routePath);
          ok += 1;
        } catch (err) {
          failed.push({ routePath, error: err.message });
        }
      }
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log(`Prerendered ${ok}/${routes.length} routes.`);
  if (failed.length > 0) {
    console.error("Failed routes:");
    for (const f of failed) console.error(`  ${f.routePath}: ${f.error}`);
  }

  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
