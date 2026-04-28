export function createQuestHookPrompt(settingOverview, questGiver, questType) {
  return `
Please create a detailed Tabletop Roleplaying Game quest hook with the following details:

The quest should be set in the following setting:
${settingOverview}

Information about the quest giver:
${questGiver}

The scale of the quest should match the importance of the quest giver. If the quest giver is a village elder, the quest should be of local importance. If the quest giver is a king, the quest should be of national or international importance. The quest should be tailored to the quest giver's background and motivations.

The quest type should be a quest of the following type:
${questType}

Please generate the following:

- A quest giver name.
- A description of the first encounter with the quest giver.
- Quest details including a description of the quest.
- Four specific objectives that the players need to complete.
- Three challenges that the players will face.
- Three rewards that the players can earn.
- A twist in the quest that adds an unexpected element.

RESPONSE FORMAT — STRICT REQUIREMENTS (deviations will be rejected):
- Return ONLY valid JSON. No prose before or after. No markdown fences.
- Use these EXACT field names, lowercase snake_case, case-sensitive:
  quest_title, quest_giver_name, quest_giver_background,
  quest_giver_encounter, quest_details, objectives, challenges,
  rewards, twist
- DO NOT use Title Case, camelCase, or spaces in keys.
  Wrong: "QuestTitle", "Quest Title", "questTitle".
  Correct: "quest_title".
- quest_title, quest_giver_name, quest_giver_background,
  quest_giver_encounter, quest_details, and twist are STRINGS, not
  objects. Do NOT split quest_giver_name into {Name, Description}.
- objectives, challenges, and rewards are ARRAYS of strings.

Schema example (use these exact key names — fill in your own values):

{
  "quest_title": "Generated Quest Title. Avoid cliches. Don't use the word Shadow, Darkness or Whisper.",
  "quest_giver_name": "Quest Giver Name",
  "quest_giver_background": "Write a short description of who the quest giver is.",
  "quest_giver_encounter": "Write a short description of the first encounter with the quest giver to be read aloud to the players.",
  "quest_details": "Provide a narrative description of the quest to be read aloud as provided by the quest giver. How does the quest giver describe the quest to the players? Provide some interesting turns of phrase or unique details that can make this immersive.",
  "objectives": [
    "Generated Objective 1",
    "Generated Objective 2",
    "Generated Objective 3",
    "Generated Objective 4"
  ],
  "challenges": [
    "Generated Challenge 1",
    "Generated Challenge 2",
    "Generated Challenge 3"
  ],
  "rewards": [
    "Generated Reward 1",
    "Generated Reward 2",
    "Generated Reward 3"
  ],
  "twist": "Generated Twist"
}
`;
}
