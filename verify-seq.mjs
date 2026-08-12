import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(3000);

const read = async (label) => {
  const m = await p.evaluate(() => {
    const h = document.querySelector('[data-header]');
    const logo = document.querySelector('[data-flying-logo]');
    const r = logo.getBoundingClientRect();
    return {
      bg: getComputedStyle(h).backgroundColor,
      raw: getComputedStyle(h).getPropertyValue('--header-bg').trim(),
      logoTop: Math.round(r.top), logoH: Math.round(r.height),
      accent: getComputedStyle(document.querySelector('.langs--bar .langs__item.is-active')).color,
    };
  });
  console.log(`${label.padEnd(22)} logo ${String(m.logoH).padStart(3)}px @${String(m.logoTop).padStart(4)}  --header-bg=${m.raw.padEnd(6)} bar=${m.bg.padEnd(26)} accent=${m.accent}`);
};

const at = async (y, label, settle=1100) => { await p.evaluate(sy=>window.scrollTo(0,sy), y); await p.waitForTimeout(settle); await read(label); };

console.log('DOWN — bar must stay transparent for the whole flight\n');
await read('0  at rest');
await at(120, '120  flight 25%');
await at(240, '240  flight 50%');
await at(360, '360  flight 75%');
await at(460, '460  just landed', 120);   // mid-fade
await at(460, '460  after fade', 900);
console.log('\nUP — must reverse\n');
await at(300, '300  flying back', 900);
await at(0,   '0   back at rest', 900);
await b.close();
