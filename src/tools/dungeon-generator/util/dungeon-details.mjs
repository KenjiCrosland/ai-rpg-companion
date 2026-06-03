// Helper — duplicated from generateDungeon since this file needs it independently
function getOppositeSide(side) {
  const opposites = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };
  return opposites[side];
}

/**
 * Add dungeon-level details to a procedurally-generated room layout.
 *
 * Mutates the room array in place: assigns entrance/boss/key/obstacle/
 * setback room types, sets up the quest-gate door pairing, gives
 * notable rooms special shapes.
 *
 * Returns an object describing the outcome:
 *   { obstacleKeyPairEstablished: boolean }
 *
 * `obstacleKeyPairEstablished` is true only when both an obstacle
 * room AND its corresponding key room got assigned successfully.
 * False when no main locked door exists, when the only locked door is
 * adjacent to the entrance, or when no suitable key-room candidate
 * could be found. The caller (map-store.generateMap) uses this signal
 * to decide whether to regenerate the whole dungeon and try again —
 * "boss past obstacle" is a design invariant the procgen tries hard
 * to honor.
 */
export function addDungeonDetails(dungeonData) {
  // Extract the rooms array
  const roomsArray = dungeonData.rooms || dungeonData;
  // Tracks whether we set up a complete obstacle/key pair. Flipped to
  // true only inside the success branch where both ends are wired up.
  let obstacleKeyPairEstablished = false;

  // Helper functions

  function buildRoomMap(roomsArray) {
    let rooms = {};
    roomsArray.forEach((room) => {
      rooms[room.id] = room;
    });
    return rooms;
  }

  function buildGraph(roomsArray) {
    let graph = {};
    roomsArray.forEach((room) => {
      let roomId = room.id;
      if (!graph[roomId]) graph[roomId] = [];
      room.doorways.forEach((doorway) => {
        let connectedRoomId = doorway.connectedRoomId;
        if (!graph[connectedRoomId]) graph[connectedRoomId] = [];
        // Add edge from roomId to connectedRoomId
        graph[roomId].push({
          from: roomId,
          to: connectedRoomId,
          type: doorway.type,
          doorway: doorway,
        });
        // Add edge from connectedRoomId to roomId
        graph[connectedRoomId].push({
          from: connectedRoomId,
          to: roomId,
          type: doorway.type,
          doorway: doorway,
        });
      });
    });
    return graph;
  }

  function collectLockedDoors(roomsArray) {
    let lockedDoors = [];
    roomsArray.forEach((room) => {
      let roomId = room.id;
      room.doorways.forEach((doorway) => {
        if (
          !doorway.fromParent &&
          (doorway.type === 'locked-door' || doorway.type === 'secret')
        ) {
          let connectedRoomId = doorway.connectedRoomId;
          lockedDoors.push({
            from: roomId,
            to: connectedRoomId,
            type: doorway.type,
            doorway: doorway,
            room: room,
          });
        }
      });
    });
    return lockedDoors;
  }

  function countReachableRooms(startRoomId, excludeRoomId, graph) {
    let visited = new Set();
    function dfs(roomId) {
      if (visited.has(roomId)) return;
      visited.add(roomId);
      graph[roomId].forEach((edge) => {
        if (
          edge.to !== excludeRoomId &&
          edge.type !== 'locked-door' &&
          edge.type !== 'secret'
        ) {
          dfs(edge.to);
        }
      });
    }
    dfs(startRoomId);
    return visited.size;
  }

  // Modified function
  function identifyMainLockedDoor(lockedDoors, graph, entranceRoomId) {
    let mainLockedDoor = null;
    let maxRoomsBeyond = 0;

    lockedDoors.forEach((lockedDoor) => {
      // Skip locked doors connected to the entrance room
      if (
        lockedDoor.from === entranceRoomId ||
        lockedDoor.to === entranceRoomId
      ) {
        return;
      }

      let roomsBeyond = countReachableRooms(
        lockedDoor.to,
        lockedDoor.from,
        graph,
      );
      if (roomsBeyond > 1) {
        if (roomsBeyond > maxRoomsBeyond) {
          maxRoomsBeyond = roomsBeyond;
          mainLockedDoor = lockedDoor;
        }
      }
    });

    return mainLockedDoor;
  }

  function assignBossRoom(bossRoomId, rooms, excludedRoomIds = []) {
    if (
      bossRoomId !== null &&
      !excludedRoomIds.includes(bossRoomId) &&
      rooms[bossRoomId]
    ) {
      rooms[bossRoomId].roomType = 'boss';
    }
  }

  function parseRoomSize(shortDescription) {
    if (!shortDescription) return null;

    const sizeRegex = /(small|medium|large)(?:-sized)? room/i;
    const match = shortDescription.match(sizeRegex);
    if (match) {
      return match[1].toLowerCase();
    }
    return null;
  }

  /**
   * Checks if a room is accessible through a secret doorway marked as 'fromParent: true'.
   *
   * @param {Object} room - The room to check.
   * @returns {boolean} - True if the room is accessible only through secret doors with 'fromParent: true'.
   */
  function isRoomAccessibleThroughSecretFromParent(room) {
    // Check if there is at least one doorway with type 'secret' and 'fromParent: true'.
    return room.doorways.some(
      (doorway) => doorway.type === 'secret' && doorway.fromParent,
    );
  }

  /**
   * Assigns room types to each room in the dungeon based on the dungeon's structure.
   *
   * @param {Array} roomsArray - The rooms array.
   * @param {number} entranceRoomId - The ID of the entrance room.
   * @param {Object} graph - The dungeon graph.
   * @param {Object} rooms - The map of rooms.
   */
  function assignRoomTypes(roomsArray, entranceRoomId, graph, rooms) {
    // Reset room types only if not already assigned
    roomsArray.forEach((room) => {
      if (!room.roomType) {
        room.roomType = null;
      }
      room.size = parseRoomSize(room.shortDescription);
    });

    // Assign entrance room
    rooms[entranceRoomId].roomType = 'entrance';

    // Rooms with these types have already been assigned by the
    // obstacle/key/boss/setback pipeline above. Subsequent rules
    // (secret / locked / connecting / purpose / living) must NEVER
    // overwrite them. Bug this guards against: an obstacle room with
    // only one doorway (the quest-gate locked door) would otherwise
    // get re-stamped as `roomType: 'locked'` by the rule below,
    // breaking the obstacle/key pair invariant.
    const PROTECTED_TYPES = new Set(['entrance', 'boss', 'obstacle', 'key', 'setback']);

    // Assign 'secret' rooms based on doorway connections
    roomsArray.forEach((room) => {
      if (PROTECTED_TYPES.has(room.roomType)) return;
      if (isRoomAccessibleThroughSecretFromParent(room)) {
        room.roomType = 'secret';
      }
    });

    // Assign 'locked' rooms (rooms with only one locked doorway)
    roomsArray.forEach((room) => {
      if (PROTECTED_TYPES.has(room.roomType)) return;
      const numConnections = room.doorways.length;
      if (numConnections === 1 && room.doorways[0].type === 'locked-door') {
        room.roomType = 'locked';
      }
    });

    // Assign 'connecting' rooms (rooms with 3 or more connections)
    roomsArray.forEach((room) => {
      if (PROTECTED_TYPES.has(room.roomType)) return;
      if (!room.roomType && room.doorways.length >= 3) {
        room.roomType = 'connecting';
      }
    });

    // Now assign room types for the rest
    roomsArray.forEach((room) => {
      if (room.roomType) return; // Skip already assigned rooms

      const numConnections = room.doorways.length;
      const roomSize = room.size;

      // Determine adjacent room types
      let adjacentRoomTypes = new Set();
      graph[room.id].forEach((edge) => {
        let adjacentRoom = rooms[edge.to];
        if (adjacentRoom.roomType) {
          adjacentRoomTypes.add(adjacentRoom.roomType);
        }
      });

      // Initialize probabilities
      let purposeProb = 0.3;
      let livingProb = 0.3;
      let connectingProb = 0;
      let setbackProb = 0.05;

      // Adjust probabilities based on adjacency
      if (adjacentRoomTypes.has('purpose')) {
        purposeProb += 0.2;
      }
      if (adjacentRoomTypes.has('living')) {
        livingProb += 0.2;
      }
      if (adjacentRoomTypes.has('connecting')) {
        connectingProb += 0.1;
      }

      // Adjust probabilities based on room characteristics
      if (roomSize === 'large') {
        purposeProb += 0.1;
      }
      if (numConnections === 1) {
        livingProb += 0.1;
      }

      // Normalize probabilities
      const totalProb = purposeProb + livingProb + setbackProb;
      purposeProb /= totalProb;
      livingProb /= totalProb;
      setbackProb /= totalProb;

      // Randomly assign room type based on adjusted probabilities
      const rand = Math.random();

      if (rand < purposeProb) {
        room.roomType = 'purpose';
      } else if (rand < purposeProb + livingProb) {
        room.roomType = 'living';
      } else {
        room.roomType = 'purpose'; // Default to 'purpose' if other probabilities are low
      }
    });
  }

  function findShortestPath(graph, startRoomId, endRoomId) {
    let queue = [];
    let visited = new Set();
    let predecessor = {};
    queue.push(startRoomId);
    visited.add(startRoomId);

    while (queue.length > 0) {
      let currentRoomId = queue.shift();
      if (currentRoomId === endRoomId) {
        // Reconstruct path
        let path = [];
        let roomId = endRoomId;
        while (roomId !== undefined) {
          path.push(roomId);
          roomId = predecessor[roomId];
        }
        return path.reverse();
      }

      graph[currentRoomId].forEach((edge) => {
        if (!visited.has(edge.to)) {
          visited.add(edge.to);
          predecessor[edge.to] = currentRoomId;
          queue.push(edge.to);
        }
      });
    }
    return null; // No path found
  }

  // Modified function to prioritize traversal through unlocked doors
  function collectRoomsBeyond(
    startRoomId,
    excludeRoomId,
    graph,
    mainLockedDoor,
  ) {
    let visited = new Set();
    let queue = [];
    visited.add(startRoomId);
    queue.push(startRoomId);

    while (queue.length > 0) {
      let roomId = queue.shift();
      let edges = graph[roomId];

      edges.forEach((edge) => {
        if (
          edge.to !== excludeRoomId &&
          !visited.has(edge.to) &&
          edge.type !== 'locked-door' &&
          edge.type !== 'secret'
        ) {
          // Skip traversal through the main locked door
          if (
            mainLockedDoor &&
            ((edge.from === mainLockedDoor.from &&
              edge.to === mainLockedDoor.to) ||
              (edge.from === mainLockedDoor.to &&
                edge.to === mainLockedDoor.from))
          ) {
            return;
          }
          visited.add(edge.to);
          queue.push(edge.to);
        }
      });
    }

    return visited;
  }

  // Room area for size-based tiebreakers. Merged rooms (no top-level
  // width/height) get the sum of their section areas. Anything else
  // missing dimensions returns 0 — never picked over a sized room.
  function roomArea(room) {
    if (!room) return 0;
    if (Array.isArray(room.sections)) {
      return room.sections.reduce(
        (sum, section) => sum + (section.width || 0) * (section.height || 0),
        0,
      );
    }
    return (room.width || 0) * (room.height || 0);
  }

  // "Knock down the wall" boss placement. Given the starting room
  // (the obstacle's far side) and the furthest leaf, walk the shortest
  // path between them and pick the LARGEST room — usually the leaf
  // itself, but when a bigger chamber sits along the way the climax
  // moves there. The smaller leaf room then becomes an unassigned
  // adjacent room behind the boss (treasure niche, lore alcove).
  // The start room is excluded as a candidate so the boss never lands
  // immediately past the quest-gate (that's the vestibule, not the
  // throne room). Tiebreak: prefer the deeper room (later on path).
  function pickLargestRoomOnPath(startId, endId, graph, rooms) {
    const path = findShortestPath(graph, startId, endId);
    if (!Array.isArray(path) || path.length === 0) return endId;
    const candidates = path.slice(1); // drop start (the vestibule)
    if (candidates.length === 0) return endId;
    let bestId = candidates[candidates.length - 1];
    let bestArea = roomArea(rooms[bestId]);
    // Walk back-to-front so the deepest room wins ties.
    for (let i = candidates.length - 1; i >= 0; i--) {
      const id = candidates[i];
      const area = roomArea(rooms[id]);
      if (area > bestArea) {
        bestArea = area;
        bestId = id;
      }
    }
    return bestId;
  }

  function findFurthestLeafNode(
    startRoomId,
    excludedRooms,
    graph,
    mainLockedDoor,
  ) {
    let queue = [];
    let visited = new Set();
    queue.push({ roomId: startRoomId, path: [startRoomId] });
    visited.add(startRoomId);
    let furthestLeafRoomId = null;
    let maxPathLength = 0;
    // Area of the current winning leaf, used as a tiebreaker when
    // multiple leaves sit at the same path-length-from-start. This
    // bias keeps the boss out of broom-closet leaves when a larger
    // room is equally far — the climax deserves space. Applies to
    // key-room selection too: the key feels more like a destination
    // when its chamber has presence.
    let furthestLeafArea = 0;

    while (queue.length > 0) {
      let { roomId, path } = queue.shift();
      let isLeaf = true;

      let edges = graph[roomId];

      edges.forEach((edge) => {
        if (
          !excludedRooms.has(edge.to) &&
          !visited.has(edge.to) &&
          edge.type !== 'secret'
        ) {
          // Skip ONLY the quest-gate (mainLockedDoor). Other locked
          // doors are pickable from the player's perspective, so the
          // BFS must walk through them — otherwise a "leaf" can sit
          // in front of a 3-room pocket that the player will absolutely
          // explore, and the key ends up shallow. Pickable locks that
          // happen to land on the critical path get stripped by the
          // caller after key/boss selection.
          if (
            mainLockedDoor &&
            ((edge.from === mainLockedDoor.from &&
              edge.to === mainLockedDoor.to) ||
              (edge.from === mainLockedDoor.to &&
                edge.to === mainLockedDoor.from))
          ) {
            return;
          }
          isLeaf = false;
          visited.add(edge.to);
          queue.push({ roomId: edge.to, path: [...path, edge.to] });
        }
      });

      if (isLeaf && roomId !== startRoomId) {
        const currentArea = roomArea(rooms[roomId]);
        if (path.length > maxPathLength) {
          // Strictly longer path — new winner, replace.
          maxPathLength = path.length;
          furthestLeafRoomId = roomId;
          furthestLeafArea = currentArea;
        } else if (path.length === maxPathLength && currentArea > furthestLeafArea) {
          // Tied for distance — break ties by larger area.
          furthestLeafRoomId = roomId;
          furthestLeafArea = currentArea;
        }
      }
    }

    return furthestLeafRoomId;
  }

  /**
   * Strip locked-door doorways on every consecutive pair of rooms in
   * the given path. Converts both sides of each doorway to plain
   * 'door'. Used after key/boss selection to enforce the design rule
   * that the critical path (entrance→key, obstacle→boss) MUST NOT
   * carry any pickable locks — those would be stealth quest-gates,
   * forcing the party to pick a lock to progress.
   */
  function stripLocksOnPath(path) {
    if (!Array.isArray(path) || path.length < 2) return;
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i];
      const b = path[i + 1];
      const roomA = rooms[a];
      const roomB = rooms[b];
      if (roomA && Array.isArray(roomA.doorways)) {
        for (const doorway of roomA.doorways) {
          if (
            doorway
            && doorway.connectedRoomId === b
            && doorway.type === 'locked-door'
          ) {
            doorway.type = 'door';
          }
        }
      }
      if (roomB && Array.isArray(roomB.doorways)) {
        for (const doorway of roomB.doorways) {
          if (
            doorway
            && doorway.connectedRoomId === a
            && doorway.type === 'locked-door'
          ) {
            doorway.type = 'door';
          }
        }
      }
    }
  }

  /**
   * Assigns special room shapes (circular, domed, capsule) to notable rooms.
   * Only boss, purpose, and entrance rooms are eligible, and only ~25% of the time.
   * Merged rooms are excluded since they have their own perimeter tracing.
   */
  function assignRoomShapes(roomsArray) {
    roomsArray.forEach((room) => {
      if (room.type === 'merged') return;
      if (!['boss', 'purpose', 'entrance'].includes(room.roomType)) return;
      if (Math.random() > 0.4) return;

      const ratio = room.width / room.height;
      const isSquarish = ratio >= 0.75 && ratio <= 1.35;

      if (isSquarish && Math.random() < 0.5) {
        room.shape = 'circular';
      } else if (ratio > 1.6 || ratio < 0.6) {
        room.shape = 'capsule';
      } else {
        room.shape = 'domed';
        // Dome faces away from the entrance doorway
        const parentDoor = room.doorways?.find((d) => d.fromParent);
        if (parentDoor) {
          room.domedSide = getOppositeSide(parentDoor.side);
        }
      }
    });
  }

  // Start of main function
  let rooms = buildRoomMap(roomsArray);
  let graph = buildGraph(roomsArray);
  let lockedDoors = collectLockedDoors(roomsArray);

  let entranceRoomId = roomsArray[0].id; // Assuming the first room is the entrance

  // Identify main locked door
  let mainLockedDoor = identifyMainLockedDoor(
    lockedDoors,
    graph,
    entranceRoomId,
  );

  if (mainLockedDoor && mainLockedDoor.from !== entranceRoomId) {
    // Add requiresKey and hasKeyInRoomId to the room with the locked door
    let roomWithLockedDoor = rooms[mainLockedDoor.from];
    roomWithLockedDoor.requiresKey = true;
    roomWithLockedDoor.roomType = 'obstacle';
    roomWithLockedDoor.hasKeyInRoomId = null; // Will be set later

    // Mark the specific doorway that requires the key
    mainLockedDoor.doorway.requiresKey = true;

    // Optionally, add keyDoor information to the room
    roomWithLockedDoor.keyDoor = {
      side: mainLockedDoor.doorway.side,
      position: mainLockedDoor.doorway.position,
    };

    // Get rooms beyond the locked door, prioritizing unlocked paths
    let roomsBeyondLockedDoor = collectRoomsBeyond(
      mainLockedDoor.to,
      mainLockedDoor.from,
      graph,
      mainLockedDoor,
    );

    // Prepare excluded rooms
    let excludedRoomsForKey = new Set([
      ...roomsBeyondLockedDoor,
      roomWithLockedDoor.id,
      entranceRoomId,
    ]);

    // Find the furthest leaf node in a different direction for the key
    let roomWithKeyId = findFurthestLeafNode(
      entranceRoomId,
      excludedRoomsForKey,
      graph,
      mainLockedDoor,
    );

    if (
      roomWithKeyId &&
      roomWithKeyId !== entranceRoomId &&
      roomWithKeyId !== roomWithLockedDoor.id
    ) {
      // Update the room with the key
      let roomWithKey = rooms[roomWithKeyId];
      roomWithKey.hasKeyForRoomId = roomWithLockedDoor.id;
      roomWithKey.roomType = 'key';

      // Update the room with the locked door
      roomWithLockedDoor.hasKeyInRoomId = roomWithKeyId;

      // Strip any locked-door doorways from the key room. A key room
      // with its own pickable locked door is confusing: the LLM
      // conflates that lock with the quest-gate the key is for, and
      // the GM sees a key + a lock in the same chamber and assumes
      // they belong together. Converting the locked door to a regular
      // door costs us a pickable-lock challenge somewhere, but the
      // gain in semantic clarity is worth it. Both sides of the
      // doorway need updating — connected rooms store their own
      // doorway entries pointing back here, and they'd otherwise
      // still report this opening as locked.
      if (Array.isArray(roomWithKey.doorways)) {
        for (const doorway of roomWithKey.doorways) {
          if (!doorway || doorway.type !== 'locked-door') continue;
          doorway.type = 'door';
          const connectedRoom = rooms[doorway.connectedRoomId];
          if (connectedRoom && Array.isArray(connectedRoom.doorways)) {
            for (const otherDoorway of connectedRoom.doorways) {
              if (
                otherDoorway
                && otherDoorway.connectedRoomId === roomWithKey.id
                && otherDoorway.type === 'locked-door'
              ) {
                otherDoorway.type = 'door';
              }
            }
          }
        }
      }

      // Strip any pickable locks on the entrance→key path. Since the
      // BFS now walks through pickable locks (so the key can land at
      // the true deepest leaf), the chosen path may cross one or more
      // pickable locks. Those locks would force the player to pick to
      // fetch the key — a stealth quest-gate. Convert them to plain
      // doors so the critical path stays clean.
      const entranceToKeyPath = findShortestPath(
        graph,
        entranceRoomId,
        roomWithKeyId,
      );
      stripLocksOnPath(entranceToKeyPath);

      // Assign the boss room. Start by finding the furthest leaf
      // beyond the obstacle; then "knock down the wall" — promote
      // the boss to the LARGEST room on the path from the obstacle
      // to that leaf. The original leaf, if smaller, becomes an
      // unassigned room behind the boss (naturally reads as a
      // treasure niche or lore alcove). Climax should breathe — a
      // tiny terminal closet for the boss is anticlimactic.
      let leafBeyondObstacle = findFurthestLeafNode(
        mainLockedDoor.to,
        new Set([mainLockedDoor.from, entranceRoomId, roomWithKeyId]),
        graph,
        null,
      );
      let bossRoomId = leafBeyondObstacle;
      if (leafBeyondObstacle) {
        bossRoomId = pickLargestRoomOnPath(
          mainLockedDoor.to,
          leafBeyondObstacle,
          graph,
          rooms,
        );
      }

      assignBossRoom(bossRoomId, rooms, [
        entranceRoomId,
        roomWithLockedDoor.id,
        roomWithKeyId,
      ]);

      // Same critical-path discipline for the obstacle→boss path —
      // strip any pickable locks the BFS may have walked through to
      // reach the deepest leaf. The boss should be reachable from the
      // obstacle's far side with no extra picking required.
      const obstacleToBossPath = findShortestPath(
        graph,
        mainLockedDoor.to,
        bossRoomId,
      );
      stripLocksOnPath(obstacleToBossPath);

      // Assign setback room on the path from entrance to the KEY
      // room. Pacing reason: the setback hits the party on the way
      // to fetch the key — a meaningful trial before the moment of
      // triumph (getting the key) and the climax (defeating the boss
      // beyond the obstacle). Putting setbacks on the path to the
      // boss instead would suffer the party right before the climax,
      // diluting the boss reveal.
      //
      // FALLBACK: when entrance→key has no viable candidate (path too
      // short, every inner room is critical), drop the "no setback
      // before boss" preference and assign on the entrance→boss path.
      // The boss-path version uses preferEarly so the setback lands as
      // close to the entrance as possible — minimizing the "suffer
      // right before the climax" effect that motivated the original
      // rule. A setback somewhere is better than no setback at all;
      // an early-path setback reads as "the dungeon bit us going in,"
      // not as "the dungeon punished us at the threshold."
      const pathToKeyRoom = findShortestPath(
        graph,
        entranceRoomId,
        roomWithKeyId,
      );
      const setbackAssigned = assignSetbackRoom(pathToKeyRoom, rooms);
      if (!setbackAssigned) {
        const pathToBoss = findShortestPath(
          graph,
          entranceRoomId,
          bossRoomId,
        );
        assignSetbackRoom(pathToBoss, rooms, { preferEarly: true });
      }

      // Pair fully established: obstacle room is set up, key room is
      // chosen, both ends point at each other, boss landed beyond the
      // obstacle. The caller can stop retrying.
      obstacleKeyPairEstablished = true;
    } else {
      // No suitable room found for the key; skip key and obstacle assignment
      // Reset the requiresKey and hasKeyInRoomId properties.
      delete roomWithLockedDoor.requiresKey;
      delete roomWithLockedDoor.hasKeyInRoomId;
      delete mainLockedDoor.doorway.requiresKey;
      delete roomWithLockedDoor.keyDoor;
      // Also clear the roomType stamp that was set earlier (line ~432).
      // Without this, the room renders as `obstacle` in the prompt
      // dispatcher even though there's no quest-gate — confusing the
      // LLM and producing a room that talks about a non-existent key.
      // The later `assignRoomTypes` pass classifies it freshly.
      delete roomWithLockedDoor.roomType;

      // Assign the boss room without considering the locked door
      let bossRoomId = findFurthestLeafNode(
        entranceRoomId,
        new Set([entranceRoomId]),
        graph,
        null,
      );

      assignBossRoom(bossRoomId, rooms, [entranceRoomId]);

      // Assign setback room on the path from entrance to boss room
      let pathToBossRoom = findShortestPath(graph, entranceRoomId, bossRoomId);
      assignSetbackRoom(pathToBossRoom, rooms);
    }
  } else {
    // No main locked door, or it's connected to entrance; assign boss room
    let bossRoomId = findFurthestLeafNode(
      entranceRoomId,
      new Set([entranceRoomId]),
      graph,
      null,
    );

    assignBossRoom(bossRoomId, rooms, [entranceRoomId]);

    // Assign setback room on the path from entrance to boss room
    let pathToBossRoom = findShortestPath(graph, entranceRoomId, bossRoomId);
    assignSetbackRoom(pathToBossRoom, rooms);
  }

  // Cap the number of pickable locked doors. With one already spent
  // on the quest-gate (when established), at most one MORE pickable
  // lock survives — extras get converted to regular doors. GM-side
  // reason: players treat every locked door as a "promise of payoff,"
  // and three or four locks in a small dungeon dilutes the signal so
  // none of them feel meaningful. One quest-gate + one optional
  // pickable preserves the texture without the fatigue.
  capExtraPickableLocks(roomsArray, obstacleKeyPairEstablished);

  // If path-stripping and the cap together eliminated every pickable
  // lock from the dungeon, the dungeon loses all "pick a lock for a
  // side reward" texture. Promote one leaf-room's plain door to a
  // locked-door to maintain the "1 quest-gate + 1 pickable" cap
  // intent. Silent no-op when at least one pickable already exists
  // or when no suitable leaf is available.
  ensureAtLeastOnePickableLock(roomsArray);

  // Assign room types
  assignRoomTypes(roomsArray, entranceRoomId, graph, rooms);

  // Tag dead-end leaf rooms with a small random "payoff seed" so the
  // room prompt has something concrete to discover. Without this,
  // dead-end rooms tend to feel like padding — the LLM generates them
  // as atmosphere with no specific reward, and the GM has to invent
  // a reason for the party to have come there. The tag is consumed
  // downstream by the room prompts via the same pending-content-seeds
  // substrate that handles clue distribution.
  tagDeadEndLeavesWithPayoff(roomsArray);

  // Assign special shapes to notable rooms (circular, domed, capsule)
  assignRoomShapes(roomsArray);

  // Sync the mutated array back onto the wrapper object form (the
  // input was either `{ rooms: [...] }` or a bare array — both are
  // mutated in place above, so the return is primarily for the
  // success signal).
  if (dungeonData.rooms) {
    dungeonData.rooms = roomsArray;
  }
  return { obstacleKeyPairEstablished };
}

