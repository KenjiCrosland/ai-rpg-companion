/**
 * ai-client failover behavior: per-call fallback on TRANSIENT provider
 * errors (5xx / 429 / timeout / network) plus the pre-existing circuit
 * breaker. Non-transient (4xx) errors never fail over — they're our
 * request's fault and would burn fallback spend for nothing.
 *
 * The circuit breaker is module-global state, so each test requires a
 * fresh module instance.
 */

const okResponse = (content) => ({
  ok: true,
  json: async () => ({ choices: [{ message: { content } }] }),
});
const errResponse = (status) => ({
  ok: false,
  status,
  text: async () => `upstream says ${status}`,
});

describe('generateGptResponse failover', () => {
  let generateGptResponse;

  beforeEach(() => {
    jest.resetModules();
    localStorage.clear(); // persisted breaker state must not leak across tests
    global.fetch = jest.fn();
    ({ generateGptResponse } = require('./ai-client.mjs'));
  });

  test('a 502 from the primary retries the SAME call on the OpenAI fallback', async () => {
    global.fetch
      .mockResolvedValueOnce(errResponse(502))
      .mockResolvedValueOnce(okResponse('hello from fallback'));
    const result = await generateGptResponse('prompt');
    expect(result).toBe('hello from fallback');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[0][0]).toBe('/api/ai/deepseek');
    expect(global.fetch.mock.calls[1][0]).toBe('/api/ai/openai');
  });

  test('a 429 fails over; a network drop fails over', async () => {
    global.fetch
      .mockResolvedValueOnce(errResponse(429))
      .mockResolvedValueOnce(okResponse('ok'));
    await expect(generateGptResponse('prompt')).resolves.toBe('ok');

    jest.resetModules();
    global.fetch = jest.fn();
    ({ generateGptResponse } = require('./ai-client.mjs'));
    global.fetch
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce(okResponse('ok again'));
    await expect(generateGptResponse('prompt')).resolves.toBe('ok again');
  });

  test('a 400 (our fault) does NOT fail over', async () => {
    global.fetch.mockResolvedValue(errResponse(400));
    await expect(generateGptResponse('prompt')).rejects.toThrow(/HTTP 400/);
    expect(global.fetch.mock.calls.every(([url]) => url === '/api/ai/deepseek')).toBe(true);
  });

  test('fallback failure surfaces the fallback error (no infinite recursion)', async () => {
    global.fetch.mockResolvedValue(errResponse(503));
    await expect(generateGptResponse('prompt')).rejects.toThrow(/HTTP 503/);
    // Primary once + fallback once — the fallback's own failure never
    // triggers another hop.
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[1][0]).toBe('/api/ai/openai');
  });

  test('the open breaker PERSISTS across reloads (localStorage, 1-hour window)', async () => {
    // Open the breaker: two primary failures.
    global.fetch
      .mockResolvedValueOnce(errResponse(502)).mockResolvedValueOnce(okResponse('a'))
      .mockResolvedValueOnce(errResponse(502)).mockResolvedValueOnce(okResponse('b'));
    await generateGptResponse('one');
    await generateGptResponse('two');
    expect(Number(localStorage.getItem('ai-breaker-open-until'))).toBeGreaterThan(Date.now());

    // "Reload": a fresh module instance hydrates the open state and goes
    // straight to the fallback — no re-paying the discovery stalls.
    jest.resetModules();
    global.fetch = jest.fn().mockResolvedValueOnce(okResponse('after reload'));
    ({ generateGptResponse } = require('./ai-client.mjs'));
    await expect(generateGptResponse('three')).resolves.toBe('after reload');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('/api/ai/openai');

    // An EXPIRED window is cleared and the primary is probed again.
    localStorage.setItem('ai-breaker-open-until', String(Date.now() - 1000));
    jest.resetModules();
    global.fetch = jest.fn().mockResolvedValueOnce(okResponse('probe ok'));
    ({ generateGptResponse } = require('./ai-client.mjs'));
    await expect(generateGptResponse('four')).resolves.toBe('probe ok');
    expect(global.fetch.mock.calls[0][0]).toBe('/api/ai/deepseek');
    expect(localStorage.getItem('ai-breaker-open-until')).toBe(null);
  });

  test('after the breaker opens, subsequent calls go straight to the fallback', async () => {
    // Two consecutive primary failures open the circuit (threshold 2) even
    // though each call succeeded via per-call failover.
    global.fetch
      .mockResolvedValueOnce(errResponse(502)).mockResolvedValueOnce(okResponse('a'))
      .mockResolvedValueOnce(errResponse(502)).mockResolvedValueOnce(okResponse('b'))
      .mockResolvedValueOnce(okResponse('c'));
    await generateGptResponse('one');
    await generateGptResponse('two');
    await generateGptResponse('three');
    // Third call: breaker open → fallback directly, no primary attempt.
    expect(global.fetch.mock.calls[4][0]).toBe('/api/ai/openai');
    expect(global.fetch).toHaveBeenCalledTimes(5);
  });
});

describe('DeepSeek thinking parameter', () => {
  let generateGptResponse;

  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
    global.fetch = jest.fn();
    ({ generateGptResponse } = require('./ai-client.mjs'));
  });

  test('DeepSeek requests disable hidden reasoning; OpenAI requests never send the param', async () => {
    global.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => ({ choices: [{ message: { content: 'a' } }] }) })
      .mockResolvedValueOnce({ ok: false, status: 502, text: async () => 'boom' })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ choices: [{ message: { content: 'b' } }] }) });
    await generateGptResponse('one'); // deepseek
    await generateGptResponse('two'); // deepseek 502 → openai failover
    const bodies = global.fetch.mock.calls.map(([url, opts]) => [url, JSON.parse(opts.body)]);
    expect(bodies[0][0]).toBe('/api/ai/deepseek');
    expect(bodies[0][1].thinking).toEqual({ type: 'disabled' });
    expect(bodies[2][0]).toBe('/api/ai/openai');
    expect(bodies[2][1].thinking).toBeUndefined();
  });
});
