import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';
import { seedStorage } from './helpers/storage.js';

/**
 * Visual Backpack happy paths. This tool is standalone and no-AI, so there's
 * nothing to mock — we seed localStorage (or drive the UI) and assert the read.
 * Selectors lean on the stable BEM hooks (`.capacity__value`, `.capacity__status`,
 * `.row`) since the tool has no data-testids.
 */

const KEY = 'backpackInventory';

function bundle(items = []) {
  return {
    version: 2,
    currentId: 'c1',
    customItems: [],
    settings: { encumbranceVariant: true },
    characters: [
      {
        id: 'c1',
        name: 'Gorm',
        strength: 10, // → 150 lb cap; encumbered above 50 lb
        coins: { pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 },
        items,
        countCoinWeight: true,
        packDropped: false,
      },
    ],
  };
}

const item = (id, name, weight, category = 'Adventuring Gear') => ({
  instanceId: `i-${id}`,
  id,
  name,
  category,
  weight,
  quantity: 1,
  pos: { x: 0, y: 0 },
});

test.describe('Visual Backpack — core flows (no AI)', () => {
  test('adds gear from the catalog, updates carrying weight, and persists across reload', async ({ page }) => {
    await gotoTool(page, 'backpack');

    // Fresh pack: Str 10 → 150 lb cap, nothing carried yet.
    await expect(page.locator('.capacity__value strong')).toHaveText('0');

    // Search then click the row to add it (the free add path).
    await page.locator('input[aria-label="Search gear"]').fill('Dagger');
    await page.locator('.row', { hasText: 'Dagger' }).first().click();

    // The 1 lb dagger is now counted against carry weight.
    await expect(page.locator('.capacity__value strong')).toHaveText('1');

    // It survives a reload — the pack auto-persists to localStorage.
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('.capacity__value strong')).toHaveText('1');
  });

  test('encumbrance tier reflects load — and the variant toggle switches rulesets', async ({ page }) => {
    // 90 lb at Str 10: over Str×5 (encumbered) but well under the Str×15 cap.
    await seedStorage(page, KEY, bundle([item('anvil', 'Anvil', 90, 'Tools')]));
    await gotoTool(page, 'backpack');

    // Variant ruleset (default): the mid-tier penalty applies.
    await expect(page.locator('.capacity__status')).toContainText('Encumbered');

    // Standard ruleset: only the hard cap matters, so 90 lb is fine.
    await page.getByText('Encumbrance penalties').click();
    await expect(page.locator('.capacity__status')).toContainText('Unencumbered');
  });
});
