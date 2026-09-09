# Handoff — Origin Residences rebuild

Orientation for a fresh session. Last updated 2026-08-17.

Read this first, then `PRODUCT.md` for product truth and brand constraints.
`README.md` covers commands and layout, `FOLLOW-UP-BOSS.md` the CRM wiring,
`TRANSLATION-REVIEW.md` the Spanish/Portuguese status.

---

## The build runs clean

`npm run build` needs no workaround. The API key that once blocked it is gone
from `.env`, which now holds only `PUBLIC_FORM_RELAY_ENDPOINT`, and
`scripts/check-env.mjs` passes.

**The guard stays.** It refuses to build if any `PUBLIC_*` value looks like a
credential, because `PUBLIC_*` is inlined into client JavaScript by Astro. If it
ever fires, remove the credential — never the guard. Rotating the old key in
Follow Up Boss is still worth doing as hygiene; it was pasted around, though it
never reached `dist/`.

---

## What this is

A rebuild of **originresidences.com** — a 27-residence luxury waterfront
development in **Bay Harbor Islands, FL**, with interiors by **Artefacto** — a
static
Astro site. It replaces a WordPress/Elementor site that shipped **350–720KB of
markup per page before images**.

**The brand is pinned.** The owner was offered a replacement visual world and
declined it on brand-standards grounds. This is a **refinement**: identity is
fixed, and modernisation lives entirely in execution. See the direction
contract in `src/layouts/Base.astro` and Brand Commitments in `PRODUCT.md`.

Purpose is lead generation. Every decision is judged on whether it produces a
qualified enquiry, not on traffic.

---

## Current state

- **120 pages build green**, no workaround
- **3 locales**: English at the root, `/es/`, `/pt-br/`
- **27 residences**, of which **3 are publicly released**
- Home page weight **~105KB vs 719KB** on the incumbent

### Recent work on this branch

Working branch: `homepage-stack-hero-scrim-forms`, **six commits, nothing
merged to `main`** — which still sits on the original rebuild.

#### Uncommitted — the Amenities deck

- **Six stacking amenity cards**, each backed by a Ken Burns slideshow:
  `AmenityStack.astro` (the deck) and `KenBurns.astro` (the media layer). They
  replaced the four alternating image/copy `features` rows.
- **Same sticky mechanic as `HomeStack.astro`, deliberately not yet merged.**
  HomeStack's `<Image>` needs `object-fit` to out-specify Astro's responsive
  image styles from inside its own scope, and a shared global rule would lose
  that silently. This repo's precedent is to extract at the THIRD copy — that
  is how `.page-head` reached `tokens.css`. **A third deck should trigger the
  extraction**; both components carry a comment saying so.
- **Images come from `import.meta.glob` per folder**, so dropping another
  photograph into `src/assets/amenities/<folder>/` joins that card's slideshow
  with no code change. Globbed per folder rather than once across `amenities/*`
  on purpose: `eager: true` would otherwise pull `amenities/random/` — eight
  unused files including multi-megabyte brochure PNGs — through the image
  pipeline on every build. A card with no images throws at build time.
- **The scrim is heavier than the homepage's and for a measured reason.** Those
  cards sit over one still frame chosen to suit them; these cycle through up to
  five images never graded together. The worst case is now *bounded by the
  scrim rather than by the photography*: `rgb(94,107,121)` is navy-deep at 64.8%
  effective alpha over pure white, which is why every viewport reports the same
  5.36:1. A first attempt cleared 9.66:1 and flattened the rooftop render to
  grey — on this site contrast past the threshold is bought at the image's
  expense.
- **`measure-amenity-stack.mjs`** forces every slide of every card active in
  turn and measures each one.
- **The lead render above the deck was removed** at the owner's request, taking
  its `.band` markup, CSS, the `Image` import and the `bandAlt` copy in all
  three locales with it. `src/assets/amenities/residence-living-dining-bay-view.jpg`
  is now unreferenced but still tracked — it is NOT the identically-named file
  in `assets/gallery/`, which the gallery and homepage still use.
- **The crossfade had two faults, both fixed and both measured.** Fading both
  slides at once left each at ~50% mid-transition, so ~25% of the container's
  navy showed *through* the picture — a grey pulse on every change. Only the
  incoming slide fades now, lifted above an outgoing one that holds full
  opacity for the whole fade. Separately the drift ran on `.is-active` alone,
  so the outgoing slide's transform snapped back to base the instant it lost
  that class; `.is-leaving` carries the same animation so it keeps drifting out.
  Verified by tracing every frame: 0 frames with no fully-opaque slide, largest
  visible transform step 0.10, and composited luminance ramping monotonically
  through a transition. `advance()` also awaits `decode()` — an undecoded slide
  stalls the compositor and looks exactly like a CSS fault. That is what caught the only real contrast
  failure: Spanish, slide 5, short viewport, **4.08:1** — the longer title
  wrapped onto more lines and reached into the scrim's falloff while English
  passed at 5.05:1 on the same card.

#### Uncommitted — The Team and Artefacto onto `.page-head`

- **Both pages lost their photographic title band** and now carry the flat sand
  `.page-head`, the same treatment as Neighborhood, Gallery and Amenities. New
  owner-supplied eyebrow / H1 / lede on both, in all three locales.
- **The Team is off `BAND_PLACEHOLDER`** — it stood on placeholder artwork it
  could never really carry, since the page owns only portraits. That is one
  fewer photograph owed (open item 9). PageBand is down to 7 templates and
  BAND_PLACEHOLDER to 5.
- **Artefacto dropped its hand-tuned `veilHold="760px"`** with the band; type on
  sand needs no veil. Its `lobby` image is still used lower down the page.
- **`darkHeader` removed from both.** It belonged to the photographic band; the
  bar now opens over a light ground and needs its dark ink. Verified by
  diffing both headers against Gallery's — 0 of 315 probes differ.
