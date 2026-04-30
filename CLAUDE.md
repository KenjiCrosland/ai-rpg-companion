# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Security Notes

**IMPORTANT - API Key Protection**:
- **NEVER** read `.env.local` or `wp-config.php` files unless explicitly requested by the user
- These files contain sensitive API keys and credentials
- If you need to reference environment variable names or structure, use placeholder values like `your-api-key-here`
- When providing code examples with API keys, always use placeholders, never actual keys from the codebase

## Project Overview

AI RPG Companion is a Vue 3 + Vite application that provides AI-powered tabletop RPG content generation tools. The application generates D&D 5e monsters, NPCs, locations, dungeons, encounters, items, and campaign settings using multiple AI providers (DeepSeek V3 by default, with support for OpenAI GPT-4o-mini).

## Commands

### Development
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run Jest tests
```

### Testing
```bash
npm test                                    # Run all tests with verbose output
npm test -- calculateCR.spec.js            # Run a single test file
```

## Architecture

### Application Structure

**Entry Point & Routing**: The app uses a simple page-based routing system via `App.vue`. Pages are selected using the `data-page` attribute on the root div element, which is typically set by WordPress shortcodes in production.

**Generator Tools**: Tools are being migrated to a modular structure in `src/tools/`. Each tool is a self-contained directory with its own components, tests, and documentation. These components:
- Manage their own state for generated content
- Handle localStorage persistence of user-generated content organized in folders
- Support both free and premium versions (controlled by a `premium` prop)
- Include DataManagerModal for importing/exporting saved data

**Tool Documentation**: Each tool has its own CLAUDE.md file with tool-specific implementation details:
- [Statblock Generator](/src/tools/statblock-generator/CLAUDE.md) - D&D 5e monster creation with two-part generation
- [Item Generator](/src/tools/item-generator/CLAUDE.md) - Magic item creation with rarity enforcement and lore building
- [Dungeon Generator](/src/tools/dungeon-generator/CLAUDE.md) - Complex dungeon creation with rooms, NPCs, monsters, and map generation
- [Location Generator](/src/tools/location-generator/CLAUDE.md) - Location creation with contextual details and integration
- [NPC Generator](/src/tools/npc-generator/CLAUDE.md) - NPC creation with two-part generation (description + relationships)
- [Encounter Generator](/src/tools/encounter-generator/CLAUDE.md) - Combat encounter generation with monster selection and difficulty balancing
- [Setting Generator](/src/tools/setting-generator/CLAUDE.md) - Campaign setting creation with locations, factions, and hooks

**WordPress Integration**: The `wordpress/` directory contains PHP files that act as shortcodes to embed the Vue app in WordPress pages. The `functions.php` file includes an AI proxy endpoint (`/wp-json/open-ai-proxy/api/v1/proxy`) used in production to avoid exposing API keys. Note: The proxy currently only supports OpenAI and needs updating for multi-provider support.

### Key Directories

- `src/tools/` - **MODULAR TOOL STRUCTURE**: Each tool is self-contained
  - `statblock-generator/` - Monster statblock creation
  - `item-generator/` - Magic item creation with quest hooks and lore builder
  - `dungeon-generator/` - Dungeon creation with stores, composables, and complex state
  - `location-generator/` - Location generation for taverns, shops, dungeons, etc.
  - `npc-generator/` - NPC creation with descriptions, relationships, and statblocks
  - `encounter-generator/` - Combat encounter creation with monster selection and balancing
  - `setting-generator/` - Campaign setting creation with tab-based organization
  - `legacy-tools/dungeon-generator/` - Legacy dungeon generator (superseded by new version)
  - Each tool contains: main component, tests, sub-components, and CLAUDE.md
- `src/components/` - Shared Vue components (GeneratorLayout, DataManagerModal, etc.)
- `src/components/skeletons/` - Loading skeleton components
- `src/components/tabs/` - Reusable tab navigation components
- `src/util/` - Shared utility functions (AI integration, CR calculation, export converters)
- `src/prompts/` - Shared AI prompt templates (monster-prompts.mjs, loreBuilderPrompts.mjs)
- `src/data/` - JSON data files for D&D 5e rules (CR calculations, creature templates, etc.)
- `src/entries/` - Vite entry points for each tool
- `wordpress/` - WordPress theme integration files

### Path Aliases

The project uses Vite path aliases for clean imports:

```javascript
// vite.config.js
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

