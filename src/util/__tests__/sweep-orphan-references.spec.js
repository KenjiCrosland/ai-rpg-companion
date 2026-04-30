/**
 * @jest-environment jsdom
 */

import { sweepOrphanReferences } from '../sweep-orphan-references.mjs';

describe('sweep-orphan-references', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('removes references whose source no longer resolves', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({}));
    localStorage.setItem('savedItems', JSON.stringify([{ name: 'Lantern' }]));
    localStorage.setItem('tool-references', JSON.stringify({
      'ref_orphan': {
        id: 'ref_orphan',
        source_type: 'npc',
        source_id: 'npc_does_not_exist',
        source_name: 'Ghost',
        target_type: 'item',
        target_id: 'Lantern',
        target_name: 'Lantern',
        relationship: 'mentioned_in_item',
        context: '',
      },
    }));

    sweepOrphanReferences();

    const refs = JSON.parse(localStorage.getItem('tool-references'));
    expect(refs.ref_orphan).toBeUndefined();
  });

  it('removes references whose target no longer resolves', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [{ npc_id: 'npc_alive' }],
    }));
    localStorage.setItem('savedItems', JSON.stringify([])); // item gone
    localStorage.setItem('tool-references', JSON.stringify({
      'ref_orphan_target': {
        id: 'ref_orphan_target',
        source_type: 'npc',
        source_id: 'npc_alive',
        source_name: 'Aldric',
        target_type: 'item',
        target_id: 'DeletedItem',
        target_name: 'DeletedItem',
        relationship: 'mentioned_in_item',
        context: '',
      },
    }));

    sweepOrphanReferences();

    const refs = JSON.parse(localStorage.getItem('tool-references'));
    expect(refs.ref_orphan_target).toBeUndefined();
  });

  it('preserves references whose source and target both resolve', () => {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [{ npc_id: 'npc_alive' }],
    }));
    localStorage.setItem('savedItems', JSON.stringify([{ name: 'Lantern' }]));
    localStorage.setItem('tool-references', JSON.stringify({
      'ref_valid': {
        id: 'ref_valid',
        source_type: 'npc',
        source_id: 'npc_alive',
        source_name: 'Aldric',
        target_type: 'item',
        target_id: 'Lantern',
        target_name: 'Lantern',
        relationship: 'mentioned_in_item',
        context: '',
      },
    }));

    sweepOrphanReferences();

    const refs = JSON.parse(localStorage.getItem('tool-references'));
    expect(refs.ref_valid).toBeDefined();
  });

  it('resolves dungeon ids by stringified form so post-id-migration refs survive', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      { id: 'dng_1710000000000', dungeonOverview: { name: 'Crypt' } },
    ]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [{ npc_id: 'npc_a' }],
    }));
    localStorage.setItem('tool-references', JSON.stringify({
      'ref_valid': {
        id: 'ref_valid',
        source_type: 'npc',
        source_id: 'npc_a',
        source_name: 'A',
        target_type: 'dungeon',
        target_id: 'dng_1710000000000',
        target_name: 'Crypt',
        relationship: 'appears_in_dungeon',
        context: '',
      },
    }));

    sweepOrphanReferences();

    const refs = JSON.parse(localStorage.getItem('tool-references'));
    expect(refs.ref_valid).toBeDefined();
  });

  it('resolves setting refs via id OR place_name fallback', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_xyz', place_name: 'Eldergrove' },
    ]));
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [{ npc_id: 'npc_a' }, { npc_id: 'npc_b' }],
    }));
    localStorage.setItem('tool-references', JSON.stringify({
      'ref_by_id': {
        id: 'ref_by_id',
        source_type: 'npc',
        source_id: 'npc_a',
        source_name: 'A',
        target_type: 'setting',
        target_id: 'set_xyz',
        target_name: 'Eldergrove',
        relationship: 'appears_in_setting',
        context: '',
      },
      'ref_by_name': {
        id: 'ref_by_name',
        source_type: 'npc',
        source_id: 'npc_b',
        source_name: 'B',
        target_type: 'setting',
        target_id: 'Eldergrove', // legacy place_name
        target_name: 'Eldergrove',
        relationship: 'appears_in_setting',
        context: '',
      },
    }));

    sweepOrphanReferences();

    const refs = JSON.parse(localStorage.getItem('tool-references'));
    expect(refs.ref_by_id).toBeDefined();
    expect(refs.ref_by_name).toBeDefined();
  });

  it('removes encounter refs whose folder/index no longer exists', () => {
    localStorage.setItem('encounters', JSON.stringify({
      'Uncategorized': [{ name: 'A' }], // only index 0
    }));
    localStorage.setItem('tool-references', JSON.stringify({
      'ref_drift': {
        id: 'ref_drift',
        source_type: 'statblock',
        source_id: 'Goblin__Custom',
        source_name: 'Goblin',
        target_type: 'encounter',
        target_id: 'Uncategorized__1', // points at deleted slot
        target_name: 'B',
        relationship: 'features_in_encounter',
        context: '',
      },
    }));

    sweepOrphanReferences();

    const refs = JSON.parse(localStorage.getItem('tool-references'));
    expect(refs.ref_drift).toBeUndefined();
  });

  it('handles empty stores gracefully', () => {
    expect(() => sweepOrphanReferences()).not.toThrow();
    localStorage.setItem('tool-references', JSON.stringify({}));
    expect(() => sweepOrphanReferences()).not.toThrow();
  });
});
