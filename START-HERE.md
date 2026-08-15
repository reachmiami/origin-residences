# Starter prompt for a new session

Copy everything in the block below and paste it as the first message.

---

```
I'm continuing a build in this directory: a static Astro rebuild of
originresidences.com — a 27-residence luxury waterfront development in
Aventura FL with interiors by Artefacto.

Before doing anything, read these in order:
  1. HANDOFF.md      — state of the build, gotchas, prioritised open items
  2. PRODUCT.md      — product truth and the PINNED brand constraints
  3. README.md       — commands, layout, non-negotiables

Three things to know immediately:

1. `npm run build` runs clean. A pre-build guard (`scripts/check-env.mjs`)
   refuses to build if a credential appears in a PUBLIC_ variable — it passes
   now and must stay. Never "fix" a guard failure by removing the guard.

2. The brand is PINNED. I was offered a redesign and declined it. Palette,
   typeface and register are fixed; modernisation goes into execution only.
   Font weights are 100/200/300, with ONE sanctioned exception: Montserrat
   Medium 500, used in the v2 header and in both forms. Do not widen it
   further without asking.

3. There is no test suite. Verification is Playwright scripts in the project
   root run against a build. MEASURE element boxes, computed styles and
   composited pixels — do not judge from screenshots. Every real bug in this
   build so far was invisible in a screenshot and obvious in a measurement,
   and several *apparent* bugs turned out to be flaws in the measurement
   itself. Read the "Measuring without fooling yourself" section of
   HANDOFF.md before writing a new check.

Please confirm you've read those files and summarise back to me: the current
state, and what you understand the next priority to be. Don't change anything
until I confirm.
```

---

## If you'd rather point it straight at a task

Swap the last paragraph for one of these:

**Fix the page-band contrast** — the top open item
> Work open item 1 in HANDOFF.md. The `.band` veil in `PageBand.astro` fails
> AA on 37 pages — the Residences eyebrow measures 1.40:1. Strengthen the veil
> where the type actually sits and prove every page clears 4.5:1 by sampling
> composited pixels, the way `measure-stack-contrast.mjs` does.

**Resolve the two-homepage situation**
> Work open item 2 in HANDOFF.md. I've chosen v2 — move its hero treatment to
> `/`, retire `/v2/`, and fix the noindex/sitemap contradiction. Keep the
> canonical homepage URL.

**Get leads flowing**
> Work open item 3 in HANDOFF.md. I've enabled Pixel form capture in Follow Up
> Boss. Verify with a real submission that a lead is created, using a network
> trace rather than trusting the success panel.

**Supply the missing artwork**
> Six pages are standing on a placeholder photograph — grep BAND_PLACEHOLDER.
> I'm handing you real images for [PAGES]. Wire them up and re-run
> `measure-stack-contrast.mjs`, since the band's contrast depends on the photo.

## Facts worth pasting if the session needs them fast

- 120 pages, 3 locales (English at root, `/es/`, `/pt-br/`)
- 27 residences; **3 released** — controlled solely by `src/data/released.json`
- Brand: navy `#082341`, sand `#e6dfd5`, gold `#ba935b`; Montserrat 100/200/300
  plus Medium 500 in the v2 header and both forms
- Gold is decorative — for text on light grounds use `--gold-ink`
- Phone/address live only in `src/data/contact.ts` — **except** a stale
  duplicate `MAP_HREF` in `neighborhood.astro`, which is a known bug
- Navigation lives in `src/data/nav.ts`, shared by header and footer.
  Floor Plans is deliberately absent from it; the page still builds
- Two homepages: `/` (v1) and `/v2/`; every logo currently links to `/v2/` via
  `HOME_PATH` in `src/i18n/ui.ts`
- Follow Up Boss Pixel `WT-FBRKNWTI` is installed but **form capture is off**,
  so no leads are being created yet
- Nothing is deployed; the live site is still the old WordPress build

## Working notes that save real time

- Run `npm run dev` while editing; `npm run build && npm run preview` before
  trusting anything. The dev server hides build-time failures — an SVG `?raw`
  import worked in dev and broke the build.
- `shoot.mjs` checks 375/768/1440 only. Real defects have hidden at 320px and
  at short viewport HEIGHTS. Sweep widths *and* heights when layout changes.
- The page uses Lenis smooth scroll. After `scrollIntoView`, wait for
  `window.scrollY` to hold still before measuring or screenshotting, or rects
  and pixels will disagree.
