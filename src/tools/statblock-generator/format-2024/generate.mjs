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
import { seedLeakTokens, rollNameBans, TYPE_ESSENCES } from './concept-seeds.mjs';
import spec from '@/data/archetype-chassis-spec.json';
import srdMonsters from '@/data/srd52-monsters.json';
import challengeRatings from '@/data/challengeRatings.json';
import crTable from '@/data/cr-table.json';
import { chassisFor, applyArchetype } from '../chassis/chassis.mjs';
import { HIT_DIE_BY_SIZE, hpFormulaFor, attackDamageDiceFor, saveDamageDiceFor } from './dice.mjs';
import { slotPlanFor } from '../chassis/slot-plan.mjs';
import { lintStatblock, avgDice, CONDITIONS, DEFENSE_WEIGHTS, SELF_REF_STOP } from './lint.mjs';
import { logger } from '@/util/logger.mjs';
import { auditEligible, buildAuditPrompt, validateAuditResponse, verifyAuditFindings, auditNameGrade, auditTypeCorrection } from './audit.mjs';

// Dice solvers live in dice.mjs so skeleton/ can use them without importing
// this module. Re-exported here: existing importers and tests are unaffected.
export { hpFormulaFor, attackDamageDiceFor, saveDamageDiceFor } from './dice.mjs';

/**
 * The skeleton path is the DEFAULT for 2024 (owner call, 2026-08-02).
 *
 * Set localStorage['statblock-skeleton'] = '0' to fall back to the chassis.
 * Read at call time, not import time, so flipping it takes effect on the next
 * generation with no reload — the same convention as the legacy-2014 flag.
 *
 * A blocked storage (incognito, embedded frame) keeps the default rather than
 * throwing: the fallback should never be reached by accident.
 */
function usesSkeletonPath() {
  try {
    return typeof localStorage === 'undefined' || localStorage.getItem('statblock-skeleton') !== '0';
  } catch {
    return true;
  }
}

export const ARCHETYPE_NAMES = Object.keys(spec.archetypes).filter((n) => !n.startsWith('_'));

const STAT_ORDER = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];


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

const SMALL_WORDS = new Set(['of', 'the', 'a', 'an', 'and', 'in']);

/** Title Case a creature name; small words stay lowercase except first. */
export function titleCaseName(name) {
  return name.split(/\s+/).map((w, i) =>
    i > 0 && SMALL_WORDS.has(w.toLowerCase())
      ? w.toLowerCase()
      : w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ');
}

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




/** The chassis-required attack-ability modifier (attack bonus = mod + PB). */
export function requiredAttackModFor(chassis) {
  return chassis.attack_bonus - chassis.pb;
}

/**
 * The ability a creature attacks with: its best non-CON stat. Mental stats
 * (INT/WIS/CHA) win only when STRICTLY higher than the best physical, so
 * casters strike with their casting stat and brutes keep STR — the LLM's
 * own score ranking names the striker, the engine never guesses.
 */
export function attackStatFor(stats) {
  const best = (keys) => keys.reduce((a, b) => ((stats[b] ?? 10) > (stats[a] ?? 10) ? b : a));
  const physical = best(['STR', 'DEX']);
  const mental = best(['INT', 'WIS', 'CHA']);
  return (stats[mental] ?? 10) > (stats[physical] ?? 10) ? mental : physical;
}

/** Archetype-adjusted chassis + slot plan for a CR. null/'balanced' → raw chassis. */
export function buildContext(cr, archetypeName) {
  const normalized = !archetypeName || archetypeName === 'balanced' ? null : archetypeName;
  const chassis = normalized ? applyArchetype(chassisFor(cr), normalized) : chassisFor(cr);
  const plan = slotPlanFor(cr, normalized);
  return { chassis, plan, archetype: normalized };
}

// Legendary creatures underbuild the routine turn to leave headroom for
// legendary uses + nova: across the 30 SRD legendary blocks the routine turn
// runs at a median 0.55× band-mid, aggregate (routine + legendary) at ~1.15×
// (docs/investigations/08-aggregate-dpr-legendary.md). Without this discount,
// a legendary block budgets its Multiattack at full mid and then stacks
// legendary on top, running hot. 0.6 (not 0.55) keeps a small margin so the
// routine turn still bites. Only required/recommended legendary tiers — an
// optional-legendary block usually has no legendary actions, so its full
// routine budget is correct.
const LEGENDARY_ROUTINE_DISCOUNT = 0.6;


/**
 * Damage-per-round budget: DMG table midpoint × archetype damage_mult ×
 * (legendary routine discount if the plan carries legendary actions), split
 * across the multiattack count when multiattack is required.
 */
export function damageBudgetFor(cr, chassis, plan) {
  const row = challengeRatings[crKeyFor(cr)];
  const midpoint = Math.round((row.min_damage_per_round + row.max_damage_per_round) / 2);
  const legendaryDiscount = plan.legendary?.status === 'required' || plan.legendary?.status === 'recommended'
    ? LEGENDARY_ROUTINE_DISCOUNT : 1;
  const total = Math.max(1, Math.round(midpoint * (chassis.damage_mult ?? 1) * legendaryDiscount));
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

export function buildArchetypeResolvePrompt(concept, description = '', { cr = null, archetype = null } = {}) {
  return `${archetype
    ? `The combat role of this D&D monster is FIXED by the user: ${archetype}. Echo it in "archetype" unchanged, and sketch a combat identity built around that role.`
    : 'Classify this D&D monster concept into exactly one combat-role archetype, then sketch its combat identity.'}

Concept: ${concept}
${description ? `Details: ${description}\n` : ''}${cr != null ? `Challenge Rating: ${crKeyFor(cr)} — scale the creature's ambition to this tier (a CR 2 creature is a local menace; a CR 20+ creature is a mythic force). The identity must read like a creature OF this tier.\n` : ''}
Archetypes:
- brute: hits hard up close, soaks damage, easy to hit
- defender: protects allies, high AC, punishes movement
- skirmisher: mobile hit-and-run attacker
- artillery: fragile ranged damage dealer
- glass_cannon: the highest damage at its CR, paid for with the thinnest defenses; it wins fast or dies fast
- controller: locks enemies down with conditions instead of damage
- lurker: fragile ambusher with a devastating opening strike
- support: buffs, heals, or enables allies
- swarm: mass of small creatures acting as one

The identity is 2-3 sentences a designer would build from: how it opens a fight, what it does every round after that, and its temperament under pressure (does it flee bloodied, fight to the death, toy with prey?). Concrete and specific to THIS creature — never generic filler.

Also decide the creature TYPE from the concept's SUBSTANCE — what it physically IS: animated objects/machines are Construct; remains or spirits of the dead are Undead; natural animals are Beast; masses of vermin are a swarm (name the base type); giants are massive humanoid-shaped folk; fungus/vegetation are Plant. Never type by vibe.

TYPE HONESTY: creature_type must be the type your identity actually EXPRESSES — its body, abilities, and origin, not its label. If the concept's substance isn't genuinely that type, either rewrite the identity to BE it or declare the type you actually wrote. A type the content never expresses (an "Elemental" whose body and habits could belong to any animal) is a failure.

Also write ONE sentence of world-lore ("lore"): where this creature comes from and what it wants — the story a GM would read aloud. Grounded in the concept's substance, never generic doom-prose.

Also pick the creature's THEME THREADS ("themes"): ONE primary word the concept is most about, plus at most ONE supporting word that complements it — from this list only: bestial, armed, amorphous, grave, fiendish, celestial, fey, draconic, elemental, verdant, forged, mind, venomous, terror, beguiling, grasping, devouring, aquatic, subterranean, aerial, uncanny, arcane, voice, gaze, breath. The pair must COHERE — grave+aquatic is a drowned dead thing; subterranean+celestial is nonsense. And themes must AGREE with creature_type: celestial means a Celestial, grave means Undead, fiendish a Fiend, draconic a Dragon, verdant a Plant, forged a Construct — never declare a domain theme the type contradicts.


Also decide the creature's MIND ("mind"): "sapient" (it reasons and comprehends speech — most named monsters), "bestial" (animal cunning, no speech), or "mindless" (vermin, oozes, automatons with no comprehension). Print discipline: only sapient creatures cast spells, sense lies, or issue commands — the corpus has zero mindless casters and zero mindless lie-sensers. A golem that understands its maker's commands counts as sapient.


Also give the engine its ASSEMBLY METADATA — structural signals the builder honors directly, unlike the prose:
- "size": the body the concept describes (Tiny|Small|Medium|Large|Huge|Gargantuan).
- "movement": the modes the body actually has, from ["swim","burrow","fly","climb"] (walking is implied; an empty array means walk only). The builder GATES abilities on these — a creature without fly never receives a flying ability.
- "attack_mode": "melee"|"ranged"|"mixed" — how it delivers its attacks. If its identity is striking from afar, say "ranged"; the builder guarantees at least one ranged attack ships.
- "signature_mechanic": the ONE mechanic the creature IS, from: thrown-weapon, breath, engulf, grapple, gaze, aura, teleport, summon, web — the engine guarantees it a seat. Omit if no single mechanic dominates the concept.

Return ONLY JSON, no markdown: {"archetype": "<one of the role names above>", "identity": "<2-3 sentences>", "lore": "<one sentence>", "creature_type": "<one of: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, Undead>", "themes": ["2-3 from the list"], "mind": "<sapient|bestial|mindless>", "size": "<Tiny|Small|Medium|Large|Huge|Gargantuan>", "movement": ["zero or more of swim|burrow|fly|climb"], "attack_mode": "<melee|ranged|mixed>", "signature_mechanic": "<one of the list above, or omit>"}`;
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
export function buildSeedSynthesisPrompt(seed, { cr = null, archetype = null } = {}) {
  return `${archetype
    ? `Fuse these randomly rolled traits into ONE coherent monster concept. Its combat role is FIXED by the user: ${archetype} — echo it in "archetype" unchanged and shape the concept around that role.`
    : 'Fuse these randomly rolled traits into ONE coherent monster concept, then classify its combat role.'}

Rolled traits: ${seed.intelligence}; ${seed.physical}; a ${seed.silhouette}; from ${seed.origin}${seed.disposition ? `; ${seed.disposition}` : ''}.
${cr != null ? `Challenge Rating: ${crKeyFor(cr)} — scale the creature's ambition to this tier (a CR 2 creature is a local menace; a CR 20+ creature is a mythic force).` : ''}
${seed.creature_type ? `Creature type: ${seed.creature_type} — ${TYPE_ESSENCES[seed.creature_type] ?? 'build from what that type IS'}. Fuse the rolled traits INTO this essence (the traits are raw material; the essence is what the creature fundamentally is) — never design the traits first and paint the type on after.` : ''}

Write 2-3 vivid sentences describing a single unified creature: the first describes what it IS (the traits must merge into one identity — one body, one behavior — not remain separate features; contradictions between traits are creative fuel), the rest describe how it FIGHTS — how it opens, what it does every round after that, and its temperament under pressure (does it flee bloodied, fight to the death, toy with prey?). The combat role must FOLLOW the rolled disposition — a guardian is a defender, a trickster is not a brute, a pack-hunter skirmishes.

Archetypes:
- brute: hits hard up close, soaks damage, easy to hit
- defender: protects allies, high AC, punishes movement
- skirmisher: mobile hit-and-run attacker
- artillery: fragile ranged damage dealer
- glass_cannon: the highest damage at its CR, paid for with the thinnest defenses; it wins fast or dies fast
- controller: locks enemies down with conditions instead of damage
- lurker: fragile ambusher with a devastating opening strike
- support: buffs, heals, or enables allies
- swarm: mass of small creatures acting as one

Echo the rolled creature type in "creature_type" — but if the fused concept's SUBSTANCE contradicts it (the fusion turned out to be a vermin multitude rolled as Giant, or an amber construct rolled as Humanoid), override it with the type the substance demands.

TYPE HONESTY: creature_type must be the type your synthesis actually EXPRESSES — its body, abilities, and origin, not its label. The seeded type is raw material: either fuse the concept INTO it for real, or declare the type your fused creature actually is. A label the content never expresses (an "Elemental" whose body and habits could belong to any animal) is a failure.

Also write ONE sentence of world-lore ("lore"): where this creature comes from and what it wants — drawn from the rolled ORIGIN, the story a GM would read aloud. Grounded in the fused substance, never generic doom-prose.

Also pick the creature's THEME THREADS ("themes"): ONE primary word the concept is most about, plus at most ONE supporting word that complements it — from this list only: bestial, armed, amorphous, grave, fiendish, celestial, fey, draconic, elemental, verdant, forged, mind, venomous, terror, beguiling, grasping, devouring, aquatic, subterranean, aerial, uncanny, arcane, voice, gaze, breath. The pair must COHERE — grave+aquatic is a drowned dead thing; subterranean+celestial is nonsense. And themes must AGREE with creature_type: celestial means a Celestial, grave means Undead, fiendish a Fiend, draconic a Dragon, verdant a Plant, forged a Construct — never declare a domain theme the type contradicts.


Also decide the creature's MIND ("mind"): "sapient" (it reasons and comprehends speech — most named monsters), "bestial" (animal cunning, no speech), or "mindless" (vermin, oozes, automatons with no comprehension). Print discipline: only sapient creatures cast spells, sense lies, or issue commands — the corpus has zero mindless casters and zero mindless lie-sensers. A golem that understands its maker's commands counts as sapient.


Also give the engine its ASSEMBLY METADATA — structural signals the builder honors directly, unlike the prose:
- "size": the body the concept describes (Tiny|Small|Medium|Large|Huge|Gargantuan).
- "movement": the modes the body actually has, from ["swim","burrow","fly","climb"] (walking is implied; an empty array means walk only). The builder GATES abilities on these — a creature without fly never receives a flying ability.
- "attack_mode": "melee"|"ranged"|"mixed" — how it delivers its attacks. If its identity is striking from afar, say "ranged"; the builder guarantees at least one ranged attack ships.
- "signature_mechanic": the ONE mechanic the creature IS, from: thrown-weapon, breath, engulf, grapple, gaze, aura, teleport, summon, web — the engine guarantees it a seat. Omit if no single mechanic dominates the concept.

Return ONLY JSON, no markdown: {"archetype": "<one of the role names above>", "synthesis": "<your 2-3 sentences>", "lore": "<one sentence>", "creature_type": "<one of: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, Undead>", "themes": ["2-3 from the list"], "mind": "<sapient|bestial|mindless>", "size": "<Tiny|Small|Medium|Large|Huge|Gargantuan>", "movement": ["zero or more of swim|burrow|fly|climb"], "attack_mode": "<melee|ranged|mixed>", "signature_mechanic": "<one of the list above, or omit>"}`;
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
    // The half-damage swarm slot keeps getting inverted (a BUFF below half
    // HP) when left open-ended — prescribe the official embedded pattern.
    if (/half-damage/i.test(slot.description)) {
      lines.push(
        `- Write that slot INSIDE the swarm's main attack line, official-style: "Hit: <full> damage, or <reduced> damage if the swarm has half of its Hit Points or fewer" — the reduced number is about HALF the full number, never more. Tag the attack entry with the slot id; do not write a separate action for it, and never use design terms like "mode" in any entry name.`
      );
    }
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
      `- Include a "Legendary Actions" section (2-3 entries)${res ? ` and a "Legendary Resistance (${res[0]}/Day)" trait` : ''}. Each option is small: one attack, a move, or a minor effect — at most one attack's worth of damage. When an option reuses another action ("The creature uses X"), X must be a single-target attack or a Recharge/1-Day action — NEVER an at-will area or save-for-damage effect (those hit the whole party every round).`
    );
  }
  if (plan.bonus_action === 'recommended') {
    lines.push('- Include a "Bonus Actions" section with one entry.');
  }
  return lines.join('\n');
}

