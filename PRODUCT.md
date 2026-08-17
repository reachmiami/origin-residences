# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (user-confirmed), static output, no backend. GSAP for scroll animation, Lenis for smooth scroll. Deploys as a plain `dist/` folder to any static host. Chosen over Next.js static export (ships far more JS for a content site) and hand-written HTML (27 unit pages need a generator).

## Users

Two confirmed audiences, distinguished by the incumbent site's own form (`Type *` → Buyer / Real Estate Agent-Broker):

- **Prospective buyers** — high-net-worth purchasers evaluating a pre-construction luxury waterfront residence in Bay Harbor Islands, FL. Researching remotely, often internationally (the incumbent form collects country and full mailing address). Comparing against other South Florida boutique condo offerings. Job: decide whether this building is worth a private appointment.
- **Real estate agents / brokers** — bringing clients, needing specs, floor plans, and downloadable material fast. Job: qualify the building for a client and get the sales team on the phone.

International reach is a confirmed product fact, not an assumption: the incumbent form ships a full country list and the footer carries ESP / ENG / POR language links.

## Product Purpose

Sell 27 waterfront limited-edition residences. The site is a lead-generation instrument for the sales team — its success is measured in qualified inquiries and booked private presentations delivered into Follow Up Boss, not in traffic.

## Positioning

A boutique 27-residence waterfront building whose interiors are a collaboration with **Artefacto**, the Brazilian purveyor of sophisticated South Florida living. The Artefacto partnership is the claim a neighboring development could not truthfully copy. Secondary positioning: island living steps from Bal Harbour Shops and Miami's beaches — urban island living adjacent to every comfort of city life.

## Operating Context

- Purchase decisions run through a private presentation, held either in the sales gallery or virtually. Booking that appointment is the real conversion.
- **Two addresses, not one, and they are not interchangeable.** The building is at 9760 West Bay Harbor Dr, Bay Harbor Islands, FL 33154; sales are made from 17651 Biscayne Blvd, Aventura, FL 33160. Both are held separately in `src/data/contact.ts` (`SITE_ADDRESS` vs `ADDRESS`) because conflating them once sent the neighbourhood map to the wrong place.
- Buyers evaluate by floor plan and exposure, so per-unit interior/exterior/total square footage (in both sq. ft. and m²) is decision-critical material, not decoration.
- Leads land in Follow Up Boss and are worked by phone. Speed and completeness of the lead record matter more than form volume.
- Downloadable per-unit PDFs are part of the sales material.

## Capabilities and Constraints

- **Static only.** No backend, no database, no authenticated area. Output is uploaded as static pages.
- **No secrets in the client.** The Follow Up Boss API key must never ship in static JS (it grants full CRM read/write). Lead delivery goes through a form-relay service that emails the FUB lead-parsing address; the FUB Pixel handles visit tracking. Forms are written against a swappable submit adapter so a serverless proxy can replace the relay later without a rebuild.
- **Dropped from the incumbent site** (cannot function without a backend, user-confirmed): login, register, favorites, saved searches, viewing history, password reset, mortgage calculator, email-to-a-friend, and the IDX plugin's modal furniture.
- **27 residences**, levels 3–7, across 4 plan families ranging 2 BR / 2.5 BA to 4 BR + Den / 4.5 BA. Interior 1,302–2,328 sq. ft.; total 1,437–2,799 sq. ft. Exact per-unit figures extracted and held in the content model.
- **No prices, no availability status** (user-confirmed). Price is a conversation; its absence is what drives the inquiry.
- **No commercial map service.** The user ruled out Google Maps on the billing-account obligation and asked for something styleable and stripped of layers. The neighbourhood locator is therefore a committed SVG basemap generated once from OpenStreetMap: every colour is a brand token, nothing loads at runtime, and there is no key to leak or bill. The trade accepted was that it does not pan or zoom.
- **Trilingual: English, Spanish, Portuguese (pt-BR)** (user-confirmed). English is source. ES and pt-BR are AI-authored and flagged for native-speaker review before launch — a confirmed open item, not a shipped guarantee.
- Conversion is tiered (user-confirmed): *Inquire* is the persistent nav CTA for volume; *Schedule Private Presentation* is the emphasized close on unit pages and long-scroll endings.

## Brand Commitments

**BINDING — the user pinned the incumbent brand.** Asked to choose a visual world, the user answered: the look and feel must match originresidences.com, because deviating would violate the brand's standards. This is a **refinement, not a redesign**. The incumbent visual identity is preserved; modernization goes entirely into execution (page weight, motion, navigation, responsiveness, accessibility). A replacement visual world was offered and declined — do not re-open it.

Extracted from the live site and now authoritative:

