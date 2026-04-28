// Server-side premium check for the WordPress + Patreon integration.
//
// `data-premium="true"` on #app is a hint for the first paint; it can be
// edited in DevTools. To gate generation honestly we round-trip with the
// already-existing /wp-json/kenji/v1/auth-status endpoint, which reads
// `kenji_is_premium()` server-side. The result overrides the DOM hint —
// server says false → free quota applies, regardless of what the
// attribute claims.
//
// Module-scoped cache + in-flight Promise dedup so the burst of "open the
// page, immediately mash generate" only triggers one fetch. TTL is short
// enough that revoked Patreon pledges propagate within a session, long
// enough that quota gates aren't paying network round-trips per click.

const ENDPOINT = '/wp-json/kenji/v1/auth-status';
const TTL_MS = 5 * 60 * 1000;

let cached = null;     // { premium: boolean, fetchedAt: number }
let inFlight = null;   // Promise<boolean> while a fetch is open

/**
 * Resolve the server's view of the current user's premium status.
 *
 * @param {object}  options
 * @param {boolean} options.fallback - Value to return when the fetch
 *                                     fails (network error, 5xx, etc).
 *                                     Typically the DOM-derived hint so
 *                                     legitimate users aren't punished
 *                                     for transient connectivity issues.
 * @returns {Promise<boolean>}
 */
export async function getPremiumStatus({ fallback = false } = {}) {
  if (cached && Date.now() - cached.fetchedAt < TTL_MS) {
    return cached.premium;
  }
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const res = await fetch(ENDPOINT, {
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`auth-status ${res.status}`);
      const body = await res.json();
      const premium = body?.premium === true;
      cached = { premium, fetchedAt: Date.now() };
      return premium;
    } catch {
      // Don't poison the cache on failure — next call will retry.
      return fallback;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}

// Test-only: drop cache + any in-flight request so each test starts clean.
export function __resetAuthStatusCache() {
  cached = null;
  inFlight = null;
}
