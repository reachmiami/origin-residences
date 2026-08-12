import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900} });
const p = await c.newPage();
await p.goto('http://localhost:4321/v2/', { waitUntil:'networkidle' });
await p.waitForTimeout(3000);

const info = await p.evaluate(() => {
  const items = [...document.querySelectorAll('.langs--bar .langs__item')];
  return items.map(el => {
    const r = el.getBoundingClientRect();
    const cx = Math.round(r.left + r.width/2), cy = Math.round(r.top + r.height/2);
    const hit = document.elementFromPoint(cx, cy);
    return {
      text: el.textContent.trim(),
      active: el.classList.contains('is-active'),
      box: `${Math.round(r.left)}–${Math.round(r.right)} × ${Math.round(r.top)}–${Math.round(r.bottom)}`,
      hitTag: hit ? hit.tagName.toLowerCase() : 'none',
      hitClass: hit ? (hit.className.toString().split(' ').filter(x=>!x.startsWith('astro')).join('.') || '(none)') : '',
      isSelf: hit === el || el.contains(hit),
    };
  });
});
console.log('LANGUAGE HIT TESTING (at rest, before scrolling)\n');
info.forEach(i => console.log(`  ${i.text}${i.active?' *active*':'        '}  box ${i.box}\n     topmost element at centre: <${i.hitTag}> ${i.hitClass}  → reaches the link: ${i.isSelf}`));

// what is that blocker, exactly?
const blocker = await p.evaluate(() => {
  const items = [...document.querySelectorAll('.langs--bar .langs__item')];
  const last = items[items.length-1];
  const r = last.getBoundingClientRect();
  const hit = document.elementFromPoint(Math.round(r.left+r.width/2), Math.round(r.top+r.height/2));
  if (!hit) return null;
  const cs = getComputedStyle(hit);
  const hr = hit.getBoundingClientRect();
  return { tag: hit.tagName, cls: hit.className.toString().slice(0,80), pos: cs.position, z: cs.zIndex,
           box: `${Math.round(hr.left)}–${Math.round(hr.right)} × ${Math.round(hr.top)}–${Math.round(hr.bottom)}`,
           pointer: cs.pointerEvents, opacity: cs.opacity };
});
console.log('\nBLOCKER DETAIL:', JSON.stringify(blocker, null, 1));
await b.close();
