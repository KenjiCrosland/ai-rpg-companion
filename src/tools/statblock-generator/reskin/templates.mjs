/**
 * THE TEMPLATE SIGNATURE (owner design, 2026-09-21: "create, tag, try to
 * fit, ship the fit or the seed, log the miss, author from print").
 *
 * The free-text wildcard wrote rules in prose and a chain of vets guessed
 * at how prose goes wrong; every new phrasing leaked. Here rules text is
 * never free. Two calls:
 *   IDEA — plain words: what the ability does, when, to whom, its limit,
 *          plus a tag (section / trigger / effect). Sees no templates, so
 *          the shelf cannot shrink the idea.
 *   FIT  — the idea plus the templates legal for this line, CR, and
 *          section, minus what the sheet owns. Picks one (or "none"),
 *          quotes the idea words it carries, names it, fills the FLAVOR
 *          slots. The engine fills every number and every closed-
 *          vocabulary slot, renders the frame, and checks the result IS
 *          the frame. A miss is logged with the idea and its tag — that
 *          log is the template backlog, authored from print.
 *
 * The catalog is the union of shapes.mjs (frames per CR band) and the
 * library seeds (one text each). Both are authored against print.
 */
import { SHAPES, bandFor } from './shapes.mjs';
import { LIBRARY_SEEDS, drawLibraryRow } from './library.mjs';
import { saveDamageDiceFor } from '../format-2024/dice.mjs';

export const SECTION_OF = { trait: 'Traits', action: 'Actions', bonus_action: 'Bonus Actions', reaction: 'Reactions', rider: 'Rider' }; // Rider = a clause appended to the melee attack row
export const TRIGGERS = ['on_hit', 'save', 'on_being_hit', 'start_of_turn', 'once_per_fight', 'always'];
export const EFFECTS = ['damage', 'condition', 'movement', 'resource', 'defense'];
const SAVE_STATS = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
const CONDITIONS = ['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned'];
const MINOR = ['Prone', 'Poisoned', 'Deafened', 'Frightened'];
const RESTRAINTS = ['Grappled', 'Restrained'];
const DAMAGE = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];
const PHYSICAL = ['Bludgeoning', 'Piercing', 'Slashing'];

// closed-vocabulary slots: the model may propose, the engine only accepts a listed value
const VOCAB = { save_stat: SAVE_STATS, consumed_condition: CONDITIONS, condition_minor: MINOR, restraint: RESTRAINTS, r_vuln: DAMAGE };
// flavor slots: the model's words, bounded (no digits, no rules grammar, short)
export const FLAVOR_SLOTS = ['projectile', 'wound_noun', 'zone_effect', 'zone_rule', 'disguise', 'shell', 'telegraph', 'lure_source', 'hook'];
// engine slots: never the model's
const ENGINE_SLOTS = ['dc', 'atk', 'avg', 'dice', 'avg_half', 'dice_half', 'damage_type', 'melee_name'];

// the shapes' tags (section comes from `replaces`); melee-rider / ranged
// replacements weld INTO an existing row and are not a standalone template
const SHAPE_TAGS = {
  trample: ['save', 'damage'], leap: ['save', 'damage'], 'thrown-burst': ['save', 'damage'],
  'gaze-single': ['save', 'condition'], snare: ['save', 'condition'], reel: ['save', 'movement'],
  'condition-payoff': ['save', 'damage'], rampage: ['once_per_fight', 'damage'], blink: ['always', 'movement'],
  zone: ['once_per_fight', 'condition'], execute: ['save', 'damage'], 'death-burst': ['always', 'damage'],
  'burrow-ambush': ['save', 'damage'], affliction: ['on_hit', 'condition'], charge: ['on_hit', 'damage'], lure: ['save', 'condition'], 'hook-drag': ['save', 'movement'], 'heated-body': ['on_being_hit', 'damage'], 'false-appearance': ['always', 'defense'], 'bloodied-burst': ['on_being_hit', 'damage'], 'shell-withdraw': ['always', 'defense'], 'resonant-body': ['on_being_hit', 'damage'], 'throw-retrieve': ['always', 'damage'], seal: ['save', 'condition'], adhesive: ['always', 'condition'], absorption: ['on_being_hit', 'defense'],
};
// ENGINE FAMILIES: a template that re-implements an engine the sheet already
// carries is off the menu by construction (iron maiden x4: hook-drag beside
// Cage, 2026-09-21). Sheet engines are read from the rows themselves.
// A template is OFF THE MENU when the sheet carries an engine it would double
// (containment beside a Cage) — or, THE DIRECTION RULE (critic, 2026-09-22): an
// engine it would work AGAINST. A grappler, swallower, or cage needs the victim
// adjacent; a repeller (Frightened, a push) sends it away. Holders stay.
const EXCLUDE_ON = {
  charge: ['charge-rider'],
  'hook-drag': ['containment'], 'obstacle-pull': ['containment'], reel: ['containment'], snare: ['containment'],
  'false-appearance': ['disguise'], adhesive: ['adhesive'], 'heated-body': ['contact-damage'], 'resonant-body': ['contact-damage'],
  // repellers, off every containment seat
  'escalating-dread': ['containment'], 'terror-pulse': ['containment'], 'push-prone': ['containment'], 'gaze-single': ['containment'],
};
export function sheetEngines(sections = {}) {
  const rows = Object.values(sections).flat();
  const out = new Set();
  for (const e of rows) {
    // containment = the ENGULF engine or a Reel row — a plain grapple-on-hit rider
    // is not (the phantom's touch grapples, and that excluded the pull the
    // keeper's own concept names: goldens 2026-09-21)
    if (e.engulf_engine || /pulls each creature Grappled by it/.test(e.text ?? '')) out.add('containment');
    if (/indistinguishable from|resemble an? (?:\w+ ){0,3}object|shape-shifts? to resemble/i.test(e.text ?? '')) out.add('disguise'); // the trap line's own False Form (two disguise traits on one gargoyle)
    if (e.engine) out.add(e.engine);
    if (/moved (?:at least )?\d+\+? feet straight toward/i.test(e.text ?? '')) out.add('charge-rider');
    if (/adheres to anything that touches/i.test(e.text ?? '')) out.add('adhesive');
    if (/hits it with a melee attack while within 5 feet of it takes/i.test(e.text ?? '')) out.add('contact-damage');
  }
  return out;
}
/**
 * COVERED ELEMENTS, derived from the sheet (2026-09-21): a signature element
 * that shares a word-stem with a chassis MECHANIC row (a gated nova, a rules
 * trait, an engine, a save-framed action) is already built — the idea call
 * must not build it again (the bull re-described its own charge 5/5). Plain
 * attack rows are not mechanics; their names are fiction.
 */
