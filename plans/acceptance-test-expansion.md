# Acceptance test suite expansion (Phase 2+)

## Trigger

Picking up the Playwright acceptance-test expansion beyond the initial 18-test
suite — i.e. any time you're about to add lifecycle / sub-entity / cross-tool /
data-options / modal / tab / form-validation / loading-state e2e coverage. Read
this first; it encodes a reality-check pass that already corrected the original
brief's wrong assumptions. **Also read `tests/README.md`** (the authoritative
how-to) before writing any spec.

## Problem / context

The original expansion brief proposed ~40 specs across 11 phases. A
codebase reality-check found several phases were scoped against *assumed* flows
that don't exist as described. This plan is the corrected version: same phase
structure, but each phase annotated with verified flow + the right test
approach, fixtures, and `data-testid` set. Building straight from the original
brief would produce hours of churn (most visibly: it assumed edit modals that
don't exist).

Decisions already made (2026-06-24):
- **Plan first, no specs yet** — this doc is the deliverable; implementation is a
  later session.
- **Per-phase, corrected testids** — add only the hooks each phase needs, in the
  same commit as the specs using them. Drop the original brief's
  `edit-modal` / `modal-save` / `modal-cancel` (no edit modals exist).

What stays: the Phase-1 infra (helpers, fixtures, `npm run test:e2e` scripts,
Playwright config), the existing 18 tests (unmodified), the existing 10 testids,
and the philosophy (behavior at integration boundaries — no prompt-content,
component-structure, or visual-treatment assertions).

## Verified reality (the corrections — do not re-derive)

### A. ALL editing is INLINE, never a modal

Every tool's "Edit" is an `isEditing` view-toggle that swaps the rendered view
for in-place form fields in the same card. Save = "Save changes", Cancel =
"Cancel", both inline. Confirmed in: ItemGenerator (`isEditing`), NPCCard
(`isEditing`, parent drives via `start-edit`/`cancel-edit` emits), Encounter
(`isEditingEncounter`), Setting OverviewTab (`isEditing`), Dungeon OverviewTab
(`isEditing`). **There are zero edit modals.** Phase 6 must be rewritten around
inline editing + the few *real* modals (below).

### B. The only real (DOM) modals

- **Delete-all confirmation** — lives in `SidebarFooter.vue`; fires `@delete-all`
  only after its internal confirm. Each tool wires it to its own handler
  (`deleteAllItems`, etc.). This is a DOM modal.
- **`ParConfirm`** — used for *some* sub-entity deletes: setting factions, setting
  quest-hooks, dungeon monsters. DOM modal with a destructive confirm button.
- **`DataManagerModal`** — backup/restore dialog (opened via SidebarFooter "Data
  options" → "Backup / Restore").
- **`ParModal`** — the generic primitive; check per-site if a flow uses it.

### C. Native `confirm()` → `ParConfirm` migration — status

The earlier reality-check agent BADLY undercounted native `confirm()` (it only
looked at template `@click`s, not handler bodies). The real inventory was ~12
sites. Migration status (2026-06-24):

**DONE — migrated to `ParConfirm` DOM modals:**
- NPC delete, encounter delete, item quest-hook delete (first pass)
- Item: delete, unsaved-switch, regenerate-feature (re-entrant guard pattern)
- Setting delete, statblock delete, dungeon delete
- Factions regenerate, setting-NPC delete (two-confirm), dungeon monsters, setting factions/quest-hooks (pre-existing)

**DEFERRED — architecturally hard, NOT yet done (still native `confirm()`):**
- **Dungeon NPC delete** (`dungeon-generator/stores/npc-store.mjs:309,348`) — the
  confirm lives in a **Pinia store** which can't render a modal. Needs a
  store→component refactor: store returns pending context, the NPCs tab component
  shows `ParConfirm` and calls a store `performDelete`. Two-confirm (fallback +
  multi-location), like NPCGenerator. Tests touching it need `page.on('dialog')`.
- **RoomDescription move** (`RoomDescription.vue:502`) — a **blocking confirm
  mid-generation-pipeline** ("move NPC to this room?"). Converting to an
  event-driven modal means restructuring the async generation flow (promise-gated
  modal or split the pipeline). Higher risk.

**EXCLUDED (out of the parchment generator scope):**
- Chase Tracker (`Token.vue`, `Zone.vue`, `ZoneDetailSheet.vue`, `MapControls.vue`)
  — separate Options-API tool, not parchment-refreshed.
- `dev-test-controls.mjs` — dev-only, never user-facing.
- `DataManagerModal.vue:284` restore confirm — a confirm *inside* a modal; nesting
  `ParConfirm` is fiddly. The lone remaining user-facing native confirm in the
  generator suite; revisit with Phase 4 (backup/restore).

**Pattern (all `ParConfirm` sites):** a `pending*` ref opens the modal; the real
work runs in a `perform*` on `@confirm`. For the in-place flow confirms (item
switch/regen) a **re-entrant guard** is used: the trigger stores the pending
target and returns; `@confirm` re-invokes the trigger with that target already
pending, falling through to the work. In a test: click the trigger, then click
the modal's confirm button — by `confirm-label` text, or `getByRole('dialog')
.getByRole('button', { name })` when the trigger and confirm share a label (item,
setting, dungeon all have trigger text == confirm-label). Cancel path: click
Cancel, assert the entity survives.

**Tests that drive these (Jest):** any unit test that mocked `window.confirm` and
called the trigger expecting synchronous deletion must now call the `perform*`
method too (updated: NPCGenerator, EncounterGenerator, ItemGenerator,
StatblockGenerator.linkedNPCs specs).

### D. Sub-entity "add" is almost all GENERATION (AI call), not manual forms

- Setting factions: form → AI (`singleFactionPrompt`).
- Setting quest-hooks: form (giver+type) → AI.
- Item lore events: summon-card → AI (`generateEvent`).
- Item quest hooks: form → AI (`generateQuestHook`).
- Dungeon monsters: form → AI (`createAndGenerateMonster`).
- Setting locations / dungeon rooms: generation-only, no manual add.

**Implication:** every sub-entity "add" test needs `mockLLM` with a fixture
matching that sub-entity's validator, which means **extending the fixture
sequences** (new fixtures: faction, setting-quest-hook, item-quest-hook,
lore-event, dungeon-monster). This is the bulk of Phase 2's cost. Edits are
inline (no AI); deletes are per the table in C.

### E. Backup / restore is ALL-TOOLS, not per-tool

`DataManagerModal`'s `currentApp` prop is **unused** — backup always exports the
full bundle, restore imports whatever keys are present (MERGE, not replace).
- Backup: "Download JSON" → Blob + anchor click → `game-master-data-*.json`.
  Capture with `page.waitForEvent('download')`.
- Restore: hidden `input[type="file"][accept="application/json"]` →
  `setInputFiles` → native `confirm()` → `localStorage.setItem` per key →
  **`location.reload()`**. The reload means the test must re-wait for the SPA.
- `EXPORT_KEYS`: `monsters`, `savedItems`, `npcGeneratorNPCs`, `gameSettings`,
  `dungeons`, `encounters`, `tool-references`, `rpgTimelineState`.
- Device-local quota fields are stripped on export/import.
- **Delete-all is per-tool** (each tool's own handler clears its own key), even
  though backup/restore is global.

## Corrected per-phase plan

Effort tiers: **S** = ready now, testids + maybe dialog handler; **M** = needs a
new fixture or helper; **L** = needs fixture investment or behavior investigation.

### Phase 1 — Per-tool lifecycle (create → INLINE edit → delete) — ✅ DONE (2026-06-24)
13 specs in `tests/lifecycle/` (item, encounter, npc, setting, dungeon, statblock),
each a create→edit→delete + a delete-cancel case. **Lore lifecycle deferred** (needs
a `lore` fixture + SEQUENCES entry — `validateEventJson`/`validateSummaryJson`).
Testids added: `edit-{item,encounter,npc,setting,dungeon}`,
`delete-{item,encounter,npc,setting,dungeon,statblock}`,
`{npc,setting,dungeon}-edit-name`. All green.

Original notes (kept for reference): 6 specs (`lifecycle/*.spec.js`), one per tool. Edit step is **inline** (click
"Edit"/"Edit X" → fields appear → change → "Save changes" → assert view +
sidebar updated; also a Cancel-discards case). Delete step per table C.
- item: delete = direct (no confirm). statblock: gate on `localStorage.monsters`
  count, never rendered action text. npc/encounter: `ParConfirm` modal — click the
  confirm button ("Delete NPC" / "Delete encounter").
- lore: add `lore` to `mockLLM` SEQUENCES first (fixture = timeline event/summary
  shape — check `validateEventJson`/`validateSummaryJson`).
- **Testids:** `edit-item|encounter|npc|setting|dungeon`,
  `delete-item|encounter|npc` (setting/dungeon single-delete is sidebar-level —
  decide whether to cover). Save/Cancel: prefer text "Save changes"/"Cancel".

### Phase 2 — Sub-entity CRUD — L
6-7 specs (`sub-entity/*.spec.js`). **Add = generation**, so author a fixture +
SEQUENCES entry per sub-entity (faction, setting-quest-hook, item-quest-hook,
lore-event, dungeon-monster), each passing its real validator. Edit = inline.
Delete = per table C (`ParConfirm` for factions/setting-QH/monsters/item-QH —
click confirm; direct for lore/locations).
- **Testids:** `add-faction`, `add-quest-hook` (scope per tool — setting vs item
  differ), `edit-faction|quest-hook`, `delete-faction|quest-hook|monster`, and a
  testid on the relevant `ParConfirm` confirm button (e.g. `confirm-delete`).
- Verify before writing: setting-locations and dungeon-rooms are
  generation-only/no-delete — write only what's actually possible.

### Phase 3 — Cross-tool data integrity — L (highest uncertainty)
3-4 specs (`integrity/*.spec.js`). Pure `seedStorage` setup (no generation).
First run reveals actual orphan-handling; assert against what cros.land *does*
(minimum bar: "loads without crashing"), and comment any behavior that looks
wrong rather than forcing a "should-be" failure.
- orphaned-npc-reference: seed NPC + dungeon referencing it → delete NPC →
  load dungeon, assert no crash + graceful omission/marker.
- cross-tool-deletion-isolation: seed one of each, delete-all in one tool,
  assert others intact (verifies storage-key isolation).
- Storage keys to seed: per `EXPORT_KEYS` (E above).

### Phase 4 — Backup / restore — M
3 specs (`data-options/*.spec.js`). Treat backup as the **global bundle** (E).
- backup-creates-valid-json: `waitForEvent('download')` on "Download JSON",
  read file, assert JSON + expected keys.
- restore-from-backup: author `fixtures/backup/*.json` (capture real shape via
  UI once), `setInputFiles` the hidden input, accept the native `confirm()`,
  then **re-wait for the reload** before asserting sidebar.
- restore semantics = MERGE (only present keys overwrite).
- **Testids:** `data-options-toggle`, `data-options-backup` ("Download JSON"),
  `data-options-restore-input` (the file input). (Brief's
  `data-options-backup/restore/delete-all` naming → match to the 2 real actions
  in DataManagerModal + delete-all in SidebarFooter.)

### Phase 5 — Delete-all — ✅ DONE (2026-06-24)
2 specs in `tests/data-options/delete-all.spec.js`: clears-this-tool-only (seed
items + encounters, delete-all in item, assert items gone + encounters intact via
readStorage) and cancel-preserves-then-confirm-clears. Testids added on
SidebarFooter (shared, covers all tools): `data-options-toggle`,
`data-options-delete-all`. The confirm modal is a `ParModal` (role=dialog); its
confirm button shares the danger-row label, so scope with `getByRole('dialog')`.
The disclosure is a *toggle* — only expand if not already open. **Deferred:**
reversible-by-restore (chains Phase 4 backup/restore).

### Phase 6 — Modal behavior — REWRITE — S/M
The original 5 modal-edit specs are invalid (no edit modals). Replace with:
- inline-edit-saves / inline-edit-cancel-discards (this overlaps Phase 1 — fold
  in or keep one canonical pair).
- `ParConfirm` cancel-preserves + confirm-deletes — now covers ALL confirmed
  deletes (NPC, encounter, item-QH, factions, setting-QH, monsters), so the cancel
  path is one uniform pattern: click the delete button → assert modal open → click
  Cancel → assert entity survives. No `dialog` handler needed.
- delete-all modal: Escape/backdrop behavior (DOM modal — testable).
- DataManagerModal open/close (its *restore* still uses native `confirm()` — the
  one remaining `dialog` handler in the suite).
- **Drop testids:** `edit-modal`, `modal-save`, `modal-cancel`. **Keep:** modal
  container + confirm/cancel testids only for the real DOM modals.

### Phase 7 — Tab switching — ✅ DONE (2026-06-24)
3 specs in `tests/ui/tab-switching.spec.js` (item, setting, dungeon). **No testids
needed** — `ParTabs` renders `role="tab"` buttons with `aria-selected`, so tabs are
targeted by `getByRole('tab', { name })` and activation asserted via
`aria-selected="true"`. Each test switches through every tab, asserts the output
container persists, and returns to the first tab with content intact.

### Phase 8 — Form validation — S/M
3 specs (`ui/form-validation-*.spec.js`). Note: faction add is generation, so
"faction name required" may or may not gate — verify. Solid one:
encounter-monster-required (generate disabled / no-op with no monsters). Quota
case overlaps Phase-1 quota tests — only add what's new.

### Phase 9 — Loading states — M
3 specs (`ui/loading-*.spec.js`). Needs new helper **`mockLLMWithDelay(page,
tool, delayMs)`** in `helpers/llm-mocks.js` — same call-order-modulo sequencing,
delay each fulfill (`await new Promise(r => setTimeout(r, delayMs))` inside the
route handler). Tests: loading appears then clears; error path via existing
`failLLM` (assert error UI + button re-enabled); loading clears on cross-tool nav.

### Phase 10 — Cross-session persistence — ✅ DONE (2026-06-24)
1 spec in `tests/persistence/cross-session.spec.js`. Generate an item in context
A, `ctxA.storageState()`, open context B with `browser.newContext({ storageState })`,
assert the item is in the sidebar and reopens. storageState carries localStorage
but NOT sessionStorage, so gotoTool's page-set guard re-runs cleanly in B.

### Phase 11 — Additional cross-tool — ✅ MOSTLY DONE (2026-06-24)
2 specs in `tests/cross-tool/isolation.spec.js`: each-tool-shows-only-its-own-library
(+ no cross-contamination on tool switch) and active-tool-survives-reload
(dev-current-page). To switch tools mid-context, set `dev-current-page` directly
and reload (gotoTool's one-shot guard already fired). quota-is-per-tool is covered
by the Phase-1 quota test. **Deferred:** faction-persists-across-navigation (adding
a faction is generation — needs a faction fixture, Phase 2).

## New helpers / fixtures this expansion introduces

- `mockLLMWithDelay(page, tool, delayMs=1000)` in `helpers/llm-mocks.js` (Phase 9).
- Sub-entity generation fixtures (Phase 2): faction, setting-quest-hook,
  item-quest-hook, lore-event, dungeon-monster — each authored against its real
  validator, added to `SEQUENCES`. Remember: array length = calls-per-generation;
  first element renders the asserted container; a failed validation triggers a
  retry call that desyncs the counter.
- `lore` SEQUENCES entry (Phase 1 lore lifecycle).
- `fixtures/backup/*.json` (Phase 4) — capture real shape via the UI once.
- A small `acceptDialog(page)` convenience for the ONE remaining native-`confirm()`
  path (DataManagerModal restore, Phase 4). Delete paths no longer need it.

## Deferred (needs fixture investment — out of scope until then)

- Setting→NPC and setting→Location stub promotion (section-fill stubs aren't real
  sub-entities; needs richer setting fixture).
- Dungeon→NPC reference promotion (richer dungeon fixture).
- Statblock rendered-output assertions (2-column renderer doesn't expose action
  text as queryable nodes — always gate on saved count).
- Lore-generator cross-references (pending whether lore generation emits testable
  refs).

## Working notes

- Add testids in the same commit as the phase that uses them (git history keeps
  production change ↔ test coupled). User does their own commits — stage tight.
- Phases are independent; implement in any order, pause, or abandon. A spec that
  doesn't fit reality gets deleted or `test.skip` with a why-comment — never a
  forced "should-be" failure.
- When a spec's expected behavior differs from what cros.land does: match the
  test to actual behavior, comment the anomaly for human review.
