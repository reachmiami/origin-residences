import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(3000);
await p.evaluate(() => window.scrollTo(0, 520));
// sample the fade as it runs
for (const t of [0, 150, 300, 500, 750, 1000, 1300]) {
  await p.waitForTimeout(t === 0 ? 40 : 0);
  const m = await p.evaluate(() => {
    const h = document.querySelector('[data-header]');
    return { v: getComputedStyle(h).getPropertyValue('--header-bg').trim(),
             ink: getComputedStyle(h).color };
  });
  console.log(`~${String(t).padStart(4)}ms  --header-bg=${m.v.slice(0,6).padEnd(7)} ink=${m.ink}`);
  if (t !== 1300) await p.waitForTimeout(t === 0 ? 110 : (t === 150 ? 150 : (t === 300 ? 200 : (t === 500 ? 250 : (t === 750 ? 250 : 300)))));
}
await b.close();
