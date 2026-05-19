import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  Download,
  Eye,
  Inbox,
  Loader2,
  Mail,
  RefreshCw,
  Shield,
  Sparkles,
  Trash2,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import {
  createAccount,
  createToken,
  downloadAttachment,
  getDomains,
  getMessage,
  getMessages,
  makeAddress,
  makePassword,
  type MailAttachment,
  type MailMessage,
  type MailMessageSummary,
} from "../../lib/mailtm";
import { SiteLogo } from "../../components/ui/SiteLogo";
import { aboutInstantMailSections } from "./seoContent";
import {
  clearSession,
  loadSession,
  mergeReadState,
  saveSession,
  type MailSession,
} from "./storage";

type Status = "idle" | "creating" | "refreshing" | "reading" | "copying";
type MessageModalState = "closed" | "loading" | "ready" | "error";

const POLL_INTERVAL_MS = 8000;
const INITIAL_REFRESH_DELAY_MS = 1400;

const features = [
  {
    icon: Zap,
    title: "Instant inbox",
    description:
      "Your temporary address is ready the moment you open Instant Mail. No setup, no waiting.",
  },
  {
    icon: Shield,
    title: "Privacy protection",
    description:
      "Keep sign-ups, downloads, and verification flows away from your personal email address.",
  },
  {
    icon: Mail,
    title: "Spam-free signups",
    description:
      "Use a disposable inbox for one-time messages and stop newsletters from flooding your main inbox.",
  },
  {
    icon: UserRound,
    title: "No registration",
    description:
      "No account, no password, no forms. Copy your email and start receiving messages immediately.",
  },
];

const faqs = [
  {
    question: "What is Instant Mail?",
    answer:
      "Instant Mail is a free temporary email service. It gives you a disposable inbox you can use for sign-ups, verification codes, and short-term online activity without exposing your real email.",
  },
  {
    question: "How do I use my temporary email?",
    answer:
      "Copy the address shown on the page, paste it wherever a website asks for email, then return here. Incoming messages appear in your inbox automatically.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. Instant Mail works instantly with no registration, no password, and no personal details required.",
  },
  {
    question: "How long does the inbox last?",
    answer:
      "Your session stays available while you keep this page open. You can generate a new address anytime with the change button.",
  },
  {
    question: "Is temporary email safe?",
    answer:
      "It is great for low-risk use like verifications and test sign-ups. Do not use it for banking, payments, or accounts you may need to recover later.",
  },
  {
    question: "Why is my inbox empty?",
    answer:
      "Messages arrive only after a website sends mail to your address. Keep this tab open and refresh if needed. New emails will show up here.",
  },
];

