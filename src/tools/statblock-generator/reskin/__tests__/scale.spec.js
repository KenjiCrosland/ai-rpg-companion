import { pickDonor, scaleDonor } from '../scale.mjs';
import { withinBudget } from '../card-budgets.mjs';

describe('stage 3: scaling to the card', () => {
  test('every pilot CR lands in the summed band', () => {
    for (const cr of [0.5, 1, 2, 5, 8, 12, 16, 20]) {
      const donor = pickDonor(cr);
      const s = scaleDonor(donor, cr);
      const rows = Object.entries(s.sections).flatMap(([sec, es]) => es.map((e) => ({ sec, e })));
      const avgOf = (t) => [...t.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].reduce((n, m) => n + Number(m[1]), 0);
      const attacks = Number(/makes (\w+)/.exec(rows.find((r) => r.e.name === 'Multiattack').e.text)[1].replace('two', 2).replace('three', 3));
      let sustained = attacks * avgOf(rows.find((r) => r.e.name === 'Melee Attack').e.text);
      for (const r of rows.filter((x) => x.sec === 'Legendary Actions' && /makes one/.test(x.e.text))) sustained += avgOf(rows.find((x) => x.e.name === (/Melee/.test(r.e.text) ? 'Melee Attack' : 'Ranged Attack')).e.text);
      const novas = rows.filter((r) => r.e.gate).map((r) => ({ avg: avgOf(r.e.text), gate: r.e.gate }));
      const { ok, actual, target } = withinBudget(cr, sustained, novas, { legendary: !!s.legendary });
      expect(`CR ${cr} (donor ${donor.id}): ${actual} vs ${target} ${ok ? 'in band' : 'OUT'}`)
        .toBe(`CR ${cr} (donor ${donor.id}): ${actual} vs ${target} in band`);
      expect(s.ac).toBeGreaterThan(12);
      expect(rows.every((r) => !/DC (?!\d)/.test(r.e.text))).toBe(true);
    }
  });
});
