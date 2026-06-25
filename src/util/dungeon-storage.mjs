/**
 * dungeon-storage.mjs
 *
 * Dungeon-side helpers for the cross-tool substrate. Read/write directly
 * against the `dungeons` localStorage key — no Vue reactivity, no Pinia,
 * so the helpers are unit-testable in jsdom with just localStorage.
 *
 * Dungeons store NPC stubs in `dungeon.npcs[]` after overview generation.
 * Once a Phase 2 Item → Dungeon flow ships, those stubs may carry a
 * `seeded_from` metadata object — same shape as setting-side stubs. See
 * `setting-storage.mjs` for the parallel implementation.
 */

const STORAGE_KEY = 'dungeons';

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function readDungeons() {
  const parsed = safeParse(localStorage.getItem(STORAGE_KEY), null);
  return Array.isArray(parsed) ? parsed : [];
}

function persistDungeons(dungeons) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dungeons));
}

function getDungeonName(dungeon) {
  return dungeon?.dungeonOverview?.name
    || dungeon?.overview?.name
    || dungeon?.dungeonOverview?.title
    || 'Unnamed Dungeon';
}

/**
 * Build a SeededInput from a dungeon record + the name of one of its NPC
 * stubs. Used when the user clicks "Create NPC" on a stub in the
 * dungeon's NPC tab.
 *
 * If the stub carries `seeded_from`, that metadata is propagated onto the
 * SeededInput entity so the dispatcher can write secondary edges and
 * cross-container back-links on promotion.
 *
 * Returns null if the dungeon or stub cannot be located.
 *
 * @param {Object} params
 * @param {string} params.fromId       - Dungeon id (`dng_${ts}_${rand}`)
 * @param {string} params.entityName   - Name of the NPC stub to seed from
 * @returns {Object|null}
 */
export function buildSeededInputFromDungeon({ fromId, entityName }) {
  if (!fromId || !entityName) return null;
  const dungeons = readDungeons();
  const dungeon = dungeons.find(d => String(d?.id) === String(fromId));
  if (!dungeon || !Array.isArray(dungeon.npcs)) return null;

  const target = entityName.trim().toLowerCase();
  const stub = dungeon.npcs.find(n => (n?.name || '').trim().toLowerCase() === target);
  if (!stub) return null;

  return {
    source: {
      type: 'dungeon',
      id: dungeon.id,
      name: getDungeonName(dungeon),
      description: dungeon.dungeonOverview?.overview || '',
    },
    entities: [{
      type: 'npc',
      name: (stub.name || '').trim(),
      role_or_description: (stub.short_description || stub.description || '').trim(),
      seeded_from: stub.seeded_from || undefined,
    }],
  };
}

/**
 * Update the matching NPC stub in a dungeon with the canonical NPC's id
 * and folder. Called by the writeBack dispatcher after a successful NPC
 * promotion. Idempotent.
 *
 * @param {string} dungeonId
 * @param {string} stubName
 * @param {string} npcId
 * @returns {boolean}
 */
export function linkNPCToDungeonStub(dungeonId, stubName, npcId) {
  if (!dungeonId || !stubName || !npcId) return false;

  const dungeons = readDungeons();
  const dungeon = dungeons.find(d => String(d?.id) === String(dungeonId));
  if (!dungeon || !Array.isArray(dungeon.npcs)) return false;

  const target = stubName.trim().toLowerCase();
  const stub = dungeon.npcs.find(n => (n?.name || '').trim().toLowerCase() === target);
  if (!stub) return false;

  stub.npc_id = npcId;
  // Defensive: legacy stubs may still carry npc_folder until the
  // drop-npc-folder migration runs for this user.
  delete stub.npc_folder;

  persistDungeons(dungeons);
  return true;
}

/**
 * Direction-B sweep: walk every dungeon and update any stub whose
 * `seeded_from` points back at the given (sourceType, sourceId, stubName).
 * Idempotent.
 *
 * @param {string} originSourceType
 * @param {string} originSourceId
 * @param {string} originStubName
 * @param {string} npcId
 * @returns {number}
 */
export function linkNPCToDungeonStubsBySeed(originSourceType, originSourceId, originStubName, npcId) {
  if (!originSourceType || !originSourceId || !originStubName || !npcId) return 0;

  const dungeons = readDungeons();
  let updated = 0;
  const targetStubName = originStubName.trim().toLowerCase();

  for (const dungeon of dungeons) {
    if (!Array.isArray(dungeon?.npcs)) continue;
    for (const stub of dungeon.npcs) {
      const from = stub?.seeded_from;
      if (!from) continue;
      if (from.source_type !== originSourceType) continue;
      if (from.source_id !== originSourceId) continue;
      const fromStub = (from.stub_name || '').trim().toLowerCase();
      if (fromStub !== targetStubName) continue;
      if (stub.npc_id === npcId) continue;
      stub.npc_id = npcId;
      delete stub.npc_folder;
      updated++;
    }
  }

  if (updated > 0) {
    persistDungeons(dungeons);
  }
  return updated;
}

