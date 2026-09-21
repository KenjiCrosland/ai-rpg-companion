# Trait-weight cross-check for engine-generated statblocks

## Trigger

A generated block ships with an unpriced defensive/offensive multiplier in
trait text (blanket mitigation, heavy regeneration, big always-on auras), or
any session hardening the statblock lint layer.

## Problem

The engine fixes every number, and lint bands them — but the mechanical
WEIGHT of trait text is LLM-chosen and mostly invisible to regex rules.
First live sighting (2026-07-18): a passive "Uncanny Dodge" that halved all
incoming damage — effectively 2× HP on a budgeted chassis. That exact
phrasing family is now a corpus-calibrated `trait-mitigation` reject in
`format-2024/lint.mjs`, and prompt rules in both editions forbid blanket
mitigation. The general class (regeneration rates, aura damage, at-will
control riders) remains open.

## Approach

For the 2014 edition, the backstop already exists: `src/util/calculateCR.js`
+ `determine-features-and-bonuses.mjs` price features into effective HP and
damage, and consume exactly the legacy model shape `toLegacyModel()` emits.
After conversion, run `calculateCR(legacy)` and compare with the target CR:

- |computed − target| ≤ 1 → ship.
- Larger drift → treat as a reject finding (regenerate with the drift quoted
  back: "your traits push effective CR to 13 against a target of 10").

For the 2024 edition there is no equivalent calculator; either port the
effective-HP/damage adjustments to the sections model, or accept the
regex-family coverage as sufficient there (2024's terse-trait register makes
smuggling rarer — 13 live generations produced zero cases).

Calibrate thresholds against SRD blocks run through the same path before
enforcing (the calculator is heuristic; official monsters should mostly land
within ±1–2 of their listed CR — measure first).
