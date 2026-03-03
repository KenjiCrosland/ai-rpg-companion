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

**Two-Part Generation** - Encounter narratives are generated in two sequential API calls:

**Call 1: Scene Introduction**
- Selects random tone (Grim, Surreal, Poetic, etc.)
- Selects random centerpiece (environmental feature)
- Generates place name and read-aloud intro
- Shows immediately while Call 2 runs

**Call 2: DM Notes**
- Uses Call 1 context + enriched monster briefs
- Generates tactical notes, objectives, complications
- Uses creature intelligence data for tactical accuracy
- Processed via `processCall2Response()` into contentArray

**Monster Enrichment**
- `buildEnrichedMonsterBrief()` adds tactical abilities from creature-intelligence.json
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
├── CLAUDE.md                        # This file
├── components/
│   ├── MonsterPicker.vue           # SRD/Custom monster picker with tabs
│   └── EncounterMonsterList.vue    # Selected monsters list with XP calc
src/util/
├── monster-adapter.mjs              # Normalizes monster data from SRD/custom
├── encounter-enrichment.mjs         # Adds tactical intelligence to monsters
└── convertToMarkdown.mjs            # Exports encounter to Homebrewery format
src/prompts/
└── encounter-prompt.mjs             # Two-part prompt generation
src/data/
├── srd-monsters.json                # 327 SRD creatures (469KB)
├── creature-intelligence.json       # Tactical data for all 327 creatures
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

## Testing

TODO: Add test coverage for:
- Monster adapter normalization
- XP calculation and encounter multipliers
- Difficulty determination (Trivial → Deadly)
- localStorage folder management (save, load, move, delete)
- Encounter generation prompts (Call 1 + Call 2)
- Monster enrichment with creature intelligence data
- Height matching ResizeObserver logic
- Folder management state transitions

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
