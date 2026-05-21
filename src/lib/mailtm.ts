export type MailProviderId = "mailtm" | "mailgw";

const PROVIDERS: Record<MailProviderId, { baseUrl: string; label: string }> = {
  mailtm: { baseUrl: "https://api.mail.tm", label: "Mail.tm" },
  mailgw: { baseUrl: "https://api.mail.gw", label: "Mail.gw" },
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

export async function getDomains(
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<MailDomain[]> {
  return getAvailableDomains(providerId);
}

export async function getAvailableDomains(
  providerId: MailProviderId = DEFAULT_PROVIDER_ID,
): Promise<MailDomain[]> {
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

  const response = await fetch(`${PROVIDERS[providerId].baseUrl}${attachment.downloadUrl}`, {
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
