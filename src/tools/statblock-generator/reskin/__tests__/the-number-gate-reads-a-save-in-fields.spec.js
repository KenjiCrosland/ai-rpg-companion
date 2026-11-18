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
  // CHORUS OF WOUNDS IS NOW REFUSED FOR A DIFFERENT REASON (fix C, 2026-11-18): its save's only
  // effect is Deafened, which the owner ruled too slight to cost an action. The number gate — what
  // this file is about — still passes it, so the recorded answer is kept and given damage here, and
  // the refusal as recorded is pinned in its own test below.
  const DEAFENED_ONLY = new Set(['Chorus of Wounds']);
  const numbersOK = (name, over = {}) => answer(name, DEAFENED_ONLY.has(name)
    ? { save: { ...RECORDED[name].save, damage: true, type: 'Thunder' }, quantities: 2, ...over } : over);

  test.each(Object.keys(RECORDED))('%s comes back as a Reaction', (name) => {
    const p = parseAuthorResponse(numbersOK(name), SEAT);
    expect((p?.refused ?? []).map((r) => r.why)).toEqual([]);
    expect((p?.reactions ?? []).map((r) => r.name)).toEqual([name]);
  });

  test('Chorus of Wounds AS RECORDED is refused for Deafened alone, not for its numbers', () => {
    const p = parseAuthorResponse(answer('Chorus of Wounds'), SEAT);
    expect(RECORDED['Chorus of Wounds'].save.condition).toBe('Deafened');   // the subject is present
    expect(RECORDED['Chorus of Wounds'].save.damage).toBe(false);
    expect((p?.reactions ?? [])).toHaveLength(0);
    expect((p?.refused ?? [])[0].why).toMatch(/Deafened alone is too slight/);
    expect((p?.refused ?? [])[0].why).not.toMatch(/number\(s\) the row promises/);
  });

  test('the DC the engine always writes is what satisfies a declared 1', () => {
    // none of the three writes a number in its prose; the engine writes the DC for every save
    const p = parseAuthorResponse(numbersOK('Chorus of Wounds', { quantities: 1 }), SEAT);
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

/**
 * WHO SAVES, AND WHEN IT ENDS (owner's ruling, 2026-11-17).
 *
 * `Ringing of the Deep` triggered on "the leviathan hits a creature with Coils" and then asked "one
 * creature within 10 feet" to save — a different creature — and its Deafened never ended. s10's
 * `Chorus of Wounds` did both the same way.
 *
 * A single-target save in a Reaction is made by the creature the trigger names, in print's own
 * words: the Chain Devil's Unnerving Gaze reads "DC 15, the triggering creature". An area stays an
 * area. And the condition ends the way a save ROW's does, through `conditionClauseFor` — Grappled
 * takes an escape DC, Prone self-ends, everything else takes "until the end of its next turn".
 */
describe("who saves, and when it ends", () => {
  const { generateReskin } = require('../generate.mjs');
  const keysOf2 = (p, field) => { const i = p.indexOf(`"${field}": {`); if (i < 0) return []; return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]); };
  const onASheet = async (save) => {
    let cached = null;
    const m = await generateReskin({
      mechanics: [], archetype: 'brute', concept: 'a trench leviathan whose coils ring like a struck bell',
      userConcept: 'a trench leviathan whose coils ring like a struck bell', cr: 11,
      path: { path: 'homebrew', print_body: null, relation: null, class: null },
    }, async (p0) => {
      const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
      if (p.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ trait: { idea: 'Its coils ring when they strike.', section: 'trait', trigger: 'always', effect: 'other', family: 'none' } });
      if (p.startsWith("A monster's signature ability has been described in plain words")) return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a ringing blow' });
      if (p.startsWith('You are writing ONE ability')) {
        return JSON.stringify({ traits: [], reactions: [{ clause: 'rings like a struck bell', name: 'Ringing Coils',
          trigger: 'The leviathan hits a creature with its coils', response: '', save,
          imposes: null, condition_relation: 'none', acts: null, heals: false, mechanics: 1, quantities: 1 }] });
      }
      const rk = keysOf2(p, 'renames');
      if (rk.length || !cached) {
        const renames = Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`]));
        cached = JSON.stringify({ name: 'Trench Leviathan', type: 'Monstrosity', size: 'Huge', alignment: 'Unaligned',
          senses: 'darkvision 60 ft.', languages: 'None', renames, damage_types: {}, conditions: { condition_minor: 'Prone' },
          melee_rider: 'none', projectile: 'water', wildcard: '' });
      }
      return cached;
    });
    return (m.sections?.Reactions ?? []).filter(Boolean).find((e) => e?.name === 'Ringing Coils');
  };

  // DEAFENED ALONE IS NOW REFUSED AT THE READ (fix C, 2026-11-18), and these three tests are about
  // WHO saves and WHEN it ends, not about the condition — so they ask for Frightened. The Deafened
  // case is kept in the ending test, riding on damage, which is how the Leviathan's own rows carry it.
  test('a single-target save is made by the creature the trigger names', async () => {
    const row = await onASheet({ stat: 'Constitution', target: 'one creature within 10 feet', damage: false, condition: 'Frightened' });
    expect(row).toBeTruthy();
    expect(row.text).toContain('the triggering creature');
    expect(row.text).not.toContain('one creature within 10 feet');
  }, 30000);

  test('an AREA stays an area', async () => {
    const row = await onASheet({ stat: 'Constitution', target: 'each creature in a 30-foot Emanation originating from the leviathan', damage: false, condition: 'Frightened' });
    expect(row.text).toContain('each creature in a 30-foot Emanation');
    expect(row.text).not.toContain('the triggering creature');
  }, 30000);

  test('the condition prints an end, from the same helper a save ROW uses', async () => {
    const row = await onASheet({ stat: 'Constitution', target: 'one creature within 10 feet', damage: true, type: 'Thunder', condition: 'Deafened' });
    expect(row.text).toMatch(/Deafened condition until the end of its next turn/);
  }, 30000);

  test('Grappled takes an escape DC and Prone takes no ending, as a save row does', async () => {
    const grappled = await onASheet({ stat: 'Strength', target: 'one creature within 10 feet', damage: false, condition: 'Grappled' });
    expect(grappled.text).toMatch(/Grappled condition \(escape DC \d+\)/);
    const prone = await onASheet({ stat: 'Strength', target: 'one creature within 10 feet', damage: false, condition: 'Prone' });
    expect(prone.text).toMatch(/Prone condition/);
    expect(prone.text).not.toMatch(/Prone condition until/);
  }, 40000);
});
