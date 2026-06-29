import {
  defaultStore,
  normalizeStore,
  normalizeCharacter,
  serializeBundle,
  toJSON,
  fromJSON,
  loadBackpack,
  saveBackpack,
  exportFilename,
} from './backpack-storage.mjs';

const sampleStore = () => ({
  version: 2,
  currentId: 'char_a',
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
  characters: [
    {
      id: 'char_a',
      name: 'Aria',
      strength: 14,
      coins: { gp: 25, ep: 0, sp: 8, cp: 40 },
      countCoinWeight: false,
      packDropped: false,
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
    },
    {
      id: 'char_b',
      name: 'Borin',
      strength: 16,
      coins: { gp: 0, ep: 0, sp: 0, cp: 0 },
      countCoinWeight: true,
      packDropped: true,
      items: [],
    },
  ],
});

describe('export → import round-trip (data integrity)', () => {
  it('round-trips the whole multi-character store to identical state', () => {
    const store = normalizeStore(sampleStore());
    expect(fromJSON(toJSON(store))).toEqual(store);
  });

  it('preserves stable instance ids and the active character', () => {
    const store = normalizeStore(sampleStore());
    const restored = fromJSON(toJSON(store));
    expect(restored.characters[0].items.map((i) => i.instanceId)).toEqual(['bp_fixed_1', 'bp_fixed_2']);
    expect(restored.currentId).toBe('char_a');
  });

  it('keeps each character distinct (Borin has the dropped pack, Aria does not)', () => {
    const store = normalizeStore(sampleStore());
    const restored = fromJSON(toJSON(store));
    expect(restored.characters.map((c) => c.name)).toEqual(['Aria', 'Borin']);
    expect(restored.characters[0].packDropped).toBe(false);
    expect(restored.characters[1].packDropped).toBe(true);
  });

  it('is stable across a second round-trip (idempotent)', () => {
    const once = fromJSON(toJSON(normalizeStore(sampleStore())));
    const twice = fromJSON(toJSON(once));
    expect(twice).toEqual(once);
  });
});

describe('normalizeStore hardening', () => {
  it('falls back to a fresh one-character store for garbage / pre-v2 input', () => {
    for (const garbage of [null, 'nope', {}, { strength: 14, items: [{ name: 'x' }] }]) {
      const s = normalizeStore(garbage);
      expect(s.version).toBe(2);
      expect(s.characters).toHaveLength(1);
      expect(s.characters[0].items).toEqual([]);
      expect(s.currentId).toBe(s.characters[0].id);
    }
  });

  it('points currentId at the first character when the stored id is unknown', () => {
    const s = normalizeStore({ version: 2, currentId: 'gone', characters: [{ id: 'x', name: 'X' }] });
    expect(s.currentId).toBe('x');
  });

  it('never leaves an empty roster', () => {
    const s = normalizeStore({ version: 2, characters: [] });
    expect(s.characters).toHaveLength(1);
  });
});

describe('normalizeCharacter', () => {
  it('repairs bad strength and missing arrays', () => {
    const c = normalizeCharacter({ strength: -3 });
    expect(c.strength).toBe(10);
    expect(c.items).toEqual([]);
    expect(typeof c.id).toBe('string');
    expect(c.name).toBe('Character');
  });

  it('backfills missing item fields without throwing', () => {
    const c = normalizeCharacter({ items: [{ name: 'Mystery' }] });
    expect(c.items[0]).toMatchObject({
      name: 'Mystery',
      weight: 0,
      category: 'Adventuring Gear',
      size: { w: 1, h: 1 },
      source: 'custom',
    });
    expect(typeof c.items[0].instanceId).toBe('string');
  });

  it('defaults coins to zero and the coin-weight toggle to true', () => {
    const c = normalizeCharacter({});
    expect(c.coins).toEqual({ gp: 0, ep: 0, sp: 0, cp: 0 });
    expect(c.countCoinWeight).toBe(true);
    expect(c.packDropped).toBe(false);
  });

  it('floors and clamps negative/garbage coin values', () => {
    const c = normalizeCharacter({ coins: { gp: 3.9, ep: -5, sp: 'x', cp: 12 } });
    expect(c.coins).toEqual({ gp: 3, ep: 0, sp: 0, cp: 12 });
  });

  it('coerces the dropped-pack mode to a real boolean', () => {
    expect(normalizeCharacter({ packDropped: 1 }).packDropped).toBe(true);
    expect(normalizeCharacter({ packDropped: 0 }).packDropped).toBe(false);
  });
});

describe('serializeBundle', () => {
  it('emits only the portable store fields', () => {
    const bundle = serializeBundle(sampleStore());
    expect(Object.keys(bundle).sort()).toEqual(['characters', 'currentId', 'customItems', 'version']);
  });
});

describe('localStorage persistence', () => {
  beforeEach(() => localStorage.clear());

  it('returns a fresh one-character store when nothing is stored', () => {
    const s = loadBackpack();
    expect(s.version).toBe(2);
    expect(s.characters).toHaveLength(1);
  });

  it('saves and reloads the same store', () => {
    const store = normalizeStore(sampleStore());
    saveBackpack(store);
    expect(loadBackpack()).toEqual(store);
  });
});

describe('exportFilename', () => {
  it('matches the suite convention backpack-{mon}-{day}-{yy}.json', () => {
    expect(exportFilename(new Date('2026-06-28T12:00:00'))).toBe('backpack-jun-28-26.json');
  });
});
