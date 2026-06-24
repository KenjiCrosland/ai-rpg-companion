import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

test.describe('Item Generator — lifecycle', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'item');
  });

  test('create → inline-edit name → delete', async ({ page }) => {
    await gotoTool(page, 'item-generator', { premium: true });

    // Create
    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('item-name')).toHaveText('Verdant Resilience Cloak');
    await expect(page.locator('.sidebar-item')).toHaveCount(1);

    // Inline edit: rename and save
    await page.getByTestId('edit-item').click();
    await page.getByLabel('Name', { exact: true }).fill('Renamed Cloak of Testing');
    await page.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.getByTestId('item-name')).toHaveText('Renamed Cloak of Testing');
    await expect(page.locator('.sidebar-item__name')).toHaveText('Renamed Cloak of Testing');

    // Delete via ParConfirm. The trigger and the confirm button share the text
    // "Delete item", so scope the confirm click to the dialog.
    await page.getByTestId('delete-item').click();
    await page.getByRole('dialog').getByRole('button', { name: 'Delete item' }).click();
    await expect(page.locator('.sidebar-item')).toHaveCount(0);
  });

  test('delete is cancelable (ParConfirm cancel preserves)', async ({ page }) => {
    await gotoTool(page, 'item-generator', { premium: true });
    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('item-name')).toHaveText('Verdant Resilience Cloak');

    await page.getByTestId('delete-item').click();
    await page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).click();
    await expect(page.locator('.sidebar-item')).toHaveCount(1);
    await expect(page.getByTestId('item-name')).toHaveText('Verdant Resilience Cloak');
  });

  test('inline-edit cancel discards changes', async ({ page }) => {
    await gotoTool(page, 'item-generator', { premium: true });

    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('item-name')).toHaveText('Verdant Resilience Cloak');

    await page.getByTestId('edit-item').click();
    await page.getByLabel('Name', { exact: true }).fill('Should Not Persist');
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByTestId('item-name')).toHaveText('Verdant Resilience Cloak');
    await expect(page.locator('.sidebar-item__name')).toHaveText('Verdant Resilience Cloak');
  });
});
