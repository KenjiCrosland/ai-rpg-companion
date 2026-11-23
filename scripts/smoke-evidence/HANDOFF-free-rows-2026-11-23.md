# HANDOFF — one free trait and one free action, where the card has room

2026-11-23 · branch `statblock-enhancments-part-2` · for the owner and for Fable

**The current recording is `baseline-2026-11-23-free-rows`.** `baseline-2026-11-20` is the forty
before this rule and what step 6 is checked against. `baseline-2026-11-23` is the parked ribbon
feature's record, and `baseline-2026-11-18` is read by no code.

Six commits, ready to push. Nothing is pushed.

| # | Commit | What |
|---|---|---|
| 1 | `0f4fda4` | the rule, with eight tests, and five existing tests updated |
| 2 | `1704eea` | the three sheets re-recorded from the audit call |
| 3 | `d657fef` | the spider fixture cites itself, not a file about to go |
| 4 | `f252cfd` | the housekeeping (a deletion of its own) |
| 5 | — | the blocks file and this report |

**Suite:** 279 suites, 6,023 passed, 26 skipped, **exit 0**, single worker, from its own exit code.
**Replay:** `baseline-2026-11-23-free-rows` — **38 of 38 reproduced EXACTLY, 2 skipped.**

---

## 1. The six rows: the card's room, and whether the row stayed

Room is print's high end for the band less the fixed rows the card carries, which is what the rule
itself reads.

| Sheet | CR | Band | High end | Fixed | **Room** | The row | Stayed? |
|---|---|---|---|---|---|---|---|
| s02 Bog Hound | 1 | 0-2 | 4 | 1 | **3** | Living Mire | **yes** |
| s06 Spoilheap Lurker | 5 | 3-5 | 5 | 2 | **3** | Loose Scree | **yes** |
| s09 Stone Golem | 10 | 10-12 | 7 | 5 | **2** | Trail of Tears | **yes** |
| s36 Sarnoth | 4 | 3-5 | 5 | 2 | **3** | Temple Stalker | **no — never ran** |
| s40 Brother Halric | 3 | 3-5 | 5 | 4 | **1** | Bound Reliquary | **no — the card has room for one** |
| s33 Reedtemple Warden | 5 | 3-5 | 5 | 5 | **0** | Read the Overextension | **no, as you predicted** |

**Three of the six stayed, not five.** Two of the three that did not are worth your decision:

- **s40 Brother Halric has room for 1, not 2.** Its card already carries four of print's five, so
  the rule cannot fire and the sheet keeps one row as before. You expected it to keep both "if their
  cards have the room"; it does not have the room.
- **s36 Sarnoth is the blank form and cannot be replayed**, so it never ran in this round at all.
  Its card does have room for 3, so the rule would keep Temple Stalker — but confirming that means a
  live run that rolls its whole creature from scratch and changes every row on it. Same situation as
  the ribbon round, and I left it alone for the same reason.

**No sheet you did not name gained a row.** The three that changed are exactly s02, s06 and s09.

## 2. The three sheets that changed

Only the kept row is new on each; the full sheets are in the blocks file.

**s02 Bog Hound** — *"a mud-caked bog hound that drags fishermen under"*

> **Living Mire.** While it stands in water, mud, or marsh, the bog hound has the Invisible condition
> to creatures more than 30 feet away from it, and it leaves no trail.

beside its **Muck-Lunge** (a 15-foot Cone, Strength save, pulled 5 feet and Prone). The card now
runs 3 rows against print's 4.

**s06 Spoilheap Lurker** — *"a quarry-pit thing of living scree that buries what it catches"*

> **Loose Scree.** The lurker can squeeze through any gap wider than a paving stone and move through
> spaces occupied by other creatures and ignores Difficult Terrain made of rubble, gravel, or broken
> quarry ground; a creature that starts its turn in a space of such ground the lurker has moved
> through has its Speed halved until the end of its turn.

This is the row you read, liked, and lost in a re-record. It is back, beside Scree Snare and Entomb.
4 rows against print's 5.

**s09 Stone Golem** — *"Stone Golem"* with a twist

