/**
 * item-storage.mjs
 *
 * Shared item storage utilities for the Item Generator and cross-tool integrations.
 * Items live in a flat array under localStorage key `savedItems`, deduplicated by name.
 *
 * The reference graph identity for an item is its name (item names are unique per user
 * because the Item Generator's save path deduplicates by name).
 */

import { addReference, getReferencesForEntity, removeReferencesForEntity, referenceExists } from './reference-storage.mjs';
import { detectRegisterFromInput } from '@/shared/detect-register-from-input.mjs';
import { registerList } from '@/shared/register-list.mjs';

const STORAGE_KEY = 'savedItems';

/**
 * Read all saved items.
 * @returns {Array<Object>}
 */
export function getAllItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Corrupted savedItems detected, starting fresh:', error);
    return [];
  }
}

/**
 * Save the items array back to localStorage and dispatch a same-tab update event.
 * @param {Array<Object>} items
 */
function persistItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('saved-items-updated', {
    detail: { count: items.length }
  }));
}

/**
 * Tokenize a name for cross-tool stub matching. Lowercases, trims,
 * strips a leading "the " article, and splits on whitespace. Internal
 * punctuation stays attached to tokens ("Stonemother's" stays one
 * token) so possessives don't false-positive against the bare noun.
 *
 * Returns an array of tokens (possibly empty).
 */
function tokenizeForMatch(name) {
  if (typeof name !== 'string') return [];
  const stripped = name.trim().toLowerCase().replace(/^the\s+/, '');
  if (!stripped) return [];
  return stripped.split(/\s+/).filter(Boolean);
}

/**
 * Leading-word match: returns true if the shorter token sequence is
 * an exact leading prefix of the longer one (after the
 * tokenizeForMatch normalization). Symmetric — either argument can
 * be the shorter one.
 *
 * Behavior:
 *   - "Stonemother" matches "Stonemother range"  (leading subset)
 *   - "the Stonemother" matches "Stonemother"    ("the" stripped → equal)
 *   - "Stonemother range" does NOT match "Range of Stonemother"
 *   - "Stonemother" does NOT match "Stonemother's Daughter"
 *     (possessive 's stays on the first token, so the tokens differ)
 *   - case-insensitive; whitespace-tolerant
 *
 * Used to wire the cross-tool back-link when an extracted or manually-
 * added related-place stub doesn't match an item-side stub exactly
 * (e.g. user types "Stonemother range" while the item has "Stonemother").
 *
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
export function leadingWordMatch(a, b) {
  const tokensA = tokenizeForMatch(a);
  const tokensB = tokenizeForMatch(b);
  if (tokensA.length === 0 || tokensB.length === 0) return false;
  const [shorter, longer] = tokensA.length <= tokensB.length
    ? [tokensA, tokensB]
    : [tokensB, tokensA];
  for (let i = 0; i < shorter.length; i++) {
    if (shorter[i] !== longer[i]) return false;
  }
  return true;
}

/**
 * Find a stub on the given item whose name leading-word-matches the
 * candidate name. Returns the matching stub object (with original
 * casing preserved on its `name` field) or null.
 *
 * When multiple stubs match (rare — usually a misclick or fuzzy
 * import), prefer the SHORTEST stub name. Item-side stub names are
 * typically the canonical short form ("Stonemother" over "the
 * Stonemother range"), so shortest-match resolves toward the
 * canonical identity.
 *
 * @param {string} itemName       - the item's name (item identity)
 * @param {string} candidateName  - the name from the related-place stub
 *                                  on a setting that wants to back-link
 * @returns {Object|null}
 */
export function findItemStubMatchingName(itemName, candidateName) {
  if (!itemName || !candidateName) return null;
  const item = getItemFromStorage(itemName);
  if (!item || !Array.isArray(item.related_settings)) return null;
  let best = null;
  let bestLen = Infinity;
  for (const stub of item.related_settings) {
    if (!stub || typeof stub.name !== 'string') continue;
    if (!leadingWordMatch(stub.name, candidateName)) continue;
    if (stub.name.length < bestLen) {
      best = stub;
      bestLen = stub.name.length;
    }
  }
  return best;
}

