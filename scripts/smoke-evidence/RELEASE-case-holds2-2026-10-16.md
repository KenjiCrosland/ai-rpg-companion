# The case for the critic — your read of the stage 1/2 package, worked

2026-10-16, third package. **You were right on both claims you challenged, and
the corrections are larger than the challenges.** Two of my three headline
numbers were wrong in the direction that flattered the finding, and one of them
took three more passes to get right after your correction.

Gate: `npx jest` 70 suites / 2,759 passed. `npm run build` clean.
Blocks: `holds2-2026-10-16T17-11-11`, built to exercise your four holds.

---

## Part 1 — the corrections

### Claim A was backwards. Your premise stands.

You said the metric counts filler and asked for authored-only. Counting only
print, kit, GM-bound and fitted-template rows — excluding chassis rows and
generic seeds, as you specified:

| CR | authored | print | gap | all rows (my first pass) | meat-only ours / print |
|---|---|---|---|---|---|
| 0–1 | 0.98 | 0.81 | +0.17 | 2.19 | 37% / 48% |
| 2–4 | 0.93 | 1.41 | **−0.48** | 2.53 | 42% / 31% |
| 5–8 | 1.08 | 1.83 | **−0.75** | 2.64 | 41% / 12% |
| 9–12 | 0.74 | 2.22 | **−1.48** | 3.28 | 59% / 13% |
| 13–16 | 0.57 | 2.89 | **−2.32** | 2.97 | **67% / 0%** |
| 17+ | 1.65 | 4.10 | **−2.45** | 4.80 | 34% / 0% |

Under print from CR 2 up, and the gap **widens** with CR — you predicted "from
CR 5 up". At CR 13–16 we ship a meat-only sheet **two thirds of the time** and
print never does. The sheets are flat; the first metric was measuring the
chassis.

**Hypothesis 6 inverts too.** Authored-only: seat **stood down** 1.45, seat
survived 0.95; within CR 5–8, 1.24 against 1.06. A stood-down seat gets print
rows, and print rows are authored — so the earlier "confirmation" was entirely
the filler artifact you named. Three metrics, three answers, and only the
authored one is like-for-like. The variant seats do not demonstrably carry
authored move sets.

### Claim C was wrong by a factor of 56, and your #1 rests on it

You said attribute by final cause, and that the stand-down doesn't stop the
draw. Both true. **118 stand-downs since 10-15: 40% drew a row anyway.**

Getting the attribution right took three further passes, each wrong in a way
worth recording:

1. first-line attribution gave the print-body rule **56%**;
2. walking every line and taking the last gave it **0%** — because a TRAIT-seat
   miss further down the trace became the "final cause" of an empty ACTION
   signature, two different slots;
3. per-seat walking gave "no seed legal on this sheet" **58%** — which is a
   **summary** line printed *after* whatever actually killed the row.

Final, hand-verified against your two named blocks:

| cause | share |
|---|---|
| **the value floor dropped it** | **57%** |
| the trait seat landed, the action seat did not | 17% |
| the call was asked and found no fit | 12% |
| no action idea was produced | 6% |
| a post-call veto | 3% |
| no shelf template shared a verb (no call made) | 2% |
| **print body: "nothing invented"** | **1%** |

Your two receipts check out exactly: **Templar Vowsworn** stands down and then
draws the exploiter seed, so it is not an empty signature at all; **Sergeant
Halloran** stands down, draws Horrid Display, and the **floor** drops it.

**This moves your recommended order.** Your #1 was narrowing "nothing invented",
sized off my 56%. It is 1%. Meanwhile the floor is 57% of empty slots *and* 64
of 65 pattern-bearing floor drops are `save control` — so **pricing conditions
is the single biggest lever by both measurements**, and narrowing "nothing
invented" drops to near-last. Your own second item becomes first.

### Claim B stands, and the receipt you asked for

Each audit row now prints the corpus path it checked. No change to the finding.

---

## Part 2 — your four holds, on the blocks

Run `holds2-2026-10-16T17-11-11`, built one block per hold plus two regressions.

