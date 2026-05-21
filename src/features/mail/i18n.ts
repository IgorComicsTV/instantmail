import type { LucideIcon } from "lucide-react";
import Mail from "lucide-react/dist/esm/icons/mail.js";
import Shield from "lucide-react/dist/esm/icons/shield.js";
import UserRound from "lucide-react/dist/esm/icons/user-round.js";
import Zap from "lucide-react/dist/esm/icons/zap.js";

export type LanguageCode = "en" | "pt" | "es" | "fr" | "de" | "id" | "hi";
export type TrustPageKey = "privacy" | "terms" | "contact" | "about" | "faq";

export type SeoSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  after?: string;
};

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type LanguageContent = {
  code: LanguageCode;
  locale: string;
  flag: string;
  name: string;
  title: string;
  description: string;
  nav: {
    inbox: string;
    features: string;
    faq: string;
    about: string;
    openInbox: string;
  };
  hero: {
    note: string;
    h1Start: string;
    h1Accent: string;
    body: string;
    emailLabel: string;
    emailAria: string;
    creatingAddress: string;
    copyEmail: string;
    copied: string;
    refresh: string;
    change: string;
    delete: string;
    creatingStatus: string;
    readyStatus: string;
  };
  inbox: {
    label: string;
    title: string;
    updated: string;
    messageSingular: string;
    messagePlural: string;
    unread: string;
    refreshInbox: string;
    sender: string;
    subject: string;
    time: string;
    action: string;
    emptyTitle: string;
    emptyBody: string;
    noSubject: string;
    new: string;
    introFallback: string;
    view: string;
    notUpdated: string;
  };
  featuresIntro: {
    label: string;
    title: string;
    body: string;
  };
  faqIntro: {
    label: string;
    title: string;
  };
  aboutIntro: {
    label: string;
    title: string;
  };
  footer: {
    copyright: string;
    poweredPrefix: string;
    poweredSuffix: string;
    privacy: string;
    terms: string;
    contact: string;
    about: string;
    faq: string;
  };
  modal: {
    received: string;
    close: string;
    opening: string;
    fetching: string;
    errorTitle: string;
    errorFallback: string;
    tryAgain: string;
    attachment: string;
    attachments: string;
    download: string;
  };
  linkWarning: {
    title: string;
    message: string;
    destination: string;
    warning: string;
    responsibility: string;
    invalidLink: string;
    cancel: string;
    continueAnyway: string;
  };
  errors: {
    refresh: string;
    noDomains: string;
    create: string;
    copy: string;
    open: string;
    noSessionDownload: string;
    download: string;
    downloaded: string;
    downloading: string;
  };
  features: Feature[];
  faqs: Faq[];
  aboutSections: SeoSection[];
  trustPages: Record<TrustPageKey, { title: string; description: string; sections: SeoSection[] }>;
};

export type TenMinuteContent = Pick<
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
> & {
  timer: {
    label: string;
    expiresIn: string;
    expired: string;
    creatingNew: string;
    responsibleUse: string;
  };
  adLabel: string;
};

const enAbout: SeoSection[] = [
  {
    title: "What Is Instant Mail?",
    paragraphs: [
      "Instant Mail is a free temporary email service that lets you receive emails without using your personal inbox. You can create a disposable email address instantly and use it for verification codes, activation links, sign-up emails, and one-time messages.",
      "A temporary email address is also known as temp mail, 10 minute mail, disposable email, throwaway email, burner email, trash mail, fake email, anonymous email, or temporary inbox.",
    ],
  },
  {
    title: "Why Use a Disposable Temporary Email?",
    paragraphs: [
      "Many websites ask for an email address before letting you create an account, download a file, join a forum, or confirm your registration. Once you share your real email, your inbox can quickly fill with spam, newsletters, and unwanted promotions.",
      "Instant Mail helps you receive important one-time messages without exposing your real identity.",
      "Use Instant Mail when you need to:",
    ],
    bullets: [
      "Receive email verification codes",
      "Sign up for websites without using your real email",
      "Create temporary accounts for testing",
      "Avoid spam and unwanted marketing emails",
      "Protect your personal email from data leaks",
      "Receive activation links instantly",
    ],
    after:
      "Instant Mail is fast, simple, and built for people who want more control over their online privacy.",
  },
  {
    title: "How Does Temporary Email Work?",
    paragraphs: [
      "Temporary email works by generating a disposable address that can receive messages for short-term use. You do not need to create an account, register with personal details, or set up a password.",
      "Copy your Instant Mail address, paste it into the website or app that requires email, and read incoming messages directly inside your temporary inbox.",
    ],
  },
  {
    title: "Temp Mail vs Regular Email",
    paragraphs: [
      "A regular email address is best for personal communication, work, banking, shopping accounts, and long-term services. A temporary email address is better for short-term tasks where you do not want to expose your main inbox.",
      "Use your real email for important accounts. Use Instant Mail for everything else.",
    ],
  },
  {
    title: "Is Instant Mail Safe?",
    paragraphs: [
      "Instant Mail helps protect your privacy by allowing you to receive emails without sharing your personal email address. Since no personal registration is required, it is convenient for short-term and low-risk activity.",
      "Do not use disposable email for banking, payment services, private documents, important business accounts, or any service you may need to recover later.",
    ],
  },
];

