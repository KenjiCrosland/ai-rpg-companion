import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';
import { mockLLM } from './helpers/llm-mocks.js';

/**
 * Cross-tool seeded flow: an item's related-NPC stub promotes into the NPC
 * Generator with the item's context prefilled. This exercises navigation
 * (navigateToTool) + the seeded-input substrate end to end.
 */
test.describe('Cross-tool integration', () => {
  test('item NPC stub promotes into the NPC generator with prefill', async ({ page }) => {
    await mockLLM(page, 'item');
    await gotoTool(page, 'item-generator', { premium: true });

    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 10_000 });

    // The fixture carries a related-NPC stub; its card exposes a "Create NPC"
    // action that navigates to the NPC generator.
    await page.getByRole('button', { name: /create npc/i }).first().click();

    // Landed on the NPC generator (full page navigation in dev).
    await expect(page.locator('#typeOfNPC')).toBeVisible({ timeout: 15_000 });
    // …with the item's context prefilled into the NPC description field.
    await expect(page.locator('#typeOfNPC')).toHaveValue(/Verdant Resilience Cloak/i);
  });
});
