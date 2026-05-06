# Tech Debt Inventory

## Trigger

This plan is an *inventory*, not a single piece of work. Read it when:

- Refactoring the storage layer (any of `npc-storage.mjs`, `statblock-storage.mjs`, `item-storage.mjs`, `setting-storage.mjs`, `dungeon-storage.mjs`, `reference-storage.mjs`).
- Adding to one of the big mixed-concern components (`NPCGenerator.vue`, `ItemGenerator.vue`, `SettingGenerator.vue`, `NPCCard.vue`).
- Investigating a "wait, why does this work like that?" bug in the substrate — the answers may be here.
- Looking for low-cost hygiene work to bundle with another release.

The substrate works. None of this is blocking. But the cumulative weight of small smells is what makes future bugs easy to introduce — the kind of dynamic that produced the `npc_id || npc.id` situation across ~25 sites before it was caught.

## Status snapshot

| # | Item | Severity | Scope | Trigger | Status |
|---|---|---|---|---|---|
| 1 | `migrateSourceTypes` is dead code that violates an explicit principle | 🔴 footgun | 5 lines | anytime | ✅ done (deleted) |
| 2 | `findNPCLocations` silently excludes settings | 🔴 incomplete | ~15 lines + tests | anytime | ✅ done (added settings + tests + dungeon/setting confirmation messages) |
| 3 | `saveStatblockToStorage` doesn't dispatch storage event | 🔴 latent race | 3 lines | when adding cross-tool statblock display | ✅ done (dispatches `npc-storage-updated` with `action: 'statblock-save'`) |
| — | Card surface palette divergence (NPCCard had its own `--npc-*` vars; ItemCard had `--card-*` aliases) | 🟡 inconsistency | medium sweep | with #1-#3 | ✅ done (both now use parchment tokens directly) |
| 4 | Storage helper pattern divergence (older modules don't have `safeParse`/`read*`/`persist*`) | 🟡 inconsistency | medium refactor | next storage-layer touch | open |
| 5 | Dynamic imports of substrate scattered everywhere | 🟡 hygiene | mechanical sweep, ~6 sites | anytime | open |
| 6 | `autoFixStatblockReference` is a side effect during a read | 🟡 surprising | ~30 lines | when refactoring statblock storage | open |
| 7 | Big mixed-concern components (NPCGenerator 2342L, ItemGenerator 2188L) | 🟡 maintenance burden | extraction passes | when next adding features to them | open |
| 8 | Full-rewrite save pattern spreading | 🟡 known | tracked separately | see `multi-promote.md` | open (separate plan) |
| 9 | Relationship names as scattered string literals (46 sites) | 🟡 typo-vulnerable | const + sweep | anytime | open |
| 10 | localStorage key magic strings (dozens of sites) | 🟡 typo-vulnerable | const + sweep | with #9 | open |
| 11 | `JSON.parse(localStorage.getItem(...))` boilerplate (129 sites) | 🟡 dries up with #4 | resolves with #4 | with #4 | open |

---

## 🔴 Active correctness items

### 1. Delete `migrateSourceTypes` — dead code violating an explicit principle

`src/util/npc-storage.mjs:560`. Exported, **zero callers**, infers `sourceType` from folder name:

```js
if (dungeonNames.has(folderName)) {
  npc.sourceType = 'dungeon';
}
```

Project's CLAUDE.md says verbatim: *"Never infer dungeon/setting membership from folder names alone."* The replacement (`migrateSourceTypeFromTypeOfPlace`, in its own file) keys on `typeOfPlace` instead, which is safer because `typeOfPlace` is only set by dungeon/setting generators, never by user folder organization.

`migrateSourceTypes` is the older dangerous version that never got removed when the safer one shipped. The risk is someone re-enables it during a future change and mass-mistags every user's NPCs the next time they reorganize folders.

**Fix:** delete the function; verify no callers (already verified — zero); ship.

### 2. `findNPCLocations` silently excludes settings

`src/util/npc-storage.mjs:419`. Function comment says "Returns an object describing where the NPC is found" but the return shape is `{ npcGenerator: [], dungeons: [] }` — no settings array. Walks `npcGeneratorNPCs` and `dungeons[*].npcs` and stops there.

**Three call sites build confirmation dialogs from this output and quietly under-report setting locations:**

- `NPCGenerator.deleteCurrentNPC` (the "delete from X folders / Y dungeons" prompt)
- `dungeon-store.deleteNPC`
- `setting-NPCsTab.deleteNPC`

The actual delete behavior is correct because the substrate's `resetStubsForDeletedNPC` walks settings independently — but the user sees an incomplete summary before confirming.

**No test coverage** — `grep findNPCLocations spec.js` returns empty.

**Fix:** add `settings: []` to the return object; walk `gameSettings[*].npcs` matching by `npc_id`; push the setting's display name. Update the three confirmation-message builders to read `locations.settings`. Add a test.

### 3. `saveStatblockToStorage` doesn't dispatch a storage update event

`src/util/statblock-storage.mjs:13`. Compare to `saveNPCToStorage` (`npc-storage.mjs:124`) which dispatches `npc-storage-updated` for same-tab cross-component sync.

Today: only StatblockGenerator displays statblocks reactively, and its `move`/`rename` functions dispatch the event themselves. So the missing dispatch is latent.

The moment another tool reactively displays statblock content (e.g., a future inline statblock in the encounter generator's monster list, or any preview surface), it'll silently miss updates from `saveStatblockToStorage` writes.

**Fix:** add `window.dispatchEvent(new CustomEvent('npc-storage-updated', { detail: { action: 'statblock-save', name, folderName }}))` after the `localStorage.setItem` call. Or — more honestly — introduce a `statblock-storage-updated` event since the existing `npc-storage-updated` is a misnomer when dispatched from statblock writes.

---

## 🟡 Architectural inconsistency

### 4. Storage helper pattern divergence

Newer storage modules use a clean `safeParse` + `read*` + `persist*` pattern. Older big modules don't:

| Module | Lines | Has helpers? | Inline `JSON.parse` reads |
|---|---|---|---|
| `setting-storage.mjs` | 253 | ✅ | 0 |
| `dungeon-storage.mjs` | 245 | ✅ | 0 |
| `item-storage.mjs` | 433 | ✅ | 4 |
| `npc-storage.mjs` | **864** | ❌ | **17** |
| `statblock-storage.mjs` | **553** | ❌ | **16** |

Result:
- Inconsistent error handling (some inline reads have try/catch, some don't — `statblock-storage.mjs`'s `saveStatblockToStorage` has no try/catch around its parse)
- DRY-violating boilerplate — same five-line read dance written 33+ times
- Cross-cutting changes (e.g., add logging to every read) require touching every site

**Fix:** extract `safeParse` to a shared util (or duplicate per file — it's tiny). Add `readNPCs/persistNPCs` and `readStatblocks/persistStatblocks` helpers. Sweep the inline reads to use them. The two old files would shed a few hundred lines between them.

Resolves #11 (boilerplate) at the same time.

### 5. Dynamic imports of substrate scattered everywhere

```js
import('@/util/reference-storage.mjs').then(({ addReference }) => {
  addReference({...});
});
```

Six+ sites do this with `reference-storage.mjs` (a small, lightweight module). `npc-store.mjs` does it three times. `setting-NPCsTab.deleteNPC` does it three times for three different substrate modules in the same function.

Why it's a smell:
- Hides the dependency from readers (top-of-file imports don't reveal it)
- The `.then()` form swallows errors silently — if the import fails, the substrate write never happens and nothing logs
- Zero performance benefit — these modules are tiny
- Reads as "I added this later and didn't want to disturb the import block" — accreting tech debt by inertia

**Fix:** convert to static imports at the top of each file. Mechanical sweep.

### 6. `autoFixStatblockReference` is a side effect during a read

`src/util/statblock-storage.mjs:75`, called from `getStatblockFromStorage`. When `getStatblockFromStorage(name, folder)` finds the statblock in a folder *other* than the requested one, it silently mutates `npcGeneratorNPCs` AND `tool-references` to update the stale folder pointer.

Reads with cross-store side effects are surprising — they show up in places no one expects, and they make the function harder to reason about (callers have to know "this read might mutate the world").

**Fix:** return `{ statblock, foundInFolder }` and let the caller call `fixStatblockFolderRef(name, oldFolder, newFolder)` explicitly if it wants. Keeps reads pure; makes the auto-fix opt-in at known sites.

---

## 🟡 Component bloat

### 7. Big tool components are doing too much

| File | Lines |
|---|---|
| `NPCGenerator.vue` | 2342 |
| `ItemGenerator.vue` | 2188 |
| `SettingGenerator.vue` | 1188 |
| `NPCCard.vue` | 903 |

NPCGenerator alone has 37 top-level functions and 79 reactive bindings/computeds. These mix:
- Form state
- AI orchestration (multi-call sequences with retries, validation)
- Persistence (calling 5+ migrations on mount, save-on-edit, save-on-generate, sync paths)
- Navigation (deep-link param parsing for multiple legacy formats)
- Cross-tool linkage (substrate writes + back-link sweeps)
- Click handlers, computed display logic, lifecycle, scoped styles

Hard to test in isolation, hard to onboard, hard to refactor without ripples.

**Fix shape:** extraction passes per concern.
- Pull AI orchestration into a composable (`useNPCGeneration.js`)
- Pull persistence into a service module (most of it is already in `npc-storage.mjs`; the calling sites can shrink)
- Move migration calls into the migration-runner (the inline ones — `migrateNPCIds`, `migrateNestedStatblocks`, `migrateStatblockReferences`, `migrateDungeonNPCsToSharedStorage`, `migrateSettingNPCsToSharedStorage`, `migrateNPCStatblockReferences`, `migrateSourceTypeFromTypeOfPlace` — most should run once via the runner, not on every mount)
- Extract deep-link param handling into the navigation substrate

Probably 30-50% line reduction per file. Big payoff but big-scope; reach for it when next adding features to these files.

### 8. Full-rewrite save pattern spreading

46 calls to `saveSettingsToLocalStorage()` / `saveDungeons()` across the codebase. Each writes the *whole store* from in-memory state. This is the multi-promote clobber pattern — already documented in `plans/multi-promote.md`.

**No new fix needed here** — `multi-promote.md` is the place. Just noting that the surface keeps growing (`monster-store.mjs` has 7 calls, `npc-store.mjs` has 6) and every new save-site is a future "did the parent reload before saving?" check when that plan ships.

---

## 🟡 Magic strings everywhere

### 9. Relationship names as scattered string literals

`'has_statblock'`, `'mentioned_in_item'`, `'appears_in_dungeon'`, `'appears_in_setting'`, `'inspired_by_item'`, `'features_in_encounter'` appear in **46 sites** across the codebase.

The substrate's `PROMOTION_RELATIONSHIPS` map captures some of them but `tool-references` reads (the consumer side) don't go through it — they hardcode the strings. A typo in any one silently breaks the relationship lookup with no compile-time signal.

**Fix:** add a `RELATIONSHIPS` const map (e.g., `RELATIONSHIPS.HAS_STATBLOCK = 'has_statblock'`) in `reference-storage.mjs`. Sweep all 46 sites to use it. Future renames become trivial.

### 10. localStorage key strings, same problem

`'npcGeneratorNPCs'`, `'gameSettings'`, `'dungeons'`, `'savedItems'`, `'monsters'`, `'tool-references'` are typed as literals in dozens of places. No central `STORAGE_KEYS` constant.

**Fix:** introduce `STORAGE_KEYS` in a shared util (or in each storage module's own file scope, exported). Sweep call sites. Pairs naturally with #4 — when you retrofit `readNPCs()`, the key is encapsulated in the helper and most call sites never need to type it.

### 11. `JSON.parse(localStorage.getItem('foo') || '{}')` boilerplate

129 occurrences across the codebase. Each one is a chance to forget the try/catch (and many do). Resolves automatically with #4 — once `readNPCs()`/`readStatblocks()`/etc. encapsulate it, callers stop writing the dance.

---

## 🟢 Worth knowing about (not smells per se)

### `saveNPCToStorage`'s "auto-migration" block

`npc-storage.mjs:63-81`. Removes the NPC from other folders before adding to the target. Correct for setting/dungeon RENAMES (where the NPC's folder name changed and the auto-migration follows). On every normal save, it also runs a pointless cross-folder check.

Mostly harmless — the duplicate-check is by id and there usually isn't a duplicate. But it's load-bearing-via-coincidence and worth understanding before refactoring.

### `tool-references` is an object, not an array

`{ ref_xyz: {...}, ref_abc: {...} }` keyed by ref id. Counterintuitive shape — already burned us once (statblock-side rewrite functions defaulted to `[]` and silently no-op'd until the recent fix).

**Cheap improvement:** rename the internal const in `reference-storage.mjs` from `references` to `referencesById` to make the shape loud at every read site. Add a comment at the top of the file calling out the shape explicitly.

### `migrateNPCIds` runs on every NPCGenerator mount

`npc-storage.mjs:516`. Idempotent gap-fill — no harm, but worth knowing every mount walks every NPC and writes if any are missing ids. After `promote-npc-id` shipped, the sole job of `migrateNPCIds` is catching NPCs that imported with no id at all (a rare hand-edit / bad-import case).

Could probably move to the migration runner since it's effectively a one-shot for users in the wild. Or leave it as defensive cleanup. Either is fine.

---

## What's actually doing well

- `setting-storage.mjs`, `dungeon-storage.mjs`, `item-storage.mjs` are tight, single-responsibility, well-tested. They're the model the others should converge to.
- The substrate's dispatcher pattern in `seeded-input.mjs` is clean — five maps keyed on `source.type`, adding a new source tool is mechanical.
- `PROMOTION_RELATIONSHIPS` 2D map is the right shape for cross-tool relationship lookup.
- `findNPCByIdAcrossFolders` (recently added) is the kind of single helper that should exist for every "find by stable id" pattern.
- Migration runner is well-architected — versioned, ordered, once-per-browser, error-tolerant.
- Test coverage of the storage helpers is solid where it exists.
- `parchment` design system is properly tokenized with the marker-class opt-out pattern.

---

## Recommended priority order if you tackle any of this

1. **#1 delete `migrateSourceTypes`** — 5 lines, removes a real footgun. Could ship anytime including this release.
2. **#2 fix `findNPCLocations` to include settings + add tests** — small, real bug, no risk.
3. **#3 dispatch event from `saveStatblockToStorage`** — one-line fix, plugs a future hole.
4. **#5 sweep dynamic imports → static imports** — mechanical, clarifies dependencies, almost no risk.
5. **#4 retrofit storage helpers to `npc-storage` and `statblock-storage`** — biggest quality-of-life win for the storage layer; would shed boilerplate and standardize error handling. Also resolves #11.
6. **#9 + #10 introduce `RELATIONSHIPS` and `STORAGE_KEYS` constants** — guards against typos, makes future renames trivial.
7. **#6 lift the side-effect out of `getStatblockFromStorage`** — small, surprising-behavior fix.
8. **#7 component extraction passes** — biggest impact, biggest scope; do it when next adding to those files.

Items 1–3 are 30 minutes total with real bug-prevention value; ideal candidates to bundle into any release that's already shipping migrations or storage changes (i.e., this one).

Items 4–5 are mechanical sweeps suitable for a dedicated maintenance day.

Items 6–8 want focused sessions when their respective domains are getting other changes anyway.
