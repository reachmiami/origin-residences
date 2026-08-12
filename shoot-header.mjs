import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
for (const [n, w, h] of [['desktop',1440,900],['tablet',768,1024],['phone',375,812]]) {
  const c = await b.newContext({ viewport: { width: w, height: h } });
  const p = await c.newPage();
  await p.goto('http://localhost:4321/amenities/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/hdr--${n}.png`, clip: { x:0, y:0, width:w, height: n==='phone'?150:170 } });
  await c.close();
}
await b.close(); console.log('header shots written');
