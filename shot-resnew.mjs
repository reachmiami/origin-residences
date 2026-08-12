import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
for (const [n,w,h] of [['desktop',1440,900],['phone',375,812]]) {
  const c = await b.newContext({ viewport:{width:w,height:h} });
  const p = await c.newPage();
  await p.goto('http://localhost:4321/residences/', { waitUntil:'networkidle' });
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}});
  await p.waitForTimeout(2200);
  await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(500);
  for (const sel of ['#sliding-glass','.statement','#modern-bathrooms']) {
    const el = await p.$(sel);
    if (!el) { console.log(`${n}: ${sel} MISSING`); continue; }
    await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(450);
    await el.screenshot({ path:`${OUT}/resnew-${sel.replace(/[#.]/g,'')}--${n}.png` });
  }
  const of = await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  const order = await p.evaluate(()=>[...document.querySelectorAll('main > section')].map(e=>e.className.split(' ').filter(x=>!x.startsWith('astro')).slice(0,2).join('.')).filter(Boolean));
  console.log(`${n}: overflow ${of}px`);
  if (n==='desktop') console.log('order:', order.join(' → '));
  await c.close();
}
await b.close();
