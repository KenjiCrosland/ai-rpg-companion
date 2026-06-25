import { test, expect } from '@playwright/test';
import { gotoTool, switchTool } from '../helpers/page-nav.js';
import { seedStorage } from '../helpers/storage.js';

/**
 * Dungeon rename propagation. Previously there was no `renameDungeonReferences`,
 * so renaming a dungeon left dungeon-sourced NPC labels (and other denormalized
 * name caches) stale. That gap is now fixed: the dungeon overview's saveEdit
 * calls `renameDungeonReferences`, mirroring the Setting Generator. These tests
 * verify the rename reaches the item stub and the dungeon-sourced NPC.
 */

test('renaming a dungeon reflects in the item related-dungeon stub', async ({ page }) => {
  await seedStorage(page, 'savedItems', [{
    name: 'Wayfarer Compass', item_type: 'Wondrous Item', rarity: 'Uncommon', feature_count: 1,
    features: { Pull: 'Points toward the nearest threshold.' }, physical_description: 'A brass compass.', lore: 'Forged at the marches.',
    related_dungeons: [{ name: 'The Vigil', role_brief: 'trial', dungeon_id: 'dng_propa' }],
  }]);
  await seedStorage(page, 'dungeons', [{ id: 'dng_propa', dungeonOverview: { name: 'The Vigil', title: 'Tomb of the watch' } }]);

  await gotoTool(page, 'dungeon-generator', { premium: true });
  await page.locator('.dungeon-button', { hasText: 'The Vigil' }).click();
  await page.getByTestId('edit-dungeon').click();
  await page.locator('[data-testid="dungeon-edit-name"] input').fill('The Vigil Restored');
  await page.getByRole('button', { name: 'Save changes' }).click();

  await switchTool(page, 'item-generator', { premium: true });
  await page.locator('.sidebar-item__name', { hasText: 'Wayfarer Compass' }).click();
  await expect(page.locator('.related-dungeon-name')).toHaveText('The Vigil Restored');
});

test('renaming a dungeon updates a dungeon-sourced NPC label (fixed gap)', async ({ page }) => {
  await seedStorage(page, 'dungeons', [{ id: 'dng_src', dungeonOverview: { name: 'Old Crypt Name' } }]);
  await seedStorage(page, 'npcGeneratorNPCs', {
    Uncategorized: [{
      npc_id: 'npc_from_dungeon',
      npcDescriptionPart1: { character_name: 'Crypt Warden', read_aloud_description: 'A silent guardian.', combined_details: 'Bound to the crypt.' },
      npcDescriptionPart2: { relationships: {} },
      sourceType: 'dungeon', sourceId: 'dng_src', sourceName: 'Old Crypt Name', typeOfPlace: 'Old Crypt Name',
    }],
  });

  await gotoTool(page, 'dungeon-generator', { premium: true });
  await page.locator('.dungeon-button', { hasText: 'Old Crypt Name' }).click();
  await page.getByTestId('edit-dungeon').click();
  await page.locator('[data-testid="dungeon-edit-name"] input').fill('New Crypt Name');
  await page.getByRole('button', { name: 'Save changes' }).click();

  await switchTool(page, 'npc-generator', { premium: true });
  await page.locator('.npc-row__button', { hasText: 'Crypt Warden' }).click();
  // Now propagated: the NPC's "From <dungeon>" label shows the new name.
  await expect(page.locator('.npc-source-link')).toContainText('New Crypt Name');
  await expect(page.getByText('Old Crypt Name')).toHaveCount(0);
});

test('renaming a setting reflects in the item related-setting stub', async ({ page }) => {
  await seedStorage(page, 'savedItems', [{
    name: 'Wayfarer Compass', item_type: 'Wondrous Item', rarity: 'Uncommon', feature_count: 1,
    features: { Pull: 'Points toward the nearest threshold.' }, physical_description: 'A brass compass.', lore: 'Forged at the marches.',
    related_settings: [{ name: 'Greywatch', role_brief: 'origin', setting_id: 'set_propa' }],
  }]);
  // A real setting carries factions/importantLocations/npcs/questHooks arrays;
  // saveSettingsToLocalStorage maps over them, so they must be present.
  await seedStorage(page, 'gameSettings', [{
    id: 'set_propa', place_name: 'Greywatch', setting_overview: { overview: 'A border keep on the marches.' },
    factions: [], importantLocations: [], npcs: [], questHooks: [],
  }]);

  await gotoTool(page, 'setting-generator', { premium: true });
  await page.locator('.setting-tree-label', { hasText: 'Greywatch' }).click();
  await page.getByTestId('edit-setting').click();
  await page.locator('[data-testid="setting-edit-name"] input').fill('Greywatch Reborn');
  await page.getByRole('button', { name: 'Save changes' }).click();

  await switchTool(page, 'item-generator', { premium: true });
  await page.locator('.sidebar-item__name', { hasText: 'Wayfarer Compass' }).click();
  await expect(page.locator('.related-setting-name')).toHaveText('Greywatch Reborn');
});
