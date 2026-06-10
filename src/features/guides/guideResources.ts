import type { Guide, GuideSlug } from "./guidesContent";

type ResourceLink = {
  title: string;
  description: string;
  href: string;
};

export type GuideResources = {
  tools: ResourceLink[];
  references: ResourceLink[];
};

const instantMailHome: ResourceLink = {
  title: "Instant Mail temporary email",
  description:
    "Create a temporary inbox for low-risk sign-ups, quick confirmations, and privacy-conscious browsing.",
  href: "https://www.instantmail.online/en/",
};

const tenMinuteMail: ResourceLink = {
  title: "10 Minute Mail tool",
  description:
    "Use a short-lived inbox when you only need a message for a few minutes.",
  href: "https://www.instantmail.online/en/10-minute-mail",
};

const passwordGenerator: ResourceLink = {
  title: "Secure password generator",
  description:
    "Generate strong passwords locally in your browser with custom length, symbols, numbers, and letters.",
  href: "https://www.instantmail.online/tools/password-generator",
};

const dnsChecker: ResourceLink = {
  title: "Email DNS checker",
  description:
    "Check MX, SPF, DKIM, and DMARC records before troubleshooting delivery or spoofing issues.",
  href: "https://www.instantmail.online/tools/email-dns-checker",
};

const ipChecker: ResourceLink = {
  title: "What Is My IP",
  description:
    "See the public IP address websites can observe from your current connection.",
  href: "https://www.instantmail.online/tools/what-is-my-ip",
};

const toolsHub: ResourceLink = {
  title: "All Instant Mail tools",
  description:
    "Browse free privacy, email, DNS, IP, and password tools from Instant Mail.",
  href: "https://www.instantmail.online/tools",
};

const references = {
  hibp: {
    title: "Have I Been Pwned breach search",
    description:
      "Check whether an email address appears in known breach datasets and paste records.",
    href: "https://haveibeenpwned.com/",
  },
  nistPasswords: {
    title: "NIST password guidance",
    description:
      "Read NIST guidance on password strength, memorized secrets, and modern authentication practices.",
    href: "https://pages.nist.gov/800-63-4/sp800-63b.html",
  },
  nistPasswordTips: {
    title: "NIST: How do I create a good password?",
    description:
      "A plain-language NIST article explaining why length matters more than forced complexity.",
    href: "https://www.nist.gov/cybersecurity-and-privacy/how-do-i-create-good-password",
  },
  cisaPhishing: {
    title: "CISA phishing guidance",
    description:
      "CISA guidance for recognizing phishing and building safer reporting habits.",
    href: "https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/teach-employees-avoid-phishing",
  },
  cisaMalware: {
    title: "CISA malware, phishing, and ransomware resources",
    description:
      "Official CISA resources covering malware, phishing, ransomware, and practical defensive steps.",
    href: "https://www.cisa.gov/topics/cyber-threats-and-advisories/malware-phishing-and-ransomware",
  },
  ftcPhishing: {
    title: "FTC phishing scam advice",
    description:
      "Consumer guidance from the FTC on recognizing phishing messages and avoiding scams.",
    href: "https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams",
  },
  googleSafeBrowsing: {
    title: "Google Safe Browsing site status",
    description:
      "Look up whether Google Safe Browsing currently flags a site as unsafe.",
    href: "https://transparencyreport.google.com/safe-browsing/search",
  },
  cloudflareDns: {
    title: "Cloudflare DNS record documentation",
    description:
      "Reference documentation for DNS records and how they make domains and services available.",
    href: "https://developers.cloudflare.com/dns/manage-dns-records/",
  },
  cloudflareDnsTypes: {
    title: "Cloudflare DNS record types",
    description:
      "A reference for A, AAAA, CNAME, TXT, MX, and other common DNS record types.",
    href: "https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/",
  },
  googleSecurityCheckup: {
    title: "Google Security Checkup",
    description:
      "Google's account security tool for reviewing devices, sign-ins, recovery settings, and protections.",
    href: "https://myaccount.google.com/intro/security-checkup",
  },
  microsoftTwoStep: {
    title: "Microsoft two-step verification",
    description:
      "Microsoft's official instructions for enabling and managing two-step verification.",
    href: "https://support.microsoft.com/en-us/accounts-billing/security/how-to-use-two-step-verification-with-your-microsoft-account",
  },
};

const defaultReferences = [references.googleSafeBrowsing, references.ftcPhishing];

