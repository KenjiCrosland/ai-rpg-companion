# Item 4 — the eleven pairs, tiers against no tiers

Each pair is the same prompt on the same donor card and the same path: the ship-side sheet with
the call's mind tiers applied, and its partner with them withheld.

```
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-mind-a   # 18, as it would ship
SMOKE_TIMEOUT_MS=300000 node scripts/smoke-statblock.mjs v-mind-b   # the 11 homebrew partners, withheld
```

**READ THIS BEFORE THE NUMBERS.** The two sheets of a pair are two independent generations: only
the donor card and the path are pinned, so the identity call, the idea call and every authoring
call re-roll. Rows, row counts, creature type and size therefore differ between partners for
reasons that have nothing to do with the tiers. **A pair cannot test the maths invariant** —
that is what the Jest category-4 sweep does, holding one stubbed answer and changing one option.
What a pair DOES show is the mentals the GM would read on the card.

## The mentals

| prompt | donor | INT | WIS | CHA |
|---|---|---|---|---|
| rank-clockwork-spider | `brute-5-juggernaut` | 6 | **10 → 13** | 4 |
| rank-mummy-librarian | `caster-8-binder` | 14 | **15 → 16** | 16 |
| rank-ghoul-gravedigger | `lurker-5` | 12 | 13 | 10 |
| rank-eels-in-a-coat | `skirmisher-1` | 8 | 12 | 8 |
| rank-thing-in-the-well | `brute-5-grappler` | **4 → 13** | **10 → 16** | 4 |
| mind-silver-toad | `brute-5-grappler` | **4 → 13** | 10 | **4 → 16** |
| mind-drowned-scholar | `lurker-1-phantom` | **10 → 13** | **10 → 16** | **11 → 13** |
| mind-swamp-giant | `brute-5` | 6 | 10 | 6 |
| mind-pale-rider | `skirmisher-3-mounted` | 8 | 12 | **8 → 16** |
| mind-under-the-ice | `brute-5` | 6 | **10 → 13** | 6 |
| mind-toll-collector | `brute-5-grappler` | **4 → 13** | 10 | 4 |

Bold is a score the tiers moved. Nineteen scores across eleven sheets; the rest the rules held.

## The DC, and the surprise

**No pair shows the tiers moving a save DC away from the donor card's.** On two pairs they kept it
ON the card's where the withheld sheet drifted UP. The pale rider:

```
withheld:  save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
tiered:    mind tier: CHA 8 -> 16  ->  8 + PB 3 + 3 = 14, the card's DC exactly, so that pass never fires
```

The card's DC is 14. With the tiers the sheet ships 14; without them it ships 15, because no score
on the sheet could reach 14 and a pass raised the row to what the best score derives. The drowned
scholar is the same shape, 13 against 14. So on these sheets the tiers made the DC *more* the
card's, not less.

## Prompts not forced

Seven of the eighteen did not take the homebrew path on the ship-side run and have no pair:

- `rank-medusa-sculptor` — twist
- `rank-vampire-pirate` — twist
- `rank-mother-ash` — class_npc
- `rank-bellringer-ghost` — twist
- `rank-ogre-blacksmith-control` — twist
- `rank-carnival-barker` — class_npc
- `rank-sellsword` — class_npc

Category 3 of the suite proves those paths are identical with and without the tiers.

## Differences that are NOT the tiers

Recorded so a reader is not misled: `eels-in-a-coat` type (Swarm of Tiny Beasts / Monstrosity),
`thing-in-the-well` type and size (Elemental Medium / Aberration Large, which is why its HP differs,
102 against 97), `drowned-scholar` and `under-the-ice` speed (a Swim and a Burrow the other roll
did not name), `swamp-giant` an extra +2 attack row. All are the re-rolled calls, not the stamp.