- **Fixed while measuring: the `.page-head` eyebrow was raw `--gold` on sand,
  2.14:1, on ALL FIVE page-head pages.** `tokens.css` says three tokens above
  that gold is decorative and `--gold-ink` is the text-safe member; the
  `.page-head__all` rule in the same block already followed that. Now
  `.page-head .eyebrow` does too, at 4.88:1. Scoped, because the same class
  carries raw gold correctly on navy at 5.59:1.
- **New: `measure-page-head.mjs`.** These five pages had no contrast check at
  all — measure-band.mjs excludes them by design and nothing replaced it.
- **Amenities lost its page-head link**, and with it the `.page-head__all` rule
  in `tokens.css` — Amenities was the only user, so the class no longer exists.
  `t()` and `L()` went too; that link was their only use in the file. The
  `viewAvailable` string stays, still used by the mega nav.
- **The Amenities schedule is 14 items, was 17.** The owner removed "27 unique
  residences", "2 bedroom to 4 bedroom" and "personalized services", and
  renamed "Dog run / park" to "Pet Zone", in all three locales. The first two
  are product facts rather than amenities and still appear on Residences and
  the homepage — they were dropped from this list only. Two further renames:
  "Bicycle storage area" → "Bicycle Rack Area", and "Points available for
  connection of electric vehicle charging stations" → "EV-Ready infrastructure
  available".
- **The Amenities schedule band is navy now.** It carries `section--dark`, the
  same modifier PresentationCTA uses, so the ground and ink come from one place
  — measured identical to PresentationCTA at every width. Its hairlines moved
  from `--rule` to `--rule-on-dark`; 16% navy is invisible on navy. Type
  measures 15.58:1. See the build-cache gotcha this uncovered.
- **The gallery grid lost its top padding.** `.gallery.section` sits directly
  under the page-head on the same sand ground, so the section's top padding
  stacked with the head's bottom padding into one oversized gap. Bottom padding
  kept — below it is the CTA band, a different ground.

#### Uncommitted — v2 promoted to `/`

The v1/v2 question (was open item 2) is **decided and done**: the owner chose
the alternate, and it is the homepage now.

- **`/v2/` is gone.** Its body moved into `index.astro`, which now mounts the
  sunset hero and `headerVariant="home"`. The two files were byte-identical
  below the hero, so nothing but the hero and four `<Base>` props changed.
- **`HOME_PATH` is `''`.** Every logo points at the real homepage again, and
  the SEO contradiction is closed: `/` is indexable, in the sitemap, and is
  what the chrome links to.
- **`HeroV2.astro` → `HomeHero.astro`; `.header--v2` → `.header--home`;
  `--v2-accent` → `--home-accent`; `variant="v2"` → `variant="home"`.** 44
  selectors across `Header.astro` and `LangSwitch.astro`. Held to a
  before/after measurement — see `measure-home-header.mjs` below.
- **`/v2/` redirects to `/`** in all three locales, via `redirects` in
  `astro.config.mjs`. Astro emits meta-refresh stubs carrying `noindex` and a
  canonical. Nothing public ever linked there; this only protects a reviewer's
  bookmark, and is safe to delete once nobody is using it.
- **`Hero.astro` (the v1 autoplay video hero) is retired but KEPT**, unreferenced,
  at the owner's request. It carries a header comment saying so — do not clean
  it up as dead code. `public/hero-poster.jpg` and `c.home.heroCta` are
  orphaned with it. The brand film is not lost: `HomeHero` plays the same
  `/video/origin-hero.mp4` on demand behind VIEW TRAILER.
- The `hero2` / `data-h2-*` names inside `HomeHero.astro` were deliberately
  NOT renamed — they are file-scoped and wired into the GSAP selectors and
  `measure-hero.mjs`, so churning them was all risk and no gain.

#### `7bcdcf9` — the neighbourhood locator, the band veil, the page heads

- **A neighbourhood locator on the Neighborhood page** (`NeighborhoodMap.astro`)
  — 77 places in nine categories beside a map, filterable by category. No map
  library, no tiles, **no API key and no billing account**: the basemap is an SVG
  generated once from OpenStreetMap and committed, so every colour is a brand
  token and nothing loads at runtime. It does not pan or zoom, which a
  fixed-extent locator does not need.
- **The band veil now passes AA.** It measured 1.40:1 behind the Residences
  eyebrow; it is a band-wide gradient with a measured hold now, at least
  **5.03:1 on every page** that uses it. A copy-anchored radial was tried first
  and rejected for hugging the shell too tightly.
- **`.page-head` moved into `tokens.css`** so the templates stop duplicating it.
  H1 is 3.5rem / 2.5rem / 1.5rem. **Neighborhood and Gallery** converted onto it
  with new eyebrow and lede copy; Neighborhood lost its photographic band.
- **`SITE_ADDRESS` split from `ADDRESS`.** The building (9760 West Bay Harbor Dr,
  Bay Harbor Islands) and the sales gallery (17651 Biscayne Blvd, Aventura) are
  different places. This killed the shadowed `MAP_HREF` that had been sending the
  Neighborhood map to the wrong one.
- **Two font files changed** — read "a text-subset webfont fails silently" below,
  then open item 5.

#### `02e110c` — the page band, the team page, the footer

- **`PageBand.astro`** — the Residences photographic title band. It was on 10
  templates at this commit; The Team and Artefacto have since moved onto
  `.page-head`, leaving 7.
- **Floor Plans is out of the navigation**; the page still builds.
- **Gallery and Amenities use `page-head`**; every other titled page uses
  `.band`. Neighborhood joined them in `7bcdcf9`, and Artefacto and The Team
  after it — five in total now.
- **The Team page is a deck of shuffling cards**, one ground colour per firm with
  a radial pool behind each cut-out portrait.
- **Footer**: three columns (contact · navigation · released residences), a
  maker's credit, and a swipeable credits row below 640px.

#### `1c2ee9f` — the homepage stack, the hero scrim, the forms

- **Homepage sections 4–6 are edge-to-edge cards that shuffle** — sticky
  siblings, each `100svh − header`, centred heading over a scrim
  (`HomeStack.astro`, shared by `/` and `/v2/`).
