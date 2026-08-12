import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:375,height:812} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2500);
console.log('menu OPEN — logo background vs phone colour, sampled together\n');
await p.click('[data-menu-trigger]');
for (let i=0;i<10;i++){
  const m = await p.evaluate(() => {
    const br = document.querySelector('.header__brand--static');
    const ph = document.querySelector('.header__phone');
    const cs = getComputedStyle(br);
    return { logo: cs.backgroundColor,
             logoTrans: cs.transitionProperty + ' / ' + cs.transitionDuration,
             phone: getComputedStyle(ph).color,
             phoneTrans: getComputedStyle(ph).transitionDuration };
  });
  console.log(`  ${String(i*100).padStart(4)}ms logo=${m.logo.padEnd(34)} phone=${m.phone}`);
  if (i===0) console.log(`        logo transition: ${m.logoTrans}\n        phone transition: ${m.phoneTrans}`);
  await p.waitForTimeout(100);
}
await b.close();
