# Encounter Generator

## Overview

The Encounter Generator helps DMs build D&D 5e encounters by selecting monsters, setting the scene, and generating narrative descriptions. It features a streamlined UX with monster picker, XP calculation, folder management, and statblock generation.

## Architecture

### Components

**EncounterGenerator.vue** - Main component with three-zone layout (hero, form, output)
**MonsterPicker.vue** - Tabbed interface for selecting SRD or custom monsters
**EncounterMonsterList.vue** - Shows selected monsters with quantity controls and difficulty calculation

### Data Flow

1. User selects monsters from SRD Bestiary or My Statblocks tabs
2. Monsters added to encounter list with quantity controls
3. Party composition determines XP thresholds (multi-group support)
4. Difficulty calculated based on adjusted XP (Trivial → Deadly)
5. User optionally provides encounter context (location, situation, type)
6. Two-part AI generation creates encounter narrative
7. Encounter autosaves to localStorage organized by folder
8. Output shows encounter name, flowing narrative prose, monster statblocks, and management actions

### Monster Sources

**SRD Monsters** (`/src/data/srd-monsters.json`)
- Lazy-loaded JSON array (469KB, ~50-80KB gzipped)
- 327 creatures from the D&D 5e SRD
- Normalized by `monster-adapter.mjs`
- Format: `{ name, cr, size, type, alignment, description, isSpellcaster, statblock }`

**Creature Intelligence** (`/src/data/creature-intelligence.json`)
- Tactical data for all 327 SRD monsters
- Used by AI to generate better encounter narratives
- Format: `{ signature, abilities, tactical_identity, encounter_hooks }`
- Enriched via `encounter-enrichment.mjs`

**Custom Monsters** (localStorage `'monsters'` key)
- User-created statblocks from Statblock Generator
- Organized in folders
- Adapter extracts needed fields

### XP Calculation

Uses official D&D 5e encounter building rules:
- Raw XP = sum of all monster XP × quantity
- Adjusted XP = raw XP × multiplier (based on monster count)
- Multipliers: 1 (solo), 1.5 (pair), 2 (3-6), 2.5 (7-10), 3 (11-14), 4 (15+)

### Difficulty Thresholds

Calculated per party member based on level:
- Easy, Medium, Hard, Deadly thresholds from `encounter-difficulty.json`
- Multi-group support (e.g., 4×Level 5 + 1×Level 8)
- Difficulty badge updates live based on adjusted XP

### AI Generation Process

**Three-Part Generation** - Encounter narratives are generated in three sequential API calls:

**Call 1: Structure** (`buildCall1StructurePrompt`)
- Selects random tone (Grim, Surreal, Poetic, etc.) from 12 tone presets
- Selects random centerpiece (environmental feature) from 30+ options
- Generates place name for the encounter
- Decides whether to include a key NPC based on monster composition
- Checks if monsters have disguises (`disguised_as` field)
- Returns JSON with structure data

**Call 2: Scene** (`buildCall2ScenePrompt`)
- Uses Call 1 result as context
- Rebuilds monster brief with disguise data (prevents true-form leaks in read-aloud)
- Generates immersive read-aloud text for the encounter opening
- **Shows immediately to user while Call 3 loads** (streaming UX)
- Processed via `processCall2Response()` into contentArray

**Call 3: Details** (`buildCall3DetailsPrompt`)
- Uses both Call 1 and Call 2 results as context
- Generates tactical DM notes (situation, space/terrain)
- Includes turn-by-turn guidance (`turn_readaloud`, `turn_dm_notes`)
- Adds aftermath suggestions for after the encounter
- Uses creature intelligence data for tactical accuracy
- Loads in background while user reads Call 2 content

**Monster Enrichment**
- `buildMinimalBrief()` creates basic monster descriptions for Calls 1+2
- `buildTacticalBrief()` adds detailed abilities for Call 3
- `getCreatureIntelligence()` loads tactical data from creature-intelligence.json
- `buildEnrichedMonsterBrief()` adds tactical abilities from creature intelligence
- `getEncounterProfile()` analyzes overall encounter composition
- AI receives both mechanical stats and tactical context

## Output Design

