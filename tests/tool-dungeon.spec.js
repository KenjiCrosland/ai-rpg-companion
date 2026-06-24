import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';
import { mockLLM } from './helpers/llm-mocks.js';

test.describe('Dungeon Generator — happy path', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'dungeon');
  });

  test('generates a dungeon and renders the content container', async ({ page }) => {
    await gotoTool(page, 'dungeon-generator', { premium: true });

    await page.fill('#dungeon_description', 'a sunken ziggurat');
    await page.getByTestId('generate-dungeon').click();

    await expect(page.getByTestId('dungeon-output')).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText('The Sunken Citadel').first()).toBeVisible();
  });
});
