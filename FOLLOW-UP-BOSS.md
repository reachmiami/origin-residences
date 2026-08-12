# Follow Up Boss — lead delivery

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

`src/scripts/leads.ts` keeps two hidden inputs current as the visitor types:

- `name` — first and last combined, the shape Follow Up Boss matches on
- `message` — everything the Pixel has no field for: Buyer vs Broker, the
  residence, presentation method, preferred date and time, language, and the
  source page

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
