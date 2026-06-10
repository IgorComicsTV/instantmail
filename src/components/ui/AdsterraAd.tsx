import { useEffect, useId, useRef, useState } from "react";

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

let adsterraQueue = Promise.resolve();

function renderAdsterraScript(container: HTMLDivElement, config: { key: string; width: number; height: number }) {
  adsterraQueue = adsterraQueue
    .catch(() => undefined)
    .then(
      () =>
        new Promise<void>((resolve) => {
          if (!container.isConnected) {
            resolve();
            return;
          }

          container.innerHTML = "";

          const adWindow = window as Window & {
            atOptions?: {
              key: string;
              format: "iframe";
              height: number;
              width: number;
              params: Record<string, never>;
            };
          };
          const originalWrite = document.write.bind(document);
          const originalWriteln = document.writeln.bind(document);
          let restored = false;

          const restoreDocumentWrite = () => {
            if (restored) {
              return;
            }

            document.write = originalWrite;
            document.writeln = originalWriteln;
            restored = true;
          };

          document.write = (...markup: string[]) => {
            container.insertAdjacentHTML("beforeend", markup.join(""));
          };
          document.writeln = (...markup: string[]) => {
            container.insertAdjacentHTML("beforeend", `${markup.join("")}\n`);
          };

          adWindow.atOptions = {
            key: config.key,
            format: "iframe",
            height: config.height,
            width: config.width,
            params: {},
          };

          const script = document.createElement("script");
          script.async = false;
          script.dataset.cfasync = "false";
          script.src = `https://bashsecret.com/${config.key}/invoke.js`;
          script.onload = () => {
            window.setTimeout(() => {
              restoreDocumentWrite();
              resolve();
            }, 0);
          };
          script.onerror = () => {
            restoreDocumentWrite();
            resolve();
          };

          container.appendChild(script);

          window.setTimeout(() => {
            restoreDocumentWrite();
            resolve();
          }, 8000);
        }),
    );
}

function BannerAd({ placement }: { placement: BannerPlacement }) {
  const config = bannerAds[placement];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reactId = useId();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    renderAdsterraScript(container, config);

    return () => {
      container.innerHTML = "";
    };
  }, [config, reactId]);

  return (
    <div
      aria-label={`Advertisement ${config.width} by ${config.height}`}
      className="mx-auto block max-w-full overflow-hidden"
      data-adsterra-key={config.key}
      ref={containerRef}
      style={{
        minHeight: config.height,
        maxWidth: "100%",
        width: `${config.width}px`,
      }}
    />
  );
}

function useIsDesktopAd() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia("(min-width: 768px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

export function AdsterraAd({
  className = "",
  placement,
}: {
  className?: string;
  placement: AdsterraPlacement;
}) {
  const isDesktopAd = useIsDesktopAd();

  return (
    <aside className={`adsterra-slot text-center ${className}`} data-nosnippet>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        Advertisement
      </p>
      {placement === "responsive-banner" ? (
        <BannerAd placement={isDesktopAd ? "leaderboard" : "mobile-banner"} />
      ) : (
        <BannerAd placement={placement} />
      )}
    </aside>
  );
}
