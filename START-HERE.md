# Starter prompt for a new session

Copy everything in the block below and paste it as the first message.

---

```
I'm continuing a build in this directory: a static Astro rebuild of
originresidences.com — a 27-residence luxury waterfront development in Bay
Harbor Islands FL with interiors by Artefacto. (Sales are made from Aventura;
the two addresses are not interchangeable.)

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
   Font weights are 100/200/300, with TWO sanctioned exceptions I approved:
   Montserrat Medium 500 (the homepage header, both forms, the neighbourhood
   locator's list) and SemiBold 600 (the locator's category filter). Do not widen it
   further without asking. Both exception files are latin subsets — check
   HANDOFF before using either weight on new copy.

3. There is no test suite. Verification is Playwright scripts in the project
   root run against a BUILD, never the dev server — `assert-build.mjs` refuses
   to measure one. MEASURE element boxes, computed styles and
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

**Get leads flowing** — the top open item, and the only one blocking the site
> Work open item 1 in HANDOFF.md. I've enabled Pixel form capture in Follow Up
> Boss. Verify with a real submission that a lead is created, using a network
> trace rather than trusting the success panel. Test against a local production
> build — the review deploy omits the pixel on purpose.

**Fill in residence 401's sheet**
> Work open item 2 in HANDOFF.md. Here is the MLS sheet for 401: [PASTE].
> Put it into src/data/listings.ts and check the rows appear.

**Stop the map pins burying the building**
> Work open item 5 in HANDOFF.md. On the Neighborhood locator the gold Origin
> marker measures 85% covered by numbered pins on "All", and 24 of 29 pins
> overlap another. Keep the mark beneath the numbers, but make it visible at
> every category. Measure the coverage before and after.

**Put the site on its real domain**
> Work open item 4 in HANDOFF.md. I've bought [DOMAIN] and pointed its DNS at
> GitHub Pages. Set it in Settings → Pages and confirm the build drops the
> subfolder, the noindex and the CRM pixel's absence — all three should follow
> automatically. Verify on the deployed site, not locally.

**Supply the missing artwork**
> Some pages are standing on a placeholder photograph — grep BAND_PLACEHOLDER.
> I'm handing you real images for [PAGES]. Wire them up and re-run the relevant
> measure-*.mjs, since band contrast depends on the photograph.

## Facts worth pasting if the session needs them fast

- **42 pages**, 3 locales (English at root, `/es/`, `/pt-br/`)
- **27 residences in the building, 2 released** — 302 and 401 — controlled
  solely by `src/data/released.json`. An unreleased residence gets **no page at
  all** now: no URL, no floor-plan PDF, no drawing. Adding its number back
  restores everything in one edit
- **Deployed for client review** at https://reachmiami.github.io/origin-residences/
  — every page noindex, no sitemap, no CRM pixel. The public site is still the
  old WordPress build
- **The site builds for two different roots** — the apex domain, and a
  `/origin-residences/` subfolder on the review copy. Never write a
  root-absolute path by hand: internal links go through `localizePath()`,
  `public/` files through `asset()`, and anything imported from `src/assets/` is
  rewritten by Vite
- Brand: navy `#082341`, sand `#e6dfd5`, gold `#ba935b`, charcoal `#26282a`
  (the Artefacto ground); Montserrat 100/200/300 plus Medium 500 (homepage
  header, forms, locator list) and SemiBold 600 (locator filter) — both
  latin-subset files
- Gold is decorative — for text on light grounds use `--gold-ink`, and on dark
  grounds `--gold-light` (`--gold-ink` measures 2.45:1 on navy)
- **Prices are real and owner-supplied.** 302 has a full MLS sheet; 401 has a
  price only. Never invent a figure — a null renders as an absent row on
  purpose
- Phone and BOTH addresses live only in `src/data/contact.ts`. Two distinct
  places, deliberately named apart: `ADDRESS` is the **sales gallery** (17651
  Biscayne Blvd, Aventura) and `SITE_ADDRESS` is the **building** (9760 West Bay
  Harbor Dr, Bay Harbor Islands). Use `SITE_*` for anything about the site
  itself
- The Neighborhood page carries a keyless locator: 77 places in 9 categories on
  a committed SVG basemap. No tiles, no API key, no billing account. The
  dataset (`src/data/neighborhood-places.ts`) is GENERATED — read its header
  before touching a coordinate, and never change the basemap's extent without
  regenerating every `x`/`y` with it
- Navigation lives in `src/data/nav.ts`, shared by header and footer.
  Floor Plans is deliberately absent from it; the page still builds
- **One homepage.** `/` carries the sunset hero; `/v2/` is retired and
  redirects. `HOME_PATH` in `src/i18n/ui.ts` is the single place the home
  destination is written down
- Follow Up Boss Pixel `WT-FBRKNWTI` is installed but **form capture is off**,
  so no leads are being created yet

## Working notes that save real time

- Run `npm run dev` while editing; `npm run build && npm run preview` before
  trusting anything. The dev server hides build-time failures — an SVG `?raw`
  import worked in dev and broke the build.
- **Sweep a RANGE of viewports, not three.** Real defects have hidden at 320px,
  at short viewport HEIGHTS, and — three separate times on the Artefacto band —
  in the GAP BETWEEN two media queries, where a window was too wide for one
  correction and too short for the other. A 1024x768 tablet failed AA while
  1440 and 768 both passed. One viewport is not evidence about another.
- The page uses Lenis smooth scroll. After `scrollIntoView`, wait for
  `window.scrollY` to hold still before measuring or screenshotting, or rects
  and pixels will disagree.
- **Astro scopes component styles.** Markup written in a page cannot borrow a
  component's classes by name — it will silently come out unstyled. Put it
  inside the component, via a slot, or restate the rules.
- **A CSS rule can lose on specificity and fail silently.** Two padding
  overrides on the Artefacto quote bands did nothing because a `.dark-page
  .quoteband` rule outranked them. The computed styles caught it; the page
  looked plausible either way.
- A webfont can load with a 200 and still be missing most of its glyphs. One of
  ours was, for weeks, and the text quietly rendered in the system fallback. If
  a weight looks wrong, load the face in isolation and compare per-character
  widths — `document.fonts.check()` answers for the family, not the face.
