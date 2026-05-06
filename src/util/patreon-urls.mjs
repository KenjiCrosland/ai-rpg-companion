/**
 * Canonical Patreon URLs.
 *
 * `patreonTiersUrl` — direct link to the membership tiers page. Used in
 * upsell components (PatreonCallout) for the inline "See all premium
 * tiers" link inside the features list. One source of truth so a future
 * Patreon URL change is a single-line edit.
 *
 * The Patreon Connect login URL is intentionally NOT in this file — it's
 * computed per-tool because it embeds a return-redirect to the current
 * page. See each tool's `patreonLoginUrl` computed.
 */
export const patreonTiersUrl = 'https://www.patreon.com/c/ai_rpg_tookit/membership';
