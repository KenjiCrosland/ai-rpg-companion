# Mechanics check — classes-eight-2026-10-19T15-06-13

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sethra of the Warren | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/6 |
| Vessryn Rooftop Knife | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: on-hit-type | ok | FAIL (1) | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Corporal Alden Vayle | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Karnak Bloodmaw | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Vareth Solmane | 6 | 2024 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/4 |
| Brother Halloran | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Lord Fenwick Ainsley | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Oathsworn Ashenfold | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 5/7 |
| Umbral Blade | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: on-hit-type | ok | FAIL (1) | 2/2 | 5/5 |
| Treeline Culler | 3 | 2024 | skirmisher-3 | ok | FAIL: under | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok | FAIL (2) | 1/1 | 1/1 |
| Quillwick Caphis | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Asterion the Herder | 6 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/6 |
| Ser Alderic Vane | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Whisker Flick | 3 | 2024 | skirmisher-3 | ok | ok | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: attack-in-multiattack, attack-in-multiattack | ok | FAIL (1) | 0/1 | 5/5 |

**Dropped 2 of 19 user clauses** (coverage 89%); concept share 86% (64/74 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3-skulker / reader: 2
- skirmisher-3 / reader: 2
- skirmisher-3 / bands: 1


## Sethra of the Warren (CR 5)
- clean
- donor · note · print-row-exception: Traits/Hold Breath rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Marsh Stride rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Unarmed Strike rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Dart rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Patient Defense rides on: the user's own part, feature or species
- read: def 5 / off 7 → 6; sustained 48 (2 × Unarmed Strike); nova none; dmg 48

## Vessryn Rooftop Knife (CR 5)
- reader · FAIL · on-hit-type: Traits/Assassinate: it adds Slashing to a hit that deals Piercing (Shortsword)
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

## Corporal Alden Vayle (CR 6, 2014)
- clean
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Longsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Reactions/Riposte rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Second Wind rides on: the user's own part, feature or species
- read: def 4 / off 10 → 7; sustained 66 (3 × Longsword); nova none; dmg 66

## Karnak Bloodmaw (CR 8)
- clean
- donor · note · print-row-exception: Actions/Greataxe rides on: print rules row
- donor · note · print-row-exception: Actions/Ground Slam rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Berserk rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Bloodied Frenzy rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Mountain Stride rides on: the user's own part, feature or species
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova Ground Slam 27; dmg 54

## Vareth Solmane (CR 6)
- bands · SOFT · band: reads CR 4 (print at 6 reads 3–8.5, n=42)
- read: def 2 / off 6 → 4; sustained 44 (2 × Warhammer); nova none; dmg 44

## Brother Halloran (CR 4)
- clean
- bands · note · print-numbers: Guard Captain's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Mace rides on: the user's own part, feature or species
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Longsword); nova none; dmg 30

## Lord Fenwick Ainsley (CR 6)
- clean
- bands · note · print-numbers: Mage's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Lingering Shadow rides on: seed the user's words keyed
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

## Thurivald (CR 6, 2014)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Fury Song, Traits/Guard Aura
- bands · note · print-numbers: Pirate Captain's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Hand Crossbow rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Bolstering Cry rides on: the user's own part, feature or species
- read: def 3 / off 7 → 5; sustained 45 (3 × Hand Crossbow); nova none; dmg 45

## Oathsworn Ashenfold (CR 8)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Lay on Hands rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Divine Smite rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Compelling Challenge rides on: seed the user's words keyed
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Longsword); nova none; dmg 54

## Umbral Blade (CR 5)
- reader · FAIL · on-hit-type: Traits/Assassinate: it adds Slashing to a hit that deals Piercing (Shortsword)
- donor · note · print-row-exception: Traits/Assassinate rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Evasion rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shortsword rides on: print rules row
- donor · note · print-row-exception: Actions/Shortbow rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Cunning Action rides on: the user's own part, feature or species
- read: def 5 / off 5 → 5; sustained 34 (2 × Shortsword); nova none; dmg 34

## Treeline Culler (CR 3)
- bands · SOFT · aim-dpr: damage 0 a round is 100% under the card's 25
- bands · FAIL · under: damage 0 a round sits under print at CR 3 (7–38, n=83); reads CR 0.5
- structure · SOFT · multiattack-count: Multiattack says 2 but names no rows
- reader · FAIL · multiattack-integrity: "The culler makes two attacks." on a sheet with no attack row at all
- read: def 1 / off 0 → 0.5; sustained 0 (2 × ?); nova none; dmg 0

## Quillwick Caphis (CR 4)
- clean
- read: def 3 / off 6 → 4.5; sustained 40 (2 × Sting); nova none; dmg 40

## Asterion the Herder (CR 6)
- clean
- read: def 4 / off 6 → 5; sustained 33 (3 × Horns); nova Boulder Toss 33; dmg 44

## Ser Alderic Vane (CR 7)
- clean
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- read: def 6 / off 8 → 7; sustained 52 (2 × Longsword); nova none; dmg 52

## Whisker Flick (CR 3)
- structure · SOFT · multiattack-count: Multiattack says 2 but names no rows
- reader · FAIL · attack-in-multiattack: Actions/Shortsword is an attack row the Multiattack never names — a GM who reads the Multiattack never uses it
- reader · FAIL · attack-in-multiattack: Actions/Shortbow is an attack row the Multiattack never names — a GM who reads the Multiattack never uses it
- bands · note · print-numbers: Bandit Captain's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Evasion rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Shortsword rides on: print rules row
- donor · note · print-row-exception: Actions/Shortbow rides on: print rules row
- donor · note · print-row-exception: Bonus Actions/Cunning Action rides on: the user's own part, feature or species
- donor · note · print-row-exception: Bonus Actions/Crowd Slip rides on: seed the user's words keyed
- read: def 4 / off 3 → 3.5; sustained 16 (2 × Shortbow); nova none; dmg 16
