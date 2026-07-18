# Inline editing for the 2024 statblock card

## Trigger

User requests to edit a generated 2024 statblock beyond regenerating it, or
any session porting editing features to `Statblock2024.vue`.

## Problem

`Statblock2024.vue` shipped read-only (v1 scope decision, owner-approved):
Regenerate is the only edit path. `Statblock.vue` (2014) supports full inline
editing including per-ability AI re-rolls via `statblock-edit-prompts.mjs`.
Parity gap will surface as user requests.

## Approach

- Editing state lives on the card like `Statblock.vue`'s `editedMonster`
  pattern, emitting `update-monster` (the generator's handler is
  format-agnostic — it saves whatever it receives and propagates renames).
- Numeric edits (AC/HP/attack/DC) should warn when they leave the lint bands
  for the block's stored `archetype` — run `lintStatblock` from
  `format-2024/lint.mjs` with `buildContext(cr, archetype)` and surface
  correctable findings as inline hints, not blocks. The user is allowed to
  break the math on purpose; the generator pipeline is not.
- Per-entry AI re-roll needs a 2024 variant of the single-ability edit
  prompts (2024 phrasing skeletons from `format-2024/generate.mjs` — reuse
  `damageBudgetFor`/`damageDiceFor` so re-rolled entries keep budget numbers).
- The ability grid cells edit as score inputs; mods/saves recompute (saves
  keep proficiency: derive proficient set from `save > mod` before the edit).

## Context

Read-only decision recorded in `docs/2024-architecture.md`. The card's
footer already emits the same events as `Statblock.vue`, so only the
in-card editing surface is missing.
