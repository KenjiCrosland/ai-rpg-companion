/**
 * A HALF-BUILT RIDER IS NEVER ATTACHED (owner's ruling, 2026-11-13).
 *
 * The ruling replaced an earlier plan to strip a dangling save out of finished text:
 * fix the cause where the row is BUILT, refuse the rider there, and let the
 * `save-unrollable` lint be the alarm. Nothing edits a finished row.
 *
 * The cause was the monk's. The kit welds Stunning Strike onto a host melee row; the
 * print-canon rename then strips any standalone sentence imposing a condition the
 * print row does not, which is right for the chassis's rider and wrong for the kit's.
 * It took the Failure clause and left the frame:
 *
 *     ...the target is subjected to the following effect. Constitution Saving Throw: DC 14.
 *
 * Three monks of three shipped that across two forties. The pipeline replay lives in
 * `pipelines.spec.js` beside the monk test that already has the harness; this file is
 * the guard's own contract, at the level the weld asks it.
 *
 * `saveIsUnrollable` is ONE definition with two readers — the weld, which refuses, and
 * the lint, which reports. They cannot drift apart.
 */
import { saveIsUnrollable } from '@/tools/statblock-generator/format-2024/lint.mjs';

const MONK_FRAME = 'Once on each of its turns when it hits with this attack, the target is subjected to the following effect. *Constitution Saving Throw*: DC 14.';
const MONK_WHOLE = `${MONK_FRAME} *Failure:* The target has the Stunned condition until the end of its next turn.`;

describe('a half-built rider is never attached', () => {
  test('the monk frame with its outcome taken is refused, and says why', () => {
    expect(saveIsUnrollable(MONK_FRAME)).toMatch(/no outcome/);
  });

  test('the same rider, whole, is attached without complaint', () => {
    expect(saveIsUnrollable(MONK_WHOLE)).toBeNull();
  });

  test('a save whose stat was lost is refused too (the Stone Giant shape)', () => {
    expect(saveIsUnrollable("the giant can redirect some of the attack's force. DC 17, one creature the giant can see within 60 feet. 11 (1d10 + 6) Force damage."))
      .toMatch(/names no saving throw/);
  });

  test('a rider that imposes a condition with no save at all is not this guard\'s business', () => {
    // print's own on-hit riders carry no DC; the guard must not refuse them
    expect(saveIsUnrollable('. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13).')).toBeNull();
    expect(saveIsUnrollable(', and the target has the Prone condition.')).toBeNull();
  });

  test('an empty or absent rider is not a defect', () => {
    for (const t of ['', '   ', null, undefined]) expect(saveIsUnrollable(t)).toBeNull();
  });
});
