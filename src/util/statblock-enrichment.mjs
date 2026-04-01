/**
 * Custom Statblock Enrichment
 *
 * Generates creature-intelligence data for custom statblocks.
 * Runs once per statblock and caches results in localStorage.
 */

import { generateGptResponse } from "@/util/ai-client.mjs";

/**
 * Build the enrichment prompt for a custom statblock.
 *
 * @param {Object} statblock - Statblock object with name, stats, abilities
 * @returns {string} Enrichment prompt
 */
export function buildEnrichmentPrompt(statblock) {
  // Convert statblock to text format
  const statblockText = formatStatblockAsText(statblock);

  return `You are generating creature intelligence data for a custom D&D 5e statblock.
Analyze the statblock below and produce a JSON object with these fields.

IMPORTANT: Use lowercase field names in the JSON output.

Field: "description" (string, 2 sentences)
Sentence 1: Physical appearance — what players SEE. Be specific and visual.
Sentence 2: Behavioral identity — what this creature IS as a story character.
Use the statblock's abilities, type, and flavor to infer behavior.
If INT is 5 or below, the creature is instinct-driven — say so.
If INT is 6+, describe its personality and approach.

Field: "signature" (string, 1 sentence)
The single most important tactical fact about this creature. What makes
fighting it different from fighting anything else? Lead with the ability
that defines the encounter.

Field: "abilities" (array of strings)
One line per ability from the statblock. Name, brief mechanical summary.
Include actions, reactions, traits, legendary actions, lair actions.
Skip passive senses and basic movement unless unusual.

Field: "tactical_identity" (string, 1-2 sentences)
How this creature fights as a whole. What's its strategy? What combo
does it try to execute? What role does it play in a group?

Field: "encounter_hooks" (array of 2-3 strings)
What makes THIS creature's fight interesting for players. Reference
specific abilities, weaknesses, and tactical choices the party faces.

Field: "preferred_tones" (array of 2-4 strings)
Which encounter tones fit this creature, ordered by priority. Choose
from ONLY these 12 values:
  interrupted_activity, quiet_tension, triggered_mistake,
  already_in_motion, something_wrong, standoff, false_hospitality,
  desperate_plea, hidden_predator, wrong_enemy, ticking_clock, aftermath

Rules:
- INT 5 or below: ONLY use interrupted_activity, already_in_motion,
  triggered_mistake, quiet_tension
- Shapechangers/disguise: MUST include false_hospitality or hidden_predator
- Social creatures (INT 10+, languages): include at least one social tone
  (standoff, false_hospitality, desperate_plea)

Field: "retreat" (string or null)
How the creature behaves when losing. Null for mindless/fight-to-death.
If the statblock has escape abilities (teleport, fly, invisibility,
burrow, gaseous form), describe the escape method and threshold.
If the creature is undead, construct, or has no escape ability, null.

Field: "social" (string or null)
What the creature wants from a non-violent approach. Null for INT 5
or below, or creatures that cannot/will not communicate.
If INT 6+, describe what it wants and how it negotiates.
Check Languages — "understands but cannot speak" means limited or
no social interaction.

ABILITY FLAVOR CHECK:
Read the flavor text of every ability, not just the mechanics. If any
ability implies the creature is cursed, trapped, compelled, or seeking
help, this MUST inform the social and retreat fields — even if INT is
low or the creature cannot speak.

A creature that mechanically forces others to "free it from its bell"
has a social identity: it wants release. A creature that "cannot stop
ringing even if it wanted to" is tragic, not mindless.

Alignment matters: neutral or good-aligned creatures with compulsion
abilities are victims, not villains. The social field should reflect
what they want (freedom, death, silence) even if they can't articulate it.

Field: "aftermath_hooks" (array of 2-3 strings)
Creature-specific aftermath material. Each hook should be:
- A physical object with an unexplained detail, OR
- A post-combat mechanic (rejuvenation, return, escape), OR
- A connection to the wider world (factions, settlements, other creatures)
No generic fantasy ("ancient relic," "mysterious artifact").

Expected JSON format:
{
  "name": "Creature Name",
  "description": "Two sentences here.",
  "signature": "One sentence here.",
  "abilities": ["Ability 1: details", "Ability 2: details"],
  "tactical_identity": "One to two sentences here.",
  "encounter_hooks": ["Hook 1", "Hook 2", "Hook 3"],
  "preferred_tones": ["tone1", "tone2", "tone3"],
  "retreat": "Description or null",
  "social": "Description or null",
  "aftermath_hooks": ["Hook 1", "Hook 2", "Hook 3"]
}

Return ONLY the JSON object. No markdown, no explanation.

STATBLOCK:
${statblockText}`;
}

