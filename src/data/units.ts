import raw from './units.raw.json';
import { RELEASED_UNIT_NUMBERS, TOTAL_RESIDENCES } from './released';

export interface Unit {
  /** Whether the developer has released this residence for public display. */
  isReleased: boolean;
  slug: string;
  /** "702" */
  number: string;
  /** 3–7 */
  level: number;
  /** Level 7 alone is a penthouse level — labelled "PH LEVEL 7" on the incumbent site. */
  isPenthouse: boolean;
  levelLabel: string;
  beds: number;
  hasDen: boolean;
  baths: number;
  /** "2 Bedrooms + Den / 3.5 Bath" — kept verbatim for display. */
  bedBathLabel: string;
  interiorSqft: number;
  interiorM2: number;
  exteriorSqft: number;
  exteriorM2: number;
  totalSqft: number;
  totalM2: number;
  images: string[];
  pdf: string | null;
}

interface RawUnit {
  slug: string;
  title: string | null;
  bedbath: string | null;
  interior: string | null;
  exterior: string | null;
  total: string | null;
  pdf: string | null;
  images: string[];
}

/** "1,582 sq. ft. / 147 m2" → { sqft: 1582, m2: 147 } */
function parseArea(value: string | null): { sqft: number; m2: number } {
  if (!value) return { sqft: 0, m2: 0 };
  const sqft = value.match(/([\d,]+)\s*sq/i);
  const m2 = value.match(/([\d,]+)\s*m2/i);
  const num = (m: RegExpMatchArray | null) =>
    m ? Number(m[1].replace(/,/g, '')) : 0;
  return { sqft: num(sqft), m2: num(m2) };
}

function parseUnit(r: RawUnit): Unit {
  /* The CMS prefixes some level 5 and 6 slugs with `ph-`, and titles unit 601
     "PH Level 6" — both artifacts. The incumbent prints "PH LEVEL 7" and
     nothing else, so a residence is a penthouse only when slug and title
     agree, which leaves exactly the five level 7 residences. */
  const isPenthouse =
    r.slug.startsWith('ph-') && /^\s*PH\b/i.test(r.title ?? '');
  const level = Number(r.slug.match(/level-(\d)/)?.[1] ?? 0);
  const number = r.slug.match(/unit-(\d+)/)?.[1] ?? '';

  const bedBathLabel = (r.bedbath ?? '').trim();
  const beds = Number(bedBathLabel.match(/^(\d+)\s*Bed/i)?.[1] ?? 0);
  const hasDen = /\+\s*Den/i.test(bedBathLabel);
  const baths = Number(bedBathLabel.match(/\/\s*([\d.]+)\s*Bath/i)?.[1] ?? 0);

  const interior = parseArea(r.interior);
  const exterior = parseArea(r.exterior);
  const total = parseArea(r.total);

  return {
    isReleased: RELEASED_UNIT_NUMBERS.includes(number),
    slug: r.slug,
    number,
    level,
    isPenthouse,
    levelLabel: isPenthouse ? `PH Level ${level}` : `Level ${level}`,
    beds,
    hasDen,
    baths,
    bedBathLabel,
    interiorSqft: interior.sqft,
    interiorM2: interior.m2,
    exteriorSqft: exterior.sqft,
    exteriorM2: exterior.m2,
    totalSqft: total.sqft,
    totalM2: total.m2,
    images: r.images ?? [],
    pdf: r.pdf ?? null,
  };
}

/**
 * Every residence in the building, released or not. Use this only where the
 * full set is genuinely needed — it includes unreleased inventory.
 */
export const allUnits: Unit[] = (raw as RawUnit[])
  .map(parseUnit)
  .sort((a, b) => a.level - b.level || a.number.localeCompare(b.number));

/**
 * The public collection: released residences only.
 *
 * This is deliberately the default export that every display surface consumes,
 * so the failure mode of a surface nobody audited is to hide a unit rather than
 * to leak one. Edit src/data/released.ts to change what appears here.
 */
export const units: Unit[] = allUnits.filter((u) => u.isReleased);

/** Levels in floor order, each with its residences — drives the nav panel. */
export const unitsByLevel: { level: number; label: string; units: Unit[] }[] =
  Object.values(
    units.reduce<Record<string, { level: number; label: string; units: Unit[] }>>(
      (acc, u) => {
        const key = `${u.level}-${u.isPenthouse}`;
        acc[key] ??= { level: u.level, label: u.levelLabel, units: [] };
        acc[key].units.push(u);
        return acc;
      },
      {},
    ),
  ).sort((a, b) => a.level - b.level || a.label.localeCompare(b.label));

/** Distinct bedroom counts, for the inventory filter. */
export const bedOptions: number[] = [...new Set(units.map((u) => u.beds))].sort();

/** How many residences are currently released — drives inventory counts. */
export const unitCount = units.length;

/**
 * How many residences the building contains. A fact about the property, not
 * about availability: the marketing copy says "27 waterfront residences" and
 * that stays true however few are released at any moment.
 */
export const totalResidences = TOTAL_RESIDENCES;

/** Released residences only — safe for anything that renders a link. */
export function unitBySlug(slug: string): Unit | undefined {
  return units.find((u) => u.slug === slug);
}

/** Resolves against the full set, including unreleased. Use with care. */
export function anyUnitBySlug(slug: string): Unit | undefined {
  return allUnits.find((u) => u.slug === slug);
}

/** Previous/next in floor order, wrapping — for unit-page pagination. */
export function unitNeighbours(slug: string): { prev: Unit; next: Unit } | null {
  const i = units.findIndex((u) => u.slug === slug);
  if (i === -1) return null;
  return {
    prev: units[(i - 1 + units.length) % units.length],
    next: units[(i + 1) % units.length],
  };
}

export function formatSqft(n: number): string {
  return n.toLocaleString('en-US');
}
