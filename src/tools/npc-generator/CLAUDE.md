# NPC Generator

Tool-specific documentation for the D&D 5e NPC Generator.

## Overview

The NPC Generator creates detailed tabletop RPG NPCs with rich personalities, backgrounds, relationships, and optional combat statblocks. It uses a two-part AI generation process to create coherent characters with depth. NPCs are saved to localStorage and can be edited, exported, and integrated with statblock generation.

## Key Architectural Principles

**IMPORTANT: Folders vs. Relationships**

The NPC Generator follows a critical design principle established in 2026:

**"Folders are for organization. References are for relationships. Don't mix them."**

This means:
- **Folders**: User's personal organization system. NPCs can be moved between folders freely without affecting their actual relationships to dungeons/settings.
- **sourceType field**: Set by dungeon/setting generators when they create NPCs. Indicates the NPC was created by that generator (not manually placed in a folder).
- **Reference Store** (`tool-references` in localStorage): Tracks actual relationships like `appears_in_dungeon`, `appears_in_setting`, `has_statblock`.

**Never infer dungeon/setting membership from folder names alone.** A folder named "The Cursed Tomb" doesn't mean NPCs in it are actually in that dungeon - they might just be organized there.

## Architecture

### Component Structure

```
src/tools/npc-generator/
├── NPCGenerator.vue                 # Main component (976 lines)
├── NPCGenerator.spec.js             # Test suite (11 tests)
├── npc-prompts.mjs                  # AI prompt templates
├── utils/
│   ├── npc-generator.mjs            # Core generation logic
│   └── request-npc-description.mjs  # Request orchestration
└── components/
    ├── NPCForm.vue                  # Form component
    └── NPCGenerationButton.vue      # Button component for embedded use
```

### Two-Part Generation Process

The generator uses a two-part generation approach similar to the Statblock Generator:

**Part 1**: NPC Description
- `character_name`: The NPC's full name
- `description_of_position`: Detailed job/role in society
- `reason_for_being_there`: Why they're at their current location
- `distinctive_feature_or_mannerism`: Observable characteristic
- `character_secret`: Hidden motivation
- `read_aloud_description`: 2-3 sentence GM-facing description
- `roleplaying_tips`: How to portray the character

**Part 2**: Relationships (uses Part 1 as context)
- `relationships`: Object mapping NPC names to relationship descriptions
- Each relationship includes how they met and a recent development

This approach ensures relationships are contextually appropriate for the generated NPC.

### Generation Flow

1. User enters NPC description (e.g., "a tavern keeper", "an elven ranger")
2. `requestNPCDescription()` orchestrates the process
3. First API call with `createNPCPrompt()` → NPC description JSON
4. Parse and display Part 1
5. `combineNPCDetails()` merges description fields into `combined_details`
6. Save to localStorage
7. Second API call with `createRelationshipAndTipsPrompt()` + previousContext → relationships JSON
8. Parse and display Part 2 (relationships)
9. Update localStorage with complete NPC

## Key Features

### NPC List Management

**Sidebar Navigation:**
- Lists all generated NPCs by name
- Click to switch between NPCs
- "+ New NPC" button creates empty state
- Active NPC highlighted with border

**Data Structure:**
```javascript
{
  npcDescriptionPart1: { /* Part 1 fields */ },
  npcDescriptionPart2: { /* Part 2 fields */ },
  typeOfPlace: "original input",
  statblock: null, // or generated statblock
  selectedChallengeRating: "1",
  isSpellcaster: false
}
```

**localStorage Key:** `npcGeneratorNPCs` (array of NPC objects)

### Inline Editing

Users can edit any NPC after generation:

**Editable Fields:**
- Character name
- Read-aloud description
- Combined details (merged text of all description fields)
- Relationships (add/edit/delete individual relationships)

**Edit Flow:**
1. Click "Edit NPC" button
2. Form populates with current data
3. Make changes
4. "Save Changes" merges back into NPC object
5. Updates localStorage

**Note:** Editing the `combined_details` field doesn't update individual fields (description_of_position, etc.). It's a merged view for convenience.

### Context-Aware Generation

The NPC Generator supports context from other tools:

**Location Context:**
```javascript
extraDescription: {
  location: "The Golden Dragon tavern description...",
  locationName: "The Golden Dragon"
}
// Generates: "an NPC who may live or frequent or work at The Golden Dragon"
```

