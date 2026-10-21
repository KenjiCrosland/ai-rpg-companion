# Mechanics check — classes-eight-2026-10-21T14-34-02

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sekhiss Venomtongue | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Vesper Tallow | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Sergeant Halden Roarke | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Gormak Scarbound | 8 | 2024 | brute-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Unlit Chapel Templar | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Warden of the Empty Throne | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Sister Halcyon Vow | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Shadeweave Assassin | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 6/6 |
| Timbermaw Wolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Quillhook Grig | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Corridor Shepherd | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/3 |
| Oathbroken Knight | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Whisker Nickspring | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |

**Dropped 3 of 19 user clauses** (coverage 84%); concept share 92% (72/78 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Sekhiss Venomtongue (CR 5)
- clean
- donor · note · print-row-exception: Traits/Hold Breath rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Marsh Stride rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Unarmed Strike rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Dart rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Patient Defense rides on: the user's own part, feature or species
- read: def 5 / off 7 → 6; sustained 48 (2 × Unarmed Strike); nova none; dmg 48

## Vesper Tallow (CR 5)
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
- donor · note · print-row-exception: Traits/Hold the Line rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shield Shove rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 39 (3 × Longsword); nova none; dmg 39

## Sergeant Halden Roarke (CR 6, 2014)
- clean
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Exploit Opening rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Longsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Downed Strike rides on: seed the user's words keyed
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Second Wind rides on: the user's own part, feature or species
- read: def 4 / off 6 → 5; sustained 39 (3 × Longsword); nova none; dmg 39

## Gormak Scarbound (CR 8)
- gates · SOFT · control-aoe-ungated: Actions/Wounded Roar: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- donor · note · print-row-exception: Actions/Greataxe rides on: print rules row
- donor · note · print-row-exception: Actions/Wounded Roar rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Berserk rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Bloodied Frenzy rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Mountain Stride rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Rampage rides on: the user's own part, feature or species
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

## Vareth Solmane (CR 6)
- clean
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Dawn's Mark rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Dawnward Blessing rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33

## Unlit Chapel Templar (CR 4)
- clean
- bands · note · print-numbers: Guard Captain's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Mace rides on: the user's own part, feature or species
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

## Warden of the Empty Throne (CR 6)
- clean
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Reactions/Riposte rides on: seed the user's words keyed
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

## Thurivald (CR 6, 2014)
- gates · SOFT · control-aoe-ungated: Actions/Warband Fury: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- bands · note · print-numbers: Pirate Captain's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Warband Verse rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Warband Fury rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Hand Crossbow rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Bolstering Cry rides on: the user's own part, feature or species
- read: def 3 / off 7 → 5; sustained 45 (3 × Hand Crossbow); nova none; dmg 45

## Sister Halcyon Vow (CR 8)
- clean
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- donor · note · print-row-exception: Actions/Judgment Wave rides on: seed the user's words keyed
- donor · note · print-row-exception: Bonus Actions/Lay on Hands rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Divine Smite rides on: the user's own part, feature or species
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Longsword); nova Judgment Wave 27; dmg 54

## Shadeweave Assassin (CR 5)
- clean
- donor · note · print-row-exception: Traits/Assassinate rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Evasion rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shortsword rides on: print rules row
- donor · note · print-row-exception: Actions/Shortbow rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Cunning Action rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Veil of Shadow rides on: seed the user's words keyed
- read: def 6 / off 5 → 5.5; sustained 34 (2 × Shortsword); nova none; dmg 34

## Timbermaw Wolf (CR 3)
- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

## Quillhook Grig (CR 4)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Devil's Locksmith
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Sting); nova none; dmg 30

## Corridor Shepherd (CR 6)
- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Gore); nova none; dmg 44

## Oathbroken Knight (CR 7)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sheltering Bulwark
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- donor · note · print-row-exception: Actions/Shielding Shove rides on: seed the user's words keyed
- read: def 6 / off 8 → 7; sustained 52 (2 × Longsword); nova none; dmg 52

## Whisker Nickspring (CR 3)
- clean
- bands · note · print-numbers: Bandit Captain's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Evasion rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shortsword rides on: print rules row
- donor · note · print-row-exception: Actions/Shortbow rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Cunning Action rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Crowd Slip rides on: seed the user's words keyed
- read: def 3 / off 3 → 3; sustained 16 (2 × Shortbow); nova none; dmg 16
