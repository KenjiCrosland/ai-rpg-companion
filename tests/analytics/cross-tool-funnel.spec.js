import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';
import { seedStorage } from '../helpers/storage.js';
import { captureAnalytics, getEvents, waitForEvent } from '../helpers/analytics.js';

/**
 * The cross-tool conversion funnel, end to end across a real navigation:
 *   Item "Create NPC" → cross_tool_start (item page)
 *   → navigate to NPC generator → generate → seeded `generate` (npc page).
 * The sessionStorage-backed capture is what lets a single test span both pages.
 */

// An item with an unpromoted related-NPC stub (no npc_id) → the "Create NPC"
// affordance is shown.
const ITEM = {
  name: 'Whisper Crown',
  item_type: 'Wondrous Item',
  rarity: 'Very Rare',
  feature_count: 1,
  features: { Whisper: 'You can cast detect thoughts once per day.' },
  physical_description: 'A circlet of mithril and moonstone.',
  lore: 'Crafted by the Oracle of Duskwood for a queen who could not sleep.',
  related_npcs: [
    { name: 'Yelena of the Duskwood', role_brief: 'oracle who received the vision' },
  ],
};

test('cross-tool funnel: Create NPC fires cross_tool_start, then a seeded generate on the NPC tool', async ({ page }) => {
  await captureAnalytics(page);
  await mockLLM(page, 'npc');
  await seedStorage(page, 'savedItems', [ITEM]);

  await gotoTool(page, 'item-generator', { premium: true });

  // Open the seeded item and click "Create NPC" on its related-NPC stub.
  await page.locator('.sidebar-item__name', { hasText: 'Whisper Crown' }).click();
  await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 10_000 });
  await page.getByRole('button', { name: 'Create NPC' }).first().click();

  // We land on the NPC generator with the seed prefilled; generate.
  await expect(page.getByTestId('generate-npc')).toBeVisible({ timeout: 15_000 });
  await page.getByTestId('generate-npc').click();

  // Seeded completion closes the funnel (fires after the NPC finalizes the seed).
  const seeded = await waitForEvent(page, 'generate');
  expect(seeded.params).toMatchObject({ tool: 'npc-generator', seeded: true, seed_source: 'item' });

  // A seeded generation fires ONLY the seeded variant — not also a plain
  // generate (the guard prevents double-counting).
  expect((await getEvents(page, 'generate')).length).toBe(1);

  // And the start was captured before the navigation.
  const starts = await getEvents(page, 'cross_tool_start');
  expect(starts.some((e) => e.params.from_tool === 'item-generator' && e.params.to_tool === 'npc-generator')).toBe(true);
});
