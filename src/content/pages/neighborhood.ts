import type { Locale } from '../../i18n/ui';

/**
 * Neighborhood page copy.
 *
 * `en` is verbatim from originresidences.com. `es` and `pt-br` are AI-authored
 * and awaiting native review — see TRANSLATION-REVIEW.md.
 *
 * Images are locale-independent and stay in the page component; their alt text
 * is matched here by a stable key.
 */
export interface NeighborhoodCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  lede: string;
  intro: string;
  salesGalleryTitle: string;
  poiTitle: string;
  poiKicker: string;
  alt: {
    canal: string;
    street: string;
    water: string;
  };
}

/**
 * The incumbent's own numbered index, in numeric order. These are the published
 * names of real places, so they are reproduced exactly — including its
 * spellings — and are not translated in any locale.
 */
export const pointsOfInterest = [
  'Origin Sales Lounge',
  'Rustiko',
  'Hillstone Restaurant',
  'Makoto',
  'Le Zoo',
  'Cafe on 3',
  'Atlantikos',
  'BH Burger Bar',
  'Balmoral Restaurant',
  'King David Cuisine',
  'Artisan Beach House',
  'Haulover Park',
  'The Ritz Carlton',
  'St Regis',
  'Pura Vida',
  'Meat Bar',
  'Foozo Artisan Pizza',
  'The Bistro',
  'The Palm Miami',
  'O’Lima Signature Cuisine',
  'Officer Scott Winters Park',
  'Bay Harbor Islands Branch Library',
  'Public School Ruth K. Broad',
  'Indian Creek Country Club',
  'FIU Biscayne Campus',
  'Oleta River State Park',
  'Whole Foods Market',
  'Church By the Sea',
  'Young Israel of Bal Harbour',
  'Bal Harbor Kollel',
  'The Shul',
  'Artefacto Gallery Sales Center',
  'Bal Harbour Shops',
];

export const neighborhoodCopy: Record<Locale, NeighborhoodCopy> = {
  en: {
    metaTitle: 'Neighborhood | Origin Residences, Bay Harbor Islands',
    metaDescription:
      'Discover Bay Harbour, an elegant neighborhood nestled in one of the most sophisticated areas of Miami, and the points of interest around Origin Residences.',
    eyebrow: 'Neighborhood',
    headline: 'An Island Sanctuary Steps from world-class luxury.',
    lede:
      'Bay Harbor Islands offers unparalleled access to some of Miami’s finest dining and shopping destinations. Just minutes away, residents can explore the upscale boutiques and world-class restaurants of Bal Harbour Shops, a premier luxury shopping destination featuring brands like Chanel, Gucci, and Prada.',
    intro:
      'Discover Bay Harbour, an elegant neighborhood nestled in one of the most sophisticated areas of Miami. Perfectly blending natural beauty with a modern and upscale lifestyle, Bay Harbour offers a truly unique living experience for a peaceful place to call home.',
    salesGalleryTitle: 'Sales gallery',
    poiTitle: 'Bay Harbor living',
    poiKicker: 'Points of interest',
    alt: {
      canal:
        'Origin’s stepped terraces above a palm-lined Bay Harbor canal, with private docks and moored boats along the opposite bank.',
      street:
        'The street approach to Origin, a white terraced building framed by royal palms and flowering trees, with a slatted timber screen along the driveway.',
      water:
        'Origin viewed from across the water at golden hour, with a sailboat and a motor launch at the docks in the foreground and palms along the shoreline.',
    },
  },

  es: {
    metaTitle: 'Vecindario | Origin Residences, Bay Harbor Islands',
    metaDescription:
      'Descubra Bay Harbour, un vecindario elegante enclavado en una de las zonas más sofisticadas de Miami, y los puntos de interés en torno a Origin Residences.',
    eyebrow: 'Vecindario',
    headline: 'Un santuario insular apartado, a pasos del lujo de talla mundial.',
    lede:
      'Bay Harbor Islands ofrece un acceso incomparable a algunos de los mejores destinos gastronómicos y comerciales de Miami. A pocos minutos, los residentes pueden recorrer las boutiques de alta gama y los restaurantes de talla mundial de Bal Harbour Shops, un destino de compras de lujo de primer nivel con firmas como Chanel, Gucci y Prada.',
    intro:
      'Descubra Bay Harbour, un vecindario elegante enclavado en una de las zonas más sofisticadas de Miami. Con una combinación perfecta de belleza natural y un estilo de vida moderno y exclusivo, Bay Harbour ofrece una experiencia de vida verdaderamente única y un lugar sereno al que llamar hogar.',
    salesGalleryTitle: 'Galería de ventas',
    poiTitle: 'Vivir en Bay Harbor',
    poiKicker: 'Puntos de interés',
    alt: {
      canal:
        'Las terrazas escalonadas de Origin sobre un canal de Bay Harbor bordeado de palmeras, con muelles privados y embarcaciones amarradas en la orilla opuesta.',
      street:
        'El acceso desde la calle a Origin, un edificio blanco de terrazas escalonadas enmarcado por palmas reales y árboles en flor, con una celosía de madera a lo largo de la entrada de vehículos.',
      water:
        'Origin visto desde el agua a la hora dorada, con un velero y una lancha en los muelles en primer plano y palmeras a lo largo de la orilla.',
    },
  },

  'pt-br': {
    metaTitle: 'Vizinhança | Origin Residences, Bay Harbor Islands',
    metaDescription:
      'Conheça Bay Harbour, um bairro elegante situado em uma das áreas mais sofisticadas de Miami, e os pontos de interesse ao redor do Origin Residences.',
    eyebrow: 'Vizinhança',
    headline: 'Um santuário insular reservado, a passos do luxo de nível mundial.',
    lede:
      'Bay Harbor Islands oferece acesso incomparável a alguns dos melhores destinos de gastronomia e compras de Miami. A poucos minutos, os moradores podem percorrer as boutiques sofisticadas e os restaurantes de nível mundial do Bal Harbour Shops, um destino premium de compras de luxo com marcas como Chanel, Gucci e Prada.',
    intro:
      'Conheça Bay Harbour, um bairro elegante situado em uma das áreas mais sofisticadas de Miami. Ao unir com equilíbrio a beleza natural a um estilo de vida moderno e requintado, Bay Harbour proporciona uma experiência de morar verdadeiramente única — um lugar tranquilo para chamar de seu.',
    salesGalleryTitle: 'Galeria de vendas',
    poiTitle: 'Viver em Bay Harbor',
    poiKicker: 'Pontos de interesse',
    alt: {
      canal:
        'Os terraços escalonados do Origin sobre um canal de Bay Harbor margeado por palmeiras, com píeres privativos e barcos atracados na margem oposta.',
      street:
        'A chegada pela rua ao Origin, um edifício branco de terraços escalonados emoldurado por palmeiras-imperiais e árvores floridas, com um painel ripado de madeira ao longo do acesso de veículos.',
      water:
        'O Origin visto da água no fim da tarde dourada, com um veleiro e uma lancha atracados em primeiro plano e palmeiras ao longo da orla.',
    },
  },
};
