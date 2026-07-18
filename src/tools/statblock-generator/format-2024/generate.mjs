/**
 * 2024 generation pipeline (build-order step 5 of docs/2024-architecture.md).
 *
 * The engine (chassis → archetype → slot plan) fixes every number BEFORE the
 * LLM runs; the LLM contributes flavor only — name, ability scores, speed,
 * section texts written around the exact numeric skeletons this module hands
 * it. Assembly then stamps the engine numbers over the response, lint
 * validates, correctable findings are clamped deterministically, and reject
 * findings trigger one regeneration with the findings quoted back.
 *
 * Orchestration entry: generateMonster2024(options, callLLM). callLLM is
 * injected ((prompt, validate) => Promise<string>) so the pipeline is testable
 * without the AI client; the component passes generateGptResponse.
 */
import spec from '@/data/archetype-chassis-spec.json';
import srdMonsters from '@/data/srd52-monsters.json';
import challengeRatings from '@/data/challengeRatings.json';
import { chassisFor, applyArchetype } from '../chassis/chassis.mjs';
import { slotPlanFor } from '../chassis/slot-plan.mjs';
import { lintStatblock, avgDice } from './lint.mjs';

export const ARCHETYPE_NAMES = Object.keys(spec.archetypes).filter((n) => !n.startsWith('_'));

const STAT_ORDER = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

const HIT_DIE_BY_SIZE = { Tiny: 4, Small: 6, Medium: 8, Large: 10, Huge: 12, Gargantuan: 20 };

const SKILL_ABILITY = {
  Athletics: 'STR',
  Acrobatics: 'DEX', 'Sleight of Hand': 'DEX', Stealth: 'DEX',
  Arcana: 'INT', History: 'INT', Investigation: 'INT', Nature: 'INT', Religion: 'INT',
  'Animal Handling': 'WIS', Insight: 'WIS', Medicine: 'WIS', Perception: 'WIS', Survival: 'WIS',
  Deception: 'CHA', Intimidation: 'CHA', Performance: 'CHA', Persuasion: 'CHA',
};

// Few-shot exemplars per archetype, from the spec's srd_exemplars where those
// resolve to corpus entries; archetypes without usable exemplars fall back to
// a generic set (and swarm to the corpus's actual Swarm of X blocks).
const EXEMPLAR_CANDIDATES = {
  brute: ['Ogre Zombie', 'Earth Elemental', 'Giant Hyena'],
  defender: ['Animated Armor', 'Roper', 'Couatl'],
  controller: ['Aboleth'],
  lurker: ['Ghost', "Will-o'-Wisp", 'Chain Devil'],
};
const GENERIC_EXEMPLARS = ['Allosaurus', 'Air Elemental', 'Aboleth', 'Ancient Red Dragon'];

const modOf = (score) => Math.floor((score - 10) / 2);
const signed = (n) => (n >= 0 ? `+${n}` : `${n}`);

/** CR number → challengeRatings.json / cr_str key ('0.5' → '1/2'). */
export function crKeyFor(cr) {
  if (cr === 0.125) return '1/8';
  if (cr === 0.25) return '1/4';
  if (cr === 0.5) return '1/2';
  return String(cr);
}

/** cr_str / select value → CR number ('1/2' → 0.5). */
export function crNumberFor(str) {
  const s = String(str).trim();
  if (s.includes('/')) {
    const [a, b] = s.split('/').map(Number);
    return a / b;
  }
  return Number(s);
}

/**
 * Deterministic hit-dice solver: an NdD ± M expression whose floor-average is
 * exactly `hp`, with the die from creature size and count shaped by CON.
 */
export function hpFormulaFor(hp, size, conMod = 0) {
  const die = HIT_DIE_BY_SIZE[size] ?? 8;
  const avgPerDie = (die + 1) / 2;
  const perDie = Math.max(1, avgPerDie + conMod);
  const n = Math.max(1, Math.round(hp / perDie));
  const m = hp - Math.floor(n * avgPerDie);
  if (m === 0) return `${n}d${die}`;
  return m > 0 ? `${n}d${die} + ${m}` : `${n}d${die} - ${-m}`;
}

