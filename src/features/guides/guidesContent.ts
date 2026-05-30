export const guideSlugs = [
  "what-is-a-temporary-email",
  "is-temporary-email-safe",
  "temporary-email-for-verification-codes",
  "how-to-avoid-spam-emails",
  "disposable-email-vs-regular-email",
  "what-is-a-burner-email",
  "how-developers-can-test-email-signups",
  "how-to-protect-your-email-address-online",
  "what-is-a-data-breach-and-how-to-prevent-it",
  "how-to-create-a-temp-mail-without-registration",
] as const;

export type GuideSlug = (typeof guideSlugs)[number];

type GuideSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type Guide = {
  slug: GuideSlug;
  title: string;
  description: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
  updated: string;
  videoId?: string;
  intro: string[];
  sections: GuideSection[];
  takeaway: string;
};

export const guidesHub = {
  title: "Guides - Instant Mail",
  description:
    "Read practical guides from Instant Mail about temporary email, spam prevention, verification codes, password safety, data breaches, and protecting your inbox online.",
  h1: "Practical Email Privacy Guides",
  intro:
    "Clear, useful guides for everyday privacy decisions: when temporary email helps, when it does not, how to handle verification codes, and how to keep your real inbox safer.",
};

const author = "Igor Corrêa";
const updated = "May 30, 2026";

