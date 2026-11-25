/**
 * GM40 FAULT 4 — A NAME NEVER REACHES BACK ACROSS A FULL STOP (Fable, 2026-11-25).
 *
 * Grumm's "totem that gives allies +2 to hit within 30 ft. spear." named his weapon row
 * "Ft Spear": the walk that collects the words before the noun stepped back onto "ft." and kept
 * it, because stripping the punctuation leaves a word like any other.
 *
 * Red with the fix out: remove the sentence-boundary break and the name is "Ft Spear" again.
 */
import { partRows } from '../generate.mjs';

const clause = (text) => [{ id: 'cl_1', text, kind: 'mechanical' }];

describe('a weapon named straight after a measurement', () => {
  it('is named for the weapon alone', () => {
    const rows = partRows(clause('totem that gives allies +2 to hit within 30 ft. spear'), { cap: 4 });
    const spear = rows.find((r) => /spear/i.test(r.name));
    expect(spear).toBeDefined();
    expect(spear.name).toBe('Spear');
    expect(rows.map((r) => r.name)).not.toContain('Ft Spear');
  });

  it('still takes a real adjective before the noun', () => {
    const rows = partRows(clause('he wields a rusted iron spear'), { cap: 4 });
    const spear = rows.find((r) => /spear/i.test(r.name));
    expect(spear).toBeDefined();
    expect(spear.name).toMatch(/\bSpear$/);
    expect(spear.name.split(' ').length).toBeGreaterThan(1);
  });
});
