export function dungeonFormatGuidelines() {
  return `
    Sentence 1: Room-Specific Description

    Guideline: Describe the specific type and characteristics of the room within the dungeon. Include details about its size, purpose, and distinctive features to set the scene for what the players are encountering.

    Examples:

    "The Guardroom is cramped and dimly lit, with rusted weapons and shields adorning its walls."
    "The Alchemist's Lab is cluttered with bubbling potions and strange apparatuses, the air heavy with the scent of chemicals."
    "The Treasure Chamber gleams with gold and jewels, but its opulence is overshadowed by the ominous statues guarding every corner."

    Sentence 2: Atmospheric Details

    Guideline: Focus on sensory experiences specific to the room. Describe smells, lighting, sounds, or any atmospheric element that adds depth to the room’s character.

    Examples:

        "A musty odor permeates the air, mingling with a faint, metallic scent of old battles."
        "Faint, eerie lights from various flasks cast unsettling shadows on the stone walls."
        "The clink of shifting coins echoes softly, disturbed by a barely perceptible draft."

    Sentence 3: Unique Features

    Guideline: Highlight unique, non-interactive elements that make the room special. These can be architectural, artistic, or natural details that contribute to the ambiance without being directly usable by the players.

    Examples:

        "An ancient tapestry, threadbare and faded, depicts a long-forgotten battle, hanging precariously on one wall."
        "Shelves lined with oddly colored fungi emit a faint luminescence, providing the only light in the chamber."
        "Intricate mosaics on the floor, partially covered by dust, show celestial patterns and unknown symbols."

    Sentence 4: Interactive Elements

    Guideline: Introduce objects, guardians, characters, or features in the room that players can interact with. These should be elements that can provoke action, conversation, or decision-making. DO NOT MENTION TRAPS OR ANYTHING HIDDEN TO PLAYERS. DO NOT INCLUDE CHESTS OR TREASURE AT A DUNGEON ENTRANCE.

    Examples:

        "A ghostly figure, clad in ancient armor, paces restlessly, murmuring about a lost battle and a betrayed king."
        "Among the clutter, a prominently placed tome radiates a subtle, magical aura, seemingly beckoning for a closer look."
        "A conspicuously ornate chest sits in the center, its lock glinting ominously under the flickering torchlight."
    `;
}

