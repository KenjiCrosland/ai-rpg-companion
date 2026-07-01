import {
  rectsOverlap,
  collidesAny,
  offsetToCell,
  resolvePosition,
  placeItemAt,
  packItems,
  contentRows,
  findStackTarget,
  COLS,
} from './grid-layout.mjs';

const placed = (x, y, w, h, extra = {}) => ({ pos: { x, y }, size: { w, h }, ...extra });

const noOverlaps = (items) => {
  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      const a = items[i];
      const b = items[j];
      if (rectsOverlap(
        { x: a.pos.x, y: a.pos.y, w: a.size.w, h: a.size.h },
        { x: b.pos.x, y: b.pos.y, w: b.size.w, h: b.size.h },
      )) return false;
    }
  }
  return true;
};

describe('rectsOverlap', () => {
  it('detects overlap and adjacency correctly', () => {
    expect(rectsOverlap({ x: 0, y: 0, w: 2, h: 2 }, { x: 1, y: 1, w: 2, h: 2 })).toBe(true);
    expect(rectsOverlap({ x: 0, y: 0, w: 2, h: 2 }, { x: 2, y: 0, w: 2, h: 2 })).toBe(false); // touching, not overlapping
    expect(rectsOverlap({ x: 0, y: 0, w: 1, h: 1 }, { x: 0, y: 1, w: 1, h: 1 })).toBe(false);
  });
});

describe('offsetToCell', () => {
  it('floors offset by pitch, never negative', () => {
    expect(offsetToCell(0, 50)).toBe(0);
    expect(offsetToCell(49, 50)).toBe(0);
    expect(offsetToCell(50, 50)).toBe(1);
    expect(offsetToCell(125, 50)).toBe(2);
    expect(offsetToCell(-10, 50)).toBe(0);
    expect(offsetToCell(100, 0)).toBe(0);
  });
});

describe('resolvePosition', () => {
  it('keeps the preferred cell when it is free (gaps preserved)', () => {
    const others = [placed(0, 0, 1, 1)];
    expect(resolvePosition({ x: 4, y: 3 }, { w: 1, h: 1 }, others)).toEqual({ x: 4, y: 3 });
  });

  it('clamps x so the item stays within the columns', () => {
    expect(resolvePosition({ x: 99, y: 0 }, { w: 2, h: 1 }, [])).toEqual({ x: COLS - 2, y: 0 });
  });

  it('slides to the nearest free cell when the target is occupied (never rejects)', () => {
    const others = [placed(0, 0, 2, 2)];
    const pos = resolvePosition({ x: 0, y: 0 }, { w: 2, h: 2 }, others);
    expect(collidesAny({ ...pos, w: 2, h: 2 }, others)).toBe(false);
  });
});

describe('placeItemAt — land where pointed, displace overlaps', () => {
  it('lands exactly at the pointed empty cell (no snap-back)', () => {
    const items = [
      placed(0, 0, 1, 1, { instanceId: 'a' }),
      placed(0, 1, 1, 1, { instanceId: 'b' }),
    ];
    const out = placeItemAt(items, 'b', { x: 5, y: 4 });
    expect(out.find((i) => i.instanceId === 'b').pos).toEqual({ x: 5, y: 4 });
    expect(noOverlaps(out)).toBe(true);
  });

  it('clamps a wide tile so it stays in the grid but keeps the row', () => {
    const items = [placed(0, 0, 3, 3, { instanceId: 'big' })];
    const out = placeItemAt(items, 'big', { x: 7, y: 0 }); // would overflow → shift left
    expect(out[0].pos).toEqual({ x: COLS - 3, y: 0 });
  });

  it('displaces the items it is dropped onto to the nearest free cells', () => {
    const items = [
      placed(0, 0, 1, 1, { instanceId: 'soap' }),
      placed(1, 0, 2, 1, { instanceId: 'paper' }),
      placed(0, 4, 2, 2, { instanceId: 'clothes' }),
    ];
    // drop clothes onto soap+paper at the top-left
    const out = placeItemAt(items, 'clothes', { x: 0, y: 0 });
    expect(out.find((i) => i.instanceId === 'clothes').pos).toEqual({ x: 0, y: 0 });
    expect(noOverlaps(out)).toBe(true); // soap & paper relocated, nothing overlaps
  });
});

