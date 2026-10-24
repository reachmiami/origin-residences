/**
 * LEAD DELIVERY
 * ============================================================================
 * Primary path: the FOLLOW UP BOSS PIXEL captures the form submission itself.
 *
 * The Pixel is not only a tracking script. With form capture enabled
 * (Pixel → Tracking in Follow Up Boss) it reads submissions directly from the
 * page, creates the person record, runs lead-flow rules and starts action
 * plans. It auto-detects name, email, phone and message.
 *
 * That means this site needs NO API key and NO server-side component. Our
 * JavaScript only validates the fields and shows the success state — the Pixel
 * does the delivery. The one thing we must guarantee is that a real `submit`
 * event fires on a real <form> containing real inputs, which it does.
 *
 * IT IS NOT, HOWEVER, SUFFICIENT ON ITS OWN. Measured 2026-10-23:
 * `||widgetbe.com^` is rule 3995 of EasyPrivacy, which blocks the entire
 * domain and ships ENABLED BY DEFAULT in uBlock Origin, AdGuard and Brave
 * Shields. For those visitors the remote script never arrives, no form capture
 * happens, and the Pixel is not a delivery path at all. Nothing else in this
 * site's stack is on that list — widgetbe.com is the only blocked host.
 *
 * So the Pixel is the primary path and a real one, but a predictable share of
 * an affluent, privacy-tooled audience cannot use it. That share is the
 * argument for the relay below, which is why `submitLead` prefers it.
 *
 * SECURITY: there is nothing secret here, and a Follow Up Boss API key must
 * never be added to this file, to any PUBLIC_* variable, or anywhere else in
 * src/ or public/. A static site cannot hold a secret. scripts/check-env.mjs
 * blocks the build if one appears.
 *
 * SECOND COPY: when PUBLIC_FORM_RELAY_KEY is set, each submission is also
 * emailed to the sales director. That relay must point at his own inbox and
 * NEVER at the account's @followupboss.me address — Follow Up Boss's guidance
 * is one ingestion method, and parsing an email the Pixel already captured
 * would create a duplicate person for every lead.
 *
 * It is AWAITED, not fire-and-forget, and its result is what the visitor is
 * told — see submitLead(). It was a courtesy copy when this file assumed the
 * lead was "already safely in FUB"; that assumption is the one thing here
 * nothing can check, and for a blocked visitor it is simply false.
 */

export type LeadSource = 'inquiry' | 'request-info' | 'schedule-presentation';

export interface LeadPayload {
  source: LeadSource;
  contactType?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  phone?: string;
  message?: string;
  presentationMethod?: string;
  preferredDate?: string;
  preferredTime?: string;
  unit?: string;
  pageUrl: string;
  pageTitle: string;
  locale: string;
  consent: boolean;
  /** ISO instant the form was submitted — the consent's timestamp. */
  consentAt: string;
}

/**
 * Bump when the consent wording in src/content/copy.ts changes.
 *
 * A consent record that does not say WHICH text was agreed to proves very
 * little. This is the cheapest version marker that survives a copy edit:
 * change the wording, change this.
 */
export const CONSENT_VERSION = '2026-10-tcpa-1';

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

/**
 * Secondary copy. When set, every submission is ALSO emailed to the sales
 * director. This is a CC, never the primary path — see submitLead().
 *
 * WHERE THE COPY GOES — set at the relay's dashboard, not here:
 *   while testing → reachmiami@gmail.com
 *   once verified → germanr.realty@gmail.com
 *
 * This is the DELIVERY destination and is deliberately separate from the
 * address DISPLAYED on the site, which is always German's.
 *
 * CRITICAL: never point the relay at the account's @followupboss.me lead
 * address. Follow Up Boss would parse a submission the Pixel already captured,
 * creating a duplicate person for every lead.
 */
const RELAY_KEY = import.meta.env.PUBLIC_FORM_RELAY_KEY as string | undefined;
const RELAY_ENDPOINT =
  (import.meta.env.PUBLIC_FORM_RELAY_ENDPOINT as string | undefined) ??
  'https://api.web3forms.com/submit';

