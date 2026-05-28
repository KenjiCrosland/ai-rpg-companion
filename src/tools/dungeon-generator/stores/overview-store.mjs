import { computed } from 'vue';
import { generateGptResponse } from "@/util/ai-client.mjs";
import {
  dungeonOverviewPrompt,
  validateDungeonOverview,
} from '../prompts/dungeon-overview.mjs';
import { inferDungeonDimensions } from '../util/infer-dungeon-dimensions.mjs';
import { getBannedDungeonTropesForGeneration } from '../util/dungeon-dimensions.mjs';
import {
  dungeons,
  currentDungeonId,
  activeTabIndex,
  overviewForm,
  currentDungeon,
} from './dungeon-state.mjs';
import { saveDungeons } from './dungeon-utils.mjs';

/**
 * Aggregate the dungeon's overview prose into a single string for
 * downstream consumers (monster-store passes this to monster prompts
 * for thematic context; export utilities feed it forward, etc.).
 *
 * Handles BOTH the new field shape (post-2026-05 redesign) and the
 * legacy shape so saved dungeons created before the redesign keep
 * producing usable context. New shape is detected by the presence of
 * `central_dynamic` — a field that only exists in the new prompt.
 */
export const currentDungeonOverviewString = computed(() => {
  const ov = currentDungeon.value?.dungeonOverview;
  if (!ov) return '';

  // New shape: detected by central_dynamic presence. The inhabitants,
  // present_state, and potential_outcomes fields exist in two sub-shapes
  // — the SPLIT shape (subfields like inhabitants_home_faction) and the
  // earlier FLAT shape (single string fields). Try split first, then
  // fall back to flat for older saved dungeons.
  if (typeof ov.central_dynamic === 'string') {
    const inhabitantsText =
      [ov.inhabitants_home_faction, ov.inhabitants_second_faction, ov.inhabitants_contact].some(Boolean)
        ? [ov.inhabitants_home_faction, ov.inhabitants_second_faction, ov.inhabitants_contact].filter(Boolean).join(' ')
        : [ov.inhabitants, ov.notable_inhabitant_facet].filter(Boolean).join(' ');
    const presentStateText =
      [ov.present_state_clock, ov.present_state_recent_shift].some(Boolean)
        ? [ov.present_state_clock, ov.present_state_recent_shift].filter(Boolean).join(' ')
        : ov.present_state;
    const potentialOutcomesText =
      [ov.potential_outcomes_primary, ov.potential_outcomes_secondary, ov.potential_outcomes_tertiary].some(Boolean)
        ? [ov.potential_outcomes_primary, ov.potential_outcomes_secondary, ov.potential_outcomes_tertiary].filter(Boolean).join('\n\n')
        : ov.potential_outcomes;
    return [
      ov.overview,
      ov.quest_hook,
      [ov.relation_to_larger_setting, ov.approach_and_threshold].filter(Boolean).join(' '),
      ov.history,
      ov.dominant_power,
      inhabitantsText,
      ov.central_dynamic,
      presentStateText,
      potentialOutcomesText,
    ].filter((p) => p && p.trim().length > 0).join('\n\n');
  }

  // Legacy shape (pre-2026-05): old field names. Render any present
  // fields, skip absent ones so partially-populated old dungeons
  // don't render literal "undefined".
  return [
    ov.overview,
    [ov.relation_to_larger_setting, ov.finding_the_dungeon].filter(Boolean).join(' '),
    ov.history,
    [ov.dominant_power, ov.dominant_power_goals, ov.dominant_power_minions].filter(Boolean).join(' '),
    ov.miniboss_description,
    [ov.dominant_power_event, ov.recent_event_consequences].filter(Boolean).join(' '),
    [ov.secondary_power, ov.secondary_power_event].filter(Boolean).join(' '),
    [ov.main_problem, ov.potential_solutions].filter(Boolean).join(' '),
    ov.conclusion,
  ].filter((p) => p && p.trim().length > 0).join('\n\n');
});

/**
 * Generate a dungeon overview via the redesigned two-step pipeline:
 *   1. inferDungeonDimensions resolves type / character / register /
 *      userName / tension / difficulty from the form's description /
 *      lore / difficulty fields.
 *   2. dungeonOverviewPrompt builds the main-call prompt with all
 *      dimensions pre-specified, plus a rotating ban-list of overused
 *      dungeon tropes from getBannedDungeonTropesForGeneration.
 *
 * Persists the resolved dimensions on the dungeon record itself so a
 * future room-generation pass can inherit register (and other axes)
 * without re-rolling.
 */
