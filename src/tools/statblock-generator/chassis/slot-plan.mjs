/**
 * Archetype/tier resolver for 2024 statblock generation (build-order step 2).
 *
 * CR + archetype → slot plan: how many traits/actions the block gets, whether
 * multiattack / bonus action / reaction / legendary are forbidden, optional, or
 * required, and which archetype required_slots fill those counts. Consumed by
 * the prompt builder (step 5) and lint (step 4).
 *
 * Deterministic by design: the resolver emits ranges + obligations, never rolls
 * dice — the LLM fills within the ranges and lint enforces them (settled
 * decision, see docs/2024-architecture.md).
 *
 * Tier ranges and archetype required_slots strings are read live from
 * archetype-chassis-spec.json. Directive strings ("x2 required", "recommended,
 * resistance 3/day", ...) and slot categorization are mapped here in code,
 * keyed on the exact spec values — an unrecognized value throws, so spec edits
 * can't silently produce a stale or uncategorized plan.
 */
import spec from '@/data/archetype-chassis-spec.json';
import { assertValidCR } from './chassis.mjs';

// spec objects carry "_comment" documentation keys alongside the real entries.
const TIERS = Object.entries(spec.structural_tiers).filter(([k]) => !k.startsWith('_'));
const ARCHETYPES = Object.fromEntries(
  Object.entries(spec.archetypes).filter(([k]) => !k.startsWith('_'))
);

/**
 * Category map for archetype required_slots, keyed on the exact spec string.
 * Descriptions stay in the spec (single source); only the mechanical
 * categorization lives here. `category` may be an array when the slot can be
 * realized more than one way (narrowed per tier at resolve time). `min_tier`
 * drops the slot entirely below that tier index.
 */
const SLOT_CATEGORIES = {
  // brute
  'heavy melee attack': { category: 'action' },
  'high STR': { category: 'passive' },
  // defender
  'reaction (tier 3+): protect ally or punish movement': { category: 'reaction', min_tier: 3 },
  // skirmisher — flyby/spider climb/burrow are traits; bonus-action Disengage
  // is only legal where the tier allows bonus actions
  'movement trick: bonus-action Disengage, flyby, spider climb, or burrow': {
    category: ['trait', 'bonus_action'],
  },
  // artillery
  'primary ranged attack, 60ft+': { category: 'action' },
  'escape or zone-denial tool': { category: ['action', 'bonus_action'] },
  // controller
  'save-based action imposing a condition (2024 capitalized condition names)': {
    category: 'action',
  },
  // lurker
  'stealth/phasing/invisibility trait': { category: 'trait' },
  'ambush or once-per-fight nova mechanic': { category: ['trait', 'action'] },
  // support
  'buff, heal, or enable action targeting allies': { category: 'action' },
  // swarm
  "swarm trait (occupy other creatures' space, no Tiny-space penalty)": { category: 'trait' },
  'resistance package: Bludgeoning/Piercing/Slashing': { category: 'passive' },
  'condition immunities: Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned':
    { category: 'passive' },
  'half-damage attack mode at or below half HP': { category: 'action' },
};

function resolveMultiattack(value) {
  if (value === false) return { status: 'forbidden', count: null };
  const map = {
    optional: { status: 'optional', count: null },
    'x2 required': { status: 'required', count: [2, 2] },
    'x2-x3 required': { status: 'required', count: [2, 3] },
    'x3 required': { status: 'required', count: [3, 3] },
  };
  if (!map[value]) throw new Error(`Unrecognized multiattack directive in spec: ${value}`);
  return { ...map[value], count: map[value].count ? [...map[value].count] : null };
}

function resolveTriState(value, field) {
  if (value === false) return 'forbidden';
  if (value === 'optional') return 'optional';
  if (value === 'recommended') return 'recommended';
  // "archetype-dependent" resolves to optional at the tier level; an archetype
  // with a reaction slot upgrades the plan's reaction to 'required' below.
  if (value === 'archetype-dependent') return 'optional';
  throw new Error(`Unrecognized ${field} directive in spec: ${value}`);
}

