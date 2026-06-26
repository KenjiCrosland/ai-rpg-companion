import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { seedStorage } from '../helpers/storage.js';

/**
 * Cross-tool navigation links. In dev, navigateToTool carries params via
 * sessionStorage (not query strings), so the URL isn't assertable — but we can
 * click each link and verify it lands on the right tool with the right entity
 * selected (the destination reads the nav params on mount and selects it).
 */
const NPC_ID = 'npc_yelena_link';

const ITEM = {
  name: 'Whisper Crown', item_type: 'Wondrous Item', rarity: 'Very Rare', feature_count: 1,
  features: { Whisper: 'detect thoughts once per day.' }, physical_description: 'A circlet.', lore: 'Crafted by the Oracle.',
  related_npcs: [{ name: 'Yelena of the Duskwood', role_brief: 'oracle', npc_id: NPC_ID }],
  related_settings: [{ name: 'Greywatch', role_brief: 'origin', setting_id: 'set_link' }],
  related_dungeons: [{ name: 'The Vigil', role_brief: 'trial', dungeon_id: 'dng_link' }],
};
const NPCS = {
  Uncategorized: [{
    npc_id: NPC_ID,
    npcDescriptionPart1: { character_name: 'Yelena of the Duskwood', read_aloud_description: 'An oracle.', combined_details: 'Ancient oracle.' },
    npcDescriptionPart2: { relationships: {} },
    sourceType: 'item', sourceId: 'Whisper Crown', sourceName: 'Whisper Crown', typeOfPlace: 'oracle',
  }],
};
const SETTINGS = [{ id: 'set_link', place_name: 'Greywatch', setting_overview: { overview: 'A border keep.' } }];
const DUNGEONS = [{ id: 'dng_link', dungeonOverview: { name: 'The Vigil' } }];

async function seedAll(page) {
  await seedStorage(page, 'savedItems', [ITEM]);
  await seedStorage(page, 'npcGeneratorNPCs', NPCS);
  await seedStorage(page, 'gameSettings', SETTINGS);
  await seedStorage(page, 'dungeons', DUNGEONS);
}

test.describe('Cross-tool navigation links', () => {
  test('item "View in NPC Generator" lands on the NPC and back via the source link', async ({ page }) => {
    await seedAll(page);
    await gotoTool(page, 'item-generator', { premium: true });
    await page.locator('.sidebar-item__name', { hasText: 'Whisper Crown' }).click();

    // Forward: item stub → NPC generator with that NPC selected.
    await page.locator('.related-npc-row', { hasText: 'Yelena of the Duskwood' })
      .getByRole('button', { name: 'View in NPC Generator' }).click();
    await expect(page.getByTestId('npc-output')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.npc-card-name')).toHaveText('Yelena of the Duskwood');

    // Back: NPC source link → item generator with that item selected.
    await page.locator('.npc-source-link').click();
    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId('item-name')).toHaveText('Whisper Crown');
  });

  test('item "View in Setting Generator" lands on the setting', async ({ page }) => {
    await seedAll(page);
    await gotoTool(page, 'item-generator', { premium: true });
    await page.locator('.sidebar-item__name', { hasText: 'Whisper Crown' }).click();

    await page.locator('.related-setting-row, .related-setting', { hasText: 'Greywatch' })
      .getByRole('button', { name: 'View in Setting Generator' }).click();
    await expect(page.getByTestId('setting-output')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.setting-card-name')).toHaveText('Greywatch');
  });

  test('item "View in Dungeon Generator" lands on the dungeon', async ({ page }) => {
    await seedAll(page);
    await gotoTool(page, 'item-generator', { premium: true });
    await page.locator('.sidebar-item__name', { hasText: 'Whisper Crown' }).click();

    await page.locator('.related-dungeon-row, .related-dungeon', { hasText: 'The Vigil' })
      .getByRole('button', { name: 'View in Dungeon Generator' }).click();
    await expect(page.getByTestId('dungeon-output')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.dungeon-card-name')).toHaveText('The Vigil');
  });
});
