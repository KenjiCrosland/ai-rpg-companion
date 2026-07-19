/**
 * Dev navigation helper.
 *
 * cros.land is a single SPA in dev (App.vue), not per-tool URLs. Which tool
 * renders is chosen by `localStorage['dev-current-page']`, read once on mount
 * (App.vue getInitialPage). Premium is NOT a runtime override in dev — App.vue
 * hardcodes `:premium="true"` on the `-premium` page variant — so "premium" in
 * a test simply means navigating to the `<tool>-premium` page.
 *
 * We also force the dev switcher hidden so its fixed-position overlay can't
 * intercept clicks during a test.
 */

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} tool  base page id, e.g. 'item-generator' (see App.vue list)
 * @param {{ premium?: boolean }} [opts]
 */
export async function gotoTool(page, tool, opts = {}) {
  const pageId = opts.premium ? `${tool}-premium` : tool;

  // Playwright contexts ARE incognito contexts, and newer Chromium exposes
  // that through the storage-quota heuristic detectincognitojs uses — which
  // makes every free-tier gate (canGenerateStatblock etc.) block with the
  // "private browsing" toast before any API call. Older Chromium builds hid
  // this, which is why the suite was green before a browser update. Stub the
  // quota probe so the app sees a normal-profile-sized quota.
  await page.addInitScript(() => {
    const HUGE = 4 * 1024 * 1024 * 1024 * 1024; // 4 TiB — normal-profile-sized
    // detectincognitojs's Chrome probe: legacy webkitTemporaryStorage quota
    // compared against a heap-derived floor.
    if (navigator.webkitTemporaryStorage?.queryUsageAndQuota) {
      navigator.webkitTemporaryStorage.queryUsageAndQuota = (success) => success(0, HUGE);
    }
    // Newer detector versions use storage.estimate — stub both.
    if (navigator.storage?.estimate) {
      navigator.storage.estimate = async () => ({ usage: 0, quota: HUGE });
    }
  });

  // One-shot guard: set the page only on the FIRST load of this context.
  // addInitScript re-runs on every navigation (including reloads and in-app
  // navigateToTool jumps); without the guard it would clobber a cross-tool
  // destination back to the original tool. sessionStorage persists across
  // same-context navigations but resets per test, so the guard is per-test.
  await page.addInitScript((id) => {
    if (!sessionStorage.getItem('e2e-page-set')) {
      localStorage.setItem('dev-current-page', id);
      localStorage.setItem('dev-switcher-visible', 'false');
      sessionStorage.setItem('e2e-page-set', '1');
    }
  }, pageId);

  // waitUntil 'domcontentloaded' (not the default 'load'): the app's Google
  // Fonts <link>s can keep the 'load' event pending indefinitely in headless,
  // even though the SPA has mounted and is fully interactive.
  await page.goto('/', { waitUntil: 'domcontentloaded' });
}

/**
 * Switch the active tool WITHIN the same context (after gotoTool's one-shot
 * guard has already fired). Sets dev-current-page directly and reloads, so any
 * cross-tool propagation written to localStorage by the previous tool is read
 * fresh by the destination.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} tool  base page id
 * @param {{ premium?: boolean }} [opts]
 */
export async function switchTool(page, tool, opts = {}) {
  const pageId = opts.premium ? `${tool}-premium` : tool;
  await page.evaluate((id) => localStorage.setItem('dev-current-page', id), pageId);
  await page.reload({ waitUntil: 'domcontentloaded' });
}
