# Mechanics check — receipt-ten-2026-10-21T20-49-56

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | FAIL: vocab-2024-in-2014 | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 10/10 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | FAIL: name-mechanic | ok | FAIL (1) | 0/1 | 9/9 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Reliquary Sludge | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 1/5 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Solreich | 14 | 2024 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Bog Widow | 7 | 2024 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/3 |
| Threshold Reeve | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |

**Dropped 4 of 11 user clauses** (coverage 64%); concept share 93% (52/56 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5 / edition: 1
- dragon-15 / reader: 1


## Hydra (CR 8, 2014)
- edition · FAIL · vocab-2024-in-2014: 2024 "wording in a 2014 block: "Emanation"
- bands · note · print-numbers: Hydra's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Venomous Emanation rides on: seed the user's words keyed
- read: def 8 / off 5 → 6.5; sustained 10 (1 × Bite); nova Venomous Emanation 24; dmg 23

## Stone Golem (CR 10)
- clean
- bands · note · print-numbers: Stone Golem's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Trampling Charge rides on: seed the user's words keyed
- read: def 11 / off 9 → 10; sustained 48 (2 × Slam); nova Trampling Charge 35; dmg 55

## Vampire (CR 13, 2014)
- clean
- bands · note · print-numbers: Vampire's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Buried Thorns rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Thorn Disguise rides on: seed the user's words keyed
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova none; dmg 30

## Adult Red Dragon (CR 17, 2014)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sight Weakness
- reader · FAIL · name-mechanic: Traits/Scarred Blindside: the name promises the Blinded condition the text lacks
- bands · note · print-numbers: Adult Red Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Scarred Blindside rides on: seed the user's words keyed
- donor · note · print-row-exception: Legendary Actions/Commanding Presence rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Fiery Rays rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Pounce rides on: print rules row
- read: def 14 / off 20 → 17; sustained 108 (3 × Rend + legendary Pounce); nova Fire Breath 59; dmg 111

## Purple Worm (CR 15)
- clean
- derivation · note · dc-float: Actions/Swallow: DC 21 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Actions/Swallow: DC 21 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Traits/Weapon Lodging: DC 21 sits one off the derived DC (the chassis ±1 float)
- bands · note · print-numbers: Purple Worm's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Weapon Lodging rides on: seed the user's words keyed
- read: def 12 / off 11 → 11.5; sustained 51 (1 × Tail Stinger); nova none; dmg 51

## Reliquary Sludge (CR 9, 2014)
- bands · SOFT · band: reads CR 6 (print at 9 reads 5.5–13, n=8)
- read: def 4 / off 8 → 6; sustained 54 (2 × Pseudopod); nova none; dmg 54

## Ancient Gold Dragon (CR 24, 2014)
- clean
- donor · note · print-served: "Ancient Gold Dragon" is the SRD 5.1 block, served with no call — the gates that judge authored content do not apply; equality with the corpus is the test
- read: def 26 / off 20 → 23; sustained 80 (3 × Bite + legendary Wing Attack); nova Breath Weapons 71; dmg 101

## Solreich (CR 14)
- clean
- donor · note · print-row-exception: Actions/Skull-Sun Glare rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Bone Sun rides on: seed the user's words keyed
- read: def 10 / off 16 → 13; sustained 96 (4 × Eldritch Burst); nova none; dmg 96

## Bog Widow (CR 7)
- structure · SOFT · reach: Actions/Bite: reach 10 on a Medium body with no tether word
- read: def 6 / off 7 → 6.5; sustained 45 (3 × Bite); nova none; dmg 45

## Threshold Reeve (CR 6)
- clean
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Tower Shield Tether rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- donor · note · print-row-exception: Actions/Bulwark Rebuke rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33
