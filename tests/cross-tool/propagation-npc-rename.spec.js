import { test, expect } from '@playwright/test';
import { gotoTool, switchTool } from '../helpers/page-nav.js';
import { seedStorage } from '../helpers/storage.js';

/**
 * Renaming an NPC fans its new display name out to every tool that stubs it —
 * items, settings, dungeons — via renameNPCReferences (matched by stable
 * npc_id). We rename in the NPC Generator UI, then verify each consuming tool.
 */
const NPC_ID = 'npc_aldric';
const OLD = 'Aldric the Paladin';
const NEW = 'Aldric the Redeemed';

const NPCS = {
  Uncategorized: [{
    npc_id: NPC_ID,
    npcDescriptionPart1: { character_name: OLD, read_aloud_description: 'A scarred knight.', combined_details: 'A veteran seeking redemption.' },
    npcDescriptionPart2: { relationships: {} },
  }],
};
const ITEMS = [{
  name: 'Oathkeeper Blade', item_type: 'Weapon', rarity: 'Rare', feature_count: 1,
  features: { Oath: 'Advantage on saves vs fear.' }, physical_description: 'A notched longsword.', lore: 'Once carried by a fallen paladin.',
  related_npcs: [{ name: OLD, role_brief: 'former wielder', npc_id: NPC_ID }],
}];
const SETTINGS = [{
  id: 'set_propa', place_name: 'Greywatch', setting_overview: { overview: 'A border keep on the marches.' },
  npcs: [{ npc_id: NPC_ID, name: OLD, read_aloud_description: 'A scarred knight.', combined_details: 'Garrison veteran.' }],
}];
const DUNGEONS = [{
  id: 'dng_propa', dungeonOverview: { name: 'The Sunken Vigil' },
  npcs: [{ npc_id: NPC_ID, name: OLD, read_aloud_description: 'A scarred knight.', combined_details: 'Guards the lower vault.' }],
}];

test('renaming an NPC propagates the name to item, setting, and dungeon stubs', async ({ page }) => {
  await seedStorage(page, 'npcGeneratorNPCs', NPCS);
  await seedStorage(page, 'savedItems', ITEMS);
  await seedStorage(page, 'gameSettings', SETTINGS);
  await seedStorage(page, 'dungeons', DUNGEONS);

  // Rename in the NPC Generator.
  await gotoTool(page, 'npc-generator', { premium: true });
  await page.locator('.npc-row__button', { hasText: OLD }).click();
  await page.getByTestId('edit-npc').click();
  await page.locator('[data-testid="npc-edit-name"] input').fill(NEW);
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page.locator('.npc-card-name')).toHaveText(NEW);

  // Item stub shows the new name.
  await switchTool(page, 'item-generator', { premium: true });
  await page.locator('.sidebar-item__name', { hasText: 'Oathkeeper Blade' }).click();
  await expect(page.locator('.related-npc-name')).toHaveText(NEW);

  // Setting NPC stub shows the new name.
  await switchTool(page, 'setting-generator', { premium: true });
  await page.locator('.setting-tree-label', { hasText: 'Greywatch' }).click();
  await page.getByRole('tab', { name: 'NPCs' }).click();
  await expect(page.locator('.npc-collapsed-name')).toHaveText(NEW);

  // Dungeon NPC stub shows the new name.
  await switchTool(page, 'dungeon-generator', { premium: true });
  await page.locator('.dungeon-button', { hasText: 'The Sunken Vigil' }).click();
  await page.getByRole('tab', { name: 'NPCs' }).click();
  await expect(page.locator('.npc-collapsed-name')).toHaveText(NEW);
});
