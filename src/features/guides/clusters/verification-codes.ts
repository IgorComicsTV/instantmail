import type { ClusterGuideInput } from "../clusterTypes";

export const verificationCodesGuides: ClusterGuideInput[] = [
  {
    slug: "email-verification-code-not-arriving",
    title: "Email Verification Code Not Arriving? What to Check",
    description:
      "Email verification code not arriving? Work through a short checklist covering typos, spam folders, delays, blocked domains and resend limits.",
    readTime: "5 min read",
    quickAnswer:
      "Most missing verification codes come down to a mistyped address, a spam or filter folder, a short delay on the sender's side, or a site that refuses the address. Check those four things in order before requesting more codes.",
    intro: [
      "You typed your email, pressed the button, and now the inbox is silent. It feels like something is broken, but the cause is usually small and easy to find once you check things in a sensible order.",
      "Verification emails travel through several systems: the website, its email service, the internet, and finally your mailbox provider. A problem at any step looks identical from your side, which is why a checklist works better than guessing.",
    ],
    sections: [
      {
        heading: "Why is my verification code email not showing up?",
        body: [
          "The email can fail to appear for reasons on either end. On your side, the address may contain a typo, the message may sit in spam, promotions or another folder, or your inbox may be full. On the sender's side, the site may be slow to queue the message, may throttle repeated requests, or may have decided not to send at all.",
          "A message that was never sent cannot be found by searching, so the first job is to separate those two groups. If the site says the email was sent, look on your side. If the site shows an error or no confirmation at all, the problem is probably there.",
        ],
      },
      {
        heading: "Step-by-step checklist when a code does not arrive",
        body: [
          "Work through these in order. Each step is cheap and rules out a whole category of causes.",
        ],
        bullets: [
          "Read the address on the confirmation screen again and check every character, especially the domain after the at sign.",
          "Wait two to three minutes before doing anything else, because many sites queue messages and an instant resend can slow things down.",
          "Open your spam, junk, promotions and updates folders, and search the whole mailbox for the site's name.",
          "Check that your mailbox is not full and that no filter or forwarding rule is moving the message somewhere unexpected.",
          "Request one new code through the site's resend button, then wait again instead of clicking repeatedly.",
          "Use only the newest code, because older codes are often invalidated when a new one is issued.",
          "Try a different address you control if the site allows it, which tells you whether your mailbox provider is the issue.",
          "Contact the site's support with the time you requested the code and the address you used if nothing arrives.",
        ],
      },
      {
        heading: "Can a site block certain email addresses?",
        body: [
          "Yes. Some websites refuse addresses from domains they associate with disposable email, and some simply never deliver to them. Others reject addresses with certain formats or from regions they do not serve. The site may show an error, or it may pretend to send and deliver nothing.",
          "If you used a temporary address and no code ever arrives, this is a likely explanation, and the right response is to use a regular address instead of trying to work around the block.",
        ],
      },
      {
        heading: "Does the sender's setup matter?",
        body: [
          "It can. If a website sends mail without proper SPF, DKIM and DMARC records for its domain, receiving providers may delay it, filter it to spam, or reject it. You cannot fix that as a user, but it explains why one site's codes arrive reliably while another's do not.",
          "If you run the site, the DNS checker can confirm whether those records exist for your sending domain, which is a good first step when users report missing codes.",
        ],
      },
      {
        heading: "Common mistakes that make it worse",
        body: [
          "Pressing resend many times in a row is the most common one. Each press can generate a new code and invalidate the previous one, so the code you finally find may already be dead. It can also trigger a rate limit that pauses sending for several minutes.",
          "Another mistake is using several different addresses in quick succession. That can look like abuse to the site and lead to a temporary lock. Pick one address, request once, and wait.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address it creates for you.",
        "Paste that address into the sign-up form of a low-risk service and request the code.",
        "Leave the Instant Mail tab open. The inbox refreshes automatically about every 8 seconds.",
        "If nothing shows up yet, press Refresh. It has a 5 second cooldown, so you do not need to press it repeatedly.",
        "Open the message when it arrives and read the code. Remember that mail only appears after the sender actually delivers it.",
        "If nothing arrives after a few minutes, assume the site may block disposable domains and switch to a regular address.",
      ],
      note: "Use a temporary inbox only for legal, low-risk, short-term tasks, never for accounts you need to recover later.",
    },
    cta: {
      label: "Open a temporary inbox",
      href: "https://www.instantmail.online/en/",
    },
    takeaway:
      "Check the address, wait a few minutes, look in every folder, then resend once. If a code still never comes, the site may be blocking the address or failing to send, and a different address is the next test.",
  },
  {
    slug: "can-temporary-email-receive-otp-codes",
    title: "Can a Temporary Email Receive OTP Codes?",
    description:
      "Can a temporary email receive OTP codes? Learn when it works, when sites block it, and why it is a poor choice for important accounts.",
    readTime: "5 min read",
    quickAnswer:
      "Yes, a temporary inbox can receive one-time codes that are sent by email, as long as the website delivers to that address and does not block it. It cannot receive SMS codes, and it is not suitable for important accounts.",
    intro: [
      "People often search for this when a site asks for an email code just to confirm an address. A throwaway inbox looks like a quick answer, and sometimes it is.",
      "The details matter, though. Whether it works depends on the site, the domain the address uses, and what the account will be used for afterwards.",
    ],
    sections: [
      {
        heading: "How do email OTP codes reach a temporary inbox?",
        body: [
          "An email one-time password is an ordinary message. The website generates a short code, hands it to its email service, and that service delivers it over SMTP to the mail server behind the address you typed. A temporary inbox is just a mailbox that is open to receive.",
          "That means the technology is not the obstacle. If the site sends the message and the address accepts it, the code will appear in the inbox, usually within seconds to a couple of minutes.",
          "It also helps to separate the two things people mean by a code. A one-time code that only confirms an address is a low-stakes step, and a temporary inbox can reasonably handle it. A code that protects an account you care about is a different matter, because that code is the only thing standing between your account and a stranger.",
          "Keep that distinction in mind as you read on. The question is not only whether the technology works, but whether losing the inbox would cost you something.",
        ],
      },
      {
        heading: "When does it fail?",
        body: [
          "The most common failure is the website itself. Some services keep lists of known disposable-email domains and refuse them at the form, or accept the form and silently send nothing. Others delay messages long enough that the code expires before it arrives.",
          "Temporary addresses are also issued by third-party providers, so the available domains, delivery speed and how long messages are kept can change. A domain that worked last week may be blocked this week.",
        ],
      },
      {
        heading: "What a temporary inbox cannot do",
        body: ["It is worth knowing the hard limits before you rely on one."],
        bullets: [
          "It cannot receive SMS or phone call codes, only email.",
          "It is receive-only, so you cannot send or reply from it.",
          "It usually cannot be recovered after you lose the session, clear browser data or let it expire.",
          "It cannot help with a password reset later if the address is gone.",
          "It does not make an account anonymous, because the site still sees your device and connection.",
        ],
      },
      {
        heading: "Should you use one for an account that matters?",
        body: [
          "No. If you lose the inbox, you lose the ability to reset the password, receive security alerts or prove ownership. For banking, work, health, or anything tied to money or identity, use a permanent address that you control and protect it well.",
          "For two-factor authentication on important accounts, an authenticator app or a hardware security key is the better choice. Email codes, temporary or not, are only as safe as the mailbox they land in.",
        ],
      },
      {
        heading: "Checklist for using one responsibly",
        body: [
          "If the task is genuinely low risk and short term, these habits keep it tidy.",
        ],
        bullets: [
          "Confirm the service's terms allow the kind of sign-up you are doing and do not use it to dodge limits or trials.",
          "Keep the inbox tab open until the code arrives, since closing or clearing data can lose it.",
          "Copy the code as soon as it appears and use it before it expires.",
          "Do not reuse the address for anything you may need to recover later.",
          "Never put sensitive information into an account tied to a throwaway address.",
        ],
      },
      {
        heading: "Is it safe to use a temporary email for verification?",
        body: [
          "For a low-risk task, the main danger is not the inbox but what you do with it. Anything delivered there can be read by anyone who has the address, so never use it for codes that protect something valuable, and never forward or reuse it for private conversations.",
          "Be careful with links in the messages you receive. Check the destination before you continue, and be wary of any message that asks you to sign in somewhere new. A short-lived inbox does not make a phishing page any safer.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and wait for your temporary address to appear.",
        "Copy the address and enter it where the low-risk service asks for your email.",
        "Request the code and keep the Instant Mail page open while the inbox refreshes about every 8 seconds.",
        "Press Refresh if you want to check sooner, keeping in mind the 5 second cooldown.",
        "Open the message, read the code, and type it into the site before it expires.",
        "If the site rejects the address or never sends a code, stop and use a regular email instead.",
      ],
      note: "Reloading the page keeps the same inbox, but clearing site data, another device or a private window loses it.",
    },
    cta: {
      label: "Get a temporary address",
      href: "https://www.instantmail.online/en/",
    },
    takeaway:
      "A temporary email can receive email OTP codes when the site is willing to send to it, but it cannot receive SMS and should stay out of anything you may need to recover. For important accounts, use an authenticator app or security key.",
  },
  {
    slug: "email-otp-vs-sms-otp-vs-authenticator-app",
    title: "Email OTP vs SMS OTP vs Authenticator App",
    description:
      "Email OTP vs SMS OTP vs authenticator app: compare security, convenience and recovery so you can pick the right method for each account.",
    readTime: "5 min read",
    quickAnswer:
      "Authenticator apps are stronger than SMS and email codes, and hardware security keys are stronger still. Email and SMS codes are convenient, but they can be intercepted or redirected, so use them only when nothing better is offered.",
    intro: [
      "A one-time password proves you can receive something only you should have. The three common delivery methods differ a lot in how hard they are to steal and how painful they are to lose.",
      "Which one you choose should depend on what the account protects, not on which button is easiest to press during sign-up.",
    ],
    sections: [
      {
        heading: "How does each method work?",
        body: [
          "An email OTP is a code or link sent to your mailbox. An SMS OTP is a code sent as a text message to your phone number. An authenticator app generates codes on your device using a shared secret and the current time, so no message travels anywhere. These are usually time-based codes that change about every 30 seconds.",
          "The key difference is the path. Email and SMS codes travel across networks and through third parties. Authenticator codes are calculated locally, which removes the interception step.",
          "It also helps to separate two ideas that often get mixed up: verifying an address and securing an account. An email code that confirms you own an address at sign-up is a one-time check. A code that protects every future login is a security control, and it deserves a stronger method than whatever was easiest at registration.",
          "Switching methods later is usually possible in the account's security settings, so you do not have to get it perfect on day one. Just do not leave important accounts on the weakest option forever.",
        ],
      },
      {
        heading: "What are the weaknesses of email and SMS codes?",
        body: [
          "Email codes are only as secure as the mailbox. Anyone who gets into your email can read every code, and email is often the recovery route for your other accounts. SMS codes can be hit by SIM swap attacks, where a phone number is moved to a different SIM, and by interception of text messages.",
          "Both can also be phished. A convincing fake page can ask you to type the code you just received, then use it immediately on the real site.",
        ],
      },
      {
        heading: "Comparison at a glance",
        body: [
          "Here is how the methods differ on the points that matter in practice.",
        ],
        bullets: [
          "Email OTP: easy to set up and needs no extra app, but depends entirely on the security of your mailbox.",
          "SMS OTP: works on any phone, but is exposed to SIM swap and message interception.",
          "Authenticator app: codes are generated offline and resist interception, but you must back up or transfer it when you change phones.",
          "Security key: strongest against phishing because it checks the real site, but you need to carry and register a physical device, ideally two.",
          "Recovery: email and SMS are easy to recover through your provider, while apps and keys need backup codes or a second device.",
        ],
      },
      {
        heading: "Which should you choose?",
        body: [
          "For banking, primary email, work, cloud storage, and anything with money or identity attached, choose an authenticator app or a security key. For low-value accounts where only SMS or email is offered, those are better than nothing.",
          "Whatever you use, save the backup codes the service gives you and store them somewhere other than the phone that holds the authenticator.",
        ],
      },
      {
        heading: "Where do temporary inboxes fit in?",
        body: [
          "A temporary inbox can receive an email OTP for a throwaway sign-up, but it is not a second factor in any meaningful sense. If you lose it, you lose the account. Keep it for low-risk, short-term tasks and never attach it to an account you want to protect.",
        ],
      },
      {
        heading: "What should you do when a site only offers email or SMS?",
        body: [
          "Some services offer nothing stronger, and that is fine for low-value accounts. Use a long, unique password from a password manager so the code is a second layer rather than the only one, and keep the underlying mailbox or phone number well protected.",
          "If you can choose, pick the strongest option the site supports. Review the security settings once a year, since services often add authenticator or security key support later, and moving over takes only a few minutes.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Sign up for a low-risk service that sends an email code and paste the address in.",
        "Watch the inbox refresh about every 8 seconds, or press Refresh after its 5 second cooldown.",
        "Open the message and note how the code arrives as ordinary email text, which shows why it depends on the mailbox.",
        "Use the code, then consider which method that service offers for protecting the account properly.",
      ],
      note: "Instant Mail is receive-only and cannot receive SMS codes.",
    },
    cta: {
      label: "Try a temporary inbox",
      href: "https://www.instantmail.online/en/",
    },
    takeaway:
      "Use an authenticator app or a security key for anything important, and treat email or SMS codes as a fallback. The method that is easiest to receive is rarely the hardest to steal.",
  },
  {
    slug: "why-verification-links-expire",
    title: "Why Verification Links Expire",
    description:
      "Why verification links expire: learn the security reasons, how long they tend to last, and what to do when you open one too late.",
    readTime: "5 min read",
    quickAnswer:
      "Verification links expire to limit how long a stolen or forwarded link can be abused. They are time-limited and usually single-use, so opening one late or twice often fails.",
    intro: [
      "You click a confirmation link and see a message saying it is no longer valid. It can feel like the site is being difficult, but expiry is a deliberate safety feature.",
      "Understanding why it happens also helps you avoid it, because most expired links are a timing or ordering problem rather than a fault.",
    ],
    sections: [
      {
        heading: "What does an expiring link actually protect?",
        body: [
          "A verification link carries a secret token that proves you control the address. If that token stayed valid forever, anyone who ever saw the email could use it, including someone reading an old mailbox, a shared computer, or a forwarded message.",
          "Expiry shrinks that window. Even if the message leaks later, the link is already dead by the time anyone tries it.",
          "Another reason is plain housekeeping. A site that keeps thousands of unused tokens around forever has more to store, more to protect and more to leak. Short lifetimes keep that pile small and make a database leak far less useful to an attacker, since most of the tokens in it have already died.",
          "For you as a user, the practical result is simple. Treat a verification email as something to act on soon after it arrives, not something to file away for later. If you cannot finish right now, it is better to request a new link when you are ready.",
          "If you opened a link on a different device than the one you started on, the confirmation may still succeed, but you might need to sign in again afterward. That is normal behavior and not a sign that something went wrong, so check whether your account shows as verified before requesting another email.",
        ],
      },
      {
        heading: "How long do links stay valid?",
        body: [
          "It varies by site. Some links last a few minutes, some an hour, and some a day or more. Password reset links tend to be shorter than account confirmation links because they grant more power. A site's help page may state the time, and if it does not, assume it can be short.",
        ],
      },
      {
        heading: "Why a link can stop working even before the time is up",
        body: [
          "Time is only one reason. A link can also be invalidated by what you did afterwards.",
        ],
        bullets: [
          "It was already used once, since many links are single-use.",
          "You requested a newer link, which replaced the earlier one.",
          "An email scanner or security tool opened the link first and used it up.",
          "The link was cut in half by line wrapping when you copied it.",
          "You are signed in to a different account than the one the link belongs to.",
        ],
      },
      {
        heading: "What to do when a link has expired",
        body: ["Do not keep clicking the same link. Fix it in a clear order."],
        bullets: [
          "Go back to the site and request a fresh verification email once.",
          "Open only the newest message and ignore older ones.",
          "Click the link soon after it arrives, in the same browser where you started.",
          "If the link looks broken, copy the whole address into the browser bar instead of clicking.",
          "Use the code option instead if the site offers one.",
          "Contact support if several fresh links fail in a row.",
        ],
      },
      {
        heading: "A note about links in emails",
        body: [
          "Expiry also reduces phishing risk, but you should still look at where a link leads before opening it. Check that the address belongs to the service you are signing up for, and never enter a password on a page you reached from an unexpected message.",
        ],
      },
      {
        heading: "Does a short lifetime make a site less friendly?",
        body: [
          "It can feel that way, but the tradeoff favors you. A link that lasts a week is a link that can be stolen for a week. Most legitimate sites accept the minor annoyance of occasionally requesting a new email in exchange for a much smaller attack window.",
          "If you often miss the window, the fix is in your routine rather than the site. Request the email when you are ready to finish, keep the tab open, and click as soon as the message lands.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Request a verification email from a low-risk service using that address.",
        "Open the message when it arrives and find the verification link.",
        "Click the link. Instant Mail shows a warning with the destination URL and a Continue anyway or Cancel choice.",
        "Read the destination, and choose Continue anyway only if it matches the service.",
        "Complete the confirmation promptly, since the link may be time-limited.",
      ],
      note: "A temporary inbox is for legal, low-risk, short-term tasks only.",
    },
    cta: {
      label: "Open a temporary inbox",
      href: "https://www.instantmail.online/en/",
    },
    takeaway:
      "Links expire to keep a leaked email from becoming a permanent key. If one fails, request a single fresh link and use it right away.",
  },
  {
    slug: "why-verification-emails-are-delayed",
    title: "Why Verification Emails Are Delayed",
    description:
      "Why verification emails are delayed: the common causes from queues and greylisting to filtering, and what you can do while you wait.",
    readTime: "5 min read",
    quickAnswer:
      "Verification emails are delayed by sending queues, rate limits, greylisting, spam filtering, or slow handoff between mail servers. Most arrive within a few minutes, and repeated resends tend to make the wait longer.",
    intro: [
      "Email is not instant messaging. It is a relay system where each server takes a message and passes it along, and a hiccup anywhere along that chain adds time.",
      "Knowing where the delay can happen tells you whether to wait, resend, or look somewhere else.",
    ],
    sections: [
      {
        heading: "Where does the delay come from?",
        body: [
          "Start at the sender. The site may place your message in a queue behind other emails, especially during a busy period. The email service it uses may then batch or throttle messages. After that, the message is handed to the receiving mail server, which can slow it down for several reasons.",
          "Finally, the receiving provider decides where to put it. A message can be accepted and still land in spam or a filtered folder, which looks like a delay but is really a misplaced message.",
          "It is also worth remembering that you only see the final step. A message that left the website a second after you pressed the button may have waited in several queues before reaching your inbox, and none of those waits are visible to you. That is why the time shown in your mailbox can be later than the moment you requested the email.",
          "Time of day matters too. Busy periods, such as product launches or big sales, put heavy load on a site's sending system, and verification emails can get stuck in the same queues as marketing mail unless the site separates them.",
          "If you are on a mobile device, check that your mail app is actually syncing. Background sync can be paused by battery saver modes or poor connections, which makes a message look late when it has already been delivered. Open the app, pull to refresh, and look again before deciding the email never came.",
        ],
      },
      {
        heading: "What is greylisting?",
        body: [
          "Some mail servers use greylisting as an anti-spam measure. The first attempt from an unfamiliar sender is temporarily refused, and the sending server is expected to retry later. Legitimate servers do retry, but the retry interval can add several minutes.",
          "This is one reason a first message from a brand-new sender can take longer than later ones, and it is not something you can speed up.",
        ],
      },
      {
        heading: "What to do while you wait",
        body: [
          "A calm routine beats pressing the resend button over and over.",
        ],
        bullets: [
          "Wait at least three to five minutes before assuming something is wrong.",
          "Check the spam, junk and promotions folders in case the message arrived but was filed elsewhere.",
          "Make sure you typed the address correctly on the form.",
          "Request one new code only after waiting, and use the newest message when it arrives.",
          "Avoid sending several requests in a row, which can trigger rate limits that extend the delay.",
          "Try another approved sign-in option, such as a different verification method, if the site offers one.",
        ],
      },
      {
        heading: "Can a delay make the code useless?",
        body: [
          "Yes. If the site sets a short validity time and the message arrives late, the code may already be expired when you see it. In that case request a fresh one and use it quickly, rather than trying the old one repeatedly.",
          "If delays are constant for one site, the problem is likely on its side, for example a poorly set up sending domain. Site owners can check their email authentication records with the DNS checker.",
        ],
      },
      {
        heading: "Does a temporary inbox change the timing?",
        body: [
          "Delivery speed to a temporary address depends on the providers that issue it and can change. Instant Mail only shows what has actually been delivered, so if the sender has not delivered yet, nothing will appear no matter how often you refresh.",
        ],
      },
      {
        heading: "When is a delay a sign of a real problem?",
        body: [
          "Most waits end within a few minutes. If a message has not arrived after fifteen minutes or so, and it is not in any folder, the site probably did not send it or the address does not accept it. At that point waiting longer rarely helps.",
          "Check the address once more, request a single new message, and if that fails, contact support or try a different address you control. Keep a note of the times you tried, because support can use them to trace what happened.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Submit it to a low-risk service that sends a verification email.",
        "Leave the page open. The inbox refreshes about every 8 seconds without any action from you.",
        "Press the Refresh button if you want an immediate check, remembering the 5 second cooldown.",
        "If the message has not appeared after several minutes, treat it as a possible sender or block problem rather than clicking Refresh nonstop.",
      ],
      note: "New mail appears only after the sender delivers it to the address.",
    },
    cta: {
      label: "Watch an inbox refresh live",
      href: "https://www.instantmail.online/en/",
    },
    takeaway:
      "Delays usually come from queues, greylisting or filtering and resolve in minutes. Wait, check your folders, and resend once instead of repeatedly.",
  },
  {
    slug: "why-verification-code-says-invalid-or-expired",
    title: "Why a Verification Code Says Invalid or Expired",
    description:
      "Verification code invalid or expired? See the usual causes, from old codes and typos to clock problems, and how to fix them quickly.",
    readTime: "5 min read",
    quickAnswer:
      "A code usually fails because it expired, was replaced by a newer code, was already used, or was typed or copied wrongly. Request one fresh code, wait for it, and enter only that one.",
    intro: [
      "You have a six-digit code in front of you and the site refuses it. That is frustrating because the code looks right, but codes are strict about time and order.",
      "Most failures follow a handful of patterns, and each has a quick fix.",
    ],
    sections: [
      {
        heading: "What makes a code invalid?",
        body: [
          "A code is valid only for a short window and only for the request that created it. Sites often store just the most recent code, so asking for a second one invalidates the first. If your first email was delayed and the second arrived first, you may be holding the wrong one.",
          "Codes are also normally single-use. After a successful entry, or sometimes after a few failed attempts, the same code stops working.",
          "Time-based codes from an authenticator app work differently from codes sent by email. They are calculated from a secret and the current time and change about every 30 seconds, so the site and your phone must agree on the time. A code that is correct on your screen can still fail if you type it just as it rolls over to the next one.",
          "If a code fails right at the edge of the change, simply wait for the next one and enter it calmly. Rushing a fourth or fifth attempt is more likely to lock you out than to help.",
          "One more detail is worth checking: the screen. Some sites show the code field for a short time and then reset it, and some clear the box when you switch tabs. If the field looks empty or odd after you come back, reload the page and start the request again instead of entering a code into a stale form.",
        ],
      },
      {
        heading: "Common causes of invalid or expired codes",
        body: ["These explain most cases, so check them against what you did."],
        bullets: [
          "The code expired because the email was delayed or you waited too long to enter it.",
          "You requested several codes and are using an older one.",
          "A typo or look-alike character, such as the letter O for zero, slipped in.",
          "Copying added a space or hidden character before or after the code.",
          "You tried too many wrong attempts and the site locked the code.",
          "The code belongs to a different sign-in attempt, device or browser session.",
          "For time-based authenticator codes, your phone clock is out of sync.",
        ],
      },
      {
        heading: "How to fix it step by step",
        body: ["Follow these in order and stop when it works."],
        bullets: [
          "Stop entering the old code and close any extra sign-in tabs you opened.",
          "Request one new code from the site and wait for it before doing anything else.",
          "Open only the newest message and ignore older ones in your inbox.",
          "Type the code by hand if pasting seems to add extra characters.",
          "Enter it promptly, in the same browser and tab where you started.",
          "For authenticator codes, turn on automatic date and time on your phone and try the next code.",
          "Contact support if new codes keep failing, giving the time of your last attempt.",
        ],
      },
      {
        heading: "Is the code ever my fault, or the site's?",
        body: [
          "Both happen. Sites can have slow email delivery or bugs that issue duplicate codes. But the fixes are the same either way: one fresh code, newest message, entered quickly.",
          "If you are using a temporary address and codes keep failing, remember it may be blocked or limited by the site, and a regular address may be needed for that service.",
        ],
      },
      {
        heading: "How do you avoid the problem next time?",
        body: [
          "Prepare before you request the code. Open the inbox first, keep the sign-in page and the email side by side, and request the code only when you are ready to type it in. That removes most of the time pressure that causes expired codes.",
          "Also avoid requesting codes from several tabs or devices at once. Each request can replace the last, so you end up holding a code that belongs to a session you are no longer looking at.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Request a code from a low-risk service and wait for it in the inbox.",
        "Open the newest message, and compare its time with any older ones.",
        "Type the code carefully, checking for look-alike characters.",
        "If it fails, request one new code, press Refresh once after the 5 second cooldown, and open only the latest message.",
      ],
      note: "Use temporary addresses only for short-term, low-risk tasks.",
    },
    cta: {
      label: "Open a temporary inbox",
      href: "https://www.instantmail.online/en/",
    },
    takeaway:
      "An invalid code is almost always an old, replaced, expired or mistyped one. Request a single fresh code and use the newest message right away.",
  },
  {
    slug: "how-to-resend-a-verification-email-without-getting-blocked",
    title: "How to Resend a Verification Email Without Getting Blocked",
    description:
      "How to resend a verification email without getting blocked: when to wait, how often to retry, and what to do if the site locks you out.",
    readTime: "5 min read",
    quickAnswer:
      "Wait a few minutes, check spam and the address, then use the site's resend button once. Repeated rapid requests can hit rate limits that pause sending or lock the account for a while.",
    intro: [
      "When an email does not arrive, the natural reaction is to press resend again and again. That instinct is exactly what many sites treat as suspicious behaviour.",
      "A slower, more deliberate approach is both safer for your account and more likely to work.",
    ],
    sections: [
      {
        heading: "Why do sites limit resend requests?",
        body: [
          "Verification emails are a common target for abuse. Someone can submit another person's address over and over to flood their inbox, or try to guess codes. To stop that, sites apply rate limits, cooldown timers and temporary locks.",
          "These limits protect real users, but they can catch you too if you click resend quickly. Limits vary by site, and some reset after minutes while others last longer.",
          "It also helps to know what the site sees. Each resend is logged against your address, your device and your connection. A handful of requests spread over several minutes looks like a person who lost an email. Twenty requests in a minute looks like a script, and the response to a script is a block.",
          "That is why spacing your attempts matters more than the exact number of them. Two well-spaced requests are safer than five rushed ones, and they give the first message a fair chance to arrive.",
          "A good rule of thumb is to treat each resend as a small cost. If the first message did not arrive, something specific is usually wrong, such as a typo or a blocked address, and sending the same request again will not fix that. Find the cause first, then resend once with the problem solved.",
        ],
      },
      {
        heading: "A safe resend routine",
        body: [
          "Use this order so each attempt has the best chance of working.",
        ],
        bullets: [
          "Check the address on the form for typos before you request anything again.",
          "Wait at least three to five minutes after the first request, since delays are common.",
          "Search spam, junk, promotions and the whole mailbox for the site's name.",
          "Press the resend button once, and respect any countdown the site shows.",
          "Wait again before a second attempt, giving the message time to arrive.",
          "Use only the newest email, because older codes and links are often invalidated.",
          "Stop after two or three tries and contact support instead of continuing.",
        ],
      },
      {
        heading: "What if you are already blocked?",
        body: [
          "If the site says you have tried too many times, do not look for tricks to get around it. Wait for the stated time, and then try once more. Switching rapidly between addresses or devices can look like abuse and extend the lock.",
          "If the block does not clear, support teams can usually verify you another way. Give them the address, the approximate time and what you saw.",
        ],
      },
      {
        heading: "Mistakes that cause blocks",
        body: [
          "The common ones are clicking resend repeatedly, submitting the form many times in separate tabs, using different addresses in a row, and entering wrong codes many times. Each adds to the counter the site is watching.",
          "Another subtle one is using an address the site refuses, such as a disposable domain. Resending to a blocked address will never work, so change the address rather than the number of tries.",
        ],
      },
      {
        heading: "What should you tell support when nothing works?",
        body: [
          "A clear message gets a faster answer. Include the address you used, the time of each attempt, the exact error text, and the steps you already tried. Skip long explanations and never send a code or a password in the message.",
          "If the site offers another way to confirm your account, such as a different contact method or an identity check, use it instead of pushing the resend button again. That route is slower but it does not put your account at risk of a longer lock.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy your temporary address.",
        "Use it to request a verification email from a low-risk service.",
        "Watch the inbox, which refreshes about every 8 seconds, for several minutes before doing anything else.",
        "If nothing has arrived, press Refresh once after its 5 second cooldown to confirm.",
        "Resend once from the website, then wait again and open only the newest message.",
        "If it still does not arrive, use a regular address rather than trying again and again.",
      ],
      note: "Do not use a temporary inbox to get around a platform's limits or rules.",
    },
    cta: {
      label: "Open a temporary inbox",
      href: "https://www.instantmail.online/en/",
    },
    takeaway:
      "Patience is the trick. Fix the address, wait, resend once, and use the newest message, so the rate limit never has a reason to trip.",
  },
  {
    slug: "what-to-do-if-you-get-a-verification-code-you-did-not-request",
    title: "What to Do If You Get a Verification Code You Did Not Request",
    description:
      "Got a verification code you did not request? Learn what it means, whether to worry, and exactly how to protect your accounts.",
    readTime: "5 min read",
    quickAnswer:
      "Do not share or enter the code. An unrequested code often means someone typed your address or phone number by mistake, or is trying to get into your account. Secure the account and change your password if you are unsure.",
    intro: [
      "An unexpected code can come from several places, and most are harmless. Still, it can also be the first sign that someone is trying to sign in as you.",
      "The right response depends on one question: does a real account of yours exist at that service?",
    ],
    sections: [
      {
        heading: "Why did I get a code I did not ask for?",
        body: [
          "The most innocent cause is a typo, where another person entered your address when signing up. Another is someone deliberately testing your address, either to flood you with messages or to try to take over an existing account.",
          "If an attacker already has your password, the code is the last step they need. That is why a surprise code at an account you actually use deserves attention.",
          "One more possibility is that someone is using your address to sign up for something, for example by typing it into a form without your permission. In that case the code is a side effect, and ignoring it is usually enough, because the sign-up cannot be completed without the code.",
          "The case to take seriously is a code for an account you already own. That means somebody reached the sign-in step, and the only thing missing was the second factor. Treat that as a real warning even if nothing else looks wrong yet.",
          "It also helps to keep a short record. Note the service, the time and whether the message had links, then check the account's sign-in history later in the day. If more codes appear or the account shows logins you do not recognize, escalate by changing credentials and contacting the service through its official support page.",
        ],
      },
      {
        heading: "Immediate steps to take",
        body: ["Work through these quickly and calmly."],
        bullets: [
          "Do not enter the code anywhere and never read it out to anyone, including someone who claims to be support.",
          "Check that the sender and the service are ones you actually use, and do not click links in the message.",
          "Go directly to the service by typing its address yourself and look at recent sign-in activity.",
          "Change your password for that service and any other account that reuses it.",
          "Sign out of all other sessions if the service offers that option.",
          "Turn on stronger two-factor authentication, preferably an authenticator app or a security key.",
          "Secure your email account too, since it is the route to resetting your other passwords.",
        ],
      },
      {
        heading: "How to tell a scam from a real code",
        body: [
          "Scammers sometimes trigger a real code to your phone or email and then contact you, claiming it was sent by mistake and asking you to read it back. The code is real, and giving it away hands over access.",
          "A genuine service never needs you to tell the code to a person. If anyone asks for it by phone, text or chat, stop, and treat it as an attack.",
        ],
      },
      {
        heading: "When can you safely ignore it?",
        body: [
          "If you have no account at that service and the message is a plain code with no links, it is probably a typo by someone else, and you can delete it. A few such messages are not a sign of compromise.",
          "A steady stream, or codes for services you do use, is different. Treat that as an active attempt, tighten your security, and consider checking whether your email has appeared in a known breach.",
        ],
      },
      {
        heading: "How can you reduce unwanted codes in the future?",
        body: [
          "You cannot stop other people from typing your address, but you can limit the damage. Use unique passwords, turn on an authenticator app wherever possible, and keep your recovery options current so a real takeover is easy to undo.",
          "For sign-ups you do not trust, consider a separate address kept apart from your main one. That way, unexpected messages tell you something about where your address leaked, and your primary inbox stays quiet and easier to monitor.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail to see how a typical code email arrives in an inbox.",
        "Use a temporary address only for low-risk sign-ups, so your real address is not exposed on forms you do not trust.",
        "When a message arrives, open it and check the sender and subject before trusting anything in it.",
        "If it contains a link, click it and read the destination URL in the warning before choosing Continue anyway or Cancel.",
        "Choose Cancel if the destination is not the service you expect.",
      ],
      note: "A temporary inbox is not a safe place for accounts you must protect or recover.",
    },
    cta: {
      label: "Open a temporary inbox",
      href: "https://www.instantmail.online/en/",
    },
    takeaway:
      "Never share an unrequested code. Check the account directly, change the password, and move to an authenticator app or security key if the attempts look real.",
  },
  {
    slug: "magic-link-vs-one-time-code-login",
    title: "Magic Link vs One-Time Code Login",
    description:
      "Magic link vs one-time code login: how each works, their security trade-offs, and which is easier to use on a phone or a shared computer.",
    readTime: "5 min read",
    quickAnswer:
      "A magic link signs you in with one click from an email, while a one-time code asks you to type digits back into the site. Codes work better across devices, and links are quicker on the device where you read the email.",
    intro: [
      "Passwordless login has made two methods common: the magic link and the one-time code. Both prove you control an email address, and both depend on the security of that mailbox.",
      "The difference shows up in everyday use, especially when you read email on one device and sign in on another.",
    ],
    sections: [
      {
        heading: "How does each method work?",
        body: [
          "With a magic link, the site emails a long, unique link. Opening it in a browser confirms the token and signs you in. With a one-time code, the site emails a short number and you type it into the page you started from.",
          "Both rely on a secret that is valid for a short time, often once only. Both fail if the email is slow, and both are only as secure as the account that receives them.",
          "There is a third thing worth knowing: both methods move the weak point from your password to your mailbox. That is not necessarily worse, since passwords are often reused or guessed, but it changes where you need to focus. A passwordless setup is only as strong as the protection on the email account that receives the messages.",
          "This is why the best setup pairs a convenient sign-in method with a well-protected mailbox, using strong two-factor authentication on the email account itself.",
          "Some sites let you pick between the two at login, and some choose for you. If you have a choice, think about the device in your hand right now. A phone that holds both the mailbox and the browser favors links, while a work laptop paired with a phone inbox favors codes.",
        ],
      },
      {
        heading: "Magic link strengths and weaknesses",
        body: ["Links are fast, but they bring a few quirks."],
        bullets: [
          "One tap on the same device completes the login with no typing.",
          "Opening the link on a different device can sign in the wrong browser instead of the one you started on.",
          "Email security scanners can pre-open links and use them up.",
          "Links are long, so copying them by hand can break them.",
          "Phishing emails also use links, so users must check the destination.",
        ],
      },
      {
        heading: "One-time code strengths and weaknesses",
        body: [
          "Codes are device-neutral. You can read the email on your phone and type the digits into a laptop. They are not affected by scanners, and there is no link to spoof.",
          "On the downside, they require typing and a quick eye, and they expire quickly. They can also be phished if a fake page asks you to enter the code, so never type one into a page you reached from a message.",
        ],
      },
      {
        heading: "Which is better for you?",
        body: [
          "Choose by how you sign in. If you read mail on the same device, a magic link is smooth. If you move between devices, or use a shared or work computer, a code is safer and less confusing.",
          "For important accounts, neither is the strongest option. Pair passwordless login with an authenticator app or security key, and protect the mailbox that receives the messages with its own strong two-factor setup.",
        ],
      },
      {
        heading: "What mistakes should you avoid with passwordless login?",
        body: [
          "The biggest mistake is clicking a login link you did not ask for. If an email arrives out of the blue, do not open it, and sign in from the site directly instead. The second is using a shared computer without signing out afterward.",
          "Also avoid forwarding a login email to anyone, since the link or code inside works like a key. If you need help, share a screenshot with the secret part hidden, not the email itself.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Choose a low-risk service that offers passwordless login and request a sign-in email.",
        "Wait for the message in the inbox, which refreshes about every 8 seconds.",
        "Open it and look for a magic link or a code.",
        "If there is a link, click it and read the destination URL in Instant Mail's warning before choosing Continue anyway.",
        "If there is a code, type it into the page where you started.",
      ],
      note: "Do not use a temporary address for login to an account you need to keep.",
    },
    cta: {
      label: "Open a temporary inbox",
      href: "https://www.instantmail.online/en/",
    },
    takeaway:
      "Links are convenient on one device, and codes are more reliable across devices. Either way, the mailbox is the key, so protect it.",
  },
  {
    slug: "email-verification-vs-phone-verification",
    title: "Email Verification vs Phone Verification",
    description:
      "Email verification vs phone verification: compare privacy, security and recovery, and learn when each method is the right choice.",
    readTime: "5 min read",
    quickAnswer:
      "Email verification confirms you control a mailbox, and phone verification confirms you control a number. Email is more private and easier to replace, while phone is harder to create in bulk but more exposed to SIM swaps and number reuse.",
    intro: [
      "Sites ask for one or both to confirm you are a real person and to give you a way back into your account. The choice affects your privacy, your security and how easily you can recover access.",
      "Neither is universally better. Each trades convenience against risk in a different way.",
    ],
    sections: [
      {
        heading: "What does each verification prove?",
        body: [
          "Email verification proves that someone with access to that mailbox clicked a link or entered a code. Phone verification proves control of a phone number through an SMS or call. Neither proves who you are in a legal sense.",
          "Sites use phone numbers because they are slightly harder to create in bulk, which helps against fake accounts. Email is used because it is free, universal and easy to automate.",
          "There is also a practical difference in how easy each is to lose. If you change phone numbers, accounts tied to the old number can become hard to reach, and a number you stop paying for may be reassigned to someone else. A mailbox usually survives moves, new devices and new carriers without changing.",
          "On the other hand, email addresses from free temporary or employer-controlled services can disappear when you leave the service. Whichever you pick, make sure you will still control it in a year.",
          "Finally, remember that some services ask for both at once. In that case, they are usually aiming for two things: proof that you are a real person and a backup way to reach you. Think about whether the service has earned that level of trust before you hand over both.",
        ],
      },
      {
        heading: "Privacy and risk compared",
        body: [
          "The main differences come down to exposure and recoverability.",
        ],
        bullets: [
          "Email is easier to keep separate from your identity, since you can use different addresses for different purposes.",
          "A phone number is usually tied to your name, billing and contacts, so sharing it carries more privacy cost.",
          "SMS can be hit by SIM swap attacks and interception, a risk email does not have in the same form.",
          "Phone numbers are sometimes recycled, so a new owner may later receive codes meant for you.",
          "Email accounts can be breached, which exposes every code sent to them.",
        ],
      },
      {
        heading: "Which should you use?",
        body: [
          "Use a dedicated email address for general sign-ups, and give a phone number only to services that need it and that you trust. For accounts holding money, identity or work, avoid relying on either one alone.",
          "Add an authenticator app or security key where supported, because they do not depend on a mailbox or a phone number.",
        ],
      },
      {
        heading: "Can a temporary email replace phone verification?",
        body: [
          "No. A temporary inbox receives email only, so it cannot receive SMS or call codes. It can help with email-only verification on a low-risk sign-up, if the site accepts the address.",
          "Do not try to use it, or any other trick, to get around a site's phone requirement or its rules. If a site asks for a phone number, the honest options are to provide one or to skip that service.",
        ],
      },
      {
        heading: "Choosing what to share, step by step",
        body: ["A short routine helps you decide at the sign-up form."],
        bullets: [
          "Ask whether you will need to recover this account later.",
          "If yes, use a permanent email address you control and protect.",
          "If no, and the task is low risk and short term, a temporary address may be enough.",
          "Share your phone number only when the service genuinely needs it.",
          "Enable an authenticator app instead of SMS when you have the option.",
        ],
      },
      {
        heading: "What about privacy and data exposure?",
        body: [
          "Giving a phone number to a service can connect your accounts across the web, because the number is a stable identifier that rarely changes. If the service is breached, the number can be used for spam calls and targeted scams.",
          "An email address can leak too, but you can replace it more easily and use different ones for different purposes. That flexibility is the main privacy advantage of email verification, and it is worth using when a service does not truly need your number.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Pick a low-risk service that verifies by email only and enter the address.",
        "Wait for the verification email, watching the inbox refresh about every 8 seconds.",
        "Open the message and complete the verification with the code or link.",
        "Notice that nothing arrives by SMS, because Instant Mail handles email only and is receive-only.",
      ],
      note: "Use temporary email for legal, low-risk, short-term tasks only.",
    },
    cta: {
      label: "Open a temporary inbox",
      href: "https://www.instantmail.online/en/",
    },
    takeaway:
      "Email is better for privacy and replaceability, and a phone number adds friction for fake accounts but more risk for you. For anything important, add an authenticator app or security key.",
  },
];