const slugTools: Partial<Record<GuideSlug, ResourceLink[]>> = {
  "what-is-a-temporary-email": [instantMailHome, tenMinuteMail, toolsHub],
  "is-temporary-email-safe": [instantMailHome, passwordGenerator, toolsHub],
  "temporary-email-for-verification-codes": [instantMailHome, tenMinuteMail],
  "how-to-avoid-spam-emails": [instantMailHome, passwordGenerator],
  "disposable-email-vs-regular-email": [instantMailHome, tenMinuteMail],
  "what-is-a-burner-email": [instantMailHome, tenMinuteMail],
  "how-developers-can-test-email-signups": [instantMailHome, dnsChecker, passwordGenerator],
  "how-to-protect-your-email-address-online": [instantMailHome, passwordGenerator, ipChecker],
  "what-is-a-data-breach-and-how-to-prevent-it": [passwordGenerator, instantMailHome],
  "how-to-create-a-temp-mail-without-registration": [instantMailHome, tenMinuteMail],
  "how-to-spot-phishing-emails": [instantMailHome, passwordGenerator],
  "what-is-two-factor-authentication": [passwordGenerator, toolsHub],
  "password-manager-basics": [passwordGenerator, toolsHub],
  "how-to-create-strong-passwords": [passwordGenerator],
  "public-wifi-safety-checklist": [ipChecker, passwordGenerator],
  "what-is-an-ip-address": [ipChecker],
  "ipv4-vs-ipv6-explained": [ipChecker],
  "what-is-a-vpn-and-when-to-use-one": [ipChecker, passwordGenerator],
  "dns-records-explained": [dnsChecker, toolsHub],
  "spf-dkim-dmarc-explained": [dnsChecker],
  "mx-records-explained": [dnsChecker],
  "how-to-secure-your-gmail-account": [passwordGenerator, instantMailHome],
  "how-to-secure-your-outlook-account": [passwordGenerator, instantMailHome],
  "browser-privacy-settings-to-change": [ipChecker, passwordGenerator],
  "how-to-check-if-a-link-is-safe": [instantMailHome, passwordGenerator],
  "safe-file-download-checklist": [passwordGenerator],
  "what-is-malware": [passwordGenerator, instantMailHome],
  "ransomware-basics": [passwordGenerator],
  "account-recovery-best-practices": [passwordGenerator],
  "what-to-do-after-your-email-is-leaked": [passwordGenerator, instantMailHome],
  "how-to-reduce-your-digital-footprint": [instantMailHome, ipChecker, passwordGenerator],
  "secure-remote-work-checklist": [ipChecker, dnsChecker, passwordGenerator],
  "mobile-email-security": [passwordGenerator, instantMailHome],
  "how-to-recognize-fake-login-pages": [passwordGenerator, instantMailHome],
  "email-aliases-vs-temporary-email": [instantMailHome, tenMinuteMail],
};

const slugReferences: Partial<Record<GuideSlug, ResourceLink[]>> = {
  "what-is-a-temporary-email": [references.hibp, references.ftcPhishing],
  "is-temporary-email-safe": [references.hibp, references.googleSafeBrowsing],
  "temporary-email-for-verification-codes": [references.ftcPhishing, references.googleSafeBrowsing],
  "how-to-avoid-spam-emails": [references.ftcPhishing, references.hibp],
  "disposable-email-vs-regular-email": [references.hibp, references.ftcPhishing],
  "what-is-a-burner-email": [references.ftcPhishing, references.googleSafeBrowsing],
  "how-developers-can-test-email-signups": [references.cloudflareDns, references.nistPasswords],
  "how-to-protect-your-email-address-online": [references.hibp, references.nistPasswords],
  "what-is-a-data-breach-and-how-to-prevent-it": [references.hibp, references.nistPasswords],
  "how-to-create-a-temp-mail-without-registration": [references.ftcPhishing, references.googleSafeBrowsing],
  "how-to-spot-phishing-emails": [references.cisaPhishing, references.ftcPhishing, references.googleSafeBrowsing],
  "what-is-two-factor-authentication": [references.nistPasswords, references.microsoftTwoStep],
  "password-manager-basics": [references.nistPasswords, references.nistPasswordTips, references.hibp],
  "how-to-create-strong-passwords": [references.nistPasswordTips, references.nistPasswords],
  "public-wifi-safety-checklist": [references.googleSafeBrowsing, references.ftcPhishing],
  "what-is-an-ip-address": [references.cloudflareDns, references.googleSafeBrowsing],
  "ipv4-vs-ipv6-explained": [references.cloudflareDnsTypes, references.cloudflareDns],
  "what-is-a-vpn-and-when-to-use-one": [references.googleSafeBrowsing, references.ftcPhishing],
  "dns-records-explained": [references.cloudflareDns, references.cloudflareDnsTypes],
  "spf-dkim-dmarc-explained": [references.cloudflareDnsTypes, references.cloudflareDns],
  "mx-records-explained": [references.cloudflareDnsTypes, references.cloudflareDns],
  "how-to-secure-your-gmail-account": [references.googleSecurityCheckup, references.hibp],
  "how-to-secure-your-outlook-account": [references.microsoftTwoStep, references.hibp],
  "browser-privacy-settings-to-change": [references.googleSafeBrowsing, references.googleSecurityCheckup],
  "how-to-check-if-a-link-is-safe": [references.googleSafeBrowsing, references.ftcPhishing],
  "safe-file-download-checklist": [references.googleSafeBrowsing, references.cisaMalware],
  "what-is-malware": [references.cisaMalware, references.googleSafeBrowsing],
  "ransomware-basics": [references.cisaMalware, references.nistPasswords],
  "account-recovery-best-practices": [references.nistPasswords, references.googleSecurityCheckup, references.microsoftTwoStep],
  "what-to-do-after-your-email-is-leaked": [references.hibp, references.nistPasswords],
  "how-to-reduce-your-digital-footprint": [references.hibp, references.ftcPhishing],
  "secure-remote-work-checklist": [references.cisaMalware, references.cloudflareDns],
  "mobile-email-security": [references.googleSecurityCheckup, references.microsoftTwoStep],
  "how-to-recognize-fake-login-pages": [references.googleSafeBrowsing, references.cisaPhishing],
  "email-aliases-vs-temporary-email": [references.hibp, references.ftcPhishing],
};

export function getGuideResources(slug: GuideSlug, guide: Guide): GuideResources {
  const tools = slugTools[slug] ?? [toolsHub];
  const referencesForGuide = slugReferences[slug] ?? defaultReferences;

  if (guide.category === "DNS & Email") {
    return { tools, references: referencesForGuide };
  }

  if (guide.category === "Passwords" || guide.category === "Account Security") {
    return { tools, references: referencesForGuide };
  }

  return { tools, references: referencesForGuide };
}
