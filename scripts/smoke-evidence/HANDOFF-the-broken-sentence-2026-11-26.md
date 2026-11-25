# A broken sentence on the Oathbound Bulwark — report

Stopped at step 4 as the order requires: the strict replay missed **three** sheets, not s25 alone.
Nothing re-recorded, no blocks file, no lint. Two commits are on the branch and ready to push.

## 7. Last round's table, corrected — read off the trace lines

The previous report said all four widened rows "clear their floors". **None does.** The hit column
was wrong too. Read off the `value check:` trace lines:

| sheet | row | EV after half a hit | floor | clears? | the hit it halves |
|---|---|---|---|---|---|
| s04 | the soft row | 2.5 | 3.1 | **no — still under** | 6 |
| s14 | the soft row | 7.3 | 8.8 | **no — still under** | 17 |
| s26 | the soft row | 10.5 | 12.5 | **no — still under** | 24 |
| s31 | the soft row | 19.4 | 23.4 | **no — still under** | 45 |

What the rung does is lift the row and log what it did; the row is then **kept under the floor**
("the ladder could not lift it and nothing stands in, so the row the model wrote stays as written").
That is the behaviour the owner ruled for, and it is what shipped. The claim that the rows cleared
was invented at the table, not read. Second round running — the standing order now is that no number
reaches a report except off the trace line that produced it.

## 1. s25's Reaction, word for word

**Before, 2024 printing:**
> *Trigger:* A hostile creature moves within 10 feet of the bulwark's ward while the bulwark is
> within 10 feet of that creature. *Response—Strength Saving Throw:* DC 17, the triggering creature.
> *Failure:* The target has the Prone condition, the target is pushed up to 10 feet straight away
> from **Bulwark. Prone and is not pushed.**

**Before, 2014 printing:** the same fragment, with "from Bulwark. Prone and is not pushed."

**After, 2024 printing:**
> … *Failure:* The target has the Prone condition, the target is pushed up to 10 feet straight away
> from **the bulwark.**

**After, 2014 printing:**
> Oathkeeper's Backhand (Reaction). Trigger: … The triggering creature must make a DC 17 Strength
> saving throw. On a failed save, the target is knocked prone, the target is pushed up to 10 feet
> straight away from **the bulwark.**

Both end at "…straight away from the bulwark." as ordered.

## 2. The pass that cut the sentence

`success-no-effect`, in `format-2024/generate.mjs` (~line 2047). Its pattern was

    /\s*\*?Success:\*?\s*(?:No effect|No damage|None|The \w+ is not [A-Z]\w+)\./gi

The `i` flag made `[A-Z]` case-insensitive, so `The \w+ is not [A-Z]\w+` matched the **prefix**
"The creature is not knocked" of "The creature is not knocked **prone** and is not pushed." and the
trailing `\.` then matched nothing — so the pass cut the prefix and left "Prone and is not pushed."
standing as its own sentence.

**Could it cut other sentences?** Yes, and that is the class of fault, not this one row: any success
sentence beginning "The <noun> is not <word>" and continuing past that word was cut mid-sentence.
Of the six seat-written success sentences on the forty, two matched that shape. It now takes
`The \w+ is not [^.]*\.` — the whole sentence through its full stop, or nothing.

## 3. "from Bulwark"

`inlineGuessRef()`, called in the Reaction's movement clause in `reskin/generate.mjs` (~4660). The
guess exists for rows written **before** the creature's name form is decided; a Reaction is
assembled long after. The comment beside `settledInline()` (~5286) already records this exact fault
for the Rimebound Troll's "pulled 10 feet straight toward Troll" and prescribes the fix. One line,
same place: `inlineGuessRef()` → `settledInline()`. **Fixed.** The sheet's resolved inline is
"the bulwark", and that is what now prints.

The save path a few lines above still calls `inlineGuessRef()`. Out of this round's scope; flagging
it rather than widening the change.

## 4. Every seat-written success sentence on the forty

All six are on **Reactions**. No seat-written Action save loses anything.

| sheet | row | the success sentence |
|---|---|---|
| s11 | Briar Blood | "The creature is not Splattered." |
| s13 | Vented Armoury | "No effect." |
| s17 | Sulfurous Reek | "The creature is immune to this effect for the next hour." |
| s23 | Hold the Wall | "The creature can enter the space, though Vashka's own space still counts as difficult terrain while he stands." |
| s25 | Oathkeeper's Backhand | "The creature is not knocked prone and is not pushed." |
| s33 | Read the Overextension | "The creature keeps its footing." |

