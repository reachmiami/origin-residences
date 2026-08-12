import type { Locale } from '../../i18n/ui';

/**
 * Legal pages copy — privacy policy, terms of use, accessibility statement.
 *
 * DELIBERATE POLICY: the legal BODY TEXT is published in English for every
 * locale. A translated notice may not carry the same force as the one the
 * Company published, and deciding whether it does is counsel's call, not ours.
 * So this module is split in two:
 *
 *   `legalCopy`  — locale-keyed chrome only: page titles, meta, eyebrow, the
 *                  English-text notice, and the cross-reference sentence.
 *                  `es` and `pt-br` are AI-authored and awaiting native review
 *                  — see TRANSLATION-REVIEW.md.
 *
 *   `legalBody`  — the legal prose itself, English, NOT keyed by locale. It is
 *                  a single object on purpose: one copy means the three
 *                  locales cannot silently drift apart, and no future edit can
 *                  half-translate a clause. If counsel ever approves translated
 *                  notices, this becomes a Record<Locale, LegalBody> and the
 *                  notice below is dropped.
 *
 * Contact details (phone, email, address) and the consent paragraph are not
 * repeated here: they live with the page and with src/content/copy.ts
 * respectively, and are never translated.
 */

/** A sentence that wraps two links, e.g. "See also our X and our Y statement." */
export interface SeeAlso {
  lead: string;
  join: string;
  tail: string;
}

export interface LegalPageChrome {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  seeAlso: SeeAlso;
}

export interface LegalChrome {
  /** Shown above the legal prose on non-English pages. `null` on English. */
  englishNote: string | null;
  privacy: LegalPageChrome;
  terms: LegalPageChrome;
  accessibility: LegalPageChrome;
}

