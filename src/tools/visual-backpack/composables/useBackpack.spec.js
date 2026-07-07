/**
 * Behavior tests for the add/stack logic in useBackpack — specifically that a bag
 * of holding is a UNIQUE container (never merges into a counted stack), while
 * ordinary gear still stacks by id. Each bag needs its own instance so it can hold
 * its own contents (its own BagPanel) — and so a second bag exists to trigger the
 * Astral-rift Easter egg.
 */
import { useBackpack } from './useBackpack.js';

const bagTemplate = {
  id: 'mi-bag-of-holding',
  name: 'Bag of Holding',
  category: 'Magic Item',
  magicType: 'Wondrous Items',
  weight: 15,
};
const daggerTemplate = { id: 'dagger', name: 'Dagger', category: 'Weapon', weight: 1 };

beforeEach(() => localStorage.clear());

describe('useBackpack — bags of holding never stack', () => {
  it('adds a second bag as a DISTINCT instance, not a +1 stack', () => {
    const bp = useBackpack();
    bp.addItem(bagTemplate);
    bp.addItem(bagTemplate);

    const bagInstances = bp.items.value.filter((i) => i.id === 'mi-bag-of-holding');
    expect(bagInstances).toHaveLength(2);
    expect(bagInstances.every((b) => (b.quantity || 1) === 1)).toBe(true);
    // Two distinct instance ids → each renders its own BagPanel.
    expect(new Set(bagInstances.map((b) => b.instanceId)).size).toBe(2);
    // The bags computed sees two independent containers.
    expect(bp.bags.value).toHaveLength(2);
  });

  it('still stacks ordinary gear by id (a bag is the exception, not the rule)', () => {
    const bp = useBackpack();
    bp.addItem(daggerTemplate);
    bp.addItem(daggerTemplate);

    const daggers = bp.items.value.filter((i) => i.id === 'dagger');
    expect(daggers).toHaveLength(1);
    expect(daggers[0].quantity).toBe(2);
  });
});

describe('useBackpack — custom Treasure carries a gp value', () => {
  it('keeps the value on a custom Treasure template and its packed item', () => {
    const bp = useBackpack();
    const tpl = bp.addCustomItem({ name: 'Ruby', weight: 0, category: 'Treasure', valueGp: 250 });
    expect(tpl.valueGp).toBe(250);
    bp.addItem(tpl);

    const packed = bp.items.value.find((i) => i.name === 'Ruby');
    expect(packed.category).toBe('Treasure');
    expect(packed.valueGp).toBe(250);
    // It feeds the purse's Treasure subtotal.
    expect(bp.treasureValue.value).toBe(250);
  });

  it('ignores a value on non-Treasure custom items (worth is a treasure-only field)', () => {
    const bp = useBackpack();
    const tpl = bp.addCustomItem({ name: 'Odd trinket', weight: 1, category: 'Misc', valueGp: 999 });
    expect(tpl.valueGp).toBe(0);
    bp.addItem(tpl);
    expect(bp.treasureValue.value).toBe(0);
  });
});

describe('useBackpack — encumbrance variant is a global, toggleable ruleset', () => {
  const heavyRock = { id: 'rock', name: 'Rock', category: 'Misc', weight: 60 };

  it('defaults to variant on, and toggling it flips the live status tier', () => {
    const bp = useBackpack();
    bp.setStrength(10); // cap 150; encumbered above 50
    bp.addItem(heavyRock); // 60 lb → encumbered under variant

    expect(bp.encumbranceVariant.value).toBe(true);
    expect(bp.status.value.tier).toBe('encumbered');

    bp.toggleEncumbranceVariant(false); // standard: only the hard cap matters
    expect(bp.encumbranceVariant.value).toBe(false);
    expect(bp.status.value.tier).toBe('ok');
  });

  it('is tool-wide, not per-character (the setting survives switching characters)', () => {
    const bp = useBackpack();
    bp.toggleEncumbranceVariant(false);
    const other = bp.addCharacter('Second'); // switches to the new character
    expect(bp.encumbranceVariant.value).toBe(false);
    bp.selectCharacter(other.id);
    expect(bp.encumbranceVariant.value).toBe(false);
  });
});
