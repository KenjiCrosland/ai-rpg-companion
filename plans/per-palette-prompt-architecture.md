# Per-Palette Prompt Architecture (Yoruba First) — Shared Cultural-Pool Infrastructure

## Trigger

Pick this up when:
- Production feedback surfaces fresh real-orisha-as-fictional-deity failures (Olódùmarè, Ajagun, Apu Killa, etc.) for the Yoruba palette, OR
- Work begins on a per-palette pool for any obscure register (Diné, Maori, Hindu/Sanskrit, Arabic-Islamic, etc.) — this brief lays the architecture all of them will share, OR
- Work begins on adopting cultural-pool protection in any non-item generator (NPC, location, encounter, setting, bookshelf, lore/timeline) — this brief locates the pools at the shared layer specifically so those generators can adopt without rebuilding, OR
- The item generator's monolithic prompt becomes a refactor obstacle for unrelated work.

This brief assumes the orc/goblin pool-only architecture (70/30 weighting, allow-list selection in `select-language-palette.mjs`) is shipped and stable. If a stale-build issue resurfaces, address that diagnostic first.

## Strategic Framing — Shared Infrastructure, Not Item-Generator Improvement

An earlier draft of this plan scoped pools and prompt modules as item-generator-specific. Production data (Pachakutiq used as fictional demon-flesh-forging emperor in the Mank'aku output, plus the broader pattern across testing) shifted the read on the architecture's value: this isn't an item-generator improvement. It's foundational cultural-engagement infrastructure that every generator producing cultural-coded content will eventually need.

Generators that benefit from shared cultural pools:
- Item generator (immediate, in this brief)
- NPC generator (highest cultural-engagement surface area; likely next adoption)
- Location generator (settlement names, founder names, place-deity references)
- Encounter generator (named NPCs in encounters)
- Setting generator (peoples, regions, religions of cultural-coded settings)
- Bookshelf generator (author names, titles)
- Lore/timeline generator (historical figures, kingdoms, dynasties)

The pool construction work is a one-time investment per palette. Each downstream generator that adopts the shared resource gets cultural-engagement protection without rebuilding pools. Cost-benefit: same 7-10 hours as the item-generator-only framing, but the work now ships infrastructure usable across the suite.

Pools therefore live at `src/data/cultural-pools/` (generator-agnostic data). Item-generator-specific composition stays in the item-generator directory and imports from the shared path.

## Problem

The item generator currently builds one large prompt for every generation in `ItemGenerator.vue` (the brief originally said `MagicItemGenerator.vue` — that file does not exist; the actual file is `src/tools/item-generator/ItemGenerator.vue`). Cultural-engagement rules (universal-invent, translation, unconventional-pairing) are abstract instructions that DeepSeek follows imperfectly for unfamiliar registers — Yoruba, Diné, Maori, etc. Production failures (Olódùmarè used as fictional sky-father, Ajagun as fictional war-spirit, Apu Killa as deity figure) are the visible result.

DeepSeek's training data on Yoruba is shallow; when it reaches for a Yoruba name component, it pulls the most-frequent terms in its training (which are the major orishas and supreme deity). The cognitive task "invent culturally-appropriate Yoruba names without using real ones" is beyond reliable compliance. The cognitive task "select a name from this list" is reliably compliant.

## Recommended Approach

Route to palette-specific prompt builders for obscure registers. Each palette-specific prompt provides DeepSeek with concrete name pools instead of abstract invent-fictional-names rules. Ship the architecture and the first palette-specific module (Yoruba). Other palettes follow the same pattern in subsequent briefs.

### Scope

In scope:
- Create `src/data/cultural-pools/` directory with adoption-pattern README.
- New shared Yoruba data module at `src/data/cultural-pools/yoruba.mjs` (pool data + cultural notes + avoid-list, generator-agnostic).
- Refactor prompt construction out of `ItemGenerator.vue` into prompt modules.
- New item-generator scaffolding module for non-cultural prompt fragments (rarity rules, attunement, item types, mood/material/quirk seeding, JSON output structure).
- New general prompt module for Western-canonical and fictional-fantasy palettes.
- New item-generator Yoruba prompt module that imports the shared resource and composes it into item-generator-specific instructions.
- New routing dispatcher.
- Update tests.

Out of scope:
- Per-palette modules for any palette other than Yoruba. Architecture is built so the next palettes drop in cleanly; their content is later work.
- Adoption of the shared resource by NPC generator, location generator, or any other tool. Those are subsequent briefs once the suite is ready to extend cultural-pool protection.
- Place-name pool curation beyond the initial ~15 entries provided.
- Native-speaker review of the Yoruba pools (handled via production feedback after ship).

### File Structure

```
src/data/cultural-pools/
├── README.md                       NEW — adoption pattern for future generators
└── yoruba.mjs                      NEW — pool data + cultural notes + avoid-list (generator-agnostic)

src/tools/item-generator/utils/
├── prompts/
│   ├── prompt-shared.mjs           NEW — item-generator non-cultural scaffolding
│   ├── prompt-general.mjs          NEW — Western canon + fictional fantasy
│   ├── prompt-yoruba.mjs           NEW — Yoruba composition (imports from src/data/cultural-pools/yoruba.mjs)
│   └── route-prompt.mjs            NEW — dispatcher
├── select-language-palette.mjs     UNCHANGED
├── language-palettes.mjs           UNCHANGED
├── orc-goblin-name-pools.mjs       UNCHANGED
└── ...
```

The pools live at `src/data/cultural-pools/` so any generator (NPC, location, encounter, etc.) can import them without crossing tool boundaries. This matches the existing project convention — `src/data/` already holds shared name pools (`place-names.json`, `place-adjectives.json`, `place-types.json`) and `.mjs` data modules (`tactical-frameworks.mjs`). Cultural pools fit the same pattern: data shared across generators, with `.mjs` chosen over `.json` because the cultural-notes string benefits from multi-line template-literal formatting.

Item-generator-specific composition (the `prompts/` subdirectory) stays inside the item-generator tool. Each future generator that adopts the shared resource will have its own composition layer in its own tool directory.

### Routing Dispatcher

`route-prompt.mjs`:

```javascript
import { buildGeneralPrompt } from './prompt-general.mjs';
import { buildYorubaPrompt } from './prompt-yoruba.mjs';

// Maps palette description prefix → palette-specific builder.
// When a palette description starts with one of these prefixes,
// route to the dedicated builder. Otherwise use general.
//
// As more per-palette modules ship, add entries here. The general
// builder handles all palettes not in this map.
const PALETTE_SPECIFIC_BUILDERS = {
  'Yoruba-inspired': buildYorubaPrompt,
  // Future: 'Diné-inspired', 'Maori-inspired', 'Hindu-inspired', etc.
};

export function routePrompt(seeds) {
  const palette = seeds.selectedPalette || '';
  for (const [prefix, builder] of Object.entries(PALETTE_SPECIFIC_BUILDERS)) {
    if (palette.startsWith(prefix)) {
      return builder(seeds);
    }
  }
  return buildGeneralPrompt(seeds);
}
```

`ItemGenerator.vue` calls `routePrompt(seeds)` instead of building the prompt inline.

### Seeds Object

Both general and palette-specific builders receive the same `seeds` object — everything currently computed in `generateMagicItem()` before prompt construction. Standardizing the shape lets builders share scaffolding cleanly.

```javascript
{
  // User input
  itemName,                  // string, possibly empty
  itemLore,                  // string, possibly empty
  itemOrigin,                // string (dropdown selection) or empty
  rarity,                    // resolved rarity string
  itemType,                  // dropdown selection or empty

  // Resolved values
  resolvedItemType,          // 'Weapon'|'Armor'|null|...
  resolvedOrigin,            // 'Orcish'|'Necromantic'|null|...
  selectedPalette,           // full palette description string
  displayedPalette,          // palette with rotated examples
  fantasyRaceForGen,         // 'Orcish'|'Goblinoid'|null|...
  isOrcGoblinContext,        // boolean
  isUnconventionalPairing,   // boolean
  userExplicitlyChoseOrigin, // boolean

  // Pre-selected creative seeds
  selectedMood,              // mood string
  selectedMaterial,          // material string
  selectedQuirk,             // quirk string
  selectedEra,               // era string
  selectedLoreFraming,       // lore framing string
  selectedExample,           // example feature JSON string
  selectedWondrousForm,      // wondrous item form or null
  selectedWeaponType,        // weapon type or null

  // Mechanical structure
  featuresAndBonuses,        // result of determineFeaturesAndBonuses()
  effectDefsString,          // formatted effect definitions

  // Constants
  rarityGuidelines,          // rarity → guideline string map
  concreteItemTypeOptions,   // valid item types array
}
```

`ItemGenerator.vue` builds this object from existing variables and passes it to `routePrompt()`.

### Shared Module

`prompt-shared.mjs` exports prompt fragments that don't change between palettes. Each fragment is a function returning a string (or empty string when not applicable):

```javascript
export function responseFormatRules() { /* RESPONSE FORMAT, CONCISENESS, MECHANICAL EMPHASIS blocks */ }
export function userInputAuthority(seeds) { /* USER INPUT IS HIGHEST AUTHORITY + name/lore anchor blocks */ }
export function itemTypeEnforcement(seeds) { /* CRITICAL — ITEM TYPE ENFORCEMENT or DETERMINATION block */ }
export function wondrousFormBlock(seeds) { /* WONDROUS ITEM FORM block */ }
export function weaponTypeBlock(seeds) { /* WEAPON TYPE block */ }
export function originInstruction(seeds) { /* origin definitions + instruction */ }
export function originDrivesLoreContent(seeds) { /* ORIGIN DRIVES LORE CONTENT (when not unconventional) */ }
export function unconventionalPairing(seeds) { /* UNCONVENTIONAL PAIRING translate-don't-mashup block */ }
export function explicitOriginIdentification(seeds) { /* EXPLICIT ORIGIN IDENTIFICATION block */ }
export function moodToneBlock(seeds) { /* MOOD & TONE block */ }
export function materialBlock(seeds) { /* MAGICAL MATERIAL block */ }
export function quirkBlock(seeds) { /* ITEM QUIRK block */ }
export function historicalContextBlock(seeds) { /* HISTORICAL CONTEXT block */ }
export function loreStyleBlock(seeds) { /* LORE STYLE block */ }
export function loreNamedIndividualBlock() { /* LORE MUST INCLUDE A NAMED INDIVIDUAL block */ }
export function coherenceCreativityBlock(seeds) { /* COHERENCE + CREATIVITY blocks */ }
export function consumableRules(seeds) { /* SPECIAL RULES FOR POTIONS/SCROLLS */ }
export function effectAndRarityRules(seeds) { /* EFFECT DEFINITIONS, RARITY POWER SCALING, TRIVIAL DRAWBACKS, MECHANICAL VARIETY */ }
export function artifactRequirements(seeds) { /* ARTIFACT REQUIREMENTS block (when rarity is Artifact) */ }
export function jsonOutputStructure(seeds) { /* ITEM STRUCTURE TO COMPLETE block */ }
export function instructions(seeds) { /* INSTRUCTIONS block */ }
export function exampleBlock(seeds) { /* EXAMPLE of correct features format */ }
```

Migration approach: pull each existing prompt section out of `ItemGenerator.vue` verbatim into the corresponding shared function. The function signature accepts `seeds` and references `seeds.x` instead of the local variables. Logic doesn't change; only location does.

**Important — the in-world language framing directive (shipped 2026-05-06) lives inside the translation block and applies to ALL palettes.** When extracting `namingTranslationGeneral` and writing the Yoruba translation block, both must enforce the in-world-term rule:

- "the elven tongue," "the old dwarven tongue" for fantasy-race origins
- constructed in-world descriptors ("the speech of the river-folk") for cultural-coded items
- NEVER "the Yoruba tongue," "the Old Irish register," etc.

The Yoruba module's `yorubaItemNamingTranslation` function must follow this rule — examples in the function should use phrasing like "called Ọpá Ìlàrọ̀ by the makers of [Place from pool]" or "in the tongue of its makers" rather than "in the Yoruba tongue."

### General Prompt Module

`prompt-general.mjs` composes the shared fragments with the universal cultural-engagement rules currently in the prompt:

```javascript
import * as shared from './prompt-shared.mjs';

export function buildGeneralPrompt(seeds) {
  return [
    `You are a D&D 5e item designer. Be concise and table-ready.`,
    shared.responseFormatRules(),
    shared.userInputAuthority(seeds),
    `Generate a detailed Dungeons & Dragons 5e magic item description...`,
    `IMPORTANT D&D 5e DESIGN RULES: ...`,
    `ATTUNEMENT (D&D 5e rule...)`,
    shared.itemTypeEnforcement(seeds),
    shared.wondrousFormBlock(seeds),
    shared.weaponTypeBlock(seeds),
    shared.originInstruction(seeds),
    shared.originDrivesLoreContent(seeds),
    shared.unconventionalPairing(seeds),
    shared.explicitOriginIdentification(seeds),
    namingStyleGeneral(seeds),                       // see below
    namingTranslationGeneral(seeds),                 // see below
    universalInventRule(seeds),                      // see below
    languagePaletteOverride(seeds),                  // see below
    orcGoblinRestriction(seeds),                     // see below — only fires when isOrcGoblinContext
    originPaletteIndependence(seeds),
    shared.moodToneBlock(seeds),
    shared.materialBlock(seeds),
    shared.quirkBlock(seeds),
    shared.historicalContextBlock(seeds),
    shared.loreStyleBlock(seeds),
    shared.loreNamedIndividualBlock(),
    shared.coherenceCreativityBlock(seeds),
    shared.consumableRules(seeds),
    shared.effectAndRarityRules(seeds),
    shared.artifactRequirements(seeds),
    shared.jsonOutputStructure(seeds),
    shared.instructions(seeds),
    shared.exampleBlock(seeds),
  ].filter(Boolean).join('\n\n');
}
```

The five `*General` functions (`namingStyleGeneral`, `namingTranslationGeneral`, `universalInventRule`, `languagePaletteOverride`, `orcGoblinRestriction`) are the cultural-engagement rules currently in `ItemGenerator.vue`'s template literal. They live in `prompt-general.mjs` because palette-specific modules replace them with concrete pools.

### Yoruba Prompt Module (Item Generator Composition Layer)

`prompt-yoruba.mjs` replaces the five general cultural-engagement functions with Yoruba-specific content. Everything else is the same shared scaffolding. The cultural data is imported from the shared cultural-pools module — this file's job is to compose that data into item-generator-specific instructions.

```javascript
import * as shared from './prompt-shared.mjs';
import {
  yorubaPersonalNames,
  yorubaDeityNames,
  yorubaPlaceNames,
  yorubaCulturalNotes,
  yorubaAvoidList,
} from '@/data/cultural-pools/yoruba.mjs';

export function buildYorubaPrompt(seeds) {
  return [
    `You are a D&D 5e item designer. Be concise and table-ready.`,
    shared.responseFormatRules(),
    shared.userInputAuthority(seeds),
    `Generate a detailed Dungeons & Dragons 5e magic item description...`,
    `IMPORTANT D&D 5e DESIGN RULES: ...`,
    `ATTUNEMENT (D&D 5e rule...)`,
    shared.itemTypeEnforcement(seeds),
    shared.wondrousFormBlock(seeds),
    shared.weaponTypeBlock(seeds),
    shared.originInstruction(seeds),
    shared.originDrivesLoreContent(seeds),
    shared.unconventionalPairing(seeds),
    shared.explicitOriginIdentification(seeds),
    yorubaCulturalNotesBlock(),                      // see below — thin wrapper
    yorubaNamingFromPools(seeds),                    // see below — item-specific composition
    yorubaItemNamingTranslation(seeds),              // see below — item-generator-specific
    yorubaAvoidListBlock(),                          // see below — thin wrapper
    shared.moodToneBlock(seeds),
    shared.materialBlock(seeds),
    shared.quirkBlock(seeds),
    shared.historicalContextBlock(seeds),
    shared.loreStyleBlock(seeds),
    shared.loreNamedIndividualBlock(),
    shared.coherenceCreativityBlock(seeds),
    shared.consumableRules(seeds),
    shared.effectAndRarityRules(seeds),
    shared.artifactRequirements(seeds),
    shared.jsonOutputStructure(seeds),
    shared.instructions(seeds),
    shared.exampleBlock(seeds),
  ].filter(Boolean).join('\n\n');
}
```

The four cultural functions below are item-generator-specific. Two are thin wrappers around the shared data (cultural notes, avoid-list — generator-agnostic content). Two compose the shared data into instructions specific to item-context use (naming pools used for "this item's lore," item-name translation rule). Other generators will compose differently — an NPC generator will say "for the NPC's own name, family lineage, and birthplace" instead of "for character names in this item's lore."

#### `yorubaCulturalNotesBlock()` (thin wrapper)

Returns the shared `yorubaCulturalNotes` string verbatim. The cultural-context content is generator-agnostic — there's nothing item-specific to add. This wrapper exists only so the composition layer in `prompt-yoruba.mjs` reads consistently with the other section helpers.

```javascript
function yorubaCulturalNotesBlock() {
  return yorubaCulturalNotes;
}
```

The shared `yorubaCulturalNotes` content (defined in `src/data/cultural-pools/yoruba.mjs`):

```
YORUBA CULTURAL CONTEXT:

This generation belongs to a fantasy world where the linguistic and cultural register is Yoruba-inspired. Yoruba is a real West African tradition (primarily Nigeria, Benin, Togo, with substantial diaspora communities in Brazil, Cuba, the US, and the Caribbean) with active contemporary religious practice. Treat this register with the seriousness you would give to writing a fantasy work rooted in any real living tradition.

Yoruba names typically express circumstantial meaning — they describe what was happening at the child's birth, the family's hopes, or the spiritual context. Names parse meaningfully: a name might mean "joy comes to the household" or "the path is open." Common structural patterns are verb-object compounds, agent-prefix + verb, descriptive noun phrases. Tone marks (high ´, low `, mid no-mark) and diacritical vowels (ọ, ẹ) appear throughout. Names are often unisex; gender isn't typically encoded morphologically.

