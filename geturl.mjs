import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({viewport:{width:1440,height:1000}})).newPage();
await p.goto('https://originresidences.com/residences/', { waitUntil:'networkidle', timeout:90000 });
await p.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,150));} });
await p.waitForTimeout(2500);
const urls = await p.evaluate(() => [...new Set([...document.querySelectorAll('img')]
  .map(i=>i.currentSrc||i.src).filter(u=>u&&u.includes('f849c96a')))]);
console.log(urls.join('\n') || 'not found as <img>; checking backgrounds');
if (!urls.length) {
  const bg = await p.evaluate(() => [...new Set([...document.querySelectorAll('*')]
    .map(e=>getComputedStyle(e).backgroundImage).filter(v=>v&&v.includes('f849c96a')))]);
  console.log(bg.join('\n'));
}
await b.close();
