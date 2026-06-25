import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';

/**
 * Real-endpoint smoke tests — part of the normal e2e run. Unlike every other
 * spec, these DO NOT mock the LLM: they hit the live `/api/ai/*` proxy to catch
 * integration breakage mocks can't (proxy wiring, response-shape drift). They
 * need a provider API key in the dev server's `.env.local`, make a few real
 * (cheap) calls, and are slower + mildly flakier than the mocked specs.
 *
 * For a fast, zero-cost iteration loop that skips these, run the mocked-only
 * script: `npm run test:e2e:mocked` (grep-inverts "smoke").
 */
test.describe('Real-endpoint smoke tests', () => {
  // Real LLM calls exceed the global 30s test timeout — give them room.
  test.describe.configure({ timeout: 120_000 });

  test('item generator produces real content from the API', async ({ page }) => {
    await gotoTool(page, 'item-generator', { premium: true });

    await page.getByTestId('generate-item').click();

    await expect(page.getByTestId('item-name')).not.toBeEmpty({ timeout: 60_000 });
  });

  test('encounter generator produces real content', async ({ page }) => {
    await gotoTool(page, 'encounter-generator', { premium: true });

    const firstMonster = page.locator('.monster-picker .monster-row').first();
    await firstMonster.click({ timeout: 15_000 });

    await page.getByTestId('generate-encounter').click();

    // The title only renders once the real call-1 response (place_name) lands —
    // give it the full real-call budget, not the default expect timeout.
    await expect(page.locator('.encounter-title')).not.toBeEmpty({ timeout: 90_000 });
  });
});
