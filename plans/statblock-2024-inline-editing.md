# Inline editing for the 2024 card + engine-based edit re-rolls (both editions)

## Trigger

User requests to edit a generated 2024 statblock beyond regenerating it, any
session porting editing features to `Statblock2024.vue`, or any session
touching the single-ability re-roll prompts (`statblock-edit-prompts.mjs`).

## Engine-based re-rolls — SHIPPED (2026-07-19)

`rerollEntry()` and `rerollSection()` in `format-2024/generate.mjs` now power
ALL edit re-rolls in `Statblock.vue` — single-entry and whole-section (with
plan-derived counts, multiattack enforcement, and the user-suggestion
steering preserved). Every statblock mutation path now passes through engine
budgets + lint: generation, regeneration, entry re-rolls, section re-rolls.
`src/prompts/statblock-edit-prompts.mjs` has no remaining consumers in
`Statblock.vue` (the dungeon generator has its OWN copy of these prompts —
still template-based, not this plan's scope).

This plan's remaining scope is now ONLY the `Statblock2024.vue` editing
surface (the read-only-v1 card).

Original design (implemented):

- `buildContext(cr, archetype)` → the same attack/save/damage skeletons the
  full pipeline uses, edition phrasing rules per the monster's `format` field
  (not the UI toggle), rest-of-block as context.
- Returned entry passes single-entry lint (phrasing gates, damage-dice,
  undefined-attack-ref, spell-dc-ability already operate per-entry; band
  checks need the chassis passed in). Reject → one retry, as in generation.
- Context recovery: engine monsters carry `cr`/`archetype` → exact rebuild.
  Pre-engine monsters lack `archetype` → balanced chassis at displayed CR
  (still better than templates). This is the templates' last generation-side
  consumer in the statblock tool; the dungeon generator keeps its own.

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