describe('packItems', () => {
  const items = [
    placed(9, 9, 1, 1, { category: 'Tools', name: 'b' }),
    placed(9, 9, 2, 2, { category: 'Weapon', name: 'a' }),
    placed(9, 9, 1, 1, { category: 'Weapon', name: 'c' }),
  ];

  it('assigns non-overlapping positions to every item', () => {
    const packed = packItems(items);
    for (let i = 0; i < packed.length; i += 1) {
      for (let j = i + 1; j < packed.length; j += 1) {
        const a = packed[i];
        const b = packed[j];
        expect(
          rectsOverlap(
            { x: a.pos.x, y: a.pos.y, w: a.size.w, h: a.size.h },
            { x: b.pos.x, y: b.pos.y, w: b.size.w, h: b.size.h },
          ),
        ).toBe(false);
      }
    }
  });

  it('packs to the top-left (the first item starts at the origin)', () => {
    const packed = packItems(items);
    expect(packed.some((p) => p.pos.x === 0 && p.pos.y === 0)).toBe(true);
  });

  it('type sort groups by the filter type — consumables separate from other gear', () => {
    // Both Torch and Backpack are SRD "Adventuring Gear", but the pills (and now
    // the sort) split Torch out as a consumable, ahead of plain gear.
    const mixed = [
      placed(9, 9, 1, 1, { name: 'Backpack', category: 'Adventuring Gear' }),
      placed(9, 9, 1, 1, { name: 'Torch', category: 'Adventuring Gear' }),
      placed(9, 9, 1, 1, { name: 'Dagger', category: 'Weapon' }),
    ];
    const order = packItems(mixed, COLS, 'type').map((i) => i.name);
    expect(order).toEqual(['Dagger', 'Torch', 'Backpack']); // weapon → consumable → gear
  });

  it('quantity sort is most-first, but a steppable you have one of sinks last', () => {
    const items = [
      placed(9, 9, 1, 1, { name: 'Torch', category: 'Adventuring Gear', quantity: 1 }), // steppable qty1 → sinks
      placed(9, 9, 1, 1, { name: 'Longsword', category: 'Weapon', quantity: 3 }),
      placed(9, 9, 1, 1, { name: 'Rope', category: 'Adventuring Gear', quantity: 1 }), // plain qty1
      placed(9, 9, 1, 1, { name: 'Arrow of Slaying', category: 'Magic Item', magicType: 'Ammunition', quantity: 1 }), // magic consumable qty1 → also sinks
    ];
    const order = packItems(items, COLS, 'quantity').map((i) => i.name);
    // qty3 first, then the non-steppable single, then the two depleted steppables last.
    expect(order.slice(0, 2)).toEqual(['Longsword', 'Rope']);
    expect(order.slice(2).sort()).toEqual(['Arrow of Slaying', 'Torch']);
  });
});

describe('findStackTarget — stack identical items', () => {
  const items = [
    placed(0, 0, 1, 1, { instanceId: 'a', id: 'dagger' }),
    placed(3, 0, 1, 1, { instanceId: 'b', id: 'dagger' }),
    placed(5, 0, 1, 1, { instanceId: 'c', id: 'torch' }),
  ];

  it('returns the identical tile dropped onto', () => {
    expect(findStackTarget(items, 'b', { x: 0, y: 0 })).toBe('a'); // dagger onto dagger
  });

  it('returns null when the target is a different item', () => {
    expect(findStackTarget(items, 'b', { x: 5, y: 0 })).toBe(null); // dagger onto torch
  });

  it('returns null when dropped on empty space', () => {
    expect(findStackTarget(items, 'b', { x: 7, y: 4 })).toBe(null);
  });
});

describe('contentRows', () => {
  it('returns the lowest occupied row', () => {
    expect(contentRows([placed(0, 0, 1, 1), placed(2, 3, 2, 2)])).toBe(5);
    expect(contentRows([])).toBe(0);
  });
});
