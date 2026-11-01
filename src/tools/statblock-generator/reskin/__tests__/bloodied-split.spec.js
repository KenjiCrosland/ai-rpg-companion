/**
 * THE SWARM'S BLOODIED SPLIT IS ONE ATTACK AT TWO RATES — one definition.
 *
 * print's seven swarms write "10 (4d4) damage, or 5 (2d4) damage if the swarm is
 * Bloodied": a single hit priced twice. Any consumer summing a row's dice must
 * strip the second rate, and two live copies of that strip existed and disagreed.
 * It cost two false readings a fortnight apart:
 *   - "135 damage" (2026-10-30), a sum of all four numbers;
 *   - a CR 13 swarm read as 79 and FAILED on the single-target ceiling
 *     (2026-11-01) where the true hit is 53 — a soft at 1.04x.
 * The second was the TWO-COMPONENT form the engine writes once a rider rides the
 * bite; the old pattern allowed one component before "if" and matched nothing, so
 * it stripped nothing.
 */
import { stripBloodiedSplit } from '@/tools/statblock-generator/format-2024/lint.mjs';

const sum = (t) => [...t.matchAll(/(\d+) \(\d+d\d+(?:\s*[+-]\s*\d+)?\)/g)].reduce((a, m) => a + Number(m[1]), 0);
const hit = (t) => sum(stripBloodiedSplit(t));

describe('one strip, every form the engine and print write', () => {
  it.each([
    ['two components, rendered (the 2026-11-01 FAIL)', '*Melee Attack Roll:* +10, reach 5 ft. 32 (6d8 + 5) Bludgeoning damage plus 21 (6d6) Necrotic damage, or 16 (3d10) Bludgeoning damage plus 10 (3d6) Necrotic damage if the swarm is Bloodied.', 53],
    ['one component, rendered (the 2026-10-30 forty)', '*Melee Attack Roll:* +10, reach 5 ft. 90 (19d8 + 5) Necrotic damage, or 45 (9d8 + 5) Necrotic damage if the swarm is Bloodied.', 90],
    ['tokenised, as scale.mjs writes it', '*Melee Attack Roll:* +10, reach 5 ft. 54 (11d8 + 5) {damage_type} damage plus 36 (8d8) {damage_type_2} damage, or 27 (5d8) {damage_type} damage plus 18 (4d8) {damage_type_2} damage if the creature is Bloodied.', 90],
    ['no type word, as print\'s rat swarm writes it', '*Melee Attack Roll:* +4, reach 5 ft. 10 (4d4) damage, or 5 (2d4) damage if the creature is Bloodied.', 10],
    ['no split at all', '*Melee Attack Roll:* +14, reach 10 ft. 22 (3d8 + 9) Piercing damage.', 22],
    ['em-dash, interposed, plus-component AFTER (print\'s Venomous Snakes)', '*Melee Attack Roll:* +6, reach 5 ft. 8 (1d8 + 4) Piercing damage—or 6 (1d4 + 4) Piercing damage if the swarm is Bloodied—plus 10 (3d6) Poison damage.', 18],
  ])('%s', (_l, text, want) => { expect(hit(text)).toBe(want); });

  it('every print swarm row it was derived from strips to its first rate', () => {
    const printBlocks = require('@/data/srd52-monsters.json');
    const rows = printBlocks.filter((b) => /Swarm/.test(b.name))
      .flatMap((b) => Object.values(b.sections ?? {}).flat())
      .filter((r) => /Bloodied/.test(String(r?.text ?? '')));
    expect(rows.length).toBeGreaterThanOrEqual(6);
    for (const r of rows) {
      // the first "N (" in a row can be the ATTACK BONUS — "+5 (with Advantage
      // if …)" on the Swarm of Piranhas — so the damage components are read, not
      // the first parenthesis. My first cut of this test failed on that, and the
      // code was right.
      const outside = stripBloodiedSplit(r.text);
      expect(outside).not.toMatch(/Bloodied/);            // the clause is gone
      expect(hit(r.text)).toBe(sum(outside));             // and only what remains is counted
      expect(hit(r.text)).toBeLessThan(sum(String(r.text)));  // strictly less than the naive sum
    }
  });
});
