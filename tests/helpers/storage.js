/**
 * localStorage isolation helpers.
 *
 * Each test should start from a clean origin. clearStorage runs against an
 * already-loaded page; for pre-navigation seeding use seedStorage (addInitScript
 * so the value is present before the app reads it on mount).
 */

export async function clearStorage(page) {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

export async function seedStorage(page, key, value) {
  // One-shot per key: addInitScript re-runs on every navigation/reload, so a
  // naive setItem would re-seed the ORIGINAL value on each reload and clobber
  // any app mutation (e.g. a rename) made during the test. The sessionStorage
  // guard seeds once per context, letting reloads (switchTool) read the app's
  // real persisted state.
  await page.addInitScript(
    ({ k, v }) => {
      const guard = `e2e-seeded-${k}`;
      if (sessionStorage.getItem(guard)) return;
      localStorage.setItem(k, JSON.stringify(v));
      sessionStorage.setItem(guard, '1');
    },
    { k: key, v: value },
  );
}

export async function readStorage(page, key) {
  return page.evaluate((k) => {
    const raw = localStorage.getItem(k);
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }, key);
}
