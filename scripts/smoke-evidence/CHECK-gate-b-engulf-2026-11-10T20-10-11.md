# Mechanics check — gate-b-engulf-2026-11-10T20-10-11

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Cellar Tar | 3 | 2024 | ooze-1 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 0/4 |
| Delta Gorgefrog | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Bogfen Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Mirehound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |
| Rivergrip Lurker | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/3 |
| Sunken Hold Eel | 3 | 2024 | brute-5-grappler | FAIL: escape-dc | ok | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 2/4 |
| Muckmaw | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | SOFT: orphan-condition-ref | ok | ok | soft (2) | 0/1 | 5/5 |
| Drowned Tarn Kelpie | 4 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Mire Drowner | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Rotroot Strangler | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 1/3 |
| Sand-Maw | 9 | 2024 | brute-8-grappler | FAIL: escape-dc | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 3/4 |

**Dropped 7 of 15 GM clauses** (coverage 53%); concept share 66% (33/50 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5-grappler / derivation: 1
- brute-8-grappler / derivation: 1


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Cellar Tar (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.625–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 21 (1 × Pseudopod); nova Engulf 24; dmg 22

## Delta Gorgefrog (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Bogfen Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Mirehound (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Rivergrip Lurker (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Jaws); nova none; dmg 14

## Sunken Hold Eel (CR 3)
- derivation · FAIL · escape-dc: Actions/Bite: escape DC 13, derived 14
- read: def 2 / off 4 → 3; sustained 26 (2 × Bite); nova none; dmg 26

## Muckmaw (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Marsh-Brine Hide
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Drowned Tarn Kelpie (CR 4)
- clean
- read: def 3 / off 4 → 3.5; sustained 28 (2 × Watery Hooves); nova none; dmg 28

## Mire Drowner (CR 6)
- clean
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Closing Mire rides on: seed keyed on the user's words (rope)
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Rotroot Strangler (CR 5)
- clean
- read: def 4 / off 5 → 4.5; sustained 38 (2 × Vine Lash); nova none; dmg 38

## Sand-Maw (CR 9)
- derivation · FAIL · escape-dc: Actions/Bite: escape DC 16, derived 19
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- read: def 7 / off 12 → 9.5; sustained 68 (2 × Bite); nova none; dmg 68


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 9
- `multiattack` ×10
- `bite` ×5
- `swallow` ×4
- `amorphous` ×2
- `corrosive form` ×2
- `pseudopod` ×2
- `engulf` ×2
- `smother` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
