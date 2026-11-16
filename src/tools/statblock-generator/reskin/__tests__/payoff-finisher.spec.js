/**
 * THE PAYOFF GETS A CLAUSE OF ITS OWN TO WRITE.
 *
 * Owner, 2026-10-27: *"I still get the feeling that our pipeline is not shipping
 * unique abilities that are interesting. the llm should be able to be flexible
 * with a row shape and things are looking too samey."*
 *
 * Measured, and the sameness was not where it looked. Within one ten there is no
 * repetition at all (16 signature rows, 16 distinct text skeletons). Across every
 * saved run, most templates read many ways — `hook-drag` has 223 distinct
 * sentences in 239 rows, `heated-body` 294 in 507. ONE template was the outlier,
 * and it is the row the owner cares most about:
 *
 *   condition-payoff: 169 rows, 147 distinct NAMES, FOUR distinct SENTENCES.
 *
 * Its six frames had no open slot but a save stat, a condition, a damage type and
 * numbers — all engine-owned — so there was nothing for the call to vary. Every
 * payoff read "<Stat> Saving Throw: DC N, one creature within 30 feet that has
 * the X condition. Failure: N damage." under a bespoke name.
 *
 * `{finisher}` is one predicate the call writes: HOW the creature falls on a
 * target already caught. Short, no digits, no rules grammar — the same contract
 * every flavour slot has — so the call gains the sentence's character without
 * ever writing a rule.
 */
import { TEMPLATE_BY_ID, renderTemplate, buildFitPrompt, FLAVOR_SLOTS } from '@/tools/statblock-generator/reskin/templates.mjs';
import { scaleDonor, pickDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const ctx = (cr = 17) => ({ scaled: scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] }), archetype: 'brute', cr, imposed: ['Frightened'], name: 'Brass Tyrant', inline: 'the tyrant', energy: 'Fire', mix: null, concept: 'a brass tyrant whose hammer finds the terrified', size: 'Large' });
const render = (fills, cr = 17) => renderTemplate(TEMPLATE_BY_ID.get('condition-payoff'), ctx(cr), { consumed_condition: 'Frightened', save_stat: 'Dexterity', ...fills })?.text ?? '';

describe('the slot is declared everywhere it has to be', () => {
  test('it is a FLAVOR slot, so it is validated as flavour and never as rules', () => {
    expect(FLAVOR_SLOTS).toContain('finisher');
  });

  test('every band opens with it — a slot on one frame would leave the others samey', () => {
    const t = TEMPLATE_BY_ID.get('condition-payoff');
    for (const [band, f] of Object.entries(t.frames)) expect(String(f)).toMatch(/\{finisher\}/);
    expect(Object.keys(t.frames)).toHaveLength(6);
  });

  test('the fit prompt both shows the token AND explains it', () => {
    const p = buildFitPrompt({ menu: [TEMPLATE_BY_ID.get('condition-payoff')], cr: 17, concept: 'a brass tyrant', idea: { idea: 'the hammer finds the terrified', section: 'action', trigger: 'save', effect: 'damage' }, sheetSoFar: '- [Actions] Hammer', name: 'Tyrant', seat: 'action' });
    expect(p).toMatch(/\{finisher\}/);
    expect(p).toMatch(/a PREDICATE naming HOW the creature falls/); // a token with no contract fills blind every time
  });
});

describe('the call\'s clause is what varies the sentence', () => {
  test('two payoffs with different finishers no longer read alike', () => {
    const a = render({ finisher: 'brings the hammer down two-handed' });
    const b = render({ finisher: 'tightens the coils' });
    expect(a).toMatch(/brings the hammer down two-handed/);
    expect(b).toMatch(/tightens the coils/);
    expect(a).not.toBe(b);
  });

  test('a silent call still ships a readable row', () => {
    expect(render({})).toMatch(/strikes where the target cannot guard/);
    expect(render({})).not.toMatch(/\{finisher\}/);
  });

  test('the rules half of the sentence is untouched — the engine still owns it', () => {
    const t = render({ finisher: 'drives a knee into the ribs' });
    // the payoff REWARDS the condition instead of requiring it (owner's redesign,
    // 2026-11-05): the target clause is now bare and the condition moved into the step
    expect(t).toMatch(/Dexterity Saving Throw.*DC \d+, one creature within \d+ feet\./);
    expect(t).toMatch(/If the target already has the Frightened condition/);
    expect(t).toMatch(/\d+ \(\d+d\d+\) Fire damage/);
  });

  test('a fill that reaches for rules grammar is refused', () => {
    // `shortFlavor` rejects "saving throw|damage|condition|DC" and digits
    for (const bad of ['deals 20 damage to the target', 'forces a Constitution saving throw', 'inflicts the Prone condition']) {
      expect(render({ finisher: bad })).toMatch(/strikes where the target cannot guard/);
    }
  });

  test('it cannot be the creature itself', () => {
    expect(render({ finisher: 'the tyrant' })).toMatch(/strikes where the target cannot guard/);
  });
});
