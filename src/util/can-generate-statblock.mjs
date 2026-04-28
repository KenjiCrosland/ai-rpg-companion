import { detectIncognito } from 'detectincognitojs';
import { useToast } from '../composables/useToast';
import { readQuota, writeQuota, ensureQuotaSeeded } from './quota-storage.mjs';

const MAX_GENERATIONS = 5;
const RESET_WINDOW_MS = 86400000; // 24h

export async function canGenerateStatblock(isPremium) {
  if (isPremium) {
    // Seed a fresh `_q` if missing so a future drop to free tier
    // lands in the standard fresh-window path instead of soft-recovery.
    await ensureQuotaSeeded('statblock');
    return true;
  }

  const toast = useToast();
  const incognitoResult = await detectIncognito();

  if (incognitoResult.isPrivate) {
    toast.warning(
      'Free generation requires standard browsing mode. Please switch from private browsing, or go Premium for unlimited access.',
      0,
      'incognito-warning',
    );
    return false;
  }

  // recoverAtCount opts into the soft-recovery path: if the user
  // deleted `_q` from `monsters` while keeping their saves, the wrapper
  // writes an at-cap state back so the gate surfaces the standard
  // rate-limit toast (24h cooldown) instead of a stuck error.
  const quota = await readQuota('statblock', { recoverAtCount: MAX_GENERATIONS });

  if (!quota.valid) {
    toast.warning(
      "Your generation tracking data couldn't be read. Clear this site's browser storage to reset, or go Premium for unlimited access.",
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
      await writeQuota('statblock', { count: 1, firstGenTime: now });
      return true;
    }
    const resetTime = new Date(firstGenTime + RESET_WINDOW_MS);
    toast.warning(
      `You've hit the daily limit (5 statblocks per 24 hours). Resets at ${resetTime.toLocaleString()}.`,
      0,
      'rate-limit-warning',
    );
    return false;
  }

  await writeQuota('statblock', {
    count: count + 1,
    firstGenTime: count === 0 ? now : firstGenTime,
  });
  return true;
}