const content: Record<LanguageCode, LanguageContent> = {
  en: {
    code: "en",
    locale: "en-US",
    flag: "🇺🇸",
    name: "English",
    title: "Instant Mail - Free Temp Mail & Disposable Email Address",
    description:
      "Create a free temporary email address with Instant Mail. Receive verification codes, protect your inbox, avoid spam, and stay private online.",
    nav: {
      inbox: "Inbox",
      features: "Features",
      faq: "FAQ",
      about: "About",
      openInbox: "Open inbox",
    },
    hero: {
      note: "No registration · Instant access",
      h1Start: "Instant Temporary Email,",
      h1Accent: " Ready in Seconds",
      body: "Instant Mail gives you a disposable inbox for sign-ups, verification codes, and one-time messages without spam reaching your real email.",
      emailLabel: "Your temporary email",
      emailAria: "Current temporary email address",
      creatingAddress: "Creating your address...",
      copyEmail: "Copy email",
      copied: "Copied",
      refresh: "Refresh",
      change: "Change",
      delete: "Delete",
      creatingStatus: "Generating your disposable address...",
      readyStatus:
        "Copy this address, use it anywhere, and your messages will appear below.",
    },
    inbox: {
      label: "Live inbox",
      title: "Incoming messages",
      updated: "Updated",
      messageSingular: "message",
      messagePlural: "messages",
      unread: "unread",
      refreshInbox: "Refresh inbox",
      sender: "Sender",
      subject: "Subject",
      time: "Time",
      action: "Action",
      emptyTitle: "Your inbox is empty. Waiting for incoming emails.",
      emptyBody:
        "Paste your Instant Mail address on any website. Messages will show up here automatically while this page stays open.",
      noSubject: "No subject",
      new: "New",
      introFallback: "Open to read the full message.",
      view: "View",
      notUpdated: "Not updated yet",
    },
    featuresIntro: {
      label: "Why Instant Mail",
      title: "Fast, private, and built for everyday sign-ups",
      body: "Everything you need from a temp mail service without friction, clutter, or dark patterns.",
    },
    faqIntro: { label: "FAQ", title: "Common questions" },
    aboutIntro: {
      label: "About Instant Mail",
      title: "Free temp mail for privacy and spam protection",
    },
    footer: {
      copyright: "© 2026 Instant Mail. Disposable email for quick, private use.",
      poweredPrefix: "Powered by the public",
      poweredSuffix: "API.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      contact: "Contact",
      about: "About Instant Mail",
      faq: "FAQ",
    },
    modal: {
      received: "Received",
      close: "Close",
      opening: "Opening message",
      fetching: "Fetching the full email content now.",
      errorTitle: "Could not open this email",
      errorFallback: "The provider did not return the full message content.",
      tryAgain: "Try again",
      attachment: "attachment",
      attachments: "attachments",
      download: "Download",
    },
    linkWarning: {
      title: "Be careful with links in emails",
      message: "This link will open an external website:",
      destination: "Destination:",
      warning:
        "Temporary inboxes can receive messages from unknown senders. Avoid opening suspicious links, downloading files, or entering personal information.",
      responsibility:
        "Instant Mail does not control external websites and is not responsible for content accessed outside the platform.",
      invalidLink: "This link cannot be opened because it is invalid or uses an unsafe protocol.",
      cancel: "Cancel",
      continueAnyway: "Continue anyway",
    },
    errors: {
      refresh: "Could not refresh the inbox.",
      noDomains: "No domains are available right now.",
      create: "Could not create a temporary email address.",
      copy: "Could not copy automatically. Select and copy the address instead.",
      open: "Could not open this message.",
      noSessionDownload: "No active email session is available for this download.",
      download: "Could not download attachment.",
      downloaded: "Downloaded.",
      downloading: "Downloading...",
    },
    features: [
      {
        icon: Zap,
        title: "Instant inbox",
        description:
          "Your temporary address is ready the moment you open Instant Mail. No setup, no waiting.",
      },
      {
        icon: Shield,
        title: "Privacy protection",
        description:
          "Keep sign-ups, downloads, and verification flows away from your personal email address.",
      },
      {
        icon: Mail,
        title: "Spam-free signups",
        description:
          "Use a disposable inbox for one-time messages and stop newsletters from flooding your main inbox.",
      },
      {
        icon: UserRound,
        title: "No registration",
        description:
          "No account, no password, no forms. Copy your email and start receiving messages immediately.",
      },
    ],
    faqs: [
      {
        question: "What is Instant Mail?",
        answer:
          "Instant Mail is a free temporary email service. It gives you a disposable inbox you can use for sign-ups, verification codes, and short-term online activity without exposing your real email.",
      },
      {
        question: "How do I use my temporary email?",
        answer:
          "Copy the address shown on the page, paste it wherever a website asks for email, then return here. Incoming messages appear in your inbox automatically.",
      },
      {
        question: "Do I need to create an account?",
        answer:
          "No. Instant Mail works instantly with no registration, no password, and no personal details required.",
      },
      {
        question: "How long does the inbox last?",
        answer:
          "Your session stays available while you keep this page open. You can generate a new address anytime with the change button.",
      },
      {
        question: "Is temporary email safe?",
        answer:
          "It is great for low-risk use like verifications and test sign-ups. Do not use it for banking, payments, or accounts you may need to recover later.",
      },
      {
        question: "Why is my inbox empty?",
        answer:
          "Messages arrive only after a website sends mail to your address. Keep this tab open and refresh if needed. New emails will show up here.",
      },
    ],
    aboutSections: enAbout,
    trustPages: {
      privacy: {
        title: "Privacy Policy",
        description:
          "How Instant Mail handles temporary email sessions, local storage, provider requests, and privacy.",
        sections: [
          {
            title: "Privacy Policy",
            paragraphs: [
              "Instant Mail is designed for short-term email use. The service creates a temporary inbox so you can receive messages without sharing your personal email address.",
              "In this MVP, email sessions are stored locally in your browser. Instant Mail does not ask for your name, password, payment details, or personal account information.",
            ],
          },
          {
            title: "Temporary inbox data",
            paragraphs: [
              "Messages are requested from the temporary email provider when you open or refresh your inbox. Do not use Instant Mail for sensitive accounts, private documents, banking, payments, or services you need to recover later.",
            ],
          },
        ],
      },
      terms: {
        title: "Terms of Use",
        description: "Rules for using Instant Mail responsibly and safely.",
        sections: [
          {
            title: "Terms of Use",
            paragraphs: [
              "Instant Mail is provided as a free temporary email tool for everyday low-risk online use, testing, and one-time verification.",
              "You agree not to use Instant Mail for illegal activity, abuse, spam, fraud, harassment, or any service where you need long-term account ownership.",
            ],
          },
          {
            title: "No permanent access",
            paragraphs: [
              "Temporary inboxes are not permanent. Messages, addresses, or access may stop working at any time depending on provider availability and browser session state.",
            ],
          },
        ],
      },
      contact: {
        title: "Contact",
        description: "How to contact Instant Mail for feedback, issues, and product questions.",
        sections: [
          {
            title: "Contact",
            paragraphs: [
              "For questions, feedback, abuse reports, or product issues, contact the Instant Mail team by email.",
              "Email: contact@instantmail.online",
            ],
          },
        ],
      },
      about: {
        title: "About Instant Mail",
        description:
          "Instant Mail is a free temporary email tool created to help users receive short-term emails, avoid spam, and protect their personal inbox during everyday online sign-ups.",
        sections: [
          {
            title: "About Instant Mail",
            paragraphs: [
              "Instant Mail is a free temporary email tool created to help users receive short-term emails, avoid spam, and protect their personal inbox during everyday online sign-ups.",
              "The product is built for quick verifications, test accounts, downloads, and low-risk services where using a personal inbox is unnecessary.",
            ],
          },
        ],
      },
      faq: {
        title: "FAQ",
        description: "Common questions about Instant Mail and temporary email addresses.",
        sections: enAbout.slice(0, 1),
      },
    },
  },
  pt: {
    code: "pt",
    locale: "pt-BR",
    flag: "🇧🇷",
    name: "Português",
    title: "Email temporário grátis - Email descartável | Instant Mail",
    description:
      "Crie um email temporário grátis com o Instant Mail. Use email descartável, gerador de email falso e email temporário para verificação sem expor sua caixa principal.",
    nav: {
      inbox: "Caixa de entrada",
      features: "Recursos",
      faq: "FAQ",
      about: "Sobre",
      openInbox: "Abrir caixa",
    },
    hero: {
      note: "Sem cadastro · Acesso imediato",
      h1Start: "Email temporário grátis,",
      h1Accent: " pronto em segundos",
      body: "O Instant Mail cria um email descartável para cadastros, códigos de verificação e mensagens rápidas sem levar spam para seu email principal.",
      emailLabel: "Seu email temporário",
      emailAria: "Endereço de email temporário atual",
      creatingAddress: "Criando seu endereço...",
      copyEmail: "Copiar email",
      copied: "Copiado",
      refresh: "Atualizar",
      change: "Trocar",
      delete: "Excluir",
      creatingStatus: "Gerando seu endereço descartável...",
      readyStatus:
        "Copie este endereço, use onde precisar e as mensagens aparecerão abaixo.",
    },
    inbox: {
      label: "Caixa ativa",
      title: "Mensagens recebidas",
      updated: "Atualizado",
      messageSingular: "mensagem",
      messagePlural: "mensagens",
      unread: "não lida",
      refreshInbox: "Atualizar caixa",
      sender: "Remetente",
      subject: "Assunto",
      time: "Horário",
      action: "Ação",
      emptyTitle: "Sua caixa está vazia. Aguardando novos emails.",
      emptyBody:
        "Cole seu endereço do Instant Mail em qualquer site. As mensagens aparecerão aqui automaticamente enquanto esta página estiver aberta.",
      noSubject: "Sem assunto",
      new: "Novo",
      introFallback: "Abra para ler a mensagem completa.",
      view: "Ver",
      notUpdated: "Ainda não atualizado",
    },
    featuresIntro: {
      label: "Por que usar",
      title: "Rápido, privado e feito para cadastros do dia a dia",
      body: "Tudo que você precisa de um serviço de email temporário sem cadastro, confusão ou etapas desnecessárias.",
    },
    faqIntro: { label: "FAQ", title: "Perguntas frequentes" },
    aboutIntro: {
      label: "Sobre o Instant Mail",
      title: "Email temporário grátis para privacidade e proteção contra spam",
    },
    footer: {
      copyright: "© 2026 Instant Mail. Email descartável para uso rápido e privado.",
      poweredPrefix: "Funciona com a API pública",
      poweredSuffix: ".",
      privacy: "Política de Privacidade",
      terms: "Termos de Uso",
      contact: "Contato",
      about: "Sobre o Instant Mail",
      faq: "FAQ",
    },
    modal: {
      received: "Recebido",
      close: "Fechar",
      opening: "Abrindo mensagem",
      fetching: "Carregando o conteúdo completo do email.",
      errorTitle: "Não foi possível abrir este email",
      errorFallback: "O provedor não retornou o conteúdo completo da mensagem.",
      tryAgain: "Tentar novamente",
      attachment: "anexo",
      attachments: "anexos",
      download: "Baixar",
    },
    linkWarning: {
      title: "Tenha cuidado com links em emails",
      message: "Este link abrirá um site externo:",
      destination: "Destino:",
      warning:
        "Caixas temporárias podem receber mensagens de remetentes desconhecidos. Evite abrir links suspeitos, baixar arquivos ou inserir informações pessoais.",
      responsibility:
        "O Instant Mail não controla sites externos e não se responsabiliza por conteúdos acessados fora da plataforma.",
      invalidLink: "Este link não pode ser aberto porque é inválido ou usa um protocolo inseguro.",
      cancel: "Cancelar",
      continueAnyway: "Continuar mesmo assim",
    },
    errors: {
      refresh: "Não foi possível atualizar a caixa de entrada.",
      noDomains: "Nenhum domínio está disponível no momento.",
      create: "Não foi possível criar um email temporário.",
      copy: "Não foi possível copiar automaticamente. Selecione e copie o endereço.",
      open: "Não foi possível abrir esta mensagem.",
      noSessionDownload: "Não há uma sessão ativa para baixar este arquivo.",
      download: "Não foi possível baixar o anexo.",
      downloaded: "Baixado.",
      downloading: "Baixando...",
    },
    features: [
      {
        icon: Zap,
        title: "Caixa instantânea",
        description:
          "Seu endereço temporário fica pronto assim que você abre o Instant Mail. Sem configuração e sem espera.",
      },
      {
        icon: Shield,
        title: "Proteção de privacidade",
        description:
          "Mantenha cadastros, downloads e verificações longe do seu endereço pessoal.",
      },
      {
        icon: Mail,
        title: "Cadastros sem spam",
        description:
          "Use uma caixa descartável para mensagens únicas e evite newsletters no email principal.",
      },
      {
        icon: UserRound,
        title: "Sem cadastro",
        description:
          "Sem conta, senha ou formulários. Copie seu email e comece a receber mensagens.",
      },
    ],
    faqs: [
      {
        question: "O que é o Instant Mail?",
        answer:
          "Instant Mail é um serviço gratuito de email temporário. Ele cria uma caixa descartável para cadastros, códigos de verificação e uso online de curto prazo sem expor seu email real.",
      },
      {
        question: "Como uso meu email temporário?",
        answer:
          "Copie o endereço exibido na página, cole no site que pediu email e volte aqui. As mensagens recebidas aparecem automaticamente.",
      },
      {
        question: "Preciso criar uma conta?",
        answer:
          "Não. O Instant Mail funciona imediatamente, sem cadastro, senha ou dados pessoais.",
      },
      {
        question: "Por quanto tempo a caixa dura?",
        answer:
          "Sua sessão fica disponível enquanto a página estiver aberta. Você pode gerar um novo endereço quando quiser.",
      },
      {
        question: "Email temporário é seguro?",
        answer:
          "É útil para usos de baixo risco, como verificações e testes. Não use para bancos, pagamentos ou contas que talvez precise recuperar.",
      },
      {
        question: "Por que minha caixa está vazia?",
        answer:
          "As mensagens só chegam depois que um site envia email para seu endereço. Mantenha a aba aberta e atualize se necessário.",
      },
    ],
    aboutSections: [
      {
        title: "O que é email temporário descartável?",
        paragraphs: [
          "Email temporário é um endereço criado para receber mensagens por pouco tempo sem usar seu email pessoal. Também é conhecido como email descartável, temp mail, email falso, burner email ou caixa temporária.",
          "Com o Instant Mail, você pode criar um email temporário grátis para receber códigos de verificação, links de ativação, mensagens de cadastro e emails únicos.",
        ],
      },
      {
        title: "Por que usar um email temporário?",
        paragraphs: [
          "Sites, aplicativos, fóruns e lojas online pedem email para liberar contas, downloads e confirmações. Usar seu email real em todos os lugares pode gerar spam, promoções e vazamentos.",
          "Use o Instant Mail quando precisar de:",
        ],
        bullets: [
          "Email temporário para verificação",
          "Email descartável para cadastros",
          "Gerador de email falso para testes",
          "Proteção contra spam",
          "Uma caixa rápida para links de ativação",
        ],
        after:
          "Para contas importantes, use seu email real. Para cadastros rápidos, use um endereço temporário.",
      },
      {
        title: "Como funciona o email temporário?",
        paragraphs: [
          "O serviço gera um endereço descartável que pode receber mensagens. Você copia o email, usa no site desejado e lê a mensagem diretamente no Instant Mail.",
          "Não é necessário criar senha, informar dados pessoais ou registrar uma conta.",
        ],
      },
      {
        title: "Quando não usar",
        paragraphs: [
          "Não use email descartável para bancos, pagamentos, documentos privados, contas de trabalho ou qualquer serviço que precise recuperar no futuro.",
          "O Instant Mail é ideal para cadastros simples, testes, downloads, verificações rápidas e proteção contra spam.",
        ],
      },
    ],
    trustPages: {
      privacy: {
        title: "Política de Privacidade",
        description:
          "Como o Instant Mail lida com sessões temporárias, armazenamento local e privacidade.",
        sections: [
          {
            title: "Política de Privacidade",
            paragraphs: [
              "O Instant Mail foi criado para uso temporário e de baixo risco. A sessão do email fica salva localmente no seu navegador.",
              "Não pedimos nome, senha, pagamento ou dados pessoais para criar uma caixa temporária.",
            ],
          },
          {
            title: "Uso responsável",
            paragraphs: [
              "Não use email temporário para bancos, pagamentos, documentos privados ou contas que você precise recuperar depois.",
            ],
          },
        ],
      },
      terms: {
        title: "Termos de Uso",
        description: "Regras para usar o Instant Mail com segurança e responsabilidade.",
        sections: [
          {
            title: "Termos de Uso",
            paragraphs: [
              "O Instant Mail é uma ferramenta gratuita para email temporário, testes e verificações únicas.",
              "Você concorda em não usar o serviço para atividades ilegais, abuso, spam, fraude ou assédio.",
            ],
          },
          {
            title: "Acesso temporário",
            paragraphs: [
              "As caixas temporárias não são permanentes. Endereços e mensagens podem deixar de funcionar dependendo da sessão e da disponibilidade do provedor.",
            ],
          },
        ],
      },
      contact: {
        title: "Contato",
        description: "Fale com o Instant Mail sobre dúvidas, feedback e problemas.",
        sections: [
          {
            title: "Contato",
            paragraphs: ["Para dúvidas, feedback ou relatos de abuso, envie um email.", "Email: contact@instantmail.online"],
          },
        ],
      },
      about: {
        title: "Sobre o Instant Mail",
        description:
          "Instant Mail é uma ferramenta gratuita de email temporário criada para ajudar usuários a receber emails rápidos, evitar spam e proteger a caixa pessoal em cadastros online.",
        sections: [
          {
            title: "Sobre o Instant Mail",
            paragraphs: [
              "Instant Mail é uma ferramenta gratuita de email temporário criada para ajudar usuários a receber emails rápidos, evitar spam e proteger a caixa pessoal em cadastros online.",
              "O foco é oferecer uma caixa simples para verificações, testes, downloads e serviços de baixo risco.",
            ],
          },
        ],
      },
      faq: {
        title: "FAQ",
        description: "Perguntas frequentes sobre email temporário e Instant Mail.",
        sections: [
          {
            title: "FAQ",
            paragraphs: [
              "Email temporário é útil para cadastros rápidos, códigos de verificação e proteção contra spam. Use seu email real apenas em contas importantes.",
            ],
          },
        ],
      },
    },
  },
  es: {
    code: "es",
    locale: "es-ES",
    flag: "🇪🇸",
    name: "Español",
    title: "Correo temporal gratis - Email desechable | Instant Mail",
    description:
      "Crea un correo temporal gratis con Instant Mail. Recibe códigos de verificación, evita spam y protege tu correo personal.",
    nav: {
      inbox: "Bandeja",
      features: "Ventajas",
      faq: "FAQ",
      about: "Acerca de",
      openInbox: "Abrir bandeja",
    },
    hero: {
      note: "Sin registro · Acceso inmediato",
      h1Start: "Correo temporal gratis,",
      h1Accent: " listo en segundos",
      body: "Instant Mail te da un correo desechable para registros, códigos de verificación y mensajes de un solo uso sin llenar tu bandeja personal de spam.",
      emailLabel: "Tu correo temporal",
      emailAria: "Dirección de correo temporal actual",
      creatingAddress: "Creando tu dirección...",
      copyEmail: "Copiar correo",
      copied: "Copiado",
      refresh: "Actualizar",
      change: "Cambiar",
      delete: "Eliminar",
      creatingStatus: "Generando tu dirección desechable...",
      readyStatus: "Copia esta dirección, úsala donde la necesites y los mensajes aparecerán abajo.",
    },
    inbox: {
      label: "Bandeja activa",
      title: "Mensajes entrantes",
      updated: "Actualizado",
      messageSingular: "mensaje",
      messagePlural: "mensajes",
      unread: "sin leer",
      refreshInbox: "Actualizar bandeja",
      sender: "Remitente",
      subject: "Asunto",
      time: "Hora",
      action: "Acción",
      emptyTitle: "Tu bandeja está vacía. Esperando correos entrantes.",
      emptyBody:
        "Pega tu dirección de Instant Mail en cualquier sitio. Los mensajes aparecerán aquí automáticamente mientras esta página siga abierta.",
      noSubject: "Sin asunto",
      new: "Nuevo",
      introFallback: "Ábrelo para leer el mensaje completo.",
      view: "Ver",
      notUpdated: "Aún no actualizado",
    },
    featuresIntro: {
      label: "Por qué Instant Mail",
      title: "Rápido, privado y hecho para registros cotidianos",
      body: "Lo esencial de un servicio de correo temporal sin fricción, desorden ni pasos innecesarios.",
    },
    faqIntro: { label: "FAQ", title: "Preguntas frecuentes" },
    aboutIntro: {
      label: "Acerca de Instant Mail",
      title: "Correo temporal gratis para privacidad y protección contra spam",
    },
    footer: {
      copyright: "© 2026 Instant Mail. Correo desechable para uso rápido y privado.",
      poweredPrefix: "Funciona con la API pública de",
      poweredSuffix: ".",
      privacy: "Política de Privacidad",
      terms: "Términos de Uso",
      contact: "Contacto",
      about: "Acerca de Instant Mail",
      faq: "FAQ",
    },
    modal: {
      received: "Recibido",
      close: "Cerrar",
      opening: "Abriendo mensaje",
      fetching: "Cargando el contenido completo del correo.",
      errorTitle: "No se pudo abrir este correo",
      errorFallback: "El proveedor no devolvió el contenido completo del mensaje.",
      tryAgain: "Intentar de nuevo",
      attachment: "adjunto",
      attachments: "adjuntos",
      download: "Descargar",
    },
    linkWarning: {
      title: "Ten cuidado con los enlaces en los correos",
      message: "Este enlace abrirá un sitio web externo:",
      destination: "Destino:",
      warning:
        "Las bandejas temporales pueden recibir mensajes de remitentes desconocidos. Evita abrir enlaces sospechosos, descargar archivos o introducir información personal.",
      responsibility:
        "Instant Mail no controla sitios web externos y no se hace responsable del contenido accedido fuera de la plataforma.",
      invalidLink: "Este enlace no se puede abrir porque es inválido o usa un protocolo inseguro.",
      cancel: "Cancelar",
      continueAnyway: "Continuar de todos modos",
    },
    errors: {
      refresh: "No se pudo actualizar la bandeja.",
      noDomains: "No hay dominios disponibles ahora.",
      create: "No se pudo crear una dirección temporal.",
      copy: "No se pudo copiar automáticamente. Selecciona y copia la dirección.",
      open: "No se pudo abrir este mensaje.",
      noSessionDownload: "No hay una sesión activa para descargar este archivo.",
      download: "No se pudo descargar el adjunto.",
      downloaded: "Descargado.",
      downloading: "Descargando...",
    },
    features: [
      {
        icon: Zap,
        title: "Bandeja instantánea",
        description: "Tu dirección temporal está lista al abrir Instant Mail. Sin configuración ni espera.",
      },
      {
        icon: Shield,
        title: "Privacidad",
        description: "Mantén registros, descargas y verificaciones lejos de tu correo personal.",
      },
      {
        icon: Mail,
        title: "Registros sin spam",
        description: "Usa una bandeja desechable para mensajes únicos y evita newsletters no deseadas.",
      },
      {
        icon: UserRound,
        title: "Sin registro",
        description: "Sin cuenta, contraseña ni formularios. Copia tu correo y empieza a recibir mensajes.",
      },
    ],
    faqs: [],
    aboutSections: [],
    trustPages: {} as LanguageContent["trustPages"],
  },
  fr: {} as LanguageContent,
  de: {} as LanguageContent,
  id: {} as LanguageContent,
  hi: {} as LanguageContent,
};

