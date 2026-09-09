/**
 * The floor-plan drawing shown on a residence page.
 *
 * ─── WHY THIS IS A ROUTE AND NOT AN <Image> ────────────────────────────────
 * The previews used to live in src/assets/ and go through Astro's <Image>,
 * which is the right way to handle a photograph and the wrong way to handle
 * this. Vite emits every asset that is STATICALLY IMPORTED, whether or not a
 * page renders it — so `import plan701 from '.../floor-plan-701.png'` put a
 * 287KB drawing of a withdrawn residence into the build even after its page
 * stopped existing. A dynamic import does not help: Vite globs the possible
 * matches and emits all of them.
 *
 * Serving the drawings from a route instead puts them under the SAME switch as
 * the pages and the PDFs — `getStaticPaths` reads `units`, the released-only
 * set — so one edit to src/data/released.json takes a residence off the site
 * completely, and one edit puts it back.
 *
 * The source PNGs therefore sit in src/listings/, OUTSIDE the bundled asset
 * tree, where nothing can import them by accident.
 *
 * Encoding happens here, at build, through sharp — already a dependency, and
 * the same library Astro's own image service uses — so the drawings still
 * arrive as compressed WebP rather than as the raw rasterisations.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { units } from '../../data/units';

const SOURCE_DIR = 'src/listings/floorplans/previews';

/**
 * Wide enough for the drawing to stay readable when a reader zooms into the
 * room dimensions, which are set in small type — the plan is detail, not
 * decoration. It renders at about 1040px at most, so this is roughly 1.5x.
 */
const WIDTH = 1600;

export const sourceFor = (unitNumber: string) =>
  path.resolve(SOURCE_DIR, `floor-plan-${unitNumber}.png`);

export const getStaticPaths: GetStaticPaths = () =>
  units
    .filter((unit) => fs.existsSync(sourceFor(unit.number)))
    .map((unit) => ({
      params: { plan: `floor-plan-${unit.number}` },
      props: { unitNumber: unit.number },
    }));

export const GET: APIRoute = async ({ props }) => {
  const { unitNumber } = props as { unitNumber: string };

  const body = await sharp(sourceFor(unitNumber))
    .resize({ width: WIDTH, withoutEnlargement: true })
    /* A line drawing on flat white: `nearLossless` holds the hairlines and the
       small dimension type without the ringing a photographic quality setting
       leaves around high-contrast edges. */
    .webp({ quality: 90, nearLossless: true })
    .toBuffer();

  return new Response(new Uint8Array(body), {
    headers: { 'Content-Type': 'image/webp' },
  });
};
