/**
 * WHEN NOTHING FITS, THE CALL FILLS THE FAMILY'S FORM
 * (plans/compose-the-row-body-reaction-2026-10-26.md).
 *
 * 18-45% of signature rows across six same-batch runs shipped as the NEAREST
 * template — unreceipted filler — and two-thirds of the call's own 122 "what is
 * missing" records are variants of shapes the catalog already has. A template is
 * a form with every blank pinned; a family grammar is the same form with three
 * blanks open, each a closed list. The call picks list items and never writes
 * rules prose; the engine assembles print's own sentence (the skeleton is the
 * Black Pudding's Corrosive Form, the one reactive trait in SRD 5.2) and the row
 * rides renderTemplate -> trait ceiling -> checker exactly as a template does.
 *
 * Soundness therefore lives where it already lives: the skeleton, the closed
 * lists, the engine's own numbers, and a per-family ban list.
 */
import { GRAMMARS, composedTemplate, parseFit, parseIdeas, buildFitPrompt, buildIdeaPrompt, renderTemplate, TEMPLATE_BY_ID, IDEA_FAMILIES } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const G = () => GRAMMARS['body-reaction'];
const ctx = (cr = 8, energy = 'Cold') => ({ scaled: scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] }), archetype: 'brute', cr, imposed: [], name: 'S', energy, mix: 'both', meleeName: 'Slam' });
const fitJson = (o) => JSON.stringify({ template: 'none', declined_because: 'no_fit', closest: '', missing: 'x', name: 'Clinging Mud', ...o });

describe('the form the call fills', () => {
  it('accepts an answer whose every value is a list item, by exact text', () => {
    const g = G();
    const f = parseFit(fitJson({ compose: { trigger: g.trigger[1], consequence: g.consequence[2] } }), [], 'Scree Tide', [], 'body-reaction');
    expect(f.compose).toEqual({ family: 'body-reaction', trigger: g.trigger[1], consequence: g.consequence[2], condition: null });
  });

  it('refuses a value the call invented', () => {
    expect(parseFit(fitJson({ compose: { trigger: 'looks at it funny', consequence: G().consequence[2] } }), [], '', [], 'body-reaction').compose).toBeNull();
    expect(parseFit(fitJson({ compose: { trigger: G().trigger[0], consequence: 'dies instantly' } }), [], '', [], 'body-reaction').compose).toBeNull();
  });

  it('requires a condition for the condition consequence, from the closed list, and never Prone', () => {
    const g = G();
    expect(parseFit(fitJson({ compose: { trigger: g.trigger[0], consequence: g.consequence[1] } }), [], '', [], 'body-reaction').compose).toBeNull(); // no condition given
    expect(parseFit(fitJson({ compose: { trigger: g.trigger[0], consequence: g.consequence[1], condition: 'Prone' } }), [], '', [], 'body-reaction').compose).toBeNull();
    // PRINT'S OWN PRACTICE BOUNDS THE LIST (2026-10-26): the skeleton carries no
    // saving throw, and print imposes only Poisoned without one at any scale
    // (14 rows; Blinded 2, both face-wrapping actions with an escape; Frightened 1;
    // Deafened 0). The first canary composed a no-save Blinded on every melee hit
    // at CR 8 — strong enough to hand every attacker Advantage and to compound
    // with each striker — and Frightened on being hit forbids melee outright.
    expect(parseFit(fitJson({ compose: { trigger: g.trigger[0], consequence: g.consequence[1], condition: 'Blinded' } }), [], '', [], 'body-reaction').compose).toBeNull();
    expect(parseFit(fitJson({ compose: { trigger: g.trigger[0], consequence: g.consequence[1], condition: 'Frightened' } }), [], '', [], 'body-reaction').compose).toBeNull();
    expect(G().conditions).toEqual(['Poisoned', 'Deafened']);
    expect(parseFit(fitJson({ compose: { trigger: g.trigger[0], consequence: g.consequence[1], condition: 'Poisoned' } }), [], '', [], 'body-reaction').compose?.condition).toBe('Poisoned');
  });

  it('refuses the banned pair: a grappler pushed away by the thing holding it', () => {
    const g = G();
    expect(parseFit(fitJson({ compose: { trigger: g.trigger[2], consequence: g.consequence[3] } }), [], '', [], 'body-reaction').compose).toBeNull();
  });

  it('ignores a form filled alongside a real template pick', () => {
    const t = TEMPLATE_BY_ID.get('heated-body');
    const raw = JSON.stringify({ template: 'heated-body', because: 'x', name: 'Heat', compose: { trigger: G().trigger[0], consequence: G().consequence[2] } });
    const f = parseFit(raw, [t], 'S', [], 'body-reaction');
    expect(f.template?.id).toBe('heated-body');
    expect(f.compose).toBeNull();
  });
});

