import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
const posts = [];
p.on('request', r => {
  const u = r.url();
  if (u.includes('widgetbe') || u.includes('web3forms') || u.includes('followupboss')) {
    posts.push({ m:r.method(), u:u.slice(0,90), body:(r.postData()||'').slice(0,320) });
  }
});
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.waitForTimeout(2500);
posts.length = 0;   // ignore pageview traffic; watch only what submit causes

await p.fill('input[name="firstName"]', 'ZZTEST');
await p.fill('input[name="lastName"]', 'DELETEME');
await p.fill('input[name="email"]', 'zztest.deleteme@example.com');
await p.fill('input[name="phone"]', '3055550147');
await p.check('input[name="consent"]');
await p.waitForTimeout(300);

const before = await p.evaluate(() => ({
  name: document.querySelector('form[data-lead-form] input[name="name"]')?.value ?? null,
  message: (document.querySelector('form[data-lead-form] input[name="message"]')?.value ?? '').slice(0,60),
}));
console.log('hidden fields at submit time:', JSON.stringify(before));

await p.click('form[data-lead-form] button[type="submit"]');
await p.waitForTimeout(4000);

console.log('\n=== requests caused by submit ===');
if (!posts.length) console.log('  NONE — nothing was sent anywhere');
posts.forEach(r => console.log(`  ${r.m} ${r.u}\n     body: ${r.body}`));

const ok = await p.evaluate(() => !document.querySelector('[data-form-success]')?.hidden);
console.log('\nsuccess panel shown to visitor:', ok);
await b.close();
