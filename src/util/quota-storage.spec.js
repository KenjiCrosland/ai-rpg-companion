/**
 * quota-storage tests. jsdom in some Jest configs ships a partial
 * Web Crypto and no TextEncoder/TextDecoder on the global. Polyfill
 * both from node before importing the wrapper.
 */
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

import {
  readQuota,
  writeQuota,
  remainingFromQuota,
  QUOTA_FIELDS,
  __TEST_ONLY__,
} from './quota-storage.mjs';

const { DOMAINS } = __TEST_ONLY__;

describe('quota-storage', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  describe('roundtrip', () => {
    test('host key missing → fresh state', async () => {
      const q = await readQuota('statblock');
      expect(q).toEqual({ count: 0, firstGenTime: null, valid: true });
    });

    test('host key exists but no quota field → fresh state', async () => {
      // User has saved monsters but never generated through the gate
      // (e.g. imported a backup). Should treat as fresh, not invalid.
      localStorage.setItem('monsters', JSON.stringify({
        Uncategorized: [{ name: 'Goblin' }],
      }));
      const q = await readQuota('statblock');
      expect(q).toEqual({ count: 0, firstGenTime: null, valid: true });
    });

    test('write + read preserves count and firstGenTime', async () => {
      const t = Date.now();
      await writeQuota('statblock', { count: 3, firstGenTime: t });
      const q = await readQuota('statblock');
      expect(q.count).toBe(3);
      expect(q.firstGenTime).toBe(t);
      expect(q.valid).toBe(true);
    });

    test('writes go inside the host key, under the domain field', async () => {
      await writeQuota('statblock', { count: 1, firstGenTime: Date.now() });
      const stored = JSON.parse(localStorage.getItem('monsters'));
      expect(stored[DOMAINS.statblock.field]).toBeTruthy();
      expect(stored[DOMAINS.statblock.field]).toMatchObject({
        c: 1,
        v: 1,
      });
    });

    test('writeQuota preserves existing user data on the host', async () => {
      // Save monsters first, then write a quota — user data must
      // survive.
      localStorage.setItem('monsters', JSON.stringify({
        Uncategorized: [{ name: 'Goblin', cr: '1/4' }],
        Dragons: [{ name: 'Red Dragon', cr: '17' }],
      }));
      await writeQuota('statblock', { count: 1, firstGenTime: Date.now() });
      const stored = JSON.parse(localStorage.getItem('monsters'));
      expect(stored.Uncategorized).toEqual([{ name: 'Goblin', cr: '1/4' }]);
      expect(stored.Dragons).toEqual([{ name: 'Red Dragon', cr: '17' }]);
      expect(stored[DOMAINS.statblock.field]).toBeTruthy();
    });

    test('writeQuota preserves quota fields from other domains', async () => {
      // Two domains share the host key; writes must not clobber each
      // other.
      await writeQuota('quest-hook', { count: 2, firstGenTime: 1700000000 });
      await writeQuota('statblock', { count: 1, firstGenTime: 1700000001 });
      const stored = JSON.parse(localStorage.getItem('monsters'));
      expect(stored[DOMAINS['quest-hook'].field].c).toBe(2);
      expect(stored[DOMAINS.statblock.field].c).toBe(1);
    });

    test('each domain reads its own counter independently', async () => {
      await writeQuota('statblock', { count: 1, firstGenTime: 1 });
      await writeQuota('quest-hook', { count: 2, firstGenTime: 2 });
      await writeQuota('lore', { count: 3, firstGenTime: 3 });
      expect((await readQuota('statblock')).count).toBe(1);
      expect((await readQuota('quest-hook')).count).toBe(2);
      expect((await readQuota('lore')).count).toBe(3);
    });

    test('stored payload uses opaque field names (no `count`, no `generationCount`)', async () => {
      await writeQuota('statblock', { count: 2, firstGenTime: 1700000000000 });
      const raw = localStorage.getItem('monsters');
      expect(raw).not.toContain('generationCount');
      expect(raw).not.toContain('firstGenerationTime');
      const parsed = JSON.parse(raw)[DOMAINS.statblock.field];
      expect(Object.keys(parsed).sort()).toEqual(['c', 's', 't', 'v']);
    });

    test('QUOTA_FIELDS lists every field name save sites must preserve', () => {
      expect(QUOTA_FIELDS).toEqual(expect.arrayContaining(['_q', '_qh', '_lr']));
    });
  });

  describe('tamper detection', () => {
    test('edited count without resigning → valid: false', async () => {
      await writeQuota('statblock', { count: 5, firstGenTime: Date.now() });
      const stored = JSON.parse(localStorage.getItem('monsters'));
      stored[DOMAINS.statblock.field].c = 0;
      localStorage.setItem('monsters', JSON.stringify(stored));
      expect((await readQuota('statblock')).valid).toBe(false);
    });

    test('cross-domain swap → valid: false', async () => {
      // Sign a fresh quest-hook payload, copy it under the statblock
      // field. The signature is bound to the domain, so this fails.
      await writeQuota('quest-hook', { count: 0, firstGenTime: null });
      const stored = JSON.parse(localStorage.getItem('monsters'));
      stored[DOMAINS.statblock.field] = stored[DOMAINS['quest-hook'].field];
      localStorage.setItem('monsters', JSON.stringify(stored));
      expect((await readQuota('statblock')).valid).toBe(false);
    });

    test('schema version mismatch → valid: false', async () => {
      await writeQuota('statblock', { count: 1, firstGenTime: Date.now() });
      const stored = JSON.parse(localStorage.getItem('monsters'));
      stored[DOMAINS.statblock.field].v = 999;
      localStorage.setItem('monsters', JSON.stringify(stored));
      expect((await readQuota('statblock')).valid).toBe(false);
    });

    test('malformed host JSON → valid: false', async () => {
      localStorage.setItem('monsters', '{not json');
      expect((await readQuota('statblock')).valid).toBe(false);
    });

    test('host JSON is non-object (array) → valid: false', async () => {
      localStorage.setItem('monsters', JSON.stringify([1, 2, 3]));
      expect((await readQuota('statblock')).valid).toBe(false);
    });

    test('quota field is non-object → valid: false', async () => {
      localStorage.setItem('monsters', JSON.stringify({
        [DOMAINS.statblock.field]: 'not an object',
      }));
      expect((await readQuota('statblock')).valid).toBe(false);
    });

    test('missing fields inside quota payload → valid: false', async () => {
      localStorage.setItem('monsters', JSON.stringify({
        [DOMAINS.statblock.field]: { c: 1, t: null, v: 1 },
      }));
      expect((await readQuota('statblock')).valid).toBe(false);
    });

    test('wrong field types → valid: false', async () => {
      localStorage.setItem('monsters', JSON.stringify({
        [DOMAINS.statblock.field]: { c: '1', t: null, v: 1, s: 'whatever' },
      }));
      expect((await readQuota('statblock')).valid).toBe(false);
    });
  });

  describe('reset cost', () => {
    test('deleting host key resets the counter (and would lose saved monsters in production)', async () => {
      await writeQuota('statblock', { count: 5, firstGenTime: Date.now() });
      localStorage.removeItem('monsters');
      expect((await readQuota('statblock')).count).toBe(0);
    });
  });

  describe('error paths', () => {
    test('unknown domain throws', async () => {
      await expect(readQuota('not-a-domain')).rejects.toThrow();
      await expect(writeQuota('not-a-domain', { count: 0, firstGenTime: null }))
        .rejects.toThrow();
    });

    test('writeQuota does not overwrite a malformed host blob', async () => {
      // If `monsters` got corrupted somehow (legacy bug, partial
      // write), don't blow it away on quota write — the user might be
      // able to recover.
      const broken = '{not json';
      localStorage.setItem('monsters', broken);
      await writeQuota('statblock', { count: 1, firstGenTime: Date.now() });
      expect(localStorage.getItem('monsters')).toBe(broken);
    });
  });

  describe('remainingFromQuota', () => {
    const CAP = 5;
    const WINDOW = 86400000;

    test('under cap returns cap - count', () => {
      expect(remainingFromQuota({ count: 2, firstGenTime: Date.now(), valid: true }, CAP, WINDOW)).toBe(3);
    });

    test('at cap with fresh window returns 0', () => {
      expect(remainingFromQuota({ count: CAP, firstGenTime: Date.now(), valid: true }, CAP, WINDOW)).toBe(0);
    });

    test('past window auto-resets to full cap', () => {
      expect(remainingFromQuota({ count: CAP, firstGenTime: Date.now() - (WINDOW + 1), valid: true }, CAP, WINDOW)).toBe(CAP);
    });

    test('null firstGenTime treats as fresh', () => {
      expect(remainingFromQuota({ count: 0, firstGenTime: null, valid: true }, CAP, WINDOW)).toBe(CAP);
    });

    test('invalid quota returns 0', () => {
      expect(remainingFromQuota({ valid: false }, CAP, WINDOW)).toBe(0);
    });

    test('null/undefined quota returns 0 defensively', () => {
      expect(remainingFromQuota(null, CAP, WINDOW)).toBe(0);
      expect(remainingFromQuota(undefined, CAP, WINDOW)).toBe(0);
    });
  });
});
