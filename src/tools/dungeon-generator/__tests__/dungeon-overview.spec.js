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
  POV_FRAMES,
  POV_FRAME_DIRECTIVES,
  NAME_TEMPLATES,
  CONTACT_RELIABILITIES,
  CONTACT_OFFERS,
  CONTACT_PRESENT_FRAMING,
  CONTACT_RELIABILITY_DIRECTIVES,
  CONTACT_OFFERS_DIRECTIVES,
  CONTACT_INVENT_DIRECTIVE,
  MOTIVES,
  MOTIVE_DIRECTIVES,
  MOTIVE_PRESENT_STATE_CLAUSES,
  MOTIVE_DIFFICULTY_CLAUSES,
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
    relation_to_larger_setting: 'It sits at the southern edge of the Iron Hills.',
    approach_and_threshold: 'A worn stone stair descends into a chamber lit by phosphorescent lichen.',
    history: 'Built by the Ash-Bearers three centuries ago.',
    dominant_power: 'Vetheras, the lich-king, dreams in the central vault.',
    inhabitants: 'A handful of skeleton wardens, plus a band of cultists camped in the antechamber.',
    notable_inhabitant_facet: 'The cultists have begun arguing among themselves.',
    hazards_and_dangers: 'The doors close on a slow rune-clock; the central vault is warded against sound.',
    notable_hazard_facet: '',
    central_dynamic: 'Vetheras stirs more each cycle of the moon, and the cultists believe his waking is near.',
    current_occupation: 'Three cultists are conducting the seventh of nine planned vigils.',
    present_state: 'The barrow hums faintly at midnight; the air around the central vault has thickened.',
    difficulty_level: 'A Tier 1 dungeon suited for novice adventurers with local stakes.',
    named_entities: ['Vetheras', 'Aldwyn'],
    npc_list: [
      { name: 'Vetheras', description: 'The dreaming lich-king.' },
      { name: 'Aldwyn', description: 'The leader of the cultist vigil.' },
      { name: 'Brunhild', description: 'A defected cultist hiding nearby.' },
    ],
    monsters: [
      { type: 'minion', name: 'skeleton warden', description: 'Bone-rattling foot soldier.', CR: '1/4' },
      { type: 'strong_minion', name: 'wight captain', description: 'Tactical undead leader.', CR: '1' },
      { type: 'large_creature', name: 'tomb-wyrm', description: 'A burrowing bone-serpent.', CR: '3' },
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
    expect(prompt).toContain('FANTASY TEXTURE REQUIREMENT');
    expect(prompt).toContain('NAMED and PRESENT-TENSE');
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

  // ---- contender routing ----

  it('omits the CONTENDER block when contender is null or absent', () => {
    const a = dungeonOverviewPrompt({ ...baseArgs, contender: null });
    const b = dungeonOverviewPrompt({ ...baseArgs, contender: { present: false } });
    expect(a).not.toContain(CONTENDER_PRESENT_FRAMING);
    expect(b).not.toContain(CONTENDER_PRESENT_FRAMING);
  });

  it('routes the contender present framing + per-kind directive for every kind', () => {
    for (const kind of CONTENDER_KINDS) {
      const prompt = dungeonOverviewPrompt({
        ...baseArgs,
        contender: { present: true, kind },
      });
      expect(prompt).toContain(CONTENDER_PRESENT_FRAMING);
      expect(prompt).toContain(CONTENDER_KIND_DIRECTIVES[kind]);
    }
  });

  it('falls back to framing-only when kind is missing or unknown', () => {
    // No kind: framing still injects; no spurious directive.
    const noKind = dungeonOverviewPrompt({
      ...baseArgs,
      contender: { present: true },
    });
    expect(noKind).toContain(CONTENDER_PRESENT_FRAMING);
    // Unknown kind: framing still injects; no spurious directive.
    const unknown = dungeonOverviewPrompt({
      ...baseArgs,
      contender: { present: true, kind: 'not_a_real_kind' },
    });
    expect(unknown).toContain(CONTENDER_PRESENT_FRAMING);
  });

  it('current_occupation field text references the contender only when present', () => {
    const absent = dungeonOverviewPrompt({ ...baseArgs, contender: { present: false } });
    const present = dungeonOverviewPrompt({
      ...baseArgs,
      contender: { present: true, kind: 'rival_expedition' },
    });
    expect(absent).not.toContain('CONTENDER (rival outsider) has been pre-rolled');
    expect(present).toContain('CONTENDER (rival outsider) has been pre-rolled');
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
      // Full template listing + bias warning are suppressed when the
      // constraint fires.
      expect(prompt).not.toContain('NAME TEMPLATES — pick ONE per generation');
      expect(prompt).not.toContain('TEMPLATE-BIAS WARNING');
    }
  });

  it('falls back to the full template listing + bias warning when nameTemplate is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, nameTemplate: null });
    expect(prompt).toContain('NAME TEMPLATES — pick ONE per generation');
    expect(prompt).toContain('TEMPLATE-BIAS WARNING');
  });

  it('injects the compound-adjective nudge only for templates B and F', () => {
    for (const tpl of NAME_TEMPLATES) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, nameTemplate: tpl });
      const expectNudge = tpl.id === 'B' || tpl.id === 'F';
      if (expectNudge) {
        expect(prompt).toContain('SINGLE-WORD adjective');
        expect(prompt).toContain('compound hyphenated adjectives');
      } else {
        expect(prompt).not.toContain('SINGLE-WORD adjective');
      }
    }
  });

  // ---- contact routing ----

  it('omits the CONTACT block when contact is null or absent', () => {
    const a = dungeonOverviewPrompt({ ...baseArgs, contact: null });
    const b = dungeonOverviewPrompt({ ...baseArgs, contact: { present: false } });
    expect(a).not.toContain(CONTACT_PRESENT_FRAMING);
    expect(a).not.toContain(CONTACT_INVENT_DIRECTIVE);
    expect(b).not.toContain(CONTACT_PRESENT_FRAMING);
    expect(b).not.toContain(CONTACT_INVENT_DIRECTIVE);
  });

  it('routes the contact present framing + reliability + offers directives when present', () => {
    for (const reliability of CONTACT_RELIABILITIES) {
      for (const offers of CONTACT_OFFERS) {
        const prompt = dungeonOverviewPrompt({
          ...baseArgs,
          contact: { present: true, reliability, offers },
        });
        expect(prompt).toContain(CONTACT_PRESENT_FRAMING);
        expect(prompt).toContain(CONTACT_RELIABILITY_DIRECTIVES[reliability]);
        expect(prompt).toContain(CONTACT_OFFERS_DIRECTIVES[offers]);
      }
    }
  });

  it('routes the open-slot directive when contact.openSlot is true', () => {
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      contact: { present: true, openSlot: true },
    });
    expect(prompt).toContain(CONTACT_INVENT_DIRECTIVE);
    expect(prompt).not.toContain(CONTACT_PRESENT_FRAMING);
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

  it('appends motive-aware clauses to present_state and difficulty_level when set', () => {
    for (const m of ['acquisition', 'prevention', 'recovery', 'discovery']) {
      const prompt = dungeonOverviewPrompt({ ...baseArgs, motive: m });
      expect(prompt).toContain(MOTIVE_PRESENT_STATE_CLAUSES[m]);
      expect(prompt).toContain(MOTIVE_DIFFICULTY_CLAUSES[m]);
    }
  });

  it('omits motive-aware clauses when motive is null', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, motive: null });
    for (const m of ['acquisition', 'prevention', 'recovery', 'discovery']) {
      expect(prompt).not.toContain(MOTIVE_PRESENT_STATE_CLAUSES[m]);
      expect(prompt).not.toContain(MOTIVE_DIFFICULTY_CLAUSES[m]);
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

  it('appends mode-conditional difficulty clause + names the rolled mode when set', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, mode: 'assassinate' });
    expect(prompt).toContain('Mode-conditional rating');
    // The clause interpolates the mode name.
    expect(prompt).toContain('rolled mode (assassinate)');
  });
});

describe('validateDungeonOverview', () => {
  it('accepts a well-shaped response', () => {
    expect(validateDungeonOverview(JSON.stringify(validResponse()))).toBe(true);
  });

  it('accepts empty strings for the optional facet fields', () => {
    const r = validResponse();
    r.notable_inhabitant_facet = '';
    r.notable_hazard_facet = '';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(true);
  });

  it('accepts the response when optional facet fields are missing entirely', () => {
    const r = validResponse();
    delete r.notable_inhabitant_facet;
    delete r.notable_hazard_facet;
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
    // free-pick, not constrained by the minion population.
    expect(prompt).toMatch(/large_creature slot is NOT constrained/i);
  });
});
