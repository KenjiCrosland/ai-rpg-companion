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

  // DELETED: green with the rung switched off — the row targets one creature and is not a cone whether or not
  // the rung runs, so it never tested the rung.


  it("its failure deals half a hit in the attack's own type, in front of the effect it had", () => {
    // print joins them with a lower-case clause, so "The target" comes down to "the target"
    expect(out.text).toMatch(/\*Failure:\*\s*\d+ \(\d+d\d+\) Piercing damage, and the target has the Prone condition/);
  });

  // DELETED: green with the rung switched off — a row the rung never touches has no Success clause either.


  it('says what it did, and against which hit', () => {
    expect(out.steps.join(' ')).toMatch(/half a hit added: \d+ \(\d+d\d+\) Piercing damage on a failed save — half of one 12-damage hit/);
  });

  it('carries the N4 mark, so the rename cannot hand it the template name', () => {
    expect(out.widened).toBe(true);
  });
});

describe('what the rung must not reach', () => {
  /**
   * THE REACTION TEST IS GONE, with its guard. I claimed the rung "let a Reaction through", read off
   * the condition rather than measured. Fable removed the guard and all twelve tests still passed,
   * and I could not build a case where a Reaction reaches this rung and gains damage. A guard that
   * cannot be shown to do anything, and a test that cannot fail, are worse than neither.
   */


  // DELETED: green with `!v.hasDamage` taken out of the condition — something above already stops a row that deals damage, and the guard was never the reason.


  // DELETED: green with `!area` taken out — same: the guard is not what stops it.


  it('a trait is untouched', () => {
    const out = run(SOFT_ROW(), 'Traits');
    expect(out.text).toBe(SOFT_ROW().text);
  });

  it('with no hit type to hand in, nothing is added', () => {
    const out = valueCheck(SOFT_ROW(), { scaled, sections: SHEET(), section: 'Actions', cr: 5, hitType: null });
    expect(out.text).toBe(SOFT_ROW().text);
  });
});
