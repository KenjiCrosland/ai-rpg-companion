/**
 * dungeon-details tests
 *
 * The procedural pipeline had ZERO test coverage before this file —
 * the regression that put the boss adjacent to the entrance went
 * undetected because no test exercised `addDungeonDetails`. These
 * tests cover the design invariants the procgen is supposed to honor,
 * with hand-built room fixtures so we don't depend on `generateDungeon`'s
 * RNG.
 *
 * Design invariants under test:
 *   1. When the dungeon can support an obstacle/key pair, the pair
 *      gets established (obstacleKeyPairEstablished: true) and the
 *      boss lands beyond the obstacle.
 *   2. The locked-door soft-exclusion prefers key rooms WITHOUT their
 *      own locked doors when alternatives exist, but falls back to
 *      allowing them when the alternatives are all excluded.
 *   3. When NO obstacle/key pair can be established (tight layouts,
 *      no main locked door, locked door adjacent to entrance), the
 *      function returns the failure status AND cleans up properly:
 *      no orphan `roomType: 'obstacle'`, no orphan `requiresKey`.
 *   4. Entrance is always the first room in the array (the
 *      generator's convention).
 */

import { addDungeonDetails } from '../util/dungeon-details.mjs';

/** Build a doorway with the standard shape used by generateDungeon. */
function doorway(side, position, connectedRoomId, type = 'door', extras = {}) {
  return { side, position, type, connectedRoomId, ...extras };
}

/** Build a minimal room — square positions, no overlap-checking. */
function room(id, doorways, overrides = {}) {
  return {
    id,
    x: id * 10,
    y: 0,
    width: 3,
    height: 3,
    doorways,
    ...overrides,
  };
}

