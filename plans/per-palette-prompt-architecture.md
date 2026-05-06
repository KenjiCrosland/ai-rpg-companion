# Per-Palette Prompt Architecture (Yoruba First)

## Trigger

Pick this up when:
- Production feedback surfaces fresh real-orisha-as-fictional-deity failures (Olódùmarè, Ajagun, Apu Killa, etc.) for the Yoruba palette, OR
- Work begins on a per-palette pool for any obscure register (Diné, Maori, Hindu/Sanskrit, Arabic-Islamic, etc.) — this brief lays the architecture all of them will share, OR
- The item generator's monolithic prompt becomes a refactor obstacle for unrelated work.

This brief assumes the orc/goblin pool-only architecture (70/30 weighting, allow-list selection in `select-language-palette.mjs`) is shipped and stable. If a stale-build issue resurfaces, address that diagnostic first.

## Problem

The item generator currently builds one large prompt for every generation in `ItemGenerator.vue` (the brief originally said `MagicItemGenerator.vue` — that file does not exist; the actual file is `src/tools/item-generator/ItemGenerator.vue`). Cultural-engagement rules (universal-invent, translation, unconventional-pairing) are abstract instructions that DeepSeek follows imperfectly for unfamiliar registers — Yoruba, Diné, Maori, etc. Production failures (Olódùmarè used as fictional sky-father, Ajagun as fictional war-spirit, Apu Killa as deity figure) are the visible result.

DeepSeek's training data on Yoruba is shallow; when it reaches for a Yoruba name component, it pulls the most-frequent terms in its training (which are the major orishas and supreme deity). The cognitive task "invent culturally-appropriate Yoruba names without using real ones" is beyond reliable compliance. The cognitive task "select a name from this list" is reliably compliant.

## Recommended Approach

Route to palette-specific prompt builders for obscure registers. Each palette-specific prompt provides DeepSeek with concrete name pools instead of abstract invent-fictional-names rules. Ship the architecture and the first palette-specific module (Yoruba). Other palettes follow the same pattern in subsequent briefs.

### Scope

In scope:
- Refactor prompt construction out of `ItemGenerator.vue` into prompt modules.
- New shared module for non-cultural scaffolding (rarity rules, attunement, item types, mood/material/quirk seeding, JSON output structure).
- New general prompt module for Western-canonical and fictional-fantasy palettes.
- New Yoruba prompt module with full cultural content (notes + four pools + avoid-list).
- New routing dispatcher.
- Update tests.

Out of scope:
- Per-palette modules for any palette other than Yoruba. Architecture is built so the next palettes drop in cleanly; their content is later work.
- Place-name pool curation beyond the initial ~15 entries provided.
- Native-speaker review of the Yoruba pools (handled via production feedback after ship).

### File Structure

```
src/tools/item-generator/utils/
├── prompts/
│   ├── prompt-shared.mjs           NEW — non-cultural scaffolding
│   ├── prompt-general.mjs          NEW — Western canon + fictional fantasy
│   ├── prompt-yoruba.mjs           NEW — Yoruba-specific
│   ├── route-prompt.mjs            NEW — dispatcher
│   └── pools/
│       └── yoruba-name-pools.mjs   NEW — Yoruba pools as data
├── select-language-palette.mjs     UNCHANGED
├── language-palettes.mjs           UNCHANGED
├── orc-goblin-name-pools.mjs       UNCHANGED
└── ...
```

`pools/` subdirectory anticipates future palette pools (diné, maori, etc.) without crowding the main utils directory.

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

### Yoruba Prompt Module

`prompt-yoruba.mjs` replaces the five general cultural-engagement functions with Yoruba-specific content. Everything else is the same shared scaffolding.

```javascript
import * as shared from './prompt-shared.mjs';
import {
  yorubaPersonalNames,
  yorubaDeityNames,
  yorubaPlaceNames,
  yorubaAvoidList,
} from './pools/yoruba-name-pools.mjs';

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
    yorubaCulturalNotes(),                           // see below
    yorubaNamingFromPools(seeds),                    // see below
    yorubaItemNamingTranslation(seeds),              // see below
    yorubaAvoidListBlock(),                          // see below
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

#### `yorubaCulturalNotes()`

Returns a static string:

```
YORUBA CULTURAL CONTEXT:

