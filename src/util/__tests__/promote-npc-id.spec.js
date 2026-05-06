/**
 * @jest-environment jsdom
 */

import { promoteNPCIds } from '../promote-npc-id.mjs';

describe('promoteNPCIds migration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('promotes legacy id → npc_id on canonical NPC records', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        { id: 'npc_legacy_1', npcDescriptionPart1: { character_name: 'Yelena' } },
        { id: 'npc_legacy_2', npcDescriptionPart1: { character_name: 'Morghul' } },
      ],
    }));

    promoteNPCIds();

    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(stored.Uncategorized[0].npc_id).toBe('npc_legacy_1');
    expect(stored.Uncategorized[0]).not.toHaveProperty('id');
    expect(stored.Uncategorized[1].npc_id).toBe('npc_legacy_2');
    expect(stored.Uncategorized[1]).not.toHaveProperty('id');
  });

  it('preserves npc_id when both id and npc_id are set, and drops the legacy id', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        // npc_id already canonical; legacy id should just be dropped.
        { id: 'old_id', npc_id: 'npc_canonical', npcDescriptionPart1: { character_name: 'Yelena' } },
      ],
    }));

    promoteNPCIds();

    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(stored.Uncategorized[0].npc_id).toBe('npc_canonical');
    expect(stored.Uncategorized[0]).not.toHaveProperty('id');
  });

  it('leaves NPCs untouched when only npc_id is set', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        { npc_id: 'npc_clean', npcDescriptionPart1: { character_name: 'Yelena' } },
      ],
    }));

    const before = localStorage.getItem('npcGeneratorNPCs');
    promoteNPCIds();
    expect(localStorage.getItem('npcGeneratorNPCs')).toBe(before);
  });

  it('promotes id → npc_id on dungeon NPC entries', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      {
        id: 'dng_a',
        npcs: [
          { id: 'npc_dungeon_1', name: 'Skragbit' },
          { npc_id: 'npc_dungeon_2', name: 'Already Canonical' },
        ],
      },
    ]));

    promoteNPCIds();

    const dungeons = JSON.parse(localStorage.getItem('dungeons'));
    expect(dungeons[0].npcs[0].npc_id).toBe('npc_dungeon_1');
    expect(dungeons[0].npcs[0]).not.toHaveProperty('id');
    expect(dungeons[0].npcs[1].npc_id).toBe('npc_dungeon_2');
  });

  it('promotes id → npc_id on setting NPC entries', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      {
        id: 'set_a',
        npcs: [
          { id: 'npc_setting_1', name: 'Empress' },
        ],
      },
    ]));

    promoteNPCIds();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[0].npcs[0].npc_id).toBe('npc_setting_1');
    expect(settings[0].npcs[0]).not.toHaveProperty('id');
  });

  it('promotes id → npc_id on item-stub records (defensive sweep)', () => {
    localStorage.setItem('savedItems', JSON.stringify([
      {
        name: 'Whisper Crown',
        related_npcs: [
          { id: 'npc_stub_1', name: 'Yelena', role_brief: 'oracle' },
        ],
      },
    ]));

    promoteNPCIds();

    const items = JSON.parse(localStorage.getItem('savedItems'));
    expect(items[0].related_npcs[0].npc_id).toBe('npc_stub_1');
    expect(items[0].related_npcs[0]).not.toHaveProperty('id');
  });

  it('is idempotent — running twice yields the same result', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [{ id: 'npc_legacy', npcDescriptionPart1: {} }],
    }));

    promoteNPCIds();
    const after1 = localStorage.getItem('npcGeneratorNPCs');
    promoteNPCIds();
    const after2 = localStorage.getItem('npcGeneratorNPCs');

    expect(after2).toBe(after1);
  });

  it('handles missing stores and malformed data gracefully', () => {
    localStorage.setItem('gameSettings', 'not-json');
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [{ id: 'npc_a', npcDescriptionPart1: {} }],
    }));

    expect(() => promoteNPCIds()).not.toThrow();

    // Malformed store left untouched.
    expect(localStorage.getItem('gameSettings')).toBe('not-json');
    // Other store still migrates.
    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(stored.Uncategorized[0].npc_id).toBe('npc_a');
  });

  it('does not generate fresh ids for NPCs that have neither field — that is migrateNPCIds\'s job', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [{ name: 'No ID at all', npcDescriptionPart1: {} }],
    }));

    promoteNPCIds();

    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    // Still no npc_id; promote-npc-id only PROMOTES, doesn't generate.
    expect(stored.Uncategorized[0]).not.toHaveProperty('npc_id');
    expect(stored.Uncategorized[0]).not.toHaveProperty('id');
  });
});
