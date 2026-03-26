/**
 * statblock-context.mjs
 *
 * Utilities for generating NPC prompts with statblock context.
 * Adapts the prompt based on the creature's INT score.
 */

import { getStatblockFromStorage } from '@/util/statblock-storage.mjs';

/**
 * Get dungeon by name from localStorage
 * @param {string} dungeonName - The name of the dungeon (matches dungeonOverview.name)
 * @returns {Object|null} - The dungeon object or null if not found
 */
function getDungeon(dungeonName) {
  try {
    const dungeons = JSON.parse(localStorage.getItem('dungeons') || '[]');
    // Match by dungeonOverview.name since that's where the name is stored
    const dungeon = dungeons.find(d => d.dungeonOverview?.name === dungeonName);
    return dungeon || null;
  } catch (error) {
    console.error('Error loading dungeon:', error);
    return null;
  }
}

/**
 * Get monster's detailed description from a dungeon
 * @param {Object} dungeon - The dungeon object
 * @param {string} monsterName - The name of the monster
 * @returns {Object|null} - The monster's detailedDescription or null if not found
 */
function getMonsterDetailedDescription(dungeon, monsterName) {
  if (!dungeon || !dungeon.monsters || !Array.isArray(dungeon.monsters)) {
    return null;
  }

  const monster = dungeon.monsters.find(m => m.name === monsterName);
  return monster?.detailedDescription || null;
}

/**
 * Parse ability scores from attributes string format
 * Format: "STR 10 (+0), DEX 16 (+3), CON 16 (+3), INT 1 (-5), WIS 10 (+0), CHA 1 (-5)"
 * @param {string} attributes - The attributes string
 * @returns {Object} - Object with ability scores {str, dex, con, int, wis, cha}
 */
function parseAttributesString(attributes) {
  const scores = {};
  const regex = /(STR|DEX|CON|INT|WIS|CHA)\s+(\d+)/gi;
  let match;
  while ((match = regex.exec(attributes)) !== null) {
    scores[match[1].toLowerCase()] = parseInt(match[2], 10);
  }
  return scores;
}

/**
 * Get the INT score from a statblock
 * @param {Object} statblock - The statblock object
 * @returns {number} - The INT score
 */
function getIntScore(statblock) {
  // Format 1: ability_scores object (hypothetical future format)
  if (statblock.ability_scores && statblock.ability_scores.int !== undefined) {
    return statblock.ability_scores.int;
  }

  // Format 2: Direct int property (SRD format)
  if (statblock.int !== undefined) {
    return statblock.int;
  }

  // Format 3: attributes string (Statblock Generator format)
  if (statblock.attributes && typeof statblock.attributes === 'string') {
    const scores = parseAttributesString(statblock.attributes);
    if (scores.int !== undefined) {
      return scores.int;
    }
  }

  // Default to 10 if not found
  return 10;
}

/**
 * Get all ability scores from a statblock
 * @param {Object} statblock - The statblock object
 * @returns {Object} - Object with {str, dex, con, int, wis, cha}
 */
