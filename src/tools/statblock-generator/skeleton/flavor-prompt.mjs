/**
 * The flavor call: one LLM round that turns a mechanical skeleton into a
 * creature.
 *
 * The contract is narrow on purpose. The model NEVER writes mechanics. It
 * fills the flavor slots the templates left open and names things; the
 * substitution happens here, in code. That is what makes the numbers
 * un-driftable — there is no path by which a model response changes a damage
 * figure, a save DC or an area, because it is never asked for one and its
 * answer is never spliced into the mechanical text.
 *
 * It also means a bad response degrades instead of failing: an entry whose
 * flavor is missing keeps its slot defaults and still ships as a correct,
 * if plain, statblock.
 */
import library from '@/data/ability-library.json';
import textureBanks from '@/data/texture-banks.json';
import { FLAVOR_SLOTS, makeRng } from './build-skeleton.mjs';

/**
 * The texture-bank layer (Phase 3, owner-approved 2026-08-03). Three duties,
 * wired inside-out:
 *   1. FALLBACKS: a missing fill draws from the block's own facet banks,
 *      seeded — the never-fail floor is on-theme, not generic.
 *   2. VET: a model fill carrying another facet's domain-claiming token
 *      (spore on a forged block, gear on a grove) is replaced the same way.
 *      Token match is word-boundary-anchored and prefix-style, the
 *      NAME_LEXICON semantics. Themes license crossovers: forged+verdant
 *      makes spore vocabulary legal.
 *   3. MENUS: the flavor prompt carries the block's facet banks IN FULL as
 *      the model's working vocabulary, so replacements stay rare (see
 *      texturePalette).
 * Banks are data (src/data/texture-banks.json), authored to the printed
 * register and owner-reviewed; guide, never constrain.
 */
const BANK_FACETS = textureBanks.facets ?? {};
// full type -> facet map (the name-vetting TYPE_FACET below is the 3-domain
// subset that predates it)
const TYPE_BANK_FACET = {
  Undead: 'grave', Fiend: 'fiendish', Celestial: 'celestial', Fey: 'fey',
  Dragon: 'draconic', Elemental: 'elemental', Plant: 'verdant', Construct: 'forged',
  Aberration: 'mind', Ooze: 'amorphous', Beast: 'bestial', Giant: 'armed',
};
const VET_TOKEN_OWNER = (() => {
  const m = new Map();
  for (const [facet, bank] of Object.entries(BANK_FACETS)) {
    for (const t of bank.vet_tokens ?? []) m.set(t, facet);
  }
  return m;
})();
/** The facets this block may legally speak in: its type's facet + themes. */
function ownFacets(type, themes) {
  return new Set([TYPE_BANK_FACET[type], ...(themes ?? [])].filter(Boolean));
}
/** The first off-domain token a fill carries, or null if it's clean. */
function offDomainToken(value, own) {
  for (const [tok, owner] of VET_TOKEN_OWNER) {
    if (!own.has(owner) && new RegExp(`\\b${tok}`, 'i').test(value)) return tok;
  }
  return null;
}
/** Seeded pick from the union of the block's facet banks for a field. */
function bankDraw(field, own, rng) {
  const pool = [...own].flatMap((f) => BANK_FACETS[f]?.[field] ?? []);
  if (!pool.length || !rng) return null;
  return pool[Math.floor(rng() * pool.length)];
}

/**
 * Slots asked about PER ENTRY. {creature} is the name itself, and the damage
 * types are asked once for the whole creature rather than per entry: a
 * skeleton assembles parts from different monsters, so inheriting each part's
 * damage type produced creatures dealing Fire, Cold, Poison and Necrotic at
 * once (live: energy-type-spread and damage-type-caps both firing).
 */
const DAMAGE_SLOTS = FLAVOR_SLOTS.filter((s) => s.endsWith('damage_type'));
const ASKABLE = FLAVOR_SLOTS.filter((s) => s !== 'creature' && !DAMAGE_SLOTS.includes(s));

const PHYSICAL = ['Bludgeoning', 'Piercing', 'Slashing'];

const SLOT_BRIEF = {
  substance: 'what the effect is MADE of — a short noun phrase ("caustic brine", "shrieking dust")',
  delivery: 'how it leaves the body, third person singular ("exhales", "sprays", "sheds")',
  terrain: 'the surface this movement is keyed to ("loose scree", "still water")',
  spells: 'the at-will spell list: a JSON ARRAY of 2-3 plain spell names, e.g. ["Scorching Ray", "Command"] — NO markup, no asterisks, the engine formats them. Modest ACTION-castable spells, level 3 or lower, from the 2024 core rules only, and only spells this creature would actually use in a fight — no utility-cantrip padding. Never Reaction or Bonus Action spells (Shield, Misty Step, Counterspell)',
  spells_daily: 'the 1/Day list: a JSON ARRAY of 1-2 BIGGER plain spell names, never repeating the at-will list. Above CR 12, upcast a spell that actually scales — "Cone of Cold (level 9 version)" — never annotate a non-scaling spell (Dream has no level 9 version)',
  kindred_type: 'the creature\'s OWN type, so its aura spares its own kind (Undead, Fiend, Plant…)',
  home_plane: 'a CANONICAL plane with its article ("the Nine Hells", "the Feywild", "the Abyss") — never invented geography; a made-up realm reads tacked on',
  anchor: 'a thing the creature itself establishes — "the site of its oldest unpaid bargain", "a coin from its hoard", "the deepest root of its grove"',
  undoing: 'what makes the death permanent, as a verb phrase — "fulfills or formally forgives that bargain", "melts the coin in dragonfire"',
  legacy: 'one sentence of inheritance — "its unpaid debts pass to the creature that struck the killing blow"',
  appendage: 'the grasping limb, singular ("tentacle", "barbed chain")',
  appendage_plural: 'the same limb, plural ("tentacles", "barbed chains")',
  signature_spell: 'ONE damaging or controlling spell as a plain name, no markup ("Ice Knife", "Fear") — the engine formats it and adds it to the spell list automatically',
  signature_spell_2: 'a SECOND, different spell as a plain name, same rules as the first — an alternative cast, not a repeat',
};

/** Which flavor slots an entry actually contains. */
export function slotsIn(text) {
  return ASKABLE.filter((s) => text.includes(`{${s}}`));
}

/**
 * Entries needing flavor input, with the vocabulary the library carries for
 * that mechanic. Names are offered as suggestions, never stamped: a mechanic
 * shared by 131 creatures answers to Beak, Bite, Claw and Greataxe, and a
 * creature that is not fiery should not arrive called Fire Breath.
 */
export function flavorRequests(skeleton) {
  return [...skeleton.entries, ...skeleton.traits.map((t) => ({ ...t, section: 'Traits' }))]
    .filter((e) => e.slot_type !== 'multiattack')
    .filter((e) => !e.name_locked || slotsIn(e.text).length)
    .map((e) => ({
      id: e.id,
      section: e.section,
      placeholder_name: e.name,
      // Union across the MENU, not just the default: an option carrying a
      // slot the default lacks was never asked for, so choosing it spliced
      // the raw fallback ("its a churning rush" — live, the Dreamweb's
      // lantern: the default Teleport had no {substance}, the chosen
      // Ignited Illumination did).
      slots: [...new Set([e.text, ...(e.options ?? []).map((o) => o.text)]
        .flatMap((t) => slotsIn(t)))],
      signature: Boolean(e.signature),
      text: e.text,
      options: e.options ?? [],
    }));
}

/**
 * The TEXTURE PALETTE section: the block's facet banks IN FULL, injected
 * into every flavor prompt as the model's working vocabulary (the themed
 * spell menus' pattern — menus, not pre-stamps; the model may also write
 * new words that belong beside these). Whole banks, not samples (owner
 * call): a block carries at most two facets, the token cost is trivial,
 * and a thin sample would make outputs MORE repetitive, not less.
 *
 * REVERTED EXPERIMENT (owner call, 2026-08-03): a "calibration, not a
 * checklist — invent most fills fresh" reframe correlated with a run of
 * conceptually hollow blocks (census-keepers and memory-scribes whose
 * mechanics couldn't cash their names' checks). Bank-anchored naming keeps
 * names TEXTURAL (moonfrost, thistledown) — texture decorates mechanics;
 * invented CONCEPTS (tallying, unremembering) write promises no printed
 * mechanic can keep. "Draw on it" is the tested wording.
 */
