// PRINTING EQUIVALENCE (the critic's test 6, 2026-10-20). Both saved printings
// of a block may differ in FORMAT as much as they like; they may not differ in
// STRUCTURE. This is the gate 4b asked for: a translator that cannot change
// rules cannot break them.
import { printingDifferences, rowStructure, equivalenceKey, rowsOfPrinting } from '../printing-equivalence.mjs';

const twenty24 = (rows) => ({ sections: { Actions: rows } });
const twenty14 = (rows) => ({ actions: rows.map((e) => ({ name: e.name, description: e.text })) });

describe('the comparator reads both idioms', () => {
  test("2024's \"Attack Roll:* +8\" and 2014's \"+8 to hit\" are the same bonus", () => {
    expect(rowStructure('*Melee Attack Roll:* +8, reach 5 ft. 13 (2d8 + 4) Slashing damage.').hit).toBe('8');
    expect(rowStructure('*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. 13 (2d8 + 4) slashing damage.').hit).toBe('8');
  });

  test("2024's capitalised conditions and 2014's lowercase ones are the same condition", () => {
    expect(rowStructure('the target has the Prone condition.').conds).toBe('prone');
    expect(rowStructure('the target is knocked prone.').conds).toBe('prone');
  });

  test('a comparator blind to that reports false differences — which it did on the first run', () => {
    const a = twenty24([{ name: 'Slam', text: '*Melee Attack Roll:* +8, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has the Prone condition.' }]);
    const b = twenty14([{ name: 'Slam', text: '*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. 13 (2d8 + 4) bludgeoning damage, and the target is knocked prone.' }]);
    expect(printingDifferences(a, b)).toEqual([]);
  });
});

describe('the gate catches a translator that changes rules', () => {
  test('a changed attack bonus is reported', () => {
    const a = twenty24([{ name: 'Slam', text: '*Melee Attack Roll:* +8, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.' }]);
    const b = twenty14([{ name: 'Slam', text: '*Melee Weapon Attack:* +6 to hit, reach 5 ft. 13 (2d8 + 4) bludgeoning damage.' }]);
    expect(printingDifferences(a, b)).toEqual([{ row: 'slam', field: 'hit', a: '8', b: '6' }]);
  });

  test('changed damage dice are reported', () => {
    const a = twenty24([{ name: 'Bite', text: '*Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Piercing damage.' }]);
    const b = twenty14([{ name: 'Bite', text: '*Melee Weapon Attack:* +7 to hit. 22 (3d8 + 4) piercing damage.' }]);
    expect(printingDifferences(a, b).map((d) => d.field)).toEqual(['dmg']);
  });

  test('a changed save stat or DC is reported', () => {
    const a = twenty24([{ name: 'Breath', text: '*Constitution Saving Throw*: DC 18, each creature in a 60-foot Cone. *Failure:* 54 (12d8) Fire damage.' }]);
    const b = twenty14([{ name: 'Breath', text: 'each creature must make a DC 15 Dexterity saving throw, taking 54 (12d8) fire damage.' }]);
    const fields = printingDifferences(a, b).map((d) => d.field).sort();
    expect(fields).toEqual(['dc', 'save']);
  });

  test('a dropped condition is reported — the Multiattack drift class', () => {
    const a = twenty24([{ name: 'Coil', text: '*Melee Attack Roll:* +9, reach 10 ft. 20 (3d10 + 4) Bludgeoning damage, and the target has the Grappled condition and the Restrained condition.' }]);
    const b = twenty14([{ name: 'Coil', text: '*Melee Weapon Attack:* +9 to hit. 20 (3d10 + 4) bludgeoning damage, and the target is grappled.' }]);
    expect(printingDifferences(a, b).map((d) => d.field)).toEqual(['conds']);
  });

  test('a row only one printing carries is the row-set question, not equivalence', () => {
    const a = twenty24([{ name: 'Slam', text: '*Melee Attack Roll:* +8. 13 (2d8 + 4) Bludgeoning damage.' }, { name: 'Gaze', text: 'A gaze.' }]);
    const b = twenty14([{ name: 'Slam', text: '*Melee Weapon Attack:* +8 to hit. 13 (2d8 + 4) bludgeoning damage.' }]);
    expect(printingDifferences(a, b)).toEqual([]);
  });
});

describe('the economy suffix and the edition term do not make a row look different', () => {
  test('a Reaction suffix and Wounded/Bloodied both normalise', () => {
    expect(equivalenceKey('Riposte (Reaction)')).toBe('riposte');
    expect(equivalenceKey('Wounded Burst')).toBe('bloodied burst');
    expect(equivalenceKey('Bloodied Burst')).toBe('bloodied burst');
    expect(equivalenceKey('Gale (Recharge 5-6)')).toBe('gale');
  });

  test('both printing shapes enumerate their rows', () => {
    expect(rowsOfPrinting(twenty24([{ name: 'A', text: 'x' }])).map((r) => r.name)).toEqual(['A']);
    expect(rowsOfPrinting({ abilities: [{ name: 'T', description: 'y' }], actions: [{ name: 'A', description: 'x' }] }).map((r) => r.name)).toEqual(['T', 'A']);
  });
});
