import { detectIncognito } from 'detectincognitojs';
import { useToast } from '../composables/useToast';

export async function canGenerateStatblock(isPremium) {
  if (isPremium) {
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

  const MAX_GENERATIONS = 5;
  const storage = window.localStorage;
  let monsters;

  try {
    const stored = JSON.parse(storage.getItem('monsters'));
    // Ensure it's an object with the expected structure
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
      monsters = stored;
    } else {
      monsters = {
        generationCount: '0',
        firstGenerationTime: null,
      };
    }
  } catch (e) {
    // If JSON parse fails, start fresh
    monsters = {
      generationCount: '0',
      firstGenerationTime: null,
    };
  }

  let generationCount = parseInt(monsters.generationCount) || 0;
  let firstGenerationTime = parseInt(monsters.firstGenerationTime);
  const currentTime = new Date().getTime();

  if (generationCount >= MAX_GENERATIONS) {
    if (!firstGenerationTime || currentTime - firstGenerationTime >= 86400000) {
      // 24 hours have passed — reset
      monsters.generationCount = '1';
      monsters.firstGenerationTime = currentTime.toString();
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
    monsters.generationCount = (generationCount + 1).toString();
    if (generationCount === 0) {
      monsters.firstGenerationTime = currentTime.toString();
    }
  }

  storage.setItem('monsters', JSON.stringify(monsters));
  return true;
}
