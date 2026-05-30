export type MailProviderId = "mailtm" | "mailgw" | "catchmail";

const PROVIDERS: Record<MailProviderId, { baseUrl: string; label: string }> = {
  mailtm: { baseUrl: "https://api.mail.tm", label: "Mail.tm" },
  mailgw: { baseUrl: "https://api.mail.gw", label: "Mail.gw" },
  catchmail: { baseUrl: "https://api.catchmail.io", label: "CatchMail" },
};

const DEFAULT_PROVIDER_ID: MailProviderId = "mailtm";
const CATCHMAIL_PROVIDER_ID: MailProviderId = "catchmail";
const CATCHMAIL_DOMAIN = "catchmail.io";

export type MailDomain = {
  providerId?: MailProviderId;
  id: string;
  domain: string;
  isActive?: boolean;
  isPrivate?: boolean;
  createdAt?: string;
  updatedAt?: string;
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
  "hydra:totalItems"?: number;
  "hydra:view"?: {
    "hydra:next"?: string;
  };
};

type CatchMailMailboxMessage = {
  id: string;
  mailbox: string;
  from?: string;
  subject?: string;
  date?: string;
  size?: number;
  has_attachments?: boolean;
};

type CatchMailMailboxResponse = {
  address: string;
  page: number;
  page_size: number;
  count: number;
  messages: CatchMailMailboxMessage[];
};

type CatchMailMessageResponse = CatchMailMailboxMessage & {
  to?: string[];
  headers?: Record<string, string>;
  body?: {
    text?: string;
    html?: string;
  };
  attachments?: Array<{
    id: string;
    filename?: string;
    content_type?: string;
    size?: number;
    download_url?: string;
  }>;
};

export type CreatedTempEmail = {
  account: MailAccount;
  address: string;
  password: string;
  providerId: MailProviderId;
  token: MailToken;
};

const MAX_DOMAIN_PAGES = 5;

const NO_DOMAINS_ERROR =
  "No email domains are available right now. Please try again in a moment.";
const CREATE_TEMP_EMAIL_ERROR =
  "Could not create a temporary email right now. Please try again.";
const RATE_LIMIT_ERROR =
  "Too many requests right now. Please wait a moment and try again.";

