/**
 * PLACEHOLDER ARTWORK FOR PAGE TITLE BANDS
 * ============================================================================
 * These pages have no photograph of their own and are waiting on real artwork
 * from the owner:
 *
 *   The Team, Floor Plans, Privacy Policy, Terms of Use, Accessibility,
 *   and all 27 residence pages
 *
 * They all point here, so swapping in the real images is a change to this file
 * plus one import per page — not a hunt through ten templates. Grep for
 * BAND_PLACEHOLDER to find every page still standing on a stand-in.
 *
 * The image itself is a real, owned asset rather than a grey box, so the layout
 * is being judged against something the size and weight of the final artwork.
 * Its alt text is the copy already authored for it on the Gallery page, in all
 * three locales — nothing here is invented.
 */
import type { Locale } from '../i18n/ui';
import placeholder from '../assets/gallery/building-waterfront-approach.jpg';

export const BAND_PLACEHOLDER = placeholder;

export const BAND_PLACEHOLDER_ALT: Record<Locale, string> = {
  en: 'Rendering of the building approached from the water, its stacked terraces seen on the angle, two motor launches passing in the foreground.',
  es: 'Imagen ilustrativa del edificio en la aproximación desde el agua, con sus terrazas superpuestas vistas en diagonal y dos lanchas cruzando en primer plano.',
  'pt-br':
    'Imagem ilustrativa do edifício na chegada pela água, com seus terraços sobrepostos vistos em diagonal e duas lanchas passando em primeiro plano.',
};