- **The v2 hero scrim now follows the copy.** It was centred at 52% of the
  section while `align-content: end` puts the copy at 68–75%, so the darkest
  point sat above the words. It is a `::before` on `.hero2__content` now, plus a
  thin top veil for the transparent header's type.
- **`.display` and `.heading` moved to weight 300** (was 100).
- **A photograph sits behind the lead-capture band** on all 13 pages carrying
  `#inquire`, under a 72% `--ground-alt` veil.
- **Both forms reworked**: legend inline with its options and on their baseline,
  placeholders instead of visible labels, weight 500, required-note removed.

### Pages
Home (`/`), Residences, Floor Plans, Gallery,
Amenities, Neighborhood, Artefacto, The Team, Schedule, 27 unit pages, and
Privacy / Terms / Accessibility — each in all three locales.

### One homepage
`/` carries the sunset hero: centred copy and a logo that flies from the hero
into the header on scroll (`HomeHero.astro` + `headerVariant="home"`). It was
built as `/v2/`, shown to the client, chosen, and promoted. The original brand-
video hero survives unreferenced in `Hero.astro`; the film itself now plays on
demand from the hero's VIEW TRAILER button.

---

## Where things live

```
src/data/contact.ts        phone + BOTH addresses — SINGLE source, was ×9
src/data/nav.ts            the nav list — SINGLE source, header + footer
src/data/band-art.ts       placeholder page-band artwork, awaiting real images
src/data/released.json     which residences are public — SINGLE source
src/data/units.ts          27 residences parsed from the live site
src/i18n/ui.ts             chrome strings, locale paths, HOME_PATH
src/content/copy.ts        shared page prose, en/es/pt-br
src/content/pages/*.ts     per-page prose, en/es/pt-br
src/components/PageBand    photographic page title band — 7 templates
.page-head in tokens.css   the flat sand title treatment — 5 templates
src/components/HomeHero    the homepage hero — sunset still + flying logo
src/components/HomeStack   the homepage's three shuffling cards
src/components/NeighborhoodMap  the locator: filter, SVG basemap, pins, list
src/data/neighborhood-places.ts 77 places — GENERATED, read its header first
src/assets/map/            the committed basemap SVG (106KB raw, 35KB gzipped)
src/assets/brand/marker-origin.svg  the building's own map marker
src/components/Hero.astro  RETIRED video hero — unreferenced, kept on purpose
src/components/            Header (shared, all pages), FeatureBand, forms…
src/scripts/leads.ts       lead delivery — read the warning at the top
src/scripts/motion.ts      GSAP + Lenis, all gated on prefers-reduced-motion
src/styles/tokens.css      every design token + @property registrations
scripts/check-env.mjs      the pre-build secret guard
```

### One implementation per pattern

Three things in here exist because the same markup had been pasted into several
files and started to drift. If you find yourself copying a block into a second
page, extract it instead:

- `PageBand.astro` replaced ten copies of the same forty lines of band CSS
- `HomeStack.astro` replaced two byte-identical copies across `/` and `/v2/`
- `nav.ts` replaced a nav list that the footer would otherwise have duplicated
- `.page-head` in `tokens.css` replaced three copies across Amenities, Gallery
  and Neighborhood; Artefacto and The Team joined them rather than adding a
  fourth and fifth

`.band` is **not** a global class. Amenities uses that name for a plain image
`<div>` and Artefacto for a `<figure>`; they coexist only because Astro scopes
styles per file. Anything global under that name will collide with all three.

### Inventory visibility
Edit **`src/data/released.json`** and rebuild. Nothing else. Currently
`["302","401","701"]`. All 27 pages are still generated; the hidden 24 are
**unlinked**, carry `noindex`, and are excluded from the sitemap — reachable by
direct URL so a broker can be sent one pre-release.

`units` (the default export) is **released-only**; `allUnits` is the full set.
That way a surface nobody audited fails by *hiding* a unit rather than leaking one.

---

## Non-negotiables

1. **No Follow Up Boss API key** in `src/`, `public/`, `.env`, or any `PUBLIC_*`
   variable. Ever. The guard blocks builds if one appears.
2. **Font weights 100/200/300 by default.** The brand kit ships
   Thin/ExtraLight/Light. There are now **two owner-authorised exceptions**:
   **Medium 500** (the homepage header, both forms, the locator's list and site
   label) and **SemiBold 600** (the locator's category filter, the only rule
   that loads it).
   Both are LATIN-SUBSET files. Read open item 5 before using either anywhere
   new.
3. **Colours from tokens**, never raw hex in components (only `#b3261e` error red).
4. **Invent nothing**: no prices, availability, testimonials, awards or bios.
   Absence of price is deliberate — it's what drives the enquiry.
5. **All motion respects `prefers-reduced-motion`.**
6. Gold `#ba935b` is **decorative**, not a text colour on light grounds — it
   measures 2.37:1 on sand. Use `--gold-ink` for text, `--ink-muted-aa` for
   muted text. Gold is fine on navy (5.59:1).

---

## Listings — the inventory grid and the residence pages

The Residences page's filter-and-accordion inventory browser is gone, replaced
by a grid of listing cards; the residence pages are now listing sheets with a
photographic carousel, an MLS-style specification, the drawn floor plan and an
inquiry form alongside. Structure follows a property portal, because that is
what a buyer and a buyer's agent can already read. The rendering is the
brand's — Montserrat light, tracked caps, gold hairlines, sand and navy.

### What is currently listed, and what withdrawal means

**701 is withdrawn.** `src/data/released.json` holds `["302", "401"]`. The grid
shows two cards in two columns, nothing links to 701, **and nothing serves it**:

| | Before | Now |
| --- | --- | --- |
| Page | built, unlinked, noindex, HTTP 200 | **not built — 404** |
| Floor-plan PDF | served from `public/` | **not built** |
| Floor-plan drawing | emitted by Vite, 287KB, unreferenced | **not built** |

