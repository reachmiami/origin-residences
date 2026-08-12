import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2800);

const probe = async (y, label) => {
  if (y !== null) { await p.evaluate(sy => window.scrollTo(0, sy), y); await p.waitForTimeout(1200); }
  const m = await p.evaluate(() => {
    const hdr = document.querySelector('[data-header]');
    const g = (s) => { const e = document.querySelector(s); return e ? getComputedStyle(e) : null; };
    const solid = g('.pill--solid'), menu = g('.pill--menu');
    return {
      bg: getComputedStyle(hdr).backgroundColor,
      activeLang: g('.langs--bar .langs__item.is-active')?.color,
      solidBg: solid?.backgroundColor, solidBorder: solid?.borderTopColor,
      menuBg: menu?.backgroundColor, menuBorder: menu?.borderTopColor,
    };
  });
  const same = m.solidBg === m.menuBg && m.solidBorder === m.menuBorder;
  console.log(`${label.padEnd(10)} bar=${m.bg.padEnd(26)} active lang=${m.activeLang}`);
  console.log(`${''.padEnd(10)} Inquire bg=${m.solidBg} border=${m.solidBorder}  → matches Menu: ${same}`);
};

await probe(null, 'at rest');
await probe(700, 'arrived');
await p.evaluate(() => window.scrollTo(0,0)); await p.waitForTimeout(1200);
await p.screenshot({ path:`${OUT}/v2-accent-rest.png`, clip:{x:0,y:0,width:1440,height:120} });
await p.evaluate(() => window.scrollTo(0,700)); await p.waitForTimeout(1400);
await p.screenshot({ path:`${OUT}/v2-accent-arrived.png`, clip:{x:0,y:0,width:1440,height:120} });
await b.close();
