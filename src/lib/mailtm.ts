const API_BASE = "https://api.mail.tm";

export type MailDomain = {
  id: string;
  domain: string;
  isActive?: boolean;
};

export type MailAccount = {
  id: string;
  address: string;
  quota: number;
  used: number;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MailToken = {
  token: string;
  id: string;
};

export type MailMessageSummary = {
  id: string;
  accountId: string;
  msgid: string;
  from: { address: string; name: string };
  to: Array<{ address: string; name: string }>;
  subject: string;
  intro: string;
  seen: boolean;
  isDeleted: boolean;
  hasAttachments: boolean;
  size: number;
  downloadUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type MailMessage = MailMessageSummary & {
  cc: Array<{ address: string; name: string }>;
  bcc: Array<{ address: string; name: string }>;
  flagged: boolean;
  verifications: string[];
  retention: boolean;
  retentionDate: string;
  text?: string | string[];
  html?: string[] | string;
  attachments?: Array<{
    id: string;
    filename: string;
    contentType: string;
    disposition: string;
    transferEncoding: string;
    related: boolean;
    size: number;
    downloadUrl: string;
  }>;
};

export type MailAttachment = NonNullable<MailMessage["attachments"]>[number];

type CollectionResponse<T> = {
  "hydra:member": T[];
};

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = "Could not reach the temporary email provider.";

    try {
      const payload = (await response.json()) as { detail?: string; message?: string };
      message = payload.detail || payload.message || message;
    } catch {
      message = `${message} Status ${response.status}.`;
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function getDomains(): Promise<MailDomain[]> {
  const payload = await request<CollectionResponse<MailDomain>>("/domains");
  return payload["hydra:member"].filter((domain) => domain.isActive !== false);
}

export async function createAccount(
  address: string,
  password: string,
): Promise<MailAccount> {
  return request<MailAccount>("/accounts", {
    method: "POST",
    body: JSON.stringify({ address, password }),
  });
}

export async function createToken(
  address: string,
  password: string,
): Promise<MailToken> {
  return request<MailToken>("/token", {
    method: "POST",
    body: JSON.stringify({ address, password }),
  });
}

export async function getMessages(token: string): Promise<MailMessageSummary[]> {
  const payload = await request<CollectionResponse<MailMessageSummary>>("/messages", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return payload["hydra:member"];
}

export async function getMessage(
  token: string,
  id: string,
): Promise<MailMessage> {
  return request<MailMessage>(`/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function downloadAttachment(
  token: string,
  attachment: MailAttachment,
): Promise<Blob> {
  if (!attachment.downloadUrl) {
    throw new Error("This attachment does not include a download URL.");
  }

  const response = await fetch(`${API_BASE}${attachment.downloadUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not download attachment. Status ${response.status}.`);
  }

  return response.blob();
}

export function makeAddress(domain: string): string {
  const prefix = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  return `${prefix}@${domain}`;
}

export function makePassword(): string {
  const random = crypto.getRandomValues(new Uint32Array(4));
  return Array.from(random, (value) => value.toString(36)).join("-");
}
