import { pickDonor, scaleDonor } from '../scale.mjs';
import { withinBudget } from '../card-budgets.mjs';

describe('stage 3: scaling to the card', () => {
  test('every pilot CR lands in the summed band', () => {
    for (const cr of [0.5, 1, 2, 5, 8, 12, 16, 20]) {
      const donor = pickDonor(cr, null, 'skirmisher');
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

describe('the flight tax (corpus sweep 2026-08-19: flyers 0.98 vs grounded 1.08)', () => {
  const { pickDonor: pdw, scaleDonor: sdw } = require('../scale.mjs');
  const { cardBudget: cbw } = require('../card-budgets.mjs');

  test('winged donors ship ~90% of card HP below the legendary tier; grounded lines ship full card; at 17+ the tax stops (print fliers are not lighter there — checker 2026-10-02)', () => {
    for (const cr of [3, 8, 13, 18]) {
      const winged = sdw(pdw(cr, 'winged', 'skirmisher'), cr);
      const plain = sdw(pdw(cr, null, 'skirmisher'), cr);
      const card = cbw(cr, { legendary: !!pdw(cr, 'winged', 'skirmisher').legendary });
      expect(winged.hp).toBe(cr >= 17 ? card.hp : Math.round(card.hp * 0.9));
      expect(plain.hp).toBe(cbw(cr, { legendary: !!pdw(cr, null, 'skirmisher').legendary }).hp);
    }
  });

  test('a winged donor keeps its Fly speed through scaling — the wildcard fly-guard opens', () => {
    expect(sdw(pdw(8, 'winged', 'skirmisher'), 8).speed).toMatch(/Fly \d+ ft\./);
  });
});
