import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();

for (const [path, label] of [['/v2/','v2'], ['/','v1 (must be unchanged)']]) {
  await p.goto('http://localhost:4321'+path, { waitUntil:'networkidle' });
  await p.waitForTimeout(2600);
  const m = await p.evaluate(() => {
    const g = (s) => { const e = document.querySelector(s); return e ? getComputedStyle(e) : null; };
    const pill = g('.pill--solid');
    return {
      phoneW: g('.header__phone')?.fontWeight,
      langW: g('.langs--bar .langs__item')?.fontWeight,
      activeLang: g('.langs--bar .langs__item.is-active')?.color,
      pillFaceW: g('.pill--solid .pill__face')?.fontWeight,
      pillBg: pill?.backgroundColor,
      pillColor: pill?.color,
    };
  });
  console.log(`${label}: phone=${m.phoneW} langs=${m.langW} pillFace=${m.pillFaceW}`);
  console.log(`   active lang ${m.activeLang} · Inquire bg ${m.pillBg} text ${m.pillColor}`);
}
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2600);
await p.screenshot({ path:`${OUT}/v2-header-weights.png`, clip:{x:0,y:0,width:1440,height:130} });
await b.close();
