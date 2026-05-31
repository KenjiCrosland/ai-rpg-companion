/**
 * logger.mjs
 *
 * Drop-in replacement for direct `console.*` use in production code.
 * API mirrors `console` exactly so migration is a textual swap:
 *
 *   import { logger } from '@/util/logger.mjs';
 *   logger.log('debug info');     // dev only — prod no-op
 *   logger.error('something bad'); // always fires
 *
 * Gating split:
 *   - `log` / `info` / `debug` — DEV ONLY. Silenced in production.
 *     Use for narrative output: "started X", "got Y", "skipping Z."
 *   - `warn` / `error`         — ALWAYS FIRE. Production errors must
 *     surface in the browser dev tools (and any future error-tracking
 *     pipeline). Silencing them means a user can hit a fatal state and
 *     nothing surfaces anywhere; that debuggability loss isn't worth
 *     a quieter prod console.
 *
 * `process.env.NODE_ENV` is the dev/prod signal — Vite's define config
 * inlines it at build time, same as the rest of this codebase
 * (`dev-premium-controls.mjs`, `dev-ai-controls.mjs`, etc.). The check
 * runs at CALL TIME, not import time, so test mocks that mutate
 * `process.env.NODE_ENV` or `console.log` work without module-cache
 * gymnastics.
 *
 * Why a wrapper at all (vs. a `// no-console` lint rule that allows
 * `console.error`): we may want to route errors through an error-tracker
 * (Sentry-style) later. Pointing every site at `logger` now means that
 * future swap is a one-file change here, not a 200-site find/replace.
 */

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export const logger = {
  log(...args) {
    if (!isProduction()) console.log(...args);
  },
  info(...args) {
    if (!isProduction()) console.info(...args);
  },
  debug(...args) {
    if (!isProduction()) console.debug(...args);
  },
  warn(...args) {
    console.warn(...args);
  },
  error(...args) {
    console.error(...args);
  },
};
