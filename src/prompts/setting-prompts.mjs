export function settingOverviewPrompt(
  adjective,
  setting_type,
  place_name,
  place_lore,
) {
  let initialSentence = `Give me a description of the ${adjective} ${setting_type} of ${place_name}`;
  if (!place_name) {
    initialSentence = `Give me a description of an ${adjective} ${setting_type}`;
  }
  if (place_lore && !place_name) {
    initialSentence = `Give me a description of a setting`;
    setting_type = 'the setting';
  }
  return `
  ${initialSentence}. When describing events and individuals be specific about names and locations. Try to use creative and unique names and titles which borrow from more than one literary tradition and ethnicity. Each key should be a sentence or two, should be detailed and specific and should flow together to create a cohesive description. Avoid common fantasy tropes and cliches. Temperature: 0.9

  ${place_lore ? `Additional details about the setting: ${place_lore}.` : ''}

  Return the description in JSON format with the following keys. Make sure the npc_list includes all npc names mentioned in the description. The NPCs in npc_list should only be individuals and NOT organizations or groups.
  Don't use the following NPC names: Seraphina, Alistair, Kael, Elara, Thalia, Blackthorn, Nightshade, Lyra, Varian, Selene, Lyria, Isolde. Space is limited so please use shorter consise sentences and avoid run-on sentences:
  {
    name: '${place_name}',
    overview: 'A brief overview of the ${setting_type}, with a brief description of its current state',
    relation_to_larger_setting: 'How does the ${setting_type} relate to the larger setting? What role does it play in the larger setting? How is it situated geographically or politically in relation to the larger setting? Provide a name for the larger setting if possible',
    history: 'A very brief history of the ${setting_type}, including its founding and most significant recent events',
    title: 'A descriptive title like: The Prosperous Village of Greenhaven or The Haunted Ruins of Blackwood. The title MUST include the setting name',
    current_ruler_sentence: 'A sentence describing the ruler of the ${setting_type}. What have they done to earn their position? What was their most recent significant action? Don't use the following names: Seraphina, Alistair, Kael, Elara, Thalia, Blackthorn, Nightshade, Lyra, Varian, Selene, Lyria, Isolde.',
    recent_event_current_ruler: 'describe a recent political event involving the current ruler which reflects the current state of the ${setting_type}',
    recent_event_consequences: 'describe the consequences of the recent political event involving the current ruler',
    social_history: 'A brief history of the social structure of the ${setting_type}',
    recent_event_social: 'this sentence should tie into the previous sentence about social history. describe a recent social event which reflects the current state of the ${setting_type}. Show don't tell, use examples and do not say "A recent social event was...". Be specific with names of organizations, individuals, or locations',
    economic_history: 'A brief history of the economic structure of the ${setting_type}',
    impactful_economic_event: 'describe a recent event that either had a positive or negative impact on the economy of the ${setting_type}. Be specific with names of organizations, individuals, or locations',
    military_history: 'A brief history of the military structure of the ${setting_type}',
    recent_event_military: 'this sentence should tie into the previous sentence about military history. describe a recent military event which reflects the current state of the ${setting_type}. Show don't tell, use examples and do not say "A recent military event was...". Be specific with names of organizations, individuals, or locations',
    main_problem: 'Describe a recent scene which illustrates the main problem that ${place_name} faces. How does this scene illustrate the main problem? What would happen if this problem is not resolved?',
    potential_solutions: '1-2 sentences describing potential solutions to the main problem. Who are the key players championing these solutions and what obstacles are they facing?',
    conclusion: 'A brief conclusion summarizing the current state of ${place_name} and hinting at its future. This should tie back to the main problem and potential solutions',
    npc_list: [
      {
        name: 'NPC Name',
        description: 'A brief description of the NPC's role and personality'
      }
      // Repeat the above structure for each NPC
    ]
  }`;
}

