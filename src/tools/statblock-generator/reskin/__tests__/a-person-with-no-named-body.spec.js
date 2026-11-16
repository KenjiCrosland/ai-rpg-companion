/**
 * A PERSON WITH NO NAMED BODY IS A HUMANOID (owner's ruling, 2026-11-15) — fix A, widened by
 * fix E on 2026-11-16 to drop the requirement that a class be named.
 *
 * "Brother Halric", a name and nothing else, came out SEVEN WAYS in one day:
 *
 *   five rolls alone      Humanoid, Undead, Undead, Humanoid, Humanoid
 *   sheet 40, ship gate   Construct, with Immunity to Poison
 *   sheet 40, rerun       Construct, with Immunity to Poison
 *
 * Every roll took the same path — `class_npc — class cleric` with no body — so the path was never
 * the variable. The type was. A bare name is thin, so the identity call runs UNCONDITIONED before
 * routing (`expandFirst`) and answers a creature type with nothing in the GM's words to go on;
 * the type then drives the immunities, the size and the rest of the sheet.
 *
 * The decision is tested here rather than where it is used, because where it is used is inside a
 * 600-line function in a `.vue` file that nothing can call — which is exactly how the last inline
 * guard in this codebase stayed dead for weeks.
 */
import { humanoidForAPersonWithNoBody as settle } from '../path.mjs';

/** the path object `dispatch` returns for a bare name with a class, as traced on all seven rolls */
const halric = (over) => ({
  path: 'class_npc', print_body: null, relation: null, class: 'cleric', species: null,
  receipt: 'Brother', concept: 'Brother Halric', name: 'Brother Halric', callType: 'Construct', ...over,
});

describe('a person with no named body is a Humanoid', () => {
  test('Brother Halric is a Humanoid, whatever the call answered', () => {
    expect(settle(halric())).toBe('Humanoid');
    expect(settle(halric({ callType: 'Undead' }))).toBe('Humanoid');
    expect(settle(halric({ callType: 'Fiend' }))).toBe('Humanoid');
  });

  test.each([
    ['Captain Vane', 'Captain', 'fighter'],
    ['Sister Ilse', 'Sister', 'cleric'],
    ['Old Marga', 'Marga', 'mage'],
  ])('"%s" is a Humanoid too', (concept, receipt, cls) => {
    expect(settle(halric({ concept, name: concept, receipt, class: cls }))).toBe('Humanoid');
  });

  // THE CONTROLS. Each leaves a word behind, so the GM gave material to type a creature from and
  // the call's answer stands.
  test('"clockwork friar" keeps the call\'s Construct — "clockwork" is left', () => {
    expect(settle(halric({ concept: 'clockwork friar', name: '', receipt: 'friar' }))).toBeNull();
  });

  test('"an undead priest" keeps Undead', () => {
    expect(settle(halric({ concept: 'an undead priest', name: '', receipt: 'priest', callType: 'Undead' }))).toBeNull();
  });

  test('a class NPC standing on a named body is untouched', () => {
    expect(settle(halric({ print_body: 'Goblin Warrior', relation: 'is', concept: 'goblin cleric', name: '', receipt: 'cleric' }))).toBeNull();
  });

  test('a species kit is a body too — untouched', () => {
    expect(settle(halric({ species: 'lizardfolk', concept: 'lizardfolk cleric', name: '', receipt: 'cleric' }))).toBeNull();
  });

  // THE CALL'S `type_source` IS NOT CONSULTED, and this is why. On 1 of 5 Brother Halric rolls
  // the identity call answered `type_source: "user"` — the GM's words name the type — for a bare
  // NAME. Nothing in "Brother Halric" names a creature type, so the claim was false, and an
  // earlier version of this function honoured it and let the route's Undead ship. The emptiness
  // test is the check: a type word the GM wrote would be one of the words left over.
  test('a false type_source claim does not stand the ruling down', () => {
    expect(settle(halric({ typeSource: 'user' }))).toBe('Humanoid');
    expect(settle(halric({ typeSource: 'inferred' }))).toBe('Humanoid');
  });

  test("but a type word in the GM's words still stands, because a word is left", () => {
    // "an undead priest" and "clockwork friar" are the real form of that exception
    expect(settle(halric({ concept: 'an undead priest', name: '', receipt: 'priest', callType: 'Undead', typeSource: 'user' }))).toBeNull();
  });

  // SUPERSEDED BY FIX E. This read "no class named and the ruling does not reach it", which is
  // exactly the half fix E reverses: "Old Marga" is a person by the path call's own answer, and a
  // person with no named body is a Humanoid. Another PATH still does not reach it.
  test('another path does not reach it', () => {
    expect(settle(halric({ path: 'homebrew' }))).toBeNull();
    expect(settle(halric({ path: 'twist' }))).toBeNull();
    expect(settle(halric({ path: 'exact' }))).toBeNull();
    expect(settle(halric({ path: null }))).toBeNull();
  });

  test('an answer that is already Humanoid, or missing, changes nothing', () => {
    expect(settle(halric({ callType: 'Humanoid' }))).toBeNull();
    expect(settle(halric({ callType: 'humanoid' }))).toBeNull();
    expect(settle(halric({ callType: null }))).toBeNull();
  });

  test('it never throws on junk', () => {
    expect(settle()).toBeNull();
    expect(settle({})).toBeNull();
    expect(settle({ path: 'class_npc', class: 'cleric', callType: 'Construct', concept: null, receipt: null, name: null })).toBe('Humanoid');
  });
  // FIX E (2026-11-16): a bare name with NO class is a person too.
  describe('a bare name with no class at all', () => {
    /** the path object `dispatch` returns for a bare proper name the call read as a person */
    const marga = (over) => ({
      path: 'class_npc', print_body: null, relation: null, class: null, species: null,
      receipt: 'Old Marga', concept: 'Old Marga', name: 'Old Marga', callType: 'Fey', ...over,
    });

    test('"Old Marga" is a Humanoid, whatever the call answered', () => {
      expect(settle(marga())).toBe('Humanoid');
      expect(settle(marga({ callType: 'Plant' }))).toBe('Humanoid');     // the roll that shipped a spy
      expect(settle(marga({ callType: 'Elemental' }))).toBe('Humanoid');
    });

    test.each([['Grik'], ['Dame Oriel'], ['Old Scuttlesnape'], ['Grimjaw']])('"%s" too', (n) => {
      expect(settle(marga({ concept: n, name: n, receipt: n }))).toBe('Humanoid');
    });

    // A NAME THAT SOUNDS LIKE A MONSTER IS STILL FINE (the owner's ruling). The rule does not
    // decide who is a person — the path call did, before this ever runs.
    test('a describing word beside the name still stands the rule down', () => {
      expect(settle(marga({ concept: 'Old Marga, a bog hag', name: 'Old Marga', receipt: 'Old Marga' }))).toBeNull();
      expect(settle(marga({ concept: 'clockwork Grimjaw', name: '', receipt: 'Grimjaw' }))).toBeNull();
    });

    test('a body or a species still stands it down', () => {
      expect(settle(marga({ print_body: 'Goblin Warrior' }))).toBeNull();
      expect(settle(marga({ species: 'lizardfolk' }))).toBeNull();
    });

    test('an answer already Humanoid changes nothing', () => {
      expect(settle(marga({ callType: 'Humanoid' }))).toBeNull();
    });
  });
});
