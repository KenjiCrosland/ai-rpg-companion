# Mechanics check — branch-weapons2-2026-10-15T14-32-43

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pensionless Fusilier | 6 | 2024 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/4 |
| Pensionless Sellsword | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: attack-in-multiattack | FAIL (1) | 1/2 | 2/3 |

**Dropped 1 of 4 user clauses** (coverage 75%); concept share 57% (4/7 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / reader: 1


## Pensionless Fusilier (CR 6)
- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Crossbow Stock); nova none; dmg 44

## Pensionless Sellsword (CR 5)
- reader · FAIL · attack-in-multiattack: Actions/Heavy Crossbow is an attack row the Multiattack never names — a GM who reads the Multiattack never uses it
- donor · note · print-row-exception: Actions/Shortsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Volley of Blades rides on: seed the user's words keyed
- read: def 3 / off 7 → 5; sustained 42 (2 × Shortsword); nova Volley of Blades 28; dmg 47
