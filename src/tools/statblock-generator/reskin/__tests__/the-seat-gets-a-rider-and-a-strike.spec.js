/**
 * THE SEAT'S FORM GAINS A RIDER AND A STRIKE (Part 1 as amended, 18 November evening).
 *
 * Eleven seats ended empty on the last forty, and three were trying to write something that hangs
 * off the creature's own attack — the drake's Deafening Peal ("when its Horn hits a creature in its
 * breath's wake, a save or Stunned"), the tollkeeper's Toll of the Dying ("when its Clapper hits,
 * the target cannot regain Hit Points"). The form had no box, so each answer was thrown away.
 *
 * THE OWNER'S RULING splits it in two. "Once per turn is the creature can replace one attack with
 * 'attack with condition rider'":
 *
 *   - a LIGHT effect — Prone, Grappled, a push or pull — welds onto the attack and adds no row.
 *     Print's Dire Wolf Bite: "…Piercing damage. If the target is a Large or smaller creature, it
 *     has the Prone condition."
 *   - one that needs a SAVE becomes its own named row with that attack's numbers, and Multiattack
 *     offers it in place of one attack. That replacement IS the once-a-turn limit. Print's Ghoul
 *     Claw is the wording.
 *
 * Both name an attack already on the sheet; neither invents one.
 */
import { parseAuthorResponse } from '../author.mjs';
import { weldRiderOntoAttack, strikeRowFrom } from '../generate.mjs';

const SEAT = { attackCap: 0, traitSlots: 1, attackNames: ['Horn', 'Bite'] };
const rider = (over) => parseAuthorResponse(JSON.stringify({ riders: [{ clause: 'a horn that lays them out', attack: 'Horn', ...over }] }), SEAT);
const strike = (over) => parseAuthorResponse(JSON.stringify({ strikes: [{ clause: "its breath's wake", name: 'Deafening Peal', attack: 'Horn', ...over }] }), SEAT);
const why = (p) => p.refused[0]?.why ?? null;

const scaled = { cr: 5, dc: 15, pb: 3, per_hit: 11, mod: { STR: 4 } };
const body = () => ({ Actions: [
  { name: 'Multiattack', text: 'The drake makes two Horn attacks.' },
  { name: 'Horn', text: '*Melee Attack Roll:* +7, reach 10 ft. 12 (2d6 + 5) Piercing damage plus 5 (1d10) Thunder damage.' },
] });
const horn = (s) => s.Actions.find((e) => e.name === 'Horn');

describe('a light rider welds onto its attack', () => {
  test('Prone with no save is accepted and welded, and adds no row', () => {
    const p = rider({ condition: 'Prone' });
    expect(p.riders).toHaveLength(1);                       // the subject is present
    const s = body();
    const before = s.Actions.length;
    expect(weldRiderOntoAttack(s, p.riders[0], scaled, 5, () => {})).toBe(true);
    expect(s.Actions).toHaveLength(before);                 // no row added
    expect(horn(s).text).toMatch(/Thunder damage, and the target has the Prone condition\.$/);
  });

  test("Grappled takes print's size clause and an escape DC", () => {
    const s = body();
    weldRiderOntoAttack(s, rider({ condition: 'Grappled' }).riders[0], scaled, 5, () => {});
    expect(horn(s).text).toMatch(/If the target is a Large or smaller creature, it has the Grappled condition \(escape DC \d+\)\.$/);
  });

  test('a forced movement names the creature it is pushed away from', () => {
    const s = body();
    weldRiderOntoAttack(s, { ...rider({ movement: 'pushed up to 10 feet' }).riders[0], inline: 'the drake' }, scaled, 5, () => {});
    expect(horn(s).text).toMatch(/the target is pushed up to 10 feet straight away from the drake\.$/);
  });

  test('A HARDER CONDITION WITH NO SAVE IS REFUSED, and the reason names the strike form', () => {
    const p = rider({ condition: 'Stunned' });
    expect(p.riders).toHaveLength(0);
    expect(why(p)).toMatch(/too heavy to ride on every hit with no saving throw/);
    expect(why(p)).toMatch(/"strike" form/);
  });

  test('an attack that is not on the sheet is refused, and the sheet\'s attacks are named', () => {
    const p = rider({ condition: 'Prone', attack: 'Tail' });
    expect(p.riders).toHaveLength(0);
    expect(why(p)).toMatch(/not an attack on this sheet/);
    expect(why(p)).toMatch(/Horn, Bite/);
    expect(weldRiderOntoAttack(body(), { attack: 'Tail', condition: 'Prone' }, scaled, 5, () => {})).toBe(false);
  });

  test('a rider that says nothing is refused', () => {
    expect(rider({}).riders).toHaveLength(0);
    expect(why(rider({}))).toMatch(/a condition, a forced movement, or a curse/);
  });

  test('ONE RIDER TO AN ATTACK — the second is refused with that reason', () => {
    const p = parseAuthorResponse(JSON.stringify({ riders: [
      { clause: 'a', attack: 'Horn', condition: 'Prone' },
      { clause: 'b', attack: 'Horn', condition: 'Grappled' },
    ] }), SEAT);
    expect(p.riders).toHaveLength(1);
    expect(p.refused[0].why).toMatch(/already carries a rider — one to an attack/);
  });
});

