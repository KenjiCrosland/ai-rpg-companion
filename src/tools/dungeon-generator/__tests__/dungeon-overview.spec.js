/**
 * Tests for the rewritten dungeon overview prompt + validator.
 *
 * The prompt itself is a long string — we don't test its content
 * verbatim, just smoke-check that key contextual fragments are
 * present (the per-tier monster CRs, the tension description, the
 * banned tropes when supplied, the user's name when supplied). The
 * validator is the load-bearing surface for response shape.
 */

import {
  dungeonOverviewPrompt,
  validateDungeonOverview,
} from '../prompts/dungeon-overview.mjs';
import {
  DUNGEON_TENSION_DESCRIPTIONS,
  DIFFICULTY_TIERS,
  DUNGEON_TRAVERSAL_INVARIANT,
  buildAdjudicatableDangerRule,
  OPERATIONAL_VOICE_BLOCK,
  SCHEMA_LEAK_DIRECTIVE,
  POWER_STRUCTURES,
  POWER_STRUCTURE_DIRECTIVES,
  POWER_STRUCTURE_DOMINANT_POWER_OVERRIDES,
  ORGANIZING_LOGICS,
  ORGANIZING_LOGIC_DIRECTIVES,
  CONTENDER_KINDS,
  CONTENDER_KIND_DIRECTIVES,
  CONTENDER_PRESENT_FRAMING,
  CONTACT_KINDS,
  CONTACT_KIND_DIRECTIVES,
  CONTACT_PRESENT_FRAMING,
  POV_FRAMES,
  POV_FRAME_DIRECTIVES,
  NAME_TEMPLATES,
  MOTIVES,
  MOTIVE_DIRECTIVES,
  MOTIVE_PRESENT_STATE_CLAUSES,
  FORMED_NATURES,
  FORMED_NATURE_FRAMING,
  FORMED_NATURE_DIRECTIVES,
  MODE_MENUS,
  MODE_DIRECTIVES,
} from '../util/dungeon-dimensions.mjs';

// Minimal valid response, used as the base shape for validator tests.
function validResponse() {
  return {
    name: 'Eikheim Barrow',
    title: 'Tomb of the Singing Bones',
    overview: 'A low mound of moss-furred stone, mist clinging to the entrance lintel.',
    quest_hook: 'A factor of the Ash-Bearers offers 200gp and a token of safe-passage if the party recovers the Singing Bones from the central vault before the next full moon.',
    relation_to_larger_setting: 'It sits at the southern edge of the Iron Hills.',
    approach_and_threshold: 'A worn stone stair descends into a chamber lit by phosphorescent lichen.',
    history: 'Built by the Ash-Bearers three centuries ago.',
    dominant_power: 'Vetheras, the lich-king, dreams in the central vault.',
    inhabitants: 'A handful of skeleton wardens, plus a band of cultists camped in the antechamber.',
    notable_inhabitant_facet: 'The cultists have begun arguing among themselves.',
    central_dynamic: 'Vetheras stirs more each cycle of the moon, and the cultists believe his waking is near.',
    present_state: 'The barrow hums faintly at midnight; the air around the central vault has thickened.',
    potential_outcomes: 'The rune-clock can be slowed by hammering the central altar out of tune, which stirs Vetheras more loudly but leaves the cultists behind their vigil. Vetheras can be re-bound into dreamless sleep if his true name is recited at the central vault — the antechamber sigils carry the name, and speaking it before the binding is set draws his attention to whoever spoke. Aldwyn fights when confronted, and his death scatters the cult; the rune-clock keeps ticking either way.',
    named_entities: ['Vetheras', 'Aldwyn'],
    npc_list: [
      { name: 'Vetheras', description: 'The dreaming lich-king.' },
      { name: 'Aldwyn', description: 'The leader of the cultist vigil.' },
      { name: 'Brunhild', description: 'A defected cultist hiding nearby.' },
    ],
    monsters: [
      { type: 'minion', name: 'skeleton warden', description: 'Bone-rattling foot soldier.', danger: 'A hit target makes a DC 12 Strength save or is grappled; the warden drags grappled targets one space toward the reliquary on the start of its turn.', CR: '1/4' },
      { type: 'strong_minion', name: 'wight captain', description: 'Tactical undead leader.', danger: 'A hit target loses 1 Hit Die from their next short rest; the wound feels cold and refuses to clot until magically healed.', CR: '1' },
      { type: 'large_creature', name: 'tomb-wyrm', description: 'A burrowing bone-serpent.', danger: 'A bitten target makes a DC 14 Constitution save or has their movement speed halved by a chilling lesion until the end of their next long rest.', CR: '3' },
    ],
  };
}