/**
 * Find stubs in any dungeon whose `npc_id` matches the given canonical
 * NPC id.
 *
 * @param {string} npcId
 * @returns {Array<{dungeonId, dungeonName, stubName}>}
 */
export function findDungeonStubsForNPC(npcId) {
  if (!npcId) return [];
  const dungeons = readDungeons();
  const matches = [];
  for (const dungeon of dungeons) {
    if (!dungeon?.id || !Array.isArray(dungeon.npcs)) continue;
    for (const stub of dungeon.npcs) {
      if (stub?.npc_id === npcId) {
        matches.push({
          dungeonId: dungeon.id,
          dungeonName: getDungeonName(dungeon),
          stubName: stub.name,
        });
      }
    }
  }
  return matches;
}

/**
 * Fields produced by the full NPC generation pipeline. Stripped on
 * stub-reset so the entry reverts to its pre-promotion shape and
 * `migrateDungeonNPCsToSharedStorage` can't recreate the canonical the
 * user just deleted. The two skip-rule fields the migration keys on
 * (`read_aloud_description`, `description_of_position`) MUST be in this list.
 */
const NPC_GENERATED_FIELDS = [
  'read_aloud_description',
  'description_of_position',
  'reason_for_being_there',
  'distinctive_feature_or_mannerism',
  'character_secret',
  'character_name',
  'roleplaying_tips',
  'combined_details',
  'npcDescriptionPart1',
  'npcDescriptionPart2',
  'relationships',
  'statblock_name',
  'statblock_folder',
  'statblock_source',
  'statblock_id',
  'detailedDescription',
];

/**
 * Reset every dungeon stub pointing to the given NPC id back to its
 * pre-promotion shape. Counterpart to `findDungeonStubsForNPC`, called
 * when the canonical NPC is deleted.
 *
 * Behavior: drop fields produced by full NPC generation
 * (read_aloud_description, description_of_position, npcDescriptionPart1,
 * statblock pointers, etc.) while preserving whatever stub-shape fields
 * the entry started with — `name`, `short_description` (dungeon-native),
 * `role_or_description` (cross-tool stubs), `seeded_from` (cross-container
 * provenance), and any other non-generated fields. Also clears
 * `npc_id`/`npc_folder`.
 *
 * Why drop the generated fields: `migrateDungeonNPCsToSharedStorage`
 * re-syncs entries with rich content into the canonical store. Without
 * stripping, the next NPCGenerator load recreates the deleted NPC.
 *
 * @param {string} npcId
 * @returns {number}
 */
export function resetDungeonStubsForDeletedNPC(npcId) {
  if (!npcId) return 0;
  const dungeons = readDungeons();
  let resetCount = 0;
  for (const dungeon of dungeons) {
    if (!Array.isArray(dungeon?.npcs)) continue;
    for (const stub of dungeon.npcs) {
      if (stub?.npc_id !== npcId) continue;
      stub.npc_id = null;
      delete stub.npc_folder;
      for (const field of NPC_GENERATED_FIELDS) {
        delete stub[field];
      }
      resetCount++;
    }
  }
  if (resetCount > 0) {
    persistDungeons(dungeons);
  }
  return resetCount;
}

/**
 * Display name for a dungeon, resolved live from storage by id.
 *
 * Returns null when no dungeon matches (caller falls back to whatever
 * stale string it has stored on the stub). Used by cross-tool stub
 * renderers so a dungeon rename in `OverviewTab.saveEdit` flows through
 * to the item-side stub at the next render — the substrate's design
 * principle "dungeons/settings: identity is the id, display reads live"
 * made concrete.
 *
 * @param {string} dungeonId
 * @returns {string|null}
 */
export function getDungeonDisplayName(dungeonId) {
  if (!dungeonId) return null;
  const dungeons = readDungeons();
  const dungeon = dungeons.find(d => String(d?.id) === String(dungeonId));
  if (!dungeon) return null;
  return getDungeonName(dungeon);
}

/**
 * Clear the denormalized source-provenance fields on every dungeon
 * whose `sourceType` / `sourceId` points at the given source entity.
 * Called when the source entity is deleted (e.g., an item is removed
 * in the Item Generator) so the dungeon card's "Inspired by [X]" link
 * doesn't keep referring to a gone-source on the persisted record.
 *
 * Render-time check in OverviewTab.vue (`sourceMissing` via
 * `sourceExists`) already suppresses the link and renders a "(deleted)"
 * marker — this helper makes the cleanup persistent, so a subsequent
 * save doesn't have to drop the stale fields on its own. Mirrors
 * `resetSettingSourceForDeletedEntity` in `setting-storage.mjs`.
 *
 * Tool-references graph cleanup is handled separately by
 * `removeReferencesForEntity` — this only touches denormalized fields.
 *
 * @param {string} sourceType - 'item' | 'dungeon' | 'setting' | …
 * @param {string} sourceId
 * @returns {number} count of dungeons cleared
 */
