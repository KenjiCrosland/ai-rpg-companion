import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';
import { captureAnalytics, getEvents, waitForEvent, eventsJson } from '../helpers/analytics.js';

/**
 * Analytics firing for the item generator. The pure param-building is unit
 * tested in Jest; this verifies the events actually FIRE through real
 * interaction, and — the crown jewel — that typed content never leaks into a
 * payload (the content-free contract, end to end in a real browser).
 *
 * captureAnalytics installs the gtag stub before mount, so tool_open is caught.
 */
test.describe('Item generator analytics', () => {
  test.beforeEach(async ({ page }) => {
    await captureAnalytics(page);
  });

  test('fires tool_open on mount', async ({ page }) => {
    await mockLLM(page, 'item');
    await gotoTool(page, 'item-generator', { premium: true });
    const ev = await waitForEvent(page, 'tool_open');
    expect(ev.params.tool).toBe('item-generator');
  });

  test('generate is content-free and typed content NEVER leaks (PII contract)', async ({ page }) => {
    await mockLLM(page, 'item');
    await gotoTool(page, 'item-generator', { premium: true });

    // Type distinctive canaries into the two free-text fields.
    const NAME = 'PIICANARYNAME1234';
    const LORE = 'PIICANARYLORE5678';
    await page.getByPlaceholder(/Goblet of the Firmament/).fill(NAME);
    await page.getByPlaceholder(/Forged by a drowned cult/).fill(LORE);

    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 10_000 });

    const ev = await waitForEvent(page, 'generate');
    // Free-text fields are logged as used/unused booleans only.
    expect(ev.params).toMatchObject({ tool: 'item-generator', used_name: true, used_lore: true });

    // The canaries must appear NOWHERE in ANY captured event payload.
    const json = await eventsJson(page);
    expect(json).not.toContain(NAME);
    expect(json).not.toContain(LORE);
  });

  test('used_* booleans default to false when the form is left blank', async ({ page }) => {
    await mockLLM(page, 'item');
    await gotoTool(page, 'item-generator', { premium: true });

    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 10_000 });

    const ev = await waitForEvent(page, 'generate');
    expect(ev.params).toMatchObject({
      tool: 'item-generator',
      used_name: false,
      used_lore: false,
      used_rarity: false,
      used_item_type: false,
      used_origin: false,
    });
  });

  test('generating a quest hook fires item_action quest_hook_generate', async ({ page }) => {
    await mockLLM(page, 'item-quest-hook'); // [item, itemQuestHook]
    await gotoTool(page, 'item-generator', { premium: true });

    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 15_000 });

    await page.getByRole('tab', { name: 'Quest Hooks' }).click();
    await page.getByLabel('Quest type').selectOption('Recovery: Retrieve the item from a dangerous location');
    await page.getByRole('button', { name: /Generate quest hook/i }).click();
    await expect(page.locator('.quest-hook-expanded__title')).toHaveText('The Drowned Vault of Eldora', { timeout: 15_000 });

    const actions = (await getEvents(page, 'item_action')).map((e) => e.params.action);
    expect(actions).toContain('quest_hook_generate');
  });
});
