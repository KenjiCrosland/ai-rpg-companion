# 2024 statblock interop: exports + cross-tool consumers

## Trigger

User requests for Foundry/Improved Initiative export of a 2024-format block,
any session touching the export converters in `src/util/convertTo*.mjs`, OR
work on tools that consume the `monsters` store (encounter generator, NPC
generator, Roll20 extension expectations).

## Cross-tool consumer audit (2026-07-18, during production review)

~~The encounter generator's `monster-adapter.mjs` normalizes 2024 blocks
degraded-but-working~~ **RESOLVED 2026-07-28 (encounter phase 2)**: the
adapter now maps 2024 blocks through `toLegacyModel` (the mapper this plan
prescribed — it was built during the 2014-engine retrofit) before
normalizing, so scores/actions/defenses/AI context are full-fidelity; the
original 2024 block stays attached for the Statblock2024 display dispatch.
`convertStatblockToPlainText` routes through the same mapper (replacing the
inline shim). The encounter's own statblock generation is engine-routed via
`generateEmbeddedStatblock` with a rules switch in the Monsters header.
Fidelity test: `src/util/embedded-statblock.spec.js` (adapter describe).

REMAINING (this plan stays open for): Foundry VTT / Improved Initiative
export of 2024 blocks in `StatblockExports.vue` — `toLegacyModel` now makes
this nearly free (feed it to the existing converters; decide Bonus
Actions/Reactions folding per target) — and the Roll20 Conjure Creature
extension expectations check.

Already shimmed inline (minimal fallbacks, done during review):
- `EncounterGenerator.vue` `convertStatblockToPlainText` — crashed on 2024
  blocks (`statblock.abilities.STR`); now falls back to `ac`/`hp`/`stats`.
- `statblock-enrichment.mjs` prompt builder — now renders 2024 `stats`,
  `sections`, and merged `immunities`/`resistances`.

## Problem

2024 blocks currently export markdown only (via
`format-2024/render.mjs`); `StatblockExports.vue` hides the Foundry VTT and
Improved Initiative buttons for `format: '2024'` monsters with an inline note.
The converters expect the 2014 model shape (`armor_class` string,
`attributes` string, `abilities`/`actions` arrays), not the 2024 model
(numeric `ac`/`hp`, `stats`/`saves` maps, `sections`).

## Approach

Write a `statblock2024To2014Shape(monster)` mapper (new util or inside
`format-2024/`), then feed the existing converters:

- `ac` + note → `armor_class`; `hp`/`hp_formula` → `hit_points` "150 (20d10 + 40)".
- `stats` → `attributes` string with computed mods; `saves` → `saving_throws`
  string (only abilities where save ≠ mod).
- `sections.Traits` → `abilities`, `sections.Actions` → `actions`,
  `sections['Legendary Actions']` → `legendary_actions`; Bonus Actions and
  Reactions need a decision per target format (Foundry supports them; the
  2014 shape has no slot — likely fold into `actions` with a prefix).
- 2024 phrasing stays in the text (Foundry imports it fine as prose); do NOT
  translate phrasing back to 2014.
- `challenge_rating` compat string already exists on 2024 monsters.

Test surface: mapper output feeds `convertToFoundryVTT`/
`convertToImprovedInitiative` without throwing, and field-level assertions on
a fixture (Gloom Stalker fixture in `__tests__/generate-2024.spec.js`).

Also check the Roll20 Conjure Creature extension's expectations before
declaring victory — it reads the `monsters` localStorage key directly.
