/**
 * dev-test-data.mjs
 *
 * Curated seed dataset for manual dev testing. Designed to surface the
 * edge cases that are easy to miss in unit tests but visually obvious
 * in the running app:
 *
 *   - Items with each attunement state (none / plain / class-restricted /
 *     alignment-restricted)
 *   - Item with related_npcs in mixed promotion states (one canonical,
 *     one stub-only)
 *   - NPCs whose source entity is GONE (the "(deleted)" marker case)
 *   - NPCs whose statblock reference is GONE (the existing "Statblock
 *     not found" warning)
 *   - Setting without an id (exercises assign-setting-ids migration)
 *   - Dungeon with legacy numeric id (exercises assign-dungeon-ids)
 *   - Setting NPC stub carrying seeded_from metadata (Phase 2 substrate)
 *   - tool-references covering every relationship type
 *
 * Not exhaustive — designed for visual smoke-testing before release. Add
 * scenarios here as they come up; keep the file readable.
 */

// ─── ID constants ────────────────────────────────────────────────────────────
// Stable across regenerations of the seed so references resolve.

const NPC_YELENA      = 'npc_test_yelena_001';
const NPC_GHOST       = 'npc_test_ghost_002';        // source ITEM is deleted
const NPC_VELATHOR    = 'npc_test_velathor_003';
const NPC_TARIEL      = 'npc_test_tariel_004';
const NPC_FORGOTTEN   = 'npc_test_forgotten_005';    // source DUNGEON is deleted
const NPC_GOBLIN_BOSS = 'npc_test_goblin_boss_006';  // has statblock attached
const NPC_LOST_STATS  = 'npc_test_lost_stats_007';   // statblock reference is broken
const NPC_MANUAL      = 'npc_test_manual_008';       // no source — purely user-authored

const SETTING_MAIN_ID = 'set_test_main_001';
const DUNGEON_MAIN_ID = 'dng_test_main_001';
const DUNGEON_LEGACY_NUMERIC_ID = 1700000000000; // numeric → exercises migration

const ITEM_COMMON     = 'Cobweb Lantern';
const ITEM_ATTUNED    = 'Sunfire Greatsword';     // class-restricted attunement
const ITEM_EVIL       = 'Whisper Crown';          // alignment-restricted attunement
const ITEM_SIMPLE     = 'Bone-Hilt Dagger';       // plain attunement
const ITEM_PHANTOM    = 'Phantom Hammer';         // referenced by NPC, NOT in seed (deleted source case)

// ─── NPC builder ─────────────────────────────────────────────────────────────

function makeNPC({ id, name, role, sourceType, sourceId, sourceName, statblockName, statblockFolder }) {
  return {
    npc_id: id,
    npcDescriptionPart1: {
      character_name: name,
      description_of_position: `${name}'s position summary (test data).`,
      reason_for_being_there: `${name}'s reason (test data).`,
      distinctive_feature_or_mannerism: `${name}'s distinctive feature (test data).`,
      character_secret: `${name} carries a secret (test data).`,
      read_aloud_description: `A test description of ${name}.`,
      roleplaying_tips: `Play ${name} with conviction.`,
      combined_details: `${name}'s position summary.\n\n${name}'s reason.\n\n${name}'s distinctive feature.\n\n${name}'s secret.\n\nPlay ${name} with conviction.`,
      ...(statblockName ? { statblock_name: statblockName, statblock_folder: statblockFolder } : {}),
    },
    npcDescriptionPart2: {
      relationships: {},
    },
    typeOfPlace: role,
    selectedChallengeRating: '1',
    isSpellcaster: false,
    ...(sourceType ? { sourceType, sourceId, sourceName } : {}),
  };
}

// ─── Statblock builder ───────────────────────────────────────────────────────

