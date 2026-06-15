/**
 * assign-content-seeds tests
 *
 * Behavior-focused: assert eligibility filtering, placement semantics,
 * graceful fallbacks, and the consume/clear lifecycle. The substrate
 * is generic but the only current producer is the key-room flow, so
 * the test fixtures lean on that shape.
 */

import {
  assignContentSeeds,
  consumePendingContentSeeds,
} from '../util/assign-content-seeds.mjs';

// Minimal room factory — defaults to an eligible "living" room. Tests
// override fields to drive the eligibility branches.
function room(overrides = {}) {
  return { id: 1, roomType: 'living', ...overrides };
}

// Minimal dungeon factory — drops assignments by default.
function dungeon(rooms, assignments = {}) {
  return {
    rooms,
    loreAssignments: null,
    npcAssignments: null,
    monsterAssignments: null,
    itemAssignments: null,
    ...assignments,
  };
}

describe('assignContentSeeds', () => {
  describe('happy path', () => {
    it('places each seed onto a distinct eligible host room', () => {
      const d = dungeon([
        room({ id: 1, roomType: 'living' }),
        room({ id: 2, roomType: 'purpose' }),
        room({ id: 3, roomType: 'setback' }),
      ]);
      const seeds = [
        { content: 'a beam carved with a name' },
        { content: 'a sketched portrait labeled Ealhswith' },
      ];

      const placements = assignContentSeeds(d, seeds, /* originRoomId */ 99, 'clue');

      expect(placements).toHaveLength(2);
      // Ascending area-id ordering: room 1 and room 2 first.
      expect(placements[0].roomId).toBe(1);
      expect(placements[1].roomId).toBe(2);
      // Mutation persisted on chosen rooms; not on the third candidate.
      expect(d.rooms[0].pendingContentSeeds).toHaveLength(1);
      expect(d.rooms[0].pendingContentSeeds[0]).toEqual({
        content: 'a beam carved with a name',
        originRoomId: 99,
        kind: 'clue',
      });
      expect(d.rooms[2].pendingContentSeeds).toBeUndefined();
    });

    it('preserves seeds already pending on a target room (append, not replace)', () => {
      // A prior assignContentSeeds call might have already put a seed
      // on room 1; a second call must add the new seed alongside, not
      // overwrite it.
      const d = dungeon([
        room({ id: 1, pendingContentSeeds: [{ content: 'prior seed', originRoomId: 50, kind: 'clue' }] }),
      ]);

      assignContentSeeds(d, [{ content: 'new seed' }], 99, 'clue');

      expect(d.rooms[0].pendingContentSeeds).toHaveLength(2);
      expect(d.rooms[0].pendingContentSeeds[0].content).toBe('prior seed');
      expect(d.rooms[0].pendingContentSeeds[1].content).toBe('new seed');
    });

    it('returns the placement record reflecting only what was placed', () => {
      // Two seeds, but only one eligible candidate — placement record
      // reflects what actually landed, NOT the input seed count.
      const d = dungeon([
        room({ id: 1, roomType: 'living' }),
        room({ id: 2, roomType: 'boss' }), // ineligible
      ]);

      const placements = assignContentSeeds(
        d,
        [{ content: 'a' }, { content: 'b' }],
        99,
      );

      expect(placements).toHaveLength(1);
      expect(placements[0].roomId).toBe(1);
    });
  });

  describe('eligibility filtering', () => {
    it('skips the origin room', () => {
      const d = dungeon([
        room({ id: 5, roomType: 'living' }),  // origin
        room({ id: 6, roomType: 'living' }),
      ]);

      const placements = assignContentSeeds(d, [{ content: 'x' }], /* originRoomId */ 5);

      expect(placements).toHaveLength(1);
      expect(placements[0].roomId).toBe(6);
      // Origin room MUST NOT have been touched.
      expect(d.rooms[0].pendingContentSeeds).toBeUndefined();
    });

    it('skips rooms whose roomType is not in the eligible set', () => {
      // Excluded types: entrance, boss, connecting, key.
      // The eligible set is living/purpose/secret/setback/custom/locked.
      // ('locked' is included because it covers both pickable-locked
      // rooms and the requiresKey obstacle flow — the obstacle room
      // is the natural home for a clue about the paired key.)
      const d = dungeon([
        room({ id: 1, roomType: 'boss' }),
        room({ id: 2, roomType: 'connecting' }),
        room({ id: 3, roomType: 'entrance' }),
        room({ id: 4, roomType: 'living' }),
      ]);

      const placements = assignContentSeeds(d, [{ content: 'x' }], 99);

      expect(placements).toHaveLength(1);
      expect(placements[0].roomId).toBe(4);
    });

    it('treats locked rooms (obstacle / pickable) as eligible hosts', () => {
      // Direct assertion: the obstacle room (roomType === 'locked'
      // with requiresKey === true) and the pickable-locked room
      // (same roomType, requiresKey === false) are both valid hosts.
      const d = dungeon([
        room({ id: 1, roomType: 'locked' }),
      ]);

      const placements = assignContentSeeds(d, [{ content: 'x' }], 99);

      expect(placements).toHaveLength(1);
      expect(placements[0].roomId).toBe(1);
    });

    it('skips rooms with a populated contentArray (already generated)', () => {
      // Once the user has generated a room, dropping a seed in
      // wouldn't surface — the prompt has already run.
      const d = dungeon([
        room({ id: 1, contentArray: [{ format: 'paragraph', content: 'already written' }] }),
        room({ id: 2 }),
      ]);

      const placements = assignContentSeeds(d, [{ content: 'x' }], 99);

      expect(placements).toHaveLength(1);
      expect(placements[0].roomId).toBe(2);
    });

    it('skips rooms with a lore-location assignment', () => {
      const d = dungeon(
        [
          room({ id: 1 }),
          room({ id: 2 }),
        ],
        { loreAssignments: { lore_to_room: { 'The Scriptorium': 1 } } },
      );

      const placements = assignContentSeeds(d, [{ content: 'x' }], 99);

      expect(placements).toHaveLength(1);
      expect(placements[0].roomId).toBe(2);
    });

    it('skips rooms with an NPC assignment', () => {
      const d = dungeon(
        [room({ id: 1 }), room({ id: 2 })],
        { npcAssignments: { npc_id_to_room: { 'npc_abc': 1 } } },
      );

      const placements = assignContentSeeds(d, [{ content: 'x' }], 99);

      expect(placements).toHaveLength(1);
      expect(placements[0].roomId).toBe(2);
    });

    it('skips rooms with a monster assignment (multi-room populations)', () => {
      // Monster populations may span multiple rooms — assignment shape
      // is monster_id → [roomIds]. Verify both rooms get excluded.
      const d = dungeon(
        [room({ id: 1 }), room({ id: 2 }), room({ id: 3 })],
        { monsterAssignments: { monster_id_to_rooms: { 'm_x': [1, 2] } } },
      );

      const placements = assignContentSeeds(d, [{ content: 'x' }], 99);

      expect(placements).toHaveLength(1);
      expect(placements[0].roomId).toBe(3);
    });

    it('skips rooms with an item assignment', () => {
      const d = dungeon(
        [room({ id: 1 }), room({ id: 2 })],
        { itemAssignments: { item_to_room: { 'The Iron Lever': 1 } } },
      );

      const placements = assignContentSeeds(d, [{ content: 'x' }], 99);

      expect(placements).toHaveLength(1);
      expect(placements[0].roomId).toBe(2);
    });
  });

  describe('graceful fallbacks', () => {
    it('returns empty placement list when no eligible room exists', () => {
      // All rooms are excluded — the caller's clue stays local in the
      // key room, as documented in the THREE CLUE RULE block.
      const d = dungeon([
        room({ id: 1, roomType: 'boss' }),
        room({ id: 2, roomType: 'connecting' }),
      ]);

      const placements = assignContentSeeds(d, [{ content: 'x' }], 99);

      expect(placements).toEqual([]);
    });

    it('handles missing assignment maps without throwing', () => {
      // Freshly generated dungeons may have null/missing assignments
      // (the assignment passes are non-fatal — see map-store).
      const d = { rooms: [room({ id: 1 })] };

      expect(() => {
        assignContentSeeds(d, [{ content: 'x' }], 99);
      }).not.toThrow();
    });

    it('returns empty array for missing / empty / falsy inputs', () => {
      expect(assignContentSeeds(null, [{ content: 'x' }], 99)).toEqual([]);
      expect(assignContentSeeds({}, [{ content: 'x' }], 99)).toEqual([]);
      expect(assignContentSeeds(dungeon([room()]), null, 99)).toEqual([]);
      expect(assignContentSeeds(dungeon([room()]), [], 99)).toEqual([]);
    });

    it('skips seeds with non-string or empty content', () => {
      // Defensive: an LLM may emit `{content: ""}` or `{}`. The
      // placement record reflects only successfully-placed seeds.
      const d = dungeon([
        room({ id: 1 }), room({ id: 2 }), room({ id: 3 }),
      ]);

      const placements = assignContentSeeds(
        d,
        [{ content: '' }, { content: '   ' }, { content: 'real seed' }],
        99,
      );

      // First two slots burned (limit = min(3 seeds, 3 candidates) = 3,
      // but only the third has real content). Rooms 1 and 2 are
      // therefore not touched.
      expect(placements).toHaveLength(1);
      expect(placements[0].content).toBe('real seed');
      expect(d.rooms[0].pendingContentSeeds).toBeUndefined();
      expect(d.rooms[1].pendingContentSeeds).toBeUndefined();
      expect(d.rooms[2].pendingContentSeeds).toHaveLength(1);
    });
  });

  describe('determinism', () => {
    it('places seeds onto rooms in ascending area-id order', () => {
      // Stable ordering matters: same dungeon state → same placement.
      // The test feeds rooms in scrambled order and asserts the
      // assignment lands on the lowest area ids first.
      const d = dungeon([
        room({ id: 9 }), room({ id: 3 }), room({ id: 7 }), room({ id: 5 }),
      ]);

      const placements = assignContentSeeds(
        d,
        [{ content: 'a' }, { content: 'b' }],
        99,
      );

      expect(placements.map(p => p.roomId)).toEqual([3, 5]);
    });
  });

  describe('preferredRoomIds option', () => {
    it('places the first seed onto a preferred eligible room ahead of ascending-id order', () => {
      // The key-room flow biases the first clue toward the paired
      // obstacle room. Without the option, area-id 3 (the lowest
      // eligible id) would receive the first seed; with area 7 as
      // preferred, area 7 gets it instead and area 3 takes the second.
      const d = dungeon([
        room({ id: 3 }), room({ id: 5 }), room({ id: 7 }),
      ]);

      const placements = assignContentSeeds(
        d,
        [{ content: 'a' }, { content: 'b' }],
        99,
        'clue',
        { preferredRoomIds: [7] },
      );

      expect(placements.map(p => p.roomId)).toEqual([7, 3]);
    });

    it('falls back to ascending-id order when the preferred room is ineligible', () => {
      // The obstacle room may have already been generated (has
      // contentArray) or carry an assignment. The bias degrades
      // gracefully — preferred-but-ineligible rooms are simply
      // ignored and the default ordering applies.
      const d = dungeon([
        room({ id: 3 }),
        room({ id: 7, roomType: 'boss' }),  // ineligible — type
      ]);

      const placements = assignContentSeeds(
        d,
        [{ content: 'a' }],
        99,
        'clue',
        { preferredRoomIds: [7] },
      );

      expect(placements).toHaveLength(1);
      expect(placements[0].roomId).toBe(3);
    });

    it('does not double-count a preferred room when it appears in the default list', () => {
      // Both the preference and the default candidate list include
      // room 3. The placement record must contain a single entry for
      // it, not two — and the second seed should land on the next
      // eligible room (5), not re-target 3.
      const d = dungeon([
        room({ id: 3 }), room({ id: 5 }),
      ]);

      const placements = assignContentSeeds(
        d,
        [{ content: 'a' }, { content: 'b' }],
        99,
        'clue',
        { preferredRoomIds: [3] },
      );

      expect(placements.map(p => p.roomId)).toEqual([3, 5]);
      // Room 3 received exactly one seed.
      expect(d.rooms[0].pendingContentSeeds).toHaveLength(1);
    });
  });
});

describe('consumePendingContentSeeds', () => {
  it('returns the pending seeds and clears the array', () => {
    const r = room({
      id: 1,
      pendingContentSeeds: [
        { content: 'seed 1', originRoomId: 99, kind: 'clue' },
        { content: 'seed 2', originRoomId: 99, kind: 'clue' },
      ],
    });

    const seeds = consumePendingContentSeeds(r);

    expect(seeds).toHaveLength(2);
    expect(seeds[0].content).toBe('seed 1');
    // Clearing means a re-render or re-generation can't re-inject.
    expect(r.pendingContentSeeds).toEqual([]);
  });

  it('returns empty array when no seeds are pending', () => {
    expect(consumePendingContentSeeds(room())).toEqual([]);
    expect(consumePendingContentSeeds(room({ pendingContentSeeds: [] }))).toEqual([]);
    expect(consumePendingContentSeeds(null)).toEqual([]);
    expect(consumePendingContentSeeds(undefined)).toEqual([]);
  });
});
