/**
 * Rate-limit + premium-gate tests.
 *
 * Verifies free users get the per-window quota and premium users
 * bypass it. The quota state lives behind the quota-storage wrapper,
 * so fixtures seed via writeQuota and assertions read via readQuota
 * — direct `localStorage.getItem('monsters')` is no longer the gate's
 * source of truth.
 */

// jsdom in some Jest configs lacks SubtleCrypto and TextEncoder;
// install both before the wrapper imports.
{
  // eslint-disable-next-line global-require
  const { webcrypto } = require('node:crypto');
  // eslint-disable-next-line global-require
  const { TextEncoder, TextDecoder } = require('node:util');
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    configurable: true,
    writable: true,
  });
  if (typeof globalThis.TextEncoder === 'undefined') globalThis.TextEncoder = TextEncoder;
  if (typeof globalThis.TextDecoder === 'undefined') globalThis.TextDecoder = TextDecoder;
}

jest.mock('detectincognitojs', () => ({
  detectIncognito: jest.fn(),
}));

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
import { readQuota, writeQuota, __TEST_ONLY__ } from './quota-storage.mjs';

const { DOMAINS } = __TEST_ONLY__;
const STATBLOCK_HOST = DOMAINS.statblock.host;
const STATBLOCK_FIELD = DOMAINS.statblock.field;

function freshLocalStorage() {
  // jsdom's window.localStorage is the real Storage instance from
  // jsdom; calling `localStorage.clear()` resets it cleanly between
  // tests without needing to install a hand-rolled mock. This is also
  // what jsdom-using projects normally do.
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.clear();
  }
}

