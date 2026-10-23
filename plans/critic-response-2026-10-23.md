# Critic response, package seven: the coverage drop was one clause

**Trigger:** picking up after the critic's review of
`sweep-2026-10-22T03-29-45` (package seven). Read
`critic-response-2026-10-22.md` beside it for what package seven landed.

**Verdict: 6 ship / 25 fix-lite / 9 fix** (2024 half 5/10/5; 2014 half 1/15/4).
Package six was 6/27/7.

## Two claims verified before anything else, both CONFIRMED

### 1. The coverage drop is one clause, and the cause is a self-scoring blank sheet

The critic paired the runs by concept and found the blank-form slot
(`" | role: brute"`) went **Klahk 10/12 → Uulgh 7/15** — clauses the ENGINE wrote,
scored as "user clauses". Verified directly from the saved sheets:

```
Klahk: 13 clauses recorded; userConcept = "A Slope-Render is a single gaunt, furred
       aberration whose ribcage has split open along the sternum…"
  - "A Slope-Render is a single gaunt"
  - "its segmented"                      <- Uulgh
  - "A furnace-hearted thing of black iron"
```

The blank path has the engine invent a description, then feeds that prose back
through the clause extractor and scores itself against it. Uulgh records **16**
such clauses; fragments like "its segmented" and "still hissing" are counted.

**The arithmetic holds exactly:** 52/67 − 10/12 = **42/55 (76%)**;
48/70 − 7/15 = **41/55 (75%)**. **One clause.**

So my package-seven case was wrong twice over: first in claiming coverage counted
titles (retracted before sending — it is COVERAGE BY PROVENANCE, and that loophole
closed 2026-10-16), then in calling the remainder an unexplained 8-point drop. It
was never 8 points. **And this is why closest-acceptance showed no correlation
across seven forties: the blank sheet's 12-16 self-scored clauses move the total
more than the engine does.** I tested four hypotheses against a number that was
mostly noise from one slot.

### 2. The expression judge never functioned — a one-line bug, now fixed

All 7 element-claim revocations say *"the audit returned no verdict for this
row"*; **zero** say "the audit judged that nothing in the row carries it". The
critic is right: **"0 of 16 expressed" is 0 ANSWERS, not 0 positives**, and I
reported it as a judgment.

Root cause: `callLLM` hands back the model's **raw text**, and
`validateAuditResponse` is a BOOLEAN validator, not a parser —
`verifyAuditFindings` parses the string itself. `readElementClaims(parsed)` read
`.element_claims` off a **string**, got `undefined`, returned `[]`, and every claim
was revoked for want of a verdict. The feature has never run in the pipeline.

**Fixed:** the reader now accepts a raw string, a fenced string, or an object, and
returns `[]` on garbage. Five tests pin it, including that an explicit `null`
quote is a VERDICT and not a missing answer — the distinction added one landing
earlier is the only reason this was visible at all.

**Gate:** Jest 117 suites / 3759 passing (+6), build clean.

## What the critic established that I had wrong

- **"Seat takes its clause" credits nothing** — 0 of 6 across three packages,
  while "row binds its clause" credits 23 of 24. My "rows carrying `e.clause`:
  37 → 30" conflated paths the checker does not read, so it was not measured on
  what the checker credits. The engine-side change is entirely
  **`row binds` 12 → 5**, and the trace should stop saying "answers".
- **Why key binds fell:** the idea a seat writes drifted from the clause it was
  handed. Owlbear's package-six idea was about climbing (spider-climb keyed and
  was accepted); this time it was about the grip, so the call rightly declined
  spider-climb and shipped Adhesive. **"Verb preference standing down is correct.
  It exposed that the idea is written to an element while the key match is made to
  the clause, and nothing reconciles the two."** That is the real finding.
- **The 30 → 35 closest-acceptance total hid a split**: 14 → 23 in the 2014 half,
  16 → 12 in the 2024 half.
- **The metric is wrong per clause in BOTH directions and the errors cancel** —
  5 shipped answers uncredited (including the red dragon's 1f flaw row, which has
  read 0/1 for three packages), 5 credits with no row behind them. Net 41. "Fix
  either category alone and the number moves about 5 points with no sheet
  changing."
- **Glacier Heart refutes a line in my own case:** a closest-accepted row DID
  carry a key and DID bind ("wake:concept"). I wrote that a refused template
  carries no keys. It can.

## The order, as the critic set it

**1. Instrument only, no engine change.** Re-score packages six and seven and
send both numbers; the hand score for this forty is **41 of 55 (75%)**, and a
result far from that means a hole remains.
   - a **credited-by column** in the gate table (clause → the row and path that
     credited it, or "—"), measured on the saved JSON;
   - blank-path sheets **out of coverage**, and **frozen clause lists** (cache by
     a hash of the concept text) so forties compare the same denominator;
   - **one credit rule** on every path: (a) key bind only when the call ACCEPTED
     the keyed template — closest-acceptance never counts; (b) a GM quote that
     lies inside ONE non-head clause and the expression judge agrees against the
     finished row text (5 of 9 quote receipts this forty quoted the whole
     description or the head clause); (c) LACKS by a removed row or a flaw row;
     (d) header by field match; (e) prose for descriptive clauses only;
   - why the judge returned nothing — **done, above**;
   - record reconcile on 2014 text.

