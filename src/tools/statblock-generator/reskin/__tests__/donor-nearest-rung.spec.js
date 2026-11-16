/**
 * A DONOR THAT SITS ABOVE THE TARGET CR IS CHOSEN BY PROXIMITY, NOT BY ARRAY ORDER.
 *
 * Critic, 2026-11-05: `brute-17-regenerator` at CR 4 shipped Regeneration 20 on 85 Hit
 * Points, on 6 of 6 rolls of the coal-cat concept. A level-4 party nets about 15 damage a
 * round, so the monster could not be killed.
 *
 * Cause: `pickDonor`'s `from()` filtered to donors at or below the target CR and fell
 * through to `list[0]` when that was empty — the FIRST donor in the array, with no CR
 * proximity. The regenerator style had cheaper rungs all along (CR 5 and CR 10); array
 * order was the only reason the CR 17 won.
 *
 * Measured over the whole pick space — every archetype x style x CR 1-24, 3,672
 * combinations — this changes 4 and leaves 3,668 identical. All four are the defect.
 */
import { pickDonor } from '../scale.mjs';

describe('pickDonor takes the nearest rung when none sits at or below the target', () => {
  it.each([[1], [2], [3], [4]])('CR %i regenerator brute no longer draws the CR 17 body', (cr) => {
    const d = pickDonor(cr, 'regenerator', 'brute');
    expect(d.id).toBe('brute-5-regenerator');
    expect(d.legendary).toBeFalsy();          // the legendary tier is what carried Regeneration 20
    expect(d.cr - cr).toBeLessThanOrEqual(4); // a gap of 1-4 rather than 13
  });

  it('keeps the style rather than dropping to a styleless body', () => {
    // the concept asked for a regenerator; the fix must not answer with brute-2
    expect(pickDonor(4, 'regenerator', 'brute').style).toBe('regenerator');
  });

  it.each([
    [12, 'regenerator', 'brute', 'brute-10-regenerator'],
    [20, 'regenerator', 'brute', 'brute-17-regenerator'],
    [1, 'grappler', 'brute', 'brute-5-grappler'],
    [4, null, 'brute', 'brute-2'],
  ])('and leaves CR %i %s %s on %s', (cr, style, arch, want) => {
    expect(pickDonor(cr, style, arch).id).toBe(want);
  });

  it('prefers a donor at or below the target whenever one exists', () => {
    // the primary path is untouched: nearest-rung is only the fallback
    for (const cr of [5, 9, 13, 17, 21]) {
      const d = pickDonor(cr, null, 'brute');
      expect(d.cr).toBeLessThanOrEqual(cr);
    }
  });
});
