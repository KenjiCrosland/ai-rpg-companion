// THE FALLBACK LIBRARY's laws (owner go 2026-09-13; shape agreed
// 2026-09-04): generified golden seeds, engine-priced, drawn only when
// the wildcard dies, never the same monotony the fallback was.
import { LIBRARY_SEEDS, drawLibraryRow } from '../library.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';

describe('the fallback library (2026-09-13)', () => {
  const scaled = scaleDonor(pickDonor(8, null, 'skirmisher'), 8, { mechanics: [] });

  test('every seed is vet-legal by construction: no reactions, no negation, no immunity grants, no 2014 save grammar', () => {
    for (const seed of LIBRARY_SEEDS) {
      expect(seed.section).not.toBe('Reactions'); // the Credit Due cut — Parry retirement pin
      expect(seed.text).not.toMatch(/attack misses instead|[Ii]mmun(?:e|ity)|[Rr]esistan/);
      expect(seed.text).not.toMatch(/must (?:make|succeed on) a DC/); // 2024 skeleton only
      expect(seed.text).not.toMatch(/\breaction\b/i);
      // every number is a token or engine-derived — no authored DCs
      expect(seed.text).not.toMatch(/DC \d/);
    }
  });

  test('the draw is deterministic per name and rotates across names — never the next ten-of-twelve', () => {
    const a = drawLibraryRow(scaled, { archetype: 'skirmisher', name: 'Alpha One' });
    const b = drawLibraryRow(scaled, { archetype: 'skirmisher', name: 'Alpha One' });
    expect(a.seed).toBe(b.seed); // stable under the pin
    const seen = new Set(['Alpha One', 'Beta Two', 'Gamma Three', 'Delta Four', 'Epsilon Five', 'Zeta Six']
      .map((n) => drawLibraryRow(scaled, { archetype: 'skirmisher', name: n }).seed));
    expect(seen.size).toBeGreaterThan(1); // rotation is real
  });

  test('the card DC stamps and damage prices from per-hit — the library never invents a number', () => {
    for (const n of ['A', 'B', 'C', 'D', 'E', 'F', 'G']) {
      const d = drawLibraryRow(scaled, { archetype: 'caster', energy: 'Fire', name: n });
      expect(d.row.text).not.toMatch(/\{dc\}|\{burst\}|\{damage_type\}/);
      if (/Saving Throw/.test(d.row.text)) expect(d.row.text).toContain(`DC ${scaled.dc}`);
    }
  });

  test('the energy weld holds: concept energy fills, mix=physical falls back physical', () => {
    // force the damage-bearing seeds by scanning the rotation
    let sawBurst = false;
    for (let i = 0; i < 30 && !sawBurst; i += 1) {
      const d = drawLibraryRow(scaled, { archetype: 'brute', energy: 'Acid', name: `probe${i}` });
      if (d.seed === 'thrown-burst' || d.seed === 'own-turn-punisher') {
        sawBurst = true;
        expect(d.row.text).toMatch(/Acid damage/);
      }
    }
    expect(sawBurst).toBe(true);
    let sawPhys = false;
    for (let i = 0; i < 30 && !sawPhys; i += 1) {
      const d = drawLibraryRow(scaled, { archetype: 'brute', mix: 'physical', name: `probe${i}` });
      if (d.seed === 'thrown-burst' || d.seed === 'own-turn-punisher') {
        sawPhys = true;
        expect(d.row.text).toMatch(/(?:Bludgeoning|Piercing) damage/);
      }
    }
    expect(sawPhys).toBe(true);
  });

  test('the thrown-burst never joins an existing Recharge nova — print never fields two', () => {
    const nova = scaleDonor(pickDonor(22, null, 'dragon'), 22, { mechanics: [] }); // breath = damage-bearing Recharge
    for (let i = 0; i < 40; i += 1) {
      const d = drawLibraryRow(nova, { archetype: 'caster', energy: 'Cold', name: `probe${i}` });
      expect(d.seed).not.toBe('thrown-burst');
    }
  });

  test('an empty shelf returns null — the deletion stays the floor', () => {
    expect(drawLibraryRow(scaled, { archetype: 'no-such-archetype', name: 'x' })).toBeNull();
  });
});
