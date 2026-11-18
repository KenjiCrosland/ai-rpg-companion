/**
 * A REACTION'S SAVE SAYS WHAT THE TARGET SUFFERS, AND DEAFENED IS NEVER A ROW'S ONLY EFFECT
 * (fixes B and C, 2026-11-18).
 *
 * FIX B. The Air Elemental's trait seat landed Engulfing Wake as a Reaction whose idea was that a
 * creature failing the save is dragged along in the elemental's wake. A Reaction's save deals no
 * damage by the owner's ruling, and the parse dropped the movement, so the row reached the sheet as
 * "*Failure:*" with nothing after it and was cut at ship:
 *
 *   unfinished row dropped: Reactions/"Engulfing Wake" — a save outcome has no effect after it
 *
 * By then it had already spent the sheet's only free-row place, which is how that sheet came to ship
 * with no signature row at all. Refusing it at the READ means it never spends a place and then
 * vanishes, and the reason goes to the second ask.
 *
 * THE MOVEMENT WAS A DEAD FIELD. `renderForm`'s reaction branch reads `save.movement` and the parse
 * never carried it, so the one thing Engulfing Wake wanted to say had nowhere to go. It is carried
 * now, through the same validator the save form uses.
 *
 * FIX C. The owner, 18 November: "Deafened is such a minor condition and not worth a gated
 * recharge. I would prefer frightened or charmed based on the monster and context. The condition is
 * nice for flavor but basically a nothingburger." On the forty 4 rows impose it across 3 sheets, and
 * on 2 it is the whole row. The choice of replacement is the model's, not a swap by rule: the
 * Drowned Choir heals while a creature is "deafened or frightened by it", and a deafened creature
 * cannot hear a hymn.
 */
import { parseAuthorResponse } from '../author.mjs';
import { LIBRARY_SEEDS } from '../library.mjs';
import { SHAPES } from '../shapes.mjs';

const reaction = (over) => parseAuthorResponse(JSON.stringify({ reactions: [{
  clause: 'carries stolen voices', name: 'Engulfing Wake', trigger: 'A creature Frightened by the elemental takes the Disengage action',
  mechanics: 1, quantities: 0, ...over,
}] }), {});
const save = (over) => parseAuthorResponse(JSON.stringify({ saves: [{
  clause: 'sings in one voice', name: 'One Unbroken Voice', stat: 'Constitution', target: 'each creature in a 30-foot Emanation', success: 'none', ...over,
}] }), {});
const why = (p) => p.refused[0]?.why ?? null;

describe("a reaction's save says what the target suffers", () => {
  test('a save with no condition and no movement is refused, with the reason', () => {
    const p = reaction({ save: { stat: 'Strength', target: 'the triggering creature', damage: false, condition: null } });
    expect(p).toBeTruthy();
    expect(p.reactions).toHaveLength(0);
    expect(why(p)).toMatch(/deals no damage here/);
    expect(why(p)).toMatch(/a condition or a forced movement/);
  });

  test('a save that names a FORCED MOVEMENT is accepted, and the movement survives the parse', () => {
    const p = reaction({ save: { stat: 'Strength', target: 'the triggering creature', movement: 'dragged up to 15 feet' } });
    expect(p.reactions).toHaveLength(1);
    expect(p.reactions[0].save.movement).toBe('pulled up to 15 feet');   // the dead field, alive
  });

  test('a save that names a condition is accepted', () => {
    const p = reaction({ save: { stat: 'Strength', target: 'the triggering creature', condition: 'Restrained' } });
    expect(p.reactions).toHaveLength(1);
    expect(p.reactions[0].save.condition).toBe('Restrained');
  });

  test('a Reaction with no save at all is untouched — Riposte still lands', () => {
    const p = reaction({ name: 'Riposte', trigger: 'a creature misses it with a melee attack', response: 'it makes one Slam attack against that creature' });
    expect(p.reactions).toHaveLength(1);
    expect(why(p)).toBeNull();
  });
});

describe("Deafened is never a row's only effect", () => {
  test('a save whose only effect is Deafened is refused, with the two conditions named', () => {
    const p = save({ damage: false, condition: 'Deafened' });
    expect(p.saves).toHaveLength(0);
    expect(why(p)).toMatch(/Deafened alone is too slight/);
    expect(why(p)).toMatch(/Frightened or Charmed/);
  });

  test('Deafened riding on damage is accepted — the Leviathan keeps its rows', () => {
    const p = save({ damage: true, type: 'Thunder', condition: 'Deafened' });
    expect(p.saves).toHaveLength(1);
    expect(p.saves[0].condition).toBe('Deafened');
  });

  test('Deafened with a forced movement is accepted too', () => {
    expect(save({ damage: false, condition: 'Deafened', movement: 'pushed up to 10 feet' }).saves).toHaveLength(1);
  });

  test('another condition alone is still fine — only Deafened is too slight', () => {
    expect(save({ damage: false, condition: 'Frightened' }).saves).toHaveLength(1);
    expect(save({ damage: false, condition: 'Restrained' }).saves).toHaveLength(1);
  });

  test('a REACTION whose only effect is Deafened is refused, and damage is not offered', () => {
    const p = reaction({ save: { stat: 'Constitution', target: 'the triggering creature', condition: 'Deafened' } });
    expect(p.reactions).toHaveLength(0);
    expect(why(p)).toMatch(/Deafened alone is too slight to cost a Reaction/);
    expect(why(p)).not.toMatch(/add damage/);
  });

  // DATA INTEGRITY: the catalog's own Deafened rows all ride on damage, so none of them would be
  // refused by the rule above.
  test('no row in the catalog imposes Deafened without damage', () => {
    const texts = [
      ...LIBRARY_SEEDS.flatMap((r) => [r.text, ...Object.values(r.frames ?? {})]),
      ...SHAPES.flatMap((r) => [r.text, ...Object.values(r.frames ?? {})]),
    ].filter((t) => typeof t === 'string' && /Deafened/.test(t));
    expect(texts.length).toBeGreaterThan(5);            // the catalog really uses it
    const bare = texts.filter((t) => !/\{burst\}|\{dmg\}|\{avg\}|\d+ \(\d+d\d+/.test(t));
    expect(bare).toEqual([]);
  });
});
