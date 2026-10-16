# Mechanics check — branch-polarity-rate-2026-10-16T00-54-07

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Templar | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Scentstalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 2/5 |
| Fallen Tyrant | 6 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | FAIL: multiattack-integrity, alignment-fit | FAIL (1) | 2/2 | 3/4 |
| Iron Door | 6 | 2024 | defender-5 | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 0/3 |
| Macebearer Penitent | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vaultborn Hunter | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | FAIL: lack-honored | FAIL (2) | 0/1 | 4/5 |
| Ravine Wyrm | 6 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity, alignment-fit | FAIL (1) | 2/2 | 2/2 |
| Silent Wall | 6 | 2024 | defender-5 | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 0/3 |

**Dropped 1 of 12 user clauses** (coverage 92%); concept share 59% (16/27 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / bands: 2
- dragon-2 / reader: 2
- defender-5 / structure: 2
- lurker-5 / reader: 1


## Iron Templar (CR 6)
- clean
- donor · note · print-row-exception: Actions/Inquisitor's Gaze rides on: seed the user's words keyed
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

## Scentstalker (CR 5)
- bands · SOFT · aim-hp: HP 65 is 28% under the card's 90
- bands · FAIL · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 34 (2 × Bite); nova none; dmg 34

## Fallen Tyrant (CR 6)
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Wingless
- reader · FAIL · multiattack-integrity: no Multiattack — the Wyvern has one and this sheet has 2 attack row(s)
- reader · FAIL · alignment-fit: Unaligned on a Dragon with INT 5 that speaks Common, Draconic — Unaligned is for a creature with no capacity for ethics
- bands · note · print-numbers: Wyvern's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Bonus Actions/Grounded Hunt rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 37 (1 × Sting); nova none; dmg 37

## Iron Door (CR 6)
- structure · FAIL · lint:duplicate-entry: Actions/Door Slam: identical text to "Shoulder" — two names, one ability; rewrite this entry into something distinct
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Shoulder); nova none; dmg 44

## Macebearer Penitent (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

## Vaultborn Hunter (CR 5)
- bands · SOFT · aim-hp: HP 65 is 28% under the card's 90
- bands · FAIL · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- reader · FAIL · lack-honored: the GM asked for an absence — "an eyeless hunter" — and the sheet still carries it
- read: def 1 / off 5 → 3; sustained 34 (2 × Bite); nova none; dmg 34

## Ravine Wyrm (CR 6)
- reader · FAIL · multiattack-integrity: no Multiattack — the Wyvern has one and this sheet has 2 attack row(s)
- reader · FAIL · alignment-fit: Unaligned on a Dragon with INT 5 that speaks Draconic — Unaligned is for a creature with no capacity for ethics
- bands · note · print-numbers: Wyvern's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 4 / off 5 → 4.5; sustained 37 (1 × Sting); nova none; dmg 37

## Silent Wall (CR 6)
- structure · FAIL · lint:duplicate-entry: Actions/Ricocheted Shield: identical text to "Bone-Shattering Bash" — two names, one ability; rewrite this entry into something distinct
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Bone-Shattering Bash); nova none; dmg 44
