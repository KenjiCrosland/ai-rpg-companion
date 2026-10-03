# Mechanics check — print-heads-2026-10-03T03-43-15

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Lord Varkos Zhul | 15 | 2024 | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Lord Duskworth | 15 (2014) | 2014 | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Warlord of Rusted Graves | 18 | 2024 | brute-17 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Saint Corvath the Oathsworn | 18 (2014) | 2014 | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Solenne Ossuary | 24 | 2024 | skirmisher-22 | ok | SOFT: aim-dpr | ok | ok | ok | ok | SOFT: print-rows | soft (2) |
| Ossun Sovereign | 24 (2014) | 2014 | skirmisher-22 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | SOFT: print-rows | soft (2) |

**Fails by seat and gate:**
- none


## Lord Varkos Zhul (CR 15)
- bands · SOFT · aim-dpr: damage 81 a round is 30% under the card's 115
- bands · SOFT · band: reads CR 11.5 (print at 15 reads 6.5–17.5, n=12)
- derivation · note · dc-float: Actions/Vampiric Drain: DC 18 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Actions/Bite: DC 18 sits one off the derived DC (the chassis ±1 float)
- donor · note · print-row-exception: Actions/Vampiric Drain rides on: seed the user's words keyed
- read: def 9 / off 14 → 11.5; sustained 81 (3 × Grave Strike); nova none; dmg 81

## Lord Duskworth (CR 15, 2014)
- bands · SOFT · band: reads CR 11.5 (print at 15 reads 6.25–14.5, n=12)
- derivation · note · dc-float: Actions/Cursed Blood Tide: DC 18 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Actions/Bite: DC 18 sits one off the derived DC (the chassis ±1 float)
- donor · note · print-row-exception: Traits/Wound-Drinking Dark rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Sidestep rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Cursed Blood Tide rides on: the seat the user's words named
- read: def 10 / off 13 → 11.5; sustained 57 (3 × Grave Strike); nova Cursed Blood Tide 71; dmg 85

## Kraken (CR 24)
- clean
- bands · note · print-numbers: Kraken's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Storm Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Toxic Ink rides on: print rules row
- read: def 22 / off 22 → 22; sustained 118 (2 × Tentacle); nova none; dmg 118

## Kraken (CR 24, 2014)
- clean
- bands · note · print-numbers: Kraken's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Storm Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Toxic Ink rides on: print rules row
- read: def 22 / off 17 → 19.5; sustained 82 (2 × Tentacle); nova none; dmg 82

## Pit Fiend (CR 20)
- clean
- bands · note · print-numbers: Pit Fiend's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Force Mace rides on: print rules row
- donor · note · print-row-exception: Actions/Necrotic Claw rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Answering Stroke rides on: the legendary tier's kit (print carries none)
- donor · note · print-row-exception: Legendary Actions/Lock Shields rides on: the legendary tier's kit (print carries none)
- donor · note · print-row-exception: Legendary Actions/Break Ranks rides on: the legendary tier's kit (print carries none)
- read: def 19 / off 22 → 20.5; sustained 156 (3 × Bite + legendary Answering Stroke); nova none; dmg 156

## Pit Fiend (CR 20, 2014)
- clean
- derivation · note · dc-float: Legendary Actions/Legion Shove: DC 19 sits one off the derived DC (the chassis ±1 float)
- bands · note · print-numbers: Pit Fiend's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Pit Counter rides on: the legendary tier's kit (print carries none)
- donor · note · print-row-exception: Legendary Actions/Iron Bulwark rides on: the legendary tier's kit (print carries none)
- donor · note · print-row-exception: Legendary Actions/Legion Shove rides on: the legendary tier's kit (print carries none)
- read: def 19 / off 22 → 20.5; sustained 156 (3 × Bite + legendary Pit Counter); nova none; dmg 156

## Warlord of Rusted Graves (CR 18)
- bands · SOFT · band: reads CR 21 (print at 18 reads 12.5–18.5, n=5)
- bands · SOFT · hot-offense: offense alone reads CR 25, 7 over; the HP axis pulls the read to 21
- derivation · note · dc-float: Actions/Damned Legion's Advance: DC 20 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Actions/Rusted Grasp: DC 20 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Legendary Actions/Gravequake: DC 20 sits one off the derived DC (the chassis ±1 float)
- read: def 17 / off 25 → 21; sustained 205 (2 × Grave-Iron Greatsword + legendary Sepulchral Charge); nova Damned Legion's Advance 72; dmg 205

## Saint Corvath the Oathsworn (CR 18, 2014)
- bands · SOFT · hot-offense: offense alone reads CR 24, 6 over; the HP axis pulls the read to 18.5
- read: def 13 / off 24 → 18.5; sustained 200 (2 × Blackened Greatsword + legendary Sword Stroke); nova Unholy Pyre 72; dmg 200

## Solenne Ossuary (CR 24)
- bands · SOFT · aim-dpr: damage 141 a round is 44% under the card's 250
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Throne Drift
- derivation · note · dc-float: Legendary Actions/Disrupt Life: DC 23 sits one off the derived DC (the chassis ±1 float)
- donor · note · print-row-exception: Traits/Duskward Veil rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Solar Flare rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Deathly Teleport rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Disrupt Life rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Frightening Gaze rides on: print rules row
- read: def 24 / off 23 → 23.5; sustained 141 (3 × Solar Flare + legendary Deathly Teleport); nova none; dmg 141

## Ossun Sovereign (CR 24, 2014)
- bands · SOFT · aim-dpr: damage 153 a round is 40% under the table's 255
- bands · SOFT · band: reads CR 21.5 (print at 24 reads 20.5–24.5, n=5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Orbit Shift
- derivation · note · dc-float: Legendary Actions/Disrupt Life: DC 21 sits one off the derived DC (the chassis ±1 float)
- donor · note · print-row-exception: Actions/Bone Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Deathly Teleport rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Disrupt Life rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Frightening Gaze rides on: print rules row
- read: def 22 / off 21 → 21.5; sustained 153 (3 × Bone Bolt + legendary Deathly Teleport); nova none; dmg 153
