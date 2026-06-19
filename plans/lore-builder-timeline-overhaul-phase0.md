# Lore Builder Timeline Overhaul — Phase 0 Findings

Read-only investigation. No code changed. This maps the brief's reference palette/components onto the real codebase and answers the gating questions for later phases.

**Target component:** [`src/tools/item-generator/components/LoreBuilderTab.vue`](../src/tools/item-generator/components/LoreBuilderTab.vue) (1660 lines — template + script + scoped SCSS).

---

## 1. Parchment tokens (real names → brief's reference palette)

All in [`src/parchment/tokens.css`](../src/parchment/tokens.css), `:root`, loaded once via `src/entries/base.js`. **Component CSS must reference `--par-*` / `--color-action-*`, never hex** (house rule). Note: the timeline's current SCSS uses **Cedar** `$cdr-color-*` tokens throughout — the migration replaces those with parchment tokens.

| Brief role | Real token(s) | Value |
|---|---|---|
| Parchment page | `--par-color-surface-page` | `#EAEEF2` (cool desk) |
| Parchment card | `--par-color-surface` `#FBF7F0`; lifted: `--par-color-surface-card` `#FEFBF4` | warm cream |
| Callout/tinted | `--par-color-callout-bg` `#f3ebda`, `-bg-light` `#F8F2E3`, `-bg-deep` `#ede2cb` | tan tints |
| Ink (body) | `--par-color-text` `#222`; secondary `#555`; muted `#6b6b6b` | brief said `#2b2620`/`#6b665c` — **codebase wins** |
| Burgundy (headers/spine/commit) | `--par-color-title` `#7a1f1f`; deep `--par-color-title-deep` `#58180d` | brief said `#7a2e26` — use `--par-color-title` |
| Lapis (create-new) | `--color-action-rest` `#365A85`, `-hover` `#2A4D70`, `-active` `#1F3A5C` | brief said `#244a7c`; rest≈close. Already the suite "create" token |
| Tan rules/borders | `--par-color-border` `#e8e2d4`, `-strong` `#c9b99a`, `-deep` `#b8a685`, `--par-color-divider` `#e2dccd` | brief said `#d8c7a0`/`#c9b896` |
| Muted gray (recessive) | `--par-color-text-muted` `#6b6b6b` | brief said `#6b665c` |
| Field interior | `--par-color-field-bg` `rgba(243,235,218,0.5)` | for form inputs |

**Deviation to note:** the brief's lapis = "create new only," burgundy = "act on existing." The token system already encodes this exactly (see ParCardButton variants below and the `tokens.css` lapis-chrome comment block). No new lapis token needed — `--color-action-*` already exists and is suite-level.

## 2. ParCardButton variants — **already built on this branch**

[`src/parchment/ParCardButton.vue`](../src/parchment/ParCardButton.vue) (modified in this branch's working tree) already has the exact four semantic variants the brief asks for, **each pinning its own text color explicitly** (the brief's "washed-out control style" concern is already addressed):

- `create` — lapis outline → lapis wash on hover. "Make something new" (insert / generate / + Add Event).
- `affirmative` — burgundy outline. Reversible act-on-existing (Edit / Regenerate).
- `primary` — filled burgundy, cream text. Committing action (Keep / Save / Update Item Lore).
- `muted` — recessive gray `#6b6b6b`, firms to `#222` on hover. (Cancel / Remove). Legible, not invisible.
- Legacy variants retained for existing card consumers: `default`, `ghost`, `link`, `danger`.

Props: `variant`, `size` (`default`|`small`), `type`, `disabled`. Slots: `default` (label), `icon`. **Phase 1's button work is essentially done** — confirm/QA only.

**ParButton** ([`ParButton.vue`](../src/parchment/ParButton.vue)) is the *chrome* lapis CTA (form pages). Props: `tag`, `type`, `variant` (`primary`|`primary-outline`|`secondary`|`luminous`), `size` (`small`|`medium`|`large`), `fullWidth`, `iconOnly`, `disabled`. **The current timeline uses `ParButton` everywhere** (incl. `variant="secondary"`, `size="large"/"small"`, `:full-width`) — the restructure replaces most of these with `ParCardButton` semantic variants per the editorial/chrome split.

