# Mechanics check — classes-eight-2026-10-19T23-29-47

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sethik Sarn | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Vexis Nightgutter | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Marshal Aldric Vane | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Stonewound Gorran | 8 | 2024 | brute-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Anselm Grieve | 4 | 2024 | brute-2 | ok | ok | FAIL: multiattack-row | ok | ok | ok | ok | ok | FAIL: multiattack-integrity, attack-in-multiattack | ok | FAIL (2) | 2/2 | 2/2 |
| Corvin Ashvelle | 6 | 2024 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |
| Oathsworn Crusader | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 6/6 |
| Nightslip | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Crescent Run Dire | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Kettlelock | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Korvath the Warden | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |

**Dropped 4 of 18 user clauses** (coverage 78%); concept share 85% (51/60 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-2 / structure: 1
- brute-2 / reader: 1


## Sethik Sarn (CR 5)
- clean
- donor · note · print-row-exception: Traits/Hold Breath rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Marsh Stride rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Unarmed Strike rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Dart rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Patient Defense rides on: the user's own part, feature or species
- read: def 5 / off 7 → 6; sustained 48 (2 × Unarmed Strike); nova none; dmg 48

## Vexis Nightgutter (CR 5)
- clean
- donor · note · print-row-exception: Traits/Assassinate rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Evasion rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shortsword rides on: print rules row
- donor · note · print-row-exception: Actions/Shortbow rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Cunning Action rides on: the user's own part, feature or species
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

## Dame Oriel (CR 5)
- clean
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shield Line Break rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 39 (3 × Longsword); nova none; dmg 39

## Marshal Aldric Vane (CR 6, 2014)
- clean
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Longsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Second Wind rides on: the user's own part, feature or species
- read: def 4 / off 6 → 5; sustained 39 (3 × Longsword); nova none; dmg 39

## Stonewound Gorran (CR 8)
- gates · SOFT · control-aoe-ungated: Actions/Bloodroar Challenge: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- donor · note · print-row-exception: Actions/Greataxe rides on: print rules row
- donor · note · print-row-exception: Actions/Bloodroar Challenge rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Berserk rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Bloodied Frenzy rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Mountain Stride rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Rampage rides on: the user's own part, feature or species
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

## Vareth Solmane (CR 6)
- clean
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- donor · note · print-row-exception: Actions/Curse of Judgment rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33

## Anselm Grieve (CR 4)
- structure · FAIL · multiattack-row: Multiattack names a row that does not exist: "The guard makes two Javelin attacks."
- structure · SOFT · multiattack-count: Multiattack says 2 but names no rows
- reader · FAIL · multiattack-integrity: Multiattack's attack slot names "Javelin", which is not an attack row on this sheet
- reader · FAIL · attack-in-multiattack: Actions/Mace is an attack row the Multiattack never names — a GM who reads the Multiattack never uses it
- bands · note · print-numbers: Guard Captain's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Mace rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- read: def 3 / off 5 → 4; sustained 34 (2 × Mace); nova none; dmg 34

## Corvin Ashvelle (CR 6)
- bands · SOFT · band: reads CR 4.5 (print at 6 reads 3–8.5, n=42)
- read: def 3 / off 6 → 4.5; sustained 39 (3 × Fencing Cane); nova none; dmg 39

## Thurivald (CR 6, 2014)
- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Shield-Bash); nova none; dmg 42

## Oathsworn Crusader (CR 8)
- clean
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Lay on Hands rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Divine Smite rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Sworn Challenge rides on: seed the user's words keyed
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Longsword); nova none; dmg 54

## Nightslip (CR 5)
- clean
- donor · note · print-row-exception: Traits/Assassinate rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Evasion rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shortsword rides on: print rules row
- donor · note · print-row-exception: Actions/Shortbow rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Cunning Action rides on: the user's own part, feature or species
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

## Crescent Run Dire (CR 3)
- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

## Kettlelock (CR 4)
- clean
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Sting); nova none; dmg 30

## Korvath the Warden (CR 6)
- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Cleaver); nova none; dmg 44