content.es.faqs = [
  {
    question: "¿Qué es Instant Mail?",
    answer:
      "Instant Mail es un servicio gratuito de correo temporal para registros, códigos de verificación y uso online de corto plazo sin exponer tu correo real.",
  },
  {
    question: "¿Cómo uso mi correo temporal?",
    answer:
      "Copia la dirección, pégala en el sitio que solicita correo y vuelve aquí. Los mensajes aparecerán automáticamente.",
  },
  {
    question: "¿Necesito crear una cuenta?",
    answer: "No. Instant Mail funciona sin registro, contraseña ni datos personales.",
  },
  {
    question: "¿Es seguro usar correo temporal?",
    answer:
      "Es útil para usos de bajo riesgo. No lo uses para bancos, pagos o cuentas que necesites recuperar.",
  },
];

content.es.aboutSections = [
  {
    title: "¿Qué es un correo temporal desechable?",
    paragraphs: [
      "Un correo temporal es una dirección creada para recibir mensajes durante poco tiempo sin usar tu correo personal.",
      "También se conoce como temp mail, correo desechable, correo falso, burner email o bandeja temporal.",
    ],
  },
  {
    title: "¿Por qué usar un correo temporal?",
    paragraphs: [
      "Ayuda a recibir códigos de verificación, enlaces de activación y mensajes únicos sin compartir tu correo principal.",
      "Es una forma sencilla de reducir spam y proteger tu privacidad.",
    ],
  },
  {
    title: "Cuándo usar Instant Mail",
    paragraphs: [
      "Úsalo para registros rápidos, pruebas, descargas, foros, recursos gratuitos y formularios que no requieren una cuenta permanente.",
    ],
  },
];

