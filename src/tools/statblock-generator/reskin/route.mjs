/**
 * THE ROUTE CALL (owner, 2026-09-21: "let's do two calls. go").
 *
 * WHY THIS EXISTS: the old resolve asked the model for four independent
 * labels (archetype, style, body, mechanics) and none of them was the
 * decision we need — which DONOR LINE. The labels overlapped, contradicted
 * each other, and meant different things to the model than to us
 * ("controller" = holds people, to the model; = the caster family, to us).
 * A dozen belts in the Vue translated the model's semantics into ours after
 * the fact, and every new hallucination class needed a new belt.
 *
 * Now the model chooses FROM THE SHELF, by analogy to printed monsters it
 * knows, and must QUOTE the phrase of the input that earns each pick. The
 * engine verifies the quote against the input and discards what it cannot
 * find; a few hard vetoes (a living juggernaut) fall to the NEXT pick, never
 * to a plain line. Routing is a small closed-vocabulary call; the prose
 * (identity, lore, names) is a second call conditioned on the chosen line.
 *
 * The interface OUT of this module (archetype, style, body, mechanics,
 * resolvedType) is exactly what generateReskin already consumes — nothing
 * below resolve changes.
 */
import { readPhrases, rewritePI } from './lexicon.mjs';
import { DONORS } from './donors.mjs';

/** The shelf, in the order the model sees it. `role` is the menu label the saved monster records. */
export const LINES = [
  // ---- brute: hits hard up close, soaks damage, easy to hit
  { id: 'brute', family: 'brute', style: null, blurb: 'a plain bruiser — big weapon or big limbs, stands and trades, no trick', exemplars: 'Ogre, Hill Giant, Minotaur' },
  { id: 'brute-charger', family: 'brute', style: 'charger', blurb: 'runs prey down — a straight rush that hits hardest at the end, gores, tramples the prone', exemplars: 'Gorgon, Rhinoceros, Triceratops' },
  { id: 'brute-grappler', family: 'brute', style: 'grappler', blurb: 'a solid BODY that seizes and holds — jaws, coils, tentacles, a maw or cage that swallows, engulfs, smothers, or drags prey inside itself (a ghost that pulls you under is lurker-phantom)', exemplars: 'Roper, Giant Constrictor Snake, Otyugh, Purple Worm', implies: ['grapple', 'engulf'] },
  { id: 'brute-juggernaut', family: 'brute', style: 'juggernaut', blurb: 'a MADE thing — poured, forged, carved, or animated stone or metal; immune to being reshaped, breaks what it walks through', exemplars: 'Stone Golem, Iron Golem, Animated Armor (large)', made: true },
  { id: 'brute-regenerator', family: 'brute', style: 'regenerator', blurb: 'its wounds close as fast as they open — flesh, wax, or iron that reknits, regrows, or reassembles; only its bane stops it', exemplars: 'Troll, Hydra', implies: ['regeneration'] },
  // ---- skirmisher: mobile hit-and-run
  { id: 'skirmisher', family: 'skirmisher', style: null, blurb: 'a mobile hit-and-run attacker — pack tactics, dart in, dart out', exemplars: 'Wolf, Gnoll, Hobgoblin' },
  { id: 'skirmisher-mounted', family: 'skirmisher', style: 'mounted', blurb: 'a RIDER, or a beast carrying one — speed, momentum, ride-down attacks that carry it past the target; a lone charging beast with no rider is brute-charger', exemplars: 'Knight on a warhorse, Centaur, Wight cavalry' },
  { id: 'skirmisher-skulker', family: 'skirmisher', style: 'skulker', blurb: 'a bodied sneak — hides, strikes with advantage, vanishes; a living or solid creature, never a ghost', exemplars: 'Assassin, Doppelganger, Goblin Boss' },
  { id: 'skirmisher-hurler', family: 'skirmisher', style: 'hurler', blurb: 'a thrower — boulders, spears, nets, javelins, reeling lines; a physical creature that fights at range with its arm', exemplars: 'Hill Giant (rocks), Cyclops, a net-thrower', implies: ['thrown-weapon'] },
  { id: 'skirmisher-archer', family: 'skirmisher', style: 'archer', blurb: 'a SHOOTER — bows, crossbows, slings, darts; a creature whose primary attack is a missile it does not throw, and who keeps its distance', exemplars: 'Scout, Spy, a kobold sniper, a hobgoblin longbow line' },
  { id: 'skirmisher-shifter', family: 'skirmisher', style: 'shifter', blurb: 'a creature of TWO FORMS — a humanoid that becomes a beast or a hybrid, or a thing that wears other shapes; some attacks belong to one form only', exemplars: 'Werewolf, Weretiger, Doppelganger' },
  { id: 'skirmisher-winged', family: 'skirmisher', style: 'winged', blurb: 'a flyer — dives, swooping strikes, snatches and drops, attacks on the wing', exemplars: 'Griffon, Wyvern, Peryton' },
  // ---- lurker: fragile ambusher with a devastating opening strike
  { id: 'lurker', family: 'lurker', style: null, blurb: 'a stalker — invisible or hidden, one devastating opening strike, then the hide-cycle', exemplars: 'Invisible Stalker, Hunter Shark, Displacer Beast' },
  { id: 'lurker-phantom', family: 'lurker', style: 'phantom', blurb: 'an incorporeal dead or spectral thing — drifts through walls, drains the living, cannot bear the light; a ghost or spirit is ALWAYS this', exemplars: 'Ghost, Wraith, Specter, Shadow' },
  { id: 'lurker-trap', family: 'lurker', style: 'trap', blurb: 'it IS the ambush — a disguised, rooted, or attached thing that looks harmless or holds still until prey is close, then springs', exemplars: 'Mimic, Piercer, Gargoyle (perched), Trapper' },
  // ---- caster: the artillery / controller family
  { id: 'caster', family: 'caster', role: 'artillery', style: null, blurb: 'fragile ranged magic — bolts, blasts, a spell list, keeps its distance', exemplars: 'Mage, Archmage, Flameskull' },
  { id: 'caster-binder', family: 'caster', role: 'controller', style: 'binder', blurb: 'a hexer — curses, rays, and conditions over raw damage; wins by taking enemies\' actions away, not their Hit Points', exemplars: 'Green Hag, Night Hag, a witch or warlock' },
  { id: 'caster-warpriest', family: 'caster', role: 'artillery', style: 'warpriest', blurb: 'an armored battle-cleric or crusader — weapon strikes that carry holy or profane energy, prayers as war-gear', exemplars: 'Priest, War Priest, a paladin-shaped fiend' },
  // ---- defender: protects, punishes movement
  { id: 'defender', family: 'defender', style: null, blurb: 'a living soldier or bodyguard — shield, armor, holds the line, punishes anyone who moves past', exemplars: 'Knight, Guard Captain, Veteran' },
  { id: 'defender-leader', family: 'defender', style: 'leader', blurb: 'a COMMANDER whose signature is what it does for allies — an aura of authority, a parry, a captain who fights beside troops; a warlord, chieftain, captain, sergeant', exemplars: 'Hobgoblin Captain, Bandit Captain, Pirate Captain' },
  { id: 'defender-warden', family: 'defender', style: 'warden', blurb: 'a MADE or risen guardian bound to a charge — a construct sentinel or tomb-bound spirit that shields something specific with its own body', exemplars: 'Shield Guardian, Helmed Horror, a tomb golem', made: true },
  // ---- bodies: the body IS the chassis
  { id: 'swarm', family: 'swarm', body: 'swarm', style: null, blurb: 'a mass of small creatures (or small things) acting as one — occupies space, halves when bloodied', exemplars: 'Swarm of Insects, Swarm of Bats, Swarm of Ravens' },
  { id: 'ooze', family: 'ooze', body: 'ooze', style: null, blurb: 'an amorphous body — no fixed shape, corrodes or engulfs, squeezes through cracks; the body IS the ooze, not a coating or a mouthful', exemplars: 'Black Pudding, Gelatinous Cube, Ochre Jelly' },
  { id: 'dragon', family: 'dragon', body: 'dragon', style: null, blurb: 'a true dragon — breath weapon, flight, frightful presence, the whole kit in one body', exemplars: 'Adult Red Dragon, Young Green Dragon, Wyrmling', implies: ['breath'] },
];

