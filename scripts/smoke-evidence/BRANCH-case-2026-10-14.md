# The case for the critic — species rounds five to seven, the re-roll, the class kit (2026-10-14)

Everything in this branch landed after the last release and none of it has been
read by a critic. Three things to know before the blocks.

## 1. The measurement method changed, on the owner's call

The owner, today: the per-branch smoke "should always only test the features
we've developed since the last release… the generation is taking a lot of
needless time." So there is no fixed twelve in this run and no replay of the
species batch. Two batches were built for this branch and will die with it:

| batch | blocks | what each entry is for |
| --- | --- | --- |
| `classes-eight` | 16 | the eight classes, the print lifts, the five authored rows, the negative cases, two re-rolls |
| `branch-rounds` | 10 | the inline inversion, holds one/two/four, the species facts, the three repeat offenders, the mastery DC, one re-roll |
| canaries | 10 | the numbers reference, unchanged |

36 blocks where the old reading would have run 57. Every entry carries a `mech`
field naming the behaviour it exists to check, so a block that passes its gates
but misses its behaviour is still a miss.

## 2. The per-entry re-roll can now appear in a critic doc at all

Users said the re-roll "seems incredibly random as though it doesn't take the
whole creature into consideration." It was: the call saw the monster's name, its
CR, and the NAMES of its other entries — not the concept, not the header, not one
word of any sibling's rules, and no catalog. It is now catalog-first in one call,
with the whole creature in view (`REROLL-case-2026-10-13.md`).

But the re-roll is a card button, so no harness could show it. The smoke runner
now re-rolls a named entry and prints before, after, and provenance. **That paid
for itself on the first live block**: see §4.

## 3. What the blocks are expected to show

Nine of the ten `branch-rounds` behaviours are visible on the sheets:

| block | the behaviour, as it reads on the sheet |
| --- | --- |
| Bloodmaw Orc | the GM's Greataxe took the chassis slot; **no Shell Defense** from "retreats behind iron armor" |
| Sir Reginald | 2014 Multiattack reads "using Greatsword or Crossbow", never "one with … and one with" — flagged three times, now fixed |
| Sir Reginald | the phobia names **live chickens**, not "the thing it fears" |
| Coral Vurthax | the trident's Topple is **DC 15** = 8 + STR 4 + PB 3, and the derivation gate now reads mastery DCs |
| Yewshrine Warden | Shell Defense with **no speed-discord finding** — flagged three times, now fixed |
| Thornpiper Reveler | a **Fey** species gets its language: Common, Sylvan |
| Gloamripper | "lurks in shadow and steps away" buys **no teleport** |
| Stormwrought Oathkeeper | `inline declared: "the oathkeeper" — the call's own answer; the rules would have said "Stormwrought"` |
| Stormwrought Oathkeeper | a **stomp** deals Bludgeoning and **venom** deals Poison, never the weapon's type |
| Meshrin | the Name field speaks as **Meshrin**, never "the meshrin" |

The tenth, the cold-wyrm swallow interior, is **not exercised**: that roll took a
Bite-and-Breath line rather than the engulf line, so no Swallow row exists to
inspect. Every damage type on that sheet is Cold. The fix is pinned in tests only.

The class traces read as designed across all sixteen: the monk's Stunning Strike
rode a part row the GM's own words named ("Open Hand"); an **imp** rogue got
Cunning Action, which is eligibility by mind rather than type; "knight-errant"
resolved to paladin over fighter; and the dire wolf and the ninja drew no class
line at all, which is the bestial refusal and the implied-class rule.

## 4. What the live blocks found that no unit test had reached

Five defects, all fixed in this branch, each with its receipt:

1. **The re-roll re-picked the template it was replacing.** Re-rolling a rogue's
   Assassinate returned `assassinate` again under a new name. The same-name check
   catches a repeated name, never a repeated mechanic. The replaced row's template
   now leaves the menu. After: Assassinate → "Bloodhound Pursuit" from
   `faultless-tracker`.
2. **A trait was climbing the value ladder**, which appended a save row's
   "Success: Half damage only" to a trait and shipped a dangling `*Success:* H`.
   The signature path has always exempted traits and riders; the re-roll now does.
3. **A rewrite re-diced the row it was only rewording.** An Oathblade rewrite came
   back 25 (6d6 + 4) where the row read 26 (5d8 + 4): the skeletons hand the model
   the budget for a NEW row. A row being reworded keeps its own numbers.
4. **`entryRows` dropped the catalog provenance** it reads off a saved sheet, so
   the exclusion in (1) had nothing to match on. Found by writing the pin for (1).
5. **A re-roll probe aimed at Multiattack** told us nothing, because that name is
   structural and protected, so the call rewrote text under the same name. Both
   batches now exclude Multiattack and Spellcasting from a re-roll probe.

## 5. For the critic's eye — not fixed, deliberately

- **The cleric's lifts depend on a routing decision upstream.** Divine Aid was
  refused on both priest blocks because neither sheet got a Spellcasting row: the
  route gave "a templar priest of the dawn who blesses her soldiers" a non-caster
  body. The guard is right (print's row says "using the same spellcasting ability
  as Spellcasting"), but a GM who types "priest" and gets no magic gets no cleric
  features either.
- **Free text can still invent an unpriced extra attack.** The Oathblade rewrite
  added "On a hit or miss, the oathkeeper can spit venom at the same target using
  Venom Spit" — a free extra attack on every hit AND miss, referencing a real row,
  which passed the lint. The catalog path cannot do this; the free-text floor can.
  Constraining it is a judgement about how tight to make the floor.
- **A rider weld capitalises mid-sentence.** Meshrin reads "When Meshrin hits a
  creature with its Hooked Chain, If the target is a Large or smaller creature…".
- **One dangling reference, soft:** the Rime-Scaled Wyrm's Multiattack uses
  "Gorge", which is not a row on that sheet.
- **`ko-at-will` on the monk's Open Hand is expected.** The checker's own words:
  "Stunned at will, single target with a repeat save or a one-turn cap (the
  Ghoul's shape)". My frame is print's Ghoul exactly — single target, one-turn
  cap, once per turn. Soft, informational, not a defect.

## 6. Gates

```
classes-eight   16/16 blocks, 0 FAIL, 3 soft, coverage 90% (2 of 20 clauses), concept share 64%
branch-rounds   10/10 blocks, 0 FAIL, 2 soft, coverage 100% (0 of 13 clauses), concept share 69%
soft rules seen band ×4, ko-at-will ×2, multiattack-integrity ×2, reach ×2
full suite      185 suites, 5,300+ tests; npm run build clean
```

The forty is not in this run: it is the close-out gate and this branch is not at
close-out. The species nineteen is not in this run either — it measured the last
release's feature, and re-running it is the waste the owner named.