**Relationship Context:**
```javascript
extraDescription: {
  locationContext: "The Golden Dragon tavern description...",
  locationName: "The Golden Dragon",
  mainNPC: "Bartender Bob",
  relationship: "They are childhood friends"
}
// Generates NPC with relationship to Bartender Bob
```

This integration allows DashboardPlus and other tools to generate related NPCs.

### Statblock Generation Integration

After generating an NPC, users can create a D&D 5e statblock:

**Workflow:**
1. NPC generated and displayed
2. "Generate D&D 5e Statblock" section appears
3. Select Challenge Rating (0 to 30)
4. Check "Spellcaster" if applicable
5. Click "Generate Statblock"
6. Uses `createStatblockPrompts()` with NPC details as context
7. Two-part statblock generation (same as Statblock Generator)
8. Statblock displayed below relationships
9. Save/edit statblock options available

**Statblock Context:**
The NPC's `description_of_position`, `distinctive_feature_or_mannerism`, `character_secret`, and `read_aloud_description` are combined and passed as `monsterDescription` to ensure the statblock matches the NPC's flavor.

### Export Formats

Two export formats supported:

**1. Markdown Export**
- Uses `convertNPCToMarkdown()` from `@/util/convertToMarkdown.mjs`
- Formats for Homebrewery/GMBinder
- Includes NPC description, relationships, and optional statblock
- Click "Copy as Markdown" in sidebar

**2. Plain Text Export**
- Uses `convertNPCToPlainText()` from `@/util/convertToMarkdown.mjs`
- Simple formatted text
- Good for copying into notes or VTT text fields
- Click "Copy as Plain Text" in sidebar

Both formats include statblock if one was generated.

### Premium vs Free

**Free Version:**
- Unlimited NPC generation (description + relationships)
- Statblock generation limited to 5/day
- All other features available

**Premium Version:**
- Unlimited everything
- Same features, no limits

## Data Storage

### localStorage Structure

NPCs are stored in a folder-based structure with additional metadata fields:

```javascript
{
  "Uncategorized": [
    {
      npc_id: "npc_1234567890_abc123",
      npcDescriptionPart1: {
        character_name: "Eldrin Shadowmoon",
        description_of_position: "A mysterious elven rogue...",
        reason_for_being_there: "Seeking revenge...",
        distinctive_feature_or_mannerism: "Always wears a silver pendant",
        character_secret: "Once betrayed his guild",
        read_aloud_description: "A tall elf with piercing eyes",
        roleplaying_tips: "Speak softly with distrust",
        combined_details: "A mysterious elven rogue...\n\nSeeking revenge...",
        statblock_name: "Elven Assassin",     // Reference to statblock
        statblock_folder: "Custom Creatures"   // Folder in statblock storage
      },
      npcDescriptionPart2: {
        relationships: {
          "Aria Moonwhisper": "Former lover who betrayed him...",
          "Grimjaw": "The dwarf who saved his life..."
        }
      },
      typeOfPlace: "a mysterious elven rogue",  // Original user input
      sourceType: undefined  // Not set for standalone NPCs
    }
  ],
  "The Cursed Tomb": [
    {
      npc_id: "npc_9876543210_xyz789",
      npcDescriptionPart1: { /* ... */ },
      npcDescriptionPart2: { /* ... */ },
      typeOfPlace: "The Cursed Tomb",  // Set by Dungeon Generator
      sourceType: "dungeon"             // Indicates created by Dungeon Generator
    }
  ]
}
```

**Key Fields:**
- `npc_id`: Unique identifier in format `npc_${timestamp}_${random}`
- `sourceType`: Only set when NPC created by dungeon/setting generator ('dungeon' or 'setting')
- `typeOfPlace`: Original context - either user input OR dungeon/setting name if created by generator
- `statblock_name` + `statblock_folder`: References to statblocks in shared storage

### Data Migrations

The NPC Generator runs several migrations on mount to maintain data integrity:

**1. `migrateNPCIds()`**: Adds unique `npc_id` to NPCs that don't have one (old data)

**2. `migrateDungeonNPCsToSharedStorage()`**: Syncs NPCs from dungeon `npcs` arrays to shared NPC storage

**3. `migrateSettingNPCsToSharedStorage()`**: Syncs NPCs from setting `npcs` arrays to shared NPC storage

