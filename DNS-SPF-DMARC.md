# SPF / DMARC setup for instantmail.online

These are DNS records and can't be applied from this repo — add them at your
DNS provider (wherever `instantmail.online` is managed: registrar, Cloudflare,
Vercel DNS, etc.). They protect `contact@instantmail.online` and the domain
itself from being spoofed in phishing email, and they're a ranking/trust
signal checked by mailbox providers and some crawlers.

## 1. SPF (Sender Policy Framework)

Declares which mail servers are allowed to send mail "from" your domain.
Add a TXT record at the apex (`instantmail.online`):

```
Type: TXT
Host: @
Value: v=spf1 include:_spf.<your-mail-provider>.com -all
```

Replace `include:_spf.<your-mail-provider>.com` with whatever sends mail for
`contact@instantmail.online` today (e.g. `include:_spf.google.com` for Google
Workspace, `include:spf.protection.outlook.com` for Microsoft 365). If nothing
sends mail from this domain currently, use a hard-fail SPF with no senders:

```
v=spf1 -all
```

This tells receivers "no server is authorized to send as this domain" and
blocks spoofing outright.

## 2. DMARC (Domain-based Message Authentication, Reporting & Conformance)

Add a TXT record at `_dmarc.instantmail.online`:

```
Type: TXT
Host: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:contact@instantmail.online; fo=1
```

- Start with `p=quarantine` (suspicious mail goes to spam, not rejected
  outright) for a few weeks while you confirm legitimate mail isn't affected.
- Move to `p=reject` once reports (`rua`) show no false positives — this is
  the strongest setting and fully blocks spoofed mail from being delivered.
- `rua=mailto:...` is where aggregate DMARC reports get sent so you can see
  who's sending mail as your domain.

## 3. DKIM

DKIM is provider-specific (each sending service generates its own DKIM key
pair and gives you a TXT record to publish). If you send transactional email
(e.g. contact form replies) through a provider, get the DKIM record from that
provider's dashboard and add it the same way as above — there's no
generic value to publish here.

## Verifying

After adding records, verify propagation:

```
dig TXT instantmail.online +short
dig TXT _dmarc.instantmail.online +short
```

Or use the site's own [Email DNS Checker tool](https://www.instantmail.online/tools/email-dns-checker).
