/**
 * Lock obstacle prompt — generates the "**The [Obstacle Name].**"
 * sub-block describing how the party defeats the lock/obstacle that
 * gates a `locked`-type room.
 *
 * Parallel to secret-door.mjs: the locked room itself contains only
 * the interior (post-bypass). The obstacle's mechanics live in the
 * room the party comes from. This prompt generates the obstacle
 * notes; the integration layer surfaces them in the preceding room's
 * content.
 *
 * Output shape (1-2 paragraph strings):
 *
 *   obstacle_paragraphs[0] — REQUIRED. Single paragraph leading with
 *                            **The [Obstacle Name].** sub-block title.
 *                            Describes what the obstacle is, the DC
 *                            for the primary defeat method, 1-2
 *                            alternates (force/magic/environmental),
 *                            and the immediate physical failure
 *                            consequence. 40-90 words.
 *
 *   obstacle_paragraphs[1] — OPTIONAL. Second paragraph for complex
 *                            opening mechanisms (multi-step puzzles,
 *                            sequenced rivets, sympathetic key-
 *                            objects). Leads with **Opening the
 *                            [Obstacle Name].** Skip for simple locks
 *                            (most cases).
 *
 * The obstacle is PICKABLE/DEFEATABLE — this is the `locked` type
 * convention, NOT the `requiresKey` flow. The prompt MUST produce
 * defeat options the party can attempt on the spot. A genuinely
 * impassable obstacle without an external key is the requiresKey
 * shape, not this.
 *
 * DC scaling (parallel to other room prompts' tier scaling):
 *   T1: pick DC 12, force DC 14, alternate DC 13
 *   T2: pick DC 14, force DC 16, alternate DC 15
 *   T3: pick DC 16, force DC 18, alternate DC 17
 *   T4: pick DC 18, force DC 20, alternate DC 19
 *   T5: pick DC 20, force DC 22, alternate DC 21
 *
 * The obstacle's character MATCHES the dungeon's register: drake-
 * burrow → root or stone or hide-binding; wizard tower → arcane
 * seal; monastic order → bar or warded plate; bog ruin → flooded
 * passage or rotting timber.
 */

import { logger } from '@/util/logger.mjs';

