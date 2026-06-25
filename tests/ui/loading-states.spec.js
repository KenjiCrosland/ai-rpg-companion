import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLMWithDelay, failLLM } from '../helpers/llm-mocks.js';

test.describe('Loading & error states', () => {
  test('loading state appears during generation and clears on completion', async ({ page }) => {
    await mockLLMWithDelay(page, 'item', 2000);
    await gotoTool(page, 'item-generator', { premium: true });

    const genBtn = page.getByTestId('generate-item');
    await genBtn.click();

    // While generating, the landing form is replaced by the loading skeleton.
    await expect(genBtn).toBeHidden();

    // When the response resolves, the output renders and loading clears.
    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId('item-name')).toHaveText('Verdant Resilience Cloak');
  });

  test('generation error clears loading and re-enables the form', async ({ page }) => {
    await failLLM(page);
    await gotoTool(page, 'encounter-generator', { premium: true });
    await page.locator('.monster-picker .monster-row').first().click({ timeout: 15_000 });

    const genBtn = page.getByTestId('generate-encounter');
    await genBtn.click();

    // The error surfaces and the button recovers (no stuck spinner).
    await expect(page.getByText('Failed to generate encounter. Please try again.')).toBeVisible({ timeout: 15_000 });
    await expect(genBtn).toBeEnabled();
    await expect(genBtn).toContainText('Generate encounter');
  });

  test('navigating away mid-generation lands cleanly on the destination tool', async ({ page }) => {
    await mockLLMWithDelay(page, 'item', 4000);
    await gotoTool(page, 'item-generator', { premium: true });

    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('generate-item')).toBeHidden(); // generation in flight

    // Switch tools before the generation resolves (full reload abandons it).
    await page.evaluate(() => localStorage.setItem('dev-current-page', 'npc-generator-premium'));
    await page.reload({ waitUntil: 'domcontentloaded' });

    // Destination tool renders cleanly — no orphaned loading state.
    await expect(page.getByTestId('generate-npc')).toBeVisible();
  });
});
