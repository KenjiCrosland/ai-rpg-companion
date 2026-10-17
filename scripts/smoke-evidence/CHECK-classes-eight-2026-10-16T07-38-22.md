# Mechanics check — classes-eight-2026-10-16T07-38-22

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Venomthorn Adept | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Sable Rooftop Stalker | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Last Rearguard | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Ravening Blood-Wrack | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 5/5 |
| Ossian the Wall | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Salon Evanescent | 6 | 2024 | caster-6 | ok | ok | FAIL: dangling-ref | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 4/6 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | FAIL: save-fit | FAIL (2) | 1/1 | 3/5 |
| Dame Marisel Vane | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/7 |
| Nychta Vale | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/2 | 1/7 |
| Broken Fang | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |
| Shadowpick Imp | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Coilwarden | 6 | 2024 | lurker-5 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Oathbound Sentinel | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Market Ghost | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |

**Dropped 4 of 19 user clauses** (coverage 79%); concept share 59% (49/83 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / derivation: 1
- caster-6 / structure: 1
- defender-3-leader / structure: 1
- defender-3-leader / reader: 1
- skirmisher-3-skulker / reader: 1


## Venomthorn Adept (CR 5)
- gates · SOFT · ko-at-will: Actions/Pressure Strike: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Pressure Strike); nova none; dmg 34

## Sable Rooftop Stalker (CR 5)
- clean
- donor · note · print-row-exception: Traits/Faultless Tracker rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Assassinate rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Eave Runner rides on: the seat the user's words named
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

## Dame Oriel (CR 5)
- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Longsword); nova none; dmg 42

## Last Rearguard (CR 6, 2014)
- clean
- donor · note · print-row-exception: Actions/Longsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shield Bash rides on: the user's own part, feature or species
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Second Wind rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Shield Jab rides on: seed the user's words keyed
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

## Ravening Blood-Wrack (CR 8)
- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Maul); nova none; dmg 54

## Vareth Solmane (CR 6)
- derivation · FAIL · attack-stat: Mace: +7 derives from DEX, but an attack row rolls STR
- donor · note · print-row-exception: Bonus Actions/Divine Mending Touch rides on: seed the user's words keyed
- read: def 4 / off 8 → 6; sustained 54 (2 × Mace); nova none; dmg 54

## Ossian the Wall (CR 4)
- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

## Salon Evanescent (CR 6)
- structure · FAIL · dangling-ref: Actions/Multiattack references "Debt", which is not a row
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Debt of Ruin rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Evasion rides on: seed the user's words keyed
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

## Thurivald (CR 6, 2014)
- structure · FAIL · lint:duplicate-entry: Actions/War-Roar: identical text to "Spear" — two names, one ability; rewrite this entry into something distinct
- reader · FAIL · save-fit: Actions/Traitor's Recoil: a Strength save for an effect that calls for Wisdom or Charisma
- read: def 4 / off 6 → 5; sustained 42 (2 × Spear); nova none; dmg 42

## Dame Marisel Vane (CR 8)
- clean
- read: def 7 / off 8 → 7.5; sustained 54 (3 × Longsword); nova none; dmg 54

## Nychta Vale (CR 5)
- reader · FAIL · name-mechanic: Actions/Poisoned Dart: the name promises Poison the text lacks
- read: def 3 / off 5 → 4; sustained 34 (2 × Tanto); nova none; dmg 34

## Broken Fang (CR 3)
- clean
- donor · note · print-row-exception: Traits/Faultless Tracker rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Predator's Dread rides on: seed the user's words keyed
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

## Shadowpick Imp (CR 4)
- clean
- donor · note · print-row-exception: Bonus Actions/Nimble Escape rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Shadow's Rebuke rides on: seed the user's words keyed
- read: def 2 / off 6 → 4; sustained 40 (2 × Sting); nova none; dmg 40

## Coilwarden (CR 6)
- bands · SOFT · aim-hp: HP 82 is 22% under the card's 105
- bands · SOFT · band: reads CR 4 (print at 6 reads 3–8.5, n=42)
- read: def 2 / off 6 → 4; sustained 44 (2 × Horn); nova none; dmg 44

## Oathbound Sentinel (CR 7)
- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Grave-Worn Blade); nova none; dmg 52

## Market Ghost (CR 3)
- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Filched Blade); nova none; dmg 24
