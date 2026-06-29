import {
  defaultState,
  normalizeState,
  serializeBundle,
  toJSON,
  fromJSON,
  loadBackpack,
  saveBackpack,
  exportFilename,
} from './backpack-storage.mjs';

const sampleState = () => ({
  version: 1,
  strength: 14,
  items: [
    {
      instanceId: 'bp_fixed_1',
      id: 'longsword',
      name: 'Longsword',
      weight: 3,
      category: 'Weapon',
      size: { w: 1, h: 2 },
      source: 'srd',
    },
    {
      instanceId: 'bp_fixed_2',
      id: 'custom-grappling-hook',
      name: 'Grappling Hook',
      weight: 4,
      category: 'Adventuring Gear',
      size: { w: 1, h: 1 },
      source: 'custom',
    },
  ],
  customItems: [
    {
      instanceId: 'bp_fixed_3',
      id: 'custom-grappling-hook',
      name: 'Grappling Hook',
      weight: 4,
      category: 'Adventuring Gear',
      size: { w: 1, h: 1 },
      source: 'custom',
    },
  ],
  coins: { gp: 25, ep: 0, sp: 8, cp: 40 },
  countCoinWeight: false,
});

describe('export → import round-trip (data integrity)', () => {
  it('round-trips to an identical state', () => {
    const state = normalizeState(sampleState());
    const restored = fromJSON(toJSON(state));
    expect(restored).toEqual(state);
  });

  it('preserves stable instance ids through the round-trip', () => {
    const state = normalizeState(sampleState());
    const restored = fromJSON(toJSON(state));
    expect(restored.items.map((i) => i.instanceId)).toEqual(['bp_fixed_1', 'bp_fixed_2']);
  });

  it('is stable across a second round-trip (idempotent)', () => {
    const once = fromJSON(toJSON(normalizeState(sampleState())));
    const twice = fromJSON(toJSON(once));
    expect(twice).toEqual(once);
  });
});

describe('normalizeState hardening', () => {
  it('falls back to a clean default for garbage input', () => {
    expect(normalizeState(null)).toEqual(defaultState());
    expect(normalizeState('nope')).toEqual(defaultState());
    expect(normalizeState({})).toEqual(defaultState());
  });

  it('repairs bad strength and missing arrays', () => {
    const s = normalizeState({ strength: -3 });
    expect(s.strength).toBe(10);
    expect(s.items).toEqual([]);
    expect(s.customItems).toEqual([]);
  });

  it('backfills missing item fields without throwing', () => {
    const s = normalizeState({ items: [{ name: 'Mystery' }] });
    expect(s.items[0]).toMatchObject({
      name: 'Mystery',
      weight: 0,
      category: 'Adventuring Gear',
      size: { w: 1, h: 1 },
      source: 'custom',
    });
    expect(typeof s.items[0].instanceId).toBe('string');
  });
});

describe('serializeBundle', () => {
  it('emits only the portable fields', () => {
    const bundle = serializeBundle(sampleState());
    expect(Object.keys(bundle).sort()).toEqual([
      'coins',
      'countCoinWeight',
      'customItems',
      'items',
      'packDropped',
      'strength',
      'version',
    ]);
  });

  it('preserves coins and the coin-weight toggle through a round-trip', () => {
    const state = normalizeState(sampleState());
    const restored = fromJSON(toJSON(state));
    expect(restored.coins).toEqual({ gp: 25, ep: 0, sp: 8, cp: 40 });
    expect(restored.countCoinWeight).toBe(false);
  });

  it('preserves the dropped-pack mode through a round-trip', () => {
    expect(fromJSON(toJSON(normalizeState({ packDropped: true }))).packDropped).toBe(true);
    // Defaults off, and coerces truthy/garbage input to a real boolean.
    expect(normalizeState({}).packDropped).toBe(false);
    expect(normalizeState({ packDropped: 1 }).packDropped).toBe(true);
  });
});

describe('coin normalization', () => {
  it('defaults coins to zero and the toggle to true', () => {
    const s = normalizeState({});
    expect(s.coins).toEqual({ gp: 0, ep: 0, sp: 0, cp: 0 });
    expect(s.countCoinWeight).toBe(true);
  });

  it('floors and clamps negative/garbage coin values', () => {
    const s = normalizeState({ coins: { gp: 3.9, ep: -5, sp: 'x', cp: 12 } });
    expect(s.coins).toEqual({ gp: 3, ep: 0, sp: 0, cp: 12 });
  });
});

describe('localStorage persistence', () => {
  beforeEach(() => localStorage.clear());

  it('returns a default state when nothing is stored', () => {
    expect(loadBackpack()).toEqual(defaultState());
  });

  it('saves and reloads the same state', () => {
    const state = normalizeState(sampleState());
    saveBackpack(state);
    expect(loadBackpack()).toEqual(state);
  });
});

describe('exportFilename', () => {
  it('matches the suite convention backpack-{mon}-{day}-{yy}.json', () => {
    expect(exportFilename(new Date('2026-06-28T12:00:00'))).toBe('backpack-jun-28-26.json');
  });
});
