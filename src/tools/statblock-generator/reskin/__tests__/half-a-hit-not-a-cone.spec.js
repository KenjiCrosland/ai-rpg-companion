/**
 * A ONE-CREATURE ROW STAYS ON ONE CREATURE AND GAINS HALF A HIT (owner, 2026-11-24).
 *
 * His words: "one creature half a hit of damage over a cone". The intent of 28 October stands — a
 * soft row is lifted rather than dropped — but widening was the wrong lift. All four rows the rung
 * widened on the forty were written against one creature within 5 feet and all four shipped as
 * cones, and their names were written for one target: Muck-Lunge, Scree Snare, Iron Advance, "The
 * Last Note Is For You". He marked the Bog Hound twice.
 *
 * Verified red with the change taken out: restoring the cone rewrite turns the first test red.
 */
import { valueCheck, attackDamageTypeOf } from '../templates.mjs';

const SHEET = () => ({
  Actions: [
    { name: 'Multiattack', text: 'The hound makes two Bite attacks.' },
    { name: 'Bite', text: '*Melee Attack Roll:* +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 3 (1d6) Cold damage.' },
  ],
});
const SOFT_ROW = (over = {}) => ({
  name: 'Muck-Lunge',
  text: '*Strength Saving Throw*: DC 13, one creature within 5 feet. *Failure:* The target has the Prone condition.',
  ...over,
});
const scaled = { per_hit: 12, dc: 13, style: null };
const run = (row, section = 'Actions') => valueCheck(row, {
  scaled, sections: SHEET(), section, cr: 5, hitType: attackDamageTypeOf(SHEET()),
});

describe('the attack type is read at the call site and handed in', () => {
  it("takes the first attack row's first damage type", () => {
    expect(attackDamageTypeOf(SHEET())).toBe('Piercing');
  });

  it('is null when nothing on the sheet rolls an attack', () => {
    expect(attackDamageTypeOf({ Traits: [{ name: 'A Trait', text: 'It is large.' }] })).toBeNull();
  });
});

describe('a soft one-creature row', () => {
  let out;
  beforeAll(() => { out = run(SOFT_ROW()); });

  it('still targets one creature, and is not a cone', () => {
    expect(out.text).toMatch(/one creature within 5 feet/);
    expect(out.text).not.toMatch(/Cone/i);
  });

  it("its failure deals half a hit in the attack's own type, in front of the effect it had", () => {
    // print joins them with a lower-case clause, so "The target" comes down to "the target"
    expect(out.text).toMatch(/\*Failure:\*\s*\d+ \(\d+d\d+\) Piercing damage, and the target has the Prone condition/);
  });

  it('adds no Success clause', () => {
    expect(out.text).not.toMatch(/\*Success:\*/);
  });

  it('says what it did, and against which hit', () => {
    expect(out.steps.join(' ')).toMatch(/half a hit added: \d+ \(\d+d\d+\) Piercing damage on a failed save — half of one 12-damage hit/);
  });

  it('carries the N4 mark, so the rename cannot hand it the template name', () => {
    expect(out.widened).toBe(true);
  });
});

describe('what the rung must not reach', () => {
  it('a Reaction gains no damage — his ruling stands', () => {
    const out = run(SOFT_ROW(), 'Reactions');
    expect(out.text).not.toMatch(/Piercing damage, and/);
    expect(out.text).toBe(SOFT_ROW().text);
  });

  it('a row that already deals damage is left to the dice rungs', () => {
    const out = run(SOFT_ROW({ text: '*Strength Saving Throw*: DC 13, one creature within 5 feet. *Failure:* 7 (2d6) Cold damage, and the target has the Prone condition.' }));
    expect(out.text).not.toMatch(/Piercing damage, and \d+ \(/);
  });

  it('a row that is already an area is untouched', () => {
    const out = run(SOFT_ROW({ text: '*Strength Saving Throw*: DC 13, each creature in a 15-foot Cone. *Failure:* The target has the Prone condition.' }));
    expect(out.text).not.toMatch(/Piercing damage/);
  });

  it('a trait is untouched', () => {
    const out = run(SOFT_ROW(), 'Traits');
    expect(out.text).toBe(SOFT_ROW().text);
  });

  it('with no hit type to hand in, nothing is added', () => {
    const out = valueCheck(SOFT_ROW(), { scaled, sections: SHEET(), section: 'Actions', cr: 5, hitType: null });
    expect(out.text).toBe(SOFT_ROW().text);
  });
});
