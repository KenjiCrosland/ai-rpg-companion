/**
 * Gate for cross-tool generations (item → setting, item → dungeon,
 * etc.). Shape mirrors `can-generate-statblock.mjs` so quota tracking
 * stays uniform across gates: same DOMAIN concept, same incognito
 * check, same recoverAtCount soft-recovery, same 24h reset window.
 *
 * Free combos (anything not in GATED_COMBOS) skip the gate entirely —
 * no quota touch, no incognito check, no toast. The gate is a thin
 * wrapper that short-circuits early for those, so wire-in code at
 * destination tools can call it unconditionally without thinking
 * about whether a given combo is gated.
 *
 * GATED_COMBOS is the single source of truth. Adding a new gated
 * cross-tool flow (when item→dungeon lands, or anything else) is a
 * one-line append here — no wire-in code needs to change beyond the
 * destination tool's own generate handler calling this gate with its
 * own (sourceType, destType) pair.
 */

import { detectIncognito } from 'detectincognitojs';
import { useToast } from '../composables/useToast';
import { readQuota, writeQuota, ensureQuotaSeeded } from './quota-storage.mjs';

const MAX_GENERATIONS = 5;
const RESET_WINDOW_MS = 86400000; // 24h

// Combos that count against the cross-tool quota. Format: 'source→dest'.
// Anything not listed is free (skips the gate entirely). NPCs are
// always free — they generate inline within their source tool and the
// user shouldn't be rate-limited on character work.
const GATED_COMBOS = new Set([
  'item→setting',
  // 'item→dungeon' will land here when that flow ships.
]);

function comboKey(sourceType, destType) {
  return `${sourceType}→${destType}`;
}

/**
 * Pure predicate — does this cross-tool combination count against the
 * quota? Exported so destination tools can decide pre-emptively
 * whether to surface a "cross-tool generation will count toward your
 * daily limit" affordance in the form, without running the full
 * incognito/quota pipeline.
 */
export function isGatedCrossToolCombo(sourceType, destType) {
  if (!sourceType || !destType) return false;
  return GATED_COMBOS.has(comboKey(sourceType, destType));
}

/**
 * Gate a cross-tool generation. Returns true if the user may proceed
 * (and writes the quota increment on the way out), false if blocked
 * (and surfaces the appropriate toast).
 *
 * Free combos: returns true immediately, no quota touch.
 * Premium: seeds the quota field if missing, returns true.
 * Incognito: returns false with the incognito toast.
 * At-cap before window elapsed: returns false with the rate-limit toast.
 * Invalid quota state: returns false with the tracking-data toast.
 *
 * @param {string} sourceType — 'item' | 'setting' | 'dungeon' | 'npc'
 * @param {string} destType   — 'setting' | 'dungeon' | 'npc' | 'item'
 * @param {boolean} isPremium
 * @returns {Promise<boolean>}
 */
export async function canGenerateCrossTool(sourceType, destType, isPremium) {
  // Free combos: skip the gate entirely so wire-in code doesn't have
  // to know which combos are gated.
  if (!isGatedCrossToolCombo(sourceType, destType)) return true;

  if (isPremium) {
    // Seed a fresh field if missing so a future drop to free tier
    // lands in the standard fresh-window path instead of soft-recovery.
    await ensureQuotaSeeded('cross-tool');
    return true;
  }

  const toast = useToast();
  const incognitoResult = await detectIncognito();

  if (incognitoResult.isPrivate) {
    toast.warning(
      'Free cross-tool generation requires standard browsing mode. Please switch from private browsing, or go Premium for unlimited access.',
      0,
      'incognito-warning',
    );
    return false;
  }

  // recoverAtCount opts into soft-recovery: if the host has user data
  // but `_xt` is missing, write at-cap so the gate surfaces the
  // standard rate-limit toast instead of letting a bypass through.
  // Safe to use here because the `seed-cross-tool-quota` migration
  // seeds `_xt: { c: 0 }` for every existing user before any gate
  // check runs — so any future absence of `_xt` (with host data
  // present) must be manual deletion, not the "fresh user" case.
  const quota = await readQuota('cross-tool', { recoverAtCount: MAX_GENERATIONS });

  if (!quota.valid) {
    toast.warning(
      "Your cross-tool generation tracking data couldn't be read. Clear this site's browser storage to reset, or go Premium for unlimited access.",
      0,
      'quota-invalid-warning',
    );
    return false;
  }

  const { count, firstGenTime } = quota;
  const now = Date.now();

  if (count >= MAX_GENERATIONS) {
    if (!firstGenTime || now - firstGenTime >= RESET_WINDOW_MS) {
      // Window elapsed — start a fresh count for this generation.
      await writeQuota('cross-tool', { count: 1, firstGenTime: now });
      return true;
    }
    const resetTime = new Date(firstGenTime + RESET_WINDOW_MS);
    toast.warning(
      `You've hit the daily limit (5 cross-tool generations per 24 hours). Resets at ${resetTime.toLocaleString()}.`,
      0,
      'rate-limit-warning',
    );
    return false;
  }

  await writeQuota('cross-tool', {
    count: count + 1,
    firstGenTime: count === 0 ? now : firstGenTime,
  });
  return true;
}
