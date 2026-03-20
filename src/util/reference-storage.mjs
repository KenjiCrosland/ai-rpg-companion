/**
 * reference-storage.mjs
 *
 * Shared localStorage layer for tracking relationships between entities across tools.
 * This is a lightweight graph that sits alongside existing storage modules.
 *
 * If the reference store is deleted, nothing breaks - tools still function via their
 * direct references (statblock_name, etc.). The reference store provides enhanced
 * features like bidirectional lookups and cross-tool relationship tracking.
 *
 * Entity ID Patterns (based on existing localStorage schemas):
 * - NPCs: `npc_${timestamp}_${random}` in `npc_id` field (auto-generated)
 * - Statblocks: `${name}__${folder}` (no built-in ID, using name+folder as unique key)
 * - Dungeons: `id` field (auto-generated)
 * - Settings: `id` field (auto-generated)
 * - Encounters: indexed by position in array (no ID field)
 * - Items: indexed by position in array per folder (no ID field)
 * - Locations: indexed by position in array (no ID field)
 */

const STORAGE_KEY = 'tool-references';

/**
 * Reference data shape:
 * {
 *   "ref_1710000000000_abc12": {
 *     "id": "ref_1710000000000_abc12",
 *     "source_type": "npc",
 *     "source_id": "npc_1710000000000_xyz",
 *     "source_name": "Varek the Artificer",
 *     "target_type": "statblock",
 *     "target_id": "Glimmering Golem__Custom Creatures",
 *     "target_name": "Glimmering Golem",
 *     "relationship": "has_statblock",
 *     "context": "Optional one-line context"
 *   }
 * }
 */

/**
 * Generate a unique reference ID.
 * @returns {string} - Reference ID in format ref_timestamp_random
 */
function generateReferenceId() {
  return `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get all references from localStorage.
 * @returns {Object} - Object with reference IDs as keys
 */
function getReferences() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (error) {
    console.warn('Failed to parse tool-references, starting fresh:', error);
    return {};
  }
}

/**
 * Save references to localStorage.
 * @param {Object} references - References object to save
 */
function saveReferences(references) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(references));
}

/**
 * Add a reference between two entities.
 *
 * @param {Object} params - Reference parameters
 * @param {string} params.source_type - Type of source entity
 * @param {string} params.source_id - ID of source entity
 * @param {string} params.source_name - Display name of source entity
 * @param {string} params.target_type - Type of target entity
 * @param {string} params.target_id - ID of target entity
 * @param {string} params.target_name - Display name of target entity
 * @param {string} params.relationship - Relationship type
 * @param {string} [params.context=''] - Optional context description
 * @returns {string} - The generated reference ID
 */
export function addReference({
  source_type,
  source_id,
  source_name,
  target_type,
  target_id,
  target_name,
  relationship,
  context = ''
}) {
  // Check if this exact reference already exists
  if (referenceExists(source_type, source_id, target_type, target_id, relationship)) {
    console.log('Reference already exists, skipping:', { source_id, target_id, relationship });
    return null;
  }

  const references = getReferences();
  const ref_id = generateReferenceId();

  references[ref_id] = {
    id: ref_id,
    source_type,
    source_id,
    source_name,
    target_type,
    target_id,
    target_name,
    relationship,
    context
  };

  saveReferences(references);
  return ref_id;
}

/**
 * Remove a reference by ID.
 *
 * @param {string} ref_id - Reference ID to remove
 * @returns {boolean} - True if reference was removed, false if not found
 */
export function removeReference(ref_id) {
  const references = getReferences();

  if (!references[ref_id]) {
    return false;
  }

  delete references[ref_id];
  saveReferences(references);
  return true;
}

/**
 * Remove all references involving a specific entity (as source OR target).
 * Call this when an entity is deleted.
 *
 * @param {string} entity_type - Type of entity (e.g., 'npc', 'statblock')
 * @param {string} entity_id - ID of entity to remove references for
 * @returns {number} - Count of references removed
 */
export function removeReferencesForEntity(entity_type, entity_id) {
  const references = getReferences();
  let removedCount = 0;

  for (const ref_id in references) {
    const ref = references[ref_id];

    if (
      (ref.source_type === entity_type && ref.source_id === entity_id) ||
      (ref.target_type === entity_type && ref.target_id === entity_id)
    ) {
      delete references[ref_id];
      removedCount++;
    }
  }

  if (removedCount > 0) {
    saveReferences(references);
  }

  return removedCount;
}

/**
 * Get all references involving a specific entity (as source OR target).
 *
 * @param {string} entity_type - Type of entity
 * @param {string} entity_id - ID of entity
 * @returns {Array} - Array of reference objects
 */
export function getReferencesForEntity(entity_type, entity_id) {
  const references = getReferences();
  const results = [];

  for (const ref of Object.values(references)) {
    if (
      (ref.source_type === entity_type && ref.source_id === entity_id) ||
      (ref.target_type === entity_type && ref.target_id === entity_id)
    ) {
      results.push(ref);
    }
  }

  return results;
}

/**
 * Get all references of a specific relationship type.
 *
 * @param {string} relationship - Relationship type (e.g., 'has_statblock')
 * @returns {Array} - Array of reference objects
 */
export function getReferencesByType(relationship) {
  const references = getReferences();
  const results = [];

  for (const ref of Object.values(references)) {
    if (ref.relationship === relationship) {
      results.push(ref);
    }
  }

  return results;
}

/**
 * Check if a specific reference already exists.
 * Used to avoid creating duplicate references.
 *
 * @param {string} source_type - Type of source entity
 * @param {string} source_id - ID of source entity
 * @param {string} target_type - Type of target entity
 * @param {string} target_id - ID of target entity
 * @param {string} relationship - Relationship type
 * @returns {boolean} - True if reference exists
 */
export function referenceExists(source_type, source_id, target_type, target_id, relationship) {
  const references = getReferences();

  for (const ref of Object.values(references)) {
    if (
      ref.source_type === source_type &&
      ref.source_id === source_id &&
      ref.target_type === target_type &&
      ref.target_id === target_id &&
      ref.relationship === relationship
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Get all references (for debugging or bulk operations).
 * @returns {Object} - All references
 */
export function getAllReferences() {
  return getReferences();
}

/**
 * Clear all references (for testing or reset).
 */
export function clearAllReferences() {
  localStorage.removeItem(STORAGE_KEY);
}
