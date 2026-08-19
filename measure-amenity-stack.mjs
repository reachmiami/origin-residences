/**
 * Measures the Amenities stacking deck.
 *
 * The thing this exists to catch: the cards cycle through up to five images
 * that were never graded together — a bright rooftop sky, a blown-out
 * foliage photograph, a dim interior — and the heading has to stay legible
 * over EVERY one of them. Sampling only the slide that happens to be showing
 * would pass a card whose third image washes the type out completely, and a
 * screenshot taken at any single moment cannot see the problem either.
 *
 * So each slide is forced active in turn and measured on its own. Light type
 * on a dark ground fails against the LIGHTEST pixel behind it, which is the
 * opposite extreme from measure-page-head.mjs.
 *
 * Also checks the sticky mechanic — six cards, each pinned at the header's
 * lower edge, each covering the one before it — and that reduced motion
 * flattens the deck and stops the slideshow.
 *
 * Usage: node measure-amenity-stack.mjs [baseUrl]
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { assertBuild } from './assert-build.mjs';

const BASE = process.argv[2] || 'http://localhost:4321';
await assertBuild(BASE);

const PATHS = [
  ['en', '/amenities/'],
  ['es', '/es/amenities/'],
];

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop 1440' },
  { width: 768, height: 1024, name: 'tablet 768' },
  { width: 375, height: 812, name: 'phone 375' },
  // Short viewport: a card is 100svh - header, so this is where its own copy
  // is most likely to outgrow it.
  { width: 1280, height: 620, name: 'short 1280x620' },
];

const AA = 4.5;
const EXPECTED = 6;

const lin = (c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => { const [h, l] = [lum(a), lum(b)].sort((x, y) => y - x); return (h + 0.05) / (l + 0.05); };
const rgb = (s) => (s.match(/\d+(\.\d+)?/g) || [0, 0, 0]).slice(0, 3).map(Number);

/* Smooth scroll keeps moving after scrollTo returns; measuring during that
   drift puts the probe box on a different card than the screenshot. */
const settle = (page) =>
  page.evaluate(() => new Promise((res) => {
    let y = -1, n = 0;
    const t = () => { if (window.scrollY === y) n++; else n = 0; y = window.scrollY; n >= 8 ? res() : requestAnimationFrame(t); };
    requestAnimationFrame(t);
  }));

const browser = await chromium.launch();
let failures = 0;
let worst = { ratio: Infinity };

