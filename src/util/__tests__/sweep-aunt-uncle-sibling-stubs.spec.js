/**
 * Tests for sweep-aunt-uncle-sibling-stubs + the auntUncleNamesFor
 * helper it depends on.
 *
 * Coverage:
 *   - auntUncleNamesFor
 *       - returns [] for a top-level setting (no parent → no aunts)
 *       - returns [] when parent doesn't resolve in allSettings
 *       - includes realized aunts (settings sharing parent's parentId)
 *       - includes the parent's sibling-kind related_places stub names
 *       - does NOT include parent's parent-kind or sublocation-kind stubs
 *       - does NOT include the parent itself
 *   - sweepAuntUncleSiblingStubs
 *       - drops sibling stubs matching the aunt/uncle set
 *       - keeps non-sibling-kind stubs even when names collide
 *       - keeps sibling stubs whose names DON'T match the aunt/uncle set
 *       - matches case-insensitively
 *       - drops promoted aunts too (caller decision: incoherent peer
 *         link gets dropped, the entity itself stays in the graph)
 *       - idempotent: a clean store is left untouched, no localStorage
 *         write happens
 *       - reproduces the Union of Verdant States bug from the user's
 *         data: UoVS as sibling stub on a city-state and a kingdom
 *         beneath the same regional plain gets removed.
 */

import { auntUncleNamesFor } from '../setting-storage.mjs';
import { sweepAuntUncleSiblingStubs } from '../sweep-aunt-uncle-sibling-stubs.mjs';

class LocalStorageMock {
  constructor() { this.store = {}; }
  clear() { this.store = {}; }
  getItem(key) { return this.store[key] ?? null; }
  setItem(key, value) { this.store[key] = String(value); }
  removeItem(key) { delete this.store[key]; }
  get length() { return Object.keys(this.store).length; }
}

const SETTINGS_KEY = 'gameSettings';

function seed(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
function read() {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY));
}

describe('auntUncleNamesFor', () => {
  it('returns [] for a top-level setting', () => {
    const top = { id: 'set_top', place_name: 'Top', parentId: null };
    expect(auntUncleNamesFor(top, [top])).toEqual([]);
  });

  it('returns [] when the parent does not resolve in allSettings', () => {
    const child = { id: 'set_orphan', place_name: 'Orphan', parentId: 'set_missing' };
    expect(auntUncleNamesFor(child, [child])).toEqual([]);
  });

  it('includes realized aunts (parent\'s tree-siblings under same grandparent)', () => {
    const region = { id: 'set_region', place_name: 'Region', parentId: null };
    const auntKingdom = { id: 'set_kingdom_a', place_name: 'Kingdom A', parentId: null };
    const uncleKingdom = { id: 'set_kingdom_b', place_name: 'Kingdom B', parentId: null };
    const city = { id: 'set_city', place_name: 'City', parentId: 'set_region' };

    const names = auntUncleNamesFor(city, [region, auntKingdom, uncleKingdom, city]);
    expect(names).toContain('Kingdom A');
    expect(names).toContain('Kingdom B');
    expect(names).not.toContain('Region'); // parent itself excluded
    expect(names).not.toContain('City');
  });

  it('includes parent\'s sibling-kind related_places stubs', () => {
    const parent = {
      id: 'set_parent',
      place_name: 'Parent',
      parentId: null,
      related_places: [
        { name: 'Sibling Stub', kind: 'sibling' },
        { name: 'Grandparent Stub', kind: 'parent' },
        { name: 'Inner District', kind: 'sublocation' },
        { name: 'River', kind: 'feature' },
      ],
    };
    const child = { id: 'set_child', place_name: 'Child', parentId: 'set_parent' };

    const names = auntUncleNamesFor(child, [parent, child]);
    expect(names).toContain('Sibling Stub');
    expect(names).not.toContain('Grandparent Stub');
    expect(names).not.toContain('Inner District');
    expect(names).not.toContain('River');
  });

  it('returns realized aunts AND parent stub siblings together', () => {
    const region = {
      id: 'set_region',
      place_name: 'Region',
      parentId: null,
      related_places: [
        { name: 'Stub Polity', kind: 'sibling' },
      ],
    };
    const realizedAunt = { id: 'set_aunt', place_name: 'Realized Aunt', parentId: null };
    const city = { id: 'set_city', place_name: 'City', parentId: 'set_region' };

    const names = auntUncleNamesFor(city, [region, realizedAunt, city]);
    expect(names).toContain('Realized Aunt');
    expect(names).toContain('Stub Polity');
  });
});

