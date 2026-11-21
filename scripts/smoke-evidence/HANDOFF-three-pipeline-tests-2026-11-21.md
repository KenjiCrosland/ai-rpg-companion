# Three pipeline tests, the stored findings, and the rule that misread the strike

Branch `statblock-enhancments-part-2`. Four commits: `3cea02b` the pipeline tests, `3dca070` the
stored findings, `e8f3778` the lint rule, `8c72a29` s06's stored sheet.

Blocks: `BLOCKS-the-forty-2026-11-21.md`. **No live call was made and no sheet a GM would see
changed.**

## 1. The four tests, and that they go red without their fixes

Five tests in `a-strike-reaches-the-finished-sheet.spec.js`, through `generateReskin` with a stub
routed on each call's opening words. 0.9 seconds.

| removed | result |
|---|---|
| `outsidePrintsAttackList` from the `extraRows` melee site | **"it is in Actions" RED, "its text … is the host's" RED**, and the NON-print case stays GREEN — the exact split that existed before the fix |
| the host derivation | **"its text up to the save clause is the host's" RED** alone |

You were right that the tape was the wrong road. A tape keys on the exact prompt, which is what I
kept trying; the stub does not need one. Two things the writing taught:

**A strike is renamed.** `name follows content` turned "Reeling Snare" into "Tentacle Slam", so a
test that looks for the name it was written under reads a rename as a deletion — the very
confusion this round is about. The tests find the row by its own `strike` declaration.

**A host does not grapple at seat time on a printed body.** On a twist path the host is still the
chassis's row and print's grapple is stamped on afterwards, so the redundancy case cannot be built
there at all. It needs a homebrew body that holds — s35's shape. That is the measured mechanism
behind your section-6 closing: s35's rolls fired the refusal and s06's never could.

## 2. The lint, and what reads its findings

**Where it ran:** stored at `generate.mjs` 11652, with three passes after it — the audit port and
its renames, the citation sync, and the derivation at 12882.

**Who reads them:** `checker.mjs` 2249 is the only reader. It grades each stored finding by rule
into fail or fix, and reads all three places a sheet keeps them (`lint_findings`, the 2024 model
inside `other_edition`, and `sheet_lint_findings`). **Nothing in `generate.mjs` acts on a finding**
— the one actuator beside them computes its own fix from a rule, not from the stored list. So
nothing depended on the findings being early, and nothing acts on one before the sheet is finished.

**The fix:** the sheet-lint entries are recomputed last and replace the ones stored earlier.
Everything else in `lint_findings` is left alone — those belong to passes that have already run and
are not re-derivable from the finished sheet. Two tests, both verified red with the recompute out.

## 3. s06 — the stored findings, the value check, and the drop that did not drop

**Stored before:** `strike-differs-from-host: Actions/Scree Snare: its attack line is not "Rubble
Lash"'s`. **Stored after:** none. No call re-recorded; the twelve answers are untouched.

**Section 6 of my last report was wrong and there is nothing for the owner to decide.** Scree
Buckle's save knocks **Prone**; the host grapples and restrains. The strike is its host plus a save
for something the host does not do — the ruling working. **The rule misread it**, exactly as you
said: it took the first "has the X condition" in the row, and since the derivation a strike's text
opens with its host's line, so the first condition in it is the host's own rider. It compared the
host with itself. It would have done the same to the Vampire's Grave Strike and the Dire Wolf's
Bite. It reads the row's `imposes` record first and the text after "it is subjected to the
following effect" as the fallback.

**THE VALUE CHECK PRICED THE SAVE CLAUSE ALONE.** Measured, not inferred — `valueCheck` on s06's
strike as written and on just its save clause:

| row | EV | floor |
|---|---|---|
| the strike as written, attack line and all | **1.5** | 5.7 (one attack of 2) |
| its save clause alone | **1.5** | 5.7 |
| the host, Rubble Lash | **12.1** | 5.7 |

The attack line and its 16 (3d8 + 3) contribute nothing: a row containing "Saving Throw" is priced
as a save row. So every strike is valued at its save and compared against the attack it replaces,
and cannot clear the floor. That is s06's 2.3 against 8.8.

**The row shipped because the drop failed.** `signature dropped by the floor` sets `actionT = null`,
which only prevents the LATER push; the strike was already pushed into `sections` at the seat, so
nothing removed it. The trace is accurate about the decision and wrong about the outcome — the same
shape as the stored findings, a decision recorded against a sheet that had already moved on.

Neither is in this round's order and I have changed neither.

## 4. The lint — nine rules, three columns

| rule | 18 Nov (38) | 20 Nov as recorded (40) | after (40) |
|---|---|---|---|
| uncited-replacement-row | 0 | 0 | 0 |
| ungated-turn-denial | 0 | 0 | 0 |
| citation-gate-mismatch | 0 | 1 — s20 | 0 |
| deafened-alone | 0 | 1 — s01 | 0 |
| rider-without-an-attack | 0 | 1 — s26 | 0 |
| strike-adds-nothing | 0 | 2 — s35, s36 | **0** |
| stock-template-name | 1 — s35 | 2 — s18, s24 | 1 — s12 |
| two-recharge-rows | 0 | 1 — s31 | 0 |
| strike-differs-from-host | 0 | 0 | 0 |

`strike-adds-nothing` moves from 1 to 0 in the after column: s06 was the rule's own false positive
and is now silent. The counts are read off the returned sheets, and from this round they are also
what the sheets carry.

## 5. Every sheet that differs on replay

**One: s06**, in `other_edition.lint_findings`, 1 entry to 0. Nothing else, on any sheet.

The strict replay reproduces 38 of 40. s22 and s36 miss in the prompt as always.

## 6. Anything a fix made worse

Nothing found. No sheet a GM would see changed this round; one stored field on one sheet became
true.

## 7. The suite and the replay

**exit 0 — 268 suites, 5796 passed, 26 skipped, 5822 total**, at `--maxWorkers=2`, no crash.
Replay: 38 of 40, the two that have never replayed.

## 8. The commit note, taken

The s06 re-record last round rode inside `dcce6df`, whose message was about renumbering. This
round's tape change is its own commit, `8c72a29`, and says what it is.
