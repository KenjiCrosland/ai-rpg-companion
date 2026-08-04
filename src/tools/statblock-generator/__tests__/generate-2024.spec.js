/**
 * 2024 generation pipeline tests — build-order step 5 (categories 1–2 of the
 * confirmed plan). No prompt-string-content assertions: prompts are verified
 * by manual production review; these tests cover assembly, the deterministic
 * solvers, and the correct/reject orchestration with a mocked LLM.
 */
import {
  hpFormulaFor, attackDamageDiceFor, saveDamageDiceFor, attackStatFor,
  crKeyFor, crNumberFor, buildContext,
  damageBudgetFor, assembleMonster, applyCorrections, generateMonster2024,
  validateGenerationResponse, validateArchetypeResponse, parseGenerationResponse,
  pickRandomArchetype, ARCHETYPE_NAMES,
} from '../format-2024/generate.mjs';
import { lintStatblock, avgDice } from '../format-2024/lint.mjs';


// These exercise the CHASSIS path, which 2024 no longer uses by default
// (owner call, 2026-08-02) but which is still reachable: 2014 generation,
// seeded random-trait generation, and localStorage['statblock-skeleton']='0'.
// Opt in explicitly so the suite keeps testing what it was written for.
beforeEach(() => localStorage.setItem('statblock-skeleton', '0'));
afterEach(() => localStorage.removeItem('statblock-skeleton'));

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
      { name: 'Shadow Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' },
      { name: 'Ambush Pounce', slot: 'ambush or once-per-fight nova mechanic', text: '*Dexterity Saving Throw*: DC 13, one creature within 60 feet. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.' },
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
  const DIE = { Tiny: 4, Small: 6, Medium: 8, Large: 10, Huge: 12, Gargantuan: 20 };
  const HPS = [1, 3, 9, 21, 59, 104, 178, 333, 507, 697];
  const CON_MODS = [-2, 0, 3, 8];

  test('flat bonus is EXACTLY dice-count × CON mod; average lands near the target', () => {
    // The grognard construction rule: "17d10 + 69" with CON +4 is a tell —
    // the bonus must be a clean multiple of the dice count. The caller
    // stamps the formula's own average as HP, so exactness moved there.
    for (const [size, die] of Object.entries(DIE)) {
      for (const hp of HPS) {
        for (const conMod of CON_MODS) {
          const formula = hpFormulaFor(hp, size, conMod);
          const m = /^(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?$/.exec(formula);
          const n = Number(m[1]);
          const bonus = m[3] ? (m[3] === '-' ? -1 : 1) * Number(m[4]) : 0;
          expect(Number(m[2])).toBe(die);
          expect(bonus).toBe(n * conMod);
          // Within one die-step of the chassis target (the HP band absorbs it).
          expect(Math.abs(avgDice(formula) - hp)).toBeLessThanOrEqual((die + 1) / 2 + Math.abs(conMod) + 1);
        }
      }
    }
  });

  test('uses the size-appropriate hit die', () => {
    expect(hpFormulaFor(100, 'Gargantuan', 5)).toMatch(/d20/);
    expect(hpFormulaFor(10, 'Tiny', 0)).toMatch(/d4/);
  });
});

