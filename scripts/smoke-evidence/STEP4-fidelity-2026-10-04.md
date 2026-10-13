# Fidelity pipeline — step 4: extraction, the proper noun, and the two numbers in the gate table

## What landed

- **Extraction rides on the main call.** The main-call JSON returns `clauses`, and the prompt names THE USER TYPED as their only source. The record saved on the block (`generation.clauses`) is the user's own phrases — split on commas, semicolons, "and", and a relative clause — each one clause; the model's list supplies only a phrase's kind (header | descriptive | mechanical). A model clause that quotes nothing the user typed leaves with a trace. A one-word prompt is one clause. The block also stores `generation.userConcept`.
- **Why the record is the user's phrases and not the model's list.** The first automated pass listed the model's own identity prose as clauses — nine for a one-word "owlbear" ("crashes out of the treeline", "hooked beak to seize and crush") — and read 53% coverage on inflated denominators. A grounding filter alone then left 0 of 0 on every short prompt and collapsed concept share to 40%. The user's phrases are the only denominator two people would count the same way.
- **Coverage and concept share are checker string-work, never a model call.** Coverage: of the header and mechanical clauses, the share whose words (stemmed) appear on the sheet; size and speed match by value; a bare print name is one clause, present when the block is the print body. Concept share: of the rows (Multiattack and the legendary-uses line aside), the share tracing to the user's words or the clause list, or named for print's own rows on a print body. The gate table carries `coverage` and `concept` columns and a per-run line: **Dropped N of M user clauses (coverage %); concept share %**.
- **The Name field is a proper noun** unless it is a print creature or the user's own words give it an article. "Meshrin" is Meshrin on every row; "a meshrin" is a kind.
- **The 2014 label follows the stat.** The conversion model labelled a ghost's Dex rope "Melee Spell Attack" (the step-4 forty's one fail); the legacy model now sets Weapon when the bonus derives from STR or DEX and Spell when only from the casting stat.

## The baseline set: automated against the hand counts

Run baseline-fidelity-2026-10-04T14-24-06, 0 fails of 18. Automated totals: **coverage 21/41 (51%), concept share 51/78 (65%)**; the step-1 hand counts were 62% and 56%. Per block, 11 of 18 agree within a third on both numbers; the totals sit 11 points under and 9 points over the hand counts.

| # | block | hand coverage | auto | hand concept | auto |
|---|---|---|---|---|---|
| 1 | Meshrin | 4/8 | 4/6 | 3/3 | 2/3 |
| 2 | knife ball | 2/2 | 0/1 | 2/3 | 0/2 |
| 3 | a bog witch | 2/2 | 0/1 | 4/6 | 0/5 |
| 4 | Troll | 1/1 | 1/1 | 3/4 | 4/4 |
| 5 | vampire lord | 2/3 | 1/2 | 8/10 | 8/8 |
| 6 | goblin on a frog | 2/3 | 1/1 | 4/6 | 5/6 |
| 7 | stone gargoyle | 2/3 | 1/2 | 2/4 | 1/5 |
| 8 | spell-less wizard | 2/3 | 1/1 | 1/5 | 4/4 |
| 9 | snapping turtle, AC 22 | 2/4 | 0/1 | 2/3 | 0/3 |
| 10 | Pikachu | 2/2 | 1/1 | 1/3 | 4/6 |
| 11 | Sir Reginald | 1/3 | 0/1 | 1/3 | 1/3 |
| 12 | laundry pile | 2/4 | 2/4 | 2/4 | 1/4 |
| 13 | Grandmother Ash | 2/6 | 3/6 | 2/5 | 6/6 |
| 14 | iron bull | 5/7 | 2/5 | 3/6 | 5/6 |
| 15 | Lantern Drowned | 3/4 | 1/5 | 3/5 | 5/5 |
| 16 | Owlbear | 1/1 | 1/1 | 1/1 | 1/1 |
| 17 | kobold trapmaker | 2/3 | 1/1 | 1/4 | 1/4 |
| 18 | dragon of bees | 1/2 | 1/1 | 1/3 | 3/3 |

Where the two readings part, and why, so the next pass can decide which is right:
- **The creature noun on a short prompt** (knife ball, bog witch, snapping turtle): the hand count credited the creature when the body was recognizably it (knives → slashing rows; a witch → Spellcasting); the string match credits it only when the word itself is on the sheet. Three blocks read 0/1 for that reason alone. This is a judgment the automated number cannot make without a synonym rule; left as is, stated.
- **Concept share runs higher automatically** because the user's words trace a row by any shared stem (a "bog" row, a "lantern" row) where the hand count asked whether the row was *about* the clause. Automated 65% against 56% by hand is that difference.
- **The denominator is now reproducible**: the user's own phrases, split on commas, "and" and a relative clause. The hand count's eight for Meshrin is the record's six because "wields a greatsword, long tail for swipe attacks" is two phrases to the splitter and the hand count read "lizard folk" and "Large" apart.

## The regression forty after step 4

sweep-2026-10-04T14-29-46: **0 fails of 40**. The new line reads **Dropped 18 of 58 user clauses (coverage 69%); concept share 85% (216/255 rows)** — higher than the baseline set because the forty's prompts are print names and one-line homebrews, which the string match credits easily. The one fail of the first step-4 forty (a Dex rope the conversion model labelled a spell attack) is gone under the label-by-stat pass. Gate: 179 suites / 5,161 tests, build clean.

## Meshrin after step 4

Meshrin | Large humanoid, neutral | 30 ft. | AC 14 (half plate) | HP 136 (16d10 + 48) | Common

- Multiattack. Meshrin makes two attacks: one with its Greatsword and one with its Hurled Debris. It can replace one attack with a use of Grasping Tail.
- Greatsword. Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 26 (5d8 + 4) slashing damage.
- Hurled Debris. Ranged Weapon Attack: +7 to hit, range 60/240 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
- Grasping Tail. One creature within 30 feet of Meshrin must succeed on a DC 15 Strength saving throw or be pulled up to 25 feet …

Automated 5/7 (the record's seven phrases; "Grasping Tail" credits the tail, the Large humanoid credits "lizard folk" and "Large"); by the regression case's eight, 4/8 — no claws, no bite, nothing for fighting styles, and a chassis "Hurled Debris" he was never given. "Meshrin" on every row now, by the proper-noun rule. All gates ok. The same shape as the baseline: step 4 measures, step 5 authors.
