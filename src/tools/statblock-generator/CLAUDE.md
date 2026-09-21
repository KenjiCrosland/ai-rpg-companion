# Statblock Generator

Tool-specific documentation for the D&D 5e Monster Statblock Generator.

## Overview

The Statblock Generator creates complete D&D 5e monster statblocks using a two-part AI generation process. It supports both free and premium versions, with the premium version offering additional customization options.

## Architecture

**Both editions are engine-first** behind a 2024/2014 rules toggle (default
2024, persisted to `localStorage['statblock-format']`; a loaded monster's own
`format` field decides which display renders). The contract is
[docs/2024-architecture.md](/docs/2024-architecture.md); read it before
touching anything under `chassis/` or `format-2024/`.

- **Shared engine**: CR + archetype → deterministic numbers
  (`chassis/chassis.mjs`), slot plan (`chassis/slot-plan.mjs`), slot-filling
  prompt with numeric skeletons, assembly that stamps engine numbers over the
  LLM's flavor, edition-aware lint with a correct/reject loop
  (`format-2024/lint.mjs`). The LLM never decides numbers — including the
  stat-coherence derivations (2026-07-20): attack bonus = striker-stat mod
  + PB (raise-only stamp, caster-aware via `attackStatFor`), attack damage
  flat bonus = striker mod, save damage pure dice, HP formula bonus =
  dice × CON mod. One Combat role
  select for both editions: Auto (micro resolve call when a concept exists,
  random pick when blank), Balanced, or one of 8 roles.
- **2024 edition**: sections-based model, markdown render
  (`format-2024/render.mjs`), display via `@/components/Statblock2024.vue`
  with inline editing (engine band hints on numeric edits — advisory, never
  blocking — per-entry AI re-rolls through `rerollEntry`, and whole-section
  re-rolls through `rerollSection`). Both cards share the same edit chrome
  and the same **in-place** editing convention (owner call): ✏️ Edit in the
  footer bar, 💾 Save changes / ↩️ Cancel while editing, and fields swap to
  inputs where they live in the card layout — name in the header, scores
  inside the ability grid (MOD/SAVE recompute live), detail lines in place,
  per-entry name + Re-roll + ✕ bar above the description textarea. No
  separate form-style edit body on either card. **Entry re-roll REPLACES
  the ability** (new name, new idea — same-name responses are retried);
  names survive only when load-bearing (referenced by another entry, or
  Multiattack/Spellcasting), where a model rename is deterministically
  stamped back instead of retried.
- **Edition switching (cache-and-swap)**: `ParTabToggle` tabs on the card's
  top edge (`data-testid="edition-switch"`) flip the selected monster
  between its 2014/2024 printings — burgundy document tabs, not lapis
  chrome (view-mode switch on a content surface). The saved monster IS the active edition; the
  converted counterpart caches on it as `monster.other_edition` — flipping
  swaps active↔cached and persists (instant, lossless, no call). Flipping
  toward a not-yet-converted edition shows the target card as a blurred
  deterministic shape preview (`toLegacyModel`/`fromLegacyModel`) under a
  one-time Convert button (metered as one generation through
  `canGenerateStatblock` — no premium gate; free tier spends one of the
  daily five) that runs `convertEdition()`
  (`format-2024/generate.mjs`): ONE LLM call rewrites entry texts into the
  target phrasing, gated by the phrasing-only lint subset
  (`CONVERSION_LINT_RULES`); numbers are never rebalanced. Any
  edit/re-roll/regenerate of the active edition deletes `other_edition`
  (never sync edits across editions). The form's rules-version control is
  the same `ParSwitch` (`data-testid="rules-switch"`).
- **2014 edition**: same pipeline with 2014 phrasing rules/skeletons/exemplar,
  then `toLegacyModel()` converts to the classic model shape — so the
  existing `Statblock.vue` display (including inline editing), all three
  exports, the encounter adapter, and enrichment work unchanged.
- **Legacy two-part pipeline** (template-driven, pre-engine): reachable only
  via `localStorage['statblock-legacy-2014'] = '1'` — kept as a fallback
  until the engine 2014 path is production-verified; removal is a future
  decision. `StatblockGenerator.spec.js` and the statblock e2e specs seed the
  flag and cover it. Old saved monsters' Build values map onto archetypes for
  regeneration (`BUILD_TO_ARCHETYPE`).

### Component Structure

```
src/tools/statblock-generator/
├── StatblockGenerator.vue          # Main component (both paths)
├── StatblockGenerator.spec.js      # 2014 flow suite
├── chassis/                        # Edition-agnostic math engine
│   ├── chassis.mjs                 # chassisFor / pbFor / applyArchetype
│   └── slot-plan.mjs               # tierFor / slotPlanFor
├── format-2024/                    # 2024-specific layers
│   ├── generate.mjs                # prompt builder, assembly, corrections, orchestration
│   ├── render.mjs                  # 2024 markdown renderer
│   └── lint.mjs                    # spec lint_rules + plan-structure checks
├── __tests__/                      # engine + 2024 flow suites (~300 tests)
└── components/
    └── StatblockExports.vue        # Exports (2024 blocks: markdown only for now)
```

