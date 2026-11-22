/**
 * THE ENGINE'S CHOICE — which sheets take a ribbon, and which three families they are offered.
 *
 * Asserted on return values, never on prompt text. The paths below are the real ones on the forty,
 * read from baseline-2026-11-20: exact (3), twist (13), homebrew (15), class_npc (8), blank (1).
 */
import { sheetTakesARibbon, ribbonFamiliesOffered, shedsSuits, familyKeys, RIBBONS_OFFERED,
  RIBBON_FAMILIES } from '../ribbon.mjs';

describe('which sheets take a ribbon', () => {
  it('a printed creature typed by name alone does not, and the reason says why', () => {
    const v = sheetTakesARibbon({ path: 'exact', twist: false });
    expect(v.yes).toBe(false);
    expect(v.because).toBe('a printed creature typed by name alone takes no ribbon');
  });

  it('a printed creature with a twist does', () => {
    expect(sheetTakesARibbon({ path: 'twist', twist: true }).yes).toBe(true);
    // and defensively, an exact routing that still carries a twist clause
    expect(sheetTakesARibbon({ path: 'exact', twist: true }).yes).toBe(true);
  });

  it.each([['homebrew'], ['class_npc']])("a creature of the GM's own does (%s)", (path) => {
    expect(sheetTakesARibbon({ path, twist: true }).yes).toBe(true);
    expect(sheetTakesARibbon({ path, twist: false }).yes).toBe(true); // however little was typed
  });

  it('the blank form does, and the reason records that this is a call to reverse', () => {
    const v = sheetTakesARibbon({ path: 'blank' });
    expect(v.yes).toBe(true);
    expect(v.because).toMatch(/invents the whole creature/);
  });

  it('an unknown path takes one rather than losing it', () => {
    expect(sheetTakesARibbon({}).yes).toBe(true);
  });

  // The three on the forty, by name, so a change to the predicate shows up as these three.
  it('on the forty, exactly s19, s21 and s22 are refused a ribbon', () => {
    const forty = [
      ['19 Ancient Gold Dragon', 'exact', false], ['21 Owlbear', 'exact', false],
      ['22 Goblin Boss', 'exact', false], ['01 Dire Wolf', 'twist', true],
      ['02 Bog Hound', 'homebrew', true], ['23 Vashka', 'class_npc', true],
      ['36 blank', 'blank', false], ['35 Well Drowned', 'homebrew', false],
    ];
    const refused = forty.filter(([, path, twist]) => !sheetTakesARibbon({ path, twist }).yes).map(([n]) => n);
    expect(refused).toEqual(['19 Ancient Gold Dragon', '21 Owlbear', '22 Goblin Boss']);
  });
});

describe('which three families a sheet is offered', () => {
  it('offers three', () => {
    expect(ribbonFamiliesOffered('a frost-rimed dire wolf', { size: 'Large' })).toHaveLength(RIBBONS_OFFERED);
  });

  it.each([['Tiny'], ['Small'], ['Medium']])('sheds is never offered to a %s creature', (size) => {
    expect(shedsSuits(size)).toBe(false);
    for (let i = 0; i < 400; i += 1) {
      expect(ribbonFamiliesOffered(`creature number ${i}`, { size })).not.toContain('sheds');
    }
  });

  it.each([['Large'], ['Huge'], ['Gargantuan']])('sheds is offered to a %s creature sometimes', (size) => {
    expect(shedsSuits(size)).toBe(true);
    const seen = Array.from({ length: 400 }, (_, i) => ribbonFamiliesOffered(`creature number ${i}`, { size }))
      .some((three) => three.includes('sheds'));
    expect(seen).toBe(true);
  });

  it('still offers three of the five when only five are eligible', () => {
    const three = ribbonFamiliesOffered('a goblin with a grudge', { size: 'Small' });
    expect(three).toHaveLength(3);
    expect(new Set(three).size).toBe(3);
    for (const k of three) expect(familyKeys()).toContain(k);
  });

  it('the same input is offered the same three', () => {
    for (const text of ['the thing in the well', 'Dire Wolf — with a frost-rimed hide', '']) {
      expect(ribbonFamiliesOffered(text, { size: 'Large' })).toEqual(ribbonFamiliesOffered(text, { size: 'Large' }));
    }
  });

  it('different inputs are generally offered different threes', () => {
    const seen = new Set(Array.from({ length: 200 }, (_, i) => ribbonFamiliesOffered(`concept ${i}`, { size: 'Large' }).join(',')));
    expect(seen.size).toBeGreaterThan(10);
  });

  it('over many inputs each family is offered within a fair margin of the others', () => {
    const N = 3000;
    const count = Object.fromEntries(familyKeys().map((k) => [k, 0]));
    for (let i = 0; i < N; i += 1) {
      for (const k of ribbonFamiliesOffered(`a creature of some kind, number ${i}`, { size: 'Huge' })) count[k] += 1;
    }
    // three of six, so each family should be offered about half the time
    const expected = (N * RIBBONS_OFFERED) / RIBBON_FAMILIES.length;
    for (const [family, n] of Object.entries(count)) {
      expect({ family, share: n / N }).toEqual({ family, share: expect.any(Number) });
      expect(n).toBeGreaterThan(expected * 0.9);
      expect(n).toBeLessThan(expected * 1.1);
    }
  });

  it('never offers the same family twice in one three', () => {
    for (let i = 0; i < 500; i += 1) {
      const three = ribbonFamiliesOffered(`creature ${i}`, { size: 'Large' });
      expect(new Set(three).size).toBe(three.length);
    }
  });
});