/** NdD ± M expression averaging exactly `avg` (damage skeletons; d8 house die). */
export function damageDiceFor(avg) {
  const n = Math.max(1, Math.round(avg / 6));
  const m = avg - Math.floor(n * 4.5);
  if (m === 0) return `${n}d8`;
  return m > 0 ? `${n}d8 + ${m}` : `${n}d8 - ${-m}`;
}

/** Archetype-adjusted chassis + slot plan for a CR. null/'balanced' → raw chassis. */
export function buildContext(cr, archetypeName) {
  const normalized = !archetypeName || archetypeName === 'balanced' ? null : archetypeName;
  const chassis = normalized ? applyArchetype(chassisFor(cr), normalized) : chassisFor(cr);
  const plan = slotPlanFor(cr, normalized);
  return { chassis, plan, archetype: normalized };
}

/**
 * Damage-per-round budget: DMG table midpoint × archetype damage_mult, split
 * across the multiattack count when multiattack is required.
 */
export function damageBudgetFor(cr, chassis, plan) {
  const row = challengeRatings[crKeyFor(cr)];
  const midpoint = Math.round((row.min_damage_per_round + row.max_damage_per_round) / 2);
  const total = Math.max(1, Math.round(midpoint * (chassis.damage_mult ?? 1)));
  const attacks = plan.multiattack.status === 'required' ? plan.multiattack.count[0] : 1;
  const perAttack = Math.max(1, Math.round(total / attacks));
  return { total, attacks, perAttack };
}

export function pickRandomArchetype() {
  return ARCHETYPE_NAMES[Math.floor(Math.random() * ARCHETYPE_NAMES.length)];
}

// ---------------------------------------------------------------------------
// Archetype auto-resolve micro-call
// ---------------------------------------------------------------------------

export function buildArchetypeResolvePrompt(concept, description = '') {
  return `Classify this D&D monster concept into exactly one combat-role archetype.

Concept: ${concept}
${description ? `Details: ${description}\n` : ''}
Archetypes:
- brute: hits hard up close, soaks damage, easy to hit
- defender: protects allies, high AC, punishes movement
- skirmisher: mobile hit-and-run attacker
- artillery: fragile ranged damage dealer
- controller: locks enemies down with conditions instead of damage
- lurker: fragile ambusher with a devastating opening strike
- support: buffs, heals, or enables allies
- swarm: mass of small creatures acting as one

Return ONLY JSON, no markdown: {"archetype": "<one of the eight names above>"}`;
}

export function validateArchetypeResponse(jsonString) {
  const parsed = tryParse(jsonString);
  return parsed != null && ARCHETYPE_NAMES.includes(parsed.archetype);
}

// ---------------------------------------------------------------------------
// Generation prompt
// ---------------------------------------------------------------------------

function tryParse(raw) {
  if (typeof raw !== 'string') return null;
  const stripped = raw.replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '');
  try {
    return JSON.parse(stripped);
  } catch {
    return null;
  }
}

export function parseGenerationResponse(raw) {
  return tryParse(raw);
}

export function validateGenerationResponse(jsonString) {
  const parsed = tryParse(jsonString);
  if (!parsed) return false;
  if (!parsed.name || !parsed.size || !parsed.stats) return false;
  if (STAT_ORDER.some((s) => typeof parsed.stats[s] !== 'number')) return false;
  return Array.isArray(parsed.sections?.Actions) && parsed.sections.Actions.length > 0;
}

function exemplarFor(archetype, cr) {
  const byName = new Map(srdMonsters.map((m) => [m.name, m]));
  let candidates = (EXEMPLAR_CANDIDATES[archetype] ?? [])
    .map((n) => byName.get(n))
    .filter(Boolean);
  if (!candidates.length && archetype === 'swarm') {
    candidates = srdMonsters.filter((m) => m.name.startsWith('Swarm of'));
  }
  if (!candidates.length) {
    candidates = GENERIC_EXEMPLARS.map((n) => byName.get(n)).filter(Boolean);
  }
  candidates.sort((a, b) => Math.abs(a.cr - cr) - Math.abs(b.cr - cr));
  const m = candidates[0];
  // Trimmed to what teaches structure and 2024 phrasing; numbers in the
  // exemplar are the SRD's, ours come from the skeleton constraints.
  return {
    name: m.name, size: m.size, type: m.type, alignment: m.alignment,
    speed: m.speed, stats: m.stats, sections: m.sections,
  };
}