function texturePalette(skeleton, themes) {
  const facetNames = [...new Set(themes ?? [])].filter((t) => BANK_FACETS[t]);
  if (!facetNames.length) return '';
  const banks = facetNames.map((f) => BANK_FACETS[f]);
  const substances = [...new Set(banks.flatMap((b) => b.substances ?? []))];
  const limbs = [...new Set(banks.flatMap((b) => (b.appendages ?? []).map((a) => a.one)))];
  const verbs = [...new Set(banks.flatMap((b) => b.deliveries ?? []))];
  const adjs = [...new Set(banks.flatMap((b) => b.name_adjectives ?? []))];
  const nouns = [...new Set(banks.flatMap((b) => b.name_nouns ?? []))];
  const dmg = [...new Set(banks.flatMap((b) => Object.entries(b.damage_affinity ?? {})
    .filter(([k, v]) => !k.startsWith('_') && v > 0)
    .sort((a, b) => b[1] - a[1]).map(([k]) => k)))];
  return `\nTEXTURE PALETTE — this register's full vocabulary. Draw on it for every fill and name: choose from it, combine from it, or write words that belong beside it.
- substances: ${substances.join(', ')}
- limbs: ${limbs.join(', ')}
- delivery verbs: ${verbs.join(', ')}
- name words: ${adjs.join(', ')} / ${nouns.join(', ')}${dmg.length ? `\n- energy damage this register favors: ${dmg.join(', ')}` : ''}`;
}