describe('a strike is its own attack, offered in place of one', () => {
  test("it clones the attack's numbers and writes the save in print's form", () => {
    const p = strike({ save: 'Constitution', condition: 'Stunned' });
    expect(p.strikes).toHaveLength(1);
    const row = strikeRowFrom(body(), p.strikes[0], scaled, 5);
    expect(row).toBeTruthy();
    // A TURN-DENYING CONDITION CARRIES A RECHARGE (fault 2, 2026-11-20): Stunned at will, on a save
    // against losing a whole turn, is what eight of the nine landed strikes shipped.
    expect(row.name).toBe('Deafening Peal (Recharge 5-6)');
    expect(row.text).toContain('*Melee Attack Roll:* +7, reach 10 ft. 12 (2d6 + 5) Piercing damage');  // the attack's own numbers
    expect(row.text).toContain('If the target is a creature, it is subjected to the following effect.'); // the Ghoul's wording
    expect(row.text).toMatch(/\*Constitution Saving Throw\*: DC 15\. \*Failure:\* The target has the Stunned condition until the end of its next turn\./);
  });

  test('a strike with no save is refused, and the reason names the rider form', () => {
    const p = strike({ condition: 'Stunned' });
    expect(p.strikes).toHaveLength(0);
    expect(why(p)).toMatch(/forces a saving throw/);
    expect(why(p)).toMatch(/"rider" form/);
  });

  test('a strike whose save does nothing is refused', () => {
    expect(strike({ save: 'Constitution' }).strikes).toHaveLength(0);
    expect(why(strike({ save: 'Constitution' }))).toMatch(/what the failed save costs/);
  });

  test('a strike naming an attack off the sheet is refused', () => {
    expect(strike({ save: 'Constitution', condition: 'Stunned', attack: 'Tail' }).strikes).toHaveLength(0);
    expect(strikeRowFrom(body(), { name: 'x', attack: 'Tail', save: 'Constitution', condition: 'Stunned' }, scaled, 5)).toBeNull();
  });

  test('ONE STRIKE TO A SHEET', () => {
    const p = parseAuthorResponse(JSON.stringify({ strikes: [
      { clause: 'a', name: 'One', attack: 'Horn', save: 'Constitution', condition: 'Stunned' },
      { clause: 'b', name: 'Two', attack: 'Bite', save: 'Strength', condition: 'Prone' },
    ] }), SEAT);
    expect(p.strikes).toHaveLength(1);
    expect(p.strikes[0].name).toBe('One');
  });

  test("the source attack's own rider does not come along", () => {
    const s = body();
    horn(s).text += ' If the target is a Large or smaller creature, it has the Prone condition.';
    const row = strikeRowFrom(s, { name: 'Peal', attack: 'Horn', save: 'Constitution', condition: 'Stunned' }, scaled, 5);
    expect(row.text).not.toMatch(/Prone/);
  });
});