export function coveredBySheet(sections = {}) {
  const rows = Object.values(sections).flat().filter((e) => e.gate || e.rules || e.engine || e.engulf_engine || /\(Recharge [\d–-]+\)|\(\d\/Day\)/.test(e.name ?? '') || /Saving Throw\*?:/.test(e.text ?? ''));
  const stems = new Set();
  for (const e of rows) {
    for (const w of String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase().split(/[^a-z]+/)) {
      if (w.length >= 4 && !['attack', 'melee', 'ranged', 'action', 'slot', 'signature', 'legendary', 'creature'].includes(w)) stems.add(w.slice(0, 5));
    }
  }
  // a mechanic that lives INSIDE an attack row as a print rider idiom (the
  // charger's "moved at least 20 feet straight toward") has no row name to
  // stem — the idiom names its family
  const RIDER_FAMILIES = [
    [/moved (?:at least )?\d+\+? feet straight toward/i, ['charg', 'rush', 'stamp', 'ram', 'gallop'], 'the charge rider'],
    [/hits with this attack.{0,80}Grappled condition/i, ['grapp', 'seiz', 'hold', 'clutch'], 'the grapple rider'],
  ];
  const names = rows.map((e) => e.name);
  for (const e of Object.values(sections).flat()) {
    for (const [re, fam, label] of RIDER_FAMILIES) if (re.test(e.text ?? '')) { fam.forEach((x) => stems.add(x)); if (!names.includes(`${e.name} (${label})`)) names.push(`${e.name} (${label})`); }
  }
  return { names, regex: stems.size ? new RegExp(`\\b(?:${[...stems].join('|')})`, 'i') : null };
}

