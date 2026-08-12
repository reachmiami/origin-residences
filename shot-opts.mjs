import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));} });
await p.waitForTimeout(2000);
await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(500);
const el = await p.$('.options');
await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
await el.screenshot({ path:`${OUT}/home-options.png` });
// section order down the page
const order = await p.evaluate(()=>[...document.querySelectorAll('main > section, main > div')]
  .map(e=>e.className.split(' ').filter(x=>!x.startsWith('astro')).slice(0,2).join('.')).filter(Boolean));
console.log('section order:', order.join('  →  '));
await b.close();
