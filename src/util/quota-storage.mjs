// Signed wrapper for per-domain counters with a 24h reset window.
// State lives nested inside an existing user-data localStorage key
// (the "host"); deleting the host costs the user their saved work,
// so resetting the counter has a real cost beyond a single click.

const K = 'cdr.q.v1.b3f7a2';
const VERSION = 1;
const HEX = '0123456789abcdef';

// Each domain identifies the localStorage key it lives inside (host)
// and the nested field it occupies. Sharing a host across domains is
// fine; reads/writes preserve the other fields.
const DOMAINS = {
  statblock:    { host: 'monsters', field: '_q' },
  'quest-hook': { host: 'monsters', field: '_qh' },
  lore:         { host: 'monsters', field: '_lr' },
};

// Field names callers writing the same host key must preserve when
// they merge their own data back. Used by save sites in
// StatblockGenerator.vue so generating + saving don't clobber each
// other's writes.
export const QUOTA_FIELDS = Object.freeze(
  Array.from(new Set(Object.values(DOMAINS).map((d) => d.field)))
);

// Pre-Pillar-B users have these as top-level fields on the host key.
// On read, treat their presence (with no `_q*` field) as a one-time
// migration → fresh state, no soft-recovery cooldown.
const LEGACY_FIELDS = ['generationCount', 'firstGenerationTime'];

// Field names the wrapper owns on the host. Consumers iterating the
// host blob to render user data, or merging in-memory state on save,
// must filter these out so the wrapper's bookkeeping doesn't get
// re-written from stale in-memory state (which would resurrect
// legacy fields after they were stripped on migration).
export const RESERVED_HOST_FIELDS = Object.freeze([
  ...Object.values(DOMAINS).map((d) => d.field),
  ...LEGACY_FIELDS,
]);

function getDomain(domain) {
  const cfg = DOMAINS[domain];
  if (!cfg) throw new Error(`Unknown quota domain: ${domain}`);
  return cfg;
}

function getStorage() {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  return window.localStorage;
}

function readHost(host) {
  const storage = getStorage();
  if (!storage) return null;
  let raw;
  try { raw = storage.getItem(host); } catch { return null; }
  if (!raw) return {};
  let parsed;
  try { parsed = JSON.parse(raw); } catch { return null; }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
  return parsed;
}

function writeHost(host, value) {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(host, JSON.stringify(value));
  } catch {
    // storage full or disabled — silent.
  }
}

function bytesToHex(buf) {
  const view = new Uint8Array(buf);
  let out = '';
  for (let i = 0; i < view.length; i++) {
    out += HEX[(view[i] >> 4) & 0xf] + HEX[view[i] & 0xf];
  }
  return out;
}

async function sign(domain, count, time) {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle || typeof TextEncoder === 'undefined') {
    return 'x';
  }
  const payload = `${domain}|${VERSION}|${count}|${time}|${K}`;
  const buf = await subtle.digest('SHA-256', new TextEncoder().encode(payload));
  return bytesToHex(buf);
}

function hasNonQuotaUserData(stored) {
  for (const key of Object.keys(stored)) {
    if (QUOTA_FIELDS.includes(key)) continue;
    if (LEGACY_FIELDS.includes(key)) continue;
    return true;
  }
  return false;
}

// Build a fresh signed payload for a domain. Used by the one-time
// legacy migration path so all three domains' fields land on the host
// in a single write — otherwise a partial migration leaves the
// remaining domains tripping the recovery branch on their first read.
async function freshSignedPayload(domain) {
  return {
    c: 0,
    t: null,
    v: VERSION,
    s: await sign(domain, 0, null),
  };
}

// Migrate every domain that shares this host to a fresh state and
// strip any legacy top-level quota fields. Called once on first read
// after a deploy that crosses Pillar B; idempotent because subsequent
// reads see the populated quota fields and never re-enter this path.
async function migrateLegacy(host, stored) {
  for (const [domain, cfg] of Object.entries(DOMAINS)) {
    if (cfg.host !== host) continue;
    if (stored[cfg.field]) continue;
    stored[cfg.field] = await freshSignedPayload(domain);
  }
  for (const key of LEGACY_FIELDS) {
    if (key in stored) delete stored[key];
  }
  writeHost(host, stored);
}

/**
 * Read the quota state for a domain.
 *
 * Return shapes:
 *   - `{ count: 0, firstGenTime: null, valid: true }` — host key
 *     missing, no quota field yet, or pre-Pillar-B user (has legacy
 *     top-level quota fields). The latter two count as "fresh" so
 *     the user gets one-time access without a stuck error state.
 *   - `{ count, firstGenTime, valid: true }` — signature checks.
 *   - `{ count: recoverAtCount, firstGenTime: now, valid: true }` —
 *     host has user data but no quota field, AND `recoverAtCount`
 *     was provided. Soft-recovery: the wrapper writes an at-cap
 *     state back so the gate naturally surfaces the standard
 *     rate-limit toast. Path is taken when a user manually deletes
 *     `_q` while keeping their saves.
 *   - `{ valid: false }` — signature does NOT check, schema
 *     mismatch, or malformed payload. Callers should refuse to act
 *     and not rewrite the stored state.
 *
 * @param {string} domain
 * @param {object} [options]
 * @param {number} [options.recoverAtCount] - When the host has user
 *   data but no quota field, write this count + the current time
 *   as a recovered state and return it. Typically the gate's MAX
 *   so the user lands at "you've hit the daily limit" instead of
 *   "tracking data couldn't be read."
 */
