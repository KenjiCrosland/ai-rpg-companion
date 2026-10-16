# Mechanics check — branch-weapons-2026-10-15T14-29-01

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Border Sellsword | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: attack-in-multiattack | FAIL (1) | 1/2 | 3/3 |
| Highway Tollsman | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Deepforge Exile | 6 | 2024 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/5 |
| Quarry Palm | 5 | 2024 | defender-5 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/2 | 5/5 |

**Dropped 2 of 7 user clauses** (coverage 71%); concept share 81% (13/16 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / reader: 1


## Border Sellsword (CR 5)
- reader · FAIL · attack-in-multiattack: Actions/Heavy Crossbow is an attack row the Multiattack never names — a GM who reads the Multiattack never uses it
- donor · note · print-row-exception: Actions/Shortsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Hurled Burst rides on: seed the user's words keyed
- read: def 3 / off 7 → 5; sustained 42 (2 × Shortsword); nova Hurled Burst 28; dmg 47

## Highway Tollsman (CR 7)
- clean
- read: def 6 / off 6 → 6; sustained 44 (2 × Barbed Lance); nova none; dmg 44

## Deepforge Exile (CR 6)
- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Crossbow Butt); nova none; dmg 44

## Quarry Palm (CR 5)
- gates · SOFT · ko-at-will: Actions/Fist: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- donor · note · print-row-exception: Traits/Clinging Grip rides on: seed the user's words keyed
- read: def 4 / off 7 → 5.5; sustained 50 (2 × Fist); nova none; dmg 50
