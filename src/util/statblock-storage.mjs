/**
 * Statblock Storage Utility
 *
 * Manages shared statblock storage in localStorage under the 'monsters' key.
 * Statblocks are organized by folder for easy organization and cross-tool access.
 */

/**
 * Save a statblock to shared storage
 * @param {Object} statblock - The statblock object to save
 * @param {string} folderName - The folder to save it in (default: 'Uncategorized')
 */
export function saveStatblockToStorage(statblock, folderName = 'Uncategorized') {
  const stored = JSON.parse(localStorage.getItem('monsters') || '{}');

  if (!stored[folderName]) {
    stored[folderName] = [];
  }

  // Check for duplicate by name — update if exists
  const existingIndex = stored[folderName].findIndex(
    s => s.name === statblock.name
  );

  if (existingIndex !== -1) {
    stored[folderName][existingIndex] = statblock;
  } else {
    stored[folderName].push(statblock);
  }

  localStorage.setItem('monsters', JSON.stringify(stored));
}

/**
 * Get a statblock from shared storage by name
 * @param {string} name - The statblock name to search for
 * @param {string} folder - Optional folder name to check first
 * @returns {Object|null} - The statblock object or null if not found
 */
export function getStatblockFromStorage(name, folder = null) {
  const stored = JSON.parse(localStorage.getItem('monsters') || '{}');

  // Check specified folder first
  if (folder && stored[folder]) {
    const found = stored[folder].find(s => s.name === name);
    if (found) return found;
  }

  // Fallback: search all folders
  for (const f of Object.values(stored)) {
    if (!Array.isArray(f)) continue;
    const found = f.find(s => s.name === name);
    if (found) return found;
  }

  return null;
}
