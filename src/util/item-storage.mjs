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
 * Update the matching related-NPC stub on an item with the canonical NPC's id and folder.
 * Called by the NPC Generator after a successful generation triggered from the Item Generator.
 *
 * Matches the stub by stubName (case-insensitive). If the item or stub is not found, this is a no-op.
 *
 * @param {string} itemName
 * @param {string} stubName
 * @param {string} npcId
 * @param {string} npcFolder
 * @returns {boolean} true if a stub was updated, false otherwise
 */
export function linkNPCToItemStub(itemName, stubName, npcId, npcFolder) {
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
  stub.npc_folder = npcFolder || 'Uncategorized';

  persistItems(items);
  return true;
}

/**
 * Update target_id for any references whose target was an item under the old name.
 * Called when the user renames an item in the Item Generator.
 *
 * @param {string} oldName
 * @param {string} newName
 * @returns {{ totalUpdated: number }}
 */
export function renameItemReferences(oldName, newName) {
  if (!oldName || !newName || oldName === newName) return { totalUpdated: 0 };

  const referencesRaw = localStorage.getItem('tool-references');
  if (!referencesRaw) return { totalUpdated: 0 };

  let references;
  try {
    references = JSON.parse(referencesRaw);
  } catch {
    return { totalUpdated: 0 };
  }

  let totalUpdated = 0;
  for (const ref of Object.values(references)) {
    if (ref.target_type === 'item' && ref.target_id === oldName) {
      ref.target_id = newName;
      ref.target_name = newName;
      totalUpdated++;
    }
    if (ref.source_type === 'item' && ref.source_id === oldName) {
      ref.source_id = newName;
      ref.source_name = newName;
      totalUpdated++;
    }
  }

  if (totalUpdated > 0) {
    localStorage.setItem('tool-references', JSON.stringify(references));
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
 * Reset any item stubs pointing to the given NPC id back to the unpromoted
 * state (`npc_id: null`, `npc_folder: null`). Call this when an NPC is
 * deleted in the NPC Generator so the source item's UI returns to "Create
 * NPC" instead of dangling on a now-deleted reference.
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
        stub.npc_folder = null;
        resetCount++;
      }
    }
  }
  if (resetCount > 0) {
    persistItems(items);
  }
  return resetCount;
}
