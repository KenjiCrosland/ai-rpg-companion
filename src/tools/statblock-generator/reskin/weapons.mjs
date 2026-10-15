/**
 * ONE WEAPON TABLE (owner, 2026-10-15: "if we can ask llms specific questions to
 * populate metadata, that's the route we usually want to go unless the options to
 * choose from are too numerous and it dilutes the prompt").
 *
 * The same fact — a shortsword is a finesse Piercing melee weapon with no range —
 * was written in about a dozen places, each added on a different day for a
 * different hold, and the copies drifted: the anatomy table's "sword" entry said
 * Slashing where the weapon table said shortsword, and a GM read it on a sheet.
 *
 * This file is the single source. It holds FACTS, which is what deterministic
 * code is for — nobody is choosing between them, so the option count never
 * dilutes a prompt. The JUDGEMENT it used to be tangled with — "which weapon does
 * this coined row name refer to?" — is a question for the call that names the row,
 * validated against this table. `weaponFor` is the fallback for when the call
 * says nothing, not the decider.
 *
 * Fields, all from print's 2024 weapon table:
 *   type      the damage a hit deals
 *   reach     melee reach in feet (10 for the Reach property)
 *   range     normal/long in feet, for a weapon that is thrown or shot
 *   thrown    it has a melee mode and a thrown mode (print's "Melee or Ranged")
 *   launcher  it is ranged only — a bow, a crossbow, a sling, a firearm
 *   finesse   it may roll Dexterity
 *   heavy     the Heavy property: Great Weapon Master's own list
 *   mastery   its 2024 mastery property
 */
export const WEAPONS = {
  // ---- simple melee
  club: { type: 'Bludgeoning', reach: 5, mastery: 'Slow' },
  greatclub: { type: 'Bludgeoning', reach: 5, mastery: 'Push' },
  dagger: { type: 'Piercing', reach: 5, range: '20/60', thrown: true, finesse: true, mastery: 'Vex' },
  handaxe: { type: 'Slashing', reach: 5, range: '20/60', thrown: true, mastery: 'Vex' },
  javelin: { type: 'Piercing', reach: 5, range: '30/120', thrown: true, mastery: 'Slow' },
  'light hammer': { type: 'Bludgeoning', reach: 5, range: '20/60', thrown: true, mastery: 'Nick' },
  mace: { type: 'Bludgeoning', reach: 5, mastery: 'Sap' },
  quarterstaff: { type: 'Bludgeoning', reach: 5, mastery: 'Topple' },
  staff: { type: 'Bludgeoning', reach: 5, mastery: 'Topple' },
  sickle: { type: 'Slashing', reach: 5, finesse: true, mastery: 'Nick' },
  spear: { type: 'Piercing', reach: 5, range: '20/60', thrown: true, mastery: 'Sap' },
  // ---- martial melee
  battleaxe: { type: 'Slashing', reach: 5, mastery: 'Topple' },
  flail: { type: 'Bludgeoning', reach: 5, mastery: 'Sap' },
  glaive: { type: 'Slashing', reach: 10, heavy: true, mastery: 'Graze' },
  greataxe: { type: 'Slashing', reach: 5, heavy: true, mastery: 'Cleave' },
  greatsword: { type: 'Slashing', reach: 5, heavy: true, mastery: 'Graze' },
  halberd: { type: 'Slashing', reach: 10, heavy: true, mastery: 'Cleave' },
  lance: { type: 'Piercing', reach: 10, heavy: true, mastery: 'Topple' },
  longsword: { type: 'Slashing', reach: 5, mastery: 'Sap' },
  maul: { type: 'Bludgeoning', reach: 5, heavy: true, mastery: 'Topple' },
  morningstar: { type: 'Piercing', reach: 5, mastery: 'Sap' },
  pike: { type: 'Piercing', reach: 10, heavy: true, mastery: 'Push' },
  rapier: { type: 'Piercing', reach: 5, finesse: true, mastery: 'Vex' },
  scimitar: { type: 'Slashing', reach: 5, finesse: true, mastery: 'Nick' },
  shortsword: { type: 'Piercing', reach: 5, finesse: true, mastery: 'Vex' },
  trident: { type: 'Piercing', reach: 5, range: '20/60', thrown: true, mastery: 'Topple' },
  warhammer: { type: 'Bludgeoning', reach: 5, mastery: 'Push' },
  whip: { type: 'Slashing', reach: 10, finesse: true, mastery: 'Slow' },
  // ---- ranged
  dart: { type: 'Piercing', range: '20/60', thrown: true, finesse: true, mastery: 'Vex' },
  sling: { type: 'Bludgeoning', range: '30/120', launcher: true, mastery: 'Slow' },
  shortbow: { type: 'Piercing', range: '80/320', launcher: true, mastery: 'Vex' },
  longbow: { type: 'Piercing', range: '150/600', launcher: true, heavy: true, mastery: 'Slow' },
  bow: { type: 'Piercing', range: '150/600', launcher: true, mastery: 'Slow' },
  'light crossbow': { type: 'Piercing', range: '80/320', launcher: true, mastery: 'Slow' },
  'hand crossbow': { type: 'Piercing', range: '30/120', launcher: true, mastery: 'Vex' },
  'heavy crossbow': { type: 'Piercing', range: '100/400', launcher: true, heavy: true, mastery: 'Push' },
  crossbow: { type: 'Piercing', range: '80/320', launcher: true, mastery: 'Vex' },
  net: { type: null, range: '5/15', thrown: true },
  musket: { type: 'Piercing', range: '40/120', launcher: true, heavy: true, mastery: 'Slow' },
  pistol: { type: 'Piercing', range: '30/90', launcher: true, mastery: 'Vex' },
};

