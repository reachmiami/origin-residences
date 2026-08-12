import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
p.on('pageerror', e => console.log('  PAGE ERROR:', String(e).slice(0,120)));
await p.goto('http://localhost:4321/residences/', { waitUntil:'networkidle' });
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}});
await p.waitForTimeout(1500);

for (const [id, expected] of [['sliding-glass',3], ['modern-bathrooms',2]]) {
  const sec = await p.$(`#${id}`);
  await sec.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  const n = await sec.$$eval('[data-slide]', els => els.length);
  const before = await sec.$$eval('[data-slide]', els => els.findIndex(e=>e.classList.contains('is-active')));
  await sec.$eval('[data-next]', el => el.click());
  await p.waitForTimeout(900);
  const after = await sec.$$eval('[data-slide]', els => els.findIndex(e=>e.classList.contains('is-active')));
  const hidden = await sec.$$eval('[data-slide]', els => els.filter(e=>e.getAttribute('aria-hidden')==='true').length);
  console.log(`#${id}: ${n} slides (expected ${expected}) · active ${before} → ${after} · aria-hidden on ${hidden}`);
  await sec.screenshot({ path:`${OUT}/carousel-${id}.png` });
}
const of = await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
console.log('overflow:', of+'px');
await b.close();
