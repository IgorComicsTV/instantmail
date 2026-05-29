import Mail from "lucide-react/dist/esm/icons/mail.js";
import Shield from "lucide-react/dist/esm/icons/shield.js";
import UserRound from "lucide-react/dist/esm/icons/user-round.js";
import Zap from "lucide-react/dist/esm/icons/zap.js";
import {
  languageOrder,
  languages,
  tenMinuteContent,
  tenMinuteSlug,
  type LanguageCode,
  type LanguageContent,
} from "./i18n";
import {
  getStandaloneToolCopy,
  type StandaloneToolSlug,
  toolsContent,
} from "../tools/toolsContent";

export const seoToolSlugs = [
  "temp-mail",
  "temporary-email",
  "disposable-email",
  "burner-email",
  "fake-email-generator",
  "temporary-email-for-verification",
  "temp-mail-for-developers",
  "disposable-email-for-testing",
  "free-temp-mail-no-registration",
] as const;

export type SeoToolSlug = (typeof seoToolSlugs)[number];
export type ToolSlug = SeoToolSlug | typeof tenMinuteSlug | "tools" | `tools/${StandaloneToolSlug}`;
export type SeoToolContent = Pick<
  LanguageContent,
  | "title"
  | "description"
  | "hero"
  | "inbox"
  | "featuresIntro"
  | "faqIntro"
  | "aboutIntro"
  | "features"
  | "faqs"
  | "aboutSections"
>;

type ToolCopy = {
  navLabel: string;
  title: string;
  description: string;
  note: string;
  h1Start: string;
  h1Accent: string;
  body: string;
  emailLabel: string;
  inboxTitle: string;
  emptyTitle: string;
  emptyBody: string;
  featuresLabel: string;
  featuresTitle: string;
  featuresBody: string;
  faqTitle: string;
  aboutLabel: string;
  aboutTitle: string;
  featureTitles: [string, string, string, string];
  featureDescriptions: [string, string, string, string];
  faq: [string, string][];
  sections: {
    title: string;
    paragraphs: string[];
    bullets?: string[];
    after?: string;
  }[];
};

