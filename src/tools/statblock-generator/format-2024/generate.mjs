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
import { seedLeakTokens } from './concept-seeds.mjs';
import spec from '@/data/archetype-chassis-spec.json';
import srdMonsters from '@/data/srd52-monsters.json';
import challengeRatings from '@/data/challengeRatings.json';
import { chassisFor, applyArchetype } from '../chassis/chassis.mjs';
import { slotPlanFor } from '../chassis/slot-plan.mjs';
import { lintStatblock, avgDice, CONDITIONS } from './lint.mjs';

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

// Static 2014-phrasing exemplar (the SRD 5.2.1 corpus is 2024-phrased, so the
// 2014 edition ships a hand-written style reference in the same LLM schema).
const EXEMPLAR_2014 = {
  name: 'Barrow Sentinel',
  size: 'Medium', type: 'Undead', alignment: 'Lawful Evil',
  speed: '25 ft.',
  stats: { STR: 16, DEX: 10, CON: 15, INT: 6, WIS: 12, CHA: 8 },
  save_proficiencies: ['STR'],
  skill_proficiencies: ['Perception'],
  senses_special: 'darkvision 60 ft.',
  sections: {
    Traits: [
      { name: 'Grave Vigil', text: 'The sentinel remains motionless and is indistinguishable from a statue while it stays still. It has advantage on saving throws against being frightened.' },
    ],
    Actions: [
      { name: 'Multiattack', text: 'The sentinel makes two Rusted Blade attacks.' },
      { name: 'Rusted Blade', text: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) slashing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned until the end of its next turn.' },
      { name: 'Grave Wail (Recharge 5-6)', text: 'Each creature within 30 feet of the sentinel must make a DC 12 Wisdom saving throw, taking 14 (4d6) psychic damage on a failed save, or half as much damage on a successful one. A creature that fails is also frightened until the end of its next turn.' },
    ],
  },
};

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

/**
 * Weighted defense-point budget by CR tier (evolved from the legacy count
 * caps): resistances/immunities are priced by the PLAYER-side damage economy
 * — fire resistance is a real tax, psychic resistance is nearly free.
 * Weights live in lint.mjs (DEFENSE_WEIGHTS); immunity costs double resist.
 * Defender earns +3 (its identity); swarm's +3 exactly covers its required
 * BPS package. Condition immunities are uncapped (flavor-central).
 */
