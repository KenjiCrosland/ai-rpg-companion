# Mechanics check — classes-eight-2026-10-16T19-28-28

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Open Palm Ascetic | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Sable Debt | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Unrelieved Watch | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Woundmad Fell | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Iron Creed Prior | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |
| Court Step-Wizard | 6 | 2024 | caster-6 | ok | ok | FAIL: dangling-ref, lint:undefined-attack-ref | ok | ok | ok | SOFT: print-rows | ok | ok | FAIL (1) | 1/1 | 4/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 3/5 |
| Lady Maravel Vowstone | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/6 |
| Umbral Blade | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/7 |
| Hungering Pack | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Brass Ledger Imp | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Asterion Herdmaster | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Oathbroken Shield-Knight | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Whisker Cutpurse | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |

**Dropped 1 of 19 user clauses** (coverage 95%); concept share 68% (54/80 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- caster-6 / structure: 1
- defender-3-leader / structure: 1


## Open Palm Ascetic (CR 5)
- gates · SOFT · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

## Sable Debt (CR 5)
- clean
- donor · note · print-row-exception: Traits/Assassinate rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Evasion rides on: the user's own part, feature or species
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

## Dame Oriel (CR 5)
- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Longsword); nova none; dmg 42

## Unrelieved Watch (CR 6, 2014)
- clean
- donor · note · print-row-exception: Actions/Longsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shield Bash rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Trip Attack rides on: seed the user's words keyed
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Second Wind rides on: the user's own part, feature or species
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

## Woundmad Fell (CR 8)
- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Goremaul); nova none; dmg 54

## Vareth Solmane (CR 6)
- clean
- donor · note · print-row-exception: Traits/Guard Aura rides on: the seat the user's words named
- donor · note · print-row-exception: Bonus Actions/Dawn Blessing rides on: seed the user's words keyed
- read: def 5 / off 8 → 6.5; sustained 54 (2 × Mace); nova none; dmg 54

## Iron Creed Prior (CR 4)
- clean
- donor · note · print-row-exception: Bonus Actions/Answering Sting rides on: seed the user's words keyed
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

## Court Step-Wizard (CR 6)
- structure · FAIL · dangling-ref: Reactions/Missed Step Riposte references "Longbow", which is not a row
- structure · FAIL · lint:undefined-attack-ref: Reactions/Missed Step Riposte references a "Longbow" attack that is not defined anywhere in the statblock
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Slam
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Reactions/Missed Step Riposte rides on: seed the user's words keyed
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Slam); nova none; dmg 36

## Thurivald (CR 6, 2014)
- structure · FAIL · lint:duplicate-entry: Actions/Bellow: identical text to "Rune-Spear" — two names, one ability; rewrite this entry into something distinct
- read: def 4 / off 6 → 5; sustained 42 (2 × Rune-Spear); nova none; dmg 42

## Lady Maravel Vowstone (CR 8)
- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Radiant Bladefall); nova none; dmg 54

## Umbral Blade (CR 5)
- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Shortsword); nova none; dmg 34

## Hungering Pack (CR 3)
- clean
- donor · note · print-row-exception: Bonus Actions/Predatory Focus rides on: seed the user's words keyed
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

## Brass Ledger Imp (CR 4)
- clean
- donor · note · print-row-exception: Traits/Evasion rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Nimble Escape rides on: the user's own part, feature or species
- read: def 1 / off 6 → 3.5; sustained 40 (2 × Sting); nova none; dmg 40

## Asterion Herdmaster (CR 6)
- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Horns); nova none; dmg 44

## Oathbroken Shield-Knight (CR 7)
- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Oath-Sworn Strike); nova none; dmg 52

## Whisker Cutpurse (CR 3)
- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24