function formatDate(value?: string) {
  if (!value) {
    return "Not updated yet";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

function formatMessageDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatInboxTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
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

export function MailApp() {
  const [session, setSession] = useState<MailSession | null>(() => loadSession());
  const [messages, setMessages] = useState<MailMessageSummary[]>([]);
  const [activeMessageSummary, setActiveMessageSummary] =
    useState<MailMessageSummary | null>(null);
  const [activeMessageDetail, setActiveMessageDetail] = useState<MailMessage | null>(
    null,
  );
  const [messageModalState, setMessageModalState] =
    useState<MessageModalState>("closed");
  const [messageModalError, setMessageModalError] = useState<string | null>(null);
  const [attachmentStatus, setAttachmentStatus] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const createInFlight = useRef(false);
  const refreshInFlight = useRef(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const isBusy = status !== "idle";
  const unreadCount = useMemo(
    () => messages.filter((message) => !message.seen).length,
    [messages],
  );

  const persistSession = useCallback((nextSession: MailSession) => {
    setSession(nextSession);
    saveSession(nextSession);
  }, []);

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
        const nextMessages = await getMessages(activeSession.token);
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
            : "Could not refresh the inbox.",
        );
      } finally {
        refreshInFlight.current = false;
        if (!quiet) {
          setStatus("idle");
        }
      }
    },
    [persistSession, session],
  );

  const createMailbox = useCallback(async () => {
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
    setAttachmentStatus({});

    try {
      const domains = await getDomains();
      const domain = domains[0]?.domain;

      if (!domain) {
        throw new Error("No domains are available right now.");
      }

      const password = makePassword();
      const address = makeAddress(domain);
      await createAccount(address, password);
      const token = await createToken(address, password);
      const nextSession: MailSession = {
        address,
        password,
        token: token.token,
        readMessageIds: [],
        lastUpdatedAt: new Date().toISOString(),
      };

      persistSession(nextSession);
      setMessages([]);
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Could not create a temporary email address.",
      );
    } finally {
      createInFlight.current = false;
      setStatus("idle");
    }
  }, [persistSession]);

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
      setError("Could not copy automatically. Select and copy the address instead.");
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
      const detail = await getMessage(session.token, message.id);
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
          : "Could not open this message.",
      );
      setMessageModalState("error");
    } finally {
      setStatus("idle");
    }
  };

  const resetMailbox = () => {
    clearSession();
    setSession(null);
    setMessages([]);
    setActiveMessageSummary(null);
    setActiveMessageDetail(null);
    setMessageModalState("closed");
    setMessageModalError(null);
    setAttachmentStatus({});
    void createMailbox();
  };

  const closeMessage = useCallback(() => {
    setActiveMessageSummary(null);
    setActiveMessageDetail(null);
    setMessageModalState("closed");
    setMessageModalError(null);
    setAttachmentStatus({});
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
        [attachment.id]: "No active email session is available for this download.",
      }));
      return;
    }

    setAttachmentStatus((currentStatus) => ({
      ...currentStatus,
      [attachment.id]: "Downloading...",
    }));

    try {
      const blob = await downloadAttachment(session.token, attachment);
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
        [attachment.id]: "Downloaded.",
      }));
    } catch (downloadError) {
      setAttachmentStatus((currentStatus) => ({
        ...currentStatus,
        [attachment.id]:
          downloadError instanceof Error
            ? downloadError.message
            : "Could not download attachment.",
      }));
    }
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

  useEffect(() => {
    if (!session) {
      void createMailbox();
      return undefined;
    }

    const firstRefresh = window.setTimeout(() => {
      void refreshMessages(session, true);
    }, INITIAL_REFRESH_DELAY_MS);

    const interval = window.setInterval(() => {
      void refreshMessages(session, true);
    }, POLL_INTERVAL_MS);

    return () => {
      window.clearTimeout(firstRefresh);
      window.clearInterval(interval);
    };
  }, [createMailbox, refreshMessages, session]);

  useEffect(() => {
    if (messageModalState === "closed") {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc" || event.code === "Escape") {
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
  }, [closeMessage, messageModalState]);

  return (
    <main className="min-h-screen text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a className="flex items-center gap-2.5" href="/" aria-label="Instant Mail home">
            <SiteLogo className="h-9 w-9" size={36} />
            <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Instant Mail
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-brand-600" href="#inbox">
              Inbox
            </a>
            <a className="transition hover:text-brand-600" href="#features">
              Features
            </a>
            <a className="transition hover:text-brand-600" href="#faq">
              FAQ
            </a>
            <a className="transition hover:text-brand-600" href="#about">
              About
            </a>
          </nav>
          <a
            className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            href="#inbox"
          >
            Open inbox
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50 to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <Sparkles aria-hidden="true" size={14} />
            No registration · Instant access
          </p>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight">
            Instant Temporary Email,
            <span className="text-brand-600"> Ready in Seconds</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Instant Mail gives you a disposable inbox for sign-ups, verification codes,
            and one-time messages without spam reaching your real email.
          </p>

          <div className="mx-auto mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-hero sm:p-6">
            <p className="mb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Your temporary email
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <label className="sr-only" htmlFor="current-email">
                Current temporary email address
              </label>
              <input
                id="current-email"
                readOnly
                value={session?.address ?? "Creating your address..."}
                className="min-h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-center text-base font-semibold text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 sm:text-left sm:text-lg"
                aria-live="polite"
              />
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-60"
                disabled={!session || isBusy}
                onClick={copyAddress}
                type="button"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <button
                aria-label="Refresh inbox"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 disabled:opacity-60"
                disabled={!session || isBusy}
                onClick={() => void refreshMessages()}
                title="Refresh"
                type="button"
              >
                {status === "refreshing" ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <RefreshCw size={16} />
                )}
                Refresh
              </button>
              <button
                aria-label="Generate new email address"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 disabled:opacity-60"
                disabled={isBusy}
                onClick={resetMailbox}
                title="Change address"
                type="button"
              >
                <RefreshCw size={16} />
                Change
              </button>
              <button
                aria-label="Delete and create new inbox"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-60"
                disabled={isBusy}
                onClick={resetMailbox}
                title="Delete inbox"
                type="button"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>

            <p className="mt-4 text-left text-xs text-slate-500">
              {status === "creating"
                ? "Generating your disposable address..."
                : "Copy this address, use it anywhere, and your messages will appear below."}
            </p>
          </div>

          {error ? (
            <div
              className="mx-auto mt-4 max-w-3xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-medium text-red-800"
              role="alert"
            >
              {error}
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6" id="inbox">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  Live inbox
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Incoming messages
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Updated {formatDate(session?.lastUpdatedAt)} · {messages.length}{" "}
                  message{messages.length === 1 ? "" : "s"}
                  {unreadCount > 0 ? ` · ${unreadCount} unread` : ""}
                </p>
              </div>
              <button
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60 sm:self-auto"
                disabled={!session || isBusy}
                onClick={() => void refreshMessages()}
                type="button"
              >
                {status === "refreshing" ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <RefreshCw size={16} />
                )}
                Refresh inbox
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="hidden grid-cols-[1.2fr_1.4fr_100px_80px] gap-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
                <span>Sender</span>
                <span>Subject</span>
                <span>Time</span>
                <span className="text-right">Action</span>
              </div>

              {messages.length === 0 ? (
                <div className="flex min-h-[240px] flex-col items-center justify-center bg-white px-6 py-12 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Inbox aria-hidden="true" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Your inbox is empty. Waiting for incoming emails.
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                    Paste your Instant Mail address on any website. Messages will show up
                    here automatically while this page stays open.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100 bg-white">
                  {messages.map((message) => (
                    <li key={message.id}>
                      <div className="grid gap-3 px-4 py-4 transition hover:bg-brand-50/50 md:grid-cols-[1.2fr_1.4fr_100px_80px] md:items-center md:gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {message.from.name || message.from.address}
                          </p>
                          <p className="truncate text-xs text-slate-500 md:hidden">
                            {formatInboxTime(message.createdAt)}
                          </p>
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {message.subject || "No subject"}
                            {!message.seen ? (
                              <span className="ml-2 inline-flex rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">
                                New
                              </span>
                            ) : null}
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                            {message.intro || "Open to read the full message."}
                          </p>
                        </div>
                        <p className="hidden text-sm text-slate-500 md:block">
                          {formatInboxTime(message.createdAt)}
                        </p>
                        <div className="md:text-right">
                          <button
                            className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 text-sm font-semibold text-white transition hover:bg-brand-700 md:w-auto"
                            onClick={() => void openMessage(message)}
                            type="button"
                          >
                            <Eye size={15} />
                            View
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
              Why Instant Mail
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Fast, private, and built for everyday sign-ups
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Everything you need from a temp mail service without friction, clutter, or
              dark patterns.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-card"
                  key={feature.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
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
              FAQ
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Common questions
            </h2>
          </div>
          <div className="mt-8 space-y-2">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <article
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
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
            About Instant Mail
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Free temp mail for privacy and spam protection
          </h2>
          <div className="mt-8 space-y-10">
            {aboutInstantMailSections.map((section) => (
              <article key={section.title}>
                <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="grid gap-2 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
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
            <a className="transition hover:text-brand-600" href="#inbox">
              Inbox
            </a>
            <a className="transition hover:text-brand-600" href="#features">
              Features
            </a>
            <a className="transition hover:text-brand-600" href="#faq">
              FAQ
            </a>
            <a className="transition hover:text-brand-600" href="#about">
              About
            </a>
          </nav>
        </div>
        <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-2 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p>© 2026 Instant Mail. Disposable email for quick, private use.</p>
          <p>
            Powered by the public{" "}
            <a
              className="font-semibold text-brand-600 hover:text-brand-700"
              href="https://mail.tm/"
              rel="noreferrer"
              target="_blank"
            >
              Mail.tm
            </a>{" "}
            API.
          </p>
        </div>
      </footer>

      {messageModalState !== "closed" && activeMessageSummary ? (
        <div
          aria-labelledby="message-modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 backdrop-blur-sm sm:p-6"
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
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-hero"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="grid gap-4 border-b border-slate-100 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {activeMessageSummary.from.name || activeMessageSummary.from.address}
                </p>
                <h2
                  className="mt-2 text-xl font-bold leading-tight sm:text-2xl"
                  id="message-modal-title"
                >
                  {activeMessageSummary.subject || "No subject"}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Received {formatMessageDate(activeMessageSummary.createdAt)}
                </p>
              </div>
              <button
                aria-label="Close message"
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:self-auto"
                onClick={closeMessage}
                type="button"
              >
                <X size={16} />
                Close
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
              {messageModalState === "loading" ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl bg-slate-50 p-8 text-center">
                  <Loader2
                    aria-hidden="true"
                    className="mb-4 animate-spin text-brand-600"
                    size={36}
                  />
                  <p className="text-lg font-bold text-slate-900">Opening message</p>
                  <p className="mt-2 max-w-sm text-sm text-slate-500">
                    Fetching the full email content now.
                  </p>
                </div>
              ) : null}

              {messageModalState === "error" ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl bg-slate-50 p-8 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Mail aria-hidden="true" size={24} />
                  </div>
                  <p className="text-lg font-bold text-slate-900">Could not open this email</p>
                  <p className="mt-2 max-w-md text-sm text-slate-500">
                    {messageModalError ||
                      "The provider did not return the full message content."}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
                      onClick={retryMessage}
                      type="button"
                    >
                      <RefreshCw size={16} />
                      Try again
                    </button>
                    <button
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      onClick={closeMessage}
                      type="button"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : null}

              {messageModalState === "ready" && activeMessageDetail ? (
                <>
                  <div
                    className="email-content min-h-[280px] overflow-auto rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
                    dangerouslySetInnerHTML={{
                      __html: activeMessagePayload,
                    }}
                  />

                  {activeMessageAttachments.length > 0 ? (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                      <p className="font-semibold text-slate-900">
                        {activeMessageAttachments.length} attachment
                        {activeMessageAttachments.length === 1 ? "" : "s"}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {activeMessageAttachments.map((attachment) => (
                          <li
                            className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
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
                              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-brand-600 px-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
                              disabled={
                                !attachment.downloadUrl ||
                                attachmentStatus[attachment.id] === "Downloading..."
                              }
                              onClick={() => void handleAttachmentDownload(attachment)}
                              type="button"
                            >
                              {attachmentStatus[attachment.id] === "Downloading..." ? (
                                <Loader2 className="animate-spin" size={15} />
                              ) : (
                                <Download size={15} />
                              )}
                              Download
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
        </div>
      ) : null}
    </main>
  );
}
