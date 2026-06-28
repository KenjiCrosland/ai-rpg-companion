/**
 * Analytics capture helper.
 *
 * `trackEvent` (src/util/analytics.mjs) calls `window.gtag?.('event', action,
 * params)`. In dev there's no gtag, so it no-ops — which is exactly why this
 * can't be a Jest test: we need the real app firing real interactions in a real
 * browser. Here we install a `window.gtag` stub BEFORE the app mounts (via
 * addInitScript, so even `tool_open` on mount is caught) that records each event
 * to sessionStorage. sessionStorage (not an in-page array) so the records
 * SURVIVE the full-page navigations in cross-tool flows.
 *
 * Call `captureAnalytics(page)` BEFORE `gotoTool(...)`.
 */

const KEY = '__e2e_analytics_events';

export async function captureAnalytics(page) {
  await page.addInitScript((key) => {
    window.gtag = (...args) => {
      if (args[0] !== 'event') return;
      const arr = JSON.parse(sessionStorage.getItem(key) || '[]');
      arr.push({ action: args[1], params: args[2] || {} });
      sessionStorage.setItem(key, JSON.stringify(arr));
    };
  }, KEY);
}

/** All captured events, or only those with the given action name. */
export async function getEvents(page, action) {
  const all = await page.evaluate(
    (key) => JSON.parse(sessionStorage.getItem(key) || '[]'),
    KEY,
  );
  return action ? all.filter((e) => e.action === action) : all;
}

/** Wait until at least one event with `action` has fired; returns the latest. */
export async function waitForEvent(page, action) {
  await page.waitForFunction(
    ([key, a]) => JSON.parse(sessionStorage.getItem(key) || '[]').some((e) => e.action === a),
    [KEY, action],
  );
  const matches = await getEvents(page, action);
  return matches[matches.length - 1];
}

/** Raw JSON of every captured event — for asserting a canary string never leaks. */
export async function eventsJson(page) {
  return JSON.stringify(await getEvents(page));
}
