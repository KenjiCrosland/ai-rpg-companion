# The case: an unexplained coverage drop (2026-10-22, package seven)

Answering the critic's package-six review (6 ship / 27 fix-lite / 7 fix). **Items 1
and 3 of that order are closed; half of item 2 and the first of item 4 landed.**
This forty is `sweep-2026-10-22T03-29-45`: **2 FAIL of 40** — the low end of seven
forties — Jest 117 suites / 3754 passing, build clean.

The critic's central finding was accepted without reservation:

> Membership is not expression. The receipt is satisfied by putting the twist's
> words in a generic template's NAME.

Following that to its end produced something larger than the fix, and it is what
this package asks the critic to attack.

---

## 1. AN UNEXPLAINED COVERAGE DROP, and a claim we retracted before sending

Coverage read **69%** (48 of 70 clauses) against 77-90% across the previous
fifteen forties. It is the lowest reading since 2026-10-04. We do not know why,
and we would rather say so than offer the explanation we had.

**What we first concluded, and why it was wrong.** The dropped clauses are the
twists — "sings in one voice", "keeps a garden of thorns", "blind in one eye from
an old lance" — and `checker.mjs:749` describes coverage as "string-work against
the extraction's clause list, never a model". We read that as word-overlap and
concluded the metric had been scoring row NAMES: a generic row borrowing the
twist's words would score the clause, so our three landings had merely stripped
false credit.

**That is false.** Line 822 of the same function says the opposite, and line 828
records that the loophole was closed on **2026-10-16** — the owner's own stage 3
item 4:

```
// COVERAGE BY PROVENANCE (step 8): a clause is covered when a row's trace binds
// to it ... never when a row's text happens to contain its words
// A RECEIPT, NOT A WORD MATCH ... "wound" credited "cracks open when wounded" to
// Rampage, a row that moves and attacks and answers nothing of the sort. Only an
// explicit clause binding counts now.
if (rows.some(({ e }) => e.clause && overlaps(e.clause))) return true;
```

"string-work... never a model" means *deterministic rather than asking an LLM* —
not word-overlap. The defect we thought we had found had already been found and
fixed six days earlier. The case that was drafted asked the critic to attack a
claim we had already disproven ourselves; it is withdrawn.

**What we do know, measured:**

| | 22-17-49 | 03-29-45 |
|---|---|---|
| coverage | 78% (52/67) | **69% (48/70)** |
| rows carrying `e.clause` | 37 of 260 | **30 of 262** |
| `row binds its clause` | 12 | **5** |
| `seat takes its clause` | 25 | 26 |
| closest-acceptance | 30 | 35 |

The loss is concentrated in one path: **`row binds its clause` fell 12 → 5**, which
accounts for the whole 37 → 30, and that path requires a row whose matched keys
trace to a clause. A template the call REFUSED carries no keys, so we expected
closest-acceptance to explain it.

**It does not.** Across seven forties, closest-acceptance does not track coverage
at all:

```
closest-accepted  41 -> coverage 87%     33 -> 86%
                  38 -> 86%              40 -> 86%
                  34 -> 80%              30 -> 78%
                  35 -> coverage 69%   <- this run
```

So we have an unexplained 8-point drop in the project's most important number, a
mechanism localised to one binding path, and no cause. **Three hypotheses were
tested and disproven** (more refusals — refusals went DOWN; decoration crowding
out rows — 69% with vs 70% without; the audit renaming rows — renames flat).

**This is what we would most like the critic's read on.** Our own measurement
discipline failed four times in one day on this package (a parser silently
matching 0 of 30 records; a gate scored by reading its own message rather than the
row; four test assertions passing vacuously against an empty string; a row
reported lost that had shipped as a welded rider). A fifth — misreading a comment
and building a case on it — was caught only because a rendered block contradicted
it. We do not trust ourselves on this one.

## 2. The decoration finding, confirmed and sharpened

The critic's "12 of 13 free rows from three templates" is confirmed, and sharpened:
**16 decoration grants this forty, 0 rows judged to express their element.**

The concentration is exactly as the critic described. Every decoration row in this
forty, with the template under it:

```
Owlbear               "Adhesive"            adhesive
Scree-Pit Thing       "Clotting Scree"      adhesive
Hydra                 "Bloodied Fury"       bloodied-fury
Adult Red Dragon      "Bloodied Fury"       bloodied-fury
Vampire               "Warded Mending"      warded-mending
Trenchwake Leviathan  "Ringing Hide"        resonant-body
Vashka the Red        "Thunderous Riposte"  resonant-body
Reedsong Adept        "Shrieking Scales"    resonant-body
Marrowsun Lich        "Marrow Rise"         death-burst
Ilvareth Dusksong     "Dusk Brand"          marking-light
Garrison Sellsword    "Cheapest Contract"   assassinate
```

Three templates carry seven of eleven: `resonant-body` (damage-on-touch) ×3,
`adhesive` ×2, `bloodied-fury` ×2.

