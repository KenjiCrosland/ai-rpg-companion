/**
 * THE MODEL'S save_stat PICK IS CONSULTED. It used to be overwritten with zero
 * reads of the model's answer, so the VOCAB enum it chose from was decorative.
 * Now the pick stands unless it contradicts the two cases print is decisive
 * about — a shove is Strength (5 rows to 2); a damage-dominant row is never
 * Wisdom — and every override carries its reason on the row.
 */
import { TEMPLATES, renderTemplate } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const cr = 11;
const ctx = () => ({ scaled: scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] }), archetype: 'brute', cr, imposed: [], name: 'H', energy: 'Fire', mix: 'both', meleeName: 'Slam' });
const stat = (r) => /\b(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw/.exec(r?.text ?? '')?.[1];
const burst = () => TEMPLATES.find((t) => t.id === 'ground-burst');

describe('save_stat: the model picks, the engine validates', () => {
  it('keeps Constitution on an area-plus-damage row (a breath is print-legal)', () => {
    const r = renderTemplate(burst(), ctx(), { save_stat: 'Constitution' });
    expect(stat(r)).toBe('Constitution'); expect(r.saveOverride).toBeUndefined();
  });

  it('keeps Dexterity on an area-plus-damage row', () => {
    expect(stat(renderTemplate(burst(), ctx(), { save_stat: 'Dexterity' }))).toBe('Dexterity');
  });

  it('overrides Wisdom on a damage-dominant row, to Dexterity, and says why', () => {
    const r = renderTemplate(burst(), ctx(), { save_stat: 'Wisdom' });
    expect(stat(r)).toBe('Dexterity');
    expect(r.saveOverride).toMatch(/never Wisdom/);
  });

  it('with no pick, a damage-dominant row defaults to Dexterity with no override recorded', () => {
    const r = renderTemplate(burst(), ctx(), {});
    expect(stat(r)).toBe('Dexterity'); expect(r.saveOverride).toBeUndefined();
  });

  it('a pick outside the enum is ignored, not trusted', () => {
    expect(stat(renderTemplate(burst(), ctx(), { save_stat: 'Luck' }))).toBe('Dexterity');
  });

  it('the guidance the model reads carries print\'s counts', () => {
    const src = require('fs').readFileSync(require.resolve('@/tools/statblock-generator/reskin/templates.mjs'), 'utf8');
    expect(src).toMatch(/save_stat: 'by what the row DOES/);
    expect(src).toMatch(/Dexterity \(46 rows\)/);
  });
});