const BY_ID = new Map(LINES.map((l) => [l.id, l]));
// THE VERB DECIDES THE SEAT (critic, fresh ten: "nouns are outranking verbs" —
// a glass ox that CHARGES went juggernaut, a goat that VOMITS a cloud went
// hurler, a hound that SURFACES BENEATH went trap). Same rule the signature
// already obeys: a line whose verbs appear in the user's words outranks a
// line picked on a noun. The nouns still pick the type and the material.
export const LINE_VERBS = {
  'brute-charger': ['charge', 'charges', 'gore', 'gores', 'run down', 'runs down', 'trample', 'tramples', 'ram', 'rams', 'stampede', 'barrels', 'thunders across'],
  'brute-grappler': ['grab', 'grabs', 'seize', 'seizes', 'hold', 'holds', 'swallow', 'swallows', 'engulf', 'crush', 'crushes', 'hug', 'hugs', 'squeeze', 'constrict', 'drags into', 'folds around', 'cage', 'cages', 'climbs in', 'climbs into', 'crawls in', 'falls in', 'falls into', 'whatever climbs', 'whatever falls', 'whoever climbs', 'cooks whatever', 'anything that enters', 'devours', 'feeds on', 'swallows whole', 'gulps down', 'eats whatever', 'eats anyone', 'eats anything', 'eats sheep', 'eats cattle', 'eats goats', 'eats men', 'eats travelers', 'eats children', 'eats the living', 'crab', 'crabs', 'scorpion', 'octopus', 'lobster', 'kraken'], // print's GRAPPLING BODIES: 2024 Giant Crab, Giant Scorpion, Giant Octopus all grapple on the attack row — a crab that "rules" fell to plain brute once the leader line was vetoed (golden 2026-09-28) // bare 'eats' read a goat that eats grave-flowers as an engulfer // "a hedge that eats sheep" never tripped the engulf read (critic, fresh six) // a thing you climb INTO is a container: the cauldron rolled juggernaut on 'iron' (golden 2026-09-28)
  'brute-regenerator': ['regenerate', 'regenerates', 'reknit', 'reknits', 'knits shut', 'regrow', 'regrows', 'heals its wounds'],
  'brute-juggernaut': ['unstoppable', 'immovable', 'grinds forward', 'smashes through', 'breaks through walls'],
  'skirmisher-mounted': ['horseman', 'horsemen', 'horsewoman', 'cavalier', 'lancer', 'dragoon', 'outrider', 'rides', 'riding', 'rider', 'ride down', 'rides down', 'astride', 'gallops', 'saddle', 'mounted on', 'on horseback', 'in the saddle'],
  'skirmisher-skulker': ['hides', 'hide', 'sneaks', 'stalks', 'ambushes', 'vanishes', 'slips away', 'strikes from hiding', 'unseen'],
  'skirmisher-hurler': ['hurl', 'hurls', 'throw', 'throws', 'lob', 'lobs', 'sling', 'slings', 'fling', 'flings', 'pelts'],
  'skirmisher-winged': ['swoop', 'swoops', 'dives', 'dive', 'flies', 'on the wing', 'snatches from above'],
  'skirmisher-archer': ['archer', 'archers', 'bowman', 'bowmen', 'longbow', 'shortbow', 'crossbow', 'crossbows', 'arrows', 'arrow', 'sniper', 'marksman', 'markswoman', 'sharpshooter', 'volley of arrows', 'picks off', 'nocks', 'shoots arrows', 'shoots an arrow'], // 'bolts'/'shoots' dropped: a hermit-mage whose BOLTS find them in the dark was routed off the caster line (golden 2026-09-28)
  'skirmisher-shifter': ['shape-shifts', 'shapeshifts', 'transforms into', 'turns into', 'becomes a', 'by night becomes', 'under the moon', 'werewolf', 'wererat', 'werebear', 'weretiger', 'wereboar', 'lycanthrope', 'two forms', 'takes the form', 'wears the shape', 'wears other faces', 'changes shape', 'sheds human form', 'sheds its form', 'sheds her form', 'sheds his form'], // 'doppelganger' is a print NOUN, not a verb — it routes by print canon (critic, new lines 2026-09-28)
  'defender-leader': ['commands', 'commanding', 'rallies', 'leads his', 'leads her', 'leads its', 'leads the', 'leads a', 'captain', 'warlord', 'chieftain', 'sergeant', 'at the head of', 'his troops', 'her troops', 'its troops', 'the troops', 'the warband', 'the company', 'lieutenant', 'commander', 'gives orders', 'barks orders', 'orders a', 'orders the', 'holds the line', 'hold the line', 'holds the shield line', 'holds the wall', 'holds the gate'], // bare 'leading'/'orders'/'general' routed a drifting hunger that was "leading" climbers astray (flow spec, 2026-09-28)
  lurker: ['surfaces beneath', 'erupts from', 'bursts from', 'rises from', 'strikes once', 'stalks', 'waits beneath', 'hunts by tremor', 'burrows'],
  'lurker-phantom': ['drifts', 'haunts', 'drowns', 'passes through walls', 'through walls', 'wails', 'possesses', 'incorporeal', 'climbs the chains at night', 'drowned', 'ghost', 'ghosts', 'wraith', 'spectre', 'specter', 'phantom', 'shade', 'apparition', 'revenant', 'poltergeist'], // + the BODY nouns: a drowned wife is a phantom by body, whatever the route model quotes (golden 2026-09-30: its quote was a paraphrase twice)
  'lurker-trap': ['lies in wait', 'disguised as', 'looks like', 'poses as', 'motionless until', 'snaps shut', 'pretends to be', 'mimics'],
  'caster-binder': ['curses', 'hexes', 'binds with', 'reads', 'foretells', 'pins with', 'dooms', 'marks with'],
  'caster-warpriest': ['blesses', 'prays', 'smites', 'consecrates', 'psalms', 'sermons', 'crusades', 'priest', 'priestess', 'cleric', 'acolyte'], /* job nouns: never an override on their own (the title rule) */
  caster: ['casts', 'conjures', 'calls down', 'hurls bolts', 'blasts', 'spells'],
  'defender-warden': ['guards', 'protects', 'sworn to', 'stands between', 'shields', 'bound to protect', 'wards'],
  defender: ['holds the line', 'keeps the line', 'shield wall', 'bodyguard', 'blocks', 'interposes', 'guards the', 'guards a', 'guards its', 'guards his', 'guards her', 'stands guard', 'guarding the', 'fighting style', 'fighting styles', 'trained in fighting', 'swordmaster', 'weapon master', 'blademaster', 'duelist', 'fencer', 'man-at-arms', 'knight', 'knights', 'paladin', 'cavalier', 'sentinel', 'legionary', 'hoplite'], // a trained martial style keys the martial line (Meshrin flipped defender → brute between runs — the critic's fourth read)
  dragon: ['dragon', 'dragons', 'wyrm', 'wyrms', 'drake', 'drakes'], // not 'dragonborn': a dragonborn is a Humanoid species, not a dragon body (a blue dragonborn knight was built on dragon-2 with a breath weapon and Fly 60 — species landing 2026-10-13) /* BODY nouns: a dragon is a dragon whatever the route model quotes (the storm dragon lost its body to a paraphrased quote, 2026-10-01) */
  // bodily-emission verbs are a SIGNATURE (a cloud, a spit), not a thrower's chassis — the plain skirmisher line
  skirmisher: ['vomits', 'spits', 'spews', 'belches', 'sprays', 'darts', 'harries', 'flits', 'nips'],
};
// HOMOGRAPHS (critic, two sightings 2026-09-27/28): a line verb that is also a
// common noun only counts where it READS as a verb. "whose hide crumbles" sent a
// rockslide to the skulker line (Dex 18, Stealth +12); "steals voices and mimics
// them" sent a magpie to the Mimic's trap line and gave a bird Adhesive Hide.
// Two guards, both narrow: a determiner or possessive in front makes the word
// the noun every time, and a verb that names a print CREATURE's own trick loses
// it when the concept names a different object.
// ONLY TRUE HOMOGRAPHS BELONG HERE. A noun that still names its own engine is
// not one: "unfolds into a cage of brass ribs" is a caging creature, and
// guarding 'cage' sent the clockwork bishop off its grappler line (goldens
// 2026-09-28). These two mean something else entirely as nouns — a hide is skin,
// a charge is the person you guard.
const NOUN_WHEN_OWNED = new Set(['hide', 'charge', 'archer', 'archers']); // "her archers" are a leader's troops, not the archer seat (the warchief, library round 2026-09-29)
const OF_PHRASE = /\b(?:of|from|by|for|to|with|under|beneath|over|against)\s+(?:a|an|the|his|her|its|their|some|that)?\s*(?:\w+\s+)?$/i;
const OWNED_BY = /\b(?:its|his|her|their|our|my|your|whose|the|a|an|this|that|each|every|one|two|three|four|several|many)\s+$/;
// "Mimic with voice, call, or song is the Harpy's lure, not the Mimic" (critic)
const VERB_DENY = { dragon: /\bhalf-dragons?\b/, dragons: /\bhalf-dragons?\b/, /* a half-dragon is its base creature's body (species landing 2026-10-13) */ mimics: /\b(?:voices?|sounds?|songs?|calls?|speech|words?|cries|tongues?)\b/ }; // "holds the line" and its kin are FIXED PHRASES now (lexicon.mjs readPhrases), rewritten before this table reads them
// SUBJECT INVERSION (critic, blind A/B 2026-09-28): "runs anyone who BLOCKS it
// off the cliff" — the verb after an indefinite head belongs to the ENEMY, and
// it routed a courier's ghost to the defender line. A verb inside a clause
// headed by anyone/whoever/those who/any creature that is not the creature's.
const ENEMY_SUBJECT = /\b(?:anyone|anybody|whoever|whomever|those|anything|whatever|everyone|everybody|someone|somebody|any (?:creature|one|foe|enemy|traveler|thing)|all)\s+(?:who|that|which)\s+(?:\w+\s+){0,2}$/i;
// KEY CLASSES (critic, library round 2026-09-29: the override logged "archers",
// "doppelganger" as the VERB that outranked the noun). A line key is a verb, a
// BODY noun (a crab grapples, a werewolf shifts — the body is the line), or a
// JOB noun (archer, captain, sergeant — a title the route model may weigh, but
// never a verb that overrides its pick). The override prints the key and its class.
const BODY_NOUNS = new Set(['horseman', 'horsemen', 'horsewoman', 'cavalier', 'lancer', 'dragoon', 'outrider', /* a rider IS mounted — the placeholder's Headless Horseman went phantom, critic form-ten 2026-10-01 */ 'crab', 'crabs', 'scorpion', 'octopus', 'lobster', 'kraken', 'werewolf', 'wererat', 'werebear', 'weretiger', 'wereboar', 'lycanthrope', 'drowned', 'ghost', 'ghosts', 'wraith', 'spectre', 'specter', 'phantom', 'shade', 'apparition', 'revenant', 'poltergeist', 'dragon', 'dragons', 'wyrm', 'wyrms', 'drake', 'drakes']);
const JOB_NOUNS = new Set(['archer', 'archers', 'bowman', 'bowmen', 'longbow', 'shortbow', 'crossbow', 'crossbows', 'arrows', 'arrow', 'sniper', 'marksman', 'markswoman', 'sharpshooter', 'volley of arrows',
  'captain', 'warlord', 'chieftain', 'sergeant', 'lieutenant', 'commander', 'his troops', 'her troops', 'its troops', 'the troops', 'the warband', 'the company', 'two forms', 'priest', 'priestess', 'cleric', 'acolyte']);
