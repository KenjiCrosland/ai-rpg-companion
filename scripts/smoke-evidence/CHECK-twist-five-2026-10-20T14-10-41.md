# Mechanics check — twist-five-2026-10-20T14-10-41

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbound Skeleton | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Bone Gladiator | 4 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Hill-Hoard Ogre | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Cave Troll | 6 | 2024 | brute-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Wandering Stone Exile | 9 | 2024 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/3 |

**Dropped 0 of 6 user clauses** (coverage 100%); concept share 100% (16/16 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none


## Oathbound Skeleton (CR 2)
- clean
- donor · note · print-row-exception: Actions/Greatsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Great Weapon Master rides on: the user's own part, feature or species
- read: def 1/2 / off 2 → 1.25; sustained 12 (1 × Greatsword); nova none; dmg 12

## Bone Gladiator (CR 4)
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (1 × Shortsword); nova none; dmg 26

## Hill-Hoard Ogre (CR 3)
- clean
- bands · note · print-numbers: Ogre's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Greataxe rides on: the user's own part, feature or species
- donor · note · print-row-exception: Traits/Great Weapon Master rides on: the user's own part, feature or species
- read: def 1/4 / off 4 → 2.125; sustained 22 (1 × Greataxe); nova none; dmg 22

## Cave Troll (CR 6)
- gates · SOFT · control-aoe-ungated: Actions/Bellowing Roar: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- bands · note · print-numbers: Troll's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Bellowing Roar rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

## Wandering Stone Exile (CR 9)
- bands · SOFT · aim-atk: attack +10 against the aim's +8
- donor · note · print-row-exception: Actions/Shattering Hurl rides on: seed the user's words keyed
- read: def 7 / off 11 → 9; sustained 66 (2 × Stone Club); nova Shattering Hurl 32; dmg 66
