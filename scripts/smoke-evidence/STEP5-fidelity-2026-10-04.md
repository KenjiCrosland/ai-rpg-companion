# Fidelity pipeline — step 5: authoring into the forms

## What landed

- **The authoring call** (`reskin/author.mjs`) replaces the idea-and-fit pair on any sheet with a mechanical clause. It sees the clause record in the user's order, the chassis's priced attack slots by name, the attack-row cap, the rider and trait slots, and the sheet header. It returns forms, never prose: attacks (name, mode, type from the closed list, a rider from the closed condition list, flavor), one save (stat, closed target shape, damage yes/no, condition, movement, half-or-none, recharge), traits and reactions (trigger, effect with `{dc}` and `{dmg}` tokens), one cross-row reference, and the unplaced clauses with where they belong. A number in the model's answer is scrubbed to a token; an unknown type or condition drops the row.
- **The chassis contributes numbers and shape.** Attack forms take the chassis's priced attack slots by name, type and rider, so the solver's bonus and dice stand; a weapon past the chassis's count is a new row cloned from a priced one, and the final price pass re-solves the round. A save is rendered through the form at the sheet's DC with engine dice; a trait or reaction at the sheet's DC and half-hit dice. The wildcard slot yields to an authored save or trait; the signature path stands down on an authored sheet.
- **Row-versus-rider**, as resolved: every weapon or body part is an attack row up to the cap (the chassis's count plus one; four on a dragon body); the rest compete for two rider slots and one trait, in the user's order; a rider past the slots folds into the row's flavor. Unplaced speech goes to the Languages line; the rest is recorded on the block as unplaced and traced, never silently dropped.
- **Multiattack names the authored rows** ("makes two attacks, using Greatsword, Tail Swipe, Claw or Bite in any combination"); the cross-row reference writes the payoff clause ("with Advantage if the target has the Prone condition") when the rider row really applies it.
- **The continuum, not a mode.** A print body authors nothing (print's rows are the composition); a prompt with no mechanical clause takes the template path unchanged.

## Pins

The parser's closed vocabularies, caps and slots on a hand-built answer; the Meshrin regression case end to end with a mocked authoring answer: Greatsword, Tail Swipe, Claw and Bite rows, Multiattack naming them, a Fighting Styles trait, "Meshrin" on every row, every attack row priced, the cross-row reference on the Bite, coverage 7 of 8 or better by the checker.

## The baseline set after step 5

Run baseline-fidelity-2026-10-04T16-00-59 — 17 of 18 (the troll hit a provider stall), 1 fail. Automated totals: **coverage 32/38 (84%), concept share 56/79 (71%)** — against 51% and 65% after step 4 on the same denominators, and 62% / 56% by hand at the start. Seven of seventeen blocks agree with the hand count within a third; the disagreements now run the other way (automated higher), because authored rows carry the user's words by construction.

| # | block | hand coverage | step 4 | step 5 | hand concept | step 5 |
|---|---|---|---|---|---|---|
| 1 | Meshrin | 4/8 | 4/6 | 6/6 | 3/3 | 5/5 |
| 2 | knife ball | 2/2 | 0/1 | 0/1 | 2/3 | 0/4 |
| 3 | a bog witch | 2/2 | 0/1 | 1/1 | 4/6 | 2/5 |
| 5 | vampire lord | 2/3 | 1/2 | 2/2 | 8/10 | 8/8 |
| 6 | goblin on a frog | 2/3 | 1/1 | 1/1 | 4/6 | 5/6 |
| 7 | stone gargoyle | 2/3 | 1/2 | 0/2 | 2/4 | 0/4 |
| 8 | spell-less wizard | 2/3 | 1/1 | 2/2 | 1/5 | 4/4 |
| 9 | snapping turtle, AC 22 | 2/4 | 0/1 | 1/2 | 2/3 | 2/3 |
| 10 | Pikachu | 2/2 | 1/1 | 1/1 | 1/3 | 3/4 |
| 11 | Sir Reginald | 1/3 | 0/1 | 1/1 | 1/3 | 2/4 |
| 12 | laundry pile | 2/4 | 2/4 | 1/1 | 2/4 | 2/3 |
| 13 | Grandmother Ash | 2/6 | 3/6 | 6/6 | 2/5 | 6/7 |
| 14 | iron bull | 5/7 | 2/5 | 4/5 | 3/6 | 6/8 |
| 15 | Lantern Drowned | 3/4 | 1/5 | 3/4 | 3/5 | 5/5 |
| 16 | Owlbear | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 |
| 17 | kobold trapmaker | 2/3 | 1/1 | 1/1 | 1/4 | 2/5 |
| 18 | dragon of bees | 1/2 | 1/1 | 1/1 | 1/3 | 3/3 |

The one fail: the kobold's authored trait carried a rider-save in prose ("each creature within 5 feet must succeed on a DC 12 Dexterity saving throw or take …"), which the 2014 lint rejects for the skeleton. Fixed after this run: a prose rider-save inside a trait or reaction now renders as the structured save, pinned; the saved block still shows it. The two blocks still at zero are the creature-only prompts the string match cannot credit (knife ball) and the gargoyle whose "only moves when no one is looking" the model placed nowhere.

**Meshrin on the baseline run, live:** Greatsword, Tail Swipe, Razor Claws, Vicious Bite — four attack rows, each priced; Multiattack names all four; "Meshrin" on every row; Large; 30 ft. Missing: a row or rider for "trained in fighting styles" (the model used neither the trait slot nor an unplaced entry for it), and the chassis's renamed signature row ("Claw Rake") stayed because no authored save or trait claimed the slot. 6 of 8 by the regression case. The missing clause is exactly step 6's repair-by-adding.

## The regression forty after step 5

sweep-2026-10-04T16-19-30: **0 fails of 39** (one entry, the mirror assassin at 18, hit a provider stall and did not save). **Dropped 16 of 58 user clauses (coverage 72%); concept share 81%** — against 69% and 85% after step 4 on the same set. Flat, as expected: the forty is print names and one-line homebrews, where authoring rarely fires (a print body authors nothing; a one-liner carries one or two clauses). The regression set measures soundness; the baseline set measures fidelity.

## Meshrin after step 5, live

Name "Meshrin", Auto, CR 8, 2014, his description verbatim — generated live on the final step-5 engine.

Meshrin | Large humanoid, neutral | 30 ft. | AC 14 (half plate) | HP 136 (16d10 + 48) | Common

- Trained Fighting Style. Meshrin has advantage on melee attack rolls against any creature that is prone.
- Multiattack. Meshrin makes two attacks, using Greatsword, Tail Swipe, Razor Claws or Vicious Bite.
- Greatsword. Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 26 (5d8 + 4) slashing damage.
- Tail Swipe. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage, and if the target … is knocked prone.
- Razor Claws. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.
- Vicious Bite. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.

Against the regression case: Large ✓; Speed 30 ✓ (the header rule — the previous live run walked 40); greatsword, tail, claw and bite rows ✓; Multiattack naming them ✓; a row for "trained in fighting styles" ✓ (a trait that exploits the tail's Prone — the cross-row reference); "Meshrin" throughout ✓; all gates ok ✓ (one band soft); coverage 7 of 7 recorded clauses, 8 of 8 by the case. **Pass.** The round is priced by the chassis: two attacks a round of the four, the big sword and the tail above the two natural weapons, within band at CR 8.
