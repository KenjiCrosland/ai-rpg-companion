/**
 * Lexical hints for the concept-resolve call — GUIDANCE, not routing.
 *
 * The resolve call is the noisiest stage in the pipeline (identical input
 * produced five different archetype/style pairs in five runs, 2026-09-20).
 * A hard lexicon would fix that by breaking the ambiguous cases the same way
 * the substring name guard once did ("a knight who hunts trolls" is not a
 * troll). So each cue is handed to the model as a QUESTION with its own
 * counter-case named, and the model must quote the deciding phrase back in
 * `hint_verdicts`. Deterministic rules that the data earned (the artillery-
 * plus-physical belt, the grappler re-route) stay hard and live elsewhere.
 */
const CUES = [
  ['swarm', 'body', /\bswarms?\b/i, 'usually a swarm BODY — many creatures acting as one; can be a mass of objects, or a metaphor'],
  ['ooze', 'body', /\b(?:oozes?|slimes?|jelly|jellies|pudding|amorphous|(?:living|animate|walking|crawling) (?:tar|pitch|wax|mud|sludge|slime|goo)|(?:mass|pool|puddle|blob) of (?:\w+ )?(?:tar|pitch|wax|mud|sludge|slime|goo|flesh)|tar-?\w*|sludge|protoplasm)\b/i, 'usually an ooze BODY; "slime" can be a coating, "tar-mouthed" a feature of a solid creature, and a wax FIGURE is a construct'],
  ['dragon', 'body', /\b(?:dragons?|wyrm(?:ling)?s?|drakes?)\b/i, 'usually a true dragon BODY; a dragon-slayer, a dragon-forged blade, or a drake-rider is not a dragon'],
  ['mounted', 'style', /\b(?:rides?|riding|astride|mounted|saddled?|warhorse|destrier|steed)\b/i, 'usually the "mounted" style (a rider); riding a storm, a wave, or a rumour is figurative'],
  ['hurler', 'style', /\b(?:hurls?|throws?|throwing|flings?|lobs?|slings?)\b/i, 'usually the "hurler" style (a thrower); throwing a tantrum, a party, or insults is not'],
  ['grappler', 'style', /\b(?:grapples?|grabs?|seizes?|crushes?|constricts?|coils?|bear[- ]hugs?|drags? (?:\w+ )?(?:under|down|into)|holds? (?:\w+ )?down)\b/i, 'usually the "grappler" style (seizes and holds); crushing morale or seizing a throne is not'],
  ['phantom', 'style', /\b(?:ghosts?|spectres?|specters?|wraiths?|phantoms?|incorporeal|(?:drifts?|passes|walks?) through (?:the )?walls?)\b/i, 'usually the "phantom" style (incorporeal dead); a "spirit of the forest" that is a living fey or plant is not'],
  ['trap', 'style', /\b(?:mimics?|disguised as|pretends? to be|posing as|only moves when|until touched|lies in wait|snaps shut)\b/i, 'usually the "trap" style (it IS the ambush); a creature that merely uses traps is not'],
  ['regenerator', 'style', /\b(?:regenerat\w*|(?:re)?knits? (?:itself |themselves )?(?:shut|back|closed|together)|reknits?|regrows?|reassembles?|re-?forms? itself|(?:heals?|mends?|closes?|seals?) (?:its|their) (?:own )?wounds|self-?(?:heal|repair|mend)\w*)\b/i, 'usually the "regenerator" style; a healer who regenerates OTHERS is not'],
  ['warden', 'style', /\b(?:bound to (?:protect|guard|the)|sworn to (?:protect|guard)|guardian of|sentinel)\b/i, 'usually the "warden" style (a MADE or risen guardian bound to a charge); a living bodyguard is a plain defender'],
  ['winged', 'style', /\b(?:wings?|winged|flies|flying|swoops?|dives? (?:on|onto|from)|aerial)\b/i, 'usually the "winged" style (a flyer); "flies into a rage" or a winged HELMET is not'],
  ['charger', 'style', /\b(?:charges?|charging|runs? (?:\w+ )?down|tramples?|gores?|stampedes?)\b/i, 'usually the "charger" style; charging a fee, or a charge of magic, is not'],
  ['warpriest', 'style', /\b(?:war-?priests?|clerics?|paladins?|bishops?|chaplains?|crusaders?|holy symbol|battle-?psalms?)\b/i, 'usually the "warpriest" style ONLY if it fights in armor with a weapon; a preacher who curses from a pulpit is a caster or binder'],
  ['binder', 'style', /\b(?:hex(?:es|er)?|curses?|cursing|witch(?:es)?|shackles?|binds? (?:\w+ )?(?:with|in|by))\b/i, 'usually the "binder" style (conditions over damage); a cursed OBJECT or a cursed victim is not'],
  ['breath', 'mechanics', /\bbreath(?:es|ing)?\b/i, 'usually the "breath" mechanic; "holds its breath" or "a breath of wind" is not'],
  ['gaze', 'mechanics', /\b(?:gaze|stare|eyes? that (?:turn|freeze|burn|petrify))\b/i, 'usually the "gaze" mechanic; "a distant gaze" as description is not'],
  ['teleport', 'mechanics', /\b(?:teleports?|blinks?|flickers? (?:between|out)|vanish(?:es)? and reappears?)\b/i, 'usually the "teleport" mechanic; a candle that flickers is not'],
  ['engulf', 'mechanics', /\b(?:swallows?|engulfs?|smothers?|digests?|entombs?|devours? whole|(?:folds?|closes?|snaps?|clamps?|slams?|shuts?) (?:shut |closed )?(?:around|over|on) |(?:seals?|locks?|traps?|shuts?) (?:\w+ )?(?:inside|within)|drags? (?:\w+ )?(?:under|down into|into (?:its|the)))\b/i, 'usually the "engulf" mechanic (containment); swallowing pride or a story is not'],
  ['troll', 'canon', /\btrolls?\b/i, 'a troll carries print Regeneration — unless the creature only HUNTS, WEARS, or is NAMED AFTER trolls; a troll typed Giant is still a troll — print\'s Troll IS a Giant'],
  ['golem', 'canon', /\bgolems?\b/i, 'a golem carries print Immutable Form and Magic Resistance — unless "golem" is a comparison or a maker\'s mark'],
  ['zombie', 'canon', /\bzombies?\b/i, 'a zombie carries print Undead Fortitude — unless the word is figurative'],
  ['spider', 'canon', /\bspiders?\b/i, 'a spider carries print Spider Climb — unless it merely weaves, wears, or hunts spiders'],
  ['mephit', 'canon', /\bmephits?\b/i, 'a mephit carries print Death Burst'],
];

