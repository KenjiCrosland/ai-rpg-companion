/**
 * promote-npc-id.mjs
 *
 * One-shot migration that finishes the long-deferred `id` → `npc_id`
 * normalization on NPC records.
 *
 * Background: at some point the project switched from `npc.id` to
 * `npc.npc_id` for cross-tool linkage (mirrors `dng_*`, `set_*`, etc.).
 * The earlier `migrateNPCIds` only generated fresh ids for NPCs lacking
 * BOTH fields; it never promoted legacy `id` values up to `npc_id`. The
 * result was a codebase peppered with `n.npc_id === x || n.id === x`
 * defensive reads — every reader had to remember to check both shapes,
 * and the substrate's "stable npc_id" contract was honored by accident
 * rather than by data.
 *
 * This migration:
 *   - For every NPC (canonical store, dungeon stubs, setting stubs,
 *     item stubs), if `id` is set and `npc_id` is empty, set
 *     `npc_id = id` (promote).
 *   - Then delete `npc.id` regardless. `npc_id` is canonical from this
 *     point forward.
 *
 * After this migration ships, every `|| n.id` / `|| npc.id` fallback in
 * the codebase becomes deletable. Any future code that wants the NPC's
 * id reads `npc.npc_id` and only that.
 *
 * `tool-references` doesn't need rewriting because `addReference` always
 * stored whatever value `npc.npc_id || npc.id` resolved to as the
 * canonical id. After promotion that value still matches; the field
 * name on the NPC just changed, not the id string itself.
 */

const NPCS_KEY = 'npcGeneratorNPCs';
const DUNGEONS_KEY = 'dungeons';
const SETTINGS_KEY = 'gameSettings';
const ITEMS_KEY = 'savedItems';

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * Promote `id` → `npc_id` and drop `id` on a single NPC-like record.
 * Returns true when the record was modified.
 */
function promoteOne(record) {
  if (!record || typeof record !== 'object') return false;
  let changed = false;
  if (!record.npc_id && record.id) {
    record.npc_id = record.id;
    changed = true;
  }
  if ('id' in record) {
    delete record.id;
    changed = true;
  }
  return changed;
}

export function promoteNPCIds() {
  let promotedCount = 0;
  let droppedCount = 0;

  const recordResult = (before, record) => {
    const hadLegacyId = !!before.id && !before.npc_id;
    const droppedId = 'id' in before;
    if (hadLegacyId) promotedCount++;
    else if (droppedId) droppedCount++;
  };

  // Canonical store: npcGeneratorNPCs[folder][i]
  const npcs = safeParse(localStorage.getItem(NPCS_KEY), null);
  if (npcs && typeof npcs === 'object') {
    let changed = false;
    for (const folderName in npcs) {
      const folder = npcs[folderName];
      if (!Array.isArray(folder)) continue;
      for (const npc of folder) {
        const before = { id: npc?.id, npc_id: npc?.npc_id };
        if (promoteOne(npc)) {
          recordResult(before, npc);
          changed = true;
        }
      }
    }
    if (changed) localStorage.setItem(NPCS_KEY, JSON.stringify(npcs));
  }

  // Dungeon NPC entries: dungeons[i].npcs[j]
  const dungeons = safeParse(localStorage.getItem(DUNGEONS_KEY), null);
  if (Array.isArray(dungeons)) {
    let changed = false;
    for (const dungeon of dungeons) {
      if (!Array.isArray(dungeon?.npcs)) continue;
      for (const npc of dungeon.npcs) {
        const before = { id: npc?.id, npc_id: npc?.npc_id };
        if (promoteOne(npc)) {
          recordResult(before, npc);
          changed = true;
        }
      }
    }
    if (changed) localStorage.setItem(DUNGEONS_KEY, JSON.stringify(dungeons));
  }

  // Setting NPC entries: gameSettings[i].npcs[j]
  const settings = safeParse(localStorage.getItem(SETTINGS_KEY), null);
  if (Array.isArray(settings)) {
    let changed = false;
    for (const setting of settings) {
      if (!Array.isArray(setting?.npcs)) continue;
      for (const npc of setting.npcs) {
        const before = { id: npc?.id, npc_id: npc?.npc_id };
        if (promoteOne(npc)) {
          recordResult(before, npc);
          changed = true;
        }
      }
    }
    if (changed) localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  // Item-stub records: savedItems[i].related_npcs[j]. These are
  // post-substrate stubs that should never have had `id`, but a defensive
  // pass costs nothing and protects against any imports / hand-edits that
  // accidentally introduced the legacy field.
  const items = safeParse(localStorage.getItem(ITEMS_KEY), null);
  if (Array.isArray(items)) {
    let changed = false;
    for (const item of items) {
      if (!Array.isArray(item?.related_npcs)) continue;
      for (const stub of item.related_npcs) {
        const before = { id: stub?.id, npc_id: stub?.npc_id };
        if (promoteOne(stub)) {
          recordResult(before, stub);
          changed = true;
        }
      }
    }
    if (changed) localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }

  if (promotedCount > 0 || droppedCount > 0) {
    // eslint-disable-next-line no-console
    console.log(`promote-npc-id: promoted ${promotedCount} legacy ids, dropped ${droppedCount} duplicate id fields.`);
  }
}
