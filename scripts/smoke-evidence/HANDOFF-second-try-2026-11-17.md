# Handoff — one more try, with the reason

For the owner and Fable 5.2, 2026-11-17. Branch `statblock-enhancments-part-2`.
Blocks: `BLOCKS-second-try-2026-11-17.md`. Every second try in full: `SECOND-TRIES-2026-11-17.md`.

**236 suites, 5484 passed, 26 skipped. Build clean (5.55s). Reference scripts: 576 cases, 0 threw,
0 sheets with two rows of one name, 0 Multiattack citations naming no row. Widened ship scan: 0.
38 of 38 ran — 0 threw, 0 timed out. Strict replay 38 of 38 reproduced EXACTLY.**

---

## THE STOP RULE IS TRIGGERED

**13 first-try refusals. 3 landed on the second try. 10 were refused again.** That is 23%, well
under the half the handoff set, so this is reported rather than built on.

It is not a flat failure, and the split says why:

| the first refusal's reason | landed on the second try |
|---|---|
| a number promised and not written | **2 of 2** |
| no row of the kind asked | **1 of 3** |
| **a trait is not a save** | **0 of 7** |
| a condition on a hit written as a trait | 0 of 1 |

**The reason that recovers is the one that says what to write. The reason that does not is the one
that says what form to use — and the seat is still asking for the form the ability does not fit.**

Of the 10 refused again, **only 1 repeated the same fault**. The other 9 produced a *different*
one, and the two shapes are these:

```
10-drowned-choir   first:  "a trait is not a save"
                   second: "you wrote no row of the kind asked for (a trait)"      — it wrote nothing

04-chapel-bell-ringer first:  "a trait is not a save"
                      second: "it belongs in the description"                      — it declined
```

Told "a trait is not a save" the model stops writing a save, and then has nowhere to go: the ability
it wants is a save, and the seat wants a trait. It writes nothing, or it declines. **The second ask
is working — the model reads the reason and obeys it. The constraint it is obeying is the wrong one.**

The three that landed are worth reading, and the clearest is s36:

```
asked for:  a trait
first:      the ability, correct in every way, in the "reactions" array
reason:     you wrote no row of the kind asked for (a trait)
second:     the same ability, moved into "traits"
landed:     Closes the Gap. The first time in each round that a creature moves out of the champion's
            reach, the champion makes one Greatsword attack against that creature.
```

That is the rule earning its keep: a placement fault, named, fixed. The other two were a number
promised and not written (s14 *Rime-Wake*, s36 *Through the Swing*), where the second answer simply
wrote the number.

**What I would conclude is at the end, kept apart.**

---

## Part 1 — the two instruments

### The comparison

`canonical` sorts every object's keys at every depth; arrays keep their order, because a sheet's
sections are ordered and the rows inside one are the order a GM reads them. Strict replay is
unchanged at 38 of 38, and a sheet that matches only after canonicalising now says so rather than
reporting a failure.

### Where the row count differs from yours, and why

**One sheet: s14 glacier-heart.** It has exactly 5 rows against a band floor of 5 — AT the floor,
not below it. The same boundary accounts for the median count. So:

| | yours | the script |
|---|---|---|
| invented creatures below print's 20th percentile | 4 (s10, s14, s20, s28) | **3** (s10, s20, s28) |
| below print's median | 6 | **5** |

The script now prints the at-the-floor sheets for exactly this reason: **s14, s30 thunderhead-drake
and s34 well-drowned all sit exactly on it**, so three of fifteen are one row from being counted.

Two things my first cut of the script got wrong, both the kind it exists to stop: the CR is written
three ways (the 2014 conversion has only `challenge_rating` — "9 (5,000 XP)" — so reading `cr` alone
left 14 of 38 sheets silently out of the count), and `legendary_actions` was missing, so the Adult
Red Dragon counted 6 rows against 7-9 and read as below print when its legendary actions are three
of its rows. A print-exact sheet is not judged, because the engine does not judge it either.

---

## Part 2 — the before table

**Your 14 in 44 is right, and my first count of 15 in 45 was wrong.** The third trace line I found,
`authored trait refused`, is emitted at the REPAIR call's site (generate.mjs:7808), not the seat's —
so s35's Barbarian Rage belongs to the later call, not to this one.

### By reason — the engine's own

