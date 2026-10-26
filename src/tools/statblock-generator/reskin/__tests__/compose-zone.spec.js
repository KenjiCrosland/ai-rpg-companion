/**
 * THE ZONE FAMILY'S FORM (plans/compose-the-row-zone-2026-10-26.md).
 *
 * `zone` is the family the idea call tags most — 6 of 18 ideas in each of three
 * tens — and half of those are a PRESENCE around the creature: furnace heat, a
 * dread that unmans, a shroud of flies, turbulent air. print writes that three
 * ways and the catalog already holds all three (energy-aura, noxious-aura,
 * aberrant-ground); they were refused on body questions written for a stench
 * ("a SMELL or a choking cloud, not merely cold or dark") and a gaze ("a face
 * horrifying to look at"), so a dread presence had nowhere to go and shipped as
 * filler. So this form invents NO text: it offers print's own three frames and
 * lets the call pick the payload.
 *
 * Two rules measured off the corpus: an always-on aura is damage OR a condition
 * and never both (every damage-plus-condition emanation in SRD 5.2 — Horror
 * Nimbus, Stunning Screech, Spores, the sphinx roars — is a Recharge or n/Day
 * ACTION), and a condition aura carries a saving throw, which is why Frightened
 * belongs here (Fear Aura is print) though it is banned from body-reaction.
 */
import { GRAMMARS, composedTemplate, parseFit, renderTemplate, buildFitPrompt, TEMPLATE_BY_ID } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const Z = () => GRAMMARS.zone;
const render = (t, c) => renderTemplate(t, c, t.fills ?? {}); // the engine merges a composed template's declared fills; mirror that here
const ctx = (cr = 8, energy = 'Cold') => ({ scaled: scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] }), archetype: 'brute', cr, imposed: [], name: 'S', energy, mix: 'both', meleeName: 'Slam' });
const fitJson = (o) => JSON.stringify({ template: 'none', declined_because: 'no_fit', missing: 'x', name: 'Dread Presence', ...o });
const fit = (o) => parseFit(fitJson(o), [], '', [], 'zone').compose;
const plain = (t) => String(t).replace(/\*/g, '');

describe('the zone form the call fills', () => {
  it('accepts each payload by exact text', () => {
    const z = Z();
    for (let i = 0; i < z.payload.length; i += 1) {
      const extra = i === z.condition_for ? { condition: 'Frightened' } : {};
      expect(fit({ compose: { payload: z.payload[i], ...extra } })).toMatchObject({ family: 'zone', payload: z.payload[i] });
    }
  });

  it('refuses an invented payload', () => {
    expect(fit({ compose: { payload: 'everything in the room dies' } })).toBeNull();
  });

  it('a condition aura takes a condition from the closed list — Frightened allowed here, Prone never', () => {
    const z = Z();
    const p = z.payload[z.condition_for];
    expect(fit({ compose: { payload: p, condition: 'Frightened' } })?.condition).toBe('Frightened');
    expect(fit({ compose: { payload: p, condition: 'Prone' } })).toBeNull();
    expect(fit({ compose: { payload: p } })).toBeNull();                       // none given
    expect(z.conditions).toEqual(['Poisoned', 'Frightened', 'Deafened', 'Blinded']);
  });

  it('refuses a condition on a payload that has no slot for one — print gates damage-plus-condition behind a Recharge', () => {
    const z = Z();
    const dmg = z.payload[z.effect.indexOf('damage')];
    expect(fit({ compose: { payload: dmg, condition: 'Poisoned' } })).toBeNull();
  });
});

