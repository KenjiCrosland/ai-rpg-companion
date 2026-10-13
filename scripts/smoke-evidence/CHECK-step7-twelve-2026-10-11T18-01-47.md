# Mechanics check — step7-twelve-2026-10-11T18-01-47

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | FAIL: adjudicable-mechanic | FAIL (2) | 7/7 | 6/6 |
| Vault Sentinel | 12 | 2024 | brute-11-charger | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | FAIL (1) | 5/6 | 4/8 |
| Grandmother Ash | 7 (2014) | 2014 | lurker-5-phantom | ok | ok | FAIL: duplicate-row | SOFT: control-aoe-ungated | ok | ok | ok | FAIL: adjudicable-target | FAIL (2) | 6/7 | 6/8 |
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Rimeswallower | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense, nova-cap | FAIL: two-novas | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 8/10 |
| Herdmaster Vael | 13 | 2024 | defender-8-leader | ok | ok | FAIL: multiattack-row | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 4/4 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Firstborn Seer | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/4 |
| Knife Ball | 2 (2014) | 2014 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Snapping Turtle | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | SOFT: languages-type | ok | ok | ok | soft (1) | 2/2 | 3/3 |

**Dropped 3 of 32 user clauses** (coverage 91%); concept share 79% (56/71 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-5 / structure: 1
- defender-5 / adjudicability: 1
- brute-11-charger / structure: 1
- lurker-5-phantom / structure: 1
- lurker-5-phantom / adjudicability: 1
- dragon-22 / structure: 1
- defender-8-leader / structure: 1


## Meshrin (CR 8, 2014)
- structure · FAIL · lint:duplicate-entry: Actions/Razor Sharp Claws: identical text to "Greatsword" — two names, one ability; rewrite this entry into something distinct
- adjudicability · FAIL · adjudicable-mechanic: Traits/Fighting Styles Trained: a trait with no rule in it — flavor on a rules row
- read: def 7 / off 8 → 7.5; sustained 52 (2 × Tail Swipe); nova none; dmg 52

## Vault Sentinel (CR 12)
- structure · FAIL · lint:duplicate-entry: Actions/Charge: identical text to "Hooves" — two names, one ability; rewrite this entry into something distinct
- read: def 10 / off 15 → 12.5; sustained 92 (2 × Gore); nova Seismic Slam 42; dmg 92

## Grandmother Ash (CR 7, 2014)
- structure · FAIL · duplicate-row: two rows named "Rotclaw"
- structure · SOFT · lint:duplicate-name: Actions/Rotclaw: two entries in this section share a name — identical copies are dropped; a genuinely different second ability must be renamed
- gates · SOFT · control-aoe-ungated: Actions/Choking Breath: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- adjudicability · FAIL · adjudicable-target: Traits/Fire Hatred: a save whose targets are neither a count nor an area
- read: def 7 / off 6 → 6.5; sustained 42 (2 × Rotclaw); nova Noxious Spew 22; dmg 43

## Bog Hound (CR 1)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

## Rimeswallower (CR 20)
- bands · SOFT · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · SOFT · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- bands · SOFT · nova-cap: Frozen Maw: 97 over the 95 cap
- structure · FAIL · two-novas: two Recharge novas on one sheet: "Freezing Breath" and "Frozen Maw"
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Snapping Jaws); nova Frozen Maw 97; dmg 204

## Herdmaster Vael (CR 13)
- structure · FAIL · multiattack-row: Multiattack names "Thunderhoof", which is not a row
- read: def 10 / off 15 → 12.5; sustained 87 (3 × Goad); nova none; dmg 87

## Goblin Warrior (CR 1)
- clean
- read: def 1/4 / off 1 → 0.625; sustained 12 (2 × Scimitar); nova none; dmg 12

## Kraken (CR 24, 2014)
- clean
- bands · note · print-numbers: Kraken's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Legendary Actions/Storm Bolt rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Toxic Ink rides on: print rules row
- read: def 22 / off 20 → 21; sustained 110 (2 × Tentacle); nova none; dmg 110

## Firstborn Seer (CR 8)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

## Sir Reginald Pemberton-Hughes (CR 5, 2014)
- clean
- read: def 4 / off 4 → 4; sustained 32 (2 × Longsword); nova none; dmg 32

## Knife Ball (CR 2, 2014)
- clean
- read: def 1/8 / off 2 → 1.0625; sustained 20 (2 × Blade); nova none; dmg 20

## Snapping Turtle (CR 9)
- headerBody · SOFT · languages-type: a Beast that speaks (Common)
- bands · note · user-set: user-set: AC 22 · reads CR 12.5
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98
