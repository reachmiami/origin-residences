# Translation review — required before launch

The Spanish and Brazilian Portuguese copy on this site is **AI-authored**. It is
complete and idiomatic, not placeholder text, and it is safe to review rather
than rewrite. But it has **not** been read by a native speaker, and this is
luxury real-estate marketing aimed at buyers who will judge the brand partly on
how the language reads.

**Do not launch `es` or `pt-br` without a native review.**

## Files to review

| File | Contains |
|---|---|
| `src/content/copy.ts` | Page prose — hero, intro, inventory, presentation, all form labels |
| `src/i18n/ui.ts` | Chrome — navigation, buttons, spec labels, validation messages |
| `src/content/pages/*.ts` | Per-page prose, including the page heads listed below |

### Newest, and least reviewed

Added 2026-08-17 when The Team and Artefacto moved onto the `.page-head`
treatment. **These are the freshest strings on the site — review them first.**

| Key | Page |
|---|---|
| `the-team.ts` → `eyebrow`, `title`, `lede` | The Team |
| `artefacto.ts` → `headline`, `headLede` | Artefacto |
| `amenities.ts` → three `schedule` items | Amenities |

Three renamed amenity lines, all owner-supplied in English:

| English | es | pt-BR |
|---|---|---|
| Pet Zone | Zona para mascotas | Espaço pet |
| Bicycle Rack Area | Zona de bicicleteros | Bicicletário *(unchanged)* |
| EV-Ready infrastructure available | Infraestructura preparada para vehículos eléctricos | Infraestrutura preparada para veículos elétricos |

Three things for the reviewer:

- **`Bicicletário` was left as it was.** It is already the exact Portuguese term
  for a bicycle rack area; *área de bicicletário* would be redundant.
- ***bicicletero*** (es) is Latin American. Spain would say *aparcabicicletas*.
  The build targets a Miami/LatAm readership, so the LatAm term was used.
- **"EV-Ready" has no direct equivalent** in either language. Both render as
  "infrastructure prepared for electric vehicles", which states the same fact
  but loses the compact marketing coinage. If the sales team has a preferred
  phrase, use theirs.

Two notes for the reviewer:

- The **English** here is owner-supplied, not scraped from the incumbent site,
  so unlike the rest of the page copy there is no original to check it against.
- The English capitalises mid-sentence for emphasis — *Sustainable Engineering*,
  *Award-winning Architecture*, *Artefacto-branded Project*. That is the owner's
  own styling and was preserved verbatim. Spanish and Portuguese mirror it
  (*Ingeniería Sostenible*, *Engenharia Sustentável*), which is **less
  conventional in both languages than it is in English marketing copy** — a
  native reviewer should decide whether to keep the emphasis or lower-case it.

English is the source of truth in both files. Review the `es` and `ptBr` blocks
against it.

## Choices a reviewer should confirm

**Portuguese is pt-BR, not pt-PT.** Artefacto is a Brazilian house and the South
Florida Brazilian buyer market is significant. If you'd rather target Portugal,
several choices change — `escritório` for den, `casa de banho` for bathroom,
and different comma conventions in measurements.

**Measurements are localised.** `2.5 bath` becomes `2,5 banheiros` in pt-BR and
`2.5 baños` in es. Confirm the decimal convention matches what your buyers
expect on a spec sheet.

**"Den" has no clean equivalent.** Rendered as `estudio` (es) and `escritório`
(pt-BR). Both read as a study/home office. If your sales team uses a different
word with clients, match the sales team — consistency with the conversation
matters more than dictionary accuracy.

**Register is formal.** Spanish uses *usted* throughout, not *tú*. Appropriate
for the price point, but worth confirming against how your agents speak to
clients.

**Brand and partner names are never translated.** ORIGIN, Artefacto, Bal Harbour
Shops, and Bay Harbor Islands stay in English in all three locales.

## The consent text needs a lawyer, not a translator

The consent checkbox carries TCPA-adjacent language about call, email and text
contact, opt-out via `stop`/`help`, and message rates. It was translated for
comprehension.

**A translated consent notice may not carry the same legal force as the English
original.** Before launching a non-English locale, have counsel confirm what
consent language is required for that audience. If in doubt, the safest course
is to keep the consent text in English in every locale — this is common and
defensible.

## Not yet translated

The legal pages — Privacy Policy, Terms of Use, Accessibility — remain in
English in all locales. That is deliberate. Legal documents should be
translated by someone accountable for their meaning, or explicitly served in
English. Decide which before launch.

## After review

Once a native speaker has signed off, clear the `reviewPending` flag for that
locale in `src/i18n/ui.ts` and delete its row here.

| Locale | Status |
|---|---|
| `en` | Source — verbatim from the incumbent site |
| `es` | ⚠️ Awaiting native review |
| `pt-br` | ⚠️ Awaiting native review |