export function defenseBudgetFor(cr, archetypeName) {
  const base = cr <= 5 ? 1 : cr <= 10 ? 4 : cr <= 25 ? 5 : 8;
  // Defender/swarm earn more (identity / required package); artillery and
  // lurker earn LESS — their low hp_mult is the price of their offense, and
  // a full defense budget would let them buy the fragility back.
  if (archetypeName === 'defender' || archetypeName === 'swarm') {
    return { points: base + 3 };
  }
  if (archetypeName === 'artillery' || archetypeName === 'lurker') {
    return { points: Math.floor(base / 2) };
  }
  return { points: base };
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

/**
 * Seed synthesis call (blank-form generations): fuse the rolled axes into ONE
 * creature identity AND classify the role, in the same micro-call. The
 * generation prompt then receives the fused sentence instead of the axis
 * list — the model designs from a single idea rather than giving each rolled
 * trait its own disconnected ability.
 */
export function buildSeedSynthesisPrompt(seed) {
  return `Fuse these randomly rolled traits into ONE coherent monster concept, then classify its combat role.

Rolled traits: ${seed.intelligence}; ${seed.physical}; a ${seed.silhouette}; from ${seed.origin}.

Write one vivid sentence describing a single unified creature. The traits must merge into one identity — one body, one behavior — not remain separate features. Contradictions between traits are creative fuel.

Archetypes:
- brute: hits hard up close, soaks damage, easy to hit
- defender: protects allies, high AC, punishes movement
- skirmisher: mobile hit-and-run attacker
- artillery: fragile ranged damage dealer
- controller: locks enemies down with conditions instead of damage
- lurker: fragile ambusher with a devastating opening strike
- support: buffs, heals, or enables allies
- swarm: mass of small creatures acting as one

Return ONLY JSON, no markdown: {"archetype": "<one of the eight>", "synthesis": "<your one sentence>"}`;
}

export function validateSeedSynthesisResponse(jsonString) {
  const parsed = tryParse(jsonString);
  return parsed != null && ARCHETYPE_NAMES.includes(parsed.archetype)
    && typeof parsed.synthesis === 'string' && parsed.synthesis.trim().length > 10;
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
  if (plan.multiattack.status === 'optional') {
    lines.push(
      `- Multiattack is OPTIONAL. The ${numbers.total} damage budget is for the creature's WHOLE turn: if you include Multiattack with N attacks, each attack deals about ${numbers.total}/N — never the full budget per attack.`
    );
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

export function buildGenerationPrompt({ concept, description = '', cr, chassis, plan, caster = false, edition = '2024' }) {
  const numbers = damageBudgetFor(cr, chassis, plan);
  const perAttackDice = damageDiceFor(numbers.perAttack);
  const novaAvg = chassis.nova_mult ? Math.round(numbers.perAttack * chassis.nova_mult) : null;
  if (edition === '2014') {
    return buildGenerationPrompt2014({ concept, description, cr, chassis, plan, caster, numbers, perAttackDice, novaAvg });
  }
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
  const defenses = defenseBudgetFor(cr, chassis.archetype);

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
7. The statblock text is in-world only and third person. Never reference these instructions, rulebook editions ("2024", "5e"), or design terms ("legal condition", "budget"). Never "you"/"your" ("each creature of the warden's choice", not "of your choice"). Never write "(any race)" in the subtype — 2024 dropped it.
8. Every attack you tell the creature to make ("makes one Shield Bash attack") MUST exist as a fully written attack action in this statblock. Define it or don't reference it.
9. Defensive traits must be NARROW. Never write a passive trait that halves or reduces incoming damage, grants resistance to everything, or otherwise multiplies the creature's durability — the fixed AC/HP already price its defenses. Mitigating a single attack is fine ONLY as a Reaction (once per round).

CONCEPT: ${concept}
CHALLENGE RATING: ${crKeyFor(cr)}${chassis.archetype ? `\nCOMBAT ROLE: ${chassis.archetype}` : ''}
${description ? `SPECIAL INSTRUCTIONS FROM THE USER: ${description}\n` : ''}
FIXED NUMBERS (do not deviate):
- Every attack line uses EXACTLY this skeleton: *Melee Attack Roll:* ${signed(chassis.attack_bonus)}, reach 5 ft. ${numbers.perAttack} (${perAttackDice}) <Damage Type> damage. (Ranged attacks: *Ranged Attack Roll:* ${signed(chassis.attack_bonus)}, range 60 ft. — same damage skeleton. You choose damage types and may add non-damage riders.) To use two damage types, SPLIT the total (e.g. ${Math.max(1, numbers.perAttack - Math.floor(numbers.perAttack / 3))} + ${Math.floor(numbers.perAttack / 3)}) — never append a zero rider and never exceed ${numbers.perAttack} combined.
- Every saving-throw effect uses EXACTLY: *<Ability> Saving Throw*: DC ${chassis.save_dc}, <targeting>. *Failure:* <effect>. *Success:* <lesser effect or none>.
- Damage from save-based effects: about ${numbers.total} (${damageDiceFor(numbers.total)}) total, halved on a success.${novaAvg ? `\n- The nova/ambush mechanic may deal up to ${novaAvg} (${damageDiceFor(novaAvg)}) once per fight.` : ''}

STRUCTURE (exact requirements):
- Traits: between ${plan.traits.min} and ${plan.traits.max} entries.
- Actions: between ${plan.actions.min} and ${plan.actions.max} entries.
- Defense budget: ${defenses.points} points. Resisting a common type (bludgeoning, piercing, slashing, fire, lightning) costs 1 point; uncommon (cold, acid, thunder, necrotic, radiant, poison) costs 1/2; rare (psychic, force) costs 1/4. IMMUNITY costs double the resistance price. FREE (no cost): the type's canonical defense (undead/construct/elemental: poison; ooze: acid; celestial: radiant; fiend: fire), any damage type the creature itself deals, and the type matching its body material (an ice-bodied creature resists cold free) — DO give it those thematic defenses. The fixed HP already prices typical defenses. Condition immunities are free-form.
${slotInstructions(plan, numbers)}
${chassis.archetype === 'swarm' ? `- The "type" field must be "Swarm of Tiny <Creature>" (e.g. "Swarm of Tiny Beasts") — this overrides the type list in the schema below. Size is Medium or Large.
` : ''}${caster ? `- The creature is a spellcaster: include a "Spellcasting" action (2024 style — inside Actions, no spell slots): "The creature casts one of the following spells, using <ability> as the spellcasting ability (spell save DC ${chassis.save_dc}): At will: ... 1/Day each: ..." The chosen ability's SCORE must be at least ${(chassis.save_dc - 8 - chassis.pb) * 2 + 10} so that DC ${chassis.save_dc} = 8 + PB + its modifier. Prefer well-known SRD spells.` : ''}

Ability scores: choose scores that fit the concept (the primary ability highest).

Return ONLY a JSON object in exactly this shape (no markdown fences, no commentary). Omit optional fields rather than emitting empty ones. Do NOT include ac, hp, initiative, CR, XP, or PB — those are stamped for you:

${JSON.stringify(schema, null, 2)}

Here is a real SRD 2024 statblock as a style reference (structure and phrasing, NOT numbers):

${JSON.stringify(exemplar, null, 2)}

Apply all six RULES from the top of this prompt. Return ONLY the JSON object.`;
}

// 2014-edition prompt: identical numeric skeletons and structure, classic
// phrasing rules, hand-written exemplar. Same JSON schema — assembly and lint
// run on the shared internal model before legacy conversion.
function buildGenerationPrompt2014({ concept, description, cr, chassis, plan, caster, numbers, perAttackDice, novaAvg }) {
  const defenses = defenseBudgetFor(cr, chassis.archetype);
  const schema = {
    name: 'CREATURE NAME',
    size: 'Tiny|Small|Medium|Large|Huge|Gargantuan',
    type: 'Aberration|Beast|Celestial|Construct|Dragon|Elemental|Fey|Fiend|Giant|Humanoid|Monstrosity|Ooze|Plant|Undead',
    subtype: 'optional, omit if none',
    alignment: 'e.g. neutral evil, unaligned',
    speed: 'e.g. 30 ft., fly 60 ft.',
    stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
    save_proficiencies: ['zero to two of STR|DEX|CON|INT|WIS|CHA'],
    skill_proficiencies: ['zero to three skills, e.g. Perception, Stealth'],
    senses_special: 'optional, e.g. darkvision 60 ft. (omit passive Perception; computed for you)',
    languages: 'optional',
    resistances: 'optional damage resistances',
    immunities: 'optional — damage types first, then conditions after a semicolon',
    sections: {
      Traits: [{ name: 'Trait Name', text: 'Trait text.', slot: 'only when filling a required slot' }],
      Actions: [{ name: 'Action Name', text: 'Action text.' }],
    },
  };

  return `You are an expert D&D 5th edition (2014 rules) monster designer. Write the FLAVOR for a statblock whose numbers are already fixed. Never invent different numbers — use the exact skeletons given below.

RULES — read first; they apply to every line of output:
1. This is CLASSIC 2014 phrasing. NEVER write "Attack Roll:", "*Failure:*", "*Success:*", or "has the X condition" — those are 2024 forms.
2. Attack lines use EXACTLY this skeleton: Melee Weapon Attack: ${signed(chassis.attack_bonus)} to hit, reach 5 ft., one target. Hit: ${numbers.perAttack} (${perAttackDice}) <damage type> damage. (Ranged: Ranged Weapon Attack: ${signed(chassis.attack_bonus)} to hit, range 60 ft., one target. Hit: same skeleton.) The skeleton's damage is the attack's TOTAL — never append "plus X (dice) damage" riders on top of it. To use two damage types, split the total (e.g. ${Math.max(1, numbers.perAttack - Math.floor(numbers.perAttack / 3))} + ${Math.floor(numbers.perAttack / 3)}), keeping the sum exactly ${numbers.perAttack}. Non-damage riders (conditions, pushes) are welcome.
3. Saving-throw effects use classic forms: "The target must make a DC ${chassis.save_dc} <Ability> saving throw, taking ${numbers.total} (${damageDiceFor(numbers.total)}) <type> damage on a failed save, or half as much damage on a successful one." — or for conditions: "must succeed on a DC ${chassis.save_dc} <Ability> saving throw or be knocked prone / become frightened / be poisoned...".
4. Conditions, damage types, and game terms are lowercase in prose: "knocked prone", "frightened", "slashing damage", "hit points".
5. Third person only, in-world only — never "you"/"your", never rulebook or design references.
6. Multiattack names the creature's attack actions exactly as YOU named them elsewhere in this statblock. Every attack you reference MUST exist as a written attack action.
7. Defensive traits must be NARROW. Never write a passive trait that halves or reduces incoming damage or grants resistance to everything — the fixed AC/HP already price the creature's defenses. Mitigating a single attack is fine ONLY as a reaction (once per round).

CONCEPT: ${concept}
CHALLENGE RATING: ${crKeyFor(cr)}${chassis.archetype ? `\nCOMBAT ROLE: ${chassis.archetype}` : ''}
${description ? `SPECIAL INSTRUCTIONS FROM THE USER: ${description}\n` : ''}
STRUCTURE (exact requirements):
- Traits: between ${plan.traits.min} and ${plan.traits.max} entries.
- Actions: between ${plan.actions.min} and ${plan.actions.max} entries.
- Defense budget: ${defenses.points} points. Resisting a common type (bludgeoning, piercing, slashing, fire, lightning) costs 1 point; uncommon (cold, acid, thunder, necrotic, radiant, poison) costs 1/2; rare (psychic, force) costs 1/4. IMMUNITY costs double the resistance price. FREE (no cost): the type's canonical defense (undead/construct/elemental: poison; ooze: acid; celestial: radiant; fiend: fire), any damage type the creature itself deals, and the type matching its body material (an ice-bodied creature resists cold free) — DO give it those thematic defenses. The fixed HP already prices typical defenses. Condition immunities are free-form.
${slotInstructions(plan, numbers)}
${novaAvg ? `- The nova/ambush mechanic may deal up to ${novaAvg} (${damageDiceFor(novaAvg)}) once per fight.\n` : ''}${caster ? `- The creature is a spellcaster: include a "Spellcasting" trait in 2014 style: "The creature's spellcasting ability is <ability> (spell save DC ${chassis.save_dc}). It can innately cast the following spells: At will: ... 1/day each: ..." The chosen ability's SCORE must be at least ${(chassis.save_dc - 8 - chassis.pb) * 2 + 10} so that DC ${chassis.save_dc} = 8 + PB + its modifier. Use only well-known SRD spells, comma-separated on one line — never hyphens or bullet lists.\n` : ''}${plan.legendary.status === 'required' || plan.legendary.status === 'recommended' ? `- Do NOT write a preamble/intro entry in the Legendary Actions section — the sheet renders one automatically. Provide only the option entries themselves.\n` : ''}
Return ONLY a JSON object in exactly this shape (no markdown fences, no commentary). Omit optional fields rather than emitting empty ones. Do NOT include ac, hp, CR, XP, or PB — those are stamped for you:

${JSON.stringify(schema, null, 2)}

Here is a statblock in the correct classic style (structure and phrasing, NOT numbers):

${JSON.stringify(EXEMPLAR_2014, null, 2)}

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
      .map((e) => {
        // Strip zero-damage riders ("plus 0 fire damage") — malicious
        // compliance with the damage-total rule; never legitimate.
        const text = e.text.replace(/\s*,?\s*plus 0(?:\s*\([^)]*\))?\s+\w+ damage/gi, '');
        return e.slot ? { name: e.name, text, slot: e.slot } : { name: e.name, text };
      });
  }

  const monster = {
    // Names never carry a leading article — prose and display add "the".
    name: (llmJson.name || 'Unnamed Creature').replace(/^the\s+/i, ''),
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
// Legacy (2014) model conversion
// ---------------------------------------------------------------------------

/**
 * Convert the internal (sections-based) model to the legacy 2014 shape the
 * existing Statblock.vue display, exports, and encounter adapter consume.
 * Reactions and Bonus Actions fold into `abilities` with a suffix — the
 * legacy display has no sections for them.
 */
export function toLegacyModel(m) {
  const entryList = (name) => (m.sections?.[name] ?? []).map((e) => ({ name: e.name, description: e.text }));
  // Split merged 2024-style defense lines into 2014's damage vs condition
  // fields. Classification is by token against the known condition
  // vocabulary, NOT by the semicolon — the LLM doesn't always emit the
  // separator (live finding: "immunities": "frightened" landed under
  // Damage Immunities).
  const conditionSet = new Set([...CONDITIONS, 'Exhaustion'].map((c) => c.toLowerCase()));
  const splitDefense = (value) => {
    const tokens = (value ?? '').split(/[;,]/).map((s) => s.trim()).filter(Boolean);
    const damage = tokens.filter((t) => !conditionSet.has(t.toLowerCase()));
    const conditions = tokens.filter((t) => conditionSet.has(t.toLowerCase()));
    return { damage: damage.join(', '), conditions: conditions.join(', ') };
  };

  const imm = splitDefense(m.immunities);
  const res = splitDefense(m.resistances);
  const savingThrows = STAT_ORDER
    .filter((s) => m.saves[s] !== modOf(m.stats[s]))
    .map((s) => `${s} ${signed(m.saves[s])}`)
    .join(', ');

  const abilities = [
    ...entryList('Traits'),
    ...entryList('Bonus Actions').map((e) => ({ ...e, name: `${e.name} (Bonus Action)` })),
    ...entryList('Reactions').map((e) => ({ ...e, name: `${e.name} (Reaction)` })),
  ];

  const legacy = {
    name: m.name,
    type_and_alignment: `${m.size} ${m.type.toLowerCase()}${m.subtype ? ` (${m.subtype.toLowerCase()})` : ''}, ${m.alignment.toLowerCase()}`,
    armor_class: String(m.ac),
    hit_points: `${m.hp} (${m.hp_formula})`,
    speed: m.speed,
    attributes: STAT_ORDER.map((s) => `${s} ${m.stats[s]} (${signed(modOf(m.stats[s]))})`).join(', '),
    saving_throws: savingThrows,
    skills: m.skills ?? '',
    senses: (m.senses ?? '').replace('Passive Perception', 'passive Perception'),
    languages: m.languages || '—', // official style: an em-dash, never blank
    challenge_rating: `${m.cr_str} (${(m.xp ?? 0).toLocaleString('en-US')} XP)`,
    proficiency_bonus: `+${m.pb}`,
    abilities,
    actions: entryList('Actions'),
    // Engine metadata (same keys the 2024 path stamps, minus format '2024'
    // so displayFormat routes to the legacy Statblock.vue display).
    format: '2014',
    archetype: m.archetype,
    archetype_source: m.archetype_source,
  };
  if (res.damage) legacy.damage_resistances = res.damage;
  if (imm.damage) legacy.damage_immunities = imm.damage;
  if (imm.conditions) legacy.condition_immunities = imm.conditions;
  const legendary = entryList('Legendary Actions');
  if (legendary.length) legacy.legendary_actions = legendary;
  return legacy;
}

// ---------------------------------------------------------------------------
// Deterministic corrections for correctable findings
// ---------------------------------------------------------------------------

// Reject-severity rules that are nonetheless deterministically fixable by
// string surgery — no LLM call needed. Applied inside applyCorrections so
// they vanish before the fix ladder ever considers a call.
const LOWERCASE_CONDITIONS_G = new RegExp(
  `\\b(${CONDITIONS.map((c) => c.toLowerCase()).join('|')})\\b`, 'g'
);
const DETERMINISTIC_TEXT_FIXES = [
  ['term-caps', (t) => t
    .replace(/\bhit points\b/g, 'Hit Points').replace(/\bhit point\b/g, 'Hit Point')
    .replace(/\bopportunity attacks\b/g, 'Opportunity Attacks')
    .replace(/\bopportunity attack\b/g, 'Opportunity Attack')],
  ['condition-caps', (t) => t.replace(LOWERCASE_CONDITIONS_G, (m) => m[0].toUpperCase() + m.slice(1))],
  ['phrasing-to-hit', (t) => t.replace(/(Attack Roll:\*?\s*\+\d+)\s+to hit/g, '$1')],
  ['second-person', (t) => t.replace(/\byours\b/gi, 'its').replace(/\byour\b/gi, 'its')],
];

export function applyCorrections(monster, findings, { chassis }) {
  if (!findings.length) return monster;
  const correctable = findings.filter((f) => f.severity === 'correctable');

  const out = JSON.parse(JSON.stringify(monster));
  const has = (rule) => findings.some((f) => f.rule === rule);

  for (const [rule, fix] of DETERMINISTIC_TEXT_FIXES) {
    if (!has(rule)) continue;
    for (const entries of Object.values(out.sections ?? {})) {
      for (const entry of entries) entry.text = fix(entry.text);
    }
  }

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

  if (has('nonmagical')) {
    for (const field of ['resistances', 'immunities', 'vulnerabilities']) {
      if (out[field]) out[field] = out[field].replace(/\s*from nonmagical attacks?/gi, '');
    }
  }

  for (const f of correctable.filter((x) => x.rule === 'defense-count' && x.loc?.field)) {
    out[f.loc.field] = f.expected || undefined;
  }

  for (const f of correctable.filter((x) => x.rule === 'entry-name-caps' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) entry.name = f.expected;
  }

  // Single-expression attacks outside the damage band clamp to the exact
  // skeleton (owner call, 2026-07-19): the prompt dictates exact numbers, so
  // deviation is disobedience — variety lives in damage types and riders.
  for (const f of correctable.filter((x) => x.rule === 'attack-damage-band' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) {
      // Non-global: replaces the entry's sole damage expression.
      entry.text = entry.text.replace(
        /(\d+)\s*\((\d+d\d+(?:\s*[+-]\s*\d+)?)\)/,
        `${f.expected} (${damageDiceFor(f.expected)})`
      );
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
          entry.text = entry.text.replace(/(Attack(?: Roll)?:\*?\s*)\+(\d+)/g, (m, pre, n) =>
            Math.abs(Number(n) - chassis.attack_bonus) > 1 ? `${pre}${signed(chassis.attack_bonus)}` : m
          );
        }
        if (has('dc-band')) {
          // Both directions (under-budget DCs raise too), scoped to SAVE
          // contexts only — escape DCs and skill-check DCs are not the
          // band's business and must not be rewritten.
          entry.text = entry.text
            .replace(/(Saving Throw\*?:?\s*DC\s+)(\d+)/gi, (m, pre, n) =>
              Math.abs(Number(n) - chassis.save_dc) > 1 ? `${pre}${chassis.save_dc}` : m)
            .replace(/(DC\s+)(\d+)(\s+\w+ saving throw)/gi, (m, pre, n, post) =>
              Math.abs(Number(n) - chassis.save_dc) > 1 ? `${pre}${chassis.save_dc}${post}` : m);
        }
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Single-entry re-roll (inline edit) — engine-based
// ---------------------------------------------------------------------------

const REROLL_SECTION = { ability: 'Traits', action: 'Actions', legendary: 'Legendary Actions' };

function editionSkeletons(edition, chassis, numbers) {
  return edition === '2014'
    ? `- Attack: Melee Weapon Attack: ${signed(chassis.attack_bonus)} to hit, reach 5 ft., one target. Hit: ${numbers.perAttack} (${damageDiceFor(numbers.perAttack)}) <damage type> damage. (Ranged Weapon Attack: same numbers, range 60 ft.) That damage is the attack's TOTAL — no extra "plus X" riders.
- Save effect: must make a DC ${chassis.save_dc} <Ability> saving throw, taking ${numbers.total} (${damageDiceFor(numbers.total)}) <type> damage on a failed save, or half as much on a successful one. Conditions lowercase ("knocked prone", "frightened"); "hit points" lowercase; never "Attack Roll:" or "Failure:" markers.`
    : `- Attack: *Melee Attack Roll:* ${signed(chassis.attack_bonus)}, reach 5 ft. ${numbers.perAttack} (${damageDiceFor(numbers.perAttack)}) <Damage Type> damage. (Ranged: same numbers, range 60 ft.)
- Save effect: *<Ability> Saving Throw*: DC ${chassis.save_dc}, <targets>. *Failure:* ... *Success:* Half damage only. Conditions Capitalized ("has the Prone condition"); never "Melee Weapon Attack" or "to hit".`;
}

function parseLegacyAttributes(attributes) {
  const stats = {};
  for (const m of (attributes ?? '').matchAll(/(STR|DEX|CON|INT|WIS|CHA)\s+(\d+)/g)) {
    stats[m[1]] = Number(m[2]);
  }
  return Object.keys(stats).length === 6 ? stats : null;
}

/** All entries of a monster (either shape) as { section, name, text } rows. */
function entryRows(monster) {
  if (monster.sections) {
    return Object.entries(monster.sections).flatMap(([section, list]) =>
      (list ?? []).map((e) => ({ section, name: e.name, text: e.text })));
  }
  const rows = [];
  for (const [field, section] of [['abilities', 'Traits'], ['actions', 'Actions'], ['legendary_actions', 'Legendary Actions']]) {
    for (const e of monster[field] ?? []) rows.push({ section, name: e.name, text: e.description ?? e.text ?? '' });
  }
  return rows;
}

export function validateEntryResponse(jsonString) {
  const parsed = tryParse(jsonString);
  return !!parsed && typeof parsed.name === 'string' && parsed.name.trim() !== ''
    && typeof parsed.text === 'string' && parsed.text.trim() !== '';
}

/**
 * Re-roll one entry of a saved monster with engine budgets and lint.
 *
 * Context recovery: engine monsters carry cr/archetype; pre-engine monsters
 * fall back to a balanced chassis at their displayed CR (still stricter than
 * the old template prompts). Edition keys off the monster's own format field.
 * Lint runs on a pseudo-block where every OTHER entry is a name-only stub —
 * so references resolve, but old off-budget text can't false-trigger bands.
 */
export async function rerollEntry(monster, { kind, current }, callLLM) {
  const section = REROLL_SECTION[kind];
  if (!section) throw new Error(`Unknown re-roll kind: ${kind}`);
  const edition = monster.format === '2024' ? '2024' : '2014';

  // First numeric token, tolerant of "CR 5 (1,800 XP)" style prefixes.
  const crToken = String(monster.challenge_rating ?? '').match(/\d+\/\d+|\d+(\.\d+)?/)?.[0];
  const cr = monster.cr ?? crNumberFor(crToken ?? '');
  const { chassis, plan } = buildContext(cr, monster.archetype ?? 'balanced');
  const numbers = damageBudgetFor(cr, chassis, plan);
  const stats = monster.stats ?? parseLegacyAttributes(monster.attributes);
  const pb = typeof monster.pb === 'number' ? monster.pb : chassis.pb;

  const rows = entryRows(monster);
  const otherNames = rows.filter((r) => r.name !== current.name).map((r) => r.name);
  const currentText = current.description ?? current.text ?? '';
  // If other entries reference this one by name, a rename would break them.
  const referenced = rows.some((r) => r.name !== current.name && current.name && r.text.includes(current.name));

  const skeletons = editionSkeletons(edition, chassis, numbers);

  const prompt = `You are rewriting ONE entry of an existing D&D ${edition === '2014' ? '5th edition (2014 rules)' : '2024 (5.5e)'} statblock with fresh flavor. The numbers are fixed — never invent different ones.

THE MONSTER: ${monster.name}, CR ${crKeyFor(cr)}${monster.archetype ? `, combat role: ${monster.archetype}` : ''}.
Its other entries (do not duplicate their mechanics): ${otherNames.join('; ') || 'none'}.

REWRITE THIS ${section === 'Traits' ? 'TRAIT' : section === 'Actions' ? 'ACTION' : 'LEGENDARY ACTION'}:
"${current.name}": ${currentText}

FIXED NUMBER SKELETONS (use EXACTLY these if the new entry attacks or forces a save):
${skeletons}

RULES:
- Third person, in-world only. No traits that halve/reduce incoming damage or grant resistance to everything.
- Any attack you reference by name must be one of the other entries listed above${referenced ? `.\n- KEEP the name "${current.name}" — other entries reference it by name` : ', or omit attack references'}.

Return ONLY JSON, no markdown fences: {"name": "...", "text": "..."}`;

  const attempt = async (p) => {
    const raw = await callLLM(p, validateEntryResponse);
    if (!raw) return null;
    const parsed = tryParse(raw);
    if (!parsed) return null;
    // Pseudo-block: full text only for the new entry; the rest are name stubs.
    const sections = {};
    for (const r of rows) {
      if (r.name === current.name && r.section === section) continue;
      (sections[r.section] ??= []).push({ name: r.name, text: '' });
    }
    (sections[section] ??= []).push({ name: parsed.name, text: parsed.text });
    let pseudo = { name: monster.name, stats: stats ?? undefined, pb, sections };
    pseudo = applyCorrections(pseudo, lintStatblock(pseudo, { chassis, edition, perAttack: numbers.perAttack, totalDamage: numbers.total }).findings, { chassis });
    const result = lintStatblock(pseudo, { chassis, edition, perAttack: numbers.perAttack, totalDamage: numbers.total });
    const entry = pseudo.sections[section].find((e) => e.name === parsed.name && e.text);
    return { entry, rejects: result.findings.filter((f) => f.severity === 'reject') };
  };

  let outcome = await attempt(prompt);
  if (!outcome) throw new Error('Empty or malformed re-roll response');
  if (outcome.rejects.length) {
    const retry = await attempt(`${prompt}

Your previous attempt was rejected for these reasons — fix ALL of them this time:
${outcome.rejects.map((f) => `- ${f.message}`).join('\n')}`);
    if (retry) outcome = retry;
  }
  if (outcome.rejects.length || !outcome.entry) {
    throw new Error(`Re-rolled entry failed validation: ${outcome.rejects.map((f) => f.message).join('; ')}`);
  }
  return { name: outcome.entry.name, description: outcome.entry.text };
}

const SECTION_KINDS = { abilities: 'Traits', actions: 'Actions', legendary: 'Legendary Actions' };

export function validateSectionResponse(jsonString) {
  const parsed = tryParse(jsonString);
  return Array.isArray(parsed) && parsed.length >= 1 && parsed.length <= 8
    && parsed.every((e) => e && typeof e.name === 'string' && e.name.trim() !== ''
      && typeof e.text === 'string' && e.text.trim() !== '');
}

/**
 * Re-roll a whole section (Traits / Actions / Legendary Actions) of a saved
 * monster with engine budgets, plan counts, and lint. Same context-recovery
 * and stub-lint approach as rerollEntry. `suggestion` is the user's steering
 * text from the edit UI.
 *
 * Structural enforcement: entry counts come from the slot plan (balanced plan
 * for pre-engine monsters), multiattack per the plan when re-rolling Actions.
 * Legendary sections use a fixed 2–4 range regardless of tier — the monster
 * already has the section; a re-roll must not delete the feature. Archetype
 * required_slots are NOT enforced (slot tags don't survive legacy conversion).
 */
export async function rerollSection(monster, { kind, suggestion = '' }, callLLM) {
  const section = SECTION_KINDS[kind];
  if (!section) throw new Error(`Unknown section re-roll kind: ${kind}`);
  const edition = monster.format === '2024' ? '2024' : '2014';

  const crToken = String(monster.challenge_rating ?? '').match(/\d+\/\d+|\d+(\.\d+)?/)?.[0];
  const cr = monster.cr ?? crNumberFor(crToken ?? '');
  const { chassis, plan } = buildContext(cr, monster.archetype ?? 'balanced');
  const numbers = damageBudgetFor(cr, chassis, plan);
  const stats = monster.stats ?? parseLegacyAttributes(monster.attributes);
  const pb = typeof monster.pb === 'number' ? monster.pb : chassis.pb;

  const rows = entryRows(monster);
  const currentSection = rows.filter((r) => r.section === section);
  const otherRows = rows.filter((r) => r.section !== section);
  const actionNames = (section === 'Actions' ? otherRows : rows)
    .filter((r) => r.section === 'Actions')
    .map((r) => r.name);

  const range = section === 'Traits' ? plan.traits
    : section === 'Actions' ? plan.actions
    : { min: 2, max: 4 };
  const multiattack = section === 'Actions' ? plan.multiattack : { status: 'optional' };

  const structureLines = [
    `- Produce between ${range.min} and ${range.max} entries.`,
    ...(multiattack.status === 'required'
      ? [`- The FIRST entry must be Multiattack: the creature makes ${multiattack.count[0]} attacks, naming attack entries YOU create in this section.`]
      : []),
    ...(multiattack.status === 'forbidden' ? ['- No Multiattack entry.'] : []),
    ...(section === 'Legendary Actions'
      ? [`- Entries are short; attacks referenced by name must be one of: ${actionNames.join(', ') || 'none — use non-attack options'}.`]
      : []),
  ].join('\n');

  const prompt = `You are rewriting the ENTIRE ${section} section of an existing D&D ${edition === '2014' ? '5th edition (2014 rules)' : '2024 (5.5e)'} statblock with fresh flavor. The numbers are fixed — never invent different ones.

THE MONSTER: ${monster.name}, CR ${crKeyFor(cr)}${monster.archetype ? `, combat role: ${monster.archetype}` : ''}.
Its entries in OTHER sections (do not duplicate their mechanics): ${otherRows.map((r) => r.name).join('; ') || 'none'}.

PREVIOUS VERSION of this section (write a fresh take on the same creature — do not copy):
${currentSection.map((r) => `- ${r.name}: ${r.text}`).join('\n') || '(empty)'}
${suggestion ? `\nUSER DIRECTION (follow it): ${suggestion}\n` : ''}
STRUCTURE:
${structureLines}

FIXED NUMBER SKELETONS (use EXACTLY these for any attack or save effect):
${editionSkeletons(edition, chassis, numbers)}

RULES:
- Third person, in-world only. No traits that halve/reduce incoming damage or grant resistance to everything.

Return ONLY a JSON array, no markdown fences: [{"name": "...", "text": "..."}, ...]`;

  const attempt = async (p) => {
    const raw = await callLLM(p, validateSectionResponse);
    if (!raw) return null;
    const parsed = tryParse(raw);
    if (!Array.isArray(parsed)) return null;
    const sections = {};
    for (const r of otherRows) (sections[r.section] ??= []).push({ name: r.name, text: '' });
    sections[section] = parsed.map((e) => ({ name: e.name, text: e.text }));
    let pseudo = { name: monster.name, stats: stats ?? undefined, pb, sections };
    pseudo = applyCorrections(pseudo, lintStatblock(pseudo, { chassis, edition, perAttack: numbers.perAttack, totalDamage: numbers.total }).findings, { chassis });
    const rejects = lintStatblock(pseudo, { chassis, edition, perAttack: numbers.perAttack, totalDamage: numbers.total }).findings
      .filter((f) => f.severity === 'reject');
    // Structural checks the entry-level lint can't see without a plan.
    const entries = pseudo.sections[section];
    if (entries.length < range.min || entries.length > range.max) {
      rejects.push({ message: `${entries.length} entries — this section must have between ${range.min} and ${range.max}` });
    }
    const hasMulti = entries.some((e) => e.name.startsWith('Multiattack'));
    if (multiattack.status === 'required' && !hasMulti) {
      rejects.push({ message: 'A Multiattack entry is required, listed first' });
    }
    if (multiattack.status === 'forbidden' && hasMulti) {
      rejects.push({ message: 'Multiattack is not allowed for this creature' });
    }
    return { entries, rejects };
  };

  let outcome = await attempt(prompt);
  if (!outcome) throw new Error('Empty or malformed section re-roll response');
  if (outcome.rejects.length) {
    const retry = await attempt(`${prompt}

Your previous attempt was rejected for these reasons — fix ALL of them this time:
${outcome.rejects.map((f) => `- ${f.message}`).join('\n')}`);
    if (retry) outcome = retry;
  }
  if (outcome.rejects.length) {
    throw new Error(`Re-rolled section failed validation: ${outcome.rejects.map((f) => f.message).join('; ')}`);
  }
  return outcome.entries.map((e) => ({ name: e.name, description: e.text }));
}

// ---------------------------------------------------------------------------
// Entry-rewrite fix — targeted, instead of full regeneration
// ---------------------------------------------------------------------------

// Reject rules that only implicate specific entries' TEXT: the block is
// otherwise sound, so resend just the flagged entries with their findings.
const ENTRY_FIXABLE = new Set([
  'phrasing-2014', 'phrasing-to-hit', 'phrasing-saving-throw',
  'phrasing-hybrid-save', 'condition-caps', 'term-caps',
  'phrasing-2024-in-2014', 'second-person', 'trait-mitigation',
  'undefined-attack-ref', 'attack-damage-band',
]);

// Rejects that genuinely need new content — only these trigger a full
// regeneration. spell-dc-ability is here because its fix is an ability-score
// change with save/skill ripple, not an entry rewrite.
const STRUCTURAL_REJECTS = new Set([
  'slot-missing', 'multiattack', 'legendary', 'section-structure', 'counts',
  'spell-dc-ability',
]);

async function rewriteFlaggedEntries(monster, rejects, { edition, chassis, plan, cr }, callLLM) {
  const byEntry = new Map();
  for (const f of rejects) {
    if (!f.loc) continue;
    const key = `${f.loc.section} ${f.loc.entry}`;
    if (!byEntry.has(key)) byEntry.set(key, { ...f.loc, problems: [] });
    byEntry.get(key).problems.push(f.message);
  }
  const targets = [...byEntry.values()]
    .map((t) => {
      const entry = (monster.sections?.[t.section] ?? []).find((e) => e.name === t.entry);
      return entry ? { ...t, text: entry.text } : null;
    })
    .filter(Boolean);
  if (!targets.length) return monster;

  const numbers = damageBudgetFor(cr, chassis, plan);
  const prompt = `You are FIXING specific entries of a D&D ${edition === '2014' ? '5th edition (2014 rules)' : '2024 (5.5e)'} statblock. Rewrite ONLY the entries below to resolve their listed problems. Keep each entry's NAME exactly as given, keep its mechanical intent and numbers, change as little text as possible. If a mechanic is fundamentally disallowed, replace it with a balanced alternative in the same spirit.

${targets.map((t) => `ENTRY "${t.entry}" (${t.section}):\n${t.text}\nPROBLEMS TO FIX:\n${t.problems.map((p) => `- ${p}`).join('\n')}`).join('\n\n')}

FIXED NUMBER SKELETONS (use these if rephrasing an attack or save):
${editionSkeletons(edition, chassis, numbers)}

Return ONLY a JSON array with the SAME entry names, no markdown fences: [{"name": "...", "text": "..."}]`;

  const raw = await callLLM(prompt, validateSectionResponse);
  const parsed = tryParse(raw);
  if (!Array.isArray(parsed)) return monster;

  const out = JSON.parse(JSON.stringify(monster));
  for (const { name, text } of parsed) {
    for (const t of targets) {
      if (t.entry !== name) continue;
      const entry = (out.sections?.[t.section] ?? []).find((e) => e.name === name);
      if (entry && typeof text === 'string' && text.trim()) entry.text = text;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Post-generation naming pass (seeded generations)
// ---------------------------------------------------------------------------

const SRD_NAMES = new Set(srdMonsters.map((m) => m.name.toLowerCase()));
const MENACE_WORD_RE = /^(terror|doom|dread|horror|death|fear)s?$/i;
// Positional ban: "Dread Bellringer" (menace as modifier of a concrete doer)
// is official-grade naming; "Silent Terror" (menace as head noun) is slop.
const headIsMenace = (name) => MENACE_WORD_RE.test(name.trim().split(/\s+/).pop());

// Sound-symbolism hints by combat role — the naming pass knows the archetype,
// so a brute can be told to SOUND heavy.
const PHONETICS_BY_ARCHETYPE = {
  brute: 'heavy and slow — long vowels, voiced stops (b, d, g, m)',
  defender: 'solid and blunt — st, gr, d clusters',
  skirmisher: 'quick and sharp — short vowels, crisp consonants (k, t, p)',
  artillery: 'taut and snapping — k, t, x',
  controller: 'resonant and intoning — long o and u, n, m',
  lurker: 'hushed and sibilant — s, sh, wh, soft vowels',
  support: 'soft and chiming — l, m, open vowels',
  swarm: 'skittering and repetitive — ch, k, tt, z',
};

export function buildNamingPrompt(monster, traits) {
  const abilities = Object.values(monster.sections ?? {}).flat()
    .map((e) => `${e.name}: ${e.text.slice(0, 90)}`)
    .join('\n');
  return `Name this finished D&D monster. Read what it actually IS — its movement, attacks, and materials — and name THAT creature.

THE CREATURE: ${monster.size} ${monster.type}, speed ${monster.speed}.
${abilities}

THE NAME must be ${traits.naming}
${monster.archetype && PHONETICS_BY_ARCHETYPE[monster.archetype] ? `Its sound should be ${PHONETICS_BY_ARCHETYPE[monster.archetype]}.\n` : ''}Rules: name concrete things the creature actually does or is made of. Never hyphens. Abstract menace words (terror, doom, dread, horror, death, fear) never as the head noun — as a leading adjective before a concrete doer they are fine. Never a name already used by a well-known D&D creature, class, or subclass.

Return ONLY JSON, no markdown: {"candidates": ["five different names, best first"]}`;
}

export function validateNamingResponse(jsonString) {
  const parsed = tryParse(jsonString);
  return !!parsed && Array.isArray(parsed.candidates)
    && parsed.candidates.length >= 3
    && parsed.candidates.every((c) => typeof c === 'string' && c.trim() !== '');
}

/**
 * Deterministic candidate selection: first name that survives every filter.
 * The register discipline is enforced by filtering, not by hoping.
 */
export function pickName(candidates, { seedTokens = [], register = '' } = {}) {
  const isCoinage = /coinage/.test(register);
  for (const raw of candidates) {
    // Leading articles are stripped, not rejected — "the Silent Clinger"
    // becomes "Silent Clinger"; prose supplies "the".
    const name = raw.trim().replace(/^the\s+/i, '');
    const lower = name.toLowerCase();
    if (!name || name.includes('-')) continue;
    if (headIsMenace(name)) continue;
    if (SRD_NAMES.has(lower.replace(/^the /, ''))) continue;
    if (seedTokens.some((t) => lower.includes(t))) continue;
    if (isCoinage && (name.includes(' ') || name.length > 9)) continue;
    if (name.split(/\s+/).length > 3) continue;
    return name;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Seed-leakage rename fix — targeted, instead of full regeneration
// ---------------------------------------------------------------------------

export function validateRenameResponse(jsonString) {
  const parsed = tryParse(jsonString);
  return !!parsed && !Array.isArray(parsed) && typeof parsed === 'object'
    && Object.values(parsed).every((v) => typeof v === 'string' && v.trim() !== '');
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Replace a name everywhere in text, preserving lowercase prose usage. */
function renameInText(text, oldName, newName) {
  return text.replace(new RegExp(escapeRe(oldName), 'gi'), (m) =>
    m === m.toLowerCase() ? newName.toLowerCase() : newName);
}

/**
 * Targeted fix for seed-leakage rejects: the block's mechanics are fine, only
 * names leaked — so ask for a rename map of JUST the offending names and
 * apply it deterministically (entry names AND every text reference, so
 * Multiattack/legendary references follow the rename).
 */
async function renameLeakedNames(monster, seedTokens, naming, callLLM) {
  const leaks = (text) => seedTokens.some((t) => (text ?? '').toLowerCase().includes(t));
  const leakyNames = [
    ...(leaks(monster.name) ? [monster.name] : []),
    ...Object.values(monster.sections ?? {}).flatMap((list) =>
      (list ?? []).filter((e) => leaks(e.name)).map((e) => e.name)),
  ];
  if (!leakyNames.length) return monster;

  const prompt = `These names from a D&D statblock must be replaced — they reuse forbidden seed words. Invent fresh replacements that fit the same creature. Never use any of these words or their derivatives: ${seedTokens.join(', ')}.${naming ? `\nThe creature's name should be ${naming}.` : ''}

Names to replace: ${JSON.stringify(leakyNames)}

Return ONLY a JSON object mapping each old name to its replacement, no markdown fences: {"Old Name": "New Name", ...}`;

  const raw = await callLLM(prompt, validateRenameResponse);
  if (!raw) return monster;
  const mapping = tryParse(raw);
  if (!mapping) return monster;

  return applyRenameMapping(monster, mapping);
}

/** Apply a rename map: names, full-name text references, and short-form
 * self-references ("the burrower") via positional word pairs. */
export function applyRenameMapping(monster, mapping) {
  const out = JSON.parse(JSON.stringify(monster));
  for (const [oldName, newName] of Object.entries(mapping)) {
    if (out.name === oldName) out.name = newName;
    // Monsters self-refer in SHORT form ("the burrower"), which the
    // full-name replacement misses — map distinctive old-name words to their
    // positional counterparts too (live finding: a renamed "Burrower of the
    // Sunken Rift" shipped with "the burrower" throughout its texts).
    const oldWords = oldName.split(/\s+/);
    const newWords = newName.split(/\s+/);
    let wordPairs = oldWords.length === newWords.length
      ? oldWords.map((w, i) => [w, newWords[i]]).filter(([o, n]) =>
          o.toLowerCase() !== n.toLowerCase() && o.length >= 4 && /^[A-Z]/.test(o))
      : [];
    if (!wordPairs.length && oldWords.length !== newWords.length) {
      // Different shapes ("Gloom Stalker" → "Quietmaw"): map the head noun
      // so "the stalker" self-references still follow the rename.
      const o = oldWords[oldWords.length - 1];
      const n = newWords[newWords.length - 1];
      if (o.length >= 4 && o.toLowerCase() !== n.toLowerCase()) wordPairs = [[o, n]];
    }
    for (const list of Object.values(out.sections ?? {})) {
      for (const entry of list ?? []) {
        if (entry.name === oldName) entry.name = newName;
        entry.text = renameInText(entry.text, oldName, newName);
        // Only the self-reference form "the <word>" — a bare word replace
        // would corrupt OTHER entry names' references ("Shadow Claw").
        for (const [o, n] of wordPairs) {
          entry.text = entry.text.replace(
            new RegExp(`\\b(the) ${escapeRe(o)}\\b`, 'gi'),
            (m, article) => `${article} ${n.toLowerCase()}`
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
  const { concept, description = '', cr, archetypeName, caster = false, archetypeSource = 'user', edition = '2024', seedTraits = null } = options;
  const { chassis, plan, archetype } = buildContext(cr, archetypeName);
  const assembleCtx = { cr, chassis, plan, archetypeName: archetype, archetypeSource };
  const seedTokens = seedTraits ? seedLeakTokens(seedTraits) : undefined;
  const { perAttack, total: totalDamage } = damageBudgetFor(cr, chassis, plan);
  const defenseCaps = defenseBudgetFor(cr, archetype);
  const prompt = buildGenerationPrompt({ concept, description, cr, chassis, plan, caster, edition });

  const attempt = async (p) => {
    const raw = await callLLM(p, validateGenerationResponse);
    if (!raw) return null;
    const parsed = parseGenerationResponse(raw);
    if (!parsed) return null;
    let monster = assembleMonster(parsed, assembleCtx);
    monster = applyCorrections(monster, lintStatblock(monster, { chassis, plan, edition, seedTokens, perAttack, totalDamage, defenseCaps }).findings, { chassis });
    const result = lintStatblock(monster, { chassis, plan, edition, seedTokens, perAttack, totalDamage, defenseCaps });
    return { monster, rejects: result.findings.filter((f) => f.severity === 'reject') };
  };

  let outcome = await attempt(prompt);
  if (!outcome) throw new Error('Empty or malformed 2024 statblock response');

  // Repair ladder, cheapest tool first (deterministic corrections already ran
  // inside attempt()):
  // 1. Full regeneration — ONLY for structural rejects (missing slots/
  //    sections/counts): the content itself is wrong.
  // 2. Targeted fix calls — entry rewrites for text-scoped rejects, rename
  //    map for seed leakage. The block survives; only the flagged parts
  //    change.
  const needsRegen = (rejects) => rejects.some((f) => STRUCTURAL_REJECTS.has(f.rule));

  if (outcome.rejects.length && needsRegen(outcome.rejects)) {
    const retryPrompt = `${prompt}

Your previous attempt was rejected for these reasons — fix ALL of them this time:
${outcome.rejects.map((f) => `- ${f.message}`).join('\n')}`;
    const retry = await attempt(retryPrompt);
    if (retry) outcome = retry;
  }

  for (let i = 0; i < 2 && outcome.rejects.length && !needsRegen(outcome.rejects); i++) {
    let monster = outcome.monster;
    if (outcome.rejects.some((f) => f.rule === 'seed-leakage')) {
      monster = await renameLeakedNames(monster, seedTokens, seedTraits?.naming, callLLM);
    }
    const entryRejects = outcome.rejects.filter((f) => ENTRY_FIXABLE.has(f.rule) && f.loc);
    if (entryRejects.length) {
      monster = await rewriteFlaggedEntries(monster, entryRejects, { edition, chassis, plan, cr }, callLLM);
    }
    // Fixed text may drift numerically — run corrections, then re-judge.
    monster = applyCorrections(monster, lintStatblock(monster, { chassis, plan, edition, seedTokens, perAttack, totalDamage, defenseCaps }).findings, { chassis });
    const result = lintStatblock(monster, { chassis, plan, edition, seedTokens, perAttack, totalDamage, defenseCaps });
    outcome = { monster, rejects: result.findings.filter((f) => f.severity === 'reject') };
  }

  if (outcome.rejects.length) {
    throw new Error(
      `Generated statblock failed validation: ${outcome.rejects.map((f) => f.message).join('; ')}`
    );
  }
  // Naming pass (seeded generations only): name the FINISHED creature. The
  // main call's name is provisional; a dedicated micro-call reads the actual
  // design and proposes candidates, which are filtered deterministically —
  // first survivor wins, all-fail keeps the provisional name.
  if (seedTraits) {
    try {
      const raw = await callLLM(buildNamingPrompt(outcome.monster, seedTraits), validateNamingResponse);
      const parsed = raw ? tryParse(raw) : null;
      const chosen = parsed
        ? pickName(parsed.candidates, { seedTokens, register: seedTraits.naming ?? '' })
        : null;
      if (chosen && chosen !== outcome.monster.name) {
        outcome.monster = applyRenameMapping(outcome.monster, { [outcome.monster.name]: chosen });
      }
    } catch {
      /* naming is best-effort — the provisional name stands */
    }
  }

  // 2014 edition ships in the legacy model shape: the existing Statblock.vue
  // display, exports, encounter adapter, and inline editing all consume it.
  const finished = edition === '2014' ? toLegacyModel(outcome.monster) : outcome.monster;
  // Persist the rolled seed for provenance and future name-only re-rolls.
  if (seedTraits) finished.concept_seed = { ...seedTraits };
  return finished;
}
