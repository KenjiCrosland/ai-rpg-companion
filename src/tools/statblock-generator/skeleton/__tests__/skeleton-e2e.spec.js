/**
 * The skeleton path end to end: build → flavor → assemble → lint.
 *
 * This is the check that matters. The ~143 lint rules were written against
 * the old chassis pipeline and swept to zero false positives on all 329 SRD
 * blocks, so they are an independent judge of whether the new path produces
 * real 2024 statblocks. It started at 2 clean blocks out of 48.
 *
 * The model is stubbed with fixed flavor: this measures the ENGINE, not the
 * model. Anything failing here fails for every generation.
 */
import { buildSkeleton } from '../build-skeleton.mjs';
import { applyFlavor, flavorRequests, chassisFromSkeleton, planFromSkeleton } from '../flavor-prompt.mjs';
import { assembleMonster } from '../../format-2024/generate.mjs';
import { lintStatblock } from '../../format-2024/lint.mjs';

const GRID = [[2, 'Medium'], [5, 'Large'], [8, 'Large'], [11, 'Huge'],
  [14, 'Large'], [17, 'Huge'], [21, 'Gargantuan'], [27, 'Gargantuan']];
const SEEDS = [1, 2, 3, 4, 5, 6];

/** A well-behaved model: fills every slot it is asked for, nothing more. */
function stubFlavor(skeleton, size) {
  return {
    name: 'Shalefang',
    size,
    type: 'Monstrosity',
    alignment: 'Chaotic Evil',
    speed: '40 ft., Burrow 20 ft.',
    physical_damage: 'Slashing',
    energy_damage: 'Necrotic',
    stats: { STR: 20, DEX: 12, CON: 18, INT: 6, WIS: 12, CHA: 8 },
    entries: flavorRequests(skeleton).map((r) => ({
      id: r.id,
      name: r.placeholder_name,
      ...Object.fromEntries(r.slots.map((s) => [s, s === 'kindred_type' ? 'Monstrosity' : 'churning ash'])),
    })),
  };
}

function build(cr, size, seed, alternatives = 1) {
  const skeleton = buildSkeleton({ cr, size, seed, alternatives });
  const model = applyFlavor(skeleton, stubFlavor(skeleton, size));
  const chassis = chassisFromSkeleton(skeleton);
  const plan = planFromSkeleton(skeleton);
  const monster = assembleMonster(model, { cr, chassis, plan, archetypeName: null });
  return { skeleton, monster, findings: lintStatblock(monster, { chassis, plan, edition: '2024' }).findings };
}

describe('every generated block survives the lint', () => {
  const all = [];
  for (const [cr, size] of GRID) for (const seed of SEEDS) all.push({ cr, size, seed, ...build(cr, size, seed) });

  test('no block is rejected', () => {
    const offenders = all
      .flatMap((b) => b.findings.filter((f) => f.severity === 'reject')
        .map((f) => `CR ${b.cr} seed ${b.seed}: ${f.rule} — ${f.message.slice(0, 90)}`));
    expect(offenders).toEqual([]);
  });

  test('correctable findings stay rare', () => {
    // These get clamped deterministically downstream, so a few are fine; a
    // flood means the skeleton is emitting something systematically off.
    const n = all.reduce((s, b) => s + b.findings.filter((f) => f.severity === 'correctable').length, 0);
    expect(n / all.length).toBeLessThan(0.5);
  });

  test('the assembled monster keeps the skeleton numbers', () => {
    for (const b of all) {
      expect(b.monster.ac).toBe(b.skeleton.ac);
      // HP is deliberately NOT the raw target: assembly stamps the exact
      // average of the hit dice so the printed formula and the printed HP
      // always agree. The drift is one rounding step of a single die.
      const [, n, die, flat] = /(\d+)d(\d+)(?: \+ (\d+))?/.exec(b.monster.hp_formula).map(Number);
      expect(b.monster.hp).toBe(Math.floor((n * (die + 1)) / 2) + (flat || 0));
      expect(Math.abs(b.monster.hp - b.skeleton.hp) / b.skeleton.hp).toBeLessThan(0.12);
    }
  });

  test('every block has a name, a type and at least one action', () => {
    for (const b of all) {
      expect(b.monster.name).toBeTruthy();
      expect(b.monster.type).toBeTruthy();
      expect((b.monster.sections.Actions ?? []).length).toBeGreaterThan(0);
    }
  });
});

describe('with alternatives on offer, every choice still lints clean', () => {
  // The concept picks which mechanic fills a slot. Since the engine scaled
  // and dependency-checked every option, no choice can produce an invalid
  // block — this proves it across the whole grid.
  test('choosing the LAST option everywhere is as valid as the default', () => {
    const offenders = [];
    for (const [cr, size] of GRID) {
      for (const seed of SEEDS) {
        const skeleton = buildSkeleton({ cr, size, seed, alternatives: 3 });
        const stub = stubFlavor(skeleton, size);
        const reqs = flavorRequests(skeleton);
        const model = applyFlavor(skeleton, {
          ...stub,
          entries: reqs.map((r) => ({
            ...stub.entries.find((e) => e.id === r.id),
            choose: r.options.length > 1 ? r.options[r.options.length - 1].key : undefined,
          })),
        });
        const chassis = chassisFromSkeleton(skeleton);
        const plan = planFromSkeleton(skeleton);
        const monster = assembleMonster(model, { cr, chassis, plan, archetypeName: null });
        for (const f of lintStatblock(monster, { chassis, plan, edition: '2024' }).findings) {
          if (f.severity === 'reject') offenders.push(`CR ${cr} seed ${seed}: ${f.rule}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});

describe('a lazy model still produces a valid block', () => {
  // Never-fail generation: a response that fills nothing must degrade to a
  // plain monster, not a broken one.
  test('an empty entries array leaves no unfilled slot and no reject', () => {
    for (const [cr, size] of GRID) {
      const skeleton = buildSkeleton({ cr, size, seed: 3 });
      const model = applyFlavor(skeleton, {
        name: 'Nameless', size, type: 'Monstrosity', alignment: 'Neutral', speed: '30 ft.',
        stats: { STR: 14, DEX: 14, CON: 14, INT: 10, WIS: 10, CHA: 10 }, entries: [],
      });
      const chassis = chassisFromSkeleton(skeleton);
      const plan = planFromSkeleton(skeleton);
      const monster = assembleMonster(model, { cr, chassis, plan, archetypeName: null });
      for (const list of Object.values(monster.sections)) {
        for (const e of list) expect(e.text).not.toMatch(/\{[a-z_]+\}/);
      }
      const rejects = lintStatblock(monster, { chassis, plan, edition: '2024' })
        .findings.filter((f) => f.severity === 'reject');
      expect(`CR ${cr}: ${rejects.map((r) => r.rule).join(',')}`).toBe(`CR ${cr}: `);
    }
  });
});
