import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:375,height:812} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2500);
// normalise both to "percent of the way from white to their end colour"
const pct = (s, startL, endL) => { const m = s.match(/[\d.]+/g); if(!m) return '?';
  const L = parseFloat(m[0]); return (((startL - L)/(startL - endL))*100).toFixed(0)+'%'; };
console.log('menu OPEN — progress from white to final, sampled together\n');
await p.click('[data-menu-trigger]');
for (let i=0;i<9;i++){
  const m = await p.evaluate(() => ({
    logo: getComputedStyle(document.querySelector('.header__brand--static')).backgroundColor,
    phone: getComputedStyle(document.querySelector('.header__phone')).color,
    dur: getComputedStyle(document.querySelector('.header__brand--static')).transitionDuration,
  }));
  console.log(`  ${String(i*100).padStart(4)}ms  logo ${pct(m.logo,1,0.7294).padStart(5)}   phone ${pct(m.phone,1,0.2545).padStart(5)}`);
  if(i===0) console.log(`        logo transition duration now: ${m.dur}`);
  await p.waitForTimeout(100);
}
await b.close();