### Two-Part Generation Process

The generator uses a unique two-part generation approach to create detailed, coherent monsters:

**Part 1**: Basic statblock structure
- Name, type, size, alignment
- Armor Class, Hit Points, Speed
- Ability scores
- Saving throws, skills, senses
- Challenge Rating (preliminary)

**Part 2**: Advanced features (uses Part 1 as context)
- Traits and special abilities
- Actions (standard, bonus, reactions)
- Legendary actions (if applicable)
- Lair actions (if applicable)

This approach ensures consistency between basic stats and advanced features.

### Generation Flow

1. User fills form (name, type, CR, description, spellcaster flag)
2. `canGenerateStatblock()` validates incognito mode hasn't cleared required data
3. `createStatblockPrompts()` generates two prompts (part1, part2)
4. First API call with part1 prompt → basic statblock JSON
5. Parse and store basic statblock
6. Second API call with part2 prompt + previousContext → advanced features JSON
7. Merge both parts into final monster
8. Calculate accurate CR using `calculateCR()`
9. Save to localStorage organized by folder
10. Sort monsters by CR within each folder

### CR Calculation Integration

After AI generation, the statblock is passed through `calculateCR()` from `@/util/calculateCR.js`:
- Analyzes defensive CR (HP, AC, resistances, immunities)
- Analyzes offensive CR (attack bonus, damage per round, save DCs)
- Adjusts for special features and bonuses
- Returns accurate CR that may differ from AI's initial estimate

See `/src/util/calculateCR.js` for the full DMG-compliant algorithm.

## Key Features

### Form Inputs

- **Monster Name** (optional): Leave blank for AI to generate
- **Monster Type**: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, Undead
- **Challenge Rating**: 0, 1/8, 1/4, 1/2, 1-30
- **Spellcaster**: Checkbox to indicate if creature should have spellcasting
- **Description** (optional): Additional context for the AI

### Export Formats

Three export formats supported via `StatblockExports.vue`:

1. **Homebrewery/GMBinder Markdown**
   - Uses `statblockToMarkdown()` from `@/util/convertToMarkdown.mjs`
   - Formats for Natural Crit's Homebrewery renderer
   - Includes special markdown formatting for stat blocks

2. **Foundry VTT JSON**
   - Uses `convertToFoundryVTT()` from `@/util/convertToFoundryVTT.mjs`
   - Compatible with 5e Statblock Importer module
   - Includes all creature data in Foundry's schema

3. **Improved Initiative JSON**
   - Uses `convertToImprovedInitiative()` from `@/util/convertToImprovedInitiative.mjs`
   - Compatible with Improved Initiative web app
   - Streamlined format for encounter management

### Roll20 Integration

The tool mentions the **Conjure Creature Chrome Extension** which allows direct export to Roll20 character sheets. This is a third-party extension that syncs with the generator's localStorage.

## Data Storage

### localStorage Structure

Monsters are organized by folder with the following structure:

```javascript
{
  "Undead": [
    {
      name: "Ancient Lich",
      challenge_rating: "21",
      // ... full statblock data
    }
  ],
  "Dragons": [
    { /* monster data */ }
  ],
  "Uncategorized": [
    { /* monster data */ }
  ]
}
```

### Folder Management

- New monsters default to "Uncategorized" folder
- Users can create custom folders via DataManagerModal
- Monsters sorted by CR within each folder (ascending)
- Sidebar shows accordion of folders with monster lists

## Test Coverage

`StatblockGenerator.spec.js` includes 11 tests covering:

### Prompt Creation (3 tests)
- Correct options passed to `createStatblockPrompts()`
- Monster description included when provided
- Spellcaster flag set when checkbox checked

### API Call Verification (3 tests)
- Two sequential API calls made for two-part generation
- Part1 prompt passed to first API call
- Part2 prompt + previousContext passed to second API call

### localStorage Operations (5 tests)
- Generated monster saved to localStorage
- Monster structure preserved when saving
- Monsters loaded from localStorage on mount
- Empty localStorage handled gracefully
- Monsters organized by folder

## Known Patterns

### Shared Components Used

- `GeneratorLayout.vue` - Provides sidebar/main content layout
- `Statblock.vue` - Renders the formatted statblock display
- `DataManagerModal.vue` - Import/export/folder management

### Prompt Location

Monster prompts defined in `@/prompts/monster-prompts.mjs`:
- `createStatblockPrompts(options)` - Returns {part1, part2} prompts

### Validation

`canGenerateStatblock()` from `@/util/can-generate-statblock.mjs` checks:
- Not in incognito mode (localStorage won't persist)
- Required game data is available
- Returns boolean + shows error toast if validation fails

## Premium Features

Premium version (controlled by `premium` prop) may include:
- Additional customization options
- Access to more CR ranges
- Enhanced export features

(Check component code for current premium features)

## Related Files

- `/src/util/calculateCR.js` - CR calculation algorithm
- `/src/data/challengeRatings.json` - CR lookup tables
- `/src/data/creatureTemplates.json` - Template stats by CR
- `/src/util/determine-features-and-bonuses.mjs` - Feature analysis for CR
- `/src/prompts/monster-prompts.mjs` - AI prompt generation
