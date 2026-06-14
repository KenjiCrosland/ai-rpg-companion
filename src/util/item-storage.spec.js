/**
 * item-storage tests
 */

import {
  getAllItems,
  getItemFromStorage,
  saveItemToStorage,
  linkNPCToItemStub,
  linkSettingToItemStub,
  findItemStubsForSetting,
  resetItemStubsForDeletedSetting,
  linkDungeonToItemStub,
  findItemStubsForDungeon,
  resetItemStubsForDeletedDungeon,
  addDungeonStubToItem,
  renameItemReferences,
  addNPCMentionedInItemReference,
  removeReferencesForItem,
  getNPCReferencesForItem,
  findItemStubsForNPC,
  resetItemStubsForDeletedNPC,
  buildSeededInputFromItem,
  leadingWordMatch,
  findItemStubMatchingName,
  addSettingStubToItem,
  reconcileNPCStubsAgainstItem,
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

    it('writes npc_id onto the matching stub', () => {
      const ok = linkNPCToItemStub('Krovnik\'s Hearthstaff', 'Yelena of the Duskwood', 'npc_abc');
      expect(ok).toBe(true);
      const stub = getItemFromStorage('Krovnik\'s Hearthstaff').related_npcs[0];
      expect(stub.npc_id).toBe('npc_abc');
      expect(stub).not.toHaveProperty('npc_folder');
    });

    it('matches stub names case-insensitively', () => {
      const ok = linkNPCToItemStub('Krovnik\'s Hearthstaff', 'YELENA OF THE DUSKWOOD', 'npc_abc');
      expect(ok).toBe(true);
      expect(getItemFromStorage('Krovnik\'s Hearthstaff').related_npcs[0].npc_id).toBe('npc_abc');
    });

    it('strips any legacy npc_folder field even when fixture seeded it', () => {
      // Defensive cleanup for users whose drop-npc-folder migration
      // hasn't yet run when a writeBack fires.
      const stored = JSON.parse(localStorage.getItem('savedItems'));
      stored[0].related_npcs[1].npc_folder = 'StaleFolder';
      localStorage.setItem('savedItems', JSON.stringify(stored));

      linkNPCToItemStub('Krovnik\'s Hearthstaff', 'Morghul, the Watcher', 'npc_xyz');
      const stub = getItemFromStorage('Krovnik\'s Hearthstaff').related_npcs[1];
      expect(stub.npc_id).toBe('npc_xyz');
      expect(stub).not.toHaveProperty('npc_folder');
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

    it('resetItemStubsForDeletedNPC clears npc_id and removes npc_folder on every matching stub', () => {
      const reset = resetItemStubsForDeletedNPC('npc_1');
      expect(reset).toBe(2);

      const hearthstaff = getItemFromStorage('Hearthstaff');
      expect(hearthstaff.related_npcs[0]).toMatchObject({ name: 'Yelena', npc_id: null });
      expect(hearthstaff.related_npcs[0]).not.toHaveProperty('npc_folder');
      // Stub itself is preserved (still exists in the array, just unpromoted).
      expect(hearthstaff.related_npcs).toHaveLength(2);

      const other = getItemFromStorage('Other Item');
      expect(other.related_npcs[0]).toMatchObject({ name: 'Yelena', npc_id: null });
      expect(other.related_npcs[0]).not.toHaveProperty('npc_folder');
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

    it('updates denormalized source fields on settings whose sourceId points at the renamed item', () => {
      // Settings carry sourceType/sourceId/sourceName when promoted from
      // an item-stub via the Item → Setting flow. The setting card reads
      // those fields directly to render the "Inspired by [Item]" link;
      // without this propagation the link would render the old item name
      // and the existence check would mark the source as "(deleted)."
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', place_name: 'A', sourceType: 'item', sourceId: 'OldName', sourceName: 'OldName' },
        { id: 'set_b', place_name: 'B', sourceType: 'item', sourceId: 'OtherItem', sourceName: 'OtherItem' },
        { id: 'set_c', place_name: 'C', sourceType: 'dungeon', sourceId: 'OldName', sourceName: 'OldName' }, // wrong type, must not touch
      ]));

      renameItemReferences('OldName', 'NewName');

      const after = JSON.parse(localStorage.getItem('gameSettings'));
      expect(after[0].sourceId).toBe('NewName');
      expect(after[0].sourceName).toBe('NewName');
      expect(after[1].sourceId).toBe('OtherItem');   // untouched
      expect(after[2].sourceId).toBe('OldName');     // dungeon-typed, untouched
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

    it('updates dungeon-level sourceType/Id/Name when the dungeon was promoted from the renamed item', () => {
      // Mirrors the setting-level case above. The dungeon's own
      // sourceType/sourceId/sourceName fields are written by the
      // Item → Dungeon finalize hook (overview-store.mjs) when the
      // dungeon is promoted from an item stub. OverviewTab reads
      // them directly to render the "Inspired by [Item]" link; without
      // this propagation the link goes stale and sourceExists fails
      // (item with old name no longer resolves), so the dungeon
      // erroneously renders as `(deleted)` on a benign rename.
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_a', dungeonOverview: { name: 'A' }, sourceType: 'item', sourceId: 'OldName', sourceName: 'OldName' },
        { id: 'dng_b', dungeonOverview: { name: 'B' }, sourceType: 'item', sourceId: 'OtherItem', sourceName: 'OtherItem' },
        { id: 'dng_c', dungeonOverview: { name: 'C' }, sourceType: 'setting', sourceId: 'OldName', sourceName: 'OldName' }, // wrong source type, must not touch
      ]));

      renameItemReferences('OldName', 'NewName');

      const after = JSON.parse(localStorage.getItem('dungeons'));
      expect(after[0].sourceId).toBe('NewName');
      expect(after[0].sourceName).toBe('NewName');
      expect(after[1].sourceId).toBe('OtherItem');  // untouched
      expect(after[2].sourceId).toBe('OldName');    // setting-typed, untouched
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
      expect(items[0].related_npcs[1].npc_id).toBeNull();
    });
  });

  describe('linkSettingToItemStub / findItemStubsForSetting / resetItemStubsForDeletedSetting', () => {
    const itemWithSettingStubs = {
      name: 'The Whispering Crown',
      related_settings: [
        { name: 'The Whispering Glade', role_brief: 'Where the crown was buried', context: '', source_quote: '', setting_id: null },
        { name: 'Tower of Vorn', role_brief: 'Where the crown was forged', context: '', source_quote: '', setting_id: null },
      ],
    };

    it('linkSettingToItemStub stamps setting_id on the matching stub (case-insensitive name match)', () => {
      saveItemToStorage(itemWithSettingStubs);
      const ok = linkSettingToItemStub('The Whispering Crown', 'the whispering glade', 'set_abc123');
      expect(ok).toBe(true);
      const stored = getItemFromStorage('The Whispering Crown');
      expect(stored.related_settings[0].setting_id).toBe('set_abc123');
      expect(stored.related_settings[1].setting_id).toBeNull();
    });

    it('linkSettingToItemStub returns false when item or stub does not exist', () => {
      saveItemToStorage(itemWithSettingStubs);
      expect(linkSettingToItemStub('Wrong Item', 'The Whispering Glade', 'set_abc')).toBe(false);
      expect(linkSettingToItemStub('The Whispering Crown', 'Nowhere Real', 'set_abc')).toBe(false);
    });

    it('linkSettingToItemStub is a no-op when any required arg is missing', () => {
      saveItemToStorage(itemWithSettingStubs);
      expect(linkSettingToItemStub(null, 'x', 'set_abc')).toBe(false);
      expect(linkSettingToItemStub('The Whispering Crown', null, 'set_abc')).toBe(false);
      expect(linkSettingToItemStub('The Whispering Crown', 'x', null)).toBe(false);
    });

    it('findItemStubsForSetting walks all items and returns matches', () => {
      saveItemToStorage({
        name: 'Item A',
        related_settings: [
          { name: 'Glade', setting_id: 'set_xyz' },
          { name: 'Tower', setting_id: 'set_unrelated' },
        ],
      });
      saveItemToStorage({
        name: 'Item B',
        related_settings: [{ name: 'Glade', setting_id: 'set_xyz' }],
      });
      saveItemToStorage({ name: 'Item C', related_settings: [] });

      const matches = findItemStubsForSetting('set_xyz');
      expect(matches).toEqual([
        { itemName: 'Item A', stubName: 'Glade' },
        { itemName: 'Item B', stubName: 'Glade' },
      ]);
    });

    it('findItemStubsForSetting returns empty array when nothing matches', () => {
      saveItemToStorage(itemWithSettingStubs);
      expect(findItemStubsForSetting('set_does_not_exist')).toEqual([]);
      expect(findItemStubsForSetting(null)).toEqual([]);
    });

    it('resetItemStubsForDeletedSetting clears setting_id on every matching stub', () => {
      saveItemToStorage({
        name: 'Item A',
        related_settings: [
          { name: 'Glade', setting_id: 'set_xyz' },
          { name: 'Tower', setting_id: 'set_unrelated' },
        ],
      });
      saveItemToStorage({
        name: 'Item B',
        related_settings: [{ name: 'Glade', setting_id: 'set_xyz' }],
      });

      const count = resetItemStubsForDeletedSetting('set_xyz');
      expect(count).toBe(2);

      const itemA = getItemFromStorage('Item A');
      expect(itemA.related_settings[0].setting_id).toBeNull();
      expect(itemA.related_settings[1].setting_id).toBe('set_unrelated'); // untouched
      const itemB = getItemFromStorage('Item B');
      expect(itemB.related_settings[0].setting_id).toBeNull();
    });

    it('resetItemStubsForDeletedSetting returns 0 when nothing matches', () => {
      saveItemToStorage(itemWithSettingStubs);
      expect(resetItemStubsForDeletedSetting('set_nope')).toBe(0);
      expect(resetItemStubsForDeletedSetting(null)).toBe(0);
    });
  });

  describe('linkDungeonToItemStub / findItemStubsForDungeon / resetItemStubsForDeletedDungeon', () => {
    const itemWithDungeonStubs = {
      name: 'The Helm of Eikheim',
      related_dungeons: [
        { name: 'The Hollow Vault', role_brief: 'Tomb where the Helm was sealed', context: '', source_quote: '', dungeon_id: null },
        { name: 'Forge of Vorn', role_brief: 'Forge that produced the Helm', context: '', source_quote: '', dungeon_id: null },
      ],
    };

    it('linkDungeonToItemStub stamps dungeon_id on the matching stub (case-insensitive name match)', () => {
      saveItemToStorage(itemWithDungeonStubs);
      const ok = linkDungeonToItemStub('The Helm of Eikheim', 'the hollow vault', 'dng_abc123');
      expect(ok).toBe(true);
      const stored = getItemFromStorage('The Helm of Eikheim');
      expect(stored.related_dungeons[0].dungeon_id).toBe('dng_abc123');
      expect(stored.related_dungeons[1].dungeon_id).toBeNull();
    });

    it('linkDungeonToItemStub returns false when item or stub does not exist', () => {
      saveItemToStorage(itemWithDungeonStubs);
      expect(linkDungeonToItemStub('Wrong Item', 'The Hollow Vault', 'dng_abc')).toBe(false);
      expect(linkDungeonToItemStub('The Helm of Eikheim', 'Nowhere Real', 'dng_abc')).toBe(false);
    });

    it('linkDungeonToItemStub is a no-op when any required arg is missing', () => {
      saveItemToStorage(itemWithDungeonStubs);
      expect(linkDungeonToItemStub(null, 'x', 'dng_abc')).toBe(false);
      expect(linkDungeonToItemStub('The Helm of Eikheim', null, 'dng_abc')).toBe(false);
      expect(linkDungeonToItemStub('The Helm of Eikheim', 'x', null)).toBe(false);
    });

    it('findItemStubsForDungeon walks all items and returns matches', () => {
      saveItemToStorage({
        name: 'Item A',
        related_dungeons: [
          { name: 'Vault', dungeon_id: 'dng_xyz' },
          { name: 'Tomb', dungeon_id: 'dng_unrelated' },
        ],
      });
      saveItemToStorage({
        name: 'Item B',
        related_dungeons: [{ name: 'Vault', dungeon_id: 'dng_xyz' }],
      });
      saveItemToStorage({ name: 'Item C', related_dungeons: [] });

      const matches = findItemStubsForDungeon('dng_xyz');
      expect(matches).toEqual([
        { itemName: 'Item A', stubName: 'Vault' },
        { itemName: 'Item B', stubName: 'Vault' },
      ]);
    });

    it('findItemStubsForDungeon returns empty array when nothing matches', () => {
      saveItemToStorage(itemWithDungeonStubs);
      expect(findItemStubsForDungeon('dng_does_not_exist')).toEqual([]);
      expect(findItemStubsForDungeon(null)).toEqual([]);
    });

    it('resetItemStubsForDeletedDungeon clears dungeon_id on every matching stub', () => {
      saveItemToStorage({
        name: 'Item A',
        related_dungeons: [
          { name: 'Vault', dungeon_id: 'dng_xyz' },
          { name: 'Tomb', dungeon_id: 'dng_unrelated' },
        ],
      });
      saveItemToStorage({
        name: 'Item B',
        related_dungeons: [{ name: 'Vault', dungeon_id: 'dng_xyz' }],
      });

      const count = resetItemStubsForDeletedDungeon('dng_xyz');
      expect(count).toBe(2);

      const itemA = getItemFromStorage('Item A');
      expect(itemA.related_dungeons[0].dungeon_id).toBeNull();
      expect(itemA.related_dungeons[1].dungeon_id).toBe('dng_unrelated'); // untouched
      const itemB = getItemFromStorage('Item B');
      expect(itemB.related_dungeons[0].dungeon_id).toBeNull();
    });

    it('resetItemStubsForDeletedDungeon returns 0 when nothing matches', () => {
      saveItemToStorage(itemWithDungeonStubs);
      expect(resetItemStubsForDeletedDungeon('dng_nope')).toBe(0);
      expect(resetItemStubsForDeletedDungeon(null)).toBe(0);
    });

    it('addDungeonStubToItem links by name when a matching stub exists', () => {
      saveItemToStorage(itemWithDungeonStubs);
      const ok = addDungeonStubToItem('The Helm of Eikheim', {
        dungeonId: 'dng_link',
        dungeonName: 'The Hollow Vault',
        roleBrief: 'Linked',
      });
      expect(ok).toBe(true);
      const stored = getItemFromStorage('The Helm of Eikheim');
      expect(stored.related_dungeons[0].dungeon_id).toBe('dng_link');
      // Should not push a duplicate stub.
      expect(stored.related_dungeons).toHaveLength(2);
    });

    it('addDungeonStubToItem pushes a fresh stub when no name match', () => {
      saveItemToStorage(itemWithDungeonStubs);
      const ok = addDungeonStubToItem('The Helm of Eikheim', {
        dungeonId: 'dng_fresh',
        dungeonName: 'The Iron Sink',
        roleBrief: 'Whole-item generation',
      });
      expect(ok).toBe(true);
      const stored = getItemFromStorage('The Helm of Eikheim');
      expect(stored.related_dungeons).toHaveLength(3);
      const fresh = stored.related_dungeons[2];
      expect(fresh.name).toBe('The Iron Sink');
      expect(fresh.dungeon_id).toBe('dng_fresh');
    });

    it('addDungeonStubToItem is idempotent against re-fire (id-match defensive check)', () => {
      saveItemToStorage(itemWithDungeonStubs);
      addDungeonStubToItem('The Helm of Eikheim', {
        dungeonId: 'dng_fresh',
        dungeonName: 'The Iron Sink',
      });
      const ok = addDungeonStubToItem('The Helm of Eikheim', {
        dungeonId: 'dng_fresh',
        dungeonName: 'The Iron Sink (Renamed)',  // different name, same id
      });
      expect(ok).toBe(false);  // id-match defensive no-op
      const stored = getItemFromStorage('The Helm of Eikheim');
      expect(stored.related_dungeons).toHaveLength(3);  // no duplicate
    });

    it('addDungeonStubToItem returns false when required args are missing', () => {
      saveItemToStorage(itemWithDungeonStubs);
      expect(addDungeonStubToItem(null, { dungeonId: 'x', dungeonName: 'y' })).toBe(false);
      expect(addDungeonStubToItem('The Helm of Eikheim', { dungeonName: 'y' })).toBe(false);
      expect(addDungeonStubToItem('The Helm of Eikheim', { dungeonId: 'x' })).toBe(false);
    });
  });

  describe('buildSeededInputFromItem — destinationType', () => {
    const item = {
      name: 'Heart of the Sunless Wood',
      item_type: 'Wondrous Item',
      rarity: 'Very Rare',
      physical_description: 'A jagged shard of obsidian wrapped in silver wire.',
      lore: 'Forged in the Whispering Glade by an unknown smith.',
      selectedRegister: 'Old-Norse-inspired',
      related_npcs: [
        { name: 'Yelena of the Duskwood', role_brief: 'Oracle who saw the vision', context: '', source_quote: '' },
      ],
      related_settings: [
        { name: 'The Whispering Glade', role_brief: 'Forge that produced the Heart', context: 'A clearing in the Sunless Wood', source_quote: '...the Whispering Glade...', setting_id: null },
        { name: 'Tower of Vorn', role_brief: 'Vault holding the Heart', context: '', source_quote: '', setting_id: null },
      ],
    };

    it('defaults to NPC stubs when destinationType is omitted (back-compat)', () => {
      saveItemToStorage(item);
      const seed = buildSeededInputFromItem({ fromId: 'Heart of the Sunless Wood' });
      expect(seed.entities).toHaveLength(1);
      expect(seed.entities[0].type).toBe('npc');
      expect(seed.entities[0].name).toBe('Yelena of the Duskwood');
    });

    it('pulls from related_settings when destinationType is "setting"', () => {
      saveItemToStorage(item);
      const seed = buildSeededInputFromItem({
        fromId: 'Heart of the Sunless Wood',
        destinationType: 'setting',
      });
      expect(seed.entities).toHaveLength(2);
      expect(seed.entities.every(e => e.type === 'location')).toBe(true);
      expect(seed.entities.map(e => e.name)).toEqual(['The Whispering Glade', 'Tower of Vorn']);
    });

    it('pulls from related_dungeons when destinationType is "dungeon" (post-split: dungeons have their own stub list)', () => {
      // Augment the fixture with a related_dungeons array so we can
      // verify the dispatch reads from there, not from related_settings.
      saveItemToStorage({
        ...item,
        related_dungeons: [
          { name: 'The Hollow Vault', role_brief: 'Tomb where the Heart was sealed', context: '', source_quote: '', dungeon_id: null },
          { name: 'Forge of Vorn', role_brief: 'Forge that produced the Heart', context: '', source_quote: '', dungeon_id: null },
        ],
      });
      const seed = buildSeededInputFromItem({
        fromId: 'Heart of the Sunless Wood',
        destinationType: 'dungeon',
      });
      expect(seed.entities[0].type).toBe('location');
      expect(seed.entities.map(e => e.name)).toEqual(['The Hollow Vault', 'Forge of Vorn']);
    });

    it('returns empty entities for destinationType="dungeon" when related_dungeons is absent (whole-item mode)', () => {
      // Item has related_settings but NO related_dungeons. The dispatch
      // should NOT spill over and pull from related_settings — the user
      // wants a dungeon from scratch in that case.
      saveItemToStorage(item);
      const seed = buildSeededInputFromItem({
        fromId: 'Heart of the Sunless Wood',
        destinationType: 'dungeon',
      });
      expect(seed.entities).toEqual([]);
    });

    it('with entityName + destinationType=setting, returns the single matching location stub', () => {
      saveItemToStorage(item);
      const seed = buildSeededInputFromItem({
        fromId: 'Heart of the Sunless Wood',
        entityName: 'tower of vorn',
        destinationType: 'setting',
      });
      expect(seed.entities).toHaveLength(1);
      expect(seed.entities[0].name).toBe('Tower of Vorn');
      expect(seed.entities[0].type).toBe('location');
    });

    it('returns null when entityName does not match any setting stub', () => {
      saveItemToStorage(item);
      const seed = buildSeededInputFromItem({
        fromId: 'Heart of the Sunless Wood',
        entityName: 'Nowhere Real',
        destinationType: 'setting',
      });
      expect(seed).toBeNull();
    });

    it('with no related_settings on the item, returns a seed with empty entities array (whole-item mode)', () => {
      saveItemToStorage({ ...item, related_settings: [] });
      const seed = buildSeededInputFromItem({
        fromId: 'Heart of the Sunless Wood',
        destinationType: 'setting',
      });
      expect(seed.entities).toEqual([]);
    });
  });

  describe('buildSeededInputFromItem — realized sibling entities', () => {
    it('surfaces promoted-only NPC + setting siblings on the seed source', () => {
      saveItemToStorage({
        name: 'The Heart',
        related_npcs: [
          { name: 'Yelena', role_brief: 'Oracle', npc_id: 'npc_yelena' },
          { name: 'Vorn', role_brief: 'Smith', npc_id: null },         // unpromoted, must be excluded
        ],
        related_settings: [
          { name: 'The Glade', role_brief: 'Forge', setting_id: 'set_glade' },
          { name: 'Tower', role_brief: 'Vault', setting_id: null },     // unpromoted, must be excluded
        ],
      });

      const seed = buildSeededInputFromItem({
        fromId: 'The Heart',
        destinationType: 'setting',
        entityName: 'Tower',
      });

      expect(seed.source.realized.npcs).toEqual([
        { name: 'Yelena', role_brief: 'Oracle' },
      ]);
      // Tower is the one being promoted → it's the entity, not a sibling.
      // The Glade is the only other promoted setting. setting_id is
      // carried through so SettingGenerator can resolve the canonical
      // setting for full-content sibling threading at prompt time.
      expect(seed.source.realized.settings).toEqual([
        { name: 'The Glade', role_brief: 'Forge', setting_id: 'set_glade' },
      ]);
    });

    it('excludes the entity currently being promoted from settings siblings (NPC dest)', () => {
      saveItemToStorage({
        name: 'The Heart',
        related_npcs: [
          { name: 'Yelena', role_brief: 'Oracle', npc_id: 'npc_yelena' },
          { name: 'Skragbit', role_brief: 'Shaman', npc_id: 'npc_skrag' },
        ],
        related_settings: [
          { name: 'The Glade', role_brief: 'Forge', setting_id: 'set_glade' },
        ],
      });

      const seed = buildSeededInputFromItem({
        fromId: 'The Heart',
        destinationType: 'npc',
        entityName: 'Yelena',
      });

      // Yelena is being promoted; only Skragbit is a sibling.
      expect(seed.source.realized.npcs).toEqual([
        { name: 'Skragbit', role_brief: 'Shaman' },
      ]);
      expect(seed.source.realized.settings).toEqual([
        { name: 'The Glade', role_brief: 'Forge', setting_id: 'set_glade' },
      ]);
    });

    it('returns empty realized arrays when there are no promoted siblings', () => {
      saveItemToStorage({
        name: 'Bare Item',
        related_npcs: [{ name: 'Vorn', npc_id: null }],
        related_settings: [{ name: 'Tower', setting_id: null }],
      });

      const seed = buildSeededInputFromItem({
        fromId: 'Bare Item',
        destinationType: 'setting',
      });

      expect(seed.source.realized.npcs).toEqual([]);
      expect(seed.source.realized.settings).toEqual([]);
    });

    it('handles items with no related arrays at all', () => {
      saveItemToStorage({ name: 'Empty Item' });
      const seed = buildSeededInputFromItem({
        fromId: 'Empty Item',
        destinationType: 'setting',
      });
      expect(seed.source.realized.npcs).toEqual([]);
      expect(seed.source.realized.settings).toEqual([]);
    });

    it('carries setting_id through so the destination tool can resolve canonical siblings', () => {
      saveItemToStorage({
        name: 'The Heart',
        related_settings: [
          { name: 'The Glade', role_brief: 'Forge', setting_id: 'set_glade' },
          { name: 'Tower', role_brief: 'Vault', setting_id: 'set_tower' },
        ],
      });

      const seed = buildSeededInputFromItem({
        fromId: 'The Heart',
        destinationType: 'setting',
        entityName: 'The Glade',
      });

      // Only the OTHER promoted setting (Tower) appears as a sibling,
      // and its setting_id is carried so SettingGenerator can call
      // getSettingById → consolidateOverviewToMarkdown to get the full
      // markdown for the prompt's SIBLING SETTINGS block.
      expect(seed.source.realized.settings).toEqual([
        { name: 'Tower', role_brief: 'Vault', setting_id: 'set_tower' },
      ]);
    });
  });

  describe('buildSeededInputFromItem — register propagation', () => {
    it('propagates persisted selectedRegister onto seed.source.register', () => {
      // Items generated after the register-persistence change carry
      // selectedRegister directly. The seed must surface it so the NPC
      // generator can use it without re-detection.
      saveItemToStorage({
        name: 'Sigrún\'s Spear',
        item_type: 'Weapon',
        rarity: 'Rare',
        physical_description: 'A spear with rune-etched haft.',
        lore: 'Wielded by Sigrún in the long winter.',
        selectedRegister: 'Old-Norse-inspired: Eddaic register (e.g., Sigrún)',
        related_npcs: [
          { name: 'Sigrún', role_brief: 'wielder', context: '', npc_id: null, npc_folder: null },
        ],
      });

      const seed = buildSeededInputFromItem({
        fromId: 'Sigrún\'s Spear',
        entityName: 'Sigrún',
      });

      expect(seed.source.register).toBe(
        'Old-Norse-inspired: Eddaic register (e.g., Sigrún)',
      );
    });

    it('returns null register for legacy items with no selectedRegister (cultural detection deleted)', () => {
      // Legacy items predate the persistence change. Earlier versions
      // ran cultural keyword detection over name + lore +
      // physical_description to recover a register from text signals
      // (Sigrún → Norse-inspired). The detection map was deleted during
      // the per-register migration sweep — the LLM's LANGUAGE REGISTER
      // OVERRIDE block handles cultural signals at generation time
      // instead. Legacy items now seed with register=null and the
      // generator's override authority takes over.
      saveItemToStorage({
        name: 'Sigrún\'s Hammer',
        item_type: 'Weapon',
        rarity: 'Rare',
        physical_description: 'A heavy iron hammer with rune-etched haft.',
        lore: 'Forged by Sigrún and bearing the mark of Mjolnir-style runework.',
        related_npcs: [
          { name: 'Sigrún', role_brief: 'wielder', context: '', npc_id: null, npc_folder: null },
        ],
      });

      const seed = buildSeededInputFromItem({
        fromId: 'Sigrún\'s Hammer',
        entityName: 'Sigrún',
      });

      expect(seed.source.register).toBeNull();
    });

    it('returns null register when legacy item has no detectable signal', () => {
      saveItemToStorage({
        name: 'Plain Dagger',
        item_type: 'Weapon',
        rarity: 'Common',
        physical_description: 'An unremarkable iron dagger.',
        lore: 'No story is known about this dagger.',
        related_npcs: [
          { name: 'A Bystander', role_brief: 'observer', context: '', npc_id: null, npc_folder: null },
        ],
      });

      const seed = buildSeededInputFromItem({
        fromId: 'Plain Dagger',
        entityName: 'A Bystander',
      });

      // Detection on undetectable text returns null (which the caller
      // treats as "no register signal from the item — fall through to
      // user-input detection").
      expect(seed.source.register).toBe(null);
    });
  });

  describe('leadingWordMatch', () => {
    test('exact match (case-insensitive, trimmed)', () => {
      expect(leadingWordMatch('Stonemother', 'Stonemother')).toBe(true);
      expect(leadingWordMatch('STONEMOTHER', 'stonemother')).toBe(true);
      expect(leadingWordMatch('  Stonemother  ', 'Stonemother')).toBe(true);
    });

    test('shorter name is a leading word-prefix of longer name', () => {
      expect(leadingWordMatch('Stonemother', 'Stonemother range')).toBe(true);
      expect(leadingWordMatch('Stonemother range', 'Stonemother')).toBe(true); // symmetric
      expect(leadingWordMatch('Broken Gate', 'Broken Gate Battlefield')).toBe(true);
    });

    test('leading "the " article is stripped before matching', () => {
      expect(leadingWordMatch('the Stonemother', 'Stonemother')).toBe(true);
      expect(leadingWordMatch('Stonemother', 'the Stonemother')).toBe(true);
      expect(leadingWordMatch('the Stonemother', 'the Stonemother range')).toBe(true);
    });

    test('trailing-word match is NOT a match (only leading)', () => {
      expect(leadingWordMatch('Stonemother', 'Range of Stonemother')).toBe(false);
      expect(leadingWordMatch('Gate', 'the Broken Gate')).toBe(false);
    });

    test('possessive split keeps the apostrophe attached, avoiding false positives', () => {
      // "Stonemother" tokens = ["stonemother"]
      // "Stonemother's Daughter" tokens = ["stonemother's", "daughter"]
      // First-token comparison: "stonemother" !== "stonemother's"
      expect(leadingWordMatch('Stonemother', "Stonemother's Daughter")).toBe(false);
      expect(leadingWordMatch("Stonemother's Daughter", 'Stonemother')).toBe(false);
    });

    test('different first words do not match', () => {
      expect(leadingWordMatch('Stonemother', 'Ironmother')).toBe(false);
      expect(leadingWordMatch('Broken Gate', 'Broken Wheel')).toBe(false);
      // Only the leading sequence has to match; second tokens may diverge,
      // but only AFTER all the shorter name's tokens have matched.
    });

    test('empty / whitespace / non-string inputs return false', () => {
      expect(leadingWordMatch('', 'Stonemother')).toBe(false);
      expect(leadingWordMatch('Stonemother', '')).toBe(false);
      expect(leadingWordMatch('   ', 'Stonemother')).toBe(false);
      expect(leadingWordMatch(null, 'Stonemother')).toBe(false);
      expect(leadingWordMatch('Stonemother', undefined)).toBe(false);
      expect(leadingWordMatch(42, 'Stonemother')).toBe(false);
    });
  });

  describe('findItemStubMatchingName', () => {
    test('returns the matching stub when leading-word match hits', () => {
      saveItemToStorage({
        name: 'Vardlokkur',
        related_settings: [
          { name: 'Stonemother', role_brief: 'mountain-range' },
          { name: 'the Broken Gate', role_brief: 'battlefield' },
        ],
      });

      const match = findItemStubMatchingName('Vardlokkur', 'Stonemother range');
      expect(match).toBeTruthy();
      expect(match.name).toBe('Stonemother');
    });

    test('matches "the X" against item stub "X" and vice versa', () => {
      saveItemToStorage({
        name: 'Vardlokkur',
        related_settings: [{ name: 'Stonemother' }],
      });
      expect(findItemStubMatchingName('Vardlokkur', 'the Stonemother').name).toBe('Stonemother');
      expect(findItemStubMatchingName('Vardlokkur', 'the Stonemother range').name).toBe('Stonemother');
    });

    test('returns the shortest match when multiple stubs match (canonical short form wins)', () => {
      saveItemToStorage({
        name: 'Vardlokkur',
        related_settings: [
          { name: 'Stonemother range', role_brief: 'longer' },
          { name: 'Stonemother', role_brief: 'short' },
        ],
      });

      const match = findItemStubMatchingName('Vardlokkur', 'Stonemother peaks');
      expect(match.name).toBe('Stonemother');
    });

    test('returns null when no stub matches', () => {
      saveItemToStorage({
        name: 'Vardlokkur',
        related_settings: [{ name: 'Stonemother' }, { name: 'the Broken Gate' }],
      });
      expect(findItemStubMatchingName('Vardlokkur', 'Aethelmar')).toBeNull();
      expect(findItemStubMatchingName('Vardlokkur', 'Range of Stonemother')).toBeNull();
    });

    test('returns null when item is not in storage', () => {
      expect(findItemStubMatchingName('NonexistentItem', 'Stonemother')).toBeNull();
    });

    test('returns null when item has no related_settings', () => {
      saveItemToStorage({ name: 'BareItem' });
      expect(findItemStubMatchingName('BareItem', 'Anything')).toBeNull();
    });

    test('returns null for empty / missing arguments', () => {
      saveItemToStorage({ name: 'Vardlokkur', related_settings: [{ name: 'Stonemother' }] });
      expect(findItemStubMatchingName('', 'Stonemother')).toBeNull();
      expect(findItemStubMatchingName('Vardlokkur', '')).toBeNull();
      expect(findItemStubMatchingName(null, null)).toBeNull();
    });
  });

  describe('addSettingStubToItem', () => {
    test('pushes a fresh stub when the item has no matching name', () => {
      saveItemToStorage({
        name: 'Vardlokkur',
        related_settings: [{ name: 'Stonemother', source_quote: 'lore' }],
      });
      const ok = addSettingStubToItem('Vardlokkur', {
        settingId: 'set_korrin',
        settingName: 'Korrin Outpost',
        roleBrief: 'Watch-keepers post on the spur',
      });
      expect(ok).toBe(true);

      const item = getItemFromStorage('Vardlokkur');
      const korrin = item.related_settings.find(s => s.name === 'Korrin Outpost');
      expect(korrin).toEqual({
        name: 'Korrin Outpost',
        setting_id: 'set_korrin',
        role_brief: 'Watch-keepers post on the spur',
      });
      // The descendant stub has NO source_quote — that's the data-
      // layer distinction from lore-extracted stubs.
      expect('source_quote' in korrin).toBe(false);
    });

    test('updates an existing same-name stub instead of duplicating (lore-first ordering)', () => {
      // Lore extraction surfaced "Korrin Outpost" first (with a quote);
      // descendant creation came later. The existing stub's setting_id
      // gets set; the source_quote stays.
      saveItemToStorage({
        name: 'Vardlokkur',
        related_settings: [{
          name: 'Korrin Outpost',
          source_quote: 'a lonely watch on the spur',
          role_brief: 'extracted role',
        }],
      });

      const ok = addSettingStubToItem('Vardlokkur', {
        settingId: 'set_korrin',
        settingName: 'Korrin Outpost',
        roleBrief: 'Watch-keepers post on the spur',
      });
      expect(ok).toBe(true);

      const item = getItemFromStorage('Vardlokkur');
      expect(item.related_settings).toHaveLength(1);
      const stub = item.related_settings[0];
      expect(stub.setting_id).toBe('set_korrin');
      // The lore source_quote survives the link.
      expect(stub.source_quote).toBe('a lonely watch on the spur');
    });

    test('no-op when a stub already has this setting_id (idempotent on repeat fire)', () => {
      saveItemToStorage({
        name: 'Vardlokkur',
        related_settings: [
          { name: 'Korrin Outpost', setting_id: 'set_korrin', role_brief: 'first add' },
        ],
      });
      // Second fire under a different name (e.g. setting was renamed
      // after the first add) but same setting_id.
      const ok = addSettingStubToItem('Vardlokkur', {
        settingId: 'set_korrin',
        settingName: 'Korrin Watch',  // different name
        roleBrief: 'second-add role',
      });
      expect(ok).toBe(false);

      const item = getItemFromStorage('Vardlokkur');
      expect(item.related_settings).toHaveLength(1);
      expect(item.related_settings[0].name).toBe('Korrin Outpost');
      expect(item.related_settings[0].role_brief).toBe('first add');
    });

    test('initializes related_settings array when item has none', () => {
      saveItemToStorage({ name: 'BareItem' });
      const ok = addSettingStubToItem('BareItem', {
        settingId: 'set_x',
        settingName: 'X',
      });
      expect(ok).toBe(true);
      const item = getItemFromStorage('BareItem');
      expect(item.related_settings).toEqual([
        { name: 'X', setting_id: 'set_x', role_brief: '' },
      ]);
    });

    test('returns false when item does not exist', () => {
      const ok = addSettingStubToItem('NonexistentItem', {
        settingId: 'set_x',
        settingName: 'X',
      });
      expect(ok).toBe(false);
    });

    test('returns false on missing required arguments', () => {
      saveItemToStorage({ name: 'Vardlokkur', related_settings: [] });
      expect(addSettingStubToItem('', { settingId: 'a', settingName: 'b' })).toBe(false);
      expect(addSettingStubToItem('Vardlokkur', { settingName: 'b' })).toBe(false);
      expect(addSettingStubToItem('Vardlokkur', { settingId: 'a' })).toBe(false);
      expect(addSettingStubToItem('Vardlokkur', undefined)).toBe(false);
    });

    test('resetItemStubsForDeletedSetting clears the back-link cleanly', () => {
      // Symmetry check: when Korrin gets created, then deleted, the
      // Vardlokkur stub's setting_id should clear back to null. The
      // existing reset helper already handles this — verify it does
      // the right thing on a descendant-added stub.
      saveItemToStorage({ name: 'Vardlokkur', related_settings: [] });
      addSettingStubToItem('Vardlokkur', {
        settingId: 'set_korrin',
        settingName: 'Korrin Outpost',
      });
      resetItemStubsForDeletedSetting('set_korrin');

      const item = getItemFromStorage('Vardlokkur');
      const stub = item.related_settings.find(s => s.name === 'Korrin Outpost');
      // Stub stays (the name and role survive deletion), but setting_id clears.
      expect(stub).toBeTruthy();
      expect(stub.setting_id).toBeFalsy();
    });
  });

  describe('reconcileNPCStubsAgainstItem', () => {
    // Helper: a minimal item with the given NPC-stub names.
    function itemWith(name, npcStubNames) {
      return {
        name,
        related_npcs: npcStubNames.map(n => ({ name: n })),
      };
    }

    it('stamps seeded_from on a destination stub whose name matches an item stub', () => {
      saveItemToStorage(itemWith('Vardlokkur', ['Brother Aldric', 'Sigrun']));
      const destStubs = [
        { npc_id: 'npc_1', name: 'Brother Aldric', short_description: 'monastic recorder' },
        { npc_id: 'npc_2', name: 'Kara', short_description: 'town reeve' },
      ];

      const result = reconcileNPCStubsAgainstItem(destStubs, 'Vardlokkur');

      expect(result[0].seeded_from).toEqual({
        source_type: 'item',
        source_id: 'Vardlokkur',
        source_name: 'Vardlokkur',
        stub_name: 'Brother Aldric',
      });
      // Non-matching stub is untouched.
      expect(result[1].seeded_from).toBeUndefined();
      expect(result[1].name).toBe('Kara');
    });

    it('matches case-insensitively after trim', () => {
      saveItemToStorage(itemWith('Vardlokkur', ['Brother Aldric']));
      const destStubs = [
        { npc_id: 'npc_1', name: '  BROTHER ALDRIC  ', short_description: '...' },
      ];

      const result = reconcileNPCStubsAgainstItem(destStubs, 'Vardlokkur');

      // The match fires, and the back-pointer's stub_name preserves the
      // item-side casing (the canonical anchor) — not the destination's
      // raw input. Promotion flows look the source up by stub_name.
      expect(result[0].seeded_from?.stub_name).toBe('Brother Aldric');
    });

    it('preserves an existing seeded_from rather than overwriting it', () => {
      saveItemToStorage(itemWith('Vardlokkur', ['Brother Aldric']));
      const priorProvenance = {
        source_type: 'item',
        source_id: 'OtherItem',
        source_name: 'OtherItem',
        stub_name: 'Brother Aldric (other)',
      };
      const destStubs = [
        { npc_id: 'npc_1', name: 'Brother Aldric', seeded_from: priorProvenance },
      ];

      const result = reconcileNPCStubsAgainstItem(destStubs, 'Vardlokkur');

      // Caller already stamped provenance — that wins. Reconcile must
      // not silently rewrite the source pointer.
      expect(result[0].seeded_from).toEqual(priorProvenance);
    });

    it('returns the input array unchanged when the item is missing', () => {
      // No item saved at all.
      const destStubs = [{ npc_id: 'npc_1', name: 'Brother Aldric' }];

      const result = reconcileNPCStubsAgainstItem(destStubs, 'NoSuchItem');

      expect(result).toBe(destStubs);
    });

    it('returns the input array unchanged when the item has no related_npcs', () => {
      saveItemToStorage({ name: 'Vardlokkur' });
      const destStubs = [{ npc_id: 'npc_1', name: 'Brother Aldric' }];

      const result = reconcileNPCStubsAgainstItem(destStubs, 'Vardlokkur');

      expect(result).toBe(destStubs);
    });

    it('returns the input array unchanged when no destination names match', () => {
      saveItemToStorage(itemWith('Vardlokkur', ['Brother Aldric']));
      const destStubs = [
        { npc_id: 'npc_1', name: 'Kara' },
        { npc_id: 'npc_2', name: 'Magnus' },
      ];

      const result = reconcileNPCStubsAgainstItem(destStubs, 'Vardlokkur');

      // Result is a new array (map always returns a new one), but every
      // entry is === to its source — no stamping happened.
      for (let i = 0; i < destStubs.length; i++) {
        expect(result[i]).toBe(destStubs[i]);
      }
    });

    it('does not mutate the input stubs', () => {
      saveItemToStorage(itemWith('Vardlokkur', ['Brother Aldric']));
      const original = { npc_id: 'npc_1', name: 'Brother Aldric' };
      const destStubs = [original];

      reconcileNPCStubsAgainstItem(destStubs, 'Vardlokkur');

      // Original instance is untouched — reconcile must return a new
      // array of new stub objects.
      expect(original.seeded_from).toBeUndefined();
    });

    it('handles empty / non-array input gracefully', () => {
      saveItemToStorage(itemWith('Vardlokkur', ['Brother Aldric']));

      expect(reconcileNPCStubsAgainstItem([], 'Vardlokkur')).toEqual([]);
      expect(reconcileNPCStubsAgainstItem(null, 'Vardlokkur')).toEqual([]);
      expect(reconcileNPCStubsAgainstItem(undefined, 'Vardlokkur')).toEqual([]);
    });

    it('no-ops when itemName is missing', () => {
      const destStubs = [{ npc_id: 'npc_1', name: 'Brother Aldric' }];

      expect(reconcileNPCStubsAgainstItem(destStubs, '')).toBe(destStubs);
      expect(reconcileNPCStubsAgainstItem(destStubs, null)).toBe(destStubs);
      expect(reconcileNPCStubsAgainstItem(destStubs, undefined)).toBe(destStubs);
    });
  });
});