Yoruba material culture uses specific materials and forms. Cowrie shells, palm wood, ironwork, indigo-dyed cloth (adire), beadwork, calabash gourds, and carved hardwood. Sacred trees include iroko, baobab, and silk-cotton (araba). Rivers and forests are treated as living spiritual presences with their own intelligences. Smithing is communal and ritualized rather than solitary. Marketplaces (ọjà) are central social spaces. Crowns (adé) and beaded staffs (ọ̀pá) are objects of authority.

When generating content in this register, lean into these specifics rather than defaulting to generic-fantasy materials and settings.
```

The shared content uses generator-agnostic phrasing ("This generation," "When generating content"). The item-generator wrapper reads it verbatim. NPC generator will read it verbatim too. Subsequent NPC-specific naming-pool composition handles the per-context framing.

#### `yorubaNamingFromPools(seeds)` (item-generator-specific composition)

Lists the pools and instructs DeepSeek how to use them in item-context. The framing references "this item's lore" — NPC generator will compose the same shared pools differently (e.g., "for the NPC's own name, family lineage, and birthplace").

```
NAMES FOR THIS GENERATION — USE ONLY FROM THESE POOLS:

For all character names in this item's lore, pick from this pool of personal names:
${yorubaPersonalNames.join(', ')}

For any deity, spirit, or sacred being mentioned in the lore, pick from this pool of fictional deity/spirit names:
${yorubaDeityNames.join(', ')}

