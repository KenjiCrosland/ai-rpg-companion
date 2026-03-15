# Dungeon Generator

Tool-specific documentation for the D&D 5e Dungeon Generator.

## Overview

The Dungeon Generator is the most complex tool in the application (~14,700 lines of code). It creates complete D&D 5e dungeons with procedurally generated maps, room-by-room descriptions, NPCs with full backstories and relationships, and monsters with detailed statblocks. The tool uses Pinia for state management and supports both visual map editing and text-based dungeon exploration.

## Architecture

### Component Structure

```
src/tools/dungeon-generator/
├── components/
│   ├── DungeonGenerator.vue           # Main component with tabs
│   ├── DungeonGeneratorWrapper.vue    # Wrapper for App.vue integration
│   ├── OverviewTab.vue                # Dungeon overview and settings
│   ├── MapTab.vue                     # Interactive dungeon map
│   ├── NPCsTab.vue                    # NPC management and generation
│   ├── MonstersTab.vue                # Monster management and generation
│   ├── DungeonMap.vue                 # SVG map rendering
│   ├── MapSidebar.vue                 # Map room list and navigation
│   ├── RoomDescription.vue            # Individual room details
│   ├── DungeonExports.vue             # Export functionality
│   └── skeletons/                     # Loading skeletons (11 components)
├── stores/
│   ├── dungeon-store.mjs              # Main Pinia store (facade pattern)
│   ├── dungeon-state.mjs              # Centralized reactive state
│   ├── dungeon-utils.mjs              # localStorage save/load utilities
│   ├── overview-store.mjs             # Overview generation logic
│   ├── map-store.mjs                  # Map generation and room descriptions
│   ├── npc-store.mjs                  # NPC generation and statblocks
│   └── monster-store.mjs              # Monster generation and statblocks
├── composables/
│   └── useRoomDescription.js          # Room generation composable
├── prompts/
│   ├── dungeon-overview.mjs           # Dungeon overview prompt
│   ├── dungeon-entrance.mjs           # Entrance room generation
│   ├── boss-room.mjs                  # Boss encounter generation
│   ├── living-room.mjs                # Living quarters generation
│   ├── purpose-room.mjs               # Purpose-specific rooms
│   ├── connecting-room.mjs            # Hallways and passages
│   ├── secret-room.mjs                # Hidden rooms
│   ├── key-room.mjs                   # Key objective rooms
│   ├── setback-room.mjs               # Challenge rooms
│   ├── locked-room.mjs                # Locked doors
│   ├── secret-door.mjs                # Secret passages
│   ├── dungeon-obstacle.mjs           # Traps and obstacles
│   ├── custom-room.mjs                # User-defined rooms
│   ├── dungeon-npcs.mjs               # NPC and relationship generation
│   ├── monster-description.mjs        # Monster short descriptions
│   ├── monster-prompts.mjs            # Monster statblock prompts
│   └── statblock-edit-prompts.mjs     # Statblock editing prompts
├── util/
│   ├── generate-dungeon.mjs           # Main dungeon generation logic
│   ├── create-room-descriptions.mjs   # Room generation orchestration
│   ├── statblock-generator.mjs        # Monster statblock creation
│   ├── content-to-string.mjs          # Content serialization helpers
│   ├── dungeon-to-markdown.mjs        # Markdown export
│   ├── dungeon-to-html.mjs            # HTML export
│   ├── dungeon-to-plain-text.mjs      # Plain text export
│   └── dungeon-details.mjs            # Dungeon metadata utilities
├── data/
│   ├── adjectives.json                # Random dungeon name adjectives
│   └── dungeon-names.json             # Random dungeon name components
├── __tests__/
│   └── dungeon-store.localStorage.spec.js  # Critical data persistence tests
└── style.css                          # Dungeon-specific styles
```

### State Management with Pinia

**Pattern**: The dungeon generator uses a **facade pattern** where `dungeon-store.mjs` exposes a clean API while delegating to specialized modules.

**State Organization** (`dungeon-state.mjs`):
- `dungeons` - Array of all saved dungeons
- `currentDungeonId` - Currently active dungeon
- `currentDungeon` - Computed ref to active dungeon
- `selectedRoomId` - Currently selected room in map
- `activeTabIndex` - Active tab (Overview, Map, NPCs, Monsters)
- `overviewForm` - Form data for dungeon creation
- `currentlyLoadingNPCs` - Loading states for NPC generation
- `monsterLoadingStates` - Loading states for monster generation

**Store Modules**:

1. **overview-store.mjs** - Dungeon overview generation
   - Generates dungeon name, theme, history, factions
   - Creates dungeon-wide context for all room generation
   - Validates and parses overview JSON

