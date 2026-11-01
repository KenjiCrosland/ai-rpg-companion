/**
 * ONE DEFINITION OF "IS DAMAGE OVER AN AREA THE POINT OF THIS ROW".
 *
 * The engine's save-stat pass and the checker's save-fit gate each carried a
 * copy, and both feed `saveStatsFor` — which decides whether Strength and Wisdom
 * are allowed on the row. The forty of 2026-10-27 found the drift: the engine's
 * copy had been updated for the owner's GM read and the gate's had not, so the
 * gate failed the Brass Tyrant for obeying the ruling.
 *
 * `areaDamage` now owns it, declared-first like every reader in author.mjs: the
 * shape stamps the geometry it chose, and prose answers for print, donor and
 * chassis rows, which are about 9 in 10 of a finished sheet and carry no stamp.
 */
import { areaDamage } from '@/tools/statblock-generator/reskin/author.mjs';
import { TEMPLATE_BY_ID, renderTemplate } from '@/tools/statblock-generator/reskin/templates.mjs';
import { scaleDonor, pickDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const PROSE = (t) => /each creature|Cone|Sphere|Line|Emanation|radius/i.test(t) && /\d+ \(\d+d\d+/.test(t);

describe('the one reader answers as the two copies did', () => {
  const cases = [
    ['*Constitution Saving Throw:* DC 19, each creature in a 30-foot Cone. *Failure:* 72 (16d8) Fire damage.', true],
    ['*Dexterity Saving Throw:* DC 17, each creature in a 15-foot Emanation. *Failure:* 21 (6d6) Cold damage.', true],
    ['*Wisdom Saving Throw:* DC 14, one creature within 60 feet. *Failure:* The target has the Frightened condition.', false],
    ['*Dexterity Saving Throw:* DC 19, one creature within 60 feet that has the Prone condition. *Failure:* 42 (12d6) Fire damage.', false],
    ['*Melee Attack Roll:* +12, reach 10 ft. 33 (6d8 + 6) Bludgeoning damage.', false],
    ['Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 71 (13d10) cold damage.', true], // the 2014 wording
    ['*Constitution Saving Throw:* DC 15, each creature in a 20-foot Cone. *Failure:* The target has the Poisoned condition.', false], // an area with no dice is not damage-dominant
  ];
  for (const [text, want] of cases) {
    test(`${want ? 'area damage' : 'not area damage'}: ${text.slice(0, 54)}…`, () => {
      expect(areaDamage({ text })).toBe(want);
      expect(PROSE(text)).toBe(want); // and the retired copies agreed
    });
  }

  test('it reads a 2014 row, which stores its text as `description`', () => {
    expect(areaDamage({ description: 'Each creature in a 30-foot cone must make a DC 17 save, taking 71 (13d10) cold damage.' })).toBe(true);
  });
});

describe('the declared geometry wins over the sentence', () => {
  test('a shape stamps the area it chose, and the reader uses it', () => {
    const ctx = { scaled: scaleDonor(pickDonor(13, null, 'brute'), 13, { mechanics: [] }), archetype: 'brute', cr: 13, imposed: [], name: 'Thing', energy: 'Fire', mix: null, concept: 'a thing that breathes fire', size: 'Large' };
    const r = renderTemplate(TEMPLATE_BY_ID.get('spew'), ctx, { area_shape: 'Cone' });
    // the field carries the GEOMETRY, not a bare boolean (2026-11-01): it read
    // `AREA_SHAPES.includes(pick)` — Cone and Line only — so an Emanation declared
    // `false`, and the record was never carried to the row so nothing caught it
    expect(r.area).toEqual({ shape: 'Cone', size: expect.any(Number) });
    expect(r.area.size).toBeGreaterThan(0);
    expect(areaDamage(r)).toBe(true);   // still truthy for the one reader
  });

  test('a declared false beats prose that looks like an area', () => {
    // the field is the authority: a row the engine shaped as single-target is not
    // re-judged by words that happen to appear in its sentence
    expect(areaDamage({ area: false, text: 'It drags each creature in a Line. 21 (6d6) damage.' })).toBe(false);
  });

  test('no dice means no damage-dominance, declared or not', () => {
    expect(areaDamage({ area: true, text: 'Each creature in a 30-foot Cone has the Poisoned condition.' })).toBe(false);
  });
});