Withdrawing is still one edit and restoring is still one edit; the file stays
in the project, untouched, the whole time.

Three things had to change to make that true, and each is a trap worth knowing:

1. **`[unit].astro` builds from `units`, not `allUnits`.** Page generation now
   follows the same switch as linking. The build drops from 117 pages to 42.
2. **`public/` cannot be conditional.** Everything in it is copied wholesale,
   so the PDFs moved to a route — `src/pages/floorplans/[plan].pdf.ts` — whose
   `getStaticPaths` reads the released set.
3. **Vite emits every statically imported asset, used or not.** `import plan701
   from '.../floor-plan-701.png'` kept shipping the drawing after its page
   stopped existing, and a dynamic import does not help — Vite globs the
   matches and emits them all. The drawings therefore live outside the bundled
   tree, in `src/listings/floorplans/previews/`, and are encoded to WebP at
   build by `src/pages/floorplans/[plan].webp.ts`.

The level-keyplan fallback on unit pages is gone with it. It offered a drawing
of the FLOOR where a drawing of the RESIDENCE was missing, and keeping it meant
importing eleven drawings — 780KB, all emitted — so that one might be used. The
keyplans remain on the Floor Plans page, which is what they were drawn for. A
residence with no plan of its own now omits the section.

### Where the numbers live

| File | Holds |
| --- | --- |
| `src/data/units.raw.json` | Architecture — beds, baths, areas. True whether or not a residence is for sale. |
| `src/data/listings.ts` | **Sales facts** — price, MLS #, HOA, taxes, parking. Only true while listed. |
| `src/data/listing-media.ts` | Which photographs each residence shows. |
| `src/content/pages/listings.ts` | Every label, in three languages. |

Every listed residence carries an asking price. **Only 302 has a full sheet**,
transcribed from MLS A11783461; 401 and 701 have price and nothing else,
because no MLS sheet has been supplied for them. Those fields stay `null`
rather than guessed — a figure invented for a real property is a false
statement, not a placeholder. A null makes its specification row vanish:
`ListingSpecs` drops an empty row, and a block whose rows all vanish drops
itself, so the pages read as finished. Fill in `LISTINGS` in
`src/data/listings.ts` and the rows appear; nothing else needs touching.

There is deliberately **no "Est. Payment"** row, though the reference sheet has
one. A monthly figure is a function of rate, term and down payment, none of
which were supplied, and inventing them to print a number on a $4m listing is
not a rounding error. Supply the assumptions and it can be added.

### Two things that are derived, not stored

- **Days on market** is computed from `dateListed` at build. The MLS sheet
  prints a number that is wrong the next morning; the listing date is durable.
- **$/sq. ft.** is price ÷ interior area, and disappears when there is no
  price. For 302 it comes to $1,931, which is what the MLS sheet prints — so
  price and area agree and neither was mistyped.

### The hero is a filmstrip, not a slideshow

`ListingCarousel` is a native `overflow-x` scroller with scroll snapping, 70vh
tall, one row of frames separated by a 2px seam. Swipe, trackpad and arrow keys
are the browser's own — the buttons only call `scrollBy`, and they ship
`hidden` and are revealed by the script, so a control never appears before it
works. Frames are sized from the viewport (`62vw`, `88vw` on phones) rather
than from an aspect ratio, so a slice of the next one always shows; that peek
is the only thing telling a visitor the row continues.

Snapping is `proximity`, not `mandatory` — with frames narrower than the window
a mandatory snap fights anyone resting between two of them.

The hero carries a deeper top scrim than the homepage's. Both hold a
transparent header, but the homepage opens on a sunset and this opens on a
sunlit facade against open sky, which is the brightest ground the wordmark
ever has to survive.

### The photography is representative, not per-residence

Every unit in `units.raw.json` points at the same three URLs on the old CMS,
and the building is not standing, so no per-residence photography exists.
`listing-media.ts` assigns each residence its own sequence from the gallery so
the three cards do not read as one listing posted three times. Alt text is
reused from `src/content/pages/gallery.ts`, where it was already written in
three languages after looking at the actual files — a listing carousel must
not invent a fourth description of the same photograph.

### Floor plans

`src/assets/floorplans/*.png` are rasterised at 2400px from the developer's
PDFs via `qlmanage`; the PDFs themselves are in `public/floorplans/` and linked
for download through `asset()`, so they survive the base-path switch. Only the
residences with a drawing of their own use it — 302, 401 and 701 — and every
other one falls back to its level keyplan, exactly as before. A residence keeps
its drawing whether or not it is currently released.

### The form is the site's form, sticky beside the specification

`InquiryForm` with `unit={unit.slug}`, the same component as the footer and
every other page, so a lead arrives already attached to the residence it came
from (`data-unit`, read by `src/scripts/leads.ts`). There is no second form
implementation to keep in step. Follow Up Boss delivery therefore needs no
listing-specific work — whatever makes the footer form deliver makes these
deliver.

Its heading and lede are left-ranged and the heading is stepped down, via
`:global()` rules nested inside `.listing__form` — the component's own styles
are scoped to it and unreachable by class name from the page, and nesting them
means they cannot touch the same component anywhere else on the site.

### `InventoryGrid.astro` is now unused

Nothing imports it. It is left in place rather than deleted because it is the
only implementation of the bedroom/level filter, which is worth having back if
the developer releases enough inventory to need filtering again.

## Deployment — GitHub Pages review copy

The client reviews the site on GitHub Pages while the real domain is still
being decided. `.github/workflows/deploy.yml` builds on every push to
`homepage-stack-hero-scrim-forms` and publishes `dist/`.

- **Live review copy:** https://reachmiami.github.io/origin-residences/
- **Repo:** https://github.com/reachmiami/origin-residences (public)

The repo is PUBLIC, which is what makes Pages free. `src/data/` pricing and the
full photography set are readable by anyone who finds it, and Pages offers no
password on any plan — the URL is the only thing gating access. If that stops
being acceptable, going private means a paid plan before the site will build
at all.

