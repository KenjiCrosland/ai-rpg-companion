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

import { seedMonsterQuotas } from '../seed-monster-quotas.mjs';
import { readQuota, writeQuota, __TEST_ONLY__ } from '../quota-storage.mjs';

const { DOMAINS } = __TEST_ONLY__;
const HOST = DOMAINS.statblock.host; // all three live on the same host
const STATBLOCK_FIELD = DOMAINS.statblock.field;
const QUEST_HOOK_FIELD = DOMAINS['quest-hook'].field;
const LORE_FIELD = DOMAINS.lore.field;

describe('seedMonsterQuotas', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  it('seeds _q, _qh, and _lr on an existing monsters host', async () => {
    localStorage.setItem(HOST, JSON.stringify({
      Uncategorized: [{ name: 'Goblin' }],
    }));

    await seedMonsterQuotas();

    const stored = JSON.parse(localStorage.getItem(HOST));
    expect(stored[STATBLOCK_FIELD]).toBeTruthy();
    expect(stored[STATBLOCK_FIELD].c).toBe(0);
    expect(stored[QUEST_HOOK_FIELD]).toBeTruthy();
    expect(stored[QUEST_HOOK_FIELD].c).toBe(0);
    expect(stored[LORE_FIELD]).toBeTruthy();
    expect(stored[LORE_FIELD].c).toBe(0);
    // User data preserved.
    expect(stored.Uncategorized).toEqual([{ name: 'Goblin' }]);
  });

  it('is idempotent for the statblock counter — running twice preserves the original count', async () => {
    localStorage.setItem(HOST, JSON.stringify({
      Uncategorized: [{ name: 'Goblin' }],
    }));
    await seedMonsterQuotas();
    await writeQuota('statblock', { count: 5, firstGenTime: 1700000000000 });

    await seedMonsterQuotas();

    const q = await readQuota('statblock');
    expect(q.count).toBe(5);
    expect(q.firstGenTime).toBe(1700000000000);
  });

  it('is idempotent across all three monster domains', async () => {
    localStorage.setItem(HOST, JSON.stringify({
      Uncategorized: [{ name: 'Goblin' }],
    }));
    await seedMonsterQuotas();
    await writeQuota('statblock', { count: 3, firstGenTime: 1700000000000 });
    await writeQuota('quest-hook', { count: 2, firstGenTime: 1700000000000 });
    await writeQuota('lore', { count: 1, firstGenTime: 1700000000000 });

    await seedMonsterQuotas();

    expect((await readQuota('statblock')).count).toBe(3);
    expect((await readQuota('quest-hook')).count).toBe(2);
    expect((await readQuota('lore')).count).toBe(1);
  });

  it('creates the host with all three fields for brand-new users (no monsters yet)', async () => {
    // Baseline: a brand-new user must have _q / _qh / _lr seeded
    // even before generating anything. After this migration, the
    // absence of any of these fields on a host with user data is
    // unambiguously a manual deletion (tampering), and gates can use
    // recoverAtCount safely.
    await seedMonsterQuotas();

    const stored = JSON.parse(localStorage.getItem(HOST));
    expect(stored).toBeTruthy();
    expect(stored[STATBLOCK_FIELD]).toBeTruthy();
    expect(stored[QUEST_HOOK_FIELD]).toBeTruthy();
    expect(stored[LORE_FIELD]).toBeTruthy();
    expect(stored[STATBLOCK_FIELD].c).toBe(0);
    expect(stored[QUEST_HOOK_FIELD].c).toBe(0);
    expect(stored[LORE_FIELD].c).toBe(0);
  });

  it('preserves _xt when it was already seeded by the prior migration', async () => {
    // The cross-tool seed runs as migration #11; this monster-quota
    // seed runs as #13. By the time we get here, _xt is in place.
    // Verify the new migration doesn't clobber it.
    localStorage.setItem(HOST, JSON.stringify({
      Uncategorized: [{ name: 'Goblin' }],
    }));
    await writeQuota('cross-tool', { count: 4, firstGenTime: 1700000000000 });

    await seedMonsterQuotas();

    const ct = await readQuota('cross-tool');
    expect(ct.count).toBe(4);
    expect(ct.firstGenTime).toBe(1700000000000);
  });
});
