// useRoomDescription.js

import { ref } from 'vue';
import { generateGptResponse } from "@/util/ai-client.mjs";
import { logger } from '@/util/logger.mjs';
import {
  contentArrayToString,
  dungeonOverviewToString,
} from '../util/content-to-string.mjs';
import {
  getRoomLoreName,
  formatLoreLookupForPrompt,
} from '../util/assign-lore-locations.mjs';
import { formatRoomNPCsForPrompt } from '../util/assign-npcs.mjs';
import { formatRoomMonstersForPrompt } from '../util/assign-monsters.mjs';
import { getRoomItemNames } from '../util/assign-items.mjs';
import { getAllItems } from '@/util/item-storage.mjs';
import { statblockToPlainText } from '@/util/convertToMarkdown.mjs';
// Import prompt, validation, and processing functions
import {
  generateLockObstaclePrompt,
  validateLockObstacleResponse,
  processLockObstacleResponse,
} from '../prompts/lock-obstacle.mjs';
import {
  generateEntrancePrompt,
  validateEntranceResponse,
  processEntranceResponse,
} from '../prompts/dungeon-entrance.mjs';
import {
  generateCustomRoomPrompt,
  validateCustomRoomResponse,
  processCustomRoomResponse,
} from '../prompts/custom-room.mjs';
import {
  generateBossRoomPrompt,
  validateBossRoomResponse,
  processBossRoomResponse,
} from '../prompts/boss-room.mjs';
import {
  generateSetbackRoomPrompt,
  validateSetbackRoomResponse,
  processSetbackRoomResponse,
} from '../prompts/setback-room.mjs';
import {
  generateSecretRoomPrompt,
  validateSecretRoomResponse,
  processSecretRoomResponse,
} from '../prompts/secret-room.mjs';
import {
  generateLivingRoomPrompt,
  validateLivingRoomResponse,
  processLivingRoomResponse,
} from '../prompts/living-room.mjs';
import {
  generateConnectingRoomPrompt,
  validateConnectingRoomResponse,
  processConnectingRoomResponse,
} from '../prompts/connecting-room.mjs';
import {
  generatePurposeRoomPrompt,
  validatePurposeRoomResponse,
  processPurposeRoomResponse,
} from '../prompts/purpose-room.mjs';
import {
  generateSecretDoorPrompt,
  validateSecretDoorResponse,
  processSecretDoorResponse,
} from '../prompts/secret-door.mjs';
import {
  generateLockedRoomPrompt,
  validateLockedRoomResponse,
  processLockedRoomResponse,
} from '../prompts/locked-room.mjs';
import {
  generateObstaclePrompt,
  validateObstacleResponse,
  processObstacleResponse,
} from '../prompts/dungeon-obstacle.mjs';
import {
  generateKeyRoomPrompt,
  validateKeyRoomResponse,
  processKeyRoomResponse,
} from '../prompts/key-room.mjs';

