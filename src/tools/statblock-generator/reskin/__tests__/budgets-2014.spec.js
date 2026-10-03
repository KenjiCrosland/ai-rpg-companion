// THE 2014 CARD (2026-10-02): a 2014 sheet budgets against the DMG table — the
// flat 0.7 damage discount undershot it (a CR 10 horseman sustained 38 vs 63-68).
import { cardBudget, withinBudget, summedDPR } from '../card-budgets.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';

describe('the flight tax stops at the legendary tier (checker 2026-10-02)', () => {
  test('a winged skirmisher at CR 19 keeps the card\'s HP; at CR 8 it still pays the 0.9', () => {
    const hi = scaleDonor(pickDonor(19, 'winged', 'skirmisher'), 19, { mechanics: [] });
    expect(hi.hp).toBe(cardBudget(19, { legendary: true }).hp);
    const lo = scaleDonor(pickDonor(8, 'winged', 'skirmisher'), 8, { mechanics: [] });
    expect(lo.hp).toBeLessThan(cardBudget(8, {}).hp);
  });
});

describe('the 2024 card at 18–20 tracks print (checker 2026-10-02)', () => {
  test('HP climbs 5 a CR above 17: 270 / 290 / 310 / 330; CR 21 keeps its own line', () => {
    expect([17, 18, 19, 20, 21].map((cr) => cardBudget(cr, {}).hp)).toEqual([270, 290, 310, 330, 365]);
  });
});

describe('a deep HP discount eases at the legendary tier (checker 2026-10-02)', () => {
  test('a phantom lurker at CR 24 keeps at least 0.85 of the card; at CR 5 it keeps its own deep ratio', () => {
    const hi = scaleDonor(pickDonor(24, 'phantom', 'lurker'), 24, { mechanics: [] });
    expect(hi.hp).toBeGreaterThanOrEqual(Math.round(cardBudget(24, { legendary: true }).hp * 0.85) - 1);
    const lo = scaleDonor(pickDonor(5, 'phantom', 'lurker'), 5, { mechanics: [] });
    expect(lo.hp).toBeLessThan(cardBudget(5, {}).hp * 0.8);
  });
});

describe('discounts never stack below 0.85 of the card from CR 7 (checker 2026-10-02)', () => {
  test('a hovering CR 13 warden keeps 0.85 of the card; a CR 5 one still pays both', () => {
    const hi = scaleDonor(pickDonor(13, null, 'defender'), 13, { mechanics: [], movement: ['fly'] });
    expect(hi.hp).toBeGreaterThanOrEqual(Math.round(cardBudget(13, {}).hp * 0.85));
    const lo = scaleDonor(pickDonor(5, null, 'defender'), 5, { mechanics: [], movement: ['fly'] });
    expect(lo.hp).toBeLessThan(Math.round(cardBudget(5, {}).hp * 0.85));
  });
});

describe('the 2014 card reads the DMG table', () => {
  test('CR 10: HP 178 (print 2014\'s median at the CR — the table\'s 213 was never print), AC 17, +7, DC 16, 66 damage a round', () => {
    expect(cardBudget(10, { edition: '2014' })).toMatchObject({ hp: 178, ac: 17, atk: 7, dc: 16, dpr: 66, edition: '2014' });
    expect(cardBudget(0.5, { edition: '2014' })).toMatchObject({ hp: 21, ac: 13, atk: 3, dc: 13, dpr: 7 });
    expect(cardBudget(10, {})).not.toHaveProperty('edition'); // 2024 unchanged
    expect(cardBudget(10, {}).dpr).toBe(75);
  });
  test('a 2014 mounted skirmisher at CR 10 lands in the DMG band by the DMG method (three rounds, the nova counted once at two targets)', () => {
    const s = scaleDonor(pickDonor(10, 'mounted', 'skirmisher'), 10, { mechanics: [], edition: '2014' });
    expect(s.hp).toBe(178); expect(s.atk).toBe(7); expect(s.dc).toBe(16);
    const rows = Object.values(s.sections).flat();
    const melee = rows.find((e) => e.name === 'Melee Attack');
    const avgs = (melee.text.match(/(\d+) \(\d+d\d+(?: \+ \d+)?\)/g) ?? []).map((m) => Number(/^\d+/.exec(m)[0]));
    const perHit = avgs[0] + (avgs[1] ?? 0); // base plus the always-on rider; the charge clause is conditional
    const attacks = Number(/makes (\w+)/.exec(rows.find((e) => e.name === 'Multiattack').text)[1].replace('two', 2).replace('three', 3));
    const nova = rows.find((e) => /Trampling Rush/.test(e.name));
    const novaAvg = Number(/(\d+) \(/.exec(nova.text)[1]);
    const { ok, actual, target } = withinBudget(10, perHit * attacks, [{ avg: novaAvg, gate: nova.gate }], { edition: '2014' });
    expect(target).toBe(66); expect(ok).toBe(true); expect(actual).toBeGreaterThanOrEqual(59);
    expect(perHit * attacks).toBeGreaterThanOrEqual(45); // sustained alone sits above two thirds of the band, not half
  });
  test('a 2014 sheet\'s HP is print 2014\'s median at the CR, whatever the donor (the SRD 5.1 is the 2014 corpus — critic\'s release audit 2026-10-03)', () => {
    const { hpAim2014 } = require('../print-2014.mjs');
    for (const [cr, style, arch] of [[7, 'leader', 'defender'], [12, 'binder', 'caster'], [17, null, 'brute'], [8, 'grappler', 'brute'], [10, 'mounted', 'skirmisher'], [3, null, 'lurker'], [1, null, 'skirmisher']]) {
      const s = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [], edition: '2014' });
      expect([`${arch}-${style} @ ${cr}`, s.hp]).toEqual([`${arch}-${style} @ ${cr}`, hpAim2014(cr)]);
    }
    expect(hpAim2014(1)).toBeLessThan(40); // print 2014 CR 1 sits at 19–37
  });
  test('summedDPR is the DMG method: a nova round replaces a sustained round, counted at two targets for an area', () => {
    expect(summedDPR(40, [])).toBe(40);
    expect(summedDPR(40, [{ avg: 60, gate: 'Recharge 5-6' }])).toBeCloseTo((120 + Math.max(0, 120 - 40)) / 3, 5);
  });
});
