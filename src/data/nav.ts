/**
 * THE SITE'S NAVIGATION LIST — one source, two consumers.
 * ============================================================================
 * The header's mega panel and the footer menu both read from here, so a page
 * cannot appear in one and be missing from the other. Labels live beside the
 * paths because they are chrome, not page content.
 *
 * Floor Plans is deliberately absent: the owner asked for it out of the
 * navigation while the page itself stays built and reachable at /floor-plans/.
 * Adding it back here restores it to BOTH the header and the footer at once.
 */
import type { Locale } from '../i18n/ui';

export interface NavLink {
  /** Path without locale prefix; pass through localizePath at the call site. */
  path: string;
  label: Record<Locale, string>;
}

export const exploreLinks: NavLink[] = [
  { path: 'residences', label: { en: 'Residences', es: 'Residencias', 'pt-br': 'Residências' } },
  { path: 'gallery', label: { en: 'Gallery', es: 'Galería', 'pt-br': 'Galeria' } },
  { path: 'amenities', label: { en: 'Amenities', es: 'Amenidades', 'pt-br': 'Comodidades' } },
  { path: 'neighborhood', label: { en: 'Neighborhood', es: 'Vecindario', 'pt-br': 'Vizinhança' } },
  { path: 'artefacto', label: { en: 'Artefacto', es: 'Artefacto', 'pt-br': 'Artefacto' } },
  { path: 'the-team', label: { en: 'The Team', es: 'El Equipo', 'pt-br': 'A Equipe' } },
];

/**
 * Home is separate because the two chromes express it differently: the header
 * carries it as the logo, the footer needs it as a named row. Its path is not
 * hard-coded — it follows HOME_PATH, so the v1/v2 switch moves both at once.
 */
export const homeLabel: Record<Locale, string> = {
  en: 'Home',
  es: 'Inicio',
  'pt-br': 'Início',
};
