/**
 * Verifies the lead path, on the architecture this site actually uses.
 *
 * Delivery is the Follow Up Boss Pixel and nothing else — a deliberate choice
 * (fully static, no server-side component, see FOLLOW-UP-BOSS.md). That choice
 * has one hard consequence: **the site cannot tell you whether a lead arrived.**
 * The Pixel is a third-party script in the visitor's browser; it reports
 * nothing back, and whether it creates a person record depends on a dashboard
 * setting no code can read.
 *
 * So this checks the half that IS checkable — everything up to the moment the
 * data leaves the browser:
 *
 *   1. the Pixel snippet is on the page
 *   2. the remote tracker actually LOADED (not merely requested — an ad
 *      blocker leaves the stub in place and the queue unflushed)
 *   3. a real `submit` event fires on a real <form> with real inputs, which is
 *      the Pixel's whole prerequisite
 *   4. the hidden fields it reads are populated, and with what
 *   5. the request to widgetbe.com is actually attempted
 *   6. the visitor is told the truth either way
 *
 * If all six pass, the browser has done its job. Anything after that is
 * Follow Up Boss's, and the only way to confirm it is step 7 below — which a
 * human has to do, once, by looking in the CRM.
 *
 * NOTHING IS SENT. Every request to widgetbe.com and to any relay is aborted,
 * and the test data is unmistakable, so this cannot create a person record or
 * contact anybody.
 *
 * Usage: npm run build && npm run preview, then
 *          node verify-lead-path.mjs [baseUrl]
 */
import { chromium } from 'playwright';
import { assertBuild } from './assert-build.mjs';

const BASE = process.argv[2] || 'http://localhost:4321';
await assertBuild(BASE);

/* Unmistakable, and the email domain is reserved by RFC 2606 so it can never
   reach a real inbox even if something leaked. */
const TEST = {
  firstName: 'AUTOMATED',
  lastName: 'TEST-DO-NOT-CONTACT',
  /* The schedule form takes one name field where the inquiry form takes two. */
  fullName: 'AUTOMATED TEST-DO-NOT-CONTACT',
  email: 'lead-path-test@example.invalid',
  phone: '3055550100',
};

/* The two forms carry different hooks — `data-lead-form` and
   `data-schedule-form`. Worth noting rather than normalising: they are two
   components with a largely duplicated script, which is its own open item. */
const FORMS = [
  { label: 'Inquiry (homepage #inquire)', path: '/', sel: '[data-lead-form]' },
  { label: 'Schedule a presentation', path: '/schedule-virtual-tour/', sel: '[data-schedule-form]' },
];

const browser = await chromium.launch();
let failures = 0;