This item belongs to a fantasy world where the linguistic and cultural register is Yoruba-inspired. Yoruba is a real West African tradition (primarily Nigeria, Benin, Togo, with substantial diaspora communities in Brazil, Cuba, the US, and the Caribbean) with active contemporary religious practice. Treat this register with the seriousness you would give to writing a fantasy item rooted in any real living tradition.

Yoruba names typically express circumstantial meaning — they describe what was happening at the child's birth, the family's hopes, or the spiritual context. Names parse meaningfully: a name might mean "joy comes to the household" or "the path is open." Common structural patterns are verb-object compounds, agent-prefix + verb, descriptive noun phrases. Tone marks (high ´, low `, mid no-mark) and diacritical vowels (ọ, ẹ) appear throughout. Names are often unisex; gender isn't typically encoded morphologically.

Yoruba material culture uses specific materials and forms. Cowrie shells, palm wood, ironwork, indigo-dyed cloth (adire), beadwork, calabash gourds, and carved hardwood. Sacred trees include iroko, baobab, and silk-cotton (araba). Rivers and forests are treated as living spiritual presences with their own intelligences. Smithing is communal and ritualized rather than solitary. Marketplaces (ọjà) are central social spaces. Crowns (adé) and beaded staffs (ọ̀pá) are objects of authority.

When writing lore for this item, lean into these specifics rather than defaulting to generic-fantasy materials and settings.
```

#### `yorubaNamingFromPools(seeds)`

Returns a string that lists the pools and instructs DeepSeek to pick from them:

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

#### `yorubaItemNamingTranslation(seeds)`

```
ITEM NAMING:

The item's primary name in the "name" field should be an English translation that captures the item's essence — for example, "Wand of First Light," "Hammer of the Open Path," "Cup of Shared Memory." Use the translation rule for non-English palettes: English title for table usability, original-language name in the lore.

Within the lore, include the original-language Yoruba-style name for the item itself in the first sentence. Construct it from Yoruba word components (Ọpá = staff/wand, Adé = crown, Ìlù = drum, Òfò = cloak, Idà = sword, Ọkọ̀ = vehicle/spear, etc.) compounded with descriptive elements. Example pattern:

"Called Ọpá Ìlàrọ̀ by the makers of [Place from pool], this [physical description]..."
"Known in the tongue of its makers as Idà Ìbéwù, this sword..."

The original-language name does not need to be a real Yoruba phrase; constructed compounds are appropriate. What matters is that it sounds like it parses to something meaningful in the register.

When framing the language in lore, use the in-world culture's own term (e.g., "the tongue of its makers," "the speech of the [Place from pool] elders"). Do NOT use real-world linguistic category names like "the Yoruba tongue" or "in Yoruba."
```

#### `yorubaAvoidListBlock()`

```
NAMES TO NEVER USE — REAL RELIGIOUS FIGURES AND DEITIES:

The following are real Yoruba deities, sacred figures, and religious concepts in active contemporary worship by millions of practitioners worldwide. Do NOT use any of these names in any form, including as components of compound names, even when the lore frames them as fictional figures:

${yorubaAvoidList.join(', ')}

If you find yourself reaching for one of these names because it fits the lore, use a name from the deity/spirit pool instead. The pool exists specifically to give you a safe alternative.

Real Yoruba religious figures used in fictional contexts cause harm to the practitioners of an active living religion. This restriction is absolute.
```

### Yoruba Pools Module

`pools/yoruba-name-pools.mjs`:

```javascript
/**
 * Yoruba-style name pools for cros.land item generation.
 *
 * These pools are constructed-not-real names following Yoruba phonetic
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

### Migration Steps

1. **Create the `prompts/` directory** under `src/tools/item-generator/utils/`.

2. **Create `prompt-shared.mjs`** by extracting the existing prompt sections from `ItemGenerator.vue`'s `generateMagicItem` function. Each section becomes a function. Logic doesn't change. Use the function inventory above as a checklist.

3. **Create `prompt-general.mjs`** that composes the shared fragments with the five cultural-engagement functions (`namingStyleGeneral`, `namingTranslationGeneral`, `universalInventRule`, `languagePaletteOverride`, `orcGoblinRestriction`) extracted verbatim from the current prompt.

4. **Create `pools/yoruba-name-pools.mjs`** with the four exports above.

5. **Create `prompt-yoruba.mjs`** with the four Yoruba-specific functions (`yorubaCulturalNotes`, `yorubaNamingFromPools`, `yorubaItemNamingTranslation`, `yorubaAvoidListBlock`) and the composition function `buildYorubaPrompt`.

6. **Create `route-prompt.mjs`** with the dispatcher.

7. **Update `ItemGenerator.vue`**:
   - Import `routePrompt` from `./utils/prompts/route-prompt.mjs`.
   - Remove the entire `prompt = ...` template literal in `generateMagicItem`.
   - Build the `seeds` object from existing local variables.
   - Call `const prompt = routePrompt(seeds);`.
   - Everything downstream of the prompt construction stays the same.

8. **Verify the existing test suite passes** without changes. The migration is a pure refactor for general-palette generations; behavior shouldn't change for non-Yoruba palettes.

9. **Add new tests** for the Yoruba module:
   - `prompt-yoruba.spec.mjs`: build a prompt with a Yoruba-palette seed object and assert the prompt contains the cultural notes block, the personal-name pool list, the deity pool list, the place pool list, and the avoid-list block. Assert it does NOT contain the general universal-invent rule or the abstract translation rule.
   - `pools/yoruba-name-pools.spec.mjs`: assert pool sizes (≥30 personal, ≥10 deity, ≥15 place, ≥40 avoid). Assert no pool entry appears in the avoid-list (catches accidental real-name inclusion at the data level).
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

### Why This Works Better

The current monolithic prompt asks DeepSeek to perform a cognitive task it can't reliably perform: "invent culturally-appropriate Yoruba names without using real ones." DeepSeek's training data on Yoruba is shallow; when it reaches for a Yoruba name component, it pulls the most-frequent terms in its training (which are the major orishas and supreme deity).

The per-palette architecture changes the cognitive task from "invent" to "select." DeepSeek complies with explicit lists far more reliably than with abstract cultural-knowledge tasks. The avoid-list provides explicit negative reinforcement for the highest-risk failure mode.

The architecture also separates concerns: cultural content lives in palette modules, mechanical scaffolding lives in shared, routing logic lives in the dispatcher. Each piece can be tested, modified, and reasoned about independently.

For the broader trajectory: this same architecture extends to NPC generation, location generation, and other tools where DeepSeek currently produces real-orisha appropriations. The work pays back across the suite.

### Estimated Scope

- Shared module extraction: 2-3 hours (mechanical refactor).
- General prompt module: 1 hour (composition).
- Yoruba pools module: 30 minutes (data file).
- Yoruba prompt module: 1-2 hours (composition + four cultural functions).
- Routing dispatcher: 15 minutes.
- `ItemGenerator.vue` integration: 30-60 minutes.
- Tests: 1-2 hours.
- Verification: 1 hour.

Total: 7-10 hours. Substantial but bounded.

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

Each requires its own pools, cultural notes, and avoid-list. Estimate ~4-6 hours per palette after architecture is in place. Not all need to ship; prioritize based on production failure frequency.

### Acknowledged Risks

- **Pool collision risk**: Some Yoruba pool entries may match real names not encountered during research. Production feedback is the verification mechanism; expect 1-3 swaps over the first 4-6 weeks.
- **Cultural-notes accuracy**: Draft notes are consultative-quality, not native-speaker quality. A Yoruba friend reviewing them before ship would improve quality. Not blocking.
- **Place-name pool size**: 15 entries is on the small side. May feel repetitive across many generations. Acceptable for v1; expandable later.
- **Refactor regression risk**: The shared-module extraction touches a lot of existing prompt logic. The existing test suite should catch behavior regressions, but visually inspect 5-10 general-palette outputs after refactor as a sanity check.
