# Mechanics check — branch-confirm-2026-10-14T23-22-49

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathmender Seraphine | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 1/5 |
| Vaelrix Stormvow | 8 | 2024 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 5/6 |
| Vespera Vaunt | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Hollow Warden | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/4 |
| Rimewake Wyrm | 9 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Meshrin | 6 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Kithral the Palm-Sage | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Quillwretch the Lockless | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Greyfen Howler | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Volgrun Ironmaw | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/5 |
| Roan Hearthorn | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/1 | 3/4 |
| Llibran the Piperspawn | 4 | 2024 | caster-6 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Iron Diocese | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Vareth Solmane | 6 | 2024 | caster-2-warpriest | FAIL: attack-stat | SOFT: band | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 4/5 |
| Kanagi the Shroud-Bound | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 0/7 |
| Karrow Vane | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |

**Dropped 5 of 22 user clauses** (coverage 77%); concept share 60% (42/70 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-3-leader / reader: 1
- caster-2-warpriest / derivation: 1


## Oathmender Seraphine (CR 8)
- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Longsword); nova none; dmg 54

## Vaelrix Stormvow (CR 8)
- bands · SOFT · band: reads CR 6 (print at 8 reads 2–10.5, n=24)
- read: def 4 / off 8 → 6; sustained 52 (2 × Greatsword); nova none; dmg 52

## Vespera Vaunt (CR 5)
- clean
- read: def 3 / off 6 → 4.5; sustained 42 (2 × Shortsword); nova none; dmg 42

## Hollow Warden (CR 7)
- clean
- donor · note · print-row-exception: Traits/Great Weapon Master rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/of the azer's choice rides on: print rules row
- donor · note · print-row-exception: Actions/Broken Greatsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Warden's Brand rides on: seed the user's words keyed
- read: def 6 / off 6 → 6; sustained 44 (2 × Broken Greatsword); nova none; dmg 44

## Rimewake Wyrm (CR 9)
- clean
- read: def 6 / off 11 → 8.5; sustained 54 (3 × Fangs); nova Rime Breath 49; dmg 69

## Meshrin (CR 6)
- bands · SOFT · band: reads CR 4.5 (print at 6 reads 3–8, n=42)
- read: def 3 / off 6 → 4.5; sustained 40 (2 × Chain Hook); nova none; dmg 40

## Kithral the Palm-Sage (CR 5)
- gates · SOFT · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

## Quillwretch the Lockless (CR 4)
- clean
- donor · note · print-row-exception: Bonus Actions/Spiteful Ember rides on: seed the user's words keyed
- read: def 1 / off 6 → 3.5; sustained 40 (2 × Sting); nova none; dmg 40

## Greyfen Howler (CR 3)
- clean
- donor · note · print-row-exception: Traits/Faultless Tracker rides on: seed the user's words keyed
- donor · note · print-row-exception: Bonus Actions/Bone-Chilling Howl rides on: seed the user's words keyed
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

## Volgrun Ironmaw (CR 8)
- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Ironclad Retort); nova none; dmg 54

## Roan Hearthorn (CR 5)
- reader · FAIL · name-mechanic: Actions/Thunder Stampede: the name promises movement the text lacks
- read: def 3 / off 5 → 4; sustained 38 (2 × Barbed Lance); nova Thunder Stampede 18; dmg 38

## Llibran the Piperspawn (CR 4)
- bands · SOFT · aim-hp: HP 58 is 23% under the card's 75
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Pipesong Bolt); nova none; dmg 26

## Iron Diocese (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

## Vareth Solmane (CR 6)
- derivation · FAIL · attack-stat: Mace: +7 derives from WIS, but an attack row rolls STR/DEX
- bands · SOFT · band: reads CR 4 (print at 6 reads 3–8, n=42)
- read: def 2 / off 6 → 4; sustained 44 (2 × Mace); nova none; dmg 44

## Kanagi the Shroud-Bound (CR 5)
- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Iron Limb); nova none; dmg 34

## Karrow Vane (CR 6, 2014)
- clean
- donor · note · print-row-exception: Traits/Great Weapon Master rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shield Bash rides on: the user's own part, feature or species
- read: def 6 / off 6 → 6; sustained 42 (2 × Greatsword); nova none; dmg 42