for (const form of FORMS) {
  for (const blocked of [false, true]) {
    const label = `${form.label} · tracker ${blocked ? 'BLOCKED' : 'loading'}`;
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1400 } });
    const page = await ctx.newPage();

    const attempts = [];
    /* NOTHING REACHES widgetbe.com in either case.
       -----------------------------------------------------------------------
       For the "blocked" case we abort, which is what an ad blocker does. For
       the "loading" case we FULFIL with a stand-in that does what the real
       agent does — replace the stub and drain its queue — because letting the
       genuine script load would send a pageview, and on submit an /identify
       carrying the test email. A verification script must not be able to put
       anything into the CRM. */
    await page.route('**widgetbe.com/**', (r) => {
      attempts.push(r.request().url());
      if (blocked) return r.abort();
      return r.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: `(function(){
          var q = (window.widgetTracker && window.widgetTracker.q) || [];
          window.widgetTracker = function(){ /* stand-in: accepts and discards */ };
          window.__trackerCalls = q.slice();
        })();`,
      });
    });
    await page.route('**api.web3forms.com/**', (r) => {
      attempts.push('RELAY ' + r.request().url());
      return r.abort();
    });

    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e).split('\n')[0]));

    await page.goto(BASE + form.path, { waitUntil: 'networkidle' });
    /* Give the real tracker time to replace the stub when it is not blocked —
       the stub/loaded distinction is the whole point of case 2. */
    await page.waitForTimeout(blocked ? 500 : 3000);

    const pixel = await page.evaluate(() => {
      const t = window.widgetTracker;
      return {
        snippet: typeof t === 'function',
        stubQueueSurvives: typeof t === 'function' && Array.isArray(t.q),
        tracker: window.WidgetTrackerObject ?? null,
      };
    });

    const formSel = form.sel;
    await page.evaluate((s) => document.querySelector(s)?.scrollIntoView(), formSel);

    /* Fill only the fields this form actually has. */
    for (const [name, value] of Object.entries(TEST)) {
      const el = await page.$(`${formSel} input[name="${name}"]`);
      if (el) await el.fill(value);
    }
    const consent = await page.$(`${formSel} input[name="consent"]`);
    if (consent) await consent.check();

    /* Required radio GROUPS. The schedule form has two — presentation method
       and preferred time — and leaving either unchecked fails validation
       silently from a script's point of view: no success, no error, because the
       submit handler returns early after focusing the offending field. */
    const radioGroups = await page.evaluate((s) => {
      const f = document.querySelector(s);
      const names = new Set();
      f.querySelectorAll('input[type="radio"][required]').forEach((r) => names.add(r.name));
      return [...names].filter(
        (n) => !f.querySelector(`input[type="radio"][name="${n}"]:checked`),
      );
    }, formSel);
    for (const name of radioGroups) {
      await page.check(`${formSel} input[type="radio"][name="${name}"]`);
    }

    /* Anything still required and empty — the schedule form has a date. */
    const stillEmpty = await page.evaluate((s) => {
      const f = document.querySelector(s);
      return [...f.querySelectorAll('[required]')]
        .filter((el) => el.type !== 'checkbox' && el.type !== 'radio' && !el.value)
        .map((el) => ({ name: el.name, type: el.type }));
    }, formSel);
    for (const field of stillEmpty) {
      if (field.type === 'date') {
        const d = new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10);
        await page.fill(`${formSel} [name="${field.name}"]`, d);
      } else {
        await page.fill(`${formSel} [name="${field.name}"]`, 'TEST');
      }
    }

    /* What the Pixel will read, captured BEFORE submit. */
    const hidden = await page.evaluate((s) => {
      const f = document.querySelector(s);
      return Object.fromEntries(
        [...f.querySelectorAll('input[type="hidden"]')]
          .filter((i) => i.name !== '_gotcha')
          .map((i) => [i.name, i.value]),
      );
    }, formSel);

    let submitFired = false;
    await page.evaluate((s) => {
      document.querySelector(s).addEventListener('submit', () => {
        window.__submitFired = true;
      });
    }, formSel);

    await page.click(`${formSel} button[type="submit"]`);
    await page.waitForTimeout(1500);
    submitFired = await page.evaluate(() => window.__submitFired === true);

    const shown = await page.evaluate((s) => {
      const f = document.querySelector(s);
      const ok = f.parentElement?.querySelector('[data-form-success]');
      const err = f.querySelector('.form__status');
      return {
        success: !!(ok && !ok.hidden),
        error: !!(err && !err.hidden),
        message: (err?.textContent ?? '').trim(),
      };
    }, formSel);

    /* What SHOULD happen: loaded tracker → success; blocked → honest failure. */
    const expectSuccess = !blocked;
    const problems = [];
    if (!pixel.snippet) problems.push('Pixel snippet is not on the page');
    if (!blocked && pixel.stubQueueSurvives) problems.push('tracker never replaced its stub');
    if (!submitFired) problems.push('no submit event fired — the Pixel has nothing to read');
    if (!hidden.name) problems.push('hidden `name` not populated');
    if (!hidden.message) problems.push('hidden `message` not populated');
    if (hidden.message && !/Consent given: Yes/.test(hidden.message)) {
      problems.push('consent is not recorded in the message');
    }
    if (!shown.success && !shown.error) {
      const blockedBy = await page.evaluate((s) => {
        const f = document.querySelector(s);
        return [...f.querySelectorAll('[aria-invalid="true"]')].map((el) => el.name);
      }, formSel);
      problems.push(
        blockedBy.length
          ? `validation blocked the submit: ${blockedBy.join(', ')}`
          : 'neither success nor error was shown',
      );
    } else if (shown.success !== expectSuccess) {
      problems.push(
        expectSuccess
          ? 'no success shown while the tracker was available'
          : 'SUCCESS SHOWN WITH NO DELIVERY PATH — the visitor was misled',
      );
    }
    if (errors.length) problems.push(`JS errors: ${errors.join(' | ')}`);

    if (problems.length) failures++;
    console.log(`\n${problems.length ? '✗' : '✓'} ${label}`);
    console.log(`    snippet=${pixel.snippet} loaded=${!pixel.stubQueueSurvives} submit=${submitFired}`);
    console.log(`    shown: ${shown.success ? 'success' : shown.error ? 'error' : 'nothing'}`);
    if (shown.message) console.log(`    "${shown.message.slice(0, 90)}…"`);
    console.log(`    widgetbe attempts: ${attempts.length}`);
    for (const p of problems) console.log(`    ✗ ${p}`);

    /* Print the payload once — this is what a human compares against the CRM. */
    if (!blocked && formSel === '[data-schedule-form]') {
      console.log('\n    ── what Follow Up Boss will receive ──');
      for (const [k, v] of Object.entries(hidden)) {
        console.log(`    ${k}:`);
        for (const line of String(v).split('\n')) console.log(`        ${line}`);
      }
    }

    await ctx.close();
  }
}

await browser.close();

console.log(`
${failures ? `✗ ${failures} case(s) failed` : '✓ the browser half of the lead path is sound'}

STEP 7 — THE HALF NO SCRIPT CAN CHECK
  Everything above stops at the edge of the browser. Whether a person record is
  actually created depends on form capture being enabled in Follow Up Boss
  (Pixel → Tracking), which nothing here can read.

  Confirm it once, by hand:
    1. Enable form capture in Follow Up Boss.
    2. Build WITHOUT review mode — the GitHub Pages deploy omits the Pixel on
       purpose, so testing there proves nothing:
           npm run build && npm run preview
    3. Submit the Inquiry form with your own email.
    4. In Follow Up Boss, confirm the person exists AND that the note carries
       the residence, the appointment details and "Consent given: Yes".
       A person with an empty note means capture is on but the message field is
       not being read — tell someone, because that is where everything except
       name, email and phone lives.

  Re-check after any change to the forms, the Pixel snippet, or FUB's settings.
`);

process.exit(failures ? 1 : 0);
