import { currentDungeon, isAssigningMapContext } from './dungeon-state.mjs';
import { saveDungeons } from './dungeon-utils.mjs';
import { generateDungeon } from '../util/generate-dungeon.mjs';
import { addDungeonDetails } from '../util/dungeon-details.mjs';
import { createRoomDescriptions } from '../util/create-room-descriptions.mjs';
import { assignLoreLocations } from '../util/assign-lore-locations.mjs';
import { assignNPCs } from '../util/assign-npcs.mjs';
import { assignMonsters } from '../util/assign-monsters.mjs';
import { assignItems } from '../util/assign-items.mjs';
import { dungeonOverviewToString } from '../util/content-to-string.mjs';
import { getReferencesForEntity } from '@/util/reference-storage.mjs';
import { getAllItems } from '@/util/item-storage.mjs';
import { logger } from '@/util/logger.mjs';

export async function generateMap() {
  if (!currentDungeon.value) {
    logger.error('No dungeon selected');
    return;
  }

  // Mark the assignment phase as in-flight so the UI can overlay a
  // blocking skeleton over the map. Cleared in `finally` below so an
  // early-return (skip log) or throw from any of the four assignment
  // blocks still drops the flag. The synchronous map generation just
  // above runs fast enough that the overlay reads as "post-render
  // background work" rather than a stand-in for the map itself.
  isAssigningMapContext.value = true;
  try {

  // The obstacle/key pair is a design invariant — the boss should
  // always be on the far side of an obstacle the party must solve.
  // Some procedural layouts can't accommodate it (tight branching,
  // every viable key candidate sits behind a different locked door),
  // so retry up to MAX_PROCGEN_ATTEMPTS times: re-roll the layout
  // entirely. After the final attempt, accept whatever came back —
  // an obstacle-less dungeon is still playable, and we don't want an
  // infinite loop on genuinely impossible map shapes.
  const MAX_PROCGEN_ATTEMPTS = 3;
  let dungeonRoomArray;
  let pairEstablished = false;
  for (let attempt = 1; attempt <= MAX_PROCGEN_ATTEMPTS; attempt++) {
    dungeonRoomArray = generateDungeon();
    const result = addDungeonDetails(dungeonRoomArray);
    pairEstablished = !!result?.obstacleKeyPairEstablished;
    if (pairEstablished) {
      if (attempt > 1) {
        logger.log(`[procgen] obstacle/key pair established on attempt ${attempt}`);
      }
      break;
    }
    if (attempt < MAX_PROCGEN_ATTEMPTS) {
      logger.log(`[procgen] obstacle/key pair failed on attempt ${attempt}; regenerating`);
    } else {
      logger.warn(
        `[procgen] obstacle/key pair could not be established after ${MAX_PROCGEN_ATTEMPTS} attempts; accepting last layout`,
      );
    }
  }

  const roomDescriptions = createRoomDescriptions(dungeonRoomArray);
  // Key by room.id, not by array index. `createRoomDescriptions`
  // returns a `{ [roomId]: description }` object; indexing it by
  // array position is only correct when ids happen to be 1..N
  // matching array order — which is the current procgen invariant
  // but a fragile coupling. If a future change produces non-
  // sequential ids (deletion, manual edit, partial regenerate),
  // index-based lookup silently mis-assigns descriptions to wrong
  // rooms; id-based lookup stays correct regardless.
  dungeonRoomArray.forEach((room) => {
    room.shortDescription = roomDescriptions[room.id];
  });

  currentDungeon.value.rooms = dungeonRoomArray;
  currentDungeon.value.roomDescriptions = roomDescriptions;
  // Clear stale assignments from a previous map (in case this is a
  // re-generate); they'll be repopulated by the assignment calls below.
  currentDungeon.value.loreAssignments = null;
  currentDungeon.value.npcAssignments = null;
  currentDungeon.value.monsterAssignments = null;
  currentDungeon.value.itemAssignments = null;
  saveDungeons();

  // Lore-location assignment: cross-reference layer that lets room
  // prompts resolve named places from the overview ("the inner
  // chamber") to specific area numbers on this map. Runs after the
  // map is saved so a failure here doesn't lose the map itself. The
  // prompt-side CROSS-REFERENCE FIDELITY rule continues to apply as
  // a fallback when assignments are absent.
  try {
    const overviewString = dungeonOverviewToString(
      currentDungeon.value.dungeonOverview,
    );
    if (!overviewString) {
      logger.log('[lore-assignment] no overview prose available; skipping');
      return;
    }
    logger.log('[lore-assignment] starting...');
    const assignments = await assignLoreLocations({
      dungeonOverview: overviewString,
      rooms: dungeonRoomArray,
    });

    if (!assignments) {
      logger.warn(
        '[lore-assignment] returned null; falling back to prompt-side cross-reference rule',
      );
      return;
    }

    currentDungeon.value.loreAssignments = assignments;
    saveDungeons();

    // Console log the result so the user can see what changed. The
    // assignments propagate downstream to every room prompt; visible
    // feedback lets the user check whether the LLM matched the
    // overview's lore-locations sensibly.
    const matched = Object.entries(assignments.lore_to_rooms);
    const unassigned = assignments.unassigned || [];

    logger.log(
      `[lore-assignment] complete: ${matched.length} matched, ${unassigned.length} unassigned`,
    );

    if (matched.length > 0) {
      logger.log('[lore-assignment] matched:');
      matched
        .sort(([, a], [, b]) => a - b)
        .forEach(([loreName, areaId]) => {
          logger.log(`  area ${areaId} ← "${loreName}"`);
        });
    }

    if (unassigned.length > 0) {
      logger.log('[lore-assignment] unassigned (no compatible area):');
      unassigned.forEach((u) => {
        logger.log(`  "${u.lore_name}" — ${u.reason}`);
      });
    }
  } catch (err) {
    // Non-fatal: the dungeon still works without assignments.
    logger.error('[lore-assignment] threw:', err);
  }

  // NPC assignment: places existing dungeon.npcs[] entries onto
  // specific rooms based on their roles. Runs AFTER lore-assignment
  // so the LLM can use lore-location placements as additional
  // signal ("the Warden lives in the scriptorium, which is area 12").
  // Non-fatal — if the call fails, room generation falls back to the
  // manual-NPC-pick flow via the form.
  try {
    if (!Array.isArray(currentDungeon.value.npcs) || currentDungeon.value.npcs.length === 0) {
      logger.log('[npc-assignment] no NPCs to assign; skipping');
      return;
    }
    const overviewString = dungeonOverviewToString(
      currentDungeon.value.dungeonOverview,
    );
    logger.log('[npc-assignment] starting...');
    const npcAssignments = await assignNPCs({
      dungeonOverview: overviewString,
      rooms: dungeonRoomArray,
      npcs: currentDungeon.value.npcs,
      loreAssignments: currentDungeon.value.loreAssignments,
    });

    if (!npcAssignments) {
      logger.warn('[npc-assignment] returned null; rooms will only show NPCs when manually picked');
      return;
    }

    currentDungeon.value.npcAssignments = npcAssignments;
    saveDungeons();

    const matched = Object.entries(npcAssignments.npc_id_to_room);
    const unassignedNPCs = npcAssignments.unassigned || [];

    logger.log(
      `[npc-assignment] complete: ${matched.length} placed, ${unassignedNPCs.length} unassigned`,
    );

    if (matched.length > 0) {
      logger.log('[npc-assignment] placed:');
      // Build a name lookup for clearer log output (npc_ids alone
      // aren't human-scannable).
      const nameLookup = Object.fromEntries(
        currentDungeon.value.npcs.map((n) => [n.npc_id, n.name]),
      );
      matched
        .sort(([, a], [, b]) => a - b)
        .forEach(([npcId, areaId]) => {
          logger.log(`  area ${areaId} ← ${nameLookup[npcId] || npcId}`);
        });
    }

    if (unassignedNPCs.length > 0) {
      logger.log('[npc-assignment] unassigned (not present in the dungeon):');
      unassignedNPCs.forEach((u) => {
        logger.log(`  "${u.npc_name || u.npc_id}" — ${u.reason}`);
      });
    }
  } catch (err) {
    logger.error('[npc-assignment] threw:', err);
  }

  // Monster assignment: places dungeon.monsters[] populations onto
  // specific rooms based on their tier (apex / strong_minion / minion).
  // Runs AFTER NPC assignment so the LLM can avoid double-placing
  // (no apex in a boss room that already has a named NPC; no hostile
  // monsters where a captive NPC is hiding). Non-fatal — the dungeon
  // still runs without monster placements; rooms just won't surface
  // creature presence in their generation context.
  try {
    if (!Array.isArray(currentDungeon.value.monsters) || currentDungeon.value.monsters.length === 0) {
      logger.log('[monster-assignment] no monsters to assign; skipping');
      return;
    }
    const overviewString = dungeonOverviewToString(
      currentDungeon.value.dungeonOverview,
    );
    logger.log('[monster-assignment] starting...');
    const monsterAssignments = await assignMonsters({
      dungeonOverview: overviewString,
      rooms: dungeonRoomArray,
      monsters: currentDungeon.value.monsters,
      npcs: currentDungeon.value.npcs || [],
      npcAssignments: currentDungeon.value.npcAssignments,
      loreAssignments: currentDungeon.value.loreAssignments,
    });

    if (!monsterAssignments) {
      logger.warn('[monster-assignment] returned null; rooms will not surface monster populations');
      return;
    }

    currentDungeon.value.monsterAssignments = monsterAssignments;
    saveDungeons();

    const matched = Object.entries(monsterAssignments.monster_id_to_rooms);
    const unassignedMonsters = monsterAssignments.unassigned || [];

    logger.log(
      `[monster-assignment] complete: ${matched.length} placed, ${unassignedMonsters.length} unassigned`,
    );

    if (matched.length > 0) {
      logger.log('[monster-assignment] placed:');
      const nameLookup = Object.fromEntries(
        currentDungeon.value.monsters.map(m => [m.id, m.name]),
      );
      const tierLookup = Object.fromEntries(
        currentDungeon.value.monsters.map(m => [m.id, m.type]),
      );
      matched.forEach(([monsterId, areaIds]) => {
        const name = nameLookup[monsterId] || monsterId;
        const tier = tierLookup[monsterId] || 'unknown';
        logger.log(`  ${name} [${tier}] → areas [${areaIds.join(', ')}]`);
      });
    }

    if (unassignedMonsters.length > 0) {
      logger.log('[monster-assignment] unassigned:');
      unassignedMonsters.forEach((u) => {
        logger.log(`  "${u.monster_name || u.monster_id}" — ${u.reason}`);
      });
    }
  } catch (err) {
    logger.error('[monster-assignment] threw:', err);
  }

  // Item assignment: places items linked to this dungeon via
  // `inspired_by_item` edges in the cross-tool reference graph onto
  // specific rooms. Runs LAST so the LLM can use all prior context
  // (lore, NPCs, monsters) to pick a thematically-appropriate room.
  // Non-fatal — without placements, room prompts simply don't surface
  // the item, and the boss-room loot section may invent a generic prize.
  try {
    const dungeonId = currentDungeon.value.id;
    const refs = dungeonId
      ? getReferencesForEntity('dungeon', dungeonId).filter(
        r => r.relationship === 'inspired_by_item',
      )
      : [];
    if (refs.length === 0) {
      logger.log('[item-assignment] no inspired_by_item edges; skipping');
      return;
    }
    const allItems = getAllItems();
    const linkedItems = refs
      .map((r) => {
        const itemName = r.target_type === 'item' ? r.target_id : r.source_id;
        return allItems.find(i => i?.name === itemName);
      })
      .filter(Boolean);
    if (linkedItems.length === 0) {
      logger.log('[item-assignment] no resolvable items behind edges; skipping');
      return;
    }
    const overviewString = dungeonOverviewToString(
      currentDungeon.value.dungeonOverview,
    );
    if (!overviewString) {
      logger.log('[item-assignment] no overview prose available; skipping');
      return;
    }
    logger.log('[item-assignment] starting...');
    const itemAssignments = await assignItems({
      dungeonOverview: overviewString,
      rooms: dungeonRoomArray,
      items: linkedItems,
    });

    if (!itemAssignments) {
      logger.warn('[item-assignment] returned null; rooms will not surface featured items');
      return;
    }

    currentDungeon.value.itemAssignments = itemAssignments;
    saveDungeons();

    const matched = Object.entries(itemAssignments.item_name_to_room);
    const unassignedItems = itemAssignments.unassigned || [];

    logger.log(
      `[item-assignment] complete: ${matched.length} placed, ${unassignedItems.length} unassigned`,
    );

    if (matched.length > 0) {
      logger.log('[item-assignment] placed:');
      matched.forEach(([itemName, areaId]) => {
        logger.log(`  "${itemName}" → area ${areaId}`);
      });
    }

    if (unassignedItems.length > 0) {
      logger.log('[item-assignment] unassigned:');
      unassignedItems.forEach((u) => {
        logger.log(`  "${u.item_name}" — ${u.reason}`);
      });
    }
  } catch (err) {
    logger.error('[item-assignment] threw:', err);
  }

  } finally {
    isAssigningMapContext.value = false;
  }
}

export function handleUpdateRoomDescription({ roomId, contentArray, name }) {
  if (!currentDungeon.value) return;

  const room = currentDungeon.value.rooms.find((r) => r.id === roomId);
  if (room) {
    room.contentArray = contentArray;
    room.name = name;
    currentDungeon.value.roomNames =
      currentDungeon.value.rooms.map((r) => r.name).filter(Boolean) || [];
    saveDungeons();
  } else {
    logger.error(`Room with ID ${roomId} not found`);
  }
}
