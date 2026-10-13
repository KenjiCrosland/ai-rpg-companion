# Mechanics check — checkin-noauthor-noauthor-2026-10-11T13-54-57

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Marrowlight Plague-Seer | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Thunderlash Herder | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Glacier Wyrm | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 7/9 |
| Solarch Umbra | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 9/12 |

**Dropped 2 of 6 user clauses** (coverage 67%); concept share 71% (25/35 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Bog Hound (CR 1)
- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

## Marrowlight Plague-Seer (CR 8)
- bands · SOFT · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

## Thunderlash Herder (CR 13)
- clean
- read: def 10 / off 16 → 13; sustained 93 (3 × Slashing-Lash); nova none; dmg 93

## Glacier Wyrm (CR 20)
- bands · SOFT · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · SOFT · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Crushing Coil); nova Glacier Breath 76; dmg 204

## Solarch Umbra (CR 24)
- bands · SOFT · aim-dpr: damage 168 a round is 33% under the card's 250
- bands · SOFT · under: effective HP 442 sits under print at CR 24 (468–546, n=5); the read holds at 23, within print's own ±1
- donor · note · print-row-exception: Traits/Bound rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Blighted Ray rides on: print rules row
- donor · note · print-row-exception: Actions/Shadowbrand Mote rides on: seed the user's words keyed
- donor · note · print-row-exception: Legendary Actions/Deathly Teleport rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Disrupt Life rides on: print rules row
- donor · note · print-row-exception: Legendary Actions/Frightening Gaze rides on: print rules row
- read: def 22 / off 24 → 23; sustained 168 (3 × Blighted Ray + legendary Deathly Teleport); nova none; dmg 168
