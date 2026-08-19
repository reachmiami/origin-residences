/**
 * Measures the lead-capture band once it carries a photograph.
 *
 * This is the mirror image of the stacking-band check. There, light type sat on
 * a dark ground and the enemy was the LIGHTEST pixel. Here dark type sits on a
 * light ground, so the enemy is the DARKEST pixel — the photograph has a figure
 * with dark hair in its right third, and any label that lands on it loses
 * contrast. Sampling for the lightest pixel would report everything as fine.
 *
 * Usage: node measure-inquire.mjs [url]
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
const parseRgb = (s) => (s.match(/\d+(\.\d+)?/g) || [0, 0, 0]).slice(0, 3).map(Number);

const browser = await chromium.launch();
let failures = 0;
let worst = { ratio: Infinity };

for (const vp of [
  { width: 1440, height: 900, name: 'desktop 1440' },
  { width: 768, height: 1024, name: 'tablet 768' },
  { width: 375, height: 812, name: 'phone 375' },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  console.log(`\n=== ${vp.name} ===`);

  // Bring the band into view; it is the last thing before the footer.
  await page.evaluate(() => {
    const s = document.getElementById('inquire');
    window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY - 40);
  });
  await page.waitForTimeout(700);

  const bg = await page.evaluate(() => {
    const cs = getComputedStyle(document.getElementById('inquire'));
    return { image: cs.backgroundImage, size: cs.backgroundSize, position: cs.backgroundPosition };
  });
  const hasPhoto = /origin-footer/.test(bg.image);
  console.log(`  ${hasPhoto ? '✓' : '✗'} photograph applied  ${bg.size} / ${bg.position}`);
  if (!hasPhoto) failures++;

  // Collect every piece of type in the band, with its colour and box.
  const { sectionBox, items } = await page.evaluate(() => {
    const sec = document.getElementById('inquire');
    const sr = sec.getBoundingClientRect();
    const sel = 'h2, legend, .consent span, .consent a, .form-block__lede, .req, .eyebrow';
    const items = [...sec.querySelectorAll(sel)]
      .filter((el) => el.textContent.trim().length && el.getClientRects().length)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          cls: el.className || '',
          text: el.textContent.trim().slice(0, 24),
          colour: getComputedStyle(el).color,
          x: Math.round(r.x - sr.x), y: Math.round(r.y - sr.y),
          w: Math.round(r.width), h: Math.round(r.height),
        };
      })
      .filter((i) => i.w > 2 && i.h > 2);

    /* Placeholders now carry what the labels used to say, so they are real
       content and have to clear AA like anything else. Their colour comes from
       the ::placeholder pseudo, not from the input. The visible labels are gone
       from this sweep because they are visually-hidden 1px boxes now — still in
       the DOM for assistive tech, but nothing is painted for them. */
    for (const el of sec.querySelectorAll('.field input[placeholder], .field textarea[placeholder]')) {
      const r = el.getBoundingClientRect();
      if (r.width < 3 || r.height < 3) continue;
      items.push({
        tag: 'placeholder',
        cls: el.name || '',
        text: el.placeholder.slice(0, 24),
        colour: getComputedStyle(el, '::placeholder').color,
        x: Math.round(r.x - sr.x), y: Math.round(r.y - sr.y),
        w: Math.round(r.width), h: Math.round(r.height),
      });
    }
    // Hide the type so only the ground behind it is sampled.
    sec.querySelectorAll('.shell').forEach((n) => (n.style.visibility = 'hidden'));
    return {
      sectionBox: { x: Math.round(sr.x), y: Math.round(sr.y), width: Math.round(sr.width), height: Math.round(sr.height) },
      items,
    };
  });

  /* Screenshot the ELEMENT, not the viewport. The band is taller than the
     viewport on every width, so a viewport clip silently drops most of the form
     — the first run of this script reported only the h2 at desktop and looked
     like a pass. */
  const shot = await page.locator('#inquire').screenshot();
  await page.evaluate(() => {
    document.getElementById('inquire').querySelectorAll('.shell').forEach((n) => (n.style.visibility = ''));
  });

  const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
  // Boxes were already recorded relative to the section's own origin.
  const dx = 0;
  const dy = 0;

  /** Darkest pixel in a rect — the worst spot dark type could land on. */
  const darkest = (it) => {
    let best = [255, 255, 255];
    let bestL = 2;
    const x0 = Math.max(0, it.x + dx), x1 = Math.min(info.width, it.x + dx + it.w);
    const y0 = Math.max(0, it.y + dy), y1 = Math.min(info.height, it.y + dy + it.h);
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const p = (y * info.width + x) * info.channels;
        const px = [data[p], data[p + 1], data[p + 2]];
        const l = lum(px);
        if (l < bestL) { bestL = l; best = px; }
      }
    }
    return { px: best, ok: x1 > x0 && y1 > y0 };
  };

  const seen = new Set();
  for (const it of items) {
    const d = darkest(it);
    if (!d.ok) continue;
    const c = contrast(parseRgb(it.colour), d.px);
    // One line per distinct kind of type; placeholders are listed individually
    // because each sits over a different part of the photograph.
    const key = it.tag === 'placeholder' ? `placeholder:${it.cls}` : `${it.tag}.${it.cls}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const pass = c >= 4.5;
    if (!pass) failures++;
    if (c < worst.ratio) worst = { ratio: c, key, vp: vp.name, px: d.px, colour: it.colour };
    console.log(
      `  ${pass ? '✓' : '✗'} ${key.padEnd(26).slice(0, 26)} ${c.toFixed(2)}:1` +
        `  darkest rgb(${d.px.join(',')})  "${it.text}"`,
    );
  }

  await ctx.close();
}

console.log(
  `\n  Worst: ${worst.ratio.toFixed(2)}:1 on ${worst.key} at ${worst.vp}` +
    ` — ink ${worst.colour} over rgb(${worst.px?.join(',')})`,
);
await browser.close();
console.log(`${failures === 0 ? '✓ all checks passed' : `✗ ${failures} check(s) failed`}`);
process.exit(failures ? 1 : 0);
