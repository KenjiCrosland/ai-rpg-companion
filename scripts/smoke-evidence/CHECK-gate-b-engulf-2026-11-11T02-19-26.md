# Mechanics check — gate-b-engulf-2026-11-11T02-19-26

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Blackrot Ooze | 3 | 2024 | ooze-1 | ok | SOFT: band | ok | ok | ok | ok | ok | SOFT: orphan-condition-ref, condition-duration | ok | ok | soft (2) | 1/2 | 4/5 |
| Glutton Toad | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/3 |
| Mire Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/3 |
| Drowned Larder | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/3 |
| Reedmaw Crocodile | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/2 |
| Wreckcoil Eel | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Bog Lurker | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | SOFT: orphan-condition-ref | ok | ok | soft (1) | 1/1 | 5/6 |
| Bridled Drowner | 4 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Miremother Sedge | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/6 |
| Orchard Strangler | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 1/4 |
| Sand-Maw | 9 | 2024 | brute-8-grappler | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/4 |

**Dropped 6 of 15 GM clauses** (coverage 60%); concept share 67% (32/48 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Blackrot Ooze (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.625–5, n=83)
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Restrained" is referenced as a state but nothing on the sheet applies it
- adjudicability · SOFT · condition-duration: Traits/Swallowing Bulk: imposes Restrained and no bound was RECOGNISED in its text — read it before believing this; a state bound ("while swallowed") is not in the pattern — print bounds every Restrained it hands out (0 of its rows bare)
- read: def 1/2 / off 3 → 1.75; sustained 21 (1 × Pseudoapod); nova none; dmg 21

## Glutton Toad (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Mire Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Drowned Larder (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Reedmaw Crocodile (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Bite); nova none; dmg 14

## Wreckcoil Eel (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Bite); nova none; dmg 24

## Bog Lurker (CR 5)
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Muck Hold rides on: seed from the fallback library — no word of the user's keyed it
- donor · note · print-row-exception: Traits/Noxious Aura rides on: seed from the fallback library — no word of the user's keyed it
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Bridled Drowner (CR 4)
- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Hooves); nova none; dmg 26

## Miremother Sedge (CR 6)
- clean
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Entrapping Mire rides on: seed from the fallback library — no word of the user's keyed it
- donor · note · print-row-exception: Traits/Aberrant Ground rides on: seed keyed on the user's words (roots)
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Orchard Strangler (CR 5)
- clean
- read: def 4 / off 4 → 4; sustained 32 (2 × Tendril); nova none; dmg 32

## Sand-Maw (CR 9)
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- read: def 7 / off 12 → 9.5; sustained 68 (2 × Bite); nova Earth Gullet 14; dmg 68


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 5
- `multiattack` ×10
- `bite` ×6
- `swallow` ×3
- `amorphous` ×2
- `corrosive form` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
