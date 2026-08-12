import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:1000}, userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126.0 Safari/537.36' });
const p = await c.newPage();
await p.goto('https://originresidences.com/residences/', { waitUntil:'networkidle', timeout:90000 });
await p.waitForTimeout(4000);
await p.evaluate(() => {
  document.querySelectorAll('[class*="popup"],[class*="modal"],[id*="popup"],[class*="floating"]').forEach(e=>e.remove());
  document.querySelectorAll('*').forEach(e => {
    const s = getComputedStyle(e);
    if ((s.position==='fixed'||s.position==='sticky') && e.getBoundingClientRect().height<700 && !e.closest('.ip-page-section')
        && !/header|nav/i.test(e.className||'')) e.remove();
  });
});
await p.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,150));} });
await p.waitForTimeout(3000);
await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(600);

const secs = await p.$$('.ip-page-section');
console.log('total ip-page-section on /residences/:', secs.length);
for (const i of [4,5,6,7]) {          // sections 5..8
  if (!secs[i]) { console.log(`section ${i+1} absent`); continue; }
  await secs[i].scrollIntoViewIfNeeded(); await p.waitForTimeout(700);
  await secs[i].screenshot({ path: `${OUT}/res-sec${i+1}.png` });
  const info = await secs[i].evaluate(el => ({
    cls: el.className.replace(/\s+/g,' ').slice(0,120),
    text: [...new Set([...el.querySelectorAll('*')].map(e =>
        (e.children.length===0 ? (e.textContent||'') : '').replace(/\s+/g,' ').trim()).filter(t=>t.length>1))].slice(0,14),
    imgs: [...new Set([...el.querySelectorAll('img')].map(im=>(im.currentSrc||im.src)))]
        .filter(u=>u && !u.startsWith('data:')).map(u=>u.split('/').pop()).slice(0,4),
  }));
  console.log(`--- section ${i+1} --- [${info.cls}]`);
  info.text.forEach(t=>console.log('    ', t.slice(0,150)));
  info.imgs.forEach(m=>console.log('     IMG', m.slice(0,60)));
}
await b.close();
