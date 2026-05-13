/**
 * Yoruba cultural-pool resource for cros.land generators.
 *
 * Shared data resource. Contains Yoruba praise-name (Oríkì) epithets
 * organized into character, place, and spirit pools. Each pool is a
 * flat array of Yoruba strings with inline source comments documenting
 * meaning for human maintainers (the comments do not appear in
 * generator prompts).
 *
 * Architecture: positive-constraint-only. The pool's "use ONLY these
 * names" instruction is the sole protection against real-name
 * collision. There is no avoid-list — the pool is curated such that
 * no entry contains real orisha names, sacred terms, Ajogun, or
 * named ancestral figures as compound components. Real-name
 * protection is enforced at curation time, not at prompt time.
 *
 * Pool entries use varied Yoruba name-construction patterns:
 * hyphenated body-element compounds, single-word verb/quality names,
 * verb-phrase names, sentence-fragment names, and reduplications.
 * The variety reflects the Oríkì tradition's range and avoids
 * monotonous all-Bloodaxe-pattern outputs.
 *
 * Usage pattern:
 *   import {
 *     yorubaCharacterEpithets,
 *     yorubaPlaceEpithets,
 *     yorubaSpiritEpithets,
 *     yorubaCulturalNotes,
 *   } from '@/shared/registers/yoruba.mjs';
 *
 * Native-speaker review of the constructions before broad rollout
 * is encouraged. Production user feedback identifies any constructions
 * that read as awkward or accidentally sacred-coded.
 */

export const yorubaCharacterEpithets = [
  // Hyphenated body/element compounds
  'Ọwọ́-Iná',         // Firehand — smith, warrior, forge-marked
  'Ẹsẹ̀-Iná',         // Fire-Footed — swift, far-traveled
  'Ọkàn-Irin',        // Iron-Hearted — unyielding, steadfast
  'Ojú-Òkè',          // Mountain-Eyed — far-seeing, vigilant
  'Ọwọ́-Aṣọ',         // Cloth-Hand — weaver, mender
  'Ẹsẹ̀-Òkun',        // Sea-Footed — sailor, far-traveler
  'Ẹnu-Òjìjì',        // Shadow-Mouthed — speaks of dark things
  'Etí-Òkè',          // Mountain-Eared — high-listener
  'Ojú-Igbó',         // Forest-Eyed — wild-sighted
  'Ọwọ́-Òjìjì',       // Shadow-Handed — works in secret
  'Ojú-Òjò',          // Rain-Eyed — weeping, prophetic
  'Ọkàn-Igbó',        // Forest-Hearted — wild-spirited

  // Stance + place
  'Adúró-Òkè',        // Mountain-Stander — steadfast, judge
  'Adúró-Ọkàn',       // Heart-Stander — steady-hearted
  'Adúró-Òkun',       // Sea-Stander — stands against the tide

  // Likeness compounds
  'Bíi-Igbó',         // Forest-Souled — wild, deep
  'Bíi-Òkúta',        // Stone-Souled — immovable
  'Bíi-Òkun',         // Sea-Souled — vast, restless
  'Bíi-Ìmọ́lẹ̀',       // Light-Souled — radiant, clear
  'Bíi-Atẹ́gùn',      // Wind-Souled — restless, free

  // Relational compounds
  'Ọmọ-Ààlà',         // Boundary-Born — borderlander, exile
  'Ọmọ-Òjò',          // Rain-Child — born during rains
  'Ọmọ-Òòrùn',        // Sun-Child — born at midday
  'Ọmọ-Igbó',         // Forest-Child — wild-raised
  'Ọmọ-Adágún',       // Lake-Child — calm-natured

  // Worth/quality compounds
  'Tó-Ọ̀nà',           // Path-Worthy — deserving, capable
  'Tó-Ìpàdé',         // Meeting-Worthy — esteemed
  'Àpótí-Irin',       // Iron-Vessel — judge, immovable

  // Single-word verb/quality names
  'Adúró',             // The Steadfast
  'Atúnṣe',            // The Mender
  'Mọ̀',                // The Knowing One

  // Verb-phrase names (no hyphen)
  'Tóbíọkàn',          // Heart-Worthy
  'Adépọ̀nlé',          // Crown-Resting

  // Sentence-fragment names
  'Sọ̀fẹ́mi',           // "Speak love to me"
  'Bàlóguntí',         // "Warrior-Met"

  // Reduplications
  'Pẹ̀lẹ́pẹ̀lẹ̀',         // "Very gentle"
  'Dìẹ̀dìẹ̀',            // "Slow-slow" — patient
];

export const yorubaPlaceEpithets = [
  'Ọ̀nà-Òkè',           // High Way — mountain pass
  'Igbó-Atijọ́',        // Old Grove
  'Odò-Ìbẹ̀rẹ̀',         // Headwaters — river-source
  'Ẹnu-Odò',            // River-Mouth
  'Ọjà-Ìpàdé',          // Market Crossroads
  'Ìlú-Iná',            // Forge-Town — fire-town
  'Òkè-Ìmọ́lẹ̀',         // Light-Mountain
  'Igbó-Ìpalẹ̀',        // Burnt Grove
  'Adágún-Mẹ́ta',       // Three Lakes
  'Ọ̀nà-Iyọ̀',           // Salt Road
  'Igbó-Ọkàn',          // Heart-Forest
  'Odò-Tún',            // Mended River
  'Ilẹ̀-Òjìjì',         // Shadow-Land
  'Ìlú-Aṣọ',            // Cloth-Town — weaver settlement
  'Òkun-Òjìjì',         // Shadow-Sea
  'Òkè-Òjìjì',          // Shadow-Mountain
  'Adágún-Ìmọ́lẹ̀',      // Light-Lake
  'Igbó-Atẹ́gùn',       // Wind-Forest
  'Ọ̀nà-Atijọ́',         // Old Path
  'Adágún-Òkúta',       // Stone-Lake
  'Igbó-Òjò',           // Rain-Forest
  'Ìlú-Òkè',            // Mountain-Town
];

