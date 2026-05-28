/**
 * @jest-environment jsdom
 *
 * Tests for the rewritten dungeon overview generation pipeline.
 *
 * Verifies that generateDungeonOverview:
 *   1. Calls inferDungeonDimensions with form-derived inputs.
 *   2. Honors a user-supplied place_name override after inference.
 *   3. Calls dungeonOverviewPrompt with the resolved dimensions + banned tropes.
 *   4. Persists the resolved dimensions on the new dungeon record.
 *   5. Populates npcs / monsters from the response.
 *   6. Resets the form on success.
 *
 * Also covers currentDungeonOverviewString's dual-shape rendering:
 * new-shape detection via central_dynamic, legacy-shape fallback.
 */

jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
}));

jest.mock('../util/infer-dungeon-dimensions.mjs', () => ({
  inferDungeonDimensions: jest.fn(),
}));

import { generateGptResponse } from '@/util/ai-client.mjs';
import { inferDungeonDimensions } from '../util/infer-dungeon-dimensions.mjs';
import {
  generateDungeonOverview,
  currentDungeonOverviewString,
} from '../stores/overview-store.mjs';
import {
  dungeons,
  currentDungeonId,
  overviewForm,
} from '../stores/dungeon-state.mjs';

function validResponseBody() {
  return {
    name: 'Eikheim Barrow',
    title: 'Tomb of the Singing Bones',
    overview: 'A low mound of moss-furred stone, mist clinging to the entrance lintel.',
    relation_to_larger_setting: 'It sits at the southern edge of the Iron Hills.',
    approach_and_threshold: 'A worn stone stair descends into a chamber lit by phosphorescent lichen.',
    history: 'Built by the Ash-Bearers three centuries ago.',
    dominant_power: 'Vetheras, the lich-king, dreams in the central vault.',
    inhabitants: 'A handful of skeleton wardens, plus a band of cultists in the antechamber.',
    hazards_and_dangers: 'The doors close on a slow rune-clock.',
    notable_hazard_facet: '',
    central_dynamic: 'Vetheras stirs more each cycle of the moon.',
    current_occupation: 'Three cultists are conducting the seventh vigil.',
    present_state: 'The barrow hums faintly at midnight.',
    difficulty_level: 'A Tier 1 dungeon for novice adventurers.',
    named_entities: ['Vetheras', 'Aldwyn'],
    npc_list: [
      { name: 'Vetheras', description: 'The dreaming lich-king.' },
      { name: 'Aldwyn', description: 'The leader of the cultist vigil.' },
      { name: 'Brunhild', description: 'A defected cultist hiding nearby.' },
    ],
    monsters: [
      { type: 'minion', name: 'skeleton warden', description: 'Bone soldier.', CR: '1/4' },
      { type: 'strong_minion', name: 'wight captain', description: 'Tactical undead.', CR: '1' },
      { type: 'large_creature', name: 'tomb-wyrm', description: 'A bone-serpent.', CR: '3' },
    ],
  };
}

function resetState() {
  dungeons.value = [];
  currentDungeonId.value = null;
  overviewForm.value = {
    description: '',
    place_lore: '',
    difficulty: '',
  };
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.clear();
  }
}

