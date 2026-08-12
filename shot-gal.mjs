import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:1000} });
const p = await c.newPage();
await p.goto('http://localhost:4321/gallery/', { waitUntil:'networkidle' });
await p.waitForTimeout(1200);
await p.click('[data-open]');
await p.waitForTimeout(1400);

const m = await p.evaluate(() => {
  const t = document.querySelector('.tile:target');
  const img = t?.querySelector('.tile__img');
  const cs = (el) => el ? getComputedStyle(el) : null;
  const r = (el) => el ? el.getBoundingClientRect() : null;
  return {
    viewerBg: cs(t)?.backgroundColor,
    viewerColor: cs(t)?.color,
    imgWidth: Math.round(r(img)?.width || 0),
    containerWidth: Math.round(r(t?.querySelector('.tile__trigger'))?.width || 0),
    count: cs(t?.querySelector('.tile__count'))?.color,
    label: cs(t?.querySelector('.tile__label'))?.color,
    step: cs(t?.querySelector('.tile__step'))?.color,
    close: cs(t?.querySelector('.tile__close'))?.color,
    navBorder: cs(t?.querySelector('.tile__nav'))?.borderTopColor,
  };
});
console.log(JSON.stringify(m, null, 1));
await p.screenshot({ path:`${OUT}/gallery-expanded-light.png`, fullPage:false });
await b.close();
