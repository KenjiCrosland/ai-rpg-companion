import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';

/**
 * Real-endpoint smoke tests. These DO NOT mock the LLM — they hit the live
 * `/api/ai/*` proxy, which requires a provider API key in the dev server's
 * environment (.env.local). They are slow and mildly flaky, so they are
 * skipped unless SMOKE=true. Run with `npm run test:e2e:smoke`.
 */
const SMOKE = process.env.SMOKE === 'true';

test.describe('Real-endpoint smoke tests', () => {
  test.skip(!SMOKE, 'Smoke tests run only with SMOKE=true');

  test('item generator produces real content from the API', async ({ page }) => {
    await gotoTool(page, 'item-generator', { premium: true });

    await page.getByTestId('generate-item').click();

    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 60_000 });
    await expect(page.getByTestId('item-name')).not.toBeEmpty();
  });

  test('encounter generator produces real content with a read-aloud block', async ({ page }) => {
    await gotoTool(page, 'encounter-generator', { premium: true });

    const firstMonster = page.locator('.monster-picker .monster-row').first();
    await firstMonster.click({ timeout: 15_000 });

    await page.getByTestId('generate-encounter').click();

    await expect(page.getByTestId('encounter-output')).toBeVisible({ timeout: 90_000 });
    await expect(page.locator('.encounter-title')).not.toBeEmpty();
  });
});
