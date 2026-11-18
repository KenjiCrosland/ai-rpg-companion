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

/**
 * THE TRAIT SEAT TAKES A REACTION (owner's ruling, 2026-11-17).
 *
 * Seven of the fourteen first-try refusals were "a trait is not a save", and read one by one FOUR of
 * the seven are a response to being hit, damaged or moved — which print writes as a Reaction. The
 * second ask recovered 0 of 7 because the reason said what was wrong and not where to put it.
 *
 * What the trait seat does NOT take is a bare save row: on the live run the model turned three
 * refused traits into save rows and each lost its trigger, becoming a soft effect in an attack's
 * place, which the owner has graded a dead row.
 */
const A_VALID_REACTION = {
  traits: [],
  reactions: [{ clause: 'tolls for the dying', name: 'Answering Peal',
    trigger: 'A creature within 30 feet of the ghost damages it with a melee attack',
    response: 'The bell answers the blow and the attacker is pushed 10 feet away from the ghost',
    imposes: null, condition_relation: 'none', acts: null, heals: false, mechanics: 1, quantities: 1 }],
};
/** the same, forcing a save through the fields — print's Chain Devil shape */
const A_REACTION_WITH_A_SAVE = {
  traits: [],
  reactions: [{ clause: 'tolls for the dying', name: 'Answering Peal',
    trigger: 'A creature within 30 feet of the ghost damages it with a melee attack',
    response: 'The bell answers the blow',
    save: { stat: 'Wisdom', target: 'the triggering creature', damage: false, condition: 'Frightened', success: null },
    imposes: null, condition_relation: 'none', acts: null, heals: false, mechanics: 1, quantities: 0 }],
};
/** the save as PROSE inside the response: the 2014 wording, which must not ship */
const A_REACTION_WITH_A_PROSE_SAVE = {
  traits: [],
  reactions: [{ ...A_VALID_REACTION.reactions[0],
    response: 'The attacker must succeed on a {dc} Wisdom saving throw or have the Frightened condition' }],
};
/** a bare save row offered to the trait seat */
const A_BARE_SAVE_ROW = {
  traits: [],
  saves: [{ clause: 'tolls for the dying', name: 'Mourning Toll', stat: 'Wisdom',
    target: 'each creature in a 30-foot Emanation', damage: false, condition: 'Frightened', mechanics: 1, quantities: 0 }],
};

describe('the trait seat and a Reaction', () => {
  const sectionsOf = (m) => Object.fromEntries(Object.entries(m.sections ?? {}).map(([k, v]) => [k, (v ?? []).filter((e) => e?.name).map((e) => String(e.name))]));

  test('a valid Reaction lands in Reactions', async () => {
    const { monster, seatAsks } = await build([A_VALID_REACTION]);
    expect(sectionsOf(monster).Reactions ?? []).toContain('Answering Peal');
    expect(sectionsOf(monster).Traits ?? []).not.toContain('Answering Peal');
    expect(seatAsks).toBe(1);
  }, 30000);

  test("a Reaction forcing a save through the fields prints print's own form after Response", async () => {
    const { monster } = await build([A_REACTION_WITH_A_SAVE]);
    const row = Object.values(monster.sections ?? {}).flat().find((e) => e?.name === 'Answering Peal');
    expect(row).toBeTruthy();
    expect(row.text).toMatch(/\*Response—Wisdom Saving Throw:\*/);
    expect(row.text).toMatch(/DC \d+, the triggering creature/);
    expect(row.text).toMatch(/\*Failure:\*/);
    expect(row.text).not.toMatch(/must succeed on/);     // never the 2014 prose
    expect(row.text).not.toMatch(/\{dc\}/);
  }, 30000);

  test('a save written as PROSE in the response is refused, and the reason is returned', async () => {
    const { monster, seatAsks, retriesAsked } = await build([A_REACTION_WITH_A_PROSE_SAVE, A_REACTION_WITH_A_PROSE_SAVE]);
    expect(Object.values(monster.sections ?? {}).flat().map((e) => e?.name)).not.toContain('Answering Peal');
    expect(seatAsks).toBe(2);           // it was refused, so it was asked again
    expect(retriesAsked).toBe(1);
  }, 30000);

  test('a prose save on the first try and the FIELDS on the second: it lands', async () => {
    const { monster, seatAsks } = await build([A_REACTION_WITH_A_PROSE_SAVE, A_REACTION_WITH_A_SAVE]);
    const row = Object.values(monster.sections ?? {}).flat().find((e) => e?.name === 'Answering Peal');
    expect(row).toBeTruthy();
    expect(row.text).toMatch(/\*Response—Wisdom Saving Throw:\*/);
    expect(seatAsks).toBe(2);
  }, 30000);

  test('a bare SAVE ROW offered to the trait seat is still refused', async () => {
    const { monster } = await build([A_BARE_SAVE_ROW, A_BARE_SAVE_ROW]);
    expect(Object.values(monster.sections ?? {}).flat().map((e) => e?.name)).not.toContain('Mourning Toll');
  }, 30000);

  test('the Reaction counts as that seat\'s row — the trait seat does not also fill', async () => {
    const { monster } = await build([A_VALID_REACTION]);
    const s = sectionsOf(monster);
    expect((s.Reactions ?? []).length).toBe(1);
  }, 30000);
});

