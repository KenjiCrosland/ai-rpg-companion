import { test, expect } from '@playwright/test';
import { gotoTool } from '../helpers/page-nav.js';
import { mockLLM } from '../helpers/llm-mocks.js';

/**
 * Simulates closing and reopening the browser: generate content in one context,
 * capture its storageState (localStorage), then load a fresh context from that
 * state and verify the content is still there. storageState carries localStorage
 * but not sessionStorage, so gotoTool's page-set guard re-runs cleanly.
 */
test('generated content survives a new browser context', async ({ browser }) => {
  // Session 1: generate an item, then snapshot storage.
  const ctxA = await browser.newContext();
  const pageA = await ctxA.newPage();
  await mockLLM(pageA, 'item');
  await gotoTool(pageA, 'item-generator', { premium: true });
  await pageA.getByTestId('generate-item').click();
  await expect(pageA.getByTestId('item-name')).toHaveText('Verdant Resilience Cloak');
  const state = await ctxA.storageState();
  await ctxA.close();

  // Session 2: fresh context loaded from the snapshot.
  const ctxB = await browser.newContext({ storageState: state });
  const pageB = await ctxB.newPage();
  await gotoTool(pageB, 'item-generator', { premium: true });

  // The item is still in the sidebar and reopens into the view.
  const sidebarItem = pageB.locator('.sidebar-item__name', { hasText: 'Verdant Resilience Cloak' });
  await expect(sidebarItem).toBeVisible();
  await sidebarItem.click();
  await expect(pageB.getByTestId('item-name')).toHaveText('Verdant Resilience Cloak');
  await ctxB.close();
});
