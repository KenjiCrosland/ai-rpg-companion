/**
 * WHEN THE ROW WRITTEN FOR THE GM'S WORD FAILS, THE CATALOG'S TEMPLATE FOR THAT WORD LANDS
 * (owner's ruling R4, 2026-11-18).
 *
 * The marsh witch is the case. The GM typed "a marsh witch who curses trespassers", the route call
 * declared the ask `curse`, the menu led with the curse templates — and then her seat's own hex was
 * refused as a save with no effect (item 2.2) and her sheet shipped with nothing on it that curses.
 * The catalog held a curse the whole time.
 *
 * COUNTED FIRST, on the forty: 37 sheets carry a declared ask, 13 had the seat that carries it end
 * with no row, and 3 of those had a template for that mechanic still live on the menu — s02 and s35
 * (`hook-rider` for `grapple`) and s04 (`delayed-brand` for `drain`). The witch becomes a fourth
 * once 2.2 refuses her empty save, which is the chain the ruling describes.
 *
 * This file tests the ROUTING half. The three conditions are all answers we already hold: the route
 * call's declared ask, the seat having ended with no row (reaching the landing is that fact, since
 * the seat returns the moment it lands one), and the fit call's own list of templates whose key word
 * "does not mean the mechanic here".
 */
import { templatesForDeclaredAsk } from '../generate.mjs';

const menu = [
  { id: 'curse-debt', mechanic: 'curse' },
  { id: 'delayed-brand', mechanic: 'curse' },
  { id: 'lure', mechanic: 'pull' },
  { id: 'hook-rider', mechanic: 'grapple' },
];

describe("the declared ask gets the catalog's row", () => {
  test("the ask's own templates are offered, in menu order", () => {
    expect(templatesForDeclaredAsk('curse', menu, new Set()).map((t) => t.id)).toEqual(['curse-debt', 'delayed-brand']);
    expect(templatesForDeclaredAsk('grapple', menu, new Set()).map((t) => t.id)).toEqual(['hook-rider']);
  });

  test('a template the call declined AS A WORD MISMATCH is never revived', () => {
    expect(templatesForDeclaredAsk('curse', menu, new Set(['curse-debt'])).map((t) => t.id)).toEqual(['delayed-brand']);
    expect(templatesForDeclaredAsk('curse', menu, new Set(['curse-debt', 'delayed-brand']))).toEqual([]);
  });

  test('no declared ask means no landing at all', () => {
    expect(templatesForDeclaredAsk(null, menu, new Set())).toEqual([]);
    expect(templatesForDeclaredAsk(undefined, menu, new Set())).toEqual([]);
    expect(templatesForDeclaredAsk('', menu, new Set())).toEqual([]);
  });

  test('an ask no template on the menu answers lands nothing', () => {
    expect(templatesForDeclaredAsk('breath', menu, new Set())).toEqual([]);
  });

  test('an empty or missing menu is handled without throwing', () => {
    expect(templatesForDeclaredAsk('curse', [], new Set())).toEqual([]);
    expect(templatesForDeclaredAsk('curse', null, new Set())).toEqual([]);
    expect(templatesForDeclaredAsk('curse', menu)).toHaveLength(2);
  });

  // THE CATALOG REALLY HOLDS A CURSE, which is the fact the whole ruling rests on: if nothing on
  // the menu answered `curse`, R4 would be unreachable for the sheet it was written for.
  test('the catalog answers the witch\'s declared ask', () => {
    const { TEMPLATES } = require('../templates.mjs');
    const curses = TEMPLATES.filter((t) => t.mechanic === 'curse');
    expect(curses.length).toBeGreaterThan(0);
    expect(curses.map((t) => t.id)).toContain('curse-debt');
    expect(templatesForDeclaredAsk('curse', curses, new Set()).length).toBe(curses.length);
  });
});
