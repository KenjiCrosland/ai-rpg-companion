/**
 * NAME REGISTERS (owner call, 2026-08-15: registers over ban lists).
 *
 * The convention is rolled pre-call and stated as fact — the rollEnergy
 * mechanism pointed at naming. Examples ROTATE (the item generator's
 * documented cargo-culting lesson: static tails anchor); coinage phonology
 * is gated by the funnel's type; real-culture language registers are never
 * used for monsters.
 */
import {
  rollNamingConvention, buildNamingBrief, NAMING_WEIGHTS, KENNING_NOUNS, FOLK_NAMES,
} from '../name-registers.mjs';
import { buildSeedSynthesisPrompt } from '../../format-2024/generate.mjs';
import { buildFlavorPrompt } from '../flavor-prompt.mjs';
import { buildSkeleton } from '../build-skeleton.mjs';
import { generateFromSkeleton } from '../generate.mjs';

describe('the convention roll', () => {
  test('honors the weights across the rand space', () => {
    const seen = { kenning: 0, coinage: 0, folk: 0 };
    for (let i = 0; i < 1000; i += 1) seen[rollNamingConvention(() => i / 1000)] += 1;
    const total = Object.values(NAMING_WEIGHTS).reduce((a, b) => a + b, 0);
    for (const [conv, w] of Object.entries(NAMING_WEIGHTS)) {
      expect(Math.abs(seen[conv] / 1000 - w / total)).toBeLessThan(0.02);
    }
  });

  test('every roll lands on a briefable convention', () => {
    for (const r of [0, 0.3, 0.6, 0.99]) {
      expect(buildNamingBrief(rollNamingConvention(() => r), { seed: 1 }).length).toBeGreaterThan(100);
    }
  });
});

describe('the brief', () => {
  test('deterministic for a (convention, type, seed) triple — bug reports reproduce', () => {
    const a = buildNamingBrief('coinage', { type: 'Fiend', seed: 42 });
    expect(a).toBe(buildNamingBrief('coinage', { type: 'Fiend', seed: 42 }));
  });

  test('examples ROTATE across seeds — the anti-cargo-culting lesson', () => {
    const briefs = new Set([1, 2, 3, 4, 5].map((s) => buildNamingBrief('kenning', { seed: s })));
    expect(briefs.size).toBeGreaterThan(3);
  });

  test('unknown or missing convention degrades to no brief — never-fail', () => {
    expect(buildNamingBrief(null)).toBe('');
    expect(buildNamingBrief('sonnet')).toBe('');
    expect(buildNamingBrief(undefined, { type: 'NoSuchType', seed: 1 })).toBe('');
  });

  test('coinage gates its register by type: a Dragon calibrates draconic, a Fiend infernal/abyssal', () => {
    const dragon = buildNamingBrief('coinage', { type: 'Dragon', seed: 7 });
    const fiend = buildNamingBrief('coinage', { type: 'Fiend', seed: 7 });
    // draconic epithets carry the -os/-ex/-ir tail cluster; the two briefs
    // must draw from DIFFERENT pools, whatever rotation picked
    expect(dragon).not.toBe(fiend);
    expect(dragon).toMatch(/phonetic register: [A-Z]/);
  });

  test('an unmapped type coins from the generic pool without crashing', () => {
    for (const type of ['Undead', 'Construct', 'Beast', 'Monstrosity', 'Ooze', 'Plant', null]) {
      expect(buildNamingBrief('coinage', { type, seed: 3 })).toMatch(/COINED SPECIES-WORD/);
    }
  });

  test('kenning brief demands a living noun and rotates from the bank', () => {
    const brief = buildNamingBrief('kenning', { seed: 11 });
    expect(brief).toMatch(/KENNING/);
    expect(brief).toMatch(/BODY the reader pictures alive/);
    const list = brief.match(/coin beyond them freely\): ([^.]+)\./)[1].split(', ');
    expect(list).toHaveLength(8);
    for (const n of list) expect(KENNING_NOUNS).toContain(n);
  });

  test('folk brief speaks the hearth voice', () => {
    const brief = buildNamingBrief('folk', { seed: 11 });
    expect(brief).toMatch(/FOLK-NAME/);
    expect(FOLK_NAMES.some((n) => brief.includes(n))).toBe(true);
  });
});

