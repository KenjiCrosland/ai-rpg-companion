# Mechanics check — section1-probe-2026-10-21T04-09-35

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Adult Red Dragon | 17 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 9/9 |
| Adult Red Dragon | 17 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: lack-honored | ok | FAIL (1) | 0/1 | 7/7 |
| Adult Red Dragon | 17 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 9/9 |
| Adult Red Dragon | 17 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 8/8 |
| Adult Red Dragon | 17 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 9/9 |
| Vampire | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 10/10 |
| Vampire | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 10/10 |
| Vampire | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Vampire | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Vampire | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Ossuary Sun | 14 | 2024 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Bone-Sun Lich | 14 | 2024 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Charnel Regent | 14 | 2024 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/8 |
| Pyre-Enthroned Cadaver | 14 | 2024 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Eclipse Necrolith | 14 | 2024 | caster-12 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/8 |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Meshrin | 8 | 2024 | brute-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/3 |
| Meshrin | 8 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/2 |
| Meshrin | 8 | 2024 | defender-8-leader | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/5 |
| Meshrin | 8 | 2024 | defender-8-leader | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/5 |
| Meshrin | 8 | 2024 | brute-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/2 |
| Rimebound Colossus | 12 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/3 |
| Glacier-Hearted Juggernaut | 12 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/3 |
| Rimewake Juggernaut | 12 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/2 |
| Morvask the Coldpath | 12 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/2 |
| Hoarfrost Warden | 12 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/2 |

