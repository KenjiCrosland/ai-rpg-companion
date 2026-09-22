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
  ['summon', 'mechanics', /\b(?:summons?|calls? forth|raises? the dead|conjures?)\b/i, 'usually the "summon" mechanic; summoning courage is not'],
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
  const lead = String(text ?? '').toLowerCase().split(/\s+(?:that|who|which|whose|with|wearing|riding)\b/)[0];
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

