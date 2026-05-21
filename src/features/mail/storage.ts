import type { MailMessageSummary } from "../../lib/mailtm";

const STORAGE_KEY = "anymail.session.v1";

export type MailSession = {
  accountId?: string;
  address: string;
  password: string;
  token: string;
  createdAt?: string;
  expiresAt?: string;
  readMessageIds: string[];
  lastUpdatedAt?: string;
  lastManualRefreshAt?: string;
};

export function loadSession(storageKey = STORAGE_KEY): MailSession | null {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }

  try {
    const session = JSON.parse(raw) as MailSession;
    if (!session.address || !session.password || !session.token) {
      return null;
    }

    return {
      ...session,
      readMessageIds: Array.isArray(session.readMessageIds)
        ? session.readMessageIds
        : [],
    };
  } catch {
    return null;
  }
}

export function saveSession(session: MailSession, storageKey = STORAGE_KEY): void {
  localStorage.setItem(storageKey, JSON.stringify(session));
}

export function clearSession(storageKey = STORAGE_KEY): void {
  localStorage.removeItem(storageKey);
}

export function mergeReadState(
  messages: MailMessageSummary[],
  readMessageIds: string[],
): MailMessageSummary[] {
  const readSet = new Set(readMessageIds);
  return messages.map((message) => ({
    ...message,
    seen: message.seen || readSet.has(message.id),
  }));
}
