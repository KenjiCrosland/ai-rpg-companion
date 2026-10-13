# Mechanics check — checkin-twelve-2026-10-11T13-51-05

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Adult Green Dragon | 15 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Pit Fiend | 20 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 10/10 |
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Glass-Eyed Hermit | 3 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Scourge of Firstborn | 8 | 2024 | caster-8-binder | ok | ok | ok | SOFT: rider-no-save, rider-no-save | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Storm-Herder | 13 | 2024 | brute-11-charger | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/2 |
| Glacier Wyrm | 20 | 2024 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/7 |
| Sunbound Archlich | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | ok | ok | ok | SOFT: print-rows | ok | soft (2) | 1/1 | 12/12 |

**Dropped 1 of 13 user clauses** (coverage 92%); concept share 91% (63/69 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Goblin Warrior (CR 1, 2014)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Scimitar); nova none; dmg 10

## Owlbear (CR 3, 2014)
- clean
- bands · note · print-numbers: Owlbear's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 1/2 / off 4 → 2.25; sustained 26 (1 × Rend); nova none; dmg 26

## Troll (CR 5, 2014)
- clean
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 3 / off 5 → 4; sustained 34 (2 × Rend); nova none; dmg 34

## Adult Green Dragon (CR 15, 2014)
- clean
- bands · note · print-numbers: Adult Green Dragon's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Mind Invasion rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Noxious Miasma rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Pounce rides on: print rules row
- read: def 11 / off 23 → 17; sustained 186 (3 × Rend + legendary Pounce); nova Poison Breath 71; dmg 186

## Kraken (CR 24, 2014)
- clean
- bands · note · print-numbers: Kraken's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Storm Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Toxic Ink rides on: print rules row
- read: def 22 / off 15 → 18.5; sustained 68 (2 × Tentacle); nova none; dmg 68

## Pit Fiend (CR 20, 2014)
- clean
- bands · note · print-numbers: Pit Fiend's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Brutal Charge rides on: the legendary tier's kit (print carries none)
- donor · note · print-row-exception: Legendary Actions/Trampling Stomp rides on: the legendary tier's kit (print carries none)
- read: def 19 / off 19 → 19; sustained 110 (2 × Bite + legendary Brutal Charge); nova none; dmg 110

## Bog Hound (CR 1)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Mud-Drag Bite); nova none; dmg 12

## Glass-Eyed Hermit (CR 3)
- clean
- read: def 1 / off 4 → 2.5; sustained 24 (2 × Glass-Cut Stare); nova Lantern Shatter 17; dmg 27

## Scourge of Firstborn (CR 8)
- gates · SOFT · rider-no-save: Actions/Curse-Touch: a Frightened rider on every hit with no save
- gates · SOFT · rider-no-save: Actions/Plague-Sight: a Frightened rider on every hit with no save
- read: def 5 / off 9 → 7; sustained 57 (3 × Plague-Sight); nova none; dmg 57

## Storm-Herder (CR 13)
- structure · SOFT · reach: Actions/Storm Stampede: reach 10 on a Medium body with no tether word
- read: def 11 / off 16 → 13.5; sustained 100 (2 × Storm Stampede); nova none; dmg 100

## Glacier Wyrm (CR 20)
- clean
- read: def 19 / off 22 → 20.5; sustained 156 (3 × Devouring Maw + legendary Fanged Lunge); nova Sea-Freezing Breath 60; dmg 156

## Sunbound Archlich (CR 24)
- bands · SOFT · aim-dpr: damage 168 a round is 33% under the card's 250
- bands · SOFT · under: effective HP 442 sits under print at CR 24 (468–546, n=5); the read holds at 23, within print's own ±1
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Bound Dead of the Kingdom
- donor · note · print-row-exception: Traits/Crown's Afterglow rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Solaflare rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Deathly Teleport rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Disrupt Life rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Frightening Gaze rides on: print rules row
- read: def 22 / off 24 → 23; sustained 168 (3 × Solaflare + legendary Deathly Teleport); nova none; dmg 168
