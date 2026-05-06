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

  // 3. Setting NPC stub seeded_from provenance.
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
        if (!Array.isArray(setting?.npcs)) continue;
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
 * Two modes:
 *   - With `entityName`: returns a SeededInput whose `entities` contains
 *     the single matching stub (Item → NPC promotion case).
 *   - Without `entityName`: returns a SeededInput whose `entities` contains
 *     EVERY `related_npcs` stub on the item (Item → Setting / Item →
 *     Dungeon case, where the whole item is the seed and the destination
 *     receives the full cast as context).
 *
 * Returns null if the item cannot be located, or if `entityName` is
 * specified but no matching stub exists.
 *
 * @param {Object} params
 * @param {string} params.fromId         - Item identity (item.name)
 * @param {string} [params.entityName]   - Name of a single stub to seed; omit for whole-item seeding
 * @returns {Object|null}
 */
export function buildSeededInputFromItem({ fromId, entityName }) {
  if (!fromId) return null;
  const item = getItemFromStorage(fromId);
  if (!item) return null;

  const stubs = Array.isArray(item.related_npcs) ? item.related_npcs : [];

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

  return {
    source: {
      type: 'item',
      id: item.name,
      name: item.name,
      description,
      quote: seedQuote,
      // Item-specific extras consumed by the item-flavored prefill renderer.
      item_type: (item.item_type || '').trim(),
      rarity: (item.rarity || '').trim(),
      lore,
      physical_description: physical,
    },
    entities: selectedStubs.map(stub => ({
      type: 'npc',
      name: (stub.name || '').trim(),
      role_or_description: (stub.role_brief || '').trim(),
      // Item-specific extras consumed by the prefill renderer.
      context: (stub.context || '').trim(),
      // For whole-item seeding, surface each stub's source_quote on the
      // entity so a downstream renderer can show per-entity quotes if it
      // wants to. (The seed-level quote is set above only in single-stub
      // mode.)
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
