import { getPremiumStatus, __resetAuthStatusCache } from './auth-status.mjs';

const ENDPOINT = '/wp-json/kenji/v1/auth-status';

function mockFetchOnce(body, { ok = true, status = 200 } = {}) {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok,
    status,
    json: async () => body,
  });
}

describe('getPremiumStatus', () => {
  beforeEach(() => {
    __resetAuthStatusCache();
    delete global.fetch;
  });

  test('server says premium=true → returns true', async () => {
    mockFetchOnce({ premium: true });
    const result = await getPremiumStatus({ fallback: false });
    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(ENDPOINT, expect.objectContaining({
      credentials: 'same-origin',
    }));
  });

  test('server says premium=false → returns false even when fallback says true', async () => {
    // The whole point: a tampered DOM that hints premium does not
    // override the server's authoritative answer.
    mockFetchOnce({ premium: false });
    const result = await getPremiumStatus({ fallback: true });
    expect(result).toBe(false);
  });

  test('network failure → returns fallback', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('offline'));
    const result = await getPremiumStatus({ fallback: true });
    expect(result).toBe(true);
  });

  test('5xx response → returns fallback', async () => {
    mockFetchOnce({ premium: true }, { ok: false, status: 503 });
    const result = await getPremiumStatus({ fallback: false });
    expect(result).toBe(false);
  });

  test('caches successful result within TTL', async () => {
    mockFetchOnce({ premium: true });
    await getPremiumStatus({ fallback: false });
    // Second call should not hit fetch.
    const second = await getPremiumStatus({ fallback: false });
    expect(second).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('does not cache on failure — next call retries', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ premium: true }) });

    const first = await getPremiumStatus({ fallback: false });
    expect(first).toBe(false); // fallback

    const second = await getPremiumStatus({ fallback: false });
    expect(second).toBe(true); // retry succeeded
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test('refreshes after TTL expires', async () => {
    const realNow = Date.now;
    let now = 1_000_000;
    Date.now = () => now;

    // Single fetch mock that returns different bodies on the two calls
    // we expect across the TTL boundary.
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ premium: true }) })
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ premium: false }) });

    try {
      const first = await getPremiumStatus({ fallback: false });
      expect(first).toBe(true);

      // Advance past TTL (5 min).
      now += 5 * 60 * 1000 + 1;

      const refreshed = await getPremiumStatus({ fallback: true });
      expect(refreshed).toBe(false);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    } finally {
      Date.now = realNow;
    }
  });

  test('concurrent callers share one in-flight request', async () => {
    let resolveBody;
    global.fetch = jest.fn().mockReturnValueOnce(
      new Promise((resolve) => {
        resolveBody = () => resolve({
          ok: true,
          status: 200,
          json: async () => ({ premium: true }),
        });
      })
    );

    const p1 = getPremiumStatus({ fallback: false });
    const p2 = getPremiumStatus({ fallback: false });
    const p3 = getPremiumStatus({ fallback: false });

    resolveBody();

    const results = await Promise.all([p1, p2, p3]);
    expect(results).toEqual([true, true, true]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('treats malformed JSON premium field as not premium', async () => {
    // Defensive: server somehow returns `{ premium: "true" }` (string)
    // or no field at all. Strict equality to `true` keeps us safe.
    mockFetchOnce({ premium: 'true' });
    const result = await getPremiumStatus({ fallback: false });
    expect(result).toBe(false);
  });
});