/**
 * Find an item by name.
 * @param {string} name
 * @returns {Object|null}
 */
export function getItemFromStorage(name) {
  if (!name) return null;
  const items = getAllItems();
  return items.find(i => i?.name === name) || null;
}

/**
 * Save (insert or update) an item by name.
 * @param {Object} item
 */
export function saveItemToStorage(item) {
  if (!item?.name) return;
  const items = getAllItems();
  const idx = items.findIndex(i => i?.name === item.name);
  if (idx === -1) {
    items.push(item);
  } else {
    items[idx] = item;
  }
  persistItems(items);
}

/**
 * Update the matching related-setting stub on an item with the canonical
 * Setting's id. Called by the Setting Generator after it finishes a
 * generation that was triggered from an item-card "Create Setting" action.
 *
 * Matches the stub by stubName (case-insensitive). No-op if item or stub
 * doesn't exist. Idempotent.
 *
 * @param {string} itemName
 * @param {string} stubName
 * @param {string} settingId
 * @returns {boolean} true if a stub was updated, false otherwise
 */
export function linkSettingToItemStub(itemName, stubName, settingId) {
  if (!itemName || !stubName || !settingId) return false;

  const items = getAllItems();
  const item = items.find(i => i?.name === itemName);
  if (!item || !Array.isArray(item.related_settings)) return false;

  const target = stubName.trim().toLowerCase();
  const stub = item.related_settings.find(
    s => (s?.name || '').trim().toLowerCase() === target
  );
  if (!stub) return false;

  stub.setting_id = settingId;
  persistItems(items);
  return true;
}

/**
 * Add a setting stub to an item's related_settings, for the case
 * where a downstream setting inherits item provenance from its
 * parent (e.g., a sublocation of an item-inspired setting). Without
 * this, the item card only knows about settings the LLM named in the
 * item's own lore; manually-added descendants never surface.
 *
 * Idempotent, two-pass:
 *   1. NAME MATCH (preferred). If the item already has a stub with
 *      the same name (case-insensitive trim), update its setting_id
 *      via linkSettingToItemStub — handles the "lore extraction
 *      surfaced this name first, descent creation came later"
 *      ordering. Returns true.
 *   2. ID MATCH. If any existing stub already points at this
 *      setting_id, no-op — defensive against a duplicate fire.
 *   3. PUSH. Otherwise add a fresh stub with no source_quote. The
 *      absence of source_quote is the only data-layer distinction
 *      between lore-extracted and descendant-added stubs; the UI
 *      can use it later to render them differently if needed.
 *
 * @param {string} itemName
 * @param {Object} stub
 * @param {string} stub.settingId   - the new setting's id
 * @param {string} stub.settingName - the new setting's place_name
 *                                    (used as the stub's display name)
 * @param {string} [stub.roleBrief] - optional role descriptor lifted
 *                                    from the source related_places stub
 * @returns {boolean} true if a stub was added or updated
 */
export function addSettingStubToItem(itemName, { settingId, settingName, roleBrief = '' } = {}) {
  if (!itemName || !settingId || !settingName) return false;

  // 1. Name-match preferred path: lore extraction may have surfaced
  // this name first; update that stub's setting_id rather than
  // duplicate. linkSettingToItemStub returns true when a name-match
  // succeeded and the setting_id was written.
  if (linkSettingToItemStub(itemName, settingName, settingId)) {
    return true;
  }

  const items = getAllItems();
  const item = items.find(i => i?.name === itemName);
  if (!item) return false;

  if (!Array.isArray(item.related_settings)) {
    item.related_settings = [];
  }

  // 2. Id-match defensive check: a previous fire might have added
  // this exact setting_id under a different name (e.g., the setting
  // was renamed after promotion). No-op rather than push a duplicate.
  if (item.related_settings.some(s => s?.setting_id === settingId)) {
    return false;
  }

  // 3. Push fresh stub. No source_quote — this stub didn't come from
  // the item's own lore. The item card can render it identically to
  // lore-extracted stubs for now; a visual distinction can land later
  // by checking for the absence of source_quote.
  item.related_settings.push({
    name: settingName,
    setting_id: settingId,
    role_brief: roleBrief,
  });
  persistItems(items);
  return true;
}