async function request<T>(
  path: string,
  options: RequestInit = {},
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<T> {
  const response = await fetch(`${PROVIDERS[providerId].baseUrl}${path}`, {
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

    const error = new Error(
      response.status === 429 ? RATE_LIMIT_ERROR : message,
    );
    error.name = `MailProviderHttpError:${response.status}`;

    throw error;
  }

  return response.json() as Promise<T>;
}

async function catchMailRequest<T>(path: string): Promise<T> {
  const response = await fetch(getCatchMailProxyPath(path), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    let message = "Could not reach CatchMail.";

    try {
      const payload = (await response.json()) as {
        error?: { message?: string };
        message?: string;
      };
      message = payload.error?.message || payload.message || message;
    } catch {
      message = `${message} Status ${response.status}.`;
    }

    const error = new Error(response.status === 429 ? RATE_LIMIT_ERROR : message);
    error.name = `MailProviderHttpError:${response.status}`;

    throw error;
  }

  return response.json() as Promise<T>;
}

function getCatchMailProxyPath(path: string): string {
  if (path.startsWith("http")) {
    return path.replace(PROVIDERS.catchmail.baseUrl, "/api/catchmail");
  }

  return `/api/catchmail${path}`;
}

export async function getDomains(
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<MailDomain[]> {
  return getAvailableDomains(providerId);
}

export async function getAvailableDomains(
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<MailDomain[]> {
  if (providerId === CATCHMAIL_PROVIDER_ID) {
    return [
      {
        providerId,
        id: CATCHMAIL_DOMAIN,
        domain: CATCHMAIL_DOMAIN,
        isActive: true,
      },
    ];
  }

  const domains: MailDomain[] = [];

  for (let page = 1; page <= MAX_DOMAIN_PAGES; page += 1) {
    const payload = await request<CollectionResponse<MailDomain>>(
      `/domains?page=${page}`,
      {},
      providerId,
    );
    const activeDomains = payload["hydra:member"].filter(
      (domain) => domain.domain && domain.isActive !== false,
    ).map((domain) => ({ ...domain, providerId }));

    domains.push(...activeDomains);

    if (!payload["hydra:view"]?.["hydra:next"]) {
      break;
    }
  }

  return domains;
}

export async function getAllAvailableDomains(): Promise<MailDomain[]> {
  const results = await Promise.allSettled(
    (Object.keys(PROVIDERS) as MailProviderId[]).map((providerId) =>
      getAvailableDomains(providerId),
    ),
  );

  return results.flatMap((result) =>
    result.status === "fulfilled" ? result.value : [],
  );
}

export function getRandomDomain(domains: MailDomain[]): MailDomain | null {
  if (domains.length === 0) {
    return null;
  }

  const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % domains.length;

  return domains[randomIndex];
}

function shuffleDomains(domains: MailDomain[]): MailDomain[] {
  const shuffled = [...domains];
  const randomValues = crypto.getRandomValues(new Uint32Array(shuffled.length));

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomValues[index] % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function isRateLimitError(error: unknown) {
  return error instanceof Error && error.name === "MailProviderHttpError:429";
}

export async function createTempEmailWithRandomDomain(): Promise<CreatedTempEmail> {
  const domains = await getAllAvailableDomains();

  if (domains.length === 0) {
    throw new Error(NO_DOMAINS_ERROR);
  }

  const orderedDomains = shuffleDomains(domains);

  for (const domain of orderedDomains) {
    const providerId = domain.providerId ?? DEFAULT_PROVIDER_ID;
    const password = makePassword();
    const address = makeAddress(domain.domain);

    try {
      if (providerId === CATCHMAIL_PROVIDER_ID) {
        return createCatchMailTempEmail(address, password);
      }

      const account = await createAccount(address, password, providerId);
      const token = await createToken(address, password, providerId);

      return {
        account,
        address,
        password,
        providerId,
        token,
      };
    } catch (error) {
      if (isRateLimitError(error)) {
        throw new Error(RATE_LIMIT_ERROR);
      }
    }
  }

  throw new Error(CREATE_TEMP_EMAIL_ERROR);
}

function createSyntheticAccount(address: string): MailAccount {
  const now = new Date().toISOString();

  return {
    id: address,
    address,
    quota: 0,
    used: 0,
    isDisabled: false,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  };
}

function createCatchMailTempEmail(
  address: string,
  password: string,
): CreatedTempEmail {
  return {
    account: createSyntheticAccount(address),
    address,
    password,
    providerId: CATCHMAIL_PROVIDER_ID,
    token: {
      id: address,
      token: address,
    },
  };
}

export async function createAccount(
  address: string,
  password: string,
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<MailAccount> {
  if (providerId === CATCHMAIL_PROVIDER_ID) {
    return createSyntheticAccount(address);
  }

  return request<MailAccount>("/accounts", {
    method: "POST",
    body: JSON.stringify({ address, password }),
  }, providerId);
}

export async function createToken(
  address: string,
  password: string,
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<MailToken> {
  if (providerId === CATCHMAIL_PROVIDER_ID) {
    return {
      id: address,
      token: address,
    };
  }

  return request<MailToken>("/token", {
    method: "POST",
    body: JSON.stringify({ address, password }),
  }, providerId);
}

export async function deleteAccount(
  token: string,
  accountId: string,
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<void> {
  if (providerId === CATCHMAIL_PROVIDER_ID) {
    return;
  }

  const response = await fetch(`${PROVIDERS[providerId].baseUrl}/accounts/${accountId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok && response.status !== 404) {
    throw new Error(`Could not delete temporary email account. Status ${response.status}.`);
  }
}

export async function getMessages(
  token: string,
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<MailMessageSummary[]> {
  if (providerId === CATCHMAIL_PROVIDER_ID) {
    const payload = await catchMailRequest<CatchMailMailboxResponse>(
      `/api/v1/mailbox?address=${encodeURIComponent(token)}`,
    );

    return payload.messages.map((message) => mapCatchMailSummary(message, token));
  }

  const payload = await request<CollectionResponse<MailMessageSummary>>("/messages", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }, providerId);

  return payload["hydra:member"];
}

export async function getMessage(
  token: string,
  id: string,
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<MailMessage> {
  if (providerId === CATCHMAIL_PROVIDER_ID) {
    const message = await catchMailRequest<CatchMailMessageResponse>(
      `/api/v1/message/${encodeURIComponent(id)}?mailbox=${encodeURIComponent(token)}`,
    );

    return mapCatchMailMessage(message, token);
  }

  return request<MailMessage>(`/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }, providerId);
}

export async function downloadAttachment(
  token: string,
  attachment: MailAttachment,
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<Blob> {
  if (!attachment.downloadUrl) {
    throw new Error("This attachment does not include a download URL.");
  }

  const attachmentUrl = providerId === CATCHMAIL_PROVIDER_ID
    ? getCatchMailProxyPath(attachment.downloadUrl)
    : attachment.downloadUrl.startsWith("http")
      ? attachment.downloadUrl
      : `${PROVIDERS[providerId].baseUrl}${attachment.downloadUrl}`;
  const response = await fetch(
    attachmentUrl,
    providerId === CATCHMAIL_PROVIDER_ID
      ? { headers: { Accept: "*/*" } }
      : {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
  );

  if (!response.ok) {
    throw new Error(`Could not download attachment. Status ${response.status}.`);
  }

  if (providerId === CATCHMAIL_PROVIDER_ID) {
    return readCatchMailAttachmentResponse(response, attachment);
  }

  return response.blob();
}

async function readCatchMailAttachmentResponse(
  response: Response,
  attachment: MailAttachment,
): Promise<Blob> {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return response.blob();
  }

  const payload = (await response.json()) as {
    content?: string;
    data?: string;
    body?: string;
    base64?: string;
    encoding?: string;
    error?: { message?: string };
    message?: string;
  };

  const encodedContent = payload.content || payload.data || payload.body || payload.base64;

  if (!encodedContent) {
    throw new Error(
      payload.error?.message ||
      payload.message ||
      "The attachment response did not include downloadable file data.",
    );
  }

  const isBase64 = !payload.encoding || payload.encoding.toLowerCase() === "base64";
  const bytes = isBase64
    ? decodeBase64ToBytes(encodedContent)
    : new TextEncoder().encode(encodedContent);

  return new Blob([bytes], {
    type: attachment.contentType || contentType || "application/octet-stream",
  });
}

function decodeBase64ToBytes(value: string): Uint8Array {
  const normalized = value.includes(",") ? value.split(",").pop() || "" : value;
  const binary = atob(normalized.replace(/\s/g, ""));
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function parseCatchMailSender(value: string | undefined): { address: string; name: string } {
  if (!value) {
    return { address: "", name: "" };
  }

  const match = value.match(/^(.*)<([^>]+)>$/);
  if (!match) {
    return { address: value.trim(), name: value.trim() };
  }

  const name = match[1].trim().replace(/^"|"$/g, "");
  const address = match[2].trim();

  return { address, name: name || address };
}

function mapCatchMailSummary(
  message: CatchMailMailboxMessage,
  mailbox: string,
): MailMessageSummary {
  const createdAt = message.date || new Date().toISOString();
  const from = parseCatchMailSender(message.from);

  return {
    id: message.id,
    accountId: mailbox,
    msgid: message.id,
    from,
    to: [{ address: mailbox, name: mailbox }],
    subject: message.subject || "",
    intro: "",
    seen: false,
    isDeleted: false,
    hasAttachments: Boolean(message.has_attachments),
    size: message.size ?? 0,
    createdAt,
    updatedAt: createdAt,
  };
}

function mapCatchMailMessage(
  message: CatchMailMessageResponse,
  mailbox: string,
): MailMessage {
  const summary = mapCatchMailSummary(message, mailbox);

  return {
    ...summary,
    to: message.to?.map((address) => ({ address, name: address })) ?? summary.to,
    cc: [],
    bcc: [],
    flagged: false,
    verifications: [],
    retention: false,
    retentionDate: "",
    text: message.body?.text,
    html: message.body?.html ? [message.body.html] : undefined,
    hasAttachments: Boolean(message.attachments?.length),
    attachments: message.attachments?.map((attachment) => ({
      id: attachment.id,
      filename: attachment.filename || "attachment",
      contentType: attachment.content_type || "application/octet-stream",
      disposition: "attachment",
      transferEncoding: "",
      related: false,
      size: attachment.size ?? 0,
      downloadUrl: attachment.download_url || "",
    })),
  };
}

export function makeAddress(domain: string): string {
  const prefix = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  return `${prefix}@${domain}`;
}

export function makePassword(): string {
  const random = crypto.getRandomValues(new Uint32Array(4));
  return Array.from(random, (value) => value.toString(36)).join("-");
}