/**
 * Cap and filter pickable locked doors.
 *
 * Two design rules drive the placement:
 *
 *   1. **Locks must gate dead-end pockets, not the critical path.**
 *      A lock A↔B is "valid" only when removing it disconnects the
 *      dungeon (graph-bridge edge). Non-bridge locks are either
 *      shortcuts between main-path rooms (annoying) or stealth
 *      quest-gates that force a pick (broken pacing); convert them
 *      all to plain doors regardless of cap.
 *   2. **Prefer leaf-gating among valid locks.** A leaf is a
 *      single-doorway room. A lock gating exactly one leaf (pocket
 *      size === 1) is the ideal "side discovery" pattern — players
 *      pick it for a small specific payoff. Multi-room dead-end
 *      chains are second-best (still a valid pocket, just longer).
 *
 * The quest-gate (doorway with `requiresKey: true`) is preserved
 * untouched when present and doesn't count against the cap.
 *
 * Among valid (bridge) locks: leaf-gating wins over non-leaf-gating;
 * within each tier, larger pocket wins (more payoff for the same
 * picking cost); final tiebreak is deeper in the dungeon.
 *
 * @param {Array} roomsArray
 * @param {boolean} pairEstablished — whether a quest-gate exists.
 */
function capExtraPickableLocks(roomsArray, pairEstablished) {
  // Group locked-door doorways into (roomA, roomB) pairs.
  const pairs = new Map();
  for (const room of roomsArray) {
    if (!room || !Array.isArray(room.doorways)) continue;
    for (const doorway of room.doorways) {
      if (!doorway || doorway.type !== 'locked-door') continue;
      const a = Math.min(room.id, doorway.connectedRoomId);
      const b = Math.max(room.id, doorway.connectedRoomId);
      const key = `${a}-${b}`;
      if (!pairs.has(key)) {
        pairs.set(key, { a, b, doorways: [] });
      }
      pairs.get(key).doorways.push(doorway);
    }
  }

  // Identify the quest-gate pair (any doorway with requiresKey: true).
  // When the obstacle/key pair is established, this pair is preserved
  // untouched and doesn't count against the cap.
  let questGateKey = null;
  if (pairEstablished) {
    for (const [key, entry] of pairs.entries()) {
      if (entry.doorways.some(d => d.requiresKey === true)) {
        questGateKey = key;
        break;
      }
    }
  }

  const otherPairs = Array.from(pairs.entries())
    .filter(([key]) => key !== questGateKey);

  if (otherPairs.length <= 1) return; // Nothing to cap.

  // Build a simple adjacency for the "gated region size" calculation.
  // We re-walk the rooms-array here rather than reusing the closure
  // graph (since capExtraPickableLocks lives outside addDungeonDetails).
  const adj = new Map();
  for (const room of roomsArray) {
    if (!room || !Array.isArray(room.doorways)) continue;
    if (!adj.has(room.id)) adj.set(room.id, []);
    for (const doorway of room.doorways) {
      if (!doorway || doorway.connectedRoomId === undefined) continue;
      adj.get(room.id).push(doorway.connectedRoomId);
    }
  }

  function countReachableExcludingLock(startId, lockA, lockB) {
    const visited = new Set([startId]);
    const queue = [startId];
    while (queue.length > 0) {
      const id = queue.shift();
      const edges = adj.get(id) || [];
      for (const toId of edges) {
        // Skip the specific lock edge we're "closing off."
        if ((id === lockA && toId === lockB) || (id === lockB && toId === lockA)) continue;
        if (!visited.has(toId)) {
          visited.add(toId);
          queue.push(toId);
        }
      }
    }
    return visited.size;
  }

  // Bridge detection: walk from lockA without using the A↔B edge.
  // If lockB is reachable through other edges, the lock is NOT a
  // bridge — there's a cycle between the two endpoints, so removing
  // the lock doesn't disconnect anything. Non-bridge locks fail the
  // "must gate a dead-end pocket" rule.
  function isBridgeLock(lockA, lockB) {
    const visited = new Set([lockA]);
    const queue = [lockA];
    while (queue.length > 0) {
      const id = queue.shift();
      if (id === lockB) return false;
      const edges = adj.get(id) || [];
      for (const toId of edges) {
        if ((id === lockA && toId === lockB) || (id === lockB && toId === lockA)) continue;
        if (!visited.has(toId)) {
          visited.add(toId);
          queue.push(toId);
        }
      }
    }
    return true;
  }

  // Partition into bridges and non-bridges. Score bridges for
  // ranking; non-bridges always get converted regardless of cap.
  const bridges = [];
  const nonBridges = [];
  for (const [key, entry] of otherPairs) {
    if (!isBridgeLock(entry.a, entry.b)) {
      nonBridges.push({ key, entry });
      continue;
    }
    const sideA = countReachableExcludingLock(entry.a, entry.a, entry.b);
    const sideB = countReachableExcludingLock(entry.b, entry.a, entry.b);
    const pocketSize = Math.min(sideA, sideB);
    bridges.push({
      key,
      entry,
      pocketSize,
      // pocketSize === 1 means the smaller side is a true leaf: a
      // single-doorway room reachable only through this lock. That's
      // the textbook "lock gates a side discovery" pattern.
      isLeafGating: pocketSize === 1,
      // Tiebreaker: pair-id sum approximates "deeper in dungeon."
      depthScore: entry.a + entry.b,
    });
  }

  // Always convert non-bridge locks. These sit on the entrance↔key
  // or obstacle↔boss critical path (or shortcut between main-path
  // rooms), where a pickable lock is either redundant or a stealth
  // quest-gate. Either way it doesn't belong.
  for (const { entry } of nonBridges) {
    for (const doorway of entry.doorways) {
      doorway.type = 'door';
    }
  }

  if (bridges.length === 0) return;

  // Sort bridges: leaf-gating first, then larger pocket (more payoff
  // for the same picking cost), then deeper in dungeon.
  bridges.sort((x, y) => {
    if (x.isLeafGating !== y.isLeafGating) {
      return x.isLeafGating ? -1 : 1;
    }
    if (y.pocketSize !== x.pocketSize) return y.pocketSize - x.pocketSize;
    return y.depthScore - x.depthScore;
  });

  // Keep first (best-scoring bridge); convert the rest.
  const toConvert = bridges.slice(1);
  for (const { entry } of toConvert) {
    for (const doorway of entry.doorways) {
      doorway.type = 'door';
    }
  }
}

