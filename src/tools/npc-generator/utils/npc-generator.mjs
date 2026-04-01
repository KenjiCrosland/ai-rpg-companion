import { createNPCPrompt, createRelationshipAndTipsPrompt } from '../npc-prompts.mjs';
import { generateGptResponse } from "@/util/ai-client.mjs";

export function validateNPCDescription(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'character_name',
      'description_of_position',
      'reason_for_being_there',
      'distinctive_feature_or_mannerism',
      'character_secret',
      'read_aloud_description',
      'roleplaying_tips',
    ];
    return keys.every((key) => key in jsonObj);
  } catch (error) {
    return false;
  }
}

/**
 * Validate creature profile JSON has all required keys
 * @param {string} jsonString - JSON string to validate
 * @returns {boolean} - True if all keys present
 */
export function validateCreatureProfile(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'creature_title',
      'creature_description',
      'origin_and_circumstance',
      'observable_behaviors',
      'hidden_truth',
      'encounter_description',
      'dm_guidance',
    ];
    return keys.every((key) => key in jsonObj);
  } catch (error) {
    return false;
  }
}

/**
 * Adapt creature profile keys to standard NPC keys for storage/display
 * @param {Object} creatureProfile - Creature profile with creature-specific keys
 * @returns {Object} - Standard NPC object with standard keys
 */
export function adaptCreatureProfileToNPC(creatureProfile) {
  return {
    character_name: creatureProfile.creature_title,
    description_of_position: creatureProfile.creature_description,
    reason_for_being_there: creatureProfile.origin_and_circumstance,
    distinctive_feature_or_mannerism: creatureProfile.observable_behaviors,
    character_secret: creatureProfile.hidden_truth,
    read_aloud_description: creatureProfile.encounter_description,
    roleplaying_tips: creatureProfile.dm_guidance
  };
}

export function validatePart2(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['relationships'];
    return keys.every((key) => key in jsonObj);
  } catch (error) {
    return false;
  }
}

export async function generateNPCDescription(typeOfPlace, callbacks, options = {}) {
    try {
      const isCreatureProfile = options.isCreatureProfile || false;

      // Use different prompt and validator for creature profiles
      const npcPrompt = createNPCPrompt(typeOfPlace, { isCreatureProfile });
      const validator = isCreatureProfile ? validateCreatureProfile : validateNPCDescription;
      const npcJsonString = await generateGptResponse(npcPrompt, validator);
      let npcDescriptionPart1 = JSON.parse(npcJsonString);

      // Adapt creature profile keys to standard NPC keys before returning
      if (isCreatureProfile) {
        npcDescriptionPart1 = adaptCreatureProfileToNPC(npcDescriptionPart1);
      }

      if (callbacks && callbacks.part1) {
        callbacks.part1(npcDescriptionPart1);
      }

      // Pass isCreatureProfile flag to Part 2 prompt
      const part2Prompt = createRelationshipAndTipsPrompt(
        JSON.stringify(npcDescriptionPart1),
        { isCreatureProfile }
      );
      const relationshipJsonString = await generateGptResponse(part2Prompt, validatePart2);
      const npcDescriptionPart2 = JSON.parse(relationshipJsonString);

      if (callbacks && callbacks.part2) {
        callbacks.part2(npcDescriptionPart2);
      }
    } catch (error) {
      if (error.message.includes("part1")) {
        if (callbacks && callbacks.error1) {
          callbacks.error1(error);
        }
      } else if (error.message.includes("part2")) {
        if (callbacks && callbacks.error2) {
          callbacks.error2(error);
        }
      } else {
        if (callbacks && callbacks.error) {
          callbacks.error(null, error);
        }
      }
      throw error;
    }
  }




