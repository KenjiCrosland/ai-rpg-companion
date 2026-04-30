/**
 * @jest-environment jsdom
 */

import { renameNPCItemFields } from '../rename-npc-item-fields.mjs';

describe('rename-npc-item-fields', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('rewrites itemName to sourceId and sourceName for item-sourced NPCs', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        {
          npc_id: 'npc_abc',
          sourceType: 'item',
          itemName: "Krovnik's Hearthstaff",
          npcDescriptionPart1: { character_name: 'Yelena' },
        },
      ],
    }));

    renameNPCItemFields();

    const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    const npc = npcs.Uncategorized[0];
    expect(npc.sourceType).toBe('item');
    expect(npc.sourceId).toBe("Krovnik's Hearthstaff");
    expect(npc.sourceName).toBe("Krovnik's Hearthstaff");
    expect(npc.itemName).toBeUndefined();
  });

  it('leaves NPCs with sourceType !== "item" untouched', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Crypt': [
        {
          npc_id: 'npc_dungeon',
          sourceType: 'dungeon',
          npcDescriptionPart1: { character_name: 'Aldric' },
        },
      ],
      'Eldergrove': [
        {
          npc_id: 'npc_setting',
          sourceType: 'setting',
          npcDescriptionPart1: { character_name: 'Mira' },
        },
      ],
    }));

    renameNPCItemFields();

    const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(npcs.Crypt[0].sourceId).toBeUndefined();
    expect(npcs.Crypt[0].sourceName).toBeUndefined();
    expect(npcs.Eldergrove[0].sourceId).toBeUndefined();
    expect(npcs.Eldergrove[0].sourceName).toBeUndefined();
  });

  it('leaves NPCs without any sourceType untouched', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        {
          npc_id: 'npc_manual',
          // no sourceType
          npcDescriptionPart1: { character_name: 'Manual' },
        },
      ],
    }));

    renameNPCItemFields();

    const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(npcs.Uncategorized[0].sourceId).toBeUndefined();
    expect(npcs.Uncategorized[0].sourceName).toBeUndefined();
  });

  it('logs and skips item-sourced NPCs that have no itemName to migrate', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        {
          npc_id: 'npc_broken',
          sourceType: 'item',
          // no itemName
          npcDescriptionPart1: { character_name: 'Broken' },
        },
      ],
    }));

    renameNPCItemFields();

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('rename-npc-item-fields: skipping')
    );
    const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(npcs.Uncategorized[0].sourceId).toBeUndefined();
    expect(npcs.Uncategorized[0].sourceName).toBeUndefined();
  });

  it('is idempotent: running twice leaves already-migrated records alone', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        {
          npc_id: 'npc_abc',
          sourceType: 'item',
          itemName: 'Hearthstaff',
          npcDescriptionPart1: { character_name: 'Yelena' },
        },
      ],
    }));

    renameNPCItemFields();
    const afterFirst = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    renameNPCItemFields();
    const afterSecond = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));

    expect(afterFirst.Uncategorized[0]).toEqual(afterSecond.Uncategorized[0]);
    expect(afterSecond.Uncategorized[0].sourceId).toBe('Hearthstaff');
  });

  it('cleans up a stray itemName field on an already-migrated NPC', () => {
    // If both old and new fields somehow coexist (e.g., partial manual fixup),
    // the migration should drop itemName.
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        {
          npc_id: 'npc_abc',
          sourceType: 'item',
          itemName: 'Hearthstaff',
          sourceId: 'Hearthstaff',
          sourceName: 'Hearthstaff',
          npcDescriptionPart1: { character_name: 'Yelena' },
        },
      ],
    }));

    renameNPCItemFields();

    const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(npcs.Uncategorized[0].itemName).toBeUndefined();
    expect(npcs.Uncategorized[0].sourceId).toBe('Hearthstaff');
  });

  it('handles empty or missing storage gracefully', () => {
    expect(() => renameNPCItemFields()).not.toThrow();
    localStorage.setItem('npcGeneratorNPCs', '{}');
    expect(() => renameNPCItemFields()).not.toThrow();
  });
});
