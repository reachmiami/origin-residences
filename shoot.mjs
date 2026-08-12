import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = 'http://localhost:4321';
const OUT = '/private/tmp/claude-501/-Users-felixmendoza-Documents-Projects-Origin-Residences-by-Artefacto-Website-Redesign/e3e089bd-56a5-4c60-a8b6-6d7c798edaff/scratchpad/shots';
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: 'phone', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const PAGES = [
  { slug: '', name: 'home' },
  { slug: 'residences/', name: 'residences' },
  { slug: 'ph-level-7-unit-702/', name: 'unit-702' },
  { slug: 'gallery/', name: 'gallery' },
  { slug: 'amenities/', name: 'amenities' },
  { slug: 'schedule-virtual-tour/', name: 'schedule' },
  { slug: 'floor-plans/', name: 'floor-plans' },
  { slug: 'the-team/', name: 'the-team' },
  { slug: 'es/', name: 'home-es' },
];

const problems = [];

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  page.on('console', (m) => {
    if (m.type() === 'error') problems.push(`[console:${vp.name}] ${m.text().slice(0, 160)}`);
  });
  page.on('pageerror', (e) => problems.push(`[pageerror:${vp.name}] ${String(e).slice(0, 160)}`));

  for (const p of PAGES) {
    const url = `${BASE}/${p.slug}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    // Let reveal animations settle so nothing is captured mid-fade.
    await page.waitForTimeout(1200);

    // Horizontal overflow is the defect that hides best in a screenshot.
    const overflow = await page.evaluate(() => {
      const de = document.documentElement;
      const over = de.scrollWidth - de.clientWidth;
      let worst = null;
      if (over > 1) {
        for (const el of document.querySelectorAll('*')) {
          const r = el.getBoundingClientRect();
          if (r.right > de.clientWidth + 1 && r.width > 0) {
            worst = `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} right=${Math.round(r.right)}`;
            break;
          }
        }
      }
      return { over, worst };
    });
    if (overflow.over > 1) {
      problems.push(`[overflow:${vp.name}] /${p.slug} scrollWidth exceeds by ${overflow.over}px — first offender: ${overflow.worst}`);
    }

    await page.screenshot({ path: `${OUT}/${p.name}--${vp.name}.png`, fullPage: false });
  }

  // The mega panel, opened, at each width — the nav that replaced the hamburger.
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.click('[data-menu-trigger]');
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/megapanel--${vp.name}.png`, fullPage: false });

  const expanded = await page.getAttribute('[data-menu-trigger]', 'aria-expanded');
  if (expanded !== 'true') problems.push(`[nav:${vp.name}] aria-expanded is "${expanded}" after opening`);

  await ctx.close();
}

// Gallery expand-in-place, desktop only.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/gallery/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.click('[data-open]');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/gallery-expanded--desktop.png` });
  await ctx.close();
}

await browser.close();

fs.writeFileSync(`${OUT}/problems.txt`, problems.join('\n') || 'none');
console.log(problems.length ? problems.join('\n') : 'no console errors or overflow detected');
console.log(`\n${fs.readdirSync(OUT).filter((f) => f.endsWith('.png')).length} screenshots written`);
