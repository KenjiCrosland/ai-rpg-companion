# For the critic — gate of 2026-11-08

One sweep forty on `d042f56`, 40 of 40, no throws. You have not seen any of the fourteen
commits since your 11-05 read, so this is a wider handoff than usual. Every number below
comes from the instrument that owns it — `check-run.mjs`, the engine's own traces, or the
print corpus — not from a probe written to make a point. Where a figure is **recalled**
rather than measured I say so.

## The run

| | this gate | 11-08 early | 11-05 gate |
|---|---|---|---|
| blocks | 40 of 40 | 40 of 40 | 40 of 40 |
| checker FAIL blocks | **2** | 5 | 3 |
| sheet-lint findings | 0 | 0 | 5 |
| `single-target-ceiling` | 1 soft, 0 fail | 0 | 0 |
| `swarm-multiattack` | 0 | 0 | 0 |
| accepted picks dropped by the value floor | 1 | 0 | 1 |

Blocks + traces: `smoke-out/sweep-2026-11-08T05-42-47/all.md`
Checker: `scripts/smoke-evidence/CHECK-sweep-2026-11-08T05-42-47.md`
Prior two gates, for the diff: `CHECK-sweep-2026-11-08T03-08-42.md`, `CHECK-sweep-2026-11-05T21-20-56.md`

The two FAILs are **Moraine Heart** (sheet #14, CR 15 2014, `save-fit`) and **Chorveth** (sheet #36,
`gate-fit`). Both are new blocks with new classes; neither recurs from a previous gate.

Note that **Chorveth IS sheet #36**, the archetype-only roll discussed below — its
self-grading loop is fixed and it now fails on something else entirely. The two facts are
about the same sheet and are not in tension.

## Your 11-05 items

**#08 Landing Maw — the werewolf kit on a staircase, 6 of 6.** Closed. The guard existed
and read the RAW verb hits, so the route call's own verdict — already stored, with the
prompt explicitly telling it to answer false for "a thing it carries or wears" — was
computed and ignored. Both guard sites now read the vetted hits. The key list is
deliberately untouched: it holds both `wears the shape` and `wears other faces`, and a
test asserts both senses survive so the next reader fixes the verdict, not the vocabulary.

**#23 brute-17-regenerator at CR 4.** Closed. A CR 4 regenerator brute now draws
`brute-5-regenerator` — one rung up instead of thirteen. The donor picker fell through to
`list[0]` when no rung sat at or below the target; it now takes the nearest rung.

