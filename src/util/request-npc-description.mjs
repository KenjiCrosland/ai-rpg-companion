import { generateNPCDescription } from "./npc-generator.mjs";

export async function requestNPCDescription(typeOfNPC, extraDescription, sequentialLoading = false, emit) {
    //TODO: pass an options object
  const fullPrompt = () => {
    if (extraDescription.location) {
      return (
        extraDescription.location +
        `Give me a description of ${typeOfNPC} who may live or frequent this place.`
      );
    }
    if (extraDescription.relationship && extraDescription.mainNPC) {
        return (
        `I'd like you to give me a full description of ${typeOfNPC}. They have a relationship with ${extraDescription.mainNPC}. Below is a description of their relationship` +
          extraDescription.relationship +
          `Give me a full description of ${typeOfNPC} in the expected format.`
        );
      }
    return typeOfNPC;
  };

  const handlePart = (part, npcDescription) => {
    emit("npc-description-generated", {
      part,
      npcDescription,
    });
  
    if (sequentialLoading && part === 1) {
      emit("set-loading-state", { part: 1, isLoading: false });
      emit("set-loading-state", { part: 2, isLoading: true });
    } else {
      emit("set-loading-state", { part, isLoading: false });
    }
  };

  if (sequentialLoading) {
    // Set loading state for part 1
    emit("set-loading-state", { part: 1, isLoading: true });
  } else {
    // Set loading state for both parts
    emit("set-loading-state", { part: 1, isLoading: true });
    emit("set-loading-state", { part: 2, isLoading: true });
  }

  try {
    await generateNPCDescription(fullPrompt(), {
      part1: (npcDescription) => handlePart(1, npcDescription),
      part2: (npcDescription) => handlePart(2, npcDescription),
      error1: (error) => handleError(error),
      error2: (error) => handleError(error),
    });
  } catch (error) {
    handleError(error);
  }
}
