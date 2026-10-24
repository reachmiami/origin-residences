# Follow Up Boss — lead delivery

## STATUS — what works today, and what you must do

Last verified 2026-10-23, against the shipped bundle and a live browser.

### The architecture, decided

**Pixel only. Fully static, no server-side component.** Asked directly, the
owner chose this over a serverless endpoint holding an API key.

What that buys: nothing to run, nothing to maintain, no secret to protect, and
visit-history attribution the API cannot provide.

What it costs, recorded so nobody rediscovers it as a surprise:

- **Delivery is unverifiable from here.** The Pixel is a third-party script in
  the visitor's browser; it reports nothing back. Whether a person record is
  created depends on a dashboard setting no code can read.
- **Ad-blocked visitors cannot convert through the form.** NOW MEASURED, not
  assumed: `||widgetbe.com^` is rule 3995 of **EasyPrivacy**, which blocks the
  whole domain and is enabled **by default** in uBlock Origin, AdGuard and
  Brave Shields. It is not on EasyList, Peter Lowe's list, uBlock's own
  privacy/badware lists, or Disconnect — and nothing else in this site's stack
  is on any of them. widgetbe.com is the single blocked host.
  Those visitors are now told to call instead — honest, but a lost conversion,
  and this is the first failure a real tester hit (see the log below).
- **That loss is unmeasurable on this stack.** No backend, no analytics by
  design, and the blocked thing is the Pixel itself.
- **The note's layout is Follow Up Boss's, not ours.** Observed on two live
  leads (see "How Follow Up Boss builds the note" below). We control the
  message body verbatim; the field summary FUB appends after it — and the
  fact that it repeats the message inside that summary — cannot be changed
  from the page.
- **The public tracker ID is a write path.** Anyone can POST to widgetbe with
  `WT-FBRKNWTI`, bypassing the honeypot and validation, and inject person
  records that trigger real calls and texts. Mitigation is FUB-side: lead-source
  filtering and monitoring.

A relay (`PUBLIC_FORM_RELAY_KEY`) remains available and is **not** the thing
that was declined — it is a hosted third-party endpoint, not code to run, and
it is the only way to make delivery verifiable on a static site. One
environment variable if that trade ever looks worth it.

### The two paths

| | Verifiable? | State |
| --- | --- | --- |
| **FUB Pixel** (`WT-FBRKNWTI`) | No | **VERIFIED END TO END 2026-10-23** — a real submission created a person record in Follow Up Boss. Works for every visitor whose browser allows widgetbe.com, and for nobody else. |
| **Relay** (`PUBLIC_FORM_RELAY_KEY`) | **Yes** — returns an HTTP status | **Not configured.** No key is set, so this path is compiled out of the bundle entirely. Verified working when one is set; see below. |

### Log — the first live test, 2026-10-23

The owner enabled form capture and submitted the Inquiry form on a local
production build. They got the undelivered message: *"We could not send your
message. Please call…"*

Diagnosis, in order:

1. The real widgetbe.com agent was fetched from this machine and **replaces its
   stub within 250ms** — so `pixelLoaded()` is not broken and this was not a
   slow-connection false failure.
2. `widgetbe.com` is on EasyPrivacy, enabled by default in the common blockers.
3. Therefore: the tester's own browser blocked the Pixel. The site behaved
   **correctly** — it refused to claim a lead had arrived when it had not.

This is the architecture's recorded cost arriving on day one, not a defect.
The honest-failure work in Phase 1 is the only reason it was visible at all;
before it, this submission would have shown a success panel and vanished.

4. **Retested with blocking off — the lead arrived in Follow Up Boss.** So form
   capture is on and working, and the Pixel is a real delivery path. This was
   the single unverifiable assumption the architecture rested on, and it now
   has one confirming observation behind it.

What that does and does not settle: the mechanism works. It still only works
for visitors who allow widgetbe.com, and the site still cannot tell you which
visitor is which. Both facts are unchanged by this test.

**The relay was then verified** (build with a key, both `widgetbe.com` and the
relay intercepted so nothing was sent):

- Pixel blocked → relay carries the lead, form shows success, and the email
  leads with *"THIS EMAIL IS THE ONLY COPY OF THIS LEAD… Enter it in Follow Up
  Boss by hand"*, plus a row `Also In Follow Up Boss: NO — Pixel blocked`.
- Pixel loaded → relay carries a copy, and says so, so nobody double-enters.

That second message used to be a flat assertion that the Pixel had captured the
lead. It was false in precisely the case where the email is the only copy, and
would have sent the sales director to look in FUB for a lead that was not
there. Fixed in `src/scripts/leads.ts`.