**Nothing in the repo names the deployment target.** `actions/configure-pages`
reports where Pages actually serves this repo from, and the workflow feeds
those outputs to the build as `SITE_URL` and `BASE_PATH`. A plain
`npm run build` with neither variable set produces the production shape —
apex domain, at the root — exactly as before.

### Attaching the real domain

Set it in **Settings → Pages → Custom domain**. That is the whole change.
`configure-pages` then reports the custom domain at the root, so the next
build drops the subfolder and the noindex on its own. Do not edit
`astro.config.mjs` for this.

### What the review copy deliberately does not do

Both keyed off `REVIEW_DEPLOY`, which the workflow sets only when the Pages
origin is a `github.io` address:

- **Every page is `noindex, nofollow`.** A `robots.txt` cannot do this from a
  project page — it would sit at `/<repo>/robots.txt`, and crawlers only read
  the one at the domain root, which this repo does not own.
- **No sitemap is generated.** Publishing a machine-readable list of all 120
  URLs is the opposite of what noindex is for — it is precisely the file a
  crawler reads to find pages it would not otherwise reach. Production keeps
  its sitemap; the integration is simply not registered on a review build.
- **The Follow Up Boss pixel is omitted** (`src/components/FubPixel.astro`).
  It writes to the live CRM. A client clicking through the forms on a review
  build would otherwise create real person records and start action plans
  against them. Forms still submit and still report success — `leads.ts` treats
  the relay copy as optional — they just do not reach the CRM.

Both are off the moment a real domain is attached, which is the correct
behaviour for a launch but worth knowing before you attach one.

## Gotchas that cost real debugging time

Do not rediscover these.

**`align-items: start` on a grid kills `position: sticky` inside it.** The
listing form would not stay put however the sticky rules were written, because
`.listing__cols` sets `align-items: start`, which shrinks every column to its
own content — and a sticky element cannot travel further than its parent. The
column was only as tall as the form. `.listing__aside` now sets `align-self:
stretch` to take the full row height back; the left column keeps `start`. A
sticky child needs a tall parent, and a grid item is only as tall as you let it
be.

**Astro scopes component styles, so page-level markup does not inherit them.**
The amenities and floor-plan blocks were first written as `<section
class="specs">` inside `[unit].astro`, reusing ListingSpecs' class names. They
came out in a different size and case from every block around them, because
those styles are scoped to ListingSpecs and a page cannot borrow them by class
name. Both now render *through* the component via its `<slot>`. If a block has
to look like another component's block, put it inside that component.

**Never write a root-absolute path by hand.** The site builds for two
different roots — the apex domain, and a `/<repo>/` subfolder on the Pages
review copy. An `href="/amenities/"` or `src="/logo-origin.svg"` is correct in
only one of them and 404s in the other. Internal links go through
`localizePath()`; `public/` files go through `asset()`; anything imported from
`src/assets/` is rewritten by Vite and needs neither. This is also why the
Montserrat faces live in `src/assets/fonts/` rather than `public/` — CSS cannot
read the base, so `url('/fonts/...')` had no correct spelling. To catch a
regression, build with `BASE_PATH=/x/ npm run build` and grep `dist` for
`="/` — every hit should start `="/x/`.

**`.header.is-condensed` rules keep winning.** They set `color`/`background` at
the same specificity as the homepage header's rules and apply from 40px of
scroll. Any `.header--home` rule touching colour must name
`.header--home.is-condensed` and `.header--home.is-open` explicitly or it
silently loses the moment the page moves. This bit three times.
`measure-home-header.mjs` exists to catch exactly this.

**`order` reorders CSS Grid auto-placement.** The shared `≤1080px` block sets
`order: 2/3` on the header flanks for the old flex bar. That pushed the
homepage's logo slot into column 1 and the left flank into the collapsed
centre. The homepage tablet grid now assigns `grid-column` explicitly.

**Transform moves the box; padding moves the content.** Sliding the header
flanks together with `translateX` dragged each flank's empty half across the
other's controls and swallowed clicks — the language switcher was dead. It uses
`padding-inline` now. A `pointer-events: none` patch made it *worse*.

**`overflow: clip` crops a fixed child.** The flying logo lived inside the hero
and vanished the moment the hero scrolled away. It now renders outside the
section.

**GSAP owns the transform.** A CSS `translateX(-50%)` on the flying logo was
wiped the instant GSAP animated `y`, pinning its left edge to 50% so it scaled
off-centre. Centring is `gsap.set(logo, { xPercent: -50 })`.

**Custom properties need `@property` to transition.** `--header-bg` and
`--menu-open` are registered as `<number>` in `tokens.css`. Without that they
snap and every colour keyed to them snaps too. An earlier edit silently failed
to add a `--dur-menu-fill` declaration, so the header "fade" was instant for a
while and looked merely fast.

**The menu panel is a child of the header**, so it paints inside the header's
stacking context. No z-index can put the flying logo *between* the bar and the
panel — it fades out instead, but only while it has not yet landed
(`[data-landed]`).

**Astro scopes styles per component.** A parent cannot style a child
component's markup; `LangSwitch` carries its own rules, and shared band layout
lives in `FeatureBand.astro` rather than being copied per page. Slotted content
is the exception — it keeps the PARENT's scope, so a page can style what it
passes into `PageBand`.

**A text-subset webfont fails silently, and the tell is a width INVERSION.**
`Montserrat-Medium.woff2` had been cut down to a handful of glyphs for the
homepage header's few strings. It was missing **60 of the 65 characters** the locator's
list needs, so everything set to `--w-medium` — the group titles, 89 place
names, the pin numbers, and the forms — rendered in the **system fallback**.
Nothing errored; the file loaded with a 200. The symptom was a measurement that
had already been taken and read past: the same string came out **narrower at 500
(217.0px) than at 300 (235.4px)**, which cannot happen in one family. To check a
face, load it in isolation under its own family name and compare per-character
widths against a bare fallback — `document.fonts.check()` will NOT tell you,
because it answers for the family, not the face. Both off-kit files are latin
subsets now: ASCII and Latin-1, which covers every accent the es/pt-br copy uses.

