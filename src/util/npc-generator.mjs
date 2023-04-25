import { createNPCPrompt, createRelationshipAndTipsPrompt } from './prompts.mjs';
import { generateGptResponse } from './open-ai.mjs';

export function validateNPCDescription(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'characterName',
      'descriptionOfPosition',
      'reasonForBeingThere',
      'distinctiveFeatureOrMannerism',
      'characterSecret',
    ];
    return keys.every((key) => key in jsonObj);
  } catch (error) {
    return false;
  }
}

export function validatePart2(jsonString) {
  try {
    console.log(jsonString)
    const jsonObj = JSON.parse(jsonString);
    const keys = ['relationships', 'roleplaying_tips'];
    return keys.every((key) => key in jsonObj);
  } catch (error) {
    return false;
  }
}

export async function generateNPCDescription(typeOfPlace, callbacks) {
    try {
      const npcPrompt = createNPCPrompt(typeOfPlace);
      const npcJsonString = await generateGptResponse(npcPrompt, validateNPCDescription);
      const npcDescriptionPart1 = JSON.parse(npcJsonString);
  
      if (callbacks && callbacks.part1) {
        callbacks.part1(npcDescriptionPart1);
      }
  
      const part2Prompt = createRelationshipAndTipsPrompt(JSON.stringify(npcDescriptionPart1));
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
  
  
  
  