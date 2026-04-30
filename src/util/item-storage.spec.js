/**
 * item-storage tests
 */

import {
  getAllItems,
  getItemFromStorage,
  saveItemToStorage,
  linkNPCToItemStub,
  renameItemReferences,
  addNPCMentionedInItemReference,
  removeReferencesForItem,
  getNPCReferencesForItem,
  findItemStubsForNPC,
  resetItemStubsForDeletedNPC,
} from './item-storage.mjs';

class LocalStorageMock {
  constructor() { this.store = {}; }
  clear() { this.store = {}; }
  getItem(key) { return this.store[key] ?? null; }
  setItem(key, value) { this.store[key] = String(value); }
  removeItem(key) { delete this.store[key]; }
}

describe('item-storage', () => {
  beforeEach(() => {
    // Clear any state left over from prior `describe` blocks (jsdom shares
    // a real localStorage across tests; the mock rebind below isn't always
    // visible to imported modules).
    try { localStorage.clear(); } catch {}
    global.localStorage = new LocalStorageMock();
  });

  afterEach(() => {
    try { localStorage.clear(); } catch {}
  });

  describe('getAllItems / saveItemToStorage / getItemFromStorage', () => {
    it('returns an empty array when nothing is saved', () => {
      expect(getAllItems()).toEqual([]);
      expect(getItemFromStorage('Anything')).toBeNull();
    });

    it('round-trips an item by name', () => {
      const item = { name: 'Krovnik\'s Hearthstaff', rarity: 'Common' };
      saveItemToStorage(item);
      expect(getItemFromStorage('Krovnik\'s Hearthstaff')).toEqual(item);
      expect(getAllItems()).toHaveLength(1);
    });

    it('updates an existing item by name instead of duplicating', () => {
      saveItemToStorage({ name: 'Lantern', rarity: 'Common' });
      saveItemToStorage({ name: 'Lantern', rarity: 'Rare' });
      const items = getAllItems();
      expect(items).toHaveLength(1);
      expect(items[0].rarity).toBe('Rare');
    });

    it('survives corrupted localStorage', () => {
      global.localStorage.setItem('savedItems', 'not-json');
      expect(getAllItems()).toEqual([]);
    });
  });

  describe('linkNPCToItemStub', () => {
    beforeEach(() => {
      saveItemToStorage({
        name: 'Krovnik\'s Hearthstaff',
        related_npcs: [
          { name: 'Yelena of the Duskwood', role_brief: 'oracle', npc_id: null, npc_folder: null },
          { name: 'Morghul, the Watcher', role_brief: 'divine watcher', npc_id: null, npc_folder: null },
        ],
      });
    });

    it('writes npc_id and npc_folder onto the matching stub', () => {
      const ok = linkNPCToItemStub('Krovnik\'s Hearthstaff', 'Yelena of the Duskwood', 'npc_abc', 'Uncategorized');
      expect(ok).toBe(true);
      const stub = getItemFromStorage('Krovnik\'s Hearthstaff').related_npcs[0];
      expect(stub.npc_id).toBe('npc_abc');
      expect(stub.npc_folder).toBe('Uncategorized');
    });

    it('matches stub names case-insensitively', () => {
      const ok = linkNPCToItemStub('Krovnik\'s Hearthstaff', 'YELENA OF THE DUSKWOOD', 'npc_abc');
      expect(ok).toBe(true);
      expect(getItemFromStorage('Krovnik\'s Hearthstaff').related_npcs[0].npc_id).toBe('npc_abc');
    });

    it('defaults npc_folder to "Uncategorized" when omitted', () => {
      linkNPCToItemStub('Krovnik\'s Hearthstaff', 'Morghul, the Watcher', 'npc_xyz');
      const stub = getItemFromStorage('Krovnik\'s Hearthstaff').related_npcs[1];
      expect(stub.npc_folder).toBe('Uncategorized');
    });

    it('returns false when the item is missing', () => {
      expect(linkNPCToItemStub('Nonexistent Item', 'Yelena', 'npc_abc')).toBe(false);
    });

    it('returns false when no stub matches the given name', () => {
      expect(linkNPCToItemStub('Krovnik\'s Hearthstaff', 'Stranger', 'npc_abc')).toBe(false);
    });

    it('returns false when required args are missing', () => {
      expect(linkNPCToItemStub('', 'Yelena', 'npc_abc')).toBe(false);
      expect(linkNPCToItemStub('Krovnik\'s Hearthstaff', '', 'npc_abc')).toBe(false);
      expect(linkNPCToItemStub('Krovnik\'s Hearthstaff', 'Yelena', '')).toBe(false);
    });
  });

  describe('addNPCMentionedInItemReference / removeReferencesForItem / getNPCReferencesForItem', () => {
    it('adds a mentioned_in_item reference', () => {
      const id = addNPCMentionedInItemReference({
        npcId: 'npc_1',
        npcName: 'Yelena',
        itemName: 'Hearthstaff',
        context: 'oracle of the Duskwood',
      });
      expect(id).toBeTruthy();
      const refs = getNPCReferencesForItem('Hearthstaff');
      expect(refs).toHaveLength(1);
      expect(refs[0].relationship).toBe('mentioned_in_item');
      expect(refs[0].source_id).toBe('npc_1');
      expect(refs[0].target_id).toBe('Hearthstaff');
    });

    it('does not duplicate an existing reference', () => {
      addNPCMentionedInItemReference({ npcId: 'npc_1', npcName: 'Yelena', itemName: 'Hearthstaff' });
      const id2 = addNPCMentionedInItemReference({ npcId: 'npc_1', npcName: 'Yelena', itemName: 'Hearthstaff' });
      expect(id2).toBeNull();
      expect(getNPCReferencesForItem('Hearthstaff')).toHaveLength(1);
    });

    it('removeReferencesForItem clears all references for that item', () => {
      addNPCMentionedInItemReference({ npcId: 'npc_1', npcName: 'A', itemName: 'Hearthstaff' });
      addNPCMentionedInItemReference({ npcId: 'npc_2', npcName: 'B', itemName: 'Hearthstaff' });
      addNPCMentionedInItemReference({ npcId: 'npc_3', npcName: 'C', itemName: 'OtherItem' });
      const removed = removeReferencesForItem('Hearthstaff');
      expect(removed).toBe(2);
      expect(getNPCReferencesForItem('Hearthstaff')).toHaveLength(0);
      expect(getNPCReferencesForItem('OtherItem')).toHaveLength(1);
    });
  });

  describe('findItemStubsForNPC / resetItemStubsForDeletedNPC', () => {
    beforeEach(() => {
      saveItemToStorage({
        name: 'Hearthstaff',
        related_npcs: [
          { name: 'Yelena', npc_id: 'npc_1', npc_folder: 'Uncategorized' },
          { name: 'Morghul', npc_id: null, npc_folder: null },
        ],
      });
      saveItemToStorage({
        name: 'Other Item',
        related_npcs: [
          { name: 'Yelena', npc_id: 'npc_1', npc_folder: 'Uncategorized' },
          { name: 'Aldric', npc_id: 'npc_2', npc_folder: 'Uncategorized' },
        ],
      });
    });

    it('findItemStubsForNPC returns every stub pointing at the given npc_id', () => {
      const matches = findItemStubsForNPC('npc_1');
      expect(matches).toHaveLength(2);
      expect(matches).toEqual(expect.arrayContaining([
        { itemName: 'Hearthstaff', stubName: 'Yelena' },
        { itemName: 'Other Item', stubName: 'Yelena' },
      ]));
    });

    it('findItemStubsForNPC returns [] for an NPC with no item stubs', () => {
      expect(findItemStubsForNPC('npc_unknown')).toEqual([]);
      expect(findItemStubsForNPC('')).toEqual([]);
    });

    it('resetItemStubsForDeletedNPC clears npc_id/npc_folder on every matching stub', () => {
      const reset = resetItemStubsForDeletedNPC('npc_1');
      expect(reset).toBe(2);

      const hearthstaff = getItemFromStorage('Hearthstaff');
      expect(hearthstaff.related_npcs[0]).toMatchObject({ name: 'Yelena', npc_id: null, npc_folder: null });
      // Stub itself is preserved (still exists in the array, just unpromoted).
      expect(hearthstaff.related_npcs).toHaveLength(2);

      const other = getItemFromStorage('Other Item');
      expect(other.related_npcs[0]).toMatchObject({ name: 'Yelena', npc_id: null, npc_folder: null });
      // Sibling stub for a different NPC is untouched.
      expect(other.related_npcs[1]).toMatchObject({ name: 'Aldric', npc_id: 'npc_2' });
    });

    it('resetItemStubsForDeletedNPC is a no-op when no stubs match', () => {
      expect(resetItemStubsForDeletedNPC('npc_unknown')).toBe(0);
      expect(resetItemStubsForDeletedNPC('')).toBe(0);
    });
  });

  describe('renameItemReferences', () => {
    it('updates target_id and target_name on mentioned_in_item references', () => {
      addNPCMentionedInItemReference({ npcId: 'npc_1', npcName: 'A', itemName: 'OldName' });
      addNPCMentionedInItemReference({ npcId: 'npc_2', npcName: 'B', itemName: 'OldName' });
      const result = renameItemReferences('OldName', 'NewName');
      expect(result.totalUpdated).toBe(2);
      expect(getNPCReferencesForItem('NewName')).toHaveLength(2);
      expect(getNPCReferencesForItem('OldName')).toHaveLength(0);
    });

    it('updates NPCs whose denormalized sourceId points at the old item name', () => {
      // Critical regression: without this propagation, the NPCCard's
      // render-time check incorrectly shows "(deleted)" after a rename.
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        Uncategorized: [
          { npc_id: 'npc_a', sourceType: 'item', sourceId: 'OldName', sourceName: 'OldName' },
          { npc_id: 'npc_b', sourceType: 'item', sourceId: 'OldName', sourceName: 'OldName' },
          { npc_id: 'npc_c', sourceType: 'item', sourceId: 'OtherItem', sourceName: 'OtherItem' },
          { npc_id: 'npc_d', sourceType: 'dungeon', sourceId: 'OldName', sourceName: 'OldName' }, // wrong type, must not touch
        ],
      }));

      const result = renameItemReferences('OldName', 'NewName');

      const after = JSON.parse(localStorage.getItem('npcGeneratorNPCs')).Uncategorized;
      expect(after[0].sourceId).toBe('NewName');
      expect(after[0].sourceName).toBe('NewName');
      expect(after[1].sourceId).toBe('NewName');
      expect(after[2].sourceId).toBe('OtherItem'); // untouched
      expect(after[3].sourceId).toBe('OldName');   // dungeon-typed, untouched
      expect(result.totalUpdated).toBeGreaterThanOrEqual(2);
    });

    it('updates seeded_from provenance on setting NPC stubs', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        {
          id: 'set_x',
          place_name: 'X',
          npcs: [
            { name: 'Yelena', seeded_from: { source_type: 'item', source_id: 'OldName', source_name: 'OldName', stub_name: 'Yelena' } },
            { name: 'Other', seeded_from: { source_type: 'item', source_id: 'OtherItem', source_name: 'OtherItem', stub_name: 'Other' } },
          ],
        },
      ]));

      renameItemReferences('OldName', 'NewName');

      const after = JSON.parse(localStorage.getItem('gameSettings'))[0].npcs;
      expect(after[0].seeded_from.source_id).toBe('NewName');
      expect(after[0].seeded_from.source_name).toBe('NewName');
      expect(after[1].seeded_from.source_id).toBe('OtherItem'); // untouched
    });

    it('updates seeded_from provenance on dungeon NPC stubs', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dng_x',
          dungeonOverview: { name: 'X' },
          npcs: [
            { name: 'Yelena', seeded_from: { source_type: 'item', source_id: 'OldName', source_name: 'OldName', stub_name: 'Yelena' } },
          ],
        },
      ]));

      renameItemReferences('OldName', 'NewName');

      const after = JSON.parse(localStorage.getItem('dungeons'))[0].npcs;
      expect(after[0].seeded_from.source_id).toBe('NewName');
      expect(after[0].seeded_from.source_name).toBe('NewName');
    });

    it('is a no-op when oldName === newName', () => {
      addNPCMentionedInItemReference({ npcId: 'npc_1', npcName: 'A', itemName: 'Same' });
      const result = renameItemReferences('Same', 'Same');
      expect(result.totalUpdated).toBe(0);
    });

    it('is a no-op when there are no references', () => {
      const result = renameItemReferences('A', 'B');
      expect(result.totalUpdated).toBe(0);
    });

    it('does NOT clobber promoted stub.npc_id on the renamed item', () => {
      // Regression: simulates the full saveEdit flow — rename writes
      // savedItems with the new name, then renameItemReferences fans out
      // to other stores. The item's own related_npcs (including promoted
      // npc_id pointers back to canonical NPCs) MUST survive intact, or
      // the item card flips from "View NPC" back to "Create NPC".
      localStorage.setItem('savedItems', JSON.stringify([{
        name: 'NewName', // post-rename: caller already wrote the new name
        related_npcs: [
          { name: 'Yelena', role_brief: 'oracle', npc_id: 'npc_yelena_001', npc_folder: 'Uncategorized' },
          { name: 'Skragbit', role_brief: 'smith', npc_id: null, npc_folder: null },
        ],
      }]));
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        Uncategorized: [
          { npc_id: 'npc_yelena_001', sourceType: 'item', sourceId: 'OldName', sourceName: 'OldName' },
        ],
      }));

      renameItemReferences('OldName', 'NewName');

      const items = JSON.parse(localStorage.getItem('savedItems'));
      expect(items[0].related_npcs[0].npc_id).toBe('npc_yelena_001');
      expect(items[0].related_npcs[0].npc_folder).toBe('Uncategorized');
      expect(items[0].related_npcs[1].npc_id).toBeNull();
    });
  });
});
