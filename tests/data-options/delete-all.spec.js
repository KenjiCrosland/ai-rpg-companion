import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { seedStorage, readStorage } from '../helpers/storage.js';

/**
 * Delete-all lives in the shared SidebarFooter: a "Data options" disclosure →
 * "Delete all X" → a ParModal confirm. Each tool wires @delete-all to its OWN
 * handler, so it must clear only that tool's storage. We seed deterministic
 * state rather than generate.
 */
function makeItem(name) {
  return {
    name,
    item_type: 'Wondrous Item',
    rarity: 'Rare',
    feature_count: 1,
    features: { Trait: 'A simple trait.' },
    physical_description: `The ${name}.`,
    lore: `History of the ${name}.`,
  };
}

const ENCOUNTERS = { Uncategorized: [{ name: 'Canyon Ambush', monsters: [], partyGroups: [] }] };

async function openDeleteAll(page) {
  // The "Data options" disclosure is a toggle; only expand it if the panel
  // isn't already open (cancel leaves it expanded).
  const deleteAll = page.getByTestId('data-options-delete-all');
  if (!(await deleteAll.isVisible())) {
    await page.getByTestId('data-options-toggle').click();
  }
  await deleteAll.click();
}

test.describe('Delete all', () => {
  test('clears this tool only, leaving other tools intact', async ({ page }) => {
    await seedStorage(page, 'savedItems', [makeItem('Aurora Lantern'), makeItem('Thornbound Censer')]);
    await seedStorage(page, 'encounters', ENCOUNTERS);
    await gotoTool(page, 'item-generator', { premium: true });

    await expect(page.locator('.sidebar-item')).toHaveCount(2);

    await openDeleteAll(page);
    await page.getByRole('dialog').getByRole('button', { name: 'Delete all items' }).click();

    // Items cleared…
    await expect(page.locator('.sidebar-item')).toHaveCount(0);
    expect(await readStorage(page, 'savedItems')).toEqual([]);
    // …encounters untouched.
    expect(await readStorage(page, 'encounters')).toEqual(ENCOUNTERS);
  });

  test('cancel preserves, then confirm clears', async ({ page }) => {
    await seedStorage(page, 'savedItems', [makeItem('Aurora Lantern')]);
    await gotoTool(page, 'item-generator', { premium: true });
    await expect(page.locator('.sidebar-item')).toHaveCount(1);

    // Cancel → still there
    await openDeleteAll(page);
    await page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).click();
    await expect(page.locator('.sidebar-item')).toHaveCount(1);

    // Confirm → cleared
    await openDeleteAll(page);
    await page.getByRole('dialog').getByRole('button', { name: 'Delete all items' }).click();
    await expect(page.locator('.sidebar-item')).toHaveCount(0);
  });
});
