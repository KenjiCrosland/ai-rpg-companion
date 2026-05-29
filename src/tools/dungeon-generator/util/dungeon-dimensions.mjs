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
import { REGISTER_CHARACTER_WHITELISTS } from '@/shared/character-whitelist-registry.mjs';
import { findRegisterByPrefix } from '@/shared/registers/index.mjs';

/**
 * Dungeon types — SHAPE, SCALE, and FRAME ONLY. No purpose-coded
 * values (a "tomb" describes purpose, not shape; that lives in
 * organizingLogic now). After this refactor, type ⊥ organizingLogic
 * by construction — no contradiction to reconcile.
 *
 * The principle: three dimensions own disjoint territory.
 *   - organizingLogic = PURPOSE (what the place was built or shaped FOR)
 *   - type = PHYSICAL FORM (gross shape, scale, cosmological frame)
 *   - character = MOOD / STATE / GEOGRAPHY
 *
 * Every value here passes the test: "does it describe SHAPE/SCALE/FRAME,
 * or PURPOSE?" If a value implies a purpose (tomb, fortress, mine, lair,
 * god-corpse), it's contraband — purpose lives in organizingLogic.
 *
 * Evocative purpose-words (tomb, lair, foundry, hollow) survive
 * downstream via organizingLogic → placeType, where they're rendered
 * from the logic without fighting it.
 *
 * Soft-weighted entries (planar-pocket, undercity, sprawling-labyrinth)
 * are downweighted at low tiers via TIER_WEIGHTED_TYPES.
 */
export const DUNGEON_TYPES = [
  // Vertical shapes
  'spire',                // tall single tower; airy, exposed
  'tower',                // single tower, compact
  'vertical-shaft',       // deep narrow descent

  // Horizontal sprawl
  'undercity',            // multi-level urban sprawl below the surface
  'sprawling-labyrinth',  // vast convoluted floor-plan
  'maze',                 // smaller, focused convolution

  // Chamber shapes
  'single-great-chamber', // one large room as the whole dungeon
  'chambered-complex',    // many rooms branching off a central spine

  // Natural / formless
  'cave-system',          // natural cavern network

  // Collapsed / inverted
  'wreck',                // sunken or collapsed structure

  // Cosmological frame
  'planar-pocket',        // a bubble of off-axis reality
];

/**
 * Curated checklist of purpose-coded keywords that any DUNGEON_TYPES
 * value's substring would imply purpose, not shape. Used by the
 * vocabulary-disjointness test (regression guard against ever
 * re-introducing a structural purpose-word into the type axis).
 *
 * To add a new dungeon type: verify the lowercased name contains
 * none of these substrings. If it does, the value belongs in
 * organizingLogic or character, not type.
 */
export const PURPOSE_KEYWORDS = [
  // Funerary
  'tomb', 'crypt', 'catacomb', 'necropolis', 'barrow', 'sepulcher', 'ossuary', 'mound',
  // Containment
  'prison', 'gaol', 'vault', 'oubliette',
  // Production
  'mine', 'factory', 'foundry', 'forge', 'mill', 'brewery', 'workshop', 'works',
  // Inhabited base
  'fortress', 'keep', 'hold', 'compound', 'garrison', 'manor', 'palace', 'temple', 'cult', 'monastery',
  // Creature territory
  'lair', 'roost', 'warren', 'den', 'nest', 'burrow',
  // Formed (organic)
  'corpse', 'skeleton',
  // Knowledge / institutional
  'library', 'academy', 'wizard', 'observatory', 'archive',
  // Specific genre tropes (purpose-bearing)
  'arena', 'grove', 'circle-of-stones', 'shadow-keep', 'living-trap',
];

/**
 * Tier-weighting for types whose narrative scale doesn't fit low
 * tiers cleanly. Weights below 1.0 reduce that type's selection
 * probability at the given tier; weights above 1.0 increase it; a
 * weight of 0 hard-bans the type at that tier. Types not listed
 * here are uniform-weighted across all tiers (type is shape-only
 * by design; most types don't carry inherent scope).
 *
 * planar-pocket is the one type that IS inherently cosmic by shape
 * (a bubble of off-axis reality is not a local thing), so it's
 * hard-banned at tier 1-2 to stop the cosmic-drift that dominates
 * low-tier generations. Tier 3+ keeps the soft-weight ramp.
 *
 * User can still explicitly request any type at any tier via form
 * input — the weighting only affects the empty-input random roll.
 *
 * Indexed by tier (1-5).
 */
export const TIER_WEIGHTED_TYPES = {
  'planar-pocket':       [0,    0,   0.8, 1.2, 1.5], // hard-ban T1-2; cosmic-only shape
  'undercity':           [0.3,  0.6, 1.0, 1.3, 1.5], // vast scale, lean T2+
  'sprawling-labyrinth': [0.5,  0.7, 1.0, 1.2, 1.3], // soft vast-scale bias
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
 * tension's lens, "inhabitants" describes who/what is in there
 * NOW in that tension's terms, "present_state" carries the tension's
 * pacing and pressure as a tight clock.
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
    "Many parties — adventurers, scholars, pilgrims, treasure-hunters — have come through this dungeon over years or generations. Some areas are well-trodden and meta-known (towns have maps and warnings); certain rooms are famously deadly or famously safe; the dungeon has REPUTATION. The party arrives with prior knowledge and probably interacts with other parties before, during, or after. Central_dynamic describes what's drawn so many people and what they've left behind. Current_occupation may include other expeditions.\n\n" +
    "RENDER AS CROWD-INFILTRATION, NOT A PETITION QUEUE. The party is NOT a supplicant awaiting judgment from an authority at the heart of the dungeon — they are intruders moving THROUGH the pilgrim throng and PAST its gatekeepers toward a deeper objective the pilgrimage guards or obscures. Four properties:\n" +
    "- the crowd is COVER to blend into;\n" +
    "- the pilgrimage's customs and rituals are an OBSTACLE LAYER to observe and mimic;\n" +
    "- any judging authority is a CHECKPOINT to bypass — never a tribunal to petition;\n" +
    "- the objective is DEEPER in the space; the party penetrates toward it.\n\n" +
    "NEVER render the party as one of the supplicants in a queue, the authority as a tribunal the party submits to, or a ritual the party arrives to witness. A crowd of pilgrims is a crowd to DISAPPEAR INTO, not a line to JOIN.",

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
      "Local. Consequences fall on a village, a hilltop, a single hamlet or hold. Obstacles are simple traps and low-level enchantments. The party is establishing themselves; their reputation is local.",
    dangerShelf:
      "Painful, recoverable with basic rest or mundane care. Whatever the creature does, the affected character is fine after a short rest plus a healer's kit or downtime.",
  },
  2: {
    name: 'Tier 2: Expert — an established local hero.',
    monsterCRs: { minion: '1/2', strongMinion: '2', largeCreature: '4' },
    scopeOfStakes:
      "Local-to-regional. Consequences ripple from a single community out to a town or small district. Obstacles include complex traps and dangerous magical wards. The party is known across a small region; word travels two or three days' ride.",
    dangerShelf:
      "Painful, recoverable with basic care or short downtime. Effects may linger through the encounter and a rest, but are gone within a day or two of downtime.",
  },
  3: {
    name: 'Tier 3: Champion — a regional / kingdom hero.',
    monsterCRs: { minion: '2', strongMinion: '5', largeCreature: '7' },
    scopeOfStakes:
      "Regional / kingdom. Consequences fall on a kingdom, a duchy, a city, or a substantial province. Obstacles include deadly traps and ancient curses. The party is named in royal courts. Grounded — NOT cosmic.",
    dangerShelf:
      "Persists after the fight; requires magical intervention to clear (Lesser Restoration, Remove Curse, or comparable). The wound doesn't close on its own.",
  },
  4: {
    name: 'Tier 4: Master — a hero of multiple realms.',
    monsterCRs: { minion: '5', strongMinion: '10', largeCreature: '13' },
    scopeOfStakes:
      "Multi-kingdom. Consequences affect several kingdoms, peoples, or a substantial continental region. Obstacles include reality-bending traps and civilization-ending magic. The party's name is woven into the politics and prophecy of more than one realm.",
    dangerShelf:
      "Carries into the next session; requires significant effort to reverse (Greater Restoration, dedicated downtime, a pilgrimage to a specific healer or shrine). The character feels it on the sheet between sessions.",
  },
  5: {
    name: 'Tier 5: Immortal — a hero of the realms.',
    monsterCRs: { minion: '10', strongMinion: '15', largeCreature: '20' },
    scopeOfStakes:
      "Continental and cosmic. Consequences affect a continent, the planes, the afterlife, the fabric of reality. Obstacles are beyond mortal comprehension. The party is moving among gods and primordials.",
    dangerShelf:
      "Leaves a permanent or near-permanent mark — the same physical effect doesn't stop on its own; Wish-grade magic or comparable to reverse. A burn that keeps spreading. A wound that won't close ever. Petrification that doesn't wear off. The character may functionally leave the campaign without high-tier magical intervention.",
  },
};

export const DIFFICULTY_TIER_KEYS = Object.keys(DIFFICULTY_TIERS).map(Number);

/**
 * Global invariant for dungeon generation, threaded into the prompt's
 * core framing regardless of power structure. Guards against the
 * "court / audience hall / petition queue" failure mode: a dungeon is
 * a SPACE the party physically traverses against resistance, not a
 * SCENE they attend. Especially load-bearing for power structures
 * where the dominant force is social (living_order) — without this,
 * the LLM happily renders the institution as one figure on a dais
 * receiving petitioners.
 */
/**
 * Operational voice — the writing register for body fields. Layered on
 * top of the cultural / linguistic register (which governs naming and
 * phonology); these stack with no conflict. State the global voice
 * once; per-field micro-exemplars carry the per-field nudges.
 *
 * The OVERVIEW field is the single carve-out — it's a POV hook
 * delivered in a characterful voice (see POV_FRAME_DIRECTIVES), not
 * operational GM prose. The block makes that exception explicit so
 * the LLM doesn't bleed mood writing into the body or drag operational
 * voice over the hook.
 */
export const OPERATIONAL_VOICE_BLOCK =
  "OPERATIONAL VOICE (every body field except overview): write for the GM running this at the table tonight. Open on a concrete fact (who is here, what they want, what's happening now); close on the clock (what changes if the party does nothing). Every detail must be a clue, a lever, or a revealed dynamic — cut anything that only sets mood. Overview is the one carve-out for voiced delivery; see its schema instruction.\n\n" +
  "EVERY NAMED ENTITY HAS A FORM AND A STATE. Any named figure in the body prose — faction leader, defector, apex creature, third party, lone survivor, AND historic figures whose names are invoked, AND creatures whose hoard or relics or oath drive the action — needs ONE SENTENCE of grounding so the GM can answer three questions: WHAT IS IT (a body or a category), WHAT STATE IS IT IN (alive and where; dead and where; sealed and where; vanished and last known), and HOW DOES IT BEAR ON THE DUNGEON. Active creatures get a body the GM can describe at close range — even a creature whose signature is indirect (carving names, dream-touching, ambient corruption) has a body in its chamber. Historic / off-screen entities (a dead king, a sealed wyrm, a vanished god, a forge-master from generations past) get their STATE and CURRENT RELEVANCE — say whether their hoard / corpse / oath is in play. 'The deep-wyrm' or 'the wyrm-thane' is not enough — say what they are, where they are, and whether what they left behind matters to the delve. No named entity exists in name only.";

/**
 * Anti-leak directive for schema field names and dimension category
 * values. The LLM tends to surface internal labels as in-world prose
 * ("the decaying-system tension is centered on...", "the Kellen-Folk
 * are the current occupation"). This block tells it to DESCRIBE what
 * those things are in the world instead of NAMING them by their
 * schema or category label. Parallels REGISTER_PROSE_DIRECTIVE in
 * @/shared/register-list.mjs.
 */
export const SCHEMA_LEAK_DIRECTIVE =
  "ANTI-LABEL: schema field names, dimension category values (the tension's name, power-structure's name, organizing-logic's name, pov-frame's name, drive-type's name, formed-nature's name), AND parenthetical role labels — (NPC), (miniboss), (apex), (large_creature), (contender), (third_party), (boss) — are prompt-side classifiers and do NOT appear in the prose. The role-routing tags tell you WHERE the entity belongs in the JSON; they are NOT annotations the GM reads. 'a construct called Velina (miniboss, NPC)' is the failure mode — the prose should say 'a construct called Velina who leads the feral Verlinea.' Translate every directive's intent into concrete in-world detail before it lands in a field.";