For places (towns, mountains, rivers, forests, ceremonial sites) mentioned in the lore, pick from this pool of place names:
${yorubaPlaceNames.join(', ')}

These pools are the ONLY source for proper nouns in this generation. Do NOT invent additional names. Do NOT use any name not in these pools.

If the user provided lore that contains a proper noun not in these pools, honor the user's name (user input is always the highest authority) but do not generate any additional out-of-pool names.

Pool selection rules:
- Pick names that fit the lore framing and the item's mood. The pools are diverse; not every name fits every story.
- Use 2-4 names total across the lore. Item lore is short — too many names crowd the prose.
- Do NOT alter the spelling, tone marks, or diacriticals of pool names. They are correct as written.
```

#### `yorubaItemNamingTranslation(seeds)` (item-generator-specific)

This block is genuinely item-specific — it covers the item's own name in lore, which only makes sense for items, not NPCs or locations. Other generators will not have an analog.

```
ITEM NAMING:

The item's primary name in the "name" field should be an English translation that captures the item's essence — for example, "Wand of First Light," "Hammer of the Open Path," "Cup of Shared Memory." Use the translation rule for non-English palettes: English title for table usability, original-language name in the lore.

Within the lore, include the original-language Yoruba-style name for the item itself in the first sentence. Construct it from Yoruba word components (Ọpá = staff/wand, Adé = crown, Ìlù = drum, Òfò = cloak, Idà = sword, Ọkọ̀ = vehicle/spear, etc.) compounded with descriptive elements. Example pattern:

