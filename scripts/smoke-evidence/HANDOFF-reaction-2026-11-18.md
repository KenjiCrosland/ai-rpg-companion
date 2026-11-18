# Handoff — the seat takes the form the ability was written in

For the owner and Fable 5.2, 2026-11-17. Branch `statblock-enhancments-part-2`.
Blocks: `BLOCKS-reaction-2026-11-18.md`. Every second try: `SECOND-TRIES-2026-11-18.md`.

**237 suites, 5512 passed, 26 skipped. Build clean (6.02s). Reference scripts: 576 cases, 0 threw,
0 sheets with two rows of one name, 0 Multiattack citations naming no row. Widened ship scan: 0.
38 of 38 ran — 0 threw, 0 timed out. Strict replay 38 of 38 reproduced EXACTLY.**

---

## THE STOP RULE, on its literal count, is triggered — and the number is the least useful thing here

The rule: count the refusals that are a response to being hit, damaged or moved; if fewer than half
land, stop and report. Across three live rolls the engine marked **7** such refusals and **2
landed** — 29%. So: reported, not built on.

What makes the count nearly meaningless is that **Reactions land anyway**. On the measuring run two
reached the sheets, and *neither* came from a refusal the engine had marked as a response:

```
20-trench-leviathan · Ringing of the Deep
  *Trigger:* The leviathan hits a creature with Coils.
  *Response—Constitution Saving Throw:* DC 24, one creature within 10 feet.
  *Failure:* The target has the Deafened condition.

28-unblessed-bell-swarm · Toll Buries Itself
  *Trigger:* The swarm deals Necrotic damage to a creature.
  *Response:* The tolling buries itself in the victim's flesh: the creature is Deafened until the
  end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.
```

The first is the Chain Devil's form, written by the engine from fields the model filled. The second
is s28's "a condition on a hit written as a trait" — the owner's own ruling said that rides the
attack row, and the model found the better answer on its own once a Reaction was a thing it could
write.

**Of the marked refusals that did not land, the model was not the problem.** All 5 across the rolls
answered as a Reaction when the reason named one — 5 of 5. What stopped them:

| | |
|---|---|
| s22 Vashka, twice | blocked by the **one-Reaction rule** — print's Riposte is already on the sheet |
| s10 Drowned Choir | refused for having no prose response, when the save WAS the response — a contradiction between my prompt and the gate, now fixed |
| s04 Chapel Bell-Ringer | landed on one roll, refused on another |

So the thing to decide next is the one-Reaction rule, not the ask.

---

## Part 1 — the measurement

### Answers that arrived in a form the seat did not ask for

**15 across both tapes, and 13 of the 15 pass the parser of the form they arrived in.**

| | |
|---|---|
| the trait seat (wants a trait) → got a save | 7 |
| the action seat (wants a save) → got a trait | 4 |
| the trait seat → got a Reaction | 3 |
| the action seat → got a Reaction | 1 |

**My first count said 41, and 26 of those were wrong.** The ACTION seat reads `wrote.saves[0]` — a
save IS its form, because the engine prices every attack and the only action a seat may author is a
save row. I had treated an action seat as wanting an `actions` array.

What each would print is in the full table I ran; the shapes that matter:

```
s11 Wound-Split Brambles (Reaction)  *Trigger:* When a creature hits the vampire with a melee attack.
                                     *Response:* The attacker must succeed on a {dc} Strength saving
                                     throw or take {dmg} Piercing damage and have the Prone condition…
s36 Closing the Gap (Reaction)       *Trigger:* A creature moves out of the champion's reach.
                                     *Response:* The champion makes one Greatsword attack against it.
s08 Breach Hail (save)               [save form] Constitution save, each creature in a 15-foot
                                     Emanation, Blinded
s10 Wound Passes Through the Chord   [save form] Constitution save, each creature in a 10-foot
                                     Emanation, Deafened
```

### What the Reaction form did with a save — before this round

**`reactionWhy` had no save check at all.** s11's prose save PASSED and would have shipped:

> *Trigger:* When a creature hits the vampire with a melee attack. *Response:* The attacker must
> succeed on a {dc} Strength saving throw or take {dmg} Piercing damage and have the Prone condition
> as living thorns lash it down into a sudden hedge.

That is the 2014 wording, and `{dc}`/`{dmg}` unfilled besides. The reaction form now takes the save
form's fields, one renderer writes both, and a prose save is refused with the reason naming the
fields.

### s01's missing amount

**The model wrote no amount, and the engine removed nothing.** Its answer declared `quantities: 0`
for *"reducing its Speed until the end of its turn"*, so `quantitiesOk` passed — 0 promised, 0
written.

