import { test, expect } from '@playwright/test';
import { gotoTool, switchTool } from '../helpers/page-nav.js';
import { seedStorage, readStorage } from '../helpers/storage.js';

/**
 * Deleting an NPC resets every promoted stub that pointed at it back to the
 * un-promoted state (npc_id cleared, generated fields dropped) via
 * resetStubsForDeletedNPC. In a setting/dungeon the stub reverts from an
 * expandable NPC to a "Generate full NPC" stub. We delete in the NPC Generator
 * and verify both the setting and the dungeon.
 */
const NPC_ID = 'npc_aldric_del';
const NAME = 'Aldric the Paladin';

const NPCS = {
  Uncategorized: [{
    npc_id: NPC_ID,
    npcDescriptionPart1: { character_name: NAME, read_aloud_description: 'A scarred knight.', combined_details: 'A veteran.' },
    npcDescriptionPart2: { relationships: {} },
  }],
};
// Promoted stubs: carry the generated fields so they start as full NPCs, not stubs.
const SETTINGS = [{
  id: 'set_del', place_name: 'Greywatch', setting_overview: { overview: 'A border keep.' },
  factions: [], importantLocations: [], questHooks: [],
  npcs: [{ npc_id: NPC_ID, name: NAME, read_aloud_description: 'A scarred knight.', combined_details: 'Garrison veteran.' }],
}];
const DUNGEONS = [{
  id: 'dng_del', dungeonOverview: { name: 'The Sunken Vigil' },
  npcs: [{ npc_id: NPC_ID, name: NAME, read_aloud_description: 'A scarred knight.', combined_details: 'Guards the vault.' }],
}];

test('deleting an NPC resets its setting and dungeon stubs to un-promoted', async ({ page }) => {
  await seedStorage(page, 'npcGeneratorNPCs', NPCS);
  await seedStorage(page, 'gameSettings', SETTINGS);
  await seedStorage(page, 'dungeons', DUNGEONS);

  // Delete the NPC.
  await gotoTool(page, 'npc-generator', { premium: true });
  await page.locator('.npc-row__button', { hasText: NAME }).click();
  await page.getByTestId('delete-npc').click();
  await page.getByRole('dialog').getByRole('button', { name: 'Delete NPC' }).click();

  // Setting stub reverted to "Generate full NPC" (and npc_id cleared in storage).
  await switchTool(page, 'setting-generator', { premium: true });
  await page.locator('.setting-tree-label', { hasText: 'Greywatch' }).click();
  await page.getByRole('tab', { name: 'NPCs' }).click();
  await expect(page.getByRole('button', { name: /Generate full NPC/ })).toBeVisible();
  expect((await readStorage(page, 'gameSettings'))[0].npcs[0].npc_id).toBeNull();

  // Dungeon stub reverted likewise.
  await switchTool(page, 'dungeon-generator', { premium: true });
  await page.locator('.dungeon-button', { hasText: 'The Sunken Vigil' }).click();
  await page.getByRole('tab', { name: 'NPCs' }).click();
  await expect(page.getByRole('button', { name: /Generate full NPC/ })).toBeVisible();
  expect((await readStorage(page, 'dungeons'))[0].npcs[0].npc_id).toBeNull();
});