export const keyClass = (k) => (BODY_NOUNS.has(k) ? 'body' : JOB_NOUNS.has(k) ? 'noun' : 'verb');
/** Every line whose keys the text reads, with the first key that read and its class. */
const NEGATED_KEY = /\b(?:cannot|can't|can not|never|no longer|without|doesn't|does not|don't|do not|unable to|isn't|is not|not|lacks?|has no|have no|no)\s+(?:[a-z'-]+\s+){0,3}$/i;
export function verbHits(text) {
  const raw = readPhrases(String(text ?? '')).toLowerCase(); // fixed phrases first: "holds the line", "fire at will"
  const reads = (k) => {
    if (VERB_DENY[k]?.test(raw)) return false;
    const re = new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    for (let m = re.exec(raw); m; m = re.exec(raw)) {
      if (NOUN_WHEN_OWNED.has(k) && OWNED_BY.test(raw.slice(0, m.index))) continue;
      if (keyClass(k) !== 'verb' && OF_PHRASE.test(raw.slice(0, m.index))) continue; // "priest of a drowned god": the attribute inside an of-phrase modifies that noun, not the creature (critic 2026-10-01)
      if (ENEMY_SUBJECT.test(raw.slice(0, m.index))) continue;
      if (NEGATED_KEY.test(raw.slice(0, m.index))) continue; // "a wizard but he cannot cast any spells" routed to caster on "spells" (critic's step-5 read): a key inside a negation names what the creature LACKS
      return true;
    }
    return false;
  };
  return Object.entries(LINE_VERBS).map(([id, keys]) => { const hit = keys.filter(reads); const best = hit.find((k) => keyClass(k) === 'verb') ?? hit.find((k) => keyClass(k) === 'body') ?? hit[0] ?? null; return best ? { id, key: best, cls: keyClass(best) } : null; }).filter(Boolean);
}
export function verbLines(text) {
  const raw = readPhrases(String(text ?? '')).toLowerCase();
  const reads = (k) => {
    if (VERB_DENY[k]?.test(raw)) return false;
    const re = new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    for (let m = re.exec(raw); m; m = re.exec(raw)) {
      if (NOUN_WHEN_OWNED.has(k) && OWNED_BY.test(raw.slice(0, m.index))) continue;
      if (keyClass(k) !== 'verb' && OF_PHRASE.test(raw.slice(0, m.index))) continue; // "priest of a drowned god": the attribute inside an of-phrase modifies that noun, not the creature (critic 2026-10-01) // "its charge", "whose hide"
      if (ENEMY_SUBJECT.test(raw.slice(0, m.index))) continue;
      if (NEGATED_KEY.test(raw.slice(0, m.index))) continue; // "a wizard but he cannot cast any spells" routed to caster on "spells" (critic's step-5 read): a key inside a negation names what the creature LACKS // "anyone who blocks it" — the enemy's verb
      return true;
    }
    return false;
  };
  return Object.entries(LINE_VERBS).filter(([, keys]) => keys.some(reads)).map(([id]) => id);
}
// the model sometimes decorates an id ("brute-grappler (ooze?)", "Brute-Grappler",
// "brute grappler"): take the LONGEST shelf id that appears in what it wrote
const IDS_LONGEST_FIRST = [...BY_ID.keys()].sort((a, b) => b.length - a.length);
export function lineIdOf(raw) {
  const t = String(raw ?? '').toLowerCase().replace(/[_\s]+/g, '-');
  if (BY_ID.has(t)) return t;
  return IDS_LONGEST_FIRST.find((id) => new RegExp(`(?:^|[^a-z])${id}(?:$|[^a-z])`).test(t)) ?? null;
}
export const MADE_TYPES = ['Construct', 'Elemental', 'Undead', 'Plant', 'Ooze'];
const WARDEN_TYPES = [...MADE_TYPES, 'Celestial', 'Fiend'];
// THE TYPE VETO ON A LEADER IS RETIRED (critic's hold 5, 2026-10-15; the owner's
// ruling: a deterministic judgement about MEANING goes to a call).
//
// It read `['Beast', ...MADE_TYPES]` and dropped the GM's own clause: "a death
// knight who leads a cavalry of the damned" lost its leader line to "a Undead
// commands no troops". The route call had already read "leads a cavalry"; the
// list overruled it.
//
// print also contradicts it. Measured 2026-10-16: NINE print Beasts carry an
// ally-affecting row — Dire Wolf, Blood Hawk, Baboon, Giant Rat and the rest,
// because Pack Tactics IS an ally row. The veto was wrong on its own terms for
// the one type it most confidently excluded.
//
// print has no commanding Undead, Construct, Ooze or Plant — but that is print
// never happening to stat a death knight's cavalry, not a law. The call reads
// the words; the trace records what it read; the rate is measurable.
// a SWARM is a mass of many: the words must say so (a hermit who talks to crows came
// out as a Swarm of Tiny Humanoids with Beaks — day-one 2026-09-30)
const SWARM_WORDS = /\b(?:swarms?|swarming|flocks?|murder of|clouds? of|mass of|masses|hosts? of|plague of|shoals?|colony|colonies|hive|nest of|hordes?|hundreds|thousands|countless|myriad|legion of|carpet of|tide of|teeming)\b/i;
// a TRAP body is a thing that lies in wait (a mimic, a rug, a chest): a living
// person who SETS traps is not one (the kobold trapmaker drew False Form, day-one 2026-09-30)
const NOT_TRAP_TYPES = ['Humanoid', 'Beast', 'Giant', 'Fey', 'Celestial', 'Dragon'];
// a PHANTOM body is incorporeal: a living Humanoid cultist is not one (the kuo-toa drew Fly 60 (hover) and the ghost's immunities, 2026-10-01)
const NOT_PHANTOM_TYPES = ['Humanoid', 'Beast', 'Giant', 'Plant', 'Construct', 'Dragon', 'Ooze'];
// NOR IS A BIG BODY INCORPOREAL (critic A2, measured 2026-10-18): print prints no
// incorporeal creature above Medium in either corpus — the Will-o'-Wisp is Small,
// the Ghost, Specter, Wraith and 2014's Banshee are Medium. A Gargantuan trench
// leviathan came back phantom ✓ and shipped Speed 5, Fly 60 (hover), Incorporeal
// Movement and reach 5. (Cloud and Storm Giants hover without being incorporeal,
// which is why the fact is Incorporeal Movement, never the hover.)
const NOT_PHANTOM_SIZES = ['Huge', 'Gargantuan'];
// an ARCHER shoots a named weapon: a lantern-mage whose "bolts find them in the
// dark" was picked for the archer line by the route model (golden 2026-09-29) —
// no bow, arrow, crossbow, sling or shot in the words, no archer seat ('bolts' is a caster's too)
const MAGIC_WORD = /\b(?:spell|spells|spellcast\w*|cast|casts|casting|magic|magical|arcane|sorcer\w*|wizard|witch|warlock|mage|magus|priest|priestess|cleric|acolyte|prays?|prayer|holy|divine|blessed|hex|hexes|hexed|curse|curses|cursed|ritual|incant\w*|enchant\w*|summon\w*|conjur\w*|necroman\w*|shaman|druid|oracle|seer|psychic|telepath\w*|eldritch|rune|runes|sigil|glyph|ward|wards|warding|miracle|channel|invoke|invokes|scroll|grimoire|tome|staff of|wand)\b/i; // a caster line needs one of these in the GM's words (the critic's fourth read)
const ARCHER_NOUN = /\b(?:bows?|longbows?|shortbows?|crossbows?|arrows?|quivers?|slings?|archers?|bowman|bowmen|marksman|markswoman|marksmen|sniper|sharpshooter|shoots?|shooting|nocks?|volley)\b/i;
export const EXTRA_MECHANICS = ['gaze', 'teleport', 'aura', 'breath', 'snare', 'thrown-weapon', 'grapple']; // 'summon' retired with the group templates (owner 2026-09-28): the tag opened the CR<=2 wildcard slot for a mechanic nothing renders
const TYPES = ['Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon', 'Elemental', 'Fey', 'Fiend', 'Giant', 'Humanoid', 'Monstrosity', 'Ooze', 'Plant', 'Undead'];

/** The family a user-picked menu role maps to (artillery and controller are the caster family). */
export function familyFor(menuRole) {
  if (!menuRole) return null;
  return menuRole === 'artillery' || menuRole === 'controller' ? 'caster' : menuRole;
}

const STOP = new Set(['the', 'and', 'that', 'its', 'with', 'from', 'into', 'onto', 'who', 'whom', 'which', 'when', 'until', 'then', 'than', 'this', 'their', 'them', 'they', 'for', 'off', 'out', 'over', 'under', 'his', 'her', 'has', 'have', 'are', 'was', 'not', 'but', 'any', 'all', 'one', 'own']);
const words = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ').filter((w) => w.length >= 3 && !STOP.has(w));

/**
 * A quote earns a pick when most of its content words appear in the input.
 * Not a substring test: the model paraphrases lightly ("drags cattle into
 * the bog" for "that drags cattle into the bog"), and a substring test would
 * discard honest quotes; a bag-of-words test discards invented ones.
 */
export function evidenceIn(because, text) {
  const q = words(because);
  if (!q.length) return false;
  const have = new Set(words(text));
  const hit = q.filter((w) => have.has(w)).length;
  return hit / q.length >= 0.6;
}

// RAISES THE QUESTION, DOES NOT ANSWER IT (owner, 2026-10-17: "we can use the
// keyword to modify the prompt so the llm can pay attention to the word unless
// and what it actually means"). A troll that "grows back unless the blade was
// silvered" kept print's Acid-or-Fire key and lost the GM's silver, because the
// bane reader only matched an "only X scours it" frame. Growing that frame is
// the word rule the ruling forbids; this only decides whether to ASK.
const WEAKNESS_FRAME = /\b(?:unless|except|only)\b/i;
export function buildRoutePrompt(text, { cr = null, menuRole = null } = {}) {
  const family = familyFor(menuRole);
  const shelf = LINES.filter((l) => !family || l.family === family)
    .map((l) => `- ${l.id} — ${l.blurb} (${l.exemplars})`).join('\n');
  return `Route this D&D monster concept onto ONE chassis from the shelf below. Choose by ANALOGY: which printed monsters does this concept play most like at the table? Every chassis is a hand-built template and the numbers are handled elsewhere — you are choosing the SHAPE of the fight, nothing else.

Concept: ${text}
${cr != null ? `Challenge Rating: ${cr}\n` : ''}${family ? `The combat role is FIXED by the user (${menuRole}) — the shelf below is already limited to it; choose among these only.\n` : ''}
THE SHELF (id — what it plays like — printed exemplars):
${shelf}${WEAKNESS_FRAME.test(readPhrases(String(text ?? ''))) ? `

A WEAKNESS CLAUSE — the words say this creature's healing or wholeness FAILS under some condition ("unless", "only", "except"). Answer "bane" with what actually stops it, and quote the user's words that say so. A bane is a damage type (Acid, Fire, Cold, Lightning, Thunder, Poison, Necrotic, Radiant, Psychic, Force) or a weapon material the rules know (silver, adamantine, cold iron). Read what the words MEAN: "unless the blade was silvered" is silver, not slashing; "only holy light closes the wounds" is Radiant. Leave "bane" out if the words name no such thing.` : ''}${(() => {
    const hits = verbHits(text).filter((h) => h.cls !== 'noun');
    if (!hits.length) return '';
    return `${false ? `

A WEAKNESS CLAUSE — the words say this creature's healing or wholeness FAILS under some condition ("unless", "only", "except"). Answer "bane" with what actually stops it, and quote the user's words that say so. A bane is a damage type (Acid, Fire, Cold, Lightning, Thunder, Poison, Necrotic, Radiant, Psychic, Force) or a weapon material the rules know (silver, adamantine, cold iron). Read what the words MEAN: "unless the blade was silvered" is silver, not slashing; "only holy light closes the wounds" is Radiant. Leave "bane" out if the words name no such thing.` : ''}

KEY WORDS THE ENGINE FOUND — say what each MEANS here ("cue_verdicts"). For each, answer "means": true if the word really names that chassis's mechanic for THIS creature, false if it is a figure of speech, a thing it carries or wears, or something done TO it. English hides these: "flies into a rage" is anger, not flight; a winged HELMET is not wings; "charges a fee" is not a charge; "grows back" is healing, not a plant.
A key marked (body) decides WHAT THE CREATURE IS MADE OF — a swarm of many, an amorphous mass, a true dragon, an incorporeal spirit. Answer false unless the body really is that thing: a waterlogged corpse that DRAGS people down by the ankles has hands and weight, so "drowned" does not make it an incorporeal spirit; a man with a crab's temperament is not a crab.
A key naming a mechanic the rules work on CREATURES is false when the user's words aim it at OBJECTS: a thief who swallows what she STEALS swallows loot, not people.
${hits.map((h) => `- "${h.key}" (${h.cls}) -> ${h.id} (${BY_ID.get(h.id)?.blurb ?? h.id})`).join('\n')}`;
  })()}

RULES
- A CUE YOU CONFIRM IS A PICK YOU MAKE. If you answer "means": true for a key word above, that key's chassis MUST appear among your picks. Confirming a cue and then ranking a different chassis is one answer contradicting itself; decide which it is and answer both fields the same way.
- Rank up to THREE picks, best first. For EACH pick, quote the phrase of the concept that earns it ("because") — copy the words as written. A pick you cannot quote for is a pick you should not make: the engine checks every quote against the input and discards picks it cannot find there.
- What the creature IS outranks what it DOES to its victims, and what it uses, hunts, wears, rides, or is compared to. An incorporeal or drowned dead thing that pulls, drags, or drowns the living is lurker-phantom, never brute-grappler: the grappler is a BODY that holds prey in its grip or inside itself. A troll-hunter is not a troll; a knight who rides a horse is mounted but not a beast; a sword forged by a golem is not a golem; a thing with a tar-slick mouth is not an ooze.
- brute-juggernaut and defender-warden are MADE or risen things (construct, elemental, undead, plant, ooze). Living flesh, however armored, takes another chassis.
- swarm, ooze, and dragon only when the BODY is that thing — a mass of many, an amorphous mass, a true dragon. lurker-phantom too: only when the body is INCORPOREAL. The drowned, the buried and the hanged are usually corpses that walk, and a corpse that drags people down by the ankles has hands and weight — pick it a body that can hold someone. A phantom drifts through a wall and cannot.
- A concept that holds, seizes, swallows, entombs, or folds shut around prey is brute-grappler however it is built — that chassis alone carries the containment engine. A thing that traps by LOOKING harmless is lurker-trap.
- creature_type from the concept's SUBSTANCE — what it physically is: animated objects and machines are Construct; remains or spirits of the dead are Undead; natural animals are Beast; fungus and vegetation are Plant; giants are Giant. Humanoid is the NPC type — a remade, fused, grown, or woven thing is a Monstrosity however upright it stands. Never type by vibe.
- extras: gated add-on mechanics the concept ITSELF shows, from: ${EXTRA_MECHANICS.join(', ')} — each with its own quote. Most concepts have none. Never list what would merely be cool.

WHAT ELSE DO THE WORDS NAME? Three more, each with the user's own words quoted in "because" (leave a field out if the words do not settle it):
- "shoots": true only when this creature's own attack is a BOW, CROSSBOW, SLING or a thrown shot at range — a sniper, an archer. False for one that merely watches from a distance, and false when its ranged power is magic or a breath.
- "is_a_swarm": true only when the creature IS a mass of many small things acting as one body. False for a creature that COMMANDS or is accompanied by animals, and false for one that merely resembles a crowd.
- "holds": true only when it HOLDS, seizes, swallows, entombs or folds shut around prey — a containment engine that keeps hold of a creature. Crushing someone against stones is impact, not holding; a creature that withdraws into its own shell holds nobody.

DOES THIS CREATURE WORK MAGIC? ("casts") True when the words name magic outright ("casts", "spells", "hexes") and ALSO when the KIND implies it: a cleric, a crusader who smites, a chaplain who blesses, a druid, a warlock. False for a plain warrior however armoured, false for a title alone, and false for a creature whose uncanny power is its BODY rather than a worked art — a fey piper's music, a gaze, a breath weapon. Quote the user's words that settle it in "because"; set "implied_by_kind" when nothing in the words says magic but the kind does.

Return ONLY JSON, no markdown: {"shoots": {"yes": false, "because": ""}, "is_a_swarm": {"yes": false, "because": ""}, "holds": {"yes": false, "because": ""}, "casts": {"yes": true, "because": "<the user's own words>", "implied_by_kind": false}, "bane": {"what": "<a damage type or a weapon material, or omit>", "because": "<the user's own words that say so>"}, "cue_verdicts": [{"key": "<a key word listed above, copied exactly>", "means": true, "because": "<the words that settle it>"}], "picks": [{"line": "<id from the shelf>", "because": "<phrase copied from the concept>"}], "cr": "<the Challenge Rating this creature reads as, 0 to 30 (e.g. 5, or 1/2) — print's own CR for a print creature; otherwise the tier a table meets it at — village and folklore threats read 1 to 8, only world-enders read 17 or more>", "creature_type": "<one of: ${TYPES.join(', ')}>", "size": "<Tiny|Small|Medium|Large|Huge|Gargantuan — the body these words describe>", "extras": [{"mechanic": "<one of the list>", "because": "<phrase copied from the concept>"}]}`;
}

function tryParse(raw) {
  try { return JSON.parse(String(raw).replace(/^```(?:json)?\s*|\s*```$/g, '').trim()); } catch { return null; }
}

/** Valid when at least one pick names a line on the shelf. Everything else is tolerated and vetted by chooseLine. */
export function validateRouteResponse(jsonString) {
  const p = tryParse(jsonString);
  return p != null && Array.isArray(p.picks) && p.picks.some((k) => lineIdOf(k?.line) != null);
}

/**
 * @returns {{ line, archetype, role, style, body, mechanics, resolvedType, notes: string[] }}
 *   archetype is the FAMILY generateReskin takes ('caster' for the caster
 *   lines); role is the menu label to record. line is null when nothing
 *   routed (the caller falls to its own default).
 */
export function chooseLine(parsed, { text, menuRole = null, rawText = null, path = null } = {}) {
  const notes = [];
  const family = familyFor(menuRole);
  const resolvedType = TYPES.includes(parsed?.creature_type) ? parsed.creature_type : null;
  const resolvedSize = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'].find((z) => z.toLowerCase() === String(parsed?.size ?? '').trim().toLowerCase()) ?? null;
  const noPhantom = () => (resolvedType && NOT_PHANTOM_TYPES.includes(resolvedType)) || (resolvedSize && NOT_PHANTOM_SIZES.includes(resolvedSize));
  const noPhantomWhy = () => (resolvedType && NOT_PHANTOM_TYPES.includes(resolvedType) ? `a ${resolvedType} has a body; a phantom has none` : `a ${resolvedSize} body is not incorporeal — print's incorporeals are Medium and smaller`);
  const picks = Array.isArray(parsed?.picks) ? parsed.picks.slice(0, 3) : [];
  let chosen = null;
  let quotedPick = false; // the call picked it AND its quote was found in the GM's words
  // The call's verdict on each key the engine found. Validated against the real
  // hits — a key the engine never saw cannot be voted on, and anything but an
  // explicit `means: false` leaves the key live.
  // DOES IT CAST — THE CALL ANSWERS, THE TABLE FALLS BACK (owner's ruling,
  // 2026-10-17). MAGIC_WORD asked "is there a magic word", a proxy for "does this
  // creature work magic", and the proxy failed on the two cases that matter: a
  // crusader who SMITES and a chaplain who BLESSES carry no listed word, so they
  // were refused the divine line and landed on martial chassis — Sister Elowen
  // on brute-regenerator with INT 6 and troll Regeneration.
  // Measured before the change, 5 samples on each of the five pins that defend
  // the gate: 35/35 correct. The call lets the crusader and the chaplain through
  // and still keeps out a dragonborn knight and a satyr piper, which is what the
  // gate was built for.
  // `null` means the call did not answer, and then MAGIC_WORD still decides.
  let castsAnswer = null;
  {
    const c = parsed?.casts;
    if (c && typeof c.yes === 'boolean') {
      const why = String(c.because ?? '').trim();
      if (!c.yes) { castsAnswer = false; notes.push('casts: the call reads no worked magic here'); }
      else if (c.implied_by_kind === true && why) { castsAnswer = true; notes.push(`casts: implied by the kind — "${why.slice(0, 40)}"`); }
      else if (why && evidenceIn(why, rawText ?? text)) { castsAnswer = true; notes.push(`casts: on the GM's own words "${why.slice(0, 40)}"`); }
      else notes.push(`casts refused: the call answered yes but ${why ? `quoted "${why.slice(0, 30)}", which is not in the GM's words` : 'offered no quote'} — the word table decides`);
    }
  }
  const noMagic = (t) => (castsAnswer === null ? !MAGIC_WORD.test(String(t ?? '')) : !castsAnswer);
  // THE LAST THREE DOORS (owner's ruling, 2026-10-17). ARCHER_NOUN, SWARM_WORDS
  // and "a mechanic engine needs a key" each asked whether a WORD is present as a
  // proxy for what the words mean. Measured on their own pin prompts, 5 samples
  // each: 55/55 once my own expectation was corrected — I had written the Bog
  // Troll's "crushes against the stones" as containment because the engine routed
  // it that way, and the critic's read shows that sheet shipped a Grappled rider
  // with nothing to grab. The call said false five times out of five.
  // Same contract as `casts`: an answer needs the GM's own words, and a `null`
  // leaves the word table deciding.
  const vet = (k) => {
    const a = parsed?.[k];
    if (!a || typeof a.yes !== 'boolean') return null;
    const why = String(a.because ?? '').trim();
    if (!a.yes) { notes.push(`${k}: the call reads none in these words`); return false; }
    if (why && evidenceIn(why, rawText ?? text)) { notes.push(`${k}: on the GM's own words "${why.slice(0, 40)}"`); return true; }
    notes.push(`${k} refused: the call answered yes but ${why ? `quoted "${why.slice(0, 30)}", which is not in the GM's words` : 'offered no quote'} — the word table decides`);
    return null;
  };
  const shootsA = vet('shoots'); const swarmA = vet('is_a_swarm'); const holdsA = vet('holds');
  const noBow = (t) => (shootsA === null ? !ARCHER_NOUN.test(String(t ?? '')) : !shootsA);
  const noMass = (t) => (swarmA === null ? !SWARM_WORDS.test(String(t ?? '')) : !swarmA);
  const rejectedCues = new Map();
  {
    const real = new Set(verbHits(text).map((h) => h.key));
    for (const v of Array.isArray(parsed?.cue_verdicts) ? parsed.cue_verdicts : []) {
      const k = String(v?.key ?? '').toLowerCase().trim();
      if (!real.has(k)) continue;
      if (v?.means === false) rejectedCues.set(k, true);
    }
  }
  let firstKnown = null;
  let bodyVetoed = false;
  for (const k of picks) {
    const id = lineIdOf(k?.line);
    const line = id ? BY_ID.get(id) : null;
    if (!line) { notes.push(`${String(k?.line ?? '?').slice(0, 30)}: not on the shelf`); continue; }
    if (line.id === 'swarm' && noMass(text)) { notes.push(`${id}: a swarm is a mass of many — ${swarmA === null ? 'no mass in the words' : 'the call reads one creature, not a mass'}`); bodyVetoed = true; continue; } // before the family seed: a vetoed swarm must not seed itself
    firstKnown = firstKnown ?? line;
    if (family && line.family !== family) { notes.push(`${id}: outside the user's ${menuRole} role`); continue; }
    if (!evidenceIn(k?.because, text)) { notes.push(`${id}: quote not found in the input ("${String(k?.because ?? '').slice(0, 40)}")`); continue; }
    if (line.id === 'brute-juggernaut' && resolvedType && !MADE_TYPES.includes(resolvedType)) { notes.push(`${id}: a ${resolvedType} is not a made thing`); continue; }
    if (line.id === 'defender-warden' && resolvedType && !WARDEN_TYPES.includes(resolvedType)) { notes.push(`${id}: a ${resolvedType} is not a made or risen guardian`); continue; }
    if (line.id === 'lurker-trap' && resolvedType && NOT_TRAP_TYPES.includes(resolvedType)) { notes.push(`${id}: a ${resolvedType} sets traps; it is not one`); continue; }
    if (line.id === 'lurker-phantom' && noPhantom()) { notes.push(`${id}: ${noPhantomWhy()}`); continue; }
    if (line.id === 'skirmisher-shifter' && !verbHits(text).some((h) => h.id === 'skirmisher-shifter')) { notes.push(`${id}: a shifter is named by its words (shape-shifts, turns into, a were-) — none here`); continue; } // a mind flayer with a sword drew a Beast Bite (critic-ten 2026-10-01)
    if (line.id === 'skirmisher-archer' && noBow(text)) { notes.push(`${id}: ${shootsA === null ? 'no bow, arrow or shot in the words' : 'the call reads no shot of its own'}`); continue; }
    // CASTING IS A MECHANIC ENGINE (the critic's fourth read): a caster line needs a magic word in the GM's own words. "Knight" and "duelist" carried none and drifted to the warpriest on two prompts in five.
    if (!family && line.family === 'caster' && noMagic(text)) { notes.push(`${id}: ${castsAnswer === null ? 'a caster line needs a magic word in the words — none here' : 'the call reads no worked magic in these words'}`); continue; }
    chosen = line; quotedPick = true; // the call's pick, with its quote found in the GM's words — 4b step 3 reads this
    notes.push(`${id}: ✓ ("${String(k.because).slice(0, 40)}")`);
    break;
  }
  if (!chosen) {
    // RANK, don't default (critic run three: the vault "fell to lurker's plain
    // line" and shipped a Dex 20 stealth chassis with no disguise): the first
    // known pick that passes the HARD vetoes stands, its quote unverified
    for (const k of picks) {
      const line = BY_ID.get(lineIdOf(k?.line) ?? '');
      if (!line || (family && line.family !== family)) continue;
      if (line.id === 'brute-juggernaut' && resolvedType && !MADE_TYPES.includes(resolvedType)) continue;
      if (line.id === 'defender-warden' && resolvedType && !WARDEN_TYPES.includes(resolvedType)) continue;
      if (line.id === 'lurker-trap' && resolvedType && NOT_TRAP_TYPES.includes(resolvedType)) continue;
      if (line.id === 'lurker-phantom' && noPhantom()) continue;
      if (line.id === 'swarm' && noMass(text)) continue;
      if (line.id === 'skirmisher-shifter' && !verbHits(text).some((h) => h.id === 'skirmisher-shifter')) continue;
      if (line.id === 'skirmisher-archer' && noBow(text)) continue;
      if (!family && line.family === 'caster' && noMagic(text)) continue; // casting is a mechanic engine: it never comes back on rank either (the critic's fourth read)
      chosen = line; notes.push(`${line.id}: taken on rank — its quote was not found, no hard veto`); break;
    }
  }
  let fellToFamily = false;
  if (!chosen) {
    let fam = family ?? firstKnown?.family ?? null;
    // THE CASTER GATE HAS NO BACK DOOR (critic, 2026-10-14: Llibran's trace read
    // "caster-binder: a caster line needs a magic word — none here … fell to
    // caster's plain line", and a satyr piper came out a wizard with Shield and
    // Misty Step at will). A refusal for want of a magic word falls OUT of the
    // caster family, not into its own default. The menu's own role still rules.
    if (fam === 'caster' && !family && noMagic(text)) {
      notes.push('caster: the family itself needs a magic word in the words — the fallback leaves it');
      // out of the family, never into nothing: the plain line by type, which is
      // what a body veto already falls to (print's Humanoid NPCs are skirmishers)
      fam = firstKnown && firstKnown.family !== 'caster' ? firstKnown.family
        : (/^(?:Humanoid|Fey)\b/i.test(String(resolvedType ?? '')) ? 'skirmisher' : 'brute');
    }
    if (fam) {
      chosen = BY_ID.get(fam) ?? null;
      if (chosen) { notes.push(`fell to ${fam}'s plain line`); fellToFamily = true; }
    }
  }
  if (!chosen && bodyVetoed) { // a body veto left no pick: the plain line by type (print's Humanoid NPCs are skirmishers first)
    const byType = /^(?:Humanoid|Fey)\b/i.test(String(resolvedType ?? '')) ? 'skirmisher' : 'brute'; // print's Fey are skirmishers and controllers, never brutes (the satyr piper, 2026-10-14)
    chosen = BY_ID.get(byType) ?? null; if (chosen) { notes.push(`${byType}: the plain line by type — a body veto left no pick`); fellToFamily = true; }
  }
  // the verb outranks the noun: if the user's words name a line's VERB and the
  // chosen line was not one of those, the verb line stands (hard vetoes kept)
  {
    const hits = verbHits(text).map((h) => ({ ...h, line: BY_ID.get(h.id) })).filter(({ line: l }) => l && (!family || l.family === family)
      && !(l.id === 'brute-juggernaut' && resolvedType && !MADE_TYPES.includes(resolvedType))
      && !(l.id === 'defender-warden' && resolvedType && !WARDEN_TYPES.includes(resolvedType))
      && !(l.id === 'lurker-phantom' && noPhantom()) // the override obeys the body vetoes too (the kuo-toa went phantom on a verb, 2026-10-01)
      && !(l.id === 'lurker-trap' && resolvedType && NOT_TRAP_TYPES.includes(resolvedType))
      && !(l.id === 'skirmisher-archer' && noBow(text))
      // THE CASTER GATE HOLDS ON THE OVERRIDE TOO (critic, 2026-10-14: the gate
      // refused the warpriest line for want of a magic word, and then "smites"
      // put it back). Casting is a mechanic engine; a verb cannot conjure it.
      && !(l.family === 'caster' && !family && noMagic(text)));
    // a JOB noun cannot win an override whose rule is that verbs outrank nouns
    // — unless the family FELL to its plain line with no pick to override: a
    // title then names the style (a SERGEANT sworn to guard the gate, warden vetoed)
    const nounOnly = hits.filter((h) => h.cls === 'noun' && chosen && h.id !== chosen.id);
    if (fellToFamily && nounOnly.length && nounOnly[0].line.family === chosen.family) {
      notes.push(`${chosen.id} -> ${nounOnly[0].id}: the concept's TITLE names the line (key "${nounOnly[0].key}", class noun) — the plain family had no pick to override`);
      chosen = nounOnly[0].line; fellToFamily = false;
    } else for (const h of nounOnly) notes.push(`${h.id}: "${h.key}" is a noun (a title), not a verb — no override`);
    const byVerb = hits.filter((h) => h.cls !== 'noun');
    if (byVerb.length && chosen && !byVerb.some((h) => h.id === chosen.id)) {
      // STAGE 4b STEP 3, ATTEMPTED AND REVERTED (2026-10-16). Refusing this
      // override whenever the call's pick carried a verified quote fixed the
      // flying berserker and broke SIX pins that encode earlier critic reads:
      // a glass ox that charges IS a charger, a BODY noun (crab) may win where a
      // job noun may not, the Headless Horseman reaches the mounted seat, and the
      // caster/martial key gates hold. Measured first: 497 overrides in 5097
      // saved blocks (9.8%), mostly corrections.
      // The conflict is real and it is not a precedence question. The route call
      // is asked WHICH LINE, never WHETHER THIS KEY MEANS ITS MECHANIC — and that
      // second question is the one "flies into a rage" needs. The cue verdicts
      // that answer it (hint_verdicts: winged -> style ✗) are produced by the
      // identity call, AFTER routing, and are read only by the name-canon stamp.
      // So step 3 is ask-before-routing in the strict sense: put the cue question
      // to a call first, and let this override consult the verdict instead of the
      // key. That preserves every pin above — a charging ox confirms its cue —
      // and is a larger change than a flip. Owner's call.
      // STAGE 4b STEP 3 (owner's ruling, 2026-10-16): A KEY GATE BECOMES A
      // RECEIPT GATE. The override used to read the KEY; it now reads the call's
      // VERDICT on that key, asked in the same route call that ranks the picks —
      // no new call, so no new cost.
      // This is what a precedence flip could not do. Refusing the override on a
      // quoted pick fixed the flying berserker and broke six pins that encode
      // earlier critic reads (a glass ox that charges IS a charger; a BODY noun
      // may win where a job noun may not; the Headless Horseman's mounted seat).
      // The route call was being asked WHICH LINE and never WHETHER THIS KEY
      // MEANS ITS MECHANIC, and that second question is the one "flies into an
      // unstoppable rage" needs. A charging ox confirms its cue and keeps its
      // override; an idiom does not.
      // A key with NO verdict keeps the old behaviour, so a silent or failed call
      // degrades to the table rather than losing the correction.
      const live = byVerb.filter((h) => rejectedCues.get(h.key) !== true);
      for (const h of byVerb) if (rejectedCues.get(h.key) === true) notes.push(`${h.id}: the call read "${h.key}" as not meaning that mechanic here — no override`);
      if (!live.length) {
        notes.push(`${chosen.id} stands: every key that would override it was read as a figure of speech`);
      } else if (path === 'homebrew' && quotedPick) {
        // STEP 7 OF THE FIVE PIPELINES BRIEF — THE RETIREMENT. "The concept's
        // VERB outranks the noun" retires as a ROUTE DECISION on the homebrew
        // path: the style comes from the resolve call, which already ranked this
        // line and quoted the GM's words for it. The keys stay as the MENU the
        // call is shown and as the fallback when no pick verifies — they stop
        // being the decision.
        // This is the flip attempted and reverted on 2026-10-16, which broke six
        // pins. What makes it safe now is the cue verdict landing in the SAME
        // call: a glass ox that really charges has the charger line among its own
        // picks, so the outcome survives without the engine overruling the call.
        // The override still runs wherever the call gave nothing to stand on
        // (no verified pick, or a fall to a plain family line), and on every
        // other path it is unchanged.
        notes.push(`${chosen.id} stands on the homebrew path: the call ranked it and quoted "${String((Array.isArray(parsed?.picks) ? parsed.picks : []).find((k) => lineIdOf(k?.line) === chosen.id)?.because ?? '').slice(0, 40)}" — the key "${live[0].key}" is the menu, not the decision (step 7)`);
      } else {
        notes.push(`${chosen.id} -> ${live[0].id}: the concept's ${live[0].cls === 'body' ? 'BODY' : 'VERB'} outranks the noun (key "${live[0].key}", class ${live[0].cls})`);
        chosen = live[0].line;
      }
    }
  }
  /* THE USER'S OWN NOUN OUTRANKS THE ALIAS'S DEFAULT VERBS (critic 2026-10-01): the alias
     text supplies a body ("fights with net and spear"); the user supplies the request
     ("priest"). A pick whose quote came from the alias description yields to a line the
     user's remaining words name by any key class. */
  if (chosen && rawText) {
    const hits = rewritePI(String(rawText)).hits;
    if (hits.length) {
      const aliasTexts = hits.map((h) => h.text.toLowerCase());
      const because = String((Array.isArray(parsed?.picks) ? parsed.picks : []).find((k) => lineIdOf(k?.line) === chosen.id)?.because ?? '').toLowerCase();
      const quotedFromAlias = because && aliasTexts.some((a) => a.includes(because));
      if (quotedFromAlias) {
        let userOnly = String(rawText); for (const h of hits) userOnly = userOnly.replace(h.matched, ' ');
        const userHit = verbHits(userOnly).find((h) => h.id !== chosen.id && BY_ID.get(h.id));
        if (userHit) { notes.push(`${chosen.id} -> ${userHit.id}: the user's own word "${userHit.key}" (class ${userHit.cls}) outranks a pick quoted from the alias text`); chosen = BY_ID.get(userHit.id); }
      }
    }
  }
  // the PRIMARY line prints its key and class too (critic 2026-09-29: the wight's
  // trap route cited its quote and no key — one line should say whether a line
  // word or the model's read of the quote chose the seat)
  if (chosen) {
    const own = verbHits(text).find((h) => h.id === chosen.id);
    // eslint-disable-next-line no-unused-vars
    notes.push(own ? `${chosen.id}: key "${own.key}" (class ${own.cls})` : `${chosen.id}: no line key in the words — the model's read of its quote`);
    // A MECHANIC ENGINE NEEDS A KEY IN THE GM's WORDS (the critic's third species read, 2026-10-13): a grappler, a trap, a charger
    // carries rows that act — a grapple rider, an engulf, a charge — and the model's read of its own quote cannot land them ("a tortle
    // hermit who withdraws into his shell" routed to brute-5-grappler and got grappling Claws and an Engulf). The plain family line stands.
    // A CREATURE-ONLY PROMPT gives nothing to read, and the catalog composes the whole sheet by design ("knife ball", "the thing in the
    // well"): the model's read of its own quote may choose the body there. With words to read, the WORDS decide.
    const SIGNIFICANT = (t) => String(t ?? '').toLowerCase().split(/[^a-z']+/).filter((w) => w.length > 2 && !/^(?:the|a|an|and|or|but|with|who|that|which|its|his|her|their|into|onto|from|for|out|off|over|under|this|than|then|them|they|was|were|has|have|had|are|is|be|been|being|it|in|on|at|to|of|by|up|as|so|if|no|not|one|two|too|very|own|new|old)$/.test(w));
    const creatureOnly = SIGNIFICANT(text).length <= 3;
    const MECHANIC_STYLE = new Set(['grappler', 'charger', 'trap']);
    const GRAPPLE_WORD = /\b(?:grab|grabs|seize|seizes|hold|holds|swallow|swallows|engulf|engulfs|crush|crushes|hug|hugs|squeeze|squeezes|constrict|constricts|drag|drags|fold|folds|cage|cages|wrap|wraps|coil|coils|clamp|clamps|snap|snaps|pull|pulls|pin|pins|smother|smothers|entomb|entombs|envelop|envelops|latch|latches|clutch|clutches)\b/i;
    const CHARGE_WORD = /\b(?:charge|charges|charging|ram|rams|rush|rushes|stampede|stampedes|gallop|gallops|barrel|barrels|trample|tramples|bull-?rush)\b/i;
    const TRAP_WORD = /\b(?:adhere|adheres|adhesive|sticky|sticks|lies in wait|disguise[sd]?|looks like|poses as|pretend|pretends|snap|snaps|trap|traps|lure|lures|bait|baits|motionless|mimic|mimics|camouflage[sd]?)\b/i;
    const looseKey = chosen.style === 'grappler' ? GRAPPLE_WORD.test(text) : chosen.style === 'charger' ? CHARGE_WORD.test(text) : chosen.style === 'trap' ? TRAP_WORD.test(text) : false; // a grapple or charge VERB anywhere in the GM's words ("drags cattle into the bog", "folds shut around") is the key; "withdraws into his shell" has none
    // THE CONTAINMENT ENGINE ASKS TOO (owner, 2026-10-17). `own`/`looseKey` are
    // word presence; `holds` is the call's read of whether this creature keeps
    // hold of a creature at all. It only ever ADDS a way through — a call that
    // says yes satisfies the gate, and a null leaves the words deciding — so the
    // tortoise-knight who withdraws into his shell is refused exactly as before.
    const heldByCall = holdsA === true && chosen?.style === 'grappler';
    if (!own && !looseKey && !creatureOnly && !heldByCall && chosen.style && MECHANIC_STYLE.has(chosen.style)) { const plain = BY_ID.get(chosen.family); if (plain) { notes.push(`${chosen.id} -> ${plain.id}: a ${chosen.style} is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it`); chosen = plain; } }
  }
  const extras = [];
  for (const x of Array.isArray(parsed?.extras) ? parsed.extras : []) {
    const m = String(x?.mechanic ?? '').toLowerCase();
    if (!EXTRA_MECHANICS.includes(m)) continue;
    if (!evidenceIn(x?.because, text)) { notes.push(`extra ${m}: quote not found`); continue; }
    if (!extras.includes(m)) extras.push(m);
  }
  const mechanics = [...new Set([...(chosen?.implies ?? []), ...extras])];
  // the call's bane, validated: a closed list, and a quote that is really in the
  // GM's words. Anything else is dropped rather than coerced.
  const BANE_OK = /^(?:Acid|Fire|Cold|Lightning|Thunder|Poison|Necrotic|Radiant|Psychic|Force|silver|adamantine|cold iron)$/i;
  let bane = null;
  {
    // ONLY WHEN THE QUESTION WAS ASKED. The call volunteers a bane on prompts
    // with no weakness clause at all and quotes something verbatim to back it —
    // "Fire" on the words "bog troll", and "Fire" on "briars"
    // (bane-2026-10-17T14-16-54). A verbatim quote is not a weakness clause, so
    // the same frame that decides whether to ask decides whether to listen.
    const asked = WEAKNESS_FRAME.test(readPhrases(String(rawText ?? text ?? '')));
    const what = asked ? String(parsed?.bane?.what ?? '').trim() : '';
    if (!asked && parsed?.bane?.what) notes.push(`bane refused: the words carry no weakness clause, so "${String(parsed.bane.what).slice(0, 20)}" answers a question nobody asked`);
    const why = String(parsed?.bane?.because ?? '').trim();
    if (what && BANE_OK.test(what)) {
      if (why && evidenceIn(why, rawText ?? text)) {
        bane = { what: /^(?:silver|adamantine|cold iron)$/i.test(what) ? what.toLowerCase() : `${what[0].toUpperCase()}${what.slice(1).toLowerCase()}`, because: why };
        notes.push(`bane: "${bane.what}" on the GM's own words "${why.slice(0, 40)}"`);
      } else notes.push(`bane refused: the call answered "${what}" but ${why ? `quoted "${why.slice(0, 30)}", which is not in the GM's words` : 'offered no quote'}`);
    } else if (what) notes.push(`bane refused: "${what}" is not a damage type or a material the rules know`);
  }
  return {
    bane,
    holds: holdsA, // the call's read of whether this creature keeps hold of a creature — the checker asks the same question (2026-10-17)
    line: chosen?.id ?? null,
    cr: /^\d{1,2}(?:\/[248])?$/.test(String(parsed?.cr ?? '').trim()) ? String(parsed.cr).trim() : null, // the route's CR read, used only when the user set none (form-ten 2026-10-01: a placeholder Horseman rolled CR 24)
    archetype: chosen?.family ?? null,
    role: chosen ? (chosen.role ?? (chosen.body ? null : chosen.family)) : null,
    style: chosen?.style ?? null,
    body: chosen?.body ?? null,
    mechanics,
    resolvedType,
    notes,
  };
}

/** Every donor line must be on the shelf, and every shelf id must have a donor — checked by the spec. */
export function shelfCoverage() {
  const donorLines = new Set(DONORS.map((d) => `${d.archetypes?.[0] === 'artillery' ? 'skirmisher' : (d.archetypes?.[0] ?? d.id.split('-')[0])}${d.style ? `-${d.style}` : ''}`));
  const shelf = new Set(LINES.map((l) => l.id));
  return { missingFromShelf: [...donorLines].filter((x) => !shelf.has(x)), missingDonor: [...shelf].filter((x) => !donorLines.has(x)) };
}
