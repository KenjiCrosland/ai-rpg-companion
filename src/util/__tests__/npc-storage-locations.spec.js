/**
 * @jest-environment jsdom
 *
 * Coverage for `findNPCLocations` — the helper used by every "delete NPC"
 * confirmation dialog to summarize where an NPC exists. The function had
 * a long-standing hole: it walked `npcGeneratorNPCs` and `dungeons[*].npcs`
 * but silently ignored `gameSettings[*].npcs`. The three confirmation
 * dialogs (NPCGenerator, dungeon-tab, setting-tab) all under-reported
 * setting locations as a result.
 */

import { findNPCLocations } from '../npc-storage.mjs';

describe('findNPCLocations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty arrays when no NPC matches', () => {
    expect(findNPCLocations('npc_unknown')).toEqual({
      npcGenerator: [],
      dungeons: [],
      settings: [],
    });
  });

  it('returns empty arrays when npcId is falsy', () => {
    expect(findNPCLocations('')).toEqual({
      npcGenerator: [],
      dungeons: [],
      settings: [],
    });
    expect(findNPCLocations(null)).toEqual({
      npcGenerator: [],
      dungeons: [],
      settings: [],
    });
  });

  it('finds NPC across all three stores by npc_id', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Heroes': [{ npc_id: 'npc_yel', npcDescriptionPart1: { character_name: 'Yelena' } }],
    }));
    localStorage.setItem('dungeons', JSON.stringify([
      {
        id: 'dng_a',
        dungeonOverview: { name: 'Crypt of Ash' },
        npcs: [{ npc_id: 'npc_yel', name: 'Yelena' }],
      },
    ]));
    localStorage.setItem('gameSettings', JSON.stringify([
      {
        id: 'set_a',
        place_name: 'Imperial Core',
        npcs: [{ npc_id: 'npc_yel', name: 'Yelena' }],
      },
    ]));

    const locations = findNPCLocations('npc_yel');

    expect(locations.npcGenerator).toEqual(['Heroes']);
    expect(locations.dungeons).toEqual(['Crypt of Ash']);
    expect(locations.settings).toEqual(['Imperial Core']);
  });

  it('reports the same NPC in multiple settings', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_a', place_name: 'Northvale', npcs: [{ npc_id: 'npc_y', name: 'Yelena' }] },
      { id: 'set_b', place_name: 'Westmark', npcs: [{ npc_id: 'npc_y', name: 'Yelena' }] },
      { id: 'set_c', place_name: 'Sundercleft', npcs: [{ npc_id: 'npc_other', name: 'Other' }] },
    ]));

    const locations = findNPCLocations('npc_y');

    expect(locations.settings.sort()).toEqual(['Northvale', 'Westmark']);
  });

  it('prefers setting_overview.name over place_name when both are set', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      {
        id: 'set_a',
        place_name: 'Old Name',
        setting_overview: { name: 'Refined Name' },
        npcs: [{ npc_id: 'npc_y', name: 'Yelena' }],
      },
    ]));

    const locations = findNPCLocations('npc_y');
    expect(locations.settings).toEqual(['Refined Name']);
  });

  it('falls back to place_name when setting_overview is missing', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_a', place_name: 'Just Place Name', npcs: [{ npc_id: 'npc_y' }] },
    ]));

    const locations = findNPCLocations('npc_y');
    expect(locations.settings).toEqual(['Just Place Name']);
  });

  it('skips settings without a resolvable display name', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_a', npcs: [{ npc_id: 'npc_y' }] }, // no place_name, no setting_overview
    ]));

    const locations = findNPCLocations('npc_y');
    expect(locations.settings).toEqual([]);
  });

  it('handles malformed localStorage gracefully — returns partial results from stores that parsed', () => {
    // Stores are read sequentially inside one try/catch; the dungeons
    // read succeeds and populates locations.dungeons before the malformed
    // gameSettings read throws and the catch returns the partial object.
    localStorage.setItem('gameSettings', 'not-json');
    localStorage.setItem('dungeons', JSON.stringify([
      { id: 'dng_a', dungeonOverview: { name: 'A' }, npcs: [{ npc_id: 'npc_y' }] },
    ]));

    const locations = findNPCLocations('npc_y');
    expect(locations.dungeons).toEqual(['A']);
    expect(locations.settings).toEqual([]); // threw before populating
  });
});