"Called Ọpá Ìlàrọ̀ by the makers of [Place from pool], this [physical description]..."
"Known in the tongue of its makers as Idà Ìbéwù, this sword..."

The original-language name does not need to be a real Yoruba phrase; constructed compounds are appropriate. What matters is that it sounds like it parses to something meaningful in the register.

When framing the language in lore, use the in-world culture's own term (e.g., "the tongue of its makers," "the speech of the [Place from pool] elders"). Do NOT use real-world linguistic category names like "the Yoruba tongue" or "in Yoruba."
```

#### `yorubaAvoidListBlock()` (thin wrapper)

The avoid-list applies regardless of generator context — real Yoruba religious figures should never appear in any fictional generation, item or NPC or location. This wrapper composes the shared `yorubaAvoidList` array into prompt-format instruction. NPC generator and other adopters will compose the same array similarly.

```
NAMES TO NEVER USE — REAL RELIGIOUS FIGURES AND DEITIES:

The following are real Yoruba deities, sacred figures, and religious concepts in active contemporary worship by millions of practitioners worldwide. Do NOT use any of these names in any form, including as components of compound names, even when the lore frames them as fictional figures:

${yorubaAvoidList.join(', ')}

If you find yourself reaching for one of these names because it fits the lore, use a name from the deity/spirit pool instead. The pool exists specifically to give you a safe alternative.

