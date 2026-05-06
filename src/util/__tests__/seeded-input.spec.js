/**
 * @jest-environment jsdom
 */

import {
  loadSeededInput,
  buildPrefillForSeed,
  writeBackPromotedNPC,
  addReferenceForSeed,
  findStubsReferencingNPC,
  resetStubsForDeletedNPC,
  renderSeededInputBlock,
  getToolForSourceType,
  addMembershipReferenceForCanonical,
  sourceExists,
} from '../seeded-input.mjs';

describe('seeded-input', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('loadSeededInput (item case)', () => {
    it('builds a SeededInput from item + stub name', () => {
      localStorage.setItem('savedItems', JSON.stringify([{
        name: 'Hearthstaff',
        item_type: 'Staff',
        rarity: 'Common',
        physical_description: 'A gnarled staff.',
        lore: 'A vision granted to Yelena.',
        related_npcs: [
          {
            name: 'Yelena',
            role_brief: 'oracle',
            context: 'received the vision',
            source_quote: 'Yelena saw a branch.',
          },
        ],
      }]));

      const seed = loadSeededInput({
        fromType: 'item',
        fromId: 'Hearthstaff',
        entityName: 'Yelena',
      });

      expect(seed).toBeTruthy();
      expect(seed.source.type).toBe('item');
      expect(seed.source.id).toBe('Hearthstaff');
      expect(seed.source.name).toBe('Hearthstaff');
      expect(seed.source.quote).toBe('Yelena saw a branch.');
      expect(seed.entities[0].name).toBe('Yelena');
      expect(seed.entities[0].role_or_description).toBe('oracle');
      expect(seed.entities[0].context).toBe('received the vision');
    });

    it('returns null when the item does not exist', () => {
      expect(loadSeededInput({ fromType: 'item', fromId: 'Nope', entityName: 'X' })).toBeNull();
    });

    it('returns null when the stub does not exist', () => {
      localStorage.setItem('savedItems', JSON.stringify([{
        name: 'Hearthstaff',
        related_npcs: [{ name: 'Yelena' }],
      }]));
      expect(loadSeededInput({ fromType: 'item', fromId: 'Hearthstaff', entityName: 'NotFound' })).toBeNull();
    });

    it('returns null for unknown source types', () => {
      expect(loadSeededInput({ fromType: 'mystery', fromId: 'X', entityName: 'Y' })).toBeNull();
    });

    it('returns ALL stubs as entities when entityName is omitted (whole-item seeding)', () => {
      localStorage.setItem('savedItems', JSON.stringify([{
        name: 'Hearthstaff',
        item_type: 'Staff',
        rarity: 'Common',
        physical_description: 'Aged blackwood.',
        lore: 'A vision granted to Yelena and witnessed by Morghul.',
        related_npcs: [
          { name: 'Yelena', role_brief: 'oracle', context: 'received the vision', source_quote: 'Yelena saw a branch.' },
          { name: 'Morghul', role_brief: 'watcher', context: 'witnessed the vision' },
        ],
      }]));

      const seed = loadSeededInput({ fromType: 'item', fromId: 'Hearthstaff' });

      expect(seed).toBeTruthy();
      expect(seed.source.type).toBe('item');
      expect(seed.entities.length).toBe(2);
      expect(seed.entities[0].name).toBe('Yelena');
      expect(seed.entities[0].source_quote).toBe('Yelena saw a branch.');
      expect(seed.entities[1].name).toBe('Morghul');
      // In whole-item mode, the seed-level quote is unset (per-entity quotes only).
      expect(seed.source.quote).toBeUndefined();
    });

    it('returns a SeededInput with empty entities when item has no related_npcs (whole-item mode)', () => {
      localStorage.setItem('savedItems', JSON.stringify([{
        name: 'Plainstaff',
        item_type: 'Staff',
        rarity: 'Common',
        physical_description: 'A simple staff.',
        lore: 'Nothing notable.',
        // no related_npcs
      }]));

      const seed = loadSeededInput({ fromType: 'item', fromId: 'Plainstaff' });

      expect(seed).toBeTruthy();
      expect(seed.entities).toEqual([]);
    });
  });

  describe('round-trip: nav params → SeededInput → prefill', () => {
    it('produces the expected prompt fragment for the item case', () => {
      localStorage.setItem('savedItems', JSON.stringify([{
        name: "Krovnik's Hearthstaff",
        item_type: 'Staff',
        rarity: 'Common',
        physical_description: 'Aged blackwood.',
        lore: 'A vision granted to the oracle Yelena.',
        related_npcs: [
          { name: 'Yelena', role_brief: 'oracle who saw the vision', context: 'prophet' },
        ],
      }]));

      const seed = loadSeededInput({
        fromType: 'item',
        fromId: "Krovnik's Hearthstaff",
        entityName: 'Yelena',
      });
      const prefill = buildPrefillForSeed(seed);

      expect(prefill).toContain('Name: Yelena');
      expect(prefill).toContain('Role: oracle who saw the vision.');
      expect(prefill).toContain('Mentioned in lore of Krovnik\'s Hearthstaff.');
      expect(prefill).toContain('Aged blackwood.');
      expect(prefill).toContain('Lore:');
      expect(prefill).toContain('Specific role: prophet');
    });
  });

  describe('addReferenceForSeed', () => {
    it('writes a mentioned_in_item ref for an item → npc seed', () => {
      const seed = {
        source: { type: 'item', id: 'Hearthstaff', name: 'Hearthstaff' },
        entities: [{ type: 'npc', name: 'Yelena' }],
      };
      addReferenceForSeed(seed, { type: 'npc', id: 'npc_abc', name: 'Yelena' });

      const refs = Object.values(JSON.parse(localStorage.getItem('tool-references')));
      const created = refs.find(r =>
        r.relationship === 'mentioned_in_item'
        && r.source_id === 'npc_abc'
        && r.target_id === 'Hearthstaff'
      );
      expect(created).toBeTruthy();
    });

    it('writes an inspired_by_item ref for an item → setting seed', () => {
      const seed = {
        source: { type: 'item', id: 'Hearthstaff', name: 'Hearthstaff' },
        entities: [],
      };
      addReferenceForSeed(seed, { type: 'setting', id: 'set_xyz', name: 'Eldergrove' });

      const refs = Object.values(JSON.parse(localStorage.getItem('tool-references')));
      const created = refs.find(r =>
        r.relationship === 'inspired_by_item'
        && r.source_type === 'setting'
        && r.source_id === 'set_xyz'
        && r.target_type === 'item'
        && r.target_id === 'Hearthstaff'
      );
      expect(created).toBeTruthy();
    });

    it('writes an inspired_by_item ref for an item → dungeon seed', () => {
      const seed = {
        source: { type: 'item', id: 'Hearthstaff', name: 'Hearthstaff' },
        entities: [],
      };
      addReferenceForSeed(seed, { type: 'dungeon', id: 'dng_xyz', name: 'Crypt' });

      const refs = Object.values(JSON.parse(localStorage.getItem('tool-references')));
      const created = refs.find(r =>
        r.relationship === 'inspired_by_item'
        && r.source_type === 'dungeon'
        && r.source_id === 'dng_xyz'
      );
      expect(created).toBeTruthy();
    });

    it('writes appears_in_setting for a setting → npc seed', () => {
      const seed = {
        source: { type: 'setting', id: 'set_xyz', name: 'Eldergrove' },
        entities: [{ type: 'npc', name: 'Aldric' }],
      };
      addReferenceForSeed(seed, { type: 'npc', id: 'npc_abc', name: 'Aldric' });

      const refs = Object.values(JSON.parse(localStorage.getItem('tool-references')));
      const created = refs.find(r => r.relationship === 'appears_in_setting');
      expect(created).toBeTruthy();
      expect(created.source_id).toBe('npc_abc');
      expect(created.target_id).toBe('set_xyz');
    });

    it('writes BOTH primary and secondary edges when entity has seeded_from', () => {
      // Setting-tab promotion of a stub that originated as an item-stub.
      const seed = {
        source: { type: 'setting', id: 'set_xyz', name: 'Eldergrove' },
        entities: [{
          type: 'npc',
          name: 'Yelena',
          seeded_from: {
            source_type: 'item',
            source_id: 'Hearthstaff',
            source_name: 'Hearthstaff',
            stub_name: 'Yelena',
          },
        }],
      };
      addReferenceForSeed(seed, { type: 'npc', id: 'npc_abc', name: 'Yelena' });

      const refs = Object.values(JSON.parse(localStorage.getItem('tool-references')));
      const settingEdge = refs.find(r => r.relationship === 'appears_in_setting');
      const itemEdge = refs.find(r => r.relationship === 'mentioned_in_item');
      expect(settingEdge).toBeTruthy();
      expect(itemEdge).toBeTruthy();
      expect(settingEdge.target_id).toBe('set_xyz');
      expect(itemEdge.target_id).toBe('Hearthstaff');
    });

    it('does not write secondary edges when destination is not npc', () => {
      // An item → setting flow doesn't carry seeded_from semantics
      // (settings have no "stub of another tool" provenance).
      const seed = {
        source: { type: 'item', id: 'Hearthstaff', name: 'Hearthstaff' },
        entities: [{
          type: 'npc',
          name: 'Yelena',
          // hypothetically nonsensical, but the code shouldn't act on it
          seeded_from: { source_type: 'item', source_id: 'OtherItem', source_name: 'OtherItem', stub_name: 'Yelena' },
        }],
      };
      addReferenceForSeed(seed, { type: 'setting', id: 'set_xyz', name: 'Eldergrove' });

      const refs = Object.values(JSON.parse(localStorage.getItem('tool-references')));
      // Only the primary inspired_by_item edge.
      expect(refs.length).toBe(1);
      expect(refs[0].relationship).toBe('inspired_by_item');
    });

    it('returns null and writes nothing for an unknown source type', () => {
      const seed = {
        source: { type: 'unknown', id: 'X', name: 'X' },
        entities: [{ type: 'npc', name: 'Y' }],
      };
      const result = addReferenceForSeed(seed, { type: 'npc', id: 'npc_abc', name: 'Y' });
      expect(result).toBeNull();
      expect(localStorage.getItem('tool-references')).toBeNull();
    });

    it('returns null and writes nothing for an unknown destination type', () => {
      const seed = {
        source: { type: 'item', id: 'Hearthstaff', name: 'Hearthstaff' },
        entities: [],
      };
      const result = addReferenceForSeed(seed, { type: 'mystery', id: 'x', name: 'x' });
      expect(result).toBeNull();
      expect(localStorage.getItem('tool-references')).toBeNull();
    });
  });

  describe('loadSeededInput dispatch (setting/dungeon)', () => {
    it('dispatches to setting builder for fromType=setting', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_xyz', place_name: 'Eldergrove', npcs: [{ name: 'Aldric', short_description: 'ranger' }] },
      ]));

      const seed = loadSeededInput({ fromType: 'setting', fromId: 'set_xyz', entityName: 'Aldric' });
      expect(seed).toBeTruthy();
      expect(seed.source.type).toBe('setting');
      expect(seed.entities[0].name).toBe('Aldric');
    });

    it('dispatches to dungeon builder for fromType=dungeon', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_xyz', dungeonOverview: { name: 'Crypt' }, npcs: [{ name: 'Aldric' }] },
      ]));

      const seed = loadSeededInput({ fromType: 'dungeon', fromId: 'dng_xyz', entityName: 'Aldric' });
      expect(seed).toBeTruthy();
      expect(seed.source.type).toBe('dungeon');
    });
  });

  describe('writeBackPromotedNPC — bidirectional cross-container symmetry', () => {
    it('Direction A: setting-tab promotion updates BOTH setting stub and item stub via seeded_from', () => {
      // Item with a stub that was previously seeded into a setting.
      localStorage.setItem('savedItems', JSON.stringify([{
        name: 'Hearthstaff',
        related_npcs: [{ name: 'Yelena', npc_id: null, npc_folder: null }],
      }]));
      localStorage.setItem('gameSettings', JSON.stringify([{
        id: 'set_xyz',
        place_name: 'Eldergrove',
        npcs: [{
          name: 'Yelena',
          npc_id: null,
          seeded_from: {
            source_type: 'item',
            source_id: 'Hearthstaff',
            source_name: 'Hearthstaff',
            stub_name: 'Yelena',
          },
        }],
      }]));

      // User clicks Create NPC on the setting's Yelena stub.
      const seed = {
        source: { type: 'setting', id: 'set_xyz', name: 'Eldergrove' },
        entities: [{
          type: 'npc',
          name: 'Yelena',
          seeded_from: {
            source_type: 'item',
            source_id: 'Hearthstaff',
            source_name: 'Hearthstaff',
            stub_name: 'Yelena',
          },
        }],
      };
      writeBackPromotedNPC(seed, { npc_id: 'npc_abc', name: 'Yelena', folderName: 'Heroes' });

      // Setting stub updated (Direction-A primary).
      const settings = JSON.parse(localStorage.getItem('gameSettings'));
      expect(settings[0].npcs[0].npc_id).toBe('npc_abc');
      // Item stub updated (Direction-A secondary, via seeded_from iteration).
      const items = JSON.parse(localStorage.getItem('savedItems'));
      expect(items[0].related_npcs[0].npc_id).toBe('npc_abc');
    });

    it('Direction B: item-card promotion sweeps settings/dungeons whose stubs share the seed', () => {
      // Item + setting with a Yelena stub seeded from this item + dungeon
      // with a Yelena stub seeded from the same item. Item-card promotion
      // should update all three.
      localStorage.setItem('savedItems', JSON.stringify([{
        name: 'Hearthstaff',
        related_npcs: [{ name: 'Yelena', npc_id: null }],
      }]));
      localStorage.setItem('gameSettings', JSON.stringify([{
        id: 'set_xyz',
        place_name: 'Eldergrove',
        npcs: [{
          name: 'Yelena',
          npc_id: null,
          seeded_from: { source_type: 'item', source_id: 'Hearthstaff', stub_name: 'Yelena' },
        }],
      }]));
      localStorage.setItem('dungeons', JSON.stringify([{
        id: 'dng_xyz',
        dungeonOverview: { name: 'Crypt' },
        npcs: [{
          name: 'Yelena',
          npc_id: null,
          seeded_from: { source_type: 'item', source_id: 'Hearthstaff', stub_name: 'Yelena' },
        }],
      }]));

      // User clicks Create NPC on the item's Yelena stub.
      const seed = {
        source: { type: 'item', id: 'Hearthstaff', name: 'Hearthstaff' },
        entities: [{ type: 'npc', name: 'Yelena' }],
      };
      writeBackPromotedNPC(seed, { npc_id: 'npc_abc', name: 'Yelena', folderName: 'Heroes' });

      // Item stub updated (primary).
      expect(JSON.parse(localStorage.getItem('savedItems'))[0].related_npcs[0].npc_id).toBe('npc_abc');
      // Setting stub updated (Direction-B sweep).
      expect(JSON.parse(localStorage.getItem('gameSettings'))[0].npcs[0].npc_id).toBe('npc_abc');
      // Dungeon stub updated (Direction-B sweep).
      expect(JSON.parse(localStorage.getItem('dungeons'))[0].npcs[0].npc_id).toBe('npc_abc');
    });
  });

  describe('addMembershipReferenceForCanonical', () => {
    it('writes appears_in_setting for an existing canonical npc → setting', () => {
      const refId = addMembershipReferenceForCanonical(
        { type: 'npc', id: 'npc_abc', name: 'Yelena' },
        { type: 'setting', id: 'set_xyz', name: 'Eldergrove' }
      );
      expect(refId).toBeTruthy();
      const refs = Object.values(JSON.parse(localStorage.getItem('tool-references')));
      expect(refs[0].relationship).toBe('appears_in_setting');
      expect(refs[0].source_id).toBe('npc_abc');
      expect(refs[0].target_id).toBe('set_xyz');
    });

    it('writes appears_in_dungeon for an existing canonical npc → dungeon', () => {
      const refId = addMembershipReferenceForCanonical(
        { type: 'npc', id: 'npc_abc', name: 'Yelena' },
        { type: 'dungeon', id: 'dng_xyz', name: 'Crypt' }
      );
      expect(refId).toBeTruthy();
      const refs = Object.values(JSON.parse(localStorage.getItem('tool-references')));
      expect(refs[0].relationship).toBe('appears_in_dungeon');
    });

    it('is idempotent (addReference dedups duplicates)', () => {
      addMembershipReferenceForCanonical(
        { type: 'npc', id: 'npc_abc', name: 'Yelena' },
        { type: 'setting', id: 'set_xyz', name: 'Eldergrove' }
      );
      addMembershipReferenceForCanonical(
        { type: 'npc', id: 'npc_abc', name: 'Yelena' },
        { type: 'setting', id: 'set_xyz', name: 'Eldergrove' }
      );
      const refs = Object.values(JSON.parse(localStorage.getItem('tool-references')));
      expect(refs.length).toBe(1);
    });

    it('returns null when member or container has no id', () => {
      expect(addMembershipReferenceForCanonical(
        { type: 'npc', name: 'X' },
        { type: 'setting', id: 'set_x', name: 'Y' }
      )).toBeNull();
      expect(addMembershipReferenceForCanonical(
        { type: 'npc', id: 'x', name: 'X' },
        { type: 'setting', name: 'Y' }
      )).toBeNull();
    });

    it('returns null when the relationship cannot be looked up', () => {
      // No PROMOTION_RELATIONSHIPS entry for (mystery, npc).
      expect(addMembershipReferenceForCanonical(
        { type: 'npc', id: 'x', name: 'X' },
        { type: 'mystery', id: 'y', name: 'Y' }
      )).toBeNull();
    });
  });

  describe('findStubsReferencingNPC dispatch (setting/dungeon)', () => {
    it('returns matches from settings tagged with sourceType=setting', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_xyz', place_name: 'Eldergrove', npcs: [{ name: 'Yelena', npc_id: 'npc_abc' }] },
      ]));

      const matches = findStubsReferencingNPC('npc_abc');
      const settingMatch = matches.find(m => m.sourceType === 'setting');
      expect(settingMatch).toEqual({
        sourceType: 'setting',
        sourceId: 'set_xyz',
        sourceName: 'Eldergrove',
        stubName: 'Yelena',
      });
    });

    it('returns matches from dungeons tagged with sourceType=dungeon', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_xyz', dungeonOverview: { name: 'Crypt' }, npcs: [{ name: 'Yelena', npc_id: 'npc_abc' }] },
      ]));

      const matches = findStubsReferencingNPC('npc_abc');
      const dungeonMatch = matches.find(m => m.sourceType === 'dungeon');
      expect(dungeonMatch).toEqual({
        sourceType: 'dungeon',
        sourceId: 'dng_xyz',
        sourceName: 'Crypt',
        stubName: 'Yelena',
      });
    });
  });

  describe('resetStubsForDeletedNPC dispatch (setting/dungeon)', () => {
    it('resets stubs across items, settings, and dungeons', () => {
      localStorage.setItem('savedItems', JSON.stringify([
        { name: 'Hearthstaff', related_npcs: [{ name: 'Yelena', npc_id: 'npc_abc' }] },
      ]));
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_xyz', place_name: 'X', npcs: [{ name: 'Yelena', npc_id: 'npc_abc' }] },
      ]));
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_xyz', dungeonOverview: { name: 'X' }, npcs: [{ name: 'Yelena', npc_id: 'npc_abc' }] },
      ]));

      const total = resetStubsForDeletedNPC('npc_abc');
      expect(total).toBe(3);

      expect(JSON.parse(localStorage.getItem('savedItems'))[0].related_npcs[0].npc_id).toBeNull();
      expect(JSON.parse(localStorage.getItem('gameSettings'))[0].npcs[0].npc_id).toBeNull();
      expect(JSON.parse(localStorage.getItem('dungeons'))[0].npcs[0].npc_id).toBeNull();
    });
  });

  describe('writeBackPromotedNPC', () => {
    it('updates the matching item stub with the new npc_id', () => {
      localStorage.setItem('savedItems', JSON.stringify([{
        name: 'Hearthstaff',
        related_npcs: [
          { name: 'Yelena', role_brief: '', context: '', npc_id: null },
        ],
      }]));
      const seed = {
        source: { type: 'item', id: 'Hearthstaff', name: 'Hearthstaff' },
        entities: [{ type: 'npc', name: 'Yelena' }],
      };

      writeBackPromotedNPC(seed, { npc_id: 'npc_abc', name: 'Yelena', folderName: 'Heroes' });

      const items = JSON.parse(localStorage.getItem('savedItems'));
      expect(items[0].related_npcs[0].npc_id).toBe('npc_abc');
      expect(items[0].related_npcs[0]).not.toHaveProperty('npc_folder');
    });
  });

  describe('findStubsReferencingNPC', () => {
    it('returns matches across source-tool stub stores tagged with sourceType', () => {
      localStorage.setItem('savedItems', JSON.stringify([{
        name: 'Hearthstaff',
        related_npcs: [{ name: 'Yelena', npc_id: 'npc_abc' }],
      }]));

      const matches = findStubsReferencingNPC('npc_abc');
      expect(matches).toEqual([{
        sourceType: 'item',
        sourceId: 'Hearthstaff',
        sourceName: 'Hearthstaff',
        stubName: 'Yelena',
      }]);
    });
  });

  describe('resetStubsForDeletedNPC', () => {
    it('clears npc_id and removes npc_folder on every stub pointing at the npc', () => {
      localStorage.setItem('savedItems', JSON.stringify([{
        name: 'Hearthstaff',
        related_npcs: [
          { name: 'Yelena', npc_id: 'npc_abc', npc_folder: 'Heroes' },
        ],
      }]));

      const count = resetStubsForDeletedNPC('npc_abc');
      expect(count).toBe(1);

      const items = JSON.parse(localStorage.getItem('savedItems'));
      expect(items[0].related_npcs[0].npc_id).toBeNull();
      expect(items[0].related_npcs[0]).not.toHaveProperty('npc_folder');
    });
  });

  describe('renderSeededInputBlock', () => {
    it('returns empty string for null input', () => {
      expect(renderSeededInputBlock(null)).toBe('');
    });

    it('returns empty string when entities is empty', () => {
      expect(renderSeededInputBlock({ source: {}, entities: [] })).toBe('');
    });

    it('lists each entity by name and role', () => {
      const text = renderSeededInputBlock({
        source: { type: 'item', name: 'Lantern' },
        entities: [
          { type: 'npc', name: 'Aldric', role_or_description: 'guardian' },
          { type: 'npc', name: 'Mira', role_or_description: 'thief' },
        ],
      });
      expect(text).toContain('Aldric (npc) — guardian');
      expect(text).toContain('Mira (npc) — thief');
    });

    it('truncates source quotes longer than 800 chars', () => {
      const longQuote = 'a'.repeat(1000);
      const text = renderSeededInputBlock({
        source: { quote: longQuote },
        entities: [{ type: 'npc', name: 'X' }],
      });
      expect(text).toContain('…');
      expect(text).not.toContain('a'.repeat(900));
    });
  });

  describe('getToolForSourceType', () => {
    it('returns id+name for known source types', () => {
      expect(getToolForSourceType('item')).toEqual({ id: 'item-generator', name: 'Item Generator' });
      expect(getToolForSourceType('dungeon')).toEqual({ id: 'dungeon-generator', name: 'Dungeon Generator' });
      expect(getToolForSourceType('setting')).toEqual({ id: 'setting-generator', name: 'Setting Generator' });
    });

    it('returns null for unknown source types', () => {
      expect(getToolForSourceType('unknown')).toBeNull();
    });
  });

  describe('sourceExists', () => {
    it('returns false for missing args', () => {
      expect(sourceExists(null, 'x')).toBe(false);
      expect(sourceExists('item', null)).toBe(false);
      expect(sourceExists()).toBe(false);
    });

    it('detects items by name', () => {
      localStorage.setItem('savedItems', JSON.stringify([{ name: 'Hearthstaff' }]));
      expect(sourceExists('item', 'Hearthstaff')).toBe(true);
      expect(sourceExists('item', 'Missing')).toBe(false);
    });

    it('detects settings by id or by legacy place_name fallback', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_xyz', place_name: 'Eldergrove' },
      ]));
      expect(sourceExists('setting', 'set_xyz')).toBe(true);
      expect(sourceExists('setting', 'Eldergrove')).toBe(true);
      expect(sourceExists('setting', 'Missing')).toBe(false);
    });

    it('detects dungeons by id (string-coerces for legacy numeric ids)', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_xyz' },
        { id: 1710000000000 },
      ]));
      expect(sourceExists('dungeon', 'dng_xyz')).toBe(true);
      expect(sourceExists('dungeon', '1710000000000')).toBe(true);
      expect(sourceExists('dungeon', 'missing')).toBe(false);
    });

    it('detects statblocks by name__folder id form', () => {
      localStorage.setItem('monsters', JSON.stringify({
        'Custom Creatures': [{ name: 'Glimmering Golem' }],
      }));
      expect(sourceExists('statblock', 'Glimmering Golem__Custom Creatures')).toBe(true);
      expect(sourceExists('statblock', 'Missing__Custom Creatures')).toBe(false);
      expect(sourceExists('statblock', 'Glimmering Golem__Wrong Folder')).toBe(false);
      expect(sourceExists('statblock', 'no_separator_form')).toBe(false);
    });

    it('detects npcs by npc_id across all folders', () => {
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Uncategorized': [{ npc_id: 'npc_a' }],
        'Heroes': [{ npc_id: 'npc_b' }],
      }));
      expect(sourceExists('npc', 'npc_a')).toBe(true);
      expect(sourceExists('npc', 'npc_b')).toBe(true);
      expect(sourceExists('npc', 'npc_missing')).toBe(false);
    });

    it('detects encounters by folder__index id form', () => {
      localStorage.setItem('encounters', JSON.stringify({
        'Uncategorized': [{ name: 'A' }, { name: 'B' }],
      }));
      expect(sourceExists('encounter', 'Uncategorized__0')).toBe(true);
      expect(sourceExists('encounter', 'Uncategorized__1')).toBe(true);
      expect(sourceExists('encounter', 'Uncategorized__2')).toBe(false);
      expect(sourceExists('encounter', 'Missing__0')).toBe(false);
      expect(sourceExists('encounter', 'no_separator')).toBe(false);
    });

    it('returns false for unknown entity types', () => {
      expect(sourceExists('mystery', 'x')).toBe(false);
    });

    it('handles malformed localStorage gracefully', () => {
      localStorage.setItem('savedItems', 'not-json');
      expect(sourceExists('item', 'X')).toBe(false);
    });
  });
});
