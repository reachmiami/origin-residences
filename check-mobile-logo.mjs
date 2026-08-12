import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:375,height:812} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2500);
const read = async (l) => {
  const m = await p.evaluate(() => {
    const br = document.querySelector('.header__brand--static');
    const h = document.querySelector('[data-header]');
    const r = br.getBoundingClientRect();
    return { logo: getComputedStyle(br).backgroundColor,
             bar: getComputedStyle(h).backgroundColor,
             size: `${Math.round(r.width)}×${Math.round(r.height)}` };
  });
  console.log(`${l.padEnd(20)} logo=${m.logo.padEnd(30)} bar=${m.bar.padEnd(28)} ${m.size}`);
};
await read('top, menu closed');
await p.screenshot({ path:`${OUT}/mlogo-top.png`, clip:{x:0,y:0,width:375,height:90} });
await p.click('[data-menu-trigger]'); await p.waitForTimeout(900);
await read('menu OPEN');
await p.screenshot({ path:`${OUT}/mlogo-open.png`, clip:{x:0,y:0,width:375,height:90} });
await p.click('[data-menu-trigger]'); await p.waitForTimeout(1500);
await read('menu closed again');
await p.evaluate(()=>window.scrollTo(0,400)); await p.waitForTimeout(1200);
await read('scrolled (bar white)');
await b.close();
