import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:768,height:1024} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2500);
const m = await p.evaluate(() => {
  const bar = document.querySelector('.header__bar');
  const cs = getComputedStyle(bar);
  return {
    display: cs.display, cols: cs.gridTemplateColumns, gap: cs.gap,
    children: [...bar.children].map(el => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        cls: el.className.toString().split(' ').filter(x=>!x.startsWith('astro')).join('.') || el.tagName,
        display: s.display,
        gridCol: s.gridColumnStart + ' / ' + s.gridColumnEnd,
        justifySelf: s.justifySelf,
        box: `${Math.round(r.left)}–${Math.round(r.right)} (w ${Math.round(r.width)})`,
        padStart: s.paddingInlineStart, padEnd: s.paddingInlineEnd,
      };
    }),
  };
});
console.log(`bar: ${m.display}  cols=${m.cols}  gap=${m.gap}\n`);
m.children.forEach(ch => {
  console.log(`  ${ch.cls}`);
  console.log(`     display=${ch.display} gridColumn=${ch.gridCol} justifySelf=${ch.justifySelf}`);
  console.log(`     box ${ch.box}  padding ${ch.padStart} / ${ch.padEnd}`);
});
await b.close();
