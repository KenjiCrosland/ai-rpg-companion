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
    it('updates the matching stub with npc_id', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_xyz', dungeonOverview: { name: 'X' }, npcs: [{ name: 'Aldric' }] },
      ]));

      const updated = linkNPCToDungeonStub('dng_xyz', 'Aldric', 'npc_abc');
      expect(updated).toBe(true);

      const dungeons = JSON.parse(localStorage.getItem('dungeons'));
      expect(dungeons[0].npcs[0].npc_id).toBe('npc_abc');
      expect(dungeons[0].npcs[0]).not.toHaveProperty('npc_folder');
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

      const count = linkNPCToDungeonStubsBySeed('item', 'Hearthstaff', 'Yelena', 'npc_abc');
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

      linkNPCToDungeonStubsBySeed('item', 'Hearthstaff', 'Yelena', 'npc_abc');
      const second = linkNPCToDungeonStubsBySeed('item', 'Hearthstaff', 'Yelena', 'npc_abc');
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
    it('clears npc_id and removes npc_folder on every matching stub', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        { id: 'dng_a', dungeonOverview: { name: 'A' }, npcs: [{ name: 'Yelena', npc_id: 'npc_abc', npc_folder: 'Heroes' }] },
      ]));

      const count = resetDungeonStubsForDeletedNPC('npc_abc');
      expect(count).toBe(1);

      const dungeons = JSON.parse(localStorage.getItem('dungeons'));
      expect(dungeons[0].npcs[0].npc_id).toBeNull();
      expect(dungeons[0].npcs[0]).not.toHaveProperty('npc_folder');
    });

    it('strips generated fields but preserves the pre-promotion stub shape', () => {
      // Mirrors resetSettingStubsForDeletedNPC: drop generated content
      // (read_aloud_description, npcDescriptionPart1, statblock pointers,
      // etc.) so the migration's content-presence check skips the entry.
      // Stub-shape fields (name, short_description, role_or_description,
      // seeded_from) survive — they describe what the entry was before
      // promotion to a full NPC.
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dng_a',
          dungeonOverview: { name: 'A' },
          npcs: [
            {
              name: 'Skragbit',
              short_description: 'goblin shaman with bone fetishes',
              role_or_description: 'shaman',
              npc_id: 'npc_abc',
              npc_folder: 'Heroes',
              seeded_from: { source_type: 'item', source_id: 'Bone Idol', source_name: 'Bone Idol', stub_name: 'Skragbit' },
              read_aloud_description: 'A wiry goblin with bone fetishes.',
              description_of_position: 'Tribal shaman of the Mukgash.',
              character_name: 'Skragbit',
              combined_details: 'Tribal shaman...',
              npcDescriptionPart1: { character_name: 'Skragbit' },
              statblock_name: 'Goblin Shaman',
              statblock_folder: 'NPCs',
            },
          ],
        },
      ]));

      resetDungeonStubsForDeletedNPC('npc_abc');

      const stub = JSON.parse(localStorage.getItem('dungeons'))[0].npcs[0];
      expect(stub.name).toBe('Skragbit');
      expect(stub.short_description).toBe('goblin shaman with bone fetishes');
      expect(stub.role_or_description).toBe('shaman');
      expect(stub.seeded_from).toBeDefined();
      expect(stub.npc_id).toBeNull();
      expect(stub).not.toHaveProperty('npc_folder');

      expect(stub.read_aloud_description).toBeUndefined();
      expect(stub.description_of_position).toBeUndefined();
      expect(stub.character_name).toBeUndefined();
      expect(stub.combined_details).toBeUndefined();
      expect(stub.npcDescriptionPart1).toBeUndefined();
      expect(stub.statblock_name).toBeUndefined();
      expect(stub.statblock_folder).toBeUndefined();
    });
  });
});