function slotInstructions(plan, numbers) {
  const lines = [];
  for (const slot of plan.required_slots) {
    const cats = Array.isArray(slot.category) ? slot.category : [slot.category];
    if (cats[0] === 'passive' || slot.category === 'passive') {
      lines.push(`- Passive obligation (goes in top-level fields, not sections): ${slot.description}`);
      continue;
    }
    const where = cats
      .map((c) => ({ trait: 'Traits', action: 'Actions', bonus_action: 'Bonus Actions', reaction: 'Reactions' }[c]))
      .filter(Boolean)
      .join(' or ');
    lines.push(
      `- Required slot in ${where}: ${slot.description}. The entry that fills it MUST include "slot": ${JSON.stringify(slot.description)}.`
    );
  }
  if (plan.multiattack.status === 'required') {
    lines.push(
      `- Multiattack must be the FIRST action: the creature makes ${numbers.attacks} attacks.`
    );
  }
  if (plan.multiattack.status === 'forbidden') {
    lines.push('- No Multiattack action at this tier.');
  }
  if (plan.legendary.status === 'required' || plan.legendary.status === 'recommended') {
    const res = plan.legendary.resistance_per_day;
    lines.push(
      `- Include a "Legendary Actions" section (2-3 entries)${res ? ` and a "Legendary Resistance (${res[0]}/Day)" trait` : ''}.`
    );
  }
  if (plan.bonus_action === 'recommended') {
    lines.push('- Include a "Bonus Actions" section with one entry.');
  }
  return lines.join('\n');
}

