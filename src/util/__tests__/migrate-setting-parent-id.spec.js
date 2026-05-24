/**
 * Tests for migrate-setting-parent-id.
 *
 * The migration's job is to convert two legacy index-based references
 * into stable id-based ones:
 *   - setting.parentIndex (number | null) → setting.parentId (string | null)
 *   - importantLocations[].main_index (number | null)
 *       → importantLocations[].promoted_setting_id (string | null)
 *
 * Coverage:
 *   - parentIndex 0/1/N resolves to the correct sibling's id
 *   - parentIndex null becomes parentId null
 *   - main_index resolves to the correct target setting's id
 *   - main_index null becomes promoted_setting_id null
 *   - idempotent: second run is a no-op (no parentIndex / main_index
 *     left to migrate)
 *   - defensive: out-of-range index resolves to null parentId rather
 *     than throwing
 *   - already-migrated records (no parentIndex, parentId already set)
 *     pass through unchanged
 *   - empty / missing settings array is a no-op
 */

import { migrateSettingParentId } from '../migrate-setting-parent-id.mjs';

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

describe('migrateSettingParentId', () => {
  let consoleSpy;

  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('converts parentIndex numbers to the target setting\'s id', () => {
    seed([
      { id: 'set_kingdom', place_name: 'Kingdom', parentIndex: null },
      { id: 'set_city', place_name: 'City', parentIndex: 0 },
      { id: 'set_district', place_name: 'District', parentIndex: 1 },
    ]);

    migrateSettingParentId();

    const out = read();
    expect(out[0].parentId).toBe(null);
    expect(out[1].parentId).toBe('set_kingdom');
    expect(out[2].parentId).toBe('set_city');
    // parentIndex field is dropped on every record.
    expect(out.every(s => !('parentIndex' in s))).toBe(true);
  });

  it('converts null parentIndex to null parentId (top-level)', () => {
    seed([
      { id: 'set_a', parentIndex: null },
      { id: 'set_b', parentIndex: null },
    ]);

    migrateSettingParentId();

    const out = read();
    expect(out[0].parentId).toBe(null);
    expect(out[1].parentId).toBe(null);
    expect('parentIndex' in out[0]).toBe(false);
    expect('parentIndex' in out[1]).toBe(false);
  });

  it('converts importantLocations[].main_index to promoted_setting_id', () => {
    seed([
      {
        id: 'set_kingdom',
        place_name: 'Kingdom',
        parentIndex: null,
        importantLocations: [
          { name: 'A', main_index: 1, has_detailed_description: true },
          { name: 'B', main_index: 2, has_detailed_description: true },
          { name: 'C (unpromoted)', main_index: null, has_detailed_description: false },
        ],
      },
      { id: 'set_city', place_name: 'City', parentIndex: 0 },
      { id: 'set_district', place_name: 'District', parentIndex: 0 },
    ]);

    migrateSettingParentId();

    const out = read();
    const stubs = out[0].importantLocations;
    expect(stubs[0].promoted_setting_id).toBe('set_city');
    expect(stubs[1].promoted_setting_id).toBe('set_district');
    expect(stubs[2].promoted_setting_id).toBe(null);
    // main_index dropped from every stub.
    expect(stubs.every(s => !('main_index' in s))).toBe(true);
  });

  it('is idempotent — running twice produces the same result as once', () => {
    seed([
      { id: 'set_kingdom', parentIndex: null, importantLocations: [{ name: 'X', main_index: 1 }] },
      { id: 'set_city', parentIndex: 0 },
    ]);

    migrateSettingParentId();
    const after1 = JSON.stringify(read());
    migrateSettingParentId();
    const after2 = JSON.stringify(read());

    expect(after2).toBe(after1);
  });

  it('handles already-migrated records (parentId set, no parentIndex) unchanged', () => {
    seed([
      { id: 'set_a', parentId: null },
      { id: 'set_b', parentId: 'set_a', importantLocations: [{ name: 'X', promoted_setting_id: 'set_a' }] },
    ]);

    migrateSettingParentId();

    const out = read();
    expect(out[0].parentId).toBe(null);
    expect(out[1].parentId).toBe('set_a');
    expect(out[1].importantLocations[0].promoted_setting_id).toBe('set_a');
    expect('parentIndex' in out[0]).toBe(false);
    expect('parentIndex' in out[1]).toBe(false);
  });

  it('resolves out-of-range parentIndex to null rather than throwing', () => {
    seed([
      { id: 'set_only', parentIndex: 99 }, // points to nothing
    ]);

    expect(() => migrateSettingParentId()).not.toThrow();
    const out = read();
    expect(out[0].parentId).toBe(null);
  });

  it('resolves out-of-range main_index to null rather than throwing', () => {
    seed([
      {
        id: 'set_kingdom',
        parentIndex: null,
        importantLocations: [{ name: 'X', main_index: 42 }],
      },
    ]);

    expect(() => migrateSettingParentId()).not.toThrow();
    const out = read();
    expect(out[0].importantLocations[0].promoted_setting_id).toBe(null);
  });

  it('defaults missing parentId / promoted_setting_id to null on brand-new records', () => {
    // A record with neither field is treated as "fresh post-migration"
    // and gets parentId: null assigned defensively. Same for stub
    // promoted_setting_id.
    seed([
      { id: 'set_a' /* no parentIndex, no parentId */ },
      {
        id: 'set_b',
        parentId: null,
        importantLocations: [{ name: 'X' /* neither main_index nor promoted_setting_id */ }],
      },
    ]);

    migrateSettingParentId();

    const out = read();
    expect(out[0].parentId).toBe(null);
    expect(out[1].importantLocations[0].promoted_setting_id).toBe(null);
  });

  it('is a no-op on missing or non-array gameSettings', () => {
    // No gameSettings entry at all.
    expect(() => migrateSettingParentId()).not.toThrow();

    // Non-array value (corrupted).
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ rogue: 'object' }));
    expect(() => migrateSettingParentId()).not.toThrow();
    // The corrupt object is untouched (defensive: don't overwrite data
    // we don't understand).
    expect(JSON.parse(localStorage.getItem(SETTINGS_KEY))).toEqual({ rogue: 'object' });
  });
});
