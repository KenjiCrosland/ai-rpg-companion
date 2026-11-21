# Fault 1 proven, the strike derived from its host, and the housekeeping

Branch `statblock-enhancments-part-2`. Five commits: `4b9392b` the shared predicate, `8309374` the
strike derived from its host and the ninth lint rule, `04786b5` `2cd0a9b` `dcce6df` the
housekeeping, each a deletion or a correction on its own.

Blocks: `BLOCKS-fault-1-proven-2026-11-21.md` — every sheet this round produced.

**You were right on both counts: fault 1 had not landed, and the check was available.**
`git show 18bb4d19:…` recovered all forty tapes. My last report called them overwritten and
concluded the fix could not be proven; that was wrong, and it was wrong in the direction that let
me stop looking.

## 1. Fault 1 — every pass that removes a row from a printed body

| pass | where | reads the predicate |
|---|---|---|
| the one-melee-row filter | `generate.mjs` ~9438, `extra` | yes (it had `!e.strike` from `7b8e9cc`; now the shared one) |
| the provenance sweep | ~717 | yes |
| `extraRows`, the melee loop | 9276 | **yes — this is the one that deleted the rows** |
| `extraRows`, the melee rename | 9282 | yes |
| `extraRows`, the ranged loop | 9576 | yes |
| `extraRows`, the ranged rename | 9578 | yes |
| the splice itself | 9476 | — it only drains the list |

`outsidePrintsAttackList` is the one predicate: a strike, the user's own body part, a weapon the GM
typed, a row the user set, print's own row. It settles a disagreement that would have cost another
round: **the ranged loop spared neither `part` nor `userSet` while the melee loop spared `part`.**

**WHICH PASS DROPS `authored`: none of them.** The flag survives. `extraRows` never read it — its
four push sites test only `part`, `gmArmed`, `print` and `userSet`. The provenance sweep DID skip
the row on `authored`, correctly; the row was already gone by then. Two passes print the same
words, `print canon: chassis row leaves —`, and I read one trace and blamed the other. So there is
no missing-flag bug waiting for a later round, which is worth knowing because you flagged it as a
cost.

## 2. s01, s11 and s38, replayed from the old tapes

Each strike is on the sheet, and each is its host's line plus its save.

**s11, the Vampire.** `The vampire makes two Grave Strike attacks and uses Bite. It can replace one
attack with a use of Crimson Bramble Stalk.`
- host **Grave Strike** — +9, reach 5 ft., 8 (1d8 + 4) Bludgeoning plus 7 (2d6) Necrotic, and the target has the Grappled condition
- **Crimson Bramble Stalk** — the same line, grapple and all, then *Strength Saving Throw*: DC 17
- host plus a save: **yes**. Before, it was 13 (2d8 + 4) Slashing plus 9 (2d8) Necrotic with no grapple

**s38, the Skeleton.** `…two attacks, using Greatsword or Shortbow in any combination. It can
replace one attack with a use of Leg-Cutting Sweep.`
- host **Greatsword** — +7, reach 5 ft., 14 (3d6 + 4) Slashing plus 7 (2d6) Necrotic
- **Leg-Cutting Sweep** — the same line, then *Strength Saving Throw*: DC 14, Prone
- host plus a save: **yes**. Before, reach 10 ft. and 13 (2d8 + 4)

**s01, the Dire Wolf.** No Multiattack, so the strike stands as its own action — as your scratch
patch also found.
- host **Bite** — +5, reach 5 ft., 8 (1d10 + 3) Piercing, and the target has the Prone condition
- **Flank the Herd (Recharge 5-6)** — the same line, Prone and all, then *Constitution Saving Throw*: DC 13
- host plus a save: **yes**. Before, 6 (1d6 + 3) and no Prone

## 3. s35, three live rolls from the seat

**The refusal fires on rolls 2 and 3**: `strike not landed — it adds nothing: "Reeling Snare"
clones "Tendril", which already applies Grappled on a hit`. Roll 1 wrote no strike at all.

**The seat ends empty on all three.** The second answer was another row re-imposing Grappled every
time, caught by the older `dupOfAttack` rule. Would a GM run it? There is nothing to run. The
refusal is stopping a bad row and the re-ask is not producing a good one — the model keeps
answering that clause with the grapple the Tendril already does. That is a different problem from
the one this round fixed and it belongs with your largest queue item.

## 4. The chassis-nova pass on s01 — it edits nothing

It is a bare `trace()` in a loop over gated save rows, announcing that "geometry, cap and rider
lines below are its edits" when it only labels them; the edits belong to the passes after it. It
read the gated strike as the chassis's own nova and said so, which tells a reader the wrong thing
about the sheet. It skips a strike now.

## 5. The lint — nine rules, three columns

