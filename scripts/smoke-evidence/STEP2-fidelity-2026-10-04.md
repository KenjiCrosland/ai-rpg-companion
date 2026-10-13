# Fidelity pipeline — step 2: three small independent changes, each measured by the regression forty

Baseline (step 1, on record): coverage 38/61 (62%), concept share 44/78 (56%), Meshrin 4/8. The definitive forty before step 2: 0 fails, 17 softs.

## 2a. The flavor field — landed, measured

A row may carry `flavor`: the 2024 card appends it in italics after the text, the legacy model appends it to the description, the PI guard scrubs it, no parser or gate reads it. Nothing emits flavor until step 5, so its forty is a null check on generation.

Forty: 37 clean, 1 provider timeout, 2 fails. Neither fail could come from the field; both were pre-existing engine defects surfaced by this run's variance, fixed and pinned, and the three affected entries reran clean (0 of 3):
- a drawn library seed whose text was identical to a chassis row shipped twice (the audit renamed the second instead of dropping it) — the later non-print row now leaves;
- a print rename reached into a row whose name STARTS with the old name ("Scepter" → "Eldritch Burst" made the hybrid "Scepter Blast" read "Eldritch Burst Blast") — both propagation sites now guard prefix-nesting as they did suffix-nesting.

Meshrin after 2a: Large ✓, Speed 30 ✓, Greatsword ✓, "Tail Swipe" as a thrown hybrid (wrong shape), no claws/bite/fighting styles, "the meshrin". 3/8.

## 2b. The slot-yield rule — landed, measured

An authored or fitted row that lands in a slot evicts the chassis's row in that slot (the missing half of supersede). `slotYield(templateId, keeper)` runs at the template landing, the trait landing and the fallback-seed landing; the slot is the template's declared `replaces` (now carried on the catalog) plus the ranged slot when the keeper's own row rolls a ranged attack; only chassis rows yield; the keeper owns the evicted row's citations.

Getting it to fire exposed the actual mechanism behind "Hurled Debris beside the user's thrown weapon": the chassis's own hurled row tagged the thrown-weapon ENGINE, which kept the thrown-weapon template off the fit menu entirely. A chassis throw no longer blocks the template that would evict it; a throw the sheet owns (seed, template, print) still does. Two catalog pins encoding the old exclusion were updated. Probe: "slot yields: ranged — the chassis's Hurled Debris leaves; Hurled Weapon holds the slot"; Multiattack reads the keeper.

Forty: 0 fails of 40, 21 softs (the two new softs are `reach` and `payoff-producer`, both present in the flavor forty too). Gate: 178 suites / 5,149.

Meshrin after 2b: Greatsword ✓ and a chassis "Hurled Debris" ranged row; the tail is gone entirely. 2/8. This is the model naming the chassis's ranged row, which only authoring (step 5) addresses — the slot rule has nothing to evict it with until the user's clause becomes a row.

## 2c. The CR ≤ 2 openings — landed, measured

Two austerity closures opened, in the brief's risk order: the trait wildcard at CR ≤ 2 (`traitWildcardAllowed` was `cr > 2 || materialBody`) and the claim gate at CR ≤ 2 (`wildcardAllowed` was `cr > 2 || mechanics || claimWords || riderAsk`), both now `true`. Each deleted a user clause at low CR by encoding print's sparseness (74% of print's CR ≤ 2 blocks carry no non-attack action), not correctness. Two pins that asserted the closed behavior were flipped to the open one. Print stand-down stays closed.

Forty: 0 fails of 40, 18 softs — and no softs at all on the four CR 1 blocks, so the opened seats did not cost soundness there. Gate: 178 suites / 5,149.

Meshrin after 2c: Large ✓, Speed 30 ✓, Greatsword ✓, "Tail Lash" (a tail, but as a 60/240 ranged row), "Clawing Drag" (a claw-named pull), no bite, no fighting styles, still "the meshrin". 4/8 by a generous count — the same number as the baseline, with the same two shape errors (the tail thrown, the claw a save row). Nothing in step 2 was expected to move Meshrin; the rows he is missing are step 5's.

## Reading across the three forties

| Forty | Fails | Softs |
|---|---|---|
| definitive (before step 2) | 0 | 17 |
| after the flavor field (+ the two defects fixed) | 0 | 19 |
| after slot-yield | 0 | 21 |
| after the CR ≤ 2 openings | 0 | 18 |

Fails unchanged, as the brief expected. Concept share is still hand-counted; the automated number arrives in step 4.
