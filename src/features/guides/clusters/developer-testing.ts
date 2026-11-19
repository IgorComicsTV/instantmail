import type { ClusterGuideInput } from "../clusterTypes";

const TEMP = "https://www.instantmail.online/en/";
const DNS = "https://www.instantmail.online/tools/email-dns-checker";

export const developerTestingGuides: ClusterGuideInput[] = [
  {
    slug: "how-to-test-signup-emails",
    title: "How to Test Signup Emails",
    description:
      "How to test signup emails end to end: check delivery, content, links, expiry and edge cases using a throwaway inbox and test data in staging.",
    readTime: "5 min read",
    quickAnswer:
      "Register in your staging app with a fresh test address, wait for the welcome or confirmation message, then check the sender, subject, body, link target and expiry. Repeat with edge cases such as a duplicate signup, a typo in the address and an expired link.",
    intro: [
      "A signup email is often the first thing a new user sees from your product, and it is also the step that blocks them from using it. If the message arrives late, looks broken or carries a dead link, the funnel stops there.",
      "Manual testing still catches problems that unit tests miss, because you see the message the way a recipient does: rendered, in an inbox, with a real link to click.",
    ],
    sections: [
      {
        heading: "What should a signup email test cover?",
        body: [
          "Treat the signup email as a small system with several moving parts: the trigger in your app, the queue or provider that sends it, the template, and the link that comes back to your site. A good test touches each part.",
          "Delivery matters first. Did the message arrive, how long did it take, and did it come from the sender name and address you configured? Then check content: subject line, preheader, greeting, brand details and any personalization fields that might render as empty or raw template syntax.",
          "Do not forget accessibility and clarity. A signup email should make the next step obvious in one glance: a single clear button, a readable text link underneath it, and no wall of marketing copy that hides the action the user came for.",
          "If your product sends different welcome messages by plan or region, run the flow once for each variant. Conditional templates are where blank fields and wrong links tend to hide.",
        ],
      },
      {
        heading: "Step-by-step: test a signup email in staging",
        body: ["Use this sequence each time you change the signup flow or its template."],
        bullets: [
          "Point your test at a staging or development environment, never at production with real customer data.",
          "Create a brand new test address for each run so old messages do not hide a missing new one.",
          "Submit the signup form with realistic but fake data, and note the exact time you clicked the button.",
          "Watch the inbox and record how long the message takes to arrive, since slow delivery frustrates users even when it works.",
          "Open the message and check the sender, subject, greeting and every placeholder for missing or raw values.",
          "Click the confirmation link and confirm it lands on the right staging page and completes the signup.",
          "Click the same link a second time and confirm your app handles a used link with a clear message.",
          "Sign up again with the same address and confirm you get the behavior you designed, such as an error or a fresh message.",
        ],
      },
      {
        heading: "Which edge cases break signup emails most often?",
        body: [
          "Happy paths pass in almost every build. The bugs hide in the edges: an address with a plus sign, uppercase letters, a very long local part, or a domain that your validation rejects by mistake.",
          "Also test what happens when the user waits too long. Expired links should explain what happened and offer a way to request a new one, not show a blank error page.",
          "Finally, check the plain text version if your template ships one. Some clients show only that part, and it often falls out of sync with the HTML version.",
        ],
      },
      {
        heading: "Staging safety rules for signup tests",
        body: [
          "Never send test mail to real customers. Seed staging with fake users, and make sure your staging environment cannot email addresses imported from production data.",
          "Avoid production credentials in staging config. Use a separate sending account or a sandbox mode with your email provider so a bad test cannot touch your real sender reputation.",
          "If a test message ever looks like it left staging, check your sender domain records too. The DNS checker can confirm that MX, SPF and DMARC exist for the domain you send from.",
        ],
      },
      {
        heading: "How do you record and repeat signup tests?",
        body: [
          "Write the scenarios down once and reuse them. A short table with the input, the expected email and the expected result lets any teammate repeat the run and compare notes. When a bug is found, add its exact input to the table so it becomes a permanent regression case.",
          "Capture evidence as you go. A screenshot of the opened message and the link destination makes a bug report far easier to act on than a description from memory.",
          "Keep timing notes too. If delivery was three seconds last week and forty seconds today, that change is a finding even when everything else passes.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address it creates for you. No sign-up is needed.",
        "Paste that address into your staging signup form and submit it.",
        "Leave the Instant Mail tab open. The inbox refreshes about every 8 seconds, or you can press Refresh after its 5 second cooldown.",
        "When the message appears, open it and check the sender, subject and body.",
        "Click the confirmation link. Instant Mail shows the destination URL first, so you can confirm it points at your staging host, then choose Continue anyway.",
        "Press the new address action to get a fresh inbox and repeat the test for a second run.",
      ],
      note: "Instant Mail is receive-only, so it cannot send mail. Some sites block known disposable domains, and delivery speed depends on the provider.",
    },
    cta: { label: "Open a temporary inbox", href: TEMP },
    takeaway:
      "Test the signup email like a user would: fresh address, real click, and a few awkward edge cases. Keep it in staging with fake data.",
  },
  {
    slug: "how-to-test-password-reset-emails",
    title: "How to Test Password Reset Emails",
    description:
      "How to test password reset emails safely: token expiry, one-time use, wrong-account cases and message content, with a repeatable manual checklist.",
    readTime: "5 min read",
    quickAnswer:
      "Request a reset for a test account, open the email, use the link once, then try it again after it has been used and after it should have expired. Confirm the new password works and the old one does not.",
    intro: [
      "Password reset is a security feature wrapped in an email. It has to be easy for the owner and useless for anyone else, which makes the testing list longer than most people expect.",
      "The email itself is only half of it. You are also checking how your app creates, stores, expires and invalidates the token behind the link.",
    ],
    sections: [
      {
        heading: "What makes a password reset flow correct?",
        body: [
          "A reset link should be tied to one account, usable one time, and valid for a limited window that your team has decided on. Anything else is a bug, or a security gap.",
          "Your product should also avoid revealing whether an address has an account. Many teams show the same neutral message either way, so test both a known and an unknown address and compare the responses.",
          "Remember the support angle. Most reset problems reach you as a user saying the link does not work. Reproducing each failure type in staging, expired, used, altered and wrong host, lets you recognize the report quickly and answer it with confidence.",
          "Also test the reset page itself on mobile, with a password manager and with a paste into the field. Rules that reject valid passwords, or hide error text, turn a working email into a failed reset.",
        ],
      },
      {
        heading: "Step-by-step: test a password reset",
        body: ["Run this list against staging with a dedicated test user."],
        bullets: [
          "Create a test account in staging using a fresh test address, and confirm you can log in with the original password.",
          "Request a reset and note the time, then confirm the message arrives within the delay you consider acceptable.",
          "Check the subject, sender and body, and confirm the text explains what to do if the reader did not request the reset.",
          "Click the link and confirm it opens the correct staging reset page, not production and not a placeholder host.",
          "Set a new password that meets your rules, then confirm you can log in with it and cannot log in with the old one.",
          "Reuse the same link and confirm it is rejected with a clear message.",
          "Request two resets in a row and confirm your app behaves as designed, either invalidating the first link or accepting both.",
          "Request a reset for an address with no account and confirm the response does not leak that fact.",
        ],
      },
      {
        heading: "How do you test token expiry without waiting?",
        body: [
          "Waiting an hour for every run is painful. Lower the token lifetime in your staging configuration to a minute or two, run the test, and then restore the real value. If your team has a way to set an expiry timestamp directly in the staging database, that works too.",
          "Remember to test the boundary. A link that works at the last second and fails one second later is the behavior you want to verify, not just a link that is clearly old.",
        ],
      },
      {
        heading: "Common reset mistakes to look for",
        body: [
          "Look for links that survive a successful reset, tokens that appear in server logs or analytics, and reset pages that load third-party scripts which can leak the URL through referrer headers.",
          "Also check that other sessions are handled the way you intend after a password change. Some products sign out every device, others do not, and the point is that it is a deliberate choice.",
          "If reset emails never arrive in staging, verify the sending domain has MX, SPF and DMARC records before you blame your code.",
        ],
      },
      {
        heading: "What security checks belong in a reset test?",
        body: [
          "Beyond the happy path, test that the link cannot be guessed or reused, that it does not work for a different account, and that your reset page does not show the address or any account detail to someone who only holds the link.",
          "Check what the email says to someone who did not ask for it. A clear line that they can ignore the message, and that their password has not changed, reduces support tickets and panic.",
          "Do not paste live reset links into shared chats or tickets, even from staging. Treat them like passwords while they are valid.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy your temporary address.",
        "Register a staging test account with that address, then log out.",
        "Use the forgot password form with the same address.",
        "Wait for the message to appear in the inbox, which refreshes about every 8 seconds, and open it.",
        "Click the reset link and read the destination warning, then choose Continue anyway if the URL is your staging host.",
        "Set a new password. Instant Mail only receives mail, so it cannot reply or send a second message for you.",
      ],
      note: "Use this only for test accounts. Never use a temporary inbox for an account you must be able to recover later.",
    },
    cta: { label: "Open a temporary inbox", href: TEMP },
    takeaway:
      "A password reset test is about the token as much as the email: one use, limited life, no leaks. Check both the message and the rules behind it.",
  },
  {
    slug: "how-to-test-transactional-emails-in-staging",
    title: "How to Test Transactional Emails in Staging",
    description:
      "A practical way to test transactional emails in staging: safe recipients, realistic data, template checks and a clean separation from production sending.",
    readTime: "5 min read",
    quickAnswer:
      "Send every transactional template from staging to test inboxes you control, using fake customer data and a sending setup that cannot reach real customers. Then review delivery, content, links and failure behavior for each message type.",
    intro: [
      "Transactional emails such as receipts, shipping notices and account alerts are triggered by what users do, so they are easy to forget until something breaks in production. A wrong amount or a missing name in a receipt costs trust quickly.",
      "Staging is the right place to find those problems, but only if staging is set up so a test can never email a real person.",
    ],
    sections: [
      {
        heading: "How do you keep staging email safe?",
        body: [
          "The first rule is isolation. Staging should use its own sending credentials or a sandbox mode, not your production keys, so a mistake cannot affect your real sender reputation.",
          "The second rule is a recipient guard. Many teams add a rule that rewrites or blocks any outgoing address that is not on an approved test list. If your staging database was copied from production, scrub the email column first.",
          "Think about volume as well. A template that works for one item may break for fifty, with long tables, cut-off totals or a subject that overflows. Test an order with many lines and one with a single item.",
          "If a message includes an attachment such as an invoice or a ticket, open the file itself. A correct email with a corrupt or empty attachment is still a failed delivery from the user's point of view.",
        ],
      },
      {
        heading: "Step-by-step: review each transactional message",
        body: ["Go template by template and record the result so the next release can be compared."],
        bullets: [
          "List every transactional email your product can send, including the rare ones like failed payment and account closure.",
          "Create test users with fake names, fake addresses and obviously fake order data.",
          "Trigger each message through the real app flow rather than a template preview, so the data pipeline is tested too.",
          "Check that amounts, dates, currency, names and order numbers match the data you entered.",
          "Click every link and button and confirm each goes to the intended staging page.",
          "Open the message on a narrow viewport as well as a wide one and look for broken layout.",
          "Check the footer for the sender identity and a working way to manage preferences where your messages require it.",
          "Trigger a failure, such as an invalid address, and confirm your app logs it and does not retry forever.",
        ],
      },
      {
        heading: "Preview tools versus real delivery",
        body: [
          "Template previews are fast and good for layout, but they skip the real path: queue, provider, authentication and inbox rendering. A message that looks perfect in a preview can still be missing from an inbox.",
          "Do both. Use previews while editing and a real inbox for a final pass before release.",
        ],
      },
      {
        heading: "When messages do not arrive",
        body: [
          "If a staging message never shows up, work from the outside in. Confirm the app attempted a send, confirm the provider accepted it, then look at the receiving side.",
          "Domain setup is a common cause. Run the sending domain through the DNS checker to see whether MX, SPF and DMARC records are found, and add the DKIM selector if you know it. The tool only reads DNS, so it will not tell you about blocklists or send a test.",
        ],
      },
      {
        heading: "How do you track coverage across message types?",
        body: [
          "Keep a simple inventory with one row per message: trigger, recipient, key fields and last test date. Gaps show up immediately, and it is often the rarest messages that have never been sent in staging at all.",
          "Review the inventory whenever a feature ships. A new payment method, plan or notification setting usually adds or changes a message, and nobody remembers to test it unless the list reminds them.",
          "Pay attention to localization if you support more than one language. Date formats, currency symbols and long translated strings are common sources of broken layouts.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Use it as the customer email on a staging test user.",
        "Trigger a transactional event in staging, such as placing a test order.",
        "Wait for the message to arrive. The inbox refreshes about every 8 seconds.",
        "Open it and compare the amount, name and links against the test data you entered.",
        "If the message includes an attachment such as an invoice, use the Download button and open the file to check it.",
      ],
      note: "Delivery speed and how long messages are kept depend on the providers behind the address and can change.",
    },
    cta: { label: "Check your sending domain DNS", href: DNS },
    takeaway:
      "Transactional testing is about realistic data and safe recipients. Send through the real flow, check every field, and keep staging away from production senders.",
  },
  {
    slug: "email-testing-checklist-for-developers",
    title: "Email Testing Checklist for Developers",
    description:
      "An email testing checklist for developers covering delivery, content, links, authentication, edge cases and staging safety before you ship.",
    readTime: "5 min read",
    quickAnswer:
      "Before shipping an email feature, check delivery and timing, sender identity, content and links, rendering, authentication records, edge cases and staging safety. A short written checklist run on every release catches most email bugs.",
    intro: [
      "Email bugs rarely crash anything. They fail quietly: a link points at the wrong host, a name field is empty, a message lands late or not at all. Nobody files a ticket, they just leave.",
      "A repeatable checklist turns that vague worry into a five minute routine. Use the one below as a starting point and adapt it to your product.",
    ],
    sections: [
      {
        heading: "The pre-release email checklist",
        body: ["Run this list in staging for each email your change touches."],
        bullets: [
          "Confirm the environment is staging or development, with test credentials and fake users only.",
          "Trigger the email through the real app action and note how long delivery takes.",
          "Verify the sender name, sender address and reply behavior match what you intended.",
          "Read the subject and body for typos, missing placeholders and wrong personalization.",
          "Click every link and button and confirm each destination, including unsubscribe or preference links where relevant.",
          "Check rendering on a narrow screen and look at the plain text version if you send one.",
          "Test expiry, reuse and duplicate-request behavior for any message that carries a token.",
          "Confirm the sending domain has MX, SPF and DMARC records and, if you use one, a DKIM record.",
        ],
      },
      {
        heading: "Which authentication records should you verify?",
        body: [
          "Mailbox providers look at your domain's DNS to decide how much to trust a message. SPF lists which servers may send for the domain, DKIM publishes a key that lets receivers verify a signature, and DMARC tells receivers what to do when checks fail.",
          "You can look up MX, SPF, DMARC and a named DKIM selector with the DNS checker. Keep its limits in mind: it reads records, it does not send mail, count SPF lookups or read DMARC reports.",
          "Share the checklist with everyone who touches email, not only developers. Designers, support staff and product owners all see different failures, and a shared list gets them looking for the same things.",
          "Keep it short enough to run. A checklist of forty items gets skipped, while one of ten that people actually use gives better protection. Split a long list into a quick pass for every release and a deeper pass for big changes.",
        ],
      },
      {
        heading: "What belongs in the edge case pass?",
        body: [
          "Try the inputs real users produce: long names, accented characters, plus-addressed emails, uppercase addresses and empty optional fields. Each can break a template or a validation rule.",
          "Test timing as well. Open a link after it should have expired, click it twice, and request the message again quickly. Those are the moments when users get stuck.",
        ],
      },
      {
        heading: "How do you keep the checklist useful?",
        body: [
          "Store the checklist next to the code, and update it every time a bug slips through. A checklist that grows from real incidents stays honest.",
          "Record the result of each run in the pull request. A one line note saying what you tested and in which environment saves the next reviewer a lot of guessing.",
          "Finally, keep test mail away from real people. Use fake data, a recipient guard and non-production credentials every time.",
        ],
      },
      {
        heading: "What should you automate and what should you check by hand?",
        body: [
          "Automate what is stable: template rendering with sample data, link generation and token logic belong in your test suite. Those checks are fast and catch regressions on every commit.",
          "Keep a human pass for what only an inbox shows: how the message looks, how quickly it lands, and how the link behaves when you actually click it. A few minutes of manual checking before release complements the automated tests rather than replacing them.",
          "Note that a temporary inbox such as Instant Mail suits only the manual side, since it has no API.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Use it as the recipient in a staging flow that sends the email you are testing.",
        "Wait for the message in the inbox, which refreshes about every 8 seconds.",
        "Open it and run through the sender, subject, body and link items on the checklist.",
        "Click a link and note the destination URL shown in the warning before you continue.",
        "Press the new address action for a clean inbox before the next test case.",
      ],
      note: "Instant Mail only receives mail. It has no API, so these steps are manual checks.",
    },
    cta: { label: "Check your domain DNS records", href: DNS },
    takeaway:
      "A short, written checklist beats memory. Run it in staging on every release and add a line each time a bug gets through.",
  },
  {
    slug: "disposable-email-for-qa-testing",
    title: "Disposable Email for QA Testing",
    description:
      "How QA testers can use a disposable email address to check signup and notification flows in their own apps, plus its limits and safe-use rules.",
    readTime: "5 min read",
    quickAnswer:
      "A disposable inbox gives QA a clean recipient address in seconds, which suits manual checks of signup, verification and notification emails in your own staging app. It is not suited to automation, long-lived test accounts or anything you need to recover.",
    intro: [
      "Testers often burn time on mailbox logistics: creating accounts, sharing a team inbox, clearing old messages that confuse the next run. A disposable address removes much of that friction for manual testing.",
      "It also has real limits, and knowing them keeps you from building a process on the wrong tool.",
    ],
    sections: [
      {
        heading: "When does a disposable inbox help QA?",
        body: [
          "It works well for one-off manual checks: does the welcome email arrive, does the link open, does the subject read correctly. Each run gets a fresh address, so there is no leftover mail to mistake for a new message.",
          "It also helps when a tester needs several distinct users quickly, since each new address behaves like a separate recipient.",
          "Document the limits for your team so nobody is surprised. Write down that a temporary inbox is tied to one browser, that closing or clearing it loses the mail, and that it will not work for any flow that needs recovery or a long-lived account.",
          "Where you need a repeatable, automated approach, choose a tool built for that purpose. A throwaway inbox is a convenience for a person, and that is where it works best.",
        ],
      },
      {
        heading: "When should you not use one?",
        body: [
          "Do not use it for accounts with lasting value, such as shared test accounts that other people rely on, or anything involving banking, work or real customer data. A lost inbox cannot be recovered.",
          "It is also the wrong tool for automated suites. Instant Mail has no API, no custom domains and no forwarding, so it is built for a human in a browser.",
          "Some websites block known disposable domains. If your own app does that on purpose, testing with one will fail by design, and that is worth knowing rather than fighting.",
        ],
      },
      {
        heading: "Step-by-step: a clean QA pass with throwaway addresses",
        body: ["Use this routine for a manual regression pass on an email feature."],
        bullets: [
          "Write down the email scenarios in scope, such as signup, reset and notification.",
          "Confirm you are in staging with fake data and no production credentials.",
          "Generate a new address for each scenario so results stay isolated.",
          "Record the address next to the test case in your notes, because it cannot be recovered later.",
          "Run the scenario, noting delivery time and any rendering or link problems.",
          "Capture a screenshot of the opened message for the bug report if something is wrong.",
          "Discard the address when you finish and start the next scenario with a new one.",
        ],
      },
      {
        heading: "Disposable versus a shared team mailbox",
        body: [
          "A shared mailbox gives you history and persistence but mixes messages from many runs, and everyone needs access. A disposable inbox is isolated and quick but temporary and tied to one browser.",
          "Many teams use both: a persistent mailbox for long-lived test accounts and a throwaway address for quick manual checks.",
        ],
      },
      {
        heading: "What safety rules should QA follow?",
        body: [
          "Use throwaway addresses only against your own staging or development environment, with fake data. Never register them on third-party sites to get around limits, trials or rules, and never use them for banking, work or accounts you must recover.",
          "Do not put anything sensitive in a message sent to a temporary inbox. Treat it as public-ish and short-lived, because the address comes from a third-party provider and retention depends on them.",
          "Keep production credentials out of the picture entirely. A test that touches production email, even by accident, can reach real customers.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail. A temporary inbox is created in the browser with no sign-up.",
        "Copy the address and use it in your staging app's signup or notification form.",
        "Wait for the message. The inbox refreshes about every 8 seconds, and Refresh has a 5 second cooldown.",
        "Open the message to inspect the sender, subject and body. HTML is sanitized and scripts are removed.",
        "Reload the page to confirm the same inbox returns, since the session is saved in the browser.",
        "Use the new address action when you want a fresh inbox. The previous one is discarded.",
      ],
      note: "Clearing site data, switching browsers or using a private window loses access to the inbox. Addresses come from third-party providers.",
    },
    cta: { label: "Open a temporary inbox", href: TEMP },
    takeaway:
      "A disposable inbox is a fast, clean recipient for manual QA in your own staging app. Keep it away from automation and anything you may need to recover.",
  },
  {
    slug: "how-to-test-email-verification-flows",
    title: "How to Test Email Verification Flows",
    description:
      "How to test email verification flows: links and codes, expiry, resend behavior, already verified users and wrong-account cases, step by step.",
    readTime: "5 min read",
    quickAnswer:
      "Create an unverified test user, trigger the verification message, complete it with the link or code, and confirm the account state changes. Then test the failure paths: expired, reused, mistyped and already verified.",
    intro: [
      "Email verification proves that someone controls an address, and many products gate features behind it. A broken flow either locks real users out or lets unverified ones through.",
      "Most teams test the success path and stop. The useful bugs are in everything around it.",
    ],
    sections: [
      {
        heading: "Link or code: what changes in testing?",
        body: [
          "Link-based verification is a single click, so the main risks are the destination, the token and the state after the click. Code-based verification adds typing: users enter digits, copy them with spaces, or paste from the message.",
          "For codes, test whether your input accepts a pasted value, handles leading zeros and shows a clear error for a wrong or expired code. Test how many wrong attempts are allowed before your app reacts.",
          "Pay attention to the copy. A message that says what is being verified, which account it belongs to and what happens after the click leaves fewer users confused. Test that the wording stays accurate when the flow is used for different actions.",
          "Finally, check analytics and logging. Verification events should be recorded without storing raw tokens, and failures should leave enough information to debug without exposing the user's data.",
        ],
      },
      {
        heading: "Step-by-step: test a verification flow",
        body: ["Run this against staging with a fresh test user each time."],
        bullets: [
          "Register a new test user and confirm the app shows an unverified state with a clear prompt.",
          "Confirm the verification email arrives and note how long it took.",
          "Check that the message names the right account or action and does not expose private data.",
          "Complete verification and confirm the account flips to verified and unlocks the gated features.",
          "Reload and log out and in again to confirm the verified state persists.",
          "Try the same link or code again and confirm the response is clear and does not break the account.",
          "Try an expired and a deliberately altered link or code and confirm both are rejected.",
          "Try to access gated features before verifying and confirm they stay blocked.",
        ],
      },
      {
        heading: "Which edge cases catch the most bugs?",
        body: [
          "A user who is already verified clicks an old link: they should see a friendly confirmation, not an error. A user opens the link in a different browser than the one they signed up in: the flow should still work or explain what to do.",
          "Also test a user who changed their email address before verifying. The old message should not verify the new address, and the new one should be sent.",
          "Mobile matters too. Many people open the link on a phone while the signup happened on a laptop.",
        ],
      },
      {
        heading: "Keep verification tests safe",
        body: [
          "Use staging, fake users and non-production credentials. Never send test verification messages to real people, and never test by bypassing a third-party site's own rules.",
          "If verification mail is missing and your code looks fine, check the sending domain's MX, SPF and DMARC records with the DNS checker before digging deeper.",
        ],
      },
      {
        heading: "How do you test verification emails across devices?",
        body: [
          "Real users rarely stay in one browser. They sign up on a laptop, read mail on a phone and tap the link in an in-app browser that has none of their cookies. Your flow should complete verification from the link alone, without relying on an existing session.",
          "Test at least one run where the link is opened on a different device or browser from the signup. If your design requires the same browser, the page should say so and explain what to do.",
          "Also try a slow connection or a refresh in the middle of verification, since double requests are a common way to burn a single-use token.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Register a staging test user with that address.",
        "Watch the inbox, which refreshes about every 8 seconds, until the verification message appears.",
        "Open the message and either copy the code or click the link. Instant Mail shows the destination URL and asks you to confirm with Continue anyway.",
        "Complete verification and check the account state in your app.",
        "Go back to the message and use the link or code a second time to test the used-token path.",
      ],
      note: "Messages only appear after the sender actually delivers. Some sites block disposable domains, so a missing message is not always a bug.",
    },
    cta: { label: "Open a temporary inbox", href: TEMP },
    takeaway:
      "Verification testing is mostly about failure paths: expired, reused, altered and already verified. Cover those and the success path takes care of itself.",
  },
  {
    slug: "how-to-test-magic-link-login-emails",
    title: "How to Test Magic Link Login Emails",
    description:
      "How to test magic link login emails: single use, expiry, device and browser handoff, link scanning and security checks, with a clear manual checklist.",
    readTime: "5 min read",
    quickAnswer:
      "Request a magic link for a test user, open it once to confirm login, then try it again and after expiry to confirm it fails. Also test opening it in a different browser and on a phone, since that is where passwordless flows usually break.",
    intro: [
      "A magic link is both the email and the credential. Whoever opens it gets in, so the testing job is as much security review as it is message checking.",
      "Passwordless flows also depend on behavior outside your control, like mail apps that open links in their own browser view.",
    ],
    sections: [
      {
        heading: "What makes a magic link safe?",
        body: [
          "A sound design uses an unguessable token, a short lifetime and single use. It should be invalidated when a newer link is requested, if that is your policy, and the token should not be written to logs or analytics.",
          "The link should also be tied to the right context. Decide whether it must be opened in the same browser that requested it, and test that your decision actually holds.",
          "Think about the recovery path too. If the link fails, the user should be able to request another from the same screen without guessing what went wrong. A good error message names the cause, such as expired or already used, and offers the next step.",
          "Review where the token travels. Query strings can end up in browser history, server logs and referrer headers, so check that your landing page exchanges the token for a session quickly and then removes it from the URL.",
        ],
      },
      {
        heading: "Step-by-step: test magic link login",
        body: ["Use a dedicated staging user and run each step in order."],
        bullets: [
          "Request a magic link for a test user and confirm the message arrives quickly with a clear subject.",
          "Check that the body explains what the link does and what to do if the reader did not request it.",
          "Open the link and confirm it logs the right user into the right staging environment.",
          "Reuse the same link and confirm it no longer works and shows a helpful message.",
          "Request two links in a row and confirm which one stays valid, matching your policy.",
          "Wait past the expiry, or shorten it in staging, and confirm the link is rejected.",
          "Open the link in a different browser or device and confirm the behavior you designed.",
          "Try an altered token and confirm it fails without revealing details.",
        ],
      },
      {
        heading: "Why do magic links fail for real users?",
        body: [
          "Some mail systems fetch links automatically to scan them for threats, which can consume a single-use token before the user clicks. If your logins fail only for some recipients, this is a likely cause. A common mitigation is a confirmation page that requires a click before the token is spent, and you can test that design.",
          "Other causes include links that wrap across lines in plain text, tracking redirects that break the token, and email apps that open links in an embedded view with no session.",
        ],
      },
      {
        heading: "Safety notes for passwordless testing",
        body: [
          "Test in staging with fake users only, and never paste real magic links into chats or tickets, since a valid one is a login. Rotate or expire test tokens when you finish.",
          "If magic link mail is slow or missing, check the sending domain's MX, SPF and DMARC records with the DNS checker.",
        ],
      },
      {
        heading: "What do real-world delivery and clients change?",
        body: [
          "Mail clients differ. Some rewrite links through a protection service, some show a preview, and some open links in an embedded browser. Each of those can change how your token behaves, so a link that works in one client is not proof it works in all of them.",
          "Check that the visible link text and the real destination agree, and that the plain text version contains the full URL without breaking across lines.",
          "Finally, keep an eye on timing. A magic link that arrives after its lifetime has expired is useless, so slow delivery is a functional bug here, not a cosmetic one.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Create a staging test user with that address, or use it on your passwordless sign-in form.",
        "Request the magic link and wait for the message. The inbox refreshes about every 8 seconds.",
        "Open the message, then click the link. Check the destination URL in the warning and choose Continue anyway.",
        "Confirm you are logged in as the right user.",
        "Go back to the message and click the link again to confirm the used-link behavior.",
      ],
      note: "Treat any real login link as a credential. Use a temporary inbox only for test accounts in your own app.",
    },
    cta: { label: "Open a temporary inbox", href: TEMP },
    takeaway:
      "A magic link is a credential in an email. Test single use, expiry and cross-device behavior, and watch for link scanners spending the token early.",
  },
  {
    slug: "how-to-test-email-change-confirmation-flows",
    title: "How to Test Email Change Confirmation Flows",
    description:
      "How to test email change confirmation flows: confirm the new address, notify the old one, handle expiry and conflicts, with a step-by-step checklist.",
    readTime: "5 min read",
    quickAnswer:
      "Change the email on a test account, confirm the message goes to the new address, complete the confirmation, and verify the account now uses the new address. Also check that the old address is notified and that expired or conflicting requests fail safely.",
    intro: [
      "Changing an email address touches identity, so it is a favorite target for account takeover. A well-built flow proves the user controls the new address and warns the old one that something changed.",
      "Product teams often test only the happy path. Here the awkward paths matter more.",
    ],
    sections: [
      {
        heading: "What should an email change flow do?",
        body: [
          "A typical design asks for the current password or a recent login, sends a confirmation to the new address, and only switches the account once that is confirmed. Many products also send a notice to the old address so the real owner can react.",
          "Your policy may differ, so write it down first. Tests are only meaningful against a clear expected behavior.",
          "Consider the timing of the switch. Until the new address is confirmed, the account should keep working with the old one, and you should decide what happens to a pending change when the user logs out, changes their password or starts another change.",
          "Document the policy for the support team as well. When someone writes in saying they changed their address by mistake, support should know exactly what the system allows.",
        ],
      },
      {
        heading: "Step-by-step: test an email change",
        body: ["Use a staging account whose login you control and two test addresses."],
        bullets: [
          "Log in to the test account and start an email change to the second test address.",
          "Confirm your app asks for re-authentication if your policy requires it.",
          "Check that the confirmation message goes to the new address and names the account clearly.",
          "Confirm the old address receives a change notice if your design includes one.",
          "Before confirming, check that login still uses the old address.",
          "Click the confirmation link and verify the account now uses the new address everywhere it appears.",
          "Reuse the link and confirm the second attempt is rejected cleanly.",
          "Log in with the new address and confirm the old one no longer works.",
        ],
      },
      {
        heading: "Which conflicts and edge cases should you test?",
        body: [
          "Try changing to an address that already belongs to another account. The response should be safe and consistent with how signup handles duplicates.",
          "Start two change requests and confirm only the intended one can complete. Let a request expire and confirm the link fails. Change the address to a typo and confirm the user can recover, for example by cancelling the pending change.",
          "Check related data too: receipts, notification settings and linked sign-in methods should follow the new address or stay consistent.",
        ],
      },
      {
        heading: "Staging safety for identity flows",
        body: [
          "Use only fake accounts and test addresses you control. Never run an email change against a real customer, even in a copied database.",
          "If confirmation mail does not arrive, check MX, SPF and DMARC for your sending domain with the DNS checker before changing code.",
        ],
      },
      {
        heading: "What notifications should you verify around the change?",
        body: [
          "Besides the confirmation, think about every message the change can trigger: the notice to the old address, a success message to the new one, and any alert from security settings. Decide which should exist and test that each one does, and that none go to the wrong recipient.",
          "Read the wording from the point of view of the old address owner. If someone else changed the email, the message should tell them what happened and how to act quickly.",
          "Make sure none of these messages include secrets beyond what is needed, and that links in the old-address notice do not simply confirm the change.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Log in to a staging test account and enter that address as the new email.",
        "Wait for the confirmation message in the inbox, which refreshes about every 8 seconds.",
        "Open it, read the destination URL in the link warning, and choose Continue anyway.",
        "Check in your app that the account now shows the new address.",
        "Use the new address action to get another inbox and repeat with a second change request.",
      ],
      note: "Instant Mail is receive-only, so you cannot test the old-address notice from it unless the old address is a different inbox you control.",
    },
    cta: { label: "Open a temporary inbox", href: TEMP },
    takeaway:
      "Test the new-address confirmation, the old-address notice, and every conflict or expiry case. Identity changes deserve more than a happy path.",
  },
  {
    slug: "common-bugs-in-signup-and-verification-emails",
    title: "Common Bugs in Signup and Verification Emails",
    description:
      "The common bugs in signup and verification emails, from wrong links and missing placeholders to slow delivery and expiry mistakes, and how to find them.",
    readTime: "5 min read",
    quickAnswer:
      "The usual culprits are links pointing at the wrong host, empty template fields, slow or missing delivery, expiry set too short, and tokens that can be reused. Most show up quickly when you run the flow end to end in staging with a clean inbox.",
    intro: [
      "Signup and verification emails break in a narrow set of ways, and the same ones recur across products. Knowing the list helps you look in the right places first.",
      "Each bug below includes how to spot it and what to check next.",
    ],
    sections: [
      {
        heading: "What are the most common signup email bugs?",
        body: [
          "Wrong host in links is the classic. A staging build sends links to localhost or production, or a base URL setting is missing in one environment. Click the link and read where it lands.",
          "Empty or raw placeholders are next: a greeting that says Hello with no name, or literal template syntax in the subject. Test with users that have no optional fields filled in.",
          "Duplicate sends happen when a retry or a double click triggers two messages, leaving the user unsure which link is valid.",
          "Keep an eye on character handling. Names with accents, apostrophes or non-Latin scripts can break subjects, headers and template output, producing garbled text that makes a legitimate message look suspicious.",
          "Also review what happens when the user's mail provider is slow. Your page should not promise that the email is already there. A calm message that sets expectations, and a visible resend option, prevents panic clicks and duplicate requests.",
        ],
      },
      {
        heading: "Bug-hunting checklist",
        body: ["Run through these checks on every signup or verification change."],
        bullets: [
          "Click the link in the email and confirm the host, path and environment are correct.",
          "Sign up with a minimal profile and confirm no placeholder shows as blank or raw.",
          "Submit the form twice quickly and confirm you do not get two conflicting messages.",
          "Measure delivery time and flag anything that would make a user give up.",
          "Use a token twice and confirm the second use fails clearly.",
          "Let a token expire and confirm the page offers a way to get a new one.",
          "Sign up with an uppercase or plus-addressed email and confirm matching works later.",
          "Check the plain text version matches the HTML version.",
        ],
      },
      {
        heading: "Why are signup emails slow or missing?",
        body: [
          "Causes include a stalled queue, a provider rate limit, authentication problems on the sending domain, or the receiving side filtering the message. Work from your app outward: did it try to send, did the provider accept it, then what did the recipient see?",
          "Check the sending domain's DNS first, since it is quick. The DNS checker shows whether MX, SPF and DMARC records are found, and DKIM too if you provide the selector. It cannot see blocklists or send a test message.",
          "Remember that some websites block known disposable-email domains. If your own app does the same, a missing message can be by design.",
        ],
      },
      {
        heading: "Expiry and state bugs",
        body: [
          "Expiry that is too short frustrates people who check mail later. Expiry that is too long is a security risk. Pick a value on purpose and test both sides of it.",
          "State bugs appear when a user verifies but the account still looks unverified because of caching, or when verifying in one tab does not update another. Reload and log in again to confirm the state is real.",
          "Keep all testing in staging with fake data, never real customer addresses.",
        ],
      },
      {
        heading: "How do you stop these bugs from returning?",
        body: [
          "Turn each bug you find into a permanent check. If a link once pointed at localhost, add a test that asserts the base URL in every environment. If a placeholder once rendered empty, add a template test with a minimal profile.",
          "Review email changes with the same care as code changes. A pull request that touches a template should include a note about what was checked in a real inbox.",
          "Finally, watch support requests. A spike in people saying they never got the email is often your first sign that a deliverability or template problem slipped through.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Sign up in your staging app with that address and a minimal profile.",
        "Watch the inbox and time how long the message takes. It refreshes about every 8 seconds.",
        "Open the message and look for blank fields, raw placeholders and odd formatting.",
        "Click the link and read the destination URL in the warning to catch a wrong host before choosing Continue anyway.",
        "Submit the form again with the same address and check whether you receive one message or two.",
      ],
      note: "A missing message can also come from a provider delay or a site that blocks disposable domains, so check both before filing a bug.",
    },
    cta: { label: "Check your sending domain DNS", href: DNS },
    takeaway:
      "Most signup email bugs are wrong links, empty fields, duplicates, slow delivery and expiry mistakes. A clean end-to-end run in staging finds them fast.",
  },
  {
    slug: "how-to-test-email-resend-and-rate-limits",
    title: "How to Test Email Resend Buttons and Rate Limits",
    description:
      "How to test email resend buttons and rate limits: cooldowns, old link behavior, throttling messages and abuse protection, with a manual checklist.",
    readTime: "5 min read",
    quickAnswer:
      "Click the resend button on a test account, confirm a new message arrives, then repeat quickly to see the cooldown or limit. Check what happens to the old link, what message the user sees, and whether the limit resets as designed.",
    intro: [
      "Every verification or login flow needs a resend option, because mail gets delayed, filtered or missed. The same button is also an abuse surface, since it triggers email on demand.",
      "Testing it means checking both sides: it must help a real user and resist someone hammering it.",
    ],
    sections: [
      {
        heading: "What should a resend button do?",
        body: [
          "A good resend flow sends a fresh message, tells the user it did so, and prevents repeated clicks from flooding the inbox. It usually has a visible cooldown and a clear limit over a time window.",
          "Decide how old links behave. Some products invalidate earlier tokens when a new one is issued, others allow all of them until expiry. Either can be right if it is deliberate and tested.",
          "Think about concurrency. Two quick clicks, or two open tabs, can send two messages before the first request finishes. Test that your server counts requests safely and does not let a race condition slip past the limit.",
          "Finally, log the events you need to investigate abuse, such as the account, time and outcome of each resend, without storing tokens. Good logs make it much easier to tune limits that block abuse without blocking honest users.",
        ],
      },
      {
        heading: "Step-by-step: test resend and rate limits",
        body: ["Run this in staging with a test user that is not yet verified."],
        bullets: [
          "Trigger the first message and confirm it arrives normally.",
          "Click resend and confirm a second message arrives and the interface acknowledges the action.",
          "Click resend repeatedly and confirm the cooldown or limit appears with a clear message.",
          "Check that the countdown, if shown, matches the actual time you must wait.",
          "Use the first link after the second message arrives and confirm it follows your invalidation policy.",
          "Use the newest link and confirm verification or login succeeds.",
          "Wait out the window or reset the counter in staging and confirm resending works again.",
          "Reload the page during a cooldown and confirm the limit is enforced by the server, not only by the button.",
        ],
      },
      {
        heading: "How do you test server-side limits?",
        body: [
          "A disabled button is a hint, not protection. Try the action again after a reload, from a second tab and from another browser, and confirm the server still refuses.",
          "Check limits per account and per address, and think about what your design should do for unknown addresses so you do not reveal which accounts exist.",
          "Make sure error responses are friendly. A raw error or a blank page after hitting a limit sends users away.",
        ],
      },
      {
        heading: "Safety and honest scope",
        body: [
          "Only test limits on your own staging environment. Hammering a third-party service or production system is not testing, it is abuse, and it can harm your sending reputation.",
          "A manual inbox is good for checking a handful of resends. It is not a load test, and Instant Mail does not offer automation or an API.",
          "If resent messages arrive late or not at all, check the sending domain's MX, SPF and DMARC with the DNS checker.",
        ],
      },
      {
        heading: "What do users need to see around resend?",
        body: [
          "Clear wording matters as much as the limit. Tell users the message was sent, to which address, and how long to wait before trying again. Suggest checking spam and confirming the address is spelled correctly.",
          "Offer an escape route. A user who typed the wrong address needs a way to change it, not just a button that sends to the same mistake again.",
          "Test these messages on mobile as well, since cramped screens tend to hide countdowns and error text.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open Instant Mail and copy the temporary address.",
        "Register a staging test user with it, then land on the screen that offers a resend button.",
        "Wait for the first message in the inbox, which refreshes about every 8 seconds.",
        "Click resend in your app and watch for the second message to arrive.",
        "Open both messages and compare the links to see which one your app accepts.",
        "Click resend several times and note when your app shows its cooldown or limit.",
      ],
      note: "Delivery speed depends on the provider behind the address. Some sites block disposable domains, which can look like a resend bug.",
    },
    cta: { label: "Check your sending domain DNS", href: DNS },
    takeaway:
      "A resend button needs a cooldown, a server-enforced limit and a clear policy for old links. Test all three, in staging only.",
  },
];
