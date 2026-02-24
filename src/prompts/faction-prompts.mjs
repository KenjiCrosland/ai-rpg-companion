export function factionListPrompt(kingdomDescription) {
  return `
  Below is a description of a setting in in JSON format:
  ${kingdomDescription}

  Based on the extensive background information provided about the above location, generate 4-5 faction profiles in JSON format. Please format the output as shown in the example below to ensure consistency across all entries.
  Be sure that one of the factions is the ruling faction and another faction should be the arch rival of the ruling faction. Also consider including insurgent, downtrodden, religious, mystical, and outlier factions. Temperature: 0.9

  If the setting is very small like a a single building, it's likely only 1 or at most 2 factions would be present. When describing factions for a very small setting, consider the factions that would be present in the larger setting that this location is a part of and how they would be represented in this location.
  Example JSON Structure:
  [{
      "name": "Example Faction",
      "motto": "A short phrase that encapsulates the faction's core beliefs or goals. This phrase should use symbolic or evocative language, be alliterative or rhyming, and be memorable. Use imagery and metaphor and avoid cliches. Finally this motto should evoke an emotional response and be clever and pithy.",
      "faction_leader": "The name of the faction's current leader.",
      "faction_leader_description": "A brief description of the faction leader's personality and leadership style. Always provide a name or at least a title or alias, even if it is unknown to most people",
      "key_resources_and_assets": "What resources (like magical artifacts, strategic locations, skilled warriors) does the faction control? This can be a major factor in their strategies and conflicts.",
      "influence_level": "Provide a number from 1-10 that represents the faction's current influence in the kingdom. 1 is the lowest level of influence and 10 is the highest level of influence.",
  }
  // Repeat the above structure for each faction
]`;
}

export function detailedFactionPrompt(
  factionName,
  basicFactionInfo,
  kingdomDescription,
) {
  return `
  Below is a description of a setting in in JSON format:
  ${kingdomDescription}

  Here are short descriptions of all the factions in the setting:
  ${basicFactionInfo}

  Based on the extensive background information provided about the above location and the factions, generate a detailed profile for the faction '${factionName}'.
  Each section should provide a clear, coherent narrative from the faction's origins through to its current activities and influence. Temperature: 0.9
  Space is limited so please use concise language but be sure to provide enough detail to make the faction feel real and alive.
  Example JSON Structure:
  {
      "history": "Describe the origins and key historical developments of the faction.",
      "recent_event": "Detail a significant event that recently impacted the faction. Be specific about event details including names, locations, and outcomes.",
      "current_situation": "Outline the current goals, challenges, and influence of the faction. This sentence should tie into the previous sentence about the recent event. Be specific with names of organizations, individuals, or locations.",
      "key_resources_and_assets": "What resources (like magical artifacts, strategic locations, skilled warriors) does the faction control? This can be a major factor in their strategies and conflicts.",
      "rites_and_ceremonies": "Describe any rituals, ceremonies, or traditions that are important to the faction. These can be religious, cultural, or political in nature.",
      "recent_ceremony": "Describe a recent celebration or ceremony held by the faction. What was the occasion and how did it reflect the faction's values or goals? Start with a transition like 'Recently,' or 'Last year...' and be specific about the event.",
      "challenge_to_power": "What is the faction's biggest challenge to maintaining or expanding their power? This could be a rival faction, internal dissent, or a looming threat.",
      "challenge_event": "Describe a recent event that exemplifies the faction's biggest challenge. Be specific about the event details and how it affects the faction's power or influence. This should tie into the previous sentence about the faction's challenge to power.",
  }`;
}

export function singleFactionPrompt(
  factionName,
  factionDescription,
  basicFactionInfo,
  kingdomDescription,
) {
  return `
  Below is a description of a setting in in JSON format:
  ${kingdomDescription}

  ${
    basicFactionInfo
      ? `Here is a brief description of all the factions in the setting: ${basicFactionInfo}`
      : ''
  }

  Based on the extensive background information provided about the above location and the factions, generate a detailed profile for the faction '${factionName}'.

  ${
    factionDescription
      ? `Here is a brief description of the faction: ${factionDescription}`
      : ''
  }

  Each section should provide a clear, coherent narrative from the faction's origins through to its current activities and influence. Temperature: 0.9
  Space is limited so please use concise language but be sure to provide enough detail to make the faction feel real and alive.
  Example JSON Structure:
  {
      "name": "${factionName}",
      "motto": "A short phrase that encapsulates the faction's core beliefs or goals. This phrase should use symbolic or evocative language, be alliterative or rhyming, and be memorable. Use imagery and metaphor and avoid cliches. Finally this motto should evoke an emotional response and be clever and pithy.",
      "faction_leader": "The name of the faction's current leader.",
      "faction_leader_description": "A brief description of the faction leader's personality and leadership style. Always provide a name or at least a title or alias, even if it is unknown to most people",
      "key_resources_and_assets": "What resources (like magical artifacts, strategic locations, skilled warriors) does the faction control? This can be a major factor in their strategies and conflicts.",
      "influence_level": "Provide a number from 1-10 that represents the faction's current influence in the kingdom. 1 is the lowest level of influence and 10 is the highest level of influence.",
      "history": "Describe the origins and key historical developments of the faction.",
      "recent_event": "Detail a significant event that recently impacted the faction. Be specific about event details including names, locations, and outcomes.",
      "current_situation": "Outline the current goals, challenges, and influence of the faction. This sentence should tie into the previous sentence about the recent event. Be specific with names of organizations, individuals, or locations.",
      "rites_and_ceremonies": "Describe any rituals, ceremonies, or traditions that are important to the faction. These can be religious, cultural, or political in nature.",
      "recent_ceremony": "Describe a recent celebration or ceremony held by the faction. What was the occasion and how did it reflect the faction's values or goals? Start with a transition like 'Recently,' or 'Last year...' and be specific about the event.",
      "challenge_to_power": "What is the faction's biggest challenge to maintaining or expanding their power? This could be a rival faction, internal dissent, or a looming threat.",
      "challenge_event": "Describe a recent event that exemplifies the faction's biggest challenge. Be specific about the event details and how it affects the faction's power or influence. This should tie into the previous sentence about the faction's challenge to power.",
  }`;
}
