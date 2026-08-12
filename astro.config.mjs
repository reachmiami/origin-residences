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

export default defineConfig({
  site: 'https://originresidences.com',
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

  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !hiddenUnitSlugs.some((slug) => page.includes(`/${slug}/`)) &&
        // The alternate homepage is for client review only.
        !/\/v2\/$/.test(page),
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