/**
 * Walk savedItems and find any items whose `related_settings` contain a
 * stub pointing to the given setting id. Used during setting deletion to
 * roll back item-side stub links so the source item's UI returns to
 * "Create Setting".
 *
 * @param {string} settingId
 * @returns {Array<{itemName: string, stubName: string}>}
 */
export function findItemStubsForSetting(settingId) {
  if (!settingId) return [];
  const items = getAllItems();
  const matches = [];
  for (const item of items) {
    if (!item?.name || !Array.isArray(item.related_settings)) continue;
    for (const stub of item.related_settings) {
      if (stub?.setting_id === settingId) {
        matches.push({ itemName: item.name, stubName: stub.name });
      }
    }
  }
  return matches;
}

/**
 * Reset any item stubs pointing to the given setting id back to the
 * unpromoted state (`setting_id: null`). Mirrors
 * `resetItemStubsForDeletedNPC`. Call when a setting is deleted so the
 * source item's UI reverts to "Create Setting" instead of "View in
 * Setting Generator" with a dead link.
 *
 * @param {string} settingId
 * @returns {number} count of stubs reset
 */
export function resetItemStubsForDeletedSetting(settingId) {
  if (!settingId) return 0;
  const items = getAllItems();
  let resetCount = 0;
  for (const item of items) {
    if (!Array.isArray(item?.related_settings)) continue;
    for (const stub of item.related_settings) {
      if (stub?.setting_id === settingId) {
        stub.setting_id = null;
        resetCount++;
      }
    }
  }
  if (resetCount > 0) {
    persistItems(items);
  }
  return resetCount;
}

// ============================================================
// Dungeon-side parallels — same shape and semantics as the
// setting helpers above, but operating on `related_dungeons[]`
// with `dungeon_id` as the promotion-link field.
// ============================================================

/**
 * Find the matching related-dungeon stub on an item by case-insensitive
 * name, and update its `dungeon_id`. Mirrors `linkSettingToItemStub`.
 * No-op if the item doesn't exist, has no `related_dungeons`, or no
 * stub name matches. Idempotent.
 *
 * @param {string} itemName
 * @param {string} stubName
 * @param {string} dungeonId
 * @returns {boolean} true if a stub was updated, false otherwise
 */
export function linkDungeonToItemStub(itemName, stubName, dungeonId) {
  if (!itemName || !stubName || !dungeonId) return false;

  const items = getAllItems();
  const item = items.find(i => i?.name === itemName);
  if (!item || !Array.isArray(item.related_dungeons)) return false;

  const target = stubName.trim().toLowerCase();
  const stub = item.related_dungeons.find(
    s => (s?.name || '').trim().toLowerCase() === target
  );
  if (!stub) return false;

  stub.dungeon_id = dungeonId;
  persistItems(items);
  return true;
}

/**
 * Add a dungeon stub to an item's related_dungeons. Used when the
 * dungeon-side finalize hook needs to record a back-link but no
 * existing stub matches by name — typically the whole-item fallback
 * path (no `entityName` was passed; the dungeon's own generated name
 * becomes the stub's name).
 *
 * Mirrors `addSettingStubToItem`'s two-pass:
 *   1. Try linkDungeonToItemStub by name first.
 *   2. Defensive id-match — no-op if a stub already points at this dungeon_id.
 *   3. Otherwise push a fresh stub with no source_quote (signals
 *      "didn't come from this item's own lore extraction").
 *
 * @param {string} itemName
 * @param {Object} stub
 * @param {string} stub.dungeonId
 * @param {string} stub.dungeonName
 * @param {string} [stub.roleBrief]
 * @returns {boolean} true if a stub was added or updated
 */
export function addDungeonStubToItem(itemName, { dungeonId, dungeonName, roleBrief = '' } = {}) {
  if (!itemName || !dungeonId || !dungeonName) return false;

  if (linkDungeonToItemStub(itemName, dungeonName, dungeonId)) {
    return true;
  }

  const items = getAllItems();
  const item = items.find(i => i?.name === itemName);
  if (!item) return false;

  if (!Array.isArray(item.related_dungeons)) {
    item.related_dungeons = [];
  }

  if (item.related_dungeons.some(s => s?.dungeon_id === dungeonId)) {
    return false;
  }

  item.related_dungeons.push({
    name: dungeonName,
    dungeon_id: dungeonId,
    role_brief: roleBrief,
  });
  persistItems(items);
  return true;
}

