import { cardBudget, summedDPR, withinBudget } from '../card-budgets.mjs';

describe('the 2024 business card, transcribed', () => {
  test('CR 8 matches the engine the corpus already validated: AC 17, +8, DC 15, HP 135', () => {
    expect(cardBudget(8)).toEqual({ hp: 135, dpr: 60, atk: 8, ac: 17, dc: 15 });
  });

  test('the card anchors: CR 1/2, CR 20, CR 26', () => {
    expect(cardBudget(0.5)).toEqual({ hp: 24, dpr: 8, atk: 4, ac: 14, dc: 11 });
    expect(cardBudget(20)).toMatchObject({ hp: 315, dpr: 150 });
    expect(cardBudget(26)).toMatchObject({ hp: 615, dpr: 225 });
  });

  test('legendary v2 adjustments: +25% damage; CR 13-17 trades 20% HP for 45% damage', () => {
    expect(cardBudget(10, { legendary: true }).dpr).toBe(95); // 75 -> x1.25 -> round up to 5
    const mid = cardBudget(15, { dragon: true });
    expect(mid.hp).toBe(192); // 240 x 0.8
    expect(mid.dpr).toBe(170); // 7.5x15 -> 115 -> x1.45 -> 166.75 -> up to 170
  });

  test('summed budget: the Skorvith shape fails, the repaired shape passes', () => {
    expect(withinBudget(8, 27, []).ok).toBe(false); // 27 sustained, no nova, target 60
    expect(withinBudget(8, 30, [{ avg: 45, gate: 'Recharge 5-6' }]).ok).toBe(true);
    expect(summedDPR(30, [{ avg: 45, gate: 'Recharge 5-6' }])).toBe(50);
  });
});
