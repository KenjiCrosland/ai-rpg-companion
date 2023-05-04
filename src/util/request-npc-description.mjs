import { generateNPCDescription } from "./npc-generator.mjs";

export async function requestNPCDescription(typeOfNPC, extraDescription, emit) {
    //TODO: pass an options object
  const fullPrompt = () => {
    if (extraDescription.location) {
      return (
        extraDescription.location +
        `Give me a description of ${typeOfNPC} who may live or frequent this place.`
      );
    }
    if (extraDescription.relationship) {
        return (
          extraDescription.relationship +
          `Give me a full description ${typeOfNPC}.`
        );
      }
    return typeOfNPC;
  };

  const handlePart = (part, npcDescription) => {
    emit("npc-description-generated", {
      part,
      npcDescription,
    });
    emit("set-loading-state", { part, isLoading: false });

    // Set part 2 loading state to true after part 1 loading is set to false
    if (part === 1) {
      emit("set-loading-state", { part: 2, isLoading: true });
    }
  };

  // ... (keep the handleError function unchanged)

  // Set loading state only for part 1 initially
  emit("set-loading-state", { part: 1, isLoading: true });

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
