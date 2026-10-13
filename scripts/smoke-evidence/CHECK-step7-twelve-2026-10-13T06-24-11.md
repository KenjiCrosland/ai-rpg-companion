# Mechanics check — step7-twelve-2026-10-13T06-24-11

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/7 | 7/7 |
| Vault Tender | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 4/7 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | soft (2) | 6/7 | 5/5 |
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Frostmaw Leviathan | 20 | 2024 | brute-17-grappler | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/8 |
| Thunderkin Warden | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Goblin Warrior | 1 | 2024 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Firstborn Debt | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 2/5 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Sunder Roller | 2 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Blackwater Snapper | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |

**Dropped 4 of 32 user clauses** (coverage 88%); concept share 66% (39/59 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Meshrin (CR 8, 2014)
- clean
- read: def 7 / off 8 → 7.5; sustained 52 (2 × Greatsword); nova none; dmg 52

## Vault Tender (CR 12)
- bands · SOFT · band: reads CR 15 (print at 12 reads 8–14, n=15)
- headerBody · SOFT · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 14 → 15; sustained 84 (2 × Gore); nova Scorching Charge 42; dmg 84

## Grandmother Ash (CR 7, 2014)
- bands · SOFT · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Hates Fire
- donor · note · print-row-exception: Actions/Nails rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Noxious Spew rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 42 (2 × Nails); nova Noxious Spew 22; dmg 43

## Bog Hound (CR 1)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

## Frostmaw Leviathan (CR 20)
- bands · SOFT · band: reads CR 22.5 (print at 20 reads 12.5–22.5, n=8)
- bands · SOFT · hot-offense: offense alone reads CR 26, 6 over; the HP axis pulls the read to 22.5
- read: def 19 / off 26 → 22.5; sustained 220 (2 × Jaws + legendary Surge Up); nova none; dmg 220

## Thunderkin Warden (CR 13)
- clean
- read: def 10 / off 16 → 13; sustained 93 (3 × Staff); nova Bludgeoning-Elk Stampede 42; dmg 93

## Goblin Warrior (CR 1)
- clean
- read: def 1/2 / off 1 → 0.75; sustained 9 (1 × Scimitar); nova none; dmg 9

## Kraken (CR 24, 2014)
- clean
- bands · note · print-numbers: Kraken's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Storm Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Toxic Ink rides on: print rules row
- read: def 22 / off 12 → 17; sustained 48 (2 × Tentacle); nova none; dmg 48

## Firstborn Debt (CR 8)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Bludgeoning Touch); nova none; dmg 54

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- clean
- donor · note · print-row-exception: Traits/Avian Panic rides on: seed the user's words keyed
- read: def 4 / off 6 → 5; sustained 40 (2 × Greatsword); nova none; dmg 40

## Sunder Roller (CR 2, 2014)
- clean
- read: def 1/8 / off 2 → 1.0625; sustained 19 (1 × Blades); nova none; dmg 19

## Blackwater Snapper (CR 9)
- clean
- bands · note · user-set: user-set: AC 22 · reads CR 12.5
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98