/**
 * If the dungeon ended up with zero pickable locks after path-
 * stripping and the cap, promote one leaf room's plain door to a
 * locked-door. Keeps the "1 quest-gate + 1 pickable" texture
 * intact — without this, dungeons where the BFS path crosses every
 * generated lock lose all "pick a side door for a reward" beats.
 *
 * Eligible candidates: single-doorway rooms with no special role
 * already assigned (entrance/boss/key/obstacle/setback are off-
 * limits; assignRoomTypes hasn't run yet so purpose/living/etc.
 * slots are still null). Doorway must be a plain `door` — secret,
 * merged, corridor, and stairs have their own visual/semantic
 * meaning and would muddle the prompt when relabeled. Picks the
 * candidate with the largest area for a more meaningful side
 * discovery; silent no-op if nothing qualifies.
 *
 * @param {Array} roomsArray
 */
function ensureAtLeastOnePickableLock(roomsArray) {
  // Detect pickable locks by PAIR, not by individual doorway. The
  // quest-gate's `requiresKey: true` flag lives ONLY on the
  // obstacle-side doorway, not the back-edge in the locked-room.
  // A per-doorway check would treat that back-edge as a pickable
  // lock and skip the promotion. So: group locked-door doorways by
  // {min,max} room-id pair; a pair is the quest-gate if ANY of its
  // doorways carries requiresKey: true.
  const pairsByKey = new Map();
  for (const room of roomsArray) {
    if (!room || !Array.isArray(room.doorways)) continue;
    for (const doorway of room.doorways) {
      if (doorway?.type !== 'locked-door') continue;
      const lo = Math.min(room.id, doorway.connectedRoomId);
      const hi = Math.max(room.id, doorway.connectedRoomId);
      const key = `${lo}-${hi}`;
      const prev = pairsByKey.get(key) || false;
      pairsByKey.set(key, prev || doorway.requiresKey === true);
    }
  }
  for (const [, isQuestGate] of pairsByKey) {
    if (!isQuestGate) return; // a pickable lock already exists
  }

  const SPECIAL_TYPES = new Set([
    'entrance', 'boss', 'obstacle', 'key', 'setback',
  ]);

  // Local area helper — mirrors `roomArea` inside addDungeonDetails;
  // duplicated since this function lives outside that closure.
  function areaOf(room) {
    if (!room) return 0;
    if (Array.isArray(room.sections)) {
      return room.sections.reduce(
        (sum, s) => sum + (s.width || 0) * (s.height || 0),
        0,
      );
    }
    return (room.width || 0) * (room.height || 0);
  }

  const candidates = roomsArray.filter((r) => {
    if (!r || !Array.isArray(r.doorways)) return false;
    if (r.doorways.length !== 1) return false;
    if (SPECIAL_TYPES.has(r.roomType)) return false;
    return r.doorways[0]?.type === 'door';
  });
  if (candidates.length === 0) return;

  candidates.sort((a, b) => areaOf(b) - areaOf(a));
  const chosen = candidates[0];
  const chosenDoorway = chosen.doorways[0];
  chosenDoorway.type = 'locked-door';

  // Flip the back-edge on the connected room so both sides report
  // the same lock state — without this the connected room renders
  // the opening as a plain door even though this room sees it
  // locked.
  const connectedRoom = roomsArray.find(
    (r) => r && r.id === chosenDoorway.connectedRoomId,
  );
  if (connectedRoom && Array.isArray(connectedRoom.doorways)) {
    for (const otherDoorway of connectedRoom.doorways) {
      if (
        otherDoorway
        && otherDoorway.connectedRoomId === chosen.id
        && otherDoorway.type === 'door'
      ) {
        otherDoorway.type = 'locked-door';
      }
    }
  }
}

