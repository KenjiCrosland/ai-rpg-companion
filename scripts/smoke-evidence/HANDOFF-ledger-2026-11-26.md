# Round one — the ledger of typed asks, and rows it protects

Branch `statblock-enhancments-part-2`. Seven commits, ready to push. Nothing pushed.
Step 0 was reported separately in `LEDGER-gm40-2026-11-25.md`; this covers steps 2 to 11.

## 2. The scoreboard, both forties

Read off `generation.ledger` by `check-run`. "Before" is the engine's old verdict as Step 0 recorded
it; the ledger is stricter, which is the point of Part A.

| | gm40 before | gm40 after | canary after |
|---|---|---|---|
| asks | 62 | **62** | **39** |
| answered | 35 | **24** (21 by receipt or anchor, 3 handed) | **25** (23 receipt or anchor, 2 handed) |
| mismatch | not distinguished | **8** | **4** |
| open | 27 | **30** | **10** |
| open: never-written | — | 24 | 8 |
| open: spell-missing | — | 3 | 1 |
| open: removed | — | 2 | 0 |
| open: claimed | — | 1 | 1 |

The eleven that moved out of "answered" are the eight the engine was wrong about in Step 0 plus
three the condition check now calls mismatch. Nothing was taken off a sheet to achieve it: Part A
changes no row.

## 3. Every row Part B kept, with the pass that would have taken it

**gm40 — the guard fires 7 times across 2 sheets, and 2 rows come back.**

| sheet | row, word for word | would have been taken by |
|---|---|---|
| s21 | **Snarling Commands.** While Bloodied, each of Gorrak's attacks deals an extra 14 (4d6) damage as he fights faster and wilder. | the row budget, "leaves at ship", budget (0) |
| s22 | **Scripted Echo.** *Trigger:* The scroll-fed familiar teleports, leaving a flickering afterimage of spell-script behind. *Response—Wisdom Saving Throw:* DC … | the row budget, "leaves at ship", budget (1) |

The guard also fires on `Gathering Ruin` (s21) and `Fifty-Year Purging` (s22), which the old code
kept anyway — so those two are held by the guard now but were not lost before.

Budget cuts on gm40 fell from five to three. The three that stay cut are the invented rows Fable
predicted: `Pack Tactics` (s01), `Unyielding Bulwark` (s10), `Shifting Glamour` (s11).

**The canary — the guard fires 3 times and changes nothing.** `Sulfurous Reek` (s17),
`Hold the Wall` (s23), `Cursed Wake` (the marsh witch). All three were already kept by the
"first of its kind" allowance, so no block moved. Three sheets, under the six-sheet stop rule.

## 4. A kept row that reads wrong

**s22's Scripted Echo**, as predicted. It triggers on "The scroll-fed familiar teleports" and
nothing on that sheet teleports — the teleport is an ask that was never written. Reported, not
fixed.

Nothing else reads wrong from Part B. s21's Snarling Commands is a clean Bloodied trait.

## 5. Every pass that removes a row, and whether it logs

All five log, and all five now record the removal **as data** through `noteRemoval(row, pass,
section)` — the row, the pass and the clause it was bound to. `noteDrop` only ever recorded a
template, so a seat-written row left nothing behind at all.

| pass | logs in the trace | records as data now |
|---|---|---|
| the row budget | yes | yes |
| print canon, chassis row leaves (two sites) | yes | yes |
| the filler sweep (`closedPathFillerLeaves`) | yes | yes |
| a name clash after landing (`dropLandedRow`) | yes | yes |
| the value floor | exempt since 23 November — confirmed, it does not remove these rows | n/a |

## 6. Every sheet that differs, from a diff

**gm40: 37 of 39 identical, two changed** — s21 and s22, the two rows above.
**The canary: 38 of 38 identical, none changed.**

A strict replay nonetheless reports `DIFFERS (generation)` on most sheets and
`DIFFERS (generation, sections)` on some, while the printed block is byte-identical. Two causes,
both measured: `generation.ledger` is new on every sheet, and a row that binds a clause by receipt
now carries a `clauseBy` stamp. On the canary's s13 the `Swallow` row is the only one carrying the
stamp and its block is unchanged.

## 7. The call each re-recorded sheet missed at

Both at the **audit call**, and nothing earlier on either forty. s21 kept 10 of its 13 prompts from
the tape and s22 10 of 12. The rule of this round held.

## 8. The check-run line, and what I did

`concept share 82% (174/211 rows)` comes from `reskin/checker.mjs:2366`. It sums each sheet's
`fidelity.conceptRows` and `fidelity.rows` over the run. The per-sheet values differ correctly
between the two forties — gm40 reads 3/5, 6/6, 5/5 … and the canary 2/3, 2/3, 2/3 … — and the sums
genuinely coincided at 174/211 over 40 sheets and 37.

