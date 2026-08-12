import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:1000}, userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126.0 Safari/537.36' });
const p = await c.newPage();

// Collect every S3 image the page requests, however it is loaded.
const seen = new Set();
p.on('response', r => { const u = r.url(); if (u.includes('idxboost') && /\.(jpg|jpeg|png|webp)/i.test(u)) seen.add(u); });

await p.goto('https://originresidences.com/residences/', { waitUntil:'networkidle', timeout:90000 });
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,150));}});
await p.waitForTimeout(3000);

const secs = await p.$$('.ip-page-section');
for (const idx of [4, 7]) {                       // sections 5 and 8
  const sec = secs[idx];
  await sec.scrollIntoViewIfNeeded();
  await p.waitForTimeout(800);
  // click "next" repeatedly to force every slide to load
  for (let n = 0; n < 14; n++) {
    const next = await sec.$('[class*="next"], [aria-label*="ext"], button:nth-of-type(2)');
    if (!next) break;
    await next.click({ force: true }).catch(()=>{});
    await p.waitForTimeout(550);
  }
  const inSec = await sec.evaluate(el => [...new Set([...el.querySelectorAll('img')]
      .map(i => i.currentSrc || i.src || i.getAttribute('data-src'))
      .filter(u => u && u.includes('idxboost')))]);
  console.log(`\n=== section ${idx+1}: ${inSec.length} slide image(s) in DOM ===`);
  inSec.forEach(u => console.log('  ', u));
}
console.log(`\n=== all S3 images requested by the page: ${seen.size} ===`);
[...seen].forEach(u => console.log('  ', u));
await b.close();
