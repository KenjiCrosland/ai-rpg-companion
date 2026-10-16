# Mechanics check — branch-polarity-rate-2026-10-16T01-28-01

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Broken Priest | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Scent-Stalker of the Deep | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |
| Lamed Fellwing | 6 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity, alignment-fit | FAIL (1) | 1/2 | 3/3 |
| Tongueless Bulwark | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | FAIL (1) | 2/2 | 0/3 |
| Steadfast Lamplighter | 6 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Marrow-Hound | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 0/4 |
| Grounded Wyrm | 6 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity, alignment-fit | FAIL (1) | 2/2 | 2/2 |
| Tongueless Ironwall | 6 | 2024 | defender-5 | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 0/3 |

**Dropped 1 of 14 user clauses** (coverage 93%); concept share 36% (8/22 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- dragon-2 / reader: 2
- defender-5 / reader: 1
- lurker-5 / bands: 1
- defender-5 / structure: 1


## Iron Broken Priest (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

## Scent-Stalker of the Deep (CR 5)
- clean
- read: def 3 / off 5 → 4; sustained 38 (2 × Claw); nova none; dmg 38

## Lamed Fellwing (CR 6)
- reader · FAIL · multiattack-integrity: no Multiattack — the Wyvern has one and this sheet has 2 attack row(s)
- reader · FAIL · alignment-fit: Unaligned on a Dragon with INT 5 that speaks Common, Draconic — Unaligned is for a creature with no capacity for ethics
- bands · note · print-numbers: Wyvern's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Grounded Hunt rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 37 (1 × Sting); nova none; dmg 37

## Tongueless Bulwark (CR 6)
- reader · FAIL · multiattack-integrity: Multiattack's attack slot names "Tower Shield", which is not an attack row on this sheet
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Shieldwall Bash); nova none; dmg 44

## Steadfast Lamplighter (CR 6)
- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Mace); nova none; dmg 44

## Marrow-Hound (CR 5)
- bands · SOFT · aim-hp: HP 65 is 28% under the card's 90
- bands · FAIL · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 34 (2 × Bite); nova none; dmg 34

## Grounded Wyrm (CR 6)
- reader · FAIL · multiattack-integrity: no Multiattack — the Wyvern has one and this sheet has 2 attack row(s)
- reader · FAIL · alignment-fit: Unaligned on a Dragon with INT 5 that speaks Draconic — Unaligned is for a creature with no capacity for ethics
- bands · note · print-numbers: Wyvern's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 4 / off 7 → 5.5; sustained 50 (1 × Sting); nova none; dmg 50

## Tongueless Ironwall (CR 6)
- structure · FAIL · lint:duplicate-entry: Actions/Ironclad Blow: identical text to "Fist" — two names, one ability; rewrite this entry into something distinct
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Fist); nova none; dmg 44