/**
 * Give the Pixel the cleanest possible signal.
 *
 * Follow Up Boss matches on conventional field names, so alongside the visible
 * first/last inputs we set a combined `name` and a `message` describing the
 * enquiry.
 *
 * THE MESSAGE IS A <textarea>, NOT A HIDDEN INPUT. Observed 2026-10-23 on the
 * first live lead: FUB builds its note from `<label>: <value>` pairs of the
 * form's fields and IGNORES `type="hidden"` inputs. Everything below — the
 * residence, the source page and the whole consent record — was arriving
 * nowhere. A visually hidden textarea is the hypothesis that FUB skips hidden
 * INPUTS rather than hidden content; it must stay off-screen (.visually-hidden),
 * never `display:none` or `hidden`, either of which may land it back in the
 * ignored category. Confirmed or refuted only by a real submission — see
 * FOLLOW-UP-BOSS.md.
 *
 * It also carries the note's layout. FUB joins its own pairs with ` | ` and
 * nothing on the page can change that; newlines inside ONE value are the only
 * way to give the sales director the line-per-field block the owner asked for.
 */
export function primeForPixel(form: HTMLFormElement, lead: LeadPayload): void {
  const setHidden = (name: string, value: string) => {
    if (!value) return;
    let el = form.querySelector<HTMLInputElement>(`input[type="hidden"][name="${name}"]`);
    if (!el) {
      el = document.createElement('input');
      el.type = 'hidden';
      el.name = name;
      form.appendChild(el);
    }
    el.value = value;
  };

  const name =
    lead.fullName || [lead.firstName, lead.lastName].filter(Boolean).join(' ');
  setHidden('name', name);

  /* Everything the Pixel will not map to a field of its own, gathered into the
     message so it still reaches the lead record.

     CONSENT IS IN HERE, AND IT WAS NOT.
     -------------------------------------------------------------------------
     The checkbox was required, validated, and read into the payload — and then
     this array dropped it. The only code that ever transmitted it was the
     relay, which is compiled out whenever no key is set, so in practice the
     consent reached nobody. Meanwhile the privacy policy told visitors it was
     sent, and the sales team called and texted on the strength of it.

     In a TCPA dispute express written consent is the defendant's burden to
     prove. "The checkbox was required" is an assertion about the code; what is
     needed is a record attached to the person. So the timestamp and the
     version of the wording they actually agreed to travel with it — the
     wording changes, and "they consented" is worthless without knowing to
     what. */
  /* The owner's requested layout first, verbatim in shape:
       Buyer: Yes / First name / Last name / Email / Phone / Terms of Use: Accepted
     then a blank line and the context only this note carries. */
  const contact = [
    lead.contactType && `${lead.contactType}: Yes`,
    lead.fullName && `Name: ${lead.fullName}`,
    lead.firstName && `First name: ${lead.firstName}`,
    lead.lastName && `Last name: ${lead.lastName}`,
    lead.email && `Email: ${lead.email}`,
    lead.phone && `Phone: ${lead.phone}`,
    `Terms of Use: ${lead.consent ? 'Accepted' : 'Not accepted'}`,
  ];

  const context = [
    lead.unit && `Residence: ${lead.unit}`,
    lead.presentationMethod && `Presentation: ${lead.presentationMethod}`,
    lead.preferredDate && `Preferred date: ${lead.preferredDate}`,
    lead.preferredTime && `Preferred time: ${lead.preferredTime}`,
    lead.message && `Comments: ${lead.message}`,
    `Language: ${lead.locale}`,
    `Source page: ${lead.pageTitle} (${lead.pageUrl})`,
    `Consent given: ${lead.consent ? 'Yes' : 'No'} (${lead.consentAt}, text ${CONSENT_VERSION})`,
  ];

  const note = [...contact.filter(Boolean), '', ...context.filter(Boolean)].join('\n');

  let el = form.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
  if (!el) {
    el = document.createElement('textarea');
    el.name = 'message';
    // Global class (tokens.css): this element is created at runtime, so a
    // component's scoped styles would never reach it.
    el.className = 'visually-hidden';
    el.tabIndex = -1;
    el.setAttribute('aria-hidden', 'true');
    form.appendChild(el);
  }
  el.value = note;
}

