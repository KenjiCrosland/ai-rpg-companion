# Mechanics check — gate-h-hold-2026-11-12T07-27-51

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Bell-Tower Weeper | 3 | 2024 | brute-5-grappler | ok | SOFT: band, hot-offense | FAIL: duplicate-mechanic | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/2 | 1/3 |
| Gorge Frog | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Old Ford Crocodile | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Drowned Keel Eel | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Mire Troll | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | FAIL: owed-clause | ok | FAIL (1) | 0/1 | 5/5 |
| Mire Covenant Witch | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Sand-Maw | 9 | 2024 | brute-8-grappler | ok | SOFT: aim-atk | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 2/2 | 2/3 |
| Strangling Roper | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Seam-Keeper | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 8/8 |
| Tidecrawl Broodling | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 2 of 14 GM clauses** (coverage 86%); concept share 86% (43/50 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5-grappler / structure: 1
- brute-5-grappler / reader: 1


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Bell-Tower Weeper (CR 3)
- bands · SOFT · band: reads CR 5 (print at 3 reads 0.625–5, n=83)
- bands · SOFT · hot-offense: offense alone reads CR 7, 4 over; the HP axis pulls the read to 5
- structure · FAIL · duplicate-mechanic: 3 rows impose Restrained — Smothering Blow, Pitch-Drown Spread, Swallow; print has no block with three (0 of 329)
- read: def 3 / off 7 → 5; sustained 46 (2 × Smothering Blow); nova none; dmg 46

## Gorge Frog (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Bog Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Old Ford Crocodile (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Bite); nova none; dmg 14

## Drowned Keel Eel (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Bite); nova Thrash and Drag 13; dmg 24

## Mire Troll (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Fen-Drowned
- reader · FAIL · owed-clause: the GM added "holds victims under the muck" to a printed creature and the sheet answers it with nothing — this ships as the stock monster
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Mire Covenant Witch (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Walking Mire
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Binding Snare rides on: seed from the fallback library — no word of the user's keyed it
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Sand-Maw (CR 9)
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- gates · SOFT · control-aoe-ungated: Actions/Sinking Breach: a 15-foot at-will Emanation of control with no way out — print's three Emanations past 10 feet all grant immunity for 24 hours on a success (Pit Fiend 20 ft, Cloaker 60 ft, Harpy 300 ft), which is how it can hand out a 300-foot Charm at CR 1
- read: def 7 / off 12 → 9.5; sustained 68 (2 × Bite); nova none; dmg 68

## Strangling Roper (CR 5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Tendril Yank
- bands · note · print-numbers: Roper's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Reeling Tendrils rides on: seed keyed on the user's words (motionless, ordinary, blend)
- read: def 7 / off 5 → 6; sustained 34 (2 × Bite); nova none; dmg 34

## Seam-Keeper (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Seam-Walker
- bands · note · print-numbers: Ettercap's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Fangs rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Reel the Line rides on: seed keyed on the user's words (haul, grapple, reel, tether)
- read: def 2 / off 1 → 1.5; sustained 12 (1 × Fangs); nova none; dmg 12

## Tidecrawl Broodling (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 40 (2 × Grasping Tentacles); nova none; dmg 40


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 5
- `multiattack` ×11
- `bite` ×6
- `swallow` ×3
- `reel` ×2
- `spider climb` ×2

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
