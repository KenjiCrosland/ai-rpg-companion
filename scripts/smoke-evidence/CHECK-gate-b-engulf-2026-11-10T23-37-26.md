# Mechanics check — gate-b-engulf-2026-11-10T23-37-26

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Cistern Maw | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 0/4 |
| Bog Gorge Frog | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Silt Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/2 |
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/2 |
| Underwater Crocodile | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/3 |
| Deepmaw Eel | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/3 |
| Muck Lurker | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | SOFT: orphan-condition-ref | FAIL: name-mechanic | ok | FAIL (1) | 0/1 | 4/5 |
| Water Horse | 4 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 0/3 |
| Mire Crone | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Rotvine Shroud | 5 | 2024 | brute-5-grappler | ok | ok | FAIL: duplicate-mechanic | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/2 | 1/3 |
| Dunemaw | 9 | 2024 | brute-8-grappler | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/3 |

**Dropped 8 of 15 GM clauses** (coverage 47%); concept share 61% (25/41 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5-grappler / reader: 1
- brute-5-grappler / structure: 1


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Cistern Maw (CR 3)
- clean
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Pseudopod); nova none; dmg 24

## Bog Gorge Frog (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Silt Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Bog Hound (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Underwater Crocodile (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Bite); nova none; dmg 14

## Deepmaw Eel (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Bite); nova none; dmg 24

## Muck Lurker (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Mirefast Grip
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- reader · FAIL · name-mechanic: Actions/Mirefast Grip: the name promises the Grappled condition the text lacks
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Water Horse (CR 4)
- clean
- read: def 3 / off 4 → 3.5; sustained 28 (2 × Reeking Hoof); nova none; dmg 28

## Mire Crone (CR 6)
- clean
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Mire Snare rides on: seed keyed on the user's words (rope)
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Rotvine Shroud (CR 5)
- structure · FAIL · duplicate-mechanic: 3 rows impose Restrained — Strangling Vines, Snaring Runners, Cocoon; print has no block with three (0 of 329)
- read: def 4 / off 5 → 4.5; sustained 38 (2 × Strangling Vines); nova none; dmg 38

## Dunemaw (CR 9)
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- read: def 7 / off 12 → 9.5; sustained 68 (2 × Bite); nova Surging Maw 14; dmg 68


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 5
- `multiattack` ×11
- `bite` ×6
- `swallow` ×4
- `pseudopod` ×2
- `engulf` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
