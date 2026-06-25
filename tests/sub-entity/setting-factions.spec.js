import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

/**
 * Sub-entity CRUD: factions live inside a setting. "Add" is a generation call
 * (bulk "Generate factions" from the overview), edit is inline, delete is a
 * ParConfirm. The mock returns the setting overview (call 0) then the faction
 * list (call 1) — a no-npc setting avoids a follow-up classify-NPCs call.
 */
async function generateFactions(page) {
  await gotoTool(page, 'setting-generator', { premium: true });
  await page.fill('#setting_description', 'a mercantile republic');
  await page.getByTestId('generate-setting').click();
  await expect(page.getByTestId('setting-output')).toBeVisible({ timeout: 15_000 });

  await page.getByRole('tab', { name: 'Factions' }).click();
  await page.getByRole('button', { name: /Generate factions/ }).click();

  // Both generated factions render (collapsed cards show their title).
  await expect(page.getByText('The Ashen Concord')).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText('The Cistern Hands')).toBeVisible();
}

test.describe('Setting factions — sub-entity CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'setting-faction');
  });

  test('generate → inline-edit a faction name', async ({ page }) => {
    await generateFactions(page);

    // Expand the first faction, edit its name inline, save.
    await page.locator('.faction-card--collapsed', { hasText: 'The Ashen Concord' }).click();
    const card = page.locator('.faction-card--expanded');
    await card.getByRole('button', { name: 'Edit faction' }).click();
    // Scope to the edit form — the "Create new faction" form also has a name field.
    await card.getByLabel('Faction Name').fill('The Renamed Concord');
    await card.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.getByText('The Renamed Concord')).toBeVisible();
    await expect(page.getByText('The Ashen Concord')).toHaveCount(0);
  });

  test('generate → delete a faction (ParConfirm)', async ({ page }) => {
    await generateFactions(page);
    await expect(page.locator('.faction-list-item')).toHaveCount(2);

    // Expand a faction, delete it, confirm.
    await page.locator('.faction-card--collapsed', { hasText: 'The Cistern Hands' }).click();
    await page.locator('.faction-card--expanded').getByRole('button', { name: 'Delete faction' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Delete faction' }).click();

    await expect(page.getByText('The Cistern Hands')).toHaveCount(0);
    await expect(page.locator('.faction-list-item')).toHaveCount(1);
  });
});

test.describe('Setting factions — NPC classification on generation', () => {
  test.beforeEach(async ({ page }) => {
    // With-NPC setting → faction generation also fires a classify-NPCs call.
    await mockLLM(page, 'setting-faction-classify');
  });

  test('generating factions sorts an unaffiliated NPC into its faction', async ({ page }) => {
    await gotoTool(page, 'setting-generator', { premium: true });
    await page.fill('#setting_description', 'a mercantile republic');
    await page.getByTestId('generate-setting').click();
    await expect(page.getByTestId('setting-output')).toBeVisible({ timeout: 15_000 });

    await page.getByRole('tab', { name: 'Factions' }).click();
    await page.getByRole('button', { name: /Generate factions/ }).click();
    await expect(page.getByText('The Ashen Concord')).toBeVisible({ timeout: 15_000 });

    // The setting's pre-existing NPC (from the overview) is classified into the
    // Ashen Concord by the classify-NPCs call, and the NPCs tab groups her there.
    await page.getByRole('tab', { name: 'NPCs' }).click();
    const ashenGroup = page.locator('.related-npcs-group', {
      has: page.locator('.related-npcs-group-title', { hasText: 'The Ashen Concord' }),
    });
    await expect(ashenGroup).toContainText('Guildmaster Veyra');
  });
});