describe('generateDungeonOverview', () => {
  // Suppress alert() + the catch-path console.error so the test
  // output stays clean. Both are restored in afterEach.
  let alertSpy;
  let errorSpy;
  beforeEach(() => {
    jest.clearAllMocks();
    resetState();
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // Default mocks: inference returns plausible values; AI returns a
    // well-shaped overview. Individual tests override these as needed.
    inferDungeonDimensions.mockResolvedValue({
      type: 'chambered-complex',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'Old-Norse-inspired: ...',
      userName: null,
      tension: 'sealed-and-stirring',
      difficulty: 1,
      powerStructure: 'single_apex',
      povFrame: 'sages_rumor',
      placeType: 'Sepulcher',
      nameTemplate: { id: 'A', shape: '[Register-noun] [Place-type]', requiresRegister: true, examples: ['Eikheim Barrow'] },
      thirdParty: { present: false },
      motive: 'prevention',
      formedNature: null,
      mode: 'confront',
      monsterPopulation: {
        creature_type: 'undead',
        relation: 'dominant_power_thrall',
      },
    });
    generateGptResponse.mockResolvedValue(JSON.stringify(validResponseBody()));
  });
  afterEach(() => {
    alertSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('passes form description / lore / difficulty straight through to inference', async () => {
    overviewForm.value.description = 'a forgotten crypt called the Hollow Vault';
    overviewForm.value.place_lore = 'A long history of buried kings.';
    overviewForm.value.difficulty = '2';

    await generateDungeonOverview();

    expect(inferDungeonDimensions).toHaveBeenCalledWith({
      description: 'a forgotten crypt called the Hollow Vault',
      lore: 'A long history of buried kings.',
      difficulty: '2',
    });
  });

  it('passes empty description when form is blank', async () => {
    await generateDungeonOverview();
    expect(inferDungeonDimensions).toHaveBeenCalledWith({
      description: '',
      lore: '',
      difficulty: null,
    });
  });

  it('honors the userName extracted from the description by inference', async () => {
    inferDungeonDimensions.mockResolvedValue({
      type: 'chambered-complex',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: null,
      userName: 'the Hollow Vault',
      tension: 'sealed-and-stirring',
      difficulty: 1,
      powerStructure: 'single_apex',
      povFrame: 'sages_rumor',
      placeType: 'Sepulcher',
      nameTemplate: { id: 'A', shape: '[Register-noun] [Place-type]', requiresRegister: true, examples: ['Eikheim Barrow'] },
      thirdParty: { present: false },
      driveType: 'prevent_by_killing',
      formedNature: null,
    });
    overviewForm.value.description = 'a tomb called the Hollow Vault';

    await generateDungeonOverview();

    // Inference extracts the user-named "the Hollow Vault" from the
    // description prose; main-call prompt receives that as userName.
    const promptCall = generateGptResponse.mock.calls[0][0];
    expect(promptCall).toContain('the Hollow Vault');
  });

  it('persists the resolved dimensions on the new dungeon record', async () => {
    inferDungeonDimensions.mockResolvedValue({
      type: 'spire',
      character: ['scholarly', 'ancient', 'sun-scorched'],
      register: 'Mesopotamian-inspired: ...',
      userName: null,
      tension: 'forgotten-knowledge',
      difficulty: 3,
      powerStructure: 'living_order',
      organizingLogic: ['production', 'funerary'],
      thirdParty: { present: true, type: 'adversary', kind: 'rival_expedition' },
      povFrame: 'recovered_notes',
      placeType: 'Foundry',
      nameTemplate: { id: 'C', shape: '[Place-type] of [Register-noun]', requiresRegister: true, examples: ['Crypt of Vetheras'] },
      driveType: 'acquire_by_theft',
      formedNature: null,
    });

    await generateDungeonOverview();

    const dungeon = dungeons.value[0];
    expect(dungeon.dimensions).toEqual({
      type: 'spire',
      character: ['scholarly', 'ancient', 'sun-scorched'],
      register: 'Mesopotamian-inspired: ...',
      tension: 'forgotten-knowledge',
      difficulty: 3,
      powerStructure: 'living_order',
      organizingLogic: ['production', 'funerary'],
      thirdParty: { present: true, type: 'adversary', kind: 'rival_expedition' },
      povFrame: 'recovered_notes',
      placeType: 'Foundry',
      // dimensions persists only the template id, not the full object.
      nameTemplate: 'C',
      driveType: 'acquire_by_theft',
      // formedNature is null when 'formed' is not in organizingLogic.
      formedNature: null,
    });
  });

  it('writes the full overview onto dungeonOverview', async () => {
    await generateDungeonOverview();
    const dungeon = dungeons.value[0];
    expect(dungeon.dungeonOverview.name).toBe('Eikheim Barrow');
    expect(dungeon.dungeonOverview.central_dynamic).toBeTruthy();
    expect(dungeon.dungeonOverview.approach_and_threshold).toBeTruthy();
  });

  it('maps npc_list into the dungeon.npcs structure with generated ids', async () => {
    await generateDungeonOverview();
    const dungeon = dungeons.value[0];
    expect(dungeon.npcs).toHaveLength(3);
    expect(dungeon.npcs[0].name).toBe('Vetheras');
    expect(dungeon.npcs[0].short_description).toBe('The dreaming lich-king.');
    expect(dungeon.npcs[0].npc_id).toMatch(/^npc_/);
    expect(dungeon.npcs[0].opened).toBe(false);
  });

  it('maps monsters[] into the dungeon.monsters structure with generated ids', async () => {
    await generateDungeonOverview();
    const dungeon = dungeons.value[0];
    expect(dungeon.monsters).toHaveLength(3);
    expect(dungeon.monsters.map((m) => m.type).sort()).toEqual(
      ['large_creature', 'minion', 'strong_minion']
    );
    for (const m of dungeon.monsters) {
      expect(m.id).toBeTruthy();
      expect(m.statblock).toBeUndefined();
    }
  });

  it('sets currentDungeonId to the new dungeon', async () => {
    await generateDungeonOverview();
    const dungeon = dungeons.value[0];
    expect(currentDungeonId.value).toBe(dungeon.id);
    expect(dungeon.id).toMatch(/^dng_/);
  });

  it('resets the form on success', async () => {
    overviewForm.value.description = 'a forgotten crypt';
    overviewForm.value.place_lore = 'whatever';
    overviewForm.value.difficulty = '2';

    await generateDungeonOverview();

    expect(overviewForm.value).toEqual({
      description: '',
      place_lore: '',
      difficulty: '',
    });
  });

  it('threads banned tropes into the main-call prompt', async () => {
    await generateDungeonOverview();
    const promptCall = generateGptResponse.mock.calls[0][0];
    // The default banned-trope rotation pulls ~70% of 4 → 3 entries.
    // We just check the section appears.
    expect(promptCall).toContain('ANTI-CLUSTERING');
  });

  it('threads the inferred monsterPopulation into the main-call prompt', async () => {
    await generateDungeonOverview();
    const promptCall = generateGptResponse.mock.calls[0][0];
    expect(promptCall).toContain('MINION POPULATION (pre-rolled');
    // The beforeEach mock seeds an undead minion population with a
    // dominant_power_thrall relation; the rolled values surface in
    // the constraint block.
    expect(promptCall).toContain('"undead"');
    expect(promptCall).toContain('"dominant_power_thrall"');
  });

  it('persists the inferred monsterPopulation on the new dungeon record', async () => {
    await generateDungeonOverview();
    const dungeon = dungeons.value[0];
    expect(dungeon.dimensions.monsterPopulation).toEqual({
      creature_type: 'undead',
      relation: 'dominant_power_thrall',
    });
  });

  it('throws + alerts when the AI returns nothing', async () => {
    generateGptResponse.mockResolvedValue('');
    await expect(generateDungeonOverview()).rejects.toThrow();
    expect(alertSpy).toHaveBeenCalled();
    expect(dungeons.value).toHaveLength(0);
  });

  it('throws + alerts when the AI throws', async () => {
    generateGptResponse.mockRejectedValue(new Error('network'));
    await expect(generateDungeonOverview()).rejects.toThrow('network');
    expect(alertSpy).toHaveBeenCalled();
    expect(dungeons.value).toHaveLength(0);
  });
});

describe('currentDungeonOverviewString', () => {
  beforeEach(resetState);

  it('returns empty string when no dungeon is selected', () => {
    expect(currentDungeonOverviewString.value).toBe('');
  });

  it('renders new-shape dungeons via the central_dynamic-detected path', () => {
    const dungeon = {
      id: 'dng_x',
      dungeonOverview: validResponseBody(),
    };
    dungeons.value = [dungeon];
    currentDungeonId.value = 'dng_x';

    const result = currentDungeonOverviewString.value;
    expect(result).toContain(dungeon.dungeonOverview.overview);
    expect(result).toContain(dungeon.dungeonOverview.central_dynamic);
    expect(result).toContain(dungeon.dungeonOverview.approach_and_threshold);
    expect(result).toContain(dungeon.dungeonOverview.present_state);
  });

  it('renders split-shape dungeons via the subfield-detected path', () => {
    const dungeon = {
      id: 'dng_split',
      dungeonOverview: {
        overview: 'A low mound of moss-furred stone.',
        quest_hook: 'A factor of the Ash-Bearers offers payment.',
        relation_to_larger_setting: 'At the southern edge of the Iron Hills.',
        approach_and_threshold: 'A stair descends into a phosphorescent chamber.',
        history: 'Built three centuries ago.',
        dominant_power: 'Vetheras dreams in the central vault.',
        inhabitants_home_faction: 'Aldwyn the cult-leader keeps vigil.',
        inhabitants_second_faction: 'The skeleton wardens patrol the inner chambers.',
        inhabitants_contact: '',
        central_dynamic: 'Vetheras stirs more each cycle.',
        present_state_clock: 'The rune-clock will set within three days.',
        present_state_recent_shift: 'The antechamber sigils burned brighter last night.',
        potential_outcomes_primary: 'The party hammers the central altar out of tune.',
        potential_outcomes_secondary: 'The party bargains with Aldwyn for safe passage.',
        potential_outcomes_tertiary: '',
      },
    };
    dungeons.value = [dungeon];
    currentDungeonId.value = 'dng_split';

    const result = currentDungeonOverviewString.value;
    expect(result).toContain('Aldwyn the cult-leader');
    expect(result).toContain('skeleton wardens patrol');
    expect(result).toContain('rune-clock will set');
    expect(result).toContain('sigils burned brighter');
    expect(result).toContain('hammers the central altar');
    expect(result).toContain('bargains with Aldwyn');
  });

  it('renders legacy-shape dungeons via the fallback path', () => {
    const legacy = {
      id: 'dng_old',
      dungeonOverview: {
        overview: 'old overview',
        relation_to_larger_setting: 'old rel',
        finding_the_dungeon: 'old finding',
        history: 'old history',
        dominant_power: 'old dom power',
        dominant_power_goals: 'old goals',
        dominant_power_minions: 'old minions',
        miniboss_description: 'old miniboss',
        dominant_power_event: 'old event',
        recent_event_consequences: 'old consequences',
        secondary_power: 'old secondary',
        secondary_power_event: 'old sec event',
        main_problem: 'old main problem',
        potential_solutions: 'old potential solutions',
        conclusion: 'old conclusion',
        // No central_dynamic — legacy shape detection.
      },
    };
    dungeons.value = [legacy];
    currentDungeonId.value = 'dng_old';

    const result = currentDungeonOverviewString.value;
    expect(result).toContain('old overview');
    expect(result).toContain('old finding');
    expect(result).toContain('old miniboss');
    expect(result).toContain('old main problem');
    expect(result).toContain('old conclusion');
  });

  it('skips empty / missing fields in either shape (no literal "undefined" in output)', () => {
    const partial = {
      id: 'dng_partial',
      dungeonOverview: {
        // New shape but with most fields missing.
        overview: 'partial overview',
        central_dynamic: 'partial dynamic',
        // history / inhabitants / etc. all missing.
      },
    };
    dungeons.value = [partial];
    currentDungeonId.value = 'dng_partial';

    const result = currentDungeonOverviewString.value;
    expect(result).toContain('partial overview');
    expect(result).toContain('partial dynamic');
    expect(result).not.toContain('undefined');
  });
});