export const legalCopy: Record<Locale, LegalChrome> = {
  en: {
    englishNote: null,
    privacy: {
      metaTitle: 'Privacy Policy | Origin Residences',
      metaDescription:
        'What Origin Residences collects through this website, how it is used, and how to reach us about it.',
      eyebrow: 'Legal',
      title: 'Privacy Policy',
      // links: terms, accessibility
      seeAlso: { lead: 'See also our ', join: ' and our ', tail: ' statement.' },
    },
    terms: {
      metaTitle: 'Terms of Use | Origin Residences',
      metaDescription:
        'The terms pursuant to which Bay Harbour Investment, Inc provides the Origin Residences website.',
      eyebrow: 'Legal',
      title: 'Terms of Use',
      // links: privacy, accessibility
      seeAlso: { lead: 'See also our ', join: ' and our ', tail: ' statement.' },
    },
    accessibility: {
      metaTitle: 'Accessibility | Origin Residences',
      metaDescription:
        'Origin Residences builds this website to WCAG 2.1 level AA, and wants to hear about any barrier you meet.',
      eyebrow: 'Legal',
      title: 'Accessibility',
      // links: privacy, terms
      seeAlso: { lead: 'See also our ', join: ' and our ', tail: '.' },
    },
  },

  es: {
    englishNote:
      'Nota: el texto legal que figura a continuación se publica únicamente en inglés. Si desea que se lo expliquemos en español, escríbanos o llámenos y con gusto lo haremos.',
    privacy: {
      metaTitle: 'Política de privacidad | Origin Residences',
      metaDescription:
        'Qué datos recopila Origin Residences a través de este sitio web, cómo se utilizan y cómo comunicarse con nosotros al respecto. El texto legal se publica en inglés.',
      eyebrow: 'Aviso legal',
      title: 'Política de privacidad',
      seeAlso: {
        lead: 'Consulte también nuestros ',
        join: ' y nuestra declaración de ',
        tail: '.',
      },
    },
    terms: {
      metaTitle: 'Términos de uso | Origin Residences',
      metaDescription:
        'Los términos conforme a los cuales Bay Harbour Investment, Inc ofrece el sitio web de Origin Residences. El texto legal se publica en inglés.',
      eyebrow: 'Aviso legal',
      title: 'Términos de uso',
      seeAlso: {
        lead: 'Consulte también nuestra ',
        join: ' y nuestra declaración de ',
        tail: '.',
      },
    },
    accessibility: {
      metaTitle: 'Accesibilidad | Origin Residences',
      metaDescription:
        'Origin Residences desarrolla este sitio web conforme a las WCAG 2.1 nivel AA y desea conocer cualquier barrera que usted encuentre. El texto se publica en inglés.',
      eyebrow: 'Aviso legal',
      title: 'Accesibilidad',
      seeAlso: {
        lead: 'Consulte también nuestra ',
        join: ' y nuestros ',
        tail: '.',
      },
    },
  },

  'pt-br': {
    englishNote:
      'Observação: o texto legal a seguir é publicado somente em inglês. Se preferir que o expliquemos em português, escreva ou ligue para nós — teremos prazer em fazê-lo.',
    privacy: {
      metaTitle: 'Política de privacidade | Origin Residences',
      metaDescription:
        'Quais dados a Origin Residences coleta neste site, como são utilizados e como falar conosco a respeito. O texto legal é publicado em inglês.',
      eyebrow: 'Informações legais',
      title: 'Política de privacidade',
      seeAlso: {
        lead: 'Consulte também nossos ',
        join: ' e nossa declaração de ',
        tail: '.',
      },
    },
    terms: {
      metaTitle: 'Termos de uso | Origin Residences',
      metaDescription:
        'Os termos segundo os quais a Bay Harbour Investment, Inc disponibiliza o site da Origin Residences. O texto legal é publicado em inglês.',
      eyebrow: 'Informações legais',
      title: 'Termos de uso',
      seeAlso: {
        lead: 'Consulte também nossa ',
        join: ' e nossa declaração de ',
        tail: '.',
      },
    },
    accessibility: {
      metaTitle: 'Acessibilidade | Origin Residences',
      metaDescription:
        'A Origin Residences desenvolve este site conforme as WCAG 2.1 nível AA e quer saber de qualquer barreira que você encontrar. O texto é publicado em inglês.',
      eyebrow: 'Informações legais',
      title: 'Acessibilidade',
      seeAlso: {
        lead: 'Consulte também nossa ',
        join: ' e nossos ',
        tail: '.',
      },
    },
  },
};

/**
 * The legal prose. English on every locale — see the policy note above.
 * Fragments named `before…`/`between…`/`after…` sit either side of a link or a
 * contact detail rendered by the page.
 */