/** Hints present in `text`, deduped by cue, capped so the prompt stays small. */
export function lexicalHints(text, { cap = 6 } = {}) {
  const t = String(text ?? '');
  const out = [];
  for (const [cue, field, re, note] of CUES) {
    const m = re.exec(t);
    if (!m) continue;
    out.push({ cue, field, matched: m[0], note });
    if (out.length >= cap) break;
  }
  return out;
}

/** The prompt block, or '' when nothing matched. */
export function hintsBlock(text) {
  const hints = lexicalHints(text);
  if (!hints.length) return '';
  return `\nLEXICAL HINTS — words in the input that USUALLY signal a field. They are questions, not answers: judge each on the FULL sentence and quote the deciding phrase. A word can be figurative, a comparison, a possession, a maker's mark, or the VICTIM ("a knight who hunts trolls" is not a troll). RULE: if the cue names something the creature USES, MAKES, HUNTS, WEARS, or is COMPARED TO rather than what the creature IS, reject it — a "golem-forged" sword is not a golem, a "swarm of arrows" is arrows unless the arrows themselves are the creature.\n${hints.map((h) => `- "${h.matched}" → ${h.field}=${h.cue}? (${h.note})`).join('\n')}\nAnswer every hint in "hint_verdicts"; accept only what the sentence supports.\n`;
}

export const HINT_VERDICTS_FIELD = '"hint_verdicts": [{"cue": "<the cue word>", "field": "<body|style|mechanics|canon>", "accepted": <true|false>, "because": "<the deciding phrase from the input, 2-8 words>"}]';

/** Keep only verdicts for cues we actually asked about — the model invents
 *  extras ("sailor→body") that would poison any acceptance-rate measurement. */
export function filterVerdicts(verdicts, text) {
  if (!Array.isArray(verdicts)) return [];
  // the model echoes the MATCHED WORD ("trolls", "rides"), not the lexicon
  // key ("troll", "mounted") — accept either, normalise to the key, and take
  // the FIELD from the lexicon (the model mislabelled trolls→body live)
  const asked = lexicalHints(text);
  const byToken = new Map();
  for (const h of asked) { byToken.set(h.cue.toLowerCase(), h); byToken.set(h.matched.toLowerCase(), h); }
  const seen = new Set();
  const out = [];
  for (const v of verdicts) {
    const said = String(v?.cue ?? '').toLowerCase();
    // hyphenated compounds: the model echoes "golem-forged" for the cue
    // "golem" — match on containment either way, never on equality alone
    const h = v && (byToken.get(said) ?? asked.find((a) => said.includes(a.cue.toLowerCase()) || said.includes(a.matched.toLowerCase())));
    if (!h || seen.has(h.cue)) continue;
    seen.add(h.cue);
    out.push({ cue: h.cue, field: h.field, accepted: v.accepted === true, because: String(v.because ?? '').slice(0, 60) });
  }
  return out;
}

