# Mechanics check — classes-eight-2026-10-16T06-39-21

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Venom Palm Initiate | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Hollow Chimney Nix | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Garrick the Wall | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Grendh Skarn-Blood | 8 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 5/5 |
| Brother Halric | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Unmet Strike | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | FAIL (1) | 1/1 | 3/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: save-fit | FAIL (1) | 1/1 | 3/5 |
| Serelda Vane | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/7 |
| Silent Kage | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: inline-form | FAIL (1) | 0/2 | 2/7 |
| Greyfell Packlord | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Kilkil the Locksmith's Finger | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Vault Marauder | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Iron Vigil | 7 | 2024 | defender-5 | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 1/4 |
| Bone-Ledger Whisker | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/5 |

**Dropped 5 of 19 user clauses** (coverage 74%); concept share 63% (50/79 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / derivation: 1
- caster-6 / reader: 1
- defender-3-leader / reader: 1
- skirmisher-3-skulker / reader: 1
- defender-5 / structure: 1


## Venom Palm Initiate (CR 5)
- gates · SOFT · ko-at-will: Actions/Open Palm Strike: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm Strike); nova none; dmg 34

## Hollow Chimney Nix (CR 5)
- clean
- donor · note · print-row-exception: Traits/Assassinate rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Rooftop Stalker rides on: the seat the user's words named
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

## Dame Oriel (CR 5)
- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Longsword); nova none; dmg 42

## Garrick the Wall (CR 6, 2014)
- clean
- donor · note · print-row-exception: Actions/Longsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shield Bash rides on: the user's own part, feature or species
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Second Wind rides on: the user's own part, feature or species
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

## Grendh Skarn-Blood (CR 8)
- structure · SOFT · reach: Actions/Greataxe: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

## Vareth Solmane (CR 6)
- derivation · FAIL · attack-stat: Mace: +7 derives from DEX, but an attack row rolls STR
- donor · note · print-row-exception: Bonus Actions/Dawn Blessing rides on: seed the user's words keyed
- read: def 4 / off 8 → 6; sustained 54 (2 × Mace); nova none; dmg 54

## Brother Halric (CR 4)
- clean
- donor · note · print-row-exception: Actions/Thrown Mace rides on: print rules row
- read: def 2 / off 4 → 3; sustained 26 (2 × Mace); nova none; dmg 26

## Unmet Strike (CR 6)
- reader · FAIL · multiattack-integrity: "The unmet strike makes three attacks. It can replace one att" on a sheet with no attack row at all
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Sealing Touch rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Evasion rides on: seed the user's words keyed
- read: def 2 / off 0 → 1; sustained 0 (3 × ?); nova none; dmg 0

## Thurivald (CR 6, 2014)
- reader · FAIL · save-fit: Actions/Disciplinarian's Rebuke: a Strength save for an effect that calls for Wisdom or Charisma
- read: def 4 / off 6 → 5; sustained 42 (2 × Spear); nova none; dmg 42

## Serelda Vane (CR 8)
- clean
- read: def 7 / off 8 → 7.5; sustained 54 (3 × Longsword); nova none; dmg 54

## Silent Kage (CR 5)
- reader · FAIL · inline-form: the call called "Silent Kage" a person and the sheet speaks it as "the silent kage" — a person speaks by its given name
- read: def 3 / off 5 → 4; sustained 34 (2 × Assassin's Strike); nova none; dmg 34

## Greyfell Packlord (CR 3)
- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

## Kilkil the Locksmith's Finger (CR 4)
- clean
- donor · note · print-row-exception: Actions/Locksmith's Burst rides on: seed the user's words keyed
- donor · note · print-row-exception: Bonus Actions/Nimble Escape rides on: the user's own part, feature or species
- read: def 2 / off 5 → 3.5; sustained 30 (2 × Sting); nova Locksmith's Burst 22; dmg 35

## Vault Marauder (CR 6)
- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Bone-Cudgel); nova none; dmg 44

## Iron Vigil (CR 7)
- structure · FAIL · lint:duplicate-entry: Actions/Greatsword: identical text to "Oathbound Blade Strike" — two names, one ability; rewrite this entry into something distinct
- read: def 6 / off 8 → 7; sustained 52 (2 × Oathbound Blade Strike); nova none; dmg 52

## Bone-Ledger Whisker (CR 3)
- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Poniard); nova none; dmg 24
