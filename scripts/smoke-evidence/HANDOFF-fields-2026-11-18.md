# Handoff — the number gate, a Reaction's save, and the one-Reaction count

For the owner and Fable 5.2, 2026-11-18. Branch `statblock-enhancments-part-2`.
Blocks: `BLOCKS-fields-2026-11-18.md`. Every second try: `SECOND-TRIES-2026-11-18b.md`.

**238 suites, 5525 passed, 26 skipped. Build clean (5.05s). Reference scripts: 576 cases, 0 threw,
0 sheets with two rows of one name, 0 Multiattack citations naming no row. Widened ship scan: 0.
38 of 38 ran — 0 threw, 0 timed out. Strict replay 38 of 38 reproduced EXACTLY.**

---

## The headline: the number gate was the whole brake

| | last round | this round |
|---|---|---|
| first-try refusals | 13 | **14** |
| landed on the second try | 5 | **10** |
| refused again | 8 | **4** |
| `a trait is not a save` recovering | 2 of 7 | **4 of 5** |
| `a number promised and not written` | 1 of 2 | 3 of 5 |
| `no row of the kind asked` | 0 of 2 | 2 of 2 |

Two rounds ago that first line was **0 of 7**. The form was right, the reason was right, and a gate
that could not see the fields was refusing the answers it had asked for.

The forms the second answers arrived in, which is what this round is about:

```
5  a trait -> a Reaction, with the save in FIELDS
4  a trait -> a trait
2  nothing -> a save row
1  a trait -> a Reaction
1  a Reaction -> a Reaction
1  a trait -> a decline (it named where the clause belongs)
```

### Every Reaction that landed, in full

```
04-chapel-bell-ringer · Knell of the Struck Bell
  *Trigger:* The chapel bell-ringer is struck by an attack.
  *Response—Wisdom Saving Throw:* DC 13, each creature within 30 feet of the chapel bell-ringer that
  can hear the bell. *Failure:* The target has the Frightened condition until the end of its next turn.

28-unblessed-bell-swarm · Toll Buries Deep
  *Trigger:* When the swarm deals Necrotic damage to a creature.
  *Response:* That creature is Deafened until the end of its next turn, and it can't be magically
  healed until it takes a turn outside the swarm's space.

36-unyielded-champion · Steps Through the Swing
  *Trigger:* A creature within the champion's reach makes a melee attack against it.
  *Response:* The champion moves up to its Speed straight toward that creature without provoking
  Opportunity Attacks, and if it ends this move within reach of the attacker, it makes one Greatsword
  attack against it.
```

---

## Part 1 — the number gate

**Your reading is right.** `quantitiesStated` read only `trigger`, `effect` and `response`. A
Reaction with its save in fields keeps its area in `save.target` and gets its DC and dice from the
engine, so the prose had nothing to count and a correct row was refused for putting its numbers where
this round's own prompt told it to.

**One addition.** What counts is what the ENGINE will print: a save always prints a DC, and prints
dice whenever `damage` is true. For all three recorded answers the DC alone satisfies the declared 1.

**Counted across the three live rolls: 12 second answers used the new form, and the old gate refused
5** — s04 Toll of Her Own Death, s08 Splintering Breach, s10 Chorus of Wounds, plus the Vampire's
Bramble Backlash (declared 2, prose wrote 1) and Vashka's Shoulder to Shoulder (declared 1, wrote 0).

My first cut appended the literal string `"DC"` to what the counter reads — and the counter counts
NUMBERS, so it counted nothing and all three stayed refused. The same class of mistake as the gate's.

**Strict replay was 37 of 38, not 38.** The gate meets this form only on a second ask, as you said —
but the tape *carries* second asks, recorded last round, and s10's was one of the five. It landed, and
the sheet gained a row.

---

## Part 2 — a Reaction's save

**Who saves: "the triggering creature".** That is print's own wording, from the only Reaction in the
corpus that forces a single-target save — the Chain Devil's Unnerving Gaze, "DC 15, the triggering
creature". The catalog's own Reactions never force a save, so print is the only authority. An area
stays an area.

**When it ends: `conditionClauseFor`** — the same helper that ends a save ROW's condition. Grappled
takes an escape DC, Prone self-ends, everything else takes "until the end of its next turn".

**A third thing I found while doing it.** `TARGET_OK` is anchored and narrow, and it rejected the
ram-golem's "each creature in a 15-foot Emanation centered on the breach" — so the fallback turned a
whole breach into *one creature* saving, and my first cut read "area" off the already-defaulted target
and agreed with it. An area now keeps the model's own words. `TARGET_OK` also gained the Emanation's
"originating from X" tail, which is print's own phrasing and was being rejected for save ROWS too.