/**
 * Random payoff "seed kinds" for dead-end leaf rooms. Each entry is a
 * short prompt-side hint the LLM weaves into the room's read-aloud
 * and dm_notes as a small discovery — NOT a major reward, just
 * enough that a party who explores the leaf feels something specific
 * was waiting for them. Picked uniformly at random per leaf at
 * dungeon-detail time, so each generation rolls a fresh mix.
 *
 * Kept short and abstract on purpose — the LLM does the specific
 * dressing (a "small cache" becomes a specific tucked-away pouch
 * appropriate to the dungeon's register).
 */
const LEAF_PAYOFF_SEEDS = [
  'A small, specific cache — a hidden pouch of coins, a single useful tool, a flask of something useful, a rolled scroll, a folded note. Modest scale; specific contents.',
  'A lore fragment that hints at the dungeon\'s history — a torn page, a carved name, a half-faded mural, a discarded letter. Specific to this dungeon\'s overview, NOT the boss.',
  'A mundane but evocative discovery — a long-dead body in a meaningful pose, forgotten supplies, a child\'s toy, abandoned tools mid-task. Says something about what happened here.',
  'A foreshadowing detail that hints at what lies deeper — a sound carried from elsewhere, a smell drifting in, a small physical sign of the boss or the dungeon\'s central threat.',
  'An environmental oddity that has no mechanical payoff but rewards investigation — a small bound spirit, a weather pocket, an unusual nest, a patch of strange plant.',
  'A minor mechanical curiosity — a non-magical device, a half-built contraption, a working but trivial mechanism. The kind of thing players linger over without it changing the encounter calculus.',
];

