/**
 * MLS LISTING DATA for the released residences.
 * ============================================================================
 * The unit records in units.raw.json describe the ARCHITECTURE — bedrooms,
 * bathrooms, areas. They are scraped from the developer's own floor-plan
 * material and are true for every residence whether or not it is for sale.
 *
 * This file holds the SALES facts instead: asking price, MLS number, HOA dues,
 * taxes. Those exist only while a residence is actually listed, they change
 * without the architecture changing, and they are the numbers a buyer will
 * hold you to. They are therefore kept apart from the unit data and are
 * written down here by hand from the MLS sheet.
 *
 * ─── WHAT IS AND IS NOT FILLED IN ──────────────────────────────────────────
 * All three residences now carry an asking price. Unit 302 is COMPLETE,
 * transcribed from its live MLS listing (A11783461); 401 and 701 have their
 * price and nothing else, because no MLS sheet has been supplied for them.
 *
 * The remaining fields on those two stay `null` rather than being guessed. A
 * null renders as "Price Upon Request" in the headline slots and makes its row
 * disappear from the specification tables — no empty labels, no "N/A" — so the
 * pages read as finished rather than broken. Fill a field in and its row
 * appears on its own. Nothing else needs editing.
 *
 * ─── WHAT NOT TO PUT HERE ──────────────────────────────────────────────────
 * Anything true of the BUILDING rather than of one sale belongs in `BUILDING`
 * below, so it is written once. Anything about the architecture belongs in
 * units.raw.json.
 */
import { units, type Unit } from './units';
import { SITE_ADDRESS_LINES } from './contact';

/** Facts about the property itself — identical on every residence's sheet. */
export const BUILDING = {
  propertyType: 'Condominiums',
  subdivision: 'Origin Residences',
  yearBuilt: 2024,
  waterfront: true,
  waterfrontDescription: 'Canal Front',
  pool: true,
  /** The listing brokerage, as it appears on the MLS sheet. */
  brokerage: 'Cervera Real Estate Inc.',
  /** Street line for the listing address; the unit number is appended. */
  street: SITE_ADDRESS_LINES[0],
  cityStateZip: SITE_ADDRESS_LINES[1],
  amenities: [
    'Boat Dock',
    'Marina',
    'Cabana',
    'Clubhouse',
    'Community Kitchen',
    'Fitness Center',
    'Barbecue',
    'Picnic Area',
    'Pool',
  ],
  exteriorFeatures: ['Balcony', 'Security High Impact Doors'],
} as const;

/**
 * The sales facts for one residence.
 *
 * Every field is nullable on purpose. A missing number is a fact about what we
 * know, and the templates are built to render that honestly rather than to
 * demand a value.
 */
export interface ListingFacts {
  /** Asking price in whole dollars. Null renders "Price Upon Request". */
  price: number | null;
  mls: string | null;
  /** ISO date the residence was listed; drives days-on-market. */
  dateListed: string | null;
  /** Monthly HOA dues in dollars. */
  hoaFees: number | null;
  taxAmount: number | null;
  taxYear: number | null;
  parkingSpaces: number | null;
  parkingDescription: string | null;
  /** MLS "Aprox. Lot Size" — the residence's total footprint. */
  lotSize: number | null;
  furnished: string | null;
  shortSale: string | null;
  interiorFeatures: string[];
}

/** Keyed by residence number, matching `Unit.number`. */
export const LISTINGS: Record<string, ListingFacts> = {
  /* Transcribed from MLS A11783461. Verified against the live listing sheet:
     $4,223,000 over 2,187 interior sq. ft. is $1,931/sq. ft., which is the
     figure the sheet prints — so price and area agree and neither is a typo. */
  '302': {
    price: 4_223_000,
    mls: 'A11783461',
    dateListed: '2025-04-14',
    hoaFees: 3_951,
    taxAmount: 0,
    taxYear: 2024,
    parkingSpaces: 2,
    parkingDescription: 'Attached, Garage, Two Or More Spaces',
    lotSize: 2_603,
    furnished: 'No',
    shortSale: 'Regular Sale',
    interiorFeatures: [
      'Bedroom On Main Level',
      'Entrance Foyer',
      'Handicap Access',
      'Kitchen Island',
      'Living Dining Room',
      'Main Living Area Entry Level',
      'Air Filtration',
    ],
  },

  /* Price supplied by the owner. The remaining MLS fields are still awaited —
     they stay null and their rows stay hidden. */
  '401': {
    price: 4_161_500,
    mls: null,
    dateListed: null,
    hoaFees: null,
    taxAmount: null,
    taxYear: null,
    parkingSpaces: null,
    parkingDescription: null,
    lotSize: null,
    furnished: null,
    shortSale: null,
    interiorFeatures: [],
  },

  /* Price supplied by the owner; remaining MLS fields still awaited. */
  '701': {
    price: 4_622_750,
    mls: null,
    dateListed: null,
    hoaFees: null,
    taxAmount: null,
    taxYear: null,
    parkingSpaces: null,
    parkingDescription: null,
    lotSize: null,
    furnished: null,
    shortSale: null,
    interiorFeatures: [],
  },
};

/** A residence joined to its sales facts — what the listing surfaces consume. */
export interface Listing {
  unit: Unit;
  facts: ListingFacts;
  /** Full baths. "4.5 Bath" is four full and one half, not four-and-a-half. */
  bathsFull: number;
  /** 1 when the bath count carries a half, 0 otherwise. */
  bathsHalf: number;
  /** Price ÷ interior sq. ft., rounded. Null whenever the price is. */
  pricePerSqft: number | null;
  /** Whole days since listing, computed at build. Null when no date. */
  daysOnMarket: number | null;
  /** "9760 West Bay Harbor Dr #302" */
  addressLine: string;
}

function split(baths: number): { full: number; half: number } {
  return { full: Math.floor(baths), half: baths % 1 ? 1 : 0 };
}

function build(unit: Unit): Listing {
  const facts = LISTINGS[unit.number] ?? {
    price: null, mls: null, dateListed: null, hoaFees: null, taxAmount: null,
    taxYear: null, parkingSpaces: null, parkingDescription: null, lotSize: null,
    furnished: null, shortSale: null, interiorFeatures: [],
  };
  const { full, half } = split(unit.baths);

  /* Days on market is DERIVED, never transcribed. The MLS sheet prints a
     number that was true on the day it was read and is wrong the next
     morning; the listing date is the durable fact. */
  const daysOnMarket = facts.dateListed
    ? Math.max(0, Math.floor((Date.now() - Date.parse(facts.dateListed)) / 86_400_000))
    : null;

  return {
    unit,
    facts,
    bathsFull: full,
    bathsHalf: half,
    pricePerSqft:
      facts.price && unit.interiorSqft
        ? Math.round(facts.price / unit.interiorSqft)
        : null,
    daysOnMarket,
    addressLine: `${BUILDING.street} #${unit.number}`,
  };
}

/**
 * The residences on the market, in floor order.
 *
 * Derived from `units`, which is already filtered to released inventory — so a
 * residence cannot appear here by having sales data written for it, only by
 * being released in src/data/released.ts. That keeps one switch in charge.
 */
export const listings: Listing[] = units.map(build);

export function listingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.unit.slug === slug);
}

/** Sales facts for any residence, released or not — for the unit template. */
export function listingForUnit(unit: Unit): Listing {
  return build(unit);
}

/** "$4,223,000" */
export function formatPrice(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}