### A Reaction's damage is unpriced

Measured by adding a 24 (7d6) Reaction to the Vampire and re-reading the checker:

```
dmg 75 -> 75    sustained 75 -> 75    nova null -> null    offensive CR 12 -> 12
```

**`dmgRead` does not count a Reaction at all.** No sheet on the current tape carries a damaging
Reaction, so there is no before-and-after to give you; the Vampire is the probe.

The dice INSIDE a Reaction's save are sized by exactly the save row's rule — the same
`capSingleTargetSave(per_hit × 1.4 for an area, × 1.1 for one target)`. So a Reaction is **priced like
a save row and then not counted like one**. Thorn-Crown Reprisal was 24 (7d6) once a round at CR 13
on a sheet already reading 75, and the round it fires in is every round something hits the vampire in
melee. Saying it plainly as instructed: that damage sits outside what the sheet's CR is checked
against, which is what the end-of-line repair was removed for. I have not changed the pricing.

---

## Part 3 — the one-Reaction rule: REPORTING, NOT BUILT

**The build condition is met.** Across the three live rolls the rule declined **5** seat Reactions
that had passed every gate, and **2 of the 5 were blocked by a Reaction the seat itself wrote**:

| run | sheet | the seat's Reaction | what was already there |
|---|---|---|---|
| rx | 11-vampire | Bramble Reprisal | **"Knockdown Reprisal" — THE SEAT** |
| rxf | 36-unyielded-champion | Closing the Gap | **"Step Through the Swing" — THE SEAT** |
| rx | 22-vashka-the-red | Lacquered Line | "Riposte" — the catalog kit |
| rxf | 22-vashka-the-red | Shoulder to Shoulder | "Riposte" — the catalog kit |
| final | 22-vashka-the-red | Locked Shields | "Riposte" — the catalog kit |

So your proposed ruling would recover **3 of the 5** — all of them Vashka — and the other two are the
seat's second Reaction, which part 2 of the ruling keeps refusing anyway.

The second exclusion is **not** met: on the tape 13 of 38 sheets carry a Reaction and exactly **one
(s37 Orrin Sable) carries two**, Riposte from the kit beside Parry from print. Letting the seat land
beside a body Reaction would add one more sheet with two, so about 2 of 38 — nowhere near a third.

And your point stands on the engine's own evidence: **"a creature gets one" is not a rule the engine
keeps.** s37 ships two today, and the census is 5 from the seat, 4 from print, 5 from a kit or the
catalog.

---

## The rest of the counts

| | |
|---|---|
| seats that produced an answer | 51 — 37 wrote a row, 14 refused |
| declined, not re-asked | 3 stood down because the sheet already answered the clause |
| rows per sheet, below the band's floor | 2 of 15 invented, before and after (s20, s28) |
| below print's median | 5, before and after |
| model calls per sheet | 9.63 on the tape, **9.61** on the run |
| seconds per sheet | 10.6 (407s wall clock for the 38) |

The row counts did not move this run, because the three Reactions landed on sheets already in band.
s20 is still one row short of its floor and s28 one short of its own.

---

## What I would conclude, kept apart from the counts

**This is the round where the thing started working, and the lesson is about where the brake was.**
Two rounds ago I concluded the seat's fixed form was the problem and proposed letting it change form.
That was right but incomplete: changing the form exposed a second gate that could not read the new
form, and *that* was holding the recovery at 5 of 13. 10 of 14 is what the design was always worth.

**I would not build the one-Reaction rule from this count.** It recovers three Vashka rolls — the same
sheet three times — and the measurement cannot tell me whether that is a rule worth having or one
creature's bad luck with a kit that brings a Riposte. The cheap thing first: the census shows 5 of 38
sheets get their Reaction from a kit or the catalog, so the question is how often a kit Reaction and
a seat that wants one land on the same sheet, across more than one tape.

**The unpriced damage is the thing I would not leave sitting.** Nothing on the current tape triggers
it, so it is not urgent, but a Reaction can deal a save row's damage every round and the checker's CR
read does not see it. That is the exact shape of the defect the end-of-line repair was deleted for,
and it is in the engine now rather than in a repair. It needs either `dmgRead` to count Reactions or
a rule that a seat-written Reaction deals no damage — and that is a decision, not a fix.

Queued and untouched: a rider the seat can write onto an attack; the action seat answered with a
trait; a trigger on the creature's own action; the seat form's closed trigger list with amounts as
fields; a row that takes an attack's place; thin cards; the catalog list.
