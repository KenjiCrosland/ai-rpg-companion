# Predictions for the release forty — written BEFORE the run

Stated before `sweep` and `homebrew40` were launched, never edited after. Measured
against the critic's five Fix blocks from `sweep-2026-11-04T05-51-49` and the lints
landed today.

## The critic's five

| block | defect they scored | what I predict, and why |
|---|---|---|
| **#17 Pit Fiend** | `Fiery Mace` cited with no such row; `(A) or (B)` empty | **both gone.** The attack list is rewritten from validated elements and the replace clause re-read against surviving rows, both at ship. |
| **#17 Collateral Word** | "on a failed save", no ability, no DC | **gone, by refusal.** `traitIsSave` now covers the outcome phrasings, so the row never lands. A different trait takes the seat. |
| **#18 Archlich** | `(B) Ray of Sickness` on no spell list | **STILL PRESENT.** The lint was fixed (it could not fail before) but there is NO repair for an off-list spell. Expect `multiattack-offlist-spell` to fire. This is a known gap, not a surprise. |
| **#31 Anvilcloud Drake** | `Storm-Charge Corona` requires Prone, nothing imposes it | **gone.** R13's enabler fires: predicate replayed on that sheet, `Talons` hosts print's rider ", and the target has the Prone condition." |
| **#09 Stone Golem** | `until the mortar is destroyed`, no mortar | **gone.** All six snare bands now introduce the object ("is caught in mortar and has the Restrained condition until the mortar is destroyed"). |
| **#06** | `Merciless Strike: 49` vs a CR 13 ceiling of 31 | **under the ceiling, ~24-25.** The swap from `{avg_x2}` to `{avg}` halves it arithmetically. NOT verified in-pipeline — my direct render probe returned the blind fallback and proved nothing. |

## Lint counts I expect on the two runs

- `multiattack-cites-nothing`, `multiattack-dangling-cite`, `empty-option`: **0**
- `multiattack-offlist-spell`: **non-zero** — 2.78% of saved sheets carried one and nothing repairs it
- `save-without-its-numbers`: **0** (refused at authoring now)
- `effect-cites-nothing`: **0 from the snare frame**; a stray authored or chassis row is possible (2 of 513 historically)

## What would surprise me

- A dangling Multiattack cite or an empty option reappearing — those are repaired at ship and would mean the pass is not reached on some path (the flat-array printing is the suspect: `dropDeadMultiattackCites` takes `sections`, and #18 ships with `sections` EMPTY).
- The enabler not firing on a `requiresCondition` row whose sheet has a non-print melee host.
- Over-ceiling save rows unchanged at ~5% of single-target rows: condition-payoff was only 3% of them, so the rate should barely move. If it drops a lot, my attribution was wrong.

## The honest caveat

Single-roll counts move by about ±3 on noise alone (owner, 11-03). A block-level verdict
table is the critic's to write; mine are the mechanism numbers above.
