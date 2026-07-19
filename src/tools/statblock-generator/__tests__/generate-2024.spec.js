/**
 * 2024 generation pipeline tests — build-order step 5 (categories 1–2 of the
 * confirmed plan). No prompt-string-content assertions: prompts are verified
 * by manual production review; these tests cover assembly, the deterministic
 * solvers, and the correct/reject orchestration with a mocked LLM.
 */
import {
  hpFormulaFor, damageDiceFor, crKeyFor, crNumberFor, buildContext,
  damageBudgetFor, assembleMonster, applyCorrections, generateMonster2024,
  validateGenerationResponse, validateArchetypeResponse, parseGenerationResponse,
  pickRandomArchetype, ARCHETYPE_NAMES,
} from '../format-2024/generate.mjs';
import { lintStatblock, avgDice } from '../format-2024/lint.mjs';

// Well-formed LLM response for a lurker at CR 4 (chassis: hp 59, ac 14,
// attack +7, DC 13, pb 2 — verified in chassis.spec.js).
const llmFixture = {
  name: 'Gloom Stalker',
  size: 'Medium', type: 'Monstrosity', alignment: 'Neutral Evil',
  speed: '40 ft.',
  stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
  save_proficiencies: ['DEX'],
  skill_proficiencies: ['Stealth', 'Perception'],
  senses_special: 'darkvision 60 ft.',
  languages: 'Common',
  sections: {
    Traits: [
      { name: 'Umbral Veil', slot: 'stealth/phasing/invisibility trait', text: 'While in Dim Light or Darkness, the stalker has the Invisible condition.' },
    ],
    Actions: [
      { name: 'Multiattack', text: 'The stalker makes two Shadow Claw attacks.' },
      { name: 'Shadow Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Slashing damage.' },
      { name: 'Ambush Pounce', slot: 'ambush or once-per-fight nova mechanic', text: '*Dexterity Saving Throw*: DC 13, one creature. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.' },
    ],
  },
};

const ctx = () => {
  const { chassis, plan, archetype } = buildContext(4, 'lurker');
  return { cr: 4, chassis, plan, archetypeName: archetype, archetypeSource: 'auto' };
};

// ---------------------------------------------------------------------------
// 1. Deterministic solvers
// ---------------------------------------------------------------------------
describe('hpFormulaFor', () => {
  const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
  const HPS = [1, 3, 9, 21, 59, 104, 178, 333, 507, 697];
  const CON_MODS = [-2, 0, 3, 8];

  test('every formula averages exactly to the requested HP', () => {
    for (const size of SIZES) {
      for (const hp of HPS) {
        for (const conMod of CON_MODS) {
          const formula = hpFormulaFor(hp, size, conMod);
          expect(avgDice(formula)).toBe(hp);
        }
      }
    }
  });

  test('uses the size-appropriate hit die', () => {
    expect(hpFormulaFor(100, 'Gargantuan', 5)).toMatch(/d20/);
    expect(hpFormulaFor(10, 'Tiny', 0)).toMatch(/d4/);
  });
});

describe('damageDiceFor', () => {
  test('every expression averages exactly to the requested damage', () => {
    for (let avg = 1; avg <= 100; avg++) {
      expect(avgDice(damageDiceFor(avg))).toBe(avg);
    }
  });
});

describe('CR key mapping', () => {
  test.each([
    [0, '0'], [0.125, '1/8'], [0.25, '1/4'], [0.5, '1/2'], [4, '4'], [30, '30'],
  ])('%p ↔ %s round-trips', (num, str) => {
    expect(crKeyFor(num)).toBe(str);
    expect(crNumberFor(str)).toBe(num);
  });
});