The encounter output uses a clean, narrative-focused design with clear hierarchy:

**Navigation** - "← Create New Encounter" button above the output card
- Clears all encounter data and returns to form
- Triggers monster picker height resize

**Output Card** - White card with border and shadow containing:

**Encounter Title** - Place name as h3 header

**Narrative Content** - contentArray rendered as flowing prose:
- Read-aloud boxes (italic text with background)
- Headers (h3 for sections)
- Paragraphs (with inline bold markup support)

**Monsters Section** - Each monster shows:
- Name and quantity (×N format)
- Full statblock (two-column layout)
- "Generate Statblock" button if missing

**Management Actions** (inside card bottom):
- Left: Move to Folder, Delete (small utility buttons)
- Right: Export to Homebrewery (prominent action)

**Folder Mover** - Inline dropdown interface:
- Select existing folder or create new
- Only shown when "Move to Folder" is active
- Updates localStorage and UI state on move

No uppercase section headers - the narrative flows like natural prose for easy reading at the table.

## State Management

### Component State

No Vuex/Pinia - component manages:
- `encounterMonsters` - Array of selected monsters with quantity
- `partyGroups` - Array of `{ players, level }` objects (persists across encounters)
- `location` - Encounter context (location, situation, type)
- `generatedEncounter` - Output from AI (contentArray structure)
- `loading` - Generation state
- `activeEncounterIndex` - Currently selected encounter from sidebar
- `activeFolder` - Currently selected folder
- `showFolderMover` - Toggle for folder management UI

### localStorage State

**Encounters** (localStorage key `'encounters'`):
- Organized by folder: `{ "Uncategorized": [...], "Boss Fights": [...] }`
- Each encounter includes: `name, monsters, partyGroups, location, generatedEncounter, difficulty, adjustedXp, timestamp`
- Autosave triggers: monster changes, party changes, location edits
- Auto-generated names: "Skeleton (4×), Goblin (1×)"
- Sidebar shows all folders with encounter lists and difficulty badges

**Party Config** (localStorage key `'partyConfig'`):
- Persists party composition across sessions
- Array of `{ players, level }` groups

### Folder Management

**Move to Folder**:
- Inline dropdown with existing folders + "Create new folder" option
- Updates localStorage, activeFolder, and activeEncounterIndex
- Cleans up empty folders (except Uncategorized)
- Opens target folder accordion after move

**Delete Encounter**:
- Confirmation dialog before deletion
- Removes from localStorage
- Cleans up empty folders
- Resets to new encounter state

## Premium Features

Free version: 5 statblock generations per day (tracked via `canGenerateStatblock`)
Premium version: Unlimited statblock generation

Both versions have unlimited encounter narrative generation.

## File Structure

```
src/tools/encounter-generator/
├── EncounterGenerator.vue          # Main component
├── EncounterGenerator.spec.js      # Test suite (53 tests)
├── CLAUDE.md                        # This file
├── TEST-IMPROVEMENTS-SUMMARY.md    # Detailed test coverage documentation
├── components/
│   ├── MonsterPicker.vue           # SRD/Custom monster picker with tabs
│   └── EncounterMonsterList.vue    # Selected monsters list with XP calc
├── prompts/
│   └── encounter-prompt.mjs        # Three-part prompt generation
└── util/
    └── monster-adapter.mjs          # Normalizes monster data from SRD/custom
src/util/
├── encounter-enrichment.mjs         # Adds tactical intelligence to monsters
└── convertToMarkdown.mjs            # Exports encounter to Homebrewery format
src/data/
├── srd-monsters.json                # 327 SRD creatures (469KB)
├── creature-intelligence.json       # Tactical data for all 328 creatures (663KB)
└── encounter-difficulty.json        # XP thresholds by level
```

## Key Patterns

### Height Matching with ResizeObserver

The monster picker dynamically matches the height of the party/encounter column:
- **ResizeObserver** watches party column for size changes
- Manual height calculation in `newEncounter()` and `resetEncounter()`
- Uses `nextTick()` to wait for DOM updates before measuring
- Minimum height: 400px

### Sidebar Encounter Display