**4. `migrateSourceTypeFromTypeOfPlace()`**: **Critical migration for dungeon/setting links**
- Checks NPCs with `typeOfPlace` field but no `sourceType`
- Verifies `typeOfPlace` matches a real dungeon or setting name in localStorage
- Sets `sourceType: 'dungeon'` or `sourceType: 'setting'` accordingly
- **Why this is safe**: `typeOfPlace` is only set by dungeon/setting generators, never by user folder organization
- **Example**: NPC with `typeOfPlace: "The Cursed Tomb"` gets `sourceType: "dungeon"` if a dungeon named "The Cursed Tomb" exists

**5. `migrateNPCStatblockReferences()`**: Creates references in reference store for NPCs with statblocks

**Important**: Never infer `sourceType` from folder names. Folders are for user organization only.

### Dungeon/Setting Link Logic

How the subtitle link "From [Dungeon/Setting Name]" is determined:

**`computedOrigin` (returns dungeon/setting name for display):**
1. Check NPC's `sourceType` field - if set, return `typeOfPlace`
2. Fallback: Check reference store for `appears_in_dungeon` or `appears_in_setting` relationship
3. Return target name from reference if found

**`computedSourceType` (returns 'dungeon' or 'setting' for link navigation):**
1. Check NPC's `sourceType` field - if 'dungeon' or 'setting', return it
2. Fallback: Check reference store for `appears_in_dungeon` or `appears_in_setting` relationship
3. Return relationship type if found

**Result**: NPCs created by dungeon/setting generators show clickable links. NPCs just organized in folders don't.

### Data Manager Integration

Uses `DataManagerModal` component for:
- Export all NPCs to JSON file
- Import NPCs from JSON file
- Clear all data

**Storage Key:** `npcGeneratorNPCs`

## Test Coverage

`NPCGenerator.spec.js` includes 11 tests covering:

### Two-Part Generation (3 tests)
- Sequential generation of description then relationships
- Correct NPC type passed to createNPCPrompt
- Part 1 response used as context for Part 2

### localStorage Operations (5 tests)
- Generated NPC saved to localStorage
- NPCs loaded from localStorage on mount
- Empty localStorage handled gracefully
- NPC data structure preserved when saving
- Combined details field creation

### Error Handling (2 tests)
- API errors handled gracefully
- Error message displayed when generation fails

### Statblock Integration (1 test)
- Statblock generation available after NPC generated

All tests use mocked API responses and localStorage to ensure test isolation.

## Component Hierarchy

### Main Component (NPCGenerator.vue)

**Key Reactive State:**
- `npcs`: Array of all NPCs
- `currentNPCIndex`: Index of currently displayed NPC
- `npcDescriptionPart1`: Part 1 data for current NPC
- `npcDescriptionPart2`: Part 2 data for current NPC
- `loadingPart1`, `loadingPart2`: Loading states
- `statblock`: Generated statblock for current NPC
- `isEditingNPC`: Edit mode toggle

**Key Methods:**
- `handleGenerateNPC()`: Initiates NPC generation
- `saveCurrentNPCToList()`: Persists NPC to array and localStorage
- `loadNPCIntoView()`: Loads NPC from array into display
- `createNewNPC()`: Resets to empty state
- `selectNPC()`: Switches to different NPC
- `deleteCurrentNPC()`: Removes NPC from list
- `startEditingNPC()`: Enters edit mode
- `saveEditNPC()`: Saves edits and exits edit mode
- `combineNPCDetails()`: Merges description fields
- `generateStatblock()`: Creates D&D 5e statblock

### Sub-Components

**NPCForm.vue**
- Renders input + button
- Used in DashboardPlus for integrated generation
- Supports `extraDescription` prop for context
- Emits events: `npc-description-generated`, `set-loading-state`, `npc-description-error`

**NPCGenerationButton.vue**
- Button-only version of NPCForm
- For embedded use when input is elsewhere
- Same event emissions

## Prompts

### `createNPCPrompt(typeOfNPC)`

**Located:** `npc-prompts.mjs`

**Purpose:** Generates the NPC description (Part 1)

**Key Instructions:**
- Each field flows into the next with transition words
- `description_of_position`: Include detail that sets them apart
- `reason_for_being_there`: Aligns with goals, generates location if needed
- `distinctive_feature_or_mannerism`: Observable in actions
- `character_secret`: Hidden motivation
- `read_aloud_description`: Concise 2-3 sentences for GM
- `roleplaying_tips`: 1-2 sentences on how to portray

**Temperature:** 0.9 (for creative variety)

**Examples:** Extensive examples provided for each field