**A `z-index` escapes any ancestor that is not a stacking context.** `KenBurns`
lifts the incoming slide above the outgoing one to crossfade them. Its wrapper
`.kb` was `position: absolute` with `z-index: auto`, which creates NO stacking
context — so `z-index: 2` on a slide resolved against the CARD instead, where it
competed with the scrim (1) and the copy (2). The active slide painted over the
scrim and the headline was left sitting on bare photography: it measured
**1.00:1**, white on a white terrace, and on the darker slides it looks fine.
`.kb` now carries `isolation: isolate`, which contains the layering without
disturbing anything the card does. Whenever a z-index is added inside a
component, check what its nearest stacking context actually is.

**A block comment among a component's attributes is NOT a comment in Astro.**
Written inside the `<Image>` tag in `KenBurns.astro`, a `/* … */` block was
parsed as ATTRIBUTES — it reached the HTML as `*="true" Only="true" the="true"`
— and it silently swallowed every attribute that followed it. `alt`, `loading`,
`sizes` and `decoding` all vanished, so fourteen images shipped with no alt text
and no lazy loading, and the page pulled 2.8MB before a single scroll. **The
build stayed green and nothing errored.** Comment above the tag, never among its
attributes. Note also that `{/* … */}` cannot be a sibling of the element inside
a `.map()` arrow that returns a single expression — put it above the `map`, or
in the frontmatter.

**`loading="lazy"` does almost nothing for a slideshow.** Every slide of a card
is absolutely positioned at that card's own box, so they all share ONE position
in the document. The browser saw five images at the top of card one and fetched
all five as soon as that card came within its viewport-distance threshold —
measured, 11 of 14 slides decoded before any scroll. The fix is to withhold the
URL, not to hint at it: `KenBurns` resolves images through `getImage()` and
ships the non-lead slides with `data-src`/`data-srcset`, promoting them on first
approach. Initial load went 2823KB → 1129KB.

**Verification must run against a BUILD, and `npm run preview` will not tell
you when it isn't.** This is the single most expensive trap in this repo.

`astro preview` cannot bind 4321 if an `astro dev` server already holds it — it
moves to another port and says so quietly. Every script here defaults to
`localhost:4321`, so the whole verification suite then measures the DEV SERVER
while appearing to measure the build. Two separate failures came out of that in
one session:

- A scoped rule deleted from `amenities.astro` kept applying. `curl` and the
  browser's own `fetch(…, {cache:'no-store'})` both showed it ABSENT from the
  served HTML while `document.styleSheets` showed it PRESENT — because Vite's
  in-memory module graph had gone stale. Cache-busting changed nothing; it was
  never an HTTP cache.
- Clearing `.astro` / `node_modules/.astro` mid-session invalidated Vite's
  pre-bundled deps, so the long-running dev server began returning
  **504 Outdated Optimize Dep** for `gsap`, `gsap_ScrollTrigger` and `lenis`.
  GSAP never loaded, the homepage flying logo silently stopped animating, and
  the header's condensed state died with it — while the production build was
  perfectly healthy the whole time.

`assert-build.mjs` now guards this: it refuses to run if the target serves
`@vite/client`, which a built page never contains. It is wired into
`measure-home-header.mjs` and `measure-page-head.mjs`; **add it to the others.**

Practical rules:
- Check what owns 4321 before believing a measurement: `lsof -nP -iTCP:4321 -sTCP:LISTEN`.
- Prefer an explicit port: `npx astro preview --port 4322` and pass the base URL.
- If a dev server starts 504-ing on deps, `rm -rf node_modules/.vite` and restart it.
- When a probe and `curl` disagree, the disagreement IS the finding. Do not pick
  a side — find out why they differ.

**`translate` is not `transform`.** An element animated with the `translate`
property reports `transform: none`, and a `DOMMatrix` built from that reads 0 —
a whole keyframe trace came back as a flat line of zeros and looked like a dead
animation. Read the property you actually animated, or better, pause the
animation and step `animation.currentTime` so the sample is deterministic
instead of racing the delay.

**A state class loses to the animation rule on the same element.** The locator's
arrival rule sets opacity on `.locator.is-in .locator__group` — specificity
(0,3,0) — which silently beat `.locator__group.is-dim` at (0,2,0). The dim class
applied, the computed opacity read `1`, and the filter appeared to do nothing.
Any state class sharing an element with an arrival or animation rule has to
out-specify it, and sit after it.

**A sticky element needs range inside its parent.** The locator's category
filter was wrapped in a `.shell` that contained only the filter, giving it a
sticky range of zero — the CSS was correct and it never moved. It is a direct
child of the section now, so it can hold position for the whole locator.

**A grid item will not shrink below its own content.** `min-height: auto` and
`min-width: auto` are the defaults, and both have caused silent damage here: a
team card's copy grew to 908px inside a 532px card and was clipped away, and the
footer's unbroken sales email set its column's floor and pushed the next column
8px off the screen. Any grid or flex item that must fit its track needs an
explicit `min-width: 0` / `min-height: 0`. A **multi-column** container is the
worst offender: `columns: 3` has a min-content width of roughly three
longest-words plus gaps, and as a grid item that floor pushed the locator's map
104px off a 375px screen.

**A fieldset's `<legend>` is not a flex item.** It gets special "rendered
legend" treatment unless it is floated or absolutely positioned. To put a legend
inline with its controls you must either float it — and then compute the
baseline yourself, since floats cannot baseline-align — or take the real legend
out of flow with `.visually-hidden` and use a plain span as the visible caption,
which CAN be a flex item. Both approaches are in the forms; read the comments
before changing either.

**A sticky card is covered the instant it pins.** With no spacer between cards,
the next card sits exactly one header-height above the fold at that moment, so
the bottom strip of every pinned card is under the card that follows it.
Anything interactive low in a card has only a short window in which it can be
clicked — on The Team page that window measured 0px at some viewports until the
copy reserved a bottom pad.

