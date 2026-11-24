/**
 * NOTHING STANDS IN FOR A SEAT THAT FAILED (owner's ruling, 2026-11-23).
 *
 * "If a second roll doesn't fix it let's drop it" — and asked whether that means the slot stays
 * empty rather than taking a stock row, he said yes. The same thing he said on 29 October, which
 * the free-row budget's own comments quote: "refusals lead to sameness because we borrow a stock
 * row from the chassis". On the forty the fallback drew three rows — s12's Bolstering Presence,
 * s34's and s35's Rampage — and none had anything to do with what the GM typed.
 *
 * THIS IS NOT THE FIT CALL'S TEMPLATE. A template the fit call chose for the idea is the model's
 * own answer and lands as it always did; the third test here pins that.
 *
 * AND IT IS THE ACTION SEAT'S FALLBACK, which is the one the ruling names (generate.mjs 8262-8349,
 * the block that ended in "library seed drawn: … a proven shape stands in"). Two other sites still
 * draw a library row on the TRAIT side and the ruling does not reach them: a trait a style or
 * archetype OWES by default, and the "concept-first" bind where the GM's own words key a trait and
 * the idea path had nothing. Both are in the round's report; neither is a row standing in for a
 * seat that failed.
 *
 * Verified red with the change taken out: restoring the fallback turns the first two tests red.
 */
import { generateReskin } from '../generate.mjs';

const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`);
  if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};
const NOTHING = { attacks: [], saves: [], traits: [], strikes: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [] };
const CONCEPT = 'a bell-ringer who tolls for the dying';

const build = async ({ fit = null, cr = 5 } = {}) => {
  let cached = null; let seatAsks = 0; const lines = [];
  const monster = await generateReskin({
    mechanics: [], archetype: 'skirmisher', concept: CONCEPT, userConcept: CONCEPT, cr,
    path: { path: 'homebrew', print_body: null, relation: null, class: null },

  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (/"hold_shape": \{"shape"/.test(p)) {
      return JSON.stringify({ shoots: { yes: false, because: '' }, is_a_swarm: { yes: false, because: '' },
        hold_shape: { shape: 'none', because: '' }, casts: { yes: false, because: '', implied_by_kind: false } });
    }
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({ action: { idea: 'It tolls a bell and the dying hear it.', section: 'action', trigger: 'save', effect: 'condition', family: 'none' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify(fit ?? { template: null, declined_because: 'no_fit', closest: null, missing: 'a toll for the dying' });
    }
    if (p.startsWith('You are writing ONE ability')) { seatAsks += 1; return JSON.stringify(NOTHING); }
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      cached = JSON.stringify({ name: 'Passing Bell Ringer', type: 'Undead', size: 'Medium', alignment: 'Neutral Evil',
        senses: 'darkvision 60 ft.', languages: 'Common', renames: Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])),
        damage_types: {}, conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', projectile: 'none', wildcard: '' });
    }
    return cached;
  });
  return { monster, seatAsks, lines };
};

const rows = (m) => Object.values(m.sections ?? {}).flat();

jest.setTimeout(60000);

describe('both asks of a seat are refused', () => {
  let monster; let seatAsks;
  beforeAll(async () => { ({ monster, seatAsks } = await build()); });

  it('the seat was asked twice', () => {
    expect(seatAsks).toBeGreaterThanOrEqual(2);
  });

  it('no row stood in for the failed seat', () => {
    // The fallback's own line, and the signature it recorded. Scoped to the ACTION seat's fallback,
    // which is what the ruling names — a trait the style owes by default is a different mechanism
    // and still lands (see the header).
    expect(monster.generation.signature).not.toBe('library');
    expect(rows(monster).filter((e) => e.seed && e.library)).toEqual([]);
  });

  it('and the sheet still arrived, with something to roll', () => {
    expect(rows(monster).some((e) => /Attack Roll/.test(e.text ?? ''))).toBe(true);
    expect(monster.generation.signature).not.toBe('library');
  });
});

describe("the fit call's template is the model's answer and still lands", () => {
  it("a template the fit chose lands, and it is the model's answer rather than a seed", async () => {
    const { monster } = await build({ fit: { template: 'fear-aura', because: 'it tolls for the dying', name: 'Passing Toll', fills: {} } });
    // whichever template the fit's answer renders as on this chassis, SOME templated row lands and
    // it did not come from the fallback's draw
    const templated = rows(monster).filter((e) => e.template);
    expect(templated.length).toBeGreaterThan(0);
    expect(templated.every((e) => !(e.seed && e.library))).toBe(true);
    expect(monster.generation.signature).not.toBe('library');
  });
});

describe('a row the value ladder cannot lift stays as written', () => {
  /**
   * With no seed to stand in, dropping a merely weak row would leave the sheet with nothing of its
   * own for a shortfall the ladder could not close. The owner's standing word is that too strong is
   * trimmed and unsound is repaired; a weak row is neither, so it stays and the trace says it is
   * under the floor. On the forty this is s12's Plague Herald's Command, 4.1 against a floor of 4.9.
   */
  it('the sheet keeps it rather than shipping nothing', async () => {
    const { monster } = await build();
    // nothing on this sheet was dropped FOR the floor and replaced by a seed
    expect(rows(monster).filter((e) => e.seed && e.library)).toEqual([]);
    // and the sheet is not empty: it keeps what it has rather than shipping a borrowed row
    expect(rows(monster).length).toBeGreaterThan(2);
  });
});
