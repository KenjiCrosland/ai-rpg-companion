/**
 * ROUND TWO, PART A — what the GM typed about the creature reaches the top of the sheet.
 * A1 the bound row is read before the spells; A2 a typed fact is checked against the top;
 * A3 typed HP either way round; A4 a print body is the monster the call named or there is none;
 * A5 a distance the creature moves its target is not its walking speed.
 */
import { buildLedger, typedFactIn, factOnSheet, printCanonFor } from '../generate.mjs';

describe('A1 — the bound row is read before the spells', () => {
  const SPELLS = new Set(['Cone of Cold', 'Shield', 'Hold Person']);
  it('a bound row that is not a spell list answers a clause holding a spell name', () => {
    const led = buildLedger({
      sections: { Actions: [{ name: 'Cone of Cold (Recharge 5-6)', text: '*Constitution Saving Throw*: DC 15, each creature in a 15-foot Cone.', clauseId: 'c1' }] },
      clauses: [{ id: 'c1', text: 'cone of cold breath recharge 5-6', kind: 'mechanical' }],
      spellNames: SPELLS,
    });
    expect(led[0].status).toBe('answered');
  });

  it('a bound SPELL list must still hold the spell the clause names', () => {
    const led = buildLedger({
      sections: { Actions: [{ name: 'Spellcasting', text: 'casts one of the following spells: At will: Mage Hand', clauseId: 'c1' }] },
      clauses: [{ id: 'c1', text: 'casts hold person', kind: 'mechanical' }],
      spellNames: SPELLS,
    });
    expect(led[0]).toMatchObject({ status: 'open', reason: 'spell-missing' });
  });

  it('an unbound clause on a sheet with no spell list reads never-written', () => {
    const led = buildLedger({
      sections: { Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +7, reach 5 ft.' }] },
      clauses: [{ id: 'c1', text: 'casts hold person', kind: 'mechanical' }],
      spellNames: SPELLS,
    });
    expect(led[0]).toMatchObject({ status: 'open', reason: 'never-written' });
  });
});

describe('A2 — a typed fact is checked against the top of the sheet', () => {
  const sheet = (over) => ({ ac: 17, hp: 110, size: 'Large', speed: '30 ft.', sections: { Actions: [{ name: 'Multiattack', text: 'Iress makes three attacks, using Rapier or Kick.' }] }, ...over });
  const led = (text, over) => buildLedger({ sections: sheet(over).sections, clauses: [{ id: 'c1', text, kind: 'mechanical' }], sheet: sheet(over) });

  it('reads answered when the sheet agrees, and is an entry of its own kind', () => {
    expect(led('AC 17')[0]).toMatchObject({ kind: 'fact', field: 'ac', status: 'answered', typed: 17 });
    expect(led('should get 3 attacks')[0]).toMatchObject({ kind: 'fact', field: 'attacks', status: 'answered' });
  });

  it('reads mismatch with both values when it does not', () => {
    const e = led('around 110 HP', { hp: 157 })[0];
    expect(e).toMatchObject({ kind: 'fact', field: 'hp', status: 'mismatch', typed: 110, onSheet: 157 });
    expect(e.detail).toMatch(/typed 110; the sheet reads 157/);
  });

  it('facts are not counted among the asks', () => {
    const l = buildLedger({
      sections: sheet().sections,
      clauses: [{ id: 'c1', text: 'AC 17', kind: 'mechanical' }, { id: 'c2', text: 'heals when he kills', kind: 'mechanical' }],
      sheet: sheet(),
    });
    expect(l.filter((e) => e.kind === 'fact')).toHaveLength(1);
    expect(l.filter((e) => e.kind !== 'fact' && e.status !== 'header')).toHaveLength(1);
  });

  it('reads the sheet\'s own field, including an immunity', () => {
    expect(factOnSheet({ condition_immunities: ['Charmed'] }, 'immune')).toMatch(/Charmed/);
  });
});

describe('A3 — typed HP, whichever way round', () => {
  it.each(['around 110 HP', '110 hp', 'HP 110', '110 hit points'])('%s sets HP', (t) => {
    expect(typedFactIn(t)).toEqual({ field: 'hp', value: 110 });
  });

  it.each(['110 feet', 'level 15', '2d8'])('%s does not', (t) => {
    const f = typedFactIn(t);
    expect(f === null || f.field !== 'hp').toBe(true);
  });
});

// A4 HAS NO TEST, BECAUSE A4 IS NOT BUILT. The rule Fable set is right — a corpus entry must hold
// every word the path call named — but the place I put it fires on nothing: printCanonFor returns
// null for "Assassin Vine" at every CR, so the function I guarded already refuses it. The name is
// resolved earlier, in path.mjs, which answers "Assassin" for the words "assassin vine". A test
// here would pass with the change removed, so by the rule it is not written. Reported instead.

describe('A5 — a distance the creature moves its target is not its walking speed', () => {
  it.each(['pulls 10 ft', 'pushes 15 feet', 'knocks back 20 ft', 'teleports 30 ft'])('%s sets no speed', (t) => {
    const f = typedFactIn(t);
    expect(f === null || f.field !== 'speed').toBe(true);
  });

  it.each([['30 feet of movement', 30], ['speed 20 feet', 20], ['moves 40 ft', 40]])('%s still sets it', (t, v) => {
    expect(typedFactIn(t)).toEqual({ field: 'speed', value: v });
  });

  it("the canary's typed speed still lands", () => {
    expect(typedFactIn('AC 20, Huge, speed 20 feet')).toMatchObject({ field: 'ac', value: 20 });
    expect(typedFactIn('speed 20 feet')).toEqual({ field: 'speed', value: 20 });
  });
});
