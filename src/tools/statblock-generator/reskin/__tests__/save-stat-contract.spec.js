/**
 * THE MODEL'S save_stat PICK IS CONSULTED. It used to be overwritten with zero
 * reads of the model's answer, so the VOCAB enum it chose from was decorative.
 * Now the pick stands unless print is decisive against it, and every override
 * carries its reason on the row.
 *
 * What the gate reads is DECLARED (owner's audit, 2026-10-25): the condition the
 * row IMPOSES comes from `imposedConditions`, and the mapping from condition to
 * stat is one shared closed-fact table, `saveStatsFor`. The prose ladder this
 * replaced carried the bug the last case here guards.
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

  // THE BUG THE AUDIT FOUND, inside the gate built to stop it. `execute`'s CR 0-2
  // frame targets "one Frightened creature" — a condition it REQUIRES of its
  // target, not one it imposes — and the deleted prose ladder read the bare word
  // and answered Wisdom on a row whose point is damage. That is bar 1's own
  // failure. `imposedConditions` reads print's "has the X condition" grammar, so
  // a targeting clause cannot be mistaken for an imposition.
  it('a condition the row REQUIRES of its target never picks the stat', () => {
    const ex = TEMPLATES.find((t) => t.id === 'execute');
    const low = { ...ctx(), cr: 2, scaled: scaleDonor(pickDonor(2, null, 'brute'), 2, { mechanics: [] }) };
    const r = renderTemplate(ex, low, {});
    expect(r.text).toMatch(/Frightened creature/);      // the requirement is still in the row
    expect(stat(r)).not.toBe('Wisdom');                  // but it did not pick the stat
  });

  it('a damage-dominant row overrides a Wisdom pick whatever rider it carries', () => {
    const r = renderTemplate(burst(), ctx(), { save_stat: 'Wisdom' });
    expect(stat(r)).not.toBe('Wisdom');
    expect(r.saveOverride).toMatch(/never Wisdom|damage is the row/);
  });

  it('the guidance the model reads carries print\'s counts', () => {
    const src = require('fs').readFileSync(require.resolve('@/tools/statblock-generator/reskin/templates.mjs'), 'utf8');
    expect(src).toMatch(/save_stat: 'by what the row DOES/);
    expect(src).toMatch(/Dexterity \(46 rows\)/);
  });
});
