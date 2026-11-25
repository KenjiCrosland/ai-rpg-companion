# HANDOFF — a typed ask gets its catalog row, and a dead row takes its references

2026-11-25 · branch `statblock-enhancments-part-2` · for the owner and for Fable

**The forty did not change.** `BLOCKS-the-forty-2026-11-24.md` stays as the latest forty, and no
second copy of it was written. `baseline-2026-11-24` is still the current recording.

**Suite:** 282 suites, 6,034 passed, 26 skipped, **exit 0**.
**Replays:** the six Kobold tapes **6 of 6 reproduced EXACTLY**; `baseline-2026-11-24` **38 of 38
reproduced EXACTLY, 2 skipped**. Nothing was re-recorded, so there is no new tape commit.

## 10. The commits, one line each — five

| # | Commit | What |
|---|---|---|
| 1 | `7020b6d` | the Kobold probe: six live rolls, before any code |
| 2 | `c7ef800` | 2a — R4 sees the whole shelf, not only the five offered |
| 3 | `015f0dd` | 2b — a row that leaves at print canon takes its references with it, and the housekeeping deletion |
| 4 | — | the Kobold probe after the build |
| 5 | — | this report |

---

## 1. The six Kobold rolls, before and after

The table is at the head of `BLOCKS-kobold-probe-2026-11-25.md`. The short version:

**The stop rule is clear — the route call declared `teleport` on 6 of 6.** R4 opens on the declared
ask, so widening it was worth doing.

**And the hole is not hit on any of the six.** `self-invisibility` led the OFFERED menu every time —
it was never shelf-only — the fit call chose it every time, and all six sheets carry
`Vanish (1/Day)` in Bonus Actions. **R4 never fired on any of them and no seed was drawn.** Your
stand-in run reached the hole by stamping the idea as an action AND having the fit decline; live,
the fit did not decline, and the idea's own stamp alternated action / bonus_action across the six
without changing the outcome.

**After: 6 of 6 reproduce EXACTLY.** The six sheets are character-identical to the six before, which
is the honest result — widening R4 changes nothing about rolls that never needed it. The change is
carried by its tests instead.

One thing worth seeing: the fit call named its row six different ways — Vanishing Shimmer, Splinter
Vanish, Fading Scales, Vanish, Shed Scale Shimmer, Shimmer Scales — and all six shipped as
**Vanish (1/Day)**, the template's own name, under "one mechanic, one name".

## 2. s35 and s39

**Neither changed, and neither sheet needs reading.**

**s39 Vellick — R4 fired and the row was refused downstream.** The declared ask is `burst`,
the action seat ended empty, and `throw-retrieve` is in that bucket and on the shelf, so R4 chose it
— which it could not do before this round. It did not land:

> `"throw-retrieve" quotes nothing the GM typed, matches no key-table verb, and the call named none
> of this`

So the gate that already exists caught it, and the sheet is byte-identical. **This is R4's new reach
working and then being refused by a condition R4 already had.**

**s35 Well Drowned — R4 did not fire.** The declared ask is `grapple` and `hook-rider` is in that
bucket, so the mechanic matches. Its **section is `rider`**: it welds onto an attack rather than
landing as a row of its own, and nothing landed. The action seat is still empty and nothing drags
anyone into the well, which is unchanged and is still the open thing on that sheet.

So the two sheets you flagged as "this is where two rulings meet" did not meet: neither produced a
row for him to read.

## 3. Where R4 fired on the forty, before and after

| Sheet | Ask | Template | Offered or shelf | Landed? |
|---|---|---|---|---|
| s12 Plague Archon | `command` | `pack-tactics` | **offered** | yes — before and after, unchanged |
| s37 Meshrin | `fear` | `fear-aura` | **offered** | yes — before and after, unchanged |
| s39 Vellick | `burst` | `throw-retrieve` | **shelf** — new this round | **no**, refused for quoting nothing the GM typed |

**Two firings before, three after; one row landed before and one after.** s12 and s37 come out
exactly as they were, which is what you asked for. Both of their templates were among the five
offered, so neither depended on the widening.

## 4. Any sheet where 2b swept a reference

