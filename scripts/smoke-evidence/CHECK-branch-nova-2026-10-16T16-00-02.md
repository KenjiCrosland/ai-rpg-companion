# Mechanics check — branch-nova-2026-10-16T16-00-02

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Dolorous Peals | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Reliquary Golem | 11 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/2 | 6/6 |
| Rot Cloud Carrier | 8 | 2024 | skirmisher-8-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 6/7 |
| Thunderstone Colossus | 15 | 2024 | brute-13 | ok | FAIL: hot | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 5/5 |
| Thornfold Warden | 7 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/2 | 4/4 |
| Cauldron That Waits | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |

**Dropped 8 of 8 user clauses** (coverage 0%); concept share 96% (26/27 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-13 / bands: 1


## Swarm of Dolorous Peals (CR 13)
- clean
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Clanging Ring); nova none; dmg 90

## Reliquary Golem (CR 11)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Magic Resistance
- bands · note · print-numbers: Stone Golem's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Relic Retribution rides on: seed the user's words keyed
- read: def 11 / off 11 → 11; sustained 66 (2 × Slam); nova none; dmg 66

## Rot Cloud Carrier (CR 8)
- clean
- read: def 5 / off 9 → 7; sustained 45 (3 × Slam); nova Dive Bomb 44; dmg 59

## Thunderstone Colossus (CR 15)
- bands · SOFT · band: reads CR 18.5 (print at 15 reads 7.5–18, n=12)
- bands · FAIL · hot: reads CR 18.5, more than three over
- bands · SOFT · hot-offense: offense alone reads CR 20, 5 over; the HP axis pulls the read to 18.5
- donor · note · print-row-exception: Bonus Actions/Answering Sting rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Ringing Shell rides on: seed the user's words keyed
- read: def 17 / off 20 → 18.5; sustained 88 (2 × Thunderous Slam); nova Whirlwind 71; dmg 124

## Thornfold Warden (CR 7)
- clean
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Shield-Head); nova none; dmg 52

## Cauldron That Waits (CR 9)
- clean
- read: def 7 / off 11 → 9; sustained 62 (2 × Iron Rim); nova Boiling Bogburst 49; dmg 74