2. **map-store.mjs** - Map generation and room management
   - Generates procedural dungeon maps using `generate-dungeon.mjs`
   - Creates rooms with connections and positions
   - Handles room description updates
   - Manages room types (entrance, boss, living, connecting, etc.)

3. **npc-store.mjs** - NPC generation
   - Generates NPCs with names, descriptions, motivations
   - Creates NPC relationships and faction dynamics
   - Supports optional statblock generation for combat NPCs
   - Uses two-part generation (NPCs first, then relationships)

4. **monster-store.mjs** - Monster generation
   - Short descriptions for quick reference
   - Full statblock generation (two-part like StatblockGenerator)
   - Monster editing capabilities
   - Links monsters to specific rooms

### Room Generation System

**Room Types** (each with dedicated prompt file):
1. **Entrance** - Entry point to the dungeon
2. **Boss** - Final encounter with major antagonist
3. **Living** - Inhabited areas (barracks, quarters)
4. **Purpose** - Functional rooms (library, armory, shrine)
5. **Connecting** - Hallways, corridors, passages
6. **Secret** - Hidden rooms with special rewards
7. **Key** - Contains critical quest items or objectives
8. **Setback** - Challenges without direct rewards (traps, ambushes)
9. **Locked** - Requires key or puzzle to access
10. **Custom** - User-defined room content

**Generation Flow** (`useRoomDescription.js`):
1. Determine room type based on map designation
2. Select appropriate prompt function
3. Generate room content via AI (includes context from overview)
4. Validate response JSON
5. Process response into room structure
6. Save to dungeon state

**Room Content Structure**:
```javascript
{
  id: "room_1",
  name: "Crumbling Entry Hall",
  type: "entrance",
  description: ["Array", "of", "content", "blocks"],
  sensory_details: "What players notice first",
  monsters: ["monster_ids"],
  npcs: ["npc_ids"],
  treasure: "Treasure description",
  secrets: "Hidden elements",
  obstacles: "Traps or hazards",
  exits: { north: "room_2", south: null },
}
```

### Map Generation

**Algorithm** (`generate-dungeon.mjs`):
- Uses 2D grid system with coordinates
- Starts at entrance (0, 0)
- Generates rooms using random walk algorithm
- Ensures connectivity between all rooms
- Places special rooms (boss, key rooms) strategically
- Creates branching paths and optional areas

**Visual Rendering** (`DungeonMap.vue`):
- SVG-based interactive map
- Click rooms to view/edit descriptions
- Visual indicators for room types
- Connection lines between rooms
- Zoom and pan support

## Key Features

### 1. Overview Generation

Creates dungeon-wide context including:
- **Name**: Generated or custom
- **Theme**: Ruins, crypt, mine, fortress, temple, etc.
- **History**: Backstory of the dungeon
- **Current State**: What's happening now
- **Factions**: Groups present in the dungeon
- **Boss**: Primary antagonist
- **Treasure**: Major rewards

### 2. NPC Generation

**Two-Part Process**:
1. Generate 1-5 NPCs with names, descriptions, motivations
2. Generate relationships between NPCs (allies, rivals, etc.)

**Features**:
- Short or full descriptions
- Optional combat statblocks
- Faction affiliations
- Personality traits
- Current activities
- Relationship web

### 3. Monster Generation

**Similar to StatblockGenerator but context-aware**:
- Short descriptions for quick reference
- Full statblock generation on demand
- Two-part generation (basic stats, then abilities)
- CR calculation using shared `calculateCR()` utility
- Room-specific placement

### 4. Export Formats

Three export formats via `DungeonExports.vue`:

**1. Markdown** (`dungeon-to-markdown.mjs`)
- Homebrewery/GMBinder compatible
- Hierarchical structure (Overview → Rooms → NPCs → Monsters)
- Includes formatted statblocks
- Expandable accordion sections

**2. HTML** (`dungeon-to-html.mjs`)
- Web-friendly format
- Styled with headings and lists
- Embeddable in websites
- Print-friendly

**3. Plain Text** (`dungeon-to-plain-text.mjs`)
- Simple text format
- Easy to copy into notes
- Compatible with any text editor
- Lightweight

## Data Storage

### localStorage Structure

Dungeons saved as array with complete state:

```javascript
[
  {
    id: "dungeon_123",
    name: "The Forgotten Crypt",
    overview: {
      name: "The Forgotten Crypt",
      theme: "Undead-infested burial site",
      history: "...",
      current_state: "...",
      factions: [...],
      boss: {...},
      treasure: "..."
    },
    rooms: [
      {
        id: "room_1",
        name: "Crumbling Entry",
        content: [...],
        // ... room data
      }
    ],
    npcs: [
      {
        id: "npc_1",
        name: "Brother Aldric",
        description: "...",
        statblock: {...}, // optional
        // ... npc data
      }
    ],
    monsters: [
      {
        id: "monster_1",
        name: "Skeleton Guardian",
        short_description: "...",
        statblock: {...}, // optional
        // ... monster data
      }
    ],
    created: "2024-01-01T00:00:00.000Z"
  }
]
```

