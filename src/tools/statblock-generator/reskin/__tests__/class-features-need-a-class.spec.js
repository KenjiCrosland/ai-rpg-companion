/**
 * A CLASS FEATURE'S NAME NEEDS A BODY THAT COULD HAVE A CLASS.
 *
 * Owner, 2026-10-27: *"Assassinate should not be assassinate for non-humanoids
 * … doesn't fit thematically for things that can't have classes"* — and, on
 * the first draft's proposal to gate those templates off those bodies,
 * *"can't we reskin to make it look like something else?"*
 *
 * Measured across every saved run: `assassinate` shipped 443 times and 163 of
 * those (37%) were on a body that cannot have a class — 87 Monstrosity, 60
 * Beast. `rally` shipped 188 times with 81 (43%) on such bodies, 76 of them
 * Constructs: golems giving a Bolstering Cry.
 *
 * The MECHANICS are body-neutral — "each ally within 30 feet gains Temporary
 * Hit Points", "the creature regains Hit Points", "touches a creature and
 * restores Hit Points" — so gating them off beasts would throw away sound rows
 * to fix a word problem. Only the NAMES were class features. Print agrees on
 * the first one: its single ambush feature is the Doppelganger's "Surprise
 * Attack" (Monstrosity), not Assassinate.
 */
import { TEMPLATE_BY_ID, templatesFor } from '@/tools/statblock-generator/reskin/templates.mjs';
import { LIBRARY_SEEDS } from '@/tools/statblock-generator/reskin/library.mjs';

const RETIRED = ['Assassinate', 'Bolstering Cry', 'Second Wind', 'Lay on Hands'];
const RENAMED = { assassinate: 'Surprise Attack', 'second-wind': 'Recovery', 'lay-on-hands': 'Mending Touch' };

describe('the renamed templates carry their new, body-neutral names', () => {
  for (const [id, name] of Object.entries(RENAMED)) {
    test(`${id} is "${name}"`, () => expect(TEMPLATE_BY_ID.get(id)?.name).toBe(name));
  }

  test('rally is a library seed, not a shape, and keeps its own gate in the name', () => {
    const seed = LIBRARY_SEEDS.find((s) => s.key === 'rally');
    expect(seed.name).toBe('Bolstering Presence (2/Day)');
  });
});

describe('no retired name survives anywhere in the catalog', () => {
  test('not on a shape template', () => {
    const bad = [...TEMPLATE_BY_ID.values()].filter((t) => RETIRED.some((r) => String(t.name ?? '').startsWith(r)));
    expect(bad.map((t) => `${t.id}: ${t.name}`)).toEqual([]);
  });

  test('not on a library seed', () => {
    const bad = LIBRARY_SEEDS.filter((s) => RETIRED.some((r) => String(s.name ?? '').startsWith(r)));
    expect(bad.map((s) => `${s.key}: ${s.name}`)).toEqual([]);
  });
});

describe('nothing is gated by body: the mechanic was never the problem', () => {
  // the pool for a beast at the CR these shipped at. The guard here is against
  // a fix that reaches for `deny_types` later and silently drops sound rows.
  const poolFor = (type) => templatesFor({ archetype: 'brute', cr: 8, type, concept: 'an ambush predator that strikes before its prey can react and shrugs off a blast', movement: '40 ft.' }).map((t) => t.id);

  test('a Beast can still be offered the ambush shape', () => {
    expect(poolFor('Beast')).toContain('assassinate');
  });

  test('a Construct and a Monstrosity can too', () => {
    expect(poolFor('Construct')).toContain('assassinate');
    expect(poolFor('Monstrosity')).toContain('assassinate');
  });

  test('none of the four declares a body denial', () => {
    for (const id of Object.keys(RENAMED)) expect(TEMPLATE_BY_ID.get(id).deny_types ?? null).toBeNull();
  });
});
