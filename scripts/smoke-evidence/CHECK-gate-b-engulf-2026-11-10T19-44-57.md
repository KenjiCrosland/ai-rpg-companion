# Mechanics check — gate-b-engulf-2026-11-10T19-44-57

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Bogtar Ooze | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/4 |
| Marsh Gorge-Toad | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Silt Maw | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/3 |
| Oxbow Sinker | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | FAIL: vocab-2014-in-2024 | SOFT: print-rows | ok | ok | ok | FAIL (1) | 0/1 | 3/4 |
| Keel Silt-Eel | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Muck Drowner | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | SOFT: orphan-condition-ref | ok | ok | soft (1) | 1/1 | 5/5 |
| Drowned Kelpie | 4 | 2024 | brute-2 | ok | ok | ok | ok | ok | FAIL: lint:condition-caps | ok | ok | ok | ok | FAIL (1) | 1/1 | 2/3 |
| Sedge Drowner | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Rooted Battlefield Vine | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Dune Gullet Maw | 9 | 2024 | brute-8-grappler | FAIL: escape-dc | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 3/4 |

**Dropped 4 of 15 GM clauses** (coverage 73%); concept share 84% (42/50 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-2 / edition: 2
- brute-8-grappler / derivation: 1


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Bogtar Ooze (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Smothering Slam); nova Sunken Crush 13; dmg 24

## Marsh Gorge-Toad (CR 1)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Gullet Rend
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Bog Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Silt Maw (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Oxbow Sinker (CR 2)
- edition · FAIL · vocab-2014-in-2024: 2014 wording in a 2024 block: "must succeed on a DC"
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Deadwood Drift
- donor · note · print-row-exception: Actions/Drag Under rides on: seed keyed on the user's words (drag, under, grapple, pull)
- read: def 2 / off 2 → 2; sustained 12 (1 × Bite); nova none; dmg 12

## Keel Silt-Eel (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Bite); nova none; dmg 24

## Muck Drowner (CR 5)
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Muck Hold rides on: seed keyed on the user's words (hold)
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Drowned Kelpie (CR 4)
- edition · FAIL · lint:condition-caps: Lowercase condition "grappled" in Traits/Adhesive — 2024 conditions are capitalized
- read: def 3 / off 4 → 3.5; sustained 26 (1 × Hooves); nova none; dmg 26

## Sedge Drowner (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Mire Rise, Traits/Bog-Bound
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Rooted Battlefield Vine (CR 5)
- clean
- read: def 4 / off 4 → 4; sustained 32 (2 × Strangling Vines); nova none; dmg 32

## Dune Gullet Maw (CR 9)
- derivation · FAIL · escape-dc: Actions/Bite: escape DC 16, derived 19
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- read: def 7 / off 12 → 9.5; sustained 68 (2 × Bite); nova Sand Burst 14; dmg 68


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 5
- `multiattack` ×9
- `bite` ×6
- `whelm` ×3
- `engulf` ×2
- `swallow` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
