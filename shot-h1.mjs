import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(3200);
const m = await p.evaluate(() => {
  const h = document.querySelector('.hero2__headline');
  const r = h.getBoundingClientRect();
  // count rendered lines via client rects
  const range = document.createRange(); range.selectNodeContents(h);
  return { maxWidth: getComputedStyle(h).maxWidth, width: Math.round(r.width),
           lines: range.getClientRects().length };
});
console.log(`h1 max-width=${m.maxWidth} rendered=${m.width}px lines=${m.lines}`);
await p.screenshot({ path:`${OUT}/v2-h1-29ch.png` });
await b.close();
