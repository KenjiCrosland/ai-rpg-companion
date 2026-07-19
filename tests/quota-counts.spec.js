import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';
import { mockLLM } from './helpers/llm-mocks.js';

/**
 * The revenue-critical free-tier gate is the statblock generation cap: 5 per
 * 24h for free users, unlimited for premium (see can-generate-statblock.mjs).
 * The quota counter is SHA-256 signed in localStorage, so it can't be injected
 * directly — we exhaust it through the UI. A 6th attempt must be blocked and
 * surface the daily-limit message.
 */
test.describe('Free-tier statblock quota', () => {
  test.beforeEach(async ({ page }) => {
    await mockLLM(page, 'statblock');
    // Pin the 2014 flow: the form defaults to 2024 rules, and the mocked LLM
    // fixtures serve the 2014 two-part responses. Raw setItem — the format
    // key stores a bare string (seedStorage would JSON-quote it).
    await page.addInitScript(() => localStorage.setItem('statblock-format', '2014'));
  });

  // The always-visible "+ New" lives in the sidebar footer (the in-accordion
  // one can be hidden when the folder is collapsed).
  const newButton = (page) =>
    page.locator('.sidebar-footer').getByRole('button', { name: '+ New monster statblock' });

  const savedCount = (page) =>
    page.evaluate(() => {
      const m = JSON.parse(localStorage.getItem('monsters') || '{}');
      return (m.Uncategorized || []).length;
    });

  // Statblock generation is two-part (part1 → part2) and saves on completion.
  // We gate on the SAVED count rather than rendered text: it's deterministic
  // and avoids both the 2-column render quirk and the part-2 reset race
  // (resetting before part 2 finishes would re-hide the form).
  async function generateOnce(page, expected) {
    await expect(page.locator('.generate-button')).toBeVisible();
    await page.locator('.generate-button').click();
    await page.waitForFunction(
      (n) => {
        const m = JSON.parse(localStorage.getItem('monsters') || '{}');
        return (m.Uncategorized || []).length >= n;
      },
      expected,
      { timeout: 15_000 },
    );
  }

  async function resetToForm(page) {
    await newButton(page).click();
    await expect(page.locator('.generate-button')).toBeVisible();
  }

  test('free user is blocked after 5 statblocks; premium is not', async ({ page }) => {
    await gotoTool(page, 'statblock-generator', { premium: false });

    for (let i = 0; i < 5; i += 1) {
      await generateOnce(page, i + 1);
      await resetToForm(page);
    }
    expect(await savedCount(page)).toBe(5);

    // 6th attempt — blocked. The limit toast/message mentions the daily limit.
    await page.locator('.generate-button').click();
    await expect(page.getByText(/daily limit/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test('premium user has no statblock cap', async ({ page }) => {
    await gotoTool(page, 'statblock-generator', { premium: true });

    for (let i = 0; i < 6; i += 1) {
      await generateOnce(page, i + 1);
      await resetToForm(page);
    }

    // All six saved, and no daily-limit message ever appeared for premium.
    expect(await savedCount(page)).toBe(6);
    await expect(page.getByText(/daily limit/i)).toHaveCount(0);
  });
});
