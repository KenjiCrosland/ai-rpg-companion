# Migrate dungeon-generator entry to mountApp

## Trigger

Pause and consider this migration *first* before:

- Adding any new CSS dependency (parchment token, Cedar component, shared stylesheet) that the dungeon consumes and needs to load in dev mode. The current shape will re-reproduce the tokens.css spillage trap that bit the team on `dungeon-item-connection`.
- Adopting a new shared component pattern across tools where the dungeon would otherwise need to thread a bespoke load path.
- Major work on the dungeon's prod entry chain, or any work that touches `src/entries/dungeon-generator.js` for more than a one-line tweak.
- Diagnosing dev/prod rendering divergence in the dungeon tool specifically — by the time the symptom shows up, this migration is the right shape of fix.

Don't trigger on:

- Routine dungeon feature work that doesn't touch entry, mount, or global CSS load.
- Bug fixes within the dungeon UI that don't surface load-order issues.
- Adding components that are scoped or that use parchment-token fallbacks inline.

The principle: *the dungeon's bespoke entry is fine to maintain as-is for normal feature work. Just don't extend the divergence — when the next shared-resource change makes the bespoke shape painful, migrate then.*

## Problem

The dungeon generator's prod entry, `src/entries/dungeon-generator.js`, is a bespoke setup that doesn't go through `mountApp` from `src/entries/base.js`. Every other tool entry — NPC, Item, Setting, Encounter, Statblock, Location, Lore, Book, Chase Tracker, Price Calculator — uses `mountApp(Tool, withPremium)`. The dungeon is the only one that manages its own `createApp`, root component, CSS load list, premium handling, and toast registration manually. This is historical: the dungeon was merged in from a separate repo that had its own entry conventions, and the standardization pass was never done.

The divergence has three concrete costs:

1. **CSS load chain differs from every other tool.** `mountApp` consumers automatically pick up `@/parchment/tokens.css` and the full Cedar CSS set via base.js. The dungeon manages its own list. Pre-commit `9660727`, that list was missing `tokens.css` entirely — so the dungeon's prod render was silently missing parchment color resolution. The fix added tokens.css to the dungeon entry directly, but the divergence in *how* it gets loaded is still there.

2. **Manual upkeep, perpetually.** Every addition to base.js (new Cedar CSS, parchment additions, migration runs, dev controls) needs a parallel change to `dungeon-generator.js`. New tools added via `mountApp` get the additions for free; the dungeon doesn't.

3. **Subtle dev/prod rendering divergence.** In dev mode the dungeon mounts via `main.js` → `App.vue` → `<DungeonGenerator>`. In prod it mounts via `dungeon-generator.js` → `DungeonGenerator` directly. The two paths load different CSS sets in different orders. When dungeon CSS depends on something only the prod path provides, dev silently falls back without throwing — which is exactly how the `dungeon-item-connection` mystery surfaced: tokens.css was loaded by the prod entry but not by main.js, so the dungeon's lapis read-aloud box rendered correctly in prod and fell back to bare values in dev.

The May 2026 incident on `dungeon-item-connection` resolved by inlining hex/font fallbacks in dungeon-only files (`RoomDescription.vue`, `BossStatblockPrompt.vue`, `OverviewTab.vue`, `parchment/ParModal.vue`) so they don't depend on globally-loaded tokens. That fix works but is a workaround for the entry-path divergence — every new dungeon component that wants parchment styling now has to either repeat the inline-fallback pattern or accept that it'll silently fall back in dev. The right fix is to migrate the entry so dungeon CSS works the same way every other tool's does.

## Recommended approach

### 1. Audit what the bespoke entry currently does that mountApp doesn't

Read `src/entries/dungeon-generator.js` end-to-end. Diff it against `mountApp` in `src/entries/base.js`. For each thing the dungeon does that base doesn't, confirm one of:

- mountApp handles it (likely: Pinia, AppToast, toast registration, premium prop, migrations)
- It's dungeon-specific and stays in the dungeon entry (likely: `src/tools/dungeon-generator/style.css` import, anything dungeon-only)
- It was historical drift and can drop (likely: redundant Cedar CSS imports that base.js already does)

Specific things to verify:

- **Cedar CSS load order.** The dungeon entry imports a specific subset of Cedar CSS files in a specific order. Confirm base.js imports the same set, or that anything missing is genuinely unused by the dungeon.
- **Premium handling.** `mountApp(Component, true)` passes `premium: true` when `getEffectivePremium` resolves true. The dungeon entry uses the same helper but threads it manually. Behavior should be identical, but verify.
- **`provide` calls.** The bespoke setup may inject something into the component tree that mountApp's `Root` doesn't. Check the `provide` calls and confirm DungeonGenerator.vue doesn't depend on them.
- **`AppToast` mount order / ref.** mountApp registers AppToast via the toast composable. Confirm this works for the dungeon's toast calls.

