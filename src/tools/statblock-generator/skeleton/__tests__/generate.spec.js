/**
 * The live entry point: one flavor call against a block whose numbers already
 * exist. These tests inject callLLM, so they measure the orchestration.
 */
import { generateFromSkeleton } from '../generate.mjs';
import { buildSkeleton } from '../build-skeleton.mjs';
import { flavorRequests } from '../flavor-prompt.mjs';

const goodModel = (skeleton) => JSON.stringify({
  name: 'Bogmaw', size: skeleton.size, type: 'Monstrosity', alignment: 'Neutral Evil',
  speed: '30 ft., Swim 40 ft.', physical_damage: 'Piercing', energy_damage: 'Poison',
  stats: { STR: 20, DEX: 12, CON: 18, INT: 6, WIS: 12, CHA: 8 },
  entries: flavorRequests(skeleton).map((r) => ({
    id: r.id, name: `Bog ${r.id}`,
    ...Object.fromEntries(r.slots.map((s) => [s, s === 'kindred_type' ? 'Monstrosity' : 'brackish silt'])),
  })),
});

const run = (opts, llm) => generateFromSkeleton({ concept: 'a swamp ambusher', cr: 9, seed: 7, ...opts }, llm);

describe('generateFromSkeleton', () => {
  test('one flavor call produces a complete monster', async () => {
    const prompts = [];
    const m = await run({}, async (p, v) => {
      prompts.push(p);
      const s = buildSkeleton({ cr: 9, seed: 7, alternatives: 3, archetype: null });
      const out = goodModel(s);
      if (prompts.length === 1) expect(v(out)).toBe(true);
      return out;
    });
    // Exactly ONE call writes the creature. The second is the audit, which
    // only reads the finished block (CR 9 is audit-eligible).
    expect(prompts.filter((p) => /Every number is already fixed/.test(p)).length).toBe(1);
    expect(m.name).toBe('Bogmaw');
    expect(m.sections.Actions.length).toBeGreaterThan(0);
    expect(m.ac).toBeGreaterThan(0);
  });

  test('a failed call still ships a mechanically correct block', async () => {
    // Never-fail generation.
    const m = await run({}, async () => { throw new Error('provider down'); });
    expect(m.name).toBeTruthy();
    expect(m.ac).toBeGreaterThan(0);
    expect(m.sections.Actions.length).toBeGreaterThan(0);
    for (const list of Object.values(m.sections)) {
      for (const e of list) expect(e.text).not.toMatch(/\{[a-z_]+\}/);
    }
  });

  test('the same seed reproduces the same block', async () => {
    const llm = async () => goodModel(buildSkeleton({ cr: 9, seed: 7, alternatives: 3, archetype: null }));
    const a = await run({}, llm);
    const b = await run({}, llm);
    expect(JSON.stringify(a.sections)).toBe(JSON.stringify(b.sections));
    expect(a.generation.seed).toBe(b.generation.seed);
  });

  test('records provenance for every entry', async () => {
    const m = await run({}, async () => goodModel(buildSkeleton({ cr: 9, seed: 7, alternatives: 3, archetype: null })));
    expect(m.generation.path).toBe('skeleton');
    expect(m.generation.derived_from.length).toBeGreaterThan(0);
    // Multiattack traces to the observed band median rather than a creature,
    // since it is a count the engine chose, not an ability it borrowed.
    for (const d of m.generation.derived_from) {
      expect(d).toMatch(/<- (.+ \(CR .+\)|observed median for CR band .+)/);
    }
    expect(m.generation.derived_from.some((d) => /\(CR /.test(d))).toBe(true);
  });

  test('the identity and lore from the resolve call reach the prompt', async () => {
    let seen = '';
    await run({ identity: 'It waits beneath the silt.', lore: 'Born of a drowned shrine.' },
      async (p) => { if (!seen) seen = p; return goodModel(buildSkeleton({ cr: 9, seed: 7, alternatives: 3, archetype: null })); });
    expect(seen).toContain('It waits beneath the silt.');
    expect(seen).toContain('Born of a drowned shrine.');
  });

  test('the archetype steers selection', async () => {
    const m = await run({ archetypeName: 'lurker' },
      async () => goodModel(buildSkeleton({ cr: 9, seed: 7, alternatives: 3, archetype: 'lurker' })));
    expect(m.generation.archetype).toBe('lurker');
  });

  test('lints clean across CRs with a real-ish model', async () => {
    for (const cr of [1, 5, 11, 17, 24]) {
      const m = await generateFromSkeleton({ concept: 'x', cr, seed: 3 },
        async () => goodModel(buildSkeleton({ cr, seed: 3, alternatives: 3, archetype: null })));
      expect(`CR ${cr}: ${m.generation.rejects.join(',')}`).toBe(`CR ${cr}: `);
    }
  });
});

describe('the judgment layer', () => {
  const skeletonFor = (cr) => buildSkeleton({ cr, seed: 7, alternatives: 3, archetype: null });

  test('the audit runs on complex blocks and its notes are recorded', async () => {
    let sawAudit = false;
    const m = await run({}, async (p) => {
      if (/Every number is already fixed/.test(p)) return goodModel(skeletonFor(9));
      sawAudit = true;
      return JSON.stringify({ problems: [] });
    });
    expect(sawAudit).toBe(true);
    expect(Array.isArray(m.generation.audit)).toBe(true);
  });

  test('a broken audit response never breaks the generation', async () => {
    const m = await run({}, async (p) => {
      if (/Every number is already fixed/.test(p)) return goodModel(skeletonFor(9));
      throw new Error('audit provider down');
    });
    expect(m.name).toBe('Bogmaw');
    expect(m.generation.rejects).toEqual([]);
  });

  test('the naming micro-call is not made', async () => {
    // Dropped (owner call): the flavor call already named the creature and
    // every entry with the concept in hand.
    const prompts = [];
    await run({}, async (p) => {
      prompts.push(p);
      return /Every number is already fixed/.test(p) ? goodModel(skeletonFor(9)) : JSON.stringify({ problems: [] });
    });
    expect(prompts.some((p) => /name candidates|Return ONLY JSON.*"names"/i.test(p))).toBe(false);
    expect(prompts.length).toBe(2); // flavor + audit, nothing else
  });

  test('an audit finding swaps the entry instead of rewriting its text', async () => {
    const s = skeletonFor(9);
    const target = s.entries.find((e) => e.options && e.options.length > 1 && e.slot_type !== 'multiattack');
    if (!target) return;
    const before = target.text;
    const m = await run({}, async (p) => {
      if (/Every number is already fixed/.test(p)) return goodModel(s);
      // Name the entry the flavor call gave it, with a verbatim span so the
      // finding survives verification.
      return JSON.stringify({
        problems: [{ entry: `Bog ${target.id}`, issue: 'does not fit', span: before.slice(0, 40) }],
      });
    });
    // Whatever happened, the numbers are still the engine's.
    for (const list of Object.values(m.sections)) {
      for (const e of list) {
        for (const mm of e.text.matchAll(/Attack Roll:\*?\s*\+(\d+)/g)) {
          expect(Number(mm[1])).toBe(s.attack_bonus);
        }
      }
    }
  });
});
