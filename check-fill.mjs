import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2500);
console.log('OPEN — bar should EASE to 1 over ~200ms, then the panel moves\n');
await p.click('[data-menu-trigger]');
for (let i=0;i<9;i++){
  const m = await p.evaluate(() => {
    const h=document.querySelector('[data-header]'), mg=document.querySelector('[data-mega]');
    const cp=getComputedStyle(mg).clipPath;
    const pct=(cp.match(/inset\([^ ]+ [^ ]+ ([\d.]+)%/)||[])[1];
    return { bar:(getComputedStyle(h).getPropertyValue('--menu-open').trim()||'0').slice(0,4),
             bg:getComputedStyle(h).backgroundColor,
             panel: pct!==undefined?(100-parseFloat(pct)).toFixed(0):'100' };
  });
  console.log(`  ${String(i*60).padStart(3)}ms  bar=${m.bar.padEnd(4)} panel=${m.panel.padStart(3)}%  ${m.bg}`);
  await p.waitForTimeout(60);
}
await b.close();
