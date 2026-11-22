/**
 * LIVE FROM THE CALL THAT MISSED, NOT FROM ITS FAMILY (owner's rule, 2026-11-21).
 *
 * A re-record keeps every answer BEFORE the call that missed. The harness kept every answer before
 * the FAMILY that missed, and a family is called more than once — the seat is asked for an action
 * and then for a trait, twice each where a first answer is refused. On s06 the trait seat's prompt
 * had changed and the action seat's two had not; `--live-from seat` served nothing from the first
 * seat call on, so the action seat was rolled again and came back a different row.
 */
import { decide, buildTape, familyOf } from '../../../../../scripts/lib/tape.mjs';

// the real opening, so `familyOf` names it `seat` and the family latch can be read
const SEAT = (n) => `You are writing ONE ability for a D&D monster.\nCall ${n}.`;
const tape = () => buildTape([
  { prompt: SEAT(1), response: '{"one":1}' },
  { prompt: SEAT(2), response: '{"two":2}' },
  { prompt: SEAT(3), response: '{"three":3}' },
]);

describe('--live-from miss serves while the prompt matches', () => {
  test('three calls of one family, the third changed: the first two are served and the third is live', () => {
    const t = tape();
    let afterNamed = false;
    const run = (prompt) => { const d = decide({ mode: 'live-from', liveFrom: 'miss', prompt, tape: t, afterNamed }); if (d.flips) afterNamed = true; return d.use; };
    expect(run(SEAT(1))).toBe('tape');
    expect(run(SEAT(2))).toBe('tape');
    expect(run('You are writing ONE ability — call 3, and the sheet has changed')).toBe('live');
  });

  /**
   * IT DOES NOT LATCH — corrected 2026-11-22, and this test used to assert the opposite.
   *
   * I built the latch by analogy with the family latch below. The ribbon round showed the cost: the
   * ribbon is the last call inside generateReskin and its answer goes into no other prompt, but the
   * 2014 conversion runs after it. The latch sent that call live on all 13 of the forty's 2014
   * sheets and four came back with their existing rows reworded — rows the round had promised not
   * to touch.
   *
   * If a prompt matches the tape, the recorded answer is a valid answer to it. A prompt built from
   * a changed answer does not match, and goes live on its own account.
   */
  test('a later call whose prompt still matches is served, not re-rolled', () => {
    const t = tape();
    let afterNamed = false;
    const run = (prompt) => { const d = decide({ mode: 'live-from', liveFrom: 'miss', prompt, tape: t, afterNamed }); if (d.flips) afterNamed = true; return d.use; };
    expect(run(SEAT(1))).toBe('tape');
    expect(run('a prompt the tape has never seen')).toBe('live');
    expect(run(SEAT(2))).toBe('tape');          // it matches, so the recorded answer stands
  });

  test('and every prompt the tape has never seen goes live, however many', () => {
    const t = tape();
    let afterNamed = false;
    const run = (prompt) => { const d = decide({ mode: 'live-from', liveFrom: 'miss', prompt, tape: t, afterNamed }); if (d.flips) afterNamed = true; return d.use; };
    expect(run('one prompt the tape has never seen')).toBe('live');
    expect(run(SEAT(1))).toBe('tape');
    expect(run('another prompt the tape has never seen')).toBe('live');
  });

  test('the fixture really is the seat family, or the latch below reads nothing', () => {
    expect(familyOf(SEAT(1))).toBe('seat');
  });

  test('the family latch is unchanged: --live-from seat goes live at the FIRST seat call', () => {
    const t = tape();
    let afterNamed = false;
    const run = (prompt) => { const d = decide({ mode: 'live-from', liveFrom: 'seat', prompt, tape: t, afterNamed }); if (d.flips) afterNamed = true; return d.use; };
    expect(run(SEAT(1))).toBe('live');          // the behaviour that threw s06's action seat away
    expect(run(SEAT(2))).toBe('live');
  });

  test('strict and pass-through are untouched', () => {
    const t = tape();
    expect(decide({ mode: 'strict', prompt: SEAT(1), tape: t }).use).toBe('tape');
    expect(decide({ mode: 'strict', prompt: 'unknown', tape: t }).use).toBe('miss');
    expect(decide({ mode: 'pass-through', prompt: 'unknown', tape: t }).use).toBe('live');
  });
});
