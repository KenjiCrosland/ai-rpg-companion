import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { seedStorage, readStorage } from '../helpers/storage.js';

/**
 * Data-safety: each tool's delete-all wires to its OWN handler and must clear
 * ONLY its own storage key. We seed every tool's library and verify deleting
 * one leaves the others byte-for-byte intact.
 */
const MONSTERS = { Uncategorized: [{ name: 'Goblin', challenge_rating: '1/4' }] };
const NPCS = { Uncategorized: [{ npc_id: 'npc_seed_1', npcDescriptionPart1: { character_name: 'Bram' } }] };
const SETTINGS = [{ id: 'set_seed_1', place_name: 'Riverhold', setting_overview: { overview: 'A town.' } }];
const DUNGEONS = [{ id: 'dng_seed_1', dungeonOverview: { name: 'The Hollow' } }];
const ENCOUNTERS = { Uncategorized: [{ name: 'Bridge Fight', monsters: [], partyGroups: [] }] };

function makeItem(name) {
  return {
    name, item_type: 'Wondrous Item', rarity: 'Rare', feature_count: 1,
    features: { Trait: 'A trait.' }, physical_description: `The ${name}.`, lore: `Lore of ${name}.`,
  };
}

async function openDeleteAll(page) {
  const deleteAll = page.getByTestId('data-options-delete-all');
  if (!(await deleteAll.isVisible())) await page.getByTestId('data-options-toggle').click();
  await deleteAll.click();
}

test('deleting one tool\'s library leaves every other tool intact', async ({ page }) => {
  await seedStorage(page, 'monsters', MONSTERS);
  await seedStorage(page, 'savedItems', [makeItem('Aurora Lantern'), makeItem('Thornbound Censer')]);
  await seedStorage(page, 'npcGeneratorNPCs', NPCS);
  await seedStorage(page, 'gameSettings', SETTINGS);
  await seedStorage(page, 'dungeons', DUNGEONS);
  await seedStorage(page, 'encounters', ENCOUNTERS);

  await gotoTool(page, 'item-generator', { premium: true });
  await expect(page.locator('.sidebar-item')).toHaveCount(2);

  // Baseline AFTER mount (migrations/quota seeding have already settled), so the
  // comparison isolates the delete's effect — not mount-time normalization.
  const otherKeys = ['monsters', 'npcGeneratorNPCs', 'gameSettings', 'dungeons', 'encounters'];
  const before = {};
  for (const k of otherKeys) before[k] = await readStorage(page, k);

  // Delete ALL items.
  await openDeleteAll(page);
  await page.getByRole('dialog').getByRole('button', { name: 'Delete all items' }).click();
  await expect(page.locator('.sidebar-item')).toHaveCount(0);

  // Items gone…
  expect(await readStorage(page, 'savedItems')).toEqual([]);
  // …and the delete touched no other tool's storage.
  for (const k of otherKeys) {
    expect(await readStorage(page, k)).toEqual(before[k]);
  }
});