export function createLocationPrompt(param) {
  if (!param) {
    param = 'a random location';
  }
  return `Write a 4-sentence description of a location in a Tabletop Roleplaying Game. Each sentence must meet the following parameters. Please note that while the example below is of a Tavern, it could be any place:
  
    Sentence 1: Provide a general description of the location's interior or exterior to give players a sense of its dimensions. Examples include:
    
        "The Red Rooster appears to have been converted from an old barn."
        "The Great Oak Inn is two stories high, with giant support beams hewn from ancient cedar."
        "The Grotto is a lantern-lit cave with white-washed walls and stone tables."
    
    Sentence 2: Include an engaging atmospheric detail that is evocative. Focus on smells, lighting and/or sounds. Examples include:
    
        "The first thing you notice is that everything smells like horse."
        "A thick layer of tobacco smoke hangs in the air, obscuring everything."
        "You smell pumpkin garlic soup wafting in from the kitchen."
        "A patchwork of well-worn rugs covers the floor, their frayed edges and faded patterns bearing witness to countless spilled drinks"
        "A haphazard collection of brightly colored plates add a splash of color to the otherwise dimly lit room."
        "The sound of hooves and the distant whinny of horses drift in from the adjoining stable"
        "A gently bubbling pot of mulled wine sits atop the bar, filling the room with a sweet, spiced aroma that beckons patrons to indulge."
        "A mismatched assortment of lanterns hangs from the rafters, casting pools of warm, flickering light throughout the room."
        "Sunlight filters through the stained glass windows, casting kaleidoscopic patterns on the worn floor"

    Sentence 3: Describe an interesting or unusual feature that sets the place apart from others. This could be related to the place's name. Examples include:
    
        "Several poorly taxidermied wolves hang above the tables with lopsided grins."
        "A shrine to Tymora occupies a corner of the room, with fresh flowers laid at the feet of a small stone statue."
        "A monstrous-looking organ dominates the far wall of the tavern, with brass pipes snaking their way from the console haphazardly."
        "A collection of glass bottles, each containing a different exotic creature preserved in fluid, lines the shelves behind the bar"
        "A towering sculpture made entirely of discarded bottle caps occupies a prominent position in the tavern"
        "A collection of delicate glass orbs, each containing a tiny, swirling storm, dangles from the ceiling, casting shimmering patterns on the walls"

    Sentence 4: Describe something or someone the players can interact with. It could be an NPC doing something interesting or saying something unusual or an enticing object:
        "An extremely wizened gnome lady appears to be pouring salt from a bag into a corner of the building saying, 'That will teach em spirits to haunt this here inn!'"
        "A bright red tiefling seems to be gesticulating wildly to his pale elven friend saying, 'Brilliant! Brilliant! Our performance tonight is sure to be wonderous my dear friend'
        "You notice a group of gnomes at a corner table, giggling and whispering excitedly about the arrival of a group of adventurers from a far-off land, while the tavern keeper, a tall and slender elf, pours a goblet of glowing green liquid for a half-ogre sitting at the bar."
        "You hear a deep bass voice laughing from a corner table and yelling out to what appears to be a group of fellow adventurers say, "And then he turned dear Philo here into a newt! A NEWT!""
    
    Based on these style notes, please write a description of ${param}. Please make sure it's only 4 sentences and do not share any hidden details that wouldn't be evident to the players. Make sure to provide unusual and evocative details. Avoid common fantasy tropes. Be sure to provide a unique name for the location. Temperature: 0.9`;
}

export function getLocationJSON() {
  return `Based on the above description, return a JSON object with three keys: locationName locationNPCs and subLocations. locationName should be the location name. locationNPCs should be an array of possible NPCs who are either living in or visiting this location. The NPC name should be a combination of first and last name and occupation like "FIRST_NAME LAST_NAME (PROFESSION). Also provide an array with the key subLocations within this location if there are any. Provide at least 3 for a large location like a town or large building. Provide names of rooms for a building like "kitchen", "cellar" or "scriptorium". Return a JSON string only. No additional comments or text`;
}

export function createNPCPrompt(param) {
  return `Please create an Tabletop Roleplaying NPC description for ${param} in the form of a JSON object using the given instructions and examples as guidelines. The JSON object should include the following keys: character_name, description_of_position, reason_for_being_there, distinctive_feature_or_mannerism, and character_secret. Temperature: 0.9.
    {
        "format": "JSON",
        "instructions": {
            "note": "Examples are separated by '&&' within each instruction. Also each key should flow into the next as though they are part of the same summary. Use transition words to improve the flow between them",
            "character_name": "Please provide the character's name.",
            "description_of_position": "Provide a specific and detailed description of their job or position in society, including a detail that sets them apart from others in that position. && Examples: [NPC_NAME] is the crown prince of the bearfolk Kingdom [KINGDOM_NAME], and he also happens to have the mind of a child. && [NPC_NAME] grew up watching vids of surgery procedures while other kids were playing the latest BD adventure--so it's not surprising he became one of the best known ripperdocs in Night city. && [NPC_NAME] is the fifth (and nearly forgotten) child of the preeminent [NPC_FAMILY_NAME] family, he aspires to be a great hero one day, but his parents barely remember his name. && [NPC_NAME] is a consummate liar, but the fact that at least half of his stories of being a privateer are in fact true (if not embellished for dramatic effect).",
            "reason_for_being_there": "Provide a reason for why they happen to be where they are that aligns with their goals and aspirations. If no location is provided for this NPC please generate one. If it is obvious why they are there (because they are the proprietor or owner, etc) then give a reason for why they have decided to continue to be there. && Examples: Recently [NPC_NAME] has been strutting around in his shining plate armor at the Leaky Tap for days now hoping someone may give him a quest, and no one has the heart to tell him that he looks ridiculous. && For the last few weeks, [NPC_NAME] has been in the jungle collecting species of a rare mantis, hoping that he can get a few live specimens so that he can create a clockwork mantis. && Recently, [NPC_NAME]'s crew mutinied and kicked him off his own ship and he's been drowning his sorrows at the Leaky Tap every since.",
            "distinctive_feature_or_mannerism": "Provide a distinctive feature or peculiar mannerism observable in their actions. && Examples: His pale face is flushed with sweat and exertion from walking around in the plate armor, and he has a bit of a squeaky voice. && [NPC_NAME] absentmindedly tinkers with a small mechanical spider, occasionally muttering to himself as he makes adjustments. && [NPC_NAME] is easy to pick out from a crowd, as he often gestures dramatically with his hands as he spins tales of his past exploits, punctuating his words with sips of his drink.",
            "character_secret": "Provide a secret or hidden motivation that the character has that they are keeping from others. && Examples: [NPC_NAME] secretly hopes that by completing a heroic quest, he will win the approval of his family and be recognized as a true hero. && Although [NPC_NAME] manages to keep a calm facade, he is actually on the run from a rival inventor who wants to steal his clockwork mantis design.",
            "read_aloud_description": "Provide a concise 2-3 sentence description that provides evocative character details. This is meant for a GM to read aloud to players when they meet this character.",
        }
    }`;
}

