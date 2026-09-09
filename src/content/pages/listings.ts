/**
 * COPY for the inventory grid and the listing pages.
 *
 * The listing page borrows the shape of an MLS sheet, which means a great many
 * short field labels. They are all translated: a Spanish or Portuguese reader
 * gets "Cuota HOA", not "HOA Fees", and the pages are indexed in three
 * languages, so leaving these in English would be visible to every visitor and
 * to search engines both.
 *
 * VALUES are a different matter and are NOT translated. "Canal Front",
 * "Regular Sale" and "Attached, Garage, Two Or More Spaces" are MLS
 * controlled-vocabulary terms transcribed from the listing sheet — they are
 * the record, and a translated one no longer matches what the buyer's agent
 * sees. Only the labels in front of them move between languages.
 */
import type { Locale } from '../../i18n/ui';

export interface ListingsCopy {
  /** Inventory grid on the Residences page. */
  gridTitle: string;
  gridLede: (count: number) => string;
  /** Card: "3 bds", "5 ba", "2,187 sqft" — abbreviated, as on a listing card. */
  cardBeds: string;
  cardBaths: string;
  cardSqft: string;

  priceOnRequest: string;
  /* NO "Est. Payment". The reference sheet prints a monthly figure, but a
     mortgage estimate is a function of rate, term and down payment — none of
     which we have been given. Printing one would mean inventing the
     assumptions and stating the result as fact on a page selling a $4m
     property. Supply the assumptions and it can be added. */

  /** Headline stat strip. */
  statBed: string;
  statBath: string;
  statHalfBath: string;
  statSize: string;
  statPerSqft: string;

  /** Section headings. */
  basicInformation: string;
  amenities: string;
  exteriorFeatures: string;
  interiorFeatures: string;
  propertyFeatures: string;
  floorPlan: string;

  /** Field labels. */
  mls: string;
  type: string;
  subdivision: string;
  yearBuilt: string;
  totalSqft: string;
  dateListed: string;
  daysOnMarket: string;
  waterfront: string;
  wfDescription: string;
  parkingSpaces: string;
  parkingDescription: string;
  pool: string;
  exteriorFeaturesField: string;
  adjustedSqft: string;
  interiorFeaturesField: string;
  /**
   * The unit "sq. ft." as it follows a number — NOT the field label `sqft`.
   *
   * These were the same string at first, which read correctly in English
   * ("2,187 Sqft") and turned into nonsense in the other two, where the field
   * label is a word for area: "2.135 Superficie", "2.135 Área". A label and a
   * unit are different pieces of language and are kept apart.
   *
   * Untranslated on purpose: American square feet are written "sq. ft." on
   * Spanish- and Portuguese-language listings for US property, and the rest of
   * this site already prints them that way.
   */
  sqftUnit: string;
  lotSize: string;
  furnished: string;
  shortSale: string;
  hoaFees: string;
  taxAmount: string;
  taxYear: string;

  yes: string;
  no: string;

  /** Carousel. */
  galleryLabel: (residence: string) => string;
  previousImage: string;
  nextImage: string;
  /**
   * "1 of 6" as a TEMPLATE, not a function.
   *
   * The carousel rewrites this counter in the browser, where the copy
   * functions are not reachable — the script only has the DOM. Shipping the
   * pattern as a string lets the client fill it in the reader's language
   * instead of falling back to an English "1 / 6" the moment anyone presses
   * an arrow. `fillCounter` below is the one place it is substituted.
   */
  imageCounterTemplate: string;

  /** Floor plan block. */
  floorPlanAlt: (residence: string) => string;
  downloadFloorPlan: string;

  /** The building description that heads every sheet. */
  description: string;

  metaTitle: (residence: string, bedBath: string) => string;
  metaDescription: (residence: string, bedBath: string, sqft: string) => string;
}

/* Written once in each language rather than assembled from fragments — the
   paragraph is marketing prose and reads badly when stitched together. */
const DESCRIPTION_EN =
  'Origin Residences by Artefacto is a luxurious new development located in Bay Harbor Islands, Miami. The project consists of 27 exclusive residences, each designed with exquisite attention to detail and crafted with the finest materials. The interiors are designed by Artefacto, a renowned Brazilian luxury furniture brand known for its sophisticated and contemporary style. The building offers a range of amenities designed to enhance the residents’ lifestyle. There is a rooftop pool and deck, a fitness center, a private marina with 10 boat slips, providing easy access to the bay, and more. Bay Harbor Islands is a sought-after location known for its upscale living, excellent schools, and proximity to some of the best shopping, dining, and entertainment in Miami.';

