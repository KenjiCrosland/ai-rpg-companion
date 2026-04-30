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
 * @param {string} npcFolder
 * @returns {boolean}
 */
export function linkNPCToDungeonStub(dungeonId, stubName, npcId, npcFolder) {
  if (!dungeonId || !stubName || !npcId) return false;

  const dungeons = readDungeons();
  const dungeon = dungeons.find(d => String(d?.id) === String(dungeonId));
  if (!dungeon || !Array.isArray(dungeon.npcs)) return false;

  const target = stubName.trim().toLowerCase();
  const stub = dungeon.npcs.find(n => (n?.name || '').trim().toLowerCase() === target);
  if (!stub) return false;

  stub.npc_id = npcId;
  stub.npc_folder = npcFolder || 'Uncategorized';

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
 * @param {string} npcFolder
 * @returns {number}
 */
export function linkNPCToDungeonStubsBySeed(originSourceType, originSourceId, originStubName, npcId, npcFolder) {
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
      if (stub.npc_id === npcId && stub.npc_folder === (npcFolder || 'Uncategorized')) continue;
      stub.npc_id = npcId;
      stub.npc_folder = npcFolder || 'Uncategorized';
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
 * Reset every dungeon stub pointing to the given NPC id back to the
 * unpromoted state. Stub is preserved; only the promotion link clears.
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
      if (stub?.npc_id === npcId) {
        stub.npc_id = null;
        stub.npc_folder = null;
        resetCount++;
      }
    }
  }
  if (resetCount > 0) {
    persistDungeons(dungeons);
  }
  return resetCount;
}
