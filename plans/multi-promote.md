# Multi-Promote: Same NPC Across Multiple Containers of the Same Store

## Trigger

Read this plan before doing any of the following:

- Shipping a "link existing NPC to this setting" or "link existing NPC to this dungeon" feature.
- Building a recurring-NPC workflow where the same canonical NPC is intentionally referenced from multiple settings or multiple dungeons.
- Adding a render-time existence check on setting or dungeon stubs (analogous to the item-side `sourceExists` / "(deleted)" marker pattern in `NPCCard`).
- Any work that creates a second `appears_in_setting` or `appears_in_dungeon` reference for an existing canonical NPC.

If none of those apply, this plan is dormant — leave it alone.

## The problem

The NPC delete paths in setting-tab and dungeon-tab have a localStorage clobber. The substrate's `resetStubsForDeletedNPC` (in `src/util/seeded-input.mjs`) writes stub-resets to all three source stores (`gameSettings`, `dungeons`, `savedItems`). Then the parent component (`SettingGenerator.vue` or the dungeon Pinia store) saves its full in-memory store to its own localStorage key, overwriting the substrate's writes to *other entries in the same store*.

Concretely:

| Delete entry point | Writes to gameSettings | Writes to dungeons | Writes to savedItems |
|---|---|---|---|
| Setting tab | clobbered | survives | survives |
| Dungeon tab | survives | clobbered | survives |
| NPC Generator | survives | survives | survives |

Cross-key writes (e.g. setting→items) survive because the parent only rewrites its own key. Same-key writes (setting→other settings, dungeon→other dungeons) lose.

The bug is invisible today because almost every NPC is promoted from exactly one container, so there's nothing to clobber. It becomes visible the moment users systematically have the same NPC referenced from multiple settings or multiple dungeons. Symptom: orphaned stubs with stale `npc_id` pointing at a deleted canonical NPC. Clicking "View in NPC Generator" silently fails or 404s.

## Why we deferred the fix

Pre-fix, the dungeon hard-delete in `deleteNPCFromAllLocations` had an even worse version of the same clobber for dungeons — it was already broken in practice, so the new behavior is no worse and is better for cross-key writes (setting→items, dungeon→items, dungeon→settings, setting→dungeons). Multi-promote isn't a supported flow today, so the residual gap doesn't bite anyone.

## Files involved

The clobber is at the seam between substrate writes and parent-rewrite saves:

- `src/util/seeded-input.mjs` — `resetStubsForDeletedNPC` walks all three source stores. Correct as-is; don't change.
- `src/util/setting-storage.mjs` — `resetSettingStubsForDeletedNPC`. Correct as-is.
- `src/util/dungeon-storage.mjs` — `resetDungeonStubsForDeletedNPC`. Correct as-is.
- `src/tools/setting-generator/SettingGenerator.vue` — `saveSettingsToLocalStorage` (function around line 499) rewrites the whole `gameSettings` array from in-memory `settings.value`. `onNPCsUpdated` (around line 253) is the handler that triggers it after a delete.
- `src/tools/setting-generator/components/tabs/NPCsTab.vue` — `deleteNPC` calls the substrate then emits.
- `src/tools/dungeon-generator/stores/dungeon-utils.mjs` — `saveDungeons` rewrites the whole `dungeons` array.
- `src/tools/dungeon-generator/stores/npc-store.mjs` — `deleteNPC` calls the substrate then mutates Pinia state and saves.

## Recommended approach

Three options, cleanest first. Pick (1) for the patch when multi-promote ships; consider (3) as a separate long-term refactor.

### (1) Parent reloads after substrate writes

In each parent's delete handler, after the substrate runs, refresh the in-memory store from localStorage before doing the splice + save.

**Setting side** — `SettingGenerator.vue`:

```js
const onNPCsUpdated = (updatedSetting) => {
  const idx = currentSettingIndex.value;
  if (settings.value[idx]) {
    // Refresh in-memory state to pick up cross-setting stub-resets
    // that the substrate wrote during deleteNPC.
    loadSettingsFromLocalStorage();
    settings.value[idx].npcs = updatedSetting.npcs;
    saveSettingsToLocalStorage();
  }
};
```

This is technically a reload-on-every-NPC-update, which is wasteful but cheap. If that bothers a future maintainer, gate the reload on a flag the child sets when it called the substrate.

**Dungeon side** — `npc-store.mjs deleteNPC`: after the substrate call, before the splice, call `loadDungeons(currentDungeonId)` (or whichever loader the Pinia store exposes). Same pattern.

Pros: localized, two handlers. Matches existing emit/save shape. Doesn't require changing the substrate or the storage helpers.
Cons: redundant reload on every save.

### (2) Parent owns the cross-store reset

Move the `resetStubsForDeletedNPC` call out of the child component (NPCsTab / dungeon npc-store) and into the parent's update handler. The parent does *in-memory* resets on its own store (no clobber possible because it's mutating the same object it's about to save) and uses the substrate only for the other two stores.

This is more invasive — needs new substrate entry points like `resetItemStubsForDeletedNPC` + `resetDungeonStubsForDeletedNPC` exposed individually so the parent can call only the ones for *other* stores. Or a parameterized `resetStubsForDeletedNPC(npcId, { skipStore: 'settings' })`.

Pros: no clobber by construction; no redundant reads.
Cons: more surface area to change; introduces an asymmetry (one store handled in-memory, others via substrate) that's easy to get wrong.

### (3) Per-entry persistence

The full-rewrite save pattern (`saveSettingsToLocalStorage`, `saveDungeons`) is the root cause. Replace it with per-entry writes — when a setting changes, persist just that setting's slot, not the whole array.

This is a larger refactor that touches every save path in those tools, not just the NPC delete flow. Worth doing if other clobber-class bugs surface in cross-tool writes (which they likely will once cross-tool flows expand).

Pros: eliminates the entire bug class, not just this instance.
Cons: substantial scope; needs careful migration so existing data isn't lost; touches code paths well outside the original bug surface.

## Test coverage to add when shipping the fix

A regression test for option (1) should:

1. Seed two settings (or two dungeons) both pointing at the same `npc_id`.
2. Delete the NPC from one of them via the tab path.
3. Assert the other setting/dungeon's stub had `npc_id` cleared (not retained).

This is the exact case the substrate's existing tests don't cover because they exercise `resetStubsForDeletedNPC` in isolation, not the parent-save sequence.

A second test should verify the cross-key paths still work after the fix: deleting from a setting tab still resets dungeon stubs and item stubs. (The current setup happens to do this correctly, but the fix shouldn't regress it.)

## Adjacent work to consider while you're in here

- **Render-time existence checks for setting/dungeon stubs.** `NPCCard` already has `sourceExists(sourceType, sourceId)` for the item case. Adding the equivalent for settings and dungeons would make orphaned stubs self-heal visibly ("(deleted)" marker) instead of silently leading to a missing NPC. Without the fix above, those existence checks would *expose* the clobber bug in production. So either land them together or land the fix first.
- **Auto-cleanup of orphaned stubs on next save.** `saveCurrentNPCToList` already drops `sourceId/sourceName` if the source no longer resolves. The parallel for setting/dungeon stubs doesn't exist — when a stub's `npc_id` no longer resolves, no save path currently clears it. A small `cleanupOrphanedStubs` pass on setting/dungeon load would make the system self-healing without a forced migration.