/**
 * Tier-invariant header for the ADJUDICATABLE-DANGER RULE. Pairs with
 * `DIFFICULTY_TIERS[tier].dangerShelf` (the tier-keyed consequence list)
 * to form the complete in-prompt rule block. Applies to creature
 * signatures (minion / strong_minion / large_creature) and to creature-
 * threat references in inhabitants prose — anywhere the LLM names a threat.
 *
 * The rule was added to counter a production pattern: register-flavor
 * (memory-eating, name-loss, soul-corruption) was getting written
 * INSTEAD of mechanical consequence the GM can adjudicate. Tier 5 wolves
 * "ate names" but had no Constitution drain. The rule pins the flavor
 * as ACCOMPANIMENT, never replacement, of a tier-appropriate mechanical
 * consequence the GM writes on the character sheet.
 *
 * The tier-keyed `dangerShelf` is what scales the rule across the 5
 * tiers — Tier 1 is COMPLICATING (encounter-scoped tactical effects),
 * Tier 2-3 is SIGNIFICANT (lingers past the encounter, recoverable with
 * mid-tier magic), Tier 4-5 is SCARY (sheet-altering damage that may
 * functionally remove the character from play). The shelf determines
 * what consequences are in-scope at this tier; the header below states
 * the rule's structural shape.
 */
/**
 * Build the ADJUDICATABLE-DANGER RULE header. Examples interpolate from
 * the rolled register's tier-appropriate creature + material data so
 * the rule never bakes in a specific name. Without per-generation
 * interpolation, the rule's worked examples cargo-cult specific names
 * (Sirmus, wax) into LLM outputs; with interpolation, the example
 * varies every generation and the rule teaches the SHAPE without
 * teaching a specific NAME.
 *
 * `exampleCreature` and `exampleMaterial` come from the picker
 * functions above; either may be null (protected catchall registers
 * carry no creatureTraditionByTier / materialTradition). When either
 * is null, a bracket placeholder is substituted — the rule still
 * teaches the shape; the LLM fills in from the register's own
 * CREATURE TRADITION / MATERIAL TRADITION blocks above.
 */
export function buildAdjudicatableDangerRule({ exampleCreature, exampleMaterial, exampleMaterialAlt }) {
  const creatureSlot = exampleCreature || '[register-creature]';
  return (
    "ADJUDICATABLE-DANGER RULE: describe each creature's (or hazard's) danger as an ANECDOTE about COMBAT BEHAVIOR — what happened the last time someone fought it. The anecdote can describe an OFFENSIVE ability (damage to a person, damage to a weapon or equipment), a DEFENSIVE ability (skin that breaks blades, blood that corrodes, wounds that close), or an ENVIRONMENTAL effect the creature creates (heat that ignites cloth at three feet, cold that frosts steel on touch). One specific named or nameable victim, one specific outcome, one specific timeline. The statblock generator reads the anecdote and produces the mechanics (save DC, damage, duration, recovery).\n\n" +
    "Anecdote shapes (use a victim-name from this generation's register-coherent pool; never reuse the same name twice):\n" +
    `- OFFENSIVE (person): '[victim-name]'s hand froze off a day after being gripped by a ${creatureSlot}.'\n` +
    `- OFFENSIVE (equipment): '[victim-name]'s blade was gripped by a ${creatureSlot} and snapped in two.'\n` +
    `- DEFENSIVE (corrosive blood): 'As soon as [victim-name]'s blade sank through a ${creatureSlot}'s skin, the blood that wept out weakened the steel — it broke at the next strike.'\n` +
    `- DEFENSIVE (rapid healing): '[victim-name]'s arrows lodged in the hide of a ${creatureSlot} and pushed themselves out again, the wounds closing.'\n` +
    `- ENVIRONMENTAL: '[victim-name]'s torch caught fire from three feet away of a ${creatureSlot}, and her braid singed before she could back away.'\n\n` +
    "Scale severity to tier through OUTCOME and TIMELINE: T1 ends 'walked stiff for an hour'; T3 ends 'still favours that leg a week later'; T5 ends 'died on the third day, body still hot' or 'the weapon was lost and the smith said the metal was past saving.' Same mechanism, different durability of harm.\n\n" +
    "NO interior consequences (memory-loss, forgotten names, alien dreams). NO psychic damage as a default — the whole table should see what happened. NO dice or save DCs in the prose — the statblock generator handles the math. Every consequence belongs to a NAMED SOURCE; no free-floating environmental drains."
  );
}

export const DUNGEON_TRAVERSAL_INVARIANT =
  "TRAVERSAL INVARIANT: the dungeon is a SPACE the party physically traverses against resistance — a delve, not a scene. Do NOT render it as an audience / court / tribunal the party attends. If the dominant power is social, the society IS the distributed obstacle layer across the space; the authority itself is a presence the party evades, never a destination they reach by lining up.";

/**
 * Power structures — pre-rolled structural commitment for the dungeon's
 * authority shape. Orthogonal to tension (what's happening) and
 * difficulty (stake-scope). Without this axis the LLM defaults to a
 * single supernatural apex with servant-class inhabitants every time,
 * regardless of tension. The pre-roll forces structural variety.
 *
 * 3 values:
 *   - single_apex        — one entity rules; servant-class inhabitants.
 *   - several_unrelated  — 2-3 powers coexisting, each independently
 *                          related to the place; not allied, not rivals.
 *   - living_order       — functioning institution of living people
 *                          occupies the place; rendered as an
 *                          infiltration (NOT a court / audience hall).
 *                          See the directive for the four mandatory
 *                          properties.
 *
 * NOTE: an earlier 'vacant' value (the original ruling power is gone)
 * was removed — its texture (abandoned villages, scavenger-dwellings)
 * is reproduced by single_apex / several_unrelated holders with
 * decay-coded character qualities. An earlier 'hazard_no_ruler' value
 * (non-sentient process dominates) was also removed — non-sentient
 * forces make weak antagonists (can't decide, can't escalate, can't
 * be outwitted). Ambient processes still appear as TEXTURE/hazards
 * in dungeons with active holders; the dominant power slot is now
 * agents-only by construction. Every dungeon has an active dominant
 * agent.
 */
export const POWER_STRUCTURES = [
  'single_apex',
  'several_unrelated',
  'living_order',
];

/**
 * Constraint block injected near the CENTRAL TENSION block in
 * dungeonOverviewPrompt when powerStructure is set. Each block expands
 * on the structure with examples and routing instructions for where
 * the structure's specifics should land in the existing fields.
 */
export const POWER_STRUCTURE_DIRECTIVES = {
  single_apex:
    "POWER STRUCTURE: single apex — one entity rules this dungeon, with their authority unambiguous and structurally central. Whatever the tension demands (a stirring power, a declining boss, a contested heir, an installed cultist), it organizes around this one apex. The dominant_power field names them; the inhabitants are recognizably their servants, occupiers, or subjects.",

  several_unrelated:
    "POWER STRUCTURE: several unrelated forces — EXACTLY 2 powers coexist here, each INCIDENTAL to the other. The defining property: each force is here for its OWN reasons, arrived at its OWN time, and pursues its OWN agenda regardless of the other's presence. The structural test: removing either of them leaves the other's situation UNCHANGED, because each force's relationship is with the PLACE and with ITSELF, not with the other force. HARD CAP: TWO POWERS. Not three. A third candidate is the failure mode — absorb it into one of the two (as a captured outsider, a recent arrival inside the home group's territory, a hostage) or drop it entirely. The third power is never preserved.\n\n" +
    "AGENT-ONLY RULE — HARD CONSTRAINT: every power named in this slot must be an AGENT with intent — a thinking faction, a sentient creature, a willful spirit, a bound will, a god's remnant, a beast with territory and habit. The minimum bar: each force can DECIDE something, can ESCALATE, can be ENGAGED on its own terms (talked to, fought, avoided, bargained with). Inert environmental processes — a geological sink, an ambient cold, a freezing breath, a hum that just hums, a rot that just spreads, a fire that just burns — are NOT powers. If your two forces include something process-shaped, render it as a SPIRIT or CREATURE that embodies the process (a frost-spirit, a hunger-bound beast, a binding-will), not as the process itself. A glacier is texture; the spirit OF the glacier is a power. A poisoned air is texture; the cult that breathes it is a power. Process-texture surfaces through what the powers do to the space (the central_dynamic, the present_state, the threshold) — never as a third power.\n\n" +
    "Examples of the shape: a clan of squatter predators hunting the upper halls + a sleeper-spirit who wakes on a slow cycle independent of them; or, a colony of fungal-creatures with a hive-mind + an animated guardian-construct still defending its original purpose. Each has its own reason for being here; neither is the 'main' power. Route both forces' specifics into inhabitants (with each one's current position and activity). The party can engage either on its own terms.",

  living_order:
    "POWER STRUCTURE: living order — an institution of LIVING PEOPLE operates this place by procedure, rule, and routine: a monastic order, a guild, a magistracy, a guard company, a research conclave. RENDER AS AN INFILTRATION via PHYSICAL DISGUISE.\n\n" +
    "THE OBJECTIVE is DEEPER IN THE SPACE — a sealed archive, a prisoner in a lower cell, a witness, a stolen item, a fugitive in protective custody, a relic in the inner sanctum. The party penetrates toward this objective; they do not arrive for a meeting.\n\n" +
    "THE INFILTRATION VECTOR is a PHYSICAL DISGUISE — a stolen vestment, a forged tabard, a brand burned to match, a phial of polyjuice or transmutation draught, a guild-medallion lifted from a corpse, a uniform stripped from a sentry, the dye-marked robe of a similar-looking traveling sect. Concrete physical object the party CARRIES or WEARS. NOT a recited phrase. NOT a sounded code. NOT a recognized hymn. NOT a password. ONE vector, named specifically in approach_and_threshold.\n\n" +
    "THE COMPLICATION tests the disguise: a senior who returns at a specific hour and knows every face by name; a recently-changed cuff-color the inner ranks have not yet shared with the outer; a relic the disguise's previous owner was carrying that the order will ask after; a habit of greeting (a hand-touch, a passed cup) the original member performed without thinking. ONE complication, named in present_state as the seam the party can read on arrival.\n\n" +
    "COVER BREAKS → FLIGHT. The order vastly outmatches the party in open conflict. When the disguise is seen through, the mode flips: the party becomes prey in a fully-mobilized space and must escape. That fail-state is what makes the cover matter. NO supernatural apex, NO undead figurehead, NO mind-controlled cultists. If a head of the institution exists, name them in npc_list as a normal NPC subject to the institution's rules.",
};

/**
 * Name templates for the dungeon's title. Code-rolled to break the
 * LLM's tendency to default to one template within a few generations.
 *
 * Four image-anchored shapes. The load-bearing word in every template
 * is a CONCRETE IMAGE — a specific noun mined from the dungeon's
 * strangest true detail (the signature creature, the prize, the
 * central material, the one striking image). The LLM is generating
 * the name LAST in the JSON (after body fields), so it can see the
 * dungeon and source the image from what's actually there.
 *
 * No template requires a register — register-flavored proper nouns
 * may appear as the image (e.g. "Nest of the Grik-torn") subject to
 * the one-register-word-max rule, but the image is the load-bearer.
 *
 * The earlier register-led / adjective-only templates were retired —
 * register-led names ("Eikheim Barrow") read as template-fill when
 * the model hasn't seen the dungeon yet; adjective-only names
 * ("Cold Citadel") were the worst clustering offender because the
 * adjective slot had no image to anchor.
 */
export const NAME_TEMPLATES = [
  {
    id: 'A',
    shape: '[image] [place-type]',
    requiresRegister: false,
    examples: ['Bone Hollow', 'Mirror Tomb', 'Salt Sepulcher', 'Glass Warren'],
  },
  {
    id: 'B',
    shape: '[adjective] [image] [place-type]',
    requiresRegister: false,
    examples: ['Frigid Bone Hollow', 'Drowned Mirror Tomb', 'Hollow Salt Sepulcher'],
  },
  {
    id: 'C',
    shape: '[place-type] of (the) [image]',
    requiresRegister: false,
    examples: ['Garden of Bone', 'Choir of Ash', 'Cathedral of Salt', 'Sanctum of Unfading Roses', 'Nest of the Grik-torn'],
  },
  {
    id: 'D',
    shape: '[image]-[participle] [place-type]',
    requiresRegister: false,
    examples: ['Moss-Buried Warren', 'Grief-Sunk Hall', 'Pitch-Lined Hold'],
  },
  {
    id: 'E',
    shape: "[name]'s [image] [place-type]",
    requiresRegister: false,
    examples: ["Aethorix's Ash Mill", "Gwenfaer's Glass Compound", "Vetheras's Bone Crypt"],
  },
  {
    // The article-led form. Some of the genre's strongest names use it
    // ("the Maw," "the Cradle," "the Drowning"). The cap comes from
    // template rotation — F is 1 of 6, so ~17% of dungeons get this
    // shape (down from the 100% clustering that produced the original
    // ban). The image must still be mined from content; this template
    // pairs especially well with EVENT and CONSEQUENCE image devices.
    id: 'F',
    shape: 'The [image]',
    requiresRegister: false,
    examples: ['The Maw', 'The Cradle', 'The Drowning', 'The Witherward', 'The Quiet Mile', 'The Last Forge'],
  },
];

