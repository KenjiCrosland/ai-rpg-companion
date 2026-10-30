# Release table for the critic — 2026-10-30

One forty, `sweep-2026-10-30T00-45-48`, the same batch as the two before it. It
is the first run carrying a full day's work, so the case below is longer than
usual: nine changes landed, four of them in response to your last read, and two
of my own reported numbers turned out to be wrong.

## Your last read: what we did with it

**Accepted and landed.**

1. **The naming split, with the owner's amendment.** A row reproducing a print
   row takes print's name; a row the engine invented keeps the name the call gave
   it. `PRINT_ROW_NAMES` is derived from the 329 at import — **402 names**, never
   hand-kept; 28 of our 114 templates carry one. The owner then amended it
   mid-landing: an **augmented** row keeps its own name even on a print-named
   template, read off the `{kind, fill}` stamp the renderer already writes. Your
   sharper reason for that — a print name tells the GM to skip the row, so an
   augmented row under the stock name hides its extra clause where the GM has
   stopped reading — is recorded in the plan.
2. **Your batch-check prediction was right, twice, and is now complete.** This
   forty: **39 distinct invented names, 3 repeated — `Opportunist's Lash` ×2,
   `Merciless Strike` ×2, `Riposte` ×2.** Those are exactly `exploiter`,
   `condition-payoff` and `riposte`, the three the renamer *forces* to converge.
   Every genuinely invented name is unique. We are taking your option: exempt
   those three as house vocabulary. Not yet implemented.
3. **Running max on the single-hit ceiling** — accepted, not yet built. Still
   biting: the Swarm of Tollswarms on the previous forty hit for **90 in one
   attack at CR 13** against print's band ceiling of 51.
4. **Guarded Stance: price it, don't withdraw it** — accepted, folds into the
   reader work, not yet built.

**Where the measurement went the other way.**

5. **`control-aoe-ungated`: you were right that my first rescope was wrong, and
   your mechanism was wrong too.** You asked for a CR-banded width cap built like
   the single-hit table. Print refuses it: the widest at-will multi-target
   control row in the 329 is the **Harpy's 300-foot Emanation at CR 1** (282,743
   sq ft), so a running max sits there from CR 1 up and permits everything. Print
   does not cap the AREA of these rows; it caps the CONSEQUENCE, and the split is
   by shape — counted over all 21:

   | shape | rows | 24-hour immunity | duration-bounded | free (untraded) |
   |---|---|---|---|---|
   | Cone | 16 | **0** | 16 of 16 bounded or self-ending | 4 |
   | Emanation | 5 | **4** | 5 | **5 of 5** |

   Past 10 feet it is 3 of 3 with the immunity (Pit Fiend 20 ft, Cloaker 60 ft,
   Harpy 300 ft); the lone exception is the Hezrou's 10-foot Stench. Across the
   Traits section too it is 4 of 4 past 10 feet (adding Sea Hag 30 ft). You were
   also right that my replay's 6 → 0 was suspicious: `wide` tested
   `within (\d+) feet`, so **`120-foot Emanation` read as narrow** and the
   Leviathan passed through a hole. The gate is now shape-aware with no width
   axis, four arms, and a Traits arm. The trading axis is gone — **9 of print's
   21 are free**.

   It then pointed at the real defect: three templates cite a print row that
   carries the Success clause and dropped it. `lure` cites **Harpy/Luring Song**
   and reproduced everything except the clause that makes a 300-foot Charm legal
   at CR 1. `terror-pulse` and `fear-aura` the same. All three now write it.
   **This forty: 0 firings.**

6. **Your Krennik diagnosis was wrong, and the diff proves it.** You read the CR
   4 fear lockdown as the 2014 conversion dropping a Success branch. The two
   printings say otherwise — the 2024 source never had one, and `to2014Grammar`
   keeps the clause on every shape tested. It was never written. Not a
   conversion bug.

7. **Blind fill: aimed at the wrong layer, and so was my correction.** You asked
   for the expression judge on slot fills. Tracing the three cases first: the Air
   Elemental's trace reads *"word match declined by the call: mimicry — the key
   word does not mean the mechanic here"*, then *"closest accepted: the call
   refused every template but named mimicry as nearest"*. The call **refused**
   mimicry, correctly — the idea was HP regain plus a Thunder rider. `{mimicked}`
   filled blind because the template was never the idea.

   That fallback put **86 rows on the 10-29 forty, 2.1 a sheet, 100% beside an
   idea the engine recorded as undelivered**, and that run's tally read **78
   seats → 65 shapes → 4 expressed**. But honouring the call's own
   `declined_because` is worth only ~3 rows a forty: over 3,618 declines,
   `no_fit` is **94.8%**, `collision` 1.5%, `already_answered` 1.7%. So my
   framing was wrong too.

   The 95% has a mechanism. `templatesFor` hard-gates the menu on the seat's
   section, seats are assigned **before** the idea exists, and `parseIdeas`
   forces the trait slot's section to `trait` — which makes `normaliseTag` flatten
   its TRIGGER to `always` as well. Both coordinates of the cell are destroyed, so
   a call answering "a cone of bog gas on a Constitution save" arrives as
   `trait/always/*`. `scripts/harvest-wants.mjs` (new) places every refused seat's
   `what it wanted` against the catalog by cell: a Thunder cone stamped
   `trait/always/defense` against **15 templates sitting in `action/save/damage`**.

   The owner chose to let such an idea take the open action line. **Built,
   measured, reverted**: it fired twice on a ten and the numbers went the wrong
   way (expressed 2 → 1, closest-accepted 14 → 22), because every re-seat adds a
   fit call and a call that refuses with a `closest` lands another wrong-cell
   nearest. Re-seating multiplies the thing it was built to reduce, by
   construction, while `closest accepted` turns every refusal into a row anyway.
   Recorded in the plan so it is not rebuilt the same way.

