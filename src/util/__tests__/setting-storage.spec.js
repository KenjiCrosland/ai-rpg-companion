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
  getChildSettings,
  getSiblingSettings,
  wouldCreateCycle,
  reparentSetting,
  mergeRelatedPlaces,
  filterRelatedPlacesByExistingNames,
  linkExistingSettingsByName,
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

  describe('getChildSettings', () => {
    it('returns all settings whose parentId matches the given id', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_kingdom', parentId: null },
        { id: 'set_city_a', parentId: 'set_kingdom' },
        { id: 'set_city_b', parentId: 'set_kingdom' },
        { id: 'set_district', parentId: 'set_city_a' },
      ]));

      const kids = getChildSettings('set_kingdom');
      expect(kids.map(s => s.id)).toEqual(['set_city_a', 'set_city_b']);
    });

    it('returns top-level settings when called with null', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: null },
        { id: 'set_b', parentId: 'set_a' },
        { id: 'set_c', parentId: null },
      ]));

      const tops = getChildSettings(null);
      expect(tops.map(s => s.id)).toEqual(['set_a', 'set_c']);
    });

    it('treats missing parentId field as null (legacy / fresh records)', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a' }, // no parentId field at all
        { id: 'set_b', parentId: null },
      ]));

      expect(getChildSettings(null).map(s => s.id)).toEqual(['set_a', 'set_b']);
    });

    it('returns empty array when nothing matches', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: null },
      ]));
      expect(getChildSettings('set_unknown')).toEqual([]);
    });
  });

  describe('getSiblingSettings', () => {
    it('returns same-parent settings excluding the requested one', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_kingdom', parentId: null },
        { id: 'set_city_a', parentId: 'set_kingdom' },
        { id: 'set_city_b', parentId: 'set_kingdom' },
        { id: 'set_city_c', parentId: 'set_kingdom' },
        { id: 'set_unrelated', parentId: 'set_other' },
      ]));

      const sibs = getSiblingSettings('set_city_a');
      expect(sibs.map(s => s.id)).toEqual(['set_city_b', 'set_city_c']);
    });

    it('returns top-level peers when the requested setting is top-level', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: null },
        { id: 'set_b', parentId: null },
        { id: 'set_c', parentId: 'set_a' },
      ]));

      const sibs = getSiblingSettings('set_a');
      expect(sibs.map(s => s.id)).toEqual(['set_b']);
    });

    it('returns empty array when the setting cannot be found', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: null },
      ]));
      expect(getSiblingSettings('set_does_not_exist')).toEqual([]);
    });

    it('returns empty array for null/empty id', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: null },
      ]));
      expect(getSiblingSettings(null)).toEqual([]);
      expect(getSiblingSettings('')).toEqual([]);
    });
  });

  describe('wouldCreateCycle', () => {
    it('returns true when reparenting under self', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: null },
      ]));
      expect(wouldCreateCycle('set_a', 'set_a')).toBe(true);
    });

    it('returns true when reparenting under a direct child', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_kingdom', parentId: null },
        { id: 'set_city', parentId: 'set_kingdom' },
      ]));
      // Moving the kingdom under one of its own cities = cycle.
      expect(wouldCreateCycle('set_kingdom', 'set_city')).toBe(true);
    });

    it('returns true when reparenting under a deep descendant', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_kingdom', parentId: null },
        { id: 'set_city', parentId: 'set_kingdom' },
        { id: 'set_district', parentId: 'set_city' },
        { id: 'set_building', parentId: 'set_district' },
      ]));
      expect(wouldCreateCycle('set_kingdom', 'set_building')).toBe(true);
      expect(wouldCreateCycle('set_city', 'set_building')).toBe(true);
    });

    it('returns false when reparenting under an unrelated setting', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: null },
        { id: 'set_b', parentId: null },
        { id: 'set_child_of_a', parentId: 'set_a' },
      ]));
      // set_child_of_a moving under set_b is fine — no cycle.
      expect(wouldCreateCycle('set_child_of_a', 'set_b')).toBe(false);
      // Two top-level settings becoming parent-child is fine.
      expect(wouldCreateCycle('set_a', 'set_b')).toBe(false);
    });

    it('returns false when proposed parent is null (top-level promotion)', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_kingdom', parentId: null },
        { id: 'set_city', parentId: 'set_kingdom' },
      ]));
      expect(wouldCreateCycle('set_city', null)).toBe(false);
    });

    it('returns false for empty / missing settingId', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: null },
      ]));
      expect(wouldCreateCycle(null, 'set_a')).toBe(false);
      expect(wouldCreateCycle('', 'set_a')).toBe(false);
    });

    it('does not spin when pre-existing data contains a cycle', () => {
      // Defensive: malformed pre-existing data where two settings
      // already point at each other. Walking the chain shouldn\'t
      // loop forever — the visited-set bails out and returns true
      // (any pre-existing cycle implies a reparent would touch it).
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: 'set_b' },
        { id: 'set_b', parentId: 'set_a' },
      ]));
      expect(() => wouldCreateCycle('set_c_new', 'set_a')).not.toThrow();
    });
  });

  describe('reparentSetting', () => {
    it('moves a top-level setting under a different parent', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_old_kingdom', parentId: null },
        { id: 'set_new_kingdom', parentId: null },
        { id: 'set_city', parentId: 'set_old_kingdom' },
      ]));

      const result = reparentSetting('set_city', 'set_new_kingdom');
      expect(result.ok).toBe(true);

      const after = JSON.parse(localStorage.getItem('gameSettings'));
      const city = after.find(s => s.id === 'set_city');
      expect(city.parentId).toBe('set_new_kingdom');
    });

    it('promotes a child to top-level when newParentId is null', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_kingdom', parentId: null },
        { id: 'set_city', parentId: 'set_kingdom' },
      ]));

      const result = reparentSetting('set_city', null);
      expect(result.ok).toBe(true);

      const after = JSON.parse(localStorage.getItem('gameSettings'));
      const city = after.find(s => s.id === 'set_city');
      expect(city.parentId).toBe(null);
    });

    it('treats undefined newParentId the same as null (top-level promotion)', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_kingdom', parentId: null },
        { id: 'set_city', parentId: 'set_kingdom' },
      ]));

      const result = reparentSetting('set_city', undefined);
      expect(result.ok).toBe(true);

      const after = JSON.parse(localStorage.getItem('gameSettings'));
      expect(after.find(s => s.id === 'set_city').parentId).toBe(null);
    });

    it('refuses self-reparent', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: null },
      ]));

      const result = reparentSetting('set_a', 'set_a');
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('self-parent');

      // No mutation persisted.
      expect(JSON.parse(localStorage.getItem('gameSettings'))[0].parentId).toBe(null);
    });

    it('refuses reparent under a descendant (would create cycle)', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_kingdom', parentId: null },
        { id: 'set_city', parentId: 'set_kingdom' },
        { id: 'set_district', parentId: 'set_city' },
      ]));

      const result = reparentSetting('set_kingdom', 'set_district');
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('would-create-cycle');

      // Original parentage preserved.
      const after = JSON.parse(localStorage.getItem('gameSettings'));
      expect(after.find(s => s.id === 'set_kingdom').parentId).toBe(null);
    });

    it('refuses when setting does not exist', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: null },
      ]));
      const result = reparentSetting('set_ghost', 'set_a');
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('setting-not-found');
    });

    it('refuses when proposed parent does not exist', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_a', parentId: null },
      ]));
      const result = reparentSetting('set_a', 'set_ghost_parent');
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('parent-not-found');
    });

    it('refuses when settingId is missing', () => {
      const result = reparentSetting(null, 'set_a');
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('missing-setting-id');
    });

    it('is idempotent — re-parenting under the current parent is a no-op success', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        { id: 'set_kingdom', parentId: null },
        { id: 'set_city', parentId: 'set_kingdom' },
      ]));
      const before = localStorage.getItem('gameSettings');

      const result = reparentSetting('set_city', 'set_kingdom');
      expect(result.ok).toBe(true);

      // No write happened (string-equal localStorage snapshot before/after).
      expect(localStorage.getItem('gameSettings')).toBe(before);
    });
  });

  describe('mergeRelatedPlaces', () => {
    it('preserves promoted entries verbatim across a rescan', () => {
      const existing = [
        {
          name: 'Krakova-Gora',
          kind: 'parent',
          promoted_setting_id: 'set_krakova',
          source_quote: 'crowns the slope of Krakova-Gora',
          role_brief: 'Dormant volcano',
          suggested_setting_type: 'wilderness',
        },
      ];
      // A rescan produces only siblings (LLM forgot Krakova this round).
      const fresh = [
        { name: 'Tverzh', kind: 'sibling', source_quote: 'to the southwest, Tverzh', role_brief: 'Trading city', suggested_setting_type: 'city' },
      ];
      const merged = mergeRelatedPlaces(existing, fresh);

      // Promoted entry survives.
      expect(merged.find(p => p.name === 'Krakova-Gora')).toBeTruthy();
      expect(merged.find(p => p.name === 'Krakova-Gora').promoted_setting_id).toBe('set_krakova');
      // Fresh entry appended.
      expect(merged.find(p => p.name === 'Tverzh')).toBeTruthy();
    });

    it('drops unpromoted entries when rescan does not surface them', () => {
      const existing = [
        { name: 'Tverzh', kind: 'sibling', promoted_setting_id: null },
        { name: 'Gray Ribs', kind: 'parent', promoted_setting_id: null },
      ];
      // Fresh extraction only finds Tverzh — Gray Ribs falls out.
      const fresh = [
        { name: 'Tverzh', kind: 'sibling' },
      ];
      const merged = mergeRelatedPlaces(existing, fresh);
      expect(merged.map(p => p.name)).toEqual(['Tverzh']);
    });

    it('case-insensitive dedup — fresh stub matching promoted name is dropped', () => {
      const existing = [
        { name: 'Krakova-Gora', kind: 'parent', promoted_setting_id: 'set_krakova' },
      ];
      const fresh = [
        // LLM emitted variant casing this round.
        { name: 'krakova-gora', kind: 'parent', source_quote: 'q' },
      ];
      const merged = mergeRelatedPlaces(existing, fresh);
      // Promoted version survives; the variant is dropped (not a duplicate).
      expect(merged).toHaveLength(1);
      expect(merged[0].name).toBe('Krakova-Gora');
      expect(merged[0].promoted_setting_id).toBe('set_krakova');
    });

    it('dedup within the fresh batch (defensive against LLM emitting duplicates)', () => {
      const fresh = [
        { name: 'Tverzh', kind: 'sibling', source_quote: 'first mention' },
        { name: 'tverzh', kind: 'sibling', source_quote: 'duplicate variant casing' },
      ];
      const merged = mergeRelatedPlaces([], fresh);
      expect(merged).toHaveLength(1);
      // First occurrence wins.
      expect(merged[0].name).toBe('Tverzh');
      expect(merged[0].source_quote).toBe('first mention');
    });

    it('initializes promoted_setting_id to null on fresh entries', () => {
      const merged = mergeRelatedPlaces([], [{ name: 'X', kind: 'feature' }]);
      expect(merged[0].promoted_setting_id).toBe(null);
    });

    it('preserves seeded_from on fresh entries when present', () => {
      // The extraction tags stubs with seeded_from when their name
      // matches a stub on the setting's source item; the merge must
      // carry this through so the promotion handler can fire the
      // secondary cross-tool writeback.
      const fresh = [
        {
          name: 'Stonemother',
          kind: 'parent',
          source_quote: '...',
          seeded_from: {
            source_type: 'item',
            source_id: 'Vardlokkur',
            source_name: 'Vardlokkur',
            stub_name: 'Stonemother',
          },
        },
      ];
      const merged = mergeRelatedPlaces([], fresh);
      expect(merged[0].seeded_from).toEqual({
        source_type: 'item',
        source_id: 'Vardlokkur',
        source_name: 'Vardlokkur',
        stub_name: 'Stonemother',
      });
    });

    it('does not add a seeded_from field when the fresh stub has none', () => {
      const merged = mergeRelatedPlaces([], [{ name: 'X', kind: 'feature' }]);
      expect('seeded_from' in merged[0]).toBe(false);
    });

    it('clones seeded_from so subsequent mutations do not bleed back', () => {
      const fresh = [{
        name: 'Stonemother',
        kind: 'parent',
        seeded_from: { source_type: 'item', source_id: 'Vardlokkur', stub_name: 'Stonemother' },
      }];
      const merged = mergeRelatedPlaces([], fresh);
      merged[0].seeded_from.source_id = 'Mutated';
      expect(fresh[0].seeded_from.source_id).toBe('Vardlokkur');
    });

    it('drops fresh entries with empty / missing name', () => {
      const merged = mergeRelatedPlaces([], [
        { name: '', kind: 'feature' },
        { kind: 'feature' },
        { name: '   ', kind: 'feature' },
        { name: 'Valid', kind: 'feature' },
      ]);
      expect(merged.map(p => p.name)).toEqual(['Valid']);
    });

    it('normalizes shape: trims and defaults kind to feature when missing', () => {
      const merged = mergeRelatedPlaces([], [
        { name: '  Trimmed  ', source_quote: '  q  ', role_brief: '  r  ' },
      ]);
      expect(merged[0]).toEqual({
        name: 'Trimmed',
        kind: 'feature',
        source_quote: 'q',
        role_brief: 'r',
        suggested_setting_type: '',
        promoted_setting_id: null,
      });
    });

    it('handles non-array inputs gracefully', () => {
      expect(mergeRelatedPlaces(null, null)).toEqual([]);
      expect(mergeRelatedPlaces(undefined, undefined)).toEqual([]);
      expect(mergeRelatedPlaces([], 'not-array')).toEqual([]);
    });

    it('does not mutate input arrays', () => {
      const existing = [
        { name: 'A', kind: 'parent', promoted_setting_id: 'set_a' },
      ];
      const fresh = [
        { name: 'B', kind: 'sibling' },
      ];
      const existingSnapshot = JSON.parse(JSON.stringify(existing));
      const freshSnapshot = JSON.parse(JSON.stringify(fresh));

      mergeRelatedPlaces(existing, fresh);

      expect(existing).toEqual(existingSnapshot);
      expect(fresh).toEqual(freshSnapshot);
    });
  });

  describe('filterRelatedPlacesByExistingNames', () => {
    const places = [
      { name: 'Tverzh', kind: 'sibling' },
      { name: 'Krakova-Gora', kind: 'parent' },
      { name: 'Gray Ribs', kind: 'parent' },
      { name: 'Yavich', kind: 'feature' },
    ];

    it('drops entries whose name matches one of the excluded names', () => {
      const out = filterRelatedPlacesByExistingNames(places, ['Tverzh', 'Yavich']);
      expect(out.map(p => p.name)).toEqual(['Krakova-Gora', 'Gray Ribs']);
    });

    it('match is case-insensitive', () => {
      const out = filterRelatedPlacesByExistingNames(places, ['tverzh', 'GRAY RIBS']);
      expect(out.map(p => p.name)).toEqual(['Krakova-Gora', 'Yavich']);
    });

    it('returns a copy unchanged when exclude list is empty', () => {
      const out = filterRelatedPlacesByExistingNames(places, []);
      expect(out).toEqual(places);
      expect(out).not.toBe(places);
    });

    it('handles non-array places input', () => {
      expect(filterRelatedPlacesByExistingNames(null, ['X'])).toEqual([]);
    });

    it('ignores null / empty / whitespace exclude names', () => {
      const out = filterRelatedPlacesByExistingNames(places, [null, '', '   ', 'Tverzh']);
      expect(out.map(p => p.name)).toEqual(['Krakova-Gora', 'Gray Ribs', 'Yavich']);
    });
  });

  describe('linkExistingSettingsByName', () => {
    const allSettings = [
      { id: 'set_aethelmar', place_name: 'Aethelmar' },
      { id: 'set_tverzh', place_name: 'Tverzh' },
      { id: 'set_no_name', place_name: '' },
    ];

    it('pre-fills promoted_setting_id when stub name matches an existing setting', () => {
      const places = [
        { name: 'Aethelmar', kind: 'sibling', promoted_setting_id: null },
        { name: 'New Place', kind: 'sibling', promoted_setting_id: null },
      ];
      const out = linkExistingSettingsByName(places, allSettings);
      expect(out[0].promoted_setting_id).toBe('set_aethelmar');
      expect(out[1].promoted_setting_id).toBe(null);
    });

    it('case-insensitive match', () => {
      const places = [
        { name: 'AETHELMAR', kind: 'sibling', promoted_setting_id: null },
        { name: 'tverzh', kind: 'sibling', promoted_setting_id: null },
      ];
      const out = linkExistingSettingsByName(places, allSettings);
      expect(out[0].promoted_setting_id).toBe('set_aethelmar');
      expect(out[1].promoted_setting_id).toBe('set_tverzh');
    });

    it('does not overwrite a promoted_setting_id that the caller already set', () => {
      const places = [
        { name: 'Aethelmar', kind: 'sibling', promoted_setting_id: 'set_explicit' },
      ];
      const out = linkExistingSettingsByName(places, allSettings);
      expect(out[0].promoted_setting_id).toBe('set_explicit');
    });

    it('skips library entries with no id or no place_name', () => {
      const places = [
        { name: 'Nameless', kind: 'sibling', promoted_setting_id: null },
      ];
      const out = linkExistingSettingsByName(places, allSettings);
      expect(out[0].promoted_setting_id).toBe(null);
    });

    it('first-match wins when the library has duplicate names (defensive)', () => {
      const dupSettings = [
        { id: 'set_first', place_name: 'Aethelmar' },
        { id: 'set_second', place_name: 'Aethelmar' },
      ];
      const places = [{ name: 'Aethelmar', kind: 'sibling', promoted_setting_id: null }];
      const out = linkExistingSettingsByName(places, dupSettings);
      expect(out[0].promoted_setting_id).toBe('set_first');
    });

    it('does not mutate input arrays', () => {
      const places = [{ name: 'Aethelmar', kind: 'sibling', promoted_setting_id: null }];
      const placesSnapshot = JSON.parse(JSON.stringify(places));
      linkExistingSettingsByName(places, allSettings);
      expect(places).toEqual(placesSnapshot);
    });

    it('handles non-array inputs gracefully', () => {
      expect(linkExistingSettingsByName(null, allSettings)).toEqual([]);
      expect(linkExistingSettingsByName([{ name: 'X' }], null)).toEqual([{ name: 'X' }]);
    });

    it('skips stubs with empty / whitespace name', () => {
      const places = [
        { name: '', promoted_setting_id: null },
        { name: '   ', promoted_setting_id: null },
      ];
      const out = linkExistingSettingsByName(places, allSettings);
      expect(out[0].promoted_setting_id).toBe(null);
      expect(out[1].promoted_setting_id).toBe(null);
    });
  });
});
