import { test, expect } from '@playwright/test';
import { gotoTool } from './helpers/page-nav.js';

/**
 * Standalone Loot Splitter happy path. No AI, no persistence — paste a hoard,
 * split it, re-deal. We use the built-in "Load this example" button so the test
 * doesn't depend on parser details (those are unit-tested in split-loot.spec /
 * parse-treasure.spec).
 */

test.describe('Loot Splitter (standalone, no AI)', () => {
  test('splits a pasted hoard into shares and re-deals when the count changes', async ({ page }) => {
    await gotoTool(page, 'loot-splitter');

    await page.getByRole('button', { name: /load an example/i }).click();

    // Defaults to 3 shares.
    await expect(page.locator('.ls__pile')).toHaveCount(3);

    // Bumping the share count re-deals into a fourth pile.
    await page.getByRole('button', { name: 'More shares' }).click();
    await expect(page.locator('.ls__pile')).toHaveCount(4);

    // Standalone has no pack, so the "claim a pile into your pack" action is gone
    // (only "Copy" remains). Guards the allowClaim=false wiring.
    await expect(page.getByRole('button', { name: /add to my pack/i })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Copy' }).first()).toBeVisible();
  });
});
