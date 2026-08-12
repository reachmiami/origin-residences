import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2500);

const sample = async (phase, steps) => {
  const rows = [];
  for (let i=0;i<steps;i++){
    const m = await p.evaluate(() => {
      const hdr = document.querySelector('[data-header]');
      const mega = document.querySelector('[data-mega]');
      const cp = getComputedStyle(mega).clipPath;
      const pct = (cp.match(/inset\([^ ]+ [^ ]+ ([\d.]+)%/)||[])[1];
      return { bar: (getComputedStyle(hdr).getPropertyValue('--menu-open').trim()||'0').slice(0,4),
               panel: pct !== undefined ? (100-parseFloat(pct)).toFixed(0) : '100' };
    });
    rows.push(`${String(i*100).padStart(4)}ms bar=${m.bar.padEnd(4)} panel=${m.panel.padStart(3)}%`);
    await p.waitForTimeout(100);
  }
  console.log(`${phase}\n   ` + rows.join('\n   '));
};

console.log('OPEN — bar should reach 1 BEFORE the panel starts moving\n');
await p.click('[data-menu-trigger]');
await sample('', 11);

console.log('\nCLOSE — panel should reach 0 BEFORE the bar starts draining\n');
await p.click('[data-menu-trigger]');
await sample('', 11);
await b.close();
