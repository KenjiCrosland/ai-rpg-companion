import { test, expect } from '@playwright/test';
import { gotoTool, switchTool } from '../helpers/page-nav.js';
import { seedStorage } from '../helpers/storage.js';

/**
 * Cross-tool propagation: an NPC can link a statblock (by name + folder). When
 * that statblock is deleted in the Statblock Generator, the NPC must surface a
 * "Statblock not found" state rather than a broken/blank statblock. We delete
 * the statblock through the UI, then verify the NPC in the other tool.
 */
const STATBLOCK = {
  name: 'Elven Assassin',
  type_and_alignment: 'Medium humanoid (elf), neutral evil',
  challenge_rating: '3 (700 XP)',
  armor_class: '15 (studded leather)',
  hit_points: '52 (8d8 + 16)',
  speed: '30 ft.',
  abilities: { STR: 11, DEX: 16, CON: 14, INT: 13, WIS: 11, CHA: 10 },
  senses: 'passive Perception 13',
  languages: 'Common, Elvish, Thieves’ cant',
  proficiency_bonus: '+2',
  actions: [{ name: 'Shortsword', description: 'Melee Weapon Attack: +5 to hit, 6 (1d6 + 3) piercing.' }],
};

const NPCS = {
  Uncategorized: [
    {
      npc_id: 'npc_with_statblock',
      npcDescriptionPart1: {
        character_name: 'Elara Nightwhisper',
        read_aloud_description: 'A pale elf with cold, watchful eyes.',
        combined_details: 'A guild assassin hiding in plain sight.',
        statblock_name: 'Elven Assassin',
        statblock_folder: 'Custom Creatures',
      },
      npcDescriptionPart2: { relationships: {} },
    },
  ],
};

test('deleting a statblock makes the linked NPC show "Statblock not found"', async ({ page }) => {
  await seedStorage(page, 'monsters', { 'Custom Creatures': [STATBLOCK] });
  await seedStorage(page, 'npcGeneratorNPCs', NPCS);

  // Delete the statblock in the Statblock Generator.
  await gotoTool(page, 'statblock-generator', { premium: true });
  // The seeded folder accordion starts collapsed — expand it, then pick the row.
  await page.getByRole('button', { name: /Custom Creatures/ }).click();
  await page.locator('.statblock-row__button', { hasText: 'Elven Assassin' }).click();
  await page.getByTestId('delete-statblock').click();
  await page.getByRole('button', { name: 'Delete statblock' }).click();

  // The NPC that linked it now shows the not-found state, not a broken statblock.
  await switchTool(page, 'npc-generator', { premium: true });
  await page.locator('.npc-row__button', { hasText: 'Elara Nightwhisper' }).click();
  await expect(page.getByTestId('npc-output')).toBeVisible();
  await expect(page.locator('.statblock-not-found-message')).toContainText('Statblock not found');
});
