export const locales = ['en', 'es', 'pt-br'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'ENG',
  es: 'ESP',
  'pt-br': 'POR',
};

/**
 * Chrome strings only — navigation, controls, form labels. Page prose lives in
 * src/content so translators can work on it without touching markup.
 *
 * NOTE: `es` and `pt-br` are AI-authored and awaiting native-speaker review.
 */
const ui = {
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    menuEnter: 'Enter',
    explore: 'Navigation',
    residences: 'Residences',
    connect: 'Connect',
    inquire: 'Inquire',
    viewAvailable: 'View available units',
    viewTrailer: 'View teaser trailer',
    closeVideo: 'Close video',
    viewAll: 'View all',
    schedule: 'Schedule presentation',
    requestInfo: 'Request more information',
    getInfo: 'Get more information',
    call: 'Contact',
    email: 'Email',
    address: 'Sales gallery address',
    follow: 'Follow us',
    language: 'Language',
    level: 'Level',
    unit: 'Unit',
    interior: 'Interior',
    exterior: 'Exterior',
    total: 'Total',
    area: 'Area',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bath',
    den: 'Den',
    downloadPdf: 'Download floor plan',
    backToInventory: 'All residences',
    prevImage: 'Previous image',
    nextImage: 'Next image',
    prevUnit: 'Previous residence',
    nextUnit: 'Next residence',
    filterAll: 'All',
    noResults: 'No residences match these filters.',
    clearFilters: 'Clear filters',
    share: 'Share',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    close: 'Close',
    privacy: 'Privacy policy',
    terms: 'Terms & conditions',
    accessibility: 'Accessibility',
    rights: 'All rights reserved',
    galleryOpen: 'View larger',
    imageOf: 'Image {n} of {total}',
    required: 'Required fields',
    submit: 'Submit',
    sending: 'Sending…',
    formError: 'Something went wrong. Please try again, or call us directly.',
    fieldRequired: 'This field is required',
    emailInvalid: 'Please enter a valid email address',
    phoneInvalid: 'Please enter a valid phone number',
    reviewPending: '',
  },
  es: {
    skip: 'Ir al contenido',
    menu: 'Menú',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    menuEnter: 'Entrar',
    explore: 'Navegación',
    residences: 'Residencias',
    connect: 'Contacto',
    inquire: 'Consultar',
    viewAvailable: 'Ver unidades disponibles',
    viewTrailer: 'Ver el tráiler',
    closeVideo: 'Cerrar el video',
    viewAll: 'Ver todas',
    schedule: 'Agendar presentación',
    requestInfo: 'Solicitar más información',
    getInfo: 'Obtener más información',
    call: 'Contacto',
    email: 'Correo',
    address: 'Dirección de la galería de ventas',
    follow: 'Síganos',
    language: 'Idioma',
    level: 'Nivel',
    unit: 'Unidad',
    interior: 'Interior',
    exterior: 'Exterior',
    total: 'Total',
    area: 'Superficie',
    bedrooms: 'Habitaciones',
    bathrooms: 'Baños',
    den: 'Estudio',
    downloadPdf: 'Descargar plano',
    backToInventory: 'Todas las residencias',
    prevImage: 'Imagen anterior',
    nextImage: 'Imagen siguiente',
    prevUnit: 'Residencia anterior',
    nextUnit: 'Residencia siguiente',
    filterAll: 'Todas',
    noResults: 'Ninguna residencia coincide con estos filtros.',
    clearFilters: 'Borrar filtros',
    share: 'Compartir',
    copyLink: 'Copiar enlace',
    linkCopied: 'Enlace copiado',
    close: 'Cerrar',
    privacy: 'Política de privacidad',
    terms: 'Términos y condiciones',
    accessibility: 'Accesibilidad',
    rights: 'Todos los derechos reservados',
    galleryOpen: 'Ver más grande',
    imageOf: 'Imagen {n} de {total}',
    required: 'Campos obligatorios',
    submit: 'Enviar',
    sending: 'Enviando…',
    formError: 'Algo salió mal. Inténtelo de nuevo o llámenos directamente.',
    fieldRequired: 'Este campo es obligatorio',
    emailInvalid: 'Introduzca un correo electrónico válido',
    phoneInvalid: 'Introduzca un número de teléfono válido',
    reviewPending: 'pending-native-review',
  },
  'pt-br': {
    skip: 'Ir para o conteúdo',
    menu: 'Menu',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    menuEnter: 'Entrar',
    explore: 'Navegação',
    residences: 'Residências',
    connect: 'Contato',
    inquire: 'Consultar',
    viewAvailable: 'Ver unidades disponíveis',
    viewTrailer: 'Ver o teaser',
    closeVideo: 'Fechar o vídeo',
    viewAll: 'Ver todas',
    schedule: 'Agendar apresentação',
    requestInfo: 'Solicitar mais informações',
    getInfo: 'Obter mais informações',
    call: 'Contato',
    email: 'E-mail',
    address: 'Endereço do showroom de vendas',
    follow: 'Siga-nos',
    language: 'Idioma',
    level: 'Nível',
    unit: 'Unidade',
    interior: 'Interior',
    exterior: 'Exterior',
    total: 'Total',
    area: 'Área',
    bedrooms: 'Quartos',
    bathrooms: 'Banheiros',
    den: 'Escritório',
    downloadPdf: 'Baixar planta',
    backToInventory: 'Todas as residências',
    prevImage: 'Imagem anterior',
    nextImage: 'Próxima imagem',
    prevUnit: 'Residência anterior',
    nextUnit: 'Próxima residência',
    filterAll: 'Todas',
    noResults: 'Nenhuma residência corresponde a estes filtros.',
    clearFilters: 'Limpar filtros',
    share: 'Compartilhar',
    copyLink: 'Copiar link',
    linkCopied: 'Link copiado',
    close: 'Fechar',
    privacy: 'Política de privacidade',
    terms: 'Termos e condições',
    accessibility: 'Acessibilidade',
    rights: 'Todos os direitos reservados',
    galleryOpen: 'Ver maior',
    imageOf: 'Imagem {n} de {total}',
    required: 'Campos obrigatórios',
    submit: 'Enviar',
    sending: 'Enviando…',
    formError: 'Algo deu errado. Tente novamente ou ligue para nós.',
    fieldRequired: 'Este campo é obrigatório',
    emailInvalid: 'Informe um e-mail válido',
    phoneInvalid: 'Informe um telefone válido',
    reviewPending: 'pending-native-review',
  },
} as const;

