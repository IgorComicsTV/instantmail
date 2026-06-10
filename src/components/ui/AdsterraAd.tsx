type BannerPlacement =
  | "leaderboard"
  | "mobile-banner"
  | "medium-banner"
  | "rectangle"
  | "vertical"
  | "skyscraper";
type AdsterraPlacement = BannerPlacement | "responsive-banner";

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
    <script data-cfasync="false" src="https://bashsecret.com/${key}/invoke.js"></script>
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
      ) : (
        <BannerAd placement={placement} />
      )}
    </aside>
  );
}