describe('a curse rides only where the GM asked for one', () => {
  const withAsk = (ask, has) => parseAuthorResponse(JSON.stringify({ riders: [{ clause: 'curses trespassers', attack: 'Horn', condition: 'Prone', curse: true }] }),
    { ...SEAT, declaredAsk: ask, hasCurse: has });

  test("the field is taken when the sheet's declared ask is curse", () => {
    expect(withAsk('curse', false).riders[0].curse).toBe(true);
  });

  test('it is ignored under any other ask, and the row is what it would have been', () => {
    const p = withAsk('grapple', false);
    expect(p.riders).toHaveLength(1);
    expect(p.riders[0].curse).toBe(false);
    expect(p.riders[0].condition).toBe('Prone');
  });

  test('a second curse on one sheet is ignored', () => {
    expect(withAsk('curse', true).riders[0].curse).toBe(false);
  });

  test("the engine writes the curse, by the creature's CR, and the model does not choose it", () => {
    const row = strikeRowFrom(body(), { name: 'Withering Blow', attack: 'Horn', save: 'Charisma', curse: true }, scaled, 7);
    expect(row.text).toMatch(/[Tt]he target is cursed\. While cursed, /);
    expect(row.text).not.toMatch(/\buntil\b/);                 // a curse has no duration
    const minor = strikeRowFrom(body(), { name: 'Withering Blow', attack: 'Horn', save: 'Charisma', curse: true }, scaled, 0.5);
    expect(minor.text).toMatch(/Disadvantage on/);              // the CR 1-and-under tier
  });
});

describe('a Reaction may parry, which is the only kind print writes', () => {
  const rx = (over) => parseAuthorResponse(JSON.stringify({ reactions: [{ clause: 'x', name: 'Parry', trigger: 'the warder is hit by a melee attack roll while holding a shield', response: 'it turns the blow', mechanics: 1, quantities: 1, ...over }] }), SEAT);

  test('parry survives the parse', () => {
    expect(rx({ response_kind: 'parry' }).reactions[0].response_kind).toBe('parry');
  });

  test('halve and hinder are NOT offered — print has no row of either kind', () => {
    // `quantities: 0` so the row lands and the FIELD is what is under test: with the value dropped
    // the engine writes no number, and the number gate would otherwise refuse the row first.
    for (const k of ['halve', 'hinder', 'miss', 'anything']) {
      const p = rx({ response_kind: k, quantities: 0 });
      expect(p.reactions).toHaveLength(1);
      expect(p.reactions[0].response_kind).toBeUndefined();
    }
    expect(rx({ response_kind: 'parry', quantities: 0 }).reactions[0].response_kind).toBe('parry');
  });

  test("the engine writes print's own sentence, and the model supplies only the name and trigger", () => {
    const { renderForm } = require('../forms.mjs');
    const text = renderForm({ kind: 'reaction', trigger: 'the warder is hit by a melee attack roll while holding a shield', response_kind: 'parry', pb: 3, inline: 'warder' }, '2024', {});
    expect(text).toBe('*Trigger:* The warder is hit by a melee attack roll while holding a shield. *Response:* The warder adds 3 to its AC against that attack, possibly causing it to miss.');
  });
});

/**
 * AND A REFUSAL SENDS THE SECOND ASK TO THE NEW BOXES (Part 1, the half I missed first time).
 *
 * The handoff asked for the same redirect the Reaction already has: "when a trait is refused and its
 * trigger is one of the creature's own attacks hitting, the reason says to answer in the rider form
 * and names the fields." I built the boxes without it, and Part 1's own probe showed why that was
 * not enough — "a trait is not a save" was 11 of the 18 double refusals across 33 rolls and not one
 * of them reached a rider or a strike, because the reason pointed nowhere near them.
 */
