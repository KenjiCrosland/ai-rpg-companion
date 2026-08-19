/**
 * The donor chassis are held to the same laws as everything else — the
 * card's summed budget and the sprint's measured print shapes. The math is
 * enforced here, not trusted at authoring time.
 */
import { DONORS } from '../donors.mjs';
import { cardBudget, withinBudget } from '../card-budgets.mjs';

const avgOf = (text) => [...text.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].reduce((n, m) => n + Number(m[1]), 0);

describe('every template declares its provenance: cited XOR invented', () => {
  test('the catalog discipline applies to whole templates too', () => {
    for (const d of DONORS) {
      expect(`${d.id}: ${Boolean(d.cite) !== Boolean(d.invented) ? 'ok' : 'BAD PROVENANCE'}`).toBe(`${d.id}: ok`);
    }
  });
});

describe('authored donors obey the card', () => {
  for (const d of DONORS) {
    describe(d.id, () => {
      const rows = Object.entries(d.sections).flatMap(([sec, es]) => es.map((e) => ({ sec, ...e })));
      const card = cardBudget(d.cr, { legendary: !!d.legendary });

      test('AC, HP, attack, DC sit on the card line (±1 where the card rounds)', () => {
        expect(Math.abs(d.ac - card.ac)).toBeLessThanOrEqual(1);
        expect(Math.abs(d.hp - card.hp * (d.hp_scale ?? 1))).toBeLessThanOrEqual(15); // hp_scale = the measured flight tax (flyers 0.98 vs grounded 1.08)
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

describe('the mounted template line: full compositions, shape-frames as authoring vocabulary', () => {
  const { pickDonor: pdm } = require('../scale.mjs');
  test('style-matched selection with plain fallback', () => {
    expect(pdm(8, 'mounted').id).toBe('skirmisher-8-mounted');
    expect(pdm(10, 'mounted').id).toBe('skirmisher-8-mounted');
    expect(pdm(22, 'mounted').id).toBe('skirmisher-18-mounted');
    expect(pdm(8, 'hurler').id).toBe('skirmisher-8-hurler');
    expect(pdm(8, 'skulker').id).toBe('skirmisher-8-skulker');
    expect(pdm(3, 'hurler').id).toBe('skirmisher-8-hurler'); // below the line's floor -> its lowest seat
    expect(pdm(8, 'winged').id).toBe('skirmisher-8-winged'); // the winged line landed 2026-08-19
    expect(pdm(20, 'winged').id).toBe('skirmisher-18-winged'); // legendary seat scales up
    expect(pdm(20, 'hurler').id).toBe('skirmisher-18-hurler'); // hurler legendary seat closes the 18+ gap
    expect(pdm(8, 'burrower').id).toBe('skirmisher-8'); // a style with no line still falls to plain
    expect(pdm(8).id).toBe('skirmisher-8');
  });
  test('every mounted template carries the charger identity: trample nova, charge rider, runner speed', () => {
    const { DONORS: D } = require('../donors.mjs');
    const mounted = D.filter((d) => d.style === 'mounted');
    expect(mounted.length).toBe(4);
    for (const d of mounted) {
      const rows = Object.values(d.sections).flat();
      expect(rows.some((e) => /move through the spaces/.test(e.text))).toBe(true);
      expect(rows.find((e) => e.name === 'Melee Attack').text).toMatch(/straight line toward/);
      expect(d.speed).not.toMatch(/Climb/);
    }
  });
});