Real Yoruba religious figures used in fictional contexts cause harm to the practitioners of an active living religion. This restriction is absolute.
```

### Shared Yoruba Module

`src/data/cultural-pools/yoruba.mjs`:

This module is a generator-agnostic shared resource. It exports raw cultural data — name pools, cultural notes, avoid-list — with no item-generator-specific instructions and no prompt-fragment logic. Any generator producing cultural-coded content imports from this module and decides for itself how to compose the data into prompt instructions.

```javascript
/**
 * Yoruba cultural-pool resource for cros.land generators.
 *
 * This module is a shared data resource. It contains Yoruba-style
 * pool data (constructed-not-real names following Yoruba phonetic
 * patterns) plus cultural-context notes and an avoid-list of real
 * religious/cultural figures. Any generator producing cultural-coded
 * content can import these resources to provide DeepSeek with
 * concrete grounding instead of relying on abstract invent-fictional-
 * names rules that DeepSeek follows imperfectly for unfamiliar
 * registers.
 *
 * Usage pattern:
 *   import {
 *     yorubaPersonalNames,
 *     yorubaDeityNames,
 *     yorubaPlaceNames,
 *     yorubaCulturalNotes,
 *     yorubaAvoidList,
 *   } from '@/data/cultural-pools/yoruba.mjs';
 *
 *   // Compose into generator-specific prompt instructions.
 *   // The shared resource provides DATA; the generator decides HOW to use it.
 *
 * The pools are constructed-not-real names following Yoruba phonetic
 * patterns (vowel-rich, tonal marks, diacritical vowels, common
 * compound structures). They avoid all known orisha and Ajogun names,
 * avoid the most common real Yoruba personal-name prefixes
 * (Adé-, Olú-, Olúwa-, Ọmọ-, Babá-, Ìyá-), and avoid real Yoruba
 * place names (Lagos, Ibadan, Ile-Ife, Oyo, Sokoto, Ilorin, etc.).
 *
 * Residual collision risk: Yoruba has thousands of attested personal
 * names and a 6,000-deity pantheon at the high estimate. Some pool
 * entries may collide with real names not encountered during research.
 * The verification mechanism is production user feedback —
 * Yoruba-speaking users who identify real-name collisions trigger
 * pool swaps. After 4-6 weeks of production use, the pool stabilizes
 * around verified-safe entries.
 *
 * Native-speaker review of these pools before ship is encouraged
 * but not blocking. The avoidList covers the highest-risk failure
 * mode (real orishas in fictional contexts) and is comprehensive.
 */

export const yorubaCulturalNotes = `
YORUBA CULTURAL CONTEXT:

This generation belongs to a fantasy world where the linguistic and cultural register is Yoruba-inspired. Yoruba is a real West African tradition (primarily Nigeria, Benin, Togo, with substantial diaspora communities in Brazil, Cuba, the US, and the Caribbean) with active contemporary religious practice. Treat this register with the seriousness you would give to writing a fantasy work rooted in any real living tradition.

Yoruba names typically express circumstantial meaning — they describe what was happening at the child's birth, the family's hopes, or the spiritual context. Names parse meaningfully: a name might mean "joy comes to the household" or "the path is open." Common structural patterns are verb-object compounds, agent-prefix + verb, descriptive noun phrases. Tone marks (high ´, low \`, mid no-mark) and diacritical vowels (ọ, ẹ) appear throughout. Names are often unisex; gender isn't typically encoded morphologically.

Yoruba material culture uses specific materials and forms. Cowrie shells, palm wood, ironwork, indigo-dyed cloth (adire), beadwork, calabash gourds, and carved hardwood. Sacred trees include iroko, baobab, and silk-cotton (araba). Rivers and forests are treated as living spiritual presences with their own intelligences. Smithing is communal and ritualized rather than solitary. Marketplaces (ọjà) are central social spaces. Crowns (adé) and beaded staffs (ọ̀pá) are objects of authority.

When generating content in this register, lean into these specifics rather than defaulting to generic-fantasy materials and settings.
`.trim();

export const yorubaPersonalNames = [
  'Tìfọ́yìn', 'Sòkáyé', 'Bélùmí', 'Ènìjọ́lá', 'Ìmọ̀ránfẹ́',
  'Ẹ̀rìnkùnlé', 'Asùnkànmí', 'Òdùnkẹ́', 'Ìbéwùmí', 'Tóyẹ́sì',
  'Ìfẹ́nọ̀', 'Mọ́yẹbá', 'Òjìkàdé', 'Bétìfẹ́', 'Ìjàpàmí',
  'Ọ̀rànkẹ́', 'Sàárékàn', 'Ìmọ̀lẹ́sì', 'Pẹ̀lẹ́yẹ', 'Bànkólémi',
  'Òdìfẹ́yìn', 'Ìgbàrólá', 'Tẹ̀rísẹ́', 'Ọ̀sìnká', 'Ìbínílẹ̀',
  'Mọ́báyẹ́', 'Ọ̀dáránfẹ́', 'Ènìfẹ́tì', 'Wúrémilá', 'Ìjókànmí',
];

