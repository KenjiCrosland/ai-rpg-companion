/**
 * WHEN THE REPAIR CANNOT BUILD AN HONEST NAME, THE TEMPLATE ALREADY HAS ONE.
 *
 * The "name follows content" pass swaps a claim word for a noun the row's own
 * text supplies — "Poisoned Blade" on a row that poisons nobody becomes
 * "Shuriken Blade". It gives up when every candidate noun is taken by a
 * neighbour, which is right: a mangled name is worse than a wrong one.
 *
 * But giving up leaves the lie. The Rotgaze Horror shipped an `adhesive` trait
 * called "Paralysing Gaze" — a sticky hide named for a paralysing stare — because
 * the sibling `sensory-strike` row had already taken every "Gaze" spelling. The
 * checker caught it (`name-mechanic`) and nothing had fixed it.
 *
 * Every template carries its own name, so where the repair has nothing to build
 * from, that name is the honest fallback. Declared data, not another reading of
 * the prose, and it fires ONLY after the repair has failed.
 */
import { TEMPLATE_BY_ID } from '@/tools/statblock-generator/reskin/templates.mjs';
import { mechanicUnkept, honestNouns, claimWordIn } from '@/tools/statblock-generator/reskin/name-claims.mjs';

describe('the fallback has something to fall back to', () => {
  it('every template carries a canon name', () => {
    const missing = [...TEMPLATE_BY_ID.values()].filter((t) => !t.name);
    expect(missing).toEqual([]);
  });

  it('the row that shipped the lie has one', () => {
    expect(TEMPLATE_BY_ID.get('adhesive').name).toBe('Adhesive');
  });
});

describe('the case that produced it', () => {
  const STICKY = 'Any creature that touches the horror is stuck to it until it escapes.';

  it('the name is detected as promising what the row never does', () => {
    expect(mechanicUnkept('Paralysing Gaze', STICKY)).toMatch(/Paralyzed/);
  });

  // the British spelling is NOT the gap — both forms are caught
  it('catches both spellings, so the claim list was never the problem', () => {
    expect(mechanicUnkept('Paralysing Gaze', STICKY)).toBeTruthy();
    expect(mechanicUnkept('Paralyzing Gaze', STICKY)).toBeTruthy();
  });

  // why the repair gave up: the only noun it could build with was taken
  it('the repair has no free noun when a neighbour owns the word', () => {
    const word = claimWordIn('Paralysing Gaze');
    expect(word).toBeTruthy();
    const taken = new Set(['locking gaze', 'tendril', 'umbral step']);
    const free = honestNouns(STICKY).find((x) => !taken.has(`Paralysing Gaze`.replace(new RegExp(`\\b${word}\\b`, 'i'), x).toLowerCase()));
    // with "Gaze" spoken for, the swap either finds nothing or rebuilds a taken name
    expect(free === undefined || taken.has(`Paralysing Gaze`.replace(new RegExp(`\\b${word}\\b`, 'i'), free).toLowerCase())).toBe(true);
  });

  it('and the template name is free, so the fallback has a legal answer', () => {
    const canon = TEMPLATE_BY_ID.get('adhesive').name;
    const taken = new Set(['locking gaze', 'tendril', 'umbral step', 'paralysing gaze']);
    expect(taken.has(canon.toLowerCase())).toBe(false);
    expect(canon.toLowerCase()).not.toBe('paralysing gaze');
  });
});

describe('what the fallback must not do', () => {
  // it fires only after the repair fails, so an honest flavoured name is untouched
  it('leaves a name the row actually backs', () => {
    const t = 'The target has the Blinded condition until the end of its next turn.';
    expect(mechanicUnkept('Locking Gaze', t)).toBeFalsy();
  });

  it('leaves a plain damage name alone', () => {
    expect(mechanicUnkept('Tendril', '17 (4d6 + 3) Piercing damage.')).toBeFalsy();
  });
});