content.es.trustPages = buildTrustPages(content.es, {
  about:
    "Instant Mail es una herramienta gratuita de correo temporal creada para ayudar a los usuarios a recibir emails de corto plazo, evitar spam y proteger su bandeja personal durante registros online cotidianos.",
  privacy:
    "Instant Mail guarda la sesión temporal en tu navegador y no solicita nombre, contraseña, pago ni datos personales.",
  terms:
    "Instant Mail es una herramienta gratuita para correo temporal, pruebas y verificaciones de bajo riesgo. No la uses para abuso, fraude o actividades ilegales.",
  contact: "Para dudas, feedback o reportes de abuso, escribe a contact@instantmail.online.",
});

content.fr = {
  ...content.en,
  code: "fr",
  locale: "fr-FR",
  flag: "🇫🇷",
  name: "Français",
  title: "Email temporaire gratuit - Adresse email jetable | Instant Mail",
  description:
    "Créez une adresse email temporaire gratuite avec Instant Mail. Recevez des codes de vérification, évitez le spam et protégez votre boîte personnelle.",
  nav: { inbox: "Boîte", features: "Avantages", faq: "FAQ", about: "À propos", openInbox: "Ouvrir la boîte" },
  hero: {
    note: "Sans inscription · Accès immédiat",
    h1Start: "Email temporaire gratuit,",
    h1Accent: " prêt en quelques secondes",
    body: "Instant Mail fournit une adresse email jetable pour les inscriptions, les codes de vérification et les messages ponctuels sans exposer votre adresse personnelle.",
    emailLabel: "Votre email temporaire",
    emailAria: "Adresse email temporaire actuelle",
    creatingAddress: "Création de votre adresse...",
    copyEmail: "Copier l'email",
    copied: "Copié",
    refresh: "Actualiser",
    change: "Changer",
    delete: "Supprimer",
    creatingStatus: "Génération de votre adresse jetable...",
    readyStatus: "Copiez cette adresse, utilisez-la où nécessaire et les messages apparaîtront ci-dessous.",
  },
  inbox: {
    label: "Boîte active",
    title: "Messages reçus",
    updated: "Mis à jour",
    messageSingular: "message",
    messagePlural: "messages",
    unread: "non lu",
    refreshInbox: "Actualiser la boîte",
    sender: "Expéditeur",
    subject: "Objet",
    time: "Heure",
    action: "Action",
    emptyTitle: "Votre boîte est vide. En attente de nouveaux emails.",
    emptyBody: "Collez votre adresse Instant Mail sur un site. Les messages apparaîtront ici automatiquement.",
    noSubject: "Sans objet",
    new: "Nouveau",
    introFallback: "Ouvrir pour lire le message complet.",
    view: "Voir",
    notUpdated: "Pas encore mis à jour",
  },
  featuresIntro: {
    label: "Pourquoi Instant Mail",
    title: "Rapide, privé et conçu pour les inscriptions quotidiennes",
    body: "L'essentiel d'un service d'email temporaire sans friction, sans désordre et sans étapes inutiles.",
  },
  faqIntro: { label: "FAQ", title: "Questions fréquentes" },
  aboutIntro: {
    label: "À propos d'Instant Mail",
    title: "Email temporaire gratuit pour la confidentialité et la protection contre le spam",
  },
  footer: {
    copyright: "© 2026 Instant Mail. Email jetable pour un usage rapide et privé.",
    poweredPrefix: "Propulsé par l'API publique",
    poweredSuffix: ".",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    contact: "Contact",
    about: "À propos d'Instant Mail",
    faq: "FAQ",
  },
  modal: {
    received: "Reçu",
    close: "Fermer",
    opening: "Ouverture du message",
    fetching: "Chargement du contenu complet de l'email.",
    errorTitle: "Impossible d'ouvrir cet email",
    errorFallback: "Le fournisseur n'a pas renvoyé le contenu complet du message.",
    tryAgain: "Réessayer",
    attachment: "pièce jointe",
    attachments: "pièces jointes",
    download: "Télécharger",
  },
  linkWarning: {
    title: "Soyez prudent avec les liens dans les emails",
    message: "Ce lien ouvrira un site web externe :",
    destination: "Destination :",
    warning:
      "Les boîtes temporaires peuvent recevoir des messages d'expéditeurs inconnus. Évitez d'ouvrir des liens suspects, de télécharger des fichiers ou de saisir des informations personnelles.",
    responsibility:
      "Instant Mail ne contrôle pas les sites externes et n'est pas responsable du contenu consulté en dehors de la plateforme.",
    invalidLink: "Ce lien ne peut pas être ouvert car il est invalide ou utilise un protocole non sécurisé.",
    cancel: "Annuler",
    continueAnyway: "Continuer quand même",
  },
  errors: {
    refresh: "Impossible d'actualiser la boîte de réception.",
    noDomains: "Aucun domaine n'est disponible pour le moment.",
    create: "Impossible de créer une adresse email temporaire.",
    copy: "La copie automatique a échoué. Sélectionnez et copiez l'adresse.",
    open: "Impossible d'ouvrir ce message.",
    noSessionDownload: "Aucune session active n'est disponible pour ce téléchargement.",
    download: "Impossible de télécharger la pièce jointe.",
    downloaded: "Téléchargé.",
    downloading: "Téléchargement...",
  },
  features: [
    { icon: Zap, title: "Boîte instantanée", description: "Votre adresse temporaire est prête dès l'ouverture d'Instant Mail." },
    { icon: Shield, title: "Protection de la vie privée", description: "Gardez les inscriptions et vérifications loin de votre email personnel." },
    { icon: Mail, title: "Inscriptions sans spam", description: "Utilisez une boîte jetable pour les messages uniques et évitez les newsletters." },
    { icon: UserRound, title: "Sans inscription", description: "Pas de compte, pas de mot de passe. Copiez l'adresse et recevez vos messages." },
  ],
  faqs: [
    { question: "Qu'est-ce qu'Instant Mail ?", answer: "Instant Mail est un service gratuit d'email temporaire pour recevoir des vérifications sans exposer votre adresse réelle." },
    { question: "Dois-je créer un compte ?", answer: "Non. Instant Mail fonctionne sans inscription, mot de passe ou données personnelles." },
    { question: "Quand utiliser un email temporaire ?", answer: "Pour les inscriptions rapides, les tests, les téléchargements et les messages ponctuels de faible risque." },
  ],
  aboutSections: [
    { title: "Qu'est-ce qu'un email temporaire jetable ?", paragraphs: ["Un email temporaire est une adresse créée pour recevoir des messages pendant une courte durée sans utiliser votre boîte personnelle.", "Il est utile pour les codes de vérification, les liens d'activation et les inscriptions rapides."] },
    { title: "Pourquoi l'utiliser ?", paragraphs: ["Il réduit le spam, protège votre adresse principale et évite de partager votre identité avec chaque site."] },
  ],
  trustPages: {} as LanguageContent["trustPages"],
};

content.fr.trustPages = buildTrustPages(content.fr, {
  about:
    "Instant Mail est un outil gratuit d'email temporaire créé pour aider les utilisateurs à recevoir des emails de courte durée, éviter le spam et protéger leur boîte personnelle lors des inscriptions en ligne.",
  privacy:
    "Instant Mail conserve la session temporaire dans votre navigateur et ne demande pas de nom, mot de passe, paiement ou données personnelles.",
  terms:
    "Instant Mail est fourni pour un usage temporaire, légal et à faible risque. Ne l'utilisez pas pour l'abus, la fraude ou les activités illégales.",
  contact: "Pour les questions, retours ou signalements, contactez contact@instantmail.online.",
});