export const yorubaDeityNames = [
  'Ìbéwùnmi',         // spirit of riverbank-quiet
  'Ẹyẹ́bùdé',         // spirit of bird-omens
  'Òṣùpáyìn',         // lunar spirit
  'Ẹ̀míjórà',         // breath-of-stillness spirit
  'Ìgbàrọ́nà',         // time-on-the-path spirit
  'Òòrùnbímọ',         // sun-bringer-of-children, dawn spirit
  'Tánrùsì',           // hearth-fire spirit
  'Ìfẹ́dúnká',         // love-of-the-festival spirit
  'Òjìnkànmí',         // shadow-touching spirit
  'Pèlùkàdé',          // arriving-companion spirit
];

export const yorubaPlaceNames = [
  'Òkè-Bòsùn',         // Bosun-mountain
  'Odò-Ìjùnlà',        // Ijunla-river
  'Igbó-Ẹ̀sìnká',      // Esinka-forest
  'Ilẹ̀-Mórèfè',       // Morefe-land
  'Ìlú-Sàmúdé',        // Samude-town
  'Adágún-Ṣẹ̀wárò',    // Sewaro-lake
  'Òkè-Pẹ̀lẹ́dò',      // Peledo-hill
  'Odò-Ìbómèfí',       // Ibomefi-river
  'Igbó-Ọ̀dàránké',    // Odaranke-forest
  'Ilé-Mákọ̀rì',       // Makori-settlement
  'Òkun-Ẹ̀rìbólà',     // Eribola-sea
  'Òkè-Tìfọ́dé',       // Tifode-mountain
  'Adágún-Wúréfà',     // Wurefa-lake
  'Igbó-Ọ̀wárìbé',     // Owaribe-forest
  'Ilẹ̀-Bànjókàn',     // Banjokan-territory
];

/**
 * Real Yoruba religious figures and concepts that must NEVER appear
 * in fictional contexts. Includes major orishas, Ajogun (negative
 * spirits), supreme-deity variants, and named ancestral figures.
 *
 * Source: cross-referenced from Wikipedia's List of Yoruba deities,
 * Mythopedia's Orisha entry, the Atla Religion Database's
 * "Categories of Spiritual Forces" appendix, and Britannica's
 * Orisha entry.
 */
export const yorubaAvoidList = [
  // Supreme deity (multiple names for same being)
  'Olódùmarè', 'Olorun', 'Olófin', 'Eledua', 'Olodumaré',
  // Major orishas
  'Obatala', 'Ọbàtálá', 'Eshu', 'Èṣù', 'Elegua', 'Elegba',
  'Ogun', 'Ògún', 'Yemoja', 'Yemaya', 'Yemọja', 'Oshun', 'Ọṣun',
  'Shango', 'Ṣàngó', 'Sango', 'Oya', 'Ọya', 'Olokun', 'Olókun',
  'Orunmila', 'Ọrunmila', 'Oduduwa', 'Odùdúwà', 'Ibeji', 'Ìbejì',
  'Iroko', 'Ìyá Nlá', 'Iya Nla', 'Aganju', 'Aganjú',
  'Babalu-Aye', 'Babaluaiye', 'Ọbalúayé', 'Oko', 'Osanyin', 'Ossain',
  'Ọṣọsi', 'Oshosi', 'Ọba', 'Yemowo', 'Ara', 'Ori', 'Òrì',
  // Ajogun (negative spirits)
  'Iku', 'Ikú', 'Arun', 'Àrùn', 'Egba', 'Ẹgba',
  'Epe', 'Èpè', 'Ese', 'Eṣe', 'Ewon', 'Ẹwọn',
  'Ofo', 'Òfò', 'Oran', 'Ọran',
  // Other named spirits/figures
  'Aje', 'Àjé', 'Aroni', 'Egungun', 'Egún', 'Agẹmọ', 'Agemo',
  'Olosa', 'Ofere', 'Akódá', 'Aludundun', 'Amusan',
  'Olojongbodu', 'Olóore', 'Òjò', 'Òjìjí',
  // Egungun named figures
  'Oloolu', 'Alapansanpa', 'Elewe', 'Danafojura',
  'Awodagbese', 'Feleru',
  // Sacred concepts
  'Ifá', 'Ifa', 'Àṣẹ', 'Ase', 'Ashe', 'Ọ̀run', 'Ayé',
  'Iyámi', 'Iyaami', 'Òṣòròngà', 'Osoronga',
];
```

### Adoption-Pattern README

Create `src/data/cultural-pools/README.md` documenting the adoption pattern so the convention is clear when other generators adopt:

```markdown
# Cultural Pools — Shared Resource for Generators

This directory contains palette-specific cultural data (name pools,
cultural notes, avoid-lists) used by generators across cros.land to
produce cultural-coded content with reduced appropriation risk.

## Available Palettes

- `yoruba.mjs` — Yoruba (West African; Nigeria, Benin, Togo, diaspora)

Future palettes will be added here as their pools are constructed.

## Adoption Pattern

When adding a new palette to a generator:

1. **Detect the palette.** The generator's existing palette-selection
   logic determines which palette is active for a generation.

2. **Import the shared resource.** When a palette has a shared module
   in `cultural-pools/`, import the pools, cultural notes, and
   avoid-list:

       import {
         yorubaPersonalNames,
         yorubaDeityNames,
         yorubaPlaceNames,
         yorubaCulturalNotes,
         yorubaAvoidList,
       } from '@/data/cultural-pools/yoruba.mjs';

