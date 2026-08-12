# Handoff — Origin Residences rebuild

Orientation for a fresh session. Written 2026-08-12.

Read this first, then `PRODUCT.md` for product truth and brand constraints.
`README.md` covers commands and layout, `FOLLOW-UP-BOSS.md` the CRM wiring,
`TRANSLATION-REVIEW.md` the Spanish/Portuguese status.

---

## ⛔ FIRST: the build is currently blocked, on purpose

`npm run build` fails immediately. This is not a bug — a pre-build guard
(`scripts/check-env.mjs`) is refusing to continue because `.env` contains:

```
PUBLIC_FORM_RELAY_KEY=fka_…      ← a Follow Up Boss API KEY
```

A FUB API key grants full read/write to the entire CRM. `PUBLIC_*` variables
are **inlined into client JavaScript** by Astro, so building would publish it.

**With the current Pixel-based setup that key is not needed at all.** The fix is
to delete that line from `.env` (and rotate the key in Follow Up Boss as
hygiene — it was pasted around, though it never reached `dist/`).

To build before the owner clears it, swap in a placeholder and restore:

```bash
cp .env .env.bak
printf 'PUBLIC_FORM_RELAY_ENDPOINT=https://api.web3forms.com/submit\n' > .env
npm run build
mv -f .env.bak .env
```

---

## What this is

A rebuild of **originresidences.com** — a 27-residence luxury waterfront
development in Aventura, FL, with interiors by **Artefacto** — as a static
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

- **120 pages build green** (with the env workaround above)
- **3 locales**: English at the root, `/es/`, `/pt-br/`
- **27 residences**, of which **3 are publicly released**
- Home page weight **~105KB vs 719KB** on the incumbent

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
src/data/contact.ts        phone + address — SINGLE source, was duplicated ×9
src/data/released.json     which residences are public — SINGLE source
src/data/units.ts          27 residences parsed from the live site
src/i18n/ui.ts             chrome strings, locale paths, HOME_PATH
src/content/copy.ts        shared page prose, en/es/pt-br
src/content/pages/*.ts     per-page prose, en/es/pt-br
src/components/            Header (shared, v1+v2), HeroV2, FeatureBand, forms…
src/scripts/leads.ts       lead delivery — read the warning at the top
src/scripts/motion.ts      GSAP + Lenis, all gated on prefers-reduced-motion
src/styles/tokens.css      every design token + @property registrations
scripts/check-env.mjs      the pre-build secret guard
```

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
2. **Font weights 100/200/300 only.** The brand kit ships Thin/ExtraLight/Light.
   The one exception is **Montserrat Medium (500)**, scoped strictly to the v2
   header — see open item 5.
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
lives in `FeatureBand.astro` rather than being copied per page.

---

## Verification workflow

There is no test suite. Verification is Playwright scripts in the project root,
run against `npm run preview`:

```bash
npm run preview &            # serves dist/ on :4321
node shoot.mjs               # 31 screenshots at 375/768/1440 + overflow + console check
node shoot-header.mjs        # header at three widths
node shoot-footer.mjs        # footer at three widths
node measure.mjs             # per-element boxes in the header at 375px
```

Screenshots land in the session scratchpad. **Measure, don't eyeball** — a 2px
overflow and a 92px click-blocking overlap were both invisible in screenshots
and obvious in element boxes. Equally, `document.scrollWidth` did *not* catch
the overlap, because the damage stayed inside the bar.

---

## Open items, in the order I'd take them

1. **Clear the API key from `.env`** so builds run unassisted. Blocking.
2. **Enable Pixel form capture** in Follow Up Boss (*Pixel → Tracking*). The
   Pixel (`WT-FBRKNWTI`) is installed and firing `/identify`, but **no lead is
   created** until this setting is on. Verified by network trace. Until then the
   form shows success and the lead goes nowhere.
3. **Decide v1 vs v2, then fix the SEO contradiction.** `/v2/` is `noindex` and
   out of the sitemap, yet every logo points at it, and `/` is indexable with
   nothing linking to it. Preferred fix: move v2's hero treatment to `/` and
   retire the alternate, keeping the canonical URL's history.
4. **Native review of `es` and `pt-br`** before those locales go public. Also a
   counsel question on whether the translated consent text carries the same
   force — `TRANSLATION-REVIEW.md` has the detail.
5. **Decide on Montserrat Medium.** v2's header needs a weight the brand kit
   does not contain. Either the brand's weight range widens, or the hero
   photograph carries more shade so light weights survive.
6. **36 warnings** from the first review round were never worked — only the
   FAIL-level findings were fixed.
7. **Assets the owner owes**: a horizontal one-line logo and a
   white-on-transparent SVG (the stacked lockup is weakest on phones), and
   floor-plan PDFs for 26 of 27 residences — only 702 had one.
8. Smaller: the menu scrim still runs at 420ms while the panel and bar run at
   720ms; the phone-width burger is 38px against the 44px target guideline.

---

## What has *not* been done

- Nothing is deployed. This exists only locally; `originresidences.com` is still
  the old WordPress site.
- No real-device testing. Emulated viewports only — iOS Safari and Android
  Chrome differ on video autoplay, `100svh` and font rendering.
- The IDX account system (login, favourites, saved searches, mortgage
  calculator) was **cut by agreement** — it cannot work on a static site.
