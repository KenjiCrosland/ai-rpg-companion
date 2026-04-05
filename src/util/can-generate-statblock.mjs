import { detectIncognito } from 'detectincognitojs';
import { useToast } from '../composables/useToast';
import { readRateLimitData, writeRateLimitData } from './secure-storage.mjs';

export async function canGenerateStatblock(isPremium) {
  const toast = useToast();

  // Check incognito mode for free users only
  if (!isPremium) {
    const incognitoResult = await detectIncognito();

    if (incognitoResult.isPrivate) {
      toast.warning(
        'Free generation requires standard browsing mode. Please switch from private browsing, or go Premium for unlimited access.',
        0,
        'incognito-warning',
      );
      return false;
    }
  }

  const MAX_GENERATIONS = 5;
  const currentTime = Date.now();

  // Read rate limit data with integrity checking
  const rateLimitData = readRateLimitData();

  let generationCount = rateLimitData?.count || 0;
  let firstGenerationTime = rateLimitData?.firstTime;

  // Check limit for free users only
  if (!isPremium && generationCount >= MAX_GENERATIONS) {
    if (!firstGenerationTime || currentTime - firstGenerationTime >= 86400000) {
      // 24 hours have passed — reset
      writeRateLimitData(1, currentTime);
    } else {
      const resetTime = new Date(firstGenerationTime + 86400000);
      toast.warning(
        `You've hit the daily limit (5 statblocks per 24 hours). Resets at ${resetTime.toLocaleString()}.`,
        0,
        'rate-limit-warning',
      );
      return false;
    }
  } else {
    // Always increment for both premium and free users
    const newCount = generationCount + 1;
    const newTime = generationCount === 0 ? currentTime : firstGenerationTime;
    writeRateLimitData(newCount, newTime);
  }

  return true;
}
