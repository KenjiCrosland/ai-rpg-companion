import { currentDungeon } from './dungeon-state.mjs';
import { saveDungeons } from './dungeon-utils.mjs';
import { generateDungeon } from '../util/generate-dungeon.mjs';
import { addDungeonDetails } from '../util/dungeon-details.mjs';
import { createRoomDescriptions } from '../util/create-room-descriptions.mjs';
import { assignLoreLocations } from '../util/assign-lore-locations.mjs';
import { dungeonOverviewToString } from '../util/content-to-string.mjs';

export async function generateMap() {
  if (!currentDungeon.value) {
    console.error('No dungeon selected');
    return;
  }

  let dungeonRoomArray = generateDungeon();
  addDungeonDetails(dungeonRoomArray);

  const roomDescriptions = createRoomDescriptions(dungeonRoomArray);
  dungeonRoomArray.forEach((room, index) => {
    room.shortDescription = roomDescriptions[index + 1];
  });

  currentDungeon.value.rooms = dungeonRoomArray;
  currentDungeon.value.roomDescriptions = roomDescriptions;
  // Clear stale assignments from a previous map (in case this is a
  // re-generate); they'll be repopulated by the assignment call below.
  currentDungeon.value.loreAssignments = null;
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
      console.log('[lore-assignment] no overview prose available; skipping');
      return;
    }
    console.log('[lore-assignment] starting...');
    const assignments = await assignLoreLocations({
      dungeonOverview: overviewString,
      rooms: dungeonRoomArray,
    });

    if (!assignments) {
      console.warn(
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

    console.log(
      `[lore-assignment] complete: ${matched.length} matched, ${unassigned.length} unassigned`,
    );

    if (matched.length > 0) {
      console.log('[lore-assignment] matched:');
      matched
        .sort(([, a], [, b]) => a - b)
        .forEach(([loreName, areaId]) => {
          console.log(`  area ${areaId} ← "${loreName}"`);
        });
    }

    if (unassigned.length > 0) {
      console.log('[lore-assignment] unassigned (no compatible area):');
      unassigned.forEach((u) => {
        console.log(`  "${u.lore_name}" — ${u.reason}`);
      });
    }
  } catch (err) {
    // Non-fatal: the dungeon still works without assignments.
    console.error('[lore-assignment] threw:', err);
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
    console.error(`Room with ID ${roomId} not found`);
  }
}