- **Palette.** Deep navy `#082341` (primary), warm sand `#e6dfd5` (ground), antique gold `#ba935b` (accent). Supporting: pale sand `#eeeae7`, off-white `#fffdf9`, warm gray `#98948f`, light gold `#cbae87`, muted taupe-gold `#a19076`.
- **Typography.** Montserrat, self-hosted, in **light weights — Thin 100, ExtraLight 200, Light 300**. Set predominantly in uppercase with wide letter-spacing. The lightness and the tracking *are* the brand signal; heavy weights break it. (Lora appears in a Google Fonts request but is not part of the self-hosted brand kit.)

  **Two exceptions the user authorised in build, in this order:** Montserrat **Medium 500**, first for the v2 header where light weights were illegible over the sunset photograph, then extended to both forms and the neighbourhood locator's list; and **SemiBold 600**, for the locator's category filter, added after the user asked twice for a bolder filter and 500 was already the heaviest face loaded. Neither is in the incumbent kit. **This is an unresolved brand question, not a settled widening** — either the range has genuinely changed and this section should say so plainly, or those uses come back down. Do not treat the exceptions as licence to reach for weight generally; hierarchy still comes from scale, tracking and case.
- **Logo.** `Logo_Carla.svg` (wordmark, 231.8 × 45.0, white fill), plus `logo-sidebar.png` and `LOGOPP.png`. Held in `scratchpad/scrape/brand/`.
- **Hero motion.** An existing brand video, `seis_2-1.mp4`.
- Name: **ORIGIN** / Origin Residences. Legal entity in the terms: Bay Harbour Investment, Inc.
- Confirmed partner credits that must remain: Developed By, Interiors By (Artefacto), Design By, Architecture By, Construction By, Exclusive Sales By.
- Voice: restrained, declarative, luxury real-estate register. Not exclamatory.
- Binding visual reference supplied by the user: the nav trigger adopts the hover-swap pill mechanic from dexlyn.com, opening a full-width mega panel — rendered in Origin's own palette and type, not Dexlyn's.

**What "modernize" means under this constraint:** the identity is fixed; the execution is not. Permitted and expected — cutting 350–720KB of per-page markup, GSAP scroll reveals, smooth scroll, the mega-panel nav replacing the hamburger, replacing modals/lightboxes with in-page and View Transition patterns, responsive behavior, AVIF/WebP imagery, and WCAG 2.1 AA. Not permitted — new palettes, new typefaces, new logo treatments, or a different visual register.

## Evidence on Hand

Real, extracted from the incumbent site — nothing here is fabricated:

- **95 unique media assets, 24MB**, from the IDXBoost S3 bucket (`scratchpad/scrape/assets/`).
- **27 unit records** with verified bed/bath, interior, exterior, and total areas in sq. ft. and m² (`scratchpad/scrape/units.json`).
- **Verbatim marketing copy** for all 9 core pages (`scratchpad/scrape/text/`).
- Contact, **user-confirmed and authoritative**: (305) 458-1100 · germanr.realty@gmail.com. Addresses per Operating Context above — the building at 9760 West Bay Harbor Dr, Bay Harbor Islands, FL 33154, and the sales gallery at 17651 Biscayne Blvd, Aventura, FL 33160. Phone, email and both addresses all live in `src/data/contact.ts` — the single source.
- For the record, so nobody "corrects" it back: the incumbent site listed **(786) 850-8998** at scrape time. That number is superseded. The email and the building address were scraped correctly and still stand.
- Legal: existing Terms of Use and Privacy Policy text, and the TCPA-style consent language attached to every form.

**Absences future work must not fabricate:** no prices, no availability status, no testimonials, no sales figures, no completion date, no awards. Only one unit (702) had a linked PDF; the rest are not on hand.

## Product Principles

1. **The lead is the product.** Every design decision is judged by whether it produces a qualified, complete lead record — not by traffic or time-on-site.
2. **Specs are content, not chrome.** Square footage, bed/bath, and floor plans are what buyers actually compare; they get typographic weight, not fine print.
3. **Absence is deliberate.** No price, no availability, no invented proof. The gap is the reason to make contact, and it must never be filled with fiction.
4. **Weight is a defect.** The incumbent ships 350–720KB of markup per page before images. Nothing earns its bytes by default.
5. **Restraint is the luxury signal.** Declarative copy, generous space, and motion that reveals rather than performs.

## Accessibility & Inclusion

The incumbent site publishes an Accessibility page, making accessibility an existing public commitment. Target WCAG 2.1 AA: full keyboard operability for the mega-panel nav and all forms, visible focus states, honored `prefers-reduced-motion` for all GSAP and smooth-scroll behavior, and real labels on every form control.
