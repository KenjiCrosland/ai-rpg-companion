/**
 * generate-dungeon + dungeon-details integration tests
 *
 * Fuzz-style: run the full pipeline (generateDungeon → addDungeonDetails)
 * many times and assert design contracts hold on EVERY output. The
 * generator is RNG-based, so deterministic per-case tests would only
 * cover one path. Throwing hundreds of layouts at the invariants is
 * how we find the edge cases that manual verification misses.
 *
 * Invariants under test:
 *   1. Every room has a unique id and a valid roomType.
 *   2. Exactly one room is marked entrance, and it's at id 1.
 *   3. Doorways are well-formed: every doorway's connectedRoomId
 *      refers to an existing room, and that room has a matching
 *      back-edge doorway.
 *   4. Obstacle/key pairing is internally consistent: if a room has
 *      roomType 'obstacle' it must have requiresKey === true and
 *      hasKeyInRoomId pointing at a real key room; if a room has
 *      roomType 'key' it must have hasKeyForRoomId pointing at a
 *      real obstacle room; the two pointers must match.
 *   5. No orphan 'obstacle' stamps: requiresKey true ↔ roomType
 *      'obstacle' on at most one room each (the regression we're
 *      guarding against).
 *   6. The boss room (when assigned) is never the entrance.
 *   7. When the obstacle/key pair was established, the key room
 *      has no locked-door doorways (door-conversion fix).
 *   8. When the obstacle/key pair was established, the boss room
 *      is reachable from the entrance through the graph (treating
 *      locked-door edges as passable — the party has the key).
 *
 * If a future change breaks an invariant, the failure message
 * includes the run number and a dumped room array so the topology
 * is reproducible.
 */

import { generateDungeon } from '../util/generate-dungeon.mjs';
import { addDungeonDetails } from '../util/dungeon-details.mjs';

const FUZZ_RUNS = 100;

/**
 * Build a simple bidirectional graph from a room array. Edges are
 * tagged with their doorway type so the reachability check can
 * decide whether to treat them as passable.
 */
function buildGraph(rooms) {
  const graph = new Map();
  for (const room of rooms) {
    if (!room || room.id === undefined) continue;
    if (!graph.has(room.id)) graph.set(room.id, []);
    for (const doorway of room.doorways || []) {
      if (doorway?.connectedRoomId === undefined) continue;
      graph.get(room.id).push({
        to: doorway.connectedRoomId,
        type: doorway.type,
      });
    }
  }
  return graph;
}

/**
 * Reachability (BFS) treating locked-door edges as passable too —
 * the party with the key gets through. Used to assert the boss room
 * is reachable from the entrance.
 */
function isReachable(graph, fromId, toId) {
  if (fromId === toId) return true;
  const visited = new Set([fromId]);
  const queue = [fromId];
  while (queue.length > 0) {
    const current = queue.shift();
    const edges = graph.get(current) || [];
    for (const { to } of edges) {
      if (visited.has(to)) continue;
      if (to === toId) return true;
      visited.add(to);
      queue.push(to);
    }
  }
  return false;
}

/**
 * Produce a one-shot dungeon: random layout + dungeon-details applied.
 * Returns { rooms, pairEstablished }.
 */
function generate() {
  const rooms = generateDungeon();
  const result = addDungeonDetails(rooms);
  return { rooms, pairEstablished: result.obstacleKeyPairEstablished };
}

/**
 * Format a room dump for failure messages — just the structural
 * fields, no excess. Helps reproduce a failing layout.
 */
function dumpRooms(rooms) {
  return JSON.stringify(
    rooms.map(r => ({
      id: r.id,
      roomType: r.roomType,
      requiresKey: r.requiresKey,
      hasKeyForRoomId: r.hasKeyForRoomId,
      hasKeyInRoomId: r.hasKeyInRoomId,
      doorways: (r.doorways || []).map(d => ({
        side: d?.side,
        type: d?.type,
        to: d?.connectedRoomId,
        requiresKey: d?.requiresKey,
      })),
    })),
    null,
    2,
  );
}

/**
 * Wrap an invariant check. If `condition` is false, throws an Error
 * tagged with the run number, a human-readable message, and a dumped
 * room array so the failing topology is reproducible.
 */
function invariant(condition, run, message, rooms) {
  if (condition) return;
  throw new Error(
    `INVARIANT FAILED (run ${run}): ${message}\n\nRooms:\n${dumpRooms(rooms)}`,
  );
}