**One thing did improve, and the critic should check it rather than take our word.**
These rows now wear HONEST names — "Adhesive", "Bloodied Fury" — not names
borrowed from the twist. In the package-six forty the same mechanism produced
`Blindside Lash` on a damage-on-touch trait; in a run two hours before this one it
produced `Thorn Garden` on a MUD-WALKING trait and `Snaring Chain` on an adhesive
grapple (`smoke-out/express10-2026-10-22T02-45-13`, not in this package's blocks).
Because a decoration row's element claim is now revoked at grant, the name can no
longer advertise a twist the rules do not deliver. **The false advertising is gone;
the missing mechanics are not.** That is precisely why coverage fell — section 1.

**The mechanism is closest-acceptance.** Measured on the express ten: 3 of 5
revoked rows were the template the call had just REFUSED, and 3 of 3 where it
fired on the trait seat:

```
word match declined by the call: heated-body, absorption, aberrant-ground, ...
closest accepted: trait — the call REFUSED EVERY TEMPLATE but named
  "terrain-walk" as nearest; it lands rather than the row being dropped
free signature row: "Thorn Garden" — ... the call names the element it expresses
```

The call answered no_fit; the engine shipped its "if forced, nearest" and then
asked that refused template which element it expresses. It justifies post hoc.

It is not deleted — it took "the row shipped nothing" from 22% of blocks to about
1 in 41, and an empty seat is worse. Such a row now ships as **decoration**: no
receipt, no element claim, counted in `decoration_rows`. **The open question for
the critic: is a decoration row worth a seat at all, or should the seat stay
empty?** Eleven of this forty's rows are that question made concrete.

## 3. What landed, in the critic's order

- **Item 1 CLOSED.** Instrument honesty: the gap ship-check counts appended riders
  (a welded rider owned no row, so a SHIPPED rider read as a veto — the Purple
  Worm's charge rode its Bite). **`VETOED after acceptance` is now 8 of 36 (22%)**,
  from 10 of 30 and originally 23 of 41. Our package-six figure under-reported our
  own result. Verb preference stands down: the receipt test no longer fires only
  when a keyed template was also on the menu, because that template was ranked
  first and the call declined it.
- **Item 3 CLOSED.** The three provenance gates (print body, nova, rider) decide
  CREDIT, not existence — all three accept the element receipt, through one
  `takeAsFreeRow`. Not a blanket allowance: `expresses` is membership-validated,
  and the three decoration pins still refuse.
- **Item 4, first regression CLOSED.** The 2014 paralysis hole was not the gate
  reading the wrong printing — `checker.mjs:673` skips every `e.print` row, and
  the 2014 conversion REWRITES a print row while it keeps the print stamp, so a
  converted print row carries text print never wrote and is exempt from every
  adjudicability gate. `conversion-dropped-duration` is the printing-equivalence
  test; measured 1 fire, 0 false positives over 19 two-printing sheets, and it
  fired live on a fresh archlich.
- **Item 2, half.** The expression quote (judged against the finished row text by a
  call other than the one that picked the template, validated VERBATIM by the
  engine) and a SOFT rejection: a failed quote costs the row its CLAIM, not its
  existence. The family cap needed no word list — `heated-body`,
  `bloodied-burst` and `resonant-body` all declare `trigger=on_being_hit,
  effect=damage`, so the declared cell IS the family.
- **The Vrock ruling.** Re-measured under the gate's own predicate (which counts
  `N/Day`, not only `Recharge`), print carries ONE block with two novas — the
  Vrock. Our earlier "0 of 329" used a narrower pattern than the gate. A tweak off
  the Vrock keeps the pair print gave it; an engine-written second nova still fails.
- **The second nova is priced, not re-gated** (owner's ruling): `forceUngated`
  never hands the gate back, prices to the MULTIATTACK SUM, and moves only the
  dice — the save, area, condition and DC are untouched. 45 → 18 against a sum of 28.
- **One definition of a row's gate.** Five sites recovered it by re-reading the
  row's NAME; two more were found while checking. All seven now call `gateOf`.
  The field was being DELETED one line before the sheet was built
  (`delete e.was; delete e.wildcard; delete e.gate`) — a fact the donor declares.

## 4. What we have NOT proven, stated plainly

- **`e.gate` equivalence is 23 agree, 0 disagree, 3 UNSTAMPED** at 40-scale. The
  three are `Protective Magic (3/Day)`, `Misty Step (3/Day)`, `Divine Aid (3/Day)`
  — print-canon rows that are **not flagged `e.print`**. No stamped gate is wrong,
  and `gateOf`'s name fallback covers them, so no reader is misled. But the
  provenance gap is real and two other gates key on `e.print` (the Vrock exemption
  and the claim revoke), so a print row that is not flagged may be misjudged
  elsewhere. We have not chased it.
- **`condition_relation` and the rider ship-check fired live for the FIRST TIME in
  this forty** (2 relation traces, 9 welds). Three previous smokes produced
  neither. They rest largely on direct-call probes and unit tests.
- **The `expressed` branch of the quote has zero live positives.** 0 of 16.
- Coverage has read 69%, 71% and 69% on three runs. We believe that is the honest
  baseline; section 1 is the claim.

## 5. Method note

Prompt hypotheses were tested with **direct calls through the dev proxy**, not by
running the pipeline and reading traces — `scripts/probe-condition-relation.mjs`
(45/45 on the only distinction the engine acts on) and
`scripts/probe-expression-quote.mjs` (18/21, every error a false NEGATIVE, zero
false positives, which is why the rejection is soft). Both are checked in so the
prompts stay re-measurable. Two labels in those probes are recorded as DISPUTES
rather than re-labelled to improve a score.
