/**
 * @jest-environment jsdom
 */

import { dropNPCFolder } from '../drop-npc-folder.mjs';

describe('dropNPCFolder migration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('removes npc_folder from setting NPC stubs', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      {
        id: 'set_a',
        npcs: [
          { name: 'Yelena', npc_id: 'npc_y', npc_folder: 'Heroes' },
          { name: 'Veylin', npc_id: 'npc_v', npc_folder: 'Whitepeak' },
        ],
      },
    ]));

    dropNPCFolder();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[0].npcs[0]).not.toHaveProperty('npc_folder');
    expect(settings[0].npcs[1]).not.toHaveProperty('npc_folder');
    // Other fields preserved.
    expect(settings[0].npcs[0].npc_id).toBe('npc_y');
    expect(settings[0].npcs[0].name).toBe('Yelena');
  });

  it('removes npc_folder from dungeon NPC stubs', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      {
        id: 'dng_a',
        npcs: [
          { name: 'Skragbit', npc_id: 'npc_s', npc_folder: 'Old Folder' },
        ],
      },
    ]));

    dropNPCFolder();

    const dungeons = JSON.parse(localStorage.getItem('dungeons'));
    expect(dungeons[0].npcs[0]).not.toHaveProperty('npc_folder');
    expect(dungeons[0].npcs[0].npc_id).toBe('npc_s');
  });

  it('removes npc_folder from item related_npcs stubs', () => {
    localStorage.setItem('savedItems', JSON.stringify([
      {
        name: 'Whisper Crown',
        related_npcs: [
          { name: 'Yelena', role_brief: 'oracle', npc_id: 'npc_y', npc_folder: 'Heroes' },
          { name: 'Morghul', role_brief: 'watcher', npc_id: null, npc_folder: null },
        ],
      },
    ]));

    dropNPCFolder();

    const items = JSON.parse(localStorage.getItem('savedItems'));
    expect(items[0].related_npcs[0]).not.toHaveProperty('npc_folder');
    expect(items[0].related_npcs[1]).not.toHaveProperty('npc_folder');
    expect(items[0].related_npcs[0].npc_id).toBe('npc_y');
    expect(items[0].related_npcs[0].role_brief).toBe('oracle');
  });

  it('is idempotent — running twice yields the same result', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_a', npcs: [{ name: 'Y', npc_id: 'npc_y', npc_folder: 'Heroes' }] },
    ]));

    dropNPCFolder();
    const after1 = localStorage.getItem('gameSettings');
    dropNPCFolder();
    const after2 = localStorage.getItem('gameSettings');

    expect(after2).toBe(after1);
  });

  it('handles stores that are missing entirely', () => {
    // Only gameSettings present; dungeons and savedItems absent.
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_a', npcs: [{ name: 'Y', npc_id: 'npc_y', npc_folder: 'F' }] },
    ]));

    expect(() => dropNPCFolder()).not.toThrow();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[0].npcs[0]).not.toHaveProperty('npc_folder');
  });

  it('handles malformed JSON gracefully without throwing or clearing data', () => {
    localStorage.setItem('gameSettings', 'not-json');
    localStorage.setItem('dungeons', JSON.stringify([
      { id: 'dng_a', npcs: [{ npc_id: 'npc_s', npc_folder: 'X' }] },
    ]));

    expect(() => dropNPCFolder()).not.toThrow();

    // Malformed store left alone.
    expect(localStorage.getItem('gameSettings')).toBe('not-json');
    // Other store still gets migrated.
    const dungeons = JSON.parse(localStorage.getItem('dungeons'));
    expect(dungeons[0].npcs[0]).not.toHaveProperty('npc_folder');
  });

  it('does not modify entries that have no npc_folder property', () => {
    localStorage.setItem('savedItems', JSON.stringify([
      { name: 'X', related_npcs: [{ name: 'Y', role_brief: 'r', npc_id: null }] },
    ]));

    dropNPCFolder();

    const items = JSON.parse(localStorage.getItem('savedItems'));
    expect(items[0].related_npcs[0]).toEqual({ name: 'Y', role_brief: 'r', npc_id: null });
  });

  it('skips non-array values gracefully (e.g., a corrupted store)', () => {
    localStorage.setItem('gameSettings', JSON.stringify({ not: 'an array' }));

    expect(() => dropNPCFolder()).not.toThrow();
    // Original (non-array) state preserved — no migration applied.
    expect(JSON.parse(localStorage.getItem('gameSettings'))).toEqual({ not: 'an array' });
  });
});
