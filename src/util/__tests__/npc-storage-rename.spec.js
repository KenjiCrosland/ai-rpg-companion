/**
 * @jest-environment jsdom
 *
 * Tests for renameNPCReferences. Symmetric to renameItemReferences's
 * propagation tests — when an NPC is renamed, every store that caches
 * the NPC's display name needs to follow.
 */

import { renameNPCReferences } from '../npc-storage.mjs';

describe('renameNPCReferences', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('updates source_name and target_name on tool-references where this NPC appears', () => {
    localStorage.setItem('tool-references', JSON.stringify({
      ref_a: {
        id: 'ref_a',
        source_type: 'npc',
        source_id: 'npc_yelena',
        source_name: 'Old Name',
        target_type: 'item',
        target_id: 'Hearthstaff',
        target_name: 'Hearthstaff',
        relationship: 'mentioned_in_item',
      },
      ref_b: {
        id: 'ref_b',
        source_type: 'statblock',
        source_id: 'Goblin__Custom',
        source_name: 'Goblin',
        target_type: 'npc',
        target_id: 'npc_yelena',
        target_name: 'Old Name',
        relationship: 'has_statblock',
      },
      ref_c: {
        id: 'ref_c',
        source_type: 'npc',
        source_id: 'npc_other',
        source_name: 'Untouched',
        target_type: 'item',
        target_id: 'Hearthstaff',
        target_name: 'Hearthstaff',
        relationship: 'mentioned_in_item',
      },
    }));

    const result = renameNPCReferences('npc_yelena', 'Yelena Wraithtouched');

    const refs = JSON.parse(localStorage.getItem('tool-references'));
    expect(refs.ref_a.source_name).toBe('Yelena Wraithtouched');
    expect(refs.ref_b.target_name).toBe('Yelena Wraithtouched');
    expect(refs.ref_c.source_name).toBe('Untouched');
    expect(result.totalUpdated).toBe(2);
  });

  it('updates item stub names matched by npc_id', () => {
    localStorage.setItem('savedItems', JSON.stringify([
      {
        name: 'Hearthstaff',
        related_npcs: [
          { name: 'Old Name', npc_id: 'npc_yelena', npc_folder: 'Uncategorized', role_brief: 'oracle' },
          { name: 'Untouched', npc_id: 'npc_other', npc_folder: 'Uncategorized' },
          { name: 'Stub Without Id', npc_id: null },
        ],
      },
    ]));

    renameNPCReferences('npc_yelena', 'Yelena Wraithtouched');

    const items = JSON.parse(localStorage.getItem('savedItems'));
    expect(items[0].related_npcs[0].name).toBe('Yelena Wraithtouched');
    expect(items[0].related_npcs[0].role_brief).toBe('oracle'); // role_brief untouched
    expect(items[0].related_npcs[1].name).toBe('Untouched');
    expect(items[0].related_npcs[2].name).toBe('Stub Without Id');
  });

  it('updates setting NPC stub names matched by npc_id', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      {
        id: 'set_x',
        place_name: 'Eldergrove',
        npcs: [
          { name: 'Old Name', npc_id: 'npc_yelena' },
          { name: 'Untouched', npc_id: 'npc_other' },
        ],
      },
    ]));

    renameNPCReferences('npc_yelena', 'Yelena Wraithtouched');

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[0].npcs[0].name).toBe('Yelena Wraithtouched');
    expect(settings[0].npcs[1].name).toBe('Untouched');
  });

  it('updates dungeon NPC stub names matched by npc_id', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      {
        id: 'dng_x',
        dungeonOverview: { name: 'Crypt' },
        npcs: [
          { name: 'Old Name', npc_id: 'npc_yelena' },
        ],
      },
    ]));

    renameNPCReferences('npc_yelena', 'Yelena Wraithtouched');

    const dungeons = JSON.parse(localStorage.getItem('dungeons'));
    expect(dungeons[0].npcs[0].name).toBe('Yelena Wraithtouched');
  });

  it('is idempotent — running with the same name twice produces no extra updates', () => {
    localStorage.setItem('savedItems', JSON.stringify([
      { name: 'Hearthstaff', related_npcs: [{ name: 'Old', npc_id: 'npc_a' }] },
    ]));

    const first = renameNPCReferences('npc_a', 'New');
    const second = renameNPCReferences('npc_a', 'New');

    expect(first.totalUpdated).toBe(1);
    expect(second.totalUpdated).toBe(0);
  });

  it('returns 0 when no stores contain the npc id', () => {
    localStorage.setItem('savedItems', JSON.stringify([
      { name: 'X', related_npcs: [{ name: 'A', npc_id: 'npc_other' }] },
    ]));

    const result = renameNPCReferences('npc_missing', 'Whatever');
    expect(result.totalUpdated).toBe(0);
  });

  it('returns 0 when args are missing', () => {
    expect(renameNPCReferences(null, 'X').totalUpdated).toBe(0);
    expect(renameNPCReferences('npc_a', null).totalUpdated).toBe(0);
    expect(renameNPCReferences('npc_a', '').totalUpdated).toBe(0);
  });

  it('handles malformed localStorage gracefully', () => {
    localStorage.setItem('savedItems', 'not-json');
    localStorage.setItem('tool-references', '{ partial');
    expect(() => renameNPCReferences('npc_a', 'New')).not.toThrow();
  });
});
