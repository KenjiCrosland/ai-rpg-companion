# Mechanics check — step7-twelve-2026-10-12T12-30-16

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 8/8 |
| Pass-Maw Iron | 12 | 2024 | brute-11-charger | ok | SOFT: band, hot | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 5/6 | 6/7 |
| Grandmother Ash | 7 (2014) | 2014 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | FAIL (1) | 5/7 | 7/7 |
| Mirewretch | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Jokulheim | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/9 |
| Thunderherd Warlord | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Rite-Refuser | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/6 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/2 | 2/2 |
| Knife Ball | 2 (2014) | 2014 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Griefjaw | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |

**Dropped 6 of 32 user clauses** (coverage 81%); concept share 69% (47/68 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / bands: 1


## Meshrin (CR 8, 2014)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 8 → 6.5; sustained 51 (3 × Tail Swipe); nova none; dmg 51

## Pass-Maw Iron (CR 12)
- bands · SOFT · band: reads CR 15.5 (print at 12 reads 8–14, n=15)
- bands · SOFT · hot: reads CR 15.5, more than three over — the user's own immunity line drives the defensive read (user-set)
- headerBody · SOFT · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 15 → 15.5; sustained 92 (2 × Gore); nova Shockwave 42; dmg 92

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · aim-dpr: damage 31 a round is 36% under the table's 48
- bands · FAIL · under: reads CR 4 by the DMG method, under print's own reads at 7 (4.5–8.5, n=6)
- donor · note · print-row-exception: Actions/Shard Spray rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Grave Cold rides on: seed the user's words keyed
- read: def 4 / off 4 → 4; sustained 24 (2 × Claw); nova Shard Spray 22; dmg 31

## Mirewretch (CR 1)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

## Jokulheim (CR 20)
- bands · SOFT · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · SOFT · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Snap Freeze); nova Black Ice 76; dmg 204

## Thunderherd Warlord (CR 13)
- clean
- read: def 9 / off 16 → 12.5; sustained 93 (3 × Gore); nova none; dmg 93

## Goblin Warrior (CR 1)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 12 (2 × Scimitar); nova none; dmg 12

## Kraken (CR 24, 2014)
- clean
- bands · note · print-numbers: Kraken's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Storm Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Toxic Ink rides on: print rules row
- read: def 22 / off 15 → 18.5; sustained 68 (2 × Tentacle); nova none; dmg 68

## Rite-Refuser (CR 8)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- clean
- read: def 3 / off 6 → 4.5; sustained 40 (2 × Greatsword); nova none; dmg 40

## Knife Ball (CR 2, 2014)
- clean
- read: def 1/8 / off 2 → 1.0625; sustained 20 (2 × Blade); nova none; dmg 20

## Griefjaw (CR 9)
- clean
- bands · note · user-set: user-set: AC 22 · reads CR 12.5
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98
