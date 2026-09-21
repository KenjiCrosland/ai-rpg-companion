/**
 * THE 2024 CHASSIS PATH IS RETIRED (owner call, 2026-08-14).
 *
 * This suite used to test localStorage['statblock-skeleton'] as an escape
 * hatch back to the chassis. The hatch is gone: the chassis spent the
 * sprint accumulating drift (no funnel, no damage mix, no ledger, no trait
 * renderer) and twice a fix landed on one path but not the other. What
 * remains to test is the routing contract itself.
 */
import { generateMonster2024 } from '../format-2024/generate.mjs';

const flavorNull = async (prompt) => (/Every number is already fixed/.test(prompt)
  ? null : JSON.stringify({ problems: [] }));

describe('path routing after the chassis retirement', () => {
  test('2024 is the skeleton path, unconditionally — the old flag is ignored', async () => {
    localStorage.setItem('statblock-skeleton', '0'); // the retired escape hatch
    try {
      const m = await generateMonster2024(
        { concept: 'a stone warden', cr: 9, seed: 4, edition: '2024' }, flavorNull,
      );
      // skeleton fingerprint: generation metadata records the path
      expect(m.generation?.path).toBe('skeleton');
    } finally {
      localStorage.removeItem('statblock-skeleton');
    }
  });

  test('2014 still runs the chassis engine', async () => {
    // the chassis flow survives as exactly one thing: the 2014 engine.
    // A null generation response walks the never-fail path; reaching the
    // chassis error contract (not the skeleton's) proves the routing.
    await expect(generateMonster2024(
      { concept: 'a stone warden', cr: 9, seed: 4, edition: '2014' },
      async () => null,
    )).rejects.toThrow();
  });
});