The gate that should have refused it is that same `quantities` check, and it cannot: it trusts the
model's own count, and a row that says "reducing its Speed" promises an amount whatever the model
declares. The audit caught it afterwards and labelled it `open_ended` high, which is the label doing
its job. I have not built a word rule for it.

---

## Part 2 — a trait that only mentions saving throws

**Print's own data: 324 traits, 85 mention a saving throw, 12 force one.** The 12 are the auras and
the death bursts; the other 73 are Legendary Resistance, Magic Resistance and their kin. The test
is true for exactly the 12, false for exactly the 73, and still true for each of the 12 when its
save is rewritten as prose, because prose is the shape a model writes.

**The false refusals: 11 of the 20 traits the old test refused forced no save at all.** More than
half. Among them s32's *Pressure Without Pause* (twice, both tries) and s35's *Barbarian Rage* — a
barbarian with no Rage.

**Where my count differed from yours and why.** I first got 14 forcing a save, not 12: the extra two
are `Undead Fortitude` on the Zombie and Ogre Zombie, which *does* force a save — the zombie rolls
it. The question that matters is whether the save is forced on **another creature**, which is what
the save form can express, and that is exactly 12. Your 73 includes those two, and print writes both
as traits, so the rule must let them through.

---

## Part 3 — the counts

| | this run | the two earlier rolls |
|---|---|---|
| seats asked | 48 | 48, 48 |
| refused on the first try | 13 | 14, 14 |
| landed on the second | **5** | 5, 5 |
| refused again | 8 | 9, 9 |
| declined, not re-asked | 4 stood down | 3, 4 |

By the first refusal's reason, this run: `a trait is not a save` 2/7, `a number promised and not
written` 1/2, `no row of the kind asked` 0/2, `a condition on a hit written as a trait` 1/1, other
1/1. The earlier roll with the Reaction path live read `a trait is not a save` **3 of 6**, against
**0 of 7** before this round.

**Every Reaction that landed is printed in full above.** Two on the measuring run; one or two on each
of the others.

### Rows per sheet, from the script

| | tape before | the run after |
|---|---|---|
| invented creatures below the band's floor | 3 — s10, s20, s28 | **2 — s10, s28** |
| below print's median | 5 | **3** |
| exactly at the floor | s14, s30, s34 | s14, s20, s28→4 (still below), s30 |

**s20 went from 7 rows to 8 and is now at the floor.** This is the first round of the last five that
made a thin card less thin rather than more.

### Cost

| | |
|---|---|
| model calls per sheet | 9.71 on the tape before, **9.61** on the run |
| seconds per sheet | 10.7 (409s wall clock for the 38) |

---

## What I would conclude, kept apart from the counts

**This round found more than it built, and two of the finds were mine to own.**

The Reaction path was **dead on every print body** on its first live run: the print-canon paste
removed the seat's Reactions as chassis filler, with a trace line that said they had landed. Twelve
unit tests passed over it because they all drive a homebrew path, where that paste never runs. And I
broke the one invariant this path is held in by — the save object was documented in the seat prompt
unconditionally, so the FIRST ask changed and strict replay went to 33 of 38 missing. Both are fixed
and both are now tested; neither was findable without running the thing.

**The rule itself is right and the stop rule's number is measuring the wrong denominator.** The
engine marks a refusal as "a response to being hit, damaged or moved" by reading the refused trait's
own text, and that fires 1 to 4 times a run. Meanwhile Reactions land 1 to 2 times a run, mostly
from refusals the marker never caught. A rate over a denominator that small, picked by a detector
that is not the thing being measured, is not a number I would act on either way.

**What I would put next is the one-Reaction rule.** It cost two of the five marked cases, both
Vashka, both because print's Riposte was already there. I wrote that rule from print's own habit —
21 of its 22 Reaction-bearing blocks carry exactly one — but print's one Reaction is the body's,
and the seat's is the answer to what the GM typed. "Never two" and "never a second one beside the
body's" are different rules, and I picked the stricter without measuring. The measurement needs no
model: how many sheets have a body Reaction AND a seat that wanted one.

**What I would not change** is the save gate or the bare-save refusal. A trait carrying a prose
saving throw cannot be run, and a save row offered to the trait seat loses its trigger and becomes a
soft effect in an attack's place — the owner has already graded that a dead row, and the three on
the earlier run were exactly that.

Queued and untouched: a rider the seat can write onto an attack; the action seat answering with a
trait (4 on the tapes); a trigger on the creature's own action; the seat form's closed trigger list;
a row that takes an attack's place; thin cards; the catalog list.
