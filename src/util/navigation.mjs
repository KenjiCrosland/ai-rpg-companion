/**
 * Cross-tool navigation utility
 * Provides consistent navigation between generator tools in both dev and production
 */

/**
 * Navigate to another generator tool with parameters
 * Works identically in development (localhost) and production (cros.land)
 *
 * @param {string} toolName - The target tool identifier (e.g., 'npc-generator', 'statblock-generator')
 * @param {Object} params - URL parameters to pass to the tool
 *
 * @example
 * navigateToTool('npc-generator', {
 *   statblock: 'Ancient Dragon',
 *   folder: 'Dragon Hoard'
 * });
 */
export function navigateToTool(toolName, params = {}) {
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  if (isDev) {
    // Development: Store params in sessionStorage, page name in
    // localStorage (App.vue reads it). Preserve premium tier across
    // navigation: App.vue routes free vs premium via separate
    // `dev-current-page` values (e.g., 'setting-generator' vs
    // 'setting-generator-premium'). If we're currently on a
    // `-premium` page OR the dev-premium-override flag is on, route
    // to the `-premium` destination so the user stays in premium
    // context through cross-tool flows. Production navigates to the
    // same WordPress URL for both tiers — the backend decides which
    // template renders — so this fork only matters in dev.
    const currentPage = localStorage.getItem('dev-current-page') || '';
    const overrideOn = localStorage.getItem('dev-premium-override') === 'true';
    const isPremiumContext = overrideOn || /-premium$/.test(currentPage);
    const destPage = isPremiumContext ? `${toolName}-premium` : toolName;

    sessionStorage.setItem('tool-navigation-params', JSON.stringify(params));
    localStorage.setItem('dev-current-page', destPage);
    window.location.href = '/';
  } else {
    // Production: Build full cros.land URL with query params. Premium
    // and free share the same URL per tool — WordPress decides which
    // template renders based on the user's subscription state, then
    // writes `data-premium="true"` on #app accordingly.
    const toolUrls = {
      'npc-generator': '/rpg-ai-npc-generator/',
      'statblock-generator': '/ai-powered-dnd-5e-monster-statblock-generator/',
      'dungeon-generator': '/kenjis-dungeon-generator-2-0/',
      'setting-generator': '/rpg-setting-generator-and-world-building-tool/',
      'item-generator': '/dnd-5e-magic-item-generator/',
      'encounter-generator': '/dnd-5e-encounter-generator/',
      'location-generator': '/rpg-location-description-generator/',
      // Standalone free tools. NOTE: these paths must match the WordPress page
      // slugs you publish for each template — adjust if your slugs differ.
      backpack: '/dnd-5e-inventory-manager/',
      'loot-splitter': '/dnd-5e-loot-splitter/',
    };

    const toolPath = toolUrls[toolName];
    if (!toolPath) {
      console.error(`Unknown tool name: ${toolName}`);
      return;
    }

    const baseUrl = `https://cros.land${toolPath}`;
    const queryString = new URLSearchParams(params).toString();
    // Cross-tool handoff params go in the URL FRAGMENT (#…), not the query
    // string, so user-derived values (fromId = item name, entityName) never
    // land in what GA records as page_location — the fragment is not sent to
    // the server and GA doesn't log it by default. getNavigationParams reads it
    // back, with a ?query fallback for any in-flight pre-migration links.
    window.location.href = queryString ? `${baseUrl}#${queryString}` : baseUrl;
  }
}

/**
 * Get navigation parameters from the current page load
 * Reads from sessionStorage in dev, URL params in production
 * Automatically cleans up sessionStorage after reading
 *
 * @returns {Object} Parameters object with key-value pairs
 *
 * @example
 * const params = getNavigationParams();
 * if (params.statblock && params.folder) {
 *   // Handle statblock deep link
 * }
 */
export function getNavigationParams() {
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  if (isDev) {
    // Development: Read from sessionStorage
    const stored = sessionStorage.getItem('tool-navigation-params');
    if (stored) {
      sessionStorage.removeItem('tool-navigation-params'); // Clean up after reading
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse tool-navigation-params:', error);
        return {};
      }
    }
    return {};
  } else {
    // Production: read from the URL FRAGMENT (where navigateToTool now writes
    // handoff params, to keep them out of GA's page_location). Fall back to the
    // query string for backward compatibility with pre-migration ?param links
    // and the direct ?monster/?folder deep-links built by getStatblockGeneratorUrl.
    const params = {};
    const hash = window.location.hash.replace(/^#/, '');
    const search = window.location.search.replace(/^\?/, '');
    const urlParams = new URLSearchParams(hash || search);
    urlParams.forEach((value, key) => {
      params[key] = decodeURIComponent(value);
    });
    return params;
  }
}
