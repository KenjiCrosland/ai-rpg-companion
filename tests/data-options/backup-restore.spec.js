import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { gotoTool } from '../helpers/page-nav.js';
import { seedStorage } from '../helpers/storage.js';

const BACKUP_FIXTURE = fileURLToPath(new URL('../fixtures/backup/item-library-backup.json', import.meta.url));

function makeItem(name) {
  return {
    name, item_type: 'Wondrous Item', rarity: 'Rare', feature_count: 1,
    features: { Trait: 'A trait.' }, physical_description: `The ${name}.`, lore: `Lore of ${name}.`,
  };
}

async function openDataManager(page) {
  await page.getByTestId('data-options-toggle').click();
  await page.getByRole('button', { name: 'Backup / Restore library' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
}

test.describe('Backup & restore (all-tools bundle)', () => {
  test('backup downloads a valid JSON bundle of the library', async ({ page }) => {
    await seedStorage(page, 'savedItems', [makeItem('Aurora Lantern')]);
    await gotoTool(page, 'item-generator', { premium: true });
    await openDataManager(page);

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download JSON' }).click(),
    ]);

    const bundle = JSON.parse(readFileSync(await download.path(), 'utf8'));
    expect(Array.isArray(bundle.savedItems)).toBe(true);
    expect(bundle.savedItems[0].name).toBe('Aurora Lantern');
  });

  test('restore from a backup file repopulates the library', async ({ page }) => {
    await gotoTool(page, 'item-generator', { premium: true });
    await expect(page.locator('.sidebar-item')).toHaveCount(0);

    // Restore confirms via native confirm() and finishes with alert() + reload —
    // auto-accept every dialog.
    page.on('dialog', (d) => d.accept());

    await openDataManager(page);
    // Playwright can set files on the hidden input directly.
    await page.locator('input[type="file"][accept="application/json"]').setInputFiles(BACKUP_FIXTURE);

    // The page reloads after import; the restored items appear in the sidebar.
    await expect(page.locator('.sidebar-item')).toHaveCount(2);
    await expect(page.locator('.sidebar-item__name', { hasText: 'Restored Aegis Ring' })).toBeVisible();
    await expect(page.locator('.sidebar-item__name', { hasText: 'Restored Tide Compass' })).toBeVisible();
  });
});
