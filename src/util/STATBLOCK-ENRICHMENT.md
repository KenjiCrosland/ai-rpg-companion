# Custom Statblock Enrichment

## Overview

Custom statblocks automatically generate creature intelligence data when saved, enabling them to work seamlessly with the Encounter Generator's personality-driven encounter system.

## The Problem

SRD creatures in `creature-intelligence.json` have rich tactical data that drives encounter generation:
- `description` - Physical appearance and behavioral identity
- `signature` - Key tactical fact
- `abilities` - Mechanical summary of actions/traits
- `tactical_identity` - Combat strategy
- `encounter_hooks` - What makes the fight interesting
- `preferred_tones` - Which encounter tones fit the creature
- `retreat` / `social` - Behavior when losing / negotiating
- `aftermath_hooks` - Post-combat material

Custom statblocks lacked this data, resulting in generic encounters.

## The Solution

**Automatic Enrichment**: When a custom statblock is saved, an additional AI call ("Call 0") generates all creature intelligence fields and caches them in localStorage. The Encounter Generator checks localStorage first, then falls back to `creature-intelligence.json`.

## Architecture

### File Structure

```
src/util/statblock-enrichment.mjs      # Enrichment logic
src/prompts/encounter-prompt.mjs        # Updated getCreatureIntelligence()
src/tools/statblock-generator/          # Hooked into save process
  StatblockGenerator.vue
```

### Data Flow

1. User generates/edits a custom statblock
2. Statblock is saved to `localStorage['monsters']`
3. **Enrichment call runs automatically**:
   - Formats statblock as text prompt
   - Sends to GPT-4o-mini
   - Receives creature intelligence JSON
   - Validates structure
   - Saves to `localStorage['creature-intel:${creatureName}']`
4. When used in Encounter Generator:
   - `getCreatureIntelligence()` checks `creature-intel:${name}` first
   - Falls back to `creature-intelligence.json` for SRD creatures
   - Uses enriched data for custom creatures

### Enrichment Prompt

The enrichment prompt analyzes the full statblock and generates:

**DESCRIPTION** (2 sentences):
- Physical appearance (what players see)
- Behavioral identity (what it is as a story character)
- Inferred from abilities, type, flavor text

**SIGNATURE** (1 sentence):
- Most important tactical fact
- Defines what makes fighting it different

**ABILITIES** (array):
- One line per ability/action/reaction/trait
- Name + brief mechanical summary

**TACTICAL_IDENTITY** (1-2 sentences):
- Overall combat strategy
- Combos and role in groups

**ENCOUNTER_HOOKS** (2-3 items):
- What makes the fight interesting
- Player tactical choices and counterplay

**PREFERRED_TONES** (2-4 items):
- Which encounter tones fit
- Must choose from 12 valid tones
- Rules based on INT score and abilities

**RETREAT** (string or null):
- How creature behaves when losing
- Null for mindless/fight-to-death

**SOCIAL** (string or null):
- What it wants from negotiation
- Null for INT ≤5 or non-communicative

**AFTERMATH_HOOKS** (2-3 items):
- Post-combat material
- Objects, mechanics, world connections

### Validation

`validateEnrichmentOutput()` ensures:
- All required fields present
- Field types correct (strings, arrays, null)
- `preferred_tones` contains only valid tone IDs
- Minimum lengths for text fields
- Array sizes meet requirements

Retries up to 3 times if validation fails.

## Storage

### localStorage Keys

```javascript
// Custom statblocks
localStorage['monsters'] = {
  "Uncategorized": [
    { name: "Headless Horseman", ... }
  ]
}

// Creature intelligence (enrichment results)
localStorage['creature-intel:Headless Horseman'] = {
  description: "...",
  signature: "...",
  abilities: [...],
  // ... full intelligence data
}
```

### Lookup Priority

```javascript
function getCreatureIntelligence(encounterCreatures) {
  for (const creature of encounterCreatures) {
    // 1. Check localStorage (custom creatures)
    const stored = localStorage.getItem(`creature-intel:${creature.name}`);
    if (stored) return JSON.parse(stored);

    // 2. Fall back to creature-intelligence.json (SRD creatures)
    const intel = creatureIntelligenceData[creature.name];
    if (intel) return intel;

    // 3. No intelligence data available
    return null;
  }
}
```

## When Enrichment Runs

**Automatic Triggers:**
- ✅ New statblock generation completes
- ✅ Existing statblock is regenerated
- ✅ Statblock is edited (name changes trigger re-enrichment)

**Manual Control:**
Not currently exposed in UI, but functions available:
- `enrichCustomStatblock(statblock)` - Generate enrichment
- `saveEnrichment(name, data)` - Store in localStorage
- `loadEnrichment(name)` - Retrieve from localStorage
- `deleteEnrichment(name)` - Remove from localStorage

## Error Handling

Enrichment failures are **non-fatal**:
```javascript
try {
  const enrichment = await enrichCustomStatblock(finalMonster);
  saveEnrichment(finalMonster.name, enrichment);
} catch (error) {
  console.warn(`[ENRICHMENT] Failed to enrich ${finalMonster.name}:`, error);
  // Statblock still works, just won't have intelligence data for encounters
}
```

The statblock is saved regardless of enrichment success. Encounters will generate using only mechanical data if enrichment fails.

## Integration with Encounter Generator

The enriched data flows into the three-call encounter system:

**Call 1 (Structure)**:
- Uses `preferred_tones` to select encounter tone
- Uses `description` in minimal brief
- Uses `social` to determine negotiation options
- Uses `retreat` to determine escape conditions

**Call 2 (Read-Aloud)**:
- Uses `description` from minimal brief (swapped for disguise if needed)
- Uses `encounter_hooks` mixed into centerpiece pool

**Call 3 (DM Notes)**:
- Uses `tactical_identity` for tactical guidance
- Uses `abilities` to inform combat behavior
- Uses `aftermath_hooks` to generate rewards/consequences

## Testing

To test enrichment:

1. **Generate a custom statblock** in Statblock Generator
2. **Check console logs**:
   ```
   [ENRICHMENT] Generating intelligence for Headless Horseman...
   [ENRICHMENT] Generated intelligence for Headless Horseman: {...}
   [ENRICHMENT] Saved intelligence for Headless Horseman to localStorage
   ```
3. **Use the creature in Encounter Generator**
4. **Check console logs**:
   ```
   [CREATURE INTELLIGENCE] Using enriched data for Headless Horseman from localStorage
   ```
5. **Verify encounter output** uses custom creature's personality

## Limitations

- **Name-based lookup**: Creature name must match exactly between statblock and encounter
- **localStorage dependency**: Clearing browser data removes enrichment
- **No versioning**: Editing a statblock re-enriches completely (doesn't preserve manual edits to intelligence)
- **Single model**: Currently uses GPT-4o-mini (could expose model selection)

## Future Enhancements

- Manual enrichment editing UI
- Enrichment versioning and history
- Batch enrichment for existing statblocks
- Export enrichment data with statblock
- Import enrichment data separately
- Enrichment quality feedback/rating system
