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
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PORT = 4319;
const ORIGIN = `http://127.0.0.1:${PORT}`;


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

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      path.join(ROOT, "node_modules/.bin/vite"),
      ["preview", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"],
      { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] },
    );

    let resolved = false;
    const onData = (data) => {
      const text = data.toString();
      process.stderr.write(`[vite preview] ${text}`);
      if (!resolved && /Local:/.test(text)) {
        resolved = true;
        resolve(proc);
      }
    };

    proc.stdout.on("data", onData);
    proc.stderr.on("data", onData);
    proc.on("exit", (code) => {
      if (!resolved) reject(new Error(`vite preview exited early (code ${code})`));
    });

    setTimeout(() => {
      if (!resolved) reject(new Error("Timed out waiting for vite preview to start"));
    }, 20000);
  });
}

async function main() {
  if (!existsSync(DIST)) {
    throw new Error("dist/ not found — run `vite build` before prerendering");
  }

  const routes = await getRoutes();
  console.log(`Prerendering ${routes.length} routes...`);

  let previewProc = await startPreviewServer();
  let previewExited = false;
  previewProc.on("exit", (code, signal) => {
    previewExited = true;
    console.error(`vite preview exited unexpectedly (code ${code}, signal ${signal})`);
  });
  // --no-sandbox: Chromium's own internal sandbox can block loopback
  // networking in sandboxed CI/agent environments, which otherwise makes
  // every page.goto() to the local preview server fail with
  // ERR_CONNECTION_REFUSED even though the server is reachable via curl.
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
      // The preview server has been observed to die mid-crawl under heavy
      // host machine load; restart it transparently rather than failing
      // every remaining route.
      if (previewExited) {
        console.error("Restarting vite preview server...");
        previewExited = false;
        previewProc = await startPreviewServer();
        previewProc.on("exit", (code, signal) => {
          previewExited = true;
          console.error(`vite preview exited unexpectedly (code ${code}, signal ${signal})`);
        });
      }

      await page.goto(`${ORIGIN}${routePath}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      // useSeo() runs in a useEffect after mount and always sets a
      // robots meta tag, so waiting for it confirms the route's real
      // SEO metadata has been written to the DOM before we snapshot it.
      await page.waitForSelector('meta[name="robots"]', { timeout: 10000 });

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

    // A second pass for routes that failed only because they raced the
    // preview server restart above — most of these succeed on retry.
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
    previewProc.kill("SIGKILL");
  }

  console.log(`Prerendered ${ok}/${routes.length} routes.`);
  if (failed.length > 0) {
    console.error("Failed routes:");
    for (const f of failed) console.error(`  ${f.routePath}: ${f.error}`);
  }

  // The spawned preview server's stdio pipes can keep the event loop alive
  // even after it's been killed, so exit explicitly instead of relying on
  // the loop to drain naturally.
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
