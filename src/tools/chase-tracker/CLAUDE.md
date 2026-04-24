# Chase Tracker

A spatial chase tracker for D&D 5e GMs: a map of connected zones with character tokens inside them, click-to-select and click-to-move. The tool solves the "where is everybody" problem that breaks down when the party splits during a chase.

## Purpose

- Visual tracking of a live chase across 4–8 connected zones.
- Three pre-built templates (Urban Alleyways, Wilderness Trails, Building Interior).
- Free, no signup, no AI. All content is static JSON bundled with the tool.

## Data shape

The full state lives in a single reactive object from `composables/useChaseMap.js`:

```javascript
{
  schemaVersion: 1,
  hasActiveChase: boolean,
  mapName: string,
  gridCols: number,
  gridRows: number,
  zones: [
    { id, name, description, state: 'open' | 'crowded' | 'obstacle' | 'closed',
      col, row, colSpan, rowSpan }
  ],
  connections: [[zoneIdA, zoneIdB]],
  tokens: [
    { id, label, role: 'quarry' | 'pc' | 'pursuer', zoneId }
  ],
  selectedTokenId: string | null
}
```

## localStorage

- Key: `cros-chase-tracker`
- Written on every state change via `watch(state, ..., { deep: true })`.
- On load, a non-matching `schemaVersion` is ignored and the tool starts empty. Bump `SCHEMA_VERSION` in the composable if the shape changes.

## Free vs premium

The `ChaseTracker.vue` component takes a `premium` boolean prop (via `mountApp(..., true)`). Templates are filtered in `availableTemplates`:

```js
templates.filter(t => props.premium || !t.premium)
```

In v1 all three templates have `premium: false`, so free and premium see identical content. The filter hook is in place for when premium-only templates are added (underdark, planar, rooftop-heavy, etc.).

## No AI integration

This tool does **not** call `generateGptResponse()`. There are no files in `src/prompts/` for it. All runtime content — templates, library zones, generic zone descriptions — is in `data/*.json`. Tests do not need to mock the AI layer.

## Styling

- Fully tool-local parchment/DMG theme.
- Every token, color, and rule is scoped under `.chase-tracker-root` in `styles/tokens.css` and `styles/parchment.css`.
- Styles are imported at the top of `ChaseTracker.vue` via `./styles/index.css` — they are **not** registered globally in `src/entries/base.js` or anywhere else.
- Cedar design tokens and other tools' styles are unaffected.

Don't add unscoped selectors to the tool's CSS files. If a style is bleeding out, it's missing the `.chase-tracker-root` prefix.

## Components

- `ChaseTracker.vue` — root. Adds the `.chase-tracker-root` wrapper, chooses between `TemplatePicker` and `ChaseMap`.
- `TemplatePicker.vue` — starting screen with the three map cards.
- `MapControls.vue` — top bar (map name edit, Participants, +Token, +Zone, Rules, New Chase).
- `ChaseMap.vue` — the grid + SVG connection overlay. Recomputes line coords on resize and on state changes.
- `Zone.vue` — one grid cell. Click = move selected token here (if adjacent). Affordance row for edit / conditions / delete / connect.
- `ZoneEditor.vue` — inline popover for name/description/span.
- `Token.vue` — chip inside a zone. Click = select/deselect. Double-click = rename. × on hover = remove.
- `ParchmentPanel.vue`, `OrnamentalDivider.vue`, `DButton.vue` — tool-local UI primitives.

## Tests

`ChaseTracker.spec.js` covers the composable and the root rendering. Coverage:

- `startFromTemplate` loads zones, connections, tokens; sets `hasActiveChase`.
- `moveSelectedTokenTo` rejects non-adjacent moves, accepts adjacent, clears selection.
- `addZone`, `connectZones`/`disconnectZones`, `addToken`/`removeToken`.
- localStorage round-trip; `schemaVersion` mismatch resets to empty.
- Premium prop filters templates.

No AI mocks needed.

## Extending

- **More templates:** add to `data/templates.json`. Set `premium: true` for gated ones.
- **More library zones:** add to `data/zoneLibrary.json`.
- **New token roles:** same pattern in `Token.vue`.
