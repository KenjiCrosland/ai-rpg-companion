/**
 * Dungeon dimensions — variety pools for the dungeon generator's
 * inference call. Mirrors the architecture of
 * `src/tools/setting-generator/utils/setting-dimensions.mjs`:
 *
 *   DUNGEON_TYPES — flat array of dungeon categories spanning burial
 *     sites, religious/ritual sites, knowledge/magic sites, military
 *     sites, industrial sites, lairs, natural spaces, architectural
 *     curiosities, wrecks, organic-body sites, and liminal/planar
 *     spaces. The inference call picks ONE type per generation.
 *
 *   DUNGEON_CHARACTERS — sub-dimensioned object reused from settings.
 *     Same 8 sub-dimensions, same values, same selection rule (pick
 *     3 values from 3 DIFFERENT sub-dimensions). Reused rather than
 *     forked because the character pools express texture that
 *     applies just as well to dungeons; bad fits surface in practice
 *     and can be pruned later. If a third tool needs character pools
 *     we lift this to `src/shared/character-pools.mjs`.
 *
 *   DUNGEON_TENSIONS — flat array of ~15 distinct dungeon-shape
 *     situations. Each entry passes the test: "does this produce a
 *     dungeon that's structurally different to RUN at the table?"
 *     Re-skins (haunted-vs-cursed, conquered-and-rebuilt vs
 *     occupied-by-rivals) are deliberately collapsed.
 *
 *   DIFFICULTY_TIERS — 1-5 with monster CR maps and stake-scope.
 *     Orthogonal to tension: tension shapes WHAT is happening,
 *     difficulty modulates HOW BIG the consequences are. Tier 1 reads
 *     local, Tier 5 reads cosmic. The same tension applied at
 *     different tiers should read recognizably the same shape but at
 *     different scales.
 *
 * Soft-weighted types (god-corpse, plane-pocket, living-trap,
 * shadow-keep) lean toward Tier 3-5 in the inference roller when no
 * user signal exists. Not hard-gated — explicit user request overrides.
 *
 * Register selection reuses `humanoidRegisterList` from
 * `@/shared/register-list.mjs` — the same pool settings draw from.
 *
 * Anti-clustering tropes are dungeon-specific (ancient-seal-weakening,
 * lich-seeking-phylactery, cult-preparing-summoning,
 * dragon-hoarding-gold), since these are the LLM's go-to dungeon
 * narrative frames. The setting tropes apply less directly to dungeons.
 */

import {
  SETTING_CHARACTERS,
  SETTING_CHARACTER_SUBDIMENSIONS,
  CHARACTER_VALUE_TO_SUBDIMENSION,
  generateCharacterCandidates,
} from '../../setting-generator/utils/setting-dimensions.mjs';

/**
 * 33 dungeon types across 11 archetypal axes. The grouping comments
 * are taxonomy — they don't surface in the data model. Order within
 * groups is intentional: most-canonical-first. Soft-weighted entries
 * are flagged so the roller can downweight them at low tiers.
 */
export const DUNGEON_TYPES = [
  // Burial / death sites
  'tomb',
  'crypt',
  'catacombs',
  'necropolis',

  // Religious / ritual sites
  'temple-complex',
  'cult-compound',
  'ziggurat',
  'circle-of-stones',

  // Knowledge / magic sites
  'library-vault',
  'wizard-tower',
  'academy-ruin',
  'observatory',

  // Military / power sites
  'fortress',
  'prison',
  'arena',

  // Industrial / functional
  'mine',
  'factory-ruin',
  'sewer-maze',
  'brewery-ruin',

  // Lairs / creature spaces
  'lair',
  'dragon-roost',
  'cave-system',

  // Natural / wild
  'fey-grove',

  // Architectural curiosities
  'ruin',
  'manor-cursed',
  'maze',
  'clocktower',

  // Wrecks / vehicles
  'wreck',

  // Organic / body sites
  'giant-skeleton',
  'god-corpse',

  // Liminal / planar — soft-weighted to higher tiers via TIER_WEIGHTED_TYPES
  'plane-pocket',
  'living-trap',
  'shadow-keep',
];