export function buildGenerationPrompt({ concept, description = '', cr, chassis, plan, caster = false }) {
  const numbers = damageBudgetFor(cr, chassis, plan);
  const perAttackDice = damageDiceFor(numbers.perAttack);
  const novaAvg = chassis.nova_mult ? Math.round(numbers.perAttack * chassis.nova_mult) : null;
  const exemplar = exemplarFor(chassis.archetype, cr);

  const schema = {
    name: 'CREATURE NAME',
    size: 'Tiny|Small|Medium|Large|Huge|Gargantuan',
    type: 'Aberration|Beast|Celestial|Construct|Dragon|Elemental|Fey|Fiend|Giant|Humanoid|Monstrosity|Ooze|Plant|Undead',
    subtype: 'optional, omit if none',
    alignment: 'e.g. Neutral Evil, Unaligned',
    speed: 'e.g. 30 ft., Fly 60 ft.',
    stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
    save_proficiencies: ['zero to two of STR|DEX|CON|INT|WIS|CHA'],
    skill_proficiencies: ['zero to three skills, e.g. Perception, Stealth'],
    senses_special: 'optional, e.g. darkvision 60 ft. (omit Passive Perception; computed for you)',
    languages: 'optional',
    resistances: 'optional damage resistances',
    immunities: 'optional damage/condition immunities',
    sections: {
      Traits: [{ name: 'Trait Name', text: 'Trait text.', slot: 'only when filling a required slot' }],
      Actions: [{ name: 'Action Name', text: 'Action text.' }],
    },
  };

  return `You are an expert D&D 2024 (5.5e) monster designer. Write the FLAVOR for a statblock whose numbers are already fixed. Never invent different numbers — use the exact skeletons given below.

RULES — read first; they apply to every line of output:
1. NEVER write "Melee Weapon Attack", "Ranged Weapon Attack", or "to hit". Attack lines use the exact skeleton under FIXED NUMBERS.
2. Every saving-throw effect uses the structured 2024 form — in traits, actions, attack riders, and death effects alike. The skeleton is the WHOLE sentence: it starts with the ability name, and the targeting phrase after the DC names who saves ("one creature within 30 feet", "each creature in the Cone", "the triggering creature", "the target"). Never write "must make a" or "must succeed on" before it, and never repeat targeting that the sentence already established. Omit *Success:* entirely when a success has no effect.
   CORRECT: *Wisdom Saving Throw*: DC 14, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn. *Success:* Half damage only.
   WRONG: The target must succeed on a DC 14 Wisdom saving throw or become frightened.
   WRONG: Each creature must make a DC 14 Constitution saving throw. On a failure, ...
   WRONG: each creature in the line must make a *Dexterity Saving Throw*: DC 16, one creature. (hybrid — the skeleton replaces the lead-in, and "one creature" contradicts "each creature")
   WRONG: *Success:* None. / *Success:* No effect. (when a success does nothing, omit the *Success:* clause entirely)
3. Conditions are Capitalized and phrased "has the X condition": Prone, Grappled, Charmed, Frightened, Restrained, Poisoned, Stunned, Deafened, Blinded, Incapacitated, Paralyzed, Petrified, Unconscious, Invisible. "Bloodied" (at or below half HP) is also a real 2024 term you may use. Game terms are likewise Capitalized: Hit Points, Opportunity Attack, Advantage, Disadvantage.
   CORRECT: The target has the Stunned condition until the end of its next turn.
   WRONG: The target is Stunned. / The target is Pulled 10 feet. (only real conditions are Capitalized — movement effects like "is pulled" or "is pushed" stay lowercase)
4. Resistances/Immunities values list bare damage types and condition names, comma-separated (never slashes) — never the words "damage" or "condition", never "from nonmagical attacks". Damage types first, then conditions after a semicolon.
   CORRECT: "immunities": "Poison; Exhaustion, Poisoned"
   CORRECT: "resistances": "Bludgeoning, Piercing, Slashing"
   WRONG: "immunities": "Poison damage, Poisoned condition"
   WRONG: "resistances": "Bludgeoning/Piercing/Slashing"
5. Spell names are Title Case: Minor Illusion, Blindness/Deafness, Fear.
6. Multiattack names the creature's attack actions exactly as YOU named them elsewhere in this statblock — if you created an action called "Spectral Saber", write "makes two Spectral Saber attacks". Never the bare "makes two attacks", and never an attack name that does not appear in this statblock's Actions.

CONCEPT: ${concept}
CHALLENGE RATING: ${crKeyFor(cr)}${chassis.archetype ? `\nCOMBAT ROLE: ${chassis.archetype}` : ''}
${description ? `SPECIAL INSTRUCTIONS FROM THE USER: ${description}\n` : ''}
FIXED NUMBERS (do not deviate):
- Every attack line uses EXACTLY this skeleton: *Melee Attack Roll:* ${signed(chassis.attack_bonus)}, reach 5 ft. ${numbers.perAttack} (${perAttackDice}) <damage type> damage. (Ranged attacks: *Ranged Attack Roll:* ${signed(chassis.attack_bonus)}, range 60 ft. — same damage skeleton. You choose damage types and may add non-damage riders.)
- Every saving-throw effect uses EXACTLY: *<Ability> Saving Throw*: DC ${chassis.save_dc}, <targeting>. *Failure:* <effect>. *Success:* <lesser effect or none>.
- Damage from save-based effects: about ${numbers.total} (${damageDiceFor(numbers.total)}) total, halved on a success.${novaAvg ? `\n- The nova/ambush mechanic may deal up to ${novaAvg} (${damageDiceFor(novaAvg)}) once per fight.` : ''}

STRUCTURE (exact requirements):
- Traits: between ${plan.traits.min} and ${plan.traits.max} entries.
- Actions: between ${plan.actions.min} and ${plan.actions.max} entries.
${slotInstructions(plan, numbers)}
${chassis.archetype === 'swarm' ? `- The "type" field must be "Swarm of Tiny <Creature>" (e.g. "Swarm of Tiny Beasts") — this overrides the type list in the schema below. Size is Medium or Large.
` : ''}${caster ? `- The creature is a spellcaster: include a "Spellcasting" action (2024 style — inside Actions, no spell slots): "The creature casts one of the following spells, using <ability> as the spellcasting ability (spell save DC ${chassis.save_dc}): At will: ... 1/Day each: ..."` : ''}

Ability scores: choose scores that fit the concept (the primary ability highest).

Return ONLY a JSON object in exactly this shape (no markdown fences, no commentary). Omit optional fields rather than emitting empty ones. Do NOT include ac, hp, initiative, CR, XP, or PB — those are stamped for you:

${JSON.stringify(schema, null, 2)}

Here is a real SRD 2024 statblock as a style reference (structure and phrasing, NOT numbers):

${JSON.stringify(exemplar, null, 2)}

Apply all six RULES from the top of this prompt. Return ONLY the JSON object.`;
}

