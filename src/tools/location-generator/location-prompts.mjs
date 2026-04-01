export function createLocationPrompt(param) {
  if (!param) {
    param = 'a random location';
  }
  return `Create a location description for ${param} in a Tabletop Roleplaying Game. Return a JSON object with the following structure:

{
  "locationName": "A unique, evocative name for the location",
  "sentence1_dimensions": "General description of interior/exterior to give sense of dimensions",
  "sentence2_atmosphere": "Engaging atmospheric detail (smells, lighting, sounds)",
  "sentence3_unique_feature": "Interesting or unusual feature that sets this place apart",
  "sentence4_interaction": "Something or someone players can interact with",
  "locationNPCs": ["FIRST_NAME LAST_NAME (PROFESSION)", ...],
  "subLocations": ["Room/Area Name", ...]
}

REQUIREMENTS FOR EACH SENTENCE:

Sentence 1 (Dimensions): Provide a general description of the location's interior or exterior to give players a sense of its dimensions. Examples:
- "The Red Rooster appears to have been converted from an old barn."
- "The Great Oak Inn is two stories high, with giant support beams hewn from ancient cedar."
- "The Grotto is a lantern-lit cave with white-washed walls and stone tables."

Sentence 2 (Atmosphere): Include an engaging atmospheric detail that is evocative. Focus on smells, lighting and/or sounds. Examples:
- "The first thing you notice is that everything smells like horse."
- "A thick layer of tobacco smoke hangs in the air, obscuring everything."
- "You smell pumpkin garlic soup wafting in from the kitchen."
- "A patchwork of well-worn rugs covers the floor, their frayed edges and faded patterns bearing witness to countless spilled drinks."
- "A haphazard collection of brightly colored plates add a splash of color to the otherwise dimly lit room."
- "The sound of hooves and the distant whinny of horses drift in from the adjoining stable."
- "A gently bubbling pot of mulled wine sits atop the bar, filling the room with a sweet, spiced aroma that beckons patrons to indulge."
- "A mismatched assortment of lanterns hangs from the rafters, casting pools of warm, flickering light throughout the room."
- "Sunlight filters through the stained glass windows, casting kaleidoscopic patterns on the worn floor."

Sentence 3 (Unique Feature): Describe an interesting or unusual feature that sets the place apart from others. This could be related to the place's name. Examples:
- "Several poorly taxidermied wolves hang above the tables with lopsided grins."
- "A shrine to Tymora occupies a corner of the room, with fresh flowers laid at the feet of a small stone statue."
- "A monstrous-looking organ dominates the far wall of the tavern, with brass pipes snaking their way from the console haphazardly."
- "A collection of glass bottles, each containing a different exotic creature preserved in fluid, lines the shelves behind the bar."
- "A towering sculpture made entirely of discarded bottle caps occupies a prominent position in the tavern."
- "A collection of delicate glass orbs, each containing a tiny, swirling storm, dangles from the ceiling, casting shimmering patterns on the walls."

Sentence 4 (Interaction): Describe something or someone the players can interact with. It could be an NPC doing something interesting or saying something unusual or an enticing object. Examples:
- "An extremely wizened gnome lady appears to be pouring salt from a bag into a corner of the building saying, 'That will teach em spirits to haunt this here inn!'"
- "A bright red tiefling seems to be gesticulating wildly to his pale elven friend saying, 'Brilliant! Brilliant! Our performance tonight is sure to be wonderous my dear friend.'"
- "You notice a group of gnomes at a corner table, giggling and whispering excitedly about the arrival of a group of adventurers from a far-off land, while the tavern keeper, a tall and slender elf, pours a goblet of glowing green liquid for a half-ogre sitting at the bar."
- "You hear a deep bass voice laughing from a corner table and yelling out to what appears to be a group of fellow adventurers say, 'And then he turned dear Philo here into a newt! A NEWT!'"

NPCs: Provide 2-5 NPCs who are living in or visiting this location. Format: "FIRST_NAME LAST_NAME (PROFESSION)"

SubLocations: Provide 3-6 sublocations if this is a large location (town, large building). Use room names for buildings ("Kitchen", "Cellar", "Scriptorium") or area names for outdoor locations.

IMPORTANT:
- Each sentence should be ONE sentence only
- Do not share hidden details that wouldn't be evident to the players
- Provide unusual and evocative details
- Avoid common fantasy tropes
- Return ONLY valid JSON
- DO NOT use markdown code blocks or formatting (no \`\`\`json)
- Return raw JSON only, no additional text or comments
- Temperature: 0.9`;
}