| rule | 18 Nov (38) | 20 Nov as recorded (40) | after (40) |
|---|---|---|---|
| uncited-replacement-row | 0 | 0 | 0 |
| ungated-turn-denial | 0 | 0 | 0 |
| citation-gate-mismatch | 0 | 1 — s20 | 0 |
| deafened-alone | 0 | 1 — s01 | 0 |
| rider-without-an-attack | 0 | 1 — s26 | 0 |
| strike-adds-nothing | 0 | 2 — s35, s36 | **1 — s06** |
| stock-template-name | 1 — s35 | 2 — s18, s24 | 1 — s12 |
| two-recharge-rows | 0 | 1 — s31 | 0 |
| strike-differs-from-host | 0 | 0 | 0 |

`strike-differs-from-host` is 0 everywhere, as you expected, and writing it found a bug in itself:
it read the `{ sec, r }` wrapper instead of the row, so every strike differed from its host. Its
own silent-direction test caught that.

## 6. THE ONE THING THE NEW FIX MADE WORSE, and it is a collision between two of your rulings

**s06's Scree Buckle is now redundant, and the lint is right to say so.**

- host **Rubble Lash** — 16 (3d8 + 3) Bludgeoning, and the target has the Grappled condition (escape DC 14); while Grappled, Restrained
- **Scree Buckle** — now the same line, grapple and all, and then a save that hands out **Grappled**

At the seat, when fault 5's check runs, Rubble Lash did **not** yet apply Grappled — the grapple
rider is welded onto it later — so the strike was a real addition when it was written and the
refusal correctly let it through. The derivation then gave it the host's rider, and the two rulings
meet:

- "a strike IS the named attack with a save added … and whatever the host does on a hit"
- "a strike whose only effect is a condition its host already applies is refused"

Three ways out, and I am not picking one: the derivation drops the host's rider where the strike's
save duplicates it; or the redundancy is re-checked at the derivation and the strike is dropped
(nothing can ask again that late); or it stands and the lint counts it. **Your call.** It is the
same shape as everything else today — a later pass changing the premise an earlier one decided on.

## 7. The tests, and the one that is not written

`strike-differs-from-host` has its two directions. The predicate has four. **The three
generateReskin tests are not written**, and the handoff is right that this is why the suite was
green with fault 1 open.

What stops it: a recorded tape keys on the **exact prompt**, so a constructed call matches nothing
and `hasAnswer` misses on the first call. Serving the same tape's answers **by family** instead
gets one call further and then asks for a family `familyOf` returns as `unknown` — the recogniser
does not name every call the engine makes. A stub that answered the wrong family would pass over
the wiring, which is the failure this round exists to fix, so I did not ship one.

Finishing it needs: every family the engine asks named in `scripts/lib/tape.mjs`, a valid canned
answer per family, and the options the Vue component computes (archetype, menuRole, path, style)
as an explicit fixture rather than a guess. That is a round's first commit, not a line item inside
one. Say the word.

## 8. The suite and the replay

**exit 0 — 267 suites, 5787 passed, 26 skipped, 5813 total**, at `--maxWorkers=2`, no crash.

| | |
|---|---|
| strict replay before | 3 of 40 missed: s06 (legacy call), s22 (route), s36 (seed) |
| re-recorded | **1** — s06, from the call that missed, with all 12 earlier answers kept |
| strict replay after | **38 of 40 reproduce**; s22 and s36 as always |

Your rule 2 works as written: `--live-from legacy` produced a complete tape whose answers before
the legacy call are the recorded ones, verified input-for-input before placing. One sheet
re-recorded, and **none of the forty's ideas moved.**

## 9. The housekeeping

- Nineteen stray `sweep-2026-11-20T…` folders removed from `recordings`. Each was a copy of a file the baseline already holds.
- `BLOCKS-five-faults-probe`, `BLOCKS-two-sheet-check` and `BLOCKS-widened-check` removed. No `CHECK-*` file belonged to them.
- s22 and s36 renumbered by their place in the forty in `BLOCKS-the-forty-after-2026-11-20.md`.
- The commit count: `HANDOFF-seven-faults-2026-11-20.md` says nine, which is right. The "ten" was in my message to you and not in any file, so there is nothing in the repo to correct.

## 10. For the owner

**`curse-debt`'s full key list**, as asked:

```
curse-debt, curse, hex, accursed, jinx, debt, rebuke, price, oath, bargain, owe,
judgment, tithe, toll, sin
```

`mechanic: curse`, `section: action`, name `Ruinous Curse`. Beyond `oath`, the words that would
bind it unasked are **debt, price, bargain, owe, tithe, toll, judgment, rebuke** and **sin** — so a
tax collector, a judge, a bell-ringer and a creditor all reach a permanent curse without the GM
typing one. The Pit Fiend ruling covers a fiend that binds by oaths; these others are not that.

**The three rulings of 20 November evening are recorded and none changed this round:** "choking"
does not name Poisoned and the Hydra's sheet stands; the Pit Fiend's curse stands and `curse-debt`
keeps its oath key; the next forty is the one to mark.
