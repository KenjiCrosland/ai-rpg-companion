import { TEMPLATES, renderTemplate, splitMinorClause } from '../templates.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';

const sheet = (cr = 8, style = null, archetype = 'skirmisher') => scaleDonor(pickDonor(cr, style, archetype), cr, { mechanics: [] });

// ROADMAP R3, site 1. The minor-condition rider was cut out of the FINISHED
// sentence by four `[^.]*` patterns, each a different near-miss of one closed
// shape our own frames write. It is a FIELD now: split off the frame before any
// fill, re-inserted by filling a token, and DECLARED on the row it printed on.
describe('the minor-condition rider is a declared segment, not a sentence to cut', () => {
  test('the split is exact: body + clause is the frame, byte for byte', () => {
    const frames = [
      '*Strength Saving Throw*: DC {dc}. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage only.',
      '*{save_stat} Saving Throw*: DC {dc}, one creature. *Failure:* {avg_x2} ({dice_x2}) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage.',
      // ", and IT has the …" — the form the payoff and fear-unearned patterns
      // could never match (both read "the target" only)
      '*Melee Attack Roll:* {atk}, reach 5 ft. {avg} ({dice}) {damage_type} damage, and it has the Poisoned condition until the end of its next turn.',
    ];
    for (const f of frames) {
      const r = splitMinorClause(f);
      expect(r.clause).toBeTruthy();
      expect(r.body).toContain('{minor_clause}');
      expect(r.body.split('{minor_clause}').join(r.clause)).toBe(f); // round trip
      expect(r.body.split('{minor_clause}').join('')).not.toMatch(/has the \S+ condition/); // and dropping it leaves a whole sentence
      expect(r.body.split('{minor_clause}').join('')).not.toMatch(/ ,|,\./);
    }
    expect(splitMinorClause('*Failure:* {avg} ({dice}) {damage_type} damage.').clause).toBeNull();
    expect(splitMinorClause(null).body).toBe('');
  });

  test('the token is read wherever it sits: a frame whose whole point IS the condition still picks its save', () => {
    // noxious-aura writes "*Failure:* The target has the {condition_minor}
    // condition" — never the rider shape, so it is not strippable and never was.
    // The condition/save block must still see it (this is the regression the
    // first cut of the split caused: Frightened stopped choosing Wisdom).
    const t = TEMPLATES.find((x) => x.id === 'noxious-aura');
    const ctx = { scaled: sheet(8, null, 'brute'), archetype: 'brute', cr: 8, energy: 'Poison', mix: 'both', meleeName: 'Slam', imposed: [], name: 'X' };
    expect(renderTemplate(t, ctx, { save_stat: 'Constitution', condition_minor: 'Frightened' }).text).toMatch(/^\*Wisdom Saving Throw\*/);
    expect(renderTemplate(t, ctx, { save_stat: 'Wisdom', condition_minor: 'Poisoned' }).text).toMatch(/^\*Constitution Saving Throw\*/);
  });

  test('a row that keeps its rider DECLARES the clause it printed', () => {
    const t = TEMPLATES.find((x) => x.id === 'condition-payoff');
    const ctx = { scaled: sheet(10, null, 'brute'), archetype: 'brute', cr: 10, energy: 'Fire', mix: 'both', meleeName: 'Slam', imposed: ['Restrained'], name: 'X' };
    const row = renderTemplate(t, ctx, { consumed_condition: 'Restrained', condition_minor: 'Prone', finisher: 'brings the hammer down' });
    expect(row).toBeTruthy();
    expect(row.minorClause).toBeTruthy();                       // the field is the point of this test
    expect(row.text).toContain(row.minorClause);                 // and it is the very text that printed
    expect(row.minorClause).toMatch(/has the \w+ condition/);
    expect(row.minorClause).not.toMatch(/\{/);                   // every fill is in it
  });

  test('a payoff never imposes what it requires: the clause does not print, and no field claims it did', () => {
    const t = TEMPLATES.find((x) => x.id === 'condition-payoff');
    const ctx = { scaled: sheet(10, null, 'brute'), archetype: 'brute', cr: 10, energy: 'Fire', mix: 'both', meleeName: 'Slam', imposed: ['Prone'], name: 'X' };
    const row = renderTemplate(t, ctx, { consumed_condition: 'Prone', condition_minor: 'Prone', finisher: 'brings the hammer down' });
    expect(row).toBeTruthy();
    expect(row.text).toMatch(/that has the Prone condition/);     // the requirement stays
    expect(row.text).not.toMatch(/and the target has the Prone condition/); // the vestigial rider does not
    expect(row.minorClause).toBeUndefined();                      // nothing declares a rider that never printed
    expect(row.imposes).toBeUndefined();
    expect(row.text).not.toMatch(/ ,|,\.|\.\./);                  // and the sentence closed cleanly
  });
});

// DECLARED THEN NOT CARRIED is the repeat failure of this sprint (`gate`, `area`,
// `imposes`, `classKit` — four times). The field is useless unless it reaches the row.
describe('the declaration reaches the row', () => {
  const { carryDeclared: carry } = require('../generate.mjs');
  test('carryDeclared carries minorClause onto the row the writer rendered', () => {
    const row = { name: 'Molten Weld', text: 'x, and the target has the Prone condition.' };
    carry(row, { minorClause: ', and the target has the Prone condition', imposes: 'Prone' });
    expect(row.minorClause).toBe(', and the target has the Prone condition');
    expect(row.imposes).toBe('Prone');
  });
});

// FOUR COPIES OF ONE CUT (the real find of R3's first site). The authored-row
// repair, the print-canon clone, the print-canon rename and the one-fact-one-home
// shed each wrote the same pattern with a different near-miss. They share a
// definition now, and the shed's one difference — it may only take the condition
// being shed — is a parameter rather than a fifth copy.
describe('one definition, every reader', () => {
  const { splitMinorClause } = require('../templates.mjs');
  const row = '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) Piercing damage, and the target has the Prone condition.';

  test('the shed takes only the condition it is shedding', () => {
    expect(splitMinorClause(row, { only: 'Prone' }).clause).toBe(', and the target has the Prone condition');
    expect(splitMinorClause(row, { only: 'Restrained' }).clause).toBeNull();      // someone else's rider stays
    expect(splitMinorClause(row, { only: 'Restrained' }).body).toBe(row);          // untouched, byte for byte
    expect(splitMinorClause(row, { only: 'prone' }).clause).toBeTruthy();          // the old cut was case-insensitive; so is this
  });

  test('dropping it leaves a sentence a GM can read', () => {
    const r = splitMinorClause(row);
    expect(r.body.split('{minor_clause}').join('')).toBe('*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) Piercing damage.');
  });

  test("and it does NOT reach a condition the row REQUIRES", () => {
    // "one creature that has the Restrained condition" is a targeting clause —
    // the payoff's own precondition. Cutting it was bar 1's original failure.
    const payoff = '*Strength Saving Throw*: DC 15, one creature that has the Restrained condition. *Failure:* 24 (4d10) Cold damage.';
    expect(splitMinorClause(payoff).clause).toBeNull();
    expect(splitMinorClause(payoff).body).toBe(payoff);
  });
});

// A GRAPPLE PAIR IS ONE FACT. Print writes 52 rows in the rider shape and 10 are
// the second half of a grapple — the clause is bound to the hold its own sentence
// just imposed. Two of the four patterns this site replaced cut it; measured
// against src/data/srd52-monsters.json, not asserted from taste.
describe("print's grapple pair survives", () => {
  const { splitMinorClause } = require('../templates.mjs');
  const PAIRS = [
    // Purple Worm / Bite, Remorhaz / Bite, Roc / Talons — the "it has the" form
    '*Melee Attack Roll:* +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.',
    // Behir / Constrict, Kraken / Tentacle — no "If" lead-in
    'The target has the Grappled condition (escape DC 16), and it has the Restrained condition until the grapple ends.',
    // Roper / Tentacle — "and THE TARGET has", the form the old print-canon
    // pattern did match, and did wrongly cut
    '*Melee Attack Roll:* +7, reach 50 ft. 14 (4d6) Bludgeoning damage. The target has the Grappled condition (escape DC 14) from one of six tentacles, and the target has the Poisoned condition until the grapple ends.',
  ];
  test('a clause bound to the hold its own sentence imposed is never split off', () => {
    for (const t of PAIRS) {
      expect(splitMinorClause(t).clause).toBeNull();
      expect(splitMinorClause(t).body).toBe(t);
      // `only` is the shed naming a condition deliberately — it may take the
      // pair's second half, which is what the pattern it replaced did. Leaving
      // the guard on here left the Roper with a dangling "and".
      if (/Restrained condition until the grapple ends/.test(t)) expect(splitMinorClause(t, { only: 'Restrained' }).clause).toBeTruthy();
    }
  });
  test('and a rider on a plain damage line still splits', () => {
    const rider = '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) Piercing damage, and the target has the Prone condition.';
    expect(splitMinorClause(rider).clause).toBe(', and the target has the Prone condition');
    // a hold imposed in an EARLIER sentence does not protect a later rider
    const two = 'The target has the Grappled condition (escape DC 13). *Failure:* 9 (2d8) Cold damage, and the target has the Prone condition.';
    expect(splitMinorClause(two).clause).toBe(', and the target has the Prone condition');
  });
});
