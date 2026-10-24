# Handoff — Origin Residences rebuild

Orientation for a fresh session. Last updated 2026-10-24.

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

- **42 pages build green**, no workaround
- **3 locales**: English at the root, `/es/`, `/pt-br/`
- **27 residences in the building, 2 released** — 302 and 401. Only released
  residences get a page at all; see "What is currently listed" below
- **Leads reach Follow Up Boss** through the Pixel with form capture —
  verified with real submissions on 2026-10-23/24, including the note body
  carrying the residence, source page and consent record. Visitors whose
  browser blocks `widgetbe.com` (EasyPrivacy, on by default in uBlock Origin,
  AdGuard and Brave) **cannot** submit; they are told to call. The relay that
  would catch them is built and verified but not configured — open item 2
- **LIVE at https://originresidences.com** since 2026-10-24, on GitHub Pages
  with HTTPS enforced. It replaced the old WordPress site. Indexed, sitemap
  published, Pixel on. `www.`, `http://` and the old
  `reachmiami.github.io/origin-residences/` all 301 to it
- **There is no staging copy.** Every push to `homepage-stack-hero-scrim-forms`
  deploys straight to the public site, and any test lead submitted there is a
  real Follow Up Boss record — open item 3
- Home page **markup 89KB raw / 26KB gzipped**, against 719KB of markup
  on the incumbent — the comparison README.md defines, measured rather than
  recalled. Full homepage load with images is **~1.15MB**; the two figures
  answer different questions and the old line conflated them, claiming
  "~105KB" which matched neither.

The page count dropped from 120 because unreleased residences stopped being
built — 25 of them across three locales. That is a deliberate change, not a
regression; a hidden page was still serving its asking price to anyone who
guessed the URL.

### Recent work on this branch

Working branch: `homepage-stack-hero-scrim-forms`. **Nothing is merged to
`main`**, which still sits on the original rebuild. Everything below is
committed and live.

#### Launch on the real domain

The owner pointed the domain at GitHub Pages on 2026-10-24. Two things went
wrong, both now fixed, and both are in Gotchas:

- **HTTPS would not issue** because the apex kept an `AAAA` record for the old
  WordPress host (The Constant Company / Vultr). Replacing it with GitHub's
  four IPv6 addresses let the certificate issue.
- **For a while the domain served the review build** — subfolder asset paths,
  `noindex`, no Pixel — because the last deploy predated the custom domain.
  The workflow picks the domain up only when it next runs. Two deploys fixed
  it: one for `http://`, then one more once HTTPS was enforced, because
  `configure-pages` reports `http://` until then and every canonical link and
  sitemap entry is built from that.
- **Old WordPress addresses** were audited from the owner's Search Console
  export. 96% of the old site's search clicks already landed on paths this
  site serves unchanged; the rest with a real equivalent now redirect,
  including every unreleased residence (to `/residences/`). The 73 old IDX
  `/property/` pages are left to drop out on purpose — see `astro.config.mjs`.

#### Lead delivery — from "always succeeds" to verified

An audit (Phases 0–2, all committed) found the forms could not fail:
`submitLead` was a constant `{ ok: true }`, so a lead with nowhere to go still
thanked the visitor. It now reports honestly — relay result if configured,
optimistic success if the Pixel actually loaded, an explicit "please call"
otherwise — and `pixelLoaded()` tells a loaded tracker from its stub.

The first real submissions then showed two things no script could:

- **The Pixel path works**, once the owner enabled form capture. The owner's
  first failed test was their own ad blocker: `widgetbe.com` is the only host
  in the stack on any major blocklist. That share of visitors is the case for
  the relay — see open item 2.
- **Follow Up Boss ignores `type="hidden"` inputs.** The note body — residence,
  source page, language and the TCPA consent record — had been reaching
  nobody. It is now a visually hidden `<textarea>`, and a real lead confirmed
  FUB reads it. The consent box is labelled `Terms of Use` and sends
  `Accepted`; the type radio sends `Yes`. FUB's note structure, and why the
  body appears twice, is written up in `FOLLOW-UP-BOSS.md`; that duplication
  is FUB's and was accepted by the owner.

#### Deployment

