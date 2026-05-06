/**
 * drop-npc-folder.mjs
 *
 * One-shot migration that removes the `npc_folder` denormalization from
 * every cross-tool stub.
 *
 * The field was a hint — "the canonical NPC lives in this folder" — that
 * became dead weight once the lookup paths started walking all folders
 * by `npc_id`. The denormalization had two failure modes:
 *
 *   1. The user moved the canonical NPC to a different folder. The stub's
 *      `npc_folder` still pointed at the old folder. Lookups keyed on it
 *      missed the canonical entirely.
 *   2. The substrate had to keep the cache in sync on every promotion,
 *      every cross-container writeBack, every reset.
 *
 * Folder organization is the user's; cross-tool linkage is by `npc_id`.
 * This migration drops the field from existing data; the substrate's
 * link* / reset* writers also stop populating it.
 *
 * Walks three stores:
 *   - gameSettings[*].npcs[*]
 *   - dungeons[*].npcs[*]
 *   - savedItems[*].related_npcs[*]
 */

const STORES = [
  { key: 'gameSettings', stubArrays: (parsed) => parsed.map(s => s?.npcs).filter(Array.isArray) },
  { key: 'dungeons',     stubArrays: (parsed) => parsed.map(d => d?.npcs).filter(Array.isArray) },
  { key: 'savedItems',   stubArrays: (parsed) => parsed.map(i => i?.related_npcs).filter(Array.isArray) },
];

export function dropNPCFolder() {
  for (const { key, stubArrays } of STORES) {
    let raw;
    try {
      raw = localStorage.getItem(key);
    } catch (error) {
      console.warn(`drop-npc-folder: failed to read ${key}:`, error);
      continue;
    }
    if (!raw) continue;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      console.warn(`drop-npc-folder: failed to parse ${key}, skipping:`, error);
      continue;
    }
    if (!Array.isArray(parsed)) continue;

    let modified = false;
    for (const stubs of stubArrays(parsed)) {
      for (const stub of stubs) {
        if (stub && Object.prototype.hasOwnProperty.call(stub, 'npc_folder')) {
          delete stub.npc_folder;
          modified = true;
        }
      }
    }

    if (modified) {
      try {
        localStorage.setItem(key, JSON.stringify(parsed));
      } catch (error) {
        console.warn(`drop-npc-folder: failed to write ${key}:`, error);
      }
    }
  }
}
