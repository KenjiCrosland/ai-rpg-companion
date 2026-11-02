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

// THE CONDITION RELATION IS ITS OWN QUESTION (owner's ruling, 2026-10-22).
//
// One nullable `imposes` was being asked to carry five different relationships a
// row can have to a condition — inflicts / requires / immune / self / none. The
// prompt already spelled all five out, and the call still answered
// `imposes: Deafened` for the Drowned Choir's One Voice, which GRANTS IMMUNITY to
// Deafened: a false `condition-duration` FAIL on a correct row. So the fix is not
// more instruction. It is asking the relation as its own enum and validating by
// MEMBERSHIP — the engine's half of the split.
//
// Measured alone before wiring (scripts/probe-condition-relation.mjs, 15
// hand-labelled rows × 3 runs): 42/45 exact, and 45/45 on the only distinction
// the engine acts on — inflicts vs not.
describe('condition_relation gates the imposes record', () => {
  const { parseAuthorResponse } = require('../author.mjs');
  const one = (imposes, relation) => JSON.stringify({
    attacks: [], saves: [], reactions: [], answered: [], unplaced: [],
    traits: [{
      clause: 'a clause', name: 'Test Row', trigger: 'when a creature touches it',
      effect: `the creature has the ${String(imposes).toLowerCase()} condition until the end of its next turn`,
      imposes, ...(relation === undefined ? {} : { condition_relation: relation }),
    }],
  });
  const read = (imposes, relation) => (parseAuthorResponse(one(imposes, relation))?.traits ?? [])[0];

  test('inflicts keeps the record — the row hands the condition out', () => {
    expect(read('Prone', 'inflicts')).toMatchObject({ imposes: 'Prone', condition_relation: 'inflicts' });
  });

  // the defect this fixes: One Voice is immune to Deafened and imposes nothing
  test.each(['immune', 'requires', 'self', 'none'])('%s drops the record', (rel) => {
    expect(read('Deafened', rel).imposes).toBeNull();
  });

  test('an answer with NO relation keeps the record — older answers are unchanged', () => {
    expect(read('Stunned', undefined)).toMatchObject({ imposes: 'Stunned', condition_relation: null });
  });

  test('an unknown relation falls back to the record rather than guessing', () => {
    expect(read('Charmed', 'sideways')).toMatchObject({ imposes: 'Charmed', condition_relation: null });
  });

  // STRENGTHENED (R9 · B4, forty #4). This asserted only that the RECORD was dropped —
  // and the row shipped anyway, carrying "the bewildered condition" in its sentence.
  // The Toll-Bell Wraith shipped exactly that shape ("is not subject to the sleep
  // condition"), which is meaningless at a table whatever the record says. The row is
  // now refused with its reason; the record behaviour for a REAL condition is unchanged
  // and every case above still holds.
  test('a condition that is not a real condition refuses the row, not just the record', () => {
    expect(read('Bewildered', 'inflicts')).toBeUndefined();
    const { parseAuthorResponse } = require('../author.mjs');
    const refused = parseAuthorResponse(one('Bewildered', 'inflicts')).refused;
    expect(refused[0].why).toMatch(/not a condition in this game/);
  });
});
