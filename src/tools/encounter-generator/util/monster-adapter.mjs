/**
 * Adapters for normalizing monster data from different sources
 * into a unified format for the encounter generator.
 */

import crToXP from '@/data/cr-to-xp.json';

/**
 * Extract numeric CR value from a CR string like "5 (1,800 XP)"
 * @param {string} crString - CR string in various formats
 * @returns {string} - Normalized CR value (e.g., "5", "1/2", "1/4")
 */
function extractCR(crString) {
  if (!crString) return '0';

  // Handle formats like "5 (1,800 XP)" or "CR 5 (1,800 XP)"
  const match = crString.match(/(\d+(?:\/\d+)?)/);
  return match ? match[1] : '0';
}

/**
 * Get XP value for a given CR
 * @param {string} cr - Challenge rating (e.g., "5", "1/2")
 * @returns {number} - XP value
 */
function getXPForCR(cr) {
  return crToXP[cr] || 0;
}

/**
 * Normalize a monster from localStorage 'monsters' storage
 * @param {object} monster - Monster object from localStorage
 * @param {string} folderName - Name of folder monster belongs to
 * @returns {object} - Normalized monster object
 */
export function normalizeCustomMonster(monster, folderName = 'Uncategorized') {
  const cr = extractCR(monster.challenge_rating);
  const xp = getXPForCR(cr);

  return {
    // Flatten statblock fields first
    ...monster,
    // Then override with normalized fields
    name: monster.name || 'Unnamed Monster',
    cr,
    xp,
    quantity: 1,
    source: 'custom',
    sourceLabel: folderName,
    statblock: monster, // Full statblock available for display
    description: '',
    type: 'Balanced',
    isSpellcaster: false,
  };
}

/**
 * Convert SRD actions/abilities array to HTML format
 * @param {Array} actionsArray - Array of {name, description} objects
 * @returns {string} - HTML formatted string
 */
function actionsToHTML(actionsArray) {
  if (!Array.isArray(actionsArray) || actionsArray.length === 0) return '';

  return actionsArray
    .map(action => `<p><em><strong>${action.name}.</strong></em> ${action.description}</p>`)
    .join('');
}

/**
 * Normalize a monster from SRD JSON data
 * @param {object} srdMonster - Monster object from srd-monsters.json (statblock format)
 * @returns {object} - Normalized monster object
 */
export function normalizeSRDMonster(srdMonster) {
  // SRD monsters are now in full statblock format
  const cr = srdMonster.challenge_rating || '0';
  const xp = getXPForCR(cr);

  // Parse type_and_alignment: "Large aberration, lawful evil"
  const metaParts = (srdMonster.type_and_alignment || '').split(',');
  const sizeAndType = metaParts[0].trim().split(' ');
  const size = sizeAndType[0] || 'Medium';
  const creatureType = sizeAndType.slice(1).join(' ') || 'Unknown';
  const alignment = metaParts.slice(1).join(',').trim() || 'Unaligned';

  // Check if monster has spellcasting by examining abilities
  const isSpellcaster = (srdMonster.abilities || []).some(ability =>
    ability.name.toLowerCase().includes('spellcasting')
  );

  return {
    // First spread original SRD data
    ...srdMonster,

    // Transform SRD format to enrichment-expected format
    // Ability scores: lowercase numbers → uppercase strings
    STR: String(srdMonster.str || 10),
    DEX: String(srdMonster.dex || 10),
    CON: String(srdMonster.con || 10),
    INT: String(srdMonster.int || 10),
    WIS: String(srdMonster.wis || 10),
    CHA: String(srdMonster.cha || 10),

    // Convert arrays to HTML strings
    Actions: actionsToHTML(srdMonster.actions),
    Traits: actionsToHTML(srdMonster.abilities),
    'Legendary Actions': actionsToHTML(srdMonster.legendary_actions),
    Reactions: actionsToHTML(srdMonster.reactions),

    // Capitalize field names for enrichment
    Speed: srdMonster.speed || '',
    Senses: srdMonster.senses || '',
    Languages: srdMonster.languages || '',
    'Damage Immunities': srdMonster.damage_immunities || '',
    'Damage Resistances': srdMonster.damage_resistances || '',
    'Damage Vulnerabilities': srdMonster.damage_vulnerabilities || '',
    'Condition Immunities': srdMonster.condition_immunities || '',

    // Normalized fields
    name: srdMonster.name || 'Unknown',
    cr,
    xp,
    quantity: 1,
    source: 'srd',
    sourceLabel: 'SRD',
    statblock: srdMonster, // The entire object is the statblock
    description: `${size} ${creatureType}`,
    type: creatureType,
    isSpellcaster,

    // Additional SRD metadata
    size,
    creatureType,
    alignment,
  };
}

/**
 * Load all custom monsters from localStorage
 * @returns {Array} - Array of normalized custom monsters
 */
export function loadCustomMonsters() {
  try {
    const stored = localStorage.getItem('monsters');
    if (!stored) return [];

    const data = JSON.parse(stored);
    const monsters = [];

    // Iterate through folders
    Object.entries(data).forEach(([folderName, items]) => {
      // Skip metadata keys
      if (folderName === 'generationCount' || folderName === 'firstGenerationTime') {
        return;
      }

      if (Array.isArray(items)) {
        items.forEach(monster => {
          monsters.push(normalizeCustomMonster(monster, folderName));
        });
      }
    });

    return monsters;
  } catch (error) {
    console.error('Failed to load custom monsters from localStorage:', error);
    return [];
  }
}

/**
 * Load SRD monsters from JSON file
 * @returns {Promise<Array>} - Array of normalized SRD monsters
 */
export async function loadSRDMonsters() {
  try {
    const srdData = await import('@/data/srd-monsters.json');
    const monsters = srdData.default || [];
    return monsters.map(normalizeSRDMonster);
  } catch (error) {
    console.info('SRD monster data not available. Add srd-monsters.json to enable.');
    return [];
  }
}

/**
 * Search and filter monsters
 * @param {Array} monsters - Array of normalized monsters
 * @param {string} searchTerm - Search query
 * @param {string} crFilter - CR filter (e.g., "5", "1/2", or "any")
 * @returns {Array} - Filtered monsters
 */
export function filterMonsters(monsters, searchTerm = '', crFilter = 'any') {
  return monsters.filter(monster => {
    const matchesSearch = !searchTerm ||
      monster.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCR = crFilter === 'any' || monster.cr === crFilter;

    return matchesSearch && matchesCR;
  });
}

/**
 * Parse CR string to numeric value
 * @param {string} cr - CR string like "5" or "1/2"
 * @returns {number} - Numeric CR value
 */
function parseCR(cr) {
  if (cr.includes('/')) {
    const [numerator, denominator] = cr.split('/').map(Number);
    return numerator / denominator;
  }
  return parseFloat(cr);
}

/**
 * Get unique CR values from monster list (sorted)
 * @param {Array} monsters - Array of normalized monsters
 * @returns {Array} - Sorted array of unique CR values
 */
export function getUniqueCRs(monsters) {
  const crs = new Set(monsters.map(m => m.cr));
  return Array.from(crs).sort((a, b) => {
    // Handle fractional CRs safely without eval()
    const numA = parseCR(a);
    const numB = parseCR(b);
    return numA - numB;
  });
}
