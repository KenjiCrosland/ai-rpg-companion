/**
 * Locked room prompt — generates a room whose ACCESS is gated by a
 * PICKABLE LOCK. The lock is a DC-based skill check (Thieves' Tools
 * to pick, Athletics to force, possibly magic to bypass). It is NOT
 * a quest gate that requires a specific key from elsewhere — that
 * shape is the `requiresKey` flag, which routes to handleObstacleRoom
 * and uses a different prompt.
 *
 * The room behind the lock has some content the dungeon's
 * inhabitants thought worth securing (privacy, security, containment,
 * routine access control). The contents may be modest (a private
 * sleeping chamber, secure storage of supplies) or significant
 * (a workshop with dangerous experiments, a cache of records) —
 * the lock signals VALUE-ENOUGH-TO-LOCK, not vault-tier hoard.
 *
 * Output shape (same 4-field pattern as the other audited room
 * types):
 *
 *   name                 — descriptive room name reflecting what the
 *                          room actually IS in the dungeon ("Warden's
 *                          Private Chamber," "Sealed Back Passage,"
 *                          "Sleeping Sisters' Cells")
 *   door_preamble        — describes onward doors with their states;
 *                          the gating lock itself is owned by the
 *                          connecting room's preamble (the side the
 *                          party arrived from)
 *   read_aloud_opening   — 40-90 word boxed text; describes the room
 *                          as the party sees it after unlocking and
 *                          entering
 *   has_challenge        — boolean. Conditional, same default as
 *                          other room types. TRUE when a guardian,
 *                          trap, or in-room hazard is present. FALSE
 *                          when the room is just a chamber that
 *                          happened to be locked.
 *   challenge_header     — ≤8 word title, only when has_challenge
 *   dm_notes             — array of paragraph strings. First
 *                          paragraph covers contents, dimensions,
 *                          WHY this room was locked (the in-fiction
 *                          reason), and any inhabitants. Optional
 *                          feature sub-blocks.
 *   one_sentence_summary — sidebar summary, ≤20 words.
 *
 * Why this shape (vs. the old 7-field structure):
 *   The old prompt opened with "the locked room is known to the
 *   dungeon's regular inhabitants and serves a specific purpose,
 *   often containing important treasures, valuable items, or
 *   significant information" — which biased every locked room toward
 *   the treasury/armory/vault pattern regardless of what the room
 *   actually was. The new prompt treats the LOCK as a gating mechanic
 *   and lets the room be whatever fits the dungeon's context.
 *
 * KINDS OF ROOMS that get gated (use to ground the model's choice):
 *
 *   - PRIVATE CHAMBER — someone's quarters they didn't want disturbed
 *   - STRATEGIC DIVISION — sealed-off section, factional border, back-of-house
 *   - DANGEROUS CONTAINMENT — work-in-progress or creature sealed for safety
 *   - SECURE STORAGE — supplies, records, equipment the owners gated routinely
 *   - SECONDARY SANCTUM — a quieter chamber the leadership uses
 *   - BACK PASSAGE / SERVICE — a less-used access way, locked for security
 *   - ABANDONED WING — a section the current inhabitants closed off
 *   - QUARANTINE / RESTRICTED — sealed because something happened here
 *
 * Difficulty tier (1-5) scales DCs/severity when has_challenge is
 * true. Stored on `dungeon.dimensions.difficulty`.
 */

