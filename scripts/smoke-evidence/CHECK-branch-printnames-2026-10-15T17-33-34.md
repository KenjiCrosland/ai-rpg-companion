# Mechanics check — branch-printnames-2026-10-15T17-33-34

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathsworn Bulwark | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |
| Reef Spine Stalker | 4 | 2024 | skirmisher-3 | ok | ok | FAIL: dangling-ref, lint:undefined-attack-ref | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 2/4 |
| Starving Winter Pack Wolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Sergeant Halloway | 3 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |

**Dropped 1 of 5 user clauses** (coverage 80%); concept share 83% (10/12 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / structure: 1


## Oathsworn Bulwark (CR 7)
- clean
- read: def 6 / off 6 → 6; sustained 44 (2 × Broken Greatsword); nova none; dmg 44

## Reef Spine Stalker (CR 4)
- structure · FAIL · dangling-ref: Bonus Actions/Blood Frenzy makes a "Slam" attack, which is not a row
- structure · FAIL · lint:undefined-attack-ref: Bonus Actions/Blood Frenzy (1/Day) references a "Slam" attack that is not defined anywhere in the statblock
- read: def 2 / off 4 → 3; sustained 26 (2 × Barbed Spear); nova none; dmg 26

## Starving Winter Pack Wolf (CR 3)
- clean
- donor · note · print-row-exception: Bonus Actions/Pack Hunt rides on: seed the user's words keyed
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

## Sergeant Halloway (CR 3)
- clean
- bands · note · print-numbers: Warrior Veteran's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Greatsword); nova none; dmg 24
