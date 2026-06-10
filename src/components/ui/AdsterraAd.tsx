import { useEffect } from "react";

type BannerPlacement =
  | "leaderboard"
  | "mobile-banner"
  | "medium-banner"
  | "rectangle"
  | "vertical"
  | "skyscraper";
type AdsterraPlacement = BannerPlacement | "responsive-banner" | "native";

const bannerAds: Record<BannerPlacement, { key: string; width: number; height: number }> = {
  leaderboard: {
    key: "981438204e65007a763d3505cd20e8eb",
    width: 728,
    height: 90,
  },
  "mobile-banner": {
    key: "670ad2fb45adbab6bf7d30f135606809",
    width: 320,
    height: 50,
  },
  "medium-banner": {
    key: "1aa7733ceb36c0b42fc160c32b1bb1b2",
    width: 468,
    height: 60,
  },
  rectangle: {
    key: "506d4d18913df9f7a267ccc9b420d505",
    width: 300,
    height: 250,
  },
  vertical: {
    key: "819412187cdc265bd1c13f9e9f71765a",
    width: 160,
    height: 300,
  },
  skyscraper: {
    key: "2681963e3a03dc07e22d271577e64de5",
    width: 160,
    height: 600,
  },
};

const nativeContainerId = "container-9bc9c0f51ba1f6928da5346a0b6b4f22";
const popunderScriptSrc = "https://pl29703272.effectivecpmnetwork.com/6b/92/39/6b92393453e67bd4137bbff8749b0a70.js";
const POPUNDER_STORAGE_KEY = "instantmail.adsterra.popunder.lastShownAt";
const POPUNDER_COOLDOWN_MS = 24 * 60 * 60 * 1000;

function bannerSrcDoc({ key, width, height }: { key: string; width: number; height: number }) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <base target="_blank" />
    <style>
      html, body {
        width: ${width}px;
        height: ${height}px;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: transparent;
      }
    </style>
  </head>
  <body>
    <script>
      window.atOptions = {
        key: "${key}",
        format: "iframe",
        height: ${height},
        width: ${width},
        params: {}
      };
    </script>
    <script src="https://www.highperformanceformat.com/${key}/invoke.js"></script>
  </body>
</html>`;
}

function nativeSrcDoc() {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <base target="_blank" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: transparent;
        color: #0f172a;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      #${nativeContainerId} {
        width: 100%;
        min-height: 250px;
      }
    </style>
  </head>
  <body>
    <script async="async" data-cfasync="false" src="https://pl29703273.effectivecpmnetwork.com/9bc9c0f51ba1f6928da5346a0b6b4f22/invoke.js"></script>
    <div id="${nativeContainerId}"></div>
  </body>
</html>`;
}

function AdFrame({
  height,
  srcDoc,
  title,
  width,
}: {
  height: number;
  srcDoc: string;
  title: string;
  width?: number;
}) {
  return (
    <iframe
      className="mx-auto block max-w-full overflow-hidden rounded-lg border-0 bg-transparent"
      height={height}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts"
      scrolling="no"
      srcDoc={srcDoc}
      style={{
        height,
        maxWidth: "100%",
        width: width ? `${width}px` : "100%",
      }}
      title={title}
      width={width}
    />
  );
}

function canRunPopunder() {
  try {
    const lastShownAt = Number(window.localStorage.getItem(POPUNDER_STORAGE_KEY) || "0");
    return !lastShownAt || Date.now() - lastShownAt > POPUNDER_COOLDOWN_MS;
  } catch {
    return true;
  }
}

function markPopunderShown() {
  try {
    window.localStorage.setItem(POPUNDER_STORAGE_KEY, String(Date.now()));
  } catch {
    // If storage is unavailable, avoid breaking the user's interaction.
  }
}

function injectPopunder() {
  if (!canRunPopunder()) {
    return;
  }

  markPopunderShown();
  const script = document.createElement("script");
  script.async = true;
  script.src = popunderScriptSrc;
  script.dataset.instantmailAdsterraPopunder = "true";
  document.body.appendChild(script);
}

export function AdsterraPopunderTrigger() {
  useEffect(() => {
    if (typeof window === "undefined" || !canRunPopunder()) {
      return;
    }

    const handleInteraction = (event: Event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (
        target?.closest(
          "[data-email-modal], [data-email-link-warning], [data-attachment-download], .email-content",
        )
      ) {
        return;
      }

      injectPopunder();
      document.removeEventListener("click", handleInteraction, true);
      document.removeEventListener("keydown", handleInteraction, true);
    };

    document.addEventListener("click", handleInteraction, true);
    document.addEventListener("keydown", handleInteraction, true);

    return () => {
      document.removeEventListener("click", handleInteraction, true);
      document.removeEventListener("keydown", handleInteraction, true);
    };
  }, []);

  return null;
}

function BannerAd({ placement }: { placement: BannerPlacement }) {
  const config = bannerAds[placement];

  return (
    <AdFrame
      height={config.height}
      srcDoc={bannerSrcDoc(config)}
      title={`Advertisement ${config.width} by ${config.height}`}
      width={config.width}
    />
  );
}

export function AdsterraAd({
  className = "",
  placement,
}: {
  className?: string;
  placement: AdsterraPlacement;
}) {
  return (
    <aside className={`adsterra-slot text-center ${className}`} data-nosnippet>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        Advertisement
      </p>
      {placement === "responsive-banner" ? (
        <>
          <div className="hidden md:block">
            <BannerAd placement="leaderboard" />
          </div>
          <div className="md:hidden">
            <BannerAd placement="mobile-banner" />
          </div>
        </>
      ) : placement === "native" ? (
        <AdFrame
          height={300}
          srcDoc={nativeSrcDoc()}
          title="Advertisement"
        />
      ) : (
        <BannerAd placement={placement} />
      )}
    </aside>
  );
}