// ---------------------------------------------------------------------------
// Assembly — engine numbers stamped over the LLM's flavor
// ---------------------------------------------------------------------------

export function assembleMonster(llmJson, { cr, chassis, plan, archetypeName, archetypeSource = 'user' }) {
  const stats = {};
  for (const s of STAT_ORDER) {
    stats[s] = Math.min(30, Math.max(1, Math.round(llmJson.stats?.[s] ?? 10)));
  }

  const pb = chassis.pb;
  const saveProfs = (llmJson.save_proficiencies ?? []).filter((s) => STAT_ORDER.includes(s));
  const saves = {};
  for (const s of STAT_ORDER) {
    saves[s] = modOf(stats[s]) + (saveProfs.includes(s) ? pb : 0);
  }

  const skillProfs = (llmJson.skill_proficiencies ?? []).filter((s) => SKILL_ABILITY[s]);
  const skills = skillProfs
    .map((s) => `${s} ${signed(modOf(stats[SKILL_ABILITY[s]]) + pb)}`)
    .join(', ');

  const perception = 10 + modOf(stats.WIS) + (skillProfs.includes('Perception') ? pb : 0);
  const sensesSpecial = (llmJson.senses_special ?? '').trim();
  const senses = sensesSpecial
    ? `${sensesSpecial}; Passive Perception ${perception}`
    : `Passive Perception ${perception}`;

  const size = HIT_DIE_BY_SIZE[llmJson.size] ? llmJson.size : 'Medium';
  const crStr = crKeyFor(cr);
  const xp = challengeRatings[crStr]?.XP ?? 0;
  const initiativeBonus = modOf(stats.DEX);

  const sections = {};
  for (const [name, entries] of Object.entries(llmJson.sections ?? {})) {
    if (!Array.isArray(entries) || entries.length === 0) continue;
    sections[name] = entries
      .filter((e) => e && e.name && e.text)
      .map((e) => (e.slot ? { name: e.name, text: e.text, slot: e.slot } : { name: e.name, text: e.text }));
  }

  const monster = {
    name: llmJson.name || 'Unnamed Creature',
    size,
    type: llmJson.type || 'Monstrosity',
    alignment: llmJson.alignment || 'Unaligned',
    ac: chassis.ac,
    hp: chassis.hp,
    hp_formula: hpFormulaFor(chassis.hp, size, modOf(stats.CON)),
    speed: llmJson.speed || '30 ft.',
    initiative_bonus: initiativeBonus,
    initiative_score: 10 + initiativeBonus,
    stats,
    saves,
    senses,
    cr,
    cr_str: crStr,
    xp,
    pb,
    sections,
    format: '2024',
    archetype: archetypeName ?? 'balanced',
    archetype_source: archetypeSource,
    // Compatibility with the shared folder UI (sortMonstersByCR, CR display).
    challenge_rating: `${crStr} (XP ${xp.toLocaleString('en-US')}; PB ${signed(pb)})`,
  };
  // 2024 legendary sections open with a uses preamble; the count is
  // structural, so it's stamped here (deterministic), never LLM-written.
  // SRD-parsed blocks lack this field (the parser dropped preambles), so
  // renderer output for corpus blocks is unchanged.
  if ((sections['Legendary Actions'] ?? []).length > 0) {
    monster.legendary_uses = 3;
  }
  if (llmJson.subtype) monster.subtype = llmJson.subtype;
  if (skills) monster.skills = skills;
  if (llmJson.languages) monster.languages = llmJson.languages;
  if (llmJson.resistances) monster.resistances = llmJson.resistances;
  if (llmJson.immunities) monster.immunities = llmJson.immunities;
  if (llmJson.vulnerabilities) monster.vulnerabilities = llmJson.vulnerabilities;
  return monster;
}