type UIKey = keyof (typeof ui)['en'];

export function useTranslations(locale: Locale) {
  return function t(key: UIKey, vars?: Record<string, string | number>): string {
    const dict = ui[locale] as Record<string, string>;
    let out = dict[key] ?? (ui.en as Record<string, string>)[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        out = out.replace(`{${k}}`, String(v));
      }
    }
    return out;
  };
}

/**
 * Where the logo and any "home" link point.
 *
 * The root, now that the alternate homepage has been promoted onto it. Kept as
 * a named constant because it is the only place the destination is written
 * down — the header logo, the footer logo and the hero's flying logo all read
 * it, so they cannot drift apart.
 */
export const HOME_PATH = '';

/** Build a locale-aware absolute path. English stays at the root. */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const suffix = clean ? `${clean}/` : '';
  return locale === defaultLocale ? `/${suffix}` : `/${locale}/${suffix}`;
}

/**
 * getStaticPaths() entries for a page that exists in every locale.
 *
 * English is the default locale and `prefixDefaultLocale` is false, so its
 * `lang` param is undefined — the rest parameter collapses and the page emits
 * at the root (`/amenities/`), while the others emit at `/es/amenities/` and
 * `/pt-br/amenities/`. That keeps every existing English URL intact.
 */
export function localeStaticPaths() {
  return [
    { params: { lang: undefined } },
    { params: { lang: 'es' } },
    { params: { lang: 'pt-br' } },
  ];
}

/** Resolve the `lang` route param back to a Locale, defaulting to English. */
export function localeFromParam(lang?: string): Locale {
  return lang === 'es' || lang === 'pt-br' ? lang : defaultLocale;
}

/** Strip a locale prefix back off a pathname, for the language switcher. */
export function depath(pathname: string): string {
  const stripped = pathname.replace(/^\/(es|pt-br)(?=\/|$)/, '');
  return stripped.replace(/^\/+/, '').replace(/\/+$/, '');
}
