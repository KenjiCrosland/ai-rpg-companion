# Round two — what the GM typed about the creature reaches the top of the sheet

Branch `statblock-enhancments-part-2`. Nine commits, ready to push. Part A is done and accepted;
Part B's probe is **running as this is written** and is the one item below without numbers.

## 1. Step 0a — the fields, and both verdicts

Changed fields over both forties, counted by leaf path with array indices collapsed:
**`ledger` 110, `clauseBy` 14, `claimedClause` 4** — nothing else. Both replays then read
**38 of 38** and **39 of 39** reproduced exactly, exit 0.

No model call was made. The `calls` array of every recording is byte-identical because only the
`sheet` field was transplanted — which matters, because the whole-batch recorder dropped the path
call on 28 of gm40's 39 and installing its files whole corrupted the canary's tapes before I
noticed. That method is now `scripts/refresh-recording.mjs`, with the field check built in.

## 2. Step 0b — the table and the three answers

In `FACTS-gm40-2026-11-27.md`. Every row of the table confirmed against a trace line; nothing needed
correcting. The three answers, with answer 1 corrected after Fable's §9:

1. **`corpusEntry` in `path.mjs`**, by its **variant rule** — "the longest corpus name the answer
   contains as whole words, tail or head", added 19 October for Cave Troll. Confirmed from the code.
   My first answer named `printCanonFor`, which returns null for "Assassin Vine" at every CR; I
   proved that wrong by replaying s26 with a guard on that lookup and finding it still the Assassin.
2. Three sheets where the named body is not the body used, and **one is A4's case**: gm40 s26.
   gm40 s09 (`Bugbear` → `Bugbear Warrior`) is a family name resolving to its only entry, and canary
   s26 (`Green Hag` → `Mage`) is a different fault — the class decision discarded the named body.
3. **Fable's reading is right.** "print body stands down" appears on s06, s22 and s26 and print canon
   runs on all three. The line now says the *alias match* stands down and that print canon is
   decided separately.

## 3. A1 to A5

| | what changed | the change that turns its test red |
|---|---|---|
| A1 | the ledger reads the bound row before the spells; a named spell is answered by its own name only where the answer would be a spell list | the row/spell-row ordering reverted — 2 red |
| A2 | `typedFactsIn` and `factOnSheet`; facts are entries of their own kind, read from **every** clause including the head, several per clause, out of the ask counts | the fact branch disabled — 3 red |
| A3 | typed HP whichever way round; `110 feet`, `level 15`, `2d8` still set nothing | the pattern reverted — 3 red |
| A4 | **not built.** The rule Fable first gave would refuse "Cave Troll"; the real check is the creature's type, which needs the facts call, so A4 moved to Part C | no test written: one there would pass with the change removed |
| A5 | a distance the creature moves its target is not its walking speed | the pattern reverted — 4 red |

**A5's rule, as asked:** narrower, not wider, and it adds no words. The distance must sit beside a
word already in the pattern that says it is movement — before or after. All four target-movement
phrases set nothing; `30 feet of movement`, `speed 20 ft` and `moves 40 ft` still set it, and both
canary typed speeds land.

**Fable's §10 fixes.** Fix 1: every step that sets a typed fact now takes it from the reader — the
speed header, the size header, the declared AC and HP loop, and the defence merge. The defence one
mattered: it read `COND_WORD`, which holds "charmed" and not "charm", so s28 would have been
re-recorded without its immunity. A root the GM types now resolves to the condition the sheet
carries. **I should have reported s28's mismatch in my previous report and did not.** Fix 2: for HP,
a count of attacks and a defence, the fact must be all the clause says, hedging words aside — so
"regains 10 HP at the start of its turn" and "allies within 10 feet are immune to fear" state no
fact, while "resistant to nonmagical weapons" still reads as Bludgeoning, Piercing and Slashing.

**Stop rule 4, after both fixes:** four clauses move on gm40 — s23's "around 110 HP" and "should get
3 attacks", s28's "immune to charm", s26's "pulls 10 ft" — and **none on the canary**. No clause
Fable did not name.