describe('dungeonOverviewPrompt — content smoke tests', () => {
  const baseArgs = {
    type: 'chambered-complex',
    character: ['ancient', 'haunted', 'moss-furred'],
    register: 'Old-Norse-inspired: ...',
    userName: null,
    tension: 'sealed-and-stirring',
    difficulty: 1,
    description: '',
    lore: '',
    bannedTropes: [],
  };

  it('includes the dungeon type', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('chambered-complex');
  });

  it('includes character qualities as a comma list', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('ancient, haunted, moss-furred');
  });

  it('includes the register descriptor', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('Old-Norse-inspired');
  });

  it('includes the tension and its full description', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('sealed-and-stirring');
    expect(prompt).toContain(DUNGEON_TENSION_DESCRIPTIONS['sealed-and-stirring']);
  });

  it('includes per-tier monster CRs', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: 3 });
    const t3 = DIFFICULTY_TIERS[3].monsterCRs;
    expect(prompt).toContain(`minion ~${t3.minion}`);
    expect(prompt).toContain(`strong minion ~${t3.strongMinion}`);
    expect(prompt).toContain(`large creature ~${t3.largeCreature}`);
  });

  it('includes the tier name and scope-of-stakes', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: 5 });
    expect(prompt).toContain(DIFFICULTY_TIERS[5].name);
    expect(prompt).toContain(DIFFICULTY_TIERS[5].scopeOfStakes);
  });

  it('emits the user-name directive verbatim when one is supplied', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, userName: 'the Hollow Vault' });
    expect(prompt).toContain('the Hollow Vault');
    expect(prompt).toContain('VERBATIM');
  });

  it('omits the user-name directive when none is supplied', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('register-coherent dungeon name');
  });

  it('emits the anti-clustering ban block when banned tropes are supplied', () => {
    const tropes = [
      'ancient seal weakening: the seal is failing.',
      'lich seeking phylactery: phylactery hunt.',
    ];
    const prompt = dungeonOverviewPrompt({ ...baseArgs, bannedTropes: tropes });
    expect(prompt).toContain('ANTI-CLUSTERING');
    expect(prompt).toContain('ancient seal weakening');
    expect(prompt).toContain('lich seeking phylactery');
  });

  it('omits the anti-clustering block when no banned tropes are supplied', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).not.toContain('ANTI-CLUSTERING');
  });

  it('includes the fantasy-texture requirement', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('FANTASY TEXTURE');
    expect(prompt).toMatch(/NAMED.*PRESENT-TENSE/);
  });

  it('includes boss-vs-miniboss logic', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('BOSS-VS-MINIBOSS LOGIC');
    expect(prompt).toContain('npc_list');
    expect(prompt).toContain('large_creature');
  });

  it('escapes quotes in user description', () => {
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      description: 'a tomb with "the sealed gate"',
    });
    expect(prompt).toContain('\\"the sealed gate\\"');
  });

  it('falls back to Tier 1 CRs for an invalid difficulty', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: 99 });
    expect(prompt).toContain(DIFFICULTY_TIERS[1].name);
  });

  it('omits the POWER STRUCTURE block when powerStructure is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, powerStructure: null });
    // The directive injection-header is the load-bearing match.
    // (Other passages may legitimately reference "POWER STRUCTURE"
    // as a category name — e.g., the schema-leak directive lists the
    // directive blocks by name.)
    expect(prompt).not.toContain('POWER STRUCTURE (pre-rolled');
  });

  it('routes each powerStructure value to its directive in the prompt', () => {
    for (const v of POWER_STRUCTURES) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, powerStructure: v });
      expect(prompt).toContain('POWER STRUCTURE');
      expect(prompt).toContain(POWER_STRUCTURE_DIRECTIVES[v]);
    }
  });

  it('routes non-apex powerStructure values to the dominant_power schema override', () => {
    for (const v of POWER_STRUCTURES) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, powerStructure: v });
      if (v === 'single_apex') {
        // Baseline schema text (single_apex / null share the baseline).
        expect(prompt).toContain('WHO RULES THIS DUNGEON');
      } else {
        expect(prompt).toContain(POWER_STRUCTURE_DOMINANT_POWER_OVERRIDES[v]);
        expect(prompt).not.toContain('WHO RULES THIS DUNGEON');
      }
    }
  });

  it('routes the traversal invariant into the prompt for every powerStructure value', () => {
    for (const v of POWER_STRUCTURES) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, powerStructure: v });
      expect(prompt).toContain(DUNGEON_TRAVERSAL_INVARIANT);
    }
  });

  it('routes the traversal invariant into the prompt even when powerStructure is null or unset', () => {
    expect(dungeonOverviewPrompt({ ...baseArgs, powerStructure: null }))
      .toContain(DUNGEON_TRAVERSAL_INVARIANT);
    expect(dungeonOverviewPrompt(baseArgs)) // baseArgs has no powerStructure key
      .toContain(DUNGEON_TRAVERSAL_INVARIANT);
  });

  // ---- organizingLogic routing ----

  it('omits the ORGANIZING LOGIC block when organizingLogic is null or empty', () => {
    const a = dungeonOverviewPrompt({ ...baseArgs, organizingLogic: null });
    const b = dungeonOverviewPrompt({ ...baseArgs, organizingLogic: [] });
    expect(a).not.toContain('ORGANIZING LOGIC (the BONES');
    expect(b).not.toContain('ORGANIZING LOGIC (the BONES');
  });

  it('routes each organizingLogic anchor to its directive', () => {
    for (const v of ORGANIZING_LOGICS) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, organizingLogic: [v] });
      expect(prompt).toContain('ORGANIZING LOGIC (the BONES');
      expect(prompt).toContain(ORGANIZING_LOGIC_DIRECTIVES[v]);
    }
  });

  it('composite organizingLogic (length 2) injects BOTH directives', () => {
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      organizingLogic: ['funerary', 'inhabited_base'],
    });
    expect(prompt).toContain(ORGANIZING_LOGIC_DIRECTIVES.funerary);
    expect(prompt).toContain(ORGANIZING_LOGIC_DIRECTIVES.inhabited_base);
  });

  it('composite organizingLogic preserves order in the prompt', () => {
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      organizingLogic: ['production', 'funerary'],
    });
    const productionIdx = prompt.indexOf(ORGANIZING_LOGIC_DIRECTIVES.production);
    const funeraryIdx = prompt.indexOf(ORGANIZING_LOGIC_DIRECTIVES.funerary);
    expect(productionIdx).toBeGreaterThan(0);
    expect(funeraryIdx).toBeGreaterThan(productionIdx);
  });

  // ---- thirdParty routing ----

  it('omits the CONTENDER + CONTACT blocks when thirdParty is null or absent', () => {
    const a = dungeonOverviewPrompt({ ...baseArgs, thirdParty: null });
    const b = dungeonOverviewPrompt({ ...baseArgs, thirdParty: { present: false } });
    for (const prompt of [a, b]) {
      expect(prompt).not.toContain(CONTENDER_PRESENT_FRAMING);
      expect(prompt).not.toContain(CONTACT_PRESENT_FRAMING);
    }
  });

  it('routes the contender present framing + per-kind directive for every adversary kind', () => {
    for (const kind of CONTENDER_KINDS) {
      const prompt = dungeonOverviewPrompt({
        ...baseArgs,
        thirdParty: { present: true, type: 'adversary', kind },
      });
      expect(prompt).toContain(CONTENDER_PRESENT_FRAMING);
      expect(prompt).toContain(CONTENDER_KIND_DIRECTIVES[kind]);
      // Ally framing should NOT leak when type is adversary.
      expect(prompt).not.toContain(CONTACT_PRESENT_FRAMING);
    }
  });

  it('routes the contact present framing + per-kind directive for every ally kind', () => {
    for (const kind of CONTACT_KINDS) {
      const prompt = dungeonOverviewPrompt({
        ...baseArgs,
        thirdParty: { present: true, type: 'ally', kind },
      });
      expect(prompt).toContain(CONTACT_PRESENT_FRAMING);
      expect(prompt).toContain(CONTACT_KIND_DIRECTIVES[kind]);
      // Adversary framing should NOT leak when type is ally.
      expect(prompt).not.toContain(CONTENDER_PRESENT_FRAMING);
    }
  });

  it('falls back to framing-only when adversary kind is missing or unknown', () => {
    const noKind = dungeonOverviewPrompt({
      ...baseArgs,
      thirdParty: { present: true, type: 'adversary' },
    });
    expect(noKind).toContain(CONTENDER_PRESENT_FRAMING);
    const unknown = dungeonOverviewPrompt({
      ...baseArgs,
      thirdParty: { present: true, type: 'adversary', kind: 'not_a_real_kind' },
    });
    expect(unknown).toContain(CONTENDER_PRESENT_FRAMING);
  });

  it('falls back to framing-only when ally kind is missing or unknown', () => {
    const noKind = dungeonOverviewPrompt({
      ...baseArgs,
      thirdParty: { present: true, type: 'ally' },
    });
    expect(noKind).toContain(CONTACT_PRESENT_FRAMING);
    const unknown = dungeonOverviewPrompt({
      ...baseArgs,
      thirdParty: { present: true, type: 'ally', kind: 'not_a_real_kind' },
    });
    expect(unknown).toContain(CONTACT_PRESENT_FRAMING);
  });

  it('current_occupation field text references the third party only when present', () => {
    const absent = dungeonOverviewPrompt({ ...baseArgs, thirdParty: { present: false } });
    const adv = dungeonOverviewPrompt({
      ...baseArgs,
      thirdParty: { present: true, type: 'adversary', kind: 'rival_expedition' },
    });
    const ally = dungeonOverviewPrompt({
      ...baseArgs,
      thirdParty: { present: true, type: 'ally', kind: 'informant' },
    });
    expect(absent).not.toContain('THIRD PARTY');
    expect(adv).toContain('THIRD PARTY (adversary');
    expect(ally).toContain('THIRD PARTY (ally');
  });

  // ---- OPERATIONAL_VOICE_BLOCK + POV overview carve-out ----

  it('always injects SCHEMA_LEAK_DIRECTIVE in the prompt', () => {
    expect(dungeonOverviewPrompt(baseArgs)).toContain(SCHEMA_LEAK_DIRECTIVE);
    for (const ps of POWER_STRUCTURES) {
      expect(dungeonOverviewPrompt({ ...baseArgs, powerStructure: ps }))
        .toContain(SCHEMA_LEAK_DIRECTIVE);
    }
  });

  it('always injects OPERATIONAL_VOICE_BLOCK in the prompt', () => {
    // Verify block is present across the full dimension matrix.
    const promptNoPov = dungeonOverviewPrompt(baseArgs);
    expect(promptNoPov).toContain(OPERATIONAL_VOICE_BLOCK);
    for (const ps of POWER_STRUCTURES) {
      for (const frame of POV_FRAMES) {
        const prompt = dungeonOverviewPrompt({ ...baseArgs, powerStructure: ps, povFrame: frame });
        expect(prompt).toContain(OPERATIONAL_VOICE_BLOCK);
      }
    }
  });

  it('overview schema field text says it is the carve-out from operational voice', () => {
    // The carve-out is structural: overview's schema instruction itself
    // states it is the exception. We verify by substring match against
    // the schema instruction's own wording (loaded from the prompt).
    const promptNoPov = dungeonOverviewPrompt(baseArgs);
    expect(promptNoPov).toMatch(/"overview"\s*:\s*"[^"]*ONE EXCEPTION to the OPERATIONAL VOICE/);
    const promptWithPov = dungeonOverviewPrompt({ ...baseArgs, povFrame: 'survivor' });
    expect(promptWithPov).toMatch(/"overview"\s*:\s*"[^"]*ONE EXCEPTION to the OPERATIONAL VOICE/);
  });

  it('omits the POV FRAME block when povFrame is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, povFrame: null });
    for (const frame of POV_FRAMES) {
      expect(prompt).not.toContain(POV_FRAME_DIRECTIVES[frame]);
    }
  });

  it('routes each povFrame value to its directive', () => {
    for (const frame of POV_FRAMES) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, povFrame: frame });
      expect(prompt).toContain(POV_FRAME_DIRECTIVES[frame]);
    }
  });

  it('interpolates the rolled povFrame name into the overview schema instruction when set', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, povFrame: 'survivor' });
    expect(prompt).toMatch(/"overview"\s*:\s*"[^"]*frame rolled for THIS generation is survivor/);
  });

  it('does not replace the overview schema with the legacy ATMOSPHERIC VIGNETTE text', () => {
    // The re-spec replaces atmospheric prose with POV hook framing.
    // This pins the change so a future regression to the old text fails loudly.
    const prompt = dungeonOverviewPrompt({ ...baseArgs, povFrame: 'sages_rumor' });
    expect(prompt).not.toContain('ATMOSPHERIC VIGNETTE');
  });

  // ---- placeType routing ----

  it('injects the pre-rolled place-type as a hard constraint when set', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, placeType: 'Foundry' });
    expect(prompt).toContain('USE EXACTLY "Foundry"');
    // The free-list vocabulary line is suppressed when the constraint fires.
    expect(prompt).not.toContain('Place-type vocabulary (use ONE per name');
  });

  it('falls back to the free-list vocabulary when placeType is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, placeType: null });
    expect(prompt).toContain('Place-type vocabulary (use ONE per name');
    expect(prompt).not.toContain('USE EXACTLY');
  });

  // ---- nameTemplate routing ----

  it('injects the pre-rolled name template as the sole shape when set', () => {
    for (const tpl of NAME_TEMPLATES) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, nameTemplate: tpl });
      expect(prompt).toContain(`Template ${tpl.id} — ${tpl.shape}`);
      // Full template listing is suppressed when the constraint fires.
      expect(prompt).not.toContain('NAME TEMPLATES — pick ONE per generation');
    }
  });

  it('falls back to the full template listing when nameTemplate is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, nameTemplate: null });
    expect(prompt).toContain('NAME TEMPLATES — pick ONE per generation');
  });

  it('always injects the IMAGE-FROM-CONTENT rule regardless of template', () => {
    // The load-bearing requirement is the image-from-content rule;
    // it applies whether nameTemplate is pre-rolled or free.
    const withTpl = dungeonOverviewPrompt({ ...baseArgs, nameTemplate: NAME_TEMPLATES[0] });
    const noTpl = dungeonOverviewPrompt({ ...baseArgs, nameTemplate: null });
    expect(withTpl).toContain('IMAGE-FROM-CONTENT');
    expect(noTpl).toContain('IMAGE-FROM-CONTENT');
  });

  it('name and title appear LAST in the JSON schema body (after monsters)', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs });
    // The schema body has "monsters" appearing before "name" and "title".
    // Find the SCHEMA-LEVEL keys (2-space indent). The nested "name" in
    // npc_list / monsters uses 6-space indent so won't match.
    const monstersIdx = prompt.indexOf('\n  "monsters": [');
    const nameSchemaIdx = prompt.indexOf('\n  "name": ');
    const titleSchemaIdx = prompt.indexOf('\n  "title": "');
    expect(monstersIdx).toBeGreaterThan(-1);
    expect(nameSchemaIdx).toBeGreaterThan(monstersIdx);
    expect(titleSchemaIdx).toBeGreaterThan(nameSchemaIdx);
  });

  // ---- motive routing ----

  it('omits the MOTIVE block when motive is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, motive: null });
    for (const m of MOTIVES) {
      expect(prompt).not.toContain(MOTIVE_DIRECTIVES[m]);
    }
  });

  it('routes each motive to its directive in the prompt', () => {
    for (const m of MOTIVES) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, motive: m });
      expect(prompt).toContain(MOTIVE_DIRECTIVES[m]);
    }
  });

  it('appends motive-aware clause to present_state when set', () => {
    // difficulty_level field was dropped; only present_state still
    // receives a motive-aware clause.
    for (const m of ['acquisition', 'prevention', 'recovery', 'discovery']) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, motive: m });
      expect(prompt).toContain(MOTIVE_PRESENT_STATE_CLAUSES[m]);
    }
  });

  it('omits motive-aware clauses when motive is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, motive: null });
    for (const m of ['acquisition', 'prevention', 'recovery', 'discovery']) {
      expect(prompt).not.toContain(MOTIVE_PRESENT_STATE_CLAUSES[m]);
    }
  });

  it('appends the prize-naming clause to central_dynamic ONLY for motive=acquisition', () => {
    const prizeAnchor = 'central_dynamic MUST name the PRIZE';
    for (const m of MOTIVES) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, motive: m });
      if (m === 'acquisition') {
        expect(prompt).toContain(prizeAnchor);
      } else {
        expect(prompt).not.toContain(prizeAnchor);
      }
    }
  });

  // ---- formedNature routing ----

  it('omits the FORMED NATURE block when formedNature is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, formedNature: null });
    expect(prompt).not.toContain(FORMED_NATURE_FRAMING);
    for (const v of FORMED_NATURES) {
      expect(prompt).not.toContain(FORMED_NATURE_DIRECTIVES[v]);
    }
  });

  it('routes each formedNature value to its directive + the shared framing', () => {
    for (const v of FORMED_NATURES) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, formedNature: v });
      expect(prompt).toContain(FORMED_NATURE_FRAMING);
      expect(prompt).toContain(FORMED_NATURE_DIRECTIVES[v]);
    }
  });

  // ---- mode routing ----

  it('omits the MODE block + difficulty clause when mode is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, mode: null });
    // No mode directive in the prompt.
    for (const m of Object.keys(MODE_DIRECTIVES)) {
      expect(prompt).not.toContain(MODE_DIRECTIVES[m]);
    }
    // No mode-conditional difficulty clause either.
    expect(prompt).not.toContain('Mode-conditional rating');
  });

  it('routes each mode (across every menu) to its directive in the prompt', () => {
    // Iterate every mode in every holder's menu — exhaustive dispatch test.
    const allModes = new Set();
    for (const menu of Object.values(MODE_MENUS)) {
      for (const m of menu) allModes.add(m);
    }
    for (const m of allModes) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, mode: m });
      expect(prompt).toContain(MODE_DIRECTIVES[m]);
    }
  });

});

