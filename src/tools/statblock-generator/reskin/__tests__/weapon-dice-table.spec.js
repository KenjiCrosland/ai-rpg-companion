/**
 * EVERY WEAPON THAT DEALS DAMAGE DECLARES ITS DIE SIZE.
 *
 * The re-dice keeps print's rule — hold the die size, scale the count — and it
 * reads `die` off the weapon table. When that was filled in, the MELEE set got
 * it and all twelve ranged entries were skipped, so a thrown javelin came back
 * correct (d6) and a Dart came back 2d8. The miss was invisible because the
 * re-dice simply has nothing to aim at when `die` is absent: no throw, no trace.
 *
 * Die sizes are the rules' weapon table, confirmed against print's own rows
 * wherever print has one — shortbow d6, longbow d8, light crossbow d8, hand
 * crossbow d6, heavy crossbow d10, pistol d10. (Print's rows also show d4s
 * alongside those, which are second damage components, not the weapon's die.)
 */
import printBlocks from '@/data/srd52-monsters.json';
import { WEAPONS } from '@/tools/statblock-generator/reskin/weapons.mjs';
import { attackDamageDiceFor, D4_MAX } from '@/tools/statblock-generator/format-2024/dice.mjs';

describe('the weapon table', () => {
  const entries = Object.entries(WEAPONS);

  it('has every damaging weapon carrying a die size', () => {
    const missing = entries.filter(([, w]) => w.type != null && w.die == null).map(([k]) => k);
    expect(missing).toEqual([]);
  });

  it('gives a die to no weapon that deals no damage — the net is the only one', () => {
    const noDamage = entries.filter(([, w]) => w.type == null).map(([k]) => k);
    expect(noDamage).toEqual(['net']);
    expect(WEAPONS.net.die).toBeUndefined();
  });

  it('covers the ranged side, not only the melee side', () => {
    const ranged = entries.filter(([, w]) => w.launcher || (w.range && !w.reach));
    expect(ranged.length).toBeGreaterThanOrEqual(10);
    for (const [name, w] of ranged) {
      if (w.type == null) continue;
      expect(typeof w.die).toBe('number');
      expect([4, 6, 8, 10, 12]).toContain(w.die);
    }
  });

  // print is the calibration authority: where it writes the weapon, our die matches
  it.each([['shortbow', 6], ['longbow', 8], ['light crossbow', 8], ['hand crossbow', 6], ['heavy crossbow', 10], ['pistol', 10]])
  ('%s is d%d, and print writes that die most often', (name, die) => {
    expect(WEAPONS[name].die).toBe(die);
    const counts = new Map();
    for (const b of printBlocks) {
      for (const rs of Object.values(b.sections ?? {})) {
        for (const r of rs) {
          if (!new RegExp(`\\b${name}\\b`, 'i').test(String(r.name ?? ''))) continue;
          for (const m of String(r.text ?? '').matchAll(/\d+ \(\d+d(\d+)/g)) {
            const d = Number(m[1]); counts.set(d, (counts.get(d) ?? 0) + 1);
          }
        }
      }
    }
    const modal = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
    expect(modal).toBeDefined();   // print has rows for this weapon, else the claim is untested
    expect(modal[0]).toBe(die);
  });
});

/**
 * PRINT'S CEILING ON THE RE-DICE (the gate forty, 2026-11-03).
 *
 * "Hold the die size, scale the count" has an end: print's largest d4 attack row
 * is 3d4. The first cut of this capped only `attackDamageDiceFor`, which picks a
 * die from the budget — but the re-dice above FORCES the weapon's die on a later
 * pass and never consulted it, so the gate forty shipped a Dart at 13 (4d4 + 3)
 * and an earlier run a cane at 7d4. Both arms now share the one constant.
 */
describe("the re-dice stops at print's own d4 maximum", () => {
  // the reach/range clause ends in "ft.", so a dot-excluding scan never reaches the
  // damage — the first cut of this test reported ZERO d4 attack rows in all of print.
  const attackRows = printBlocks.flatMap((m) => Object.values(m.sections ?? {}).flat())
    .filter((r) => /Attack Roll:/.test(String(r?.text ?? '')));
  const d4Anywhere = attackRows.flatMap((r) => [...String(r.text).matchAll(/(\d+)d4\b/g)].map((m) => Number(m[1])));
  const d4AsWeaponDie = attackRows
    .map((r) => /(?:ft\.|feet)\s+\d+ \((\d+)d(\d+)/.exec(String(r.text)))
    .filter((m) => m && Number(m[2]) === 4).map((m) => Number(m[1]));

  it("D4_MAX is what print actually ships, so changing it must face the corpus", () => {
    // 422 attack rows; 101 carry a d4 somewhere and 59 have one as the weapon's own
    // die (41 at 1d4, 17 at 2d4, and 3d4 exactly once). Nothing reaches 4.
    expect(d4Anywhere.length).toBe(101);
    expect(Math.max(...d4Anywhere)).toBe(D4_MAX);
    expect(d4AsWeaponDie.length).toBe(59);
    expect(Math.max(...d4AsWeaponDie)).toBe(D4_MAX);
  });

  it('never offers a d4 stack past the ceiling, at any budget', () => {
    for (let avg = 2; avg <= 60; avg += 1) {
      for (const mod of [0, 2, 3, 5, 6]) {
        const { dice } = attackDamageDiceFor(avg, Math.min(mod, Math.max(0, avg - 1)));
        const m = /^(\d+)d4\b/.exec(dice);
        if (m) expect(Number(m[1])).toBeLessThanOrEqual(D4_MAX);
      }
    }
  });

  it("the Dart the forty shipped keeps the budget's die instead of 4d4", () => {
    // the exact row: Mudscale Adept, CR 5, "13 (4d4 + 3) piercing damage".
    // A Dart is d4, and 13 at +3 needs four of them — one past print's largest.
    const perDie = (4 + 1) / 2;
    expect(Math.round((13 - 3) / perDie)).toBeGreaterThan(D4_MAX); // the restamp WOULD have fired
    expect(attackDamageDiceFor(13, 3).dice).not.toMatch(/d4/); // and the budget's own die is not a d4 stack
  });
});
