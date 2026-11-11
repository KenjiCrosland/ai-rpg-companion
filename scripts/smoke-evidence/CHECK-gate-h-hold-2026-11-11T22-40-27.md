# Mechanics check — gate-h-hold-2026-11-11T22-40-27

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Tar-Spring Gulch | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 0/3 |
| Gorge-Toad | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Mire Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/2 |
| Oxbow Jaws | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Wreckcoil Eel | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Fenmuck Grask | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | SOFT: orphan-condition-ref | ok | ok | soft (2) | 1/1 | 4/5 |
| Drowned Name Witch | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Erg Sinkmaw | 9 | 2024 | brute-8-grappler | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/4 |
| Cave Roper | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Canopy Reeler | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 7/7 |
| Wreck-Spawn Krakenling | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |

**Dropped 2 of 14 GM clauses** (coverage 86%); concept share 75% (33/44 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Tar-Spring Gulch (CR 3)
- clean
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Engulfing Fold); nova none; dmg 24

## Gorge-Toad (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Tongue); nova none; dmg 12

## Mire Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Jaws); nova none; dmg 10

## Oxbow Jaws (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Bite); nova none; dmg 14

## Wreckcoil Eel (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Bite); nova none; dmg 24

## Fenmuck Grask (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Mire Shove
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Drowned Name Witch (CR 6)
- clean
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Choking Haze rides on: seed keyed on the user's words (murk)
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Erg Sinkmaw (CR 9)
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- read: def 7 / off 12 → 9.5; sustained 68 (2 × Bite); nova Sand Breach 14; dmg 68

## Cave Roper (CR 5)
- clean
- read: def 4 / off 4 → 4; sustained 32 (2 × Tendril); nova none; dmg 32

## Canopy Reeler (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Haul-Line
- bands · note · print-numbers: Ettercap's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Fangs rides on: the user's own part, feature or species
- read: def 2 / off 1 → 1.5; sustained 12 (1 × Fangs); nova none; dmg 12

## Wreck-Spawn Krakenling (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 40 (2 × Grasping Tentacles); nova none; dmg 40


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 4
- `multiattack` ×11
- `bite` ×3
- `engulf` ×2
- `swallow` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
