export const extraGuideSlugs = [
  "how-to-spot-phishing-emails",
  "what-is-two-factor-authentication",
  "password-manager-basics",
  "how-to-create-strong-passwords",
  "public-wifi-safety-checklist",
  "what-is-an-ip-address",
  "ipv4-vs-ipv6-explained",
  "what-is-a-vpn-and-when-to-use-one",
  "dns-records-explained",
  "spf-dkim-dmarc-explained",
  "mx-records-explained",
  "how-to-secure-your-gmail-account",
  "how-to-secure-your-outlook-account",
  "browser-privacy-settings-to-change",
  "how-to-check-if-a-link-is-safe",
  "safe-file-download-checklist",
  "what-is-malware",
  "ransomware-basics",
  "account-recovery-best-practices",
  "what-to-do-after-your-email-is-leaked",
  "how-to-reduce-your-digital-footprint",
  "secure-remote-work-checklist",
  "mobile-email-security",
  "how-to-recognize-fake-login-pages",
  "email-aliases-vs-temporary-email",
] as const;

type ExtraGuideSlug = (typeof extraGuideSlugs)[number];

type ExtraGuideSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

type ExtraGuide = {
  slug: ExtraGuideSlug;
  title: string;
  description: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
  updated: string;
  intro: string[];
  sections: ExtraGuideSection[];
  takeaway: string;
};

const author = "Igor Corrêa";
const updated = "June 10, 2026";

function guideImage(slug: ExtraGuideSlug) {
  return `/guides/${slug}.png`;
}

