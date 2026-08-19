/**
 * measure-home-header.mjs — the homepage header, in the three states that have
 * silently broken before.
 *
 * The homepage header carries its own modifier (`.header--home`, historically
 * `.header--v2`), and every colour rule in it has to out-specify the SHARED
 * `.header.is-condensed` rules, which sit at the same specificity and apply
 * from 40px of scroll. A rule that forgets to name `.is-condensed` or
 * `.is-open` explicitly loses the moment the page moves — silently, with no
 * error, and only after the visitor scrolls. HANDOFF records this biting three
 * times.
 *
 * So this samples computed style at REST, CONDENSED and MENU-OPEN, at three
 * widths, and prints a JSON blob. It is a comparison instrument: run it against
 * the old URL, run it against the new one, and diff. Identical output means the
 * treatment survived; any differing line is the rule that was dropped.
 *
 *   node measure-home-header.mjs http://localhost:4321/v2/ > before.json
 *   node measure-home-header.mjs http://localhost:4321/    > after.json
 *   diff before.json after.json
 *
 * Deliberately NOT a screenshot check. Every one of these failures renders as a
 * plausible-looking header; only the computed value shows the loss.
 */
import { chromium } from 'playwright';
import { assertBuild } from './assert-build.mjs';

const URL = process.argv[2] || 'http://localhost:4321/';

await assertBuild(URL);

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 900, height: 900 },
  { name: 'phone', width: 375, height: 780 },
];

/* What to read off each node. Colours are resolved values, so a renamed custom
   property still compares equal as long as it resolves to the same colour —
   which is the whole point: we are testing the RESULT, not the spelling. */
const PROBES = [
  ['header', '[data-header]', ['backgroundColor', 'color', 'position']],
  ['bar', '.header__bar', ['gridTemplateColumns', 'paddingInlineStart', 'paddingInlineEnd']],
  ['phone', '.header__phone', ['color', 'fontWeight']],
  ['pillSolid', '.pill--solid', ['backgroundColor', 'borderColor', 'color']],
  ['pillFace', '.pill--solid .pill__face', ['fontWeight', 'color']],
  ['menuLabel', '.pill--menu .pill__label--closed', ['fontWeight', 'color']],
  /* Both, and not just the first: the first item IS the active one, so probing
     `.langs__item` alone never exercises the idle `opacity: 0.62` rule that
     LangSwitch carries under `:global(.header--home)`. */
  ['langIdle', '.langs--bar .langs__item:not(.is-active)', ['fontWeight', 'color', 'opacity']],
  ['langActive', '.langs--bar .langs__item.is-active', ['fontWeight', 'color', 'opacity']],
  ['brandStatic', '.header__brand--static', ['display']],
  ['slot', '.header__slot', ['display', 'width']],
];

/* Boxes matter separately from styles: the tablet grid assigns grid-column
   explicitly because `order` had reordered auto-placement and pushed the logo
   slot into column 1. A rename that drops one of those rules moves a box
   without changing a single colour. */
const BOXES = [
  ['sideStart', '.header__side--start'],
  ['slot', '.header__slot'],
  ['sideEnd', '.header__side--end'],
  ['brandStatic', '.header__brand--static'],
];

/* Injected into the page. getComputedStyle returns a colour in whatever space
   it happened to resolve in — a value mid-transition comes back as oklab(),
   the same colour settled comes back as color(srgb …). Comparing the strings
   reports a change where there is none. Painting each colour onto a canvas and
   reading the pixel back collapses every notation to one 8-bit rgba, which is
   also what the visitor actually sees. */
/* An expression, not a declaration: a `const` declared inside eval() does not
   escape into the calling scope under strict mode, which every page.evaluate
   body runs in. This evaluates TO the function instead. */
const CANON = `(() => {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  return (v) => {
    if (typeof v !== 'string' || !/rgb|oklab|oklch|color\\(|hsl|lab\\(/.test(v)) return v;
    cx.clearRect(0, 0, 1, 1);
    cx.fillStyle = v;
    cx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = cx.getImageData(0, 0, 1, 1).data;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  };
})()`;

