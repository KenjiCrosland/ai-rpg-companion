/**
 * ONE FREE TRAIT AND ONE FREE ROW THAT IS NOT A TRAIT, WHERE THE CARD HAS ROOM FOR TWO
 * (owner, 2026-11-23).
 *
 * Six rows on the forty were written, passed every gate, and left at ship because the free-row
 * budget is one — and in five of the six the trait seat and the action seat had each done their job
 * and the sheet kept one of them. The owner read the Lurker's Loose Scree, liked it, and lost it in
 * a re-record.
 *
 * These go through `generateReskin`, which is where the rule is wired in, and each was verified to
 * FAIL with the change taken out: reverting `firstOfItsKind` to `false` turns the first test red
 * (one row instead of two) and leaves the rest green, which is the split that existed before.
 */
import { generateReskin, PRINT_CARD_ROWS, cardBand } from '../generate.mjs';

const CONCEPT = 'a bog hound that hides in the mire';
const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`);
  if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};

/**
 * A trait the seat parser accepts and that lands as a free row.
 *
 * `clause` matters: a row written for a clause the GM TYPED is not a free row at all (the owner's
 * 18 November order), so a test about two FREE traits has to hand the seat clauses the concept does
 * not contain, or the first binds and only the second is free.
 */
const A_FREE_TRAIT = (name = 'Living Mire', clause = 'hides in the mire') => ({
  attacks: [], saves: [], strikes: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [],
  traits: [{ clause, name, trigger: 'While the hound is standing in water or mud',
    effect: 'it does not suffer Disadvantage on Dexterity (Stealth) checks made to hide there',
    imposes: null, condition_relation: 'none', acts: null, heals: false, mechanics: 1, quantities: 0,
    passive_effect: 'defense' }],
});
/** An action the seat parser accepts and that lands as a free row. */
const A_FREE_ACTION = (name = 'Muck-Lunge') => ({
  attacks: [], traits: [], strikes: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [],
  saves: [{ clause: 'hides in the mire', name, stat: 'Strength', target: 'one creature within 10 feet',
    condition: 'Prone', movement: null, success: 'none', acts: null, heals: false, mechanics: 1, quantities: 1 }],
});
const NOTHING = { attacks: [], saves: [], traits: [], strikes: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [] };

/**
 * @param seats  answers handed to the seat calls in order; the last repeats
 * @param cr     decides the band, and so the card's room
 */
const build = async ({ seats, cr = 10, concept = CONCEPT, path = 'homebrew', printBody = null, fit = null } = {}) => {
  let cached = null;
  let seatAsks = 0;
  const monster = await generateReskin({
    mechanics: [], archetype: 'skirmisher', concept, userConcept: concept, cr,
    path: { path, print_body: printBody, relation: 'is', class: null },
  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (/"hold_shape": \{"shape"/.test(p)) {
      return JSON.stringify({ shoots: { yes: false, because: '' }, is_a_swarm: { yes: false, because: '' },
        hold_shape: { shape: 'none', because: '' }, casts: { yes: false, because: '', implied_by_kind: false } });
    }
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({
        action: { idea: 'It lunges and drags its prey under the muck.', section: 'action', trigger: 'save', effect: 'condition', family: 'drag' },
        trait: { idea: 'It lies still in the mire and is hard to see.', trigger: 'always', effect: 'defense', family: 'breach' },
      });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify(fit ?? { template: null, declined_because: 'no_fit', closest: null, missing: 'a mire-hider' });
    }
    if (p.startsWith('You are writing ONE ability')) {
      const a = seats[Math.min(seatAsks, seats.length - 1)];
      seatAsks += 1;
      return JSON.stringify(typeof a === 'function' ? a(p) : a);
    }
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      cached = JSON.stringify({ name: 'Bog Hound', type: 'Beast', size: 'Medium', alignment: 'Unaligned',
        senses: 'darkvision 60 ft.', languages: 'None', renames: Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])),
        damage_types: {}, conditions: { condition_minor: 'Prone', condition_major: 'Restrained' },
        melee_rider: 'none', projectile: 'none', wildcard: '' });
    }
    return cached;
  });
  return { monster, seatAsks };
};

const rows = (m) => Object.entries(m.sections ?? {}).flatMap(([sec, es]) => (es ?? []).map((e) => ({ sec, e })));
const freeRows = (m) => rows(m).filter(({ e }) => e.freeRow);
const named = (m, name) => rows(m).find(({ e }) => String(e.name ?? '').startsWith(name)) ?? null;
/** what the rule itself reads: print's high end for the band, less the rows the card carries anyway */
const roomOn = (m, cr) => {
  const band = cardBand(cr);
  const fixed = rows(m).filter(({ e }) => !e.freeRow && !/^Multiattack/.test(String(e.name ?? ''))).length;
  return Math.max(0, PRINT_CARD_ROWS[band][1] - fixed);
};

jest.setTimeout(60000);

describe('a card with room for two keeps its trait and its action', () => {
  let monster; let room;
  beforeAll(async () => {
    ({ monster } = await build({ seats: [A_FREE_ACTION(), A_FREE_TRAIT()], cr: 10 }));
    room = roomOn(monster, 10);
  });

  it('the card really has room for two — the premise this test rests on', () => {
    expect(room).toBeGreaterThanOrEqual(2);
  });

  it('both rows are there', () => {
    expect(named(monster, 'Muck-Lunge')).not.toBeNull();
    expect(named(monster, 'Living Mire')).not.toBeNull();
  });

  it('one of each kind, and only one of each', () => {
    expect(freeRows(monster).map(({ sec }) => (sec === 'Traits' ? 'trait' : 'other')).sort())
      .toEqual(['other', 'trait']);
  });
});

describe("a card already at print's high end keeps one", () => {
  /**
   * CR 1 sits in band 0-2, where print's high end is 4 rows, and this chassis already carries four
   * fixed ones — so the card has no room and the old rule alone decides. This is the real shape of
   * s33 on the forty, whose card is at its high end with room 0.
   */
  let monster; let room;
  beforeAll(async () => {
    ({ monster } = await build({ seats: [A_FREE_ACTION(), A_FREE_TRAIT()], cr: 1 }));
    room = roomOn(monster, 1);
  });

  it('the card really has no room — the premise this test rests on', () => {
    expect(room).toBe(0);
  });

  it('one row is kept, and it is the one the existing order keeps', () => {
    const free = freeRows(monster);
    expect(free).toHaveLength(1);
    // Both rows rank the same (each carries a clause), so the stable sort leaves sheet order, and
    // Traits come before Actions. That is what today's order keeps, unchanged by this round.
    expect(free[0].sec).toBe('Traits');
    expect(named(monster, 'Muck-Lunge')).toBeNull();
  });
});

describe('two free traits and room for two still keep one', () => {
  it('the second row of the same kind gains nothing from this rule', async () => {
    // CR 13 sits in band 13-16, where print's high end is 10, so the card has room to spare and
    // the only thing stopping a second trait is that it is not the first of its kind.
    const { monster } = await build({
      seats: [A_FREE_TRAIT('Living Mire', 'a surprise of its own'), A_FREE_TRAIT('Second Skin', 'another surprise')],
      cr: 13,
    });
    expect(roomOn(monster, 13)).toBeGreaterThanOrEqual(2);
    expect(freeRows(monster).filter(({ sec }) => sec === 'Traits')).toHaveLength(1);
    // exactly one of the two, and the rule says nothing about which: both rank the same, so the
    // stable sort and sheet order decide, as they did before this round.
    expect([named(monster, 'Living Mire'), named(monster, 'Second Skin')].filter(Boolean)).toHaveLength(1);
  });
});

describe('a printed creature typed by name alone takes no free row', () => {
  it('no free row survives, whatever the seats wrote', async () => {
    const { monster } = await build({
      seats: [A_FREE_ACTION(), A_FREE_TRAIT()], cr: 3, concept: 'Owlbear', path: 'exact', printBody: 'Owlbear',
    });
    expect(freeRows(monster)).toEqual([]);
  });
});

describe('the borrowed row gains nothing', () => {
  /**
   * The owner's 29 October balance: the stock row borrowed when the call refuses answers to the
   * card's room AND to print's median, while a row the call chose keeps the budget it always had.
   * This round gives the borrowed row nothing — `receiptRank(e) === 3` is excluded from the kind
   * rule — so it is never kept merely by being the only row of its kind.
   */
  it('a borrowed trait beside a chosen action is not kept by its kind', async () => {
    const { monster } = await build({
      seats: [A_FREE_ACTION(), NOTHING], cr: 10,
      fit: { template: null, declined_because: 'no_fit', closest: 'pack-tactics', missing: 'a mire-hider' },
    });
    const borrowed = rows(monster).filter(({ e }) => e.accepted_closest);
    const free = freeRows(monster);
    // The chosen action is kept; nothing borrowed rode in beside it on the kind rule.
    expect(named(monster, 'Muck-Lunge')).not.toBeNull();
    expect(borrowed.filter(({ e }) => free.some((f) => f.e === e))).toEqual([]);
  });
});
