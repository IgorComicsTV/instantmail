import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Copy,
  Download,
  Eye,
  Inbox,
  Loader2,
  Mail,
  Newspaper,
  RefreshCw,
  ShieldCheck,
  Trash2,
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

const articleCards = [
  {
    title: "How temporary email protects your inbox",
    description: "Learn how disposable addresses reduce spam and unwanted lists.",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    title: "Temp mail for product testing",
    description: "Use burner inboxes to test signups, onboarding, and forms.",
    accent: "from-sky-500 to-blue-700",
  },
  {
    title: "Avoid spam from one-time downloads",
    description: "Keep newsletters and promotional blasts away from your inbox.",
    accent: "from-indigo-500 to-blue-500",
  },
  {
    title: "Disposable email vs regular email",
    description: "Know when to use a temporary address and when not to.",
    accent: "from-blue-600 to-slate-800",
  },
  {
    title: "Safer verification workflows",
    description: "Receive activation links without exposing personal accounts.",
    accent: "from-cyan-400 to-blue-600",
  },
  {
    title: "Privacy habits for signups",
    description: "Simple rules for safer browsing, accounts, and inbox hygiene.",
    accent: "from-blue-500 to-indigo-700",
  },
];

const lowerInfoBlocks = [
  {
    title: "The Tech behind Disposable Email Addresses",
    body: "Disposable email services route temporary addresses to a short-lived inbox so you can receive one-time messages without creating a permanent account. AnyMail focuses on making that workflow fast, readable, and easy to use on desktop.",
  },
  {
    title: "So, What Is A Disposable Email Address?",
    body: "A disposable email address is an inbox you use for short-term tasks such as verification codes, account testing, downloads, and low-risk signups. It separates casual web activity from the accounts that actually matter.",
  },
  {
    title: "Why would you need a fake email address?",
    body: "A fake email address helps reduce spam, protects your personal inbox, and gives developers a clean way to test email flows. It is best used for low-risk online activity, not banking, payments, or sensitive accounts.",
  },
];

