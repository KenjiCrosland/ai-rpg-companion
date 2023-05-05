import { generateNPCDescription } from "./npc-generator.mjs";

export async function requestNPCDescription(typeOfNPC, extraDescription = {}, sequentialLoading = false, emit) {
    //TODO: pass an options object
  const fullPrompt = () => {
    if (extraDescription.location && extraDescription.locationName) {
      return (
        extraDescription.location +
        `Give me a description of ${typeOfNPC} who may live or frequent or work at ${extraDescription.locationName}.`
      );
    }
    if (extraDescription.relationship && extraDescription.mainNPC && extraDescription.locationContext && extraDescription.locationName) {
        return (
          extraDescription.locationContext +
          `Give me a description of ${typeOfNPC} who may live or frequent or work at ${extraDescription.locationName}. ${typeOfNPC} has a relationship with ${extraDescription.mainNPC}. ${extraDescription.relationship}`
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

  const handleError = (error) => {
    console.error("Error generating NPC description:", error);
    const errorMessage =
      "Failed to generate full description. Please try again later.";
    emit("npc-description-error", errorMessage);
    emit("set-loading-state", { part: 1, isLoading: false });
    emit("set-loading-state", { part: 2, isLoading: false });
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