/** Fallback transport. Only runs when a relay key is configured. */
async function deliverViaRelay(lead: LeadPayload): Promise<SubmitResult> {
  /* Whether the OTHER path ran, so the email can say which situation the sales
     director is in. Hoisted declaration, defined below. */
  const capturedByPixel = pixelLoaded();

  const name =
    lead.fullName || [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Website lead';

  const label: Record<LeadSource, string> = {
    inquiry: 'Website Inquiry',
    'request-info': 'Request More Information',
    'schedule-presentation': 'Private Presentation Request',
  };

  const rows: [string, string | undefined][] = [
    ['Name', name],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Type', lead.contactType],
    ['Residence', lead.unit],
    ['Presentation Method', lead.presentationMethod],
    ['Preferred Date', lead.preferredDate],
    ['Preferred Time', lead.preferredTime],
    ['Comments', lead.message],
    ['Language', lead.locale],
    ['Source Page', `${lead.pageTitle} — ${lead.pageUrl}`],
    ['Consent Given', lead.consent ? 'Yes' : 'No'],
    ['Also In Follow Up Boss', capturedByPixel ? 'Yes — captured by the Pixel' : 'NO — Pixel blocked, enter by hand'],
  ];

  const res = await fetch(RELAY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: RELAY_KEY,
      subject: `${label[lead.source]} — ${name}`,
      message: [
        capturedByPixel
          ? 'The Follow Up Boss Pixel was running when this was submitted, so this lead should also be in FUB. Work it there; this is a copy.'
          : 'THIS EMAIL IS THE ONLY COPY OF THIS LEAD. The Follow Up Boss Pixel was blocked in this visitor\'s browser (an ad blocker or a privacy browser), so no person record was created. Enter it in Follow Up Boss by hand.',
        '',
        ...rows.filter(([, v]) => v && String(v).trim()).map(([k, v]) => `${k}: ${v}`),
      ].join('\n'),
      from_name: 'Origin Residences Website',
      replyto: lead.email,
    }),
  });

  if (!res.ok) return { ok: false, error: `Relay responded ${res.status}` };
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
  return data.success === false ? { ok: false, error: data.message } : { ok: true };
}

/**
 * Has the Follow Up Boss Pixel actually LOADED — not merely been asked for?
 *
 * The inline loader in FubPixel.astro defines `window.widgetTracker`
 * synchronously as a stub that queues calls on `.q` until the remote script
 * arrives and replaces it. So the obvious check — "is widgetTracker a
 * function" — is true even when widgetbe.com never answered, which is the
 * common case: ad blockers and tracker-blocking browsers block that domain,
 * and those visitors' leads were silently vanishing.
 *
 * Measured, which is the only reason this is here:
 *
 *   remote loaded   → widgetTracker defined, `.q` GONE   (stub replaced)
 *   remote blocked  → widgetTracker defined, `.q` present, 2 calls queued
 *   snippet absent  → widgetTracker undefined
 *
 * So a surviving queue means the capture mechanism is not running.
 *
 * TWO LIMITS, BOTH DELIBERATE:
 *
 * It cannot see whether form capture is enabled in the Follow Up Boss
 * dashboard. Nothing in a browser can. That setting is the difference between
 * a pageview and a person record, and it is checked by submitting a real test
 * lead — see FOLLOW-UP-BOSS.md.
 *
 * It reads an implementation detail of someone else's loader, so a slow
 * connection where the script is still in flight at submit time will read as
 * "not loaded". That is a FALSE FAILURE, and it is the direction to fail in:
 * the visitor is told to call, having possibly also been captured. The
 * alternative — the behaviour this replaces — is a false success, where a lead
 * on a multi-million-dollar residence is destroyed and everyone is told it
 * arrived.
 *
 * The real answer to both limits is PUBLIC_FORM_RELAY_KEY. A relay returns an
 * HTTP status from a server that took the data, which is evidence rather than
 * inference, and `submitLead` prefers it whenever it is configured.
 */
function pixelLoaded(): boolean {
  const t = (window as unknown as { widgetTracker?: { q?: unknown } }).widgetTracker;
  if (typeof t !== 'function') return false;
  // A surviving queue means the remote script never replaced the stub.
  return !Array.isArray((t as { q?: unknown }).q);
}

