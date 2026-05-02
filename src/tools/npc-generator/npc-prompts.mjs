export function createNPCPrompt(param, { isCreatureProfile = false } = {}) {
  // Use different key names for creature profiles to avoid person-priming
  if (isCreatureProfile) {
    return `CRITICAL: This is a CREATURE PROFILE, not an NPC. Use "it" pronouns only. Do not anthropomorphize.

Please create a creature profile for ${param} in the form of a JSON object. The JSON object should include the following keys: creature_title, creature_description, origin_and_circumstance, observable_behaviors, hidden_truth, encounter_description, and dm_guidance. Temperature: 0.9.
    {
        "format": "JSON",
        "instructions": {
            "note": "This is a CREATURE, not a person. Each key should flow into the next. Use transition words between them. NEVER use he/she/they pronouns — only 'it'.",
            "creature_title": "The local name or title people use for this creature. Examples: 'The Shredder of Iron Row', 'Old Cutter', 'The Whirling Death', 'The Thing in the Cellar'. This should sound like a local legend or nickname, NOT a person's given name.",
            "creature_description": "What the creature IS and what it does. Describe it as a THING, not a person with a job. Examples: 'A whirling construct of blades that patrols the east gate mechanically, attacking anything that crosses an invisible perimeter.' NOT 'A skilled guardian stationed at the gates.' Focus on WHAT IT IS physically and WHAT IT DOES mechanically.",
            "origin_and_circumstance": "Origin and circumstance — who or what created, summoned, or brought it here? Why hasn't it been destroyed, moved, or contained? What keeps it in this location? Examples: 'A wizard's failed experiment abandoned when the tower burned, now territorial over the ruins it cannot leave.' NOT 'It chose to stay because it loves the area.'",
            "observable_behaviors": "Observable behaviors ONLY. Patrol routes, damage marks, sounds it makes, how it reacts to different stimuli (fire, loud noises, movement, time of day). Examples: 'It carves spiraling patterns into any wooden surface it encounters, and freezes motionless when hearing running water.' NOT 'It has a penchant for humming' or 'It pauses contemplatively.'",
            "hidden_truth": "A hidden truth about the creature that locals don't know. A vulnerability, a trigger, something about its origin, a way to control or disable it, or an unintended side effect of its existence. Examples: 'It will ignore anyone carrying a lit candle — a remnant of its original protection programming.' NOT 'It secretly yearns for friendship' or 'It dreams of freedom.'",
            "encounter_description": "Describe the creature as a THING the party encounters. Emphasize sensory details — what they see, hear, smell, and feel as they approach. Frame it as a potential threat or wonder, not a character introduction. Do NOT use 'you meet' or 'you see [name] standing' — instead describe the creature in action or at rest. Example: 'The grinding of metal on stone echoes from the gate — a mass of spinning blades suspended in a vaguely humanoid frame, etching endless patterns into the cobblestones as it pivots in mechanical arcs.'",
            "dm_guidance": "How a DM should RUN this creature at the table — movement patterns, aggression triggers, threat escalation, retreat behavior, environmental interaction. NOT dialogue advice. This creature does not speak. Examples: 'It attacks the first target that crosses within 15 feet of the gate. If damaged below half health, it retreats to the gate's center and spins faster, creating a defensive barrier. It ignores targets that remain motionless.' NOT 'Speak in a gravelly voice' or 'It will try to negotiate.'"
        }
    }`;
  }

  // Standard NPC prompt (existing)
  return `Please create an Tabletop Roleplaying NPC description for ${param} in the form of a JSON object using the given instructions and examples as guidelines. The JSON object should include the following keys: character_name, description_of_position, reason_for_being_there, distinctive_feature_or_mannerism, character_secret, read_aloud_description, and roleplaying_tips. Temperature: 0.9.
    {
        "format": "JSON",
        "instructions": {
            "note": "Examples are separated by '&&' within each instruction. Also each key should flow into the next as though they are part of the same summary. Use transition words to improve the flow between them",
            "character_name": "The character's proper name ONLY — the noun phrase that identifies them as an individual. Typically 1-4 words. Do NOT include role, title-with-relation, em-dashes, parentheticals, or any descriptive phrasing — that content belongs in description_of_position. Good: 'Korrish', 'Yelena of the Duskwood', 'Master Smith Gorvak', 'Captain Veylin'. BAD: 'Korrish — Salt-sacrificed oracle bound into the Salt-Tongue' (the part after the dash is description, not name; use just 'Korrish'). If the source text already provides a name, use it verbatim with no additions.",
            "description_of_position": "Provide a specific and detailed description of their job or position in society, including a detail that sets them apart from others in that position. && Examples: npc_name is the crown prince of the bearfolk Kingdom [KINGDOM_NAME], and he also happens to have the mind of a child. && npc_name grew up watching vids of surgery procedures while other kids were playing the latest BD adventure--so it's not surprising he became one of the best known ripperdocs in Night city. && npc_name is the fifth (and nearly forgotten) child of the preeminent [NPC_FAMILY_NAME] family, he aspires to be a great hero one day, but his parents barely remember his name. && npc_name is a consummate liar, but the fact that at least half of his stories of being a privateer are in fact true (if not embellished for dramatic effect).",
            "reason_for_being_there": "Provide a reason for why they happen to be where they are that aligns with their goals and aspirations. If no location is provided for this NPC please generate one. If it is obvious why they are there (because they are the proprietor or owner, etc) then give a reason for why they have decided to continue to be there. && Examples: Recently npc_name has been strutting around in his shining plate armor at the Leaky Tap for days now hoping someone may give him a quest, and no one has the heart to tell him that he looks ridiculous. && For the last few weeks, npc_name has been in the jungle collecting species of a rare mantis, hoping that he can get a few live specimens so that he can create a clockwork mantis. && Recently, npc_name's crew mutinied and kicked him off his own ship and he's been drowning his sorrows at the Leaky Tap every since.",
            "distinctive_feature_or_mannerism": "Provide a distinctive feature or peculiar mannerism observable in their actions. && Examples: His pale face is flushed with sweat and exertion from walking around in the plate armor, and he has a bit of a squeaky voice. && npc_name absentmindedly tinkers with a small mechanical spider, occasionally muttering to himself as he makes adjustments. && npc_name is easy to pick out from a crowd, as he often gestures dramatically with his hands as he spins tales of his past exploits, punctuating his words with sips of his drink.",
            "character_secret": "Provide a secret or hidden motivation that the character has that they are keeping from others. && Examples: npc_name secretly hopes that by completing a heroic quest, he will win the approval of his family and be recognized as a true hero. && Although npc_name manages to keep a calm facade, he is actually on the run from a rival inventor who wants to steal his clockwork mantis design.",
            "read_aloud_description": "Provide a concise 2-3 sentence description that provides evocative character details. This is meant for a GM to read aloud to players when they meet this character.",
            "roleplaying_tips": "Provide 1-2 sentences of roleplaying tips for this NPC. && Examples: When roleplaying npc_name, your high pitched voice often breaks. You stutter often out of nervousness. Occasionally you pepper your speech cliched platitudes like \"I just wish to live my life to the fullest! And sometime be known throughout the land!\" && When roleplaying npc_name, speak with a thick accent and use technical jargon about cybernetics. Refer to the body as \"meat\" and augmentations as \"chrome.\""
        }
    }`;
}

