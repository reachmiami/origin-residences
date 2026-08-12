import type { Locale } from '../../i18n/ui';

/**
 * Residences inventory page + individual residence page copy.
 *
 * `en` is verbatim from originresidences.com/residences and the incumbent's
 * residence pages. `es` and `pt-br` are AI-authored and awaiting native review
 * — see TRANSLATION-REVIEW.md.
 *
 * Unit specifications — numbers, levels, interior/exterior/total areas — are
 * DATA and live in src/data/units.ts. Nothing here restates them; only the
 * labels wrapped around them are translated. Areas keep the en-US grouping
 * that `formatSqft` produces, so a broker reading a Spanish page and an
 * English page sees the same figure character for character.
 */

/* --- Inventory page ------------------------------------------------------ */

export interface ResidencesCopy {
  metaTitle: string;
  /** The residence count is data — passed in rather than transcribed. */
  metaDescription: (count: number) => string;
  title: string;
  bandAlt: string;
  discoverTitle: string;
  discoverParagraphs: string[];
  featuresTitle: string;
  featuresAlt: string;
  features: string[];
  /** Edge-to-edge bands. Artwork is matched in the page by `id`. */
  bands: {
    id: string;
    lines: string[];
    /** Alt text per carousel slide, in order. */
    alts: string[];
    flip?: boolean;
    align?: 'start' | 'end';
    emphasisFrom?: number;
  }[];
  /** The centred statement band between the two feature bands. */
  statementLines: string[];
  fullBleedAlt: string;
}