- **The deploy target comes from GitHub, not the repo.** `site` and `base`
  come from the environment and the workflow fills them from
  `actions/configure-pages`, so attaching the domain needed no code change —
  and detaching it would silently turn the review mode back on. See the
  Deployment section.

#### Listings

- **The Residences inventory browser became a grid of listing cards**, and the
  residence pages became listing sheets — carousel, headline figures, MLS-style
  specification, floor plan, inquiry form. `InventoryGrid.astro` is unused but
  kept.
- **Sales data is separate from architecture.** `src/data/listings.ts` holds
  price, MLS number, HOA and taxes; `units.raw.json` keeps beds, baths and
  areas. 302 has a full sheet; 401 has a price and nothing else.
- **701 was withdrawn**, and withdrawal was made to mean something: an
  unreleased residence now has no page, no floor-plan PDF and no drawing.

#### Residences page

- Opens with a type-set `.page-head` rather than a photographic band, absorbing
  the "Discover your dream home" section that duplicated it.
- **The features list moved over a Ken Burns band** of the residence
  photography, filling the window below the header.

#### Artefacto page

- **Runs dark end to end** on the Team page's charcoal, done by re-pointing
  four ground tokens on a wrapper rather than restyling section by section.
- The editorial opening moved **inside** the terrace figure; Carla Guilhem
  became a partner card in the shape the Team page gives her; the closing pair
  mirrors the one above it; the furniture strip is gone.
- The brand name in the band heading is **set as the wordmark**, not as type.

#### Copy

- The site now offers **3 and 4 bedroom** residences, not 2, 3 and 4 — in all
  three languages, across the homepage, Residences and Floor Plans.

### Pages
Home (`/`), Residences, Floor Plans, Gallery, Amenities, Neighborhood,
Artefacto, The Team, Schedule, **one page per RELEASED residence** (two today),
and Privacy / Terms / Accessibility — each in all three locales.

An unreleased residence has no page at all. That is the change that took the
build from 120 pages to 42.

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
`["302","401"]`.

An unreleased residence gets **no page at all** — no floor-plan PDF, no
drawing, no content at its address. Since launch that address redirects to
`/residences/` through an empty meta-refresh stub (`astro.config.mjs`,
derived from `released.json`), so an old bookmark lands on the inventory
instead of an error. The stub publishes nothing about the residence.

That is a change from the original design, and the reason matters: the old
arrangement generated all 27 and left the hidden ones unlinked and `noindex`
but reachable by URL, so one could be sent to a broker before release. A hidden
page still served its asking price to anyone who guessed the address. **Do not
reach for a pre-release URL — it does not exist.** Send the PDF directly, or a
build preview. The full reasoning is at the top of `src/data/released.ts`.

This section said the opposite for a month after the behaviour changed, and
contradicted another section of this same file seventy lines further down.

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
   Both are LATIN-SUBSET files. Read the open item "Decide on the off-kit
   font weights" before using either anywhere new.
3. **Colours from tokens**, never raw hex in components (only `#b3261e` error red).
4. **Invent nothing**: no availability, testimonials, awards or bios — and no
   prices, MLS numbers, HOA figures or taxes that the owner has not supplied.

   The rule used to read "no prices" flatly, on the reasoning that absence of
   price is what drives the enquiry. That changed when the listing pages
   arrived: 302 and 401 now print asking prices, both given by the owner. What
   has NOT changed is the part that matters — a figure attached to a real
   residence is a statement someone can be held to, so a missing one stays
   missing. `src/data/listings.ts` renders every null as an absent row rather
   than a placeholder, precisely so that nobody is tempted to fill one in to
   make a page look finished.
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
| Page | built, unlinked, noindex, HTTP 200 | **not built** — address redirects to `/residences/` |
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

## Deployment — GitHub Pages, live at originresidences.com

`.github/workflows/deploy.yml` builds on every push to
`homepage-stack-hero-scrim-forms` and publishes `dist/` to
**https://originresidences.com**. That is production: there is no staging copy
(open item 3), so a push is a release.