export function generateLockedRoomPrompt(
  dungeonOverview,
  shortDescription,
  connectedRoomsInfo = '',
  npcString = '',
  difficulty = null,
  doorwayInfo = null,
  loreRole = null,
  loreLookup = '',
) {
  const tierLine = difficulty
    ? `Dungeon difficulty tier: ${difficulty} (1-5). If a challenge is generated, scale DCs and failure severity to this tier.`
    : `Dungeon difficulty tier: not specified — default to T2 (DCs 12-14) if generating a challenge.`;

  const connectedSection = connectedRoomsInfo && connectedRoomsInfo !== ''
    ? `Connected rooms (rooms reachable from this one): ${connectedRoomsInfo}\n`
    : '';

  const doorwaySection = doorwayInfo
    ? `\nDOORWAYS IN THIS ROOM — authoritative door states from the map. The door_preamble field MUST report states EXACTLY as listed here. Do NOT invent locks, bars, DCs, force checks, or alternate bypasses for doors marked "unlocked door":
${doorwayInfo}
`
    : '';

  const npcSection = npcString
    ? `INHABITANTS PRESENT IN THE ROOM — incorporate them. If an NPC is present, use the NPC's identity from the overview; do not invent a different one. If MONSTER POPULATIONS are listed, USE THEM as the room's threat — do NOT invent a different guardian; do NOT promote a minion-tier creature to apex-tier.

${npcString}
`
    : '';

  const loreRoleSection = loreRole
    ? `\nLORE ROLE: This room corresponds to "${loreRole}" from the dungeon's overview prose. The room generates AS that named place — its name, character, contents, and the player-facing payoff align with what the overview says about "${loreRole}".\n`
    : '';

  return `You are writing a room whose ACCESS is gated by a PICKABLE obstacle — what the dungeon system calls a "locked" room. The obstacle is a DC-based challenge (Thieves' Tools, Athletics, Arcana, fire to burn vines, force to clear rubble) — not a quest gate requiring a specific key from elsewhere. The obstacle can be a literal lock on a door OR a non-door barrier (vines, fungal wall, magical seal, ice, rubble, flooded passage). Pick the obstacle TYPE based on the dungeon's register.

DUNGEON OVERVIEW:
${dungeonOverview}

LOCKED ROOM INFO:
Short description (size, exits, map-side notes): ${shortDescription}
${connectedSection}${loreRoleSection}${doorwaySection}${loreLookup}${tierLine}
${npcSection}

## THE "LOCK" IS A PICKABLE OBSTACLE — NOT ALWAYS A DOOR

The "lock" gating this room is a DC-based obstacle the party can defeat with appropriate skill, force, or magic. It is NOT a quest gate (that's the requiresKey flow). The obstacle is also NOT always a literal mechanical lock — it can be ANY barrier that a thoughtful party can overcome. Examples:

- A traditional lock on a wooden or iron door (Thieves' Tools)
- A heavy bar that needs forcing (Athletics) or removing via a gap above the door
- An overgrowth of thorned vines (fire, slashing, or a controlled blade-spell)
- A magical seal (Arcana to dispel, or a sympathetic key-object the party may carry)
- A wall of fungal mass that has to be burned or carved through
- A flooded passage that must be drained or swum
- A pile of rubble blocking the way (Strength or careful clearing)
- A pressure-locked door requiring weight on a hidden plate
- An iced-over portal that needs heat to melt

Pick the obstacle TYPE based on the dungeon's register and inhabitants. A drake-burrow's "lock" is fused stone or thorned root growth, not a brass padlock. A monastic library's "lock" is a heavy bar or a ward; a wizard's lab's is an arcane seal.

The obstacle's purpose: provide ACCESS CONTROL. The room behind isn't necessarily a treasure vault — the inhabitants had A reason to gate it (privacy, security, containment, routine sealing). The contents may be modest or significant.

## KINDS OF ROOMS that fit the "gated by a locked door" type

Pick one that matches the dungeon's lore and inhabitants:

- PRIVATE CHAMBER — someone's personal quarters they didn't want disturbed (the warden's bedchamber, a leader's private study)
- STRATEGIC DIVISION — a corridor, hall, or chamber that connects sections the owners wanted to compartmentalize (between factions, between living and working, between public and back-of-house)
- DANGEROUS CONTAINMENT — work-in-progress, creature, or substance sealed for safety
- SECURE STORAGE — supplies, records, equipment the owners gated routinely (not necessarily valuable — just access-controlled)
- SECONDARY SANCTUM — a quieter chamber the leadership uses (the warden's quiet reading nook; the captain's planning room)
- BACK PASSAGE / SERVICE — a less-used access way, locked because the main flow doesn't need it
- ABANDONED WING — a section the current inhabitants closed off, contents now disturbed only by mice and dust
- QUARANTINE / RESTRICTED — sealed because something happened here the owners want forgotten

## REGISTER FIDELITY — respect the dungeon's established context

The dungeon overview establishes material, lighting, inhabitants, construction. The locked room INHERITS that register:

- LIGHTING: ambient/natural where the overview establishes it; installed lighting only when the inhabitants would have placed it.
- LOCK TECHNOLOGY: matches the inhabitants. A monastic order has heavy bars and key-warded plates; drake-kin "lock" rooms with rolled stones and hide-bindings; a wizard's lab has arcane seals.
- CONTENTS: match the room's chosen kind (private chamber → personal belongings; back passage → spare supplies; quarantine → traces of what was sealed).

## CHALLENGE DECISION — do this first

has_challenge = TRUE when:
- A GUARDIAN is present (use the assigned monster from INHABITANTS PRESENT above; do not invent a new one)
- A TRAP rigged on entry (placed by the lock's owner)
- A SECONDARY in-room mechanic (a vault chest with its own DC, a bound creature)

has_challenge = FALSE when:
- The room is just a chamber — its lock was the only barrier; once past it, there's no in-room conflict
- The room is empty (current inhabitants haven't visited recently; it's just dust and stillness)
- The contents are informational only (records, supplies, a sleeping resident who won't engage)

Do NOT default to "every locked room has a guardian." MOST locked rooms in real dungeons are just rooms that happen to be locked. The lock was the challenge; what's behind it can be quiet.

**When a monster population is assigned to this room** (visible in INHABITANTS PRESENT above), that monster IS the in-room threat. Set has_challenge = TRUE and use the monster as-is.

## BOLDING RULES

Use **markdown bold** ONLY for:
1. Creature names when first introduced
2. Character names when first introduced
3. Feature sub-block titles at the START of an optional dm_notes paragraph, formatted as: **Feature Name.** followed by description

DO NOT bold game mechanics keywords, DCs, action verbs, or generic phrases.

## CROSS-REFERENCE FIDELITY — use the LORE-LOCATION LOOKUP

When dm_notes references other parts of the dungeon (where the key lies, what connects through here), references MUST resolve to area numbers via the LORE-LOCATION LOOKUP above. Lore-locations not in the lookup are atmospheric only.

## THE OBSTACLE IS ENCOUNTERED BEFORE THE PARTY READS THIS ROOM

The obstacle that gates this room is something the party deals with in the PRECEDING area (the connecting room they came from). By the time the DM reads THIS room's content to the party, the obstacle has already been bypassed — describing its DC and pick mechanics here would be out of order. The obstacle's mechanics live in the preceding room's content (separately generated, parallel to how Secret Door notes get appended to the room that contains them).

Do NOT include the obstacle's DC, bypass options, or pick mechanics in THIS room's dm_notes or read_aloud. The read-aloud and dm_notes describe the room AFTER the obstacle is overcome — the interior the party walks into, not the lock they've just defeated.

Lingering evidence of the bypass is fine in the read-aloud (a clipped padlock on the floor, the still-smoking remains of vine-ash, the cooling water of a melted ice-wall) — but the MECHANIC of defeating it is not.

## WHAT DOES NOT GO IN dm_notes

1. EXIT INVENTORY. The read-aloud names visible directions; door_preamble handles door states. dm_notes never lists exits.

2. SECRET DOORS AND THEIR MECHANICS. A separately-generated **Secret Door** notes section gets appended with canonical discovery/opening mechanics. dm_notes never mentions secret doors and NEVER creates a **Secret Door Trigger** or **Hidden Passage** feature sub-block.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "name": "A 1-4 word descriptive name reflecting WHAT THE ROOM ACTUALLY IS — not 'locked room' or 'vault.' Examples: 'Warden's Bedchamber,' 'Sealed Back Passage,' 'Sisters' Sleeping Cells,' 'The Quiet Reading Room,' 'Brothers' Spare Storeroom.' Avoid generic 'Locked Storage,' 'Locked Workshop' — the lock is structural; name the room for its actual function.",

  "door_preamble": "Terse DM-side preamble describing any ONWARD doors with their states (the door the party used to enter is owned by the connecting room's preamble). OMIT this key (pass empty string) if no onward doors need flagging, or if the room is a dead-end pocket behind the lock.",

  "read_aloud_opening": "Boxed text the DM reads when the party enters AFTER UNLOCKING the gating door. 40-90 words, present-tense, sensory. Describe the room as it is — modest if mundane, atmospheric if quiet, alive if inhabited. Visible doorways/exits should be part of the scene. NO mechanics, NO DM hints. Avoid generic material adjectives.",

  "has_challenge": false,

  "challenge_header": "≤8 word title for the in-room challenge. Omit this key entirely if has_challenge is false.",

  "dm_notes": [
    "First paragraph (REQUIRED). Covers: dimensions, the room's KIND (from the list above), WHY the owners locked it (the in-fiction reason — routine security, a deliberate sealing, a private space, containment of something specific), and the SPECIFIC contents the party finds. Contents can be modest (spare bedding, a few jars of dried herbs, an unfinished letter) — they don't have to justify the lock as a treasure. 60-150 words. Do NOT describe the obstacle's DC or pick mechanics — that lives in the preceding room.",
    "Subsequent paragraphs are OPTIONAL feature sub-blocks for specific items, a guardian's profile if any, or secondary IN-ROOM mechanics (a chest within the room, a bound spirit, an unstable substance). Each begins with a bolded inline title: **Feature Name.** Description follows. Skip these if the first paragraph covered everything."
  ],

  "one_sentence_summary": "Brief sidebar-list summary (≤20 words) of what kind of room this is and why it was locked."
}

## DC SCALING (only if has_challenge)

- T1: DCs 10-12, failure → minor damage (1d4-1d6) or short setback
- T2: DCs 12-14, failure → moderate damage (2d6) or temporary condition
- T3: DCs 14-16, failure → real damage (3d6+) or persistent threat
- T4: DCs 16-18, failure → severe damage (4d8+) or party-wide complication
- T5: DCs 18-20, failure → lethal threat or major resource cost

Failure consequences MUST be PHYSICAL and IMMEDIATE — observable to the whole table within seconds of the failed roll.`;
}

