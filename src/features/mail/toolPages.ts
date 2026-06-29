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
  "temporary-email",
  "temporary-email-for-verification",
  "temp-mail-for-developers",
  "disposable-email-for-testing",
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
  "temporary-email": {
    navLabel: "Temporary Email",
    title: "Temporary Email Address - Private Short-Term Inbox | Instant Mail",
    description:
      "Create a temporary email address for short-term messages while keeping your personal inbox private and protected from spam.",
    note: "Temporary email · Privacy buffer",
    h1Start: "Temporary Email Address,",
    h1Accent: " For Short-Term Messages",
    body:
      "Use a temporary email address when you need to receive a message once, check a low-risk sign-up, or keep a website away from your personal inbox.",
    emailLabel: "Your temporary email address",
    inboxTitle: "Temporary Email Inbox",
    emptyTitle: "Waiting for your first temporary email.",
    emptyBody:
      "Copy the address, use it on a website, and return here to read confirmations, codes, or activation messages.",
    featuresLabel: "Privacy-first workflow",
    featuresTitle: "A clean inbox buffer for everyday browsing",
    featuresBody:
      "This page is for general temporary email use: receiving short-term messages without turning your personal address into another marketing target.",
    faqTitle: "Temporary Email questions",
    aboutLabel: "Temporary email guide",
    aboutTitle: "What makes a temporary email useful?",
    featureTitles: ["Private buffer", "Quick setup", "Live messages", "Low-risk use"],
    featureDescriptions: [
      "Keep unknown websites away from your permanent email identity.",
      "Start receiving messages without account setup or personal information.",
      "Refresh the inbox and open messages directly in the page.",
      "Use it for simple tasks, not sensitive or permanent accounts.",
    ],
    faq: [
      ["What is a temporary email address?", "It is an address created for short-term use, usually for confirmations, codes, or one-time messages."],
      ["Is temporary email private?", "It helps protect your main inbox, but it should not be used for sensitive data or important accounts."],
      ["Can I change the address?", "Yes. Use the change button to generate another temporary address."],
      ["What should I avoid?", "Avoid banking, payments, private files, business accounts, and anything you may need to recover later."],
    ],
    sections: [
      {
        title: "Temporary email as an inbox shield",
        paragraphs: [
          "A temporary email address is useful when you want to interact with a website without adding your real address to another marketing database.",
          "It is especially helpful for sign-up gates, product downloads, public forums, Wi-Fi portals, and quick online forms.",
        ],
      },
      {
        title: "When temporary email makes sense",
        paragraphs: ["Use it when the email is useful now but unlikely to matter later."],
        bullets: [
          "Activation links",
          "One-time verification",
          "Resource downloads",
          "Short-lived online accounts",
          "Newsletter previews",
          "Spam-prone websites",
        ],
      },
      {
        title: "When to use your real email instead",
        paragraphs: [
          "Use a permanent email address for services where identity, billing, recovery, or long-term access matters. Temporary email is a convenience tool, not a replacement for a trusted personal inbox.",
        ],
      },
    ],
  },
  "temporary-email-for-verification": {
    navLabel: "Email Verification",
    title: "Temporary Email for Verification Codes | Instant Mail",
    description:
      "Use a temporary email for verification codes, activation links, sign-up confirmations, and low-risk account checks.",
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
      "This page focuses on messages that exist to confirm an action: codes, links, one-time passwords, and short sign-up checks.",
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
      ["Can I receive verification codes?", "Yes. Use the temporary address during sign-up and the code should appear if the website sends it."],
      ["Can I click activation links?", "Yes, but Instant Mail shows a safety warning before opening links from emails."],
      ["Is this good for important accounts?", "No. Use your real email for accounts you need to keep, recover, or secure long term."],
      ["What if the code does not arrive?", "Refresh after a few seconds. Some services block temporary domains or delay email delivery."],
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
          "Low-risk app registration",
          "Email field testing",
          "Confirmation email review",
        ],
      },
      {
        title: "Verification safety",
        paragraphs: [
          "Verification emails often contain links. Instant Mail warns before opening external email links, but you should still avoid suspicious pages and never enter payment, banking, or private information through an unknown message.",
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
    featuresTitle: "A temporary inbox for product and engineering teams",
    featuresBody:
      "This page is for people building software. Use it to manually verify that user-facing email flows arrive, render, and link correctly.",
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
      {
        title: "Testing limits",
        paragraphs: [
          "Temporary email is useful for manual checks, but it should not be your only source of truth for transactional email reliability. Production systems still need logs, monitored providers, and controlled test environments.",
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
      "Use a disposable inbox to test forms, email templates, delivery timing, and user journeys without cluttering a real mailbox.",
    emailLabel: "Your testing email",
    inboxTitle: "Testing Email Inbox",
    emptyTitle: "Ready for your test message.",
    emptyBody:
      "Send test confirmations, form submissions, or onboarding emails to this address and review them here.",
    featuresLabel: "Testing use cases",
    featuresTitle: "Fast manual checks for email-dependent products",
    featuresBody:
      "This page is for QA and content checks. Use it to inspect whether a message arrives, looks right, and matches the action that triggered it.",
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
      {
        title: "QA vs developer testing",
        paragraphs: [
          "Developer testing focuses on whether the application flow works. QA testing focuses on the user-facing result: content, layout, links, timing, and whether the email matches the expected scenario.",
        ],
      },
    ],
  },
};

const localizedToolCopy: Partial<Record<LanguageCode, Partial<Record<SeoToolSlug, Partial<ToolCopy>>>>> = {
  pt: {
    "temporary-email": {
      navLabel: "Email Temporário",
      title: "Email Temporário - Caixa Privada de Curto Prazo | Instant Mail",
      description: "Crie um email temporário para mensagens rápidas, proteção contra spam e privacidade em cadastros simples.",
      h1Start: "Email Temporário,",
      h1Accent: " Para Mensagens de Curto Prazo",
      body: "Use um email temporário quando precisar receber uma mensagem uma vez, testar um cadastro simples ou proteger sua caixa pessoal.",
      emailLabel: "Seu email temporário",
      inboxTitle: "Caixa de Email Temporário",
      aboutTitle: "Quando o email temporário é útil?",
    },
    "temporary-email-for-verification": {
      navLabel: "Email para Verificação",
      title: "Email Temporário para Códigos de Verificação | Instant Mail",
      description: "Use email temporário para códigos de verificação, links de ativação e confirmações rápidas de baixo risco.",
      h1Start: "Email Temporário para",
      h1Accent: " Códigos de Verificação",
      body: "Receba códigos, links de ativação e confirmações sem expor seu email real a cada site que você testa.",
      emailLabel: "Seu email para verificação",
      inboxTitle: "Caixa de Verificação",
      aboutTitle: "Como usar email temporário para verificação",
    },
    "temp-mail-for-developers": {
      navLabel: "Para Developers",
      title: "Temp Mail para Developers - Teste Fluxos de Email | Instant Mail",
      description: "Use temp mail para testar cadastro, confirmação, password reset, onboarding, QA e entrega de emails.",
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
      description: "Crie emails descartáveis para testar formulários, entrega de mensagens, QA, onboarding e cadastros de teste.",
      h1Start: "Email Descartável para",
      h1Accent: " Testar Fluxos",
      body: "Use uma caixa descartável para testar formulários, templates de email, tempo de entrega e jornadas de usuário.",
      emailLabel: "Seu email de teste",
      inboxTitle: "Caixa de Email para Testes",
      aboutTitle: "Como usar email descartável para testes",
    },
  },
  es: {
    "temporary-email": { navLabel: "Correo Temporal", title: "Correo Temporal - Bandeja Privada de Corto Plazo | Instant Mail", description: "Crea un correo temporal para mensajes rápidos, privacidad y protección contra spam.", h1Start: "Correo Temporal,", h1Accent: " Para Mensajes de Corto Plazo", body: "Usa un correo temporal cuando necesitas recibir un mensaje una vez o proteger tu bandeja personal.", emailLabel: "Tu correo temporal", inboxTitle: "Bandeja de Correo Temporal", aboutTitle: "Cuándo usar correo temporal" },
    "temporary-email-for-verification": { navLabel: "Email de Verificación", title: "Correo Temporal para Códigos de Verificación | Instant Mail", description: "Usa correo temporal para códigos de verificación, enlaces de activación y confirmaciones rápidas.", h1Start: "Correo Temporal para", h1Accent: " Códigos de Verificación", body: "Recibe códigos, enlaces de activación y confirmaciones sin exponer tu correo real en cada sitio.", emailLabel: "Tu correo de verificación", inboxTitle: "Bandeja de Verificación", aboutTitle: "Cómo usar correo temporal para verificación" },
    "temp-mail-for-developers": { navLabel: "Para Developers", title: "Temp Mail para Developers - Prueba Flujos de Email | Instant Mail", description: "Usa temp mail para probar registros, confirmaciones, password reset, onboarding, QA y entrega.", h1Start: "Temp Mail para Developers,", h1Accent: " QA, Registros y Resets", body: "Prueba registros, confirmaciones, password reset, onboarding y QA sin crear muchas bandejas permanentes.", emailLabel: "Email de prueba developer", inboxTitle: "Bandeja de Pruebas Developer", aboutTitle: "Cómo los developers usan temp mail" },
    "disposable-email-for-testing": { navLabel: "Email para Testing", title: "Email Desechable para Testing - Bandeja QA | Instant Mail", description: "Crea emails desechables para probar formularios, entrega, QA, onboarding y registros de prueba.", h1Start: "Email Desechable para", h1Accent: " Probar Flujos", body: "Usa una bandeja desechable para probar formularios, plantillas de email, tiempos de entrega y recorridos de usuario.", emailLabel: "Tu email de testing", inboxTitle: "Bandeja para Testing", aboutTitle: "Cómo usar email desechable para testing" },
  },
  fr: {
    "temporary-email": { navLabel: "Email Temporaire", title: "Email Temporaire - Boîte Privée de Courte Durée | Instant Mail", description: "Créez un email temporaire pour les messages rapides, la confidentialité et la protection contre le spam.", h1Start: "Email Temporaire,", h1Accent: " Pour Messages de Courte Durée", body: "Utilisez un email temporaire quand vous devez recevoir un message une seule fois ou protéger votre boîte personnelle.", emailLabel: "Votre email temporaire", inboxTitle: "Boîte Email Temporaire", aboutTitle: "Quand utiliser un email temporaire" },
    "temporary-email-for-verification": { navLabel: "Email de Vérification", title: "Email Temporaire pour Codes de Vérification | Instant Mail", description: "Utilisez un email temporaire pour les codes de vérification, liens d'activation et confirmations rapides.", h1Start: "Email Temporaire pour", h1Accent: " Codes de Vérification", body: "Recevez codes, liens d'activation et confirmations sans exposer votre vraie adresse à chaque site.", emailLabel: "Votre email de vérification", inboxTitle: "Boîte de Vérification", aboutTitle: "Comment utiliser un email temporaire pour la vérification" },
    "temp-mail-for-developers": { navLabel: "Pour Développeurs", title: "Temp Mail pour Développeurs - Tester les Emails | Instant Mail", description: "Utilisez temp mail pour tester inscription, confirmation, password reset, onboarding, QA et livraison.", h1Start: "Temp Mail pour Développeurs,", h1Accent: " QA, Inscriptions et Resets", body: "Testez inscription, confirmation email, password reset, onboarding et QA sans créer de nombreuses boîtes permanentes.", emailLabel: "Email de test développeur", inboxTitle: "Boîte de Test Développeur", aboutTitle: "Comment les développeurs utilisent temp mail" },
    "disposable-email-for-testing": { navLabel: "Email pour Tests", title: "Email Jetable pour Tests - Boîte QA | Instant Mail", description: "Créez des emails jetables pour tester formulaires, livraison email, QA, onboarding et inscriptions de test.", h1Start: "Email Jetable pour", h1Accent: " Tester les Parcours", body: "Utilisez une boîte jetable pour tester formulaires, templates email, délais de livraison et parcours utilisateur.", emailLabel: "Votre email de test", inboxTitle: "Boîte Email pour Tests", aboutTitle: "Comment utiliser un email jetable pour les tests" },
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
          featuresTitle: localized.featuresTitle ?? base.featuresTitle,
          featuresBody: localized.featuresBody ?? base.featuresBody,
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
    { slug: "tools/fake-data-generator" as const, label: getStandaloneToolCopy(code, "fake-data-generator").navLabel },
    { slug: "tools/qr-code-generator" as const, label: getStandaloneToolCopy(code, "qr-code-generator").navLabel },
    { slug: "temporary-email" as const, label: mergeCopy(code, "temporary-email").navLabel },
    { slug: tenMinuteSlug, label: tenMinuteContent[code].hero.h1Start.replace(/,$/, "") },
    {
      slug: "temporary-email-for-verification" as const,
      label: mergeCopy(code, "temporary-email-for-verification").navLabel,
    },
    { slug: "temp-mail-for-developers" as const, label: mergeCopy(code, "temp-mail-for-developers").navLabel },
    {
      slug: "disposable-email-for-testing" as const,
      label: mergeCopy(code, "disposable-email-for-testing").navLabel,
    },
  ];
}
