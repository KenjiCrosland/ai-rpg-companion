/**
 * COMPOSED OPTIONS ARE MENU LINES, NOT A FORM
 * (plans/composed-candidates-on-the-menu-2026-10-26.md).
 *
 * The fit call refused the family form five times in three runs, three of them
 * on ideas its own gap record described in the form's own words — "radiates an
 * aura of killing cold. At the start of each of its turns, creatures within…"
 * IS the zone condition payload. The form was a second task: placed after the
 * menu, labelled "IF NONE FITS, FILL THIS FORM INSTEAD", showing descriptions
 * rather than rules text, after three paragraphs that make refusal productive,
 * with an explicit exit. And for zone the payloads already ARE templates — the
 * damage payload is `energy-aura`'s frame — so a second mechanism was built to
 * reach a row that was one menu line away.
 *
 * Now the engine composes the options BEFORE the call looks, and they ride the
 * menu like anything else: `parseFit` resolves a pick by id against the menu it
 * was handed, and `templateMenuLines` reads only fields the factory emits. One
 * task, no fallback framing, no extra call.
 */
import { composedCandidates, composedTemplate, GRAMMARS, orderByStamps, parseFit, buildFitPrompt, templateMenuLines, renderTemplate, TEMPLATE_BY_ID, gateStandsDown } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const ctx = (cr = 15, size = 'Huge') => ({ scaled: scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] }), archetype: 'brute', cr, size, imposed: [], name: 'C', energy: 'Cold', mix: 'both', meleeName: 'Slam' });
const plain = (t) => String(t).replace(/\*/g, '');
const render = (t, c) => renderTemplate(t, c, t.fills ?? {});
// A CONDITION ZONE NOW NEEDS THE IDEA TO NAME ITS CONDITION (fault 4, owner 2026-11-20), so the
// fixture carries an idea that names all three the family can still impose. Without one, a
// condition candidate is correctly enumerated as none — which is what the Dire Wolf's frost hide
// and the Glacier Heart's cold wake should have got instead of Deafened and Poisoned.
const NAMES_ALL = 'a poisonous, frightening, blinding reek';
const ZONE_DMG = { section: 'trait', trigger: 'start_of_turn', effect: 'damage', family: 'zone', idea: NAMES_ALL };

describe('the factory enumerates candidates, and the bans are enforced there', () => {
  // PRE-PICKED BY THE IDEA'S OWN EFFECT, so a damage idea sees the damage
  // payload and not the other three. That is the point: the call needs the one
  // candidate that fits its idea, not four aura variants to read past.
  it('a zone trait idea gets the candidate whose effect matches its tag', () => {
    const c = composedCandidates(ZONE_DMG, { can: [] });
    expect(c.length).toBe(1);
    expect(c[0].effect).toBe('damage');
    expect(c[0].composed).toBe('zone');
    expect(c[0].id).toMatch(/^composed:zone:damage$/);
    const cond = composedCandidates({ ...ZONE_DMG, effect: 'condition' }, { can: [] });
    expect(cond.length).toBe(GRAMMARS.zone.conditions.length);     // one per condition it may name
    expect(new Set(cond.map((t) => t.id)).size).toBe(cond.length); // unique ids, or the parser cannot tell them apart
  });

  it('the lane is enumerated only for a sheet that measures a straight line', () => {
    const MOVE = { ...ZONE_DMG, effect: 'movement' };   // terrain and lane are both movement
    const without = composedCandidates(MOVE, { can: [] }).map((t) => t.id);
    const with_ = composedCandidates(MOVE, { can: ['line-move'] }).map((t) => t.id);
    expect(with_.length).toBe(without.length + 1);
    expect(without.some((id) => /lane/.test(id))).toBe(false);
    expect(with_.some((id) => /lane/.test(id))).toBe(true);
  });

  it('an action-seat zone idea enumerates nothing — the grammar is a trait shape', () => {
    expect(composedCandidates({ ...ZONE_DMG, section: 'action' }, { can: [] })).toEqual([]);
    expect(composedCandidates({ section: 'trait', trigger: 'always', effect: 'damage', family: 'mark' }, {})).toEqual([]); // no grammar
    expect(composedCandidates(null, {})).toEqual([]);
  });

  it('body-reaction is pre-picked by the idea\'s own effect, never all twelve', () => {
    const dmg = composedCandidates({ section: 'trait', trigger: 'on_being_hit', effect: 'damage', family: 'body-reaction' }, {});
    const mov = composedCandidates({ section: 'trait', trigger: 'on_being_hit', effect: 'movement', family: 'body-reaction' }, {});
    expect(dmg.length).toBeGreaterThan(0);
    expect(dmg.length).toBeLessThanOrEqual(6);
    expect(dmg.every((t) => t.effect === 'damage')).toBe(true);
    // the banned pair (a grappler pushed away by the thing holding it) is never materialised
    const pushers = mov.filter((t) => /pushed up to 5 feet/.test(String(Object.values(t.frames)[0])));
    expect(pushers.every((t) => !/grapple/i.test(String(Object.values(t.frames)[0])))).toBe(true);
  });

  it('a body-reaction condition candidate offers only the conditions print imposes without a save', () => {
    const c = composedCandidates({ section: 'trait', trigger: 'on_being_hit', effect: 'condition', family: 'body-reaction' }, {});
    const texts = c.flatMap((t) => Object.values(t.frames).map(String));
    expect(texts.length).toBeGreaterThan(0);
    for (const bad of ['Prone', 'Blinded', 'Frightened']) expect(texts.join(' ')).not.toMatch(new RegExp(`${bad} condition`));
  });
});

