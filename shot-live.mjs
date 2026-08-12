import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:1000}, userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126.0 Safari/537.36' });
const p = await c.newPage();
await p.goto('https://originresidences.com/', { waitUntil:'networkidle', timeout:90000 });
await p.waitForTimeout(4000);

// Kill every floating overlay/popup so it cannot obscure the sections.
await p.evaluate(() => {
  const kill = (el) => el && el.remove();
  document.querySelectorAll('[class*="popup"],[class*="modal"],[id*="popup"],[class*="ip-schedule"],[class*="floating"]').forEach(kill);
  document.querySelectorAll('*').forEach(e => {
    const s = getComputedStyle(e);
    if ((s.position === 'fixed' || s.position === 'sticky') && e.getBoundingClientRect().height < 700 && !e.closest('.ip-page-section')) {
      if (!/header|nav/i.test(e.className || '')) e.remove();
    }
  });
});
await p.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,150));} });
await p.waitForTimeout(3000);
await p.evaluate(()=>window.scrollTo(0,0));
await p.waitForTimeout(600);

const secs = await p.$$('.ip-page-section');
for (const i of [4,5,6,7,8]) {
  await secs[i].scrollIntoViewIfNeeded();
  await p.waitForTimeout(700);
  await secs[i].screenshot({ path: `${OUT}/orig-sec${i+1}.png` });
  const txt = await secs[i].evaluate(el => [...el.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')]
     .map(e=>(e.textContent||'').replace(/\s+/g,' ').trim()).filter(t=>t.length>1));
  console.log(`--- section ${i+1} ---`);
  [...new Set(txt)].forEach(t=>console.log('   ', t.slice(0,200)));
}
await b.close();