// THE VERB (critic, blind read 2026-09-21: "make B's template selection do
// what A's authoring does: read the concept's verb and pick the pattern that
// expresses it"). Every template carries verb keys; the fit menu is RANKED by
// overlap with the concept + idea and the matches are named to the model.
const SHAPE_KEYS = {
  trample: ['trample', 'charge', 'rush', 'stampede'], leap: ['leap', 'pounce', 'drop', 'jump'], 'thrown-burst': ['hurl', 'throw', 'lob', 'burst'],
  'gaze-single': ['gaze', 'stare', 'glare', 'eye'], snare: ['snare', 'web', 'bind', 'net', 'tangle'], reel: ['reel', 'pull', 'drag', 'haul'],
  'condition-payoff': ['exploit', 'punish', 'finish', 'helpless'], rampage: ['rampage', 'frenzy', 'bloodied'], blink: ['blink', 'teleport', 'vanish', 'flicker'],
  zone: ['fog', 'cloud', 'field', 'zone', 'murk'], execute: ['execute', 'finish', 'slay'], 'death-burst': ['explode', 'burst', 'die', 'death'],
  'burrow-ambush': ['erupt', 'burrow', 'ambush'], 'heated-body': ['heat', 'burn', 'scald', 'sear', 'molten', 'touch'], 'false-appearance': ['disguise', 'motionless', 'statue', 'mimic', 'still'],
  absorption: ['absorb', 'drink', 'feed', 'immune'], 'bloodied-burst': ['toll', 'ring', 'peal', 'bloodied', 'wounded', 'crack'], 'shell-withdraw': ['withdraw', 'shell', 'retreat', 'curl'],
};
// conservative stemming ("lures" -> "lure", "dragging" -> "dragg" ~ "drag" by prefix)
// THE KEYS PASS (2026-09-21): every verb a CONCEPT might use for the shape —
// nouns of the fiction too, because users write "a bell" not "it tolls".
// Seeds' own keys merge in; this map wins on overlap.
export const VERB_KEYS = {
  trample: ['trample', 'charge', 'rush', 'stampede', 'barrel', 'thunder', 'overrun', 'run down', 'ram'],
  leap: ['leap', 'pounce', 'drop', 'jump', 'spring', 'crash down', 'land on', 'plunge', 'dive', 'fall on', 'perch'],
  'thrown-burst': ['hurl', 'throw', 'lob', 'burst', 'boulder', 'bomb', 'toss', 'fling', 'sling', 'volley', 'shatter'],
  'gaze-single': ['gaze', 'stare', 'glare', 'eye', 'look', 'behold', 'petrify', 'transfix', 'eyes', 'sight'],
  snare: ['snare', 'web', 'bind', 'net', 'tangle', 'silk', 'strand', 'thread', 'entangle', 'rope', 'lasso', 'wrap', 'cocoon', 'chain'],
  reel: ['reel', 'pull', 'drag', 'haul', 'yank', 'tow', 'wrench', 'draw in', 'hook', 'line', 'tongue'],
  'condition-payoff': ['exploit', 'punish', 'finish', 'helpless', 'prone', 'fallen', 'trapped', 'caught', 'grind', 'crush'], // "downed" stemmed to "down" and matched every "down"
  affliction: ['wound', 'bleed', 'fester', 'gash', 'lingering', 'sludge', 'venom', 'poison', 'rot', 'infect', 'alchemical', 'lasting', 'scar', 'sepsis'],
  charge: ['charge', 'gore', 'momentum', 'straight line', 'ram', 'lance', 'joust', 'impale', 'run down', 'spur', 'gallop'],
  rampage: ['rampage', 'frenzy', 'bloodied', 'berserk', 'rage', 'fury', 'blood', 'wound', 'savage'],
  blink: ['blink', 'teleport', 'vanish', 'flicker', 'phase', 'step through', 'shadow', 'shimmer', 'wink', 'disappear'],
  zone: ['fog', 'cloud', 'field', 'zone', 'murk', 'mist', 'smoke', 'haze', 'aura', 'miasma', 'spores', 'steam', 'darkness'],
  execute: ['execute', 'finish', 'slay', 'kill', 'behead', 'sever', 'end', 'reap', 'harvest', 'death'],
  'heated-body': ['heat', 'burn', 'scald', 'sear', 'molten', 'touch', 'furnace', 'fire', 'flame', 'ember', 'brass', 'iron', 'glow', 'hot', 'spines', 'thorns', 'barbs', 'spikes', 'lightning', 'storm', 'shock', 'splinter', 'shard', 'jagged', 'thundercloud', 'acid', 'frost', 'rime'], // the wide run: a thundercloud body, a shipwreck body, a bone-splinter body all wanted this shape with another type
  'false-appearance': ['disguise', 'motionless', 'statue', 'mimic', 'still', 'stone', 'object', 'pretend', 'pose', 'perch', 'harmless', 'ordinary', 'hidden', 'blend'],
  absorption: ['absorb', 'drink', 'feed', 'immune', 'devour', 'eat', 'soak', 'siphon', 'heal', 'mend', 'stronger', 'feeds on'],
  'bloodied-burst': ['toll', 'ring', 'peal', 'bloodied', 'wounded', 'crack', 'bell', 'burst', 'erupt', 'shatter', 'scream', 'wail', 'when hurt', 'when struck'],
  'shell-withdraw': ['withdraw', 'shell', 'retreat', 'curl', 'armor', 'carapace', 'hide inside', 'close', 'seal itself', 'turtle', 'crab', 'bell'],
  'death-burst': ['explode', 'burst', 'die', 'death', 'detonate', 'final', 'last breath', 'shatter', 'dying'],
  'burrow-ambush': ['erupt', 'burrow', 'ambush', 'tunnel', 'beneath', 'underground', 'sand', 'earth', 'surface', 'rise from'],
  'resonant-body': ['ring', 'toll', 'clang', 'resonate', 'bell', 'chime', 'hum', 'gong', 'thunder', 'bronze', 'peal', 'echo', 'deafen', 'struck'],
  'throw-retrieve': ['hurl', 'throw', 'lance', 'spear', 'axe', 'retrieve', 'recover', 'fetch', 'javelin', 'harpoon', 'anchor', 'hammer', 'thrown weapon'],
  seal: ['seal', 'wax', 'cauterize', 'stopper', 'close the wound', 'no healing', 'wither', 'cannot heal', 'curse', 'psalm', 'sermon', 'brand'],
  adhesive: ['stick', 'sticky', 'tar', 'glue', 'adhere', 'cling', 'gum', 'pitch', 'resin', 'slime', 'sap', 'grip', 'held fast', 'stuck'],
  'aggro-curse': ['mark', 'taunt', 'oath', 'challenge', 'goad', 'provoke', 'duel', 'single out', 'chosen', 'brand', 'sworn'], // "bless" is rally's — a mark is not a blessing (the bishop, v4 read)
  'obstacle-pull': ['pull', 'yank', 'reel', 'beckon', 'drag', 'draw', 'summon closer', 'tug', 'haul', 'tether', 'chain', 'tongue', 'tide', 'undertow'],
  lure: ['lure', 'beguile', 'song', 'call', 'beckon', 'lamp', 'light', 'invite', 'follow', 'entice', 'draw', 'tempt', 'siren', 'lantern', 'glow', 'whisper', 'hymn'],
  pacify: ['pacify', 'transfix', 'hold', 'stillness', 'trance', 'freeze', 'root', 'stun', 'mesmerize', 'stare', 'calm', 'lull', 'stop'],
  'escalating-dread': ['dread', 'fear', 'wither', 'doom', 'terror', 'horror', 'haunt', 'nightmare', 'despair', 'grief'],
  'terror-pulse': ['terror', 'roar', 'shriek', 'presence', 'howl', 'scream', 'bellow', 'wail', 'fright', 'scatter', 'panic'],
  'snare-bolt': ['snare', 'web', 'bind', 'tangle', 'net', 'bolt', 'spit', 'tar', 'silk', 'root', 'vine', 'restrain', 'entangle'],
  'slow-bolt': ['slow', 'chill', 'mire', 'leaden', 'numb', 'freeze', 'cold', 'brine', 'weigh', 'bog', 'mud', 'sluggish', 'frost'],
  'sensory-strike': ['blind', 'dazzle', 'flash', 'deafen', 'glare', 'light', 'spit', 'ink', 'sand', 'dust', 'clang', 'scream', 'toll', 'ring', 'bell', 'peal', 'chime'], // a bell's ACTION seat: the Deafened row (the crab's Dread Toll had no Thunder and no Deafened)
  disarm: ['disarm', 'twist', 'strip', 'weapon', 'snatch', 'steal', 'pluck', 'wrench', 'knock away', 'take'],
  'push-prone': ['shove', 'topple', 'slam', 'bowl', 'knock', 'push', 'fling', 'throw down', 'trip', 'batter', 'bull', 'ram', 'sweep'],
  herd: ['herd', 'drive', 'command', 'stampede', 'scatter', 'chase', 'flush', 'corral', 'compel', 'sermon', 'order', 'call'],
  'hook-drag': ['hook', 'chain', 'harpoon', 'drag', 'grapple', 'reel', 'pull', 'haul', 'line', 'tether', 'anchor', 'claw', 'tongue', 'into the surf', 'under'],
  'thrown-burst-seed': ['hurl', 'bomb', 'burst', 'volley', 'throw', 'lob', 'toss', 'shatter', 'explode', 'grenade', 'flask'],
  drain: ['drain', 'leech', 'feed', 'siphon', 'suck', 'drink', 'sap', 'wither', 'devour', 'life', 'vampire', 'hunger'],
  'delayed-brand': ['brand', 'ember', 'fuse', 'venom', 'poison', 'infect', 'rot', 'fester', 'curse', 'mark', 'smolder', 'seed'],
  'curse-debt': ['curse', 'debt', 'rebuke', 'price', 'hex', 'oath', 'bargain', 'owe', 'judgment', 'tithe', 'toll', 'sin'],
  'own-turn-punisher': ['punish', 'sting', 'answer', 'reprisal', 'retaliate', 'strike back', 'avenge', 'counter', 'spite', 'lash'],
  'zone-seed': ['fog', 'murk', 'cloud', 'field', 'mist', 'smoke', 'haze', 'spores', 'steam', 'darkness', 'shroud'],
  reveal: ['reveal', 'light', 'outline', 'expose', 'illuminate', 'lamp', 'lantern', 'faerie fire', 'glow', 'mark', 'shine'],
  rally: ['rally', 'bolster', 'ward', 'blessing', 'bless', 'shield', 'protect', 'inspire', 'hymn', 'prayer', 'heal', 'mend', 'flock'],
  focus: ['focus', 'aim', 'stalk', 'poise', 'sight', 'lock on', 'hunt', 'track', 'study', 'patience'],
  'feint-slip': ['feint', 'slip', 'blur', 'weave', 'dodge', 'dart', 'sidestep', 'evade', 'dance', 'trick'],
  'summon-lite': ['summon', 'call', 'servitor', 'raise', 'spawn', 'split', 'shed', 'bud', 'minion', 'swarm', 'birth', 'conjure'],
  'wind-up': ['gather', 'charge-up', 'telegraph', 'brew', 'build', 'swell', 'ratchet', 'wind', 'coil', 'inhale', 'gathering', 'storm'],
  coating: ['coat', 'venom', 'anoint', 'charge-weapon', 'poison', 'oil', 'ignite', 'bless the blade', 'dip', 'smear', 'envenom'],
  exploiter: ['exploit', 'opportunist', 'predator', 'finish', 'prone', 'grappled', 'helpless', 'downed', 'trapped', 'held', 'pinned', 'caught', 'inside', 'caged'],
  'blighted-ground': ['blight', 'scorch', 'corrupt', 'floor', 'ground', 'earth', 'soil', 'rot', 'poison the land', 'wither', 'salt', 'ash', 'slick', 'ooze'],
  'phase-slip': ['slip', 'phase', 'blink', 'vanish', 'teleport', 'step', 'shadow', 'flicker', 'fade', 'through walls'],
};
const stem = (w) => w.toLowerCase().replace(/(?<=[sxz]|ch|sh)es$/, '').replace(/(?<!s)s$/, '').replace(/ing$/, '').replace(/(?<=[a-z]{3})ed$/, '');
// prefix match covers INFLECTION only ("dragg"/"drag"), never a compound: "night"
// bound the bishop to "nightmare" (goldens 2026-09-21)
const sameStem = (a, b) => a === b || (Math.min(a.length, b.length) >= 4 && Math.abs(a.length - b.length) <= 2 && (a.startsWith(b) || b.startsWith(a)));
const wordsOf = (t) => [...new Set(String(t ?? '').toLowerCase().split(/[^a-z]+/).filter((w) => w.length >= 3).map(stem))]; // hyphens split: "tar-mouthed" carries "tar"
/**
 * Rank a menu by verb overlap. THE CONCEPT'S verbs (the user's words + the
 * seat element) outrank the IDEA's (the model's prose): the v2 blind read
 * sent the lure to a charging knight because the idea text said "drawn to
 * follow". Returns [{ t, concept: [...], idea: [...] }], best first, stable.
 */