describe('validateDungeonOverview', () => {
  it('accepts a well-shaped response', () => {
    expect(validateDungeonOverview(JSON.stringify(validResponse()))).toBe(true);
  });

  it('accepts empty strings for the optional facet field', () => {
    const r = validResponse();
    r.notable_inhabitant_facet = '';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(true);
  });

  it('accepts the response when the optional facet field is missing entirely', () => {
    const r = validResponse();
    delete r.notable_inhabitant_facet;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(true);
  });

  it('rejects malformed JSON', () => {
    expect(validateDungeonOverview('{not json')).toBe(false);
    expect(validateDungeonOverview('')).toBe(false);
  });

  it('rejects when a required string field is missing', () => {
    const r = validResponse();
    delete r.overview;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when a required string field is empty', () => {
    const r = validResponse();
    r.dominant_power = '';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when a required field is wrong type', () => {
    const r = validResponse();
    r.history = 123;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when named_entities is not an array', () => {
    const r = validResponse();
    r.named_entities = 'Vetheras, Aldwyn';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when named_entities contains non-strings', () => {
    const r = validResponse();
    r.named_entities = ['Vetheras', 42];
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when npc_list is empty', () => {
    const r = validResponse();
    r.npc_list = [];
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when an npc entry is malformed', () => {
    const r = validResponse();
    r.npc_list = [{ name: 'Vetheras' }]; // missing description
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when monsters has != 3 entries', () => {
    const r = validResponse();
    r.monsters = [r.monsters[0], r.monsters[1]];
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when monster types do not cover minion + strong_minion + large_creature', () => {
    const r = validResponse();
    r.monsters[2].type = 'minion';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when a monster entry is missing name', () => {
    const r = validResponse();
    delete r.monsters[0].name;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('accepts numeric CR alongside string CR', () => {
    const r = validResponse();
    r.monsters[0].CR = 0.25;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(true);
  });

  it('rejects when monster is missing a CR field', () => {
    const r = validResponse();
    delete r.monsters[1].CR;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when a monster entry is missing the danger field', () => {
    const r = validResponse();
    delete r.monsters[0].danger;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when a monster entry has empty-string danger', () => {
    const r = validResponse();
    r.monsters[1].danger = '';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when a monster entry has wrong-type danger', () => {
    const r = validResponse();
    r.monsters[2].danger = ['save', 'effect'];
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('accepts a well-shaped monster array with danger populated', () => {
    const r = validResponse();
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(true);
    for (const monster of r.monsters) {
      expect(typeof monster.danger).toBe('string');
      expect(monster.danger.length).toBeGreaterThan(0);
    }
  });

  // ---- quest_hook + resolution_paths ----

  it('rejects when quest_hook is missing', () => {
    const r = validResponse();
    delete r.quest_hook;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when quest_hook is empty string', () => {
    const r = validResponse();
    r.quest_hook = '';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when potential_outcomes is missing', () => {
    const r = validResponse();
    delete r.potential_outcomes;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when potential_outcomes is empty string', () => {
    const r = validResponse();
    r.potential_outcomes = '';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when potential_outcomes is wrong type', () => {
    const r = validResponse();
    r.potential_outcomes = ['array', 'instead', 'of', 'prose'];
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('accepts a well-shaped potential_outcomes paragraph', () => {
    const r = validResponse();
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(true);
    expect(typeof r.potential_outcomes).toBe('string');
    expect(r.potential_outcomes.length).toBeGreaterThan(0);
  });

});

describe('dungeonOverviewPrompt — monsterPopulation routing', () => {
  const baseArgs = {
    type: 'chambered-complex',
    character: ['ancient', 'haunted'],
    register: 'Old-Norse-inspired: ...',
    userName: null,
    tension: 'sealed-and-stirring',
    difficulty: 1,
  };

  it('omits the MINION POPULATION block when monsterPopulation is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, monsterPopulation: null });
    expect(prompt).not.toContain('MINION POPULATION (pre-rolled');
  });

  it('omits the MINION POPULATION block when monsterPopulation is missing required fields', () => {
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      monsterPopulation: { creature_type: 'humanoid' }, // missing relation
    });
    expect(prompt).not.toContain('MINION POPULATION (pre-rolled');
  });

  it('injects the MINION POPULATION block when monsterPopulation has both fields', () => {
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      monsterPopulation: { creature_type: 'undead', relation: 'dominant_power_thrall' },
    });
    expect(prompt).toContain('MINION POPULATION (pre-rolled');
    // The rolled values surface in the constraint block.
    expect(prompt).toContain('"undead"');
    expect(prompt).toContain('"dominant_power_thrall"');
  });

  it('injects the rolled relation directive verbatim', () => {
    const { RELATION_DIRECTIVES } = require('../util/dungeon-dimensions.mjs');
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      monsterPopulation: { creature_type: 'humanoid', relation: 'dominant_power_devotee' },
    });
    expect(prompt).toContain(RELATION_DIRECTIVES.dominant_power_devotee);
  });

  it('the population block explicitly EXCLUDES the large_creature slot', () => {
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      monsterPopulation: { creature_type: 'humanoid', relation: 'dominant_power_devotee' },
    });
    // The block must communicate that the apex/large_creature is
    // distinct from the minion population.
    expect(prompt).toMatch(/large_creature is a DISTINCT apex/i);
  });
});

