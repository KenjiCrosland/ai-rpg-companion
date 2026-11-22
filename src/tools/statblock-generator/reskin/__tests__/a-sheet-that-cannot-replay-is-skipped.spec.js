/**
 * A SHEET THAT CANNOT REPLAY IS SKIPPED, AND THE MARK IS READ FROM THE INPUT
 * (owner, 2026-11-21 evening).
 *
 * Two of the forty do not depend only on their inputs: s22's CR is `auto` with no CR in its words,
 * so `rollRandomCR()` rolls one, and s36 is a blank form whose whole creature is invented. Their
 * route and seed prompts differ every run and no tape can serve them.
 *
 * The harness marked them in the tape, and the mark fell out of the lineage twice — a skipped
 * entry writes no tape, so the next generation has none to carry. Present on the 18 November
 * tapes, null on the 20 November ones, and both sheets were reported as MISSES for a week.
 *
 * `notReplayable` always could answer from the entry alone. Now it is asked.
 */
import { notReplayable } from '../../../../../scripts/lib/tape.mjs';

describe('the decision is knowable from the entry', () => {
  test('cr "auto" with no CR in its words is skipped — s22, the Goblin Boss', () => {
    const r = notReplayable({ name: 'Goblin Boss', description: '', cr: 'auto' });
    expect(r.replay?.skip).toBe(true);
    expect(r.replay.why).toMatch(/rolled locally/);
  });

  test('a blank form is skipped — s36', () => {
    const r = notReplayable({ name: '', description: '', cr: '4' });
    expect(r.replay?.skip).toBe(true);
    expect(r.replay.why).toMatch(/blank form/);
  });

  test('a CR the GM typed in words is NOT skipped — the marsh witch', () => {
    expect(notReplayable({ name: '', description: 'a marsh witch who curses trespassers, cr 7', cr: 'auto' }).replay).toBeUndefined();
  });

  test('a CR set in the field is NOT skipped', () => {
    expect(notReplayable({ name: 'Dire Wolf', description: 'with a frost-rimed hide', cr: '1' }).replay).toBeUndefined();
  });
});
