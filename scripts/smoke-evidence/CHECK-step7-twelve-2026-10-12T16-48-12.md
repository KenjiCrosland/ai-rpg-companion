# Mechanics check — step7-twelve-2026-10-12T16-48-12

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 6/6 |
| Iron Bull | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 4/5 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 6/7 | 5/5 |
| Siltjaw | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Velskaar | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 6/9 |
| Thunderhoof Herdmaster | 13 | 2024 | brute-11-charger | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/3 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Ashborn Seer | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Blade-Drift | 2 (2014) | 2014 | ooze-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |
| Reedmaw the Colossus | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |

**Dropped 1 of 32 user clauses** (coverage 97%); concept share 71% (42/59 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Meshrin (CR 8, 2014)
- bands · SOFT · band: reads CR 5.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Greatsword); nova none; dmg 44

## Iron Bull (CR 12)
- bands · SOFT · band: reads CR 15 (print at 12 reads 8–14, n=15)
- headerBody · SOFT · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 14 → 15; sustained 84 (2 × Gore); nova Tremor 42; dmg 84

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- donor · note · print-row-exception: Traits/Festering Nails rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Nails rides on: the user's own part or feature
- donor · note · print-row-exception: Actions/Noxious Spew rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 42 (2 × Nails); nova Noxious Spew 22; dmg 43

## Siltjaw (CR 1)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

## Velskaar (CR 20)
- bands · SOFT · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · SOFT · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Tail Sweep); nova Rime Breath 76; dmg 204

## Thunderhoof Herdmaster (CR 13)
- clean
- read: def 11 / off 15 → 13; sustained 90 (2 × Antlers); nova none; dmg 90

## Goblin Warrior (CR 1)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 12 (2 × Scimitar); nova none; dmg 12

## Kraken (CR 24, 2014)
- clean
- bands · note · print-numbers: Kraken's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Storm Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Toxic Ink rides on: print rules row
- read: def 22 / off 12 → 17; sustained 48 (2 × Tentacle); nova none; dmg 48

## Ashborn Seer (CR 8)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- clean
- donor · note · print-row-exception: Traits/Phobia rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 40 (2 × Greatsword); nova none; dmg 40

## Blade-Drift (CR 2, 2014)
- clean
- read: def 0 / off 2 → 1; sustained 19 (1 × Shards); nova none; dmg 19

## Reedmaw the Colossus (CR 9)
- clean
- bands · note · user-set: user-set: AC 22 · reads CR 12.5
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98
