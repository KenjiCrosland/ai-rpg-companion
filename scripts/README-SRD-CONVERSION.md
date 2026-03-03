# SRD Monsters Conversion Script

## What it does

Converts raw SRD monster data (any JSON structure) into the format expected by the Encounter Generator:

```json
[
  {
    "name": "Aboleth",
    "cr": "10",
    "size": "Large",
    "type": "Aberration",
    "alignment": "Lawful Evil",
    "description": "A large aberration",
    "isSpellcaster": true,
    "statblock": null
  }
]
```

## Usage

### Step 1: Add your raw SRD file

Put your original SRD JSON file at:
```
src/data/srd-monsters-raw.json
```

Or specify a custom path when running the script.

### Step 2: Run the conversion

```bash
# Use defaults (reads srd-monsters-raw.json, writes to srd-monsters.json)
node scripts/convert-srd-monsters.mjs

# Or specify custom paths
node scripts/convert-srd-monsters.mjs path/to/input.json path/to/output.json
```

### Step 3: Check the output

The script will:
- ✅ Find all monster entries (using smart heuristics)
- ✅ Extract name, CR, size, type, alignment
- ✅ Generate descriptions
- ✅ Detect spellcasters
- ✅ Sort by CR and name
- ✅ Show you a sample of converted monsters

## How it works

The script uses **heuristics** to find monsters in any JSON structure:

1. **Recursively searches** the entire JSON tree
2. **Detects monsters** by looking for common fields:
   - Must have: `name` or `Name`
   - Plus one of: `CR`, `Challenge Rating`, `STR`, `Strength`
3. **Extracts fields** case-insensitively:
   - Tries `cr`, `CR`, `challenge_rating`, `Challenge Rating`
   - Handles formats like `"5 (1,800 XP)"` → `"5"`
4. **Normalizes data** to our expected format
5. **Sorts** by CR (fractional CRs handled correctly)

## Expected Input Formats

The script handles various formats:

### Format 1: Array of monsters
```json
[
  { "name": "Goblin", "cr": "1/4", ... },
  { "name": "Dragon", "cr": "20", ... }
]
```

### Format 2: Nested object
```json
{
  "Monsters": {
    "Goblin": { "cr": "1/4", ... },
    "Dragon": { "cr": "20", ... }
  }
}
```

### Format 3: Deep nesting (will find them!)
```json
{
  "SRD": {
    "Monsters": {
      "ByType": {
        "Aberrations": [
          { "name": "Aboleth", "cr": "10", ... }
        ]
      }
    }
  }
}
```

## Troubleshooting

### "No monsters found"

Check if your JSON has these fields (case-insensitive):
- `name` (required)
- `cr` or `challenge_rating` (helps identification)
- `STR` or `Strength` (helps identification)

### "Failed to parse"

Ensure your JSON is valid:
```bash
# Test if JSON is valid
node -e "JSON.parse(require('fs').readFileSync('src/data/srd-monsters-raw.json'))"
```

### Need to customize the script?

Edit `scripts/convert-srd-monsters.mjs`:
- Modify `isMonsterEntry()` to change monster detection logic
- Modify `normalizeMonster()` to extract different fields
- Add more field mappings in `findField()`

## What about full statblocks?

The converter sets `statblock: null` for all monsters. Converting full statblocks is complex because:
- Different sources have different formats
- Statblock Generator expects a specific schema
- Abilities, actions, and traits need careful parsing

**Recommended approach:**
1. Use this script to get the monster list working
2. Users can generate full statblocks in the Encounter Generator as needed
3. Later: Write a separate script for statblock conversion if needed

## Sample Output

```
📖 Reading SRD monsters from: src/data/srd-monsters-raw.json
🔍 Analyzing structure...
📊 Found 320 potential monster entries
✅ Successfully converted 318 monsters
💾 Writing to: src/data/srd-monsters.json
✨ Conversion complete!

Sample monsters:
  - Commoner (CR 0)
  - Rat (CR 0)
  - Goblin (CR 1/4)
  - Orc (CR 1/2)
  - Ogre (CR 2)

📁 Monster file ready at: src/data/srd-monsters.json
```
