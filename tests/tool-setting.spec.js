import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';
import { mockLLM } from './helpers/llm-mocks.js';

test.describe('Setting Generator — happy path', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'setting');
  });

  test('generates a setting and renders the tabs', async ({ page }) => {
    await gotoTool(page, 'setting-generator', { premium: true });

    await page.fill('#setting_description', 'a decadent mercantile republic in decline');
    await page.getByTestId('generate-setting').click();

    await expect(page.getByTestId('setting-output')).toBeVisible({ timeout: 15_000 });
    // Overview tab renders the generated description prose.
    await expect(page.getByText(/thriving mercantile city/i).first()).toBeVisible();
  });
});
