# Task 6: CR Distribution Skew — IMPLEMENTED

## Correction to the brief's premise

**The LLM does not choose CR.** Blank-form CR was a client-side **uniform 1–30
roll**, in two places:

- Engine path: `StatblockGenerator.vue:971` — `const crInput =
  selectedChallengeRating.value || String(Math.floor(Math.random() * 30) + 1);`
- Legacy two-part path (flag-gated): `StatblockGenerator.vue:905` — same
  expression.

The observed corpus distribution confirms uniform, not model preference:
median 15 vs uniform's expected 15.5; 3/16 at CR ≤ 8 vs uniform's expected
~4.3. The CR is resolved *before* any LLM call (the chassis math needs it), so
this was always a chassis-side knob — the brief's proposed fix location is
exactly where the code already sits.

## Root cause

Uniform sampling over 1–30 at the two call sites above. (Note also: the
uniform roll could never produce fractional CRs at all — CR 1/4–1/2 monsters,
the most-played band, had **zero** probability.)

## Fix (implemented)

`rollRandomCR()` in `format-2024/concept-seeds.mjs` — weighted band table,
returning the CR key string `crInput` already consumes:

| Band | Weight |
|---|---|
| 1/4–4 | 38% |
| 5–8 | 30% |
| 9–12 | 17% |
| 13–20 | 10% |
| 21–30 | 5% |

68% of weight at CR ≤ 8; fractional CRs now reachable. Both call sites
replaced. Tests: band-boundary probes with mocked `Math.random` (each boundary
maps to the correct band, every output is a valid CR key), plus an unmocked
4000-roll statistical sanity check (>58% at CR ≤ 8, <12% at CR ≥ 21).

## Blast radius

Blank-form generations only. Any user-selected CR bypasses the roll
(`selectedChallengeRating.value ||`). Regeneration restores the saved CR via
`selectMonster`, untouched. Flow-spec tests set CR explicitly, unaffected.
The legacy pipeline inherits the same weighting via the shared helper.

## Residual risk (what this cannot catch)

- The weights are an editorial guess at "actual-play demand," not measured
  from user data. If cros.land's users skew differently (e.g. premium users
  farm high-CR bosses), the table needs retuning — it is one literal in
  `concept-seeds.mjs`.
- Users who *enjoyed* uniform high-CR randomness lose it silently; there is
  no "wild" toggle.
- The distribution is per-roll independent: a user can still see three CR 2s
  in a row (no anti-streak memory).

## Probe verdict: how painful are chassis-side seeding changes?

**Trivial.** The random path already funnels through one string
(`crInput`), the seed system (`concept-seeds.mjs`) is the natural home for
roll helpers, and nothing downstream cares where the CR came from. Adding a
weighted dimension took one helper, two one-line call-site edits, and no
changes to the engine, prompts, or lint. Future seeding work (e.g. weighted
archetype or size rolls) should assume the same cost.
