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
import { attackDamageDiceFor, saveDamageDiceFor } from '../format-2024/dice.mjs';
import { readPhrases } from './lexicon.mjs';
import { AREA_TARGETS } from './card-budgets.mjs';

export const SECTION_OF = { trait: 'Traits', action: 'Actions', bonus_action: 'Bonus Actions', reaction: 'Reactions', rider: 'Rider' }; // Rider = a clause appended to the melee attack row
export const TRIGGERS = ['on_hit', 'save', 'on_being_hit', 'start_of_turn', 'once_per_fight', 'always'];
export const EFFECTS = ['damage', 'condition', 'movement', 'resource', 'defense'];
const SAVE_STATS = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
const CONDITIONS = ['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned'];
const MINOR = ['Prone', 'Poisoned', 'Deafened', 'Frightened', 'Blinded']; // Blinded joined for obscuring breaths (2026-09-28); the aura save map covers it
const RESTRAINTS = ['Grappled', 'Restrained'];
const DAMAGE = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];
const PHYSICAL = ['Bludgeoning', 'Piercing', 'Slashing'];

// closed-vocabulary slots: the model may propose, the engine only accepts a listed value
const VOCAB = { save_stat: SAVE_STATS, consumed_condition: CONDITIONS, condition_minor: MINOR, restraint: RESTRAINTS, r_vuln: DAMAGE };
// flavor slots: the model's words, bounded (no digits, no rules grammar, short)
export const FLAVOR_SLOTS = ['phobia', 'restraint', 'projectile', 'wound_noun', 'zone_effect', 'zone_rule', 'disguise', 'shell', 'telegraph', 'lure_source', 'hook', 'douse', 'terrain', 'sense_target', 'anchor', 'ward'];
// engine slots: never the model's
const ENGINE_SLOTS = ['dc', 'atk', 'avg', 'dice', 'avg_half', 'dice_half', 'damage_type', 'melee_name', 'ranged_name', 'ray_table'];

