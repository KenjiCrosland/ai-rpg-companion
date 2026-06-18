# Plans

Forward-dated implementation notes for work that isn't being done now but will need to be done when a specific feature lands. Each file describes:

- The trigger — the feature or change that makes the plan relevant.
- The problem the plan exists to solve.
- The recommended approach, with enough detail that a future session can act on it without rebuilding context.

If you (Claude) are about to start work that touches a domain in this folder, **read the relevant plan first**. Plans are written assuming you have no memory of the conversations that produced them.

## When to add a plan here

- A latent issue exists that's harmless today but will bite once a specific feature ships.
- A design decision was made but deferred — the rationale needs to survive past the conversation.
- A workaround was chosen with the explicit understanding that it gets revisited later.

Don't use this folder for general roadmap items, ideas, or task lists. Plans here are about preserving *technical context that would otherwise be lost*.

## Index

- [`multi-promote.md`](./multi-promote.md) — Cross-tool NPC promotion across multiple containers of the same store. Required before shipping any "link existing NPC to setting/dungeon" or systematic recurring-NPC flow. Describes a localStorage clobber gap in delete paths.
- [`statblock-stable-id.md`](./statblock-stable-id.md) — Replace the composite `${name}__${folder}` cross-tool id for statblocks with a stable `stb_*` id, mirroring the substrate's other entity id patterns. Triggered by new tools that link statblocks, new operations that mutate statblock identity, or any bug surfaced by the composite-id form.
- [`tech-debt.md`](./tech-debt.md) — Inventory of substrate code smells (dead code, helper-pattern divergence, dynamic imports, magic strings, component bloat, etc.). Read before refactoring storage modules, when adding to the big tool components, or when looking for low-cost hygiene work to bundle. Per-item severity, scope, and trigger.
- [`per-palette-prompt-architecture.md`](./per-palette-prompt-architecture.md) — Ship cross-generator cultural-pool infrastructure at `src/data/cultural-pools/` (Yoruba first), refactor the item generator's monolithic prompt into per-palette modules that consume it, and document the adoption pattern for NPC/location/setting/etc. generators to follow. Triggered by recurring real-orisha failures, work on any other obscure palette, work on adopting cultural-pool protection in any non-item generator, or unrelated refactors blocked by the monolithic prompt.
- [`manual-npc-faction-reassignment.md`](./manual-npc-faction-reassignment.md) — Add a faction picker to NPCCard's edit mode so users can fix mis-classifications and move NPCs between factions after the fact. Auto-classify-on-faction-generation already exists; this is the complementary manual-override path. Triggered by user reports of wrong auto-classifications, or any flow that creates NPCs after factions already exist.
- [`migrate-dungeon-entry-to-mountapp.md`](./migrate-dungeon-entry-to-mountapp.md) — Standardize `src/entries/dungeon-generator.js` to use `mountApp(DungeonGenerator)` from `base.js` like every other tool entry. Eliminates the dev/prod CSS load divergence that produced the `dungeon-item-connection` regression, drops the workaround inline-fallback pattern in dungeon-only files, and restores `main.js` tokens.css import. Triggered by new shared CSS dependencies the dungeon consumes, major work on the dungeon's prod entry chain, or dev/prod rendering divergence in the dungeon tool.
- [`item-generator-form-editorial-migration.md`](./item-generator-form-editorial-migration.md) — Migrate the magic item generator's *generation form* off Cedar (`cdr-input`) onto a new parchment "magic UI" register (lapis ink, tinted fields — "Option B" mockup). Renames existing `Par{Input,Select,Textarea}` → `ParCard*` (the card-edit variant), reclaims the canonical names for new shared form primitives + a `ParField` wrapper that all 9 generator forms later adopt, and refreshes copy. Triggered by editorial migration of any generator form, building shared form-input primitives, or renaming the parchment input primitives.