**2. The refusal fallback:** clause-first retry → a print-grammar trait the body
would have → **empty seat**. On twist/exact/class bodies skip the middle step. Then
the decoration conditions (rulable alone; true of the body via declared
body/material metadata; no duplicate family including own-turn-punisher, grapple
and light-mark; never displaces a receipt row) and the budget order
**GM quote > element > decoration**, running after claim revocation.

**3. Engine:** verbatim seat clauses (the surgery cut "archlich" to "arch" and
"blind in one eye" out of the dragon's own twist); the engulf hint
(Cathedral-Vault Ooze: the hint fired, then "mechanics: grapple" dropped it, then
Engulf was gated out — "that was the twist"); **A2 back to DEX** for damage plus
prone in an area (print's own Ancient Gold Dragon Wing Attack is DC 25 Dexterity;
STR is for shoves); own-turn-punisher into the family cap and out of the default
fallback; quote receipts inside one clause.

**4. The nine fix blocks.**

## Decoration: the critic's answer is "mostly no"

> A GM never sees an empty seat. They do see a sticky owlbear.

Seven of eleven are worse than an empty seat (Owlbear's Adhesive; the Vampire's
`Warded Mending` with a ward defined nowhere — the package-six anchor bug, still
open; Vashka's thunder from lacquered plate colliding with her own Riposte;
Reedsong's thunder scales; Scree-Pit's third grapple; Marrowsun's `Marrow Rise`,
where **the budget kept the decoration and cut `Marrowsun Cinder`, the row that
carried the element receipt**; Ilvareth's shadow mage whose trait makes foes
glow). Hydra's and the red dragon's `Bloodied Fury` are harmless but add power to
PRINT bodies, which my own rule forbids.

## Instrument holes to fix before tuning anything

- **Record reconcile is the paralysis hole again**: all 4 "the clause left" lines
  are on 2014 sheets whose text still imposes the condition (Owlbear "is also
  grappled", Scree Entombment "blinded and restrained", Clotting Scree
  "grappled", Vessel Devouring "be grappled (escape DC 15)"). Likely 2024 grammar
  matched against 2014 text. **Extend the printing-equivalence test to condition
  records.**
- **A failed call must mark its sheet**: `[ENRICHMENT] Failed to enrich Owlbear:
  Failed to fetch` sits in the Goblin Boss trace and the Owlbear reads clean.
- **Trace vs sheet**: Ser Aldric's trace keeps "Warding Line"; the sheet has no
  such row.
- **Provenance**: the trace says "binds the GM's words" for keys tagged `:idea`,
  and the rename guard protects "the GM's own word" for element text the GM never
  typed (Cragwake "charged", Ser Aldric "line"). Element provenance is still needed.
- **conversion-dropped-duration** should repair deterministically by copying the
  2024 duration into the 2014 text rather than shipping a FAIL.

## Test categories, proposed (the critic asks for the owner's ok first)

Behaviour tests on fixture sheets from this package; none assert on prompt text.

1. **Credit paths, one case each** — an accepted keyed row credits; a
   closest-accepted keyed row does not (Glacier); an in-clause GM quote with the
   judge's yes credits (Purple Worm); a whole-description quote does not
   (Passexile); a flaw row credits its LACKS clause (Adult Red Dragon); prose
   credits a descriptive clause (Brass Tyrant) but not a mechanical one
   (Breaching Frame).
2. **Denominator** — a blank-path sheet adds nothing; the same concept text yields
   the same clause list every run.
3. **Saved-JSON round trip** — the fields the checker reads (`e.clause`, `gate`,
   `print`) survive save and load.
4. **Condition records match both printings** — a 2014 "is grappled" keeps
   Grappled in the record (Owlbear fixture).
5. **Budget order** — decoration never outranks a receipt row (Marrowsun fixture).
6. **Seat clause** — the clause a seat receives is a verbatim substring of the GM's
   text ("archlich" stays whole).

## The lesson I most need to carry

Five measurement failures in one day on this package, and a sixth here: I took a
project-level number at face value without checking what fed it. The blank sheet
has been scoring the engine's own prose as GM clauses for every forty on record,
and I built a release case on the delta. **Before trusting any aggregate, check
what is in its denominator** — and prefer the critic's method of pairing runs by
concept over comparing totals.

## Item 1 landed (instrument only) — and the re-score, with its limits

**Both packages, same denominator, blank sheet excluded:**

| | GM clauses | coverage |
|---|---|---|
| package six (`22-17-49`) | 14 dropped of 55 | **75%** |
| package seven (`03-29-45`) | 18 dropped of 55 | **67%** |
| the critic's hand score for seven | 14 of 55 | **75%** |

**The denominator now matches the critic's exactly (55).** The blank-path slot is
out, and the line says so rather than leaving the number bare:

```
**Dropped 18 of 55 GM clauses** (coverage 67%) … 1 blank-path sheet(s) excluded —
the engine writes their description, so scoring it is self-scoring (Uulgh 6/15).
```

**We are 4 clauses below the critic's 75%, and the gap is exactly their list.**
Of the five shipped answers they found uncredited, one now credits (the red
dragon's `Sight Weakness`, via the new LACKS flaw-row path — it had read 0/1 for
three packages). **The remaining four are the gap**: Owlbear's `Climbing Ambush`,
Purple Worm's `Lodged Armoury`, the Vampire's `Thorn Garden`, Meshrin's
`Marsh-Quaking Roar`.

**Why the re-score cannot settle it, stated plainly.** Two of the five credit
paths need provenance that POSTDATES these runs:

```
rows carrying gmQuote: 0    accepted_closest: 0
```

So rule **(b)** (a GM quote inside one non-head clause) and the
**closest-acceptance withholding** are both INERT on every saved forty. Two of the
four missing credits are quote receipts (Purple Worm, Meshrin) that (b) should
catch once a run carries `gmQuote`. **A fresh forty is the only way to get the
real number**, and 67% is a floor, not the answer.

### What landed

- **The one credit rule**, split into named paths: (a) key bind, only when the
  call ACCEPTED the keyed template; (b) GM quote inside ONE non-head clause;
  (c) LACKS by a removed row or a flaw row; (d) header by field match; (e) prose
  for DESCRIPTIVE clauses only.
- **The credited-by column** on `fidelity.credits` — per clause, the path and the
  row, or `—`, plus a NOTE when a credit was withheld and why ("a key bind on X,
  refused by the call (closest-accepted) — no credit"; "carried to the
  description, but the clause is mechanical — no credit").
- **Blank sheets out of coverage**, with the exclusion named in the line.
- **The judge's raw-string bug** (above).

The rule immediately withheld the five mechanical-prose credits the critic
named — Breaching Frame, Vashka, the Swarm, plus Fenrot and Uulgh. Note Fenrot is
the critic's own caveat: `Rot-Bloom Hex` DOES answer "curses trespassers", so
withholding prose there is right and the row still needs to credit by (a) or (b).

### Still open in item 1

- **Frozen clause lists** (cache by a hash of the concept text) — not started.
  Denominators still drift from the same words (Caustic Scythe 5 → 4, Meshrin
  7 → 8).
- **Record reconcile on 2014 text** — not started; all 4 lines are the paralysis
  hole's class.
- **Seat-takes should stop saying "answers"** — not started. The critic is right
  that it credits nothing (0 of 6 across three packages) and should not: Owlbear's
  `Adhesive` "takes" the climb clause.
- The judge has a real verdict corpus only from the next run, so (b)'s second
  half (judge agreement) is deliberately not yet gating.

**Gate:** Jest 117 suites / 3759 passing, build clean.

## Item 1 FINISHED (instrument only)

| piece | state |
|---|---|
| the one credit rule, paths named | **done** |
| the credited-by column | **done** (`fidelity.credits`) |
| blank sheets out of coverage | **done**, exclusion named in the line |
| frozen clause lists | **done**, with drift reporting |
| why the judge returned nothing | **done** — the raw-string bug |
| record reconcile on 2014 text | **2 of 4 fixed; 2 need a ruling** |
| seat-takes stops saying "answers" | **done** |

### Frozen lists: the drift was in the MARKS, not the clause count

My first drift check compared clause TEXT and reported "no drift" — which
contradicted the critic, so I measured directly: **39 shared concepts, 39
identical raw counts, 0 text drift.** The critic's Caustic Scythe 5 → 4 and
Meshrin 7 → 8 are the SCORED denominator, and the checker's `listed` filter keys
on `head` and `kind`, not on text. A clause re-marked `descriptive` →
`mechanical` moves the denominator with the count unchanged.

The comparison now hashes `text#kind#head#polarity`, and the drift appears:

```
4 concept(s) whose extraction DRIFTED from the frozen list (scored against the frozen one):
  Loft Bell:             2 frozen vs 2 this run (same count — re-marked kind/head)
  Caustic Scythe Horror: 6 frozen vs 6 this run (same count — re-marked kind/head)
  Swarm of Tolling Pyres:2 frozen vs 2 this run (same count — re-marked kind/head)
  Meshrin:               8 frozen vs 8 this run (same count — re-marked kind/head)
```

Both forties now score against **55 GM clauses**: package six **75%**, package
seven **67%**. `scripts/frozen-clauses.json` holds 39 concepts; delete an entry to
re-freeze deliberately.

**A near-miss worth recording:** a text-only comparison reported "no drift" on the
exact sheets the critic had named. Had I accepted it, I would have reported the
denominator as stable while it moved. The rule: compare what the consumer READS,
not what looks like the data.

### Record reconcile: 2 of 4 fixed, 2 need a ruling

Confirmed the critic's diagnosis exactly — the reconcile tested ONLY the 2024
grammar:

```js
if (new RegExp(`has the ${e.imposes} condition`).test(e.text)) continue;  // 2024 only
```

so on a 2014 sheet "is grappled" failed it and a TRUE record was deleted. Same
class as the paralysis hole. It now reads through `imposedConditions`, the shared
reader, which handles both printings. **Corpus guard: 0 print rows carry a record,
0 contradictions** — no print risk.

Re-tested on the four rows the critic named:

```
KEPT           Scree Entombment  -> ["Blinded"]
KEPT           Vessel Devouring  -> ["Grappled"]
STILL DROPPED  Owlbear/Adhesive  -> []
STILL DROPPED  Clotting Scree    -> []
```

**The remaining two share one phrasing: "is also grappled BY IT (escape DC 15)".**
Two obstacles, and they conflict:

1. the inserted adverb — the reader matches `is grappled`, not `is also grappled`;
2. **`grappled by` is deliberately EXCLUDED elsewhere** as a prerequisite form —
   `grapple-no-escape` uses `/\bis grappled\b(?!\s*\(escape DC)(?!\s+by\b)/`,
   because "grappled by X" usually states who holds the target rather than
   applying it.

So teaching the reader this form means overriding a distinction another gate
relies on. **That is a word rule with a live conflict, so it is proposed, not
written** (CLAUDE.md). Options: (a) tolerate an adverb and treat "grappled by it"
as an application when the row is the grappler — needs a corpus measurement
against the prerequisite cases; (b) have the authoring call record `imposes` for
adhesive-style rows and trust the record over the text; (c) leave both dropped
and accept the two wrong records.

### Deferred, per the owner

The two uncredited answers that only have a seat-takes route (Owlbear's
`Climbing Ambush`, the Vampire's `Thorn Garden`) wait for a fresh forty, where
rule (b) will be live and may catch them. If it does not, they need a sixth path
(the expression judge against the finished text) and that is the owner's call.

**Gate:** Jest 117 suites / 3759 passing, build clean.

## Item 3 started: A2 back to DEX for damage-plus-prone in an area

**Measured against print first** (house rule). Print's own rows that deal damage
in an AREA and impose Prone:

| save | rows |
|---|---|
| **Dexterity** | **3** — Bulette/Deadly Leap, Kraken/Fling, Giant Ape/Boulder Toss |
| Strength | 1 — Centaur Trooper/Trampling Charge |
| Wisdom | 1 — Sphinx of Valor/Roar |

The critic's claim holds, and the single Strength is the one that proves their
rule: `Trampling Charge` is a charge that moves through creatures — **"STR is for
shoves."**

`generate.mjs:6695` put `['Strength', 'Dexterity']` first for anything Prone-ish,
so a Constitution save on a damaging area cone was retyped to STRENGTH — Glacier's
`Killing Cold` (13d10 cone) and Brass's `Molten Exhalation` (16d8 cone). The
discriminator is now the row's SHAPE, not the condition:

```
Killing Cold      areaDmg=true  movement=false -> Dexterity
Molten Exhalation areaDmg=true  movement=false -> Dexterity
a shove that knocks prone  areaDmg=false movement=true -> Strength
```

The shove half reads the row's own recorded `imposesMovement` flag, so it needs no
new text reading; the area-and-damage half reads the same two shapes `valueCheck`
already reads.

### A flake, recorded rather than buried

The first full run after this edit reported **1 failed** —
`generate-2024.spec.js › correctable violations are fixed without a retry call`,
with `monster.sections.Actions[1]` undefined. I stashed the A2 change and ran the
test both ways in isolation: **green both times**, and two subsequent FULL runs are
green at 3759. So it is order-dependent or genuinely intermittent, not an A2
regression. Noted here because a one-off failure that vanishes is exactly what
costs a future session a day (cf. `dungeon-door-conversion-flake.md`). **If it
recurs, capture the full-suite ordering** — the test asserts on `Actions[1]`, so a
shared-fixture mutation from an earlier suite is the first thing to look at.

**Gate:** Jest 117 suites / 3759 passing (two consecutive full runs), build clean.


---

## Item 2 progress, 2026-10-22 — and the one decision left

**The body half of the decoration conditions is DONE** and it was the larger
half. `NEEDS_BODY` + the call's `body_verdicts`
(`plans/declare-the-body-2026-10-22.md`) is condition 2, "true of the body via
declared body/material metadata", and it already answers **four of the critic's
seven bad rows**:

| the critic's bad row | now |
|---|---|
| Owlbear's `Adhesive` | `adhesive` judged FALSE live; the sheet ships Multiattack + Rend only |
| Vampire's `Warded Mending`, ward defined nowhere | `warded-mending` judged FALSE live; it took print's "bound to its resting place" instead |
| Vashka's and Reedsong's thunder | `resonant-body` judged FALSE for a lizardfolk, and TRUE for a brass gate-bell |
| Ilvareth's glowing foes | `marking-light` judged FALSE for a shadow mage |

**Condition 4 is DONE: GM quote > element > decoration.** `settleSheetBudgets`
walked `freeRows` in SHEET order and kept the first that fit, so which row
survived a budget of 1 depended on where it sat in the sections object. That is
the Marrowsun bug exactly — it cut `Marrowsun Cinder`, which carried the element
receipt, and kept `Marrow Rise`, a decoration. Now ranked by the stamps the grant
site already writes (`gmQuote` → `expresses` → `decoration`), stable so sheet
order still breaks ties, with a trace line so a cut row can be accounted for.
Six tests.

### Condition 3 is PARTLY covered, and the gap is data, not logic

Measured — the cap reads the declared cell `section/trigger/effect` as a proxy for
family, and for the three families the critic named that proxy holds unevenly:

| family | declared cells | caught? |
|---|---|---|
| grapple | `hook-drag`/`reel`/`pull-through` all `action/save/movement`; `snare`/`swallow` both `action/save/condition`; `snatch` `rider/on_hit/condition` | two groups caught, `snatch` separate |
| light-mark | `marking-light` `trait/always/condition`, `reveal` `action/save/condition` | **no** |
| punisher | `ward-retaliation`/`riposte` both `reaction/on_being_hit/damage`; **`own-turn-punisher` `bonus_action/always/damage`** | **no** — and this is the critic's own "own-turn-punisher into the family cap" |

`own-turn-punisher`'s declared cell is honest (it IS a bonus action that always
fires) but its FAMILY is retaliation. So the fix is a declared `family` on the few
templates whose cell is not their family — data, in `shapes.mjs`, not a new rule.
Left for item 3, where the critic filed it.

### THE DECISION: the clause-first retry costs a call

The fallback the owner approved is **clause-first retry → print-grammar trait →
empty seat**. Steps 2 and 3 are free. **Step 1 is an extra LLM call on every
refusal path**, which runs against the standing "no cost increases" preference,
so it is the owner's call and not mine:

- **(a) Retry as specified.** Best quality: the seat gets another chance against
  what the GM actually asked before anything is invented. Costs +1 call on sheets
  where the call refused every template.
- **(b) Skip the retry — print-grammar trait, then empty seat.** Free. Loses the
  clause-first attempt, so some seats go empty that a retry would have filled.
- **(c) Retry only when there IS a clause to retry against** (a GM quote or a
  twist clause on the sheet). Costs a call on a subset, and spends it only where
  it has something to aim at.

My lean is **(c)**: the retry's whole value is the clause, so paying for it when
there is no clause buys nothing. Note also that the body gate should have made
refusals *rarer and better-founded*, so whatever the cost is, it now falls on
fewer sheets — but that is an expectation, not a measurement, and the forty is
where it would show.


---

## The retry landed as (c), and the measurement is not flattering

Owner chose **(c)**: retry only when there is a clause to aim at. Landed —
`unansweredClause({ anyPath: true })` is asked at the refusal, before anything is
invented; one retry, never a loop; and when there is no clause the trace says so
and **no call is spent**. 6 tests, two of them about the COST, which is what (c)
buys.

### It also exposed item 3 as a hard dependency, by measurement

The first run (`retry6-2026-10-22T15-44-26`) fired **5 retries and 0 succeeded** —
and three of the five were aimed at text like this:

| handed to the retry | the GM actually wrote |
|---|---|
| `"Adult Red Dragon — from an old lance"` | blind in one eye from an old lance |
| `"a marsh"` | a marsh witch who curses trespassers and drinks the years out of them |
| `"Hydra — whose stumps smoke"` | whose stumps smoke instead of regrowing |

So the retry was paying for a call and aiming it at a gutted clause. **Two causes,
both now fixed, and I had the first one wrong:**

1. I assumed the receipt cut in `positiveHalf` was the culprit and guarded it
   behind a new `forCall`. Tests green, re-ran, **the dragon was unchanged.** The
   fix was correct in principle and did not touch that case.
2. The real cause was the `lacks` branch, which cut `lackQuote` unconditionally.
   On a LACKS clause that quote **is** the twist — the dragon's record is
   `"Adult Red Dragon — blind in one eye from an old lance" -> LACKS`. Cutting it
   is right for the unanswered TEST and wrong for handing over.

Clauses are now handed whole (`retry6-2026-10-22T15-55-46`), pinned by two tests:

```
"Adult Red Dragon — blind in one eye from an old lance"
"Hydra — whose stumps smoke instead of regrowing"
"keeps a rose garden of thorns"
```

### What the retry is actually worth — unresolved, and n is small

| run | clauses | retries fired | succeeded | FAIL of 6 |
|---|---|---|---|---|
| T15-44-26 | gutted | 5 | **0** | 1 |
| T15-49-24 | partly fixed | 5 | 1 | 0 |
| T15-55-46 | whole | 5 | **1** | 1 |

**Fixing the clause did not raise the success count** (1 → 1). At 1 in 5, (c)
costs about five extra calls per six blocks to save one seat, and the FAIL column
(1, 0, 1) is noise at this sample size — these are stochastic generations and six
blocks cannot separate a real effect from run-to-run variation.

So: the clause fix is a clear win and stands on its own — it serves the twist path
and the existing clause-first seat binding, not just the retry. **The retry's own
value is unproven**, and the honest test is the forty, where 1-in-5 either holds
or does not. If the owner wants the cost back before then, the retry is one
`if` to disable and the clause fix keeps all of its value.


---

## The measured 10, 2026-10-22 — `branch10-2026-10-22T16-09-12` and `...T16-16-11`

Built fresh to cover only this branch's changes, with the metrics fixed before the
run. Also landed first: **condition 3, the declared `FAMILY`.**

### Condition 3 is DONE, and the declared cell was never the family

| family | spans these declared cells |
|---|---|
| retaliation | `trait/on_being_hit/damage` (heated-body, bloodied-burst, resonant-body), `reaction/on_being_hit/damage` (ward-retaliation, riposte), **`bonus_action/always/damage` (own-turn-punisher)** |

`settleSheetBudgets`' comment claims "the declared cell IS the family". Measured:
true only of the three templates it was written against. So `FAMILY` is declared
metadata — 7 entries reusing the engine vocabulary donor rows already carry
(`punisher`, `containment`) plus `light-mark` — and `sheetEngines` reads it off
the row **before any text rule**. No new prose rule was added. Verified: a
contact-damage row now bars `own-turn-punisher`, a light-mark row bars `reveal`, a
containment engine bars `snatch`, and a clean sheet still offers all three.

### A DEFECT I had shipped, found by doing that work

**Eight `needs_body` declarations never reached their template.** The catalog is
built from TWO branches — `SHAPES` and `LIBRARY_SEEDS` — and only the first
carried the field, so `coating`, `phase-slip`, `herd`, `rally`, `snare-bolt`,
`zone-seed`, `blighted-ground` and `drain` were **silently inert from the moment
they were written**. The table read complete, which is worse than an empty one.
Fixed, and `body-requirements.spec.js` now asserts every `NEEDS_BODY` and `FAMILY`
key lands on its template, on both branches. All seven reachable ones were asked
in the run.

### The metrics, against what I fixed beforehand

| metric | result |
|---|---|
| verdict completeness | **9 of 10 sheets answered every requirement** (22/22 … 32/32); one answered **8 of 27**, and those 19 fell back to `keys` as designed. The at-scale probe showed 41/41 on 12/12 with a bare prompt — in the real idea call, partial answers happen. The fallback is load-bearing, not decoration. Second run: 10 of 10 complete. |
| `keys` fallback (no verdicts at all) | 0 |
| Owlbear retry spend | **0 lines** — choice (c) spent nothing where there was no clause |
| handed clauses | Hydra and dragon both whole |
| two rows of one declared family | none |
| decoration kept over a receipt row | none |
| FAIL | 2 of 10, then **1 of 10** |

### Finding: the retry was being aimed at nouns

4 of 8 handed clauses were bare descriptive heads — `"a tar-pit horror"`, `"a
will-o-wisp"`, `"a bronze shrine-warden"`, `"a courtly duelist in silk"`. The
record splits a concept into a descriptive head and a mechanical remainder, and
the loop returned whichever came first. Fixed: a **mechanical** clause is
preferred, the head is the fallback. Verified — all eight handed clauses are now
rules-shaped (`"drags what it touches down into the black sludge"`, `"burns
whoever lays a hand on it"`, `"turns every thrust back on its owner"`).

### The retry's economics — still unresolved, and my expectation MISSED

| run | clauses | fired | succeeded |
|---|---|---|---|
| retry6 T15-44 | gutted | 5 | 0 (0%) |
| retry6 T15-55 | whole | 5 | 1 (20%) |
| branch10 T16-09 | whole, heads sometimes | 20 | 10 (**50%**) |
| branch10 T16-16 | mechanical preferred | 22 | 8 (**36%**) |

**I stated ">= 50%" before the mechanical-clause fix and got 36%.** The clause
CONTENT is unambiguously better and that is deterministic — all eight are
mechanical, measurable, not a matter of taste. The success RATE went 50% → 36%,
which is within noise at n=10 and did not meet the expectation. Two runs cannot
separate it. Across every run with whole clauses: **19 of 47, 40%** — about 2.2
extra calls a block to save ~0.8 seats. Whether that trade is worth it is a
forty-sized question, and the retry remains one `if` to disable.

### One FAIL repeated, which the long tail usually does not

`lack-honored` on the Adult Red Dragon failed in **both** branch10 runs — "the GM
asked for an absence … and the sheet still carries it". The BACKLOG's standing
observation is that forty FAILs turn over almost completely between runs, so a
repeat is a signal. The dragon's own result today went: `name-mechanic`, clean,
`name-mechanic`, `control-aoe-ungated`+`lack-honored`, `lack-honored`. It did NOT
appear in the three runs before branch10, two of which already carried the lacks
fix.

**A plausible mechanism I have NOT confirmed:** the retry now aims at "blind in
one eye from an old lance", so it may be ADDING a row that expresses the blindness
instead of REMOVING the sight-dependent row the lack demands. That is a guess.
`lack-honored` has 25 prior evidence files, so the class is old. First thing to
check on the forty.


---

# THE FORTY, 2026-10-22 — `sweep-2026-10-22T17-05-33`

Same batch as package seven (`sweep-2026-10-22T03-29-45`), so this is a true
before/after. Metrics were fixed before the run.

| metric | baseline | now | verdict |
|---|---|---|---|
| FAIL | 2 of 40 | **2 of 39** | in band (2-5), only `name-mechanic` |
| **generation threw** | 0 | **1 — Vashka the Red** | **REGRESSION. Must fix.** |
| decoration rows | 14 of 40 | 13 of 40 | essentially unchanged |
| — on twist | 7 | **2** | the body gate working where the bug was |
| — on homebrew | 4 | **7** | **worse** |
| — on class_npc | 3 | 4 | slightly worse |
| — on exact | 0 | 0 | still immune, as it always was |
| free rows of any kind | 22 | 26 | up |
| **retry** | — | **34 fired, 6 succeeded (17%)** | **does not pay** |
| verdict completeness | — | 38 complete, 0 partial, 1 with none | good |
| duplicate-family cuts at ship | — | **0** | never fired |
| budget reorder | — | **0** | never fired |
| `lack-honored` | — | absent | was long tail, not an interaction |
| clause drift | — | 7 concepts re-marked kind/head | watch |

## 1. The retry does NOT earn its cost — my projection was optimistic

**34 calls to save 6 seats: 0.85 extra calls a block for 0.15 seats, about 5.7
calls per seat.** I projected ~40% from 47 fired across small runs; at forty scale
it is **17%**. The small-sample runs (50%, 36%) were noise around a much lower
true rate, which is exactly what n=10 cannot tell you.

So choice (c) as recommended is a bad trade on real data, and that is my error of
estimation, not the owner's choice. The clause fixes underneath it stand on their
own — they serve the twist path's existing clause-first binding regardless. **The
retry is one `if` to disable** and I would now recommend disabling it unless the
owner values the 6 seats at 34 calls.

## 2. The body gate works, but only where print gives something to fall back on

Twist decorations fell **7 → 2**. Homebrew rose **4 → 7**. Net 14 → 13.

A plausible mechanism, unconfirmed: the gate shortens menus, so more seats reach
a refusal; on a twist there is a print body whose own grammar can fill the seat,
and on homebrew there is not — so the refusal lands in closest-acceptance instead.
If that is right, the critic's **print-grammar trait** step (the middle one, which
they said to skip on twist/exact/class) is pointed at exactly the wrong path, and
homebrew is where it is actually needed. Worth checking before building it.

## 3. Two of my changes never fired in forty blocks

The duplicate-family cut and the free-row budget reorder both fired **zero** times.
They are guards, so not firing is not failure — but **no benefit is demonstrated
for either from this run**, and I should not claim any. The family cap's value
rests on the unit tests and on the critic's reading of package seven.

## 4. The crash — the one thing that must be fixed

`Vashka the Red` (class_npc, CR 6, "a hobgoblin warlord in lacquered plate who
fights from a shield wall and never breaks ranks") threw
`Cannot read properties of undefined (reading 'library')`. It generated cleanly in
the baseline, so it is a regression from today's work. Not yet diagnosed; the
candidates are the new `EXCLUDE_ON` entries (which make `supersedesRow` evaluate
on templates it never ran on), the seed-branch field additions, and the retry's
second `readFit`.


---

# THE FORTY AFTER THE DAY'S WORK — `sweep-2026-10-23T04-57-39`

Same batch as package seven. Baselines: pkg7 = `...T03-29-45`, mid-day =
`...T17-05-33`.

| metric | pkg 7 | mid-day | NOW | |
|---|---|---|---|---|
| FAIL | 2/40 | 2/39 | **4/40** | in band (2-5), four different known classes |
| generation threw | 0 | **1** | **0** | Vashka passed; the guard never fired, so the crash just did not recur |
| retry calls | — | 34 | **0** | the owner's "no retry", honoured |
| `[gap] UNNAMED` | 12 of 33 | 12 of 33 | **0 of 40** | the instrument fix holds at scale |
| body verdicts complete | — | 38, 1 partial | **39, 0 partial** | |
| refusals (closest-accepted) | 35 | 28 | **38** | **worse** |
| decoration rows | 14 | 13 | **18** | **worst yet** |
| Emanation clauses | — | — | 9 | print's idiom |

## The cost of "no retry", now quantified

Refusals 28 → 38 and decorations 13 → 18. That is not noise: **the retry was
filling 6 seats a forty**, and with it gone those seats refuse and fall through to
closest-acceptance, which ships them as DECORATION.

So the trade is: **34 fewer calls a forty, about 5 more decoration rows.** The
critic judged 7 of 11 decoration rows worse than an empty seat, so this is a
quality cost, not just a count. Three ways to spend it:

1. **Accept it** — 34 calls is real money and the decoration conditions now gate
   what ships (body truth, family, budget order).
2. **Put the retry back only where the clause is MECHANICAL** — on the forty, the
   clauses it aimed at were ~⅔ names and flavour. A mechanical-only retry would
   have fired perhaps a third as often for most of the benefit.
3. **Take the empty seat instead of the decoration** — the critic's own
   preference, and the one remaining piece of their item 2.

My lean is (3) then (2): the critic's whole argument is that an empty seat beats a
bad row, and we have never actually tested shipping one.

## Built and tested, but NOT exercised by this batch

- **A Line: 0 shipped.** `spew` must be picked AND the call must choose Line.
- **`life-drain`: asked on 38 sheets, judged NOT TRUE on 29, shipped 0 rows.** The
  batch holds 3 draining concepts, and the obvious one (Vampire) is print-exact
  with print's own HP-maximum Bite — which it correctly did not double. The
  evidence for this feature is `drain10`, not this run.
- **The nullish-row guard never fired.** Vashka's crash did not recur, so the guard
  is still untested in production. Its trace is the lead if it ever does.

## A metric of mine that was wrong

I fixed "no bare `each creature within N feet`" as a pass/fail. Three shipped —
and all three are print's OWN shape, from authored and print rows rather than
template frames: *"each creature within 10 feet of the space it left"* is
Lich/Deathly Teleport, the one instance print has. The metric should have read "no
TEMPLATE-derived bare-radius clause", which is 0.


---

# THE METRIC THAT MATTERED WENT BACKWARDS

**Owner, 2026-10-23:** *"let's not lose sight of whether GM's requests for a power
or ability, or if signature abilities, are being properly translated to a template
with rider. that was the point of this whole session."*

GM clauses answered by a row carrying a receipt, same batch each time:

| forty | clause coverage | element coverage |
|---|---|---|
| `...T03-29-45` (package 7, before today) | **43/70 — 61%** | 203/220 — 92% |
| `...T17-05-33` (mid-day) | 40/69 — 57% | 178/215 — 82% |
| `...T04-57-39` (after the day's work) | **30/70 — 42%** | 193/220 — 87% |

**Down 19 points from where the day started.** Decoration rows rose 14 → 18 over
the same span. So the sheets answer the GM LESS often and invent MORE often, which
is the opposite of the session's goal.

## I evaluated the retry on the wrong axis

The retry was removed on my framing: **34 calls fired, 6 succeeded (17%), ~5.7
calls per seat saved.** Every one of those numbers is about COST and HIT RATE.
None of them is about clause coverage — the thing the retry existed to serve.

Six clause answers out of a 70-clause denominator is **~8.6 points**, which is
about half the total drop. So on the metric that mattered the retry was earning
its keep, and I reported it as a failure because I measured the wrong thing. The
owner's "ok no retry" was a reasonable call on the framing I gave; the framing was
incomplete.

## What I can and cannot attribute

A name-matched subset (15 sheets whose generated names survived between runs)
shows **2 worse, 12 same, 1 better** — which does NOT account for a 15-point
aggregate move. Generated names change between runs, so most sheets cannot be
paired. **The per-sheet cause is therefore unattributed**, and I am not going to
guess it.

Two hypotheses, in order of expected size:

1. **the retry removal** — ~8.6 points by the arithmetic above; testable by
   restoring it and re-running the forty with nothing else changed.
2. **the 8 newly-live `needs_body` declarations.** `coating`, `phase-slip`,
   `herd`, `rally`, `snare-bolt`, `zone-seed`, `blighted-ground` and `drain` were
   silently inert until mid-session and went live between the two forties. Eight
   more gateable templates means shorter menus, more refusals, fewer clause
   answers. Testable by logging refusals that cite a body verdict.

## The recommendation

**Restore the retry**, in its mechanical-clause-only form: on the forty, ~⅔ of the
clauses it aimed at were names and flavour, so gating it on a MECHANICAL clause
should keep most of the 8.6 points at roughly a third of the 34 calls. Then
re-measure clause coverage, not hit rate.

And **clause coverage becomes the headline number of every run from here** — above
FAIL, above decoration counts, above everything. It is what the engine is for.

## Landed and verified this round: print's legendary rows ride

Separate from the above, and clean. `generate.mjs:6204` required a non-empty
`Legendary Actions` section before print's own legendary rows could be applied —
so it could only OVERWRITE a section the chassis had made. The CR 17+ chassis
makes one; nothing at CR 10-16 does. Result: our CR 10-16 sheets carried **0**
legendary rows against print's **1.0 per sheet**, and the CR 13 Vampire lost
print's own `Deathless Strike` and `Beguile`.

Ten, all controls correct: Vampire twist AND exact both ride `Deathless Strike,
Beguile`; Mummy Lord rides `Glare, Necrotic Strike, Dread Command`; the CR 17
dragon unchanged at 4 rows with no duplication; and the six creatures print gives
none (Stone Golem, Purple Worm, Hydra, brass tyrant, bog hound, Brother Halric)
stay at 0.

## The critic package must be keyed by sheet index, not name (2026-10-23)

Two Owlbears (#03 and #21) collapsed to one entry in package seven's
`BLOCKS.md`, and the same collision happened in an earlier package. The smoke
harness is NOT at fault — `scripts/smoke-statblock.mjs:325` already writes
`${n}-${slug(name)}.md`, so its per-block files are unique. The collision was in
the ad-hoc package builder, which keyed a map by monster name.

When building the next critic package:
- key by the run's sheet index (`n`), never by `monster.name`;
- assert `new Set(keys).size === blocks.length` before writing, and fail loudly
  if not — a silently short package is how two reviews were spent on 39 blocks
  while reporting 40.