/**
 * Format a statblock object as readable text for the enrichment prompt.
 *
 * @param {Object} statblock - Statblock with name, stats, abilities, etc.
 * @returns {string} Formatted statblock text
 */
function formatStatblockAsText(statblock) {
  const lines = [];

  lines.push(`NAME: ${statblock.name || 'Unknown'}`);

  // Type and alignment (custom format)
  if (statblock.type_and_alignment) {
    lines.push(`TYPE: ${statblock.type_and_alignment}`);
  }

  // CR
  const cr = statblock.challenge_rating || statblock.cr || '?';
  lines.push(`CR: ${cr}`);
  lines.push('');

  // Ability scores (custom format: "STR 18 (+4), DEX 16 (+3)...")
  if (statblock.attributes) {
    lines.push('ABILITY SCORES:');
    lines.push(statblock.attributes);
    lines.push('');
  }

  // Core stats
  if (statblock.armor_class) lines.push(`AC: ${statblock.armor_class}`);
  if (statblock.hit_points) lines.push(`HP: ${statblock.hit_points}`);
  if (statblock.speed) lines.push(`Speed: ${statblock.speed}`);
  if (statblock.senses) lines.push(`Senses: ${statblock.senses}`);
  if (statblock.languages) lines.push(`Languages: ${statblock.languages}`);
  lines.push('');

  // Defenses
  if (statblock.damage_immunities) lines.push(`Damage Immunities: ${statblock.damage_immunities}`);
  if (statblock.damage_resistances) lines.push(`Damage Resistances: ${statblock.damage_resistances}`);
  if (statblock.damage_vulnerabilities) lines.push(`Damage Vulnerabilities: ${statblock.damage_vulnerabilities}`);
  if (statblock.condition_immunities) lines.push(`Condition Immunities: ${statblock.condition_immunities}`);
  if (statblock.saving_throws) lines.push(`Saving Throws: ${statblock.saving_throws}`);
  if (statblock.skills) lines.push(`Skills: ${statblock.skills}`);
  lines.push('');

  // Traits/Special Abilities (array format: [{name, description}])
  if (statblock.abilities && Array.isArray(statblock.abilities) && statblock.abilities.length > 0) {
    lines.push('TRAITS:');
    statblock.abilities.forEach(ability => {
      lines.push(`${ability.name}: ${ability.description}`);
    });
    lines.push('');
  }

  // Actions (array format: [{name, description}])
  if (statblock.actions && Array.isArray(statblock.actions) && statblock.actions.length > 0) {
    lines.push('ACTIONS:');
    statblock.actions.forEach(action => {
      lines.push(`${action.name}: ${action.description}`);
    });
    lines.push('');
  }

  // Reactions (array format: [{name, description}])
  if (statblock.reactions && Array.isArray(statblock.reactions) && statblock.reactions.length > 0) {
    lines.push('REACTIONS:');
    statblock.reactions.forEach(reaction => {
      lines.push(`${reaction.name}: ${reaction.description}`);
    });
    lines.push('');
  }

  // Legendary Actions (array format: [{name, description}])
  if (statblock.legendary_actions && Array.isArray(statblock.legendary_actions) && statblock.legendary_actions.length > 0) {
    lines.push('LEGENDARY ACTIONS:');
    statblock.legendary_actions.forEach(action => {
      lines.push(`${action.name}: ${action.description}`);
    });
    lines.push('');
  }

  // Lair Actions (array format: [{name, description}])
  if (statblock.lair_actions && Array.isArray(statblock.lair_actions) && statblock.lair_actions.length > 0) {
    lines.push('LAIR ACTIONS:');
    statblock.lair_actions.forEach(action => {
      lines.push(`${action.name}: ${action.description}`);
    });
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Validate enrichment output structure.
 *
 * @param {string} jsonString - JSON response from AI
 * @returns {boolean} True if valid
 */
export function validateEnrichmentOutput(jsonString) {
  try {
    const obj = JSON.parse(jsonString);

    // Required fields
    const isValid = (
      typeof obj.name === 'string' &&
      typeof obj.description === 'string' &&
      obj.description.length > 20 &&
      typeof obj.signature === 'string' &&
      obj.signature.length > 10 &&
      Array.isArray(obj.abilities) &&
      obj.abilities.length > 0 &&
      typeof obj.tactical_identity === 'string' &&
      obj.tactical_identity.length > 10 &&
      Array.isArray(obj.encounter_hooks) &&
      obj.encounter_hooks.length >= 2 &&
      Array.isArray(obj.preferred_tones) &&
      obj.preferred_tones.length >= 2 &&
      'retreat' in obj &&
      (obj.retreat === null || typeof obj.retreat === 'string') &&
      'social' in obj &&
      (obj.social === null || typeof obj.social === 'string') &&
      Array.isArray(obj.aftermath_hooks) &&
      obj.aftermath_hooks.length >= 2
    );

    if (!isValid) return false;

    // Validate preferred_tones values
    const validTones = [
      'interrupted_activity', 'quiet_tension', 'triggered_mistake',
      'already_in_motion', 'something_wrong', 'standoff', 'false_hospitality',
      'desperate_plea', 'hidden_predator', 'wrong_enemy', 'ticking_clock', 'aftermath'
    ];

    for (const tone of obj.preferred_tones) {
      if (!validTones.includes(tone)) {
        console.warn(`Invalid tone: ${tone}`);
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Generate creature intelligence data for a custom statblock.
 *
 * @param {Object} statblock - Statblock object
 * @returns {Promise<Object>} Enrichment data
 */
export async function enrichCustomStatblock(statblock) {
  const prompt = buildEnrichmentPrompt(statblock);
  const response = await generateGptResponse(
    prompt,
    validateEnrichmentOutput,
    3,
    undefined,
    'gpt-4.1-mini'
  );

  const enrichment = JSON.parse(response);

  return enrichment;
}

/**
 * Save enrichment data to localStorage.
 *
 * @param {string} creatureName - Creature name
 * @param {Object} enrichmentData - Intelligence data
 */
export function saveEnrichment(creatureName, enrichmentData) {
  try {
    // Load existing intelligence data
    const stored = localStorage.getItem('creature-intelligence');
    const allIntelligence = stored ? JSON.parse(stored) : {};

    // Add/update this creature's intelligence
    allIntelligence[creatureName] = enrichmentData;

    // Save back to localStorage
    localStorage.setItem('creature-intelligence', JSON.stringify(allIntelligence));
  } catch (error) {
    console.error(`[ENRICHMENT] Failed to save intelligence for ${creatureName}:`, error);
  }
}

/**
 * Load enrichment data from localStorage.
 *
 * @param {string} creatureName - Creature name
 * @returns {Object|null} Intelligence data or null
 */
export function loadEnrichment(creatureName) {
  try {
    const stored = localStorage.getItem('creature-intelligence');
    if (!stored) return null;

    const allIntelligence = JSON.parse(stored);
    const intelligence = allIntelligence[creatureName];

    if (intelligence) {
      return intelligence;
    }

    return null;
  } catch (error) {
    console.error(`[ENRICHMENT] Failed to load intelligence for ${creatureName}:`, error);
    return null;
  }
}

/**
 * Delete enrichment data from localStorage.
 *
 * @param {string} creatureName - Creature name
 */
export function deleteEnrichment(creatureName) {
  try {
    const stored = localStorage.getItem('creature-intelligence');
    if (!stored) return;

    const allIntelligence = JSON.parse(stored);
    delete allIntelligence[creatureName];

    localStorage.setItem('creature-intelligence', JSON.stringify(allIntelligence));
  } catch (error) {
    console.error(`[ENRICHMENT] Failed to delete intelligence for ${creatureName}:`, error);
  }
}

/**
 * Rename enrichment data when a statblock is renamed.
 *
 * @param {string} oldName - Old creature name
 * @param {string} newName - New creature name
 */
export function renameEnrichment(oldName, newName) {
  try {
    const stored = localStorage.getItem('creature-intelligence');
    if (!stored) return;

    const allIntelligence = JSON.parse(stored);

    if (allIntelligence[oldName]) {
      // Copy to new name
      allIntelligence[newName] = allIntelligence[oldName];
      // Delete old name
      delete allIntelligence[oldName];

      localStorage.setItem('creature-intelligence', JSON.stringify(allIntelligence));
    }
  } catch (error) {
    console.error(`[ENRICHMENT] Failed to rename intelligence:`, error);
  }
}

/**
 * Get all enriched creature names.
 *
 * @returns {string[]} Array of creature names with intelligence data
 */
export function getEnrichedCreatureNames() {
  try {
    const stored = localStorage.getItem('creature-intelligence');
    if (!stored) return [];

    const allIntelligence = JSON.parse(stored);
    return Object.keys(allIntelligence);
  } catch (error) {
    console.error(`[ENRICHMENT] Failed to get enriched creature names:`, error);
    return [];
  }
}

/**
 * Clean up orphaned intelligence data (creatures that no longer exist in monsters localStorage).
 *
 * @returns {string[]} Array of removed creature names
 */
export function cleanupOrphanedIntelligence() {
  try {
    // Get all custom monster names
    const monstersStored = localStorage.getItem('monsters');
    if (!monstersStored) return [];

    const monstersData = JSON.parse(monstersStored);
    const existingMonsters = new Set();

    // Collect all monster names from all folders
    Object.entries(monstersData).forEach(([folder, items]) => {
      if (folder === 'generationCount' || folder === 'firstGenerationTime') return;
      if (Array.isArray(items)) {
        items.forEach(monster => {
          if (monster.name) existingMonsters.add(monster.name);
        });
      }
    });

    // Get all enriched creatures
    const intelligenceStored = localStorage.getItem('creature-intelligence');
    if (!intelligenceStored) return [];

    const allIntelligence = JSON.parse(intelligenceStored);
    const orphaned = [];

    // Find enriched creatures that don't have a statblock
    Object.keys(allIntelligence).forEach(creatureName => {
      if (!existingMonsters.has(creatureName)) {
        orphaned.push(creatureName);
        delete allIntelligence[creatureName];
      }
    });

    if (orphaned.length > 0) {
      localStorage.setItem('creature-intelligence', JSON.stringify(allIntelligence));
    }

    return orphaned;
  } catch (error) {
    console.error(`[ENRICHMENT] Failed to cleanup orphaned intelligence:`, error);
    return [];
  }
}

/**
 * Migrate old creature-intel:* keys to new single-key format.
 * Runs once and removes old keys.
 *
 * @returns {number} Number of creatures migrated
 */
export function migrateOldEnrichmentFormat() {
  try {
    // Check if new format already exists
    const newFormat = localStorage.getItem('creature-intelligence');
    if (newFormat) {
      return 0;
    }

    const allIntelligence = {};
    const oldKeys = [];
    let migrated = 0;

    // Find all old creature-intel:* keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('creature-intel:')) {
        oldKeys.push(key);
      }
    }

    // Migrate each old key
    oldKeys.forEach(key => {
      try {
        const creatureName = key.replace('creature-intel:', '');
        const data = localStorage.getItem(key);
        if (data) {
          allIntelligence[creatureName] = JSON.parse(data);
          migrated++;
        }
      } catch (error) {
        console.warn(`[ENRICHMENT] Failed to migrate ${key}:`, error);
      }
    });

    // Save to new format
    if (migrated > 0) {
      localStorage.setItem('creature-intelligence', JSON.stringify(allIntelligence));

      // Remove old keys
      oldKeys.forEach(key => localStorage.removeItem(key));
    }

    return migrated;
  } catch (error) {
    console.error('[ENRICHMENT] Failed to migrate old format:', error);
    return 0;
  }
}