const englishToolCopy: Record<SeoToolSlug, ToolCopy> = {
  "temp-mail": {
    navLabel: "Temp Mail",
    title: "Temp Mail - Free Temporary Inbox | Instant Mail",
    description:
      "Use free temp mail to create an instant disposable inbox, receive messages, avoid spam, and protect your personal email address.",
    note: "Temp mail · Instant inbox",
    h1Start: "Free Temp Mail,",
    h1Accent: " Built for Quick Sign-Ups",
    body:
      "Create a temp mail address for everyday sign-ups, downloads, forums, free trials, and one-time messages without exposing your personal inbox.",
    emailLabel: "Your temp mail address",
    inboxTitle: "Temp Mail Inbox",
    emptyTitle: "Your temp mail inbox is waiting for messages.",
    emptyBody:
      "Paste this temp mail address into a website or app. Incoming emails will appear here automatically.",
    featuresLabel: "Temp mail use cases",
    featuresTitle: "A practical inbox for short online tasks",
    featuresBody:
      "Temp mail is useful when you need one message now, but do not want long-term email noise later.",
    faqTitle: "Temp Mail questions",
    aboutLabel: "Temp mail guide",
    aboutTitle: "What is temp mail?",
    featureTitles: ["Instant address", "Spam control", "Simple inbox", "No account"],
    featureDescriptions: [
      "Generate a usable temporary address as soon as the page opens.",
      "Keep newsletters, promotions, and low-value sign-ups away from your real inbox.",
      "Read incoming messages in the browser without creating a permanent mailbox.",
      "No registration, password, or personal profile is required.",
    ],
    faq: [
      ["What is temp mail?", "Temp mail is a temporary email address used for short-term online tasks such as sign-ups, downloads, and one-time messages."],
      ["Can I receive real emails?", "Yes. Use the address shown above and incoming messages will appear in the live inbox."],
      ["Should I use temp mail for important accounts?", "No. Use your real email for banking, payments, work, private documents, and accounts you may need to recover."],
      ["Why does temp mail help with spam?", "It separates low-risk sign-ups from your personal inbox, so unwanted follow-up emails do not reach your main address."],
    ],
    sections: [
      {
        title: "Temp mail for everyday browsing",
        paragraphs: [
          "Temp mail gives you a quick inbox when a website asks for an email address before showing a download, coupon, forum, trial, or comment form.",
          "Instead of handing over your personal Gmail, Outlook, Yahoo, or work address, you can use a temporary inbox for the message you need right now.",
        ],
      },
      {
        title: "Best uses for temp mail",
        paragraphs: ["Use temp mail for low-risk online moments where convenience and inbox protection matter more than long-term account ownership."],
        bullets: [
          "One-time sign-ups",
          "Download confirmations",
          "Forum registrations",
          "Newsletter previews",
          "Free trial checks",
          "Quick activation links",
        ],
      },
    ],
  },
  "temporary-email": {
    navLabel: "Temporary Email",
    title: "Temporary Email Address - Free Private Inbox | Instant Mail",
    description:
      "Create a temporary email address to receive messages online while keeping your real inbox private and protected from spam.",
    note: "Temporary email · Private by default",
    h1Start: "Temporary Email Address,",
    h1Accent: " Ready When You Need It",
    body:
      "Use a temporary email address for short-term communication, account confirmations, trial sign-ups, and web forms without sharing your personal email.",
    emailLabel: "Your temporary email address",
    inboxTitle: "Temporary Email Inbox",
    emptyTitle: "Waiting for your first temporary email.",
    emptyBody:
      "Copy the address, use it on a website, and return here to read confirmations, codes, or activation messages.",
    featuresLabel: "Temporary email benefits",
    featuresTitle: "Privacy for short-term online communication",
    featuresBody:
      "A temporary email works like a clean buffer between random websites and your permanent inbox.",
    faqTitle: "Temporary Email questions",
    aboutLabel: "Temporary email guide",
    aboutTitle: "What is a temporary email address?",
    featureTitles: ["Private buffer", "Quick setup", "Live messages", "Low-risk use"],
    featureDescriptions: [
      "Keep unknown websites away from your permanent email identity.",
      "Start receiving messages without account setup or personal information.",
      "Refresh the inbox and open messages directly in the page.",
      "Use it for simple tasks, not sensitive or permanent accounts.",
    ],
    faq: [
      ["What is a temporary email address?", "It is an email address created for short-term use, usually for receiving confirmations, codes, or one-time messages."],
      ["Is temporary email private?", "It helps protect your personal inbox, but you should not use it for sensitive data or important accounts."],
      ["Can I change the address?", "Yes. Use the change button to generate another temporary email address."],
      ["What should I avoid?", "Avoid using temporary email for banking, payments, private files, business accounts, or anything you may need to recover later."],
    ],
    sections: [
      {
        title: "Temporary email as an inbox shield",
        paragraphs: [
          "A temporary email address is useful when you want to interact with a website without adding your real address to another marketing database.",
          "It is especially helpful for sign-up gates, product downloads, free resources, Wi-Fi portals, and quick online forms.",
        ],
      },
      {
        title: "When temporary email makes sense",
        paragraphs: ["Use it when the email is useful now but unlikely to matter later."],
        bullets: [
          "Activation links",
          "One-time verification",
          "Resource downloads",
          "Test profiles",
          "Short-lived online accounts",
          "Spam-prone websites",
        ],
      },
    ],
  },
  "disposable-email": {
    navLabel: "Disposable Email",
    title: "Disposable Email - Free Throwaway Inbox | Instant Mail",
    description:
      "Create a disposable email inbox for quick sign-ups, one-time messages, and spam protection without using your real address.",
    note: "Disposable email · Throwaway inbox",
    h1Start: "Disposable Email,",
    h1Accent: " Without Inbox Clutter",
    body:
      "Use a disposable email when a message matters for a few minutes but the sender does not need permanent access to your personal inbox.",
    emailLabel: "Your disposable email",
    inboxTitle: "Disposable Email Inbox",
    emptyTitle: "Your disposable inbox is empty.",
    emptyBody:
      "Use the address above for a sign-up, confirmation, or one-time message. New emails will appear here.",
    featuresLabel: "Disposable email workflow",
    featuresTitle: "Receive what you need, leave the rest behind",
    featuresBody:
      "Disposable email is designed for convenience, cleaner inboxes, and safer everyday browsing.",
    faqTitle: "Disposable Email questions",
    aboutLabel: "Disposable email guide",
    aboutTitle: "What is disposable email?",
    featureTitles: ["Throwaway identity", "Cleaner inbox", "Useful for forms", "Easy reset"],
    featureDescriptions: [
      "Use an address that is not tied to your permanent email identity.",
      "Avoid promotional follow-ups after quick registrations.",
      "Receive confirmations from forms, downloads, and trial pages.",
      "Generate another inbox when you want a fresh disposable address.",
    ],
    faq: [
      ["What is disposable email?", "Disposable email is a temporary inbox used for short-term communication and one-time sign-ups."],
      ["Is disposable email the same as temp mail?", "They are closely related. Both describe a short-lived inbox that helps protect your main email."],
      ["Can websites block disposable email?", "Some websites may block temporary domains. If that happens, generate another address or use your real email for trusted services."],
      ["Can I use it for account recovery?", "No. Disposable email is not designed for long-term account ownership or recovery."],
    ],
    sections: [
      {
        title: "Disposable email for one-time tasks",
        paragraphs: [
          "Disposable email is best when the relationship with a website is brief: you need a code, link, file, or confirmation, then you are done.",
          "It reduces the chance that your primary address ends up on newsletter lists, promo campaigns, or leaked databases from low-value sites.",
        ],
      },
      {
        title: "Good disposable email scenarios",
        paragraphs: ["Use a disposable inbox when the risk is low and the email does not need to live forever."],
        bullets: [
          "Checking a download gate",
          "Joining a public forum",
          "Receiving a trial link",
          "Testing a form",
          "Reading a one-time code",
          "Avoiding repeated promotions",
        ],
      },
    ],
  },
  "burner-email": {
    navLabel: "Burner Email",
    title: "Burner Email - Create a Private Temporary Inbox | Instant Mail",
    description:
      "Use a burner email address for quick online interactions, private browsing, and spam-safe sign-ups.",
    note: "Burner email · Extra privacy",
    h1Start: "Burner Email,",
    h1Accent: " For Safer Sign-Ups",
    body:
      "Create a burner email address when you want a separate inbox for a short online task, a risky sign-up, or a website you do not fully trust yet.",
    emailLabel: "Your burner email",
    inboxTitle: "Burner Email Inbox",
    emptyTitle: "Your burner inbox is ready.",
    emptyBody:
      "Use this burner email on a website and incoming messages will show up here.",
    featuresLabel: "Burner email privacy",
    featuresTitle: "A separate address for uncertain websites",
    featuresBody:
      "Burner email helps you test a site before deciding whether it deserves your real inbox.",
    faqTitle: "Burner Email questions",
    aboutLabel: "Burner email guide",
    aboutTitle: "What is a burner email?",
    featureTitles: ["Privacy layer", "Unknown senders", "Fast replacement", "No profile"],
    featureDescriptions: [
      "Use a separate email identity for low-trust websites.",
      "Receive messages from senders without giving them your real address.",
      "Change the inbox when you are done with the task.",
      "No personal profile is required to start receiving emails.",
    ],
    faq: [
      ["What is a burner email?", "A burner email is a temporary address used as a privacy layer for short-term online activity."],
      ["When should I use a burner email?", "Use it for websites you want to try, forms you do not fully trust, or sign-ups likely to send marketing emails."],
      ["Can I reply from the burner email?", "Instant Mail focuses on receiving temporary emails. It is not a permanent sending mailbox."],
      ["Is a burner email anonymous?", "It reduces exposure of your real email, but you should still avoid sensitive activity and suspicious links."],
    ],
    sections: [
      {
        title: "Burner email for cautious browsing",
        paragraphs: [
          "A burner email is a practical privacy habit. It lets you receive the first message from a website before deciding whether the relationship is worth your real address.",
          "This is useful for coupons, gated content, public communities, software trials, and websites that may later send repeated promotions.",
        ],
      },
      {
        title: "Use a burner email when trust is unclear",
        paragraphs: ["If a site feels useful but not important, a burner email can keep the interaction separate."],
        bullets: [
          "New apps",
          "Unknown online stores",
          "One-time downloads",
          "Public forms",
          "Promotional sign-ups",
          "Low-risk trials",
        ],
      },
    ],
  },
  "fake-email-generator": {
    navLabel: "Fake Email Generator",
    title: "Fake Email Generator - Working Temporary Inbox | Instant Mail",
    description:
      "Generate a fake email address that can receive real messages for testing, sign-ups, and verification flows.",
    note: "Fake email generator · Working inbox",
    h1Start: "Fake Email Generator,",
    h1Accent: " With a Real Inbox",
    body:
      "Generate a fake email address for forms, testing, sign-ups, and temporary verification without inventing an address that cannot receive messages.",
    emailLabel: "Your generated fake email",
    inboxTitle: "Fake Email Inbox",
    emptyTitle: "Generated inbox waiting for messages.",
    emptyBody:
      "Use this generated address in a form. If the service sends a message, it will appear here.",
    featuresLabel: "Generated email use cases",
    featuresTitle: "A fake address that can actually receive mail",
    featuresBody:
      "Unlike a random made-up address, this generated inbox is useful for real confirmation emails.",
    faqTitle: "Fake Email Generator questions",
    aboutLabel: "Fake email guide",
    aboutTitle: "What is a fake email generator?",
    featureTitles: ["Generated address", "Receives mail", "Testing friendly", "Disposable"],
    featureDescriptions: [
      "Create an address automatically without choosing a username.",
      "Receive messages sent to the generated temporary inbox.",
      "Useful for forms, QA checks, and non-sensitive registration tests.",
      "Replace the address when you need a clean generated inbox.",
    ],
    faq: [
      ["What is a fake email generator?", "It creates an email address that is not your personal inbox. With Instant Mail, the generated address can receive messages."],
      ["Is this only for fake data?", "No. It is useful for legitimate testing, privacy, and low-risk sign-ups where you do not need a permanent account."],
      ["Can I use it for verification codes?", "Yes, for low-risk services. Do not use it for important accounts or sensitive information."],
      ["Why not type a random email?", "A random address usually cannot receive messages. Instant Mail gives you a working temporary inbox."],
    ],
    sections: [
      {
        title: "A fake email that works",
        paragraphs: [
          "Many people type fake email addresses into forms, but that breaks verification flows and can create problems for someone else if the address exists.",
          "Instant Mail generates a temporary address connected to a real inbox, so you can receive the message without using your personal email.",
        ],
      },
      {
        title: "Responsible fake email use",
        paragraphs: ["Use generated email addresses for privacy, testing, and short-term tasks, not impersonation or abuse."],
        bullets: [
          "Testing forms",
          "Checking onboarding emails",
          "Receiving demo messages",
          "Avoiding personal inbox exposure",
          "Trying low-risk services",
          "Keeping one-off emails separate",
        ],
      },
    ],
  },
  "temporary-email-for-verification": {
    navLabel: "Email Verification",
    title: "Temporary Email for Verification Codes | Instant Mail",
    description:
      "Use a temporary email for verification codes, activation links, sign-up confirmations, and quick account checks.",
    note: "Verification inbox · Codes and activation links",
    h1Start: "Temporary Email for",
    h1Accent: " Verification Codes",
    body:
      "Receive verification codes, activation links, and sign-up confirmation emails without exposing your real inbox to every website you try.",
    emailLabel: "Your verification email",
    inboxTitle: "Verification Email Inbox",
    emptyTitle: "Waiting for verification codes.",
    emptyBody:
      "Paste this address into the sign-up form. Codes, activation links, and confirmation emails will appear here.",
    featuresLabel: "Verification workflow",
    featuresTitle: "Built for quick confirmations and activation links",
    featuresBody:
      "Use the inbox above when a service only needs to confirm that an email can receive a message.",
    faqTitle: "Verification Email questions",
    aboutLabel: "Verification guide",
    aboutTitle: "How to use temporary email for verification",
    featureTitles: ["Receive codes", "Open activation links", "Protect real email", "Fast sign-ups"],
    featureDescriptions: [
      "Read one-time verification codes directly in the inbox.",
      "Open confirmation and activation messages in the secure email reader.",
      "Avoid exposing your personal inbox during low-risk registrations.",
      "Move through simple sign-up flows without creating a new email account.",
    ],
    faq: [
      ["Can I receive verification codes?", "Yes. Use the temporary address during sign-up and the code should appear in the inbox if the website sends it."],
      ["Can I click activation links?", "Yes, but Instant Mail shows a safety warning before opening links from emails."],
      ["Is this good for important accounts?", "No. Use your real email for accounts you need to keep, recover, or secure long term."],
      ["What if the code does not arrive?", "Refresh the inbox after a few seconds. Some services block temporary domains or delay email delivery."],
    ],
    sections: [
      {
        title: "Temporary email for verification codes",
        paragraphs: [
          "Many websites send a code or activation link before letting you finish registration. A temporary verification inbox helps you complete low-risk sign-ups without using your personal address.",
          "This page is focused on receiving those short-lived messages: sign-up confirmations, activation links, one-time passwords, and email checks.",
        ],
      },
      {
        title: "Best verification uses",
        paragraphs: ["Use this tool when the email is part of a quick verification step, not the long-term identity for an important account."],
        bullets: [
          "Activation links",
          "Sign-up confirmation",
          "One-time codes",
          "Trial account checks",
          "Low-risk app registration",
          "Email field testing",
        ],
      },
    ],
  },
  "temp-mail-for-developers": {
    navLabel: "For Developers",
    title: "Temp Mail for Developers - Test Email Flows | Instant Mail",
    description:
      "Use temp mail for developer testing: registration flows, confirmation emails, password reset, onboarding, QA, and email delivery checks.",
    note: "Developer testing · QA inbox",
    h1Start: "Temp Mail for Developers,",
    h1Accent: " QA, Sign-Ups, and Resets",
    body:
      "Test registration flows, email confirmations, password reset links, onboarding sequences, and QA scenarios without creating endless permanent inboxes.",
    emailLabel: "Developer test email",
    inboxTitle: "Developer Test Inbox",
    emptyTitle: "Waiting for test emails.",
    emptyBody:
      "Send registration, confirmation, reset, or onboarding emails to this address and inspect them here.",
    featuresLabel: "Developer workflows",
    featuresTitle: "A temporary inbox for product and QA teams",
    featuresBody:
      "Use disposable inboxes to verify that user-facing email flows arrive, render, and link correctly.",
    faqTitle: "Developer Temp Mail questions",
    aboutLabel: "Developer guide",
    aboutTitle: "How developers can use temp mail",
    featureTitles: ["Registration testing", "Password resets", "Onboarding QA", "Email rendering"],
    featureDescriptions: [
      "Create a fresh test user without polluting a real inbox.",
      "Check reset links, expiry copy, and recovery flow behavior.",
      "Verify welcome emails, activation steps, and onboarding messages.",
      "Open HTML emails, review copy, inspect links, and download attachments.",
    ],
    faq: [
      ["Why use temp mail for development?", "It lets developers and QA teams test email flows without creating many permanent inboxes or sharing personal addresses."],
      ["Can I test password reset emails?", "Yes. Send the reset email to the generated address and open the message in the inbox."],
      ["Can I test onboarding sequences?", "Yes, for manual QA. For automated testing, use purpose-built test infrastructure when reliability matters."],
      ["Should this replace production email testing?", "No. It is useful for quick manual checks, but critical systems still need proper staging and monitoring."],
    ],
    sections: [
      {
        title: "Temp mail for registration and QA",
        paragraphs: [
          "Developers often need fresh email addresses to test sign-up, activation, invite, password reset, and onboarding flows. Reusing a personal inbox makes tests messy and hard to reproduce.",
          "A temporary inbox gives each manual test a clean address so you can confirm delivery, inspect the message, and validate the next step of the flow.",
        ],
      },
      {
        title: "Developer scenarios",
        paragraphs: ["This tool is most useful for quick manual checks during product development, support investigation, and QA passes."],
        bullets: [
          "Registration confirmation",
          "Email activation links",
          "Password reset links",
          "Welcome email copy",
          "Invite flows",
          "Newsletter rendering checks",
          "Attachment delivery",
          "Onboarding sequence review",
        ],
      },
    ],
  },
  "disposable-email-for-testing": {
    navLabel: "Testing Email",
    title: "Disposable Email for Testing - QA Inbox | Instant Mail",
    description:
      "Create disposable email addresses for testing forms, email delivery, QA flows, onboarding, and one-time app registrations.",
    note: "Testing inbox · Disposable QA email",
    h1Start: "Disposable Email for",
    h1Accent: " Testing Workflows",
    body:
      "Use a disposable inbox to test forms, registration systems, email templates, delivery timing, and user journeys without cluttering a real mailbox.",
    emailLabel: "Your testing email",
    inboxTitle: "Testing Email Inbox",
    emptyTitle: "Ready for your test message.",
    emptyBody:
      "Send test confirmations, form submissions, or onboarding emails to this address and review them here.",
    featuresLabel: "Testing use cases",
    featuresTitle: "Fast manual checks for email-dependent products",
    featuresBody:
      "Disposable test inboxes make it easier to run repeated manual QA without account cleanup overhead.",
    faqTitle: "Disposable Email Testing questions",
    aboutLabel: "Testing guide",
    aboutTitle: "How to use disposable email for testing",
    featureTitles: ["Form testing", "Template checks", "Clean test users", "Fast reset"],
    featureDescriptions: [
      "Submit forms with a real receiving address.",
      "Review copy, layout, links, and attachments in received messages.",
      "Create clean test accounts without mixing them into one inbox.",
      "Generate another address when a scenario needs a fresh state.",
    ],
    faq: [
      ["What can I test with disposable email?", "You can test forms, sign-ups, confirmations, reset links, welcome emails, and simple delivery behavior."],
      ["Is it reliable enough for automated tests?", "It is best for manual and exploratory checks. Automated CI tests should use a controlled email testing provider."],
      ["Can I inspect HTML emails?", "Yes. Open a message from the inbox to read the full email body and view common external images."],
      ["Can I download attachments?", "If the provider exposes the attachment, Instant Mail can download it from the message reader."],
    ],
    sections: [
      {
        title: "Disposable email for practical testing",
        paragraphs: [
          "Testing email flows is easier when every scenario can start with a clean inbox. Disposable email helps product teams check what real users receive after submitting a form or creating an account.",
          "It is useful during manual QA, bug reproduction, copy review, onboarding checks, and support investigations.",
        ],
      },
      {
        title: "Testing scenarios",
        paragraphs: ["Use the generated inbox to verify that messages are sent, readable, and connected to the right user action."],
        bullets: [
          "Contact forms",
          "Lead capture forms",
          "Account registration",
          "Confirmation links",
          "Password reset flows",
          "Transactional email copy",
          "Attachment handling",
        ],
      },
    ],
  },
  "free-temp-mail-no-registration": {
    navLabel: "No Registration",
    title: "Free Temp Mail No Registration | Instant Mail",
    description:
      "Get free temp mail with no registration, no password, and no personal details. Create an instant disposable inbox online.",
    note: "No registration · Free temp mail",
    h1Start: "Free Temp Mail,",
    h1Accent: " No Registration Required",
    body:
      "Open Instant Mail and get a temporary email address without creating an account, entering a password, or sharing personal information.",
    emailLabel: "Your free temp mail",
    inboxTitle: "No-Registration Temp Mail Inbox",
    emptyTitle: "No-registration inbox ready.",
    emptyBody:
      "Use this free temp mail address anywhere that asks for an email. Messages will appear here.",
    featuresLabel: "No-registration benefits",
    featuresTitle: "A disposable inbox without extra steps",
    featuresBody:
      "When the goal is speed and privacy, the best email tool is the one that starts immediately.",
    faqTitle: "No-Registration Temp Mail questions",
    aboutLabel: "No-registration guide",
    aboutTitle: "Why use temp mail with no registration?",
    featureTitles: ["No sign-up", "No password", "No personal data", "Instant inbox"],
    featureDescriptions: [
      "Start receiving emails without creating a new account.",
      "Avoid another password for a short-term task.",
      "Keep your name, phone, and real inbox out of low-risk sign-ups.",
      "Copy the address and use it immediately.",
    ],
    faq: [
      ["Do I need to register?", "No. Instant Mail creates a temporary email address without account creation."],
      ["Is it free?", "Yes. The tool is free to use for short-term, low-risk email receiving."],
      ["Why avoid registration?", "For quick tasks, registration adds friction and can expose more personal information than needed."],
      ["Can I keep the same address forever?", "No. Temporary email is designed for short-term use, not permanent ownership."],
    ],
    sections: [
      {
        title: "Free temp mail without creating an account",
        paragraphs: [
          "Some email tools require registration before you can receive a message. Instant Mail is designed for the opposite flow: open the page, copy the address, and use the inbox.",
          "No-registration temp mail is useful when you want speed, privacy, and less friction for simple online tasks.",
        ],
      },
      {
        title: "When no-registration email helps",
        paragraphs: ["Use it when creating another permanent account would be unnecessary."],
        bullets: [
          "Quick verification",
          "Simple downloads",
          "Low-risk trials",
          "Public forums",
          "Newsletter previews",
          "Testing forms",
        ],
      },
    ],
  },
};