export function rankByVerb(menu, conceptText, ideaText = '') {
  const c = wordsOf(conceptText); const d = wordsOf(ideaText);
  const hit = (t, words, raw) => (t.keys ?? []).filter((k) => (k.includes(' ') ? String(raw ?? '').toLowerCase().includes(k) : words.some((w) => sameStem(w, stem(k)))));
  return menu.map((t, i) => { const concept = hit(t, c, conceptText); const idea = hit(t, d, ideaText).filter((k) => !concept.includes(k)); return { t, i, concept, idea, matched: [...concept, ...idea], score: concept.length * 2 + idea.length }; })
    .sort((a, b) => b.score - a.score || a.i - b.i);
}

const SECTION_BY_REPLACES = { signature: 'action', nova: 'action', 'bonus-alt': 'bonus_action', trait: 'trait', 'melee-rider': 'rider' };

const slotsOf = (text) => [...new Set([...String(text).matchAll(/\{([a-z_]+)\}/g)].map((m) => m[1]))];

/** The unified catalog. */
export const TEMPLATES = [
  ...SHAPES.filter((s) => SECTION_BY_REPLACES[s.replaces] && SHAPE_TAGS[s.id]).map((s) => ({
    id: s.id, name: s.name, kind: 'shape', cite: s.cite,
    section: SECTION_BY_REPLACES[s.replaces], roles: s.roles, styles: s.styles, cr_range: s.cr_range,
    gate: s.gate ?? null, nova: s.replaces === 'nova', requires_movement: s.requires_movement ?? null, supersedes: s.supersedes ?? null,
    trigger: SHAPE_TAGS[s.id][0], effect: SHAPE_TAGS[s.id][1],
    keys: [...new Set([...(VERB_KEYS[s.id] ?? []), ...(SHAPE_KEYS[s.id] ?? [])])],
    frames: s.frames, flavor: Object.values(s.frames).flatMap(slotsOf).filter((x) => FLAVOR_SLOTS.includes(x)),
  })),
  // a seed whose key collides with a shape id (zone, thrown-burst) is namespaced
  // — one id, one template; the seed keeps its key for the library renderer
  ...LIBRARY_SEEDS.filter((seed) => !seed.retired).map((seed) => ({
    id: SHAPES.some((sh) => sh.id === seed.key) ? `${seed.key}-seed` : seed.key, key: seed.key, name: seed.name.replace(/ \((?:Recharge [\d–-]+|\d\/Day)\)$/, ''), kind: 'seed',
    section: Object.entries(SECTION_OF).find(([, v]) => v === seed.section)?.[0] ?? 'action',
    roles: seed.archetypes, styles: [], cr_range: [seed.minCr ?? 0, 30],
    gate: / \((Recharge [\d–-]+|\d\/Day)\)$/.exec(seed.name)?.[1] ?? null, nova: !!seed.nova, requires_movement: null,
    trigger: /When (?:the creature|it) hits\b/i.test(seed.text) ? 'on_hit'
      : /\*Trigger:\*|hits the creature|is hit by|takes damage/i.test(seed.text) ? 'on_being_hit'
      : /at the start of each of (?:its|the creature's) turns/i.test(seed.text) ? 'start_of_turn' // the recurring idiom; "until the start of its next turn" is a duration
      : /Saving Throw/.test(seed.text) ? 'save' : 'always',
    effect: /condition/.test(seed.text) ? 'condition' : /damage/.test(seed.text) ? 'damage' : 'movement',
    text: seed.text, keys: [...new Set([seed.key, ...(seed.keys ?? []), ...(VERB_KEYS[SHAPES.some((sh) => sh.id === seed.key) ? `${seed.key}-seed` : seed.key] ?? [])])], flavor: slotsOf(seed.text).filter((x) => FLAVOR_SLOTS.includes(x)),
  })),
];
const BY_ID = new Map(TEMPLATES.map((t) => [t.id, t]));

const BODY_ROLES = { dragon: ['brute', 'artillery', 'controller'], ooze: ['brute', 'lurker'], swarm: ['skirmisher', 'lurker'] }; // body lines borrow the shelf of the families they play like
const rolesFor = (archetype) => (archetype === 'caster' ? ['artillery', 'controller', 'caster'] : BODY_ROLES[archetype] ?? [archetype]);

/**
 * The menu for one seat: legal for the line, the CR, the movement, the
 * section; minus templates the sheet already owns; minus a second nova.
 */
// TEMPORAL triggers are structural — a template either fires on being hit or
// it does not. The fit call was told a resembling template does not fit and
// fit one anyway (the bell hermit's wound-rung peal shipped as a telegraphed
// wind-up, 2026-09-21); the ENGINE filters by trigger now, so a near-fit is
// an honest miss and the backlog gains the template family it actually needs.
// The non-temporal triggers (save / always / once_per_fight) interchange.
const TEMPORAL = new Set(['on_hit', 'on_being_hit', 'start_of_turn']);
export function triggerCompatible(want, have) {
  if (!want) return true;
  if (TEMPORAL.has(want) || TEMPORAL.has(have)) return want === have;
  return true;
}

export function templatesFor({ archetype, style = null, cr, movement = '', sections = {}, section = null, trigger = null } = {}) {
  const band = bandFor(cr);
  const rows = Object.values(sections).flat();
  const owned = new Set(rows.map((e) => String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase()));
  const hasNova = rows.some((e) => (/^Recharge/.test(e.gate ?? '') || /\(Recharge [\d–-]+\)/.test(e.name ?? '')) && /\d+ \(\d+d\d+/.test(e.text ?? ''));
  const roles = rolesFor(archetype);
  const engines = sheetEngines(sections);
  return TEMPLATES.filter((t) => t.roles.some((r) => roles.includes(r))
    && !(EXCLUDE_ON[t.id] ?? []).some((fam) => engines.has(fam))
    && (!style || t.styles.length === 0 || t.styles.includes(style))
    && cr >= t.cr_range[0] && cr <= t.cr_range[1]
    && (t.kind !== 'shape' || t.frames[band])
    && (!t.requires_movement || new RegExp(t.requires_movement, 'i').test(movement))
    && (!section || t.section === section)
    && triggerCompatible(trigger, t.trigger)
    && !(t.nova && hasNova)
    && !owned.has(t.name.toLowerCase()));
}

/**
 * THE MISS FALLBACK draws from the same filtered menu (engine families,
 * ownership, band, nova) — the blind library hash drew a Beckoning Pull onto
 * a Roper sheet that already Reels (the bell hermit, 2026-09-21). Seeds only:
 * a shape needs the model's flavor fills, a seed renders on its own.
 */
// UTILITY seeds (no damage, no KO-tier condition — obscurement, self-buffs,
// repositioning) never stand in blind: the critic's v3 read named the
// obscurement row "the new dead row … appearing as a fallback when nothing
// else fit". They ship only when the concept's verb asks for them.
const UTILITY = new Set(['zone-seed', 'focus', 'feint-slip', 'phase-slip', 'rally', 'reveal', 'coating']);
export function fallbackMenu(ctx, verbText = '') {
  // seeds AND flavor-free shapes render blind; a shape that needs the model's
  // fiction cannot (the preacher: the bound seal shape lost the fallback to a
  // seed with a weaker verb because only seeds were eligible)
  const legal = templatesFor({ ...ctx, section: 'action', trigger: null }).filter((t) => t.section === 'action')
    .concat(templatesFor({ ...ctx, section: 'bonus_action', trigger: null }));
  // the fallback obeys the VERB too: a concept-verb seed first, then any
  // verb-matched seed, then the non-utility rest in hash order
  const ranked = rankByVerb(legal, verbText);
  const byVerb = ranked.filter((r) => r.concept.length).map((r) => r.t).concat(ranked.filter((r) => !r.concept.length && r.idea.length).map((r) => r.t));
  const rest = ranked.filter((r) => !r.matched.length && !UTILITY.has(r.t.id)).map((r) => r.t);
  return [...byVerb, ...rest];
}

const noDigits = (s) => !/\d/.test(s);
const shortFlavor = (s) => typeof s === 'string' && s.trim().split(/\s+/).length <= 8 && noDigits(s) && !/saving throw|damage|condition|DC\b/i.test(s);

/**
 * Render one template at this sheet's numbers. Returns null when a slot
 * cannot be filled (a miss, never a half-filled row).
 * ctx: { scaled, energy, mix, meleeName, conditionMinor, projectile, archetype, imposed, mechanics, cr, name }
 */
// generic fills for a BLIND render (the fallback): the fiction is plain, never wrong
const BLIND_FILLS = { projectile: 'a hurled object', wound_noun: 'wound', zone_effect: 'a choking haze', zone_rule: 'has Disadvantage on attack rolls', disguise: 'an ordinary object', shell: 'its shell', telegraph: 'gathering itself', lure_source: 'the creature', hook: 'its grip' };
export function renderTemplate(t, ctx, fills = {}, { blind = false } = {}) {
  if (blind) fills = { ...BLIND_FILLS, ...fills };
  const { scaled } = ctx;
  if (t.kind === 'seed') {
    const drawn = drawLibraryRow(scaled, { archetype: ctx.archetype, energy: ctx.energy, mix: ctx.mix, name: ctx.name ?? '', shapeKey: t.key, imposed: ctx.imposed ?? [], mechanics: ctx.mechanics ?? null, cr: ctx.cr });
    if (!drawn || drawn.seed !== t.key) return null; // the seed was not legal on this sheet
    let text = drawn.row.text;
    for (const k of FLAVOR_SLOTS) {
      if (!text.includes(`{${k}}`)) continue;
      const v = fills[k];
      if (!shortFlavor(v)) return null;
      text = text.split(`{${k}}`).join(v.trim());
    }
    if (/\{[a-z_]+\}/.test(text)) return null;
    return { name: t.name, text, section: SECTION_OF[t.section], gate: t.gate };
  }
  let text = t.frames[bandFor(ctx.cr)];
  if (!text) return null;
  const per = Math.max(3, Math.round(scaled.per_hit ?? 6));
  const full = saveDamageDiceFor(per);
  const half = saveDamageDiceFor(Math.max(2, Math.round(per / 2)));
  const dbl = saveDamageDiceFor(per * 2); // condition-payoff's {avg_x2} — unrendered on the blind read's drowned knight
  const dtype = ctx.mix === 'physical' || !ctx.energy ? (PHYSICAL.includes(fills.damage_type) ? fills.damage_type : 'Bludgeoning') : ctx.energy;
  const engine = { dc: String(scaled.dc), atk: `+${scaled.atk}`, avg: String(full.avg), dice: full.dice, avg_half: String(half.avg), dice_half: half.dice, avg_x2: String(dbl.avg), dice_x2: dbl.dice, damage_type: dtype, melee_name: ctx.meleeName ?? 'Slam' };
  for (const [k, v] of Object.entries(engine)) text = text.split(`{${k}}`).join(v);
  for (const [k, list] of Object.entries(VOCAB)) {
    if (!text.includes(`{${k}}`)) continue;
    const proposed = String(fills[k] ?? '').trim();
    const pick = list.find((x) => x.toLowerCase() === proposed.toLowerCase())
      ?? (k === 'condition_minor' && list.includes(ctx.conditionMinor) ? ctx.conditionMinor : null)
      ?? ({ save_stat: 'Wisdom', consumed_condition: ctx.imposed?.[0] ?? 'Frightened', condition_minor: 'Frightened', restraint: 'Restrained', r_vuln: 'Fire' })[k];
    text = text.split(`{${k}}`).join(pick);
  }
  for (const k of FLAVOR_SLOTS) {
    if (!text.includes(`{${k}}`)) continue;
    const v = fills[k] ?? (k === 'projectile' ? ctx.projectile : null);
    if (!shortFlavor(v)) return null;
    text = text.split(`{${k}}`).join(v.trim());
  }
  if (/\{[a-z_]+\}/.test(text)) return null;
  return { name: t.name, text, section: SECTION_OF[t.section], gate: t.gate };
}

// ---------------------------------------------------------------- the two calls

/** The verbs the concept itself names, across the whole catalog (not menu-limited) — the idea's brief. */
export function conceptVerbs(conceptText) {
  return [...new Set(rankByVerb(TEMPLATES, conceptText).flatMap((r) => r.concept))];
}

export function buildIdeaPrompt({ name, cr, concept, sheetLines, seats = null, energy = null, wantTrait = true, engines = [], verbs = [] }) {
  return `You are inventing the SIGNATURE ability for a nearly-complete D&D monster. Everything below is already final. Describe the ability in PLAIN WORDS — what it does, when it fires, whom it affects, what limits it. NO rules grammar, NO numbers, NO dice, NO DCs, NO condition names in capitals: the engine owns every number and will pour your idea into a printed rules shape afterwards. Your job is the IDEA a fan would riot to find missing.
THE SHEET (${name}, CR ${cr}):
${sheetLines}
CONCEPT: ${concept}
${verbs.length ? `THE CONCEPT'S OWN VERBS: ${verbs.join(', ')} — the signature is one of these verbs made mechanical; an idea that abandons them for something the concept never said (a teleport, a mist, a generic burst) is the wrong idea however clever. ` : ''}${seats ? `BUILD THIS: the action idea builds "${seats.action}"${wantTrait && !seats.packaged ? `; the trait idea makes "${seats.trait}" true on the sheet` : ''}. ` : ''}${engines.length ? `THE SHEET'S ENGINE IS ALREADY BUILT: ${engines.join(', ')} — the concept's holding, swallowing, or caging is DONE by those rows; do not describe it again in any wording. Build the concept's OTHER face. ` : ''}The rows above already OWN their fiction — never describe another version of one; the best ideas key off a condition a row applies, or set up a state the rows exploit.${energy ? ` This creature's energy is ${energy}.` : ''}
NOT A SIGNATURE (the wide run's biggest miss class, 12 of 48): a damage resistance or immunity, "blades only chip it", "can't be moved", "immune to its own fire", or a saving-throw bonus — those are the HEADER's to grant and the engine already derives them from type and energy. A trait idea must be a RULE that happens: something the creature does, or something that happens to whoever touches, hits, or holds it. Tag each idea: "section" is action | bonus_action | reaction | rider (a clause on the creature's own attack: "when it hits, …")${wantTrait ? ' (the trait idea is always a trait)' : ''}; "trigger" is one of ${TRIGGERS.join(' | ')}; "effect" is one of ${EFFECTS.join(' | ')}.
Return ONLY JSON: {"action": {"idea": "<2-3 plain sentences>", "section": "<action|bonus_action|reaction>", "trigger": "<...>", "effect": "<...>"}${wantTrait ? ', "trait": {"idea": "<1-2 plain sentences: a passive rule of its body or nature>", "trigger": "<...>", "effect": "<...>"}' : ''}}`;
}

export function validateIdeaResponse(jsonString) {
  const p = tryParse(jsonString);
  return p != null && typeof p.action?.idea === 'string' && p.action.idea.trim().length >= 20;
}

// PRINT'S SECTION GRAMMAR (2026-09-21; the blind run tagged 6/7 action ideas
// "on_hit" and every menu came back empty): an action or bonus action fires
// on the creature's own turn — its trigger is save / always / once_per_fight;
// "on_hit" there means a save action; "on_being_hit" means the idea IS a
// reaction; "start_of_turn" means it is a trait. A reaction only ever fires
// on being hit; a trait never uses the creature's action.
const LEGAL = { action: ['save', 'always', 'once_per_fight'], bonus_action: ['save', 'always', 'once_per_fight'], reaction: ['on_being_hit'], trait: ['always', 'on_being_hit', 'start_of_turn'], rider: ['on_hit'] };
export function normaliseTag(section, trigger) {
  if (LEGAL[section].includes(trigger)) return { section, trigger };
  if (section === 'action' || section === 'bonus_action') {
    if (trigger === 'on_hit') return { section: 'rider', trigger: 'on_hit' }; // "when it hits" IS a rider on the creature's own attack (the wide run: 3 of 5 action misses)
    if (trigger === 'on_being_hit') return { section: 'reaction', trigger };
    if (trigger === 'start_of_turn') return { section: 'trait', trigger };
  }
  if (section === 'reaction') return { section, trigger: 'on_being_hit' };
  if (section === 'rider') return { section, trigger: 'on_hit' };
  return { section, trigger: 'always' };
}

export function parseIdeas(raw) {
  const p = tryParse(raw);
  const norm = (o, forced) => {
    if (!o || typeof o.idea !== 'string' || o.idea.trim().length < 20) return null;
    const section0 = forced ?? (['action', 'bonus_action', 'reaction', 'rider'].includes(String(o.section).toLowerCase()) ? String(o.section).toLowerCase() : 'action');
    const trigger0 = TRIGGERS.includes(o.trigger) ? o.trigger : 'always';
    const { section, trigger } = normaliseTag(section0, trigger0);
    return { idea: o.idea.trim().slice(0, 400), section, trigger, effect: EFFECTS.includes(o.effect) ? o.effect : 'damage' };
  };
  return { action: norm(p?.action, null), trait: norm(p?.trait, 'trait') };
}

const frameOf = (t, cr) => (t.kind === 'seed' ? t.text : t.frames[bandFor(cr)]);

export function buildFitPrompt({ name, idea, menu, cr, concept = '' }) {
  const ranked = rankByVerb(menu, concept, idea.idea);
  const lines = ranked.map(({ t, concept: cv, idea: iv }) => {
    const matched = [...cv.map((k) => `${k} (concept)`), ...iv.map((k) => `${k} (idea)`)];
    const flav = t.flavor.length ? ` — you fill: ${t.flavor.map((f) => `{${f}}`).join(', ')}` : '';
    const vocab = slotsOf(frameOf(t, cr)).filter((s) => VOCAB[s]).map((s) => `{${s}} ∈ ${VOCAB[s].join('/')}`);
    return `- ${t.id} [${SECTION_OF[t.section]}${t.gate ? `, ${t.gate}` : ''}]${matched.length ? ` VERB MATCH: ${matched.join(', ')}` : ''}: ${frameOf(t, cr).replace(/\*/g, '')}${flav}${vocab.length ? ` — choose: ${vocab.join('; ')}` : ''}`;
  }).join('\n');
  return `A monster's signature ability has been described in plain words. Pour it into ONE of the printed rules templates below, or say none fits. The template's rules are FIXED; the engine fills every {slot} shown in braces except the ones marked "you fill". Do not rewrite the template.
MONSTER: ${name} (CR ${cr})
THE IDEA (${idea.section} / ${idea.trigger} / ${idea.effect}): ${idea.idea}
TEMPLATES:
${lines}
THE VERB DECIDES. The concept has a central verb — seal, lure, stick, toll, drown, drag. Templates are listed best-match first; a VERB MATCH marked (concept) means the template's own verb is in the user's words and outranks everything; (idea) means only your invented description used it. Never pick a template with no verb match over one that has a (concept) match. Pick the template whose rules genuinely CARRY the idea — the same verb, the same target, the same kind of effect, the same moment. A template that merely resembles it does not fit; answer "none" then, honestly — a miss is logged and a template gets written. Name the ability in Monster Manual register: two words, three at most, never a description, and never the creature's own name ("Wax Preacher's Sermon" is a label, "Sealing Sermon" is a name).
Return ONLY JSON: {"template": "<id from the list, or none>", "because": "<the words of the idea the template carries>", "name": "<2-3 words>", "fills": {"<slot>": "<value>"}}`;
}

export function validateFitResponse(jsonString) {
  const p = tryParse(jsonString);
  return p != null && typeof p.template === 'string';
}

export function parseFit(raw, menu, creatureName = '') {
  const p = tryParse(raw) ?? {};
  const id = String(p.template ?? '').trim().toLowerCase();
  const t = id && id !== 'none' ? (menu.find((m) => m.id === id) ?? menu.find((m) => id.includes(m.id)) ?? null) : null;
  const nm = String(p.name ?? '').trim();
  return {
    template: t,
    because: String(p.because ?? '').trim().slice(0, 80),
    name: nm && nm.split(/\s+/).length <= 3 && noDigits(nm) && !(creatureName && nm.toLowerCase().includes(creatureName.toLowerCase().split(/\s+/).pop())) ? nm : null,
    fills: p.fills && typeof p.fills === 'object' ? p.fills : {},
  };
}

function tryParse(raw) {
  try { return JSON.parse(String(raw).replace(/^```(?:json)?\s*|\s*```$/g, '').trim()); } catch { return null; }
}

export { BY_ID as TEMPLATE_BY_ID };

// ---------------------------------------------------------------- THE VALUE CHECK
// (critic + owner, 2026-09-22: "it has to be worth the trade"). A template
// row replaces ONE attack of the Multiattack (the replacement clause) or, when
// gated, stands alone against the whole Multiattack. Its expected value is
// derived from the sheet — never guessed — and an under row climbs the
// ladder: add the half clause, raise the dice to the attack's budget, then log
// that it still needs a condition. An over row gets a Recharge gate.
const P_FAIL = 0.55; const P_HIT = 0.65;
const WORTH_AN_ATTACK = /\b(?:Restrained|Grappled|Charmed|Paralyzed|Stunned|Incapacitated|Petrified)\b|can't regain Hit Points.{0,40}(?:1 minute|repeat)/;
const MINOR_EFFECT = /\b(?:Frightened|Deafened|Blinded|Poisoned|Prone)\b|Disadvantage|pulled|pushed|Speed is (?:halved|0)/;
const DMG = /(\d+) \((\d+d\d+(?:\s*\+\s*\d+)?)\)/;
export function multiattackShape(sections = {}) {
  const ma = Object.values(sections).flat().find((e) => /^Multiattack/i.test(e.name ?? ''));
  const words = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const m = /makes (one|two|three|four|five)/i.exec(ma?.text ?? '');
  return { attacks: m ? words[m[1].toLowerCase()] : 1, present: !!ma };
}
export function rowValue(text, perHit) {
  // only the PAYLOAD counts: a condition in the targeting frame ("one creature
  // that is Grappled") is a prerequisite, not something the row applies (the
  // exploiter read 31.9 and was gated on every caged sheet, 2026-09-22)
  const payload = /\*Failure:\*/.test(text) ? text.slice(text.indexOf('*Failure:*')) : text;
  const d = DMG.exec(payload);
  const avg = d ? Number(d[1]) : 0;
  const half = /\*Success:\*\s*Half/i.test(text);
  let ev = P_FAIL * avg + (half ? (1 - P_FAIL) * avg / 2 : 0);
  if (WORTH_AN_ATTACK.test(payload)) ev += P_FAIL * perHit;
  else if (MINOR_EFFECT.test(payload)) ev += P_FAIL * perHit * 0.25;
  return { ev, avg, half, hasDamage: !!d };
}
/**
 * @returns {{ text, name, ev, floor, replaced, steps: string[] }}
 */
export function valueCheck(row, { scaled, sections, section }) {
  const perHit = Math.max(3, Math.round(scaled.per_hit ?? 6));
  const attackEV = P_HIT * perHit;
  const gated = /\((?:Recharge [\d–-]+|\d\/Day)\)/.test(row.name ?? '');
  const ma = multiattackShape(sections);
  // a bonus action is free (no trade — ceiling only); a gated action stands alone
  const replaced = section === 'Bonus Actions' ? 0 : gated ? attackEV * ma.attacks : attackEV;
  const label = section === 'Bonus Actions' ? 'a bonus action (free)' : gated ? `the whole Multiattack (${ma.attacks} attacks)` : `one attack of ${ma.attacks}`;
  const floor = 0.8 * replaced; const ceiling = 1.5 * (replaced || attackEV);
  let text = row.text; let name = row.name; const steps = [];
  let v = rowValue(text, perHit);
  if (v.ev < floor && v.hasDamage && !v.half) { text = `${text.trim()} *Success:* Half damage only.`; steps.push('added Success: Half'); v = rowValue(text, perHit); }
  if (v.ev < floor && v.hasDamage && v.avg < perHit) {
    const full = saveDamageDiceFor(perHit);
    text = text.replace(DMG, `${full.avg} (${full.dice})`); steps.push(`dice ${v.avg} → ${full.avg}`); v = rowValue(text, perHit);
  }
  if (v.ev < floor) steps.push('still under — needs a condition from the worth-an-attack list (logged)');
  if (v.ev > ceiling && !gated && section !== 'Traits') { name = `${name} (Recharge 5-6)`; steps.push('over the ceiling — gated Recharge 5-6'); }
  return { text, name, ev: Math.round(v.ev * 10) / 10, floor: Math.round(floor * 10) / 10, replaced: label, steps };
}
