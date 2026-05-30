// Shared validators for room-prompt JSON responses.
//
// Each validator takes a parsed `data` object and returns boolean.
// `parseAndValidateRoom` composes them: parses the JSON string and
// runs each check in order, short-circuiting on the first failure.
//
// Per-room validators in src/tools/dungeon-generator/prompts/*-room.mjs
// orchestrate these to express their specific required-key list and
// minimum dm_notes count.

export function validateRequiredKeys(data, required) {
  for (const key of required) {
    if (!(key in data)) {
      console.error(`Missing required key: ${key}`);
      return false;
    }
  }
  return true;
}

export function validateHasChallenge(data) {
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
  return true;
}

// For room types that always have a challenge (setback, boss, obstacle).
// Requires has_challenge to be true AND challenge_header to be a non-empty string.
export function validateHasChallengeRequired(data) {
  if (data.has_challenge !== true) {
    console.error('has_challenge must be true for this room type');
    return false;
  }
  if (typeof data.challenge_header !== 'string' || !data.challenge_header.trim()) {
    console.error('challenge_header must be a non-empty string');
    return false;
  }
  return true;
}

export function validateDmNotes(data, minEntries = 1) {
  if (!Array.isArray(data.dm_notes) || data.dm_notes.length < minEntries) {
    console.error(
      `dm_notes must be an array with at least ${minEntries} non-empty entries`,
    );
    return false;
  }
  if (data.dm_notes.some(p => typeof p !== 'string' || !p.trim())) {
    console.error('dm_notes entries must all be non-empty strings');
    return false;
  }
  return true;
}

export function validateOptionalDoorPreamble(data) {
  if (data.door_preamble !== undefined && typeof data.door_preamble !== 'string') {
    console.error('door_preamble, when present, must be a string');
    return false;
  }
  return true;
}

export function validateOptionalRoomMentions(data) {
  if (data.room_mentions === undefined) return true;
  if (!Array.isArray(data.room_mentions)) {
    console.error('room_mentions, when present, must be an array');
    return false;
  }
  const invalid = data.room_mentions.some(
    m => !m
      || typeof m !== 'object'
      || typeof m.area_id !== 'number'
      || typeof m.mention !== 'string'
      || !m.mention.trim(),
  );
  if (invalid) {
    console.error('room_mentions entries must be {area_id: number, mention: string}');
    return false;
  }
  return true;
}

export function parseAndValidateRoom(jsonString, checks) {
  try {
    const data = JSON.parse(jsonString);
    for (const check of checks) {
      if (!check(data)) return false;
    }
    return true;
  } catch (e) {
    console.error('Invalid JSON:', e);
    return false;
  }
}