/** Canon cues the model REJECTED on the sentence — the name-canon stamp must
 *  not re-apply them off a name the model then chose ("Troll-Tooth Knight"). */
/** The concept's HEAD NOUN: "a cliff troll that shears slabs" → troll (the words before the first that/who/which/whose, last word). */
export function headNoun(text) {
  const lead = String(text ?? '').toLowerCase().split(/\s+(?:that|who|which|whose|with|wearing|riding|given|granted|bearing|holding|carrying|made|built|forged|cast)\b/)[0]; // "a temple gong given legs" heads on the gong, not the legs (2026-09-30)
  return (lead.trim().split(/[^a-z-]+/).filter(Boolean).pop() ?? '').replace(/s$/, '');
}
export function rejectedCanon(verdicts, text) {
  const head = headNoun(text);
  return filterVerdicts(verdicts, text).filter((v) => v.field === 'canon' && !v.accepted)
    // a canon cue that IS the concept's head noun cannot be rejected — the
    // Scarp Troll lost Regeneration to "the concept is a Giant, not the print
    // Troll" (print's Troll is a Giant); the rejection is for troll-HUNTERS
    .filter((v) => v.cue !== head && !head.startsWith(v.cue))
    .map((v) => v.cue);
}


// FIXED PHRASES (critic, library round 2026-09-29: six homographs in six runs —
// hide, toll, spear, roots, holds, fire). A fixed phrase carries ONE sense, read
// phrase-first like a print name, before any verb table, key list or element
// bank sees the words: "fire at will" is a command, not a flame; "holds the line"
// is a stand, not a grapple; "roots up" digs; "takes a toll" is a price, not a bell.
// Each rewrite keeps the sense's own key word so the right line still reads it.
const FIXED_PHRASES = [
  [/\bfires? at will\b/gi, 'looses at will'],
  [/\b(fires?|firing|fired) (a|an|the|its|their|each|one|another|different|three) ((?:different |single |second )?(?:rays?|beams?|bolts?|shots?|volleys?|arrows?|darts?|blasts?))\b/gi, (m, v, det, obj) => `${v.toLowerCase().startsWith('fired') ? 'loosed' : v.toLowerCase().startsWith('firing') ? 'loosing' : v.toLowerCase().endsWith('s') ? 'looses' : 'loose'} ${det} ${obj}`], // "each fire a different ray" is no flame (the orb drew a Heated Body, 2026-10-01)
  [/\bopens? fire\b/gi, 'looses arrows'],
  [/\bfires? (a|the|another) volley\b/gi, 'looses $1 volley'],
  [/\bunder fire\b/gi, 'under attack'],
  [/\b(?:uses?|using|in|output(?:ted)? in|with|use) (?:the )?(?:2014|2024) (?:rules|format|edition)(?: format)?\b,?\s*/gi, ''], // an edition directive is read by the form, never by the creature
  [/\b(?:output(?:ted)?|write|written|render(?:ed)?|print(?:ed)?|give|produce|translate[d]?|make)(?: the| this| it)?(?: stat ?block| sheet| creature| monster)?(?: out)? in (?:german|french|spanish|italian|portuguese|japanese|chinese|polish|dutch|russian|korean|swedish|norwegian|danish|finnish|czech|turkish|english)\b,?\.?\s*/gi, ''], // an output-language directive is the form's business, never the creature's ("Output statblock in German" became German signature proposals, form-ten 2026-10-01)
  [/\b(holds?|holding|held) (the |a |his |her |its |their |our )?(shield ?)?(line|gate|pass|bridge|wall|door|ground|position|fort|breach|stairs?|rear)\b/gi, (m, v, det, sh, obj) => `${v.toLowerCase().startsWith('held') ? 'kept' : v.toLowerCase().startsWith('holding') ? 'keeping' : v.toLowerCase().endsWith('s') ? 'keeps' : 'keep'} ${det ?? ''}${sh ?? ''}${obj}`],
  [/\broots? (up|through|around|about|out)\b/gi, (m, p) => `${m.toLowerCase().startsWith('roots') ? 'digs' : 'dig'} ${p}`],
  [/\b(takes?|exacts?|took|taking|collects?|collected|collecting|demands?|charges?|levies|levied) (a|an|its|his|her|their|the) toll\b/gi, '$1 $2 fee'], // a toll collected at a bridge is a fee, not a bell (the troll, critic-ten 2026-10-01)
  [/\bspears? (the|a|an|its|his|her|their|any|every|each)\b/gi, (m, det) => `${m.toLowerCase().startsWith('spears') ? 'impales' : 'impale'} ${det}`],
];
/** The text with every fixed phrase rewritten to its one sense. */
export function readPhrases(text) {
  let out = rewritePI(String(text ?? '')).text; // PI names first: the description is what every pass reads
  for (const [re, to] of FIXED_PHRASES) out = out.replace(re, to);
  return out;
}