**#30 Ledger Ghaunt — the ghost that flees carried coin.** Diagnosed to its root, which
was further back than the subject flip. The catalog HAS the mechanic the GM asked for —
`disarm`, "Disarming Twist" — but it declares `roles: ["skirmisher","defender"]` and the
concept routed to `lurker`, so it never reached the menu. Every step after that was
correct on a false premise: the action menu held 12 templates and none disarmed, the fit
call answered `no_fit` truthfully, the seat authored a Wisdom-save substitute, and the
trait seat reached for `phobia` — your flip. Three gates have since been opened for it,
and on a targeted twelve it now ships a complete row ("26 (4d12) Piercing damage, and the
target drops the held object") on 3 of 6 rolls, 0 of 6 shipping the dangerous shape
(damage kept, clause lost).

**Your §3 subject-flip rule is built**, but on the FIT call rather than the audit — that
call names the closest and has already read both the clause and the template's rules text,
while the audit runs after the row has shipped and been priced. Same rule, earlier gate.
It is a call field (`closest_subject: same | flipped`), never a word rule, because "the
creature" in an authored sentence is usually the TARGET. On this forty it refused 5 of 16
closest decisions (31%); on the targeted twelve it was 67%, so it is rarer on a broad run
than on the inputs chosen to provoke it.

**§6, ideas lost after acceptance.** Your breakdown was right and the free-row budget was
the smaller half of it. Measured: the budget discards 6-12 candidates per forty, but of 8
audit findings on rows it KEPT, 3 were already acted on (rename, claim revoked) and 5
shipped — 1 of those an audit false positive, 1 a prose nit, 3 real. Reordering the audit
would fix none of them, so that item is **refused with numbers**; the real loss was the
value floor, below.

**The value floor was doing active harm, and you flagged it first.** Nine templates sat
under their floor in every context of a 1,081-sample audit, so every time one was picked
it was dropped and a fallback stood in — across 80 sheets they were picked 8 times and
shipped once. Four separate causes, all now fixed: a gated control row was asked for 1.3x
the whole round when print ships 10 of its 81 gated rows with a condition and NO damage
(the Gorgon's Petrifying Breath, the Doppelganger's Unsettling Visage, the Ettercap's Web
Strand); four rows carried no credited value at all; and the gated floor itself was 1.3x
the round when print's own gated rows sit at a median of 1.00x — 55 of its 64 (86%) fell
below our floor, including about half its dragon breaths. The 1.5-2.5x figure the code
cited is the p90-and-above of breaths alone. Under-floor templates: **13 -> 1**.

## What is new since you last read, and where to look

- **Multiattack.** A shed row now takes print's pool form ("makes four attacks, using Bite
  or Devilish Claw in any combination") instead of doubling a surviving row. 36 of print's
  178 Multiattacks use that form; 0 of its 178 are rewritten when nothing is missing.
- **The audit's rewrite arm had never fired since it was written** — its gate read a flag
  no site in this repo sets (0 of 484 rows). 27 rewrites were discarded across the 11-05
  pair. It now reads the stamps this path writes; worth ~1 row per two fortys, and 20 of
  those 27 were the judge flagging a lowercase first word **it introduced in its own
  quoted span**. Capitalization reporting is now off: nothing shipped lowercase (0 of 484)
  and findings are capped at 6 per block, so that noise was crowding out signal.
- **A flagged free row is repaired, not evicted** (owner's ruling). It goes back through
  the authoring forms, where the model writes no numbers. **This is the weakest thing in
  the run: 7 calls, 1 applied.** All six declines are "the answer held no row of any kind".
  Worth your eye on whether the repaired rows that DO land are better than what they replaced.
- **Taste does not overrule an ask.** Role and style stop filtering the menu when the idea
  call says the seat answers a clause the GM typed (22 seats this run). The mechanism
  already existed and was triggered by a keyword list that lacked the GM's actual word.
- **A seed declares its own cell**, so repairing a row toward print's grammar no longer
  reshelves it out of the cell the menu looks for it in.
- **The swarm one-attack rule now stops at CR 3**, where its evidence stops: all seven of
  print's swarms are CR 0.25-3, and print has no swarm above CR 3 or ooze above CR 4. Four
  coupled points enforced it, one of them a hard checker FAIL. **Sheet #29, Swarm of
  Carrion Bell Choirs, is the one to read**: `sustained 90 (2 x Bells)`, dmg 103 against a
  card of 100, reads CR 13. It was 53 and read CR 9.5 in both prior gates, failing `under`
  and `gate-fit` — the only block that failed in both.
- **The engine no longer grades itself against its own prose.** On a blank roll the
  synthesis was passed in as "the user's words", so the extractor filed the engine's own
  "it does not brawl" as a LACKS clause and the gate failed the sheet for carrying a Bite,
  reporting "the GM asked for an absence" when the GM asked for nothing. **Sheet #36 is
  the archetype-only use case**; its clause record is now empty, as it should be.

## Two fixes this run did NOT test, and I would rather say so

- **A breakable object as a bound.** `condition-duration` failed the 11-08-early Vampire
  for "Restrained until the brambles is destroyed (AC 15; HP 20...)", which is print's
  phrasing verbatim three times (Ettercap, Giant Spider, Erinyes). The gate now credits
  it — but **no snare rolled on this forty**, so 0 findings is not evidence the fix works.
- **The duplicate-condition guard on the fallback shelf.** Krennik shipped three rows
  imposing Prone (print: 0 of 329) because the guard ran at the menu, the seat and the
  repair landing but not the shelf. It refused 0 third impositions this run, because no
  sheet reached three. Krennik's clearing may be roll variance.

## What not to spend your read on

- **The clause hit rate and never-answered count.** They read 76% and 4 here against 79%
  and 2 last gate, but the three-sweep window shifted between the two measurements and 3
  of the 4 entries are `0/2` — thin history, not persistent misses. The one durable entry
  is **#24, "a shell that sheds acid"**, at 0/3: the sheet DOES carry it
  (`Caustic Carapace`, "takes 7 (2d6) Acid damage"), arriving through the library door with
  no clause stamp, so it is a credit failure rather than a generation failure. Four of the
  six clauses I examined were satisfied at the table and uncredited.
- **`decoration_rows` at 12 against a bar of 2.** On inspection these are not shipped
  defects: each is a free row whose element claim the audit REVOKED and, in the cases
  sampled, renamed so it no longer advertises what it cannot deliver ("Devoured Arsenal
  Blow" -> "Gut Slam"). The metric counts the engine catching itself. Whether the bar
  should count that is the owner's call, not a defect for you to score.
- **The condition-payoff work** remains deliberately unscored, as before.

## Still open, and known

Your remaining Fixes are untouched: **#15 Gaol-Queen** (Key-Backhand and Shackle
identical, still a 3 x 33 frontliner, Word of Command pulls enemies toward her),
**#18 Tallow Reckoner** (Debt-Mark references "the reckoner's curse" with no curse on the
sheet), **#34 One-Cut Duelist** (three attacks that cannot miss, 84 DPR at CR 12).

One note on your §5 prescription for the Gaol-Queen: it asked for "a Leader's ally-attack
Reaction". Print writes **three** reactions in 329 monsters, all of them the same
`Protective Magic` on spellcasters, so that shape has no SRD precedent — a bonus action or
a gated action would read more like print. Measured, not recalled.

And one standing caveat the owner has ruled on: the high-CR swarm band question is closed
by the change above, but print offers no peer above CR 3, so the CR 13 swarm's numbers are
our design rather than a copy. Judge it as a monster, not as fidelity.