**None on the forty.** The print-canon removal fires on six sheets (s13, s15, s18, s37, s38, s39)
and on none of them did a row other than the Multiattack name the removed row — so `sweepDeadName`
found nothing to sweep and every sheet reproduced exactly. The hole was real (the Purple Worm's
first probe roll, where Gizzard of Ruin named Shrapnel Spray) and it is now closed; this forty
simply does not contain an instance.

## 5. The four widened rows, as written and as shipped

| Sheet | As the seat wrote it | As it shipped |
|---|---|---|
| s02 Muck-Lunge | *Strength Saving Throw*: DC 13, **one creature within 5 feet**. *Failure:* pulled up to 5 feet toward the bog hound | Each creature in a **15-foot cone** … pulled up to 5 feet toward the bog hound and knocked prone |
| s06 Scree Snare | *Strength Saving Throw*: DC 14, **one creature within 5 feet**. *Failure:* the Prone condition | Each creature in a **30-foot cone** … or be knocked prone |
| s25 Iron Advance | *(the seat's own text is not in the trace — only the value check's verdict, EV 26.4 vs floor 12.5)* | Each creature in a **30-foot cone** … pushed up to 15 feet away and knocked prone |
| s29 The Last Note Is For You | *Wisdom Saving Throw*: DC 17, **one creature within 5 feet**. *Failure:* Frightened | *Wisdom Saving Throw*: DC 17, **each creature in a 30-foot Cone**. *Failure:* Frightened |

All four were written against one creature within 5 feet and all four shipped as cones. Not changed,
as ordered. s25's own seat text is not recoverable from the trace — the value-check line records the
verdict and the numbers but not the text it replaced.

## 6. Every sheet that differs from BLOCKS-the-forty-2026-11-24.md

**None.** 38 of 38 reproduced exactly and the two unreplayable sheets are carried. No new forty
blocks file was written, as step 10 directs.

## 7. The existing tests that changed

**One, and it is a deletion you ordered.** `an-empty-seat-stays-empty.spec.js`'s third describe
("a row the value ladder cannot lift stays as written") never placed a weak row — it reran the first
build and asserted the same things. Deleted; `templates.spec.js`'s changed Rooting Stare test is the
real cover.

No other existing test changed. The three new tests are two for 2a and one for 2b.

## 8. Anything a change made worse

**Nothing, read off the sheets.** The forty is byte-identical, the six Kobold sheets are
byte-identical, and the lint is unchanged. The only new behaviour on the forty is s39's R4 choosing
a row that the existing word-match gate then refused — which is the system working as designed, and
it left no trace on the sheet.

**One thing I could not measure.** Six live rolls never reached the case 2a fixes, so the widening is
proven only by its tests and by the stand-in run in your handoff. I cannot tell you how often a GM
hits it. If you want that number it is a bigger probe — the same concept at several CRs, or several
concepts whose ask is a bonus-action template.

## 9. The lint, the suite, the replays

The forty is unchanged, so the lint is unchanged: **all eight sheet rules at zero**, with
`orphan-condition-ref` ×2 on s11 and `at-will-inline` ×1 on s15 outside the eight.

**Suite:** 282 suites, 6,034 passed, 26 skipped, **exit 0**. One earlier run of the same suite exited
139 — the jest segfault this repo sees on a single worker — and the numbers above are from a clean
run, as the standing lesson requires.

**Replays:** six Kobold tapes 6 of 6 EXACTLY; `baseline-2026-11-24` 38 of 38 EXACTLY, 2 skipped.

---

## Your three corrections, taken

All three are right and I have not repeated them. For the record: s34's seat row is Fear Aura, not
"Standard Lance and Ride-Down"; Ride-Down's change was the 2014 conversion correcting a half-damage
clause the 2024 text never had, not a rewording; and the round was five commits, as the report said
— the chat summary's "six" was wrong.

## What I did not do

- **Nothing was pushed.** Five commits.
- **The keyword draw did not come back**, in whole or in part. The second 2a test pins it.
- **The two trait-side draws are untouched.**
- **Nothing from the owner's reading of 24 November was built**, and the value check's widening was
  not changed.
