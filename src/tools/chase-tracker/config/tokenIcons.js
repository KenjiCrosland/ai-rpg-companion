// The 12 icons available for tokens. Author attribution per icon is
// verified against the source folder in github.com/game-icons/icons and
// the canonical display name on game-icons.net.
//
// iconifyName uses Iconify's "collection:name" format. Browse the full
// set at https://icon-sets.iconify.design/game-icons/.
export const TOKEN_ICONS = [
  { key: 'person',    label: 'Person',        iconifyName: 'game-icons:person',              author: 'Delapouite' },
  { key: 'hooded',    label: 'Hooded Figure', iconifyName: 'game-icons:hooded-figure',       author: 'DarkZaitzev' },
  { key: 'skull',     label: 'Skull',         iconifyName: 'game-icons:skull-crossed-bones', author: 'Lorc' },
  { key: 'swords',    label: 'Swords',        iconifyName: 'game-icons:crossed-swords',      author: 'Lorc' },
  { key: 'shield',    label: 'Shield',        iconifyName: 'game-icons:round-shield',        author: 'Willdabeast' },
  { key: 'spellbook', label: 'Spellbook',     iconifyName: 'game-icons:spell-book',          author: 'Delapouite' },
  { key: 'run',       label: 'Running',       iconifyName: 'game-icons:run',                 author: 'Lorc' },
  { key: 'ghost',     label: 'Ghost',         iconifyName: 'game-icons:ghost',               author: 'Lorc' },
  { key: 'wolf',      label: 'Wolf',          iconifyName: 'game-icons:wolf-head',           author: 'Lorc' },
  { key: 'raven',     label: 'Raven',         iconifyName: 'game-icons:raven',               author: 'Lorc' },
  { key: 'eye',       label: 'Eye',           iconifyName: 'game-icons:eye-shield',          author: 'Lorc' },
  { key: 'crown',     label: 'Crown',         iconifyName: 'game-icons:crown',               author: 'Lorc' },
];

// Unique authors across the icons actually in use, preserving insertion order.
export const TOKEN_ICON_AUTHORS = Array.from(
  new Set(TOKEN_ICONS.map((i) => i.author))
);

export const TOKEN_ICON_MAP = Object.fromEntries(
  TOKEN_ICONS.map((i) => [i.key, i])
);

export const ROLE_DEFAULTS = {
  quarry:  { icon: 'run',    color: 'crimson' },
  pc:      { icon: 'person', color: 'ochre' },
  pursuer: { icon: 'swords', color: 'slate' },
};

export const ROLE_LABELS = {
  quarry: 'Quarry',
  pc: 'PC',
  pursuer: 'Pursuer',
};

// Maps legacy v2 icon keys (hand-drawn inline SVG set) to the new
// game-icons keys. Applied during schema migration.
export const LEGACY_ICON_MIGRATION = {
  'user':       'person',
  'user-round': 'hooded',
  'skull':      'skull',
  'swords':     'swords',
  'shield':     'shield',
  'sparkles':   'spellbook',
  'footprints': 'run',
  'ghost':      'ghost',
  'dog':        'wolf',
  'bird':       'raven',
  'eye':        'eye',
  'crown':      'crown',
};