**A cost to report:** s17's and s23's are the only two carrying a real rule rather than restating the
failure in the negative — an immunity window and a terrain clause. Both are now dropped. s23's
Reaction reads clean without it; s17 loses a limiter the row arguably wanted. If that matters, the
answer is a Reaction save that may keep a success, not the blanket suppression ordered here.

## 5. The Reaction guard — removed, with its test

I could not show it mattered, so it is gone. Removing it turns **no** test red, and I could not
build a case where a Reaction reaches the rung and gains damage; something above already stops it.
My claim last round that "the rung let a Reaction through" was read off the condition, not measured.
Guard and test deleted together, with the reason written where the test was.

## 6. The tests that stayed, and what turns each red

Measured, one mutation at a time:

| test | the change that turns it red | result |
|---|---|---|
| half a hit added | rung condition `&& false` | **red** |
| the trace line | rung condition `&& false` | **red** |
| the N4 mark | rung condition `&& false` | **red** |
| a trait is untouched | drop `section !== 'Traits'` | **red** |
| nothing added with no hit type | `&& hitType` → `&& true` | **red** |
| attackDamageTypeOf, first type | helper stubbed to `null` | **red** |
| attackDamageTypeOf, null case | helper stubbed to `null` | **red** |

**Deleted, each green when its own subject was removed:** "a Reaction gains no damage" (guard gone),
"still targets one creature, and is not a cone" and "adds no Success clause" (both green with the
rung switched off entirely — true whether or not the rung runs), "a row that already deals damage"
(green without `!v.hasDamage`), "a row that is already an area" (green without `!area`).

**Added, the pipeline test the handoff asked for:** a creature through `generateReskin`, one soft
save beside a real attack, reading the printed row off the finished sheet:

> Wrongfoot: *Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 16 (3d10)
> Bludgeoning damage, and the target has the Prone condition.

The damage type is read off the sheet's own attack row, not hardcoded. Red with the rung off.

And the Reaction test: through `generateReskin`, a seat-written Reaction whose save carries a success
sentence saying nothing happens → no Success clause, no words from the sentence, ends on its failure
clause. With both fixes reverted it reproduces the shipped defect verbatim:
`"…straight away from Bulwark. Prone and is not pushed."`

**One honest note on that test:** with only the Reaction suppression reverted it still passes, because
the repaired `success-no-effect` pass now removes that sentence cleanly. It is fix 2, not fix 1, that
does the work on s25. Fix 1 is what the order asked for and what stops the sentence being written at
all; it is not what this test proves.

## The suite

`npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent` — **exit code 0**.
285 suites passed, 6047 tests passed, 26 skipped, 6073 total, 6 snapshots.

(The first run exited 1: my deletion script left a broken comment in half-a-hit-not-a-cone and the
suite failed to parse. Repaired and amended into the cleanup commit before the clean run above.)

## 8. The replay — stopped here

`node scripts/smoke-statblock.mjs sweep --replay …/recordings/baseline-2026-11-25` — exit 3.

    REPLAY: 3 of 38 did NOT reproduce, 2 skipped (not replayable)

| sheet | call that missed | where |
|---|---|---|
| s17 Pit Fiend | the audit call (`buildAuditPrompt`) | line 188 of 299 |
| s23 Vashka the Red | the repair call (`buildRepairPrompt`) | line 8 of 51 |
| s25 Oathbound Bulwark | the audit call (`buildAuditPrompt`) | line 175 of 288 |

Skipped as always: s22 (CR auto, rolled locally) and s36 (blank form).

The order says stop and report if anything but s25 misses, so nothing was re-recorded.

**Why three and not one.** All three are sheets whose seat-written Reaction success sentence reached
a prompt. s17's and s23's success sentences (the two carrying real rules, above) are now dropped from
the sheet, so the sheet text handed to the audit and repair prompts changed, and the tape no longer
matches. The other three of the six — s11, s13, s33 — did not miss; their sentences were already
being removed by `success-no-effect` before the prompt was built, so their prompts are unchanged.

That is the ordered change landing exactly where it was aimed. It is not a surprise once the six
are listed — but the handoff predicted s25 alone, and three is not one, so this is a decision for
the owner rather than mine: **re-record s17, s23 and s25 from the calls that missed**, or narrow
fix 1 so a Reaction success that carries a rule is kept.

## The commits — two

- `9a15891` statblock: the Bulwark's Reaction ends where its sentence ends
- `26f1c71` statblock: a test that cannot fail is not a test

Ready to push. Nothing pushed.