**Critical Note**: The `dungeon-store.localStorage.spec.js` test suite (27 tests) ensures data persistence never corrupts user content. These tests are **CRITICAL** because paying users have saved dungeons that must never be lost.

## Test Coverage

**Test Files** (131 tests total across 7 suites):

1. **dungeon-store.localStorage.spec.js** (27 tests)
   - CRITICAL data persistence tests
   - Save/load round-trip validation
   - Data structure preservation
   - Edge case handling (corrupted JSON, missing fields)
   - Deletion and bulk operations

2. **DungeonExports.spec.js** (15 tests)
   - Export button rendering
   - Clipboard operations
   - Error handling
   - Format conversion verification

3. **dungeon-to-markdown.spec.js** (27 tests)
   - Overview formatting
   - Room structure
   - NPC formatting
   - Monster statblock conversion
   - Array handling

4. **dungeon-to-html.spec.js** (27 tests)
   - HTML escaping
   - Heading hierarchy
   - Statblock rendering
   - Empty field handling

5. **dungeon-to-plain-text.spec.js** (27 tests)
   - Text formatting
   - Structure preservation
   - Optional field handling

6. **monster-prompts.spec.js** (tests for prompt generation)
   - Template selection
   - Context inclusion
   - CR-appropriate stats

7. **statblock-edit-prompts.spec.js** (tests for editing prompts)
   - Action generation
   - Legendary actions
   - Abilities formatting

## Known Patterns

### Shared Components Used

- `GeneratorLayout.vue` - Main layout with sidebar
- `Statblock.vue` - Monster statblock display (used in MonstersTab and NPCsTab)
- `DataManagerModal.vue` - Import/export/folder management
- `Tabs.vue` and `TabPanel.vue` - Tab navigation
- `AppToast` - Toast notifications via `useToast()`

### AI Integration

**Context-Aware Generation**: Unlike other tools, the dungeon generator passes dungeon overview context to every room generation request. This ensures thematic consistency.

```javascript
const context = {
  dungeonName: overview.name,
  theme: overview.theme,
  factions: overview.factions,
  currentState: overview.current_state
};
```

**Validation**: Each prompt has its own validation function that checks for required JSON fields before accepting AI response.

### Loading States

Complex loading state management for concurrent operations:
- Multiple rooms can be generating simultaneously
- NPCs and monsters can generate independently
- UI shows per-item loading spinners (not global)
- Skeletons provide visual feedback during generation

## Premium Features

Premium version (controlled by `premium` prop) includes:
- Larger dungeons (more rooms)
- More NPCs and monsters
- Advanced room types
- Enhanced export options

## Critical Implementation Notes

### Why Pinia Instead of Composition API Only?

The dungeon generator uses Pinia because:
1. **Shared State**: Multiple components need dungeon data (Map, NPCs, Monsters)
2. **Persistence**: Centralized save/load logic
3. **Devtools**: Pinia DevTools help debug complex state
4. **Actions**: Clean separation of business logic from components

### Facade Pattern for Store

Instead of importing multiple stores, components import `useDungeonStore()` which exposes all functionality:
- Cleaner component imports
- Easier to refactor internal structure
- Consistent API surface

### Two-Part Generation for Complex Content

NPCs use two-part generation:
1. Generate NPCs independently
2. Generate relationships between them (requires all NPCs to exist)

This prevents the AI from creating inconsistent relationships.

### Map Generation Algorithm

The procedural map generator ensures:
- No unreachable rooms (connectivity validation)
- Minimum distance between entrance and boss
- Balanced distribution of room types
- Natural dungeon flow (not just random rooms)

## Related Files

**Shared Utilities:**
- `/src/util/calculateCR.js` - CR calculation (used by monster-store)
- `/src/util/open-ai.mjs` - AI API integration
- `/src/util/can-generate-statblock.mjs` - Incognito mode detection
- `/src/data/creatureTemplates.json` - Monster templates by CR
- `/src/data/challengeRatings.json` - CR calculation tables

**Components:**
- `/src/components/Statblock.vue` - Monster statblock renderer
- `/src/components/GeneratorLayout.vue` - Layout wrapper
- `/src/components/DataManagerModal.vue` - Data management

**Prompts:**
- `/src/prompts/monster-prompts.mjs` - Shared monster prompts (used by statblock-generator too)

## Future Enhancements

Potential improvements:
- 3D map visualization
- Automatic trap challenge ratings
- Wandering monster tables
- Random encounter generator
- Import from existing modules (Lost Mine of Phandelver, etc.)
- Collaborative editing (multiple DMs)
- Session tracking (which rooms have been explored)
