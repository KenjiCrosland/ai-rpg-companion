# The case: a receipt decides credit, not existence (2026-10-21, package six)

> **AS SHIPPED TO THE CRITIC — kept verbatim as the record. The central claim in
> section 2 FAILED review; two numbers here are wrong (free rows counted at grant,
> not ship; the `condition-duration` firing was a false positive). See
> `critic-response-2026-10-22.md` before reusing anything from this file.**


Answering the critic's review of `sweep-2026-10-21T18-15-11` (5 ship / 26
fix-lite / 9 fix) and its central finding, which inverted the case I had put:

> The catalog is not the bottleneck, and neither is the call. The rules deciding
> whether a row has enough provenance to exist are.

Accepted. This package is the forty that followed the fix:
`sweep-2026-10-21T22-17-49` — **5 FAIL of 40**, Jest 198 suites / 5763 passing
(26 skipped), build clean. Path mix: 13 twist, 16 homebrew, 7 class, 3 exact,
1 blank.

**Read the twists first** (the critic's item 9). The six rows rule 1d killed in
one forty are the reason this package exists.

---

## 1. What 1d was doing, and what replaced it

1d accepted a row on a quote of the GM (`asked`) or a concept-key bind. **The
trait seat is shown no text it can quote**, so neither route was open to it —
which killed six twists in one forty, each rejected for "quoting none of the GM's
words" while being exactly what the GM asked for.

The owner's ruling: **a receipt decides CREDIT, not EXISTENCE.** One free
signature row per sheet on every non-exact path, gated on a receipt the seat can
actually produce. Exact sheets get none — print closes the row set. A free row
earns no clause credit and still faces the value floor, dedup, adjudicability,
body legality and the nova caps.

The receipt is a new `expresses` field on the fit call: which of *this creature's
own* signature elements the row carries, from the closed list the concept call
already produced. `parseFit` validates it by MEMBERSHIP — the call picks one or
answers none, and cannot invent a third. Those elements were drawn from the GM's
description, so naming one is a receipt of the same kind as a quote.

**The five of the six killed twists that recur in this batch all carry their row:**

| twist | the row it now ships | element named |
|---|---|---|
| Hydra | `Smoldering Stumps` | "a scalding, blinding smoke shroud that thickens as it is wounded" |
| Vampire | `Briar Regrowth` | "bleeding vines and blood-fed roses that reknit its flesh" |
| Bone Sun Lich | `Shard Retort` | "a throne-core sun of splintered bone" |
| Adult Red Dragon | `Blindside Lash` | "a blinded eye from an old lance" |
| Stone Golem | `Sorrowful Wrath` | "carved saint in stone, weeping" |

17 free rows landed across the forty. **All 17 name an element that appears
verbatim in that sheet's own element list** — checked mechanically, not by eye.

## 2. THE CLAIM TO ATTACK — the element receipt is a sound substitute for a quote

I did **not** implement the critic's "homebrew gets free rows always" as a bare
allowance, because it would have reversed three standing pins with no evidence
(`Iron Fury`, `Marked Quarry`, the forged `ground-burst` — all unasked
decoration). All six structural kills were twist sheets, not homebrew generally.

So the allowance is narrower than the critic asked for: homebrew gets one free
row, **but only when the call can name the element it expresses.** Those three
pins still refuse their rows — now for naming no element rather than for failing
to quote.

**This is the claim to attack.** It rests on `expresses` being hard to satisfy
spuriously: the list is closed, membership-validated, and produced by a different
call than the one answering. If the critic can show a decoration row naming a
plausible element, the gate is a rubber stamp and the three pins are luck.

## 3. The gap trace now measures ship, not acceptance

`[nearest landed]` was stamped at ACCEPTANCE, ~100 lines before the receipt gate
and verb preference can veto the seat. It read "1 row in 41 shipped nothing";
**measured at ship it was 23 of 41.** Gap records now accumulate and emit once
the sheet is final, stamping `[landed: X]` or `[VETOED AFTER ACCEPTANCE: X]`.

On this forty, 30 seat records:

| outcome | count |
|---|---|
| landed | 20 (67%) |
| **VETOED after acceptance** | **10 (33%)** — was 23 of 41 (56%) |
| row dropped | 0 |

Cause of the gap, from the engine's own rejection reasons: 63% over-decline (a
same-seat template was on the menu and the call said no), 17% role shelf, 7%
legality, 13% genuine gap. The catalog remains ~93% complete for observed demand.

