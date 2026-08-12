import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(3200);

const probe = async (y, label, shot) => {
  if (y !== null) { await p.evaluate(sy => window.scrollTo(0, sy), y); await p.waitForTimeout(1200); }
  const m = await p.evaluate(() => {
    const logo = document.querySelector('[data-flying-logo]');
    const r = logo.getBoundingClientRect();
    const content = document.querySelector('.hero2__content');
    return {
      centreX: Math.round(r.left + r.width / 2),
      top: Math.round(r.top),
      h: Math.round(r.height),
      copyOpacity: content ? Number(getComputedStyle(content).opacity).toFixed(2) : 'n/a',
    };
  });
  console.log(`${label.padEnd(11)} logo centreX=${m.centreX} top=${String(m.top).padStart(4)} h=${m.h}  copy opacity=${m.copyOpacity}`);
  if (shot) await p.screenshot({ path: `${OUT}/${shot}` });
  return m;
};

console.log('viewport centre is 720\n');
const a = await probe(null, 'at rest', 'v2c-rest.png');
await probe(150, 'early');
const mid = await probe(260, 'mid', 'v2c-mid.png');
await probe(700, 'arrived', 'v2c-arrived.png');
console.log(`\nvertical travel: ${a.top} → 30 (${a.top - 30}px of rise)`);
console.log(`centre drift: ${Math.abs(a.centreX - 720)}px at rest, ${Math.abs(mid.centreX - 720)}px mid-flight`);
await b.close();
