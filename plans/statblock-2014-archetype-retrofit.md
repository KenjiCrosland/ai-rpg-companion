# Retrofit archetype generation onto the 2014 statblock path

## Trigger

Any session that upgrades the 2014 generation flow, or a decision to
deprecate the template-driven 2014 pipeline (`creatureTemplates.json` +
two-part prompts in `src/prompts/monster-prompts.mjs`).

## Problem

The 2024 path (`src/tools/statblock-generator/format-2024/`) generates
CR-accurate monsters from the chassis/archetype engine; the 2014 path still
uses the old template-driven two-part prompts with no archetype awareness.
Users who prefer 2014 phrasing get the worse math.

## Approach

The engine is deliberately edition-agnostic — `chassis/chassis.mjs` and
`chassis/slot-plan.mjs` know nothing about phrasing. A 2014 retrofit is:

1. A 2014 renderer variant (2014 conventions: separate Saving Throws line,
   `Melee Weapon Attack: +X to hit`, lowercase conditions, `challenge_rating`
   line format) parallel to `format-2024/render.mjs`.
2. A 2014 prompt variant in the generation pipeline (`format-2024/generate.mjs`
   generalizes: the numeric skeletons stay identical, only the phrasing
   templates and the few-shot exemplars change — 2014 exemplars would need an
   SRD 5.1 parse, or reuse of the existing `creatureTemplates.json` action
   shapes).
3. Lint phrasing rules flipped (the numeric/consistency rules are shared).
4. The Build select (Random/Stronger Defense/Balanced/Stronger Offense) maps
   to archetypes: Stronger Defense → defender, Stronger Offense → brute or
   artillery, Balanced → baseline chassis, Random → random archetype.

The old two-part flow stays until the retrofit is verified — it's the
fallback, not dead code, and its removal is a separate decision.

## Context

Settled decisions live in `docs/2024-architecture.md` (UI decisions section).
The 2024 engine layers and their tests are the reference implementation:
chassis/slot-plan/render/lint/generate, ~300 tests under
`src/tools/statblock-generator/__tests__/`.
