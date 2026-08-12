import { chromium } from 'playwright';
const b = await chromium.launch();
for (const [n,w,h] of [['desktop',1440,900],['tablet',768,1024],['phone',375,812]]) {
  const c = await b.newContext({ viewport:{width:w,height:h} });
  const p = await c.newPage();
  await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
  await p.waitForTimeout(2500);

  const sample = async (phase) => {
    const rows = [];
    for (let i=0;i<7;i++){
      const m = await p.evaluate(() => {
        const hdr = document.querySelector('[data-header]');
        const mega = document.querySelector('[data-mega]');
        const cp = getComputedStyle(mega).clipPath;
        const pct = (cp.match(/inset\([^ ]+ [^ ]+ ([\d.]+)%/)||[])[1];
        return { bg: getComputedStyle(hdr).getPropertyValue('--menu-open').trim(),
                 panel: pct !== undefined ? (100-parseFloat(pct)).toFixed(0)+'%' : 'open' };
      });
      rows.push(`${String(i*120).padStart(3)}ms bar=${(m.bg||'0').slice(0,4).padEnd(4)} panel=${m.panel.padEnd(5)}`);
      await p.waitForTimeout(120);
    }
    console.log(`  ${phase}: ` + rows.join(' | '));
  };

  console.log(`\n===== ${n} =====`);
  await p.click('[data-menu-trigger]');
  await sample('opening');
  await p.click('[data-menu-trigger]');
  await sample('closing');
  await c.close();
}
await b.close();
