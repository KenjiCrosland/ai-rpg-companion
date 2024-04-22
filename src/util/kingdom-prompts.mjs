export function kingdomOverviewPrompt(adjective, kingdomType) {
  return `
  Give me a description of a ${adjective} ${kingdomType}. When describing events and individuals be specific about names and locations. Each key should be a sentence or two, should be detailed and specific and should flow together to create a cohesive description.
  Return the description in JSON format with the following keys:
  {
    overview: 'A brief overview of the ${kingdomType}, with a brief description of its current state',
    history: 'A very brief history of the ${kingdomType}, including its founding and most significant recent events',
    recent_event_consequences: 'describe the consequences of the recent event in the ${kingdomType} described above',
    current_ruler_sentence: 'A sentence describing the ruler of the ${kingdomType}. What have they done to earn their position? What was their most recent significant action?',
    recent_event_political: 'describe a recent political event which reflects the current state of the ${kingdomType}',
    social_history: 'A brief history of the social structure of the ${kingdomType}',
    recent_event_social: 'this sentence should tie into the previous sentence about social history. describe a recent social event which reflects the current state of the ${kingdomType}. Show don't tell, use examples and do not say "A recent social event was...". Be specific with names of organizations, individuals, or locations',
    economic_history: 'A brief history of the economic structure of the ${kingdomType}',
    recent_event_economic: 'this sentence should tie into the previous sentence about economic history. describe a recent economic event which reflects the current state of the ${kingdomType}. Show don't tell, use examples and do not say "A recent economic event was...". Be specific with names of organizations, individuals, or locations',
    military_history: 'A brief history of the military structure of the ${kingdomType}',
    recent_event_military: 'this sentence should tie into the previous sentence about military history. describe a recent military event which reflects the current state of the ${kingdomType}. Show don't tell, use examples and do not say "A recent military event was...". Be specific with names of organizations, individuals, or locations',
    internal_threat_description: 'A description of an internal threat to the ${kingdomType}. This could be environmental, political, social, economic or magical in nature (if the ${kingdomType} has magic). Be specific with names of organizations, individuals, or locations',
    external_threat_description: 'A description of an external threat to the ${kingdomType}. Be specific with names of organizations, individuals, or locations',
    greatest_hope: 'A description of the ${kingdomType}'s greatest hope. Be specific about what this hope is and why it is important',
    darkest_fear: 'A description of the ${kingdomType}'s darkest fear. Be specific about what this fear is and why it is important',
  }
  `;
}