### `createRelationshipAndTipsPrompt(npcDescriptionPart1)`

**Located:** `npc-prompts.mjs`

**Purpose:** Generates relationships (Part 2)

**Input:** JSON string of Part 1 NPC description

**Output:** Object with `relationships` key

**Key Instructions:**
- Each relationship has 2 sentences
- Sentence 1: How they met, nature of relationship
- Sentence 2: Recent event or development
- Use proper nouns for names, not titles
- Mention meaningful events between NPCs

**Examples:** Show-don't-tell approach to relationships

## Utilities

### `npc-generator.mjs`

**Functions:**
- `validateNPCDescription(jsonString)`: Validates Part 1 has all required keys
- `validatePart2(jsonString)`: Validates Part 2 has `relationships` key
- `generateNPCDescription(typeOfPlace, callbacks)`: Orchestrates two-part generation

**Callback Structure:**
```javascript
{
  part1: (npcDescription) => { /* handle Part 1 */ },
  part2: (npcDescription) => { /* handle Part 2 */ },
  error1: (error) => { /* handle Part 1 error */ },
  error2: (error) => { /* handle Part 2 error */ }
}
```

### `request-npc-description.mjs`

**Function:** `requestNPCDescription(typeOfNPC, extraDescription, sequentialLoading, emit)`

**Purpose:** Higher-level wrapper that:
- Constructs full prompt with context
- Handles sequential vs parallel loading
- Manages loading states via emit
- Calls `generateNPCDescription()` with callbacks

**Sequential Loading:**
- If `true`: Part 2 doesn't start until Part 1 completes
- If `false`: Both start simultaneously (Part 2 still waits on Part 1 data)

## UI/UX Patterns

### Landing Page (No NPC Loaded)

**Three-zone layout:**
1. **Hero Header**: Tool name, value proposition
2. **Form Card**: Input field with examples, generate button
3. **Footer Meta**: Free/premium info, limits

### Generated NPC View

**Sections:**
1. NPC name (h2)
2. Read-aloud description (highlighted box)
3. Combined details (paragraph format)
4. Relationships section (if Part 2 loaded)
5. Statblock generation controls
6. Generated statblock (if created)

### Edit Mode

Replaces view mode with form fields for all editable properties.

## Known Patterns

### Shared Components Used

- `GeneratorLayout.vue` - Provides sidebar/main content layout
- `Statblock.vue` - Renders D&D 5e statblock
- `SaveStatblock.vue` - Statblock save/export options
- `DataManagerModal.vue` - Import/export/folder management

### Toast Notifications

Uses `useToast()` composable for:
- "NPC deleted" on deletion
- "All NPCs deleted" on bulk delete
- "NPC copied as markdown!" on markdown export
- "NPC copied as plain text!" on plain text export

### Incognito Mode

The tool doesn't actively check for incognito mode, unlike Dungeon Generator tools. NPCs will be lost on browser close if in incognito.

## Premium Features

Controlled by `premium` prop:
- Free: Statblock generation limited to 5/day
- Premium: Unlimited statblock generation
- All other features identical

## Integration Points

### DashboardPlus Integration

DashboardPlus uses NPCForm and NPCGenerationButton to generate NPCs in context of locations. Provides location and relationship context via `extraDescription` prop.

### Statblock Generator Integration

Shares statblock generation logic with Statblock Generator:
- Uses same `createStatblockPrompts()` from `@/prompts/monster-prompts.mjs`
- Uses same validation functions
- Integrates with `canGenerateStatblock()` for daily limits

### Dashboard Integration

Dashboard.vue displays both Location Generator and NPC Generator side by side, allowing quick generation of locations and their inhabitants.

## Related Files

- `/src/util/open-ai.mjs` - API integration
- `/src/prompts/monster-prompts.mjs` - Statblock prompt generation
- `/src/util/convertToMarkdown.mjs` - Export formatting
- `/src/util/can-generate-statblock.mjs` - Daily limit checking
- `/src/data/challengeRatings.json` - CR options for statblocks
- `/src/composables/useToast.mjs` - Toast notifications
- `/src/components/GeneratorLayout.vue` - Layout wrapper

## Future Enhancement Opportunities

- Add folder organization (like Statblock Generator)
- Add more export formats (Roll20, Foundry VTT)
- Support for images/portraits
- Voice/accent suggestions
- Quest hook generation (like Item Generator)
- Faction affiliation tracking
- NPC-to-NPC relationship visualization