// THE PROMPT NAMES ITS OWN CR (critic-ten 2026-10-01: "something nasty for a level 3
// party" rolled a random CR because the select was empty). A party level reads as
// that CR; an explicit "cr 5" reads as 5; fractions read as written.
// BLANK CR, no print name: a fixed ladder from the user's own words, never the
// model's taste (the same "Headless Horseman" read CR 2 one run and 18 the next —
// critic form-ten 2026-10-01). Legendary words sit high, rank words mid, the rest
// at a table's middle tier.
export function crFromWords(text) {
  const t = readPhrases(String(text ?? ''));
  if (/\b(?:ancient|elder|arch(?:lich|mage|devil|fiend)|lich|titan|god|goddess|demon lord|avatar|primordial|kraken|tarrasque|empyrean|solar|leviathan|colossus|dragon|wyrm)\b/i.test(t)) return 15;
  if (/\b(?:greater|dire|giant|huge|massive|monstrous|lord|lady|king|queen|champion|chief|chieftain|captain|warlord|warchief|high priest|archpriest|matriarch|patriarch|boss|elite|veteran|knight|master)\b/i.test(t)) return 8;
  return 4;
}
export function crFromPrompt(text) {
  const t = String(text ?? '').toLowerCase();
  const explicit = /\bcr\s*(\d{1,2}(?:\/[248])?)\b/.exec(t); if (explicit) return explicit[1];
  const level = /\blevel[- ](\d{1,2})\b|\b(\d{1,2})(?:st|nd|rd|th)[- ]level\b|\blevels? (\d{1,2})\b/.exec(t);
  if (level) { const n = Number(level[1] ?? level[2] ?? level[3]); if (n >= 1 && n <= 20) return String(n); }
  return null;
}