// the shapes' tags (section comes from `replaces`); melee-rider / ranged
// replacements weld INTO an existing row and are not a standalone template
const SHAPE_TAGS = {
  trample: ['save', 'damage'], leap: ['save', 'damage'], 'thrown-burst': ['save', 'damage'],
  'gaze-single': ['save', 'condition'], snare: ['save', 'condition'], swallow: ['save', 'condition'], reel: ['save', 'movement'],
  'condition-payoff': ['save', 'damage'], rampage: ['once_per_fight', 'damage'], blink: ['always', 'movement'],
  zone: ['once_per_fight', 'condition'], execute: ['save', 'damage'], 'death-burst': ['always', 'damage'],
  'burrow-ambush': ['save', 'damage'], affliction: ['on_hit', 'condition'], contagion: ['on_hit', 'condition'], charge: ['on_hit', 'damage'], spew: ['save', 'damage'], 'bolt-restrain': ['on_hit', 'condition'], 'bolt-drag': ['on_hit', 'movement'], 'bolt-mark': ['on_hit', 'condition'], 'hook-rider': ['on_hit', 'movement'], riposte: ['on_being_hit', 'damage'], 'snap-shot': ['on_being_hit', 'damage'], 'ground-burst': ['save', 'damage'], 'volley-order': ['always', 'resource'], 'random-ray': ['save', 'condition'], 'blurred-form': ['always', 'defense'], 'weapon-lodge': ['on_being_hit', 'resource'], interpose: ['on_being_hit', 'defense'], pounce: ['on_hit', 'condition'], isolation: ['on_hit', 'damage'], snatch: ['on_hit', 'condition'], 'ward-retaliation': ['on_being_hit', 'damage'], assassinate: ['always', 'damage'], 'active-toll': ['save', 'damage'], 'pull-through': ['save', 'movement'], lure: ['save', 'condition'], 'hook-drag': ['save', 'movement'], 'heated-body': ['on_being_hit', 'damage'], 'false-appearance': ['always', 'defense'], 'bloodied-burst': ['on_being_hit', 'damage'], 'shell-withdraw': ['always', 'defense'], 'resonant-body': ['on_being_hit', 'damage'], 'throw-retrieve': ['always', 'damage'], seal: ['save', 'condition'], adhesive: ['always', 'condition'], absorption: ['on_being_hit', 'defense'],
  'spider-climb': ['always', 'movement'], phobia: ['always', 'condition'], 'terrain-walk': ['always', 'movement'], 'aberrant-ground': ['always', 'movement'], 'faultless-tracker': ['always', 'condition'], 'web-walker': ['always', 'movement'],
  'fire-aura': ['start_of_turn', 'damage'], 'noxious-aura': ['save', 'condition'], 'bloodied-fury': ['always', 'defense'], 'uncanny-sense': ['always', 'defense'], 'earth-glide': ['always', 'movement'], tunneler: ['always', 'movement'], berserk: ['always', 'condition'], 'shielded-mind': ['always', 'defense'], evasion: ['always', 'defense'],
  'relentless-pursuit': ['always', 'movement'], bound: ['always', 'movement'], 'marking-light': ['always', 'condition'], 'sealed-body': ['always', 'defense'], 'warded-mending': ['start_of_turn', 'resource'], 'guarded-stance': ['always', 'defense'], 'undead-fortitude': ['always', 'defense'], mimicry: ['always', 'defense'], wail: ['once_per_fight', 'damage'], 'truth-aura': ['save', 'condition'], 'gaze-aura': ['save', 'condition'], 'charge-push': ['on_hit', 'movement'],
};
// ENGINE FAMILIES: a template that re-implements an engine the sheet already
// carries is off the menu by construction (iron maiden x4: hook-drag beside
// Cage, 2026-09-21). Sheet engines are read from the rows themselves.
// A template is OFF THE MENU when the sheet carries an engine it would double
// (containment beside a Cage) — or, THE DIRECTION RULE (critic, 2026-09-22): an
// engine it would work AGAINST. A grappler, swallower, or cage needs the victim
// adjacent; a repeller (Frightened, a push) sends it away. Holders stay.
const EXCLUDE_ON = {
  charge: ['charge-rider'], 'throw-retrieve': ['thrown-weapon'], pounce: ['charge-rider'],
  'hook-drag': ['containment'], 'hook-rider': ['containment'], 'obstacle-pull': ['containment'], reel: ['containment'], snare: ['containment'],
  'false-appearance': ['disguise'], adhesive: ['adhesive'], 'heated-body': ['contact-damage', 'aura'], 'resonant-body': ['contact-damage', 'aura'],
  // one aura per body; a sealed mind never doubles the golem's Immutable Form; warded mending never sits beside Regeneration
  'fire-aura': ['contact-damage', 'aura'], 'noxious-aura': ['aura'], 'truth-aura': ['aura'], 'gaze-aura': ['aura'], 'charge-push': ['charge-rider'], 'sealed-body': ['immutable-form', 'shielded-mind'], 'shielded-mind': ['shielded-mind'], 'warded-mending': ['regeneration'],
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
    if (/Ranged Attack Roll/.test(e.text ?? '') && /hurl|throw|\{projectile\}|boulder|rock|slab/i.test(`${e.name ?? ''} ${e.text ?? ''}`) && (e.template || e.library || e.print)) out.add('thrown-weapon'); // a CHASSIS throw does not own the engine: the slot-yield rule evicts it when the user's thrown weapon lands (fidelity pipeline step 2 — the chassis's "Hurled Debris" kept throw-retrieve off the menu)
    if (/adheres to anything that touches/i.test(e.text ?? '')) out.add('adhesive');
    if (/hits it with a melee attack while within 5 feet of it takes/i.test(e.text ?? '')) out.add('contact-damage');
    if (/(?:At the end of each of|starts its turn in a \d+-foot Emanation).{0,80}Emanation originating from/i.test(e.text ?? '') || /starts its turn in a \d+-foot Emanation/i.test(e.text ?? '')) out.add('aura');
    if (/can't shape-shift|immune to any spell or effect that would alter its form/i.test(e.text ?? '')) out.add('immutable-form');
    if (/thoughts can't be read/i.test(e.text ?? '')) out.add('shielded-mind');
    if (/regains \d+ Hit Points at the start of each of its turns/i.test(e.text ?? '')) out.add('regeneration');
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
  phobia: ['afraid of', 'afraid', 'fear of', 'fears', 'terrified of', 'terrified', 'phobia', 'flees from', 'flee from', 'panics at', 'dread of', 'scared of'],
  swallow: ['swallow', 'swallows', 'swallowed', 'devour', 'devours', 'gulp', 'gulps', 'eats whole', 'whole'],
  'random-ray': ['eyestalks', 'eyestalk', 'eye rays', 'rays', 'ray', 'many-eyed', 'beams'],
  'blurred-form': ['blurred', 'blur', 'displaced', 'image appears', 'a few feet from where it stands', 'afterimage', 'shimmers', 'mirage', 'where it stands'],
  'volley-order': ['volley', 'orders a volley', 'looses at will', 'loose', 'on my mark', 'archers', 'crossbowmen'],
  'ground-burst': ['erupt', 'eruption', 'burst', 'shockwave', 'stomp', 'quake', 'tremor', 'around it', 'in all directions', 'wave of', 'pulse', 'detonate', 'slams the ground', 'stamps'],
  'snap-shot': ['snap shot', 'snaps off', 'covering fire', 'as they close', 'closes to melee', 'before it can strike', 'on approach', 'anyone who approaches', 'draws near', 'comes within'],
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
  leap: ['leap', 'pounce', 'drop', 'drops on', 'jump', 'spring', 'crash down', 'land on', 'plunge', 'dive', 'fall on', 'perch', 'from above', 'ambush from', 'stragglers'],
  'thrown-burst': ['hurl', 'throw', 'lob', 'burst', 'boulder', 'bomb', 'toss', 'fling', 'sling', 'volley', 'shatter'],
  'gaze-single': ['gaze', 'stare', 'glare', 'eye', 'look', 'behold', 'petrify', 'transfix', 'eyes', 'sight'],
  snare: ['snare', 'web', 'bind', 'net', 'tangle', 'silk', 'strand', 'thread', 'entangle', 'rope', 'lasso', 'wrap', 'cocoon', 'chain'],
  reel: ['reel', 'pull', 'drag', 'haul', 'yank', 'tow', 'wrench', 'draw in', 'hook', 'line', 'tongue'],
  'condition-payoff': ['exploit', 'punish', 'finish', 'helpless', 'prone', 'fallen', 'trapped', 'caught', 'grind', 'crush'], // "downed" stemmed to "down" and matched every "down"; a style clause is the feature table's (step 8)
  affliction: ['wound', 'bleed', 'fester', 'gash', 'lingering', 'sludge', 'venom', 'poison', 'rot', 'alchemical', 'lasting', 'scar', 'sepsis'],
  contagion: ['plague', 'plagued', 'disease', 'diseased', 'contagion', 'contagious', 'pestilence', 'pestilent', 'sickness', 'sickening', 'infect', 'infects', 'infected', 'infection', 'infectious', 'fever', 'leprous', 'pox'], // a plague is a disease, not a wound (critic form-ten 2026-10-01)
  charge: ['charge', 'gore', 'momentum', 'straight line', 'ram', 'lance', 'joust', 'impale', 'run down', 'spur', 'gallop'],
  rampage: ['rampage', 'frenzy', 'bloodied', 'berserk', 'rage', 'fury', 'blood', 'wound', 'savage'],
  blink: ['blink', 'teleport', 'vanish', 'flicker', 'phase', 'step through', 'shadow', 'shimmer', 'wink', 'disappear'],
  zone: ['fog', 'cloud', 'field', 'zone', 'murk', 'mist', 'smoke', 'haze', 'aura', 'miasma', 'spores', 'steam', 'darkness'],
  execute: ['execute', 'finish', 'slay', 'kill', 'behead', 'sever', 'end', 'reap', 'harvest', 'death'],
  'heated-body': ['heat', 'burn', 'scald', 'sear', 'molten', 'touch', 'furnace', 'fire', 'flame', 'ember', 'brass', 'iron', 'glow', 'hot', 'spines', 'thorns', 'barbs', 'spikes', 'lightning', 'storm', 'shock', 'splinter', 'shard', 'jagged', 'thundercloud', 'acid', 'frost', 'rime', 'wildfire', 'blaze', 'inferno', 'bonfire', 'pyre', 'plague', 'pestilence', 'contagion', 'contagious', 'splashes back', 'weeps contagion'], // 'weeps' alone forced contact damage onto a giant that weeps brine (fresh four) // the wide run: a thundercloud body, a shipwreck body, a bone-splinter body all wanted this shape with another type
  'false-appearance': ['disguise', 'motionless', 'statue', 'mimic', 'still', 'stone', 'object', 'pretend', 'pose', 'perch', 'harmless', 'ordinary', 'hidden', 'blend', 'scarecrow', 'effigy', 'dummy', 'mannequin', 'stuffed'], // print's Scarecrow has it (third run)
  absorption: ['absorb', 'drink', 'feed', 'immune', 'devour', 'eat', 'soak', 'siphon', 'stronger', 'feeds on'], // heal/mend dropped: "cracks mend when litanies are spoken" bound absorption (critic, the fourteen)
  'bloodied-burst': ['toll', 'ring', 'peal', 'bloodied', 'wounded', 'crack', 'bell', 'burst', 'erupt', 'shatter', 'scream', 'wail', 'when hurt', 'when struck', 'dying', 'the dying', 'half its', 'cornered', 'when cornered', 'at bay', 'desperate', 'vomits', 'spews'], // "when cornered" IS Bloodied (the goat, critic run six)
  'shell-withdraw': ['withdraw', 'shell', 'retreat', 'curl', 'armor', 'carapace', 'hide inside', 'close', 'seal itself', 'turtle', 'crab', 'bell'],
  'active-toll': ['toll', 'ring', 'peal', 'bell', 'clang', 'chime', 'gong', 'deafen', 'thunder', 'knell', 'boom'],
  spew: ['vomits', 'vomit', 'spews', 'spew', 'belches', 'spits', 'choking cloud', 'cloud of', 'breathes', 'exhales', 'retches', 'noxious', 'stink', 'gas'],
  'bolt-restrain': ['bolt', 'binds', 'root', 'roots', 'pins', 'freezes', 'locks', 'holds fast', 'from afar', 'a mile away', 'lightning strike', 'from the sky'],
  'bolt-drag': ['bolt', 'reel', 'drags', 'pulls', 'tether', 'lash', 'from afar', 'lightning lure', 'draws them'],
  'hook-rider': ['barb', 'barbed', 'barbs', 'hook', 'hooks', 'lodge', 'lodged', 'lodges', 'drag', 'drags', 'harpoon', 'gaff', 'reel in', 'yank', 'tears free', 'hauls it'],
  'random-ray': ['eyestalks', 'eyestalk', 'eye rays', 'rays', 'many-eyed', 'beams', 'fire a different ray', 'eye beams'],
  'blurred-form': ['blurred', 'blur', 'displaced', 'image appears', 'few feet from where it stands', 'afterimage', 'shimmers', 'mirage', 'where it stands', 'displacement'],
  'volley-order': ['volley', 'orders a volley', 'looses at will', 'looses arrows', 'loose', 'on my mark', 'archers', 'crossbowmen', 'shoot on'],
  'ground-burst': ['erupt', 'eruption', 'erupts', 'burst', 'shockwave', 'stomp', 'stomps', 'quake', 'tremor', 'around it', 'in all directions', 'wave of', 'pulse', 'detonate', 'slams the ground', 'stamps'],
  'snap-shot': ['snap shot', 'snaps off', 'covering fire', 'as they close', 'closes to melee', 'before it can strike', 'on approach', 'anyone who approaches', 'draws near', 'comes within'],
  riposte: ['riposte', 'parry', 'parries', 'parried', 'counterattack', 'counter', 'off-hand', 'dagger', 'rapier', 'saber', 'sabre', 'duelist', 'fencer', 'opening', 'when they miss', 'second blade', 'two blades', 'twin blades'],
  'bolt-mark': ['bolt', 'marks', 'brands', 'brand', 'singles out', 'hunts', 'tracks', 'isolated', 'lone', 'straggler', 'from afar', 'a mile away', 'find them again', 'finds them', 'in the dark', 'lantern beam', 'beam'],
  'weapon-lodge': ['lodge', 'lodged', 'stuck in', 'knits shut around', 'swallows blades', 'keeps the weapon', 'embedded', 'axes', 'blades in its', 'grows around'],
  interpose: ['interpose', 'shields', 'takes the blow', 'in the way', 'protects', 'bodyguard', 'guards', 'its charge', 'ward', 'sworn to protect'],
  pounce: ['pounce', 'drop on', 'drops on', 'leap onto', 'from above', 'ambush from', 'stragglers', 'spring', 'pin', 'pins'],
  isolation: ['isolated', 'alone', 'straggler', 'stragglers', 'lone', 'separated', 'cut off', 'apart from', 'picks off', 'singles out'],
  snatch: ['snatch', 'carry off', 'carries off', 'talons', 'swoop', 'drop them', 'drops them', 'lift', 'carry', 'from the sky'],
  'ward-retaliation': ['guard', 'guards', 'protect', 'ward', 'retaliate', 'avenge', 'answer', 'bodyguard', 'sworn to', 'its charge', 'sentinel'],
  assassinate: ['assassin', 'ambush', 'first strike', 'unseen', 'surprise', 'stalk', 'strikes first', 'before they notice', 'knife', 'garrote'],
  'pull-through': ['through walls', 'through the wall', 'through the floor', 'drag under', 'pull under', 'into the surf', 'drown', 'through stone', 'phase', 'incorporeal'],
  'death-burst': ['explode', 'burst', 'die', 'death', 'detonate', 'final', 'last breath', 'shatter', 'dying'],
  'burrow-ambush': ['erupt', 'burrow', 'ambush', 'tunnel', 'beneath', 'underground', 'sand', 'earth', 'surface', 'rise from'],
  'resonant-body': ['ring', 'toll', 'resonate', 'bell', 'chime', 'gong', 'bronze', 'brass', 'iron', 'crystal', 'glass', 'hollow', 'peal'], // MATERIAL keys only: 'thunder'/'echo'/'struck'/'hum'/'clang'/'deafen' bound a bell to a boar's bone shards (critic, new lines 2026-09-28)
  'throw-retrieve': ['lance', 'spear', 'axe', 'retrieve', 'recover', 'fetch', 'javelin', 'harpoon', 'anchor', 'hammer', 'thrown weapon', 'its weapon'], // a NAMED weapon — "hurls" alone is the hurler's thrown-burst (Scarpfang walked to pick up a rock from a cliff of rocks)
  seal: ['seal', 'wax', 'cauterize', 'stopper', 'close the wound', 'no healing', 'wither', 'cannot heal', 'curse', 'psalm', 'sermon'], // "brand" is the MARK's word: "so her bolts find them again" (critic run six)
  adhesive: ['stick', 'sticky', 'tar', 'glue', 'adhere', 'cling', 'gum', 'pitch', 'resin', 'slime', 'sap', 'grip', 'held fast', 'stuck', 'mimic', 'chest', 'coffer'], // 'vault'/'strongroom' left: a floating orb that guards a vault stuck to whatever touched it (critic 2026-10-01) // a mimic is adhesive by print (the Hollow Trust had none though offered)
  'aggro-curse': ['mark', 'taunt', 'oath', 'challenge', 'goad', 'provoke', 'duel', 'single out', 'chosen', 'brand', 'sworn'], // "bless" is rally's — a mark is not a blessing (the bishop, v4 read)
  'obstacle-pull': ['pull', 'yank', 'reel', 'beckon', 'drag', 'draw', 'summon closer', 'tug', 'haul', 'tether', 'chain', 'tongue', 'tide', 'undertow'],
  lure: ['lure', 'beguile', 'song', 'call', 'beckon', 'lamp', 'light', 'invite', 'follow it', 'follow him', 'follow her', 'follow the', 'made to follow', 'drawn to follow', 'entice', 'draw', 'tempt', 'siren', 'lantern', 'glow', 'whisper', 'hymn'], // bare 'follow' read the wrong direction: a highwayman who FOLLOWS the coach got a Luring Presence (fresh four); the target follows a lure, the creature follows a quarry
  pacify: ['pacify', 'transfix', 'hold', 'stillness', 'trance', 'freeze', 'root', 'stun', 'mesmerize', 'stare', 'calm', 'lull', 'stop'],
  'escalating-dread': ['dread', 'fear', 'wither', 'doom', 'terror', 'horror', 'haunt', 'nightmare', 'despair', 'grief'],
  'terror-pulse': ['terror', 'roar', 'shriek', 'presence', 'howl', 'scream', 'bellow', 'wail', 'fright', 'scatter', 'panic'],
  'snare-bolt': ['snare', 'web', 'bind', 'tangle', 'net', 'bolt', 'spit', 'tar', 'silk', 'root', 'vine', 'restrain', 'entangle'],
  'slow-bolt': ['slow', 'chill', 'mire', 'leaden', 'numb', 'freeze', 'cold', 'brine', 'weigh', 'bog', 'mud', 'sluggish', 'frost'],
  'sensory-strike': ['blind', 'dazzle', 'flash', 'deafen', 'glare', 'light', 'spit', 'ink', 'sand', 'dust', 'clang', 'scream', 'toll', 'ring', 'bell', 'peal', 'chime'], // a bell's ACTION seat: the Deafened row (the crab's Dread Toll had no Thunder and no Deafened)
  disarm: ['disarm', 'twist', 'strip', 'weapon', 'snatch', 'steal', 'pluck', 'wrench', 'knock away', 'take'],
  'push-prone': ['shove', 'topple', 'slam', 'bowl', 'knock', 'push', 'fling', 'throw down', 'trip', 'batter', 'bull', 'ram', 'sweep'],
  herd: ['herd', 'drive', 'command', 'stampede', 'scatter', 'chase', 'flush', 'corral', 'compel', 'sermon', 'order', 'call'],
  'hook-drag': ['hook', 'chain', 'harpoon', 'drag', 'grapple', 'reel', 'pull', 'haul', 'tether', 'anchor', 'claw', 'tongue', 'into the surf', 'under'],
  'thrown-burst-seed': ['hurl', 'bomb', 'burst', 'volley', 'throw', 'lob', 'toss', 'shatter', 'explode', 'grenade', 'flask'],
  drain: ['drain', 'leech', 'feed', 'siphon', 'suck', 'drink', 'sap', 'wither', 'devour', 'life', 'vampire', 'hunger'],
  'delayed-brand': ['brand', 'ember', 'fuse', 'venom', 'poison', 'infect', 'rot', 'fester', 'curse', 'mark', 'smolder', 'seed'],
  'curse-debt': ['curse', 'debt', 'rebuke', 'price', 'hex', 'oath', 'bargain', 'owe', 'judgment', 'tithe', 'toll', 'sin'],
  'own-turn-punisher': ['punish', 'sting', 'answer', 'reprisal', 'retaliate', 'strike back', 'avenge', 'counter', 'spite', 'lash'],
  'zone-seed': ['fog', 'murk', 'cloud', 'field', 'mist', 'smoke', 'haze', 'spores', 'steam', 'darkness', 'shroud'],
  reveal: ['reveal', 'light', 'outline', 'expose', 'illuminate', 'lamp', 'lantern', 'faerie fire', 'glow', 'mark', 'shine'],
  rally: ['rally', 'bolster', 'ward', 'blessing', 'bless', 'shield', 'protect', 'inspire', 'hymn', 'prayer', 'heal', 'mend', 'flock', 'command', 'orders', 'troops', 'battle cry', 'war cry', 'frenzy', 'bellows'], // a leader's command IS the rally shape (print: bonus-action Leadership / the commander's THP) — three leaders' commands seated as 2/Day standalones and floored (critic, new lines 2026-09-28)
  focus: ['focus', 'aim', 'stalk', 'poise', 'sight', 'lock on', 'hunt', 'track', 'study', 'patience'],
  'feint-slip': ['feint', 'slip', 'blur', 'weave', 'dodge', 'dart', 'sidestep', 'evade', 'dance', 'trick'],
  'wind-up': ['gather', 'charge-up', 'telegraph', 'brew', 'build', 'swell', 'ratchet', 'wind', 'coil', 'inhale', 'gathering', 'storm'],
  coating: ['coat', 'venom', 'anoint', 'charge-weapon', 'poison', 'oil', 'ignite', 'bless the blade', 'dip', 'smear', 'envenom'],
  exploiter: ['exploit', 'opportunist', 'predator', 'finish', 'prone', 'grappled', 'helpless', 'downed', 'trapped', 'held', 'pinned', 'caught', 'inside', 'caged'],
  'blighted-ground': ['blight', 'scorch', 'corrupt', 'floor', 'ground', 'earth', 'soil', 'rot', 'poison the land', 'wither', 'salt', 'ash', 'slick', 'ooze'],
  'phase-slip': ['slip', 'phase', 'blink', 'vanish', 'teleport', 'step', 'shadow', 'flicker', 'fade', 'through walls'],
  // THE TRAIT SHELF (2026-09-27): nouns of the fiction as much as verbs — a
  // user writes "the gutter" and "the mire", not "it climbs" and "it wades"
  'spider-climb': ['climb', 'climbs', 'climbing', 'ceiling', 'ceilings', 'walls', 'wall', 'scuttle', 'scuttles', 'crawl', 'crawls', 'cling', 'clings', 'rafters', 'eaves', 'gutter', 'gutters', 'sheer', 'upside down', 'spider', 'gecko', 'roost'],
  'terrain-walk': ['mire', 'bog', 'swamp', 'marsh', 'fen', 'mud', 'muddy', 'ice', 'icy', 'snow', 'frozen', 'freezes', 'freeze', 'glacier', 'sand', 'dunes', 'ash', 'cinders', 'rubble', 'scree', 'webs', 'thicket', 'brambles', 'undergrowth', 'reeds', 'shallows', 'tundra', 'debris', 'rough ground', 'wreckage', 'does not slow', 'never slows', 'never slowed', 'sure-footed', 'wades', 'wading', 'nothing can follow'], // debris/rough ground: the brass bull's "ignore rough ground, wrecked stalls, and market debris" missed on a shelf that held it (goldens 2026-09-27)
  'aberrant-ground': ['slick', 'seawater', 'brine', 'rubble', 'scree', 'wake', 'trail of', 'slime', 'sludge', 'ooze', 'treacherous', 'footing', 'uneven', 'broken ground', 'churns', 'churned', 'cracks', 'ground around it', 'roots', 'writhing', 'gibbering', 'warps the ground', 'leaves behind', 'wherever it moves', 'wherever she moves', 'wherever he moves'],
  'web-walker': ['web', 'webs', 'webbing', 'silk', 'thread', 'threads', 'strand', 'strands', 'every thread', 'spider', 'weaver', 'loom'],
  'fire-aura': ['aura', 'radiates', 'radiating', 'waste heat', 'heat around', 'furnace', 'shimmers', 'wildfire', 'blaze', 'inferno', 'bonfire', 'pyre', 'flames', 'firestorm', 'scalding air', 'freezing air', 'chill around', 'crackles', 'static', 'emanates', 'wreathed in', 'halo of', 'sheds heat', 'cold around her', 'chills the air', 'chills the room', 'chill around', 'grave-cold', 'lose their warmth', 'warms nobody'],
  'noxious-aura': ['stench', 'reek', 'reeks', 'stink', 'stinks', 'miasma', 'rot', 'fumes', 'spores', 'aura of', 'presence', 'hymn', 'dirge', 'chant', 'keening', 'wail', 'drone', 'voices', 'stops hearts', 'dread presence', 'terrible to behold', 'true form', 'sickening', 'nauseating', 'foul', 'carrion', 'unclean'],
  'bloodied-fury': ['bloodied', 'wounded', 'cornered', 'fury', 'frenzy', 'rage', 'enraged', 'savage', 'when hurt', 'the more it bleeds', 'desperate', 'fights harder', 'maddened', 'goaded', 'temper', 'berserk'],
  'uncanny-sense': ['scent', 'smell', 'smells', 'sniff', 'sniffs', 'pinpoint', 'pinpoints', 'senses', 'can sense', 'detect', 'detects', 'gold', 'metal', 'ferrous', 'treasure', 'blood', 'magic', 'hunts by', 'nose', 'tastes the air'],
  'earth-glide': ['glide', 'glides', 'through stone', 'through earth', 'through the earth', 'through rock', 'through the rock', 'swims through', 'beneath the', 'without disturbing', 'passes through stone', 'moves through stone', 'earth', 'stone'],
  tunneler: ['tunnel', 'tunnels', 'tunneling', 'bore', 'bores', 'boring', 'through solid rock', 'worm', 'leaves a tunnel', 'burrows', 'burrow', 'digs', 'chews through'],
  berserk: ['berserk', 'rampant', 'loses control', 'turns on', 'attacks anything', 'uncontrollable', 'malfunction', 'malfunctions', 'runs amok', 'amok', 'goes wild', 'no longer obeys', 'frenzy', 'slips its leash', 'mindless rage'], // 'construct'/'golem' dropped: every construct concept-bound Berserk and the fit saw nothing else (the plaguewright never saw Stench)
  'shielded-mind': ['thoughts', "can't be read", 'cannot be read', 'sealed mind', 'unreadable', 'inscrutable', 'telepathy', 'no magic can', 'swayed', 'cannot be swayed', 'closed to', 'reliquary', 'mind is', 'talked down', 'mind'], // 'will' dropped: the auxiliary ('will not be moved', 'it will hide') bound a mountain of iron to a sealed mind (2026-09-28)
  evasion: ['evade', 'evades', 'evasion', 'nimble', 'dodge', 'dodges', 'leaps clear', 'leap clear', 'clear of any', 'out of the way', 'slips aside', 'agile', 'acrobat', 'quick enough', 'never where', 'tumbles', 'tumbling'],
  'relentless-pursuit': ['relentless', 'tireless', 'never tires', 'never stops', 'cannot be halted', 'will not stop', 'keeps coming', 'does not tire', 'keeps charging', 'drawn to', 'always orienting', 'walking toward', 'toward the nearest', 'never stops walking', 'stops walking', 'walks there', 'every autumn', 'every year', 'returns every', 'comes back every', 'implacable', 'unstoppable', 'never rests', 'walks toward', 'lurches toward', 'closes on', 'pursuing', 'pursues'],
  bound: ['bound to', 'cannot leave', "can't leave", 'never leaves', 'never strays', 'tethered to', 'chained to', 'haunts', 'confined to', 'trapped in', 'cannot stray', 'its tower', 'the tower', 'tower', 'belfry', 'its post', 'its grave', 'its bell', 'guards the', 'warden of', 'keeps its vigil'],
  'marking-light': ['lit by', 'glow', 'glowing', 'lantern', 'beacon', 'sheds light', 'light clings', 'burning mark', 'starlight', 'shard of light', 'faerie fire', 'luminous', 'cannot hide from', 'lit up', 'shines on', 'outlines', 'limned'],
  'sealed-body': ['sealed', 'reliquary', 'closed cell', 'cannot be opened', 'iron body', 'clockwork', 'no way in', 'cannot be swayed', 'cannot be read', 'grinds on', 'talked down', 'made to flee', 'locked'],
  'warded-mending': ['mend', 'mends', 'mending', 'knits', 'knits itself', 'repairs itself', 'heals near', 'consecrated', 'litany', 'litanies', 'prayer', 'prayers', 'its ward', 'while near', 'shrine', 'altar', 'regrows', 'seeps into', 'restored by'],
  'guarded-stance': ['guard', 'seamless guard', 'keeps the line', 'keeps the shield line', 'shield line', 'shield wall', 'parry', 'parries', 'turns aside', 'turn aside', 'turns every blade', 'blade aside', 'blades aside', 'deflects', 'deflect', 'blade and shield', 'shield and blade', 'stance', 'hard to hit', 'blows glance', 'glance off', 'slips every blow', 'weaves between', 'nothing lands', 'footwork', 'duelist', 'light bends', 'reads only as', 'hard to track'],
  'undead-fortitude': ['keeps him standing', 'keeps her standing', 'keeps it standing', 'should have quit', 'refuses to die', "won't stay down", 'gets back up', 'oath keeps', 'will not fall', 'undying', 'zombie', 'shambling', 'body should have', 'not yet dead', 'keeps fighting', 'dead on its feet', 'corpse', 'after death', 'too stubborn to die'],
  mimicry: ['mimic', 'mimics', 'mimicry', 'imitates', 'imitation', 'steals voices', 'stolen voice', 'stolen voices', 'ventriloquist', 'parrot', 'magpie', 'throws its voice', 'speaks in', 'borrowed voice', 'sounds like', 'voices'],
  wail: ['wail', 'wails', 'wailing', 'keening', 'shriek', 'shrieks', 'scream', 'screams', 'hymn', 'dirge', 'stops hearts', 'stops the heart', 'banshee', 'death song', 'lament', 'voice kills', 'song kills'],
  'truth-aura': ['lie', 'lies', 'liar', 'liars', 'truth', 'speak a lie', 'no lie', 'cannot lie', 'confess', 'confession', 'honest', 'falsehood', 'false word', 'zone of truth'],
  'gaze-aura': ['gaze', 'stare', 'stares', 'glare', 'looks at', 'looks into', 'look into', 'looked at', 'being looked at', 'meets its eyes', 'its eyes', 'reflection', 'reflections', 'visage', 'true form', 'behold', 'beheld', 'catches its eye', 'eye contact'],
  'charge-push': ['runs down', 'run down', 'rides down', 'ride down', 'off the cliff', 'off the ledge', 'off the edge', 'over the edge', 'bowls over', 'knocks off', 'shoulders aside', 'plows through', 'butts climbers off', 'off the road'],
  'faultless-tracker': ['track', 'tracks', 'tracking', 'quarry', 'hunts', 'hunted', 'pursue', 'pursues', 'pursuit', 'always knows', 'knows where', 'knows exactly where', 'unerring', 'unerringly', 'direction to', 'scent', 'trail', 'follows', 'cannot hide', 'nowhere to hide', 'tether', 'tethered', 'branded', 'marked', 'its mark', 'hound', 'bloodhound', 'stalks', 'stalk', 'from a hundred feet', 'finds them'],
};
// NEGATIVE keys: a concept word that DENIES a template (critic run two: the lure
// on a recluse and on a stealth assassin — direction and seat are part of the
// binding, not an afterthought)
export const DENY_KEYS = {
  'thrown-burst': ['net', 'nets', 'netting'], 'thrown-burst-seed': ['net', 'nets', 'netting'], 'throw-retrieve': ['net', 'nets', 'netting'], // a net is a Restrain rider, never a grenade or a returning throw (the kuo-toa's three nets, critic 2026-10-01)
  'gaze-single': ['blind', 'half-blind', 'eyeless', 'sightless', 'no eyes', 'blinded'], 'gaze-aura': ['blind', 'half-blind', 'eyeless', 'sightless', 'no eyes', 'blinded'], // a half-blind dragon drew Dread Gaze from the fallback (day-one 2026-09-30)
  rally: ['volley', 'looses at will', 'looses arrows'], // a volley is the volley order's ("fire at will" reads as "looses at will" — a fixed phrase), not a rally's (the sergeant, library round 2026-09-29)
  leap: ['erupt', 'erupts', 'eruption', 'around it', 'in a circle', 'wide circle', 'from beneath'], // a leap is jump-to-a-space; a self-centred ground burst is another card (Gravesoil Eruption, critic 2026-09-29)
  lure: ['recluse', 'hermit', 'solitary', 'shuns', 'keeps away', 'from afar', 'at a distance', 'hides', 'hiding', 'hidden', 'unseen', 'stealth', 'assassin', 'stalks'],
  herd: ['recluse', 'hermit', 'solitary', 'hides', 'hiding', 'unseen', 'assassin'],
  'false-appearance': ['hurls', 'throws', 'charges', 'rides', 'flies', 'prowls'],
  'uncanny-sense': ['tremor', 'tremors', 'vibration', 'vibrations', 'footsteps', 'every step'], // ground-sense is the header's Tremorsense, never a trait (the hound printed Treasure Sense)
};
export function deniedBy(t, text) {
  const raw = readPhrases(String(text ?? '')).toLowerCase();
  return (DENY_KEYS[t.id] ?? []).filter((k) => raw.includes(k));
}
const ING_ROOTS = new Set(['lightning', 'morning', 'evening', 'king', 'ring', 'sting', 'string', 'spring', 'wing', 'thing', 'nothing', 'something', 'ceiling', 'building', 'being', 'during', 'bring', 'cling', 'fling', 'sling', 'swing', 'wring']); // -ing is the root, not an inflection (the diviner's "lightning:concept" on a concept that says light)
const stem = (w) => { const l = w.toLowerCase(); return ING_ROOTS.has(l) ? l : l.replace(/(?<=[sxz]|ch|sh)es$/, '').replace(/(?<!s)s$/, '').replace(/ing$/, '').replace(/(?<=[a-z]{3})ed$/, ''); };
// prefix match covers INFLECTION only ("dragg"/"drag"), never a compound: "night"
// bound the bishop to "nightmare" (goldens 2026-09-21)
// bound the bishop to "nightmare" (goldens 2026-09-21); a length bound still let
// "market" bind the bull to "marks" (goldens 2026-09-22) — the remainder must
// BE an inflection: a doubled consonant ("dragg"), a dropped -e, or -y/-i
const sameStem = (a, b) => {
  if (a === b) return true;
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  if (short.length < 4 || !long.startsWith(short)) return false;
  const rest = long.slice(short.length);
  // a dropped -e / -y / -i needs five letters of stem: at four, "stars" is
  // "stare" and "spar" is "spare" (the astrologer bound pacify, goldens 2026-09-22)
  return rest === short.at(-1) || (short.length >= 5 && (rest === 'e' || rest === 'y' || rest === 'i'));
};
const wordsOf = (t) => [...new Set(String(t ?? '').toLowerCase().split(/[^a-z]+/).filter((w) => w.length >= 3).map(stem))]; // hyphens split: "tar-mouthed" carries "tar"
/**
 * Rank a menu by verb overlap. THE CONCEPT'S verbs (the user's words + the
 * seat element) outrank the IDEA's (the model's prose): the v2 blind read
 * sent the lure to a charging knight because the idea text said "drawn to
 * follow". Returns [{ t, concept: [...], idea: [...] }], best first, stable.
 */
// a HOMOGRAPH binds once, in the sense its phrase carries: "roots up the graves"
// is digging (the Burrow the route gave), not the hold-fast sense three templates
// key on — the miller was Burrowing AND restraining from 60 feet (critic, new lines 2026-09-28)
const SENSE_DENY = { root: /\broots? (?:up|through|around|about|in|out|for)\b/i, roots: /\broots? (?:up|through|around|about|in|out|for)\b/i, mimic: /\b(?:voices?|sounds?|speech|words?|calls?|songs?|cries|tongues?|talks?|accents?)\b/i, mimics: /\b(?:voices?|sounds?|speech|words?|calls?|songs?|cries|tongues?|talks?|accents?)\b/i, mimicry: /\b(?:voices?|sounds?|speech|words?|calls?|songs?|cries|tongues?|talks?|accents?)\b/i }; // "mimic" in a voice-copying context is not a false-appearance word (the kenku — the critic's species read)
// A DENIED CLAUSE never keys a template: "hates fire and takes extra damage from it", "cannot cast any spells" name what the creature SUFFERS or LACKS, and a heated body force-bound on them (Grandmother Ash — the critic's species read)
// Narrow on purpose: "cannot leave the tower" keys bound, "thoughts can't be read" keys shielded-mind, "hates being looked at" keys gaze-aura — a
// negation that IS the cue stays. What leaves is a vulnerability clause (damage taken, weakness, hatred of a damage type or material) and a lack of an ability.
const ENERGY_WORD = '(?:fire|flames?|heat|burning|cold|ice|frost|lightning|thunder|acid|poison|necrotic|radiant|psychic|force|sunlight|daylight|silver|silvered|iron|cold iron|holy water|running water|salt)';
const DENIED_CLAUSE = new RegExp(`\\b(?:takes? (?:extra|double|additional) damage|extra damage from|vulnerable|weak to|weakness(?:es)? to|susceptible to|(?:hates?|hated|loathes?|despises?|fears?|dreads?)\\s+(?:the\\s+)?${ENERGY_WORD}|(?:cannot|can't|can not|doesn't|does not|unable to|lacks?|has no|have no)\\s+(?:cast|use|wield|speak|fly|swim|climb|burrow|regenerate|heal|see|hear|smell|breathe|spells?|magic))\\b`, 'i');
export function scrubDeniedClauses(text) { return String(text ?? '').split(/([,;.]|\s+(?:and|but|or)\s+)/).map((seg, i) => (i % 2 === 1 ? seg : seg.replace(new RegExp(`${DENIED_CLAUSE.source}.*$`, 'i'), ''))).join('').replace(/\s{2,}/g, ' ').trim(); } // the phrase leaves, the words before it stay ("a tiefling duelist who hates fire" keeps the duelist — the critic's second species read)
// A TEMPLATE DENIED BY THE CONCEPT: a heated body or fire aura never lands on a creature the words make vulnerable to fire, whatever word matched ("lives in the burned forest" bound Ash a Heated Body)
const TEMPLATE_DENY = { 'heated-body': new RegExp(`(?:hates?|loathes?|fears?|vulnerable to|weak to|extra damage from|takes? extra damage from)\\s+(?:the\\s+)?(?:fire|flames?|heat|burning)`, 'i'), 'fire-aura': new RegExp(`(?:hates?|loathes?|fears?|vulnerable to|weak to|extra damage from|takes? extra damage from)\\s+(?:the\\s+)?(?:fire|flames?|heat|burning)`, 'i') };
export function rankByVerb(menu, conceptText0, ideaText0 = '') {
  const conceptText = readPhrases(scrubDeniedClauses(conceptText0)); const ideaText = readPhrases(ideaText0); // fixed phrases carry one sense; a denied clause's words never key a template
  const c = wordsOf(conceptText); const d = wordsOf(ideaText);
  const hit = (t, words, raw) => (t.keys ?? []).filter((k) => !(SENSE_DENY[k] && SENSE_DENY[k].test(String(raw ?? ''))) && (k.includes(' ') ? String(raw ?? '').toLowerCase().includes(k) : words.some((w) => sameStem(w, stem(k)))));
  const rawAll = String(conceptText0 ?? '');
  return menu.map((t, i) => { const denied = TEMPLATE_DENY[t.id]?.test(rawAll); const concept = denied ? [] : hit(t, c, conceptText); const idea = denied ? [] : hit(t, d, ideaText).filter((k) => !concept.includes(k)); return { t, i, concept, idea, matched: [...concept, ...idea], score: concept.length * 2 + idea.length }; })
    .sort((a, b) => b.score - a.score || a.i - b.i);
}

// a PAYOFF template consumes a condition another row must produce (Gristle
// Hill's 84-damage execute keyed on Grappled with nothing on the sheet that
// grapples, critic run three) — off the menu when the sheet imposes nothing
const REQUIRES_IMPOSED = new Set(['condition-payoff', 'exploiter']);

const SECTION_BY_REPLACES = { signature: 'action', nova: 'action', 'bonus-alt': 'bonus_action', trait: 'trait', 'melee-rider': 'rider', 'ranged-rider': 'rider', reaction: 'reaction' };
const HOST_BY_REPLACES = { 'melee-rider': 'melee', 'ranged-rider': 'ranged' }; // which attack row a rider appends to

const slotsOf = (text) => [...new Set([...String(text).matchAll(/\{([a-z_]+)\}/g)].map((m) => m[1]))];

/** The unified catalog. */
export const TEMPLATES = [
  ...SHAPES.filter((s) => SECTION_BY_REPLACES[s.replaces] && SHAPE_TAGS[s.id]).map((s) => ({
    id: s.id, name: s.name, kind: 'shape', cite: s.cite,
    section: SECTION_BY_REPLACES[s.replaces], replaces: s.replaces, roles: s.roles, styles: s.styles, cr_range: s.cr_range, /* `replaces` names the SLOT the template claims — the slot-yield rule reads it (fidelity pipeline step 2) */
    gate: s.gate ?? null, nova: s.replaces === 'nova', requires_movement: s.requires_movement ?? null, requires_style: s.requires_style ?? null, supersedes: s.supersedes ?? null, deny_types: s.deny_types ?? null, requires_row: s.requires_row ?? null,
    host: s.host ?? HOST_BY_REPLACES[s.replaces] ?? null, // a reaction that fires a ranged row needs one on the sheet (snap-shot)
    trigger: SHAPE_TAGS[s.id][0], effect: SHAPE_TAGS[s.id][1],
    keys: [...new Set([...(VERB_KEYS[s.id] ?? []), ...(SHAPE_KEYS[s.id] ?? [])])],
    frames: s.frames, flavor: [...new Set(Object.values(s.frames).flatMap(slotsOf))].filter((x) => FLAVOR_SLOTS.includes(x)), // one entry per slot, not one per band (the fit prompt printed "you fill: {lure_source}" six times)
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

export function templatesFor({ archetype, style = null, cr, movement = '', sections = {}, section = null, trigger = null, text = null, imposed = null, type = '', concept = '' } = {}) {
  const band = bandFor(cr);
  const rows = Object.values(sections).flat();
  const owned = new Set(rows.map((e) => String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase()));
  const hasNova = rows.some((e) => (/^Recharge/.test(e.gate ?? '') || /\(Recharge [\d–-]+\)/.test(e.name ?? '')) && /\d+ \(\d+d\d+/.test(e.text ?? ''));
  const roles = rolesFor(archetype);
  const engines = sheetEngines(sections);
  // a template that SUPERSEDES a row on this sheet replaces that row's engine
  // family rather than doubling it: the returning throw IS what Hurled Weapon
  // rewrites, so the family it constitutes cannot exclude it (the lancer's
  // donor row said "throws", goldens 2026-09-22)
  const supersedesRow = (t) => t.supersedes instanceof RegExp && rows.some((e) => t.supersedes.test(e.text ?? ''));
  return TEMPLATES.filter((t) => t.roles.some((r) => roles.includes(r))
    && (!(EXCLUDE_ON[t.id] ?? []).some((fam) => engines.has(fam)) || supersedesRow(t))
    && (!style || t.styles.length === 0 || t.styles.includes(style))
    && cr >= t.cr_range[0] && cr <= t.cr_range[1]
    && (t.kind !== 'shape' || t.frames[band])
    && (!t.requires_movement || new RegExp(t.requires_movement, 'i').test(movement))
    && (!t.requires_style || t.requires_style === style) // a ward-shaped reaction needs the warden seat, not just a defender line
    && !(t.deny_types && type && t.deny_types.some((ty) => new RegExp(`^${ty}\\b`, 'i').test(String(type))))
    && !(t.requires_row instanceof RegExp && rows.length && !rows.some((e) => t.requires_row.test(e.text ?? '')) && !(t.keys ?? []).some((k) => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(readPhrases(String(concept ?? ''))))) // a body-plan filter: a hurled weapon needs something to throw — a thrown/ranged row on the sheet, or a weapon the USER's words name (the armor's lance; never the gong) // a body trait is a BODY's: contact damage on a Humanoid pirate queen read her name as brine (critic, new lines 2026-09-28)
    && (!section || t.section === section)
    && triggerCompatible(trigger, t.trigger)
    && !(text && deniedBy(t, text).length)
    && !(REQUIRES_IMPOSED.has(t.id) && Array.isArray(imposed) && !imposed.length)
    // a rider needs its host row on the sheet (a ranged rider was offered to a phantom with no ranged row)
    && !(t.host && rows.length && !rows.some((e) => (t.host === 'ranged' ? /Ranged Attack Roll/ : /Melee Attack Roll/).test(e.text ?? '')))
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
export const UTILITY = new Set(['zone-seed', 'focus', 'feint-slip', 'phase-slip', 'rally', 'reveal', 'coating', 'volley-order', 'self-invisibility']);
// BLIND-DEALABLE (goldens 2026-09-22: a bull was dealt "Hooked Lash", a vault
// "Hurled Weapon"): a seed with no verb earned is dealt only where its fiction
// is any-body — a curse or a bolt is any caster, a bellow or a shove is any
// brute, a hook, a shell, a thrown weapon, a lure are nobody's blind. Closed
// authored metadata, like `nova` and UTILITY: absent = never blind.
const ALL = 'all';
export const BLIND_ROLES = {
  'condition-payoff': ALL, execute: ALL, 'gaze-single': ALL, rampage: ALL, 'burrow-ambush': ALL, charge: ALL, 'thrown-burst': ALL,
  affliction: ALL, contagion: ALL, pounce: ALL, isolation: ALL, snatch: ALL, 'bolt-restrain': ALL, 'bolt-drag': ALL, 'bolt-mark': ALL, 'ward-retaliation': ALL, interpose: ALL, riposte: ALL, 'snap-shot': ALL, 'ground-burst': ALL,
  seal: ['controller', 'artillery'],
  'escalating-dread': ALL, 'terror-pulse': ALL, 'sensory-strike': ALL, disarm: ALL, 'push-prone': ALL, herd: ALL, 'own-turn-punisher': ALL, exploiter: ALL,
  'aggro-curse': ['caster'], pacify: ['caster'], 'snare-bolt': ['caster'], 'slow-bolt': ['caster'], drain: ['caster', 'lurker'], 'delayed-brand': ['caster'], 'curse-debt': ['caster'], 'blighted-ground': ['caster'],
};
export const blindDealable = (t, archetype) => { const b = BLIND_ROLES[t.id]; return b === ALL || (Array.isArray(b) && b.some((r) => rolesFor(archetype).includes(r))); };
export function fallbackMenu(ctx, verbText = '', ideaText = '') {
  // seeds AND flavor-free shapes render blind; a shape that needs the model's
  // fiction cannot (the preacher: the bound seal shape lost the fallback to a
  // seed with a weaker verb because only seeds were eligible)
  // a NOVA is a whole-round ability; the fallback stands in for ONE attack —
  // Crushing Leap was dealt blind to a vault and a lantern assassin (2026-09-22)
  const legal = templatesFor({ ...ctx, section: 'action', trigger: null }).filter((t) => t.section === 'action' && !t.nova)
    .concat(templatesFor({ ...ctx, section: 'bonus_action', trigger: null }));
  // the fallback obeys the VERB too: a concept-verb seed first, then any
  // verb-matched seed, then the non-utility rest in hash order
  // the same two tiers as the fit: the user's own words are the concept, the
  // seat element is idea-level prose (a "straight-line charge" dealt the bull
  // a hook, goldens 2026-09-22)
  const ranked = rankByVerb(legal, verbText, ideaText);
  const byVerb = ranked.filter((r) => r.concept.length).map((r) => r.t).concat(ranked.filter((r) => !r.concept.length && r.idea.length).map((r) => r.t));
  const rest = ranked.filter((r) => !r.matched.length && !UTILITY.has(r.t.id) && blindDealable(r.t, ctx.archetype)).map((r) => r.t);
  return [...byVerb, ...rest];
}

const noDigits = (s) => !/\d/.test(s);
// a fill that repeats a verb of the frame's own clause doubles it ("begins
// gathering destructive power, gathering itself" — the cauldron's wind-up,
// 2026-09-28): the fill's first word against the six frame words before the slot
const doublesFrameVerb = (text, k, fill) => {
  const before = String(text.split(`{${k}}`)[0]).toLowerCase().split(/[^a-z]+/).filter(Boolean).slice(-6);
  const first = String(fill ?? '').trim().toLowerCase().split(/[^a-z]+/)[0] ?? '';
  return first.length >= 5 && before.some((w) => w.length >= 5 && w.slice(0, 5) === first.slice(0, 5));
};
const shortFlavor = (s) => typeof s === 'string' && s.trim().split(/\s+/).length <= 8 && noDigits(s) && !/saving throw|damage|condition|DC\b/i.test(s);

/**
 * Render one template at this sheet's numbers. Returns null when a slot
 * cannot be filled (a miss, never a half-filled row).
 * ctx: { scaled, energy, mix, meleeName, conditionMinor, projectile, archetype, imposed, mechanics, cr, name }
 */
// generic fills for a BLIND render (the fallback): the fiction is plain, never wrong
const BLIND_FILLS = { phobia: 'the thing it fears', restraint: 'the binding', /* the snare's object noun: an empty slot printed "Restrained until the Restrained is destroyed" (critic's blockers audit 2026-10-03) */ douse: 'tear the brand away', projectile: 'a hurled object', wound_noun: 'wound', zone_effect: 'a choking haze', zone_rule: 'has Disadvantage on attack rolls', disguise: 'an ordinary object', shell: 'its shell', telegraph: 'its whole frame tensing', lure_source: 'the creature', hook: 'its grip', terrain: 'mud', sense_target: 'moving creatures', anchor: 'its resting place', ward: 'its ward' }; // sense_target is the neutral sense: a rejected fill on a hound printed "precious metal" (the fourteen, 2026-09-28)
// THE RAY TABLE is composed from library cards, never authored (critic 2026-10-01): each
// ray takes its save and its failure clause from a bolt or pulse card already on the
// shelf; the names are the engine's own. A band of 3-5 rolls a d4 over the first four.
const RAY_SOURCES = [
  { name: 'Numbing Ray', seed: 'slow-bolt' }, { name: 'Binding Ray', seed: 'snare-bolt' }, { name: 'Blinding Ray', seed: 'sensory-strike' },
  { name: 'Dread Ray', shape: 'gaze-single' }, { name: 'Shoving Ray', seed: 'push-prone', damage: 'Force' } /* two of six rays deal damage — print's Beholder has three of ten (rerun 2026-10-03) */, { name: 'Withering Ray', seed: 'drain', damage: 'Necrotic' },
];
export function composeRayTable(band) {
  const n = band === '3-5' ? 4 : 6;
  return RAY_SOURCES.slice(0, n).map((r, i) => {
    const src = r.seed ? LIBRARY_SEEDS.find((x) => x.key === r.seed)?.text : SHAPES.find((x) => x.id === r.shape)?.frames?.[band] ?? SHAPES.find((x) => x.id === r.shape)?.frames?.['6-9'];
    const stat = /\*(\w+) Saving Throw/.exec(src ?? '')?.[1] ?? 'Dexterity';
    let clause = (/\*Failure:\*\s*([^]*?)(?:\s*\*Success:\*[^]*)?$/.exec(src ?? '')?.[1] ?? '').trim();
    clause = clause.replace(/, and the creature regains Hit Points[^.]*\./, '.').replace(/\{burst\}/g, '{avg_half} ({dice_half})').replace(/\{damage_type\}/g, r.damage ?? '{damage_type}');
    // a random table wants rows of roughly equal worth: a CONDITION ray carries no damage clause (Dread Ray was 45 + Paralyzed beside four bare conditions, critic 2026-10-01)
    if (!r.damage) clause = clause.replace(/\{avg[a-z_0-9]*\} \(\{dice[a-z_0-9]*\}\) \{?[A-Za-z_]+\}? damage(?:,? and )?/g, '').replace(/^\s*[,.]\s*/, '').replace(/^the target/i, 'The target');
    if (r.damage && !/\{avg/.test(clause)) clause = `{avg_half} ({dice_half}) ${r.damage} damage, and ${clause.charAt(0).toLowerCase()}${clause.slice(1)}`; // a damaging ray whose card carries no damage clause (the Shoving Ray's push-prone) leads with the damage
    if (!/[.!?]$/.test(clause)) clause = `${clause}.`;
    return `${i + 1} — ${r.name}: *${stat} Saving Throw*: DC {dc}. *Failure:* ${clause}`;
  }).join(' ');
}
export function renderTemplate(t, ctx, fills = {}, { blind = false } = {}) {
  // the fiction ladder: the model's fill > the sheet's own noun > the blind
  // default; an empty fills object cost four signatures (critic, 2026-09-22)
  // the terrain of a FORCED bind is the concept's, not the blind default (an ice
  // goat's Sure Footing printed "composed of mud", 2026-09-28)
  const TERRAIN_OF = [[/\b(?:ice|icy|snow|frozen|freez|glacier|rime|frost)/i, 'ice or snow'], [/\b(?:mire|bog|swamp|marsh|fen|mud)/i, 'mud'], [/\b(?:sand|dune|desert)/i, 'sand'], [/\b(?:rubble|scree|shale|broken stone)/i, 'rubble'], [/\b(?:webs?|silk)\b/i, 'webs'], [/\b(?:ash|cinder|ember)/i, 'ash'], [/\b(?:thicket|bramble|briar|undergrowth)/i, 'undergrowth']];
  const terrainOf = (TERRAIN_OF.find(([re]) => re.test(String(ctx.concept ?? ''))) ?? [])[1];
  fills = { ...BLIND_FILLS, ...(terrainOf ? { terrain: terrainOf } : {}), ...(ctx.projectile ? { projectile: ctx.projectile } : {}), ...Object.fromEntries(Object.entries(fills).filter(([, v]) => typeof v === 'string' && v.trim())) };
  void blind;
  const { scaled } = ctx;
  if (t.kind === 'seed') {
    const drawn = drawLibraryRow(scaled, { archetype: ctx.archetype, energy: ctx.energy, mix: ctx.mix, name: ctx.name ?? '', shapeKey: t.key, imposed: ctx.imposed ?? [], mechanics: ctx.mechanics ?? null, cr: ctx.cr });
    if (!drawn || drawn.seed !== t.key) return null; // the seed was not legal on this sheet
    let text = drawn.row.text;
    for (const k of FLAVOR_SLOTS) {
      if (!text.includes(`{${k}}`)) continue;
      // the same ladder as a shape: a fill the bound rejects falls to the blind
      // default, never to a miss (the ledger's Delayed Brand died on its douse, fresh two)
      const v = shortFlavor(fills[k]) && !doublesFrameVerb(text, k, fills[k]) ? fills[k] : BLIND_FILLS[k];
      if (!shortFlavor(v)) return null;
      text = text.split(`{${k}}`).join(v.trim());
    }
    if (/\{[a-z_]+\}/.test(text)) return null;
    return { name: t.name, text, section: SECTION_OF[t.section], gate: t.gate };
  }
  const projWeaponRange = (() => { const fr = t.frames?.[bandFor(ctx.cr)] ?? ''; if (!/\{projectile\}/.test(fr)) return null; const pj = String(fills.projectile ?? ''); const row = [[/\bjavelins?\b/i, '30/120'], [/\bspears?\b/i, '20/60'], [/\b(?:daggers?|knives|knife)\b/i, '20/60'], [/\btridents?\b/i, '20/60'], [/\bdarts?\b/i, '20/60'], [/\b(?:hand)?axes?\b/i, '20/60'], [/\b(?:light )?hammers?\b/i, '20/60']].find(([re]) => re.test(pj)); return row ? row[1] : null; })();
  let text = t.frames[bandFor(ctx.cr)];
  if (!text) return null;
  if (projWeaponRange) text = text.replace(/range \d+\/\d+ ft\./, `range ${projWeaponRange} ft.`);
  const per = Math.max(3, Math.round(scaled.per_hit ?? 6));
  // an ATTACK-ROLL frame prices like the chassis's attack rows — dice plus the striker's mod (print's Hill
  // Giant hurls a boulder for 20 (3d10 + 4); the hollow lancer's lance flew for 18 (4d8), goldens 2026-10-03);
  // a save frame stays dice-only
  const atkMod = Math.floor(((scaled.stats?.[scaled.striker_stat ?? 'STR'] ?? 10) - 10) / 2); // the same striker the chassis's rows and the reader's recompute follow (scale.mjs)
  const full = /\{atk\}/.test(text) && atkMod > 0 ? attackDamageDiceFor(per, Math.min(atkMod, per - 1)) : saveDamageDiceFor(per);
  const half = saveDamageDiceFor(Math.max(2, Math.round(per / 2)));
  const dbl = saveDamageDiceFor(per * 2); // condition-payoff's {avg_x2} — unrendered on the blind read's drowned knight
  // a SOLID breath is physical whatever the body's energy: glass shards cut, bone
  // splinters pierce, salt and stone bruise (the slagmaw breathed shards as Fire, 2026-09-28)
  const SOLID_BREATH = [[/\b(?:glass|shards?|blades?|razors?)\b/i, 'Slashing'], [/\b(?:bones?|nails?|needles?|splinters?|spines?|thorns?|quills?)\b/i, 'Piercing'], [/\b(?:salt|stones?|gravel|rubble|sand)\b/i, 'Bludgeoning']];
  const EARTH = /\b(?:earth|grave earth|grave-earth|soil|dirt|stones?|rock|rocks|gravel|rubble|sand|mud|clay|ground)\b/i; // a shockwave of grave earth bruises, whatever the body's energy (the barrow-wight's Necrotic burst, critic 2026-09-29)
  const breathClauses = String(ctx.concept ?? '').split(/[.;,]|\s+(?:and|but)\s+/).filter((c) => /\b(?:breath|breathes?|breathing|exhales?|spews?|spits?|clouds?|cone|spray|belch(?:es)?|vomits?)\b/i.test(c)).join(' ') || String(ctx.concept ?? ''); // a SOLID breath is read from the breath's own clause — "Her nails are long and black" made a cloud of ash deal Piercing (Grandmother Ash, the critic's species read)
  const solid = t.id === 'spew' ? (SOLID_BREATH.find(([re]) => re.test(breathClauses)) ?? [])[1]
    : t.id === 'ground-burst' && EARTH.test(String(ctx.concept ?? '')) ? 'Bludgeoning' : null;
  const stomping = t.id === 'ground-burst' && /\b(?:stomps?|stamps?|slams? the ground|quake|tremor|earthquake)\b/i.test(String(ctx.concept ?? '')); // print's ground slam knocks Prone
  const obscuring = t.id === 'spew' && /\b(?:ash|ashes|smoke|dust|sand|soot|cinders|spores|chaff)\b/i.test(String(ctx.concept ?? '')); // an OBSCURING breath blinds — the pyre's ash cone poisoned (critic, fresh six)
  const dtype0 = solid ?? (ctx.mix === 'physical' || !ctx.energy ? (PHYSICAL.includes(fills.damage_type) ? fills.damage_type : 'Bludgeoning') : ctx.energy);
  const PROJECTILE_WEAPON = [[/\bjavelins?\b/i, 'Piercing', '30/120'], [/\bspears?\b/i, 'Piercing', '20/60'], [/\b(?:daggers?|knives|knife)\b/i, 'Piercing', '20/60'], [/\btridents?\b/i, 'Piercing', '20/60'], [/\bdarts?\b/i, 'Piercing', '20/60'], [/\b(?:hand)?axes?\b/i, 'Slashing', '20/60'], [/\b(?:light )?hammers?\b/i, 'Bludgeoning', '20/60']];
  const projWeapon = /\{projectile\}/.test(t.frames?.[bandFor(ctx.cr)] ?? '') ? PROJECTILE_WEAPON.find(([re]) => re.test(String(fills.projectile ?? ''))) : null; // a thrown NAMED weapon keeps its own type and range (a spear hurled for Bludgeoning at 30/120 — the critic's second species read)
  const dtype = projWeapon ? projWeapon[1] : t.id === 'spew' && !solid && PHYSICAL.includes(dtype0) ? (ctx.energy && !PHYSICAL.includes(ctx.energy) ? ctx.energy : 'Poison') : dtype0; // a spewed cloud is never a weapon type: it takes the concept's energy or Poison (Noxious Spew dealt Piercing from a cloud of ash — the critic's species read)
  const engine = { ray_table: t.id === 'random-ray' ? composeRayTable(bandFor(ctx.cr)) : '', /* first: the composed table carries {dc} and damage slots the keys below fill */ dc: String(scaled.dc), atk: `+${scaled.atk}`, avg: String(full.avg), dice: full.dice, avg_half: String(half.avg), dice_half: half.dice, avg_x2: String(dbl.avg), dice_x2: dbl.dice, damage_type: dtype, melee_name: ctx.meleeName ?? 'Slam', ranged_name: ctx.rangedName ?? 'Longbow' };
  for (const [k, v] of Object.entries(engine)) text = text.split(`{${k}}`).join(v);
  if (obscuring) text = text.replace('has the Poisoned condition', 'has the Blinded condition'); // the Poison-breath frame's own rider, retyped for what ash does
  if (stomping) text = text.replace(/ damage\. \*Success:\* Half damage\.$/, ' damage, and the target has the Prone condition. *Success:* Half damage only.');
  // THE SAVE FOLLOWS THE CONDITION on a condition aura (critic fresh four: Stench
  // is Con on the toad and became Wis on the kilnblight — the stat drifted to the
  // caster's spell stat). Print: Poisoned/Deafened = Constitution, Frightened =
  // Wisdom, Prone = Strength. Engine-owned; the model's proposal is overruled.
  if (text.includes('{save_stat}') && text.includes('{condition_minor}')) {
    const CONDITION_SAVE = { Poisoned: 'Constitution', Deafened: 'Constitution', Frightened: 'Wisdom', Prone: 'Strength', Blinded: 'Constitution' };
    const proposedC = String(fills.condition_minor ?? '').trim();
    const condPick = MINOR.find((x) => x.toLowerCase() === proposedC.toLowerCase()) ?? (MINOR.includes(ctx.conditionMinor) ? ctx.conditionMinor : 'Frightened');
    fills = { ...fills, condition_minor: condPick, save_stat: CONDITION_SAVE[condPick] };
  }
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
    const v = shortFlavor(fills[k]) && !doublesFrameVerb(text, k, fills[k]) ? fills[k] : BLIND_FILLS[k];
    if (!shortFlavor(v)) return null;
    text = text.split(`{${k}}`).join(v.trim());
  }
  if (/\{[a-z_]+\}/.test(text)) return null;
  return { name: t.name, text, section: SECTION_OF[t.section], gate: t.gate };
}

// SEAT DEFAULTS (critic run four): some seats OWE a trait by print — the 2024
// Assassin has Assassinate whatever else it does. When the trait seat misses
// on such a seat, the default renders blind; when it fits, the fit wins.
// a CLAIMED MECHANIC owes a trait the way a seat does (critic: both gaze concepts rendered no gaze — the action form floored; the trait form is free)
export const MECHANIC_OWED_TRAIT = { gaze: ['gaze-aura'] };
export const SEAT_DEFAULT_TRAIT = { phantom: [], skulker: ['assassinate', 'evasion'], trap: ['false-appearance'], warden: ['interpose'], lurker: ['assassinate'] }; // a LIST: print's composition for the seat, not one row (the 2024 Assassin carries Assassinate AND Evasion — critic, the fourteen) // keyed by style, else by family (the plain stalker seat owes Assassinate too)

// ---------------------------------------------------------------- the two calls

/** The verbs the concept itself names, across the whole catalog (not menu-limited) — the idea's brief. */
export function conceptVerbs(conceptText) {
  return [...new Set(rankByVerb(TEMPLATES, conceptText).flatMap((r) => r.concept))];
}

export function buildIdeaPrompt({ name, cr, concept, sheetLines, seats = null, energy = null, wantTrait = true, engines = [], verbs = [] }) {
  return `You are inventing the SIGNATURE ability for a nearly-complete D&D monster. Everything below is already final. Describe the ability in PLAIN WORDS — what it does, when it fires, whom it affects, what limits it. NO rules grammar, NO numbers, NO dice, NO DCs, NO condition names in capitals: the engine owns every number and will pour your idea into a printed rules shape afterwards. Your job is the IDEA a fan would riot to find missing.
THE SHEET SO FAR (${name}, CR ${cr}) — everything already on it, header and rows:
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

export function buildFitPrompt({ name, idea, menu, cr, concept = '', sheet = null }) {
  const ranked = rankByVerb(menu, concept, idea.idea);
  const lines = ranked.map(({ t, concept: cv, idea: iv }) => {
    const matched = [...cv.map((k) => `${k} (concept)`), ...iv.map((k) => `${k} (idea)`)];
    const flav = t.flavor.length ? ` — you fill: ${t.flavor.map((f) => `{${f}}`).join(', ')}` : '';
    const vocab = slotsOf(frameOf(t, cr)).filter((s) => VOCAB[s]).map((s) => `{${s}} ∈ ${VOCAB[s].join('/')}`);
    return `- ${t.id} [${SECTION_OF[t.section]}${t.gate ? `, ${t.gate}` : ''}]${matched.length ? ` VERB MATCH: ${matched.join(', ')}` : ''}: ${frameOf(t, cr).replace(/\*/g, '')}${flav}${vocab.length ? ` — choose: ${vocab.join('; ')}` : ''}`;
  }).join('\n');
  return `A monster's signature ability has been described in plain words. Pour it into ONE of the printed rules templates below, or say none fits. The template's rules are FIXED; the engine fills every {slot} shown in braces except the ones marked "you fill". Do not rewrite the template.
MONSTER: ${name} (CR ${cr})${sheet ? `\nTHE SHEET SO FAR — read it before you pick; a save stat, a damage type, a reach all come from here:\n${sheet}` : ''}
THE IDEA (${idea.section} / ${idea.trigger} / ${idea.effect}): ${idea.idea}
TEMPLATES:
${lines}
THE VERB DECIDES. The concept has a central verb — seal, lure, stick, toll, drown, drag. Templates are listed best-match first; a VERB MATCH marked (concept) means the template's own verb is in the user's words and outranks everything; (idea) means only your invented description used it. Never pick a template with no verb match over one that has a (concept) match. Pick the template whose rules genuinely CARRY the idea — the same verb, the same target, the same kind of effect, the same moment. If the idea is one of these templates PLUS an extra clause, take the template — the extra is fiction the name can carry. A template that merely resembles it does not fit; answer "none" then, honestly — a miss is logged and a template gets written. Name the ability in Monster Manual register: two words, three at most, never a description, and never the creature's own name ("Wax Preacher's Sermon" is a label, "Sealing Sermon" is a name).
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
const WORTH_AN_ATTACK = /\b(?:Restrained|Grappled|Charmed|Paralyzed|Stunned|Incapacitated|Petrified)\b|can't regain Hit Points.{0,40}(?:1 minute|repeat)|drops to 0 Hit Points|it dies\b/; // a threshold kill is the payload (the Wail climbed to 104 dice because its kill clause read as nothing, fresh three)
const MINOR_EFFECT = /\b(?:Frightened|Deafened|Blinded|Poisoned|Prone)\b|Disadvantage|pulled|pushed|Speed is (?:halved|0)/;
const DMG = /(\d+) \((\d+d\d+(?:\s*\+\s*\d+)?)\)/;
export function multiattackShape(sections = {}) {
  const ma = Object.values(sections).flat().find((e) => /^Multiattack/i.test(e.name ?? ''));
  const words = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const m = /makes (one|two|three|four|five)/i.exec(ma?.text ?? '');
  return { attacks: m ? words[m[1].toLowerCase()] : 1, present: !!ma };
}
export function rowValue(text, perHit, { area = false } = {}) {
  // only the PAYLOAD counts: a condition in the targeting frame ("one creature
  // that is Grappled") is a prerequisite, not something the row applies (the
  // exploiter read 31.9 and was gated on every caged sheet, 2026-09-22)
  const payload = /\*Failure:\*/.test(text) ? text.slice(text.indexOf('*Failure:*')) : text;
  const d = DMG.exec(payload);
  const avg = d ? Number(d[1]) : 0;
  const half = /\*Success:\*\s*Half/i.test(text);
  let ev = P_FAIL * avg + (half ? (1 - P_FAIL) * avg / 2 : 0);
  // on an AREA nova any condition is a hit's worth — it lands on the whole party
  if (WORTH_AN_ATTACK.test(payload) || (area && MINOR_EFFECT.test(payload))) ev += P_FAIL * perHit;
  else if (MINOR_EFFECT.test(payload)) ev += P_FAIL * perHit * 0.25;
  // Advantage / Disadvantage on an attack is worth about a quarter of it (critic: ~+4 on an 18-damage attack)
  if (/\b(?:Advantage|Disadvantage)\b/.test(payload)) ev += 0.25 * P_HIT * perHit;
  // repositioning is worth about 0.3 of an attack (a blink that escapes and re-places is the concept on a hider — the value model deleted it, critic run three)
  if (/teleports? up to|moves? up to (?:half )?its Speed|takes the (?:Dash|Disengage) action|without provoking Opportunity Attacks/i.test(text)) ev += 0.3 * P_HIT * perHit;
  // an attack GRANT is worth the attack it grants (the riposte, the guardian's
  // answer: "makes one X attack" read 0 and every reaction sat under the floor)
  if (/makes? one [\w' -]+ attack(?: roll)?\b/i.test(text)) ev += P_HIT * perHit; // an ally grant ("can take a Reaction to make one ranged attack roll") is an attack grant too (the volley order, 2026-09-29)
  return { ev, avg, half, hasDamage: !!d };
}
/**
 * @returns {{ text, name, ev, floor, replaced, steps: string[] }}
 */
// PRINT'S BREATH SCALE (critic fresh four: a 2/Day field climbed 19 -> 97 at CR
// 14 — "a gate doesn't license unlimited dice"): young dragons breathe ~5.5x CR
// (38-54 at CR 6-10), adults ~4x (54-66 at 13-17), ancients ~3.8x (77-91 at
// 20-24). No nova's dice climb past this line, gate or no gate.
export const NOVA_CAP = (cr) => Math.round(cr <= 10 ? 5.5 * cr : 4 * cr + 15);
export function valueCheck(row, { scaled, sections, section, cr = null, noGate = false }) {
  const perHit = Math.max(3, Math.round(scaled.per_hit ?? 6));
  const attackEV = P_HIT * perHit;
  const gated = /\((?:Recharge [\d–-]+|\d\/Day)\)/.test(row.name ?? '');
  const ma = multiattackShape(sections);
  // a bonus action is free (no trade — ceiling only); a gated action stands alone
  // A GATED NOVA fires ~1 round in 3 and must beat the round it replaces or a
  // DM skips the row: print prices breaths and bursts at 1.5–2.5x the
  // Multiattack (owner + critic, 2026-09-22). Floor 1.3x, ceiling 2.5x, and the
  // ladder's top rung is the NOVA budget (2x the round), not the attack's die.
  const maEV = attackEV * ma.attacks;
  const free = section === 'Bonus Actions' || section === 'Reactions';
  const replaced = free ? 0 : gated ? maEV : attackEV;
  const label = free ? `a ${section === 'Reactions' ? 'reaction' : 'bonus action'} (free)` : gated ? `the whole Multiattack (${ma.attacks} attacks)` : `one attack of ${ma.attacks}`;
  // a BONUS ACTION trades for nothing: no floor, no ladder, ceiling only (a gated
  // bonus action is not a nova — Bedrock Grasp 2/Day climbed to 45 dice, 2026-09-22)
  const bonus = section === 'Bonus Actions' || section === 'Reactions'; // a reaction's cost is the reaction, not an action: a free row too
  const floor = bonus ? 0.25 * attackEV : gated ? 1.3 * maEV : 0.8 * replaced; // a free row still has to DO something
  const ceiling = bonus ? 1.5 * attackEV : gated ? 2.5 * maEV : 1.5 * (replaced || attackEV);
  const area = /each creature/i.test(row.text);
  // an AREA nova earns its premium by TARGETS (the Adult Red's breath deals about
  // its Multiattack's damage to each creature in the cone) — its per-target
  // budget is the round's damage; a single-target nova takes 2x the round's EV
  const budget0 = gated ? (area ? Math.max(perHit, Math.round(ma.attacks * perHit)) : Math.max(perHit, Math.round(2 * maEV))) : perHit;
  const budget = gated && cr != null ? Math.min(budget0, Math.max(perHit, NOVA_CAP(cr))) : budget0;
  let text = row.text; let name = row.name; const steps = [];
  // MASS effects are priced by targets whether gated or not (the hermit's each-
  // creature lure read 11.6 as one target and should have gated, critic 2026-09-22)
  // a RECURRING tick ("at the start of each of its turns until it uses its action")
  // is worth about two turns and its die is print's small one (Fire Form 1d10 beside
  // a 10-point hit) — the thorn-wall's brand climbed to 6d6 a turn priced as one hit
  // (critic, new lines 2026-09-28)
  const recurring = /at the start of each of its turns until/i.test(text);
  const value = (t) => { const r = rowValue(t, perHit, { area }); const mult = (area ? AREA_TARGETS : 1) * (recurring ? 2 : 1); return mult === 1 ? r : { ...r, ev: r.ev * mult }; };
  let v = value(text);
  if (recurring && v.hasDamage && v.avg > Math.max(1, Math.round(perHit / 2))) {
    const tick = saveDamageDiceFor(Math.max(1, Math.round(perHit / 2)));
    text = text.replace(DMG, `${tick.avg} (${tick.dice})`); steps.push(`recurring tick ${v.avg} → ${tick.avg} (half a hit, priced by two turns)`); v = value(text);
  }
  // a DELAYED payload ("at the start of each of its turns", "if it was already
  // Frightened") has no immediate damage to halve — the half clause read as a
  // rule on nothing (the jurist's Creeping Dread, three sightings)
  const delayed = /\*Failure:\*[^]*?(?:at the (?:start|end) of (?:each of )?its (?:next )?turns?|each turn|every turn|if the target (?:was|is) already|if it was already)/i.test(text);
  if (v.ev < floor && v.hasDamage && !v.half && !delayed) { text = `${text.trim().replace(/[^.!?]$/, (c) => `${c}.`)} *Success:* Half damage only.`; steps.push('added Success: Half'); v = value(text); } // the sentence ends before the clause (a missing period, two runs)
  // a THRESHOLD KILL row is priced by its threshold, never by its dice: print's
  // Banshee wails for 3d6 and kills at the line (the choir's hymn climbed to 16d12)
  const kill = /drops to 0 Hit Points|it dies\b/.test(text);
  if (v.ev < floor && v.hasDamage && v.avg < budget && !kill && !recurring) {
    const full = saveDamageDiceFor(budget);
    text = text.replace(DMG, `${full.avg} (${full.dice})`); steps.push(`dice ${v.avg} → ${full.avg}${gated ? ' (nova budget)' : ''}`); v = value(text);
  }
  // FLOOR-AS-PRICER (step 6 opening; the austerity gate dropped a seed that could not be lifted — "Disarming Twist", "Driving Bellow"):
  // a DAMAGE row still under the floor is priced AT the floor, its die stepped past the per-hit budget as far as the ceiling and the
  // nova cap allow; a seed drawn into the slot is lifted the same way (seed-lift). A row with no damage keeps its logged step.
  let priced = false;
  if (v.ev < floor && v.hasDamage && !kill && !recurring && v.ev > 0) {
    const need = Math.ceil(v.avg * floor / v.ev); const limit = gated && cr != null ? Math.max(perHit, NOVA_CAP(cr)) : Math.floor(v.avg * ceiling / v.ev);
    const d = saveDamageDiceFor(Math.min(need, Math.max(limit, v.avg)));
    if (d.avg > v.avg) { const was = v.avg; text = text.replace(DMG, `${d.avg} (${d.dice})`); v = value(text); steps.push(`priced at the floor: dice ${was} → ${d.avg}${v.ev < floor ? ' (the cap binds; the cap is the price)' : ''}`); }
    else if (gated) steps.push('priced at the cap — the floor sits above the nova cap, so the cap is the price');
    priced = true;
  }
  if (v.ev < floor && !priced) steps.push(bonus ? 'a free row that does nothing (logged)' : 'still under — needs a condition from the worth-an-attack list (logged)');
  // a CONTROL row with no damage and no KO condition is print's ungated shape
  // (the dragons' Sleep/Slowing breaths) — the dead-control pass strips such a
  // gate anyway, so the value check never adds one (the rimehorn's Horrid
  // Display was priced as a nova, then ungated: two passes disagreeing, 2026-09-27)
  const controlOnly = !v.hasDamage && !WORTH_AN_ATTACK.test(text);
  // OVERSHOOT from a proposal scales DOWN to the ceiling first (the gong's 13d6
  // Prone follow-up was gated into a 45-damage Recharge row where an 18-damage
  // ungated exploiter had sat, critic 2026-09-29); a gate is for scale the
  // concept demands — when even a per-hit die would clear the ceiling
  if (v.ev > ceiling && !gated && section !== 'Traits' && !controlOnly && v.hasDamage && !kill && !recurring) {
    // the row's value is damage PLUS a condition's worth, so the scale is measured,
    // not assumed: step the dice down until the value clears the ceiling or the
    // die reaches one hit's worth
    const startAvg = v.avg; let cur = v.avg;
    for (let i = 0; i < 6 && v.ev > ceiling && cur > perHit; i += 1) {
      let next = Math.max(perHit, Math.floor(cur * ceiling / v.ev)); if (next >= cur) next = Math.max(perHit, cur - Math.max(1, Math.ceil(perHit / 2)));
      let d = saveDamageDiceFor(next); if (d.avg >= cur) d = saveDamageDiceFor(Math.max(perHit, cur - Math.max(1, Math.ceil(perHit / 2)))); // the die table rounds back up: step a half-hit instead
      if (d.avg >= cur) break;
      text = text.replace(DMG, `${d.avg} (${d.dice})`); v = value(text); cur = v.avg;
    }
    if (cur < startAvg) steps.push(`dice ${startAvg} → ${cur} (scaled down to the ceiling)`);
  }
  if (v.ev > ceiling && !gated && section !== 'Traits' && !controlOnly && noGate && v.hasDamage && !kill && !recurring) { // a nova already stands on the sheet: this row stays ungated and scales to the ceiling instead (the wyrm's Frozen Maw beside Freezing Breath, step 7 twelve)
    let cur = v.avg; for (let i = 0; i < 8 && v.ev > ceiling && cur > perHit; i += 1) { const d = saveDamageDiceFor(Math.max(perHit, Math.floor(cur * ceiling / v.ev))); if (d.avg >= cur) break; text = text.replace(DMG, `${d.avg} (${d.dice})`); v = value(text); cur = v.avg; }
    steps.push(`a nova already stands — kept ungated, dice to ${v.avg} at the ceiling`);
  } else if (v.ev > ceiling && !gated && section !== 'Traits' && !controlOnly) { name = `${name} (Recharge 5-6)`; steps.push('over the ceiling — gated Recharge 5-6'); }
  else if (v.ev > ceiling && !gated && section !== 'Traits' && controlOnly) steps.push('over the ceiling but a control row (no damage, no KO) — print leaves these ungated');
  return { text, name, ev: Math.round(v.ev * 10) / 10, floor: Math.round(floor * 10) / 10, replaced: label, steps };
}
