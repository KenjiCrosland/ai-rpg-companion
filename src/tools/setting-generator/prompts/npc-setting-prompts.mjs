export function createNPCPrompt(
  npcName,
  kingdomDescription,
  factionDescription,
  shortDescription,
) {
  const factionString = factionDescription
    ? `This character is also a key member of the faction: '${factionDescription}', which influences their decisions and role within the story.`
    : '';

  const shortDescriptionString = shortDescription
    ? `Here is a brief description of ${npcName}: ${shortDescription}`
    : '';

  const npcNameText = npcName ? npcName : 'the NPC';

  return `
Please create a detailed Tabletop Roleplaying NPC description for ${npcNameText}. Below is the character's brief and setting context:

- **Setting Context**: ${kingdomDescription} ${factionString}

${shortDescriptionString}

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
  "name": "Put the NPC's name here",
  "description_of_position": "Provide a specific and detailed description of their job or position in society, including a detail that sets them apart from others in that position.",
  "current_location": "Provide a location where ${npcNameText} can be found and explain why they are there, considering a current goal or aspiration of theirs.",
  "distinctive_features_or_mannerisms": "Provide a distinctive feature or peculiar mannerism observable in their actions. Avoid cliches and consider how these traits might influence their interactions with others.",
  "character_secret": "A hidden motivation or secret of ${npcNameText} that influences their behavior. Be specific about what this secret is and how it impacts their actions.",
  "read_aloud_description": "A concise 2-3 sentence description designed for a GM to read aloud when players first encounter ${npcNameText}."
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

    Don't use the following NPC names: Seraphina, Alistair, Kael, Elara, Thalia, Blackthorn, Nightshade, Lyra, Varian, Selene, Lyria, Isolde.
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

export function generateSingleRelationshipPrompt(npcDescription, settingOverview, relationshipName, relationshipShortDescription) {
  return `
Please create a relationship description for ${relationshipName} who is ${relationshipShortDescription}.

Here is the information about the NPC who needs this relationship:
${npcDescription}

Here is context about the setting:
${settingOverview}

For the description, provide 2 sentences:

Sentence 1 should describe the nature of the relationship and describe how the relationship has changed or evolved or how they met. Describe a scene which occurred between the NPCs. Examples:
- The relationship between Empress Cyndra Moonscale and Sir Garrick Stormwarden began when he pledged his sword to her cause during a rebellion in a remote province, cementing a bond built on trust and shared purpose.
- npc_name_1 is a celebrated firedancer whose performances are sought by nobles of the highest echelons. npc_name_2 met her when trying to steal a brooch from npc_name_1's rival in the green room and despite her better judgement, she fell hopelessly in love with him.

Sentence 2 should describe a recent event or development either the relationship or the person's life. Don't say that it's a 'meaningful event' but rather show it through details. Show don't tell:
- Recently, Sir Garrick has been grappling with doubts about the integrity of some noble houses, seeking Cyndra's guidance as he navigates a path between loyalty to his oath and the growing unrest in the realm.
- npc_name_1 recently proposed to npc_name_2, to which she replied "Perhaps" and the ambiguity is driving him mad.

Don't use the following NPC names: Seraphina, Alistair, Kael, Elara, Thalia, Blackthorn, Nightshade, Lyra, Varian, Selene, Lyria, Isolde.

Temperature: 0.9

Please format as a JSON object:

{
  "name": "${relationshipName}",
  "relationship": "Two sentence description following the format above"
}
`;
}
