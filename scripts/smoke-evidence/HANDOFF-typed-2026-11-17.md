# Handoff — the four corrections, the arm, and both Typed runs

For the owner and Fable 5.2, 2026-11-17. Branch `statblock-enhancments-part-2`.
Blocks: `BLOCKS-typed-2026-11-17.md`. Changed rows: `CHANGED-ROWS-typed-2026-11-17.md`.
Finding log: `FINDINGS-typed-2026-11-17.txt`.

**234 suites, 5458 passed, 26 skipped. Build clean (5.75s).**

---

## The headline: the typed fix engine did nothing on a forty

Across 38 sheets the audit named a fix on **37 findings**. `add_duration` is the only kind that
acts, and it was named **twice**. One was medium confidence, so it was logged. The other was high
and was **refused**. Nothing acted.

| fix named | count | share |
|---|---|---|
| clarify | 32 | 86% |
| delete_span | 2 | 5% |
| add_duration | 2 | 5% |
| rename | 1 | 3% |

Confidence: 11 high, 24 medium, 2 low. **Every finding carried a fix field** — part 1 had 6 of 37
with the field missing, and that is now 0 of 37.

The one high-confidence `add_duration`, in full:

```
37-meshrin  Barbarian Rage
  finding: "The rage is entered but never ends"
  span:    "...deal an extra 7 (2d6) damage of the weapon's type"
  refused: the result is not the original row with one clause added
```

**The refusal is correct.** The audit quoted a span that is not a whole sentence — it sits mid-row,
before `, and it has advantage on Strength checks and saving throws`. Appending there would have
shipped `…damage of the weapon's type until the end of its next turn., and it has advantage…`. This
is the check that replaced the prefix rule, and it caught exactly what the prefix rule waved through.

So the honest reading: the typed fix is built, correct, and **inert**, because the audit almost never
asks for the one thing it can do. 86% of what it asks for is `clarify`.

---

## The four corrections, each shown on the arm

The `audit-as-taped` arm answers the audit from the tape by its CALL, so a difference from the tape
is the engine's and not a fresh audit roll.

| | what the arm shows |
|---|---|
| 1 · the token fill | s17 `gains 14 (4d6) Temporary Hit Points` — was `gains Temporary Hit Points` |
| 2 · the GM-word guard | s20 `audit rename blocked — "Drowning Song" -> "Abyssal Roar" would drop the GM's own word "song"` |
| 3 · the rewrite | s37 `audit rewrite logged: Barbarian Rage …` — logged, not spliced |
| 3 · (same) | s12 Swarmshear ships one `Failure:`, not two |
| 4 · the exemption | Owlbear `audit rename: "Learned to Climb" -> "Crashing Pounce"` — renamed again |

The arm run differs from the tape on **19 of 38 sheets**. That is not 19 new changes: the tape was
recorded before every one of these commits, so most of the 19 are the known set from the repair no
longer running. Row-level, against the None arm and counting 2024 `sections` rows only, the engine
with the same audit answer changes the same 3 rows / removes 5 / adds 3 that Today does.

---

## Every rename the GM-word guard refused, with the row's full text

On the Typed run, 8 renames applied and 3 were blocked — one by the GM-word guard, two by older
guards. From the arm run (the taped audit proposed more renames), all three GM-word refusals:

**s17 Pit Fiend · "Chain of Broken Oaths"** — refused "Death Drinker", would drop "chain", "oaths"
> When a creature dies within 10 feet of the pit fiend, the pit fiend gains 14 (4d6) Temporary Hit
> Points, and until the end of its next turn its Bite attacks deal an extra 14 (4d6) Fire damage.

**s20 Trench Leviathan · "Drowning Song"** — refused "Abyssal Roar", would drop "song"
> Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder
> damage, and the target has the Deafened condition until the end of its next turn.

**s35 Well-Drowned · "Drowning Hymn"** — refused "Welling Lure", would drop "drowning", "hymn"
> Strength Saving Throw: DC 13, each creature in a 60-foot Emanation originating from the
> well-drowned. Failure: The target is pulled up to 15 feet straight toward the well-drowned, and
> the target has the Frightened condition until the end of its next turn.

**Against your stop rule, one of these is weak.** Drowning Song is thunder and Deafened — the word
earns its row. Drowning Hymn pulls a creature into a well, which is the drowning, though "hymn" has
no sound mechanic behind it. **Chain of Broken Oaths has neither a chain nor an oath in it** — it is
a death-triggered empowerment. The name is flavour rather than a false mechanical promise, which is
not the Owlbear's failure (a pounce called "Learned to Climb"), so I have not reverted the widening.
It is your call whether flavour-only counts.

On the Typed run itself the guard blocked one: **s(Ruined Eye, Wary Ear)** — refused "Turn to the
Threat", would drop "ruined". The other two blocks were the older guards (an element the row does
not pay; the user's own part name).

---

## What s23 prints live, once Dress the Line is refused

