/**
 * A DURATION MAY NOT BE LOST IN TRANSLATION.
 *
 * The 2014 conversion is an LLM call that rewrites PHRASING, never content. It
 * kept returning print's Lich row with the duration gone:
 *
 *   2024 (source): "…15 (3d6 + 5) Cold damage, and the target has the Paralyzed
 *                   condition until the start of the lich's next turn."
 *   2014 (shipped): "…15 (3d6 + 5) cold damage, and the target must succeed on a
 *                   DC 19 Constitution saving throw or be paralyzed."
 *
 * Paralyzed with no end is unplayable. The checker has reported exactly this
 * (`conversion-dropped-duration`, measured 1 fire / 0 false positives over 19
 * 2014 sheets) while the gate that can RETRY the call never asked. The call is
 * already retried three times, so refusing the answer is the whole fix.
 */
import { validateConversionResponse } from '@/tools/statblock-generator/format-2024/generate.mjs';
import { MUST_BE_BOUNDED, CONDITION_BOUNDED } from '@/tools/statblock-generator/format-2024/lint.mjs';

const model = (text) => ({ sections: { Actions: [{ name: 'Paralyzing Touch', text }] } });
const answer = (text) => JSON.stringify({ Actions: [{ text }] });
const SRC_BOUNDED = "*Melee Attack Roll:* +12, reach 5 ft. 15 (3d6 + 5) Cold damage, and the target has the Paralyzed condition until the start of the lich's next turn.";

describe('the shared predicates', () => {
  // one definition in lint.mjs; the checker imports it too, so the two cannot drift
  it('names the conditions that may not run open-ended', () => {
    expect(MUST_BE_BOUNDED).toEqual(expect.arrayContaining(['Paralyzed', 'Stunned', 'Petrified', 'Restrained']));
  });

  it('recognises every shape print uses to bound one', () => {
    for (const t of [
      "until the start of the lich's next turn",
      'until the end of its next turn',
      'paralyzed for 1 minute',
      'The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success',
      'until cured',
      '(escape DC 14)',
    ]) expect(CONDITION_BOUNDED.test(t)).toBe(true);
  });

  it('does not see a bound where there is none', () => {
    expect(CONDITION_BOUNDED.test('the target must succeed on a DC 19 Constitution saving throw or be paralyzed.')).toBe(false);
  });
});

describe('the conversion gate', () => {
  it('REFUSES the answer that shipped — the duration was dropped', () => {
    expect(validateConversionResponse(answer('Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed.'), model(SRC_BOUNDED))).toBe(false);
  });

  it("accepts print's own 2014 idiom, which bounds it", () => {
    expect(validateConversionResponse(answer('Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.'), model(SRC_BOUNDED))).toBe(true);
  });

  it('accepts a bound expressed a different way than the source expressed it', () => {
    expect(validateConversionResponse(answer('Hit: 15 (3d6 + 5) cold damage, and the target is paralyzed until the end of its next turn.'), model(SRC_BOUNDED))).toBe(true);
  });

  // the gate must not invent work: an unbounded SOURCE is not the conversion's fault
  it('stays out of the way when the source never bounded it either', () => {
    const src = '*Melee Attack Roll:* +12, reach 5 ft. 15 (3d6 + 5) Cold damage, and the target has the Paralyzed condition.';
    expect(validateConversionResponse(answer('Hit: 15 (3d6 + 5) cold damage, and the target is paralyzed.'), model(src))).toBe(true);
  });

  it('ignores rows with no such condition at all', () => {
    const src = '*Melee Attack Roll:* +9, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage.';
    expect(validateConversionResponse(answer('Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage.'), model(src))).toBe(true);
  });

  // the structural gates it already had must still hold
  it('still refuses a response with the wrong row count', () => {
    expect(validateConversionResponse(JSON.stringify({ Actions: [] }), model(SRC_BOUNDED))).toBe(false);
  });
});
