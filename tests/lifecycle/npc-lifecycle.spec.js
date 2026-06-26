import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

test.describe('NPC Generator — lifecycle', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'npc');
  });

  async function createNPC(page) {
    await gotoTool(page, 'npc-generator', { premium: true });
    await page.fill('#typeOfNPC', 'a scheming guildmaster');
    await page.getByTestId('generate-npc').click();
    await expect(page.getByTestId('npc-output')).toBeVisible({ timeout: 15_000 });
    // Two-part generation — wait for relationships (part 2) so the card is settled.
    await expect(page.locator('.npc-card-name')).toHaveText('Eldrin Shadowmoon');
  }

  test('create → inline-edit name → delete', async ({ page }) => {
    await createNPC(page);

    // Inline edit the name (scoped testid disambiguates from relationship names)
    await page.getByTestId('edit-npc').click();
    await page.locator('[data-testid="npc-edit-name"] input').fill('Renamed Rogue');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.locator('.npc-card-name')).toHaveText('Renamed Rogue');

    // Delete via ParConfirm
    await page.getByTestId('delete-npc').click();
    await page.getByRole('button', { name: 'Delete NPC' }).click();
    await expect(page.locator('.npc-card-name')).toHaveCount(0);
  });

  test('delete is cancelable (ParConfirm cancel preserves)', async ({ page }) => {
    await createNPC(page);

    await page.getByTestId('delete-npc').click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.locator('.npc-card-name')).toHaveText('Eldrin Shadowmoon');
  });
});