// ---------------------------------------------------------------------------
// Deterministic corrections for correctable findings
// ---------------------------------------------------------------------------

export function applyCorrections(monster, findings, { chassis }) {
  const correctable = findings.filter((f) => f.severity === 'correctable');
  if (!correctable.length) return monster;

  const out = JSON.parse(JSON.stringify(monster));
  const has = (rule) => correctable.some((f) => f.rule === rule);

  if (has('hp-band')) out.hp = chassis.hp;
  if (has('hp-band') || has('hp-formula')) {
    out.hp_formula = hpFormulaFor(out.hp, out.size, modOf(out.stats.CON));
  }
  if (has('ac-band')) out.ac = chassis.ac;
  if (has('pb')) out.pb = correctable.find((f) => f.rule === 'pb').expected;
  if (has('xp')) out.xp = correctable.find((f) => f.rule === 'xp').expected;
  if (has('initiative')) {
    out.initiative_bonus = modOf(out.stats.DEX);
    out.initiative_score = 10 + out.initiative_bonus;
  }
  if (has('saves')) {
    for (const f of correctable.filter((x) => x.rule === 'saves')) {
      const ab = f.message.split(' ')[0];
      if (out.saves?.[ab] != null) out.saves[ab] = f.expected;
    }
  }

  if (has('damage-dice')) {
    // Rewrite listed averages to match their own dice — the dice expression
    // is kept (it carries the model's intent), the arithmetic is ours.
    for (const entries of Object.values(out.sections ?? {})) {
      for (const entry of entries) {
        entry.text = entry.text.replace(
          /(\d+)\s*\((\d+d\d+(?:\s*[+-]\s*\d+)?)\)/g,
          (m, listed, dice) => {
            const avg = avgDice(dice);
            return avg !== null && avg !== Number(listed) ? `${avg} (${dice})` : m;
          }
        );
      }
    }
  }

  if (has('attack-band') || has('dc-band')) {
    for (const entries of Object.values(out.sections ?? {})) {
      for (const entry of entries) {
        if (has('attack-band')) {
          entry.text = entry.text.replace(/(Attack Roll:\*?\s*)\+(\d+)/g, (m, pre, n) =>
            Math.abs(Number(n) - chassis.attack_bonus) > 1 ? `${pre}${signed(chassis.attack_bonus)}` : m
          );
        }
        if (has('dc-band')) {
          entry.text = entry.text.replace(/DC\s+(\d+)/g, (m, n) =>
            Number(n) > chassis.save_dc + 1 ? `DC ${chassis.save_dc}` : m
          );
        }
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

export async function generateMonster2024(options, callLLM) {
  const { concept, description = '', cr, archetypeName, caster = false, archetypeSource = 'user' } = options;
  const { chassis, plan, archetype } = buildContext(cr, archetypeName);
  const assembleCtx = { cr, chassis, plan, archetypeName: archetype, archetypeSource };
  const prompt = buildGenerationPrompt({ concept, description, cr, chassis, plan, caster });

  const attempt = async (p) => {
    const raw = await callLLM(p, validateGenerationResponse);
    if (!raw) return null;
    const parsed = parseGenerationResponse(raw);
    if (!parsed) return null;
    let monster = assembleMonster(parsed, assembleCtx);
    monster = applyCorrections(monster, lintStatblock(monster, { chassis, plan }).findings, { chassis });
    const result = lintStatblock(monster, { chassis, plan });
    return { monster, rejects: result.findings.filter((f) => f.severity === 'reject') };
  };

  let outcome = await attempt(prompt);
  if (!outcome) throw new Error('Empty or malformed 2024 statblock response');

  if (outcome.rejects.length) {
    const retryPrompt = `${prompt}

Your previous attempt was rejected for these reasons — fix ALL of them this time:
${outcome.rejects.map((f) => `- ${f.message}`).join('\n')}`;
    const retry = await attempt(retryPrompt);
    if (retry) outcome = retry;
  }

  if (outcome.rejects.length) {
    throw new Error(
      `Generated statblock failed validation: ${outcome.rejects.map((f) => f.message).join('; ')}`
    );
  }
  return outcome.monster;
}
