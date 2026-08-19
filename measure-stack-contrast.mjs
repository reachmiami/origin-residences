/**
 * Samples the ACTUAL composited pixels behind the stacking bands' headings and
 * reports the worst-case contrast against the type colour.
 *
 * The scrim opacity was chosen from arithmetic against a hypothetical blown-out
 * white photograph. This reads the real photographs instead: it hides the type,
 * screenshots the exact rectangle the type occupied, and finds the lightest
 * pixel in it — the single worst spot any glyph could land on.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';

const URL = process.argv[2] || 'http://localhost:4321/';
const IDS = ['bespoke-design', 'living-concept', 'natural-beauty'];
const TYPE = [255, 253, 249]; // --off-white

const lin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/* Every width matters, not just the widest. The scrim's dark core is a fixed
   proportion of the section, while the heading's width as a proportion of that
   section changes a lot between breakpoints — so the narrow viewports, where
   the type runs closest to the edges, are the ones most likely to fail. */
const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop 1440' },
  { width: 768, height: 1024, name: 'tablet 768' },
  { width: 375, height: 812, name: 'phone 375' },
];

const browser = await chromium.launch();

console.log(`\nWorst-case contrast behind the heading — ${URL}`);
console.log(`Type is --off-white rgb(${TYPE.join(',')}); AA needs 4.5 normal, 3.0 large.`);

let worst = Infinity;

for (const vp of VIEWPORTS) {
const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
console.log(`\n  ── ${vp.name} ──`);

for (const id of IDS) {
  // Pin the band, then measure the rectangle the heading block occupies.
  await page.evaluate((i) => {
    const el = document.getElementById(i);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 200);
  }, id);
  await page.waitForTimeout(500);

  const box = await page.evaluate((i) => {
    const body = document.getElementById(i).querySelector('.stack__body');
    const r = body.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) };
  }, id);

  if (box.width < 2 || box.height < 2 || box.y < 0) {
    console.log(`  ${id}: not on screen, skipped`);
    continue;
  }

  // Hide the type so we sample only what sits BEHIND it.
  await page.evaluate((i) => {
    document.getElementById(i).querySelector('.stack__body').style.visibility = 'hidden';
  }, id);
  await page.waitForTimeout(120);

  const shot = await page.screenshot({ clip: box });
  await page.evaluate((i) => {
    document.getElementById(i).querySelector('.stack__body').style.visibility = '';
  }, id);

  const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;

  let lightest = [0, 0, 0];
  let lightestL = -1;
  let sum = [0, 0, 0];
  let n = 0;

  for (let p = 0; p < data.length; p += ch) {
    const px = [data[p], data[p + 1], data[p + 2]];
    const l = lum(px);
    if (l > lightestL) { lightestL = l; lightest = px; }
    sum[0] += px[0]; sum[1] += px[1]; sum[2] += px[2];
    n++;
  }
  const mean = sum.map((v) => Math.round(v / n));

  const cWorst = contrast(TYPE, lightest);
  const cMean = contrast(TYPE, mean);
  worst = Math.min(worst, cWorst);

  const verdict = cWorst >= 4.5 ? 'AA normal' : cWorst >= 3 ? 'AA large only' : 'FAILS';
  console.log(
    `  ${id.padEnd(16)} worst ${cWorst.toFixed(2)}:1 on rgb(${lightest.join(',')})` +
      `   mean ${cMean.toFixed(2)}:1   → ${verdict}`,
  );
}

await ctx.close();
}

console.log(`\n  Worst pixel anywhere behind type, any width: ${worst.toFixed(2)}:1`);
await browser.close();
process.exit(worst >= 4.5 ? 0 : 1);
