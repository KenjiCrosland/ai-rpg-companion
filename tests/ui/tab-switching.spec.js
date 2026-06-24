import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

/**
 * ParTabs renders role="tab" buttons with aria-selected, so tabs are targeted
 * by accessible name. We verify each tab activates and that the tool's output
 * container persists across switches (panels stay mounted).
 */

async function switchTo(page, name) {
  const tab = page.getByRole('tab', { name });
  await tab.click();
  await expect(tab).toHaveAttribute('aria-selected', 'true');
}

test.describe('Tab switching', () => {
  test('item generator tabs activate and content persists', async ({ page }) => {
    await mockLLM(page, 'item');
    await gotoTool(page, 'item-generator', { premium: true });
    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 10_000 });

    for (const name of ['Lore Builder', 'Quest Hooks', 'Item Details']) {
      await switchTo(page, name);
      await expect(page.getByTestId('item-output')).toBeVisible();
    }
    // Back on Item Details, the rendered item is intact.
    await expect(page.getByTestId('item-name')).toHaveText('Verdant Resilience Cloak');
  });

  test('setting generator tabs activate and content persists', async ({ page }) => {
    await mockLLM(page, 'setting');
    await gotoTool(page, 'setting-generator', { premium: true });
    await page.fill('#setting_description', 'a mercantile republic');
    await page.getByTestId('generate-setting').click();
    await expect(page.getByTestId('setting-output')).toBeVisible({ timeout: 15_000 });

    for (const name of ['Locations', 'Factions', 'NPCs', 'Quest Hooks', 'Overview']) {
      await switchTo(page, name);
      await expect(page.getByTestId('setting-output')).toBeVisible();
    }
    await expect(page.locator('.setting-card-name')).toHaveText("Eldora's Crossing");
  });

  test('dungeon generator tabs activate and content persists', async ({ page }) => {
    await mockLLM(page, 'dungeon');
    await gotoTool(page, 'dungeon-generator', { premium: true });
    await page.fill('#dungeon_description', 'a sunken ziggurat');
    await page.getByTestId('generate-dungeon').click();
    await expect(page.getByTestId('dungeon-output')).toBeVisible({ timeout: 15_000 });

    for (const name of ['Map', 'NPCs', 'Monsters', 'Overview']) {
      await switchTo(page, name);
      await expect(page.getByTestId('dungeon-output')).toBeVisible();
    }
    await expect(page.locator('.dungeon-card-name')).toHaveText('The Sunken Citadel');
  });
});
