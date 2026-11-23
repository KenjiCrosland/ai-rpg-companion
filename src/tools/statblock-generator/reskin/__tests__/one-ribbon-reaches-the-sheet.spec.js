/**
 * THE RIBBON THROUGH THE WHOLE PIPELINE, WITH THE SWITCH ON.
 *
 * The ribbon is parked (owner, 2026-11-23): off unless a generation asks for it. Every build here
 * passes `ribbon: true`. What the product does by default is in `the-ribbon-is-parked.spec.js`.
 *
 * `generateReskin(options, callLLM)` with a stub routed on each call's opening words — the pattern
 * `the-seat-gets-one-more-try.spec.js` and `a-strike-reaches-the-finished-sheet.spec.js` use. The
 * lesson of the curse gate is that a fix needs one test that goes through the place it is wired in,
 * and the place this is wired in is the last twenty lines of generateReskin.
 *
 * Every test that writes a ribbon also asserts NOTHING ELSE ON THE SHEET MOVED, by comparing with
 * the same generation whose ribbon call throws. That is the property this round is for.
 */
import { generateReskin } from '../generate.mjs';
import { RIBBON_PROMPT_HEAD, ribbonFamiliesOffered, isRibbonRow, familyKeys } from '../ribbon.mjs';

const CONCEPT = 'Dire Wolf — with a frost-rimed hide';
const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`);
  if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};

/** A ribbon the validator accepts, per family. */
const GOOD = {
  senses: { name: 'Rime Scent', ribbon: 'The hound can pinpoint the location of anything frozen within 60 feet of itself.' },
  speaks: { name: 'Frost Whine', ribbon: 'The hound can only make the sounds it heard in the pack that raised it.' },
  taboo: { name: 'Winter Need', ribbon: 'The hound cannot willingly sleep anywhere but on frozen ground, and digs to find it.' },
  'leaves-at-death': { name: 'Rime Shard', ribbon: 'When it dies a shard of rime is left behind, humming faintly for 1 hour before it melts.' },
  moves: { name: 'Frost Tread', ribbon: 'The hound can cross snow and thin ice without breaking it or sinking.' },
  sheds: { name: 'Rime Trail', ribbon: 'It sheds a trail of frost that a creature can follow with a DC 20 Wisdom (Survival) check.' },
};
const goodFor = (families) => ({ family: families[0], ...GOOD[families[0]] });

/**
 * @param ribbon an answer object, a list of them in turn, or 'throw'
 */
/** A trait the seat parser accepts, so the free-row budget is actually spent. */
const A_FREE_ROW = {
  attacks: [], saves: [], strikes: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [],
  traits: [{ clause: 'a frost-rimed hide', name: 'Rimed Hide', trigger: 'While the hound is in snow or ice',
    effect: 'it does not suffer Disadvantage on Wisdom (Perception) checks that rely on smell', imposes: null,
    condition_relation: 'none', acts: null, heals: false, mechanics: 1, quantities: 0, passive_effect: 'defense' }],
};

const build = async ({ ribbon, concept = CONCEPT, cr = 6, printBody = 'Dire Wolf', path = 'twist', seat = null } = {}) => {
  let cached = null;
  let ribbonAsks = 0;
  const monster = await generateReskin({
    mechanics: [], archetype: 'skirmisher', concept, userConcept: concept, cr,
    path: { path, print_body: printBody, relation: 'is', class: null },
    // THE RIBBON IS PARKED AND OFF BY DEFAULT (owner, 2026-11-23). Every test in this file is a
    // SWITCH-ON test and says so here; `the-ribbon-is-parked.spec.js` holds the default.
    ribbon: true,
  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
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
      return JSON.stringify(seat ?? { attacks: [], saves: [], traits: [], strikes: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [] });
    }
    if (p.startsWith(RIBBON_PROMPT_HEAD)) {
      ribbonAsks += 1;
      if (ribbon === 'throw') throw new Error('the ribbon call fell over');
      const give = Array.isArray(ribbon) ? ribbon[Math.min(ribbonAsks - 1, ribbon.length - 1)] : ribbon;
      return typeof give === 'string' ? give : JSON.stringify(give);
    }
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      cached = JSON.stringify({ name: 'Rime Hound', type: 'Beast', size: 'Large', alignment: 'Unaligned',
        senses: 'darkvision 60 ft.', languages: 'None', renames: Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])),
        damage_types: {}, conditions: {}, melee_rider: 'none', projectile: 'none', wildcard: '' });
    }
    return cached;
  });
  return { monster, ribbonAsks };
};

const traitsOf = (m) => (m.sections?.Traits ?? []);
const ribbonOf = (m) => traitsOf(m).find(isRibbonRow) ?? null;
/** every row but the ribbon, as name|text, for the "nothing else moved" compare */
const skeleton = (m) => Object.entries(m.sections ?? {}).map(([sec, rows]) => [sec,
  (rows ?? []).filter((r) => !isRibbonRow(r)).map((r) => `${r.name}|${r.text}`)]);

jest.setTimeout(60000);

describe("a creature of the GM's own takes one ribbon, and nothing else moves", () => {
  let offered; let withIt; let withoutIt; let asks;

  beforeAll(async () => {
    offered = ribbonFamiliesOffered(CONCEPT, { size: 'Large' });
    const a = await build({ ribbon: goodFor(offered) });
    withIt = a.monster; asks = a.ribbonAsks;
    withoutIt = (await build({ ribbon: 'throw' })).monster;
  });

  it('the sheet has one more row, and it is last under Traits', () => {
    expect(traitsOf(withIt).length).toBe(traitsOf(withoutIt).length + 1);
    expect(isRibbonRow(traitsOf(withIt).at(-1))).toBe(true);
  });

  it('every other row is exactly what it is without the ribbon', () => {
    expect(skeleton(withIt)).toEqual(skeleton(withoutIt));
  });

  it('the call was made once', () => { expect(asks).toBe(1); });

  it('generation records the family, the three offered, and the attempt', () => {
    const r = withIt.generation.ribbon;
    expect(r.offered).toHaveLength(3);
    expect(r.offered).toContain(r.family);
    expect(r.attempt).toBe(1);
    expect(r.name).toBe(ribbonOf(withIt).name);
  });

  it('the stored lint findings are what the lint says of the sheet that is returned, ribbon included', async () => {
    const { lintSheet } = await import('../sheet-lints.mjs');
    const fresh = lintSheet(withIt).map((h) => `${h.rule}: ${h.message}`);
    const SHEET_RULES = new Set((await import('../sheet-lints.mjs')).SHEET_LINTS.map((l) => l.rule));
    const stored = (withIt.lint_findings ?? []).filter((f) => SHEET_RULES.has((/^([a-z0-9-]+):/.exec(f) ?? [])[1]));
    expect(stored).toEqual(fresh);
    expect(ribbonOf(withIt)).not.toBeNull(); // the invariant is only worth anything with one on
  });
});

describe('the ribbon is outside the free-row budget', () => {
  it('a sheet whose budget is spent still gets one, and the row that spent it is still there', async () => {
    const offered = ribbonFamiliesOffered(CONCEPT, { size: 'Large' });
    const spent = (await build({ ribbon: 'throw', seat: A_FREE_ROW })).monster;
    const free = traitsOf(spent).filter((r) => r.freeRow).map((r) => r.name);
    expect(free.length).toBeGreaterThan(0); // the budget really is spent, or this test proves nothing

    const { monster } = await build({ ribbon: goodFor(offered), seat: A_FREE_ROW });
    expect(ribbonOf(monster)).not.toBeNull();
    expect(traitsOf(monster).filter((r) => r.freeRow).map((r) => r.name)).toEqual(free);
    expect(skeleton(monster)).toEqual(skeleton(spent));
  });

  it('the ribbon row is not itself a free row', async () => {
    const offered = ribbonFamiliesOffered(CONCEPT, { size: 'Large' });
    const { monster } = await build({ ribbon: goodFor(offered) });
    expect(ribbonOf(monster).freeRow).toBeUndefined();
  });
});

describe('which sheets the call is made for', () => {
  it('a printed creature typed by name alone gets none, and the call is never made', async () => {
    const { monster, ribbonAsks } = await build({ ribbon: goodFor(['senses']), concept: 'Dire Wolf', path: 'exact' });
    expect(ribbonOf(monster)).toBeNull();
    expect(ribbonAsks).toBe(0);
    // AND NOTHING IS STAMPED. The strict replay of 22 November failed on this: a record on a sheet
    // that was never asked made s21's Owlbear differ from its recording in `generation` alone.
    expect(monster.generation.ribbon).toBeUndefined();
  });

  it('a printed creature with a twist gets one even when the route says exact', async () => {
    const concept = 'Dire Wolf — with a frost-rimed hide';
    const { monster, ribbonAsks } = await build({ ribbon: goodFor(ribbonFamiliesOffered(concept, { size: 'Large' })), concept, path: 'exact' });
    expect(ribbonAsks).toBe(1);
    expect(ribbonOf(monster)).not.toBeNull();
  });
});

describe('when the answer is refused', () => {
  it('the model is asked once more with the reason, and the ribbon lands', async () => {
    const offered = ribbonFamiliesOffered(CONCEPT, { size: 'Large' });
    const bad = { family: offered[0], name: 'Too Much', ribbon: 'A creature within 30 feet has the Frightened condition until the end of its next turn.' };
    const { monster, ribbonAsks } = await build({ ribbon: [bad, goodFor(offered)] });
    expect(ribbonAsks).toBe(2);
    expect(ribbonOf(monster)).not.toBeNull();
    expect(monster.generation.ribbon.attempt).toBe(2);
  });

  it('refused twice: no ribbon, two asks, both reasons kept, and the sheet otherwise whole', async () => {
    const offered = ribbonFamiliesOffered(CONCEPT, { size: 'Large' });
    const bad = { family: offered[0], name: 'Too Much', ribbon: 'Each creature within 10 feet takes 7 (2d6) Cold damage.' };
    const { monster, ribbonAsks } = await build({ ribbon: [bad, bad] });
    expect(ribbonAsks).toBe(2);
    expect(ribbonOf(monster)).toBeNull();
    expect(monster.generation.ribbon.written).toBe(false);
    // every fault is kept, joined, and handed to the re-ask — measured 2026-11-22, see below
    expect(monster.generation.ribbon.reasons).toHaveLength(2);
    for (const kept of monster.generation.ribbon.reasons) expect(kept).toMatch(/^it does damage/);
    expect(skeleton(monster)).toEqual(skeleton((await build({ ribbon: 'throw' })).monster));
  });

  it('a family outside the three offered is refused', async () => {
    const offered = ribbonFamiliesOffered(CONCEPT, { size: 'Large' });
    const notOffered = familyKeys().find((k) => !offered.includes(k));
    const wrong = { family: notOffered, name: 'Wrong Shelf', ribbon: GOOD[notOffered].ribbon };
    const { monster, ribbonAsks } = await build({ ribbon: [wrong, goodFor(offered)] });
    expect(ribbonAsks).toBe(2);
    expect(monster.generation.ribbon.attempt).toBe(2);
    expect(monster.generation.ribbon.family).toBe(offered[0]);
  });

  it('an unreadable answer is a refusal, not a crash', async () => {
    const { monster, ribbonAsks } = await build({ ribbon: ['not json at all', 'still not json'] });
    expect(ribbonAsks).toBe(2);
    expect(ribbonOf(monster)).toBeNull();
    expect(monster.generation.ribbon.reasons).toEqual(['the answer could not be read', 'the answer could not be read']);
  });
});

describe('the engine sets the DC, and the call never stops a sheet', () => {
  it('a model writing DC 20 on a CR 3 creature ships DC 10', async () => {
    // find a concept the engine offers `senses` to, so the DC-carrying sentence is in an offered family
    let concept = null;
    for (let i = 0; i < 4000 && !concept; i += 1) {
      const t = `a frost hound of the ninth kind, number ${i}`;
      if (ribbonFamiliesOffered(t, { size: 'Large' })[0] === 'senses') concept = t;
    }
    expect(concept).not.toBeNull();
    const withDc = { family: 'senses', name: 'Rime Scent',
      ribbon: 'It can pinpoint anything frozen within 60 feet, and a creature can make a DC 20 Wisdom (Perception) check to learn what.' };
    const { monster } = await build({ ribbon: withDc, concept, cr: 3, printBody: null, path: 'homebrew' });
    const row = ribbonOf(monster);
    expect(row).not.toBeNull();
    expect(row.text).toContain('DC 10');
    expect(row.text).not.toContain('DC 20');
  });

  it('the call throwing ships the sheet without a ribbon', async () => {
    const { monster } = await build({ ribbon: 'throw' });
    expect(ribbonOf(monster)).toBeNull();
    expect(monster.generation.ribbon.failed).toBe(true);
    expect(Object.values(monster.sections).flat().length).toBeGreaterThan(2);
  });
});

describe('the re-ask is handed every fault', () => {
  /**
   * The first recording of this round handed the model one reason. In five of its six double
   * refusals the second answer broke a DIFFERENT rule than the first — told its name was four
   * words it shortened the name and wrote "40 feet"; told it was 42 words it cut the sentence and
   * wrote "5 feet". Eleven sheets of thirty-eight lost their ribbon to that.
   */
  it('builds the re-ask with every fault listed, not the first', async () => {
    const { buildRibbonPrompt } = await import('../ribbon.mjs');
    const p = buildRibbonPrompt({ name: 'Rime Hound', type: 'Beast', size: 'Large', cr: 6, typed: CONCEPT,
      families: ['senses'], refusedFor: ['it is 44 words, and a ribbon is 40 at most', '"45 feet" is not one of the distances'] });
    expect(p).toContain('FOR EVERY REASON BELOW');
    expect(p).toContain('- it is 44 words, and a ribbon is 40 at most');
    expect(p).toContain('- "45 feet" is not one of the distances');
  });

  it('both faults are recorded when it is refused twice', async () => {
    const offered = ribbonFamiliesOffered(CONCEPT, { size: 'Large' });
    const twoFaults = { family: offered[0], name: 'A Name Of Four Words',
      ribbon: `It can pinpoint a thing within 45 feet of itself. ${Array.from({ length: 34 }, () => 'word').join(' ')}` };
    const { monster } = await build({ ribbon: [twoFaults, twoFaults] });
    expect(monster.generation.ribbon.written).toBe(false);
    for (const kept of monster.generation.ribbon.reasons) {
      expect(kept).toMatch(/45 feet/);
      expect(kept).toMatch(/name is 5 words/);
      expect(kept).toContain(';'); // several faults, joined
    }
  });
});

describe("print's casing on the 2024 side", () => {
  it('capitalises the rules terms a ribbon can hold', async () => {
    const { ribbonTextFor2024 } = await import('../ribbon.mjs');
    expect(ribbonTextFor2024('the ground it crosses is difficult terrain and it sheds dim light'))
      .toEqual({ text: 'the ground it crosses is Difficult Terrain and it sheds Dim Light',
        termsUsed: ['Difficult Terrain', 'Dim Light'] });
  });

  it('leaves a ribbon with no such term alone', async () => {
    const { ribbonTextFor2024 } = await import('../ribbon.mjs');
    const plain = 'The hound can cross snow and thin ice without breaking it.';
    expect(ribbonTextFor2024(plain)).toEqual({ text: plain, termsUsed: [] });
  });

  it('the row that reaches the sheet carries print\'s casing', async () => {
    let concept = null;
    for (let i = 0; i < 4000 && !concept; i += 1) {
      const t = `a marsh thing of the ninth kind, number ${i}`;
      if (ribbonFamiliesOffered(t, { size: 'Large' })[0] === 'moves') concept = t;
    }
    const lower = { family: 'moves', name: 'Marsh Way',
      ribbon: 'It can cross fen water without sinking, and the ground behind it becomes difficult terrain.' };
    const { monster } = await build({ ribbon: lower, concept, printBody: null, path: 'homebrew' });
    expect(ribbonOf(monster).text).toContain('Difficult Terrain');
    expect(ribbonOf(monster).text).not.toContain('difficult terrain');
  });
});

describe('the 2014 side, which the engine writes itself', () => {
  it('the conversion never sees the ribbon, and gets it back after', async () => {
    const { takeRibbonOut, putRibbonIn, ribbonRowFrom } = await import('../ribbon.mjs');
    const sheet = { sections: { Traits: [{ name: 'Pack Tactics', text: 'print' }], Actions: [{ name: 'Bite', text: 'print' }] } };
    putRibbonIn(sheet, ribbonRowFrom({ name: 'Rime Scent', sentence: 'It can pinpoint anything frozen within 60 feet.', family: 'senses' }));
    expect(sheet.sections.Traits).toHaveLength(2);

    const took = takeRibbonOut(sheet);
    expect(took.name).toBe('Rime Scent');
    expect(sheet.sections.Traits.map((r) => r.name)).toEqual(['Pack Tactics']); // what the conversion is given
    expect(takeRibbonOut(sheet)).toBeNull(); // and nothing else is removed by a second pass
  });

  it('writes into the 2014 flat shape, last under its traits', async () => {
    const { putRibbonIn, ribbonRowFrom } = await import('../ribbon.mjs');
    const legacy = { abilities: [{ name: 'Keen Hearing', text: 'print' }], actions: [{ name: 'Bite', text: 'print' }] };
    putRibbonIn(legacy, ribbonRowFrom({ name: 'Rime Scent', sentence: 'It can pinpoint anything frozen within 60 feet.', family: 'senses' }));
    expect(legacy.abilities.map((r) => r.name)).toEqual(['Keen Hearing', 'Rime Scent']);
    expect(legacy.actions).toHaveLength(1);
  });

  it('never writes two', async () => {
    const { putRibbonIn, ribbonRowFrom } = await import('../ribbon.mjs');
    const sheet = { sections: { Traits: [] } };
    const row = ribbonRowFrom({ name: 'Rime Scent', sentence: 'It can pinpoint anything frozen within 60 feet.', family: 'senses' });
    putRibbonIn(sheet, row);
    putRibbonIn(sheet, row);
    expect(sheet.sections.Traits).toHaveLength(1);
  });

  it('rewords the 2024-only terms and says which it used', async () => {
    const { ribbonTextFor2014 } = await import('../ribbon.mjs');
    const out = ribbonTextFor2014('The ground in a 10-foot Emanation is Difficult Terrain, and it sheds Bright Light and Dim Light.');
    expect(out.text).toContain('difficult terrain');
    expect(out.text).toContain('bright light');
    expect(out.text).toContain('dim light');
    expect(out.text).not.toMatch(/Emanation|Difficult Terrain|Bright Light|Dim Light/);
    expect(out.termsUsed.length).toBeGreaterThan(0);
  });

  it('leaves a ribbon with no 2024-only term alone, and reports none', async () => {
    const { ribbonTextFor2014 } = await import('../ribbon.mjs');
    const plain = 'The hound can cross snow and thin ice without breaking it or sinking.';
    expect(ribbonTextFor2014(plain)).toEqual({ text: plain, termsUsed: [] });
  });
});
