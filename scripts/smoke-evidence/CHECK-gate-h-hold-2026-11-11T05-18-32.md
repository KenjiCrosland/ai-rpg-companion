# Mechanics check — gate-h-hold-2026-11-11T05-18-32

## Gate table

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cave Roper | 5 | 2024 | brute-5 | ok | ok | FAIL: dangling-ref, lint:dangling-use-ref | ok | ok | ok | SOFT: print-rows | SOFT: dangling-use-ref | SOFT: inline-consistency, multiattack-integrity | ok | FAIL (1) | 1/1 | 4/4 |

**Dropped 0 of 1 GM clauses** (coverage 100%); concept share 100% (4/4 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-5 / structure: 1


## Cave Roper (CR 5)
- structure · FAIL · dangling-ref: Actions/Multiattack references "Reel", which is not a row
- structure · FAIL · lint:dangling-use-ref: Actions/Multiattack: "uses Reel" references an entry that doesn't exist — reference a real entry by its exact name
- donor · SOFT · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Reel In
- adjudicability · SOFT · dangling-use-ref: dangling-use-ref: Actions/Multiattack: "uses Reel" references an entry that doesn't exist — reference a real entry by its exact name
- reader · SOFT · inline-consistency: Actions/Reel In says "the roper" beside the sheet's inline "the cave roper"
- reader · SOFT · multiattack-integrity: Multiattack uses "Reel", which is not a row on this sheet
- bands · note · print-numbers: Roper's own numbers at its own CR — the donor gate verifies them; the band is print's by definition
- read: def 7 / off 5 → 6; sustained 34 (2 × Bite); nova none; dmg 34


## Batch check

**Invented row names repeated across sheets: 0** ✓

Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): 0

**Byte-identical row texts across sheets: 0** ✓

**One template, two mechanics across sheets: 0** ✓
