import type { Locale } from '../../i18n/ui';

/**
 * Home page copy.
 *
 * Almost all of the home page's prose already lives in src/content/copy.ts
 * under `home` (hero, collaboration lines, intro, inventory strip, private
 * presentation) and is consumed by the shared components via getCopy(locale).
 * Only the document-level metadata was still inline in the page, so that is
 * all this module carries — nothing here duplicates copy.ts.
 *
 * `en` is verbatim from originresidences.com. `es` and `pt-br` are AI-authored
 * and awaiting native review — see TRANSLATION-REVIEW.md.
 */
export interface HomeCopy {
  metaTitle: string;
  metaDescription: string;
}

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    metaTitle: 'Origin Residences | 27 Waterfront Residences in Bay Harbor Islands',
    metaDescription:
      'An exquisite collection of 27 waterfront limited edition luxury residences in collaboration with Artefacto, in Bay Harbor Islands, Florida.',
  },

  es: {
    metaTitle: 'Origin Residences | 27 residencias frente al mar en Bay Harbor Islands',
    metaDescription:
      'Una exquisita colección de 27 residencias de lujo frente al mar, en edición limitada, en colaboración con Artefacto, en Bay Harbor Islands, Florida.',
  },

  'pt-br': {
    metaTitle: 'Origin Residences | 27 residências à beira-mar em Bay Harbor Islands',
    metaDescription:
      'Uma coleção primorosa de 27 residências de luxo à beira-mar, em edição limitada, em colaboração com a Artefacto, em Bay Harbor Islands, Flórida.',
  },
};
