# Mechanics check — branch-nova-2026-10-16T09-01-05

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Deathknell Processions | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Consecrated Reliquary Golem | 11 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/2 | 7/7 |

**Dropped 1 of 3 user clauses** (coverage 67%); concept share 100% (9/9 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Swarm of Deathknell Processions (CR 13)
- clean
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Ringing Bell); nova none; dmg 90

## Consecrated Reliquary Golem (CR 11)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Magic Resistance
- bands · note · print-numbers: Stone Golem's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Retributive Radiance rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Sealbreak Burst rides on: seed the user's words keyed
- read: def 11 / off 12 → 11.5; sustained 66 (2 × Slam); nova Sealbreak Burst 39; dmg 70
