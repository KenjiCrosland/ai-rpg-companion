/**
 * @jest-environment jsdom
 */

import { assignSettingIds } from '../assign-setting-ids.mjs';

describe('assign-setting-ids', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('assigns set_-prefixed ids to settings lacking one', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { place_name: 'Eldergrove' },
      { place_name: 'Sunfell Pass' },
    ]));

    assignSettingIds();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[0].id).toMatch(/^set_\d+_[a-z0-9]+$/);
    expect(settings[1].id).toMatch(/^set_\d+_[a-z0-9]+$/);
    expect(settings[0].id).not.toBe(settings[1].id);
  });

  it('leaves existing ids alone (idempotent)', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_existing_abc', place_name: 'Eldergrove' },
    ]));

    assignSettingIds();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[0].id).toBe('set_existing_abc');
  });

  it('rewrites legacy refs whose target_id was a place_name', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { place_name: 'Eldergrove' },
    ]));
    localStorage.setItem('tool-references', JSON.stringify({
      'ref_1': {
        id: 'ref_1',
        source_type: 'npc',
        source_id: 'npc_abc',
        source_name: 'Aldric',
        target_type: 'setting',
        target_id: 'Eldergrove', // legacy: keyed by place_name
        target_name: 'Eldergrove',
        relationship: 'appears_in_setting',
        context: '',
      },
    }));

    assignSettingIds();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    const newId = settings[0].id;
    const refs = JSON.parse(localStorage.getItem('tool-references'));
    expect(refs.ref_1.target_id).toBe(newId);
  });

  it('backfills missing appears_in_setting refs for setting-sourced NPCs', () => {
    // The original extract-existing-references migration silently skipped
    // settings without an id, so a user with a setting-sourced NPC and no
    // setting id would have ZERO appears_in_setting refs in their store.
    // After this migration, the missing ref should exist.
    localStorage.setItem('gameSettings', JSON.stringify([
      { place_name: 'Eldergrove' },
    ]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Eldergrove': [
        {
          npc_id: 'npc_abc',
          sourceType: 'setting',
          npcDescriptionPart1: { character_name: 'Aldric' },
        },
      ],
    }));
    localStorage.setItem('tool-references', JSON.stringify({}));

    assignSettingIds();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    const newId = settings[0].id;
    const refs = Object.values(JSON.parse(localStorage.getItem('tool-references')));
    const created = refs.find(r =>
      r.source_id === 'npc_abc'
      && r.target_type === 'setting'
      && r.target_id === newId
      && r.relationship === 'appears_in_setting'
    );
    expect(created).toBeTruthy();
    expect(created.source_name).toBe('Aldric');
  });

  it('does not create duplicate refs when one already exists', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_existing', place_name: 'Eldergrove' },
    ]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Eldergrove': [
        {
          npc_id: 'npc_abc',
          sourceType: 'setting',
          npcDescriptionPart1: { character_name: 'Aldric' },
        },
      ],
    }));
    localStorage.setItem('tool-references', JSON.stringify({
      'ref_existing': {
        id: 'ref_existing',
        source_type: 'npc',
        source_id: 'npc_abc',
        source_name: 'Aldric',
        target_type: 'setting',
        target_id: 'set_existing',
        target_name: 'Eldergrove',
        relationship: 'appears_in_setting',
        context: '',
      },
    }));

    assignSettingIds();

    const refs = Object.values(JSON.parse(localStorage.getItem('tool-references')));
    const matching = refs.filter(r =>
      r.source_id === 'npc_abc'
      && r.target_id === 'set_existing'
      && r.relationship === 'appears_in_setting'
    );
    expect(matching.length).toBe(1);
  });

  it('skips NPCs in folders that do not match any setting place_name', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { place_name: 'Eldergrove' },
    ]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Some Random Folder': [
        {
          npc_id: 'npc_xyz',
          sourceType: 'setting',
          npcDescriptionPart1: { character_name: 'Random' },
        },
      ],
    }));

    assignSettingIds();

    const refs = Object.values(JSON.parse(localStorage.getItem('tool-references') || '{}'));
    expect(refs.length).toBe(0);
  });

  it('skips non-setting-sourced NPCs in matching folders', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { place_name: 'Eldergrove' },
    ]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Eldergrove': [
        {
          npc_id: 'npc_dungeon',
          sourceType: 'dungeon', // wrong type, should not be touched
          npcDescriptionPart1: { character_name: 'Dungeon NPC' },
        },
        {
          npc_id: 'npc_none',
          // no sourceType — manually placed in this folder
          npcDescriptionPart1: { character_name: 'Manual NPC' },
        },
      ],
    }));

    assignSettingIds();

    const refs = Object.values(JSON.parse(localStorage.getItem('tool-references') || '{}'));
    expect(refs.length).toBe(0);
  });

  it('handles empty stores gracefully', () => {
    expect(() => assignSettingIds()).not.toThrow();
    localStorage.setItem('gameSettings', JSON.stringify([]));
    expect(() => assignSettingIds()).not.toThrow();
  });

  it('handles malformed tool-references JSON gracefully', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { place_name: 'Eldergrove' },
    ]));
    localStorage.setItem('tool-references', 'not-json');
    expect(() => assignSettingIds()).not.toThrow();
  });
});