export const residencesCopy: Record<Locale, ResidencesCopy> = {
  en: {
    metaTitle: 'Residences | Developer Inventory — Origin Residences',
    metaDescription: (count) =>
      `Explore all ${count} residences at ORIGIN by Artefacto in Bay Harbor Islands — 2, 3 and 4 bedroom floor plans with interior and total areas, level by level.`,
    title: 'Residences',
    bandAlt:
      'An ORIGIN living room opening through floor-to-ceiling glass onto a private balcony, with the bay and the low rooflines of Bay Harbor Islands beyond.',
    discoverTitle: 'Discover your dream home',
    discoverParagraphs: [
      'The residencies of Origin by Artefacto are an example of how functionality and design can come together to create contemporary and sophisticated spaces.',
      'We invite you to explore this magnificent collection of 2, 3, and 4 bedroom residences with all the amenities and services for a memorable experience.',
    ],
    featuresTitle: 'Residences features',
    featuresAlt:
      'An ORIGIN bathroom lined in veined white marble, with a freestanding oval tub, a fluted glass screen and a double vanity in pale oak cabinetry beneath backlit mirrors.',
    features: [
      'Floor-to-ceiling, impact-resistant sliding glass doors and windows',
      'Energy-efficient air conditioning and heating system',
      'Expansive floor layouts with up to 9-foot grand ceiling heights',
      'PH residences feature 10-foot ceilings',
      'Fully-accessorized kitchens designed by Carla Guilhem',
      'Porcelain flooring throughout',
      'Panoramic private balconies on every residence',
      'Front load full-size washer and dryer',
      'FTTH (Fiber to the Home) for video and high-speed internet',
      'Modern bathrooms and European style cabinetry',
    ],
    bands: [
      {
        id: 'sliding-glass',
        lines: ['Floor-to-ceiling,', 'impact-resistant', 'sliding glass', 'doors and', 'windows'],
        alts: [
          'Living and dining room of an ORIGIN residence with floor-to-ceiling sliding glass open to a terrace above the bay.',
          'The great room seen through open sliding glass: dining table with green chairs under a cluster pendant, pale timber kitchen beyond and curved white seating on a round rug.',
          'Primary bedroom with an upholstered headboard wall, sliding doors open to a terrace, and the bay and palms beyond.',
        ],
        flip: true,
        emphasisFrom: 2,
      },
      {
        id: 'modern-bathrooms',
        lines: ['Modern', 'bathrooms', 'and European', 'style cabinetry'],
        alts: [
          'Primary bathroom in book-matched stone with a freestanding tub, twin lit mirrors and warm timber cabinetry.',
          'The same bathroom from the door: a glass shower enclosure, freestanding tub beyond, and a long stone vanity with two basins and timber drawers.',
        ],
        align: 'end',
      },
    ],
    statementLines: ['Panoramic private balconies', 'on every residence'],
    fullBleedAlt: 'A private balcony running the width of a residence, looking out over the bay.',
  },

  es: {
    metaTitle: 'Residencias | Inventario del desarrollador — Origin Residences',
    metaDescription: (count) =>
      `Explore las ${count} residencias de ORIGIN by Artefacto en Bay Harbor Islands: plantas de 2, 3 y 4 habitaciones con superficies interiores y totales, nivel por nivel.`,
    title: 'Residencias',
    bandAlt:
      'Un salón de ORIGIN que se abre, a través de ventanales de piso a techo, a un balcón privado, con la bahía y los tejados bajos de Bay Harbor Islands al fondo.',
    discoverTitle: 'Descubra el hogar de sus sueños',
    discoverParagraphs: [
      'Las residencias de Origin by Artefacto son un ejemplo de cómo la funcionalidad y el diseño pueden unirse para crear espacios contemporáneos y sofisticados.',
      'Lo invitamos a explorar esta magnífica colección de residencias de 2, 3 y 4 habitaciones, con todas las amenidades y servicios para una experiencia memorable.',
    ],
    featuresTitle: 'Características de las residencias',
    featuresAlt:
      'Un baño de ORIGIN revestido en mármol blanco veteado, con bañera ovalada exenta, mampara de vidrio estriado y doble lavabo en mobiliario de roble claro bajo espejos retroiluminados.',
    features: [
      'Puertas corredizas y ventanas de vidrio de piso a techo, resistentes a impactos',
      'Sistema de aire acondicionado y calefacción de bajo consumo',
      'Amplias plantas con alturas de techo de hasta 9 pies',
      'Las residencias PH cuentan con techos de 10 pies',
      'Cocinas totalmente equipadas, diseñadas por Carla Guilhem',
      'Pisos de porcelanato en toda la residencia',
      'Balcones privados panorámicos en todas las residencias',
      'Lavadora y secadora de carga frontal de tamaño completo',
      'FTTH (fibra óptica hasta el hogar) para video e internet de alta velocidad',
      'Baños modernos y mobiliario de estilo europeo',
    ],
    bands: [
      {
        id: 'sliding-glass',
        lines: ['Puertas y ventanas', 'corredizas', 'de vidrio', 'de piso a techo,', 'resistentes a impactos'],
        alts: [
          'Salón y comedor de una residencia ORIGIN con vidrios corredizos de piso a techo abiertos a una terraza sobre la bahía.',
          'El salón principal visto a través de los vidrios corredizos abiertos: mesa de comedor con sillas verdes bajo una lámpara de racimo, cocina en madera clara al fondo y asientos curvos blancos sobre una alfombra redonda.',
          'Dormitorio principal con pared de cabecero tapizado, puertas corredizas abiertas a una terraza y la bahía con palmeras al fondo.',
        ],
        flip: true,
        emphasisFrom: 2,
      },
      {
        id: 'modern-bathrooms',
        lines: ['Baños', 'modernos', 'y carpintería', 'de estilo europeo'],
        alts: [
          'Baño principal en piedra veteada con bañera exenta, espejos gemelos iluminados y carpintería de madera cálida.',
          'El mismo baño desde la puerta: cabina de ducha en vidrio, bañera exenta al fondo y un largo mueble de piedra con dos lavabos y cajones de madera.',
        ],
        align: 'end',
      },
    ],
    statementLines: ['Balcones privados panorámicos', 'en cada residencia'],
    fullBleedAlt: 'Un balcón privado que recorre el ancho de una residencia, con vistas a la bahía.',
  },

  'pt-br': {
    metaTitle: 'Residências | Inventário do incorporador — Origin Residences',
    metaDescription: (count) =>
      `Explore as ${count} residências do ORIGIN by Artefacto em Bay Harbor Islands: plantas de 2, 3 e 4 quartos com áreas internas e totais, nível por nível.`,
    title: 'Residências',
    bandAlt:
      'Uma sala de estar do ORIGIN que se abre, por vidros do piso ao teto, para uma varanda privativa, com a baía e os telhados baixos de Bay Harbor Islands ao fundo.',
    discoverTitle: 'Descubra a casa dos seus sonhos',
    discoverParagraphs: [
      'As residências do Origin by Artefacto são um exemplo de como funcionalidade e design podem se unir para criar espaços contemporâneos e sofisticados.',
      'Convidamos você a explorar esta magnífica coleção de residências de 2, 3 e 4 quartos, com todas as comodidades e serviços para uma experiência memorável.',
    ],
    featuresTitle: 'Características das residências',
    featuresAlt:
      'Um banheiro do ORIGIN revestido em mármore branco com veios, com banheira oval independente, divisória de vidro canelado e bancada dupla em marcenaria de carvalho claro sob espelhos com iluminação embutida.',
    features: [
      'Portas de correr e janelas de vidro do piso ao teto, resistentes a impacto',
      'Sistema de ar-condicionado e aquecimento de baixo consumo',
      'Plantas amplas com pé-direito de até 9 pés',
      'As residências PH contam com pé-direito de 10 pés',
      'Cozinhas totalmente equipadas, projetadas por Carla Guilhem',
      'Pisos em porcelanato em toda a residência',
      'Varandas privativas panorâmicas em todas as residências',
      'Lavadora e secadora de abertura frontal em tamanho integral',
      'FTTH (fibra óptica até a residência) para vídeo e internet de alta velocidade',
      'Banheiros modernos e marcenaria de estilo europeu',
    ],
    bands: [
      {
        id: 'sliding-glass',
        lines: ['Portas e janelas', 'de vidro', 'de correr', 'do piso ao teto,', 'resistentes a impacto'],
        alts: [
          'Sala de estar e jantar de uma residência ORIGIN com vidros de correr do piso ao teto abertos para um terraço sobre a baía.',
          'A sala principal vista pelos vidros de correr abertos: mesa de jantar com cadeiras verdes sob luminária em cacho, cozinha em madeira clara ao fundo e assentos curvos brancos sobre tapete redondo.',
          'Suíte principal com parede de cabeceira estofada, portas de correr abertas para o terraço e a baía com palmeiras ao fundo.',
        ],
        flip: true,
        emphasisFrom: 2,
      },
      {
        id: 'modern-bathrooms',
        lines: ['Banheiros', 'modernos', 'e marcenaria', 'de estilo europeu'],
        alts: [
          'Banheiro principal em pedra com veios, banheira solta, espelhos iluminados e marcenaria em madeira quente.',
          'O mesmo banheiro visto da porta: box de vidro, banheira solta ao fundo e uma bancada longa em pedra com duas cubas e gavetas de madeira.',
        ],
        align: 'end',
      },
    ],
    statementLines: ['Varandas privativas panorâmicas', 'em todas as residências'],
    fullBleedAlt: 'Uma varanda privativa que percorre a largura de uma residência, voltada para a baía.',
  },
};