8. **Goblin Boss: your withdrawal confirmed.** No `Redirect Attack` anywhere in
   SRD 5.2; our Goblin Boss carries print's complete block.

## The owner's rulings this run

- **A row budget that answers to the card.** `freeBudget` was a flat 1. It is now
  elastic against print's own card size, p20 floor and **p90** ceiling per band
  (0-2 1-4, 3-5 2-5, 6-9 3-5, 10-12 4-7, 13-16 5-10, 17-20 7-9, 21+ 8-10). p90
  not p80, on his ruling: *"the more interesting blocks are the ones that have
  many abilities so I'm not sad they don't fully represent print here"* — the
  ceiling exists to stop the runaway card, not to reproduce print's distribution.
  It sheds **only the borrowed row** (`accepted_closest`); a row the call chose,
  or one carrying the GM's quote, rides however crowded the card is. printExact
  keeps none.
- **Three donors added, none removed.** 10 of print's 18 blocks at CR 13-16 are
  legendary (56%) carrying ~3 more rows; we ran **22%**. The band had 1 legendary
  donor of 10 and **no lurker or caster chassis at all** — print's Vampire rode
  `lurker-8`, stretched five CRs. Worse, found by probe: **defender, swarm, ooze
  and controller had no donor anywhere in CR 10-16**, so a CR 15 defender rode
  `defender-5`, a ten-CR stretch. Added `lurker-13` (after the Vampire),
  `caster-15` (after the Mummy Lord) and `defender-13` (after the Rakshasa and
  Ice Devil, **non-legendary** — no print CR 12-16 defender has a legendary kit).
- **Print closes the row set on `exact`.** Four defects, found by the probe: the
  citation check ran against a half-built sheet (print's own rows install further
  down the same block, so the Mummy Lord lost "Glare" and "Necrotic Strike" for
  citing rows that arrived a step later); `danglingRefIn` could not read print's
  own `"makes one A or B attack"` form, which print writes in 7 rows;
  `closedPath` is `isTwist || isClassNpc`, so `exact` was the ONLY path that kept
  a chassis attack colliding with a print row; and the name was never what
  mattered — on `exact` print's attacks are now the only attacks, guarded so a
  print body with none keeps the chassis one.

## This forty

**Gate: 1 FAIL of 40, and it is the `lack-honored` false positive you agreed
with** — the rule wants an absence positively expressed, which a header cannot
do. Zero real failures, against 2, 3 and 4 on the previous runs.

| | two ago | last | **now** |
|---|---|---|---|
| expressed | 4 | 7 | **4** |
| decoration | 19 | 12 | **10** |
| free rows | 23 | 19 | 14 |
| closest-accepted | 86 | 80 | 74 |
| rows / sheet | 5.67 | 5.67 | 5.56 |
| feature rows / sheet | 1.92 | 1.97 | **1.72** |
| bare sheets | 2 | 2 | 2 |

**Two corrections to my own reporting.** Last run I reported expressed 4 → 7 as
the day's work landing, with a caveat about noise. **4, 7, 4 across three forties
is noise on a count of four to seven, and the caveat was the story** — expressed
is not reliably moving and I over-read it. What has moved monotonically is
decoration (19 → 12 → 10) and closest-accepted (86 → 80 → 74), both downward.
Feature rows at **1.72** is the lowest of the three and is the number to watch:
if the budget is trimming more than sameness, that is where it shows.

I also mis-attributed two FAILs today — a `condition-duration` to a donor I had
just written when it belonged to another sheet's templated row, and a
`lack-honored` I called real before checking the header.

## What we would value from you

1. **Is 1.72 feature rows a thinner card or a less samey one?** The budget is the
   only thing that could have moved it. Our read of this forty is 23 ship / 15
   fix-lite / 2 fix on the previous run's scoring; yours was 11/22/7 on the same
   batch, so your axes are the ones we are tracking.
2. **The CR 13-16 legendary share sits at 36% against print's 56%**, and the
   remaining gap is rung SELECTION, not catalog: `caster-8-binder` served a CR 13
   concept and `caster-10-warpriest` a CR 16 one, so a STYLE variant five or six
   CRs below beats the plain rung at the right CR. Is that worth changing, given
   it sits at the centre of routing?
3. **`each creature of its choice` is 0 of 329 print rows**, gated or not — print
   never writes friendly-fire exemption that way. It sits on at least three
   templates and removing it is a real nerf. Worth it?
4. **The unbuilt four from your list**, in case you would reorder: the single-hit
   ceiling with a running max, the record-vs-text lint, the element receipt, and
   the reader's mixed multiattacks.