- **Repo:** https://github.com/reachmiami/origin-residences (public)
- **DNS** (GoDaddy, `domaincontrol.com`): apex `A` → `185.199.108–111.153`,
  apex `AAAA` → `2606:50c0:8000–8003::153`, `www` CNAME →
  `reachmiami.github.io`. Any other `A`/`AAAA` on the apex breaks HTTPS — see
  Gotchas.
- **Certificate:** Let's Encrypt, issued and renewed by GitHub; covers apex and
  `www`. HTTPS is enforced in Settings → Pages.

The repo is PUBLIC, which is what makes Pages free. Everything in `src/` is
readable by anyone, whatever `released.json` hides from the built site —
open item 7. Going private means a paid plan before the site will build.

**Nothing in the repo names the deployment target.** `actions/configure-pages`
reports where Pages actually serves this repo from, and the workflow feeds
those outputs to the build as `SITE_URL` and `BASE_PATH`. A plain
`npm run build` with neither variable set produces the production shape —
apex domain, at the root.

**A change to the Pages settings needs a rebuild to take effect.** The target
is read when the workflow runs, not when the setting changes. After changing
the custom domain or the HTTPS setting, run the workflow by hand
(`gh workflow run deploy.yml --ref homepage-stack-hero-scrim-forms`) and
check the live canonical URL.

### Review mode — dormant, and how it comes back

`REVIEW_DEPLOY` is set only when the Pages origin is a `github.io` address,
which it no longer is. It is kept because it is what makes a non-production
copy safe, and it would switch back on by itself if the custom domain were
removed. When on:

- **Every page is `noindex, nofollow`.** A `robots.txt` cannot do this from a
  project page — crawlers only read the one at the domain root.
- **No sitemap is generated** — the file a crawler reads to find pages it
  would not otherwise reach.
- **The Follow Up Boss pixel is omitted** (`src/components/FubPixel.astro`),
  so clicking through forms cannot create real CRM records. With no Pixel and
  no relay key the form says it could not send and gives the phone number.

A staging copy, if one is set up, should build with `REVIEW_DEPLOY=true` and a
`BASE_PATH` for its subfolder.

## Video — what ships, and how it was made

Two files, deliberately different:

| File | Where | Size | Why |
| --- | --- | --- | --- |
| `origin-hero.mp4` | `Hero.astro`, the retired autoplay hero | 1.5MB | A background autoplays silently behind a headline; it has to start instantly and carry no sound |
| `origin-trailer.mp4` | HomeHero's VIEW TRAILER dialog | 28MB | The developer's official film, 118s with audio — right behind a button, wrong behind a headline |

The trailer loads `preload="none"` with a poster taken from the film itself, so
nothing downloads until someone presses play.

### Re-encoding a replacement

The masters the owner supplies run 87–115MB and are **git-ignored** —
`src/assets/home/*.mp4`. The repo carries only the web encode. Same call the
camera-original rule makes: source in the asset library, derived file in the
repo.

```
ffmpeg -i <master>.mp4 -vf "scale=-2:720" \
  -c:v libx264 -preset slower -crf 26 -profile:v high -level 4.0 \
  -pix_fmt yuv420p -g 48 -c:a aac -b:a 112k -ac 2 \
  -movflags +faststart public/video/origin-trailer.mp4
```

`+faststart` puts the index before the data so playback can begin before the
file finishes arriving — verify it with `moov` appearing earlier in the file
than `mdat`.

**720p, not 1080p, and that was measured rather than assumed.** Aerial
footage compresses badly: 1080p CRF 23 came out at 68MB, barely a third off the
source. Comparing SSIM against the master across all 2,829 frames:

| Encode | Size | SSIM |
| --- | --- | --- |
| 720p CRF 26 | 25MB | 0.8982 |
| 720p CRF 28 | 20MB | 0.8955 |
| 1080p CRF 28 | 39MB | 0.9018 |

720p at 26 is within 0.004 of 1080p at 28 for a third less file. Frames pulled
from both and compared side by side showed no visible difference at full width.

A warning about measuring this: the first SSIM run reported **exactly 1.0000**,
which is impossible — the filter graph was comparing a stream with itself.
A perfect score means a broken measurement, not a perfect encode.

### Playwright cannot test it

