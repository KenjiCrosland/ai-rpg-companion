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
