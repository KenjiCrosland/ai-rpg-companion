# Task 3: Orphaned Mechanics — Output Structure Analysis

## What structure the LLM output actually has

The generation schema (`format-2024/generate.mjs`, the `schema` literals in
`buildGenerationPrompt` and `buildGenerationPrompt2014`) is:

```
sections: { <SectionName>: [ { name: string, text: string, slot?: string } ] }
```

That is: **parsed objects at the entry level, freeform prose below it.** The
only typed field beyond `name` is the optional `slot` tag (the slot-plan
protocol — it identifies *which structural obligation* an entry fills, not
*how the entry works*). There are no area, trigger, timing, usage, or target
fields. Everything mechanical lives inside `text` as prose, constrained only
by the prompt's phrasing skeletons and the lint's regexes over that prose.

One relevant partial structure DOES exist: the 2024 save skeleton mandates
`*<Ability> Saving Throw*: DC n, <targeting clause>. *Failure:* ...` — so the
targeting clause is a *positionally* identifiable prose span even though it
isn't a field. Several detections below lean on that.

## The three instances

### 1. Sporegnash / Spore Drift (fixtures/16-sporegnash.md:24)

> `Spore Drift. Constitution Saving Throw: DC 24, each creature. Failure: ...`

The targeting clause is a bare **"each creature"** — no area, no range, no
trigger, no timing. Line 36 (legendary) then "extends" it to a 10-foot
Emanation, implying a base area that was never written.

**Detection today: FEASIBLE (narrow).** The save skeleton makes this a
recognizable malformation: a targeting clause matching
`DC \d+, each creature[.,]` with no `within N feet` / area term
(`Cone|Line|Sphere|Emanation|radius`) / trigger phrase
(`that (starts its turn|enters|moves)`) in the same clause. This is a lint
rule over existing prose — no format change. Corpus calibration required
before shipping (official blocks phrase auras as "each creature in a X-foot
Emanation" or "that starts its turn within", so zero-FP is plausible but
must be verified).

**Impossible without format change:** knowing the *intended* area (the fix
call can demand "add an area or trigger" but must invent the value); and the
cross-entry implication (the legendary's "extends" clause pointing at the
missing base) — that is semantic reference resolution over prose.

### 2. Silent Shard / Hush Horror (fixtures/03-silent-shard.md:31–32)

> `Bonus Actions` / `Hush Horror. Dexterity Saving Throw: DC 25, each
> creature within 5 feet of the space it left. Failure: 22 (4d10) Slashing
> damage.`

References "the space it left" but the entry contains no movement, and no
other Bonus Action grants any. (The block DOES have movement elsewhere —
the legendary `Lull Shudder` teleport at line 36 — which is exactly why
per-entry detection alone would under- and over-fire.)

**Detection today: FEASIBLE as a cross-entry heuristic.** Flag referent
phrases (`the space it (left|vacated)`) in entries whose own text lacks a
movement verb (`moves|teleports|shifts|withdraws`); optionally soften when
*any* entry in the block has one. The soft version misses this exact case
(Lull Shudder exists but is a different action — using them together costs a
legendary use, which is a coherent-but-unstated dependency); the strict
per-entry version catches it but would also flag legitimately paired
mechanics. This is the fundamental limit of prose: the *dependency between
entries* is not representable.

### 3. Whisper Shifter / Sinkhole Snap (fixtures/11-whisper-shifter.md:24)

> `Sinkhole Snap. Dexterity Saving Throw: DC 23, each creature within 10
> feet of its arrival point. Failure: ...`

A **trait** keyed to "its arrival point" — no entry defines an
arrival/emergence mechanic. However, the Speed line
(fixtures/11-whisper-shifter.md:6) reads `Speed 30 ft., Burrow 20 ft., Fly
40 ft.` — the burrow speed *weakly* grounds "arrival point" (a burrower
surfacing), so this instance is **adjudicable, not fully orphaned**. It is
the mildest of the three.

**Detection today: FEASIBLE as an enumerated-phrase heuristic.** Orphan
referent nouns (`arrival point`, `point of emergence`, `where it surfaces`)
with no block-wide antecedent keyword (`burrow|teleport|emerges|appears in an
unoccupied space`). The block-wide check must include the Speed line —
precisely because of this fixture: a detector limited to `sections` would
flag Sinkhole Snap, while one that reads `monster.speed` correctly passes it.
`lintStatblock` already receives the whole monster, so this costs nothing.

## Summary: what's possible at each level

| Detection | Possible on current structure? | Mechanism |
|---|---|---|
| Bare "each creature" targeting (no area/trigger) | **Yes** | Lint regex on the save-skeleton targeting clause |
| Referent phrase without antecedent (enumerated phrases) | **Yes, as heuristic** | Cross-entry + speed-line keyword search |
| General "references machinery that doesn't exist" | **No** | Requires semantic reference resolution |
| Cross-entry dependency validation ("extends" a base) | **No** | Same |

## Minimum structural addition that changes the picture

Not a schema redesign: **two optional string fields on save-effect entries** —
`area` (e.g. `"10-foot Emanation"` / `"one creature within 60 feet"`) and
`timing` (e.g. `"start of each of the creature's turns"` / `"when it emerges"`).
The prompt already forces the model to *decide* these to write the prose; the
addition only asks it to *also state them as data*. With those two fields:

- Instance 1 becomes a hard check: save-effect entry with empty `area` AND
  empty `timing` → reject.
- Instances 2–3 become tractable: `timing` values referencing movement/arrival
  can be validated against a small movement-mechanic ledger.
- Assembly must strip the fields before render (they're metadata, like `slot`
  — the precedent already exists and `slot` proves the model complies with
  per-entry metadata).

Cost: schema literal + prompt line + assembly strip + lint consumption.
Residual risk even then: the model can state `area` data that contradicts its
own prose (data-vs-prose divergence is a new defect class this would
introduce), and dependency semantics ("extends", "while X is active") remain
out of reach.

## Recommended narrowest path (not implemented — investigation only)

1. Ship the bare-targeting lint rule (no format change, corpus-calibrate
   first) — catches the Spore Drift class, which is the most table-breaking
   of the three (a DM cannot adjudicate an aura with no area at all).
2. Defer the referent-phrase heuristics until the failure log shows the class
   recurring — enumerated-phrase lists rot, and both observed instances also
   produce *playable* confusion (a DM can improvise an arrival point) rather
   than dead mechanics.
3. Hold the `area`/`timing` field addition as the escalation path; reference
   this report from Tasks 4 and 7, both of which turn out to be answerable
   WITHOUT it (see those reports — usage frequency and grapple clauses are
   prose-parseable).
