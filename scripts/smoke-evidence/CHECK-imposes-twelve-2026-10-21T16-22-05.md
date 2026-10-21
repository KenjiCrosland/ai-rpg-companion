# Mechanics check — imposes-twelve-2026-10-21T16-22-05

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Peat Hound | 5 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 3/4 |
| Glacier-Heart Brute | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 1/3 |
| Crack-Veined Basilisk | 4 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Iron Road Angler | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Gulpback Toad | 3 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Canyon Gore-Wyrm | 11 | 2024 | brute-11-charger | ok | ok | FAIL: two-novas | ok | ok | ok | ok | ok | FAIL: name-mechanic | ok | FAIL (2) | 1/1 | 5/5 |
| Cavern Shriekcap | 7 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Stirge Swarm | 2 | 2024 | swarm-1 | FAIL: escape-dc, escape-dc | ok | ok | ok | ok | ok | ok | ok | SOFT: multiattack-integrity | ok | FAIL (1) | 1/1 | 3/3 |
| Petrifying Gorgon | 9 | 2024 | brute-9 | ok | ok | ok | ok | SOFT: type-immunities | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Hill-Wood Gorer | 5 | 2024 | brute-5-charger | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Stone Roper | 13 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Sirenwrack Harpy | 6 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |

**Dropped 3 of 13 user clauses** (coverage 77%); concept share 87% (39/45 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-11-charger / structure: 1
- brute-11-charger / reader: 1
- swarm-1 / derivation: 1


## Peat Hound (CR 5)
- bands · SOFT · band: reads CR 3.5 (print at 5 reads 2–8.5, n=52)
- read: def 2 / off 5 → 3.5; sustained 34 (2 × Bite); nova none; dmg 34

## Glacier-Heart Brute (CR 8)
- clean
- read: def 6 / off 8 → 7; sustained 50 (2 × Slam); nova Shieldwall Breaker 27; dmg 51

## Crack-Veined Basilisk (CR 4)
- clean
- bands · note · print-numbers: Basilisk's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Stonebound Gaze rides on: seed the user's words keyed
- read: def 1 / off 3 → 2; sustained 17 (1 × Bite); nova none; dmg 17

## Iron Road Angler (CR 6)
- clean
- donor · note · print-row-exception: Actions/Barbed Hook rides on: seed the user's words keyed
- read: def 8 / off 6 → 7; sustained 44 (2 × Chain); nova none; dmg 44

## Gulpback Toad (CR 3)
- clean
- read: def 1/2 / off 5 → 2.75; sustained 34 (2 × Bite); nova none; dmg 34

## Canyon Gore-Wyrm (CR 11)
- structure · FAIL · two-novas: two Recharge novas on one sheet: "Canyon Charge" and "Lightning Breath"
- reader · FAIL · name-mechanic: Actions/Canyon Charge: the name promises movement the text lacks
- bands · note · print-numbers: Behir's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Actions/Gore rides on: the user's own part, feature or species
- donor · note · print-row-exception: Actions/Canyon Charge rides on: seed the user's words keyed
- read: def 8 / off 16 → 12; sustained 82 (1 × Gore); nova Lightning Breath 59; dmg 94

## Cavern Shriekcap (CR 7)
- clean
- read: def 5 / off 7 → 6; sustained 46 (2 × Slam); nova Deafening Shriek 24; dmg 47

## Stirge Swarm (CR 2)
- derivation · FAIL · escape-dc: Actions/Proboscis: escape DC 13, derived 8
- derivation · FAIL · escape-dc: Actions/Clinging Proboscis: escape DC 13, derived 8
- reader · SOFT · multiattack-integrity: 2 attack rows and no Multiattack
- read: def 1 / off 2 → 1.5; sustained 12 (1 × Proboscis); nova none; dmg 12

## Petrifying Gorgon (CR 9)
- headerBody · SOFT · type-immunities: a Construct without Poison immunity (Exhaustion, Petrified)
- donor · note · print-row-exception: Actions/Shove Stamp rides on: seed the user's words keyed
- read: def 7 / off 11 → 9; sustained 64 (2 × Gore); nova Shove Stamp 32; dmg 64

## Hill-Wood Gorer (CR 5)
- bands · SOFT · aim-dpr: damage 24 a round is 40% under the card's 40
- bands · SOFT · band: reads CR 3 (print at 5 reads 2–8.5, n=52)
- donor · note · print-row-exception: Actions/Bowling Shove rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Bloodied Burst rides on: seed the user's words keyed
- read: def 2 / off 4 → 3; sustained 24 (2 × Gore); nova Bloodied Burst 7; dmg 24

## Stone Roper (CR 13)
- clean
- read: def 11 / off 15 → 13; sustained 90 (2 × Bite); nova none; dmg 90

## Sirenwrack Harpy (CR 6)
- bands · SOFT · band: reads CR 4.5 (print at 6 reads 3–8.5, n=42)
- donor · note · print-row-exception: Traits/Shrieking Retort rides on: seed the user's words keyed
- donor · note · print-row-exception: Actions/Overboard Shanty rides on: seed the user's words keyed
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Claw); nova none; dmg 44
