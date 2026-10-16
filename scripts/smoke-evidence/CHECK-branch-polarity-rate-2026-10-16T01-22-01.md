# Mechanics check — branch-polarity-rate-2026-10-16T01-22-01

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Synod Templar | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Scentless Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 0/4 |
| Hollow Rookery Wyvern | 6 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity, alignment-fit | FAIL (1) | 1/2 | 3/3 |
| Hushed Vow | 6 | 2024 | defender-5 | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 0/3 |
| Threshal Vowguard | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Spoorstalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 0/4 |
| Eyriebroken Wyvern | 6 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity, alignment-fit | FAIL (1) | 1/2 | 4/4 |
| Broken Vow | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 0/3 |

**Dropped 2 of 15 user clauses** (coverage 87%); concept share 39% (9/23 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / bands: 2
- dragon-2 / reader: 2
- defender-5 / structure: 1


## Iron Synod Templar (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

## Scentless Stalker (CR 5)
- bands · SOFT · aim-hp: HP 65 is 28% under the card's 90
- bands · FAIL · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 38 (2 × Bite); nova none; dmg 38

## Hollow Rookery Wyvern (CR 6)
- reader · FAIL · multiattack-integrity: no Multiattack — the Wyvern has one and this sheet has 2 attack row(s)
- reader · FAIL · alignment-fit: Unaligned on a Dragon with INT 5 that speaks Draconic — Unaligned is for a creature with no capacity for ethics
- bands · note · print-numbers: Wyvern's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Swooping Strike rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 37 (1 × Sting); nova none; dmg 37

## Hushed Vow (CR 6)
- structure · FAIL · lint:duplicate-entry: Actions/Armored Shoulder: identical text to "Shield Fist" — two names, one ability; rewrite this entry into something distinct
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Shield Fist); nova none; dmg 44

## Threshal Vowguard (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

## Spoorstalker (CR 5)
- bands · SOFT · aim-hp: HP 65 is 28% under the card's 90
- bands · FAIL · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 38 (2 × Bite); nova none; dmg 38

## Eyriebroken Wyvern (CR 6)
- reader · FAIL · multiattack-integrity: no Multiattack — the Wyvern has one and this sheet has 2 attack row(s)
- reader · FAIL · alignment-fit: Unaligned on a Dragon with INT 5 that speaks Common, Draconic — Unaligned is for a creature with no capacity for ethics
- bands · note · print-numbers: Wyvern's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Grounded Hunt rides on: seed the user's words keyed
- donor · note · print-row-exception: Traits/Faultless Tracker rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 37 (1 × Sting); nova none; dmg 37

## Broken Vow (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Gauntlet); nova none; dmg 44