export function useRoomDescription() {
  // **Helper Function: Aggregate Connected Rooms' Summaries**
  function getConnectedRoomsSummaries(currentDungeon, room) {
    if (!room.doorways || room.doorways.length === 0) return [];

    const summaries = room.doorways.map((doorway) => {
      const connectedRoom = currentDungeon.rooms.find(
        (r) => r.id === doorway.connectedRoomId,
      );
      if (connectedRoom) {
        return {
          name: connectedRoom.name || `Room ${connectedRoom.id}`,
          summary: connectedRoom.oneSentenceSummary || '',
          connectionType: doorway.type, // e.g., door, corridor, locked-door
          direction: doorway.side, // e.g., north, south
        };
      } else {
        return {
          name: `Room ${doorway.connectedRoomId}`,
          summary: '',
          connectionType: doorway.type,
          direction: doorway.side,
        };
      }
    });

    // **Filter Out Rooms Without Summaries**
    return summaries.filter((room) => room.summary);
  }

  // Build an authoritative "doorways in this room" string for the
  // prompt. Unlike getConnectedRoomsSummaries (which filters out
  // unsummarized rooms because its purpose is contextual prose),
  // this returns EVERY doorway with its actual map-level door type
  // so the prompt has ground truth for door states. Used to populate
  // the door_preamble field and prevent the model from inventing
  // locks/bars/DCs that contradict the map. Returns null when the
  // Format "established facts about this room" for prompt injection.
  // Other rooms may emit room_mentions describing what they establish
  // about this room (a creature seen, a sound heard, an event in
  // progress); those mentions land on `room.mentionsFromOthers`. Pass
  // these into the prompt so the room generates COHERENTLY with what
  // adjacent rooms have already claimed about it.
  //
  // Returns empty string when no incoming mentions exist.
  function formatIncomingMentionsForPrompt(room) {
    const mentions = room?.mentionsFromOthers;
    if (!Array.isArray(mentions) || mentions.length === 0) return '';
    const lines = mentions
      .map(m => `- From area ${m.from_area}: "${m.mention}"`)
      .join('\n');
    return `\nESTABLISHED FACTS ABOUT THIS ROOM (other rooms have already mentioned this room — honor these facts in your generation; do NOT contradict them):
${lines}
`;
  }

  // Format "featured items in this room" for prompt injection. When the
  // post-map item-assignment pass placed one or more items into this
  // room, surface a LIGHT presence-only context here: name, type,
  // rarity, and the item's physical description. Mechanical properties
  // (effects, DCs, charges, recharge) are deliberately omitted —
  // the model would either reproduce them imperfectly or invent
  // additional ones. The item's full card lives separately in the
  // dungeon's items section; the room's job is to place the item in
  // fiction (visible in the read-aloud, claimable in dm_notes), not
  // to re-describe what the card already covers.
  //
  // Items are read FRESH from item-storage at format time (not stored
  // on the dungeon), so user edits propagate to the next regeneration.
  //
  // Returns empty string when no items are assigned to this room.
  function formatRoomItemsForPrompt(currentDungeon, roomId) {
    const itemNames = getRoomItemNames(currentDungeon, roomId);
    if (itemNames.length === 0) return '';
    const allItems = getAllItems();
    const lines = itemNames
      .map((name) => {
        const item = allItems.find(i => i?.name === name);
        if (!item) return null;
        const type = item.item_type || 'item';
        const rarity = item.rarity ? `, ${item.rarity}` : '';
        const physical = (item.physical_description || '').trim();
        const physicalLine = physical ? `\n  Appearance: ${physical}` : '';
        return `- "${item.name}" (${type}${rarity})${physicalLine}`;
      })
      .filter(Boolean);
    if (lines.length === 0) return '';
    return `\nFEATURED ITEMS IN THIS ROOM — the dungeon's lore places these items here. The party finds them in this room.

${lines.join('\n')}

HOW TO HANDLE FEATURED ITEMS:
- PLACE the item in fiction. The read-aloud should describe the item as a visible, physical object (its appearance, its position in the room). dm_notes should note that the party can claim it (and any conditions — defeat the guardian, solve the puzzle).
- DO NOT describe the item's mechanical properties — no damage dice, save DCs, charges, recharge, attunement, bonuses, or features. The item card lives separately in the dungeon's items section and players read it there.
- DO NOT reference "described below," "see the item card," "detailed elsewhere," or any similar pointer — there is no card embedded in this room's notes.
- DO NOT invent new properties, lore, or rules for the item. Use ONLY the appearance above when characterizing it physically.
- Use the item's exact name as given. Do not abbreviate, paraphrase, or substitute (e.g., do not call "Fist of the Watcher Peak" just "the staff" once when introducing it — its name should appear in dm_notes at least once when the party can claim it).
`;
  }

  // Find the apex monster assigned to a room (typically the boss room).
  // Returns the monster object, or null. The apex is the
  // `large_creature` tier — per apex placement rules, it gets one room
  // to itself, so the first large_creature found in the room's monster
  // assignment list is the apex.
  function findApexInRoom(currentDungeon, roomId) {
    const monsterIds
      = currentDungeon?.monsterAssignments?.rooms_to_monster_ids?.[roomId] || [];
    if (monsterIds.length === 0) return null;
    if (!Array.isArray(currentDungeon?.monsters)) return null;
    for (const id of monsterIds) {
      const monster = currentDungeon.monsters.find(m => m.id === id);
      if (monster?.type === 'large_creature') return monster;
    }
    return null;
  }

  // Format the boss's statblock for prompt injection — wraps the
  // full statblock text in a "BOSS STATBLOCK" header with strict
  // "for strategy reference only; do not reproduce" guidance. The
  // statblock owns the numbers; the room owns the strategy.
  //
  // Returns empty string when:
  //   - no apex is assigned to this room
  //   - the apex has no statblock yet (the dispatcher's modal flow
  //     handles "generate first" elsewhere; this just degrades
  //     gracefully if the statblock isn't there)
  function formatBossStatblockForPrompt(currentDungeon, roomId) {
    const apex = findApexInRoom(currentDungeon, roomId);
    if (!apex || !apex.statblock || !apex.statblock.name) return '';
    let statblockText;
    try {
      statblockText = statblockToPlainText(apex.statblock);
    } catch (err) {
      logger.warn('[boss-statblock] failed to render statblock:', err);
      return '';
    }
    return `\nBOSS STATBLOCK — for strategy reference only. The numbers below INFORM the room's tactics paragraph but MUST NOT be reproduced in dm_notes. The statblock lives in the dungeon's monsters section; players read it there.

${statblockText}

Use this statblock to inform:
- Which ability the boss opens with against the party
- Which target the boss prioritizes (highest threat, weakest save, melee vs ranged)
- How the boss uses its recharge ability tactically (does it wait for cluster targets, fire on cooldown, hold for emergencies)
- Narrative panic threshold ("once visibly wounded," "after losing most of its strength" — NEVER a specific HP number)
- Exploitable weakness for the DC-checked reveal (one of: a vulnerability, a low save, a behavioral tell)

Do NOT write in the room's dm_notes: AC, HP, attack bonuses, damage dice, save DCs, recharge ranges (5-6), speed values, armor class, hit points, or any other statblock numeric.
`;
  }

  // After a room generates, propagate its room_mentions onto the
  // target rooms' mentionsFromOthers lists. This lets the dispatcher
  // surface the established context when those rooms later generate.
  function propagateRoomMentions(currentDungeon, sourceRoom, roomDescription) {
    if (!roomDescription || !Array.isArray(roomDescription.room_mentions)) return;
    const validIds = new Set(currentDungeon.rooms.map(r => r.id));
    for (const m of roomDescription.room_mentions) {
      if (!m || typeof m.mention !== 'string' || !m.mention.trim()) continue;
      const areaId = typeof m.area_id === 'number' ? m.area_id : null;
      if (areaId === null || !validIds.has(areaId)) continue;
      if (areaId === sourceRoom.id) continue;
      const targetRoom = currentDungeon.rooms.find(r => r.id === areaId);
      if (!targetRoom) continue;
      if (!Array.isArray(targetRoom.mentionsFromOthers)) {
        targetRoom.mentionsFromOthers = [];
      }
      // Avoid duplicate mentions from the same source room.
      const alreadyPresent = targetRoom.mentionsFromOthers.some(
        existing => existing.from_area === sourceRoom.id && existing.mention === m.mention.trim(),
      );
      if (!alreadyPresent) {
        targetRoom.mentionsFromOthers.push({
          from_area: sourceRoom.id,
          mention: m.mention.trim(),
        });
      }
    }
  }

  // room has no doorways.
  function formatRoomDoorways(currentDungeon, room) {
    if (!room.doorways || room.doorways.length === 0) return null;
    const stateOf = (doorway, connectedRoom) => {
      const t = (doorway.type || '').toLowerCase();
      if (t === 'secret') return 'secret door (hidden from players)';
      if (t === 'corridor') return 'open corridor (no door)';
      if (t === 'locked-door') {
        // Quest-gate: the door is the gate that requires the key
        // described in the obstacle room's own notes. Both sides
        // matter — the requiresKey flag is sometimes only on the
        // outgoing doorway from the obstacle room, and sometimes
        // the inbound side has no flag but the connected room is
        // requiresKey. Either condition means the door_preamble
        // must use the quest-gate format, not the pickable-lock
        // default.
        const questGate
          = doorway.requiresKey === true
          || (connectedRoom && connectedRoom.requiresKey === true)
          || room.requiresKey === true;
        if (questGate) {
          const obstacleRoom = room.requiresKey
            ? room
            : (connectedRoom && connectedRoom.requiresKey ? connectedRoom : null);
          const obstacleArea = obstacleRoom?.id ?? '?';
          return `QUEST-GATE LOCK (the obstacle and key are described in area ${obstacleArea}'s own notes; do NOT describe a pickable lock here)`;
        }
        return 'locked door (pickable — describe via "see the Lock notes below")';
      }
      return 'unlocked door';
    };
    const lines = room.doorways.map((doorway) => {
      const connectedRoom = currentDungeon.rooms.find(
        (r) => r.id === doorway.connectedRoomId,
      );
      const targetName = connectedRoom?.name
        ? `area ${connectedRoom.id} (${connectedRoom.name})`
        : `area ${doorway.connectedRoomId}`;
      const dir = doorway.side || 'unknown direction';
      return `- ${dir} to ${targetName}: ${stateOf(doorway, connectedRoom)}`;
    });
    return lines.join('\n');
  }

  // **Handler Functions**

  // Entrance Room Handler
  async function handleEntranceRoom({
    dungeonOverview,
    shortDescription,
    connectedRoomsInfo,
    doorwayInfo = null,
    formRoomName = '',
    formRoomSummary = '',
    npcString = '',
    difficulty = null,
    loreRole = null,
    loreLookup = '',
    incomingMentions = '',
    featuredItems = '',
  }) {
    const prompt = generateEntrancePrompt(
      dungeonOverview,
      shortDescription,
      connectedRoomsInfo,
      formRoomName,
      formRoomSummary,
      npcString,
      difficulty,
      doorwayInfo,
      loreRole,
      loreLookup,
      incomingMentions,
      featuredItems,
    );
    //logger.log('Prompt:', prompt);
    const response = await generateGptResponse(
      prompt,
      validateEntranceResponse,
    );
    const roomDescription = JSON.parse(response);
    // Entrance rooms are always named "Entrance" — the room number is
    // the disambiguator ("1. Entrance"). The new 4-field entrance
    // prompt deliberately does not have the model emit a `name` field
    // (the 16-field version did) because every entrance has the same
    // role-name; user-provided form room names override.
    if (!roomDescription.name) {
      roomDescription.name = formRoomName || 'Entrance';
    }
    const contentArray = processEntranceResponse(roomDescription);
    return { roomDescription, contentArray };
  }

  // Custom Room Handler
  async function handleCustomRoom({
    dungeonOverview,
    shortDescription,
    connectedRoomsInfo,
    formRoomName,
    formRoomSummary,
    npcString,
    difficulty = null,
    doorwayInfo = null,
    loreRole = null,
    loreLookup = '',
    incomingMentions = '',
    featuredItems = '',
  }) {
    const prompt = generateCustomRoomPrompt(
      dungeonOverview,
      shortDescription,
      connectedRoomsInfo,
      formRoomName,
      formRoomSummary,
      npcString,
      difficulty,
      doorwayInfo,
      loreRole,
      loreLookup,
      incomingMentions,
      featuredItems,
    );
    //logger.log('Prompt:', prompt);
    const customRoomResponse = await generateGptResponse(
      prompt,
      validateCustomRoomResponse,
    );
    const roomDescription = JSON.parse(customRoomResponse);
    const contentArray = processCustomRoomResponse(roomDescription);
    return { roomDescription, contentArray };
  }

  // Boss Room Handler
  async function handleBossRoom({
    room,
    currentDungeon,
    dungeonOverview,
    shortDescription,
    connectedRoomsInfo,
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
  }) {
    const roomName = formRoomName || room.name || '';
    const roomSummary = formRoomSummary || room.oneSentenceSummary || '';

    const prompt = generateBossRoomPrompt(
      dungeonOverview,
      shortDescription,
      connectedRoomsInfo,
      roomName,
      roomSummary,
      npcString,
      difficulty,
      doorwayInfo,
      loreRole,
      loreLookup,
      incomingMentions,
      featuredItems,
      bossStatblock,
    );
    //logger.log('Prompt:', prompt);
    const response = await generateGptResponse(
      prompt,
      validateBossRoomResponse,
    );
    const roomDescription = JSON.parse(response);
    const contentArray = processBossRoomResponse(roomDescription);
    return { roomDescription, contentArray };
  }

  // Setback Room Handler
  async function handleSetbackRoom({
    room,
    currentDungeon,
    dungeonOverview,
    shortDescription,
    connectedRoomsInfo,
    formRoomName = '',
    formRoomSummary = '',
    npcString = '',
    difficulty = null,
    doorwayInfo = null,
    loreRole = null,
    loreLookup = '',
    incomingMentions = '',
    featuredItems = '',
  }) {
    const roomName = formRoomName || room.name || '';
    const roomSummary = formRoomSummary || room.oneSentenceSummary || '';

    const prompt = generateSetbackRoomPrompt(
      dungeonOverview,
      shortDescription,
      connectedRoomsInfo,
      roomName,
      roomSummary,
      npcString,
      difficulty,
      doorwayInfo,
      loreRole,
      loreLookup,
      incomingMentions,
      featuredItems,
    );
    //logger.log('Prompt:', prompt);
    const response = await generateGptResponse(
      prompt,
      validateSetbackRoomResponse,
    );
    const roomDescription = JSON.parse(response);
    const contentArray = processSetbackRoomResponse(roomDescription);
    return { roomDescription, contentArray };
  }

  // Secret Room Handler
  async function handleSecretRoom({
    room,
    currentDungeon,
    dungeonOverview,
    shortDescription,
    connectedRoomsInfo,
    formRoomName = '',
    formRoomSummary = '',
    npcString = '',
    incomingMentions = '',
    featuredItems = '',
  }) {
    const roomName = formRoomName || room.name || '';
    const roomSummary = formRoomSummary || room.oneSentenceSummary || '';

    const connectedRoomSummary =
      currentDungeon.rooms.find(
        (r) => r.id === room.doorways[0].connectedRoomId,
      ).oneSentenceSummary || '';
    const prompt = generateSecretRoomPrompt(
      dungeonOverview,
      shortDescription,
      connectedRoomsInfo,
      connectedRoomSummary,
      roomName,
      roomSummary,
      npcString,
      currentDungeon.dimensions?.difficulty || null,
      formatRoomDoorways(currentDungeon, room),
      getRoomLoreName(currentDungeon, room.id),
      formatLoreLookupForPrompt(currentDungeon),
      incomingMentions,
      featuredItems,
    );
    //logger.log('Prompt:', prompt);
    const response = await generateGptResponse(
      prompt,
      validateSecretRoomResponse,
    );
    const roomDescription = JSON.parse(response);
    const contentArray = processSecretRoomResponse(roomDescription);
    return { roomDescription, contentArray };
  }

  // Locked Room Handler
  async function handleLockedRoom({
    room,
    currentDungeon,
    dungeonOverview,
    shortDescription,
    connectedRoomsInfo,
    // formRoomName / formRoomSummary intentionally not destructured —
    // the new locked-room prompt doesn't accept user-provided names
    // (locked-room identity is content-driven). Dispatcher may still
    // pass them; they're silently ignored.
    npcString = '',
    difficulty = null,
    doorwayInfo = null,
    loreRole = null,
    loreLookup = '',
    incomingMentions = '',
    featuredItems = '',
  }) {
    const prompt = generateLockedRoomPrompt(
      dungeonOverview,
      shortDescription,
      connectedRoomsInfo,
      npcString,
      difficulty,
      doorwayInfo,
      loreRole,
      loreLookup,
      incomingMentions,
      featuredItems,
    );
    //logger.log('Prompt:', prompt);
    const response = await generateGptResponse(
      prompt,
      validateLockedRoomResponse,
    );
    const roomDescription = JSON.parse(response);
    const contentArray = processLockedRoomResponse(roomDescription);

    // Generate the lock obstacle now, while we have the room's
    // freshly-generated contents to inform the obstacle's character.
    // Stored on the room as `lockObstacleContent`. Preceding rooms
    // surface this content via propagateLockObstacles when they
    // (re)render. Backfills already-generated preceding rooms below.
    const lockedRoomContentString = contentArrayToString(
      contentArray.filter(item => item.format !== 'read_aloud'),
    );
    // Find any already-generated preceding room to pull its content
    // for thematic context; the obstacle generation is one-shot per
    // locked room, so any preceding room's content is fine for context.
    const precedingRoom = currentDungeon.rooms.find((r) => {
      if (r.id === room.id) return false;
      if (r.roomType === 'locked') return false;
      if (!Array.isArray(r.doorways)) return false;
      return r.doorways.some(d => d.connectedRoomId === room.id);
    });
    const precedingContentString = precedingRoom?.contentArray
      ? contentArrayToString(
        precedingRoom.contentArray.filter(item => item.format !== 'read_aloud'),
      )
      : '';
    // Temporarily stash the freshly-generated content on the room so
    // the obstacle handler can read it (the dispatcher writes
    // room.contentArray after this handler returns, so we make it
    // available now).
    room.contentArray = contentArray;
    await handleLockObstacle({
      lockedRoom: room,
      precedingRoomContentString: precedingContentString,
      currentDungeon,
      dungeonOverview,
    });
    // Backfill any preceding rooms that already have contentArrays
    // — append the new obstacle to them so their next render shows
    // it without needing to be regenerated.
    if (room.lockObstacleContent) {
      for (const otherRoom of currentDungeon.rooms) {
        if (otherRoom.id === room.id) continue;
        if (otherRoom.roomType === 'locked') continue;
        if (!Array.isArray(otherRoom.contentArray) || otherRoom.contentArray.length === 0) continue;
        const connectsToThisLocked = (otherRoom.doorways || []).some(
          d => d.connectedRoomId === room.id,
        );
        if (!connectsToThisLocked) continue;
        // Avoid duplicating if it's already there (compare first
        // paragraph string — sufficient since obstacle content is
        // stable per locked room).
        const firstObstaclePara = room.lockObstacleContent[0]?.content;
        const alreadyPresent = otherRoom.contentArray.some(
          item => item.format === 'paragraph' && item.content === firstObstaclePara,
        );
        if (!alreadyPresent) {
          otherRoom.contentArray.push(...room.lockObstacleContent);
        }
      }
    }

    return { roomDescription, contentArray };
  }

  // Living Room Handler
  async function handleLivingRoom({
    room,
    currentDungeon,
    dungeonOverview,
    shortDescription,
    connectedRoomsInfo,
    npcString = '',
    difficulty = null,
    doorwayInfo = null,
    loreRole = null,
    loreLookup = '',
    incomingMentions = '',
    featuredItems = '',
  }) {
    const existingRooms = currentDungeon.roomNames.join(', ');
    const prompt = generateLivingRoomPrompt(
      dungeonOverview,
      shortDescription,
      existingRooms,
      connectedRoomsInfo,
      npcString,
      difficulty,
      doorwayInfo,
      loreRole,
      loreLookup,
      incomingMentions,
      featuredItems,
    );
    //logger.log('Prompt:', prompt);
    const response = await generateGptResponse(
      prompt,
      validateLivingRoomResponse,
    );
    const roomDescription = JSON.parse(response);
    const contentArray = processLivingRoomResponse(roomDescription);
    return { roomDescription, contentArray };
  }

  // Connecting Room Handler
  async function handleConnectingRoom({
    room,
    currentDungeon,
    dungeonOverview,
    shortDescription,
    connectedRoomsInfo,
    npcString = '',
    difficulty = null,
    doorwayInfo = null,
    loreRole = null,
    loreLookup = '',
    incomingMentions = '',
    featuredItems = '',
  }) {
    const existingRooms = currentDungeon.roomNames.join(', ');
    const prompt = generateConnectingRoomPrompt(
      dungeonOverview,
      shortDescription,
      existingRooms,
      connectedRoomsInfo,
      npcString,
      difficulty,
      doorwayInfo,
      loreRole,
      loreLookup,
      incomingMentions,
      featuredItems,
    );
    //logger.log('Prompt:', prompt);
    const response = await generateGptResponse(
      prompt,
      validateConnectingRoomResponse,
    );
    const roomDescription = JSON.parse(response);
    const contentArray = processConnectingRoomResponse(roomDescription);
    return { roomDescription, contentArray };
  }

  // Purpose Room Handler
  async function handlePurposeRoom({
    room,
    currentDungeon,
    dungeonOverview,
    shortDescription,
    connectedRoomsInfo,
    npcString = '',
    difficulty = null,
    doorwayInfo = null,
    loreRole = null,
    loreLookup = '',
    incomingMentions = '',
    featuredItems = '',
  }) {
    const existingRooms = currentDungeon.roomNames.join(', ');
    const prompt = generatePurposeRoomPrompt(
      dungeonOverview,
      shortDescription,
      existingRooms,
      connectedRoomsInfo,
      npcString,
      difficulty,
      doorwayInfo,
      loreRole,
      loreLookup,
      incomingMentions,
      featuredItems,
    );
    //logger.log('Prompt:', prompt);
    const response = await generateGptResponse(
      prompt,
      validatePurposeRoomResponse,
    );
    const roomDescription = JSON.parse(response);
    const contentArray = processPurposeRoomResponse(roomDescription);
    return { roomDescription, contentArray };
  }

  // **Handler for Lock Obstacles**
  //
  // Generates the **The [Obstacle Name].** sub-block describing how
  // the party defeats the lock that gates a `locked`-type room. The
  // result is stored on the LOCKED room as `lockObstacleContent` (an
  // array of paragraph content items), then surfaced in any preceding
  // room's contentArray via `propagateLockObstacles` whenever those
  // preceding rooms render.
  //
  // Runs at most once per locked room — once `lockObstacleContent`
  // is populated, the obstacle is reused for every preceding room
  // that connects to this locked room.
  async function handleLockObstacle({
    lockedRoom,
    precedingRoomContentString,
    currentDungeon,
    dungeonOverview,
  }) {
    if (lockedRoom.lockObstacleContent) {
      return lockedRoom.lockObstacleContent;
    }

    const lockedRoomContentString = lockedRoom.contentArray
      ? contentArrayToString(
        lockedRoom.contentArray.filter(item => item.format !== 'read_aloud'),
      )
      : '';

    const prompt = generateLockObstaclePrompt(
      dungeonOverview,
      precedingRoomContentString || '',
      lockedRoomContentString,
      lockedRoom.name || '',
      currentDungeon.dimensions?.difficulty || null,
      formatLoreLookupForPrompt(currentDungeon),
    );

    let response;
    try {
      response = await generateGptResponse(prompt, validateLockObstacleResponse);
    } catch (err) {
      logger.error('Lock obstacle generation failed:', err);
      return null;
    }

    if (!validateLockObstacleResponse(response)) {
      logger.error('Lock obstacle response validation failed');
      return null;
    }

    const data = JSON.parse(response);
    const obstacleContent = processLockObstacleResponse(data);
    // Persist on the locked room so subsequent preceding-room
    // renderings can pick it up without re-generating.
    lockedRoom.lockObstacleContent = obstacleContent;
    return obstacleContent;
  }

  /**
   * Propagate lock-obstacle content from connected locked rooms into
   * this room's contentArray. Called after a non-locked room is
   * generated so that the party encounters the obstacle's mechanics
   * in the room they're standing in, before crossing into the locked
   * chamber.
   *
   * Mutates `contentArray` in place — appends one block of paragraph
   * items per connected locked room with prepared `lockObstacleContent`.
   * Skips locked rooms whose obstacles haven't been generated yet
   * (they'll be backfilled when the locked room is generated).
   */
  async function propagateLockObstacles({
    room,
    currentDungeon,
    dungeonOverview,
    contentArray,
  }) {
    if (!room.doorways || room.doorways.length === 0) return;

    // Skip propagation entirely when the SOURCE room is a structural
    // obstacle room. Its dungeon-obstacle prompt already describes the
    // gating door fully (the "Rust-Sealed Door" sub-block, etc.), so
    // generating a pickable-lock sub-block on top would double-write
    // and contradict — describing the same door as both a corroded
    // iron-stud crust AND a milky-ice padlock.
    if (room.requiresKey) return;

    for (const doorway of room.doorways) {
      // Trigger on DOORWAY type, not the connected room's roomType.
      // Any locked-door doorway needs the lock mechanic described —
      // even when the room behind it isn't a `locked`-type room (it
      // could be a living room, a connecting passage, etc., that
      // simply has its access gated by a lock).
      if ((doorway.type || '').toLowerCase() !== 'locked-door') continue;

      const connectedRoom = currentDungeon.rooms.find(
        r => r.id === doorway.connectedRoomId,
      );
      if (!connectedRoom) continue;

      // Skip requiresKey rooms — those are structural dividers, and
      // their full obstacle is described in the obstacle room itself
      // (handled by dungeon-obstacle.mjs). Adding a pickable-lock
      // obstacle here would contradict the structural-obstacle
      // description.
      if (connectedRoom.requiresKey) continue;

      // Generate the obstacle on demand if it doesn't exist yet —
      // this happens when the preceding room is being generated
      // before the connected room.
      if (!connectedRoom.lockObstacleContent) {
        const precedingContentString = contentArrayToString(
          contentArray.filter(item => item.format !== 'read_aloud'),
        );
        await handleLockObstacle({
          lockedRoom: connectedRoom,
          precedingRoomContentString: precedingContentString,
          currentDungeon,
          dungeonOverview,
        });
      }

      if (connectedRoom.lockObstacleContent) {
        contentArray.push(...connectedRoom.lockObstacleContent);
      }
    }
  }

  // **Handler for Secret Doors**
  async function handleSecretDoor({
    room,
    currentDungeon,
    dungeonOverview,
    connectedRoomsInfo,
    contentArray,
  }) {
    // Generate string from current room's contentArray, excluding read_aloud descriptions
    const currentRoomDescriptionString = contentArrayToString(
      contentArray.filter((item) => item.format !== 'read_aloud'),
    );

    // Get the content of the current room
    const currentRoomContentString = contentArrayToString(contentArray);

    // Find the secret doorway in the current room
    const secretDoorway = room.doorways.find(
      (doorway) => doorway.type.toLowerCase() === 'secret',
    );

    let secretRoomSummary = '';
    let secretRoomContentString = '';

    if (secretDoorway && secretDoorway.connectedRoomId) {
      // Find the connected secret room using its ID
      const secretRoom = currentDungeon.rooms.find(
        (r) => r.id === secretDoorway.connectedRoomId,
      );

      // If the secret room exists, get its one-sentence summary and contentArray
      if (secretRoom) {
        if (secretRoom.oneSentenceSummary) {
          secretRoomSummary = secretRoom.oneSentenceSummary;
        }

        if (secretRoom.contentArray && secretRoom.contentArray.length > 0) {
          secretRoomContentString = contentArrayToString(
            secretRoom.contentArray.filter(
              (item) => item.format !== 'read_aloud',
            ),
          );
        }
      }
    }

    const prompt = generateSecretDoorPrompt(
      dungeonOverview,
      currentRoomDescriptionString,
      connectedRoomsInfo,
      secretRoomSummary,
      currentRoomContentString,
      secretRoomContentString,
      // Discovery DC scales to tier (always hard relative to tier);
      // dimensions live on dungeon.dimensions.
      currentDungeon.dimensions?.difficulty || null,
      formatLoreLookupForPrompt(currentDungeon),
    );

    //logger.log('Secret Door Prompt:', prompt);

    // Get the response for the secret door generation
    const secretDoorResponse = await generateGptResponse(
      prompt,
      validateSecretDoorResponse,
    );

    // Validate and process the response if valid
    if (validateSecretDoorResponse(secretDoorResponse)) {
      const secretDoorData = JSON.parse(secretDoorResponse);
      const secretDoorContent = processSecretDoorResponse(secretDoorData);
      contentArray.push(...secretDoorContent);
    } else {
      logger.error('Secret door response validation failed.');
    }
  }

  async function handleObstacleRoom({
    room,
    currentDungeon,
    dungeonOverview,
    shortDescription,
    connectedRoomsInfo,
    formRoomName = '',
    formRoomSummary = '',
    npcString = '',
    difficulty = null,
    doorwayInfo = null,
    loreRole = null,
    loreLookup = '',
    incomingMentions = '',
    featuredItems = '',
  }) {
    // Find the key room
    const keyRoom = currentDungeon.rooms.find(
      (r) => r.id === room.hasKeyInRoomId,
    );

    let keyRoomDescriptionString = '';

    if (keyRoom && keyRoom.contentArray && keyRoom.contentArray.length > 0) {
      // Key room has been generated, use its description
      keyRoomDescriptionString = contentArrayToString(keyRoom.contentArray);
    } else {
      // Key room has not been generated or has no content
      //logger.log('Key room content not found, proceeding without it');
      // Proceed without the key room description
    }

    // Generate the obstacle prompt for the room
    const obstaclePrompt = generateObstaclePrompt(
      dungeonOverview,
      shortDescription,
      connectedRoomsInfo,
      room.hasKeyInRoomId,
      keyRoomDescriptionString, // Pass the key room description if available
      formRoomName,
      formRoomSummary,
      npcString,
      difficulty,
      doorwayInfo,
      loreRole,
      loreLookup,
      incomingMentions,
      featuredItems,
    );
    //logger.log('Obstacle Prompt:', obstaclePrompt);

    // Get the response and process it
    const obstacleResponse = await generateGptResponse(
      obstaclePrompt,
      validateObstacleResponse,
    );
    const roomDescription = JSON.parse(obstacleResponse);
    const contentArray = processObstacleResponse(roomDescription);

    // Return the obstacle room's description and content array
    return { roomDescription, contentArray };
  }

  async function handleKeyRoom({
    room,
    currentDungeon,
    dungeonOverview,
    shortDescription,
    connectedRoomsInfo,
    formRoomName = '',
    formRoomSummary = '',
    npcString = '',
    difficulty = null,
    doorwayInfo = null,
    loreRole = null,
    loreLookup = '',
    incomingMentions = '',
    featuredItems = '',
  }) {
    // Find the obstacle room
    const obstacleRoom = currentDungeon.rooms.find(
      (r) => r.id === room.hasKeyForRoomId,
    );

    if (!obstacleRoom) {
      logger.error('Obstacle room not found');
      return;
    }

    let obstacleString = '';

    // Check if the obstacle room has content
    if (obstacleRoom.contentArray && obstacleRoom.contentArray.length > 0) {
      // Obstacle room has content, use it
      obstacleString = contentArrayToString(obstacleRoom.contentArray);
    } else {
      // Obstacle room does not have content
      //logger.log('Obstacle room content not found, proceeding without it');
      // We can proceed without the obstacle description
    }

    // Now generate the key room description
    const keyPrompt = generateKeyRoomPrompt(
      dungeonOverview,
      shortDescription,
      obstacleString, // This may be an empty string if obstacle room content is not available
      formRoomName,
      formRoomSummary,
      npcString,
      difficulty,
      doorwayInfo,
      loreRole,
      loreLookup,
      connectedRoomsInfo,
      incomingMentions,
      featuredItems,
    );
    //logger.log('Key Room Prompt:', keyPrompt);

    const keyRoomResponse = await generateGptResponse(
      keyPrompt,
      validateKeyRoomResponse,
    );
    const roomDescription = JSON.parse(keyRoomResponse);
    const contentArray = processKeyRoomResponse(roomDescription);

    // Return the key room's description and content array
    return { roomDescription, contentArray };
  }

  // **Mapping Room Types to Handler Functions**
  const roomTypeHandlers = {
    boss: handleBossRoom,
    setback: handleSetbackRoom,
    secret: handleSecretRoom,
    locked: handleLockedRoom,
    purpose: handlePurposeRoom,
    living: handleLivingRoom,
    connecting: handleConnectingRoom,
    // Add other room types as needed
  };

  // **Main Function: Generate Room Description**
  async function generateRoomDescription(
    currentDungeon,
    selectedRoomId,
    formRoomName = '',
    formRoomSummary = '',
    npcData = null,
    roomTypeOptions = { setback: false, boss: false },
  ) {
    try {
      if (!currentDungeon || selectedRoomId === null) {
        logger.error('No room selected');
        return;
      }

      let room = currentDungeon.rooms.find(
        (room) => room.id === selectedRoomId,
      );

      if (!room) {
        logger.error('Selected room not found');
        return;
      }

      if (roomTypeOptions.setback) {
        room.roomType = 'setback';
      }
      if (roomTypeOptions.boss) {
        room.roomType = 'boss';
      }

      const isEntrance = selectedRoomId === 1;
      const dungeonOverview = dungeonOverviewToString(
        currentDungeon.dungeonOverview,
      );
      const shortDescription = room.shortDescription;

      // **Step 1: Get Connected Rooms' Summaries**
      const connectedRoomsSummaries = getConnectedRoomsSummaries(
        currentDungeon,
        room,
      );

      // **Step 2: Format the Summaries as a String**
      const connectedRoomsInfo = connectedRoomsSummaries
        .map(
          (cr) =>
            `"${cr.name}", "${cr.summary}" connected by a ${cr.connectionType} leading ${cr.direction}`,
        )
        .join(', ');

      let roomDescription = {};
      let contentArray = [];
      let npcString = '';
      if (npcData && npcData.name) {
        // Manually-selected NPC. Prefer `npc_string` (the canonical
        // formatted summary built by buildNPCString during full
        // generation) when present, but build from whatever fields
        // exist when it's not. Auto-generation was removed from the
        // room flow, so stub NPCs no longer get `npc_string`
        // populated automatically; some legacy "complete" NPCs may
        // also lack it. The same builder shape (newline-joined
        // sections) is what buildNPCString uses internally — keeping
        // this branch standalone avoids cross-module coupling.
        if (npcData.npc_string) {
          npcString = npcData.npc_string;
        } else {
          const parts = [npcData.name];
          if (npcData.short_description) {
            parts.push(npcData.short_description);
          }
          if (npcData.description_of_position) {
            parts.push(npcData.description_of_position);
          }
          if (npcData.current_location) {
            parts.push(npcData.current_location);
          }
          if (npcData.distinctive_features_or_mannerisms) {
            parts.push(npcData.distinctive_features_or_mannerisms);
          }
          if (npcData.character_secret) {
            parts.push(npcData.character_secret);
          }
          npcString = parts.join('\n');
        }
      } else {
        // No manual pick; fall back to auto-assigned NPCs from the
        // post-map NPC assignment pass. Returns empty string when no
        // NPCs are assigned to this room (rooms can validly have no
        // NPCs — the model handles that case fine).
        npcString = formatRoomNPCsForPrompt(currentDungeon, selectedRoomId);
      }
      // Append monster populations assigned to this room. Both NPCs
      // and monsters flow through the same `npcString` channel — the
      // room prompts treat the combined text as "inhabitants present
      // in this room." Each room prompt already incorporates NPCs;
      // monsters are formatted with explicit tier annotations so the
      // model treats them as populations, not as a single creature.
      const monsterString = formatRoomMonstersForPrompt(currentDungeon, selectedRoomId);
      if (monsterString) {
        npcString = npcString
          ? `${npcString}\n\n${monsterString}`
          : monsterString;
      }

      // **Step 3: Generate Prompt Based on Room Type and Inputs**

      // First, check for special room types
      if (isEntrance) {
        // Handle entrance room
        ({ roomDescription, contentArray } = await handleEntranceRoom({
          dungeonOverview,
          shortDescription,
          connectedRoomsInfo,
          // Authoritative door states from the map — separate from
          // connectedRoomsInfo (which filters by summary). The model
          // must read door_preamble states from THIS list, not invent
          // locks/bars/DCs that contradict the map.
          doorwayInfo: formatRoomDoorways(currentDungeon, room),
          formRoomName,
          formRoomSummary,
          npcString,
          // Entrance prompt scales DCs and failure severity to tier;
          // dimensions live on dungeon.dimensions, so pull from there.
          difficulty: currentDungeon.dimensions?.difficulty || null,
          // Lore assignments from the post-map coherence pass. The
          // entrance prompt uses loreRole to lean into the room's
          // named identity (if any) and loreLookup to resolve
          // navigation references to other named places.
          loreRole: getRoomLoreName(currentDungeon, room.id),
          loreLookup: formatLoreLookupForPrompt(currentDungeon),
          incomingMentions: formatIncomingMentionsForPrompt(room),
          featuredItems: formatRoomItemsForPrompt(currentDungeon, room.id),
        }));
      } else if (room.requiresKey) {
        ({ roomDescription, contentArray } = await handleObstacleRoom({
          room,
          currentDungeon,
          dungeonOverview,
          shortDescription,
          connectedRoomsInfo,
          formRoomName,
          formRoomSummary,
          npcString,
          difficulty: currentDungeon.dimensions?.difficulty || null,
          doorwayInfo: formatRoomDoorways(currentDungeon, room),
          loreRole: getRoomLoreName(currentDungeon, room.id),
          loreLookup: formatLoreLookupForPrompt(currentDungeon),
          incomingMentions: formatIncomingMentionsForPrompt(room),
          featuredItems: formatRoomItemsForPrompt(currentDungeon, room.id),
        }));
      } else if (room.hasKeyForRoomId) {
        ({ roomDescription, contentArray } = await handleKeyRoom({
          room,
          currentDungeon,
          dungeonOverview,
          shortDescription,
          connectedRoomsInfo,
          formRoomName,
          formRoomSummary,
          npcString,
          difficulty: currentDungeon.dimensions?.difficulty || null,
          doorwayInfo: formatRoomDoorways(currentDungeon, room),
          loreRole: getRoomLoreName(currentDungeon, room.id),
          loreLookup: formatLoreLookupForPrompt(currentDungeon),
          incomingMentions: formatIncomingMentionsForPrompt(room),
          featuredItems: formatRoomItemsForPrompt(currentDungeon, room.id),
        }));
      } else if (
        ['setback', 'locked', 'boss', 'secret'].includes(room.roomType)
      ) {
        // Use specific handler for these room types.
        const handler = roomTypeHandlers[room.roomType];
        // Boss-specific: surface the apex's statblock as strategy
        // context. Empty string for non-boss rooms or when the apex
        // has no statblock yet. The modal flow (in the caller) is
        // what prompts the user to generate the statblock first;
        // this helper only formats what's already there.
        const bossStatblock = room.roomType === 'boss'
          ? formatBossStatblockForPrompt(currentDungeon, room.id)
          : '';
        ({ roomDescription, contentArray } = await handler({
          room,
          currentDungeon,
          dungeonOverview,
          shortDescription,
          connectedRoomsInfo,
          formRoomName,
          formRoomSummary,
          npcString,
          difficulty: currentDungeon.dimensions?.difficulty || null,
          doorwayInfo: formatRoomDoorways(currentDungeon, room),
          loreRole: getRoomLoreName(currentDungeon, room.id),
          loreLookup: formatLoreLookupForPrompt(currentDungeon),
          incomingMentions: formatIncomingMentionsForPrompt(room),
          featuredItems: formatRoomItemsForPrompt(currentDungeon, room.id),
          bossStatblock,
        }));
      } else if (formRoomName || formRoomSummary) {
        // Use custom room prompt
        ({ roomDescription, contentArray } = await handleCustomRoom({
          dungeonOverview,
          shortDescription,
          connectedRoomsInfo,
          formRoomName,
          formRoomSummary,
          npcString,
          difficulty: currentDungeon.dimensions?.difficulty || null,
          doorwayInfo: formatRoomDoorways(currentDungeon, room),
          loreRole: getRoomLoreName(currentDungeon, room.id),
          loreLookup: formatLoreLookupForPrompt(currentDungeon),
          incomingMentions: formatIncomingMentionsForPrompt(room),
          featuredItems: formatRoomItemsForPrompt(currentDungeon, room.id),
        }));
      } else if (['purpose', 'living', 'connecting'].includes(room.roomType)) {
        // Use specific handlers for these room types without form inputs.
        const handler = roomTypeHandlers[room.roomType];
        ({ roomDescription, contentArray } = await handler({
          room,
          currentDungeon,
          dungeonOverview,
          shortDescription,
          connectedRoomsInfo,
          npcString,
          difficulty: currentDungeon.dimensions?.difficulty || null,
          doorwayInfo: formatRoomDoorways(currentDungeon, room),
          loreRole: getRoomLoreName(currentDungeon, room.id),
          loreLookup: formatLoreLookupForPrompt(currentDungeon),
          // Pass facts that have been established about this room by
          // other rooms that mentioned it. The destination prompt
          // honors these in its generation.
          incomingMentions: formatIncomingMentionsForPrompt(room),
          featuredItems: formatRoomItemsForPrompt(currentDungeon, room.id),
        }));
      } else {
        logger.error('Unknown room type:', room.roomType);
        return;
      }

      // **Update Room Details**
      // Re-find the room from the live `currentDungeon.rooms` array
      // before mutating. The `room` captured at the top of this
      // function (line ~1111) is the reference as-of-then; if anything
      // during the await chain (NPC generation, statblock generation,
      // post-map assignments) caused a fresh `dungeons.value` parse
      // — or any other replacement of the rooms array — the original
      // `room` is now detached from the live state. Mutating it would
      // succeed in memory but be invisible to saveDungeons, which
      // serializes the live `dungeons.value`. Falling back to the
      // original `room` reference preserves prior behavior when the
      // re-find can't locate the id (shouldn't happen, but defensive).
      const liveRoom = currentDungeon.rooms.find(r => r.id === selectedRoomId) || room;
      liveRoom.oneSentenceSummary = roomDescription.one_sentence_summary || '';
      liveRoom.name = roomDescription.name || `Room ${selectedRoomId}`;
      liveRoom.contentArray = contentArray;
      // Keep the local `room` pointing at the live object too so the
      // downstream propagation/secret-door/lock-obstacle code below
      // operates on the same reference.
      room = liveRoom;

      // **Propagate Room Mentions**
      // When a room establishes specific facts about adjacent rooms
      // (a creature seen there, an event in progress, a notable
      // feature) via the room_mentions output field, propagate those
      // facts to the target rooms' mentionsFromOthers lists. The
      // target rooms read these as ESTABLISHED FACTS when they
      // generate, ensuring cross-room consistency without forcing
      // vagueness in the generating prompt.
      propagateRoomMentions(currentDungeon, room, roomDescription);

      // **Handle Secret Doors**
      const hasSecretDoor = room.doorways.some(
        (doorway) => doorway.type.toLowerCase() === 'secret',
      );

      if (hasSecretDoor && room.roomType !== 'secret') {
        await handleSecretDoor({
          room,
          currentDungeon,
          dungeonOverview,
          connectedRoomsInfo,
          contentArray,
        });
      }

      // **Propagate Lock Obstacles**
      // When this room connects to any `locked`-type rooms, surface
      // the lock obstacle's mechanics (DC, bypass, failure consequence)
      // in this room's contentArray. The party encounters the lock
      // BEFORE entering the locked room, so the mechanics belong here
      // — parallel to how Secret Door notes get appended to the room
      // containing the secret doorway. Skipped when this IS the
      // locked room (the obstacle belongs in preceding rooms, not in
      // the chamber the party has already entered).
      if (room.roomType !== 'locked') {
        await propagateLockObstacles({
          room,
          currentDungeon,
          dungeonOverview,
          contentArray,
        });
      }

      // **Update Dungeon's Room Names**
      currentDungeon.roomNames =
        currentDungeon.rooms.map((room) => room.name).filter(Boolean) || [];
    } catch (error) {
      logger.error('Error generating room description:', error);
    }
  }

  return {
    generateRoomDescription,
  };
}