> **Trail of Tears.** The ground in a 10-foot Emanation originating from the stone golem is
> Difficult Terrain.

beside Grief Glare. 7 rows against print's 7 — exactly at the high end, and the rule stops there.

## 3. What the audit and the 2014 conversion changed beyond the row

**One thing, on one sheet.** s02's Muck-Lunge was reworded by the 2014 conversion, which ran again
because the sheet it is shown now carries Living Mire:

| | |
|---|---|
| before | *"Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failed save, the target is pulled up to 5 feet straight toward the bog hound, and the target is knocked prone."* |
| after | *"Each creature in a 15-foot cone must succeed on a DC 13 Strength saving throw or be pulled up to 5 feet straight toward the bog hound and be knocked prone."* |

Same mechanics, same DC, same distance, same condition — a different sentence. **s06 and s09 have no
such change**: their only difference from the forty before this round is the added row.

The audit itself changed nothing on any of the three. It was re-asked on all three (that is where
they missed), and on each it returned findings that led to no edit.

## 4. The floor and the seeds — changed nothing, and one count corrected

**The floor dropped ONE row on the forty, not two.** I measured it on this round's run and again on
`BLOCKS-the-forty-parked-2026-11-23.md`, the forty before this rule, and both say one:

> s12 Plague Archon · `value check: "Plague Herald's Command" EV 4.1 vs floor 4.9 (a bonus action
> (free)) — a free row that does nothing (logged)` then `signature dropped by the floor: "Plague
> Herald's Command" — the ladder could not lift it; the fallback stands in`

**Three seats drew a stock seed**, which matches. Word for word, what was lost and what stands:

| Sheet | The idea the seat could not write | What stands in its place |
|---|---|---|
| s12 Plague Archon | *"Whenever a creature within 10 feet of the archon fails a saving throw against a disease or poison effect, the archon regains hit points equal to its proficiency bonus."* — refused twice: *"a trait is not a save"*, then *"the response writes a saving throw as prose"* | **Bolstering Presence (2/Day)**, the `rally` seed — and the row the lint still flags for carrying a stock template name |
| s34 Krennik Skullstandard | *"Krennik plants the skull-topped standard and gives a curt order; the banner's fear spreads through his raiders. Each ally of Krennik's choice within range can move up to its Speed as a Reaction without provoking Opportunity Attacks…"* — refused twice, the second time for *"the row does nothing on a failed save"* | **Rampage (1/Day)**, a seed |
| s35 Well Drowned | *"The drowned lashes out with a rope of living brine that coils around a creature it can see. The target must succeed on a Strength saving throw or be pulled up to its speed toward the drowned and become Grappled by it…"* — the **action** seat ends empty, which is your note on this sheet | **Rampage (1/Day)**, a seed. Nothing drags anyone into the well |

Changed nothing there, as ordered. s35 is the sharpest case: the idea call asked for exactly the
thing the owner wanted — a brine rope that pulls a creature in and grapples it — and the seat could
not write it.

## 5. s33: the two rows, and which the order keeps

Its card carries five fixed rows against print's high end of five, so **the room is 0, the budget is
0, and the rule cannot fire.** The trace says it plainly:

> `free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows; this card already
> carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's
> high end`
> `free row over budget: Reactions/"Read the Overextension" leaves at ship`
> `free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Scales Remember
> the Blow" [no template]`

**The row that stays is the trait you could not make sense of, and the Reaction is the one that
goes.** Neither carries a template and neither carries an element receipt, so they tie at the same
rank, the templated-row tie-break cannot separate them, and the stable sort falls to sheet order —
Traits iterate before Reactions. That is today's order, unchanged by this round.

So on s33 the outcome is decided by where a row happens to sit in the sections object. If you want
the Reaction instead, that is a change to the ordering and not to the budget, and it is not this
round.

## 6. Anything the rule made worse

**No card runs longer than print's high end because of this rule.** Fourteen cards on the forty are
already over it — s04, s07, s11, s15, s16, s17, s18, s23, s26, s30, s33, s34, s37, s39 — and the
list is **identical before and after**: not one card is newly over. Those fourteen are long from
their fixed rows, and most carry 0 or 1 free rows, so nothing in this round reaches them. The three
that changed all stay inside their ceiling, and s09 lands exactly on it at 7 of 7.