describe('a refusal names the form that would have taken the answer', () => {
  const { parseAuthorResponse: parse } = require('../author.mjs');
  const peal = (trigger) => parse(JSON.stringify({ traits: [{
    clause: "breath is a rolling wall of thunder", name: 'Deafening Peal', trigger,
    effect: 'the target must succeed on a DC {dc} Constitution saving throw or have the Stunned condition until the end of its next turn',
    passive_effect: 'threat', condition_relation: 'inflicts', imposes: 'Stunned', mechanics: 1, quantities: 1,
  }] }), { attackNames: ['Horn'] });

  test("a trait whose trigger is the creature's own attack hitting is sent to the strike form", () => {
    const p = peal('when its Horn hits a creature in the wake of its breath');
    expect(p.traits).toHaveLength(0);                    // the subject is present: it IS refused
    expect(p.refused[0].why).toMatch(/answer in "strikes"/);
    expect(p.refused[0].why).toMatch(/"attack".*"save".*"condition"/);
    expect(p.refused[0].why).toMatch(/Multiattack offers it in place of one attack/);
    expect(p.refused[0].why).toMatch(/If the hit needs NO save, answer in "riders"/);
  });

  test('a trait that responds to something else still goes to the Reaction form', () => {
    const p = peal('when the drake is hit by a melee attack roll');
    expect(p.traits).toHaveLength(0);
    expect(p.refused[0].why).toMatch(/print writes as a REACTION/);
    expect(p.refused[0].why).not.toMatch(/answer in "strikes"/);
  });

  // A GAP THAT PREDATES THIS, found by reading the refusal rather than assuming it. The Reaction
  // redirect matches "takes damage" adjacently, so "takes THUNDER damage" — the Trenchsong
  // Leviathan's Brinebell Chord, one of the eleven empty seats — reaches neither redirect and gets
  // the bare reason. Pinned as today's behaviour so the day it changes, it changes here.
  test('a typed damage trigger reaches NEITHER redirect — recorded, not fixed', () => {
    const p = peal('when the drake takes Thunder damage');
    expect(p.refused[0].why).toBe('a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence');
  });

  test('print\'s own ways of saying it are all recognised', () => {
    for (const g of ['when it hits a creature with its Bite', 'on a hit, the target is shaken', 'whenever the drake hits with its Horn']) {
      expect(peal(g).refused[0].why).toMatch(/answer in "strikes"/);
    }
  });
});

/**
 * THE FIVE FAULTS READING THE ROWS FOUND (2026-11-20). Two of the five passed their tests last
 * session because the test stopped at the parse, so the ones that are about a row assert on what
 * `strikeRowFrom` actually produces, and the Multiattack ones on a finished sheet in the probe.
 */
describe('faults 2 and 3 — what a strike may hand out', () => {
  const { strikeRowFrom: build } = require('../generate.mjs');
  const { parseAuthorResponse: parse, swapDeafenedToFrightened: swap } = require('../author.mjs');
  const scaled = { cr: 5, dc: 15, pb: 3, per_hit: 11, mod: { STR: 4 } };
  const body = () => ({ Actions: [
    { name: 'Multiattack', text: 'The drake makes two Horn attacks.' },
    { name: 'Horn', text: '*Melee Attack Roll:* +7, reach 10 ft. 12 (2d6 + 5) Piercing damage.' },
  ] });
  const SEAT = { attackNames: ['Horn', 'Flukes'] };

  test('a turn-denying condition is named with a Recharge, and its citation will read "if available"', () => {
    for (const c of ['Stunned', 'Paralyzed', 'Incapacitated']) {
      const row = build(body(), { name: 'Peal', attack: 'Horn', save: 'Constitution', condition: c }, scaled, 5);
      expect([c, row.name]).toEqual([c, 'Peal (Recharge 5-6)']);
      expect(row.gate).toBe('Recharge 5-6');
    }
  });

  test('every other condition stays at will, once a turn', () => {
    for (const c of ['Frightened', 'Prone', 'Grappled', 'Poisoned', 'Restrained']) {
      const row = build(body(), { name: 'Peal', attack: 'Horn', save: 'Constitution', condition: c }, scaled, 5);
      expect([c, row.name]).toEqual([c, 'Peal']);
      expect(row.gate).toBeUndefined();
    }
  });

  test('DEAFENED IS NOT A STRIKE\'S EFFECT — refused, and the swap reaches it', () => {
    const p = parse(JSON.stringify({ strikes: [{ clause: 'x', name: 'Brineplate Detonation', attack: 'Flukes', save: 'Constitution', condition: 'Deafened' }] }), SEAT);
    expect(p.strikes).toHaveLength(0);                   // the subject is present and refused
    expect(p.refused[0].why).toMatch(/Deafened alone is too slight to be what a strike adds/);
    // the swap walks every array now, not three by name — a strike was invisible to it
    const again = parse(swap(JSON.stringify({ strikes: [{ clause: 'x', name: 'Brineplate Detonation', attack: 'Flukes', save: 'Constitution', condition: 'Deafened' }] })), SEAT);
    expect(again.strikes).toHaveLength(1);
    expect(again.strikes[0].condition).toBe('Frightened');
  });
});

