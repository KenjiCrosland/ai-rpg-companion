/**
 * setting-storage.mjs
 *
 * Setting-side helpers for the cross-tool substrate. Read/write directly
 * against the `gameSettings` localStorage key — no Vue reactivity, no
 * Pinia, so the helpers are unit-testable in jsdom with just localStorage.
 *
 * Settings store NPC stubs in `setting.npcs[]` after overview generation.
 * Once a Phase 2 Item → Setting flow ships, those stubs may carry a
 * `seeded_from` metadata object whose `source_type` / `source_id` /
 * `stub_name` let promotion of the stub trace back to the originating
 * tool's stub (so cross-container back-link writes can fire).
 */

const STORAGE_KEY = 'gameSettings';

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function readSettings() {
  const parsed = safeParse(localStorage.getItem(STORAGE_KEY), null);
  return Array.isArray(parsed) ? parsed : [];
}

function persistSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

/**
 * Build a SeededInput from a setting record + the name of one of its NPC
 * stubs. Used when the user clicks "Create NPC" on a stub in the setting's
 * NPC tab.
 *
 * If the stub carries `seeded_from` (because it was originally seeded from
 * an item or another tool), that metadata is propagated onto the SeededInput
 * entity so the dispatcher can write secondary edges and cross-container
 * back-links on promotion.
 *
 * Returns null if the setting or stub cannot be located.
 *
 * @param {Object} params
 * @param {string} params.fromId       - Setting id (`set_${ts}_${rand}`)
 * @param {string} params.entityName   - Name of the NPC stub to seed from
 * @returns {Object|null}
 */
export function buildSeededInputFromSetting({ fromId, entityName }) {
  if (!fromId || !entityName) return null;
  const settings = readSettings();
  const setting = settings.find(s => s?.id === fromId);
  if (!setting || !Array.isArray(setting.npcs)) return null;

  const target = entityName.trim().toLowerCase();
  const stub = setting.npcs.find(n => (n?.name || '').trim().toLowerCase() === target);
  if (!stub) return null;

  return {
    source: {
      type: 'setting',
      id: setting.id,
      name: setting.place_name || 'Unnamed Setting',
      description: setting.setting_overview?.overview || '',
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
 * Update the matching NPC stub in a setting with the canonical NPC's id
 * and folder. Called by the writeBack dispatcher after a successful NPC
 * promotion. Idempotent.
 *
 * @param {string} settingId
 * @param {string} stubName
 * @param {string} npcId
 * @param {string} npcFolder
 * @returns {boolean} true if a stub was updated, false otherwise
 */
export function linkNPCToSettingStub(settingId, stubName, npcId, npcFolder) {
  if (!settingId || !stubName || !npcId) return false;

  const settings = readSettings();
  const setting = settings.find(s => s?.id === settingId);
  if (!setting || !Array.isArray(setting.npcs)) return false;

  const target = stubName.trim().toLowerCase();
  const stub = setting.npcs.find(n => (n?.name || '').trim().toLowerCase() === target);
  if (!stub) return false;

  stub.npc_id = npcId;
  stub.npc_folder = npcFolder || 'Uncategorized';

  persistSettings(settings);
  return true;
}

/**
 * Direction-B sweep: walk every setting and update any stub whose
 * `seeded_from` points back at the given (sourceType, sourceId, stubName).
 * Called by source-side writeBack handlers (e.g., the item writeBack)
 * after they update their own stub, so settings that share the seed
 * also reflect the promotion.
 *
 * Idempotent — safe to call repeatedly.
 *
 * @param {string} originSourceType
 * @param {string} originSourceId
 * @param {string} originStubName
 * @param {string} npcId
 * @param {string} npcFolder
 * @returns {number} count of setting stubs updated
 */
export function linkNPCToSettingStubsBySeed(originSourceType, originSourceId, originStubName, npcId, npcFolder) {
  if (!originSourceType || !originSourceId || !originStubName || !npcId) return 0;

  const settings = readSettings();
  let updated = 0;
  const targetStubName = originStubName.trim().toLowerCase();

  for (const setting of settings) {
    if (!Array.isArray(setting?.npcs)) continue;
    for (const stub of setting.npcs) {
      const from = stub?.seeded_from;
      if (!from) continue;
      if (from.source_type !== originSourceType) continue;
      if (from.source_id !== originSourceId) continue;
      const fromStub = (from.stub_name || '').trim().toLowerCase();
      if (fromStub !== targetStubName) continue;
      // Skip if already pointing at this npc — keeps the operation idempotent.
      if (stub.npc_id === npcId && stub.npc_folder === (npcFolder || 'Uncategorized')) continue;
      stub.npc_id = npcId;
      stub.npc_folder = npcFolder || 'Uncategorized';
      updated++;
    }
  }

  if (updated > 0) {
    persistSettings(settings);
  }
  return updated;
}

/**
 * Find stubs in any setting whose `npc_id` matches the given canonical
 * NPC id. Used by the dispatcher to enumerate stubs that point at an NPC
 * being deleted, so the "Create NPC" affordance returns where the user
 * sees the stub.
 *
 * @param {string} npcId
 * @returns {Array<{settingId, settingName, stubName}>}
 */
export function findSettingStubsForNPC(npcId) {
  if (!npcId) return [];
  const settings = readSettings();
  const matches = [];
  for (const setting of settings) {
    if (!setting?.id || !Array.isArray(setting.npcs)) continue;
    for (const stub of setting.npcs) {
      if (stub?.npc_id === npcId) {
        matches.push({
          settingId: setting.id,
          settingName: setting.place_name || 'Unnamed Setting',
          stubName: stub.name,
        });
      }
    }
  }
  return matches;
}

/**
 * Reset every setting stub pointing to the given NPC id back to the
 * unpromoted state (`npc_id: null`, `npc_folder: null`). Counterpart to
 * `findSettingStubsForNPC`, called when the canonical NPC is deleted.
 *
 * The stub itself is preserved (its `seeded_from` provenance and name
 * stay intact); only the promotion link is cleared.
 *
 * @param {string} npcId
 * @returns {number} count of stubs reset
 */
export function resetSettingStubsForDeletedNPC(npcId) {
  if (!npcId) return 0;
  const settings = readSettings();
  let resetCount = 0;
  for (const setting of settings) {
    if (!Array.isArray(setting?.npcs)) continue;
    for (const stub of setting.npcs) {
      if (stub?.npc_id === npcId) {
        stub.npc_id = null;
        stub.npc_folder = null;
        resetCount++;
      }
    }
  }
  if (resetCount > 0) {
    persistSettings(settings);
  }
  return resetCount;
}
