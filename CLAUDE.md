# CLAUDE.md

Project conventions for Claude Code. Loaded automatically at the start of every
session, so anything written here is context you do not have to repeat.

---

## The phrase: "Update the progress docs"

When the owner says **"update the progress docs"** — or any close variant
("update the tracking docs", "update the docs", "record this in the docs") —
that means this, without further explanation:

1. **`HANDOFF.md`** — the working record. Update:
   - **Current state**: page count, released residences, deployment status.
     Get the page count from `npm run build`, not from memory.
   - **Recent work on this branch**: what changed and *why*, not a changelog of
     commits. Someone reading it should understand the reasoning, not just the
     diff.
   - **Open items**: close what is done, add what this session surfaced,
     renumber so the list stays sequential — and check nothing below the list
     still refers to an old number.
   - **Gotchas**: anything that cost real debugging time. This section earns
     its keep only if it is written the day it was learned.
2. **`START-HERE.md`** — the starter prompt for a fresh session. Its facts list
   goes stale fastest: counts, what is released, what is deployed, which
   homepage exists. Also the task shortcuts, which point at open-item numbers.
3. **Anything else the change touched** — `PRODUCT.md` for brand or product
   truth, `README.md` for commands or layout, `FOLLOW-UP-BOSS.md` for lead
   delivery, `TRANSLATION-REVIEW.md` for copy in `es`/`pt-br`.
4. **Commit the doc update** on its own, with a message saying what changed and
   why — the same standard as a code commit.

### What this is not

Not a changelog. `git log` already lists what happened; these files exist to
say what is TRUE NOW and what a stranger needs to know before touching
anything. If a line only makes sense to someone who watched it happen, rewrite
it.

### The part that is easy to skip and matters most

**Correct what has become false.** Updating the docs is mostly deletion. A
stale line is worse than a missing one, because it is trusted. Things that have
already gone wrong here:

- `START-HERE.md` claimed 120 pages and 3 released residences long after both
  numbers had changed.
- A non-negotiable read "no prices — absence of price is deliberate" while two
  listing pages were printing asking prices.
- A CSS comment recorded a contrast measurement that a later edit had
  invalidated, and another described behaviour the code no longer had.

So: grep the docs for the numbers and names you changed. If the code moved, the
prose about it is guilty until checked.

---

## How this project verifies work

There is no test suite. Verification is Playwright scripts in the project root,
run against a **build** — `assert-build.mjs` refuses to measure a dev server,
because a dev server reports confident numbers from a module graph that can lag
the source.

**Measure; do not judge from screenshots.** Every real defect in this build so
far was invisible in a screenshot and obvious in a measurement — and several
*apparent* defects turned out to be flaws in the measurement itself. Read
"Measuring without fooling yourself" in `HANDOFF.md` before writing a new
check.

**Sweep a range of viewports.** Three sizes is not enough. Defects have hidden
at 320px, at short viewport heights, and three separate times in the *gap
between two media queries* — a window too wide for one correction and too short
for the other. A 1024x768 tablet failed AA while 1440 and 768 both passed.

**Record the measurement next to the thing it justifies**, with the values that
were rejected and why. A number in a comment is a claim; re-measure after
touching anything it depended on, and correct it when it changes.

---

## Non-negotiables

These are in `HANDOFF.md` in full. The ones most easily broken by accident:

- **Never write a root-absolute path by hand.** The site builds for two roots —
  the apex domain, and a `/origin-residences/` subfolder on the review deploy.
  Internal links go through `localizePath()`, `public/` files through
  `asset()`; anything imported from `src/assets/` is rewritten by Vite.
- **No credential in a `PUBLIC_*` variable.** `scripts/check-env.mjs` blocks the
  build if one appears. Never "fix" a guard failure by removing the guard.
- **The brand is pinned.** Palette, typeface and register are fixed;
  modernisation goes into execution only. Weights are 100/200/300 with two
  sanctioned exceptions — see `PRODUCT.md`.
- **Invent nothing.** No prices, MLS numbers, HOA figures or taxes the owner
  has not supplied. A null renders as an absent row on purpose.
- **`src/data/released.json` is the only switch** for what is public. An
  unreleased residence has no page, no PDF and no drawing.