/**
 * Soft-weighting for types whose narrative scale doesn't fit low
 * tiers cleanly. Weights below 1.0 reduce that type's selection
 * probability at the given tier; weights above 1.0 increase it. Types
 * not listed here are uniform-weighted across all tiers.
 *
 * Not hard-gated: even at Tier 1, god-corpse has a 0.1 weight, so a
 * Tier 1 god-corpse can still roll (just rarely). User can also
 * explicitly request any type at any tier via form input — the
 * weighting only affects the empty-input random roll.
 *
 * Indexed by tier (1-5).
 */
export const TIER_WEIGHTED_TYPES = {
  'god-corpse':    [0.05, 0.2, 0.7, 1.2, 1.5],
  'plane-pocket':  [0.1,  0.3, 0.8, 1.2, 1.5],
  'living-trap':   [0.2,  0.5, 1.0, 1.3, 1.5],
  'shadow-keep':   [0.2,  0.5, 1.0, 1.3, 1.5],
};

/**
 * Reuse setting's character sub-dimensions. The pools express texture
 * that applies just as well to a dungeon as to a settlement — a
 * "warlike + sun-scorched + ancient" character reads coherent for a
 * desert tomb just as it does for a desert city.
 */
export const DUNGEON_CHARACTERS = SETTING_CHARACTERS;
export const DUNGEON_CHARACTER_SUBDIMENSIONS = SETTING_CHARACTER_SUBDIMENSIONS;
export const DUNGEON_CHARACTER_VALUE_TO_SUBDIMENSION = CHARACTER_VALUE_TO_SUBDIMENSION;

/**
 * Dungeon tensions — the shape of what's happening, kept ORTHOGONAL
 * to difficulty (stake-scope). Each entry is structurally distinct at
 * the GM table: a different decision space, a different pacing, a
 * different sense of what the party should do.
 *
 * Tension does NOT encode stakes-scope. A `sealed-and-stirring` Tier 1
 * dungeon reads local (a bandit-king bound under a hilltop barrow);
 * the same tension at Tier 5 reads cosmic (a primordial god-corpse
 * stirring under an arctic vault). Same SHAPE, different STAKES.
 */
export const DUNGEON_TENSIONS = [
  'sealed-and-stirring',
  'freshly-occupied',
  'methodically-looted',
  'boss-decline',
  'cult-ascendant',
  'forgotten-knowledge',
  'succession-fracture',
  'prison-breaking',
  'awakening-architecture',
  'scoured-and-claimed',
  'occupied-by-rivals',
  'decaying-system',
  'harvesting-operation',
  'pilgrimage-route',
  'dormant-with-witness',
];

/**
 * Prose descriptions for each tension. The main prompt uses these to
 * reshape the field framings — "central_dynamic" reads through the
 * tension's lens, "current_occupation" describes who/what is in there
 * NOW in that tension's terms, "present_state" carries the tension's
 * pacing and pressure.
 */
