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

1. `npm run build` is BLOCKED on purpose. A pre-build guard is refusing to
   build because .env contains a Follow Up Boss API key in a PUBLIC_ variable.
   HANDOFF.md has the placeholder workaround for building without it. Do not
   "fix" this by removing the guard.

2. The brand is PINNED. I was offered a redesign and declined it. Palette,
   typeface and register are fixed; modernisation goes into execution only.
   Font weights are 100/200/300 — there is no heavier weight in the kit.

3. There is no test suite. Verification is Playwright scripts in the project
   root run against `npm run preview`. MEASURE element boxes and computed
   styles rather than eyeballing screenshots — two real bugs in this build
   were invisible in screenshots and obvious in measurements.

Please confirm you've read those files and summarise back to me: the current
state, and what you understand the next priority to be. Don't change anything
until I confirm.
```

---

## If you'd rather point it straight at a task

Swap the last paragraph for one of these:

**Clear the blocked build**
> Start with open item 1 in HANDOFF.md: I've removed the API key from `.env`.
> Confirm `npm run build` now runs unassisted and the guard passes.

**Resolve the two-homepage situation**
> Work open item 3 in HANDOFF.md. I've chosen v2 — move its hero treatment to
> `/`, retire `/v2/`, and fix the noindex/sitemap contradiction. Keep the
> canonical homepage URL.

**Get leads flowing**
> Work open item 2 in HANDOFF.md. I've enabled Pixel form capture in Follow Up
> Boss. Verify with a real submission that a lead is created, using a network
> trace rather than trusting the success panel.

**Continue body content**
> We were rebuilding page sections from the live site, matching its content
> closely while improving execution. Home and Residences are done. Next is
> [PAGE]. Follow the FeatureBand pattern already used on those two pages.

## Facts worth pasting if the session needs them fast

- 120 pages, 3 locales (English at root, `/es/`, `/pt-br/`)
- 27 residences; **3 released** — controlled solely by `src/data/released.json`
- Brand: navy `#082341`, sand `#e6dfd5`, gold `#ba935b`; Montserrat 100/200/300
- Gold is decorative — for text on light grounds use `--gold-ink`
- Phone/address live only in `src/data/contact.ts`
- Two homepages: `/` (v1) and `/v2/`; every logo currently links to `/v2/` via
  `HOME_PATH` in `src/i18n/ui.ts`
- Follow Up Boss Pixel `WT-FBRKNWTI` is installed but **form capture is off**,
  so no leads are being created yet
- Nothing is deployed; the live site is still the old WordPress build
