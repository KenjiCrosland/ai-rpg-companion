# Mechanics check — branch-verify-2026-10-15T14-01-40

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vespera Vaunt | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Keypicked Imp | 4 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Herdmaster of the Storm-Plains | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Thundertide Oathsworn | 8 | 2024 | caster-2-warpriest | FAIL: attack-stat | SOFT: band | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/2 | 4/6 |

**Dropped 2 of 5 user clauses** (coverage 60%); concept share 85% (17/20 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / bands: 1
- caster-2-warpriest / derivation: 1


## Vespera Vaunt (CR 5)
- bands · SOFT · aim-hp: HP 65 is 28% under the card's 90
- bands · FAIL · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3.5
- read: def 1 / off 6 → 3.5; sustained 42 (2 × Shortsword); nova none; dmg 42

## Keypicked Imp (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- donor · note · print-row-exception: Bonus Actions/Nimble Escape rides on: the user's own part, feature or species
- read: def 1 / off 4 → 2.5; sustained 30 (2 × Sting); nova none; dmg 30

## Herdmaster of the Storm-Plains (CR 5)
- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Staff); nova none; dmg 34

## Thundertide Oathsworn (CR 8)
- derivation · FAIL · attack-stat: Lightning Bolt: +8 derives from STR, but an attack row rolls DEX
- bands · SOFT · band: reads CR 6 (print at 8 reads 2–10.5, n=24)
- read: def 4 / off 8 → 6; sustained 52 (2 × Greatsword); nova none; dmg 52
