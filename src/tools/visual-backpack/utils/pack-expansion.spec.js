import { expandPackToTemplates } from './pack-expansion.mjs';
import { totalWeight } from './carry-capacity.mjs';
import packs from '../data/srd-packs.json';

const burglars = packs.find((p) => p.id === 'burglars-pack');

describe('expandPackToTemplates', () => {
  it('produces one tile per content line', () => {
    const tiles = expandPackToTemplates(burglars);
    expect(tiles).toHaveLength(burglars.itemCount);
    expect(tiles).toHaveLength(burglars.contents.length);
  });

  it("the expanded tiles' total weight equals the pack's stated weight", () => {
    const tiles = expandPackToTemplates(burglars);
    expect(totalWeight(tiles)).toBe(burglars.totalWeight);
  });

  it('a stacked line is one tile with a quantity (per-unit weight kept)', () => {
    const tiles = expandPackToTemplates(burglars);
    const pitons = tiles.find((t) => t.id === 'piton');
    expect(pitons.name).toBe('Piton'); // clean name, no "(×10)"
    expect(pitons.quantity).toBe(10);
    expect(pitons.weight).toBe(0.25); // per-unit, not stacked
  });

  it('single-quantity items get quantity 1', () => {
    const tiles = expandPackToTemplates(burglars);
    const crowbar = tiles.find((t) => t.id === 'crowbar');
    expect(crowbar.quantity).toBe(1);
  });

  it('every pack round-trips to its stated total weight', () => {
    for (const pack of packs) {
      expect(totalWeight(expandPackToTemplates(pack))).toBe(pack.totalWeight);
    }
  });

  it('handles empty / malformed input without throwing', () => {
    expect(expandPackToTemplates(null)).toEqual([]);
    expect(expandPackToTemplates({})).toEqual([]);
  });
});
