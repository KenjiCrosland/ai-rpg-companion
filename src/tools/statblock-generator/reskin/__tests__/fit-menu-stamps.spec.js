/**
 * THE FIT MENU IS ORDERED BY THE IDEA'S OWN DECLARED STAMPS, NOT BY KEYWORDS IN
 * THE GM'S CONCEPT (plans/fit-by-stamps-not-keywords-2026-10-26.md).
 *
 * Measured over four same-batch runs (40 sheets): a template chosen because a
 * key word of its own appeared in the GM's concept fired differently from the
 * idea the AI described 6 times in 11 (55%); the other two paths, 25%. The two
 * cases below are the real ones from those runs, replayed with their real menus
 * and their real idea tags — a ten may not draw either shape, so this is the
 * proof and the ten is regression.
 */
import { TEMPLATES, orderByStamps, templateMenuLines, buildFitPrompt } from '@/tools/statblock-generator/reskin/templates.mjs';

const byId = (ids) => ids.map((id) => TEMPLATES.find((t) => t.id === id)).filter(Boolean);

// #05 of save10-2026-10-26T14-41-49, verbatim from its `signature idea (trait)` trace
const PEAL_MENU = byId(['spider-climb', 'phobia', 'bloodied-fury', 'shielded-mind', 'evasion', 'relentless-pursuit', 'bound', 'relic-object', 'undead-fortitude', 'truth-aura', 'assassinate', 'resonant-body']);
const PEAL_IDEA = { idea: 'Every blow the passing peal lands against a living creature leaves a ring behind in them, and the ring keeps humming; each further strike on the same soul makes the hum deepen and sharpen.', section: 'trait', trigger: 'always', effect: 'damage' };
const PEAL_CONCEPT = 'a bell-ghost whose toll builds to one shattering peal';

// #01 of the same run: bloodied-fury IS the idea and the call declined it as a word collision
const TYRANT_MENU = byId(['spider-climb', 'phobia', 'faultless-tracker', 'noxious-aura', 'bloodied-fury', 'berserk', 'shielded-mind', 'relentless-pursuit', 'bound', 'undead-fortitude', 'truth-aura', 'assassinate', 'heated-body', 'resonant-body', 'energy-aura']);
const TYRANT_IDEA = { idea: 'The tyrant burns hotter the longer it is opposed; once it has been wounded badly, the furnace inside it roars open and it moves faster and strikes harder.', section: 'trait', trigger: 'always', effect: 'damage' };
const TYRANT_CONCEPT = 'a brass tyrant whose furnace breath terrifies and whose hammer finds the terrified';

describe('the fit menu is ordered by the idea\'s stamps', () => {
  it('a template whose trigger AND effect match the idea leads; one matching neither does not', () => {
    const ordered = orderByStamps(PEAL_MENU, PEAL_IDEA);
    const lead = ordered[0];
    expect(lead.trigger).toBe('always');
    expect(lead.effect).toBe('damage');
    // resonant-body fires on_being_hit — the opposite direction from "every blow
    // it LANDS" — and the concept's "bell/toll/peal" used to put it first
    const reson = ordered.findIndex((t) => t.id === 'resonant-body');
    const firstNonMatch = ordered.findIndex((t) => !(t.trigger === 'always' && t.effect === 'damage'));
    expect(reson).toBeGreaterThanOrEqual(firstNonMatch); // never in the matching tier
  });

  it('the bell-ghost\'s reactive template is no longer seated first by the word "bell"', () => {
    expect(orderByStamps(PEAL_MENU, PEAL_IDEA)[0].id).not.toBe('resonant-body');
  });

  it('a reactive idea DOES lead with the reactive template — the stamps decide, not a ban', () => {
    const reactive = { ...PEAL_IDEA, trigger: 'on_being_hit', effect: 'damage' };
    const ordered = orderByStamps(PEAL_MENU, reactive);
    expect(ordered[0].id).toBe('resonant-body');
  });

  // WHAT STAMP ORDERING DOES NOT FIX, stated so nobody measures the wrong thing.
  // `bloodied-fury` IS the tyrant's idea ("burns hotter once wounded badly") but
  // it declares always/DEFENSE while the AI tagged the idea always/DAMAGE, so it
  // sits in the trigger-only tier, not the leading one. The measurable gain is
  // that it now outranks the template that actually shipped — `noxious-aura`
  // (save/condition), which the keyword label had seated while the call declined
  // bloodied-fury as a word collision.
  it('the tyrant\'s bloodied-fury outranks the wrong template that shipped', () => {
    const ordered = orderByStamps(TYRANT_MENU, TYRANT_IDEA).map((t) => t.id);
    expect(ordered.indexOf('bloodied-fury')).toBeLessThan(ordered.indexOf('noxious-aura'));
    expect(ordered.indexOf('bloodied-fury')).toBeLessThan(ordered.indexOf('resonant-body'));
    expect(ordered.indexOf('bloodied-fury')).toBeLessThan(ordered.indexOf('heated-body'));
  });

  it('the trigger tier outranks the effect tier — WHEN a row fires is what the keyword bind got wrong', () => {
    const ordered = orderByStamps(TYRANT_MENU, TYRANT_IDEA).map((t) => t.id);
    expect(ordered.indexOf('spider-climb')).toBeLessThan(ordered.indexOf('heated-body')); // always/movement (trigger) over on_being_hit/damage (effect)
  });

  it('a declared asked_mechanic still leads the menu (2026-10-23, 432/432)', () => {
    const withMech = TYRANT_MENU.filter((t) => t.mechanic);
    if (!withMech.length) return;
    const mech = withMech[withMech.length - 1].mechanic;
    expect(orderByStamps(TYRANT_MENU, TYRANT_IDEA, mech)[0].mechanic).toBe(mech);
  });

  it('ordering never drops or duplicates a candidate', () => {
    const ordered = orderByStamps(PEAL_MENU, PEAL_IDEA);
    expect(ordered).toHaveLength(PEAL_MENU.length);
    expect(new Set(ordered.map((t) => t.id)).size).toBe(PEAL_MENU.length);
    expect(ordered.map((t) => t.id).sort()).toEqual(PEAL_MENU.map((t) => t.id).sort());
  });
});