describe('damage dice solvers', () => {
  test('attack damage carries EXACTLY the ability mod as its flat bonus', () => {
    for (let avg = 1; avg <= 60; avg++) {
      for (const mod of [0, 2, 5, 10]) {
        if (mod > avg) continue;
        const { dice, avg: actual } = attackDamageDiceFor(avg, mod);
        expect(avgDice(dice)).toBe(actual); // self-consistent
        if (mod === 0) expect(dice).not.toMatch(/[+-]/);
        else expect(dice.endsWith(`+ ${mod}`)).toBe(true);
        expect(Math.abs(actual - avg)).toBeLessThanOrEqual(4); // ±1 larger-die preference
      }
    }
  });

  test('save-effect damage is pure dice, no flat bonus (SRD convention)', () => {
    for (let avg = 1; avg <= 100; avg++) {
      const { dice, avg: actual } = saveDamageDiceFor(avg);
      expect(dice).not.toMatch(/[+-]/);
      expect(avgDice(dice)).toBe(actual);
      expect(Math.abs(actual - avg)).toBeLessThanOrEqual(4);
    }
  });

  test('save dice climb to bigger dice at scale instead of ballooning counts', () => {
    // Live finding: "311 (89d6)" — officials top out at 26 dice.
    expect(saveDamageDiceFor(21).dice).toBe('6d6'); // canonical handfuls stay
    expect(saveDamageDiceFor(156).dice).toBe('24d12');
    expect(saveDamageDiceFor(311).dice).toBe('48d12');
    for (let avg = 10; avg <= 170; avg += 7) {
      const n = Number(/^(\d+)d/.exec(saveDamageDiceFor(avg).dice)[1]);
      expect(n).toBeLessThanOrEqual(27); // corpus ceiling is 26
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

  // docs/investigations/08: legendary-bearing tiers discount the routine turn
  // to ~0.6× so routine + legendary lands in band (officials build routine at
  // ~0.55× mid). Optional-legendary and non-legendary tiers keep full routine.
  test('applies the 0.6 routine discount at required/recommended legendary tiers', () => {
    for (const cr of [14, 21]) { // recommended, required
      const { chassis, plan } = buildContext(cr, null);
      expect(['recommended', 'required']).toContain(plan.legendary.status);
      const raw = damageBudgetFor(cr, { ...chassis, damage_mult: chassis.damage_mult ?? 1 }, {
        ...plan, legendary: { ...plan.legendary, status: 'optional' },
      }).total;
      const discounted = damageBudgetFor(cr, chassis, plan).total;
      expect(discounted).toBeLessThan(raw);
      expect(discounted / raw).toBeCloseTo(0.6, 1);
    }
  });

  test('does NOT discount a non-legendary (optional) tier', () => {
    const cr = 10;
    const { chassis, plan } = buildContext(cr, null);
    expect(plan.legendary.status).toBe('optional');
    // Full routine = midpoint × damage_mult, no discount at this tier.
    const withStatus = (status) => damageBudgetFor(cr, chassis, { ...plan, legendary: { ...plan.legendary, status } }).total;
    expect(withStatus('optional')).toBe(withStatus('forbidden'));
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
    // HP follows the CON-coherent formula exactly (chassis 59 → 11d8 + 11
    // with CON +1 averages 60); the formula's bonus is dice × CON mod.
    expect(monster.hp_formula).toBe('11d8 + 11');
    expect(monster.hp).toBe(60);
    expect(avgDice(monster.hp_formula)).toBe(monster.hp);
    expect(monster.pb).toBe(chassis.pb);
    expect(monster.cr).toBe(4);
    expect(monster.cr_str).toBe('4');
    expect(monster.xp).toBe(1100);
  });

  test('the striker stat is raised so attack bonus = mod + PB (raise-only, caster-aware)', () => {
    // Lurker CR 4: attack +7, PB +2 → required mod +5. Fixture DEX 16 → 20.
    expect(monster.stats.DEX).toBe(20);
    // Mental striker: INT is the peak stat, so INT rises and DEX is left alone.
    const wizard = assembleMonster(
      { ...llmFixture, stats: { STR: 8, DEX: 12, CON: 12, INT: 17, WIS: 10, CHA: 10 } }, ctx());
    expect(wizard.stats.INT).toBe(20);
    expect(wizard.stats.DEX).toBe(12); // untouched — the attack rides INT
    // Raise-only: exceeding the required mod is officially sanctioned
    // (Will-o'-Wisp DEX 28, attack +4) — never lower a stat.
    const nimble = assembleMonster(
      { ...llmFixture, stats: { ...llmFixture.stats, DEX: 24 } }, ctx());
    expect(nimble.stats.DEX).toBe(24);
    expect(attackStatFor({ STR: 18, DEX: 14, CON: 20, INT: 8, WIS: 8, CHA: 8 })).toBe('STR');
    expect(attackStatFor({ STR: 8, DEX: 14, CON: 20, INT: 8, WIS: 8, CHA: 16 })).toBe('CHA');
  });

  test('derived numbers computed from (stamped) ability scores', () => {
    expect(monster.initiative_bonus).toBe(5); // DEX raised to 20
    expect(monster.initiative_score).toBe(15);
    expect(monster.saves.DEX).toBe(7); // mod 5 + pb 2 (proficient)
    expect(monster.saves.STR).toBe(1); // mod only
    expect(monster.skills).toBe('Stealth +7, Perception +4');
    expect(monster.senses).toBe('darkvision 60 ft.; Passive Perception 14');
  });

  test('conditions listed as resistances move to immunities (field-run finding)', () => {
    const m = { name: 'Test', resistances: 'Fire, Charmed, Frightened', immunities: 'Poison; Poisoned', sections: {} };
    const { chassis } = buildContext(4, 'lurker');
    const out = applyCorrections(m, lintStatblock(m, {}).findings, { chassis });
    expect(out.resistances).toBe('Fire');
    expect(out.immunities).toBe('Poison; Poisoned, Charmed, Frightened');
  });

  test('entry names lose leading articles ("The Unstable" → "Unstable")', () => {
    const withArticle = JSON.parse(JSON.stringify(llmFixture));
    withArticle.sections.Traits.push({ name: 'The Unstable', text: 'It can move through a space as narrow as 1 inch without squeezing.' });
    const m = assembleMonster(withArticle, ctx());
    expect(m.sections.Traits.map((e) => e.name)).toContain('Unstable');
    expect(m.sections.Traits.map((e) => e.name)).not.toContain('The Unstable');
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

  test('zero-damage riders are stripped at assembly', () => {
    const belcher = JSON.parse(JSON.stringify(llmFixture));
    belcher.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage plus 0 fire damage.';
    const monster = assembleMonster(belcher, ctx());
    expect(monster.sections.Actions[1].text).toBe('*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.');
  });

  test('leading articles are stripped and names Title Cased', () => {
    const theNamed = assembleMonster({ ...llmFixture, name: 'The Hanging Shroud' }, ctx());
    expect(theNamed.name).toBe('Hanging Shroud');
    const lower = assembleMonster({ ...llmFixture, name: 'thorn crawler' }, ctx());
    expect(lower.name).toBe('Thorn Crawler');
    const titled = assembleMonster({ ...llmFixture, name: 'the excavator of the deep' }, ctx());
    expect(titled.name).toBe('Excavator of the Deep');
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
      .mockResolvedValueOnce(JSON.stringify({ findings: [] })) // audit (gate opened)
      .mockResolvedValueOnce(JSON.stringify({ 'Shadow Drifter': 'Gloom Stalker', 'Drift Claw': 'Night Talon' }));
    const monster = await generateMonster2024(
      {
        concept: 'seeded', cr: 4, archetypeName: 'lurker', archetypeSource: 'auto',
        seedTraits: { silhouette: 'floating drifting form' },
      },
      callLLM,
    );
    // Call 1 = generation, 2 = audit, 3 = rename fix, 4 = naming pass
    // (mock exhausted → provisional name kept) — never a full re-roll.
    expect(callLLM).toHaveBeenCalledTimes(4);
    expect(callLLM.mock.calls[2][1]).toBe(require('../format-2024/generate.mjs').validateRenameResponse);
    expect(monster.name).toBe('Gloom Stalker');
    const actionNames = monster.sections.Actions.map((e) => e.name);
    expect(actionNames).toContain('Night Talon');
    // Cross-references follow the rename — Multiattack can't orphan.
    expect(monster.sections.Actions[0].text).toContain('Night Talon');
    expect(monster.concept_seed).toEqual({ silhouette: 'floating drifting form' });
  });

  test('renames follow short-form self-references ("the burrower")', async () => {
    const leaky = JSON.parse(JSON.stringify(llmFixture));
    leaky.name = 'Drifter of the Deep'; // leaks 'drift'
    leaky.sections.Traits[0].text = 'While in dim light or darkness, the drifter is invisible. The drifter hungers.';
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(leaky))
      .mockResolvedValueOnce(JSON.stringify({ findings: [] })) // audit (gate opened)
      .mockResolvedValueOnce(JSON.stringify({ 'Drifter of the Deep': 'Excavator of the Deep' }));
    const monster = await generateMonster2024(
      {
        concept: 'seeded', cr: 4, archetypeName: 'lurker', archetypeSource: 'auto',
        seedTraits: { silhouette: 'floating drifting form' },
      },
      callLLM,
    );
    expect(callLLM).toHaveBeenCalledTimes(4); // + audit + naming pass (exhausted)
    expect(monster.name).toBe('Excavator of the Deep');
    // (capital Invisible: the condition-caps deterministic fix also ran)
    expect(monster.sections.Traits[0].text).toContain('the excavator is Invisible');
    expect(monster.sections.Traits[0].text).not.toContain('drifter');
  });

  test('a fix call that still leaks gets one more, then errors', async () => {
    const leaky = JSON.parse(JSON.stringify(llmFixture));
    leaky.name = 'Shadow Drifter';
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(leaky))
      .mockResolvedValueOnce(JSON.stringify({ findings: [] })) // audit (gate opened)
      .mockResolvedValueOnce(JSON.stringify({ 'Shadow Drifter': 'Drifting Shade' })) // still leaks
      .mockResolvedValueOnce(JSON.stringify({ 'Drifting Shade': 'Drift Wraith' })); // stubborn
    // Stubborn leakage is a STYLE wart: one rename attempt, then the block
    // SHIPS as-is — cosmetic leftovers never earn extra fix rounds.
    const monster = await generateMonster2024(
      {
        concept: 'seeded', cr: 4, archetypeName: 'lurker', archetypeSource: 'auto',
        seedTraits: { silhouette: 'floating drifting form' },
      },
      callLLM,
    );
    expect(callLLM).toHaveBeenCalledTimes(4); // generation + audit + ONE fix + naming pass
    expect(monster.name).toBe('Drifting Shade'); // first rename attempt kept
  });
});

describe('defense caps', () => {
  const { defenseBudgetFor } = require('../format-2024/generate.mjs');
  const { lintStatblock } = require('../format-2024/lint.mjs');

  test('point budgets follow the CR tiers with archetype adjustments', () => {
    expect(defenseBudgetFor(4, null)).toEqual({ points: 1 });
    expect(defenseBudgetFor(10, null)).toEqual({ points: 4 });
    expect(defenseBudgetFor(20, null)).toEqual({ points: 5 });
    expect(defenseBudgetFor(28, null)).toEqual({ points: 8 });
    expect(defenseBudgetFor(10, 'defender')).toEqual({ points: 7 });
    expect(defenseBudgetFor(4, 'swarm')).toEqual({ points: 4 }); // covers the BPS package
    // Fragile-by-design archetypes can't buy their durability back.
    expect(defenseBudgetFor(10, 'artillery')).toEqual({ points: 2 });
    expect(defenseBudgetFor(4, 'lurker')).toEqual({ points: 0 });
    expect(defenseBudgetFor(10, 'brute')).toEqual({ points: 4 }); // hp_mult already prices it
  });

  test('weighted trim: cheap types survive, immunities spend first, conditions ride free', () => {
    const stacked = {
      name: 'Tank', stats: llmFixture.stats, pb: 2,
      // costs: Poison immunity 1 → budget gone; Psychic ¼ fits nothing after?
      resistances: 'Psychic, Fire, Cold',
      immunities: 'Poison; Charmed, Frightened',
      sections: { Actions: [{ name: 'Slam', text: 'It slams.' }] },
    };
    // Budget 1.5: Poison immunity (0.5×2=1) kept, Psychic resist (0.25) kept,
    // Fire (1) too expensive, Cold (0.5) too expensive after psychic.
    const findings = lintStatblock(stacked, { defenseCaps: { points: 1.5 } }).findings
      .filter((f) => f.rule === 'defense-count');
    expect(findings).toHaveLength(1); // immunities fit untouched; only resistances trimmed
    expect(findings[0].loc.field).toBe('resistances');
    expect(findings[0].expected).toBe('Psychic');
  });

  test('type freebies and self-dealt types ride free', () => {
    // Undead lurker at ZERO budget keeps poison immunity (type canon) and
    // necrotic resistance (it deals necrotic itself); fire still trims.
    const wraith = {
      name: 'Wraith', type: 'Undead', stats: llmFixture.stats, pb: 2,
      resistances: 'Necrotic, Fire',
      immunities: 'Poison; Poisoned',
      sections: {
        Actions: [{ name: 'Grave Touch', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Necrotic damage.' }],
      },
    };
    const findings = lintStatblock(wraith, { defenseCaps: { points: 0 } }).findings
      .filter((f) => f.rule === 'defense-count');
    expect(findings).toHaveLength(1);
    expect(findings[0].loc.field).toBe('resistances');
    expect(findings[0].expected).toBe('Necrotic'); // fire trimmed, necrotic free
    // Immunities untouched: poison is undead canon.
  });

  test('material principle: an ice-bodied creature resists cold free (the Hushspike case)', () => {
    // Deals only slashing/piercing — no "cold damage" text anywhere — but
    // its body is ice, so cold resistance rides free even at zero budget.
    const hushspike = {
      name: 'Hushspike', type: 'Monstrosity', stats: llmFixture.stats, pb: 2,
      resistances: 'Cold, Fire',
      sections: {
        Traits: [{ name: 'Frozen Stillness', text: 'It appears as a patch of translucent ice.' }],
        Actions: [{ name: 'Ice Claw', text: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 7 (1d8 + 3) slashing damage.' }],
      },
    };
    const findings = lintStatblock(hushspike, { defenseCaps: { points: 0 } }).findings
      .filter((f) => f.rule === 'defense-count');
    expect(findings).toHaveLength(1);
    expect(findings[0].expected).toBe('Cold'); // fire trimmed, cold free via material
  });

  test('pipeline trims stacked defenses within the weighted budget', async () => {
    const greedy = JSON.parse(JSON.stringify(llmFixture));
    greedy.resistances = 'Fire, Cold, Psychic';
    greedy.immunities = 'Poison; Poisoned';
    const callLLM = jest.fn().mockResolvedValue(JSON.stringify(greedy));
    const monster = await generateMonster2024(
      { concept: 'a shadow stalker', cr: 4, archetypeName: 'lurker', archetypeSource: 'user' },
      callLLM,
    );
    expect(callLLM).toHaveBeenCalledTimes(2); // deterministic trim + audit, no fix call
    // Lurker CR 4 budget is ZERO (fragile-by-design archetypes can't buy
    // durability back): fire and cold trim, the poison immunity trims
    // (monstrosities get no poison canon) — but Psychic survives free
    // because the fixture's own Ambush Pounce deals psychic damage.
    expect(monster.immunities).toBe('Poisoned');
    expect(monster.resistances).toBe('Psychic');
  });
});

describe('naming pass', () => {
  const { pickName, validateNamingResponse, buildNamingPrompt, validateRenameResponse } = require('../format-2024/generate.mjs');

  test('pickName rejects bathos words (comedic/diminutive register)', () => {
    // Live finding: "Slinky Boulder" — sibilant phonetics satisfied by a toy
    // word. The taste filter is deterministic, not hoped-for.
    expect(pickName(['Slinky Boulder', 'Squishy Horror King', 'Gloom Warden'], {})).toBe('Gloom Warden');
    expect(pickName(['Bouncy Doom'], {})).toBe(null);
  });

  test('pickName strips leading articles instead of rejecting', () => {
    expect(pickName(['The Silent Clinger'], {})).toBe('Silent Clinger');
  });

  test('pickName takes the first candidate surviving every filter', () => {
    const candidates = [
      'Shard-Crawler',        // hyphen
      'Silent Terror',        // menace as HEAD noun
      'Aboleth',              // SRD collision
      'Drift Maw',            // seed leak
      'The Long Name Of Many Words', // > 3 words
      'Quietmaw',             // survivor
      'Bogtorch',
    ];
    expect(pickName(candidates, { seedTokens: ['drift'], register: 'a folk name' })).toBe('Quietmaw');
  });

  test('menace words are positional: banned as head noun, fine as modifier', () => {
    expect(pickName(['Dread Bellringer'], {})).toBe('Dread Bellringer');
    expect(pickName(['Bellringer of Dread'], {})).toBeNull();
  });

  test('coinage registers demand single short words', () => {
    expect(pickName(['Grave Whisper', 'Lysilythian', 'Vurk'], { register: 'an alien-tongue coinage' })).toBe('Vurk');
  });

  test('all candidates failing returns null (provisional name stands)', () => {
    expect(pickName(['Bad-One', 'Silent Doom'], {})).toBeNull();
  });

  test('validateNamingResponse requires 3+ non-empty candidates', () => {
    expect(validateNamingResponse(JSON.stringify({ candidates: ['A', 'B', 'C'] }))).toBe(true);
    expect(validateNamingResponse(JSON.stringify({ candidates: ['A', ''] }))).toBe(false);
  });

  test('a provisional name that passes the filters is KEPT over candidates (batch 17, owner call: 3/4 live renames were worse)', async () => {
    const naming = { naming: 'a folk name' };
    // NOT "Gloom Stalker" — that's a real ranger subclass and the SRD
    // filter rightly rejects it (which itself validated the filter).
    const clean = { ...JSON.parse(JSON.stringify(llmFixture)), name: 'Palegrasp' };
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(clean))
      .mockResolvedValueOnce(JSON.stringify({ findings: [] })) // audit: no name_grade → naming self-grades
      .mockResolvedValueOnce(JSON.stringify({ candidates: ['Quietmaw', 'Bogtorch', 'Mirelock'] }));
    const monster = await generateMonster2024(
      { concept: 'seeded', cr: 4, archetypeName: 'lurker', archetypeSource: 'auto', seedTraits: naming },
      callLLM,
    );
    expect(callLLM).toHaveBeenCalledTimes(3); // naming pass still runs (ability renames)
    expect(monster.name).toBe('Palegrasp'); // provisional survives on merit
  });

  test('a C grade renames even a filter-passing provisional (grade gate)', async () => {
    const naming = { naming: 'a folk name' };
    const clean = { ...JSON.parse(JSON.stringify(llmFixture)), name: 'Palegrasp' };
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(clean))
      .mockResolvedValueOnce(JSON.stringify({ findings: [] })) // audit: no name_grade
      .mockResolvedValueOnce(JSON.stringify({ grade: 'C', candidates: ['Quietmaw', 'Bogtorch', 'Mirelock'] }));
    const monster = await generateMonster2024(
      { concept: 'seeded', cr: 4, archetypeName: 'lurker', archetypeSource: 'auto', seedTraits: naming },
      callLLM,
    );
    expect(monster.name).toBe('Quietmaw');
  });

  test('a filter-failing provisional name still renames with self-references', async () => {
    const naming = { naming: 'a folk name' };
    const leaky = JSON.parse(JSON.stringify(llmFixture));
    leaky.name = 'Gloom-Stalker'; // hyphens always fail pickName
    leaky.sections.Actions[0].text = 'The stalker makes two Shadow Claw attacks.';
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(leaky))
      .mockResolvedValueOnce(JSON.stringify({ findings: [] })) // audit (gate opened)
      .mockResolvedValueOnce(JSON.stringify({ candidates: ['Quietmaw', 'Bogtorch', 'Mirelock'] }));
    const monster = await generateMonster2024(
      { concept: 'seeded', cr: 4, archetypeName: 'lurker', archetypeSource: 'auto', seedTraits: naming },
      callLLM,
    );
    expect(monster.name).toBe('Quietmaw');
    // "the stalker" self-references follow via the head-noun mapping.
    expect(monster.sections.Actions[0].text).toContain('The quietmaw makes');
  });
});

describe('archetype resolve helpers', () => {
  test('validateSeedSynthesisResponse requires a real archetype and a synthesis sentence', () => {
    const { validateSeedSynthesisResponse } = require('../format-2024/generate.mjs');
    expect(validateSeedSynthesisResponse(JSON.stringify({ archetype: 'lurker', synthesis: 'A pale drifting hunger that haunts the passes.' }))).toBe(true);
    expect(validateSeedSynthesisResponse(JSON.stringify({ archetype: 'lurker' }))).toBe(false);
    expect(validateSeedSynthesisResponse(JSON.stringify({ archetype: 'tank', synthesis: 'A perfectly nice sentence.' }))).toBe(false);
    expect(validateSeedSynthesisResponse(JSON.stringify({ archetype: 'lurker', synthesis: 'short' }))).toBe(false);
  });

  test('buildSynthesizedConcept carries the fused sentence, INT tier, and naming rules', () => {
    const { buildSynthesizedConcept } = require('../format-2024/concept-seeds.mjs');
    const concept = buildSynthesizedConcept(
      { intelligence: 'mindless (INT 1-2)', naming: 'a single stark word: one short, heavy English word that names what it looks like or does' },
      'A frozen coil of riverbed hunger. '
    );
    expect(concept).toContain('A frozen coil of riverbed hunger.');
    expect(concept).toContain('mindless (INT 1-2)');
    expect(concept).toContain('a single stark word');
    expect(concept).toContain('banned as the name\'s HEAD noun');
  });

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
      { ...llmFixture, resistances: 'Fire, Cold from nonmagical attacks' },
      ctx()
    );
    const findings = lintStatblock(dated, { chassis, plan }).findings;
    const fixed = applyCorrections(dated, findings, { chassis });
    expect(fixed.resistances).toBe('Fire, Cold');
    expect(lintStatblock(fixed, { chassis, plan }).ok).toBe(true);
  });

  test('an unearned B/P/S package is removed outright, qualifier and all', () => {
    // Interaction between the nonmagical strip and the bps-resistance rule:
    // a non-swarm, non-incorporeal 2024 block loses the physical package
    // entirely rather than keeping a de-qualified copy.
    const { chassis, plan } = buildContext(4, 'lurker');
    const dated = assembleMonster(
      { ...llmFixture, resistances: 'Bludgeoning, Piercing, Slashing from nonmagical attacks' },
      ctx()
    );
    const findings = lintStatblock(dated, { chassis, plan }).findings;
    const fixed = applyCorrections(dated, findings, { chassis });
    expect(fixed.resistances).toBeUndefined();
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
    hot.sections.Actions[1].text = '*Melee Attack Roll:* +11, reach 5 ft. 14 (2d8 + 5) Slashing damage.';
    hot.sections.Actions[2].text = '*Dexterity Saving Throw*: DC 19, one creature. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.';
    const findings = lintStatblock(hot, { chassis, plan }).findings;
    const fixed = applyCorrections(hot, findings, { chassis });
    expect(fixed.sections.Actions[1].text).toContain('+7');
    expect(fixed.sections.Actions[2].text).toContain('DC 13');
    expect(lintStatblock(fixed, { chassis, plan }).ok).toBe(true);
  });

  test('under-budget DCs are raised, not just over-budget ones lowered', () => {
    // Live finding: CR 20 blocks shipped every save at DC 18 vs a 22 budget.
    const { chassis, plan } = buildContext(4, 'lurker'); // budget DC 13
    const soft = assembleMonster(JSON.parse(JSON.stringify(llmFixture)), ctx());
    soft.sections.Actions[2].text = '*Dexterity Saving Throw*: DC 10, one creature. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.';
    const findings = lintStatblock(soft, { chassis, plan }).findings;
    const fixed = applyCorrections(soft, findings, { chassis });
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
    expect(callLLM).toHaveBeenCalledTimes(2); // generation + audit (gate opened)
    expect(monster.name).toBe('Gloom Stalker');
    expect(monster.format).toBe('2024');
  });

  test('under-budget attack damage is clamped to the skeleton, zero extra calls', async () => {
    // The fixture's Shadow Claw swings 13 against a lurker CR 4 per-attack
    // budget of 9 — the live Lysilyth failure class (half-CR offense).
    const callLLM = jest.fn().mockResolvedValue(JSON.stringify(llmFixture));
    const monster = await generateMonster2024(options, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(2); // generation + audit (gate opened)
    // The clamp is mod-aware: the flat +5 IS the required attack-stat mod.
    expect(monster.sections.Actions[1].text).toContain('9 (1d8 + 5)');
    expect(monster.sections.Actions[1].text).not.toContain('14 (2d8 + 5)');
  });

  test('a coined entry name is fixed by a RENAMING fix call; references follow', async () => {
    // "Thul-eg" class: the entry's NAME is the defect, so the fix call may
    // rename (the one exception to keep-the-name), and text references
    // update through the same rename machinery seed-leakage uses.
    const coined = JSON.parse(JSON.stringify(llmFixture));
    coined.sections.Traits.push({ name: 'Thul-eg', text: 'The stalker can move through a space as narrow as 1 inch wide without squeezing.' });
    coined.sections.Traits[0].text += ' While Thul-eg is active, it makes no sound.';
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(coined))
      .mockResolvedValueOnce(JSON.stringify({ findings: [] })) // audit (gate opened)
      .mockResolvedValueOnce(JSON.stringify([
        { name: 'Amorphous', text: 'The stalker can move through a space as narrow as 1 inch wide without squeezing.' },
      ]));
    const monster = await generateMonster2024(options, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(3);
    const names = monster.sections.Traits.map((e) => e.name);
    expect(names).toContain('Amorphous');
    expect(names).not.toContain('Thul-eg');
    expect(monster.sections.Traits[0].text).toContain('While Amorphous is active');
  });

  test('deterministically fixable rejects (caps, to-hit, second person) cost zero extra calls', async () => {
    const messy = JSON.parse(JSON.stringify(llmFixture));
    messy.sections.Actions[1].text =
      "*Melee Attack Roll:* +7 to hit, reach 5 ft. 14 (2d8 + 5) Slashing damage, and the target is knocked prone and can't regain hit points. It then moves toward a creature of your choice without provoking opportunity attacks.";
    const callLLM = jest.fn().mockResolvedValue(JSON.stringify(messy));
    const monster = await generateMonster2024(options, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(2); // string surgery + audit, no fix call
    const text = monster.sections.Actions[1].text;
    expect(text).not.toContain('to hit');
    expect(text).toContain('Prone');
    expect(text).toContain('Hit Points');
    expect(text).toContain('Opportunity Attacks');
    expect(text).toContain('its choice');
  });

  test('correctable violations are fixed without a retry call', async () => {
    const hot = JSON.parse(JSON.stringify(llmFixture));
    hot.sections.Actions[1].text = '*Melee Attack Roll:* +11, reach 5 ft. 14 (2d8 + 5) Slashing damage.';
    const callLLM = jest.fn().mockResolvedValue(JSON.stringify(hot));
    const monster = await generateMonster2024(options, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(2); // + audit (gate opened)
    expect(monster.sections.Actions[1].text).toContain('+7');
  });

  test('reject violations trigger exactly one regeneration', async () => {
    const broken = JSON.parse(JSON.stringify(llmFixture));
    delete broken.sections.Actions[2].slot; // missing required nova slot → reject
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(broken))
      .mockResolvedValueOnce(JSON.stringify(llmFixture))
      .mockResolvedValueOnce(JSON.stringify({ findings: [] })); // audit after the regen
    const monster = await generateMonster2024(options, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(3);
    expect(monster.name).toBe('Gloom Stalker');
  });

  test('stubborn STYLE rejects ship with a warning; mechanical rejects still fail', async () => {
    // 2014 attack phrasing in a 2024 block, and the fix calls keep
    // returning it unchanged (stubborn model). Style-only → ship anyway.
    const warty = JSON.parse(JSON.stringify(llmFixture));
    warty.sections.Actions[1].text = 'Melee Weapon Attack: +7, reach 5 ft., one target. Hit: 14 (2d8 + 5) Slashing damage.';
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(warty))
      .mockResolvedValue(JSON.stringify([{ name: 'Shadow Claw', text: warty.sections.Actions[1].text }]));
    const monster = await generateMonster2024(options, callLLM);
    expect(monster.name).toBe('Gloom Stalker'); // shipped, not thrown
    expect(monster.sections.Actions[1].text).toContain('Weapon Attack'); // wart kept
  });

  test('stubborn MECHANICAL warts ship with lint_warnings (strict and degraded alike)', async () => {
    // Blanket damage mitigation is a mechanical reject; the fix calls keep
    // returning it. Generation ships it anyway, stamped, after three rounds.
    const mitigated = JSON.parse(JSON.stringify(llmFixture));
    const badTrait = { name: 'Uncanny Bulwark', text: 'When an attacker hits it, the stalker halves the damage against it.' };
    mitigated.sections.Traits.push(badTrait);
    const stubbornLLM = () => jest.fn()
      .mockResolvedValueOnce(JSON.stringify(mitigated))
      .mockResolvedValue(JSON.stringify([badTrait]));

    const strict = await generateMonster2024(options, stubbornLLM());
    expect(strict.lint_warnings).toContain('trait-mitigation');
    expect(strict.sections.Traits.some((e) => e.name === 'Uncanny Bulwark')).toBe(true);

    const degraded = await generateMonster2024({ ...options, degraded: true }, stubbornLLM());
    expect(degraded.lint_warnings).toContain('trait-mitigation');
  });

  test('even a failed structural retry SHIPS, with the warts stamped on the block', async () => {
    // Generation never fails once a block exists (owner call): the missing
    // slot survives the regen, so the block ships carrying lint_warnings
    // and the generator surfaces them.
    const broken = JSON.parse(JSON.stringify(llmFixture));
    delete broken.sections.Actions[2].slot;
    const callLLM = jest.fn().mockResolvedValue(JSON.stringify(broken));
    const monster = await generateMonster2024(options, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(2); // attempt + one structural regen
    expect(monster.lint_warnings).toContain('slot-missing');
  });

  test('throws on an empty response', async () => {
    const callLLM = jest.fn().mockResolvedValue(null);
    await expect(generateMonster2024(options, callLLM)).rejects.toThrow(/Empty or malformed/);
  });
});

describe('rollRandomCR (weighted random-path CR)', () => {
  const { rollRandomCR } = require('../format-2024/concept-seeds.mjs');
  const { crNumberFor } = require('../format-2024/generate.mjs');
  const { assertValidCR } = require('../chassis/chassis.mjs');

  afterEach(() => jest.restoreAllMocks());

  test('every band boundary yields a valid CR key from the right band', () => {
    // Weights 38/30/17/10/5 of 100: probe just inside each band.
    const probes = [
      [0.001, ['1/4', '1/2', '1', '2', '3', '4']],
      [0.379, ['1/4', '1/2', '1', '2', '3', '4']],
      [0.381, ['5', '6', '7', '8']],
      [0.679, ['5', '6', '7', '8']],
      [0.681, ['9', '10', '11', '12']],
      [0.849, ['9', '10', '11', '12']],
      [0.851, ['13', '14', '15', '16', '17', '18', '19', '20']],
      [0.949, ['13', '14', '15', '16', '17', '18', '19', '20']],
      [0.951, ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30']],
      [0.999, ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30']],
    ];
    for (const [rand, band] of probes) {
      // First random() picks the band, second picks within it.
      jest.spyOn(Math, 'random').mockReturnValueOnce(rand).mockReturnValueOnce(0.5);
      const cr = rollRandomCR();
      expect(band).toContain(cr);
      expect(() => assertValidCR(crNumberFor(cr))).not.toThrow();
      jest.restoreAllMocks();
    }
  });

  test('the distribution is low-CR-heavy: 68% of weight sits at CR 8 or below', () => {
    // Statistical sanity over the real (unmocked) roll.
    const rolls = Array.from({ length: 4000 }, () => crNumberFor(rollRandomCR()));
    const low = rolls.filter((c) => c <= 8).length / rolls.length;
    expect(low).toBeGreaterThan(0.58); // 68% expected; wide tolerance
    expect(rolls.filter((c) => c >= 21).length / rolls.length).toBeLessThan(0.12);
  });
});
