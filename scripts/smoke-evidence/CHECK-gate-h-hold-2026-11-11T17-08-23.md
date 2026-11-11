# Mechanics check — gate-h-hold-2026-11-11T17-08-23

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Tar Pit Ooze | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | SOFT: entry-name-bathos | ok | ok | soft (1) | 1/2 | 1/3 |
| Marsh Swallower | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Bend Lurker | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Wreckline Eel | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Mirehold Troll | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | SOFT: orphan-condition-ref | ok | ok | soft (1) | 1/1 | 5/5 |
| Fenwreath | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Dune Maw | 9 | 2024 | brute-8-grappler | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/4 |
| Cave Roper | 5 | 2024 | brute-5 | ok | ok | FAIL: dangling-ref, lint:dangling-use-ref | ok | ok | ok | ok | SOFT: dangling-use-ref | SOFT: multiattack-integrity | ok | FAIL (1) | 0/1 | 5/5 |
| Larder Spinner | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/3 |
| Brine Coil | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |

**Dropped 2 of 14 GM clauses** (coverage 86%); concept share 72% (31/43 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5 / structure: 1


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Tar Pit Ooze (CR 3)
- adjudicability · SOFT · entry-name-bathos: entry-name-bathos: Actions/Tar Splatter: comedic/diminutive entry name — name the ability with words that keep their menace. Rename it
- read: def 3 / off 3 → 3; sustained 24 (2 × Slam); nova none; dmg 24

## Marsh Swallower (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Bog Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Bend Lurker (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Jaws); nova none; dmg 14

## Wreckline Eel (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Bite); nova none; dmg 24

## Mirehold Troll (CR 5)
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Sundering Shove rides on: seed from the fallback library — no word of the user's keyed it
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Fenwreath (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Mire Blast
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Mire Step rides on: seed keyed on the user's words (mire, bog, swamp, mud)
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Dune Maw (CR 9)
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- read: def 7 / off 12 → 9.5; sustained 68 (2 × Bite); nova none; dmg 68

## Cave Roper (CR 5)
- structure · FAIL · dangling-ref: Actions/Multiattack references "Reel", which is not a row
- structure · FAIL · lint:dangling-use-ref: Actions/Multiattack: "uses Reel" references an entry that doesn't exist — reference a real entry by its exact name
- adjudicability · SOFT · dangling-use-ref: dangling-use-ref: Actions/Multiattack: "uses Reel" references an entry that doesn't exist — reference a real entry by its exact name
- reader · SOFT · multiattack-integrity: Multiattack uses "Reel", which is not a row on this sheet
- bands · note · print-numbers: Roper's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Reeling Tendril rides on: seed keyed on the user's words (reel, drag, grapple)
- donor · note · print-row-exception: Traits/Adhesive rides on: seed keyed on the user's words (grip)
- read: def 7 / off 5 → 6; sustained 34 (2 × Bite); nova none; dmg 34

## Larder Spinner (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Fangs); nova none; dmg 14

## Brine Coil (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 40 (2 × Grasping Tentacles); nova none; dmg 40


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 4
- `multiattack` ×11
- `bite` ×5
- `engulf` ×2
- `swallow` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
