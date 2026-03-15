# AI RPG Companion

A collection of AI-powered content generation tools for tabletop RPG game masters, built with Vue 3 and OpenAI's GPT models. Generate complete D&D 5e monsters, items, NPCs, encounters, dungeons, and campaign settings with rich tactical detail and narrative flavor.

**Live Site:** [cros.land](https://cros.land)

## 🎲 Tools

### Statblock Generator
Create D&D 5e monster statblocks with two-part generation (base stats + abilities). Includes automatic CR calculation following DMG guidelines, validation against official stat ranges, and export to Homebrewery, Foundry VTT, and Improved Initiative.

- **Features:** Custom abilities, legendary actions, lair actions, regional effects
- **Tests:** 21 comprehensive tests
- **Docs:** [/src/tools/statblock-generator/CLAUDE.md](./src/tools/statblock-generator/CLAUDE.md)

### Item Generator
Generate magic items with rarity enforcement, quest hooks, and lore builder timeline system.

- **Features:** Rarity-appropriate abilities, user input protection, lore builder with historical events
- **Tests:** 15 tests covering prompt generation and user input protection
- **Docs:** [/src/tools/item-generator/CLAUDE.md](./src/tools/item-generator/CLAUDE.md)

### Encounter Generator
Build tactical combat encounters with XP calculation, difficulty ratings, and streaming narrative generation.

- **Features:** 327 SRD monsters + custom statblocks, tactical intelligence integration, three-part narrative generation
- **Tests:** 53 tests (100% coverage of planned features)
- **Docs:** [/src/tools/encounter-generator/CLAUDE.md](./src/tools/encounter-generator/CLAUDE.md)

### Dungeon Generator
Create complete dungeons with procedurally generated maps, room descriptions, NPCs, and monster encounters.

- **Features:** 10 room types, procedural map generation, NPC relationship webs, faction dynamics
- **Tests:** 131 tests across 7 test suites (includes critical localStorage data persistence tests)
- **Docs:** [/src/tools/dungeon-generator/CLAUDE.md](./src/tools/dungeon-generator/CLAUDE.md)

### NPC Generator
Generate NPCs with descriptions, relationships, and optional combat statblocks.

- **Features:** Two-part generation (NPCs + relationships), faction affiliations, personality traits
- **Docs:** [/src/tools/npc-generator/CLAUDE.md](./src/tools/npc-generator/CLAUDE.md)

### Location Generator
Create taverns, shops, dungeons, and other locations with contextual details.

- **Features:** Multiple location types, thematic consistency, integration with other tools
- **Docs:** [/src/tools/location-generator/CLAUDE.md](./src/tools/location-generator/CLAUDE.md)

### Setting Generator
Build campaign settings with hierarchical structure from kingdoms to individual buildings.

- **Features:** Infinite nesting (kingdom → city → district → building), factions, NPCs, quest hooks
- **Tests:** 20 tests covering localStorage, hierarchical structure, and exports
- **Docs:** [/src/tools/setting-generator/CLAUDE.md](./src/tools/setting-generator/CLAUDE.md)

## 🏗️ Architecture

### Modular Tool Structure

Each tool lives in `/src/tools/<tool-name>/` as a self-contained module:

```
src/tools/statblock-generator/
├── StatblockGenerator.vue      # Main component
├── StatblockGenerator.spec.js  # Test suite
├── CLAUDE.md                    # Tool documentation
├── components/                  # Tool-specific components
├── util/                        # Tool-specific utilities
└── prompts/                     # Tool-specific AI prompts (if any)
```

**Benefits:**
- Clear separation of concerns
- Easy to locate tool-specific code
- Self-documenting structure
- Modular testing

### Shared Resources

Common utilities and components live in `/src/`:

```
src/
├── components/          # Shared Vue components (GeneratorLayout, DataManagerModal, etc.)
├── util/                # Shared utilities (AI integration, CR calculation, export converters)
├── prompts/             # Shared AI prompts (monster-prompts.mjs, etc.)
└── data/                # D&D 5e data (CR tables, creature templates, SRD monsters)
```

### Path Aliases

The project uses Vite path aliases for clean imports:

```javascript
// Shared resources use @ alias
import { generateGptResponse } from '@/util/open-ai.mjs';
import GeneratorLayout from '@/components/GeneratorLayout.vue';

// Tool-specific resources use relative paths
import { createPrompt } from './prompts/index.mjs';
```

### WordPress Integration

The `/wordpress/` directory contains PHP files for embedding the Vue app into WordPress:
- **Shortcodes** - Each tool has a shortcode function in `functions.php`
- **Templates** - Genesis Framework templates for full-page tools
- **OpenAI Proxy** - WordPress REST endpoint (`/wp-json/open-ai-proxy/api/v1/proxy`) to protect API keys

## 🧪 Testing

**Test Framework:** Jest + Vue Test Utils
**Total Tests:** 240+ tests across all tools

### Test Coverage by Tool

- **Encounter Generator:** 53 tests (three-part generation, localStorage, folder management, exports)
- **Dungeon Generator:** 131 tests across 7 suites (CRITICAL: data persistence tests for paying users)
- **Statblock Generator:** 21 tests (prompt generation, CR calculation, validation)
- **Item Generator:** 15 tests (user input protection, rarity enforcement)
- **Setting Generator:** 20 tests (hierarchical structure, reindexing on deletion)

### Running Tests

```bash
npm test                                    # Run all tests
npm test -- StatblockGenerator.spec.js     # Run specific file
npm test -- --maxWorkers=1                 # Run sequentially (helps with flaky tests)
```

## 🚀 Tech Stack

- **Frontend:** Vue 3 (Composition API with `<script setup>`)
- **Build Tool:** Vite
- **AI Integration:** OpenAI GPT-4o-mini
- **Testing:** Jest + Vue Test Utils
- **State Management:** Component-level reactive state (no Vuex/Pinia except Dungeon Generator)
- **Styling:** Scoped CSS + shared components from REI Cedar Design System
- **Deployment:** WordPress integration via shortcodes

## 🛠️ Development

### Prerequisites

- Node.js 16+ (LTS recommended)
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Create .env.local with OpenAI API key
echo "VITE_OPENAI_API_KEY=your-api-key-here" > .env.local

# Start dev server
npm run dev
```

### Build

```bash
npm run build       # Build for production
npm run preview     # Preview production build
```

### Environment Variables

Create a `.env.local` file:

```env
VITE_OPENAI_API_KEY=your-api-key-here
```

**Note:** Never commit actual API keys. The `.env.local` file in this repo contains a placeholder.

## 📊 Project Stats

- **7 content generation tools**
- **240+ comprehensive tests**
- **328 creatures** with tactical intelligence data (663KB JSON)
- **Modular architecture** with self-contained tools
- **WordPress integration** for live deployment
- **Export formats:** Markdown, HTML, Plain Text, Foundry VTT, Improved Initiative

## 📁 Key Files

### Documentation
- **[CLAUDE.md](./CLAUDE.md)** - Project overview and architecture for AI assistants
- **[TEST_GUIDELINES.md](./TEST_GUIDELINES.md)** - Testing standards and patterns
- **[PREMIUM-MIGRATION.md](./PREMIUM-MIGRATION.md)** - Premium feature migration guide

### Data Files
- **[/src/data/srd-monsters.json](./src/data/srd-monsters.json)** - 327 SRD creatures (469KB)
- **[/src/data/creature-intelligence.json](./src/data/creature-intelligence.json)** - Tactical data for all creatures (663KB)
- **[/src/data/challengeRatings.json](./src/data/challengeRatings.json)** - DMG CR calculation tables
- **[/src/data/creatureTemplates.json](./src/data/creatureTemplates.json)** - CR-appropriate stat templates

### Core Utilities
- **[/src/util/open-ai.mjs](./src/util/open-ai.mjs)** - OpenAI API integration with retry logic
- **[/src/util/calculateCR.js](./src/util/calculateCR.js)** - D&D 5e CR calculation following DMG
- **[/src/util/encounter-enrichment.mjs](./src/util/encounter-enrichment.mjs)** - Monster tactical intelligence

## 🎯 Design Principles

### AI Integration
- **Structured Prompts:** All prompts return validated JSON with specific schemas
- **Retry Logic:** Up to 3 attempts for malformed responses
- **Context-Aware:** Tools pass generated content as context for follow-up generations
- **Validation:** Each prompt includes a validation function to verify AI output

### Data Persistence
- **localStorage:** Browser-based storage for all tools
- **Folder Organization:** Settings, encounters, dungeons, items organized in user-created folders
- **Autosave:** Content saves automatically after generation
- **Import/Export:** Premium users can save/load data as files for cross-device sync

### User Experience
- **Streaming Display:** Show partial results immediately (e.g., Encounter Generator shows read-aloud while DM notes load)
- **Progressive Enhancement:** Tools work without premium features, upgrade unlocks advanced capabilities
- **Responsive Design:** All tools work on mobile and desktop
- **Keyboard Navigation:** Support for keyboard-only users

### Code Quality
- **Self-Documenting:** Each tool has comprehensive CLAUDE.md documentation
- **Test Coverage:** Critical paths covered by automated tests (especially localStorage for paying users)
- **Type Safety:** Validation functions ensure data structure integrity
- **Error Handling:** Graceful degradation when localStorage corrupts or API fails

## 🤝 Contributing

This is a personal project, but the code is available for learning and reference. Key areas to explore:

- **Modular Tool Architecture** - See how each tool is self-contained
- **AI Prompt Engineering** - Check `/src/prompts/` and tool-specific prompt files
- **CR Calculation Algorithm** - See `/src/util/calculateCR.js` for DMG implementation
- **Three-Part Generation Pattern** - See Encounter Generator for streaming UX
- **Hierarchical Data Structures** - See Setting Generator for tree building and reindexing

## 📄 License

Copyright © 2024 Kenji Crosland. All rights reserved.

This codebase is available for viewing and learning purposes. Please contact the author for any other use.

---

**Built with ❤️ for DMs who need more time to prep epic adventures**
