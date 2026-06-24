import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';
import { mockLLM } from './helpers/llm-mocks.js';

test.describe('Persistence', () => {
  test('a generated item survives a page reload', async ({ page }) => {
    await mockLLM(page, 'item');
    await gotoTool(page, 'item-generator', { premium: true });

    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 10_000 });

    await page.reload({ waitUntil: 'domcontentloaded' });

    // Still in the sidebar after reload.
    const sidebarItem = page.locator('.sidebar-item__name', { hasText: 'Verdant Resilience Cloak' });
    await expect(sidebarItem).toBeVisible();

    // And reopening it restores the item view.
    await sidebarItem.click();
    await expect(page.getByTestId('item-name')).toHaveText('Verdant Resilience Cloak');
  });
});
