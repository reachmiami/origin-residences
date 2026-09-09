/**
 * The downloadable floor-plan PDFs.
 *
 * ─── WHY THESE ARE NOT IN public/ ──────────────────────────────────────────
 * They were. Everything in public/ is copied to the output wholesale, with no
 * way to ask whether the residence it belongs to is still for sale — so
 * withdrawing 701 from the inventory left its plan sitting at a guessable URL,
 * carrying the layout of a residence that is no longer offered.
 *
 * Emitting them from a route instead puts them under the SAME switch as
 * everything else: `getStaticPaths` reads `units`, the released-only set, so a
 * residence pulled from src/data/released.json loses its page and its PDF in
 * one edit, and gets both back the same way.
 *
 * The source files keep their original supplied names in src/listings/
 * floorplans/ and are served under the site's own naming. The rasterised
 * previews shown on the page are separate — those are imported through Vite in
 * [unit].astro and are only emitted for pages that actually render.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { units } from '../../data/units';

/** Where the developer's original PDFs live, relative to the project root. */
const SOURCE_DIR = 'src/listings/floorplans';

/** The supplied filename for a residence, e.g. `floor_plan_302.pdf`. */
const sourceFor = (unitNumber: string) =>
  path.resolve(SOURCE_DIR, `floor_plan_${unitNumber}.pdf`);

export const getStaticPaths: GetStaticPaths = () =>
  units
    /* Not every residence has a drawing of its own — those pages fall back to
       a level keyplan and render no download link, so emitting a route for
       them would produce a URL nothing points at. */
    .filter((unit) => fs.existsSync(sourceFor(unit.number)))
    .map((unit) => ({
      params: { plan: `floor-plan-${unit.number}` },
      props: { unitNumber: unit.number },
    }));

export const GET: APIRoute = ({ props }) => {
  const { unitNumber } = props as { unitNumber: string };

  return new Response(fs.readFileSync(sourceFor(unitNumber)), {
    headers: {
      'Content-Type': 'application/pdf',
      /* Opens in the browser's viewer rather than dropping straight into the
         downloads folder; the link that points here says "Download floor
         plan" and the viewer offers exactly that. */
      'Content-Disposition': `inline; filename="origin-residences-${unitNumber}-floor-plan.pdf"`,
    },
  });
};
