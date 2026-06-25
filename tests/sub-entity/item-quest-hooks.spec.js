import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

/**
 * Sub-entity CRUD: quest hooks live inside a magic item. "Add" is a generation
 * call (pick a quest type → Generate quest hook), edit is inline, delete is a
 * ParConfirm. Mock returns the item (call 0) then the quest hook (call 1).
 */
async function generateHook(page) {
  await gotoTool(page, 'item-generator', { premium: true });
  await page.getByTestId('generate-item').click();
  await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 15_000 });

  await page.getByRole('tab', { name: 'Quest Hooks' }).click();
  await page.getByLabel('Quest type').selectOption('Recovery: Retrieve the item from a dangerous location');
  await page.getByRole('button', { name: /Generate quest hook/i }).click();

  // The generated hook auto-expands.
  await expect(page.locator('.quest-hook-expanded__title')).toHaveText('The Drowned Vault of Eldora', { timeout: 15_000 });
}

test.describe('Item quest hooks — sub-entity CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'item-quest-hook');
  });

  test('generate → inline-edit the hook title', async ({ page }) => {
    await generateHook(page);

    const card = page.locator('.quest-card');
    await card.getByRole('button', { name: 'Edit' }).click();
    await card.getByLabel('Title').fill('The Renamed Vault');
    await card.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.locator('.quest-hook-expanded__title')).toHaveText('The Renamed Vault');
  });

  test('generate → delete the hook (ParConfirm)', async ({ page }) => {
    await generateHook(page);

    await page.locator('.quest-card').getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Delete quest hook' }).click();

    await expect(page.locator('.quest-hook-expanded__title')).toHaveCount(0);
    await expect(page.getByText('The Drowned Vault of Eldora')).toHaveCount(0);
  });
});
