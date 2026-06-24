/**
 * LLM mocking.
 *
 * Every tool POSTs to the dev proxy at `/api/ai/<provider>` (deepseek by
 * default). The app reads `response.choices[0].message.content` as a JSON
 * STRING and parses it. So a mock wraps a fixture object as:
 *   { choices: [{ message: { content: JSON.stringify(fixture) } }] }
 *
 * Several tools fire MULTIPLE sequential calls per generation (statblock and
 * NPC: part1 → part2; encounter: structure → scene → details; setting/dungeon:
 * overview → async section fills). Rather than match fragile prompt substrings,
 * we sequence by call order per tool, MODULO the fixture count: call N returns
 * fixtures[N % len]. Modulo (not clamp) so a tool generated repeatedly in one
 * test — e.g. the quota test generating 5 statblocks = 5×(part1,part2) — keeps
 * re-aligning to the right part each generation. The FIRST fixture is always
 * the one that renders the tool's output container (what happy-path tests
 * assert on). This is robust because the route is installed per page/context,
 * so only the active tool's calls arrive.
 *
 * `mockLLM(page, 'item')` installs the route. `mockLLM(page)` installs a catch-
 * all that returns a generic permissive object (used by tools whose later
 * section calls we don't care about).
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Load fixtures via fs (not JSON imports) to avoid Node's ESM import-attribute
// requirement, which varies across Node versions.
const FIXTURES = join(dirname(fileURLToPath(import.meta.url)), '..', 'fixtures');
const load = (name) => JSON.parse(readFileSync(join(FIXTURES, name), 'utf8'));

const item = load('item-response.json');
const encounterStructure = load('encounter-structure.json');
const encounterScene = load('encounter-scene.json');
const encounterDetails = load('encounter-details.json');
const statblockPart1 = load('statblock-part1.json');
const statblockPart2 = load('statblock-part2.json');
const npcPart1 = load('npc-part1.json');
const npcPart2 = load('npc-part2.json');
const settingOverview = load('setting-overview.json');
const dungeonOverview = load('dungeon-overview.json');

const GENERIC = { description: 'stub', text: 'stub', name: 'Stub' };

const SEQUENCES = {
  item: [item],
  encounter: [encounterStructure, encounterScene, encounterDetails],
  statblock: [statblockPart1, statblockPart2],
  npc: [npcPart1, npcPart2],
  // Section fills after the overview get the generic stub; we only assert on
  // the overview rendering the tabs/container.
  setting: [settingOverview, GENERIC],
  dungeon: [dungeonOverview, GENERIC],
};

function wrap(fixture) {
  return {
    choices: [{ message: { content: JSON.stringify(fixture) } }],
  };
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {keyof typeof SEQUENCES} [tool]
 */
export async function mockLLM(page, tool) {
  const sequence = (tool && SEQUENCES[tool]) || [GENERIC];
  let call = 0;

  await page.route('**/api/ai/**', async (route) => {
    const fixture = sequence[call % sequence.length];
    call += 1;
    await route.fulfill({ json: wrap(fixture) });
  });
}

/** Force every LLM call to fail (network error) — for error-path tests. */
export async function failLLM(page) {
  await page.route('**/api/ai/**', (route) => route.abort());
}
