import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { seedStorage } from '../helpers/storage.js';

/**
 * Cross-tool reference integrity: an NPC promoted from an item carries a
 * denormalized source pointer. If that source item no longer exists, the NPC
 * card must still render (no crash) and flag the dangling source with a
 * "(deleted)" marker rather than a broken link.
 */
const ORPHAN_NPC = {
  Uncategorized: [
    {
      npc_id: 'npc_orphan_1',
      npcDescriptionPart1: {
        character_name: 'Yorick the Forgotten',
        read_aloud_description: 'A gaunt figure in faded courtier silks.',
        combined_details: 'Once a royal archivist, now a keeper of lost things.',
        roleplaying_tips: 'Speak wistfully, as if half-remembering.',
      },
      npcDescriptionPart2: { relationships: {} },
      typeOfPlace: 'Whisper Crown',
      sourceType: 'item',
      sourceId: 'Whisper Crown',
      sourceName: 'Whisper Crown',
    },
  ],
};

test('an NPC whose source item was deleted renders with a "(deleted)" marker', async ({ page }) => {
  // Seed the NPC but NOT the "Whisper Crown" item it points at.
  await seedStorage(page, 'npcGeneratorNPCs', ORPHAN_NPC);
  await gotoTool(page, 'npc-generator', { premium: true });

  // Open the orphaned NPC from the sidebar.
  await page.getByRole('button', { name: /Yorick the Forgotten/ }).click();

  // It renders without crashing…
  await expect(page.getByTestId('npc-output')).toBeVisible();
  await expect(page.locator('.npc-card-name')).toHaveText('Yorick the Forgotten');

  // …and the dangling source is flagged, not linked.
  await expect(page.locator('.npc-source-deleted')).toBeVisible();
  await expect(page.locator('.npc-source-link')).toHaveCount(0);
});