describe('sweepAuntUncleSiblingStubs', () => {
  let consoleSpy;

  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('is a no-op when settings array is empty or missing', () => {
    sweepAuntUncleSiblingStubs();
    expect(localStorage.getItem(SETTINGS_KEY)).toBeNull();

    seed([]);
    sweepAuntUncleSiblingStubs();
    expect(read()).toEqual([]);
  });

  it('drops sibling stubs whose names match a realized aunt', () => {
    seed([
      { id: 'set_region', place_name: 'Region', parentId: null },
      { id: 'set_aunt', place_name: 'Sister Region', parentId: null },
      {
        id: 'set_city',
        place_name: 'City',
        parentId: 'set_region',
        related_places: [
          { name: 'Sister Region', kind: 'sibling', promoted_setting_id: null },
          { name: 'Real Peer', kind: 'sibling', promoted_setting_id: null },
        ],
      },
    ]);

    sweepAuntUncleSiblingStubs();

    const city = read().find(s => s.id === 'set_city');
    const names = city.related_places.map(p => p.name);
    expect(names).not.toContain('Sister Region');
    expect(names).toContain('Real Peer');
  });

  it('drops sibling stubs whose names match a parent\'s sibling-kind stub', () => {
    seed([
      {
        id: 'set_region',
        place_name: 'Region',
        parentId: null,
        related_places: [
          { name: 'Other Region', kind: 'sibling', promoted_setting_id: null },
        ],
      },
      {
        id: 'set_city',
        place_name: 'City',
        parentId: 'set_region',
        related_places: [
          { name: 'Other Region', kind: 'sibling', promoted_setting_id: null },
        ],
      },
    ]);

    sweepAuntUncleSiblingStubs();

    const city = read().find(s => s.id === 'set_city');
    expect(city.related_places).toEqual([]);

    // Parent's own sibling stub is not touched — at the parent's scale
    // it's still a legitimate peer claim.
    const region = read().find(s => s.id === 'set_region');
    expect(region.related_places.map(p => p.name)).toEqual(['Other Region']);
  });

  it('keeps non-sibling-kind stubs even when names collide', () => {
    seed([
      { id: 'set_region', place_name: 'Region', parentId: null },
      { id: 'set_aunt', place_name: 'Crossroads', parentId: null },
      {
        id: 'set_city',
        place_name: 'City',
        parentId: 'set_region',
        related_places: [
          { name: 'Crossroads', kind: 'feature', promoted_setting_id: null },
          { name: 'Crossroads', kind: 'sublocation', promoted_setting_id: null },
        ],
      },
    ]);

    sweepAuntUncleSiblingStubs();

    const city = read().find(s => s.id === 'set_city');
    expect(city.related_places).toHaveLength(2);
  });

  it('matches names case-insensitively after trimming whitespace', () => {
    seed([
      { id: 'set_region', place_name: 'Region', parentId: null },
      { id: 'set_aunt', place_name: 'Aethelmar', parentId: null },
      {
        id: 'set_city',
        place_name: 'City',
        parentId: 'set_region',
        related_places: [
          { name: '  aethelmar  ', kind: 'sibling', promoted_setting_id: null },
        ],
      },
    ]);

    sweepAuntUncleSiblingStubs();

    const city = read().find(s => s.id === 'set_city');
    expect(city.related_places).toEqual([]);
  });

  it('drops promoted aunts too (entity stays in graph, just the wrong link goes)', () => {
    // The promoted setting itself isn't deleted by the sweep — only
    // the incorrect cross-reference inside the child's
    // related_places. Verify both: the link is gone from the child,
    // the realized aunt is still present in the settings array.
    seed([
      { id: 'set_region', place_name: 'Region', parentId: null },
      { id: 'set_aunt', place_name: 'Promoted Aunt', parentId: null },
      {
        id: 'set_city',
        place_name: 'City',
        parentId: 'set_region',
        related_places: [
          { name: 'Promoted Aunt', kind: 'sibling', promoted_setting_id: 'set_aunt' },
        ],
      },
    ]);

    sweepAuntUncleSiblingStubs();

    const stored = read();
    expect(stored.find(s => s.id === 'set_aunt')).toBeDefined();
    const city = stored.find(s => s.id === 'set_city');
    expect(city.related_places).toEqual([]);
  });

  it('is idempotent — second run on a clean store changes nothing', () => {
    seed([
      { id: 'set_region', place_name: 'Region', parentId: null },
      { id: 'set_aunt', place_name: 'Aunt', parentId: null },
      {
        id: 'set_city',
        place_name: 'City',
        parentId: 'set_region',
        related_places: [
          { name: 'Real Peer', kind: 'sibling', promoted_setting_id: null },
        ],
      },
    ]);

    const before = read();
    sweepAuntUncleSiblingStubs();
    sweepAuntUncleSiblingStubs();
    expect(read()).toEqual(before);
  });

  it('reproduces the Union of Verdant States cleanup from the user\'s data', () => {
    // Minimal slice of the user-reported state: a region with two
    // children (city-state + kingdom), each carrying UoVS as a
    // sibling stub. The region's own peer-claim of UoVS stays; the
    // children's incoherent peer-claims get dropped.
    seed([
      {
        id: 'set_plain',
        place_name: 'Eldryssian plain',
        parentId: null,
        related_places: [
          { name: 'Union of Verdant States', kind: 'sibling', promoted_setting_id: null },
        ],
      },
      {
        id: 'set_republic',
        place_name: 'Repubblica dei Cinque Martelli',
        parentId: 'set_plain',
        related_places: [
          { name: 'Aethelmar', kind: 'sibling', promoted_setting_id: 'set_aethelmar' },
          { name: 'Union of Verdant States', kind: 'sibling', promoted_setting_id: null },
        ],
      },
      {
        id: 'set_aethelmar',
        place_name: 'Aethelmar',
        parentId: 'set_plain',
        related_places: [
          { name: 'Union of Verdant States', kind: 'sibling', promoted_setting_id: null },
        ],
      },
    ]);

    sweepAuntUncleSiblingStubs();

    const stored = read();
    const plain = stored.find(s => s.id === 'set_plain');
    const republic = stored.find(s => s.id === 'set_republic');
    const aethelmar = stored.find(s => s.id === 'set_aethelmar');

    // Plain's own sibling claim survives (legitimate at its scale).
    expect(plain.related_places.map(p => p.name)).toContain('Union of Verdant States');

    // Republic keeps Aethelmar (a true peer city-state under the same
    // plain) but loses UoVS (parent-scale, was an aunt).
    expect(republic.related_places.map(p => p.name)).toEqual(['Aethelmar']);

    // Aethelmar loses UoVS entirely.
    expect(aethelmar.related_places).toEqual([]);
  });
});