/**
 * Submit a lead, and report HONESTLY on what happened to it.
 *
 * This used to be `return { ok: true }` with the payload never read. Not a
 * race or a degraded path — a constant. Both forms branch on it to show "we
 * have successfully received your form submission", so the failure branch was
 * unreachable code and a lead could vanish with the visitor thanked for it.
 *
 * Three outcomes now, in order of how much we can actually verify:
 *
 *   1. A relay is configured → await it. This is the only path that returns
 *      real evidence: an HTTP status from a server that took the data. Its
 *      result is the answer.
 *
 *   2. No relay, but the Pixel is on the page → optimistic success. The
 *      mechanism exists and fires on the submit event; whether the dashboard
 *      is set to create a person from it is not observable here. This is a
 *      genuine assumption and it is the one the architecture rests on.
 *
 *   3. No relay and no Pixel → FAILURE, reported. The lead has demonstrably
 *      nowhere to go. This is exactly the review deploy's configuration, where
 *      every submission was being destroyed while showing a success panel.
 *
 * The relay is awaited rather than fired-and-forgotten. It used to be a
 * courtesy copy on the reasoning that the lead was "already safely in FUB" —
 * which assumed the thing we cannot check. Waiting costs a moment and buys the
 * only certainty available.
 */
export async function submitLead(lead: LeadPayload): Promise<SubmitResult> {
  if (RELAY_KEY) {
    try {
      const relayed = await deliverViaRelay(lead);
      if (relayed.ok) return { ok: true };

      /* The relay failed. If the Pixel is present the lead may still have been
         captured, so do not tell the visitor it was lost — but say so loudly
         in the console, because this is the half we could have verified. */
      console.error('[lead] relay failed:', relayed.error);
      return pixelLoaded()
        ? { ok: true }
        : { ok: false, error: relayed.error ?? 'delivery failed' };
    } catch (err) {
      console.error('[lead] relay threw:', err);
      if (!pixelLoaded()) {
        return { ok: false, error: err instanceof Error ? err.message : 'delivery failed' };
      }
      return { ok: true };
    }
  }

  if (pixelLoaded()) return { ok: true };

  console.error(
    '[lead] NOTHING RECEIVED THIS SUBMISSION. No PUBLIC_FORM_RELAY_KEY is set, ' +
      'and the Follow Up Boss Pixel is not running on this page — either it was ' +
      'omitted (REVIEW_DEPLOY) or widgetbe.com was blocked. See FOLLOW-UP-BOSS.md.',
  );
  return { ok: false, error: 'no-delivery-configured' };
}

/** Collect a form's fields into the payload contract. */
export function payloadFromForm(
  form: HTMLFormElement,
  source: LeadSource,
  locale: string,
): LeadPayload {
  const fd = new FormData(form);
  const get = (k: string) => {
    const v = fd.get(k);
    return typeof v === 'string' && v.trim() ? v.trim() : undefined;
  };

  return {
    source,
    /* The radio's `value` is "Yes" because that is what FUB prints beside the
       option's label ("Buyer: Yes"). The TYPE itself lives in data-contact-type
       — reading `value` here would record every lead's type as "Yes". */
    contactType:
      form.querySelector<HTMLInputElement>('input[name="contactType"]:checked')?.dataset
        .contactType ?? get('contactType'),
    firstName: get('firstName'),
    lastName: get('lastName'),
    fullName: get('fullName'),
    email: get('email') ?? '',
    phone: get('phone'),
    /* Deliberately NOT reading `message`: that field is primeForPixel's
       OUTPUT. Reading it back here nested the previous value on every keystroke
       and grew the field without bound. Only real user input belongs here. */
    message: get('comments'),
    presentationMethod: get('presentationMethod'),
    preferredDate: get('preferredDate'),
    preferredTime: get('preferredTime'),
    unit: get('unit') ?? form.dataset.unit,
    pageUrl: window.location.href,
    pageTitle: document.title,
    locale,
    /* The checkbox carries value="Accepted" so FUB prints "Terms of Use:
       Accepted" instead of the browser default "on". Test the box, not a
       string: a value-only comparison silently recorded "No" the day the value
       changed. */
    consent: form.querySelector<HTMLInputElement>('input[name="consent"]')?.checked ?? false,
    /* Stamped when the payload is built, which is on submit — the moment the
       visitor actually agreed. Note this is the BROWSER's clock and so is not
       forensic evidence; it is a record, and a record is what was missing. */
    consentAt: new Date().toISOString(),
  };
}
