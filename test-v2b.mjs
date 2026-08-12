import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(3200);

const probe = async (y, label, shot) => {
  if (y !== null) { await p.evaluate(sy => window.scrollTo(0, sy), y); await p.waitForTimeout(1300); }
  const m = await p.evaluate(() => {
    const hdr = document.querySelector('[data-header]');
    const logo = document.querySelector('[data-flying-logo]');
    const img = logo?.querySelector('img');
    return {
      bg: getComputedStyle(hdr).backgroundColor,
      logoH: Math.round(img?.getBoundingClientRect().height ?? 0),
      logoTop: Math.round(logo?.getBoundingClientRect().top ?? 0),
    };
  });
  console.log(`${label.padEnd(12)} header bg=${m.bg.padEnd(28)} logo ${m.logoH}px @ top ${m.logoTop}`);
  if (shot) await p.screenshot({ path: `${OUT}/${shot}` });
};

await probe(null, 'at rest', 'v2b-rest.png');
await probe(300,  'mid-travel', 'v2b-mid.png');
await probe(900,  'arrived', 'v2b-arrived.png');
await b.close();