export const guides: Record<GuideSlug, Guide> = {
  "what-is-a-temporary-email": {
    slug: "what-is-a-temporary-email",
    title: "What Is a Temporary Email?",
    description:
      "A plain-English explanation of temporary email addresses, how they receive messages, and when they make sense.",
    category: "Email Basics",
    readTime: "5 min read",
    image: "/guides/what-is-a-temporary-email.png",
    author,
    updated,
    intro: [
      "A temporary email is a short-term inbox you can use when a website asks for an address but you do not want to hand over your personal email. It is useful for simple confirmations, downloads, newsletters you only want to sample, and low-risk sign-ups.",
      "The important detail is that temporary email is not a replacement for your main inbox. It is a privacy layer for small online moments, not a place for banking, work, private documents, or accounts you may need to recover later.",
    ],
    sections: [
      {
        heading: "How temporary email works",
        body: [
          "A temporary email service creates an address and connects it to an inbox in the browser. When another website sends a message to that address, the inbox can show the sender, subject, body, links, and attachments supported by the provider.",
          "Most services do not require registration because the mailbox is designed for quick use. That simplicity is the whole point: open the tool, copy the address, receive the message, and move on.",
        ],
      },
      {
        heading: "When it is useful",
        body: [
          "Temporary email is helpful when the value of the message is short-lived. Examples include one-time confirmations, a file download link, testing a form, or checking whether a service sends too much marketing email.",
        ],
        bullets: [
          "Protecting your personal inbox from low-value sign-ups.",
          "Testing whether a website sends a confirmation email correctly.",
          "Separating quick online tasks from long-term communication.",
          "Reducing the number of companies that know your real address.",
        ],
      },
      {
        heading: "When you should use your real email",
        body: [
          "Use a permanent email address for anything that affects money, identity, work, school, health, legal documents, or account recovery. Temporary inboxes are convenient, but they are not built for long-term ownership.",
          "A simple rule works well: if losing access to the inbox would create a real problem, do not use temporary email for that account.",
        ],
      },
    ],
    takeaway:
      "Temporary email is best used as a practical privacy tool for quick, low-risk messages. Keep important accounts tied to an address you control long term.",
  },
  "is-temporary-email-safe": {
    slug: "is-temporary-email-safe",
    title: "Is Temporary Email Safe?",
    description:
      "Learn where temporary email is safe, where it is risky, and how to avoid common mistakes with unknown messages.",
    category: "Safety",
    readTime: "6 min read",
    image: "/guides/is-temporary-email-safe.png",
    author,
    updated,
    intro: [
      "Temporary email can be safe when it is used for the right job. It can reduce spam, limit exposure of your real inbox, and help you avoid giving personal details to every website you visit.",
      "It becomes risky when people treat a short-term inbox like a permanent identity. The safer approach is to use temporary email for low-risk activity and keep important accounts on a secure, recoverable address.",
    ],
    sections: [
      {
        heading: "What temporary email protects",
        body: [
          "The biggest benefit is reducing exposure. If a small website later sells, leaks, or mishandles its email list, your real address is not part of that list.",
          "Temporary email can also help you spot aggressive marketing before you decide whether a service deserves your permanent address.",
        ],
      },
      {
        heading: "What it does not protect",
        body: [
          "Temporary email does not make suspicious links safe. It does not verify that a sender is honest. It also does not protect you if you type sensitive information into a malicious website after clicking a message.",
          "Treat links and attachments inside any unknown email with caution, even when the inbox itself is temporary.",
        ],
      },
      {
        heading: "Safe use checklist",
        body: [
          "A temporary inbox is safest when the task is brief and the account is disposable. Before using one, ask whether the account needs recovery, billing, personal documents, or a long-term login history.",
        ],
        bullets: [
          "Do not use it for banks, payment apps, government services, or medical portals.",
          "Avoid entering passwords or personal data after opening unknown email links.",
          "Use a password manager and two-factor authentication for accounts that matter.",
          "Close or rotate the inbox after the task is finished.",
        ],
      },
    ],
    takeaway:
      "Temporary email is safe for short-lived, low-risk tasks. It is not safe for accounts that must remain private, recoverable, or legally important.",
  },
  "temporary-email-for-verification-codes": {
    slug: "temporary-email-for-verification-codes",
    title: "Temporary Email for Verification Codes",
    description:
      "How to receive sign-up codes and activation links without exposing your main inbox to every website.",
    category: "Verification",
    readTime: "5 min read",
    image: "/guides/temporary-email-for-verification-codes.png",
    author,
    updated,
    intro: [
      "Verification codes are one of the most common reasons people use temporary email. A website asks for an address, sends a code or activation link, and you only need the message for a few minutes.",
      "This can be useful, but it should be handled with judgment. A verification email can create an account, and the email address may be needed again if you ever want to reset the password.",
    ],
    sections: [
      {
        heading: "Good use cases",
        body: [
          "Temporary email works well for sign-ups where the account has little long-term value: a free download, a forum you are evaluating, a demo environment, or a service you are testing before deciding whether to use it seriously.",
        ],
        bullets: [
          "Receiving a short confirmation code.",
          "Opening an activation link for a low-risk account.",
          "Testing whether a product sends onboarding emails.",
          "Separating trial messages from your personal inbox.",
        ],
      },
      {
        heading: "Why some codes do not arrive",
        body: [
          "Some websites block disposable domains, delay messages, or reject addresses they do not recognize. Delivery can also fail if the sender has poor email configuration or if the provider rate-limits traffic.",
          "If a code does not arrive, refresh gently, check the address for mistakes, and consider whether the website requires a permanent email address.",
        ],
      },
      {
        heading: "Security tradeoffs",
        body: [
          "If an account is important enough to require recovery, billing, or identity verification, use your real email or a dedicated alias you control. Temporary email is convenient precisely because it is short-term, and that is also its limitation.",
        ],
      },
    ],
    takeaway:
      "Use temporary email for quick verification when the account is low risk. Use a permanent address when access, recovery, or identity matters.",
  },
  "how-to-avoid-spam-emails": {
    slug: "how-to-avoid-spam-emails",
    title: "How to Avoid Spam Emails",
    description:
      "Practical habits that reduce spam without making your everyday inbox harder to use.",
    category: "Inbox Hygiene",
    readTime: "7 min read",
    image: "/guides/how-to-avoid-spam-emails.png",
    author,
    updated,
    intro: [
      "Spam usually starts with exposure. The more places your email address appears, the more likely it is to be collected, shared, leaked, or targeted by automated campaigns.",
      "Avoiding spam is less about one magic tool and more about using the right address in the right context.",
    ],
    sections: [
      {
        heading: "Use layers of email addresses",
        body: [
          "Keep your main email for people and accounts you trust. Use aliases or temporary inboxes for low-risk sign-ups. Use a separate address for newsletters if you read them often but do not want them mixed with personal communication.",
        ],
      },
      {
        heading: "Be careful with public forms",
        body: [
          "Giveaways, downloads, public Wi-Fi pages, and unknown forums often ask for email before providing value. If you are not sure the site deserves your real address, use a temporary inbox first.",
        ],
        bullets: [
          "Avoid publishing your email address in plain text online.",
          "Unsubscribe from legitimate newsletters you no longer read.",
          "Mark obvious spam as spam instead of replying.",
          "Use unique passwords so one leak does not expose multiple accounts.",
        ],
      },
      {
        heading: "Do not interact with suspicious messages",
        body: [
          "Opening a suspicious link can be more harmful than receiving the message. Be especially careful with warnings about locked accounts, urgent payments, prizes, or password resets you did not request.",
          "A good spam strategy is boring: fewer exposed addresses, fewer clicks on unknown links, and stronger protection on important accounts.",
        ],
      },
    ],
    takeaway:
      "To reduce spam, lower your exposure. Use temporary email for low-trust forms and reserve your main inbox for relationships and accounts that matter.",
  },
  "disposable-email-vs-regular-email": {
    slug: "disposable-email-vs-regular-email",
    title: "Disposable Email vs Regular Email",
    description:
      "A clear comparison of disposable inboxes and permanent email accounts, with examples for each.",
    category: "Comparison",
    readTime: "6 min read",
    image: "/guides/disposable-email-vs-regular-email.png",
    author,
    updated,
    intro: [
      "Disposable email and regular email solve different problems. One is built for short-term convenience; the other is built for identity, recovery, and long-term communication.",
      "Confusing the two is what causes most problems. The best setup uses both, but not for the same kind of account.",
    ],
    sections: [
      {
        heading: "Regular email is your long-term identity",
        body: [
          "Your regular email is where people contact you, where password resets arrive, and where important accounts connect back to you. It should be protected with a strong password, two-factor authentication, and careful sharing.",
        ],
      },
      {
        heading: "Disposable email is for short-term tasks",
        body: [
          "A disposable address is useful when a message is temporary and the sender does not need a lasting relationship with you. It helps you test, register quickly, or receive a one-time email without expanding your main inbox's exposure.",
        ],
      },
      {
        heading: "Which one should you use?",
        body: [
          "Use regular email when losing access would be painful. Use disposable email when the message is low-risk and short-lived.",
        ],
        bullets: [
          "Use regular email for banking, work, healthcare, taxes, legal accounts, and anything paid.",
          "Use disposable email for demos, public downloads, short tests, and low-risk confirmations.",
          "Use aliases when you want privacy but still need long-term control.",
        ],
      },
    ],
    takeaway:
      "Disposable email is a privacy shortcut, not a replacement for a secure permanent inbox.",
  },
  "what-is-a-burner-email": {
    slug: "what-is-a-burner-email",
    title: "What Is a Burner Email?",
    description:
      "What people mean by burner email, how it differs from a temporary inbox, and when it is appropriate.",
    category: "Privacy",
    readTime: "5 min read",
    image: "/guides/what-is-a-burner-email.png",
    author,
    updated,
    intro: [
      "A burner email is an address you use to separate one activity from your main identity. Sometimes it is a temporary inbox. Sometimes it is a real account or alias created for a specific purpose.",
      "The useful idea is separation: not every website needs to know your everyday email address.",
    ],
    sections: [
      {
        heading: "Burner email vs temporary email",
        body: [
          "Temporary email is usually short-lived and requires no registration. A burner email can be longer-lived, especially if you create a separate mailbox or alias for a project, marketplace, newsletter, or online community.",
        ],
      },
      {
        heading: "Legitimate reasons to use one",
        body: [
          "A burner email can reduce spam, keep hobbies separate from work, and make it easier to shut down an address if it starts receiving unwanted mail.",
        ],
        bullets: [
          "Testing a service before trusting it with your main email.",
          "Separating marketplace messages from personal email.",
          "Keeping a public-facing contact address away from private accounts.",
          "Signing up for a low-risk website without long-term commitment.",
        ],
      },
      {
        heading: "Use it responsibly",
        body: [
          "A burner email should not be used to harm others, bypass rules, or create accounts you cannot responsibly manage. Treat it as a privacy boundary, not a permission slip for abuse.",
        ],
      },
    ],
    takeaway:
      "A burner email is a practical separation layer. Use it to protect your main inbox, not to avoid responsibility.",
  },
  "how-developers-can-test-email-signups": {
    slug: "how-developers-can-test-email-signups",
    title: "How Developers Can Test Email Signups",
    description:
      "A QA-focused guide for testing registration, confirmation emails, onboarding, and password reset flows.",
    category: "Developers",
    readTime: "8 min read",
    image: "/guides/how-developers-can-test-email-signups.png",
    author,
    updated,
    intro: [
      "Email is part of the product experience. A sign-up flow can look perfect in the browser and still fail if confirmation links, reset emails, or onboarding messages arrive late, look broken, or land in spam.",
      "Temporary inboxes are useful for manual QA because they let developers test new user journeys without filling a real mailbox with disposable accounts.",
    ],
    sections: [
      {
        heading: "Flows worth testing",
        body: [
          "A practical QA pass should cover more than the happy path. Test sign-up confirmation, resend confirmation, expired links, password reset, changed email address, welcome emails, team invites, and unsubscribe links where relevant.",
        ],
        bullets: [
          "New account registration and activation links.",
          "Password reset emails and expired token behavior.",
          "Onboarding sequences after a user confirms the account.",
          "Transactional sender names, subjects, and mobile readability.",
        ],
      },
      {
        heading: "What temporary inboxes are good for",
        body: [
          "They are fast for exploratory testing, bug reproduction, staging checks, and manual verification before a release. They also help product teams see the email the way a new user sees it, not just as a template in code.",
        ],
      },
      {
        heading: "What still needs proper tooling",
        body: [
          "For automated tests, use a dedicated email testing provider or controlled test mailbox. Temporary email is useful for quick manual checks, but automated test suites need stable accounts, predictable APIs, and logs you can keep.",
        ],
      },
    ],
    takeaway:
      "Temporary inboxes are excellent for manual QA and product checks. Use proper testing infrastructure for automated pipelines and compliance-sensitive systems.",
  },
  "how-to-protect-your-email-address-online": {
    slug: "how-to-protect-your-email-address-online",
    title: "How to Protect Your Email Address Online",
    description:
      "Simple privacy habits that make your email address harder to abuse, leak, or target.",
    category: "Privacy",
    readTime: "7 min read",
    image: "/guides/how-to-protect-your-email-address-online.png",
    author,
    updated,
    intro: [
      "Your email address is often the recovery key for your online life. Protecting it is not just about avoiding annoying newsletters; it is about reducing the number of places that can expose or target you.",
      "The best protection is a mix of habits: share less, separate contexts, and secure the accounts that matter.",
    ],
    sections: [
      {
        heading: "Separate important and low-risk activity",
        body: [
          "Use your main inbox for important accounts and people. Use aliases, secondary addresses, or temporary email for low-risk forms. This makes it easier to see where unwanted messages came from and easier to shut them off.",
        ],
      },
      {
        heading: "Harden your primary inbox",
        body: [
          "A private email address is still vulnerable if the account itself is weak. Use a password manager, a unique password, and two-factor authentication. Review account recovery options so an old phone number or forgotten backup email does not become the weak point.",
        ],
        bullets: [
          "Use unique passwords for every important account.",
          "Turn on two-factor authentication.",
          "Avoid forwarding sensitive email to old accounts.",
          "Be cautious with browser extensions that can read pages and email content.",
        ],
      },
      {
        heading: "Watch for phishing patterns",
        body: [
          "Phishing often creates urgency: locked account, missed delivery, unpaid invoice, unusual login, or prize claim. Slow down before clicking. Check the sender, hover or inspect links, and go directly to the website when the message is important.",
        ],
      },
    ],
    takeaway:
      "Protecting your email is about reducing exposure and securing the address that controls your most important accounts.",
  },
  "what-is-a-data-breach-and-how-to-prevent-it": {
    slug: "what-is-a-data-breach-and-how-to-prevent-it",
    title: "What is a Data Breach and How to Prevent It?",
    description:
      "Understand data breaches, what attackers usually obtain, and what you can do before and after a leak.",
    category: "Security",
    readTime: "8 min read",
    image: "/guides/what-is-a-data-breach-and-how-to-prevent-it.png",
    author,
    updated,
    intro: [
      "A data breach happens when information is accessed, exposed, or stolen without permission. For regular users, the first sign is often a wave of spam, suspicious login attempts, or a notification from a company.",
      "You cannot prevent every company from being breached. You can reduce how much damage a breach causes by limiting exposure and avoiding password reuse.",
    ],
    sections: [
      {
        heading: "What can leak",
        body: [
          "Breaches can expose email addresses, names, phone numbers, passwords, addresses, payment metadata, private messages, or internal business records. Sometimes passwords are hashed; sometimes they are poorly protected.",
          "Even an email-only leak matters because it can feed phishing campaigns and credential stuffing attempts.",
        ],
      },
      {
        heading: "How to reduce your risk",
        body: [
          "Use unique passwords, enable two-factor authentication, and avoid sharing your main email with websites that do not need it. For low-risk sign-ups, a temporary inbox or alias can keep your permanent address out of small databases.",
        ],
        bullets: [
          "Use a password manager instead of reusing passwords.",
          "Enable two-factor authentication on important accounts.",
          "Use aliases or temporary email for low-risk registrations.",
          "Remove accounts you no longer use when possible.",
        ],
      },
      {
        heading: "What to do after a breach",
        body: [
          "Change the password on the affected service and anywhere else you reused it. Watch for phishing messages that mention the breached company. If payment or identity data was involved, follow the company's incident guidance and consider additional monitoring.",
        ],
      },
    ],
    takeaway:
      "You cannot control every database, but you can limit the blast radius with unique passwords, two-factor authentication, and less email exposure.",
  },
  "how-to-create-a-temp-mail-without-registration": {
    slug: "how-to-create-a-temp-mail-without-registration",
    title: "How to Create a Temp Mail Without Registration",
    description:
      "A quick tutorial for creating a temporary inbox, copying the address, and reading messages without opening an account.",
    category: "Tutorial",
    readTime: "4 min read",
    image: "/guides/how-to-create-a-temp-mail-without-registration.png",
    author,
    updated,
    videoId: "fEG45V7jZi0",
    intro: [
      "You do not need to create an account to use Instant Mail for a quick temporary inbox. The tool generates an address, lets you copy it, and shows incoming messages directly in the browser.",
      "This guide is for low-risk use cases such as a short confirmation message, a test sign-up, or a one-time download where you do not want to expose your personal inbox.",
    ],
    sections: [
      {
        heading: "Step-by-step",
        body: [
          "Open Instant Mail, wait for the temporary email address to appear, and copy it. Paste the address into the website that needs to send you a message. Return to the inbox and refresh if needed.",
        ],
        bullets: [
          "Copy the generated email address.",
          "Use it on the website that needs a confirmation message.",
          "Open the incoming email in the Instant Mail inbox.",
          "Use links carefully and avoid entering sensitive information on unknown websites.",
        ],
      },
      {
        heading: "When to change the address",
        body: [
          "Change the address when you are finished with a task, when the inbox starts receiving unrelated messages, or when you want a clean mailbox for a different website.",
        ],
      },
      {
        heading: "Important limits",
        body: [
          "Do not use a no-registration temporary inbox for accounts you need to recover later. If the account matters, use an email address you control permanently.",
        ],
      },
    ],
    takeaway:
      "Creating a temporary inbox without registration is fast and convenient. Keep it for short tasks and use your real email for anything important.",
  },
};

export function isGuideSlug(value: string | undefined): value is GuideSlug {
  return !!value && guideSlugs.includes(value as GuideSlug);
}

export function getGuide(slug: GuideSlug) {
  return guides[slug];
}
