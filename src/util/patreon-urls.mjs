/**
 * Canonical Patreon URLs.
 *
 * `patreonTiersUrl` — direct link to the membership tiers page. Used in
 * upsell components (PatreonCallout) for the inline "See all premium
 * tiers" link inside the features list. One source of truth so a future
 * Patreon URL change is a single-line edit.
 *
 * `buildPatreonLoginUrl` — the Patreon Connect flow. This is the ONLY URL
 * that establishes a WordPress session; the tiers page above cannot. An
 * existing patron who is logged out reaches premium through this and
 * nothing else, so every upsell surface needs it alongside the pledge
 * link. It embeds a return-redirect, which is why it's a function rather
 * than a constant — an earlier revision of this file kept it out for that
 * reason, which left the same string copy-pasted as a `patreonLoginUrl`
 * computed in eight tool components and unavailable to the shared
 * DataManagerModal.
 */
export const patreonTiersUrl = 'https://www.patreon.com/c/ai_rpg_tookit/membership';

const PATREON_LOGIN_FLOW = 'https://cros.land/patreon-flow/';

/**
 * Patreon Connect login URL, returning to `returnUrl` after authorization.
 *
 * @param {string} [returnUrl] Where to land after login. Defaults to the
 *   current page, which is what all eight tool call sites passed. The
 *   default is what lets DataManagerModal use this: it renders inside
 *   every tool and has no per-tool context to thread a return URL
 *   through.
 */
export function buildPatreonLoginUrl(returnUrl) {
  const target = returnUrl ?? window.location.href;
  return `${PATREON_LOGIN_FLOW}?patreon-login=yes&patreon-final-redirect=${encodeURIComponent(target)}`;
}
