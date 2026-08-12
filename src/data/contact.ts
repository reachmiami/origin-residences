/**
 * SALES CONTACT DETAILS — the single source for phone and address.
 * ============================================================================
 * These were previously copied into nine separate files, which meant a change
 * of number or address had to be made nine times and could silently miss one.
 * Everything imports from here now.
 *
 * The address is stored as LINES because it is displayed on two lines; `ADDRESS`
 * joins them for the single-line and map-link cases.
 */

export const PHONE = '(305) 458-1100';

/** Digits only, E.164, for the tel: link. */
export const PHONE_HREF = 'tel:+13054581100';

export const ADDRESS_LINES = ['17651 Biscayne Blvd', 'Aventura, FL 33160'] as const;

export const ADDRESS = ADDRESS_LINES.join(', ');

export const MAP_HREF =
  `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`;
