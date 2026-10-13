# Mechanics check — step7-twelve-2026-10-13T16-49-30

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | FAIL: engine-needs-key | FAIL (1) | 7/7 | 8/8 |
| Vulkaros the Steam Bull | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 5/7 | 4/4 |
| Mire Fang | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Heart-of-Floe | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/9 |
| Storm-Herd Warlord | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Birthright Hex | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Knife Ball | 2 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Ollumaw | 9 | 2024 | brute-9 | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |

**Dropped 2 of 32 user clauses** (coverage 94%); concept share 68% (45/66 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5 / reader: 1


## Meshrin (CR 8, 2014)
- bands · SOFT · band: reads CR 5.5 (print at 8 reads 2–8.5, n=10)
- reader · FAIL · engine-needs-key: Actions/none: a grapple or engulf engine with no key in the words
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Greatsword); nova none; dmg 44

## Vulkaros the Steam Bull (CR 12)
- bands · SOFT · band: reads CR 15 (print at 12 reads 8–14, n=15)
- headerBody · SOFT · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 14 → 15; sustained 84 (2 × Gore); nova Shockwave 42; dmg 84

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- donor · note · print-row-exception: Actions/Nails rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Noxious Spew rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 42 (2 × Nails); nova Noxious Spew 22; dmg 43

## Mire Fang (CR 1)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

## Heart-of-Floe (CR 20)
- bands · SOFT · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · SOFT · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Lunge); nova Rime Breath 76; dmg 204

## Storm-Herd Warlord (CR 13)
- clean
- read: def 10 / off 16 → 13; sustained 93 (3 × Antlered Slam); nova none; dmg 93

## Goblin Warrior (CR 1)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 12 (2 × Scimitar); nova none; dmg 12

## Kraken (CR 24, 2014)
- clean
- bands · note · print-numbers: Kraken's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Storm Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Toxic Ink rides on: print rules row
- read: def 22 / off 12 → 17; sustained 48 (2 × Tentacle); nova none; dmg 48

## Birthright Hex (CR 8)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Scalpel); nova none; dmg 54

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- clean
- donor · note · print-row-exception: Traits/Phobia rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 40 (2 × Greatsword); nova none; dmg 40

## Knife Ball (CR 2, 2014)
- bands · SOFT · aim-dpr: damage 14 a round is 22% under the table's 18
- bands · SOFT · band: reads CR 0.625 (print at 2 reads 0.125–2.5, n=43)
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Edge); nova Blade Ring 11; dmg 14

## Ollumaw (CR 9)
- clean
- bands · note · user-set: user-set: AC 22 · reads CR 12.5
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98
