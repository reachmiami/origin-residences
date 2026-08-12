import { chromium } from 'playwright';
const b = await chromium.launch();
for (const [n,w] of [['desktop',1440],['tablet',768],['phone',375]]) {
  const c = await b.newContext({ viewport:{width:w,height:900} });
  const p = await c.newPage();
  await p.goto('http://localhost:4321/amenities/',{waitUntil:'networkidle'});
  await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const px = (el) => el ? getComputedStyle(el).fontSize : null;
    const box = (el) => el ? Math.round(el.getBoundingClientRect().right) : null;
    const items = [...document.querySelectorAll('.header__bar *')].filter(e=>e.getBoundingClientRect().width>0);
    let overlap = null;
    const langs = document.querySelector('.langs--bar'), phone = document.querySelector('.header__phone'), menu = document.querySelector('.pill--menu');
    const R = (e)=> e? e.getBoundingClientRect() : null;
    const a=R(langs), bb=R(phone), cc=R(menu);
    if (a&&bb&&a.right>bb.left+1 && a.top<bb.bottom && a.bottom>bb.top) overlap='langs/phone';
    if (bb&&cc&&bb.right>cc.left+1) overlap = (overlap?overlap+' & ':'')+'phone/menu';
    return { phoneFont: px(phone), langFont: px(document.querySelector('.langs--bar .langs__item')),
             barScroll: document.querySelector('.header__bar').scrollWidth, barW: Math.round(document.querySelector('.header__bar').getBoundingClientRect().width),
             rightMost: box(menu), overlap };
  });
  console.log(`${n}: phone=${r.phoneFont} langs=${r.langFont} | bar ${r.barW} (scroll ${r.barScroll}) rightEdge=${r.rightMost} | overlap: ${r.overlap ?? 'none'}`);
  await c.close();
}
await b.close();
