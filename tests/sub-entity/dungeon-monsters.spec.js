import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

/**
 * Dungeon monsters are sub-entities of a dungeon. The overview already seeds a
 * short monster list, so no extra generation is needed to exercise delete (a
 * ParConfirm). Inline edit of a monster requires a generated full description
 * first ("Edit description" is hidden until then) — deferred.
 */
test.describe('Dungeon monsters — sub-entity delete', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'dungeon');
  });

  test('delete a monster (ParConfirm)', async ({ page }) => {
    await gotoTool(page, 'dungeon-generator', { premium: true });
    await page.fill('#dungeon_description', 'a sunken ziggurat');
    await page.getByTestId('generate-dungeon').click();
    await expect(page.getByTestId('dungeon-output')).toBeVisible({ timeout: 15_000 });

    await page.getByRole('tab', { name: 'Monsters' }).click();
    await expect(page.locator('.monster-list-item')).toHaveCount(3);

    // Expand a monster and delete it via ParConfirm.
    await page.locator('.monster-card--collapsed', { hasText: 'Draugr Sentry' }).click();
    await page.locator('.monster-card--expanded').getByRole('button', { name: 'Delete monster' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Delete monster' }).click();

    await expect(page.getByText('Draugr Sentry')).toHaveCount(0);
    await expect(page.locator('.monster-list-item')).toHaveCount(2);
  });
});
