/**
 * NO SHEET IMPOSES ONE CONDITION THREE WAYS.
 *
 * The forty of 2026-10-27, Purple Worm: `duplicate-mechanic` FAIL — "3 rows
 * impose Restrained — Bite, Gut Plate Shear, Swallow; print has no block with
 * three (0 of 329)". Two of those are print's own rows on a print body, so the
 * only one that could give way was ours (`hook-drag`, which declares Grappled
 * and Restrained).
 *
 * Measured over the 329-block corpus: 181 blocks impose a condition on exactly
 * one row, 11 on two, and none on three. The checker has always failed this;
 * the engine had no matching rule and so shipped what the gate rejects.
 *
 * The rule lives on the POOL, not at ship: the template leaves the menu, the
 * call picks something else, and the sheet keeps a full row instead of losing
 * one late.
 */
import { templatesFor } from '@/tools/statblock-generator/reskin/templates.mjs';

const ctx = (sections) => ({ archetype: 'brute', cr: 13, movement: '30 ft.', type: 'Monstrosity', section: 'action', trigger: null, concept: 'a burrowing worm that seizes and swallows what it bites', sections });
const row = (name, imposes) => ({ name, text: `*Melee Attack Roll:* +14, reach 10 ft. 22 (3d8 + 9) Piercing damage, and the target has the ${Array.isArray(imposes) ? imposes[0] : imposes} condition.`, imposes });

describe('a template that would impose a third time leaves the menu', () => {
  test('with the condition on two rows already, the grappling template is not offered', () => {
    const twice = { Actions: [row('Bite', 'Restrained'), row('Swallow', 'Restrained')] };
    const pool = templatesFor(ctx(twice)).map((t) => t.id);
    expect(pool).not.toContain('hook-drag'); // declares Grappled + Restrained
  });

  test('with the condition on ONE row, it is still offered — print allows two', () => {
    const once = { Actions: [row('Bite', 'Restrained')] };
    expect(templatesFor(ctx(once)).map((t) => t.id)).toContain('hook-drag');
  });

  test('on an empty sheet nothing is withheld', () => {
    expect(templatesFor(ctx({})).map((t) => t.id)).toContain('hook-drag');
  });

  test('a different condition twice does not withhold it', () => {
    const other = { Actions: [row('Gaze', 'Frightened'), row('Wail', 'Frightened')] };
    expect(templatesFor(ctx(other)).map((t) => t.id)).toContain('hook-drag');
  });

  test('the rule reads the DECLARED record, so a prerequisite does not count', () => {
    // a payoff REQUIRES Restrained; it does not impose it. Two such rows must not
    // withhold a template, which is why this reads `imposedConditions` and not the text.
    const prereq = {
      Actions: [
        { name: 'Merciless Strike', text: '*Dexterity Saving Throw:* DC 19, one creature that has the Restrained condition. *Failure:* 42 (12d6) Fire damage.', consumes: 'Restrained' },
        { name: 'Opportunist\'s Lash', text: '*Strength Saving Throw:* DC 19, one creature that is Restrained. *Failure:* 31 (9d6) damage.', consumes: 'Restrained' },
      ],
    };
    expect(templatesFor(ctx(prereq)).map((t) => t.id)).toContain('hook-drag');
  });
});
