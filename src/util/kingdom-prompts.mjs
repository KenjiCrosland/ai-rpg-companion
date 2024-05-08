export function settingOverviewPrompt(
  adjective,
  setting_type,
  place_name,
  place_lore,
) {
  let initialSentence = `Give me a description of the ${adjective} ${setting_type} of ${place_name}.`;
  if (!place_name) {
    initialSentence = `Give me a description of an ${adjective} ${setting_type}.`;
  }
  return `
  ${initialSentence}. When describing events and individuals be specific about names and locations. Each key should be a sentence or two, should be detailed and specific and should flow together to create a cohesive description. Avoid common fantasy tropes and cliches. Temperature: 0.9

  ${place_lore ? `Additional details about the setting: ${place_lore}.` : ''}
  
  Return the description in JSON format with the following keys. Make sure the npc_list includes all npc names mentioned in the description. The NPCs in npc_list should only be individuals and NOT organizations or groups:
  {
    overview: 'A brief overview of the ${setting_type}, with a brief description of its current state',
    history: 'A very brief history of the ${setting_type}, including its founding and most significant recent events',
    current_ruler_sentence: 'A sentence describing the ruler of the ${setting_type}. What have they done to earn their position? What was their most recent significant action?',
    recent_event_current_ruler: 'describe a recent political event involving the current ruler which reflects the current state of the ${setting_type}',
    recent_event_consequences: 'describe the consequences of the recent political event involving the current ruler',
    social_history: 'A brief history of the social structure of the ${setting_type}',
    recent_event_social: 'this sentence should tie into the previous sentence about social history. describe a recent social event which reflects the current state of the ${setting_type}. Show don't tell, use examples and do not say "A recent social event was...". Be specific with names of organizations, individuals, or locations',
    economic_history: 'A brief history of the economic structure of the ${setting_type}',
    impactful_economic_event: 'describe a recent event that either had a positive or negative impact on the economy of the ${setting_type}. Be specific with names of organizations, individuals, or locations',
    military_history: 'A brief history of the military structure of the ${setting_type}',
    recent_event_military: 'this sentence should tie into the previous sentence about military history. describe a recent military event which reflects the current state of the ${setting_type}. Show don't tell, use examples and do not say "A recent military event was...". Be specific with names of organizations, individuals, or locations',
    greatest_hope: 'A description of the ${setting_type}'s greatest hope. Be specific about what this hope is and why it is important',
    darkest_fear: 'A description of the ${setting_type}'s darkest fear. Be specific about what this fear is and why it is important',
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
  
  Return the description of ${place_name} in JSON format with the following keys. Make sure the npc_list includes all npc names mentioned in the description. The NPCs in npc_list should only be individuals and NOT organizations or groups:
  {
    overview: 'A brief overview of ${place_name}, with a brief description of its current state',
    adjective: 'An adjective that describes ${place_name}',
    setting_type: 'The type of setting ${place_name} is',
    history: 'A very brief history of ${place_name}, including its founding and most significant recent events',
    current_ruler_sentence: 'A sentence describing the ruler of ${place_name}. Since this is a sublocation, this ruler may be a vassal or subordinate to the ruler of the larger setting. What have they done to earn their position? What was their most recent significant action?',
    recent_event_current_ruler: 'describe a recent political event involving the current ruler of the sublocation which reflects the current state of ${place_name}',
    recent_event_consequences: 'describe the consequences of the recent political event involving the current ruler',
    social_history: 'Provide a brief history of ${place_name} and how it plays an important role in the larger setting',
    recent_event_social: 'this sentence should tie into the previous sentence about social history. describe a recent social event which reflects the current state of ${place_name}. Show don't tell, use examples and do not say "A recent social event was...". Be specific with names of organizations, individuals, or locations',
    economic_history: 'A brief history of the economic structure of ${place_name}. If the place is small, describe the economic role of this sublocation in the larger setting',
    impactful_economic_event: 'describe a recent event that either had a positive or negative impact on the economy of ${place_name}. If the place is small, describe how economic events in the larger setting are affecting ${place_name}',
    military_history: 'A brief history of the military structure of ${place_name}. For very small sublocations, this may be a description of the local militia, guard or even an informal posse',
    recent_event_military: 'this sentence should tie into the previous sentence about the security of ${place_name}. If there was no recent military event, describe how a military event in the larger setting is affecting ${place_name}',
    greatest_hope: 'A description of ${place_name}'s greatest hope. Be specific about what this hope is and why it is important',
    darkest_fear: 'A description of ${place_name}'s darkest fear. Be specific about what this fear is and why it is important',
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
      "setting_type": "The type of setting the sub-location is",
      "adjective": "An adjective that describes the setting_type: for example, 'mysterious', 'thriving', 'dangerous'.",
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
      "motto": "A short phrase that encapsulates the faction's core beliefs or goals. This phrase should use symbolic or evocative language, be alliterative or rhyming, and be memorable. Use imagery and metaphor and avoid cliches. Finally this motto should evoke an emotional response and be clever and pithy.",
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

export function createNPCPrompt(
  npcName,
  kingdomDescription,
  factionDescription,
) {
  const factionString = factionDescription
    ? `This character is also a key member of the faction: '${factionDescription}', which influences their decisions and role within the story.`
    : '';

  return `
Please create a detailed Tabletop Roleplaying NPC description for ${npcName}. Below is the character's brief and setting context:

- **Setting Context**: ${kingdomDescription} ${factionString}

Please format the NPC description as a JSON object with the following keys:

description_of_position:
  1. "example_npc_name is the crown prince of the bearfolk Kingdom, and he also happens to have the mind of a child."
  2. "example_npc_name grew up watching vids of surgery procedures while other kids were playing the latest BD adventure—thus becoming one of the best known ripperdocs in Night City."
  3. "example_npc_name is the fifth and nearly forgotten child of the preeminent family, aspiring to be a hero, though his parents barely remember his name."
  4. "example_npc_name is a consummate liar, with at least half of his stories of being a privateer true, if embellished."

current_location:
  1. "Recently, example_npc_name has been strutting around in his shining plate armor at the Leaky Tap for days, hoping for a quest, yet no one has the heart to tell him he looks ridiculous."
  2. "For the last few weeks, example_npc_name has been in the jungle collecting species of a rare mantis, aiming to create a clockwork mantis."
  3. "Recently, after his crew mutinied, example_npc_name has been drowning his sorrows at the Leaky Tap."

distinctive_features_or_mannerisms:
  1. "His pale face is flushed with sweat and exertion from walking around in plate armor, and he has a squeaky voice."
  2. "example_npc_name absentmindedly tinkers with a mechanical spider, muttering as he adjusts it."
  3. "example_npc_name is easy to pick out from a crowd, often gesturing dramatically with his hands while spinning tales, punctuated by sips of his drink."

character_secret:
  1. "example_npc_name secretly hopes that by completing a heroic quest, he will win his family's approval and be recognized as a true hero."
  2. "Although example_npc_name maintains a calm facade, he is on the run from a rival inventor who wants to steal his clockwork mantis design."

Temperature: 0.9.

{
  "description_of_position": "Provide a specific and detailed description of their job or position in society, including a detail that sets them apart from others in that position.",
  "current_location": "Provide a location where ${npcName} can be found and explain why they are there, considering a current goal or aspiration of theirs.",
  "distinctive_features_or_mannerisms": "Provide a distinctive feature or peculiar mannerism observable in their actions. Avoid cliches and consider how these traits might influence their interactions with others.",
  "character_secret": "A hidden motivation or secret of ${npcName} that influences their behavior. Be specific about what this secret is and how it impacts their actions.",
  "read_aloud_description": "A concise 2-3 sentence description designed for a GM to read aloud when players first encounter ${npcName}."
}


`;
}

export function createNPCRelationshipPrompt(
  npcName,
  npcParentText,
  relationshipDescription,
  kingdomDescription,
  factionDescription,
) {
  const factionString = factionDescription
    ? `${npcName} a key member of the faction: '${factionDescription}'.`
    : '';
  return `

Please create a detailed Tabletop Roleplaying NPC description for ${relationshipDescription.name} who has the following relationship with ${npcName}: ${relationshipDescription.description}.

${npcParentText}
${factionString}

Also here is some more context about the setting:
${kingdomDescription}


Please format the NPC description as a JSON object with the following keys:

{
  "description_of_position": "Provide a specific and detailed description of their job or position in society, including a detail that sets them apart from others in that position.",
  "current_location": "Provide a location where ${relationshipDescription.name} can be found and explain why they are there, considering a current goal or aspiration of theirs.",
  "distinctive_features_or_mannerisms": "Provide a distinctive feature or peculiar mannerism observable in their actions. Avoid cliches and consider how these traits might influence their interactions with others.",
  "character_secret": "A hidden motivation or secret of ${relationshipDescription.name} that influences their behavior. Be specific about what this secret is and how it impacts their actions.",
  "read_aloud_description": "A concise 2-3 sentence description designed for a GM to read aloud when players first encounter ${relationshipDescription.name}."
}
`;
}

export function createRelationshipAndTipsPrompt(npc_name, param) {
  return `Please create description of an relationships for an NPC named ${npc_name} descrbed by the following JSON object:
    
    ${param}
    
    Please respond in JSON Format with the following keys: relationships, roleplaying_tips. When describing relationships please mention one meaningful event that occurred between the npc and the character they have a relationship with.
    For the descriptions, provide 2 sentences:
    
    Sentence 1 should describe the nature of the relationship and describe how the relationship has changed or evolved or how they met. Describe a scene which occured between the npc and this character. Examples Below:
    npc_name_1 is a celebrated firedancer whose performances are sought by nobles of the highest echelons. npc_name_2 met her when trying to steal a brooch from npc_name_1's rival in the green room and despite her better judgement, she fell hopelessly in love with him.
    Aside from tinkering, npc_name_1's adopted human daughter npc_name_2 has been the greatest joy of his life. However, she has been frequenting the Tarnished Sword tavern listening to tales of adventurers which is causing him no end of worry.
    npc_name_1's older sister npc_name_2 seems to be the only one in the family who remember's npc_name_1's name. She often comes to the tavern to check in on him, worried that he might go off on a quest.

    Sentence 2 should describe a recent event or development either the relationship or the person's life. Don't say that it's a 'meaningful event' but rather show it through details. Show don't tell:
    npc_name_1 recently proposed to npc_name_2, to which she replied "Perhaps" and the ambiguity is driving him mad.
    npc_name has recently been sneaking into her father's lab late at night to create battle machines in the hopes that an adventuring group would find her useful.
    Recently, npc_name has come to the tavern not just to check on her brother but because she's nursing a crush on npc_name, hoping that he will turn his gaze her way.
    {
        "format": "JSON",
        "relationships": {
            "npc_name_1": "Description (see format above). This should be a single string without brackets",
            "npc_name_2":  "Description (see format above). This should be a single string without brackets",
            "npc_name_3": "Description (see format above). This should be a single string without brackets",
        },
        "roleplaying_tips": "1-2 sentences of roleplaing tips for this npc. Example: When roleplaying npc_name, your high pitched voice often breaks. You stutter often out of nervousness. Occasionally you pepper your speech cliched platitudes like \"I just wish to live my life to the fullest! And sometime be known throughout the land!\""
    }
    Please replace "npc_name" with actual names. This should be a proper noun for an individual not their title or position. Be sure that the relationships object has child keys with the names of each character the npc has relationships with.
    `;
}