### 2. Migrate the entry

Once the audit confirms compatibility, replace the bespoke setup. Target shape:

```js
// src/entries/dungeon-generator.js
import { mountApp } from './base.js';
import DungeonGenerator from '@/tools/dungeon-generator/components/DungeonGenerator.vue';

// Dungeon's own CSS — kept in the entry so it loads alongside the
// component but doesn't bleed to other tools.
import '@/tools/dungeon-generator/style.css';

mountApp(DungeonGenerator, true);
```

Compare to `src/entries/setting.js`, `src/entries/npc.js`, etc. for the canonical shape.

### 3. Drop the dungeon-only inline fallbacks

Once the dungeon entry loads tokens.css via mountApp's base.js path, the var-fallback workaround can come out. Files to revert (the inline `, #hex` and `, 'Source Serif 4', ...` fallback chains added in `dungeon-item-connection`):

- `src/tools/dungeon-generator/components/RoomDescription.vue`
- `src/tools/dungeon-generator/components/BossStatblockPrompt.vue`
- `src/tools/dungeon-generator/components/OverviewTab.vue` (font fallback chain in `.dungeon-card`, plus the `max-width: 75ch` bump on `.dungeon-card-content` — see notes below)
- `src/parchment/ParModal.vue`

Revert pattern: `var(--par-color-xxx, #hex)` → `var(--par-color-xxx)`. Mechanical, but verify each file's specific tokens still resolve via base.js's tokens.css load.

The `OverviewTab.vue` `.dungeon-card-content` `max-width: 75ch` was bumped from `65ch` during the workaround because Georgia (the fallback at the time) was narrower than Source Serif 4 and `65ch` resolved to too narrow a column. After migration, with tokens loading reliably and Source Serif 4 being the actual font, the right `ch` value may be back to `65ch` to match the setting overview card. Verify against the setting card visually and tune.

### 4. Restore `src/main.js` tokens.css import

In the workaround, `import '@/parchment/tokens.css'` was removed from `src/main.js` because it caused non-dungeon dev rendering to flip from Georgia (silent fallback) to Source Serif 4 (token-resolved). Both were "fixed" by the inline fallback workaround. After migration, restore the main.js import:

```js
// src/main.js
import './style.css';
import '@/parchment/tokens.css';
import App from './App.vue';
```

This restores dev/prod parity for *all* tools (not just the dungeon). Non-dungeon tools in dev will now render in Source Serif 4, matching their prod render. This is the correct end state; it was perceived as a regression on `dungeon-item-connection` because the user's muscle memory was the previous dev/prod divergence (Georgia in dev, Source Serif 4 in prod). After this migration, that divergence is gone everywhere, by design.

## Verification

- `npm test` passes (no test changes expected, but the entry rewrite should not break any existing test).
- Dev mode walkthrough: dungeon, NPC, Setting, Item, Statblock, Encounter, Location, Lore, Book, Price Calculator, Chase Tracker. Visually confirm:
  - Cards render in Source Serif 4 (was the case before migration for all but dev — should now be true everywhere)
  - Burgundy titles, parchment surfaces, lapis read-aloud boxes all colored correctly
  - No regressions in dungeon-specific features (sidebar, room generation, map, NPCs tab, monsters tab)
- Prod deploy: smoke-test the WordPress dungeon-generator shortcode page and dungeon-generator-premium page. The bespoke entry's tokens.css import was added precisely because the prod dungeon needed it; confirm mountApp's path still delivers tokens to the prod dungeon.
- Cross-tool navigation: item → dungeon seed flow, NPC → dungeon, setting → dungeon — verify the prefill, navigation params, and ref-graph writes all still work.
- Premium: WordPress dungeon-generator-premium shortcode renders premium UI correctly; free shortcode renders free UI.

## Risks

- **Bespoke entry was load-bearing.** Some quirk of the bespoke setup (CSS load order, provide injection, premium-prop timing) may turn out to be required and not surfaced by the audit. Realistic mitigation: visual smoke-test after migration before deleting the old entry.
- **WordPress theme cascade differences post-migration.** The dungeon's WordPress shortcode has its own CSS overrides defending against the WP theme. Changing the dungeon's load chain may interact differently with the cascade. Eyeball prod render after deploy.
- **Restoring main.js tokens.css is a perceived regression for non-dungeon dev users.** Communicate that this is the intended fix; dev now matches prod everywhere.

## Estimated effort

- Code rewrite (entry + cleanup of inline fallbacks + main.js restore): ~30-60 minutes
- Dev verification (walk every tool page): ~30 minutes
- Prod verification (deploy + smoke-test every WordPress shortcode): ~1 hour, requires deploy or staging
- Buffer for hitting one of the risks: ~1-2 hours

Realistic total: half a day if clean, a full day if a quirk surfaces during prod testing.
