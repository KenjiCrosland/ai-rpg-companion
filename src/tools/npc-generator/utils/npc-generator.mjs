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

/**
 * Validate Part 2 (relationships) JSON.
 *
 * Required shape: `relationships` is a flat object whose values are
 * non-empty strings. The most common failure mode this rejects is the
 * LLM wrapping the three relationships inside an extra layer keyed by
 * the source NPC's name — DeepSeek occasionally produces
 *   { relationships: { "Source NPC": { "Target1": "...", ... } } }
 * instead of the flat
 *   { relationships: { "Target1": "...", "Target2": "...", "Target3": "..." } }
 * Rejecting nested values triggers `generateGptResponse`'s retry layer,
 * which combined with the prompt's explicit anti-example resolves the
 * shape on the second attempt in practice.
 *
 * Also rejects: empty `relationships` (no entries usable), array
 * `relationships` (non-object), null `relationships`, and any value
 * that isn't a non-empty string.
 */
export function validatePart2(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    if (!jsonObj || typeof jsonObj !== 'object' || Array.isArray(jsonObj)) return false;
    if (!('relationships' in jsonObj)) return false;
    const relationships = jsonObj.relationships;
    if (!relationships || typeof relationships !== 'object' || Array.isArray(relationships)) return false;
    const values = Object.values(relationships);
    if (values.length === 0) return false;
    return values.every(v => typeof v === 'string' && v.trim().length > 0);
  } catch (error) {
    return false;
  }
}

export async function generateNPCDescription(typeOfPlace, callbacks, options = {}) {
    try {
      const isCreatureProfile = options.isCreatureProfile || false;
      // Two register slots — distinct because the orchestrator may
      // suppress the whitelist for the source NPC (when userName was
      // detected) while still injecting it for relationships. The
      // upstream caller (NPCGenerator.vue) owns this decision.
      // Backwards-compat: when only `register` is supplied, both
      // slots use it.
      const register = options.register || null;
      const sourceRegister = options.sourceRegister !== undefined
        ? options.sourceRegister
        : register;
      const relationshipsRegister = options.relationshipsRegister !== undefined
        ? options.relationshipsRegister
        : register;
      const fantasyRace = options.fantasyRace || null;

      // Use different prompt and validator for creature profiles
      const npcPrompt = createNPCPrompt(typeOfPlace, {
        isCreatureProfile,
        register: sourceRegister,
        fantasyRace,
      });
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

      const part2Prompt = createRelationshipAndTipsPrompt(
        JSON.stringify(npcDescriptionPart1),
        {
          isCreatureProfile,
          register: relationshipsRegister,
          fantasyRace,
        }
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