const localizedToolCopy: Partial<Record<LanguageCode, Partial<Record<SeoToolSlug, Partial<ToolCopy>>>>> = {
  pt: {
    "temp-mail": {
      navLabel: "Temp Mail",
      title: "Temp Mail Grátis - Caixa Temporária | Instant Mail",
      description: "Use temp mail grátis para criar uma caixa descartável instantânea, receber mensagens, evitar spam e proteger seu email pessoal.",
      h1Start: "Temp Mail Grátis,",
      h1Accent: " Para Cadastros Rápidos",
      body: "Crie um temp mail para cadastros, downloads, fóruns, testes grátis e mensagens únicas sem expor sua caixa principal.",
      emailLabel: "Seu endereço temp mail",
      inboxTitle: "Caixa Temp Mail",
      aboutTitle: "O que é temp mail?",
    },
    "temporary-email": {
      navLabel: "Email Temporário",
      title: "Email Temporário - Caixa Privada Grátis | Instant Mail",
      description: "Crie um email temporário para receber mensagens online enquanto protege sua caixa real contra spam.",
      h1Start: "Email Temporário,",
      h1Accent: " Pronto Quando Você Precisa",
      body: "Use um email temporário para confirmações, cadastros rápidos, testes e formulários sem compartilhar seu endereço pessoal.",
      emailLabel: "Seu email temporário",
      inboxTitle: "Caixa de Email Temporário",
      aboutTitle: "O que é um email temporário?",
    },
    "disposable-email": {
      navLabel: "Email Descartável",
      title: "Email Descartável Grátis - Caixa Throwaway | Instant Mail",
      description: "Crie um email descartável para cadastros rápidos, mensagens únicas e proteção contra spam.",
      h1Start: "Email Descartável,",
      h1Accent: " Sem Bagunçar Sua Caixa",
      body: "Use um email descartável quando precisa receber uma mensagem agora, mas não quer dar acesso permanente ao seu email pessoal.",
      emailLabel: "Seu email descartável",
      inboxTitle: "Caixa de Email Descartável",
      aboutTitle: "O que é email descartável?",
    },
    "burner-email": {
      navLabel: "Burner Email",
      title: "Burner Email - Caixa Temporária Privada | Instant Mail",
      description: "Use um burner email para interações rápidas, navegação privada e cadastros com menos spam.",
      h1Start: "Burner Email,",
      h1Accent: " Para Cadastros Mais Seguros",
      body: "Crie um burner email quando quiser uma caixa separada para uma tarefa curta, um cadastro incerto ou um site que você ainda não confia.",
      emailLabel: "Seu burner email",
      inboxTitle: "Caixa Burner Email",
      aboutTitle: "O que é burner email?",
    },
    "fake-email-generator": {
      navLabel: "Gerador de Email Falso",
      title: "Gerador de Email Falso com Caixa Real | Instant Mail",
      description: "Gere um email falso que recebe mensagens reais para testes, cadastros e fluxos de verificação.",
      h1Start: "Gerador de Email Falso,",
      h1Accent: " Com Caixa Funcional",
      body: "Gere um email falso para formulários, testes, cadastros e verificações temporárias sem inventar um endereço que não recebe mensagens.",
      emailLabel: "Seu email falso gerado",
      inboxTitle: "Caixa do Email Falso",
      aboutTitle: "O que é um gerador de email falso?",
    },
    "temporary-email-for-verification": {
      navLabel: "Email para Verificação",
      title: "Email Temporário para Códigos de Verificação | Instant Mail",
      description: "Use email temporário para códigos de verificação, links de ativação, confirmações de cadastro e acesso rápido.",
      h1Start: "Email Temporário para",
      h1Accent: " Códigos de Verificação",
      body: "Receba códigos de verificação, links de ativação e confirmações sem expor seu email real a todo site que você testa.",
      emailLabel: "Seu email para verificação",
      inboxTitle: "Caixa de Verificação",
      aboutTitle: "Como usar email temporário para verificação",
    },
    "temp-mail-for-developers": {
      navLabel: "Para Developers",
      title: "Temp Mail para Developers - Teste Fluxos de Email | Instant Mail",
      description: "Use temp mail para testar cadastro, confirmação de email, password reset, onboarding, QA e entrega de mensagens.",
      h1Start: "Temp Mail para Developers,",
      h1Accent: " QA, Cadastros e Resets",
      body: "Teste cadastro, confirmação de email, password reset, onboarding e QA sem criar dezenas de caixas permanentes.",
      emailLabel: "Email de teste para developer",
      inboxTitle: "Caixa de Teste Developer",
      aboutTitle: "Como developers podem usar temp mail",
    },
    "disposable-email-for-testing": {
      navLabel: "Email para Testes",
      title: "Email Descartável para Testes - Caixa QA | Instant Mail",
      description: "Crie emails descartáveis para testar formulários, entrega de email, QA, onboarding e cadastros de teste.",
      h1Start: "Email Descartável para",
      h1Accent: " Testar Fluxos",
      body: "Use uma caixa descartável para testar formulários, sistemas de cadastro, templates de email, tempo de entrega e jornadas de usuário.",
      emailLabel: "Seu email de teste",
      inboxTitle: "Caixa de Email para Testes",
      aboutTitle: "Como usar email descartável para testes",
    },
    "free-temp-mail-no-registration": {
      navLabel: "Sem Cadastro",
      title: "Temp Mail Grátis Sem Cadastro | Instant Mail",
      description: "Use temp mail grátis sem cadastro, senha ou dados pessoais. Crie uma caixa descartável instantânea online.",
      h1Start: "Temp Mail Grátis,",
      h1Accent: " Sem Cadastro",
      body: "Abra o Instant Mail e receba um endereço temporário sem criar conta, digitar senha ou informar dados pessoais.",
      emailLabel: "Seu temp mail grátis",
      inboxTitle: "Caixa Temp Mail Sem Cadastro",
      aboutTitle: "Por que usar temp mail sem cadastro?",
    },
  },
  es: {
    "temp-mail": { navLabel: "Temp Mail", title: "Temp Mail Gratis - Bandeja Temporal | Instant Mail", description: "Usa temp mail gratis para recibir mensajes, evitar spam y proteger tu correo personal.", h1Start: "Temp Mail Gratis,", h1Accent: " Para Registros Rápidos", body: "Crea un temp mail para registros, descargas, foros, pruebas gratuitas y mensajes únicos sin exponer tu bandeja principal.", emailLabel: "Tu dirección temp mail", inboxTitle: "Bandeja Temp Mail", aboutTitle: "¿Qué es temp mail?" },
    "temporary-email": { navLabel: "Correo Temporal", title: "Correo Temporal - Bandeja Privada Gratis | Instant Mail", description: "Crea un correo temporal para recibir mensajes online y proteger tu bandeja real del spam.", h1Start: "Correo Temporal,", h1Accent: " Listo Cuando Lo Necesitas", body: "Usa un correo temporal para confirmaciones, registros rápidos, pruebas y formularios sin compartir tu correo personal.", emailLabel: "Tu correo temporal", inboxTitle: "Bandeja de Correo Temporal", aboutTitle: "¿Qué es un correo temporal?" },
    "disposable-email": { navLabel: "Email Desechable", title: "Email Desechable Gratis | Instant Mail", description: "Crea un email desechable para registros rápidos, mensajes únicos y protección contra spam.", h1Start: "Email Desechable,", h1Accent: " Sin Ensuciar Tu Bandeja", body: "Usa un email desechable cuando necesitas recibir un mensaje ahora, pero no quieres dar acceso permanente a tu correo personal.", emailLabel: "Tu email desechable", inboxTitle: "Bandeja Desechable", aboutTitle: "¿Qué es un email desechable?" },
    "burner-email": { navLabel: "Burner Email", title: "Burner Email - Bandeja Temporal Privada | Instant Mail", description: "Usa un burner email para interacciones rápidas, navegación privada y registros con menos spam.", h1Start: "Burner Email,", h1Accent: " Para Registros Más Seguros", body: "Crea un burner email cuando quieres una bandeja separada para una tarea corta o un sitio que todavía no conoces.", emailLabel: "Tu burner email", inboxTitle: "Bandeja Burner Email", aboutTitle: "¿Qué es burner email?" },
    "fake-email-generator": { navLabel: "Generador de Email Falso", title: "Generador de Email Falso con Bandeja Real | Instant Mail", description: "Genera un email falso que puede recibir mensajes reales para pruebas, registros y verificación.", h1Start: "Generador de Email Falso,", h1Accent: " Con Bandeja Funcional", body: "Genera un email falso para formularios, pruebas, registros y verificaciones temporales sin inventar una dirección inútil.", emailLabel: "Tu email falso generado", inboxTitle: "Bandeja del Email Falso", aboutTitle: "¿Qué es un generador de email falso?" },
    "temporary-email-for-verification": { navLabel: "Email de Verificación", title: "Correo Temporal para Códigos de Verificación | Instant Mail", description: "Usa correo temporal para códigos de verificación, enlaces de activación y confirmaciones rápidas.", h1Start: "Correo Temporal para", h1Accent: " Códigos de Verificación", body: "Recibe códigos, enlaces de activación y confirmaciones sin exponer tu correo real en cada sitio que pruebas.", emailLabel: "Tu correo de verificación", inboxTitle: "Bandeja de Verificación", aboutTitle: "Cómo usar correo temporal para verificación" },
    "temp-mail-for-developers": { navLabel: "Para Developers", title: "Temp Mail para Developers - Prueba Flujos de Email | Instant Mail", description: "Usa temp mail para probar registros, confirmaciones, password reset, onboarding, QA y entrega de emails.", h1Start: "Temp Mail para Developers,", h1Accent: " QA, Registros y Resets", body: "Prueba registros, confirmaciones, password reset, onboarding y QA sin crear muchas bandejas permanentes.", emailLabel: "Email de prueba developer", inboxTitle: "Bandeja de Pruebas Developer", aboutTitle: "Cómo los developers usan temp mail" },
    "disposable-email-for-testing": { navLabel: "Email para Testing", title: "Email Desechable para Testing - Bandeja QA | Instant Mail", description: "Crea emails desechables para probar formularios, entrega, QA, onboarding y registros de prueba.", h1Start: "Email Desechable para", h1Accent: " Probar Flujos", body: "Usa una bandeja desechable para probar formularios, registros, plantillas de email, tiempos de entrega y recorridos de usuario.", emailLabel: "Tu email de testing", inboxTitle: "Bandeja para Testing", aboutTitle: "Cómo usar email desechable para testing" },
    "free-temp-mail-no-registration": { navLabel: "Sin Registro", title: "Temp Mail Gratis Sin Registro | Instant Mail", description: "Usa temp mail gratis sin registro, contraseña ni datos personales.", h1Start: "Temp Mail Gratis,", h1Accent: " Sin Registro", body: "Abre Instant Mail y recibe una dirección temporal sin crear cuenta, escribir contraseña ni compartir datos personales.", emailLabel: "Tu temp mail gratis", inboxTitle: "Bandeja Sin Registro", aboutTitle: "Por qué usar temp mail sin registro" },
  },
  fr: {
    "temp-mail": { navLabel: "Temp Mail", title: "Temp Mail Gratuit - Boîte Temporaire | Instant Mail", description: "Utilisez un temp mail gratuit pour recevoir des messages, éviter le spam et protéger votre adresse personnelle.", h1Start: "Temp Mail Gratuit,", h1Accent: " Pour Les Inscriptions Rapides", body: "Créez un temp mail pour les inscriptions, téléchargements, forums, essais gratuits et messages uniques sans exposer votre boîte principale.", emailLabel: "Votre adresse temp mail", inboxTitle: "Boîte Temp Mail", aboutTitle: "Qu'est-ce que le temp mail ?" },
    "temporary-email": { navLabel: "Email Temporaire", title: "Email Temporaire - Boîte Privée Gratuite | Instant Mail", description: "Créez un email temporaire pour recevoir des messages en ligne tout en protégeant votre boîte réelle du spam.", h1Start: "Email Temporaire,", h1Accent: " Prêt Quand Vous En Avez Besoin", body: "Utilisez un email temporaire pour les confirmations, inscriptions rapides, tests et formulaires sans partager votre adresse personnelle.", emailLabel: "Votre email temporaire", inboxTitle: "Boîte Email Temporaire", aboutTitle: "Qu'est-ce qu'un email temporaire ?" },
    "disposable-email": { navLabel: "Email Jetable", title: "Email Jetable Gratuit - Boîte Disposable | Instant Mail", description: "Créez un email jetable pour les inscriptions rapides, messages uniques et protection contre le spam.", h1Start: "Email Jetable,", h1Accent: " Sans Encombrer Votre Boîte", body: "Utilisez un email jetable lorsque vous devez recevoir un message maintenant, sans donner un accès permanent à votre adresse personnelle.", emailLabel: "Votre email jetable", inboxTitle: "Boîte Email Jetable", aboutTitle: "Qu'est-ce qu'un email jetable ?" },
    "burner-email": { navLabel: "Burner Email", title: "Burner Email - Boîte Temporaire Privée | Instant Mail", description: "Utilisez un burner email pour les interactions rapides, la navigation privée et les inscriptions avec moins de spam.", h1Start: "Burner Email,", h1Accent: " Pour Des Inscriptions Plus Sûres", body: "Créez un burner email quand vous voulez une boîte séparée pour une tâche courte ou un site que vous ne connaissez pas encore.", emailLabel: "Votre burner email", inboxTitle: "Boîte Burner Email", aboutTitle: "Qu'est-ce qu'un burner email ?" },
    "fake-email-generator": { navLabel: "Générateur d'Email Fictif", title: "Générateur d'Email Fictif avec Boîte Réelle | Instant Mail", description: "Générez un email fictif capable de recevoir de vrais messages pour les tests, inscriptions et vérifications.", h1Start: "Générateur d'Email Fictif,", h1Accent: " Avec Boîte Fonctionnelle", body: "Générez un email fictif pour formulaires, tests, inscriptions et vérifications temporaires sans inventer une adresse inutilisable.", emailLabel: "Votre email fictif généré", inboxTitle: "Boîte de l'Email Fictif", aboutTitle: "Qu'est-ce qu'un générateur d'email fictif ?" },
    "temporary-email-for-verification": { navLabel: "Email de Vérification", title: "Email Temporaire pour Codes de Vérification | Instant Mail", description: "Utilisez un email temporaire pour les codes de vérification, liens d'activation et confirmations rapides.", h1Start: "Email Temporaire pour", h1Accent: " Codes de Vérification", body: "Recevez des codes, liens d'activation et confirmations sans exposer votre email réel à chaque site testé.", emailLabel: "Votre email de vérification", inboxTitle: "Boîte de Vérification", aboutTitle: "Comment utiliser un email temporaire pour la vérification" },
    "temp-mail-for-developers": { navLabel: "Pour Développeurs", title: "Temp Mail pour Développeurs - Tester les Emails | Instant Mail", description: "Utilisez temp mail pour tester inscription, confirmation, password reset, onboarding, QA et livraison d'emails.", h1Start: "Temp Mail pour Développeurs,", h1Accent: " QA, Inscriptions et Resets", body: "Testez inscription, confirmation email, password reset, onboarding et QA sans créer de nombreuses boîtes permanentes.", emailLabel: "Email de test développeur", inboxTitle: "Boîte de Test Développeur", aboutTitle: "Comment les développeurs utilisent temp mail" },
    "disposable-email-for-testing": { navLabel: "Email pour Tests", title: "Email Jetable pour Tests - Boîte QA | Instant Mail", description: "Créez des emails jetables pour tester formulaires, livraison email, QA, onboarding et inscriptions de test.", h1Start: "Email Jetable pour", h1Accent: " Tester les Parcours", body: "Utilisez une boîte jetable pour tester formulaires, systèmes d'inscription, templates email, délais de livraison et parcours utilisateur.", emailLabel: "Votre email de test", inboxTitle: "Boîte Email pour Tests", aboutTitle: "Comment utiliser un email jetable pour les tests" },
    "free-temp-mail-no-registration": { navLabel: "Sans Inscription", title: "Temp Mail Gratuit Sans Inscription | Instant Mail", description: "Utilisez temp mail gratuit sans inscription, mot de passe ni données personnelles.", h1Start: "Temp Mail Gratuit,", h1Accent: " Sans Inscription", body: "Ouvrez Instant Mail et recevez une adresse temporaire sans créer de compte, saisir de mot de passe ou partager des données personnelles.", emailLabel: "Votre temp mail gratuit", inboxTitle: "Boîte Temp Mail Sans Inscription", aboutTitle: "Pourquoi utiliser temp mail sans inscription ?" },
  },
  de: {
    "temp-mail": { navLabel: "Temp Mail", title: "Temp Mail Kostenlos - Temporäres Postfach | Instant Mail", description: "Nutzen Sie kostenloses Temp Mail, um Nachrichten zu empfangen, Spam zu vermeiden und Ihre persönliche Adresse zu schützen.", h1Start: "Kostenloses Temp Mail,", h1Accent: " Für Schnelle Anmeldungen", body: "Erstellen Sie Temp Mail für Registrierungen, Downloads, Foren, kostenlose Tests und einmalige Nachrichten, ohne Ihr Hauptpostfach offenzulegen.", emailLabel: "Ihre Temp-Mail-Adresse", inboxTitle: "Temp Mail Postfach", aboutTitle: "Was ist Temp Mail?" },
    "temporary-email": { navLabel: "Temporäre E-Mail", title: "Temporäre E-Mail-Adresse - Privates Postfach | Instant Mail", description: "Erstellen Sie eine temporäre E-Mail-Adresse, um online Nachrichten zu empfangen und Ihr echtes Postfach vor Spam zu schützen.", h1Start: "Temporäre E-Mail-Adresse,", h1Accent: " Bereit Bei Bedarf", body: "Nutzen Sie eine temporäre E-Mail für Bestätigungen, schnelle Registrierungen, Tests und Formulare, ohne Ihre persönliche Adresse zu teilen.", emailLabel: "Ihre temporäre E-Mail", inboxTitle: "Temporäres E-Mail-Postfach", aboutTitle: "Was ist eine temporäre E-Mail-Adresse?" },
    "disposable-email": { navLabel: "Wegwerf-E-Mail", title: "Wegwerf-E-Mail Kostenlos | Instant Mail", description: "Erstellen Sie eine Wegwerf-E-Mail für schnelle Registrierungen, einmalige Nachrichten und Spam-Schutz.", h1Start: "Wegwerf-E-Mail,", h1Accent: " Ohne Postfach-Chaos", body: "Nutzen Sie eine Wegwerf-E-Mail, wenn eine Nachricht jetzt wichtig ist, der Absender aber keinen dauerhaften Zugang zu Ihrer Adresse braucht.", emailLabel: "Ihre Wegwerf-E-Mail", inboxTitle: "Wegwerf-E-Mail-Postfach", aboutTitle: "Was ist eine Wegwerf-E-Mail?" },
    "burner-email": { navLabel: "Burner E-Mail", title: "Burner E-Mail - Privates Temporäres Postfach | Instant Mail", description: "Nutzen Sie eine Burner E-Mail für schnelle Interaktionen, privateres Browsing und Registrierungen mit weniger Spam.", h1Start: "Burner E-Mail,", h1Accent: " Für Sicherere Anmeldungen", body: "Erstellen Sie eine Burner E-Mail, wenn Sie ein separates Postfach für eine kurze Aufgabe oder eine noch unbekannte Website möchten.", emailLabel: "Ihre Burner E-Mail", inboxTitle: "Burner E-Mail-Postfach", aboutTitle: "Was ist eine Burner E-Mail?" },
    "fake-email-generator": { navLabel: "Fake E-Mail Generator", title: "Fake E-Mail Generator mit Echtem Postfach | Instant Mail", description: "Generieren Sie eine Fake E-Mail, die echte Nachrichten für Tests, Registrierungen und Verifizierungen empfangen kann.", h1Start: "Fake E-Mail Generator,", h1Accent: " Mit Funktionierendem Postfach", body: "Generieren Sie eine Fake E-Mail für Formulare, Tests, Registrierungen und temporäre Verifizierungen, statt eine nicht erreichbare Adresse zu erfinden.", emailLabel: "Ihre generierte Fake E-Mail", inboxTitle: "Fake E-Mail Postfach", aboutTitle: "Was ist ein Fake E-Mail Generator?" },
    "temporary-email-for-verification": { navLabel: "E-Mail-Verifizierung", title: "Temporäre E-Mail für Verifizierungscodes | Instant Mail", description: "Nutzen Sie temporäre E-Mail für Verifizierungscodes, Aktivierungslinks und schnelle Registrierungsbestätigungen.", h1Start: "Temporäre E-Mail für", h1Accent: " Verifizierungscodes", body: "Empfangen Sie Codes, Aktivierungslinks und Bestätigungen, ohne Ihre echte E-Mail bei jeder getesteten Website offenzulegen.", emailLabel: "Ihre Verifizierungs-E-Mail", inboxTitle: "Verifizierungs-Postfach", aboutTitle: "So nutzen Sie temporäre E-Mail für Verifizierung" },
    "temp-mail-for-developers": { navLabel: "Für Entwickler", title: "Temp Mail für Entwickler - E-Mail-Flows Testen | Instant Mail", description: "Nutzen Sie Temp Mail zum Testen von Registrierung, E-Mail-Bestätigung, Password Reset, Onboarding, QA und Zustellung.", h1Start: "Temp Mail für Entwickler,", h1Accent: " QA, Sign-ups und Resets", body: "Testen Sie Registrierung, E-Mail-Bestätigung, Password Reset, Onboarding und QA, ohne viele permanente Postfächer anzulegen.", emailLabel: "Entwickler-Test-E-Mail", inboxTitle: "Entwickler-Testpostfach", aboutTitle: "Wie Entwickler Temp Mail nutzen" },
    "disposable-email-for-testing": { navLabel: "Test-E-Mail", title: "Wegwerf-E-Mail für Tests - QA-Postfach | Instant Mail", description: "Erstellen Sie Wegwerf-E-Mails zum Testen von Formularen, Zustellung, QA, Onboarding und Testregistrierungen.", h1Start: "Wegwerf-E-Mail für", h1Accent: " Test-Workflows", body: "Nutzen Sie ein Wegwerf-Postfach, um Formulare, Registrierungssysteme, E-Mail-Templates, Zustellzeiten und User Journeys zu testen.", emailLabel: "Ihre Test-E-Mail", inboxTitle: "Test-E-Mail-Postfach", aboutTitle: "So nutzen Sie Wegwerf-E-Mail für Tests" },
    "free-temp-mail-no-registration": { navLabel: "Ohne Registrierung", title: "Kostenloses Temp Mail Ohne Registrierung | Instant Mail", description: "Nutzen Sie kostenloses Temp Mail ohne Registrierung, Passwort oder persönliche Daten.", h1Start: "Kostenloses Temp Mail,", h1Accent: " Ohne Registrierung", body: "Öffnen Sie Instant Mail und erhalten Sie eine temporäre Adresse, ohne ein Konto zu erstellen, ein Passwort einzugeben oder persönliche Daten zu teilen.", emailLabel: "Ihr kostenloses Temp Mail", inboxTitle: "Temp Mail Ohne Registrierung", aboutTitle: "Warum Temp Mail ohne Registrierung nutzen?" },
  },
  id: {
    "temp-mail": { navLabel: "Temp Mail", title: "Temp Mail Gratis - Inbox Sementara | Instant Mail", description: "Gunakan temp mail gratis untuk menerima pesan, menghindari spam, dan melindungi email pribadi Anda.", h1Start: "Temp Mail Gratis,", h1Accent: " Untuk Daftar Cepat", body: "Buat temp mail untuk pendaftaran, unduhan, forum, uji coba gratis, dan pesan sekali pakai tanpa membuka inbox utama Anda.", emailLabel: "Alamat temp mail Anda", inboxTitle: "Inbox Temp Mail", aboutTitle: "Apa itu temp mail?" },
    "temporary-email": { navLabel: "Email Sementara", title: "Email Sementara - Inbox Privat Gratis | Instant Mail", description: "Buat email sementara untuk menerima pesan online sambil melindungi inbox asli dari spam.", h1Start: "Email Sementara,", h1Accent: " Siap Saat Dibutuhkan", body: "Gunakan email sementara untuk konfirmasi, pendaftaran cepat, pengujian, dan formulir tanpa membagikan email pribadi.", emailLabel: "Email sementara Anda", inboxTitle: "Inbox Email Sementara", aboutTitle: "Apa itu email sementara?" },
    "disposable-email": { navLabel: "Email Sekali Pakai", title: "Email Sekali Pakai Gratis | Instant Mail", description: "Buat email sekali pakai untuk pendaftaran cepat, pesan satu kali, dan perlindungan dari spam.", h1Start: "Email Sekali Pakai,", h1Accent: " Tanpa Mengotori Inbox", body: "Gunakan email sekali pakai saat Anda perlu menerima pesan sekarang, tetapi tidak ingin memberi akses permanen ke email pribadi.", emailLabel: "Email sekali pakai Anda", inboxTitle: "Inbox Email Sekali Pakai", aboutTitle: "Apa itu email sekali pakai?" },
    "burner-email": { navLabel: "Burner Email", title: "Burner Email - Inbox Sementara Privat | Instant Mail", description: "Gunakan burner email untuk interaksi cepat, browsing lebih privat, dan pendaftaran dengan lebih sedikit spam.", h1Start: "Burner Email,", h1Accent: " Untuk Daftar Lebih Aman", body: "Buat burner email saat Anda ingin inbox terpisah untuk tugas singkat atau situs yang belum sepenuhnya dipercaya.", emailLabel: "Burner email Anda", inboxTitle: "Inbox Burner Email", aboutTitle: "Apa itu burner email?" },
    "fake-email-generator": { navLabel: "Generator Email Palsu", title: "Generator Email Palsu dengan Inbox Nyata | Instant Mail", description: "Buat email palsu yang dapat menerima pesan nyata untuk pengujian, pendaftaran, dan verifikasi.", h1Start: "Generator Email Palsu,", h1Accent: " Dengan Inbox Aktif", body: "Buat email palsu untuk formulir, pengujian, pendaftaran, dan verifikasi sementara tanpa memakai alamat yang tidak bisa menerima pesan.", emailLabel: "Email palsu yang dibuat", inboxTitle: "Inbox Email Palsu", aboutTitle: "Apa itu generator email palsu?" },
    "temporary-email-for-verification": { navLabel: "Email Verifikasi", title: "Email Sementara untuk Kode Verifikasi | Instant Mail", description: "Gunakan email sementara untuk kode verifikasi, link aktivasi, dan konfirmasi pendaftaran cepat.", h1Start: "Email Sementara untuk", h1Accent: " Kode Verifikasi", body: "Terima kode, link aktivasi, dan konfirmasi tanpa membuka email asli ke setiap situs yang Anda coba.", emailLabel: "Email verifikasi Anda", inboxTitle: "Inbox Verifikasi", aboutTitle: "Cara memakai email sementara untuk verifikasi" },
    "temp-mail-for-developers": { navLabel: "Untuk Developer", title: "Temp Mail untuk Developer - Uji Alur Email | Instant Mail", description: "Gunakan temp mail untuk menguji registrasi, konfirmasi email, password reset, onboarding, QA, dan pengiriman email.", h1Start: "Temp Mail untuk Developer,", h1Accent: " QA, Registrasi, dan Reset", body: "Uji registrasi, konfirmasi email, password reset, onboarding, dan QA tanpa membuat banyak inbox permanen.", emailLabel: "Email test developer", inboxTitle: "Inbox Test Developer", aboutTitle: "Cara developer memakai temp mail" },
    "disposable-email-for-testing": { navLabel: "Email untuk Testing", title: "Email Sekali Pakai untuk Testing - Inbox QA | Instant Mail", description: "Buat email sekali pakai untuk menguji formulir, pengiriman email, QA, onboarding, dan registrasi test.", h1Start: "Email Sekali Pakai untuk", h1Accent: " Menguji Alur", body: "Gunakan inbox sekali pakai untuk menguji formulir, sistem registrasi, template email, waktu pengiriman, dan user journey.", emailLabel: "Email testing Anda", inboxTitle: "Inbox Email Testing", aboutTitle: "Cara memakai email sekali pakai untuk testing" },
    "free-temp-mail-no-registration": { navLabel: "Tanpa Registrasi", title: "Temp Mail Gratis Tanpa Registrasi | Instant Mail", description: "Gunakan temp mail gratis tanpa registrasi, password, atau data pribadi.", h1Start: "Temp Mail Gratis,", h1Accent: " Tanpa Registrasi", body: "Buka Instant Mail dan dapatkan alamat sementara tanpa membuat akun, memasukkan password, atau membagikan data pribadi.", emailLabel: "Temp mail gratis Anda", inboxTitle: "Inbox Tanpa Registrasi", aboutTitle: "Mengapa memakai temp mail tanpa registrasi?" },
  },
  hi: {
    "temp-mail": { navLabel: "Temp Mail", title: "Free Temp Mail - Temporary Inbox | Instant Mail", description: "Free temp mail से messages receive करें, spam से बचें और अपना personal email सुरक्षित रखें.", h1Start: "Free Temp Mail,", h1Accent: " Quick Sign-ups के लिए", body: "Sign-ups, downloads, forums, free trials और one-time messages के लिए temp mail बनाएं, बिना अपना main inbox expose किए.", emailLabel: "आपका temp mail address", inboxTitle: "Temp Mail Inbox", aboutTitle: "Temp mail क्या है?" },
    "temporary-email": { navLabel: "Temporary Email", title: "Temporary Email Address - Free Private Inbox | Instant Mail", description: "Online messages receive करने और real inbox को spam से बचाने के लिए temporary email बनाएं.", h1Start: "Temporary Email Address,", h1Accent: " जब जरूरत हो तब तैयार", body: "Confirmations, quick sign-ups, tests और forms के लिए temporary email use करें, बिना personal email share किए.", emailLabel: "आपका temporary email", inboxTitle: "Temporary Email Inbox", aboutTitle: "Temporary email address क्या है?" },
    "disposable-email": { navLabel: "Disposable Email", title: "Disposable Email - Free Throwaway Inbox | Instant Mail", description: "Quick sign-ups, one-time messages और spam protection के लिए disposable email बनाएं.", h1Start: "Disposable Email,", h1Accent: " Inbox Clutter के बिना", body: "जब message अभी चाहिए लेकिन sender को permanent access नहीं देना, तब disposable email use करें.", emailLabel: "आपका disposable email", inboxTitle: "Disposable Email Inbox", aboutTitle: "Disposable email क्या है?" },
    "burner-email": { navLabel: "Burner Email", title: "Burner Email - Private Temporary Inbox | Instant Mail", description: "Quick online interactions, private browsing और spam-safe sign-ups के लिए burner email use करें.", h1Start: "Burner Email,", h1Accent: " Safer Sign-ups के लिए", body: "Short task या कम trusted website के लिए अलग inbox चाहिए तो burner email बनाएं.", emailLabel: "आपका burner email", inboxTitle: "Burner Email Inbox", aboutTitle: "Burner email क्या है?" },
    "fake-email-generator": { navLabel: "Fake Email Generator", title: "Fake Email Generator with Working Inbox | Instant Mail", description: "Testing, sign-ups और verification flows के लिए real messages receive करने वाला fake email बनाएं.", h1Start: "Fake Email Generator,", h1Accent: " Working Inbox के साथ", body: "Forms, testing, sign-ups और temporary verification के लिए ऐसा fake email बनाएं जो messages receive कर सके.", emailLabel: "आपका generated fake email", inboxTitle: "Fake Email Inbox", aboutTitle: "Fake email generator क्या है?" },
    "temporary-email-for-verification": { navLabel: "Verification Email", title: "Temporary Email for Verification Codes | Instant Mail", description: "Verification codes, activation links और quick sign-up confirmations के लिए temporary email use करें.", h1Start: "Temporary Email for", h1Accent: " Verification Codes", body: "Codes, activation links और confirmations receive करें, बिना हर website पर अपना real email expose किए.", emailLabel: "आपका verification email", inboxTitle: "Verification Inbox", aboutTitle: "Verification के लिए temporary email कैसे use करें" },
    "temp-mail-for-developers": { navLabel: "For Developers", title: "Temp Mail for Developers - Test Email Flows | Instant Mail", description: "Registration, email confirmation, password reset, onboarding, QA और email delivery test करने के लिए temp mail use करें.", h1Start: "Temp Mail for Developers,", h1Accent: " QA, Sign-ups और Resets", body: "Registration, email confirmations, password reset, onboarding और QA test करें, बिना कई permanent inbox बनाए.", emailLabel: "Developer test email", inboxTitle: "Developer Test Inbox", aboutTitle: "Developers temp mail कैसे use कर सकते हैं" },
    "disposable-email-for-testing": { navLabel: "Testing Email", title: "Disposable Email for Testing - QA Inbox | Instant Mail", description: "Forms, email delivery, QA, onboarding और test registrations के लिए disposable email बनाएं.", h1Start: "Disposable Email for", h1Accent: " Testing Workflows", body: "Forms, registration systems, email templates, delivery timing और user journeys test करने के लिए disposable inbox use करें.", emailLabel: "आपका testing email", inboxTitle: "Testing Email Inbox", aboutTitle: "Testing के लिए disposable email कैसे use करें" },
    "free-temp-mail-no-registration": { navLabel: "No Registration", title: "Free Temp Mail No Registration | Instant Mail", description: "बिना registration, password या personal details के free temp mail प्राप्त करें.", h1Start: "Free Temp Mail,", h1Accent: " No Registration Required", body: "Instant Mail खोलें और बिना account, password या personal information दिए temporary address पाएं.", emailLabel: "आपका free temp mail", inboxTitle: "No-Registration Temp Mail Inbox", aboutTitle: "No-registration temp mail क्यों use करें?" },
  },
};

