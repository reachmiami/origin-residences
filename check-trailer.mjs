import { chromium } from 'playwright';
const OUT='/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
const b = await chromium.launch({ args:['--autoplay-policy=no-user-gesture-required'] });
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
p.on('pageerror', e => console.log('  PAGE ERROR:', String(e).slice(0,140)));
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(2800);

const state = async (l) => {
  const m = await p.evaluate(() => {
    const box = document.querySelector('[data-trailer]');
    const v = document.querySelector('[data-trailer-video]');
    return { hidden: box.hidden, opacity: getComputedStyle(box).opacity,
             paused: v.paused, time: v.currentTime.toFixed(1),
             focus: document.activeElement?.getAttribute('data-trailer-close') !== null
                    ? 'close button' : document.activeElement?.tagName };
  });
  console.log(`  ${l.padEnd(22)} hidden=${String(m.hidden).padEnd(5)} opacity=${m.opacity.padEnd(4)} paused=${String(m.paused).padEnd(5)} t=${m.time}s focus=${m.focus}`);
};

console.log('button label:', await p.textContent('[data-trailer-open] span'));
await state('before open');
await p.click('[data-trailer-open]'); await p.waitForTimeout(1200);
await state('after open');
await p.screenshot({ path:`${OUT}/trailer-open.png` });

await p.keyboard.press('Escape'); await p.waitForTimeout(900);
await state('after Escape');

await p.click('[data-trailer-open]'); await p.waitForTimeout(1000);
await state('reopened');
await p.click('[data-trailer-close]'); await p.waitForTimeout(900);
await state('after X button');
await b.close();
