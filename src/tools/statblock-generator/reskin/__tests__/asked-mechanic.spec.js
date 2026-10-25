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

/**
 * A DECLARED RECORD MUST SURVIVE BOTH BRANCHES.
 *
 * `imposes` lives in two places — the library row and IMPOSES_BY_TEMPLATE — and
 * renderTemplate's seed branch read only the library's, so the adhesive seed
 * (whose template declares Grappled) shipped with no record at all. Third time a
 * declaration has been inert on one of the catalog's two branches.
 */
describe('imposes reaches the row on both branches', () => {
  const { TEMPLATES: T3, renderTemplate: rt } = require('@/tools/statblock-generator/reskin/templates.mjs');

  it('the record the seed branch now consults actually holds the condition', () => {
    // the data half of the fix: without this, reading it in the seed branch is a
    // no-op and the test above would pass on an empty table
    const { imposedByFrame } = require('@/tools/statblock-generator/reskin/templates.mjs');
    expect([imposedByFrame('adhesive', '3-5')].flat()).toContain('Grappled');
    expect([imposedByFrame('snare', '3-5')].flat().filter(Boolean).length).toBeGreaterThan(0);
    expect(imposedByFrame('not-a-template', '3-5')).toBeNull();
  });

  it('every seed template either declares a condition or its frame imposes none', () => {
    const CONDS = ['Grappled', 'Restrained', 'Prone', 'Poisoned', 'Frightened', 'Charmed', 'Blinded', 'Stunned'];
    const { imposedByFrame } = require('@/tools/statblock-generator/reskin/templates.mjs');
    const unrecorded = T3.filter((t) => t.kind === 'seed').filter((t) => {
      const frames = Object.values(t.frames ?? {}).map(String).join(' ');
      const imposes = CONDS.some((c) => new RegExp(`(?:target|creature|it) (?:has|gains) the (?:\\w+ and )?${c} condition|is also ${c}\\b`).test(frames)
        && !new RegExp(`(?:that|who) (?:has the ${c} condition|is ${c})`).test(frames));
      return imposes && !t.imposes && !imposedByFrame(t.id, '3-5') && !imposedByFrame(t.id, '6-9');
    }).map((t) => t.id);
    expect(unrecorded).toEqual([]);
  });

  it('no template declares a condition it also merely requires', () => {
    // "that has the X condition" is a prerequisite; a record there would make a
    // payoff satisfy its own gate (the self-satisfying loop)
    for (const t of T3) {
      const frames = Object.values(t.frames ?? {}).map(String).join(' ');
      if (!/that has the (\w+) condition/.test(frames)) continue;
      const req = /that has the (\w+) condition/.exec(frames)[1];
      const rec = [t.imposes].flat().filter(Boolean);
      expect(rec).not.toContain(req);
    }
  });
});

/**
 * THE FIRST MECHANIC-ROUTED TEMPLATE.
 *
 * `kill-denial` carries no key words on purpose — the declared mechanic is its
 * only route. Adding it surfaced a FOURTH way a declaration can ship inert: a
 * shape with no SHAPE_TAGS entry is silently dropped by the catalog filter
 * (`SHAPES.filter((s) => SECTION_BY_REPLACES[s.replaces] && SHAPE_TAGS[s.id])`),
 * so the template never existed and its NEEDS_BODY entry pointed at nothing.
 */
describe('kill-denial', () => {
  const { TEMPLATES: T4, renderTemplate: rt4, NEEDS_BODY: NB } = require('@/tools/statblock-generator/reskin/templates.mjs');
  const { SHAPES } = require('@/tools/statblock-generator/reskin/shapes.mjs');
  const { pickDonor, scaleDonor } = require('@/tools/statblock-generator/reskin/scale.mjs');
  const tpl = () => T4.find((t) => t.id === 'kill-denial');

  it('every SHAPE reaches TEMPLATES — a missing SHAPE_TAGS entry drops it silently', () => {
    // `throw-recall` is PRE-EXISTING dead code, found by this test rather than
    // introduced by it: it is marked `invented: true`, has no SHAPE_TAGS entry, and
    // declares `replaces: 'ranged'`, which is not a key of SECTION_BY_REPLACES — so
    // it has been unreachable since it was written. Admitting it by name keeps the
    // guard live for new shapes; reviving it would ADD a template to the catalog and
    // needs its own measurement, so it is not done here.
    const KNOWN_UNREACHABLE = new Set(['throw-recall']);
    const ids = new Set(T4.map((t) => t.id));
    expect(SHAPES.filter((s) => !ids.has(s.id) && !KNOWN_UNREACHABLE.has(s.id)).map((s) => s.id)).toEqual([]);
  });

  it('is reachable, stamped, and declares a body requirement', () => {
    const t = tpl();
    expect(t).toBeTruthy();
    expect(t.mechanic).toBe('harvest');
    expect(t.section).toBe('trait');
    expect(NB['kill-denial']).toBeTruthy();
  });

  it('renders at every CR band and never leaves a slot unfilled', () => {
    for (const cr of [1, 4, 8, 11, 17]) {
      const ctx = { scaled: scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] }), archetype: 'brute', cr, imposed: [], name: 'H' };
      const r = rt4(tpl(), ctx, { kill_consequence: 'loses its head' });
      expect(r).toBeTruthy();
      expect(r.text).not.toMatch(/\{[a-z_]+\}/);
      expect(r.text).toMatch(/loses its head/);
      expect(r.text).toMatch(/can't be restored to life/);
    }
  });

  it('a fill carrying damage or dice falls to print\'s own default', () => {
    const ctx = { scaled: scaleDonor(pickDonor(9, null, 'brute'), 9, { mechanics: [] }), archetype: 'brute', cr: 9, imposed: [], name: 'H' };
    for (const bad of ['takes 10 (3d6) damage', 'has the Prone condition', 'makes a DC 15 saving throw']) {
      expect(rt4(tpl(), ctx, { kill_consequence: bad }).text).toMatch(/crumbles to dust/);
    }
  });

  it('the victim is never renamed by the self-reference rewrite', () => {
    // generate.mjs rewrites the literal "the creature" to the monster's name; the
    // frame may use it ONCE, for the killer, or the victim gets renamed too
    const frame = SHAPES.find((s) => s.id === 'kill-denial').frames['6-9'];
    expect((frame.match(/the creature/g) ?? []).length).toBe(1);
  });

  it('prices at zero — it changes nothing in the fight', () => {
    const { rowValue } = require('@/tools/statblock-generator/reskin/templates.mjs');
    const ctx = { scaled: scaleDonor(pickDonor(11, null, 'brute'), 11, { mechanics: [] }), archetype: 'brute', cr: 11, imposed: [], name: 'H' };
    const r = rt4(tpl(), ctx, { kill_consequence: 'loses its head' });
    expect(rowValue({ name: 'X', text: r.text, template: 'kill-denial' }, 11).ev).toBe(0);
  });
});
