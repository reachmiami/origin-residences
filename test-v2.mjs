import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
p.on('pageerror', e => console.log('  PAGE ERROR:', String(e).slice(0,140)));
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(3200);            // let the arrival sequence finish

const read = async (label) => {
  const m = await p.evaluate(() => {
    const logo = document.querySelector('[data-flying-logo]');
    const img = logo?.querySelector('img');
    const hdr = document.querySelector('[data-header]');
    const r = logo?.getBoundingClientRect();
    return {
      logoTop: Math.round(r?.top ?? -1),
      logoH: Math.round(img?.getBoundingClientRect().height ?? 0),
      slot: getComputedStyle(hdr).getPropertyValue('--logo-slot').trim(),
      logoOpacity: getComputedStyle(logo).opacity,
    };
  });
  console.log(`${label}: logo top=${m.logoTop}px height=${m.logoH}px · header slot=${m.slot} · opacity=${m.logoOpacity}`);
  return m;
};

await read('at rest ');
await p.screenshot({ path:`${OUT}/v2-hero-top.png` });

await p.evaluate(() => window.scrollTo(0, 700));
await p.waitForTimeout(1400);
await read('scrolled');
await p.screenshot({ path:`${OUT}/v2-hero-scrolled.png` });

const of = await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
console.log('overflow:', of+'px');
await b.close();