async function sample(page) {
  return page.evaluate(
    ({ PROBES, BOXES, CANON }) => {
      const canon = eval(CANON);
      const styles = {};
      for (const [key, sel, props] of PROBES) {
        const el = document.querySelector(sel);
        if (!el) {
          styles[key] = null;
          continue;
        }
        const cs = getComputedStyle(el);
        const out = {};
        for (const p of props) out[p] = canon(cs[p]);
        styles[key] = out;
      }

      const boxes = {};
      for (const [key, sel] of BOXES) {
        const el = document.querySelector(sel);
        if (!el) {
          boxes[key] = null;
          continue;
        }
        const r = el.getBoundingClientRect();
        boxes[key] = {
          x: Math.round(r.x * 100) / 100,
          y: Math.round(r.y * 100) / 100,
          w: Math.round(r.width * 100) / 100,
          h: Math.round(r.height * 100) / 100,
        };
      }
      return { styles, boxes };
    },
    { PROBES, BOXES, CANON },
  );
}

/* Hover is where the accent rules live, and where the condensed rules stole the
   colour before. Read it as a separate pass so a failed hover cannot corrupt
   the resting sample. */
async function hoverColour(page, selector) {
  const el = await page.$(selector);
  if (!el) return null;
  const visible = await el.isVisible().catch(() => false);
  if (!visible) return null;
  try {
    await el.hover({ timeout: 1500 });
  } catch {
    return null;
  }
  /* Poll rather than wait a fixed span. The colour transitions, and a blind
     timeout sometimes caught it mid-interpolation — which reads back in a
     different colour space and looked like a changed value when it was the
     same colour still on its way. */
  return page.evaluate(
    ({ s, CANON }) =>
      new Promise((resolve) => {
        const canon = eval(CANON);
        const el = document.querySelector(s);
        let last = '';
        let stable = 0;
        const tick = () => {
          const c = canon(getComputedStyle(el).color);
          if (c === last) stable += 1;
          else stable = 0;
          last = c;
          if (stable >= 8) resolve(c);
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    { s: selector, CANON },
  );
}

/* The header background is driven by --header-bg, a registered <number> that
   TRANSITIONS. Sampling mid-transition reports a colour that is on neither
   side of the change, so hold until it stops moving. */
async function settle(page) {
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        const header = document.querySelector('[data-header]');
        let last = '';
        let lastY = -1;
        let stable = 0;
        const tick = () => {
          const bg = header ? getComputedStyle(header).backgroundColor : '';
          const y = window.scrollY;
          if (bg === last && y === lastY) stable += 1;
          else stable = 0;
          last = bg;
          lastY = y;
          // Smooth scroll keeps drifting after scrollTo returns, and the bg
          // transition runs on top of it — require both to hold.
          if (stable >= 8) resolve();
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
  );
}

async function stateSample(page, label) {
  await settle(page);
  const base = await sample(page);
  const hover = {
    phone: await hoverColour(page, '.header__phone'),
    langActive: await hoverColour(page, '.langs--bar .langs__item.is-active'),
  };
  // Park the pointer away from the bar so the next state starts clean.
  await page.mouse.move(5, 600);
  await page.waitForTimeout(200);
  return { state: label, ...base, hover };
}

const browser = await chromium.launch();
const report = { url: URL, viewports: {} };

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // The arrival timeline runs on a 0.15s delay and staggers for ~2s; sampling
  // opacity before it lands reports a number that is merely in transit.
  await page.waitForTimeout(2600);

  const states = [];

  states.push(await stateSample(page, 'rest'));

  // Past the end of the logo flight (max(50vh, 340px)), so the bar is filled
  // and every condensed rule is live.
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(900);
  states.push(await stateSample(page, 'condensed'));

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
  await settle(page);
  const trigger = await page.$('[data-menu-trigger]');
  if (trigger) {
    await trigger.click();
    await page.waitForTimeout(1000);
    states.push(await stateSample(page, 'open'));
    await trigger.click();
    await page.waitForTimeout(800);
  }

  report.viewports[vp.name] = states;
  await page.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