Bundled Chromium ships without the H.264 decoder, so a `<video>` tag with an
MP4 source silently never fires `loadedmetadata` — a test waiting on it times
out and looks like a broken file. Launch with `channel: 'chrome'` to get the
system browser, which has the codec. That is how the trailer was verified
actually playing rather than merely present.

## Verification — what now runs, and what it catches

`npm run verify` is the one command: typecheck → build → output assertion. CI
runs the same three. Before this the pipeline was checkout → install → build →
publish, with nothing able to say no.

| Gate | Catches |
| --- | --- |
| `npm run check` (`astro check`) | Type errors across 122 files, including every `.astro` frontmatter and the three-locale copy contract |
| `npm run build` | Compile and render failures |
| `node scripts/assert-output.mjs` | A build that **succeeds and emits too little** |

### Why the output assertion exists

The dangerous failure here is not a crash — a crash fails the build and nothing
ships. It is a build that exits 0 with pages missing: an emptied
`released.json`, a `getStaticPaths()` returning `[]`, a locale dropped from
`locales`. All three publish a smaller or blank site, and
`upload-pages-artifact` only checks the directory exists.

It asserts **floors, not exact counts** — 30 pages, 10 per locale, 11 named
pages per locale, at least one residence. An exact count would need editing
every time a residence is released, and a check nobody can trust is a check
nobody updates. Proven: emptying `released.json` builds green and the guard
rejects it.

### Type checking was absent entirely

There was no `tsconfig.json` in this project, so `astro check` had never run —
the script existed and dropped into an interactive install prompt. ~16,000
lines of TypeScript, written as though checked (60 interfaces, a typed `Props`
on every component, `// @ts-check` at the top of the config) with nothing
reading any of it.

The first run found **one error**, in code written an hour earlier: a type
predicate that widened instead of narrowing. It ran correctly — types are
erased — and was wrong in the one way nothing at runtime would ever report.
That is the argument for the gate in a sentence.

`strict`, deliberately not `strictest`: `noUncheckedIndexedAccess` is right in
principle but this codebase indexes keyed records constantly, and it would bury
a real first signal under hundreds of mechanical ones. Those lookups are a real
weakness — the fix is to make them throw on a miss, not to make the compiler
shout about each one.

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

**A build can succeed and publish less than it should.** `astro build` exits 0
when a data file empties out. `scripts/assert-output.mjs` is the floor; run
`npm run verify`, not `npm run build`, before trusting a deploy.

**`??` does not catch an empty string.** `BASE_PATH=""` built a root-shaped
site that would 404 an entire project-page deploy, with CI green. Empty
`SITE_URL` fails loudly, which is why only `base` had the hole. It uses `||`
now.

**`check-env.mjs` reads `process.env` as well as `.env*`.** It used to read
only the files — missing the realistic vector, since nobody commits a
credential; they put it in a GitHub Actions secret and wire it into `env:`,
which keeps it out of the repo and not out of the client bundle.

**Astro scopes component styles, so page-level markup does not inherit them.**
The amenities and floor-plan blocks were first written as `<section
class="specs">` inside `[unit].astro`, reusing ListingSpecs' class names. They
came out in a different size and case from every block around them, because
those styles are scoped to ListingSpecs and a page cannot borrow them by class
name. Both now render *through* the component via its `<slot>`. If a block has
to look like another component's block, put it inside that component.

**Never write a root-absolute path by hand.** The site builds for two
different roots — the apex domain in production, and a `/<repo>/` subfolder
whenever Pages serves it without a custom domain (and on any staging copy). An `href="/amenities/"` or `src="/logo-origin.svg"` is correct in
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

**A leftover `AAAA` record makes GitHub Pages report "HTTPS not available".**
The `A` records were right; the apex also kept an IPv6 record for the old
WordPress host. Let's Encrypt prefers IPv6, so its domain check reached the
old server and the certificate never issued. A curl from this machine reached
GitHub either way, so it proved nothing — `dig AAAA` against the
authoritative nameserver is the check. Every apex `A`/`AAAA` must be GitHub's.

**Attaching a custom domain does not rebuild the site.** Until the workflow
next ran, `originresidences.com` served the review build: 78 subfolder asset
paths that 404 at the root, `noindex`, no Pixel. And `configure-pages`
reports `http://` until HTTPS is enforced, so the first rebuild baked
`http://` into every canonical link and the sitemap. Rebuild after each Pages
setting change, and check the live canonical.

