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

// THE FORM IS GONE (2026-10-26): the call refused it five times in three runs,
// so the options are composed into menu candidates instead and every ban is
// enforced at ENUMERATION — a refused combination is never materialised, so
// there is nothing for a parser to reject. What was parse-time is now factory-time.
describe('the zone candidates, and the bans enforced where they are built', () => {
  const { composedCandidates } = require('@/tools/statblock-generator/reskin/templates.mjs');
  // THE IDEA NAMES THE CONDITION (fault 4, owner 2026-11-20). A condition candidate is offered
  // only when the idea's own words name the condition it would impose, so the fixture carries an
  // idea that names all three the family can still hand out. The Dire Wolf's frost hide named
  // none and got Deafened; the Glacier Heart's cold wake named none and got Poisoned.
  const idea = (effect) => ({ section: 'trait', trigger: 'start_of_turn', effect, family: 'zone', idea: 'a poisonous, frightening, blinding reek' });

  it('one candidate per condition it may name, and never Prone', () => {
    const c = composedCandidates(idea('condition'), {});
    expect(c.length).toBe(Z().conditions.length);
    expect(Z().conditions).toEqual(['Poisoned', 'Frightened', 'Blinded']); // Deafened left the family (owner, 2026-11-20): a condition zone's condition is its only effect
    const texts = c.flatMap((t) => Object.values(t.frames).map(String)).join(' ');
    expect(texts).not.toMatch(/Prone condition/);
  });

  it('no candidate does damage AND a condition — print gates that behind a Recharge', () => {
    for (const eff of ['damage', 'condition', 'movement']) {
      for (const t of composedCandidates(idea(eff), { can: ['line-move'] })) {
        const text = String(Object.values(t.frames)[0]);
        const hasDmg = /takes \{?\d|takes \d+ \(/.test(text);
        const hasCond = /has the \w+ condition|\{condition_minor\}/.test(text);
        expect([t.id, hasDmg && hasCond]).toEqual([t.id, false]);
      }
    }
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

describe('the candidates reach the right seats only', () => {
  const { composedCandidates } = require('@/tools/statblock-generator/reskin/templates.mjs');

  it('a trait-seat zone idea enumerates candidates; an action-seat one does not', () => {
    expect(composedCandidates({ section: 'trait', trigger: 'start_of_turn', effect: 'damage', family: 'zone' }, {}).length).toBeGreaterThan(0);
    expect(composedCandidates({ section: 'action', trigger: 'save', effect: 'movement', family: 'zone' }, {})).toEqual([]);
  });

  it('the two grammars do not collide', () => {
    const z = composedCandidates({ section: 'trait', trigger: 'start_of_turn', effect: 'damage', family: 'zone' }, {});
    const b = composedCandidates({ section: 'trait', trigger: 'on_being_hit', effect: 'damage', family: 'body-reaction' }, {});
    expect(z.every((t) => t.composed === 'zone')).toBe(true);
    expect(b.every((t) => t.composed === 'body-reaction')).toBe(true);
    expect(z.map((t) => t.id).some((id) => b.map((x) => x.id).includes(id))).toBe(false);
  });
});