/**
 * Validate the locked room response. Same shape as the other room
 * prompts — `name`, `read_aloud_opening`, `has_challenge`, `dm_notes`
 * (array), `one_sentence_summary` required; `challenge_header`
 * required only when has_challenge; `door_preamble` optional.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateLockedRoomResponse(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    const required = [
      'name',
      'read_aloud_opening',
      'has_challenge',
      'dm_notes',
      'one_sentence_summary',
    ];
    for (const key of required) {
      if (!(key in data)) {
        console.error(`Missing required key: ${key}`);
        return false;
      }
    }
    if (typeof data.has_challenge !== 'boolean') {
      console.error('has_challenge must be a boolean');
      return false;
    }
    if (
      data.has_challenge
      && (typeof data.challenge_header !== 'string' || !data.challenge_header.trim())
    ) {
      console.error('challenge_header required when has_challenge is true');
      return false;
    }
    if (!Array.isArray(data.dm_notes) || data.dm_notes.length === 0) {
      console.error('dm_notes must be a non-empty array of paragraph strings');
      return false;
    }
    if (data.dm_notes.some(p => typeof p !== 'string' || !p.trim())) {
      console.error('dm_notes entries must all be non-empty strings');
      return false;
    }
    if (data.door_preamble !== undefined && typeof data.door_preamble !== 'string') {
      console.error('door_preamble, when present, must be a string');
      return false;
    }
    return true;
  } catch (e) {
    console.error('Invalid JSON:', e);
    return false;
  }
}

/**
 * Build the contentArray that the RoomDescription component renders.
 *
 * Order:
 *   1. door_preamble (paragraph)            — only when non-empty
 *   2. read_aloud_opening (boxed)
 *   3. challenge_header (header)            — only when has_challenge
 *   4. dm_notes[0..n] (paragraph each)      — one entry per paragraph
 *
 * @param {object} data parsed locked room response
 * @returns {Array<{format: string, content: string}>}
 */
export function processLockedRoomResponse(data) {
  const content = [];
  if (data.door_preamble && data.door_preamble.trim()) {
    content.push({ format: 'paragraph', content: data.door_preamble.trim() });
  }
  content.push({
    format: 'read_aloud',
    content: data.read_aloud_opening,
  });
  if (data.has_challenge && data.challenge_header) {
    content.push({ format: 'header', content: data.challenge_header });
  }
  for (const paragraph of data.dm_notes) {
    content.push({ format: 'paragraph', content: paragraph });
  }
  return content;
}
