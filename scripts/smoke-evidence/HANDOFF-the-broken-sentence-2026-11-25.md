# A broken sentence on the Oathbound Bulwark — report

Branch `statblock-enhancments-part-2`. Five commits, ready to push. Nothing pushed.
Written against your amendment of 25 November: the suppression is out, the pattern is narrowed.

## 1. s25's Reaction, word for word, in both printings

**Before — 2024:**
> *Trigger:* A hostile creature moves within 10 feet of the bulwark's ward while the bulwark is
> within 10 feet of that creature. *Response—Strength Saving Throw:* DC 17, the triggering creature.
> *Failure:* The target has the Prone condition, the target is pushed up to 10 feet straight away
> from **Bulwark. Prone and is not pushed.**

**Before — 2014:**
> …the triggering creature must succeed on a DC 17 Strength saving throw or be knocked prone and
> pushed up to 10 feet straight away from the bulwark. **Prone and is not pushed.**

**After — 2024:**
> *Trigger:* A hostile creature moves within 10 feet of the bulwark's ward while the bulwark is
> within 10 feet of that creature. *Response—Strength Saving Throw:* DC 17, the triggering creature.
> *Failure:* The target has the Prone condition, the target is pushed up to 10 feet straight away
> from **the bulwark.**

**After — 2014:**
> *Trigger:* … *Response—*The triggering creature must make a DC 17 Strength saving throw. On a
> failed save, the target is knocked prone, the target is pushed up to 10 feet straight away from
> **the bulwark.**

Both end at "…straight away from the bulwark." Read off the finished sheet, not the trace.

## 2. The pass that produced the fragment

`success-no-effect`, in `format-2024/generate.mjs`. The arm was

    The \w+ is not [A-Z]\w+

under a rule-wide `i` flag, so `[A-Z]` matched any letter and the arm matched a **prefix** of a
longer sentence: "The creature is not knocked" out of "The creature is not knocked **prone and is
not pushed.**" The trailing `\.` then had nothing to match at that point, the pass cut the prefix,
and "Prone and is not pushed." was left standing as its own sentence.

**Yes, it could cut into other sentences the same way** — that is the class of the fault, not this
one row: any success sentence opening "The <noun> is not <word>" and continuing past that word.

It now takes `The \w+ is not [^.]*\.` — through the full stop — **and**, per your amendment, drops
the sentence only when every clause in it negates. Measured on your four:

| success sentence | before today | now |
|---|---|---|
| "The creature is not knocked prone and is not pushed." | removed | **removed** |
| "The target is not Frightened but takes half damage." | removed | **kept** |
| "The target is not Restrained, and it is immune to this for 24 hours." | removed | **kept** |
| "The creature is immune to this effect for the next hour." | kept | **kept** |

The check splits the sentence at its clause joins and asks of each clause whether it denies
something — the word "not", a contracted "n't", an opening "No". That is the sentence's grammar;
nothing in it decides what a clause is *about*, so it is not a list of meanings to match.

## 3. "from Bulwark"

`inlineGuessRef()`, in the Reaction's movement clause in `reskin/generate.mjs`. The guess is the
short form used by rows written **before** the name's form is settled; the comment beside
`settledInline()` already records this exact fault for the Rimebound Troll's "pulled 10 feet
straight toward Troll" and prescribes the replacement. One line, same place. **Fixed.**

**And measured, because I nearly reported it as inert.** `inlineResolved` is assigned at line 5435
and the Reaction's save is assembled at 4678 — so by line order the fix looked dead. Line order is
not call order: that function runs after the name settles. Reverting the one word to
`inlineGuessRef()` and replaying s25 puts `straight away from Bulwark.` back on the sheet.

The save path a few lines above still calls `inlineGuessRef()`. Out of scope here; flagging it
rather than widening the change.

## 4. Every success sentence on the forty's seat-written rows

All six are on **Reactions**. No seat-written Action save carries one.

