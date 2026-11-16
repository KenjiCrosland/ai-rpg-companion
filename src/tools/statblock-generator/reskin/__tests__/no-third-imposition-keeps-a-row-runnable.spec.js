/**
 * THE CONDITION WAS THE WHOLE ROW.
 *
 * The "one mechanic, at most twice" pass sheds a condition rider when three rows
 * impose it (print: 181 blocks impose a condition once, 11 twice, 0 thrice). Its
 * own trace says "the row, its damage and its name all stay" — which assumes a
 * damage row whose rider is an extra. The Brass Tyrant's Seismic Strike had no
 * damage: the Prone rider WAS its Failure payload, so shedding it shipped
 *
 *   Seismic Strike. *Strength Saving Throw*: DC 19, each creature within
 *   10 feet of the tyrant. *Failure:*
 *
 * a row a GM cannot run. The pass now validates the edit before committing it,
 * and drops the ROW when nothing is left to do.
 */
import { EMPTY_SAVE_OUTCOME } from '@/tools/statblock-generator/format-2024/lint.mjs';

describe('the shared empty-save-outcome test', () => {
  // ONE definition, imported by both the lint and the pass that strips clauses —
  // a second copy is how the original shipped.
  it('catches a save outcome with nothing after it', () => {
    expect(EMPTY_SAVE_OUTCOME.test('Strength Saving Throw: DC 19, each creature within 10 feet of the tyrant. Failure:')).toBe(true);
  });

  it('catches an outcome that runs straight into the next label', () => {
    expect(EMPTY_SAVE_OUTCOME.test('DC 15, each creature in a 30-foot Cone. Failure: Success: Half damage only.')).toBe(true);
  });

  it('passes a row that still says what happens', () => {
    expect(EMPTY_SAVE_OUTCOME.test('DC 19, each creature in a 30-foot Cone. Failure: 72 (16d8) Fire damage. Success: Half damage only.')).toBe(false);
    expect(EMPTY_SAVE_OUTCOME.test('DC 14, one creature. Failure: The target has the Prone condition.')).toBe(false);
  });
});

describe('what the pass must decide', () => {
  // the two shapes the strip produces, as the pass sees them before committing
  const strip = (text, cond) => String(text)
    .replace(new RegExp(`,? and (?:the target|it) has the ${cond} condition[^.]*\\.?`, 'i'), '.')
    .replace(new RegExp(`\\s*The target has the ${cond} condition[^.]*\\.`, 'i'), '')
    .replace(/\s{2,}/g, ' ').replace(/\.\./g, '.').trim();

  it('a DAMAGE row keeps working when its rider is shed — the row stays', () => {
    const out = strip('*Strength Saving Throw*: DC 19, each creature in a 30-foot Cone. *Failure:* 72 (16d8) Fire damage, and the target has the Prone condition.', 'Prone');
    expect(out).toMatch(/72 \(16d8\) Fire damage/);
    expect(EMPTY_SAVE_OUTCOME.test(out.replace(/\*/g, ''))).toBe(false);
  });

  // the Seismic Strike case: the rider was the entire payload
  it('a CONDITION-ONLY row is emptied by the same strip — the row must leave', () => {
    const out = strip('*Strength Saving Throw*: DC 19, each creature within 10 feet of the tyrant. *Failure:* The target has the Prone condition.', 'Prone');
    expect(out).toMatch(/\*Failure:\*\s*$/);
    expect(EMPTY_SAVE_OUTCOME.test(out.replace(/\*/g, ''))).toBe(true);
  });
});
