import { estimateMagicValue, magicPriceCategory, RARITY_BASE_GP, CONSUMABLE_BASE_GP, TYPE_MULT } from './magic-item-value.mjs';

const mi = (over) => ({ category: 'Magic Item', ...over });

describe('magic-item-value — price-calculator-aligned estimate', () => {
  it('prices a permanent item at its rarity base', () => {
    expect(estimateMagicValue(mi({ name: 'Cloak of Elvenkind', magicType: 'Wondrous Items', rarity: 'Uncommon' })))
      .toBe(RARITY_BASE_GP.Uncommon);
  });

  it('prices consumables from their own table (Very Rare potion ≈ a Rare permanent)', () => {
    const potion = estimateMagicValue(mi({ name: 'Potion of Storm Giant Strength', magicType: 'Potion', rarity: 'Very Rare' }));
    expect(potion).toBe(CONSUMABLE_BASE_GP['Very Rare']);
    // The consumable table is "a permanent one tier lower": Very Rare potion == Rare item.
    expect(potion).toBe(RARITY_BASE_GP.Rare);
    // Sanity: far below a permanent Very Rare item, so it can't dominate a split.
    expect(potion).toBeLessThan(estimateMagicValue(mi({ magicType: 'Wondrous Items', rarity: 'Very Rare' })));
  });

  it('marks up armor/shields (×1.5)', () => {
    expect(estimateMagicValue(mi({ name: 'Plate of Etherealness', magicType: 'Armor', rarity: 'Rare' })))
      .toBe(RARITY_BASE_GP.Rare * TYPE_MULT.armor);
  });

  it('detects consumables by name when magicType is missing (custom items)', () => {
    expect(magicPriceCategory(mi({ name: 'Oil of Sharpness' }))).toBe('consumable');
    expect(magicPriceCategory(mi({ name: 'Scroll of Fireball' }))).toBe('consumable');
    expect(magicPriceCategory(mi({ name: 'Boots of Speed', magicType: 'Wondrous Items' }))).toBe('permanent');
  });

  it('estimates 0 for unknown/absent rarity (non-SRD / custom)', () => {
    expect(estimateMagicValue(mi({ name: 'Homebrew Blade' }))).toBe(0);
    expect(estimateMagicValue(mi({ name: 'Whatsit', rarity: 'Mythic' }))).toBe(0);
  });
});
