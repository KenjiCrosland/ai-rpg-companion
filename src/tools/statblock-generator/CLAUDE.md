# Statblock Generator

Tool-specific documentation for the D&D 5e Monster Statblock Generator.

## Overview

The Statblock Generator creates complete D&D 5e monster statblocks using a two-part AI generation process. It supports both free and premium versions, with the premium version offering additional customization options.

## Evidence: commit every round's sheets, and keep only the latest

A standing order from the owner (2026-11-15). The reviewer can only read what is pushed.

**Commit every sheet a round generates, in one blocks file in `scripts/smoke-evidence/`.**
All of them — the ones that failed, the odd ones, the ones that turned out not to be
evidence. Mark each as it is: green, flagged, no evidence, or threw with its error. Never
hold sheets back waiting for a review.

**`scripts/smoke-evidence/` holds only five kinds of file:**

1. the latest round's blocks file
2. milestones
3. reference data and tool outputs (everything that is not markdown)
4. handoff reports
5. anything a file outside the folder names

**When a new blocks file lands, delete the previous round's** unless it is a milestone. Git
history keeps it.

**A milestone is named, never assumed.** The owner or the reviewer names it in a handoff — a
release forty run as a gate, a sheet the owner judged good, sheets a parked item still rests
on.

**Deletions go in their own commit**, separate from code, so a code review is not buried
under them.

**Before deleting a file, check nothing names it:**

```bash
git grep <filename> -- ':!scripts/smoke-evidence'
```

Check the **stem without its extension** too. A plan that writes
`critic-files.mjs … REVIEW-sweep-2026-10-21T22-17-49` names a file an extension-matching grep
misses — that exact case was caught on the 2026-11-15 cleanup by a second pass on stems. If
anything names it, keep it or change what names it.

**`reskin/__tests__/fixtures/runs/` is not evidence and is never part of a cleanup.** Tests
read it, and seven of its eight run folders are named in spec files.

## Architecture

**The current engine is the reskin pipeline.** Read [docs/reskin-architecture.md](/docs/reskin-architecture.md) first (as of 2026-10-01); the July handoff linked below is history.

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
  select for both editions: Auto, Balanced (aliases Auto), or one of the
  roles.
- **Resolve is TWO calls** (2026-09-21, `reskin/route.mjs`): the ROUTE call
  shows the model the donor shelf (~22 lines, one blurb + print exemplars
  each) and asks for up to three picks, each with a phrase QUOTED from the
  input; `chooseLine` verifies every quote against the input and falls to
  the next pick on a veto (living juggernaut/warden, quote not found, user
  role mismatch). Its output is exactly `generateReskin`'s interface
  (archetype, style, body, mechanics, resolvedType). The IDENTITY call
  (`buildIdentityPrompt`) then writes the prose conditioned on the routed
  line. Blank rolls run SYNTHESIS first, then ROUTE on the fused creature.
  There are no label-translation belts in the Vue any more; the shelf has
  no unserved styles. Ad hoc tools: `scripts/smoke-replay-resolve.mjs`
  replays only the route call; `scripts/smoke-statblock.mjs` captures the
  `[route]` trace line.
- **The signature is TEMPLATE-fitted** (2026-09-21, `reskin/templates.mjs`;
  owner: "create, tag, try to fit, ship the fit or the seed, log the
  miss"). Rules text is never free. IDEA call: the ability in plain words
  plus a tag (section/trigger/effect), no templates shown. FIT call: the
  idea plus the templates legal for the line, CR, movement and section
  (minus what the sheet owns, minus a second nova); pick one or `none`,
  quote the idea words it carries, name it, fill the FLAVOR slots. The
  engine fills numbers and closed-vocabulary slots, renders the frame,
  and refuses a half-filled row. A miss traces as `signature miss:` with
  the idea and tag — that log IS the template backlog, authored from
  print (`shapes.mjs` frames + `library.mjs` seeds are the catalog). The
  library seed stands in on a miss; no vet, no repair. A rider fit rides
  the host row and IS the signature (no seed beside it); the whole shelf
  (all sections, all triggers) is in the race before the "no verb" gate
  and the strongest concept match wins; a menu holds only rows the sheet
  can render; a blind seed is dealt only where `BLIND_ROLES` says its
  fiction is any-body. The COOKBOOK INDEX
  (`reskin/corpus-tags.mjs` → `node scripts/tag-corpus.mjs` →
  `scripts/corpus-shapes.json`) tags every print ability in the same
  grammar so `scripts/smoke-misses.mjs` cites print rows under each
  miss tag. The free-text wildcard, its vet chain, and its repair loop were retired
  2026-09-22 (goldens 19/19 on the template path); rules text has one
  source, the catalog.
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
  **The re-roll is CATALOG-FIRST** (step 9b, 2026-10-13): one call, two
  possible answers — a template id from the shelf `templatesFor` allows for
  this saved sheet (the engine renders print's frame, fills every number from
  the sheet, stamps `monster.inline`, prices the row with `valueCheck`, and
  records `template`/`boundKeys` on it), or `"template": "none"` plus the
  text, which still goes through the pseudo-block lint and one retry. The
  call sees the whole creature: `generation.userConcept`, the header, the
  inline, and every sibling entry's rules text, with the GM's own rows
  marked. Skeletons, lint and catalog all use the SHEET's derived save DC and
  attack bonus (the card's only when the sheet is more than 2 off, i.e.
  hand-edited). Legendary Actions have no shelf and keep the old prompt; the
  whole-section re-roll gets the creature in view but not the catalog.
  Evidence: `scripts/smoke-evidence/REROLL-case-2026-10-13.md`.
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