content.de = {
  ...content.fr,
  code: "de",
  locale: "de-DE",
  flag: "🇩🇪",
  name: "Deutsch",
  title: "Kostenlose temporäre E-Mail - Wegwerf-E-Mail | Instant Mail",
  description:
    "Erstellen Sie eine kostenlose temporäre E-Mail-Adresse mit Instant Mail. Empfangen Sie Bestätigungscodes, vermeiden Sie Spam und schützen Sie Ihr privates Postfach.",
  nav: { inbox: "Postfach", features: "Vorteile", faq: "FAQ", about: "Über uns", openInbox: "Postfach öffnen" },
  hero: {
    note: "Ohne Registrierung · Sofort verfügbar",
    h1Start: "Kostenlose temporäre E-Mail,",
    h1Accent: " in Sekunden bereit",
    body: "Instant Mail erstellt eine Wegwerf-E-Mail für Anmeldungen, Bestätigungscodes und einmalige Nachrichten, ohne Ihr privates Postfach mit Spam zu belasten.",
    emailLabel: "Ihre temporäre E-Mail",
    emailAria: "Aktuelle temporäre E-Mail-Adresse",
    creatingAddress: "Adresse wird erstellt...",
    copyEmail: "E-Mail kopieren",
    copied: "Kopiert",
    refresh: "Aktualisieren",
    change: "Wechseln",
    delete: "Löschen",
    creatingStatus: "Wegwerf-Adresse wird erstellt...",
    readyStatus: "Kopieren Sie diese Adresse, verwenden Sie sie bei Bedarf, und Nachrichten erscheinen unten.",
  },
  inbox: {
    label: "Aktives Postfach",
    title: "Eingehende Nachrichten",
    updated: "Aktualisiert",
    messageSingular: "Nachricht",
    messagePlural: "Nachrichten",
    unread: "ungelesen",
    refreshInbox: "Postfach aktualisieren",
    sender: "Absender",
    subject: "Betreff",
    time: "Zeit",
    action: "Aktion",
    emptyTitle: "Ihr Postfach ist leer. Es wartet auf eingehende E-Mails.",
    emptyBody: "Fügen Sie Ihre Instant Mail-Adresse auf einer Website ein. Nachrichten erscheinen hier automatisch.",
    noSubject: "Kein Betreff",
    new: "Neu",
    introFallback: "Öffnen, um die vollständige Nachricht zu lesen.",
    view: "Ansehen",
    notUpdated: "Noch nicht aktualisiert",
  },
  featuresIntro: {
    label: "Warum Instant Mail",
    title: "Schnell, privat und für tägliche Anmeldungen gemacht",
    body: "Alles Wichtige eines temporären E-Mail-Dienstes ohne unnötige Schritte.",
  },
  faqIntro: { label: "FAQ", title: "Häufige Fragen" },
  aboutIntro: {
    label: "Über Instant Mail",
    title: "Kostenlose temporäre E-Mail für Datenschutz und Spam-Schutz",
  },
  footer: {
    copyright: "© 2026 Instant Mail. Wegwerf-E-Mail für schnelle, private Nutzung.",
    poweredPrefix: "Bereitgestellt über die öffentliche",
    poweredSuffix: "API.",
    privacy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
    contact: "Kontakt",
    about: "Über Instant Mail",
    faq: "FAQ",
  },
  modal: {
    received: "Empfangen",
    close: "Schließen",
    opening: "Nachricht wird geöffnet",
    fetching: "Der vollständige E-Mail-Inhalt wird geladen.",
    errorTitle: "Diese E-Mail konnte nicht geöffnet werden",
    errorFallback: "Der Anbieter hat den vollständigen Inhalt nicht zurückgegeben.",
    tryAgain: "Erneut versuchen",
    attachment: "Anhang",
    attachments: "Anhänge",
    download: "Herunterladen",
  },
  linkWarning: {
    title: "Seien Sie vorsichtig mit Links in E-Mails",
    message: "Dieser Link öffnet eine externe Website:",
    destination: "Ziel:",
    warning:
      "Temporäre Postfächer können Nachrichten von unbekannten Absendern erhalten. Öffnen Sie keine verdächtigen Links, laden Sie keine verdächtigen Dateien herunter und geben Sie keine persönlichen Daten ein.",
    responsibility:
      "Instant Mail kontrolliert keine externen Websites und ist nicht für Inhalte verantwortlich, die außerhalb der Plattform aufgerufen werden.",
    invalidLink: "Dieser Link kann nicht geöffnet werden, weil er ungültig ist oder ein unsicheres Protokoll verwendet.",
    cancel: "Abbrechen",
    continueAnyway: "Trotzdem fortfahren",
  },
  errors: {
    refresh: "Das Postfach konnte nicht aktualisiert werden.",
    noDomains: "Derzeit sind keine Domains verfügbar.",
    create: "Es konnte keine temporäre E-Mail-Adresse erstellt werden.",
    copy: "Automatisches Kopieren war nicht möglich. Markieren und kopieren Sie die Adresse.",
    open: "Diese Nachricht konnte nicht geöffnet werden.",
    noSessionDownload: "Für diesen Download ist keine aktive Sitzung verfügbar.",
    download: "Der Anhang konnte nicht heruntergeladen werden.",
    downloaded: "Heruntergeladen.",
    downloading: "Wird heruntergeladen...",
  },
  features: [
    { icon: Zap, title: "Sofortiges Postfach", description: "Ihre temporäre Adresse ist sofort bereit, wenn Sie Instant Mail öffnen." },
    { icon: Shield, title: "Datenschutz", description: "Halten Sie Anmeldungen, Downloads und Bestätigungen von Ihrer privaten E-Mail fern." },
    { icon: Mail, title: "Anmeldungen ohne Spam", description: "Nutzen Sie ein Wegwerf-Postfach für einmalige Nachrichten und vermeiden Sie Newsletter." },
    { icon: UserRound, title: "Ohne Registrierung", description: "Kein Konto, kein Passwort, keine Formulare. Kopieren Sie die Adresse und empfangen Sie Nachrichten." },
  ],
  faqs: [
    { question: "Was ist Instant Mail?", answer: "Instant Mail ist ein kostenloser Dienst für temporäre E-Mails, mit dem Sie Bestätigungen empfangen können, ohne Ihre echte Adresse offenzulegen." },
    { question: "Muss ich ein Konto erstellen?", answer: "Nein. Instant Mail funktioniert ohne Registrierung, Passwort oder persönliche Daten." },
    { question: "Wann sollte ich eine temporäre E-Mail nutzen?", answer: "Für schnelle Anmeldungen, Tests, Downloads und einmalige Nachrichten mit geringem Risiko." },
    { question: "Ist eine Wegwerf-E-Mail sicher?", answer: "Sie ist praktisch für risikoarme Nutzung. Verwenden Sie sie nicht für Banking, Zahlungen oder wichtige Konten." },
  ],
  aboutSections: [
    { title: "Was ist eine temporäre Wegwerf-E-Mail?", paragraphs: ["Eine temporäre E-Mail ist eine Adresse, die für kurze Zeit Nachrichten empfangen kann, ohne Ihr privates Postfach zu verwenden.", "Sie eignet sich für Bestätigungscodes, Aktivierungslinks und schnelle Online-Anmeldungen."] },
    { title: "Warum Instant Mail verwenden?", paragraphs: ["Instant Mail reduziert Spam, schützt Ihre Hauptadresse und hilft Ihnen, Ihre Online-Identität bei alltäglichen Anmeldungen besser zu kontrollieren."] },
  ],
  trustPages: {} as LanguageContent["trustPages"],
};

content.de.trustPages = buildTrustPages(content.de, {
  about:
    "Instant Mail ist ein kostenloses Tool für temporäre E-Mails, das Nutzern hilft, kurzfristige E-Mails zu empfangen, Spam zu vermeiden und ihr privates Postfach bei alltäglichen Online-Anmeldungen zu schützen.",
  privacy:
    "Instant Mail speichert die temporäre Sitzung im Browser und fragt nicht nach Name, Passwort, Zahlungsdaten oder persönlichen Kontoinformationen.",
  terms:
    "Instant Mail ist für legale, kurzfristige und risikoarme Nutzung gedacht. Verwenden Sie den Dienst nicht für Missbrauch, Betrug oder illegale Aktivitäten.",
  contact: "Für Fragen, Feedback oder Missbrauchsmeldungen schreiben Sie an contact@instantmail.online.",
});

