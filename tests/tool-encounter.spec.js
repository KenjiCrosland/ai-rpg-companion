import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';
import { mockLLM } from './helpers/llm-mocks.js';

test.describe('Encounter Generator — happy path', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'encounter');
  });

  test('generates an encounter after selecting a monster', async ({ page }) => {
    await gotoTool(page, 'encounter-generator', { premium: true });

    // Generation is blocked with no monsters selected, so pick one from the
    // SRD picker. The 469KB SRD list lazy-loads, so wait for rows to appear,
    // then click one (a .monster-row emits add-monster).
    const firstMonster = page.locator('.monster-picker .monster-row').first();
    await firstMonster.click({ timeout: 15_000 });

    await page.getByTestId('generate-encounter').click();

    await expect(page.getByTestId('encounter-output')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.encounter-title')).toHaveText('The Shattered Watchtower');
  });
});
