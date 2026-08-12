import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:1000}, userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126.0 Safari/537.36' });
const p = await c.newPage();
await p.goto('https://originresidences.com/', { waitUntil:'networkidle', timeout:90000 });
await p.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));} });
await p.waitForTimeout(3000);

const out = await p.evaluate(() => {
  const wanted = [5,6,7,8,9];
  return [...document.querySelectorAll('.ip-page-section')].map((s,i)=>({s,i:i+1}))
    .filter(x => wanted.includes(x.i))
    .map(({s,i}) => {
      const seen = new Set(); const text = [];
      for (const e of s.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')) {
        const t = (e.textContent||'').replace(/\s+/g,' ').trim();
        if (t && t.length > 1 && !seen.has(t)) { seen.add(t); text.push(e.tagName.toLowerCase()+'|'+t); }
      }
      const imgs = [...s.querySelectorAll('img')]
        .map(im => im.currentSrc || im.src).filter(u => u && !u.startsWith('data:'))
        .map(u => u.split('/').pop());
      const bgs = [...s.querySelectorAll('*')]
        .map(e => getComputedStyle(e).backgroundImage)
        .filter(v => v && v.includes('url(') && !v.includes('data:'))
        .map(v => (v.match(/url\("?([^")]+)/)||[])[1]).filter(Boolean).map(u=>u.split('/').pop());
      return { i, cls: s.className.replace(/\s+/g,' ').trim().slice(0,140), text,
               imgs:[...new Set(imgs)].slice(0,5), bgs:[...new Set(bgs)].slice(0,3) };
    });
});
for (const s of out) {
  console.log('='.repeat(70));
  console.log(`SECTION ${s.i}`);
  console.log('  class:', s.cls);
  s.text.forEach(t => console.log('   ', t.slice(0,230)));
  s.imgs.forEach(m => console.log('   IMG', m.slice(0,60)));
  s.bgs.forEach(m => console.log('   BG ', m.slice(0,60)));
}
await b.close();
