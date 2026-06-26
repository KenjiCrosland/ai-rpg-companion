import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

/**
 * Standalone Lore/Timeline generator. Flow: name a subject + set the world year
 * → "Create Historical Timeline" → a summon card (event type pre-set to "Origin
 * Event"; provide a specific year) → Generate → preview → Keep commits the event
 * to the spine. Events edit inline and remove directly (no ParConfirm).
 * The lore generator has no premium page variant.
 */
test('lore timeline — generate an event → inline-edit → remove', async ({ page }) => {
  await mockLLM(page, 'lore');
  await gotoTool(page, 'lore-generator');

  // Subject + world year.
  await page.locator('.timeline-header__subject').fill('The Sunspire');
  await page.locator('.timeline-header__year-input').fill('1500');
  await page.locator('.timeline-header__subject').click(); // blur → validateYear

  await page.getByRole('button', { name: '+ Create Historical Timeline' }).click();

  // Summon card: type is pre-set; give a specific year, generate, keep.
  await page.getByLabel('Specific year').fill('1000');
  await page.getByRole('button', { name: 'Generate', exact: true }).click();
  await page.getByRole('button', { name: 'Keep' }).click();

  await expect(page.getByText('The Founding Stone')).toBeVisible({ timeout: 15_000 });

  // Inline edit the committed event.
  await page.locator('.node-collapsed', { hasText: 'The Founding Stone' }).click();
  const node = page.locator('.node-expanded');
  await node.getByRole('button', { name: 'Edit' }).click();
  await node.getByLabel('Event Title').fill('The Cornerstone');
  await node.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByText('The Cornerstone')).toBeVisible();

  // Remove it.
  await page.locator('.node-expanded').getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByText('The Cornerstone')).toHaveCount(0);
});
