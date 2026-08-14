/**
 * Meta-tests for the corrections registry (audit finding #1). The passes'
 * BEHAVIOR is covered by the golden blocks and the accretion suite; these
 * assert the registry's structural contract — the properties the refactor
 * exists to provide.
 */
import { CORRECTIONS, runCorrections } from '../corrections.mjs';

describe('the corrections registry contract', () => {
  test('every pass is named, and names are unique', () => {
    const names = CORRECTIONS.map((p) => p.name);
    expect(names.every((n) => typeof n === 'string' && /^[a-z][a-z0-9-]+$/.test(n))).toBe(true);
    expect(new Set(names).size).toBe(names.length);
  });

  test('the order is EXPLICIT — this list is the contract, not file position', () => {
    // Deliberately a full enumeration: reordering or inserting a pass must
    // be a conscious edit HERE, with the known dependencies in mind:
    //   - name-domain-vet before name-collisions (a reverted name can collide)
    //   - restraint-durability before restraint-physics (both edit the
    //     object parenthetical; physics matches on the scaled text)
    //   - name-type-harmonizer last (it reads final dealt damage; the
    //     Multiattack rebuild that follows in applyFlavor reads ITS names)
    expect(CORRECTIONS.map((p) => p.name)).toEqual([
      'speed-differential', 'movement-mode-refs', 'sight-range-fit',
      'tremorsense-pairing', 'dead-object-clause', 'swallow-capacity',
      'dead-dont-breathe', 'name-domain-vet',
      'name-collisions', 'spell-reference-guarantee', 'spell-text-hygiene',
      'restraint-durability', 'restraint-physics', 'capability-clause',
      'absorbed-not-immune', 'name-type-harmonizer',
    ]);
  });

  test('the runner reports exactly the passes that changed something', () => {
    const sections = {
      Actions: [{ name: 'Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 10 (2d6 + 3) Slashing damage.' }],
    };
    const ctx = {
      skeleton: { entries: [], traits: [], speed_mod: 10, size: 'Medium', cr: 5, houses: [] },
      j: { speed: '30 ft.', type: 'Monstrosity' },
      sections, byId: new Map(), energy: 'Fire', physical: 'Slashing', inline: 'the test',
      renderedOf: new Map(), fallbackEntryName: () => 'Fallback Name',
      NON_ACTION_SPELLS: [], SCALING_SPELLS: [], KNOWN_SPELLS: new Set(), atWillBanned: () => false,
    };
    const fired = runCorrections(ctx);
    expect(fired).toContain('speed-differential'); // speed_mod 10 rewrites the line
    expect(ctx.j.speed).toBe('40 ft.');
    // a no-op context fires nothing
    const quiet = runCorrections({ ...ctx, skeleton: { ...ctx.skeleton, speed_mod: 0 } });
    expect(quiet).not.toContain('speed-differential');
  });
});