export function createRelationshipAndTipsPrompt(param, { isCreatureProfile = false } = {}) {
  // Branch based on whether this is a creature profile or standard NPC
  if (isCreatureProfile) {
    return `Please create descriptions of ASSOCIATED FIGURES for the creature described by the following JSON object:

    ${param}

    CRITICAL RULES:
    - These are NOT interpersonal relationships. This creature does not have friendships, romantic interests, or emotional bonds.
    - These are PEOPLE OR CREATURES who have encountered, been affected by, or interact with this creature in observable ways.
    - Focus on what locals DO in response to this creature, NOT what they feel.
    - Describe observable interactions, not emotional connections.

    Please respond in JSON Format with the following key: relationships.

    For each associated figure, provide 2 sentences:

    SENTENCE 1 — How this person/creature interacts with or has been affected by the creature:
    Examples:
    - Marrik the blacksmith feeds it scraps twice daily at dawn and dusk, maintaining a pattern that began when the creature spared his daughter during its first rampage three years ago.
    - Captain Yendra has been tracking its movement patterns for months, placing scent markers around the perimeter to test whether it can be conditioned to avoid the eastern quarter.
    - Old Greta walks the long route to market every morning to avoid the alley where it nests, and warns newcomers to do the same with hand gestures and urgent whispers.
    - Brother Talmund discovered that it recoils from the sound of temple bells, and now rings them every evening at sundown as a ward against intrusion.

    SENTENCE 2 — A recent observable event or change in their interaction:
    Examples:
    - Last week it appeared at the forge late at night when Marrik forgot the evening feeding, clawing deep grooves into the door but leaving before dawn.
    - Three days ago it followed one of Yendra's scouts for two miles beyond its usual territory, then stopped at the river and turned back—the first time she's seen it cross its own boundary.
    - Yesterday Greta saw it carrying something in its jaws into the alley—something the size of a child—and has stopped eating since.
    - Two nights ago the creature arrived during evening prayers despite the bells, sat motionless in the courtyard for an hour, then departed without attacking—Talmund has not rung the bells since.

    DO NOT INCLUDE:
    - Emotional bonds ("they became friends", "she loves it", "he trusts it")
    - Dialogue or communication between the person and creature
    - The creature having preferences for specific people
    - People understanding the creature's intentions or feelings

    DO INCLUDE:
    - Observable actions and responses
    - Patterns of behavior (feeding, avoidance, tracking)
    - Consequences and effects on the local area
    - Practical adaptations people have made
    - Recent changes that create tension or questions

    {
        "format": "JSON",
        "relationships": {
            "person_name_1": "Description (see format above). This should be a single string without brackets",
            "person_name_2":  "Description (see format above). This should be a single string without brackets",
            "person_name_3": "Description (see format above). This should be a single string without brackets"
        }
    }

    Please replace "person_name" with actual names. Use proper nouns for individuals, not titles. Be sure that the relationships object has child keys with the names of each person associated with this creature.
    `;
  }

  // Standard NPC relationship prompt (existing)
  return `Please create description of relationships for an NPC described by the following JSON object:

    ${param}

    Please respond in JSON Format with the following key: relationships. When describing relationships please mention one meaningful event that occurred between the npc and the character they have a relationship with.
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
            "npc_name_3": "Description (see format above). This should be a single string without brackets"
        }
    }
    Please replace "npc_name" with actual names. This should be a proper noun for an individual not their title or position. Be sure that the relationships object has child keys with the names of each character the npc has relationships with.
    `;
}

