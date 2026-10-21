import { parseAuthorResponse, validateAuthorResponse } from '../author.mjs';

describe('authoring into forms (fidelity pipeline step 5): the model never writes a number, the vocabularies are closed, the slots are enforced', () => {
  const keys = ['Melee Attack', 'Hybrid Attack'];
  test('numbers in a trait or reaction become engine tokens; an attack with an unknown type or a numeric name is dropped; the attack cap and rider slots hold', () => {
    const raw = JSON.stringify({
      attacks: [
        { key: 'Melee Attack', clause: 'greatsword', name: 'Greatsword', mode: 'melee', type: 'Slashing', rider: null },
        { key: 'Hybrid Attack', clause: 'tail', name: 'Tail Swipe', mode: 'melee', type: 'Bludgeoning', rider: 'Prone' },
        { key: null, clause: 'claws', name: 'Claw', mode: 'melee', type: 'Slashing', rider: 'Grappled' },
        { key: null, clause: 'bite', name: 'Bite', mode: 'melee', type: 'Piercing', rider: 'Frightened' },
        { key: null, clause: 'horns', name: 'Horn 2', mode: 'melee', type: 'Piercing' },
        { key: null, clause: 'spit', name: 'Spit', mode: 'ranged', type: 'Goo' },
      ],
      traits: [{ clause: 'fighting styles', name: 'Fighting Styles', trigger: null, effect: 'It deals 7 (2d6) extra damage and the DC 15 save is hard.' }],
      reactions: [], saves: [], crossRef: { riderRow: 'Tail Swipe', payoffRow: 'Bite', condition: 'Prone' }, unplaced: [{ clause: 'speaks only sock', where: 'languages', text: 'Sock' }],
    });
    const p = parseAuthorResponse(raw, { attackKeys: keys, attackCap: 4, riderSlots: 2, traitSlots: 1 });
    expect(p.attacks.map((a) => a.name)).toEqual(['Greatsword', 'Tail Swipe', 'Claw', 'Bite']); // cap 4; "Horn 2" (numeric) and "Spit" (unknown type) dropped
    expect(p.attacks.map((a) => a.rider)).toEqual([null, 'Prone', 'Grappled', null]); // two rider slots; the third rider folds to flavor
    expect(p.attacks[3].flavor).toMatch(/Frightened/);
    expect(p.traits[0].effect).toBe('It deals {dmg} extra damage and the DC {dc} save is hard.');
    expect(p.crossRef).toEqual({ riderRow: 'Tail Swipe', payoffRow: 'Bite', condition: 'Prone' });
    expect(p.unplaced[0]).toEqual({ clause: 'speaks only sock', where: 'languages', text: 'Sock' });
    expect(validateAuthorResponse(raw)).toBe(true); expect(validateAuthorResponse('{"attacks":[]}')).toBe(true); expect(validateAuthorResponse('not json')).toBe(false); // step 7: a well-formed answer with nothing to add is valid — "no row for this clause" is an answer, not a retry
  });
});

/**
 * "ALREADY ANSWERED" IS AN ANSWER (2026-10-21).
 *
 * Vashka the Red failed `owed-clause` for "never breaks ranks" while carrying
 * "Shield Wall Stance. ...refusing to yield while unbroken" — the row that
 * answers it. Coverage is decided by 4-character stem overlap, and
 * "breaks"/"ranks" share no stem with "unbroken"/"yield", so the clause reached
 * the repair call, which wrote nothing because the sheet already had it. The
 * call can now say which row answers it instead of returning an empty hand.
 */
describe('the repair call can name the row that already answers a clause', () => {
  const { parseAuthorResponse } = require('../author.mjs');

  it('parses an answered entry', () => {
    const r = parseAuthorResponse(JSON.stringify({
      attacks: [], saves: [], traits: [], reactions: [],
      answered: [{ clause: 'never breaks ranks', row: 'Shield Wall Stance' }],
    }));
    expect(r.answered).toEqual([{ clause: 'never breaks ranks', row: 'Shield Wall Stance' }]);
  });

  it('drops an entry missing either half', () => {
    const r = parseAuthorResponse(JSON.stringify({
      attacks: [], saves: [], traits: [], reactions: [],
      answered: [{ clause: 'holds its ground', row: '' }, { clause: '', row: 'Immovable' }, { row: 'x' }],
    }));
    expect(r.answered).toEqual([]);
  });

  it('defaults to an empty list, so an old-shaped answer still parses', () => {
    const r = parseAuthorResponse(JSON.stringify({ attacks: [], saves: [], traits: [], reactions: [] }));
    expect(r.answered).toEqual([]);
  });

  it('keeps answered beside real rows — a call may do both', () => {
    const r = parseAuthorResponse(JSON.stringify({
      attacks: [], saves: [], reactions: [],
      traits: [{ clause: 'wreathed in frost', name: 'Frost Shroud', trigger: null, effect: 'A creature within 5 feet takes {dmg} Cold damage.' }],
      answered: [{ clause: 'never breaks ranks', row: 'Shield Wall Stance' }],
    }));
    expect(r.traits).toHaveLength(1);
    expect(r.answered).toHaveLength(1);
  });
});