describe('damageBudgetFor', () => {
  test('splits the budget across required multiattack count', () => {
    const { chassis, plan } = buildContext(4, 'lurker'); // tier 3: x2 required
    const budget = damageBudgetFor(4, chassis, plan);
    expect(budget.attacks).toBe(2);
    expect(budget.perAttack).toBe(Math.max(1, Math.round(budget.total / 2)));
  });

  test('single attack at tier 1', () => {
    const { chassis, plan } = buildContext(0.25, null);
    expect(damageBudgetFor(0.25, chassis, plan).attacks).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// 1b. Assembly stamps engine numbers
// ---------------------------------------------------------------------------
describe('assembleMonster', () => {
  const monster = assembleMonster(llmFixture, ctx());

  test('engine numbers come from the chassis, never the LLM', () => {
    const { chassis } = buildContext(4, 'lurker');
    expect(monster.ac).toBe(chassis.ac);
    expect(monster.hp).toBe(chassis.hp);
    expect(monster.pb).toBe(chassis.pb);
    expect(monster.cr).toBe(4);
    expect(monster.cr_str).toBe('4');
    expect(monster.xp).toBe(1100);
    expect(avgDice(monster.hp_formula)).toBe(chassis.hp);
  });

  test('derived numbers computed from LLM ability scores', () => {
    expect(monster.initiative_bonus).toBe(3); // DEX 16
    expect(monster.initiative_score).toBe(13);
    expect(monster.saves.DEX).toBe(5); // mod 3 + pb 2 (proficient)
    expect(monster.saves.STR).toBe(1); // mod only
    expect(monster.skills).toBe('Stealth +5, Perception +4');
    expect(monster.senses).toBe('darkvision 60 ft.; Passive Perception 14');
  });

  test('format, archetype, and folder-compat fields are stamped', () => {
    expect(monster.format).toBe('2024');
    expect(monster.archetype).toBe('lurker');
    expect(monster.archetype_source).toBe('auto');
    expect(monster.challenge_rating).toBe('4 (XP 1,100; PB +2)');
  });

  test('a well-formed response assembles into a lint-clean block', () => {
    const { chassis, plan } = buildContext(4, 'lurker');
    expect(lintStatblock(monster, { chassis, plan })).toEqual({ ok: true, findings: [] });
  });

  test('legendary_uses stamped when a Legendary Actions section exists', () => {
    const withLegendary = assembleMonster(
      {
        ...llmFixture,
        sections: {
          ...llmFixture.sections,
          'Legendary Actions': [{ name: 'Lash', text: 'It lashes out.' }],
        },
      },
      ctx()
    );
    expect(withLegendary.legendary_uses).toBe(3);
    expect(monster.legendary_uses).toBeUndefined(); // none without the section
  });

  test('out-of-range ability scores are clamped', () => {
    const wild = assembleMonster(
      { ...llmFixture, stats: { ...llmFixture.stats, STR: 45, CHA: -3 } },
      ctx()
    );
    expect(wild.stats.STR).toBe(30);
    expect(wild.stats.CHA).toBe(1);
  });
});

describe('validateGenerationResponse', () => {
  test('accepts a valid response, with or without markdown fences', () => {
    const raw = JSON.stringify(llmFixture);
    expect(validateGenerationResponse(raw)).toBe(true);
    expect(validateGenerationResponse('```json\n' + raw + '\n```')).toBe(true);
  });

  test('rejects missing stats or empty Actions', () => {
    expect(validateGenerationResponse('not json')).toBe(false);
    expect(validateGenerationResponse(JSON.stringify({ ...llmFixture, stats: undefined }))).toBe(false);
    expect(validateGenerationResponse(JSON.stringify({
      ...llmFixture, sections: { Traits: llmFixture.sections.Traits },
    }))).toBe(false);
  });
});

describe('concept seeds', () => {
  const { buildRandomConceptSeed, SEED_DIMENSIONS } = require('../format-2024/concept-seeds.mjs');

  test('samples one option per dimension and composes them into the concept', () => {
    for (let i = 0; i < 25; i++) {
      const seed = buildRandomConceptSeed();
      for (const [dim, options] of Object.entries(SEED_DIMENSIONS)) {
        expect(options).toContain(seed[dim]);
        expect(seed.concept).toContain(seed[dim]);
      }
      expect(seed.concept).toContain('contradictions between traits are creative fuel');
    }
  });

  test('dimensions are independently sampled (two seeds rarely identical)', () => {
    const seen = new Set();
    for (let i = 0; i < 40; i++) seen.add(buildRandomConceptSeed().concept);
    expect(seen.size).toBeGreaterThan(30);
  });
});

describe('seed leakage', () => {
  const { seedLeakTokens } = require('../format-2024/concept-seeds.mjs');
  const { lintStatblock } = require('../format-2024/lint.mjs');
  const driftkingSeed = {
    intelligence: 'possessed of alien genius (INT 17-20)',
    physical: 'molten-veined',
    silhouette: 'floating drifting form',
    origin: 'a city of graves',
    naming: 'a single stark word: one short, heavy name',
  };

  test('seedLeakTokens extracts stemmed content words, not stopwords or the naming register', () => {
    const tokens = seedLeakTokens(driftkingSeed);
    for (const t of ['alien', 'genius', 'molten', 'vein', 'float', 'drift', 'grave']) {
      expect(tokens).toContain(t);
    }
    for (const t of ['form', 'from', 'of', 'int', 'stark', 'word']) {
      expect(tokens).not.toContain(t);
    }
  });

  test('the live Driftking failure is caught: seed words in name and ability names', () => {
    const tokens = seedLeakTokens(driftkingSeed);
    const leaky = {
      name: 'Driftking',
      stats: llmFixture.stats,
      pb: 3,
      sections: {
        Traits: [
          { name: 'Alien Genius', text: 'It thinks strange thoughts.' },
          { name: 'Molten Veins', text: 'It burns to the touch.' },
        ],
        Actions: [{ name: 'Void Pulse', text: 'It pulses.' }],
      },
    };
    const findings = lintStatblock(leaky, { seedTokens: tokens }).findings
      .filter((f) => f.rule === 'seed-leakage');
    expect(findings.length).toBeGreaterThanOrEqual(3); // Driftking, Alien Genius, Molten Veins
    expect(findings.every((f) => f.severity === 'reject')).toBe(true);
    // Without seed tokens (user-typed concepts) the rule never runs.
    expect(lintStatblock(leaky, {}).findings.filter((f) => f.rule === 'seed-leakage')).toHaveLength(0);
  });

  test('leaky names get a targeted rename fix call, not a full regeneration', async () => {
    const leaky = JSON.parse(JSON.stringify(llmFixture));
    leaky.name = 'Shadow Drifter'; // leaks 'drift'
    leaky.sections.Actions[0].text = 'The stalker makes two Drift Claw attacks.';
    leaky.sections.Actions[1].name = 'Drift Claw'; // leaks in an entry name too
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(leaky))
      .mockResolvedValueOnce(JSON.stringify({ 'Shadow Drifter': 'Gloom Stalker', 'Drift Claw': 'Night Talon' }));
    const monster = await generateMonster2024(
      {
        concept: 'seeded', cr: 4, archetypeName: 'lurker', archetypeSource: 'auto',
        seedTraits: { silhouette: 'floating drifting form' },
      },
      callLLM,
    );
    // Call 1 = generation, call 2 = the cheap rename fix — never a re-roll.
    expect(callLLM).toHaveBeenCalledTimes(2);
    expect(callLLM.mock.calls[1][1]).toBe(require('../format-2024/generate.mjs').validateRenameResponse);
    expect(monster.name).toBe('Gloom Stalker');
    const actionNames = monster.sections.Actions.map((e) => e.name);
    expect(actionNames).toContain('Night Talon');
    // Cross-references follow the rename — Multiattack can't orphan.
    expect(monster.sections.Actions[0].text).toContain('Night Talon');
    expect(monster.concept_seed).toEqual({ silhouette: 'floating drifting form' });
  });

  test('a fix call that still leaks gets one more, then errors', async () => {
    const leaky = JSON.parse(JSON.stringify(llmFixture));
    leaky.name = 'Shadow Drifter';
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(leaky))
      .mockResolvedValueOnce(JSON.stringify({ 'Shadow Drifter': 'Drifting Shade' })) // still leaks
      .mockResolvedValueOnce(JSON.stringify({ 'Drifting Shade': 'Drift Wraith' })); // stubborn
    await expect(generateMonster2024(
      {
        concept: 'seeded', cr: 4, archetypeName: 'lurker', archetypeSource: 'auto',
        seedTraits: { silhouette: 'floating drifting form' },
      },
      callLLM,
    )).rejects.toThrow(/seed word/);
    expect(callLLM).toHaveBeenCalledTimes(3); // generation + two fix attempts
  });
});

describe('archetype resolve helpers', () => {
  test('validateArchetypeResponse accepts the eight archetypes only', () => {
    expect(validateArchetypeResponse('{"archetype": "lurker"}')).toBe(true);
    expect(validateArchetypeResponse('{"archetype": "tank"}')).toBe(false);
    expect(validateArchetypeResponse('nope')).toBe(false);
  });

  test('pickRandomArchetype returns a real archetype', () => {
    for (let i = 0; i < 20; i++) {
      expect(ARCHETYPE_NAMES).toContain(pickRandomArchetype());
    }
  });
});

// ---------------------------------------------------------------------------
// 2. Corrections and orchestration
// ---------------------------------------------------------------------------
describe('applyCorrections', () => {
  test('strips 2014 nonmagical qualifiers from resistance fields', () => {
    const { chassis, plan } = buildContext(4, 'lurker');
    const dated = assembleMonster(
      { ...llmFixture, resistances: 'Bludgeoning, Piercing, Slashing from nonmagical attacks' },
      ctx()
    );
    const findings = lintStatblock(dated, { chassis, plan }).findings;
    const fixed = applyCorrections(dated, findings, { chassis });
    expect(fixed.resistances).toBe('Bludgeoning, Piercing, Slashing');
    expect(lintStatblock(fixed, { chassis, plan }).ok).toBe(true);
  });

  test('rewrites damage averages that disagree with their own dice', () => {
    const { chassis, plan } = buildContext(4, 'lurker');
    const drifted = assembleMonster(JSON.parse(JSON.stringify(llmFixture)), ctx());
    drifted.sections.Actions[2].text =
      '*Dexterity Saving Throw*: DC 13, one creature. *Failure:* 25 (6d6) Psychic damage. *Success:* Half damage.';
    const findings = lintStatblock(drifted, { chassis, plan }).findings;
    const fixed = applyCorrections(drifted, findings, { chassis });
    expect(fixed.sections.Actions[2].text).toContain('21 (6d6)'); // 6d6 averages 21
    expect(lintStatblock(fixed, { chassis, plan }).ok).toBe(true);
  });

  test('clamps out-of-band attack and DC numbers in section texts', () => {
    const { chassis, plan } = buildContext(4, 'lurker');
    const hot = assembleMonster(JSON.parse(JSON.stringify(llmFixture)), ctx());
    hot.sections.Actions[1].text = '*Melee Attack Roll:* +11, reach 5 ft. 13 (2d8 + 4) Slashing damage.';
    hot.sections.Actions[2].text = '*Dexterity Saving Throw*: DC 19, one creature. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.';
    const findings = lintStatblock(hot, { chassis, plan }).findings;
    const fixed = applyCorrections(hot, findings, { chassis });
    expect(fixed.sections.Actions[1].text).toContain('+7');
    expect(fixed.sections.Actions[2].text).toContain('DC 13');
    expect(lintStatblock(fixed, { chassis, plan }).ok).toBe(true);
  });
});

describe('generateMonster2024 orchestration', () => {
  const options = {
    concept: 'a shadow stalker', cr: 4, archetypeName: 'lurker',
    caster: false, archetypeSource: 'auto',
  };

  test('returns an assembled, lint-clean monster on a good first response', async () => {
    const callLLM = jest.fn().mockResolvedValue(JSON.stringify(llmFixture));
    const monster = await generateMonster2024(options, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(1);
    expect(monster.name).toBe('Gloom Stalker');
    expect(monster.format).toBe('2024');
  });

  test('under-budget attack damage is clamped to the skeleton, zero extra calls', async () => {
    // The fixture's Shadow Claw swings 13 against a lurker CR 4 per-attack
    // budget of 9 — the live Lysilyth failure class (half-CR offense).
    const callLLM = jest.fn().mockResolvedValue(JSON.stringify(llmFixture));
    const monster = await generateMonster2024(options, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(1);
    expect(monster.sections.Actions[1].text).toContain('9 (2d8)');
    expect(monster.sections.Actions[1].text).not.toContain('13 (2d8 + 4)');
  });

  test('deterministically fixable rejects (caps, to-hit, second person) cost zero extra calls', async () => {
    const messy = JSON.parse(JSON.stringify(llmFixture));
    messy.sections.Actions[1].text =
      "*Melee Attack Roll:* +7 to hit, reach 5 ft. 13 (2d8 + 4) Slashing damage, and the target is knocked prone and can't regain hit points. It then moves toward a creature of your choice without provoking opportunity attacks.";
    const callLLM = jest.fn().mockResolvedValue(JSON.stringify(messy));
    const monster = await generateMonster2024(options, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(1); // string surgery, no fix call
    const text = monster.sections.Actions[1].text;
    expect(text).not.toContain('to hit');
    expect(text).toContain('Prone');
    expect(text).toContain('Hit Points');
    expect(text).toContain('Opportunity Attacks');
    expect(text).toContain('its choice');
  });

  test('correctable violations are fixed without a retry call', async () => {
    const hot = JSON.parse(JSON.stringify(llmFixture));
    hot.sections.Actions[1].text = '*Melee Attack Roll:* +11, reach 5 ft. 13 (2d8 + 4) Slashing damage.';
    const callLLM = jest.fn().mockResolvedValue(JSON.stringify(hot));
    const monster = await generateMonster2024(options, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(1);
    expect(monster.sections.Actions[1].text).toContain('+7');
  });

  test('reject violations trigger exactly one regeneration', async () => {
    const broken = JSON.parse(JSON.stringify(llmFixture));
    delete broken.sections.Actions[2].slot; // missing required nova slot → reject
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(broken))
      .mockResolvedValueOnce(JSON.stringify(llmFixture));
    const monster = await generateMonster2024(options, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(2);
    expect(monster.name).toBe('Gloom Stalker');
  });

  test('throws when the retry also fails validation', async () => {
    const broken = JSON.parse(JSON.stringify(llmFixture));
    delete broken.sections.Actions[2].slot;
    const callLLM = jest.fn().mockResolvedValue(JSON.stringify(broken));
    await expect(generateMonster2024(options, callLLM)).rejects.toThrow(/failed validation/);
    expect(callLLM).toHaveBeenCalledTimes(2);
  });

  test('throws on an empty response', async () => {
    const callLLM = jest.fn().mockResolvedValue(null);
    await expect(generateMonster2024(options, callLLM)).rejects.toThrow(/Empty or malformed/);
  });
});
