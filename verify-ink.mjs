import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(3000);
for (const [y,label,shot] of [[0,'top (bright sky)','ink-0.png'],[240,'mid (image moving)','ink-240.png'],[380,'low (dark water)','ink-380.png'],[520,'landed (white bar)','ink-520.png']]) {
  await p.evaluate(sy=>window.scrollTo(0,sy), y); await p.waitForTimeout(1000);
  const m = await p.evaluate(() => {
    const h = document.querySelector('[data-header]');
    return { ink: getComputedStyle(h).color, bg: getComputedStyle(h).backgroundColor,
             scrim: getComputedStyle(h,'::before').opacity };
  });
  console.log(`${label.padEnd(20)} ink=${m.ink.padEnd(34)} bar=${m.bg.padEnd(26)} shade opacity=${m.scrim}`);
  await p.screenshot({ path:`${OUT}/${shot}`, clip:{x:0,y:0,width:1440,height:120} });
}
await b.close();