describe('fault 4 — the fields shown are the fields accepted', () => {
  const { REACTION_SAVE_FIELDS, reactionSaveSpec, parseAuthorResponse: parse } = require('../author.mjs');

  test("the one list holds no damage, and holds the movement the gate accepts", () => {
    expect(REACTION_SAVE_FIELDS).toEqual(['stat', 'target', 'condition', 'movement', 'success']);
    expect(REACTION_SAVE_FIELDS).not.toContain('damage');
    expect(REACTION_SAVE_FIELDS).not.toContain('type');
    expect(reactionSaveSpec()).toMatch(/deals NO damage/);
  });

  test('a Reaction save with exactly those fields is accepted', () => {
    const p = parse(JSON.stringify({ reactions: [{ clause: 'x', name: 'Engulfing Wake', trigger: 'a Frightened creature Disengages', mechanics: 1, quantities: 1,
      save: { stat: 'Strength', target: 'the triggering creature', condition: null, movement: 'dragged up to 15 feet', success: 'none' } }] }), {});
    expect(p.reactions).toHaveLength(1);
    expect(p.reactions[0].save.movement).toBe('pulled up to 15 feet');
  });

  test('and one written with damage is still refused, which is what the model was being told to write', () => {
    const p = parse(JSON.stringify({ reactions: [{ clause: 'x', name: 'Tears of Remorse', trigger: 'a creature attacks it', mechanics: 1, quantities: 1,
      save: { stat: 'Wisdom', target: 'the triggering creature', damage: true, type: 'Psychic', condition: null } }] }), {});
    expect(p.reactions).toHaveLength(0);
    expect(p.refused[0].why).toMatch(/deals no damage here/);
  });
});

describe('fix A — a strike is not a nova (owner, 2026-11-20)', () => {
  const { strikeRowFrom: build } = require('../generate.mjs');
  const scaled = { cr: 5, dc: 15, pb: 3, per_hit: 11, mod: { STR: 4 } };
  const body = () => ({ Actions: [
    { name: 'Multiattack', text: 'The drake makes two Horn attacks.' },
    { name: 'Horn', text: '*Melee Attack Roll:* +7, reach 10 ft. 12 (2d6 + 5) Piercing damage.' },
    // the chassis nova — what stripped the strike's Recharge on 3 of 3 drake rolls
    { name: 'Storm Breath (Recharge 5-6)', text: '*Dexterity Saving Throw*: DC 15, each creature in a 30-foot Cone. *Failure:* 27 (6d8) Lightning damage.' },
  ] });

  test('the strike declares itself, which is what both one-nova guards read', () => {
    const row = build(body(), { name: 'Brand-Wake', attack: 'Horn', save: 'Constitution', condition: 'Stunned' }, scaled, 5);
    expect(row.strike).toBe(true);
    expect(row.name).toBe('Brand-Wake (Recharge 5-6)');
    expect(row.gate).toBe('Recharge 5-6');
  });

  test("and a strike is not itself counted as the sheet's nova — it carries an Attack Roll, not a nova's shape", () => {
    const row = build(body(), { name: 'Brand-Wake', attack: 'Horn', save: 'Constitution', condition: 'Stunned' }, scaled, 5);
    // `hasChassisNova` looks for a gated row with a save AND damage dice; a strike has all three,
    // which is why it had to be excluded by name rather than by shape.
    expect(row.text).toMatch(/Attack Roll/);
    expect(row.text).toMatch(/Saving Throw/);
    expect(row.text).toMatch(/\d+ \(\d+d\d+/);
  });
});