**Nothing stands in, and "fights from a shield wall" has no row.** The sheet ships:

```
Pack Tactics · Multiattack · Longsword · Longbow · Riposte
```

The trace is explicit:

```
asked but unanswered: "fights from a shield wall" asked for at_will and no row binds the clause
repair answer: ... answered [{"clause":"never breaks ranks","row":"Riposte"}],
               unplaced ["description:fights from a shield wall"]
```

So "never breaks ranks" became Riposte, and the shield wall itself is unanswered. Print's Pack
Tactics is on the sheet because the Hobgoblin Warrior carries it — the engine's own key match for
`pack-tactics` was declined by the call as a collision.

---

## The counts

| | tape (before) | Typed run |
|---|---|---|
| model calls per sheet | 10.9 | **9.3** (−15%, on 37 of 38 sheets) |
| total calls on the 38 | 416 | 355 |
| `free-row-fix` calls | 25 | **0** |
| `enrichment` calls | 40 | 0 (the harness answers it offline) |
| sheets run / skipped | — | 38 / 2 not replayable |
| threw, timed out, degraded | — | 0, 0, 0 |

**Nothing reaches `buildFreeRowFixPrompt` any more** — 25 calls on the tape, none now. That confirms
the unreached stretch: `freeFlagged` is declared and read but never pushed to, so `toFix` is always
empty. Removing it is not this round.

The per-sheet drop is the free-row-fix calls (0.66/sheet) plus enrichment (1.05/sheet, which is the
harness, not the engine).

**One malformed answer in 37 live audits.** Sheet 34's audit came back as invalid JSON and the AI
client's own JSON-repair retry fixed it — a 14th prompt family outside the 13 builders, and the only
one the harness did not recognise.

### Variation on the five frozen sheets (3 rolls each, only the audit live)

| sheet | rows | differ across 3 rolls |
|---|---|---|
| 02 Bog Hound | 5 | 3 |
| 12 Swarmshear | 9 | 3 |
| 24 Scythe-Brood Horror | 7 | 5 |
| 30 Chrismal Ossuary | 9 | 3 |
| 38 Unyielded Champion | 5 | **0** |

**14 of 35 rows differ (40%); one creature of five came out identical all three rolls.** Because
every call before the audit is served from the tape, that 40% is the audit's own variability and
nothing else. It is not comparable to the earlier "39 different in 45", which was measured with more
of the pipeline live.

---

## Found while measuring, needing your call

**A row-name reference loses its casing on a 2014 sheet.** Sheet 02 ships:

```
Multiattack. The bog hound makes two Bite attacks. It can replace one attack with a use of Drag prone.
Drag Prone.  Each creature in a 15-foot cone must make a DC 13 Strength saving throw. ...
```

The engine wrote it correctly — `multiattack replacement clause: It can replace one attack with a
use of Drag Prone.` — so something in the 2014 conversion lowercases the word after it. One sheet in
38, and exactly the kind of thing that gets screenshotted. **I have not fixed it:** every candidate
fix is text matching on a finished row, which is your call each time. Not caused by this round —
Today's roll named that row "Mud Sweep" and so never showed it.

**Fenwater Binding's flags** turned out to be nothing missing that blocks a fix: it carries
`authored`, `authoredSeat` and `clause`, so its origin reads as `model` and typed fixes can reach
it. What it lacks is the `expresses` element receipt.

**The rewrite was doing real work.** Correction 3 was right that the splice could move a sentence an
`add_duration` finding had quoted, but logging it instead has a cost. Sheet 02's Mud-Caked Hide:

```
Today: While the bog hound remains motionless, the bog hound is indistinguishable from the mud or
       riverbank it lies in; a creature notices it only by taking the Search action or succeeding on
       a Wisdom (Perception) check against DC 13, and the disguise ends the moment the bog hound moves.
Typed: While the bog hound remains motionless, it is indistinguishable from the mud or riverbank it
       lies in.
```

The audit still sees the problem on the Typed run — `The trait gives no action cost, no…` — names it
`clarify`, and `clarify` is logged. So the sheet keeps the vaguer row. That is the trade the typed
design makes, and it is the strongest argument for giving one more kind the power to act.

---

## What I would conclude, kept apart from the counts

The corrections hold and the engine is honest: it refuses rather than guesses, and the one refusal it
made was right. But the round's net effect on what a stranger sees is **slightly negative**, because
the rewrite that used to improve rows is now only logged and nothing replaced it. The audit's
judgement still lands in the trace and no longer lands on the sheet.

If the aim is the Reddit bar, the question I would put next is not "which fix kind acts next" in the
abstract but: **of the 32 `clarify` findings, how many are a missing action cost or a missing end
condition** — both of which are a clause appended to a named sentence, the thing `add_duration`
already does safely. That is a measurement, not a build, and it would say whether one more typed kind
would carry 20 rows a forty or two.

Two things remain untouched by instruction: the unreached repair stretch, and the refused template.
