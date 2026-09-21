/**
 * ai-client provider behavior: calls run on the selected provider and FAIL
 * HONESTLY there — no automatic failover. The old breaker-driven reroute to
 * a hardcoded OpenAI fallback turned one bad patch of failures into a total
 * outage when no OpenAI key existed (live: every call 401'd for the rest of
 * the session and three consecutive generations shipped as never-fail
 * placeholder blocks). The circuit breaker survives, but as a VALIDATION
 * posture (isDegradedMode) — never a routing decision.
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

describe('generateGptResponse stays on its provider', () => {
  let generateGptResponse;
  let isDegradedMode;

  beforeEach(() => {
    jest.resetModules();
    localStorage.clear(); // persisted breaker state must not leak across tests
    global.fetch = jest.fn();
    ({ generateGptResponse, isDegradedMode } = require('./ai-client.mjs'));
  });

  test('a 502 surfaces as the primary error — no second endpoint is tried', async () => {
    global.fetch.mockResolvedValue(errResponse(502));
    await expect(generateGptResponse('prompt')).rejects.toThrow(/HTTP 502/);
    expect(global.fetch.mock.calls.every(([url]) => url === '/api/ai/deepseek')).toBe(true);
  });

  test('an open breaker flips degraded mode but calls still run on the primary', async () => {
    global.fetch.mockResolvedValue(errResponse(502));
    await expect(generateGptResponse('one')).rejects.toThrow();
    await expect(generateGptResponse('two')).rejects.toThrow();
    expect(isDegradedMode()).toBe(true);

    global.fetch.mockClear();
    global.fetch.mockResolvedValue(okResponse('primary recovered'));
    await expect(generateGptResponse('three')).resolves.toBe('primary recovered');
    expect(global.fetch.mock.calls[0][0]).toBe('/api/ai/deepseek');
  });

  test('the open breaker PERSISTS across reloads (localStorage, 1-hour window)', async () => {
    global.fetch.mockResolvedValue(errResponse(502));
    await expect(generateGptResponse('one')).rejects.toThrow();
    await expect(generateGptResponse('two')).rejects.toThrow();
    expect(Number(localStorage.getItem('ai-breaker-open-until'))).toBeGreaterThan(Date.now());

    // "Reload": a fresh module instance hydrates the open state into
    // degraded mode without re-paying the discovery stalls.
    jest.resetModules();
    ({ isDegradedMode } = require('./ai-client.mjs'));
    expect(isDegradedMode()).toBe(true);

    // An EXPIRED window is cleared and normal mode resumes.
    localStorage.setItem('ai-breaker-open-until', String(Date.now() - 1000));
    jest.resetModules();
    ({ isDegradedMode } = require('./ai-client.mjs'));
    expect(isDegradedMode()).toBe(false);
    expect(localStorage.getItem('ai-breaker-open-until')).toBe(null);
  });

  test('an explicit provider override goes exactly where it is told', async () => {
    const { PROVIDERS } = require('./ai-config.mjs');
    global.fetch.mockResolvedValueOnce(okResponse('openai answer'));
    await expect(
      generateGptResponse('prompt', null, 3, undefined, null, PROVIDERS.OPENAI),
    ).resolves.toBe('openai answer');
    expect(global.fetch.mock.calls[0][0]).toBe('/api/ai/openai');
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
    const { PROVIDERS } = require('./ai-config.mjs');
    global.fetch
      .mockResolvedValueOnce(okResponse('a'))
      .mockResolvedValueOnce(okResponse('b'));
    await generateGptResponse('one'); // deepseek (default)
    await generateGptResponse('two', null, 3, undefined, null, PROVIDERS.OPENAI);
    const bodies = global.fetch.mock.calls.map(([url, opts]) => [url, JSON.parse(opts.body)]);
    expect(bodies[0][0]).toBe('/api/ai/deepseek');
    expect(bodies[0][1].thinking).toEqual({ type: 'disabled' });
    expect(bodies[1][0]).toBe('/api/ai/openai');
    expect(bodies[1][1].thinking).toBeUndefined();
  });
});
