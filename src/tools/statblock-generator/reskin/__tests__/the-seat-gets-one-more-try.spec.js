/**
 * A REFUSED ABILITY GETS ONE MORE TRY, WITH THE REASON (owner's ruling, 2026-11-17).
 *
 * A third of what the seat call writes is refused — 14 of 44 on the baseline tape — and nothing was
 * asked a second time, so the sheet simply went one row shorter. Four of the fourteen are one wrong
 * form (a saving throw written inside a trait) and two are a number promised and not written: the
 * reason says what to write, so saying it back is the whole fix.
 *
 * WHAT THESE PIN:
 *   one more try, never two
 *   the second answer faces the same parser and the same gates — nothing is loosened
 *   a DECLINE is an answer and is not asked again
 *   an accepted first answer is asked once
 *
 * None of them reads the prompt's wording. They count asks and read the finished sheet.
 */
import { generateReskin } from '../generate.mjs';

const CONCEPT = 'a bell-ringer\'s ghost that tolls for the dying';
const IDEA = 'Its toll reaches into the chest of anyone who hears it and squeezes.';
const keysOf = (p, field) => { const i = p.indexOf(`"${field}": {`); if (i < 0) return []; return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]); };

/** a trait that writes a saving throw: the commonest real refusal, 4 of the 14 */
const A_SAVE_INSIDE_A_TRAIT = {
  traits: [{ clause: 'tolls for the dying', name: 'Mourning Toll', trigger: 'When the bell tolls',
    effect: 'each creature within 30 feet must make a Constitution saving throw or take damage',
    imposes: null, condition_relation: 'none', acts: null, heals: false, mechanics: 1, quantities: 1, passive_effect: 'other' }],
};
/**
 * The same ability in a form the parser accepts.
 *
 * My first version of this read "that creature cannot regain Hit Points", which the parser refuses
 * as a heal naming no amount — so the "accepted" fixture was itself refused and the test was
 * measuring the retry twice over. Verified in-pipeline before being used here.
 */
const THE_SAME_ABILITY_AS_A_TRAIT = {
  traits: [{ clause: 'tolls for the dying', name: 'Mourning Toll', trigger: 'While the ghost is within 30 feet of a creature that can hear it',
    effect: 'it does not suffer Disadvantage on attack rolls against a creature it cannot see but can hear within 30 feet',
    imposes: null, condition_relation: 'none', acts: null, heals: false, mechanics: 1, quantities: 0, passive_effect: 'defense' }],
};
/** the call naming where the clause belongs instead of writing a row — an ANSWER, not a refusal */
const A_DECLINE = { traits: [], unplaced: [{ clause: 'tolls for the dying', where: 'description', text: 'it tolls for the dying' }] };

/** @returns {{monster, seatAsks: number, retriesAsked: number}} */
const build = async (answers) => {
  const seatPrompts = [];
  let cached = null;
  const monster = await generateReskin({
    mechanics: [], archetype: 'skirmisher', concept: CONCEPT, userConcept: CONCEPT, cr: 3,
    path: { path: 'homebrew', print_body: null, relation: null, class: null },
  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({ trait: { idea: IDEA, section: 'trait', trigger: 'always', effect: 'other', family: 'none' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a toll that squeezes a listener\'s chest' });
    }
    if (p.startsWith('You are writing ONE ability')) {
      seatPrompts.push(p);
      return JSON.stringify(answers[Math.min(seatPrompts.length - 1, answers.length - 1)]);
    }
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      const renames = Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`]));
      cached = JSON.stringify({ name: 'Bell-Ringer\'s Ghost', type: 'Undead', size: 'Medium', alignment: 'Neutral Evil',
        senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: {},
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'sound', wildcard: '' });
    }
    return cached;
  });
  return { monster, seatAsks: seatPrompts.length, retriesAsked: seatPrompts.filter((p) => /YOUR FIRST ANSWER WAS REFUSED/.test(p)).length };
};
const rowsOf = (m) => Object.values(m.sections ?? {}).flat().filter((e) => e?.name).map((e) => String(e.name));

describe('a refused ability gets one more try', () => {
  test('a first answer refused and a second that passes: the row is on the sheet, asked exactly twice', async () => {
    const { monster, seatAsks, retriesAsked } = await build([A_SAVE_INSIDE_A_TRAIT, THE_SAME_ABILITY_AS_A_TRAIT]);
    expect(rowsOf(monster)).toContain('Mourning Toll');
    expect(seatAsks).toBe(2);
    expect(retriesAsked).toBe(1);
  }, 30000);

  test('both refused: no row, asked exactly twice, never a third time', async () => {
    const { monster, seatAsks, retriesAsked } = await build([A_SAVE_INSIDE_A_TRAIT, A_SAVE_INSIDE_A_TRAIT]);
    expect(rowsOf(monster)).not.toContain('Mourning Toll');
    expect(seatAsks).toBe(2);
    expect(retriesAsked).toBe(1);
  }, 30000);

  test('a first answer that is accepted: asked once', async () => {
    const { monster, seatAsks, retriesAsked } = await build([THE_SAME_ABILITY_AS_A_TRAIT]);
    expect(rowsOf(monster)).toContain('Mourning Toll');
    expect(seatAsks).toBe(1);
    expect(retriesAsked).toBe(0);
  }, 30000);

  test('a DECLINE is an answer: asked once, and the seat stays empty', async () => {
    const { monster, seatAsks, retriesAsked } = await build([A_DECLINE]);
    expect(rowsOf(monster)).not.toContain('Mourning Toll');
    expect(seatAsks).toBe(1);
    expect(retriesAsked).toBe(0);
  }, 30000);

  test('the second answer faces the same gates — a refusal from a GATE is retried too, and a bad second answer still loses', async () => {
    // the first answer carries an unsubstituted slot, which a gate refuses rather than the parser
    const A_SLOT_LEFT_IN = { traits: [{ ...A_SAVE_INSIDE_A_TRAIT.traits[0], effect: 'a creature within {radius} feet cannot regain Hit Points', quantities: 0 }] };
    const { monster, seatAsks } = await build([A_SLOT_LEFT_IN, A_SLOT_LEFT_IN]);
    expect(rowsOf(monster)).not.toContain('Mourning Toll');
    expect(seatAsks).toBe(2);
  }, 30000);

  test('the FIRST ask carries no reason, so the tape still reproduces it', async () => {
    const { retriesAsked } = await build([THE_SAME_ABILITY_AS_A_TRAIT]);
    expect(retriesAsked).toBe(0);
  }, 30000);
});
