# Handoff — the dead repair deleted, the bonus filled, the defect named

For the owner and Fable 5.2, 2026-11-17. Branch `statblock-enhancments-part-2`.
Blocks: `BLOCKS-defects-2026-11-17.md`. Findings: `FINDINGS-defects-2026-11-17.txt`.
Every untrackable, open_ended, other and weak finding in full: `DEFECT-DETAIL-2026-11-17.md`.

**234 suites, 5466 passed, 26 skipped. Build clean (5.57s). Reference scripts: 576 cases, 0 threw,
0 sheets with two rows of one name, 0 Multiattack citations naming no row. Widened ship scan: 0.**

---

## Part 1 — what was deleted

Strict replay on the baseline tape reproduced **38 of 38 EXACTLY both before and after**, which is
the whole proof. `generateReskin` goes from **9,481 lines to 9,303**.

| | |
|---|---|
| the stretch reading `freeFlagged`/`toFix` | ~110 lines in generate.mjs |
| `repairedAnyRow` and its reader | see below |
| `repairMakesItWorse` | its only caller was inside the stretch |
| `buildFreeRowFixPrompt` + `REPAIR_BY_PRINCIPLE` | author.mjs, and the import |
| `scripts/probe-repair-chain.mjs` | the probe for the chain, unbuildable without the builder |
| 4 tests | two in `audit-brief.spec.js`, one each in `author.spec.js` and `retaliation-seed-retired.spec.js` — all read the deleted prompt's prose |

**What the reader of `repairedAnyRow` did.** It re-ran `lintStatblock` over the whole sheet and
re-applied the deterministic text rules, because a repaired row was text no lint had read — the
lint's surgery runs about 600 lines before the repair ran. Of 71 landed repairs across the saved
runs, 7 shipped a row the checker fails and three of those were lint rules that pass would have
fixed. With no repair there is no unlinted text at that point, so the second pass has nothing to do.

**Nothing reached it, confirmed twice.** `free-row-fix` calls went 25 → 0 on the forty when the
typed fixes landed, and the replay is byte-identical either side of the deletion.

**What I kept, and why.** `auditDismissedOnPrint` (the checker lists it, and it is in the same
block — the braces stay to scope it); the classification itself; `row.freeRow || row.authored`,
which outlived the repair and now decides a row's origin; `SAVE_STAT_RULES`, shared with
`buildSeatPrompt`; and the `free-row-fix` **tape family**, so an older recording still names what
its calls are — the entry says the builder is deleted. I also removed the `stampAttacksPerRound`
re-stamp inside the block: it existed for the attack-row test that went, nothing between there and
the end of generation reads `attacksPerRound`, and the final stamp is unconditional.

---

## Part 2 — the bonus fill, and what s23 prints

`fillBonusDmg` fills the token with **2** when the bonus is to AC, to attack rolls, or to saving
throws, and returns the text untouched for every other bonus. Flat at every CR, and the comment
where it is set says so: +2 is a fixed step in this game.

| | |
|---|---|
| strict replay | **37 of 38**; s23 missed at the seat call, because the engine accepts the first answer and no longer asks again, so the sheet differs and the later prompts stop matching. Nothing else moved. |
| after the re-record | **38 of 38 EXACTLY** |

**s23 live from the seat, three rolls. All three carry a row bound to "fights from a shield wall",
where it used to ship none.**

**Roll 1 — Dress the Line**
> When Vashka barks an order as a Bonus Action, each ally of her choice within 30 feet that can hear
> her immediately moves up to its Speed to stand shoulder-to-shoulder with her; an ally already in
> position instead gains the benefits of a readied shield wall, imposing Disadvantage on the next
> attack roll made against it before the start of Vashka's next turn.

**Roll 2 — Rally to the Banner**
> When Vashka takes the Attack action and can be heard by allies within 5 feet of her, each ally of
> Vashka's choice within 5 feet of her moves up to its Speed to stand within 5 feet of her (or, if
> already within 5 feet, gains Disadvantage on the next attack roll made against it before the start
> of Vashka's next turn).

**Roll 3 — Lock Shields**
> When Vashka takes the Attack action, each ally of her choice within 10 feet that can hear her
> moves up to 10 feet to stand shoulder-to-shoulder with her; an ally already flanking her in this
> way has Disadvantage on the next attack roll made against it before the start of Vashka's next turn.

**Two things these rolls do NOT show, and one they do.** None of the three wrote a bonus at all, so
all three would have landed without this change — the fill's proof is the recorded answer (the test)
and the re-record, where the sheet came out as *"Locked Shields. While Vashka is standing
shoulder-to-shoulder with at least one ally that is not Incapacitated, Vashka gains a +2 bonus to
her AC…"*. And rolls 2 and 3 say the ALLY "gains Disadvantage on the next attack roll made against
it", which reads backwards — it is the attacker who has Disadvantage. Roll 1 writes it correctly
("imposing Disadvantage on"). That is seat wording, not this fix.

Only the TRAIT path has the bonus refusal; the reaction path never had it, so a reaction written
with a bonus is still caught later by the unfilled-token check.

---

## Part 3 — findings by defect, origin and confidence

Live from the audit on the 38, one roll. A second roll is in brackets, because the audit re-rolls
and a count from one roll is not a fact about the engine.