**Two rows that do the same thing: one near miss, no duplicate.** Reading the three pairs:

- **s02** Living Mire (unseen beyond 30 feet in water) beside Muck-Lunge (a cone that pulls and
  knocks Prone). Different jobs.
- **s09** Trail of Tears (Difficult Terrain around it) beside Grief Glare (a Frightened save).
  Different jobs.
- **s06** Loose Scree halves the Speed of a creature that starts its turn on ground the lurker
  crossed; Scree Snare knocks a cone Prone. **Both deny movement.** Not the same row, and the trait
  also gives the squeeze and the terrain-ignoring that the owner liked, but it is the closest the
  three come to doubling up and it is worth your eye on the sheet.

**And the thing I would watch rather than call a fault.** The audit still calls s06's Scree Snare "a
dead payload", and this round puts Loose Scree back beside it rather than in place of it. The sheet
is better than it was — the trait he liked is on it — but the row he did not like is on it too, and
the budget was the only thing that had ever removed either.

## 7. The housekeeping

**Went, in `f252cfd`, a deletion commit of its own:**

- `BLOCKS-bothways-2026-11-14.md`, `BLOCKS-probeB-2026-11-14.md`, `BLOCKS-probeC1-2026-11-14.md` —
  on neither list.
- `CHECK-classes-eight-2026-10-16T22-10-02.md` and `CHECK-stage34-2026-10-16T20-49-59.md` — their
  blocks files are long gone.

**Stayed: fourteen CHECK files**, because each points at a blocks file that is still a milestone.
**How I linked them matters**, because the obvious way is wrong: a CHECK file's *name* matches no
blocks file at all, and matching by name would have reported all sixteen as orphans and deleted
fourteen files that belong. Each CHECK file's first line names the RUN it checked, and the blocks
file that carries that run is the one that mentions it:

| CHECK file (run) | Its blocks file |
|---|---|
| bare-names T01-23-23, halric5, people-class T00-31-54, ship-eight T00-34-43 | `BLOCKS-ship-2026-11-16.md` |
| bare-names T02-41-50, gold-dragon, one-name, people-class T02-22-33, ship-eight T02-25-37 | `BLOCKS-fix-ef-2026-11-16.md` |
| paladin-sides, paladin20 T04-23-07, paladin20 T04-35-29, ship-eight T04-47-40 | `BLOCKS-something-to-roll-2026-11-16.md` |
| sweep T00-38-16 | both `BLOCKS-fix-ef` and `BLOCKS-ship` |
| classes-eight, stage34 | **none — deleted** |

**Nothing deleted is read by a script or a test.** Two are *cited as prose*, and I am putting the
dangling pointers on the record rather than leaving you to find them:

- `scripts/smoke-batches/layer-probes.json` names `BLOCKS-probeB-2026-11-14.md` in five
  `baseline`/`why` fields and `BLOCKS-bothways-2026-11-14.md` in two `note` fields. The harness reads
  that JSON but never opens those files; the strings are documentation for whoever runs the batch.
- `the-budget-keeps-the-templated-row.spec.js` cited probe B in its header. I changed that comment
  first, in `d657fef`, so the spec cites its own fixture — the spider's two rows are kept verbatim
  in it — and the test is self-contained.

## 8. The lint, the suite, the replay

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

**Identical to the forty before this round**, and **not one of the three added rows produced a
finding**. Outside the eight: `orphan-condition-ref` ×2 (s11) and `at-will-inline` ×1 (s15), both
unchanged.

**The suite:** 279 suites, 6,023 passed, 26 skipped, **exit 0**.
**The replays:** with the rule, `baseline-2026-11-20` gave `3 of 38 did NOT reproduce, 2 skipped`,
all three missing at the audit call and none earlier — inside your limit of eight. After the
re-record, `baseline-2026-11-23-free-rows` gives **`38 of 38 reproduced EXACTLY, 2 skipped`**.

---

## Five existing tests changed, and no ruling did