/**
 * Pick a name template uniformly. All templates are register-agnostic
 * — the hasRegister flag is retained for callsite compatibility but
 * has no effect (the picker never filters).
 */
export function pickRandomNameTemplate(rng = Math.random, { hasRegister = true } = {}) { // eslint-disable-line no-unused-vars
  return NAME_TEMPLATES[Math.floor(rng() * NAME_TEMPLATES.length)];
}

/**
 * Place-type vocabulary, bucketed by organizing logic. The place-type
 * noun in the dungeon's title (Sepulcher, Hold, Foundry, Warren, etc.)
 * MUST come from the bucket matching the rolled organizingLogic — the
 * LLM's genre prior pulls toward funerary vocabulary ("Sepulcher",
 * "Crypt", "Tomb") regardless of what was rolled, so we pre-roll the
 * noun in code and inject it as a constraint.
 *
 * Composite organizingLogic (length 2) unions the two buckets via Set
 * (dedups shared nouns like "Hold" or "Warren").
 *
 * Open slot ('invent') has no bucket — the picker returns null and the
 * prompt falls back to the free-list vocabulary, letting the LLM pick
 * a noun appropriate to whatever logic it invented.
 *
 * Buckets folded for MVP: 'formed' combines anatomical (Hollow, Maw,
 * Gut), grown/mineral (Bloom, Vein, Hive), and neutral geological
 * (Cavern, Sink) — the LLM picks contextually within the bucket.
 */
export const PLACE_TYPE_VOCABULARY = {
  funerary:           ['Sepulcher', 'Crypt', 'Tomb', 'Barrow', 'Cairn', 'Mound', 'Ossuary'],
  containment:        ['Hold', 'Gaol', 'Ward', 'Cage', 'Oubliette', 'Vault', 'Keep'],
  production:         ['Foundry', 'Works', 'Manufactory', 'Forge', 'Mill'],
  inhabited_base:     ['Hold', 'Keep', 'Compound', 'Warren', 'Hall'],
  creature_territory: ['Warren', 'Den', 'Lair', 'Nest', 'Burrow'],
  formed:             ['Hollow', 'Maw', 'Gut', 'Bloom', 'Vein', 'Hive', 'Cavern', 'Sink'],
};

/**
 * Pick the place-type noun for the rolled organizingLogic. Composite
 * logics union the buckets. Open-slot ('invent') returns null —
 * caller skips the constraint.
 */
export function pickPlaceTypeForLogic(organizingLogic, rng = Math.random) {
  const logics = Array.isArray(organizingLogic) ? organizingLogic : [organizingLogic];
  const eligible = logics.filter(l => l && l !== 'invent' && PLACE_TYPE_VOCABULARY[l]);
  if (eligible.length === 0) return null;
  const pool = [...new Set(eligible.flatMap(l => PLACE_TYPE_VOCABULARY[l]))];
  if (pool.length === 0) return null;
  return pool[Math.floor(rng() * pool.length)];
}

/**
 * For non-apex power structures, this map provides the replacement text
 * for the `dominant_power` schema field instruction. The baseline
 * (single_apex / null) keeps the existing instruction; non-apex values
 * permit the field to describe a non-apex situation (no single ruler,
 * a hazard, an institution, an absence).
 *
 * The schema field is still REQUIRED and still a string — this only
 * changes what the LLM is asked to put inside it. Validator,
 * boss-vs-miniboss logic, monsters triplet, and npc_list are all
 * untouched.
 */
export const POWER_STRUCTURE_DOMINANT_POWER_OVERRIDES = {
  several_unrelated:
    "NO SINGLE RULER. The dungeon hosts 2-3 unrelated powers. Name them and describe their independent relationships to the place — none rules the others; eliminating one does not affect the others. Use this field to enumerate and characterize them at a high level; route their specifics (current position, activity, terms) into inhabitants. If any of them is an intelligent named entity, they also appear in npc_list. If any is a bestial monstrous entity, it can be the large_creature in monsters[].",

  living_order:
    "THE INSTITUTION OCCUPIES THIS PLACE, DISTRIBUTED ACROSS ITS ROOMS. Name the living-people organization that operates here by procedure and rule — the order, the guild, the company, the conclave. Describe its governance: hierarchy, who answers to whom, what its members do, where in the space each rank is found. The dungeon is rendered as an INFILTRATION: the order is the obstacle layer spatialized room-by-room (sentries, customs, passwords, ranks the party must mimic, restricted zones), with a degrading cover/credibility resource as the attrition clock and a lethal force-disparity beneath that makes subterfuge mandatory. When cover breaks, the party flips to flight. If a head of the institution exists, name them and put them in npc_list as a normal NPC — never as an audience-hall apex the party walks up to and addresses.",
};

// ---------------------------------------------------------------------
// Organizing logic (the bones — what this place was built or shaped for)
// ---------------------------------------------------------------------

/**
 * The structural half of the existing `type` axis, pulled out as its
 * own dimension. `type` carries skin + scale/frame (tomb / fortress /
 * mine — what it LOOKS like); `organizingLogic` carries intent (what
 * the bones were built or shaped FOR). Pre-rolled because the LLM
 * collapses these together when left unstructured.
 *
 * 6 anchors + 'invent' open slot. Each anchor injects a forces block:
 *   - funerary           — built to inter and honor the dead.
 *   - containment        — built to keep something IN.
 *   - production         — built to make / extract / process.
 *   - inhabited_base     — organized for occupants to live and defend.
 *   - creature_territory — shaped by a beast's habits, not by design.
 *   - formed             — not built by design; geological / organic /
 *                          reality-warped. May fuse with the holder.
 *
 * The open slot ('invent') is the low-probability admit-an-on-axis-
 * answer path. Roll returns an array of length 1 (60%) or 2 (40%) —
 * composite / palimpsest places (an undercity; a tomb repurposed as
 * a base) layer two logics, and the friction between them is texture.
 * The open slot is single-valued.
 */
export const ORGANIZING_LOGICS = [
  'funerary',
  'containment',
  'production',
  'inhabited_base',
  'creature_territory',
  'formed',
  'invent',
];

export const ORGANIZING_LOGIC_DIRECTIVES = {
  funerary:
    "ORGANIZING LOGIC: funerary — this place was built to inter and honor the dead. Burial chambers, offering halls, false tombs to mislead robbers; the descent moves toward the chief interment. Defenses are oriented to protect the dead from grave-robbers (sealed entries, ritual wards, false rooms). The party is, by default, a grave-robber regardless of their stated motive; treat their progress as transgression. Hazards include surviving ritual energies, animated guardians keyed to the interred, and the architecture's own gestures of warning and refusal.",

  containment:
    "ORGANIZING LOGIC: containment — this place was built to keep something IN. Locks, wards, and watchpoints all face INWARD; the architecture's hostility increases with depth, not at the entrance. The party moves toward the sealed thing and the open question of whether it still holds. Hazards include containment systems mid-failure, the bound thing's leakage into adjacent rooms, and any wardens still maintaining vigil. The fundamental tension is whether the seal will outlast the party's visit.",

  production:
    "ORGANIZING LOGIC: production — this place was built to make, extract, or process something: a mine, foundry, workshop, laboratory, cistern, reservoir, refinery. Layout: work-floors, raw stores, finished stores, a supervisor's office or master's sanctum, and somewhere a record of half-finished projects. Hazards are OCCUPATIONAL (heat, depth, dust, runoff, unstable shafts, pressure-vessels) PLUS whatever the work itself produced or unearthed (the thing dug up, the by-product never disposed of, the prototype that succeeded too well). The party moves toward the seat of authority or the heart of the process.",

  inhabited_base:
    "ORGANIZING LOGIC: inhabited_base — this place is organized for occupants to LIVE in and DEFEND it, at any scale from war-camp to village to garrison. Sentry posts at chokepoints, quarters, stores, command at the back or top, pens for prisoners or beasts. The architecture serves a present-tense social hierarchy; movement patterns follow watch-rotations and supply lines. Hazards come from active defenders (sentries, patrols, alarm-chains) and from the routines that make the base a base (shift changes, mealtimes, training drills). An abandoned village reads as this logic with a scavenger-class holder (single_apex or several_unrelated) plus decay-coded character qualities.",

  creature_territory:
    "ORGANIZING LOGIC: creature_territory — this place is SHAPED by a beast's habits rather than designed: a den, a nest, a roost, a hunting ground. Layout: feeding areas, midden piles, scavengers in the margins picking over leavings, the hoard or the young at the core. The party finds its way by spoor, by damage to the surrounding terrain, by the sounds and smells of habitation. Hazards are environmental and biological — territory-marked corridors, the beast's own movement, the things that share or contest its space. There is no map; there is reading sign.",

  formed:
    "ORGANIZING LOGIC: formed — NOT built by design. The bones are geological (cave, sinkhole, glacier-rift), organic / anatomical (the party traverses through a body), or reality-warped (a growth, a wound, a thinning of physics). The challenge is navigating the UNINTENDED — wayfinding without architecture — plus environmental hazard intrinsic to the form, plus whatever has moved in to inhabit it. Such a place may FUSE with the holder where the body itself is the dominant force; that fusion is legitimate (some entities span axes). NOTE: when this logic carries an ambient or residual force, the FORMED NATURE block (rolled separately) decides whether it renders as PHENOMENON (inert physical/arcane residue) or REMNANT (a named, embodied trace of a once-living mind or god). Defer to that block; do NOT default to a faceless cosmic-horror hum.",

  invent:
    "ORGANIZING LOGIC: open slot. The roll did not land on a listed anchor. Invent an ORGANIZING LOGIC for this place that genuinely answers the question 'what was this space built or shaped for?' — and that is NOT a closet reading of the funerary / containment / production / inhabited_base / creature_territory / formed anchors. The invented logic must drive an obstacle layer (what makes the rooms hard) and a goal direction (what moves the party deeper). Stay generic-fantasy; no real-world or trademarked references.",
};

// ---------------------------------------------------------------------
// Contender (rival outsider racing the party for the same prize)
// ---------------------------------------------------------------------

/**
 * Contender values for the fold:
 *   present: boolean
 *   kind:    one of CONTENDER_KINDS (only when present)
 *
 * Code-rolled. Presence is rare by default (5%) so the contender lands
 * as flavor when it shows up, not as a fixture. One booster: the
 * ACQUISITION motive (10x — the rival in the race is structurally
 * load-bearing under acquisition; halving it would gut the motive's
 * premise).
 *
 * Kind replaces the previous position × stance × openSlot trio.
 * Position and stance were a 12-cell grid that read as variations on
 * one contender ("another adventuring party"); the kind enumeration
 * is 19 categorically-distinct contenders, each carrying its own
 * texture and GM behavior. Position / stance are implied by the kind
 * (an insider is ahead, a spectator is parallel, a pursuing force is
 * behind; a divine_stake doesn't have a coherent stance toward a
 * mortal holder).
 */
export const CONTENDER_KINDS = [
  'rival_expedition',
  'pursuing_force',
  'claimant_heir',
  'creditor_writ',
  'native_displaced',
  'institutional_claim',
  'patron_double_dealer',
  'insider_already_inside',
  'divine_stake',
  'spectator_chronicler',
  'drawn_by_the_prize',
  'prior_failed_party',
  'negotiator_third_party',
  'avenger',
  'proxy_handler',
  'opportunist_scavenger',
  'breakaway_lieutenant',
  'time_displaced',
  'whistleblower_witness',
];

export const CONTENDER_PRESENT_FRAMING =
  "CONTENDER (rival outsider, present): A non-controlling outsider is in play around this dungeon — racing for the prize, blocking the party, profiting from the chaos, or pressing a claim. They DO NOT command the space (they are not the holder); they are a CLOCK and a COUNTERPARTY. Render them as a LIVE AGENT: leaving fresh signs, catchable mid-action, parley-able, sabotage-able, possibly about to seize or destroy the prize before the party arrives. NEVER inert figures stuck in a side room. The contender's specifics belong in the inhabitants field — name them with their current position and activity alongside the dungeon's other factions.\n\nANTI-LEAK: NEVER use the schema kind labels in prose. The rolled kind (rival_expedition, pursuing_force, claimant_heir, etc.) is the TYPE telling you what to render — it is not a name the GM reads. Render the contender as a concrete in-world figure or force — invent a register-coherent faction name and a leader; do NOT reuse names from any earlier example. Generic shapes the contender can take: a mercenary band, a rival expedition, a cult vanguard, a wandering apostate, a sworn enforcer, an imperial detachment. Do NOT render it as 'a rival_expedition,' 'a pursuing_force,' or 'the dungeon's institutional_claim.'";

