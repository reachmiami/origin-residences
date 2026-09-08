// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import released from './src/data/released.json' with { type: 'json' };
import rawUnits from './src/data/units.raw.json' with { type: 'json' };

/* Unreleased residences still get a page, but they are unlinked and must stay
   out of the sitemap — the same single list drives both. */
const hiddenUnitSlugs = rawUnits
  .map((u) => u.slug)
  .filter((slug) => {
    const number = slug.match(/unit-(\d+)/)?.[1];
    return number && !released.releasedUnitNumbers.includes(number);
  });

/* Where this build will be served from.
   ---------------------------------------------------------------------------
   The production site is the apex domain at the root. The GitHub Pages review
   deploy is a *project* page, so it lives one folder down at
   `https://<owner>.github.io/<repo>/` and every internal path needs that
   prefix. Both are read from the environment so the same source tree builds
   for either target — CI sets them, and a plain `npm run build` still produces
   the production shape.

   When the client's real domain is pointed at Pages, drop the two variables
   from the workflow and this reverts to the root build with no code change.
   `base` is threaded through localizePath() and asset() in src/i18n/ui.ts —
   those are the only two places a path is built, so nothing else needs to
   know. */
const SITE = process.env.SITE_URL ?? 'https://originresidences.com';

/* Normalised so the workflow can pass whatever GitHub hands it — `/repo`,
   `/repo/` or a bare `/` on a custom domain — without a trailing-slash bug
   turning into a site-wide 404. */
const BASE_FOLDER = (process.env.BASE_PATH ?? '/').replace(/^\/+|\/+$/g, '');
const BASE = BASE_FOLDER ? `/${BASE_FOLDER}/` : '/';

/** BASE without its trailing slash — '' at a domain root — for joining. */
const BASE_CLEAN = BASE_FOLDER ? `/${BASE_FOLDER}` : '';

/* The github.io review copy. Set by the workflow; never set for production. */
const REVIEW_DEPLOY = process.env.REVIEW_DEPLOY === 'true';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'always',

  // English is the source locale and stays at the root, matching the
  // incumbent URLs so existing inbound links and SEO survive the rebuild.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt-br'],
    routing: { prefixDefaultLocale: false },
  },

  image: {
    // Serve modern formats; sharp handles the 24MB of scraped originals.
    responsiveStyles: true,
    layout: 'constrained',
  },

  /* `/v2/` was the alternate homepage during client review and has been
     promoted onto `/`. Nothing public ever linked to it — it was noindex and
     out of the sitemap — but a reviewer may still hold the URL, so it points
     at the real homepage rather than 404ing. Static output emits these as
     small meta-refresh pages. Safe to delete once no one is using them. */
  /* Astro applies `base` to the redirect SOURCE but leaves the TARGET verbatim,
     so these are written through BASE by hand — otherwise the review deploy
     sends /origin-residences/v2/ to the github.io root, off the site. */
  redirects: {
    '/v2/': `${BASE_CLEAN}/`,
    '/es/v2/': `${BASE_CLEAN}/es/`,
    '/pt-br/v2/': `${BASE_CLEAN}/pt-br/`,
  },

  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
  },

  /* No sitemap on the review copy. Every page there is noindex, and publishing
     a machine-readable index of all 120 URLs alongside that is working against
     itself — it is exactly the file a crawler reads to discover pages it would
     not otherwise find. Production keeps its sitemap. */
  integrations: REVIEW_DEPLOY ? [] : [
    sitemap({
      filter: (page) => !hiddenUnitSlugs.some((slug) => page.includes(`/${slug}/`)),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-ES', 'pt-br': 'pt-BR' },
      },
    }),
  ],

  vite: {
    build: {
      // esbuild's CSS minifier — no extra native dependency to install.
      cssMinify: true,
    },
  },
});