**A caveat on this instrument.** It read 0 of 30 on first use and printed a table
of zeroes that looks exactly like a clean run: its positional regex wanted the
outcome stamp before `[menu:]`, and the move to sheet-final emission put it last.
It now reads fields by name and prints whatever it cannot parse.

## 4. The three regressions the critic found, and the gate that is new

1. **Brother Halric's Mace** — a chassis row the call had renamed "Mace" carried
   no provenance, so the closed-path sweep deleted it while print's own
   Multiattack cited it. A row already carrying print's name IS print's row:
   claimed and stamped, in both the melee and ranged branches. *This forty:
   Halric ships `Mace` and `Radiant Flame`, exactly what its Multiattack cites.*
   The two `prints no row for it` firings were the Mage's `Mire Rot` and the
   Priest's `Warhammer` — print confirms the Mage prints neither and the Priest
   prints `Mace`, so both withdrawals hit duplicates, not print's own rows.
2. **Reedmarch's Guarded Stance** — the menu filter tested `monster.ac ?? scaled.ac`
   while the pool was built, but print canon moves the AC afterwards and three
   other paths ship a trait without passing that filter. Reconciled against the
   FINISHED AC, which cannot miss a path. *This forty: one withdrawal, correct.*
3. **Ossuar's indefinite paralysis** — a new `condition-duration` gate, but **not
   the rule as briefed.** "A row that imposes a condition states when it ends"
   **fails print 58 times**: over print's 171 affliction rows, Prone is 50 bare of
   51 (it self-ends — you stand up) and Grappled is always an escape DC, while
   Paralyzed, Stunned, Blinded, Charmed and Deafened are never bare. The gate
   covers only those, and admits print's own `while` bound. Zero false positives
   on print's 20 such rows. *This forty: one firing, on the Drowned Choir's
   `One Voice` (Deafened, unbounded) — correct.*

The **audit rename rule** also blocked 6 renames, all defensible. One is worth
noting: the same `One Voice` row was blocked from becoming "Deafening Chorus" for
dropping the GM's own word "voice". Both new guards engaged on one row; neither
mis-fired.

## 5. The forty is a long tail — with one exception, and we had that wrong

Five forties ran 2-3 FAIL with near-total turnover between them, which is why a
single run's FAIL list is not a work queue. We had generalised that too far.

Tallied across all six forties, `two-novas` fired **four times in three runs, on
three different creatures across both editions** — Knell Swarm, the Air Elemental
(2024, `lurker-5`, "Chorus Barrage" + "Whirlwind") and Rimeheart Stalker (2014,
`brute-9-juggernaut`, "Killing Cold" + "Threshold Execute"). Re-measured
independently: **0 of 329 print blocks carry two Recharge Action rows**, 72 carry
exactly one. The gate is sound and this is a real defect — the only item in the
"long tail of one-offs" that is not one. It is the next pick.

This forty's other FAILs: `duplicate-mechanic` (Purple Worm, 3 rows imposing
Prone — print has no block with three, 0 of 329), `control-aoe-ungated` and
`name-mechanic` (both Adult Red Dragon), `condition-duration` (correct, above).

## 6. Two things to look at that no gate failed

- **Coverage dropped 15 of 67 user clauses (78%).** A run with zero fails and
  60% coverage is a failing run; this is the number we watch hardest.
- **Four sheets read `concept 0/N`** — Scree Slide Thing, Trench Antiphon,
  Sanctum Rot, Well Drownedthing — against 86% concept share overall (187/218
  rows). All four have real, well-formed signature elements, so this is worth the
  critic's eye. **But note what the metric is:** concept share counts a row as
  the user's if it is a kit/feature/part/print row or **shares a word** with the
  clause. A free row naming an element need not share the GM's words at all, so
  the metric structurally cannot see an element receipt and will understate the
  new path. Trench Antiphon carries a free row and still reads 0/7. Read these
  four as sheets to inspect, not as a measured regression.

## 7. What remains in the critic's order, untouched

Item 1's other half (**verb preference standing down** — a keyed template the
call already declined is not a better answer) is UNTOUCHED, and remains first.
Then: recharge shedding restricted to single-target control; A2 payload
precedence; a strip changing the record and the text together; crediting an
existing row requiring a quote of the sheet; the reader's mixed-Multiattack
miscount (the Pit Fiend reads as 1 × Fiery Mace at CR 20); and item 7's list.
