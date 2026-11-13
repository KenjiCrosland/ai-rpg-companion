/**
 * RE-ROLL MUST SURVIVE EVERY FAMILY THE ROUTE CAN RETURN (2026-11-13).
 *
 * The route returns eight families; the chassis table knows six names, and
 * `applyArchetype` THROWS on the other two. `rerollEntry` and `rerollSection` call
 * `buildContext` with no catch, so a family the table does not know breaks re-rolling
 * on that sheet outright.
 *
 * This is the test that was missing. When `bodyFamilyOf` was first pointed at the
 * chassis lookup, every CASTER sheet — Sister Maudra, Skyfeud, Orsolya — threw
 * "Unknown archetype: caster" on re-roll, and the only data test covered the
 * skirmisher case, so the suite stayed green. `ooze` and `dragon` threw the same way
 * and had been broken before any of it.
 *
 * It walks the families rather than listing the ones we happened to think of: add a
 * line to the shelf and this test asks about it on its own.
 */
import { LINES } from '@/tools/statblock-generator/reskin/route.mjs';
import {
  buildContext, chassisRoleOf, bodyFamilyOf, ARCHETYPE_NAMES, rerollEntry,
} from '@/tools/statblock-generator/format-2024/generate.mjs';

const ROUTED_FAMILIES = [...new Set(LINES.map((l) => l.family))];

const sheetOn = (family, label) => ({
  name: 'Test', cr: 5, archetype: label, archetype_source: 'user',
  generation: { path: 'reskin', archetype: family },
});

describe('re-roll survives every routed family', () => {
  test('the shelf really does return families the chassis table has never heard of', () => {
    // the premise of this whole test — if it ever stops being true, say so loudly
    const unknown = ROUTED_FAMILIES.filter((f) => !ARCHETYPE_NAMES.includes(f));
    expect(unknown).toEqual(expect.arrayContaining(['caster', 'ooze', 'dragon']));
  });

  test.each(ROUTED_FAMILIES)('a %s body does not throw when the chassis is looked up', (family) => {
    for (const label of ['artillery', 'controller', 'brute', undefined]) {
      const m = sheetOn(family, label);
      expect(() => buildContext(m.cr, chassisRoleOf(m) ?? 'balanced')).not.toThrow();
    }
  });

  test('a caster body falls back to the role the user picked, not to its own family', () => {
    const maudra = sheetOn('caster', 'controller');
    expect(bodyFamilyOf(maudra)).toBe('caster'); // the template shelf still gets the family
    expect(chassisRoleOf(maudra)).toBe('controller'); // the chassis table gets a name it has
  });

  test('a body family with no label at all falls to balanced rather than throwing', () => {
    for (const family of ['ooze', 'dragon', 'caster']) {
      const m = { name: 'T', cr: 5, generation: { archetype: family } };
      expect(chassisRoleOf(m)).toBeNull();
      expect(() => buildContext(5, chassisRoleOf(m) ?? 'balanced')).not.toThrow();
    }
  });

  test('a family the table DOES know is still preferred over the label', () => {
    const bob = sheetOn('skirmisher', 'artillery');
    expect(chassisRoleOf(bob)).toBe('skirmisher');
  });

  // AND THE REAL ENTRY POINT, not just the helper. `rerollEntry` reaches
  // `buildContext` before it ever calls the model, so a stub that throws a sentinel
  // proves we got past the chassis lookup: the sentinel means the lookup survived,
  // "Unknown archetype" means it did not.
  describe('rerollEntry itself', () => {
    const SENTINEL = 'reached the model';
    const stub = () => { throw new Error(SENTINEL); };
    const full = (family) => ({
      ...sheetOn(family, 'controller'),
      format: '2024',
      challenge_rating: 'CR 5 (1,800 XP)',
      stats: { STR: 14, DEX: 14, CON: 14, INT: 10, WIS: 12, CHA: 10 },
      pb: 3,
      sections: { Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +6, reach 5 ft. 10 (2d6 + 3) Bludgeoning damage.' }] },
    });

    test.each(ROUTED_FAMILIES)('does not throw a chassis error on a %s body', async (family) => {
      const err = await rerollEntry(full(family), { kind: 'action', current: 'Slam' }, stub)
        .then(() => null, (e) => e);
      expect(String(err?.message ?? '')).not.toMatch(/Unknown archetype/);
    });
  });
});
