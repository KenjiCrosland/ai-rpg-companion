/**
 * rename-npc-item-fields.mjs
 *
 * One-shot migration that promotes the persisted NPC shape from the old
 * item-specific `itemName` field to the generic `sourceId` + `sourceName`
 * pair, so every source-tagged NPC has the same persisted shape regardless
 * of source type.
 *
 *   Before: { sourceType: 'item', itemName: 'Krovnik\'s Hearthstaff' }
 *   After:  { sourceType: 'item', sourceId: 'Krovnik\'s Hearthstaff',
 *                                  sourceName: 'Krovnik\'s Hearthstaff' }
 *
 * NPCs with a sourceType other than 'item' are left untouched (their data
 * is already source-agnostic — they just don't carry an `itemName`).
 *
 * NPCs with `sourceType === 'item'` but no `itemName` are logged and
 * skipped — they have nothing to migrate, and inventing a value would
 * silently corrupt the reference graph.
 *
 * Registered with `migration-runner.mjs` to run after
 * `extract-existing-references` and before any other reference-touching
 * migration. Idempotent: running twice is a no-op because the second pass
 * finds no records still carrying `itemName`.
 */

const NPCS_KEY = 'npcGeneratorNPCs';

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function renameNPCItemFields() {
  const npcs = safeParse(localStorage.getItem(NPCS_KEY), null);
  if (!npcs || typeof npcs !== 'object') return;

  let migrated = 0;
  let skipped = 0;
  let changed = false;

  for (const folderName in npcs) {
    const folder = npcs[folderName];
    if (!Array.isArray(folder)) continue;

    for (const npc of folder) {
      if (!npc || npc.sourceType !== 'item') continue;
      // Already migrated — leave alone.
      if (npc.sourceId || npc.sourceName) {
        if (npc.itemName !== undefined) {
          delete npc.itemName;
          changed = true;
        }
        continue;
      }
      // Item-sourced NPC missing its itemName field — log and skip rather
      // than guess.
      if (!npc.itemName) {
        const id = npc.npc_id || npc.id || '(no id)';
        const name = npc.npcDescriptionPart1?.character_name || '(unknown)';
        console.warn(
          `rename-npc-item-fields: skipping item-sourced NPC ${id} "${name}" — no itemName to migrate`
        );
        skipped++;
        continue;
      }

      npc.sourceId = npc.itemName;
      npc.sourceName = npc.itemName;
      delete npc.itemName;
      migrated++;
      changed = true;
    }
  }

  if (changed) {
    localStorage.setItem(NPCS_KEY, JSON.stringify(npcs));
  }

  console.log(
    `rename-npc-item-fields: migrated ${migrated}, skipped ${skipped}`
  );
}
