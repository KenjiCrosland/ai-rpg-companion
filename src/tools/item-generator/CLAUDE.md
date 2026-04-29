# Item Generator

Tool-specific documentation for the D&D 5e Magic Item Generator.

## Overview

The Item Generator creates D&D 5e magic items with appropriate rarity, features, and lore. It includes advanced features like Quest Hook generation and Lore Builder for creating rich item histories. The tool enforces strict rarity mechanics and protects user-provided input from AI override.

## Architecture

### Component Structure

```
src/tools/item-generator/
├── ItemGenerator.vue               # Main component
├── ItemGenerator.spec.js          # Test suite (15 tests)
└── components/
    ├── QuestHookTab.vue           # Quest hook generation
    └── LoreBuilderTab.vue         # Item history timeline builder
```

### Generation Flow

1. User fills form (name, rarity, type, origin, lore)
2. System applies rarity mechanics via `determineFeaturesAndBonuses()`
3. Generate prompt with user input protection blocks
4. API call to `generateGptResponse()` with validation
5. Parse and validate JSON response
6. Save to localStorage organized by folders
7. Display in three tabs: Item Details, Quest Hooks, Lore Builder

## Key Features

### Rarity Mechanics Enforcement

**Critical Pattern**: The generator enforces D&D 5e rarity guidelines to prevent overpowered items.

#### Rarity Definitions

- **Common**: +0 bonus, 0-1 minor utility/cosmetic effects, no combat advantage
- **Uncommon**: +0 to +1 bonus, 1-2 useful magical effects
- **Rare**: +1 to +2 bonus, 2-3 moderate magical effects
- **Very Rare**: +2 to +3 bonus, 3-4 powerful magical effects
- **Legendary**: +3 bonus, 4-5 very powerful effects
- **Artifact**: +3 bonus, 5-6 legendary effects with major drawbacks

#### Feature Calculation

`determineFeaturesAndBonuses()` from `@/util/determine-features-and-bonuses.mjs`:
- Takes rarity as input
- Returns: `{ bonus, feature_count, features, effectDefinitions }`
- Provides effect tier definitions for AI guidance
- Enforces maximum bonus and feature count per rarity

#### Common Item Restrictions

Special handling for Common items includes explicit prompt blocks:
```
CRITICAL: COMMON RARITY RESTRICTIONS
- NO +1 bonuses
- NO combat advantages
- ONLY minor utility or cosmetic effects
- NO damage dealing capabilities
```

### User Input Protection

**Critical Pattern**: User-provided names and lore must not be overridden by AI.

#### Protection Blocks in Prompts

When user provides a name:
```
=== USER-PROVIDED NAME (DO NOT CHANGE) ===
The user has explicitly named this item: "{userProvidedName}"
YOU MUST use this EXACT name in your response.
DO NOT create a different name.
```

When user provides lore:
```
=== USER-PROVIDED LORE (DO NOT CHANGE) ===
The user provided custom lore:
"{userProvidedLore}"
YOU MUST incorporate this lore exactly as written.
```

#### Coherence Block

Every prompt includes:
```
=== COHERENCE INSTRUCTION ===
When user-provided data conflicts with your ideas:
- ALWAYS prioritize the user's name and lore
- Adapt your generation to fit their vision
```

### Form Inputs

- **Item Name** (optional): Leave blank for AI to generate
- **Rarity**: Common, Uncommon, Rare, Very Rare, Legendary, Artifact
- **Item Type**: Weapon, Armor, Wondrous Item, Potion, Scroll, Ring, Rod, Staff, Wand
- **Origin** (optional): Where the item came from (used as hint if name provided)
- **Lore** (optional): Custom backstory that AI must incorporate

### Tab Components

#### Quest Hooks Tab (`QuestHookTab.vue`)

Generates adventure hooks related to the magic item:

**Features:**
- Multiple quest hook types (retrieval, curse removal, power source, rival collector)
- Quest difficulty levels (Easy, Medium, Hard, Deadly)
- Party size consideration (3-6 players)
- Incognito mode detection
- Regeneration capability
- Individual hook deletion

**Storage:**
- Saved to localStorage under `{itemName}-quest-hooks`
- Array of quest hook objects
- Persists across sessions

#### Lore Builder Tab (`LoreBuilderTab.vue`)

Creates chronological timelines of item history:

**Features:**
- Period selection (Ancient, Medieval, Renaissance, Modern, Futuristic, or custom)
- Event generation (3-5 events per period)
- Summary generation of all events
- Collapsible event cards
- Timeline expansion/collapse
- Incognito mode detection

