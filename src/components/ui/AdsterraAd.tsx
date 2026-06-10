type BannerPlacement = "leaderboard" | "mobile-banner" | "rectangle";
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
  rectangle: {
    key: "506d4d18913df9f7a267ccc9b420d505",
    width: 300,
    height: 250,
  },
};

const nativeContainerId = "container-9bc9c0f51ba1f6928da5346a0b6b4f22";

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
