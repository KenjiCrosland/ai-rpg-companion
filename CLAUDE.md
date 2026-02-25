# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI RPG Companion is a Vue 3 + Vite application that provides AI-powered tabletop RPG content generation tools. The application generates D&D 5e monsters, NPCs, locations, dungeons, encounters, items, and campaign settings using OpenAI's GPT models.

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

**WordPress Integration**: The `wordpress/` directory contains PHP files that act as shortcodes to embed the Vue app in WordPress pages. The `functions.php` file includes an OpenAI proxy endpoint (`/wp-json/open-ai-proxy/api/v1/proxy`) used in production to avoid exposing API keys.

### Key Directories

- `src/tools/` - **MODULAR TOOL STRUCTURE**: Each tool is self-contained
  - `statblock-generator/` - Monster statblock creation
  - `item-generator/` - Magic item creation with quest hooks and lore builder
  - `dungeon-generator/` - Dungeon creation with stores, composables, and complex state
  - `location-generator/` - Location generation for taverns, shops, dungeons, etc.
  - `npc-generator/` - NPC creation with descriptions, relationships, and statblocks
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

**API Layer**: `src/util/open-ai.mjs` contains `generateGptResponse()` which:
- Uses GPT-4o-mini model with "assistant Game Master" system prompt
- Includes retry logic (up to 3 attempts) for malformed JSON responses
- Uses direct OpenAI API in dev (via VITE_OPENAI_API_KEY), WordPress proxy in production
- Validates and extracts JSON from AI responses

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
```
VITE_OPENAI_API_KEY=your-api-key-here
```

**Security Note**: The `.env.local` file in this repository contains a placeholder/invalid key. Never commit actual API keys.

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

The project is undergoing a migration to organize tools into `src/tools/`:

**Completed:**
- ✅ Statblock Generator → `src/tools/statblock-generator/`
- ✅ Item Generator → `src/tools/item-generator/`
- ✅ Dungeon Generator → `src/tools/dungeon-generator/`
- ✅ Location Generator → `src/tools/location-generator/`
- ✅ NPC Generator → `src/tools/npc-generator/`
- ✅ Path aliases configured (`@` → `./src`)
- ✅ All external imports use `@` alias

**Legacy Tools:**
- 📦 Legacy Dungeon Generator → `src/tools/legacy-tools/dungeon-generator/`
  - Contains old DungeonGenerator.vue and DungeonGeneratorPremium.vue
  - Renamed to LegacyDungeonGenerator.vue and LegacyDungeonGeneratorPremium.vue
  - Entry files: legacy-dungeon-generator.js and legacy-dungeon-generator-premium.js
  - Page identifiers: 'legacy-dungeon-generator' and 'legacy-dungeon-generator-premium'
  - No tests (legacy code, superseded by new Dungeon Generator)

**Pending Migration:**
- ⏳ Encounter Generator
- ⏳ Setting Generator
- ⏳ Lore Generator
- ⏳ Book Generator

## Build & Deployment

The application is built using Vite and embedded into WordPress pages via shortcodes. The `vite.config.js` includes CSP headers for development. Production builds are placed in the `dist/` directory and deployed to WordPress.
