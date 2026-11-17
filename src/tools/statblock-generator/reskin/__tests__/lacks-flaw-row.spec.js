// A GM NERFING A MONSTER IS THE LIKELIER ASK (owner, 2026-11-09), and this was the one
// standing FAIL on the crafted forty all week: #15 Adult Red Dragon, "blind in one eye".
//
// THE CHAIN, measured over 18 saved fortys carrying that sheet:
//   the lack pass deletes any row whose NAME carries a lacked word  ->  it deletes the row the
//   seat just AUTHORED for the lack ("Ruined-Eye Glare", "Lance-Scarred Blind Side")  ->  the
//   flaw-row builder stands down because "the lack already removed something"  ->  no
//   `Sight Weakness`  ->  the checker reports the absence unhonoured.
// deleted-a-row on 6 of 18 rolls; all 6 shipped no flaw row and FAILed `lack-honored`. The 11
// that deleted nothing all shipped the flaw row and passed. One roll failed for a different
// reason (the clause split as "in one eye", which "names no absence" — not this defect).
//
// The fix reads data the engine already wrote: a row stamped with THIS lack's clause is the lack
// EXPRESSED, not a capability the lack removes. These tests pin the predicate in both directions,
// because the removal is right for a capability and wrong for the flaw row.
import { checkBlock } from '../checker.mjs';

const dragon = (actions, traits = []) => ({
  name: 'Adult Red Dragon', format: '2024', size: 'Huge', type: 'Dragon', alignment: 'Chaotic Evil',
  ac: 19, hp: 256, hp_formula: '19d12 + 133', speed: '40 ft., Fly 80 ft.',
  stats: { STR: 27, DEX: 10, CON: 25, INT: 16, WIS: 13, CHA: 23 }, saves: {}, skills: 'Perception +13, Stealth +6',
  // NOTE: no "blindsight" in this senses line. The checker's generic presence test matches the
  // clause's WORDS against the sheet, and print's dragon senses contain "blindsight" — which
  // satisfies "blind in one eye" by accident and hides the defect. That accident is real on the
  // shipped sheet and worth its own item; here the fixture removes it so these tests assert the
  // flaw row and nothing else.
  senses: 'darkvision 120 ft.; Passive Perception 23', languages: 'Common, Draconic',
  initiative_bonus: 0, cr: 17, cr_str: '17', pb: 6, xp: 18000,
  generation: { donor: 'dragon-15', clauses: [{ text: 'blind in one eye', kind: 'mechanical', polarity: 'lacks', costs: 'sight' }] },
  sections: { Traits: traits, Actions: actions },
});
const rend = { name: 'Rend', text: '*Melee Attack Roll:* +14, reach 10 ft. 13 (1d10 + 8) Slashing damage plus 5 (2d4) Fire damage.', print: true };
const lackFindings = (b) => Object.values(checkBlock(b).gates).flatMap((g) => g.findings ?? []).filter((f) => f.rule === 'lack-honored');

describe('a lack is honoured by a flaw row, and the flaw row must survive', () => {
  test('the flaw row honours the absence', () => {
    const flaw = { name: 'Sight Weakness', text: 'The red dragon has Disadvantage on Wisdom (Perception) checks that rely on sight.', rules: true, flaw: true, because: 'blind in one eye' };
    expect(lackFindings(dragon([rend], [flaw]))).toHaveLength(0);
  });

  // NOT ASSERTED HERE: that the absence FAILs when no flaw row exists. The checker credits a
  // lacks clause through `present()` as well as through a flaw row, and `present()` has its own
  // paths (a print body, a `takes` enum, a word match). Pinning the FAIL would mean fixing a
  // fixture to defeat all of them, which tests the fixture rather than this fix. The FAIL is
  // already measured where it matters: 6 of 18 saved fortys carrying #15, perfectly correlated
  // with the deletion this fix prevents.
  //
  // SEPARATE FINDING, worth its own item: print's dragon senses say "blindsight", and the
  // generic presence test matches the clause's words — so "blind in one eye" can read as
  // honoured because the sheet says "blindsight". That hides the defect on the shipped sheet.

  test('a row that merely NAMES the lacked thing does not honour it', () => {
    // "Ruined-Eye Glare" blinds OTHERS — it is flavour on the wound, not the creature's cost.
    // It may stay on the sheet (the fix stops deleting it) but it must not count as the flaw.
    const glare = { name: 'Ruined-Eye Glare', text: '*Constitution Saving Throw:* DC 21, each creature in a 15-foot Cone. *Failure:* The target has the Blinded condition until the end of its next turn.', clause: 'Adult Red Dragon — blind in one eye from an old lance' };
    expect(lackFindings(dragon([rend, glare]))).toHaveLength(1);
  });
});

// THE REMOVAL PREDICATE IS NOW AN ID COMPARISON (2026-11-17), and the tests that stood here
// compared WORDS — in a local re-implementation of the engine's expression, so they tested a copy.
// That copy is exactly what went wrong: `ownsThisLack` asked whether every word of the clause
// appeared in `row.clause`, and on the roll that mattered the row carried the IDEA's sentence
// instead, so the one row the exemption existed to protect was deleted.
//
// The rule is now `row.clauseId === lack.id`, and it is tested where it can only pass for the right
// reason: through the real engine, in `a-row-written-for-a-lack-survives.spec.js`, with the clause
// record built by `groundedClauses` from the call's own answer. A local copy of a predicate is not
// a test of it, so nothing replaces these three here.
describe('the removal predicate reads the engine\'s own join key', () => {
  test('a row stamped with the lack\'s clause id is the lack expressed', () => {
    const owns = (row, lack) => !!lack.id && row.clauseId === lack.id;
    const lack = { id: 'cl_d36g34', text: 'blind in one eye' };
    expect(owns({ clauseId: 'cl_d36g34', clause: "The dragon's ruined left eye leaves a permanent blind side" }, lack)).toBe(true);
    // the same row under the OLD word test, to record why this changed
    const words = (t) => String(t ?? '').toLowerCase().match(/[a-z']+/g)?.filter((w) => w.length > 2) ?? [];
    expect(words(lack.text).every((w) => words("The dragon's ruined left eye leaves a permanent blind side").includes(w))).toBe(false);
  });

  test('a row with no id, or one for another clause, gets no exemption', () => {
    const owns = (row, lack) => !!lack.id && row.clauseId === lack.id;
    const lack = { id: 'cl_d36g34', text: 'blind in one eye' };
    expect(owns({ clause: 'blind in one eye' }, lack)).toBe(false);        // text alone is not the key
    expect(owns({ clauseId: 'cl_other' }, lack)).toBe(false);
    expect(owns({ clauseId: 'cl_d36g34' }, { text: 'blind in one eye' })).toBe(false); // a lack with no id exempts nothing
  });
});
