/**
 * Secure Storage Utilities
 *
 * Obfuscates rate limit data in localStorage to make manipulation more difficult.
 * Not cryptographically secure - just annoying enough to deter casual tampering.
 */

// Simple non-cryptographic hash for integrity checking
// Not meant to be secure, just annoying to reverse-engineer
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

// Obfuscated field names (looks like minified code variables)
const FIELDS = {
  COUNT: '_gc',      // generation count
  TIME: '_ft',       // first time
  HASH: '_h',        // integrity hash
  SALT: 'x7k9m2p',   // salt for hash (change this to randomize)
};

/**
 * Read rate limit data with integrity checking
 * Returns { count, firstTime } or null if tampered/missing
 */
export function readRateLimitData() {
  try {
    const stored = JSON.parse(localStorage.getItem('monsters'));

    if (!stored || typeof stored !== 'object') {
      return null;
    }

    // Check if obfuscated fields exist
    const count = stored[FIELDS.COUNT];
    const time = stored[FIELDS.TIME];
    const hash = stored[FIELDS.HASH];

    if (count === undefined || time === undefined || hash === undefined) {
      // Missing fields - start fresh
      return null;
    }

    // Validate integrity
    const expectedHash = simpleHash(`${count}|${time}|${FIELDS.SALT}`);

    if (hash !== expectedHash) {
      // Tampered! Return null to trigger reset
      console.warn('Rate limit data integrity check failed - possible tampering detected');
      return null;
    }

    return {
      count: parseInt(count) || 0,
      firstTime: parseInt(time) || null,
    };
  } catch (e) {
    return null;
  }
}

/**
 * Write rate limit data with integrity hash
 */
export function writeRateLimitData(count, firstTime) {
  try {
    let stored;
    try {
      stored = JSON.parse(localStorage.getItem('monsters')) || {};
    } catch (parseError) {
      // If parsing fails (corrupted data), start with fresh object
      stored = {};
    }

    // Ensure stored is an object (in case it was parsed as a string or other type)
    if (typeof stored !== 'object' || stored === null || Array.isArray(stored)) {
      stored = {};
    }

    // Preserve other fields (actual monster data)
    // Only update the obfuscated rate limit fields
    stored[FIELDS.COUNT] = count.toString();
    stored[FIELDS.TIME] = firstTime ? firstTime.toString() : null;
    stored[FIELDS.HASH] = simpleHash(`${count}|${firstTime}|${FIELDS.SALT}`);

    localStorage.setItem('monsters', JSON.stringify(stored));
  } catch (e) {
    console.error('Failed to write rate limit data:', e);
  }
}

/**
 * Clear rate limit data (for testing)
 */
export function clearRateLimitData() {
  try {
    const stored = JSON.parse(localStorage.getItem('monsters')) || {};
    delete stored[FIELDS.COUNT];
    delete stored[FIELDS.TIME];
    delete stored[FIELDS.HASH];

    // Also delete old format fields if they exist
    delete stored.generationCount;
    delete stored.firstGenerationTime;

    localStorage.setItem('monsters', JSON.stringify(stored));
  } catch (e) {
    // Ignore errors
  }
}
