import { validateDownloadedAttachment } from "./attachmentValidation";

export type MailProviderId = "mailtm" | "mailgw" | "guerrilla";

// Mail.tm and Mail.gw send no CORS headers, so they are reached through same-origin
// proxies (see vercel.json and vite.config.ts). Guerrilla Mail allows browser requests.
const PROVIDERS: Record<MailProviderId, { baseUrl: string; label: string }> = {
  mailtm: { baseUrl: "/api/mailtm", label: "Mail.tm" },
  mailgw: { baseUrl: "/api/mailgw", label: "Mail.gw" },
  guerrilla: { baseUrl: "https://api.guerrillamail.com/ajax.php", label: "Guerrilla Mail" },
};

const HYDRA_PROVIDER_IDS: MailProviderId[] = ["mailtm", "mailgw"];

const GUERRILLA_DOMAIN: MailDomain = {
  providerId: "guerrilla",
  id: "guerrilla",
  domain: "guerrillamail.com",
  isActive: true,
};

const DEFAULT_PROVIDER_ID: MailProviderId = "mailtm";

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

export type CreatedTempEmail = {
  account: MailAccount;
  address: string;
  password: string;
  providerId: MailProviderId;
  token: MailToken;
};

const MAX_DOMAIN_PAGES = 5;
const REQUEST_TIMEOUT_MS = 8000;
const DOMAIN_CACHE_TTL_MS = 5 * 60 * 1000;
const DOMAIN_CACHE_STORAGE_KEY = "instantmail:domains:v1";

type DomainCacheEntry = { domains: MailDomain[]; fetchedAt: number };

const domainCache: Partial<Record<MailProviderId, DomainCacheEntry>> = {};
const domainRequests: Partial<Record<MailProviderId, Promise<MailDomain[]>>> = {};

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
    signal: options.signal ?? AbortSignal.timeout(REQUEST_TIMEOUT_MS),
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