function resolveLegendary(value) {
  const map = {
    false: { status: 'forbidden', resistance_per_day: null, consider_lair: false },
    optional: { status: 'optional', resistance_per_day: null, consider_lair: false },
    'recommended, resistance 3/day': {
      status: 'recommended', resistance_per_day: [3, 3], consider_lair: false,
    },
    'required, resistance 3-4/day, consider lair': {
      status: 'required', resistance_per_day: [3, 4], consider_lair: true,
    },
  };
  const entry = map[String(value)];
  if (!entry) throw new Error(`Unrecognized legendary directive in spec: ${value}`);
  return {
    ...entry,
    resistance_per_day: entry.resistance_per_day ? [...entry.resistance_per_day] : null,
  };
}

/** Tier key ('tier_3_veteran') for a CR. */
export function tierFor(cr) {
  assertValidCR(cr);
  const found = TIERS.find(([, t]) => cr >= t.cr[0] && cr <= t.cr[1]);
  if (!found) throw new RangeError(`No structural tier covers CR ${cr}`);
  return found[0];
}

function tierIndexOf(tierKey) {
  return Number(tierKey.split('_')[1]);
}

/**
 * Slot plan for a CR + archetype. `archetypeName` may be null or 'balanced'
 * for the baseline raw-chassis build (no required slots).
 */
export function slotPlanFor(cr, archetypeName = null) {
  assertValidCR(cr);
  const normalized = archetypeName === 'balanced' ? null : archetypeName;
  if (normalized != null && !ARCHETYPES[normalized]) {
    throw new RangeError(
      `Unknown archetype: ${archetypeName}. Valid archetypes: ${Object.keys(ARCHETYPES).join(', ')}, balanced`
    );
  }

  const tierKey = tierFor(cr);
  const tier = spec.structural_tiers[tierKey];
  const tierIndex = tierIndexOf(tierKey);

  const multiattack = resolveMultiattack(tier.multiattack);
  const bonusAction = resolveTriState(tier.bonus_action, 'bonus_action');
  let reaction = resolveTriState(tier.reaction, 'reaction');
  const legendary = resolveLegendary(tier.legendary);

  // Archetype required slots: tier-filtered, flexible categories narrowed to
  // realizations the tier allows.
  const requiredSlots = [];
  if (normalized != null) {
    for (const description of ARCHETYPES[normalized].required_slots ?? []) {
      const entry = SLOT_CATEGORIES[description];
      if (!entry) {
        throw new Error(`Spec required_slot has no categorization: "${description}"`);
      }
      if (entry.min_tier != null && tierIndex < entry.min_tier) continue;
      let category = Array.isArray(entry.category) ? [...entry.category] : entry.category;
      if (Array.isArray(category)) {
        const allowed = category.filter((c) => {
          if (c === 'bonus_action') return bonusAction !== 'forbidden';
          if (c === 'reaction') return reaction !== 'forbidden';
          return true;
        });
        category = allowed.length === 1 ? allowed[0] : allowed;
      }
      requiredSlots.push({ category, description });
    }
    if (requiredSlots.some((s) => s.category === 'reaction')) {
      reaction = 'required';
    }
  }

  // Required slots always fit: raise a category's bounds if obligations exceed
  // the tier's range (e.g. swarm's trait at tier 1, where traits are [0, 1]).
  const countIn = (cat) => requiredSlots.filter((s) => s.category === cat).length;
  const bounded = (range, requiredCount) => ({
    min: Math.max(range[0], requiredCount),
    max: Math.max(range[1], requiredCount),
  });

  return {
    cr,
    tier: tierKey,
    archetype: normalized,
    traits: bounded(tier.traits, countIn('trait')),
    actions: bounded(tier.actions, countIn('action')),
    multiattack,
    bonus_action: bonusAction,
    reaction,
    legendary,
    required_slots: requiredSlots,
  };
}
