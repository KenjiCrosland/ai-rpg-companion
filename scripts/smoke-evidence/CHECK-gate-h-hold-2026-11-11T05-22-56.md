# Mechanics check — gate-h-hold-2026-11-11T05-22-56

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Tar Pit Glutton | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 0/3 |
| Gullet Toad | 1 | 2024 | brute-5-grappler | ok | ok | FAIL: half-no-referent | ok | ok | ok | ok | SOFT: condition-duration | ok | ok | FAIL (1) | 1/1 | 1/4 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/3 |
| Ford-Bend Maw | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Trencheel | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Mire Bed Troll | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | SOFT: orphan-condition-ref | ok | ok | soft (1) | 1/1 | 6/6 |
| Drowned Hedge-Hexer | 6 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/5 |
| Sunken Road Maw | 9 | 2024 | brute-8-grappler | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/3 |
| Stonemaw Reeler | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | SOFT: prone-vocab, grapple-dependency-orphan, orphan-condition-ref | ok | ok | soft (2) | 0/1 | 4/5 |
| Silkbound Hauler | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/7 |
| Abyssal Coil-Spawn | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |

**Dropped 4 of 14 GM clauses** (coverage 71%); concept share 65% (31/48 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5-grappler / structure: 1


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Tar Pit Glutton (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Engulfing Lash); nova none; dmg 24

## Gullet Toad (CR 1)
- structure · FAIL · half-no-referent: Traits/Slack Hide: "half as much damage" with no damage on the row
- adjudicability · SOFT · condition-duration: Traits/Swallow Whole: imposes Restrained and no bound was RECOGNISED in its text — read it before believing this; a state bound ("while swallowed") is not in the pattern — print bounds every Restrained it hands out (0 of its rows bare)
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Bog Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Ford-Bend Maw (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Bite); nova none; dmg 14

## Trencheel (CR 3)
- clean
- read: def 2 / off 4 → 3; sustained 26 (2 × Bite); nova Trench Lunge 13; dmg 26

## Mire Bed Troll (CR 5)
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Mire Shove rides on: seed from the fallback library — no word of the user's keyed it
- donor · note · print-row-exception: Traits/Muck-Slick Grip rides on: seed from the fallback library — no word of the user's keyed it
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Drowned Hedge-Hexer (CR 6)
- clean
- read: def 4 / off 6 → 5; sustained 39 (3 × Sodden Strike); nova none; dmg 39

## Sunken Road Maw (CR 9)
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- read: def 7 / off 12 → 9.5; sustained 66 (2 × Bite); nova none; dmg 66

## Stonemaw Reeler (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Stoneclinger
- adjudicability · SOFT · prone-vocab: prone-vocab: Traits/Stoneclinger: "falls/knocked Prone" is 2014 phrasing — 2024 writes "has the Prone condition"
- adjudicability · SOFT · grapple-dependency-orphan: grapple-dependency-orphan: an entry depends on a target being grappled, but nothing in the block imposes the Grappled condition — give an attack a grapple rider (with an escape DC) or drop the dependency
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Roper's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 7 / off 5 → 6; sustained 34 (2 × Bite); nova none; dmg 34

## Silkbound Hauler (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Silk Cable
- bands · note · print-numbers: Ettercap's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Fangs rides on: the user's own part, feature or species
- read: def 2 / off 1 → 1.5; sustained 12 (1 × Fangs); nova none; dmg 12

## Abyssal Coil-Spawn (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 40 (2 × Grasping Tentacles); nova none; dmg 40


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 4
- `multiattack` ×11
- `bite` ×6
- `spider climb` ×3
- `reel` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
