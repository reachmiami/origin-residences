/**
 * Measures the page-band veil: the contrast of every piece of type in
 * PageBand.astro against the ACTUAL composited pixels behind it.
 *
 * The band's ground is a photograph, so its contrast is a property of the
 * artwork, not of the CSS alone. Re-run this whenever a band image changes, and
 * whenever a page moves onto or off the band — a new photograph with a bright
 * passage where the eyebrow sits can put a page below AA on its own.
 *
 * Light type on a dark ground fails against the LIGHTEST pixel, so that is what
 * this samples. The header is excluded: it is fixed, opaque and carries a 1px
 * shadow, and sampling under it reports the header rather than the band.
 *
 * Usage: node measure-band.mjs [baseUrl]
 */
import { chromium } from 'playwright';
import sharp from 'sharp';

const BASE = process.argv[2] || 'http://localhost:4321';

/* Every page whose title section is a PageBand. Gallery, Amenities,
   Neighborhood, Artefacto and The Team are absent on purpose — they carry the
   flat `page-head`, which is measured by measure-page-head.mjs instead. */
const PAGES = [
  ['residences', '/residences/'],
  ['floor-plans', '/floor-plans/'],
  ['schedule', '/schedule-virtual-tour/'],
  ['accessibility', '/accessibility/'],
  ['privacy', '/privacy-policy/'],
  ['terms', '/terms-of-use/'],
  ['unit 302', '/level-3-unit-302/'],
  ['unit 701 PH', '/ph-level-7-unit-701/'],
  ['es terms', '/es/terms-of-use/'],
];

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop 1440' },
  { width: 768, height: 1024, name: 'tablet 768' },
  { width: 375, height: 812, name: 'phone 375' },
];

const AA = 4.5;

const lin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const parseRgb = (s) => (s.match(/\d+(\.\d+)?/g) || [0, 0, 0]).slice(0, 3).map(Number);

const browser = await chromium.launch();
let failures = 0;
let worst = { ratio: Infinity };

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  console.log(`\n=== ${vp.name} ===`);

  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(450);

    const items = await page.evaluate(() => {
      const band = document.querySelector('section.band');
      if (!band) return null;
      // Skip the header band and its box-shadow entirely.
      const top = document.querySelector('.header__bar').getBoundingClientRect().height + 3;
      const sel = '.band__eyebrow, .band__title, .band__lede, .band__note, .band__back, .band__all';
      const out = [...band.querySelectorAll(sel)]
        .filter((e) => e.textContent.trim() && e.getClientRects().length)
        .map((e) => {
          const r = e.getBoundingClientRect();
          const y0 = Math.max(top, r.top);
          const y1 = Math.min(window.innerHeight, r.bottom);
          if (y1 - y0 < 3 || r.width < 3) return null;
          return {
            el: e,
            cls: e.className.split(' ').pop(),
            colour: getComputedStyle(e).color,
            x: Math.round(r.x), y: Math.round(y0),
            w: Math.round(r.width), h: Math.round(y1 - y0),
          };
        })
        .filter(Boolean);
      /* Hide the TYPE, never its container. `.band__inner` is that container
         and it carries the copy-anchored pool as a ::before — and
         `visibility: hidden` hides an element's pseudo-elements with it. Hiding
         the container therefore deletes half the veil a moment before sampling
         it, which reported every page as unchanged and made a working fix look
         like a no-op. */
      out.forEach((it) => { it.el.style.visibility = 'hidden'; });
      return out.map(({ el, ...rest }) => rest);
    });

    if (!items) { console.log(`  ${name.padEnd(14)} (no band on this page)`); continue; }

    const shot = await page.screenshot();
    await page.evaluate(() => {
      document
        .querySelectorAll('section.band .band__eyebrow, section.band .band__title, section.band .band__lede, section.band .band__note, section.band .band__back, section.band .band__all')
        .forEach((e) => { e.style.visibility = ''; });
    });

    const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });

    let pageWorst = { ratio: Infinity, cls: '', px: null };
    for (const it of items) {
      let light = [0, 0, 0];
      let lightL = -1;
      for (let y = it.y; y < Math.min(info.height, it.y + it.h); y++) {
        for (let x = Math.max(0, it.x); x < Math.min(info.width, it.x + it.w); x++) {
          const q = (y * info.width + x) * info.channels;
          const px = [data[q], data[q + 1], data[q + 2]];
          const l = lum(px);
          if (l > lightL) { lightL = l; light = px; }
        }
      }
      const ratio = contrast(parseRgb(it.colour), light);
      if (ratio < pageWorst.ratio) pageWorst = { ratio, cls: it.cls, px: light };
    }

    const pass = pageWorst.ratio >= AA;
    if (!pass) failures++;
    if (pageWorst.ratio < worst.ratio) {
      worst = { ratio: pageWorst.ratio, name, cls: pageWorst.cls, vp: vp.name };
    }
    console.log(
      `  ${pass ? '✓' : '✗'} ${name.padEnd(14)} ${pageWorst.ratio.toFixed(2)}:1` +
        `  (${pageWorst.cls} over rgb(${pageWorst.px.join(',')}))`,
    );
  }

  await ctx.close();
}

console.log(
  `\n  Worst: ${worst.ratio.toFixed(2)}:1 — ${worst.name} ${worst.cls} @ ${worst.vp}` +
    `   (AA needs ${AA})`,
);
await browser.close();
console.log(failures === 0 ? '✓ every band page clears AA' : `✗ ${failures} page/viewport combination(s) below AA`);
process.exit(failures ? 1 : 0);