export function buildGenerationPrompt({ concept, description = '', cr, chassis, plan, caster = false, edition = '2024', resolvedType = null }) {
  const numbers = damageBudgetFor(cr, chassis, plan);
  // The attack ability's mod is engine-determined BEFORE the LLM runs
  // (attack bonus − PB), so the flat damage bonus in every skeleton is
  // exact; the LLM only decides WHICH ability is the striker stat.
  const atkMod = requiredAttackModFor(chassis);
  const atkDmg = attackDamageDiceFor(numbers.perAttack, atkMod);
  const saveDmg = saveDamageDiceFor(numbers.total);
  // DMG accounting counts AREA damage double (it assumes 2+ targets), so
  // cones/lines/bursts budget HALF the single-target number — the fix for
  // a live CR 30 cone prescribed the full 312-point turn total.
  const aoeDmg = saveDamageDiceFor(Math.max(1, Math.round(numbers.total / 2)));
  const novaDmg = chassis.nova_mult
    ? saveDamageDiceFor(Math.round(numbers.perAttack * chassis.nova_mult))
    : null;
  if (edition === '2014') {
    return buildGenerationPrompt2014({ concept, description, cr, chassis, plan, caster, numbers, atkMod, atkDmg, saveDmg, aoeDmg, novaDmg, resolvedType });
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
   CORRECT: "resistances": "Fire, Cold"
   WRONG: "immunities": "Poison damage, Poisoned condition"
   WRONG: "resistances": "Fire/Cold/Lightning"
5. Spell names are Title Case: Minor Illusion, Blindness/Deafness, Fear.
6. Multiattack names the creature's attack actions exactly as YOU named them elsewhere in this statblock — if you created an action called "Spectral Saber", write "makes two Spectral Saber attacks". Never the bare "makes two attacks", and never an attack name that does not appear in this statblock's Actions.
7. The statblock text is in-world only and third person. Never reference these instructions, rulebook editions ("2024", "5e"), or design terms ("legal condition", "budget"). Never "you"/"your" ("each creature of the warden's choice", not "of your choice"). Never write "(any race)" in the subtype — 2024 dropped it. Entry text refers to the creature by its own name or a natural short form of it (the officials' "the dragon" for Adult Brass Dragon) — never an unrelated epithet that appears nowhere else ("the sentinel" on a creature named Strokeg).
8. Every attack you tell the creature to make ("makes one Shield Bash attack") MUST exist as a fully written attack action in this statblock. Define it or don't reference it.
9. Defensive traits must be NARROW. Never write a passive trait that halves or reduces incoming damage, grants resistance to everything, or otherwise multiplies the creature's durability — the fixed AC/HP already price its defenses. Mitigating a single attack is fine ONLY as a Reaction (once per round).
10. A Reaction is NOT a free action — it fires once per round, only when a specific event occurs. Every Reactions entry uses EXACTLY this form: *Trigger:* <the specific event that lets the creature respond>. *Response:* <what it does>.
   CORRECT: *Trigger:* A creature within 30 feet hits the warden with an attack roll. *Response:* The attacker takes 7 (2d6) Radiant damage.
   WRONG: One creature within 60 feet must succeed on a saving throw... (no trigger — that is an Action, not a Reaction)
11. A Trait is ALWAYS-ON or self-referential — it never forces another creature to make a saving throw, with two official exceptions: a recurring proximity aura in the Stench form ("*Constitution Saving Throw*: DC n, any creature that starts its turn in a X-foot Emanation originating from the <name>") and a death explosion ("The <name> explodes when it dies. *Dexterity Saving Throw*: ..."). Any OTHER save imposed on an enemy is an Action (put it in Actions), or a Reaction with an explicit *Trigger:* — NEVER a Trait. Every save-effect targeting clause names a range or area ("one creature within 60 feet", "each creature in a 20-foot Emanation"); never bare "one creature" or "each creature".
12. Ability names are plain English that says what the ability does ("Tar Tendril", "Shielding Wall", "Grasping Coils") — an invented or coined word may be the CREATURE's name, never an ability's name. The creature's own name reads like a Monster Manual entry: a real-word compound (Owlbear), a folk name (Shambling Mound), or a coined word (Chuul) — never a flat description of its attack routine.
13. The type follows the creature's SUBSTANCE: animated objects, machines, and worked materials are Constructs (an animated sword or needle is never a Beast); spirits and remains of the dead are Undead; only living natural animals are Beasts.

CONCEPT: ${concept}
${resolvedType ? `CREATURE TYPE: ${resolvedType} — ${TYPE_ESSENCES[resolvedType] ?? 'build from what that type IS'}. Express the type in the creature's MECHANICS and substance — its abilities should only make sense for a ${resolvedType}. Languages and name alone do not make a type.` : ''}
CHALLENGE RATING: ${crKeyFor(cr)}${chassis.archetype ? `\nCOMBAT ROLE: ${chassis.archetype}` : ''}
${description ? `SPECIAL INSTRUCTIONS FROM THE USER: ${description}\n` : ''}
DAMAGE-TYPE DISCIPLINE: choose ONE energy damage type that follows from the creature's TYPE essence and substance — never from its mood or name (a grim-named Elemental still deals its element, not Necrotic); a second type only when its anatomy genuinely earns it (a molten body may burn AND crush). Official monsters almost never exceed two. Never pair types with no shared physical cause (Radiant tendrils on a body that also puffs Poison spores is a failure).
MOTIF FATIGUE: spore clouds, poison spores, and fungal-haze mechanics are heavily overused across generations — use them ONLY if the concept's substance is actually fungal.
ANATOMY COHERENCE: the creature's body parts, movement modes, and abilities must agree — fins mean a Swim speed, wings mean a Fly speed, a burrower has claws or a drill-shaped body. Never give an ability an anatomical name the statline contradicts.
DESIGN COHERENCE: before writing entries, decide ONE combat identity — how this creature opens a fight, what it does every round after that, and its temperament under pressure. Every trait, action, and reaction must serve that identity; cut any ability that a GM running this creature would never actually use. Abilities must interlock (a setup ability must have a payoff ability; a payoff must have its setup), never sit side-by-side as disconnected ideas.

FIXED NUMBERS (do not deviate):
- Every attack line uses EXACTLY this skeleton: *Melee Attack Roll:* ${signed(chassis.attack_bonus)}, reach 5 ft. ${atkDmg.avg} (${atkDmg.dice}) <Damage Type> damage. (Ranged attacks: *Ranged Attack Roll:* ${signed(chassis.attack_bonus)}, range 60 ft. — same damage skeleton. You choose damage types and may add non-damage riders.) The "+ ${Math.max(0, atkMod)}" is the attack ability's modifier — never change it. To use two damage types, shrink the DICE and add a small dice-only rider of the second type (e.g. "plus 4 (1d8) Fire damage"), keeping the combined average at or below ${atkDmg.avg}; never append a zero rider.
- Every saving-throw effect uses EXACTLY: *<Ability> Saving Throw*: DC ${chassis.save_dc}, <targeting>. *Failure:* <effect>. *Success:* <lesser effect or none>.
- Save-based damage is pure dice, no flat bonus, halved on a success. SINGLE-target save effects: about ${saveDmg.avg} (${saveDmg.dice}). AREA effects (Cones, Lines, bursts): about ${aoeDmg.avg} (${aoeDmg.dice}) — areas hit multiple creatures, so they use the HALF number, never the single-target number.${novaDmg ? `\n- The nova/ambush mechanic may deal up to ${novaDmg.avg} (${novaDmg.dice}) once per fight.` : ''}
- An area effect that deals damage may add a SOFT condition (Prone, Frightened, Poisoned) but NOT a hard lockdown (Stunned, Paralyzed, Petrified, Unconscious) unless the entry is gated "(Recharge 5-6)" or "(1/Day)".
- An action woven into Multiattack ("can replace one attack with X" / "and uses X") must deal at most the per-attack number (${atkDmg.avg}) unless it is Recharge/1-Day gated. The ${saveDmg.avg} single-target save number is a STANDALONE action used instead of Multiattack, never inside it.
- Any Grappled condition must carry an "(escape DC ${Math.max(8, (chassis.attack_bonus ?? chassis.save_dc - 6) + 8)})" rider; any Restrained effect must give the target an exit (a repeat save, a fixed duration, or a breakable binding) — never an unescapable or indefinitely-maintained hold.

STRUCTURE (exact requirements):
- Traits: between ${plan.traits.min} and ${plan.traits.max} entries.
- Actions: between ${plan.actions.min} and ${plan.actions.max} entries.
- NEVER resist all three of Bludgeoning, Piercing, and Slashing — the full physical package is reserved for swarms and incorporeal creatures. Anything else picks elemental/energy resistances instead (or at most ONE physical type with a strong body-material reason).
- Defense budget: ${defenses.points} points. Resisting a common type (bludgeoning, piercing, slashing, fire, lightning) costs 1 point; uncommon (cold, acid, thunder, necrotic, radiant, poison) costs 1/2; rare (psychic, force) costs 1/4. IMMUNITY costs double the resistance price. FREE (no cost): the type's canonical defense (undead/construct/elemental: poison; ooze: acid; celestial: radiant; fiend: fire), any damage type the creature itself deals, and the type matching its body material (an ice-bodied creature resists cold free) — DO give it those thematic defenses. A creature whose BODY IS the element takes its signature type as a free IMMUNITY, never mere resistance — a magma-bodied creature is Immune to Fire (the Fire Elemental rule; dragons are Immune to their breath type). Merely DEALING a type earns resistance at most (the Dragon Turtle breathes fire yet only resists it). The fixed HP already prices typical defenses. Condition immunities are free-form.
${slotInstructions(plan, numbers)}
${chassis.archetype === 'swarm' ? `- The "type" field must be "Swarm of Tiny <Creature>" (e.g. "Swarm of Tiny Beasts") — this overrides the type list in the schema below. Size is Medium or Large.
` : ''}${plan.legendary.status === 'required' || plan.legendary.status === 'recommended' ? `- Do NOT write a preamble/intro entry in the Legendary Actions section — the sheet renders the uses preamble automatically. Provide only the option entries themselves. Legendary options never carry cost suffixes in 2024 — never write "(Costs N Actions)"; design bigger effects as 1/Day actions instead.
` : ''}${caster ? `- The creature is a spellcaster: include a "Spellcasting" action (2024 style — inside Actions, no spell slots): "The creature casts one of the following spells, using <ability> as the spellcasting ability (spell save DC ${chassis.save_dc}): At will: ... 1/Day each: ..." The chosen ability's SCORE must be at least ${(chassis.save_dc - 8 - chassis.pb) * 2 + 10} so that DC ${chassis.save_dc} = 8 + PB + its modifier. Choose the ability by IDENTITY, following the official pattern: INNATE casters whose magic is part of their being — dragons, elementals, fey, demons, spirits, monstrosities — use Charisma (every SRD dragon and elemental casts with Charisma). STUDIED casters — wizards, liches, scheming devils, alien intellects — use Intelligence. PRIESTLY or nature casters — druids, priests, oracles — use Wisdom. When unsure, prefer Charisma. Prefer well-known SRD spells. The spell LIST must express the creature's TYPE essence — an Elemental's spells are its element behaving as magic, a Fey's are glamours and tricks; raise-the-dead necromancy (Animate Dead, Blight-style withering) belongs to Undead and mortal or fiendish necromancers only. "At will" spells: cantrips plus spells of level ${Math.max(1, Math.floor(cr / 4))} or below (officials scale this with CR — the CR 21 Lich casts Fireball at will, but a low-CR caster gets utility only); anything higher belongs under "1/Day each" or "2/Day each".` : ''}

Ability scores: choose scores that fit the concept, and make the creature's ATTACK ability its highest non-CON score — STR or DEX for weapon strikers, INT, WIS, or CHA for magical strikers. The engine sets that ability's modifier to ${signed(requiredAttackModFor(chassis))} so the attack bonus derives from it. Key save effects to abilities the concept justifies being strong.

Return ONLY a JSON object in exactly this shape (no markdown fences, no commentary). Omit optional fields rather than emitting empty ones. Do NOT include ac, hp, initiative, CR, XP, or PB — those are stamped for you:

${JSON.stringify(schema, null, 2)}

Here is a real SRD 2024 statblock as a style reference (structure and phrasing, NOT numbers):

${JSON.stringify(exemplar, null, 2)}

Apply ALL the RULES from the top of this prompt. Return ONLY the JSON object.`;
}

// 2014-edition prompt: identical numeric skeletons and structure, classic
// phrasing rules, hand-written exemplar. Same JSON schema — assembly and lint
// run on the shared internal model before legacy conversion.
function buildGenerationPrompt2014({ concept, description, cr, chassis, plan, caster, numbers, atkMod, atkDmg, saveDmg, aoeDmg, novaDmg, resolvedType = null }) {
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
2. Attack lines use EXACTLY this skeleton: Melee Weapon Attack: ${signed(chassis.attack_bonus)} to hit, reach 5 ft., one target. Hit: ${atkDmg.avg} (${atkDmg.dice}) <damage type> damage. (Ranged: Ranged Weapon Attack: ${signed(chassis.attack_bonus)} to hit, range 60 ft., one target. Hit: same skeleton.) The "+ ${Math.max(0, atkMod)}" is the attack ability's modifier — never change it. The skeleton's damage is the attack's TOTAL; to use two damage types, shrink the dice and add a small dice-only rider of the second type, keeping the combined average at or below ${atkDmg.avg} — never a zero rider. Non-damage riders (conditions, pushes) are welcome.
3. Saving-throw effects use classic forms: "The target must make a DC ${chassis.save_dc} <Ability> saving throw, taking ${saveDmg.avg} (${saveDmg.dice}) <type> damage on a failed save, or half as much damage on a successful one." (save damage is pure dice, no flat bonus; AREA effects — cones, lines, bursts — use about ${aoeDmg.avg} (${aoeDmg.dice}) instead, never the single-target number) — or for conditions: "must succeed on a DC ${chassis.save_dc} <Ability> saving throw or be knocked prone / become frightened / be poisoned...".
4. Conditions, damage types, and game terms are lowercase in prose: "knocked prone", "frightened", "slashing damage", "hit points".
5. Third person only, in-world only — never "you"/"your", never rulebook or design references.
6. Multiattack names the creature's attack actions exactly as YOU named them elsewhere in this statblock. Every attack you reference MUST exist as a written attack action.
7. Defensive traits must be NARROW. Never write a passive trait that halves or reduces incoming damage or grants resistance to everything — the fixed AC/HP already price the creature's defenses. Mitigating a single attack is fine ONLY as a reaction (once per round).
8. A reaction is not a free action — every Reactions entry begins by stating its trigger in prose: "When <specific event>, the <creature> <responds>." Never write a reaction that can simply be used on the creature's turn.
9. Ability names are plain English that says what the ability does — an invented or coined word may be the CREATURE's name, never an ability's name. The creature's own name reads like a Monster Manual entry: a real-word compound, a folk name, or a coined word — never a flat description of its attack routine.
10. The type follows the creature's SUBSTANCE: animated objects, machines, and worked materials are constructs (an animated sword or needle is never a beast); spirits and remains of the dead are undead; only living natural animals are beasts. A giant is a massive humanoid-shaped person (an ogre, a titan) — a crawling creature, a vermin multitude, or a plant is NEVER a giant; fungus and vegetation creatures are plants; a cloud, cluster, or multitude of small creatures is a swarm of its creature type. Beasts are natural animals: INT 3 or lower, and NEVER spellcasters. If the concept's substance contradicts the requested type, follow the SUBSTANCE.

CONCEPT: ${concept}
${resolvedType ? `CREATURE TYPE: ${resolvedType} — ${TYPE_ESSENCES[resolvedType] ?? 'build from what that type IS'}. Express the type in the creature's MECHANICS and substance — its abilities should only make sense for a ${resolvedType}. Languages and name alone do not make a type.` : ''}
CHALLENGE RATING: ${crKeyFor(cr)}${chassis.archetype ? `\nCOMBAT ROLE: ${chassis.archetype}` : ''}
${description ? `SPECIAL INSTRUCTIONS FROM THE USER: ${description}\n` : ''}
DAMAGE-TYPE DISCIPLINE: choose ONE energy damage type that follows from the creature's TYPE essence and substance — never from its mood or name (a grim-named Elemental still deals its element, not Necrotic); a second type only when its anatomy genuinely earns it (a molten body may burn AND crush). Official monsters almost never exceed two. Never pair types with no shared physical cause (Radiant tendrils on a body that also puffs Poison spores is a failure).
MOTIF FATIGUE: spore clouds, poison spores, and fungal-haze mechanics are heavily overused across generations — use them ONLY if the concept's substance is actually fungal.
ANATOMY COHERENCE: the creature's body parts, movement modes, and abilities must agree — fins mean a Swim speed, wings mean a Fly speed, a burrower has claws or a drill-shaped body. Never give an ability an anatomical name the statline contradicts.
DESIGN COHERENCE: before writing entries, decide ONE combat identity — how this creature opens a fight, what it does every round after that, and its temperament under pressure. Every trait, action, and reaction must serve that identity; cut any ability that a GM running this creature would never actually use. Abilities must interlock (a setup ability must have a payoff ability; a payoff must have its setup), never sit side-by-side as disconnected ideas.

STRUCTURE (exact requirements):
- Traits: between ${plan.traits.min} and ${plan.traits.max} entries.
- Actions: between ${plan.actions.min} and ${plan.actions.max} entries.
- Defense budget: ${defenses.points} points. Resisting a common type (bludgeoning, piercing, slashing, fire, lightning) costs 1 point; uncommon (cold, acid, thunder, necrotic, radiant, poison) costs 1/2; rare (psychic, force) costs 1/4. IMMUNITY costs double the resistance price. FREE (no cost): the type's canonical defense (undead/construct/elemental: poison; ooze: acid; celestial: radiant; fiend: fire), any damage type the creature itself deals, and the type matching its body material (an ice-bodied creature resists cold free) — DO give it those thematic defenses. A creature whose BODY IS the element takes its signature type as a free IMMUNITY, never mere resistance — a magma-bodied creature is Immune to Fire (the Fire Elemental rule; dragons are Immune to their breath type). Merely DEALING a type earns resistance at most (the Dragon Turtle breathes fire yet only resists it). The fixed HP already prices typical defenses. Condition immunities are free-form.
${slotInstructions(plan, numbers)}
${chassis.archetype === 'swarm' ? `- The "type" field must be "Swarm of Tiny <Creature>" (e.g. "Swarm of Tiny Beasts") — this overrides the type list in the schema below. Size is Medium or Large.
` : ''}${novaDmg ? `- The nova/ambush mechanic may deal up to ${novaDmg.avg} (${novaDmg.dice}) once per fight.\n` : ''}${caster ? `- The creature is a spellcaster: include a "Spellcasting" trait in 2014 style: "The creature's spellcasting ability is <ability> (spell save DC ${chassis.save_dc}). It can innately cast the following spells: At will: ... 1/day each: ..." The chosen ability's SCORE must be at least ${(chassis.save_dc - 8 - chassis.pb) * 2 + 10} so that DC ${chassis.save_dc} = 8 + PB + its modifier. Choose the ability by IDENTITY: innate casters (dragons, elementals, fey, demons, spirits, monstrosities) use Charisma; studied casters (wizards, liches, scheming devils, alien intellects) use Intelligence; priestly or nature casters use Wisdom. When unsure, prefer Charisma. Use only well-known SRD spells, comma-separated on one line — never hyphens or bullet lists. "At will" spells: cantrips plus spells of level ${Math.max(1, Math.floor(cr / 4))} or below; anything higher belongs under "1/day each".\n` : ''}${plan.legendary.status === 'required' || plan.legendary.status === 'recommended' ? `- Do NOT write a preamble/intro entry in the Legendary Actions section — the sheet renders one automatically. Provide only the option entries themselves.\n` : ''}
Ability scores: choose scores that fit the concept, and make the creature's ATTACK ability its highest non-CON score — STR or DEX for weapon strikers, INT, WIS, or CHA for magical strikers. The engine sets that ability's modifier to ${signed(atkMod)} so the attack bonus derives from it. Key save effects to abilities the concept justifies being strong.

Return ONLY a JSON object in exactly this shape (no markdown fences, no commentary). Omit optional fields rather than emitting empty ones. Do NOT include ac, hp, CR, XP, or PB — those are stamped for you:

${JSON.stringify(schema, null, 2)}

Here is a statblock in the correct classic style (structure and phrasing, NOT numbers):

${JSON.stringify(EXEMPLAR_2014, null, 2)}

Apply ALL the RULES from the top of this prompt. Return ONLY the JSON object.`;
}

// ---------------------------------------------------------------------------
// Assembly — engine numbers stamped over the LLM's flavor
// ---------------------------------------------------------------------------

export function assembleMonster(llmJson, { cr, chassis, plan, archetypeName, archetypeSource = 'user', resolvedType = null }) {
  const stats = {};
  for (const s of STAT_ORDER) {
    stats[s] = Math.min(30, Math.max(1, Math.round(llmJson.stats?.[s] ?? 10)));
  }

  // Attack-stat coherence (grognard contract): the stamped attack bonus must
  // be reachable as ability mod + PB. The LLM's own score ranking names the
  // striker stat (attackStatFor — casters keep INT/WIS/CHA); the engine
  // raises that stat to the chassis-required mod. RAISE-ONLY: official
  // blocks legitimately print attacks BELOW mod + PB (17/329 in the corpus,
  // e.g. Will-o'-Wisp DEX 28 with a +4 attack) but never above it.
  const requiredMod = requiredAttackModFor(chassis);
  const atkStat = attackStatFor(stats);
  if (modOf(stats[atkStat]) < requiredMod) {
    stats[atkStat] = Math.min(30, requiredMod * 2 + 10);
  }

  // Slot annotations belong in the JSON slot FIELD; any "(slot: ...)"
  // echoed into entry text strips at assembly (nested-paren-safe — live:
  // a duplicated action carried "(slot: save-based action imposing a
  // condition (2024 capitalized condition names))" verbatim).
  for (const list of Object.values(llmJson.sections ?? {})) {
    for (const e of list ?? []) {
      if (typeof e?.text === 'string') {
        e.text = e.text.replace(/\s*\((?:slot|fills? slot):[^()]*(?:\([^()]*\)[^()]*)*\)/gi, '').trim();
      }
    }
  }

  const sections = {};
  for (const [sectionName, entries] of Object.entries(llmJson.sections ?? {})) {
    if (!Array.isArray(entries) || entries.length === 0) continue;
    sections[sectionName] = entries
      .filter((e) => e && e.name && e.text)
      .map((e) => {
        // Strip zero-damage riders ("plus 0 fire damage") — malicious
        // compliance with the damage-total rule; never legitimate.
        const text = e.text.replace(/\s*,?\s*plus 0(?:\s*\([^)]*\))?\s+\w+ damage/gi, '');
        // Entry names never carry a leading article ("The Unstable" →
        // "Unstable") — zero corpus occurrences of "The "-prefixed names.
        // A cost suffix inside its OWN section is redundant, and doubles on
        // the legacy fold ("Disengage (Bonus Action) (Bonus Action)" — live).
        let name = e.name.replace(/^the\s+/i, '');
        if (sectionName === 'Bonus Actions') name = name.replace(/\s*\(Bonus Action\)\s*$/i, '');
        if (sectionName === 'Reactions') name = name.replace(/\s*\(Reaction\)\s*$/i, '');
        return e.slot ? { name, text, slot: e.slot } : { name, text };
      });
  }

  // NOTE — no per-save-ability stamp, on purpose (reverted after the Slinky
  // Boulder finding): the ability named in "DC n <Ability> saving throw" is
  // what the TARGET rolls, not what sources the monster's DC (a dragon's
  // breath forces DEX saves but derives from the dragon's CON). Raising the
  // target-side stat inflated statlines (every mentioned save type trended
  // toward 30 at high CR). Derivability is already guaranteed: the chassis
  // caps keep save_dc ≤ attack_bonus + 8 at every CR × archetype, so the
  // stamped striker stat always satisfies DC ≤ 8 + PB + mod.

  // Spellcasting-ability coherence (raise-only, mirrors the striker stamp —
  // this is SOURCE-side, so the Slinky Boulder objection doesn't apply): the
  // caster instruction pins spell save DC to the chassis and demands a score
  // that supports it, but the model sometimes keeps the DC and leaves the
  // score low (live finding: a DC 25 caster on INT 16 — the spell-dc-ability
  // reject then has no entry-level fix, since the DC itself is correct).
  // Score = (DC − 8 − PB) × 2 + 10, the exact score whose mod closes the gap.
  {
    const NAME_TO_ABBR = { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' };
    // Paren-OPEN like the lint's SPELL_DC_RES — a closing \) died on the
    // live "(spell save DC 24, +16 to hit with spell attacks)" continuation,
    // so the stamp never fired and a DC 24 caster shipped on WIS 20.
    const SPELL_ABILITY_RES = [
      /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability \(spell save DC (\d+)/i,
      /spellcasting ability is (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\s*\(spell save DC (\d+)/i,
    ];
    outer: for (const entries of Object.values(sections)) {
      for (const entry of entries) {
        for (const re of SPELL_ABILITY_RES) {
          const m = re.exec(entry.text);
          if (!m) continue;
          const abbr = NAME_TO_ABBR[m[1][0].toUpperCase() + m[1].slice(1).toLowerCase()];
          const required = (Number(m[2]) - 8 - chassis.pb) * 2 + 10;
          if (abbr && required <= 30 && required > (stats[abbr] ?? 10)) stats[abbr] = required;
          // The inverse mismatch — a score OVERSHOOTING the printed DC
          // (live: CHA 22 under "spell save DC 17" at PB +4; derived 18,
          // inside the lint rule's ±1 tolerance) — rewrites the DC (and any
          // spell-attack bonus) to the derivation. Corpus DCs always derive
          // exactly; the chassis DC stays the floor via the raise above.
          if (abbr) {
            const mod = modOf(stats[abbr]);
            const derived = 8 + chassis.pb + mod;
            if (derived !== Number(m[2])) {
              entry.text = entry.text
                .replace(new RegExp(`spell save DC ${m[2]}\\b`), `spell save DC ${derived}`)
                .replace(/\+\d+ to hit with spell attacks/, `${signed(chassis.pb + mod)} to hit with spell attacks`);
            }
          }
          break outer;
        }
      }
    }
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
  const sensesSpecial = (llmJson.senses_special ?? '').trim()
    // Corpus lowercases sense names ("darkvision 120 ft.").
    .replace(/\b(Blindsight|Darkvision|Tremorsense|Truesight)\b/g, (w) => w.toLowerCase())
    // The blind-beyond clause is always parenthesized in officials
    // ("blindsight 60 ft. (blind beyond this radius)"), never comma-joined.
    .replace(/,\s*(blind beyond this radius)/i, ' ($1)')
    // The COMPUTED Passive Perception is authoritative — a model that
    // embeds its own doubles the line (live: "…Passive Perception 18;
    // Passive Perception 19" on the Grave Vow).
    .replace(/[;,]?\s*Passive Perception \d+/gi, '')
    .replace(/[;,]\s*$/, '')
    .trim();
  const senses = sensesSpecial
    ? `${sensesSpecial}; Passive Perception ${perception}`
    : `Passive Perception ${perception}`;

  const size = HIT_DIE_BY_SIZE[llmJson.size] ? llmJson.size : 'Medium';
  const crStr = crKeyFor(cr);
  const xp = challengeRatings[crStr]?.XP ?? 0;
  // Printed Initiative sits ABOVE the raw DEX mod from CR 8 up (measured:
  // 29/29 printed CR 15+ blocks stamp it, modal +4 — see cr-table _meta).
  const crNumForInit = { '1/8': 0.125, '1/4': 0.25, '1/2': 0.5 }[String(cr)] ?? Number(cr) ?? 0;
  const initBand = crNumForInit <= 7 ? '0-7' : crNumForInit <= 14 ? '8-14' : crNumForInit <= 20 ? '15-20' : '21-30';
  const initiativeBonus = modOf(stats.DEX)
    + (crTable._meta.initiative?.delta_by_band?.[initBand] ?? 0);
  // HP follows the CON-coherent formula exactly (bonus = dice × CON mod);
  // the small drift off the chassis target stays well inside the HP band.
  const hpFormula = hpFormulaFor(chassis.hp, size, modOf(stats.CON));
  const hp = Math.max(1, avgDice(hpFormula) ?? chassis.hp);

  // Creature-type stamp (owner call, batch 8: an amber-shard flyer shipped
  // as Humanoid): the resolve/synthesis micro-call decides the type from the
  // concept's SUBSTANCE, and the engine stamps it like a number. The model's
  // own type survives only when no resolved type exists, when it emitted a
  // swarm form (the stamp never breaks "Swarm of Tiny X"), or when the
  // resolved value isn't canonical.
  const CANONICAL_TYPES = ['Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon', 'Elemental', 'Fey', 'Fiend', 'Giant', 'Humanoid', 'Monstrosity', 'Ooze', 'Plant', 'Undead'];
  let creatureType = llmJson.type || 'Monstrosity';
  const stampType = resolvedType && CANONICAL_TYPES.find((t) => t.toLowerCase() === String(resolvedType).trim().toLowerCase());
  if (stampType && !/^swarm/i.test(creatureType)) creatureType = stampType;

  const monster = {
    // Names never carry a leading article — prose and display add "the" —
    // and always render Title Case regardless of what the model wrote.
    name: titleCaseName((llmJson.name || 'Unnamed Creature').replace(/^the\s+/i, '')),
    size,
    type: creatureType,
    alignment: llmJson.alignment || 'Unaligned',
    ac: chassis.ac,
    hp,
    hp_formula: hpFormula,
    // 2024 capitalizes movement modes ("Burrow 20 ft., Fly 60 ft.") but not
    // the "(hover)" tag (live drift: lowercase "burrow" in a speed line).
    speed: (llmJson.speed || '30 ft.').replace(/\b(burrow|climb|fly|swim)\b/g, (w) => w[0].toUpperCase() + w.slice(1)),
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
  // "none"/"None" written out is model drift — the field stays unset and
  // the render layer supplies the official empty form ("None" in 2024,
  // the em-dash via toLegacyModel in 2014).
  // "does not/cannot speak" normalizes to the corpus form (31/31 official
  // mute-languages lines write "can't speak"; recurring live drift).
  if (llmJson.languages && !/^none$/i.test(llmJson.languages.trim())) {
    monster.languages = llmJson.languages
      .replace(/^([A-Z][\w, ]+?)\s*\(can't speak\)$/i, "understands $1 but can't speak")
      .replace(/\b(?:does not|doesn't|cannot) speak\b/gi, "can't speak")
      // "Infernal, understands Common but can't speak" — a spoken language
      // contradicting the mute clause (live); fold it into the understood
      // list (0 mixed shapes in either corpus).
      .replace(/^([A-Z][\w' ]+(?:, [A-Z][\w' ]+)*), understands (.+?) but can't speak/,
        "understands $1 and $2 but can't speak");
    // The line always starts capitalized (21/24 printed "Understands" lines
    // do; our output was coin-flipping per generation — a machine tell).
    monster.languages = monster.languages.charAt(0).toUpperCase() + monster.languages.slice(1);
  }
  // Defense LINES list bare types — "poison damage" inside the line is model
  // drift (live: "Damage Immunities: poison damage"). Token-level strip only;
  // sentence-form values (Half-Dragon's "Damage type chosen for...") survive.
  // "exhausted" is the condition misnamed (live: an Immunities line carried
  // it) — normalized so the condition classifier can route it.
  const stripDamageWord = (v) => v
    ?.replace(/\b(acid|bludgeoning|cold|fire|force|lightning|necrotic|piercing|poison|psychic|radiant|slashing|thunder) damage\b/gi, '$1')
    .replace(/\bexhausted\b/gi, 'exhaustion');
  // Empty segments sanitize: a condition-only line arrives as "; Charmed,
  // Frightened" when the model leaves the damage half blank (live:
  // Gliding Shade shipped "Immunities ; Charmed, Frightened").
  const tidyDefense = (v) => stripDamageWord(v)
    .replace(/^\s*;\s*/, '').replace(/;\s*$/, '').replace(/;\s*;/g, ';').trim();
  if (llmJson.resistances) monster.resistances = tidyDefense(llmJson.resistances);
  if (llmJson.immunities) monster.immunities = tidyDefense(llmJson.immunities);
  if (llmJson.vulnerabilities) monster.vulnerabilities = tidyDefense(llmJson.vulnerabilities);
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
/** 2014 legendary-cost convention: "(2 Actions)" → "(Costs 2 Actions)".
 * 2024 dropped costs entirely (zero corpus occurrences), so this runs only
 * at the legacy gates. */
export function normalizeLegendaryCost(name) {
  return (name ?? '').replace(/\((\d+) Actions?\)/, '(Costs $1 Actions)');
}

const DAMAGE_TYPE_WORD = /(bludgeoning|piercing|slashing|fire|lightning|cold|acid|thunder|necrotic|radiant|poison|psychic|force)/i;
// Every word that gets capitalized in 2024 defense lines: damage types,
// conditions, and Exhaustion.
const DEFENSE_TERM_RE = /\b(bludgeoning|piercing|slashing|fire|lightning|cold|acid|thunder|necrotic|radiant|poison|psychic|force|blinded|charmed|deafened|frightened|grappled|incapacitated|invisible|paralyzed|petrified|poisoned|prone|restrained|stunned|unconscious|exhaustion)\b/gi;

/**
 * 2014 defense-line ordering: plain types first, the "from nonmagical
 * attacks" clause LAST after a semicolon — mid-list the qualifier reads as
 * if it covered the types after it too (live finding: "bludgeoning,
 * piercing, slashing from nonmagical attacks, acid, lightning"). The bare
 * type tokens immediately preceding the clause belong to it.
 */
export function normalizeNonmagicalClause(value) {
  if (!value || !/nonmagical/i.test(value)) return value;
  const tokens = value.split(/[;,]/).map((s) => s.trim()).filter(Boolean);
  const clauseIdx = tokens.findIndex((t) => /nonmagical/i.test(t));
  let start = clauseIdx;
  while (
    start > 0
    && tokens[start - 1].split(/\s+/).length === 1
    && DAMAGE_TYPE_WORD.test(tokens[start - 1])
  ) start--;
  const clauseTypes = [
    ...tokens.slice(start, clauseIdx).map((t) => t.toLowerCase()),
    DAMAGE_TYPE_WORD.exec(tokens[clauseIdx])?.[1].toLowerCase() ?? '',
  ].filter(Boolean);
  const rest = [...tokens.slice(0, start), ...tokens.slice(clauseIdx + 1)];
  const clauseStr = (clauseTypes.length > 1
    ? `${clauseTypes.slice(0, -1).join(', ')}, and ${clauseTypes[clauseTypes.length - 1]}`
    : clauseTypes[0]) + ' from nonmagical attacks';
  return rest.length ? `${rest.join(', ')}; ${clauseStr}` : clauseStr;
}

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
    // Guard: a model-emitted name that ALREADY carries the suffix must not
    // double it ("Disengage (Bonus Action) (Bonus Action)" — live finding).
    ...entryList('Bonus Actions').map((e) => ({ ...e, name: /\(Bonus Action\)\s*$/i.test(e.name) ? e.name : `${e.name} (Bonus Action)` })),
    ...entryList('Reactions').map((e) => ({ ...e, name: /\(Reaction\)\s*$/i.test(e.name) ? e.name : `${e.name} (Reaction)` })),
  ];

  // 2014 lowercases the type line — except the size term inside a swarm
  // type ("Medium swarm of Tiny beasts").
  const typeLower = m.type.toLowerCase().replace(
    /^(swarm of )(tiny|small|medium|large|huge|gargantuan)\b/,
    (all, p, sz) => p + sz[0].toUpperCase() + sz.slice(1)
  );
  const legacy = {
    name: m.name,
    type_and_alignment: `${m.size} ${typeLower}${m.subtype ? ` (${m.subtype.toLowerCase()})` : ''}, ${m.alignment.toLowerCase()}`,
    armor_class: String(m.ac),
    hit_points: `${m.hp} (${m.hp_formula})`,
    // 2014 lowercases movement modes; 2024 capitalizes them.
    speed: (m.speed ?? '').replace(/\b(Climb|Fly|Swim|Burrow|Hover)\b/g, (w) => w.toLowerCase()),
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
  // 2014 lowercases defense lines ("bludgeoning, piercing", "poisoned");
  // the internal/2024 convention capitalizes, so normalize at the gate.
  if (res.damage) legacy.damage_resistances = normalizeNonmagicalClause(res.damage).toLowerCase();
  if (imm.damage) legacy.damage_immunities = normalizeNonmagicalClause(imm.damage).toLowerCase();
  if (imm.conditions) legacy.condition_immunities = imm.conditions.toLowerCase();
  const legendary = entryList('Legendary Actions')
    .map((e) => ({ ...e, name: normalizeLegendaryCost(e.name) }));
  if (legendary.length) legacy.legendary_actions = legendary;
  return legacy;
}

// ---------------------------------------------------------------------------
// Edition conversion — switch a saved monster between 2024 and 2014
// ---------------------------------------------------------------------------

/**
 * Rebuild the internal (sections-based) model from a legacy 2014 block — the
 * inverse of toLegacyModel. Deterministic: numbers and structure map directly;
 * only the entry TEXTS stay 2014-phrased (convertEdition's LLM call rewrites
 * those). Works for pre-engine monsters too (missing fields get fallbacks).
 */
export function fromLegacyModel(legacy) {
  const stats = parseLegacyAttributes(legacy.attributes)
    ?? Object.fromEntries(STAT_ORDER.map((s) => [s, 10]));
  const saves = Object.fromEntries(STAT_ORDER.map((s) => [s, modOf(stats[s])]));
  for (const m of (legacy.saving_throws ?? '').matchAll(/(STR|DEX|CON|INT|WIS|CHA)\s*([+-]\s*\d+)/g)) {
    saves[m[1]] = Number(m[2].replace(/\s/g, ''));
  }

  // "Large aberration (titan), lawful evil" → size/type/subtype/alignment.
  const ta = /^\s*(\S+)\s+([^(,]+?)\s*(?:\(([^)]+)\))?\s*,\s*(.+)$/.exec(legacy.type_and_alignment ?? '') ?? [];
  const size = titleCaseName(ta[1] ?? 'Medium');

  const hp = /(\d+)\s*(?:\(([^)]*)\))?/.exec(legacy.hit_points ?? '') ?? [];
  const crToken = String(legacy.challenge_rating ?? '').match(/\d+\/\d+|\d+(\.\d+)?/)?.[0] ?? '1';
  const cr = crNumberFor(crToken);
  const xpMatch = /\(([\d,]+)\s*XP\)/.exec(legacy.challenge_rating ?? '');

  const sections = {};
  const put = (name, e) => {
    (sections[name] ??= []).push({ name: e.name, text: e.description ?? e.text ?? '' });
  };
  for (const e of legacy.abilities ?? []) {
    const fold = /^(.*)\s+\((Bonus Action|Reaction)\)$/.exec(e.name);
    if (fold) put(fold[2] === 'Reaction' ? 'Reactions' : 'Bonus Actions', { ...e, name: fold[1] });
    else put('Traits', e);
  }
  for (const e of legacy.actions ?? []) put('Actions', e);
  for (const e of legacy.legendary_actions ?? []) put('Legendary Actions', e);

  // The internal/2024 convention capitalizes damage types and conditions
  // ("Poison; Poisoned"); 2014 source lines are lowercase.
  const capDefense = (v) => (v ?? '').replace(DEFENSE_TERM_RE, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
  const immunities = [legacy.damage_immunities, legacy.condition_immunities]
    .filter(Boolean).map(capDefense).join('; ');

  const model = {
    name: legacy.name,
    size,
    type: titleCaseName(ta[2] ?? 'Monstrosity'),
    alignment: titleCaseName(ta[4] ?? 'Unaligned'),
    ac: parseInt(legacy.armor_class, 10) || 10,
    // A legacy formula is kept verbatim (conversion never rebalances); only
    // an INVENTED fallback formula pins hp to its own CON-coherent average.
    hp: hp[2]
      ? (Number(hp[1]) || 1)
      : Math.max(1, avgDice(hpFormulaFor(Number(hp[1]) || 1, size, modOf(stats.CON))) ?? (Number(hp[1]) || 1)),
    hp_formula: hp[2] || hpFormulaFor(Number(hp[1]) || 1, size, modOf(stats.CON)),
    speed: (legacy.speed ?? '').replace(/\b(climb|fly|swim|burrow|hover)\b/g, (w) => w[0].toUpperCase() + w.slice(1)),
    stats,
    saves,
    initiative_bonus: modOf(stats.DEX),
    initiative_score: 10 + modOf(stats.DEX),
    senses: (legacy.senses ?? '').replace('passive Perception', 'Passive Perception'),
    cr,
    cr_str: crKeyFor(cr),
    xp: xpMatch
      ? Number(xpMatch[1].replace(/,/g, ''))
      : (challengeRatings[crKeyFor(cr)]?.XP ?? 0),
    pb: parseInt(String(legacy.proficiency_bonus ?? '').replace('+', ''), 10)
      || (challengeRatings[crKeyFor(cr)]?.proficiency_bonus ?? 2),
    format: '2024',
    sections,
  };
  // Same display string assembleMonster stamps — the sidebar and CR sorting
  // read challenge_rating on every saved monster regardless of edition.
  model.challenge_rating = `${model.cr_str} (XP ${model.xp.toLocaleString('en-US')}; PB ${signed(model.pb)})`;
  if (ta[3]) model.subtype = titleCaseName(ta[3]);
  if (legacy.archetype) model.archetype = legacy.archetype;
  if (legacy.archetype_source) model.archetype_source = legacy.archetype_source;
  if (legacy.skills && legacy.skills !== 'None') model.skills = legacy.skills;
  if (legacy.damage_resistances) model.resistances = capDefense(legacy.damage_resistances);
  if (immunities) model.immunities = immunities;
  if (legacy.languages && legacy.languages !== '—') model.languages = legacy.languages;
  if ((sections['Legendary Actions'] ?? []).length) model.legendary_uses = 3;
  return model;
}

const CONVERSION_RULES = {
  2014: `You are converting D&D statblock entries from 2024 (5.5e) phrasing to CLASSIC 2014 (5e) phrasing. Rewrite ONLY the wording — every number, die expression, DC, entry name, and mechanical effect stays EXACTLY the same.
- "*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Slashing damage." becomes "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage." (Ranged attacks likewise, keeping the range.)
- "*<Ability> Saving Throw*: DC n, <targets>. *Failure:* <damage>. *Success:* Half damage only." becomes "<targets> must make a DC n <Ability> saving throw, taking <damage> on a failed save, or half as much damage on a successful one." Condition-only saves become "must succeed on a DC n <Ability> saving throw or <be/become condition>".
- Reactions: "*Trigger:* <event>. *Response:* <effect>." becomes "When <event>, <the creature does the effect>."
- Conditions, damage types, and game terms go lowercase in prose: "is knocked prone", "frightened", "slashing damage", "hit points". Never "has the X condition" — write "is stunned". Never "Attack Roll:", never "*Failure:*"/"*Success:*"/"*Trigger:*" markers.
- 2024-only vocabulary must be translated: "Bloodied" becomes "has half of its hit points or fewer"; "each creature in a 5-foot Emanation originating from it" becomes "each creature within 5 feet of it"; an "N-foot-radius Emanation" becomes an "N-foot-radius sphere". Area shapes go lowercase: "15-foot cone", "the cone".
- 2024 spellcasting actions convert to the 2014 style: "The creature's spellcasting ability is <Ability> (spell save DC n). It can innately cast the following spells: ..."`,
  2024: `You are converting D&D statblock entries from classic 2014 (5e) phrasing to 2024 (5.5e) phrasing. Rewrite ONLY the wording — every number, die expression, DC, entry name, and mechanical effect stays EXACTLY the same.
- "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage." becomes "*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Slashing damage." — never "to hit", never "Weapon Attack", Damage Types Capitalized.
- Save effects use the structured skeleton as the WHOLE sentence: "*<Ability> Saving Throw*: DC n, <who saves, e.g. each creature in a 30-foot Cone>. *Failure:* <effect>. *Success:* <lesser effect>." Omit *Success:* entirely when success does nothing. Never "must make a" or "must succeed on".
- Conditions are Capitalized and phrased "has the X condition" (Prone, Frightened, Poisoned, ...). Game terms Capitalized: Hit Points, Opportunity Attack.
- Reactions become "*Trigger:* <the specific event>. *Response:* <what the creature does>."
- 2014 spellcasting traits convert to: "The <creature's name> casts one of the following spells, using <Ability> as the spellcasting ability (spell save DC n): ..." Spell names Title Case. The entry is named "Spellcasting".
- NEVER invert meaning: "is immune to the poisoned condition" stays an immunity (never "has the Poisoned condition"); a save's Success outcome keeps its original meaning (if success avoided a push, Success must still avoid it); never repeat an attack's damage inside its Failure clause.
- Keep the entry's SETUP sentence first (what the creature creates or does), then the save skeleton — never open with the skeleton and append the setup after the Success clause.`,
};

export function validateConversionResponse(jsonString, model) {
  const parsed = tryParse(jsonString);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;
  for (const [section, entries] of Object.entries(model.sections ?? {})) {
    const out = parsed[section];
    if (!Array.isArray(out) || out.length !== entries.length) return false;
    if (!entries.every((e, i) =>
      out[i] && out[i].name === e.name
      && typeof out[i].text === 'string' && out[i].text.trim() !== '')) return false;
  }
  return true;
}

// Only PHRASING rules gate a conversion — the monster keeps its numbers and
// content verbatim (a dialect change, not a rebalance), so balance rules
// (trait-mitigation, attack-damage-band, spell-dc-ability, defense budgets)
// and number-touching corrections (hp-formula, damage-dice) must not fire on
// pre-existing material they'd otherwise rewrite.
const CONVERSION_LINT_RULES = new Set([
  'phrasing-2014', 'phrasing-to-hit', 'phrasing-saving-throw',
  'phrasing-hybrid-save', 'condition-caps', 'term-caps', 'nonmagical',
  'reaction-trigger', 'phrasing-2024-in-2014', 'second-person',
  'bloodied-in-2014', 'emanation-in-2014', 'area-caps-in-2014',
  'condition-phrase-in-2014', 'phrasing-save-or', 'spell-tiers-inline',
  'epithet-self-reference', 'condition-caps-in-2014', 'vocab-adjacent',
  'prose-ft-abbrev', 'phrasing-hit-marker', 'area-term-caps',
  'damage-type-caps', 'success-no-effect', 'area-circle', 'spelling-centred',
  'success-half-phrasing', 'skeleton-fusion', 'trigger-outside-reactions',
  'duplicate-cross-section', 'self-afflicted-condition',
  'generic-self-reference', 'spellcasting-entry-name', 'failure-damage-echo',
  'action-passive-rider', 'inability-phrasing', 'vocab-register',
  // Owner call (batch 6): stripping "from nonmagical attacks" on 2014→2024
  // silently UPGRADED the B/P/S package; official 2024 reprints dropped the
  // physical types instead. The one sanctioned rebalance in conversion —
  // is2024-gated in lint, so 2024→2014 never sees it; the UI toasts it.
  'bps-resistance',
]);

/**
 * Switch a saved monster to the other edition (its `format` field decides the
 * direction). Structure and numbers map deterministically (toLegacyModel /
 * fromLegacyModel); one LLM call rewrites the entry texts into the target
 * edition's phrasing; the edition's phrasing lint then gates the result via
 * the usual ladder (deterministic fixes → one targeted entry-rewrite call).
 */
export async function convertEdition(monster, callLLM, { degraded = false } = {}) {
  const target = monster.format === '2024' ? '2014' : '2024';
  const model = target === '2014' ? monster : fromLegacyModel(monster);

  const entryPayload = Object.fromEntries(
    Object.entries(model.sections ?? {})
      .filter(([, es]) => es.length)
      .map(([s, es]) => [s, es.map((e) => ({ name: e.name, text: e.text }))])
  );
  const prompt = `${CONVERSION_RULES[target]}

THE MONSTER: ${model.name}.
ENTRIES TO CONVERT (grouped by section):
${JSON.stringify(entryPayload, null, 2)}

Return ONLY a JSON object with the SAME sections, SAME entry order, SAME entry names, and converted texts — no markdown fences, no commentary:
{"Traits": [{"name": "...", "text": "..."}], ...}`;

  const raw = await callLLM(prompt, (s) => validateConversionResponse(s, model));
  if (!raw) throw new Error('Empty conversion response');
  const parsed = tryParse(raw);

  let converted = {
    ...model,
    sections: Object.fromEntries(Object.entries(model.sections).map(([s, es]) =>
      [s, es.map((e, i) => ({ ...e, text: parsed[s]?.[i]?.text ?? e.text }))])),
  };

  const { chassis, plan } = buildContext(model.cr, model.archetype ?? 'balanced');
  // Chassis passed so chassis-gated rules in the conversion set (bps-
  // resistance) can fire; the set filter keeps every other chassis rule out.
  const phrasingFindings = (m) => lintStatblock(m, { edition: target, chassis }).findings
    .filter((f) => CONVERSION_LINT_RULES.has(f.rule));
  const firstPass = phrasingFindings(converted);
  converted = applyCorrections(converted, firstPass, { chassis });
  // Surface the sanctioned rebalance so the UI can toast it.
  // Partial physical packages dodge bps-resistance (needs all three) — but
  // any physical resistance the SOURCE qualified with "nonmagical" dies in
  // 2024 the same way (Treant-style unqualified partials are untouched:
  // the key is the source qualifier, not the shape).
  const sourceResistances = `${monster.damage_resistances ?? ''} ${monster.resistances ?? ''}`;
  let partialDropped = false;
  if (/nonmagical/i.test(sourceResistances) && converted.resistances) {
    const kept = converted.resistances.split(/[;,]/).map((t) => t.trim())
      .filter((t) => t && !/^(?:and )?(?:bludgeoning|piercing|slashing)$/i.test(t));
    if (kept.join(', ') !== converted.resistances) {
      partialDropped = true;
      converted.resistances = kept.join(', ') || undefined;
    }
  }
  const conversionNotes = partialDropped || firstPass.some((f) => f.rule === 'bps-resistance')
    ? ['Dropped the Bludgeoning/Piercing/Slashing resistance package — 2024 removed the "nonmagical" qualifier, and official reprints drop the physical resistances instead of upgrading them.']
    : [];
  if (conversionNotes.length) {
    // The dropped package must not survive as a TRAIT restatement ("it is
    // resistant to Bludgeoning... from nonmagical attacks" — live: Stony
    // Hide contradicted the stripped line).
    for (const es of Object.values(converted.sections ?? {})) {
      for (const e of es) {
        e.text = e.text
          // Clause-level first ("...stone, and it is resistant to B/P/S
          // from nonmagical attacks.") so the host sentence survives...
          .replace(/,\s*(?:and\s+)?(?:it\s+)?(?:is|has)\s+resistan\w*[^.!?;]*nonmagical[^.!?;]*/gi, '')
          // ...the grant-form flavor sentence dies whole ("...a mass of
          // animated bones that grant it resistance to ... nonmagical
          // weapons." — live, Bone Shroud).
          .replace(/[^.!?]*grants? (?:it|the [\w' -]+) resistan\w*[^.!?]*nonmagical[^.!?]*\.\s*/gi, '')
          // ...then whole sentences that ARE the restatement.
          .replace(/(?:^|(?<=\.\s))(?:It|The [\w' -]+?)\s+(?:is|has)\s+resistan\w*[^.!?]*nonmagical[^.!?]*\.\s*/g, '')
          .replace(/\s{2,}/g, ' ').trim();
      }
    }
    // A trait that WAS only the restatement is now empty — drop it.
    for (const [sec, es] of Object.entries(converted.sections)) {
      converted.sections[sec] = es.filter((e) => (e.text ?? '').trim());
    }
  }
  let rejects = phrasingFindings(converted).filter((f) => f.severity === 'reject');
  if (rejects.length) {
    converted = await rewriteFlaggedEntries(
      converted, rejects, { edition: target, chassis, plan, cr: model.cr }, callLLM
    );
    rejects = phrasingFindings(converted).filter((f) => f.severity === 'reject');
    if (rejects.length) {
      if (degraded) {
        logger.warn('Degraded-model mode: conversion shipped with phrasing warts:', rejects.map((f) => f.rule));
      } else {
        throw validationError('Conversion failed lint', rejects);
      }
    }
  }

  // Regen params + provenance the generator saves on every monster survive
  // the shape change so Regenerate/selectMonster keep working.
  const meta = {};
  for (const k of ['monsterName', 'monsterDescription', 'selectedChallengeRating', 'caster', 'monsterType', 'concept_seed']) {
    if (monster[k] !== undefined) meta[k] = monster[k];
  }

  if (target === '2014') return { ...toLegacyModel(converted), ...meta };
  if ((converted.sections['Legendary Actions'] ?? []).length && !converted.legendary_uses) {
    converted.legendary_uses = 3;
  }
  const result = { ...converted, format: '2024', ...meta };
  // Transient — the caller toasts and deletes this before persisting.
  if (conversionNotes.length) result._conversionNotes = conversionNotes;
  return result;
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
    .replace(/\bopportunity attack\b/g, 'Opportunity Attack')
    .replace(/\bas an? bonus action\b/g, 'as a Bonus Action')
    .replace(/\bas an? reaction\b/g, 'as a Reaction')
    .replace(/\badvantage\b/g, 'Advantage').replace(/\bdisadvantage\b/g, 'Disadvantage')
    .replace(/\blong rest\b/g, 'Long Rest').replace(/\bshort rest\b/g, 'Short Rest')
    .replace(/\bspeed\b/g, 'Speed')],
  ['condition-caps', (t) => t.replace(LOWERCASE_CONDITIONS_G, (m) => m[0].toUpperCase() + m.slice(1))],
  ['phrasing-to-hit', (t) => t.replace(/(Attack Roll:\*?\s*\+\d+)\s+to hit/g, '$1')],
  ['second-person', (t) => t.replace(/\byours\b/gi, 'its').replace(/\byour\b/gi, 'its')],
  ['phrasing-save-or', (t) => t.replace(/\bmust (also )?make (an? DC \d+ [A-Za-z]+ saving throw) or\b/g,
    (m, also, rest) => `must ${also ?? ''}succeed on ${rest} or`)],
  ['area-circle', (t) => t.replace(/(\d+-foot(?:-radius)?) circle\b/gi, '$1 Sphere')],
  ['spelling-centred', (t) => t.replace(/centred/g, 'centered')],
  ['prone-duration', (t) => t.replace(/\b((?:the [Pp]rone condition|knocked [Pp]rone|falls? [Pp]rone)) (?:until the (?:end|start) of [^,.]+|for \d+ [^,.]+)/g, '$1')],
  ['per-combat-vocab', (t) => t.replace(/\bper (?:combat|encounter)\b/gi, 'per day')],
  ['orphan-repeat-save', (t) => t
    .replace(/\s*(?:The (?:target|creature) can )?[Rr]epeats? the sav(?:e|ing throw)[^.]*\.\s*/g, ' ')
    .replace(/\s*The (?:target|creature) (?:can )?repeats? the sav(?:e|ing throw)[^.]*\.\s*/g, ' ')
    .replace(/\s{2,}/g, ' ').trim()],
  ['emanation-form', (t) => t
    .replace(/(\d+)-foot-radius Emanation/gi, '$1-foot Emanation')
    .replace(/Emanation cent(?:er|r)ed on/gi, 'Emanation originating from')
    .replace(/within (an? \d+-foot Emanation)/gi, 'in $1')],
  ['line-dimensions', (t) => t
    .replace(/\b(\d+)-foot Line\b/g, '$1-foot-long, 5-foot-wide Line')
    .replace(/(-foot-wide Line) that is \d+ feet wide/gi, '$1')],
  ['success-half-only', (t) => t.replace(/(Success:\*?\s*)Half damage,? and (?:no |the (?:target|creature) (?:isn't|is not) )[^.]*\./gi, '$1Half damage only.')],
  ['entry-name-meta-paren', (t) => t], // name-level fix — handled in applyCorrections
  ['garbled-condition-grammar', (t) => t.replace(/\bbe has the\b/g, 'have the')],
  ['grapple-restrain-linkage', (t) => t.replace(
    /(Grappled condition \(escape DC \d+\)) and the Restrained condition/g,
    '$1. Until the grapple ends, the target also has the Restrained condition')],
  ['rider-flat-bonus', (t) => t.replace(/\bplus \d+\s*\((\d+)d(\d+)\s*[+-]\s*\d+\)/g,
    (m, n, die) => `plus ${Math.floor((Number(n) * (Number(die) + 1)) / 2)} (${n}d${die})`)],
  ['ba-opener', (t) => t.replace(/^As a Bonus Action,?\s*(\w)/i, (m, c) => c.toUpperCase())],
  ['prone-vocab', (t) => t
    .replace(/\bfalls? Prone\b/g, 'has the Prone condition')
    .replace(/\bis knocked Prone\b/g, 'has the Prone condition')
    .replace(/\bknocked Prone\b/g, 'has the Prone condition')],
  ['rider-target-mismatch', (t) => {
    // On-hit riders: the saver IS the hit creature.
    let out = t.replace(/(On a hit,?\s*\*?[A-Z]\w+ Saving Throw\*?:?\s*DC \d+,\s*)one creature within \d+ feet/gi, '$1the target');
    // Rider saves inside ATTACK entries re-target the same way (live:
    // Forgetting Puncture's save aimed at "one creature within 5 feet"
    // after the attack already chose its target).
    if (/Attack Roll:/i.test(out)) {
      out = out.replace(/(Saving Throw\*?:?\s*DC \d+,\s*)one creature within \d+ feet/gi, '$1the target');
    }
    // Prose-range vs skeleton-range: prose wins.
    const prose = /within (\d+) feet of (?:it|the [\w' -]+?)\b/i.exec(out);
    if (prose) {
      out = out.replace(/(Saving Throw\*?:?\s*DC \d+,\s*one creature within )(\d+)( feet)/gi,
        (m, pre, n, post) => (n !== prose[1] ? `${pre}${prose[1]}${post}` : m));
    }
    return out;
  }],
  ['success-no-effect', (t) => t.replace(/\s*\*?Success:\*?\s*(?:No effect|No damage|None|The \w+ is not [A-Z]\w+)\.?/gi, '')],
  ['damage-type-caps', (t) => t.replace(DAMAGE_TYPES_LOWER_G, (m) => m[0].toUpperCase() + m.slice(1))],
  ['area-term-caps', (t) => t.replace(/\b(\d+-foot )(cone|line|sphere|cylinder|emanation|cube)\b/g,
    (m, p, a) => p + a[0].toUpperCase() + a.slice(1))],
  // 2014-target inverses: 2024 vocabulary leaked through conversion. Only
  // the confident shapes rewrite — anything left standing keeps its reject
  // and rides the fix ladder.
  ['bloodied-in-2014', (t) => t
    .replace(/\bis [Bb]loodied\b/g, 'has half of its hit points or fewer')
    .replace(/\b([Ww])hile [Bb]loodied\b/g, '$1hile it has half of its hit points or fewer')],
  ['emanation-in-2014', (t) => t
    .replace(/\bin an? (\d+)-foot [Ee]manation originating from\b/g, 'within $1 feet of')
    .replace(/\bin an? (\d+)-foot [Ee]manation\b/g, 'within $1 feet of it')
    .replace(/\b(\d+-foot-radius) [Ee]manation\b/g, '$1 sphere')
    .replace(/\ban? (\d+)-foot [Ee]manation\b/g, 'a $1-foot-radius sphere')],
  ['area-caps-in-2014', (t) => t.replace(/\b(\d+-foot(?:-radius|-long|-wide)? |[Tt]he )(Cone|Line|Sphere|Cylinder|Cube)\b/g,
    (m, p, a) => p + a.toLowerCase())],
  // Tier markers break onto their own lines, shedding the inline separator
  // ("darkness; 1/day each:" → "darkness\n\n1/day each:"), then casing
  // normalizes to the corpus forms ("At will:", "3/day each:"). The live
  // conversion emitted lowercase "at will:", which v1 missed entirely.
  ['spell-tiers-inline', (t) => t
    .replace(/[;,]?[ \t]+([Aa]t will:|\d+\/[Dd]ay each:)/g, '\n\n$1')
    .replace(/(^|\n)at will:/g, '$1At will:')
    .replace(/(^|\n)(\d+)\/Day each:/g, '$1$2/day each:')],
  // "has the exhaustion condition" is excluded — 2014 phrases exhaustion as
  // levels ("gains one level of exhaustion"), which needs the fix call.
  // Modals take the base verb ("can't have the Invisible condition" → "can't
  // be invisible" — live regression: the bare-verb rewrite produced "can't
  // are invisible"). A "have" with no recognized lead-in is a plural or
  // exotic construction — left standing for the fix ladder.
  ['vocab-adjacent', (t) => t.replace(/\badjacent to\b/gi, 'within 5 feet of')],
  ['half-as-much-phrasing', (t) => t.replace(/half as much on a success/gi, 'half as much damage on a success')],
  ['inability-phrasing', (t) => t.replace(/ha(?:s|ve) the inability to/gi, "can't")],
  ['vocab-register', (t) => t
    .replace(/attacks of opportunity/gi, 'opportunity attacks')
    .replace(/attack of opportunity/gi, 'opportunity attack')
    .replace(/\bmay\b/g, 'can')],
  ['prose-ft-abbrev', (t) => t
    .replace(/\b(within|up to|by) (\d+) ft\.(?=\s|$)/gi, '$1 $2 feet')
    .replace(/\ba (\d+) ft\. radius/gi, 'a $1-foot radius')
    .replace(/\b(\d+) ft\. away/gi, '$1 feet away')],
  // "Hit:" markers strip cleanly — 2024 states damage directly after the roll.
  ['phrasing-hit-marker', (t) => t.replace(/\s*\bHit(?: or Miss)?:\s*/g, ' ').replace(/\s{2,}/g, ' ').trim()],
  ['success-half-phrasing', (t) => t.replace(/(Success:\*?\s*)Half as much[^.]*\./gi, '$1Half damage only.')],
  ['skeleton-fusion', (t) => t
    .replace(/ and (\*?(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw:?\*?\s*DC)/g, '. $1')
    .replace(/([a-z]\w*): (\*?(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw:)/g, '$1. $2')],
  // Trigger/Response garble outside Reactions: vacuous self-triggers strip;
  // "Trigger: The X uses Y. Response: It does so." collapses to the deed.
  ['trigger-outside-reactions', (t) => t
    .replace(/\*?Trigger:\*?\s*(The [\w' -]+ uses [\w' -]+\.)\s*\*?Response:\*?\s*It does so\.?/i, '$1')
    .replace(/\*?Trigger:\*?\s*The [\w' -]+ (?:takes|uses) this action\.\s*\*?Response:\*?\s*/i, '')
    .replace(/\s{2,}/g, ' ').trim()],
  ['condition-caps-in-2014', (t) => t.replace(
    /([a-z,;] )(Blinded|Charmed|Deafened|Frightened|Grappled|Incapacitated|Invisible|Paralyzed|Petrified|Poisoned|Prone|Restrained|Stunned|Unconscious)\b/g,
    (m, pre, cond) => pre + cond.toLowerCase())],
  ['condition-phrase-in-2014', (t) => t.replace(
    /\b(?:(can't|cannot|can|couldn't|could|mustn't|must|may|might|won't|wouldn't|would|shall|shouldn't|should|to|longer|not|doesn't|does not|don't|do not) )?(has|have) the ([A-Za-z]\w*(?:(?:,? and |, )[A-Za-z]\w*)*) conditions?\b/g,
    (m, pre, verb, list) => {
      if (/\bexhaustion\b/i.test(list)) return m;
      const low = list.toLowerCase();
      if (/^(doesn't|does not)$/.test(pre ?? '')) return `is not ${low}`;
      if (/^(don't|do not)$/.test(pre ?? '')) return `are not ${low}`;
      if (pre) return `${pre} ${verb === 'has' ? 'is' : 'be'} ${low}`;
      return verb === 'has' ? `is ${low}` : m;
    })],
];

const DAMAGE_TYPES_LOWER_G = new RegExp(
  `\\b(${Object.keys(DEFENSE_WEIGHTS).join('|')})(?= damage\\b)`, 'g'
);

export function applyCorrections(monster, findings, { chassis }) {
  if (!findings.length) return monster;
  const correctable = findings.filter((f) => f.severity === 'correctable');

  let out = JSON.parse(JSON.stringify(monster));
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
    // The CON-coherent formula owns the exact number.
    out.hp = Math.max(1, avgDice(out.hp_formula) ?? out.hp);
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

  for (const f of correctable.filter(
    (x) => (x.rule === 'defense-count' || x.rule === 'defense-overlap' || x.rule === 'swarm-type' || x.rule === 'bps-resistance' || x.rule === 'resistance-unknown' || x.rule === 'defense-line-separator' || x.rule === 'beast-intelligence' || x.rule === 'speed-paren' || x.rule === 'primordial-dialects') && x.loc?.field
  )) {
    out[f.loc.field] = f.expected || undefined;
  }

  if (has('resistance-conditions')) {
    const condSet = new Set([...CONDITIONS, 'Exhaustion'].map((c) => c.toLowerCase()));
    const toks = (out.resistances ?? '').split(/[;,]/).map((t) => t.trim()).filter(Boolean);
    const conds = toks.filter((t) => condSet.has(t.toLowerCase()));
    const damage = toks.filter((t) => !condSet.has(t.toLowerCase()));
    out.resistances = damage.join(', ') || undefined;
    if (conds.length) {
      out.immunities = out.immunities
        ? `${out.immunities}${out.immunities.includes(';') ? ', ' : '; '}${conds.join(', ')}`
        : conds.join(', ');
    }
  }

  for (const f of correctable.filter(
    (x) => (x.rule === 'entry-name-caps' || x.rule === 'trait-recharge' || x.rule === 'legendary-cost-2024' || x.rule === 'cc-aoe' || x.rule === 'restrain-gate' || x.rule === 'legendary-resistance-uses' || x.rule === 'spellcasting-entry-name') && x.loc
  )) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) entry.name = f.expected;
  }

  for (const f of correctable.filter((x) => x.rule === 'escape-dc' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) entry.text = entry.text.replace(/escape DC \d+/gi, `escape DC ${f.expected}`);
  }

  // Dead self-escape clause (condition the immunity line already prevents).
  for (const f of correctable.filter((x) => x.rule === 'self-escape-immune-condition' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) {
      entry.text = entry.text
        .replace(/\s*(?:It )?ends? (?:any|the) \w+(?: or \w+)? conditions? on itself(?:, (?:and )?|\. )/i, ' It ')
        .replace(/\s{2,}/g, ' ').replace(/^\s*It\s*$/, '').trim();
    }
  }

  // Failure-clause damage echo: strip the repeated bare average.
  for (const f of correctable.filter((x) => x.rule === 'failure-damage-echo' && x.loc && x.expected)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) {
      entry.text = entry.text
        .replace(new RegExp(`(Failure:\\*?\\s*)${f.expected.avg} ${f.expected.type} damage(?:,? and | and |, )?`), '$1')
        .replace(/Failure:(\*?)\s*the target/, 'Failure:$1 The target')
        .replace(/\s{2,}/g, ' ');
    }
  }

  // Generic acting subject: "The creature casts..." names the monster.
  // (Falls back to pattern-matching the entry — a same-pass rename, e.g.
  // spellcasting-entry-name, may have changed the recorded name.)
  for (const f of correctable.filter((x) => x.rule === 'generic-self-reference' && x.loc)) {
    const list = out.sections?.[f.loc.section] ?? [];
    const entry = list.find((e) => e.name === f.loc.entry)
      ?? list.find((e) => /(^|\. )The creature (casts|makes|uses)\b/.test(e.text));
    if (entry && out.name) {
      entry.text = entry.text.replace(/(^|\. )The creature (casts|makes|uses)\b/g,
        (m, pre, verb) => `${pre}The ${out.name.toLowerCase()} ${verb}`);
    }
  }

  // Bare 2014 grapple gets its escape DC stamped on the imposing clause.
  for (const f of correctable.filter((x) => x.rule === 'grapple-escape-dc-2014' && x.loc && x.expected)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) {
      entry.text = entry.text.replace(
        /((?:saving throw|ability check) or (?:be|is|becomes?) grappled|\bis grappled\b(?!\s*\()(?! by))/i,
        `$1 (escape DC ${f.expected})`
      );
    }
  }

  // Cross-section duplicate: the Traits copy of a twice-defined mechanic is
  // dropped (the sectioned copy — Reaction/Bonus Action — is the real home).
  for (const f of correctable.filter((x) => x.rule === 'duplicate-cross-section' && x.loc)) {
    const list = out.sections?.[f.loc.section];
    if (list) out.sections[f.loc.section] = list.filter((e) => e.name !== f.loc.entry);
  }

  // Hybrid dual-targeting: the save skeleton's range follows the range the
  // prose stated ("lunges at one creature within 15 feet" wins over the
  // skeleton's "within 60 feet").
  for (const f of correctable.filter((x) => x.rule === 'hybrid-range-mismatch' && x.loc && x.expected)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) {
      entry.text = entry.text.replace(
        new RegExp(`(Saving Throw:?\\*?\\s*DC \\d+, one creature within )${f.expected.from}(?= feet)`),
        `$1${f.expected.to}`
      );
    }
  }

  // Epithet self-references: rewrite "the tar coil" → "the tarwurm" across
  // every entry (possessives follow for free: "the tar coil's choice").
  for (const f of correctable.filter((x) => x.rule === 'epithet-self-reference' && x.expected?.from)) {
    const re = new RegExp(`\\b([Tt])he ${escapeRe(f.expected.from)}\\b`, 'g');
    for (const entries of Object.values(out.sections ?? {})) {
      for (const entry of entries) {
        entry.text = entry.text.replace(re, (m, t) => `${t}he ${f.expected.to}`);
      }
    }
  }

  // Multiattack moves to the top of Actions (officials always lead with it).
  if (findings.some((f) => f.rule === 'multiattack-order')) {
    const acts = out.sections?.Actions ?? [];
    const mi = acts.findIndex((e) => /^Multiattack/i.test(e.name ?? ''));
    if (mi > 0) acts.unshift(acts.splice(mi, 1)[0]);
  }

  // Swarm size correction: Medium, with the hit-die formula re-derived for
  // the corrected size (a Tiny-sized swarm shipped on d4s).
  for (const f of correctable.filter((x) => x.rule === 'swarm-size')) {
    out.size = f.expected;
    const conMod = out.stats ? Math.floor((out.stats.CON - 10) / 2) : 0;
    if (typeof out.hp === 'number' && out.hp > 0) {
      const formula = hpFormulaFor(out.hp, f.expected, conMod);
      out.hp_formula = formula;
      const avg = avgDice(formula);
      if (avg) out.hp = avg;
    }
  }

  // Swarm reduced-damage arithmetic: replace the SECOND damage expression
  // (the Bloodied/half-HP tier) with the recomputed halved-dice value.
  for (const f of correctable.filter((x) => x.rule === 'swarm-half-value' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (!entry) continue;
    // The reduction expression follows ", or" (inline form) or "the damage
    // is/decreases to" (sentence form) — a positional second-expression
    // replace corrupted typed riders (Sorrowsand's Fire).
    const before = entry.text;
    entry.text = entry.text.replace(/(,?\s*or\s+)\d+\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\)/i, (m, pre) => `${pre}${f.expected}`);
    if (entry.text === before) {
      entry.text = entry.text.replace(/((?:the damage (?:is|decreases to))\s+)\d+\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\)/i, (m, pre) => `${pre}${f.expected}`);
    }
  }

  // Swarm reduced-damage clause missing or negated: strip any "the damage is
  // not reduced" evasion, then inject the official clause after the first
  // damage statement (expected carries "avg (dice) Type damage").
  for (const f of correctable.filter((x) => x.rule === 'swarm-half-damage' && x.loc && x.expected)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (!entry) continue;
    entry.text = entry.text
      .replace(/,?\s*[Ii]f the [\w' -]+ has half of its Hit Points or fewer, the damage is not reduced\.?/, '')
      .replace(/(\d+\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\)\s+\w+ damage)/,
        `$1, or ${f.expected} if the swarm has half of its Hit Points or fewer`)
      .replace(/\s{2,}/g, ' ').trim();
  }

  // Phantom "Half damage" in a Success clause whose Failure deals none:
  // strip the reference ("Half damage plus X" → "X"; a bare half-damage
  // Success drops to the official omit-when-no-effect convention).
  for (const f of correctable.filter((x) => x.rule === 'success-damage-orphan' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (!entry) continue;
    entry.text = entry.text
      .replace(/(\*?\bSuccess:?\*?\s*)Half damage(?: only)?\s*(?:plus|and)\s*(\w)/i, (m, pre, ch) => pre + ch.toUpperCase())
      .replace(/\s*\*?\bSuccess:?\*?\s*Half damage(?: only)?\.?\s*$/i, '')
      .trim();
  }

  // Reaction damage re-solved to punish scale (half an attack, pure dice).
  for (const f of correctable.filter((x) => x.rule === 'reaction-damage-band' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) {
      const d = saveDamageDiceFor(f.expected);
      entry.text = entry.text.replace(/(\d+)\s*\((\d+d\d+(?:\s*[+-]\s*\d+)?)\)/, `${d.avg} (${d.dice})`);
    }
  }

  // Identity immunity: move the elemental type from resistances to
  // immunities (both lines rewritten; the semicolon structure of immunities
  // is preserved by prepending to the damage-type segment).
  for (const f of correctable.filter((x) => x.rule === 'identity-immunity')) {
    const type = f.expected;
    const kept = (out.resistances ?? '').split(/,/).map((t) => t.trim())
      .filter((t) => t && t.toLowerCase() !== type.toLowerCase());
    out.resistances = kept.join(', ') || undefined;
    if (out.immunities) {
      const [dmgPart, ...rest] = out.immunities.split(';');
      out.immunities = [[type, dmgPart.trim()].filter(Boolean).join(', '), ...rest.map((s) => s.trim())].join('; ');
    } else {
      out.immunities = type;
    }
  }

  // Swarm healing contradiction: strip heal clauses; delete heal-only entries.
  for (const f of correctable.filter((x) => x.rule === 'swarm-heal-contradiction' && x.loc)) {
    const list = out.sections?.[f.loc.section];
    const idx = list?.findIndex((e) => e.name === f.loc.entry) ?? -1;
    if (idx === -1) continue;
    const text = list[idx].text
      .replace(/,?\s*and (?:the [\w' -]+?|it|the swarm) regains \d+(?:\s*\([^)]*\))?\s*Hit Points/gi, '')
      .replace(/\s*(?:(?:The [\w' -]+?|It)|When [^.]*?,\s*(?:the [\w' -]+?|it)) regains \d+(?:\s*\([^)]*\))?\s*Hit Points[^.]*\./gi, '')
      .replace(/,?\s*and no Hit Point regain/gi, '')
      .replace(/\s{2,}/g, ' ').trim();
    if (text.replace(/[^a-z]/gi, '').length < 15) list.splice(idx, 1);
    else list[idx].text = text;
  }

  // Self-contradicting squeeze phrasing → the official verb.
  for (const f of correctable.filter((x) => x.rule === 'squeeze-phrasing' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) entry.text = entry.text.replace(/can squeeze through ([^.]*? without squeezing)/gi, 'can move through $1');
  }

  // Entry names ending in "Attack": rename WITH reference propagation
  // ("makes two Chain Blade Attack attacks" → "makes two Chain Blade
  // attacks" everywhere).
  for (const f of correctable.filter((x) => x.rule === 'entry-name-attack-suffix' && x.loc && x.expected)) {
    if ((out.sections?.[f.loc.section] ?? []).some((e) => e.name === f.loc.entry)) {
      out = applyRenameMapping(out, { [f.loc.entry]: f.expected });
    }
  }

  // Defense-line contradiction: strip the trait's claim sentence, keep the
  // mechanic, re-capitalize the survivor ("In addition, when a creature
  // hits..." → "When a creature hits...").
  for (const f of correctable.filter((x) => x.rule === 'defense-contradiction' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (!entry) continue;
    const stripped = entry.text
      .replace(/\s*The [\w' -]+ has (?:Resistance|Immunity) to [A-Z]\w+(?: and [A-Z]\w+)? damage\.\s*(?:In addition,\s*)?/, ' ')
      .trim();
    if (stripped) entry.text = stripped.charAt(0).toUpperCase() + stripped.slice(1);
  }

  // Meta-commentary sentence deletion ("This is a buff, heal, or enable
  // action targeting allies." — instruction language is never in-world).
  for (const f of correctable.filter((x) => x.rule === 'instruction-leak' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) {
      entry.text = entry.text
        .replace(/\s*\bThis is an? [^.]*\./gi, '')
        .replace(/\s*\bThis attack is an? [\w -]*attack\./gi, '')
        .replace(/\s*\bCredits?:[^.]*\./gi, '')
        .replace(/\s*[^.]*fills the (?:required )?slot[^.]*\./gi, '')
        .replace(/\s*\((?:slot|fills? slot):[^()]*(?:\([^()]*\)[^()]*)*\)/gi, '')
        .replace(/\s*\bslot: [^.]*\.?/gi, '')
        .replace(/\s*\([^)]*(?:action description|this entry|these instructions)[^)]*\)/gi, '')
        .replace(/\s*\([^)]*or a similar (?:trait|ability|effect)[^)]*\)/gi, '')
        // Lint-message echoes: strip from the echoed CLAUSE (anchored at
        // its comma, so the legitimate text before it survives) to the end
        // of the sentence (", and the total for both expressions is 41, ...").
        .replace(/,?\s*(?:and |which |but )?[^,.]*(?:outside the allowed range|restructure to total \d+|per-attack budget|total for both expressions)[^.]*\./gi, '.')
        .replace(/\.\s*\./g, '.')
        .replace(/\s{2,}/g, ' ').trim();
    }
  }

  // A passive rider filed as an action relocates to Traits (inverse of
  // trait-imposes-save; its own marker so the counts exemption never
  // double-counts it).
  for (const f of correctable.filter((x) => x.rule === 'action-passive-rider' && x.loc)) {
    const acts = out.sections?.Actions ?? [];
    const idx = acts.findIndex((e) => e.name === f.loc.entry);
    if (idx === -1) continue;
    const [entry] = acts.splice(idx, 1);
    entry.relocatedToTraits = true;
    (out.sections.Traits ??= []).push(entry);
  }

  // An active bonus action written as a trait relocates to Bonus Actions
  // (relocated marker keeps it scored against the Traits plan range).
  for (const f of correctable.filter((x) => x.rule === 'trait-bonus-action' && x.loc)) {
    const traits = out.sections?.Traits ?? [];
    const idx = traits.findIndex((e) => e.name === f.loc.entry);
    if (idx === -1) continue;
    const [entry] = traits.splice(idx, 1);
    entry.relocated = true;
    (out.sections['Bonus Actions'] ??= []).push(entry);
  }

  // Misspelled stat-block reference with a unique close match ("Strige" →
  // "Stirge"): deterministic respell in place.
  for (const f of correctable.filter((x) => x.rule === 'stat-ref' && x.loc?.from)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) {
      const from = f.loc.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      entry.text = entry.text.replace(new RegExp(from, 'g'), f.expected);
    }
  }

  // Bare-targeting save (docs/investigations/03): "each creature." with no
  // qualifier → default to a 10-foot Emanation, the standard aura shape.
  for (const f of correctable.filter((x) => x.rule === 'bare-targeting' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) {
      const insert = f.expected === 'one' ? ' within 60 feet' : ' in a 10-foot Emanation originating from it';
      entry.text = entry.text.replace(
        /(Saving Throw\*?:?\s*DC \d+,\s*(?:one|each) creature)(\s*)(\.|\*Failure)/i,
        `$1${insert}$2$3`
      );
    }
  }

  // Legendary reuse of an ungated AoE / oversized save (docs/investigations/
  // 01): retarget to a single-target attack ("uses X" → "makes one <Attack>
  // attack"). Deterministic. If the block has no attack action (rare), the
  // finding survives and ships as a wart per never-fail generation.
  for (const f of correctable.filter((x) => x.rule === 'legendary-reuse' && x.loc)) {
    const entry = (out.sections?.['Legendary Actions'] ?? []).find((e) => e.name === f.loc.entry);
    if (!entry) continue;
    const attack = (out.sections?.Actions ?? []).find((a) => /Attack Roll/i.test(a.text) && !/^Multiattack/i.test(a.name));
    if (attack) {
      const base = attack.name.replace(/\s*\(.*/, '');
      entry.text = entry.text.replace(/\buses [A-Z][\w' -]+?(?=\s+again|\s+to cast|[.,]|$)/, `makes one ${base} attack`);
    }
  }

  // A save-imposing Trait with no trigger (docs: post-fix review) relocates
  // to Actions — as a Trait it can never fire. The `relocated` marker keeps
  // it scored against the Traits plan range in the counts rule, so the move
  // can never trip a counts reject (relocate-and-exempt, owner call).
  for (const f of correctable.filter((x) => x.rule === 'trait-imposes-save' && x.loc)) {
    const traits = out.sections?.Traits ?? [];
    const idx = traits.findIndex((e) => e.name === f.loc.entry);
    if (idx === -1) continue;
    const [entry] = traits.splice(idx, 1);
    entry.relocated = true;
    // 2014 traits open the cost in prose — relocated to Actions, the lead-in
    // is redundant ("As an action, shalespire can launch..." → "Shalespire
    // can launch...").
    entry.text = entry.text.replace(/^As an action,\s*/i, '').replace(/^[a-z]/, (c) => c.toUpperCase());
    (out.sections.Actions ??= []).push(entry);
  }

  // Multiattack-substituted save nova (the Strokeg pattern): remove the
  // offending reference from Multiattack, leaving the entry as a standalone
  // action. If it shares an "X or Y" alternation with a legal sibling, only
  // the offender is dropped; a sole target takes the whole clause with it.
  for (const f of correctable.filter((x) => x.rule === 'multiattack-substitution' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (!entry) continue;
    const esc = f.expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const alternation = new RegExp(`(\\s+or\\s+${esc}|${esc}\\s+or\\s+)`, 'i');
    if (alternation.test(entry.text)) {
      entry.text = entry.text.replace(alternation, '');
    } else {
      const ref = `(?:an? |its |the )?${esc}(?: action| attack)?`;
      entry.text = entry.text
        .replace(new RegExp(`,\\s*(?:one of which|which) it can replace with (?:a use of |one use of )?${ref}(?=\\.)`, 'i'), '')
        // Standalone-sentence shape (live: "It can replace one attack with a
        // use of Shriek." / "...a use of its Enveloping Feed action.").
        // Subject bounded to 1-2 words — an open [\\w' -]+? here once
        // swallowed "The krakkor makes two Crystal Claw attacks and" and
        // emptied the whole Multiattack text.
        .replace(new RegExp(`\\s*(?:It|She|He|They|The \\w+(?: \\w+)?) can replace one (?:attack|of them|of those) with (?:a use of |one use of )?${ref}\\.`, 'i'), '')
        .replace(new RegExp(`,?\\s*and (?:it )?can replace one (?:attack|of them|of those) with (?:a use of |one use of )?${ref}(?=\\.)`, 'i'), '')
        .replace(new RegExp(`\\s*(?:and|,)?\\s*(?:it )?can use ${ref} in place of one attack`, 'i'), '')
        .replace(new RegExp(`\\s*(?:and|or) uses ${ref}( if available)?`, 'i'), '')
        .replace(/\s{2,}/g, ' ').replace(/\s+\./g, '.');
    }
  }

  // Grapple/Restrain machinery missing counterplay (docs/investigations/07):
  // Grappled → inject the escape-DC rider (same value as escape-dc lands on,
  // save_dc − 2 floored at 8); Restrained/maintained holds → inject the
  // official repeat-save sentence (escape DCs are wrong for non-physical
  // grips — a psychic hold has nothing to Athletics out of). Deterministic;
  // no fix call. The exit-pattern set was the gate, so this only fires when
  // NO counterplay was recognized.
  for (const f of correctable.filter((x) => x.rule === 'grapple-exit' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (!entry) continue;
    if (f.expected === 'Grappled' && !/escape DC \d+/i.test(entry.text)) {
      const dc = Math.max(8, (chassis.attack_bonus ?? chassis.save_dc - 6) + 8);
      // Also normalizes the nonstandard "is/becomes Grappled" phrasing the
      // widened anchor now catches.
      entry.text = entry.text.replace(/(?:has the Grappled condition|(?:is|becomes) Grappled\b)/, `has the Grappled condition (escape DC ${dc})`);
    } else {
      const sentence = ' The target repeats the save at the end of each of its turns, ending the effect on a success.';
      if (/\*?Success:\*?/i.test(entry.text)) {
        entry.text = entry.text.replace(/(\s*)(\*?Success:\*?)/i, `${sentence}$1$2`);
      } else {
        entry.text = entry.text.trimEnd() + sentence;
      }
    }
  }

  if (has('duplicate-name')) {
    const stripTail = (t) => (t ?? '')
      .replace(/\s*\((?:slot|fills? slot):[^()]*(?:\([^()]*\)[^()]*)*\)\s*$/i, '')
      .replace(/\s*\([^()]*\)\s*$/, '')
      .trim().toLowerCase();
    for (const [sec, list] of Object.entries(out.sections ?? {})) {
      const firstByName = new Map();
      out.sections[sec] = list.filter((e) => {
        const base = (e.name ?? '').split(' (')[0].toLowerCase();
        if (!firstByName.has(base)) { firstByName.set(base, e); return true; }
        return stripTail(e.text) !== stripTail(firstByName.get(base).text);
      });
    }
  }

  // Meta parentheticals in entry NAMES ("Disengage (if not already
  // used)") strip to the base name; references keep working because the
  // paren was never part of any cross-reference.
  for (const f of correctable.filter((x) => x.rule === 'entry-name-meta-paren' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) entry.name = entry.name.replace(/\s*\([^)]*\)\s*$/, '');
  }

  for (const f of correctable.filter((x) => x.rule === 'choice-referent' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry && f.expected) entry.text = entry.text.replace(f.expected, 'of its choice');
  }

  // Single-expression attacks outside the damage band clamp to the exact
  // skeleton (owner call, 2026-07-19): the prompt dictates exact numbers, so
  // deviation is disobedience — variety lives in damage types and riders.
  for (const f of correctable.filter((x) => x.rule === 'attack-damage-band' && x.loc)) {
    const entry = (out.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    if (entry) {
      const d = attackDamageDiceFor(f.expected, requiredAttackModFor(chassis));
      // Non-global: replaces the entry's sole damage expression.
      entry.text = entry.text.replace(
        /(\d+)\s*\((\d+d\d+(?:\s*[+-]\s*\d+)?)\)/,
        `${d.avg} (${d.dice})`
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

  // Clamp unsupported save DCs before the band sweep below, so the two
  // corrections cannot fight over the same numbers.
  for (const f of correctable.filter((x) => x.rule === 'save-dc-unsupported')) {
    const ceiling = Number(f.expected);
    if (!Number.isFinite(ceiling)) continue;
    for (const entries of Object.values(out.sections ?? {})) {
      for (const entry of entries) {
        entry.text = entry.text.replace(/(Saving Throw\*?:?\s*DC\s+)(\d+)/gi, (m, pre, n) =>
          (Number(n) > ceiling ? `${pre}${ceiling}` : m));
      }
    }
  }

  if (has('attack-band') || has('dc-band') || has('escape-dc-band')) {
    for (const entries of Object.values(out.sections ?? {})) {
      for (const entry of entries) {
        if (has('attack-band')) {
          entry.text = entry.text.replace(/(Attack(?: Roll)?:\*?\s*)\+(\d+)/g, (m, pre, n) =>
            Math.abs(Number(n) - chassis.attack_bonus) > 1 ? `${pre}${signed(chassis.attack_bonus)}` : m
          );
        }
        if (has('escape-dc-band')) {
          // Policy (measured, 2026-08-02): 8 + PB + strike mod = attack_bonus
          // + 8. Must match the lint rule, or flag and restamp fight forever.
          const escapeDC = Math.max(8, (chassis.attack_bonus ?? chassis.save_dc - 6) + 8);
          entry.text = entry.text.replace(/(escape DC )(\d+)/gi, (m, pre, n) =>
            Number(n) !== escapeDC ? `${pre}${escapeDC}` : m);
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

const REROLL_SECTION = {
  ability: 'Traits', action: 'Actions', legendary: 'Legendary Actions',
  bonus: 'Bonus Actions', reaction: 'Reactions',
};

const REROLL_ENTRY_LABEL = {
  Traits: 'TRAIT', Actions: 'ACTION', 'Legendary Actions': 'LEGENDARY ACTION',
  'Bonus Actions': 'BONUS ACTION', Reactions: 'REACTION',
};

// Structural entry names that must survive a re-roll — the name IS the
// mechanic (parenthetical suffixes like "(2/Day)" don't exempt them).
const PROTECTED_ENTRY_NAME_RE = /^(Multiattack|Spellcasting)\b/;

function editionSkeletons(edition, chassis, numbers) {
  const atkDmg = attackDamageDiceFor(numbers.perAttack, requiredAttackModFor(chassis));
  const saveDmg = saveDamageDiceFor(numbers.total);
  const aoeDmg = saveDamageDiceFor(Math.max(1, Math.round(numbers.total / 2)));
  return edition === '2014'
    ? `- Attack: Melee Weapon Attack: ${signed(chassis.attack_bonus)} to hit, reach 5 ft., one target. Hit: ${atkDmg.avg} (${atkDmg.dice}) <damage type> damage. (Ranged Weapon Attack: same numbers, range 60 ft.) That damage is the attack's TOTAL — no extra "plus X" riders.
- Save effect: must make a DC ${chassis.save_dc} <Ability> saving throw, taking ${saveDmg.avg} (${saveDmg.dice}) <type> damage (area effects: ${aoeDmg.avg} (${aoeDmg.dice})) on a failed save, or half as much on a successful one. Conditions lowercase ("knocked prone", "frightened"); "hit points" lowercase; never "Attack Roll:" or "Failure:" markers.`
    : `- Attack: *Melee Attack Roll:* ${signed(chassis.attack_bonus)}, reach 5 ft. ${atkDmg.avg} (${atkDmg.dice}) <Damage Type> damage. (Ranged: same numbers, range 60 ft.)
- Save effect: *<Ability> Saving Throw*: DC ${chassis.save_dc}, <targets>. *Failure:* ${saveDmg.avg} (${saveDmg.dice}) damage single-target, ${aoeDmg.avg} (${aoeDmg.dice}) for areas. *Success:* Half damage only. Conditions Capitalized ("has the Prone condition"); never "Melee Weapon Attack" or "to hit".`;
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
export async function rerollEntry(monster, { kind, current, degraded = false }, callLLM) {
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
  // A re-roll REPLACES the ability (new name, new idea) — the engine already
  // guarantees the mechanics, so a same-name mechanics shuffle is the least
  // valuable outcome (owner call, 2026-07-19; replaces the old hidden
  // "delete the name first" idiom). Names survive only where they're
  // load-bearing: referenced by other entries, or structural entries whose
  // name IS the mechanic.
  const keepName = referenced || PROTECTED_ENTRY_NAME_RE.test(current.name ?? '');

  const skeletons = editionSkeletons(edition, chassis, numbers);

  const prompt = `You are re-rolling ONE entry of an existing D&D ${edition === '2014' ? '5th edition (2014 rules)' : '2024 (5.5e)'} statblock. The numbers are fixed — never invent different ones.

THE MONSTER: ${monster.name}, CR ${crKeyFor(cr)}${monster.archetype ? `, combat role: ${monster.archetype}` : ''}.
Its other entries (do not duplicate their mechanics or names): ${otherNames.join('; ') || 'none'}.

${keepName
    ? `REWRITE THIS ${REROLL_ENTRY_LABEL[section]} — KEEP the name "${current.name}" EXACTLY (${referenced ? 'other entries reference it by name' : 'the name is structural'}) and write a fresh take on its text:`
    : `REPLACE THIS ${REROLL_ENTRY_LABEL[section]} with a brand-new ability filling the same role — invent a NEW name (never "${current.name}" or a variation of it) and a fresh idea, not a rewording of this one:`}
"${current.name}": ${currentText}

FIXED NUMBER SKELETONS (use EXACTLY these if the new entry attacks or forces a save):
${skeletons}

RULES:
- Third person, in-world only. No traits that halve/reduce incoming damage or grant resistance to everything.${section === 'Reactions' ? (edition === '2014'
    ? `\n- This entry is a REACTION: it must begin by stating its trigger in prose — "When <specific event>, the <creature> <responds>." Never a reaction usable on the creature's own turn.`
    : `\n- This entry is a REACTION — not a free action. It must use EXACTLY this form: *Trigger:* <the specific event that lets the creature respond>. *Response:* <what it does>.`) : ''}
- Any attack you reference by name must be one of the other entries listed above${referenced ? '' : ', or omit attack references'}.

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
      (sections[r.section] ??= []).push({ name: r.name, text: '', _stub: true });
    }
    (sections[section] ??= []).push({ name: parsed.name, text: parsed.text });
    let pseudo = { name: monster.name, stats: stats ?? undefined, pb, sections };
    pseudo = applyCorrections(pseudo, lintStatblock(pseudo, { chassis, edition, perAttack: attackDamageDiceFor(numbers.perAttack, requiredAttackModFor(chassis)).avg, totalDamage: numbers.total }).findings, { chassis });
    const result = lintStatblock(pseudo, { chassis, edition, perAttack: attackDamageDiceFor(numbers.perAttack, requiredAttackModFor(chassis)).avg, totalDamage: numbers.total });
    const entry = pseudo.sections[section].find((e) => e.name === parsed.name && e.text);
    let rejects = result.findings.filter((f) => f.severity === 'reject');
    const sameName = parsed.name.trim().toLowerCase() === (current.name ?? '').trim().toLowerCase();
    if (keepName && !sameName && entry) {
      // Keep-mode rename is deterministically repairable: stamp the
      // load-bearing name back over the fresh text (cheaper than a retry;
      // a rename would break the entries that reference it).
      return { entry: { ...entry, name: current.name }, rejects };
    }
    if (!keepName && sameName) {
      // Replace-mode returned the same ability name — that's the old
      // "mechanics shuffle" behavior; demand a genuinely new ability.
      rejects.push({ message: `you returned the same name "${current.name}" — replace this ability with a NEW one: new name, fresh idea` });
    }
    return { entry, rejects };
  };

  let outcome = await attempt(prompt);
  if (!outcome) throw new Error('Empty or malformed re-roll response');
  if (outcome.rejects.length) {
    const retry = await attempt(`${prompt}

Your previous attempt was rejected for these reasons — fix ALL of them this time:
${outcome.rejects.map((f) => `- ${f.message}`).join('\n')}`);
    if (retry) outcome = retry;
  }
  if (!outcome.entry) {
    throw validationError('Re-rolled entry failed validation', outcome.rejects);
  }
  if (outcome.rejects.length) {
    if (degraded || onlyStyleRejects(outcome.rejects)) {
      logger.warn('Re-rolled entry kept warts:', outcome.rejects.map((f) => f.rule));
    } else {
      throw validationError('Re-rolled entry failed validation', outcome.rejects);
    }
  }
  const entryName = edition === '2014' && section === 'Legendary Actions'
    ? normalizeLegendaryCost(outcome.entry.name)
    : outcome.entry.name;
  return { name: entryName, description: outcome.entry.text };
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
export async function rerollSection(monster, { kind, suggestion = '', degraded = false }, callLLM) {
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
    for (const r of otherRows) (sections[r.section] ??= []).push({ name: r.name, text: '', _stub: true });
    sections[section] = parsed.map((e) => ({ name: e.name, text: e.text }));
    let pseudo = { name: monster.name, stats: stats ?? undefined, pb, sections };
    pseudo = applyCorrections(pseudo, lintStatblock(pseudo, { chassis, edition, perAttack: attackDamageDiceFor(numbers.perAttack, requiredAttackModFor(chassis)).avg, totalDamage: numbers.total }).findings, { chassis });
    const rejects = lintStatblock(pseudo, { chassis, edition, perAttack: attackDamageDiceFor(numbers.perAttack, requiredAttackModFor(chassis)).avg, totalDamage: numbers.total }).findings
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
    if (degraded || onlyStyleRejects(outcome.rejects)) {
      logger.warn('Re-rolled section kept warts:', outcome.rejects.map((f) => f.rule));
    } else {
      throw validationError('Re-rolled section failed validation', outcome.rejects);
    }
  }
  return outcome.entries.map((e) => ({
    name: edition === '2014' && section === 'Legendary Actions' ? normalizeLegendaryCost(e.name) : e.name,
    description: e.text,
  }));
}

// ---------------------------------------------------------------------------
// Entry-rewrite fix — targeted, instead of full regeneration
// ---------------------------------------------------------------------------

// Reject rules that only implicate specific entries' TEXT: the block is
// otherwise sound, so resend just the flagged entries with their findings.
const ENTRY_FIXABLE = new Set([
  'phrasing-2014', 'phrasing-to-hit', 'phrasing-saving-throw',
  'phrasing-hybrid-save', 'condition-caps', 'term-caps', 'stat-ref',
  'phrasing-hit-marker', 'defense-restated', 'reaction-trigger-referent', 'section-shape',
  'duplicate-entry', 'legendary-recharge',
  'phrasing-2024-in-2014', 'second-person', 'trait-mitigation',
  'undefined-attack-ref', 'attack-damage-band', 'reaction-trigger',
  'condition-unknown', 'damage-type-caps', 'area-term-caps',
  'phrasing-save-or', 'entry-name-coinage', 'entry-name-design-term',
  'entry-name-self', 'swarm-heal-contradiction', 'swarm-half-damage',
  'area-circle', 'spelling-centred', 'phrasing-surprised',
  'entry-name-bathos', 'attack-mod-coherence',
  'condition-fake', 'success-no-effect',
  'phrasing-rider-save', 'removal-counterplay', 'undefined-area',
  'flat-damage-bonus', 'immunity-restated-clause', 'empty-entry',
  'unknown-action-ref', 'dangling-use-ref', 'flat-damage-reduction',
  'buff-behind-save', 'energy-type-spread',
  'self-condition-immunity-contradiction', 'motionless-invisible',
  'duplicate-mechanic', 'immune-damage-end-contradiction', 'check-imposes-condition',
  'type-damage-affinity', 'spell-type-affinity', 'legendary-no-damage',
]);

// Rules whose defect is the entry's NAME — the fix call may rename these
// (references follow via renameInText); all other fixes keep names exactly.
const RENAMEABLE_RULES = new Set(['entry-name-coinage', 'entry-name-design-term', 'entry-name-self', 'entry-name-bathos']);

// Style-tier rejects: wrong WORDS, not wrong math or mechanics. If the
// repair ladder exhausts with only these left, the block ships anyway with
// a warning — a failed generation is strictly worse UX than a phrasing
// wart the user can edit or re-roll (live feedback, 2026-07-22: bursts of
// failed generations under deepseek-v4-flash). Everything mechanical
// (bands, structure, references, contradictions, triggers) still blocks.
const STYLE_TIER_REJECTS = new Set([
  'phrasing-2014', 'phrasing-to-hit', 'phrasing-saving-throw',
  'phrasing-hybrid-save', 'phrasing-2024-in-2014', 'phrasing-save-or',
  'term-caps', 'condition-caps', 'damage-type-caps', 'area-term-caps',
  'area-circle', 'spelling-centred', 'second-person', 'entry-name-caps',
  'entry-name-coinage', 'entry-name-design-term', 'entry-name-self',
  'entry-name-bathos', 'seed-leakage', 'attack-mod-coherence',
  'success-no-effect', 'phrasing-rider-save', 'flat-damage-bonus',
  'immunity-restated-clause',
]);

/** True when every remaining reject is a shippable style wart. */
function onlyStyleRejects(rejects) {
  return rejects.length > 0 && rejects.every((f) => STYLE_TIER_REJECTS.has(f.rule));
}

/** Error that carries the reject taxonomy for telemetry. */
function validationError(prefix, rejects) {
  const err = new Error(`${prefix}: ${rejects.map((f) => f.message).join('; ')}`);
  err.rejectRules = rejects.map((f) => f.rule);
  return err;
}

// Rejects that genuinely need new content — only these trigger a full
// regeneration. spell-dc-ability is here because its fix is an ability-score
// change with save/skill ripple, not an entry rewrite.
const STRUCTURAL_REJECTS = new Set([
  'slot-missing', 'multiattack', 'legendary', 'section-structure', 'counts',
  'spell-dc-ability', 'swarm-content-untyped',
]);

async function rewriteFlaggedEntries(monster, rejects, { edition, chassis, plan, cr }, callLLM) {
  const byEntry = new Map();
  for (const f of rejects) {
    if (!f.loc) continue;
    const key = `${f.loc.section}\u0000${f.loc.entry}`;
    if (!byEntry.has(key)) byEntry.set(key, { ...f.loc, problems: [], rules: new Set() });
    byEntry.get(key).problems.push(f.message);
    byEntry.get(key).rules.add(f.rule);
  }
  const targets = [...byEntry.values()]
    .map((t) => {
      const entry = (monster.sections?.[t.section] ?? []).find((e) => e.name === t.entry);
      return entry
        ? { ...t, text: entry.text, renameAllowed: [...t.rules].some((r) => RENAMEABLE_RULES.has(r)) }
        : null;
    })
    .filter(Boolean);
  if (!targets.length) return monster;

  const numbers = damageBudgetFor(cr, chassis, plan);
  const prompt = `You are FIXING specific entries of a D&D ${edition === '2014' ? '5th edition (2014 rules)' : '2024 (5.5e)'} statblock. Rewrite ONLY the entries below to resolve their listed problems. Keep each entry's NAME exactly as given unless a problem tells you to rename it; keep its mechanical intent and numbers, change as little text as possible. If a mechanic is fundamentally disallowed, replace it with a balanced alternative in the same spirit.

${targets.map((t) => `ENTRY "${t.entry}" (${t.section}):\n${t.text}\nPROBLEMS TO FIX:\n${t.problems.map((p) => `- ${p}`).join('\n')}`).join('\n\n')}

FIXED NUMBER SKELETONS (use these if rephrasing an attack or save):
${editionSkeletons(edition, chassis, numbers)}

Return ONLY a JSON array in the SAME order as the entries above, no markdown fences: [{"name": "...", "text": "..."}]`;

  const raw = await callLLM(prompt, validateSectionResponse);
  const parsed = tryParse(raw);
  if (!Array.isArray(parsed)) return monster;

  const out = JSON.parse(JSON.stringify(monster));
  const matched = new Set();
  const unmatched = [];
  for (const resp of parsed) {
    const t = targets.find((x) => !matched.has(x) && x.entry === resp.name);
    if (t) {
      matched.add(t);
      const entry = (out.sections?.[t.section] ?? []).find((e) => e.name === t.entry);
      if (entry && typeof resp.text === 'string' && resp.text.trim()) entry.text = resp.text;
    } else {
      unmatched.push(resp);
    }
  }
  // Renamed responses pair with rename-allowed targets in order; the new
  // name replaces the old everywhere (Multiattack/legendary references
  // follow, same as the seed-leakage rename machinery).
  for (const resp of unmatched) {
    const t = targets.find((x) => !matched.has(x) && x.renameAllowed);
    if (!t || typeof resp.name !== 'string' || !resp.name.trim()
      || typeof resp.text !== 'string' || !resp.text.trim()) continue;
    matched.add(t);
    const entry = (out.sections?.[t.section] ?? []).find((e) => e.name === t.entry);
    if (!entry) continue;
    // Same name normalization the assembly applies — fix-call renames were
    // bypassing it (live: "The Watcher", "The Mound-Warden" shipped).
    entry.name = resp.name.trim().replace(/^the\s+/i, '');
    entry.text = resp.text;
    const oldBase = t.entry.split(' (')[0];
    const newBase = entry.name.split(' (')[0];
    for (const es of Object.values(out.sections ?? {})) {
      for (const e of es) {
        if (e !== entry) e.text = renameInText(e.text, oldBase, newBase);
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Post-generation naming pass (seeded generations)
// ---------------------------------------------------------------------------

const SRD_NAMES = new Set(srdMonsters.map((m) => m.name.toLowerCase()));
const MENACE_WORD_RE = /^(terror|doom|dread|horror|death|fear)s?$/i;
// Bathos ban (live finding: "Slinky Boulder" — the model satisfied the
// lurker's "sibilant, soft vowels" phonetics with a toy word). Comedic,
// cutesy, and diminutive words never survive; the name must be sayable by
// a terrified survivor with a straight face.
const BATHOS_RE = /\b(slink[iy]|bounc[iy]|wiggl[iy]|wobbl[iy]|jiggl[iy]|squish[iy]|squeak[iy]|sneak[iy]|silly|goof[iy]|wack[iy]|zan[iy]|derp[iy]|chunk[iy]|chubb[iy]|tubb[iy]|fluff[iy]|cuddl[iy]|snuggl[iy]|dink[iy]|stink[iy]|tickl[iy]|jolly|sass[iy]|cheek[iy]|funk[iy]|bumbling|blobb[iy]|nois[iy]|grump[iy]|cranky)\w*\b/i;
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
  glass_cannon: 'keen and violent — hard k and t, clipped vowels, edged clusters',
  controller: 'resonant and intoning — long o and u, n, m',
  lurker: 'hushed and sibilant — s, sh, wh, soft vowels',
  support: 'soft and chiming — l, m, open vowels',
  swarm: 'skittering and repetitive — ch, k, tt, z',
};

export function buildNamingPrompt(monster, traits = null, bans = [], concept = '', externalGrade = null, lore = null) {
  const abilities = Object.values(monster.sections ?? {}).flat()
    .map((e) => `${e.name}: ${e.text.slice(0, 90)}`)
    .join('\n');
  // Seedless (concept-path) generations get the generic MM register instead
  // of a rolled naming register.
  const nameSpec = traits
    ? `must be ${traits.naming}`
    : 'must read like a Monster Manual entry: a real-word compound (Owlbear), a folk name (Shambling Mound), or a coined word built from sound (Chuul) — NEVER a flat description of its attack routine ("Swoop Talon", "Shriek Talon" are the failure mode) and never a generic <adjective> <creature-type> label.';
  return `Name this finished D&D monster. Name what it IS — its nature, origin, and story — never a summary of what it does in combat. A name that reads like an attack routine is a failure even when accurate; a name that carries the creature's story is the goal (owner's law: names are about what creatures ARE).

Its current working name is "${monster.name}". ${externalGrade
    ? `A separate evaluator graded that name ${externalGrade} — it is being replaced. Propose your strongest candidates.`
    : 'FIRST, grade that name A-F on evocativeness, fit for this creature\'s type and abilities, and catchiness (would a reader remember it?). Grade honestly against these anchors: A = a name that could sit in the Monster Manual as-is; B = solid, fits, no reason to change; C = serviceable but generic or forgettable; D = wrong register or a flat description; F = absurd, misleading, or broken English. A rename happens at C or lower — an A or B keeps the current name. Grade the name, not your ability to invent a different one.'}

THE CREATURE: ${monster.size} ${monster.type}, speed ${monster.speed}.
${lore ? `ITS LORE (the PRIMARY source for the name — name the creature this sentence describes): ${lore}\n` : ''}${concept ? `ITS COMBAT IDENTITY (context only — never name the creature after these mechanics): ${String(concept).slice(0, 700)}\n` : ''}${abilities}

THE NAME ${nameSpec}
The name must FIT the creature's TYPE — never borrow another type's signature words (a Fiend is never a "golem", a Celestial is never a "wraith", a Construct is never a "zombie"; those words belong to Constructs, Undead, and Undead respectively).
The "<modifier> <verb>-er" formula (Shambler, Webspinner, Stalker, Witherer, Gleamer) is overused and weak — at most ONE candidate may use it; the rest should be fused compounds (Bilewurm, Owlbear), coined sounds (Shissar, Chuul), or concrete-noun heads (Shambling Mound, Mirror Prison).
${bans.length ? `BANNED THIS TIME (overused in past names — never use these stems or sounds anywhere in the name): ${bans.join(', ')}.\n` : ''}${monster.archetype && PHONETICS_BY_ARCHETYPE[monster.archetype] ? `Its sound should be ${PHONETICS_BY_ARCHETYPE[monster.archetype]}.\n` : ''}Rules: name concrete things the creature actually does or is made of. Never hyphens. A coined name is built from sound, never by gluing two English words into one. Abstract menace words (terror, doom, dread, horror, death, fear) never as the head noun — as a leading adjective before a concrete doer they are fine. Never cutesy, comedic, or diminutive words (slinky, bouncy, squishy) — satisfy the sound profile with words that keep their menace. The head noun should be a creature, agent, or evocative form, not a plain object (Boulder, Rock, Slab) — an object head is allowed only if the creature genuinely IS an animated object. Never a name already used by a well-known D&D creature, class, or subclass.

Also AUDIT the ability names listed above: any that are coined or invented words, or unexplained proper nouns ("Ulgroth", "Vothar's Ire", "Kragor"), must be renamed to plain English that says what the ability does ("Helping Snarl", "Tar Tendril"). List them in "ability_renames" — an empty object if all are already plain English. Never rename Multiattack or Spellcasting.

Your candidates will be judged by a separate model on ORIGINALITY and EVOCATIVENESS — a name that could belong to any monster, or that echoes names you have produced before (guttural Uu-/Ul- coinages, <noun><verb> gluings like "Obsidiancrawl"), scores poorly. Aim for names a reader would remember after closing the book.

Return ONLY JSON, no markdown: {"grade": "A-F for the current name", "candidates": ["seven different names, best first — range from safe to bold"], "ability_renames": {"Coined Name": "Plain English Name"}}`;
}

// Type-coded name words (corpus-consistent, 0/329 after dropping "vampire" —
// the Vampire Familiar is a living Humanoid servant): a Fiend named "Golem"
// or a Celestial named "Wraith" reads as a taxonomy error even when the
// mechanics are fine (live findings: Clanking Golem the Fiend, Chainwraith
// the Celestial). Enforced in pickName; the prompt states it too.
const RESERVED_TYPE_WORDS = {
  golem: 'Construct', zombie: 'Undead', skeleton: 'Undead', ghost: 'Undead',
  wraith: 'Undead', specter: 'Undead', ghoul: 'Undead', lich: 'Undead',
  mummy: 'Undead', angel: 'Celestial', demon: 'Fiend', devil: 'Fiend',
  elemental: 'Elemental',
};

/**
 * Apply the naming call's ability-name audit (coined ability names are a
 * recurring live failure the prompt alone doesn't stop — 8 instances across
 * field batches: Urvoth, Varthun, Ulgroth, Chuul-oth, Vothar's Ire, Morvoth,
 * Grelgor, Kragor). Language judgment lives in the LLM; this sanitizes it:
 * only existing, non-protected entry names rename, and applyRenameMapping
 * propagates through referencing texts.
 */
const ENTRY_NAME_SUFFIX_RE = /\s*\((?:Recharge[^)]*|\d+\/Day[^)]*)\)\s*$/i;

function applyAbilityRenames(monster, parsed) {
  const renames = parsed?.ability_renames;
  if (!renames || typeof renames !== 'object' || Array.isArray(renames)) return monster;
  const entryNames = new Set(Object.values(monster.sections ?? {}).flat().map((e) => e.name));
  const bareOf = (n) => (n ?? '').replace(ENTRY_NAME_SUFFIX_RE, '').trim();
  const byBare = new Map();
  for (const n of entryNames) if (!byBare.has(bareOf(n))) byBare.set(bareOf(n), n);
  const safe = {};
  for (const [from, to] of Object.entries(renames)) {
    if (typeof to !== 'string' || !to.trim()) continue;
    // The model may return the name with or without its usage suffix
    // ("Freezing Fog (Recharge 5-6)"). Resolve to the real entry, rename it
    // preserving ITS OWN suffix, and map the bare name too so prose
    // references follow the rename — a suffixed mapping alone strands them
    // (live finding: Multiattack shipped citing "a use of its Freezing Fog"
    // after the entry became "Whisper Crush (Recharge 5-6)").
    const bareFrom = bareOf(from);
    const fullFrom = entryNames.has(from) ? from : byBare.get(bareFrom);
    if (!fullFrom || PROTECTED_ENTRY_NAME_RE.test(fullFrom)) continue;
    const bareTo = bareOf(to).replace(/^the\s+/i, '');
    if (!bareTo || bareTo === bareFrom) continue;
    safe[fullFrom] = bareTo + fullFrom.slice(bareOf(fullFrom).length);
    if (fullFrom !== bareFrom) safe[bareFrom] = bareTo;
  }
  return Object.keys(safe).length ? applyRenameMapping(monster, safe) : monster;
}

/**
 * Renames run AFTER the final lint sweep, so a reference the rename mapping
 * fails to rewrite would ship unchecked. Names are cosmetic — if applying
 * the renames manufactures a reference orphan the old text resolved, the
 * revert is free and strictly safer than shipping an unadjudicable block.
 */
export function renameAbilitiesSafely(monster, parsed, edition = '2024') {
  const renamed = applyAbilityRenames(monster, parsed);
  if (renamed === monster) return monster;
  const orphanCount = (m) => lintStatblock(m, { edition }).findings
    .filter((f) => f.rule === 'undefined-attack-ref').length;
  return orphanCount(renamed) > orphanCount(monster) ? monster : renamed;
}

export function validateNamingResponse(jsonString) {
  const parsed = tryParse(jsonString);
  return !!parsed && Array.isArray(parsed.candidates)
    && parsed.candidates.length >= 3
    && parsed.candidates.every((c) => typeof c === 'string' && c.trim() !== '')
    && (parsed.grade === undefined || /^[A-F][+-]?$/i.test(String(parsed.grade).trim()));
}

/**
 * Grade gate (owner calls, 2026-08-02): only an A keeps the current name;
 * B or lower opens the rename pool ("renaming is seldom happening" after
 * the C threshold proved too lenient a keep). Missing/malformed grades
 * still lean KEEP — a silent grade must not trigger a rename. The
 * deterministic pickName filters stay hard gates either way: a
 * filter-failing provisional renames even at grade A.
 */
export function nameGradeKeeps(grade) {
  const g = String(grade ?? '').trim();
  if (!/^[A-F][+-]?$/i.test(g)) return true; // missing/malformed leans keep
  // A/B keep (reverted 2026-08-03 — the A-only threshold produced worse
  // renames than the provisionals it replaced: "Frosthowl Giant" became
  // "Glacial Brawler"; the judge's candidates are the weak link, so
  // renames stay reserved for genuinely bad names).
  return /^[AB]/i.test(g);
}

/**
 * "<modifier> <verb>-er" formula names sort LAST among candidates —
 * demotion, not rejection (live: "Glacial Brawler" beat better shapes).
 * The provisional is never demoted; callers pool it separately.
 */
export function demoteFormulaHeads(candidates) {
  const erHead = (raw) => {
    const words = String(raw).trim().split(/\s+/);
    return words.length >= 2 && /[a-z]er$/i.test(words[words.length - 1]);
  };
  return [...candidates.filter((c) => !erHead(c)), ...candidates.filter(erHead)];
}

/**
 * Deterministic candidate selection: first name that survives every filter.
 * The register discipline is enforced by filtering, not by hoping.
 */
const FLAT_ATTACK_HEADS = new Set(['talon', 'claw', 'fang', 'bite', 'sting', 'strike', 'slash', 'shriek', 'swoop', 'pounce', 'rake', 'gore', 'lash']);

export function pickName(candidates, { seedTokens = [], register = '', bans = [], type = '' } = {}) {
  const isCoinage = /coinage/.test(register);
  for (const raw of candidates) {
    // Leading articles are stripped, not rejected — "the Silent Clinger"
    // becomes "Silent Clinger"; prose supplies "the".
    const name = raw.trim().replace(/^the\s+/i, '');
    const lower = name.toLowerCase();
    if (!name || name.includes('-')) continue;
    if (headIsMenace(name)) continue;
    // Flat attack-routine descriptors ("Swoop Talon", "Shriek Talon") —
    // the concept-path failure mode. 0/329 official names end in an
    // attack noun.
    if (name.includes(' ') && FLAT_ATTACK_HEADS.has(name.split(/\s+/).pop().toLowerCase())) continue;
    if (BATHOS_RE.test(name)) continue;
    if (SRD_NAMES.has(lower.replace(/^the /, ''))) continue;
    if (seedTokens.some((t) => lower.includes(t))) continue;
    if (bans.some((b) => lower.includes(b))) continue;
    // Containment, not equality — "Swarm of Tiny Undead" may use undead
    // words even though the type string isn't exactly "Undead". Trailing
    // boundary only: fused compounds ("Chainwraith") must match, while
    // substrings ("Lichen", "demonstrate") must not.
    if (type && Object.entries(RESERVED_TYPE_WORDS).some(([w, t]) =>
      !type.toLowerCase().includes(t.toLowerCase()) && new RegExp(`${w}\\b`, 'i').test(name))) continue;
    if (isCoinage && (name.includes(' ') || name.length > 9)) continue;
    if (name.split(/\s+/).length > 3) continue;
    return titleCaseName(name);
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
  // Trailing-s plurals rename as plurals ("thawcaps" → "shiverfunguses",
  // not "shiverfunguss" — live: Frozen Chitter's conspecific reference).
  return text.replace(new RegExp(`${escapeRe(oldName)}(s\\b)?`, 'gi'), (m, pluralS) => {
    const base = m.replace(/s$/i, '') === m.replace(/s$/i, '').toLowerCase() ? newName.toLowerCase() : newName;
    if (!pluralS) return base;
    return /(?:s|x|ch|sh)$/i.test(newName) ? `${base}es` : `${base}s`;
  });
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
    // Never word-pair-map common OBJECT nouns — "the barrier"/"the shield"
    // in ability text usually names something the ability CREATES, not the
    // creature (live corruption: a "…Barrier"→"Shardwisp" rename turned an
    // action's barrier object into "the shardwisp" throughout). The exact
    // full-name replacement above still applies.
    wordPairs = wordPairs.filter(([o]) => !SELF_REF_STOP.has(o.toLowerCase()));
    for (const list of Object.values(out.sections ?? {})) {
      for (const entry of list ?? []) {
        if (entry.name === oldName) entry.name = newName;
        entry.text = renameInText(entry.text, oldName, newName);
        // Only the self-reference form "the <word>" — a bare word replace
        // would corrupt OTHER entry names' references ("Shadow Claw").
        for (const [o, n] of wordPairs) {
          // "the <word>", "the <word>'s", and bare plurals ("other
          // thawcaps") — possessives and plurals survived the article-only
          // replace (live: Shiverfungus talking to "other thawcaps",
          // an aura keyed to "the herder's choice").
          entry.text = entry.text.replace(
            new RegExp(`\\b(the) ${escapeRe(o)}('s)?\\b`, 'gi'),
            (m, article, poss) => `${article} ${n.toLowerCase()}${poss ?? ''}`
          );
          const plural = /(?:s|x|ch|sh)$/i.test(n) ? `${n.toLowerCase()}es` : `${n.toLowerCase()}s`;
          entry.text = entry.text.replace(
            new RegExp(`\\b${escapeRe(o)}s\\b`, 'gi'),
            plural
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
  const { concept, description = '', cr, archetypeName, caster = false, archetypeSource = 'user', edition = '2024', seedTraits = null, degraded = false, resolvedType = null, typeSource = 'auto', lore = null, themes = null, mind = null, conceptSize = null, movement = null, attackMode = null, signatureMechanic = null, onProgress = null } = options;

  // The skeleton path is how 2024 monsters are built now; set
  // localStorage['statblock-skeleton'] = '0' to fall back to the chassis.
  // Both paths share this call site, the progress staging and the save flow.
  //
  // 2024 only — the ability library's 2014 templates cover about half the rows
  // and no traits at all. Seeded (blank-form "random monster") generations DO
  // use it: the seed's synthesized concept arrives in `concept` like any other,
  // and excluding them meant the most common way to try the generator silently
  // kept using the old path.
  const useSkeleton = edition === '2024' && usesSkeletonPath();
  logger.log(`[statblock] path: ${useSkeleton ? 'SKELETON' : 'chassis'} (edition ${edition}`
    + `${seedTraits ? ', seeded' : ''})`);
  if (useSkeleton) {
    const { generateFromSkeleton } = await import('../skeleton/generate.mjs');
    return generateFromSkeleton({
      concept, description, cr, archetypeName, resolvedType, lore, themes, mind, degraded, onProgress, caster,
      conceptSize, movement, attackMode, signatureMechanic,
    }, callLLM);
  }

  const { chassis, plan, archetype } = buildContext(cr, archetypeName);
  // Perceived-loading staging (owner ask, 2026-07-30): the engine's numbers
  // exist before any LLM call — surface them instantly, then the assembled
  // draft while the audit/fix ladder polishes. Progress must never break
  // generation.
  const progress = (phase, data) => {
    if (!onProgress) return;
    try { onProgress({ phase, ...data }); } catch { /* display-only */ }
  };
  progress('chassis', {
    chassis: {
      ac: chassis.ac,
      hp: chassis.hp,
      cr_str: crKeyFor(cr),
      pb: chassis.pb,
      xp: challengeRatings[crKeyFor(cr)]?.XP ?? 0,
    },
  });
  const assembleCtx = { cr, chassis, plan, archetypeName: archetype, archetypeSource, resolvedType };
  const seedTokens = seedTraits ? seedLeakTokens(seedTraits) : undefined;
  const { perAttack: rawPerAttack, total: totalDamage } = damageBudgetFor(cr, chassis, plan);
  // Band against the SKELETON per-attack value (what the prompt dictated),
  // not the raw budget — at low CR the budget is unreachable with the
  // mandatory flat mod (live: CR 1/2 budget 4, skeleton 6 (1d6 + 3)).
  const perAttack = attackDamageDiceFor(rawPerAttack, requiredAttackModFor(chassis)).avg;
  const defenseCaps = defenseBudgetFor(cr, archetype);
  const prompt = buildGenerationPrompt({ concept, description, cr, chassis, plan, caster, edition, resolvedType });

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

  progress('status', { stage: 'writing' });
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
    progress('status', { stage: 'rebuilding' });
    const retryPrompt = `${prompt}

Your previous attempt was rejected for these reasons — fix ALL of them this time:
${outcome.rejects.map((f) => `- ${f.message}`).join('\n')}`;
    const retry = await attempt(retryPrompt);
    if (retry) outcome = retry;
  }

  // Mechanical-audit judgment layer (owner call, 2026-07-29, option c):
  // complex blocks only — CR >= 5 or legendary machinery — because the
  // model doesn't fumble simple monsters, and the long tail lives in the
  // complex ones. One call; span-verified findings merge into the FIRST
  // fix round below; the block is never re-audited and audit findings can
  // never block shipping (never-fail generation). Skipped when degraded.
  progress('draft', { monster: outcome.monster });

  // Never audit a block with unresolved STRUCTURAL rejects: those skip the
  // fix loop, so audit findings would merge and then be thrown away (live:
  // Spinepounce CR 22 — a correct dead-clause finding was spent on a block
  // that shipped with missing legendary actions and never ran a fix round).
  let auditProblems = [];
  let auditGrade = null; // independent name grade — the audit has no candidates to sell
  if (!degraded && !needsRegen(outcome.rejects) && auditEligible(outcome.monster, cr)) {
    try {
      progress('status', { stage: 'audit' });
      const auditRaw = await callLLM(buildAuditPrompt(outcome.monster, edition), validateAuditResponse);
      auditProblems = verifyAuditFindings(outcome.monster, auditRaw);
      auditGrade = auditNameGrade(auditRaw);
      if (auditGrade) logger.log('audit name grade:', auditGrade, 'for', outcome.monster.name);
      // Type correction: the judgment layer can retype (live: a "Giant"
      // bodiless mist, a "Construct" fungus — the fix ladder rewrites
      // entry TEXT and could never fix the type field). Guards: never a
      // user-picked type, never Swarm forms, canonical list only.
      const retype = auditTypeCorrection(auditRaw, outcome.monster.type);
      if (retype && typeSource !== 'user' && !/swarm/i.test(outcome.monster.type ?? '')) {
        logger.log('audit type correction:', outcome.monster.type, '→', retype);
        outcome.monster.type = retype;
      }
      if (auditProblems.length) {
        logger.log('mechanical audit merged findings:', auditProblems.map((f) => `${f.loc.section}/${f.loc.entry}: ${f.message}`));
      }
    } catch (e) {
      logger.warn('mechanical audit skipped:', e?.message ?? e);
    }
  }

  // Up to three fix rounds — but only MECHANICAL rejects earn the extra
  // rounds (owner call, 2026-07-24): cosmetic leftovers ship silently
  // anyway, so calls spent polishing them past round one are waste.
  for (let i = 0; i < 3 && (outcome.rejects.length || auditProblems.length) && !needsRegen(outcome.rejects); i++) {
    if (i >= 1 && onlyStyleRejects(outcome.rejects)) break;
    let monster = outcome.monster;
    if (outcome.rejects.some((f) => f.rule === 'seed-leakage')) {
      monster = await renameLeakedNames(monster, seedTokens, seedTraits?.naming, callLLM);
    }
    const entryRejects = [
      ...outcome.rejects.filter((f) => ENTRY_FIXABLE.has(f.rule) && f.loc),
      ...auditProblems,
    ];
    auditProblems = []; // first round only — never re-audited, never re-spent
    if (entryRejects.length) {
      progress('status', { stage: 'fixing', count: entryRejects.length });
      monster = await rewriteFlaggedEntries(monster, entryRejects, { edition, chassis, plan, cr }, callLLM);
    }
    // Fixed text may drift numerically — run corrections, then re-judge.
    monster = applyCorrections(monster, lintStatblock(monster, { chassis, plan, edition, seedTokens, perAttack, totalDamage, defenseCaps }).findings, { chassis });
    const result = lintStatblock(monster, { chassis, plan, edition, seedTokens, perAttack, totalDamage, defenseCaps });
    outcome = { monster, rejects: result.findings.filter((f) => f.severity === 'reject') };
    progress('draft', { monster: outcome.monster });
  }

  // Final normalization pass: correctable leftovers must not ship. Two
  // renames colliding on one entry inside a single applyCorrections pass
  // (the first rename wins; the second's lookup then misses on the stale
  // name) — or a last-round fix call introducing a fresh correctable —
  // leaves corrections unapplied, and the round loop only re-enters on
  // REJECTS (live finding: "Death Knell (Recharge 5-6)" shipped as a trait
  // with no wart logged). One more lint + apply closes the class.
  {
    const sweep = lintStatblock(outcome.monster, { chassis, plan, edition, seedTokens, perAttack, totalDamage, defenseCaps });
    if (sweep.findings.some((f) => f.severity === 'correctable')) {
      outcome.monster = applyCorrections(outcome.monster, sweep.findings, { chassis });
    }
  }

  // GENERATION never fails once an assembled block exists (owner call,
  // 2026-07-24): after three fix rounds, surviving warts ship — stamped on
  // the monster (lint_warnings) and surfaced by the caller — because a
  // failed generation is strictly worse UX than a blemish the user can
  // edit or re-roll. Re-rolls keep their stricter gates: failing a re-roll
  // safely preserves the original entry, so there failure IS the cheap
  // outcome.
  let lintWarnings = null;
  if (outcome.rejects.length) {
    logger.warn(`${degraded ? 'Degraded-model mode: ' : ''}shipping with unresolved rejects:`,
      outcome.rejects.map((f) => `${f.rule}: ${f.message}`));
    lintWarnings = outcome.rejects.map((f) => f.rule);
  }
  // Naming pass (seeded generations only): name the FINISHED creature. The
  // main call's name is provisional; a dedicated micro-call reads the actual
  // design and proposes candidates, which are filtered deterministically —
  // first survivor wins, all-fail keeps the provisional name.
  // Anti-clustering: each naming call rolls a random subset of overused
  // stems to ban (statistical — the stems stay reachable across
  // generations, the attractor breaks; "Chit-" swarms ×6 was the trigger).
  const nameBans = rollNameBans({ type: outcome.monster.type ?? '', archetypeName });
  // Audit-graded keep: an INDEPENDENT judge rated the name A/B and the
  // provisional clears every deterministic filter — the naming call is
  // skipped (owner design, 2026-08-02: the namer grading its own
  // predecessor had a conflict of interest; and a saved call besides).
  const auditKeepsName = auditGrade != null && nameGradeKeeps(auditGrade)
    && pickName([outcome.monster.name], { seedTokens, bans: nameBans, type: outcome.monster.type ?? '' }) === outcome.monster.name;
  if (auditKeepsName) {
    logger.log('naming call skipped — audit graded', auditGrade);
  } else if (seedTraits) {
    try {
      progress('status', { stage: 'naming' });
      const raw = await callLLM(buildNamingPrompt(outcome.monster, seedTraits, nameBans, concept, auditGrade, lore), validateNamingResponse);
      const parsed = raw ? tryParse(raw) : null;
      if (parsed?.grade) logger.log('naming grade:', parsed.grade, 'for', outcome.monster.name);
      const effectiveGrade = auditGrade ?? parsed?.grade;
      const ranked = parsed ? demoteFormulaHeads(parsed.candidates) : [];
      const pool = parsed ? (nameGradeKeeps(effectiveGrade) ? [outcome.monster.name, ...ranked] : ranked) : [];
      const chosen = parsed
        ? pickName(pool, { seedTokens, register: seedTraits.naming ?? '', bans: nameBans, type: outcome.monster.type ?? '' })
        : null;
      if (chosen && chosen !== outcome.monster.name) {
        outcome.monster = applyRenameMapping(outcome.monster, { [outcome.monster.name]: chosen });
      }
      outcome.monster = renameAbilitiesSafely(outcome.monster, parsed, edition);
    } catch {
      /* naming is best-effort — the provisional name stands */
    }
  } else if (options.namePass) {
    // Concept-path naming refinement (owner call, batch 5): the naming
    // micro-call runs on the random path and reliably lands MM-register
    // names (Grimecloak Cinder, Uulgrath); concept generations skipped it
    // and kept producing flat attack-routine descriptors (Swoop Talon,
    // Shriek Talon). Gate: if the model KEPT the user's typed name
    // verbatim, it judged it a proper name (Headless Horseman) — honor it,
    // no call. If it renamed (or nothing was typed), it judged the input
    // generic — refine with candidates. `namePass` is opt-in so headless
    // callers and tests keep the old single-call contract.
    const typed = (options.namePass.userTypedName ?? '').trim().toLowerCase();
    const kept = typed !== '' && outcome.monster.name.trim().toLowerCase() === typed;
    if (!kept) {
      try {
        progress('status', { stage: 'naming' });
        const raw = await callLLM(buildNamingPrompt(outcome.monster, null, nameBans, concept, auditGrade, lore), validateNamingResponse);
        const parsed = raw ? tryParse(raw) : null;
        if (parsed?.grade) logger.log('naming grade:', parsed.grade, 'for', outcome.monster.name);
        const chosen = parsed
          ? pickName(nameGradeKeeps(auditGrade ?? parsed.grade) ? [outcome.monster.name, ...demoteFormulaHeads(parsed.candidates)] : demoteFormulaHeads(parsed.candidates), { bans: nameBans, type: outcome.monster.type ?? '' })
          : null;
        if (chosen && chosen !== outcome.monster.name) {
          outcome.monster = applyRenameMapping(outcome.monster, { [outcome.monster.name]: chosen });
        }
        outcome.monster = renameAbilitiesSafely(outcome.monster, parsed, edition);
      } catch {
        /* naming is best-effort — the provisional name stands */
      }
    }
  }

  // Names are final now — one last epithet sweep. A rename can turn the OLD
  // name's words into an unrelated epithet ("the tar coil" everywhere after
  // Tar Coil → Tarwurm; live finding), which the pre-naming lint pass could
  // not see and the head-noun rename mapping misses for two-word forms.
  {
    const epithetFindings = lintStatblock(outcome.monster, { edition }).findings
      .filter((f) => f.rule === 'epithet-self-reference');
    if (epithetFindings.length) {
      outcome.monster = applyCorrections(outcome.monster, epithetFindings, { chassis });
    }
  }

  // 2014 edition ships in the legacy model shape: the existing Statblock.vue
  // display, exports, encounter adapter, and inline editing all consume it.
  const finished = edition === '2014' ? toLegacyModel(outcome.monster) : outcome.monster;
  if (lintWarnings) finished.lint_warnings = lintWarnings;
  // Persist the rolled seed for provenance and future name-only re-rolls.
  if (seedTraits) finished.concept_seed = { ...seedTraits };
  return finished;
}
