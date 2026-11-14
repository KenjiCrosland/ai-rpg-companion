/**
 * EVERY FIELD A SHAPE DECLARES REACHES ITS CATALOG ENTRY (item 5a step 3, 2026-11-14).
 *
 * `shapes.mjs` declares `rewardsCondition: true` on `condition-payoff`. The catalog
 * builder (`templates.mjs`, `TEMPLATES = [...SHAPES.filter(...).map(...)]`) copies a
 * HAND-WRITTEN list of fields, and that flag is not on it — so at runtime
 * `TEMPLATE_BY_ID.get('condition-payoff').rewardsCondition` is `undefined` and every
 * gate keyed on it is dead:
 *
 *   - the ladder that picks a reward one rung worse than the trigger
 *   - the severe pool
 *   - the escalation shapes (damage step, exhaustion, mark)
 *   - the escalation line in the fit prompt
 *
 * That is why every payoff rewarded Prone, on every sheet, at every CR. The 11-05
 * redesign has never run on this template.
 *
 * It survived because its three guards asserted that the SOURCE FILE CONTAINS A LINE
 * (`expect(src).toMatch(/if \(t\.rewardsCondition\) vocab\.push\(/)`), which passes
 * whether or not the flag ever reaches the renderer. This file is the structural
 * replacement: it compares the declaration to the catalog, so a field added to a shape
 * and forgotten in the builder fails here instead of going quietly dark for weeks.
 */
import { SHAPES } from '../shapes.mjs';
import { TEMPLATE_BY_ID } from '../templates.mjs';

/**
 * Fields the builder drops ON PURPOSE, each with the reason it is safe. Anything else
 * dropped is a bug — and `rewardsCondition` is in here only until step 4 carries it,
 * at which point this entry comes out and the test proves the flag arrived.
 */
const DROPPED_ON_PURPOSE = {
  invented: 'provenance for the DONOR table; read as `donor.invented`, never off a template',
  swallow_tick: 'read inside shapes.mjs when the frame is built; nothing reads it off a template',
  composing: 'read inside shapes.mjs when the frame is built; nothing reads it off a template',
  // TODO(item 5a step 4): remove this line when the builder carries the flag.
  rewardsCondition: 'KNOWN DARK — the 11-05 payoff ladder has never run because of this. Step 4 carries it.',
};

const droppedFields = () => {
  const out = new Map();
  for (const s of SHAPES) {
    const tpl = TEMPLATE_BY_ID.get(s.id);
    if (!tpl) continue; // a shape the catalog filters out entirely is a different question
    for (const k of Object.keys(s)) if (!(k in tpl)) out.set(k, [...(out.get(k) ?? []), s.id]);
  }
  return out;
};

describe('a shape field reaches its template', () => {
  test('the catalog drops nothing but the documented fields', () => {
    const dropped = [...droppedFields().keys()].sort();
    expect(dropped).toEqual(Object.keys(DROPPED_ON_PURPOSE).sort());
  });

  test('every documented drop still carries its reason, so none becomes folklore', () => {
    for (const [field, why] of Object.entries(DROPPED_ON_PURPOSE)) {
      expect(typeof why).toBe('string');
      expect(why.length).toBeGreaterThan(20);
    }
  });

  test('the sweep actually ran — shapes exist and resolve to catalog entries', () => {
    expect(SHAPES.length).toBeGreaterThan(50);
    expect(SHAPES.filter((s) => TEMPLATE_BY_ID.get(s.id)).length).toBeGreaterThan(50);
  });

  // THE ONE THAT MATTERS, stated as a fact rather than a hope. When step 4 lands this
  // flips to `toBe(true)` and the TODO above comes out; until then the dark flag is a
  // tracked fact instead of a silent one.
  test('condition-payoff declares rewardsCondition, and it is STILL DARK at runtime', () => {
    const shape = SHAPES.find((s) => s.id === 'condition-payoff');
    expect(shape.rewardsCondition).toBe(true);
    expect(TEMPLATE_BY_ID.get('condition-payoff').rewardsCondition).toBeUndefined();
  });
});