/**
 * Tag dead-end leaf rooms with a randomly-chosen payoff seed. A
 * "dead-end leaf" is a room with exactly one doorway whose roomType
 * is NOT one of the special roles (entrance/boss/key/obstacle/
 * setback/locked/secret). The tag is written into the existing
 * `pendingContentSeeds` array with kind: 'leaf_payoff', so the room
 * prompt's existing consumer hook surfaces it the same way clue
 * seeds get surfaced.
 *
 * Mutates `room.pendingContentSeeds`. Idempotent in spirit — a leaf
 * already carrying a leaf_payoff seed gets skipped (defensive in case
 * this gets called twice or after manual edits).
 *
 * @param {Array} roomsArray
 */
function tagDeadEndLeavesWithPayoff(roomsArray) {
  // 'locked' and 'secret' rooms ARE eligible — both prompt handlers
  // consume pendingContentSeeds, so a payoff seed reinforces the
  // intended pattern: pick the lock / find the secret, get a small
  // specific reward. Only roles whose content is wholly determined
  // by other parts of the procgen (entrance scaffolding, the boss
  // statblock, the quest-gate obstacle, the key item, the setback
  // challenge) are excluded.
  const SPECIAL_TYPES = new Set([
    'entrance', 'boss', 'obstacle', 'key', 'setback',
  ]);
  for (const room of roomsArray) {
    if (!room || !Array.isArray(room.doorways)) continue;
    if (room.doorways.length !== 1) continue;
    if (SPECIAL_TYPES.has(room.roomType)) continue;
    // Skip if the room already carries a leaf_payoff seed.
    if (Array.isArray(room.pendingContentSeeds)
        && room.pendingContentSeeds.some(s => s?.kind === 'leaf_payoff')) {
      continue;
    }
    const seedContent = LEAF_PAYOFF_SEEDS[
      Math.floor(Math.random() * LEAF_PAYOFF_SEEDS.length)
    ];
    if (!Array.isArray(room.pendingContentSeeds)) {
      room.pendingContentSeeds = [];
    }
    room.pendingContentSeeds.push({
      content: seedContent,
      originRoomId: null,
      kind: 'leaf_payoff',
    });
  }
}

