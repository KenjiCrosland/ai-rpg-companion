export const tools = [
  { name: 'Monster Statblock Generator', slug: 'statblock-generator', url: 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/' },
  { name: 'Dungeon Generator', slug: 'dungeon-generator', url: 'https://cros.land/kenjis-dungeon-generator-2-0/' },
  { name: 'Magic Item Generator', slug: 'item-generator', url: 'https://cros.land/dnd-5e-magic-item-generator/' },
  { name: 'Encounter Generator', slug: 'encounter-generator', url: 'https://cros.land/dnd-5e-encounter-generator/' },
  { name: 'Setting Generator', slug: 'setting-generator', url: 'https://cros.land/rpg-setting-generator-and-world-building-tool/' },
  { name: 'Location Description Generator', slug: 'location-generator', url: 'https://cros.land/ai-rpg-location-generator/' },
  { name: 'NPC Generator', slug: 'npc-generator', url: 'https://cros.land/rpg-ai-npc-generator/' },
  // Patron exclusive
  { name: 'Bookshelf Generator', slug: 'book-generator', url: 'https://cros.land/ai-powered-bookshelf-generator/', patronOnly: true },
  { name: 'Lore & Timeline Generator', slug: 'lore-generator', url: 'https://cros.land/ai-powered-lore-and-timeline-generator/', patronOnly: true },
  { name: 'Town Generator', slug: 'gm-dashboard', url: 'https://cros.land/ai-powered-game-master-dashboard/', patronOnly: true },
];

export const mainTools = tools.filter(t => !t.patronOnly);
export const patronTools = tools.filter(t => t.patronOnly);

export function getCurrentSlug() {
  if (import.meta.env.DEV) {
    return localStorage.getItem('dev-current-page') || '';
  }
  const currentUrl = window.location.href.toLowerCase();
  const sorted = [...tools].sort((a, b) => b.url.length - a.url.length);
  const match = sorted.find(t => {
    const parts = t.url.split('/');
    const slug = parts[parts.length - 1] || parts[parts.length - 2];
    return slug && currentUrl.includes(slug);
  });
  return match ? match.slug : '';
}

export function navigate(slug) {
  const tool = tools.find(t => t.slug === slug);
  if (!tool) return;

  if (import.meta.env.DEV) {
    localStorage.setItem('dev-current-page', slug);
    window.location.reload();
  } else {
    window.location.href = tool.url;
  }
}
