import { computed } from 'vue';
import { generateGptResponse } from "@/util/ai-client.mjs";
import {
  dungeonOverviewPrompt,
  validateDungeonOverview,
} from '../prompts/dungeon-overview.mjs';
import { inferDungeonDimensions } from '../util/infer-dungeon-dimensions.mjs';
import { getBannedDungeonTropesForGeneration } from '../util/dungeon-dimensions.mjs';
import {
  inferItemDungeonMode,
  MODE_TO_PRESETS,
  pickTierForRarity,
} from '../util/infer-item-dungeon-mode.mjs';
import { addReferenceForSeed } from '@/util/seeded-input.mjs';
import {
  getItemFromStorage,
  linkDungeonToItemStub,
  addDungeonStubToItem,
} from '@/util/item-storage.mjs';
import {
  dungeons,
  currentDungeonId,
  activeTabIndex,
  overviewForm,
  currentDungeon,
  pendingSeed,
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
    let description = overviewForm.value.description || '';
    let lore = overviewForm.value.place_lore || '';
    const formDifficulty = overviewForm.value.difficulty || null;
    // Difficulty resolution order (preserved through the seeded path
    // below): form value (user override) → rarity-derived (item context,
    // set below if seeded) → random roll (existing cold-start behavior
    // inside inferDungeonDimensions when difficulty is null).
    let effectiveDifficulty = formDifficulty;

    // Cross-tool seed: when the user navigated here from the Item
    // Generator (mount handler stashed `pendingSeed`), run the item-
    // dungeon mode inference and apply mode-derived presets.
    //   - The item's lore drives the mode pick (forgotten / revered /
    //     carried / trial).
    //   - Mode → preset bundle (driveType, powerStructure, organizingLogic).
    //   - The item's register flows in directly (no register roll).
    //   - The item's name + lore become the dungeon's description / lore
    //     so the LLM has context for type / character / userName picks.
    // If no seed, presets stays empty and the rest of the flow is
    // pixel-identical to the unseeded baseline.
    let presets = {};
    let seedItem = null;
    let seedMode = null;
    if (pendingSeed.value && pendingSeed.value.source?.type === 'item') {
      const itemName = pendingSeed.value.source.id;
      seedItem = getItemFromStorage(itemName);
      if (seedItem) {
        const { mode } = await inferItemDungeonMode(seedItem);
        seedMode = mode;
        const modePresets = MODE_TO_PRESETS[mode] || {};
        presets = {
          ...modePresets,
          // Item register is the cultural-naming spine; inherit it.
          // When absent, the dungeon's register inference fires normally.
          ...(seedItem.register ? { register: seedItem.register } : {}),
        };
        // Rarity → tier: a Common item shouldn't drive a T5 cosmic
        // dungeon and an Artifact shouldn't roll a T1 hilltop barrow.
        // Only fires when the form difficulty is blank (user override
        // still wins); falls through to the inference's random roll
        // when the rarity is unrecognized.
        if (!effectiveDifficulty) {
          const rarityTier = pickTierForRarity(seedItem.rarity);
          if (rarityTier !== null) effectiveDifficulty = rarityTier;
        }
        // Route the item's lore into the inference call's LORE field,
        // NOT the description. The inference's userName extraction is
        // tuned to "called X" patterns in the DESCRIPTION ("a tomb
        // called the Hollow Vault" → userName: "the Hollow Vault");
        // putting the item's name + lore in description triggers that
        // extraction and the dungeon ends up named after the item.
        //
        // For the whole-item fallback we WANT the dungeon to invent
        // its own name from the lore's atmosphere and content. Empty
        // description + lore as background context = inference returns
        // userName: null → dungeon overview prompt's name field tells
        // the LLM to derive a fresh name from the rendered prose.
        //
        // The item's name may still appear inside the lore prose (a
        // first-person voice referencing the wand by name, an
        // inscribed warning, etc.), but without the "called" trigger
        // phrase in description the inference layer won't promote it
        // to userName, and the prompt's IMAGE-FROM-CONTENT rule pulls
        // the dungeon's name from the strangest TRUE detail in the
        // overview's own prose rather than from the seed.
        const itemContext = seedItem.lore || seedItem.physical_description || '';
        if (!lore.trim()) lore = itemContext;
        // description intentionally left as the user typed it (or
        // empty for whole-item fallback) so userName extraction
        // doesn't fire on the item's name.
      }
    }

    // Step 1: resolve all six dimensions.
    const inferred = await inferDungeonDimensions({
      description,
      lore,
      difficulty: effectiveDifficulty,
      presets,
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

    // Cross-tool seed finalization: when this dungeon was generated
    // from an item seed, do four things:
    //   1. Write the `inspired_by_item` reference edge via the
    //      shared substrate so future graph walks find the link.
    //   2. Denormalize source provenance onto the dungeon record so
    //      the item card can flip from "Create" to "View" reactively.
    //   3. Back-link the item-side stub. Two paths:
    //      - STUB-BASED (entityName present): the navigating click
    //        named a specific stub from the item's related_dungeons.
    //        Stamp `dungeon_id` on that stub via linkDungeonToItemStub.
    //      - WHOLE-ITEM FALLBACK (no entityName): no stub existed;
    //        push a fresh stub onto related_dungeons via
    //        addDungeonStubToItem so the item card surfaces the
    //        newly-created dungeon as a stub the user can revisit.
    //   4. Clear pendingSeed so subsequent generations don't re-trigger
    //      the seeded path.
    if (pendingSeed.value && seedItem) {
      const dungeonName = newDungeon.dungeonOverview?.name || 'Unnamed Dungeon';
      addReferenceForSeed(pendingSeed.value, {
        type: 'dungeon',
        id: newDungeon.id,
        name: dungeonName,
      });
      newDungeon.sourceType = pendingSeed.value.source.type;
      newDungeon.sourceId = pendingSeed.value.source.id;
      newDungeon.sourceName = pendingSeed.value.source.name;
      newDungeon.seedMode = seedMode;  // 'forgotten' | 'revered' | 'carried' | 'trial'

      const itemName = pendingSeed.value.source.id;
      const stubName = pendingSeed.value.entities?.[0]?.name;
      if (stubName) {
        // Stub-based: link the existing stub.
        linkDungeonToItemStub(itemName, stubName, newDungeon.id);
      } else {
        // Whole-item fallback: push a fresh stub using the generated
        // dungeon name. Use a brief role descriptor that indicates
        // the dungeon was generated from the whole item's lore (not
        // a specific named location in it).
        addDungeonStubToItem(itemName, {
          dungeonId: newDungeon.id,
          dungeonName,
          roleBrief: `Dungeon inspired by ${seedItem.name || 'this item'}`,
        });
      }

      pendingSeed.value = null;
    }

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