export function generateSingleRelationshipPrompt(npcDescription, relationshipName, relationshipShortDescription) {
  return `
You are creating a compelling NPC relationship for a tabletop RPG. This relationship must be SPECIFIC, DRAMATIC, and immediately usable at the game table.

=== THE NPC WHO NEEDS THIS RELATIONSHIP ===
${npcDescription}

=== THE RELATIONSHIP TARGET ===
Name: ${relationshipName}
Description: ${relationshipShortDescription}

CRITICAL REQUIREMENTS:
1. Make this relationship DRAMATIC and SPECIFIC - avoid generic descriptions
2. Include a CONCRETE EVENT that happened between them - not vague history
3. The relationship should create roleplaying opportunities and potential conflicts
4. Use the NPC's personality, role, or secrets to inform the dynamic
5. Create tension or opportunity that a DM can USE at the table

FORMAT (exactly 2 sentences):

SENTENCE 1: Describe HOW they met or how the relationship formed through a SPECIFIC EVENT. Include:
- A concrete scene or moment (not "they've known each other for years")
- The nature of their connection (ally, rival, complicated history, etc.)
- A detail that makes it memorable and unique

SENTENCE 2: Describe a RECENT DEVELOPMENT that creates tension or opportunity:
- Something that happened in the last few weeks/days
- A change in their dynamic, a betrayal, a favor owed, new information revealed
- Something that a DM can USE at the table to create drama
- Show, don't tell - use specific details, not emotional adjectives

EXAMPLES OF COMPELLING RELATIONSHIPS:
✓ GOOD: "${relationshipName} discovered them taking bribes from the merchant's guild three nights ago, and rather than report it to the council, demanded a seat at their table and a cut of whatever scheme they're running—they've been avoiding each other in public ever since, but the debt remains."

✓ GOOD: "They saved ${relationshipName}'s life during the assassination attempt at the winter gala, taking a poisoned blade meant for the ambassador, but ${relationshipName} saw them plant false evidence on the assassin's corpse afterward and now carries that terrible knowledge in silence."

✗ BAD: "They have a complicated history together and sometimes argue about their different approaches to handling political matters."

✗ BAD: "${relationshipName} is an old friend who they trust completely and rely on for emotional support during difficult times."

FORBIDDEN NAMES (do not use): Seraphina, Alistair, Kael, Elara, Thalia, Blackthorn, Nightshade, Lyra, Varian, Selene, Lyria, Isolde, Morgana, Raven, Thorne

Return ONLY valid JSON:
{
  "name": "${relationshipName}",
  "relationship": "Two sentences as specified above"
}
`;
}