export function buildFlavorPrompt(skeleton, { concept, description = '', themes = null } = {}) {

  const reqs = flavorRequests(skeleton);
  const needsSpells = reqs.some((r) => r.slots.includes('spells') || r.slots.includes('spells_daily'));
  const crNum = Number(String(skeleton.cr).includes('/') ? 0.5 : skeleton.cr);
  const spellBand = crNum < 5 ? '0-4' : crNum <= 10 ? '5-10' : crNum <= 16 ? '11-16' : '17+';
  // The suggestion pool filters to the palette: off-theme picks were the
  // last recurring spell defect (Chromatic Orb on an oath celestial). The
  // model still CHOOSES — menus, not pre-stamps.
  const facets = library._meta.spell_facets ?? {};
  const onPalette = (sp) => !themes || !themes.length || !facets[sp]
    || facets[sp].some((f) => themes.includes(f));
  const themedPool = (list) => {
    const kept = list.filter(onPalette);
    return (kept.length >= 3 ? kept : list);
  };
  const themedSuggestions = themes && themes.length
    ? Object.keys(facets).filter((sp) => facets[sp].some((f) => themes.includes(f))).slice(0, 8)
    : [];
  const spellPolicyLine = needsSpells
    ? `\nSPELLS at this tier, from print: at-will lists are cantrips and level 1-2 offense (printed examples: ${themedPool(SPELL_POLICY.printed_pools[spellBand].at_will).slice(0, 8).join(', ')}); level 3+ offense goes in the 1/Day list (printed examples: ${themedPool(SPELL_POLICY.printed_pools[spellBand].daily).slice(0, 6).join(', ') || 'Fireball, Cone of Cold'}).${themedSuggestions.length ? ` ON-PALETTE picks for this creature's themes: ${themedSuggestions.join(', ')}.` : ''} 2024 core spells only.`
    : '';
  const lines = reqs.map((r) => {
    const asks = [
      'name',
      ...r.slots,
    ].join(', ');
    const flag = r.signature
      ? '  [SIGNATURE: printed on exactly one creature in the SRD. Rename and re-flavor it hard enough that a reader who knows that creature would not place it.]'
      : '';
    // With alternatives on offer, show them and let the concept choose. The
    // engine guarantees every option is correctly scaled and dependency-safe,
    // so the choice cannot produce an invalid block — only a better-fitting
    // one. This is what makes the concept actually reach ability selection.
    if (r.options.length > 1) {
      const menu = r.options
        .map((o, i) => `    ${i === 0 ? '*' : ' '}${o.key}: ${o.text}`)
        .join('\n');
      return `- ${r.id} (${r.section}) — CHOOSE ONE that suits the concept (* = default):\n${menu}\n  provide: choose, ${asks}${flag ? `\n${flag}` : ''}`;
    }
    return `- ${r.id} (${r.section}): ${r.text}\n  provide: ${asks}${flag ? `\n${flag}` : ''}`;
  }).join('\n');

  return `You are writing the flavor for a D&D 2024 monster. Every number is already fixed and is NOT your concern.

CONCEPT: ${concept}${description ? `\nDETAILS: ${description}` : ''}${themes && themes.length ? `\nTHEME THREADS — the block's ENTIRE palette. Every name, every {substance}, every {delivery} and {appendage} draws from these and nothing else: ${themes.join(', ')}` : ''}${texturePalette(skeleton, themes)}

The creature is CR ${skeleton.cr}, ${skeleton.size}, AC ${skeleton.ac}, HP ${skeleton.hp}.

Its abilities are written out below with blanks in {braces}. Fill ONLY the blanks and give each entry a name that fits THIS creature. Do not rewrite any other word, and do not invent, remove or renumber abilities.

${lines}${spellPolicyLine}

Blanks mean:
${ASKABLE.map((s) => `  {${s}} — ${SLOT_BRIEF[s]}`).join('\n')}

Intelligence must support the mind you give it: an alignment other than Unaligned, any language, or judgment/arcane themes all need Intelligence 6+; at Intelligence 4 or below the creature is Unaligned instinct. Every name in the block shares ONE identity: choose at most two thematic threads from the concept and use them consistently — a block that is simultaneously swamp, frost, bone and planar-rift reads as a random-adjective table. Truesight belongs to high-planar minds; a lurking beast takes Tremorsense or Blindsight. Never borrow another type's vocabulary for names: no "wraith" on a living creature, no "Abyssal" on a Celestial, no "infernal" on a fey — the audience reads those as template seams. A name must FIT its mechanics: a shriek or roar is Thunder damage against a Constitution save; a beam or bolt is Dexterity; don't name a Dexterity-save Force bolt "Piercing Shriek". Names should say what the creature IS, not what the ability does: prefer a name drawn from the creature's nature over a description of its mechanics.

The creature's TYPE is already decided by the engine — do not choose one. Senses must support the body: a burrower or anything immune to the Blinded condition needs Tremorsense or Blindsight, not just eyes. Languages at Intelligence 4 or below follow the Zombie pattern ("Understands X but can't speak") or none. Vulnerabilities above CR 10 are almost never printed — only take one as a deliberate, concept-central choice.

Resistances and immunities are a budget, not a list: below CR 5 usually none or one; at high CR two or three resistances and one or two immunities, chosen for the concept. Damage immunities cost double a resistance.

Pick save proficiencies to match the tier: below CR 5 usually none, CR 5-10 up to two, CR 11+ two to four. Pick zero to three skills (Perception and Stealth are by far the most common in print).

Pick ONE physical damage type and ONE energy damage type for the whole creature. Its parts were assembled from several monsters, so choosing per ability produces something that deals fire, cold, poison and necrotic at once. You may ALSO pick an optional second energy type ("energy_damage_2") for dual-natured effects — a demon that burns AND blasts (Fire + Force) — only when the concept genuinely has two energies; omit it otherwise.
If the creature cannot speak, give it telepathy in senses_special or pick only spells it could deliver without a voice.

Return ONLY JSON:
{
  "physical_damage": "Bludgeoning|Piercing|Slashing",
  "energy_damage": "Acid|Cold|Fire|Force|Lightning|Necrotic|Poison|Psychic|Radiant|Thunder",
  "energy_damage_2": "optional second energy type, or omit",
  "name": "the creature's name",
  "size": "${skeleton.size}",

  "alignment": "e.g. Chaotic Evil",
  "speed": "${skeleton.movement && skeleton.movement.length ? `must include these modes: ${skeleton.movement.map((m) => m[0].toUpperCase() + m.slice(1)).join(', ')} — e.g. '30 ft., ${skeleton.movement.map((m) => `${m[0].toUpperCase() + m.slice(1)} 40 ft.`).join(', ')}'` : 'e.g. 30 ft., Fly 60 ft.'}",
  "stats": { "STR": 10, "DEX": 10, "CON": 10, "INT": 10, "WIS": 10, "CHA": 10 },
  "senses_special": "e.g. Darkvision 60 ft., Tremorsense 60 ft. — or omit",
  "save_proficiencies": ["zero to four of STR|DEX|CON|INT|WIS|CHA"],
  "skill_proficiencies": ["zero to three, e.g. Perception, Stealth"],
  "languages": "or omit",
  "resistances": "or omit", "immunities": "or omit", "vulnerabilities": "or omit",
  "entries": [
    { "id": "e1", "choose": "the key of the option you picked, when offered", "name": "an entry name"${ASKABLE.map((s) => `, "${s}": "only if e1 asks for it"`).join('')} }
  ]
}`;
}

/** A response is usable if it names the creature and returns an entries array. */
export function validateFlavorResponse(jsonString) {
  try {
    const j = JSON.parse(jsonString);
    if (!j || typeof j.name !== 'string' || !j.name.trim()) return false;
    if (!Array.isArray(j.entries)) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Substitute the model's flavor into the skeleton and hand back the shape
 * assembleMonster expects.
 *
 * Anything the model failed to supply falls back to a neutral default rather
 * than leaving a literal "{substance}" in the text. A plain monster beats a
 * broken one, and beats a failed generation.
 */
const FALLBACK = {
  // Avoid any word that is also a damage type: "raw force" tripped
  // damage-type-caps, which reads a lowercase "force" as a miscased type.
  // And ARTICLE-FREE: templates use both "unleashes {substance}" and "its
  // {substance}" — "its a churning rush" shipped live (the Dreamweb).
  substance: 'churning vapor',
  delivery: 'unleashes',
  terrain: 'difficult ground',
  spells: '*Detect Magic*',
  spells_daily: '',
  kindred_type: 'creature of its own kind',
  home_plane: 'its home realm',
  appendage: 'grasping limb',
  appendage_plural: 'grasping limbs',
  signature_spell: '*Chromatic Orb*',
  signature_spell_2: '*Wall of Fire*',
  anchor: 'the place of its making',
  undoing: 'destroys that place',
  legacy: 'its power scatters, leaving an omen where it fell',
};

/**
 * Spells that cannot be cast through an action-based "casts one of the
 * following" entry. Zero printed action lists carry any of these; a model
 * picking Shield by vibe ships a spell list where half the entries do
 * nothing (live: the Alabaster's at-will Shield and Misty Step).
 */
const NON_ACTION_SPELLS = ['Shield', 'Misty Step', 'Counterspell', 'Hellish Rebuke',
  'Absorb Elements', 'Silvery Barbs', 'Feather Fall', 'Healing Word', 'Spiritual Weapon',
  'Shield of Faith', 'Expeditious Retreat'];

/**
 * Hard-control spells never sit At Will: print lists them 1/Day (the Adult
 * Silver Dragon's Hold Monster) even when a legendary action echoes them.
 * At-will Hold Monster is an unrelenting no-cost paralysis engine — the
 * audit flagged it on a live block but justified itself with a hallucinated
 * precedent, so the rule lives here, deterministically.
 */
const NO_AT_WILL_SPELLS = ['Hold Monster', 'Hold Person', 'Banishment', 'Dominate Person',
  'Dominate Monster', 'Forcecage', 'Maze', 'Plane Shift', 'Power Word Kill', 'Power Word Stun'];

/**
 * Spell levels for the well-known list, high-confidence subset. The rule
 * (owner call, 2026-08-02, third live occurrence of tier misfiling): no
 * spell of level 4+ ever sits At Will. Unknown names pass — a wrong level
 * would misfile someone's homebrew; a missing one only means the name-list
 * above and the audit still stand.
 */
const SPELL_LEVELS = {
  'Guiding Bolt': 1, 'Ice Knife': 1, 'Entangle': 1, 'Fog Cloud': 1, 'Thunderwave': 1,
  'Misty Step': 2, 'Invisibility': 2, 'Shatter': 2, 'Mind Spike': 2, 'Web': 2, 'Darkness': 2,
  'Hold Person': 2, 'Scorching Ray': 2, 'Gust of Wind': 2, 'Mirror Image': 2,
  'Fear': 3, 'Fireball': 3, 'Counterspell': 3, 'Fly': 3, 'Lightning Bolt': 3, 'Slow': 3,
  'Sleet Storm': 3, 'Stinking Cloud': 3, 'Command': 1,
  'Banishment': 4, 'Ice Storm': 4, 'Wall of Fire': 4, 'Polymorph': 4, 'Dimension Door': 4,
  'Confusion': 4, 'Blight': 4, 'Phantasmal Killer': 4,
  'Hold Monster': 5, 'Cone of Cold': 5, 'Wall of Force': 5, 'Cloudkill': 5, 'Dominate Person': 5,
  'Wall of Stone': 5, 'Telekinesis': 5, 'Flame Strike': 5, 'Insect Plague': 5,
  'Wall of Ice': 6, 'Chain Lightning': 6, 'Disintegrate': 6, 'Eyebite': 6, 'Sunbeam': 6,
  'Harm': 6, 'Heal': 6, 'Mass Suggestion': 6,
  'Prismatic Spray': 7, 'Reverse Gravity': 7, 'Teleport': 7, 'Finger of Death': 7, 'Etherealness': 7,
  'Dominate Monster': 8, 'Earthquake': 8, 'Sunburst': 8, 'Holy Aura': 8, 'Incendiary Cloud': 8,
  'Maze': 8, 'Power Word Stun': 8,
  'Meteor Swarm': 9, 'Power Word Kill': 9, 'Time Stop': 9, 'Storm of Vengeance': 9, 'Gate': 9,
  'Geas': 5, 'Modify Memory': 5, 'Dream': 5, 'Legend Lore': 5, 'Scrying': 5, 'Seeming': 5,
  'Mislead': 5, 'Commune': 5, 'Charm Person': 1, 'Suggestion': 2, 'Charm Monster': 4,
  'Divination': 4, 'Animate Dead': 3, 'Bestow Curse': 3, 'Vampiric Touch': 3, 'Haste': 3,
  'Blink': 3, 'Gaseous Form': 3, 'Create Undead': 6, 'Contact Other Plane': 5,
};

/**
 * Spells whose casting time exceeds one action (Geas: 1 minute; Dream: 1
 * minute). They CANNOT be cast in combat, so they never sit At Will and
 * never fill a combat-speed echo — but they stay legal in the 1/Day list,
 * because print puts them there as out-of-combat tools (the Night Hag's
 * Dream). Live: at-will Geas plus a legendary casting it three times a
 * round, all physically impossible under its own casting time.
 */
const SLOW_CAST = ['Geas', 'Dream', 'Scrying', 'Commune', 'Legend Lore', 'Animate Dead',
  'Create Undead', 'Raise Dead', 'Symbol', 'Hallow', 'Forbiddance', 'Magic Circle',
  'Identify', 'Astral Projection', 'Contact Other Plane', 'Divination', 'Awaken', 'Simulacrum',
  'Glyph of Warding', 'Find Familiar', 'Modify Memory'];

/**
 * Concentration spells never cast from a LEGENDARY action (owner overrule,
 * 2026-08-03, modified_from_print on the White Dragon rows): the corpus's
 * one example reads as WotC errata, not policy — and a legendary-action
 * concentration cast is self-defeating anyway, competing with the
 * creature's own turn. Daily and at-will lists remain legal homes for
 * these (the Night Hag precedent).
 */
export const CONCENTRATION_SPELLS = ['Fear', 'Hold Person', 'Hold Monster', 'Dominate Person',
  'Dominate Monster', 'Dominate Beast', 'Hypnotic Pattern', 'Slow', 'Haste', 'Invisibility',
  'Greater Invisibility', 'Fly', 'Levitate', 'Blur', 'Banishment', 'Confusion',
  'Phantasmal Killer', 'Spirit Guardians', 'Bless', 'Bane', 'Faerie Fire', 'Web', 'Entangle',
  'Darkness', 'Fog Cloud', 'Silence', 'Moonbeam', 'Call Lightning', 'Flaming Sphere',
  'Witch Bolt', 'Eyebite', 'Sunbeam', 'Telekinesis', 'Polymorph', 'Charm Monster',
  'Compulsion', 'Stinking Cloud', 'Sleet Storm', 'Gaseous Form', 'Detect Thoughts',
  'Insect Plague', 'Cloudkill', 'Wall of Fire', 'Wall of Ice', 'Wall of Force', 'Wall of Stone',
  // gap-audit additions (live: Census Command cast Earthquake from a
  // legendary action — the rule was right, the list was short)
  'Earthquake', 'Vampiric Touch', 'Control Water', 'Control Weather'];

/**
 * Spells where "(level N version)" actually changes anything. Dream has no
 * upcast — "(level 9 version)" on it is noise the spike nudge invited.
 */
const SCALING_SPELLS = ['Guiding Bolt', 'Scorching Ray', 'Fireball', 'Lightning Bolt',
  'Cone of Cold', 'Hold Person', 'Hold Monster', 'Ice Storm', 'Blight', 'Phantasmal Killer',
  'Shatter', 'Magic Missile', 'Cure Wounds', 'Sleep', 'Thunderwave', 'Ice Knife', 'Command',
  'Mind Spike', 'Wall of Ice', 'Chain Lightning', 'Flame Strike', 'Spirit Guardians'];
// Corpus policy: at-will OFFENSE caps at level 2 in print; self-utility is
// exempt (metallic dragons carry Shapechange at will). Unknown names pass.
// (import, not require — this module runs in the browser; a stray require()
// here failed the first live generation after the policy shipped.)
const SPELL_POLICY = library._meta.spell_policy;
const atWillBanned = (sp) => NO_AT_WILL_SPELLS.includes(sp) || SLOW_CAST.includes(sp)
  || ((SPELL_LEVELS[sp] ?? 0) >= 3 && !SPELL_POLICY.self_utility_exempt.includes(sp));

/**
 * The curated spell universe: the union of every vetting table. A spell
 * outside it is off-palette BY DEFINITION — the tier rules can't judge what
 * they can't tier, which is exactly how Earth Tremor and Erupting Earth
 * (Xanathar's picks on a 2024-core block) sailed past every rule (live: the
 * Groan). Off-list names are dropped from list lines, never rewritten.
 */
const KNOWN_SPELLS = new Set([
  ...Object.keys(SPELL_LEVELS), ...NO_AT_WILL_SPELLS, ...SLOW_CAST, ...SCALING_SPELLS,
  ...NON_ACTION_SPELLS, ...(SPELL_POLICY.self_utility_exempt ?? []),
  ...Object.values(SPELL_POLICY.printed_pools ?? {})
    .flatMap((b) => [...(b.at_will ?? []), ...(b.daily ?? [])]),
  ...Object.keys(library._meta.spell_facets ?? {}),
  // every spell a printed template names inline is vetted by definition
  // (the Deva's *Bless*, the Pit Fiend's *Hold Monster*) — dropping one of
  // those would break the cast-implies-listed guarantee
  ...[...Object.values(library.categories).flat(), ...Object.values(library.traits.by_category).flat()]
    .flatMap((r) => [...(r.template_2024 ?? '').matchAll(/\*([A-Z][\w' ]+?)\*/g)].map((m) => m[1]))
    .filter((s) => !['Failure or Success', 'Hit or Miss', 'First Failure', 'Second Failure',
      'Failure', 'Success', 'Hit', 'Miss', 'Trigger', 'Response'].includes(s)),
]);

/**
 * Resolve which option fills each slot.
 *
 * The model's pick wins when it names a real option. The safety net is that
 * the DEFAULT combination (every entry's first option) was validated when the
 * skeleton was built, so if a set of swaps leaves some entry's dependency
 * unmet — swapping away the only grappler while a grapple-dependent entry
 * remains — the offending entries revert rather than shipping stranded.
 */
export function resolveChoices(skeleton, byId) {
  // Choices match on NORMALIZED keys: the model wraps picks in markdown
  // ("*Blinding Gaze*"), and an exact match silently kept the default — the
  // model then named the entry for the mechanic it believed it had (live:
  // "Lidless Glare" that pushes, because *Blinding Gaze matched nothing and
  // Cold Gale stayed).
  const normKey = (s) => String(s ?? '').replace(/[*`]/g, '')
    // snake_case and kebab-case arrive from the model ("cold_breath") —
    // separators normalize to spaces, not deletion ("coldbreath" matched
    // nothing and every multi-word choice silently kept its default; live:
    // the Shivering Watcher's trace)
    .replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  const chosen = skeleton.entries.map((e) => {
    if (!e.options || e.options.length < 2) return e;
    const want = normKey(byId.get(e.id)?.choose);
    const hit = want && e.options.find((o) => normKey(o.key) === want);
    return hit ? { ...e, ...hit, id: e.id, section: e.section } : e;
  });
  // Dependency repair BEFORE the clash pass. A swap can remove the block's
  // only imposer of a condition — swap away the grappler and a "creature
  // Grappled by the {creature}" entry strands (live: grapple-dependency-
  // orphan after a last-option sweep). Reverting the CONSUMER doesn't help:
  // its default needs the condition too. The right revert target is the
  // SWAP that removed the imposer, so restore that entry's default, which
  // satisfied everyone at build time.
  const satisfies = (e, r) => {
    if (r === 'attack:any') return e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack';
    if (r.startsWith('ability:')) return `ability:${e.name}` === r;
    if (r.startsWith('trait:')) return false; // traits are never swapped
    return (e.imposes ?? []).includes(r);
  };
  const buildMet = () => {
    const m = new Set();
    for (const e of chosen) {
      if (e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack') m.add('attack:any');
      for (const t of e.imposes ?? []) m.add(t);
      m.add(`ability:${e.name}`);
    }
    for (const t of skeleton.traits) m.add(`trait:${t.name}`);
    return m;
  };
  let met = buildMet();
  for (let guard = 0; guard < chosen.length; guard += 1) {
    let repaired = false;
    for (const e of chosen) {
      for (const r of e.requires ?? []) {
        if (met.has(r)) continue;
        const j = chosen.findIndex((c, idx) => c !== skeleton.entries[idx]
          && satisfies(skeleton.entries[idx], r));
        if (j !== -1) { chosen[j] = skeleton.entries[j]; repaired = true; }
      }
    }
    if (!repaired) break;
    met = buildMet();
  }
  // Sentence overlap is only checkable once the full combination is known:
  // two entries' NON-default options can duplicate each other even though
  // each was distinct from the defaults at build time.
  // Attack references are normalized before comparing: repointing later
  // renames them ALL to the block's own attack, so "makes one Rend attack"
  // and "makes one Claw attack" become the same sentence (live: Pounce and
  // Giggling Magic collided only after the swap).
  const sentences = (t) => new Set(String(t)
    .replace(/\b(makes? (?:one|two|three) )[A-Z][a-z]+(?: [A-Z][a-z]+)? attack/g, '$1X attack')
    .split(/(?<=\.)\s+/).map((x) => x.trim()).filter((x) => x.length > 30));
  const overlap = (a, b) => {
    let shared = 0;
    for (const line of a) if (b.has(line)) shared += 1;
    return shared >= 2;
  };
  const kept = [];
  for (let i = 0; i < chosen.length; i += 1) {
    const unmet = (chosen[i].requires ?? []).some((r) => !met.has(r));
    let e = unmet ? skeleton.entries[i] : chosen[i];
    let mine = sentences(e.text);
    const j = kept.findIndex((k) => overlap(mine, sentences(k.text)));
    if (j !== -1) {
      // First try reverting THIS entry to its default.
      e = skeleton.entries[i];
      mine = sentences(e.text);
      // If the default still clashes, the earlier entry's SWAP is the real
      // problem (defaults are mutually clash-free by construction at build
      // time) — revert that one instead. Order must not decide which swap
      // survives a collision the model could not have foreseen.
      if (overlap(mine, sentences(kept[j].text))) {
        kept[j] = skeleton.entries[j];
      }
    }
    kept.push(e);
  }
  return kept;
}

