# Chase Tracker

A spatial chase tracker for D&D 5e GMs: a map of connected zones with character tokens inside them, click-to-select and click-to-move. The tool solves the "where is everybody" problem that breaks down when the party splits during a chase.

## Purpose

- Visual tracking of a live chase across 4–8 connected zones.
- Five pre-built templates: Urban Alleyways, Wilderness Trails, Building Interior, Undercity, Blank.
- Zone Library with ~220 ready-made zones across four environments (urban, wilderness, indoor, underground) plus transitional zones tagged with two environments.
- Free, no signup, no AI. All content is static JSON bundled with the tool.

## Data shape

The full state lives in a single reactive object from `composables/useChaseMap.js`:

```javascript
{
  hasActiveChase: boolean,
  mapName: string,
  environments: string[],   // e.g. ['urban']; seeds the library filter
  scenario: string,         // one-line scene-setter; starts with '[Example] …'
  gridCols: number,
  gridRows: number,
  zones: [
    { id, name, description, col, row, colSpan, rowSpan, pills }
  ],
  connections: [[zoneIdA, zoneIdB]],
  tokens: [
    { id, label, role: 'quarry' | 'pc' | 'pursuer', icon, color, zoneId, dashCount }
  ],
  selectedTokenId: string | null,
  connectingFromZoneId: string | null,
  participantsPanelCollapsed: boolean,
  pendingPlacementCell: { col, row, direction } | null,
}
```

## localStorage

- Key: `cros-chase-tracker`
- Written on every state change via `watch(state, ..., { deep: true })`.
- **No schema version.** Pre-release, it was dev-cache-bust overhead. Instead, `loadFromStorage` runs a light shape check — if `zones`/`tokens`/`connections` aren't arrays, discard and start empty; missing optional fields (`environments`, `scenario`, etc.) fill with defaults. This lets dev-schema changes roll forward without wiping chases for every shape tweak.
- `connectingFromZoneId` and `pendingPlacementCell` are ephemeral and are stripped before saving / reset on load.
- On reload mid-edge-expansion, `recomputeGridDimensions()` runs once to collapse any orphaned empty row/column.

## Free vs premium

`ChaseTracker.vue` takes a `premium` boolean prop (via `mountApp(..., true)`). Templates are filtered in `availableTemplates`:

```js
templates.filter(t => props.premium || !t.premium)
```

All v1 templates have `premium: false`, so free and premium see identical content. The hook is in place for future premium-only templates (planar, underdark-specific, rooftop-heavy, etc.).

## No AI integration

This tool does **not** call `generateGptResponse()`. There are no files in `src/prompts/` for it. All runtime content — templates, library zones, generic zone descriptions — is in `data/*.json`. Tests do not need to mock the AI layer.

## Styling

- Fully tool-local parchment/DMG theme.
- Every token, color, and rule is scoped under `.chase-tracker-root` in `styles/tokens.css` and `styles/parchment.css`.
- Styles are imported at the top of `ChaseTracker.vue` via `./styles/index.css` — they are **not** registered globally in `src/entries/base.js` or anywhere else.
- Cedar design tokens and other tools' styles are unaffected.

Don't add unscoped selectors to the tool's CSS files. If a style is bleeding out, it's missing the `.chase-tracker-root` prefix.

## Components

- `ChaseTracker.vue` — root. Adds the `.chase-tracker-root` wrapper, chooses between `TemplatePicker` and `ChaseMap`, and renders the editable `[Example]`-prefixed scenario line under MapControls.
- `TemplatePicker.vue` — starting screen. Scenario templates first, Blank card last (styled quieter, secondary button, pencil glyph).
- `MapControls.vue` — top bar (map name edit, Participants, +Token, +Zone, Rules, New Chase).
- `ChaseMap.vue` — grid + SVG connection overlay. Shows a centered hint when `zones.length === 0` (blank-template onboarding).
- `Zone.vue` — one grid cell. Click = move selected token here (if adjacent). Affordance row for edit / conditions / delete plus a secondary Connect button.
- `ZoneEditor.vue` — inline popover for name/description/span.
- `Token.vue` — chip inside a zone. Click = select/deselect. Double-click = rename. × on hover = remove.
- `ZoneLibrary.vue` — drawer with multi-select environment chips (Any / Urban / Wilderness / Indoor / Underground). Seeds its filter from the template's `environments` array. Transitional zones appear under any of their tagged environments.
- `ParchmentPanel.vue`, `OrnamentalDivider.vue`, `DButton.vue` — tool-local UI primitives.

## Data files

- `data/templates.json` — five templates. Each has an `environments[]` array, a `scenario` string starting with `[Example] …`, and `defaultTokens` (named for the four populated templates; generic for Blank).
- `data/zoneLibrary.json` — ~220 library zones. IDs follow `lib_<env>_<NNN>` (`urb`, `wild`, `indr`, `undr`) or `lib_trans_NNN` for transitional zones with two environments. Shape distribution leans ~60/20/15/5 small/wide/tall/large-massive.
- `data/zoneDescriptions.json` — fallback flavor descriptions used elsewhere.

## Tests

`ChaseTracker.spec.js` covers the composable and the root rendering. Coverage includes:

- `startFromTemplate` loads zones, connections, tokens, environments, scenario; sets `hasActiveChase`.
- Blank template: no zones, all tokens in the tray, generic labels.
- Named default tokens on populated templates (urban → Fenn the Cutpurse / Boblin / ...).
- `setScenario` writes text; starting a new chase resets scenario to the template default.
- `moveSelectedTokenTo` rejects non-adjacent moves, accepts adjacent, clears selection.
- `addZone`, `connectZones`/`disconnectZones`, `addToken`/`removeToken`.
- Placement collision-free for library + edge-expansion flows.
- `recomputeGridDimensions` collapses empty rows/cols after deletion (intra-row cell gaps preserved).
- localStorage round-trip; shape-check discards malformed payloads; missing new fields fill with defaults.
- Premium prop filters templates.

No AI mocks needed.

## Extending

- **More templates:** add to `data/templates.json` with an `environments[]` array and a `scenario` string (`[Example] …`). Set `premium: true` for gated ones.
- **More library zones:** add to `data/zoneLibrary.json`. Follow the voice guide — bare-noun names, clipped one-to-two-sentence descriptions, slightly ominous tone. Use `lib_trans_NNN` IDs for multi-environment (transitional) zones.
- **New environments:** add to the `ENVIRONMENT_CHIPS` list in `ZoneLibrary.vue`, the env taxonomy in library content, and the filter seeding logic; no composable changes needed because `environments` is just a string[].
- **New token roles:** same pattern in `Token.vue` + `config/tokenIcons.js` + `config/tokenColors.js`.
