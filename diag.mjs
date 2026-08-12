import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
const reqs = [];
p.on('request', r => { const u=r.url(); if(!u.startsWith('http://localhost')) reqs.push(`${r.method()} ${u.slice(0,110)}`); });
p.on('console', m => { if(m.type()==='error') console.log('  console.error:', m.text().slice(0,140)); });

await p.goto('http://localhost:4321/', { waitUntil:'networkidle', timeout:45000 });
await p.waitForTimeout(3000);

console.log('=== third-party requests on page load ===');
reqs.forEach(r => console.log('  ', r));

const state = await p.evaluate(() => ({
  widgetTrackerDefined: typeof window.widgetTracker,
  queueLength: window.widgetTracker && window.widgetTracker.q ? window.widgetTracker.q.length : null,
  fubqDefined: typeof window._fubq,
  scriptTags: [...document.querySelectorAll('script[src]')].map(s=>s.src).filter(s=>!s.includes('localhost')),
  formCount: document.querySelectorAll('form[data-lead-form]').length,
  hiddenName: !!document.querySelector('form[data-lead-form] input[name="name"]'),
  hiddenMsg: !!document.querySelector('form[data-lead-form] input[name="message"]'),
}));
console.log('\n=== page state ===');
console.log(JSON.stringify(state, null, 2));
await b.close();
