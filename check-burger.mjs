import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
for (const [page,label] of [['/v2/','v2'],['/','v1']]) {
  for (const [n,w,h] of [['desktop',1440,900],['tablet',768,1024],['phone',375,812]]) {
    const c = await b.newContext({ viewport:{width:w,height:h} });
    const p = await c.newPage();
    await p.goto('http://localhost:4321'+page, { waitUntil:'networkidle' });
    await p.waitForTimeout(2400);
    const m = await p.evaluate(() => {
      const menu = document.querySelector('.pill--menu');
      const burger = document.querySelector('.burger');
      const stack = menu?.querySelector('.pill__stack');
      const r = menu.getBoundingClientRect();
      return { burger: getComputedStyle(burger).display,
               words: stack ? getComputedStyle(stack).display : 'n/a',
               size: `${Math.round(r.width)}×${Math.round(r.height)}` };
    });
    console.log(`${label} ${n.padEnd(8)} burger=${m.burger.padEnd(6)} worded=${m.words.padEnd(6)} button=${m.size}`);
    if (n==='desktop') await p.screenshot({ path:`${OUT}/burger-${label}.png`, clip:{x:0,y:0,width:w,height:110} });
    await c.close();
  }
}
await b.close();
