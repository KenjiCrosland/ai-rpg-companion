# Mechanics check — classes-eight-2026-10-17T00-24-00

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scale Mendicant | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Gutterpact Nightjar | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Broken Oath | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Wound-Mad Highlander | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Ashvowed Templar | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: engine-needs-key | FAIL (1) | 2/2 | 3/3 |
| Late Councilor | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/2 | 3/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Seraphine Vow | 8 | 2024 | defender-8-leader | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | FAIL: print-range | FAIL (1) | 2/2 | 2/6 |
| Shadowvow Stalker | 5 | 2024 | skirmisher-3-skulker | ok | ok | FAIL: dangling-ref | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 2/6 |
| Dire Wolf Pack Hunter | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Keythief Imp | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Maze Herder | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Fallen Knight Errant | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/3 |
| Bazaar Ghost | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |

**Dropped 2 of 20 user clauses** (coverage 90%); concept share 71% (55/78 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-3 / reader: 1
- defender-8-leader / reader: 1
- skirmisher-3-skulker / structure: 1


## Scale Mendicant (CR 5)
- gates · SOFT · ko-at-will: Actions/Palm Strike: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Palm Strike); nova none; dmg 34

## Gutterpact Nightjar (CR 5)
- clean
- donor · note · print-row-exception: Traits/Assassinate rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Evasion rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Opportunist's Lash rides on: seed the user's words keyed
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

## Dame Oriel (CR 5)
- clean
- read: def 2 / off 6 → 4; sustained 42 (2 × Longsword); nova none; dmg 42

## Broken Oath (CR 6, 2014)
- clean
- donor · note · print-row-exception: Actions/Longsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shield Bash rides on: the user's own part, feature or species
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Second Wind rides on: the user's own part, feature or species
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

## Wound-Mad Highlander (CR 8)
- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

## Vareth Solmane (CR 6)
- clean
- donor · note · print-row-exception: Bonus Actions/Dawnward Blessing rides on: seed the user's words keyed
- read: def 5 / off 8 → 6.5; sustained 54 (2 × Mace); nova none; dmg 54

## Ashvowed Templar (CR 4)
- reader · FAIL · engine-needs-key: Actions/Hooked Lash: a grapple or engulf engine with no key in the words
- donor · note · print-row-exception: Actions/Thrown Iron Mace rides on: print rules row
- donor · note · print-row-exception: Actions/Hooked Lash rides on: seed the user's words keyed
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

## Late Councilor (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Slam
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Evasion rides on: seed the user's words keyed
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Slam); nova none; dmg 36

## Thurivald (CR 6, 2014)
- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Spear); nova none; dmg 42

## Seraphine Vow (CR 8)
- structure · SOFT · reach: Actions/Oathspear: reach 10 on a Medium body with no tether word
- reader · FAIL · print-range: Actions/Oathspear: range 30/120 is not the Oathspear's 20/60
- read: def 6 / off 8 → 7; sustained 54 (3 × Oathblade); nova none; dmg 54

## Shadowvow Stalker (CR 5)
- structure · FAIL · dangling-ref: Actions/Multiattack references "Vow", which is not a row
- read: def 3 / off 5 → 4; sustained 34 (2 × Tanto); nova none; dmg 34

## Dire Wolf Pack Hunter (CR 3)
- clean
- donor · note · print-row-exception: Bonus Actions/Pack's Keen Focus rides on: seed the user's words keyed
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

## Keythief Imp (CR 4)
- clean
- donor · note · print-row-exception: Traits/Evasion rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Nimble Escape rides on: the user's own part, feature or species
- read: def 2 / off 4 → 3; sustained 30 (2 × Sting); nova none; dmg 30

## Maze Herder (CR 6)
- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Bone-Crusted Axe); nova none; dmg 44

## Fallen Knight Errant (CR 7)
- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Shield Smash); nova none; dmg 52

## Bazaar Ghost (CR 3)
- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Curved Dagger); nova none; dmg 24
