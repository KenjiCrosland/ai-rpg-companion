/**
 * Cross-tool gate tests. Shape mirrors can-generate-statblock.spec.js
 * since the gates share the same underlying quota-storage substrate.
 * Focuses on what's distinct to the cross-tool gate:
 *   - free-combo short-circuit (item→npc and all other un-listed combos
 *     skip the gate entirely)
 *   - shared-counter semantics across the gated combos
 *   - lives on the `monsters` host (convention parity) but does NOT
 *     soft-recover on missing field (monsters are not causally
 *     related to cross-tool history)
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

import {
  canGenerateCrossTool,
  isGatedCrossToolCombo,
} from './can-generate-cross-tool.mjs';
import { detectIncognito } from 'detectincognitojs';
import { readQuota, writeQuota, __TEST_ONLY__ } from './quota-storage.mjs';

const { DOMAINS } = __TEST_ONLY__;
const CROSS_HOST = DOMAINS['cross-tool'].host;
const CROSS_FIELD = DOMAINS['cross-tool'].field;

function freshLocalStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.clear();
  }
}

describe('isGatedCrossToolCombo', () => {
  it('returns true for item → setting (gated)', () => {
    expect(isGatedCrossToolCombo('item', 'setting')).toBe(true);
  });

  it('returns true for item → dungeon (gated, same counter as item → setting)', () => {
    expect(isGatedCrossToolCombo('item', 'dungeon')).toBe(true);
  });

  it('returns false for item → npc (free)', () => {
    expect(isGatedCrossToolCombo('item', 'npc')).toBe(false);
  });

  it('returns false for setting → npc (free inline)', () => {
    expect(isGatedCrossToolCombo('setting', 'npc')).toBe(false);
  });

  it('returns false for dungeon → npc (free inline)', () => {
    expect(isGatedCrossToolCombo('dungeon', 'npc')).toBe(false);
  });

  it('returns false for missing source or destination', () => {
    expect(isGatedCrossToolCombo(null, 'setting')).toBe(false);
    expect(isGatedCrossToolCombo('item', null)).toBe(false);
    expect(isGatedCrossToolCombo('', '')).toBe(false);
  });
});

describe('canGenerateCrossTool — rate limit & premium gate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    freshLocalStorage();
    detectIncognito.mockResolvedValue({ isPrivate: false });
  });

  describe('Free combos (short-circuit)', () => {
    it('allows item → npc unconditionally', async () => {
      const result = await canGenerateCrossTool('item', 'npc', false);
      expect(result).toBe(true);
      expect(detectIncognito).not.toHaveBeenCalled();
    });

    it('does not touch the quota for free combos', async () => {
      await canGenerateCrossTool('item', 'npc', false);
      const stored = localStorage.getItem(CROSS_HOST);
      expect(stored).toBeNull();
    });

    it('allows free combos even when the gated counter is at cap', async () => {
      await writeQuota('cross-tool', { count: 5, firstGenTime: Date.now() });
      const result = await canGenerateCrossTool('item', 'npc', false);
      expect(result).toBe(true);
      expect(mockToast.warning).not.toHaveBeenCalled();
    });

    it('skips the gate when source or dest is missing', async () => {
      const result = await canGenerateCrossTool(null, 'setting', false);
      expect(result).toBe(true);
      expect(detectIncognito).not.toHaveBeenCalled();
    });
  });

  describe('Premium users (gated combos)', () => {
    it('allows generation unconditionally', async () => {
      const result = await canGenerateCrossTool('item', 'setting', true);
      expect(result).toBe(true);
      expect(detectIncognito).not.toHaveBeenCalled();
    });

    it('bypasses the cap', async () => {
      await writeQuota('cross-tool', { count: 5, firstGenTime: Date.now() });
      const result = await canGenerateCrossTool('item', 'setting', true);
      expect(result).toBe(true);
      expect(mockToast.warning).not.toHaveBeenCalled();
    });

    it('seeds a fresh `_xt` if missing so a future drop to free tier starts with a fresh window', async () => {
      // Premium user with saved monsters but no `_xt` (gate never wrote
      // one because they were always premium). The seed must run so a
      // later free-tier read lands at fresh state cleanly.
      localStorage.setItem(CROSS_HOST, JSON.stringify({
        Uncategorized: [{ name: 'Goblin' }],
      }));
      await canGenerateCrossTool('item', 'setting', true);
      const stored = JSON.parse(localStorage.getItem(CROSS_HOST));
      expect(stored[CROSS_FIELD]).toBeTruthy();
      expect(stored[CROSS_FIELD].c).toBe(0);
      expect(stored.Uncategorized).toEqual([{ name: 'Goblin' }]);
    });
  });

  describe('Incognito detection (gated combos)', () => {
    it('blocks generation in private browsing mode', async () => {
      detectIncognito.mockResolvedValue({ isPrivate: true });
      const result = await canGenerateCrossTool('item', 'setting', false);
      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining('private browsing'),
        0,
        'incognito-warning',
      );
    });
  });

  describe('First time user (gated combo)', () => {
    it('allows generation and initializes the quota', async () => {
      const before = Date.now();
      const result = await canGenerateCrossTool('item', 'setting', false);
      const after = Date.now();
      expect(result).toBe(true);
      const q = await readQuota('cross-tool');
      expect(q.valid).toBe(true);
      expect(q.count).toBe(1);
      expect(q.firstGenTime).toBeGreaterThanOrEqual(before);
      expect(q.firstGenTime).toBeLessThanOrEqual(after);
    });
  });

  describe('Shared counter across gated combos', () => {
    it('item → setting and item → dungeon increment the same quota', async () => {
      // The user-facing semantic: "5 cross-tool generations per 24h
      // total." Interleave the two gated combos and assert the counter
      // climbs as one — not one bucket per combo.
      await canGenerateCrossTool('item', 'setting', false);
      await canGenerateCrossTool('item', 'dungeon', false);
      await canGenerateCrossTool('item', 'setting', false);
      await canGenerateCrossTool('item', 'dungeon', false);
      await canGenerateCrossTool('item', 'setting', false);

      const q = await readQuota('cross-tool');
      expect(q.count).toBe(5);

      // The cap is now in force from EITHER combo's perspective — a
      // sixth item→dungeon should be blocked even though only 2 of the
      // 5 prior calls were item→dungeon.
      mockToast.warning.mockClear();
      const result = await canGenerateCrossTool('item', 'dungeon', false);
      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining('daily limit'),
        0,
        'rate-limit-warning',
      );
    });
  });

  describe('At the limit (window not expired)', () => {
    it('blocks generation and surfaces a toast', async () => {
      const recent = Date.now() - 3600000;
      await writeQuota('cross-tool', { count: 5, firstGenTime: recent });
      const result = await canGenerateCrossTool('item', 'setting', false);
      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining('daily limit'),
        0,
        'rate-limit-warning',
      );
    });

    it('toast mentions cross-tool specifically (not "statblocks")', async () => {
      const recent = Date.now() - 3600000;
      await writeQuota('cross-tool', { count: 5, firstGenTime: recent });
      await canGenerateCrossTool('item', 'setting', false);
      expect(mockToast.warning.mock.calls[0][0]).toContain('cross-tool generations');
    });

    it('does not increment count when blocked', async () => {
      const recent = Date.now() - 3600000;
      await writeQuota('cross-tool', { count: 5, firstGenTime: recent });
      await canGenerateCrossTool('item', 'setting', false);
      expect((await readQuota('cross-tool')).count).toBe(5);
    });
  });

  describe('Reset after 24 hours', () => {
    it('resets when the window has elapsed', async () => {
      const oneDayAgo = Date.now() - 86400000;
      await writeQuota('cross-tool', { count: 5, firstGenTime: oneDayAgo });
      const result = await canGenerateCrossTool('item', 'setting', false);
      expect(result).toBe(true);
      expect((await readQuota('cross-tool')).count).toBe(1);
    });
  });

  describe('Invalid quota state', () => {
    it('refuses to generate when the host blob is unparseable', async () => {
      localStorage.setItem(CROSS_HOST, '{not json');
      const result = await canGenerateCrossTool('item', 'setting', false);
      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining("couldn't be read"),
        0,
        'quota-invalid-warning',
      );
    });
  });

  describe('Storage key isolation', () => {
    it('writes the quota into the `monsters` host under `_xt`', async () => {
      await canGenerateCrossTool('item', 'setting', false);
      const host = JSON.parse(localStorage.getItem(CROSS_HOST));
      expect(host[CROSS_FIELD]).toBeTruthy();
      // CROSS_HOST resolves to 'monsters' — the convention shared with
      // the other counters on this host.
      expect(CROSS_HOST).toBe('monsters');
    });

    it('preserves existing host data (other quota fields, user folders) when writing', async () => {
      // Simulate a post-migration user: `_xt` already seeded by the
      // migration, plus signed statblock quota + a folder of saved
      // monsters. The cross-tool gate must not clobber any of them.
      await writeQuota('statblock', { count: 3, firstGenTime: 1700000000000 });
      await writeQuota('cross-tool', { count: 0, firstGenTime: null });
      const seeded = JSON.parse(localStorage.getItem(CROSS_HOST));
      seeded.Uncategorized = [{ name: 'Goblin' }];
      localStorage.setItem(CROSS_HOST, JSON.stringify(seeded));

      await canGenerateCrossTool('item', 'setting', false);

      const stored = JSON.parse(localStorage.getItem(CROSS_HOST));
      expect(stored.Uncategorized).toEqual([{ name: 'Goblin' }]);
      expect(stored._q.c).toBe(3);
      expect(stored[CROSS_FIELD].c).toBe(1);
    });
  });

  describe('Field-deletion soft-recovery (post-migration baseline)', () => {
    // The `seed-cross-tool-quota` migration seeds `_xt: { c: 0 }` for
    // every existing user before the gate ever fires. Tests below
    // simulate that baseline by writing `_xt` first, then mutating to
    // simulate a tampering attempt. The regression we're guarding
    // against is the inverse of the older bug: now that every user
    // is seeded, any user with monsters and NO `_xt` is an attacker.

    it('users who delete `_xt` while keeping monsters land at the cap', async () => {
      // Seed: user has been migrated (writeQuota stamps `_xt`), then
      // saves a monster, then deletes `_xt` from devtools.
      await writeQuota('cross-tool', { count: 2, firstGenTime: Date.now() });
      const seeded = JSON.parse(localStorage.getItem(CROSS_HOST));
      seeded.Uncategorized = [{ name: 'Goblin' }];
      localStorage.setItem(CROSS_HOST, JSON.stringify(seeded));

      const tampered = JSON.parse(localStorage.getItem(CROSS_HOST));
      delete tampered[CROSS_FIELD];
      localStorage.setItem(CROSS_HOST, JSON.stringify(tampered));

      const result = await canGenerateCrossTool('item', 'setting', false);
      expect(result).toBe(false);
      expect(mockToast.warning).toHaveBeenCalledWith(
        expect.stringContaining('daily limit'),
        0,
        'rate-limit-warning',
      );
      // Soft-recovery writes `_xt` back at cap so subsequent reads
      // continue to honor the cooldown rather than letting a second
      // deletion attempt sneak through.
      const stored = JSON.parse(localStorage.getItem(CROSS_HOST));
      expect(stored[CROSS_FIELD]).toBeTruthy();
      expect(stored[CROSS_FIELD].c).toBe(5);
    });

    it('does not punish brand-new users with no host key at all', async () => {
      // No host yet — user has never used any tool on this browser.
      // No host data means no "user data with missing field" to
      // recover from, so they land at fresh state.
      const result = await canGenerateCrossTool('item', 'setting', false);
      expect(result).toBe(true);
      expect((await readQuota('cross-tool')).count).toBe(1);
    });
  });
});
