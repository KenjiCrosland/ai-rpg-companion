# Mechanics check — gate-h-hold-2026-11-11T20-20-08

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gelatinous Cube | 2 | 2024 | ooze-1 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Pit-Born Ooze | 3 | 2024 | brute-5-grappler | ok | ok | FAIL: duplicate-mechanic | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/2 | 2/4 |
| Mire Gulper | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Mud-Caked Bog Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/2 |
| Crossing Lurker | 2 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Channel Stalker | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |
| Mire Hollow Troll | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | SOFT: orphan-condition-ref | ok | ok | soft (1) | 1/1 | 4/4 |
| Mire Widow | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Sand-Maw | 9 | 2024 | brute-8-grappler | ok | SOFT: aim-atk, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/4 |
| Cave Roper | 5 | 2024 | brute-5-grappler | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | SOFT: inline-consistency | ok | soft (2) | 1/1 | 2/2 |
| Loomsilk Snatcher | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Brineclutch Spawnling | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |

**Dropped 2 of 14 GM clauses** (coverage 86%); concept share 70% (30/43 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5-grappler / structure: 1


## Gelatinous Cube (CR 2)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Amorphous, Traits/Corrosive Form
- bands · note · print-numbers: Gelatinous Cube's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/4 / off 2 → 1.125; sustained 12 (1 × Pseudopod); nova Engulf 10; dmg 15

## Pit-Born Ooze (CR 3)
- structure · FAIL · duplicate-mechanic: 3 rows impose Restrained — Slam, Tar Glob, Swallow; print has no block with three (0 of 329)
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Slam); nova none; dmg 24

## Mire Gulper (CR 1)
- clean
- read: def 1 / off 1 → 1; sustained 12 (2 × Bite); nova none; dmg 12

## Mud-Caked Bog Hound (CR 1, 2014)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Bite); nova none; dmg 10

## Crossing Lurker (CR 2)
- clean
- read: def 2 / off 2 → 2; sustained 14 (2 × Bite); nova Merciless Strike 7; dmg 14

## Channel Stalker (CR 3)
- clean
- read: def 3 / off 3 → 3; sustained 24 (2 × Bite); nova none; dmg 24

## Mire Hollow Troll (CR 5)
- adjudicability · SOFT · orphan-condition-ref: orphan-condition-ref: "Grappled" is referenced as a state but nothing on the sheet applies it
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 5 / off 5 → 5; sustained 33 (3 × Rend); nova none; dmg 33

## Mire Widow (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Siltborn Passage
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Binding Snare rides on: seed keyed on the user's words (entangle, rope)
- read: def 5 / off 8 → 6.5; sustained 48 (3 × Arcane Burst); nova Cone of Cold 36; dmg 56

## Sand-Maw (CR 9)
- bands · SOFT · aim-atk: attack +11 against the aim's +8
- bands · SOFT · hot-offense: offense alone reads CR 13, 4 over; the HP axis pulls the read to 10
- read: def 7 / off 13 → 10; sustained 68 (2 × Bite); nova Rolling Breach 45; dmg 75

## Cave Roper (CR 5)
- gates · SOFT · control-aoe-ungated: Actions/Reel In: a 30-foot at-will Emanation of control with no way out — print's three Emanations past 10 feet all grant immunity for 24 hours on a success (Pit Fiend 20 ft, Cloaker 60 ft, Harpy 300 ft), which is how it can hand out a 300-foot Charm at CR 1
- reader · SOFT · inline-consistency: Actions/Reel In says "the roper" beside the sheet's inline "the cave roper"
- read: def 4 / off 4 → 4; sustained 32 (2 × Tendril); nova none; dmg 32

## Loomsilk Snatcher (CR 2)
- clean
- bands · note · print-numbers: Ettercap's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Fangs rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Silk Reel rides on: seed keyed on the user's words (haul, drag, grapple, reel)
- read: def 2 / off 1 → 1.5; sustained 12 (1 × Fangs); nova none; dmg 12

## Brineclutch Spawnling (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 40 (2 × Grasping Tentacles); nova none; dmg 40


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 3
- `multiattack` ×11
- `bite` ×5
- `swallow` ×3

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
