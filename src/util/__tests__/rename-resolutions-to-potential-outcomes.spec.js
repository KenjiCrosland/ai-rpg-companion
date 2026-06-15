/**
 * @jest-environment jsdom
 */

import { renameResolutionsToPotentialOutcomes } from '../rename-resolutions-to-potential-outcomes.mjs';

describe('renameResolutionsToPotentialOutcomes migration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renames resolutions → potential_outcomes on a dungeon overview', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      {
        id: 'dng_a',
        dungeonOverview: {
          overview: 'A low barrow.',
          resolutions: 'The party can do X, but it costs Y.',
        },
      },
    ]));

    renameResolutionsToPotentialOutcomes();

    const [dungeon] = JSON.parse(localStorage.getItem('dungeons'));
    expect(dungeon.dungeonOverview).not.toHaveProperty('resolutions');
    expect(dungeon.dungeonOverview.potential_outcomes).toBe('The party can do X, but it costs Y.');
  });

  it('preserves an existing potential_outcomes value when both fields are present', () => {
    // Defensive: if the migration runs after a fresh generation has
    // already populated potential_outcomes (or if it runs twice for
    // any reason), the new field's value wins. The old field is
    // dropped either way.
    localStorage.setItem('dungeons', JSON.stringify([
      {
        id: 'dng_a',
        dungeonOverview: {
          potential_outcomes: 'New value.',
          resolutions: 'Old value.',
        },
      },
    ]));

    renameResolutionsToPotentialOutcomes();

    const [dungeon] = JSON.parse(localStorage.getItem('dungeons'));
    expect(dungeon.dungeonOverview).not.toHaveProperty('resolutions');
    expect(dungeon.dungeonOverview.potential_outcomes).toBe('New value.');
  });

  it('leaves dungeons without resolutions untouched', () => {
    // Legacy pre-redesign dungeons (with the old field shape) and
    // freshly-generated dungeons that already use potential_outcomes
    // shouldn't be modified.
    localStorage.setItem('dungeons', JSON.stringify([
      {
        id: 'dng_legacy',
        dungeonOverview: { overview: 'old.', conclusion: 'old conclusion.' },
      },
      {
        id: 'dng_fresh',
        dungeonOverview: { overview: 'fresh.', potential_outcomes: 'already renamed.' },
      },
    ]));

    renameResolutionsToPotentialOutcomes();

    const dungeons = JSON.parse(localStorage.getItem('dungeons'));
    expect(dungeons[0].dungeonOverview.conclusion).toBe('old conclusion.');
    expect(dungeons[1].dungeonOverview.potential_outcomes).toBe('already renamed.');
  });

  it('handles missing dungeons key gracefully', () => {
    expect(() => renameResolutionsToPotentialOutcomes()).not.toThrow();
  });

  it('handles malformed JSON gracefully', () => {
    localStorage.setItem('dungeons', 'not valid JSON');
    expect(() => renameResolutionsToPotentialOutcomes()).not.toThrow();
  });

  it('handles a dungeon with no dungeonOverview', () => {
    localStorage.setItem('dungeons', JSON.stringify([{ id: 'dng_empty' }]));
    expect(() => renameResolutionsToPotentialOutcomes()).not.toThrow();
  });

  it('walks all saved dungeons (not just the first)', () => {
    localStorage.setItem('dungeons', JSON.stringify([
      { id: 'dng_a', dungeonOverview: { resolutions: 'A.' } },
      { id: 'dng_b', dungeonOverview: { resolutions: 'B.' } },
      { id: 'dng_c', dungeonOverview: { resolutions: 'C.' } },
    ]));

    renameResolutionsToPotentialOutcomes();

    const dungeons = JSON.parse(localStorage.getItem('dungeons'));
    expect(dungeons[0].dungeonOverview.potential_outcomes).toBe('A.');
    expect(dungeons[1].dungeonOverview.potential_outcomes).toBe('B.');
    expect(dungeons[2].dungeonOverview.potential_outcomes).toBe('C.');
  });
});
