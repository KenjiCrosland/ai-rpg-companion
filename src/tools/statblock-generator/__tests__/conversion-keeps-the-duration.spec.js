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

/**
 * AND WHEN THE RETRIES ARE SPENT, THE ROW KEEPS THE SOURCE.
 *
 * The validator above rejects an answer that drops the bound, so the call is
 * retried — but `callLLM` hands back the last answer once the retries are gone,
 * and the rejected text shipped: a forty produced an Ossarch Lich whose 2014
 * Paralyzing Touch read "or be paralyzed" with no end, against a 2024 source
 * that bounded it to the start of the lich's next turn. A permanently paralysed
 * character is not playable, so the choice is made per ROW.
 */
describe('boundKeptInConversion — one test, shared by the validator and the row mapping', () => {
  const bounded = "the target has the Paralyzed condition until the start of the lich's next turn.";
  const { boundKeptInConversion } = require('@/tools/statblock-generator/format-2024/generate.mjs');

  it('rejects the Ossarch Lich answer, which dropped the bound', () => {
    expect(boundKeptInConversion(bounded, 'or be paralyzed.')).toBe(false);
  });
  it('accepts an answer that carries the bound in 2014 idiom', () => {
    expect(boundKeptInConversion(bounded, "be paralyzed until the start of the lich's next turn.")).toBe(true);
  });
  it('has nothing to keep when the source names no bounded condition', () => {
    expect(boundKeptInConversion('18 (3d8 + 4) slashing damage.', '17 (3d8 + 4) slashing damage.')).toBe(true);
  });
  it('has nothing to keep when the source left it bare too — Prone self-ends', () => {
    expect(boundKeptInConversion('the target has the Prone condition.', 'the target is knocked prone.')).toBe(true);
  });
  it('treats a missing answer as nothing kept, so the row falls back to the source', () => {
    expect(boundKeptInConversion(bounded, undefined)).toBe(false);
  });
});

/**
 * AND THE PHRASING REWRITE MAY NOT UNDO IT.
 *
 * The per-row fallback above was landed and a conversion ten STILL shipped a
 * Barrow-Lich reading "or be paralyzed" with no end. The conversion itself had
 * kept the bound and passed its gate; `rewriteFlaggedEntries` — a second LLM
 * pass that fixes phrasing warts — then took its answer unconditionally at both
 * of its accept sites and dropped the duration again. Three accept points now
 * ask the same question.
 */
describe('a phrasing rewrite never trades a bound for idiom', () => {
  const { boundKeptInConversion } = require('@/tools/statblock-generator/format-2024/generate.mjs');
  const current = 'be paralyzed until the start of the barrow-lich\'s next turn.';

  it('refuses the rewrite that cost the Barrow-Lich its duration', () => {
    expect(boundKeptInConversion(current, 'or be paralyzed.')).toBe(false);
  });
  it('allows a rewrite that fixes idiom and keeps the bound', () => {
    expect(boundKeptInConversion(current, "the target is paralyzed until the start of the barrow-lich's next turn.")).toBe(true);
  });
  it('allows any rewrite of a row with no bound to protect', () => {
    expect(boundKeptInConversion('Hit: 11 (2d6 + 4) slashing damage.', 'Hit: 11 (2d6 + 4) slashing damage, and the target is pushed 10 feet.')).toBe(true);
  });
});

/**
 * THE REAL CULPRIT WAS DETERMINISTIC, NOT THE MODEL.
 *
 * Three guards on the model's answer — the validator that retries, the per-row
 * fallback, and both accept sites of the phrasing rewrite — and a conversion ten
 * STILL shipped "or be paralyzed" with no end, twice, on the same row. It was
 * never the model: the 2014 save gate (a hit that delivers a condition needs a
 * save in 2014 idiom) matched the rest of the sentence with `[^.]*` and its
 * replacement did not put the tail back, so the duration was eaten by the
 * correction. Deterministic, which is exactly why it reproduced every run and
 * why guarding the LLM could never catch it.
 */
describe('the 2014 save gate keeps the duration it finds', () => {
  const { convertEdition } = require('@/tools/statblock-generator/format-2024/generate.mjs');
  const base = (rows) => ({
    name: 'Barrow Warden', format: '2024', size: 'Medium', type: 'Undead', alignment: 'Neutral Evil',
    ac: 17, hp: 200, hp_formula: '25d8 + 75', speed: '30 ft.',
    stats: { STR: 11, DEX: 16, CON: 16, INT: 20, WIS: 14, CHA: 16 }, saves: {}, skills: '',
    senses: 'truesight 120 ft.; Passive Perception 12', languages: 'Common',
    initiative_bonus: 3, initiative_score: 13, cr: 14, cr_str: '14', pb: 5, xp: 11500,
    generation: { donor: 'caster-14' }, sections: { Actions: rows },
  });
  // the model's answer is irrelevant here: it is the correction that drops the tail
  const echo = (rows) => async () => JSON.stringify({ Actions: rows.map((r) => ({ name: r.name, text: r.text })) });
  const convert = async (rows) => {
    const out = await convertEdition(JSON.parse(JSON.stringify(base(rows))), echo(rows), { degraded: true });
    return Object.fromEntries((out.actions ?? []).map((a) => [a.name, String(a.description ?? '')]));
  };

  it('gates a bounded condition into a 2014 save WITHOUT losing the duration', async () => {
    const got = await convert([{ name: 'Paralyzing Touch', text: "*Melee Attack Roll:* +10, reach 5 ft. 23 (4d8 + 5) Cold damage, and the target has the Paralyzed condition until the start of the barrow warden's next turn." }]);
    expect(got['Paralyzing Touch']).toMatch(/saving throw or be paralyzed until the start of/i);
  });

  it('leaves a condition with no duration exactly as it was — Prone self-ends', async () => {
    const got = await convert([{ name: 'Slam', text: '*Melee Attack Roll:* +10, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage, and the target has the Prone condition.' }]);
    expect(got.Slam).toMatch(/saving throw or be knocked prone\.$/i);
  });
});
