import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
for (const [n,w,h] of [['desktop',1440,900],['tablet',768,1024],['phone',375,812]]) {
  const c = await b.newContext({ viewport:{width:w,height:h} });
  const p = await c.newPage();
  await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
  await p.waitForTimeout(2600);
  await p.evaluate(()=>window.scrollTo(0,700)); await p.waitForTimeout(1500);
  const m = await p.evaluate(() => {
    const ph = document.querySelector('.header__phone');
    const lg = document.querySelector('.langs--bar');
    const r = e => e ? e.getBoundingClientRect() : null;
    const a = r(ph), bb = r(lg);
    return {
      phone: a ? `${Math.round(a.left)}–${Math.round(a.right)}` : 'none',
      langs: bb && bb.width ? `${Math.round(bb.left)}–${Math.round(bb.right)}` : 'hidden',
      gap: (a && bb && bb.width) ? Math.round(bb.left - a.right) : null,
      first: (a && bb && bb.width) ? (a.left < bb.left ? 'phone' : 'languages') : 'n/a',
      showsNumber: ph ? getComputedStyle(ph.querySelector('.header__phone-text')).display !== 'none' : null,
      showsIcon: ph ? getComputedStyle(ph.querySelector('.header__phone-icon')).display !== 'none' : null,
    };
  });
  console.log(`${n.padEnd(8)} phone ${m.phone.padEnd(12)} langs ${m.langs.padEnd(12)} gap=${String(m.gap).padEnd(5)} first=${m.first.padEnd(10)} number=${m.showsNumber} icon=${m.showsIcon}`);
  await p.screenshot({ path:`${OUT}/order-${n}.png`, clip:{x:0,y:0,width:w,height:100} });
  await c.close();
}
await b.close();
