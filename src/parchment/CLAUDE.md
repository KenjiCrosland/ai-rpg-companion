# Parchment

Project-specific design system for **content UI** — the warm, paper-toned
surfaces that the user actually reads (item cards, NPC cards, future
dungeon/setting/lore cards). Distinct from **Cedar** (`@rei/cedar`),
which we use for form controls, modals, accordions, and other chrome.

The split exists because Cedar's REI-store visual language doesn't fit
the source-book mood of the cards, but rolling our own form library
would be wasteful. Cedar handles inputs/modals; Parchment handles cards
and the buttons that live on them.

## Status

Bootstrapping — start small. The first primitive is `ParCardButton`, shared
between the item card and the NPC card so they stay visually in sync as
we iterate on the styling.

## Files

- `tokens.css` — `:root` design tokens. Loaded once in `src/entries/base.js`
  so every tool inherits them.
- `ParCardButton.vue` — editorial card-context button, burgundy palette (header / footer card actions).
- `ParActionButton.vue` — chrome-level primary action button, lapis palette (form CTAs, page-level actions). First component in the migration off Cedar primary buttons. Sibling to `ParCardButton`, not a variant — different palette, different role, different surface context.
- `ParInput.vue` — single-line text input (also handles `type="number"`).
- `ParTextarea.vue` — multi-line input. Body text uses serif to match card prose.
- `ParSelect.vue` — native `<select>` with parchment styling. Custom dropdown caret via inline SVG.
- `ParCheckbox.vue` — native checkbox with parchment styling and label-on-right.
- `ParTooltip.vue` — wrapper-style tooltip. CSS-only show/hide via `:hover` and `:focus-within`. Use for ghost-styled affordances whose label answers "what" but not "when" (e.g. Re-scan Lore). Dark burgundy surface + cream text for fast read; not blended with the parchment palette by design.
- `index.mjs` — re-export entry. Consumers do `import { ParInput, ParCardButton } from '@/parchment';`.

## Conventions

- **Prefix:** components are `Par*` (e.g., `ParCardButton`, future `ParCard`).
- **Tokens-only colors:** component CSS references `--par-*` custom
  properties, never hex literals. Tokens live in `tokens.css`.
- **Scoped styles:** components use `<style scoped>` so visual rules
  don't leak. Theming happens through tokens, not through cascade.
- **Slots over props for content:** label content goes in the default
  slot; icons go in a named `icon` slot. Keep prop API small.
- **Native semantics:** components wrap a native element where possible
  (`ParCardButton` is a `<button>`). Don't reinvent ARIA.

## Adding a component

1. Create `ParWhatever.vue` in this folder.
2. Style it with `--par-*` tokens. Add new tokens to `tokens.css` only
   when an existing token doesn't fit.
3. Re-export from `index.mjs`.
4. Update this file's "Files" list.
