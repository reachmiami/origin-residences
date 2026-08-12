import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 375, height: 812 } });
const p = await c.newPage();
await p.goto('http://localhost:4321/amenities/', { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
const m = await p.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const box = (el) => el ? { w: Math.round(el.getBoundingClientRect().width), l: Math.round(el.getBoundingClientRect().left), r: Math.round(el.getBoundingClientRect().right) } : null;
  const bar = q('.header__bar');
  const cs = getComputedStyle(bar);
  return {
    barW: Math.round(bar.getBoundingClientRect().width),
    barScroll: bar.scrollWidth,
    padding: cs.paddingInlineStart + ' / ' + cs.paddingInlineEnd,
    gap: cs.gap,
    logo: box(q('.header__brand img')),
    langs: box(q('.langs')),
    phone: box(q('.header__phone')),
    burger: box(q('.pill--menu')),
  };
});
console.log(JSON.stringify(m, null, 2));
await b.close();