describe('pool hygiene', () => {
  test('the kenning bank is concrete bodies: single capitalized words, no duplicates', () => {
    expect(new Set(KENNING_NOUNS).size).toBe(KENNING_NOUNS.length);
    for (const n of KENNING_NOUNS) expect(n).toMatch(/^[A-Z][a-z]+$/);
  });

  test('our own attractors are starved by omission: no Warden, no Sentinel', () => {
    expect(KENNING_NOUNS).not.toContain('Warden');
    expect(KENNING_NOUNS).not.toContain('Sentinel');
  });

  test('no real-culture language register reaches a monster brief', () => {
    // Sample a name from each protected/cultural pool the item generator
    // guards; none may surface in any coinage brief for any type × seed.
    const cultural = ['Tangaroa', 'Ogun', 'Viracocha'];
    for (const type of ['Dragon', 'Fiend', 'Fey', 'Giant', 'Humanoid', 'Undead']) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const brief = buildNamingBrief('coinage', { type, seed });
        for (const name of cultural) expect(brief).not.toContain(name);
      }
    }
  });
});

describe('prompt injection', () => {
  const seed = { intelligence: 'cunning', physical: 'furred', silhouette: 'quadruped', origin: 'the deep fens', creature_type: 'Monstrosity' };

  test('the synthesis prompt carries the brief and points the name field at it', () => {
    const p = buildSeedSynthesisPrompt(seed, { cr: 8, naming: 'kenning' });
    expect(p).toMatch(/THE NAME — the convention is rolled/);
    expect(p).toMatch(/written to THE NAME convention above/);
  });

  test('no naming rolled: the synthesis prompt is exactly the old ask', () => {
    const p = buildSeedSynthesisPrompt(seed, { cr: 8 });
    expect(p).not.toMatch(/THE NAME — the convention is rolled/);
    expect(p).toMatch(/Monster Manual register, 1-3 words/);
  });

  test('the flavor prompt carries the brief, seeded by the block', () => {
    const sk = buildSkeleton({ cr: 8, seed: 5 });
    const p = buildFlavorPrompt(sk, { concept: 'a fen-stalking horror', naming: { convention: 'kenning', type: 'Monstrosity' } });
    expect(p).toMatch(/THE NAME — the convention is rolled/);
    // same skeleton, same brief — reproducible from a bug report's seed
    expect(buildFlavorPrompt(sk, { concept: 'a fen-stalking horror', naming: { convention: 'kenning', type: 'Monstrosity' } })).toBe(p);
  });

  test('a proposed name plus a convention: the candidate line defers to the brief', () => {
    const sk = buildSkeleton({ cr: 8, seed: 5 });
    const p = buildFlavorPrompt(sk, { concept: 'a fen-stalking horror', proposedName: 'Fen Mauler', naming: { convention: 'kenning', type: 'Monstrosity' } });
    expect(p).toMatch(/stay inside the naming convention below/);
  });
});

describe('end to end: the convention survives the orchestrator', () => {
  test('generateFromSkeleton forwards the rolled convention into the flavor prompt', async () => {
    const prompts = [];
    const callLLM = async (p) => { prompts.push(p); return null; };
    await generateFromSkeleton({
      concept: 'a fen-stalking horror', cr: 8, seed: 9,
      resolvedType: 'Monstrosity', naming: 'folk',
    }, callLLM);
    const flavor = prompts.find((p) => /THE NAME — the convention is rolled/.test(p));
    expect(flavor).toBeTruthy();
    expect(flavor).toMatch(/FOLK-NAME/);
  });

  test('no convention: no brief anywhere — older callers unchanged', async () => {
    const prompts = [];
    const callLLM = async (p) => { prompts.push(p); return null; };
    await generateFromSkeleton({
      concept: 'a fen-stalking horror', cr: 8, seed: 9, resolvedType: 'Monstrosity',
    }, callLLM);
    expect(prompts.some((p) => /THE NAME — the convention is rolled/.test(p))).toBe(false);
  });
});