**Usage:**
```javascript
// Instead of: import Foo from '../../components/Foo.vue'
import Foo from '@/components/Foo.vue';

// Instead of: import { bar } from '../../../util/bar.mjs'
import { bar } from '@/util/bar.mjs';
```

**Benefits:**
- Location-independent imports
- Easier refactoring (moving files doesn't break imports)
- More readable and maintainable code
- Works in both source code and Jest tests

### AI Integration

The application supports multiple AI providers with automatic provider selection and model normalization.

**Supported Providers:**
- **DeepSeek V3** (default) - Cost-effective, high-quality content generation (~$13/month for typical usage)
- **OpenAI GPT-4o-mini** - Legacy fallback (~$7/month)

**Architecture:**

1. **Configuration Layer** (`src/util/ai-config.mjs`):
   - Provider configurations (endpoints, models, API keys)
   - Model normalization (maps model names across providers, e.g., `gpt-4.1-mini` → `deepseek-chat`)
   - Provider selection priority: localStorage override > environment variable > default (DeepSeek)
   - Functions: `getAIProvider()`, `getProviderConfig()`, `normalizeModel()`

2. **Adapter Layer** (`src/util/ai-adapters.mjs`):
   - Normalizes request/response formats between different provider APIs
   - `OpenAIAdapter`: Standard OpenAI-compatible format
   - `DeepSeekAdapter`: Uses OpenAI-compatible format (alias for OpenAI adapter)

3. **Client Layer** (`src/util/ai-client.mjs`):
   - Main `generateGptResponse()` function with provider routing
   - Retry logic (up to 3 attempts) for malformed JSON responses
   - Automatic model normalization when switching providers
   - Environment-specific routing:
     - **Development**: Vite proxy to avoid CORS (configured in `vite.config.js`)
     - **Production**: WordPress proxy at `/wp-json/open-ai-proxy/api/v1/proxy`

4. **Dev Controls** (`src/util/dev-ai-controls.mjs`):
   - Browser console controls for easy provider switching during development
   - Usage: `window.aiControls.useDeepSeek()`, `aiControls.useOpenAI()`, etc.
   - Initialized in `src/main.js`

**Prompt Templates**: Prompt files in `src/prompts/` (e.g., `monster-prompts.mjs`, `loreBuilderPrompts.mjs`) define structured prompts that guide the AI to generate game content with specific JSON schemas.

### D&D 5e CR Calculation

`src/util/calculateCR.js` implements the D&D 5e Challenge Rating calculation algorithm from the DMG. It:
- Calculates defensive CR based on HP, AC, resistances, and immunities
- Calculates offensive CR based on attack bonus, damage per round, and save DCs
- Adjusts for creature features and bonuses using `determine-features-and-bonuses.mjs`
- Uses lookup tables from `src/data/challengeRatings.json`

### State Management

No Vuex/Pinia - each generator component manages its own state and localStorage directly. Saved content is organized in folders, with the structure:
```javascript
{
  "folderName": [
    { /* generated content */ }
  ]
}
```

### Export Formats

Shared export utilities in `src/util/`:
- **Markdown Export**: `convertToMarkdown.mjs` - Converts statblocks and items to Homebrewery/GMBinder format
- **Foundry VTT Export**: `convertToFoundryVTT.mjs` - Converts statblocks to Foundry VTT JSON
- **Improved Initiative Export**: `convertToImprovedInitiative.mjs` - Converts statblocks for Improved Initiative

See tool-specific CLAUDE.md files for details on which exports each tool supports.

## Environment Variables

Create a `.env.local` file with:

```bash
# AI Provider Configuration
# Default provider: deepseek-v3 | gpt-4o-mini
VITE_AI_DEFAULT_PROVIDER=deepseek-v3

# API Keys (add keys for providers you want to use)
VITE_DEEPSEEK_API_KEY=your-deepseek-key-here
VITE_OPENAI_API_KEY=your-openai-key-here
```

**Development Provider Switching:**

In the browser console during development, use:
```javascript
aiControls.useDeepSeek()    // Switch to DeepSeek
aiControls.useOpenAI()       // Switch to OpenAI
aiControls.clearOverride()   // Clear override, use default
aiControls.listProviders()   // List all available providers
aiControls.help()            // Show help
```

**Production Configuration:**

For WordPress production deployments, add API keys to `wp-config.php`:
```php
// AI Provider API Keys
define('DEEPSEEK_API_KEY', 'your-deepseek-key-here');
define('OPENAI_API_KEY', 'your-openai-key-here');
```

**Note**: The WordPress proxy (`wordpress/functions.php`) currently only supports OpenAI in production and needs updating for multi-provider support.

**Security Note**: Never commit API keys. The `.env.local` and `wp-config.php` files should be excluded from version control.

## Testing

The project uses Jest with Vue Test Utils for component testing.

### Test Configuration

- **Test Environment**: jsdom (simulates browser environment)
- **Test Runner**: Jest with babel-jest for JS/MJS, @vue/vue3-jest for Vue files
- **Module Mapping**: Uses `@` alias (same as Vite) for consistent imports
- **CSS Mocking**: CSS imports are mocked via `jest.mock.css.js`

### Test Patterns

Each tool should have comprehensive test coverage including:
1. **Prompt Generation Tests**: Verify correct options/parameters passed to prompt functions
2. **API Call Tests**: Verify `generateGptResponse()` called with correct arguments
3. **localStorage Tests**: Verify save/load operations preserve data structure
4. **User Input Protection Tests**: (Item Generator) Verify user input respected
5. **Validation Tests**: Verify JSON response validation works correctly

See tool-specific CLAUDE.md files for detailed test coverage information.

### Running Tests

```bash
npm test                                    # Run all tests
npm test -- StatblockGenerator.spec.js     # Run specific test file
npm test -- --maxWorkers=1                 # Run tests sequentially (helps with flaky tests)
```

## Migration Status

The project has undergone two major types of migrations:

### Tool Structure Migrations

Tools have been migrated to a modular structure in `src/tools/`:

**Completed:**
- ✅ Statblock Generator → `src/tools/statblock-generator/`
- ✅ Item Generator → `src/tools/item-generator/`
- ✅ Dungeon Generator → `src/tools/dungeon-generator/`
  - Entry file: `dungeon-generator.js` (formerly `new-dungeon-generator.js`)
  - Page identifiers: `'dungeon-generator'` and `'dungeon-generator-premium'`
  - WordPress templates: `rpg-companion-dungeon-generator.php` and `rpg-companion-dungeon-generator-premium.php`
- ✅ Location Generator → `src/tools/location-generator/`
- ✅ NPC Generator → `src/tools/npc-generator/`
- ✅ Encounter Generator → `src/tools/encounter-generator/`
- ✅ Setting Generator → `src/tools/setting-generator/`
  - Test coverage: 20 tests (localStorage data layer, API integration, export formats)
  - Entry file: `setting.js`
  - Tab components in `components/tabs/` subdirectory
- ✅ Path aliases configured (`@` → `./src`)
- ✅ All external imports use `@` alias

**Legacy Tools:**
- 📦 Legacy Dungeon Generator → `src/tools/legacy-tools/dungeon-generator/`
  - Contains old DungeonGenerator.vue and DungeonGeneratorPremium.vue
  - Renamed to LegacyDungeonGenerator.vue and LegacyDungeonGeneratorPremium.vue
  - Entry files: `legacy-dungeon-generator.js` and `legacy-dungeon-generator-premium.js`
  - Page identifiers: `'legacy-dungeon-generator'` and `'legacy-dungeon-generator-premium'`
  - WordPress templates: `rpg-companion-legacy-dungeon-generator.php` and `rpg-companion-legacy-dungeon-generator-premium.php`
  - No tests (legacy code, superseded by Dungeon Generator in `/src/tools/dungeon-generator/`)

**Pending Migration:**
- ⏳ Lore Generator
- ⏳ Book Generator

### Data Architecture

The project uses a **reference-based architecture** for cross-tool data sharing — entities live in their own localStorage keys, with `tool-references` providing a graph of relationships between them. Statblocks are referenced by `name__folder`, NPCs by `npc_id`, dungeons by stable string ids (`dng_*`), settings by stable string ids (`set_*`).

**Storage layers:**
- `monsters` — statblocks, organized by folder
- `savedItems` — items, flat array, identity = `name`
- `npcGeneratorNPCs` — NPCs, organized by folder, identity = `npc_id`
- `gameSettings` — settings, flat array, identity = `id`
- `dungeons` — dungeons, flat array, identity = `id`
- `encounters` — encounters, organized by folder, identity = `${folder}__${index}`
- `tool-references` — the cross-tool reference graph (see Cross-Tool Substrate below)

**Migration Utilities:**
- `src/util/migration-runner.mjs` — global orchestration, runs each migration exactly once per browser
- `src/util/extract-existing-references.mjs` — backfills `tool-references` from legacy data shapes
- `src/util/rename-npc-item-fields.mjs` — promotes `itemName` → `sourceId/sourceName` on NPCs
- `src/util/assign-dungeon-ids.mjs` — converts legacy numeric dungeon ids to `dng_${oldId}` deterministic
- `src/util/assign-setting-ids.mjs` — assigns `set_*` ids to settings lacking one, backfills missing `appears_in_setting` refs
- `src/util/sweep-orphan-references.mjs` — drops refs whose source/target no longer resolves
- `src/util/statblock-storage.mjs`, `src/util/npc-storage.mjs`, `src/util/item-storage.mjs`, `src/util/setting-storage.mjs`, `src/util/dungeon-storage.mjs` — per-entity-type helpers (read/write, find-by-id, rename propagation)

Migration order is enforced in `migration-runner.mjs:migrations`. Adding a new migration = appending to that array.

`MIGRATION-GUIDE.md` has the original reference-based-migration patterns; the substrate work below extends them.

### Cross-Tool Reference Substrate

`src/util/seeded-input.mjs` is the substrate for cross-tool seeded entity flows. When the user clicks an action in one tool that opens another tool with seeded context (e.g., "Create NPC" on an item's stub → opens NPC Generator with the item's data prefilled), the substrate handles:

- Loading the seed from the source tool's storage (`loadSeededInput`)
- Building the prefill text the destination tool drops into its form (`buildPrefillForSeed`)
- Writing the canonical reference edge after generation (`addReferenceForSeed`)
- Back-linking the source tool's stub with the new entity's id (`writeBackPromotedNPC`)
- Render-time existence checks for "(deleted)" marker rendering (`sourceExists`)
- Cross-source stub finders/resetters for cleanup on entity deletion (`findStubsReferencingNPC`, `resetStubsForDeletedNPC`)

**Relationship lookup:** `PROMOTION_RELATIONSHIPS` is a 2D map keyed on `(source_tool, destination_entity_type)`:

```js
const PROMOTION_RELATIONSHIPS = {
  item:    { npc: 'mentioned_in_item',  setting: 'inspired_by_item', dungeon: 'inspired_by_item' },
  setting: { npc: 'appears_in_setting' },
  dungeon: { npc: 'appears_in_dungeon' },
};
```

Edge direction is `destination_entity → relationship → source_tool_entity`. `npc → mentioned_in_item → item` is read "the NPC was mentioned in the item." `setting → inspired_by_item → item` is read "the setting was inspired by the item." Adding a new flow is adding a row to this map plus the corresponding dispatcher entries.

**Dispatcher pattern:** the substrate has five maps keyed on `source.type`:
- `builders` — load a SeededInput from a navigation params payload
- `writeBacks` — update the source-side stub with the new entity's id post-promotion
- `stubFinders` — enumerate stubs across source tools that point at a given entity (used during deletion confirmation)
- `stubResetters` — clear stub→entity links across source tools when an entity is deleted
- `prefills` — produce the destination tool's prefill text from a SeededInput

Adding a new source tool = registering an entry in each of these maps. See `setting-storage.mjs` and `dungeon-storage.mjs` for the parallel implementations to `item-storage.mjs`.

**SeededInput shape:**
```ts
{
  source: { type, id, name, description?, quote?, ...source-specific extras },
  destination?: { type },                       // set by caller after loadSeededInput
  entities: Array<{
    type, id?, name, role_or_description,
    seeded_from?: { source_type, source_id, source_name, stub_name },  // cross-container provenance
    ...source-specific extras
  }>
}
```

The optional `entities[].seeded_from` is for stubs that originated in one tool and were copied into another's stub container (e.g., an item-stub seeded into a setting's NPC tab). On promotion of such a stub, `addReferenceForSeed` writes both the primary edge (e.g., `appears_in_setting`) and a secondary edge (e.g., `mentioned_in_item`) by following the `seeded_from` chain.