/**
 * A SEAT-WRITTEN REACTION SURVIVES THE PRINT-CANON PASS (2026-11-17).
 *
 * The tests above drive a homebrew path, where the print-canon paste never runs — so they all passed
 * while the Reaction path was dead on every print body. On the first live run the Chapel Bell-Ringer's
 * "Death Knell" landed in Reactions on the second try and the paste removed it: "is the seat's, not
 * the Ghost's". The Ghost prints no Reaction, so nothing replaced it and the sheet lost the row.
 * Zero of the Reactions that landed reached a sheet, and the trace said they had landed.
 */
describe('a Reaction the seat wrote survives a print body', () => {
  const buildOnAGhost = async (answers) => {
    const seatPrompts = [];
    let cached = null;
    const m = await generateReskin({
      mechanics: [], archetype: 'skirmisher', concept: "a chapel bell-ringer's ghost that tolls for the dying",
      userConcept: "a chapel bell-ringer's ghost that tolls for the dying", cr: 4,
      path: { path: 'twist', print_body: 'Ghost', relation: 'is', class: null },
    }, async (p0) => {
      const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
      if (p.startsWith('You are inventing the SIGNATURE ability')) {
        return JSON.stringify({ trait: { idea: 'When the bell is struck the blow sets it tolling.', section: 'trait', trigger: 'always', effect: 'other', family: 'none' } });
      }
      if (p.startsWith("A monster's signature ability has been described in plain words")) {
        return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a toll that answers a blow' });
      }
      if (p.startsWith('You are writing ONE ability')) { seatPrompts.push(p); return JSON.stringify(answers[Math.min(seatPrompts.length - 1, answers.length - 1)]); }
      const rk = keysOf(p, 'renames');
      if (rk.length || !cached) {
        const renames = Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`]));
        cached = JSON.stringify({ name: "Chapel Bell-Ringer", type: 'Undead', size: 'Medium', alignment: 'Neutral Evil',
          senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: {},
          conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'sound', wildcard: '' });
      }
      return cached;
    });
    return m;
  };

  test('it is in Reactions on the finished sheet, not swept as chassis filler', async () => {
    const m = await buildOnAGhost([A_VALID_REACTION]);
    const rx = (m.sections?.Reactions ?? []).filter((e) => e?.name).map((e) => String(e.name));
    expect(rx).toContain('Answering Peal');
  }, 30000);

  test('and so does one that forces a save through the fields', async () => {
    const m = await buildOnAGhost([A_REACTION_WITH_A_SAVE]);
    const row = (m.sections?.Reactions ?? []).filter(Boolean).find((e) => e?.name === 'Answering Peal');
    expect(row).toBeTruthy();
    expect(row.text).toMatch(/\*Response—Wisdom Saving Throw:\*/);
  }, 30000);
});

describe('the two things the first live run of this path found', () => {
  test('a Reaction whose SAVE is the whole response needs no prose response', async () => {
    // the prompt tells the call to leave the response out when the save is the whole of it, and
    // `reactionWhy` refused exactly that — so the Drowned Choir's second answer came back in the
    // form the reason had asked for and was turned away for the shape the prompt told it to use
    const noProse = { traits: [], reactions: [{ ...A_REACTION_WITH_A_SAVE.reactions[0], response: '' }] };
    const { monster } = await build([noProse]);
    const row = Object.values(monster.sections ?? {}).flat().find((e) => e?.name === 'Answering Peal');
    expect(row).toBeTruthy();
    expect(row.text).toMatch(/\*Response—Wisdom Saving Throw:\*/);
  }, 30000);

  test('a reaction with neither a response nor a save is still refused', async () => {
    const neither = { traits: [], reactions: [{ ...A_VALID_REACTION.reactions[0], response: '' }] };
    const { monster } = await build([neither, neither]);
    expect(Object.values(monster.sections ?? {}).flat().map((e) => e?.name)).not.toContain('Answering Peal');
  }, 30000);
});

/**
 * TWO REACTIONS, AND THE HOLD ON A REACTION'S DAMAGE (owner's rulings, 2026-11-18).
 *
 * The seat's Reaction lands beside one the body, a kit or the catalog brought — Vashka's answers
 * "fights from a shield wall", which her GM typed, and Riposte is what her kit happened to bring.
 * It never adds a SECOND of its own, because a creature has one reaction a round, and a sheet
 * carries at most two.
 *
 * And until the pricing question is settled, a save in a seat-written Reaction deals no damage: the
 * checker's read does not count a Reaction at all, while the dice inside the save are sized by the
 * save row's own rule.
 */
describe('two Reactions, and the damage hold', () => {
  const buildWith = async (answers, { bodyReaction = null } = {}) => {
    const seatPrompts = [];
    let cached = null;
    const m = await generateReskin({
      mechanics: [], archetype: 'skirmisher', concept: CONCEPT, userConcept: CONCEPT, cr: 3,
      path: { path: 'homebrew', print_body: null, relation: null, class: null },
      ...(bodyReaction ? { seedRows: [bodyReaction] } : {}),
    }, async (p0) => {
      const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
      if (p.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ trait: { idea: IDEA, section: 'trait', trigger: 'always', effect: 'other', family: 'none' } });
      if (p.startsWith("A monster's signature ability has been described in plain words")) return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a toll that squeezes' });
      if (p.startsWith('You are writing ONE ability')) { seatPrompts.push(p); return JSON.stringify(answers[Math.min(seatPrompts.length - 1, answers.length - 1)]); }
      const rk = keysOf(p, 'renames');
      if (rk.length || !cached) {
        const renames = Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`]));
        cached = JSON.stringify({ name: "Bell-Ringer's Ghost", type: 'Undead', size: 'Medium', alignment: 'Neutral Evil',
          senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: {}, conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'sound', wildcard: '' });
      }
      return cached;
    });
    return m;
  };
  const rxOf = (m) => (m.sections?.Reactions ?? []).filter((e) => e?.name);

  /** a Stone Giant brings print's own Deflect Missile, so the body's Reaction is real, not staged */
  const onAStoneGiant = async (answers) => {
    let cached = null;
    const C = 'a stone giant who swats boulders back at their throwers';
    return generateReskin({
      mechanics: [], archetype: 'brute', concept: C, userConcept: C, cr: 7,
      path: { path: 'twist', print_body: 'Stone Giant', relation: 'is', class: null },
    }, async (p0) => {
      const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
      if (p.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ trait: { idea: 'It swats a blow back at whoever threw it.', section: 'trait', trigger: 'always', effect: 'other', family: 'none' } });
      if (p.startsWith("A monster's signature ability has been described in plain words")) return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a swat that answers a blow' });
      if (p.startsWith('You are writing ONE ability')) return JSON.stringify(answers[0]);
      const rk = keysOf(p, 'renames');
      if (rk.length || !cached) {
        const renames = Object.fromEntries(rk.map((k, i2) => [k, `Named Row${i2}`]));
        cached = JSON.stringify({ name: 'Boulder-Swatter', type: 'Giant', size: 'Huge', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Giant', renames, damage_types: {}, conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'boulder', wildcard: '' });
      }
      return cached;
    });
  };
  const A_SWAT = { traits: [], reactions: [{ clause: 'swats boulders back', name: 'Answering Swat',
    trigger: 'A creature within 10 feet of the giant hits it with a melee attack',
    response: 'The giant shoves that creature 10 feet away from it',
    imposes: null, condition_relation: 'none', acts: null, heals: false, mechanics: 1, quantities: 1 }] };

  test("the seat's Reaction lands beside the body's own", async () => {
    const m = await onAStoneGiant([A_SWAT]);
    const rx = rxOf(m);
    expect(rx.map((e) => e.name)).toContain('Answering Swat');
    expect(rx.some((e) => e.print)).toBe(true);           // print's Deflect Missile is still there
    expect(rx.length).toBe(2);
  }, 30000);

  test('a save with damage true prints no dice, keeps its condition, and the record says so', async () => {
    const withDamage = { traits: [], reactions: [{ ...A_REACTION_WITH_A_SAVE.reactions[0],
      save: { ...A_REACTION_WITH_A_SAVE.reactions[0].save, damage: true, type: 'Thunder' } }] };
    const m = await buildWith([withDamage]);
    const row = rxOf(m).find((e) => e.name === 'Answering Peal');
    expect(row).toBeTruthy();
    expect(row.text).toMatch(/Frightened condition until the end of its next turn/);
    expect(row.text).not.toMatch(/\d+ \(\d+d\d+\)/);          // no dice
    expect(row.text).not.toMatch(/Thunder damage/);
    expect(m.generation.reaction_damage_set_aside).toContain('Answering Peal');
  }, 30000);

  test('a save with no damage flag is untouched and the record stays clean', async () => {
    const m = await buildWith([A_REACTION_WITH_A_SAVE]);
    const row = rxOf(m).find((e) => e.name === 'Answering Peal');
    expect(row.text).toMatch(/Frightened condition until the end of its next turn/);
    expect(m.generation.reaction_damage_set_aside).toBeUndefined();
  }, 30000);

  test('the seat never adds a SECOND Reaction of its own', async () => {
    // the predicate the engine uses: a Reaction already stamped by the seat closes the path
    const seatWrote = (rx) => rx.filter(Boolean).some((e) => e.authoredSeat);
    const open = (rx) => !seatWrote(rx) && rx.filter(Boolean).length < 2;
    expect(open([])).toBe(true);
    expect(open([{ name: 'Riposte', template: 'riposte' }])).toBe(true);        // beside the body's
    expect(open([{ name: 'Peal', authoredSeat: true }])).toBe(false);           // never a second of its own
    expect(open([{ name: 'Riposte', template: 'riposte' }, { name: 'Parry', print: true }])).toBe(false); // at most two
  });
});
