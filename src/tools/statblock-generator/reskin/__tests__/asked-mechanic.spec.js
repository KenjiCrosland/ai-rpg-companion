/**
 * THE DECLARED MECHANIC REACHES THE MENU.
 *
 * Declared metadata has gone silently inert here before: eight `needs_body`
 * declarations were carried on only one of the catalog's two branches and the
 * gate did nothing for a week. These tests guard the reach, not the taste.
 */
import { templatesFor, rankByVerb, TEMPLATES, MECHANIC, MECHANIC_OF } from '@/tools/statblock-generator/reskin/templates.mjs';
import { ASKED_MECHANICS } from '@/tools/statblock-generator/reskin/route.mjs';

describe('asked_mechanic', () => {
  it('the enum the call answers from and the enum the catalog declares are the same list', () => {
    // a mechanic the call can name but no template declares is a dead answer;
    // one the catalog declares but the call cannot name is unreachable.
    expect([...ASKED_MECHANICS].sort()).toEqual(Object.keys(MECHANIC).sort());
  });

  it('every template carries a mechanic stamp on both catalog branches', () => {
    expect(TEMPLATES.filter((t) => !t.mechanic).map((t) => t.id)).toEqual([]);
    for (const t of TEMPLATES) expect(ASKED_MECHANICS).toContain(t.mechanic);
  });

  it('the stamp seats its own template first where the words carry no verb', () => {
    // the sticky-owlbear class: "lizardfolk ninja" and "fire monk" give the key
    // list nothing to read, so order fell to catalog position.
    const menu = templatesFor({ archetype: 'brute', cr: 9, sections: {}, section: 'action', trigger: null });
    const present = [...new Set(menu.map((t) => t.mechanic))].filter(Boolean);
    expect(present.length).toBeGreaterThan(1);
    for (const m of present) {
      expect(rankByVerb(menu, 'a pale thing', '', m)[0].t.mechanic).toBe(m);
    }
  });

  it('a misread mechanic reorders and never drops a candidate', () => {
    const menu = templatesFor({ archetype: 'lurker', cr: 7, sections: {}, section: 'action', trigger: null });
    const base = rankByVerb(menu, 'a thing that swallows people whole').map((r) => r.t.id);
    for (const wrong of ASKED_MECHANICS) {
      const got = rankByVerb(menu, 'a thing that swallows people whole', '', wrong).map((r) => r.t.id);
      expect([...got].sort()).toEqual([...base].sort()); // same set, different order
    }
  });

  it('an unknown mechanic is inert rather than destructive', () => {
    const menu = templatesFor({ archetype: 'brute', cr: 5, sections: {}, section: 'action', trigger: null });
    const plain = rankByVerb(menu, 'a thing that tramples').map((r) => r.t.id);
    expect(rankByVerb(menu, 'a thing that tramples', '', 'not_a_mechanic').map((r) => r.t.id)).toEqual(plain);
    expect(rankByVerb(menu, 'a thing that tramples', '', null).map((r) => r.t.id)).toEqual(plain);
  });

  it('MECHANIC_OF agrees with the stamp the catalog carried', () => {
    for (const t of TEMPLATES) {
      if (MECHANIC_OF[t.id]) expect(t.mechanic).toBe(MECHANIC_OF[t.id]);
    }
  });
});

/**
 * A SLOT MUST KEEP THE PROMISE ITS FRAME MAKES.
 *
 * print writes "an infernal wound" and then "While wounded… The wound closes…
 * stanch the wound". The slot used to swallow the whole noun phrase, so a fill of
 * "tar-snared footing" shipped "The target receives a tar-snared footing. While
 * wounded… stanch the wound, succeeding on a DC 15 Wisdom (Medicine) check."
 */
describe('the affliction frame and its wound slot', () => {
  const { TEMPLATES: T2, renderTemplate, SHAPES } = require('@/tools/statblock-generator/reskin/templates.mjs');
  const frames = require('@/tools/statblock-generator/reskin/shapes.mjs');

  it('the frame keeps print\'s noun and never parameterises it away', () => {
    const aff = (frames.SHAPES ?? []).find((s) => s.id === 'affliction');
    expect(aff).toBeTruthy();
    for (const text of Object.values(aff.frames)) {
      expect(text).toContain('{wound_phrase}');
      expect(text).not.toContain('{wound_noun}');
      // the three back-references print makes, which the fill has to agree with
      expect(text).toMatch(/While wounded/);
      expect(text).toMatch(/The wound closes/);
      expect(text).toMatch(/stanch the wound/);
      // the article now belongs to the fill, so the frame must not supply one
      expect(text).not.toMatch(/\ba \{wound_phrase\}/);
    }
  });

  it('the slot carries a contract the model can read', () => {
    const tpl = T2.find((t) => t.id === 'affliction');
    expect(tpl.flavor).toContain('wound_phrase');
  });
});
