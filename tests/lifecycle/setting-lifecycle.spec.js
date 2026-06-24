import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

test.describe('Setting Generator — lifecycle', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'setting');
  });

  async function createSetting(page) {
    await gotoTool(page, 'setting-generator', { premium: true });
    await page.fill('#setting_description', 'a decadent mercantile republic in decline');
    await page.getByTestId('generate-setting').click();
    await expect(page.getByTestId('setting-output')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.setting-card-name')).toHaveText("Eldora's Crossing");
  }

  test('create → inline-edit name → delete', async ({ page }) => {
    await createSetting(page);

    // Inline edit the name
    await page.getByTestId('edit-setting').click();
    await page.locator('[data-testid="setting-edit-name"] input').fill('Renamed Crossing');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.locator('.setting-card-name')).toHaveText('Renamed Crossing');

    // Delete via ParConfirm (trigger and confirm share "Delete setting" → scope to dialog)
    await page.getByTestId('delete-setting').click();
    await page.getByRole('dialog').getByRole('button', { name: 'Delete setting' }).click();
    await expect(page.getByTestId('setting-output')).toBeHidden();
  });

  test('delete is cancelable (ParConfirm cancel preserves)', async ({ page }) => {
    await createSetting(page);

    await page.getByTestId('delete-setting').click();
    await page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).click();
    await expect(page.locator('.setting-card-name')).toHaveText("Eldora's Crossing");
  });
});
