import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(3000);

// 1. Every language reachable?
const hits = await p.evaluate(() => [...document.querySelectorAll('.langs--bar .langs__item')].map(el => {
  const r = el.getBoundingClientRect();
  const hit = document.elementFromPoint(Math.round(r.left+r.width/2), Math.round(r.top+r.height/2));
  return { t: el.textContent.trim(), ok: hit === el || el.contains(hit) };
}));
console.log('reachable:', hits.map(h=>`${h.t}=${h.ok}`).join('  '));

// 2. Actually click the last one and confirm navigation.
const last = await p.$('.langs--bar .langs__item:last-child');
const href = await last.getAttribute('href');
await last.click();
await p.waitForLoadState('networkidle');
console.log(`clicked POR (${href}) → landed on ${new URL(p.url()).pathname}`);

// 3. Colours: hover vs active, at rest and arrived.
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2800);
const colours = async (label, y) => {
  if (y !== null) { await p.evaluate(sy=>window.scrollTo(0,sy), y); await p.waitForTimeout(1200); }
  await p.hover('.langs--bar .langs__item:nth-child(2)');
  await p.waitForTimeout(250);
  const m = await p.evaluate(() => ({
    hoverLang: getComputedStyle(document.querySelector('.langs--bar .langs__item:nth-child(2)')).color,
    activeLang: getComputedStyle(document.querySelector('.langs--bar .langs__item.is-active')).color,
  }));
  await p.hover('.header__phone'); await p.waitForTimeout(250);
  const ph = await p.evaluate(() => getComputedStyle(document.querySelector('.header__phone')).color);
  console.log(`${label.padEnd(9)} hover=${m.hoverLang.padEnd(22)} active=${m.activeLang.padEnd(22)} phone hover=${ph}`);
};
await colours('at rest', null);
await colours('arrived', 700);
await b.close();
