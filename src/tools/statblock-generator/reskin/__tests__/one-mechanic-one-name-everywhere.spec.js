/**
 * ONE MECHANIC, ONE NAME — FOR EVERY STOCK ROW, NOT A LIST OF THREE.
 *
 * The owner's ruling (2026-10-27) is "unless it's mechanically different it needs
 * the same name", with no exception for rows the GM's own words asked for.
 * `labelFeatureRows` converged only `condition-payoff`, `exploiter` and
 * `riposte`, so the 2026-10-28 forty showed both halves of what that costs:
 *
 *   - `relentless-pursuit` shipped under FOUR names in one run — "Relentless
 *     Pursuit" twice, "Reliquary Lurch", "Skull-Trail Hunter".
 *   - four rows carried a name promising a mechanic the stock row does not do:
 *     `terrain-walk` as "Killing Wake" (it is ice-walking, it kills nothing),
 *     `terror-pulse` as "Giant's Tongue", `uncanny-sense` as "Hull Resonance".
 *
 * A kit row is the exception that proves the rule: its name is DECLARED beside
 * its template by `classes.mjs` / `species.mjs`, and a paladin's smite is
 * Divine Smite.
 */
import { labelFeatureRows } from '@/tools/statblock-generator/reskin/generate.mjs';
import { TEMPLATE_BY_ID } from '@/tools/statblock-generator/reskin/templates.mjs';

const nameOf = (id) => TEMPLATE_BY_ID.get(id).name;
const run = (rows) => { const s = { Traits: rows }; labelFeatureRows(s); return s.Traits; };

describe('a renamed stock row goes back to its template name', () => {
  it.each([
    ['Reliquary Lurch', 'relentless-pursuit'],
    ['Skull-Trail Hunter', 'relentless-pursuit'],
    ['Killing Wake', 'terrain-walk'],
    ['Hull Resonance', 'uncanny-sense'],
  ])('"%s" (%s) converges', (given, template) => {
    const [row] = run([{ name: given, text: 'x', template, library: true }]);
    expect(row.name).toBe(nameOf(template));
  });

  it('keeps a gate suffix while renaming', () => {
    const [row] = run([{ name: 'Skull-Trail Hunter (Recharge 5-6)', text: 'x', template: 'relentless-pursuit', library: true }]);
    expect(row.name).toBe(`${nameOf('relentless-pursuit')} (Recharge 5-6)`);
  });

  it('is a no-op on a row already carrying its template name', () => {
    const [row] = run([{ name: nameOf('relentless-pursuit'), text: 'x', template: 'relentless-pursuit', library: true }]);
    expect(row.name).toBe(nameOf('relentless-pursuit'));
  });
});

describe('a declared name survives', () => {
  it("keeps a class kit's name — a paladin's smite is Divine Smite", () => {
    const [row] = run([{ name: 'Divine Smite', text: 'x', template: 'coating', kit: 'paladin' }]);
    expect(row.name).toBe('Divine Smite');
  });
  it("keeps a species kit's name — lizardfolk declare Marsh Stride for terrain-walk", () => {
    const [row] = run([{ name: 'Marsh Stride', text: 'x', template: 'terrain-walk', kit: 'lizardfolk' }]);
    expect(row.name).toBe('Marsh Stride');
  });
  it("keeps print's own name", () => {
    const [row] = run([{ name: 'Fear Aura', text: 'x', template: 'fear-aura', print: true }]);
    expect(row.name).toBe('Fear Aura');
  });
  it('keeps a name_locked row — the floating orb names its own rays', () => {
    const [row] = run([{ name: 'Eye Rays', text: 'x', template: 'random-ray', name_locked: true }]);
    expect(row.name).toBe('Eye Rays');
  });
});

describe('the Trip Attack interaction stays scoped to the payoff templates', () => {
  // `isPayoff` used to mean "not riposte". Widening convergence without scoping
  // it would have spliced EVERY templated row off any sheet carrying a style's
  // Trip Attack.
  it('a non-payoff template survives a sheet that has a Trip Attack', () => {
    const s = {
      Actions: [{ name: 'Gore', text: 'x', feature: 'Trip Attack' }],
      Traits: [{ name: 'Skull-Trail Hunter', text: 'x', template: 'relentless-pursuit', library: true }],
    };
    labelFeatureRows(s);
    expect(s.Traits).toHaveLength(1);
    expect(s.Traits[0].name).toBe(nameOf('relentless-pursuit'));
  });
  it('a payoff row still yields to the Trip Attack', () => {
    const s = {
      Actions: [{ name: 'Gore', text: 'x', feature: 'Trip Attack' }],
      Traits: [{ name: 'Merciless Strike', text: 'x', template: 'condition-payoff', library: true }],
    };
    labelFeatureRows(s);
    expect(s.Traits).toHaveLength(0);
  });
});