3. **Compose into generator-specific instructions.** The shared
   resource provides DATA; the generator decides HOW to use it. For
   an item generator, the personal names are for characters in the
   lore. For an NPC generator, the personal names are for the NPC's
   own name, family, etc. The composition is generator-specific.

4. **Use the cultural notes verbatim.** The cultural-notes string
   describes phonetic patterns, naming conventions, and material
   culture that don't change between generator contexts. Include
   it in the prompt unchanged.

5. **Use the avoid-list verbatim.** The avoid-list applies regardless
   of generator context. Compose it into the prompt's "do not use"
   instructions.

## Adding a New Palette

When constructing pools for a new palette (Andean, Diné, Maori, etc.):

1. Research the palette's phonetic patterns, naming conventions, and
   material culture. Document in cultural notes.
2. Construct ~30 personal names following phonetic patterns, avoiding
   common name prefixes that produce real names.
3. Construct ~10 deity/spirit names avoiding all known real deity
   sound patterns.
4. Construct ~15 place names avoiding real city/sacred-site names.
5. Compile an avoid-list of real religious figures, sacred concepts,
   and culturally-significant historical figures.
6. Write cultural notes (1-2 paragraphs) describing what makes the
   register feel authentic.
7. Document residual collision risk in the file's docstring.
8. Native-speaker review encouraged but not blocking; production
   feedback is the practical verification mechanism.

## Verification

For any palette adopted by a generator:

- Test that pool entries don't appear in the avoid-list (catches
  accidental real-name inclusion at the data level).
- Generate sample outputs and confirm names are pool-sourced.
- Track production feedback for collision reports; swap pool entries
  as needed.
