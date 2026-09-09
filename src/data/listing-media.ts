/**
 * PHOTOGRAPHY for the inventory cards and the listing carousels.
 *
 * ─── AN HONEST LIMITATION ──────────────────────────────────────────────────
 * There is no per-residence photography. Every unit in units.raw.json points
 * at the SAME three S3 URLs on the developer's old CMS, so the source material
 * cannot tell one residence from another — and the building is not standing
 * yet, so no photographer could have shot them. What exists is a set of
 * renderings of representative interiors and of the building itself.
 *
 * So these lists are an EDITORIAL assignment, not a record of which rooms
 * belong to which residence. Each residence gets its own sequence so the three
 * cards do not read as the same listing posted three times, and so a visitor
 * moving between them sees movement. The sequences are drawn from the gallery,
 * are all of this building, and none of them contradicts the residence they
 * sit on — 701 gets the rooftop frames because it is the penthouse level, and
 * the exterior that opens each carousel matches the elevation the residence
 * actually faces.
 *
 * When real per-residence renderings arrive, replace the ids here and nothing
 * else changes.
 *
 * ─── WHY IDS AND NOT IMPORTS ───────────────────────────────────────────────
 * The id is the asset filename stem under src/assets/gallery/, which is also
 * the key the gallery's translated alt text is written against. Referencing by
 * id lets a listing carousel reuse alt text that was written in three
 * languages after looking at the actual file, rather than inventing a fourth
 * description of the same photograph. See src/content/pages/gallery.ts.
 */

export interface ListingMedia {
  /** Gallery id used as the card's single image. */
  card: string;
  /** Gallery ids for the hero carousel, in order. The card image leads. */
  carousel: string[];
}

/** Keyed by residence number, matching `Unit.number`. */
export const LISTING_MEDIA: Record<string, ListingMedia> = {
  /* 302 is a third-floor residence on the canal side; the approach shot shows
     that elevation. Interiors run living → kitchen → bedroom → bath → terrace,
     which is the order a visitor would walk them. */
  '302': {
    card: 'building-waterfront-approach',
    carousel: [
      'building-waterfront-approach',
      'residence-living-dining-bay-view',
      'residence-great-room-kitchen',
      'primary-bedroom-water-view',
      'primary-bathroom-marble',
      'private-terrace-lounge',
    ],
  },

  '401': {
    card: 'building-canal-elevation',
    carousel: [
      'building-canal-elevation',
      'residence-terrace-to-living',
      'residence-kitchen-island',
      'bedroom-wood-panelling',
      'residence-living-blue-rug',
      'terrace-pergola-dining',
    ],
  },

  /* 701 is the penthouse level, so its sequence ends on the roof rather than
     on a terrace — the deck and pool are what that floor actually opens onto. */
  '701': {
    card: 'building-from-water-sunset',
    carousel: [
      'building-from-water-sunset',
      'residence-living-terrace-open',
      'residence-curved-sofa-lounge',
      'primary-bedroom-water-view',
      'rooftop-pool-terrace',
      'rooftop-deck-skyline',
    ],
  },
};

/**
 * Fallback for a residence with no assignment — every unreleased unit, since
 * the template serves all 27. A generic but correct sequence beats an empty
 * carousel, and nothing links to those pages anyway.
 */
export const DEFAULT_MEDIA: ListingMedia = {
  card: 'building-street-entrance',
  carousel: [
    'building-street-entrance',
    'residence-living-dining-bay-view',
    'residence-great-room-kitchen',
    'primary-bedroom-water-view',
  ],
};

export function mediaFor(unitNumber: string): ListingMedia {
  return LISTING_MEDIA[unitNumber] ?? DEFAULT_MEDIA;
}