export const DUNGEON_TENSION_DESCRIPTIONS = {
  'sealed-and-stirring':
    "Something here was bound, sealed, or imprisoned for a long time and is now starting to move. The seal is holding for now but weakening — access is getting easier, the bound thing's presence is bleeding into adjacent rooms, distant signs (dreams, weather, fauna behavior) point here. The clock is the dungeon's clock; the party may speed-run, stall, or arrive in the middle of the seal's final failure. Central_dynamic describes the stirring's current expression. Present_state evokes pressure-against-a-thinning-barrier, not a crisis already broken.",

  'freshly-occupied':
    "Someone moved in recently — days or weeks, not generations. The occupiers haven't entrenched: defenses are partial, some original architecture is unmodified, signs of recent activity (cookfires, fresh tracks, half-installed wards) are everywhere. The party may catch them mid-establishment. Central_dynamic describes who came, what they came for, what they've done so far. Current_occupation is heavy with specifics — who is here right now, doing what.",

  'methodically-looted':
    "A rival expedition came through this dungeon recently and worked it. Half-empty treasure rooms, sprung traps left in place, an organized retreat (not a rout). The party can track the looters as a sub-objective, find what they missed, or contend for whatever they took. Central_dynamic describes what the looters were after and how thorough they were. Present_state evokes aftermath, not active conflict in-dungeon.",

  'boss-decline':
    "The dungeon's dominant power is dying, fading, weakening, or distracted. Minions are getting bold; the inner hierarchy is fracturing; opportunists at the edges are testing what they can get away with. Succession is brewing or open. The party may exploit the weakness, ally with a rising minion, or accelerate the decline. Central_dynamic describes the decline's current shape (illness, exile, fading magic, distraction). Current_occupation shows the opportunism in motion.",

  'cult-ascendant':
    "A cult, faction, or zealot group is on the rise inside the dungeon, consolidating control and building toward something. Ritual stakes climbing, new fortifications going up, conversions happening, dissent purged. The party may interrupt the build-up, arrive after the threshold-crossing, or be drawn in as participants. Central_dynamic describes what the ascending faction is moving toward. Present_state evokes acceleration, not equilibrium.",

  'forgotten-knowledge':
    "What's valuable here is lore, not loot — and most of it is decaying. Books crumbling, languages dying out, technique half-remembered by the last few practitioners (who may be hostile, mad, or transcendent). The party trades combat for skill-checks; competing scholars or factions may arrive to claim what they can. Central_dynamic describes what's known here that the world has forgotten. Present_state evokes the slow loss, not its breaking point.",

  'succession-fracture':
    "Two (or more) rival factions inside the dungeon want the same thing — control, the boss's seat, an artifact, a territory. They're not yet at open war but the friction is permanent and the party can ally, play them against each other, or get caught in the middle. Different from boss-decline (which has a fading single power); succession-fracture has two living powers in tension. Central_dynamic describes the factions and what each wants. Current_occupation is layered with both sides' presences.",

  'prison-breaking':
    "Something has escaped, is escaping, or is about to escape. The dungeon's containment architecture is compromised — broken cells, smashed wards, missing guards. The party may pursue the escaped thing, contain it, negotiate with it, or arrive after it's already loose. Central_dynamic describes the escape's progress and the trail it left. Present_state evokes compromised containment, scattered evidence.",

  'awakening-architecture':
    "The dungeon itself is hostile and aware. Passages reroute, walls watch and react, the geometry is wrong in a deliberate way, the building has agency the party must contend with separately from any inhabitants. Environmental threat dominates creature threat. Central_dynamic describes what the dungeon is doing, in what register (organic, mechanical, magical, dreaming). Traps_and_security blurs into the architecture itself.",

  'scoured-and-claimed':
    "A single dominant force has emptied this dungeon of everything else and made it theirs. No factions to play against, no mixed inhabitants, no negotiating with minor powers — just the claimant, their direct servants, and the layered defense that lets them hold the whole place alone. Tactically clean; politically null. Central_dynamic describes how they took it and what they're using it for. Inhabitants is short and focused.",

  'occupied-by-rivals':
    "A mundane group (bandits, mercenaries, refugees, a military detachment, a smuggler operation) has taken over a dungeon whose original purpose was something else. They're not religious zealots (that's cult-ascendant); they're pragmatic occupiers using the place for shelter, base of operations, hidden cargo, or improvised stronghold. The original purpose hides under the new use. Central_dynamic describes who took it and what for. The original architecture is partly disguised, partly inconvenient to them.",

  'decaying-system':
    "Magic, machinery, or some other maintenance-dependent system that was keeping this dungeon stable is failing. Wards flicker, gravity-orientations are wrong in places, magical lighting strobes, doors won't seal, alarm systems false-trigger. The hazards aren't traps — they're a degrading framework. Rooms may behave differently between visits. Central_dynamic describes what's failing and how. Traps_and_security reads as decay-by-instability rather than active defense.",

  'harvesting-operation':
    "Something is being actively extracted here — souls, ore, magical essence, prisoners, organs, blood, lore, slaves — and the operation is ongoing. Workers, processes, schedules, output. The party may disrupt the operation, free what's being harvested, or trace the supply chain outward. Time pressure is operational (the next extraction shipment is leaving / the next batch will be ruined / the next victim is being prepped), not seal-stirring or cult-summoning. Central_dynamic describes what's being harvested and the pipeline.",

  'pilgrimage-route':
    "Many parties — adventurers, scholars, pilgrims, treasure-hunters — have come through this dungeon over years or generations. Some areas are well-trodden and meta-known (towns have maps and warnings); certain rooms are famously deadly or famously safe; the dungeon has REPUTATION. The party arrives with prior knowledge and probably interacts with other parties before, during, or after. Central_dynamic describes what's drawn so many people and what they've left behind. Current_occupation may include other expeditions.",

  'dormant-with-witness':
    "The central threat of the dungeon is inert — sleeping, dreaming, dead-but-not-departed, paused, statued, frozen. It is NOT stirring (that's sealed-and-stirring). But outside parties know about it and have come to the dungeon to watch, study, prepare, exploit, or guard. The tension is about THE WITNESSES, not the dormant thing itself: cultists awaiting awakening, scholars documenting, treasure-hunters trying to pry loot from a sleeping dragon, a priesthood maintaining vigil. Central_dynamic describes both the dormant thing AND who's here for it.",
};