/* --- Individual residence page ------------------------------------------- */

/** The bed/bath facts, taken off the unit record rather than restated here. */
export interface BedBathSpec {
  beds: number;
  hasDen: boolean;
  /** 2.5, 3.5, 4, 4.5 — a number, formatted per locale. */
  baths: number;
  /** The incumbent's own English string, e.g. "2 Bedrooms + Den / 3.5 Bath". */
  label: string;
}

export interface AreaFigures {
  interior: string;
  exterior: string;
  total: string;
}

export interface UnitCopy {
  /** "2 Bedrooms + Den / 3.5 Bath" in the reader's language. */
  bedBath: (spec: BedBathSpec) => string;
  metaDescription: (bedBath: string, area: AreaFigures) => string;
  /** "3 Bedroom Collection" — `beds` is data. */
  collection: (beds: number) => string;
  /** Joins residence numbers: "702, 704 and 706". */
  joinNumbers: (names: string[]) => string;
  keyplanAlt: (levelLabel: string, numbers: string, multiple: boolean) => string;
  /** Screen-reader caption on the area table. */
  areaTableCaption: (heading: string) => string;
  /** Column header for the imperial figures. A unit symbol, not prose. */
  sqftHeader: string;
  plateNavLabel: (collection: string) => string;
  pdfNewTab: string;
}