/**
 * Walk savedItems and find any items whose `related_dungeons` contain
 * a stub pointing to the given dungeon id. Used during dungeon
 * deletion to roll back item-side stub links so the source item's UI
 * returns to "Create Dungeon".
 *
 * @param {string} dungeonId
 * @returns {Array<{itemName: string, stubName: string}>}
 */
export function findItemStubsForDungeon(dungeonId) {
  if (!dungeonId) return [];
  const items = getAllItems();
  const matches = [];
  for (const item of items) {
    if (!item?.name || !Array.isArray(item.related_dungeons)) continue;
    for (const stub of item.related_dungeons) {
      if (stub?.dungeon_id === dungeonId) {
        matches.push({ itemName: item.name, stubName: stub.name });
      }
    }
  }
  return matches;
}

/**
 * Reset any item stubs pointing to the given dungeon id back to the
 * unpromoted state (`dungeon_id: null`). Mirrors
 * `resetItemStubsForDeletedSetting`. Call when a dungeon is deleted
 * so the source item's UI reverts to "Create Dungeon".
 *
 * @param {string} dungeonId
 * @returns {number} count of stubs reset
 */
export function resetItemStubsForDeletedDungeon(dungeonId) {
  if (!dungeonId) return 0;
  const items = getAllItems();
  let resetCount = 0;
  for (const item of items) {
    if (!Array.isArray(item?.related_dungeons)) continue;
    for (const stub of item.related_dungeons) {
      if (stub?.dungeon_id === dungeonId) {
        stub.dungeon_id = null;
        resetCount++;
      }
    }
  }
  if (resetCount > 0) {
    persistItems(items);
  }
  return resetCount;
}

/**
 * Update the matching related-NPC stub on an item with the canonical NPC's id.
 * Called by the NPC Generator after a successful generation triggered from
 * the Item Generator.
 *
 * Matches the stub by stubName (case-insensitive). If the item or stub is
 * not found, this is a no-op.
 *
 * @param {string} itemName
 * @param {string} stubName
 * @param {string} npcId
 * @returns {boolean} true if a stub was updated, false otherwise
 */
export function linkNPCToItemStub(itemName, stubName, npcId) {
  if (!itemName || !stubName || !npcId) return false;

  const items = getAllItems();
  const item = items.find(i => i?.name === itemName);
  if (!item || !Array.isArray(item.related_npcs)) return false;

  const target = stubName.trim().toLowerCase();
  const stub = item.related_npcs.find(
    s => (s?.name || '').trim().toLowerCase() === target
  );
  if (!stub) return false;

  stub.npc_id = npcId;
  // Defensive: legacy stubs may still carry npc_folder until the
  // drop-npc-folder migration runs for this user.
  delete stub.npc_folder;

  persistItems(items);
  return true;
}

/**
 * Propagate an item rename across every place the old name was used as
 * an identifier. Items use their `name` as their cross-tool id, so
 * renaming an item changes its identity — every pointer at the old
 * name needs to follow.
 *
 * Updates:
 *   1. `tool-references` entries whose source/target is the renamed item.
 *   2. NPC denormalized `sourceId` / `sourceName` fields. Without this
 *      the NPCCard's render-time existence check would mistakenly flag
 *      the NPC's source as "(deleted)" — the item is still there, just
 *      under a new name.
 *   3. Setting/dungeon NPC stub `seeded_from.source_id` /
 *      `seeded_from.source_name` (Phase 2 substrate cross-container
 *      provenance) — same reason as (2).
 *
 * Called when the user renames an item in the Item Generator. Idempotent
 * and safe when nothing matches.
 *
 * @param {string} oldName
 * @param {string} newName
 * @returns {{ totalUpdated: number }} count across refs + NPC fields + stub provenance
 */
