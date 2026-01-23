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

**Generator Components**: Each tool is a standalone Vue component (e.g., `StatblockGenerator.vue`, `NPCGenerator.vue`, `LocationGenerator.vue`). These components:
- Manage their own state for generated content
- Handle localStorage persistence of user-generated content organized in folders
- Support both free and premium versions (controlled by a `premium` prop)
- Include DataManagerModal for importing/exporting saved data

**WordPress Integration**: The `wordpress/` directory contains PHP files that act as shortcodes to embed the Vue app in WordPress pages. The `functions.php` file includes an OpenAI proxy endpoint (`/wp-json/open-ai-proxy/api/v1/proxy`) used in production to avoid exposing API keys.

### Key Directories

- `src/components/` - Vue components for each generator tool
- `src/components/skeletons/` - Loading skeleton components
- `src/components/tabs/` - Reusable tab navigation components
- `src/util/` - Utility functions and AI prompt templates
- `src/data/` - JSON data files for D&D 5e rules (CR calculations, creature templates, etc.)
- `wordpress/` - WordPress theme integration files

### AI Integration

**API Layer**: `src/util/open-ai.mjs` contains `generateGptResponse()` which:
- Uses GPT-4o-mini model with "assistant Game Master" system prompt
- Includes retry logic (up to 3 attempts) for malformed JSON responses
- Uses direct OpenAI API in dev (via VITE_OPENAI_API_KEY), WordPress proxy in production
- Validates and extracts JSON from AI responses

**Prompt Templates**: Prompt files in `src/util/` (e.g., `monster-prompts.mjs`, `kingdom-prompts.mjs`, `loreBuilderPrompts.mjs`) define structured prompts that guide the AI to generate game content with specific JSON schemas.

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

Statblock generators support multiple export formats:
- Homebrewery/GMBinder Markdown (`convertToMarkdown.mjs`)
- Foundry VTT JSON (`convertToFoundryVTT.mjs`)
- Improved Initiative JSON (`convertToImprovedInitiative.mjs`)

## Environment Variables

Create a `.env.local` file with:
```
VITE_OPENAI_API_KEY=your-api-key-here
```

**Security Note**: The `.env.local` file in this repository contains a placeholder/invalid key. Never commit actual API keys.

## Build & Deployment

The application is built using Vite and embedded into WordPress pages via shortcodes. The `vite.config.js` includes CSP headers for development. Production builds are placed in the `dist/` directory and deployed to WordPress.
