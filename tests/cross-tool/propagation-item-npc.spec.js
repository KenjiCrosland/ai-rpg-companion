import { test, expect } from '@playwright/test';
import { gotoTool, switchTool } from '../helpers/page-nav.js';
import { seedStorage } from '../helpers/storage.js';

/**
 * Cross-tool PROPAGATION between the Item Generator and NPC Generator. The
 * substrate keeps related entities in sync: renaming an item updates the NPC's
 * source label, deleting the item flags the NPC's source as "(deleted)", and
 * deleting the NPC resets the item's promoted stub back to "Create NPC". Each
 * test performs the action in one tool's UI and verifies the other tool.
 */
const NPC_ID = 'npc_link_yelena';

const ITEM = {
  name: 'Whisper Crown',
  item_type: 'Wondrous Item',
  rarity: 'Very Rare',
  feature_count: 1,
  features: { Whisper: 'You can cast detect thoughts once per day.' },
  physical_description: 'A circlet of mithril and moonstone.',
  lore: 'Crafted by the Oracle of Duskwood for a queen who could not sleep.',
  related_npcs: [
    { name: 'Yelena of the Duskwood', role_brief: 'oracle who received the vision', npc_id: NPC_ID },
  ],
};

const NPCS = {
  Uncategorized: [
    {
      npc_id: NPC_ID,
      npcDescriptionPart1: {
        character_name: 'Yelena of the Duskwood',
        read_aloud_description: 'A cloaked oracle with moonlit eyes.',
        combined_details: 'An ancient oracle who keeps the visions of the crown.',
        roleplaying_tips: 'Speak slowly, in riddles.',
      },
      npcDescriptionPart2: { relationships: {} },
      sourceType: 'item',
      sourceId: 'Whisper Crown',
      sourceName: 'Whisper Crown',
      typeOfPlace: 'oracle who received the vision',
    },
  ],
};

async function seedLinked(page) {
  await seedStorage(page, 'savedItems', [ITEM]);
  await seedStorage(page, 'npcGeneratorNPCs', NPCS);
}

test.describe('Item ↔ NPC cross-tool propagation', () => {
  test('renaming the item updates the NPC source label (no longer deleted)', async ({ page }) => {
    await seedLinked(page);
    await gotoTool(page, 'item-generator', { premium: true });

    // Rename the item.
    await page.locator('.sidebar-item__name', { hasText: 'Whisper Crown' }).click();
    await page.getByTestId('edit-item').click();
    await page.getByLabel('Name', { exact: true }).fill('Crown of Whispers');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByTestId('item-name')).toHaveText('Crown of Whispers');

    // The NPC now points at the renamed item — linked, not "(deleted)".
    await switchTool(page, 'npc-generator', { premium: true });
    await page.locator('.npc-row__button', { hasText: 'Yelena of the Duskwood' }).click();
    await expect(page.locator('.npc-source-link')).toContainText('Crown of Whispers');
    await expect(page.locator('.npc-source-deleted')).toHaveCount(0);
  });

  test('deleting the item flags the NPC source as "(deleted)"', async ({ page }) => {
    await seedLinked(page);
    await gotoTool(page, 'item-generator', { premium: true });

    // Delete the item.
    await page.locator('.sidebar-item__name', { hasText: 'Whisper Crown' }).click();
    await page.getByTestId('delete-item').click();
    await page.getByRole('dialog').getByRole('button', { name: 'Delete item' }).click();
    await expect(page.locator('.sidebar-item')).toHaveCount(0);

    // The NPC still renders, but its dangling source is flagged.
    await switchTool(page, 'npc-generator', { premium: true });
    await page.locator('.npc-row__button', { hasText: 'Yelena of the Duskwood' }).click();
    await expect(page.locator('.npc-card-name')).toHaveText('Yelena of the Duskwood');
    await expect(page.locator('.npc-source-deleted')).toBeVisible();
    await expect(page.locator('.npc-source-link')).toHaveCount(0);
  });

  test('deleting the NPC resets the item stub back to "Create NPC"', async ({ page }) => {
    await seedLinked(page);
    await gotoTool(page, 'npc-generator', { premium: true });

    // Delete the promoted NPC.
    await page.locator('.npc-row__button', { hasText: 'Yelena of the Duskwood' }).click();
    await page.getByTestId('delete-npc').click();
    await page.getByRole('dialog').getByRole('button', { name: 'Delete NPC' }).click();

    // Back in the item, the stub is un-promoted again.
    await switchTool(page, 'item-generator', { premium: true });
    await page.locator('.sidebar-item__name', { hasText: 'Whisper Crown' }).click();
    const stub = page.locator('.related-npc-row', { hasText: 'Yelena of the Duskwood' });
    await expect(stub.getByRole('button', { name: 'Create NPC' })).toBeVisible();
    await expect(stub.getByRole('button', { name: 'View in NPC Generator' })).toHaveCount(0);
  });
});