export function resetDungeonSourceForDeletedEntity(sourceType, sourceId) {
  if (!sourceType || !sourceId) return 0;
  const dungeons = readDungeons();
  let resetCount = 0;
  for (const dungeon of dungeons) {
    if (dungeon?.sourceType !== sourceType) continue;
    if (dungeon.sourceId !== sourceId) continue;
    delete dungeon.sourceType;
    delete dungeon.sourceId;
    delete dungeon.sourceName;
    // `seedMode` is part of the same provenance group on item-seeded
    // dungeons; drop it too so we don't leave orphan metadata.
    delete dungeon.seedMode;
    resetCount++;
  }
  if (resetCount > 0) {
    persistDungeons(dungeons);
  }
  return resetCount;
}

/**
 * Propagate a dungeon RENAME to the denormalized display-name caches that point
 * at it. Dungeons use a stable `id`, so linkage never breaks — but the cached
 * NAMES in other stores go stale without this. Mirrors `renameSettingReferences`
 * in `setting-storage.mjs` (dungeons have no `related_places`, so that branch is
 * omitted). Call from the dungeon overview's saveEdit when the name changes.
 *
 * Updates:
 *   1. Items' `related_dungeons[].name` stubs (matched by `dungeon_id`).
 *   2. `tool-references` edges where the dungeon is source or target.
 *   3. Dungeon-sourced NPCs' denormalized `sourceName`.
 *
 * @param {string} dungeonId
 * @param {string} newName
 * @returns {{ totalUpdated: number }}
 */
export function renameDungeonReferences(dungeonId, newName) {
  if (!dungeonId || typeof newName !== 'string') return { totalUpdated: 0 };
  let totalUpdated = 0;

  // 1. Items' related_dungeons[] stubs.
  const itemsRaw = localStorage.getItem('savedItems');
  if (itemsRaw) {
    let items;
    try {
      items = JSON.parse(itemsRaw);
    } catch {
      items = null;
    }
    if (Array.isArray(items)) {
      let changed = false;
      for (const item of items) {
        if (!Array.isArray(item?.related_dungeons)) continue;
        for (const stub of item.related_dungeons) {
          if (String(stub?.dungeon_id) === String(dungeonId) && stub.name !== newName) {
            stub.name = newName;
            totalUpdated++;
            changed = true;
          }
        }
      }
      if (changed) localStorage.setItem('savedItems', JSON.stringify(items));
    }
  }

  // 2. Reference graph edges where this dungeon is source or target.
  const refsRaw = localStorage.getItem('tool-references');
  if (refsRaw) {
    let refs;
    try {
      refs = JSON.parse(refsRaw);
    } catch {
      refs = null;
    }
    if (refs && typeof refs === 'object') {
      let changed = false;
      for (const ref of Object.values(refs)) {
        if (ref?.target_type === 'dungeon' && String(ref.target_id) === String(dungeonId)
            && ref.target_name !== newName) {
          ref.target_name = newName;
          totalUpdated++;
          changed = true;
        }
        if (ref?.source_type === 'dungeon' && String(ref.source_id) === String(dungeonId)
            && ref.source_name !== newName) {
          ref.source_name = newName;
          totalUpdated++;
          changed = true;
        }
      }
      if (changed) localStorage.setItem('tool-references', JSON.stringify(refs));
    }
  }

  // 3. NPCs whose source provenance points at this dungeon.
  const npcsRaw = localStorage.getItem('npcGeneratorNPCs');
  if (npcsRaw) {
    let npcs;
    try {
      npcs = JSON.parse(npcsRaw);
    } catch {
      npcs = null;
    }
    if (npcs && typeof npcs === 'object') {
      let changed = false;
      for (const folder of Object.values(npcs)) {
        if (!Array.isArray(folder)) continue;
        for (const npc of folder) {
          if (npc?.sourceType !== 'dungeon' || String(npc.sourceId) !== String(dungeonId)) continue;
          const oldName = npc.sourceName;
          if (npc.sourceName !== newName) {
            npc.sourceName = newName;
            totalUpdated++;
            changed = true;
          }
          // For dungeon-sourced NPCs typeOfPlace mirrors the dungeon name (it's
          // the subtitle "origin"). Keep it in sync when it still holds the old
          // name, so the card doesn't read "Old · From New".
          if (npc.typeOfPlace === oldName && npc.typeOfPlace !== newName) {
            npc.typeOfPlace = newName;
            changed = true;
          }
        }
      }
      if (changed) localStorage.setItem('npcGeneratorNPCs', JSON.stringify(npcs));
    }
  }

  return { totalUpdated };
}
