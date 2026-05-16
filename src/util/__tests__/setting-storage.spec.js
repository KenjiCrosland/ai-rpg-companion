/**
 * @jest-environment jsdom
 */

import {
  buildSeededInputFromSetting,
  linkNPCToSettingStub,
  linkNPCToSettingStubsBySeed,
  findSettingStubsForNPC,
  resetSettingStubsForDeletedNPC,
  resetSettingSourceForDeletedEntity,
  getSettingById,
  getSettingBrief,
} from '../setting-storage.mjs';

describe('setting-storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('buildSeededInputFromSetting', () => {
    it('returns a SeededInput for an existing setting + stub', () => {
      localStorage.setItem('gameSettings', JSON.stringify([{
        id: 'set_xyz',
        place_name: 'Eldergrove',
        setting_overview: { overview: 'A misty forest realm.' },
        npcs: [
          { npc_id: null, name: 'Aldric', short_description: 'old ranger' },
        ],
      }]));

      const seed = buildSeededInputFromSetting({ fromId: 'set_xyz', entityName: 'Aldric' });

      expect(seed).toBeTruthy();
      expect(seed.source.type).toBe('setting');
      expect(seed.source.id).toBe('set_xyz');
      expect(seed.source.name).toBe('Eldergrove');
      expect(seed.source.description).toBe('A misty forest realm.');
      expect(seed.entities[0].name).toBe('Aldric');
      expect(seed.entities[0].role_or_description).toBe('old ranger');
    });

    it('propagates seeded_from when the stub carries cross-container provenance', () => {
      localStorage.setItem('gameSettings', JSON.stringify([{
        id: 'set_xyz',
        place_name: 'Eldergrove',
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

      const seed = buildSeededInputFromSetting({ fromId: 'set_xyz', entityName: 'Yelena' });

      expect(seed.entities[0].seeded_from).toEqual({
        source_type: 'item',
        source_id: 'Hearthstaff',
        source_name: 'Hearthstaff',
        stub_name: 'Yelena',
      });
    });

    it('returns null when the setting does not exist', () => {
      expect(buildSeededInputFromSetting({ fromId: 'nope', entityName: 'X' })).toBeNull();
    });

    it('returns null when the stub does not exist in the setting', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_xyz', place_name: 'Eldergrove', npcs: [{ name: 'Aldric' }] },
      ]));
      expect(buildSeededInputFromSetting({ fromId: 'set_xyz', entityName: 'NotPresent' })).toBeNull();
    });

    it('matches stub names case-insensitively', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_xyz', place_name: 'X', npcs: [{ name: 'Yelena' }] },
      ]));
      expect(buildSeededInputFromSetting({ fromId: 'set_xyz', entityName: '  yelena  ' })).toBeTruthy();
    });
  });

  describe('linkNPCToSettingStub', () => {
    it('updates the matching stub with npc_id', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_xyz', place_name: 'X', npcs: [{ name: 'Yelena' }] },
      ]));

      const updated = linkNPCToSettingStub('set_xyz', 'Yelena', 'npc_abc');
      expect(updated).toBe(true);

      const settings = JSON.parse(localStorage.getItem('gameSettings'));
      expect(settings[0].npcs[0].npc_id).toBe('npc_abc');
      expect(settings[0].npcs[0]).not.toHaveProperty('npc_folder');
    });

    it('returns false when the setting is not found', () => {
      expect(linkNPCToSettingStub('nope', 'Y', 'npc_x')).toBe(false);
    });

    it('returns false when the stub is not found', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_xyz', place_name: 'X', npcs: [{ name: 'Other' }] },
      ]));
      expect(linkNPCToSettingStub('set_xyz', 'NotPresent', 'npc_x')).toBe(false);
    });
  });

  describe('linkNPCToSettingStubsBySeed', () => {
    it('updates settings whose stubs have matching seeded_from provenance', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        {
          id: 'set_a',
          place_name: 'A',
          npcs: [{
            name: 'Yelena',
            seeded_from: { source_type: 'item', source_id: 'Hearthstaff', stub_name: 'Yelena' },
          }],
        },
        {
          id: 'set_b',
          place_name: 'B',
          npcs: [{
            name: 'Yelena',
            seeded_from: { source_type: 'item', source_id: 'Hearthstaff', stub_name: 'Yelena' },
          }],
        },
      ]));

      const count = linkNPCToSettingStubsBySeed('item', 'Hearthstaff', 'Yelena', 'npc_abc');

      expect(count).toBe(2);
      const settings = JSON.parse(localStorage.getItem('gameSettings'));
      expect(settings[0].npcs[0].npc_id).toBe('npc_abc');
      expect(settings[1].npcs[0].npc_id).toBe('npc_abc');
    });

    it('skips stubs whose seeded_from points elsewhere', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        {
          id: 'set_a',
          place_name: 'A',
          npcs: [{
            name: 'Yelena',
            seeded_from: { source_type: 'item', source_id: 'OtherItem', stub_name: 'Yelena' },
          }],
        },
      ]));

      const count = linkNPCToSettingStubsBySeed('item', 'Hearthstaff', 'Yelena', 'npc_abc');
      expect(count).toBe(0);

      const settings = JSON.parse(localStorage.getItem('gameSettings'));
      expect(settings[0].npcs[0].npc_id).toBeUndefined();
    });

    it('is idempotent: running twice produces no additional updates', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        {
          id: 'set_a',
          place_name: 'A',
          npcs: [{
            name: 'Yelena',
            seeded_from: { source_type: 'item', source_id: 'Hearthstaff', stub_name: 'Yelena' },
          }],
        },
      ]));

      const first = linkNPCToSettingStubsBySeed('item', 'Hearthstaff', 'Yelena', 'npc_abc');
      const second = linkNPCToSettingStubsBySeed('item', 'Hearthstaff', 'Yelena', 'npc_abc');

      expect(first).toBe(1);
      expect(second).toBe(0);
    });
  });

  describe('findSettingStubsForNPC', () => {
    it('returns matches across all settings', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', place_name: 'A', npcs: [{ name: 'Yelena', npc_id: 'npc_abc' }] },
        { id: 'set_b', place_name: 'B', npcs: [{ name: 'Yelena', npc_id: 'npc_abc' }] },
        { id: 'set_c', place_name: 'C', npcs: [{ name: 'Other', npc_id: 'npc_xyz' }] },
      ]));

      const matches = findSettingStubsForNPC('npc_abc');
      expect(matches.length).toBe(2);
      expect(matches.map(m => m.settingId).sort()).toEqual(['set_a', 'set_b']);
    });

    it('returns empty array when nothing matches', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', place_name: 'A', npcs: [{ name: 'X', npc_id: 'npc_other' }] },
      ]));
      expect(findSettingStubsForNPC('npc_abc')).toEqual([]);
    });
  });

  describe('resetSettingStubsForDeletedNPC', () => {
    it('clears npc_id and removes npc_folder on every matching stub', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', place_name: 'A', npcs: [{ name: 'Yelena', npc_id: 'npc_abc', npc_folder: 'Heroes' }] },
        { id: 'set_b', place_name: 'B', npcs: [{ name: 'Yelena', npc_id: 'npc_abc', npc_folder: 'Heroes' }] },
      ]));

      const count = resetSettingStubsForDeletedNPC('npc_abc');
      expect(count).toBe(2);

      const settings = JSON.parse(localStorage.getItem('gameSettings'));
      expect(settings[0].npcs[0].npc_id).toBeNull();
      expect(settings[0].npcs[0]).not.toHaveProperty('npc_folder');
      expect(settings[1].npcs[0].npc_id).toBeNull();
    });

    it('returns 0 when no matching stubs exist', () => {
      localStorage.setItem('gameSettings', JSON.stringify([]));
      expect(resetSettingStubsForDeletedNPC('npc_abc')).toBe(0);
    });

    it('strips generated fields so the migration does not re-sync the deleted NPC', () => {
      // Setting NPC entries can carry full generated content
      // (read_aloud_description, description_of_position, etc.) when the
      // NPC was generated from the setting tab. After canonical deletion,
      // leaving that content causes migrateSettingNPCsToSharedStorage to
      // recreate the canonical on the next NPCGenerator load. Strip
      // generated fields so the migration's content-presence check skips
      // the entry. Stub-shape fields (name, description, role_or_description,
      // faction, seeded_from) survive — they describe the pre-promotion
      // stub the user can re-promote later.
      localStorage.setItem('gameSettings', JSON.stringify([
        {
          id: 'set_a',
          place_name: 'A',
          npcs: [
            {
              name: 'Yelena',
              description: 'A reclusive oracle who reads the salt-runes.', // pre-promotion short description
              role_or_description: 'oracle',
              faction: 'The Salt Cult',
              npc_id: 'npc_abc',
              npc_folder: 'Heroes',
              seeded_from: { source_type: 'item', source_id: 'Whisper Crown', source_name: 'Whisper Crown', stub_name: 'Yelena' },
              // Generated content from a prior promotion:
              read_aloud_description: 'A tall woman with piercing eyes.',
              description_of_position: 'Town oracle who reads the salt-runes.',
              character_name: 'Yelena',
              roleplaying_tips: 'Speak slowly, in riddles.',
              combined_details: 'Town oracle...',
              npcDescriptionPart1: { character_name: 'Yelena' },
              npcDescriptionPart2: { relationships: { 'Old Greta': 'rival' } },
              statblock_name: 'Oracle',
              statblock_folder: 'NPCs',
            },
          ],
        },
      ]));

      resetSettingStubsForDeletedNPC('npc_abc');

      const stub = JSON.parse(localStorage.getItem('gameSettings'))[0].npcs[0];

      // Pre-promotion stub identity preserved (including the short description).
      expect(stub.name).toBe('Yelena');
      expect(stub.description).toBe('A reclusive oracle who reads the salt-runes.');
      expect(stub.role_or_description).toBe('oracle');
      expect(stub.faction).toBe('The Salt Cult');
      expect(stub.seeded_from).toEqual({
        source_type: 'item',
        source_id: 'Whisper Crown',
        source_name: 'Whisper Crown',
        stub_name: 'Yelena',
      });
      expect(stub.npc_id).toBeNull();
      expect(stub).not.toHaveProperty('npc_folder');

      // Generated content stripped — migration's skip-rule will catch this.
      expect(stub.read_aloud_description).toBeUndefined();
      expect(stub.description_of_position).toBeUndefined();
      expect(stub.character_name).toBeUndefined();
      expect(stub.roleplaying_tips).toBeUndefined();
      expect(stub.combined_details).toBeUndefined();
      expect(stub.npcDescriptionPart1).toBeUndefined();
      expect(stub.npcDescriptionPart2).toBeUndefined();
      expect(stub.statblock_name).toBeUndefined();
      expect(stub.statblock_folder).toBeUndefined();
    });

    it('preserves a setting-native stub with just name + description after reset', () => {
      // Setting tab creates new NPCs with `{ npc_id, name, description }`.
      // After full generation + reset, we should be back to that shape.
      localStorage.setItem('gameSettings', JSON.stringify([
        {
          id: 'set_a',
          place_name: 'A',
          npcs: [
            {
              npc_id: 'npc_v',
              npc_folder: 'F',
              name: 'Veylin',
              description: 'gruff harbor master',
              read_aloud_description: 'generated',
              description_of_position: 'generated',
            },
          ],
        },
      ]));

      resetSettingStubsForDeletedNPC('npc_v');

      const stub = JSON.parse(localStorage.getItem('gameSettings'))[0].npcs[0];
      expect(stub.name).toBe('Veylin');
      expect(stub.description).toBe('gruff harbor master');
      expect(stub.npc_id).toBeNull();
      expect(stub.read_aloud_description).toBeUndefined();
      expect(stub.description_of_position).toBeUndefined();
    });
  });

  describe('resetSettingSourceForDeletedEntity', () => {
    it('clears sourceType/sourceId/sourceName on every matching setting', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', place_name: 'A', sourceType: 'item', sourceId: 'Whispering Crown', sourceName: 'Whispering Crown' },
        { id: 'set_b', place_name: 'B', sourceType: 'item', sourceId: 'OtherItem', sourceName: 'OtherItem' },
        { id: 'set_c', place_name: 'C', sourceType: 'item', sourceId: 'Whispering Crown', sourceName: 'Whispering Crown' },
      ]));

      const count = resetSettingSourceForDeletedEntity('item', 'Whispering Crown');
      expect(count).toBe(2);

      const after = JSON.parse(localStorage.getItem('gameSettings'));
      expect(after[0].sourceType).toBeUndefined();
      expect(after[0].sourceId).toBeUndefined();
      expect(after[0].sourceName).toBeUndefined();
      // Untouched setting keeps its source fields intact.
      expect(after[1].sourceType).toBe('item');
      expect(after[1].sourceId).toBe('OtherItem');
      expect(after[2].sourceType).toBeUndefined();
    });

    it('does not touch settings whose sourceType differs from the deleted entity type', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', place_name: 'A', sourceType: 'dungeon', sourceId: 'Whispering Crown', sourceName: 'Whispering Crown' },
      ]));

      const count = resetSettingSourceForDeletedEntity('item', 'Whispering Crown');
      expect(count).toBe(0);

      const after = JSON.parse(localStorage.getItem('gameSettings'))[0];
      expect(after.sourceType).toBe('dungeon');
      expect(after.sourceId).toBe('Whispering Crown');
    });

    it('returns 0 with no match and does not persist a no-op write', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', place_name: 'A' },
      ]));
      const before = localStorage.getItem('gameSettings');

      const count = resetSettingSourceForDeletedEntity('item', 'Anything');
      expect(count).toBe(0);
      // Same string back means no write happened.
      expect(localStorage.getItem('gameSettings')).toBe(before);
    });

    it('returns 0 with missing args', () => {
      expect(resetSettingSourceForDeletedEntity(null, 'x')).toBe(0);
      expect(resetSettingSourceForDeletedEntity('item', null)).toBe(0);
      expect(resetSettingSourceForDeletedEntity(null, null)).toBe(0);
    });
  });

  describe('getSettingById', () => {
    it('returns the setting whose id matches', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', place_name: 'A' },
        { id: 'set_b', place_name: 'B' },
      ]));
      expect(getSettingById('set_b')?.place_name).toBe('B');
    });

    it('returns null when no match', () => {
      localStorage.setItem('gameSettings', JSON.stringify([{ id: 'set_a' }]));
      expect(getSettingById('set_missing')).toBeNull();
      expect(getSettingById(null)).toBeNull();
    });
  });

  describe('getSettingBrief', () => {
    it('composes name + title + region + leadership from structured fields', () => {
      const setting = {
        place_name: 'Tockwrought Vault',
        setting_overview: {
          title: 'Mound of the Latched Promise',
          relation_to_larger_setting: 'The Vault lies within the territory of the Mwythig.',
          current_ruler_sentence: 'Llew ap Madog, the Gear-Keeper, holds nominal authority.',
        },
      };
      const brief = getSettingBrief(setting);
      expect(brief).toContain('Tockwrought Vault (Mound of the Latched Promise)');
      expect(brief).toContain('Region: The Vault lies within the territory of the Mwythig.');
      expect(brief).toContain('Leadership: Llew ap Madog, the Gear-Keeper, holds nominal authority.');
    });

    it('falls back to setting_overview.name when place_name is missing', () => {
      const setting = {
        setting_overview: { name: 'Fallback Name', relation_to_larger_setting: 'somewhere' },
      };
      expect(getSettingBrief(setting)).toContain('Fallback Name');
    });

    it('omits sections whose fields are blank', () => {
      const setting = {
        place_name: 'Bare',
        setting_overview: { relation_to_larger_setting: '', current_ruler_sentence: '' },
      };
      const brief = getSettingBrief(setting);
      expect(brief).toBe('Bare');
      expect(brief).not.toContain('Region:');
      expect(brief).not.toContain('Leadership:');
    });

    it('returns empty string for null / shapeless input', () => {
      expect(getSettingBrief(null)).toBe('');
      expect(getSettingBrief(undefined)).toBe('');
      expect(getSettingBrief({})).toBe('');
      expect(getSettingBrief({ setting_overview: {} })).toBe('');
    });
  });
});