**Splitting a media query moves everything after the split.** When the tablet
band was carved out of the footer's `≤900px` block, the rules below the new
closing brace silently landed in `≤640px` — so tablets lost the whole treatment
while phones kept it. Re-read the braces after any media-query surgery.

**`object-position: -150px` drops the vertical.** A single value sets X and
resets Y to `center`. Where a figure is meant to stand on the card's lower edge,
write both: `-150px bottom`.

---

## Verification workflow

There is no test suite. Verification is Playwright scripts in the project root,
run against a served build (`npm run preview`) or the dev server:

```bash
npm run preview &                 # serves dist/ on :4321
node shoot.mjs                    # 31 screenshots at 375/768/1440 + overflow + console
node measure.mjs                  # per-element boxes in the header at 375px
node measure-stack.mjs [url]      # homepage cards: sticky geometry, cover order, centring
node measure-stack-contrast.mjs   # lightest pixel behind LIGHT type on the cards
node measure-hero.mjs             # homepage hero: headline + header shade, weights
node measure-inquire.mjs          # darkest pixel behind DARK type on the lead band
node measure-team.mjs             # the five team cards: grounds, gradients, contrast
node measure-band.mjs             # the page band's veil contrast, every band page
node measure-page-head.mjs        # the 5 page-head pages: head ink + bar ink
node measure-amenity-stack.mjs    # the 6 amenity cards, EVERY slide of each

Run these against `npm run preview`, NEVER the dev server — see the build/dev
gotcha above. `assert-build.mjs` enforces it for the two scripts that import it.
node measure-home-header.mjs [url] # homepage header: 3 widths × rest/condensed/open
```

`measure-home-header.mjs` is a **comparison** instrument, not a pass/fail one.
It prints JSON; run it before and after a change to the homepage header and
diff the two. Every colour is canonicalised through a canvas pixel, because
`getComputedStyle` returns a mid-transition value in a different colour space
from the settled one and the raw strings compare unequal while the colour is
identical. Two runs against an unchanged page differ in **0 of 378** probes,
and **46 of 126** probes differ between states — so it is both stable enough to
trust and sharp enough to catch a dropped rule.

**Measure, don't eyeball.** A 2px overflow and a 92px click-blocking overlap
were both invisible in screenshots and obvious in element boxes — and
`document.scrollWidth` did not catch the overlap, because the damage stayed
inside the bar.

### Measuring without fooling yourself

Read this before writing a new check. Every item below produced a confident,
completely wrong number in the last session, and each one *looked* like a page
defect until the probe was examined.

- **Wait for Lenis.** Smooth scroll keeps moving after `scrollIntoView` returns.
  Measure rects during that drift and the screenshot no longer matches them —
  probe boxes straddled two cards and reported 1.60:1 on gold-over-navy. Poll
  `window.scrollY` until it holds still for several frames.
- **Exclude the header.** It is fixed and opaque off-white, and it has a 1px
  box-shadow. Sampling under either turned a 7.49:1 eyebrow into 2.08:1, then
  into 3.58:1.
- **Screenshot the viewport, not the element**, when working in viewport
  coordinates. Element screenshots and viewport rects drift apart on tall
  elements — that mismatch produced an impossible 1.15:1.
- **Compare against the box that actually clips.** Checking a copy column
  against *itself* reported zero overflow while its content was escaping the
  card entirely. Measure descendants against the clipping ancestor.
- **Pick the right extreme.** Light type on dark fails against the LIGHTEST
  pixel; dark type on light fails against the DARKEST. The team cards need both,
  because the grounds differ per card.
- **Sweep heights as well as widths.** `shoot.mjs` covers 375/768/1440 only.
  Real defects have hidden at 320px wide and at short viewport heights, where a
  card is too short for its own content.

---

## Open items, in the order I'd take them

Two items closed in `7bcdcf9`: the page-band veil (was item 1, now ≥5.03:1
everywhere) and the shadowed `MAP_HREF` (was item 4, now `SITE_MAP_HREF`).
**Item 2 (v1 vs v2, and the SEO contradiction) is closed** in the working tree
— v2 was promoted to `/`; see "Uncommitted" above.

1. **Enable Pixel form capture** in Follow Up Boss (*Pixel → Tracking*). The
   Pixel (`WT-FBRKNWTI`) is installed and firing `/identify`, but **no lead is
   created** until this setting is on. Verified by network trace. Until then the
   form shows success and the lead goes nowhere. This is the only item that
   blocks the site doing its job.
2. ~~Decide v1 vs v2, then fix the SEO contradiction.~~ **DONE** — v2's hero
   moved to `/`, the alternate is retired, the canonical URL keeps its history,
   and every logo points at `/` again. Not yet committed.
3. **The locator's pins crowd, and they are burying the building.** At the
   owner-requested 32px, the gold Origin mark measures **85% covered** by
   numbered pins on "All", and **24 of 29 pins overlap** at least one other (48
   overlapping pairs). The owner asked for that mark to be visible across every
   category switch, and on "All" it effectively is not. Cheapest fix that keeps
   the mark beneath the pins: take it to 44–48px so it reads as a halo around
   the cluster. Related: the extent is wider than ideal — Miami Country Day and
   the Sunny Isles school pull it out, leaving a lot of empty mainland. Tighten
   it only if you regenerate the basemap AND every `x`/`y` together; they share
   one projection and changing one alone silently misplaces every pin.
4. **17 places from the owner's list have no coordinates** and are absent from
   the locator, including both public sculptures and Ruth K. Broad K-8. Roads,
   routes and programmes were left out deliberately — they are not single points.
   Note also that all 36 Bal Harbour Shops tenants share the mall's pin, as do
   the restaurants inside each hotel, which is why pins are `aria-hidden` and
   the list carries the semantics.