const seoSections = [
  {
    title: "What Is a Disposable Temporary Email?",
    paragraphs: [
      "AnyMail is a free disposable temporary email service that lets you create an instant temporary email address and receive messages without using your personal inbox. Also known as temp mail, 10 minute mail, 10min mail, throwaway email, burner email, trash mail, fake email, or disposable email address, this type of email is made for quick, private, and spam-free online use.",
      "Every day, websites, forums, apps, Wi-Fi networks, blogs, online stores, and social media platforms ask for an email address before allowing users to create an account, download content, post comments, access files, or receive a verification link. Using your real email everywhere can quickly fill your inbox with spam, promotional messages, newsletters, and unwanted emails.",
      "With AnyMail, you can protect your real email address by using a temporary inbox instead.",
    ],
  },
  {
    title: "Why Use a Temporary Email Address?",
    paragraphs: [
      "A temporary email address helps you stay private online. Instead of sharing your personal Gmail, Outlook, Yahoo, or business email with every website, you can use a disposable email address to receive confirmation emails, activation links, verification codes, sign-up messages, and one-time emails.",
      "This makes AnyMail useful when you want to:",
    ],
    bullets: [
      "Create an account without exposing your personal email",
      "Avoid spam and unwanted promotional emails",
      "Receive email verification codes instantly",
      "Sign up for forums, websites, apps, and online services",
      "Test web apps, forms, newsletters, and registration systems",
      "Protect your main inbox from data leaks and spam lists",
      "Keep your online identity more private",
    ],
    after:
      "A disposable email inbox is simple: you open AnyMail, get a temporary email address, use it wherever you need, receive your message, and keep your real inbox clean.",
  },
  {
    title: "How Does Disposable Email Work?",
    paragraphs: [
      "Disposable email works by generating a temporary email address that can receive incoming messages for a limited period of time. You do not need to register, create a password, or share personal information. The temporary inbox is available instantly, making it fast and easy to use.",
      "When a website asks for an email address, you can copy your AnyMail temporary email and paste it into the sign-up form. If the website sends a confirmation email, verification code, or activation link, you can read it directly inside your AnyMail inbox.",
      "This gives you a quick and anonymous email solution without creating a permanent account.",
    ],
  },
  {
    title: "Temporary Email vs Regular Email",
    paragraphs: [
      "A regular email address is best for important accounts, personal communication, work, banking, and long-term use. A temporary email address is better for short-term tasks where you do not want to expose your real inbox.",
      "Use a disposable email when you need speed, privacy, and spam protection. Use your real email only when the account truly matters.",
      "AnyMail helps you separate important communication from random sign-ups, test accounts, free downloads, online forms, and websites that may send unwanted emails later.",
    ],
  },
  {
    title: "Best Uses for Disposable Temporary Email",
    paragraphs: [
      "AnyMail can be used for many everyday online situations, including website registration, app testing, newsletter sign-ups, forum accounts, online downloads, Wi-Fi access, free resources, surveys, and account verification.",
      "Developers can also use temporary email addresses to test registration flows, email delivery, user onboarding, verification systems, and app sign-up forms without creating multiple permanent inboxes.",
      "For regular users, AnyMail is a simple way to avoid spam, protect privacy, and keep the main inbox organized.",
    ],
  },
  {
    title: "Is Disposable Email Safe?",
    paragraphs: [
      "Using a disposable email address can help reduce spam and protect your personal email from being shared, leaked, sold, or added to marketing lists. Since you do not need to enter personal information, AnyMail makes it easier to receive temporary emails without exposing your real identity.",
      "However, temporary email should be used for low-risk online activity. Do not use disposable email for banking, payment accounts, private documents, sensitive personal data, or any account you need to recover later.",
      "For quick sign-ups and one-time verification, temp mail is fast, useful, and convenient.",
    ],
  },
  {
    title: "Create a Free Temporary Email With AnyMail",
    paragraphs: [
      "AnyMail gives you an instant disposable email address in just one click. No registration. No password. No personal details. Just open AnyMail, copy your temporary email address, receive messages, and keep your real inbox safe from spam.",
      "If you need a free temp mail service, disposable email address, 10 minute mail, burner email, throwaway email, fake email generator, anonymous inbox, or temporary email for verification, AnyMail is built to make the process simple, fast, and private.",
      "Use AnyMail today and enjoy a cleaner inbox, better privacy, and a safer way to receive emails online.",
    ],
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

  const actionItems = [
    {
      icon: copied ? Check : Copy,
      label: copied ? "Copied" : "Copy",
      onClick: copyAddress,
      disabled: !session || isBusy,
    },
    {
      icon: status === "refreshing" ? Loader2 : RefreshCw,
      label: "Refresh",
      onClick: () => void refreshMessages(),
      disabled: !session || isBusy,
    },
    {
      icon: RefreshCw,
      label: "Change",
      onClick: resetMailbox,
      disabled: isBusy,
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: resetMailbox,
      disabled: isBusy,
    },
  ];

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="border-b border-blue-400/15 bg-blue-500/10 px-6 py-2 text-center text-xs font-bold uppercase tracking-[0.22em] text-blue-100">
        Free temporary email, private inbox, no registration required
      </div>

      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <a className="flex items-center gap-3" href="/" aria-label="AnyMail home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-[0_0_32px_rgba(59,130,246,0.55)]">
            <Mail aria-hidden="true" size={21} />
          </span>
          <span
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            AnyMail
          </span>
        </a>
        <div className="hidden items-center gap-6 text-sm font-bold text-slate-300 md:flex">
          <a className="transition hover:text-white" href="#inbox">
            Inbox
          </a>
          <a className="transition hover:text-white" href="#articles">
            Articles
          </a>
          <a className="transition hover:text-white" href="#learn">
            Learn
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 pb-16 pt-8">
        <div className="absolute left-1/2 top-12 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-10 top-40 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto rounded-[34px] border border-blue-300/20 bg-white/95 p-6 text-slate-950 shadow-[0_30px_110px_rgba(37,99,235,0.28)] backdrop-blur-xl md:p-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_0_38px_rgba(37,99,235,0.6)]">
              <ShieldCheck aria-hidden="true" size={26} />
            </div>
            <h1
              className="text-4xl font-black tracking-tight md:text-6xl"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Your Temporary Email Address
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-600 md:text-lg">
              Browse privately, protect your inbox from spam, receive secure
              verification emails, and use a disposable inbox whenever you need it.
            </p>

            <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 rounded-[26px] border border-slate-200 bg-slate-50 p-3 shadow-inner md:flex-row md:items-center">
              <label className="sr-only" htmlFor="current-email">
                Current temporary email address
              </label>
              <input
                id="current-email"
                readOnly
                value={session?.address ?? "Creating address..."}
                className="min-h-14 flex-1 rounded-2xl border-0 bg-white px-5 text-center text-lg font-black text-slate-900 outline-none ring-1 ring-slate-200 md:text-left"
                aria-live="polite"
              />
              <div className="grid grid-cols-2 gap-2 md:flex">
                <button
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-black text-white shadow-[0_14px_35px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:opacity-60"
                  disabled={!session || isBusy}
                  onClick={copyAddress}
                  type="button"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <button
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60"
                  disabled={!session || isBusy}
                  onClick={() => void refreshMessages()}
                  type="button"
                >
                  {status === "refreshing" ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <RefreshCw size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error ? (
            <div className="mx-auto mt-5 max-w-3xl rounded-2xl border border-blue-300/25 bg-blue-950/70 px-5 py-4 text-sm font-bold text-blue-50">
              {error}
            </div>
          ) : null}

          <div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {actionItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:-translate-y-1 hover:text-blue-700 disabled:opacity-60"
                  disabled={item.disabled}
                  key={item.label}
                  onClick={item.onClick}
                  type="button"
                >
                  <Icon
                    className={item.label === "Refresh" && status === "refreshing" ? "animate-spin" : ""}
                    size={18}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-14 text-slate-950" id="inbox">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[32px] bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.12)] md:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                  Live mailbox
                </p>
                <h2
                  className="mt-2 text-4xl font-black tracking-tight"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  Inbox
                </h2>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  Updated at {formatDate(session?.lastUpdatedAt)} · {messages.length}{" "}
                  message{messages.length === 1 ? "" : "s"} · {unreadCount} unread
                </p>
              </div>
              <button
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-black text-white shadow-[0_14px_35px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:opacity-60"
                disabled={!session || isBusy}
                onClick={() => void refreshMessages()}
                type="button"
              >
                {status === "refreshing" ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <RefreshCw size={18} />
                )}
                Refresh
              </button>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-slate-200">
              <div className="grid grid-cols-[1.1fr_1.6fr_120px] bg-slate-950 px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                <span>Sender</span>
                <span>Subject</span>
                <span className="text-right">View</span>
              </div>

              {messages.length === 0 ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center bg-slate-50 px-6 py-12 text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] bg-blue-100 text-blue-600">
                    <Inbox aria-hidden="true" size={38} />
                  </div>
                  <h3
                    className="text-2xl font-black text-slate-950"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    Your inbox is empty
                  </h3>
                  <p className="mt-2 max-w-lg text-base font-medium leading-relaxed text-slate-500">
                    Waiting for incoming emails. Keep this page open and messages
                    will appear automatically.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-200 bg-white">
                  {messages.map((message) => (
                    <div
                      className="grid grid-cols-[1.1fr_1.6fr_120px] items-center gap-4 px-5 py-4 transition hover:bg-blue-50/70"
                      key={message.id}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-slate-900">
                          {message.from.name || message.from.address}
                        </p>
                        <p className="truncate text-xs font-bold text-slate-500">
                          {message.from.address}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-base font-black text-slate-900">
                          {message.subject || "No subject"}
                        </p>
                        <p className="mt-1 line-clamp-1 text-sm font-medium text-slate-500">
                          {message.intro || "Click to read the full message."}
                        </p>
                      </div>
                      <div className="text-right">
                        <button
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-black text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] transition hover:bg-blue-500"
                          onClick={() => void openMessage(message)}
                          type="button"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-slate-950" id="learn">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
            Learn
          </p>
          <h2
            className="mt-3 text-4xl font-black tracking-tight md:text-5xl"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            What is Disposable Temporary E-mail?
          </h2>
          <p className="mt-5 text-lg font-medium leading-relaxed text-slate-600">
            Disposable temporary e-mail gives you a short-term inbox for quick
            verification, online signups, downloads, and testing. It helps reduce
            spam, protect your real inbox, and keep low-risk web activity separate
            from personal accounts.
          </p>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-16 text-slate-950" id="articles">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <Newspaper className="text-blue-600" size={28} />
            <h2
              className="text-4xl font-black tracking-tight"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Popular Articles
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articleCards.map((article) => (
              <article
                className="overflow-hidden rounded-[24px] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.1)] transition hover:-translate-y-1"
                key={article.title}
              >
                <div className={`h-32 bg-gradient-to-br ${article.accent}`}>
                  <div className="flex h-full items-center justify-center text-white/95">
                    <Zap size={42} />
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-black text-slate-950"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                    {article.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-slate-950">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {lowerInfoBlocks.map((block) => (
            <article
              className="rounded-[24px] border border-slate-200 bg-slate-50 p-7"
              key={block.title}
            >
              <h3
                className="text-2xl font-black tracking-tight"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {block.title}
              </h3>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-600">
                {block.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 text-slate-950">
        <div className="mx-auto max-w-4xl rounded-[32px] bg-white p-7 shadow-[0_22px_70px_rgba(15,23,42,0.08)] md:p-12">
          {seoSections.map((section) => (
            <article className="border-b border-slate-200 py-8 last:border-b-0" key={section.title}>
              <h2
                className="text-3xl font-black tracking-tight"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {section.title}
              </h2>
              <div className="mt-5 space-y-4 text-base font-medium leading-8 text-slate-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul className="grid gap-2 rounded-[20px] bg-slate-50 p-5">
                    {section.bullets.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
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
      </section>

      <footer className="border-t border-blue-400/10 bg-[#07111f] px-6 py-10 text-sm font-medium text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <p>© 2026 AnyMail. Temporary email for quick, private inbox use.</p>
          <p>
            Emails are provided by the public{" "}
            <a className="font-bold text-blue-300 hover:text-white" href="https://mail.tm/" rel="noreferrer" target="_blank">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-md sm:p-6"
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
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] bg-white text-slate-950 shadow-[0_30px_120px_rgba(0,0,0,0.4)]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="grid gap-4 border-b border-slate-200 p-5 sm:grid-cols-[1fr_auto] sm:p-7">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold uppercase tracking-widest text-slate-500">
                  {activeMessageSummary.from.name || activeMessageSummary.from.address}
                </p>
                <h2
                  className="mt-2 text-2xl font-black leading-tight tracking-tight sm:text-4xl"
                  id="message-modal-title"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {activeMessageSummary.subject || "No subject"}
                </h2>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  Received {formatMessageDate(activeMessageSummary.createdAt)}
                </p>
              </div>
              <button
                aria-label="Close message"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 text-sm font-black text-slate-900 transition hover:bg-slate-200"
                onClick={closeMessage}
                type="button"
              >
                <X size={18} />
                Close
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
              {messageModalState === "loading" ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] bg-slate-50 p-8 text-center">
                  <Loader2
                    aria-hidden="true"
                    className="mb-5 animate-spin text-blue-600"
                    size={42}
                  />
                  <p className="text-2xl font-black text-slate-950" style={{ fontFamily: "Nunito, sans-serif" }}>
                    Opening message
                  </p>
                  <p className="mt-2 max-w-md text-base font-medium leading-relaxed text-slate-500">
                    Fetching the full email content now. This popup will stay
                    open while the message loads.
                  </p>
                </div>
              ) : null}

              {messageModalState === "error" ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] bg-slate-50 p-8 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <Mail aria-hidden="true" size={28} />
                  </div>
                  <p className="text-2xl font-black text-slate-950" style={{ fontFamily: "Nunito, sans-serif" }}>
                    Could not open this email
                  </p>
                  <p className="mt-2 max-w-lg text-base font-medium leading-relaxed text-slate-500">
                    {messageModalError ||
                      "The provider did not return the full message content."}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-black text-white" onClick={retryMessage} type="button">
                      <RefreshCw size={18} />
                      Try again
                    </button>
                    <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-200 px-5 text-sm font-black text-slate-900" onClick={closeMessage} type="button">
                      <X size={18} />
                      Close
                    </button>
                  </div>
                </div>
              ) : null}

              {messageModalState === "ready" && activeMessageDetail ? (
                <>
                  <div
                    className="email-content min-h-[360px] overflow-auto rounded-[24px] bg-white p-6 text-base leading-relaxed text-slate-950 ring-1 ring-slate-200 sm:p-8"
                    dangerouslySetInnerHTML={{
                      __html: activeMessagePayload,
                    }}
                  />

                  {activeMessageAttachments.length > 0 ? (
                    <div className="mt-4 rounded-[24px] bg-slate-50 p-4 text-sm font-bold text-slate-600 ring-1 ring-slate-200">
                      <p className="text-slate-950">
                        This message includes {activeMessageAttachments.length}{" "}
                        attachment
                        {activeMessageAttachments.length === 1 ? "" : "s"}.
                      </p>
                      <ul className="mt-3 grid gap-2">
                        {activeMessageAttachments.map((attachment) => (
                          <li
                            className="grid gap-3 rounded-2xl bg-white px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center"
                            key={attachment.id}
                          >
                            <div>
                              <p className="text-slate-950">
                                {attachment.filename || "Unnamed attachment"}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {attachment.contentType || "unknown type"} ·{" "}
                                {formatBytes(attachment.size)}
                              </p>
                              {attachmentStatus[attachment.id] ? (
                                <p className="mt-2 text-xs text-slate-500">
                                  {attachmentStatus[attachment.id]}
                                </p>
                              ) : null}
                            </div>
                            <button
                              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-500 disabled:opacity-60"
                              disabled={
                                !attachment.downloadUrl ||
                                attachmentStatus[attachment.id] === "Downloading..."
                              }
                              onClick={() => void handleAttachmentDownload(attachment)}
                              type="button"
                            >
                              {attachmentStatus[attachment.id] === "Downloading..." ? (
                                <Loader2 className="animate-spin" size={16} />
                              ) : (
                                <Download size={16} />
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
