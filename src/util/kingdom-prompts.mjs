export function kingdomOverviewPrompt(
  adjective,
  kingdomType,
  placeName,
  placeLore,
) {
  let initialSentence = `Give me a description of the ${adjective} ${kingdomType} of ${placeName}.`;
  if (!placeName) {
    initialSentence = `Give me a description of an ${adjective} ${kingdomType}.`;
  }
  return `
  ${initialSentence}. When describing events and individuals be specific about names and locations. Each key should be a sentence or two, should be detailed and specific and should flow together to create a cohesive description. Avoid common fantasy tropes and cliches. Temperature: 0.9

  ${placeLore ? `Additional details about the setting: ${placeLore}.` : ''}
  
  Return the description in JSON format with the following keys. Make sure the npc_list includes all npc names mentioned in the description. The NPCs in npc_list should only be individuals and NOT organizations or groups:
  {
    overview: 'A brief overview of the ${kingdomType}, with a brief description of its current state',
    history: 'A very brief history of the ${kingdomType}, including its founding and most significant recent events',
    current_ruler_sentence: 'A sentence describing the ruler of the ${kingdomType}. What have they done to earn their position? What was their most recent significant action?',
    recent_event_current_ruler: 'describe a recent political event involving the current ruler which reflects the current state of the ${kingdomType}',
    recent_event_consequences: 'describe the consequences of the recent political event involving the current ruler',
    social_history: 'A brief history of the social structure of the ${kingdomType}',
    recent_event_social: 'this sentence should tie into the previous sentence about social history. describe a recent social event which reflects the current state of the ${kingdomType}. Show don't tell, use examples and do not say "A recent social event was...". Be specific with names of organizations, individuals, or locations',
    economic_history: 'A brief history of the economic structure of the ${kingdomType}',
    impactful_economic_event: 'describe a recent event that either had a positive or negative impact on the economy of the ${kingdomType}. Be specific with names of organizations, individuals, or locations',
    military_history: 'A brief history of the military structure of the ${kingdomType}',
    recent_event_military: 'this sentence should tie into the previous sentence about military history. describe a recent military event which reflects the current state of the ${kingdomType}. Show don't tell, use examples and do not say "A recent military event was...". Be specific with names of organizations, individuals, or locations',
    greatest_hope: 'A description of the ${kingdomType}'s greatest hope. Be specific about what this hope is and why it is important',
    darkest_fear: 'A description of the ${kingdomType}'s darkest fear. Be specific about what this fear is and why it is important',
    npc_list: [
      {
        name: 'NPC Name',
        description: 'A brief description of the NPC's role and personality'
      }
      // Repeat the above structure for each NPC
    ]
  }`;
}

export function subLocationsPrompt(kingdomDescription) {
  return `
  Below is a description of a setting:
  ${kingdomDescription}

  Find all sub-locations mentioned in the above text and return a JSON array in the following format. Also, add 3-4 additional important sub-locations that would be found in the setting. Each sub-location should have a 'name' and 'description' key. Temperature: 0.9
  [
    {
      "name": "Name of the sub-location",
      "description": "Two sentences describing the sub-location. The first sentence should be a general overview of the location and the second sentence should provide some information about why the location is important or interesting."
    }
    // Repeat the above structure for each sub-location
  ]
  `;
}

export function factionsPrompt(kingdomDescription) {
  return `
  Below is a description of a place in in JSON format:
  ${kingdomDescription}

  Based on the extensive background information provided about the above location, generate 4-5 faction profiles in JSON format. Each profile should include sections for 'history', 'recent_event', and 'current_situation'. Each section should provide a clear, coherent narrative from the faction's origins through to its current activities and influence. Please format the output as shown in the example below to ensure consistency across all entries.
  Be sure that one of the factions is the ruling faction and another faction should be the arch rival of the ruling faction. Also consider including insurgent, downtrodden, religious, mystical, and outlier factions. Temperature: 0.9

  Example JSON Structure:
  [{
      "name": "Example Faction",
      "history": "Describe the origins and key historical developments of the faction.",
      "recent_event": "Detail a significant event that recently impacted the faction. Be specific about event details including names, locations, and outcomes.",
      "current_situation": "Outline the current goals, challenges, and influence of the faction. This sentence should tie into the previous sentence about the recent event. Be specific with names of organizations, individuals, or locations.",
      "motto": "A short phrase that encapsulates the faction's core beliefs or goals.",
      "faction_leader": "The name of the faction's current leader.",
      "faction_leader_description": "A brief description of the faction leader's personality and leadership style. Always provide a name or at least a title or alias, even if it is unknown to most people",
      "key_resources_and_assets": "What resources (like magical artifacts, strategic locations, skilled warriors) does the faction control? This can be a major factor in their strategies and conflicts.",
      "rites_and_ceremonies": "Describe any rituals, ceremonies, or traditions that are important to the faction. These can be religious, cultural, or political in nature.",
      "recent_ceremony": "Describe a recent celebration or ceremony held by the faction. What was the occasion and how did it reflect the faction's values or goals? Start with a transition like 'Recently,' or 'Last year...' and be specific about the event.",
      "challenge_to_power": "What is the faction's biggest challenge to maintaining or expanding their power? This could be a rival faction, internal dissent, or a looming threat.",
      "challenge_event": "Describe a recent event that exemplifies the faction's biggest challenge. Be specific about the event details and how it affects the faction's power or influence. This should tie into the previous sentence about the faction's challenge to power.",
      "influence_level": "Provide a number from 1-10 that represents the faction's current influence in the kingdom. 1 is the lowest level of influence and 10 is the highest level of influence.",
  }
  // Repeat the above structure for each faction
]`;
}
