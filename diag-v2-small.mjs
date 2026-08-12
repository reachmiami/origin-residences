import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch();
for (const [n,w,h] of [['tablet',768,1024],['phone',375,812]]) {
  const c = await b.newContext({ viewport:{width:w,height:h} });
  const p = await c.newPage();
  p.on('pageerror', e => console.log(`  ${n} PAGE ERROR:`, String(e).slice(0,120)));
  await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
  await p.waitForTimeout(3000);

  const snap = async (label) => await p.evaluate(() => {
    const hdr = document.querySelector('[data-header]');
    const bar = document.querySelector('.header__bar');
    const logo = document.querySelector('[data-flying-logo]');
    const slot = document.querySelector('[data-logo-slot]');
    const r = logo.getBoundingClientRect();
    const cs = getComputedStyle(bar);
    const st = document.querySelector('.header__side--start');
    const en = document.querySelector('.header__side--end');
    const rb = (e)=>{const x=e.getBoundingClientRect();return `${Math.round(x.left)}–${Math.round(x.right)}`;};
    return {
      display: cs.display,
      cols: cs.gridTemplateColumns,
      slotW: slot ? Math.round(slot.getBoundingClientRect().width) : 'no slot',
      logo: `${Math.round(r.width)}×${Math.round(r.height)} @ top ${Math.round(r.top)} centreX ${Math.round(r.left+r.width/2)}`,
      startBox: rb(st), endBox: rb(en),
      headerBg: getComputedStyle(hdr).backgroundColor,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  console.log(`\n===== ${n} (${w}px) =====`);
  const a = await snap('rest');
  console.log(`  bar display=${a.display}  cols=${a.cols}`);
  console.log(`  logo ${a.logo}   (viewport centre ${w/2})`);
  console.log(`  slot=${a.slotW}  flanks start ${a.startBox} / end ${a.endBox}`);
  console.log(`  overflow=${a.overflow}px`);
  await p.screenshot({ path:`${OUT}/v2small-${n}-rest.png` });

  await p.evaluate(()=>window.scrollTo(0,600)); await p.waitForTimeout(1600);
  const s2 = await snap('scrolled');
  console.log(`  -- scrolled --`);
  console.log(`  logo ${s2.logo}`);
  console.log(`  slot=${s2.slotW}  flanks start ${s2.startBox} / end ${s2.endBox}  bar=${s2.headerBg}`);
  await p.screenshot({ path:`${OUT}/v2small-${n}-scrolled.png` });
  await c.close();
}
await b.close();
