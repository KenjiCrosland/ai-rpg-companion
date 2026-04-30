/**
 * @jest-environment jsdom
 */

import { migrateSourceTypeFromTypeOfPlace } from '../migrate-source-type-from-type-of-place.mjs';

describe('migrateSourceTypeFromTypeOfPlace', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('infers sourceType: dungeon from typeOfPlace matching a dungeon name', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      { id: 'dng_1', dungeonOverview: { name: 'The Cursed Tomb' } },
    ]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        { npc_id: 'npc_a', typeOfPlace: 'The Cursed Tomb' },
      ],
    }));

    const count = migrateSourceTypeFromTypeOfPlace();
    expect(count).toBe(1);

    const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(npcs.Uncategorized[0].sourceType).toBe('dungeon');
  });

  it('infers sourceType: setting from typeOfPlace matching a setting place_name', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_1', place_name: 'Eldergrove' },
    ]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        { npc_id: 'npc_a', typeOfPlace: 'Eldergrove' },
      ],
    }));

    const count = migrateSourceTypeFromTypeOfPlace();
    expect(count).toBe(1);

    const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(npcs.Uncategorized[0].sourceType).toBe('setting');
  });

  it('leaves item-sourced NPCs untouched even if typeOfPlace matches a dungeon name', () => {
    // The edge case the brief calls out: an item-sourced NPC's collapsed
    // typeOfPlace (e.g., a role_brief like "Creator of the Crypt of Ash")
    // happens to match the name of an unrelated dungeon. The migration
    // must NOT overwrite the existing sourceType: 'item' tag.
    localStorage.setItem('dungeons', JSON.stringify([
      { id: 'dng_1', dungeonOverview: { name: 'The Crypt of Ash' } },
    ]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        {
          npc_id: 'npc_item',
          sourceType: 'item',
          sourceId: 'Crypt of Ash Lantern',
          sourceName: 'Crypt of Ash Lantern',
          typeOfPlace: 'The Crypt of Ash',
        },
      ],
    }));

    const count = migrateSourceTypeFromTypeOfPlace();
    expect(count).toBe(0);

    const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(npcs.Uncategorized[0].sourceType).toBe('item');
    expect(npcs.Uncategorized[0].sourceId).toBe('Crypt of Ash Lantern');
  });

  it('leaves item-sourced NPCs untouched even if typeOfPlace matches a setting name', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_1', place_name: 'Eldergrove' },
    ]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        {
          npc_id: 'npc_item',
          sourceType: 'item',
          sourceId: 'Eldergrove Crown',
          sourceName: 'Eldergrove Crown',
          typeOfPlace: 'Eldergrove',
        },
      ],
    }));

    const count = migrateSourceTypeFromTypeOfPlace();
    expect(count).toBe(0);

    const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(npcs.Uncategorized[0].sourceType).toBe('item');
  });

  it('leaves NPCs with any pre-existing sourceType untouched', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      { id: 'dng_1', dungeonOverview: { name: 'Match' } },
    ]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        { npc_id: 'npc_a', sourceType: 'setting', typeOfPlace: 'Match' },
      ],
    }));

    const count = migrateSourceTypeFromTypeOfPlace();
    expect(count).toBe(0);

    const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(npcs.Uncategorized[0].sourceType).toBe('setting');
  });

  it('leaves NPCs whose typeOfPlace matches nothing untouched', () => {
    localStorage.setItem('dungeons', JSON.stringify([]));
    localStorage.setItem('gameSettings', JSON.stringify([]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        { npc_id: 'npc_a', typeOfPlace: 'a wandering tavern keeper' },
      ],
    }));

    const count = migrateSourceTypeFromTypeOfPlace();
    expect(count).toBe(0);

    const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(npcs.Uncategorized[0].sourceType).toBeUndefined();
  });

  it('handles empty stores gracefully', () => {
    expect(() => migrateSourceTypeFromTypeOfPlace()).not.toThrow();
  });
});
