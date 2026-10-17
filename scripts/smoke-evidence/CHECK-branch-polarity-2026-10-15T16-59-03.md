# Mechanics check — branch-polarity-2026-10-15T16-59-03

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Offal Pit Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (2) | 1/2 | 0/5 |
| Hollow Warden | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 0/3 |
| Fallen Crag Hunter | 6 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity, alignment-fit | FAIL (1) | 2/2 | 2/2 |
| Triclops Stalker | 4 | 2024 | lurker-2 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 0/5 |

**Dropped 2 of 9 user clauses** (coverage 78%); concept share 13% (2/15 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / bands: 1
- lurker-5 / reader: 1
- dragon-2 / reader: 1


## Offal Pit Stalker (CR 5)
- bands · SOFT · aim-hp: HP 65 is 28% under the card's 90
- bands · FAIL · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- reader · FAIL · alignment-fit: Unaligned on a Monstrosity with INT 12 that speaks None — Unaligned is for a creature with no capacity for ethics
- read: def 1 / off 5 → 3; sustained 34 (2 × Bite); nova none; dmg 34

## Hollow Warden (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

## Fallen Crag Hunter (CR 6)
- reader · FAIL · multiattack-integrity: no Multiattack — the Wyvern has one and this sheet has 2 attack row(s)
- reader · FAIL · alignment-fit: Unaligned on a Dragon with INT 5 that speaks Common, Draconic — Unaligned is for a creature with no capacity for ethics
- bands · note · print-numbers: Wyvern's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 4 / off 5 → 4.5; sustained 37 (1 × Sting); nova none; dmg 37

## Triclops Stalker (CR 4)
- bands · SOFT · aim-hp: HP 52 is 31% under the card's 75
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Venom Bite); nova none; dmg 26
