/**
 * @jest-environment jsdom
 */

import { assignDungeonIds } from '../assign-dungeon-ids.mjs';

describe('assign-dungeon-ids', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('converts legacy numeric ids to dng_${oldId} deterministically', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      { id: 1710000000000, dungeonOverview: { name: 'Crypt' } },
      { id: 1710000000001, dungeonOverview: { name: 'Mine' } },
    ]));

    assignDungeonIds();

    const dungeons = JSON.parse(localStorage.getItem('dungeons'));
    expect(dungeons[0].id).toBe('dng_1710000000000');
    expect(dungeons[1].id).toBe('dng_1710000000001');
  });

  it('rewrites references whose target_id matched the old numeric id', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      { id: 1710000000000, dungeonOverview: { name: 'Crypt' } },
    ]));
    localStorage.setItem('tool-references', JSON.stringify({
      'ref_1': {
        id: 'ref_1',
        source_type: 'npc',
        source_id: 'npc_abc',
        source_name: 'Aldric',
        target_type: 'dungeon',
        target_id: 1710000000000,
        target_name: 'Crypt',
        relationship: 'appears_in_dungeon',
        context: '',
      },
      'ref_2': {
        id: 'ref_2',
        source_type: 'statblock',
        source_id: 'Goblin__Custom',
        source_name: 'Goblin',
        target_type: 'dungeon',
        target_id: '1710000000000', // already-stringified form
        target_name: 'Crypt',
        relationship: 'appears_in_dungeon',
        context: '',
      },
    }));

    assignDungeonIds();

    const refs = JSON.parse(localStorage.getItem('tool-references'));
    expect(refs.ref_1.target_id).toBe('dng_1710000000000');
    expect(refs.ref_2.target_id).toBe('dng_1710000000000');
  });

  it('rewrites source_id when a dungeon is the source of a reference', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      { id: 1710000000000, dungeonOverview: { name: 'Crypt' } },
    ]));
    localStorage.setItem('tool-references', JSON.stringify({
      'ref_1': {
        id: 'ref_1',
        source_type: 'dungeon',
        source_id: 1710000000000,
        source_name: 'Crypt',
        target_type: 'item',
        target_id: 'Lantern',
        target_name: 'Lantern',
        relationship: 'mentioned_in_item',
        context: '',
      },
    }));

    assignDungeonIds();

    const refs = JSON.parse(localStorage.getItem('tool-references'));
    expect(refs.ref_1.source_id).toBe('dng_1710000000000');
  });

  it('is idempotent: running twice leaves dng_-prefixed ids alone', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      { id: 1710000000000, dungeonOverview: { name: 'Crypt' } },
    ]));

    assignDungeonIds();
    const afterFirst = JSON.parse(localStorage.getItem('dungeons'))[0].id;
    assignDungeonIds();
    const afterSecond = JSON.parse(localStorage.getItem('dungeons'))[0].id;

    expect(afterFirst).toBe('dng_1710000000000');
    expect(afterSecond).toBe('dng_1710000000000');
  });

  it('handles empty or missing dungeons store gracefully', () => {
    expect(() => assignDungeonIds()).not.toThrow();
    localStorage.setItem('dungeons', JSON.stringify([]));
    expect(() => assignDungeonIds()).not.toThrow();
  });

  it('skips dungeons with malformed (null/undefined) ids', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      { id: null, dungeonOverview: { name: 'Bad' } },
      { id: 1710000000000, dungeonOverview: { name: 'Good' } },
    ]));

    assignDungeonIds();

    const dungeons = JSON.parse(localStorage.getItem('dungeons'));
    expect(dungeons[0].id).toBeNull();
    expect(dungeons[1].id).toBe('dng_1710000000000');
  });
});
