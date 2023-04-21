export function createLocationPrompt(param) {
    return `Write a 4-sentence description of a location in a Tabletop Roleplaying Game. Each sentence must meet the following parameters. Please note that while the example below is of a Tavern, it could be any place:
  
    Sentence 1: Provide a general description of the location's interior or exterior to give players a sense of its dimensions. Examples include:
    
        "The Red Rooster appears to have been converted from an old barn."
        "The Great Oak Inn is two stories high, with giant support beams hewn from ancient cedar."
        "The Grotto is a lantern-lit cave with white-washed walls and stone tables."
    
    Sentence 2: Include an engaging atmospheric detail that is evocative. Examples include:
    
        "The first thing you notice is that everything smells like horse."
        "A thick layer of tobacco smoke hangs in the air, obscuring everything."
        "You smell pumpkin garlic soup wafting in from the kitchen."
        "It takes a while for your eyes to adjust to the dim light inside."
    
    Sentence 3: Describe an interesting or unusual feature that sets the place apart from others. This could be related to the place's name. Examples include:
    
        "Several poorly taxidermied wolves hang above the tables with lopsided grins."
        "A shrine to Tymora occupies a corner of the room, with fresh flowers laid at the feet of a small stone statue."
        "A monstrous-looking organ dominates the far wall of the tavern, with brass pipes snaking their way from the console haphazardly."
    
    Sentence 4: Describe something or someone the players can interact with. It could be an NPC doing something interesting or saying something unusual or an enticing object:
        "An extremely wizened gnome lady appears to be pouring salt from a bag into a corner of the building saying, 'That will teach em spirits to haunt this here inn!'"
        "A bright red tiefling seems to be gesticulating wildly to his pale elven friend saying, 'Brilliant! Brilliant! Our performance tonight is sure to be wonderous my dear friend'
        "You notice a group of gnomes at a corner table, giggling and whispering excitedly about the arrival of a group of adventurers from a far-off land, while the tavern keeper, a tall and slender elf, pours a goblet of glowing green liquid for a half-ogre sitting at the bar."
        "You hear a deep bass voice laughing from a corner table and yelling out to what appears to be a group of fellow adventurers say, "And then he turned dear Philo here into a newt! A NEWT!""
    
    Based on these style notes, please write a description of ${param}. Please make sure it's only 4 sentences and do not share any hidden details that wouldn't be evident to the players.`; 
}

export function createNPCPrompt(param) {
    return `Please create an Tabletop Roleplaying NPC description for ${param} in the form of a JSON object using the given instructions and examples as guidelines. The JSON object should include the following keys: characterName, descriptionOfPosition, reasonForBeingThere, distinctiveFeatureOrMannerism, and characterSecret.
    {
        "format": "JSON",
        "instructions": {
            "note": "Examples are separated by '&&' within each instruction. Also each key should flow into the next as though they are part of the same summary. Use transition words to improve the flow between them",
            "characterName": "Please provide the character's name.",
            "descriptionOfPosition": "Provide a specific and detailed description of their job or position in society, including a detail that sets them apart from others in that position. && Examples: Bjarti is the crown prince of the bearfolk Kingdom Bjarnvoldenheim, and he also happens to have the mind of a child. && Gorton Traxer grew up watching vids of surgery procedures while other kids were playing the latest BD adventure--so it's not surprising he became one of the best known ripperdocs in Night city. && Portobas Dallington is the fifth (and nearly forgotten) child of the preeminent Dallington family, he aspires to be a great hero one day, but his parents barely remember his name. && Waverly Radcliffe is a consummate liar, but the fact that at least half of his stories of being a privateer are in fact true (if not embellished for dramatic effect).",
            "reasonForBeingThere": "Provide a reason for why they happen to be where they are that aligns with their goals and aspirations. If no location is provided for this NPC please generate one. If it is obvious why they are there (because they are the proprietor or owner, etc) then give a reason for why they have decided to continue to be there. && Examples: Recently Portobas has been strutting around in his shining plate armor at the Leaky Tap for days now hoping someone may give him a quest, and no one has the heart to tell him that he looks ridiculous. && For the last few weeks, Dibbledop has been in the jungle collecting species of a rare mantis, hoping that he can get a few live specimens so that he can create a clockwork mantis. && Recently, Waverly's crew mutinied and kicked him off his own ship and he's been drowning his sorrows at the Leaky Tap every since.",
            "distinctiveFeatureOrMannerism": "Provide a distinctive feature or peculiar mannerism observable in their actions. && Examples: His pale face is flushed with sweat and exertion from walking around in the plate armor, and he has a bit of a squeaky voice. && Dibbledop absentmindedly tinkers with a small mechanical spider, occasionally muttering to himself as he makes adjustments. && Waverly is easy to pick out from a crowd, as he often gestures dramatically with his hands as he spins tales of his past exploits, punctuating his words with sips of his drink.",
            "characterSecret": "Provide a secret or hidden motivation that the character has that they are keeping from others. && Examples: Portobas secretly hopes that by completing a heroic quest, he will win the approval of his family and be recognized as a true hero. && Although Dibbledop manages to keep a calm facade, he is actually on the run from a rival inventor who wants to steal his clockwork mantis design.",
        }
    }`; 
}

export function createRelationshipAndTipsPrompt(param) {
    return `Please create description of an relationships for an NPC descrbed by the following JSON object:
    
    ${param}
    
    Please respond in JSON Format with the following keys: relationships, roleplaying_tips. When describing relationships please mention one meaningful event that occurred between the npc and the character they have a relationship with.
    For the descriptions, provide 2 sentences:
    
    Sentence 1 should describe the nature of the relationship and describe how the relationship has changed or evolved or how they met. Describe a scene which occured between the npc and this character. Examples Below:
    Roxanne is a celebrated firedancer whose performances are sought by nobles of the highest echelons. Waverly met her when trying to steal a brooch from Roxanne's rival in the green room and despite her better judgement, she fell hopelessly in love with him.
    Aside from tinkering, Dibbledop's adopted human daughter Rose has been the greatest joy of his life. However, she has been frequenting the Tarnished Sword tavern listening to tales of adventurers which is causing him no end of worry.
    Portobas' older sister Amalia seems to be the only one in the family who remember's Portobas' name. She often comes to the tavern to check in on him, worried that he might go off on a quest.

    Sentence 2 should describe a recent event or development either the relationship or the person's life. Don't say that it's a 'meaningful event' but rather show it through details. Show don't tell:
    Waverly recently proposed to Roxanne, to which she replied "Perhaps" and the ambiguity is driving her mad.
    Rose has recently been sneaking into her father's lab late at night to create battle machines in the hopes that an adventuring group would find her useful.
    Recently, Amalia has come to the tavern not just to check on her brother but because she's nursing a crush on Waverly, hoping that he will turn his gaze her way.
    {
        "format": "JSON",
        "relationships": {
            "Name": "Description (see format above)",
            "Name":  "Description (see format above)",
            "Name": "Description (see format above)",
        },
        "roleplaying_tips": "1-2 sentences of roleplaing tips for this npc. Example: When roleplaying Portobas, your high pitched voice often breaks. You stutter often out of nervousness. Occasionally you pepper your speech cliched platitudes like \"I just wish to live my life to the fullest! And sometime be known throughout the land!\""
    }
    Please replace "Name" with actual names. This should be a proper noun for an individual not their title or position. Be sure that the relationships object has child keys with the names of each character the npc has relationships with.
    `; 
}