# Mechanics check — receipt-ten-2026-10-21T20-55-18

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Vampire | 13 (2014) | 2014 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 10/10 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: lack-honored | ok | FAIL (1) | 0/1 | 8/8 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 6/6 |
| Reliquary Vault-Ooze | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Bonelight Sun Lich | 14 | 2024 | caster-12 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 9/9 |
| Bog Widow | 7 | 2024 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/4 |
| Oathwall Reeve | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 6/6 |

**Dropped 3 of 11 user clauses** (coverage 73%); concept share 97% (57/59 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- dragon-15 / reader: 1


## Hydra (CR 8, 2014)
- clean
- bands · note · print-numbers: Hydra's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Smoking Stumps rides on: seed the user's words keyed
- read: def 8 / off 3 → 5.5; sustained 10 (1 × Bite); nova none; dmg 10

## Stone Golem (CR 10)
- clean
- bands · note · print-numbers: Stone Golem's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Unsteady Ground rides on: seed the user's words keyed
- read: def 11 / off 9 → 10; sustained 48 (2 × Slam); nova none; dmg 48

## Vampire (CR 13, 2014)
- clean
- bands · note · print-numbers: Vampire's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Rooting Surge rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Briar Heart rides on: seed the user's words keyed
- read: def 11 / off 6 → 8.5; sustained 30 (2 × Grave Strike); nova none; dmg 30

## Adult Red Dragon (CR 17, 2014)
- reader · FAIL · lack-honored: the GM asked for an absence — "Adult Red Dragon — blind in one eye from an old lance" — and the sheet still carries it
- bands · note · print-numbers: Adult Red Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Thunder Peal rides on: seed the user's words keyed
- donor · note · print-row-exception: Legendary Actions/Commanding Presence rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Fiery Rays rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Pounce rides on: print rules row
- read: def 14 / off 20 → 17; sustained 108 (3 × Rend + legendary Pounce); nova Fire Breath 59; dmg 111

## Purple Worm (CR 15)
- gates · SOFT · control-aoe-ungated: Actions/Scrap Spray: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- derivation · note · dc-float: Actions/Scrap Spray: DC 21 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Traits/Lodged Armoury: DC 21 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Bonus Actions/Swallow: DC 21 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Bonus Actions/Swallow: DC 21 sits one off the derived DC (the chassis ±1 float)
- bands · note · print-numbers: Purple Worm's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Scrap Spray rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Lodged Armoury rides on: seed the user's words keyed
- read: def 12 / off 11 → 11.5; sustained 51 (1 × Tail Stinger); nova none; dmg 51

## Reliquary Vault-Ooze (CR 9, 2014)
- bands · SOFT · band: reads CR 6.5 (print at 9 reads 5.5–13, n=8)
- read: def 5 / off 8 → 6.5; sustained 56 (2 × Pseudopod); nova none; dmg 56

## Ancient Gold Dragon (CR 24, 2014)
- clean
- donor · note · print-served: "Ancient Gold Dragon" is the SRD 5.1 block, served with no call — the gates that judge authored content do not apply; equality with the corpus is the test
- read: def 26 / off 20 → 23; sustained 80 (3 × Bite + legendary Wing Attack); nova Breath Weapons 71; dmg 101

## Bonelight Sun Lich (CR 14)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Undying Sun
- donor · note · print-row-exception: Actions/Sun Skull rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Withering Glare rides on: seed the user's words keyed
- read: def 10 / off 16 → 13; sustained 96 (4 × Eldritch Burst); nova Sun Skull 24; dmg 96

## Bog Widow (CR 7)
- structure · SOFT · reach: Actions/Barbed Forelimb: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 45 (3 × Barbed Forelimb); nova Clotting Ichor 39; dmg 56

## Oathwall Reeve (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Steadfast Advance
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Aura of Authority rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Longsword rides on: print rules row
- donor · note · print-row-exception: Actions/Tower Shield rides on: template bound on the user's verb
- donor · note · print-row-exception: Reactions/Riposte rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33
