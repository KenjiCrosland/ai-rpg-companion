/**
 * The donor chassis are held to the same laws as everything else — the
 * card's summed budget and the sprint's measured print shapes. The math is
 * enforced here, not trusted at authoring time.
 */
import { DONORS } from '../donors.mjs';
import { cardBudget, withinBudget } from '../card-budgets.mjs';

const avgOf = (text) => [...text.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].reduce((n, m) => n + Number(m[1]), 0);

describe('authored donors obey the card', () => {
  for (const d of DONORS) {
    describe(d.id, () => {
      const rows = Object.entries(d.sections).flatMap(([sec, es]) => es.map((e) => ({ sec, ...e })));
      const card = cardBudget(d.cr, { legendary: !!d.legendary });

      test('AC, HP, attack, DC sit on the card line (±1 where the card rounds)', () => {
        expect(Math.abs(d.ac - card.ac)).toBeLessThanOrEqual(1);
        expect(Math.abs(d.hp - card.hp)).toBeLessThanOrEqual(15);
        expect(d.atk).toBe(card.atk);
        expect(Math.abs(d.dc - card.dc)).toBeLessThanOrEqual(1);
      });

      test('the summed damage budget lands in band', () => {
        const attacks = Number(/makes (\w+)/.exec(rows.find((r) => r.name === 'Multiattack').text)[1]
          .replace('two', 2).replace('three', 3));
        const perHit = avgOf(rows.find((r) => r.name === 'Melee Attack').text);
        let sustained = attacks * perHit;
        for (const r of rows.filter((x) => x.sec === 'Legendary Actions' && !x.rules)) {
          if (/one Melee Attack/.test(r.text)) sustained += perHit;
          if (/makes one Ranged Attack/.test(r.text)) sustained += avgOf(rows.find((x) => x.name === 'Ranged Attack').text);
        }
        const novas = rows.filter((r) => r.gate).map((r) => ({ avg: avgOf(r.text), gate: r.gate }));
        const { ok, target, actual } = withinBudget(d.cr, sustained, novas, { legendary: !!d.legendary });
        expect(`${d.id}: ${actual} vs ${target} -> ${ok ? 'in band' : 'OUT OF BAND'}`)
          .toBe(`${d.id}: ${actual} vs ${target} -> in band`);
      });

      test('print shapes: melee floor, exit BA, one Recharge, unique names, a wildcard slot', () => {
        if (d.cr >= 5) expect(rows.some((r) => /Melee Attack Roll/.test(r.text))).toBe(true);
        expect(rows.some((r) => r.sec === 'Bonus Actions' && /Dash, Disengage, or Hide/.test(r.text))).toBe(true);
        expect(rows.filter((r) => /Recharge/.test(r.gate ?? '')).length).toBeLessThanOrEqual(1);
        const names = rows.map((r) => r.name);
        expect(new Set(names).size).toBe(names.length);
        expect(rows.filter((r) => r.wildcard_slot).length).toBe(1);
      });

      if (d.legendary) {
        test('the legendary menu: 3 options, at least one unlocked, generic-skirmisher economy', () => {
          const legs = rows.filter((r) => r.sec === 'Legendary Actions' && !r.rules);
          expect(legs.length).toBe(3);
          expect(legs.some((r) => !/can't take this action again/.test(r.text))).toBe(true);
        });
      }
    });
  }
});