const VALID_ROOM_TYPES = new Set([
  'entrance', 'boss', 'obstacle', 'key', 'setback', 'purpose',
  'living', 'connecting', 'secret', 'locked',
]);

describe('generate-dungeon + dungeon-details (fuzz invariants)', () => {
  it(`upholds all design invariants across ${FUZZ_RUNS} random runs`, () => {
    for (let run = 0; run < FUZZ_RUNS; run++) {
      const { rooms, pairEstablished } = generate();

      // --- 1. Unique ids + valid roomType ---------------------------------
      const ids = new Set();
      for (const room of rooms) {
        invariant(room.id !== undefined, run, `room missing id`, rooms);
        invariant(!ids.has(room.id), run, `duplicate room id ${room.id}`, rooms);
        ids.add(room.id);
        if (room.roomType !== undefined && room.type !== 'merged') {
          invariant(
            VALID_ROOM_TYPES.has(room.roomType),
            run,
            `room ${room.id} has unknown roomType "${room.roomType}"`,
            rooms,
          );
        }
      }

      // --- 2. Exactly one entrance, at id 1 -------------------------------
      const entranceRooms = rooms.filter(r => r.roomType === 'entrance');
      invariant(entranceRooms.length === 1, run, `expected 1 entrance, got ${entranceRooms.length}`, rooms);
      invariant(entranceRooms[0].id === 1, run, `entrance id should be 1, got ${entranceRooms[0].id}`, rooms);

      // --- 3. Doorway integrity -------------------------------------------
      const roomById = new Map(rooms.map(r => [r.id, r]));
      for (const room of rooms) {
        for (const doorway of room.doorways || []) {
          if (!doorway) continue;
          const connectedRoom = roomById.get(doorway.connectedRoomId);
          invariant(
            connectedRoom !== undefined,
            run,
            `room ${room.id} doorway → ${doorway.connectedRoomId} but no such room`,
            rooms,
          );
          // Merged rooms have self-edges via internal sections; skip those.
          if (doorway.type === 'merged' && connectedRoom.id === room.id) continue;
          const backEdge = (connectedRoom.doorways || []).find(
            d => d && d.connectedRoomId === room.id,
          );
          invariant(
            backEdge !== undefined,
            run,
            `missing back-edge ${connectedRoom.id} → ${room.id}`,
            rooms,
          );
        }
      }

      // --- 4. Obstacle/key pairing consistency ----------------------------
      const obstacleRooms = rooms.filter(r => r.roomType === 'obstacle');
      const keyRooms = rooms.filter(r => r.roomType === 'key');
      invariant(obstacleRooms.length <= 1, run, `expected ≤1 obstacle, got ${obstacleRooms.length}`, rooms);
      invariant(keyRooms.length <= 1, run, `expected ≤1 key, got ${keyRooms.length}`, rooms);
      invariant(
        obstacleRooms.length === keyRooms.length,
        run,
        `obstacle/key count mismatch: ${obstacleRooms.length} obstacle vs ${keyRooms.length} key`,
        rooms,
      );
      if (obstacleRooms.length === 1) {
        const obstacleRoom = obstacleRooms[0];
        const keyRoom = keyRooms[0];
        invariant(
          obstacleRoom.hasKeyInRoomId === keyRoom.id,
          run,
          `obstacle.hasKeyInRoomId (${obstacleRoom.hasKeyInRoomId}) ≠ key.id (${keyRoom.id})`,
          rooms,
        );
        invariant(
          keyRoom.hasKeyForRoomId === obstacleRoom.id,
          run,
          `key.hasKeyForRoomId (${keyRoom.hasKeyForRoomId}) ≠ obstacle.id (${obstacleRoom.id})`,
          rooms,
        );
        invariant(obstacleRoom.requiresKey === true, run, `obstacle room ${obstacleRoom.id} missing requiresKey`, rooms);
        // The quest-gate may be on either a locked-door OR a secret
        // doorway — collectLockedDoors picks up both types as
        // candidates for the main locked door (a secret door whose
        // opening also requires a key, doubly-gated). Accept either.
        const questGate = (obstacleRoom.doorways || []).find(
          d => d && (d.type === 'locked-door' || d.type === 'secret') && d.requiresKey === true,
        );
        invariant(
          questGate !== undefined,
          run,
          `obstacle room ${obstacleRoom.id} has no quest-gate doorway (looked for locked-door or secret with requiresKey)`,
          rooms,
        );
      }

      // --- 5. No orphan obstacle stamps -----------------------------------
      for (const room of rooms) {
        if (room.requiresKey === true) {
          invariant(
            room.roomType === 'obstacle',
            run,
            `room ${room.id} has requiresKey but roomType is "${room.roomType}"`,
            rooms,
          );
          invariant(
            room.hasKeyInRoomId !== undefined,
            run,
            `room ${room.id} has requiresKey but no hasKeyInRoomId`,
            rooms,
          );
        }
        if (room.roomType === 'obstacle') {
          invariant(
            room.requiresKey === true,
            run,
            `room ${room.id} is 'obstacle' but missing requiresKey`,
            rooms,
          );
        }
      }

      // --- 6. Boss is never the entrance ----------------------------------
      const bossRooms = rooms.filter(r => r.roomType === 'boss');
      if (bossRooms.length > 0) {
        invariant(bossRooms.length === 1, run, `expected 1 boss, got ${bossRooms.length}`, rooms);
        invariant(bossRooms[0].id !== 1, run, `boss is the entrance`, rooms);
      }

      // --- 7. Key room has no locked-door doorways ------------------------
      if (pairEstablished && keyRooms.length === 1) {
        const keyRoom = keyRooms[0];
        const hasLocked = (keyRoom.doorways || []).some(d => d && d.type === 'locked-door');
        invariant(
          !hasLocked,
          run,
          `key room ${keyRoom.id} still has a locked door — door-conversion missed it`,
          rooms,
        );
      }

      // --- 8. Boss is reachable from entrance -----------------------------
      if (pairEstablished && bossRooms.length === 1) {
        const graph = buildGraph(rooms);
        const reachable = isReachable(graph, 1, bossRooms[0].id);
        invariant(reachable, run, `boss room ${bossRooms[0].id} unreachable from entrance`, rooms);
      }
    }
  });
});