export function renameItemReferences(oldName, newName) {
  if (!oldName || !newName || oldName === newName) return { totalUpdated: 0 };

  let totalUpdated = 0;

  // 1. Reference graph.
  const referencesRaw = localStorage.getItem('tool-references');
  if (referencesRaw) {
    let references;
    try {
      references = JSON.parse(referencesRaw);
    } catch {
      references = null;
    }
    if (references) {
      let changed = false;
      for (const ref of Object.values(references)) {
        if (ref.target_type === 'item' && ref.target_id === oldName) {
          ref.target_id = newName;
          ref.target_name = newName;
          totalUpdated++;
          changed = true;
        }
        if (ref.source_type === 'item' && ref.source_id === oldName) {
          ref.source_id = newName;
          ref.source_name = newName;
          totalUpdated++;
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem('tool-references', JSON.stringify(references));
      }
    }
  }

  // 2. NPC denormalized source fields.
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
          if (npc?.sourceType === 'item' && npc.sourceId === oldName) {
            npc.sourceId = newName;
            npc.sourceName = newName;
            totalUpdated++;
            changed = true;
          }
        }
      }
      if (changed) {
        localStorage.setItem('npcGeneratorNPCs', JSON.stringify(npcs));
      }
    }
  }

  // 3. Setting NPC stub seeded_from provenance + setting-level source
  //    provenance. Two passes over the same settings array:
  //    (a) NPC stub seeded_from — same as the NPC denormalized fields
  //        in pass 2, but on stubs that originated as cross-container
  //        seeds (e.g., item-stub seeded into a setting's NPC tab).
  //    (b) Setting-level sourceType/sourceId/sourceName — set on the
  //        setting record by finalizePendingSeed when the setting was
  //        promoted from an item stub. Without this pass, the setting
  //        card's "Inspired by [Item]" link would render the old item
  //        name (or worse, miss the existence check and render as live
  //        when the underlying item id no longer matches).
  const settingsRaw = localStorage.getItem('gameSettings');
  if (settingsRaw) {
    let settings;
    try {
      settings = JSON.parse(settingsRaw);
    } catch {
      settings = null;
    }
    if (Array.isArray(settings)) {
      let changed = false;
      for (const setting of settings) {
        if (Array.isArray(setting?.npcs)) {
          for (const stub of setting.npcs) {
            const from = stub?.seeded_from;
            if (from?.source_type === 'item' && from.source_id === oldName) {
              from.source_id = newName;
              from.source_name = newName;
              totalUpdated++;
              changed = true;
            }
          }
        }
        // (b) Setting-level source provenance written by
        //     finalizePendingSeed on the Item → Setting flow.
        if (setting?.sourceType === 'item' && setting.sourceId === oldName) {
          setting.sourceId = newName;
          setting.sourceName = newName;
          totalUpdated++;
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem('gameSettings', JSON.stringify(settings));
      }
    }
  }

  // 4. Dungeon NPC stub seeded_from provenance.
  const dungeonsRaw = localStorage.getItem('dungeons');
  if (dungeonsRaw) {
    let dungeons;
    try {
      dungeons = JSON.parse(dungeonsRaw);
    } catch {
      dungeons = null;
    }
    if (Array.isArray(dungeons)) {
      let changed = false;
      for (const dungeon of dungeons) {
        if (!Array.isArray(dungeon?.npcs)) continue;
        for (const stub of dungeon.npcs) {
          const from = stub?.seeded_from;
          if (from?.source_type === 'item' && from.source_id === oldName) {
            from.source_id = newName;
            from.source_name = newName;
            totalUpdated++;
            changed = true;
          }
        }
      }
      if (changed) {
        localStorage.setItem('dungeons', JSON.stringify(dungeons));
      }
    }
  }

  return { totalUpdated };
}

/**
 * Add a `mentioned_in_item` reference linking an NPC to an item, if it does not already exist.
 *
 * @param {Object} params
 * @param {string} params.npcId
 * @param {string} params.npcName
 * @param {string} params.itemName
 * @param {string} [params.context]
 * @returns {string|null} The new reference id, or null if it already existed.
 */
export function addNPCMentionedInItemReference({ npcId, npcName, itemName, context = '' }) {
  if (!npcId || !itemName) return null;
  if (referenceExists('npc', npcId, 'item', itemName, 'mentioned_in_item')) return null;
  return addReference({
    source_type: 'npc',
    source_id: npcId,
    source_name: npcName || 'Unknown NPC',
    target_type: 'item',
    target_id: itemName,
    target_name: itemName,
    relationship: 'mentioned_in_item',
    context
  });
}

