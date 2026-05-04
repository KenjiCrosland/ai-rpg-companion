# Changelog

All notable changes to AI RPG Companion are tracked here.

## 2026-05-03 — Item → NPC bridge and cross-tool substrate

### Item Generator

- Magic item generation now detects named characters in the item's lore and surfaces them as a "Related NPCs" section on the item card.
- Each related NPC renders as a compact stub with a **Create NPC** action that opens the NPC Generator with the item's name, type, rarity, physical description, and lore prefilled in the form. The user can review and edit before generating.
- Older items (saved before this release) get a **Re-scan Lore** button that runs a one-shot scan of the saved lore and timeline events to populate the same stubs.
- After NPC generation, the item's stub back-links to the new NPC and switches to a **View in NPC Generator** action.
- Item card visual pass: lore callout block, sentence-case button labels, bolded mechanical keywords (charges, ranges, dice, DCs, durations, recharge), Source Serif 4 throughout.

### NPC Generator

- NPCs created from an item show their provenance in the card subtitle (e.g. "from item: Staff of the Drowned Star").
- If the source item is later renamed or deleted, the subtitle reflects the new name or shows an inline `(deleted)` marker. Stale source pointers self-clean on the next save.
- Deletion confirmation now lists every place the NPC appears — NPC Generator folder, dungeons, **and** settings (settings were silently omitted before).

### Cross-tool reference substrate

- Introduced `tool-references` storage as the canonical graph for cross-tool relationships, with a 2D `PROMOTION_RELATIONSHIPS` map keyed on `(source_tool, destination_entity_type)` driving the bridge logic.
- Five dispatcher maps (`builders`, `writeBacks`, `stubFinders`, `stubResetters`, `prefills`) make adding a new source-tool flow a matter of registering one entry per map. Setting → NPC and Dungeon → NPC flows are wired through the same substrate.
- Stubs that originate in one tool and get copied into another carry a `seeded_from` provenance trail. Promotion writes both the primary edge and the secondary edge so either entry point yields the same final state.

### Storage & migrations

- Promoted legacy NPC `id` field to canonical `npc_id` across all four NPC stores; dropped the legacy `id` afterward. Eliminates ~25 sites of `entity.npc_id || entity.id` dual-read code.
- Dropped the unused `npc_folder` field from stub stores.
- Assigned stable `dng_*` ids to dungeons and `set_*` ids to settings. Renames now propagate display names everywhere; identity is the id.
- One-shot orphan-reference sweep drops `tool-references` edges whose source or target no longer resolves.
- Items use `name` as their cross-tool id; `renameItemReferences` propagates renames across `tool-references`, NPC `sourceId`/`sourceName`, and setting/dungeon stub `seeded_from` provenance.

### Design system

- New parchment design system (`src/parchment/`) with `ParButton` (incl. `link` variant), `ParInput`, `ParTextarea`, `ParSelect`, `ParCheckbox`, and a `ParTooltip` with two-triangle bordered arrow.
- Source Serif 4 wired through `--par-font-serif`.
- Global sans-serif override in `App.vue` carves out `.parchment` so content cards keep the serif treatment without per-component opt-in.
- Item card and NPC card surfaces consolidated onto parchment color tokens (no more local `--card-*` aliases).

### Fixes

- Statblock save/move/rename now propagate to `tool-references` correctly (four functions were defaulting to `'[]'` and gating on `Array.isArray`, silently no-op'ing on the actual object-keyed shape).
- Setting-side and dungeon-side NPC stub reset on canonical NPC delete now strips rich content fields, so the migration loop doesn't recreate the deleted NPC from leftover stub state.
- Cross-folder NPC navigation: Setting Generator's "view NPC" now finds the NPC by id even after it's been moved between folders.
- Statblock fuzzy search and encounter monster picker no longer emit Vue duplicate-key warnings when localStorage contains same-named entries across folders.
- `saveStatblockToStorage` dispatches a `npc-storage-updated` event so cross-tool listeners stay in sync.