Worth flagging because it is a lot of test surgery for one rule. The 14 November tie-break
(a templated row beats an untemplated one within a rank) and the 29 October receipt ladder
(GM quote, then element, then decoration, then borrowed) **both still decide who goes**. What
changed is how often anything has to go: on a card with room, a trait and an action now both stay
and no order decides anything.

So each of the five is re-run **on a full card**, where the ordering still does its work, and each
gains a companion asserting what the roomy card now does. The clearest is probe B's spider, which is
why that ruling exists: the sheet shipped reading *"while it is not grappling or restraining a
creature"* with nothing left on it that restrains, and under this rule it keeps the row that
restrains as well.

The brass tyrant's pair is the one to look at if you disagree with any of it. Its trait is a
**decoration** — rank 2, not the borrowed rank 3 — and your rule as written covers ranks 0 to 2, so
with room for two the decoration now stays beside the seat's payoff. If decorations were meant to be
excluded along with the borrowed row, that is one word in the predicate and I have not assumed it.

---

# The amendment's probe: does a second roll fix a dud?

Twelve generations — the four sheets on the owner's Fix list, three rolls each, live from the idea
call, on the sheets as this round leaves them. `scripts/smoke-evidence/BLOCKS-second-roll-probe-2026-11-23.md`
holds all twelve in full with the recorded sheet above each for comparison. **Not graded**, as
ordered: the twelve are yours to read against his words on each sheet.

**Which idea call the harness took.** Every generation makes **exactly one** idea call — checked in
each run's own tape, which shows 11 calls per generation with one of them the idea — so
`--live-from idea` had nothing to choose between. Nothing was built and no second roll exists inside
the engine.

**What the engine says for itself.** Seats that landed a row, seats that wrote nothing, seats asked
a second time, rows drawn from a stock seed, and the lint:

| Sheet | Roll | Landed | Wrote nothing | Asked again | From a seed | Lint |
|---|---|---|---|---|---|---|
| s07 Hydra | 1 | action | trait | — | 0 | 0 findings |
| | 2 | — | action | — | 0 of 1 | 0 findings |
| | 3 | — | — | — | 0 of 2 | 0 findings |
| s13 Purple Worm | 1 | trait | — | — | 0 of 1 | 0 findings |
| | 2 | action, trait | — | — | 0 | 0 findings |
| | 3 | — | trait | — | 0 of 1 | 0 findings |
| s35 Well Drowned | 1 | trait | action | action | **1 of 1** | 0 findings |
| | 2 | trait | trait | trait | 0 of 1 | `orphan-condition-ref`: "Grappled" referenced, nothing applies it |
| | 3 | — | — | — | 0 of 1 | `citation-gate-mismatch`: Multiattack cites "Dragged Under", gated, without "if available" |
| s06 Spoilheap Lurker | 1 | action | — | — | 0 | 0 findings |
| | 2 | action, trait | — | — | 0 | 0 findings |
| | 3 | trait | trait | trait | **1 of 1** | `stock-template-name`: `Bonus Actions/Venomed Edge` is the stock name of the "coating" template |

**Three facts worth having beside the twelve, none of them a grade:**

- **The action seat on s35 does not always end empty.** Your note on that sheet is that it ends
  empty and nothing drags anyone into the well. Of these three rolls it was refused once (roll 1,
  which then drew a seed) and on roll 3 the sheet carries a row named **Dragged Under** — the lint's
  only complaint about it is a missing "if available" on the Multiattack's citation. That is the
  first time the engine has produced a row of that shape for this sheet; the three earlier rolls
  that came back empty were from before this round.
- **A roll that changes nothing is possible.** s07's roll 3 and s13's roll 3 each landed no row from
  either seat, and s07's roll 3 drew 0 of 2 from a seed — the sheet simply came back with its
  chassis rows.
- **Two of the twelve drew a stock seed** (s35 roll 1, s06 roll 3), which is the sameness the owner
  dislikes, and **two of the twelve carry a lint finding** that the recorded sheets did not.

**What I did not do.** No button, no second roll inside the engine, and no grading. The twelve are
in the blocks file for you to count against his words.
