# Mechanics check — dameoriel-2026-10-17T00-00-36

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | 2024 | defender-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 4/5 |
| Master Duellist Vael | 5 | 2024 | defender-5 | ok | SOFT: band | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 1/5 |
| Sir Aldric | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |

**Dropped 2 of 4 user clauses** (coverage 50%); concept share 50% (7/14 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-5 / structure: 1


## Dame Oriel (CR 5)
- bands · SOFT · band: reads CR 3.5 (print at 5 reads 2–8.5, n=52)
- read: def 2 / off 5 → 3.5; sustained 34 (2 × Longsword); nova none; dmg 34

## Master Duellist Vael (CR 5)
- bands · SOFT · band: reads CR 3.5 (print at 5 reads 2–8.5, n=52)
- structure · FAIL · lint:duplicate-entry: Actions/Main-Gauche: identical text to "Rapier" — two names, one ability; rewrite this entry into something distinct
- read: def 2 / off 5 → 3.5; sustained 34 (2 × Rapier); nova none; dmg 34

## Sir Aldric (CR 7)
- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Sword); nova none; dmg 52
