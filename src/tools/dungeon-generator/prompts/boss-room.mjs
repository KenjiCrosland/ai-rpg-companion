/**
 * Boss room prompt — generates the dungeon's climactic encounter
 * chamber. The boss is always present; the party can never reach
 * this room without consequence.
 *
 * Output shape (same 4-field pattern as the other audited room
 * types, with one type-specific tightening: has_challenge is ALWAYS
 * true — the boss IS the challenge):
 *
 *   name                 — descriptive room name reflecting both
 *                          function and dungeon character ("Warden's
 *                          Scriptorium," "Hydrothrax's Sanctum,"
 *                          "The Vortex-Heart")
 *   door_preamble        — usually empty for boss rooms (they're
 *                          typically dead-end terminals)
 *   read_aloud_opening   — 50-100 word boxed text; the boss is part
 *                          of the scene (visible, audible, or
 *                          imminent)
 *   has_challenge        — ALWAYS true
 *   challenge_header     — ≤8 word title naming the encounter's
 *                          character ("Warden's Last Defense," "The
 *                          Vortex Rite," "The Final Audience") —
 *                          NOT just the boss's name (the boss
 *                          appears in its own dm_notes sub-block)
 *   dm_notes             — array of paragraph strings. First
 *                          paragraph covers room overview +
 *                          environmental features + the encounter
 *                          at high level. Subsequent sub-blocks are
 *                          standard for boss rooms: the boss profile,
 *                          the boss's weakness, loot/rewards, parley
 *                          option (when applicable).
 *   one_sentence_summary — sidebar summary, ≤20 words.
 *
 * Why this shape (vs. the old 13-field structure):
 *   The old prompt mandated boss_name + boss_description +
 *   boss_motivation + boss_weakness + boss_mechanics +
 *   environmental_features + failure_consequences +
 *   roleplaying_opportunities + loot_and_rewards + npc_interaction
 *   + TWO read-aloud blocks. The model produced 9 separate DM
 *   paragraphs per room — a wall of text. Published-adventure boss
 *   rooms cover the same content in 2-4 paragraphs with bolded
 *   sub-block titles. The new shape collapses overlapping slots and
 *   gives the model standard sub-block templates to populate.
 *
 * The NPC assignment system places the dungeon's primary antagonist
 * in this room via npcString. The boss's identity, motivation, and
 * character come from the assigned NPC's overview entry — the prompt
 * incorporates them rather than reinventing them.
 *
 * Difficulty tier (1-5) scales DCs/severity. Boss-tier-stakes:
 * combat is the assumed challenge, but Stealth/Deception/Persuasion
 * paths to bypass the encounter are valid when the boss is
 * negotiable. Stored on `dungeon.dimensions.difficulty`.
 */

import {
  CROSS_ROOM_REFERENCES_SECTION,
  READ_ALOUD_NO_DOORWAY_INVENTORY_RULE,
  READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE,
  ROOM_MENTIONS_FIELD_DESC,
} from './shared-fragments.mjs';
import {
  parseAndValidateRoom,
  validateRequiredKeys,
  validateHasChallengeRequired,
  validateDmNotes,
  validateOptionalDoorPreamble,
  validateOptionalRoomMentions,
} from './shared-validators.mjs';

