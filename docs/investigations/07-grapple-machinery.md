# Task 7: Incomplete Grapple/Restrain Machinery — Diff + Injection Feasibility

## The three-way diff

**Correct — fixture 14, Scuttling Jellypack `Engulf (Recharge 5-6)`
(fixtures/14-scuttling-jellypack.md:28):** Grappled **with `(escape DC 14)`**,
capacity limit ("only one creature Grappled in this way at a time"), mover
restriction ("can't move while grappling"), ongoing damage keyed to the
grappler's turns. Every piece of state has an exit and a bound. This is the
official Engulf shape.

**Broken — fixture 07, Skittering Hive `Coiling Grasp`
(fixtures/07-skittering-hive.md:31):** Restrained at 30-foot range with **no
escape DC, no repeat save, no duration, no breakable binding** — plus 22
ongoing damage per target turn. The condition is mechanically permanent;
there is literally no rule by which the target ever stops being Restrained.
(It is also spammable via a Legendary Action, compounding Task 4's finding,
and carries a "Success: None." wart.)

**Half-broken — fixture 11, Whisper Shifter `Buried Grasp`
(fixtures/11-whisper-shifter.md:30):** bounded ("otherwise the condition ends
at the end of the whisper shifter's next turn") but sustainable forever "by
using a bonus action" with **no target counterplay**. The phrase "maintain
the Restrained condition" has **zero official precedent** — the corpus's only
"maintain" usages are Concentration (Darkmantle, Black Dragons). Homebrew
idiom, homebrew hole.

## The official convention is absolute: 52/52

Scanning all 329 SRD 5.2.1 blocks: 52 entries apply Grappled or Restrained.
47 carry in-clause exit machinery — `escape DC N`, a breakable binding
(AC/HP), a repeat-save clause, or a fixed duration. The remaining 5
(Gelatinous Cube Engulf, Kraken/Purple Worm/Remorhaz/Tarrasque Swallow) use
the interior-escape phrasing instead: "An engulfed target can try to escape
by taking an action to make a DC N Strength (Athletics) check" or death/
regurgitation exits. **No official application of Grappled or Restrained
lacks counterplay.** Note also the 2024 rules make an escape DC *required
data* for Grappled — the condition's escape action is defined against it, so
a Grappled application without one isn't just unofficial, it's unadjudicable.

## Detection: a string-parsing job (per Task 3, no format change)

Application anchor: `has the (Grappled|Restrained) condition`. Exit-pattern
set (all must be absent to flag):

```
/escape DC \d+/i
/AC \d+[^.]*(?:HP|Hit Points) \d+/i                  (breakable binding)
/repeats? the sav|ending the effect on a success/i    (repeat save)
/until the (?:end|start) of|for 1 minute/i            (fixed duration)
/escape by taking an action|if the \w+ dies/i         (interior escape)
```

Second tier for the fixture-11 hole: `maintain the (?:Grappled|Restrained)`
present AND no escape-DC/repeat-save/breakable → flag even though a duration
clause exists (the duration is voided by the maintenance option).

Fixture verdicts under this detector: 14 passes, 07 flags (no exit at all),
11 flags (sustained hold without counterplay). Corpus: 52/52 official
applications pass by construction — and the rule can additionally be
chassis-gated like `bps-resistance` for belt-and-suspenders.

## Standard-clause injection: FEASIBLE, deterministic, two variants

Both are `applyCorrections`-style string surgery — no LLM fix call:

1. **Grappled without escape DC** → rewrite `has the Grappled condition` to
   `has the Grappled condition (escape DC ${Math.max(8, save_dc - 2)})`.
   Same value the existing `escape-dc` correction lands on; the rider syntax
   is the official one, so the sentence stays grammatical wherever it sits.
2. **Restrained (or maintained hold) without counterplay** → inject the
   official repeat-save sentence: `The target repeats the save at the end of
   each of its turns, ending the effect on a success.` Placement: insert
   before the `*Success:*` clause if present, else append to the entry.
   (Escape DCs are wrong for non-physical restraints — a 30-foot psychic
   grip has nothing to Athletics out of; the repeat save is the official
   pattern for those, e.g. Mummy Lord.)

Residual injection risks: variant 2's sentence can double an existing
bespoke exit the regexes failed to recognize (mitigation: the exit-pattern
set IS the gate — injection only fires when none matched); a repeat save
every turn makes the hold strictly weaker than the author perhaps intended
(acceptable: never-fail generation prefers a fair wart over a dead
mechanic); and novel phrasings of counterplay ("can wriggle free…") would
still trigger injection — zero instances in the 16 fixtures, low exposure
given the prompt skeletons.

## Recommendation (not implemented — brief marks Task 7 investigate-only)

Promote as a correctable lint rule + deterministic injectors: `grapple-exit`
with the two variants above, plus a prompt line ("any Grappled condition
must carry `(escape DC N)`; any Restrained effect must include a repeat
save, duration, or breakable binding"). The Task 1 report should note that
Coiling Grasp's legendary spam makes exit machinery MORE load-bearing on
legendary blocks.
