# For the critic — gate of 2026-11-05

Two complete fortys on `fd82d5a`. Both ran 40 of 40 with no throws. The three release
items you ordered are addressed; each measurement below is the instrument that flagged
the item, not a probe of my own.

## The runs

| | sweep | homebrew40 |
|---|---|---|
| blocks | 40 of 40 | 40 of 40 |
| sheet-lint findings | 5 | 1 |
| checker FAIL blocks | 3 (was 7 last gate) | 8 (was 3) |
| single-target save rows over print's ceiling | 0 of 16 | 0 of 11 |

Blocks: `smoke-out/sweep-2026-11-05T07-45-32/all.md`,
`smoke-out/homebrew40-2026-11-05T15-02-18/all.md`.
Checker: `CHECK-sweep-2026-11-05T07-45-32.md`, `CHECK-homebrew40-2026-11-05T15-02-18.md`.
Predictions, written before launch and unedited: `PREDICTIONS-2026-11-05-gate.md`.

## Your three items

**1. Effect-claim check.** A row whose effect turns on a save now states the ability and
the DC or it is refused at authoring — your Collateral Word, measured at 1 of 523 authored
rows, and print names both every time it invokes a save in prose. A row that ends when an
OBJECT is destroyed must say the object exists: the snare frame introduces it ("caught in
mortar … until the mortar is destroyed"), which was all 5 occurrences over 3,279 sheets.
Two lints watch the output, both 0 false positives on print's 329 blocks.

**2. Lettered option.** It was not unbuilt — it was built and could not fail. The rule
assembled its list of spell lists from every row mentioning "Spellcasting", which includes
the Multiattack writing "a use of (B) Spellcasting to cast *Ray of Sickness*", so the
cited spell was always "available" and it reported nothing in 3,200 sheets. Your archlich
is caught now, as are 89 more (2.78%). Print stays at 0. Separately, the empty option and
the dangling cite are repaired at ship rather than only flagged: the attack list is
rewritten from its validated elements with the count preserved, and the replace clause
degrades lettered -> single option -> absent, which are print's own three forms.

**3. Merciless Strike.** The template was not the cause. `per_hit` is the round's budget
and a save frame spent it whole — right for a cone, wrong for "one creature". The ceiling
is now enforced on the FINISHED sentence, which matters because four writers compute save
damage and a fifth pass rescales finished dice; capping any one of them was undone
downstream. Result: the `single-target-ceiling` FAIL class is GONE (3 of sweep's 7 last
gate -> 0), and 0 of 27 single-target save rows across both fortys exceed print's line.

## What is still open, by name

- **`multiattack-offlist-spell` fires and nothing repairs it.** 1 on sweep. The lint is
  correct; no repair was built. Expected, not a surprise.
- **One punctuation defect is MINE and the cause is unidentified.** The Landing Maw
  shipped "…in any combination.. It can replace one attack with a Bite attack." — 1 sheet
  of 40, and 0 across the 3,279 sheets before this night, so it came from the Multiattack
  repairs. It does not reproduce from either repair in isolation, so what I added is a
  GUARD at their exit, not a fix at the cause. Cosmetic; flagged rather than closed.
- **homebrew40's 3 -> 8 FAILs.** Attributed row by row: one is the punctuation above; the
  `duplicate-mechanic: 3 rows impose Prone` is three CHASSIS rows on a trampler donor and
  one of them (Relentless Stride) describes the creature righting ITSELF, so it imposes
  nothing — partly a checker false positive; the rest are families present last gate
  (`duplicate-entry`, `under`, `gate-fit`, `engine-needs-key`).

## How to read the numbers

FAIL LISTS are not comparable run to run — the creatures differ, and single-roll counts
move about +/-3 on noise. Only the class breakdown is comparable, which is why the claim
above is "the ceiling class went to zero" and not "4 beats 8". Ship / fix-lite / fix are
yours; the figures here are mechanism counts and hard proxies.

Seven of homebrew40's blocks timed out on an earlier attempt of this same gate. That was
the machine idling, not instability: the same code with the display held awake produced
40 of 40 with zero timeouts. Ignore the 08-05 run directory.
