# Mechanics check — step7-twelve-2026-10-12T14-06-52

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 7/7 |
| Vault Sentinel | 12 | 2024 | brute-11-charger | ok | SOFT: band, hot | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | soft (2) | 6/7 | 7/7 |
| Drowned Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Rimevault | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/9 |
| Storm-Herder | 13 | 2024 | brute-11-charger | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Graveborn Seer | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 3/5 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Knife Ball | 2 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Mudmaw | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |

**Dropped 2 of 32 user clauses** (coverage 94%); concept share 78% (52/67 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Meshrin (CR 8, 2014)
- bands · SOFT · band: reads CR 5.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Tail Swipe); nova none; dmg 44

## Vault Sentinel (CR 12)
- bands · SOFT · band: reads CR 15.5 (print at 12 reads 8–14, n=15)
- bands · SOFT · hot: reads CR 15.5, more than three over — the user's own immunity line drives the defensive read (user-set)
- headerBody · SOFT · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 15 → 15.5; sustained 92 (2 × Gore); nova Shockwave 42; dmg 92

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · band: reads CR 5.5 (print at 7 reads 4.5–8.5, n=6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Nails
- donor · note · print-row-exception: Traits/Rotting Nails rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Noxious Spew rides on: seed the user's words keyed
- read: def 4 / off 7 → 5.5; sustained 50 (2 × Nails); nova Noxious Spew 22; dmg 50

## Drowned Hound (CR 1)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

## Rimevault (CR 20)
- bands · SOFT · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · SOFT · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Jaws + legendary Snapping Maw); nova Freezing Breath 76; dmg 204

## Storm-Herder (CR 13)
- clean
- read: def 11 / off 15 → 13; sustained 90 (2 × Antler); nova none; dmg 90

## Goblin Warrior (CR 1)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 12 (2 × Scimitar); nova none; dmg 12

## Kraken (CR 24, 2014)
- clean
- bands · note · print-numbers: Kraken's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Storm Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Toxic Ink rides on: print rules row
- read: def 22 / off 15 → 18.5; sustained 68 (2 × Tentacle); nova none; dmg 68

## Graveborn Seer (CR 8)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- clean
- donor · note · print-row-exception: Traits/Phobia rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 40 (2 × Greatsword); nova none; dmg 40

## Knife Ball (CR 2, 2014)
- bands · SOFT · aim-dpr: damage 14 a round is 22% under the table's 18
- bands · SOFT · band: reads CR 0.625 (print at 2 reads 0.125–2.5, n=43)
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Blade); nova Knife Volley 11; dmg 14

## Mudmaw (CR 9)
- clean
- bands · note · user-set: user-set: AC 22 · reads CR 12.5
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98
