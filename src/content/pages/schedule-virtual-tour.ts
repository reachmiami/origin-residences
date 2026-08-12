import type { Locale } from '../../i18n/ui';

/**
 * Schedule a private presentation page copy.
 *
 * `en` is verbatim from originresidences.com. `es` and `pt-br` are AI-authored
 * and awaiting native review — see TRANSLATION-REVIEW.md.
 *
 * The hero headline and lede, and every label inside the booking form itself,
 * already live in src/content/copy.ts and stay there — this module holds only
 * the prose that is unique to this page.
 *
 * Contact details (address, phone, email) are deliberately absent: they are the
 * same in every language and stay in the page component.
 */
export interface ScheduleCopy {
  metaTitle: string;
  heroAlt: string;
  salesGallery: string;
}

export const scheduleCopy: Record<Locale, ScheduleCopy> = {
  en: {
    metaTitle: 'Schedule a Private Presentation | Origin Residences',
    heroAlt:
      'The Origin Residences facade seen from the water at dusk, its stepped balconies framed by palms above a private dock.',
    salesGallery: 'Sales gallery',
  },

  es: {
    metaTitle: 'Agendar una presentación privada | Origin Residences',
    heroAlt:
      'La fachada de Origin Residences vista desde el agua al atardecer, con sus balcones escalonados enmarcados por palmeras sobre un muelle privado.',
    salesGallery: 'Galería de ventas',
  },

  'pt-br': {
    metaTitle: 'Agendar uma apresentação privada | Origin Residences',
    heroAlt:
      'A fachada do Origin Residences vista da água ao anoitecer, com suas varandas escalonadas emolduradas por palmeiras acima de um píer privativo.',
    salesGallery: 'Showroom de vendas',
  },
};
