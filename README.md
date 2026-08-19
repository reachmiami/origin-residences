# Origin Residences — static site

A rebuild of originresidences.com as a static Astro site. The brand is
preserved exactly; the execution is rebuilt.

## Commands

```bash
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static output to dist/
npm run preview  # serve dist/ locally to check the real build
```

**Deploying:** upload the contents of `dist/` to the web root. There is no
server component, no database, and no build step on the host.

## Why it was rebuilt

The incumbent WordPress site ships **350–720KB of markup per page before a
single image** — the home page alone was 719KB. Most of that is Elementor
scaffolding and an IDX plugin whose account features (login, saved searches,
favourites, mortgage calculator) cannot function on a static site and were cut
by agreement.

## What is fixed and what is not

`PRODUCT.md` is the authority. The short version:

**Fixed — do not change.** The owner pinned the incumbent brand on
brand-standards grounds. Palette (`#082341` navy, `#e6dfd5` sand, `#ba935b`
gold), Montserrat in **Thin/ExtraLight/Light only**, uppercase with wide
tracking, and the six partner credits in the footer.

**Rebuilt.** Page weight, GSAP scroll motion, Lenis smooth scroll, the
mega-panel navigation that replaced the hamburger, modal-free reveals,
responsive behaviour, AVIF/WebP imagery, and WCAG 2.1 AA.

## Layout

```
src/
  layouts/Base.astro       shell, SEO, hreflang, direction contract
  components/PageBand      photographic page title band — used by 7 templates
  styles/tokens.css        also holds .page-head, the flat sand title treatment
                           used by Gallery, Amenities, Neighborhood, Artefacto
                           and The Team
  components/HomeHero      the homepage hero — sunset still, flying logo
  components/HomeStack     the homepage's three shuffling cards
  components/AmenityStack  the six shuffling amenity cards
  components/KenBurns      crossfading slideshow with a Ken Burns drift
  components/NeighborhoodMap  keyless locator — SVG basemap, filter, pins
  components/              Header (mega nav), Footer, Hero, forms, gallery
  pages/                   file-based routes; [unit].astro emits all 27
  data/units.ts            27 residences parsed from the live site
  data/nav.ts              the nav list — shared by header and footer
  data/band-art.ts         placeholder band artwork, awaiting real images
  data/contact.ts          phone + BOTH addresses (building vs sales gallery)
  data/neighborhood-places.ts  77 located places — GENERATED, read its header
  assets/map/              the committed neighbourhood basemap SVG
  content/copy.ts          page prose, en / es / pt-br
  i18n/ui.ts               chrome strings + locale-aware paths
  scripts/motion.ts        GSAP + Lenis, gated on prefers-reduced-motion
  scripts/leads.ts         lead submission adapter — read the warning in it
  styles/tokens.css        every design token
```

**Verification** lives in `measure-*.mjs` and `shoot.mjs` at the project root.
There is no test suite; these are run by hand against a build. `HANDOFF.md`
lists them and — more importantly — the ways a measurement can lie to you.

## Non-negotiables

1. **No Follow Up Boss API key in this repo, ever.** It grants full CRM
   read/write and this site is public by construction. See `FOLLOW-UP-BOSS.md`.
2. **No second typeface, and no font-weight above 300** — with two sanctioned
   exceptions: Montserrat Medium 500 (the homepage header, both forms, the
   neighbourhood locator's list) and SemiBold 600 (the locator's category
   filter). Both are
   latin-subset files. The lightness is the brand signal; widening this further
   is the owner's call, not a styling decision. See open item 5 in `HANDOFF.md`.
3. **Colours come from tokens**, never raw hex in components.
4. **No modals or lightboxes** — an explicit client requirement. Reveals happen
   in place or through navigation.
5. **Invent nothing.** No prices, availability, testimonials, awards or bios.
   The absence of price is deliberate — it's what drives the inquiry.
6. **All motion respects `prefers-reduced-motion`.**

## Content sources

Copy and imagery were extracted from the live site: 27 residence records with
verified areas, 95 media assets, and verbatim page copy. Spanish and
Portuguese (pt-BR) are AI-authored — see `TRANSLATION-REVIEW.md` before launch.

## Known gaps for the owner

- **A horizontal, one-line logo and a white-on-transparent SVG.** The supplied
  mark is a stacked lockup that reads poorly at small sizes in a fixed bar.
- **Floor plan PDFs.** Only unit 702 had one on the live site; the download
  link renders only where a PDF exists.
- **Native-speaker review** of the Spanish and Portuguese copy.
- **Social profile URLs** in the footer are best guesses — confirm them.
