# Foundry VTT / Improved Initiative exports for 2024 statblocks

## Trigger

User requests for Foundry/Improved Initiative export of a 2024-format block,
or any session touching the export converters in `src/util/convertTo*.mjs`.

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
