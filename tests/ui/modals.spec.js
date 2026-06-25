import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { seedStorage } from '../helpers/storage.js';

function makeItem(name) {
  return {
    name, item_type: 'Wondrous Item', rarity: 'Rare', feature_count: 1,
    features: { Trait: 'A trait.' }, physical_description: `The ${name}.`, lore: `Lore of ${name}.`,
  };
}

async function seedOneItem(page) {
  await seedStorage(page, 'savedItems', [makeItem('Aurora Lantern')]);
  await gotoTool(page, 'item-generator', { premium: true });
  await expect(page.locator('.sidebar-item')).toHaveCount(1);
}

test.describe('Modal behavior', () => {
  test('delete-all modal closes on Escape without deleting', async ({ page }) => {
    await seedOneItem(page);

    await page.getByTestId('data-options-toggle').click();
    await page.getByTestId('data-options-delete-all').click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.locator('.sidebar-item')).toHaveCount(1);
  });

  test('delete-all modal closes on backdrop click without deleting', async ({ page }) => {
    await seedOneItem(page);

    await page.getByTestId('data-options-toggle').click();
    await page.getByTestId('data-options-delete-all').click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // ParModal closes on a backdrop click via @click.self (target must be the
    // backdrop, not the dialog). Dispatch the click on the backdrop element
    // itself so event.target === the backdrop.
    await page.locator('.par-modal-backdrop').evaluate((el) => el.click());
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.locator('.sidebar-item')).toHaveCount(1);
  });

  test('destructive ParConfirm closes on Escape, preserving the entity', async ({ page }) => {
    await seedOneItem(page);
    await page.locator('.sidebar-item__button').first().click();
    await expect(page.getByTestId('item-name')).toHaveText('Aurora Lantern');

    await page.getByTestId('delete-item').click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.locator('.sidebar-item')).toHaveCount(1);
  });

  test('DataManagerModal opens and closes', async ({ page }) => {
    await seedOneItem(page);

    await page.getByTestId('data-options-toggle').click();
    await page.getByRole('button', { name: 'Backup / Restore library' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
  });
});
