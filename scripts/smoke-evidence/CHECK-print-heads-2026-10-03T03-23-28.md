# Mechanics check — print-heads-2026-10-03T03-23-28

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Varrick Von Bluttenburg | 15 | 2024 | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Crimson Bridegroom | 15 (2014) | 2014 | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | soft (1) |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | soft (1) |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Grim Sanguine | 18 | 2024 | caster-21-warpriest | ok | FAIL: hot-offense | ok | ok | ok | ok | ok | FAIL (1) |
| Mortis Rex | 18 (2014) | 2014 | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Suncorpse King | 24 | 2024 | lurker-17 | ok | FAIL: under | ok | ok | ok | ok | ok | FAIL (1) |
| Ossuary Sun | 24 (2014) | 2014 | skirmisher-22 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | SOFT: print-rows | soft (2) |

**Fails by seat and gate:**
- caster-21-warpriest / bands: 1
- lurker-17 / bands: 1


## Varrick Von Bluttenburg (CR 15)
- bands · SOFT · aim-dpr: damage 81 a round is 30% under the card's 115
- bands · SOFT · band: reads CR 11.5 (print at 15 reads 6.5–17.5, n=12)
- derivation · note · dc-float: Actions/Sanguine Command: DC 18 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Actions/Bite: DC 18 sits one off the derived DC (the chassis ±1 float)
- donor · note · print-row-exception: Actions/Sanguine Command rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Bleeding Compass rides on: seed the user's words keyed
- read: def 9 / off 14 → 11.5; sustained 81 (3 × Grave Strike); nova none; dmg 81

## Crimson Bridegroom (CR 15, 2014)
- bands · SOFT · band: reads CR 11.5 (print at 15 reads 6.25–14.5, n=12)
- derivation · note · dc-float: Actions/Crimson Torrent: DC 18 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Actions/Bridal Omen: DC 18 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Actions/Bite: DC 18 sits one off the derived DC (the chassis ±1 float)
- donor · note · print-row-exception: Traits/Sanguine Scent rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Batwings rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Crimson Torrent rides on: the seat the user's words named
- donor · note · print-row-exception: Actions/Bridal Omen rides on: seed the user's words keyed
- read: def 10 / off 13 → 11.5; sustained 57 (3 × Grave Strike); nova Crimson Torrent 71; dmg 85

## Kraken (CR 24)
- gates · SOFT · rider-no-save: Actions/Tentacle: a Restrained rider on every hit with no save
- bands · note · print-numbers: Kraken's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Storm Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Toxic Ink rides on: print rules row
- read: def 22 / off 15 → 18.5; sustained 68 (2 × Tentacle); nova none; dmg 68

## Kraken (CR 24, 2014)
- gates · SOFT · rider-no-save: Actions/Tentacle: a Restrained rider on every hit with no save
- bands · note · print-numbers: Kraken's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Storm Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Toxic Ink rides on: print rules row
- read: def 22 / off 17 → 19.5; sustained 82 (2 × Tentacle); nova none; dmg 82

## Pit Fiend (CR 20)
- clean
- bands · note · print-numbers: Pit Fiend's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Vicious Bite rides on: the legendary tier's kit (print carries none)
- donor · note · print-row-exception: Legendary Actions/Hold the Line rides on: the legendary tier's kit (print carries none)
- donor · note · print-row-exception: Legendary Actions/Repel the Rabble rides on: the legendary tier's kit (print carries none)
- read: def 19 / off 22 → 20.5; sustained 156 (3 × Bite + legendary Vicious Bite); nova none; dmg 156

## Pit Fiend (CR 20, 2014)
- clean
- derivation · note · dc-float: Legendary Actions/Back, Worm: DC 19 sits one off the derived DC (the chassis ±1 float)
- bands · note · print-numbers: Pit Fiend's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Forceful Mace rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Punish Defiance rides on: the legendary tier's kit (print carries none)
- donor · note · print-row-exception: Legendary Actions/Hold the Line rides on: the legendary tier's kit (print carries none)
- donor · note · print-row-exception: Legendary Actions/Back, Worm rides on: the legendary tier's kit (print carries none)
- read: def 19 / off 22 → 20.5; sustained 156 (3 × Bite + legendary Punish Defiance); nova none; dmg 156

## Grim Sanguine (CR 18)
- bands · SOFT · band: reads CR 20 (print at 18 reads 12.5–18.5, n=5)
- bands · FAIL · hot-offense: offense alone reads CR 27, 9 over — past print's own ceiling (the Adult Brass Dragon at +7)
- read: def 13 / off 27 → 20; sustained 260 (2 × Grave Sword + legendary Grave Cleave); nova Dirge Wave 72; dmg 260

## Mortis Rex (CR 18, 2014)
- bands · SOFT · hot-offense: offense alone reads CR 24, 6 over; the HP axis pulls the read to 18.5
- read: def 13 / off 24 → 18.5; sustained 200 (2 × Graveblade + legendary Blade's Echoing Litany); nova Legion Rising 72; dmg 200

## Suncorpse King (CR 24)
- bands · SOFT · aim-dpr: damage 180 a round is 28% under the card's 250
- bands · FAIL · under: effective HP 435 sits under print at CR 24 (468–546, n=5); reads CR 23
- derivation · note · dc-float: Legendary Actions/Disrupt Life: DC 23 sits one off the derived DC (the chassis ±1 float)
- donor · note · print-row-exception: Actions/Bone Ash rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Deathly Teleport rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Disrupt Life rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Frightening Gaze rides on: print rules row
- read: def 21 / off 25 → 23; sustained 180 (3 × Bone Ash + legendary Deathly Teleport); nova none; dmg 180

## Ossuary Sun (CR 24, 2014)
- bands · SOFT · aim-dpr: damage 171 a round is 33% under the table's 255
- bands · SOFT · band: reads CR 22 (print at 24 reads 20.5–24.5, n=5)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Corona Shift
- derivation · note · dc-float: Actions/Opportunist's Lash: DC 21 sits one off the derived DC (the chassis ±1 float)
- derivation · note · dc-float: Legendary Actions/Disrupt Life: DC 21 sits one off the derived DC (the chassis ±1 float)
- donor · note · print-row-exception: Traits/Scouring Mark rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Hurled Debris rides on: print rules row
- donor · note · print-row-exception: Actions/Opportunist's Lash rides on: seed the user's words keyed
- donor · note · print-row-exception: Legendary Actions/Deathly Teleport rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Disrupt Life rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Dread Command rides on: print rules row
- read: def 22 / off 22 → 22; sustained 171 (3 × Eldritch Burst + legendary Deathly Teleport); nova none; dmg 171