| sheet | row | the success sentence | now |
|---|---|---|---|
| s11 | Briar Blood | "The creature is not Splattered." | dropped (every clause negates) |
| s13 | Vented Armoury | "No effect." | dropped |
| s17 | Sulfurous Reek | "The creature is immune to this effect for the next hour." | **kept** |
| s23 | Hold the Wall | "The creature can enter the space, though Vashka's own space still counts as difficult terrain while he stands." | **kept** |
| s25 | Oathkeeper's Backhand | "The creature is not knocked prone and is not pushed." | dropped (every clause negates) |
| s33 | Read the Overextension | "The creature keeps its footing." | kept |

s11, s13, s25 and s33 are unchanged from before this round: the first three were already being
dropped, and s33's never matched the arm. Only s25's was being dropped **wrongly**, as a fragment.

### s17 and s23, word for word, unchanged

**s17 Pit Fiend — Sulfurous Reek:**
> *Trigger:* The pit fiend takes damage from a melee attack. *Response—Constitution Saving Throw:*
> DC 21, the triggering creature. *Failure:* The target has the Poisoned condition until the end of
> its next turn. ***Success:* The creature is immune to this effect for the next hour.**

**s23 Vashka the Red — Hold the Wall:**
> *Trigger:* A creature enters Vashka's space or an ally's space within his reach, or tries to move
> through him. *Response—Strength Saving Throw:* DC 15, the triggering creature. *Failure:* The
> target is pushed up to 5 feet straight away from Vashka. ***Success:* The creature can enter the
> space, though Vashka's own space still counts as difficult terrain while he stands.**

Both sheets reproduced byte-identically in strict replay.

## 5. The Reaction guard on the widen rung — removed, with its test

Not shown to matter, so gone. Removing it turns **no** test red, and I could not build a case where
a Reaction reaches that rung and gains damage; something above already stops it. My claim last round
that "the rung let a Reaction through" was read off the condition, not measured. Guard and test
deleted together, with the reason written where the test was.

## 6. The tests in `half-a-hit-not-a-cone.spec.js`, each with the change that turns it red

| test | the change that turns it red | measured |
|---|---|---|
| half a hit added | rung condition `&& false` | red |
| the trace line | rung condition `&& false` | red |
| the N4 mark | rung condition `&& false` | red |
| a trait is untouched | drop `section !== 'Traits'` | red |
| nothing added with no hit type | `&& hitType` → `&& true` | red |
| `attackDamageTypeOf`, first type | helper stubbed to `null` | red |
| `attackDamageTypeOf`, null case | helper stubbed to `null` | red |

Twelve became seven. **Deleted, each green when its own subject was taken out:** "a Reaction gains
no damage" (guard removed), "still targets one creature, and is not a cone" and "adds no Success
clause" (both green with the rung switched off entirely — true whether or not the rung runs), "a row
that already deals damage" (green without `!v.hasDamage`), "a row that is already an area" (green
without `!area`).

**Added — the pipeline test the handoff asked for.** A creature through `generateReskin`, one soft
save beside a real attack, read off the finished sheet:

> Wrongfoot: *Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 16 (3d10)
> Bludgeoning damage, and the target has the Prone condition.

The damage type is read off the sheet's own attack row rather than hardcoded. Red with the rung off.

**And the three from your amendment**, in `a-reaction-keeps-a-rule.spec.js` (renamed; the old
`a-reaction-prints-no-success.spec.js` is deleted, since it passed with the fix it named reverted):

| test | red when |
|---|---|
| the Bulwark's success sentence through `generateReskin` → no fragment, ends on the failure clause | the pattern fix is reverted (3 of 8 red) |
| the Pit Fiend's immunity sentence through `generateReskin` → the immunity is still there | the suppression is put back (1 of 8 red) |
| the four sentences through `applyCorrections` | the clause check is removed (2 of 8 red) |

## 7. Last round's table, corrected from the trace lines

The previous report said all four widened rows "clear their floors". **None does**, and two hits
were wrong. Off the `value check:` lines:

| sheet | row | EV after half a hit | floor | clears? | the hit it halves |
|---|---|---|---|---|---|
| s02 | Muck-Lunge | 2.5 | 3.1 | **no — still under** | 6 |
| s06 | Scree Snare | 7.3 | 8.8 | **no — still under** | 17 |
| s25 | Iron Advance | 10.5 | 12.5 | **no — still under** | 24 |
| s29 | The Last Note Is For You | 19.4 | 23.4 | **no — still under** | 45 |

