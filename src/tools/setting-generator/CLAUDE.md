# Setting Generator

## Overview

The Setting Generator creates D&D 5e campaign settings with hierarchical structure, allowing DMs to build worlds from kingdoms down to individual buildings. It generates themed locations with factions, NPCs, locations, and quest hooks, supporting both top-level settings and nested sub-locations.

## Architecture

### Component Structure

**SettingGenerator.vue** - Main component with tabbed interface
**Tab Components** (in `components/tabs/`):
- **OverviewTab.vue** - Setting name, theme, and overview generation
- **LocationsTab.vue** - Sub-locations within the setting
- **FactionsTab.vue** - Factions, their goals, and relationships
- **NPCsTab.vue** - Key NPCs with descriptions and roles
- **QuestHooksTab.vue** - Adventure hooks and plot threads

### Data Flow

1. User fills out setting form (name, type, theme, mood)
2. Optionally generates random values for empty fields
3. Generates setting overview via AI
4. Tabs unlock for generating additional content:
   - Locations: Sub-locations within this setting (e.g., districts in a city)
   - Factions: Political groups, guilds, cults, etc.
   - NPCs: Key characters with descriptions and motivations
   - Quest Hooks: Adventure seeds tied to the setting
5. All generated content saves to localStorage automatically
6. Hierarchical tree structure supports nested settings (kingdom → city → district → building)
7. Export to plain text, markdown, or HTML

### Hierarchical Structure

Settings can be nested infinitely:
- **Kingdom** (top-level setting)
  - **Capital City** (child of kingdom)
    - **Market District** (child of city)
      - **Adventurer's Guild Hall** (child of district)

Each setting tracks its `parentIndex` to maintain the tree structure. When a parent is deleted, all children are recursively deleted.

### Setting Types

12 setting types available:
- **kingdom** - A realm or nation
- **city** - Urban settlement
- **town** - Small settlement
- **village** - Tiny settlement
- **wilderness** - Natural area
- **dungeon** - Underground complex
- **building** - Single structure
- **region** - Geographic area
- **plane** - Extraplanar location
- **island** - Island location
- **ship** - Vessel or mobile location
- **other** - Custom type

### AI Generation

**Overview Generation** (`settingOverviewPrompt`)
- Takes: name, type, theme, mood, alignment, notable feature
- Returns: `{ place_name, setting_overview }`
- `setting_overview` includes: description, history, current_events, atmosphere

**Sub-Location Generation** (`subLocationsPrompt`)
- Takes: parent setting context, number of locations
- Returns: Array of location objects
- Each location: `{ name, description, purpose, notable_feature }`

**Faction Generation** (`createFactionPrompt`)
- Takes: setting context
- Returns: Faction with name, goals, resources, leader, relationships

**NPC Generation** (`createNPCPrompt`)
- Takes: setting context, factions
- Returns: NPC with name, description, role, faction affiliation, motivations

**Quest Hook Generation** (`createQuestHookPrompt`)
- Takes: setting context, factions, NPCs
- Returns: Quest hook with title, description, stakes, possible_outcomes

All prompts use the parent setting's context to ensure thematic consistency.

## State Management

### Component State (Reactive)

- `settings` - Array of all saved settings (loaded from localStorage)
- `settingsTree` - Computed hierarchical tree from flat settings array
- `currentSetting` - Currently active setting being edited/viewed
- `parentIndex` - Index of parent setting (null for top-level)
- `activeTab` - Currently active tab (overview, locations, factions, npcs, quests)
- `showDataManagerModal` - Toggle for import/export modal
- `loading_*` - Loading states for each generation type

### localStorage State

**Settings** (localStorage key `'gameSettings'`):
```javascript
[
  {
    place_name: "Eldergrove Kingdom",
    adjective: "Ancient",
    setting_overview: {
      description: "...",
      history: "...",
      current_events: "...",
      atmosphere: "..."
    },
    importantLocations: [
      { name: "...", description: "...", purpose: "...", notable_feature: "..." }
    ],
    factions: [
      { name: "...", goals: "...", resources: "...", leader: "...", relationships: "..." }
    ],
    npcs: [
      { name: "...", description: "...", role: "...", faction: "...", motivations: "..." }
    ],
    questHooks: [
      { title: "...", description: "...", stakes: "...", possible_outcomes: "..." }
    ],
    parentIndex: null,  // null for top-level, otherwise index of parent
    created: "2024-01-01T00:00:00.000Z"
  }
]
```

**Tree Building**: The `settingsTree` computed property transforms the flat array into a hierarchical structure by matching `parentIndex` values.

### Reindexing on Deletion

When a setting is deleted, the component:
1. Recursively deletes all children
2. Updates `parentIndex` for all settings after the deleted index
3. Updates `main_index` in all `importantLocations` arrays
4. Saves updated settings to localStorage

This ensures referential integrity in the hierarchical structure.

## Tab System

### Overview Tab
- Setting name (with random name generator)
- Setting type (dropdown)
- Theme, mood, alignment, notable feature
- Generate button triggers AI
- Shows generated overview with description, history, events, atmosphere

### Locations Tab
- Generate 1-5 sub-locations at once
- Each location becomes a clickable link to create a child setting
- Example: Generate "Market District" in "Capital City", click to create a new setting for the district

