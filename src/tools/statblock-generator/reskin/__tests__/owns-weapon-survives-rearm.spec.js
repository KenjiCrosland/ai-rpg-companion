/**
 * A TEMPLATE THAT WRITES ITS OWN WEAPON IS NOT RE-ARMED.
 *
 * The class-weapon pass rewrites a row's range, reach, damage type and NAME to
 * the class's weapon, and leaves the row's TEXT alone. The 2026-10-28 forty
 * shipped the result on Edrik Vane, a sellsword asked for "hurls a handaxe and
 * closes with a shortsword":
 *
 *   Longbow — Edrik hurls a handaxe. *Ranged Attack Roll:* +5, range 150/600 ft.
 *   9 (2d6 + 2) Piercing damage. The weapon lands in an unoccupied space...
 *
 * A longbow is not thrown and does not land where it was aimed. The row is
 * `throw-retrieve`, whose frame owns the projectile AND its 30/120 thrown range,
 * and the re-arm overwrote both — it also undid the naming convergence, which had
 * correctly called the row Hurled Weapon.
 */
import { TEMPLATE_BY_ID, TEMPLATES } from '@/tools/statblock-generator/reskin/templates.mjs';
import { SHAPES } from '@/tools/statblock-generator/reskin/shapes.mjs';

describe('the templates that write their own weapon declare it', () => {
  it.each(['throw-retrieve', 'thrown-burst'])('%s declares owns_weapon', (id) => {
    expect(TEMPLATE_BY_ID.get(id)?.owns_weapon).toBe(true);
  });

  it('an ordinary weapon row does NOT declare it, so re-arming still works', () => {
    // the pass exists for a reason: a chassis attack row SHOULD take the class's
    // weapon. Only a template that owns its projectile opts out.
    const plain = TEMPLATES.filter((t) => t.id !== 'throw-retrieve' && t.id !== 'thrown-burst');
    expect(plain.some((t) => t.owns_weapon === true)).toBe(false);
  });

  // The flag is only honest if it covers every shape whose FRAME names a
  // projectile or states its own range — otherwise the next one added silently
  // gets re-armed. Derived from the shapes themselves, not a hand-kept list.
  it('every shape whose frame owns a projectile or a range declares it', () => {
    const owning = SHAPES.filter((s) => {
      const frames = Object.values(s.frames ?? {}).join(' ');
      return /\{projectile\}|range \d+\/\d+ ft\./.test(frames);
    });
    expect(owning.length).toBeGreaterThanOrEqual(3);
    for (const s of owning) expect([s.id, s.owns_weapon]).toEqual([s.id, true]);
  });

  it("throw-retrieve's frame states the thrown range the re-arm overwrote", () => {
    const frames = Object.values(SHAPES.find((s) => s.id === 'throw-retrieve').frames).join(' ');
    expect(frames).toMatch(/range 30\/120 ft\./);
    expect(frames).not.toMatch(/150\/600/);
  });
});