describe('a candidate is an ordinary menu line', () => {
  it('its rendered text is the template it stands in for', () => {
    const dmg = composedCandidates(ZONE_DMG, { can: [] }).find((t) => t.effect === 'damage');
    expect(plain(render(dmg, ctx(15)).text)).toBe(plain(renderTemplate(TEMPLATE_BY_ID.get('energy-aura'), ctx(15)).text));
  });

  it('it renders on the menu with its stamps and its rules text, like a template', () => {
    const cands = composedCandidates(ZONE_DMG, { can: [] });
    const lines = templateMenuLines(orderByStamps(cands, ZONE_DMG), { cr: 15, concept: 'a glacier', idea: ZONE_DMG });
    expect(lines).toMatch(/^- composed:zone:\w+ \[Traits\] \(fires: start_of_turn, does: \w+/m);
    expect(lines).toMatch(/matches the idea/);
    expect(lines).toMatch(/Emanation originating from the creature/);   // real rules text, not a description
  });

  it('it sorts by stamps with the real templates, not ahead of them', () => {
    const real = ['spider-climb', 'phobia'].map((id) => TEMPLATE_BY_ID.get(id));
    const ordered = orderByStamps([...real, ...composedCandidates(ZONE_DMG, { can: [] })], ZONE_DMG);
    expect(ordered[0].effect).toBe('damage');            // the stamp-matching one leads, composed or not
    expect(ordered[0].trigger).toBe('start_of_turn');
  });

  it('a pick of it resolves through the unchanged parser', () => {
    const cands = composedCandidates(ZONE_DMG, { can: [] });
    const id = cands.find((t) => t.effect === 'damage').id;
    const fit = parseFit(JSON.stringify({ template: id, because: 'cold pours off it', name: 'Killing Cold' }), cands, 'C');
    expect(fit.template?.id).toBe(id);
    expect(fit.template?.composed).toBe('zone');
  });
});

describe('the form is gone', () => {
  const menu = [TEMPLATE_BY_ID.get('energy-aura')];
  const prompt = () => buildFitPrompt({ name: 'C', idea: ZONE_DMG, menu, cr: 15, concept: 'a glacier heart' });

  it('no form block, no compose field', () => {
    expect(prompt()).not.toMatch(/FILL THIS FORM/);
    expect(prompt()).not.toMatch(/"compose"/);
    expect(prompt()).not.toMatch(/THIS FORM IS THE REFUSAL PATH/);
  });

  it('"closest" is asked for again, on every seat', () => {
    expect(prompt()).toMatch(/"closest":/);
    expect(prompt()).toMatch(/comes CLOSEST/);
    const other = buildFitPrompt({ name: 'C', idea: { section: 'trait', trigger: 'always', effect: 'damage', family: 'mark', idea: 'x '.repeat(12) }, menu, cr: 15, concept: 'c' });
    expect(other).toMatch(/"closest":/);
  });

  it('parseFit no longer carries a compose answer', () => {
    const f = parseFit(JSON.stringify({ template: 'none', compose: { payload: 'anything' }, missing: 'x' }), menu, 'C');
    expect(f.compose).toBeUndefined();
  });
});

describe('the gate sees composed candidates through its stamps arm', () => {
  it('stands down because a candidate on the pool matches, not because a grammar exists', () => {
    const pool = [TEMPLATE_BY_ID.get('spider-climb'), ...composedCandidates(ZONE_DMG, { can: [] })];
    const r = gateStandsDown(pool, ZONE_DMG);
    expect(r.down).toBe(true);
    expect(r.because).toMatch(/stamps/);
    // with no candidate on the pool and no stamp match, it holds
    expect(gateStandsDown([TEMPLATE_BY_ID.get('spider-climb')], ZONE_DMG).down).toBe(false);
  });
});
