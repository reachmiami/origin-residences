import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(3000);

const read = async (l) => {
  const m = await p.evaluate(() => {
    const lo = document.querySelector('[data-flying-logo]');
    const r = lo.getBoundingClientRect();
    return { landed: lo.hasAttribute('data-landed'),
             opacity: getComputedStyle(lo).opacity,
             pos: `${Math.round(r.height)}px @ ${Math.round(r.top)}` };
  });
  console.log(`${l.padEnd(26)} landed=${String(m.landed).padEnd(5)} opacity=${m.opacity.padEnd(4)} logo ${m.pos}`);
};

console.log('BEFORE the flight — logo must still retire\n');
await read('at top, menu closed');
await p.click('[data-menu-trigger]'); await p.waitForTimeout(700);
await read('at top, menu OPEN');
await p.click('[data-menu-trigger]'); await p.waitForTimeout(700);

console.log('\nAFTER the flight — logo must stay\n');
await p.evaluate(()=>window.scrollTo(0,700)); await p.waitForTimeout(1600);
await read('landed, menu closed');
await p.click('[data-menu-trigger]'); await p.waitForTimeout(700);
await read('landed, menu OPEN');
await p.screenshot({ path:`${OUT}/landed-menu-open.png`, clip:{x:0,y:0,width:1440,height:330} });
await b.close();