export function generateBossRoomPrompt(
  dungeonOverview,
  shortDescription,
  connectedRoomsInfo = '',
  formRoomName = '',
  formRoomSummary = '',
  npcString = '',
  difficulty = null,
  doorwayInfo = null,
  loreRole = null,
  loreLookup = '',
  incomingMentions = '',
  featuredItems = '',
  bossStatblock = '',
) {
  const tierLine = difficulty
    ? `Dungeon difficulty tier: ${difficulty} (1-5). Scale boss encounter DCs (saves, ability checks) and damage / failure severity to this tier.`
    : `Dungeon difficulty tier: not specified — default to T2 (DCs 12-14).`;

  const connectedSection = connectedRoomsInfo && connectedRoomsInfo !== ''
    ? `Connected rooms (rooms reachable from this one): ${connectedRoomsInfo}\n`
    : '';

  const doorwaySection = doorwayInfo
    ? `\nDOORWAYS IN THIS ROOM — authoritative door states from the map. The door_preamble field MUST report states EXACTLY as listed here. Do NOT invent locks, bars, DCs, force checks, or alternate bypasses for doors marked "unlocked door":
${doorwayInfo}
`
    : '';

  const npcSection = npcString
    ? `BOSS / NPC present in the room — this is the primary antagonist (or a major figure) the party encounters here. Use this character's identity, motivation, and character details from the overview as the basis for the encounter; do NOT invent a different boss.

NPC details:
${npcString}
`
    : `No specific NPC has been assigned to this room. Drive the boss from the dungeon overview's primary antagonist — the figure the overview names as the dominant power or leader. If the overview's antagonist is a creature population rather than a named individual, the room's boss is the apex member.`;

  const roomNameSection = formRoomName
    ? `User-provided room name (use verbatim): ${formRoomName}\n`
    : '';
  const roomSummarySection = formRoomSummary
    ? `User-provided summary (incorporate into the room): ${formRoomSummary}\n`
    : '';

  const loreRoleSection = loreRole
    ? `\nLORE ROLE: This room corresponds to "${loreRole}" from the dungeon's overview prose. The room generates AS that named place — its name, character, contents, and the player-facing payoff align with what the overview says about "${loreRole}".\n`
    : '';

  return `You are writing the BOSS room — the dungeon's climactic encounter chamber in a D&D 5e dungeon. The boss is always present; the party cannot reach this room without consequence.

DUNGEON OVERVIEW:
${dungeonOverview}

BOSS ROOM INFO:
Short description (size, exits, map-side notes): ${shortDescription}
${connectedSection}${loreRoleSection}${doorwaySection}${loreLookup}${incomingMentions}${featuredItems}${bossStatblock}${tierLine}
${roomNameSection}${roomSummarySection}${npcSection}

## REGISTER FIDELITY — respect the dungeon's established context

The dungeon overview establishes the dungeon's material, lighting, inhabitants, and construction register. The boss room INHERITS that register. The boss is the dungeon's CULMINATION — their room is the most distilled expression of the dungeon's character, not a generic combat arena.

- LIGHTING: if the overview describes ambient/natural light, use it as the boss room's primary light. The boss's presence may add ONE specific light source (a candle on a writing-desk, a guttering hearth, the green glow of a bound spirit) — not generic torches in brackets.
- CONSTRUCTION: the boss room may be more elaborate than the rest of the dungeon (the inner sanctum is more finished than the outer warrens), but it must remain coherent with the dungeon's makers.
- ENVIRONMENT: the boss room's environmental features should derive from the boss's nature and the dungeon's central tension. Hydrothrax's chamber has a vortex; Warden Elenharion's chamber has the scriptorium's locked codex. Not generic "magical traps" or "spike pits."

## CHALLENGE — always present, but combat is not the only path

has_challenge is ALWAYS true for boss rooms; the boss IS the challenge. But combat is not the only resolution. Depending on the boss's nature and the dungeon's quest hook:

- COMBAT — the most common resolution. The boss fights, the party defeats them.
- PARLEY / NEGOTIATION — when the boss has a stake the party can affect (Warden Elenharion knows the truth about the weeping-letters; the party offering to take the folio to the College gives him a way out). Often these bosses have a sub-block "Talking Through."
- STEALTH / BYPASS — when the boss is in a fragile state and the party can extract the objective without combat. Often these bosses are sleeping, distracted, or otherwise unable to resist if untriggered.

The encounter mechanic should match the dungeon's quest. A heist dungeon's boss is the gate to the objective; a recovery dungeon's boss holds the relic; a kill-the-monster dungeon's boss is the apex predator. Use the overview's central tension to guide which resolution path is canonical (the others remain available).

## BOLDING RULES

Use **markdown bold** ONLY for:
1. Creature names when first introduced (e.g., **drake-thrall**, **bound efreet**)
2. Character names when first introduced (e.g., **Warden Elenharion**, **Hydrothrax**)
3. Feature sub-block titles at the START of an optional dm_notes paragraph, formatted as: **Feature Name.** followed by description

DO NOT bold game mechanics keywords (DCs, skill names), action verbs, or generic phrases.

## CROSS-REFERENCE FIDELITY — use the LORE-LOCATION LOOKUP

When dm_notes references other parts of the dungeon (a route the boss escapes through, an item the party brought from another area), the references MUST resolve to area numbers via the LORE-LOCATION LOOKUP above. References to lore-locations not in the lookup are atmospheric only.

${CROSS_ROOM_REFERENCES_SECTION}

## WHAT DOES NOT GO IN dm_notes

Three categories are owned by other fields or sections:

1. EXIT INVENTORY. The read-aloud already names visible directions; door_preamble handles door states. dm_notes never lists exits.

2. SECRET DOORS AND THEIR MECHANICS. A separately-generated **Secret Door** notes section gets appended with canonical discovery/opening mechanics. dm_notes never mentions secret doors and NEVER creates a **Secret Door Trigger** or **Hidden Passage** feature sub-block.

3. DOOR MATERIAL. "Wooden door," "stone door" belong in the read-aloud (when notable). dm_notes treats doors by area number only.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "name": "${formRoomName ? formRoomName : 'A 1-4 word descriptive name reflecting the boss\'s sanctum and the dungeon character (e.g., \"Warden\'s Scriptorium,\" \"Hydrothrax\'s Tidehall,\" \"The Vortex-Heart,\" \"Elenharion\'s Locked Door\"). Avoid generic names like \"Boss Room\" or \"Final Chamber.\" Avoid archaic opaque terms.'}",

  "door_preamble": "Usually empty for boss rooms (they're typically dead-end terminals; the party arrives via one door and there's no onward path). Include door_preamble ONLY if this room genuinely has multiple doors with non-trivial states (a back-door escape route for the boss, a sealed passage to a secret chamber). For most boss rooms, pass empty string.",

  "read_aloud_opening": "Boxed text the DM reads when the party enters. 50-100 words, present-tense, sensory. The boss is part of the scene — visible (sitting at a desk, suspended in a vortex, on a throne), audible (hummed song, dripping water, scratching pen), OR imminent (a closed inner door behind which something stirs). Describe the chamber's character, atmosphere, the boss's presence, and any environmental features. ${READ_ALOUD_NO_DOORWAY_INVENTORY_RULE} ${READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE} NO mechanics, NO DM hints, NO addressing the DM. Avoid generic material adjectives like 'wooden door' unless the material is genuinely notable.",

  "has_challenge": true,

  "challenge_header": "≤8 word title naming the ENCOUNTER'S character — not the boss's name (the boss appears in its own dm_notes sub-block). Good: 'Warden's Last Defense,' 'The Vortex Rite,' 'The Final Audience.' Bad: 'Warden Elenharion' (that's the boss's name, not the encounter's character).",

  "dm_notes": [
    "First paragraph (REQUIRED). 100-200 words. Covers: dimensions, ENVIRONMENTAL FEATURES the encounter uses (the vortex, the scriptorium's hanging chains, the locked codex on the desk), the boss's immediate behavior on entry (asleep, working, expectant, sensing the party), and the encounter at a high level (combat as default, parley/stealth as alternatives if applicable). Do NOT put the boss's full profile here — that goes in its own sub-block.",
    "Second paragraph (REQUIRED). **[Boss Name].** Bolded inline title with the boss's name. Description follows. Cover the boss's PRESENCE, BEHAVIOR, and TACTICAL APPROACH — informed by the statblock if one is provided (above), but do NOT reproduce any of its mechanical content. Specifically: presence and demeanor on entry; motivation (from the overview); how the boss USES its abilities tactically (which ability for which target/situation, preferred opener, what triggers the recharge/escalation ability, when it falls back); panic threshold described in narrative terms (\"once visibly wounded,\" \"after losing a third of its strength\" — NEVER a specific HP number); a brief exploitable weakness or vulnerability (an Insight/History/Arcana check at a tier-scaled DC reveals it). The statblock owns the numbers; this paragraph owns the strategy. ABSOLUTELY DO NOT WRITE in dm_notes: the boss's AC, HP, attack bonuses, damage dice, save DCs, recharge ranges (5-6), action economy mechanics, immunities-as-listing, resistances-as-listing, condition immunities, or any other statblock field — those live in the dungeon's monsters section and the DM reads them there. 80-150 words.",
    "Third paragraph (OPTIONAL — include when applicable). **The [thematic name].** Use this slot for a SECONDARY load-bearing element the encounter needs: an environmental hazard with its own mechanic, a secondary NPC (bound spirit, sleeping minion, lieutenant), or a ritual-in-progress the party can disrupt. Skip if the first two paragraphs cover everything. 60-100 words.",
    "Fourth paragraph (OPTIONAL). **Talking Through.** ONLY when the boss has a stake the party can affect, meaning negotiation/parley is a viable alternative to combat. Describe what the boss wants, what the party can offer, the DC for negotiation (tier-scaled Persuasion or Insight), and what success yields. Skip when combat is the only path. 50-100 words.",
    "Fifth paragraph (OPTIONAL). **Loot and Reward.** What the party gains on victory. Specific items, knowledge, or strategic benefits — not 'treasure appropriate to their level.' If the dungeon's quest hook named a specific objective (a folio, a relic), that objective is here or accessed from here. 40-80 words."
  ],

  "one_sentence_summary": "Brief sidebar-list summary (≤20 words) of the room's role and the boss encounter's character.",

  "room_mentions": ${ROOM_MENTIONS_FIELD_DESC}
}

## DC SCALING (boss encounters)

- T1: DCs 10-12, boss saves DC 11-12, boss hit dice ~3-5
- T2: DCs 12-14, boss saves DC 13-14, boss hit dice ~5-8
- T3: DCs 14-16, boss saves DC 14-16, boss hit dice ~8-12
- T4: DCs 16-18, boss saves DC 16-18, boss hit dice ~12-16
- T5: DCs 18-20, boss saves DC 18-20, boss hit dice ~16-20

Failure consequences in boss encounters MUST be PHYSICAL and IMMEDIATE — the boss takes a hostage, the ritual completes a stage, the environmental hazard worsens. Not "the dungeon's reputation suffers" or "the world becomes slightly darker."`;
}