export async function generateDungeonOverview() {
  try {
    activeTabIndex.value = 0;

    // Form passes straight through to inference. Inference extracts
    // any user-supplied dungeon name from the description prose
    // ("a tomb called the Hollow Vault" → userName: "the Hollow Vault")
    // — no separate name field needed in the form.
    const description = overviewForm.value.description || '';
    const lore = overviewForm.value.place_lore || '';
    const formDifficulty = overviewForm.value.difficulty || null;

    // Step 1: resolve all six dimensions.
    const inferred = await inferDungeonDimensions({
      description,
      lore,
      difficulty: formDifficulty,
    });

    const bannedTropes = getBannedDungeonTropesForGeneration();

    console.log('[dungeon-gen]', {
      type: inferred.type,
      character: inferred.character,
      register: inferred.register,
      userName: inferred.userName,
      tension: inferred.tension,
      difficulty: inferred.difficulty,
      powerStructure: inferred.powerStructure,
      organizingLogic: inferred.organizingLogic,
      thirdParty: inferred.thirdParty,
      povFrame: inferred.povFrame,
      placeType: inferred.placeType,
      nameTemplate: inferred.nameTemplate && inferred.nameTemplate.id,
      driveType: inferred.driveType,
      formedNature: inferred.formedNature,
      monsterPopulation: inferred.monsterPopulation,
      bannedTropeCount: bannedTropes.length,
      descriptionLength: description.length,
      loreLength: lore.length,
    });

    // Step 2: main-call generation.
    const prompt = dungeonOverviewPrompt({
      type: inferred.type,
      character: inferred.character,
      register: inferred.register,
      userName: inferred.userName,
      tension: inferred.tension,
      difficulty: inferred.difficulty,
      powerStructure: inferred.powerStructure,
      organizingLogic: inferred.organizingLogic,
      thirdParty: inferred.thirdParty,
      povFrame: inferred.povFrame,
      placeType: inferred.placeType,
      nameTemplate: inferred.nameTemplate,
      registerPool: inferred.registerPool,
      driveType: inferred.driveType,
      formedNature: inferred.formedNature,
      monsterPopulation: inferred.monsterPopulation,
      description,
      lore,
      bannedTropes,
    });
    const response = await generateGptResponse(prompt, validateDungeonOverview);

    if (!response) {
      throw new Error('No response received from AI');
    }

    const overview = JSON.parse(response);

    const newDungeon = {
      id: `dng_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dungeonOverview: overview,
      // Persist dimensions for future room inheritance + renderer /
      // export-side fallback decisions. Stored at the top level (not
      // inside dungeonOverview) so a re-roll of just the overview
      // prose later can preserve them independently.
      dimensions: {
        type: inferred.type,
        character: inferred.character,
        register: inferred.register,
        tension: inferred.tension,
        difficulty: inferred.difficulty,
        powerStructure: inferred.powerStructure,
        organizingLogic: inferred.organizingLogic,
        thirdParty: inferred.thirdParty,
        povFrame: inferred.povFrame,
        placeType: inferred.placeType,
        nameTemplate: inferred.nameTemplate && inferred.nameTemplate.id,
        driveType: inferred.driveType,
        formedNature: inferred.formedNature,
        monsterPopulation: inferred.monsterPopulation,
      },
      rooms: null,
      roomDescriptions: null,
      roomNames: [],
      npcs: [],
      monsters: [],
    };

    if (overview.npc_list) {
      newDungeon.npcs = overview.npc_list.map((npc, index) => ({
        npc_id: `npc_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
        name: npc.name,
        short_description: npc.description,
        opened: false,
      }));
    }

    if (overview.monsters && Array.isArray(overview.monsters)) {
      newDungeon.monsters = overview.monsters.map((monster, index) => ({
        ...monster,
        id: `${newDungeon.id}-monster-${Date.now()}-${index}`,
        statblock: undefined, // We'll fill this later
      }));
    }

    dungeons.value.push(newDungeon);
    currentDungeonId.value = newDungeon.id;

    // Reset form
    overviewForm.value.description = '';
    overviewForm.value.place_lore = '';
    overviewForm.value.difficulty = '';

    saveDungeons();
  } catch (error) {
    console.error('Error generating dungeon overview:', error);
    alert(`Failed to generate dungeon overview: ${error.message}\n\nPlease try again.`);
    throw error;
  }
}