5. **Decide on the off-kit font weights — there are two now.** Medium 500 (the
   homepage header, both forms, the locator's list and site label) and SemiBold
   600 (the locator's category filter). The kit contains only 100/200/300. Either the
   brand's weight range has genuinely widened, in which case say so in
   `PRODUCT.md`, or these come back down. Both files are latin subsets pulled
   from Google Fonts (SIL OFL 1.1); a glyph outside ASCII/Latin-1 asked for at
   500 or 600 falls back, so keep those weights on known strings. The previous
   Medium file is NOT in git history in usable form — it was a broken subset and
   was replaced, with a copy kept only in the last session's scratchpad.
6. **Native review of `es` and `pt-br`** before those locales go public. Also a
   counsel question on whether the translated consent text carries the same
   force — `TRANSLATION-REVIEW.md` has the detail. Two known English-only spots:
   the footer's maker credit ("Made with ♥ in Miami.") and the Neighborhood
   headline, which changed in English while es/pt-br still read "secluded".
7. **Locator accessibility calls made deliberately at the owner's request.**
   Each was flagged when made; revisit if any matters:
   - Dimmed groups run at `opacity: 0.15`, roughly **2.4:1** — below AA. The
     content is de-emphasised rather than removed and comes back in one click.
   - The category buttons have no `min-height`: they are **20px** tall against
     the 44px target guideline.
   - The filter's `role="status"` count was removed, so a filter change is
     announced only by the chip's own `aria-pressed`.
   - The selected chip is distinguished by **colour alone**; the weight cue went
     when every chip moved to 600.
8. **Two AA failures in the header, surfaced by `measure-page-head.mjs` and
   deliberately NOT fixed in passing.** Both are the same root cause as the
   page-head eyebrow — raw `--gold` used as text — but they live in the header,
   which HANDOFF records as the most regression-prone area in this build, and
   neither was in scope for the work that found them. Both are site-wide and
   pre-existing, and both are printed on every run of that script as `!` lines
   so they cannot quietly become normal:
   - The **language switcher's active locale** is raw `--gold` on the page
     ground: **2.14:1** wherever the bar sits on sand. `--gold-ink` would fix it
     the same way it fixed the eyebrow, but the header's colour rules have to
     satisfy `.is-condensed` and `.is-open` too, so it needs the before/after
     treatment in `measure-home-header.mjs`, not a one-line edit.
   - The **solid Inquire pill** sets warm white on `--gold`: **2.79:1**, on
     every page. This one is a brand-palette question rather than a bug — the
     gold fill is the CTA's identity — so it probably needs the owner, not a
     fix. Large-text AA (3:1) is also missed, narrowly.

9. **The amenity deck needs more photographs, and three cards need a line.**
   Four of the six folders hold a SINGLE image — `clubroom`, `fitness-center`,
   `kidsroom`, `pet-zone` — so those cards drift but never cross-fade; only
   rooftop and aqua club have five each. Drop files into the folder and they
   join that slideshow automatically. (The supporting lines are all in now —
   the owner wrote the three that were missing, so every card carries one, and
   they run at `--t-body` rather than `--t-small`.) Also worth knowing: the aqua-club images are
   near-square (about 1285×1224) and crop hard in a full-bleed landscape card,
   and `pet-zone/origin-pets.jpg` looks like the same photograph already
   tracked as `amenities/pet-park-dogs.jpg`.

10. **36 warnings** from the first review round were never worked — only the
   FAIL-level findings were fixed.
11. **Assets the owner owes**: real photographs for the five templates still on
   `BAND_PLACEHOLDER` (Floor Plans, the three legal pages, and all 27 unit
   pages — The Team came off it when it moved to `.page-head`); a horizontal one-line logo and a white-on-transparent SVG (the
   stacked lockup is weakest on phones); and floor-plan PDFs for 26 of 27
   residences — only 702 had one.

   Two asset folders are **untracked on purpose**, not strays: `amenities/random/`
   and `neighborhood/origin-palms.jpg` are staged for pages not yet built, and
   should be committed by whatever work starts using them. The stray team
   portrait that used to be listed here was deleted at the owner's request.
   `src/assets/amenities/residence-living-dining-bay-view.jpg` is the opposite
   case — tracked but unreferenced since the Amenities lead render was dropped,
   and NOT the same file as the identically-named one in `assets/gallery/`.
12. Smaller, all live and all deliberate for now:
   - The Gallery lede promises "photos and videos"; the page has no video.
   - The team cut-outs use `object-fit: cover`, so they crop; `contain` may
     frame them better now that they are cut-outs rather than photographs.
   - The team shuffle needs `min-width: 901px` AND `min-height: 880px`; a
     1280×800 laptop gets stacked cards, because a photo plus a full firm
     paragraph does not fit in 682px.
   - The menu scrim still runs at 420ms while the panel and bar run at 720ms;
     the phone-width burger is 38px against the 44px target guideline.
   - The old team `*-portrait.jpg` files are unreferenced now that the PNG
     cut-outs are in; they are still tracked.
   - Stacked full-width, the locator's map is 1513px tall at 1200px wide — the
     basemap is portrait, so "full width" costs height. Capped only below 900px
     if that becomes a problem.
   - `git` committed as `felixmendoza@CREs-MacBook-Pro.local`; `user.email` is
     unset globally.
   - **25 ad-hoc `check-*/diag-*/test-*/verify-*.mjs` scripts still hardcode
     `http://localhost:4321/v2/`.** They do not error — the redirect resolves
     and Playwright follows it — so they now silently measure `/`. That is
     harmless for most, but `check-hdr-v2.mjs` and `check-burger.mjs` compare
     v1 against v2 and are therefore now comparing `/` against itself. They are
     last-session scratch, not the documented suite; delete or repoint them
     when convenient. The seven documented `measure-*` scripts were repointed.

## What has *not* been done

- Nothing is deployed. This exists only locally; `originresidences.com` is still
  the old WordPress site.
- No real-device testing. Emulated viewports only — iOS Safari and Android
  Chrome differ on video autoplay, `100svh` and font rendering.
- The IDX account system (login, favourites, saved searches, mortgage
  calculator) was **cut by agreement** — it cannot work on a static site.
