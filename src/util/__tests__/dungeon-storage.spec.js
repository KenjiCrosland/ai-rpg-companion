/**
 * @jest-environment jsdom
 */

import {
  buildSeededInputFromDungeon,
  linkNPCToDungeonStub,
  linkNPCToDungeonStubsBySeed,
  findDungeonStubsForNPC,
  resetDungeonStubsForDeletedNPC,
} from '../dungeon-storage.mjs';

describe('dungeon-storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('buildSeededInputFromDungeon', () => {
    it('returns a SeededInput for an existing dungeon + stub', () => {
      localStorage.setItem('dungeons', JSON.stringify([{
        id: 'dng_xyz',
        dungeonOverview: { name: 'The Cursed Tomb', overview: 'Undead-infested.' },
        npcs: [
          { npc_id: null, name: 'Brother Aldric', short_description: 'fallen priest' },
        ],
      }]));

      const seed = buildSeededInputFromDungeon({ fromId: 'dng_xyz', entityName: 'Brother Aldric' });

      expect(seed).toBeTruthy();
      expect(seed.source.type).toBe('dungeon');
      expect(seed.source.id).toBe('dng_xyz');
      expect(seed.source.name).toBe('The Cursed Tomb');
      expect(seed.entities[0].name).toBe('Brother Aldric');
      expect(seed.entities[0].role_or_description).toBe('fallen priest');
    });

    it('propagates seeded_from when the stub carries cross-container provenance', () => {
      localStorage.setItem('dungeons', JSON.stringify([{
        id: 'dng_xyz',
        dungeonOverview: { name: 'The Cursed Tomb' },
        npcs: [
          {
            npc_id: null,
            name: 'Yelena',
            short_description: 'oracle',
            seeded_from: {
              source_type: 'item',
              source_id: 'Hearthstaff',
              source_name: 'Hearthstaff',
              stub_name: 'Yelena',
            },
          },
        ],
      }]));

      const seed = buildSeededInputFromDungeon({ fromId: 'dng_xyz', entityName: 'Yelena' });

      expect(seed.entities[0].seeded_from).toEqual({
        source_type: 'item',
        source_id: 'Hearthstaff',
        source_name: 'Hearthstaff',
        stub_name: 'Yelena',
      });
    });

    it('returns null when the dungeon does not exist', () => {
      expect(buildSeededInputFromDungeon({ fromId: 'nope', entityName: 'X' })).toBeNull();
    });

    it('returns null when the stub does not exist', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_xyz', dungeonOverview: { name: 'X' }, npcs: [{ name: 'Other' }] },
      ]));
      expect(buildSeededInputFromDungeon({ fromId: 'dng_xyz', entityName: 'NotPresent' })).toBeNull();
    });

    it('matches by stringified dungeon id (handles legacy numeric ids)', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_123', dungeonOverview: { name: 'X' }, npcs: [{ name: 'Y' }] },
      ]));
      // Pass numeric-looking string — should still match
      expect(buildSeededInputFromDungeon({ fromId: 'dng_123', entityName: 'Y' })).toBeTruthy();
    });
  });

  describe('linkNPCToDungeonStub', () => {
    it('updates the matching stub with npc_id and folder', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_xyz', dungeonOverview: { name: 'X' }, npcs: [{ name: 'Aldric' }] },
      ]));

      const updated = linkNPCToDungeonStub('dng_xyz', 'Aldric', 'npc_abc', 'Heroes');
      expect(updated).toBe(true);

      const dungeons = JSON.parse(localStorage.getItem('dungeons'));
      expect(dungeons[0].npcs[0].npc_id).toBe('npc_abc');
      expect(dungeons[0].npcs[0].npc_folder).toBe('Heroes');
    });
  });

  describe('linkNPCToDungeonStubsBySeed', () => {
    it('updates dungeons whose stubs have matching seeded_from provenance', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dng_a',
          dungeonOverview: { name: 'A' },
          npcs: [{
            name: 'Yelena',
            seeded_from: { source_type: 'item', source_id: 'Hearthstaff', stub_name: 'Yelena' },
          }],
        },
      ]));

      const count = linkNPCToDungeonStubsBySeed('item', 'Hearthstaff', 'Yelena', 'npc_abc', 'Heroes');
      expect(count).toBe(1);

      const dungeons = JSON.parse(localStorage.getItem('dungeons'));
      expect(dungeons[0].npcs[0].npc_id).toBe('npc_abc');
    });

    it('is idempotent', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dng_a',
          dungeonOverview: { name: 'A' },
          npcs: [{
            name: 'Yelena',
            seeded_from: { source_type: 'item', source_id: 'Hearthstaff', stub_name: 'Yelena' },
          }],
        },
      ]));

      linkNPCToDungeonStubsBySeed('item', 'Hearthstaff', 'Yelena', 'npc_abc', 'Heroes');
      const second = linkNPCToDungeonStubsBySeed('item', 'Hearthstaff', 'Yelena', 'npc_abc', 'Heroes');
      expect(second).toBe(0);
    });
  });

  describe('findDungeonStubsForNPC', () => {
    it('returns matches across all dungeons', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_a', dungeonOverview: { name: 'A' }, npcs: [{ name: 'Yelena', npc_id: 'npc_abc' }] },
        { id: 'dng_b', dungeonOverview: { name: 'B' }, npcs: [{ name: 'Other', npc_id: 'npc_xyz' }] },
      ]));

      const matches = findDungeonStubsForNPC('npc_abc');
      expect(matches.length).toBe(1);
      expect(matches[0].dungeonId).toBe('dng_a');
      expect(matches[0].dungeonName).toBe('A');
      expect(matches[0].stubName).toBe('Yelena');
    });
  });

  describe('resetDungeonStubsForDeletedNPC', () => {
    it('clears npc_id and npc_folder on every matching stub', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_a', dungeonOverview: { name: 'A' }, npcs: [{ name: 'Yelena', npc_id: 'npc_abc', npc_folder: 'Heroes' }] },
      ]));

      const count = resetDungeonStubsForDeletedNPC('npc_abc');
      expect(count).toBe(1);

      const dungeons = JSON.parse(localStorage.getItem('dungeons'));
      expect(dungeons[0].npcs[0].npc_id).toBeNull();
      expect(dungeons[0].npcs[0].npc_folder).toBeNull();
    });
  });
});