describe('the menu the call reads carries no keyword labels', () => {
  it('no VERB MATCH anywhere in the fit prompt', () => {
    const p = buildFitPrompt({ name: 'Passing Peal', idea: PEAL_IDEA, menu: orderByStamps(PEAL_MENU, PEAL_IDEA), cr: 6, concept: PEAL_CONCEPT });
    expect(p).not.toMatch(/VERB MATCH/);
    expect(p).not.toMatch(/\(concept\)/);
  });

  it('the matching tier is marked by what the idea said it DOES', () => {
    const lines = templateMenuLines(orderByStamps(PEAL_MENU, PEAL_IDEA), { cr: 6, concept: PEAL_CONCEPT, idea: PEAL_IDEA });
    expect(lines).toMatch(/matches the idea/);
    // and the mark sits on a template that really does match
    const marked = lines.split('\n').filter((l) => /matches the idea/.test(l));
    for (const l of marked) {
      const id = /^- ([a-z-]+)/.exec(l)?.[1];
      const t = TEMPLATES.find((x) => x.id === id);
      expect(t.trigger).toBe('always');
    }
  });

  it('the prompt still tells the call that order is a hint and none is allowed', () => {
    const p = buildFitPrompt({ name: 'K', idea: PEAL_IDEA, menu: PEAL_MENU, cr: 6, concept: PEAL_CONCEPT });
    expect(p).toMatch(/none/);
    expect(p).toMatch(/order/i);
  });
});

/**
 * AURA TRAITS (plans/aura-tags-match-their-frames-2026-10-26.md).
 *
 * Three catalog gaps in save10-2026-10-26T15-11-53 were trait ideas tagged
 * `start_of_turn` whose menus held no template with that trigger. The cause was
 * not the tags: `start_of_turn` is in TEMPORAL, so `triggerCompatible` demanded
 * an exact match and a start_of_turn idea's menu came back with **2 of 31**
 * trait templates — every `always` trait filtered out. For a TRAIT those two
 * triggers are near-synonyms (a trait that acts each turn is a passive trait;
 * print writes Fire Aura and Aberrant Ground as plain traits), so the filter was
 * starving the menu and `orderByStamps` had nothing to rank.
 *
 * The filter now admits both for traits and the STAMPS do the preferring, which
 * is the engine's own division: filter on what is structurally illegal, rank on
 * what fits.
 */
describe('aura traits reach the menu and the stamps still prefer them', () => {
  const { templatesFor, TEMPLATE_BY_ID, NEEDS_BODY } = require('@/tools/statblock-generator/reskin/templates.mjs');
  const ctx = { archetype: 'brute', cr: 15, sections: {}, section: 'trait', type: 'Elemental', concept: 'a glacier heart' };

  it('a start_of_turn trait idea is no longer starved to two candidates', () => {
    const n = templatesFor({ ...ctx, trigger: 'start_of_turn' }).length;
    expect(n).toBeGreaterThan(20); // was 2
  });

  it('an always trait idea still sees the per-turn auras, and vice versa', () => {
    const always = templatesFor({ ...ctx, trigger: 'always' }).map((t) => t.id);
    const perTurn = templatesFor({ ...ctx, trigger: 'start_of_turn' }).map((t) => t.id);
    expect(always).toContain('energy-aura');
    expect(perTurn).toContain('spider-climb');
  });

  it('a rider trigger is still exact — on_hit never admits on_being_hit', () => {
    const { triggerCompatible } = require('@/tools/statblock-generator/reskin/templates.mjs');
    expect(triggerCompatible('on_hit', 'on_being_hit')).toBe(false);
    expect(triggerCompatible('on_being_hit', 'on_hit')).toBe(false);
  });

  it('every trait template whose frame fires each turn declares start_of_turn', () => {
    for (const t of TEMPLATES.filter((x) => x.section === 'trait')) {
      const frame = String(Object.values(t.frames ?? {})[0] ?? '');
      if (!/starts its turn (?:within|in)/i.test(frame)) continue;
      expect([t.id, t.trigger]).toEqual([t.id, 'start_of_turn']);
    }
  });

  it('a per-turn condition idea leads with the condition auras', () => {
    const menu = ['noxious-aura', 'gaze-aura', 'spider-climb', 'bloodied-fury'].map((id) => TEMPLATE_BY_ID.get(id));
    const ordered = orderByStamps(menu, { section: 'trait', trigger: 'start_of_turn', effect: 'condition' }).map((t) => t.id);
    expect(ordered.slice(0, 2).sort()).toEqual(['gaze-aura', 'noxious-aura']);
  });

  it('the damage aura asks for any radiating body, not only a hot one', () => {
    const q = String(NEEDS_BODY['energy-aura']);
    expect(q).toMatch(/cold/i);
    expect(q).not.toMatch(/wreathed in flame/i);
    expect(TEMPLATE_BY_ID.get('energy-aura').trigger).toBe('start_of_turn'); // unchanged
  });
});