**A redirect stub is an HTML file, and file counts will mistake it for a
page.** Each Astro redirect emits a meta-refresh `index.html`. Once every
unreleased residence got one, `assert-output.mjs` counted 31 "residence
pages" — and an emptied `released.json` would have produced 27 stubs and
passed the very check written for it. Stubs are now recognised by content and
excluded; the check prints pages and redirects separately. Any new script
that counts `dist/` should do the same.

**Follow Up Boss ignores `type="hidden"` inputs — silently.** The lead note's
whole context block, including the consent record, was a hidden input and
reached nobody, while every local check passed: `verify-lead-path.mjs`
confirmed the field was populated, which it was. Only a real lead read back
from FUB showed it. Anything the CRM must see goes in a visible-to-the-DOM
control (the note is a `.visually-hidden` `<textarea>`), never `hidden` or
`display:none`. The full note anatomy is in `FOLLOW-UP-BOSS.md`.

**A form control's `value` is also what the CRM prints.** FUB keys each field
by its label and shows its value, so a checkbox with no `value` arrives as
`on`, and a radio arrives as `<option label>: <value>`. Changing a `value` for
FUB's sake breaks any code that compared against the old one: `payloadFromForm`
tested consent as `value === 'on'` and would have recorded every lead as
refusing consent. Read state (`.checked`), not strings; keep a separate
`data-*` for what the payload should record.

**A stretched label covers the control it labels.** The consent `<label>` is
stretched over its paragraph so the text still toggles the box; until the box
and links were lifted above it (`z-index: 1`), Playwright refused to click the
box, and a link would have toggled consent instead of opening the policy.

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

Closed since this list was last updated: enabling Pixel form capture (done by
the owner, verified with real leads), the Follow Up Boss note format (fixed and
verified 2026-10-24), and attaching the real domain (live 2026-10-24).

1. **The privacy policy is false on the live site — a corrected draft is
   WAITING ON THE CLIENT.** Draft:
   https://claude.ai/artifact/UBgeRkCVaKjNTTPbBLWDcR (a shared doc; read it
   with the Claude Docs tools, never web-fetch it). The owner sent it to the
   client on 2026-10-24 to answer its **[CONFIRM]** markers and the checklist
   in its last section, then it goes to counsel. **Nothing is published:
   do not change the live policy until the owner approves the wording.**

   What the live policy gets wrong, measured on the live site 2026-10-24:
   - "Sets no cookies … no trackers": the Pixel sets `WidgetTrackerCookie`
     (36-char visitor ID, ~13-month expiry, on `.originresidences.com`),
     writes `cta_config` to localStorage, and POSTs every page view to
     `widgetbe.com`. It is the only third party the pages load; every other
     external host in `dist/` is an outbound link.
   - It lists fields no form asks for (Company, mailing address, "How did
     you hear about us"). The real fields are in the draft.
   - It names neither Follow Up Boss nor widgetbe, and its "Safe
     Unsubscribe®" line is Constant Contact's wording — whether that tool is
     used is one of the client's questions.

   When the answers are in: read the doc (including comments), revise it,
   and once approved, implement it in `src/content/pages/legal.ts`
   (`legalBody.privacy`) and `src/pages/[...lang]/privacy-policy.astro` —
   whose header comment also claims "this build sets no cookies and loads no
   analytics" and must go with it. The draft adds sections the page does not
   have yet (who receives data, a cookie table, choices and rights), so
   expect markup, not only copy. If the consent wording changes, bump
   `CONSENT_VERSION` in `leads.ts`. Push = release.

   The checklist also raises, for counsel, that the old WordPress site was
   probably compromised in May 2024 (open item 4) and whether lead data
   stored there was exposed.

2. **Decide whether to turn on the relay.** The Pixel is the only delivery
   path, and `widgetbe.com` is blocked by default in uBlock Origin, AdGuard and
   Brave — so a predictable share of an affluent, privacy-tooled audience can
   only be told to call. The relay (`PUBLIC_FORM_RELAY_KEY`) catches exactly
   those leads, returns real evidence of delivery, and is built and verified in
   both Pixel states. It is a client-side `fetch` to a hosted form endpoint —
   no server, no secret, the site stays static — so it is NOT the server-side
   script the owner declined. The owner's decision. If enabled, it must never
   point at the account's `@followupboss.me` address while form capture is on:
   that would duplicate every person record.

3. **Decide whether to have a staging copy.** The review copy is gone — its
   URL now redirects to production — so every push is a release, with no
   place for the owner to look first and no safe place to submit a test lead.
   Options: accept that and test locally (`npm run build && npm run preview`);
   or publish a second, noindexed, Pixel-free build from another repo or
   branch with `REVIEW_DEPLOY=true` and its own `BASE_PATH`. The owner's
   decision.

4. **Re-read Search Console's 404 list around mid-November 2026.** By then
   Google will have recrawled the old addresses. Indexing → Pages → "Not
   found (404)" should hold only the `/property/…` IDX pages and WordPress
   leftovers; anything else is an old address real visitors still use, and
   worth a redirect.

   Done 2026-10-24: the owner verified the domain, and both
   `sitemap-index.xml` and `sitemap-0.xml` are submitted and read (42 pages).
   **The old WordPress site was very likely compromised:** two spam sitemaps,
   `bionic.php?sitemap.xml` and `hidey.php?sitemap.xml`, had been submitted on
   2024-05-09 — scripts no WordPress install creates, and a common SEO-spam
   pattern. They are removed, and the owner has reviewed the property's users
   and owners. The scripts cannot run on the static site. Any spam URLs still
   indexed will drop out as they 404.

   Done: old WordPress URLs were audited from the owner's export (115 URLs,
   844 clicks — 810 already land on unchanged paths) and the ones with an
   equivalent now redirect; the reasoning and the deliberate exclusions are
   in `astro.config.mjs`. DNS other than the website records is untouched
   (MX → `mail.originresidences.com`, SPF intact; the owner does not use mail
   on this domain).

