# Retire the measurement layer's string matching

**Trigger:** any work on `imposedConditions`, the coverage credit rule, or a new
pattern added to read a row's prose. Read before extending either.

**Owner's question, 2026-10-22: "why are we still doing string matches".** The
answer was that each site had a local justification and nobody added them up. Two
are load-bearing and decide MEANING, which is what
[`llm-metadata-over-regex.md`](./llm-metadata-over-regex.md) forbids.

## The two that must go

### 1. `imposedConditions` — a prose reader three gates depend on

It decides "does this row impose Grappled" by pattern-matching English, and it
feeds `duplicate-mechanic`, `condition-duration`, the A2 save-stat choice and the
record reconcile. On 2026-10-22 it failed on **"is also grappled by it"** — an
inserted adverb — and the reflex fix was another pattern. That pattern then
collided with `grapple-no-escape`, which deliberately EXCLUDES `grappled by`
(`(?!\s+by\b)`) because "grappled by X" usually says who holds the target. **Two
regexes disagreeing about what English means.**

### 2. The coverage credit is WORD OVERLAP

`overlaps()` asks whether any word of a clause appears in a row's recorded clause
string, and `words()` STEMS — which is how "wound" once credited "cracks open
when wounded" to a row that moves and attacks (the note at `checker.mjs:828`).
The critic's one-credit-rule fixed WHICH PATHS may credit; the match itself is
still fuzzy.

## Both measured on `sweep-2026-10-22T03-29-45`

### `imposes` is already 89% declared

| source | rows |
|---|---|
| rows whose TEXT reads a condition | **47** |
| already carry a record | **28** |
| print rows (print's own published text) | **14** |
| **no declared source at all** | **5** |

The 5 are specific and small: `Scree Entombment` (Prone), `Killing Cold` (Prone),
`Molten Exhalation` (Prone), `Drowning Song` (Deafened), `Vessel Devouring`
(Grappled). **Every one is a condition a RIDER added**, and the rider weld stamps
the host with the same 2024-only regex that broke the reconcile:

```js
const wc = /has the (\w+) condition/.exec(riderText)?.[1] ?? (actionT.row?.imposes ?? null);
```

So the gap is not "prose is hard" — it is one more copy of the same bug.

### NOTHING depends on the fuzzy clause match

| how a row's clause string relates to the clause | rows |
|---|---|
| EXACT match | **18** |
| substring either way (the seat cut the clause) | **12** |
| **word-overlap only** | **0** |

**An id-based link preserves all 30 credits and loses none.** The stemming risk is
carried for zero present benefit. The 12 substrings are the critic's own seat
surgery finding ("archlich" cut to "arch"); hand seats the clause verbatim and all
30 become exact.

## The proposal, in order

1. **Stamp `imposes` where a rider adds a condition.** Use `imposedConditions` on
   the RIDER TEXT (it handles both printings) instead of the 2024-only regex, or
   better, carry the template's declared `imposes` through the weld. Closes 5 of
   5 gaps.
2. **Make `imposedConditions` a traced fallback.** Every firing logs that no record
   was available. When a forty reports zero firings on engine-written rows, the
   reader survives only for print's own published text — a boundary read of a
   closed fact, which is sanctioned.
3. **Give clauses ids and link rows by id.** `generation.clauses` gains a stable
   id; a row records `clauseId` instead of a copy of the text; `overlaps()` becomes
   set membership. Behaviour-preserving by the measurement above, and it deletes
   the stemming risk. Keep `clause` text alongside for traces.
4. **Hand seats the clause verbatim** (critic's item 3) so the substring cases
   become exact and the id is always resolvable.

## What stays, and why

- **Validating a call's answer**: checking an expression quote appears verbatim in
  the row text. This is explicitly the engine's half of the split — the call
  judges, the engine validates.
- **Reading print's own published furniture** once at a boundary: a gate in a
  donor's name, a condition in print's own row text. Closed facts, read once,
  converted to a field — the pattern that worked for `gateOf`.

## Why this is bigger than the critic's item 1, and worth it anyway

Item 1 made the credit rule honest about WHICH path credited. This retires the
guessing underneath it. The precedent is `gate`: the fact existed, was deleted one
line before the sheet, and five consumers re-read a name to recover it. `imposes`
is the same story at 25 of 260 rows — and the fix is to complete the record, not
to read prose better.

## Landed 2026-10-22 — steps 1-3

**Gate:** Jest 117 suites / 3759 passing, build clean. Coverage on the saved forty
is **unchanged at 67% (18 of 55)** — the id link falls back to the old match on
blocks that predate ids, so this is behaviour-preserving by construction and the
measurement above says it stays so once ids are present.

### Step 1-2: the record is completed once, and every firing is traced

`imposedConditions` now runs **once**, in a late pass, on text the engine itself
wrote, and the result becomes the FIELD every consumer reads — the same move that
retired seven name-readers for `gate`. It skips print rows (print's own published
text stays a boundary read) and rows that already carry a record.

```
record completed: "X" imposes Prone by its own text and carried no record —
  the fill site that wrote it owes this field (template=chassis)
```

**The trace IS the instrument for step 2.** Its count on the next forty is how much
the fill sites still owe; the measurement predicts **5** (the chassis
`{condition_minor}` fills and the rider weld). When a forty reports none, the
reader survives only for print.

The rider weld and the chassis fill were NOT edited — the fill site for
`{condition_minor}` on chassis rows could not be located quickly, and guessing at
it would have been worse than one traced boundary read. The trace names the owing
site on every firing, so the next run points straight at them.

### Step 3: coverage credits by identity

- `groundedClauses` gives every clause a stable `id` — a hash of its text, so the
  same words give the same id on every run and it survives the saved JSON.
- **One** resolution pass stamps `row.clauseId`, after every pass that can rewrite
  a row, rather than editing the seven sites that assign `row.clause`. Exact match
  first, then substring (the seat surgery), and an unresolvable clause is traced:
  `clause unresolved: "X" carries "...", which matches no clause on the sheet`.
- The checker credits by `clauseId` when either side has one; `overlaps()` remains
  **only** as a declared fallback for pre-id blocks, and a firing on a fresh run
  means the resolve pass failed.

A test now pins the invariant: every clause carries an `id`, and the same words
give the same id.

### Still owed

- **Step 4** — hand seats the clause VERBATIM (the critic's item 3). Until then the
  substring branch carries 12 of 30 links and traces each one.
- The two `grappled by it` records (Owlbear's Adhesive, Clotting Scree) still need
  the owner's ruling; the completion pass does not rescue them, because the reader
  genuinely does not read that form as an application.
- A fresh forty is what proves the id link in anger and empties the
  `record completed:` trace.