## 4. The scoreboard, asks and facts apart

| | round one | after Part A |
|---|---|---|
| gm40 asks | 62 / 24 answered / 8 mismatch / 30 open | **61 / 26 / 8 / 27** |
| gm40 facts | — | **7, all answered** |
| canary asks | 39 / 25 / 4 / 10 | **39 / 26 / 4 / 9** |
| canary facts | — | **8, all answered** |

Fifteen fact entries, every one answered and every one on Fable's expected list, including s37's
AC 16 and 120 hit points that he had missed. **None off the list.**

## 5. s23, s26 and s28

| sheet | before | after |
|---|---|---|
| s23 Captain Iress Vane | HP 157 | **HP 110 (15d8 + 45)**, AC 17 kept; a new signature |
| s26 Fen-Barbed Creeper | Speed 10 ft. | **Speed 30 ft.**; a new signature; still the Assassin |
| s28 Madame Zolga | no charm immunity | **Immunities carry Charmed**; a new signature |

All three went live at the **idea call** and nowhere earlier — 4 of 14, 4 of 12 and 4 of 12 prompts
kept. The full blocks are in `BLOCKS-gm40-facts-2026-11-27.md`.

## 6. The probe — running, not reported

`PROBE-facts-2026-11-27.md` is **not written**. The facts call and `validateFacts` are built and
committed, wired to nothing, and `scripts/probe-facts.mjs` runs them over all 77 replayable inputs
plus Fable's six hazards, three rolls each — 249 readings.

The first attempt died silently after about an hour with no output: I had piped its progress through
`tail`, which buffers, so I could not see it, and my `pgrep` was matching the shell wrapper rather
than node, which is why I believed it was still alive. The second run writes its progress and a
partial result to disk after every reading and gives each request a 90-second deadline. It is
mid-flight at the time of writing; the partial file is `/tmp/probe-facts.partial.json`.

**Nothing has been read against the bar yet**, so the probe's verdict, the count, and the facts on
neither list are all still owed.

## 7. Suite, lint, replays

**Suite:** exit 0 — 290 suites, 6,118 passed, 26 skipped.

**Both replays after the closing refresh:** gm40 **39 of 39 exactly**, 1 skipped; canary
**38 of 38 exactly**, 2 skipped; both exit 0.

**Lint by rule.** gm40: print-range 3, hot 2, per-attack-ceiling 2, alignment-fit 2, hot-offense 1,
dc 1, under 1, print-rows 1, undefined-attack-ref 1, lack-honored 1, owed-clause 1, dual-recharge 1
— `undefined-attack-ref` falls from 3 to 1, and `owed-clause` appears once, on s26's "2d6 poison at
start of turn", which Fable confirms is a true finding on the new sheet. Canary unchanged:
adjudicable-target 4, dangling-ref 1.

## 8. The commits, in order

1. `5470783` refresh every stored sheet so both replays read clean *(Step 0a, on its own)*
2. `d0be703` Step 0b — the facts table confirmed, and the three answers
3. `fd5f2eb` the closing refresh as a script, and two corrections to the Step 0 file
4. `3904d57` Part A — four of the five, and why A4 is not one of them
5. `ae0c138` one reader for typed facts, and A3 reaches the sheet
6. `15e49ee` the reader is the only reader, and a fact must be the whole clause
7. `48717c4` s23, s26 and s28 re-recorded from the idea call, and the closing refresh
8. `8cfbe35` both blocks files, both lints, after Part A
9. `d7c8855` the facts call and its probe, wired to nothing

**No deletions this round, so no deletion commit.** The four ledger files of 26 November stay:
section 2 names them. I staged their deletion under the new-blocks-file rule and reversed it before
committing.

Also in commit 9, from Fable's §11 note 1: the refresh script now leaves a recording alone when its
sheet holds no difference, so the next refresh commit shows only the sheets that changed.