export function sublocationOverviewPrompt(
  place_name,
  place_lore,
  subLocationDescription,
) {
  return `
  Give me a description of ${place_name}. This is a sub-location of a larger setting. Here are some details about the larger setting:

  ${place_lore}.

  Here are some initial details about ${place_name}:

  ${subLocationDescription}.

  When describing events and individuals be specific about names and locations. Each key should be a sentence or two, should be detailed and specific and should flow together to create a cohesive description. Avoid common fantasy tropes and cliches. Temperature: 0.9

  Be sure that the description is specifically about ${place_name} and not the larger setting.
  Don't use the following NPC names: Seraphina, Alistair, Kael, Elara, Thalia, Blackthorn, Nightshade, Lyra, Varian, Selene, Lyria, Isolde.

  Return the description of ${place_name} in JSON format with the following keys. Make sure the npc_list includes all npc names mentioned in the description. The NPCs in npc_list should only be individuals and NOT organizations or groups:
  {
    name: '${place_name}',
    overview: 'A brief overview of ${place_name}, with a brief description of its current state',
    relation_to_larger_setting: 'How does ${place_name} relate to the larger setting? What role does it play in the larger setting? How is it situated geographically or politically in relation to the larger setting? Provide a name for the larger setting if possible',
    adjective: 'An adjective that describes ${place_name}',
    setting_type: 'The type of setting ${place_name} is',
    title: 'A descriptive title like: The Prosperous Village of Greenhaven or The Haunted Ruins of Blackwood. The title MUST include the setting name.',
    history: 'A very brief history of ${place_name}, including its founding and most significant recent events',
    current_ruler_sentence: 'A sentence describing the ruler of ${place_name}. This ruler may be a vassal or subordinate to the ruler of the larger setting. What have they done to earn their position? What was their most recent significant action? If the setting is too small for a leader, mention a prominent individual who frequents this setting.  Don't use the following NPC names: Seraphina, Alistair, Kael, Elara, Thalia, Blackthorn, Nightshade, Lyra, Varian, Selene, Lyria, Isolde.',
    recent_event_current_ruler: 'describe a recent political event involving the current ruler which reflects the current state of ${place_name}',
    recent_event_consequences: 'describe the consequences of the recent political event involving the current ruler',
    social_history: 'Provide a brief history of ${place_name} and how it plays an important role in the larger setting',
    recent_event_social: 'this sentence should tie into the previous sentence about social history. describe a recent social event which reflects the current state of ${place_name}. Show don't tell, use examples and do not say "A recent social event was...". Be specific with names of organizations, individuals, or locations',
    economic_history: 'A brief history of the economic structure of ${place_name}. If the place is small, describe the economic role of this place in the larger setting',
    impactful_economic_event: 'describe a recent event that either had a positive or negative impact on the economy of ${place_name}. If the place is small, describe how economic events in the larger setting are affecting ${place_name}',
    military_history: 'A brief history of the military structure of ${place_name}. For very small settings, this may be a description of the local militia, guard or even an informal posse',
    recent_event_military: 'this sentence should tie into the previous sentence about the security of ${place_name}. If there was no recent military event, describe how a military event in the larger setting is affecting ${place_name}',
    main_problem: 'Describe a recent scene which illustrates the main problem that ${place_name} faces. How does this scene illustrate the main problem? What would happen if this problem is not resolved?',
    potential_solutions: '1-2 sentences describing potential solutions to the main problem. Who are the key players championing these solutions and what obstacles are they facing?',
    conclusion: 'A brief conclusion summarizing the current state of ${place_name} and hinting at its future. This should tie back to the main problem and potential solutions',
    npc_list: [
      {
        name: 'NPC Name',
        description: 'A brief description of the NPC's role and personality'
      }
      // Repeat the above structure for each NPC
    ]
  }`;
}

export function subLocationsPrompt(settingDescription, existingSubLocations) {
  return `
  Below is a description of a setting:
  ${settingDescription}

  Return a JSON array in the following format, including the sub-locations mentioned in the text and 5-6 additional important sub-locations found within the setting. Ensure that each sub-location's scale is appropriate relative to the main location's scale. For example, if the main location is a 'Country', the sublocation may be a 'Region'. If the main location is a 'Region', describe a 'City' or 'Town'. If the main location is a 'City', describe an important 'Area'. If the main location is a 'Building', describe an important 'Room'. If the main location is an 'Area', you might describe a 'Location' within it.

  All sub-locations must be smaller than the location they are a part of and be contained within the larger setting. Do not include neighboring settings or locations that are not part of the setting described in the main location.

  ${existingSubLocations}

  Temperature: 0.9
  [
    {
      "name": "Name of the sub-location",
      "setting_type": "The type of setting the sub-location is, e.g., 'republic', 'empire', 'city-state', 'space station', etc",
      "adjective": "An adjective that describes the setting_type: for example, 'mysterious', 'thriving', 'dangerous'.",
      "title": "A descriptive title like: 'The Prosperous Village of Greenhaven' or 'The Haunted Ruins of Blackwood'. The title MUST include the setting name.",
      "description": "Two sentences describing the sub-location. The first sentence should be a general overview of the location and the second sentence should provide some information about why the location is important or interesting."
    }
    // Repeat the above structure for each sub-location
  ]
  `;
}
