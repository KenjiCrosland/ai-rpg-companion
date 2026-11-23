/**
 * THE RIBBON IS PARKED: OFF UNLESS IT IS ASKED FOR.
 *
 * The owner, 23 November: "I don't know if I want to spend this much effort or overhead on ribbons.
 * Too many of them are malformed." So the feature stays, with its validator and its tests, and the
 * asking is off. Nothing in the app turns it on.
 *
 * These two tests are the whole promise of the parking round: with the switch off a generation is
 * what it was before the ribbon existed, and with it on the ribbon lands as it did. The rest of the
 * promise — that nothing else on any sheet differs — is checked by a strict replay of
 * `baseline-2026-11-20`, the recording made before any ribbon, which the default must reproduce.
 */
import { generateReskin } from '../generate.mjs';
import { RIBBON_PROMPT_HEAD, ribbonsAsked, RIBBON_FLAG_KEY, isRibbonRow, ribbonFamiliesOffered } from '../ribbon.mjs';

const CONCEPT = 'Dire Wolf — with a frost-rimed hide';
const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`);
  if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};

/** @param over options merged into the generation — `{ ribbon: true }` turns the switch on */
const build = async (over = {}) => {
  let cached = null;
  const asked = [];
  const monster = await generateReskin({
    mechanics: [], archetype: 'skirmisher', concept: CONCEPT, userConcept: CONCEPT, cr: 6,
    path: { path: 'twist', print_body: 'Dire Wolf', relation: 'is', class: null },
    ...over,
  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (p.startsWith(RIBBON_PROMPT_HEAD)) {
      asked.push('ribbon');
      const family = ribbonFamiliesOffered(CONCEPT, { size: 'Large' })[0];
      const BY_FAMILY = {
        senses: ['Rime Scent', 'The hound can pinpoint the location of anything frozen within 60 feet of itself.'],
        speaks: ['Frost Whine', 'The hound can only make the sounds it heard in the pack that raised it.'],
        taboo: ['Winter Need', 'The hound cannot willingly sleep anywhere but on frozen ground, and digs to find it.'],
        'leaves-at-death': ['Rime Shard', 'When it dies a shard of rime is left behind, humming faintly for 1 hour before it melts.'],
        moves: ['Frost Tread', 'The hound can cross snow and thin ice without breaking it or sinking.'],
        sheds: ['Rime Trail', 'It sheds a trail of frost that a creature can follow with a DC 20 Wisdom (Survival) check.'],
      };
      const [name, ribbon] = BY_FAMILY[family];
      return JSON.stringify({ family, name, ribbon, ...(family === 'leaves-at-death' ? { object: 'shard of rime' } : {}) });
    }
    if (/"hold_shape": \{"shape"/.test(p)) {
      return JSON.stringify({ shoots: { yes: false, because: '' }, is_a_swarm: { yes: false, because: '' },
        hold_shape: { shape: 'none', because: '' }, casts: { yes: false, because: '', implied_by_kind: false } });
    }
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({ trait: { idea: 'Its hide is rimed with old frost.', section: 'trait', trigger: 'always', effect: 'defense', family: 'breach' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a rimed hide' });
    }
    if (p.startsWith('You are writing ONE ability')) {
      return JSON.stringify({ attacks: [], saves: [], traits: [], strikes: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [] });
    }
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      cached = JSON.stringify({ name: 'Rime Hound', type: 'Beast', size: 'Large', alignment: 'Unaligned',
        senses: 'darkvision 60 ft.', languages: 'None', renames: Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])),
        damage_types: {}, conditions: {}, melee_rider: 'none', projectile: 'none', wildcard: '' });
    }
    return cached;
  });
  return { monster, asked };
};

const allRows = (m) => Object.values(m.sections ?? {}).flat();
const skeleton = (m) => Object.entries(m.sections ?? {}).map(([sec, rows]) => [sec,
  (rows ?? []).map((r) => `${r.name}|${r.text}`)]);

jest.setTimeout(60000);

describe('the default: no ribbon, and the call is not made', () => {
  let monster; let asked;
  beforeAll(async () => { ({ monster, asked } = await build()); });

  it('the ribbon call was never made', () => {
    expect(asked).toEqual([]);
  });

  it('no row on the sheet is a ribbon, in either edition', () => {
    expect(allRows(monster).filter(isRibbonRow)).toEqual([]);
    expect(Object.values(monster.other_edition?.sections ?? {}).flat().filter(isRibbonRow)).toEqual([]);
    expect((monster.abilities ?? []).filter(isRibbonRow)).toEqual([]);
  });

  it('nothing is recorded on generation either — not even that it was skipped', () => {
    expect(monster.generation.ribbon).toBeUndefined();
    expect(JSON.stringify(monster.generation)).not.toMatch(/ribbon/i);
  });

  it('an explicit false is the same as absent', async () => {
    const off = await build({ ribbon: false });
    expect(off.asked).toEqual([]);
    expect(off.monster.generation.ribbon).toBeUndefined();
  });
});

describe('the switch on: one ribbon, and that is the only difference', () => {
  let on; let off;
  beforeAll(async () => { on = await build({ ribbon: true }); off = await build(); });

  it('the call was made once and the ribbon is last under Traits', () => {
    expect(on.asked).toEqual(['ribbon']);
    const traits = on.monster.sections.Traits;
    expect(isRibbonRow(traits.at(-1))).toBe(true);
  });

  it('the sheet has exactly one more row than the default, and the rest are identical', () => {
    expect(allRows(on.monster).length).toBe(allRows(off.monster).length + 1);
    const withoutRibbon = Object.entries(on.monster.sections).map(([sec, rows]) => [sec,
      rows.filter((r) => !isRibbonRow(r)).map((r) => `${r.name}|${r.text}`)]);
    expect(withoutRibbon).toEqual(skeleton(off.monster));
  });

  it('and generation records it, which the default does not', () => {
    expect(on.monster.generation.ribbon.offered).toHaveLength(3);
    expect(off.monster.generation.ribbon).toBeUndefined();
  });
});

describe('the dev-only key the harness sets', () => {
  const store = (value) => ({ getItem: (k) => (k === RIBBON_FLAG_KEY && value !== null ? value : null) });

  it("reads '1' as on and everything else as off", () => {
    expect(ribbonsAsked(store('1'))).toBe(true);
    expect(ribbonsAsked(store('0'))).toBe(false);
    expect(ribbonsAsked(store('true'))).toBe(false);
    expect(ribbonsAsked(store(null))).toBe(false);
  });

  it('is off when there is no store at all, and never throws', () => {
    expect(ribbonsAsked(undefined)).toBe(false);
    expect(ribbonsAsked(null)).toBe(false);
    expect(ribbonsAsked({ getItem() { throw new Error('site data is blocked'); } })).toBe(false);
  });
});