export const yorubaSpiritEpithets = [
  'Ìró-Òkè',           // Mountain-Voice
  'Ìyá-Odò',           // River-Mother
  'Bàbá-Igbó',         // Forest-Father
  'Onísùn-Òkúta',      // Stone-Sleeper
  'Olùtọ́jú-Atẹ́gùn',   // Wind-Keeper
  'Olùgbọ́-Ìgbì',      // Wave-Listener
  'Akọrin-Ìjì',        // Storm-Singer
  'Olùtọ́jú-Iná',       // Hearth-Tender
  'Olùṣọ́-Irugbín',    // Seed-Watcher
  'Ìmọ́lẹ̀-Àkọ́kọ́',     // First-Light
  'Ìró-Odò',           // River-Voice
  'Olùtọ́jú-Òkè',       // Mountain-Keeper
  'Akọrin-Òjò',        // Rain-Singer
  'Ìmọ́lẹ̀-Òṣùpá',      // Moon-Light
];

export const yorubaCulturalNotes = `YORUBA CULTURAL CONTEXT:

This generation belongs to a fantasy world where the linguistic and cultural register is Yoruba-inspired. Yoruba is a real West African tradition (primarily Nigeria, Benin, Togo, with substantial diaspora communities in Brazil, Cuba, the US, and the Caribbean) with active contemporary religious practice. Treat this register with the seriousness you would give to writing a fantasy work rooted in any real living tradition.

Yoruba names typically express circumstantial meaning — they describe what was happening at the child's birth, the family's hopes, or the spiritual context. Names parse meaningfully: a name might mean "joy comes to the household" or "the path is open." Common structural patterns are verb-object compounds, agent-prefix + verb, descriptive noun phrases. Tone marks (high ´, low \`, mid no-mark) and diacritical vowels (ọ, ẹ) appear throughout. Names are often unisex; gender isn't typically encoded morphologically.

The character names in the provided pools are praise-name (Oríkì) epithets following Yoruba descriptive-naming conventions. They function as character names in lore but their semantic content is descriptive — they imply identity through marked-by qualities (one whose hand is fire, one who stands like a mountain, one born on the boundary). Pool entries use multiple Yoruba name-construction patterns: hyphenated body-element compounds, single-word verb/quality names, verb-phrase names, sentence-fragment names, and reduplications. Use them as character names directly. Rely on your knowledge of Yoruba morphology to interpret meanings and pick names that fit the lore's tone.

Yoruba material culture uses specific materials and forms. Cowrie shells, palm wood, ironwork, indigo-dyed cloth (adire), beadwork, calabash gourds, and carved hardwood. Sacred trees include iroko, baobab, and silk-cotton (araba). Rivers and forests are treated as living spiritual presences with their own intelligences. Smithing is communal and ritualized rather than solitary. Marketplaces (ọjà) are central social spaces. Crowns (adé) and beaded staffs (ọ̀pá) are objects of authority.

When generating content in this register, lean into these specifics rather than defaulting to generic-fantasy materials and settings.`;

/**
 * Hybrid register object — single source of truth for the Yoruba
 * register. Bare-array exports above stay canonical; the object below
 * aliases them and adds the pool-prompt metadata (itemNameGuidance,
 * spellingReminder, properNounsPoolOnly) that pool-prompt.mjs used to
 * carry in a separate POOL_DESCRIPTORS table. After the migration,
 * pool-prompt reads these fields off the register object directly.
 */
export const yorubaRegister = {
  prefix: 'Yoruba-inspired',
  descriptor: 'Yoruba-inspired: rhythmic with diacriticals',
  protected: true,
  promptArchitecture: 'pool',
  // Living religious tradition with extensive practitioner community
  // (Ifá, traditional African religions in Yorubaland and the Yoruba
  // diaspora). Real orisha names off-limits in any context.
  deityMode: 'restricted',
  cultureName: 'Yoruba',
  characterPool: yorubaCharacterEpithets,
  placePool: yorubaPlaceEpithets,
  spiritPool: yorubaSpiritEpithets,
  characterPoolStrictness: 'mandatory',
  culturalNotes: yorubaCulturalNotes,
  pools: {
    character: { label: 'Yoruba praise-name epithets', entries: yorubaCharacterEpithets },
    place:     { label: 'place epithets',              entries: yorubaPlaceEpithets },
    spirit:    { label: 'spirit epithets',             entries: yorubaSpiritEpithets },
  },
  itemNameGuidance: `For the item's own name in lore, construct an original-language compound from Yoruba word components (Ọpá = staff/wand, Adé = crown, Ìlù = drum, Òfò = cloak, Idà = sword, Ọkọ̀ = vehicle/spear, etc.) joined with descriptive elements.`,
  spellingReminder: `Do NOT alter the spelling, tone marks, or diacriticals of pool names. They are correct as written.`,
  properNounsPoolOnly: false,
};