/**
 * Difficulty tiers — orthogonal to tension. Tier modulates the
 * stake-scope of the prose throughout (local → cosmic) AND drives the
 * monster CR triplet for the encounter palette.
 *
 * Same tension applied at different tiers should read structurally the
 * same but at different scales. A `sealed-and-stirring` Tier 1 dungeon
 * reads as a bandit-king bound under a barrow whose seal is failing.
 * The same tension at Tier 5 reads as a primordial bound at the
 * underworld's edge whose chains are loosening.
 */
export const DIFFICULTY_TIERS = {
  1: {
    name: 'Tier 1: Basic — a local hero in the making.',
    monsterCRs: { minion: '1/4', strongMinion: '1', largeCreature: '3' },
    scopeOfStakes:
      "Local. Consequences fall on a village, a small region, a single community. Obstacles are simple traps and low-level enchantments. The party is establishing themselves; their reputation is local.",
  },
  2: {
    name: 'Tier 2: Expert — an established local hero.',
    monsterCRs: { minion: '1/2', strongMinion: '2', largeCreature: '4' },
    scopeOfStakes:
      "Regional. Consequences ripple through a city, a duchy, a large region. Obstacles include complex traps and dangerous magical wards. The party is known; allies and enemies have heard of them.",
  },
  3: {
    name: 'Tier 3: Champion — a regional / kingdom hero.',
    monsterCRs: { minion: '2', strongMinion: '5', largeCreature: '7' },
    scopeOfStakes:
      "Continental. Consequences affect multiple kingdoms, peoples, or a continent. Obstacles include deadly traps, ancient curses, world-class threats. The party is named in royal courts.",
  },
  4: {
    name: 'Tier 4: Master — a hero of the world.',
    monsterCRs: { minion: '5', strongMinion: '10', largeCreature: '13' },
    scopeOfStakes:
      "World-scale. Consequences threaten the world itself or the balance between major powers. Obstacles include reality-bending traps, civilization-ending magic, world-rupturing monsters. The party's name is woven into prophecy.",
  },
  5: {
    name: 'Tier 5: Immortal — a hero of the realms.',
    monsterCRs: { minion: '10', strongMinion: '15', largeCreature: '20' },
    scopeOfStakes:
      "Multiversal / cosmic. Consequences affect the planes, the afterlife, the fabric of reality. Obstacles are beyond mortal comprehension. The party is moving among gods and primordials.",
  },
};

export const DIFFICULTY_TIER_KEYS = Object.keys(DIFFICULTY_TIERS).map(Number);

/**
 * Dungeon-specific overused tropes — the LLM's go-to narrative frames
 * for dungeons. The setting tropes (silence-cult, succession-schism,
 * etc.) apply less directly here; these four are the dungeon-native
 * attractors observed across many empty-input generations.
 *
 * Banned via the main prompt's ANTI-CLUSTERING block. The tension
 * pool's shape-orthogonality avoids these by construction in most
 * cases — sealed-and-stirring doesn't require a seal, cult-ascendant
 * doesn't require a summoning ritual, dragon-roost type doesn't
 * require a gold hoard — but the explicit ban reinforces.
 */