export function generateLockObstaclePrompt(
  dungeonOverview,
  precedingRoomDescription,
  lockedRoomDescription,
  lockedRoomName,
  difficulty = null,
  loreLookup = '',
) {
  const tierLine = difficulty
    ? `Dungeon difficulty tier: ${difficulty} (1-5). The primary defeat DC MUST come from the tier-scaling table below.`
    : `Dungeon difficulty tier: not specified — default to T2 (pick DC 14, force DC 16).`;

  const precedingSection = precedingRoomDescription
    ? `\nPRECEDING ROOM (where the party encounters this obstacle):\n${precedingRoomDescription}\n`
    : '';

  const lockedSection = lockedRoomDescription
    ? `\nLOCKED ROOM CONTENTS (what's on the other side of the obstacle — use to inform the obstacle's character):\n${lockedRoomDescription}\n`
    : `\nLOCKED ROOM: "${lockedRoomName || 'unnamed locked chamber'}" — contents not yet generated. Pick an obstacle that fits the dungeon's overall register.\n`;

  const lookupSection = loreLookup ? `\n${loreLookup}\n` : '';

  return `You are writing the **[Obstacle Name].** sub-block that gets appended to the PRECEDING room's DM-side notes when that room contains a doorway/threshold to a "locked"-type chamber. The output is GM-only — no read-aloud component.

DUNGEON OVERVIEW:
${dungeonOverview}
${precedingSection}${lockedSection}${lookupSection}
${tierLine}

## THE OBSTACLE IS PICKABLE — never impassable

This is the "locked" room convention: the obstacle is a DC-based challenge the party defeats with skill, force, or magic. It is NOT a quest gate that requires a key from a separate key-room (that's the requiresKey shape, handled by a different prompt). Pick an obstacle TYPE that fits the dungeon's register:

- TRADITIONAL LOCK — padlock or warded plate on a wooden/iron door (Thieves' Tools, picks, or skeleton key)
- BARRED DOOR — heavy bar dropped from inside (Athletics to force, or unfastening from a gap above)
- THORNED VINE-WALL or ROOT GROWTH — organic barrier (fire, blade-spell, slashing)
- FLOODED PASSAGE — water-filled corridor (swim, drain via lever, water-walking)
- ICED-OVER PORTAL — frozen door or wall (fire, heat, careful chipping)
- ARCANE SEAL — magical ward (Arcana to dispel, or a sympathetic-key item)
- FUNGAL OR WAX MASS — biological/material barrier (fire, carve, dissolving agent)
- PILE OF RUBBLE — collapsed passage (Strength to clear, or careful rope-work)
- PRESSURE-PLATE LOCK — door requiring weight or sequence (Investigation to find, Dexterity to trigger)

Match the obstacle to the dungeon's makers and the locked chamber's character (the LOCKED ROOM CONTENTS above). A monastic order's storage locks with a wooden door + iron padlock; a drake-burrow's "lock" is hide-binding or fused root-stone; a wizard's lab's barrier is a glowing ward.

## DC SCALING — pick the row matching the dungeon's tier

- T1: pick DC 12, force DC 14, alternate DC 13
- T2: pick DC 14, force DC 16, alternate DC 15
- T3: pick DC 16, force DC 18, alternate DC 17
- T4: pick DC 18, force DC 20, alternate DC 19
- T5: pick DC 20, force DC 22, alternate DC 21

Pick a DC within the tier's range — exact DC depends on the obstacle's quality and the dungeon's age. Failure on the primary roll has a tier-appropriate PHYSICAL and IMMEDIATE consequence: a vine-thorn jabs the picker's hand for 1d4 piercing, a brittle padlock-spring snaps and embeds in the finger, the iced door cracks loudly and alerts area X, the rubble shifts and crushes 1d6 bludgeoning on a failed Dex save.

## BOLDING RULES

Use **markdown bold** ONLY for:
1. The **The [Obstacle Name].** sub-block title at the start of the first paragraph
2. The optional **Opening the [Obstacle Name].** title at the start of a second paragraph
3. Creature/character names if any appear (rare in an obstacle entry)

DO NOT bold DCs, skill names, action verbs, or generic phrases. Plain text carries those.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "obstacle_paragraphs": [
    "First paragraph (REQUIRED). Lead with **The [Obstacle Name].** Then cover: WHAT the obstacle is (one short sensory line), the PRIMARY defeat method with a DC (e.g., 'a character with thieves' tools who succeeds on a DC 14 check picks it open'), 1-2 ALTERNATE methods with DCs (force, magic, environmental), and the immediate PHYSICAL failure consequence. Aim for 40-90 words.",
    "Second paragraph (OPTIONAL — include ONLY for complex multi-step or sequenced openings). Lead with **Opening the [Obstacle Name].** Describe the mechanism (a rivet pressed while pulling, a phrase recited while touching a sigil, etc.) and how the party can deduce the sequence. Skip for simple locks. 40-80 words."
  ]
}

## TIGHTNESS

If you find yourself writing more than 120 words across both paragraphs, you're over-writing. Cut backstory, atmospheric flourishes, and anything the LOCKED ROOM's own entry will cover.

## EXAMPLE (terse, matches tier)

T2 monastic-order iron padlock on a wooden door (~55 words):
[
  "**The Iron Padlock.** A heavy iron padlock seals the door — older than the current order, worn but well-oiled. A character with thieves' tools who succeeds on a DC 14 check picks it open. Athletics DC 16 forces the lock with a loud snap that may attract attention from area 4. On a failed pick, the brittle spring snaps and a sliver embeds in the picker's finger (1d4 piercing damage)."
]

T1 drake-burrow thorned root growth blocking a passage (~65 words):
[
  "**The Thorned Root-Wall.** Dense root growth crusted with hand-long thorns chokes the passage from floor to ceiling. A character who lights a torch or applies open flame burns it back in 1 minute (no roll required). Slashing weapons clear it in 5 minutes (DC 12 Athletics to hack through faster). Failure on a hack means a thorn jabs and lodges in the hand (1d4 piercing; bleeds until tended)."
]`;
}

/**
 * Validate the lock obstacle response.
 *
 *   obstacle_paragraphs — required non-empty array of non-empty strings,
 *                         max 2 entries.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateLockObstacleResponse(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data.obstacle_paragraphs)) {
      logger.error('obstacle_paragraphs must be an array');
      return false;
    }
    if (data.obstacle_paragraphs.length < 1 || data.obstacle_paragraphs.length > 2) {
      logger.error('obstacle_paragraphs must have 1 or 2 entries');
      return false;
    }
    if (data.obstacle_paragraphs.some(p => typeof p !== 'string' || !p.trim())) {
      logger.error('obstacle_paragraphs entries must all be non-empty strings');
      return false;
    }
    return true;
  } catch (e) {
    logger.error('Invalid JSON:', e);
    return false;
  }
}

/**
 * Build content items to append to the preceding room's contentArray.
 * Each paragraph becomes a paragraph item with the bolded sub-block
 * title rendered inline via the markdown helper.
 *
 * @param {object} data parsed lock obstacle response
 * @returns {Array<{format: string, content: string}>}
 */
export function processLockObstacleResponse(data) {
  return data.obstacle_paragraphs.map(p => ({
    format: 'paragraph',
    content: p,
  }));
}
