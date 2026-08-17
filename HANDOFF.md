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

Working branch: `homepage-stack-hero-scrim-forms`, **three commits, nothing
merged to `main`** — which still sits on the original rebuild.

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

- **`PageBand.astro`** — the Residences photographic title band, now on 10
  templates / 37 pages. Six of them stand on a placeholder image.
- **Floor Plans is out of the navigation**; the page still builds.
- **Gallery and Amenities use `page-head`**; every other titled page uses
  `.band`.
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
Home (`/`), **alternate home (`/v2/`)**, Residences, Floor Plans, Gallery,
Amenities, Neighborhood, Artefacto, The Team, Schedule, 27 unit pages, and
Privacy / Terms / Accessibility — each in all three locales.

### Two homepages exist
`/` is v1 (brand video hero). `/v2/` is the alternate the client is currently
being shown: sunset still, centred copy, and a logo that flies from the hero
into the header on scroll. **Every page's logo currently links to `/v2/`** via
`HOME_PATH` in `src/i18n/ui.ts` — a one-line switch back to `''`.

Everything below the hero is shared between them, so edits to those bands
appear in both.

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
src/components/PageBand    photographic page title band — 10 templates
src/components/HomeStack   the homepage's three shuffling cards
src/components/NeighborhoodMap  the locator: filter, SVG basemap, pins, list
src/data/neighborhood-places.ts 77 places — GENERATED, read its header first
src/assets/map/            the committed basemap SVG (106KB raw, 35KB gzipped)
src/assets/brand/marker-origin.svg  the building's own map marker
src/components/            Header (shared, v1+v2), HeroV2, FeatureBand, forms…
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
  and Neighborhood

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
   **Medium 500** (v2 header, both forms, the locator's list and site label) and
   **SemiBold 600** (the locator's category filter, the only rule that loads it).
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

## Gotchas that cost real debugging time

Do not rediscover these.

**`.header.is-condensed` rules keep winning.** They set `color`/`background` at
the same specificity as v2's rules and apply from 40px of scroll. Any v2 rule
touching colour must name `.header--v2.is-condensed` and `.header--v2.is-open`
explicitly or it silently loses the moment the page moves. This bit three times.

**`order` reorders CSS Grid auto-placement.** The shared `≤1080px` block sets
`order: 2/3` on the header flanks for the old flex bar. That pushed the v2
logo slot into column 1 and the left flank into the collapsed centre. The v2
tablet grid now assigns `grid-column` explicitly.

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
`Montserrat-Medium.woff2` had been cut down to a handful of glyphs for the v2
header's few strings. It was missing **60 of the 65 characters** the locator's
list needs, so everything set to `--w-medium` — the group titles, 89 place
names, the pin numbers, and the forms — rendered in the **system fallback**.
Nothing errored; the file loaded with a 200. The symptom was a measurement that
had already been taken and read past: the same string came out **narrower at 500
(217.0px) than at 300 (235.4px)**, which cannot happen in one family. To check a
face, load it in isolation under its own family name and compare per-character
widths against a bare fallback — `document.fonts.check()` will NOT tell you,
because it answers for the family, not the face. Both off-kit files are latin
subsets now: ASCII and Latin-1, which covers every accent the es/pt-br copy uses.

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
node measure-hero.mjs             # v2 hero: headline + header shade, heading weights
node measure-inquire.mjs          # darkest pixel behind DARK type on the lead band
node measure-team.mjs             # the five team cards: grounds, gradients, contrast
node measure-band.mjs             # the page band's veil contrast, every page
```

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

1. **Enable Pixel form capture** in Follow Up Boss (*Pixel → Tracking*). The
   Pixel (`WT-FBRKNWTI`) is installed and firing `/identify`, but **no lead is
   created** until this setting is on. Verified by network trace. Until then the
   form shows success and the lead goes nowhere. This is the only item that
   blocks the site doing its job.
2. **Decide v1 vs v2, then fix the SEO contradiction.** `/v2/` is `noindex` and
   out of the sitemap, yet every logo points at it, and `/` is indexable with
   nothing linking to it. Preferred fix: move v2's hero treatment to `/` and
   retire the alternate, keeping the canonical URL's history.
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
5. **Decide on the off-kit font weights — there are two now.** Medium 500 (v2
   header, both forms, the locator's list and site label) and SemiBold 600 (the
   locator's category filter). The kit contains only 100/200/300. Either the
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
8. **36 warnings** from the first review round were never worked — only the
   FAIL-level findings were fixed.
9. **Assets the owner owes**: real photographs for the six pages still on
   `BAND_PLACEHOLDER` (The Team, Floor Plans, the three legal pages, and all 27
   unit pages); a horizontal one-line logo and a white-on-transparent SVG (the
   stacked lockup is weakest on phones); and floor-plan PDFs for 26 of 27
   residences — only 702 had one. Also **`src/assets/team/Sergio Guzman &
   Mauricio Moya 77.jpg` is untracked and unreferenced** — it was dropped into
   the repo and nothing imports it; find out where it belongs.
10. Smaller, all live and all deliberate for now:
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

## What has *not* been done

- Nothing is deployed. This exists only locally; `originresidences.com` is still
  the old WordPress site.
- No real-device testing. Emulated viewports only — iOS Safari and Android
  Chrome differ on video autoplay, `100svh` and font rendering.
- The IDX account system (login, favourites, saved searches, mortgage
  calculator) was **cut by agreement** — it cannot work on a static site.
