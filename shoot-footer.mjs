import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
for (const [n, w, h] of [['desktop',1440,900],['tablet',768,1024],['phone',375,812]]) {
  const c = await b.newContext({ viewport: { width: w, height: h } });
  const p = await c.newPage();
  await p.goto('http://localhost:4321/amenities/', { waitUntil: 'networkidle' });
  // Scroll the whole page so every reveal fires, then settle.
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  await p.waitForTimeout(2000);
  // Report how many credit marks actually ended up visible.
  const vis = await p.evaluate(() =>
    [...document.querySelectorAll('.credit')].map(el => +getComputedStyle(el).opacity));
  console.log(`${n}: credit opacities → ${vis.join(', ')}`);
  await (await p.$('footer')).screenshot({ path: `${OUT}/footer--${n}.png` });
  await c.close();
}
await b.close();