5. **The audit's Phases 3 and 4 were never written down.** Phases 0–2 are
   committed and described in their commit messages. A session note claimed
   3 and 4 were listed here; they were not, and no file or commit records
   them. Ask the owner what they were, or re-run the audit's later phases —
   do not reconstruct them from memory.

6. **Supply the MLS sheet for residence 401.** It carries an asking price and
   nothing else — no MLS number, HOA, taxes, parking or lot size — so those
   rows are absent from its listing page. `src/data/listings.ts`, one object,
   and the rows appear on their own.

7. **The repo is public, and `src/` is readable whatever is released.**
   `released.json` keeps unreleased residences off the built site, but their
   data and drawings in `src/` are visible to anyone who finds the repo, and
   Pages has no password on any plan. Going private needs GitHub Pro before
   the site will build at all.

8. **The locator's pins crowd, and they are burying the building.** At the
   owner-requested 32px, the gold Origin mark measures **85% covered** by
   numbered pins on "All", and **24 of 29 pins overlap** at least one other (48
   overlapping pairs). The owner asked for that mark to be visible across every
   category switch, and on "All" it effectively is not. Cheapest fix that keeps
   the mark beneath the pins: take it to 44–48px so it reads as a halo around
   the cluster. Related: the extent is wider than ideal — Miami Country Day and
   the Sunny Isles school pull it out, leaving a lot of empty mainland. Tighten
   it only if you regenerate the basemap AND every `x`/`y` together; they share
   one projection and changing one alone silently misplaces every pin.
9. **17 places from the owner's list have no coordinates** and are absent from
   the locator, including both public sculptures and Ruth K. Broad K-8. Roads,
   routes and programmes were left out deliberately — they are not single points.
   Note also that all 36 Bal Harbour Shops tenants share the mall's pin, as do
   the restaurants inside each hotel, which is why pins are `aria-hidden` and
   the list carries the semantics.
