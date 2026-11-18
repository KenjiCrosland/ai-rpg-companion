/**
 * AN AREA ROW THAT TAKES AN ATTACK'S PLACE AT WILL DEALS HALF A HIT (owner's ruling R1, 2026-11-18).
 *
 * The Brass Tyrant's fist is 33 a hit — "19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage"
 * — and Molten Seam dealt 35 to every creature in a 60-foot line, every round, for the price of one
 * fist. The Glacierheart's Glacial Advance did 32 against a 34 hit and the Trenchsong Leviathan's
 * Brineplate Detonation 38 against 36. All three bodies are the fixtures below, copied from the run.
 *
 * The one-nova rule is what makes these at will: the chassis already holds the sheet's Recharge
 * nova, so the seat row's gate leaves and `forceUngated` reprices it to the Multiattack sum. That
 * sum is the wrong ceiling for a row offered IN AN ATTACK'S PLACE — the trade is one attack, not the
 * turn. Print offers 15 area rows in an attack's place and none of them deals damage at all.
 *
 * THE SECOND HALF OF THE RULING is `wholeHit`. Two passes read an attack's damage as the FIRST
 * number in its row, so the Brass Tyrant's fist counted as 19 rather than 33 — which is why the swap
 * gate never saw a 35-damage line as out-damaging it.
 */
import { wholeHit, priceAreaSwapAtHalfAHit } from '../generate.mjs';

const body = ({ cite = 'Molten Seam', rowName = 'Molten Seam', rowText, attack }) => ({
  Actions: [
    { name: 'Multiattack', text: `The brass tyrant makes two Brass Fist attacks. It can replace one attack with a use of ${cite}.` },
    { name: 'Brass Fist', text: attack ?? '*Melee Attack Roll:* +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.' },
    { name: rowName, text: rowText ?? '*Constitution Saving Throw*: DC 19, each creature in a 60-foot-long, 5-foot-wide Line. *Failure:* 35 (10d6) Fire damage. *Success:* Half damage only.' },
  ],
});
const rowOf = (s, name) => s.Actions.find((e) => e.name === name);

describe('a hit is the whole hit', () => {
  test("an attack's riders count toward its hit", () => {
    expect(wholeHit('*Melee Attack Roll:* +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.')).toBe(33);
    expect(wholeHit('*Melee Attack Roll:* +9, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage plus 13 (3d8) Cold damage.')).toBe(35);
    expect(wholeHit('*Melee Attack Roll:* +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.')).toBe(36);
  });

  test('a single-damage row reads as itself, and a row with no dice reads 0', () => {
    expect(wholeHit('*Melee Attack Roll:* +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.')).toBe(12);
    expect(wholeHit('The target has the Prone condition.')).toBe(0);
    expect(wholeHit(null)).toBe(0);
  });
});

