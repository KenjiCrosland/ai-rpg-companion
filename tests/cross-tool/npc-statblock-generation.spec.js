import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { seedStorage } from '../helpers/storage.js';
import { mockLLM } from '../helpers/llm-mocks.js';

/**
 * Generating a combat statblock for an NPC. The NPC card has a "Generate
 * statblock" affordance (two-part generation, same prompts as the Statblock
 * Generator). After it completes, the statblock renders inline and the button
 * becomes "Regenerate Statblock".
 */
const NPCS = {
  Uncategorized: [{
    npc_id: 'npc_sb',
    npcDescriptionPart1: {
      character_name: 'Eldrin Shadowmoon',
      read_aloud_description: 'A tall elf with haunted silver eyes.',
      combined_details: 'A black-market fence with a missing sibling.',
      roleplaying_tips: 'Speak in measured, careful tones.',
    },
    npcDescriptionPart2: { relationships: {} },
  }],
};

test('generate a statblock for an NPC renders it inline (no "not found")', async ({ page }) => {
  await mockLLM(page, 'statblock');
  await seedStorage(page, 'npcGeneratorNPCs', NPCS);
  await gotoTool(page, 'npc-generator', { premium: true });

  await page.locator('.npc-row__button', { hasText: 'Eldrin Shadowmoon' }).click();
  await expect(page.getByText('Generate a D&D 5e statblock')).toBeVisible();

  // Two-part generation; on completion the statblock renders inline in the card.
  await page.getByRole('button', { name: 'Generate statblock', exact: true }).click();
  await expect(page.getByTestId('npc-output').getByText(/Armor Class|AC \d+/).first()).toBeVisible({ timeout: 15_000 });
  await expect(page.locator('.statblock-not-found-message')).toHaveCount(0);
});