// Per-kind GM-facing directive. Each describes one categorical
// flavor of contender — who they are, how they show up, and the
// behavior cue the GM uses at the table. Phrased as positive specs
// (what the contender IS and DOES), per the project's positive-spec
// convention.
export const CONTENDER_KIND_DIRECTIVES = {
  rival_expedition:
    "CONTENDER KIND: rival_expedition. Another party of adventurers, scholars, looters, or treasure-hunters racing the party for the same prize. Peer-tier; same tools, same problem; the conflict is competitive extraction. Sign: their gear in side rooms, their trail through dust, their fire still warm.",
  pursuing_force:
    "CONTENDER KIND: pursuing_force. An army, cult enforcers, an imperial detachment, or a sworn warband hunting the party, the dungeon's contents, or the dungeon itself. They are organized, equipped, and behind — the dungeon is a chase as much as a delve. The question is how long the party has before they arrive.",
  claimant_heir:
    "CONTENDER KIND: claimant_heir. Someone with a hereditary, contractual, or sworn claim to the place or the prize. Treats the party as trespassers on their property; comes with legal force, witnesses, or hereditary right behind them. Sign: a sealed writ, a family ring, witnesses at the entrance.",
  creditor_writ:
    "CONTENDER KIND: creditor_writ. Debt-collectors, bounty hunters, or factor's agents with paperwork. Transactional, not personal — they are owed something the prize will satisfy. Negotiable up to their writ's terms; lethal past them. The conflict is commercial and procedural.",
  native_displaced:
    "CONTENDER KIND: native_displaced. The people the dungeon was taken from, returning to reclaim. They know the place's true layout, its insults, its old names. The conflict carries the moral weight of restitution; the party is the latest in a line of outsiders.",
  institutional_claim:
    "CONTENDER KIND: institutional_claim. A guild, temple, crown, or chartered company asserting jurisdiction over what's inside. Comes with paperwork, observers, and the threat of post-extraction reprisal. The conflict is bureaucratic — and the institution doesn't forget.",
  patron_double_dealer:
    "CONTENDER KIND: patron_double_dealer. The same patron who hired the party also hired a second team — perhaps to ensure delivery, perhaps to pit them against each other, perhaps to discard whichever loses. The other team's existence may be unknown to the party until they cross paths. The conflict bleeds back to the patron.",
  insider_already_inside:
    "CONTENDER KIND: insider_already_inside. A rival who entered the dungeon days or weeks ago and is still inside, racing to extract the prize first. They know rooms the party hasn't reached, traps the party will trigger, the holder's schedule. Sign: signs of long habitation, caches, journal pages.",
  divine_stake:
    "CONTENDER KIND: divine_stake. A deity, aspect, or planar power with a vested claim. The contender acts through omen, dream, augury, sent agent, or direct manifestation. The conflict carries cosmological weight; the party's choice has theological consequences.",
  spectator_chronicler:
    "CONTENDER KIND: spectator_chronicler. A bard, scribe, or witness whose retelling will decide whose claim sticks publicly. Doesn't fight; observes, records, and shapes outcome through whose version of events becomes canon. The conflict is reputational. The party can court, corrupt, or evade them.",
  drawn_by_the_prize:
    "CONTENDER KIND: drawn_by_the_prize. A claimant the dungeon's prize summons, attracts, or generates. The rival exists BECAUSE of what's inside — touching the prize puts them on the road. Could be a being bound to the relic, a hunter who tracks this kind of artifact, a hereditary curse activated by contact, a soul-tied successor the prize calls home. GM cue: the moment the party engages the prize, this contender is in motion.",
  prior_failed_party:
    "CONTENDER KIND: prior_failed_party. Adventurers who tried this dungeon before and are STILL HERE in some form — trapped alive, transformed, ghost-bound, gone mad, or fused into the place. Their KNOWLEDGE is SPECIFIC and was learned at COST — name the concrete intel (which mirror is safe, which rune disarms the trap, the boss's nightly weakness, the secret door they found and couldn't open) AND the cost they paid to learn it (the maimed hand, the swapped face, the half-stolen soul). When the dungeon's entry shows signs of a prior expedition (handprints, bodies, scratched markings, an abandoned camp), THIS prior_failed_party IS that expedition — tie the two together explicitly. They want out as much as the prize; name which (rescue, revenge, finish what they started).",
  negotiator_third_party:
    "CONTENDER KIND: negotiator_third_party. A contender who arrives to DEAL, not to fight. Wants a share, a concession, a side payment, or a piece left in place. Treats the prize as commerce. The conflict resolves via terms — the party can refuse, but refusal has costs.",
  avenger:
    "CONTENDER KIND: avenger. No interest in the prize; here to settle a score with the dungeon's holder. Their objectives overlap with the party until the holder falls, then diverge sharply. The conflict is alignment-of-convenience until the holder is dealt with.",
  proxy_handler:
    "CONTENDER KIND: proxy_handler. A contender who never appears directly. Works through hirelings, intercepted messages, traps, summons, or planted agents. The party meets their tools, not them. The threat is the apparatus and the unanswered question of who is behind it.",
  opportunist_scavenger:
    "CONTENDER KIND: opportunist_scavenger. Smaller actors who would lose head-to-head but profit from the chaos the party creates. Steals during the conflict, picks pockets, lifts caches, sells the party's location to others. Multiplies risk without contesting the prize directly.",
  breakaway_lieutenant:
    "CONTENDER KIND: breakaway_lieutenant. A splinter from the dungeon's dominant power — a deposed retainer, an heir-presumptive, a schismatic cell — moving to overthrow the holder AND beat the party. Knows the holder's defenses intimately; willing to work with the party until the holder is unseated, then turn.",
  time_displaced:
    "CONTENDER KIND: time_displaced. A claimant from a different point in time — a long-dead founder still owed, a future heir arriving early, a past iteration of this expedition that 'already happened' and is finishing now. The contender's claim references a timeline the party doesn't share. Conflict is partly epistemological.",
  whistleblower_witness:
    "CONTENDER KIND: whistleblower_witness. A contender who wants the prize destroyed, exposed, or publicly witnessed rather than taken. A reformer, an apostate, a journalist with intent. Changes the win condition — possessing the prize is no longer the goal; controlling its fate is.",
};

// ---------------------------------------------------------------------
// Coupling: organizingLogic ↔ holder
// ---------------------------------------------------------------------

/**
 * Default-to-MISMATCH coupling. Each organizingLogic has a set of
 * holder values that constitute a "fusion" — the thing that built /
 * shaped the place still rules it. Fusion is legitimate but reads as
 * generated when it dominates the distribution; the roller biases
 * against it via capped reroll on a fusion hit.
 *
 * "different era, different intention" is the default the spec calls
 * for. A funerary place under a single_apex is a lich-king ruling
 * over their own tomb — fusion. A funerary place under living_order
 * is a monastic order maintaining vigil over someone else's tomb —
 * mismatch. The latter is the default we lean toward.
 */
export const FUSION_PAIRS = {
  funerary:           ['single_apex'],
  containment:        ['single_apex'],
  production:         ['single_apex', 'living_order'],
  inhabited_base:     ['single_apex', 'living_order', 'several_unrelated'],
  creature_territory: ['single_apex'],
  formed:             ['single_apex'],
};

// ---------------------------------------------------------------------
// Pickers for the new dimensions
// ---------------------------------------------------------------------

/**
 * Pick the organizing logic for this dungeon.
 *
 * Returns an ARRAY of length 1 (60%) or 2 (40%). Composite logics
 * (length 2) are palimpsest places — two intents layered, the friction
 * between them is texture. The open slot ('invent') is single-valued
 * and rolls at ~10%.
 */
const ORGANIZING_LOGIC_OPEN_SLOT_RATE = 0.10;
const ORGANIZING_LOGIC_COMPOSITE_RATE = 0.40;

/**
 * Tier-weighting for organizing logics whose narrative scale doesn't
 * fit low tiers cleanly. Weight 0 hard-bans at that tier; weights
 * below 1.0 reduce probability; above 1.0 increase. Logics not listed
 * are uniform across all tiers.
 *
 * `formed` (the place IS an ambient cosmic-shaped force — god-corpse,
 * primordial-formed, geometric remnant) is hard-banned at tier 1-2
 * because it's inherently cosmic-scale and pulls the entire dungeon
 * cosmic regardless of how local the prose tries to be.
 *
 * `containment` (the place was built to bind something) trends higher
 * tier — Tier 1 containment is a local jail (fine but rare); Tier 4-5
 * containment is godcorpse-prison territory (load-bearing).
 *
 * `inhabited_base` (fortress / temple / monastic compound) trends
 * low tier — these are mortal-scale by default; a tier-5 "fortress"
 * has to do extra work to read planar.
 */
export const ORGANIZING_LOGIC_TIER_WEIGHTS = {
  formed:         [0,    0,   1.0, 1.0, 1.0], // hard-ban T1-2
  containment:    [0.5,  0.7, 1.0, 1.3, 1.5],
  inhabited_base: [1.5,  1.3, 1.0, 0.8, 0.7],
};