describe('dungeonOverviewPrompt — creature tradition routing', () => {
  const baseArgs = {
    type: 'chambered-complex',
    character: ['ancient', 'haunted', 'moss-furred'],
    userName: null,
    tension: 'sealed-and-stirring',
    difficulty: 1,
    description: '',
    lore: '',
    bannedTropes: [],
  };

  it('injects the CREATURE TRADITION block when the rolled register has one', () => {
    // Norse-inspired is a Western-canonical register and was given a
    // creatureTradition in the 2026-05 register-injection work.
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      register: 'Norse-inspired: harsh consonants, primal force',
    });
    expect(prompt).toContain('CREATURE TRADITION');
  });

  it('emits a register-specific tradition (Dwarven vs Egyptian produce different content)', () => {
    // Routing test: the block content must be sourced from the
    // register entry, not a static hardcoded list. Different rolled
    // registers must produce different creature-tradition content.
    const dwarvenPrompt = dungeonOverviewPrompt({
      ...baseArgs,
      register: 'Dwarven: deep, hard-consonanted, mountain-rooted',
    });
    const egyptianPrompt = dungeonOverviewPrompt({
      ...baseArgs,
      register: 'Egyptian-inspired (pharaonic period only): ancient Egyptian register',
    });
    expect(dwarvenPrompt).toContain('CREATURE TRADITION');
    expect(egyptianPrompt).toContain('CREATURE TRADITION');
    // The two must be distinguishable — a register-specific creature
    // (Dwarven: knockers / Egyptian: ammit) appears in one but not the
    // other. This catches a regression where the block reverts to a
    // static hardcoded list.
    expect(dwarvenPrompt).toContain('knockers');
    expect(dwarvenPrompt).not.toContain('ammit');
    expect(egyptianPrompt).toContain('ammit');
    expect(egyptianPrompt).not.toContain('knockers');
  });

  it('omits the CREATURE TRADITION block when the rolled register has none (protected catchall)', () => {
    // Protected registers (Yoruba, Maori, Arabic, Japanese, etc.) were
    // intentionally left without creatureTradition during the
    // injection work, to avoid invoking sacred figures from living
    // traditions. The block must omit cleanly in that case.
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      register: 'Japanese-inspired: clean syllables, natural imagery',
    });
    // The CREATURE TRADITION block header includes the parenthetical
    // "(for monsters / inhabitants / supernatural identity)". The
    // bare phrase "CREATURE TRADITION" may also appear elsewhere
    // (FANTASY TEXTURE references it by name) — match the block header
    // specifically.
    expect(prompt).not.toMatch(/CREATURE TRADITION \(for/);
  });

  it('omits the CREATURE TRADITION block when register is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, register: null });
    expect(prompt).not.toMatch(/CREATURE TRADITION \(for/);
  });

  it('does not re-introduce the legacy hardcoded creature table in FANTASY TEXTURE REQUIREMENT', () => {
    // Regression guard: the old prompt had a hardcoded 5-line creature
    // table (Norse → draugr, jötunn, fylgja, vættir; Celtic → sídhe,
    // púca; etc.) inside FANTASY TEXTURE REQUIREMENT. That table was
    // replaced by the dynamic CREATURE TRADITION block sourced from
    // each register's entry. The bullet list (with the "→" arrow that
    // characterized it) must not return.
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      register: 'Norse-inspired: harsh consonants, primal force',
    });
    // The legacy block paired "Norse" with "fylgja" / "vættir" in a
    // single arrow-mapped bullet line. The new block emits Norse
    // creatures via the register's creatureTradition prose, not as a
    // bullet table — the arrow form is the canary.
    expect(prompt).not.toMatch(/Norse\s*→\s*draugr/);
  });

  it('injects the MATERIAL TRADITION block when the rolled register has one', () => {
    // Parallel to the creatureTradition routing test. Norse-inspired
    // is non-protected and was given a materialTradition in the
    // 2026-05 material-injection work.
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      register: 'Norse-inspired: harsh consonants, primal force',
    });
    expect(prompt).toContain('MATERIAL TRADITION FOR THIS REGISTER');
    // The directive wording the user specified must be intact.
    expect(prompt).toMatch(/draw from these materials before reaching for generic/);
  });

  it('emits a register-specific material tradition (Egyptian vs Norse produce different content)', () => {
    // Routing test: the block content must be sourced from the register
    // entry. Egyptian materials (natron, kohl) and Norse materials (ice,
    // amber, frozen blood) should appear in their respective prompts
    // and NOT cross-contaminate.
    const norsePrompt = dungeonOverviewPrompt({
      ...baseArgs,
      register: 'Norse-inspired: harsh consonants, primal force',
    });
    const egyptianPrompt = dungeonOverviewPrompt({
      ...baseArgs,
      register: 'Egyptian-inspired (pharaonic period only): ancient Egyptian register',
    });
    expect(norsePrompt).toContain('frozen blood');
    expect(norsePrompt).not.toContain('natron');
    expect(egyptianPrompt).toContain('natron');
    expect(egyptianPrompt).not.toContain('frozen blood');
  });

  it('omits the MATERIAL TRADITION block when the rolled register has none (protected catchall)', () => {
    // Protected registers were intentionally left without
    // materialTradition (parallel to creatureTradition). The block
    // must omit cleanly in that case.
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      register: 'Japanese-inspired: clean syllables, natural imagery',
    });
    expect(prompt).not.toContain('MATERIAL TRADITION FOR THIS REGISTER');
  });

  it('omits the MATERIAL TRADITION block when register is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, register: null });
    expect(prompt).not.toContain('MATERIAL TRADITION FOR THIS REGISTER');
  });
});