### Log — the note format, 2026-10-24

The first live lead's note was nearly unreadable — `Buyer: Buyer`, the whole
TCPA paragraph used as a key with the value `on`, a stray leading `on` — and,
worse, **none of the context arrived**: no residence, no source page, no
consent record. FUB ignores `type="hidden"` inputs, and the message was one.

Fix: the message became a visually hidden `<textarea>`, the consent box got a
short `Terms of Use` label with `value="Accepted"`, and the type radio sends
`Yes`. **Retested with a real submission — the hypothesis held.** FUB reads
the textarea, and the consent record (`Consent given: Yes`, timestamp,
`CONSENT_VERSION`) is now attached to the person in the CRM for the first
time.

### How Follow Up Boss builds the note

Measured from the retest, not inferred. A note has three parts, in order:

```
via: <host the form was on>                      ← FUB's own header
Buyer: Yes                                        ┐
First name: …                                     │ the `message` field,
…                                                 │ verbatim, newlines kept —
Terms of Use: Accepted                            │ the ONLY part we control
                                                  │
Language: en                                      │
Source page: …                                    │
Consent given: Yes (<ISO time>, text <version>)   ┘
Buyer: Yes | First name: … | … | message: Buyer: Yes … ← FUB's summary of
                                                        EVERY field
```

- The summary is `<label>: <value>` pairs joined by ` | `. An unlabelled
  field is keyed by its `name` — hence `message:`.
- The summary includes the message field itself, so the body appears twice.
  That is inherent to sending a message at all; it is not a bug to chase.
- Skipped: `type="hidden"` inputs (so the hidden `name` never appears),
  unchecked radios, and empty fields (so the `_gotcha` honeypot is invisible).
- A checkbox or radio with no `value` sends `on`; a radio is keyed by its
  option's label, not the group's legend.

### Checking it

`npm run verify:leads` (against `npm run preview`) exercises both forms with the
tracker loading and with it blocked, and prints the exact payload Follow Up Boss
will receive. It sends nothing — requests to widgetbe.com are intercepted, and
the loaded case is simulated rather than fetched, so it cannot create a person
record or contact anybody.

It checks the browser half only. Step 2 below is the half no script can reach.

### What you must do, in order

1. ~~Turn on form capture~~ — **done 2026-10-23** (Follow Up Boss → Pixel →
   Tracking). Nothing in the browser can see this setting; if leads ever stop
   arriving, check it first.

2. ~~Submit a real test lead~~ — **done 2026-10-23/24**, and repeat it after any
   change to the forms, the Pixel snippet or FUB's settings. Use a build with
   `REVIEW_DEPLOY` unset (`npm run build && npm run preview`; the review deploy
   omits the Pixel) and your ad blocker OFF. Confirm the person exists **and**
   the note body carries the residence, the appointment details and
   `Consent given: Yes`.

3. **Decide whether to set `PUBLIC_FORM_RELAY_KEY`** — the owner's call, open
   item 1 in `HANDOFF.md`. It is the only part of the pipeline that
   can confirm delivery. A relay key is a UUID and is safe to publish — it can
   accept a form post and cannot read your CRM; `scripts/check-env.mjs` rejects
   anything that looks like an API key instead. Point the relay at the sales
   director's inbox and **never at the account's @followupboss.me address**,
   which would have FUB parse a submission the Pixel already captured and
   create a duplicate person for every lead.

   Without it, anyone running an ad blocker now gets "we could not send your
   message, please call" — honest, but a lost conversion the relay would save.

### What the code does now

`submitLead` **can fail, and says why.** It used to be `return {ok: true}` with
the lead never read, so the failure branch was unreachable and both forms
showed "successfully received" unconditionally.

- Relay configured → it is awaited and its result is the answer.
- No relay, Pixel loaded → optimistic success. This is the assumption the
  architecture rests on and it is now the only place one is made.
- No relay, Pixel not loaded → **failure, shown to the visitor** with the phone
  number and email.

"Pixel loaded" means the remote script actually arrived, not merely that the
snippet ran. Measured: a blocked tracker leaves a call queue on
`window.widgetTracker.q`; a loaded one replaces the stub and the queue is gone.
Ad-blocked visitors used to pass this check and lose their lead silently.

### Consent is now recorded

The checkbox was required, validated, read into the payload — and then dropped
before transmission. The only code that sent it was the relay, which was
compiled out. So the sales team called and texted on consent for which no
record existed anywhere, while the privacy policy told visitors it was sent.