for (const [loc, path] of PATHS) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    const cards = await page.evaluate(() => {
      const els = [...document.querySelectorAll('.astack__card')];
      return els.map((el) => ({
        id: el.id,
        slides: el.querySelectorAll('.kb__slide').length,
        sticky: getComputedStyle(el).position,
        top: getComputedStyle(el).top,
      }));
    });

    const label = `${loc} ${vp.name}`;
    if (cards.length !== EXPECTED) {
      console.log(`  ✗ ${label.padEnd(22)} ${cards.length} cards, expected ${EXPECTED}`);
      failures++;
      await ctx.close();
      continue;
    }
    const notSticky = cards.filter((c) => c.sticky !== 'sticky').map((c) => c.id);
    if (notSticky.length) { console.log(`  ✗ ${label.padEnd(22)} not sticky: ${notSticky.join(', ')}`); failures++; }

    // --- contrast, every card, every slide ---------------------------------
    let vpWorst = { ratio: Infinity };
    for (const card of cards) {
      for (let sIdx = 0; sIdx < card.slides; sIdx++) {
        await page.evaluate((id) => {
          document.getElementById(id).scrollIntoView({ block: 'center', behavior: 'instant' });
        }, card.id);
        await settle(page);

        // Force this slide to be the visible one, and freeze the drift so the
        // screenshot and the box agree.
        await page.evaluate(({ id, sIdx }) => {
          const el = document.getElementById(id);
          const slides = [...el.querySelectorAll('.kb__slide')];
          slides.forEach((s, i) => {
            s.classList.toggle('is-active', i === sIdx);
            s.style.transition = 'none';
            s.style.animation = 'none';
          });
        }, { id: card.id, sIdx });
        await page.waitForTimeout(220);

        const probe = await page.evaluate((id) => {
          const el = document.getElementById(id);
          // The header is fixed and opaque; sampling under it reports the bar.
          const top = document.querySelector('.header__bar').getBoundingClientRect().height + 3;
          const type = [...el.querySelectorAll('.astack__title, .astack__line')];
          const out = type.map((t) => {
            const r = t.getBoundingClientRect();
            const y0 = Math.max(top, r.top), y1 = Math.min(window.innerHeight, r.bottom);
            if (y1 - y0 < 3 || r.width < 3) return null;
            return { cls: t.className.split(' ')[0], colour: getComputedStyle(t).color,
              x: Math.round(r.x), y: Math.round(y0), w: Math.round(r.width), h: Math.round(y1 - y0) };
          }).filter(Boolean);
          type.forEach((t) => { t.style.visibility = 'hidden'; });
          return out;
        }, card.id);

        if (!probe.length) {
          await page.evaluate((id) => {
            document.getElementById(id).querySelectorAll('.astack__title, .astack__line')
              .forEach((t) => { t.style.visibility = ''; });
          }, card.id);
          continue;
        }

        const shot = await page.screenshot();
        await page.evaluate((id) => {
          document.getElementById(id).querySelectorAll('.astack__title, .astack__line')
            .forEach((t) => { t.style.visibility = ''; });
        }, card.id);

        const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
        for (const it of probe) {
          let light = [0, 0, 0], L = -1;
          for (let y = it.y; y < Math.min(info.height, it.y + it.h); y++)
            for (let x = Math.max(0, it.x); x < Math.min(info.width, it.x + it.w); x++) {
              const q = (y * info.width + x) * info.channels;
              const px = [data[q], data[q + 1], data[q + 2]];
              const l = lum(px); if (l > L) { L = l; light = px; }
            }
          const ratio = contrast(rgb(it.colour), light);
          if (ratio < vpWorst.ratio) vpWorst = { ratio, card: card.id, slide: sIdx, cls: it.cls, px: light };
        }
      }
    }

    const pass = vpWorst.ratio >= AA;
    if (!pass) failures++;
    if (vpWorst.ratio < worst.ratio) worst = { ...vpWorst, vp: label };
    console.log(
      `  ${pass ? '✓' : '✗'} ${label.padEnd(22)} ${cards.length} cards · worst ${vpWorst.ratio.toFixed(2)}:1` +
      `  (${vpWorst.card} slide ${vpWorst.slide + 1}, ${vpWorst.cls} over rgb(${vpWorst.px.join(',')}))`,
    );
    if (errs.length) { console.log(`      page errors: ${errs.join(' | ')}`); failures++; }
    await ctx.close();
  }
}

// --- reduced motion --------------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/amenities/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  const r = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.astack__card')];
    const kb = [...document.querySelectorAll('[data-kb]')];
    return {
      stickyCount: cards.filter((c) => getComputedStyle(c).position === 'sticky').length,
      playing: kb.filter((k) => k.classList.contains('is-playing')).length,
      animated: [...document.querySelectorAll('.kb__slide')]
        .filter((s) => getComputedStyle(s).animationName !== 'none').length,
      activeSlides: [...document.querySelectorAll('.kb__slide.is-active')].length,
    };
  });
  const ok = r.stickyCount === 0 && r.playing === 0 && r.animated === 0 && r.activeSlides === 6;
  if (!ok) failures++;
  console.log(
    `\n  ${ok ? '✓' : '✗'} reduced motion: ${r.stickyCount} sticky (want 0), ${r.playing} playing (want 0), ` +
    `${r.animated} animated slides (want 0), ${r.activeSlides} standing slides (want 6)`,
  );
  await ctx.close();
}

await browser.close();
console.log(
  `\n  Worst: ${worst.ratio === Infinity ? 'n/a' : worst.ratio.toFixed(2) + ':1'}` +
  (worst.vp ? ` — ${worst.card} slide ${worst.slide + 1} @ ${worst.vp}` : '') + `   (AA needs ${AA})`,
);
console.log(failures === 0 ? '✓ amenity deck passes' : `✗ ${failures} failing check(s)`);
process.exit(failures ? 1 : 0);