```

### Migration Steps

0. **Create `src/data/cultural-pools/`** and add the `README.md` documenting the adoption pattern (above).

1. **Create `src/tools/item-generator/utils/prompts/`** directory.

2. **Create `prompt-shared.mjs`** by extracting the existing prompt sections from `ItemGenerator.vue`'s `generateMagicItem` function. Each section becomes a function. Logic doesn't change. Use the function inventory above as a checklist.

3. **Create `prompt-general.mjs`** that composes the shared fragments with the five cultural-engagement functions (`namingStyleGeneral`, `namingTranslationGeneral`, `universalInventRule`, `languagePaletteOverride`, `orcGoblinRestriction`) extracted verbatim from the current prompt.

4. **Create `src/data/cultural-pools/yoruba.mjs`** with the five exports (`yorubaPersonalNames`, `yorubaDeityNames`, `yorubaPlaceNames`, `yorubaCulturalNotes`, `yorubaAvoidList`).

5. **Create `prompt-yoruba.mjs`** in `src/tools/item-generator/utils/prompts/` with the four Yoruba composition functions (`yorubaCulturalNotesBlock`, `yorubaNamingFromPools`, `yorubaItemNamingTranslation`, `yorubaAvoidListBlock`) and the composition function `buildYorubaPrompt`. Imports cultural data from `@/data/cultural-pools/yoruba.mjs`.

6. **Create `route-prompt.mjs`** with the dispatcher.

7. **Update `ItemGenerator.vue`**:
   - Import `routePrompt` from `./utils/prompts/route-prompt.mjs`.
   - Remove the entire `prompt = ...` template literal in `generateMagicItem`.
   - Build the `seeds` object from existing local variables.
   - Call `const prompt = routePrompt(seeds);`.
   - Everything downstream of the prompt construction stays the same.

8. **Verify the existing test suite passes** without changes. The migration is a pure refactor for general-palette generations; behavior shouldn't change for non-Yoruba palettes.

9. **Add new tests**:
   - **Shared-data tests** at `src/data/cultural-pools/yoruba.spec.mjs`: assert pool sizes (≥30 personal, ≥10 deity, ≥15 place, ≥40 avoid). Assert no pool entry appears in the avoid-list (catches accidental real-name inclusion at the data level). Assert `yorubaCulturalNotes` is a non-empty string. These tests live with the data because the data is generator-agnostic.
   - **Item-generator composition tests** in the item-generator test directory:
     - `prompt-yoruba.spec.mjs`: build a prompt with a Yoruba-palette seed object and assert the prompt contains the cultural notes block, the personal-name pool list, the deity pool list, the place pool list, and the avoid-list block. Assert it does NOT contain the general universal-invent rule or the abstract translation rule.
     - `route-prompt.spec.mjs`: assert that a Yoruba-palette seed routes to `buildYorubaPrompt` and a non-Yoruba seed routes to `buildGeneralPrompt`.

### Verification

After ship:

1. **Test suite passes**: All existing tests continue passing. New tests pass. Suite count grows by ~10-15 from new test files.

2. **General-palette parity**: Generate 10 items with non-Yoruba palettes (Sindarin, Old-Norse, Latin, Slavic, Goblin-inspired). Confirm output quality is unchanged from pre-refactor baseline.

3. **Yoruba routing**: Generate 5 items with origin=Necromantic and lore containing a Yoruba name (e.g., "Tìfọ́yìn's blade"). Confirm:
   - Cultural detection fires (palette resolves to Yoruba-inspired).
   - Routing picks the Yoruba module (visible by inspecting the prompt — should contain the cultural notes block).
   - Output uses ONLY names from the Yoruba pools (cross-check against the avoid-list).
   - No real orisha names appear anywhere in the output.

4. **Avoid-list enforcement**: Generate 20 items with Yoruba palette via dropdown selection of various origins. Confirm no avoid-list entry appears in any output. If an avoid-list entry appears, the prompt block isn't firing as intended; investigate before declaring success.

5. **In-world language framing**: Spot-check Yoruba outputs for the "tongue of its makers" / "speech of the X elders" pattern. Reject any "in the Yoruba tongue" or "Yoruba-inspired register" framing.

6. **Cross-generator readiness check**: verify the shared module's exports are accessible via the import path from a non-item-generator location. Run an `import` from a sandbox/test file in another tool's directory and confirm the data is reachable. This is a smoke test for the shared-resource architecture working end-to-end — the whole point of locating pools at `src/data/cultural-pools/` is that the next generator (NPC, location, etc.) can import them without crossing tool boundaries. If this smoke test fails, the architecture isn't actually delivering the shared-infrastructure value the brief promises.

### Why This Works Better

The current monolithic prompt asks DeepSeek to perform a cognitive task it can't reliably perform: "invent culturally-appropriate Yoruba names without using real ones." DeepSeek's training data on Yoruba is shallow; when it reaches for a Yoruba name component, it pulls the most-frequent terms in its training (which are the major orishas and supreme deity).

The per-palette architecture changes the cognitive task from "invent" to "select." DeepSeek complies with explicit lists far more reliably than with abstract cultural-knowledge tasks. The avoid-list provides explicit negative reinforcement for the highest-risk failure mode.

The architecture also separates concerns: cultural content lives in palette modules, mechanical scaffolding lives in shared, routing logic lives in the dispatcher. Each piece can be tested, modified, and reasoned about independently.

For the broader trajectory: this same architecture extends to NPC generation, location generation, and other tools where DeepSeek currently produces real-orisha appropriations. The work pays back across the suite.

### Estimated Scope

- `src/data/cultural-pools/` setup + README: 30-60 minutes (organization + adoption-pattern doc).
- Shared module extraction (item-generator scaffolding): 2-3 hours (mechanical refactor).
- General prompt module: 1 hour (composition).
- Shared Yoruba data module: 30 minutes (data file).
- Item-generator Yoruba prompt module: 1-2 hours (composition + four cultural functions).
- Routing dispatcher: 15 minutes.
- `ItemGenerator.vue` integration: 30-60 minutes.
- Tests: 1-2 hours.
- Verification: 1 hour.

Total: 7.5-11 hours. The shared-infrastructure overhead is 30-60 minutes; the rest is identical to the item-generator-only framing. Same total work, but the output is reusable across the suite — every subsequent generator that adopts gets cultural-engagement protection without rebuilding the pool.

### Cross-Generator Adoption Roadmap (Reference Only — Not For This Brief)

After this brief ships and the item generator integration is verified:

**Phase 1 (this brief):** Item generator + Yoruba shared resource.

**Phase 2 (subsequent brief):** NPC generator adopts the Yoruba shared resource. NPC generator likely has its own prompt-construction logic that needs analogous refactoring (general + Yoruba module + routing). The shared cultural data does NOT change; only the NPC-generator-side composition does. Wrappers like `yorubaCulturalNotesBlock` and `yorubaAvoidListBlock` are likely identical to the item-generator versions; `yorubaNamingFromPools` will be re-composed for NPC context (e.g., "for the NPC's own name, family lineage, and birthplace" instead of "for character names in this item's lore").

**Phase 3 (subsequent brief):** Add Andean and Diné to `src/data/cultural-pools/`. Both have produced acute appropriations in production; both warrant priority alongside Yoruba. Each addition is pool-construction work (~3-4 hours) plus the item-generator and NPC-generator composition work to use them.

**Phase 4 and beyond:** Maori, Hindu/Sanskrit, Arabic-Islamic, Lakota, Maya, Aztec/Nahuatl, Hawaiian, and other underrepresented palettes per production feedback frequency.

The cross-generator architecture means each new palette ships protection across all adopted generators simultaneously. The investment compounds.

### Future Palette Modules (Out of Scope, For Reference)

After this ships and stabilizes, the same pattern applies to:

- Diné — sacred-figure appropriation (First Woman, real clan names)
- Lakota — similar Indigenous American profile
- Andean — Apu compounds, Inti, Pachamama
- Maya — Ajaw titles, real city/king names
- Aztec/Nahuatl — deity density, real ceremonial sites
- Maori — Rangi/Papa, real iwi names, sacred mountains
- Hawaiian — similar Pacific Islander profile
- Hindu/Sanskrit — deity density, real religious specifics
- Arabic-Islamic — sacred figures, Quranic specifics

Each requires its own pools, cultural notes, and avoid-list at `src/data/cultural-pools/<palette>.mjs`. Estimate ~3-4 hours per palette for pool construction + 1-2 hours per generator that adopts. Not all need to ship; prioritize based on production failure frequency.

### Acknowledged Risks

- **Pool collision risk**: Some Yoruba pool entries may match real names not encountered during research. Production feedback is the verification mechanism; expect 1-3 swaps over the first 4-6 weeks.
- **Cultural-notes accuracy**: Draft notes are consultative-quality, not native-speaker quality. A Yoruba friend reviewing them before ship would improve quality. Not blocking.
- **Place-name pool size**: 15 entries is on the small side. May feel repetitive across many generations. Acceptable for v1; expandable later.
- **Refactor regression risk**: The shared-module extraction touches a lot of existing prompt logic. The existing test suite should catch behavior regressions, but visually inspect 5-10 general-palette outputs after refactor as a sanity check.
