import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

test.describe('Encounter Generator — lifecycle', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'encounter');
  });

  async function createEncounter(page) {
    await gotoTool(page, 'encounter-generator', { premium: true });
    await page.locator('.monster-picker .monster-row').first().click({ timeout: 15_000 });
    await page.getByTestId('generate-encounter').click();
    await expect(page.getByTestId('encounter-output')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.encounter-title')).toHaveText('The Shattered Watchtower');
  }

  test('create → inline-edit place name → delete', async ({ page }) => {
    await createEncounter(page);

    // Inline edit the place name
    await page.getByTestId('edit-encounter').click();
    await page.getByLabel('Place name').fill('Renamed Watchtower');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.locator('.encounter-title')).toHaveText('Renamed Watchtower');

    // Delete via ParConfirm
    await page.getByTestId('delete-encounter').click();
    await page.getByRole('button', { name: 'Delete encounter' }).click();
    await expect(page.getByTestId('encounter-output')).toBeHidden();
  });

  test('delete is cancelable (ParConfirm cancel preserves)', async ({ page }) => {
    await createEncounter(page);

    await page.getByTestId('delete-encounter').click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByTestId('encounter-output')).toBeVisible();
    await expect(page.locator('.encounter-title')).toHaveText('The Shattered Watchtower');
  });
});
