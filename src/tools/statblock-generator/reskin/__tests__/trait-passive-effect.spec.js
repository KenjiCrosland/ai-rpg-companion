/**
 * A TRAIT IS A POSITIVE OR NEGATIVE PASSIVE EFFECT ON THE CREATURE.
 *
 * Owner's ruling, 2026-10-30, on spotting the Dayvault Warden's "Patience":
 * "While the warden has not attacked since its last turn, the warden waits
 * motionless on its perch, watching its prey, without taking any action."
 * It grants nothing and costs nothing — it is a description of the creature
 * doing nothing, and circular besides. The trait form asked only for a name and
 * one sentence of `effect`, which prose satisfies.
 *
 * WHY THIS IS A CALL FIELD AND NOT A TEXT TEST: measured against print's 324
 * traits, 210 land on a rules word and the other 114 are capabilities or
 * limitations in plain words — Amphibious "can breathe air and water", Flyby
 * "doesn't provoke an Opportunity Attack", Siege Monster "deals double damage to
 * objects", Abduct "needn't spend extra movement", against Immutable Form "can't
 * shape-shift". A rules-word test would reject a THIRD of print. So the call
 * answers which lever the trait pulls and the engine only checks membership.
 */
import printBlocks from '@/data/srd52-monsters.json';
import { PASSIVE_EFFECTS, parseAuthorResponse, buildRepairPrompt } from '@/tools/statblock-generator/reskin/author.mjs';

const answer = (trait) => JSON.stringify({ traits: [{ clause: 'it waits on its perch', name: 'Patience', effect: 'It waits motionless on its perch, watching its prey.', ...trait }] });
const keptNames = (raw) => (parseAuthorResponse(raw)?.traits ?? []).map((t) => t.name);

describe('the vocabulary', () => {
  it('is closed, and offers both polarities the ruling names', () => {
    expect(PASSIVE_EFFECTS).toContain('none');
    expect(PASSIVE_EFFECTS).toContain('limitation');                       // the negative case
    expect(PASSIVE_EFFECTS.filter((v) => v !== 'none' && v !== 'limitation').length).toBeGreaterThanOrEqual(3); // positives
  });

  it('is taught in the prompt, with prose named as the thing to refuse', () => {
    const p = String(buildRepairPrompt({ name: 'X', inline: 'it', clauses: [{ text: 'c' }], cr: 5, sheet: '[Traits] A: b' }));
    expect(p).toContain('"passive_effect"');
    for (const v of PASSIVE_EFFECTS) expect(p).toContain(v);
    expect(p).toMatch(/waits, watches, perches/);                          // the prose cases, by name
  });
});

describe('the filter', () => {
  it('drops a trait the call says only describes the creature', () => {
    expect(keptNames(answer({ passive_effect: 'none' }))).toEqual([]);
  });

  it.each(PASSIVE_EFFECTS.filter((v) => v !== 'none'))('keeps a trait the call says pulls a real lever (%s)', (v) => {
    expect(keptNames(answer({ passive_effect: v }))).toEqual(['Patience']);
  });

  it('keeps the row when the field is ABSENT — a failed call never costs a row', () => {
    expect(keptNames(answer({}))).toEqual(['Patience']);
  });

  it('keeps the row when the answer is off-vocabulary, rather than trusting it', () => {
    expect(keptNames(answer({ passive_effect: 'vibes' }))).toEqual(['Patience']);
    expect(parseAuthorResponse(answer({ passive_effect: 'vibes' })).traits[0].passive_effect).toBeNull();
  });
});

describe('print, so the vocabulary is not a wall', () => {
  it('every print trait is a capability or a limitation — none is pure description', () => {
    // the 37 distinct rules-word-free names, spot-checked on the two the ruling turns on
    const named = (who, what) => {
      const b = printBlocks.find((x) => x.name === who);
      return Object.values(b.sections ?? {}).flat().find((r) => r.name === what);
    };
    expect(named('Aboleth', 'Amphibious').text).toMatch(/can breathe air and water/);    // ability
    expect(named('Stone Golem', 'Immutable Form').text).toMatch(/can't shape-shift/);      // limitation
    expect(named('Gargoyle', 'Flyby').text).toMatch(/doesn't provoke an Opportunity Attack/);
  });
});