export async function getDomains(
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<MailDomain[]> {
  return getAvailableDomains(providerId);
}

function readStoredDomains(): Partial<Record<MailProviderId, DomainCacheEntry>> {
  try {
    const raw = sessionStorage.getItem(DOMAIN_CACHE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<Record<MailProviderId, DomainCacheEntry>>) : {};
  } catch {
    return {};
  }
}

function storeDomains(providerId: MailProviderId, entry: DomainCacheEntry) {
  try {
    sessionStorage.setItem(
      DOMAIN_CACHE_STORAGE_KEY,
      JSON.stringify({ ...readStoredDomains(), [providerId]: entry }),
    );
  } catch {
    // Storage can be unavailable (private mode, quota); the in-memory cache still works.
  }
}

function getCachedDomains(providerId: MailProviderId): DomainCacheEntry | undefined {
  return domainCache[providerId] ?? readStoredDomains()[providerId];
}

function clearCachedDomains(providerId: MailProviderId) {
  delete domainCache[providerId];
  storeDomains(providerId, { domains: [], fetchedAt: 0 });
}

// Mail.tm answers with a plain array or a Hydra collection depending on the Accept header.
function getCollectionMembers<T>(payload: CollectionResponse<T> | T[]): T[] {
  return Array.isArray(payload) ? payload : payload["hydra:member"] ?? [];
}

async function fetchAvailableDomains(providerId: MailProviderId): Promise<MailDomain[]> {
  const domains: MailDomain[] = [];

  for (let page = 1; page <= MAX_DOMAIN_PAGES; page += 1) {
    const payload = await request<CollectionResponse<MailDomain> | MailDomain[]>(
      `/domains?page=${page}`,
      { headers: { Accept: "application/ld+json" } },
      providerId,
    );
    const activeDomains = getCollectionMembers(payload)
      .filter((domain) => domain.domain && domain.isActive !== false && !domain.isPrivate)
      .map((domain) => ({ ...domain, providerId }));

    domains.push(...activeDomains);

    if (Array.isArray(payload) || !payload["hydra:view"]?.["hydra:next"]) {
      break;
    }
  }

  return domains;
}

export async function getAvailableDomains(
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<MailDomain[]> {
  const cached = getCachedDomains(providerId);

  if (cached && cached.domains.length > 0 && Date.now() - cached.fetchedAt < DOMAIN_CACHE_TTL_MS) {
    return cached.domains;
  }

  // Share one in-flight request so concurrent callers do not burn the provider's rate limit.
  domainRequests[providerId] ??= fetchAvailableDomains(providerId)
    .then((domains) => {
      const entry = { domains, fetchedAt: Date.now() };
      domainCache[providerId] = entry;
      storeDomains(providerId, entry);
      return domains;
    })
    .catch((error) => {
      // A provider outage or rate limit should not hide domains we already know about.
      if (cached && cached.domains.length > 0) {
        return cached.domains;
      }

      throw error;
    })
    .finally(() => {
      delete domainRequests[providerId];
    });

  return domainRequests[providerId];
}

export async function getAllAvailableDomains(): Promise<MailDomain[]> {
  const results = await Promise.allSettled(
    HYDRA_PROVIDER_IDS.map((providerId) => getAvailableDomains(providerId)),
  );

  return [
    ...results.flatMap((result) =>
      result.status === "fulfilled" ? result.value : [],
    ),
    GUERRILLA_DOMAIN,
  ];
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
  let rateLimited = false;

  for (const domain of orderedDomains) {
    const providerId = domain.providerId ?? DEFAULT_PROVIDER_ID;

    if (providerId === "guerrilla") {
      try {
        return await createGuerrillaEmail();
      } catch {
        continue;
      }
    }

    const password = makePassword();
    const address = makeAddress(domain.domain);

    try {
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
        // Another provider's domains may still work, so keep trying.
        rateLimited = true;
        continue;
      }

      // The domain may have been retired; refetch the list next time.
      clearCachedDomains(providerId);
    }
  }

  throw new Error(rateLimited ? RATE_LIMIT_ERROR : CREATE_TEMP_EMAIL_ERROR);
}

export async function createAccount(
  address: string,
  password: string,
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<MailAccount> {
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
  if (providerId === "guerrilla") {
    // For Guerrilla Mail the account id is the address.
    await guerrillaRequest("forget_me", { email_addr: accountId }, token).catch(() => undefined);
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
  if (providerId === "guerrilla") {
    const payload = await guerrillaRequest<{ list?: GuerrillaMessage[] }>(
      "check_email",
      { seq: "0" },
      token,
    );

    // The welcome message has timestamp 0 and is not a real email.
    return (payload.list ?? [])
      .filter((message) => Number(message.mail_timestamp) > 0)
      .map(toGuerrillaSummary);
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
  if (providerId === "guerrilla") {
    const payload = await guerrillaRequest<GuerrillaMessage>("fetch_email", { email_id: id }, token);

    return {
      ...toGuerrillaSummary(payload),
      cc: [],
      bcc: [],
      flagged: false,
      verifications: [],
      retention: false,
      retentionDate: "",
      // Guerrilla Mail wraps some plain-text bodies in HTML, so detect markup instead of trusting content_type.
      html: /<[a-z][\s\S]*>/i.test(payload.mail_body ?? "") ? [payload.mail_body ?? ""] : undefined,
      text: /<[a-z][\s\S]*>/i.test(payload.mail_body ?? "") ? undefined : payload.mail_body ?? "",
      attachments: [],
    };
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

  const attachmentUrl = attachment.downloadUrl.startsWith("http")
    ? attachment.downloadUrl
    : `${PROVIDERS[providerId].baseUrl}${attachment.downloadUrl}`;
  const response = await fetch(attachmentUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not download attachment. Status ${response.status}.`);
  }

  return validateDownloadedAttachment(
    await response.blob(),
    attachment.contentType || response.headers.get("content-type") || "application/octet-stream",
  );
}

export function makeAddress(domain: string): string {
  const prefix = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  return `${prefix}@${domain}`;
}

export function makePassword(): string {
  const random = crypto.getRandomValues(new Uint32Array(4));
  return Array.from(random, (value) => value.toString(36)).join("-");
}

type GuerrillaMessage = {
  mail_id: number | string;
  mail_from: string;
  mail_subject: string;
  mail_excerpt?: string;
  mail_body?: string;
  mail_timestamp: number | string;
  mail_read?: number | string;
  mail_recipient?: string;
  content_type?: string;
  att?: number | string;
  size?: number | string;
};

type GuerrillaSession = { email_addr: string; sid_token: string };

async function guerrillaRequest<T = Record<string, unknown>>(
  fn: string,
  params: Record<string, string> = {},
  sidToken?: string,
): Promise<T> {
  const query = new URLSearchParams({ f: fn, lang: "en", ...params });

  if (sidToken) {
    query.set("sid_token", sidToken);
  }

  const response = await fetch(`${PROVIDERS.guerrilla.baseUrl}?${query}`, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Could not reach the temporary email provider. Status ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

function toGuerrillaSummary(message: GuerrillaMessage): MailMessageSummary {
  const createdAt = new Date(Number(message.mail_timestamp) * 1000).toISOString();

  return {
    id: String(message.mail_id),
    accountId: "",
    msgid: String(message.mail_id),
    from: { address: message.mail_from, name: "" },
    to: [],
    subject: message.mail_subject,
    intro: message.mail_excerpt ?? "",
    seen: Number(message.mail_read) === 1,
    isDeleted: false,
    hasAttachments: Number(message.att) > 0,
    size: Number(message.size) || 0,
    createdAt,
    updatedAt: createdAt,
  };
}

async function createGuerrillaEmail(): Promise<CreatedTempEmail> {
  const { email_addr: address, sid_token: sidToken } =
    await guerrillaRequest<GuerrillaSession>("get_email_address");

  if (!address || !sidToken) {
    throw new Error(CREATE_TEMP_EMAIL_ERROR);
  }

  const now = new Date().toISOString();

  return {
    account: {
      id: address,
      address,
      quota: 0,
      used: 0,
      isDisabled: false,
      isDeleted: false,
      createdAt: now,
      updatedAt: now,
    },
    address,
    password: "",
    providerId: "guerrilla",
    token: { token: sidToken, id: address },
  };
}
