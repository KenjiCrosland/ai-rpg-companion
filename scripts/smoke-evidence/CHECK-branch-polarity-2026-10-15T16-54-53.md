# Mechanics check — branch-polarity-2026-10-15T16-54-53

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scent-Hunter | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit, lack-honored, lack-honored | FAIL (1) | 0/2 | 3/4 |
| Quietus Shield | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/3 | 0/3 |
| Grounded Wyrm | 6 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity, alignment-fit | FAIL (1) | 3/3 | 2/3 |
| Trineye | 4 | 2024 | lurker-2 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/2 | 1/6 |

**Dropped 5 of 10 user clauses** (coverage 50%); concept share 38% (6/16 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3-skulker / reader: 1
- dragon-2 / reader: 1


## Scent-Hunter (CR 5)
- reader · FAIL · alignment-fit: Unaligned on a Monstrosity with INT 8 that speaks None — Unaligned is for a creature with no capacity for ethics
- reader · FAIL · lack-honored: the GM asked for an absence — "an eyeless hunter" — and the sheet still carries it
- reader · FAIL · lack-honored: the GM asked for an absence — "tracks prey by scent alone" — and the sheet still carries it
- read: def 3 / off 5 → 4; sustained 38 (2 × Bite); nova none; dmg 38

## Quietus Shield (CR 6)
- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

## Grounded Wyrm (CR 6)
- reader · FAIL · multiattack-integrity: no Multiattack — the Wyvern has one and this sheet has 2 attack row(s)
- reader · FAIL · alignment-fit: Unaligned on a Dragon with INT 5 that speaks Common, Draconic — Unaligned is for a creature with no capacity for ethics
- bands · note · print-numbers: Wyvern's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- donor · note · print-row-exception: Traits/Faultless Tracker rides on: seed the user's words keyed
- read: def 4 / off 5 → 4.5; sustained 37 (1 × Sting); nova none; dmg 37

## Trineye (CR 4)
- bands · SOFT · aim-hp: HP 52 is 31% under the card's 75
- bands · SOFT · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 28 (2 × Claws); nova none; dmg 28
