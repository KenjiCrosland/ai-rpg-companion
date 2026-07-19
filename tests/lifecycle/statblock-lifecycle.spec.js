import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

/**
 * Statblock lifecycle is create → delete. (Editing a statblock is a separate
 * regenerate/edit flow, not a simple inline name edit.) We gate on the saved
 * `monsters` localStorage count rather than rendered output, because the
 * 2-column renderer doesn't expose statblock fields as queryable text.
 */
const savedCount = (page) =>
  page.evaluate(() => {
    const m = JSON.parse(localStorage.getItem('monsters') || '{}');
    return (m.Uncategorized || []).length;
  });

test.describe('Statblock Generator — lifecycle', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'statblock');
    // The form defaults to 2024 rules; these specs (and the mocked LLM
    // fixtures) drive the 2014 two-part flow. Raw setItem — the format key
    // stores a bare string, so seedStorage's JSON.stringify would corrupt it.
    await page.addInitScript(() => localStorage.setItem('statblock-format', '2014'));
  });

  async function createStatblock(page) {
    await gotoTool(page, 'statblock-generator', { premium: true });
    await page.locator('.generate-button').click();
    await page.waitForFunction(
      () => {
        const m = JSON.parse(localStorage.getItem('monsters') || '{}');
        return (m.Uncategorized || []).length >= 1;
      },
      undefined,
      { timeout: 15_000 },
    );
  }

  test('create → delete', async ({ page }) => {
    await createStatblock(page);
    expect(await savedCount(page)).toBe(1);

    // Delete via ParConfirm
    await page.getByTestId('delete-statblock').click();
    await page.getByRole('button', { name: 'Delete statblock' }).click();

    await expect.poll(() => savedCount(page)).toBe(0);
    await expect(page.locator('.generate-button')).toBeVisible();
  });

  test('delete is cancelable (ParConfirm cancel preserves)', async ({ page }) => {
    await createStatblock(page);

    await page.getByTestId('delete-statblock').click();
    await page.getByRole('button', { name: 'Cancel' }).click();

    expect(await savedCount(page)).toBe(1);
  });
});
