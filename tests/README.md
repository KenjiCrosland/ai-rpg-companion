# cros.land acceptance tests (Playwright)

Local end-to-end tests covering the critical user flows across the generator
tools. Separate from the Jest unit suite — **`npm test` is still Jest.**

## Running

```bash
npm run test:e2e         # full mocked suite (fast)
npm run test:e2e:headed  # same, with a visible browser
npm run test:e2e:ui      # Playwright UI mode (development)
npm run test:e2e:smoke   # real-LLM smoke tests (slow; needs an API key in .env.local)
```

First-time setup (once):

```bash
npx playwright install chromium
```

The config starts the Vite dev server automatically (`reuseExistingServer`), so
if you already have `npm run dev` running it'll be reused.

## When to run

- Before every push: `npm run test:e2e`
- Before a deploy: `npm run test:e2e && npm run test:e2e:smoke`

## How it works (the parts that differ from a generic Playwright setup)

- **Navigation.** Dev is one SPA (App.vue), not per-tool URLs. `gotoTool(page,
  'item-generator')` sets `localStorage['dev-current-page']` and loads `/`.
  Premium is the page *variant* — `gotoTool(..., { premium: true })` loads
  `item-generator-premium`, which App.vue mounts with `:premium="true"`. There
  is no runtime premium override in dev.
- **LLM mocking.** Every tool POSTs to `/api/ai/<provider>`. `mockLLM(page,
  'item')` intercepts that one route and returns fixtures from `fixtures/`,
  wrapped as `{ choices: [{ message: { content: JSON.stringify(fixture) } }] }`.
  Multi-call tools (statblock/NPC: part1→part2; encounter: 3 calls;
  setting/dungeon: overview→section fills) are sequenced by call order modulo
  the fixture count — see `helpers/llm-mocks.js`.
- **Quota.** The statblock cap (5/24h free) is SHA-256 signed in localStorage,
  so it can't be injected — `quota-counts.spec.js` exhausts it through the UI.
- **Selectors.** Output containers and generate buttons carry `data-testid`
  hooks (`generate-item`, `item-output`, `npc-output`, …) so the tests survive
  design-system class churn. Everything else uses stable behavioral selectors.

## Adding or debugging a test — patterns & gotchas

Hard-won knowledge. Skipping this means re-deriving it the painful way.

**Add a tool to the mock = one line.** Drop a `fixtures/<tool>.json` and a
`SEQUENCES` entry in `helpers/llm-mocks.js`. Rules:
- The **first array element must be the call that renders the output container**
  (what you assert on). Later elements are best-effort section fills.
- The array length should equal the tool's **calls-per-generation** (item 1,
  statblock/NPC 2, encounter 3), because repeated generations re-align via
  `call % len`. A test that generates a tool N times relies on this.
- A failed validation triggers a "fix this JSON" **retry call**, which desyncs
  the counter. So the first fixture of each tool *must* pass cleanly.

**Fixtures are authored to pass the real validator**, not captured blindly.
Find the tool's `validateX` / `validationPartN`, satisfy its required keys. Two
live gotchas:
- `setting-overview.json` is a **union of all three overview schemas**
  (kingdom/place/landscape) because the scale — and thus which validator runs —
  is inferred from the description text. Keep it a superset.
- Statblock merges `{...part1, ...part2}`. part1 needs the full stat block
  (`armor_class, hit_points, …, abilities`); part2 just needs `actions`.

**Two render traps:**
- **Two-part race.** Part 1 renders first; part 2 lands later and re-sets state.
  If you reset/navigate after the part-1 signal, part 2 clobbers you. Wait for a
  **completion** signal. For statblock the reliable one is the saved count, not
  rendered text (the 2-column statblock renderer doesn't expose action text as
  queryable nodes):
  ```js
  await page.waitForFunction((n) => {
    const m = JSON.parse(localStorage.getItem('monsters') || '{}');
    return (m.Uncategorized || []).length >= n;
  }, expected, { timeout: 15_000 });
  ```
- **Navigation hangs on `load`.** The app's Google-Fonts `<link>`s keep the
  `load` event pending in headless. `gotoTool` already uses
  `waitUntil: 'domcontentloaded'`; if you call `page.reload()` yourself, pass
  the same option.

**Dedupe-by-name.** Items dedupe on `name`, so generating the same fixture twice
yields one entry. For multi-entity tests, `seedStorage(page, 'savedItems', [...])`
with distinct names instead of generating twice.

**Cross-tool nav just works.** `gotoTool`'s sessionStorage one-shot lets in-app
`navigateToTool` (a full reload) reach its destination without `addInitScript`
clobbering it. Navigate via the UI, then assert on the destination tool's DOM.

**data-testid hooks today:** `generate-{item,encounter,npc,setting,dungeon}` +
`{…}-output`, plus `item-name`. Statblock has none — use `.generate-button` and
the saved-count pattern. Adding a tool? Add its two testids to the component
first, then write the spec against them.

## Updating fixtures

When an LLM response shape changes, recapture: run a tool locally, copy the
parsed `choices[0].message.content` JSON from the network tab into the matching
`fixtures/*.json`. The fixture is the *parsed object* — the mock stringifies it.

## Philosophy

Tests verify behavior at integration boundaries, not implementation shape:

- ✓ User flows work end-to-end (generate → render → persist → reopen)
- ✓ Routing, premium gating, quota, cross-tool navigation
- ✗ No prompt-string-content assertions
- ✗ No component-internal-structure assertions
- ✗ No visual-treatment assertions (color/typography/spacing stay human review)