**Storage:**
- Events saved to localStorage under `{itemName}-lore-events`
- Summary saved under `{itemName}-lore-summary`
- Period-based organization

**Prompts:**
- `generateEventPrompt()` from `@/prompts/loreBuilderPrompts.mjs`
- `generateSummaryPrompt()` from `@/prompts/loreBuilderPrompts.mjs`
- Validation functions: `validateEventJson()`, `validateSummaryJson()`

## Export Features

### Markdown Export

`convertItemToMarkdown()` from `@/util/convertToMarkdown.mjs` converts items to:
- Homebrewery/GMBinder compatible markdown
- Formatted for D&D 5e item styling
- Includes all item properties and features

## Data Storage

### localStorage Structure

Items are stored as a flat array under `savedItems`, deduplicated by name and sorted by rarity:

```javascript
[
  {
    name: "Flaming Longsword",
    item_type: "Weapon",
    rarity: "Rare",
    bonus: "+1",
    feature_count: 2,
    features: { /* ... */ },
    physical_description: "...",
    lore: "...",
    related_npcs: [ /* see Related NPCs Integration below */ ]
  },
  // ...
]
```

Item identity in the cross-tool reference graph is the item's `name` (names are unique per user because the save path deduplicates by name).

Additional storage keys per item:
- `{itemName}-quest-hooks`: Array of quest hook objects
- `{itemName}-lore-events`: Object of events by period
- `{itemName}-lore-summary`: Summary object

## Related NPCs Integration

The Item Generator participates in the cross-tool NPC graph via the `related_npcs` field on each item and the `mentioned_in_item` reference type.

### Data shape

```javascript
{
  // ... item fields
  related_npcs: [
    {
      name: "Yelena of the Duskwood",
      role_brief: "oracle who received the vision",
      context: "Granted a prophetic vision describing the staff",
      npc_id: null,         // populated by the bridge after NPC generation
      npc_folder: null
    }
  ]
}
```

### Two paths into `related_npcs`

**New items (Path A):** the main item-generation prompt is extended to also emit `related_npcs: [{name, role_brief, context}]` in the same JSON response. No second API call. The validator allows but does not require the field; `normalizeRelatedNPCs` cleans up shape and seeds `npc_id`/`npc_folder` placeholders.

**Old items (Path B, backwards-compat):** items saved before this change have no `related_npcs`. The `RelatedNPCsSection` component shows a "Find Related NPCs in Lore" button that runs `extractRelatedNPCs(item)` from `utils/extract-related-npcs.mjs` — a separate AI call against the saved `lore` (and `timelineEvents` if present) that returns the same stub shape. `mergeStubs` merges results by case-insensitive name and never overwrites stubs that already have `npc_id`.

### Stub → Full NPC (navigate-and-prefill)

Each stub is rendered as a compact card under the item's lore on the Item Details tab. Clicking "Create NPC" calls `navigateToTool('npc-generator', { fromItem, stub })` (see `@/util/navigation.mjs`). This is the project's dev/prod-aware navigation — sessionStorage in dev, query string in prod.

The NPC Generator's mount handler (in `NPCGenerator.vue`) reads the params, looks up the item via `getItemFromStorage`, finds the matching stub, and populates `typeOfPlace` with `buildPrefilledTypeOfPlace({stub, item})` from `@/prompts/item-npc-prompts.mjs`. The user reviews/edits and clicks Generate. After Part 2 completes, `finalizePendingItemLink()` calls:

1. `addNPCMentionedInItemReference(...)` — creates a `mentioned_in_item` reference in `tool-references`.
2. `linkNPCToItemStub(...)` — writes `npc_id` and `npc_folder` back onto the stub on the source item in `savedItems`.

The Item Generator picks up the back-link via a `storage` event listener (cross-tab) or a `saved-items-updated` custom event (same tab).

For stubs that already have `npc_id`, the card switches to a "View in NPC Generator" button which calls `navigateToTool('npc-generator', { npc: stub.npc_id })`; the NPC Generator's mount handler selects that NPC.

### Why this design

The Item Generator does **not** display the full NPC inline (unlike Dungeon and Setting Generators). Items are focused on a single primary entity — embedding a full NPC card would compete with the item for visual attention. We use a compact stub + reference link instead, funneling users to the NPC Generator for editing.

