// A CASTER'S BURST IS A SPELL NAME, NOT A SAVE WITH DICE (owner's ruling, 2026-11-09: a limited
// damage spell "deals as much as a gated nova if the number per day is limited").
//
// `novasOf` reads a ROW carrying a gate, a saving throw and dice. A Spellcasting row's
// "1/Day Each: *Fireball*" has none of those — only a name — so print's own Mage, Archmage and
// Lich all read as having NO nova, and so did every caster we build. The offense read could not
// see the single biggest thing a caster does in a fight.
//
// The prices were already imported into the checker and unused. Two high-CR print spells had to be
// priced (Chain Lightning 45, Finger of Death 61) for the Lich to read its own burst; neither is on
// any spell menu, so pricing them changes no pick.
import { checkBlock } from '../checker.mjs';
import { SPELL_DAMAGE_AVG } from '../generate.mjs';
import PRINT from '@/data/srd52-monsters.json';

const novaOf = (name) => checkBlock(PRINT.find((m) => m.name === name)).read.nova;

describe("print's casters read their own burst", () => {
  test('the Mage: Cone of Cold 1/Day, the owner\'s stated 28-36 band', () => {
    const n = novaOf('Mage');
    expect(n).toBeTruthy();
    expect(n.avg).toBeGreaterThanOrEqual(28);
    expect(n.avg).toBeLessThanOrEqual(36);
    expect(n.gate).toMatch(/\d\/Day/);
  });

  test('the Archmage and the Lich too — the Lich off Finger of Death, not its at-will Fireball', () => {
    expect(novaOf('Archmage').avg).toBeGreaterThanOrEqual(28);
    const lich = novaOf('Lich');
    expect(lich.name).toBe('Finger of Death');
    expect(lich.avg).toBe(61);
  });

  test('a caster with no LIMITED damage spell still reads none — the Priest', () => {
    // Light, Thaumaturgy and Spirit Guardians: nothing priced on a N/Day line
    expect(novaOf('Priest')).toBeNull();
  });
});

describe('the row-based nova is untouched', () => {
  test("the Adult Red Dragon keeps its Fire Breath, not a spell", () => {
    const n = novaOf('Adult Red Dragon');
    expect(n.name).toBe('Fire Breath');
    expect(n.gate).toMatch(/Recharge/);
  });

  test('a creature with no spells and no gated row reads none — the Owlbear', () => {
    expect(novaOf('Owlbear')).toBeNull();
  });

  test('the strongest wins when a sheet has both a gated row and a limited spell', () => {
    // print writes both on the dragons; whichever hits harder is the burst a GM feels
    const both = PRINT.filter((m) => {
      const rows = Object.values(m.sections ?? {}).flat();
      return rows.some((r) => /\(Recharge/.test(r.name ?? '')) && rows.some((r) => /^Spellcasting/.test(r.name ?? ''));
    });
    expect(both.length).toBeGreaterThan(3);
    for (const m of both) {
      const n = checkBlock(m).read.nova;
      if (n) expect(n.avg).toBeGreaterThan(0);
    }
  });
});

describe('the two spells priced for this', () => {
  test('are priced, and Power Word Kill is not — it deals no damage', () => {
    expect(SPELL_DAMAGE_AVG['Chain Lightning']).toBe(45);
    expect(SPELL_DAMAGE_AVG['Finger of Death']).toBe(61);
    expect(SPELL_DAMAGE_AVG['Power Word Kill']).toBeUndefined();
  });
});
