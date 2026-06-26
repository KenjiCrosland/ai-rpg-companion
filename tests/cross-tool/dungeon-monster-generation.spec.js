import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { seedStorage } from '../helpers/storage.js';
import { mockLLM } from '../helpers/llm-mocks.js';

/**
 * Generating a custom monster inside a dungeon. The MonstersTab "Create monster"
 * form creates the monster then generates its statblock (two-part, same prompts
 * as the Statblock Generator). We seed a dungeon, fill the form, and verify the
 * new monster appears with a rendered statblock.
 */
const DUNGEONS = [{
  id: 'dng_mon', dungeonOverview: { name: 'Test Crypt', title: 'A tomb', overview: 'A quiet crypt.' },
  monsters: [], npcs: [], rooms: [],
}];

test('creating a custom dungeon monster generates and renders its statblock', async ({ page }) => {
  await mockLLM(page, 'statblock');
  await seedStorage(page, 'dungeons', DUNGEONS);

  await gotoTool(page, 'dungeon-generator', { premium: true });
  await page.locator('.dungeon-button', { hasText: 'Test Crypt' }).click();
  await page.getByRole('tab', { name: 'Monsters' }).click();

  // Fill the "Create a custom monster" form.
  await page.locator('#monsterName').fill('Bone Colossus');
  // The form has two selects: Monster Type then CR.
  const selects = page.locator('.create-monster-form select');
  await selects.nth(0).selectOption({ index: 1 });
  await selects.nth(1).selectOption({ index: 1 });
  await page.getByRole('button', { name: 'Create monster' }).click();

  // The new monster appears…
  await expect(page.locator('.monster-card__title', { hasText: 'Bone Colossus' })).toBeVisible({ timeout: 15_000 });

  // …with a generated statblock (expand it and confirm — no "not found").
  await page.locator('.monster-card--collapsed', { hasText: 'Bone Colossus' }).click();
  await expect(page.locator('.monster-card--expanded').getByText('Armor Class').first()).toBeVisible({ timeout: 15_000 });
  await expect(page.locator('.statblock-not-found-message')).toHaveCount(0);
});