| defect | count | hand count |
|---|---|---|
| untrackable | **20** (16) | 11, five of them clear |
| weak | **12** (6) | 20 |
| open_ended | **9** (15) | 8 |
| other | **9** (9) | — |
| dead_reference | **6** (7) | 3 on model rows, more elsewhere |
| wording | **5** (1) | 3 |
| misnamed | **0** (1) | — |
| | **61** (55) | |

**By defect and origin, this roll:**

| | model-written | a refused template's stand-in | catalog | print | total |
|---|---|---|---|---|---|
| untrackable | 15 | 1 | 3 | 1 | 20 |
| weak | 10 | 0 | 1 | 1 | 12 |
| open_ended | 3 | 2 | 1 | 3 | 9 |
| other | 7 | 1 | 0 | 1 | 9 |
| dead_reference | 2 | 1 | 1 | 2 | 6 |
| wording | 1 | 0 | 1 | 3 | 5 |
| **total** | **38** | **5** | **7** | **11** | **61** |

**By confidence:** 19 high, 34 medium, 2 low (this roll: 24 high, 35 medium, 2 low — see the log).

**`other` is 9 of 61, one in 6.8** — under your one-in-six threshold, and it was 9 of 55 (one in
6.1) on the other roll, also under. I have listed all nine in full anyway in
`DEFECT-DETAIL-2026-11-17.md`, since both rolls sit close to the line and the cut is yours to make.

**Findings per sheet: 1.6.** Ten of the 38 drew none.

**Renames: 12 applied, 4 blocked** — all four by the older element guard ("claims an element the row
does not pay"), none by the GM-word guard this roll. Applied and blocked are both in the log.

**Model calls per sheet: 9.3, unchanged.** The label replaces a field in a call the engine already
makes, so it costs nothing.

**Every sheet ran: 38 of 38, 0 threw, 0 timed out, 0 degraded, 2 inputs skipped as not replayable
(the rolled CR and the blank form).**

### The pattern you asked to count

Of 12 weak findings, **three are on a row that costs an attack or a recharge** — and two of the
three are rows you have already graded Dead:

**16-molten-king · Seize the Unforged** (takes an attack's place)
> *Strength Saving Throw*: DC 19, one creature within 10 feet. *Failure:* The target has the
> Grappled condition (escape DC 20).

competes with: *The molten king makes two Fist attacks. It can replace one attack with a use of
Seize the Unforged.*

**20-trench-leviathan · Fathom Chorus** (takes an attack's place)
> *Constitution Saving Throw*: DC 24, each creature in a 30-foot Emanation originating from the
> leviathan. *Failure:* The target has the Poisoned condition until the end of its next turn.

competes with: *The leviathan makes two Coils attacks. It can replace one attack with a use of
Fathom Chorus.*

**35-meshrin · Terror Roar** (a recharge row, no Multiattack on the sheet)
> One creature within 30 feet must succeed on a DC 15 Wisdom saving throw or be frightened until the
> end of its next turn.

The audit's own words on Fathom Chorus: *"Poisoned for one turn with no damage is a dead payload
compared to the Coils attack it replaces."* It reaches your ruling on its own.

### One thing the measurement turned up

**Three findings point at a row that is not on the shipped sheet.** All three are
`15-adult-red-dragon · Ruined Eye, Wary Ear`, which the free-row budget kept
(`1 candidate reached the finished sheet, 1 kept`), the audit read, and which appears in neither the
shipped 2014 sheet nor its 2024 `other_edition`. So the audit spent three of its six findings on a
row the GM never sees, on a print-exact dragon. Not this round's doing and not in the list, but it
is 5% of the findings and it would inflate any before/after count.

---

## What I would conclude, kept apart from the counts

**Naming the defect worked, and it moved the numbers in the direction that matters.** `clarify` was
86% of the last round's findings and said nothing; this round the biggest bucket is `untrackable` at
20, which is a concrete, fixable class — a trigger resting on facing, on a remembered position, or
on a zone nothing defines. And 15 of those 20 are on rows the model wrote, which is exactly where
the seat form can fix them. Your before-number for the seat form is **15 untrackable + 3 open_ended
on model-written rows**, on one roll.

**I read the weak count differently from the hand count, and I think the audit is right.** You hand-
counted 20 weak; the audit named 12 and 6 across two rolls. The gap is that several rows you read as
"the audit wants this stronger" the audit now files under `untrackable` or `open_ended` instead —
which is the better label, because those have a fix and "make it stronger" does not.

**The round is net positive on the sheet, unlike the last one.** Last round I called the effect
slightly negative and you disagreed about the trade; this round there is no trade to argue about.
Nothing at the end of the line can touch a row any more, 178 lines of engine and a whole model call
family are gone, and one sheet gained a row it had been silently losing. The only thing that got
worse is that the audit's judgement now lands entirely in the trace — which is the deliberate
choice, and the reason the label exists.

**What I would measure next, if it were mine to pick.** The three findings on a row that does not
ship say the audit can read a sheet the GM will not get. Before the seat form's before/after is
trusted, it is worth knowing whether that is one dragon or a class of sheets — it is a count off the
saved sheets with no model involved, the same shape as the attack-replacement gauge in your last
section.

Queued and untouched, as instructed: the refused template; a row that takes an attack's place; the
seat form; the catalog's motionless-disguise trait; and the 2014 conversion's row names. On that
last one — **the casing defect did not recur this roll**: 0 row-name references wrong in case or
missing across the 38, because the audit renamed "Drag Prone" to "Shove Aside" before it could bite.
