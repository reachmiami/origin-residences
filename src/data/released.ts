/**
 * RELEASED INVENTORY — the one place that controls which residences are public.
 * ============================================================================
 *
 * The developer releases inventory in phases. Units not listed here are HIDDEN
 * from the website but are NOT deleted: their data, specs, floor plans and
 * artwork all stay in the project, ready to be switched back on.
 *
 * TO CHANGE WHAT IS VISIBLE, EDIT src/data/released.json AND NOTHING ELSE.
 * (It is JSON rather than TypeScript so the Astro config can read the same
 * list when it builds the sitemap — one source of truth, no duplication.)
 *
 *   Show a unit again → add its number, e.g. '502'
 *   Hide a unit       → remove its number
 *
 * Then run `npm run build`. Every surface follows automatically: the mega-panel
 * navigation, the home inventory strip, the Residences index and its filters,
 * the floor-plan families, prev/next paging, the sitemap, and which unit pages
 * get generated at all.
 *
 * Use the unit NUMBER exactly as it appears in the slug — '302', '401', '701'.
 *
 * NOTE ON PAGE GENERATION: every residence gets a page built, released or not.
 * Hidden ones are simply UNLINKED — nothing on the site points at them, they
 * are excluded from the sitemap, and they carry a noindex robots tag. They stay
 * reachable by direct URL, which is what makes them easy to share privately
 * with a broker before release.
 *
 * The building has 27 residences in total. That figure is a fact about the
 * building and appears in the marketing copy; it is independent of how many are
 * currently released, and it does not change when this list does.
 */
import config from './released.json';

export const RELEASED_UNIT_NUMBERS: string[] = config.releasedUnitNumbers;

/** Every residence in the building, released or not. A brand fact. */
export const TOTAL_RESIDENCES: number = config.totalResidences;