describe('the engine reuses print\'s own aura frames', () => {
  it('the damage payload IS energy-aura\'s frame, band for band', () => {
    const z = Z();
    const t = composedTemplate({ family: 'zone', payload: z.payload[z.effect.indexOf('damage')] });
    for (const cr of [2, 8, 15]) {
      expect(plain(renderTemplate(t, ctx(cr)).text)).toBe(plain(renderTemplate(TEMPLATE_BY_ID.get('energy-aura'), ctx(cr)).text));
    }
  });

  it('the condition payload carries noxious-aura\'s own sizes by band', () => {
    const z = Z();
    const t = composedTemplate({ family: 'zone', payload: z.payload[z.condition_for], condition: 'Poisoned' });
    const sizeOf = (s) => (/(\d+)-foot Emanation/.exec(s) ?? [])[1];
    for (const cr of [3, 8, 15]) {
      expect(sizeOf(plain(render(t, ctx(cr)).text))).toBe(sizeOf(plain(renderTemplate(TEMPLATE_BY_ID.get('noxious-aura'), ctx(cr)).text)));
    }
  });

  it('a condition aura gets print\'s save stat for that condition, and declares what it imposes', () => {
    const z = Z();
    const p = z.payload[z.condition_for];
    const fear = render(composedTemplate({ family: 'zone', payload: p, condition: 'Frightened' }), ctx(8));
    expect(plain(fear.text)).toMatch(/Wisdom Saving Throw/);        // the gate-3 contract runs on this frame unchanged
    expect(plain(fear.text)).toMatch(/Frightened condition/);
    expect(fear.imposes).toBe('Frightened');
    const pois = render(composedTemplate({ family: 'zone', payload: p, condition: 'Poisoned' }), ctx(8));
    expect(plain(pois.text)).toMatch(/Constitution Saving Throw/);
    expect(pois.imposes).toBe('Poisoned');
  });

  it('the terrain payload is aberrant-ground, and leaves no slot unfilled', () => {
    const z = Z();
    const t = composedTemplate({ family: 'zone', payload: z.payload[z.effect.indexOf('movement')] });
    const text = plain(renderTemplate(t, ctx(8)).text);
    expect(text).toMatch(/Difficult Terrain/);
    expect(text).not.toMatch(/[{}]/);
  });

  it('declares the cells the engine reads, as a trait', () => {
    const z = Z();
    const t = composedTemplate({ family: 'zone', payload: z.payload[0] });
    expect(t.section).toBe('trait');
    expect(t.trigger).toBe('start_of_turn');
    expect(t.composed).toBe('zone');
    expect(Object.keys(t.frames).length).toBeGreaterThanOrEqual(6);
  });
});

describe('the zone form reaches the right seats only', () => {
  it('a trait-seat zone idea is offered the form; an action-seat one is not', () => {
    const menu = [TEMPLATE_BY_ID.get('energy-aura')];
    const asTrait = buildFitPrompt({ name: 'S', idea: { idea: 'a dread presence unmans those near it', section: 'trait', trigger: 'always', effect: 'condition', family: 'zone' }, menu, cr: 8, concept: 'a dread sovereign' });
    const asAction = buildFitPrompt({ name: 'S', idea: { idea: 'a gale that shoves a line of foes', section: 'action', trigger: 'save', effect: 'movement', family: 'zone' }, menu, cr: 8, concept: 'a storm drake' });
    expect(asTrait).toMatch(/FILL THIS FORM/);
    expect(asTrait).toMatch(/"compose"/);
    expect(asAction).not.toMatch(/FILL THIS FORM/);
  });

  it('the form states the print rules it enforces', () => {
    const menu = [TEMPLATE_BY_ID.get('energy-aura')];
    const p = buildFitPrompt({ name: 'S', idea: { idea: 'x '.repeat(12), section: 'trait', trigger: 'always', effect: 'condition', family: 'zone' }, menu, cr: 8, concept: 'c' });
    expect(p).toMatch(/not both|never both/i);   // damage OR a condition
    expect(p).toMatch(/Prone/);                   // the ban is visible
  });

  it('body-reaction still works — the two grammars do not collide', () => {
    const g = GRAMMARS['body-reaction'];
    const c = parseFit(fitJson({ compose: { trigger: g.trigger[0], consequence: g.consequence[2] } }), [], '', [], 'body-reaction').compose;
    expect(c).toMatchObject({ family: 'body-reaction', consequence: g.consequence[2] });
  });
});