function makeStatblock(name) {
  return {
    name,
    type_and_alignment: 'Medium humanoid, neutral',
    armor_class: '13',
    hit_points: '22 (4d8 + 4)',
    speed: '30 ft.',
    attributes: 'STR 12 (+1), DEX 14 (+2), CON 12 (+1), INT 10 (+0), WIS 10 (+0), CHA 10 (+0)',
    saving_throws: '',
    skills: '',
    damage_resistances: '',
    damage_immunities: '',
    condition_immunities: '',
    senses: 'passive Perception 10',
    languages: 'Common',
    challenge_rating: '1 (200 XP)',
    proficiency_bonus: '+2',
    abilities: [
      { name: 'Test Trait', description: 'A representative trait for visual smoke testing.' },
    ],
    actions: [
      { name: 'Shortsword', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft. Hit: 5 (1d6 + 2) piercing damage.' },
    ],
    monsterDescription: '',
    monsterType: 'Random',
    selectedChallengeRating: '1',
    caster: false,
  };
}

// ─── Reference builder ───────────────────────────────────────────────────────

let _refCounter = 0;
function makeRef(args) {
  const id = `ref_test_${String(_refCounter++).padStart(3, '0')}`;
  return [id, { id, context: '', ...args }];
}

function buildReferences(entries) {
  return Object.fromEntries(entries);
}

// ─── Seed ────────────────────────────────────────────────────────────────────

export const TEST_SEED = {
  // Statblocks: one referenced by an NPC, one orphan. NOTE: an NPC also
  // references "Spectre Captain" which we deliberately DON'T include here
  // — that's the "Statblock not found" scenario.
  monsters: {
    'Custom Creatures': [
      makeStatblock('Goblin Boss'),
    ],
    'NPC Statblocks': [
      makeStatblock('Forest Sprite'),
    ],
  },

  // Items: each rarity tier represented, every attunement variant covered.
  // Whisper Crown carries related_npcs in mixed promotion states.
  savedItems: [
    {
      name: ITEM_COMMON,
      item_type: 'Wondrous Item',
      rarity: 'Common',
      bonus: '',
      modifier_sentence: '',
      feature_count: 1,
      requires_attunement: false,
      attunement_restriction: null,
      features: { 'Cobweb Light': 'Sheds dim light in a 5-foot radius when grasped firmly.' },
      physical_description: 'A small lantern wrapped in pale cobwebs.',
      lore: 'A trinket of no great consequence — a perfect baseline.',
      related_npcs: [],
    },
    {
      name: ITEM_SIMPLE,
      item_type: 'Weapon',
      rarity: 'Uncommon',
      bonus: '+1',
      modifier_sentence: 'You have a +1 bonus to attack and damage rolls made with this weapon.',
      feature_count: 1,
      requires_attunement: true,
      attunement_restriction: null,
      features: { 'Bone Whisper': 'Once per day, the wielder can ask a single yes/no question of the dead.' },
      physical_description: 'A dagger with a hilt of yellowed bone.',
      lore: 'Carried by a long line of hedge-witches in the borderlands.',
      related_npcs: [],
    },
    {
      name: ITEM_ATTUNED,
      item_type: 'Weapon',
      rarity: 'Rare',
      bonus: '+2',
      modifier_sentence: 'You have a +2 bonus to attack and damage rolls made with this weapon.',
      feature_count: 2,
      requires_attunement: true,
      attunement_restriction: 'by a paladin',
      features: {
        'Sunfire': 'Once per dawn, you may speak the blade\'s name and unleash a 30-foot cone of radiant fire (DC 15, 6d6 radiant on fail, half on success).',
        'Pure of Heart': 'You have advantage on saving throws against being charmed or frightened while wielding this weapon.',
      },
      physical_description: 'A greatsword whose blade glows faintly at dawn.',
      lore: 'Forged in the temple of the dawn-mother for her chosen.',
      related_npcs: [],
    },
    {
      name: ITEM_EVIL,
      item_type: 'Wondrous Item',
      rarity: 'Very Rare',
      bonus: '',
      modifier_sentence: '',
      feature_count: 3,
      requires_attunement: true,
      attunement_restriction: 'by a creature of evil alignment',
      features: {
        'Whispers of the Crowned': 'You can read the surface thoughts of any creature within 30 feet that you can see.',
        'Crown of Dread': 'Creatures within 10 feet have disadvantage on saving throws against being frightened.',
        'Persistent Hunger': 'At the end of each long rest while attuned, you must succeed on a DC 15 Wisdom save or take one level of exhaustion that can only be removed by feeding the crown a fresh memory.',
      },
      physical_description: 'A circlet of blackened iron set with a single weeping pearl.',
      lore: 'Yelena of the Duskwood received a vision of this crown in her seventh year. It was forged by a smith named Skragbit, of the Mukgash tribe — who has since been silenced. Today its keeper is one Xith\'vaar.',
      // Mixed promotion state: Yelena is a real NPC; Skragbit isn't (stub only).
      related_npcs: [
        {
          name: 'Yelena of the Duskwood',
          role_brief: 'Oracle who received the vision of Whisper Crown',
          context: 'Saw the crown in a vision before its forging.',
          source_quote: 'Yelena of the Duskwood received a vision of this crown in her seventh year.',
          npc_id: NPC_YELENA,
          npc_folder: 'Uncategorized',
        },
        {
          name: 'Skragbit',
          role_brief: 'Smith who forged Whisper Crown',
          context: 'Mukgash tribe smith who was silenced after the forging.',
          source_quote: 'It was forged by a smith named Skragbit, of the Mukgash tribe — who has since been silenced.',
          npc_id: null,
          npc_folder: null,
        },
      ],
    },
    // NOTE: ITEM_PHANTOM intentionally NOT included here. NPC_GHOST below
    // points at it via sourceId — that's the "(deleted) marker" scenario.
  ],

  // NPCs covering every source-tagging case + the broken-statblock case +
  // a manual (no-source) NPC.
  npcGeneratorNPCs: {
    Uncategorized: [
      // Promoted from an existing item.
      makeNPC({
        id: NPC_YELENA,
        name: 'Yelena of the Duskwood',
        role: 'Oracle who received the vision of Whisper Crown',
        sourceType: 'item',
        sourceId: ITEM_EVIL,
        sourceName: ITEM_EVIL,
      }),
      // Source ITEM is deleted — should render "(deleted)" in subtitle.
      makeNPC({
        id: NPC_GHOST,
        name: 'Ghost of the Phantom Hammer',
        role: 'Wielder of Phantom Hammer',
        sourceType: 'item',
        sourceId: ITEM_PHANTOM,
        sourceName: ITEM_PHANTOM,
      }),
      // Manual NPC, no source tag.
      makeNPC({
        id: NPC_MANUAL,
        name: 'Old Mara',
        role: 'a wandering tinker',
      }),
      // NPC with statblock attached — link works.
      makeNPC({
        id: NPC_GOBLIN_BOSS,
        name: 'Throk Iron-Tooth',
        role: 'a goblin warlord',
        statblockName: 'Goblin Boss',
        statblockFolder: 'Custom Creatures',
      }),
      // NPC referencing a deleted statblock — exercises the existing
      // "Statblock not found" warning section.
      makeNPC({
        id: NPC_LOST_STATS,
        name: 'Captain Voll',
        role: 'a spectral captain',
        statblockName: 'Spectre Captain',         // not in monsters
        statblockFolder: 'Custom Creatures',
      }),
      // Source DUNGEON is deleted — should render "(deleted)".
      makeNPC({
        id: NPC_FORGOTTEN,
        name: 'Forgotten Witness',
        role: 'a witness from somewhere lost',
        sourceType: 'dungeon',
        sourceId: 'dng_phantom_dungeon',
        sourceName: 'Vanished Dungeon',
      }),
    ],
    'Crypt of Ash': [
      // Source DUNGEON exists — link works.
      makeNPC({
        id: NPC_VELATHOR,
        name: 'Velathor the Wyrm-Mayor',
        role: 'Crypt of Ash',
        sourceType: 'dungeon',
        sourceId: DUNGEON_MAIN_ID,
        sourceName: 'Crypt of Ash',
      }),
    ],
    'Imperial Core': [
      // Source SETTING exists — link works.
      makeNPC({
        id: NPC_TARIEL,
        name: 'Empress Tariel',
        role: 'Imperial Core',
        sourceType: 'setting',
        sourceId: SETTING_MAIN_ID,
        sourceName: 'Imperial Core',
      }),
    ],
  },

  // Settings: one fully-formed, one missing its id (exercises migration).
  gameSettings: [
    {
      id: SETTING_MAIN_ID,
      adjective: 'Marbled',
      setting_type: 'city',
      place_name: 'Imperial Core',
      place_lore: 'A capital of long colonnades and quiet bureaucracy.',
      setting_overview: { overview: 'The empire\'s seat — quiet, ordered, and watching.', name: 'Imperial Core' },
      factions: [],
      importantLocations: [],
      // One canonical NPC stub + one stub seeded from an item (Phase 2
      // shape — exercises seeded_from rendering once the flow ships).
      npcs: [
        {
          npc_id: NPC_TARIEL,
          name: 'Empress Tariel',
          short_description: 'The empress, distant and exact.',
        },
        {
          npc_id: null,
          name: 'Yelena of the Duskwood',
          short_description: 'Seeded from an item; not yet promoted via this setting.',
          seeded_from: {
            source_type: 'item',
            source_id: ITEM_EVIL,
            source_name: ITEM_EVIL,
            stub_name: 'Yelena of the Duskwood',
          },
        },
      ],
      questHooks: [],
      parentIndex: null,
    },
    {
      // No `id` — should be backfilled by the assign-setting-ids migration.
      adjective: 'Quiet',
      setting_type: 'town',
      place_name: 'Legacy Hamlet',
      place_lore: 'A holdout from before the substrate had setting ids.',
      setting_overview: null,
      factions: [],
      importantLocations: [],
      npcs: [],
      questHooks: [],
      parentIndex: null,
    },
  ],

  // Dungeons: one with new id, one with legacy numeric id.
  dungeons: [
    {
      id: DUNGEON_MAIN_ID,
      dungeonOverview: {
        name: 'Crypt of Ash',
        overview: 'A barrow turned dragon\'s seat.',
        title: 'The Crypt of Ash',
      },
      rooms: null,
      roomDescriptions: null,
      roomNames: [],
      npcs: [
        {
          npc_id: NPC_VELATHOR,
          name: 'Velathor the Wyrm-Mayor',
          short_description: 'The dragon who keeps the crypt.',
          opened: false,
        },
      ],
      monsters: [],
    },
    {
      // Legacy numeric id — should be migrated to `dng_${oldId}` form.
      id: DUNGEON_LEGACY_NUMERIC_ID,
      dungeonOverview: {
        name: 'Old Mine',
        overview: 'A pre-migration dungeon used to verify id conversion.',
        title: 'The Old Mine',
      },
      rooms: null,
      roomDescriptions: null,
      roomNames: [],
      npcs: [],
      monsters: [],
    },
  ],

  encounters: {
    Uncategorized: [
      {
        name: 'Goblin Ambush',
        monsters: [
          { name: 'Goblin Boss', quantity: 1, statblock: makeStatblock('Goblin Boss') },
        ],
        partyGroups: [{ players: 4, level: 3 }],
        location: 'a forest road',
        generatedEncounter: { contentArray: [{ type: 'paragraph', value: 'Goblins erupt from the brush.' }] },
        difficulty: 'Medium',
        adjustedXp: 200,
        timestamp: Date.now(),
      },
    ],
  },

  // tool-references covering every relationship type the substrate writes.
  // Includes one inspired_by_item edge to demo Phase 2 shape, plus the
  // legacy-shape edges (mentioned_in_item, has_statblock, etc.).
  'tool-references': buildReferences([
    makeRef({
      source_type: 'npc', source_id: NPC_YELENA, source_name: 'Yelena of the Duskwood',
      target_type: 'item', target_id: ITEM_EVIL, target_name: ITEM_EVIL,
      relationship: 'mentioned_in_item',
    }),
    makeRef({
      source_type: 'npc', source_id: NPC_VELATHOR, source_name: 'Velathor the Wyrm-Mayor',
      target_type: 'dungeon', target_id: DUNGEON_MAIN_ID, target_name: 'Crypt of Ash',
      relationship: 'appears_in_dungeon',
    }),
    makeRef({
      source_type: 'npc', source_id: NPC_TARIEL, source_name: 'Empress Tariel',
      target_type: 'setting', target_id: SETTING_MAIN_ID, target_name: 'Imperial Core',
      relationship: 'appears_in_setting',
    }),
    makeRef({
      source_type: 'npc', source_id: NPC_GOBLIN_BOSS, source_name: 'Throk Iron-Tooth',
      target_type: 'statblock', target_id: 'Goblin Boss__Custom Creatures', target_name: 'Goblin Boss',
      relationship: 'has_statblock',
    }),
    makeRef({
      source_type: 'statblock', source_id: 'Goblin Boss__Custom Creatures', source_name: 'Goblin Boss',
      target_type: 'encounter', target_id: 'Uncategorized__0', target_name: 'Goblin Ambush',
      relationship: 'features_in_encounter',
    }),
    // Phase 2 shape — Imperial Core was inspired by Whisper Crown.
    makeRef({
      source_type: 'setting', source_id: SETTING_MAIN_ID, source_name: 'Imperial Core',
      target_type: 'item', target_id: ITEM_EVIL, target_name: ITEM_EVIL,
      relationship: 'inspired_by_item',
    }),
  ]),
};

/**
 * What's worth checking after seeding (printed to console as a
 * checklist). Keep this sync'd with the seed contents.
 */
export const TEST_SEED_CHECKLIST = [
  'Item Generator → "Whisper Crown" — shows "(requires attunement by a creature of evil alignment)" subtitle, two related-NPC stubs (Yelena = View NPC, Skragbit = Create NPC).',
  'Item Generator → "Sunfire Greatsword" — shows "(requires attunement by a paladin)".',
  'Item Generator → "Bone-Hilt Dagger" — shows "(requires attunement)" with no restriction.',
  'Item Generator → "Cobweb Lantern" — Common, no attunement suffix.',
  'NPC Generator → "Yelena" — subtitle links to Whisper Crown (works).',
  'NPC Generator → "Ghost of the Phantom Hammer" — subtitle shows Phantom Hammer as plain text + " (deleted)" muted italic.',
  'NPC Generator → "Forgotten Witness" — subtitle shows dungeon as plain text + " (deleted)".',
  'NPC Generator → "Captain Voll" — Statblock section shows "Statblock not found" warning with Regenerate / Clear Reference buttons.',
  'NPC Generator → "Throk Iron-Tooth" — statblock loads inline (Goblin Boss).',
  'NPC Generator → "Old Mara" — no subtitle source row (manual NPC).',
  'Dungeon Generator → on first load, "Old Mine" should have an id starting with "dng_" (migration ran). Console should log "assign-dungeon-ids: converted 1 legacy ids".',
  'Setting Generator → on first load, "Legacy Hamlet" should have an id starting with "set_" (migration ran). Console should log "assign-setting-ids: assigned 1 new IDs".',
  'After editing + saving "Ghost of the Phantom Hammer" once, reload and verify the source row is now gone entirely (auto-clear-on-save dropped the stale fields).',
  'Setting Generator → "Imperial Core" → NPCs tab — "Yelena" stub appears with seeded_from metadata (will visibly carry the seed once the Phase 2 flow ships; substrate-level it should round-trip).',
];
