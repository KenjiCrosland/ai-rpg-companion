# HANDOFF — the amendment: the cap, the leavings, and four holes closed

2026-11-23 · branch `statblock-enhancments-part-2` · for the owner and for Fable

**The current recording is `baseline-2026-11-23`.** It replaces `baseline-2026-11-22`, which this
pass replayed from. **`baseline-2026-11-20` stays** — `scripts/ribbon-probe.mjs` reads it as its
default context source, so something does still read the 20 November folder. `baseline-2026-11-18`
is read by no code; it appears only in committed evidence prose.

Six commits this pass, ready to push. Nothing is pushed.

| # | Commit | What |
|---|---|---|
| 1 | `a65f56d` | the cap is 45, and a leaving needs an object, not a list |
| 2 | `76a496d` | four holes the first twenty-five found (26 tests) |
| 3 | `b03a39a` | a tether takes nothing, in whatever word — the first patch of the leak |
| 4 | `628ccaf` | a tether's rule, written the positive way round — the leak's real fix |
| 5 | `d161d45` | the forty re-recorded, the blocks file and this report |
| 6 | `856d63b` | the superseded ribbon blocks file goes (a deletion of its own) |

Commits 3 and 4 are the same fault twice, and §9 says why they are both in the history rather than
squashed into one.

**Suite:** 277 suites, 6,004 passed, 26 skipped, **exit 0**, single worker, from its own exit code.
**Replay:** strict replay of `baseline-2026-11-23` — **38 of 38 reproduced EXACTLY, 2 skipped.**
**Step 7:** 38 re-run sheets — **4 identical, 34 with lines added, none removed or changed.**

---

## 1. The ribbons, and the counts

`scripts/smoke-evidence/BLOCKS-the-forty-ribbons-2026-11-23.md`, with the table at its head.

| | This pass | Before the amendment |
|---|---|---|
| Sheets that qualify | 36 of 40 | 36 |
| **Ribbon written** | **34** | 25 |
| On the first ask | 29 | 16 |
| On the second | 5 | 9 |
| **Refused twice** | **2** | 11 |
| The call failed | 0 | 0 |

**The cap was doing almost all the damage.** Raising it from 40 to 45, and to 55 for a leaving,
took the refusals from eleven to two and the ribbons from 25 to 34. Nothing else about the ask
changed in that step. Your reading of it was right and mine was not.

## 2. The families: offered against chosen

| Family | Offered | Chosen | Before |
|---|---|---|---|
| taboo / need / tether | 22 | **11** | 5 |
| moves | 22 | **11** | 8 |
| senses | 17 | 6 | 5 |
| speaks | 12 | 3 | 3 |
| sheds | 10 | 2 | 4 |
| **leaves-at-death** | 25 | **1** | **0** |

**`leaves-at-death` is still the problem, and it is no longer the rules.** It is chosen once in
twenty-five offers, and it is also **both** of this pass's two refusals — s13's Purple Worm and
s17's Pit Fiend, each refused twice for never saying when what it leaves ends. Taking the list of
four things out moved it from 0 to 1. It did not fix it.

The three runs of this pass bracket it: 0 of 25, then 3 of 25, then 1 of 25. The variance is the
model's, and the mean is about one in twenty. **On your own condition — "if it is offered twenty
times again and chosen none, the next step is an ask of its own" — it did not score none, so it
stays in the shared ask by your rule. My read is that it has earned its own ask anyway**: it is the
only family that owes three things in one sentence, and it is the only one the model walks past when
two easier ones are on the same list.

The one that landed is worth reading — s10, the Drowned Antiphon: *"When it dies, the choir leaves a
Last Note hovering where its body fell. A creature can use an action to hum it, hearing the languages
the choir knew in life; the Note fades after 1 hour."*

## 3. Every refusal, with its reasons

Two sheets, and **neither refusal was wrong.**

| Sheet | First ask | Second ask |
|---|---|---|
| s13 Purple Worm | a leaving that never says when it ends | the same fault again |
| s17 Pit Fiend | a leaving that never says when it ends | and then pinpointed outside the senses family |

s17 is the more interesting of the two: told its leaving never ended, it changed family on the
second ask and wrote a senses ribbon under a different label, which the one-family rule then caught.
That is the two new rules working together rather than against each other.

## 4. Ribbons that contradict their sheet's Speed, Senses or Languages

**None.** I read all 34 against the three lines.

**And the four holes you named are closed, checked on the real sheets rather than only in tests.** I
swept all 34 for each of the four faults: a check with a consequence, movement that costs nothing, a
pinpoint outside the senses family, and a tether that takes something. **Zero of 34 on all four.**

Two tensions remain, both the same shape as last pass and neither a rules contradiction:

- **s05 Air Elemental** — Languages: Primordial (Auran); the ribbon says it *"speaks only with voices
  it has stolen, and cannot form words of its own."* The voice is constrained, not the language.
- **s18 Bone-Sun Archlich** — Languages: All, and it now writes a senses ribbon instead, so the
  tension of last pass is gone of its own accord.

**One ribbon the lint caught, which I have left standing and am reporting instead of fixing.** s02's
Blood in Water keys on *"injured"*, and the sheet lint says so: `undefined-state-word: keys on
"injured", which the row never defines — print uses Bloodied or 0 Hit Points`. It is a real wording
defect and the lint found it unaided, which is the instrument working on a ribbon for the first time.
The validator does not check for undefined state words; the lint rule already exists, so the fix is
to call the existing rule from `ribbonFaults` rather than write anything new. I did not do it this
pass because it needs a fifth live re-record and because you may want "injured" to be acceptable.
Last pass the same sheet said "wounded" and the lint said the same thing, so this is stable, not
chance.

## 5. Length and voice

