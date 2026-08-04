/**
 * Launch trial for the statblock converter (owner call, 2026-07-31).
 *
 * For one week the converter does not touch the daily generation quota.
 * When the window closes, both the metering and the copy revert on their
 * own: `convert()` starts calling `canGenerateStatblock` again and the
 * trial line disappears. Nothing needs to be deployed on the end date.
 *
 * The clock is the visitor's, which is good enough for a promotion. The
 * worst case is someone back-dating their machine for a free conversion,
 * and defending against that is not worth a server round trip.
 *
 * To extend or re-run the trial, change END_MS and END_LABEL together.
 */

/** End of 2026-08-07 in US Pacific, the site's home timezone. */
export const CONVERTER_PROMO_END_MS = Date.parse('2026-08-08T07:00:00Z');

/**
 * Display date, hardcoded rather than derived, so every visitor reads the
 * same day regardless of their timezone.
 */
export const CONVERTER_PROMO_END_LABEL = 'August 7';

/** @param {number} [now] injectable for tests */
export function isConverterPromoActive(now = Date.now()) {
  return now < CONVERTER_PROMO_END_MS;
}
