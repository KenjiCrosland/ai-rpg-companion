/**
 * THE BOXES CAN BE REACHED, AND AN AURA IS ONE OF THEM (2026-11-19).
 *
 * FIX 1. The rider and the strike were built, correct and described, with a guide saying when to use
 * each — and across 39 live rolls the model used neither, once. Two things it reads later said
 * otherwise:
 *
 *   - the SKELETON it fills in had no "riders" and no "strikes". This is the second time: on
 *     11 November the seat's copy was missing "answered" and the stand-down fired 0 times in 249
 *     sheets. A skeleton teaches the answer.
 *   - the ASK pinned one kind: "IT IS a trait. Write exactly one row, of that kind, and leave the
 *     other arrays empty." No guide downstream can argue with that sentence.
 *
 * The cure is one list and one table. `AUTHORED_ARRAYS` builds the skeleton and is what the parser
 * consumes; `SEAT_TAKES` is read by the ask and by the landing. Neither test below reads a prompt's
 * words — the first compares two lists, the second compares two tables.
 *
 * FIX 2. Of 324 printed traits, 12 force a save: six auras and six bursts on death. Four auras hand
 * out a condition and three are one sentence — the Ghast's Stench, the Pit Fiend's Fear Aura, the
 * Sea Hag's Vile Appearance. The model kept writing that shape as a trait and the engine kept
 * refusing it: 6 of the 21 double refusals.
 */
import { parseAuthorResponse, AUTHORED_ARRAYS, SEAT_TAKES, seatTakes, AURA_CONDITIONS } from '../author.mjs';
import { renderForm } from '../forms.mjs';

describe('the ask and the landing read one table', () => {
  test('every seat kind has a row, and every form it offers is a real form', () => {
    expect(Object.keys(SEAT_TAKES).sort()).toEqual(['a bonus action', 'a reaction', 'a trait', 'an action']);
    const FORMS = ['trait', 'aura', 'reaction', 'rider', 'strike', 'save'];
    for (const [kind, forms] of Object.entries(SEAT_TAKES)) {
      expect(forms.length).toBeGreaterThan(0);
      for (const f of forms) expect([kind, FORMS.includes(f)]).toEqual([kind, true]);
    }
  });

  test('the Reaction is offered only where the sheet has room for one', () => {
    expect(seatTakes('a trait', { reactionOpen: true })).toContain('reaction');
    expect(seatTakes('a trait', { reactionOpen: false })).not.toContain('reaction');
    // the reaction SEAT still takes one: that is what it is for
    expect(seatTakes('a reaction', { reactionOpen: false })).toEqual(['reaction']);
  });

  test('the list the skeleton is built from holds every form the seats take', () => {
    const offered = new Set(Object.values(SEAT_TAKES).flat());
    for (const f of offered) {
      const array = f === 'save' ? 'saves' : f === 'trait' ? 'traits' : `${f}s`;
      expect([f, AUTHORED_ARRAYS.includes(array)]).toEqual([f, true]);
    }
  });
});

describe('an aura', () => {
  const SEAT = { attackCap: 0, traitSlots: 1, attackNames: ['Horn'] };
  const aura = (over, opts) => parseAuthorResponse(JSON.stringify({ auras: [{ clause: 'thunder crackles in its wake', name: 'Stormwake', stat: 'Dexterity', radius: 10, condition: 'Prone', ...over }] }), { ...SEAT, ...opts });
  const why = (p) => p.refused[0]?.why ?? null;

  test('one of the four conditions is accepted, with its size and save', () => {
    const p = aura({});
    expect(p.auras).toHaveLength(1);                     // the subject is present
    expect(p.auras[0]).toMatchObject({ name: 'Stormwake', stat: 'Dexterity', radius: 10, condition: 'Prone' });
  });

  test("the engine writes print's own sentence, and the model chose only four things", () => {
    const text = renderForm({ kind: 'aura', name: 'Stormwake', stat: 'Dexterity', dc: 13, radius: 10, condition: 'Prone', inline: 'the drake' }, '2024', {});
    expect(text).toBe('*Dexterity Saving Throw*: DC 13, any creature that starts its turn in a 10-foot Emanation originating from the drake. *Failure:* The target has the Prone condition until the start of its next turn. *Success:* The target is immune to this drake\'s Stormwake for 24 hours.');
    expect(text).not.toMatch(/\d+ \(\d+d\d+/);           // an aura deals no damage
  });

  test('a condition outside the four is refused, and the reason names them', () => {
    for (const c of ['Stunned', 'Paralyzed', 'Restrained', 'Blinded']) {
      const p = aura({ condition: c });
      expect(p.auras).toHaveLength(0);
      expect(why(p)).toMatch(/too strong to fall on everyone nearby every round for free/);
      expect(why(p)).toMatch(new RegExp(AURA_CONDITIONS.join(', ')));
    }
  });

  test('the four are print\'s two and two no stronger', () => {
    expect(AURA_CONDITIONS).toEqual(['Poisoned', 'Frightened', 'Charmed', 'Prone']);
    for (const c of AURA_CONDITIONS) expect(aura({ condition: c }).auras).toHaveLength(1);
  });

  test('a second aura on one sheet is refused', () => {
    const p = aura({}, { hasAura: true });
    expect(p.auras).toHaveLength(0);
    expect(why(p)).toMatch(/already has an aura — one to a creature/);
  });

  test('an out-of-range radius falls back rather than shipping a number nobody chose', () => {
    expect(aura({ radius: 17 }).auras[0].radius).toBe(10);
    expect(aura({ radius: 30 }).auras[0].radius).toBe(30);
  });

  // THE REDIRECT, which is how a refused trait reaches the box at all.
  test('a trait refused as a save, triggered at the start of a nearby turn, is sent to the aura', () => {
    const p = parseAuthorResponse(JSON.stringify({ traits: [{
      clause: 'thunder crackles in its wake', name: 'Stormwake',
      trigger: 'when a creature starts its turn within 10 feet of the drake',
      effect: 'it must succeed on a DC {dc} Dexterity saving throw or have the Prone condition',
      passive_effect: 'threat', condition_relation: 'inflicts', imposes: 'Prone', mechanics: 1, quantities: 1,
    }] }), SEAT);
    expect(p.traits).toHaveLength(0);
    expect(why(p)).toMatch(/that is an aura, which print writes as a trait/);
    expect(why(p)).toMatch(/"radius"/);
  });

  test("a trigger that is the creature's own attack still goes to the strike, not the aura", () => {
    const p = parseAuthorResponse(JSON.stringify({ traits: [{
      clause: 'x', name: 'Peal', trigger: 'when its Horn hits a creature',
      effect: 'the target must succeed on a DC {dc} Constitution saving throw or be Stunned',
      passive_effect: 'threat', condition_relation: 'inflicts', imposes: 'Stunned', mechanics: 1, quantities: 1,
    }] }), SEAT);
    expect(why(p)).toMatch(/answer in "strikes"/);
    expect(why(p)).not.toMatch(/that is an aura/);
  });
});