const DESCRIPTION_ES =
  'Origin Residences by Artefacto es un nuevo desarrollo de lujo situado en Bay Harbor Islands, Miami. El proyecto consta de 27 residencias exclusivas, cada una diseñada con una atención al detalle exquisita y ejecutada con los mejores materiales. Los interiores llevan la firma de Artefacto, la reconocida marca brasileña de mobiliario de lujo, conocida por su estilo sofisticado y contemporáneo. El edificio ofrece una gama de amenidades pensadas para enriquecer la vida de sus residentes: piscina y terraza en la azotea, gimnasio y una marina privada con 10 amarres que da acceso directo a la bahía, entre otras. Bay Harbor Islands es una ubicación muy codiciada, conocida por su calidad de vida, sus excelentes escuelas y su cercanía a las mejores tiendas, restaurantes y entretenimiento de Miami.';

const DESCRIPTION_PT =
  'O Origin Residences by Artefacto é um novo empreendimento de luxo em Bay Harbor Islands, Miami. O projeto reúne 27 residências exclusivas, cada uma desenhada com apurada atenção aos detalhes e executada com os melhores materiais. Os interiores são assinados pela Artefacto, renomada marca brasileira de mobiliário de luxo, conhecida pelo estilo sofisticado e contemporâneo. O edifício oferece uma série de comodidades pensadas para a vida dos moradores: piscina e deck na cobertura, academia e uma marina privativa com 10 vagas para barcos, com acesso direto à baía, entre outras. Bay Harbor Islands é uma localização muito procurada, conhecida pelo alto padrão de vida, pelas excelentes escolas e pela proximidade das melhores lojas, restaurantes e opções de lazer de Miami.';