content.id = {
  ...content.de,
  code: "id",
  locale: "id-ID",
  flag: "🇮🇩",
  name: "Indonesia",
  title: "Email sementara gratis - Email sekali pakai | Instant Mail",
  description:
    "Buat email sementara gratis dengan Instant Mail. Terima kode verifikasi, hindari spam, dan lindungi inbox utama Anda.",
  nav: { inbox: "Inbox", features: "Fitur", faq: "FAQ", about: "Tentang", openInbox: "Buka inbox" },
  hero: {
    note: "Tanpa daftar · Langsung pakai",
    h1Start: "Email sementara gratis,",
    h1Accent: " siap dalam detik",
    body: "Instant Mail memberi Anda email sekali pakai untuk pendaftaran, kode verifikasi, dan pesan singkat tanpa memenuhi inbox utama dengan spam.",
    emailLabel: "Email sementara Anda",
    emailAria: "Alamat email sementara saat ini",
    creatingAddress: "Membuat alamat...",
    copyEmail: "Salin email",
    copied: "Disalin",
    refresh: "Muat ulang",
    change: "Ganti",
    delete: "Hapus",
    creatingStatus: "Membuat alamat sekali pakai...",
    readyStatus: "Salin alamat ini, gunakan saat dibutuhkan, dan pesan akan muncul di bawah.",
  },
  inbox: {
    label: "Inbox aktif",
    title: "Pesan masuk",
    updated: "Diperbarui",
    messageSingular: "pesan",
    messagePlural: "pesan",
    unread: "belum dibaca",
    refreshInbox: "Muat ulang inbox",
    sender: "Pengirim",
    subject: "Subjek",
    time: "Waktu",
    action: "Aksi",
    emptyTitle: "Inbox Anda kosong. Menunggu email masuk.",
    emptyBody: "Tempel alamat Instant Mail di situs apa pun. Pesan akan muncul otomatis selama halaman ini terbuka.",
    noSubject: "Tanpa subjek",
    new: "Baru",
    introFallback: "Buka untuk membaca pesan lengkap.",
    view: "Lihat",
    notUpdated: "Belum diperbarui",
  },
  featuresIntro: {
    label: "Mengapa Instant Mail",
    title: "Cepat, privat, dan dibuat untuk pendaftaran sehari-hari",
    body: "Semua kebutuhan layanan email sementara tanpa proses rumit atau langkah yang tidak perlu.",
  },
  footer: {
    copyright: "© 2026 Instant Mail. Email sekali pakai untuk penggunaan cepat dan privat.",
    poweredPrefix: "Didukung oleh API publik",
    poweredSuffix: ".",
    privacy: "Kebijakan Privasi",
    terms: "Ketentuan Penggunaan",
    contact: "Kontak",
    about: "Tentang Instant Mail",
    faq: "FAQ",
  },
  modal: {
    received: "Diterima",
    close: "Tutup",
    opening: "Membuka pesan",
    fetching: "Memuat isi email lengkap.",
    errorTitle: "Email ini tidak dapat dibuka",
    errorFallback: "Penyedia tidak mengembalikan isi pesan lengkap.",
    tryAgain: "Coba lagi",
    attachment: "lampiran",
    attachments: "lampiran",
    download: "Unduh",
  },
  linkWarning: {
    title: "Berhati-hatilah dengan tautan di email",
    message: "Tautan ini akan membuka situs web eksternal:",
    destination: "Tujuan:",
    warning:
      "Inbox sementara dapat menerima pesan dari pengirim yang tidak dikenal. Hindari membuka tautan mencurigakan, mengunduh file, atau memasukkan informasi pribadi.",
    responsibility:
      "Instant Mail tidak mengontrol situs web eksternal dan tidak bertanggung jawab atas konten yang diakses di luar platform.",
    invalidLink: "Tautan ini tidak dapat dibuka karena tidak valid atau menggunakan protokol yang tidak aman.",
    cancel: "Batal",
    continueAnyway: "Tetap lanjutkan",
  },
  errors: {
    refresh: "Inbox tidak dapat dimuat ulang.",
    noDomains: "Tidak ada domain yang tersedia saat ini.",
    create: "Alamat email sementara tidak dapat dibuat.",
    copy: "Tidak dapat menyalin otomatis. Pilih dan salin alamat secara manual.",
    open: "Pesan ini tidak dapat dibuka.",
    noSessionDownload: "Tidak ada sesi email aktif untuk unduhan ini.",
    download: "Lampiran tidak dapat diunduh.",
    downloaded: "Terunduh.",
    downloading: "Mengunduh...",
  },
  features: [
    { icon: Zap, title: "Inbox instan", description: "Alamat sementara Anda siap begitu Instant Mail dibuka. Tanpa pengaturan dan tanpa menunggu." },
    { icon: Shield, title: "Privasi lebih aman", description: "Pisahkan pendaftaran, unduhan, dan verifikasi dari email pribadi Anda." },
    { icon: Mail, title: "Daftar tanpa spam", description: "Gunakan inbox sekali pakai untuk pesan satu kali dan hindari newsletter yang tidak perlu." },
    { icon: UserRound, title: "Tanpa registrasi", description: "Tidak perlu akun, kata sandi, atau formulir. Salin email dan mulai menerima pesan." },
  ],
  faqs: [
    { question: "Apa itu Instant Mail?", answer: "Instant Mail adalah layanan email sementara gratis untuk menerima kode verifikasi dan pesan singkat tanpa membagikan email pribadi." },
    { question: "Bagaimana cara menggunakannya?", answer: "Salin alamat email, tempel di situs yang meminta email, lalu kembali ke halaman ini untuk membaca pesan masuk." },
    { question: "Apakah perlu membuat akun?", answer: "Tidak. Instant Mail dapat digunakan langsung tanpa registrasi atau data pribadi." },
    { question: "Apakah email sementara aman?", answer: "Aman untuk penggunaan ringan seperti verifikasi dan pengujian. Jangan gunakan untuk bank, pembayaran, atau akun penting." },
  ],
  aboutSections: [
    { title: "Apa itu email sementara sekali pakai?", paragraphs: ["Email sementara adalah alamat yang dibuat untuk menerima pesan dalam waktu singkat tanpa memakai inbox pribadi.", "Layanan ini cocok untuk kode verifikasi, link aktivasi, pendaftaran cepat, dan pengujian aplikasi."] },
    { title: "Mengapa memakai Instant Mail?", paragraphs: ["Instant Mail membantu mengurangi spam, menjaga privasi, dan melindungi email utama dari situs yang belum Anda percaya."] },
  ],
  trustPages: {} as LanguageContent["trustPages"],
};

content.id.trustPages = buildTrustPages(content.id, {
  about:
    "Instant Mail adalah alat email sementara gratis yang dibuat untuk membantu pengguna menerima email jangka pendek, menghindari spam, dan melindungi inbox pribadi saat mendaftar online.",
  privacy:
    "Instant Mail menyimpan sesi sementara di browser Anda dan tidak meminta nama, kata sandi, pembayaran, atau informasi akun pribadi.",
  terms:
    "Instant Mail disediakan untuk penggunaan legal, sementara, dan berisiko rendah. Jangan gunakan untuk penyalahgunaan, penipuan, spam, atau aktivitas ilegal.",
  contact: "Untuk pertanyaan, masukan, atau laporan penyalahgunaan, hubungi contact@instantmail.online.",
});

content.hi = {
  ...content.id,
  code: "hi",
  locale: "hi-IN",
  flag: "🇮🇳",
  name: "हिन्दी",
  title: "मुफ्त अस्थायी ईमेल - डिस्पोजेबल ईमेल | Instant Mail",
  description:
    "Instant Mail से मुफ्त अस्थायी ईमेल बनाएं। वेरिफिकेशन कोड प्राप्त करें, स्पैम से बचें और अपने निजी inbox को सुरक्षित रखें।",
  nav: { inbox: "इनबॉक्स", features: "फीचर", faq: "FAQ", about: "परिचय", openInbox: "इनबॉक्स खोलें" },
  hero: {
    note: "बिना रजिस्ट्रेशन · तुरंत उपयोग",
    h1Start: "मुफ्त अस्थायी ईमेल,",
    h1Accent: " सेकंड में तैयार",
    body: "Instant Mail आपको sign-up, verification code और short-term messages के लिए disposable email देता है, ताकि आपके असली email inbox में spam न आए.",
    emailLabel: "आपका अस्थायी ईमेल",
    emailAria: "वर्तमान अस्थायी ईमेल पता",
    creatingAddress: "आपका पता बनाया जा रहा है...",
    copyEmail: "ईमेल कॉपी करें",
    copied: "कॉपी हो गया",
    refresh: "रिफ्रेश",
    change: "बदलें",
    delete: "हटाएं",
    creatingStatus: "आपका disposable address बनाया जा रहा है...",
    readyStatus: "इस address को copy करें, जहां जरूरत हो उपयोग करें, और messages नीचे दिखेंगे.",
  },
  inbox: {
    label: "लाइव इनबॉक्स",
    title: "आने वाले संदेश",
    updated: "अपडेट",
    messageSingular: "संदेश",
    messagePlural: "संदेश",
    unread: "अपठित",
    refreshInbox: "इनबॉक्स रिफ्रेश करें",
    sender: "भेजने वाला",
    subject: "विषय",
    time: "समय",
    action: "क्रिया",
    emptyTitle: "आपका इनबॉक्स खाली है. नए email का इंतजार है.",
    emptyBody: "किसी भी वेबसाइट पर अपना Instant Mail address डालें. Messages यहां अपने-आप दिखाई देंगे.",
    noSubject: "कोई विषय नहीं",
    new: "नया",
    introFallback: "पूरा संदेश पढ़ने के लिए खोलें.",
    view: "देखें",
    notUpdated: "अभी अपडेट नहीं हुआ",
  },
  featuresIntro: {
    label: "Instant Mail क्यों",
    title: "तेज, निजी और रोजमर्रा के sign-up के लिए बना",
    body: "एक temporary email service की जरूरी चीजें, बिना जटिल प्रक्रिया और बिना अनावश्यक steps.",
  },
  footer: {
    copyright: "© 2026 Instant Mail. तेज और निजी उपयोग के लिए disposable email.",
    poweredPrefix: "Public API द्वारा संचालित",
    poweredSuffix: ".",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    contact: "Contact",
    about: "About Instant Mail",
    faq: "FAQ",
  },
  modal: {
    received: "प्राप्त",
    close: "बंद करें",
    opening: "संदेश खुल रहा है",
    fetching: "पूरा email content लोड हो रहा है.",
    errorTitle: "यह email नहीं खुल सका",
    errorFallback: "Provider ने पूरा message content वापस नहीं किया.",
    tryAgain: "फिर कोशिश करें",
    attachment: "attachment",
    attachments: "attachments",
    download: "Download",
  },
  linkWarning: {
    title: "Emails में links खोलते समय सावधान रहें",
    message: "यह link एक external website खोलेगा:",
    destination: "Destination:",
    warning:
      "Temporary inboxes unknown senders से messages receive कर सकते हैं. Suspicious links खोलने, files download करने या personal information डालने से बचें.",
    responsibility:
      "Instant Mail external websites को control नहीं करता और platform के बाहर access किए गए content के लिए responsible नहीं है.",
    invalidLink: "यह link open नहीं किया जा सकता क्योंकि यह invalid है या unsafe protocol इस्तेमाल करता है.",
    cancel: "Cancel",
    continueAnyway: "Continue anyway",
  },
  errors: {
    refresh: "Inbox refresh नहीं हो सका.",
    noDomains: "अभी कोई domain उपलब्ध नहीं है.",
    create: "Temporary email address नहीं बन सका.",
    copy: "Automatic copy नहीं हो सका. Address select करके copy करें.",
    open: "यह message नहीं खुल सका.",
    noSessionDownload: "इस download के लिए active email session उपलब्ध नहीं है.",
    download: "Attachment download नहीं हो सका.",
    downloaded: "Downloaded.",
    downloading: "Downloading...",
  },
  features: [
    { icon: Zap, title: "Instant inbox", description: "Instant Mail खोलते ही आपका temporary address तैयार हो जाता है." },
    { icon: Shield, title: "Privacy protection", description: "Sign-ups, downloads और verification को अपने personal email से अलग रखें." },
    { icon: Mail, title: "Spam-free signups", description: "One-time messages के लिए disposable inbox इस्तेमाल करें और unwanted newsletters से बचें." },
    { icon: UserRound, title: "No registration", description: "Account, password या forms की जरूरत नहीं. Email copy करें और messages receive करें." },
  ],
  faqs: [
    { question: "Instant Mail क्या है?", answer: "Instant Mail एक free temporary email service है, जिससे आप अपना real email share किए बिना verification codes और short-term emails receive कर सकते हैं." },
    { question: "इसे कैसे इस्तेमाल करें?", answer: "Address copy करें, जिस website पर email चाहिए वहां paste करें, और messages इसी inbox में पढ़ें." },
    { question: "क्या account बनाना जरूरी है?", answer: "नहीं. Instant Mail बिना registration, password या personal details के काम करता है." },
    { question: "क्या temporary email सुरक्षित है?", answer: "Low-risk uses जैसे verification और testing के लिए उपयोगी है. Banking, payments या important accounts के लिए उपयोग न करें." },
  ],
  aboutSections: [
    { title: "Temporary disposable email क्या है?", paragraphs: ["Temporary email एक short-term address है जिससे आप personal inbox का उपयोग किए बिना messages receive कर सकते हैं.", "यह verification codes, activation links, quick sign-ups और testing के लिए उपयोगी है."] },
    { title: "Instant Mail क्यों इस्तेमाल करें?", paragraphs: ["Instant Mail spam कम करने, privacy बचाने और real email को हर website पर share करने से बचाने में मदद करता है."] },
  ],
  trustPages: {} as LanguageContent["trustPages"],
};

