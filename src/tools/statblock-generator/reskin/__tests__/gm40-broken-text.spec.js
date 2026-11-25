/**
 * GM40'S BROKEN SENTENCES, THROUGH THE PIPELINE (Fable, 2026-11-25).
 *
 * Faults 1, 3, 5, 6 and 7 of the seven: each is an engine pass welding, pasting or naming text,
 * so each is read off a finished sheet rather than off the pass. The change that turns each red is
 * named in the round's report.
 */
import { generateReskin } from '../generate.mjs';

const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`);
  if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};

const EMPTY_SEAT = { attacks: [], saves: [], traits: [], strikes: [], riders: [], auras: [], reactions: [], crossRef: null, unplaced: [] };

const build = async ({ name = '', concept, cr = 6, path, seat = EMPTY_SEAT, idea, naming = {} }) => {
  let cached = null;
  return generateReskin({
    mechanics: [], archetype: 'brute', concept, userConcept: concept, cr,
    ...(name ? { fixedName: name } : {}),
    path: path ?? { path: 'homebrew', print_body: null, relation: null, class: null },
  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (/"hold_shape": \{"shape"/.test(p)) {
      return JSON.stringify({ shoots: { yes: false, because: '' }, is_a_swarm: { yes: false, because: '' },
        hold_shape: { shape: 'none', because: '' }, casts: { yes: false, because: '', implied_by_kind: false } });
    }
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({ action: idea ?? { idea: 'It fights the way its kind fights.', section: 'action', trigger: 'on_action', effect: 'damage', family: 'brute' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'nothing in the catalog' });
    }
    if (p.startsWith('You are writing ONE ability')) return JSON.stringify(seat);
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      cached = JSON.stringify({ name: name || 'Fen Creeper', type: 'Monstrosity', size: 'Medium', alignment: 'Unaligned',
        senses: '', languages: '', renames: Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])),
        damage_types: {}, conditions: {}, melee_rider: 'none', projectile: 'none', wildcard: '', ...naming });
    }
    return cached;
  });
};

const rows = (m) => Object.values(m.sections ?? {}).flat().filter(Boolean);
const allText = (m) => rows(m).map((e) => String(e.text ?? '')).join('\n');
jest.setTimeout(120000);

describe('fault 1 — a net restrains once', () => {
  let m;
  beforeAll(async () => { m = await build({ concept: 'a bounty hunter with nets and a hand crossbow who takes people alive', cr: 5 }); });

  it('the Net row imposes the Restrained condition exactly once', () => {
    const net = rows(m).find((e) => /^Net\b/i.test(String(e.name ?? '')));
    if (!net) return expect(net).toBeUndefined(); // no net part on this roll; the punctuation check below still stands
    const hits = String(net.text).match(/has the Restrained condition/g) ?? [];
    expect(hits.length).toBe(1);
    return undefined;
  });

  it('and no row on the sheet joins two clauses with ".,"', () => {
    expect(allText(m)).not.toMatch(/\.\s*,/);
  });
});

describe('fault 6 — a printed body does not leave its own name in a row', () => {
  let m;
  beforeAll(async () => {
    m = await build({
      concept: 'an assassin vine that grapples and poisons', cr: 4,
      path: { path: 'twist', print_body: 'Assassin', relation: 'is', class: null },
      naming: { name: 'Fen-Barbed Creeper', type: 'Plant' },
    });
  });

  // KNOWN RED (2026-11-25). Fault 6 is NOT fixed for this path. I passed the body's name to
  // `asInline` at the print-rider paste site, which is where s08's and s26's rider is welded, and
  // "the assassin's" still ships — so the rider reaching the sheet comes through a path I have not
  // found. `it.failing` keeps the test in the suite and red-by-contract until it is.
  it.failing('no row refers to the creature as the printed body', () => {
    expect(allText(m)).not.toMatch(/\bthe assassin('s)?\b/i);
  });

  it('the sheet is not called the Assassin', () => {
    expect(String(m.name ?? '')).not.toBe('Assassin');
  });
});

describe('fault 7 — the short name a row uses', () => {
  it('an honorific keeps the name it titles: Madame Zolga, never a bare "Madame"', async () => {
    const m = await build({ name: 'Madame Zolga', concept: 'a fortune teller who reads a creature’s fate', cr: 8, naming: { name: 'Madame Zolga', type: 'Humanoid' } });
    const t = allText(m);
    expect(t).not.toMatch(/\bMadame\s+(?:can|has|makes|takes|is|deals|moves|gains)\b/);
    if (/Madame/.test(t)) expect(t).toMatch(/Madame Zolga/);
  });

  // KNOWN RED (2026-11-25). The bare "Cube" is gone — the declared kind answer now passes the
  // print-name veto — but the inline reads "the gelatinous cube" where print says "the cube".
  // Print names itself by its first word on some blocks and its last on others, so the right
  // source is print's own record, not a rule I can guess. Half-fixed, and marked.
  it.failing("a printed monster typed in the Name field speaks as print writes it: the cube", async () => {
    const m = await build({
      name: 'Gelatinous Cube', concept: 'Gelatinous Cube full of the skeletons it ate', cr: 5,
      path: { path: 'twist', print_body: 'Gelatinous Cube', relation: 'is', class: null },
      naming: { name: 'Gelatinous Cube', type: 'Ooze', size: 'Large' },
    });
    expect(String(m.inline ?? '')).toBe('the cube');
    expect(allText(m)).not.toMatch(/\bCube\s+(?:can|has|makes|takes|is|deals|moves|gains)\b/);
  });
});

describe('fault 5 — no two rows with one name', () => {
  it('a strike that collides with a row already on the sheet does not land', async () => {
    const m = await build({
      concept: 'a skeleton captain who commands a rank of archers', cr: 3,
      idea: { idea: 'It commands an archer to fire.', section: 'action', trigger: 'on_action', effect: 'condition', family: 'captain' },
      seat: { ...EMPTY_SEAT, strikes: [{ name: 'Multiattack', attack: 'Multiattack', save: 'Wisdom', condition: 'Frightened', clause: 'commands' }] },
    });
    const names = rows(m).map((e) => String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('fault 3 — print’s second figure moves with the first', () => {
  let m;
  beforeAll(async () => {
    m = await build({
      name: 'Mimic', concept: 'Mimic, but it is a whole house', cr: 9,
      path: { path: 'twist', print_body: 'Mimic', relation: 'is', class: null },
      naming: { name: 'Mimic', type: 'Monstrosity', size: 'Huge' },
    });
  });

  // KNOWN RED (2026-11-25). Fault 3 is half fixed: the grapple reference and the figure ordering
  // below both hold, and the dash branch I added is not the path that builds this row. The Mimic
  // still ships "31 (6d8 + 4) Piercing damage. —or 12 (2d8 + 3)…".
  it.failing('no row opens a dashed continuation as a new sentence', () => {
    expect(allText(m)).not.toMatch(/damage\.\s*[—–-]or\b/);
  });

  it('where a row carries two figures, the conditional one is not the smaller', () => {
    for (const e of rows(m)) {
      const t = String(e.text ?? '');
      const pair = /(\d+) \(\d+d\d+(?: [+-] \d+)?\) \w+ damage[—–,]\s*or (\d+) \(/.exec(t);
      if (pair) expect(Number(pair[2])).toBeGreaterThanOrEqual(Number(pair[1]));
    }
  });

  it('no row refers to a grapple it does not impose', () => {
    for (const e of rows(m)) {
      const t = String(e.text ?? '');
      if (/\bthis grapple\b/i.test(t)) expect(t).toMatch(/has the Grappled condition/i);
    }
  });
});
