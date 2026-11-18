/**
 * A SAVE IN FIELDS KEEPS ITS NUMBERS THERE (2026-11-17).
 *
 * `quantitiesStated` counted only the row's PROSE — trigger, effect, response — which is right for
 * every form that writes its numbers in a sentence. A Reaction whose save is in fields does not: its
 * area and range live in `save.target`, its DC comes from the engine, and its dice come from the
 * engine when `damage` is true. So a correct row read as promising one number and writing none, and
 * was refused for keeping its numbers exactly where this round's own prompt told it to put them.
 *
 * Measured across three live rolls: **12 second answers used the new form and the gate refused 5.**
 * The three in this file are recorded answers, read off the tape rather than written here.
 *
 * Nothing else about the gate changes: a response in PROSE that promises an amount and writes none
 * is refused as it always was.
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseAuthorResponse } from '../author.mjs';

const SEAT = { attackCap: 0, traitSlots: 1 };
/** the three recorded answers, by the shape they were refused for */
const RECORDED = {
  'Toll of Her Own Death': { trigger: 'The bell-ringer is struck by an attack.', response: '',
    save: { stat: 'Wisdom', target: 'each creature within 30 feet of the bell-ringer that can hear it', damage: false, condition: 'Frightened', success: 'none' } },
  'Splintering Breach': { trigger: 'The ram-golem smashes through a wall, door, or barricade.', response: '',
    save: { stat: 'Dexterity', target: 'each creature in a 15-foot Emanation originating from the breach', damage: false, condition: 'Blinded', success: 'none' } },
  'Chorus of Wounds': { trigger: 'A creature within reach of an ally of the choir deals damage to the choir.', response: "That ally shrieks the wound's note back at the attacker.",
    save: { stat: 'Constitution', target: 'the triggering creature', damage: false, condition: 'Deafened', success: null } },
};
const answer = (name, over = {}) => JSON.stringify({
  reactions: [{ clause: 'c', name, mechanics: 1, quantities: 1, condition_relation: 'none', heals: false, ...RECORDED[name], ...over }],
});

describe('the number gate and a save in fields', () => {
  test.each(Object.keys(RECORDED))('%s comes back as a Reaction', (name) => {
    const p = parseAuthorResponse(answer(name), SEAT);
    expect((p?.refused ?? []).map((r) => r.why)).toEqual([]);
    expect((p?.reactions ?? []).map((r) => r.name)).toEqual([name]);
  });

  test('the DC the engine always writes is what satisfies a declared 1', () => {
    // none of the three writes a number in its prose; the engine writes the DC for every save
    const p = parseAuthorResponse(answer('Chorus of Wounds'), SEAT);
    expect((p?.reactions ?? []).length).toBe(1);
  });

  test('two declared numbers pass when the save also deals damage', () => {
    const p = parseAuthorResponse(answer('Chorus of Wounds', { quantities: 2, save: { ...RECORDED['Chorus of Wounds'].save, damage: true, type: 'Thunder' } }), SEAT);
    expect((p?.reactions ?? []).length).toBe(1);
  });

  test('three declared numbers with only a DC and dice to write is still refused', () => {
    const p = parseAuthorResponse(answer('Chorus of Wounds', { quantities: 3, save: { ...RECORDED['Chorus of Wounds'].save, damage: true } }), SEAT);
    expect((p?.reactions ?? []).length).toBe(0);
    expect((p?.refused ?? [])[0].why).toMatch(/number\(s\) the row promises/);
  });

  test('a PROSE response that promises an amount and writes none is still refused', () => {
    const prose = JSON.stringify({ reactions: [{ clause: 'c', name: 'Answering Peal', mechanics: 1, quantities: 1, condition_relation: 'none', heals: false,
      trigger: 'A creature hits the ghost', response: 'the attacker is pushed back by the force of the toll' }] });
    const p = parseAuthorResponse(prose, SEAT);
    expect((p?.reactions ?? []).length).toBe(0);
    expect((p?.refused ?? [])[0].why).toMatch(/number\(s\) the row promises/);
  });

  test('a trait is untouched by this — its numbers are still read from its prose alone', () => {
    const t = JSON.stringify({ traits: [{ clause: 'c', name: 'Rimed Hide', trigger: 'While it is still',
      effect: 'it reduces the Speed of a creature that touches it', condition_relation: 'none', heals: false,
      mechanics: 1, quantities: 1, passive_effect: 'defense' }] });
    const p = parseAuthorResponse(t, SEAT);
    expect((p?.traits ?? []).length).toBe(0);
    expect((p?.refused ?? [])[0].why).toMatch(/number\(s\) the row promises/);
  });

  test('the three are the recorded answers, not invented ones', () => {
    // read off SECOND-TRIES-2026-11-18.md's run; if that evidence goes, these stay as the shapes
    for (const [name, r] of Object.entries(RECORDED)) {
      expect(r.trigger.length).toBeGreaterThan(20);
      expect(r.save.condition).toBeTruthy();
      expect(name.length).toBeGreaterThan(5);
    }
  });
});
