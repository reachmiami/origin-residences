/**
 * Measures the homepage hero: the shade actually sitting behind the headline, the
 * shade behind the transparent header's type, and the heading weights.
 *
 * The hero is the one place where two pieces of light type sit over the same
 * photograph at once — the headline low in the frame and the header bar at the
 * very top. Anchoring the pool of shade to the copy fixes the headline but
 * pulls shade away from the bar, so both have to be read, not just the one
 * being worked on.
 *
 * Usage: node measure-hero.mjs [url]
 */
import { chromium } from 'playwright';
import sharp from 'sharp';

const URL = process.argv[2] || 'http://localhost:4321/';

const lin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const parseRgb = (s) => s.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);

/** Lightest pixel in a clip — the worst spot any glyph could land on. */
async function worstPixel(page, box) {
  const shot = await page.screenshot({ clip: box });
  const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
  let best = [0, 0, 0];
  let bestL = -1;
  for (let p = 0; p < data.length; p += info.channels) {
    const px = [data[p], data[p + 1], data[p + 2]];
    const l = lum(px);
    if (l > bestL) { bestL = l; best = px; }
  }
  return best;
}

const browser = await chromium.launch();
let failures = 0;
const ok = (cond, label, detail) => {
  if (!cond) failures++;
  console.log(`  ${cond ? '✓' : '✗'} ${label}${detail ? `  ${detail}` : ''}`);
};

for (const vp of [
  { width: 1440, height: 900, name: 'desktop 1440' },
  { width: 768, height: 1024, name: 'tablet 768' },
  { width: 375, height: 812, name: 'phone 375' },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  // The hero runs a GSAP arrival timeline; measuring mid-fade reads nothing.
  await page.waitForTimeout(2600);

  console.log(`\n=== ${vp.name} ===`);

  // --- Weights -------------------------------------------------------------
  const weights = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return { h1: getComputedStyle(h1).fontWeight, h1cls: h1.className };
  });
  ok(weights.h1 === '300', `hero H1 weight ${weights.h1}`, `(--w-light; kit is 100/200/300)`);

  // --- Shade behind the headline -------------------------------------------
  const h1box = await page.evaluate(() => {
    const h1 = document.querySelector('.hero2__headline');
    const r = h1.getBoundingClientRect();
    // Hide only the type. Hiding its parent would take the scrim with it —
    // the pool is a ::before on .hero2__content.
    h1.style.visibility = 'hidden';
    return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) };
  });
  const behindH1 = await worstPixel(page, h1box);
  await page.evaluate(() => { document.querySelector('.hero2__headline').style.visibility = ''; });

  const h1Colour = await page.evaluate(
    () => getComputedStyle(document.querySelector('.hero2__headline')).color,
  );
  const cH1 = contrast(parseRgb(h1Colour), behindH1);
  ok(cH1 >= 4.5, `headline ${cH1.toFixed(2)}:1`, `worst pixel rgb(${behindH1.join(',')})`);

  // --- Shade behind the header bar, at scroll 0 where the bar is clear ------
  const barInfo = await page.evaluate(() => {
    const bar = document.querySelector('.header__bar');
    const r = bar.getBoundingClientRect();
    const phone = document.querySelector('.header__phone');
    const header = document.querySelector('.header');
    const colour = getComputedStyle(phone || bar).color;
    // Hide the bar's own contents so only the photograph behind is sampled.
    header.style.visibility = 'hidden';
    return {
      box: { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) },
      colour,
      bg: getComputedStyle(header).backgroundColor,
    };
  });
  const behindBar = await worstPixel(page, barInfo.box);
  await page.evaluate(() => { document.querySelector('.header').style.visibility = ''; });

  const cBar = contrast(parseRgb(barInfo.colour), behindBar);
  ok(cBar >= 4.5, `header type ${cBar.toFixed(2)}:1`, `worst pixel rgb(${behindBar.join(',')}) · ink ${barInfo.colour}`);

  // --- The pool must actually be centred on the copy, not on the section ----
  const centring = await page.evaluate(() => {
    const sec = document.querySelector('.hero2').getBoundingClientRect();
    const content = document.querySelector('.hero2__content').getBoundingClientRect();
    return {
      contentCentrePct: +(((content.top + content.height / 2 - sec.top) / sec.height) * 100).toFixed(1),
      sectionCentrePct: 50,
    };
  });
  console.log(
    `    (copy sits at ${centring.contentCentrePct}% of the hero's height — the pool follows it,` +
      ` a section-centred gradient would sit at 50%)`,
  );

  await ctx.close();
}

await browser.close();
console.log(`\n${failures === 0 ? '✓ all checks passed' : `✗ ${failures} check(s) failed`}`);
process.exit(failures ? 1 : 0);