We also do **not** maintain a parallel item-context NPC prompt. The NPC Generator's existing pipeline runs unchanged; the only difference is that the prefilled `typeOfPlace` text contains the item's name, type, rarity, physical description, and lore. The user can review and edit the prefill before clicking Generate, which addresses any "NPC must not contradict the item's lore" accuracy concern.

### Rename / delete handling

- On rename (in `saveEdit`): `renameItemReferences(oldName, newName)` updates `target_id`/`source_id` on any references where the item is involved.
- On delete (in `deleteItem`): `removeReferencesForItem(name)` (a thin wrapper over `removeReferencesForEntity('item', name)`) drops every `mentioned_in_item` reference for that item. The canonical NPC in `npcGeneratorNPCs` is preserved — item deletion does not cascade.

### Files involved

- `src/util/item-storage.mjs` — `saveItemToStorage`, `getItemFromStorage`, `linkNPCToItemStub`, `renameItemReferences`, `addNPCMentionedInItemReference`, `removeReferencesForItem`.
- `src/prompts/item-npc-prompts.mjs` — `createItemNPCExtractionPrompt`, `validateItemNPCExtraction`, `buildPrefilledTypeOfPlace`.
- `src/tools/item-generator/utils/extract-related-npcs.mjs` — `extractRelatedNPCs` (orchestrator), `mergeStubs` (pure merge helper).
- `src/tools/item-generator/components/RelatedNPCsSection.vue` — the compact stub UI.
- `src/util/extract-existing-references.mjs` — `extractItemNPCReferences` runs as part of the migration to backfill `mentioned_in_item` references for items whose stubs already have `npc_id`.

## Test Coverage

`ItemGenerator.spec.js` includes 15 tests covering:

### User Input Protection (6 tests)
- USER-PROVIDED NAME block included when user provides name
- Naming style guidance included when user does NOT provide name
- USER-PROVIDED LORE block included when user provides lore
- Random origin skipped when user provides name
- Explicit origin used as HINT when user provides both origin and name
- COHERENCE block emphasizing user input priority

### Rarity Mechanics Enforcement (2 tests)
- Explicit Common item restrictions included in prompt
- Rarity self-check placeholder included (full instructions in prompt)

### API Call Verification (2 tests)
- `generateGptResponse()` called with prompt, validation function, and retry count
- Response validated for required JSON fields

### localStorage Operations (5 tests)
- Generated item saved to localStorage
- Item structure preserved when saving
- Items loaded from localStorage on mount
- Round-trip save and load successful
- Empty localStorage handled gracefully

## Known Patterns

### Shared Components Used

- `GeneratorLayout.vue` - Provides sidebar/main content layout
- `DataManagerModal.vue` - Import/export/folder management
- `ItemSkeleton.vue` - Loading state display
- `Tabs.vue` and `TabPanel.vue` - Tab navigation

### Incognito Mode Detection

Both QuestHookTab and LoreBuilderTab check for incognito mode using `detectIncognito()`:
- Displays warning if in incognito mode
- Warns data won't persist
- Prevents frustration from lost work

### Toast Notifications

Uses `useToast()` composable for user feedback:
- Success messages when items generated/saved
- Error messages for API failures
- Warning messages for incognito mode

## Premium Features

Premium version (controlled by `premium` prop) may include:
- Access to Artifact rarity
- Enhanced customization options
- Additional tab features

(Check component code for current premium features)

## Critical Implementation Notes

### Rarity Enforcement is Essential

The rarity mechanics prevent game-breaking items:
- Common items MUST be restricted to avoid +1 weapons at Common rarity
- Feature counts must align with rarity tier
- AI sometimes tries to add extra features—validation catches this

### User Input is Sacred

The user input protection system exists because:
- AI tends to "improve" user-provided names
- AI may ignore custom lore in favor of its own ideas
- Explicit protection blocks are necessary to force compliance

### Why Two-Way Protection?

Tests verify BOTH cases (name provided vs. not provided) because:
- With name: Must use exact name, treat origin as hint only
- Without name: Must include origin in generation, create appropriate name

## Related Files

- `/src/util/determine-features-and-bonuses.mjs` - Rarity mechanics enforcement
- `/src/util/convertToMarkdown.mjs` - Item export formatting
- `/src/prompts/loreBuilderPrompts.mjs` - Quest hook and lore prompts
- `/src/components/skeletons/ItemSkeleton.vue` - Loading state
- `/src/components/skeletons/QuestHookSkeleton.vue` - Quest hook loading state
