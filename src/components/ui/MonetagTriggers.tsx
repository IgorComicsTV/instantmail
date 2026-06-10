import { useEffect } from "react";

const POPUNDER_SCRIPT_SRC = "https://al5sm.com/tag.min.js";
const PUSH_SCRIPT_SRC = "https://5gvci.com/act/files/tag.min.js?z=11129137";
const POPUNDER_ZONE = "11129136";
const POPUNDER_STORAGE_KEY = "instantmail.monetag.popunder.lastShownAt";
const PUSH_SESSION_KEY = "instantmail.monetag.push.loaded";
const POPUNDER_COOLDOWN_MS = 24 * 60 * 60 * 1000;

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
    // Storage can fail in private browsing; ads should never block site usage.
  }
}

function hasLoadedPushThisSession() {
  try {
    return window.sessionStorage.getItem(PUSH_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markPushLoaded() {
  try {
    window.sessionStorage.setItem(PUSH_SESSION_KEY, "true");
  } catch {
    // Storage can fail in private browsing; ads should never block site usage.
  }
}

function appendScript(src: string, attributes: Record<string, string> = {}) {
  if (document.querySelector(`script[src="${src}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  Object.entries(attributes).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });
  document.body.appendChild(script);
}

function isSensitiveClick(event: Event) {
  const target = event.target instanceof Element ? event.target : null;
  return Boolean(
    target?.closest(
      "[data-email-modal], [data-email-link-warning], [data-attachment-download], .email-content",
    ),
  );
}

export function MonetagTriggers() {
  useEffect(() => {
    const handleInteraction = (event: Event) => {
      if (isSensitiveClick(event)) {
        return;
      }

      if (canRunPopunder()) {
        markPopunderShown();
        appendScript(POPUNDER_SCRIPT_SRC, { "data-zone": POPUNDER_ZONE });
      }

      if (!hasLoadedPushThisSession()) {
        markPushLoaded();
        appendScript(PUSH_SCRIPT_SRC, { "data-cfasync": "false" });
      }

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
