/**
 * Thin wrapper around the page's gtag — no analytics library, no plugin.
 *
 * `window.gtag?.(...)` silently no-ops wherever gtag isn't loaded: dev (Vite,
 * no GA tag) and any environment without the WordPress GA4 base tag. So every
 * call site can fire unconditionally without guarding.
 *
 * Measurement, not surveillance: every param passed here must be content-free —
 * an action, a navigation, a closed-vocabulary value (a fixed public category),
 * or a boolean (was a field used: yes/no). Never user-typed text. Free-text
 * fields are logged only as used/unused, never their contents. This keeps us
 * inside Google's PII rule by construction. See analytics-phase0-findings.md.
 *
 * @param {string} action   GA4 event name (e.g. 'generate', 'tab_view').
 * @param {object} [params] Event params (GA4 custom dimensions). Content-free.
 */
export function trackEvent(action, params = {}) {
  window.gtag?.('event', action, params);
}