describe('generate-dungeon + dungeon-details (regression cases)', () => {
  it('never produces a key room with locked-door doorways across many runs', () => {
    // Focused check on the exact bug surface: even if other invariants
    // were satisfied, the user's symptom was key rooms with locked
    // doors confusing the LLM. Spot-test this explicitly.
    let observed = 0;
    for (let run = 0; run < 50; run++) {
      const { rooms, pairEstablished } = generate();
      if (!pairEstablished) continue;
      observed++;
      const keyRoom = rooms.find(r => r.roomType === 'key');
      const hasLocked = (keyRoom?.doorways || []).some(
        d => d && d.type === 'locked-door',
      );
      expect(hasLocked).toBe(false);
    }
    // Sanity: we should have observed at least a few successful pair
    // runs across 50 attempts. If this fails, the generator is
    // producing nearly-no obstacle/key pairs — itself a regression.
    expect(observed).toBeGreaterThan(10);
  });

  it('boss is always at distance > 1 from entrance when the pair establishes', () => {
    // The original user-reported bug: boss adjacent to entrance via
    // a regular door. Even if the pair establishes, if the boss is
    // one step away from the entrance through an unlocked path, the
    // "boss past obstacle" invariant is broken. Assert distance > 1
    // through unlocked-only edges (so the party can't just walk past).
    function unlockedDistanceFromEntrance(rooms, targetId) {
      const roomById = new Map(rooms.map(r => [r.id, r]));
      const visited = new Set([1]);
      const queue = [{ id: 1, dist: 0 }];
      while (queue.length > 0) {
        const { id, dist } = queue.shift();
        if (id === targetId) return dist;
        const room = roomById.get(id);
        for (const doorway of room?.doorways || []) {
          if (!doorway) continue;
          // Only walk regular doors / corridors / stairs / merged
          // edges. Locked + secret block the party from this side.
          if (doorway.type === 'locked-door' || doorway.type === 'secret') continue;
          if (visited.has(doorway.connectedRoomId)) continue;
          visited.add(doorway.connectedRoomId);
          queue.push({ id: doorway.connectedRoomId, dist: dist + 1 });
        }
      }
      return Infinity; // unreachable via unlocked path
    }

    for (let run = 0; run < 50; run++) {
      const { rooms, pairEstablished } = generate();
      if (!pairEstablished) continue;
      const bossRoom = rooms.find(r => r.roomType === 'boss');
      if (!bossRoom) continue;
      const dist = unlockedDistanceFromEntrance(rooms, bossRoom.id);
      // Boss must require crossing the quest-gate. Infinity (the
      // unlocked path doesn't reach the boss) is the strongest pass.
      // Distance > 1 catches the original bug shape (boss adjacent
      // to entrance via plain door).
      expect(dist).toBeGreaterThan(1);
    }
  });
});