## 3. Type tokens

Only **one** serif is loaded — `Source Serif 4` (400/500/600, + italics), via `<link>` in `App.vue`. Tokens: `--par-font-serif` (`'Source Serif 4', Georgia, serif`) and `--par-font-sans`.

**Deviation to note:** the brief references "Cinzel + EB Garamond" display+body. Neither is loaded. The mockup's small-caps display headers (e.g. "SKRIP-SKRAP OF THE BRIGHT-WOUND", "HISTORICAL SUMMARY") are achieved with **`font-variant-caps: small-caps` on Source Serif 4** — exactly what `ParModal.vue` already does for its title. So "display serif" → Source Serif 4 + small-caps; "body serif" → Source Serif 4 regular. No font loading needed.

App.vue forces `font-family: var(--font-sans) !important` on everything except `.parchment` descendants — so the spine's root (and any raw heading/subhead it adds) must self-mark `class="parchment"` to honor the serif (same pattern ParCallout/ParField use).

## 4. Cedar primitives in use + theming

The timeline currently leans heavily on Cedar:
- `CdrInput` — current-year field (line 5), event-year edit (204), title/description/context edits.
- `CdrSelect` — event type / time period (`:options`, `prompt`, `label`, `size`).
- `CdrCard` — event cards. `CdrSkeleton`/`CdrSkeletonBone` — summary loading. `CdrLink` — Homebrewery links.
- SCSS imports `@rei/cdr-tokens` and uses `$cdr-color-*` throughout.

**Parchment replacements exist:** form-family `ParInput`/`ParSelect`/`ParTextarea` + `ParField` wrapper (lapis "magic UI"), and card-family `ParCardInput`/`ParCardSelect`/`ParCardTextarea` (burgundy, self-labelling). The restructure should move the selects/inputs onto parchment primitives; `CdrLink` in the export section can stay or move to a future `ParLink` (a documented Cedar carve-out — leave on Cedar for now).

## 5. Modal / confirm pattern — **exists, ready to use**

- [`ParModal.vue`](../src/parchment/ParModal.vue) — parchment modal primitive (teleport, backdrop, ESC/focus handling). Props `opened`/`title`/`dismissible`/`closeOnBackdrop`/`closeOnEscape`/`closeLabel`; slots `default`+`footer`; emits `cancel`.
- [`ParConfirm.vue`](../src/parchment/ParConfirm.vue) — **new in this branch's working tree**, a thin "are you sure?" wrapper over ParModal. Props `opened`/`title`/`message`/`confirmLabel`/`cancelLabel`/`destructive`; emits `confirm`/`cancel`. Footer = muted Cancel + (`primary` burgundy | `danger`) commit. **Currently has zero consumers** — Phase 4 wires it into Update Item Lore, replacing the native `confirm()` at [`LoreBuilderTab.vue:1045`](../src/tools/item-generator/components/LoreBuilderTab.vue#L1045).

## 6. `eventYear` consumers — **Phase 2 gate: CLEAR, no external readers**

`grep -rn eventYear src/`. Every consumer of the **item timeline's** `eventYear` is internal to the item subsystem:

