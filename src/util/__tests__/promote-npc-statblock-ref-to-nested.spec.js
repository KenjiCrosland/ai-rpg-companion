/**
 * @jest-environment jsdom
 *
 * Coverage for the one-shot migration that consolidates canonical
 * NPC statblock references under npcDescriptionPart1 and removes the
 * legacy top-level copies. The migration enables `getNPCStatblockRef`
 * to drop its dual-read fallback for canonical NPCs.
 */

import { promoteNPCStatblockRefToNested } from '../promote-npc-statblock-ref-to-nested.mjs';

describe('promoteNPCStatblockRefToNested', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('promotes top-level statblock_name and folder into npcDescriptionPart1', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      Uncategorized: [
        {
          npc_id: 'npc_legacy',
          npcDescriptionPart1: { character_name: 'Legacy NPC' },
          statblock_name: 'Legacy-Statblock',
          statblock_folder: 'Old Folder',
        },
      ],
    }));

    promoteNPCStatblockRefToNested();

    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    const npc = stored.Uncategorized[0];
    expect(npc.npcDescriptionPart1.statblock_name).toBe('Legacy-Statblock');
    expect(npc.npcDescriptionPart1.statblock_folder).toBe('Old Folder');
    expect(npc).not.toHaveProperty('statblock_name');
    expect(npc).not.toHaveProperty('statblock_folder');
  });

  it('creates npcDescriptionPart1 if missing on a top-level-only NPC', () => {
    // Edge case: an old record with top-level statblock_name but no
    // npcDescriptionPart1 at all. Migration should create part1 to
    // hold the promoted fields.
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      Uncategorized: [
        {
          npc_id: 'npc_minimal',
          statblock_name: 'Solo-Statblock',
          statblock_folder: 'Some Folder',
        },
      ],
    }));

    promoteNPCStatblockRefToNested();

    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    const npc = stored.Uncategorized[0];
    expect(npc.npcDescriptionPart1).toEqual({
      statblock_name: 'Solo-Statblock',
      statblock_folder: 'Some Folder',
    });
    expect(npc).not.toHaveProperty('statblock_name');
    expect(npc).not.toHaveProperty('statblock_folder');
  });

  it('keeps the nested value and discards top-level when both present', () => {
    // Concurrent-write corner case: NPC has both. Nested wins; top-
    // level is deleted regardless.
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      Uncategorized: [
        {
          npc_id: 'npc_conflict',
          npcDescriptionPart1: {
            statblock_name: 'Newer-Nested',
            statblock_folder: 'Newer Folder',
          },
          statblock_name: 'Older-Top-Level',
          statblock_folder: 'Older Folder',
        },
      ],
    }));

    promoteNPCStatblockRefToNested();

    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    const npc = stored.Uncategorized[0];
    expect(npc.npcDescriptionPart1.statblock_name).toBe('Newer-Nested');
    expect(npc.npcDescriptionPart1.statblock_folder).toBe('Newer Folder');
    expect(npc).not.toHaveProperty('statblock_name');
    expect(npc).not.toHaveProperty('statblock_folder');
  });

  it('leaves NPCs with no statblock fields untouched', () => {
    const before = {
      Uncategorized: [
        {
          npc_id: 'npc_plain',
          npcDescriptionPart1: { character_name: 'Plain NPC' },
        },
      ],
    };
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify(before));

    promoteNPCStatblockRefToNested();

    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(stored).toEqual(before);
  });

  it('leaves nested-only NPCs untouched (already in target shape)', () => {
    const before = {
      Uncategorized: [
        {
          npc_id: 'npc_already_nested',
          npcDescriptionPart1: {
            character_name: 'Already Nested',
            statblock_name: 'Already-Nested-Statblock',
            statblock_folder: 'NPC Statblocks',
          },
        },
      ],
    };
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify(before));

    promoteNPCStatblockRefToNested();

    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(stored).toEqual(before);
  });

  it('handles partial top-level fields (name without folder, folder without name)', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      Uncategorized: [
        { npc_id: 'a', statblock_name: 'Only-Name' },
        { npc_id: 'b', statblock_folder: 'Only-Folder' },
      ],
    }));

    promoteNPCStatblockRefToNested();

    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(stored.Uncategorized[0].npcDescriptionPart1).toEqual({
      statblock_name: 'Only-Name',
    });
    expect(stored.Uncategorized[0]).not.toHaveProperty('statblock_name');
    expect(stored.Uncategorized[1].npcDescriptionPart1).toEqual({
      statblock_folder: 'Only-Folder',
    });
    expect(stored.Uncategorized[1]).not.toHaveProperty('statblock_folder');
  });

  it('walks every folder', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      Uncategorized: [
        { npc_id: 'a', statblock_name: 'A-Statblock' },
      ],
      'Custom Folder': [
        { npc_id: 'b', statblock_name: 'B-Statblock' },
        { npc_id: 'c', statblock_name: 'C-Statblock' },
      ],
      'Another Folder': [],
    }));

    promoteNPCStatblockRefToNested();

    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
    expect(stored.Uncategorized[0].npcDescriptionPart1.statblock_name).toBe('A-Statblock');
    expect(stored['Custom Folder'][0].npcDescriptionPart1.statblock_name).toBe('B-Statblock');
    expect(stored['Custom Folder'][1].npcDescriptionPart1.statblock_name).toBe('C-Statblock');
    expect(stored['Another Folder']).toEqual([]);
  });

  it('is idempotent (running twice = running once)', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      Uncategorized: [
        {
          npc_id: 'npc_legacy',
          npcDescriptionPart1: { character_name: 'Legacy NPC' },
          statblock_name: 'Legacy-Statblock',
          statblock_folder: 'Old Folder',
        },
      ],
    }));

    promoteNPCStatblockRefToNested();
    const afterFirst = localStorage.getItem('npcGeneratorNPCs');
    promoteNPCStatblockRefToNested();
    const afterSecond = localStorage.getItem('npcGeneratorNPCs');

    expect(afterSecond).toBe(afterFirst);
  });

  describe('defensive — bad input', () => {
    it('does nothing when localStorage is empty', () => {
      promoteNPCStatblockRefToNested();
      expect(localStorage.getItem('npcGeneratorNPCs')).toBe(null);
    });

    it('does nothing when stored value is not valid JSON', () => {
      localStorage.setItem('npcGeneratorNPCs', 'not json');
      promoteNPCStatblockRefToNested();
      expect(localStorage.getItem('npcGeneratorNPCs')).toBe('not json');
    });

    it('does nothing when stored value is not an object', () => {
      localStorage.setItem('npcGeneratorNPCs', '"a string"');
      promoteNPCStatblockRefToNested();
      // Migration leaves it untouched; helper functions consume it
      // gracefully.
      expect(localStorage.getItem('npcGeneratorNPCs')).toBe('"a string"');
    });

    it('skips non-array folder values', () => {
      // Defensive: if a folder slot is somehow not an array, skip it.
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        BogusFolder: 'not an array',
        Uncategorized: [
          { npc_id: 'a', statblock_name: 'A-Statblock' },
        ],
      }));

      expect(() => promoteNPCStatblockRefToNested()).not.toThrow();

      const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(stored.BogusFolder).toBe('not an array');
      expect(stored.Uncategorized[0].npcDescriptionPart1.statblock_name).toBe('A-Statblock');
    });

    it('skips non-object NPC entries', () => {
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        Uncategorized: [
          null,
          'a string',
          { npc_id: 'real', statblock_name: 'Real-Statblock' },
        ],
      }));

      expect(() => promoteNPCStatblockRefToNested()).not.toThrow();

      const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(stored.Uncategorized[0]).toBe(null);
      expect(stored.Uncategorized[1]).toBe('a string');
      expect(stored.Uncategorized[2].npcDescriptionPart1.statblock_name).toBe('Real-Statblock');
    });
  });
});