Each trace ends "still under — needs a condition from the worth-an-attack list (logged)". All four
sit at about four fifths of their floor and are **kept** by the 23 November reading, which is what
was asked for. The sheets were right and the report was wrong.

## 8. Every sheet that differs from `BLOCKS-the-forty-2026-11-25.md`

From a block-by-block comparison of the `### Block` sections (raw diff is useless — `elapsed`
differs every run):

    old blocks parsed: 40   new sheets: 38
    in the old file only: 22-goblin-boss, 36-sarnoth   (skipped, not replayable)
    identical: 37   changed: 1

**s25 Oathbound Bulwark, and nothing else.** The one changed line:

    - …straight away from the bulwark. Prone and is not pushed.
    + …straight away from the bulwark.

## 9. Anything a change made worse

Nothing I can find on a real sheet. 37 of 38 blocks are byte-identical, so every finding on them is
pre-existing by construction. On s25 the only textual change is the fragment's removal.

The one thing worth naming, and it is **not** new: the Bulwark's Reaction FAILs
`adjudicable-target` in the lint, alongside the same FAIL on s11 Briar Blood, s13 Vented Armoury,
s17 Sulfurous Reek and s23 Hold the Wall — "a save whose targets are neither a count nor an area".
All five are seat-written Reactions whose save target is "the triggering creature". Four of the five
are on sheets that reproduced byte-identically, and the target clause on s25 is unchanged, so no
part of this round caused it. It is a standing gap between how a Reaction names its target and what
the adjudicability gate counts — worth a round of its own, not a fix smuggled into this one.

Yesterday's suppression **would** have made two sheets worse, which is what your amendment caught:
s17 would have lost its hour-long immunity and s23 its difficult-terrain clause. Neither did.

## 10. The lint, the suite, the replay

**Lint** — `scripts/check-run.mjs`, written to `CHECK-sweep-2026-11-25T16-47-55.md`. Columns:
block · CR · ed · donor · derivation · bands · structure · gates · headerBody · edition · donor ·
adjudicability · reader · class · verdict · coverage · concept.

- **6 blocks with a FAIL of 38** — s12 Vampire, s15 Purple Worm, s17 Pit Fiend, s23 Vashka the Red,
  s25 Oathbound Bulwark (all `adjudicable-target`), s29 Swarm of Funeral Bells (`dangling-ref`).
- 1 audit finding dismissed on print rows across 37 sheets carrying the record.
- Dropped 22 of 54 GM clauses — coverage 59%; concept share 82% (174/211 rows).
- 10 concepts whose extraction drifted from the frozen list, every one at the same count
  ("re-marked kind/head").

**Suite** — `npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent`, **exit 0**:
285 suites passed, 6051 passed, 26 skipped, 6077 total, 6 snapshots.

**Replay** — strict, against `baseline-2026-11-25`:
- before the re-record: **1 of 38 did NOT reproduce** (s25, the audit call, line 175 of 288), 2 skipped — exit 3.
- after: **38 of 38 reproduced EXACTLY, 2 skipped** — exit 0.

The re-record kept every answer before the call that missed: 8 of the 10 calls are byte-identical to
the old tape, the input is unchanged, and the first difference is call index 8, the audit.

## 11. The commits — five

1. `9a15891` statblock: the Bulwark's Reaction ends where its sentence ends
2. `ad72ead` statblock: a test that cannot fail is not a test
3. `3484c78` statblock: the round's report — stopped at the replay, three sheets missed
4. (this commit's predecessor) statblock: a Reaction keeps a success sentence that carries a rule
5. `aba622f` statblock: s25 re-recorded from the audit call that missed

Plus this round's evidence commit. Nothing deleted from `scripts/smoke-evidence`: the previous
forty is named in your handoff, so it stays, and no CHECK file loses its blocks file.

## One correction to my own last report

I wrote that the suppression of a Reaction's success sentence was "belt and braces" and that the
pattern did the work. That was right about the pattern and wrong about the suppression being
harmless: it dropped two real rules. Your measurement — one line back, s17 and s23 reproducing
exactly — is the one I should have run before reporting it as a finished fix.
