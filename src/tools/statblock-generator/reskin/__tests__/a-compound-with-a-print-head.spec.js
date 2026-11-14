/**
 * A COMPOUND WITH A PRINT HEAD ROUTES AS A TWIST ON THAT HEAD (fix 6, 2026-11-14).
 *
 * "vampire pirate" should stand on the Vampire with a twist, not be invented from nothing.
 * typed40 #16 shipped it as homebrew — "Captain Morwain Thale" on an invented CR 10 brute
 * chassis, with no vampire body under it.
 *
 * WHAT THESE TESTS PIN, AND WHAT THEY DO NOT. The decision is half code and half call:
 * `dispatch()` is pure and deterministic, the path call's answer is neither. These pin the
 * CODE — given an answer, does the dispatcher route it right — and say nothing about prompt
 * wording. Whether the call returns the right answer is measured by
 * `scripts/probe-the-compound-head.mjs`, which runs it for real.
 *
 * On 2026-11-14 that probe read 20 of 20 correct on every one of the five cases below, and
 * the rule the call follows landed on 11-08, BEFORE the run that failed — so #16 was one
 * roll going the other way rather than a missing rule. Nothing was built for fix 6; these
 * tests exist so the code half cannot drift silently underneath a call that is already right.
 */
import { dispatch, printNameOf, isPersonBody } from '../path.mjs';

/** what the path call returns, in its validated shape */
const answer = (over = {}) => ({ assembly: 'twist', print_body: null, relation: null, class: null, species: null, title: null, receipts: {}, ...over });

describe('a compound with a print head', () => {
  test('the head is the body and the job word rides as flavour — "vampire pirate"', () => {
    const d = dispatch({ name: '', concept: 'vampire pirate' }, answer({ print_body: 'Vampire', relation: 'is', receipts: { print_body: 'vampire' } }));
    expect(d).toMatchObject({ path: 'twist', print_body: 'Vampire', relation: 'is' });
    expect(d.class).toBeNull(); // the pirate is not a class the sheet is built from
  });

  test('a MONSTER named as itself outranks a class word — "ogre blacksmith"', () => {
    // the Ogre is not a person block, so the class yields and the monster is the body
    expect(isPersonBody('Ogre')).toBe(false);
    const d = dispatch({ name: '', concept: 'ogre blacksmith' }, answer({ print_body: 'Ogre', relation: 'is', class: null, receipts: { print_body: 'ogre' } }));
    expect(d).toMatchObject({ path: 'twist', print_body: 'Ogre', relation: 'is' });
    // and with a class word in the answer it is STILL the Ogre, because the body is not a person
    const withClass = dispatch({ name: '', concept: 'ogre blacksmith' }, answer({ print_body: 'Ogre', relation: 'is', class: 'fighter', receipts: { print_body: 'ogre' } }));
    expect(withClass).toMatchObject({ path: 'twist', print_body: 'Ogre', class: 'fighter' });
  });

  // THE PEOPLE-PLUS-ROLE CASE MOVED, and the test that was here was pinning a state
  // production cannot reach: it handed `dispatch` an answer carrying `species: 'goblin'`,
  // which `readPath` never produces (goblin has no kit, so the species is always refused).
  // The owner ruled on 2026-11-14 that a goblin assassin is a class NPC standing on the
  // Goblin Warrior's printed body, and the tests for it start from a raw answer and go
  // through `readPath` — see `a-people-with-a-print-block.spec.js`.
});

describe('the controls that must not become twists', () => {
  test('words that merely CONTAIN a print-ish word are homebrew — "cathedral-vault ooze"', () => {
    expect(printNameOf('cathedral-vault ooze')).toBeNull(); // "ooze" alone is not a print name; the block is the Gray Ooze
    const d = dispatch({ name: '', concept: 'cathedral-vault ooze' }, answer({ assembly: 'homebrew' }));
    expect(d.path).toBe('homebrew');
    expect(d.print_body).toBeNull();
  });

  test('a creature print does not have gets NO body — the Mind Flayer is not in the SRD', () => {
    // Product Identity, absent from both corpora. The risk this guards is not
    // over-promotion but a near-miss weld onto some other block that sounds close.
    expect(printNameOf('Mind Flayer')).toBeNull();
    expect(printNameOf('Mind Flayer', { edition: '2014' })).toBeNull();
    const d = dispatch({ name: '', concept: 'Mind Flayer' }, answer({ assembly: 'homebrew' }));
    expect(d).toMatchObject({ path: 'homebrew', print_body: null });
  });

  test('a bare print name is exact, and the same name with a description is a twist', () => {
    expect(dispatch({ name: '', concept: 'Ogre' }, null)).toMatchObject({ path: 'exact', print_body: 'Ogre', by: 'code' });
    expect(dispatch({ name: 'Ogre', concept: '' }, null)).toMatchObject({ path: 'exact', print_body: 'Ogre', by: 'code' });
    // a Name field that IS a print name, beside a description, is print's body plus the words
    expect(dispatch({ name: 'Ogre', concept: 'who collects teeth' }, null)).toMatchObject({ path: 'twist', print_body: 'Ogre', by: 'code' });
  });

  test('a twist needs relation "is" — "resembles" never welds the body on', () => {
    const d = dispatch({ name: '', concept: 'a golem of lashed timber' }, answer({ assembly: 'homebrew', print_body: 'Clay Golem', relation: 'resembles', receipts: { assembly: 'golem' } }));
    expect(d.path).toBe('homebrew');
  });
});
