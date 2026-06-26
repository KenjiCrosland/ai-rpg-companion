import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';
import { mockLLM } from './helpers/llm-mocks.js';

test.describe('NPC Generator — happy path', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'npc');
  });

  test('generates an NPC and renders the card', async ({ page }) => {
    await gotoTool(page, 'npc-generator', { premium: true });

    await page.fill('#typeOfNPC', 'a scheming guildmaster');
    await page.getByTestId('generate-npc').click();

    await expect(page.getByTestId('npc-output')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.npc-card-name')).toHaveText('Eldrin Shadowmoon');
  });
});
