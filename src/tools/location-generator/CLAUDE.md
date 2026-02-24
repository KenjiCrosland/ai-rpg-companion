# Location Generator

Tool-specific documentation for the RPG Location Description Generator.

## Overview

The Location Generator creates evocative 4-sentence location descriptions for tabletop RPGs. It uses a two-part AI generation process to create atmospheric locations and then extract structured data (location name, NPCs, and sublocations) for further use. Unlike other tools in the suite, this is a simple generator that does not persist data to localStorage.

## Architecture

### Component Structure

```
src/tools/location-generator/
├── LocationGenerator.vue          # Main component (display and examples)
├── LocationForm.vue               # Form component (generation logic)
├── LocationGenerator.spec.js      # Test suite (13 tests)
└── location-prompts.mjs           # AI prompt templates
```

### Two-Part Generation Process

The generator uses a two-part generation approach to create locations:

**Part 1**: Location description
- 4-sentence evocative description following strict format guidelines
- Each sentence serves a specific purpose (dimension, atmosphere, unique feature, interaction)
- Temperature set to 0.9 for creative variety

**Part 2**: Structured data extraction (uses Part 1 as context)
- Location name
- List of NPCs (with professions)
- List of sublocations (rooms, areas, etc.)

This approach ensures the extracted structured data matches the generated description.

### Generation Flow

1. User enters location type (e.g., "tavern", "wizard tower", "market")
2. Apply `startCase()` transformation (e.g., "wizard tower" → "Wizard Tower")
3. First API call with location description prompt → 4-sentence description
4. Parse and display description
5. Second API call with JSON extraction prompt + previousContext → structured data JSON
6. Validate JSON has required keys (locationName, locationNPCs, subLocations)
7. Merge description and structured data
8. Display result (location name and description)

### Prompt Structure

#### Description Prompt (`createLocationPrompt`)

Generates a 4-sentence location description with strict sentence-by-sentence guidelines:

**Sentence 1**: General description of dimensions/scale
- Examples: "The Red Rooster appears to have been converted from an old barn."

**Sentence 2**: Atmospheric details (smells, lighting, sounds)
- Examples: "The first thing you notice is that everything smells like horse."

**Sentence 3**: Interesting or unusual feature
- Examples: "Several poorly taxidermied wolves hang above the tables with lopsided grins."

**Sentence 4**: Something/someone players can interact with
- Examples: "An extremely wizened gnome lady appears to be pouring salt from a bag into a corner..."

**Design Philosophy:**
- Avoid common fantasy tropes
- Provide unusual and evocative details
- Only describe what's visible to players (no hidden details)
- Temperature: 0.9 for creative variety

#### JSON Extraction Prompt (`getLocationJSON`)

Extracts structured data from the description:

**Required Keys:**
- `locationName`: The unique name of the location
- `locationNPCs`: Array of NPCs in format "FIRST_NAME LAST_NAME (PROFESSION)"
- `subLocations`: Array of sublocation names (e.g., "Kitchen", "Cellar", "Scriptorium")

**Sublocation Guidelines:**
- At least 3 for large locations (towns, large buildings)
- Room names for buildings
- Area names for outdoor locations

## Key Features

### Example Suggestions

Pre-populated examples demonstrate the tool's versatility across different RPG settings:
- "The captain's quarters on a spelljammer ship" (D&D Spelljammer)
- "A tavern in Neverwinter that serves as a front for the local chapter of the Zhentarim" (D&D Forgotten Realms)
- "A tea house where the Emerald Champion Doji Satsume often frequents in the Land of Rokugan" (Legend of the Five Rings)
- "A gnome's workshop and home deep in the feywild who makes sentient puppets" (D&D Feywild)
- "An upscale ripperdoc establishment in Night City" (Cyberpunk)

Users can click any example to auto-fill the input field.

### Sublocation Support

The `LocationForm` component supports generating sublocations with parent context:

**Props:**
- `parentLocation`: Object with parent location data (name, description, npcNames, subLocations)
- `formContent`: Pre-filled location type (used when embedded in other tools)

**Parent Context Flow:**
When generating a sublocation:
1. Parent location data is formatted into previousContext
2. Sublocation prompt references "the place described in the previous message"
3. AI generates sublocation that fits within parent context
4. Same two-part process (description + JSON extraction)

