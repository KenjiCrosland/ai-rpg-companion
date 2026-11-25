/**
 * R4 SEES THE WHOLE SHELF, NOT ONLY THE FIVE OFFERED (owner's "A", 2026-11-24).
 *
 * The Kobold. "Can turn invisible once per day" is the GM's own words, the route call reads them as
 * `teleport`, and the catalog holds `self-invisibility` — a BONUS ACTION. When the idea call stamps
 * the idea as an ACTION, that row is not among the five the fit call is offered; it sits in the
 * shelf the trace prints after "+ shelf:", and R4 only ever read the five. So the sheet shipped
 * with nothing that makes the Kobold invisible.
 *
 * Six live rolls (BLOCKS-kobold-probe-2026-11-25.md) never hit the hole: the fit call chose
 * `self-invisibility` every time. These drive it with the fit declining, which is the case the
 * stand-in run found.
 *
 * Verified red with the change taken out: reverting `r4Pool` to `offered` turns the first test red
 * and leaves the second green.
 */
import { generateReskin } from '../generate.mjs';

const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`);
  if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};
const NOTHING = { attacks: [], saves: [], traits: [], strikes: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [] };
const CONCEPT = 'Kobold — Can turn invisible once per day';

/** @param askedMechanic what the route call declared for the whole concept */
const build = async ({ askedMechanic = 'teleport' } = {}) => {
  let cached = null;
  const monster = await generateReskin({
    mechanics: [], archetype: 'skirmisher', concept: CONCEPT, userConcept: CONCEPT, cr: 0.25,
    path: { path: 'twist', print_body: 'Kobold Warrior', relation: 'is', class: null },
    ...(askedMechanic ? { askedMechanic } : {}),
  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (/"hold_shape": \{"shape"/.test(p)) {
      return JSON.stringify({ shoots: { yes: false, because: '' }, is_a_swarm: { yes: false, because: '' },
        hold_shape: { shape: 'none', because: '' }, casts: { yes: false, because: '', implied_by_kind: false } });
    }
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      // stamped as an ACTION, which is what puts self-invisibility (a Bonus Action) on the shelf
      return JSON.stringify({ action: { idea: 'The kobold folds the light around itself and is gone.', section: 'action', trigger: 'always', effect: 'defense', family: 'breach' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a vanishing' });
    }
    if (p.startsWith('You are writing ONE ability')) return JSON.stringify(NOTHING);
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      cached = JSON.stringify({ name: 'Kobold', type: 'Humanoid', size: 'Small', alignment: 'Neutral Evil',
        senses: 'darkvision 60 ft.', languages: 'Common, Draconic', renames: Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])),
        damage_types: {}, conditions: {}, melee_rider: 'none', projectile: 'none', wildcard: '' });
    }
    return cached;
  });
  return { monster };
};

const rows = (m) => Object.entries(m.sections ?? {}).flatMap(([sec, es]) => (es ?? []).map((e) => ({ sec, e })));
const invisible = (m) => rows(m).filter(({ e }) => /invisib/i.test(`${e.name} ${e.text}`));

jest.setTimeout(60000);

describe('the declared ask reaches the shelf', () => {
  it('a row that makes it invisible lands, and it lands in Bonus Actions', async () => {
    const { monster } = await build({ askedMechanic: 'teleport' });
    const inv = invisible(monster);
    expect(inv.length).toBeGreaterThan(0);
    expect(inv.some(({ sec }) => sec === 'Bonus Actions')).toBe(true);
  });

  it('with no declared ask there is no such row, and no row came from a seed', async () => {
    const { monster } = await build({ askedMechanic: null });
    expect(invisible(monster)).toEqual([]);
    // the keyword draw stayed out: nothing on the sheet carries the fallback's stamp
    expect(rows(monster).filter(({ e }) => e.seed && e.library)).toEqual([]);
  });
});