| hold | what shipped | fix | the block |
|---|---|---|---|
| 1 | "Thing makes two Brine-Sleeve attacks" — a refused *kind* answer flipped to a person | the head keeps its article; `shortForm` and `properInline` both had "of" as the only preposition | **Thing in the Well → `inline "the thing"`, kind** ✓ |
| 2 | "does not flee" accepted as a lack against a gravecrawler | **the negation was the receipt** — see below | both cases → `lacks asked: nothing taken away` ✓ |
| 3 | the part row named **"Swarmlord Whose Bite"** | `whose` was missing from a list that already held `that\|which\|who` | **`"Bite"`**, and no row named with a relative pronoun ✓ |
| 4 | Sister Aurelia's Censer, a declared flail, dealt Piercing | the declared weapon's own type outranks the body default | pinned only — no censer row drew this run |

Plus your alignment question: **a mute INT-4 construct swarm now ships
Unaligned.**

**Hold 2's root cause was not the receipt logic.** `LACKS_STOP` carried no
negation words, so the negation inside *every* lack phrase satisfied the
quote-the-GM receipt whenever the concept contained any "not" or "no". "does not
flee" matched a gravecrawler that "will **not** let go" and flipped the GM's own
grip into an absence. Two of your four cases are closed by adding the negation
vocabulary to the stop list. The other two are honestly still open:

- **"will not let go"** is the owner's already-deferred class — the sibling of
  "never leaves the gate read as a lack while never yields ground isn't".
- **"cannot break a lock"** shares only the noun with "picks locks for a devil".
  The GM said *picks*; the call invented *cannot break*. That is a verb-level
  judgment and a regex should not make it.

**Your alignment question was not a regression of ours.** Alignment was simply
ungated on made types — the call's answer shipped whatever it said. Print:
**Oozes 4 of 4 Unaligned; every Construct at INT 3 or less, 7 of 7** (Animated
Armor 1, Flying Sword 1, Rug 1, Gorgon 2, Clay Golem 3, Iron Golem 3, Stone
Golem 3). The first **aligned** Construct is the Flesh Golem at INT 6, and print
has none at INT 4 or 5 — so the line is drawn under 6 and the gap is stated in
the trace rather than hidden.

---

## Part 3 — one of your "smaller" items is not smaller

Chasing Dame Oriel's `blindsight 30 ft.`:

> **98% of our Humanoids ship darkvision (359 of 368 since 2026-10-12). Print
> gives it to 1 of 26, and 96% of print's Humanoids have no special sense at
> all. Zero print Humanoids have blindsight.**

That is a header line a GM reads first, on nearly every Humanoid sheet we make.
Not touched: it is a one-line fix with a blast radius across every Humanoid
sheet, so it is the owner's call. Flagging it as the largest single fidelity gap
currently measurable.

Your other smaller items, triaged honestly:

- **Korgan's reach 10 on a Medium** — print has 11 of 100 Medium blocks with a
  reach-10 row, so this is attested, not a violation. The size-follows-reach rule
  being intermittent is still worth a look.
- **Whisker Tithe's two mobility rows** — the one-mechanic rule fired on the
  species kit and not the rogue kit. Unfixed.
- **Open Palm's inline inconsistency, the Silence Claimant's missing trait for a
  third run, Final Toll losing "finishes the dying", the CR 13 meat-only swarm** —
  all reproduced in the earlier runs, none fixed.
- **`warded-mending`'s keys** — you are right that "mend" keying a template which
  *prevents* healing is a data error, not a judgment. Unfixed.

---

## What we got wrong, for your calibration

This round's errors are all one shape: **a measurement that flattered its own
finding got reported before its classifier was checked.**

1. **Claim A** — I measured the filler contribution myself (84% of
   `hit-and-run`) and then drew the opposite conclusion from it in the same
   document.
2. **Claim C** — four attributions of one number, three of them wrong, in the
   order 56% → 0% → 58% → 1%.
3. **Hypothesis 6** — reported refuted, then confirmed, then inverted, across
   three metrics.
4. **The package you read contained a run with a known-fixed defect.** Hold 1 is
   real and was fixed about an hour before the later run in the same package:
   `stage1b-14:47` shows "Templar" and "Thing"; `classes-eight-15:53` shows
   neither. Shipping the stale batch without flagging it is the error, not the
   code.

The rule we are adopting from this: **a measurement that confirms what we hoped
gets its classifier hand-checked against two named blocks before it goes in a
document.** Your Templar Vowsworn and Sergeant Halloran are exactly that check,
and they found three successive errors in one number.
