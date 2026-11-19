import type { ClusterGuideInput } from "../clusterTypes";

const DNS = "https://www.instantmail.online/tools/email-dns-checker";

export const emailDeliverabilityGuides: ClusterGuideInput[] = [
  {
    slug: "mx-record-lookup-and-common-errors",
    title: "MX Record Lookup and Common Errors",
    description:
      "Run an MX record lookup, read the result, and fix the most common MX errors: missing records, wrong priority, CNAME targets and stale mail hosts.",
    readTime: "5 min read",
    quickAnswer:
      "An MX lookup asks DNS which mail servers accept email for a domain. If the lookup returns nothing, or returns hosts that no longer exist or belong to an old provider, senders cannot deliver to you, so fix the MX records at your DNS host first.",
    intro: [
      "MX problems are the most direct cause of mail that never arrives. A domain can have perfect SPF, DKIM and DMARC and still receive nothing because the MX records point to the wrong place.",
      "This guide skips the basics and focuses on what a lookup result looks like when something is broken, and what to change in each case.",
    ],
    sections: [
      {
        heading: "What a healthy MX lookup looks like",
        body: [
          "A healthy result lists one or more hostnames, each with a priority number. The host with the lowest number is tried first. Higher numbers are fallbacks that senders use when the preferred server is unreachable.",
          "Every MX target must be a hostname that resolves to an A or AAAA record. An MX record can never point directly to an IP address, and the target should not be a CNAME. Your mail provider's setup page tells you the exact hostnames and priorities to publish.",
        ],
      },
      {
        heading: "Why does my MX lookup return nothing?",
        body: [
          "An empty result usually means one of four things. The records were added at a DNS host that is not actually authoritative for the domain, because the nameservers at the registrar point somewhere else. The records were added to a subdomain instead of the root. The domain was typed with a typo. Or the change has not propagated yet and a resolver is still serving a cached empty answer.",
          "If your domain intentionally sends mail only and never receives it, a missing MX can be acceptable for you, but some senders expect one, so many operators publish a null MX instead. Check what your provider recommends before deciding.",
        ],
      },
      {
        heading: "Common MX errors and the fix for each",
        body: [
          "Most MX mistakes fall into a short list of patterns. Work through the ones that match what you see, and change one thing at a time so you know which edit solved it.",
        ],
        bullets: [
          "Old provider records still present: delete MX records from the previous host, because mixing two providers splits mail unpredictably between them.",
          "Equal priorities across different providers: remove one provider or give the intended primary the lowest number.",
          "MX pointing to an IP address: replace it with the hostname your provider gave you.",
          "MX pointing to a CNAME: point the MX at the final hostname, because the DNS standards say an MX target should not be an alias.",
          "Domain appended twice: some DNS panels add your domain automatically, so a value like mail.example.com.example.com means you should follow the panel's format for the hostname.",
          "Records added at the wrong DNS host: confirm which nameservers the domain actually uses and edit the zone there.",
          "Very high TTL on old records: if you are changing providers, lower the TTL a day ahead so caches expire sooner.",
        ],
      },
      {
        heading: "Priority numbers and fallback servers",
        body: [
          "Priority is a preference, not a load balancer. Senders try the lowest value first and move to the next only if the connection fails or the server returns a temporary error. Two records with the same value are tried in no guaranteed order, which some providers use deliberately for spreading load.",
          "A backup MX that does not know your mailboxes can accept mail and then bounce it later. Only publish a fallback host if the provider tells you to, and never add one just because it seems safer.",
        ],
      },
      {
        heading: "How long until a fix shows up?",
        body: [
          "Resolvers cache answers for the record's TTL. After you correct a record, a lookup may keep showing the old value until that time runs out. A short TTL such as 300 seconds speeds this up, but a TTL you set now does not shorten caches that already hold the old record.",
          "If the lookup still shows old data after the TTL has passed, you are probably editing a zone that is not authoritative for the domain. Check the nameservers listed at your registrar and compare them with the DNS host you are logged into.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open the Email DNS Checker and type your domain, for example example.com, without http or a path.",
        "Leave the DKIM selector empty, since you only need the MX result for this check.",
        "Run the check and look at the MX row. It shows Found or Missing.",
        "If it says Found, read the raw records and compare hostnames and priorities to what your mail provider documents.",
        "If it says Missing, check your nameservers and the DNS zone you edited, then run the check again after the TTL has passed.",
        "Fix anything that looks like an old provider, an IP address or an extra copy of your domain in the hostname.",
      ],
      note: "The checker reads public DNS through Cloudflare DNS over HTTPS. It does not connect to the mail server, so it cannot tell you whether the server accepts mail or whether a mailbox exists.",
    },
    cta: { label: "Run an MX lookup", href: DNS },
    takeaway:
      "A correct MX set is short: your provider's hostnames, sensible priorities and nothing left over from an old host. Check it after every provider change.",
  },
  {
    slug: "spf-record-checker-common-failures",
    title: "SPF Record Checker: Common Failures",
    description:
      "An SPF record checker shows whether your TXT record exists. Learn the common SPF failures, from duplicate records to wrong qualifiers, and how to fix them.",
    readTime: "5 min read",
    quickAnswer:
      "Most SPF failures come from five things: no record, more than one SPF record, a sending service that is not included, a wrong ending such as ~all or +all, and syntax typos. A checker shows the raw record so you can spot them.",
    intro: [
      "SPF tells receiving servers which hosts may send mail for your domain. When it breaks, mail may be flagged, rejected or quietly sent to spam, often without any visible error on your side.",
      "Below are the failure patterns that show up most when you read an SPF record, with the exact edit that resolves each one.",
    ],
    sections: [
      {
        heading: "How to find and read your SPF record",
        body: [
          "SPF is published as a TXT record on the domain itself, and it starts with v=spf1. Other TXT records on the same name, such as site verification tokens, are unrelated and fine to keep.",
          "Read the record left to right. Mechanisms like include, ip4, a and mx list who may send. The last term says what to do with everyone else. Anything that is not one of those terms, or has a typo in it, can make the whole record invalid.",
        ],
      },
      {
        heading: "Failure 1: two SPF records on one domain",
        body: [
          "A domain must publish exactly one SPF record. When two TXT records both start with v=spf1, receivers cannot decide which to use and the result is a permanent error, which counts as an SPF failure.",
          "This usually happens when someone adds a new service by creating a second record instead of editing the first. The fix is to merge them into a single record with all the includes in one line, then delete the extra.",
        ],
      },
      {
        heading: "Failure 2: a sending service is missing",
        body: [
          "Your main mailbox provider is rarely the only sender. Newsletter tools, CRMs, help desks and invoicing apps often send as your domain too. If one of them is not covered by an include or IP, its mail fails SPF.",
          "A checker cannot tell you which services you use, so make a list from your own accounts and compare it with the record. This is the failure most often found months after a tool was added.",
        ],
      },
      {
        heading: "Failure 3: the wrong ending",
        body: [
          "The final term sets the policy for unlisted senders. A hard fail, written -all, says reject them. A soft fail, written ~all, says treat them as suspicious. Neutral, ?all, says no opinion. Plus all, +all, authorizes the entire internet and defeats the purpose, so never publish it.",
          "A reasonable pattern is to start with ~all while you confirm every legitimate sender is listed, then tighten to -all if your setup is stable. Your DMARC policy usually matters more for what actually happens to the message.",
        ],
      },
      {
        heading: "A checklist for fixing SPF",
        body: ["Work through these in order and recheck after each change."],
        bullets: [
          "Confirm that exactly one TXT record starts with v=spf1, and merge extras into it.",
          "Check that the record starts with v=spf1 with a lowercase v and no stray characters before it.",
          "List every service that sends mail as your domain and confirm each has an include or IP in the record.",
          "Remove includes for services you no longer use, since each one adds DNS lookups.",
          "Make sure the record ends with ~all or -all, never +all, and that there is only one all term.",
          "Keep the whole record in one TXT entry, letting your DNS host split long strings internally if needed.",
          "Avoid the deprecated ptr mechanism and avoid putting spaces inside a mechanism.",
          "Watch the lookup count, because going over 10 causes a permanent error.",
        ],
      },
      {
        heading: "Soft fail versus hard fail in practice",
        body: [
          "Many people assume -all makes SPF stricter in a way that always blocks mail. In reality, receivers combine the SPF result with other signals, and DMARC decides most outcomes. A message that fails SPF but passes DKIM with alignment can still pass DMARC.",
          "That is also why forwarding causes surprises. When a message is forwarded, the forwarding server's IP is not in your SPF record, so SPF fails at the final destination even though you did nothing wrong. DKIM signatures usually survive forwarding, which is one more reason to have both set up.",
          "After any edit, give the old record time to expire from caches and recheck, instead of assuming the change is live everywhere.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open the Email DNS Checker and enter your domain.",
        "Skip the selector field, because SPF does not use one.",
        "Run the check and find the SPF row. Found means a TXT record starting with v=spf1 was returned.",
        "Read the raw record. Count how many v=spf1 records appear and check the ending.",
        "Compare the includes with the services you actually send from, then edit your DNS and run the check again.",
      ],
      note: "The checker shows the record but does not validate SPF logic. It does not count DNS lookups and it does not send a test email, so a Found result does not prove your mail will pass.",
    },
    cta: { label: "Check your SPF record", href: DNS },
    takeaway:
      "One record, every real sender included, and a sane ending. That is most of SPF, and it takes minutes to verify.",
  },
  {
    slug: "dkim-selectors-explained-and-how-to-find-yours",
    title: "DKIM Selectors Explained and How to Find Yours",
    description:
      "What a DKIM selector is, where the public key lives in DNS, and how to find your selector from an email header or your provider's settings.",
    readTime: "5 min read",
    quickAnswer:
      "A DKIM selector is a label that tells receivers which public key to fetch. The key is a TXT record at selector._domainkey.yourdomain.com, and you can find your selector in your provider's DKIM settings or in the s= tag of a DKIM-Signature header.",
    intro: [
      "Unlike SPF and DMARC, you cannot check DKIM with just a domain name. A domain can have many DKIM keys at once, each under its own selector, and a lookup needs to know which one to ask for.",
      "That is why people get stuck: the checker asks for a selector and they have no idea what to type. The answer is already in every message you send.",
    ],
    sections: [
      {
        heading: "Why selectors exist",
        body: [
          "Selectors let one domain use several signing keys. A mail provider, a newsletter platform and a support desk can each sign with their own key, and you can rotate a key by publishing a new selector before retiring the old one.",
          "The selector is only a name. Common examples are default, google, selector1, selector2 or an arbitrary string from your provider. What matters is that it matches the one in the message header, not that it follows a pattern.",
        ],
      },
      {
        heading: "Where the DKIM key lives",
        body: [
          "The receiver builds a DNS name from the selector and the signing domain: selector, then ._domainkey., then the domain. At that name it expects a TXT record containing v=DKIM1, a key type such as k=rsa and the public key in p=.",
          "Some providers publish a CNAME at that name that points to a record they host. A resolver follows it, and the TXT answer appears at the end of the chain. That lets the provider rotate keys without you editing DNS.",
        ],
      },
      {
        heading: "How to find your selector",
        body: ["Use whichever of these is easiest for your situation."],
        bullets: [
          "Open your mail provider's admin console and look for a DKIM or email authentication section, which usually lists the selector and the DNS record to publish.",
          "Send yourself a message, open the original source or raw headers, and search for DKIM-Signature.",
          "In that header, read the s= tag for the selector and the d= tag for the signing domain.",
          "If other services send on your behalf, repeat the process for a message from each one, since each may use its own selector.",
          "Check the DNS panel for existing records ending in ._domainkey, because the label before it is a selector.",
          "Ask your sending service's support if the settings page does not show it, rather than guessing common names.",
        ],
      },
      {
        heading: "Common DKIM mistakes",
        body: [
          "A mismatched selector is the most common: the provider signs with one name and you published the key under another. Next is a truncated key, where a DNS panel cut off a long p= value or added a stray space or line break.",
          "Another is signing with a domain that differs from your From domain. DKIM can pass while still not aligned for DMARC, which matters in the next layer of authentication.",
          "Finally, signing may simply be turned off. Many providers publish the record but need you to enable signing in their console.",
        ],
      },
      {
        heading: "Key rotation and several selectors",
        body: [
          "It is normal to see more than one selector on a domain. Providers often publish two, such as selector1 and selector2, so they can rotate keys without a gap. Only the one used in a message's s= tag matters for that message.",
          "When you retire a service, remove its DKIM record only after you are sure nothing still signs with it. Deleting the key of an active selector makes every message signed with it fail DKIM at once.",
          "Key length matters too. Current guidance favors 2048-bit RSA keys where your DNS host can store the long value, though some hosts need the string split into parts. Follow your provider's instructions for formatting.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Find your selector first using the s= tag of a real message header or your provider's settings.",
        "Open the Email DNS Checker and enter your domain.",
        "Type the selector in the optional DKIM selector field.",
        "Run the check and read the DKIM row. Found means a TXT record was returned at selector._domainkey.yourdomain.",
        "Read the raw record and confirm it starts with v=DKIM1 and has a long p= value without breaks.",
        "If it says Missing, compare the selector spelling and the record name in your DNS panel.",
      ],
      note: "Without a selector the checker skips DKIM entirely. It also cannot confirm that your messages are actually being signed, only that a key record exists in DNS.",
    },
    cta: { label: "Look up a DKIM key", href: DNS },
    takeaway:
      "The selector is just the name of the key. Read it from a message header, enter it with the domain, and the public key either appears or it does not.",
  },
  {
    slug: "why-emails-are-not-being-delivered",
    title: "Why Emails Are Not Being Delivered",
    description:
      "Emails not being delivered? Work through DNS, authentication, bounce messages and mailbox causes in order to find the real reason fast.",
    readTime: "5 min read",
    quickAnswer:
      "Undelivered email usually comes from one of four layers: DNS (MX or authentication), the sending server's reputation or limits, a problem on the recipient's side such as a full or nonexistent mailbox, or a policy block. The bounce message tells you which layer to check.",
    intro: [
      "When an email disappears, guessing wastes hours. A calm process works better: identify whether the message was rejected, delayed or accepted and then filed somewhere unexpected.",
      "This guide gives you that order of operations, so you stop changing settings at random.",
    ],
    sections: [
      {
        heading: "First, separate bounced, delayed and filtered",
        body: [
          "A bounce is a message back to the sender with an error code. A delay is a warning that the server is still retrying. Filtered mail was accepted by the receiving server and then put into spam, quarantine or a rule's folder, and it generates no error at all.",
          "Each needs a different fix. Bounces point to addresses, DNS or policy. Delays point to the receiving side being unreachable or throttling you. Filtered mail points to authentication and content.",
        ],
      },
      {
        heading: "Read the bounce message before touching DNS",
        body: [
          "Most systems return a code starting with 4 for temporary failures and 5 for permanent ones, often with an enhanced code like 5.1.1 and a text reason. That text commonly names the real cause: unknown user, mailbox full, message blocked by policy, or failed authentication.",
          "Copy the full text into a note and read the part after the numbers. It is often more specific than the code, and it is what support teams ask for first.",
        ],
      },
      {
        heading: "A step-by-step delivery check",
        body: ["Go in this order and stop at the first thing you find."],
        bullets: [
          "Confirm the recipient address is spelled correctly and the mailbox exists, because one typo causes an instant bounce.",
          "Read the full bounce text and note the status code and the stated reason.",
          "Check that the recipient's domain has valid MX records, since without them no mail can arrive.",
          "Check that your sending domain has one valid SPF record that covers the server or service that sent the message.",
          "Check that DKIM is published and signing is enabled for the sending service.",
          "Check that a DMARC record exists and that SPF or DKIM aligns with your From domain.",
          "Look at the message itself for broken links, very large attachments or heavy image-only content.",
          "If everything checks out, ask the recipient to look in spam and quarantine, and consider whether the sending server is on a blocklist.",
        ],
      },
      {
        heading: "Causes that DNS cannot show",
        body: [
          "Some failures never appear in DNS. A recipient's inbox may be over quota. Your sending IP or domain may have a poor reputation or be listed on a blocklist. A provider may limit how many messages you can send per hour. A recipient's admin may have rules that block your domain.",
          "A DNS check rules out the configuration side, so you can concentrate on these remaining causes with the evidence in hand and avoid editing records that were never the problem.",
        ],
      },
      {
        heading: "Delivery problems that look like DNS problems",
        body: [
          "Some symptoms resemble DNS faults but are not. A message to one recipient bounces while others work, which points to that recipient's mailbox or rules. Mail works for hours and then stops, which often points to a sending limit or a temporary block.",
          "Another trap is testing from a personal inbox, then assuming a result applies to everyone. Receivers differ in how strict they are, so a message that reaches one provider can still be refused by another.",
          "Keep a short log of what you changed and when. With a timeline, you can tell whether a failure began right after a DNS edit or had nothing to do with it.",
          "If you manage the sending server yourself, also check its logs. They record the exact reply the remote server gave, including the timestamp, which makes it much easier to match a failure to a specific change or limit.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open the Email DNS Checker and enter the domain that is sending the mail.",
        "If you know the DKIM selector from a message header, enter it too.",
        "Run the check and read the MX, SPF, DMARC and DKIM rows.",
        "Treat any Missing row as a first fix, and read the raw records for duplicates or typos.",
        "Repeat for the recipient's domain and confirm that its MX row is Found.",
      ],
      note: "A clean result only means the DNS records exist. The checker does not send a test message, read your bounce logs, or check blocklists, so a bounce code still needs separate reading.",
    },
    cta: { label: "Check your domain's DNS", href: DNS },
    takeaway:
      "Read the bounce, check DNS in order, then look at reputation and the recipient. That sequence beats random edits every time.",
  },
  {
    slug: "dmarc-policies-none-quarantine-reject-explained",
    title: "DMARC Policies Explained: none, quarantine, reject",
    description:
      "Compare DMARC policies p=none, p=quarantine and p=reject, how alignment works, and a safe way to move from monitoring to enforcement.",
    readTime: "5 min read",
    quickAnswer:
      "The DMARC policy tells receivers what to do with mail that fails authentication: none means monitor only, quarantine means treat as suspicious, and reject means refuse it. Start with p=none, review reports, and move to enforcement only when all legitimate senders pass.",
    intro: [
      "A DMARC record is short, but the policy value inside it has real consequences. Set it too strict too early and your own invoices or newsletters can vanish. Leave it at none forever and spoofed mail can still reach people using your name.",
      "Here is how each policy behaves, what makes a message pass, and a rollout that avoids surprises.",
    ],
    sections: [
      {
        heading: "What makes a message pass DMARC",
        body: [
          "DMARC passes when SPF or DKIM passes and that passing domain aligns with the domain in the visible From address. You need only one of the two, not both.",
          "Alignment is the part people miss. SPF can pass for a service's own bounce domain and still not align with your From domain. A DKIM signature from the service's domain has the same problem. Properly configured sending services sign with your domain so alignment succeeds.",
        ],
      },
      {
        heading: "p=none: monitor only",
        body: [
          "With p=none, receivers do not change how they treat failing mail because of DMARC. The value is in the data. If you add a reporting address with rua=, receivers send aggregate reports showing who is sending mail as your domain and whether it passes.",
          "Use none while you discover legitimate senders you forgot about, such as an old CRM or a billing tool. Treat it as a starting point, not a finished setup.",
        ],
      },
      {
        heading: "p=quarantine and p=reject",
        body: [
          "Quarantine asks receivers to treat failing mail with suspicion, which in practice often means the spam folder. Reject asks them to refuse the message during delivery so the recipient never sees it.",
          "Both are requests. Receivers weigh them with their own filtering, and forwarding or mailing lists can break authentication, so even a correct setup sometimes loses a legitimate message. That is a reason to enforce gradually, not a reason to avoid enforcement.",
        ],
      },
      {
        heading: "A safe rollout from none to reject",
        body: ["Take it slowly and let the evidence guide each step."],
        bullets: [
          "Publish a TXT record at _dmarc.yourdomain with v=DMARC1; p=none and a rua address you can read.",
          "Let reports collect for a few weeks so every regular sender shows up.",
          "Fix each legitimate sender until it passes with SPF or DKIM aligned to your From domain.",
          "Move to p=quarantine, optionally using the pct tag to apply it to part of your mail first.",
          "Watch for complaints about missing mail and review the reports again.",
          "Raise pct to 100 and, once nothing legitimate fails, consider p=reject.",
          "Set the sp tag if your subdomains need a different policy than the main domain.",
          "Recheck after every new tool or provider you add, since new senders can fail alignment.",
        ],
      },
      {
        heading: "Common DMARC record mistakes",
        body: [
          "The record must be a TXT at _dmarc.yourdomain and begin with v=DMARC1. Putting it on the root domain, adding a second DMARC record, or misspelling a tag causes receivers to ignore it. Tags are separated by semicolons, and the policy tag p is required.",
          "A reporting address in rua must be a mailto address. If it points to a different domain than the one being reported on, that domain may need to publish permission for it. Reports are XML files, so many teams use a report-reading service rather than opening them by hand.",
          "Finally, remember subdomains. Without an sp tag they inherit the main policy, which is usually what you want, but check any subdomain that sends mail on its own.",
          "A practical habit is to keep a short list of every service that sends as your domain and review it each quarter. DMARC reports will reveal forgotten senders, and the list tells you which of them are legitimate and which need to be stopped.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open the Email DNS Checker and enter your domain.",
        "Run the check and find the DMARC row, which looks at the TXT record at _dmarc.yourdomain.",
        "If it says Found, read the raw record and identify the p= value and any rua address.",
        "If it says Missing, publish a starting record with p=none and recheck.",
        "While you are there, confirm SPF is Found, and enter a selector to see whether DKIM is Found, since DMARC needs one of them to align.",
      ],
      note: "The checker shows the record but does not read your DMARC reports or test alignment on real mail. Use your report address for that data.",
    },
    cta: { label: "Check your DMARC record", href: DNS },
    takeaway:
      "Monitor first, fix every sender, then enforce in steps. The policy is a dial, so turn it gradually.",
  },
  {
    slug: "spf-too-many-dns-lookups-permerror",
    title: "SPF \"Too Many DNS Lookups\" and PermError",
    description:
      "SPF too many DNS lookups causes a PermError. Learn what counts toward the limit of 10, how to find the culprits and how to trim your SPF record.",
    readTime: "5 min read",
    quickAnswer:
      "SPF allows at most 10 DNS lookups while evaluating a record. Go over it and receivers return a PermError, which counts as an SPF failure. Fix it by removing unused includes, replacing includes with IP ranges where safe, or moving some senders to a subdomain.",
    intro: [
      "The limit exists so that checking SPF cannot be used to flood a resolver with queries. It is easy to hit by accident, because every service you add brings its own includes, and those can have includes of their own.",
      "The problem is invisible on the surface. The record looks short while the work it triggers is not.",
    ],
    sections: [
      {
        heading: "What counts toward the 10 lookups",
        body: [
          "The mechanisms include, a, mx, ptr and exists each cost a lookup, as does the redirect modifier. The ip4, ip6 and all terms cost nothing.",
          "The count is recursive. If your record has one include, and that provider's record contains four more includes, you have used five. An mx mechanism can also trigger extra lookups for each host it returns. A separate limit of two void lookups, which are lookups that return no data, applies as well.",
        ],
      },
      {
        heading: "What PermError means for your mail",
        body: [
          "PermError is a permanent evaluation error. The receiver cannot decide the SPF result, so it treats SPF as failed for that message. Whether that sinks the message depends on whether DKIM passes with alignment and on your DMARC policy.",
          "Because the lookup tree can change when a provider edits its own record, a setup that worked last month can start failing without you changing anything.",
        ],
      },
      {
        heading: "How to bring the count down",
        body: ["Work from the safest change to the riskiest."],
        bullets: [
          "List every include in your record and match each one to a service you still use.",
          "Delete includes for tools you cancelled, since they still consume lookups.",
          "Remove redundant mechanisms: if an include already covers a host, a separate a or mx entry for it is wasted.",
          "Replace the mx or a mechanism with ip4 and ip6 ranges only when the addresses are stable and under your control.",
          "Never paste a provider's current IP ranges in place of its include unless the provider guarantees they will not change.",
          "Move bulk or marketing senders to a subdomain with its own SPF record, giving each domain its own budget of 10.",
          "Rely on DKIM alignment for services you cannot fit, since DMARC needs only one of SPF or DKIM.",
          "Recount after every change and again whenever you add a service.",
        ],
      },
      {
        heading: "Why flattening needs care",
        body: [
          "Flattening means replacing includes with the IP addresses behind them. It cuts lookups, but the addresses go stale when providers change their infrastructure, so mail starts failing silently. If you flatten, use a process that refreshes the record automatically, or accept the maintenance yourself.",
          "A subdomain split is usually safer and needs no ongoing upkeep.",
        ],
      },
      {
        heading: "Spotting the problem before receivers do",
        body: [
          "A common clue is DMARC aggregate reports showing SPF failures for a sender that you know is listed. Another is a validator that reports a permanent error even though each include looks fine on its own.",
          "Recheck after provider changes. Large mail providers occasionally restructure their own SPF records, and your include count can jump without any edit on your side. Keeping some headroom, for example staying at seven or eight lookups, gives you a safety margin.",
          "Document why each include is in the record. A short note in your own files saves you from deleting something that matters or keeping something dead.",
          "If you manage several domains, remember each one has its own budget, so copying the same long record to all of them copies the problem too. Trim each record to the services that domain really uses.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open the Email DNS Checker and enter your domain.",
        "Run the check and read the raw SPF record in the result.",
        "Count the include, a, mx and redirect terms by hand as your first estimate.",
        "Note each include hostname, then enter it as the domain in a new check to read its own SPF record and add its includes to your count.",
        "Remove what you no longer use, update your DNS and run the check again to confirm the record is shorter.",
      ],
      note: "The checker does not validate SPF lookup counts. It shows the raw record only, so the counting is yours, and you should confirm the final number with an SPF validator that follows the whole tree.",
    },
    cta: { label: "Read your SPF record", href: DNS },
    takeaway:
      "Ten lookups is a budget. Spend it on services you actually use, and use subdomains and DKIM alignment for the rest.",
  },
  {
    slug: "why-your-emails-go-to-spam-dns-checklist",
    title: "Why Your Emails Go to Spam: A DNS Checklist",
    description:
      "Emails going to spam? Use this DNS checklist to verify MX, SPF, DKIM and DMARC, then separate configuration problems from content and reputation issues.",
    readTime: "5 min read",
    quickAnswer:
      "The DNS reasons mail lands in spam are missing or broken SPF, no DKIM signing, no DMARC, or authentication that does not align with your From domain. If all of those are correct, the cause is usually content, sending behavior or reputation.",
    intro: [
      "Spam placement is a judgment by the receiver, not a single error. Authentication is one input, and it is the one you can verify in a few minutes. Failing it removes a basic trust signal, and passing it does not guarantee inbox placement.",
      "Use this as a quick audit, then decide whether the problem is in your records or elsewhere.",
    ],
    sections: [
      {
        heading: "The DNS records that matter for spam placement",
        body: [
          "Start with the records receivers can read without talking to you. They are your SPF TXT record, your DKIM key at the selector, your DMARC TXT record at _dmarc and your MX records.",
          "MX does not directly affect whether your outbound mail is trusted, but a domain that cannot receive replies and bounces looks unattended. Reverse DNS and the sending IP also matter for servers you run yourself, though those are checked outside this domain-level audit.",
        ],
      },
      {
        heading: "A spam-focused DNS checklist",
        body: ["Tick each item before changing content or sender behavior."],
        bullets: [
          "SPF exists, there is only one v=spf1 record, and it includes every service that sends as your domain.",
          "SPF stays within 10 DNS lookups and does not end in +all.",
          "DKIM is published at selector._domainkey and signing is enabled in each sending service.",
          "DKIM signs with your own domain rather than only the provider's domain.",
          "A DMARC record exists at _dmarc.yourdomain, starting at p=none if you are new to it.",
          "At least one of SPF or DKIM passes and aligns with the domain in your From address.",
          "MX records are present and correct so replies and bounces can reach you.",
          "The From domain, return-path and signing domains are consistent, not a mix of unrelated domains.",
        ],
      },
      {
        heading: "When authentication is fine but mail still goes to spam",
        body: [
          "Then the cause is on the content or reputation side. Common examples are sending to a purchased or stale list, sudden jumps in volume from a new domain, misleading subject lines, link shorteners, image-only emails, and recipients who never engage or who mark messages as spam.",
          "Warming up a new domain, cleaning bounced addresses and making it easy to unsubscribe all help. None of these show up in DNS, so a clean DNS result is the start of a diagnosis rather than the end of it.",
        ],
      },
      {
        heading: "Do not forget the receiving side",
        body: [
          "Sometimes the spam folder is the recipient's own rule. A corporate filter may be stricter than a consumer inbox, and a single user's earlier spam reports affect how a provider treats your future mail to them.",
          "If only one recipient or one provider has the problem, test sending to a different address before editing your DNS.",
        ],
      },
      {
        heading: "Order of operations when you are stuck",
        body: [
          "First prove authentication with a real message, not just DNS. Send yourself a test, open the full headers and look for SPF, DKIM and DMARC results. Records existing in DNS and messages passing are related but not the same thing.",
          "Second, change one variable at a time. If you fix DNS and rewrite the email in the same hour, you will not know which one helped.",
          "Third, give changes time. Reputation recovers gradually, so expect days rather than minutes after you correct the underlying problem.",
          "Keep expectations realistic. No DNS setting can force a message into the inbox, and anyone promising that is overstating what authentication does. It removes obvious reasons for distrust and lets content and engagement count.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open the Email DNS Checker and enter your sending domain.",
        "Add the DKIM selector if you know it from a message header.",
        "Run the check and read the SPF, DKIM and DMARC rows first.",
        "Open the raw records and confirm there is one SPF record, a DKIM key beginning with v=DKIM1, and a DMARC record with a p= value.",
        "Fix any Missing row, wait for the TTL and run the check again.",
      ],
      note: "The checker does not send test emails or check blocklists, so it can confirm your records exist but not where a message will land. The temporary inbox can receive a test message for a low-risk check, but it cannot send.",
    },
    cta: { label: "Audit your DNS records", href: DNS },
    takeaway:
      "Make authentication boring and correct first. If spam placement continues, look at content, list quality and reputation next.",
  },
  {
    slug: "how-to-set-up-spf-dkim-and-dmarc-for-a-new-domain",
    title: "How to Set Up SPF, DKIM and DMARC for a New Domain",
    description:
      "Step-by-step setup of SPF, DKIM and DMARC for a new domain, in the right order, with verification at each step and a safe starting DMARC policy.",
    readTime: "5 min read",
    quickAnswer:
      "Add your provider's MX records, publish one SPF TXT record, enable DKIM signing and publish its key, then add a DMARC record starting at p=none. Verify each record in DNS before moving on, and tighten DMARC later.",
    intro: [
      "A new domain has no reputation, so authentication matters from the first message. The records are simple. What causes trouble is doing them in the wrong order, publishing two of the same record, or skipping verification.",
      "Follow this sequence and you will have a working baseline in under an hour, plus the waiting time for DNS to refresh.",
    ],
    sections: [
      {
        heading: "Before you start: gather what you need",
        body: [
          "You need access to the zone where the domain's nameservers actually point. Editing a different DNS panel does nothing. You also need a list of every service that will send as the domain: your mailbox provider, plus any newsletter, CRM or help desk tool.",
          "Each service documents its own SPF include and DKIM records. Use those exact values, not examples from a blog.",
        ],
      },
      {
        heading: "The setup checklist",
        body: ["Do these in order and check after each."],
        bullets: [
          "Publish the MX records from your mailbox provider, using their hostnames and priorities.",
          "Create a single TXT record on the root starting with v=spf1 and add one include per sending service.",
          "End the SPF record with ~all while you confirm all senders are listed.",
          "In your mailbox provider's admin console, generate the DKIM key and note the selector it uses.",
          "Publish the DKIM record exactly as given, as a TXT or CNAME at selector._domainkey, then enable signing.",
          "Repeat the DKIM step for every other sending service, each with its own selector.",
          "Publish a TXT record at _dmarc with v=DMARC1; p=none and a rua address you can read.",
          "Send test messages to an address you control and inspect the headers for pass results.",
          "After a few weeks of clean reports, move DMARC to quarantine and later reject.",
        ],
      },
      {
        heading: "Mistakes that break a new setup",
        body: [
          "Adding a second SPF record for a new service rather than editing the existing one is the classic. Another is publishing DKIM but never turning signing on in the sending service, so the key exists while messages go out unsigned.",
          "People also paste long DKIM values into a DNS panel that adds quotes or splits the string badly, or forget that some panels append the domain automatically so the record name ends up doubled.",
          "Jumping straight to p=reject on day one is the last one. You cannot yet know which senders pass.",
        ],
      },
      {
        heading: "How long until it works?",
        body: [
          "New records often appear within minutes, but resolvers that cached a missing answer may hold it for the negative caching time. Changing an existing record is limited by its old TTL.",
          "Wait before concluding a record is wrong, then check again. If it is still missing long after that, look at which nameservers actually serve the domain.",
        ],
      },
      {
        heading: "Domains that do not send mail",
        body: [
          "If a domain will never send email, say so in DNS. Publish a v=spf1 -all record, and a DMARC record with a strict policy, so nobody can easily spoof it. Parked and old domains are a favorite target for impersonation.",
          "If you also run a separate sending subdomain, give it its own SPF and DKIM. That isolates its reputation and its lookup budget from your main domain.",
          "Finally, write down what you published and where. A short note listing each service, its selector and the date you added it makes later audits, provider changes and troubleshooting far faster, especially if someone else takes over the domain.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "After each batch of DNS edits, open the Email DNS Checker and enter the new domain.",
        "Add the DKIM selector from your provider's console in the optional selector field.",
        "Run the check and confirm that MX, SPF, DKIM and DMARC all show Found.",
        "Read each raw record and compare it to your provider's instructions character by character.",
        "If a row is Missing, wait for the TTL, check the record name for a doubled domain and run it again.",
      ],
      note: "The checker confirms the records exist. It does not send a test email, so also send a real message and read its headers, and it does not read DMARC reports or count SPF lookups.",
    },
    cta: { label: "Verify your new records", href: DNS },
    takeaway:
      "MX, one SPF record, DKIM signing on, DMARC at none. Verify each in DNS, then tighten with real data.",
  },
  {
    slug: "email-bounce-codes-explained",
    title: "Email Bounce Codes Explained (550, 5.7.1, 5.1.1)",
    description:
      "Understand email bounce codes such as 550, 5.7.1 and 5.1.1: what each number means, what causes it, and which DNS or address fix to try first.",
    readTime: "5 min read",
    quickAnswer:
      "A bounce code has a basic SMTP reply such as 550 and often an enhanced status such as 5.1.1. Codes starting with 4 are temporary and retried, codes starting with 5 are permanent. The enhanced code and the text next to it tell you the real cause.",
    intro: [
      "Bounce messages look like noise, but they follow a structure. Once you know how to read the numbers, most bounces tell you exactly what to fix.",
      "Wording differs between providers, so use the text as the final evidence and treat the codes as the map.",
    ],
    sections: [
      {
        heading: "How to read a bounce code",
        body: [
          "The first digit of the basic reply is the class. A 4 means a temporary failure and the sending server will usually retry for a while. A 5 means a permanent failure and the sender stops trying.",
          "The enhanced status has three parts, class, subject and detail, for example 5.1.1. The subject groups causes: 1 is addressing, 2 is the mailbox, 3 is the mail system, 4 is network, 5 is protocol and 7 is security or policy.",
        ],
      },
      {
        heading: "550 and 5.1.1: the address problem",
        body: [
          "A 550 reply is a general permanent failure. Paired with 5.1.1 it normally means the recipient address does not exist. The cause is a typo, a deleted account or a domain that has moved.",
          "The fix is on the address side, not in DNS. Confirm the spelling with the person and remove dead addresses from your lists so repeated bounces do not hurt your reputation.",
        ],
      },
      {
        heading: "5.7.1: the policy and authentication problem",
        body: [
          "A 5.7.1 means the message was refused for a policy reason. The text matters here. It may say the sender is not authorized, that SPF or DMARC failed, that the sending IP is blocked, or that the recipient does not accept mail from outside.",
          "When the text mentions authentication, check SPF, DKIM and DMARC for your sending domain. When it mentions reputation or a block, DNS will not fix it and you need to follow the receiving provider's guidance.",
        ],
      },
      {
        heading: "What to do for each kind of bounce",
        body: ["Match the symptom to the action."],
        bullets: [
          "5.1.1 or 550 user unknown: correct the address or remove it from your list.",
          "5.1.2 or bad destination domain: check the domain spelling and that its MX records exist.",
          "5.2.2 or mailbox full: ask the recipient to free space, or retry later.",
          "5.7.1 with authentication text: verify SPF, DKIM and DMARC and make sure one aligns.",
          "5.7.1 with block or reputation text: follow the receiver's delisting or support process.",
          "4.x.x temporary codes: wait, since the server will retry, and investigate only if the delay continues.",
          "5.3.4 or message too big: shrink the attachment or share a link.",
          "Unclear text: send the full bounce to your mail provider's support with the original headers.",
        ],
      },
      {
        heading: "Soft bounces, hard bounces and what to do next",
        body: [
          "A hard bounce is permanent, such as an address that does not exist. Stop sending to it. A soft bounce is temporary, such as a full mailbox or a busy server, and is worth retrying a few times.",
          "Repeated soft bounces to the same address eventually deserve the same treatment as a hard one, since the mailbox may be abandoned. Keeping your list clean protects your sender reputation.",
          "Some providers return custom text that does not match the standard code exactly. When the two disagree, trust the text and consult that provider's documentation or support.",
          "When you contact support, include the full bounce text, the time of the failure, the sender and recipient addresses, and the original message headers. Those four details let them find the exact log entry quickly.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Read the bounce and note the code and the exact reason text.",
        "If the code is 5.1.2 or the text says the domain cannot be found, open the Email DNS Checker and enter the recipient's domain.",
        "Run the check and confirm the MX row is Found. Missing suggests the domain cannot receive mail.",
        "For a 5.7.1 that mentions SPF, DKIM or DMARC, enter your own sending domain and, if known, your DKIM selector.",
        "Read the SPF, DKIM and DMARC rows and fix any Missing record or duplicate SPF entry.",
      ],
      note: "The checker does not read your bounce, check whether a mailbox exists or look at blocklists. It covers the DNS records behind some bounces, not address-level or reputation causes.",
    },
    cta: { label: "Check the domain's records", href: DNS },
    takeaway:
      "The first digit says temporary or permanent, the second part says why. Match the code to its fix instead of re-sending blindly.",
  },
  {
    slug: "how-to-check-email-dns-records-with-instant-mail",
    title: "How to Check Email DNS Records With Instant Mail",
    description:
      "A walkthrough of the Instant Mail Email DNS Checker: what to enter, how to read Found and Missing, and what the tool does not check.",
    readTime: "5 min read",
    quickAnswer:
      "Open the Email DNS Checker, enter a domain and an optional DKIM selector, and run the check. It returns Found or Missing for MX, SPF, DMARC and, if you gave a selector, DKIM, along with the raw records it received.",
    intro: [
      "Email DNS is spread across several record types and names, which makes manual lookups tedious. A checker puts the four that matter for deliverability in one result.",
      "This is a practical tour of what it takes as input, how to interpret the output and where its limits are, so you do not read more into a result than it supports.",
    ],
    sections: [
      {
        heading: "What the checker looks up",
        body: [
          "It queries four things for the domain you enter. MX records show where mail is delivered. SPF is the TXT record that starts with v=spf1. DMARC is the TXT record at _dmarc.yourdomain. DKIM is the TXT record at selector._domainkey.yourdomain, and it is only checked when you provide a selector.",
          "The lookups use Cloudflare DNS over HTTPS, so you see what a public resolver returns, which is useful because it is what outside servers are likely to see.",
        ],
      },
      {
        heading: "How to read Found and Missing",
        body: [
          "Found means the lookup returned a matching record, and the raw value is shown so you can inspect it. Missing means no matching record came back from that resolver at that moment.",
          "Missing does not always mean never published. A recent change may not have propagated, the record may live under a different name, or a typo in the domain or selector may be the reason. Check the spelling, wait out the TTL and run it again before editing anything.",
        ],
      },
      {
        heading: "A routine for checking any domain",
        body: ["This takes about two minutes and works for your own domain or one you manage."],
        bullets: [
          "Type the bare domain, such as example.com, without a scheme or path.",
          "Add the DKIM selector if you know it, taken from the s= tag in a message's DKIM-Signature header.",
          "Run the check and look at all rows before changing anything.",
          "For MX, confirm hostnames and priorities match your mail provider's documentation.",
          "For SPF, make sure only one v=spf1 record appears and that it ends sensibly.",
          "For DMARC, identify the p= value and whether a reporting address is set.",
          "For DKIM, confirm the record begins with v=DKIM1 and has a complete p= key.",
          "After any DNS change, wait for the TTL and run the check again to confirm.",
        ],
      },
      {
        heading: "What the checker does not do",
        body: [
          "It does not send test emails, so it cannot show whether a message lands in the inbox, in spam or nowhere. It does not validate SPF lookup counts, so a record with too many includes will still show Found. It does not read DMARC reports, and it does not check blocklists.",
          "Use it as the quick DNS layer of a diagnosis, then combine it with bounce messages, message headers and your provider's own tools for the rest.",
        ],
      },
      {
        heading: "Reading the raw records",
        body: [
          "The raw value is the most useful part of the result. For SPF look for a single string beginning with v=spf1. For DMARC read the p= value and any rua address. For DKIM confirm that p= is long and unbroken. For MX read the priority number and the hostname.",
          "If a value looks odd, compare it with the instructions from your provider. Extra quotes, line breaks, missing characters or a doubled domain are all easy to spot when the record is laid out in front of you.",
          "Finally, repeat the check after every DNS change and keep the raw values somewhere safe. Comparing before and after makes it obvious what an edit really changed, and it gives you something concrete to show a support team.",
        ],
      },
    ],
    demo: {
      heading: "Try it with Instant Mail",
      steps: [
        "Open the Email DNS Checker from the Tools section.",
        "Enter the domain you want to inspect in the domain field.",
        "If you have a DKIM selector, enter it in the optional selector field.",
        "Run the check and wait for the result rows to appear.",
        "Read the Found or Missing label for MX, SPF, DMARC and DKIM.",
        "Open the raw records under each row to see the exact values returned.",
        "Fix anything Missing in your DNS panel and run the check again after the TTL.",
      ],
      note: "Instant Mail's temporary inbox can receive test messages for low-risk checks, but it is receive-only and cannot send mail, so it is not a substitute for a real sending test.",
    },
    cta: { label: "Open the DNS checker", href: DNS },
    takeaway:
      "Four lookups, one screen, and a clear idea of what is and is not tested. Use it first, then dig deeper where the result points.",
  },
];
