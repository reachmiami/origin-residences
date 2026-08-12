import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(3000);

const read = async (l) => {
  const m = await p.evaluate(() => {
    const h = document.querySelector('[data-header]');
    const lo = document.querySelector('[data-flying-logo]');
    return { bar: getComputedStyle(h).backgroundColor,
             ink: getComputedStyle(h).color,
             logoOpacity: getComputedStyle(lo).opacity };
  });
  console.log(`${l.padEnd(16)} bar=${m.bar.padEnd(28)} logo opacity=${m.logoOpacity}`);
};

await read('before (top)');
await p.click('[data-menu-trigger]'); await p.waitForTimeout(700);
await read('menu open');
await p.screenshot({ path:`${OUT}/menu-open-v2.png`, clip:{x:0,y:0,width:1440,height:420} });
await p.click('[data-menu-trigger]'); await p.waitForTimeout(900);
await read('menu closed');
await b.close();
