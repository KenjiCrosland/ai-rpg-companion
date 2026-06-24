import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';
import { mockLLM } from './helpers/llm-mocks.js';

test.describe('Item Generator — happy path', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'item');
  });

  test('generates a magic item and renders it', async ({ page }) => {
    await gotoTool(page, 'item-generator', { premium: true });

    await page.getByTestId('generate-item').click();

    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId('item-name')).toHaveText('Verdant Resilience Cloak');
  });

  test('generated item appears in the sidebar', async ({ page }) => {
    await gotoTool(page, 'item-generator', { premium: true });

    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 10_000 });

    await expect(page.locator('.sidebar-item')).toHaveCount(1);
    await expect(page.locator('.sidebar-item__name')).toHaveText('Verdant Resilience Cloak');
  });
});
