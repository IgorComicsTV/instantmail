import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Check from "lucide-react/dist/esm/icons/check.js";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.js";
import Copy from "lucide-react/dist/esm/icons/copy.js";
import Download from "lucide-react/dist/esm/icons/download.js";
import Eye from "lucide-react/dist/esm/icons/eye.js";
import Inbox from "lucide-react/dist/esm/icons/inbox.js";
import Loader2 from "lucide-react/dist/esm/icons/loader-2.js";
import Mail from "lucide-react/dist/esm/icons/mail.js";
import RefreshCw from "lucide-react/dist/esm/icons/refresh-cw.js";
import Trash2 from "lucide-react/dist/esm/icons/trash-2.js";
import X from "lucide-react/dist/esm/icons/x.js";
import {
  createTempEmailWithRandomDomain,
  deleteAccount,
  downloadAttachment,
  getMessage,
  getMessages,
  type MailAttachment,
  type MailMessage,
  type MailMessageSummary,
} from "../../lib/mailtm";
import { LanguageMenu } from "../../components/ui/LanguageMenu";
import { SiteLogo } from "../../components/ui/SiteLogo";
import { ToolsMenu } from "../../components/ui/ToolsMenu";
import { type LanguageCode, type LanguageContent, type TenMinuteContent } from "./i18n";
import { type ToolSlug } from "./toolPages";
import {
  clearSession,
  loadSession,
  mergeReadState,
  saveSession,
  type MailSession,
} from "./storage";

type Status = "idle" | "creating" | "refreshing" | "reading" | "copying";
type MessageModalState = "closed" | "loading" | "ready" | "error";
type MailAppProps = {
  content: LanguageContent;
  basePath: string;
  anchorBasePath?: string;
  languageHrefFor?: (code: LanguageCode) => string;
  storageKey?: string;
  tenMinute?: TenMinuteContent;
  currentToolSlug?: ToolSlug;
};
type PendingEmailLink = {
  displayUrl: string;
  href: string;
  isSafe: boolean;
};

const POLL_INTERVAL_MS = 8000;
const INITIAL_REFRESH_DELAY_MS = 1400;
const TEN_MINUTES_MS = 10 * 60 * 1000;
const MANUAL_REFRESH_COOLDOWN_MS = 5000;
const MAILBOX_CHANGE_COOLDOWN_MS = 5000;

function formatDate(value: string | undefined, locale: string, fallback: string) {
  if (!value) {
    return fallback;
  }

  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

function formatMessageDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatInboxTime(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeParts(value?: string | string[] | null) {
  if (Array.isArray(value)) {
    return value.filter((part) => typeof part === "string" && part.trim());
  }

  if (typeof value === "string" && value.trim()) {
    return [value];
  }

  return [];
}

function htmlToReadableText(value: string) {
  if (typeof DOMParser === "undefined") {
    return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }

  const document = new DOMParser().parseFromString(value, "text/html");
  document
    .querySelectorAll("script, style, iframe, object, embed, meta, link, base")
    .forEach((element) => element.remove());

  return (document.body.textContent || "").replace(/\s+/g, " ").trim();
}

function sanitizeEmailHtml(value: string) {
  if (typeof DOMParser === "undefined") {
    return escapeHtml(value);
  }

  const document = new DOMParser().parseFromString(value, "text/html");
  const blockedTags = [
    "script",
    "iframe",
    "object",
    "embed",
    "form",
    "input",
    "button",
    "style",
    "link",
    "meta",
    "base",
    "title",
  ];

  blockedTags.forEach((tagName) => {
    document.querySelectorAll(tagName).forEach((element) => element.remove());
  });

  document.querySelectorAll("*").forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const attrValue = attribute.value.trim().toLowerCase();

      if (
        name.startsWith("on") ||
        name === "style" ||
        name === "class" ||
        name === "hidden" ||
        name === "aria-hidden" ||
        name === "srcdoc" ||
        attrValue.startsWith("javascript:") ||
        attrValue.startsWith("data:text/html")
      ) {
        element.removeAttribute(attribute.name);
      }
    });

    if (element instanceof HTMLAnchorElement) {
      element.target = "_blank";
      element.rel = "noreferrer noopener";
    }

    if (element instanceof HTMLImageElement) {
      element.loading = "lazy";
      element.decoding = "async";
      element.alt = element.alt || "Email image";

      if (element.src.startsWith("cid:")) {
        element.replaceWith(document.createTextNode("[inline image]"));
      }
    }
  });

  return document.body.innerHTML;
}