Encounter composition shown inline with difficulty badges:
- Format: "Skeleton (4×), Goblin (1×)" with colored difficulty pill
- Quantity text is smaller and lighter (0.85em, #666)
- Difficulty badges match EncounterMonsterList colors with borders

## Test Coverage

**Test Suite:** `EncounterGenerator.spec.js` (53 tests, 100% passing)

See [TEST-IMPROVEMENTS-SUMMARY.md](./TEST-IMPROVEMENTS-SUMMARY.md) for detailed test documentation.

### Test Categories (53 tests total)

**Component Mounting (4 tests)**
- Mount successfully
- Load encounters from localStorage
- Load party config from localStorage
- Handle corrupted localStorage gracefully

**localStorage Operations (3 tests)**
- Save encounters to localStorage
- Save party config to localStorage
- Preserve folder structure when saving

**Three-Part Generation (3 tests)**
- Make three API calls for encounter generation
- Pass party info to first API call
- Use Call 1 response as context for Call 2

**Prompt Verification (5 tests)**
- Call buildCall1StructurePrompt with correct parameters
- Call buildCall2ScenePrompt with Call 1 result as context
- Call buildCall3DetailsPrompt with both Call 1 and Call 2 results
- Pass party description to buildCall3DetailsPrompt
- Use monster count to build briefs correctly

**Party Management (3 tests)**
- Add party group
- Remove party group
- Calculate party XP thresholds

**Monster Selection (2 tests)**
- Add monster to encounter
- Increment quantity when adding same monster twice

**CRUD Operations (3 tests)**
- Delete encounter
- Save new encounter after generation
- Switch between saved encounters

**Error Handling (2 tests)**
- Handle API errors gracefully
- Handle empty party gracefully

**Streaming Display (1 test)**
- Show read-aloud from Call 2 while Call 3 is loading

**Disguise Swap (1 test)**
- Rebuild minimal brief with disguise data for Call 2

**Creature Intelligence (1 test)**
- Load creature intelligence before building briefs

**Empty State Guard (1 test)**
- Block generation when no monsters selected

**Difficulty Calculation (6 tests)**
- Calculate correct XP for monsters
- Apply encounter multiplier for multiple monsters
- Return "None" when no monsters
- Return "Unknown" when no party configured
- Handle fractional CR values
- Adjust multiplier for small parties

**Reset Encounter (2 tests)**
- Clear form state on reset
- Preserve party config on reset

**NPC Naming (4 tests)**
- Include NPC for solo creature
- Include NPC when leader type is present
- Don't include NPC for pack of beasts
- Include NPC for single beast (reputation name)

**Folder Management (4 tests)**
- Move encounter between folders
- Create new folder when moving
- Clean up empty non-default folders after move
- Don't delete Uncategorized folder when empty

**Inline Editing (3 tests)**
- Enter edit mode with current content
- Save edits and exit edit mode
- Cancel edits without saving

**Export Functions (2 tests)**
- Export as plain text
- Show homebrewery link after markdown export

**Premium Gating (2 tests)**
- Show save/load button for premium users
- Show upgrade prompt for free users

**Cross-Tool Navigation (1 test)**
- Load monster from URL query parameter

## Known Issues

- SRD JSON is large (469KB) but lazy-loaded
- Virtual scrolling not implemented in MonsterPicker
- No search/filter in monster picker (planned enhancement)
- Long placeholder text in Encounter Context field may wrap awkwardly on narrow screens

## Completed Features

- ✅ Folder organization for saved encounters
- ✅ Move to folder / delete encounter functionality
- ✅ Export to Homebrewery markdown format
- ✅ Two-part AI generation with streaming display
- ✅ Creature intelligence integration (327 SRD monsters)
- ✅ Party config persistence across sessions
- ✅ Dynamic height matching for monster picker
- ✅ Difficulty badges in sidebar

## Future Enhancements

- Search/filter monsters by name, type, CR, size
- Export to VTT platforms (Foundry, Roll20, Improved Initiative)
- Terrain and environmental effects as toggles
- Initiative tracker integration
- Batch encounter generation
- Encounter templates (ambush, chase, siege, etc.)
- Random encounter generator based on environment + CR budget
