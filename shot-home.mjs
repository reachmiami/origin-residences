import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
for (const [n,w,h] of [['desktop',1440,900],['phone',375,812]]) {
  const c = await b.newContext({ viewport:{width:w,height:h} });
  const p = await c.newPage();
  await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
  await p.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));} });
  await p.waitForTimeout(2200);
  await p.evaluate(()=>window.scrollTo(0,0));
  await p.waitForTimeout(600);
  for (const id of ['options','bespoke-design','living-concept','natural-beauty']) {
    const el = await p.$(`#${id}`);
    if (!el) { console.log(`${n}: #${id} MISSING`); continue; }
    await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
    await el.screenshot({ path:`${OUT}/home-${id}--${n}.png` });
  }
  const overflow = await p.evaluate(()=>document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(`${n}: overflow ${overflow}px`);
  await c.close();
}
await b.close(); console.log('captured');
