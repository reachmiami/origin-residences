/**
 * Measures the homepage stacking bands (sections 4/5/6).
 *
 * Screenshots would not catch any of this — the failure modes are a sticky
 * that silently does not stick (an `overflow` on an ancestor is enough), a
 * band an few pixels off the header's edge, or a gap between cards. All of
 * those are boxes, so boxes are what this reads.
 *
 * Usage: node measure-stack.mjs [url]
 */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'http://localhost:4321/';
const IDS = ['bespoke-design', 'living-concept', 'natural-beauty'];

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
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);

  console.log(`\n=== ${vp.name} — ${URL} ===`);

  const headerH = await page.evaluate(
    () => document.querySelector('.header__bar').getBoundingClientRect().height,
  );
  const expected = vp.width <= 860 ? 88 : 118;
  ok(Math.round(headerH) === expected, `header height ${Math.round(headerH)}px`, `(expected ${expected})`);

  // --- position: sticky actually resolved, and the band is sized correctly ---
  const info = await page.evaluate((ids) =>
    ids.map((id) => {
      const el = document.getElementById(id);
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { id, position: cs.position, top: cs.top, height: Math.round(r.height) };
    }),
  IDS);

  const target = Math.round(vp.height - headerH);
  for (const b of info) {
    ok(b.position === 'sticky', `${b.id} position: ${b.position}`);
    ok(
      Math.abs(b.height - target) <= 1,
      `${b.id} height ${b.height}px`,
      `(viewport ${vp.height} − header ${Math.round(headerH)} = ${target})`,
    );
  }

  // --- Does it actually stick? Scroll so band 1 is past the top and read it ---
  const stack = await page.evaluate(() => {
    const s = document.querySelector('.stack');
    return { top: s.getBoundingClientRect().top + window.scrollY, height: s.offsetHeight };
  });

  // Land HALF a card in: band 1 pinned at the header, band 2 caught mid-flight
  // across it. One card-height further and band 2 has already arrived, which
  // measures nothing about the shuffle itself.
  const probe = Math.round(stack.top + (vp.height - headerH) * 0.5);
  await page.evaluate((y) => window.scrollTo(0, y), probe);
  await page.waitForTimeout(500);

  const scrolled = await page.evaluate(() => Math.round(window.scrollY));
  ok(Math.abs(scrolled - probe) <= 4, `scrolled to ${scrolled}`, `(asked ${probe})`);

  const stuck = await page.evaluate((ids) =>
    ids.map((id) => {
      const r = document.getElementById(id).getBoundingClientRect();
      return { id, top: Math.round(r.top), bottom: Math.round(r.bottom) };
    }),
  IDS);

  const b1 = stuck.find((b) => b.id === IDS[0]);
  ok(
    Math.abs(b1.top - Math.round(headerH)) <= 1,
    `${IDS[0]} pinned at ${b1.top}px`,
    `(header bottom is ${Math.round(headerH)}px — butted, not overlapping)`,
  );

  // Band 2 is mid-flight: partway down the viewport, overlapping band 1 with
  // no seam of page background between the two cards.
  const b2 = stuck.find((b) => b.id === IDS[1]);
  ok(b2.top > b1.top && b2.top < vp.height, `${IDS[1]} caught mid-flight`, `top ${b2.top}px`);
  ok(b2.top <= b1.bottom, `no gap between card 1 and card 2`, `card2 top ${b2.top} ≤ card1 bottom ${b1.bottom}`);

  // --- The shuffle itself: card 2 paints OVER card 1, and card 1 is still
  //     visible in the strip above card 2's leading edge. Straddling that edge
  //     is the only probe that distinguishes "covering" from "covered by". ---
  const straddle = await page.evaluate((edgeY) => {
    const at = (y) => document.elementFromPoint(window.innerWidth / 2, y)?.closest('section[id]')?.id ?? null;
    return { below: at(edgeY + 6), above: at(edgeY - 6) };
  }, b2.top);
  ok(straddle.below === IDS[1], `card 2 paints above card 1`, `just below its edge: ${straddle.below}`);
  ok(straddle.above === IDS[0], `card 1 still showing above the edge`, `just above: ${straddle.above}`);

  // --- No trailing pad: the stack ends flush with the third card, which moves
  //     straight on into the CTA rather than dwelling. ---
  const pad = await page.evaluate(
    () => parseFloat(getComputedStyle(document.querySelector('.stack')).paddingBottom),
  );
  ok(pad === 0, `no trailing pad`, `${Math.round(pad)}px`);

  const flush = await page.evaluate((ids) => {
    const stack = document.querySelector('.stack').getBoundingClientRect();
    const last = document.getElementById(ids[2]).getBoundingClientRect();
    return Math.round(stack.bottom - last.bottom);
  }, IDS);
  ok(flush === 0, `stack ends flush with card 3`, `Δ${flush}px`);

  // --- Centred heading + rule ---
  const centred = await page.evaluate((id) => {
    const sec = document.getElementById(id);
    const h2 = sec.querySelector('h2');
    const hr = sec.querySelector('hr');
    const sr = sec.getBoundingClientRect();
    const hrr = h2.getBoundingClientRect();
    const rr = hr.getBoundingClientRect();
    return {
      sectionCentre: sr.left + sr.width / 2,
      titleCentre: hrr.left + hrr.width / 2,
      ruleCentre: rr.left + rr.width / 2,
      titleAlign: getComputedStyle(h2).textAlign,
      titleWeight: getComputedStyle(h2).fontWeight,
      sectionWidth: Math.round(sr.width),
      viewport: window.innerWidth,
    };
  }, IDS[0]);

  ok(Math.abs(centred.titleCentre - centred.sectionCentre) <= 1, `heading horizontally centred`,
    `Δ${Math.abs(centred.titleCentre - centred.sectionCentre).toFixed(1)}px`);
  ok(Math.abs(centred.ruleCentre - centred.sectionCentre) <= 1, `rule horizontally centred`,
    `Δ${Math.abs(centred.ruleCentre - centred.sectionCentre).toFixed(1)}px`);
  ok(centred.sectionWidth === centred.viewport, `edge to edge`,
    `section ${centred.sectionWidth}px = viewport ${centred.viewport}px`);
  ok(Number(centred.titleWeight) <= 300, `heading weight ${centred.titleWeight}`, `(brand kit is 100/200/300)`);

  // --- Scrim resolves to a radial gradient. Only its presence is checked here;
  //     whether it is actually dark enough behind the type is a question about
  //     composited pixels, which measure-stack-contrast answers. ---
  const scrim = await page.evaluate((id) => {
    const s = document.getElementById(id).querySelector('.stack__scrim');
    if (!s) return null;
    const cs = getComputedStyle(s);
    return { image: cs.backgroundImage, rx: cs.getPropertyValue('--scrim-rx').trim() };
  }, IDS[0]);
  ok(!!scrim && /radial-gradient/.test(scrim.image), `scrim is a radial gradient`, scrim?.rx ? `rx ${scrim.rx}` : 'MISSING');
  // The core must reach past the heading, and the heading gets much wider
  // relative to the section as the viewport narrows.
  const expectedRx = vp.width <= 860 ? '125%' : '78%';
  ok(scrim?.rx === expectedRx, `core radius ${scrim?.rx}`, `(expected ${expectedRx} at this width)`);

  // --- No horizontal overflow introduced ---
  const of = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
  }));
  ok(of.sw <= of.cw, `no horizontal overflow`, `scrollWidth ${of.sw} vs client ${of.cw}`);

  ok(errors.length === 0, `console clean`, errors.length ? errors.join(' | ') : '');

  await ctx.close();
}

// --- Reduced motion: the choreography must switch off entirely ---
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  console.log(`\n=== prefers-reduced-motion: reduce ===`);

  const rm = await page.evaluate((ids) =>
    ids.map((id) => {
      const cs = getComputedStyle(document.getElementById(id));
      return { id, position: cs.position };
    }),
  IDS);
  for (const b of rm) ok(b.position === 'static', `${b.id} not sticky (${b.position})`);

  await ctx.close();
}

await browser.close();
console.log(`\n${failures === 0 ? '✓ all checks passed' : `✗ ${failures} check(s) failed`}`);
process.exit(failures ? 1 : 0);
