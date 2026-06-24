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
  await page.addInitScript(
    ({ k, v }) => localStorage.setItem(k, JSON.stringify(v)),
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