10. **Decide on the off-kit font weights — there are two now.** Medium 500 (the
   homepage header, both forms, the locator's list and site label) and SemiBold
   600 (the locator's category filter). The kit contains only 100/200/300. Either the
   brand's weight range has genuinely widened, in which case say so in
   `PRODUCT.md`, or these come back down. Both files are latin subsets pulled
   from Google Fonts (SIL OFL 1.1); a glyph outside ASCII/Latin-1 asked for at
   500 or 600 falls back, so keep those weights on known strings. The previous
   Medium file is NOT in git history in usable form — it was a broken subset and
   was replaced, with a copy kept only in the last session's scratchpad.
11. **Native review of `es` and `pt-br`** before those locales go public. Also a
   counsel question on whether the translated consent text carries the same
   force — `TRANSLATION-REVIEW.md` has the detail. Two known English-only spots:
   the footer's maker credit ("Made with ♥ in Miami.") and the Neighborhood
   headline, which changed in English while es/pt-br still read "secluded".
12. **Locator accessibility calls made deliberately at the owner's request.**
   Each was flagged when made; revisit if any matters:
   - Dimmed groups run at `opacity: 0.15`, roughly **2.4:1** — below AA. The
     content is de-emphasised rather than removed and comes back in one click.
   - The category buttons have no `min-height`: they are **20px** tall against
     the 44px target guideline.
   - The filter's `role="status"` count was removed, so a filter change is
     announced only by the chip's own `aria-pressed`.
   - The selected chip is distinguished by **colour alone**; the weight cue went
     when every chip moved to 600.
13. **Two AA failures in the header, surfaced by `measure-page-head.mjs` and
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

14. **The amenity deck needs more photographs, and three cards need a line.**
   Four of the six folders hold a SINGLE image — `clubroom`, `fitness-center`,
   `kidsroom`, `pet-zone` — so those cards drift but never cross-fade; only
   rooftop and aqua club have five each. Drop files into the folder and they
   join that slideshow automatically. (The supporting lines are all in now —
   the owner wrote the three that were missing, so every card carries one, and
   they run at `--t-body` rather than `--t-small`.) Also worth knowing: the aqua-club images are
   near-square (about 1285×1224) and crop hard in a full-bleed landscape card,
   and `pet-zone/origin-pets.jpg` looks like the same photograph already
   tracked as `amenities/pet-park-dogs.jpg`.

15. **36 warnings** from the first review round were never worked — only the
   FAIL-level findings were fixed.
16. **Assets the owner owes**: real photographs for the five templates still on
   `BAND_PLACEHOLDER` (Floor Plans, the three legal pages, and the residence
   pages — The Team came off it when it moved to `.page-head`); a horizontal one-line logo and a white-on-transparent SVG (the
   stacked lockup is weakest on phones); and floor-plan PDFs for 26 of 27
   residences — only 702 had one.

   Two assets are **untracked on purpose**, not strays: `amenities/random/` and
   `neighborhood/origin-palms.jpg` are staged for pages not yet built. Both are
   now in `.gitignore` — `git add` had swept them into four separate commits —
   so whatever work starts using one must **remove its line from `.gitignore`**
   and commit the file. The ignore guards against accident; it is not a decision
   that the asset is unwanted. The stray team
   portrait that used to be listed here was deleted at the owner's request.
   `src/assets/amenities/residence-living-dining-bay-view.jpg` is the opposite
   case — tracked but unreferenced since the Amenities lead render was dropped,
   and NOT the same file as the identically-named one in `assets/gallery/`.
17. Smaller, all live and all deliberate for now:
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
   - **The two forms are forked**: `InquiryForm.astro` and `ScheduleForm.astro`
     duplicate ~225 lines of markup, styles and script. Every lead-path change
     has to be made twice or the schedule form silently keeps the old
     behaviour. Merge them when either is next touched substantially.
   - On the schedule form, the presentation-method and time radios still
     arrive in FUB's field summary doubled (`Visit sales gallery: Visit sales
     gallery`). Left alone: the owner specified only the Inquiry layout, and
     the note body carries both values cleanly.
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

- **The launch follow-ups** — old WordPress URLs and Search Console — are
  open item 4 and have not been started.
- No real-device testing. Emulated viewports only — iOS Safari and Android
  Chrome differ on video autoplay, `100svh` and font rendering.
- The IDX account system (login, favourites, saved searches, mortgage
  calculator) was **cut by agreement** — it cannot work on a static site.
