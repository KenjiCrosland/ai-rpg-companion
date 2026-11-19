/**
 * THE CURSE, FOUR WAYS (2026-11-19). The probe rolled the marsh witch three times and the
 * tollkeeper four, and every roll was wrong in one of these ways.
 *
 * 3.1 A CURSE NEEDS THE GM'S OWN WORD. The tollkeeper's creator typed "a chapel bell-ringer's ghost
 *     that tolls for the dying" and asked for no curse; the route call read that clause as
 *     `askMechanic: curse`, the seat's lead keyed on it, and all four rolls shipped Ruinous Curse —
 *     a permanent effect needing a spell to lift — on a sheet whose one declared ask is `drain`.
 *     So for a curse ALONE, the call's answer and the clause's own words must agree. This is a word
 *     list, and the reason is that the cost of a wrong yes is permanent.
 *
 * 3.2 THE ENGINE SETS THE CURSE ON THE ROW WRITTEN FOR IT. Two rolls of three answered the witch's
 *     curse clause with a save that Restrains and never set `curse`.
 *
 * 3.3 A CURSE ROW KEEPS A SAVE OF THE MIND. "Save follows the effect" moved Ruinous Curse from
 *     Charisma to Dexterity because the row's point is its damage; a curse resisted by dodging
 *     reads wrong.
 *
 * 3.4 IT IS WORTH THE ATTACK IT COSTS. The owner ruled Grave Knell dead at 7 damage in place of a
 *     19 attack; Ruinous Curse on the tollkeeper was the same trade at 7 against 19.
 */
import { clauseAsksACurse, leadForSeat, CURSE_WORDS } from '../templates.mjs';
import { drawLibraryRow, LIBRARY_SEEDS } from '../library.mjs';

describe('3.1 a curse needs the GM\'s own word', () => {
  const toll = { id: 'cl_toll', askMechanic: 'curse', text: 'tolls for the dying' };
  const witch = { id: 'cl_witch', askMechanic: 'curse', text: 'curses trespassers' };

  test("the tollkeeper's clause does not ask for a curse, and the witch's does", () => {
    expect(toll.askMechanic).toBe('curse');            // the call DID say curse — that is the point
    expect(clauseAsksACurse(toll)).toBe(false);
    expect(clauseAsksACurse(witch)).toBe(true);
  });

  test('every word the owner listed counts, in its forms', () => {
    for (const t of ['curses trespassers', 'lays a curse', 'the cursed walk out', 'a hex on the water',
      'she hexes them', 'an accursed grove', 'jinxes the unwary', 'a malediction']) {
      expect([t, clauseAsksACurse({ askMechanic: 'curse', text: t })]).toEqual([t, true]);
    }
    for (const t of ['tolls for the dying', 'exacts a price', 'rebukes the faithless', 'collects a debt']) {
      expect([t, clauseAsksACurse({ askMechanic: 'curse', text: t })]).toEqual([t, false]);
    }
  });

  test('the words alone are not enough either — the call must say curse too', () => {
    expect(clauseAsksACurse({ askMechanic: 'drain', text: 'curses trespassers' })).toBe(false);
    expect(CURSE_WORDS.test('curses trespassers')).toBe(true);   // the words are there; the mechanic is not
  });

  test('the seat\'s lead falls back where the words do not name one', () => {
    expect(leadForSeat('the toll marks the dying', [toll], 'drain')).toBe('drain');
    expect(leadForSeat('a hex on trespassers', [witch], 'curse')).toBe('curse');
  });

  test("the template's keys are the curse's own, not the debt's", () => {
    const seed = LIBRARY_SEEDS.find((x) => x.key === 'curse-debt');
    expect(seed.keys).toEqual(['curse', 'hex', 'accursed', 'jinx']);
    for (const stale of ['debt', 'rebuke', 'price']) expect(seed.keys).not.toContain(stale);
  });
});

describe('3.4 a curse row is worth the attack it costs', () => {
  test('it deals one whole hit, at every CR', () => {
    for (const [cr, hit] of [[3, 9], [7, 16], [12, 22], [17, 30]]) {
      const r = drawLibraryRow({ cr, dc: 10 + Math.round(cr / 2), pb: 3, per_hit: hit, sections: {} },
        { archetype: 'caster', name: 'Tollkeeper', shapeKey: 'curse-debt', imposed: [], cr });
      expect(r).toBeTruthy();                           // the subject is present
      const dealt = Number((/(\d+) \(\d+d\d+/.exec(r.row.text) ?? [])[1]);
      expect([cr, Math.abs(dealt - hit) <= 3]).toEqual([cr, true]);   // within a die of one hit
    }
  });

  test('the fraction is the ruling, not the debt it was written for', () => {
    expect(LIBRARY_SEEDS.find((x) => x.key === 'curse-debt').dpr_frac).toBe(1.0);
  });

  test('it still carries the curse sentence and no duration', () => {
    const r = drawLibraryRow({ cr: 7, dc: 14, pb: 3, per_hit: 16, sections: {} },
      { archetype: 'caster', name: 'Mirewitch', shapeKey: 'curse-debt', imposed: [], cr: 7 });
    expect(r.row.text).toMatch(/the target is cursed\. While cursed, /);
    expect(r.row.text).not.toMatch(/\buntil\b/);
  });
});