content.hi.trustPages = buildTrustPages(content.hi, {
  about:
    "Instant Mail एक मुफ्त temporary email tool है, जिसे short-term emails प्राप्त करने, spam से बचने और online sign-ups के दौरान personal inbox सुरक्षित रखने के लिए बनाया गया है.",
  privacy:
    "Instant Mail temporary session को आपके browser में रखता है और नाम, password, payment या personal account information नहीं मांगता.",
  terms:
    "Instant Mail legal, temporary और low-risk use के लिए है. इसका उपयोग abuse, fraud, spam या illegal activity के लिए न करें.",
  contact: "Questions, feedback या abuse reports के लिए contact@instantmail.online पर लिखें.",
});

function buildTrustPages(
  language: Pick<LanguageContent, "footer" | "faqs">,
  copy: { about: string; privacy: string; terms: string; contact: string },
): LanguageContent["trustPages"] {
  return {
    privacy: {
      title: language.footer.privacy,
      description: copy.privacy,
      sections: [{ title: language.footer.privacy, paragraphs: [copy.privacy] }],
    },
    terms: {
      title: language.footer.terms,
      description: copy.terms,
      sections: [{ title: language.footer.terms, paragraphs: [copy.terms] }],
    },
    contact: {
      title: language.footer.contact,
      description: copy.contact,
      sections: [{ title: language.footer.contact, paragraphs: [copy.contact] }],
    },
    about: {
      title: language.footer.about,
      description: copy.about,
      sections: [{ title: language.footer.about, paragraphs: [copy.about] }],
    },
    faq: {
      title: language.footer.faq,
      description: language.faqs[0]?.answer ?? copy.about,
      sections: language.faqs.map((faq) => ({
        title: faq.question,
        paragraphs: [faq.answer],
      })),
    },
  };
}

export const languageOrder: LanguageCode[] = ["en", "pt", "es", "fr", "de", "id", "hi"];
export const languages = content;
export const tenMinuteSlug = "10-minute-mail";

