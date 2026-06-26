import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

test.describe('Dungeon Generator — lifecycle', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'dungeon');
  });

  async function createDungeon(page) {
    await gotoTool(page, 'dungeon-generator', { premium: true });
    await page.fill('#dungeon_description', 'a sunken ziggurat');
    await page.getByTestId('generate-dungeon').click();
    await expect(page.getByTestId('dungeon-output')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.dungeon-card-name')).toHaveText('The Sunken Citadel');
  }

  test('create → inline-edit name → delete', async ({ page }) => {
    await createDungeon(page);

    // Inline edit the name
    await page.getByTestId('edit-dungeon').click();
    await page.locator('[data-testid="dungeon-edit-name"] input').fill('Renamed Citadel');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.locator('.dungeon-card-name')).toHaveText('Renamed Citadel');

    // Delete via ParConfirm (trigger and confirm share "Delete dungeon" → scope to dialog)
    await page.getByTestId('delete-dungeon').click();
    await page.getByRole('dialog').getByRole('button', { name: 'Delete dungeon' }).click();
    await expect(page.getByTestId('dungeon-output')).toBeHidden();
  });

  test('delete is cancelable (ParConfirm cancel preserves)', async ({ page }) => {
    await createDungeon(page);

    await page.getByTestId('delete-dungeon').click();
    await page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).click();
    await expect(page.locator('.dungeon-card-name')).toHaveText('The Sunken Citadel');
  });
});
