/**
 * ONE PREDICATE FOR WHAT PRINT'S ATTACK LIST GOVERNS (fault 1, owner 2026-11-20).
 *
 * Four passes remove a row from a printed body and each carried its own list of what to spare. A
 * strike was on none of them, which is why three separate fixes each missed the pass that actually
 * deleted the rows — the `extraRows` list, spliced with "the Dire Wolf prints no row for it".
 *
 * These assert the predicate itself and the agreement between the lists it replaced. The wiring —
 * that a strike survives to the finished sheet — is proven by replaying the tapes that showed the
 * fault (s01, s11, s38 of baseline-2026-11-20 at 18bb4d19); see the round's report. The
 * generateReskin harness the handoff asked for is not built, and the report says why.
 */
import { outsidePrintsAttackList } from '../generate.mjs';

describe('a row print\'s attack list does not govern', () => {
  test('a strike is outside it — the member that was on none of the four lists', () => {
    expect(outsidePrintsAttackList({ name: 'Flank the Herd (Recharge 5-6)', strike: true })).toBe(true);
  });

  test('so are the rows the old lists agreed about', () => {
    for (const flag of ['part', 'gmArmed', 'userSet', 'print']) {
      expect([flag, outsidePrintsAttackList({ [flag]: true })]).toEqual([flag, true]);
    }
  });

  test('an ordinary chassis row is still governed, which is what the passes are for', () => {
    expect(outsidePrintsAttackList({ name: 'Hurlaxe', text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d6 + 5) Slashing damage.' })).toBe(false);
    expect(outsidePrintsAttackList({})).toBe(false);
    expect(outsidePrintsAttackList(null)).toBe(false);
  });

  test('and a strike is outside it however else the row is marked', () => {
    // the row carries `authored` at birth and does not still carry it at the provenance sweep;
    // `strike` is its own declaration and is what every pass reads now
    expect(outsidePrintsAttackList({ strike: true, authored: false })).toBe(true);
  });
});
