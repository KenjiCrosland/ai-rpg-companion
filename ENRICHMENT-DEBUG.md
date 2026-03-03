# Custom Statblock Enrichment - Debug Request

## Problem Statement

Custom statblocks should automatically generate creature intelligence data when used in encounters (lazy enrichment), but the enrichment is failing. The system needs to:

1. Detect when a custom statblock has no intelligence data
2. Generate intelligence data via AI call
3. Cache the result in localStorage
4. Use the intelligence data for encounter generation

Currently, lazy enrichment is triggering but the encounter generator is not receiving/using the enriched data properly.

## Custom Statblock Format

Custom statblocks from the Statblock Generator have this structure:

```json
{
    "name": "Headless Horseman",
    "type_and_alignment": "Large undead, neutral evil",
    "armor_class": "16 (natural armor)",
    "hit_points": "135 (18d10 + 36)",
    "speed": "60 ft.",
    "attributes": "STR 18 (+4), DEX 16 (+3), CON 15 (+2), INT 3 (-4), WIS 10 (+0), CHA 16 (+3)",
    "saving_throws": "DEX +7, CHA +7",
    "skills": "Intimidation +7, Stealth +7",
    "damage_resistances": "Necrotic",
    "damage_immunities": "None",
    "condition_immunities": "Frightened, Paralyzed",
    "senses": "Darkvision 60 ft., passive Perception 10",
    "languages": "Understands Common but cannot speak",
    "challenge_rating": "10 (5,900 XP)",
    "proficiency_bonus": "+4",
    "abilities": [
        {
            "name": "Terrifying Presence",
            "description": "Creatures within 30 feet..."
        }
    ],
    "actions": [
        {
            "name": "Multiattack",
            "description": "The Headless Horseman makes two attacks..."
        }
    ],
    "monsterDescription": "",
    "monsterType": "Random",
    "selectedChallengeRating": "10",
    "monsterName": "Headless Horseman",
    "caster": false
}
```

Note: This is DIFFERENT from SRD monster format which has uppercase ability scores (STR, DEX) and different field structures.

## Expected Intelligence Output Format

The enrichment should produce this structure:

```json
{
  "name": "Headless Horseman",
  "description": "A towering headless figure in tattered black armor...",
  "signature": "Terrifying Presence frightens everything within 30 feet...",
  "abilities": [
    "Terrifying Presence: 30-foot aura, DC 15 WIS or frightened...",
    "Scythe Slash: +10, reach 10 ft, 6d10+5 slashing..."
  ],
  "tactical_identity": "Fear engine that punishes clustering...",
  "encounter_hooks": [
    "Terrifying Presence means the fight gets harder the closer you are...",
    "the paralysis combo from Spectral Wail can end a character..."
  ],
  "preferred_tones": ["quiet_tension", "already_in_motion", "something_wrong"],
  "retreat": null,
  "social": null,
  "aftermath_hooks": [
    "the horseman's armor bears a crest from a military order...",
    "the scythe continues to hum faintly after the horseman falls..."
  ]
}
```

## Data Flow

1. **User adds custom statblock to encounter** (MonsterPicker → "My Statblocks" tab)
2. **Encounter generation starts** → `generateEncounter()` in EncounterGenerator.vue
3. **`getCreatureIntelligence()` called** (encounter-prompt.mjs:28-76)
   - Checks localStorage for `creature-intel:${creatureName}`
   - Falls back to creature-intelligence.json (SRD creatures)
   - **Triggers lazy enrichment** if no data found AND creature is custom
4. **Lazy enrichment** calls `enrichCustomStatblock()` (statblock-enrichment.mjs)
   - Formats statblock as text
   - Sends to AI
   - Validates response
   - Saves to localStorage
5. **Intelligence data used** in encounter generation (Calls 1, 2, 3)

## Current Console Output

```
[CREATURE INTELLIGENCE] No data found for Headless Horseman, triggering lazy enrichment...
[ENRICHMENT] Generating intelligence for Headless Horseman...
[ENRICHMENT] Generated intelligence for Headless Horseman: {...}
[ENRICHMENT] Saved intelligence for Headless Horseman to localStorage
[CREATURE INTELLIGENCE] Lazy enrichment complete for Headless Horseman

=== CREATURE INTELLIGENCE ===
{}  ← PROBLEM: Empty object instead of enriched data

=== MINIMAL BRIEF (Calls 1+2) ===
- 1× Headless Horseman (creature, CR 10)
  ← Missing description/retreat/social

=== TACTICAL BRIEF (Call 3) ===
- 1× Headless Horseman (creature, CR 10)
  STR undefined DEX undefined INT undefined WIS undefined | Abilities: none
  ← Missing stats and abilities
```

## What's Wrong

1. **Enrichment runs but data isn't used**: The `getCreatureIntelligence()` function returns an empty object `{}` even after successful enrichment
2. **Stats are undefined**: The encounter-enrichment.mjs can't find ability scores (STR, DEX, etc.)
3. **No description/abilities**: The minimal/tactical briefs are missing intelligence data

## Questions to Debug

1. Is the enrichment result being added to the `result` object correctly in `getCreatureIntelligence()`?
2. Is the localStorage key matching between save and load?
3. Is the monster adapter properly normalizing custom statblock fields for encounter-enrichment.mjs?
4. Are ability scores being extracted from the `attributes` string correctly?

## Files to Review

Please review these files to diagnose the issue:

1. **src/prompts/encounter-prompt.mjs** (lines 28-76)
   - `getCreatureIntelligence()` function - async enrichment logic
   - Check if enrichment result is being returned in the `result` object

2. **src/util/statblock-enrichment.mjs** (entire file)
   - `enrichCustomStatblock()` - main enrichment function
   - `formatStatblockAsText()` - converts statblock to prompt text
   - `saveEnrichment()` / `loadEnrichment()` - localStorage operations

3. **src/tools/encounter-generator/util/monster-adapter.mjs** (lines 36-108)
   - `normalizeCustomMonster()` - normalizes custom statblocks
   - `parseAttributes()` - extracts ability scores from "STR 18 (+4)..." string
   - Check if normalized fields match what encounter-enrichment expects

4. **src/util/encounter-enrichment.mjs** (lines 1-158)
   - `buildCreatureAbilitySummary()` - builds tactical summary
   - Check what fields it expects (STR, DEX, Speed, Actions, Traits, etc.)
   - Verify custom statblock normalization provides these fields

## Expected Fix

The enrichment system should:
- ✅ Detect custom creatures correctly
- ✅ Generate intelligence data via AI
- ✅ Save to localStorage with correct key
- ✅ Load from localStorage when needed
- ✅ Return enriched data in `getCreatureIntelligence()` result
- ✅ Provide normalized fields for encounter-enrichment.mjs
- ✅ Include intelligence data in minimal/tactical briefs

## Test Case

Use the Headless Horseman statblock shown above:
1. Add to encounter via "My Statblocks" tab
2. Generate encounter
3. Check console for enrichment logs
4. Verify CREATURE INTELLIGENCE object is NOT empty
5. Verify MINIMAL BRIEF includes description
6. Verify TACTICAL BRIEF includes stats and abilities
