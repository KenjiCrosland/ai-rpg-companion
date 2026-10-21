# Mechanics check — receipt-ten-2026-10-21T21-00-40

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 10/10 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 10/10 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Reliquary Ooze | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 4/5 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Bone Sun Lich | 14 | 2024 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Bog Widow | 7 | 2024 | brute-5-regenerator | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 4/5 |
| Oathbound Toll Reeve | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 6/6 |

**Dropped 4 of 11 user clauses** (coverage 64%); concept share 97% (58/60 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Hydra (CR 8, 2014)
- clean
- bands · note · print-numbers: Hydra's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Choking Haze rides on: seed the user's words keyed
- read: def 8 / off 3 → 5.5; sustained 10 (1 × Bite); nova none; dmg 10

## Stone Golem (CR 10)
- clean
- bands · note · print-numbers: Stone Golem's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Weeping Saint's Wail rides on: seed the user's words keyed
- read: def 11 / off 9 → 10; sustained 48 (2 × Slam); nova Weeping Saint's Wail 35; dmg 55

## Vampire (CR 13, 2014)
- clean
- bands · note · print-numbers: Vampire's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Thorn Binding rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Thorn Mark rides on: seed the user's words keyed
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova Thorn Binding 13; dmg 30

## Adult Red Dragon (CR 17, 2014)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sight Weakness
- bands · note · print-numbers: Adult Red Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Keen Senses rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Searing Lash rides on: seed the user's words keyed
- donor · note · print-row-exception: Legendary Actions/Commanding Presence rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Fiery Rays rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Pounce rides on: print rules row
- read: def 14 / off 20 → 17; sustained 108 (3 × Rend + legendary Pounce); nova Fire Breath 59; dmg 111

## Purple Worm (CR 15)
- clean
- derivation · note · dc-float: Actions/Gullet Storm: DC 21 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Actions/Gullet Storm: DC 21 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Bonus Actions/Swallow: DC 21 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Bonus Actions/Swallow: DC 21 sits one off the derived DC (the chassis ±1 float)
- bands · note · print-numbers: Purple Worm's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Gullet Storm rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Shrapnel Hide rides on: seed the user's words keyed
- read: def 12 / off 11 → 11.5; sustained 51 (1 × Tail Stinger); nova none; dmg 51

## Reliquary Ooze (CR 9, 2014)
- bands · SOFT · band: reads CR 6 (print at 9 reads 5.5–13, n=8)
- read: def 4 / off 8 → 6; sustained 54 (2 × Pseudopod); nova none; dmg 54

## Ancient Gold Dragon (CR 24, 2014)
- clean
- donor · note · print-served: "Ancient Gold Dragon" is the SRD 5.1 block, served with no call — the gates that judge authored content do not apply; equality with the corpus is the test
- read: def 26 / off 20 → 23; sustained 80 (3 × Bite + legendary Wing Attack); nova Breath Weapons 71; dmg 101

## Bone Sun Lich (CR 14)
- clean
- donor · note · print-row-exception: Traits/Bone Sun rides on: seed the user's words keyed
- read: def 10 / off 16 → 13; sustained 96 (4 × Eldritch Burst); nova none; dmg 96

## Bog Widow (CR 7)
- clean
- read: def 6 / off 7 → 6.5; sustained 45 (3 × Fangs); nova none; dmg 45

## Oathbound Toll Reeve (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Rooted Stance
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Unyielding Bulwark rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- donor · note · print-row-exception: Reactions/Riposte rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33
