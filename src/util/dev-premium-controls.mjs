/**
 * Dev Premium Override
 *
 * Forces every tool to mount as premium for testing premium-only flows
 * (cross-tool quota bypass, save/load modal, etc.) without setting up
 * subscription state in WordPress or hand-editing each tool's HTML to
 * `data-premium="true"`.
 *
 * Override persists in localStorage so cross-tool navigation (item →
 * setting, item → dungeon) carries through — both source and
 * destination read the same flag. Production-mode bail matches the
 * other dev-* control modules: this is silently ignored in production
 * builds, so the flag in localStorage has no effect on real users.
 *
 * Console workflow:
 *   devPremium.enable()    // flip on, reload
 *   devPremium.disable()   // flip off, reload
 *   devPremium.status()    // current state
 *   devPremium.help()      // help text
 */

import { logger } from './logger.mjs';

const STORAGE_KEY = 'dev-premium-override';

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function overrideActive() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Compute the effective premium boolean for a mount. Honors:
 *   - the entry's `withPremium` flag (production gate),
 *   - the `data-premium` attribute on #app (WordPress subscription state),
 *   - the dev-mode localStorage override (only in non-production builds).
 *
 * Production builds short-circuit before the override check so the flag
 * cannot be enabled in production by a curious user.
 */
export function getEffectivePremium({ withPremium, el }) {
  const dataPremium = !!(withPremium && el?.dataset?.premium === 'true');
  if (isProduction()) return dataPremium;
  if (overrideActive()) return true;
  return dataPremium;
}

/**
 * Initialize the `window.devPremium` console helper. Idempotent.
 * Called from `entries/base.js` so the controls are available on
 * every tool page (cross-tool nav testing).
 */
export function initDevPremiumControls() {
  if (isProduction()) return;
  if (typeof window === 'undefined') return;
  if (window.devPremium) return; // idempotent across re-mounts

  window.devPremium = {
    enable() {
      localStorage.setItem(STORAGE_KEY, 'true');
      logger.log('✅ Premium override ENABLED. Reload the page to apply.');
    },

    disable() {
      localStorage.removeItem(STORAGE_KEY);
      logger.log('🔄 Premium override DISABLED. Reload the page to apply.');
    },

    status() {
      const on = overrideActive();
      logger.log(on ? '✅ Premium override ENABLED' : '⚪ Premium override DISABLED');
      return on;
    },

    help() {
      logger.log(`
💎 Premium Override (dev only)
===============================

Forces every tool to mount as premium. Survives navigation, so item →
setting / item → dungeon flows can be exercised end-to-end as a
premium user without subscription setup.

Commands:
  devPremium.enable()    - Force premium=true on all tool mounts
  devPremium.disable()   - Restore default (data-premium attribute)
  devPremium.status()    - Check current override state
  devPremium.help()      - This help

Persists in localStorage. Disabled in production builds — flag is
silently ignored.

Reload the page after changing state.
      `);
    },
  };

  const on = overrideActive();
  logger.log(
    '💎 Premium override loaded%s. Type devPremium.help() for commands.',
    on ? ' (currently ENABLED — all tools render as premium)' : '',
  );
}
