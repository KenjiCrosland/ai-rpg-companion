import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';
import { captureAnalytics, getEvents, waitForEvent } from '../helpers/analytics.js';

/**
 * Each tool fires its own main `generate { tool }` on a normal (non-seeded)
 * generation — content-free, just the tool slug. The seeded destinations
 * (npc/setting/dungeon) must NOT double-count: a seeded generation fires only
 * the seeded variant (verified in cross-tool-funnel.spec.js).
 */
test.describe('Per-tool main generate event', () => {
  test.beforeEach(async ({ page }) => {
    await captureAnalytics(page);
  });

  test('a normal NPC generation fires generate { tool: npc-generator } (not seeded), exactly once', async ({ page }) => {
    await mockLLM(page, 'npc');
    await gotoTool(page, 'npc-generator', { premium: true });

    await page.fill('#typeOfNPC', 'a scheming guildmaster');
    await page.getByTestId('generate-npc').click();
    await expect(page.getByTestId('npc-output')).toBeVisible({ timeout: 15_000 });

    const ev = await waitForEvent(page, 'generate');
    expect(ev.params.tool).toBe('npc-generator');
    expect(ev.params.seeded).toBeUndefined(); // a normal gen carries no provenance
    expect((await getEvents(page, 'generate')).length).toBe(1); // no double-fire
  });

  test('a statblock generation fires generate { tool: statblock-generator }', async ({ page }) => {
    await mockLLM(page, 'statblock');
    // Pin the 2014 flow (form defaults to 2024; fixtures are 2014 two-part).
    await page.addInitScript(() => localStorage.setItem('statblock-format', '2014'));
    await gotoTool(page, 'statblock-generator', { premium: true });

    await page.locator('.generate-button').click();
    const ev = await waitForEvent(page, 'generate');
    expect(ev.params.tool).toBe('statblock-generator');
  });
});
