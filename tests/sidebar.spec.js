import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';
import { seedStorage } from './helpers/storage.js';
import { mockLLM } from './helpers/llm-mocks.js';

/**
 * Items dedupe by name on save, so generating the same fixture twice yields one
 * entry. To exercise sidebar selection we seed two distinct items directly,
 * then verify clicking each loads the right one.
 */
function makeItem(name) {
  return {
    name,
    item_type: 'Wondrous Item',
    rarity: 'Rare',
    feature_count: 1,
    features: { Trait: 'A simple magical trait for testing.' },
    physical_description: `The ${name}, plainly described for the test.`,
    lore: `The history of the ${name}.`,
  };
}

test.describe('Sidebar interaction', () => {
  test('clicking a saved item loads that item', async ({ page }) => {
    await mockLLM(page, 'item');
    await seedStorage(page, 'savedItems', [
      makeItem('Aurora Lantern'),
      makeItem('Thornbound Censer'),
    ]);

    await gotoTool(page, 'item-generator', { premium: true });

    await expect(page.locator('.sidebar-item')).toHaveCount(2);

    await page.locator('.sidebar-item__name', { hasText: 'Thornbound Censer' }).click();
    await expect(page.getByTestId('item-name')).toHaveText('Thornbound Censer');

    await page.locator('.sidebar-item__name', { hasText: 'Aurora Lantern' }).click();
    await expect(page.getByTestId('item-name')).toHaveText('Aurora Lantern');
  });
});