/**
 * Remove all references where the given item is source or target.
 * Call this when an item is deleted.
 *
 * @param {string} itemName
 * @returns {number} count of references removed
 */
export function removeReferencesForItem(itemName) {
  if (!itemName) return 0;
  return removeReferencesForEntity('item', itemName);
}

/**
 * Find references that connect an item to NPCs (mentioned_in_item).
 * Useful for re-syncing stubs from the reference graph if needed.
 *
 * @param {string} itemName
 * @returns {Array<Object>} reference objects
 */
export function getNPCReferencesForItem(itemName) {
  if (!itemName) return [];
  return getReferencesForEntity('item', itemName)
    .filter(ref => ref.relationship === 'mentioned_in_item');
}

/**
 * Walk savedItems and find any items whose `related_npcs` contain a stub
 * pointing to the given NPC id.
 *
 * @param {string} npcId
 * @returns {Array<{itemName: string, stubName: string}>}
 */
export function findItemStubsForNPC(npcId) {
  if (!npcId) return [];
  const items = getAllItems();
  const matches = [];
  for (const item of items) {
    if (!item?.name || !Array.isArray(item.related_npcs)) continue;
    for (const stub of item.related_npcs) {
      if (stub?.npc_id === npcId) {
        matches.push({ itemName: item.name, stubName: stub.name });
      }
    }
  }
  return matches;
}

/**
 * Build a SeededInput object from an item.
 *
 * Three axes:
 *   1. Stub list selection (driven by `destinationType`):
 *      - 'npc'     (default): pull from item.related_npcs
 *      - 'setting' / 'dungeon': pull from item.related_settings
 *   2. Single-stub vs whole-item (driven by `entityName`):
 *      - With entityName: returns a SeededInput whose `entities` contains
 *        the single matching stub (per-stub promotion case — "Create
 *        Setting" on a single location stub).
 *      - Without entityName: returns a SeededInput whose `entities` contains
 *        EVERY stub from the chosen list. Used when the whole item
 *        is the seed and the destination receives the full cast/place set
 *        as context.
 *   3. Entity-side fields are normalized so downstream renderers see a
 *      uniform shape regardless of source (NPC stubs carry npc_id; setting
 *      stubs carry setting_id).
 *
 * Returns null if the item can't be located, or if `entityName` is given
 * but no matching stub exists in the chosen list.
 *
 * @param {Object} params
 * @param {string} params.fromId
 * @param {string} [params.entityName]
 * @param {'npc'|'setting'|'dungeon'} [params.destinationType='npc']
 * @returns {Object|null}
 */