export async function readQuota(domain, options = {}) {
  const { host, field } = getDomain(domain);
  const stored = readHost(host);
  if (stored === null) {
    return { valid: false };
  }
  const payload = stored[field];
  if (payload) {
    if (typeof payload !== 'object' || Array.isArray(payload)) {
      return { valid: false };
    }
    const { c, t, v, s } = payload;
    if (
      typeof c !== 'number' ||
      typeof s !== 'string' ||
      v !== VERSION ||
      (t !== null && typeof t !== 'number')
    ) {
      return { valid: false };
    }
    const expected = await sign(domain, c, t);
    if (s !== expected) {
      return { valid: false };
    }
    return { count: c, firstGenTime: t, valid: true };
  }

  // No quota field for this domain yet. Three sub-cases:

  // 1. Pre-Pillar-B user with legacy top-level fields on the host.
  //    Only honor the migration when NO quota field exists on the
  //    host yet — once we're past Pillar B (any of _q/_qh/_lr is
  //    present), pasting legacy fields back into devtools must not
  //    re-trigger migration. Without this gate, a user who hit their
  //    cap could delete `_q`, paste `generationCount: '0'`, and get a
  //    fresh window for two clicks of effort.
  const isLegacy =
    stored.generationCount !== undefined ||
    stored.firstGenerationTime !== undefined;
  const anyQuotaField = QUOTA_FIELDS.some((f) => stored[f] !== undefined);
  if (isLegacy && !anyQuotaField) {
    await migrateLegacy(host, stored);
    return { count: 0, firstGenTime: null, valid: true };
  }

  // 2. User has saved data on the host but no quota field — typically
  //    because they deleted it in DevTools. Recover to at-cap so the
  //    gate surfaces the standard "you've hit the daily limit" UX
  //    rather than a stuck error. Only applied when the caller opts in
  //    via `recoverAtCount`; gates whose user data lives elsewhere
  //    (quest-hook, lore) leave the option off and get fresh state.
  if (hasNonQuotaUserData(stored) && typeof options.recoverAtCount === 'number') {
    const cap = options.recoverAtCount;
    const t = Date.now();
    await writeQuota(domain, { count: cap, firstGenTime: t });
    return { count: cap, firstGenTime: t, valid: true };
  }

  // 3. Genuinely fresh — no host key, only sibling quota fields, or
  //    a caller that opts out of recovery.
  return { count: 0, firstGenTime: null, valid: true };
}

/**
 * Write the quota state for a domain. Reads the host JSON, sets the
 * signed payload at the domain's field, and writes the host back —
 * preserving any user data and any other domains' fields.
 */
export async function writeQuota(domain, { count, firstGenTime }) {
  const { host, field } = getDomain(domain);
  const stored = readHost(host);
  // If the host blob is malformed (`null`), refuse to write rather
  // than overwriting whatever's there — caller has already surfaced
  // the user-facing toast. `readHost` returns `{}` for "missing,"
  // which is fine to write into.
  if (stored === null) return;
  stored[field] = {
    c: count,
    t: firstGenTime,
    v: VERSION,
    s: await sign(domain, count, firstGenTime),
  };
  writeHost(host, stored);
}

/**
 * Lazily seed a fresh quota field for a domain if the host has no
 * payload there yet. Idempotent. Used by the premium short-circuit so
 * a Patreon-tier user accumulates a `_q*` alongside their saved data —
 * if they later lose premium, their first free-tier generation lands
 * in the normal fresh-window path instead of soft-recovery (which
 * would otherwise 24h-cooldown a lapsed patron whose folders were
 * created during their premium tenure).
 */
export async function ensureQuotaSeeded(domain) {
  const { host, field } = getDomain(domain);
  const stored = readHost(host);
  if (stored === null) return;
  if (stored[field]) return;
  await writeQuota(domain, { count: 0, firstGenTime: null });
}

/**
 * How many generations remain in the current window. Returns 0 for
 * invalid quota state so the UI doesn't display a working number
 * against suspect storage.
 */
export function remainingFromQuota(quota, cap, resetWindowMs) {
  if (!quota || quota.valid === false) return 0;
  const { count, firstGenTime } = quota;
  if (firstGenTime && Date.now() - firstGenTime >= resetWindowMs) {
    return cap;
  }
  return Math.max(0, cap - (count || 0));
}

// Test-only: surface the storage layout so the spec can target keys
// without re-deriving the mapping.
export const __TEST_ONLY__ = { VERSION, DOMAINS };
