# Mechanics check — branch-collisions-2026-10-16T05-18-25

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sir Aldric | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | FAIL (1) | 0/1 | 2/4 |
| Wall Remembers | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/4 |
| Gorehowl the Unchained | 8 | 2024 | brute-5 | SOFT: duplicate-mechanic | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (2) | 0/1 | 3/6 |
| Palm of Still Water | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Voidblade Shade | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 1/7 |
| Gilded Crypt-Bloom | 9 | 2024 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/1 | 3/5 |

**Dropped 4 of 8 user clauses** (coverage 50%); concept share 44% (14/32 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-5 / reader: 1


## Sir Aldric (CR 7)
- reader · FAIL · multiattack-integrity: Multiattack's attack slot names "Shield", which is not an attack row on this sheet
- read: def 6 / off 8 → 7; sustained 52 (2 × Mace); nova none; dmg 52

## Wall Remembers (CR 7)
- clean
- read: def 6 / off 6 → 6; sustained 44 (2 × Broken Greatsword); nova none; dmg 44

## Gorehowl the Unchained (CR 8)
- derivation · SOFT · duplicate-mechanic: Traits/Wounded Fury: every part of this row is already in "Bloodied Frenzy" — two rows, one mechanic
- structure · SOFT · reach: Actions/Greataxe: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

## Palm of Still Water (CR 5)
- gates · SOFT · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

## Voidblade Shade (CR 5)
- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Dagger); nova none; dmg 34

## Gilded Crypt-Bloom (CR 9)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Spider Climb
- donor · note · print-row-exception: Traits/Aberrant Ground rides on: seed the user's words keyed
- read: def 9 / off 9 → 9; sustained 62 (2 × Pseudopod); nova none; dmg 62