| | This pass | Before |
|---|---|---|
| Median word count | **35** (min 21, max 45) | 33 |
| Over 40 words | 4 of 34 | 0 |
| Over the cap | **0** | 0 |
| Use a simile | **1** of 34 | 0 |
| Carry a DC | 7 of 34, every one the engine's | 6 of 25 |

The four over 40 are all tethers — s11, s12, s23, s25 — which spend their words on the distance and
the consequence, which is what you asked a tether to carry. The longest is 45, exactly at the cap.
No leaving came near 55; the one that landed is 38 words.

The one simile is s16's *"can move across molten metal and slag **as if** it were solid ground"*,
which is print's own construction in Earth Glide's idiom. Counted, not refused, as ruled.

## 6. The diff of step 7

**4 identical, 34 with lines added, and no sheet lost or changed a line.** Checked Block by Block
against `BLOCKS-the-forty-2026-11-22.md`.

The four identical are s19 and s21 (no ribbon asked), and s13 and s17 (refused twice). One note, not
a stop: **s24 gained the `Traits` heading** with its ribbon — the Titan-Hollow Scythe had no trait at
all before.

## 7. The seconds a ribbon adds

| | |
|---|---|
| The engine's own work | **0s** — median 0, mean −0.08 over 38 sheets |
| The call itself, live | **2s** — median 2, mean 1.74, max 4 |

Unchanged from last pass, and the new rules cost nothing: they are all predicates on one sentence.

## 8. The 2014 terms

Three again, and the chain runs both ways: `Dim Light`, `Bright Light` and `Difficult Terrain` were
written lowercase by the model, cased up for the 2024 printing, and lowercased again for the 2014
card. `Emanation` has never appeared in any run.

## 9. Anything a fix made worse

**One, and it is the shape of my own mistake twice over, which is the thing worth reporting.**

I implemented your tether rule — "a tether never takes away its actions" — as a **blacklist of what
it may not take**. It leaked on two successive live runs:

| Run | The sheet | What it took | On my list? |
|---|---|---|---|
| first | s28 Ilvareth | *"or lose its **Spellcasting** until the end of its next turn"* | no |
| second | s12 Plague Archon | *"it loses its **Fly speed** until it ends a turn within 100 feet"* | no |

After the first I added "Spellcasting" and re-recorded. After the second I stopped adding words. Your
standing order says why: a list already doing the call's job is a bad decision in place, and adding
the four words it missed this week is how it becomes the rule again.

**So the rule is written the positive way round.** A tether may stop the creature going farther and
may send it back. Any losing, denying or forbidding at the end of one is refused, whatever the
object. Gated on reading as a tether, because a blanket version refused the Air Elemental's "cannot
use a borrowed voice to lie" — one of your own accepted examples, and the proof that the verb alone
cannot tell a taboo from a tether taking something.

Two smaller things the same work found:

- **"Must remain within 100 feet" did not read as a tether at all.** s12 used that form and my gate
  was only looking for "travel more than", so it never fired, which is the real reason the second
  leak got through. It reads as a tether now, along with "is tethered/bound/anchored to … feet".
- **The Trench Siren's drowning toll is 54 words.** You asked which rule stopped it. At 40 it was
  two; with a leaving's 55 it is **rule 4 alone**, for its "10 miles". The length it was refused for
  is no longer a fault, and its test says so.

Four live recordings this pass, not one. The first measured the cap; the second and third each found
one more hole in the tether rule; the fourth is the one in the tape. The owner had not marked the
twenty-five, so nothing was lost by rolling them, but it is more rolling than the order asked for and
you should know it.

## 10. The lint, the suite, the replay

40 sheets; 39 linted. s19 is print-exact from SRD 5.1 with `calls: 0` and never enters the pipeline.

| Rule | Findings |
|---|---|
| `uncited-replacement-row` | 0 |
| `ungated-turn-denial` | 0 |
| `citation-gate-mismatch` | 0 |
| `deafened-alone` | 0 |
| `rider-without-an-attack` | 0 |
| `strike-adds-nothing` | 0 |
| `stock-template-name` | **1** — s12, `Bonus Actions/Bolstering Presence` |
| `two-recharge-rows` | 0 |

The eight are unchanged from the forty before any ribbon: the same one finding on the same sheet.
Outside the eight: `orphan-condition-ref` ×2 and `at-will-inline` ×1, all three unchanged — plus
**`undefined-state-word` ×1, which is new and is on a ribbon** (s02, §4).

**The suite:** 277 suites, 6,004 passed, 26 skipped, **exit 0**. **The replay:** `38 of 38
reproduced EXACTLY, 2 skipped (not replayable)`.

---

## The shape gate, and what I take back

You ruled the gate stays as it is, on the ground that the audit is a reader and not the owner, and
that two of the four condemned rows are ones he has passed by name. Taken, and I withdraw the
suggestion. For the record the correction in my last report stands on its own: it is **4 of 11**
shape-fit rows that carry an audit defect, not 3, and two of the three rows I had named were wrong.
That was a measurement error worth fixing whatever is done about the gate.

## What I did not do

- **Nothing was pushed.** Five commits.
- **No deletion commit.** `BLOCKS-the-forty-ribbons-2026-11-22.md` is replaced by this pass's file;
  it was never a named milestone, so it goes in a deletion commit of its own if you want it gone —
  say the word and I will make it. `BLOCKS-the-forty-2026-11-22.md` stays as the forty before any
  ribbon, and `baseline-2026-11-20` stays because the ribbon probe reads it.
- **s36 still has no ribbon**, as you ruled. The blank path's ribbon is covered by its pipeline test.
- **s02's "injured"** is left standing and reported, not fixed (§4).
- **`leaves-at-death` stays in the shared ask** by your condition, with my dissent recorded (§2).
