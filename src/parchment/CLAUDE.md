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
- `ParActionButton.vue` — chrome-level primary action button, lapis palette (form CTAs, page-level actions). First component in the migration off Cedar primary buttons. Sibling to `ParCardButton`, not a variant — different palette, different role, different surface context. Variants: `primary` (serif solid lapis, prominent CTAs), `primary-outline` (sans compact lapis outline, inline data-row actions like Create Setting per card), `secondary` (faded slate outline, Cancel-beside-Generate), `luminous` (cabochon gradient, rare special moments).
- `ParAddNewButton.vue` — full-width dashed-outline "+ Add new X" affordance, lapis palette. One step below primary-outline because it signals "create new" rather than "act on existing." Dashed-to-solid border transition on hover commits visually as the user prepares to click. Used by Related Places' add-place affordance; will expand to "Add NPC," "Add Faction," "Add Quest Hook" across the tool.
- `ParCallout.vue` — tinted parchment surface primitive. Wraps slot content in a warm-tan rounded card with serif typography. Extracted when premium-status blocks needed the same surface treatment as PatreonCallout — second use case justified extraction. PatreonCallout still owns its surface inline (tighter coupling to its internal structure); both stay visually identical via shared `--par-color-callout-*` tokens.
- `ParInput.vue` — single-line text input (also handles `type="number"`).
- `ParTextarea.vue` — multi-line input. Body text uses serif to match card prose.
- `ParSelect.vue` — native `<select>` with parchment styling. Custom dropdown caret via inline SVG.
- `ParCheckbox.vue` — native checkbox with parchment styling and label-on-right.
- `ParTooltip.vue` — wrapper-style tooltip. CSS-only show/hide via `:hover` and `:focus-within`. Use for ghost-styled affordances whose label answers "what" but not "when" (e.g. Re-scan Lore). Dark burgundy surface + cream text for fast read; not blended with the parchment palette by design.
- `ParTabToggle.vue` — view-mode tab strip for content surfaces (e.g. Description/Form switcher on the dungeon-generator room panel). Burgundy underline + burgundy active text on a divider baseline — editorial register, intentionally NOT lapis. Lapis stays reserved for chrome action primitives (`ParActionButton`); the visual difference is the signal "this lives on a content surface" vs "this is a chrome control." Options-array prop API (`{value, label}[]`) plus `v-model` — single component, no parent/child Cedar-style nesting.
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

## What's deferred — Cedar carve-outs

ParActionButton's three variants (`primary`, `secondary`, `luminous`)
cover the **action button** family — primary CTAs, supporting alternatives,
and rare special-importance moments. They don't yet cover two patterns
that intentionally live at different visual registers, and those sites
**stay on Cedar** until parchment has primitives that fit:

### Inline icon controls (delete / info icons in lists)

Cedar's `<cdr-button :icon-only="true" :with-background="true">` pattern
— a small **round** button with a subtle background, used inline next to
list items for ✕ delete or ⓘ info actions. ParActionButton's `iconOnly` +
`variant="secondary"` produces a **square** slate-outlined button, which
reads as too heavy for inline placement against a list row. The square
treatment competes with the row content; the round-with-background
treatment recedes the way it should.

**Sites currently held on Cedar** (8 instances, will migrate when a ghost
icon-button primitive exists — provisional name `ParIconButton`):
- `src/tools/dungeon-generator/components/MonstersTab.vue` — delete monster
- `src/tools/setting-generator/components/tabs/LocationsTab.vue` — delete sublocation (×2)
- `src/tools/setting-generator/components/tabs/QuestHooksTab.vue` — delete quest hook
- `src/tools/setting-generator/components/tabs/FactionsTab.vue` — delete faction, info icon (×2)
- `src/components/DashboardPlus.vue` — delete location, delete NPC (×2)

### Inline link-style navigation

Cedar's `<cdr-button modifier="link">` — text-only, underlined, no
background. Used inline within prose for "go to X" navigation cues.
ParActionButton's `variant="secondary"` is outlined-and-padded, which
treats inline text-flow navigation as a heavy interactive element.
Different role, different visual register.

**Sites currently held on Cedar** (1 instance, will migrate when a link
primitive exists — provisional name `ParLink`):
- `src/tools/dungeon-generator/components/RoomDescription.vue:102` — "go to connected room" inline navigation

### When to build these primitives

When a second use case for either pattern appears, build the primitive
then. Same principle as the rest of this document: extractions earn
their existence through real duplicated need, not speculative scaffolding.
For now, the 9 Cedar sites listed above are the carve-out, and they're
intentional, not technical debt.
