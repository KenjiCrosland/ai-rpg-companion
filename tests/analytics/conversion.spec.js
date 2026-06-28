import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';
import { captureAnalytics, getEvents, waitForEvent } from '../helpers/analytics.js';

/**
 * Suite-wide conversion events: patreon_click, tool_switch, quota_reached.
 */

const FIX = join(dirname(fileURLToPath(import.meta.url)), '..', 'fixtures');
const fixture = (name) => JSON.parse(readFileSync(join(FIX, name), 'utf8'));
const wrap = (f) => ({ choices: [{ message: { content: JSON.stringify(f) } }] });

test.describe('Conversion analytics', () => {
  test.beforeEach(async ({ page }) => {
    await captureAnalytics(page);
  });

  test('clicking "Support on Patreon" fires patreon_click with a location', async ({ page }) => {
    await mockLLM(page, 'item');
    await gotoTool(page, 'item-generator', { premium: false });

    // The CTA is a real external link. Neutralize its href so the click fires
    // the (synchronous) trackEvent without navigating the page away — which
    // would otherwise put sessionStorage out of reach.
    const cta = page.getByRole('link', { name: /Support on Patreon/i }).first();
    await cta.evaluate((a) => a.setAttribute('href', '#'));
    await cta.click();

    const ev = await waitForEvent(page, 'patreon_click');
    expect(ev.params.location).toBe('item-footer');
  });

  test('switching tools fires tool_switch with from/to', async ({ page }) => {
    await mockLLM(page, 'item');
    // Custom init (not gotoTool): leave the tool switcher VISIBLE so we can
    // drive its <select>.
    await page.addInitScript(() => {
      if (!sessionStorage.getItem('e2e-page-set')) {
        localStorage.setItem('dev-current-page', 'item-generator');
        localStorage.setItem('dev-switcher-visible', 'true');
        sessionStorage.setItem('e2e-page-set', '1');
      }
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // navigate() fires tool_switch then reloads. Wait for the NPC page to land
    // before reading (the event is persisted to sessionStorage pre-reload).
    await page.locator('#tool-select').selectOption('npc-generator');
    await expect(page.locator('#typeOfNPC')).toBeVisible({ timeout: 15_000 });

    const events = await getEvents(page, 'tool_switch');
    expect(events.some((e) => e.params.from === 'item-generator' && e.params.to === 'npc-generator')).toBe(true);
  });

  test('exhausting the free quest-hook cap fires quota_reached', async ({ page }) => {
    // The quota counter is SHA-256 signed, so it can't be injected — exhaust it
    // through the UI. Custom route: item once (call 0), then the quest hook for
    // every subsequent call (the modulo sequence would misalign over 5 gens).
    const item = fixture('item-response.json');
    const questHook = fixture('item-quest-hook.json');
    let call = 0;
    await page.route('**/api/ai/**', async (route) => {
      const f = call === 0 ? item : questHook;
      call += 1;
      await route.fulfill({ json: wrap(f) });
    });

    await gotoTool(page, 'item-generator', { premium: false });
    await page.getByTestId('generate-item').click();
    await expect(page.getByTestId('item-output')).toBeVisible({ timeout: 15_000 });

    await page.getByRole('tab', { name: 'Quest Hooks' }).click();
    await page.getByLabel('Quest type').selectOption('Recovery: Retrieve the item from a dangerous location');

    const generate = () => page.getByRole('button', { name: /Generate quest hook/i }).click();

    // 5 successful generations exhaust the daily cap — gate each on its API call.
    for (let i = 0; i < 5; i += 1) {
      await Promise.all([page.waitForResponse('**/api/ai/**'), generate()]);
    }

    // 6th is blocked (no API call) → quota_reached fires.
    await generate();
    const ev = await waitForEvent(page, 'quota_reached');
    expect(ev.params).toMatchObject({ tool: 'item-generator', quota_type: 'quest-hook' });
  });
});
