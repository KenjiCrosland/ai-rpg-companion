# SRD Monsters JSON Format

The `srd-monsters.json` file should contain an array of monster objects in the following format:

```json
[
  {
    "name": "Aboleth",
    "cr": "10",
    "size": "Large",
    "type": "Aberration",
    "alignment": "Lawful Evil",
    "description": "An aboleth is a fishlike amphibian monster",
    "isSpellcaster": false,
    "statblock": null
  },
  {
    "name": "Acolyte",
    "cr": "1/4",
    "size": "Medium",
    "type": "Humanoid",
    "alignment": "Any alignment",
    "description": "Acolytes are junior members of a clergy",
    "isSpellcaster": true,
    "statblock": {
      "name": "Acolyte",
      "challenge_rating": "1/4 (50 XP)",
      "armor_class": "10",
      "hit_points": "9 (2d8)",
      "speed": "30 ft.",
      "attributes": "STR 10 (+0), DEX 10 (+0), CON 10 (+0), INT 10 (+0), WIS 14 (+2), CHA 11 (+0)",
      "skills": "Medicine +4, Religion +2",
      "senses": "passive Perception 12",
      "languages": "Any one language (usually Common)",
      "abilities": [],
      "actions": []
    }
  }
]
```

## Required Fields
- **name**: Monster name
- **cr**: Challenge rating as string (e.g., "5", "1/2", "1/4")

## Optional Fields
- **size**: Tiny, Small, Medium, Large, Huge, Gargantuan
- **type**: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, Undead
- **alignment**: e.g., "Lawful Evil", "Neutral", "Chaotic Good", etc.
- **description**: Brief description for encounter narrative generation
- **isSpellcaster**: Boolean indicating if creature casts spells
- **statblock**: Full statblock object (same format as Statblock Generator output), or null if not available

## Notes
- If `statblock` is null, users can generate one via the Statblock Generator
- The `description` field is used by the encounter narrative generator
- Monsters are automatically normalized by `monster-adapter.mjs`
