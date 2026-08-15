/**
 * Measures the team cards: per-firm grounds, gradient focus, and the contrast
 * of every piece of type against the ACTUAL composited card behind it.
 *
 * Five cards now carry five different grounds — two dark with light type, three
 * light with dark type — so a single "worst pixel" rule does not work here. For
 * each text box this samples BOTH the lightest and the darkest pixel behind it
 * and keeps the lower of the two contrasts, which is correct whichever way
 * round that card runs.
 *
 * Usage: node measure-team.mjs [url]
 */
import { chromium } from 'playwright';
import sharp from 'sharp';

const URL = process.argv[2] || 'http://localhost:4321/the-team/';

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

for (const vp of [
  { width: 1920, height: 1080, name: '1920 (shuffle)' },
  { width: 1440, height: 900, name: '1440 (shuffle)' },
  { width: 900, height: 1000, name: '900 (stacked)' },
  { width: 768, height: 1024, name: '768 (stacked)' },
  { width: 641, height: 900, name: '641 (stacked)' },
  { width: 640, height: 900, name: '640 (stacked)' },
  { width: 480, height: 900, name: '480 (stacked)' },
  { width: 375, height: 812, name: '375 (stacked)' },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  console.log(`\n=== ${vp.name} ===`);

  const count = await page.evaluate(() => document.querySelectorAll('.partner').length);

  for (let i = 0; i < count; i++) {
    // Bring the card into view so its own box is on screen, then read it.
    const meta = await page.evaluate((idx) => {
      const el = document.querySelectorAll('.partner')[idx];
      el.scrollIntoView({ block: 'start' });
      return { firm: el.dataset.firm };
    }, i);
    await page.waitForTimeout(350);

    /* Scroll the COPY into view and work in viewport coordinates against a
       viewport screenshot. An element-relative screenshot is wrong here: in the
       stacked layout the card is taller than the viewport with the photograph
       above the text, and a few pixels of coordinate drift lands the sample
       inside the photograph — which is what produced an impossible 1.15:1. */
    /* Scroll, then WAIT FOR IT TO STOP. Lenis drives this page with smooth
       scrolling, so the position keeps drifting for a while after the call
       returns — measure the rects during that drift and the screenshot no
       longer matches them. That produced probe boxes straddling two cards and
       impossible readings like 1.60:1 on gold-on-navy. */
    await page.evaluate((idx) => {
      document.querySelectorAll('.partner')[idx]
        .querySelector('.partner__body-inner')
        .scrollIntoView({ block: 'center' });
    }, i);
    await page.evaluate(async () => {
      let last = -1, still = 0;
      for (let f = 0; f < 180 && still < 6; f++) {
        await new Promise((r) => requestAnimationFrame(r));
        if (Math.abs(window.scrollY - last) < 0.5) still++;
        else still = 0;
        last = window.scrollY;
      }
    });

    const boxes = await page.evaluate((idx) => {
      const el = document.querySelectorAll('.partner')[idx];
      /* The header is fixed and opaque off-white. Anything sampled under it
         reads the HEADER, not the card — which is what turned VDA's gold-on-navy
         eyebrow into an impossible 2.08:1. Sample strictly below it, plus a
         couple of pixels for its box-shadow: that 1px hairline alone dragged the
         sand card's eyebrow to a phantom 3.58:1. */
      const top = document.querySelector('.header__bar').getBoundingClientRect().height + 3;
      const pick = ['.eyebrow', '.partner__name', '.partner__body', '.partner__link'];
      const items = pick
        .map((sel) => {
          const n = el.querySelector(sel);
          if (!n || !n.textContent.trim()) return null;
          const b = n.getBoundingClientRect();
          if (b.width < 3 || b.height < 3) return null;
          const y0 = Math.max(top, b.top);
          const y1 = Math.min(window.innerHeight, b.bottom);
          if (y1 - y0 < 3) return null;
          return {
            sel,
            colour: getComputedStyle(n).color,
            x: Math.round(b.x), y: Math.round(y0),
            w: Math.round(b.width), h: Math.round(y1 - y0),
          };
        })
        .filter(Boolean);
      el.querySelector('.partner__body-inner').style.visibility = 'hidden';
      return { items, ground: getComputedStyle(el).getPropertyValue('--partner-bg').trim() };
    }, i);

    const shot = await page.screenshot();
    await page.evaluate((idx) => {
      document.querySelectorAll('.partner')[idx].querySelector('.partner__body-inner').style.visibility = '';
    }, i);

    const { data, info: im } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });

    let cardWorst = { ratio: Infinity, sel: '' };
    for (const it of boxes.items) {
      let light = [0, 0, 0], lightL = -1, dark = [255, 255, 255], darkL = 2;
      const x0 = Math.max(0, it.x), x1 = Math.min(im.width, it.x + it.w);
      const y0 = Math.max(0, it.y), y1 = Math.min(im.height, it.y + it.h);
      if (x1 <= x0 || y1 <= y0) continue;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const q = (y * im.width + x) * im.channels;
          const px = [data[q], data[q + 1], data[q + 2]];
          const l = lum(px);
          if (l > lightL) { lightL = l; light = px; }
          if (l < darkL) { darkL = l; dark = px; }
        }
      }
      const ink = parseRgb(it.colour);
      const ratio = Math.min(contrast(ink, light), contrast(ink, dark));
      if (ratio < cardWorst.ratio) cardWorst = { ratio, sel: it.sel };
    }

    const pass = cardWorst.ratio >= 4.5;
    if (!pass) failures++;
    if (cardWorst.ratio < worst.ratio) worst = { ratio: cardWorst.ratio, firm: meta.firm, sel: cardWorst.sel, vp: vp.name };
    console.log(
      `  ${pass ? '✓' : '✗'} ${meta.firm.padEnd(14)} ${boxes.ground.padEnd(9)} worst ${cardWorst.ratio.toFixed(2)}:1  (${cardWorst.sel})`,
    );
  }

  await ctx.close();
}

console.log(`\n  Worst anywhere: ${worst.ratio.toFixed(2)}:1 — ${worst.firm} ${worst.sel} @ ${worst.vp}`);
await browser.close();
console.log(failures === 0 ? '✓ all cards clear AA' : `✗ ${failures} card(s) below AA`);
process.exit(failures ? 1 : 0);