### Factions Tab
- Generate individual factions
- Shows faction relationships as text
- Factions available to quest hook and NPC generators

### NPCs Tab
- Generate individual NPCs
- Can specify faction affiliation
- Shows role and motivations
- NPCs available to quest hook generator

### Quest Hooks Tab
- Generate adventure hooks
- Can reference existing factions and NPCs
- Shows stakes and possible outcomes

## Export Formats

**Plain Text** (`formatSettingAsPlainText.mjs`)
- Clean text format
- Hierarchical headings
- No markdown syntax

**Markdown** (`formatSettingAsMarkdown.mjs`)
- GitHub-flavored markdown
- Heading hierarchy
- Bold/italic formatting
- Lists for factions, NPCs, locations

**HTML** (`formatSettingAsHTML.mjs`)
- Styled HTML output
- `<h1>` through `<h4>` headings
- `<ul>` lists
- `<p>` paragraphs

## File Structure

```
src/tools/setting-generator/
├── SettingGenerator.vue          # Main component
├── CLAUDE.md                      # This file
├── __tests__/
│   └── SettingGenerator.spec.js  # Test suite (20 tests)
├── components/
│   └── tabs/
│       ├── OverviewTab.vue       # Setting overview generation
│       ├── LocationsTab.vue      # Sub-location generation
│       ├── FactionsTab.vue       # Faction generation
│       ├── NPCsTab.vue           # NPC generation
│       └── QuestHooksTab.vue     # Quest hook generation
└── prompts/
    ├── index.mjs                  # Exports all prompts
    ├── setting-prompts.mjs        # Overview and location prompts
    ├── faction-prompts.mjs        # Faction generation prompts
    ├── npc-setting-prompts.mjs    # NPC generation prompts
    └── quest-setting-prompts.mjs  # Quest hook prompts
src/util/
├── formatSettingAsPlainText.mjs   # Plain text export
├── formatSettingAsMarkdown.mjs    # Markdown export
└── formatSettingAsHTML.mjs        # HTML export
src/data/
├── place-adjectives.json          # Random adjectives for names
└── place-names.json               # Random place name components
```

## Test Coverage

**Test Suite:** `SettingGenerator.spec.js` (20 tests, 100% passing)

### Test Categories (20 tests total)

**Save and Load Operations (5 tests)**
- Save generated setting to localStorage under "gameSettings" key
- Preserve setting structure when saving and loading
- Load settings from localStorage on mount
- Handle empty localStorage gracefully
- Handle corrupted localStorage data gracefully

**Hierarchical Tree Structure (2 tests)**
- Maintain parent-child relationships when saving
- Correctly build settings tree from parent/child relationships

**Setting Deletion with Reindexing (3 tests)**
- Delete setting and update parentIndex of children
- Update importantLocations main_index when deleting setting
- Decrement parentIndex for settings after deleted index

**Loading State Management (2 tests)**
- Set all loading states to false before saving
- Set all open properties to false before saving

**Prompt Generation (3 tests)**
- Call settingOverviewPrompt for new top-level setting
- Use random values when form fields are empty
- Include validation function in API call

**Export Formats (3 tests)**
- Export setting to plain text format
- Export setting to markdown format
- Export setting to HTML format

**Premium Features (2 tests)**
- Show save/load button for premium users
- Show upgrade prompt for free users

## Key Patterns

### Random Name Generation

Settings can generate random names using:
- `place-adjectives.json` - 100+ adjectives (Ancient, Cursed, etc.)
- `place-names.json` - Setting type-specific name patterns

Example: "Ancient" + "Grove" = "Ancient Grove"

### Relative Paths for Tool-Specific Resources

The Setting Generator uses **relative paths** for its own prompts:
```javascript
import { settingOverviewPrompt } from '../../prompts/index.mjs';
```

But uses **path aliases** for shared resources:
```javascript
import { generateGptResponse } from '@/util/open-ai.mjs';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
```

This ensures:
- Tool-specific code stays encapsulated
- Shared utilities use clean imports
- Clear distinction between tool and project resources

### Context Passing

Each generation function receives the full parent setting as context:
```javascript
const prompt = createFactionPrompt(currentSetting.value);
```

This ensures generated content (factions, NPCs, quests) aligns with the setting's theme, atmosphere, and existing content.

## Premium Features

**Free version:**
- Browser-only storage (localStorage)
- All generation features
- Export to clipboard

**Premium version:**
- Save/load settings to file (DataManagerModal)
- Cross-device synchronization via file export/import

## Known Limitations

- No inline editing (must regenerate content)
- No custom ordering of generated content
- Hierarchical depth is unlimited (could cause performance issues with very deep nesting)
- No visual tree diagram (only nested lists in sidebar)

## Future Enhancements

- Visual tree diagram for setting hierarchy
- Drag-and-drop reordering of locations/factions/NPCs/quests
- Inline editing of generated content
- Map integration (visual representation of locations)
- Timeline view for historical events
- Cross-references between NPCs, factions, and quests
- Export to VTT platforms (Foundry, Roll20)
- Import from existing settings (Forgotten Realms, etc.)
