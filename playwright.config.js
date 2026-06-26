import { defineConfig } from '@playwright/test';

/**
 * Playwright acceptance tests — run LOCALLY against the Vite dev server.
 *
 * These are separate from the Jest unit suite (`npm test`). Run them with
 * `npm run test:e2e`. See tests/README.md.
 *
 * workers: 1 — every test shares the same localhost origin, and the tools
 * persist to localStorage (saved entities, signed generation quota). Parallel
 * workers would cross-contaminate that shared state, so we serialize. The
 * suite is small; serial runtime is still well under two minutes.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'list',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: 'http://localhost:5173',
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
