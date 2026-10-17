# Mechanics check — branch-nova-2026-10-16T15-45-50

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Bell Chorus | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Cinder Reliquary | 11 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/2 | 6/6 |
| Gravebloat Carrion | 8 | 2024 | skirmisher-8-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/6 |
| Thundercrash Juggernaut | 15 | 2024 | brute-13 | ok | FAIL: hot | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/2 | 3/3 |
| Thornfold Warden | 7 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/4 |
| Drowned Cookpot | 9 | 2024 | brute-8-grappler | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 1/4 |

**Dropped 7 of 9 user clauses** (coverage 22%); concept share 68% (17/25 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-13 / bands: 1


## Swarm of Bell Chorus (CR 13)
- clean
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Bone Toll); nova none; dmg 90

## Cinder Reliquary (CR 11)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Magic Resistance
- bands · note · print-numbers: Stone Golem's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Cinder Revenge rides on: seed the user's words keyed
- read: def 11 / off 11 → 11; sustained 66 (2 × Slam); nova none; dmg 66

## Gravebloat Carrion (CR 8)
- clean
- read: def 6 / off 9 → 7.5; sustained 45 (3 × Claw); nova Plummeting Snatch 44; dmg 59

## Thundercrash Juggernaut (CR 15)
- bands · SOFT · band: reads CR 18.5 (print at 15 reads 7.5–18, n=12)
- bands · FAIL · hot: reads CR 18.5, more than three over
- bands · SOFT · hot-offense: offense alone reads CR 20, 5 over; the HP axis pulls the read to 18.5
- read: def 17 / off 20 → 18.5; sustained 88 (2 × Thunderous Slam); nova Whirlwind 71; dmg 124

## Thornfold Warden (CR 7)
- clean
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Hide-Shield Bash); nova none; dmg 52

## Drowned Cookpot (CR 9)
- structure · SOFT · reach: Actions/Slam: reach 10 on a Medium body with no tether word
- read: def 7 / off 9 → 8; sustained 62 (2 × Slam); nova none; dmg 62
