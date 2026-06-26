import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { seedStorage, readStorage } from '../helpers/storage.js';

function makeItem(name) {
  return {
    name, item_type: 'Wondrous Item', rarity: 'Rare', feature_count: 1,
    features: { Trait: 'A trait.' }, physical_description: `The ${name}.`, lore: `Lore of ${name}.`,
  };
}

const ENCOUNTERS = { Uncategorized: [{ name: 'Canyon Ambush', monsters: [], partyGroups: [] }] };

// Switch the active tool within the same context (gotoTool's one-shot guard
// already fired, so set dev-current-page directly and reload).
async function switchTool(page, pageId) {
  await page.evaluate((id) => localStorage.setItem('dev-current-page', id), pageId);
  await page.reload({ waitUntil: 'domcontentloaded' });
}

test.describe('Cross-tool isolation & persistence', () => {
  test('each tool shows only its own library; switching does not cross-contaminate', async ({ page }) => {
    await seedStorage(page, 'savedItems', [makeItem('Aurora Lantern'), makeItem('Thornbound Censer')]);
    await seedStorage(page, 'encounters', ENCOUNTERS);
    await gotoTool(page, 'item-generator', { premium: true });

    // Item tool: its two items, no encounter bleed.
    await expect(page.locator('.sidebar-item')).toHaveCount(2);

    // Switch to the encounter tool: item rows are gone, the encounter tool is live.
    await switchTool(page, 'encounter-generator-premium');
    await expect(page.getByTestId('generate-encounter')).toBeVisible();
    await expect(page.locator('.sidebar-item')).toHaveCount(0);

    // Both libraries are still intact in storage.
    expect(await readStorage(page, 'savedItems')).toHaveLength(2);
    expect(await readStorage(page, 'encounters')).toEqual(ENCOUNTERS);

    // Switch back: the item library is unchanged.
    await switchTool(page, 'item-generator-premium');
    await expect(page.locator('.sidebar-item')).toHaveCount(2);
  });

  test('the active tool survives a reload (dev-current-page persistence)', async ({ page }) => {
    await gotoTool(page, 'npc-generator', { premium: true });
    await expect(page.getByTestId('generate-npc')).toBeVisible();

    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('generate-npc')).toBeVisible();
  });
});
