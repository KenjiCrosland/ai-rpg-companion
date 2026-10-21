# Delete the condition word rule

**Trigger:** any fix that seems to need `imposedCondition`'s text grammar
widened, or any change to `imposes` / the `duplicate-mechanic` gate.

## What is already done (2026-10-21)

`imposedCondition` was documented as a fallback but carried 79% of all
imposition readings, so a regex was deciding what most rows meant. The writers
now record instead:

- `templates.mjs` — `IMPOSES_BY_TEMPLATE`, a hand-verified declaration of what
  each template's frames impose, stamped at render. The seed branch also carries
  the drawn library card's own tag, which it had been dropping.
- `generate.mjs` — the grapple weld records `Grappled`; trait and reaction rows
  record the condition the authoring call now answers (`imposes`, validated
  against the closed `CONDITIONS` list). Attack `rider` and save `condition`
  already recorded. All FIVE library-row construction sites now carry the
  record; three of them were dropping it, which is how a declared `hook-drag`
  row still shipped without one.
- `author.mjs` — one `imposedConditions` grammar, with the checker's and the
  engine's private copies deleted; a record may name several conditions.

## What remains

### 1. Delete the `that|which|who` alternation

`PRECONDITION` in `author.mjs` carries `\b(?:that|which|who)\s*$` to stop a
relative clause ("one creature within 5 ft **that has** the Prone condition")
reading as an imposition. It is a word rule and should go once records cover the
rows we build. Re-measure first: count imposing rows carrying a record vs. the
grammar on a fresh forty (38% before this work; 61% on the condition-heavy twelve after the first half of it, with the
remaining misses almost all print-path rows — see item 2). When the engine-built
rows all carry records, delete the alternation and confirm
`imposes-grammar.spec.js` still passes.

### 2. The `if` hole, for rows we did NOT write

`PRECONDITION` also excludes any `if` before the clause, which is wrong roughly
half the time and cannot be fixed textually:

- `if` means IMPOSES: "**If** the target is Medium or smaller, it has the
  Grappled condition" (snatch, bolt-restrain, charge, shield-bash, thrown-burst,
  execute)
- `if` means REQUIRES: "It can't use this trait **if** it has the Incapacitated
  condition" (evasion)

Identical grammar, opposite meaning. Those templates now declare their condition
so the engine path is correct, but the grammar still runs on rows from OUTSIDE
the engine — served SRD print rows, 2014 conversions, imported sheets. Measured
before the declarations landed: 53 rows carried a size- or HP-gated imposition
the reader missed, and 4 sheets reached three once counted — real
`duplicate-mechanic` triples the gate was missing.

If this needs fixing for the print corpus, tag the corpus the way donors are
tagged (a one-time pass over fixed text, audited by the spec) rather than adding
another alternation.

### 3. Do not derive the template map from frame text

It was tried and rejected. A derivation marks `shell-withdraw`'s SELF-imposed
Prone as an affliction on a target, misses every `if`-gated imposition, and reads
`condition-payoff`'s `{consumed_condition}` target filter as an imposition. The
map is hand-declared and the spec's drift guard forces a decision on any new
condition-bearing frame.

## Guardrails

`imposes-grammar.spec.js` (24 tests): both idioms, record-over-grammar
precedence, the gate's two-vs-three boundary, an audit that no stored row claims
an imposition its text does not make, and the drift guard above. The audit is
what caught four false `imposes: Prone` tags on print's Trample.


## A note on scoping the scan

The declaration map was built by scanning every template's frame text for
`has the X condition`. That scan was too narrow and missed two real
impositions — `swallow`'s COMPOUND idiom ("has the Blinded and Restrained
conditionS") and `pull-through`'s bare "the target emerges Prone", with no
condition noun at all. Both are now declared.

The lesson is in the spec: **the drift guard's scan is deliberately wider than
the one that built the map**, and matches the compound form, the bare
`is/becomes/emerges <condition>` form, and `is also X by it`. A guard that
repeats the builder's blind spot guards nothing. Pairs that name a condition
without imposing it are listed in `NOT_IMPOSED` with a per-pair reason.