function mergeCopy(code: LanguageCode, slug: SeoToolSlug): ToolCopy {
  const base = englishToolCopy[slug];
  const localized = localizedToolCopy[code]?.[slug] ?? {};
  const language = languages[code];
  const localizedFeatureTitles = language.features.map((feature) => feature.title) as [
    string,
    string,
    string,
    string,
  ];
  const localizedFeatureDescriptions = language.features.map((feature) => feature.description) as [
    string,
    string,
    string,
    string,
  ];
  const localizedFaq = language.faqs.slice(0, 4).map((faq) => [
    faq.question,
    faq.answer,
  ]) as [string, string][];

  return {
    ...base,
    ...(code === "en"
      ? {}
      : {
          featuresLabel: language.featuresIntro.label,
          featuresTitle: language.featuresIntro.title,
          featuresBody: language.featuresIntro.body,
          faqTitle: language.faqIntro.title,
          aboutLabel: language.aboutIntro.label,
          featureTitles: localizedFeatureTitles,
          featureDescriptions: localizedFeatureDescriptions,
          faq: localizedFaq,
        }),
    ...localized,
    featureTitles: localized.featureTitles ?? (code === "en" ? base.featureTitles : localizedFeatureTitles),
    featureDescriptions:
      localized.featureDescriptions ??
      (code === "en" ? base.featureDescriptions : localizedFeatureDescriptions),
    faq: localized.faq ?? (code === "en" ? base.faq : localizedFaq),
    sections: localized.sections ?? localizeSections(code, base.sections, localized.aboutTitle ?? base.aboutTitle),
  };
}