/**
 * Validate the boss room response. Same shape as the other room
 * prompts — `name`, `read_aloud_opening`, `has_challenge` (always
 * true), `challenge_header` (always required), `dm_notes` (array,
 * at least 2 entries), `one_sentence_summary` required;
 * `door_preamble` optional.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateBossRoomResponse(jsonString) {
  return parseAndValidateRoom(jsonString, [
    d => validateRequiredKeys(d, [
      'name',
      'read_aloud_opening',
      'has_challenge',
      'challenge_header',
      'dm_notes',
      'one_sentence_summary',
    ]),
    validateHasChallengeRequired,
    d => validateDmNotes(d, 2),
    validateOptionalDoorPreamble,
    validateOptionalRoomMentions,
  ]);
}

/**
 * Build the contentArray that the RoomDescription component renders.
 *
 * Order:
 *   1. door_preamble (paragraph)            — only when non-empty
 *   2. read_aloud_opening (boxed)
 *   3. challenge_header (header)
 *   4. dm_notes[0..n] (paragraph each)      — one entry per paragraph
 *
 * @param {object} data parsed boss room response
 * @returns {Array<{format: string, content: string}>}
 */
export function processBossRoomResponse(data) {
  const content = [];
  if (data.door_preamble && data.door_preamble.trim()) {
    content.push({ format: 'paragraph', content: data.door_preamble.trim() });
  }
  content.push({
    format: 'read_aloud',
    content: data.read_aloud_opening,
  });
  content.push({ format: 'header', content: data.challenge_header });
  for (const paragraph of data.dm_notes) {
    content.push({ format: 'paragraph', content: paragraph });
  }
  return content;
}
