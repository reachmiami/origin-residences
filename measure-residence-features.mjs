/**
 * Measures the RESIDENCES FEATURES band.
 *
 * The band is one full-bleed Ken Burns section: a slideshow of every
 * photograph in src/assets/residences/features/ with the feature list centred
 * over it. Same hazard the amenity deck has, and worse — those cards cycle up
 * to five images each, this one cycles fourteen, none of them graded together.
 * A sunlit terrace and a dark panelled bedroom sit in the same rotation, and
 * the list has to stay legible over the LIGHTEST moment of any of them.
 *
 * A screenshot taken at any one moment cannot see that, and neither can a
 * human clicking through: the offending slide might be the eleventh. So every
 * slide is forced active in turn and measured on its own, with the type hidden
 * so the sample reads the photograph and the scrim rather than the letters.
 *
 * Light type on a dark ground fails against the lightest pixel behind it —
 * the opposite extreme from a page head, which fails against the darkest.
 *
 * Usage: node measure-residence-features.mjs [baseUrl]
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { assertBuild } from './assert-build.mjs';

const BASE = process.argv[2] || 'http://localhost:4321';
await assertBuild(BASE);

/* Spanish and Portuguese wrap these lines differently, and a longer list is a
   taller block reaching further into the scrim's falloff. */
const PATHS = [
  ['en', '/residences/'],
  ['es', '/es/residences/'],
  ['pt', '/pt-br/residences/'],
];

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop 1440' },
  { width: 768, height: 1024, name: 'tablet 768' },
  { width: 375, height: 812, name: 'phone 375' },
  { width: 1280, height: 620, name: 'short 1280x620' },
];

const AA = 4.5;

const lin = (c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => { const [h, l] = [lum(a), lum(b)].sort((x, y) => y - x); return (h + 0.05) / (l + 0.05); };
const rgb = (s) => (s.match(/\d+(\.\d+)?/g) || [0, 0, 0]).slice(0, 3).map(Number);

const browser = await chromium.launch();
let failures = 0;
let worst = { ratio: Infinity };

for (const [loc, path] of PATHS) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: 'networkidle' });

    /* Walk the page so the band's IntersectionObserver has started it and the
       deferred slides have their src. */
    const H = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += 500) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(60);
    }

    const slides = await page.evaluate(() => {
      const el = document.querySelector('.features');
      if (!el) return 0;
      el.scrollIntoView({ block: 'center', behavior: 'instant' });
      return el.querySelectorAll('.kb__slide').length;
    });

    const label = `${loc} ${vp.name}`;
    if (!slides) {
      console.log(`  ✗ ${label.padEnd(22)} no features band found`);
      failures++;
      await ctx.close();
      continue;
    }

    await page.waitForTimeout(400);
    let vpWorst = { ratio: Infinity };

    for (let sIdx = 0; sIdx < slides; sIdx++) {
      /* Force this slide visible and freeze the drift, so the pixels behind
         the type are the ones the screenshot captured. */
      await page.evaluate((i) => {
        const el = document.querySelector('.features');
        el.scrollIntoView({ block: 'center', behavior: 'instant' });
        [...el.querySelectorAll('.kb__slide')].forEach((s, n) => {
          s.classList.toggle('is-active', n === i);
          s.style.transition = 'none';
          s.style.animation = 'none';
        });
      }, sIdx);
      await page.waitForTimeout(220);

      const probe = await page.evaluate(() => {
        const el = document.querySelector('.features');
        const bar = document.querySelector('.header__bar');
        const top = (bar ? bar.getBoundingClientRect().height : 0) + 3;
        const type = [...el.querySelectorAll('.features__title, .features__item')];
        const out = type.map((t) => {
          const r = t.getBoundingClientRect();
          const y0 = Math.max(top, r.top), y1 = Math.min(window.innerHeight, r.bottom);
          if (y1 - y0 < 3 || r.width < 3) return null;
          return {
            cls: t.className.split(' ').pop(),
            colour: getComputedStyle(t).color,
            x: Math.round(r.x), y: Math.round(y0),
            w: Math.round(r.width), h: Math.round(y1 - y0),
          };
        }).filter(Boolean);
        type.forEach((t) => { t.style.visibility = 'hidden'; });
        return out;
      });

      if (!probe.length) {
        await page.evaluate(() => document.querySelectorAll('.features__title, .features__item')
          .forEach((t) => { t.style.visibility = ''; }));
        continue;
      }

      const shot = await page.screenshot();
      await page.evaluate(() => document.querySelectorAll('.features__title, .features__item')
        .forEach((t) => { t.style.visibility = ''; }));

      const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
      for (const it of probe) {
        /* The LIGHTEST pixel in the box is what light type fails against. */
        let light = [0, 0, 0], L = -1;
        for (let y = it.y; y < Math.min(info.height, it.y + it.h); y++) {
          for (let x = Math.max(0, it.x); x < Math.min(info.width, it.x + it.w); x++) {
            const q = (y * info.width + x) * info.channels;
            const px = [data[q], data[q + 1], data[q + 2]];
            const l = lum(px);
            if (l > L) { L = l; light = px; }
          }
        }
        const ratio = contrast(rgb(it.colour), light);
        if (ratio < vpWorst.ratio) vpWorst = { ratio, slide: sIdx, cls: it.cls };
        if (ratio < worst.ratio) worst = { ratio, slide: sIdx, cls: it.cls, label };
      }
    }

    const ok = vpWorst.ratio >= AA;
    if (!ok) failures++;
    console.log(
      `  ${ok ? '✓' : '✗'} ${label.padEnd(22)} worst ${vpWorst.ratio.toFixed(2)}:1` +
      ` (slide ${vpWorst.slide + 1}/${slides}, ${vpWorst.cls})`,
    );
    await ctx.close();
  }
}

await browser.close();
console.log(
  `\n${failures ? '✗' : '✓'} worst overall ${worst.ratio.toFixed(2)}:1` +
  ` — ${worst.label}, slide ${worst.slide + 1}, ${worst.cls} (AA needs ${AA})`,
);
process.exit(failures ? 1 : 0);
