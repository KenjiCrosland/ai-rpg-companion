export default function encounterPrompt(
  locationDescription,
  monsterDescriptionString,
) {
  let objectString;
  if (monsterDescriptionString) {
    objectString = `  {
      "place_name": "<Name of the location>",
      "environmental_twist": "<Description of the environmental hazard>",
      "non_combat_objective": "<Description of the objective>",
      "potential_event": "<Description of the potential event>",
      "encounter_aftermath": "<Provide a brief description of what happens after the encounter>",
      "encounter_intro": "<Provide a brief intro the encounter, summarizing it briefly>"
    }`;
  } else {
    objectString = `  
    Please provide a detailed description of the monsters that will be encountered in this encounter, there could be just one or more than one in the monsters array. For the monsters array, include all monsters and NPCs mentioned in the Location Description, non_combat_objective, potential_event and encounter_aftermath.
    {
      "place_name": "<Name of the location>",
      "environmental_twist": "<Description of the environmental hazard>",
      "non_combat_objective": "<Description of the objective>",
      "potential_event": "<Description of the potential event>",
      "encounter_aftermath": "<Provide a brief description of what happens after the encounter>",
      "encounter_intro": "<Provide a brief intro the encounter, summarizing it briefly>"
      "monsters": [{
        "name": "<The name of the monster. Not an official D&D monster.>",
        "cr": "<Provide a D&D 5e challenge_rating for this creature>",
        "quantity": "<Provide the number of this monster that will be encountered. This should be a number value>",
        "description": "<Short Description of the monster: Provide details about appearance as well as what the creature is currently doing>",
        "type": "<balanced, offensive, or defensive. Pick one>",
        "isSpellcaster": "<true/false>"
      }]
    }`;
  }

  return ` Generate a detailed and imaginative Dungeons & Dragons 5e encounter that breaks away from predictable patterns:

  Location Description: ${locationDescription}

  Description of Monsters: ${monsterDescriptionString}
  
  Incorporate an environmental_twist: Add an element to the environment that will affect both the players and the monsters. This is likely a hazard of some sort that requires a saving throw or skill check to avoid. Since we don't know the characters' levels, do not use DCs but instead say "a difficult challenge" or "a moderate challenge."
  
  Introduce a non_combat_objective: Rather than a straightforward battle, include an objective for the players that requires interaction with the environment or the monsters in a non-combat way. An insight check of some sort could be used to determine if the players understand the objective. If this objective is completed combat could be avoided or made easier.
  
  potential_event: Propose a potential event that could turn the encounter on its head. This could involve reinforcements if the encounter is too easy, a surprising revelation about the setting, or an unexpected ally emerging if the party is struggling.
  
  encounter_aftermath: Describe what happens after the encounter. This could involve rewards, consequences, or lingering effects from the encounter.

  Expected Output Format:
  Return the encounter details in JSON format, emphasizing creativity and unexpected elements: 
  ${objectString}`;
}
