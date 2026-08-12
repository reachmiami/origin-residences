import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2500);
const sample = async (n, step) => {
  for (let i=0;i<n;i++){
    const m = await p.evaluate(() => {
      const h=document.querySelector('[data-header]'), mg=document.querySelector('[data-mega]');
      const cp=getComputedStyle(mg).clipPath;
      const pct=(cp.match(/inset\([^ ]+ [^ ]+ ([\d.]+)%/)||[])[1];
      return { bar:(getComputedStyle(h).getPropertyValue('--menu-open').trim()||'0').slice(0,4),
               panel: pct!==undefined?(100-parseFloat(pct)).toFixed(0):'100' };
    });
    console.log(`  ${String(i*step).padStart(4)}ms  bar=${m.bar.padEnd(4)}  panel=${m.panel.padStart(3)}%`);
    await p.waitForTimeout(step);
  }
};
console.log('OPEN — bar and panel should rise TOGETHER\n');
await p.click('[data-menu-trigger]'); await sample(8, 120);
console.log('\nCLOSE — panel empties first, bar drains after\n');
await p.click('[data-menu-trigger]'); await sample(12, 120);
await b.close();