// print writes the same weapon several ways, and a GM writes more; these resolve
// to one entry rather than becoming entries of their own
const ALIAS = {
  'hand axe': 'handaxe', 'war hammer': 'warhammer', 'battle axe': 'battleaxe', 'great axe': 'greataxe',
  'great sword': 'greatsword', 'long sword': 'longsword', 'short sword': 'shortsword', 'great club': 'greatclub',
  'morning star': 'morningstar', knife: 'dagger', knives: 'dagger', sabre: 'scimitar', saber: 'scimitar',
  broadsword: 'longsword', sword: 'longsword', axe: 'handaxe', hammer: 'warhammer', bolt: 'crossbow',
  bolts: 'crossbow', arrow: 'longbow', arrows: 'longbow', rifle: 'musket', arquebus: 'musket', carbine: 'musket',
  blunderbuss: 'musket', flintlock: 'pistol', firearm: 'pistol', gun: 'pistol', revolver: 'pistol',
  blowgun: 'dart', pole: 'quarterstaff', cudgel: 'club', warclub: 'greatclub', blade: 'longsword',
};

// the weapon words that survive inside a coined name: "Hurlaxe" is an axe,
// "Fangblade" a blade, "Stormbow" a bow. Short ones need a real word in front of
// them, or "waxes" becomes an axe.
const COMPOUND = ['sword', 'hammer', 'blade', 'staff', 'spear', 'crossbow', 'scimitar', 'dagger', 'trident', 'glaive', 'halberd', 'morningstar', 'quarterstaff', 'club', 'mace', 'pike', 'lance', 'whip', 'flail', 'axe', 'bow', 'dart'];

// three-letter compounds end a lot of innocent words. The remainder has to be
// longer for them, and these are the ones that still read as a weapon and are
// not one. ("net" is not a compound at all: the call's answer covers a coined
// net row, which is why the question exists.)
const NOT_WEAPON = /^(?:rainbow|elbow|oxbow|crossbowman|bowstring|bowman|coronet|cabinet|bayonet|clarinet|baronet|mustard|bollard|placard)$/;

const NAMES = Object.keys(WEAPONS).sort((a, b) => b.length - a.length);
const ALIASES = Object.keys(ALIAS).sort((a, b) => b.length - a.length);
const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z ]+/g, ' ').replace(/\s{2,}/g, ' ').trim();

/** The weapon a plain-words answer names, or null. The call's answer goes through here. */
export function weaponNamed(answer) {
  const a = norm(answer).replace(/^(?:a|an|the|its|his|her|their) /, '').replace(/s$/, '');
  if (!a || /^(?:none|no|n\/a|null|nothing|unarmed|natural)$/.test(a)) return null;
  const exact = NAMES.find((n) => a === n) ?? ALIASES.find((n) => a === n) ?? null;
  if (exact) return WEAPONS[exact] ? exact : ALIAS[exact];
  return weaponFor(a); // "a greatsword in both hands" still names the greatsword
}

/**
 * The weapon a ROW NAME refers to, or null — the fallback for when the call says
 * nothing. Longest name first, and a closed compound counts ("Hurlaxe" is an
 * axe), which is what the ten scattered regexes were each approximating.
 */
export function weaponFor(rowName) {
  const t = norm(rowName);
  if (!t) return null;
  for (const n of NAMES) if (new RegExp(`\\b${n}s?\\b`).test(t)) return n;
  for (const a of ALIASES) if (new RegExp(`\\b${a}s?\\b`).test(t)) return ALIAS[a];
  // a closed compound: "Hurlaxe", "Fangblade", "Warhammerhead"
  for (const w of t.split(' ')) {
    if (w.length < 6) continue; // a bare short word would have matched above
    if (NOT_WEAPON.test(w)) continue;
    for (const c of COMPOUND) {
      if (!w.endsWith(c) && !w.startsWith(c)) continue;
      if (w.length - c.length < (c.length <= 3 ? 4 : 3)) continue; // "waxes" is no axe; "hurlaxe" is
      return WEAPONS[c] ? c : (ALIAS[c] ?? null);
    }
  }
  return null;
}

export const weaponProp = (name) => WEAPONS[weaponFor(name) ?? ''] ?? null;

/**
 * EVERY weapon a text names, in the order the table holds them. `weaponFor`
 * answers "which weapon is this row?" and stops at the first; this answers
 * "which weapons did the GM ask for?", and a GM asks for two ("hurls a handaxe
 * and closes with a shortsword").
 */
export function weaponsIn(text) {
  const t = norm(text); if (!t) return [];
  const found = new Set();
  for (const n of NAMES) if (new RegExp(`\\b${n}s?\\b`).test(t)) found.add(n);
  for (const a of ALIASES) if (new RegExp(`\\b${a}s?\\b`).test(t)) found.add(ALIAS[a]);
  return [...found]; // whole words only: a GM writes real words, and "sellsword" is a job, not a longsword
}

/** Every weapon name and alias, for a consumer that keys a table on the noun. */
export const weaponNouns = () => [...NAMES, ...ALIASES];

/** Does this text name a weapon a shop sells? The prose scans asked this. */
export const namesWeapon = (text) => !!weaponFor(text);

/** Does it name one you swing — a weapon with reach that is not only thrown? */
export const namesMelee = (text) => { const w = weaponProp(text); return !!(w && w.reach); };