describe('dungeonOverviewPrompt — adjudicatable-danger rule routing', () => {
  const baseArgs = {
    type: 'chambered-complex',
    character: ['ancient', 'haunted', 'moss-furred'],
    register: 'Old-Norse-inspired: ...',
    userName: null,
    tension: 'sealed-and-stirring',
    description: '',
    lore: '',
    bannedTropes: [],
  };

  it('injects the ADJUDICATABLE-DANGER RULE header at every tier', () => {
    for (const tier of [1, 2, 3, 4, 5]) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: tier });
      expect(prompt).toContain('ADJUDICATABLE-DANGER RULE');
    }
  });

  it('routes the Tier N danger shelf into the prompt for every tier', () => {
    for (const tier of [1, 2, 3, 4, 5]) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: tier });
      expect(prompt).toContain(`TIER ${tier} DANGER SHELF`);
      expect(prompt).toContain(DIFFICULTY_TIERS[tier].dangerShelf);
    }
  });

  it('Tier 1 and Tier 5 shelves are different (severity differs, not effect type)', () => {
    // Under the new severity-not-effect-type philosophy, Tier 1 must
    // describe recoverable severity and Tier 5 must describe
    // permanent / near-permanent severity. Effect TYPES are not
    // gated by tier — a fire snake bites and burns at every tier.
    const t1 = dungeonOverviewPrompt({ ...baseArgs, difficulty: 1 });
    const t5 = dungeonOverviewPrompt({ ...baseArgs, difficulty: 5 });
    expect(t1).toMatch(/recoverable|short rest/i);
    expect(t5).toMatch(/permanent|near-permanent|doesn't stop on its own/i);
    expect(t1).not.toContain(DIFFICULTY_TIERS[5].dangerShelf);
    expect(t5).not.toContain(DIFFICULTY_TIERS[1].dangerShelf);
  });

  it('Tier 1 shelf describes recoverable severity', () => {
    // The Tier 1 shelf says "painful, recoverable with basic rest or
    // mundane care" — character is fine after a short rest plus
    // basic care.
    const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: 1 });
    expect(prompt).toMatch(/painful.*recoverable/i);
  });

  it('Tier 5 shelf describes permanent / near-permanent severity', () => {
    // Under the new philosophy, T5 is about SEVERITY that doesn't
    // stop on its own — not a specific list of effect types
    // (petrification, ability drain). The same effect from a lower
    // tier could appear at T5; what changes is how it persists.
    const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: 5 });
    expect(prompt).toMatch(/permanent|doesn't stop on its own/i);
    expect(prompt).toMatch(/Wish-grade|regeneration-grade|comparable/i);
  });

  it('the rule philosophy reaches each monster danger field', () => {
    // Each of minion / strong_minion / large_creature has its own
    // danger instruction. The rule's philosophy (anecdote shape,
    // no dice / DCs, no psychic-as-default, statblock generator
    // handles mechanics) is inlined into each field.
    const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: 3 });
    expect(prompt).toMatch(/no dice|no DCs|the statblock carries the math|statblock generator/i);
    expect(prompt).toMatch(/no psychic|psychic.*default/i);
    expect(prompt).toMatch(/last person it reached|last named victim|last victim|anecdote/i);
  });

  it('falls back to Tier 1 shelf for an invalid difficulty', () => {
    // Mirrors the existing 'falls back to Tier 1 CRs for an invalid
    // difficulty' regression. The danger shelf must follow the same
    // fallback path so the prompt is internally consistent.
    const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: 99 });
    expect(prompt).toContain('TIER 1 DANGER SHELF');
    expect(prompt).toContain(DIFFICULTY_TIERS[1].dangerShelf);
  });

  it('interpolates a tier-appropriate creature into the rule header (Norse Tier 5 picks from scary bucket)', () => {
    // The rule's worked example used to bake in a specific creature
    // name ("Sirmus"). Now it pulls from the rolled register's
    // tier-bucketed list and varies per generation. A Norse Tier 5
    // prompt should contain a creature from the Norse scary bucket.
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      difficulty: 5,
      register: 'Norse-inspired: harsh consonants, primal force',
      rng: () => 0,
    });
    expect(prompt).toMatch(/draugr|jötunn|lindworm|fenrisúlfr|trolls of the high country/i);
  });

  it('interpolates a register-appropriate material into the rule header', () => {
    // Egyptian materialTradition includes natron. With a non-null
    // register and at least one material, the rule header's
    // INHABITANTS APPLICATION example contains a real material —
    // not the bracket-placeholder fallback.
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      difficulty: 3,
      register: 'Egyptian-inspired (pharaonic period only): ...',
      rng: () => 0,
    });
    // At least one Egyptian-tradition material should appear in the rule header.
    expect(prompt).toMatch(/natron|bitumen|linen|alabaster dust|kohl|faience/);
  });

  it('uses bracket-placeholder fallbacks for protected registers (no tradition data)', () => {
    // Japanese-inspired is protected and carries no
    // creatureTraditionByTier nor materialTradition. The rule
    // header's example should fall back to bracket placeholders,
    // not crash and not omit the example.
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      difficulty: 3,
      register: 'Japanese-inspired: clean syllables, natural imagery',
    });
    expect(prompt).toMatch(/\[register-creature\]/);
    expect(prompt).toMatch(/\[register-material/);
  });

  it('does not bake the legacy cargo-cult names into prompt examples', () => {
    // Regression guard: "Sirmus" (creature) and "wax" (material)
    // were cargo-culting through the prompt's worked examples.
    // Neither should appear anywhere in the prompt — not the rule
    // header, not the inhabitants schema field, not the hazards
    // schema field, not the large_creature evidence example.
    // (The bell ban entry references bells by name and is exempt.)
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      difficulty: 5,
      register: 'Norse-inspired: ...',
      rng: () => 0,
    });
    expect(prompt).not.toMatch(/\bSirmus\b/);
    // The bells ban still references "wax" via the literal phrase
    // "candle-marks" — guard tightly on the cargo-cult bigrams.
    expect(prompt).not.toMatch(/wax-bodied|wax-constructs|wax-seal still warm|wax is melted|wax packed/);
  });

  it('interpolates character names from registerPool when provided', () => {
    // The potential_outcomes worked example and Template E examples
    // used invented NPC names (Sturmgeister / Loscán / Zenta /
    // Aethorix / Gwenfaer / Vetheras). Now they pull from the rolled
    // registerPool subset and vary per generation.
    const fakePool = ['Veshir', 'Thramnik', 'Korbalin', 'Yolwen', 'Pravos', 'Murenna'];
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      difficulty: 3,
      register: 'Norse-inspired: ...',
      registerPool: fakePool,
    });
    // At least the first two names from the pool should appear in
    // the prompt's interpolated worked examples.
    expect(prompt).toContain('Veshir');
    expect(prompt).toContain('Thramnik');
    // And the legacy hardcoded names should be gone.
    expect(prompt).not.toMatch(/\bSturmgeister\b/);
    expect(prompt).not.toMatch(/\bLoscán\b/);
    expect(prompt).not.toMatch(/\bAethorix\b/);
    expect(prompt).not.toMatch(/\bGwenfaer\b/);
    expect(prompt).not.toMatch(/\bVetheras\b/);
  });

  it('rule requires attribution to a named source (no free-floating dangers)', () => {
    // Every mechanical consequence belongs to a named creature, hazard,
    // ritual — not a generic environmental drain.
    const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: 5 });
    expect(prompt).toMatch(/attributed to a named source|named source|no free-floating/i);
  });
});