export const OVERUSED_DUNGEON_TROPES = [
  "ancient seal weakening: a magical seal or ward is failing and must be maintained, repaired, or replaced. (If using sealed-and-stirring tension, frame the binding differently — as a chain, a sleep, a contract, a geographic prison, NOT a maintained ritual seal.)",
  "lich seeking phylactery: a lich's phylactery is hidden here, threatened, or must be recovered. The party finds the lich's true source of power.",
  "cult preparing summoning ritual: a cult is mid-ritual to summon a demon, devil, elder god, or other entity. The party must interrupt before completion.",
  "dragon hoarding gold: a dragon sits on a massive treasure hoard. The hoard is visible, central, and the obvious objective.",
];

// ---------------------------------------------------------------------
// Pickers
// ---------------------------------------------------------------------

/**
 * Pick a random tension from the pool. Used for the empty-input case
 * (no LLM involvement for tension; code-random gives uniform
 * distribution across the 15 entries).
 */
export function pickRandomTension(rng = Math.random) {
  return DUNGEON_TENSIONS[Math.floor(rng() * DUNGEON_TENSIONS.length)];
}

/**
 * Pick a random difficulty tier 1-5, uniform distribution. Used for
 * the empty-input case. User-provided difficulty (from the form)
 * bypasses this and is passed through `resolveDifficulty`.
 */
export function pickRandomDifficulty(rng = Math.random) {
  return DIFFICULTY_TIER_KEYS[Math.floor(rng() * DIFFICULTY_TIER_KEYS.length)];
}

/**
 * Pick a random dungeon type, weighted by the tier for soft-weighted
 * types (god-corpse, plane-pocket, living-trap, shadow-keep). Standard
 * types have uniform weight 1.0 at every tier; soft-weighted types
 * have per-tier weights in TIER_WEIGHTED_TYPES.
 *
 * Empty-input only — the LLM picks the type directly when user input
 * carries a signal (e.g., "describe a tomb" → tomb).
 *
 * @param {number} tier - 1-5
 * @param {() => number} [rng=Math.random]
 */
export function pickWeightedDungeonType(tier, rng = Math.random) {
  const validTier = DIFFICULTY_TIER_KEYS.includes(tier) ? tier : 1;
  const weights = DUNGEON_TYPES.map((t) => {
    const tierWeights = TIER_WEIGHTED_TYPES[t];
    if (!tierWeights) return 1.0;
    // tier - 1 because TIER_WEIGHTED_TYPES is 0-indexed (tier 1 → index 0).
    return tierWeights[validTier - 1];
  });
  const total = weights.reduce((sum, w) => sum + w, 0);
  let roll = rng() * total;
  for (let i = 0; i < DUNGEON_TYPES.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return DUNGEON_TYPES[i];
  }
  // Floating-point edge case: return the last entry.
  return DUNGEON_TYPES[DUNGEON_TYPES.length - 1];
}

/**
 * Validate and normalize an externally-supplied difficulty value.
 * Accepts:
 *   - integer 1-5 (returns as-is)
 *   - string "1" through "5" (parses)
 *   - anything else (returns null — caller rolls fresh)
 */
export function resolveDifficulty(raw) {
  if (raw === null || raw === undefined) return null;
  const n = typeof raw === 'number' ? raw : parseInt(raw, 10);
  if (Number.isInteger(n) && DIFFICULTY_TIER_KEYS.includes(n)) return n;
  return null;
}

/**
 * Anti-clustering: pick a rotating subset of overused dungeon tropes
 * to ban for this generation. Mirrors setting's
 * `getBannedTropesForGeneration` — bans ~70% of the pool, leaves ~30%
 * as available attractors when dimensions naturally fit them.
 *
 * Pool growth: as new dungeon attractors surface in production, append
 * to OVERUSED_DUNGEON_TROPES. The architecture gets stronger as the
 * pool grows.
 */
export function getBannedDungeonTropesForGeneration(rng = Math.random) {
  const shuffled = [...OVERUSED_DUNGEON_TROPES].sort(() => rng() - 0.5);
  const banCount = Math.ceil(OVERUSED_DUNGEON_TROPES.length * 0.7);
  return shuffled.slice(0, banCount);
}

/**
 * Re-export setting's character-candidate generator. Same selection
 * rule (3 values from 3 different sub-dimensions) applies to dungeons
 * because DUNGEON_CHARACTERS === SETTING_CHARACTERS by reuse.
 */
export { generateCharacterCandidates };
