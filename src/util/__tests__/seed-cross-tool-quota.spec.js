/**
 * @jest-environment jsdom
 */

// jsdom needs SubtleCrypto + TextEncoder for the quota signing.
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

import { seedCrossToolQuota } from '../seed-cross-tool-quota.mjs';
import { readQuota, writeQuota, __TEST_ONLY__ } from '../quota-storage.mjs';

const { DOMAINS } = __TEST_ONLY__;
const HOST = DOMAINS['cross-tool'].host;
const FIELD = DOMAINS['cross-tool'].field;

describe('seedCrossToolQuota', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  it('seeds `_xt: { c: 0 }` on an existing monsters host', async () => {
    localStorage.setItem(HOST, JSON.stringify({
      Uncategorized: [{ name: 'Goblin' }],
    }));

    await seedCrossToolQuota();

    const stored = JSON.parse(localStorage.getItem(HOST));
    expect(stored[FIELD]).toBeTruthy();
    expect(stored[FIELD].c).toBe(0);
    expect(stored.Uncategorized).toEqual([{ name: 'Goblin' }]);
  });

  it('is idempotent — running twice leaves the original count intact', async () => {
    localStorage.setItem(HOST, JSON.stringify({
      Uncategorized: [{ name: 'Goblin' }],
    }));
    await seedCrossToolQuota();
    // Simulate a real user generation incrementing the count.
    await writeQuota('cross-tool', { count: 3, firstGenTime: 1700000000000 });

    await seedCrossToolQuota();

    const q = await readQuota('cross-tool');
    expect(q.count).toBe(3);
    expect(q.firstGenTime).toBe(1700000000000);
  });

  it('creates the host with just `_xt` for brand-new users (no monsters yet)', async () => {
    // Critical baseline: a brand-new user must have `_xt` seeded
    // even before generating any statblocks. Otherwise the first
    // statblock write would create `monsters: { _q: ... }` (no `_xt`),
    // and their first cross-tool attempt would soft-recover at cap.
    // The migration getting ahead of that creation race is the whole
    // reason it exists.
    await seedCrossToolQuota();

    const stored = JSON.parse(localStorage.getItem(HOST));
    expect(stored).toBeTruthy();
    expect(stored[FIELD]).toBeTruthy();
    expect(stored[FIELD].c).toBe(0);
  });
});