function buildEmailPayload(message: MailMessage, summary?: MailMessageSummary) {
  const html = normalizeParts(message.html).join("\n");
  const text = normalizeParts(message.text).join("\n\n").trim();
  const htmlText = html ? htmlToReadableText(html) : "";
  const intro = summary?.intro || message.intro || "";
  const fallbackText = text || htmlText || intro;

  if (html?.trim()) {
    const sanitizedHtml = sanitizeEmailHtml(html);

    if (htmlText || text || intro) {
      return sanitizedHtml;
    }
  }

  if (fallbackText.trim()) {
    return `<pre>${escapeHtml(fallbackText.trim())}</pre>`;
  }

  return `<div class="email-empty-state">
    <h3>This email did not include readable body content.</h3>
    <p>The provider returned the message metadata, but no usable HTML or plain text body.</p>
  </div>`;
}

function formatBytes(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "unknown size";
  }

  if (value < 1024) {
    return `${value} B`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} KB`;
  }

  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

function getAttachments(message?: MailMessage | null) {
  return Array.isArray(message?.attachments) ? message.attachments : [];
}

function formatCountdown(value: number) {
  const safeValue = Math.max(0, value);
  const totalSeconds = Math.ceil(safeValue / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function parseEmailLink(rawHref: string): PendingEmailLink {
  const trimmedHref = rawHref.trim();

  if (!trimmedHref || !/^https?:\/\//i.test(trimmedHref)) {
    return {
      displayUrl: trimmedHref || "Invalid link",
      href: trimmedHref,
      isSafe: false,
    };
  }

  try {
    const url = new URL(trimmedHref);
    const isSafe = url.protocol === "http:" || url.protocol === "https:";

    return {
      displayUrl: url.hostname || url.href,
      href: url.href,
      isSafe,
    };
  } catch {
    return {
      displayUrl: trimmedHref,
      href: trimmedHref,
      isSafe: false,
    };
  }
}

export function MailApp({
  content: t,
  basePath,
  anchorBasePath = `${basePath}/`,
  languageHrefFor,
  storageKey,
  tenMinute,
  currentToolSlug,
}: MailAppProps) {
  const [session, setSession] = useState<MailSession | null>(() =>
    loadSession(storageKey),
  );
  const [messages, setMessages] = useState<MailMessageSummary[]>([]);
  const [activeMessageSummary, setActiveMessageSummary] =
    useState<MailMessageSummary | null>(null);
  const [activeMessageDetail, setActiveMessageDetail] = useState<MailMessage | null>(
    null,
  );
  const [messageModalState, setMessageModalState] =
    useState<MessageModalState>("closed");
  const [messageModalError, setMessageModalError] = useState<string | null>(null);
  const [pendingEmailLink, setPendingEmailLink] = useState<PendingEmailLink | null>(
    null,
  );
  const [attachmentStatus, setAttachmentStatus] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [now, setNow] = useState(() => Date.now());
  const [refreshCooldownUntil, setRefreshCooldownUntil] = useState(() => {
    const lastManualRefreshAt = loadSession(storageKey)?.lastManualRefreshAt;
    return lastManualRefreshAt
      ? Date.parse(lastManualRefreshAt) + MANUAL_REFRESH_COOLDOWN_MS
      : 0;
  });
  const [changeCooldownUntil, setChangeCooldownUntil] = useState(() => {
    const lastMailboxChangeAt = loadSession(storageKey)?.lastMailboxChangeAt;
    return lastMailboxChangeAt
      ? Date.parse(lastMailboxChangeAt) + MAILBOX_CHANGE_COOLDOWN_MS
      : 0;
  });
  const createInFlight = useRef(false);
  const refreshInFlight = useRef(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const isBusy = status !== "idle";
  const hasTenMinuteMode = Boolean(tenMinute);
  const expiresAtTime = session?.expiresAt ? Date.parse(session.expiresAt) : 0;
  const remainingMs = expiresAtTime ? Math.max(0, expiresAtTime - now) : 0;
  const isRefreshCoolingDown = refreshCooldownUntil > now;
  const isChangeCoolingDown = changeCooldownUntil > now;
  const isRefreshDisabled = !session || isBusy || isRefreshCoolingDown;
  const unreadCount = useMemo(
    () => messages.filter((message) => !message.seen).length,
    [messages],
  );

  const persistSession = useCallback((nextSession: MailSession) => {
    setSession(nextSession);
    saveSession(nextSession, storageKey);
  }, [storageKey]);

  const refreshMessages = useCallback(
    async (activeSession = session, quiet = false) => {
      if (!activeSession || refreshInFlight.current) {
        return;
      }

      refreshInFlight.current = true;

      if (!quiet) {
        setStatus("refreshing");
      }

      try {
        const nextMessages = await getMessages(
          activeSession.token,
          activeSession.providerId,
        );
        const nextSession = {
          ...activeSession,
          lastUpdatedAt: new Date().toISOString(),
        };

        persistSession(nextSession);
        setMessages(mergeReadState(nextMessages, nextSession.readMessageIds));
        setError(null);
      } catch (refreshError) {
        setError(
          refreshError instanceof Error
            ? refreshError.message
            : t.errors.refresh,
        );
      } finally {
        refreshInFlight.current = false;
        if (!quiet) {
          setStatus("idle");
        }
      }
    },
    [persistSession, session, t.errors.refresh],
  );

  const handleManualRefresh = () => {
    if (!session || isBusy || isRefreshCoolingDown) {
      return;
    }

    const lastManualRefreshAt = new Date().toISOString();
    const nextSession = {
      ...session,
      lastManualRefreshAt,
    };

    setRefreshCooldownUntil(Date.parse(lastManualRefreshAt) + MANUAL_REFRESH_COOLDOWN_MS);
    persistSession(nextSession);
    void refreshMessages(nextSession);
  };

  const createMailbox = useCallback(
    async (
      previousSession?: MailSession | null,
      sessionOverrides: Partial<MailSession> = {},
    ) => {
    if (createInFlight.current) {
      return;
    }

    createInFlight.current = true;
    setStatus("creating");
    setError(null);
    setActiveMessageSummary(null);
    setActiveMessageDetail(null);
    setMessageModalState("closed");
    setMessageModalError(null);
    setPendingEmailLink(null);
    setAttachmentStatus({});

    try {
      if (previousSession?.accountId) {
        try {
          await deleteAccount(
            previousSession.token,
            previousSession.accountId,
            previousSession.providerId,
          );
        } catch {
          // Best-effort cleanup only; a failed provider delete should not block a new inbox.
        }
      }

      const { account, address, password, providerId, token } =
        await createTempEmailWithRandomDomain();
      const createdAt = new Date();
      const nextSession: MailSession = {
        accountId: account.id,
        providerId,
        address,
        password,
        token: token.token,
        createdAt: createdAt.toISOString(),
        expiresAt: hasTenMinuteMode
          ? new Date(createdAt.getTime() + TEN_MINUTES_MS).toISOString()
          : undefined,
        readMessageIds: [],
        lastUpdatedAt: new Date().toISOString(),
        ...sessionOverrides,
      };

      persistSession(nextSession);
      setMessages([]);
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : t.errors.create,
      );
    } finally {
      createInFlight.current = false;
      setStatus("idle");
    }
    },
    [hasTenMinuteMode, persistSession, t.errors.create],
  );

  const copyAddress = async () => {
    if (!session?.address) {
      return;
    }

    setStatus("copying");
    try {
      await navigator.clipboard.writeText(session.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError(t.errors.copy);
    } finally {
      setStatus("idle");
    }
  };

  const openMessage = async (message: MailMessageSummary) => {
    if (!session) {
      return;
    }

    setActiveMessageSummary(message);
    setActiveMessageDetail(null);
    setMessageModalState("loading");
    setMessageModalError(null);
    setAttachmentStatus({});
    setStatus("reading");
    setError(null);

    try {
      const detail = await getMessage(session.token, message.id, session.providerId);
      const readMessageIds = Array.from(
        new Set([...session.readMessageIds, message.id]),
      );
      const nextSession = { ...session, readMessageIds };

      persistSession(nextSession);
      setMessages((currentMessages) =>
        currentMessages.map((currentMessage) =>
          currentMessage.id === message.id
            ? { ...currentMessage, seen: true }
            : currentMessage,
        ),
      );
      setActiveMessageDetail({ ...detail, seen: true });
      setActiveMessageSummary({ ...message, seen: true });
      setMessageModalState("ready");
    } catch (readError) {
      setMessageModalError(
        readError instanceof Error
          ? readError.message
          : t.errors.open,
      );
      setMessageModalState("error");
    } finally {
      setStatus("idle");
    }
  };

  const resetMailbox = () => {
    const previousSession = session;
    clearSession(storageKey);
    setSession(null);
    setMessages([]);
    setActiveMessageSummary(null);
    setActiveMessageDetail(null);
    setMessageModalState("closed");
    setMessageModalError(null);
    setPendingEmailLink(null);
    setAttachmentStatus({});
    void createMailbox(previousSession);
  };

  const changeMailbox = () => {
    if (isBusy || isChangeCoolingDown) {
      return;
    }

    const lastMailboxChangeAt = new Date().toISOString();

    setChangeCooldownUntil(Date.parse(lastMailboxChangeAt) + MAILBOX_CHANGE_COOLDOWN_MS);

    const previousSession = session;
    clearSession(storageKey);
    setSession(null);
    setMessages([]);
    setActiveMessageSummary(null);
    setActiveMessageDetail(null);
    setMessageModalState("closed");
    setMessageModalError(null);
    setPendingEmailLink(null);
    setAttachmentStatus({});
    void createMailbox(previousSession, { lastMailboxChangeAt });
  };

  const closeMessage = useCallback(() => {
    setActiveMessageSummary(null);
    setActiveMessageDetail(null);
    setMessageModalState("closed");
    setMessageModalError(null);
    setPendingEmailLink(null);
    setAttachmentStatus({});
  }, []);

  const closeLinkWarning = useCallback(() => {
    setPendingEmailLink(null);
  }, []);

  const retryMessage = () => {
    if (activeMessageSummary) {
      void openMessage(activeMessageSummary);
    }
  };

  const handleAttachmentDownload = async (attachment: MailAttachment) => {
    if (!session?.token) {
      setAttachmentStatus((currentStatus) => ({
        ...currentStatus,
        [attachment.id]: t.errors.noSessionDownload,
      }));
      return;
    }

    setAttachmentStatus((currentStatus) => ({
      ...currentStatus,
      [attachment.id]: t.errors.downloading,
    }));

    try {
      const blob = await downloadAttachment(
        session.token,
        attachment,
        session.providerId,
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = attachment.filename || "attachment";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      setAttachmentStatus((currentStatus) => ({
        ...currentStatus,
        [attachment.id]: t.errors.downloaded,
      }));
    } catch (downloadError) {
      setAttachmentStatus((currentStatus) => ({
        ...currentStatus,
        [attachment.id]:
          downloadError instanceof Error
            ? downloadError.message
            : t.errors.download,
      }));
    }
  };

  const handleEmailContentClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest<HTMLAnchorElement>("a[href]");
    if (!link) {
      return;
    }

    const rawHref = link.getAttribute("href");
    if (rawHref === null) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setPendingEmailLink(parseEmailLink(rawHref));
  };

  const continueToPendingLink = () => {
    if (!pendingEmailLink?.isSafe) {
      return;
    }

    window.open(pendingEmailLink.href, "_blank", "noopener,noreferrer");
    setPendingEmailLink(null);
  };

  const activeMessagePayload = useMemo(() => {
    if (messageModalState !== "ready" || !activeMessageDetail) {
      return "";
    }

    return buildEmailPayload(activeMessageDetail, activeMessageSummary ?? undefined);
  }, [activeMessageDetail, activeMessageSummary, messageModalState]);
  const activeMessageAttachments = useMemo(
    () => getAttachments(activeMessageDetail),
    [activeMessageDetail],
  );
  const activeSenderName =
    activeMessageSummary?.from.name || activeMessageSummary?.from.address || "";
  const activeSenderEmail = activeMessageSummary?.from.address || "";

  useEffect(() => {
    if (!session) {
      void createMailbox();
      return undefined;
    }

    let expiryTimeout: number | undefined;

    if (hasTenMinuteMode && session.expiresAt) {
      const expiresAt = Date.parse(session.expiresAt);

      if (Number.isFinite(expiresAt) && expiresAt <= Date.now()) {
        clearSession(storageKey);
        setSession(null);
        setMessages([]);
        setActiveMessageSummary(null);
        setActiveMessageDetail(null);
        setMessageModalState("closed");
        setMessageModalError(null);
        setPendingEmailLink(null);
        setAttachmentStatus({});
        void createMailbox(session);
        return undefined;
      }

      expiryTimeout = window.setTimeout(() => {
        setNow(Date.now());
        clearSession(storageKey);
        setSession(null);
        setMessages([]);
        setActiveMessageSummary(null);
        setActiveMessageDetail(null);
        setMessageModalState("closed");
        setMessageModalError(null);
        setPendingEmailLink(null);
        setAttachmentStatus({});
        void createMailbox(session);
      }, Math.max(0, expiresAt - Date.now()));
    }

    const firstRefresh = window.setTimeout(() => {
      void refreshMessages(session, true);
    }, INITIAL_REFRESH_DELAY_MS);

    const interval = window.setInterval(() => {
      void refreshMessages(session, true);
    }, POLL_INTERVAL_MS);

    return () => {
      if (expiryTimeout) {
        window.clearTimeout(expiryTimeout);
      }
      window.clearTimeout(firstRefresh);
      window.clearInterval(interval);
    };
  }, [createMailbox, hasTenMinuteMode, refreshMessages, session, storageKey]);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messageModalState === "closed") {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc" || event.code === "Escape") {
        if (pendingEmailLink) {
          closeLinkWarning();
          return;
        }

        closeMessage();
      }
    };

    document.body.style.overflow = "hidden";
    window.setTimeout(() => modalRef.current?.focus(), 0);
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [closeLinkWarning, closeMessage, messageModalState, pendingEmailLink]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a className="flex items-center gap-2.5" href={`${basePath}/`} aria-label="Instant Mail home">
            <SiteLogo className="h-9 w-9" size={36} />
            <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Instant Mail
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-brand-600" href={`${anchorBasePath}#inbox`}>
              {t.nav.inbox}
            </a>
            <a className="transition hover:text-brand-600" href={`${anchorBasePath}#features`}>
              {t.nav.features}
            </a>
            <a className="transition hover:text-brand-600" href={`${anchorBasePath}#faq`}>
              {t.nav.faq}
            </a>
            <a className="transition hover:text-brand-600" href={`${anchorBasePath}#about`}>
              {t.nav.about}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageMenu
              current={t.code}
              hrefFor={languageHrefFor ?? ((code) => `/${code}/`)}
            />
            <ToolsMenu
              currentLanguage={t.code}
              currentSlug={currentToolSlug}
              hrefFor={(slug) => `${basePath}/${slug}`}
            />
          </div>
        </div>
      </header>

      <section className="px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold text-brand-700">
            {t.hero.note}
          </p>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl sm:leading-tight">
            {t.hero.h1Start}
            <span className="text-brand-600">{t.hero.h1Accent}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t.hero.body}
          </p>

          <div className="mx-auto mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <p className="mb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.hero.emailLabel}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <label className="sr-only" htmlFor="current-email">
                {t.hero.emailAria}
              </label>
              <input
                id="current-email"
                readOnly
                value={session?.address ?? t.hero.creatingAddress}
                className="min-h-12 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 text-center text-base font-semibold text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 sm:text-left sm:text-lg"
                aria-live="polite"
              />
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-60"
                disabled={!session || isBusy}
                onClick={copyAddress}
                type="button"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? t.hero.copied : t.hero.copyEmail}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <button
                aria-label="Refresh inbox"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 disabled:opacity-60"
                disabled={isRefreshDisabled}
                onClick={handleManualRefresh}
                title={t.hero.refresh}
                type="button"
              >
                {status === "refreshing" ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <RefreshCw size={16} />
                )}
                {t.hero.refresh}
              </button>
              <button
                aria-label="Generate new email address"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 disabled:opacity-60"
                disabled={isBusy || isChangeCoolingDown}
                onClick={changeMailbox}
                title={t.hero.change}
                type="button"
              >
                <RefreshCw size={16} />
                {t.hero.change}
              </button>
              <button
                aria-label="Delete and create new inbox"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-60"
                disabled={isBusy}
                onClick={resetMailbox}
                title={t.hero.delete}
                type="button"
              >
                <Trash2 size={16} />
                {t.hero.delete}
              </button>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                href="#inbox"
              >
                {t.nav.openInbox}
              </a>
            </div>

            <p className="mt-4 text-left text-xs text-slate-500">
              {status === "creating"
                ? tenMinute?.timer.creatingNew ?? t.hero.creatingStatus
                : t.hero.readyStatus}
            </p>

            {tenMinute ? (
              <div className="mt-4 flex flex-col gap-3 rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-left sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                    {tenMinute.timer.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {tenMinute.timer.responsibleUse}
                  </p>
                </div>
                <p
                  aria-live="polite"
                  className="shrink-0 text-lg font-bold tabular-nums text-brand-700"
                >
                  {session?.expiresAt && remainingMs > 0
                    ? `${tenMinute.timer.expiresIn} ${formatCountdown(remainingMs)}`
                    : status === "creating"
                      ? tenMinute.timer.creatingNew
                      : tenMinute.timer.expired}
                </p>
              </div>
            ) : null}
          </div>

          {error ? (
            <div
              className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-medium text-red-800"
              role="alert"
            >
              {error}
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6" id="inbox">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {t.inbox.label}
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {t.inbox.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {t.inbox.updated}{" "}
                  {formatDate(session?.lastUpdatedAt, t.locale, t.inbox.notUpdated)} ·{" "}
                  {messages.length}{" "}
                  {messages.length === 1
                    ? t.inbox.messageSingular
                    : t.inbox.messagePlural}
                  {unreadCount > 0 ? ` · ${unreadCount} ${t.inbox.unread}` : ""}
                </p>
              </div>
              <button
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-md bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60 sm:self-auto"
                disabled={isRefreshDisabled}
                onClick={handleManualRefresh}
                type="button"
              >
                {status === "refreshing" ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <RefreshCw size={16} />
                )}
                {t.inbox.refreshInbox}
              </button>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <div className="hidden grid-cols-[1.2fr_1.4fr_100px_80px] gap-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
                <span>{t.inbox.sender}</span>
                <span>{t.inbox.subject}</span>
                <span>{t.inbox.time}</span>
                <span className="text-right">{t.inbox.action}</span>
              </div>

              {messages.length === 0 ? (
                <div className="flex min-h-[240px] flex-col items-center justify-center bg-white px-6 py-12 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Inbox aria-hidden="true" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t.inbox.emptyTitle}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                    {t.inbox.emptyBody}
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100 bg-white">
                  {messages.map((message) => (
                    <li key={message.id}>
                      <div className="grid gap-3 px-4 py-4 transition hover:bg-slate-50 md:grid-cols-[1.2fr_1.4fr_100px_80px] md:items-center md:gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {message.from.name || message.from.address}
                          </p>
                          <p className="truncate text-xs text-slate-500 md:hidden">
                            {formatInboxTime(message.createdAt, t.locale)}
                          </p>
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {message.subject || t.inbox.noSubject}
                            {!message.seen ? (
                              <span className="ml-2 inline-flex rounded bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">
                                {t.inbox.new}
                              </span>
                            ) : null}
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                            {message.intro || t.inbox.introFallback}
                          </p>
                        </div>
                        <p className="hidden text-sm text-slate-500 md:block">
                          {formatInboxTime(message.createdAt, t.locale)}
                        </p>
                        <div className="md:text-right">
                          <button
                            className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-brand-600 px-3 text-sm font-semibold text-white transition hover:bg-brand-700 md:w-auto"
                            onClick={() => void openMessage(message)}
                            type="button"
                          >
                            <Eye size={15} />
                            {t.inbox.view}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 px-4 py-16 sm:px-6" id="features">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              {t.featuresIntro.label}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {t.featuresIntro.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {t.featuresIntro.body}
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-200"
                  key={feature.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon aria-hidden="true" size={20} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6" id="faq">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              {t.faqIntro.label}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {t.faqIntro.title}
            </h2>
          </div>
          <div className="mt-8 space-y-2">
            {t.faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <article
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                  key={item.question}
                >
                  <button
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-50 sm:px-5 sm:text-base"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    type="button"
                  >
                    {item.question}
                    <ChevronDown
                      aria-hidden="true"
                      className={`shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}
                      size={18}
                    />
                  </button>
                  {isOpen ? (
                    <p className="border-t border-slate-100 px-4 pb-4 text-sm leading-relaxed text-slate-600 sm:px-5">
                      {item.answer}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 px-4 py-16 sm:px-6" id="about">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            {t.aboutIntro.label}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {t.aboutIntro.title}
          </h2>
          <div className="mt-8 space-y-10">
            {t.aboutSections.map((section) => (
              <article key={section.title}>
                <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="grid gap-2 rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
                      {section.bullets.map((item) => (
                        <li className="flex gap-3" key={item}>
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.after ? <p>{section.after}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <SiteLogo className="h-8 w-8" size={32} />
            <span className="font-bold text-slate-900">Instant Mail</span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm font-medium text-slate-600">
            <a className="transition hover:text-brand-600" href={`${anchorBasePath}#inbox`}>
              {t.nav.inbox}
            </a>
            <a className="transition hover:text-brand-600" href={`${anchorBasePath}#features`}>
              {t.nav.features}
            </a>
            <a className="transition hover:text-brand-600" href={`${anchorBasePath}#faq`}>
              {t.nav.faq}
            </a>
            <a className="transition hover:text-brand-600" href={`${anchorBasePath}#about`}>
              {t.nav.about}
            </a>
            <a className="transition hover:text-brand-600" href={`${basePath}/privacy`}>
              {t.footer.privacy}
            </a>
            <a className="transition hover:text-brand-600" href={`${basePath}/terms`}>
              {t.footer.terms}
            </a>
            <a className="transition hover:text-brand-600" href={`${basePath}/contact`}>
              {t.footer.contact}
            </a>
          </nav>
        </div>
        <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-2 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p>{t.footer.copyright}</p>
          <p>
            {t.footer.poweredPrefix}{" "}
            <a
              className="font-semibold text-brand-600 hover:text-brand-700"
              href="https://mail.tm/"
              rel="noreferrer"
              target="_blank"
            >
              Mail.tm / Mail.gw
            </a>{" "}
            {t.footer.poweredSuffix}
          </p>
        </div>
      </footer>

      {messageModalState !== "closed" && activeMessageSummary ? (
        <div
          aria-labelledby="message-modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 sm:p-6"
          onKeyDown={(event) => {
            if (
              event.key === "Escape" ||
              event.key === "Esc" ||
              event.code === "Escape"
            ) {
              closeMessage();
            }
          }}
          onMouseDown={closeMessage}
          ref={modalRef}
          role="dialog"
          tabIndex={-1}
        >
          <article
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-lg"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="grid gap-4 border-b border-slate-100 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
              <div className="min-w-0">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
                  <p className="truncate text-sm font-semibold text-slate-700">
                    {activeSenderName}
                  </p>
                  {activeSenderEmail && activeSenderEmail !== activeSenderName ? (
                    <p className="truncate text-xs text-slate-500">
                      {activeSenderEmail}
                    </p>
                  ) : null}
                </div>
                <h2
                  className="mt-2 text-xl font-bold leading-tight sm:text-2xl"
                  id="message-modal-title"
                >
                  {activeMessageSummary.subject || t.inbox.noSubject}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {t.modal.received}{" "}
                  {formatMessageDate(activeMessageSummary.createdAt, t.locale)}
                </p>
              </div>
              <button
                aria-label="Close message"
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:self-auto"
                onClick={closeMessage}
                type="button"
              >
                <X size={16} />
                {t.modal.close}
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
              {messageModalState === "loading" ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center rounded-lg bg-slate-50 p-8 text-center">
                  <Loader2
                    aria-hidden="true"
                    className="mb-4 animate-spin text-brand-600"
                    size={36}
                  />
                  <p className="text-lg font-bold text-slate-900">{t.modal.opening}</p>
                  <p className="mt-2 max-w-sm text-sm text-slate-500">
                    {t.modal.fetching}
                  </p>
                </div>
              ) : null}

              {messageModalState === "error" ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center rounded-lg bg-slate-50 p-8 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Mail aria-hidden="true" size={24} />
                  </div>
                  <p className="text-lg font-bold text-slate-900">{t.modal.errorTitle}</p>
                  <p className="mt-2 max-w-md text-sm text-slate-500">
                    {messageModalError ||
                      t.modal.errorFallback}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
                      onClick={retryMessage}
                      type="button"
                    >
                      <RefreshCw size={16} />
                      {t.modal.tryAgain}
                    </button>
                    <button
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      onClick={closeMessage}
                      type="button"
                    >
                      {t.modal.close}
                    </button>
                  </div>
                </div>
              ) : null}

              {messageModalState === "ready" && activeMessageDetail ? (
                <>
                  <div
                    className="email-content min-h-[280px] overflow-auto rounded-lg border border-slate-200 bg-white p-5 sm:p-6"
                    onClickCapture={handleEmailContentClick}
                    dangerouslySetInnerHTML={{
                      __html: activeMessagePayload,
                    }}
                  />

                  {activeMessageAttachments.length > 0 ? (
                    <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
                      <p className="font-semibold text-slate-900">
                        {activeMessageAttachments.length} attachment
                        {" "}
                        {activeMessageAttachments.length === 1
                          ? t.modal.attachment
                          : t.modal.attachments}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {activeMessageAttachments.map((attachment) => (
                          <li
                            className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
                            key={attachment.id}
                          >
                            <div>
                              <p className="font-medium text-slate-900">
                                {attachment.filename || "Unnamed attachment"}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {attachment.contentType || "unknown type"} ·{" "}
                                {formatBytes(attachment.size)}
                              </p>
                              {attachmentStatus[attachment.id] ? (
                                <p className="mt-1 text-xs text-slate-500">
                                  {attachmentStatus[attachment.id]}
                                </p>
                              ) : null}
                            </div>
                            <button
                              className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-brand-600 px-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
                              disabled={
                                !attachment.downloadUrl ||
                                attachmentStatus[attachment.id] === t.errors.downloading
                              }
                              onClick={() => void handleAttachmentDownload(attachment)}
                              type="button"
                            >
                              {attachmentStatus[attachment.id] === t.errors.downloading ? (
                                <Loader2 className="animate-spin" size={15} />
                              ) : (
                                <Download size={15} />
                              )}
                              {t.modal.download}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          </article>

          {pendingEmailLink ? (
            <div
              aria-labelledby="email-link-warning-title"
              aria-modal="true"
              className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4"
              onMouseDown={(event) => {
                event.stopPropagation();
                closeLinkWarning();
              }}
              role="dialog"
            >
              <article
                className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-5 text-slate-900 shadow-lg sm:p-6"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <h3
                  className="text-lg font-bold leading-tight text-slate-950"
                  id="email-link-warning-title"
                >
                  {t.linkWarning.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {t.linkWarning.message}
                </p>
                <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-500">
                    {t.linkWarning.destination}
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-slate-900">
                    {pendingEmailLink.displayUrl}
                  </p>
                </div>
                {!pendingEmailLink.isSafe ? (
                  <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
                    {t.linkWarning.invalidLink}
                  </p>
                ) : null}
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {t.linkWarning.warning}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {t.linkWarning.responsibility}
                </p>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    onClick={closeLinkWarning}
                    type="button"
                  >
                    {t.linkWarning.cancel}
                  </button>
                  <button
                    className="inline-flex h-10 items-center justify-center rounded-md bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!pendingEmailLink.isSafe}
                    onClick={continueToPendingLink}
                    type="button"
                  >
                    {t.linkWarning.continueAnyway}
                  </button>
                </div>
              </article>
            </div>
          ) : null}
        </div>
      ) : null}
    </main>
  );
}