describe('the engine assembles print\'s sentence', () => {
  it('the Scree Tide case reads as print writes a body reaction', () => {
    const g = G();
    const t = composedTemplate({ family: 'body-reaction', trigger: g.trigger[1], consequence: g.consequence[2], condition: null });
    const r = renderTemplate(t, ctx(8));
    expect(r.text.replace(/\*/g, '')).toBe('A creature that touches the creature or hits it with a melee attack while within 5 feet of it has its Speed halved until the end of its next turn.');
  });

  it('the damage consequence takes print\'s own retaliation ladder and the sheet\'s energy', () => {
    const g = G();
    const t = composedTemplate({ family: 'body-reaction', trigger: g.trigger[0], consequence: g.consequence[0], condition: null });
    expect(renderTemplate(t, ctx(8, 'Cold')).text.replace(/\*/g, '')).toBe('A creature that hits the creature with a melee attack while within 5 feet of it takes 7 (2d6) Cold damage.');
    expect(renderTemplate(t, ctx(2, 'Fire')).text.replace(/\*/g, '')).toMatch(/takes 3 \(1d6\) Fire damage\.$/); // the band's own number, as heated-body
  });

  it('a sheet with no energy gets a physical type, never a blank', () => {
    const g = G();
    const t = composedTemplate({ family: 'body-reaction', trigger: g.trigger[0], consequence: g.consequence[0], condition: null });
    const text = renderTemplate(t, { ...ctx(8, null), mix: 'physical' }).text;
    expect(text).toMatch(/takes 7 \(2d6\) (?:Bludgeoning|Piercing|Slashing) damage/);
    expect(text).not.toMatch(/\{|\}/);
  });

  it('the condition consequence names the condition the call chose', () => {
    const g = G();
    const t = composedTemplate({ family: 'body-reaction', trigger: g.trigger[2], consequence: g.consequence[1], condition: 'Poisoned' });
    expect(renderTemplate(t, ctx(8)).text.replace(/\*/g, '')).toBe('A creature that grapples the creature or is grappled by it has the Poisoned condition until the end of its next turn.');
  });

  it('the synthesised template declares what the engine reads off it', () => {
    const g = G();
    const t = composedTemplate({ family: 'body-reaction', trigger: g.trigger[0], consequence: g.consequence[0], condition: null });
    expect(t.section).toBe('trait');
    expect(t.trigger).toBe('on_being_hit');
    expect(t.effect).toBe('damage');
    expect(t.gate).toBeNull();
    expect(t.nova).toBe(false);
    expect(Array.isArray(t.flavor)).toBe(true);
    expect(t.composed).toBe('body-reaction');
    expect(Object.keys(t.frames)).toEqual(['0-2', '3-5', '6-9', '10-12', '13-20', '21+']);
  });

  it('the RENDERED row carries the condition as declared data — never left to be re-read off the text', () => {
    // One stray "record completed" trace fired on a composed row (run 16-23-12)
    // after this was declared. The chain template -> rendered -> row is
    // deterministic, so that trace was stale code on the dev server (src edited
    // seconds before the smoke launched), not a path that drops the field.
    const g = G();
    const t = composedTemplate({ family: 'body-reaction', trigger: g.trigger[0], consequence: g.consequence[1], condition: 'Deafened' });
    const r = renderTemplate(t, ctx(8));
    expect(r.imposes).toBe('Deafened');
    expect(renderTemplate(composedTemplate({ family: 'body-reaction', trigger: g.trigger[0], consequence: g.consequence[0] }), ctx(8)).imposes).toBeUndefined(); // damage imposes nothing
  });

  it('the effect cell follows the consequence', () => {
    const g = G();
    const eff = (i, c = null) => composedTemplate({ family: 'body-reaction', trigger: g.trigger[0], consequence: g.consequence[i], condition: c }).effect;
    expect(eff(0)).toBe('damage');
    expect(eff(1, 'Poisoned')).toBe('condition');
    expect(eff(2)).toBe('movement');
    expect(eff(3)).toBe('movement');
  });
});

describe('the family reaches the calls', () => {
  it('the idea call asks for a family from the closed list', () => {
    const p = buildIdeaPrompt({ name: 'S', cr: 8, concept: 'a quarry-pit thing of living scree', sheetLines: '- [Actions] Slam' });
    expect(p).toMatch(/"family"/);
    for (const f of IDEA_FAMILIES) expect(p).toContain(f);
  });

  it('parseIdeas reads the family, and falls back only for a reactive trait', () => {
    const mk = (extra) => JSON.stringify({ action: { idea: 'a'.repeat(30), section: 'action', trigger: 'save', effect: 'damage' }, trait: { idea: 'b'.repeat(30), trigger: 'on_being_hit', effect: 'damage', ...extra } });
    expect(parseIdeas(mk({ family: 'zone' })).trait.family).toBe('zone');
    expect(parseIdeas(mk({ family: 'not-a-family' })).trait.family).toBe('body-reaction'); // reactive trait fallback
    const noTrig = JSON.stringify({ action: { idea: 'a'.repeat(30), section: 'action', trigger: 'save', effect: 'damage', family: 'nonsense' }, trait: { idea: 'b'.repeat(30), trigger: 'always', effect: 'damage' } });
    expect(parseIdeas(noTrig).trait.family).toBeNull();
  });

  it('the form appears in the fit prompt ONLY for a family that has a grammar', () => {
    const menu = [TEMPLATE_BY_ID.get('heated-body')];
    const withG = buildFitPrompt({ name: 'S', idea: { idea: 'touching it leaves you mud-slick', section: 'trait', trigger: 'on_being_hit', effect: 'condition', family: 'body-reaction' }, menu, cr: 8, concept: 'a scree thing' });
    expect(withG).toMatch(/FILL THIS FORM/);
    expect(withG).toMatch(/"compose"/);
    expect(withG).toMatch(/Prone/); // the ban is stated
    // `zone` has a grammar of its own since 2026-10-26, so the negative case
    // must be a family that still has none.
    const withoutG = buildFitPrompt({ name: 'S', idea: { idea: 'it marks one foe and hunts it', section: 'trait', trigger: 'always', effect: 'condition', family: 'mark' }, menu, cr: 8, concept: 'a hunter' });
    expect(withoutG).not.toMatch(/FILL THIS FORM/);
  });
});