export const extraGuides: Record<ExtraGuideSlug, ExtraGuide> = {
  "how-to-spot-phishing-emails": {
    slug: "how-to-spot-phishing-emails",
    title: "How to Spot Phishing Emails",
    description:
      "A practical checklist for recognizing suspicious emails before you click a link, open an attachment, or share private data.",
    category: "Email Security",
    readTime: "7 min read",
    image: guideImage("how-to-spot-phishing-emails"),
    author,
    updated,
    intro: [
      "Phishing emails are designed to make a normal person act quickly. They borrow the language of banks, delivery companies, cloud services, social platforms, and workplace tools because familiar brands lower your guard.",
      "The safest habit is not paranoia; it is slowing down. A few seconds of checking the sender, the link, and the request can prevent account theft, malware, or payment fraud.",
    ],
    sections: [
      {
        heading: "Common warning signs",
        body: [
          "Most phishing messages create urgency. They say an account will close, a payment failed, a package is stuck, or a password must be reset immediately. The goal is to move you from thinking to reacting.",
        ],
        bullets: [
          "Unexpected attachments from senders you do not normally work with.",
          "Links that point to a different domain than the visible brand name.",
          "Generic greetings when the company normally knows your name.",
          "Requests for passwords, one-time codes, gift cards, or payment details.",
        ],
      },
      {
        heading: "Check links without trusting the text",
        body: [
          "A link can say one thing and go somewhere else. On desktop, hover before clicking. On mobile, long-press carefully and preview the destination without opening it. When the message is important, type the website address yourself instead of using the email link.",
        ],
      },
      {
        heading: "What to do when you are unsure",
        body: [
          "Treat uncertainty as a reason to verify through a separate channel. Contact the company through its official site, ask your IT team, or search the sender's domain. Do not reply to the suspicious email to ask whether it is real.",
        ],
        bullets: [
          "Report the message as phishing in your email provider.",
          "Delete it if you do not need it for evidence.",
          "Change your password if you clicked and signed in.",
          "Revoke sessions on the affected account if available.",
        ],
      },
    ],
    takeaway:
      "Phishing works by rushing you. Slow down, inspect the sender and destination, and open important services from the browser instead of the email link.",
  },
  "what-is-two-factor-authentication": {
    slug: "what-is-two-factor-authentication",
    title: "What Is Two-Factor Authentication?",
    description:
      "Understand 2FA, authenticator apps, SMS codes, security keys, and how to choose the safest option for important accounts.",
    category: "Account Security",
    readTime: "6 min read",
    image: guideImage("what-is-two-factor-authentication"),
    author,
    updated,
    intro: [
      "Two-factor authentication adds a second proof that you are the account owner. Instead of relying only on a password, the service asks for something else, such as a code, a device approval, or a hardware security key.",
      "It is one of the highest-impact security upgrades because stolen passwords are common. A second factor can stop many login attempts even when a password has leaked.",
    ],
    sections: [
      {
        heading: "Types of 2FA",
        body: [
          "Not all second factors are equal. SMS is better than nothing, but authenticator apps and hardware security keys are stronger because they are harder to intercept or redirect.",
        ],
        bullets: [
          "Authenticator apps generate time-based codes on your device.",
          "Push prompts ask you to approve or deny a login.",
          "SMS sends a code to your phone number.",
          "Security keys use a physical device and are strongest for high-risk accounts.",
        ],
      },
      {
        heading: "Where to enable it first",
        body: [
          "Start with accounts that protect money, identity, work, or recovery. Your primary email account should be near the top of the list because password resets for other services often land there.",
        ],
      },
      {
        heading: "Do not lose your backup access",
        body: [
          "2FA improves security, but it also means you need a recovery plan. Save backup codes in a password manager or another secure place before you need them.",
        ],
        bullets: [
          "Store backup codes offline or in a trusted password manager.",
          "Keep recovery email and phone details current.",
          "Add more than one security key if you use hardware keys.",
          "Review trusted devices periodically.",
        ],
      },
    ],
    takeaway:
      "Enable 2FA on important accounts first, prefer authenticator apps or security keys, and keep backup codes somewhere you can actually find later.",
  },
  "password-manager-basics": {
    slug: "password-manager-basics",
    title: "Password Manager Basics",
    description:
      "A beginner-friendly guide to password managers, vaults, autofill, sharing, emergency access, and safer password habits.",
    category: "Passwords",
    readTime: "7 min read",
    image: guideImage("password-manager-basics"),
    author,
    updated,
    intro: [
      "A password manager stores your logins in an encrypted vault so you do not need to memorize dozens of unique passwords. The real value is not convenience alone; it is breaking the habit of password reuse.",
      "When every account has a different password, one breached website cannot automatically unlock your email, bank, social accounts, and work tools.",
    ],
    sections: [
      {
        heading: "What a password manager does",
        body: [
          "A good password manager can generate strong passwords, save them, fill them on trusted sites, and warn you about weak or reused credentials. Many also store secure notes, recovery codes, and passkeys.",
        ],
      },
      {
        heading: "How to choose one",
        body: [
          "Choose a manager with a strong security reputation, clear export options, multi-device support, and two-factor authentication. The best tool is one you will actually use every day.",
        ],
        bullets: [
          "Look for independent security audits.",
          "Make sure you can export your vault if you need to switch.",
          "Use a long, memorable master password.",
          "Enable 2FA on the password manager itself.",
        ],
      },
      {
        heading: "Common mistakes",
        body: [
          "Do not store the master password in an unprotected note. Do not share your whole vault casually. Do not ignore warnings about reused passwords just because changing them feels tedious.",
        ],
      },
    ],
    takeaway:
      "A password manager turns strong, unique passwords from an impossible memory task into a daily habit you can maintain.",
  },
  "how-to-create-strong-passwords": {
    slug: "how-to-create-strong-passwords",
    title: "How to Create Strong Passwords",
    description:
      "Learn what makes a password strong, why length matters, and how to avoid patterns attackers already know.",
    category: "Passwords",
    readTime: "6 min read",
    image: guideImage("how-to-create-strong-passwords"),
    author,
    updated,
    intro: [
      "A strong password is difficult to guess, difficult to crack, and not reused anywhere else. Complexity helps, but length and uniqueness matter more than clever substitutions like replacing a letter with a number.",
      "The simplest approach is to let a password manager generate long random passwords. For passwords you must remember, use a long passphrase instead of a short complicated word.",
    ],
    sections: [
      {
        heading: "Length beats cleverness",
        body: [
          "Attackers test common patterns at scale. Names, dates, keyboard paths, sports teams, and small substitutions are already in cracking lists. A longer random password or passphrase creates a much larger search space.",
        ],
      },
      {
        heading: "Rules that actually help",
        body: [
          "Good password rules should make accounts safer without making people write passwords on sticky notes. Aim for passwords that are long, unique, and generated when possible.",
        ],
        bullets: [
          "Use at least 16 characters for generated passwords.",
          "Never reuse passwords across important accounts.",
          "Avoid personal details such as birthdays, names, and addresses.",
          "Change passwords immediately after a confirmed breach.",
        ],
      },
      {
        heading: "When to use a passphrase",
        body: [
          "A passphrase can be useful for a device login or master password. Pick several unrelated words and make the phrase long. Do not use famous quotes or song lyrics.",
        ],
      },
    ],
    takeaway:
      "Strong passwords are long, unique, and boringly random. Let tools generate them whenever possible.",
  },
  "public-wifi-safety-checklist": {
    slug: "public-wifi-safety-checklist",
    title: "Public Wi-Fi Safety Checklist",
    description:
      "How to use airport, hotel, cafe, and campus Wi-Fi with less risk to your accounts and personal data.",
    category: "Network Safety",
    readTime: "7 min read",
    image: guideImage("public-wifi-safety-checklist"),
    author,
    updated,
    intro: [
      "Public Wi-Fi is convenient, but you do not control the network, the router, or the people connected nearby. That does not mean you can never use it; it means you should treat it as a low-trust environment.",
      "Modern HTTPS protects much more than it used to, but unsafe networks can still expose metadata, trick users with fake portals, or encourage careless logins.",
    ],
    sections: [
      {
        heading: "Before you connect",
        body: [
          "Confirm the network name with the venue instead of choosing the strongest-looking signal. Fake networks often use names that look official but are slightly different.",
        ],
        bullets: [
          "Turn off auto-join for public networks.",
          "Avoid networks that do not require any confirmation or captive portal.",
          "Keep sharing features disabled on public Wi-Fi.",
          "Update your operating system and browser before travel when possible.",
        ],
      },
      {
        heading: "While you are connected",
        body: [
          "Avoid sensitive activity unless you need it. If you must access important accounts, verify the domain, use HTTPS, and consider a trusted VPN.",
        ],
      },
      {
        heading: "After you leave",
        body: [
          "Forget networks you do not use often. This prevents your device from reconnecting automatically later, especially in places where a malicious network could copy a familiar name.",
        ],
      },
    ],
    takeaway:
      "Public Wi-Fi is usable when you slow down, verify the network, avoid sensitive tasks, and prevent automatic reconnection.",
  },
  "what-is-an-ip-address": {
    slug: "what-is-an-ip-address",
    title: "What Is an IP Address?",
    description:
      "A simple explanation of public and private IP addresses, what websites can see, and why your IP may change.",
    category: "IP & Networking",
    readTime: "5 min read",
    image: guideImage("what-is-an-ip-address"),
    author,
    updated,
    intro: [
      "An IP address is a number used to route traffic between devices and networks. When you visit a website, that site needs an address to send the response back to your connection.",
      "Your public IP is visible to websites and online services. Your private IP is used inside your home, office, or mobile hotspot network.",
    ],
    sections: [
      {
        heading: "Public vs private IP",
        body: [
          "A public IP identifies your connection on the internet. A private IP identifies a device inside a local network, such as a phone, laptop, or printer behind the same router.",
        ],
      },
      {
        heading: "What an IP can reveal",
        body: [
          "An IP address can often suggest a rough location, internet provider, and network type. It usually does not reveal your exact home address by itself, but it is still a useful signal for tracking and fraud detection.",
        ],
        bullets: [
          "Approximate city or region.",
          "Internet service provider or mobile carrier.",
          "Whether you may be using a VPN or data center connection.",
          "Connection reputation based on previous abuse from that IP range.",
        ],
      },
      {
        heading: "Why your IP changes",
        body: [
          "Many home and mobile connections use dynamic IP addresses. Restarting a router, switching networks, traveling, or using mobile data can change the public IP websites see.",
        ],
      },
    ],
    takeaway:
      "Your IP address is a routing identifier, not your whole identity, but it can still reveal useful context about your connection.",
  },
  "ipv4-vs-ipv6-explained": {
    slug: "ipv4-vs-ipv6-explained",
    title: "IPv4 vs IPv6 Explained",
    description:
      "Understand the difference between IPv4 and IPv6, why both exist, and what it means for everyday browsing.",
    category: "IP & Networking",
    readTime: "6 min read",
    image: guideImage("ipv4-vs-ipv6-explained"),
    author,
    updated,
    intro: [
      "IPv4 and IPv6 are two versions of internet addressing. IPv4 is older and still widely used. IPv6 was created because the internet needed far more addresses than IPv4 can provide.",
      "For most users, the change is invisible. Your device and provider decide which protocol to use, and many websites support both.",
    ],
    sections: [
      {
        heading: "Why IPv6 exists",
        body: [
          "IPv4 has about 4.3 billion possible addresses, which sounded enormous decades ago but is not enough for today's internet. IPv6 uses a much larger address space, making it easier to connect more devices directly.",
        ],
      },
      {
        heading: "What changes for privacy",
        body: [
          "IPv6 does not automatically make browsing private or unsafe. Privacy depends on provider configuration, device settings, websites, cookies, and account logins. Modern systems often rotate temporary IPv6 addresses to reduce long-term tracking.",
        ],
      },
      {
        heading: "Troubleshooting basics",
        body: [
          "If a site works on one network but not another, IPv6 can sometimes be part of the issue. Restarting the router, testing another DNS resolver, or checking provider status can help narrow the problem.",
        ],
        bullets: [
          "Test the same website on mobile data.",
          "Restart the router before changing advanced settings.",
          "Check whether your VPN supports IPv6.",
          "Avoid disabling IPv6 permanently unless you know why.",
        ],
      },
    ],
    takeaway:
      "IPv6 is the modern addressing system for a larger internet. Most people should leave it enabled and troubleshoot only when a specific issue appears.",
  },
  "what-is-a-vpn-and-when-to-use-one": {
    slug: "what-is-a-vpn-and-when-to-use-one",
    title: "What Is a VPN and When Should You Use One?",
    description:
      "A balanced guide to VPNs, what they protect, what they do not protect, and when they are worth using.",
    category: "Privacy",
    readTime: "7 min read",
    image: guideImage("what-is-a-vpn-and-when-to-use-one"),
    author,
    updated,
    intro: [
      "A VPN routes your internet traffic through an encrypted tunnel to a VPN provider. Websites see the VPN server's IP address instead of your normal network IP.",
      "VPNs can be useful, especially on untrusted networks, but they are not magic privacy tools. They shift trust from a local network or internet provider to the VPN company.",
    ],
    sections: [
      {
        heading: "What a VPN helps with",
        body: [
          "A VPN can reduce exposure on public Wi-Fi, hide your public IP from websites, and make network-level monitoring harder. It can also help remote workers access private company resources.",
        ],
      },
      {
        heading: "What it does not solve",
        body: [
          "A VPN does not stop websites from tracking logged-in accounts, cookies, browser fingerprints, or behavior. It also does not make phishing links, malware, or weak passwords safe.",
        ],
        bullets: [
          "You can still be tracked by accounts you sign into.",
          "Malicious downloads are still malicious.",
          "A dishonest VPN provider can see metadata.",
          "A VPN does not replace 2FA or good password habits.",
        ],
      },
      {
        heading: "Choosing a VPN carefully",
        body: [
          "Look for clear ownership, transparent policies, strong encryption, reliable apps, and a history of independent audits. Avoid free VPNs that monetize aggressively with data collection.",
        ],
      },
    ],
    takeaway:
      "A VPN is useful for network privacy and IP masking, but it should sit alongside secure accounts, safe browsing, and careful link handling.",
  },
  "dns-records-explained": {
    slug: "dns-records-explained",
    title: "DNS Records Explained",
    description:
      "A clear overview of A, AAAA, CNAME, TXT, MX, SPF, DKIM, and DMARC records for website and email owners.",
    category: "DNS & Email",
    readTime: "8 min read",
    image: guideImage("dns-records-explained"),
    author,
    updated,
    intro: [
      "DNS is the internet's lookup system. It connects human-readable names like example.com to technical records that tell browsers, email servers, and other services where to go.",
      "If you manage a domain, DNS records are not optional background noise. They decide whether your website loads, your email arrives, and your security policies are understood by other systems.",
    ],
    sections: [
      {
        heading: "Common DNS records",
        body: [
          "Different record types answer different questions. A and AAAA records point to IP addresses. CNAME records point one name to another. TXT records store text used for verification and email policy.",
        ],
        bullets: [
          "A: points a domain to an IPv4 address.",
          "AAAA: points a domain to an IPv6 address.",
          "CNAME: aliases one hostname to another hostname.",
          "TXT: stores verification, SPF, and other text-based policies.",
        ],
      },
      {
        heading: "Email-related records",
        body: [
          "Email relies heavily on DNS. MX records say where mail should be delivered. SPF, DKIM, and DMARC help receiving servers decide whether mail claiming to be from your domain is legitimate.",
        ],
      },
      {
        heading: "Why DNS changes take time",
        body: [
          "DNS records are cached based on a value called TTL. A change may appear quickly for some people and later for others, depending on caches at providers, resolvers, and devices.",
        ],
      },
    ],
    takeaway:
      "DNS records are small settings with large consequences. For email, MX, SPF, DKIM, and DMARC deserve special attention.",
  },
  "spf-dkim-dmarc-explained": {
    slug: "spf-dkim-dmarc-explained",
    title: "SPF, DKIM, and DMARC Explained",
    description:
      "How the three core email authentication standards work together to reduce spoofing and improve domain trust.",
    category: "DNS & Email",
    readTime: "8 min read",
    image: guideImage("spf-dkim-dmarc-explained"),
    author,
    updated,
    intro: [
      "SPF, DKIM, and DMARC are DNS-based email authentication tools. They help receiving mail servers evaluate whether a message claiming to come from a domain is allowed, signed, and aligned with policy.",
      "They do not eliminate spam by themselves, but without them your domain is easier to spoof and your legitimate mail may be harder to trust.",
    ],
    sections: [
      {
        heading: "What SPF does",
        body: [
          "SPF lists which servers are allowed to send email for a domain. If a message comes from a server outside that list, the receiver can treat it as suspicious.",
        ],
      },
      {
        heading: "What DKIM does",
        body: [
          "DKIM adds a cryptographic signature to email. The public key lives in DNS, and the receiving server can verify that important parts of the message were not changed after sending.",
        ],
      },
      {
        heading: "What DMARC does",
        body: [
          "DMARC tells receivers what to do when SPF or DKIM fail alignment. It can start in monitoring mode, then move toward quarantine or reject once you understand your legitimate senders.",
        ],
        bullets: [
          "Start with a reporting policy before blocking mail.",
          "Include all legitimate senders in SPF/DKIM setup.",
          "Review reports before moving to stricter enforcement.",
          "Keep records updated when email vendors change.",
        ],
      },
    ],
    takeaway:
      "SPF, DKIM, and DMARC work best together: authorization, signing, and policy for mail that claims to come from your domain.",
  },
  "mx-records-explained": {
    slug: "mx-records-explained",
    title: "MX Records Explained",
    description:
      "What MX records do, how priority works, and why incorrect MX settings can stop email from arriving.",
    category: "DNS & Email",
    readTime: "5 min read",
    image: guideImage("mx-records-explained"),
    author,
    updated,
    intro: [
      "MX records tell the internet where to deliver email for a domain. If they are missing or incorrect, messages may bounce, disappear, or route to the wrong provider.",
      "For domain owners, MX is one of the first DNS settings to check when email stops arriving.",
    ],
    sections: [
      {
        heading: "How MX priority works",
        body: [
          "MX records include a priority number. Lower numbers are preferred first. Backup mail servers can have higher numbers so they are used only when the main server is unavailable.",
        ],
      },
      {
        heading: "Common MX mistakes",
        body: [
          "Problems often happen during provider migrations. A domain may keep old MX records, mix providers accidentally, or point to a hostname that no longer exists.",
        ],
        bullets: [
          "Leaving old provider records after switching email hosts.",
          "Using a typo in the mail server hostname.",
          "Deleting MX records while changing website DNS.",
          "Assuming website hosting and email hosting are always the same service.",
        ],
      },
      {
        heading: "How to troubleshoot",
        body: [
          "Use a DNS checker to verify the records currently visible to public resolvers. Compare them with your email provider's setup instructions and wait for DNS caching when changes are recent.",
        ],
      },
    ],
    takeaway:
      "MX records are the delivery address for your domain's email. Keep them clean, current, and aligned with your actual mail provider.",
  },
  "how-to-secure-your-gmail-account": {
    slug: "how-to-secure-your-gmail-account",
    title: "How to Secure Your Gmail Account",
    description:
      "Practical Gmail security steps: 2FA, recovery options, app access, forwarding rules, and suspicious login checks.",
    category: "Email Security",
    readTime: "7 min read",
    image: guideImage("how-to-secure-your-gmail-account"),
    author,
    updated,
    intro: [
      "A Gmail account often controls access to many other accounts because password resets and verification messages arrive there. Securing it should be treated like securing a master key.",
      "The goal is to reduce the chance of takeover and make recovery possible if something goes wrong.",
    ],
    sections: [
      {
        heading: "Start with login protection",
        body: [
          "Use a unique password and turn on two-factor authentication. For high-risk users, hardware security keys provide stronger protection against phishing than SMS codes.",
        ],
      },
      {
        heading: "Review recovery and access",
        body: [
          "Recovery settings help you regain access, but outdated recovery details can become a weakness. Check recovery email, phone number, signed-in devices, and third-party apps.",
        ],
        bullets: [
          "Remove devices you no longer use.",
          "Revoke app access you do not recognize.",
          "Check forwarding and filters for suspicious rules.",
          "Confirm recovery options still belong to you.",
        ],
      },
      {
        heading: "Watch for quiet persistence",
        body: [
          "Attackers sometimes add forwarding rules or app passwords instead of changing your main password. Review settings after any suspicious login warning.",
        ],
      },
    ],
    takeaway:
      "Protect Gmail with a unique password, strong 2FA, current recovery options, and regular checks for hidden forwarding or app access.",
  },
  "how-to-secure-your-outlook-account": {
    slug: "how-to-secure-your-outlook-account",
    title: "How to Secure Your Outlook Account",
    description:
      "Steps to harden Outlook and Microsoft accounts, including 2FA, recovery methods, aliases, sessions, and forwarding rules.",
    category: "Email Security",
    readTime: "7 min read",
    image: guideImage("how-to-secure-your-outlook-account"),
    author,
    updated,
    intro: [
      "An Outlook or Microsoft account can connect email, OneDrive, Windows sign-in, Xbox, Office, and business tools. That makes it valuable to attackers and worth securing carefully.",
      "Most improvements are simple: strengthen login, review recovery, remove suspicious access, and keep an eye on rules that could silently copy your mail.",
    ],
    sections: [
      {
        heading: "Secure sign-in first",
        body: [
          "Use a unique password and enable two-step verification. If your account supports passkeys or Microsoft Authenticator, use them instead of relying only on SMS.",
        ],
      },
      {
        heading: "Review account activity",
        body: [
          "Microsoft provides sign-in activity that can show unusual countries, devices, or failed attempts. A failed attempt alone is common, but successful unfamiliar activity deserves immediate action.",
        ],
        bullets: [
          "Check recent sign-in activity.",
          "Sign out of unknown devices.",
          "Remove old app passwords.",
          "Review email forwarding and inbox rules.",
        ],
      },
      {
        heading: "Use aliases carefully",
        body: [
          "Aliases can help reduce exposure of your primary address. Keep your main sign-in alias private where possible and avoid using it for every public registration.",
        ],
      },
    ],
    takeaway:
      "Outlook security is about more than the password: check sessions, recovery methods, aliases, and forwarding rules.",
  },
  "browser-privacy-settings-to-change": {
    slug: "browser-privacy-settings-to-change",
    title: "Browser Privacy Settings to Change",
    description:
      "Simple browser settings that reduce tracking, risky downloads, unwanted notifications, and saved-data exposure.",
    category: "Browser Safety",
    readTime: "7 min read",
    image: guideImage("browser-privacy-settings-to-change"),
    author,
    updated,
    intro: [
      "Your browser is where many privacy decisions happen: cookies, permissions, downloads, autofill, notifications, extensions, and site data all live there.",
      "You do not need to turn every setting to maximum. A few practical changes can reduce noise and risk without making the web painful to use.",
    ],
    sections: [
      {
        heading: "Control permissions",
        body: [
          "Websites can request camera, microphone, location, clipboard, and notification permissions. Review what you have granted and remove anything you do not actively use.",
        ],
        bullets: [
          "Block notification prompts by default if you rarely use them.",
          "Remove location access for sites that do not need it.",
          "Review camera and microphone permissions monthly.",
          "Clear permissions after testing unfamiliar sites.",
        ],
      },
      {
        heading: "Reduce passive tracking",
        body: [
          "Blocking third-party cookies, clearing old site data, and using stricter tracking protection can limit some cross-site tracking. Logged-in accounts and fingerprints can still identify you, so treat this as reduction, not invisibility.",
        ],
      },
      {
        heading: "Audit extensions",
        body: [
          "Extensions can be useful, but many have broad access to pages you visit. Remove extensions you no longer use and be cautious with tools that can read or modify every website.",
        ],
      },
    ],
    takeaway:
      "Good browser privacy starts with permissions, tracking controls, and a small, trusted set of extensions.",
  },
  "how-to-check-if-a-link-is-safe": {
    slug: "how-to-check-if-a-link-is-safe",
    title: "How to Check If a Link Is Safe",
    description:
      "A practical method for inspecting URLs before opening them, especially in email, chat, ads, and social posts.",
    category: "Safe Browsing",
    readTime: "6 min read",
    image: guideImage("how-to-check-if-a-link-is-safe"),
    author,
    updated,
    intro: [
      "Unsafe links are one of the easiest ways to move someone from a trusted app to a malicious website. The link may appear in an email, text message, social post, QR code, or advertisement.",
      "Checking a link is mostly about reading the destination carefully and refusing to let urgency override common sense.",
    ],
    sections: [
      {
        heading: "Read the real domain",
        body: [
          "Attackers often place the brand name somewhere in the URL while the real domain is different. Focus on the registered domain immediately before the path begins.",
        ],
        bullets: [
          "https://accounts.example.com is different from https://example.com.accounts-login.test.",
          "Misspellings and extra hyphens are common tricks.",
          "Short links hide the final destination until expanded.",
          "A lock icon means encryption, not trust.",
        ],
      },
      {
        heading: "Use separate navigation",
        body: [
          "For banking, email, cloud storage, and work tools, open the site from your bookmark or by typing the address yourself. If the warning is real, it will usually appear inside the account too.",
        ],
      },
      {
        heading: "When scanners help",
        body: [
          "Reputation scanners can flag known malicious URLs, but a new phishing page may not be listed yet. Use scanners as one signal, not as permission to ignore suspicious context.",
        ],
      },
    ],
    takeaway:
      "A safe-looking link can still be dangerous. Check the real domain and navigate separately for important accounts.",
  },
  "safe-file-download-checklist": {
    slug: "safe-file-download-checklist",
    title: "Safe File Download Checklist",
    description:
      "How to evaluate downloads from email, cloud links, forums, ads, and software pages before opening them.",
    category: "Safe Browsing",
    readTime: "7 min read",
    image: guideImage("safe-file-download-checklist"),
    author,
    updated,
    intro: [
      "Downloads are risky because they move code or documents from the internet onto your device. Even a normal-looking invoice, resume, browser extension, or installer can be used to deliver malware.",
      "The goal is not to avoid every download. It is to check source, file type, context, and behavior before trusting the file.",
    ],
    sections: [
      {
        heading: "Check the source",
        body: [
          "Download software from the official vendor site or a trusted app store. Be careful with search ads that imitate real download pages, especially for popular free tools.",
        ],
      },
      {
        heading: "Watch file types",
        body: [
          "Some file types are more dangerous because they can execute code. Office documents with macros, scripts, installers, compressed archives, and browser extensions deserve extra caution.",
        ],
        bullets: [
          "Be skeptical of unexpected .exe, .dmg, .pkg, .js, .vbs, .scr, or macro-enabled files.",
          "Do not enable macros just because a document asks.",
          "Scan files from unknown senders before opening.",
          "Delete downloads you no longer need.",
        ],
      },
      {
        heading: "Use a low-risk workflow",
        body: [
          "Keep your operating system updated, use built-in malware protection, and open suspicious documents in a safer viewer when possible. For work devices, follow company policy instead of improvising.",
        ],
      },
    ],
    takeaway:
      "Safe downloading is about source, file type, and context. If a file is unexpected, slow down before opening it.",
  },
  "what-is-malware": {
    slug: "what-is-malware",
    title: "What Is Malware?",
    description:
      "An accessible overview of malware types, how infections happen, and everyday habits that lower risk.",
    category: "Security Basics",
    readTime: "6 min read",
    image: guideImage("what-is-malware"),
    author,
    updated,
    intro: [
      "Malware is software designed to harm, spy, steal, disrupt, or take control of a device or account. It can arrive through downloads, email attachments, malicious ads, fake updates, pirated software, or compromised websites.",
      "You do not need to become a malware analyst to reduce risk. The basics are updates, careful downloads, trusted sources, and strong account protection.",
    ],
    sections: [
      {
        heading: "Common types of malware",
        body: [
          "Different malware families behave differently. Some steal passwords, some encrypt files, some show unwanted ads, and some quietly monitor activity.",
        ],
        bullets: [
          "Trojans pretend to be legitimate software.",
          "Spyware watches activity or steals information.",
          "Ransomware encrypts files and demands payment.",
          "Adware injects unwanted ads or redirects.",
        ],
      },
      {
        heading: "How infections usually start",
        body: [
          "Many infections begin with a user action: opening an attachment, installing a fake update, running pirated software, or approving permissions without reading them.",
        ],
      },
      {
        heading: "Basic prevention",
        body: [
          "Keep devices updated, use reputable security tools, avoid pirated installers, and back up important files. If a device behaves strangely after a download, disconnect and investigate before signing into sensitive accounts.",
        ],
      },
    ],
    takeaway:
      "Malware risk drops sharply when you keep software updated, avoid suspicious downloads, and protect important accounts with unique passwords and 2FA.",
  },
  "ransomware-basics": {
    slug: "ransomware-basics",
    title: "Ransomware Basics",
    description:
      "What ransomware is, why backups matter, and how individuals and small teams can reduce the impact of an attack.",
    category: "Security Basics",
    readTime: "7 min read",
    image: guideImage("ransomware-basics"),
    author,
    updated,
    intro: [
      "Ransomware is malware that locks or encrypts files and demands payment. For businesses, it can also involve stolen data and pressure tactics. For individuals, it can mean losing years of photos, documents, and personal records.",
      "The strongest defense is preparation before anything happens, especially backups that attackers cannot easily delete.",
    ],
    sections: [
      {
        heading: "How ransomware spreads",
        body: [
          "Ransomware can arrive through phishing, exposed remote access, malicious downloads, compromised software, or weak passwords. Once inside, it may try to spread to shared folders and other devices.",
        ],
      },
      {
        heading: "Backups are the safety net",
        body: [
          "A backup only helps if it is recent, restorable, and protected from the same attack. Cloud sync is not always enough because encrypted files may sync too.",
        ],
        bullets: [
          "Keep at least one backup disconnected or protected from normal account access.",
          "Test restoring files before an emergency.",
          "Back up important files automatically.",
          "Protect backup accounts with strong passwords and 2FA.",
        ],
      },
      {
        heading: "If you suspect infection",
        body: [
          "Disconnect from the network, avoid logging into sensitive accounts from the device, and seek trusted help. For workplaces, report immediately instead of trying to fix it quietly.",
        ],
      },
    ],
    takeaway:
      "Ransomware preparation is mostly boring: updates, strong access control, and backups that can actually be restored.",
  },
  "account-recovery-best-practices": {
    slug: "account-recovery-best-practices",
    title: "Account Recovery Best Practices",
    description:
      "How to set up recovery emails, phone numbers, backup codes, and emergency access without creating new weak points.",
    category: "Account Security",
    readTime: "6 min read",
    image: guideImage("account-recovery-best-practices"),
    author,
    updated,
    intro: [
      "Account recovery is what saves you when a device is lost, a password is forgotten, or a login is blocked. It can also become the easiest path for attackers if recovery details are old or poorly protected.",
      "Good recovery setup balances access and security. You should be able to recover your account, but strangers should not be able to do it for you.",
    ],
    sections: [
      {
        heading: "Protect the recovery email",
        body: [
          "Your recovery email should be at least as secure as the account it protects. If attackers compromise recovery email, they can reset passwords elsewhere.",
        ],
      },
      {
        heading: "Use backup codes wisely",
        body: [
          "Backup codes are powerful. Store them somewhere durable and private, such as a password manager or a printed copy in a secure place.",
        ],
        bullets: [
          "Do not store backup codes in the same inbox they protect.",
          "Regenerate codes if you think they were exposed.",
          "Label printed codes clearly but discreetly.",
          "Review recovery settings after changing phones.",
        ],
      },
      {
        heading: "Remove stale recovery paths",
        body: [
          "Old phone numbers, former work emails, and abandoned inboxes are common recovery weaknesses. Review important accounts a few times per year.",
        ],
      },
    ],
    takeaway:
      "Recovery settings should be current, private, and protected. Otherwise, they can become the easiest way into your account.",
  },
  "what-to-do-after-your-email-is-leaked": {
    slug: "what-to-do-after-your-email-is-leaked",
    title: "What to Do After Your Email Is Leaked",
    description:
      "A calm response plan for leaked email addresses, spam waves, breach notifications, and suspicious login attempts.",
    category: "Incident Response",
    readTime: "7 min read",
    image: guideImage("what-to-do-after-your-email-is-leaked"),
    author,
    updated,
    intro: [
      "An email leak does not always mean your inbox was hacked. Often it means a service exposed a list that included your address. Still, leaks can lead to phishing, spam, and password attacks.",
      "The right response depends on what leaked: just the address, a password, personal details, payment data, or private messages.",
    ],
    sections: [
      {
        heading: "Figure out what happened",
        body: [
          "Read the breach notice carefully and verify it through the company's official site when possible. Avoid clicking links in unexpected breach emails until you confirm they are legitimate.",
        ],
      },
      {
        heading: "Change passwords when needed",
        body: [
          "If a password was involved, change it on that service and anywhere else you reused it. Password reuse is what turns one breach into many account takeovers.",
        ],
        bullets: [
          "Use a unique password for the affected account.",
          "Enable 2FA if available.",
          "Review recent account activity.",
          "Watch for targeted phishing that mentions the breached service.",
        ],
      },
      {
        heading: "Reduce future exposure",
        body: [
          "Use aliases or temporary email for low-risk sign-ups. Keep your main address for people, services, and accounts that truly need long-term access.",
        ],
      },
    ],
    takeaway:
      "After an email leak, focus on passwords, account activity, phishing risk, and reducing where your main address appears next time.",
  },
  "how-to-reduce-your-digital-footprint": {
    slug: "how-to-reduce-your-digital-footprint",
    title: "How to Reduce Your Digital Footprint",
    description:
      "Practical steps to share less personal information online without disappearing from the internet completely.",
    category: "Privacy",
    readTime: "8 min read",
    image: guideImage("how-to-reduce-your-digital-footprint"),
    author,
    updated,
    intro: [
      "Your digital footprint is the trail of accounts, posts, email addresses, usernames, purchases, data broker listings, and device signals connected to you online.",
      "Reducing it is not about becoming invisible. It is about lowering unnecessary exposure and making your important accounts easier to defend.",
    ],
    sections: [
      {
        heading: "Start with old accounts",
        body: [
          "Unused accounts can still leak data. Search your inbox for welcome emails, delete accounts you no longer use, and update passwords on accounts you keep.",
        ],
      },
      {
        heading: "Separate identities by purpose",
        body: [
          "Use different email addresses or aliases for personal, work, shopping, newsletters, and low-risk sign-ups. Separation makes spam easier to trace and reduces the blast radius of leaks.",
        ],
        bullets: [
          "Reserve your main inbox for important accounts.",
          "Use aliases for stores and newsletters.",
          "Use temporary email for short-lived, low-risk tasks.",
          "Avoid reusing the same username everywhere.",
        ],
      },
      {
        heading: "Review public information",
        body: [
          "Look at social profiles, old forum posts, portfolio pages, and public documents. Remove details that are no longer useful, especially phone numbers, addresses, and recovery clues.",
        ],
      },
    ],
    takeaway:
      "A smaller digital footprint makes spam, phishing, and account recovery attacks harder to personalize.",
  },
  "secure-remote-work-checklist": {
    slug: "secure-remote-work-checklist",
    title: "Secure Remote Work Checklist",
    description:
      "A practical checklist for safer remote work across home Wi-Fi, devices, email, cloud files, and video calls.",
    category: "Work Security",
    readTime: "7 min read",
    image: guideImage("secure-remote-work-checklist"),
    author,
    updated,
    intro: [
      "Remote work mixes personal networks, work accounts, cloud tools, shared links, and video calls. That flexibility is useful, but it also creates small security decisions every day.",
      "A good remote work setup protects the device, the network, the account, and the data without making basic work impossible.",
    ],
    sections: [
      {
        heading: "Protect the device",
        body: [
          "Use full-disk encryption where available, a strong device password, automatic lock, and regular updates. Separate work and personal profiles if your company allows it.",
        ],
      },
      {
        heading: "Handle files and links carefully",
        body: [
          "Shared documents and cloud links can leak data if permissions are too broad. Prefer named collaborators over public links for sensitive files.",
        ],
        bullets: [
          "Review external sharing before sending a link.",
          "Avoid downloading confidential files to shared family devices.",
          "Use company-approved storage for work documents.",
          "Report suspicious email instead of forwarding it casually.",
        ],
      },
      {
        heading: "Secure the home network",
        body: [
          "Use a strong Wi-Fi password, WPA2 or WPA3 encryption, and updated router firmware. Guest networks are useful when visitors or smart devices do not need access to work devices.",
        ],
      },
    ],
    takeaway:
      "Remote work security is a set of small habits: updated devices, careful sharing, strong accounts, and a home network you trust.",
  },
  "mobile-email-security": {
    slug: "mobile-email-security",
    title: "Mobile Email Security",
    description:
      "How to protect email on your phone, including lock screens, app permissions, previews, lost devices, and suspicious links.",
    category: "Email Security",
    readTime: "6 min read",
    image: guideImage("mobile-email-security"),
    author,
    updated,
    intro: [
      "Many people read email on their phone before anywhere else. That means the phone can expose password resets, verification codes, attachments, and private conversations.",
      "Mobile email security starts with the device itself, then moves to the mail app, notifications, and account settings.",
    ],
    sections: [
      {
        heading: "Secure the lock screen",
        body: [
          "Use a strong device passcode and biometric unlock where appropriate. Hide sensitive notification previews if emails often contain codes or private details.",
        ],
      },
      {
        heading: "Watch mobile link behavior",
        body: [
          "Phones make links feel casual because screens are small and hover previews are not available. Long-press to preview links, and avoid signing in from unexpected messages.",
        ],
        bullets: [
          "Keep the operating system and email app updated.",
          "Remove mail access from lost or old devices.",
          "Avoid installing unknown mail profile configurations.",
          "Use the official app for important providers when possible.",
        ],
      },
      {
        heading: "Prepare for lost devices",
        body: [
          "Turn on device-finding features and know how to revoke sessions from your email provider. A fast response can prevent a lost phone from becoming an account incident.",
        ],
      },
    ],
    takeaway:
      "Mobile email security depends on a locked device, careful link handling, and the ability to revoke access quickly if the phone is lost.",
  },
  "how-to-recognize-fake-login-pages": {
    slug: "how-to-recognize-fake-login-pages",
    title: "How to Recognize Fake Login Pages",
    description:
      "Learn how fake login pages imitate real brands and what to check before typing your password or verification code.",
    category: "Safe Browsing",
    readTime: "7 min read",
    image: guideImage("how-to-recognize-fake-login-pages"),
    author,
    updated,
    intro: [
      "Fake login pages are built to capture passwords and one-time codes. They may copy a real brand's logo, layout, colors, and wording closely enough to look convincing at a glance.",
      "The most reliable clue is usually not the design. It is the URL, the context, and whether you arrived from a suspicious message.",
    ],
    sections: [
      {
        heading: "Check the address bar",
        body: [
          "A fake page can look perfect but still live on the wrong domain. Read the domain carefully before typing credentials, especially after clicking a link in email or chat.",
        ],
      },
      {
        heading: "Be suspicious of code prompts",
        body: [
          "Some phishing pages ask for a password and then immediately ask for a 2FA code. If you provide both, the attacker may use them in real time.",
        ],
        bullets: [
          "Do not enter codes on pages opened from suspicious links.",
          "Use bookmarks for important login pages.",
          "Prefer passkeys or security keys where available.",
          "Report fake pages to the impersonated service.",
        ],
      },
      {
        heading: "Use password manager signals",
        body: [
          "A password manager often refuses to autofill on the wrong domain. Treat that as a useful warning, not an inconvenience to bypass.",
        ],
      },
    ],
    takeaway:
      "A polished design does not prove a login page is real. Verify the domain and be extra careful when a page asks for both password and 2FA code.",
  },
  "email-aliases-vs-temporary-email": {
    slug: "email-aliases-vs-temporary-email",
    title: "Email Aliases vs Temporary Email",
    description:
      "Compare aliases and temporary inboxes so you can choose the right privacy tool for shopping, newsletters, testing, and account recovery.",
    category: "Email Privacy",
    readTime: "6 min read",
    image: guideImage("email-aliases-vs-temporary-email"),
    author,
    updated,
    intro: [
      "Email aliases and temporary email both reduce exposure of your main inbox, but they are not the same tool. An alias usually forwards to an inbox you control. A temporary inbox is usually short-lived and built for quick tasks.",
      "Choosing correctly helps you avoid spam without losing access to accounts that matter.",
    ],
    sections: [
      {
        heading: "When aliases are better",
        body: [
          "Use aliases when you want long-term control but do not want to reveal your main address. They are useful for stores, newsletters, subscriptions, and accounts you may need to recover.",
        ],
      },
      {
        heading: "When temporary email is better",
        body: [
          "Use temporary email when the message is short-lived and low risk. It is good for one-time confirmations, quick tests, and sign-ups that do not deserve a permanent relationship.",
        ],
        bullets: [
          "Use aliases for accounts you may keep.",
          "Use temporary email for quick, disposable tasks.",
          "Do not use temporary inboxes for banking or recovery.",
          "Use separate aliases to trace which services leak or spam.",
        ],
      },
      {
        heading: "A practical setup",
        body: [
          "Keep one main inbox private, use aliases for ongoing services, and use temporary email for low-risk moments. That layered approach gives you privacy without making account recovery chaotic.",
        ],
      },
    ],
    takeaway:
      "Aliases are for controlled long-term separation. Temporary email is for short-term, low-risk messages.",
  },
};