export const tenMinuteContent: Record<LanguageCode, TenMinuteContent> = {
  en: {
    title: "10 Minute Mail - Free Temporary Email Inbox | Instant Mail",
    description:
      "Create a free 10 minute mail address instantly. Receive verification codes, avoid spam, and protect your real inbox with Instant Mail.",
    hero: {
      note: "Expires automatically · No registration",
      h1Start: "10 Minute Mail,",
      h1Accent: " Ready Instantly",
      body: "Generate a temporary email address that expires after 10 minutes. Use it for quick sign-ups, verification codes, and spam-free browsing.",
      emailLabel: "Your 10 minute email",
      emailAria: "Current 10 minute temporary email address",
      creatingAddress: "Creating your 10 minute address...",
      copyEmail: "Copy email",
      copied: "Copied",
      refresh: "Refresh",
      change: "Change",
      delete: "Delete",
      creatingStatus: "Generating your 10 minute inbox...",
      readyStatus: "Use this address now. It will be replaced automatically after 10 minutes.",
    },
    inbox: {
      ...content.en.inbox,
      title: "10 Minute Mail Inbox",
      emptyTitle: "Waiting for incoming emails",
      emptyBody:
        "Use your 10 minute email address on a website or app. Verification codes and messages will appear here.",
    },
    featuresIntro: {
      label: "10 minute inbox",
      title: "Fast, temporary, and built for one-time messages",
      body: "A short-lived inbox helps you receive quick emails without exposing your personal address.",
    },
    faqIntro: { label: "FAQ", title: "10 Minute Mail questions" },
    aboutIntro: {
      label: "Guide",
      title: "What is 10 Minute Mail?",
    },
    features: [
      { icon: Zap, title: "Ready instantly", description: "Open the page and get a temporary email address in seconds." },
      { icon: Mail, title: "10 minute expiry", description: "The inbox is replaced after 10 minutes for short-term use." },
      { icon: Shield, title: "Spam protection", description: "Keep quick sign-ups and verification codes away from your real inbox." },
      { icon: UserRound, title: "No account needed", description: "No registration, password, or personal information is required." },
    ],
    faqs: [
      { question: "What is 10 Minute Mail?", answer: "10 Minute Mail is a temporary email address that receives messages for a short period and expires after 10 minutes." },
      { question: "Can I receive verification codes?", answer: "Yes. You can use the address for low-risk sign-ups, activation links, and verification codes." },
      { question: "What happens after 10 minutes?", answer: "The current inbox expires, the local session is cleared, and Instant Mail creates a new temporary email address." },
      { question: "Should I use it for important accounts?", answer: "No. Use your real email for banking, payments, private documents, work, and any account you may need to recover later." },
    ],
    aboutSections: [
      { title: "What Is 10 Minute Mail?", paragraphs: ["10 Minute Mail is a disposable temporary email address designed for quick online tasks. It lets you receive messages without using your personal inbox.", "The address is useful for verification codes, activation links, app testing, downloads, and short-term sign-ups."] },
      { title: "How Does a 10 Minute Email Work?", paragraphs: ["Instant Mail creates one temporary inbox for your browser session. The address can receive incoming messages for 10 minutes, then it is discarded and replaced.", "You do not need to register, create a password, or share personal information."] },
      { title: "When Should You Use It?", paragraphs: ["Use a 10 minute email for low-risk websites, newsletters, forums, forms, free resources, and testing flows.", "Do not use temporary email for banking, payments, sensitive files, business accounts, or services you need to recover later."] },
    ],
    timer: {
      label: "10 minute timer",
      expiresIn: "Expires in",
      expired: "Inbox expired",
      creatingNew: "Inbox expired. Creating a new one...",
      responsibleUse: "Use temporary email only for low-risk activity. Avoid sensitive accounts.",
    },
    adLabel: "Advertisement",
  },
  pt: {
    title: "Email Temporário 10 Minutos Grátis | Instant Mail",
    description:
      "Crie um email temporário de 10 minutos grátis. Receba códigos de verificação, evite spam e proteja sua caixa de entrada real.",
    hero: {
      note: "Expira automaticamente · Sem cadastro",
      h1Start: "Email Temporário 10 Minutos,",
      h1Accent: " Pronto na Hora",
      body: "Gere um endereço temporário que expira depois de 10 minutos. Use para cadastros rápidos, códigos de verificação e navegação sem spam.",
      emailLabel: "Seu email de 10 minutos",
      emailAria: "Endereço de email temporário de 10 minutos atual",
      creatingAddress: "Criando seu endereço de 10 minutos...",
      copyEmail: "Copiar email",
      copied: "Copiado",
      refresh: "Atualizar",
      change: "Trocar",
      delete: "Excluir",
      creatingStatus: "Gerando sua caixa temporária de 10 minutos...",
      readyStatus: "Use este endereço agora. Ele será trocado automaticamente depois de 10 minutos.",
    },
    inbox: {
      ...content.pt.inbox,
      title: "Caixa de Entrada 10 Minutos",
      emptyTitle: "Aguardando emails",
      emptyBody:
        "Use seu email de 10 minutos em um site ou aplicativo. Códigos e mensagens aparecerão aqui.",
    },
    featuresIntro: {
      label: "Caixa de 10 minutos",
      title: "Rápido, temporário e feito para mensagens únicas",
      body: "Uma caixa de curta duração ajuda você a receber emails rápidos sem expor seu endereço pessoal.",
    },
    faqIntro: { label: "FAQ", title: "Perguntas sobre email de 10 minutos" },
    aboutIntro: { label: "Guia", title: "O que é Email Temporário 10 Minutos?" },
    features: [
      { icon: Zap, title: "Pronto na hora", description: "Abra a página e receba um endereço temporário em segundos." },
      { icon: Mail, title: "Expira em 10 minutos", description: "A caixa é substituída depois de 10 minutos para uso rápido." },
      { icon: Shield, title: "Proteção contra spam", description: "Mantenha cadastros e verificações longe do seu email real." },
      { icon: UserRound, title: "Sem conta", description: "Não precisa de cadastro, senha ou dados pessoais." },
    ],
    faqs: [
      { question: "O que é email temporário 10 minutos?", answer: "É um endereço descartável que recebe mensagens por um curto período e expira depois de 10 minutos." },
      { question: "Posso receber códigos de verificação?", answer: "Sim. Use para cadastros simples, links de ativação e códigos de verificação de baixo risco." },
      { question: "O que acontece depois de 10 minutos?", answer: "A caixa atual expira, a sessão local é limpa e o Instant Mail cria um novo endereço temporário." },
      { question: "Devo usar em contas importantes?", answer: "Não. Use seu email real para bancos, pagamentos, documentos privados, trabalho e contas que precise recuperar." },
    ],
    aboutSections: [
      { title: "O que é Email Temporário 10 Minutos?", paragraphs: ["Email temporário 10 minutos é um endereço descartável para tarefas rápidas online. Ele permite receber mensagens sem usar sua caixa pessoal.", "É útil para códigos de verificação, links de ativação, testes, downloads e cadastros de curto prazo."] },
      { title: "Como funciona?", paragraphs: ["O Instant Mail cria uma caixa temporária para sua sessão no navegador. O endereço recebe mensagens por 10 minutos, depois é descartado e substituído.", "Não é necessário criar conta, senha ou informar dados pessoais."] },
      { title: "Quando usar?", paragraphs: ["Use para sites de baixo risco, newsletters, fóruns, formulários, recursos grátis e testes.", "Não use email temporário para bancos, pagamentos, arquivos sensíveis, contas profissionais ou serviços que você precise recuperar."] },
    ],
    timer: {
      label: "Timer de 10 minutos",
      expiresIn: "Expira em",
      expired: "Caixa expirada",
      creatingNew: "Caixa expirada. Criando uma nova...",
      responsibleUse: "Use email temporário apenas em atividades de baixo risco. Evite contas sensíveis.",
    },
    adLabel: "Anúncio",
  },
  es: buildTenMinuteVariant("es", {
    title: "Correo Temporal 10 Minutos Gratis | Instant Mail",
    description: "Crea un correo temporal de 10 minutos gratis. Recibe códigos de verificación, evita spam y protege tu bandeja real.",
    h1Start: "Correo Temporal 10 Minutos,",
    h1Accent: " Listo al Instante",
    body: "Genera una dirección temporal que expira después de 10 minutos para registros rápidos, códigos de verificación y navegación sin spam.",
    emailLabel: "Tu correo de 10 minutos",
    inboxTitle: "Bandeja 10 Minutos",
    emptyTitle: "Esperando correos",
    guideTitle: "¿Qué es el correo temporal 10 minutos?",
    expiresIn: "Expira en",
    expired: "Bandeja expirada",
    creatingNew: "Bandeja expirada. Creando una nueva...",
    adLabel: "Anuncio",
  }),
  fr: buildTenMinuteVariant("fr", {
    title: "Email Temporaire 10 Minutes Gratuit | Instant Mail",
    description: "Créez un email temporaire de 10 minutes. Recevez des codes de vérification, évitez le spam et protégez votre boîte personnelle.",
    h1Start: "Email Temporaire 10 Minutes,",
    h1Accent: " Prêt Instantanément",
    body: "Générez une adresse temporaire qui expire après 10 minutes pour les inscriptions rapides, les codes de vérification et la navigation sans spam.",
    emailLabel: "Votre email de 10 minutes",
    inboxTitle: "Boîte 10 Minutes",
    emptyTitle: "En attente d'emails",
    guideTitle: "Qu'est-ce qu'un email temporaire de 10 minutes ?",
    expiresIn: "Expire dans",
    expired: "Boîte expirée",
    creatingNew: "Boîte expirée. Création d'une nouvelle adresse...",
    adLabel: "Publicité",
  }),
  de: buildTenMinuteVariant("de", {
    title: "10 Minuten Mail Kostenlos | Instant Mail",
    description: "Erstellen Sie eine kostenlose 10 Minuten Mail. Empfangen Sie Bestätigungscodes, vermeiden Sie Spam und schützen Sie Ihr echtes Postfach.",
    h1Start: "10 Minuten Mail,",
    h1Accent: " Sofort Bereit",
    body: "Erstellen Sie eine temporäre Adresse, die nach 10 Minuten abläuft. Ideal für schnelle Anmeldungen und Bestätigungscodes.",
    emailLabel: "Ihre 10 Minuten E-Mail",
    inboxTitle: "10 Minuten Postfach",
    emptyTitle: "Warten auf E-Mails",
    guideTitle: "Was ist 10 Minuten Mail?",
    expiresIn: "Läuft ab in",
    expired: "Postfach abgelaufen",
    creatingNew: "Postfach abgelaufen. Eine neue Adresse wird erstellt...",
    adLabel: "Anzeige",
  }),
  id: buildTenMinuteVariant("id", {
    title: "Email Sementara 10 Menit Gratis | Instant Mail",
    description: "Buat email sementara 10 menit secara gratis. Terima kode verifikasi, hindari spam, dan lindungi inbox pribadi Anda.",
    h1Start: "Email Sementara 10 Menit,",
    h1Accent: " Siap Seketika",
    body: "Buat alamat email sementara yang kedaluwarsa setelah 10 menit untuk pendaftaran cepat, kode verifikasi, dan browsing bebas spam.",
    emailLabel: "Email 10 menit Anda",
    inboxTitle: "Inbox 10 Menit",
    emptyTitle: "Menunggu email masuk",
    guideTitle: "Apa itu email sementara 10 menit?",
    expiresIn: "Kedaluwarsa dalam",
    expired: "Inbox kedaluwarsa",
    creatingNew: "Inbox kedaluwarsa. Membuat yang baru...",
    adLabel: "Iklan",
  }),
  hi: buildTenMinuteVariant("hi", {
    title: "10 Minute Mail Free Temporary Email | Instant Mail",
    description: "Free 10 minute temporary email बनाएं. Verification codes receive करें, spam से बचें और अपना real inbox सुरक्षित रखें.",
    h1Start: "10 Minute Mail,",
    h1Accent: " तुरंत तैयार",
    body: "एक temporary email address बनाएं जो 10 minutes के बाद expire हो जाता है. Quick sign-ups और verification codes के लिए उपयोग करें.",
    emailLabel: "आपका 10 minute email",
    inboxTitle: "10 Minute Inbox",
    emptyTitle: "Emails का इंतजार है",
    guideTitle: "10 Minute Mail क्या है?",
    expiresIn: "Expires in",
    expired: "Inbox expired",
    creatingNew: "Inbox expired. नया address बनाया जा रहा है...",
    adLabel: "Advertisement",
  }),
};

function buildTenMinuteVariant(
  code: Exclude<LanguageCode, "en" | "pt">,
  copy: {
    title: string;
    description: string;
    h1Start: string;
    h1Accent: string;
    body: string;
    emailLabel: string;
    inboxTitle: string;
    emptyTitle: string;
    guideTitle: string;
    expiresIn: string;
    expired: string;
    creatingNew: string;
    adLabel: string;
  },
): TenMinuteContent {
  const base = content[code];

  return {
    title: copy.title,
    description: copy.description,
    hero: {
      ...base.hero,
      note: base.hero.note,
      h1Start: copy.h1Start,
      h1Accent: copy.h1Accent,
      body: copy.body,
      emailLabel: copy.emailLabel,
      emailAria: copy.emailLabel,
      creatingAddress: base.hero.creatingAddress,
      creatingStatus: base.hero.creatingStatus,
      readyStatus: copy.body,
    },
    inbox: {
      ...base.inbox,
      title: copy.inboxTitle,
      emptyTitle: copy.emptyTitle,
    },
    featuresIntro: base.featuresIntro,
    faqIntro: base.faqIntro,
    aboutIntro: {
      ...base.aboutIntro,
      title: copy.guideTitle,
    },
    features: base.features,
    faqs: base.faqs,
    aboutSections: [
      { title: copy.guideTitle, paragraphs: [copy.body, base.description] },
      ...base.aboutSections,
    ],
    timer: {
      label: "10 minute timer",
      expiresIn: copy.expiresIn,
      expired: copy.expired,
      creatingNew: copy.creatingNew,
      responsibleUse: base.faqs[3]?.answer ?? base.description,
    },
    adLabel: copy.adLabel,
  };
}

export function isLanguageCode(value: string | undefined): value is LanguageCode {
  return !!value && Object.prototype.hasOwnProperty.call(content, value);
}

export function isTrustPageKey(value: string | undefined): value is TrustPageKey {
  return value === "privacy" || value === "terms" || value === "contact" || value === "about" || value === "faq";
}
