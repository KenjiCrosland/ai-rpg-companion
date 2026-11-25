/**
 * THE LEDGER OF TYPED ASKS (Fable's round one, Part A, 2026-11-25).
 *
 * The check this replaces ran mid-pipeline and took a call's word: s17's Necrotic Breath was
 * credited and then removed by print canon, and s28's two named spells were credited to a
 * Spellcasting row holding neither. These assert on `buildLedger`'s return value — the boundary the
 * record is made at — plus one run through `generateReskin` for the wiring.
 */
import { buildLedger, generateReskin } from '../generate.mjs';

const ROW = (over) => ({ name: 'Web Snare', text: '*Strength Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has the Restrained condition.', ...over });
const SPELLS = new Set(['Hold Person', 'Mirror Image', 'Shield']);

describe('a typed ask whose row is on the finished sheet', () => {
  const led = buildLedger({
    sections: { Actions: [ROW({ clause: 'snares with webs', clauseBy: 'receipt' })] },
    clauses: [{ id: 'c1', text: 'snares with webs', kind: 'mechanical' }],
  });

  it('is answered, names the row, and says how it was bound', () => {
    expect(led).toHaveLength(1);
    expect(led[0]).toMatchObject({ status: 'answered', row: 'Web Snare', boundBy: 'receipt' });
  });

  it('a handed binding is answered too, and marked handed', () => {
    const h = buildLedger({
      sections: { Actions: [ROW({ clauseId: 'c1' })] },
      clauses: [{ id: 'c1', text: 'snares with webs', kind: 'mechanical' }],
    });
    expect(h[0]).toMatchObject({ status: 'answered', boundBy: 'handed' });
  });
});

describe('a call says an existing row covers a typed ask, and the row is not bound to it', () => {
  it('the entry is open with reason claimed', () => {
    const led = buildLedger({
      sections: { Actions: [ROW({ claimedClause: 'heals when he kills' })] },
      clauses: [{ id: 'c1', text: 'heals when he kills', kind: 'mechanical' }],
    });
    expect(led[0]).toMatchObject({ status: 'open', reason: 'claimed' });
  });
});

describe('a typed ask naming a spell the sheet does not list', () => {
  it('the entry is open with reason spell-missing', () => {
    const led = buildLedger({
      sections: { Actions: [{ name: 'Spellcasting', text: 'The mage casts one of the following spells: At will: Shield' }] },
      clauses: [{ id: 'c1', text: 'casts hold person and mirror image', kind: 'mechanical' }],
      spellNames: SPELLS,
    });
    expect(led[0]).toMatchObject({ status: 'open', reason: 'spell-missing' });
    expect(led[0].detail).toMatch(/Hold Person/);
  });

  it('and is answered when the list holds it', () => {
    const led = buildLedger({
      sections: { Actions: [{ name: 'Spellcasting', text: 'casts: At will: Hold Person, Mirror Image', clause: 'casts hold person and mirror image' }] },
      clauses: [{ id: 'c1', text: 'casts hold person and mirror image', kind: 'mechanical' }],
      spellNames: SPELLS,
    });
    expect(led[0].status).toBe('answered');
  });
});

describe('a typed row that a pass removed', () => {
  it('the entry is open with reason removed, and names the pass', () => {
    const led = buildLedger({
      sections: {},
      clauses: [{ id: 'c3', text: 'breath is necrotic', kind: 'mechanical' }],
      removals: [{ name: 'Necrotic Breath', pass: 'print canon', clause: 'breath is necrotic', clauseIds: ['c3'], boundBy: 'anchor' }],
    });
    expect(led[0]).toMatchObject({ status: 'open', reason: 'removed', row: 'Necrotic Breath', pass: 'print canon' });
  });

  it('and reads never-written when no pass took anything', () => {
    const led = buildLedger({ sections: {}, clauses: [{ id: 'c4', text: 'immune to charm', kind: 'mechanical' }] });
    expect(led[0]).toMatchObject({ status: 'open', reason: 'never-written' });
  });
});

describe('a clause that names a condition', () => {
  it('is a mismatch when the bound row imposes a different one', () => {
    const led = buildLedger({
      sections: { Actions: [{ name: 'Barbed Reel', text: 'The target has the Grappled condition.', clause: 'restrained while grappled', imposes: ['Grappled'] }] },
      clauses: [{ id: 'c1', text: 'restrained while grappled', kind: 'mechanical', askCondition: 'Restrained' }],
    });
    expect(led[0]).toMatchObject({ status: 'mismatch' });
    expect(led[0].detail).toMatch(/asked the Restrained condition/);
  });

  it('says so when the engine cannot check it', () => {
    const led = buildLedger({
      sections: { Actions: [{ name: 'Barbed Reel', text: 'The target has the Grappled condition.', clause: 'restrained while grappled' }] },
      clauses: [{ id: 'c1', text: 'restrained while grappled', kind: 'mechanical', askCondition: 'Restrained' }],
    });
    expect(led[0].conditionUnchecked).toBe('Restrained');
  });
});

describe('a header clause', () => {
  it('gets an entry and nothing more', () => {
    const led = buildLedger({ sections: {}, clauses: [{ id: 'h', text: 'a river spirit', kind: 'descriptive', head: true }] });
    expect(led[0]).toEqual({ clause: 'a river spirit', status: 'header' });
  });
});

const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`);
  if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};

describe('the ledger is on a finished sheet', () => {
  jest.setTimeout(60000);
  it('generateReskin leaves it at generation.ledger', async () => {
    let cached = null;
    const CONCEPT = 'a bog hound that drags fishermen under';
    const m = await generateReskin({
      mechanics: [], archetype: 'brute', concept: CONCEPT, userConcept: CONCEPT, cr: 5,
      path: { path: 'homebrew', print_body: null, relation: null, class: null },
    }, async (p0) => {
      const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
      if (/"hold_shape": \{"shape"/.test(p)) {
        return JSON.stringify({ shoots: { yes: false, because: '' }, is_a_swarm: { yes: false, because: '' },
          hold_shape: { shape: 'grip', because: '' }, casts: { yes: false, because: '', implied_by_kind: false } });
      }
      if (p.startsWith('You are inventing the SIGNATURE ability')) {
        return JSON.stringify({ action: { idea: 'It drags a victim under the water.', section: 'action', trigger: 'on_hit', effect: 'condition', family: 'hound' } });
      }
      if (p.startsWith("A monster's signature ability has been described in plain words")) {
        return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a drag' });
      }
      if (p.startsWith('You are writing ONE ability')) {
        return JSON.stringify({ attacks: [], saves: [], traits: [], strikes: [], riders: [], auras: [], reactions: [], crossRef: null, unplaced: [] });
      }
      const rk = keysOf(p, 'renames');
      if (rk.length || !cached) {
        cached = JSON.stringify({ name: 'Bog Hound', type: 'Monstrosity', size: 'Large', alignment: 'Unaligned',
          senses: '', languages: '', renames: Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])),
          damage_types: {}, conditions: {}, melee_rider: 'none', projectile: 'none', wildcard: '' });
      }
      return cached;
    });
    const led = m.generation?.ledger;
    expect(Array.isArray(led)).toBe(true);
    const mech = (m.generation.clauses ?? []).filter((c) => c.kind === 'mechanical' && !c.head);
    expect(led.filter((e) => e.status !== 'header')).toHaveLength(mech.length);
    for (const e of led) expect(['answered', 'mismatch', 'open', 'header']).toContain(e.status);
  });
});
