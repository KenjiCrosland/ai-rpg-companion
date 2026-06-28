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

  it('folds quantity into a single tile: name gets ×N and weight stacks', () => {
    const tiles = expandPackToTemplates(burglars);
    const pitons = tiles.find((t) => t.id === 'piton');
    expect(pitons.name).toBe('Piton (×10)'); // 10 pitons, 0.25 lb each
    expect(pitons.weight).toBe(2.5);
  });

  it('leaves single-quantity items un-suffixed', () => {
    const tiles = expandPackToTemplates(burglars);
    const crowbar = tiles.find((t) => t.id === 'crowbar');
    expect(crowbar.name).toBe('Crowbar'); // no "(×1)"
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