export function createRelationshipAndTipsPrompt(param) {
  return `Please create description of an relationships for an NPC descrbed by the following JSON object:
    
    ${param}
    
    Please respond in JSON Format with the following keys: relationships, roleplaying_tips. When describing relationships please mention one meaningful event that occurred between the npc and the character they have a relationship with.
    For the descriptions, provide 2 sentences:
    
    Sentence 1 should describe the nature of the relationship and describe how the relationship has changed or evolved or how they met. Describe a scene which occured between the npc and this character. Examples Below:
    [NPC_NAME_1] is a celebrated firedancer whose performances are sought by nobles of the highest echelons. [NPC_NAME_2] met her when trying to steal a brooch from [NPC_NAME_1]'s rival in the green room and despite her better judgement, she fell hopelessly in love with him.
    Aside from tinkering, [NPC_NAME_1]'s adopted human daughter [NPC_NAME_2] has been the greatest joy of his life. However, she has been frequenting the Tarnished Sword tavern listening to tales of adventurers which is causing him no end of worry.
    [NPC_NAME_1]'s older sister [NPC_NAME_2] seems to be the only one in the family who remember's [NPC_NAME_1]'s name. She often comes to the tavern to check in on him, worried that he might go off on a quest.

    Sentence 2 should describe a recent event or development either the relationship or the person's life. Don't say that it's a 'meaningful event' but rather show it through details. Show don't tell:
    [NPC_NAME_1] recently proposed to [NPC_NAME_2], to which she replied "Perhaps" and the ambiguity is driving her mad.
    [NPC_NAME] has recently been sneaking into her father's lab late at night to create battle machines in the hopes that an adventuring group would find her useful.
    Recently, [NPC_NAME] has come to the tavern not just to check on her brother but because she's nursing a crush on [NPC_NAME], hoping that he will turn his gaze her way.
    {
        "format": "JSON",
        "relationships": {
            "Name": "Description (see format above)",
            "Name":  "Description (see format above)",
            "Name": "Description (see format above)",
        },
        "roleplaying_tips": "1-2 sentences of roleplaing tips for this npc. Example: When roleplaying [NPC_NAME], your high pitched voice often breaks. You stutter often out of nervousness. Occasionally you pepper your speech cliched platitudes like \"I just wish to live my life to the fullest! And sometime be known throughout the land!\""
    }
    Please replace "Name" with actual names. This should be a proper noun for an individual not their title or position. Be sure that the relationships object has child keys with the names of each character the npc has relationships with.
    `;
}