/**
 * Advance the named entries to their next alternative.
 *
 * This is how an audit finding is acted on. The old pipeline answered a
 * finding by asking the model to rewrite the entry's TEXT, which is the door
 * this architecture closes — a rewrite can change a damage figure. Swapping
 * the whole mechanic for another pre-scaled option fixes the creature without
 * ever letting prose become mechanics, and costs no call.
 *
 * An entry with no alternative left is kept as-is: shipping a block with a
 * known wart beats failing the generation.
 */
export function swapEntries(skeleton, entryNames) {
  const wanted = new Set(entryNames);
  const choices = new Map();
  for (const e of skeleton.entries) {
    if (!wanted.has(e.name) || !e.options || e.options.length < 2) continue;
    const at = e.options.findIndex((o) => o.key === e.name);
    const next = e.options[(at + 1) % e.options.length];
    if (next && next.key !== e.name) choices.set(e.id, next.key);
  }
  return choices;
}

export function applyFlavor(skeleton, llmJson) {
  // Defensive against a PARTIAL object, not merely a malformed one. The
  // validator rejects a nameless response, but callers can bypass validation
  // (a mocked client, a retry handing back the last raw body), and throwing
  // here would fail the entire generation — the one thing this path promises
  // never to do. A block with a placeholder name is still a usable block.
  const j = llmJson && typeof llmJson === 'object' ? llmJson : {};
  const given = Array.isArray(j.entries) ? j.entries : [];
  const byId = new Map(given.filter((e) => e && e.id).map((e) => [e.id, e]));
  // eslint-disable-next-line no-param-reassign
  skeleton = { ...skeleton, entries: resolveChoices(skeleton, byId) };
  const creatureName = (typeof j.name === 'string' && j.name.trim())
    ? j.name.trim() : 'Unnamed Creature';
  // The lower-case form reads correctly mid-sentence ("the shalefang exhales").
  const inline = creatureName.toLowerCase();

  // One palette for the whole creature. A weapon swing is physical; a breath,
  // aura or rider is the creature's energy. Riders on a weapon attack are the
  // energy type, which is how official blocks read ("Slashing damage plus
  // Fire damage").
  const physical = PHYSICAL.includes(j.physical_damage) ? j.physical_damage : 'Bludgeoning';
  const energy = typeof j.energy_damage === 'string' && j.energy_damage.trim()
    ? j.energy_damage.trim() : 'Force';
  // Optional SECOND energy for dual-natured effects (owner call, 2026-08-04):
  // a dual-pool print row (the Balor's Fire + Force Death Throes) fills its
  // rider with the second energy when the concept granted one; otherwise the
  // same-type pools merge downstream.
  const ENERGY_TYPES = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder'];
  const energy2 = typeof j.energy_damage_2 === 'string'
    && ENERGY_TYPES.includes(j.energy_damage_2.trim())
    && j.energy_damage_2.trim() !== energy
    ? j.energy_damage_2.trim() : null;

  // Facets this block may speak in, for the fill vet and banked fallbacks.
  const own = ownFacets(j.type, skeleton.themes);
  const TEXTURE_SLOTS = ['substance', 'delivery', 'terrain', 'appendage', 'appendage_plural'];
  // Echo-spell uniqueness across the block: print fields TWO spell-echo
  // legendaries (the Blue's Cloaked Flight + Sonic Boom) but never two
  // echoes of the SAME spell — the live Warden cast Command from two
  // legendary actions at once. A duplicate fill redraws on-palette.
  const usedEchoSpells = new Set();

  const fill = (entry) => {
    const given = byId.get(entry.id) ?? {};
    let text = entry.text;
    // Seeded per entry so fallback texture varies across a block instead of
    // repeating one phrase, yet stays reproducible from the block's seed.
    const entryRng = makeRng(((skeleton.seed ?? 1) >>> 0)
      + [...String(entry.id ?? '')].reduce((s, c) => s + c.charCodeAt(0), 0));
    // One appendage PAIR per entry: {appendage} and {appendage_plural} must
    // agree ("piston arm" / "piston arms"), so both draw from the same pick.
    let appendagePair = null;
    const bankFallback = (slot) => {
      if (slot === 'appendage' || slot === 'appendage_plural') {
        appendagePair = appendagePair ?? bankDraw('appendages', own, entryRng);
        return appendagePair ? (slot === 'appendage' ? appendagePair.one : appendagePair.many) : null;
      }
      if (slot === 'substance') return bankDraw('substances', own, entryRng);
      if (slot === 'delivery') return bankDraw('deliveries', own, entryRng);
      return null; // terrain has no bank; the static fallback covers it
    };
    // Spell fills are STRUCTURED DATA, not markup (owner call, 2026-08-03):
    // the contract asks for plain names (arrays for lists), and the ENGINE
    // writes every asterisk. The model authoring its own italics made a
    // stylistic convention load-bearing — a degraded response dropped it and
    // every spell-recognizing layer went blind at once (live: the Grave
    // Vow's empty list and its dangling Blight echo). Strings still
    // normalize through the same path as a compatibility belt.
    const SPELL_SLOTS = (slot) => ['spells', 'spells_daily'].includes(slot) || slot.startsWith('signature_spell');
    const canonicalSpell = (rawName) => {
      const upcast = (rawName.match(/\s*\((level \d+ version)\)\s*$/) ?? [])[1];
      const bare = rawName.replace(/[*_`]/g, '').replace(/\s*\(level \d+ version\)\s*$/, '').trim();
      const hit = [...KNOWN_SPELLS].find((k) => k.toLowerCase() === bare.toLowerCase());
      if (!hit) return null;
      return `*${hit}*${upcast ? ` (${upcast})` : ''}`;
    };
    const normalizeSpellFill = (slot, raw) => {
      const names = Array.isArray(raw) ? raw.map(String)
        : typeof raw === 'string' ? raw.split(',') : [];
      const kept = names.map((n) => canonicalSpell(n)).filter(Boolean);
      const limit = slot === 'spells' || slot === 'spells_daily' ? kept.length : 1;
      return kept.length ? kept.slice(0, Math.max(1, limit)).join(', ') : null;
    };
    for (const slot of slotsIn(entry.text)) {
      let value;
      if (SPELL_SLOTS(slot)) {
        value = normalizeSpellFill(slot, given[slot]);
      } else {
        value = typeof given[slot] === 'string' && given[slot].trim()
          ? given[slot].trim() : null;
      }
      // The fill vet: a texture fill claiming a facet this block doesn't own
      // ("spore-laced" on a forged block whose themes never said verdant) is
      // replaced from the block's own banks, exactly like a missing fill.
      if (value && TEXTURE_SLOTS.includes(slot) && offDomainToken(value, own)) {
        value = null;
      }
      // Theme-aware spell draw (owner-approved 2026-08-03): on-palette,
      // pre-filtered against everything the downstream vets would reject,
      // so a pick always survives. Used for dead signature fills AND for
      // echo-spell dedupe redraws.
      const themedSpell = (exclude) => {
        const legendary = entry.section === 'Legendary Actions';
        const pool = Object.entries(library._meta.spell_facets ?? {})
          .filter(([, fs]) => fs.some((f) => own.has(f)))
          .map(([sp]) => sp)
          .filter((sp) => !SLOW_CAST.includes(sp) && !NON_ACTION_SPELLS.includes(sp)
            && !(exclude && exclude.has(sp))
            && !(legendary && CONCENTRATION_SPELLS.includes(sp)));
        return pool.length ? `*${pool[Math.floor(entryRng() * pool.length)]}*` : null;
      };
      if (!value) {
        value = (TEXTURE_SLOTS.includes(slot) ? bankFallback(slot) : null)
          ?? (slot.startsWith('signature_spell') ? themedSpell() : null)
          ?? FALLBACK[slot];
      }
      // Fills never carry their own terminal punctuation: the template
      // supplies it, and a sentence-shaped fill ("...every forge it
      // consumed.") spliced before the template's period shipped a live
      // double period (the Foundry Stag's Furnace Heart).
      value = value.replace(/\.+$/, '');
      // an echo casts at combat speed: a 1-minute spell in it is impossible
      if (slot.startsWith('signature_spell') && SLOW_CAST.includes(value.replace(/\*/g, '').replace(/\s*\(.*\)$/, '').trim())) {
        value = FALLBACK[slot];
      }
      // No concentration spell casts from a LEGENDARY action (owner
      // overrule, see CONCENTRATION_SPELLS). List-shaped fills keep their
      // clean members; a fill emptied by the filter takes the fallback.
      if (entry.section === 'Legendary Actions'
        && (['spells', 'spells_daily'].includes(slot) || slot.startsWith('signature_spell'))) {
        const names = [...value.matchAll(/\*([A-Z][\w' ]+?)\*( \(level \d+ version\))?/g)];
        if (names.length) {
          const kept = names.filter((mm) => !CONCENTRATION_SPELLS.includes(mm[1]))
            .map((mm) => `*${mm[1]}*${mm[2] ?? ''}`);
          if (kept.length !== names.length) value = kept.join(', ') || FALLBACK[slot];
        }
      }
      // (Off-list vetting for spell slots now happens in normalizeSpellFill
      // above — unknown names never survive normalization.)
      // Echo-spell dedupe: an ECHO entry (anything that isn't the tiered
      // list) filling a spell another echo already cast redraws on-palette.
      if (SPELL_SLOTS(slot) && !/casts one of the following/.test(entry.text)) {
        const names = [...value.matchAll(/\*([A-Z][\w' ]+?)\*/g)].map((mm) => mm[1]);
        if (names.some((nm) => usedEchoSpells.has(nm))) {
          const alt = themedSpell(new Set([...usedEchoSpells, ...names]));
          if (alt) value = alt;
        }
        for (const mm of value.matchAll(/\*([A-Z][\w' ]+?)\*/g)) usedEchoSpells.add(mm[1]);
      }
      // "each creature that isn't a Humanoid" spares the party — a kindred
      // exclusion only works when the kindred isn't what adventurers are.
      if (slot === 'kindred_type' && /humanoid/i.test(value)) value = FALLBACK.kindred_type;
      text = text.split(`{${slot}}`).join(value);
    }
    // A weapon attack's MAIN damage is physical; everything else is energy.
    const mainIsPhysical = entry.slot_type === 'plain_attack' || entry.slot_type === 'rider_attack';
    text = text.split('{damage_type}').join(mainIsPhysical ? physical : energy);
    for (const s of ['rider_damage_type', 'rider2_damage_type', 'alt_damage_type', 'alt2_damage_type']) {
      // On a NON-attack entry the main is already the energy, so a rider
      // slot takes the second energy when the concept granted one — print's
      // dual-pool rows (Fire plus Force) instead of "Fire plus Fire".
      const riderEnergy = s.startsWith('rider') && !mainIsPhysical ? (energy2 ?? energy) : energy;
      text = text.split(`{${s}}`).join(s.startsWith('alt') && mainIsPhysical ? physical : riderEnergy);
    }
    text = text.split('{creature}').join(inline);
    let name = (entry.name_locked ? entry.name : (given.name || entry.name)).trim();
    // The gate is part of the NAME in print ("Fire Breath (Recharge 5-6)").
    // It was being dropped here, which shipped every recharge ability as
    // at-will (live: a 60-foot paralysis cone usable every turn). Legendary
    // entries carry their pacing inline instead, as print does.
    if (entry.gate && entry.section !== 'Legendary Actions' && !/\(/.test(name)) {
      name = `${name} (${entry.gate})`;
    }
    return { name, text };
  };

  const sections = {};
  const push = (section, e) => {
    if (!sections[section]) sections[section] = [];
    sections[section].push(e);
  };
  // Skeleton entry -> its rendered object, so the Multiattack rebuild at the
  // bottom can read FINAL names (post-swap, post-rename, post-vetting).
  const renderedOf = new Map();
  for (const t of skeleton.traits) push('Traits', fill(t));
  for (const e of skeleton.entries) {
    const r = fill(e);
    renderedOf.set(e, r);
    push(e.section, r);
  }

  // A swap can change which entry IS the attack, so references written
  // against the pre-swap name dangle ("makes one Rend attack" with no Rend).
  // Repoint every reference at whatever the attack ended up being, before the
  // rename pass below renames it again.
  const finalAttack = skeleton.entries.find(
    (e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack',
  );
  if (finalAttack) {
    for (const list of Object.values(sections)) {
      for (const e of list) {
        e.text = e.text.replace(
          /\b(makes?|replace|repeats?) (one|two|three|its|a|an|the) ([A-Z][a-z]+(?: [A-Z][a-z]+)?) attack/g,
          (m0, verb, count, named) => (named === finalAttack.name ? m0 : `${verb} ${count} ${finalAttack.name} attack`),
        );
      }
    }
  }

  // Entry names may have changed, so references written against the old name
  // must follow. Multiattack is the common case ("makes three Rend attacks").
  const attacks = (skeleton.entries ?? []).filter(
    (e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack',
  );
  // EVERY attack, not just the first: the Multiattack line now enumerates
  // secondaries ("It can replace one attack with a use of X"), so their
  // renames must follow too.
  for (const atk of attacks) {
    const oldName = atk.name;
    const newName = (byId.get(atk.id)?.name || oldName).trim();
    if (newName === oldName) continue;
    // Word-boundaried: a bare split/join on "Bite" would also rewrite the
    // inside of "Ruin-Fed Bite" and corrupt the longer name.
    const esc = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?<![\\w-])${esc}(?![\\w-])`, 'g');
    for (const list of Object.values(sections)) {
      for (const e of list) e.text = e.text.replace(re, newName);
    }
  }

  // ---- post-flavor sanity, all deterministic ------------------------------

  // 0a. Movement-mode references must exist on the speed line. Flyby on a
  //     walk/climb creature "never triggers" (live: Algae-Slick Spring,
  //     'flies out of reach' with no Fly Speed) — the reference downgrades
  //     to the movement the creature actually has.
  {
    const speedLine = String(j.speed ?? '');
    const modes = [['Fly', /flies (out of|up to)/g, 'fly'], ['Swim', null, null], ['Burrow', null, null], ['Climb', null, null]];
    for (const [mode] of modes) {
      if (new RegExp(mode, 'i').test(speedLine)) continue;
      for (const list of Object.values(sections)) {
        for (const e of list) {
          e.text = e.text
            .split(`its ${mode} Speed`).join('its Speed')
            .replace(mode === 'Fly' ? /\bflies out of\b/g : /$^/, 'moves out of')
            .replace(mode === 'Fly' ? /\bfly up to\b/g : /$^/, 'move up to');
        }
      }
    }
  }

  // 0a2. Sight ranges must fit the senses line: "one creature it can see
  //      within 120 feet" on "blindsight 60 ft. (blind beyond this radius)"
  //      leaves the outer 60 feet as dead text (live: the Dreamweb, all
  //      three legendary actions doubled its perceptual universe).
  {
    const senses = String(j.senses_special ?? '');
    if (/blind beyond/i.test(senses)) {
      const radii = [...senses.matchAll(/(\d+)\s*ft/g)].map((m) => Number(m[1]));
      const radius = radii.length ? Math.max(...radii) : null;
      if (radius) {
        for (const list of Object.values(sections)) {
          for (const e of list) {
            e.text = e.text.replace(/can see within (\d+) feet/g,
              (m0, n) => (Number(n) > radius ? `can see within ${radius} feet` : m0));
          }
        }
      }
    }
  }

  // 0b. The dead don't breathe: no printed Undead or Construct carries
  //     "can breathe air and water" (0 in the corpus).
  if (['Undead', 'Construct'].includes(j.type)) {
    for (const list of Object.values(sections)) {
      for (const e of list) {
        e.text = e.text.replace(/can breathe air and water/g, "doesn't require air and can move and fight underwater");
      }
    }
  }

  // 0c. Name vocabulary vetting: a name token carrying another domain's
  //     identity reverts the entry to its placeholder ("Abyssal Radiance"
  //     on a Celestial, "Oathwraith" on the living). The lexicon is small
  //     and high-confidence; generation of GOOD names stays the model's.
  {
    const NAME_LEXICON = {
      wraith: 'grave', lich: 'grave', ghoul: 'grave', grave: 'grave', carrion: 'grave', deathly: 'grave',
      abyssal: 'fiendish', infernal: 'fiendish', hellish: 'fiendish', demonic: 'fiendish', diabolic: 'fiendish',
      seraphic: 'celestial', hallowed: 'celestial', divine: 'celestial', angelic: 'celestial',
    };
    const TYPE_FACET = { Undead: 'grave', Fiend: 'fiendish', Celestial: 'celestial' };
    const own = new Set([TYPE_FACET[j.type], ...(skeleton.themes ?? [])].filter(Boolean));
    for (const list of Object.values(sections)) {
      for (const e of list) {
        const bad = Object.entries(NAME_LEXICON).find(([tok, facet]) => !own.has(facet)
          && new RegExp(`\\b${tok}`, 'i').test(e.name));
        if (bad) {
          const origin = [...skeleton.entries, ...skeleton.traits].find((k) => byId.get(k.id)?.name?.trim() === e.name.replace(/\s*\(.*\)$/, ''));
          if (origin) e.name = origin.name + (e.name.match(/\s*\(.*\)$/)?.[0] ?? '');
        }
      }
    }
  }

  // 1. Name collisions: the model may hand two entries the same name (live:
  //    "Ruin-Fed Bite" beside a second attack still called "Bite" — and worse,
  //    two entries literally sharing one name). Later entries revert to their
  //    placeholder, which pick-time guards already made unique.
  {
    const taken = new Set();
    for (const [sec, list] of Object.entries(sections)) {
      list.forEach((e, i) => {
        if (taken.has(e.name)) {
          const fallback = sec === 'Traits'
            ? skeleton.traits.find((t) => !taken.has(t.name))?.name
            : skeleton.entries.find((k) => !taken.has(k.name))?.name;
          e.name = fallback ?? `${e.name} II`;
        }
        taken.add(e.name);
      });
    }
  }

  // 2. Spell references: an entry saying "casts *Invisibility*" needs that
  //    spell to exist on the block's spell list, or a reader goes hunting for
  //    it (live: Cloaked Lunge cast a spell the list didn't carry). Append
  //    missing ones to the at-will line.
  {
    const all = Object.values(sections).flat();
    const casterEntry = all.find((e) => /At Will:|spellcasting ability/.test(e.text));
    if (casterEntry) {
      const referenced = new Set();
      for (const e of all) {
        if (e === casterEntry) continue;
        // Only list-routed casts need the list: "uses Spellcasting to cast
        // *X*". An entry casting its own spell inline (a reaction Shield)
        // is self-contained and must NOT be appended to the action list.
        for (const m of e.text.matchAll(/uses (?:its )?[\w ]*Spellcasting to cast \*([A-Z][\w' ]+?)\*/g)) {
          referenced.add(m[1]);
        }
      }
      for (const spell of referenced) {
        if (!casterEntry.text.includes(`*${spell}*`)) {
          casterEntry.text = casterEntry.text.replace(/(\*\*At Will:\*\*)([^\n]*)/,
            (m0, head, rest) => `${head}${rest.trim() ? `${rest},` : ' '} *${spell}*`);
        }
      }
    }
  }

  // 3. The 1/Day line: drop it when unfilled, and drop any spell already on
  //    the at-will list — "1/Day" duplicating an at-will spell is the live
  //    generator mistake both reviewers flagged.
  for (const list of Object.values(sections)) {
    for (const e of list) {
      const atWill = (e.text.match(/\*\*At Will:\*\*([^\n]*)/) ?? [])[1] ?? '';
      e.text = e.text.replace(/\n?- \*\*1\/Day(?: Each)?:\*\*([^\n]*)/g, (m0, listPart) => {
        const spells = listPart.split(',').map((x) => x.trim()).filter(Boolean)
          .filter((x) => !atWill.includes(x));
        return spells.length ? `\n- **1/Day Each:** ${spells.join(', ')}` : '';
      });
      // Reaction/Bonus Action spells do nothing in an action-cast list —
      // strip them unless some other entry explicitly casts them (a
      // legendary "casts *Misty Step*" keeps it listed and functional).
      const referenced = Object.values(sections).flat()
        .filter((x) => x !== e)
        .flatMap((x) => [...x.text.matchAll(/uses (?:its )?[\w ]*Spellcasting to cast \*([A-Z][\w' ]+?)\*/g)]
          .map((mm) => mm[1]));
      for (const sp of NON_ACTION_SPELLS) {
        if (referenced.includes(sp)) continue;
        e.text = e.text.replace(new RegExp(`\\*${sp}\\*,\\s*`, 'g'), '')
          .replace(new RegExp(`,\\s*\\*${sp}\\*`, 'g'), '')
          .replace(new RegExp(`\\*${sp}\\*`, 'g'), '');
      }
      // Off-list spells never ship (see KNOWN_SPELLS above): keep only
      // vetted names in the tier lines, preserving their upcast notation.
      e.text = e.text.replace(/(- \*\*(?:At Will|\d+\/Day(?: Each)?):\*\*)([^\n]*)/g, (m0, head, rest) => {
        const kept = [...rest.matchAll(/\*([A-Z][\w' -]+?)\*( \(level \d+ version\))?/g)]
          // a spell another entry casts THROUGH this list stays listed even
          // if the tables can't tier it — stripping it re-strands the echo
          .filter((mm) => KNOWN_SPELLS.has(mm[1]) || referenced.includes(mm[1]))
          .map((mm) => `*${mm[1]}*${mm[2] ?? ''}`);
        return kept.length ? `${head} ${kept.join(', ')}` : head;
      });
      e.text = e.text.replace(/(\*\*(?:At Will|\d+\/Day(?: Each)?):\*\*)\s*(?=\n|$)/g, '');
      // An emptied list line leaves its bare bullet behind — remove the
      // whole line, never ship an orphan dash (live: the Grave Vow's "-").
      e.text = e.text.replace(/^\s*-\s*$/gm, '');
      // A list-style caster whose every pick was dropped still casts
      // SOMETHING: Detect Magic is on printed at-will lists at every band.
      if (/casts one of the following/.test(e.text) && !/\*\*(?:At Will|\d+\/Day)/.test(e.text)) {
        e.text += '\n\n- **At Will:** *Detect Magic*';
      }
      // Article agreement for vowel-initial kindred types ("isn't a Undead"
      // shipped live). A finite list, not a vowel rule — "a Unicorn" is
      // correct English and would break under the naive heuristic.
      e.text = e.text.replace(/\ba (Undead|Elemental|Aberration|Ooze)\b/g, 'an $1');
      // Same-type damage pools merge (the belt under the dual-energy
      // contract): "16 (3d10) Fire plus 11 (2d10) Fire" is one printed pool
      // — 27 (5d10) Fire (live: the Brimstone Warden's death blast).
      e.text = e.text.replace(
        /\d+ \((\d+)d(\d+)\) (\w+) damage plus \d+ \((\d+)d(\d+)\) \3 damage/g,
        (m0, n1, d1, type, n2, d2) => {
          if (d1 !== d2) return m0;
          const n = Number(n1) + Number(n2);
          return `${Math.floor((n * (Number(d1) + 1)) / 2)} (${n}d${d1}) ${type} damage`;
        },
      );
      // Article agreement after number substitution: the printed brass line
      // carries "in an 20-foot line" (a WotC typo), which scaling turned
      // into "an 90-foot-long" (live). "an" only before 8, 11, 18-series.
      e.text = e.text.replace(/\ban (\d+)/g, (m0, n) => (/^(8|11|18)/.test(n) ? m0 : `a ${n}`));
      // "Being underwater doesn't grant Resistance" is a FIRE rule; on any
      // other damage type the clause guards against nothing (live: a Radiant
      // breath carrying the Dragon Turtle's fire rider).
      e.text = e.text.replace(/\s*\*?Failure or Success:?\*?:?\s*Being underwater doesn't grant Resistance to this (?!Fire)\w+ damage\./g, '')
        .replace(/\s*Being underwater doesn't grant Resistance to this (?!Fire)\w+ damage\./g, '');
      // "(level N version)" only means something on spells that scale.
      e.text = e.text.replace(/\*([A-Z][\w' ]+?)\* \(level \d+ version\)/g,
        (m0, sp) => (SCALING_SPELLS.includes(sp) ? m0 : `*${sp}*`));
      // Hard-control spells demote from At Will to the 1/Day list.
      {
        const atWillLine = e.text.match(/- \*\*At Will:\*\*([^\n]*)/);
        if (atWillLine) {
          const listed = [...atWillLine[1].matchAll(/\*([A-Z][\w' ]+?)\*/g)].map((m) => m[1]);
          const demoted = listed.filter((sp) => atWillBanned(sp));
          for (const sp of demoted) {
            e.text = e.text
              .replace(new RegExp(`\\*${sp}\\*,\\s*`, 'g'), '')
              .replace(new RegExp(`,\\s*\\*${sp}\\*`, 'g'), '')
              .replace(new RegExp(`(- \\*\\*At Will:\\*\\*[^\\n]*)`, ''), '$1');
            if (/1\/Day(?: Each)?:\*\*/.test(e.text)) {
              if (!e.text.includes(`*${sp}*`)) {
                e.text = e.text.replace(/(- \*\*1\/Day(?: Each)?:\*\*)([^\n]*)/,
                  (m0, head, rest) => `${head}${rest.trim() ? `${rest},` : ''} *${sp}*`);
              }
            } else {
              e.text += `\n- **1/Day:** *${sp}*`;
            }
          }
        }
      }
      // "1/Day Each" with a single spell is print for two or more only.
      e.text = e.text.replace(/1\/Day Each:(\*\*[^\n,]*)$/gm, '1/Day:$1')
        .replace(/- \*\*1\/Day Each:\*\* ([^,\n]+)$/gm, '- **1/Day:** $1');
      e.text = e.text.replace(/\n{3,}/g, '\n\n').trim();
    }
  }

  // Multiattack is ENGINE text: regenerate it last, from the final rendered
  // names, instead of writing default names at build time and chasing them
  // through swaps and renames (live: "a use of Lightning Blade" pointing at
  // an attack the model had renamed Folded Aperture — the build-time clause
  // survived a swap that the rename pass keyed past). One source of truth,
  // computed after every pass that can change a name has run.
  {
    const multi = skeleton.entries.find((e) => e.slot_type === 'multiattack');
    const finalAtks = skeleton.entries
      .filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack')
      .map((e) => renderedOf.get(e))
      .filter(Boolean);
    const rendered = multi && renderedOf.get(multi);
    if (rendered && finalAtks.length) {
      const n = skeleton.multiattack;
      const stripGate = (nm) => nm.replace(/\s*\(.*\)$/, '');
      rendered.text = `The ${inline} makes ${['', 'one', 'two', 'three', 'four', 'five', 'six'][n] ?? n} ${stripGate(finalAtks[0].name)} attacks.`
        + finalAtks.slice(1).map((a) => ` It can replace one attack with a use of ${stripGate(a.name)}.`).join('');
    }
  }

  // Actions order follows print: Multiattack, then attacks, then everything
  // else (Recharge included), Spellcasting LAST — 47 of 48 printed
  // Spellcasting actions sit at the end of Actions, and all 21 that share a
  // block with a Recharge entry come after it (the dragons' universal
  // layout). Stable within ranks, so pick order still decides ties.
  if (sections.Actions) {
    const rank = (e) => (e.name === 'Multiattack' ? 0
      : /Attack Roll:\*?/.test(e.text) ? 1
        : /casts one of the following/.test(e.text) ? 3 : 2);
    sections.Actions = sections.Actions
      .map((e, i) => [rank(e), i, e])
      .sort((a, b) => a[0] - b[0] || a[1] - b[1])
      .map(([, , e]) => e);
  }

  const nameOrigins = {};
  for (const list of Object.values(sections)) {
    for (const e of list) {
      const origin = skeleton.entries.find((k) => byId.get(k.id)?.name?.trim() === e.name.replace(/\s*\(.*\)$/, ''))
        ?? skeleton.traits.find((k) => byId.get(k.id)?.name?.trim() === e.name.replace(/\s*\(.*\)$/, ''));
      if (origin && origin.name !== e.name) nameOrigins[e.name] = origin.name;
    }
  }

  return {
    name: creatureName,
    name_origins: nameOrigins,
    size: j.size || skeleton.size,
    type: j.type,
    alignment: j.alignment,
    speed: j.speed,
    stats: stampStats(j.stats ?? {}, skeleton, {
      hasSpellcasting: skeleton.entries.some((e) => /\{spells\}/.test(e.text) || /spellcasting ability/.test(e.text)),
    }),
    senses_special: typeof j.senses_special === 'string' ? j.senses_special : undefined,
    save_proficiencies: Array.isArray(j.save_proficiencies) ? j.save_proficiencies : [],
    skill_proficiencies: Array.isArray(j.skill_proficiencies) ? j.skill_proficiencies : [],
    languages: j.languages,
    resistances: j.resistances,
    immunities: j.immunities,
    vulnerabilities: j.vulnerabilities,
    sections,
  };
}

/** A chassis-shaped view of the skeleton, so assembleMonster can be reused. */
export function chassisFromSkeleton(skeleton) {
  return {
    ac: skeleton.ac,
    hp: skeleton.hp,
    pb: skeleton.pb,
    attack_bonus: skeleton.attack_bonus,
    save_dc: skeleton.save_dc,
  };
}

/**
 * A slot plan describing what the skeleton ACTUALLY built.
 *
 * The lint's `counts` rule validates entry counts against a plan. Handing it
 * `slotPlanFor` — the old chassis's plan — makes it reject every skeleton
 * block, because the two disagree about what a creature at this CR should
 * look like by construction. Cross-referencing the skeleton's own counts is
 * the point: the check becomes "did assembly ship what was planned", which
 * is a real invariant, instead of "does this match a different planner".
 */
export function planFromSkeleton(skeleton) {
  const inSection = (s) => skeleton.entries.filter((e) => e.section === s).length;
  const actions = inSection('Actions');
  const legendaryCount = inSection('Legendary Actions');
  return {
    cr: skeleton.cr,
    tier: `skeleton_${skeleton.cr}`,
    archetype: null,
    traits: [skeleton.traits.length, skeleton.traits.length],
    actions: [actions, actions],
    multiattack: skeleton.multiattack > 1
      ? { status: 'required', count: [skeleton.multiattack, skeleton.multiattack] }
      : { status: 'optional', count: [1, 1] },
    bonus_action: { status: inSection('Bonus Actions') ? 'required' : 'optional' },
    reaction: { status: inSection('Reactions') ? 'required' : 'optional' },
    legendary: { status: legendaryCount ? 'required' : 'optional', count: [legendaryCount, legendaryCount] },
    required_slots: [],
  };
}

/**
 * Pin the attacking ability score so its modifier EXACTLY equals the flat
 * damage bonus the skeleton already baked into the dice.
 *
 * The grognard contract is that an attack's flat damage bonus is the modifier
 * of the ability that made the attack roll. The skeleton computes that bonus
 * as attack_bonus - PB before any stats exist, so a model handing back a
 * higher score breaks the identity: at CR 5 the dice carry +4 while STR 20
 * reads +5, and attack-mod-coherence rejects it. assembleMonster only ever
 * RAISES a stat (official blocks undershoot the ceiling but never exceed it),
 * so the fix belongs here, before assembly.
 */
export function stampStats(stats, skeleton, { hasSpellcasting = false } = {}) {
  const out = { ...stats };
  const requiredMod = skeleton.attack_bonus - skeleton.pb;
  // The striker is the ENGINE's call, decided from size and attack mode when
  // the skeleton was built (skeleton.strike_stat): STR backs 72% of printed
  // melee and 100% at Huge/Gargantuan; DEX backs small and ranged bodies. The
  // previous version pinned whatever stat the model ranked highest, which
  // shipped a Huge dragon biting with CHA 26 over STR 18 — an inversion no
  // printed dragon exhibits.
  const attacker = skeleton.strike_stat ?? 'STR';
  out[attacker] = Math.min(30, Math.max(1, requiredMod * 2 + 10));

  // The casting stat is pinned SEPARATELY so 8 + PB + mod equals the table's
  // save DC exactly — one DC per block, never a spell DC drifting one point
  // off the engine's (live: spell save DC 22 against DC 21 everywhere else).
  // The model's highest mental stat keeps the ROLE; the engine sets the value.
  // cast_mod never exceeds requiredMod at any CR in the table, so the striker
  // stays on top and attackStatFor cannot flip downstream.
  if (hasSpellcasting) {
    // The stat the TEMPLATES name ({cast_stat}, engine-picked at build time)
    // is the one that gets pinned — text and math can never disagree.
    const byWord = { Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' };
    const castStat = byWord[skeleton.cast_stat] ?? 'CHA';
    if (castStat !== attacker) {
      out[castStat] = Math.min(30, Math.max(1, (skeleton.cast_mod ?? 0) * 2 + 10));
    }
  } else {
    // Non-casters key the block DC off CON (the printed breath/aura
    // convention), so CON gets the same coherence pin the cast stat gets:
    // 8 + PB + CON mod equals every DC on the sheet (live: four blocks in a
    // row whose DC 21 matched nothing).
    out.CON = Math.min(30, Math.max(1, (skeleton.cast_mod ?? 0) * 2 + 10));
  }

  for (const k of ['STR', 'DEX', 'INT', 'WIS', 'CHA']) {
    if (k !== attacker && (out[k] ?? 10) > out[attacker]) out[k] = out[attacker] - 1;
  }
  return out;
}