function weightedPick(items, weights, rng) {
  const total = weights.reduce((s, w) => s + w, 0);
  if (total <= 0) {
    // Defensive: if every weight is 0 (shouldn't happen with current
    // data), fall back to uniform pick. Avoids returning undefined.
    return items[Math.floor(rng() * items.length)];
  }
  let r = rng() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

export function pickRandomOrganizingLogic(rng = Math.random, { tier = null } = {}) {
  if (rng() < ORGANIZING_LOGIC_OPEN_SLOT_RATE) return ['invent'];
  const anchors = ORGANIZING_LOGICS.filter(v => v !== 'invent');
  const validTier = tier && DIFFICULTY_TIER_KEYS.includes(tier) ? tier : null;
  const weights = anchors.map((a) => {
    if (!validTier) return 1.0;
    const tw = ORGANIZING_LOGIC_TIER_WEIGHTS[a];
    return tw ? tw[validTier - 1] : 1.0;
  });
  const first = weightedPick(anchors, weights, rng);
  if (rng() >= ORGANIZING_LOGIC_COMPOSITE_RATE) return [first];
  // composite: pick a distinct second anchor using the same tier weights
  let second;
  let guard = 0;
  do {
    second = weightedPick(anchors, weights, rng);
    guard++;
  } while (second === first && guard < 10);
  return second === first ? [first] : [first, second];
}

/**
 * Couple holder to organizing logic via mismatch bias.
 *
 * Strategy: roll a holder uniformly via pickRandomPowerStructure; if
 * the (organizingLogic[i], holder) pair is in FUSION_PAIRS for any of
 * the rolled logics, reroll up to `maxRerolls` times. The cap exists
 * to avoid pathological loops with rigged rngs — after the cap, the
 * roll stands (fusion is legitimate, just biased against).
 *
 * Open-slot organizing logic ('invent') has no fusion set; holder is
 * a uniform roll.
 */
const HOLDER_FUSION_MAX_REROLLS = 3;

export function pickHolderForOrganizingLogic(organizingLogic, rng = Math.random, { maxRerolls = HOLDER_FUSION_MAX_REROLLS } = {}) {
  const logics = Array.isArray(organizingLogic) ? organizingLogic : [organizingLogic];
  const fusionTargets = new Set(
    logics.flatMap(l => FUSION_PAIRS[l] || [])
  );
  let holder = pickRandomPowerStructure(rng);
  let rerolls = 0;
  while (fusionTargets.has(holder) && rerolls < maxRerolls) {
    holder = pickRandomPowerStructure(rng);
    rerolls++;
  }
  return holder;
}

// ---------------------------------------------------------------------
// Formed Nature (phenomenon vs remnant — kills the amorphous middle)
// ---------------------------------------------------------------------

/**
 * Formed places carry an ambient or residual force, and the LLM's
 * default render for that force is the cosmic-horror amorphous hum: a
 * "consciousness with a need but no will," a formless presence that
 * "speaks" or "sings" or "calls a name you never learned." Every
 * instance comes out interchangeable. The amorphous form is an
 * attractor; prompt-level guidance alone won't reliably dislodge it.
 *
 * Force the split with a roll. When `'formed'` is in organizingLogic,
 * pick one of two honest renderings:
 *
 *   - phenomenon → inert, residual, physical or arcane force; no
 *     mind, no will, no voice; weather not a witness; rendered through
 *     mechanics with a concrete cause.
 *
 *   - remnant → diminished trace of a once-living mind or god; given
 *     a specific identity (name + domain + characterful will derived
 *     from the domain); mythic / folkloric register; the domain is
 *     the single source of truth for the dungeon's hazards, cult,
 *     corruption, atmosphere, and the remnant's own behavior.
 *
 * No open slot — the two values cover the legitimate space. Anything
 * outside is the cosmic-horror amorphous middle that this dimension
 * exists to forbid.
 */
export const FORMED_NATURES = ['phenomenon', 'remnant'];

export const FORMED_NATURE_FRAMING =
  "FORMED NATURE — anti-amorphous-presence rule. The ambient or residual force this place carries has a strong LLM default toward cosmic-horror formlessness: a faceless 'consciousness with a need but no will,' a hum or voice that 'speaks,' 'sings,' or 'calls a name you never learned,' indistinct from one dungeon to the next. DO NOT default there. Pull the register out of cosmic horror and into MYTH AND FOLKLORE. The force resolves to ONE of two honest forms, pre-rolled below. The amorphous middle — a force that is neither inert physics nor a faced specific entity — is FORBIDDEN. Prompt-hygiene caveat: describe the SHAPE (name + domain + a will derived from the domain) but do NOT borrow any name or coined term from these instructions verbatim — invent fresh material in the register's phonology.";

export const FORMED_NATURE_DIRECTIVES = {
  phenomenon:
    "FORMED NATURE: phenomenon — an inert, residual, physical or arcane force. NOT a mind. NOT a will. NOT a voice. Render through MECHANICS and ENVIRONMENTAL EFFECT with a CONCRETE CAUSE (an accident, a backlash, a residue, a spilled binding, a torn page in physics, a botched ritual whose energy is now loose). Think WEATHER, not a witness — the force operates the same way for every visitor regardless of intent. The hazards are CONSISTENT with the cause's specific physics: a temporal slippage from a botched binding produces time-effects keyed to that binding's logic; a fungal bloom from a spilled growth-medium follows that medium's behavior. NAME the cause concretely; let the hazards derive from it. The cause IS the source of truth.",
  remnant:
    "FORMED NATURE: remnant — the diminished trace of a once-living mind or god. Give it a SPECIFIC IDENTITY in three parts:\n" +
    "  (1) a NAME or title, invented in the register's phonology (do not name a real deity unless the deity-handling block explicitly permits);\n" +
    "  (2) a DOMAIN — what they were god, master, or guardian OF. Specific, narrow, sharp: hunger, oaths, wells, navigation, copper-working, the autumn equinox, the first cold of a particular kind of fear, the right way to fold a shroud;\n" +
    "  (3) a CHARACTERFUL WILL, grievance, or madness that DERIVES from the domain. A hunger-god's will is hungry in a specific way; an oath-god's will binds in a specific way; a navigation-god's grievance is being lost.\n\n" +
    "Mythology's dead and sleeping gods are INTENSELY SPECIFIC — that is the target register, NOT cosmic-horror formlessness. The DOMAIN becomes the SINGLE SOURCE OF TRUTH for the dungeon: hazards express the domain's particular nature (a hunger-god's place produces hunger-shaped hazards; an oath-god's place holds intruders to vows they never made — a footstep across a threshold becomes binding); cult (if any) worships the domain's particular nature; corruption manifests in the domain's particular way; atmosphere reads of the domain.\n\n" +
    "If the remnant retains genuine present will AND a reachable locus, render it as an EMBODIED CREATURE — a body, a face, a place the party can reach and confront — not a passive trace. If diminished beyond reach, render the trace as a CHARACTERED hazard (the domain still acts; the entity does not). What it must NEVER be is the faceless ambient hum.",
};

// Filter formedNature by holder. When the holder is several_unrelated
// (the dungeon hosts 2-3 unrelated powers), `phenomenon` would slot
// in as a non-sentient "third power" that consistently reads as thin
// scenery pretending to be a faction. Force `remnant` instead — a
// named specific dead/sleeping entity with a domain and will, which
// can credibly be one of the three powers.
//
// Other holders allow both natures (under single_apex, a phenomenon
// reads as the apex's lingering effect on the space — fine).
export function pickRandomFormedNature(rng = Math.random, { holder = null } = {}) {
  if (holder === 'several_unrelated') return 'remnant';
  return FORMED_NATURES[Math.floor(rng() * FORMED_NATURES.length)];
}

/**
 * Pick the contender shape.
 *
 * Returns `{ present: false }` (most generations) or `{ present: true,
 * kind }` where `kind` is one of CONTENDER_KINDS, picked uniformly.
 *
 */
// =====================================================================
// THIRD_PARTY: unified contender + contact axis
// =====================================================================
//
// One non-controlling outsider per dungeon (never both an adversary
// and an ally — the merged axis caps to one). Shape:
//   { present: false }
//   { present: true, type: 'adversary', kind: <CONTENDER_KINDS entry> }
//   { present: true, type: 'ally',      kind: <CONTACT_KINDS entry> }
//
// Presence is near-saturating: ~95% default, ~98% under acquisition
// motive (the rival-in-the-race is the motive's structural premise).
// Third parties land as core content the GM uses to engage the
// dungeon, not as flavor sometimes added.
//
// Type roll (adversary vs ally) is 50/50 by default, biased 75/25
// toward adversary under acquisition (the motive's premise is the
// rival, so the adversary type fits more often).
//
// SUPPRESS rule: rival-coded tensions already supply an adversary in
// the tension itself (occupied-by-rivals, methodically-looted). When
// these tensions are rolled AND type came up adversary, the picker
// flips to ally — the dungeon's rival is already in the tension.
//
// HARD FILTERS gate kind eligibility by context (tension / tier) so
// the rolled kind is always coherent with the rest of the dungeon's
// foundation. Every remaining holder is an active power, so the
// hazard_no_ruler holder filter has been retired — kinds that
// require a holder are universally compatible.
//   - KIND_REQUIRES_ESTABLISHED: dropped under freshly-occupied
//   - KIND_REQUIRES_HIGH_TIER: dropped at tier 1-2
// Defensive: if filters empty the pool, the unfiltered pool is used
// as fallback (shouldn't happen with current data).
const THIRD_PARTY_PRESENCE_RATE_DEFAULT = 0.95;
const THIRD_PARTY_PRESENCE_RATE_ACQUISITION = 0.98;
const THIRD_PARTY_ADVERSARY_RATE_DEFAULT = 0.50;
const THIRD_PARTY_ADVERSARY_RATE_ACQUISITION = 0.75;

// Kinds that REQUIRE the dungeon's NPC layer to have been established
// for a while (prior expeditions, long-resident scholars or natives).
// Drop under freshly-occupied (new occupiers just moved in; the older
// inhabitants and would-be witnesses are mostly displaced or gone).
export const KIND_REQUIRES_ESTABLISHED = new Set([
  // adversary
  'prior_failed_party',
  'insider_already_inside',
  // ally
  'survivor',
  'dungeon_native',
  'scholar_in_residence',
]);

// Kinds that are inherently cosmic in scope. Drop at tier 1-2 — a
// divine_stake at the village-graveyard tier doesn't make sense.
export const KIND_REQUIRES_HIGH_TIER = new Set([
  'divine_stake',
  'time_displaced',
]);

function filterKindsForContext(kinds, { tension, tier }) {
  return kinds.filter((k) => {
    if (tension === 'freshly-occupied' && KIND_REQUIRES_ESTABLISHED.has(k)) return false;
    if (tier && tier <= 2 && KIND_REQUIRES_HIGH_TIER.has(k)) return false;
    return true;
  });
}

function rollAdversary(rng, ctx) {
  const filtered = filterKindsForContext(CONTENDER_KINDS, ctx);
  const pool = filtered.length > 0 ? filtered : CONTENDER_KINDS;
  const kind = pool[Math.floor(rng() * pool.length)];
  return { present: true, type: 'adversary', kind };
}

function rollAlly(rng, ctx) {
  const filtered = filterKindsForContext(CONTACT_KINDS, ctx);
  const pool = filtered.length > 0 ? filtered : CONTACT_KINDS;
  const kind = pool[Math.floor(rng() * pool.length)];
  return { present: true, type: 'ally', kind };
}

// Drive types that read as "claim a prize, rival in the race" — they
// fill the structural niche the old `motive === 'acquisition'` filled,
// so the third-party presence/adversary bumps key on these.
const ACQUISITION_STYLE_DRIVE_TYPES = new Set([
  'acquire_by_negotiation',
  'acquire_by_theft',
]);

export function pickRandomThirdParty(rng = Math.random, { holder = null, driveType = null, tension = null, tier = null } = {}) {
  const isAcquisitionStyle = ACQUISITION_STYLE_DRIVE_TYPES.has(driveType);
  const presenceRate = isAcquisitionStyle
    ? THIRD_PARTY_PRESENCE_RATE_ACQUISITION
    : THIRD_PARTY_PRESENCE_RATE_DEFAULT;
  if (rng() >= presenceRate) {
    return { present: false };
  }
  // SEVERAL_UNRELATED SUPPRESS: the `several_unrelated` power structure
  // is defined as exactly 2 home powers. Adding an adversary third party
  // would make 3 factions and violate the inhabitants HARD CAP of 2.
  // Force ally under several_unrelated — contacts ride alongside the
  // two home powers as a resource, not a third faction.
  if (holder === 'several_unrelated') {
    return rollAlly(rng, { tension, tier });
  }
  const adversaryRate = isAcquisitionStyle
    ? THIRD_PARTY_ADVERSARY_RATE_ACQUISITION
    : THIRD_PARTY_ADVERSARY_RATE_DEFAULT;
  const wantsAdversary = rng() < adversaryRate;
  const ctx = { tension, tier };
  // SUPPRESS: rival-coded tensions already carry their own adversary
  // (the rival IS the tension). Flip to ally instead of doubling up.
  if (wantsAdversary && RIVAL_TENSIONS.has(tension)) {
    return rollAlly(rng, ctx);
  }
  return wantsAdversary ? rollAdversary(rng, ctx) : rollAlly(rng, ctx);
}

// ---------------------------------------------------------------------
// Drive type — fused stake + method (replaces motive + mode)
// ---------------------------------------------------------------------
//
// Motive (why the party is here) and mode (how they win) were rolled
// separately as orthogonal axes. In practice they collapsed: the LLM
// defaulted to whichever pattern was structurally familiar (prevention
// → ritual regardless of mode; assassinate → lost when motive was
// prevention). A single fused field — driveType — names the stake and
// the method together, so the prompt has one directive to honor.

export const DRIVE_TYPES = [
  'recover_by_force',
  'recover_by_stealth',
  'recover_by_substitution',
  'escort_through',
  'prevent_by_killing',
  'prevent_by_ritual',
  'prevent_by_sabotage',
  'acquire_by_negotiation',
  'acquire_by_theft',
  'bear_a_message',
  'expose_the_truth',
  'usurp_authority',
  'survive_and_escape',
  'exploit_the_standoff',
];

export const DRIVE_TYPE_DIRECTIVES = {
  recover_by_force:
    "DRIVE TYPE: recover_by_force. The party comes to EXTRACT a specific named object or person held inside the dungeon, and COMBAT is the primary path — they fight through to reach the target. Quest hook names what they're recovering and who's paying for its return. Potential outcomes' first path describes how the party reaches the target and brings it out under arms.",
  recover_by_stealth:
    "DRIVE TYPE: recover_by_stealth. The party comes to EXTRACT a specific named object or person, and INFILTRATION is the primary path — full alarm or mobilization makes the extraction impossible. Quest hook names the target and the patron. Potential outcomes' first path describes the stealth route in and out — guards bypassed, patrols slipped, the egress made before anyone notices the missing.",
  recover_by_substitution:
    "DRIVE TYPE: recover_by_substitution. The party comes to SWAP a decoy for the real target — the dungeon's guardian responds to ABSENCE, not THEFT, so leaving something convincing in the target's place buys the party time. Quest hook names what's being swapped, who provides the decoy, and how long the swap must hold. Potential outcomes' first path describes the swap window and what makes the decoy convincing enough to pass inspection.",
  escort_through:
    "DRIVE TYPE: escort_through. The party comes to extract a LIVING person from the dungeon — someone who can cooperate, resist, hesitate, or bargain. Quest hook names the captive (by name, where possible), why the patron values them alive over dead, and any condition on the extraction (intact, uncoerced, willing). Potential outcomes' first path describes the egress route AND the captive's reliability problem (do they walk, do they bolt, do they speak to the wrong faction). Costs include what the captive carries OUT (debts, knowledge, a grievance).",
  prevent_by_killing:
    "DRIVE TYPE: prevent_by_killing. The party comes to STOP something bad by ELIMINATING the cause — kill the cult leader, end the binding-keeper, take the head off the ritual before the act completes. Quest hook names what will happen if the cause acts and who's paying to stop it. Potential outcomes' first path describes how the party reaches and kills the cause — what wakes it, what makes the strike land, what happens if it sees them first.",
  prevent_by_ritual:
    "DRIVE TYPE: prevent_by_ritual. The party comes to STOP something bad through KNOWLEDGE and CEREMONY — recite the binding, perform the rite, seal the door with the correct words. Quest hook names what the ritual prevents and where the necessary knowledge lives in the dungeon. Potential outcomes' first path describes assembling the ritual (where the words are, what's required to speak them) and performing it before the doom-clock runs out.",
  prevent_by_sabotage:
    "DRIVE TYPE: prevent_by_sabotage. The party comes to STOP something bad by DESTROYING its mechanism — break the forge, sever the binding-chain, collapse the ritual chamber, poison the supply. Quest hook names the mechanism and what its destruction prevents. Potential outcomes' first path describes the specific destructive act — what gets broken, with what tool, what trace it leaves, what happens to the dungeon when the mechanism fails.",
  acquire_by_negotiation:
    "DRIVE TYPE: acquire_by_negotiation. The party comes to OBTAIN something through DEAL-MAKING with a named holder — buy it, bargain for it, swear an oath that gives them title. Quest hook names what's being acquired, who holds it, and what the patron offers as bargaining power. Potential outcomes' first path describes the negotiation — what the holder wants, what the party can offer, what the deal's price carries out of the dungeon.",
  acquire_by_theft:
    "DRIVE TYPE: acquire_by_theft. The party comes to TAKE something without the holder's knowledge — the holder must not know the object is missing when the party leaves. Quest hook names the target and the holder. Potential outcomes' first path describes how the theft is concealed — the route in, the route out, what masks the absence (a decoy is OK, but the primary frame is concealment of the theft itself, not its outcome).",
  bear_a_message:
    "DRIVE TYPE: bear_a_message. The party comes to DELIVER something INTO the dungeon — a writ, a warning, a truce, a sealed message, a binding-token — to a specific recipient inside. Quest hook names the recipient, what the message contains, and why it can't be delivered any other way. Potential outcomes' first path describes reaching the recipient AND ensuring the message lands (uninterrupted, witnessed by the right parties, understood).",
  expose_the_truth:
    "DRIVE TYPE: expose_the_truth. The party comes to DISCOVER specific knowledge and BRING IT BACK — a name, a route, a record, a sworn witness's account. Quest hook names the question being answered and what depends on the answer (a coming threat the knowledge counters, a debt it cancels, a person it identifies, a choice it informs). Potential outcomes' first path describes how the knowledge is secured (recorded, witnessed, carried out) and what's actively erasing it inside.",
  usurp_authority:
    "DRIVE TYPE: usurp_authority. The party comes to REPLACE or DESTABILIZE the dungeon's power structure — they leave with the title, the binding-key, the lineage-claim, or the recognized seat that the prior power held. Quest hook names what the party will claim and why their patron benefits from the displacement. Potential outcomes' first path describes the qualifying act (rite passed, oath sworn, challenge accepted, blood-claim proven) and what the dungeon does once the old power is displaced.",
  survive_and_escape:
    "DRIVE TYPE: survive_and_escape. The party is ALREADY INSIDE — sealed in, abandoned by a guide, dropped through a trap, woken from frozen sleep — and the goal is EGRESS. Quest hook frames how they got in (or notes they wake in media res) and what awaits them outside. Potential outcomes' first path describes the egress route, what blocks it, and the cost of the way out (a faction's anger, a debt, a piece of the party's gear left behind).",
  exploit_the_standoff:
    "DRIVE TYPE: exploit_the_standoff. The party comes with an objective that cannot be reached HEAD-ON — but the dungeon's factions are AT EACH OTHER'S THROATS, and that conflict is the party's cover. Quest hook names the objective and the standoff that opens the path. Potential outcomes' first path describes how the party leverages the standoff (igniting it further, slipping past while it consumes attention, allying with one side to overcome the others' guard).",
};

/**
 * Pick a drive type with cascade weighting based on the rolled
 * (powerStructure, tension, organizingLogic) context. Per the user's
 * design notes:
 *   - prevent_by_killing weights higher under single_apex
 *   - exploit_the_standoff weights higher under several_unrelated
 *   - prevent_by_ritual weights higher with sealed-and-stirring / boss-decline tension
 *   - recover_by_stealth weights higher with inhabited_base organizing logic
 *   - survive_and_escape weights higher with scoured-and-claimed tension
 *
 * Multipliers stack multiplicatively. Returned value is a member of
 * DRIVE_TYPES (never null — every roll lands on a drive type).
 */
export function pickRandomDriveType(rng = Math.random, context = {}) {
  const { powerStructure = null, tension = null, organizingLogic = null } = context;
  const weights = {};
  for (const dt of DRIVE_TYPES) weights[dt] = 1.0;

  if (powerStructure === 'single_apex') {
    weights.prevent_by_killing *= 1.6;
    weights.usurp_authority *= 1.4;
    weights.acquire_by_negotiation *= 1.2;
  }
  if (powerStructure === 'several_unrelated') {
    weights.exploit_the_standoff *= 1.8;
    weights.bear_a_message *= 1.2;
  }
  if (powerStructure === 'living_order') {
    weights.recover_by_stealth *= 1.3;
    weights.bear_a_message *= 1.3;
    weights.acquire_by_negotiation *= 1.2;
  }
  if (tension === 'sealed-and-stirring' || tension === 'boss-decline') {
    weights.prevent_by_ritual *= 1.5;
    weights.prevent_by_sabotage *= 1.3;
  }
  if (tension === 'cult-ascendant' || tension === 'awakening-architecture') {
    weights.prevent_by_killing *= 1.4;
    weights.prevent_by_ritual *= 1.3;
  }
  if (tension === 'scoured-and-claimed') {
    weights.survive_and_escape *= 1.6;
  }
  if (tension === 'freshly-occupied' || tension === 'occupied-by-rivals') {
    weights.recover_by_force *= 1.3;
    weights.recover_by_stealth *= 1.3;
  }
  if (Array.isArray(organizingLogic) && organizingLogic.includes('inhabited_base')) {
    weights.recover_by_stealth *= 1.5;
    weights.acquire_by_theft *= 1.3;
    weights.bear_a_message *= 1.2;
  }

  const entries = Object.entries(weights);
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = rng() * total;
  for (const [key, w] of entries) {
    r -= w;
    if (r < 0) return key;
  }
  return entries[entries.length - 1][0];
}

// ---------------------------------------------------------------------
// Contact kinds (ally-disposed third-party NPCs)
// ---------------------------------------------------------------------
//
// CONTACT is the ally-disposition half of THIRD_PARTY (see picker
// below). When the dungeon's third_party rolls type='ally', the kind
// is drawn from this enum — 10 categorically distinct ally shapes,
// each carrying its own GM-facing behavior cue.
//
// Replaces the previous reliability × offers axis (10 × 3 = 30 cells
// that mostly fell into "helpful defector"). The kind enum gives
// more textural variety with less coordination cost.

export const CONTACT_KINDS = [
  'informant',
  'guide',
  'defector',
  'prisoner',
  'scholar_in_residence',
  'hired_specialist',
  'survivor',
  'dungeon_native',
  'bound_servitor',
  'witness_chronicler',
];

export const CONTACT_PRESENT_FRAMING =
  "CONTACT (in-dungeon ally the party can USE): An ally-disposed NPC the party can plug into for help on stated terms. NOT a free helper — they have a cost, a condition, or a relationship the party has to manage. Render them as a NAMED entry in npc_list whose description matches the rolled kind directive (what they bring, how they fit, what their terms are).\n\nThe contact's current activity belongs in the inhabitants field — name them with their current position and stated terms alongside the dungeon's other factions. Where the contact's backstory plausibly intersects the dungeon's history (a survivor of a prior expedition, a defector from the holder, a scholar who has been here for months), surface that link in the prose.\n\nANTI-LEAK: NEVER use the schema kind labels in prose. The rolled kind (informant, guide, defector, prisoner, scholar_in_residence, hired_specialist, survivor, dungeon_native, bound_servitor, witness_chronicler) is the TYPE telling you what to render — it is not a name the GM reads. 'A bound servitor called Loscán' is a schema leak; 'Loscán, a spent fire-elemental bound to a stone bowl' is the rendering. Likewise: never write 'the dungeon's scholar_in_residence' or 'a witness_chronicler named X.' Render the being concretely — what they ARE in-world (a fire-elemental, a sage, a survivor, a deserted apprentice), not what schema-bucket they came from.";

// Per-kind GM-facing directive. Each describes one categorical flavor
// of contact — who they are, what they bring, what their condition or
// cost is. Phrased as positive specs (what the contact IS and DOES).
export const CONTACT_KIND_DIRECTIVES = {
  informant:
    "CONTACT KIND: informant. Knows something SPECIFIC and load-bearing about the dungeon — name what they know in concrete terms (the cistern floods on a 12-hour cycle; the inner sanctum's password rotates with the watch; the third sentry sleeps; the locked door has a key under a specific flagstone). Trades the information for a SPECIFIC COST (coin, protection on a specific journey, a favor the party will owe later, silence about something the informant did). 'Knowledge for safe passage' is the failure mode — both halves of the trade must be specific and table-runnable. Doesn't fight; the value is the data.",
  guide:
    "CONTACT KIND: guide. Knows the way deeper into the dungeon. Will lead the party through specific terrain, around specific hazards. Trades safe passage for coin, protection, or a stake in whatever the party retrieves. May abandon the party at the edge of their expertise.",
  defector:
    "CONTACT KIND: defector. Formerly served the dominant power; has turned for personal reasons (a slight, a crisis of belief, a debt called in). Can name weaknesses, identify rivals inside the order, point to the order's blind spots. The order treats them as a traitor on sight.",
  prisoner:
    "CONTACT KIND: prisoner. Held by the dominant power for a reason that matters (a witness, a hostage, a heretic, a debtor). Will help if freed; may be a liability — slow, hurt, hunted. Freeing them is itself an action with consequences for the dungeon.",
  scholar_in_residence:
    "CONTACT KIND: scholar_in_residence. A sage, antiquarian, or researcher who has been studying the dungeon — by license, by permission, or by stealth. Their KNOWLEDGE is SPECIFIC to their study — name what they've actually learned (the script's translation, the burial pattern, the cult's calendar, the seal's binding-clause), NOT generic 'history and defenses.' They trade for SPECIFIC FINDS the party can bring back or sketch in place — name what the scholar wants (rubbings of three particular sigils, the head of a creature they've heard but never seen, a sample from the central chamber's residue). Refusal to deliver the find ends the trade; they will not advance credit.",
  hired_specialist:
    "CONTACT KIND: hired_specialist. A mercenary, lockpick, arcanist, or healer hired by the party (or available to be hired). Provides a specific capability on contract. Loyal until paid, and only while the contract holds; will walk if the work exceeds the agreed scope.",
  survivor:
    "CONTACT KIND: survivor. The last living member of a prior expedition that went wrong here. Broken in some specific way (a maimed limb, a haunted memory, a half-taken curse) but useful. Their KNOWLEDGE must be SPECIFIC and reflect what they LEARNED at cost — name the concrete intel (a hidden chamber the patrol misses, the boss's nightly ritual, which mirrors are safe, the trap that took their hand) and the COST of sharing it (every retelling makes the memory worse; the spirit follows their voice; their hand bleeds when they speak of it; they lose another fragment of who they were). When relevant, tie them to the dungeon's existing history — if the entry shows handprints, bodies, or recent signs of a prior expedition, the survivor is from THAT expedition. May want rescue, revenge, or to finish what their party started — name which.",
  dungeon_native:
    "CONTACT KIND: dungeon_native. Born or raised inside the dungeon — cult-born, beast-raised, accidentally-orphaned. Knows the dungeon's rhythms from lived experience, not from study. Name the SPECIFIC knowledge they carry: a patrol schedule learned by hiding from it; the cycle of a hazard they grew up timing; the safe corners; a back-route the holders don't know exists. Their HELP has a COST — they need something from the party first (rescue someone the natives left behind, retrieve a specific object that belongs to them, get them out past a threshold they cannot cross alone). Their loyalty is to the PLACE itself, not any faction — they may sabotage the party if the party threatens what they love about the dungeon.",
  bound_servitor:
    "CONTACT KIND: bound_servitor. A spirit, elemental, or construct bound to serve the party — by a found item, an inherited oath, a magical accident, a contractual transfer. Helps within the binding's terms; the binding has a specific scope and a specific exit condition the party may or may not know.",
  witness_chronicler:
    "CONTACT KIND: witness_chronicler. A bard, scribe, or sworn witness traveling with the party to document what happens here. Doesn't fight; their value is the public record that follows. Allied because the party's success is the story they're recording, but their account is independent of the party's preferences.",
};

// ---------------------------------------------------------------------
// POV frames (delivery vehicle for the overview-as-hook)
// ---------------------------------------------------------------------

/**
 * POV frames re-spec the OVERVIEW field. Instead of omniscient
 * atmospheric prose, the overview becomes a short hook delivered from
 * a specific point of view — a voice with bias, partial knowledge,
 * and a stake — that doubles as an in-world adventure hook (how the
 * party hears of the place).
 *
 * 10 anchors + 'invent' open slot. Code-rolled, gated on holder +
 * tension so frames stay coherent (no survivor of a place where
 * nothing's stirring; no failed negotiation with a hazard-only place).
 */
export const POV_FRAMES = [
  'survivor',           // someone got out; trauma + a detail they cannot unsee
  'sages_rumor',        // secondhand scholarly assertion; 'it is said that...'
  'recovered_notes',    // a prior expedition's journal / ledger / marginalia
  'glimpsed_room',      // one chamber seen through a gap / crack / scrying
  'bounty_notice',      // a public posting; the terms are exact, the place is implied
  'regional_warning',   // local folk knowledge; songs, ward-signs, rules nobody finishes
  'failed_negotiation', // a delegate parleyed and came back with terms (or refused)
  'escaped_quarry',     // something that escaped was interrogated, tracked, killed
  'tribute_caravan',    // a recurring shipment goes in; the route knows the place
  'prophecy_or_dream',  // a divination, recurring dream, sleepwalker's report
  'invent',
];

export const POV_FRAME_DIRECTIVES = {
  survivor:
    "POV FRAME: SURVIVOR. The overview is a first-person fragment from someone who got OUT. Bias: trauma; reliability: high on the moment of escape, low on overall layout. Ground the hook in a body that crossed a threshold and made it back — what they fled from, the one detail they cannot unsee.",

  sages_rumor:
    "POV FRAME: SAGE'S RUMOR. The overview is a secondhand scholarly assertion — what is said about this place by people who have READ about it but not entered. Bias: theoretical certainty; reliability: low on specifics, high on cultural memory. Include the qualifier ('it is said', 'the old maps mark it as') that admits the secondhand chain.",

  recovered_notes:
    "POV FRAME: RECOVERED NOTES. The overview is an excerpt from a journal, ledger, or marginalia recovered from a prior expedition. Bias: the writer was inside; reliability: high on what they personally saw, low on the bigger picture.\n\n" +
    "NEVER an escape narrative. The default-failure mode is 'I crawled out / made it out / escaped through a crack.' Skip it. The journal's writer is more often DEAD than escaped — the entry stops because they ran out of ink, ran out of light, ran out of life, or were taken mid-word. Their words survived; they did not.\n\n" +
    "PICK from these anchoring shapes (rotate; the escape-narrative is exhausted):\n" +
    "- MID-SURVEY ENTRY: an observational note from the middle of the expedition — what the writer saw, weighed, decided NOT to do today; ends because the writer set the journal down to act.\n" +
    "- EARLY ENTRY, CONFIDENT: written before the disaster, when the writer still thought they understood the place. Reads warmly until the LAST line, which carries dramatic irony the writer didn't.\n" +
    "- FINAL ENTRY, CUT OFF: the writer is mid-thought when something interrupts. The journal was found on the body, in the chamber, in the jaws. No escape; just the page.\n" +
    "- LEDGER LINE: a dry accounting record — inventory, daily count, item received — that lands ominously because of WHAT is being counted (skulls, hours since contact, the number still answering at roll-call).\n" +
    "- MARGINALIA: a few words scribbled in the white space of an unrelated document (a tax roll, a religious text, a contract). The writer used what they had.\n" +
    "- DISPATCH TO A SUPERIOR: the writer is reporting back — formal salutation, terse observations, the institutional voice that breaks down only at the end.\n\n" +
    "Include the artifactual frame in one phrase (a torn page, a smear of mud, ink half-bled, a ledger column, the margin of an old testament) and pick a shape that does NOT use 'I crawled out / I made it out.'",

  glimpsed_room:
    "POV FRAME: GLIMPSED ROOM. The overview is ONE room or ONE chamber seen through a gap — a crack in a wall, a scrying, the moment of an open door before it shut. Bias: severe partial information; reliability: high on the glimpsed detail, zero on context. The detail is concrete and specific; what it MEANS is the question that draws the party in.",

  bounty_notice:
    "POV FRAME: BOUNTY NOTICE. The overview is a public posting — a reward offered for something extracted, accomplished, or proven about this place. Bias: the poster has an agenda; reliability: the bounty's TERMS are exact, the place's reality is implied through what is asked for. The party reads it as a job offer with a price tag attached.",

  regional_warning:
    "POV FRAME: REGIONAL WARNING. The overview is local folk knowledge — songs, ward-signs hammered into trees, what children are told never to do, the saying nobody finishes. Bias: oral tradition flattens specifics into rules; reliability: the rules track real consequences even when the reasoning is folkloric. The place has IMPINGED on its surroundings enough that the surroundings have rules about it.",

  failed_negotiation:
    "POV FRAME: FAILED NEGOTIATION. The overview is a THRESHOLD REPORT from an envoy, delegate, or messenger who tried to parley with whoever holds this place — and was REBUFFED AT THE GATE. They never reached the central power; talks broke down at the outer hall, the door, the first chamber, the first sentry's challenge. Bias: diplomatic framing, what could be said back home; reliability: high on what they SAW from the threshold (the gatekeepers, the outer hall, the first ritual or guard pattern, the moment they were refused or fled), zero on what lies deeper.\n\n" +
    "NEVER stage a completed audience — the deep power receiving the envoy, conversing with them, questioning them. The negotiation FAILS BEFORE REACHING THE APEX; that failure is the reason for the delve. The hook is: diplomacy failed, so the party must now go in the hard way.\n\n" +
    "POSITIVE REDIRECT: open on what the envoy saw at the gate and why they fled or were refused — NEVER on a dialogue with the power inside.",

  escaped_quarry:
    "POV FRAME: ESCAPED QUARRY. The overview is what was learned from something that ESCAPED this place — interrogated, tracked, killed, or studied at distance. Bias: the escapee's perspective is alien or hostile; reliability: high on what they fled, zero on diplomacy. Whatever is loose tells you what the inside is for.",

  tribute_caravan:
    "POV FRAME: TRIBUTE CARAVAN. The overview is delivered through the routine of a shipment that GOES TO this place: food, prisoners, ore, coin, bodies. Bias: drivers know the road and the receiving party, nothing deeper; reliability: high on the EXCHANGE — what is given, what is taken, what is sent back (if anything). The place is plugged into a supply chain the party can intercept, ride, or impersonate.",

  prophecy_or_dream:
    "POV FRAME: PROPHECY OR DREAM. The overview is a fragment from a divination, a recurring shared dream, an oracle's recorded utterance, or a sleepwalker's report. Bias: symbolic; reliability: the IMAGE is exact, the meaning is contested. The place asserts itself across distance, into minds that have never seen it. Couples best with dormant or sealed-and-stirring places.",

  invent:
    "POV FRAME: open slot. The roll did not land on a listed anchor. Invent a DELIVERY VEHICLE for how the party hears of this dungeon — a voice with bias, partial knowledge, and a stake. The frame is a delivery vehicle, NOT a license for mood. Stay generic-fantasy; no real-world or trademarked references.",
};

/**
 * Coupling: which POV frames are nonsensical against which holder
 * values. Used by pickRandomPovFrame to filter the eligible set.
 *
 * Empty since hazard_no_ruler was retired — every remaining holder
 * can be parleyed with, delivered to, escaped from, or witnessed.
 */
export const POV_FRAME_INCOMPATIBLE_HOLDERS = {};

/**
 * Coupling: which POV frames are nonsensical against which tension
 * values.
 *
 *   survivor — requires SOMEONE recently fled SOMETHING dangerous.
 *     Incompatible with dormant-with-witness (nothing's stirring;
 *     nobody flees a dormant thing) — that's the "no survivor for a
 *     sealed state" gate from the spec.
 */
export const POV_FRAME_INCOMPATIBLE_TENSIONS = {
  survivor: ['dormant-with-witness'],
};

/**
 * Pick a POV frame for the overview-as-hook, gated by holder + tension.
 *
 * Open slot ('invent') rolls at ~10%. Otherwise filter POV_FRAMES by
 * the two incompatibility maps and pick uniformly from the eligible
 * set. If the eligible set is empty (pathological combination), fall
 * back to 'sages_rumor' — universally compatible (a secondhand rumor
 * can attach to any place).
 */
const POV_FRAME_OPEN_SLOT_RATE = 0.10;

export function pickRandomPovFrame(rng = Math.random, { holder = null, tension = null } = {}) {
  if (rng() < POV_FRAME_OPEN_SLOT_RATE) return 'invent';
  const eligible = POV_FRAMES.filter(f => {
    if (f === 'invent') return false;
    const badHolders = POV_FRAME_INCOMPATIBLE_HOLDERS[f] || [];
    if (badHolders.includes(holder)) return false;
    const badTensions = POV_FRAME_INCOMPATIBLE_TENSIONS[f] || [];
    if (badTensions.includes(tension)) return false;
    return true;
  });
  if (eligible.length === 0) return 'sages_rumor';
  return eligible[Math.floor(rng() * eligible.length)];
}

/**
// ---------------------------------------------------------------------
// SUPPRESS rule (used by pickRandomThirdParty above)
// ---------------------------------------------------------------------

/**
 * Tensions whose premise IS already an adversarial outsider in play
 * (a rival party mid-extraction, occupiers in residence). When these
 * tensions roll, third_party's adversary type would double up — so
 * the picker flips adversary rolls to ally type instead, keeping the
 * dungeon legible. Ally rolls pass through unchanged.
 */
export const RIVAL_TENSIONS = new Set([
  'occupied-by-rivals',
  'methodically-looted',
]);

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
  "ancient seal weakening: a magical seal or ward (or its physical disguise — a stone lid, a stopper, a sealed door) is failing and must be maintained. Frame the binding differently — chain, sleep, contract, geographic prison, body containing something inside it.",
  "lich seeking phylactery: a lich's phylactery is the central objective.",
  "cult preparing summoning ritual: a cult mid-ritual that must be interrupted before completion.",
  "dragon hoarding gold: a dragon sits on a visible central treasure hoard.",
  "silent order: a monastic order defined by its vow of silence. Give monastic groups a working voiced life instead.",
  "cosmic feeder at the center: an unnameable entity that consumes souls / memories / dreams / minds / light / time. Give the central presence a specific identity and stated motivations.",
  "bell-and-password gate: admission via bell-ring, coded knock, or password-through-slot. Use birth-proof, trial, sponsorship, body-mark, knowledge test, oath binding, or invitation-only instead.",
  "dying-patron-needs-succession-document: a patron is dying and the dungeon holds the legal document (oath-clause, succession-deed, naming-tablet) that authorizes their heir. Reach for a different stake — a coming threat the knowledge counters, a debt it cancels, a person it identifies, a place it locates.",
  "bells as central mechanic: bells in ANY load-bearing role — signal alarms, mystical-rhythm seals, timed passwords, bell-towers as architectural anchors. Replace with runners, drum-cycles, candle-signals, watch-tallies, whistle-codes, water-clock drips, hammer-cadence, or chant-time.",
];

