# Mechanics check — classes-eight-2026-10-19T15-26-24

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sarn Ossuary | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Vexa Roile | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sergeant Halvard Rone | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Brukk Bloodmaw | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Templar Penitent | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Missed Step | 6 | 2024 | caster-6 | ok | ok | FAIL: multiattack-row, lint:undefined-attack-ref | ok | ok | ok | ok | ok | FAIL: multiattack-integrity, multiattack-integrity | ok | FAIL (2) | 1/1 | 3/3 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Ironvow Sister | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 5/6 |
| Kage No Yaiba | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Packfringe Wolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |

**Dropped 2 of 15 user clauses** (coverage 87%); concept share 98% (54/55 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- caster-6 / structure: 1
- caster-6 / reader: 1


## Sarn Ossuary (CR 5)
- clean
- donor · note · print-row-exception: Traits/Hold Breath rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Marsh Stride rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Unarmed Strike rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Dart rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Patient Defense rides on: the user's own part, feature or species
- read: def 5 / off 7 → 6; sustained 48 (2 × Unarmed Strike); nova none; dmg 48

## Vexa Roile (CR 5)
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
- donor · note · print-row-exception: Traits/Guarded Stance rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- read: def 4 / off 10 → 7; sustained 66 (3 × Longsword); nova none; dmg 66

## Sergeant Halvard Rone (CR 6, 2014)
- clean
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Longsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Second Wind rides on: the user's own part, feature or species
- read: def 4 / off 10 → 7; sustained 66 (3 × Longsword); nova none; dmg 66

## Brukk Bloodmaw (CR 8)
- clean
- donor · note · print-row-exception: Actions/Greataxe rides on: print rules row
- donor · note · print-row-exception: Traits/Berserk rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Bloodied Frenzy rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Mountain Stride rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Rampage rides on: the user's own part, feature or species
- read: def 6 / off 8 → 7; sustained 52 (2 × Greataxe); nova none; dmg 52

## Vareth Solmane (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Dawnlight Blessing rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33

## Templar Penitent (CR 4)
- clean
- bands · note · print-numbers: Guard Captain's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Mace rides on: the user's own part, feature or species
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Longsword); nova none; dmg 30

## Missed Step (CR 6)
- structure · FAIL · multiattack-row: Multiattack names a row that does not exist: "The missed step makes three Arcane Burst attacks."
- structure · SOFT · multiattack-count: Multiattack says 3 but names no rows
- structure · FAIL · lint:undefined-attack-ref: Actions/Multiattack references a "Arcane Burst" attack that is not defined anywhere in the statblock
- reader · FAIL · multiattack-integrity: "The missed step makes three Arcane Burst attacks." on a sheet with no attack row at all
- reader · FAIL · multiattack-integrity: Multiattack's attack slot names "Arcane Burst", which is not an attack row on this sheet
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 3 / off 0 → 1.5; sustained 0 (3 × ?); nova none; dmg 0

## Thurivald (CR 6, 2014)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- bands · note · print-numbers: Pirate Captain's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Battle-Fury Skald rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Hand Crossbow rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Bolstering Cry rides on: the user's own part, feature or species
- read: def 3 / off 7 → 5; sustained 45 (3 × Hand Crossbow); nova none; dmg 45

## Ironvow Sister (CR 8)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Lay on Hands rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Divine Smite rides on: the user's own part, feature or species
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Longsword); nova none; dmg 54

## Kage No Yaiba (CR 5)
- clean
- donor · note · print-row-exception: Traits/Assassinate rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Evasion rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shortsword rides on: print rules row
- donor · note · print-row-exception: Actions/Shortbow rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Cunning Action rides on: the user's own part, feature or species
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

## Packfringe Wolf (CR 3)
- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24