export function buildSeededInputFromItem({ fromId, entityName, destinationType = 'npc' }) {
  if (!fromId) return null;
  const item = getItemFromStorage(fromId);
  if (!item) return null;

  // Pick the stub list based on destination. Each destination type
  // pulls from its own related-* array:
  //   - NPC destination → related_npcs
  //   - Setting destination → related_settings
  //   - Dungeon destination → related_dungeons (separated from settings
  //     in the post-dungeon-split architecture; dungeon-shape places
  //     get their own stub list rather than sharing with settings).
  let stubs;
  let entityType;
  if (destinationType === 'dungeon') {
    stubs = Array.isArray(item.related_dungeons) ? item.related_dungeons : [];
    entityType = 'location';
  } else if (destinationType === 'setting') {
    stubs = Array.isArray(item.related_settings) ? item.related_settings : [];
    entityType = 'location';
  } else {
    stubs = Array.isArray(item.related_npcs) ? item.related_npcs : [];
    entityType = 'npc';
  }

  // Resolve which stubs go into entities[]:
  // - With entityName: the single matching stub. Null out if not found.
  // - Without entityName: all stubs (may be empty if the item has none).
  let selectedStubs;
  if (entityName) {
    const target = entityName.trim().toLowerCase();
    const stub = stubs.find(s => (s?.name || '').trim().toLowerCase() === target);
    if (!stub) return null;
    selectedStubs = [stub];
  } else {
    selectedStubs = stubs;
  }

  const physical = (item.physical_description || '').trim();
  const lore = (item.lore || '').trim();
  const description = [physical, lore].filter(Boolean).join('\n\n');

  // Use the first stub's source_quote as the seed-level quote when
  // single-stub mode; in whole-item mode, leave quote unset (each entity
  // can carry its own quote downstream if a renderer wants it).
  const seedQuote = entityName && selectedStubs[0]?.source_quote
    ? selectedStubs[0].source_quote.trim() || undefined
    : undefined;

  // Resolve the item's naming register so the destination tool can
  // inherit it instead of re-detecting from prose. Items generated after
  // the register-persistence change carry `selectedRegister` directly.
  // Legacy items get cultural detection on the item's combined text.
  const register = item.selectedRegister
    || detectRegisterFromInput(
        `${item.name || ''} ${physical} ${lore}`.trim(),
        registerList,
      )
    || null;

  // Co-realized siblings: stubs on the same item that the user has
  // already promoted into real entities. Surface them so the
  // destination tool's prompt can weave the new generation into a
  // consistent cast/geography. Excludes:
  //   - the entity currently being promoted (avoids redundancy with entities[])
  //   - unpromoted stubs (no realized counterpart yet → no consistency anchor)
  //   - empty-name stubs (defensive).
  // Kept stub-level (name + role) rather than reaching for full canonical
  // records — the LLM needs an anchor, not the full description.
  const promotingStubNameKey = entityName ? entityName.trim().toLowerCase() : null;
  const npcStubsAll = Array.isArray(item.related_npcs) ? item.related_npcs : [];
  const settingStubsAll = Array.isArray(item.related_settings) ? item.related_settings : [];

  const realizedNpcs = npcStubsAll
    .filter(s => s?.npc_id && (s.name || '').trim())
    .filter(s => !(entityType === 'npc' && (s.name || '').trim().toLowerCase() === promotingStubNameKey))
    .map(s => ({
      name: (s.name || '').trim(),
      role_brief: (s.role_brief || '').trim(),
    }));

  const realizedSettings = settingStubsAll
    .filter(s => s?.setting_id && (s.name || '').trim())
    .filter(s => !(destinationType === 'setting' && (s.name || '').trim().toLowerCase() === promotingStubNameKey))
    .map(s => ({
      name: (s.name || '').trim(),
      role_brief: (s.role_brief || '').trim(),
      setting_id: s.setting_id,
    }));

  return {
    source: {
      type: 'item',
      id: item.name,
      name: item.name,
      description,
      quote: seedQuote,
      // Item-specific extras consumed by destination-specific prefill renderers.
      item_type: (item.item_type || '').trim(),
      rarity: (item.rarity || '').trim(),
      lore,
      physical_description: physical,
      register,
      realized: {
        npcs: realizedNpcs,
        settings: realizedSettings,
      },
    },
    entities: selectedStubs.map(stub => ({
      type: entityType,
      name: (stub.name || '').trim(),
      role_or_description: (stub.role_brief || '').trim(),
      context: (stub.context || '').trim(),
      source_quote: (stub.source_quote || '').trim() || undefined,
    })),
  };
}

/**
 * Reset any item stubs pointing to the given NPC id back to the unpromoted
 * state (`npc_id: null`). Call this when an NPC is deleted in the NPC
 * Generator so the source item's UI returns to "Create NPC" instead of
 * dangling on a now-deleted reference.
 *
 * The stub itself is preserved (so the user still sees "this NPC was
 * mentioned in the lore") — only the promotion link is cleared.
 *
 * @param {string} npcId
 * @returns {number} count of stubs reset
 */
export function resetItemStubsForDeletedNPC(npcId) {
  if (!npcId) return 0;
  const items = getAllItems();
  let resetCount = 0;
  for (const item of items) {
    if (!Array.isArray(item?.related_npcs)) continue;
    for (const stub of item.related_npcs) {
      if (stub?.npc_id === npcId) {
        stub.npc_id = null;
        // Defensive cleanup for users whose drop-npc-folder migration hasn't run yet.
        delete stub.npc_folder;
        resetCount++;
      }
    }
  }
  if (resetCount > 0) {
    persistItems(items);
  }
  return resetCount;
}
