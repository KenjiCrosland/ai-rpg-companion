import { parseAuthorResponse } from '../author.mjs';

// ROADMAP R3.3. The trait form's acceptance gate was a WORD LIST (`MECHANIC`)
// deciding whether a trait has a mechanical effect — the same question the form
// already asks the model as a field (`passive_effect`). Measured against
// src/data/srd52-monsters.json: the word list refuses **67 of print's 324 trait
// rows, 21%**. So the declared answer decides, and the list is the fallback for a
// call that answered nothing.
const trait = (effect, passive_effect, extra = {}) => JSON.stringify({
  attacks: [], saves: [], reactions: [], answered: [], unplaced: [],
  traits: [{ clause: 'c', name: 'T', effect, passive_effect, condition_relation: 'none', ...extra }],
});

describe('a trait is judged by its declared effect, not by a word list', () => {
  // each of these is a VERBATIM print trait that the word list refused
  test.each([
    ['Amphibious (Aboleth, every dragon)', 'The creature can breathe air and water.', 'ability'],
    ['Spider Climb (Black Pudding)', 'The creature can climb difficult surfaces, including along ceilings, without needing to make an ability check.', 'ability'],
    ['Abduct (Bugbear Stalker)', "The creature needn't spend extra movement to move a creature it is grappling.", 'bonus'],
  ])('print writes it and we keep it: %s', (_label, effect, pe) => {
    const r = parseAuthorResponse(trait(effect, pe));
    expect(r.traits).toHaveLength(1);
    expect(r.refused).toEqual([]);
  });

  test('an explicit "none" still drops the row — the call saying "this is only description"', () => {
    const r = parseAuthorResponse(trait('The creature can breathe air and water.', 'none'));
    expect(r.traits).toHaveLength(0);
  });

  test('the word list is the fallback: no declared effect AND no rule in the sentence is refused', () => {
    const r = parseAuthorResponse(trait('It smells of wet ash and old iron.', null));
    expect(r.traits).toHaveLength(0);
    expect(r.refused[0].why).toMatch(/named no passive effect and the sentence states no rule/);
  });

  test('a missing field with a rule in the sentence still lands — a failed call never costs a row', () => {
    const r = parseAuthorResponse(trait('The creature has Resistance to Fire damage.', null));
    expect(r.traits).toHaveLength(1);
  });
});

// A DECLINE THAT LIES IS WORSE THAN ONE THAT IS SILENT. The reason was computed
// separately from the test, so every refusal that was not a heal or an escalation
// reported "no mechanic in the effect" — including a trait refused for carrying a
// saving throw, which sent the reader to the wrong gate.
describe('the reason IS the test — one definition', () => {
  test('a save in a trait says so, and points at the form that takes it', () => {
    const r = parseAuthorResponse(trait('Each creature that touches it must make a DC {dc} Constitution saving throw.', 'threat'));
    expect(r.traits).toHaveLength(0);
    expect(r.refused[0].why).toMatch(/a trait is not a save/);
    expect(r.refused[0].why).not.toMatch(/no mechanic/);
  });
  test('{dc} written where a distance belongs says that, and not something else', () => {
    const r = parseAuthorResponse(trait('Enemies within {dc} feet have Disadvantage on attack rolls.', 'threat'));
    expect(r.refused[0].why).toMatch(/\{dc\} is written where a distance belongs/);
  });
  test('a heal with no amount still names its own rule', () => {
    const r = parseAuthorResponse(trait('The creature regains hit points at the start of each of its turns.', 'bonus'));
    expect(r.traits).toHaveLength(0);
    expect(r.refused[0].why).toMatch(/heal names no amount or no limit/);
  });
  test('every refusal carries a reason, and never a null one', () => {
    for (const eff of ['It smells of ash.', 'Each creature must make a DC {dc} save.', 'Enemies within {dc} feet suffer.']) {
      const r = parseAuthorResponse(trait(eff, eff.includes('smells') ? null : 'threat'));
      for (const x of r.refused) expect(typeof x.why).toBe('string');
    }
  });
});
