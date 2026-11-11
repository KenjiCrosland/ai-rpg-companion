# Mechanics check — gate-b-engulf-2026-11-10T20-20-36

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Tar Cistern Sludge | 3 | 2024 | ooze-1 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 0/5 |
| Fen Larder Frog | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Oxbow Sinkhound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/2 |
| Sump Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/3 |
| Ford Crossing Lurker | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 2/4 |
| Tidethief Eel | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | FAIL: vocab-2014-in-2024 | ok | ok | ok | ok | FAIL (1) | 0/1 | 2/3 |
| Mire Holdsoul | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | SOFT: orphan-condition-ref | ok | ok | soft (2) | 1/1 | 4/6 |
| Drowned Saddle | 4 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/3 |
| Sedge Drowner | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Bonefed Vine Knot | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/4 |
| Dunegullet | 9 | 2024 | brute-8-grappler | FAIL: escape-dc | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 3/4 |

**Dropped 5 of 15 GM clauses** (coverage 67%); concept share 65% (32/49 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5-grappler / edition: 1
- brute-8-grappler / derivation: 1


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Tar Cistern Sludge (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.625–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 21 (1 × Engulfing Slap); nova Gullet of Tar 24; dmg 22

## Fen Larder Frog (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Oxbow Sinkhound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Sump Hound (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Ford Crossing Lurker (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Still Water Ambush
- donor · note · print-row-exception: Actions/Snapping Lunge rides on: seed keyed on the user's words (drag, under, grapple, pull)
- read: def 2 / off 2 → 2; sustained 12 (1 × Bite); nova none; dmg 12

## Tidethief Eel (CR 3)
- edition · FAIL · vocab-2014-in-2024: 2014 wording in a 2024 block: "must succeed on a DC"
- read: def 3 / off 3 → 3; sustained 24 (2 × Bite); nova none; dmg 24

## Mire Holdsoul (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Fen-Slick Hide
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Swallow rides on: seed from the fallback library — no word of the user's keyed it
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Drowned Saddle (CR 4)
- clean
- read: def 3 / off 4 → 3.5; sustained 28 (1 × Hoof); nova none; dmg 28

## Sedge Drowner (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Mire Takes Hold
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Bonefed Vine Knot (CR 5)
- clean
- read: def 4 / off 5 → 4.5; sustained 38 (2 × Thorn Lash); nova none; dmg 38

## Dunegullet (CR 9)
- derivation · FAIL · escape-dc: Actions/Bite: escape DC 16, derived 19
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- read: def 7 / off 12 → 9.5; sustained 68 (2 × Bite); nova Surging Maw 14; dmg 68


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 6
- `multiattack` ×8
- `bite` ×6
- `swallow` ×3
- `amorphous` ×2
- `corrosive form` ×2
- `adhesive` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
