# Mechanics check — gate-h-hold-2026-11-12T06-06-35

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Black Ooze | 3 | 2024 | ooze-1 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | SOFT: inline-consistency | ok | soft (2) | 1/2 | 4/5 |
| Bog Gullet | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/3 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/2 |
| Stillwater Snatcher | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/3 |
| Reef Keelcoil | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |
| Muck Drowner | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | FAIL: owed-clause | ok | FAIL (1) | 0/1 | 5/5 |
| Mirewrought Crone | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dunegullet | 9 | 2024 | brute-8-grappler | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/3 |
| Cavern Roper | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 5/5 |
| Fanghauler | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/7 |
| Broodspawn Harrower | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |

**Dropped 4 of 14 GM clauses** (coverage 71%); concept share 73% (36/49 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5-grappler / reader: 1


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Black Ooze (CR 3)
- bands · SOFT · band: reads CR 1.75 (print at 3 reads 0.625–5, n=83)
- reader · SOFT · inline-consistency: Traits/Wall Crawl says "the ooze" beside the sheet's inline "the black ooze"
- read: def 1/2 / off 3 → 1.75; sustained 21 (1 × Pseudopod); nova none; dmg 21

## Bog Gullet (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Tongue); nova none; dmg 12

## Bog Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Stillwater Snatcher (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Bite); nova Merciless Strike 7; dmg 14

## Reef Keelcoil (CR 3)
- clean
- read: def 2 / off 4 → 3; sustained 26 (2 × Bite); nova Keelcoil Ambush 13; dmg 26

## Muck Drowner (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Bog Tread
- reader · FAIL · owed-clause: the GM added "holds victims under the muck" to a printed creature and the sheet answers it with nothing — this ships as the stock monster
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Mirewrought Crone (CR 6)
- clean
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Closing Mire rides on: seed from the fallback library — no word of the user's keyed it
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Dunegullet (CR 9)
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- read: def 7 / off 12 → 9.5; sustained 68 (2 × Bite); nova none; dmg 68

## Cavern Roper (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Rooted to Stone
- bands · note · print-numbers: Roper's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 7 / off 5 → 6; sustained 34 (2 × Bite); nova none; dmg 34

## Fanghauler (CR 2)
- clean
- bands · note · print-numbers: Ettercap's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Fangs rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Silk Snare rides on: seed keyed on the user's words (silk)
- read: def 2 / off 1 → 1.5; sustained 12 (1 × Fangs); nova none; dmg 12

## Broodspawn Harrower (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 40 (2 × Grasping Tentacles); nova none; dmg 40


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 8
- `multiattack` ×10
- `bite` ×5
- `amorphous` ×2
- `corrosive form` ×2
- `pseudopod` ×2
- `swallow` ×2
- `reel` ×2
- `spider climb` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
