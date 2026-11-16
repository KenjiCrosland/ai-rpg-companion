/**
 * TWO SITUATIONAL-ADVANTAGE TRAITS, BOTH PRINT'S OWN.
 *
 * Owner, 2026-10-27: *"pairing traits with actions that provide a flavorful but
 * situational advantage would do a lot to kill the sameyness"* — *"like the
 * creature has advantage against poisoned creatures"*.
 *
 * Print grants that wish without the fragility. Measured over its trait rows,
 * situational advantage keys on the TARGET'S WOUNDS (Sahuagin/Blood Frenzy), the
 * creature's OWN Bloodied state (Boar, Berserker), or an ALLY'S PROXIMITY
 * (Hobgoblin Captain/Aura of Authority) — never on a condition the creature has
 * to impose first. That is why they work: the creature's own attacks or its own
 * allies create the state, so the trait pairs with every action on the sheet,
 * needs no setup row, and cannot dangle the way a condition-keyed clause does
 * (five such clauses dangled across the saved runs — see
 * `advantage-reachable.spec.js`).
 *
 * This spec checks every way a new shape has shipped INERT in this sprint, each
 * of which cost a cycle at least once:
 *   1. no MECHANIC entry -> the route call cannot name it
 *   2. no SHAPE_TAGS entry -> SILENTLY dropped from SHAPES
 *   3. a role outside ROLES
 *   4. an effect outside EFFECTS
 *   5. no keys and not declared keyless
 *   6. unreachable from `templatesFor` on a real pool call
 */
import { TEMPLATE_BY_ID, MECHANIC, MECHANIC_OF, EFFECTS, templatesFor, renderTemplate } from '@/tools/statblock-generator/reskin/templates.mjs';
import { scaleDonor, pickDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const NEW = ['blood-frenzy']; // `ally-aura` was authored and reverted the same day: 0 of 10 draws, because three `leader` donors already carry Aura of Authority as a `rules` row
const ROLES = ['skirmisher', 'brute', 'defender', 'artillery', 'controller', 'lurker'];

describe('both shapes exist and are fully declared', () => {
  test.each(NEW)('%s is in the catalog at all (no SHAPE_TAGS entry = silently dropped)', (id) => {
    expect(TEMPLATE_BY_ID.get(id)).toBeDefined();
  });

  test.each(NEW)('%s declares a legal trigger/effect pair', (id) => {
    const t = TEMPLATE_BY_ID.get(id);
    expect(t.trigger).toBe('always');
    expect(EFFECTS).toContain(t.effect); // 'buff_self' is NOT in EFFECTS — caught on the first cut
  });

  test.each(NEW)('%s belongs to a mechanic the route call can name', (id) => {
    expect(MECHANIC_OF[id]).toBeTruthy();
    expect(MECHANIC[MECHANIC_OF[id]]).toContain(id);
  });

  test.each(NEW)('%s uses only the six roles', (id) => {
    for (const r of TEMPLATE_BY_ID.get(id).roles ?? []) expect(ROLES).toContain(r);
  });

  test.each(NEW)('%s carries keys, so a concept can reach it without the mechanic', (id) => {
    expect((TEMPLATE_BY_ID.get(id).keys ?? []).length).toBeGreaterThan(0);
  });
});

describe('they render print\'s own text, with no slot to fill', () => {
  const ctx = (cr, archetype = 'brute') => ({ scaled: scaleDonor(pickDonor(cr, null, archetype), cr, { mechanics: [] }), archetype, cr, imposed: [], name: 'Thing', energy: null, mix: null, concept: 'a thing', size: 'Medium' });

  test('Blood Frenzy keys on the TARGET\'s wounds, not the creature\'s', () => {
    const r = renderTemplate(TEMPLATE_BY_ID.get('blood-frenzy'), ctx(5), {});
    expect(r.text).toMatch(/Advantage on attack rolls against any creature that doesn't have all its Hit Points/);
    expect(r.text).not.toMatch(/While Bloodied/); // that is bloodied-fury's shape
    expect(r.text).not.toMatch(/\{[a-z_]+\}/);    // no unfilled slot
  });

  test('neither needs a setup row, which is the whole point', () => {
    // a condition-keyed advantage dangles when nothing imposes the condition;
    // these two are satisfied by the creature's own attacks and its own allies
    for (const id of NEW) expect(TEMPLATE_BY_ID.get(id).requires_row ?? null).toBeNull();
  });
});

describe('they are reachable on a real pool call', () => {
  const pool = (archetype, concept) => templatesFor({ archetype, cr: 5, movement: '30 ft.', type: 'Humanoid', section: 'trait', trigger: 'always', concept }).map((t) => t.id);

  test('a blood-scenting predator can draw Blood Frenzy', () => {
    expect(pool('brute', 'a shark-toothed hunter that smells blood and finishes the wounded')).toContain('blood-frenzy');
  });

  test('and they widen the always-on pool rather than replacing it', () => {
    const p = pool('brute', 'a thing');
    expect(p.length).toBeGreaterThan(5);
    expect(p).toContain('spider-climb'); // the existing shapes are still there
  });
});
