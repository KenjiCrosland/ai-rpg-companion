/**
 * A SHAPE DECLARES WHAT KIND OF DAMAGE IT DEALS — it is not read off its prose.
 *
 * `renderTemplate` corrected the damage type by asking the template's own frame
 * two questions with regexes: does it take life (Necrotic, never a weapon type —
 * Plague Siphon shipped Piercing) and is it an extra on the creature's own hit
 * (takes the HIT's type — Assassinate added Bludgeoning to spear hits). Owner,
 * 2026-10-27: a declared field, not a read of our own catalog's wording.
 *
 * THE RISK THIS SPEC EXISTS FOR: the sets were seeded from what the regexes
 * matched, so they are only correct while the catalog agrees with them. A shape
 * added with draining prose and no entry would silently lose its correction and
 * ship a weapon type. This proves set and prose still agree, every band.
 */
import { TEMPLATE_BY_ID, __REGEX_WAS } from '@/tools/statblock-generator/reskin/templates.mjs';

const framesOf = (t) => (t.frames ? Object.values(t.frames) : [t.text]).map((f) => String(f ?? ''));
const everyTemplate = [...TEMPLATE_BY_ID.values()];

describe('the declared sets still match the catalog they were read from', () => {
  test('a shape whose frame drains is in DAMAGE_FROM_LIFE, and nothing else is', () => {
    const byProse = everyTemplate.filter((t) => framesOf(t).some((f) => __REGEX_WAS.drains.test(f))).map((t) => t.id);
    const declared = [...__REGEX_WAS.sets.DAMAGE_FROM_LIFE];
    expect(byProse.sort()).toEqual(declared.sort());
  });

  test('a shape whose frame is an extra on its own hit is in EXTRA_ON_OWN_HIT, and nothing else is', () => {
    const byProse = everyTemplate.filter((t) => framesOf(t).some((f) => __REGEX_WAS.ridesHit(f))).map((t) => t.id);
    const declared = [...__REGEX_WAS.sets.EXTRA_ON_OWN_HIT];
    expect(byProse.sort()).toEqual(declared.sort());
  });

  test('no shape is in both — they correct the type in different directions', () => {
    const both = [...__REGEX_WAS.sets.DAMAGE_FROM_LIFE].filter((id) => __REGEX_WAS.sets.EXTRA_ON_OWN_HIT.has(id));
    expect(both).toEqual([]);
  });

  test('every declared id is a real shape, so a rename cannot leave a dead entry', () => {
    for (const id of [...__REGEX_WAS.sets.DAMAGE_FROM_LIFE, ...__REGEX_WAS.sets.EXTRA_ON_OWN_HIT]) {
      expect(TEMPLATE_BY_ID.get(id)).toBeDefined();
    }
  });

  test("the correction still lands: a drain shape's damage is never a weapon type", () => {
    const { renderTemplate } = require('../templates.mjs');
    const { scaleDonor, pickDonor } = require('../scale.mjs');
    const ctx = { scaled: scaleDonor(pickDonor(13, null, 'brute'), 13, { mechanics: [] }), archetype: 'brute', cr: 13, imposed: [], name: 'Thing', energy: null, mix: 'physical', concept: 'a thing that drains the living', size: 'Large' };
    const r = renderTemplate(TEMPLATE_BY_ID.get('drain'), ctx, {});
    expect(r?.damageType).toBe('Necrotic'); // not Piercing, the section default
  });
});
