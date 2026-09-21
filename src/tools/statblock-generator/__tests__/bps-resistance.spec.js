/**
 * Task 5 (docs/investigations/05-bps-resistance.md): the unqualified
 * Bludgeoning/Piercing/Slashing resistance package must be earned — swarm
 * identity or incorporeal movement — on generated 2024 blocks. Behavioral
 * coverage runs the real lint over the real generated-output fixtures in
 * fixtures/ (the 16-block field-test corpus), not over prompt strings.
 */
import fs from 'fs';
import path from 'path';
import { lintStatblock } from '../format-2024/lint.mjs';

const FIXTURE_DIR = path.resolve(__dirname, '../../../../fixtures');

/** Minimal lint model from a fixture's text block. */
function modelFromFixture(filename) {
  const raw = fs.readFileSync(path.join(FIXTURE_DIR, filename), 'utf8');
  const lines = raw.split('\n');
  // Line 0 is the metadata comment, line 1 the name, line 2 the type line.
  const type = lines[2].split(',')[0].trim();
  const resistances = lines.find((l) => l.startsWith('Resistances '))?.slice('Resistances '.length) ?? null;
  const is2014 = /2014 rules/.test(lines[0]);
  return {
    monster: {
      name: lines[1].trim(),
      type,
      resistances,
      sections: { Traits: [{ name: 'Fixture Text', text: raw }] },
    },
    edition: is2014 ? '2014' : '2024',
  };
}

const bpsFindings = (monster, opts) =>
  lintStatblock(monster, opts).findings.filter((f) => f.rule === 'bps-resistance');

describe('bps-resistance (generated blocks must earn the physical package)', () => {
  const fixtures = fs.readdirSync(FIXTURE_DIR).filter((f) => f.endsWith('.md')).sort();

  test('fixture corpus exists (Step 0)', () => {
    expect(fixtures).toHaveLength(16);
  });

  test('flags exactly the six unqualified B/P/S carriers in the field-test corpus', () => {
    const flagged = fixtures.filter((file) => {
      const { monster, edition } = modelFromFixture(file);
      return bpsFindings(monster, { chassis: { archetype: 'balanced' }, edition }).length > 0;
    });
    expect(flagged).toEqual([
      '03-silent-shard.md',   // Construct
      '04-lasher.md',         // Aberration
      '05-dread-slammer.md',  // Aberration
      '06-mournhaunt.md',     // Fey (B/P/S buried in a longer list)
      '11-whisper-shifter.md',// Elemental
      '12-hollow-shardweaver.md', // Elemental
    ]);
  });

  test('the swarm fixture keeps its package (type-line identity)', () => {
    const { monster, edition } = modelFromFixture('07-skittering-hive.md');
    expect(monster.resistances).toMatch(/Bludgeoning/);
    expect(bpsFindings(monster, { chassis: { archetype: 'balanced' }, edition })).toHaveLength(0);
  });

  test('the fix strips only the physical types, preserving the rest of the line', () => {
    const { monster, edition } = modelFromFixture('06-mournhaunt.md');
    const [finding] = bpsFindings(monster, { chassis: { archetype: 'balanced' }, edition });
    expect(finding.expected).toBe('Cold, Poison, Psychic');
    expect(finding.loc).toEqual({ field: 'resistances' });
  });

  const bpsMonster = (extra = {}) => ({
    name: 'Test Horror',
    type: 'Monstrosity',
    resistances: 'Bludgeoning, Piercing, Slashing',
    sections: { Traits: [{ name: 'Looming', text: 'It looms.' }] },
    ...extra,
  });

  test('swarm ARCHETYPE exempts even without a swarm type line', () => {
    expect(bpsFindings(bpsMonster(), { chassis: { archetype: 'swarm' } })).toHaveLength(0);
  });

  test('an incorporeal-movement trait exempts (ghost pattern)', () => {
    const m = bpsMonster({
      sections: { Traits: [{ name: 'Incorporeal Movement', text: 'The horror can move through other creatures and objects as if they were Difficult Terrain.' }] },
    });
    expect(bpsFindings(m, { chassis: { archetype: 'balanced' } })).toHaveLength(0);
  });

  test('2014 blocks are out of scope (qualified package is legitimate there)', () => {
    expect(bpsFindings(bpsMonster(), { chassis: { archetype: 'balanced' }, edition: '2014' })).toHaveLength(0);
  });

  test('no chassis, no rule — the SRD corpus sweep never sees it', () => {
    expect(bpsFindings(bpsMonster(), {})).toHaveLength(0);
  });

  test('officially-shaped carriers stay legal under the corpus sweep (calibration)', () => {
    // Air Elemental / Tarrasque / Clay Golem all carry unqualified B/P/S in
    // SRD 5.2.1 — the chassis gate is what grandfathers them.
    const tarrasque = bpsMonster({ name: 'Tarrasque', type: 'Monstrosity' });
    expect(bpsFindings(tarrasque, { edition: '2024' })).toHaveLength(0);
  });
});
