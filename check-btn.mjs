import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2800);
const icon = async () => await p.evaluate(() => {
  const r = document.querySelector('[data-trailer-open] svg').getBoundingClientRect();
  return { x: r.left.toFixed(1), y: r.top.toFixed(1),
           t: getComputedStyle(document.querySelector('[data-trailer-open] svg')).transform };
});
const before = await icon();
console.log(`resting  x=${before.x} y=${before.y} transform=${before.t}`);
await p.hover('[data-trailer-open]'); await p.waitForTimeout(700);
const after = await icon();
console.log(`hovered  x=${after.x} y=${after.y} transform=${after.t}`);
console.log(`\nshift: x ${(after.x-before.x).toFixed(1)}px, y ${(after.y-before.y).toFixed(1)}px`);
await b.close();
