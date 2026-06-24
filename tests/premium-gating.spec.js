import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';
import { mockLLM } from './helpers/llm-mocks.js';

/**
 * Premium gating in cros.land is NOT a tool-wide wall — free users can still
 * generate items/encounters/NPCs. The visible difference is the PatreonCallout
 * upsell (`.patreon-callout`), shown to free users and hidden for premium. In
 * dev, premium is the page variant: `<tool>-premium` mounts with :premium=true.
 */
test.describe('Premium gating — PatreonCallout visibility', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'item');
  });

  test('free user sees the upsell callout', async ({ page }) => {
    await gotoTool(page, 'item-generator', { premium: false });
    await expect(page.locator('.patreon-callout').first()).toBeVisible();
  });

  test('premium user does not see the upsell callout', async ({ page }) => {
    await gotoTool(page, 'item-generator', { premium: true });
    await expect(page.getByTestId('generate-item')).toBeVisible();
    await expect(page.locator('.patreon-callout')).toHaveCount(0);
  });
});