function localizeSections(
  code: LanguageCode,
  sections: ToolCopy["sections"],
  fallbackTitle: string,
): ToolCopy["sections"] {
  if (code === "en") {
    return sections;
  }

  const base = languages[code];
  return [
    {
      title: fallbackTitle,
      paragraphs: [
        base.description,
        base.hero.body,
      ],
    },
    ...base.aboutSections.slice(0, 2),
  ];
}

function buildToolContent(code: LanguageCode, slug: SeoToolSlug): SeoToolContent {
  const base = languages[code];
  const copy = mergeCopy(code, slug);

  return {
    title: copy.title,
    description: copy.description,
    hero: {
      ...base.hero,
      note: copy.note,
      h1Start: copy.h1Start,
      h1Accent: copy.h1Accent,
      body: copy.body,
      emailLabel: copy.emailLabel,
      emailAria: copy.emailLabel,
      readyStatus: copy.body,
    },
    inbox: {
      ...base.inbox,
      title: copy.inboxTitle,
      emptyTitle: copy.emptyTitle,
      emptyBody: copy.emptyBody,
    },
    featuresIntro: {
      label: copy.featuresLabel,
      title: copy.featuresTitle,
      body: copy.featuresBody,
    },
    faqIntro: {
      ...base.faqIntro,
      title: copy.faqTitle,
    },
    aboutIntro: {
      label: copy.aboutLabel,
      title: copy.aboutTitle,
    },
    features: [
      { icon: Zap, title: copy.featureTitles[0], description: copy.featureDescriptions[0] },
      { icon: Shield, title: copy.featureTitles[1], description: copy.featureDescriptions[1] },
      { icon: Mail, title: copy.featureTitles[2], description: copy.featureDescriptions[2] },
      { icon: UserRound, title: copy.featureTitles[3], description: copy.featureDescriptions[3] },
    ],
    faqs: copy.faq.map(([question, answer]) => ({ question, answer })),
    aboutSections: copy.sections,
  };
}