**Dropped 13 of 30 user clauses** (coverage 57%); concept share 90% (161/179 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- dragon-15 / reader: 1


## Adult Red Dragon (CR 17)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sight Weakness
- bands · note · print-numbers: Adult Red Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Heat-Sight rides on: seed the user's words keyed
- donor · note · print-row-exception: Legendary Actions/Commanding Presence rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Fiery Rays rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Pounce rides on: print rules row
- read: def 14 / off 20 → 17; sustained 108 (3 × Rend + legendary Pounce); nova Fire Breath 59; dmg 111

## Adult Red Dragon (CR 17)
- reader · FAIL · lack-honored: the GM asked for an absence — "Adult Red Dragon — blind in one eye from an old lance" — and the sheet still carries it
- bands · note · print-numbers: Adult Red Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Commanding Presence rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Fiery Rays rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Pounce rides on: print rules row
- read: def 14 / off 20 → 17; sustained 108 (3 × Rend + legendary Pounce); nova Fire Breath 59; dmg 111

## Adult Red Dragon (CR 17)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sight Weakness
- bands · note · print-numbers: Adult Red Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Weapon Lodging rides on: seed the user's words keyed
- donor · note · print-row-exception: Legendary Actions/Commanding Presence rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Fiery Rays rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Pounce rides on: print rules row
- read: def 14 / off 20 → 17; sustained 108 (3 × Rend + legendary Pounce); nova Fire Breath 59; dmg 111

## Adult Red Dragon (CR 17)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sight Weakness
- bands · note · print-numbers: Adult Red Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Commanding Presence rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Fiery Rays rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Pounce rides on: print rules row
- read: def 14 / off 20 → 17; sustained 108 (3 × Rend + legendary Pounce); nova Fire Breath 59; dmg 111

## Adult Red Dragon (CR 17)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sight Weakness
- bands · note · print-numbers: Adult Red Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Lodged Steel rides on: seed the user's words keyed
- donor · note · print-row-exception: Legendary Actions/Commanding Presence rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Fiery Rays rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Pounce rides on: print rules row
- read: def 14 / off 20 → 17; sustained 108 (3 × Rend + legendary Pounce); nova Fire Breath 59; dmg 111

## Vampire (CR 13)
- clean
- bands · note · print-numbers: Vampire's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Thorn Harvest rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Briar Mantle rides on: seed the user's words keyed
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova Thorn Harvest 31; dmg 30

## Vampire (CR 13)
- clean
- bands · note · print-numbers: Vampire's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Thorn Tether rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Thorn Garden rides on: seed the user's words keyed
- read: def 11 / off 6 → 8.5; sustained 30 (2 × Grave Strike); nova none; dmg 30

## Vampire (CR 13)
- clean
- bands · note · print-numbers: Vampire's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Bloodthorn Garden rides on: seed the user's words keyed
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova none; dmg 30

## Vampire (CR 13)
- clean
- bands · note · print-numbers: Vampire's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova none; dmg 30

## Vampire (CR 13)
- clean
- bands · note · print-numbers: Vampire's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Thorn Garden's Hunger rides on: seed the user's words keyed
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova none; dmg 30

## Ossuary Sun (CR 14)
- clean
- donor · note · print-row-exception: Actions/Ossuary Ring rides on: seed the user's words keyed
- read: def 10 / off 16 → 13; sustained 96 (4 × Eldritch Burst); nova Ossuary Ring 24; dmg 96

## Bone-Sun Lich (CR 14)
- clean
- read: def 10 / off 16 → 13; sustained 96 (4 × Eldritch Burst); nova none; dmg 96

## Charnel Regent (CR 14)
- clean
- donor · note · print-row-exception: Traits/Coronal Backlash rides on: seed the user's words keyed
- donor · note · print-row-exception: Bonus Actions/Bone Sun Field rides on: seed the user's words keyed
- read: def 10 / off 16 → 13; sustained 96 (4 × Eldritch Burst); nova none; dmg 96

## Pyre-Enthroned Cadaver (CR 14)
- clean
- donor · note · print-row-exception: Actions/Corona Splinter rides on: seed the user's words keyed
- read: def 10 / off 16 → 13; sustained 96 (4 × Eldritch Burst); nova Corona Splinter 24; dmg 96

## Eclipse Necrolith (CR 14)
- bands · SOFT · hot-offense: offense alone reads CR 20, 6 over; the HP axis pulls the read to 15
- donor · note · print-row-exception: Actions/Eclipse Splinter rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Splinter Throne rides on: seed the user's words keyed
- read: def 10 / off 20 → 15; sustained 124 (4 × Eldritch Burst); nova Eclipse Splinter 24; dmg 124

## Hydra (CR 8)
- clean
- bands · note · print-numbers: Hydra's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Noxious Vapor rides on: seed the user's words keyed
- read: def 8 / off 5 → 6.5; sustained 10 (1 × Bite); nova Noxious Vapor 27; dmg 25

## Hydra (CR 8)
- clean
- bands · note · print-numbers: Hydra's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Choking Reek rides on: seed the user's words keyed
- read: def 8 / off 5 → 6.5; sustained 10 (1 × Bite); nova Choking Reek 27; dmg 25

## Hydra (CR 8)
- clean
- bands · note · print-numbers: Hydra's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Choking Stumps rides on: seed the user's words keyed
- read: def 8 / off 3 → 5.5; sustained 10 (1 × Bite); nova none; dmg 10

## Hydra (CR 8)
- clean
- bands · note · print-numbers: Hydra's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Head Slam rides on: seed the user's words keyed
- read: def 8 / off 3 → 5.5; sustained 10 (1 × Bite); nova none; dmg 10

## Hydra (CR 8)
- clean
- bands · note · print-numbers: Hydra's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Scalding Stumps rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Burning Blood rides on: seed the user's words keyed
- read: def 8 / off 5 → 6.5; sustained 10 (1 × Bite); nova Scalding Stumps 27; dmg 25

## Meshrin (CR 8)
- gates · SOFT · control-aoe-ungated: Actions/Dread Bellow: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 6 / off 8 → 7; sustained 50 (2 × Claw); nova Thunder Burst 27; dmg 51

## Meshrin (CR 8)
- clean
- read: def 6 / off 9 → 7.5; sustained 45 (3 × Talons); nova Splintering Roar 44; dmg 59

## Meshrin (CR 8)
- gates · SOFT · control-aoe-ungated: Actions/Splintering Roar: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 6 / off 8 → 7; sustained 54 (3 × Bone Spur); nova none; dmg 54

## Meshrin (CR 8)
- gates · SOFT · control-aoe-ungated: Actions/Dread Roar: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 6 / off 8 → 7; sustained 54 (3 × Iron Fist); nova Riveted Roar 18; dmg 54

## Meshrin (CR 8)
- gates · SOFT · control-aoe-ungated: Actions/Field-Owner's Bellow: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 6 / off 8 → 7; sustained 54 (2 × Claw); nova none; dmg 54

## Rimebound Colossus (CR 12)
- clean
- read: def 10 / off 14 → 12; sustained 84 (2 × Slam); nova Glacial Plough 42; dmg 84

## Glacier-Hearted Juggernaut (CR 12)
- clean
- read: def 10 / off 14 → 12; sustained 80 (2 × Slam); nova Glacial Plow-Through 42; dmg 81

## Rimewake Juggernaut (CR 12)
- clean
- read: def 10 / off 14 → 12; sustained 80 (2 × Slam); nova Glacier Plough 42; dmg 81

## Morvask the Coldpath (CR 12)
- clean
- read: def 10 / off 14 → 12; sustained 80 (2 × Slam); nova Glacier Plough 42; dmg 81

## Hoarfrost Warden (CR 12)
- clean
- read: def 10 / off 14 → 12; sustained 80 (2 × Fist); nova Glacier Plough 42; dmg 81
