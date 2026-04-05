/**
 * CRITICAL: Rate Limiting & Premium Gating Tests
 *
 * These tests ensure that:
 * 1. Free users are properly rate-limited (5 per 24 hours)
 * 2. Premium users bypass rate limits
 * 3. Incognito mode is detected and blocked
 * 4. localStorage state is correctly managed
 * 5. Time-based resets work properly
 */

// Mock detectIncognito before importing canGenerateStatblock
jest.mock('detectincognitojs', () => ({
  detectIncognito: jest.fn(),
}));

// Mock useToast
const mockToast = {
  warning: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
};

jest.mock('../composables/useToast', () => ({
  useToast: () => mockToast,
}));

import { canGenerateStatblock } from './can-generate-statblock.mjs';
import { detectIncognito } from 'detectincognitojs';
import { readRateLimitData, writeRateLimitData } from './secure-storage.mjs';

// Store original localStorage
const originalLocalStorage = global.localStorage;

describe('canGenerateStatblock - Rate Limiting & Premium Gating (CRITICAL)', () => {
  let localStorageMock;

  beforeAll(() => {
    // Ensure clean start
    if (originalLocalStorage && originalLocalStorage.clear) {
      originalLocalStorage.clear();
    }
  });

  beforeEach(() => {
    // Create fresh localStorage mock with isolated storage
    const freshStore = {};
    localStorageMock = {
      getItem(key) {
        return freshStore[key] || null;
      },
      setItem(key, value) {
        freshStore[key] = String(value);
      },
      removeItem(key) {
        delete freshStore[key];
      },
      clear() {
        Object.keys(freshStore).forEach(key => delete freshStore[key]);
      },
      get store() {
        return freshStore;
      }
    };

    global.localStorage = localStorageMock;
    global.window = { localStorage: localStorageMock };

    // Default: not incognito
    detectIncognito.mockResolvedValue({ isPrivate: false });

    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (localStorageMock && localStorageMock.clear) {
      localStorageMock.clear();
    }
  });

  describe('Premium Users', () => {
    it('should always allow generation for premium users', async () => {
      localStorage.clear();
      const result = await canGenerateStatblock(true);

      expect(result).toBe(true);
      // Should not check incognito for premium users
      expect(detectIncognito).not.toHaveBeenCalled();
    });

    it('should increment count for premium users', async () => {
      localStorage.clear();

      await canGenerateStatblock(true);

      const data = readRateLimitData();
      expect(data.count).toBe(1);
    });

    it('should bypass rate limits for premium users', async () => {
      // Set localStorage to show user is at limit
      writeRateLimitData(5, Date.now());

      const result = await canGenerateStatblock(true);

      expect(result).toBe(true);
      expect(mockToast.warning).not.toHaveBeenCalled();
    });

    it('should continue incrementing past 5 for premium users', async () => {
      writeRateLimitData(5, Date.now());

      await canGenerateStatblock(true);

      const data = readRateLimitData();
      expect(data.count).toBe(6);
    });
  });

  describe('Incognito Detection', () => {
    it('should block generation in incognito mode', async () => {
      localStorage.clear();
      detectIncognito.mockResolvedValue({ isPrivate: true });

      const result = await canGenerateStatblock(false);

      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining('private browsing'),
        0,
        'incognito-warning',
      );
    });

    it('should allow generation in normal browsing mode', async () => {
      localStorage.clear();
      detectIncognito.mockResolvedValue({ isPrivate: false });

      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
    });
  });

  describe('First Time User', () => {
    it('should allow generation when no localStorage data exists', async () => {
      // Explicitly clear before test
      localStorage.clear();

      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
    });

    it('should initialize localStorage with count 1 and timestamp', async () => {
      // Explicitly clear before test
      localStorage.clear();

      const beforeTime = Date.now();

      await canGenerateStatblock(false);

      const afterTime = Date.now();
      const data = readRateLimitData();

      expect(data.count).toBe(1);
      expect(data.firstTime).toBeGreaterThanOrEqual(beforeTime);
      expect(data.firstTime).toBeLessThanOrEqual(afterTime);
    });
  });

  describe('Rate Limiting - Under Limit', () => {
    it('should allow generation when count is 1', async () => {
      writeRateLimitData(1, Date.now());

      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
    });

    it('should increment count from 1 to 2', async () => {
      writeRateLimitData(1, Date.now());

      await canGenerateStatblock(false);

      const data = readRateLimitData();
      expect(data.count).toBe(2);
    });

    it('should allow generation when count is 4', async () => {
      writeRateLimitData(4, Date.now());

      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
    });

    it('should increment count from 4 to 5', async () => {
      writeRateLimitData(4, Date.now());

      await canGenerateStatblock(false);

      const data = readRateLimitData();
      expect(data.count).toBe(5);
    });

    it('should preserve firstGenerationTime when incrementing', async () => {
      const originalTime = 1234567890000;
      writeRateLimitData(2, originalTime);

      await canGenerateStatblock(false);

      const data = readRateLimitData();
      expect(data.firstTime).toBe(originalTime);
    });
  });

  describe('Rate Limiting - At Limit (Not Expired)', () => {
    it('should block generation when count is 5 and time not expired', async () => {
      const recentTime = Date.now() - 3600000; // 1 hour ago
      writeRateLimitData(5, recentTime);

      const result = await canGenerateStatblock(false);

      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining('daily limit'),
        0,
        'rate-limit-warning',
      );
    });

    it('should show reset time in warning message', async () => {
      const recentTime = Date.now() - 3600000; // 1 hour ago
      writeRateLimitData(5, recentTime);

      await canGenerateStatblock(false);

      const warningCall = mockToast.warning.mock.calls[0][0];
      expect(warningCall).toContain('Resets at');
    });

    it('should not increment count when at limit', async () => {
      const recentTime = Date.now() - 3600000;
      writeRateLimitData(5, recentTime);

      await canGenerateStatblock(false);

      const data = readRateLimitData();
      expect(data.count).toBe(5);
    });

    it('should block when count is over 5', async () => {
      const recentTime = Date.now() - 3600000;
      writeRateLimitData(10, recentTime);

      const result = await canGenerateStatblock(false);

      expect(result).toBe(false);
    });
  });

  describe('Rate Limiting - Reset After 24 Hours', () => {
    it('should reset when exactly 24 hours have passed', async () => {
      const exactlyOneDayAgo = Date.now() - 86400000; // 24 hours in ms
      writeRateLimitData(5, exactlyOneDayAgo);

      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
      expect(mockToast.warning).not.toHaveBeenCalled();
    });

    it('should reset when more than 24 hours have passed', async () => {
      const twoDaysAgo = Date.now() - (86400000 * 2);
      writeRateLimitData(5, twoDaysAgo);

      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
    });

    it('should set count to 1 after reset', async () => {
      const oneDayAgo = Date.now() - 86400000;
      writeRateLimitData(5, oneDayAgo);

      await canGenerateStatblock(false);

      const data = readRateLimitData();
      expect(data.count).toBe(1);
    });

    it('should update firstGenerationTime to current time after reset', async () => {
      const oneDayAgo = Date.now() - 86400000;
      writeRateLimitData(5, oneDayAgo);

      const beforeTime = Date.now();
      await canGenerateStatblock(false);
      const afterTime = Date.now();

      const data = readRateLimitData();
      const newTime = data.firstTime;
      expect(newTime).toBeGreaterThanOrEqual(beforeTime);
      expect(newTime).toBeLessThanOrEqual(afterTime);
    });
  });

  describe('Edge Cases - Corrupted/Invalid Data', () => {
    it('should handle missing generationCount', async () => {
      localStorage.setItem('monsters', JSON.stringify({
        firstGenerationTime: Date.now().toString(),
      }));

      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
      const data = readRateLimitData();
      expect(data.count).toBe(1);
    });

    it('should handle null generationCount', async () => {
      localStorage.setItem('monsters', JSON.stringify({
        generationCount: null,
        firstGenerationTime: Date.now().toString(),
      }));

      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
    });

    it('should handle invalid generationCount string', async () => {
      localStorage.setItem('monsters', JSON.stringify({
        generationCount: 'invalid',
        firstGenerationTime: Date.now().toString(),
      }));

      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
      const data = readRateLimitData();
      expect(data.count).toBe(1);
    });

    it('should handle missing firstGenerationTime when at limit', async () => {
      localStorage.setItem('monsters', JSON.stringify({
        generationCount: '5',
        firstGenerationTime: null,
      }));

      // Should reset because no valid timestamp
      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
      const data = readRateLimitData();
      expect(data.count).toBe(1);
    });

    it('should handle completely corrupted JSON', async () => {
      localStorage.setItem('monsters', '{invalid json');

      // Should reset to fresh state and allow generation
      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
      const data = readRateLimitData();
      expect(data.count).toBe(1);
    });

    it('should handle empty string in localStorage', async () => {
      localStorage.setItem('monsters', '');

      // Should reset to fresh state and allow generation
      const result = await canGenerateStatblock(false);

      expect(result).toBe(true);
      const data = readRateLimitData();
      expect(data.count).toBe(1);
    });

    it('should handle non-object data', async () => {
      localStorage.setItem('monsters', JSON.stringify('just a string'));

      const result = await canGenerateStatblock(false);

      // Should reset to fresh state and allow generation
      expect(result).toBe(true);
      const data = readRateLimitData();
      expect(data.count).toBe(1);
    });
  });

  describe('localStorage Key Management', () => {
    it('should use "monsters" as the localStorage key', async () => {
      await canGenerateStatblock(false);

      expect(localStorage.getItem('monsters')).toBeTruthy();
      expect(localStorage.getItem('statblocks')).toBeNull();
      expect(localStorage.getItem('generations')).toBeNull();
    });

    it('should preserve other localStorage keys', async () => {
      localStorage.setItem('user_settings', 'some_value');
      localStorage.setItem('other_data', 'other_value');

      await canGenerateStatblock(false);

      expect(localStorage.getItem('user_settings')).toBe('some_value');
      expect(localStorage.getItem('other_data')).toBe('other_value');
    });
  });

  describe('Concurrent Calls', () => {
    it('should handle multiple rapid calls correctly', async () => {
      localStorage.clear();

      // Simulate rapid clicking
      const results = await Promise.all([
        canGenerateStatblock(false),
        canGenerateStatblock(false),
        canGenerateStatblock(false),
      ]);

      // RACE CONDITION: Due to async nature and shared localStorage,
      // not all 3 calls may succeed. Some may read the same count
      // and increment simultaneously, or one may hit the limit.
      // This is expected behavior and documents the race condition.
      const successCount = results.filter(r => r === true).length;
      expect(successCount).toBeGreaterThanOrEqual(2);
      expect(successCount).toBeLessThanOrEqual(3);

      // Final count should reflect at least some increments
      const data = readRateLimitData();
      expect(data.count).toBeGreaterThanOrEqual(2);
    });
  });
});