// PRODUCT IDENTITY ALIASES (spec 2026-10-01). A dozen names GMs type are Wizards
// Product Identity and absent from the SRD. The name is rewritten to a functional
// description of the thing, phrase-first on the raw concept, before ANY pass reads
// the words — the same stage and mechanism as the fixed phrases. The donor table
// and the print corpus hold no such name, so lookup returns nothing and the block
// is built from the library as homebrew. An output guard keeps the token and its
// lore vocabulary off the finished block.
export const PI_ALIASES = [
  { keys: ['beholder', 'eye tyrant'], noun: 'orb', text: 'a floating orb with one great central eye and a crown of eyestalks that each fire a different ray' },
  { keys: ['gauth'], noun: 'orb', text: 'a smaller floating orb with one central eye and a ring of eyestalks that fire rays' },
  { keys: ['mind flayer', 'mindflayer', 'illithid'], noun: 'aberration', text: 'a tentacle-faced psychic aberration that stuns minds and eats brains' },
  { keys: ['displacer beast'], noun: 'panther', text: 'a six-legged panther with two tentacles whose image appears a few feet from where it stands' },
  { keys: ['umber hulk'], noun: 'brute', text: 'a burrowing insectile brute with mandibles whose gaze scrambles thought' },
  { keys: ['carrion crawler'], noun: 'worm', text: 'a many-legged worm whose tentacles paralyze what they touch' },
  { keys: ['yuan-ti abomination', 'yuan ti abomination'], noun: 'humanoid', text: 'a giant serpent-bodied humanoid with arms and a snake\'s head' },
  { keys: ['yuan-ti', 'yuan ti', 'yuanti'], noun: 'humanoid', text: 'a serpent-blooded humanoid who sheds human form for scales and fangs' },
  { keys: ['githyanki'], noun: 'warrior', text: 'a gaunt psychic warrior who steps between planes' },
  { keys: ['githzerai'], noun: 'monk', text: 'a gaunt psychic monk who steps between planes' },
  { keys: ['slaad', 'slaadi', 'red slaad', 'blue slaad', 'green slaad', 'gray slaad', 'grey slaad', 'death slaad'], noun: 'beast', text: 'a toad-headed chaos beast from the outer planes whose claws spread infection' },
  { keys: ['kuo-toa', 'kuo toa', 'kuotoa'], noun: 'cultist', text: 'a fish-headed humanoid cultist of the deep who fights with net and spear' },
];
// longest key first, so "yuan-ti abomination" wins over "yuan-ti" and "death slaad" over "slaad"
const PI_KEYS = PI_ALIASES.flatMap((a) => a.keys.map((k) => ({ key: k, entry: a }))).sort((x, y) => y.key.length - x.key.length);
const piRegex = (k) => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[- ]/g, '[- ]')}(?:'s|es|s)?\\b`, 'gi');
/** Rewrite every PI name to its description. Returns the text and the alias record for each key that fired. */
export function rewritePI(text) {
  let out = String(text ?? ''); const hits = [];
  for (const { key, entry } of PI_KEYS) {
    const re = piRegex(key);
    if (!re.test(out)) continue;
    out = out.replace(re, (m) => { hits.push({ key, matched: m, text: entry.text }); const lead = /^[A-Z]/.test(m) ? entry.text.charAt(0).toUpperCase() + entry.text.slice(1) : entry.text; return lead; });
  }
  // an article before the description doubles up ("a a floating orb") — fold it
  out = out.replace(/\b(a|an|the) (a|an|the) /gi, '$2 ');
  return { text: out, hits };
}
/** The alias records a raw concept would fire, without rewriting. */
export function piAliasesIn(text) { return rewritePI(text).hits; }
// LORE DENYLIST (output only): the keys and synonyms, plus the lore words the spec names
export const PI_DENYLIST = [...new Set([...PI_ALIASES.flatMap((a) => a.keys), 'elder brain', 'ceremorphosis', 'illithid', 'eye tyrant'])].sort((x, y) => y.length - x.length);
/** Scrub a string of denylisted tokens (each replaced by its alias's plain noun). Returns { text, hits }. */
export function piScrub(str) {
  let out = String(str ?? ''); const hits = [];
  for (const token of PI_DENYLIST) {
    const re = piRegex(token); if (!re.test(out)) continue;
    const entry = PI_ALIASES.find((a) => a.keys.includes(token)) ?? PI_ALIASES.find((a) => a.keys.includes('mind flayer'));
    out = out.replace(re, (m) => { hits.push(token); return /^[A-Z]/.test(m) ? entry.noun.charAt(0).toUpperCase() + entry.noun.slice(1) : entry.noun; });
  }
  return { text: out, hits };
}
/** The output guard: the finished block's name, row names and texts carry no PI token. Mutates and returns the hits. */
export function piGuard(monster) {
  const hits = [];
  const fix = (v) => { const r = piScrub(v); if (r.hits.length) hits.push(...r.hits); return r.text; };
  if (monster?.name) monster.name = fix(monster.name);
  for (const es of Object.values(monster?.sections ?? {})) for (const e of es) { if (e?.name) e.name = fix(e.name); if (e?.text) e.text = fix(e.text); }
  for (const k of ['description', 'lore', 'flavor']) if (typeof monster?.[k] === 'string') monster[k] = fix(monster[k]);
  return [...new Set(hits)];
}
// REMOVAL CLAUSES: "lost its tentacles", "without wings", "no longer has eyes" — the
// nouns the concept takes away, read on the rewritten text
export function removalClauses(text) {
  const t = readPhrases(text).toLowerCase(); const out = [];
  const re = /\b(?:lost|lacks|lacking|without|missing|no longer has|severed|cut off|torn off|stripped of|shorn of|minus)\s+(?:(?:its|his|her|their|all|both|any|the|every|an?)\s+)?(?:own\s+)?([a-z-]+)/g; // an article is never the noun ("without a head" took "a", form-ten 2026-10-01) // one noun per clause: "lost its tentacles and fights" takes only the tentacles
  for (let m = re.exec(t); m; m = re.exec(t)) if (m[1] && !out.includes(m[1])) out.push(m[1]);
  // the "no X" form: "no legendary actions, no lair" (two words at most, never "no longer")
  const reNo = /\bno (?!longer\b)((?:legendary|lair) actions?|legendary resistance|lairs?|wings|tail|horns|breath weapon|spellcasting|spells)\b/g;
  for (let m = reNo.exec(t); m; m = reNo.exec(t)) if (!out.includes(m[1])) out.push(m[1]);
  return out;
}