The Pixel's message body now carries `Consent given: Yes`, an ISO timestamp,
and a version marker for the wording agreed to (`CONSENT_VERSION` in
`src/scripts/leads.ts` — **bump it when the consent copy changes**, because a
record that does not say what was agreed to proves little).

### Still open

- **The privacy policy contradicts the site.** It states "This Site sets no
  cookies and runs no analytics or advertising trackers" on pages that load
  widgetbe.com, and names neither Follow Up Boss nor widgetbe as a processor.
  That is a false published statement. It needs rewriting and a legal review.
- **The old FUB API key should be rotated** as hygiene. It never reached `dist/`
  or git history — verified — but it was pasted around.



The site sends leads to Follow Up Boss using the **Pixel with form capture**.
No API key, no relay service, no email forwarding, no webhooks.

---

## How it works

The Pixel is not only an analytics tag. With form capture switched on it reads
form submissions directly from the page, creates the person record, runs your
lead-flow rules and starts action plans. It detects name, email, phone and
message automatically.

```
  visitor submits the form
          │
          ▼
  Follow Up Boss Pixel  (reads the submission in the browser)
          │
          ▼
  person created · lead flow rules run · action plan starts
```

The site's own JavaScript only validates fields and shows the success state.
It sends nothing anywhere.

---

## Setup

**1. Install the Pixel.**
In Follow Up Boss: **Admin → Pixel**, copy the snippet. Paste it into
`src/components/FubPixel.astro`, between the marked comments. That file is
included in `<head>` on all 117 pages.

**2. Turn on form capture.**
In Follow Up Boss: **Pixel → Tracking**, enable form capture. Without this
step the Pixel tracks visits but creates no leads.

**3. Test on the deployed site.**
Submit the form and confirm a person appears in Follow Up Boss. Do this
**before** you rely on it — see the warning below.

That's the whole setup.

---

## Use exactly one ingestion method

Follow Up Boss's own guidance: if leads already arrive via API or email
parsing, leave form capture **off**. Running two methods creates a duplicate
person for every submission.

So with the Pixel doing the work:

- Do **not** add an API key anywhere.
- Do **not** forward form mail to your `@followupboss.me` address.
- Leave `PUBLIC_FORM_RELAY_KEY` unset in `.env`.

---

## The one real risk: silent failure

Pixel capture happens in the visitor's browser, so nothing on your side errors
if it stops working. The form still shows its success message and the lead
simply never arrives. For a development where a single lead is worth what
these are, that is the failure worth guarding against.

**Test after every deploy that touches the form**, and specifically re-test if
you ever move the form into an iframe — Follow Up Boss cannot read across an
iframe boundary when the Pixel sits outside it. Our form is inline, so this is
fine today.

If you'd rather have a belt-and-braces second path, the fallback below exists —
but only enable it knowing it will duplicate every lead unless you turn Pixel
form capture off first.

---

## Helping the Pixel read the form

`src/scripts/leads.ts` keeps two fields current as the visitor types:

- `name` — first and last combined, a hidden input. FUB ignores hidden inputs,
  so this is belt-and-braces; the visible first/last fields are what it reads.
- `message` — a **visually hidden `<textarea>`**, never a hidden input (FUB
  drops those — this is how every lead's context was lost until 2026-10-24).
  It becomes the note body: the contact lines in the owner's one-per-line
  layout, then the residence, presentation method, preferred date and time,
  language, source page and the consent record. Keep it off-screen with
  `.visually-hidden`; `display:none` or `hidden` may put it back in the
  ignored category.

They are updated on every keystroke rather than during submit, because the
Pixel reads the form when the submit event fires and listener order between
its script and ours is not guaranteed.

**If you rename a form field, check that `name`, `email` and `phone` still
exist** — those are what the Pixel matches on.

---

## Optional fallback (off by default)

Setting `PUBLIC_FORM_RELAY_KEY` to a relay UUID (Web3Forms, Formspree, Basin)
switches on a second path that emails the submission wherever the relay points.
It exists for the case where Pixel capture proves unreliable.

Only turn Pixel form capture **off** if you enable it, or you will get
duplicates.

---

## Never do this

A Follow Up Boss API key grants full read/write to your entire CRM. This is a
static site — every file it ships is readable by any visitor, and anything in a
`PUBLIC_*` variable is inlined into client JavaScript at build time.

**Never put a Follow Up Boss API key in `.env`, in `src/`, in `public/`, or in
any `PUBLIC_*` variable.** `scripts/check-env.mjs` runs before every build and
blocks it if a credential appears. If a key was ever pasted in, remove it and
rotate it in Follow Up Boss.

With the Pixel approach you never need the key at all.
