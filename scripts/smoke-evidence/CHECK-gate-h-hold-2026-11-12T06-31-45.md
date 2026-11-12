# Mechanics check — gate-h-hold-2026-11-12T06-31-45

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Tar-Heart Slick | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 0/4 |
| Fen Gorgefrog | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Mire Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/3 |
| Old Crocodile | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Harbor Gulper | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Bogmuck Strangler | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |
| Mirewidow | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Salt Maw | 9 | 2024 | brute-8-grappler | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/4 |
| Cave Roper | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 5/5 |
| Grey Spinner | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 7/8 |
| Drowned Spawn | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 3 of 14 GM clauses** (coverage 79%); concept share 71% (36/51 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Tar-Heart Slick (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Pseudopod); nova none; dmg 24

## Fen Gorgefrog (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Mire Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Old Crocodile (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Bite); nova none; dmg 14

## Harbor Gulper (CR 3)
- clean
- read: def 2 / off 4 → 3; sustained 26 (2 × Bite); nova none; dmg 26

## Bogmuck Strangler (CR 5)
- clean
- read: def 4 / off 5 → 4.5; sustained 38 (2 × Slam); nova none; dmg 38

## Mirewidow (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Widow's Binding
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Mire Snare rides on: seed from the fallback library — no word of the user's keyed it
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Salt Maw (CR 9)
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- read: def 7 / off 12 → 9.5; sustained 66 (2 × Maw); nova Dune Breach 14; dmg 66

## Cave Roper (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Stony Anchor
- bands · note · print-numbers: Roper's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 7 / off 5 → 6; sustained 34 (2 × Bite); nova none; dmg 34

## Grey Spinner (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Adhesive Webbing
- bands · note · print-numbers: Ettercap's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Fangs rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Silk Reel rides on: seed keyed on the user's words (haul, reel, pull, tether)
- read: def 2 / off 1 → 1.5; sustained 12 (1 × Fangs); nova none; dmg 12

## Drowned Spawn (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 40 (2 × Grasping Tentacles); nova none; dmg 40


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 7
- `multiattack` ×11
- `bite` ×5
- `pseudopod` ×2
- `engulf` ×2
- `swallow` ×2
- `reel` ×2
- `spider climb` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
