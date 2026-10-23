/**
 * Post-build guard: refuse to publish a build that lost pages.
 *
 * The deploy pipeline had no assertion of any kind on its output. The failure
 * it could not see is not a crash — a crash fails the build and nothing ships.
 * It is a build that SUCCEEDS and emits less than it should:
 *
 *   · `released.json` emptied or mistyped — `units` goes empty, every unit page
 *     and every floor-plan route disappears, exit code 0
 *   · a `getStaticPaths()` returning [] for any reason
 *   · a locale dropped out of `locales`, taking a third of the site
 *
 * All three deploy green and arrive as a smaller or blank site. `upload-pages-
 * artifact` only checks that the directory exists.
 *
 * So this asserts floors, not exact counts. An exact count would have to be
 * edited every time a residence is released — a check nobody can trust is a
 * check nobody updates, and it would have been wrong three times in the last
 * month alone.
 *
 * Run by `npm run verify` and by the deploy workflow, after the build.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';

/* Floors, chosen to sit below the real figures with room for ordinary change
   and above anything that would indicate a collapse. At the time of writing
   the build emits 42 pages with 2 residences released. */
const MIN_PAGES = 30;
const MIN_PER_LOCALE = 10;
const LOCALES = [
  { id: 'en', dir: '' },
  { id: 'es', dir: 'es' },
  { id: 'pt-br', dir: 'pt-br' },
];

/** Pages every build must contain, whatever the inventory is doing. */
const REQUIRED = [
  'index.html',
  'residences/index.html',
  'amenities/index.html',
  'neighborhood/index.html',
  'gallery/index.html',
  'floor-plans/index.html',
  'the-team/index.html',
  'artefacto/index.html',
  'privacy-policy/index.html',
  'terms-of-use/index.html',
  'accessibility/index.html',
];

const problems = [];

if (!fs.existsSync(DIST)) {
  console.error(`\n✗ No ${DIST}/ — nothing was built.\n`);
  process.exit(1);
}

/** Every .html under dist, recursively. */
function pages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return pages(full);
    return e.name.endsWith('.html') ? [full] : [];
  });
}

const all = pages(DIST);

if (all.length < MIN_PAGES) {
  problems.push(`${all.length} pages built, expected at least ${MIN_PAGES}.`);
}

for (const { id, dir } of LOCALES) {
  const root = path.join(DIST, dir);
  if (!fs.existsSync(root)) {
    problems.push(`locale "${id}" produced no output at ${root}/.`);
    continue;
  }
  /* Count only this locale's own pages — the English root would otherwise
     count the es/ and pt-br/ trees nested inside it. */
  const own = pages(root).filter(
    (f) => dir !== '' || !LOCALES.some((l) => l.dir && f.startsWith(path.join(DIST, l.dir) + path.sep)),
  );
  if (own.length < MIN_PER_LOCALE) {
    problems.push(`locale "${id}" built ${own.length} pages, expected at least ${MIN_PER_LOCALE}.`);
  }

  for (const rel of REQUIRED) {
    if (!fs.existsSync(path.join(root, rel))) {
      problems.push(`locale "${id}" is missing ${rel}.`);
    }
  }
}

/* At least one residence must be purchasable, or the site has no product on
   it. This catches an emptied released.json, which is otherwise a silent,
   successful build of a brochure with nothing for sale. */
const unitPages = all.filter((f) => /\/(ph-)?level-\d-unit-\d+\//.test(f));
if (unitPages.length === 0) {
  problems.push('no residence pages were built — check src/data/released.json.');
}

if (problems.length) {
  console.error('\n\x1b[41m\x1b[97m  BUILD REJECTED — the output is missing pages  \x1b[0m\n');
  for (const p of problems) console.error(`  ✗ ${p}`);
  console.error('\n  A build can succeed and still emit less than it should.');
  console.error('  Nothing is published until this passes.\n');
  process.exit(1);
}

/* "HTML files", not "pages": Astro reports 42 routes and this counts 45 files,
   the difference being the three /v2/ meta-refresh redirect stubs. Two true
   numbers that disagree are worth naming before someone reconciles them. */
console.log(
  `✓ output check passed — ${all.length} HTML files, ` +
    `${unitPages.length} residence pages, 3 locales`,
);