- **[`LoreBuilderTab.vue`](../src/tools/item-generator/components/LoreBuilderTab.vue)** — displays it (lines 89/162/188/278), edits it (204), and emits it inside `timelineEvents` via `updateItem()`. Stores both `yearsAgo` and the derived `eventYear` string on each event (lines 748/761/847/860). Inline markdown/plaintext export reads `event.eventYear` (1111/1131).
- **[`loreBuilderPrompts.mjs`](../src/prompts/loreBuilderPrompts.mjs)** — receives `eventYear` as a **function argument** at generation time, and reads `eventBefore.eventYear`/`eventAfter.eventYear` from passed-in adjacent stored events for context (155/171/178/220/271). These come from the component, so Phase 2 must attach the derived year when handing adjacent events to the prompt builder.
- **[`convertToMarkdown.mjs:convertLoreToMarkdown`](../src/util/convertToMarkdown.mjs#L13)** — reads `timelineEvent.eventYear` BUT on a **different data shape** (`.subject`/`.timelineSummary`/`.details`). It is imported **only** by the legacy [`src/components/LoreGenerator.vue`](../src/components/LoreGenerator.vue) (the standalone Lore tool), and even there shadowed by a local function. **Not a consumer of the item timeline.** Not in scope.
- **[`src/components/LoreGenerator.vue`](../src/components/LoreGenerator.vue)** — the separate legacy lore generator; its own `eventYear` handling, unrelated to the item tool.

**Conclusion:** the item timeline's persisted `eventYear` has **no external/cross-tool reader**. Making `yearsAgo` canonical and deriving `eventYear` at render (`currentYear − yearsAgo`) breaks nothing outside this component. No migration of stored data is forced; we can derive on load and stop persisting the stale snapshot (or keep writing it for backward-compat export while treating it as derived). Recommend: derive at render, keep `yearsAgo` as the only source of truth.

## 7. Integration seams to preserve (do NOT move in Phase 3)

All live in [`LoreBuilderTab.vue`](../src/tools/item-generator/components/LoreBuilderTab.vue):
- **AI calls:** `generateGptResponse(prompt, validator, 3)` — `generateEvent` (754), `generateEvent`/subsequent (853), `generateSummary` (1011). Validators `validateEventJson`/`validateSummaryJson` and prompt builders `generateEventPrompt`/`generateSummaryPrompt` from `@/prompts/loreBuilderPrompts.mjs`.
- **Quota:** `readQuota`/`writeQuota`/`remainingFromQuota`/`ensureQuotaSeeded` from `@/util/quota-storage.mjs` + `detectIncognito` — all inside `canGenerateEvent()` (598) and `updateRemainingGenerations()` (647). Keys on `'lore'`, `MAX_GENERATIONS=5`, 24h window.
- **Persistence:** `emit('updated-item', updatedItem)` in `updateItem()` (1028) and `updateItemLore()` (1062) → parent `handleUpdatedItem` at [`ItemGenerator.vue:2148`](../src/tools/item-generator/ItemGenerator.vue#L2148) writes `savedItems` to localStorage. The contract is the whole item object spread with `timelineEvents`/`historicalSummary`/`itemLegacy`/`currentYear`.
- **Period constraints:** `getAvailablePeriodsForPosition(position)` (482) + `getYearFromSelection` (549) — carry over unchanged (brief Phase 3).
- **Export:** `exportToMarkdown`/`exportToPlainText` (inline) + `ItemExportsSection` wrapper.

## 8. Tests

- Jest config in `package.json` (`jsdom`, `@vue/vue3-jest` for `.vue`, `babel-jest` for js/mjs, `@/` alias, css mocked via `jest.mock.css.js`, setup `jest.setup.js`).
- **No spec exists for `LoreBuilderTab.vue`.** `ItemGenerator.spec.js` **mocks it out** (line 76). So Phase 2/3 tests are net-new.
- Convention reference: [`ParFormFamily.spec.js`](../src/parchment/ParFormFamily.spec.js) — behavior/shape tests via `@vue/test-utils` `mount`, asserting rendered text, emitted events, attribute pass-through. Matches the user's "behavior over shape, no prompt-string-content tests" memory. Phase 2 data-integrity tests (currentYear cascade, insertion period constraints) fit this mold — test return values / derived state, not prose.

## 9. Isolation claim — **confirmed**

`grep -rn LoreBuilderTab src/`: imported only by [`ItemGenerator.vue:389`](../src/tools/item-generator/ItemGenerator.vue#L389) (rendered at 348), and mocked in `ItemGenerator.spec.js`. **Nothing else imports it.** The deep restructure is safely contained.

---

## Recommendations for sequencing

1. **Phase 1 is mostly already done** on this `style-refresh` branch — ParCardButton's four variants, ParConfirm, ParModal all exist. Phase 1 collapses to: confirm/QA the variants render right + decide whether a preview route is worth it. Worth a quick visual check rather than a build.
2. **Phase 2 gate is green** — `eventYear` has no external reader. Proceed with `yearsAgo`-canonical + derive-at-render. Propose test categories (currentYear-cascade, insertion-constraint) before writing, per the user's test-style preference.
3. **One open question for the user** before Phase 3 (color of the *current-year badge* / whether the year-rail uses burgundy or muted tan) — defer to the design reference; flag if ambiguous during build.
4. The current component mixes chrome-lapis `ParButton` into editorial card context. The restructure's biggest churn is swapping those to `ParCardButton` semantic variants and replacing Cedar fields with parchment primitives — all presentation, no seam movement.

**Stop point — awaiting review before any code.**

---

## Phase 1 — verified done (2026-06-18)

Phase 0 reviewed and approved. Phase 1's foundation was already built on this `style-refresh` branch; this session **verified** it rather than rebuilding:

- **Parchment test suite: 69/69 passing** across 5 specs — `ParButton.spec.js`, `ParFormFamily.spec.js`, `ParAddNewButton.spec.js` (49 tests) plus the two untracked-but-present new specs `ParCardButton.spec.js` + `ParConfirm.spec.js` (20 tests).
- **ParCardButton** four semantic variants (`create`/`affirmative`/`primary`/`muted`) confirmed present, each pinning its own text color — the brief's wash-out concern is addressed.
- **ParConfirm** confirm-modal primitive confirmed present (thin wrapper over `ParModal`), zero consumers yet — wired in Phase 4.
- Tokens (five role colors incl. suite-level lapis `--color-action-*`) confirmed in `tokens.css`.

**Not done (intentionally):** the optional preview route/story — brief marked it optional; skipped.

---

## Phase 2 — verified done (2026-06-18)

Gate was green (Phase 0 §6: no external `eventYear` readers). `yearsAgo` is now the canonical, sole-persisted axis; `eventYear` is derived at render.

- **Pure helpers extracted** to [`src/tools/item-generator/utils/lore-timeline.mjs`](../src/tools/item-generator/utils/lore-timeline.mjs): `deriveEventYear` (`currentYear − yearsAgo`, preserves reckoning, falls back to "N years ago"), `yearsAgoFromEventYear` (inverse, for manual year edits), `sortByYearsAgo` (reference-preserving), `availablePeriodsForPosition` + `yearsAgoFromSelection` (insertion constraints), and `YEAR_RANGES` as single source of truth.
- **Wired into** `LoreBuilderTab.vue`: `sortedTimelineEvents` derives `eventYear` per render (cascades on world-year change); both export loops read the derived value; confirm/save/edit paths persist only the canonical shape (`delete updated.eventYear`); manual year edits invert back to `yearsAgo` via `yearsAgoFromEventYear`; `storedEventAtRow` resolves display-row → real stored object through the reference-preserving sort.
- **Tests:** [`lore-timeline.spec.js`](../src/tools/item-generator/utils/lore-timeline.spec.js) — 21 tests across the two proposed categories (A: derivation & cascade; B: insertion constraints), behavior/return-value style per the test preference. Full suite **2441/96 green**.
- **Untracked** (awaiting user's own commit): `lore-timeline.mjs`, `lore-timeline.spec.js`, and the `LoreBuilderTab.vue` data-layer edits.

**Next session starts at Phase 3** (timeline restructure): replace the filmstrip with the vertical spine consuming Phase 1 primitives + Phase 2 clean data. Filmstrip/`cdr-*`/`viewMode` remnants are all still present — that's the churn surface. Carry over `getAvailablePeriodsForPosition`, generation/regeneration card logic, and the export section unchanged; do NOT move the integration seams (Phase 0 §7).