| | |
|---|---|
| a trait is not a save | 4 |
| no row of the kind asked | 4 |
| a number promised and not written | 2 |
| a state the row never defines | 1 |
| a condition that is not in the game | 1 |
| a third row imposing the same condition | 1 |
| a condition on a hit written as a trait | 1 |
| **total** | **14** of 44 seats — 11 by the parser, 3 by the engine's gates |

### By what the row was for

| | |
|---|---|
| the model's own idea | 9 |
| a clause the GM typed | 5 |

### By what the sheet ended with for that seat

| | |
|---|---|
| nothing for that seat | 12 |
| a row from the later clause-repair call | 2 |

The full table, one line per refusal, is in the commit message for the second-try rule.

### The later call's own refusals — and it is NOT in scope on the same terms

4 repair calls, asked about 7 clauses with no row, wrote 4 rows, and **1 of those was refused by the
parser** — s35's Barbarian Rage, for "a trait is not a save", the same reason as the seat's biggest
bucket. So 1 in 5 rows offered, against the seat's 14 in 44.

That is a smaller rate on a denominator too small to call, and the gap between 7 clauses and 4 rows
is the call *declining*, not being refused. **I did not extend the rule to it**, and on this evidence
I would not: the one case it would have caught is the same fault the second ask recovered 0 of 7
times at the seat.

---

## Part 3 — the counts

| | |
|---|---|
| seats that produced an answer | 48 on this run (44 on the tape before) |
| refused on the first try | **13** |
| landed on the second | **3** |
| refused again | **10** |
| declined (not re-asked) | 3 stood down because the sheet already answered the clause |

### Rows per sheet, from the script

| | tape before | the run after |
|---|---|---|
| invented creatures below the band's floor | 3 (s10, s20, s28) | **3 — the same three** |
| below print's median | 5 | 6 (s23 joined; the whole run is live from the seat, so that is a re-roll) |

**The three rows the rule recovered landed on s14 and s36 — neither of them thin.** All three sheets
below the floor had refusals that were *not* recovered: s10 and s20 "a trait is not a save", s28 "a
condition on a hit written as a trait". **The rule did not help a single thin card.**

### Cost

| | before | after |
|---|---|---|
| model calls per sheet | 9.34 | **9.71** (+0.37, the 13 second asks over 38 sheets) |
| seconds per sheet | — | 8.8 (337s wall clock for the 38, live from the seat) |

Seconds before is not comparable on the same instrument: the before was a strict replay with no
network. The 0.37 calls a sheet is the honest cost figure.

---

## What I would conclude, kept apart from the counts

**The rule works and the diagnosis is better than the rule.** 3 rows recovered for 0.37 calls a
sheet, nothing lost, nothing loosened — on its own that is a small positive and I would keep it. But
the number that matters is 0 of 7 on "a trait is not a save", and what those seven did on the second
ask is the finding: **they obeyed the reason and then had nowhere to go.** The model is not writing a
save by mistake. It is writing the ability the idea calls for, and the engine has decided that
ability must be a trait.

**So the fix I would put next is not a better second ask — it is letting the seat change form.** The
seat's `kind` comes from the idea call's `section`, decided before the ability is written. When the
authoring call answers with a save where a trait was asked, that is the *later and better informed*
judgement about the same ability, and the engine throws it away. s36 is the proof in the other
direction: its ability arrived in `reactions` when a trait was asked, the engine said so, and the
model moved it — but it only moved because a reaction and a trait are both forms a trait seat can
hold. A save is not, so there is nowhere to move to.

That is one line of reasoning, not a measurement, and it is the owner's to accept. The measurement
that would settle it is small and needs no model: of the 7 "a trait is not a save" refusals, how
many of the first answers would pass every gate **as a save row**? If most would, the seat is
discarding good abilities over a form decision it made too early.

**What I would not do** is loosen the gate. "A trait is not a save" is a real rule — the save form
takes stat, target and effect as fields and the engine renders the sentence — and a trait carrying a
prose saving throw cannot be run. The gate is right. The question is only whether the seat should
have insisted on a trait.

**One thing to note about the evidence.** The run that measured this predates a wording fix in the
engine's own refusal text, so `SECOND-TRIES-2026-11-17.md` shows "you wrote no a trait" where the
engine now says "you wrote no row of the kind asked for (a trait)". The reason reached the model in
the old wording; the recovery rate is the old wording's.

Queued and untouched: the seat form; a row that takes an attack's place; a thin card getting one more
idea; the catalog list.
