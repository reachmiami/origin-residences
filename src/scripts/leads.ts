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
 * That means this site needs NO API key, NO relay service and NO email step.
 * Our JavaScript only validates the fields and shows the success state — the
 * Pixel does the delivery. The one thing we must guarantee is that a real
 * `submit` event fires on a real <form> containing real inputs, which it does.
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
 * The copy is fire-and-forget: it can never fail a submission or show the
 * visitor an error, because the lead is already safely in FUB by then.
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
}

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
 * enquiry. These are hidden inputs inside the form, so they are part of the
 * form data the Pixel reads on submit.
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

  // Everything the Pixel will not map to a field of its own, gathered into the
  // message so it still reaches the lead record.
  const context = [
    lead.contactType && `Type: ${lead.contactType}`,
    lead.unit && `Residence: ${lead.unit}`,
    lead.presentationMethod && `Presentation: ${lead.presentationMethod}`,
    lead.preferredDate && `Preferred date: ${lead.preferredDate}`,
    lead.preferredTime && `Preferred time: ${lead.preferredTime}`,
    lead.message && `Comments: ${lead.message}`,
    `Language: ${lead.locale}`,
    `Source page: ${lead.pageTitle} (${lead.pageUrl})`,
  ]
    .filter(Boolean)
    .join('\n');

  setHidden('message', context);
}

/** Fallback transport. Only runs when a relay key is configured. */
async function deliverViaRelay(lead: LeadPayload): Promise<SubmitResult> {
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
  ];

  const res = await fetch(RELAY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: RELAY_KEY,
      subject: `${label[lead.source]} — ${name}`,
        message: [
        'Copy for the sales director. This lead was also captured in Follow Up Boss by the Pixel — work it in FUB, not from this email.',
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

export async function submitLead(lead: LeadPayload): Promise<SubmitResult> {
  /* The Pixel identifies the visitor itself on submit (verified: it POSTs to
     widgetbe.com/identify with the email), so there is nothing to call here. */

  /* The Pixel already captured this submission on the submit event, so the
     lead is in Follow Up Boss regardless of what happens below. The relay is
     only a courtesy copy to the sales director's inbox: if it fails we log it
     and still report success, because telling a visitor their enquiry failed
     when it did not would cost a real lead. */
  if (RELAY_KEY) {
    void deliverViaRelay(lead)
      .then((r) => {
        if (!r.ok) console.warn('[lead cc] copy to sales director failed:', r.error);
      })
      .catch((err) => console.warn('[lead cc] copy to sales director failed:', err));
  }

  return { ok: true };
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
    contactType: get('contactType'),
    firstName: get('firstName'),
    lastName: get('lastName'),
    fullName: get('fullName'),
    email: get('email') ?? '',
    phone: get('phone'),
    /* Deliberately NOT reading `message`: that hidden field is primeForPixel's
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
    consent: fd.get('consent') === 'on',
  };
}