/**
 * Assign a setback room on the given path, if possible.
 *
 * Returns true when a setback was stamped, false when there's no
 * viable candidate (path too short, or every inner room is already a
 * critical role). The boolean lets the caller chain a fallback path
 * — when entrance→key has no candidates, fall back to entrance→boss.
 *
 * @param {Array<number>} path - room ids from start to destination.
 * @param {Object} rooms - room map keyed by id.
 * @param {{ preferEarly?: boolean }} [options]
 *        preferEarly=true picks the EARLIEST viable candidate (closest
 *        to entrance) instead of the middle. Used on the boss-path
 *        fallback so the setback doesn't land right before the boss
 *        reveal — "we don't want the party to suffer just before they
 *        meet the boss" is the pacing rule.
 * @returns {boolean}
 */
function assignSetbackRoom(path, rooms, options = {}) {
  if (!path || path.length < 3) return false;

  // Critical roomTypes can NEVER be overwritten by a setback stamp —
  // doing so used to silently delete the obstacle marker when the
  // entrance→key path passed through the obstacle room (which can
  // happen in cyclic topologies where the shortest path crosses the
  // quest-gate). Skip those rooms during candidate selection so the
  // setback lands on a neutral room or doesn't land at all.
  const PROTECTED_TYPES = new Set(['entrance', 'boss', 'obstacle', 'key']);

  // Exclude endpoints (entrance, key/boss). Then filter out any
  // already-assigned critical room from the inner path. The filter
  // step is the guard against the obstacle-overwrite bug.
  let potentialSetbackRooms = path
    .slice(1, -1)
    .filter(roomId => !PROTECTED_TYPES.has(rooms[roomId]?.roomType));

  if (potentialSetbackRooms.length === 0) {
    return false;
  }

  // Default: middle for symmetric pacing on the entrance→key path.
  // preferEarly: first viable room — used on the entrance→boss
  // fallback to put as much distance as possible between the setback
  // and the boss reveal.
  const setbackRoomId = options.preferEarly
    ? potentialSetbackRooms[0]
    : potentialSetbackRooms[Math.floor(potentialSetbackRooms.length / 2)];

  if (rooms[setbackRoomId]) {
    rooms[setbackRoomId].roomType = 'setback';
    return true;
  }
  return false;
}