export const listingsCopy: Record<Locale, ListingsCopy> = {
  en: {
    gridTitle: 'Developer Inventory',
    gridLede: (count) =>
      count === 1
        ? 'One residence is currently available directly from the developer.'
        : `${count} residences are currently available directly from the developer.`,
    cardBeds: 'bds',
    cardBaths: 'ba',
    cardSqft: 'sqft',

    priceOnRequest: 'Price Upon Request',

    statBed: 'Bed',
    statBath: 'Bath',
    statHalfBath: 'Half Bath',
    statSize: 'Size Sq.Ft.',
    statPerSqft: '$/Sqft',

    basicInformation: 'Basic Information',
    amenities: 'Amenities',
    exteriorFeatures: 'Exterior Features',
    interiorFeatures: 'Interior Features',
    propertyFeatures: 'Property Features',
    floorPlan: 'Floor Plan',

    mls: 'MLS #',
    type: 'Type',
    subdivision: 'Subdivision',
    yearBuilt: 'Year Built',
    totalSqft: 'Total Sqft',
    dateListed: 'Date Listed',
    daysOnMarket: 'Days on Market',
    waterfront: 'Waterfront',
    wfDescription: 'WF Description',
    parkingSpaces: 'Parking Spaces',
    parkingDescription: 'Parking Description',
    pool: 'Pool',
    exteriorFeaturesField: 'Exterior Features',
    adjustedSqft: 'Adjusted Sqft',
    interiorFeaturesField: 'Interior Features',
    sqftUnit: 'sq. ft.',
    lotSize: 'Aprox. Lot Size',
    furnished: 'Furnished Info',
    shortSale: 'Short Sale',
    hoaFees: 'HOA Fees',
    taxAmount: 'Tax Amount',
    taxYear: 'Tax Year',

    yes: 'Yes',
    no: 'No',

    galleryLabel: (r) => `Photographs of residence ${r}`,
    previousImage: 'Previous image',
    nextImage: 'Next image',
    imageCounterTemplate: '{current} of {total}',

    floorPlanAlt: (r) =>
      `Floor plan for residence ${r}, showing room layout, dimensions and the balcony, with a keyplan marking the residence within the floor.`,
    downloadFloorPlan: 'Download floor plan',

    description: DESCRIPTION_EN,

    metaTitle: (r, bedBath) => `Residence ${r} — ${bedBath} | Origin Residences`,
    metaDescription: (r, bedBath, sqft) =>
      `Residence ${r} at Origin Residences, Bay Harbor Islands. ${bedBath}, ${sqft} sq. ft. interior. Artefacto interiors, private marina and rooftop pool.`,
  },

  es: {
    gridTitle: 'Inventario del desarrollador',
    gridLede: (count) =>
      count === 1
        ? 'Hay una residencia disponible directamente con el desarrollador.'
        : `Hay ${count} residencias disponibles directamente con el desarrollador.`,
    cardBeds: 'hab.',
    cardBaths: 'baños',
    cardSqft: 'sq. ft.',

    priceOnRequest: 'Precio a consultar',

    statBed: 'Habitaciones',
    statBath: 'Baños',
    statHalfBath: 'Aseo',
    statSize: 'Superficie sq. ft.',
    statPerSqft: '$/sq. ft.',

    basicInformation: 'Información básica',
    amenities: 'Amenidades',
    exteriorFeatures: 'Características exteriores',
    interiorFeatures: 'Características interiores',
    propertyFeatures: 'Características de la propiedad',
    floorPlan: 'Plano',

    mls: 'MLS n.º',
    type: 'Tipo',
    subdivision: 'Complejo',
    yearBuilt: 'Año de construcción',
    totalSqft: 'Superficie total',
    dateListed: 'Fecha de publicación',
    daysOnMarket: 'Días en el mercado',
    waterfront: 'Frente al agua',
    wfDescription: 'Descripción del frente',
    parkingSpaces: 'Plazas de garaje',
    parkingDescription: 'Descripción del garaje',
    pool: 'Piscina',
    exteriorFeaturesField: 'Características exteriores',
    adjustedSqft: 'Superficie ajustada',
    interiorFeaturesField: 'Características interiores',
    sqftUnit: 'sq. ft.',
    lotSize: 'Superficie aprox. del lote',
    furnished: 'Amueblado',
    shortSale: 'Venta corta',
    hoaFees: 'Cuota HOA',
    taxAmount: 'Importe de impuestos',
    taxYear: 'Año fiscal',

    yes: 'Sí',
    no: 'No',

    galleryLabel: (r) => `Fotografías de la residencia ${r}`,
    previousImage: 'Imagen anterior',
    nextImage: 'Imagen siguiente',
    imageCounterTemplate: '{current} de {total}',

    floorPlanAlt: (r) =>
      `Plano de la residencia ${r}, con la distribución de las estancias, las dimensiones y la terraza, junto a un plano de ubicación que señala la residencia dentro de la planta.`,
    downloadFloorPlan: 'Descargar el plano',

    description: DESCRIPTION_ES,

    metaTitle: (r, bedBath) => `Residencia ${r} — ${bedBath} | Origin Residences`,
    metaDescription: (r, bedBath, sqft) =>
      `Residencia ${r} en Origin Residences, Bay Harbor Islands. ${bedBath}, ${sqft} sq. ft. de interior. Interiores de Artefacto, marina privada y piscina en la azotea.`,
  },

  'pt-br': {
    gridTitle: 'Inventário do incorporador',
    gridLede: (count) =>
      count === 1
        ? 'Há uma residência disponível diretamente com o incorporador.'
        : `Há ${count} residências disponíveis diretamente com o incorporador.`,
    cardBeds: 'quartos',
    cardBaths: 'banh.',
    cardSqft: 'sq. ft.',

    priceOnRequest: 'Preço sob consulta',

    statBed: 'Quartos',
    statBath: 'Banheiros',
    statHalfBath: 'Lavabo',
    statSize: 'Área sq. ft.',
    statPerSqft: '$/sq. ft.',

    basicInformation: 'Informações básicas',
    amenities: 'Comodidades',
    exteriorFeatures: 'Características externas',
    interiorFeatures: 'Características internas',
    propertyFeatures: 'Características do imóvel',
    floorPlan: 'Planta',

    mls: 'MLS n.º',
    type: 'Tipo',
    subdivision: 'Condomínio',
    yearBuilt: 'Ano de construção',
    totalSqft: 'Área total',
    dateListed: 'Data do anúncio',
    daysOnMarket: 'Dias no mercado',
    waterfront: 'Frente para a água',
    wfDescription: 'Descrição da frente',
    parkingSpaces: 'Vagas de garagem',
    parkingDescription: 'Descrição da garagem',
    pool: 'Piscina',
    exteriorFeaturesField: 'Características externas',
    adjustedSqft: 'Área ajustada',
    interiorFeaturesField: 'Características internas',
    sqftUnit: 'sq. ft.',
    lotSize: 'Área aprox. do lote',
    furnished: 'Mobiliado',
    shortSale: 'Venda rápida',
    hoaFees: 'Taxa de condomínio',
    taxAmount: 'Valor do IPTU',
    taxYear: 'Ano fiscal',

    yes: 'Sim',
    no: 'Não',

    galleryLabel: (r) => `Fotografias da residência ${r}`,
    previousImage: 'Imagem anterior',
    nextImage: 'Próxima imagem',
    imageCounterTemplate: '{current} de {total}',

    floorPlanAlt: (r) =>
      `Planta da residência ${r}, com a distribuição dos ambientes, as dimensões e a varanda, ao lado de um diagrama que assinala a residência dentro do pavimento.`,
    downloadFloorPlan: 'Baixar a planta',

    description: DESCRIPTION_PT,

    metaTitle: (r, bedBath) => `Residência ${r} — ${bedBath} | Origin Residences`,
    metaDescription: (r, bedBath, sqft) =>
      `Residência ${r} no Origin Residences, Bay Harbor Islands. ${bedBath}, ${sqft} sq. ft. de área interna. Interiores Artefacto, marina privativa e piscina na cobertura.`,
  },
};

/** Fill the counter template. Used on the server and, verbatim, in the browser. */
export function fillCounter(template: string, current: number, total: number): string {
  return template
    .replace('{current}', String(current))
    .replace('{total}', String(total));
}