**Bidirectional writeBack symmetry:** `writeBackPromotedNPC` runs cross-container updates in both directions. When a setting-tab promotion writes the setting's stub, the dispatcher also calls the seeded_from source's writeBack (e.g., the item's). When an item-card promotion writes the item's stub, the item writeBack also sweeps settings/dungeons for stubs whose `seeded_from` points back. Either entry point yields the same final state.

**Render-time deletion detection:** NPCCard's subtitle calls `sourceExists(sourceType, sourceId)` and renders an inline `(deleted)` marker if the source is gone. The pattern generalizes the existing "Statblock not found" warning. Stale source pointers auto-clean on the next NPC save (`saveCurrentNPCToList` drops `sourceId/sourceName` if the source no longer resolves).

**Rename propagation:** entity renames fan out across stores via dedicated helpers:
- `renameItemReferences(oldName, newName)` in `item-storage.mjs` — items use `name` as id, so rename = id change. Updates `tool-references`, NPC `sourceId/sourceName` fields, and setting/dungeon stub `seeded_from` provenance.
- `renameNPCReferences(npcId, newName)` in `npc-storage.mjs` — NPCs have stable `npc_id`, so rename only updates display names. Walks `tool-references` source/target names, item stubs, setting/dungeon stub names. Match by `npc_id`.
- Statblocks: `renameStatblockFolder` in `statblock-storage.mjs`.
- Dungeons/settings: identity is the id, not the name, so rename doesn't propagate (display names read live from the entity).

**Where to add a new cross-tool flow:**
1. Add a row to `PROMOTION_RELATIONSHIPS`.
2. Add a builder (and writeBack/stubFinder/stubResetter/prefill if applicable) in the relevant `*-storage.mjs`.
3. Wire the entries into the dispatcher maps in `seeded-input.mjs`.
4. The destination tool's mount handler calls `loadSeededInput`, stamps `seed.destination`, calls `buildPrefillForSeed` for the form, and calls `addReferenceForSeed` + `writeBackPromotedNPC` after generation.

## Build & Deployment

The application is built using Vite and embedded into WordPress pages via shortcodes. The `vite.config.js` includes CSP headers for development. Production builds are placed in the `dist/` directory and deployed to WordPress.
