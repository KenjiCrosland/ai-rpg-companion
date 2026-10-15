# Mechanics check — branch-rounds-2026-10-14T14-17-49

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodmaw Orc | 8 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/7 |
| Crookbound Herdmaster | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: hybrid-needs-thrown | FAIL (1) | 1/1 | 4/4 |
| Sir Reginald Pemberton-Hughes | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Coral Vurthax | 5 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Rime-Scaled Wyrm | 9 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: interior-energy | FAIL (1) | 1/1 | 3/4 |
| Yewshrine Warden | 3 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Thornpiper Reveler | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |
| Gloamripper | 2 (2014) | 2014 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: inline-consistency | FAIL (1) | 2/2 | 2/7 |
| Stormwrought Oathkeeper | 7 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Meshrin | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: speaks-by-int | FAIL (1) | 1/1 | 3/3 |

**Dropped 0 of 13 user clauses** (coverage 100%); concept share 69% (36/52 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-3-leader / reader: 1
- dragon-8 / reader: 1
- skirmisher-3-skulker / reader: 1
- brute-5-grappler / reader: 1


## Bloodmaw Orc (CR 8)
- structure · SOFT · reach: Actions/Greataxe: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 52 (2 × Greataxe); nova none; dmg 52

## Crookbound Herdmaster (CR 5)
- reader · FAIL · hybrid-needs-thrown: Actions/Thunderbolt: a "Melee or Ranged" row that names nothing a creature can throw
- read: def 3 / off 5 → 4; sustained 38 (2 × Herding Crook); nova none; dmg 38

## Sir Reginald Pemberton-Hughes (CR 6, 2014)
- clean
- bands · note · print-numbers: Gladiator's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Avian Terror rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Great Weapon Master rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Greatsword rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Crossbow rides on: the user's own part, feature or species
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova none; dmg 44

## Coral Vurthax (CR 5)
- clean
- read: def 3 / off 6 → 4.5; sustained 36 (3 × Trident); nova Tide Burst 28; dmg 43

## Rime-Scaled Wyrm (CR 9)
- reader · FAIL · interior-energy: Actions/Gorge and Glut: it deals Cold and digests in Acid — a gullet matches the body it is in
- read: def 6 / off 11 → 8.5; sustained 54 (3 × Bite); nova Rime Breath 49; dmg 69

## Yewshrine Warden (CR 3)
- clean
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Bite); nova none; dmg 24

## Thornpiper Reveler (CR 4)
- clean
- read: def 2 / off 4 → 3; sustained 28 (2 × Thornpipe); nova none; dmg 28

## Gloamripper (CR 2, 2014)
- reader · FAIL · inline-consistency: a one-word Name takes the person form: "Gloamripper", never "the gloamripper"
- read: def 1/4 / off 2 → 1.125; sustained 20 (2 × Kukri); nova none; dmg 20

## Stormwrought Oathkeeper (CR 7)
- clean
- read: def 5 / off 7 → 6; sustained 46 (2 × Claw); nova Storm Stomp 24; dmg 47

## Meshrin (CR 6)
- reader · FAIL · speaks-by-int: INT 4 on a Monstrosity speaks "Common" — print has none of 19 Monstrosities, 88 Beasts or 4 Oozes at INT 5 or less speaking a tongue
- read: def 4 / off 6 → 5; sustained 40 (2 × Hooked Chain); nova none; dmg 40