describe("an area row in an attack's place deals half a hit", () => {
  test('THE BRASS TYRANT: 35 to a line against a 33 hit comes down to half a hit', () => {
    const s = body({});
    expect(wholeHit(rowOf(s, 'Molten Seam').text)).toBe(35);   // the defect is present
    expect(wholeHit(rowOf(s, 'Brass Fist').text)).toBe(33);

    const traced = [];
    priceAreaSwapAtHalfAHit(s, (...a) => traced.push(a.join(' ')));

    expect(wholeHit(rowOf(s, 'Molten Seam').text)).toBeLessThanOrEqual(17);
    expect(rowOf(s, 'Molten Seam').text).toMatch(/\*Success:\*\s*Half damage only/);
    expect(traced).toHaveLength(1);
  });

  test('a row with no save for half is given one', () => {
    const s = body({ rowText: '*Constitution Saving Throw*: DC 19, each creature in a 60-foot Line. *Failure:* 35 (10d6) Fire damage.' });
    priceAreaSwapAtHalfAHit(s, () => {});
    expect(rowOf(s, 'Molten Seam').text).toMatch(/\*Success:\*\s*Half damage only\.$/);
  });

  test('a rider on the row is kept and scaled with it, not dropped', () => {
    const s = body({ cite: 'Glacial Advance', rowName: 'Glacial Advance',
      attack: '*Melee Attack Roll:* +9, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage plus 13 (3d8) Cold damage.',
      rowText: '*Dexterity Saving Throw*: DC 18, each creature in a 60-foot-long, 5-foot-wide Line. *Failure:* 32 (5d12) Cold damage, and the target has the Prone condition. *Success:* Half damage only.' });
    s.Actions[0].text = 'The glacierheart makes two Brass Fist attacks. It can replace one attack with a use of Glacial Advance.';
    priceAreaSwapAtHalfAHit(s, () => {});
    const row = rowOf(s, 'Glacial Advance');
    expect(wholeHit(row.text)).toBeLessThanOrEqual(18);         // half of the 35 hit
    expect(row.text).toContain('the target has the Prone condition');
  });

  test('A ROW THAT KEEPS ITS RECHARGE is not touched — it paid with the gate', () => {
    const s = body({ cite: 'Molten Seam if available', rowName: 'Molten Seam (Recharge 5-6)' });
    const before = rowOf(s, 'Molten Seam (Recharge 5-6)').text;
    const traced = [];
    priceAreaSwapAtHalfAHit(s, (...a) => traced.push(a));
    expect(rowOf(s, 'Molten Seam (Recharge 5-6)').text).toBe(before);
    expect(traced).toEqual([]);
  });

  // TEXT_GATE is the engine's own list of limits a RENAME cannot remove, so a row carrying one is
  // as gated as a row with "(Recharge 5-6)" in its name.
  test('a row gated in its TEXT rather than its name is not touched either', () => {
    const s = body({ rowText: "*Constitution Saving Throw*: DC 19, each creature in a 60-foot Line. *Failure:* 35 (10d6) Fire damage. The tyrant does this the first time it is Bloodied in a fight." });
    const before = rowOf(s, 'Molten Seam').text;
    priceAreaSwapAtHalfAHit(s, () => {});
    expect(rowOf(s, 'Molten Seam').text).toBe(before);
  });

  test('a SINGLE-TARGET row in an attack\'s place is not an area and is not repriced', () => {
    const s = body({ rowText: '*Constitution Saving Throw*: DC 19, one creature within 10 feet. *Failure:* 35 (10d6) Fire damage.' });
    const before = rowOf(s, 'Molten Seam').text;
    priceAreaSwapAtHalfAHit(s, () => {});
    expect(rowOf(s, 'Molten Seam').text).toBe(before);
  });

  test('a row already at or under half a hit is left exactly as it is', () => {
    const s = body({ rowText: '*Constitution Saving Throw*: DC 19, each creature in a 60-foot Line. *Failure:* 14 (4d6) Fire damage. *Success:* Half damage only.' });
    const before = rowOf(s, 'Molten Seam').text;
    priceAreaSwapAtHalfAHit(s, () => {});
    expect(rowOf(s, 'Molten Seam').text).toBe(before);
  });

  test('running it twice changes nothing the second time', () => {
    const s = body({});
    priceAreaSwapAtHalfAHit(s, () => {});
    const once = rowOf(s, 'Molten Seam').text;
    const traced = [];
    priceAreaSwapAtHalfAHit(s, (...a) => traced.push(a));
    expect(rowOf(s, 'Molten Seam').text).toBe(once);
    expect(traced).toEqual([]);
  });

  test('a sheet with no Multiattack, or a citation naming no row, is left alone', () => {
    const s = body({ cite: 'Nothing At All' });
    const before = JSON.stringify(s);
    priceAreaSwapAtHalfAHit(s, () => {});
    expect(JSON.stringify(s)).toBe(before);
    expect(() => priceAreaSwapAtHalfAHit({}, () => {})).not.toThrow();
    expect(() => priceAreaSwapAtHalfAHit(null, () => {})).not.toThrow();
  });
});