/** "4" stays "4"; "3.5" becomes "3,5" wherever the comma is the decimal mark. */
function comma(n: number): string {
  return String(n).replace('.', ',');
}

export const unitCopy: Record<Locale, UnitCopy> = {
  en: {
    /* English is the source of truth and the label ships on the unit record —
       reprint it rather than rebuild it. */
    bedBath: (spec) => spec.label,
    metaDescription: (bedBath, area) =>
      `${bedBath}. ${area.interior} sq. ft. interior, ${area.exterior} sq. ft. exterior, ${area.total} sq. ft. total — a waterfront residence at Origin Residences, Bay Harbor Islands.`,
    collection: (beds) => `${beds} Bedroom Collection`,
    joinNumbers: (names) =>
      names.length < 2
        ? (names[0] ?? '')
        : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`,
    keyplanAlt: (levelLabel, numbers, multiple) =>
      multiple
        ? `Keyplan of ${levelLabel} with residences ${numbers} filled in gold, the water to the left of the plan and a north arrow at the right.`
        : `Keyplan of ${levelLabel} with residence ${numbers} filled in gold, the water to the left of the plan and a north arrow at the right.`,
    areaTableCaption: (heading) => `Areas for ${heading}, in square feet and square metres`,
    sqftHeader: 'Sq. ft.',
    plateNavLabel: (collection) => `Other residences on the ${collection} keyplan`,
    pdfNewTab: '(PDF, opens in a new tab)',
  },

  es: {
    bedBath: (spec) =>
      `${spec.beds} Habitaciones${spec.hasDen ? ' + Estudio' : ''} / ${comma(spec.baths)} Baños`,
    metaDescription: (bedBath, area) =>
      `${bedBath}. ${area.interior} sq. ft. de interior, ${area.exterior} sq. ft. de exterior, ${area.total} sq. ft. en total — una residencia frente al mar en Origin Residences, Bay Harbor Islands.`,
    collection: (beds) => `Colección de ${beds} habitaciones`,
    joinNumbers: (names) =>
      names.length < 2
        ? (names[0] ?? '')
        : `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`,
    keyplanAlt: (levelLabel, numbers, multiple) =>
      multiple
        ? `Plano de ubicación del ${levelLabel} con las residencias ${numbers} destacadas en dorado, el agua a la izquierda del plano y una flecha de norte a la derecha.`
        : `Plano de ubicación del ${levelLabel} con la residencia ${numbers} destacada en dorado, el agua a la izquierda del plano y una flecha de norte a la derecha.`,
    areaTableCaption: (heading) =>
      `Superficies de ${heading}, en pies cuadrados y metros cuadrados`,
    sqftHeader: 'Sq. ft.',
    plateNavLabel: (collection) => `Otras residencias en el plano de la ${collection}`,
    pdfNewTab: '(PDF, se abre en una pestaña nueva)',
  },

  'pt-br': {
    bedBath: (spec) =>
      `${spec.beds} Quartos${spec.hasDen ? ' + Escritório' : ''} / ${comma(spec.baths)} Banheiros`,
    metaDescription: (bedBath, area) =>
      `${bedBath}. ${area.interior} sq. ft. de área interna, ${area.exterior} sq. ft. de área externa, ${area.total} sq. ft. no total — uma residência à beira-mar no Origin Residences, Bay Harbor Islands.`,
    collection: (beds) => `Coleção de ${beds} quartos`,
    joinNumbers: (names) =>
      names.length < 2
        ? (names[0] ?? '')
        : `${names.slice(0, -1).join(', ')} e ${names[names.length - 1]}`,
    keyplanAlt: (levelLabel, numbers, multiple) =>
      multiple
        ? `Planta de localização do ${levelLabel} com as residências ${numbers} preenchidas em dourado, a água à esquerda da planta e uma seta de norte à direita.`
        : `Planta de localização do ${levelLabel} com a residência ${numbers} preenchida em dourado, a água à esquerda da planta e uma seta de norte à direita.`,
    areaTableCaption: (heading) => `Áreas de ${heading}, em pés quadrados e metros quadrados`,
    sqftHeader: 'Sq. ft.',
    plateNavLabel: (collection) => `Outras residências na planta da ${collection}`,
    pdfNewTab: '(PDF, abre em uma nova aba)',
  },
};
