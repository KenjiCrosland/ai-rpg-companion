/**
 * WHO MAY CURSE UNASKED (owner's ruling, 2026-11-21).
 *
 * `curse-debt` is a PERMANENT curse offered in place of one attack, and it answers to nine
 * everyday words besides the four that name a curse: debt, price, bargain, owe, tithe, toll,
 * judgment, rebuke, sin — and oath. So a tax collector, a judge, a bell-ringer and a creditor all
 * reached a permanent curse without the GM typing one. s17's Pit Fiend took it on "oath", which
 * the owner allowed for a fiend that binds by oaths and for that case only.
 *
 * The four curse words bind on anything. The rest bind only where cursing is what the creature IS.
 * This changes no prompt: it is a legality gate on the menu.
 */
import { mayCurseUnasked, templatesFor } from '../templates.mjs';

// READ AT THE LANDING, NOT ON THE MENU (owner, 21 November afternoon). As a menu filter it changed
// the fit prompt on eight sheets of the forty, for a template that landed on none of them. The
// predicate is the same; what reads it moved.
const offered = (text, type) => mayCurseUnasked(text, type);

describe('the menu is untouched — the gate is at the landing', () => {
  test('curse-debt is still offered to the fit call on a Humanoid who takes a toll', () => {
    const sections = { Actions: [
      { name: 'Multiattack', text: 'The creature makes two Blade attacks.' },
      { name: 'Blade', text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d6 + 5) Slashing damage.' },
    ] };
    const text = 'a tollkeeper who takes a toll from the dying';
    expect(templatesFor({ archetype: 'caster', cr: 5, sections, section: 'action', text, concept: text, type: 'Humanoid' })
      .map((t) => t.id)).toContain('curse-debt');
  });
});

describe('a word that is not a curse binds only on a creature that curses by nature', () => {
  test('"toll" lands it on a Fiend and not on a Humanoid', () => {
    const words = 'a tollkeeper who takes a toll from the dying';
    expect(offered(words, 'Fiend')).toBe(true);
    expect(offered(words, 'Humanoid')).toBe(false);
  });

  test('"curse" lands it on both', () => {
    const words = 'a witch who curses trespassers';
    expect(offered(words, 'Fiend')).toBe(true);
    expect(offered(words, 'Humanoid')).toBe(true);
  });

  test('the four types, and the four curse words', () => {
    for (const type of ['Fiend', 'Fey', 'Undead', 'Aberration']) {
      expect([type, offered('a judge who exacts a price', type)]).toEqual([type, true]);
    }
    for (const w of ['curses', 'hexes', 'accursed', 'jinxed']) {
      expect([w, offered(`a traveller who is ${w}`, 'Humanoid')]).toEqual([w, true]);
    }
  });

  test('and the everyday words do not, on a Humanoid', () => {
    for (const w of ['debt', 'price', 'bargain', 'tithe', 'toll', 'judgment', 'rebuke', 'sin', 'oath']) {
      expect([w, offered(`a creature that exacts a ${w}`, 'Humanoid')]).toEqual([w, false]);
    }
  });

  test('s17: the Pit Fiend keeps it on "oath", because a fiend binds by oaths', () => {
    expect(offered('a devil who collects the oaths of dying knights', 'Fiend')).toBe(true);
  });
});
