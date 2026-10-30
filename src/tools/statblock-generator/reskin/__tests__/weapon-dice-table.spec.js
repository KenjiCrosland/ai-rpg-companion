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
