import type { Locale } from '../../i18n/ui';

/**
 * Floor plans page copy.
 *
 * `en` is verbatim from originresidences.com. `es` and `pt-br` are AI-authored
 * and awaiting native review — see TRANSLATION-REVIEW.md.
 *
 * The key plan drawings are locale-independent and stay in the page component,
 * matched to their collection by `bedrooms-level`.
 *
 * Several strings are templates. `{beds}` `{count}` `{baths}` `{n}` `{label}`
 * `{list}` and `{den}` are filled by the page — keep the braces intact when
 * translating, and let the surrounding grammar move around them freely.
 */
export interface FloorPlansCopy {
  metaTitle: string;
  metaDescription: string;
  title: string;
  familiesTitle: string;
  /** Appended to a bedroom count when the plan carries a den. */
  den: string;
  /** Plan family card heading, e.g. "2 Bedroom + Den". */
  familyTitle: string;
  /** Section heading for a bedroom collection. */
  collectionTitle: string;
  /** Residence card sub-line, e.g. "2 Bedrooms + Den / 3.5 Bath". */
  bedBath: string;
  residenceOne: string;
  residenceMany: string;
  /** Bath word used after the family's bath-count range. */
  bathWord: string;
  levelLabel: string;
  penthouseLabel: string;
  /** Conjunction joining the last two residence numbers in alt text. */
  listAnd: string;
  planAltOne: string;
  planAltMany: string;
}

export const floorPlansCopy: Record<Locale, FloorPlansCopy> = {
  en: {
    metaTitle: 'Floor Plans | Origin Residences',
    metaDescription:
      'Key plans for all 27 residences at ORIGIN by Artefacto — the 3 and 4 bedroom collections across levels 3 to 7 in Bay Harbor Islands, Florida.',
    title: 'Floor Plans',
    familiesTitle: 'Plan families',
    den: ' + Den',
    familyTitle: '{beds} Bedroom{den}',
    collectionTitle: '{beds} Bedroom Collection',
    bedBath: '{beds} Bedrooms{den} / {baths} Bath',
    residenceOne: 'residence',
    residenceMany: 'residences',
    bathWord: 'bath',
    levelLabel: 'Level {n}',
    penthouseLabel: 'PH Level {n}',
    listAnd: 'and',
    planAltOne:
      'Key plan of {label} with residence {list} shaded in gold. Water runs along the west edge of the floor plate; north is up.',
    planAltMany:
      'Key plan of {label} with residences {list} shaded in gold. Water runs along the west edge of the floor plate; north is up.',
  },

  es: {
    metaTitle: 'Planos | Origin Residences',
    metaDescription:
      'Planos clave de las 27 residencias de ORIGIN by Artefacto: las colecciones de 3 y 4 habitaciones, de los niveles 3 al 7, en Bay Harbor Islands, Florida.',
    title: 'Planos',
    familiesTitle: 'Familias de planos',
    den: ' + estudio',
    familyTitle: '{beds} habitaciones{den}',
    collectionTitle: 'Colección de {beds} habitaciones',
    bedBath: '{beds} habitaciones{den} / {baths} baños',
    residenceOne: 'residencia',
    residenceMany: 'residencias',
    bathWord: 'baños',
    levelLabel: 'Nivel {n}',
    penthouseLabel: 'PH Nivel {n}',
    listAnd: 'y',
    planAltOne:
      'Plano clave del {label} con la residencia {list} sombreada en dorado. El agua discurre a lo largo del borde oeste de la planta; el norte está arriba.',
    planAltMany:
      'Plano clave del {label} con las residencias {list} sombreadas en dorado. El agua discurre a lo largo del borde oeste de la planta; el norte está arriba.',
  },

  'pt-br': {
    metaTitle: 'Plantas | Origin Residences',
    metaDescription:
      'Plantas-chave das 27 residências do ORIGIN by Artefacto: as coleções de 3 e 4 quartos, dos níveis 3 ao 7, em Bay Harbor Islands, Flórida.',
    title: 'Plantas',
    familiesTitle: 'Famílias de plantas',
    den: ' + escritório',
    familyTitle: '{beds} quartos{den}',
    collectionTitle: 'Coleção de {beds} quartos',
    bedBath: '{beds} quartos{den} / {baths} banheiros',
    residenceOne: 'residência',
    residenceMany: 'residências',
    bathWord: 'banheiros',
    levelLabel: 'Nível {n}',
    penthouseLabel: 'PH Nível {n}',
    listAnd: 'e',
    planAltOne:
      'Planta-chave do {label} com a residência {list} destacada em dourado. A água corre ao longo da borda oeste do pavimento; o norte está para cima.',
    planAltMany:
      'Planta-chave do {label} com as residências {list} destacadas em dourado. A água corre ao longo da borda oeste do pavimento; o norte está para cima.',
  },
};