describe('canGenerateStatblock — rate limit & premium gate', () => {
  beforeEach(() => {
    // clearAllMocks first, then set defaults: ensures the default
    // mockResolvedValue isn't wiped by the clear call. (clearAllMocks
    // does not reset implementations per Jest docs, but ordering it
    // first removes any ambiguity.)
    jest.clearAllMocks();
    freshLocalStorage();
    detectIncognito.mockResolvedValue({ isPrivate: false });
  });

  describe('Premium users', () => {
    it('always allows generation', async () => {
      const result = await canGenerateStatblock(true);
      expect(result).toBe(true);
      expect(detectIncognito).not.toHaveBeenCalled();
    });

    it('bypasses the rate limit even when the count is at the cap', async () => {
      await writeQuota('statblock', { count: 5, firstGenTime: Date.now() });
      const result = await canGenerateStatblock(true);
      expect(result).toBe(true);
      expect(mockToast.warning).not.toHaveBeenCalled();
    });

    it('seeds a fresh `_q` if missing so a future drop to free tier does not soft-recover', async () => {
      // Premium user with saved monsters but no `_q` (gate never
      // wrote one because they were always premium). The seed must
      // run so a later free-tier read doesn't trip the field-deletion
      // recovery path.
      localStorage.setItem(STATBLOCK_HOST, JSON.stringify({
        Uncategorized: [{ name: 'Goblin' }],
      }));
      await canGenerateStatblock(true);
      const stored = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      expect(stored[STATBLOCK_FIELD]).toBeTruthy();
      expect(stored[STATBLOCK_FIELD].c).toBe(0);
      expect(stored.Uncategorized).toEqual([{ name: 'Goblin' }]);
    });

    it('does not overwrite an existing `_q` when seeding', async () => {
      await writeQuota('statblock', { count: 3, firstGenTime: 1700000000000 });
      await canGenerateStatblock(true);
      const stored = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      expect(stored[STATBLOCK_FIELD].c).toBe(3);
      expect(stored[STATBLOCK_FIELD].t).toBe(1700000000000);
    });
  });

  describe('Incognito detection', () => {
    it('blocks generation in private browsing mode', async () => {
      detectIncognito.mockResolvedValue({ isPrivate: true });
      const result = await canGenerateStatblock(false);
      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining('private browsing'),
        0,
        'incognito-warning',
      );
    });

    it('allows generation in normal browsing mode', async () => {
      const result = await canGenerateStatblock(false);
      expect(result).toBe(true);
    });
  });

  describe('First time user', () => {
    it('allows generation when no quota state exists', async () => {
      const result = await canGenerateStatblock(false);
      expect(result).toBe(true);
    });

    it('initializes quota with count 1 and the current timestamp', async () => {
      const before = Date.now();
      await canGenerateStatblock(false);
      const after = Date.now();
      const q = await readQuota('statblock');
      expect(q.valid).toBe(true);
      expect(q.count).toBe(1);
      expect(q.firstGenTime).toBeGreaterThanOrEqual(before);
      expect(q.firstGenTime).toBeLessThanOrEqual(after);
    });
  });

  describe('Under the limit', () => {
    it('allows generation when count is 1', async () => {
      await writeQuota('statblock', { count: 1, firstGenTime: Date.now() });
      expect(await canGenerateStatblock(false)).toBe(true);
    });

    it('increments count from 1 to 2', async () => {
      await writeQuota('statblock', { count: 1, firstGenTime: Date.now() });
      await canGenerateStatblock(false);
      expect((await readQuota('statblock')).count).toBe(2);
    });

    it('allows generation when count is 4', async () => {
      await writeQuota('statblock', { count: 4, firstGenTime: Date.now() });
      expect(await canGenerateStatblock(false)).toBe(true);
    });

    it('increments count from 4 to 5', async () => {
      await writeQuota('statblock', { count: 4, firstGenTime: Date.now() });
      await canGenerateStatblock(false);
      expect((await readQuota('statblock')).count).toBe(5);
    });

    it('preserves firstGenTime when incrementing', async () => {
      const original = 1234567890000;
      await writeQuota('statblock', { count: 2, firstGenTime: original });
      await canGenerateStatblock(false);
      expect((await readQuota('statblock')).firstGenTime).toBe(original);
    });
  });

  describe('At the limit (window not expired)', () => {
    it('blocks generation when count is 5 and the window is still open', async () => {
      const recent = Date.now() - 3600000;
      await writeQuota('statblock', { count: 5, firstGenTime: recent });
      const result = await canGenerateStatblock(false);
      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining('daily limit'),
        0,
        'rate-limit-warning',
      );
    });

    it('shows reset time in the warning message', async () => {
      const recent = Date.now() - 3600000;
      await writeQuota('statblock', { count: 5, firstGenTime: recent });
      await canGenerateStatblock(false);
      expect(mockToast.warning.mock.calls[0][0]).toContain('Resets at');
    });

    it('does not increment count when blocked', async () => {
      const recent = Date.now() - 3600000;
      await writeQuota('statblock', { count: 5, firstGenTime: recent });
      await canGenerateStatblock(false);
      expect((await readQuota('statblock')).count).toBe(5);
    });

    it('blocks when count is over the cap', async () => {
      const recent = Date.now() - 3600000;
      await writeQuota('statblock', { count: 10, firstGenTime: recent });
      expect(await canGenerateStatblock(false)).toBe(false);
    });
  });

  describe('Reset after 24 hours', () => {
    it('resets when exactly 24 hours have passed', async () => {
      const oneDayAgo = Date.now() - 86400000;
      await writeQuota('statblock', { count: 5, firstGenTime: oneDayAgo });
      const result = await canGenerateStatblock(false);
      expect(result).toBe(true);
      expect(mockToast.warning).not.toHaveBeenCalled();
    });

    it('resets when more than 24 hours have passed', async () => {
      const twoDaysAgo = Date.now() - (86400000 * 2);
      await writeQuota('statblock', { count: 5, firstGenTime: twoDaysAgo });
      expect(await canGenerateStatblock(false)).toBe(true);
    });

    it('sets count to 1 after reset', async () => {
      const oneDayAgo = Date.now() - 86400000;
      await writeQuota('statblock', { count: 5, firstGenTime: oneDayAgo });
      await canGenerateStatblock(false);
      expect((await readQuota('statblock')).count).toBe(1);
    });

    it('updates firstGenTime to the current time after reset', async () => {
      const oneDayAgo = Date.now() - 86400000;
      await writeQuota('statblock', { count: 5, firstGenTime: oneDayAgo });
      const before = Date.now();
      await canGenerateStatblock(false);
      const after = Date.now();
      const q = await readQuota('statblock');
      expect(q.firstGenTime).toBeGreaterThanOrEqual(before);
      expect(q.firstGenTime).toBeLessThanOrEqual(after);
    });
  });

  describe('Invalid quota state', () => {
    it('refuses to generate and surfaces a toast when the host blob is unparseable', async () => {
      localStorage.setItem(STATBLOCK_HOST, '{not json');
      const result = await canGenerateStatblock(false);
      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining("couldn't be read"),
        0,
        'quota-invalid-warning',
      );
    });

    it('does not rewrite stored state when the host is malformed', async () => {
      const before = '{not json';
      localStorage.setItem(STATBLOCK_HOST, before);
      await canGenerateStatblock(false);
      expect(localStorage.getItem(STATBLOCK_HOST)).toBe(before);
    });

    it('refuses when the signature does not match the payload', async () => {
      await writeQuota('statblock', { count: 5, firstGenTime: Date.now() });
      const stored = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      stored[STATBLOCK_FIELD].c = 0;
      localStorage.setItem(STATBLOCK_HOST, JSON.stringify(stored));
      const result = await canGenerateStatblock(false);
      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining("couldn't be read"),
        0,
        'quota-invalid-warning',
      );
    });
  });

  describe('Storage key management', () => {
    it('writes the quota into the host key under the domain field', async () => {
      await canGenerateStatblock(false);
      const stored = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      expect(stored[STATBLOCK_FIELD]).toBeTruthy();
      expect(stored[STATBLOCK_FIELD].c).toBe(1);
    });

    it('does not touch unrelated localStorage keys', async () => {
      localStorage.setItem('user_settings', 'some_value');
      localStorage.setItem('other_data', 'other_value');
      await canGenerateStatblock(false);
      expect(localStorage.getItem('user_settings')).toBe('some_value');
      expect(localStorage.getItem('other_data')).toBe('other_value');
    });

    it('preserves existing user data on the host when writing the quota', async () => {
      // Seed a properly signed `_q` first, then add folder data —
      // simulates a user who has generated and saved before, then the
      // gate runs again.
      await writeQuota('statblock', { count: 0, firstGenTime: null });
      const seeded = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      seeded.Uncategorized = [{ name: 'Goblin' }];
      localStorage.setItem(STATBLOCK_HOST, JSON.stringify(seeded));

      await canGenerateStatblock(false);

      const stored = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      expect(stored.Uncategorized).toEqual([{ name: 'Goblin' }]);
      expect(stored[STATBLOCK_FIELD].c).toBe(1);
    });
  });

  describe('Existing-user migration (pre-Pillar-B legacy state)', () => {
    it('treats legacy top-level fields as a fresh window (one-time bonus)', async () => {
      localStorage.setItem(STATBLOCK_HOST, JSON.stringify({
        generationCount: '5',
        firstGenerationTime: Date.now().toString(),
        Uncategorized: [{ name: 'Goblin' }],
      }));
      const result = await canGenerateStatblock(false);
      expect(result).toBe(true);
      expect((await readQuota('statblock')).count).toBe(1);
    });

    it('strips legacy fields after migration so they cannot be reused as a bypass', async () => {
      localStorage.setItem(STATBLOCK_HOST, JSON.stringify({
        generationCount: '5',
        firstGenerationTime: Date.now().toString(),
        Uncategorized: [{ name: 'Goblin' }],
      }));
      await canGenerateStatblock(false);
      const stored = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      expect(stored.generationCount).toBeUndefined();
      expect(stored.firstGenerationTime).toBeUndefined();
      expect(stored.Uncategorized).toEqual([{ name: 'Goblin' }]);
    });

    it('seeds quota fields for all three domains during migration', async () => {
      // Otherwise a partial migration would leave quest-hook / lore on
      // their first read tripping the recovery branch (since folders
      // exist and legacy is now gone) and getting the at-limit toast.
      localStorage.setItem(STATBLOCK_HOST, JSON.stringify({
        generationCount: '5',
        firstGenerationTime: Date.now().toString(),
        Uncategorized: [{ name: 'Goblin' }],
      }));
      await canGenerateStatblock(false);
      const stored = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      expect(stored._q).toBeTruthy();
      expect(stored._qh).toBeTruthy();
      expect(stored._lr).toBeTruthy();
    });
  });

  describe('Field-deletion soft-recovery', () => {
    it('users who delete `_q` while keeping monsters land at the daily limit (24h cooldown)', async () => {
      // Seed a normal in-progress state.
      await writeQuota('statblock', { count: 2, firstGenTime: Date.now() });
      const seeded = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      seeded.Uncategorized = [{ name: 'Goblin' }];
      localStorage.setItem(STATBLOCK_HOST, JSON.stringify(seeded));

      // Simulate the curious-user attack: delete `_q`, leave the rest.
      const tampered = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      delete tampered[STATBLOCK_FIELD];
      localStorage.setItem(STATBLOCK_HOST, JSON.stringify(tampered));

      const result = await canGenerateStatblock(false);
      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining('daily limit'),
        0,
        'rate-limit-warning',
      );

      // The recovery wrote `_q` back at the cap so subsequent reads
      // continue to honor the cooldown.
      const stored = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      expect(stored[STATBLOCK_FIELD]).toBeTruthy();
      expect(stored[STATBLOCK_FIELD].c).toBe(5);
    });

    it('does not punish brand-new users with no monsters yet', async () => {
      // No host key at all — user has never used any of these tools.
      const result = await canGenerateStatblock(false);
      expect(result).toBe(true);
      expect((await readQuota('statblock')).count).toBe(1);
    });

    it('cannot be bypassed by re-pasting legacy fields after a `_q` deletion', async () => {
      // Post-migration user fills the cap, then tries to bypass by
      // deleting `_q` and re-adding `generationCount` at the top
      // level. The legacy branch must refuse because other quota
      // fields (_qh / _lr) prove we're past the migration point —
      // the recovery branch fires instead, landing the user at limit.
      await writeQuota('statblock', { count: 5, firstGenTime: Date.now() - 3600000 });
      await writeQuota('quest-hook', { count: 0, firstGenTime: null });
      const stored = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      stored.Uncategorized = [{ name: 'Goblin' }];
      delete stored[STATBLOCK_FIELD];
      stored.generationCount = '0';
      stored.firstGenerationTime = null;
      localStorage.setItem(STATBLOCK_HOST, JSON.stringify(stored));

      const result = await canGenerateStatblock(false);
      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining('daily limit'),
        0,
        'rate-limit-warning',
      );
      const after = JSON.parse(localStorage.getItem(STATBLOCK_HOST));
      expect(after[STATBLOCK_FIELD].c).toBe(5);
    });
  });

  describe('Concurrent calls', () => {
    it('handles multiple rapid calls without crashing', async () => {
      // Reads/writes aren't transactional. Concurrent calls can each
      // read the same starting count and last-write-wins on the way
      // out, so the persisted count may lag the number of granted
      // generations. Acceptable — most clients call sequentially via
      // await; the real concern is no crash and an in-range count.
      const results = await Promise.all([
        canGenerateStatblock(false),
        canGenerateStatblock(false),
        canGenerateStatblock(false),
      ]);
      const successes = results.filter((r) => r === true).length;
      expect(successes).toBeGreaterThanOrEqual(1);
      expect(successes).toBeLessThanOrEqual(3);
      const q = await readQuota('statblock');
      expect(q.valid).toBe(true);
      expect(q.count).toBeGreaterThanOrEqual(1);
      expect(q.count).toBeLessThanOrEqual(3);
    });
  });
});