// ---------------------------------------------------------------------
// Pickers
// ---------------------------------------------------------------------

/**
 * Pick a fresh subset of the rolled register's curated character pool
 * for prompt-time injection as SAMPLE names. The dungeon overview
 * prompt embeds the descriptor (phonological description) plus this
 * rotated subset so the LLM has concrete examples to derive from
 * without anchoring on a fixed three-name pool every generation.
 *
 * Catchall registers (no curated pool) return null — the caller falls
 * back to descriptor-only naming guidance.
 *
 * @param {string|null} register - full register descriptor (e.g., 'Elven: lyrical...')
 * @param {() => number} [rng=Math.random]
 * @param {number} [n=6] - subset size; clipped to pool length
 * @returns {string[]|null} - n names from the pool, or null if no pool exists
 */
export function pickRegisterPoolSubset(register, rng = Math.random, n = 6) {
  if (typeof register !== 'string' || register.length === 0) return null;
  const prefix = register.split(':')[0].trim();
  const entry = REGISTER_CHARACTER_WHITELISTS[prefix];
  if (!entry || !Array.isArray(entry.pool) || entry.pool.length === 0) return null;
  const shuffled = [...entry.pool].sort(() => rng() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

/**
 * Map a difficulty tier (1-5) to its danger-shelf emotional category.
 * T1 / T2 → 'complicating', T3 → 'significant', T4 / T5 → 'scary'.
 * The category is the bucket key in each register's
 * `creatureTraditionByTier` field. Invalid tiers fall back to
 * 'complicating' (the safe low-threat default).
 */
export function tierBandForDifficulty(difficulty) {
  if (difficulty === 4 || difficulty === 5) return 'scary';
  if (difficulty === 3) return 'significant';
  if (difficulty === 1 || difficulty === 2) return 'complicating';
  return 'complicating';
}

/**
 * Pick a tier-appropriate creature from the rolled register's
 * `creatureTraditionByTier` field. Used to interpolate cargo-cult-
 * resistant creatures into prompt worked examples — instead of a
 * hard-coded 'Sirmus' in every example, the example pulls a creature
 * from the THIS-generation register that scales correctly to the
 * THIS-generation tier.
 *
 * Returns null when the register has no `creatureTraditionByTier`
 * (protected registers don't carry one) or when the register
 * descriptor can't be resolved. Callers should fall back to a
 * bracket-placeholder shape in that case.
 *
 * @param {string|null} register - full register descriptor or null
 * @param {number} difficulty - 1-5
 * @param {() => number} [rng=Math.random]
 * @returns {string|null}
 */
export function pickRegisterCreatureForTier(register, difficulty, rng = Math.random) {
  const entry = findRegisterByPrefix(register);
  if (!entry || !entry.creatureTraditionByTier) return null;
  const band = tierBandForDifficulty(difficulty);
  const bucket = entry.creatureTraditionByTier[band];
  if (!Array.isArray(bucket) || bucket.length === 0) return null;
  return bucket[Math.floor(rng() * bucket.length)];
}

/**
 * Pick N materials from the rolled register's `materialTradition`
 * (comma-separated string). Used to interpolate materials into
 * prompt worked examples — replaces a hard-coded 'wax' in every
 * example with a sample from the rolled register's tradition.
 *
 * Returns null when the register has no materialTradition (protected
 * registers) or when the register descriptor can't be resolved.
 * Callers should fall back to a bracket-placeholder shape.
 *
 * @param {string|null} register - full register descriptor or null
 * @param {() => number} [rng=Math.random]
 * @param {number} [n=1] - number of materials to sample
 * @returns {string[]|null}
 */
export function pickRegisterMaterials(register, rng = Math.random, n = 1) {
  const entry = findRegisterByPrefix(register);
  if (!entry || typeof entry.materialTradition !== 'string') return null;
  const items = entry.materialTradition
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  if (items.length === 0) return null;
  const shuffled = [...items].sort(() => rng() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

/**
 * Pick a random tension from the pool. Used for the empty-input case
 * (no LLM involvement for tension; code-random gives uniform
 * distribution across the 15 entries).
 */
/**
 * Tier-weighting for tensions whose narrative scale doesn't fit low
 * tiers cleanly. Weights below 1.0 reduce probability at that tier;
 * above 1.0 increase. Tensions not listed are uniform across tiers.
 *
 * The cosmic-coded tensions (sealed-and-stirring, awakening-
 * architecture, prison-breaking, dormant-with-witness) drift cosmic
 * even when the prose tries to scope local — sealed-and-stirring at
 * Tier 1 reliably produces "an ancient god stirs" framing regardless
 * of the tier directive. Down-weighting at low tiers + up-weighting
 * mortal-scale tensions (occupied-by-rivals, methodically-looted,
 * freshly-occupied) is the cascade fix.
 *
 * forgotten-knowledge is mildly cosmic-coded (lost arcane knowledge
 * tends to be old-and-large); soft down-weight at low tiers.
 *
 * Indexed by tier (1-5).
 */
export const TENSION_TIER_WEIGHTS = {
  'sealed-and-stirring':    [0.2,  0.5, 1.0, 1.3, 1.5],
  'awakening-architecture': [0.2,  0.5, 1.0, 1.3, 1.5],
  'prison-breaking':        [0.3,  0.6, 1.0, 1.3, 1.5],
  'dormant-with-witness':   [0.3,  0.6, 1.0, 1.2, 1.4],
  'forgotten-knowledge':    [0.5,  0.7, 1.0, 1.2, 1.3],
  'freshly-occupied':       [1.5,  1.3, 1.0, 0.7, 0.5],
  'methodically-looted':    [1.5,  1.3, 1.0, 0.7, 0.5],
  'occupied-by-rivals':     [1.5,  1.3, 1.0, 0.7, 0.5],
  'boss-decline':           [1.3,  1.2, 1.0, 0.9, 0.8],
  'pilgrimage-route':       [1.3,  1.2, 1.0, 0.9, 0.8],
  'harvesting-operation':   [1.2,  1.1, 1.0, 1.0, 1.0],
};

export function pickRandomTension(rng = Math.random, { tier = null } = {}) {
  const validTier = tier && DIFFICULTY_TIER_KEYS.includes(tier) ? tier : null;
  if (!validTier) {
    return DUNGEON_TENSIONS[Math.floor(rng() * DUNGEON_TENSIONS.length)];
  }
  const weights = DUNGEON_TENSIONS.map((t) => {
    const tw = TENSION_TIER_WEIGHTS[t];
    return tw ? tw[validTier - 1] : 1.0;
  });
  return weightedPick(DUNGEON_TENSIONS, weights, rng);
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
 * Pick a random power structure from POWER_STRUCTURES, weighted.
 * Code-picked rather than LLM-inferred for the same reason as tension:
 * the LLM clusters; code-random gives controlled coverage across the
 * structural shapes.
 *
 * Weights (sum to 1.0):
 *   single_apex       0.42 — apex-led dungeons, the staple shape
 *   several_unrelated 0.42 — multiple-power coexistence
 *   living_order      0.16 — infiltrations, deliberately a minority
 *                            (the shape is satisfying but needs
 *                            contrast to feel fresh)
 */
export const POWER_STRUCTURE_WEIGHTS = {
  single_apex:       0.42,
  several_unrelated: 0.42,
  living_order:      0.16,
};

export function pickRandomPowerStructure(rng = Math.random) {
  const r = rng();
  let cumulative = 0;
  for (const ps of POWER_STRUCTURES) {
    cumulative += POWER_STRUCTURE_WEIGHTS[ps] || 0;
    if (r < cumulative) return ps;
  }
  // Defensive: floating-point edge case (r === 1.0). Fall through to last.
  return POWER_STRUCTURES[POWER_STRUCTURES.length - 1];
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
 * Anti-clustering: ban every entry in OVERUSED_DUNGEON_TROPES on
 * every generation. The rotation was originally 70% to keep the
 * prompt varied and avoid anchor-on-bans, but every trope in this
 * list has shown up often enough in production that the user wants
 * them gone uniformly. Adding to OVERUSED_DUNGEON_TROPES now bans
 * permanently — pick the bar accordingly.
 *
 * The rng arg is retained for callsite compatibility but unused.
 */
export function getBannedDungeonTropesForGeneration(_rng = Math.random) {
  return [...OVERUSED_DUNGEON_TROPES];
}

/**
 * Re-export setting's character-candidate generator. Same selection
 * rule (3 values from 3 different sub-dimensions) applies to dungeons
 * because DUNGEON_CHARACTERS === SETTING_CHARACTERS by reuse.
 */
export { generateCharacterCandidates };

// =============================================================
// MONSTER POPULATION: one creature_type + one relation per dungeon
// =============================================================
//
// The 3-slot encounter palette (minion / strong_minion /
// large_creature) is a SHARED POPULATION — all three slots inherit a
// single dungeon-wide creature_type. A funerary dungeon's roster is
// three tiers of undead, not undead-then-humanoid-then-ooze. The
// large_creature is the apex of the same kind, not a wild card.
//
// One relation tag also applies dungeon-wide. The population's tie
// to the dungeon's powers is a single fact about the place: the
// place's monsters are the dominant power's thralls, OR they are
// wild predators that live here, OR they are bound constructs left
// running from the founders. They are not three different things at
// once.
//
// Relation targets only dominant_power and wild — the contender is
// too varied (19 kinds, most without their own minions) to be a
// coherent target for a dungeon-wide creature relation. If a
// specific contender kind implies its own forces (rival_expedition,
// pursuing_force), that's the LLM's job to write into the prose.
//
// The relation tag list is cognition-gated: a swarm can't be a
// devotee. The picker filters tags by the rolled creature_type's
// cognition class.

export const MONSTER_CREATURE_TYPES = [
  'humanoid',
  'undead',
  'construct',
  'beast',
  'abyssal',
  'fey',
  'elemental',
  'ooze_or_swarm',
];

// Cognition class per creature type. Drives which relation tags are
// coherent — a beast can't be a devotee, a construct can't be a
// devotee, but both can be bound.
//   mindful         — chose-to-serve / negotiates / surrenders
//   alien_mindful   — strange agency, narrow tag set
//   flexible        — undead span the cognition range (lich → bone)
//   animal          — trained, lured, or wild
//   mindless_bound  — built/summoned, follows a binding
//   mindless        — no agency at all
export const CREATURE_COGNITION = {
  humanoid:      'mindful',
  undead:        'flexible',
  construct:     'mindless_bound',
  beast:         'animal',
  abyssal:       'alien_mindful',
  fey:           'mindful',
  elemental:     'mindless_bound',
  ooze_or_swarm: 'mindless',
};

// Relation tags allowed per cognition class. Compound tag = (target,
// mode). Targets: dominant_power / wild. Modes:
//   devotee   — chose to serve (mindful only)
//   thrall    — mind-controlled / sapient but no will (mindful only)
//   conscript — compelled but mortal, can surrender (mindful only)
//   bound     — animated / ritually held / trained (any cognition)
//   predator  — no claim, hunts what wanders (any cognition)
//   unaffiliated — just lives here (any cognition)
export const RELATION_TAGS_BY_COGNITION = {
  mindful: [
    'dominant_power_devotee',
    'dominant_power_thrall',
    'dominant_power_conscript',
    'dominant_power_bound',
    'wild_predator',
    'wild_unaffiliated',
  ],
  flexible: [
    'dominant_power_devotee',
    'dominant_power_thrall',
    'dominant_power_bound',
    'wild_predator',
    'wild_unaffiliated',
  ],
  alien_mindful: [
    'dominant_power_devotee',
    'dominant_power_thrall',
    'wild_predator',
    'wild_unaffiliated',
  ],
  animal: [
    'dominant_power_bound',
    'wild_predator',
    'wild_unaffiliated',
  ],
  mindless_bound: [
    'dominant_power_bound',
    'wild_predator',
    'wild_unaffiliated',
  ],
  mindless: [
    'dominant_power_bound',
    'wild_predator',
    'wild_unaffiliated',
  ],
};

// Per-tag GM-facing directive — what this relation MEANS at the
// table. The directive is injected into the prompt next to the
// rolled tag so the LLM writes the population's role with the
// behavior the tag implies. Phrased as positive specs.
export const RELATION_DIRECTIVES = {
  dominant_power_devotee:
    'Chose to serve the dominant power; ideologically committed. Fights to the death rather than retreat; can be turned only by shaking the ideology, not by threat.',
  dominant_power_thrall:
    'Bound to the dominant power against their own will — mind-controlled, charmed, or oath-locked. Collapse, break free, or go feral when the binder dies or the binding fails.',
  dominant_power_conscript:
    'Compelled into service by debt, hostage-leverage, or coercion; mortal and aware. Surrender given a safe exit; can be turned by removing the leverage.',
  dominant_power_bound:
    'Animated, summoned, trained, or ritually bound by the dominant power. Behavior follows the binding parameters; the binding can be disrupted by destroying its anchor (rune, totem, handler, command-word).',
  wild_predator:
    'No allegiance; live in the dungeon as predators. Hunt whatever wanders into their territory — including the dominant power\'s own servants. Read the party as prey.',
  wild_unaffiliated:
    'No allegiance; live in the dungeon as an unaffiliated presence. Avoid conflict when given space; defend their territory when pressed. Negotiable through ritual, food, or simple departure.',
};

export function pickRandomCreatureType(rng = Math.random) {
  return MONSTER_CREATURE_TYPES[Math.floor(rng() * MONSTER_CREATURE_TYPES.length)];
}

// Pick a relation tag for a given creature type. Defensive: if the
// cognition table or pool is somehow empty, falls back to
// wild_unaffiliated as the value that always fits.
export function pickRelationForCreatureType(creatureType, { rng = Math.random } = {}) {
  const cognition = CREATURE_COGNITION[creatureType];
  const pool = RELATION_TAGS_BY_COGNITION[cognition] || [];
  if (pool.length === 0) return 'wild_unaffiliated';
  return pool[Math.floor(rng() * pool.length)];
}

// Roll the dungeon's minion population: ONE creature_type + ONE
// relation that apply to the minion + strong_minion slots only. The
// large_creature (the apex) is intentionally LEFT UNCONSTRAINED — a
// different kind from the minions, the dungeon's signature solo
// threat, free-picked by the LLM. The minions are what the party
// encounters most often, so coherence matters there; the apex is
// one fight and benefits from being its own thing.
export function rollMonsterPopulation({ rng = Math.random } = {}) {
  const creature_type = pickRandomCreatureType(rng);
  const relation = pickRelationForCreatureType(creature_type, { rng });
  return { creature_type, relation };
}
