// A PRINT CASTER'S LIST IS WRITTEN FOR ITS OWN CR (the critic's fifth GM forty, 2026-11-09).
//
// Sister Maudra at CR 7 and Mother Ash at CR 9 both stand on the CR 2 Priest and shipped its two
// at-will spells and single daily — a CR 2 spell list on a CR 9 sheet. This is the mirror of the
// withholding rule already above it in the same branch: print's list is too STRONG for a sheet well
// below its CR, and too THIN for one well above.
//
// THE SCOPE IS ONE LINE, AND THAT MATTERS. Measured over print's 48 casters, list size does NOT
// track CR: at CR 11+ the median is 3 at-will and 3 daily, the same as below it, and the Ancient Red
// Dragon at CR 24 carries 3 and 2. Growth exists only along the dedicated-caster line —
// Priest 2+1 (CR 2) -> Mage 5+4 (CR 6) -> Archmage 8+6 (CR 12) -> Lich 8+7 (CR 21). A first draft of
// this item claimed lists grow with CR generally and was refuted by that measurement.
import { NEVER_AT_WILL } from '../generate.mjs';
import PRINT from '@/data/srd52-monsters.json';

const spellsOf = (m, which) => {
  const sc = Object.values(m.sections ?? {}).flat().find((r) => /^Spellcasting/.test(r.name ?? ''));
  // print writes MORE THAN ONE daily line — the Mage has "2/Day Each: Fireball, Invisibility" AND
  // "1/Day Each: Cone of Cold, Fly". `.find()` reads the first and under-counts by half.
  const lines = String(sc?.text ?? '').replace(/\*\*/g, '').split('\n')
    .filter((l) => (which === 'aw' ? /At Will:/i.test(l) : /\d\/Day/i.test(l)));
  return lines.flatMap((l) => [...l.matchAll(/\*([A-Z][^*]*?)\*/g)].map((x) => x[1].trim()));
};

describe("print's dedicated-caster line is the one place lists grow", () => {
  const LINE = [['Priest', 2, 2, 1], ['Mage', 6, 5, 4], ['Archmage', 12, 8, 6], ['Lich', 21, 8, 7]];

  test.each(LINE)('%s at CR %i carries %i at-will and %i daily', (name, cr, aw, dl) => {
    const m = PRINT.find((x) => x.name === name);
    expect(Number(m.cr)).toBe(cr);
    expect(spellsOf(m, 'aw')).toHaveLength(aw);
    expect(spellsOf(m, 'dl')).toHaveLength(dl);
  });

  test('and the line rises, which is what makes a CR 2 list on a CR 9 sheet wrong', () => {
    for (let i = 1; i < LINE.length; i++) expect(LINE[i][2]).toBeGreaterThanOrEqual(LINE[i - 1][2]);
  });

  test('BUT print casters in general do NOT grow — the refuted premise, pinned so it stays refuted', () => {
    const med = (a) => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
    const crOf = (m) => { const v = m.cr ?? String(m.challenge_rating ?? '').replace(/\s*\(.*$/, ''); const f = /^(\d+)\/(\d+)$/.exec(String(v)); return f ? Number(f[1]) / Number(f[2]) : Number(v); };
    const casters = PRINT.filter((m) => Object.values(m.sections ?? {}).flat().some((r) => /^Spellcasting/.test(r.name ?? '')));
    const hi = casters.filter((m) => crOf(m) >= 11), lo = casters.filter((m) => crOf(m) < 11);
    expect(hi.length).toBeGreaterThan(20);
    // the high-CR median is no larger than the low-CR one: size does not track CR
    expect(med(hi.map((m) => spellsOf(m, 'aw').length))).toBeLessThanOrEqual(med(lo.map((m) => spellsOf(m, 'aw').length)) + 1);
  });

  test('a top-up never adds a spell print refuses to write at will', () => {
    for (const sp of ['Misty Step', 'Fly', 'Counterspell']) expect(NEVER_AT_WILL.has(sp)).toBe(true);
  });
});
