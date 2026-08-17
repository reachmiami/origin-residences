/**
 * SALES CONTACT DETAILS — the single source for phone, email and address.
 * ============================================================================
 * These were previously copied into nine separate files, which meant a change
 * of number or address had to be made nine times and could silently miss one.
 * Everything imports from here now.
 *
 * The address is stored as LINES because it is displayed on two lines; `ADDRESS`
 * joins them for the single-line and map-link cases.
 */

/** User-confirmed. The incumbent site's (786) 850-8998 is superseded. */
export const PHONE = '(305) 458-1100';

/** Digits only, E.164, for the tel: link. */
export const PHONE_HREF = 'tel:+13054581100';

/**
 * The sales address shown to visitors. NOT the form's delivery destination —
 * lead routing is configured at the relay, see `src/scripts/leads.ts`.
 *
 * This was copied into five files (`SalesContact.astro` plus the three legal
 * pages and the virtual-tour page), which is the same drift this module was
 * created to stop.
 */
export const EMAIL = 'germanr.realty@gmail.com';

export const EMAIL_HREF = `mailto:${EMAIL}`;

export const ADDRESS_LINES = ['17651 Biscayne Blvd', 'Aventura, FL 33160'] as const;

export const ADDRESS = ADDRESS_LINES.join(', ');

export const MAP_HREF =
  `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`;

/**
 * THE BUILDING ITSELF — distinct from the sales gallery above.
 *
 * Sales are made from Aventura; the residences are in Bay Harbor Islands. Both
 * addresses are real and they are not interchangeable, which is why they are
 * named separately here. `neighborhood.astro` used to shadow the imported
 * MAP_HREF with a hard-coded copy of this address; it reads SITE_MAP_HREF now.
 */
export const SITE_ADDRESS_LINES = ['9760 West Bay Harbor Dr', 'Bay Harbor Islands, FL 33154'] as const;

export const SITE_ADDRESS = SITE_ADDRESS_LINES.join(', ');

export const SITE_MAP_HREF =
  `https://maps.google.com/?q=${encodeURIComponent(SITE_ADDRESS)}`;