export const legalBody = {
  privacy: {
    lede: 'This policy describes what we collect through www.originresidences.com, what we do with it, and how to reach us about it. It covers this Site only.',

    collectTitle: 'What the forms collect',
    collectIntro:
      'There are no accounts and no login on this Site. The only information we hold is what you type into one of our forms and send to us:',
    /* The complete set of fields the forms on this Site ask for — nothing else
       is collected, because nothing else is asked. */
    collected: [
      'Type — Buyer, or Real Estate Agent/Broker',
      'Company',
      'First name and last name, or full name on the presentation booking form',
      'Email',
      'Phone, with city code',
      'Address, city, state, zip and country',
      'Comments',
      'How did you hear about us',
      'Presentation method, date and time — on the presentation booking form only',
    ],
    collectNote:
      'Fields marked with an asterisk are required; the rest are optional. Each submission also carries the page you sent it from, the language you were reading in, and whether you gave the contact permission below.',

    useTitle: 'How it is used',
    useBody:
      'Submissions go to the Origin Residences sales team, who use them to answer your question and to arrange a private presentation of the residences, in the sales gallery or virtually. We keep them in the sales team’s customer relationship system so that the person who calls you back has the details you gave us.',

    consentTitle: 'Contact permission',

    marketingTitle: 'Marketing email',
    marketingBody:
      'By submitting a form, you are consenting to receive marketing emails. You can revoke your consent to receive emails at any time by using the Safe Unsubscribe® link, found at the bottom of every email.',

    cookiesTitle: 'Cookies and tracking',
    cookiesBody:
      'This Site sets no cookies and runs no analytics or advertising trackers. Nothing about your visit is stored on your device.',

    contactTitle: 'Questions, corrections and removal',
    contactBeforeEmail:
      'To ask what we hold, to correct it, or to be removed from our lists, write to ',
    contactBetweenEmailPhone: ', call ',
    contactBetweenPhoneAddress: ', or visit the sales gallery at ',
    contactAfterAddress: '.',
  },

  terms: {
    lede: 'YOUR USE OF THIS WEBSITE (the “Site”) CONSTITUTES ACCEPTANCE OF THE TERMS AND CONDITIONS PROVIDED BELOW (the “Terms”).',

    scopeTitle: 'Scope of these terms',
    scopeBeforeUrl:
      'These Website Terms of Use (“Terms of Use”) describe the terms pursuant to which Bay Harbour Investment, Inc and/or an affiliated entity (referred to in these Terms of Use as the “Company,” “we,” “us” and “our”) provides the website located at www.originresidences.com (the “Site”). We prepared these Terms of Use to help explain the terms that apply to your use of the Site. We may modify the Terms of Use as well as discontinue, withdraw, replace or change any content or services offered via the Site at any time and your continued access and use of the Site thereafter constitutes your acceptance of such changes. You may view the most up-to-date version of the Terms at any time at ',
    scopeUrl: 'https://www.originresidences.com',
    scopeAfterUrl: '.',

    acceptanceTitle: 'Acceptance',
    acceptanceBody:
      'By using this Site, you agree to these Terms of Use. If you do not agree to these Terms of Use, please do not use this Site.',

    contactTitle: 'Questions about these terms',
    contactBeforeEmail: 'Write to ',
    contactBetweenEmailPhone: ', call ',
    contactBetweenPhoneAddress: ', or visit the sales gallery at ',
    contactAfterAddress: '.',
  },

  accessibility: {
    lede: 'Origin Residences intends this website to be usable by everyone, whatever the device, browser or assistive technology in use.',

    standardTitle: 'The standard we build to',
    standardBody:
      'This site is built to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA. That standard is the measure we hold the site to as it changes.',

    measuresTitle: 'What that means on these pages',
    measures: [
      'Every page is operable by keyboard alone, and the element in focus is always visibly marked.',
      'Headings run in sequence, so a screen reader can move through a page by structure.',
      'Every form control carries a real, visible label. Errors are given in words, never by colour alone.',
      'Images that carry meaning have text alternatives; decorative images are hidden from assistive technology.',
      'Text is set on backgrounds that meet the contrast ratios required at level AA.',
      'Nothing here depends on a pop-up dialog — information reveals in place or on its own page.',
      'Smooth scrolling and scroll reveals switch off automatically when your system asks for reduced motion.',
      'Layouts reflow to a single column on small screens, and text can be enlarged without losing content.',
    ],

    ongoingTitle: 'Ongoing work',
    ongoingBody:
      'Accessibility is a standing requirement here, not a one-off audit: pages are re-checked as they change, and new material is held to the same standard before it goes up. Where we fall short, we want to hear about it.',

    feedbackTitle: 'Tell us about a barrier',
    feedbackBody:
      'If any part of this site keeps you from the information you need, tell us the page and what happened. We will get you that information another way and put the page right.',
    contactBeforeEmail: 'Email ',
    contactBetweenEmailPhone: ', call ',
    contactBetweenPhoneAddress: ', or write to us at ',
    contactAfterAddress:
      '. A private presentation of the residences can be held virtually or in the sales gallery, whichever suits you better — ',
    contactAfterSchedule: '.',
  },
} as const;