**So I neither fixed nor deleted it, and I am telling you rather than guessing.** I could not
reproduce it as a bug: the arithmetic is right and the inputs are per-sheet. A coincidence at that
precision is unlikely enough that I would not trust the figure, but I have no measurement that
condemns it. My recommendation is to delete the concept-share half of that line in the next round
that touches the checker, because the ledger scoreboard now carries what the owner reads it for.
The coverage half of the line (`Dropped N of M GM clauses`) is sound and differed correctly.

## Fable's addition — every row print canon removes, and how it was bound

**Both of gm40's print-canon removals that leave a clause open were bound by `anchor`.**

| sheet | clause | row taken | boundBy |
|---|---|---|---|
| s17 Young Black Dragon | "breath is necrotic" | Necrotic Breath (Recharge 5-6) | **anchor** |
| s30 Cliffroad Outrider | "mounted" | Screaming Pass (Recharge 5-6) | **anchor** |

By your reading that is a break of the standing ruling that a row written for a typed clause
survives print canon. `printCanonExempt` exists in the code, so either it is not consulted at these
two sites or it does not accept an anchor binding. **I have not changed print canon either way, as
ordered.** This is the thing to settle before the ruling 3 round.

On s30's other two rows — `Mounted Agility` and `Wheeling Dive`, "the seat's, not the Wyvern's" —
your reading was right: neither is bound to a mechanical clause, so the ruling was not broken by
them. The canary's print-canon removals are all chassis novas and fillers, none bound.

## 9. The tests, and the change that turns each red

| for | test | red when |
|---|---|---|
| A | a typed ask whose row is on the sheet → answered, named, with its binding | — (green either way; it is the control) |
| A | a named spell the sheet does not list → open, spell-missing | the spell rule is switched off |
| A | a row a pass removed → open, removed, naming the pass | `removals` is ignored |
| A | a call's claim on a row not bound to the clause → open, claimed | the claim check is switched off |
| A | a clause naming a condition the row does not impose → mismatch | the condition check is switched off |
| A | the ledger is built at the end | it is written to another field |
| B | three typed rows on a card whose allowance is one → all three stay | the guard is switched off |
| B | the same card with nothing typed → the budget cuts as today | — (the control) |

Two corrections I made mid-build rather than report as done. My **first** Part B test passed with
the guard removed: it used one typed row, and a protected-first ordering I had also added was enough
to keep it. The test now uses three typed rows on a card whose allowance is one — the case the guard
governs — and goes red without it. With that test in place **the ordering turned nothing red, so I
removed the ordering.** A kept row counts toward the budget whichever order it is considered in.

## 10. Anything a change made worse

Nothing on either forty. 37 of 39 and 38 of 38 blocks are identical; the two that changed each
gained a row the GM had asked for. s22's Scripted Echo reads oddly, but it read oddly as a cut row
too — it was simply invisible.

One thing to watch rather than a regression: the ledger's 8 mismatches on gm40 include rows that
answer their clause in substance while reading a different trigger or limit. They are reported, not
rewritten, which is what Part A is for.

## 11. The lint, the suite, the replays

**Lint — gm40:** 12 blocks with a FAIL of 39, unchanged from the broken-text round. By rule:
print-range 3, undefined-attack-ref 3, hot 2, per-attack-ceiling 2, alignment-fit 2, hot-offense 1,
dc 1, under 1, print-rows 1, dual-recharge 1.

**Lint — the canary:** 5 blocks with a FAIL of 38, unchanged. `adjudicable-target` 4 and
`dangling-ref` 1 — the two rules known to misread good sheets, and nothing else.

**Suite:** exit 0. 289 suites passed, 6083 passed, 26 skipped, 6109 total.

**Replays:** before the re-record, gm40 missed at the audit on s21 and s22 and nothing earlier; the
canary missed at no call at all. After: both forties reproduce every row, and the harness still
reports `DIFFERS` on the sheets carrying the new `generation.ledger` — explained in item 6.

## 12. The commits — seven

1. `d039d5a` statblock: the ledger of every typed ask on gm40 *(Step 0)*
2. `d74a9d8` statblock: Part A — the ledger of typed asks, made last on the finished sheet
3. `facaf6e` statblock: Part B — a row written for a typed ask is not cut
4. `37353c9` statblock: the kept-row trace prints the clause the GM typed
5. `9e347db` → amended into 3; not a separate commit
6. this round's recording commit: s21 and s22 re-recorded from the audit call
7. this commit: the two blocks files, the two check files, the scoreboard and this report

**Where my count of zero came from, since you asked.** I grepped the harness's stdout log. It carries
the `[N/40]` lines and the replay verdicts but not the per-sheet reskin trace. The trace is written
into the run directory — `smoke-out/<run>/all.md` and the per-sheet `.md` beside it. That is where
the next search starts.
