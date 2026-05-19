import type { MailMessageSummary } from "../../lib/mailtm";

const STORAGE_KEY = "anymail.session.v1";

export type MailSession = {
  address: string;
  password: string;
  token: string;
  readMessageIds: string[];
  lastUpdatedAt?: string;
};

export function loadSession(): MailSession | null {
  const raw = localStorage.getItem(STORAGE_KEY);
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

export function saveSession(session: MailSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
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