This feature enables nested location generation (e.g., generate "kitchen" within "The Golden Dragon Tavern").

### Loading State

Uses Cedar Skeleton components for loading feedback:
- 5 skeleton lines with varying widths (95%, 90%, 85%, 95%, 50%)
- Displays during both API calls
- Provides visual feedback for 2-4 second generation time

### Error Handling

Robust error handling for API failures:
- Try-catch wraps API calls
- Error logged to console
- Emits `location-description-error` event with user-friendly message
- Loading state cleared on error
- Allows user to retry generation

## Data Flow

### Props (LocationForm)

```javascript
{
  buttonSize: String,           // Cedar button size (default: null)
  formLabel: String,            // Input label (default: 'Type of Location:')
  parentLocation: Object,       // Parent location context (default: null)
  formContent: String,          // Pre-filled location type (default: null)
  disabledButton: Boolean,      // Disable generation button (default: false)
  buttonText: String           // Button label (default: 'Generate Description')
}
```

### Events (LocationForm)

```javascript
// Emitted when loading state changes
emit('set-loading-state', boolean)

// Emitted when location is successfully generated
emit('location-description-generated', {
  locationDescription: string,
  locationName: string,
  locationNPCs: string[],
  subLocations: string[]
})

// Emitted when generation fails
emit('location-description-error', errorMessage: string)
```

### Methods (LocationForm)

```javascript
// Update input value (called by parent via ref)
updateInputValue(value: string): void

// Validate JSON response structure
validateLocationDescription(jsonString: string): boolean

// Generate location (main flow)
generateLocationDescription(): Promise<void>
```

## Test Coverage

`LocationGenerator.spec.js` includes 13 tests covering:

### Prompt Generation (2 tests)
- Correct location type passed to `createLocationPrompt()`
- Parent location context included when generating sublocation

### Two-Part API Generation (3 tests)
- Two sequential API calls made (description then JSON)
- Description response passed as context to JSON extraction call
- `getLocationJSON()` used for second API call

### Response Validation and Parsing (3 tests)
- JSON validation checks for required keys
- JSON without required keys rejected
- Emitted event contains merged response data

### Error Handling (2 tests)
- API failure emits `location-description-error` event
- Loading state set to false after error

### Input Handling (2 tests)
- `startCase()` transformation applied to location type
- `formContent` prop used when provided

### Edge Cases (1 test)
- Empty validation catches malformed JSON

## Known Patterns

### No localStorage

Unlike other tools (Statblock Generator, Item Generator, Dungeon Generator), the Location Generator does NOT save data to localStorage. It's designed for quick, one-off location generation that users can copy/paste as needed.

### No Premium Features

This tool does not have a premium version. It's freely available with all features.

### Shared Components Used

- `ToolSuiteShowcase.vue` - Displays banner promoting other tools
- Cedar components (CdrText, CdrList, CdrLink, CdrSkeleton, CdrSkeletonBone) - UI framework

### Integration with Other Tools

The `LocationForm` component can be embedded in other tools (like Dungeon Generator or Setting Generator) using:
- `formContent` prop for pre-filled location type
- `parentLocation` prop for sublocation generation
- `buttonSize` prop for UI consistency
- Event emissions for integration with parent component state

## Validation Logic

### JSON Validation Function

```javascript
validateLocationDescription(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['locationName', 'locationNPCs', 'subLocations'];
    return keys.every((key) => key in jsonObj);
  } catch (error) {
    return false;
  }
}
```

**Checks:**
1. Valid JSON parse
2. All required keys present
3. Returns boolean (used by `generateGptResponse` retry logic)

**Note:** This validation only checks key existence, not data types or structure. The AI prompt is designed to produce correct data types (string for locationName, arrays for locationNPCs and subLocations).

## Related Files

- `/src/util/open-ai.mjs` - API integration with GPT-4o-mini
- `/src/prompts/prompts.mjs` - Legacy location (original prompt location before migration)
- `@rei/cedar` - Cedar Design System components

## Future Enhancement Opportunities

- Save favorite locations to localStorage
- Folder organization for saved locations
- Export to markdown
- Generate maps or layout diagrams
- Integration with Dungeon Generator for automatic room population
- Support for different RPG systems (currently system-agnostic)