export const seoToolPages: Record<SeoToolSlug, Record<LanguageCode, SeoToolContent>> =
  seoToolSlugs.reduce((pages, slug) => {
    pages[slug] = languageOrder.reduce((byLanguage, code) => {
      byLanguage[code] = buildToolContent(code, slug);
      return byLanguage;
    }, {} as Record<LanguageCode, SeoToolContent>);
    return pages;
  }, {} as Record<SeoToolSlug, Record<LanguageCode, SeoToolContent>>);

export function isSeoToolSlug(value: string | undefined): value is SeoToolSlug {
  return !!value && seoToolSlugs.includes(value as SeoToolSlug);
}

export function getToolNavigationItems(code: LanguageCode): { slug: ToolSlug; label: string }[] {
  return [
    { slug: "tools" as const, label: toolsContent[code].h1 },
    { slug: "tools/email-dns-checker" as const, label: getStandaloneToolCopy(code, "email-dns-checker").navLabel },
    { slug: "tools/what-is-my-ip" as const, label: getStandaloneToolCopy(code, "what-is-my-ip").navLabel },
    { slug: "tools/password-generator" as const, label: getStandaloneToolCopy(code, "password-generator").navLabel },
    { slug: "temp-mail" as const, label: mergeCopy(code, "temp-mail").navLabel },
    { slug: "temporary-email" as const, label: mergeCopy(code, "temporary-email").navLabel },
    { slug: "disposable-email" as const, label: mergeCopy(code, "disposable-email").navLabel },
    { slug: tenMinuteSlug, label: tenMinuteContent[code].hero.h1Start.replace(/,$/, "") },
    { slug: "burner-email" as const, label: mergeCopy(code, "burner-email").navLabel },
    { slug: "fake-email-generator" as const, label: mergeCopy(code, "fake-email-generator").navLabel },
    {
      slug: "temporary-email-for-verification" as const,
      label: mergeCopy(code, "temporary-email-for-verification").navLabel,
    },
    { slug: "temp-mail-for-developers" as const, label: mergeCopy(code, "temp-mail-for-developers").navLabel },
    {
      slug: "disposable-email-for-testing" as const,
      label: mergeCopy(code, "disposable-email-for-testing").navLabel,
    },
    {
      slug: "free-temp-mail-no-registration" as const,
      label: mergeCopy(code, "free-temp-mail-no-registration").navLabel,
    },
  ];
}
