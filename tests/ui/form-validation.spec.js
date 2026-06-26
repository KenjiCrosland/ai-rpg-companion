import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

/**
 * Most generator forms allow blank input ("leave blank for a surprise"), so the
 * one hard required-field gate is the encounter's monster list. (Statblock CR is
 * optional — defaults to random. Faction/quest-hook gates are generation flows,
 * covered when Phase 2 fixtures land. Quota gating is covered by quota-counts.)
 */
test.describe('Form validation', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'encounter');
  });

  test('encounter requires at least one monster', async ({ page }) => {
    await gotoTool(page, 'encounter-generator', { premium: true });

    // Generate with no monsters selected → warning, no generation.
    await page.getByTestId('generate-encounter').click();
    await expect(page.getByText('Add at least one monster before generating.')).toBeVisible();
    await expect(page.getByTestId('encounter-output')).toBeHidden();

    // Adding a monster releases the gate.
    await page.locator('.monster-picker .monster-row').first().click({ timeout: 15_000 });
    await page.getByTestId('generate-encounter').click();
    await expect(page.getByTestId('encounter-output')).toBeVisible({ timeout: 15_000 });
  });
});
