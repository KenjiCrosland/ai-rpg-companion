# Statblock Stable Id

## Trigger

Pause and run this migration *first* before any of the following:

- Adding a feature that creates `has_statblock` references from a new source tool (anything that didn't previously link statblocks).
- Adding a new operation that mutates statblock identity across stores — a "duplicate statblock" feature, batch rename, cross-folder merging, anything that would otherwise extend the cross-store propagation pattern in `renameStatblockReferences` / `moveStatblockToNewFolder`.
- A bug surfaces that's specifically caused by the composite-id form. Most likely: a user folder name containing `__` breaks the separator parse in code that splits `${name}__${folder}` back into name + folder.

Don't trigger on:

- Bug fixes to existing rename/move-folder behavior. The composite-id code works; if someone reports "rename misses dungeon NPCs," fix it in place.
- Display-side statblock changes (form fields, rendering, exports).
- Read-only access to existing `has_statblock` refs from other tools.

The principle: *the existing composite-id code is fine to maintain. Just don't extend the pattern.* New writers go through stable ids, which means doing this migration first.

## Problem

Statblocks are the only entity in the substrate that uses a *composite* cross-tool id. The reference graph (`tool-references`) keys statblock entries on `${name}__${folder}` strings. As a result:

- Renaming a statblock requires `renameStatblockReferences` to walk every store rewriting composite ids — `npcGeneratorNPCs`, `dungeons`, `gameSettings`, and `tool-references`.
- Moving a statblock between folders requires `moveStatblockToNewFolder` to do the same walk for the folder segment.
- Every write site that creates a `has_statblock` ref has to know the composite form.
- Folder organization leaks into cross-tool linkage. By the substrate's own principle ("folders are organization, references are relationships"), the user's folder choice shouldn't affect the reference graph at all.
- Folder names containing `__` will eventually surface as a bug — the separator-parse path in `getStatblockFromStorage`'s auto-fix logic and elsewhere doesn't currently defend against it.

NPCs, dungeons, settings, and items all use stable string ids (`npc_*`, `dng_*`, `set_*`, item name as id). Statblocks are the outlier.

## Recommended approach

### 1. Assign stable ids to every statblock

A new one-shot migration `assign-statblock-ids` that walks `monsters` localStorage and gives every statblock a stable `statblock_id`. Pattern matches `assign-dungeon-ids` / `assign-setting-ids`.

Id format: `stb_${slug}` where slug is deterministic from `${name}__${folder}` so import/export across browsers stays consistent for users who already have statblocks. A simple slug: lowercase, non-alphanumerics replaced with `-`, truncated to a reasonable length, suffixed with a short hash for collision resistance.

```js
function deterministicStatblockId(name, folder) {
  const slug = `${folder}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
  const hash = simpleHash(`${name}__${folder}`); // short hex for collision safety
  return `stb_${slug}_${hash}`;
}
```

### 2. Rewrite every reference graph entry

The migration walks `tool-references` and for any entry where `target_type === 'statblock'`:
- Look up the statblock by its current composite id (`target_id` parses as `${name}__${folder}`).
- Replace `target_id` with the new `stb_*` id.
- Set or update `target_name` to the display name (preserved).

Same for `source_type === 'statblock'` entries (defensive — there shouldn't be any today, but the substrate has been adding them piecemeal).

### 3. Add `statblock_id` denormalization on NPCs/dungeons/settings

NPCs currently store `statblock_name` + `statblock_folder` denormalized fields. Add `statblock_id` alongside them, populated by the migration. After the migration:
- New writes set `statblock_id` directly (the primary pointer).
- `statblock_name` / `statblock_folder` become *display caches* — they update when the statblock is renamed, but they're not load-bearing for cross-tool linkage.

### 4. Steady-state code simplifications

After the migration ships, several substrate functions get simpler:

- **`renameStatblockReferences(oldName, newName)`**: shrinks dramatically. The reference graph stops caring (refs key on `stb_*` now). The function only updates the denormalized `statblock_name` cache on NPCs/dungeons/settings. Setting NPC walk + dungeon NPC walk + NPC walk only — no `tool-references` walk.

- **`moveStatblockToNewFolder(name, oldFolder, newFolder)`**: shrinks similarly. References don't care about folder. The function only updates the denormalized `statblock_folder` cache.

- **`getStatblockFromStorage`**: looks up by `statblock_id` first (direct, O(1) per folder). Falls back to name+folder lookup only for entries that pre-date the migration (defensive — the migration should have hit them all).

- **`autoFixStatblockReference`**: deleteable. Was needed because composite ids drifted when folders got out of sync. Stable ids don't drift.

- **Linked-NPCs panel in StatblockGenerator** and similar consumers: `getReferencesForEntity('statblock', monster.value.statblock_id)` instead of `getReferencesForEntity('statblock', `${name}__${folder}`)`.

### 5. Tests to add

- Migration assigns ids to existing statblocks deterministically (same input → same id).
- Migration rewrites existing `has_statblock` refs from composite to stable form.
- Steady-state: rename no longer touches `tool-references` (just denormalized fields).
- Steady-state: folder move no longer touches `tool-references`.
- Defensive: lookup falls back to composite form gracefully if the migration hasn't run for some reason.

### 6. Migration order

Add to `migration-runner.mjs` between the existing id migrations and the orphan sweep:

```
extract-existing-references
rename-npc-item-fields
assign-dungeon-ids
assign-setting-ids
assign-statblock-ids        ← new
drop-npc-folder             ← (the other one shipping with this release)
sweep-orphan-references
```

`assign-statblock-ids` runs after the other id migrations so it can assume settings/dungeons have stable ids (in case any cross-references need updating). `sweep-orphan-references` runs last so post-rewrite refs aren't flagged as orphans.

## Files involved

**New:**
- `src/util/assign-statblock-ids.mjs` — the migration

**Updated:**
- `src/util/migration-runner.mjs` — register the migration in the ordered list
- `src/util/statblock-storage.mjs` — simplify `renameStatblockReferences`, `moveStatblockToNewFolder`, `getStatblockFromStorage`; remove `autoFixStatblockReference`
- `src/util/__tests__/statblock-storage.spec.js` — reflect the simpler shapes (the existing rename/move tests will need pruning)
- Every site that writes a `has_statblock` ref — update to use `stb_*` id (search for `relationship: 'has_statblock'`)
- `src/tools/statblock-generator/StatblockGenerator.vue` — `linkedNPCs` computed reads `statblock_id`
- `src/tools/npc-generator/NPCGenerator.vue` — `migrateNPCStatblockReferences` and other refs to composite form

## Adjacent work to consider

While doing this, also look at:

- **Encounters use `${folder}__${index}` ids.** Same composite-id pattern, same risk class. Worth assigning stable encounter ids if encounters are about to grow new cross-tool flows.
- **Items use `name` as their id.** The save path deduplicates by name, so this works, but it's similarly fragile. If a "duplicate item" feature ever ships, item identity needs work too. Out of scope for this plan but worth flagging.

These are *don't bundle* — they have separate triggers. Mentioning them so a future you knows the substrate has two more "still composite-or-name-based" entities.

## Why this was deferred

The substrate landed in a release that already shipped: phase 1+2 substrate work, the parchment design system, the item-NPC extraction prompt rework, the move-statblock-folder fix, the rename-statblock fix, several setting-side delete fixes, and the migration-loop fix. Layering another data-shape migration with non-trivial scope on top would have stretched the validation surface beyond what was prudent.

The current composite-id code works correctly. Maintaining it for one more release is bounded; bundling more migration churn into a release that already has a lot of correlated state changes is not.