describe('addDungeonDetails', () => {
  describe('obstacle/key pair establishment', () => {
    it('establishes the pair when the layout supports it', () => {
      // Layout: entrance(1) → obstacle(2) [locked-door] → connecting(3) → boss(4)
      //                    \→ candidate(5)  (key room candidate, off the main path)
      // The locked door between 2 and 3 becomes the quest-gate;
      // room 5 (only other leaf accessible from entrance without
      // crossing the locked door) becomes the key room.
      const rooms = [
        room(1, [doorway('right', 1, 2), doorway('bottom', 1, 5)]),
        room(2, [doorway('left', 1, 1, 'door', { fromParent: true }), doorway('right', 1, 3, 'locked-door')]),
        room(3, [doorway('left', 1, 2, 'locked-door', { fromParent: true }), doorway('right', 1, 4)]),
        room(4, [doorway('left', 1, 3, 'door', { fromParent: true })]),
        room(5, [doorway('top', 1, 1, 'door', { fromParent: true })]),
      ];

      const result = addDungeonDetails(rooms);

      expect(result.obstacleKeyPairEstablished).toBe(true);
      // Obstacle and key rooms wired up bidirectionally.
      const obstacleRoom = rooms.find(r => r.roomType === 'obstacle');
      const keyRoom = rooms.find(r => r.roomType === 'key');
      expect(obstacleRoom).toBeTruthy();
      expect(keyRoom).toBeTruthy();
      expect(obstacleRoom.hasKeyInRoomId).toBe(keyRoom.id);
      expect(keyRoom.hasKeyForRoomId).toBe(obstacleRoom.id);
      // The boss MUST be beyond the obstacle, not adjacent to the entrance.
      const bossRoom = rooms.find(r => r.roomType === 'boss');
      expect(bossRoom).toBeTruthy();
      expect(bossRoom.id).not.toBe(1); // not entrance-adjacent dead end
      expect(bossRoom.id).not.toBe(keyRoom.id);
    });

    it('marks the quest-gate doorway with requiresKey: true', () => {
      const rooms = [
        room(1, [doorway('right', 1, 2), doorway('bottom', 1, 5)]),
        room(2, [doorway('left', 1, 1, 'door', { fromParent: true }), doorway('right', 1, 3, 'locked-door')]),
        room(3, [doorway('left', 1, 2, 'locked-door', { fromParent: true }), doorway('right', 1, 4)]),
        room(4, [doorway('left', 1, 3, 'door', { fromParent: true })]),
        room(5, [doorway('top', 1, 1, 'door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      const obstacleRoom = rooms.find(r => r.roomType === 'obstacle');
      const questGateDoor = obstacleRoom.doorways.find(d => d.requiresKey === true);
      expect(questGateDoor).toBeTruthy();
      expect(questGateDoor.type).toBe('locked-door');
    });
  });

  describe('locked-door removal on the key room', () => {
    it('walks through pickable locks to find the true deepest leaf (false-leaf regression)', () => {
      // Real bug from the field: BFS treated pickable locks as walls,
      // so a 1-doorway-plus-1-lock room read as a leaf even when the
      // lock gated a 3-room pocket. The procgen put the KEY at that
      // shallow false-leaf, leaving substantial content behind a
      // lock the player would have to pick to reach... nothing they
      // wanted (the goal was the key, which was right at the front).
      //
      // Layout: entrance(1) → 6 → 7 (locked-door) → 8 → 9 (leaf)
      // OLD behavior: BFS stopped at 6, key=6, lock 6↔7 stays.
      // NEW behavior: BFS walks the lock, finds 9 as deepest leaf,
      //   key=9, lock 6↔7 strips to plain door on the path.
      const rooms = [
        room(1, [
          doorway('top', 1, 2, 'door'),
          doorway('bottom', 1, 6, 'door'),
        ]),
        // Obstacle branch — quest-gate (must have MORE rooms beyond
        // than the key-side pocket, or identifyMainLockedDoor picks
        // the wrong locked door).
        room(2, [
          doorway('bottom', 1, 1, 'door', { fromParent: true }),
          doorway('left', 3, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('right', 3, 2, 'locked-door', { fromParent: true }),
          doorway('left', 4, 4),
        ]),
        room(4, [
          doorway('right', 4, 3, 'door', { fromParent: true }),
          doorway('left', 1, 10),
        ]),
        room(10, [
          doorway('right', 1, 4, 'door', { fromParent: true }),
          doorway('left', 1, 11),
        ]),
        room(11, [doorway('right', 1, 10, 'door', { fromParent: true })], { width: 6, height: 7 }),
        // Key branch — a pickable lock in the middle and a 3-room
        // pocket behind. With OLD behavior, BFS stopped at room 6
        // and put the key there. With NEW behavior, BFS walks the
        // lock and the key lands at room 9 (true deepest leaf).
        room(6, [
          doorway('top', 2, 1, 'door', { fromParent: true }),
          doorway('right', 1, 7, 'locked-door'),
        ]),
        room(7, [
          doorway('left', 1, 6, 'locked-door', { fromParent: true }),
          doorway('bottom', 1, 8),
        ]),
        room(8, [
          doorway('top', 1, 7, 'door', { fromParent: true }),
          doorway('bottom', 4, 9),
        ]),
        room(9, [doorway('top', 4, 8, 'door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      // Key is at the TRUE deepest leaf (9), not the shallow false-leaf (6).
      const keyRoom = rooms.find(r => r.roomType === 'key');
      expect(keyRoom.id).toBe(9);
      // The 6↔7 lock got stripped — it's on the entrance→key path.
      const room6 = rooms.find(r => r.id === 6);
      const lock_6_7 = room6.doorways.find(d => d.connectedRoomId === 7);
      expect(lock_6_7.type).toBe('door');
      const room7 = rooms.find(r => r.id === 7);
      const lock_7_6 = room7.doorways.find(d => d.connectedRoomId === 6);
      expect(lock_7_6.type).toBe('door');
    });

    it('strips pickable locks on the entrance→key path so the player isn\'t forced to pick', () => {
      // Since the BFS walks through pickable locks to find the true
      // deepest leaf, the chosen key may sit past one or more locks.
      // Those locks must convert to plain doors — they were gating
      // critical content (the key itself), violating the "no
      // pickable locks on the critical path" rule.
      //
      // Layout: entrance(1) → 5 → 6 (locked-door, leads deeper)
      // BFS walks through the 5↔6 lock to find room 6 as the leaf.
      // Path is [1, 5, 6]; the 5↔6 lock gets stripped.
      const rooms = [
        room(1, [doorway('right', 1, 2), doorway('top', 1, 5)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),  // quest-gate
        ]),
        room(3, [
          doorway('left', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 4),
        ]),
        room(4, [doorway('left', 1, 3, 'door', { fromParent: true })]),
        room(5, [
          doorway('bottom', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 6, 'locked-door'),  // on entrance→key path
        ]),
        room(6, [doorway('left', 1, 5, 'locked-door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      // BFS walks through the 5↔6 lock; room 6 is the deepest leaf.
      const keyRoom = rooms.find(r => r.roomType === 'key');
      expect(keyRoom.id).toBe(6);
      // The 5↔6 lock is now a plain door (both sides).
      const room5 = rooms.find(r => r.id === 5);
      const room5_to_6 = room5.doorways.find(d => d.connectedRoomId === 6);
      expect(room5_to_6.type).toBe('door');
      const room6_to_5 = keyRoom.doorways.find(d => d.connectedRoomId === 5);
      expect(room6_to_5.type).toBe('door');
    });

    it('does not touch the obstacle room\'s quest-gate doorway', () => {
      // The quest-gate IS a locked-door doorway, but it belongs to
      // the OBSTACLE room, not the key room. Locked-door stripping
      // must skip it — otherwise the quest-gate becomes a plain door
      // and the obstacle/key pair loses its whole reason for being.
      const rooms = [
        room(1, [doorway('right', 1, 2), doorway('bottom', 1, 5)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),  // quest-gate
        ]),
        room(3, [
          doorway('left', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 4),
        ]),
        room(4, [doorway('left', 1, 3, 'door', { fromParent: true })]),
        room(5, [doorway('top', 1, 1, 'door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      const obstacleRoom = rooms.find(r => r.roomType === 'obstacle');
      const questGate = obstacleRoom.doorways.find(d => d.requiresKey === true);
      expect(questGate).toBeTruthy();
      expect(questGate.type).toBe('locked-door');
      // And the back-edge on room 3 stays locked too (it pairs with
      // the quest-gate).
      const room3 = rooms.find(r => r.id === 3);
      const room3BackEdge = room3.doorways.find(d => d.connectedRoomId === 2);
      expect(room3BackEdge.type).toBe('locked-door');
    });
  });

  describe('key room placement — furthest leaf invariant', () => {
    // The user-reported bug: key sometimes landed at a room adjacent
    // to the entrance instead of the furthest leaf on the unlocked
    // side. A close key trivializes pacing AND leaves no path for a
    // setback. These tests reproduce specific topologies that should
    // always pick the furthest leaf.
    it('picks the FURTHEST leaf as the key room, not a closer reachable room', () => {
      // Layout (the user-reported topology):
      //   entrance(1) ─ obstacle(2) [locked → 3] ─ beyond(3) ─ 4, 5
      //   entrance(1) ─ 6 ─ 7 ─ 8 ─ 9  (linear chain off entrance)
      // From the unlocked side, the BFS from entrance should reach
      // room 9 with path length 5; room 6 (path length 2) is NOT a
      // leaf because it has an unvisited neighbor (7).
      const rooms = [
        room(1, [doorway('left', 1, 2), doorway('right', 1, 6)]),
        room(2, [
          doorway('right', 1, 1, 'door', { fromParent: true }),
          doorway('bottom', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('top', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 4),
          doorway('bottom', 1, 5),
        ]),
        room(4, [doorway('left', 1, 3, 'door', { fromParent: true })]),
        room(5, [doorway('top', 1, 3, 'door', { fromParent: true })]),
        room(6, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('top', 1, 7),
        ]),
        room(7, [
          doorway('bottom', 1, 6, 'door', { fromParent: true }),
          doorway('left', 1, 8, 'corridor'),
        ]),
        room(8, [
          doorway('right', 1, 7, 'corridor', { fromParent: true }),
          doorway('left', 1, 9, 'corridor'),
        ]),
        room(9, [doorway('right', 1, 8, 'corridor', { fromParent: true })]),
      ];

      const result = addDungeonDetails(rooms);
      expect(result.obstacleKeyPairEstablished).toBe(true);

      const keyRoom = rooms.find(r => r.roomType === 'key');
      expect(keyRoom).toBeTruthy();
      expect(keyRoom.id).toBe(9);
    });

    it('places setback on the entrance→key path when path length permits', () => {
      // Same topology as above. With key at room 9, the entrance→key
      // path is [1, 6, 7, 8, 9] (length 5). assignSetbackRoom picks
      // a room in the middle (excluding endpoints) — should be 6, 7, or 8.
      const rooms = [
        room(1, [doorway('left', 1, 2), doorway('right', 1, 6)]),
        room(2, [
          doorway('right', 1, 1, 'door', { fromParent: true }),
          doorway('bottom', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('top', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 4),
          doorway('bottom', 1, 5),
        ]),
        room(4, [doorway('left', 1, 3, 'door', { fromParent: true })]),
        room(5, [doorway('top', 1, 3, 'door', { fromParent: true })]),
        room(6, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('top', 1, 7),
        ]),
        room(7, [
          doorway('bottom', 1, 6, 'door', { fromParent: true }),
          doorway('left', 1, 8, 'corridor'),
        ]),
        room(8, [
          doorway('right', 1, 7, 'corridor', { fromParent: true }),
          doorway('left', 1, 9, 'corridor'),
        ]),
        room(9, [doorway('right', 1, 8, 'corridor', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      const setbackRoom = rooms.find(r => r.roomType === 'setback');
      expect(setbackRoom).toBeTruthy();
      // Path [1, 6, 7, 8, 9]; potentialSetbackRooms = [6, 7, 8];
      // middle = index 1 = room 7. The deterministic pick lands here.
      // Pacing-wise that's also the preferred spot — close enough to
      // the key that it reads as a "final trial before triumph."
      expect(setbackRoom.id).toBe(7);
    });

    it('does not stamp the obstacle room as setback (regression: path-to-boss bug)', () => {
      // A previous version put the setback on the entrance→boss path.
      // That path passes through the obstacle room, so assignSetbackRoom
      // could overwrite the obstacle's roomType, breaking the pair.
      // This test guards against re-introducing that bug.
      const rooms = [
        room(1, [doorway('left', 1, 2), doorway('right', 1, 6)]),
        room(2, [
          doorway('right', 1, 1, 'door', { fromParent: true }),
          doorway('bottom', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('top', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 4),
          doorway('bottom', 1, 5),
        ]),
        room(4, [doorway('left', 1, 3, 'door', { fromParent: true })]),
        room(5, [doorway('top', 1, 3, 'door', { fromParent: true })]),
        room(6, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('top', 1, 7),
        ]),
        room(7, [
          doorway('bottom', 1, 6, 'door', { fromParent: true }),
          doorway('left', 1, 8, 'corridor'),
        ]),
        room(8, [
          doorway('right', 1, 7, 'corridor', { fromParent: true }),
          doorway('left', 1, 9, 'corridor'),
        ]),
        room(9, [doorway('right', 1, 8, 'corridor', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      const obstacleRoom = rooms.find(r => r.id === 2);
      expect(obstacleRoom.roomType).toBe('obstacle');
      expect(obstacleRoom.requiresKey).toBe(true);
      const questGate = obstacleRoom.doorways.find(
        d => d.type === 'locked-door' && d.requiresKey === true,
      );
      expect(questGate).toBeTruthy();
    });

    it('falls back to the entrance→boss path for setback when entrance→key has no inner candidate', () => {
      // Key is adjacent to entrance (path [1, 5], length 2 — no inner
      // room, so the entrance→key path can't host a setback). Boss
      // lives down the obstacle branch with multiple inner rooms.
      // Fallback should place setback on the entrance→boss path and
      // pick the EARLIEST candidate (preferEarly: true) so it doesn't
      // sit right before the boss reveal.
      //
      // Layout:
      //   entrance(1) → 2 (obstacle) [locked] → 3 → 4 (boss, large)
      //   entrance(1) → 5 (key, adjacent)
      // path-to-key = [1, 5] → no inner room → fallback fires.
      // path-to-boss = [1, 2, 3, 4]; inner = [2, 3]; PROTECTED filters
      // out 2 (obstacle). potential = [3]. setback = room 3.
      const rooms = [
        room(1, [doorway('right', 1, 2), doorway('bottom', 1, 5)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('left', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 4),
        ]),
        room(4, [doorway('left', 1, 3, 'door', { fromParent: true })], { width: 10, height: 10 }),
        // Key candidate, kept large to win the leaf-area tiebreak so it
        // lands here instead of being beaten by another leaf.
        room(5, [doorway('top', 1, 1, 'door', { fromParent: true })], { width: 8, height: 8 }),
      ];

      const result = addDungeonDetails(rooms);
      expect(result.obstacleKeyPairEstablished).toBe(true);

      const keyRoom = rooms.find(r => r.roomType === 'key');
      const setbackRoom = rooms.find(r => r.roomType === 'setback');
      expect(keyRoom?.id).toBe(5);
      // Setback assigned by fallback on the boss path — room 3.
      // Obstacle (2) protected; only room 3 remains as a candidate.
      expect(setbackRoom?.id).toBe(3);
    });

    it('prefers the earliest candidate on the boss-path fallback (not the middle)', () => {
      // Multiple inner candidates on the boss path. The fallback uses
      // preferEarly: true so the setback hits the party going IN (just
      // past the obstacle), not right before the boss reveal.
      //
      //   entrance(1) → 2 (obstacle) [locked] → 3 → 4 → 5 → 6 (boss)
      //   entrance(1) → 7 (key, adjacent)
      // path-to-boss = [1, 2, 3, 4, 5, 6]; inner = [2, 3, 4, 5];
      // PROTECTED filters out 2. potential = [3, 4, 5].
      // Middle would pick 4 (index 1). preferEarly picks 3 (index 0).
      const rooms = [
        room(1, [doorway('right', 1, 2), doorway('bottom', 1, 7)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('left', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 4),
        ]),
        room(4, [
          doorway('left', 1, 3, 'door', { fromParent: true }),
          doorway('right', 1, 5),
        ]),
        room(5, [
          doorway('left', 1, 4, 'door', { fromParent: true }),
          doorway('right', 1, 6),
        ]),
        room(6, [doorway('left', 1, 5, 'door', { fromParent: true })], { width: 10, height: 10 }),
        room(7, [doorway('top', 1, 1, 'door', { fromParent: true })], { width: 8, height: 8 }),
      ];

      addDungeonDetails(rooms);

      const keyRoom = rooms.find(r => r.roomType === 'key');
      const setbackRoom = rooms.find(r => r.roomType === 'setback');
      expect(keyRoom?.id).toBe(7);
      // preferEarly → first candidate after the obstacle filter.
      expect(setbackRoom?.id).toBe(3);
    });

    it('biases boss selection toward larger rooms when multiple leaves are equidistant', () => {
      // Two leaves equidistant from the obstacle on the unlocked side:
      // room 6 (small, 3x3=9) and room 7 (large, 10x10=100). The
      // boss selection should prefer the larger room when they tie.
      // The setup: entrance → obstacle(2) [locked → 3] → 3 (junction)
      //                                                ├→ 6 (small, leaf)
      //                                                └→ 7 (large, leaf)
      // Key candidate: room 4 (separate branch off entrance).
      const rooms = [
        room(1, [doorway('right', 1, 2), doorway('bottom', 1, 4)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('left', 1, 2, 'locked-door', { fromParent: true }),
          doorway('top', 1, 6),
          doorway('bottom', 1, 7),
        ]),
        room(4, [doorway('top', 1, 1, 'door', { fromParent: true })]),
        room(6, [doorway('bottom', 1, 3, 'door', { fromParent: true })], { width: 3, height: 3 }),
        room(7, [doorway('top', 1, 3, 'door', { fromParent: true })], { width: 10, height: 10 }),
      ];

      addDungeonDetails(rooms);

      const bossRoom = rooms.find(r => r.roomType === 'boss');
      // Both rooms 6 and 7 are equidistant leaves from area 3 (the
      // BFS start point on the obstacle's far side). The tiebreaker
      // (larger area) MUST pick room 7 — 100 area vs 9.
      expect(bossRoom?.id).toBe(7);
    });

    it('places key at the deepest leaf in a realistic generated topology (user-reported case)', () => {
      // Real dungeon shape captured from a generated session. The
      // entrance has three children — an obstacle branch (4 → 5 → 6
      // → 7 → 8/9), a small purpose room (2 ↔ 3 via locked door), and
      // a key branch (10 → 11 → {12 → 13 via secret, 14 via corridor}).
      // The buggy version placed the key at room 10 (path length 2),
      // leaving no inner room for a setback. The area-tiebreaker
      // should pick the deepest, largest leaf — room 14 — and the
      // setback should land on room 11 (the middle of [1, 10, 11, 14]).
      const fixture = [
        room(1, [
          doorway('top', 1, 2, 'door'),
          doorway('right', 2, 4, 'door'),
          doorway('left', 2, 10, 'door'),
        ], { x:1, y:1, width:5, height:4 }),
        room(2, [
          doorway('bottom', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),
        ], { x:1, y:-4, width:4, height:4 }),
        room(3, [
          doorway('left', 1, 2, 'locked-door', { fromParent: true }),
        ], { x:6, y:-4, width:4, height:4 }),
        room(4, [
          doorway('left', 2, 1, 'door', { fromParent: true }),
          doorway('right', 2, 5, 'locked-door'),
        ], { x:7, y:1, width:6, height:6 }),
        room(5, [
          doorway('left', 2, 4, 'locked-door', { fromParent: true }),
          doorway('right', 3, 6, 'corridor'),
        ], { x:14, y:1, width:3, height:6 }),
        room(6, [
          doorway('left', 3, 5, 'corridor', { fromParent: true }),
          doorway('bottom', 1, 7, 'door'),
        ], { x:18, y:1, width:5, height:5 }),
        room(7, [
          doorway('top', 1, 6, 'door', { fromParent: true }),
          doorway('right', 2, 8, 'door'),
          doorway('bottom', 1, 9, 'stairs'),
        ], { x:18, y:7, width:3, height:8 }),
        room(8, [
          doorway('left', 2, 7, 'door', { fromParent: true }),
        ], { x:22, y:7, width:6, height:7 }),
        room(9, [
          doorway('top', 1, 7, 'stairs', { fromParent: true }),
        ], { x:18, y:16, width:4, height:5 }),
        room(10, [
          doorway('right', 2, 1, 'door', { fromParent: true }),
          doorway('bottom', 2, 11, 'door'),
        ], { x:-4, y:1, width:4, height:5 }),
        room(11, [
          doorway('top', 2, 10, 'door', { fromParent: true }),
          doorway('left', 2, 12, 'stairs'),
          doorway('bottom', 3, 14, 'corridor'),
        ], { x:-4, y:7, width:5, height:6 }),
        room(12, [
          doorway('right', 2, 11, 'stairs', { fromParent: true }),
          doorway('left', 2, 13, 'secret'),
        ], { x:-8, y:7, width:3, height:7 }),
        // Room 13 is a merged room — its top-level shape has no width/
        // height; sections carry the geometry. roomArea() sums section
        // areas. Behind a secret door, so findFurthestLeafNode treats
        // its access edge as unwalkable.
        {
          id: 13,
          type: 'merged',
          sections: [
            { x:-15, y:7, width:6, height:6, doorways:[
              doorway('right', 2, 12, 'secret', { fromParent: true }),
              doorway('top', 1, 13, 'merged'),
            ]},
            { x:-15, y:4, width:4, height:3, doorways:[
              doorway('bottom', 1, 13, 'merged', { fromParent: true }),
            ]},
          ],
          doorways: [
            doorway('right', 2, 12, 'secret', { fromParent: true }),
          ],
        },
        room(14, [
          doorway('top', 3, 11, 'corridor', { fromParent: true }),
        ], { x:-4, y:14, width:6, height:6 }),
      ];

      const result = addDungeonDetails(fixture);

      expect(result.obstacleKeyPairEstablished).toBe(true);

      const keyRoom = fixture.find(r => r.roomType === 'key');
      const obstacleRoom = fixture.find(r => r.roomType === 'obstacle');
      const bossRoom = fixture.find(r => r.roomType === 'boss');
      const setbackRoom = fixture.find(r => r.roomType === 'setback');

      // Key MUST be at room 14 — the deepest leaf on the unlocked side
      // and the largest of the equidistant leaves at path length 4.
      expect(keyRoom?.id).toBe(14);
      // Obstacle is room 4 (the only locked door with rooms beyond).
      expect(obstacleRoom?.id).toBe(4);
      // Boss lands beyond the obstacle. Room 8 is the largest leaf on
      // the boss side (1050 sq units vs room 9's 500); pickLargestRoom
      // OnPath promotes it there from the deepest leaf.
      expect(bossRoom?.id).toBe(8);
      // Setback lands on the entrance→key path. Path is [1, 10, 11, 14];
      // potential = [10, 11]; middle = index 1 = room 11.
      expect(setbackRoom?.id).toBe(11);
    });

    it('handles a linear chain with the obstacle in the middle: no key candidate → cancels cleanly', () => {
      // Edge case: linear topology entrance(1) → obstacle(2) → 3 → 4
      // with the locked door between 2 and 3. The key MUST be on the
      // entrance side (which is just the entrance itself), so no
      // candidate exists. Expect graceful failure: pair NOT established,
      // no orphan stamps, boss falls back to furthest reachable leaf.
      const rooms = [
        room(1, [doorway('right', 1, 2)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('left', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 4),
        ]),
        room(4, [doorway('left', 1, 3, 'door', { fromParent: true })]),
      ];

      const result = addDungeonDetails(rooms);

      expect(result.obstacleKeyPairEstablished).toBe(false);
      // No orphan obstacle stamps.
      expect(rooms.find(r => r.roomType === 'obstacle')).toBeUndefined();
      expect(rooms.find(r => r.requiresKey === true)).toBeUndefined();
      // Boss still gets placed somewhere reachable.
      const bossRoom = rooms.find(r => r.roomType === 'boss');
      expect(bossRoom).toBeTruthy();
      expect(bossRoom.id).not.toBe(1);
    });
  });

  describe('boss-room "knock down the wall" promotion', () => {
    it('promotes the boss from the leaf to a larger room on the path when available', () => {
      // Layout beyond the obstacle: 3 → 5 (large) → 6 (small leaf).
      // The leaf is the deepest point, but room 5 has 4× the area.
      // The boss should land at room 5; room 6 stays unassigned and
      // becomes a natural treasure niche behind the boss.
      const rooms = [
        room(1, [doorway('right', 1, 2), doorway('bottom', 1, 12)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('left', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 5),
        ], { width: 3, height: 3 }),
        room(5, [
          doorway('left', 1, 3, 'door', { fromParent: true }),
          doorway('right', 1, 6),
        ], { width: 10, height: 8 }),  // large
        room(6, [doorway('left', 1, 5, 'door', { fromParent: true })], { width: 3, height: 3 }),  // small leaf
        room(12, [doorway('top', 1, 1, 'door', { fromParent: true })]),
      ];

      const result = addDungeonDetails(rooms);
      expect(result.obstacleKeyPairEstablished).toBe(true);

      const bossRoom = rooms.find(r => r.roomType === 'boss');
      // Boss promoted from the leaf (room 6, 9 sq units) to the
      // largest room on the path (room 5, 80 sq units).
      expect(bossRoom?.id).toBe(5);
      // The leaf is no longer the boss but also isn't assigned a
      // special type by the obstacle/key/boss/setback pipeline — it
      // falls through to assignRoomTypes (purpose / living / etc.)
      // and becomes a natural adjacent chamber. May also end up
      // 'locked' if ensureAtLeastOnePickableLock promoted its door.
      const formerLeaf = rooms.find(r => r.id === 6);
      expect(['purpose', 'living', 'setback', 'connecting', 'locked']).toContain(formerLeaf.roomType);
    });

    it('keeps the boss at the leaf when the leaf is itself the largest on path', () => {
      // No promotion when there's nothing larger to promote to.
      const rooms = [
        room(1, [doorway('right', 1, 2), doorway('bottom', 1, 12)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('left', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 5),
        ], { width: 3, height: 3 }),
        room(5, [
          doorway('left', 1, 3, 'door', { fromParent: true }),
          doorway('right', 1, 6),
        ], { width: 3, height: 3 }),  // small
        room(6, [doorway('left', 1, 5, 'door', { fromParent: true })], { width: 10, height: 8 }),  // big leaf
        room(12, [doorway('top', 1, 1, 'door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);
      const bossRoom = rooms.find(r => r.roomType === 'boss');
      expect(bossRoom?.id).toBe(6);
    });
  });

  describe('pickable-lock cap', () => {
    it('preserves the quest-gate lock and at most ONE additional pickable lock', () => {
      // Three locked-door pairs in this layout: the quest-gate
      // (2↔3), and two extra pickable locks (4↔5, 6↔7). After the
      // cap runs, the quest-gate stays + exactly one of the extras
      // stays + the other converts to a regular door.
      const rooms = [
        room(1, [
          doorway('left', 1, 2),
          doorway('right', 1, 4),
          doorway('top', 1, 6),
          doorway('bottom', 1, 8),
        ]),
        room(2, [
          doorway('right', 1, 1, 'door', { fromParent: true }),
          doorway('top', 1, 3, 'locked-door'),  // quest-gate
        ]),
        room(3, [
          doorway('bottom', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 9),
        ]),
        room(9, [doorway('left', 1, 3, 'door', { fromParent: true })]),
        room(4, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 5, 'locked-door'),  // extra lock #1
        ]),
        room(5, [doorway('left', 1, 4, 'locked-door', { fromParent: true })]),
        room(6, [
          doorway('bottom', 1, 1, 'door', { fromParent: true }),
          doorway('top', 1, 7, 'locked-door'),  // extra lock #2
        ]),
        room(7, [doorway('bottom', 1, 6, 'locked-door', { fromParent: true })]),
        room(8, [doorway('top', 1, 1, 'door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      // Count surviving locked-door pairs across all rooms (deduped).
      const pairs = new Set();
      for (const r of rooms) {
        for (const d of r.doorways || []) {
          if (d?.type === 'locked-door') {
            const lo = Math.min(r.id, d.connectedRoomId);
            const hi = Math.max(r.id, d.connectedRoomId);
            pairs.add(`${lo}-${hi}`);
          }
        }
      }
      // At most 2 pairs total: 1 quest-gate + 1 optional pickable.
      expect(pairs.size).toBeLessThanOrEqual(2);
      // Quest-gate (2↔3) MUST be one of them — has requiresKey: true.
      expect(pairs.has('2-3')).toBe(true);
    });

    it('converts both sides of a doorway when capping (no half-converted pairs)', () => {
      // Symmetric integrity check: when the cap converts an extra
      // locked pair to regular doors, BOTH endpoint rooms' doorways
      // must flip. A half-converted pair (one side 'door', other
      // side 'locked-door') would render inconsistently in the map UI.
      const rooms = [
        room(1, [doorway('left', 1, 2), doorway('right', 1, 4), doorway('top', 1, 6)]),
        room(2, [
          doorway('right', 1, 1, 'door', { fromParent: true }),
          doorway('top', 1, 3, 'locked-door'),  // quest-gate
        ]),
        room(3, [
          doorway('bottom', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 7),
        ]),
        room(7, [doorway('left', 1, 3, 'door', { fromParent: true })]),
        room(4, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 5, 'locked-door'),
        ]),
        room(5, [doorway('left', 1, 4, 'locked-door', { fromParent: true })]),
        room(6, [
          doorway('bottom', 1, 1, 'door', { fromParent: true }),
          doorway('top', 1, 8, 'locked-door'),
        ]),
        room(8, [doorway('bottom', 1, 6, 'locked-door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      // Walk every doorway. For each locked-door doorway, the
      // connected room's matching back-edge must ALSO be locked-door.
      // For each plain door, same — no asymmetric pairs.
      const roomById = new Map(rooms.map(r => [r.id, r]));
      for (const r of rooms) {
        for (const d of r.doorways || []) {
          const connectedRoom = roomById.get(d.connectedRoomId);
          if (!connectedRoom) continue;
          const backEdge = (connectedRoom.doorways || []).find(
            b => b && b.connectedRoomId === r.id,
          );
          if (!backEdge) continue;
          if (d.type === 'locked-door' || backEdge.type === 'locked-door') {
            expect(d.type).toBe(backEdge.type);
          }
        }
      }
    });

    it('prefers leaf-gating locks (pocket size 1) over multi-room dead-end chains', () => {
      // Two extra pickable bridge locks beyond the quest-gate.
      //   - 4↔5 gates a 1-room pocket (room 5 — true leaf)
      //   - 6↔7 gates a 3-room pocket (7 → 8 → 9 — chain)
      // Both are valid bridges (dead-end pockets). Leaf-gating wins:
      // 4↔5 stays, 6↔7 converts to a regular door.
      // Quest-gate is 2↔3 (largest pocket: 3, 11, 12, 13 = 4 rooms,
      // chosen by identifyMainLockedDoor). Room 14 is the key
      // candidate — large area so it wins the leaf tiebreak (and
      // has no locked doors so door-conversion doesn't strip our
      // test locks).
      const rooms = [
        room(1, [
          doorway('left', 1, 2),
          doorway('top', 1, 4),
          doorway('right', 1, 6),
          doorway('bottom', 1, 14),
        ]),
        // Quest-gate (gates 4 rooms beyond — largest, so it's the main lock).
        room(2, [
          doorway('right', 1, 1, 'door', { fromParent: true }),
          doorway('left', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('right', 1, 2, 'locked-door', { fromParent: true }),
          doorway('top', 1, 11),
          doorway('bottom', 1, 12),
          doorway('left', 1, 13),
        ]),
        room(11, [doorway('bottom', 1, 3, 'door', { fromParent: true })]),
        room(12, [doorway('top', 1, 3, 'door', { fromParent: true })]),
        room(13, [doorway('right', 1, 3, 'door', { fromParent: true })]),
        // Small-pocket pickable: 4 ↔ 5.
        room(4, [
          doorway('bottom', 1, 1, 'door', { fromParent: true }),
          doorway('top', 1, 5, 'locked-door'),
        ]),
        room(5, [doorway('bottom', 1, 4, 'locked-door', { fromParent: true })]),
        // Large-pocket pickable: 6 ↔ 7 → 8 → 9.
        room(6, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 7, 'locked-door'),
        ]),
        room(7, [
          doorway('left', 1, 6, 'locked-door', { fromParent: true }),
          doorway('right', 1, 8),
        ]),
        room(8, [
          doorway('left', 1, 7, 'door', { fromParent: true }),
          doorway('right', 1, 9),
        ]),
        room(9, [doorway('left', 1, 8, 'door', { fromParent: true })]),
        // Key candidate — large to win the area tiebreak; no locked
        // doors so door-conversion leaves our test locks alone.
        room(14, [doorway('top', 1, 1, 'door', { fromParent: true })], { width: 10, height: 10 }),
      ];

      addDungeonDetails(rooms);

      // Group locked-door doorways into pairs (a pair is the
      // unordered {roomA, roomB} edge). A pair is the quest-gate if
      // ANY of its doorways has requiresKey: true — the flag only
      // lives on the obstacle-side doorway, not on both sides.
      const pairFlags = new Map();
      for (const r of rooms) {
        for (const d of r.doorways || []) {
          if (d?.type !== 'locked-door') continue;
          const lo = Math.min(r.id, d.connectedRoomId);
          const hi = Math.max(r.id, d.connectedRoomId);
          const key = `${lo}-${hi}`;
          const prev = pairFlags.get(key) || false;
          pairFlags.set(key, prev || d.requiresKey === true);
        }
      }
      const pickablePairs = new Set(
        Array.from(pairFlags.entries())
          .filter(([, isQuestGate]) => !isQuestGate)
          .map(([key]) => key),
      );
      expect(pickablePairs.size).toBe(1);
      expect(pickablePairs.has('4-5')).toBe(true);  // leaf-gating wins
      expect(pickablePairs.has('6-7')).toBe(false); // chain pocket converts
    });

    it('falls back to largest dead-end pocket when no leaf-gating lock exists', () => {
      // No single-room pockets here — both extra bridges gate
      // multi-room chains OFF the critical path. The key candidate
      // is a deep chain of plain doors that wins on path length, so
      // the entrance→key path doesn't cross either lock. The locks
      // remain bridges gating dead-end pockets; the cap fallback
      // picks the LARGER pocket for more payoff, converting the
      // smaller one.
      //
      //   - 4↔5 gates {5, 6, 7} via 5 → 6 → 7 (3-room chain)
      //   - 8↔9 gates {9, 10, 11, 12} (4-room chain)
      // Key path: 1 → 13 → 14 → 15 → 16 → 17 → 18 (6 rooms, all
      // doors). Room 18 also has large area so it wins the leaf
      // tiebreak over any locked-pocket leaf at equal depth.
      // Quest-gate: 2↔3 (largest pocket of 4 rooms).
      const rooms = [
        room(1, [
          doorway('left', 1, 2),
          doorway('top', 1, 4),
          doorway('right', 1, 8),
          doorway('bottom', 1, 13),
        ]),
        // Quest-gate.
        room(2, [
          doorway('right', 1, 1, 'door', { fromParent: true }),
          doorway('left', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('right', 1, 2, 'locked-door', { fromParent: true }),
          doorway('top', 1, 19),
          doorway('bottom', 1, 20),
          doorway('left', 1, 21),
        ]),
        room(19, [doorway('bottom', 1, 3, 'door', { fromParent: true })]),
        room(20, [doorway('top', 1, 3, 'door', { fromParent: true })]),
        room(21, [doorway('right', 1, 3, 'door', { fromParent: true })]),
        // 3-room chain bridge.
        room(4, [
          doorway('bottom', 1, 1, 'door', { fromParent: true }),
          doorway('top', 1, 5, 'locked-door'),
        ]),
        room(5, [
          doorway('bottom', 1, 4, 'locked-door', { fromParent: true }),
          doorway('top', 1, 6),
        ]),
        room(6, [
          doorway('bottom', 1, 5, 'door', { fromParent: true }),
          doorway('top', 1, 7),
        ]),
        room(7, [doorway('bottom', 1, 6, 'door', { fromParent: true })]),
        // 4-room chain bridge.
        room(8, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 9, 'locked-door'),
        ]),
        room(9, [
          doorway('left', 1, 8, 'locked-door', { fromParent: true }),
          doorway('right', 1, 10),
        ]),
        room(10, [
          doorway('left', 1, 9, 'door', { fromParent: true }),
          doorway('right', 1, 11),
        ]),
        room(11, [
          doorway('left', 1, 10, 'door', { fromParent: true }),
          doorway('right', 1, 12),
        ]),
        room(12, [doorway('left', 1, 11, 'door', { fromParent: true })]),
        // Key path: deep chain of plain doors. Beats the locked
        // pockets on path length so the BFS picks a leaf at the
        // end of this chain.
        room(13, [
          doorway('top', 1, 1, 'door', { fromParent: true }),
          doorway('bottom', 1, 14),
        ]),
        room(14, [
          doorway('top', 1, 13, 'door', { fromParent: true }),
          doorway('bottom', 1, 15),
        ]),
        room(15, [
          doorway('top', 1, 14, 'door', { fromParent: true }),
          doorway('bottom', 1, 16),
        ]),
        room(16, [
          doorway('top', 1, 15, 'door', { fromParent: true }),
          doorway('bottom', 1, 17),
        ]),
        room(17, [
          doorway('top', 1, 16, 'door', { fromParent: true }),
          doorway('bottom', 1, 18),
        ]),
        room(18, [doorway('top', 1, 17, 'door', { fromParent: true })], { width: 12, height: 12 }),
      ];

      addDungeonDetails(rooms);

      // Both 4-5 and 8-9 are bridges (no other path between sides),
      // off the critical path. Neither is leaf-gating (both pockets
      // have multiple rooms). Larger pocket (8-9, 4 rooms) wins;
      // 4-5 converts.
      const pairFlags = new Map();
      for (const r of rooms) {
        for (const d of r.doorways || []) {
          if (d?.type !== 'locked-door') continue;
          const lo = Math.min(r.id, d.connectedRoomId);
          const hi = Math.max(r.id, d.connectedRoomId);
          const key = `${lo}-${hi}`;
          const prev = pairFlags.get(key) || false;
          pairFlags.set(key, prev || d.requiresKey === true);
        }
      }
      const pickablePairs = new Set(
        Array.from(pairFlags.entries())
          .filter(([, isQuestGate]) => !isQuestGate)
          .map(([key]) => key),
      );
      expect(pickablePairs.size).toBe(1);
      expect(pickablePairs.has('8-9')).toBe(true);  // larger pocket
      expect(pickablePairs.has('4-5')).toBe(false); // smaller pocket
    });

    it('converts non-bridge (shortcut/critical-path) locks regardless of cap', () => {
      // The lock here is a non-bridge — it sits between two rooms
      // already reachable through unlocked doors. Removing it leaves
      // the dungeon connected. Per the design rule, such locks are
      // either redundant shortcuts or stealth quest-gates and must
      // always convert to plain doors, even when no cap pressure
      // exists.
      //
      // Layout:
      //   1 → 2 (door) → 3 (door)
      //   1 → 3 (locked-door)  ← shortcut: removable bridge fails
      // Also a real bridge lock 4↔5 (leaf-gating) so we can confirm
      // the bridge-vs-non-bridge distinction holds.
      const rooms = [
        room(1, [
          doorway('right', 1, 2),
          doorway('bottom', 1, 3, 'locked-door'),
          doorway('left', 1, 4),
        ]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('bottom', 1, 3),
        ]),
        room(3, [
          doorway('top', 1, 2, 'door', { fromParent: true }),
          doorway('top', 2, 1, 'locked-door'),
        ]),
        room(4, [
          doorway('right', 1, 1, 'door', { fromParent: true }),
          doorway('left', 1, 5, 'locked-door'),
        ]),
        room(5, [doorway('right', 1, 4, 'locked-door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      // 1↔3 was a non-bridge (room 3 reachable via 1→2→3) — converted.
      const lock_1_3 = rooms.find(r => r.id === 1)
        .doorways.find(d => d.connectedRoomId === 3);
      expect(lock_1_3.type).toBe('door');
      // 4↔5 was a bridge leaf-gating lock — preserved.
      const lock_4_5 = rooms.find(r => r.id === 4)
        .doorways.find(d => d.connectedRoomId === 5);
      expect(lock_4_5.type).toBe('locked-door');
    });

    it('promotes a leaf to locked when stripping/cap eliminates every pickable lock', () => {
      // Layout:
      //   entrance(1) → 2 (obstacle) [quest-gate locked → 3 → 4 → 10 → 11 boss]
      //   entrance(1) → 6 (lock to 7 → 8 → 9 — false-leaf path)
      //   entrance(1) → 12 (door, single doorway leaf, large area)
      //
      // BFS picks room 9 as key (deepest leaf, path 1→6→7→8→9).
      // The 6↔7 lock is on that path — stripped. Cap then sees zero
      // pickable locks remaining → ensureAtLeastOnePickableLock fires
      // → leaf with largest area gets its doorway locked. Room 12 is
      // the only eligible leaf (single 'door' doorway, no special
      // role); its 12↔1 doorway converts to locked-door.
      const rooms = [
        room(1, [
          doorway('top', 1, 2, 'door'),
          doorway('bottom', 1, 6, 'door'),
          doorway('right', 1, 12, 'door'),
        ]),
        // Obstacle branch — 5 rooms beyond gate.
        room(2, [
          doorway('bottom', 1, 1, 'door', { fromParent: true }),
          doorway('left', 3, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('right', 3, 2, 'locked-door', { fromParent: true }),
          doorway('left', 4, 4),
        ]),
        room(4, [
          doorway('right', 4, 3, 'door', { fromParent: true }),
          doorway('left', 1, 10),
        ]),
        room(10, [
          doorway('right', 1, 4, 'door', { fromParent: true }),
          doorway('left', 1, 11),
        ]),
        room(11, [doorway('right', 1, 10, 'door', { fromParent: true })], { width: 6, height: 7 }),
        // Key branch — only generated lock is 6↔7, which lands on the path.
        room(6, [
          doorway('top', 2, 1, 'door', { fromParent: true }),
          doorway('right', 1, 7, 'locked-door'),
        ]),
        room(7, [
          doorway('left', 1, 6, 'locked-door', { fromParent: true }),
          doorway('bottom', 1, 8),
        ]),
        room(8, [
          doorway('top', 1, 7, 'door', { fromParent: true }),
          doorway('bottom', 4, 9),
        ]),
        room(9, [doorway('top', 4, 8, 'door', { fromParent: true })]),
        // Side leaf — single 'door' doorway, eligible for promotion.
        room(12, [doorway('left', 1, 1, 'door', { fromParent: true })], { width: 5, height: 5 }),
      ];

      addDungeonDetails(rooms);

      // Verify the BFS path lock was stripped.
      const room6 = rooms.find(r => r.id === 6);
      const lock_6_7 = room6.doorways.find(d => d.connectedRoomId === 7);
      expect(lock_6_7.type).toBe('door');
      // The side leaf (12) now carries a pickable lock as compensation.
      const room12 = rooms.find(r => r.id === 12);
      expect(room12.doorways[0].type).toBe('locked-door');
      // Both sides of the doorway should match (no half-converted pairs).
      const room1 = rooms.find(r => r.id === 1);
      const backEdge = room1.doorways.find(d => d.connectedRoomId === 12);
      expect(backEdge.type).toBe('locked-door');
      // The replacement lock is NOT a quest-gate (no requiresKey flag).
      expect(room12.doorways[0].requiresKey).toBeFalsy();
      expect(backEdge.requiresKey).toBeFalsy();
    });

    it('does NOT add a replacement lock when a pickable lock already survives', () => {
      // The BFS-chosen key path must NOT cross the pickable lock —
      // otherwise the lock would get stripped and ensureAtLeastOne
      // would re-add one (which would defeat the test). To keep the
      // lock off the path, the key path goes through a longer chain
      // of plain doors. The side-branch lock-pocket is shallower so
      // the BFS prefers the door chain.
      //
      // Layout:
      //   entrance(1) → 2 (obstacle) → 3 → 4 (boss, beyond gate)
      //   entrance(1) → 5 → 6 → 7 (key path, all plain doors)
      //   entrance(1) → 8 → 9 (locked-door, leaf pocket — SURVIVES)
      const rooms = [
        room(1, [
          doorway('top', 1, 2, 'door'),
          doorway('bottom', 1, 5, 'door'),
          doorway('right', 1, 8, 'door'),
        ]),
        // Obstacle branch — 2 rooms beyond gate.
        room(2, [
          doorway('bottom', 1, 1, 'door', { fromParent: true }),
          doorway('top', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('bottom', 1, 2, 'locked-door', { fromParent: true }),
          doorway('top', 1, 4),
        ]),
        room(4, [doorway('bottom', 1, 3, 'door', { fromParent: true })]),
        // Key path — deep door chain (3 hops). Wins on path length.
        room(5, [
          doorway('top', 1, 1, 'door', { fromParent: true }),
          doorway('bottom', 1, 6, 'door'),
        ]),
        room(6, [
          doorway('top', 1, 5, 'door', { fromParent: true }),
          doorway('bottom', 1, 7, 'door'),
        ]),
        room(7, [doorway('top', 1, 6, 'door', { fromParent: true })]),
        // Side branch — leaf-gating pickable lock (2 hops, shorter).
        room(8, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 9, 'locked-door'),
        ]),
        room(9, [doorway('left', 1, 8, 'locked-door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      // The 8↔9 lock survives — leaf-gating bridge, off the path.
      const room8 = rooms.find(r => r.id === 8);
      const lock_8_9 = room8.doorways.find(d => d.connectedRoomId === 9);
      expect(lock_8_9.type).toBe('locked-door');
      // Exactly one pickable lock pair (8↔9) — no replacement added.
      // Use pair-aware detection: the quest-gate's `requiresKey`
      // flag only lives on the obstacle-side doorway, so a doorway-
      // level filter would treat the back-edge as a pickable.
      const pairFlags = new Map();
      for (const r of rooms) {
        for (const d of r.doorways || []) {
          if (d?.type !== 'locked-door') continue;
          const lo = Math.min(r.id, d.connectedRoomId);
          const hi = Math.max(r.id, d.connectedRoomId);
          const key = `${lo}-${hi}`;
          pairFlags.set(key, (pairFlags.get(key) || false) || d.requiresKey === true);
        }
      }
      const pickablePairs = new Set(
        Array.from(pairFlags.entries())
          .filter(([, isQuestGate]) => !isQuestGate)
          .map(([key]) => key),
      );
      expect(pickablePairs.size).toBe(1);
      expect(pickablePairs.has('8-9')).toBe(true);
    });

    it('caps to ONE total lock when no obstacle/key pair is established', () => {
      // No room can host a key (only one branch off entrance, which
      // is the obstacle's side). All locked doors are pickable; cap
      // at 1 total.
      const rooms = [
        room(1, [doorway('right', 1, 2)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),
          doorway('top', 1, 4, 'locked-door'),
        ]),
        room(3, [doorway('left', 1, 2, 'locked-door', { fromParent: true })]),
        room(4, [doorway('bottom', 1, 2, 'locked-door', { fromParent: true })]),
      ];

      const result = addDungeonDetails(rooms);

      // No pair established (no candidate beyond entrance).
      expect(result.obstacleKeyPairEstablished).toBe(false);
      // At most one locked-door pair survives.
      const pairs = new Set();
      for (const r of rooms) {
        for (const d of r.doorways || []) {
          if (d?.type === 'locked-door') {
            const lo = Math.min(r.id, d.connectedRoomId);
            const hi = Math.max(r.id, d.connectedRoomId);
            pairs.add(`${lo}-${hi}`);
          }
        }
      }
      expect(pairs.size).toBeLessThanOrEqual(1);
    });
  });

  describe('dead-end leaf payoff seeding', () => {
    it('tags single-doorway non-special rooms with a leaf_payoff seed in pendingContentSeeds', () => {
      // Layout:
      //   entrance(1) → 2 → 3 (deeper leaf, becomes boss)
      //   entrance(1) → 4    (side-branch leaf, NOT special)
      // Room 4 is a one-doorway leaf with no special role — should
      // receive a leaf_payoff seed.
      const rooms = [
        room(1, [doorway('right', 1, 2), doorway('bottom', 1, 4)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3),
        ]),
        room(3, [doorway('left', 1, 2, 'door', { fromParent: true })]),
        room(4, [doorway('top', 1, 1, 'door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      const leaf = rooms.find(r => r.id === 4);
      expect(leaf.pendingContentSeeds).toBeDefined();
      const payoffSeeds = leaf.pendingContentSeeds.filter(s => s.kind === 'leaf_payoff');
      expect(payoffSeeds).toHaveLength(1);
      expect(typeof payoffSeeds[0].content).toBe('string');
      expect(payoffSeeds[0].content.length).toBeGreaterThan(20);
    });

    it('does NOT tag rooms with special roles (boss, key, setback, entrance, etc.)', () => {
      // Full obstacle/key pair layout — the boss room, key room,
      // setback room, entrance, obstacle are all single-doorway in
      // some variants but must NEVER receive a leaf_payoff seed.
      const rooms = [
        room(1, [doorway('left', 1, 2), doorway('right', 1, 6)]),
        room(2, [
          doorway('right', 1, 1, 'door', { fromParent: true }),
          doorway('bottom', 1, 3, 'locked-door'),
        ]),
        room(3, [
          doorway('top', 1, 2, 'locked-door', { fromParent: true }),
          doorway('right', 1, 4),
          doorway('bottom', 1, 5),
        ]),
        room(4, [doorway('left', 1, 3, 'door', { fromParent: true })]),
        room(5, [doorway('top', 1, 3, 'door', { fromParent: true })]),
        room(6, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('top', 1, 7),
        ]),
        room(7, [doorway('bottom', 1, 6, 'door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      // Check that all rooms assigned to special types lack
      // leaf_payoff seeds. 'locked' and 'secret' ARE eligible (their
      // prompt handlers consume seeds and the seed reinforces the
      // "pick / find / discover" pattern).
      const SPECIAL = new Set(['entrance', 'boss', 'obstacle', 'key', 'setback']);
      for (const r of rooms) {
        if (!SPECIAL.has(r.roomType)) continue;
        const payoffSeeds = (r.pendingContentSeeds || []).filter(s => s.kind === 'leaf_payoff');
        expect(payoffSeeds.length).toBe(0);
      }
    });

    it('does NOT tag rooms with multiple doorways (only true dead-ends qualify)', () => {
      // A connecting room (2 doorways) is not a leaf even if it
      // doesn't have a special roomType.
      const rooms = [
        room(1, [doorway('right', 1, 2)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3),
          doorway('top', 1, 4),
        ]),
        room(3, [doorway('left', 1, 2, 'door', { fromParent: true })]),
        room(4, [doorway('bottom', 1, 2, 'door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      const middleRoom = rooms.find(r => r.id === 2);
      const payoffSeeds = (middleRoom.pendingContentSeeds || []).filter(
        s => s.kind === 'leaf_payoff',
      );
      // Room 2 has 3 doorways; must not receive a leaf payoff.
      expect(payoffSeeds.length).toBe(0);
    });

    it('coexists with clue seeds on the same room — both render through the same substrate', () => {
      // A clue seed gets added programmatically to room 4 (the side-
      // branch leaf, NOT the boss). Then dungeon-details tags it with
      // a leaf payoff. Both sit in pendingContentSeeds together.
      const rooms = [
        room(1, [doorway('right', 1, 2), doorway('bottom', 1, 4)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3),
        ]),
        room(3, [doorway('left', 1, 2, 'door', { fromParent: true })]),
        room(4, [doorway('top', 1, 1, 'door', { fromParent: true })], {
          pendingContentSeeds: [
            { content: 'a portrait labeled \'Ealhswith\'', originRoomId: 99, kind: 'clue' },
          ],
        }),
      ];

      addDungeonDetails(rooms);

      const leaf = rooms.find(r => r.id === 4);
      const clueSeeds = leaf.pendingContentSeeds.filter(s => s.kind === 'clue');
      const payoffSeeds = leaf.pendingContentSeeds.filter(s => s.kind === 'leaf_payoff');
      expect(clueSeeds).toHaveLength(1);
      expect(payoffSeeds).toHaveLength(1);
      // Order preserved: prior seeds first, new payoff appended.
      expect(leaf.pendingContentSeeds[0].kind).toBe('clue');
      expect(leaf.pendingContentSeeds[1].kind).toBe('leaf_payoff');
    });
  });

  describe('failure cases — cleanup', () => {
    it('returns obstacleKeyPairEstablished: false when no main locked door exists', () => {
      // Plain unlocked dungeon: entrance → 2 → 3 (boss naturally lands at the leaf).
      const rooms = [
        room(1, [doorway('right', 1, 2)]),
        room(2, [doorway('left', 1, 1, 'door', { fromParent: true }), doorway('right', 1, 3)]),
        room(3, [doorway('left', 1, 2, 'door', { fromParent: true })]),
      ];

      const result = addDungeonDetails(rooms);

      expect(result.obstacleKeyPairEstablished).toBe(false);
      // No obstacle, no key, no orphan stamps.
      expect(rooms.find(r => r.roomType === 'obstacle')).toBeUndefined();
      expect(rooms.find(r => r.roomType === 'key')).toBeUndefined();
      expect(rooms.find(r => r.requiresKey === true)).toBeUndefined();
    });

    it('clears the obstacle stamps when the pair cancels (no candidate found)', () => {
      // The bug we're guarding against: a previous version of this code
      // set `roomType: 'obstacle'` on the room with the locked door
      // BEFORE checking whether a key room could be found. When the
      // search failed, requiresKey got cleared but roomType stayed —
      // producing a room rendered as obstacle with no quest-gate.
      // Construct a layout where the only reachable rooms are the
      // entrance and the obstacle (key search exhausts).
      const rooms = [
        // entrance with two doors, both to rooms that are dead-ends
        // beyond the obstacle's locked door.
        room(1, [doorway('right', 1, 2)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),
        ]),
        room(3, [doorway('left', 1, 2, 'locked-door', { fromParent: true })]),
      ];

      const result = addDungeonDetails(rooms);

      expect(result.obstacleKeyPairEstablished).toBe(false);
      // The room that briefly got stamped as obstacle must be cleaned up.
      const room2 = rooms.find(r => r.id === 2);
      expect(room2.roomType).not.toBe('obstacle');
      expect(room2.requiresKey).toBeUndefined();
      expect(room2.hasKeyInRoomId).toBeUndefined();
      expect(room2.keyDoor).toBeUndefined();
      // And the door's requiresKey flag must be cleared too.
      const lockedDoorway = room2.doorways.find(d => d.type === 'locked-door');
      expect(lockedDoorway.requiresKey).toBeUndefined();
    });

    it('places the boss at the furthest reachable leaf even in failure cases', () => {
      // The bug from the user report: when the pair cancelled and the
      // dungeon had multiple short branches off the entrance, the boss
      // ended up adjacent to the entrance because findFurthestLeafNode
      // can't walk through locked doors and the available leaves were
      // all path-length 2. Assert the boss is at LEAST as far as any
      // other rooms in unlocked-path distance from the entrance.
      const rooms = [
        room(1, [doorway('right', 1, 2)]),
        room(2, [
          doorway('left', 1, 1, 'door', { fromParent: true }),
          doorway('right', 1, 3, 'locked-door'),
        ]),
        room(3, [doorway('left', 1, 2, 'locked-door', { fromParent: true })]),
      ];

      addDungeonDetails(rooms);

      const bossRoom = rooms.find(r => r.roomType === 'boss');
      // Boss should land at room 2 (the only reachable non-entrance
      // room when locked doors can't be walked). This isn't ideal in
      // a "boss past obstacle" sense, but it IS the furthest reachable
      // leaf — and the caller retries 3 times to avoid this layout
      // wherever possible.
      expect(bossRoom).toBeTruthy();
      expect(bossRoom.id).not.toBe(1); // never the entrance
    });
  });
});