function getAbilityScores(statblock) {
  // Format 1: ability_scores object
  if (statblock.ability_scores) {
    return {
      str: statblock.ability_scores.str || 10,
      dex: statblock.ability_scores.dex || 10,
      con: statblock.ability_scores.con || 10,
      int: statblock.ability_scores.int || 10,
      wis: statblock.ability_scores.wis || 10,
      cha: statblock.ability_scores.cha || 10
    };
  }

  // Format 2: Direct properties (SRD format)
  if (statblock.str !== undefined || statblock.int !== undefined) {
    return {
      str: statblock.str || 10,
      dex: statblock.dex || 10,
      con: statblock.con || 10,
      int: statblock.int || 10,
      wis: statblock.wis || 10,
      cha: statblock.cha || 10
    };
  }

  // Format 3: attributes string (Statblock Generator format)
  if (statblock.attributes && typeof statblock.attributes === 'string') {
    const scores = parseAttributesString(statblock.attributes);
    return {
      str: scores.str || 10,
      dex: scores.dex || 10,
      con: scores.con || 10,
      int: scores.int || 10,
      wis: scores.wis || 10,
      cha: scores.cha || 10
    };
  }

  // Default to 10 for all
  return { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
}

/**
 * Build statblock context for the NPC generation prompt.
 * Adapts the prompt based on INT score:
 * - INT 6+: Generate an NPC that IS this creature
 * - INT 5 or below: Generate a CREATURE PROFILE (not an NPC)
 *
 * @param {Object} statblockItem - The selected statblock item {name, folder, statblock}
 * @returns {string} - The context to add to the prompt
 */
export function buildStatblockContext(statblockItem) {
  if (!statblockItem || !statblockItem.statblock) {
    return '';
  }

  const monsterData = statblockItem.statblock;
  let statblock;
  let detailedDesc = null;
  let dungeon = null;

  // Check if this is a dungeon-generated monster with references
  if (monsterData.statblock_name && monsterData.statblock_folder) {
    // Use reference system to load the actual statblock
    statblock = getStatblockFromStorage(monsterData.statblock_name, monsterData.statblock_folder);

    // If reference fails, fall back to legacy nested statblock
    if (!statblock && monsterData.statblock) {
      statblock = monsterData.statblock;
    }

    // Extract detailedDescription from the dungeon's monster list (not from statblock)
    detailedDesc = monsterData.detailedDescription;
  } else if (monsterData.statblock) {
    // Legacy: nested statblock without references
    statblock = monsterData.statblock;
    detailedDesc = monsterData.detailedDescription;
  } else {
    // Direct statblock (from Statblock Generator or manual selection)
    statblock = monsterData;
  }

  // If we have a folder name, try to load the dungeon (for overview context and detailedDescription)
  if (statblockItem.folder) {
    dungeon = getDungeon(statblockItem.folder);

    // If we don't have detailedDescription yet, try to load it from the dungeon's monster list
    if (dungeon && !detailedDesc) {
      detailedDesc = getMonsterDetailedDescription(dungeon, statblock.name);
    }
  }

  if (!statblock) {
    return ''; // No statblock found
  }

  // Get ability scores using unified extraction
  const abilityScores = getAbilityScores(statblock);
  const intScore = abilityScores.int;

  // Get key stats
  const name = statblock.name || 'Unknown';
  const size = statblock.size || '';
  const type = statblock.type || statblock.type_and_alignment?.split(',')[0] || '';
  const alignment = statblock.alignment || statblock.type_and_alignment?.split(',')[1]?.trim() || '';
  const cr = statblock.challenge_rating || statblock.cr || '?';
  const intValue = abilityScores.int;
  const wisValue = abilityScores.wis;
  const chaValue = abilityScores.cha;
  const languages = statblock.languages || 'None';

  // Extract 2-3 notable abilities
  const abilities = [];
  if (statblock.special_abilities && Array.isArray(statblock.special_abilities)) {
    abilities.push(...statblock.special_abilities.slice(0, 3).map(a => a.name));
  }
  if (statblock.actions && Array.isArray(statblock.actions)) {
    abilities.push(...statblock.actions.slice(0, 2).map(a => a.name));
  }
  const keyAbilities = abilities.slice(0, 3).join(', ') || 'None';

  // Build additional context from detailed description and dungeon overview (if they exist)
  let additionalContext = '';

  if (detailedDesc || dungeon) {
    additionalContext = '\n\nADDITIONAL CONTEXT FROM DUNGEON:';

    // Add dungeon overview first (provides setting context)
    if (dungeon) {
      if (dungeon.dungeonOverview?.overview) {
        additionalContext += `\n\nDungeon Setting: ${dungeon.dungeonOverview.overview}`;
      }
      if (dungeon.dungeonOverview?.dominant_power) {
        additionalContext += `\n\nDominant Power: ${dungeon.dungeonOverview.dominant_power}`;
        if (dungeon.dungeonOverview.dominant_power_goals) {
          additionalContext += ` Goals: ${dungeon.dungeonOverview.dominant_power_goals}`;
        }
      }
      if (dungeon.dungeonOverview?.main_problem) {
        additionalContext += `\n\nCurrent Situation: ${dungeon.dungeonOverview.main_problem}`;
      }
    }

    // Add creature-specific description (provides individual context)
    if (detailedDesc) {
      if (detailedDesc.intro) {
        additionalContext += `\n\nCreature Introduction: ${detailedDesc.intro}`;
      }
      if (detailedDesc.appearance) {
        additionalContext += `\n\nCreature Appearance: ${detailedDesc.appearance}`;
      }
      if (detailedDesc.behaviorAbilities) {
        additionalContext += `\n\nCreature Behavior & Abilities: ${detailedDesc.behaviorAbilities}`;
      }
      if (detailedDesc.lore) {
        additionalContext += `\n\nCreature Lore: ${detailedDesc.lore}`;
      }
    }
  }

  // Add creature intelligence data (if available from SRD)
  if (statblock.creatureIntelligence) {
    const ci = statblock.creatureIntelligence;

    if (!additionalContext) {
      additionalContext = '\n\nCREATURE INTELLIGENCE DATA:';
    } else {
      additionalContext += '\n\nCREATURE INTELLIGENCE DATA:';
    }

    if (ci.signature) {
      additionalContext += `\n\nSignature: ${ci.signature}`;
    }

    if (ci.description) {
      additionalContext += `\n\nDescription: ${ci.description}`;
    }

    if (ci.tactical_identity) {
      additionalContext += `\n\nTactical Identity: ${ci.tactical_identity}`;
    }

    if (ci.abilities && Array.isArray(ci.abilities)) {
      additionalContext += `\n\nKey Abilities: ${ci.abilities.join('; ')}`;
    }

    if (ci.encounter_hooks && Array.isArray(ci.encounter_hooks)) {
      additionalContext += `\n\nEncounter Hooks: ${ci.encounter_hooks.join('; ')}`;
    }

    if (ci.social) {
      additionalContext += `\n\nSocial Behavior: ${ci.social}`;
    }

    if (ci.retreat) {
      additionalContext += `\n\nRetreat Behavior: ${ci.retreat}`;
    }
  }

  if (intScore >= 6) {
    // Intelligent creature - generate NPC
    return `
This NPC is associated with the following creature statblock:
Name: ${name}
Type: ${size} ${type}, ${alignment}
CR: ${cr}
INT: ${intValue}, WIS: ${wisValue}, CHA: ${chaValue}
Languages: ${languages}
Key abilities: ${keyAbilities}${additionalContext}

Generate an NPC that IS this creature — give it personality, motivations, and relationships appropriate to a ${type} of this intelligence and power level. The NPC should feel like a fully realized character who happens to be this type of creature.${additionalContext ? ' IMPORTANT: Use the dungeon setting, dominant power dynamics, and creature-specific details above to inform the NPC\'s background, appearance, motivations, and current circumstances. This NPC exists within this specific dungeon context and should reflect the tensions, alliances, and events described.' : ''}`;
  } else {
    // Low intelligence - generate creature profile
    return `
CRITICAL RULES — READ BEFORE GENERATING:
- ALWAYS refer to this creature as "it" — never "he", "she", or "they." This is a creature, not a person.
- This creature does NOT dream, yearn, ponder, wish, hope, or wonder. It does not have friendships, bonds, or emotional connections with people.
- It may have instincts, behavioral patterns, temperament, and conditioned responses appropriate to its nature (territorial aggression, curiosity toward light, fleeing when wounded, etc.).

This NPC request is associated with the following creature statblock:
Name: ${name}
Type: ${size} ${type}, ${alignment}
CR: ${cr}
INT: ${intValue}
Key abilities: ${keyAbilities}${additionalContext}

Generate a CREATURE PROFILE — this is a creature that exists in the world and affects the people around it. It is a narrative force, not a speaking character.${additionalContext ? ' IMPORTANT: Use the dungeon setting, dominant power dynamics, and creature-specific details above to inform the creature\'s appearance, behavior patterns, origin story, and its role within this specific dungeon environment. The creature should reflect the tensions and circumstances of the dungeon.' : ''}

FIELD REINTERPRETATION — follow these meanings, NOT the default field meanings:
- character_name: The creature's local name or title as people in the area know it (e.g., "The Shredder of Iron Row", "Old Cutter", "The Whirling Death"). This should sound like a local legend or nickname, NOT a person's given name.
- description_of_position: What the creature IS and what it does. Describe it as a thing, not a person with a job. (e.g., "A whirling construct of blades that patrols the east gate mechanically, attacking anything that crosses an invisible perimeter." NOT "A skilled guardian stationed at the gates.")
- reason_for_being_there: Origin and circumstance — who or what created, summoned, or brought it here? Why hasn't it been destroyed, moved, or contained? What keeps it in this location?
- distinctive_feature_or_mannerism: Observable behaviors ONLY — patrol routes, damage marks, sounds it makes, how it reacts to different stimuli (fire, loud noises, movement). NOT personality quirks. NOT "penchant for humming" or "contemplative pauses."
- character_secret: A hidden truth about the creature that locals don't know — a vulnerability, a trigger, something about its origin, a way to control or disable it, or an unintended side effect of its existence. NOT an emotional yearning or dream.
- read_aloud_description: Describe the creature as a THING the party encounters, emphasizing sensory details — what they see, hear, smell, and feel as they approach. Frame it as a potential threat or wonder, not as a character introduction. Do NOT use "you meet" or "you see [name] standing" — instead describe the creature in action or at rest.
- roleplaying_tips: How a DM should RUN this creature at the table — movement patterns, aggression triggers, threat escalation, retreat behavior, environmental interaction. NOT dialogue advice. This creature does not speak.`;
  }
}

/**
 * Check if a statblock represents an intelligent creature (INT 6+)
 * @param {Object} statblock - The statblock object
 * @returns {boolean} - True if INT >= 6
 */
export function isIntelligentCreature(statblock) {
  if (!statblock) return false;
  return getIntScore(statblock) >= 6;
}
