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
import { weaponProp } from './weapons.mjs';
import { AREA_TARGETS } from './card-budgets.mjs';
import { imposedConditions } from './author.mjs'; // ONE reader for the condition a row imposes: the declared record first, print's grammar second

export const SECTION_OF = { trait: 'Traits', action: 'Actions', bonus_action: 'Bonus Actions', reaction: 'Reactions', rider: 'Rider' }; // Rider = a clause appended to the melee attack row
export const TRIGGERS = ['on_hit', 'save', 'on_being_hit', 'start_of_turn', 'once_per_fight', 'always'];
export const EFFECTS = ['damage', 'condition', 'movement', 'resource', 'defense'];
const SAVE_STATS = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
const CONDITIONS = ['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned'];
const MINOR = ['Prone', 'Poisoned', 'Deafened', 'Frightened', 'Blinded']; // Blinded joined for obscuring breaths (2026-09-28); the aura save map covers it
const RESTRAINTS = ['Grappled', 'Restrained'];

// WHICH STAT A SAVE ROW ROLLS AGAINST — ONE closed fact, measured over print,
// shared by every reader (owner, 2026-10-25: "tables might be ok if the table
// and the call work together properly"). The CALL supplies the judgement — which
// condition the row imposes, whether damage is the point of the row — and this
// table supplies print's answer. It decides no meaning of its own.
//
// Three copies of this rule existed before today: this one, a prose ladder in
// renderTemplate's save block, and a third in generate.mjs's A2 pass. The prose
// ladder was the only copy that got it wrong, and it got it wrong the way a word
// list always does — `execute`'s CR 0-2 frame targets "one Frightened creature",
// a condition it REQUIRES, and the ladder read the bare word as a condition it
// IMPOSES and answered Wisdom on a row whose point is damage. That is bar 1's
// own failure, surviving inside the gate built to stop it. The imposition is
// read by `imposedConditions`, which prefers the row's declared record and falls
// back to print's "has the X condition" grammar; a targeting clause never
// matches it.
const SAVE_FOR_CONDITION = { Prone: 'Strength', Grappled: 'Strength', Restrained: 'Strength', Poisoned: 'Constitution', Deafened: 'Constitution', Blinded: 'Constitution', Stunned: 'Constitution', Paralyzed: 'Constitution', Incapacitated: 'Constitution', Petrified: 'Constitution', Frightened: 'Wisdom', Charmed: 'Wisdom' };

/**
 * The stats a save row may roll against, best first; `[]` when nothing is known
 * and the caller must leave the row alone.
 *
 * print's measured splits: a shove or haul is Strength (5 rows to Dexterity's
 * 2); area-plus-damage is Dexterity 46 / Constitution 29 / Wisdom 5, so when
 * damage is the point of the row the save is never Wisdom whatever rider it
 * carries; a condition-only row saves by its condition (Poisoned -> Constitution
 * 24, Frightened -> Wisdom 13).
 *
 * @param imposes         the condition the row IMPOSES (declared, or read by
 *                        `imposedConditions`) — not one it requires of its target
 * @param damageDominant  the caller's judgement that damage is the point of the
 *                        row, not a rider
 * @param movement        the row shoves, hauls or drags (the row's own flag)
 */
export function saveStatsFor({ imposes = null, damageDominant = false, movement = false } = {}) {
  if (movement) return ['Strength', 'Dexterity'];              // a shove keeps Strength even over an area (print's one such row is the Centaur's Trampling Charge)
  const want = SAVE_FOR_CONDITION[String(imposes ?? '')] ?? null;
  // WHEN DAMAGE DOMINATES, Dexterity AND Constitution are both print-normal and
  // neither is overruled (owner, 2026-10-26). The corpus is decisive about one
  // thing only — area-plus-damage is Dexterity 46 / Constitution 29 / Wisdom 5 —
  // so Wisdom is what gets rejected. The arm below used to reject Constitution
  // too, on the strength of a 5-row slice (area+damage+Prone: DEX 3 / STR 1 /
  // WIS 1 / CON 0), and so retyped a cold breath that knocks prone off the
  // classic breath-weapon save. 5 rows is not enough to overrule 29.
  // Strength stays acceptable only where the condition is a physical
  // displacement, which is the reason a Strength save exists here at all
  // (print's one such row is the Centaur Trooper's Trampling Charge).
  if (want === 'Strength') return damageDominant ? ['Dexterity', 'Constitution', 'Strength'] : ['Strength', 'Dexterity'];
  if (want === 'Wisdom') return damageDominant ? ['Dexterity', 'Constitution'] : ['Wisdom', 'Charisma'];  // the fear is the rider, the fire is the row
  if (want === 'Constitution') return damageDominant ? ['Constitution', 'Dexterity'] : ['Constitution']; // a breath that deafens may save by either; the condition's own stat leads
  return damageDominant ? ['Dexterity', 'Constitution'] : [];
}
const DAMAGE = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];
const PHYSICAL = ['Bludgeoning', 'Piercing', 'Slashing'];

// closed-vocabulary slots: the model may propose, the engine only accepts a listed value
/**
 * AREA SHAPE AS A PARAMETER — print's own grammar, with the engine owning the size.
 *
 * Every gated area template in this catalog is locked to ONE shape, and the
 * catalog cannot produce a LINE at all — print's second-most-common area shape,
 * 22 of 109 area clauses. Measured 2026-10-22 against srd52-monsters: Cone 49,
 * Line 22, Emanation 8, Sphere 6.
 *
 * Only Cone and Line are here, deliberately. The size ladder is print's MEDIAN
 * per CR band, and only those two have enough instances to derive one:
 *
 *   Cone  15/15/30/30/60/90   n = 11, 9, 9, 3, 14, 9   (and this is already
 *                                                       spew's own ladder)
 *   Line  20/30/40/60/60/90   n = 5, 1, 5, 1, 7, 5     (10-12 smoothed: print's
 *                                                       lone instance reads 90,
 *                                                       which is a 1-row median)
 *
 * Sphere and Emanation are NOT here: their bands run n = 0 to 2, which is too
 * thin to build a ladder from. Templates that use them keep their fixed text.
 *
 * The MODEL picks the shape (a closed enum, validated by membership). The ENGINE
 * owns the distance, because a size is a pricing input and engine slots are never
 * the model's.
 *
 * CONSERVATIVE, by the owner's ruling 2026-10-22: an AREA shape is only offered
 * where the template is already GATED. Print gates 72% of its area rows, and
 * `valueCheck` already prices a gated area row correctly (its per-target budget
 * is the round's damage). Nothing prices an UNGATED area row — not valueCheck,
 * not calculateCR — so widening one would inflate CR invisibly. Gated widening
 * routes into pricing print already backs; ungated widening is simply not offered.
 */
/**
 * HOW LONG IT LASTS — print's own clauses, as a parameter.
 *
 * The forty's gap list wanted persistence more than anything else: 11 of 39 named
 * gaps asked for "and it keeps happening" where the template hard-codes a
 * one-shot ("a lingering patch that keeps damaging", "persisting until the grapple
 * ends", "a lasting mark"). Measured against srd52-monsters, 2026-10-23:
 *
 *   until the start of its next turn            46
 *   until the end of its next turn              31
 *   until the start of the <creature>'s turn    24
 *   until the end of the <creature>'s turn      15
 *   until the effect ends                       12
 *   for 1 minute                                 6
 *
 * By EFFECT KIND, which is what decides what may be offered:
 *
 *   imposes a condition   all four forms attested (n = 71)
 *   a buff on itself      ONLY the short forms (n = 5); print never lengthens one
 *   recurring damage      15 rows, every one ANCHORED — to a grapple (Barbed
 *                         Devil), a wound (Bearded Devil), a condition
 *   a persistent area      7 rows, every one ANCHORED — to concentration
 *                         (Darkmantle), to an environment (Aboleth's Mucus Cloud)
 *
 * So print never prints free-floating persistence, and nothing in this engine
 * prices duration (the same hole area damage had). The parameter is therefore
 * offered ONLY on condition-effect templates, where all four forms are print-
 * attested — 13 templates. The other 14 that hard-code a duration keep it.
 */
const DURATION_FORMS = {
  target_end: 'until the end of its next turn',
  target_start: 'until the start of its next turn',
  source_end: "until the end of the creature's next turn",
  source_start: "until the start of the creature's next turn",
};
export const DURATIONS = Object.keys(DURATION_FORMS);
export const durationClause = (form) => DURATION_FORMS[form] ?? null;
/** The form a clause already reads as, so a template's default is its own text. */
export const durationFormOf = (text) => {
  for (const [k, v] of Object.entries(DURATION_FORMS)) if (String(text ?? '').includes(v)) return k;
  return null;
};

const AREA_LADDER = {
  Cone: { '0-2': 15, '3-5': 15, '6-9': 30, '10-12': 30, '13-20': 60, '21+': 90 },
  Line: { '0-2': 20, '3-5': 30, '6-9': 40, '10-12': 60, '13-20': 60, '21+': 90 },
};
export const AREA_SHAPES = Object.keys(AREA_LADDER);
/** Print's clause for a shape at a CR band. */
const AREA_FORM = {
  Cone: (n) => `each creature in a ${n}-foot Cone`,
  Line: (n) => `each creature in a ${n}-foot-long, 5-foot-wide Line`,
  Emanation: (n) => `each creature in a ${n}-foot Emanation originating from the creature`,
};
/**
 * Print's clause for a shape at a CR band.
 *
 * `sizes` lets a template carry its OWN ladder for its DEFAULT shape, which is
 * how Emanation is supported without inventing a shared one: print's Emanation
 * medians are non-monotone at n = 3-6 (5/10/20/5/30/20), and this catalog's two
 * Emanation templates already disagree with each other (ground-burst
 * 10/15/15/20/30, active-toll 10/15/20/30/30/60). So a default shape keeps the
 * sizes it was authored with, byte for byte, and only an ADDED shape draws on
 * AREA_LADDER — where Cone and Line are well evidenced. Measured 2026-10-22.
 */
export const areaClause = (shape, band, sizes = null) => {
  const n = sizes?.[shape]?.[band] ?? AREA_LADDER[shape]?.[band];
  const form = AREA_FORM[shape];
  if (!n || !form) return null;
  return form(n);
};

const VOCAB = { area_shape: AREA_SHAPES, duration: DURATIONS, save_stat: SAVE_STATS, consumed_condition: CONDITIONS, condition_minor: MINOR, restraint: RESTRAINTS, r_vuln: DAMAGE };
// WHAT A SLOT OWES ITS OWN FRAME. Print parameterises the QUALIFIER and keeps the
// noun — "an infernal wound" (Bearded Devil) — which is why its frame can go on to
// say "While wounded… The wound closes… stanch the wound". Our slot took the whole
// noun phrase instead, so a fill of "tar-snared footing" rendered "The target
// receives a tar-snared footing. While wounded… stanch the wound (DC 15 Medicine)"
// — a tar-fouled foot you bandage (focused ten, 2026-10-23). The frame cannot drop
// those three references without losing print's shape, so the FILL carries the noun
// and its own article, and the contract says so where the model can read it.
const SLOT_CONTRACTS = {
  relic: 'a noun phrase WITH its article naming a THING the creature keeps, carries or wears and that a party could attack: "its severed head", "the soul bag", "a daughter\'s carapace". 2-4 words. It must be an OBJECT — not an effect, not a place, not a creature, because the frame gives it AC and Hit Points',
  kill_consequence: 'a PREDICATE naming what becomes of the BODY — no subject, no full stop, 2-5 words, lowercase: "crumbles to dust", "loses its head", "is absorbed into the swarm". It is what the killing leaves behind, never damage and never a condition',
  wound_phrase: 'a whole noun phrase WITH its article and ending in the word "wound" — like print\'s "an infernal wound": "a tar-fouled wound", "a weeping wound". The frame later says "While wounded", "The wound closes" and "stanch the wound", so a fill that is not a wound makes nonsense of them',
};
// Does the fill keep the promise its frame already makes? The frame's own noun is a
// CLOSED FACT — print writes "wound" three more times after the slot and we cannot
// drop those lines without losing print's shape — so this VALIDATES the call's
// answer against it rather than inferring anything about meaning (CLAUDE.md allows
// exactly that, and the ladder below falls to the blind default, never to a miss).
// What a call would catch that this does not: a fill that says "wound" and still
// does not read as an injury ("a wound of silence"). This is the cheap half.
const fillKeepsFrame = (k, v) => k !== 'wound_phrase' || /\bwounds?\b/i.test(String(v ?? ''));
// flavor slots: the model's words, bounded (no digits, no rules grammar, short)
export const FLAVOR_SLOTS = ['kill_consequence', 'relic', 'phobia', 'restraint', 'projectile', 'wound_phrase', 'zone_effect', 'zone_rule', 'disguise', 'shell', 'telegraph', 'lure_source', 'hook', 'douse', 'terrain', 'sense_target', 'anchor', 'ward'];
// HOW TO CHOOSE, not just what is legal. A closed enum tells the model the legal
// values and nothing about which one this sheet can support, and for
// `consumed_condition` that gap WAS the defect: a payoff reads "one creature that
// has the X condition", the model picked X freely, and the engine's own fallback
// was `ctx.imposed[0]` — a regex over the engine's generated text that reads
// Evasion's "can't use this trait if it has the Incapacitated condition" as an
// IMPOSITION (25 of 156 rows known to that regex carry no declared record; the
// Evasion false positive recurred in all three runs of the focused ten). The whole
// sheet is already in this prompt, so the model can see which row imposes what —
// this costs no call of its own, only the question.
const VOCAB_GUIDANCE = {
  save_stat: 'by what the row DOES, as print does it — measured over the corpus: an AREA that also deals damage takes Dexterity (46 rows) or Constitution for a breath, gas or spores (29); a shove, pull or knock-down takes Strength (5 rows to Dexterity\'s 2); a condition with little damage takes Constitution for a body effect (24) or Wisdom for fear, charm or compulsion (13). Damage-dominant never takes Wisdom',
  consumed_condition: 'name the one THE SHEET ABOVE already imposes, and in "because" quote the row that imposes it. If no row on the sheet imposes any of these, this template does not belong on this sheet: refuse it',
};
// engine slots: never the model's
const ENGINE_SLOTS = ['dc', 'atk', 'avg', 'dice', 'avg_half', 'dice_half', 'damage_type', 'melee_name', 'ranged_name', 'ray_table'];

// the shapes' tags (section comes from `replaces`); melee-rider / ranged
// replacements weld INTO an existing row and are not a standalone template
const SHAPE_TAGS = {
  'relic-object': ['always', 'defense'], // the object IS the defense; destroying it takes the regeneration with it
  'kill-denial': ['always', 'condition'], // fires on a kill, said in the frame — the same way death-burst says "when it dies" on the `always` cell
  trample: ['save', 'damage'], leap: ['save', 'damage'], 'thrown-burst': ['save', 'damage'],
  'gaze-single': ['save', 'condition'], snare: ['save', 'condition'], swallow: ['save', 'condition'], reel: ['save', 'movement'],
  'condition-payoff': ['save', 'damage'], rampage: ['once_per_fight', 'damage'], blink: ['always', 'movement'],
  zone: ['once_per_fight', 'condition'], execute: ['save', 'damage'], 'death-burst': ['always', 'damage'],
  'life-drain': ['on_hit', 'condition'], // print's HP-maximum reduction: a rider on the hit, the effect lasting past the turn
  'burrow-ambush': ['save', 'damage'], affliction: ['on_hit', 'condition'], contagion: ['on_hit', 'condition'], charge: ['on_hit', 'damage'], spew: ['save', 'damage'], 'bolt-restrain': ['on_hit', 'condition'], 'bolt-drag': ['on_hit', 'movement'], 'bolt-mark': ['on_hit', 'condition'], 'hook-rider': ['on_hit', 'movement'], riposte: ['on_being_hit', 'damage'], 'snap-shot': ['on_being_hit', 'damage'], 'ground-burst': ['save', 'damage'], 'volley-order': ['always', 'resource'], 'random-ray': ['save', 'condition'], 'blurred-form': ['always', 'defense'], 'weapon-lodge': ['on_being_hit', 'resource'], interpose: ['on_being_hit', 'defense'], pounce: ['on_hit', 'condition'], isolation: ['on_hit', 'damage'], snatch: ['on_hit', 'condition'], 'ward-retaliation': ['on_being_hit', 'damage'], assassinate: ['always', 'damage'], 'active-toll': ['save', 'damage'], 'pull-through': ['save', 'movement'], lure: ['save', 'condition'], 'hook-drag': ['save', 'movement'], 'heated-body': ['on_being_hit', 'damage'], 'false-appearance': ['always', 'defense'], 'bloodied-burst': ['on_being_hit', 'damage'], 'shell-withdraw': ['always', 'defense'], 'stunning-strike': ['on_hit', 'condition'], 'patient-defense': ['always', 'defense'], 'lay-on-hands': ['always', 'resource'], 'second-wind': ['always', 'resource'], 'shield-bash': ['save', 'condition'], 'resonant-body': ['on_being_hit', 'damage'], 'throw-retrieve': ['always', 'damage'], seal: ['save', 'condition'], adhesive: ['always', 'condition'], absorption: ['on_being_hit', 'defense'],
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
/**
 * THE FAMILY A TEMPLATE BELONGS TO, declared — because the declared CELL is not
 * the family (the critic's item 2 condition 3, and item 3's "own-turn-punisher
 * into the family cap").
 *
 * `settleSheetBudgets` reads `section/trigger/effect` as a proxy for family and a
 * comment there claims "the declared cell IS the family". Measured 2026-10-22,
 * that is true only of the three templates it was written against. The
 * retaliation family spans THREE cells:
 *
 *   trait/on_being_hit/damage        heated-body, bloodied-burst, resonant-body
 *   reaction/on_being_hit/damage     ward-retaliation, riposte
 *   bonus_action/always/damage       own-turn-punisher   <- the cap could not see it
 *
 * So the family is declared, not inferred — and it reuses the engine vocabulary
 * donor rows already carry (`punisher`, `containment`, `contact-damage`) so one
 * name means one thing. `sheetEngines` reads this off the row BEFORE any text
 * rule, which is the owner's standing order: declared data first, prose never.
 */
export const FAMILY = {
  // retaliation — the critic's Vashka case: thunder from lacquered plate beside her own Riposte
  'own-turn-punisher': 'punisher',
  'ward-retaliation': 'punisher',
  riposte: 'punisher',
  // light-mark — the critic's named duplicate pair
  'marking-light': 'light-mark',
  reveal: 'light-mark',
  // grapple — Scree-Pit's third grapple row
  snatch: 'containment',
  'hook-rider': 'containment',
};

const EXCLUDE_ON = {
  charge: ['charge-rider'], 'throw-retrieve': ['thrown-weapon'], pounce: ['charge-rider'],
  'hook-drag': ['containment'], 'hook-rider': ['containment'], 'obstacle-pull': ['containment'], reel: ['containment'], snare: ['containment'],
  'false-appearance': ['disguise'], adhesive: ['adhesive'], 'heated-body': ['contact-damage', 'aura'], 'resonant-body': ['contact-damage', 'aura'],
  // one aura per body; a sealed mind never doubles the golem's Immutable Form; warded mending never sits beside Regeneration
  'fire-aura': ['contact-damage', 'aura'], 'noxious-aura': ['aura'], 'truth-aura': ['aura'], 'gaze-aura': ['aura'], 'charge-push': ['charge-rider'], 'sealed-body': ['immutable-form', 'shielded-mind'], 'shielded-mind': ['shielded-mind'], 'warded-mending': ['regeneration'],
  // repellers, off every containment seat
  'escalating-dread': ['containment'], 'terror-pulse': ['containment'], 'push-prone': ['containment'], 'gaze-single': ['containment'],
  // ONE OF EACH FAMILY A SHEET (2026-10-22). These read the declared FAMILY above
  // off rows the sheet already carries, so a second row of the same family is
  // never OFFERED — the critic's "no duplicate family including
  // own-turn-punisher, grapple and light-mark".
  'own-turn-punisher': ['punisher', 'contact-damage'],
  'marking-light': ['light-mark'], reveal: ['light-mark'],
  snatch: ['containment'],
};
export function sheetEngines(sections = {}) {
  const rows = Object.values(sections).flat();
  const out = new Set();
  for (const e of rows) {
    // THE DECLARED FAMILY FIRST, prose only as the fallback (owner's standing
    // order, 2026-10-22). A row built from a template carries its family; the
    // text rules below exist for PRINT rows and anything unstamped.
    if (e.family) out.add(e.family);
    // containment = the ENGULF engine or a Reel row — a plain grapple-on-hit rider
    // is not (the phantom's touch grapples, and that excluded the pull the
    // keeper's own concept names: goldens 2026-09-21)
    if (e.engulf_engine || /pulls each creature Grappled by it/.test(e.text ?? '')) out.add('containment');
    if (/indistinguishable from|resemble an? (?:\w+ ){0,3}object|shape-shifts? to resemble/i.test(e.text ?? '')) out.add('disguise'); // the trap line's own False Form (two disguise traits on one gargoyle)
    if (e.engine) out.add(e.engine);
    if (/moved (?:at least )?\d+\+? feet straight toward/i.test(e.text ?? '')) out.add('charge-rider');
    if (e.part && /Melee or Ranged Attack Roll/.test(e.text ?? '')) out.add('thrown-weapon'); // a thrown part IS the throw: no throw-retrieve seed beside Sarn's spear (the critic's third species read)
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
  'stunning-strike': ['stun', 'stuns', 'stunning', 'pressure point', 'nerve', 'paralysing touch', 'open hand', 'open-hand', 'palm', 'chi', 'ki', 'monk'],
  'patient-defense': ['patient', 'defensive', 'waits', 'parries', 'guards itself', 'poised', 'still', 'meditat'],
  'lay-on-hands': ['heal', 'heals', 'healing', 'mends', 'lays hands', 'lay on hands', 'tends', 'blessing', 'restores'],
  'second-wind': ['second wind', 'recovers', 'rallies', 'catches its breath', 'shrugs off', 'endures'],
  'shield-bash': ['shield bash', 'bash', 'bashes', 'bashing', 'buckler', 'slams its shield', 'shield-first', 'pommel'],
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
  'life-drain': ['drain', 'drains', 'withers', 'wither', 'withering', 'saps', 'sap', 'life drain', 'drinks the years', 'drinks the life', 'steals years', 'eats the life', 'leeches', 'leech', 'desiccates', 'husk', 'wasting'],
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
  lure: ['lure', 'beguile', 'song', 'call', 'beckon', 'lamp', 'light', 'invite', 'follow it', 'follow him', 'follow her', 'follow the', 'made to follow', 'drawn to follow', 'entice', 'draw', 'tempt', 'siren', 'lantern', 'glow', 'whisper', 'hymn', 'dances'], // bare 'follow' read the wrong direction: a highwayman who FOLLOWS the coach got a Luring Presence (fresh four); the target follows a lure, the creature follows a quarry
  pacify: ['pacify', 'transfix', 'hold', 'stillness', 'trance', 'freeze', 'root', 'stun', 'mesmerize', 'stare', 'calm', 'lull', 'stop'],
  'escalating-dread': ['dread', 'fear', 'wither', 'doom', 'terror', 'horror', 'haunt', 'nightmare', 'despair', 'grief'],
  'terror-pulse': ['terror', 'roar', 'shriek', 'presence', 'howl', 'scream', 'bellow', 'wail', 'fright', 'scatter', 'panic'],
  'snare-bolt': ['snare', 'web', 'bind', 'tangle', 'net', 'bolt', 'spit', 'tar', 'silk', 'root', 'vine', 'restrain', 'entangle'],
  'slow-bolt': ['slow', 'chill', 'mire', 'leaden', 'numb', 'freeze', 'cold', 'brine', 'weigh', 'bog', 'mud', 'sluggish', 'frost'],
  'sensory-strike': ['blind', 'dazzle', 'flash', 'deafen', 'glare', 'light', 'spit', 'ink', 'sand', 'dust', 'clang', 'scream', 'toll', 'ring', 'bell', 'peal', 'chime'], // a bell's ACTION seat: the Deafened row (the crab's Dread Toll had no Thunder and no Deafened)
  disarm: ['disarm', 'twist', 'strip', 'weapon', 'snatch', 'steal', 'pluck', 'wrench', 'knock away', 'take'],
  'push-prone': ['shove', 'topple', 'slam', 'bowl', 'knock', 'push', 'fling', 'throw down', 'trip', 'batter', 'bull', 'ram', 'sweep'],
  herd: ['herd', 'drive', 'command', 'scatter', 'chase', 'flush', 'corral', 'compel', 'sermon', 'order', 'call'],
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
  'feint-slip': ['feint', 'slip', 'blur', 'weave', 'dodge', 'dart', 'sidestep', 'evade', 'dances away', 'dances aside', 'trick'],
  'wind-up': ['gather', 'charge-up', 'telegraph', 'brew', 'build', 'swell', 'ratchet', 'wind', 'coil', 'inhale', 'gathering', 'storm'],
  coating: ['coat', 'venom', 'anoint', 'charge-weapon', 'poison', 'oil', 'ignite', 'bless the blade', 'dip', 'smear', 'envenom', 'smite', 'smites', 'smiting'],
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
  // "MEND" IS AN ALLY HEAL, NOT A SELF-REGENERATION (critic, 2026-10-16). A
  // crusader who "mends her soldiers" keyed this template — which heals the
  // CREATURE — and it outranked lay-on-hands, which already owns mend/heals and
  // is what the GM asked for. The self-repair words stay; the transitive ones go.
  'warded-mending': ['knits', 'knits itself', 'repairs itself', 'heals near', 'consecrated', 'litany', 'litanies', 'prayer', 'prayers', 'its ward', 'while near', 'shrine', 'altar', 'regrows', 'seeps into', 'restored by'],
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
// A TRANSITIVE DANCE ACTS ON OTHERS, an intransitive one moves the creature
// (critic, 2026-10-14): "dances travellers into the hills" is the lure, "dances
// away from every blade" is the piper's own footwork. The lure's key is denied
// when the dance is intransitive, which leaves feint-slip's phrase to win.
const SENSE_DENY = { dances: /\bdance[sd]?\s+(?:away|aside|back|backward|backwards|off|clear|free|out|round|around)\b/i, root: /\broots? (?:up|through|around|about|in|out|for)\b/i, roots: /\broots? (?:up|through|around|about|in|out|for)\b/i, mimic: /\b(?:voices?|sounds?|speech|words?|calls?|songs?|cries|tongues?|talks?|accents?)\b/i, mimics: /\b(?:voices?|sounds?|speech|words?|calls?|songs?|cries|tongues?|talks?|accents?)\b/i, mimicry: /\b(?:voices?|sounds?|speech|words?|calls?|songs?|cries|tongues?|talks?|accents?)\b/i }; // "mimic" in a voice-copying context is not a false-appearance word (the kenku — the critic's species read)
// A DENIED CLAUSE never keys a template: "hates fire and takes extra damage from it", "cannot cast any spells" name what the creature SUFFERS or LACKS, and a heated body force-bound on them (Grandmother Ash — the critic's species read)
// Narrow on purpose: "cannot leave the tower" keys bound, "thoughts can't be read" keys shielded-mind, "hates being looked at" keys gaze-aura — a
// negation that IS the cue stays. What leaves is a vulnerability clause (damage taken, weakness, hatred of a damage type or material) and a lack of an ability.
const ENERGY_WORD = '(?:fire|flames?|heat|burning|cold|ice|frost|lightning|thunder|acid|poison|necrotic|radiant|psychic|force|sunlight|daylight|silver|silvered|iron|cold iron|holy water|running water|salt)';
// "no magic at all" is a LACK: its words must not key a template (critic's note,
// 2026-10-14 — it still offered uncanny-sense on the word "magic")
const LACK_PHRASE = /\b(?:no|without|never|cannot|can't|lacks?|has no|bereft of)\s+(?:any\s+|all\s+)?(?:magic\w*|spell\w*|arcane|sorcery|casting)\b(?:\s+(?:at all|whatsoever|of any kind))?/i;
const DENIED_CLAUSE = new RegExp(`\\b(?:takes? (?:extra|double|additional) damage|extra damage from|vulnerable|weak to|weakness(?:es)? to|susceptible to|(?:hates?|hated|loathes?|despises?|fears?|dreads?)\\s+(?:the\\s+)?${ENERGY_WORD}|(?:cannot|can't|can not|doesn't|does not|unable to|lacks?|has no|have no)\\s+(?:cast|use|wield|speak|fly|swim|climb|burrow|regenerate|heal|see|hear|smell|breathe|spells?|magic))\\b`, 'i');
export function scrubDeniedClauses(text) { return String(text ?? '').split(/([,;.]|\s+(?:and|but|or)\s+)/).map((seg, i) => (i % 2 === 1 ? seg : seg.replace(new RegExp(`${DENIED_CLAUSE.source}.*$`, 'i'), '').replace(LACK_PHRASE, ''))).join('').replace(/\s{2,}/g, ' ').trim(); } // the phrase leaves, the words before it stay ("a tiefling duelist who hates fire" keeps the duelist — the critic's second species read)
// A TEMPLATE DENIED BY THE CONCEPT: a heated body or fire aura never lands on a creature the words make vulnerable to fire, whatever word matched ("lives in the burned forest" bound Ash a Heated Body)
const TEMPLATE_DENY = { 'heated-body': new RegExp(`(?:hates?|loathes?|fears?|vulnerable to|weak to|extra damage from|takes? extra damage from)\\s+(?:the\\s+)?(?:fire|flames?|heat|burning)`, 'i'), 'fire-aura': new RegExp(`(?:hates?|loathes?|fears?|vulnerable to|weak to|extra damage from|takes? extra damage from)\\s+(?:the\\s+)?(?:fire|flames?|heat|burning)`, 'i') };
export function rankByVerb(menu, conceptText0, ideaText0 = '', askedMechanic = null) {
  // THE DECLARED MECHANIC OUTRANKS EVERY WORD (owner's architecture, 2026-10-23).
  // The resolve call already named what the GM asked a row to DO, from the GM's own
  // words. A template that declares that same mechanic is the answer; the 1,553 key
  // words below are a bridge built because nothing was declared, and where both
  // speak, the stamp wins. This ORDERS rather than filters, so a stochastic misread
  // of the mechanic costs the menu's first seats, never a candidate.
  const conceptText = readPhrases(scrubDeniedClauses(conceptText0)); const ideaText = readPhrases(ideaText0); // fixed phrases carry one sense; a denied clause's words never key a template
  const c = wordsOf(conceptText); const d = wordsOf(ideaText);
  const hit = (t, words, raw) => (t.keys ?? []).filter((k) => !(SENSE_DENY[k] && SENSE_DENY[k].test(String(raw ?? ''))) && (k.includes(' ') ? String(raw ?? '').toLowerCase().includes(k) : words.some((w) => sameStem(w, stem(k)))));
  const rawAll = String(conceptText0 ?? '');
  const wantsMech = (t) => !!askedMechanic && t.mechanic === askedMechanic;
  return menu.map((t, i) => { const denied = TEMPLATE_DENY[t.id]?.test(rawAll); const concept = denied ? [] : hit(t, c, conceptText); const idea = denied ? [] : hit(t, d, ideaText).filter((k) => !concept.includes(k)); return { t, i, concept, idea, matched: [...concept, ...idea], score: concept.length * 2 + idea.length }; })
    .sort((a, b) => (wantsMech(b.t) ? 1 : 0) - (wantsMech(a.t) ? 1 : 0) || b.score - a.score || a.i - b.i);
}

/**
 * THE FIT MENU'S ORDER, FROM THE IDEA'S OWN DECLARED STAMPS.
 *
 * The AI describes the signature in plain words and tags it from two closed
 * enums — `trigger` (when it fires) and `effect` (what it does). Every template
 * declares the same two cells. So the menu can be ordered by STAMP AGREEMENT,
 * which is a comparison of declared fields, and never by whether one of the
 * template's key words happens to appear in the GM's concept.
 *
 * Why this replaced the keyword bind (measured over four same-batch runs, 40
 * sheets, scripts/signature-measures/fit-trigger-match.mjs): of the trait
 * signatures that shipped, those chosen because a key word of theirs appeared in
 * the GM's CONCEPT fired differently from the idea the AI described **6 times in
 * 11 (55%)**; the other paths, 25%. The bell-ghost shipped `resonant-body`
 * ("thunder damage to whoever hits IT") in 3 of 4 runs because "bell", "toll"
 * and "peal" are its key words — while the idea was "every blow the peal LANDS
 * leaves a ring", an on-hit effect pointing the other way. The keyword label
 * also made the call REJECT a right template as a word collision: the brass
 * tyrant's "burns hotter once wounded badly" was offered `bloodied-fury`,
 * declined it, and shipped `noxious-aura` on a furnace creature.
 *
 * Tiers, strongest first. Trigger outranks effect because WHEN a row fires is
 * the thing the keyword bind got wrong, and is what the measurement scores:
 *   0  the declared mechanic the resolve call named (2026-10-23, 432/432)
 *   1  trigger AND effect agree with the idea's tags
 *   2  trigger agrees
 *   3  effect agrees
 *   4  neither
 * Catalog order holds inside a tier, so this REORDERS and never filters: a
 * mistagged idea costs the first seats, never a candidate, and the call may
 * still answer `none`.
 *
 * NOTE this cannot fix a disagreement between the idea's tag and the template's
 * own cell. The tyrant's idea was tagged `always/damage` and `bloodied-fury`
 * declares `always/defense`, so it lands in tier 2 rather than tier 1 — ahead of
 * the `save/condition` template that actually shipped, which is the measurable
 * gain, but not first.
 */
export function orderByStamps(pool, idea = null, askedMechanic = null) {
  const trig = idea?.trigger ?? null;
  const eff = idea?.effect ?? null;
  const tier = (t) => {
    if (askedMechanic && t.mechanic === askedMechanic) return 0;
    const tOk = !!trig && t.trigger === trig;
    const eOk = !!eff && t.effect === eff;
    if (tOk && eOk) return 1;
    if (tOk) return 2;
    if (eOk) return 3;
    return 4;
  };
  return pool.map((t, i) => ({ t, i, k: tier(t) })).sort((a, b) => a.k - b.k || a.i - b.i).map((x) => x.t);
}

/** Does this template fire and act the way the idea said? (the menu's own mark) */
export const stampAgrees = (t, idea) => !!idea?.trigger && t.trigger === idea.trigger && !!idea?.effect && t.effect === idea.effect;

// a PAYOFF template consumes a condition another row must produce (Gristle
// Hill's 84-damage execute keyed on Grappled with nothing on the sheet that
// grapples, critic run three) — off the menu when the sheet imposes nothing
const REQUIRES_IMPOSED = new Set(['condition-payoff', 'exploiter']);
// A MECHANIC ENGINE NEEDS A KEY IN THE GM's WORDS (the critic's third species read): a shape whose frame imposes Grappled or swallows
// never lands on words that never asked for it. A creature-only prompt (three significant words or fewer) gives nothing to read and the
// catalog composes freely, as the head-clause rule says.
/**
 * WHAT THE ROW DOES — the mechanic, declared, so the engine can match the GM's
 * ask to a template without reading words.
 *
 * The owner's architecture (2026-10-23): categorize in the first calls, sort on
 * the stamps, and let the final prompt take instruction. The resolve call already
 * names a mechanic from the GM's own words; no template declared one, so there
 * was nothing to match it against and `rankByVerb`'s 1,553 key words were the
 * only bridge.
 *
 * Measured before this landed: the declared `askShape` narrowing gets 108 -> ~30
 * templates, and the word list then cut 30 -> 14, which is SELECTION by word
 * overlap, not ordering. Adding this field takes the same cells to a mean of
 * **2.3 candidates** (worst bucket 5), which is what makes selection-by-stamp
 * reachable. A cell like `save/condition` holds a swallow, a gaze, a shove and a
 * charm; nothing in the other 24 declared fields could tell them apart.
 */
export const MECHANIC = {
  relic: ['relic-object'], // a thing it keeps, that the party can take away
  harvest: ['kill-denial'], // what the creature does to what it kills
  swallow: ['swallow'],
  gaze: ['gaze-single', 'gaze-aura', 'random-ray'],
  snare: ['snare', 'snare-bolt'],
  grapple: ['snatch', 'hook-drag', 'hook-rider', 'reel', 'pull-through', 'adhesive'],
  shove: ['shield-bash', 'push-prone', 'charge-push', 'obstacle-pull', 'disarm'],
  charm: ['lure', 'aggro-curse', 'pacify'],
  fear: ['escalating-dread', 'terror-pulse', 'phobia', 'wail'],
  dazzle: ['sensory-strike', 'reveal', 'marking-light', 'bolt-mark'],
  charge: ['trample', 'charge', 'leap', 'pounce', 'burrow-ambush', 'relentless-pursuit'],
  breath: ['spew', 'noxious-aura'],
  burst: ['thrown-burst', 'thrown-burst-seed', 'ground-burst', 'death-burst', 'bloodied-burst', 'active-toll', 'throw-retrieve'],
  drain: ['drain', 'life-drain'],
  curse: ['curse-debt', 'delayed-brand', 'affliction', 'contagion', 'seal'],
  retaliate: ['heated-body', 'resonant-body', 'ward-retaliation', 'riposte', 'own-turn-punisher', 'weapon-lodge', 'coating', 'interpose', 'snap-shot'],
  climb: ['spider-climb', 'web-walker', 'terrain-walk', 'earth-glide', 'tunneler'],
  teleport: ['blink', 'phase-slip', 'self-invisibility'],
  zone: ['zone', 'zone-seed', 'blighted-ground', 'aberrant-ground', 'fire-aura'],
  disguise: ['false-appearance', 'mimicry', 'blurred-form'],
  // split from one bucket of 8, which was the worst in the measurement
  harden: ['shell-withdraw', 'sealed-body', 'guarded-stance', 'patient-defense'],
  resist: ['absorption', 'evasion', 'shielded-mind', 'undead-fortitude'],
  escalate: ['bloodied-fury', 'rampage', 'berserk', 'execute', 'condition-payoff', 'exploiter', 'assassinate', 'isolation', 'wind-up'],
  mend: ['lay-on-hands', 'second-wind', 'warded-mending'],
  command: ['rally', 'volley-order', 'herd'],
  track: ['uncanny-sense', 'faultless-tracker', 'bound', 'focus', 'feint-slip', 'slow-bolt', 'stunning-strike', 'bolt-restrain', 'bolt-drag', 'truth-aura'],
};
/** The mechanic a template implements, or null. One definition, built once. */
export const MECHANIC_OF = Object.fromEntries(Object.entries(MECHANIC).flatMap(([m, ids]) => ids.map((id) => [id, m])));
export const MECHANICS = Object.keys(MECHANIC);

/**
 * WHAT MUST BE TRUE OF THE BODY — in plain words, for the CALL to judge.
 *
 * Step 1 of plans/declare-the-body-2026-10-22.md. The menu screened a template
 * against the creature's JOB (role shelf, CR band, style) and never its BODY, so
 * `adhesive` reached an owlbear because an owlbear is a `brute`. The AI refused
 * it, correctly, and the engine shipped the refusal anyway as a decoration row.
 *
 * These strings are QUESTIONS FOR THE CALL, never patterns to match. Do not turn
 * one into a regex and do not add a word to a template's `keys` to stand in for
 * one — that is the hidden-error failure the owner ruled against (2026-10-22:
 * "I would rather a stochastic error of 1 in 10 over a consistent hidden error
 * over a case we haven't tested"). The two concept regexes this retires,
 * shell-withdraw's and blink's, are exactly that failure — a word list says
 * nothing about the case outside it.
 *
 * Measured, so the claim stays honest (body6-2026-10-22T15-02-36): the call fixes
 * the direction where the WORDS are present and the body is not — an owlbear is
 * not sticky, a vampire has no ward, a lizardfolk is not made of brass, three for
 * three live. It did NOT fix "an ancient thing carrying a stone house on its
 * back", which the call also reads as no shell. That example shows what the regex
 * could not see; it does not show the call seeing it.
 *
 * The bar is a CONTRADICTION A GM WOULD SEE, not a correlation in print. Print
 * pairs Spider Climb with a Climb speed 12 times in 14 and the gate was still
 * wrong, because the trait GRANTS the climbing. And a gate must not become a
 * wall: print's own Mimic HAS Adhesive, so a judge that refuses a mimic is as
 * broken as one that glues an owlbear.
 */
export const NEEDS_BODY = {
  'relic-object': 'something it keeps apart from its own body — a vessel, a trophy, a tool, a jar, a severed part; a creature that carries nothing and is all of one piece has no relic to bind',
  'kill-denial': 'a way of killing that destroys or keeps the body — teeth, fire, rot, a blade, something that consumes; not a death by fright or persuasion alone',
  adhesive: 'a surface that is sticky, secreting, or coated in something adhesive',
  'resonant-body': 'a body of metal, crystal, glass, or something hollow that rings when struck',
  'active-toll': 'a body that rings, tolls, or resonates',
  'heated-body': 'a body that is burning hot, molten, or wreathed in flame',
  'fire-aura': 'a body that burns, radiates heat, or is wreathed in flame',
  // 2026-10-22: the first wording, 'a body that reeks, rots, or gives off fumes',
  // carried 3 of 5 misses on the held-out probe — it missed a siege engine that
  // "belches smoke" and a swarm of carrion beetles, and false-positived on a
  // glacier "trailing a wake of killing cold". It asked about a BODY while the
  // concepts described an ACT, and "fumes" read as any emission. Name the act and
  // the smell, and exclude the cold.
  'noxious-aura': 'a stench it gives off, or smoke, fumes, spores or rot it belches or trails — a SMELL or a choking cloud, not merely cold or dark',
  spew: 'a mouth, vent, or opening it can force something out of',
  coating: 'venom, poison, acid, or some substance it can coat a strike with',
  'marking-light': 'a body that sheds light, glows, or burns visibly',
  'warded-mending': 'a ward, shrine, charge, or consecrated place it draws strength from',
  'ward-retaliation': 'something specific it guards — a charge, a ward, or a place',
  'sealed-body': 'a body that is closed or airtight, with no openings to exploit',
  'false-appearance': 'a body that can pass for an ordinary object when it holds still',
  'shell-withdraw': 'a shell, carapace, or hard case it can pull itself into',
  blink: 'a body that phases, steps between places, or is not wholly here',
  'phase-slip': 'a body that phases, steps between places, or is not wholly here',
  'gaze-single': 'eyes, or some organ of sight it can fix on a victim',
  'gaze-aura': 'a face or form that is horrifying to look at',
  'random-ray': 'eyes, or many of them, that it can fire something from',
  mimicry: 'a voice, or some way of making sounds that are not its own',
  wail: 'a voice, or some way of making sound',
  herd: 'a voice, horn, or some way of making a sound others obey',
  rally: 'a voice, and allies who can hear it',
  'volley-order': 'allies who fight alongside it and take its orders',
  'hook-rider': 'a hook, claw, tendril, or something that catches and holds',
  snare: 'webs, cords, tendrils, or something it can entangle with',
  'snare-bolt': 'a lash, line, or something it can throw to entangle at range',
  'web-walker': 'webs it spins or lives in',
  'blurred-form': 'a body that is indistinct, shifting, or hard to look at directly',
  zone: 'something it gives off — gas, murk, spores, dark, or cold',
  'zone-seed': 'something it gives off — gas, murk, spores, dark, or cold',
  'blighted-ground': 'a corrupting presence that fouls what it touches',
  'aberrant-ground': 'a presence so unnatural that the ground near it is wrong',
  absorption: 'a body that drinks in one kind of energy rather than being hurt by it',
  drain: 'a way of taking life, warmth, or vitality out of what it touches',
  // 2026-10-22, drain10: the first wording — 'a touch that drains, withers, or
  // drinks the life out of what it strikes' — was refused for "a clay guardian
  // whose every blow leaves a wound that will not close", which is print's OWN
  // canonical case (Clay Golem/Slam). It framed the mechanic as life-draining
  // when print's range runs from the Specter's drain to the Golem's acid wound
  // to the Mummy's rot. Name the WOUND as well as the draining.
  'life-drain': 'a strike that withers, drains, rots, or leaves a wound that will not close',
  'faultless-tracker': 'a sense — scent, a bond, or an unnatural certainty — for following prey',
  'uncanny-sense': 'a sense beyond sight: scent, tremor, echo, or something stranger',
  'terrain-walk': 'a body or gait suited to one hostile terrain',
  'bloodied-burst': 'a body that would spill, burst, or erupt when badly wounded',
  'death-burst': 'a body that would spill, burst, or erupt when it dies',
  seal: 'a touch that closes, binds, or seals what it is laid on',
};

/** The size ladder, smallest first. One definition: the checker's engulf-size rule reads it too. */
export const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
const NEEDS_ENGINE_KEY = new Set(['swallow', 'hook-drag', 'snatch', 'reel', 'pull-through']);
const ENGINE_KEY_WORD = /\b(?:grapple|grapples|grappled|grab|grabs|grabbing|seize|seizes|hold|holds|clutch|clutches|wrestle|constrict|constricts|crush|crushes|squeeze|squeezes|drag|drags|dragging|pull|pulls|pulling|haul|hauls|yank|yanks|hook|hooks|swallow|swallows|engulf|engulfs|devour|devours|gulp|smother|smothers|entomb|envelop|coil|coils|wrap|wraps|snare|snares|net|nets|tentacle|tentacles|jaws|maw|bite|bites|lash|lashes|whip|whips|chain|chains|rope|tongue|trunk|pin|pins|under|beneath|inside)\b/i;
/**
 * The concept's content words. A concept with three or fewer carries too little
 * to judge a body claim on, and the convention in this file is that the unknown
 * does not exclude ("no type known: no exclusion" — templates.spec.js). One
 * definition: `engineKeyOk` and the body-requirement fallback both read it.
 */
export const significantWords = (concept) => String(concept ?? '').toLowerCase().split(/[^a-z']+/)
  .filter((w) => w.length > 2 && !/^(?:the|and|but|with|who|that|which|its|his|her|their|into|onto|from|for|out|off|over|under|this|than|then|them|they|was|were|has|have|had|are|been|being|not|one|two|too|very|own|new|old)$/.test(w));
export const engineKeyOk = (concept) => significantWords(concept).length <= 3 || ENGINE_KEY_WORD.test(String(concept ?? ''));

const SECTION_BY_REPLACES = { signature: 'action', nova: 'action', 'bonus-alt': 'bonus_action', trait: 'trait', 'melee-rider': 'rider', 'ranged-rider': 'rider', reaction: 'reaction' };
const HOST_BY_REPLACES = { 'melee-rider': 'melee', 'ranged-rider': 'ranged' }; // which attack row a rider appends to

const slotsOf = (text) => [...new Set([...String(text).matchAll(/\{([a-z_]+)\}/g)].map((m) => m[1]))];

/** The unified catalog. */
export const TEMPLATES = [
  ...SHAPES.filter((s) => SECTION_BY_REPLACES[s.replaces] && SHAPE_TAGS[s.id]).map((s) => ({
    id: s.id, name: s.name, kind: 'shape', cite: s.cite,
    section: SECTION_BY_REPLACES[s.replaces], replaces: s.replaces, roles: s.roles, styles: s.styles, cr_range: s.cr_range, /* `replaces` names the SLOT the template claims — the slot-yield rule reads it (fidelity pipeline step 2) */
    gate: s.gate ?? null, nova: s.replaces === 'nova', requires_movement: s.requires_movement ?? null, requires_style: s.requires_style ?? null, supersedes: s.supersedes ?? null, deny_types: s.deny_types ?? null, requires_row: s.requires_row ?? null, requires_claim: s.requires_claim ?? null, requires_size: s.requires_size ?? null, needs_body: NEEDS_BODY[s.id] ?? null, family: FAMILY[s.id] ?? null, mechanic: MECHANIC_OF[s.id] ?? null, targets: s.targets ?? null, target_sizes: s.target_sizes ?? null, duration_default: s.duration_default ?? null,
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
    // DECLARATIONS REACH A SEED TOO (bug, found 2026-10-22 while adding FAMILY):
    // the catalog is built from two branches, and only the SHAPES branch carried
    // `needs_body`. Eight requirements — coating, phase-slip, herd, rally,
    // snare-bolt, zone-seed, blighted-ground, drain — were silently inert from
    // the moment they were written, because their templates are `kind: 'seed'`.
    // A declaration that never reaches its template is worse than no declaration:
    // the table reads complete. `body-requirements.spec.js` now asserts every
    // NEEDS_BODY and FAMILY key lands on its template, so this cannot recur.
    mechanic: MECHANIC_OF[seed.key] ?? MECHANIC_OF[SHAPES.some((sh) => sh.id === seed.key) ? `${seed.key}-seed` : seed.key] ?? null,
    duration_default: seed.duration_default ?? null, // a seed declares its own default too, or the frame path's choice never reaches it
    needs_body: NEEDS_BODY[SHAPES.some((sh) => sh.id === seed.key) ? `${seed.key}-seed` : seed.key] ?? NEEDS_BODY[seed.key] ?? null,
    family: FAMILY[SHAPES.some((sh) => sh.id === seed.key) ? `${seed.key}-seed` : seed.key] ?? FAMILY[seed.key] ?? null,
    trigger: /When (?:the creature|it) hits\b/i.test(seed.text) ? 'on_hit'
      : /\*Trigger:\*|hits the creature|is hit by|takes damage/i.test(seed.text) ? 'on_being_hit'
      : /at the start of each of (?:its|the creature's) turns/i.test(seed.text) ? 'start_of_turn' // the recurring idiom; "until the start of its next turn" is a duration
      : /Saving Throw/.test(seed.text) ? 'save' : 'always',
    effect: /condition/.test(seed.text) ? 'condition' : /damage/.test(seed.text) ? 'damage' : 'movement',
    text: seed.text, ...(seed.imposes ? { imposes: seed.imposes } : {}), keys: [...new Set([seed.key, ...(seed.keys ?? []), ...(VERB_KEYS[SHAPES.some((sh) => sh.id === seed.key) ? `${seed.key}-seed` : seed.key] ?? [])])], flavor: slotsOf(seed.text).filter((x) => FLAVOR_SLOTS.includes(x)),
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

// THE SHAPE OF THE MOVE, NOT THE ARCHETYPE OF THE MONSTER (critic's ruling 1a,
// 2026-10-20). A third of the signature misses were templates the ROLE FILTER cut
// before the call ever saw them: Meshrin's roar needed terror-pulse, which is not
// on the skirmisher-hurler shelf; Glacier Heart's "ploughs through everything"
// needed trample, not offered to brute-juggernaut; Krennik's planted standard
// needed rally. Monsters cross archetypes — a skirmisher can roar.
//
// The shape metadata already exists in two vocabularies. The catalog tags every
// template with a (trigger, effect) pair; the clause reader tags an owed clause
// with its own `asked` shape. This table is the translation between the two
// ENUMS — closed facts, not a reading of words. A clause may map to more than one
// catalog shape, because "save_single" is honestly either a condition or damage.
const ASKED_SHAPES = {
  save_area: [['save', 'damage'], ['save', 'condition']],
  save_single: [['save', 'condition'], ['save', 'damage']],
  save: [['save', 'condition'], ['save', 'damage'], ['save', 'movement']],
  condition: [['on_hit', 'condition'], ['save', 'condition'], ['always', 'condition']],
  movement: [['always', 'movement'], ['save', 'movement'], ['on_hit', 'movement']],
  buff_self: [['always', 'defense'], ['always', 'resource'], ['once_per_fight', 'damage']],
  buff_ally: [['always', 'resource'], ['always', 'defense']],
  defense: [['always', 'defense'], ['on_being_hit', 'defense']],
  retaliate: [['on_being_hit', 'damage'], ['on_being_hit', 'defense']],
};
/** The catalog shapes a clause's `asked` tag names. A slashed tag ("on_hit/condition") is already a pair. */
export function shapesForAsked(asked) {
  const raw = String(asked ?? '').trim().toLowerCase();
  if (!raw || raw === 'nothing' || raw === 'attack') return []; // an attack row is not a template shape
  const out = [];
  for (const part of raw.split('/')) if (ASKED_SHAPES[part]) out.push(...ASKED_SHAPES[part]);
  // a slashed tag whose halves are a catalog trigger and effect IS a shape
  const [a, b] = raw.split('/');
  if (a && b && TRIGGERS.includes(a) && EFFECTS.includes(b)) out.push([a, b]);
  if (b && EFFECTS.includes(b) && !out.length) for (const t of TRIGGERS) out.push([t, b]); // the effect alone still narrows
  return [...new Map(out.map((p) => [p.join('/'), { trigger: p[0], effect: p[1] }])).values()];
}
/** How many off-shelf shape matches a signature menu may gain (the critic's "3-6"). */
export const SHAPE_MENU_CAP = 6;

/**
 * WHICH body requirements are LIVE for this sheet — the only ones worth asking.
 *
 * Runs the ordinary menu filter with every body requirement treated as satisfied,
 * so what comes back is the set a template could reach on role, CR, style, type,
 * movement and size alone. Asking only these keeps the call's question list to the
 * handful in play instead of all 41, and it is why the body verdicts ride on the
 * IDEA call (once per sheet, before any menu is built) rather than costing a new
 * round trip.
 *
 * @returns {Array<{id: string, needs: string}>}
 */
export function liveBodyRequirements(ctx = {}) {
  const satisfied = new Proxy({}, { get: () => true, has: () => true });
  const out = new Map();
  for (const section of ['action', 'bonus_action', 'reaction', 'trait', 'rider']) {
    for (const t of templatesFor({ ...ctx, section, trigger: null, bodyVerdicts: satisfied })) {
      if (t.needs_body && !out.has(t.id)) out.set(t.id, { id: t.id, needs: t.needs_body });
    }
  }
  return [...out.values()];
}

export function templatesFor({ archetype, style = null, cr, movement = '', sections = {}, section = null, trigger = null, text = null, imposed = null, type = '', concept = '', size = '', holds = null, bodyVerdicts = null, shapes = null, shapeCap = SHAPE_MENU_CAP, diagnose = null } = {}) {
  const band = bandFor(cr);
  const rows = Object.values(sections).flat();
  // A FEATURE ALREADY ON A ROW IS OWNED (critic, 2026-10-14: Rruzhk's Open Hand
  // printed its Stunning Strike rider twice — the class kit welded the rider to
  // the row, where it has no row name of its own, so the signature's own fit
  // picked the same template off the menu and welded it again).
  const owned = new Set(rows.flatMap((e) => [e.name, e.feature]).filter(Boolean).map((n) => String(n).replace(/ \(.*\)$/, '').toLowerCase()));
  const hasNova = rows.some((e) => (/^Recharge/.test(e.gate ?? '') || /\(Recharge [\d–-]+\)/.test(e.name ?? '')) && /\d+ \(\d+d\d+/.test(e.text ?? ''));
  const roles = rolesFor(archetype);
  const engines = sheetEngines(sections);
  // a template that SUPERSEDES a row on this sheet replaces that row's engine
  // family rather than doubling it: the returning throw IS what Hurled Weapon
  // rewrites, so the family it constitutes cannot exclude it (the lancer's
  // donor row said "throws", goldens 2026-09-22)
  const supersedesRow = (t) => t.supersedes instanceof RegExp && rows.some((e) => t.supersedes.test(e.text ?? ''));
  // THE SHELF IS A DEFAULT FOR WHAT THE GM DID NOT SAY, NOT A VETO ON WHAT THEY
  // DID (critic's call, 2026-10-14: "a shape the GM's own words key exactly may
  // come from off the role's shelf. CR band, nova cap, structure and pricing
  // still apply; only the role filter steps aside"). It closes Roan's stampede,
  // which no defender shelf carried, and Seraphine's smite in one rule. The key
  // must be DISTINCTIVE — five letters or a phrase — so a loose word does not
  // open the catalog.
  const askedFor = (t) => {
    const src = readPhrases(scrubDeniedClauses(String(concept ?? '')));
    if (!src) return false;
    const words = wordsOf(src);
    return (t.keys ?? []).some((k) => (k.length >= 5 || k.includes(' '))
      && !(SENSE_DENY[k] && SENSE_DENY[k].test(src))
      && (k.includes(' ') ? src.toLowerCase().includes(k) : words.some((w) => sameStem(w, stem(k)))));
  };
  const onShelf = (t) => t.roles.some((r) => roles.includes(r));
  // STYLE IS A TASTE FILTER, LIKE ROLE — not a renderability one, so it steps
  // aside for a shape match (critic's 1a). It cut the critic's own Glacier Heart
  // case: `trample` is tagged styles:['mounted'], so a brute-JUGGERNAUT could
  // not see it while a plain brute could — and print's tramplers are the Gorgon,
  // the Triceratops and the Elephant, none of them mounts.
  const onStyle = (t) => !style || t.styles.length === 0 || t.styles.includes(style);
  // the off-shelf ones are APPENDED, never mixed in: a longer menu must not
  // reorder a pick the shelf already had (the re-roll's own reel pin)
  const rest = (t) => (true
    && (!(EXCLUDE_ON[t.id] ?? []).some((fam) => engines.has(fam)) || supersedesRow(t))
    && cr >= t.cr_range[0] && cr <= t.cr_range[1]
    && (t.kind !== 'shape' || t.frames[band])
    && (!t.requires_movement || new RegExp(t.requires_movement, 'i').test(movement))
    && (!t.requires_style || t.requires_style === style) // a ward-shaped reaction needs the warden seat, not just a defender line
    && !(t.deny_types && type && t.deny_types.some((ty) => new RegExp(`^${ty}\\b`, 'i').test(String(type))))
    // A BODY-MASS REQUIREMENT, read off the DECLARED size — never off the text.
    // Fails OPEN when size is unknown, like `type` and `movement` above, so the
    // call sites that pass no size are unaffected. Only two templates declare
    // it: trample (print 4 of 4 Large+) and leap. Measured against print, which
    // is also how the circular Climb gate on spider-climb was caught — print
    // CORRELATION is not a requirement, so the test is whether a GM would read a
    // contradiction (a Tiny body trampling a Medium one), not whether every
    // print instance happens to satisfy it (2026-10-22).
    && !(t.requires_size && size && SIZES.indexOf(String(size)) >= 0
      && SIZES.indexOf(String(size)) < SIZES.indexOf(t.requires_size))
    && !(t.requires_row instanceof RegExp && rows.length && !rows.some((e) => t.requires_row.test(e.text ?? '')) && !(t.keys ?? []).some((k) => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(readPhrases(String(concept ?? ''))))) // a body-plan filter: a hurled weapon needs something to throw — a thrown/ranged row on the sheet, or a weapon the USER's words name (the armor's lance; never the gong) // a body trait is a BODY's: contact damage on a Humanoid pirate queen read her name as brine (critic, new lines 2026-09-28)
    && (!section || t.section === section)
    && triggerCompatible(trigger, t.trigger)
    && !(text && deniedBy(t, text).length)
    && !(REQUIRES_IMPOSED.has(t.id) && Array.isArray(imposed) && !imposed.length)
    // THE CALL DECIDES WHETHER THIS CREATURE HOLDS (owner's preference, 2026-10-17:
    // calls and keywords returned from the LLM over deterministic gates). The
    // route call answers `holds` with the GM's own words as its receipt, and
    // `engineKeyOk` is the word list asking the same question. A thieves'-guild
    // bookkeeper answered holds=false and the engine landed an "Accountant's
    // Ledger Hook" anyway, which the checker then failed for having no key
    // (gate-2026-10-17T19-30-16). The answer decides where the row LANDS, not
    // only where it is reported. A null answer leaves the word list deciding.
    && !(NEEDS_ENGINE_KEY.has(t.id) && (holds === null ? !engineKeyOk(concept) : !holds))
    // IS IT TRUE OF THIS BODY? The template DECLARES what it needs in plain words
    // (NEEDS_BODY) and the CALL judges it, exactly as `holds` is judged above —
    // that one body question, generalised to the other 41. A verdict of false
    // keeps the template off the menu, so the AI is never offered an ability it
    // would be right to refuse (the sticky owlbear, package seven).
    //
    // An UNANSWERED requirement falls back to the template's own `keys`, which is
    // the only job `keys` has here: a fallback for a failed call, never a gate in
    // its own right (house rule: a word list "acts as a fallback only when the
    // call fails or errors — never as a tiebreaker against it"). A null answer
    // leaves the word list deciding, the same concession `holds` makes.
    && !(t.needs_body && (() => {
      const v = bodyVerdicts ? bodyVerdicts[t.id] : undefined;
      if (typeof v === 'boolean') return !v;
      // UNANSWERED. A failed call must not silently strip 41 templates, so the
      // fallback keeps this file's convention that the unknown does not exclude:
      // a concept too thin to judge gates nothing, exactly as `engineKeyOk` lets
      // a three-word concept through. Otherwise the template's own `keys` decide
      // — the only job `keys` has here, and never a tiebreaker against a verdict.
      if (significantWords(concept).length <= 3) return false;
      // A ROW ALREADY ON THE SHEET IS A CLAIM TOO — the retired `requires_claim`
      // checked both the words and the rows ("Bony Carapace: its shell is thick"
      // buys a shell for a concept that never mentions one), and the fallback must
      // not lose that. The call sees the sheet in its own prompt (`sheetLines`).
      const says = (text) => (t.keys ?? []).some((k) => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text));
      return !says(readPhrases(String(concept ?? ''))) && !rows.some((e) => says(`${e.name ?? ''} ${e.text ?? ''}`));
    })())
    // A CLAIM FOR A BODY OR A TECH (the critic's fifth read: an orc "withdraws
    // into its shell"; a troglodyte teleports 40 feet). A shape whose fiction is
    // anatomy or arcane tech needs that claim in the GM's words or on the sheet
    // — the match keys are deliberately loose ("retreat", "shadow", "step") and
    // an idea-level verb must not buy a shell. Narrower than keys, by design.
    && !(t.requires_claim instanceof RegExp && !t.requires_claim.test(String(concept ?? '')) && !rows.some((e) => t.requires_claim.test(`${e.name ?? ''} ${e.text ?? ''}`)))
    // a rider needs its host row on the sheet (a ranged rider was offered to a phantom with no ranged row)
    && !(t.host && rows.length && !rows.some((e) => (t.host === 'ranged' ? /Ranged Attack Roll/ : /Melee Attack Roll/).test(e.text ?? '')))
    && !(t.nova && hasNova)
    && !owned.has(t.name.toLowerCase()));
  // the ROLE FILTER NO LONGER EXCLUDES on a slot that named its shape: the
  // shape-matched templates are appended across roles, after the shelf and the
  // key-asked ones, so a pick the shelf already had keeps its order (the
  // re-roll's reel pin) and nothing the shelf offered is lost.
  const wantShape = Array.isArray(shapes) && shapes.length
    ? new Set(shapes.filter((x) => x?.trigger && x?.effect).map((x) => `${x.trigger}/${x.effect}`))
    : null;
  // WHY A SAME-SEAT TEMPLATE WAS NOT OFFERED (2026-10-21). The gap trace records
  // the menu, but "no same-seat option was shown" has two very different causes —
  // the shelf/legality filters correctly ruled them all out, or they were ruled out
  // wrongly. Only this function holds the context needed to tell them apart, and an
  // offline reconstruction cannot: three separate attempts to rebuild a live menu
  // from the saved sheet disagreed with the run. So it reports, when asked.
  if (diagnose && section && trigger) {
    diagnose.sameSeatRejected = TEMPLATES
      .filter((t) => t.section === section && t.trigger === trigger)
      .filter((t) => !(onShelf(t) && onStyle(t) && rest(t)))
      .map((t) => `${t.id}:${!onShelf(t) ? 'role' : !onStyle(t) ? 'style' : 'legality'}`);
  }
  const onShelfList = TEMPLATES.filter((t) => onShelf(t) && onStyle(t) && rest(t));
  const askedList = TEMPLATES.filter((t) => !(onShelf(t) && onStyle(t)) && askedFor(t) && rest(t));
  if (!wantShape) return [...onShelfList, ...askedList];
  const already = new Set([...onShelfList, ...askedList].map((t) => t.id));
  const byShape = TEMPLATES.filter((t) => !already.has(t.id) && wantShape.has(`${t.trigger}/${t.effect}`) && rest(t)).slice(0, shapeCap);
  return [...onShelfList, ...askedList, ...byShape];
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
// A PREDICATE SLOT is not a sentence. Its frame owns the subject ("Each
// creature in the area {zone_rule}.") and the period, so the fill is a bare
// predicate: lowercase, no terminal stop. The engine's own blind default used
// to land after a period — "...up to 10 minutes. has Disadvantage on attack
// rolls" (critic, the forty, 2026-10-19). Shape only; no meaning is read.
const PREDICATE_SLOTS = new Set(['zone_rule', 'kill_consequence']); // "crumbles to dust" — a predicate, so `asPredicate` already enforces the shape
const asPredicate = (s) => { const v = String(s ?? '').trim().replace(/[.;,]+$/, ''); return /^[a-z]/.test(v) ? v : null; };
const shortFlavor = (s) => typeof s === 'string' && s.trim().split(/\s+/).length <= 8 && noDigits(s) && !/saving throw|damage|condition|DC\b/i.test(s);

/**
 * Render one template at this sheet's numbers. Returns null when a slot
 * cannot be filled (a miss, never a half-filled row).
 * ctx: { scaled, energy, mix, meleeName, conditionMinor, projectile, archetype, imposed, mechanics, cr, name }
 */
// generic fills for a BLIND render (the fallback): the fiction is plain, never wrong
const BLIND_FILLS = { kill_consequence: 'crumbles to dust', relic: 'a sealed reliquary', /* print's own: the Mummy's victim "dies and turns to dust" */ phobia: 'the thing it fears', restraint: 'the binding', /* the snare's object noun: an empty slot printed "Restrained until the Restrained is destroyed" (critic's blockers audit 2026-10-03) */ douse: 'tear the brand away', projectile: 'a hurled object', wound_phrase: 'a festering wound', zone_effect: 'a choking haze', zone_rule: 'has Disadvantage on attack rolls', disguise: 'an ordinary object', shell: 'its shell', telegraph: 'its whole frame tensing', lure_source: 'the creature', hook: 'its grip', terrain: 'mud', sense_target: 'moving creatures', anchor: 'its resting place', ward: 'its ward' }; // sense_target is the neutral sense: a rejected fill on a hound printed "precious metal" (the fourteen, 2026-09-28)
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
/**
 * WHAT EACH TEMPLATE IMPOSES, DECLARED — not read back out of the rendered text.
 *
 * Hand-checked against every condition clause in the frames below (2026-10-21).
 * It is declared rather than derived because the text cannot be parsed reliably:
 * `if` means IMPOSES in snatch ("If the target is a Medium or smaller creature,
 * it has the Grappled condition") and REQUIRES in evasion ("It can't use this
 * trait if it has the Incapacitated condition"), with identical grammar either
 * side. A derivation also reads shell-withdraw's SELF-imposed Prone as an
 * affliction on a target, and condition-payoff's `{consumed_condition}` target
 * filter as an imposition. Five such modes conflict; no regex separates them.
 *
 * A value is either one condition for every frame, or a map from CR band to the
 * condition that band's frame imposes. Only frames listed here impose anything.
 *
 * DELIBERATELY ABSENT:
 *   shell-withdraw — "it gains +4 AC and has the Prone condition": on ITSELF.
 *   evasion        — "can't use this trait if it has the Incapacitated
 *                     condition": a requirement.
 *   condition-payoff's target filter — it CONSUMES a condition (REQUIRES_IMPOSED)
 *                     and separately imposes Stunned at 21+, which is listed.
 */
const IMPOSES_BY_TEMPLATE = {
  // print's own swallow text imposes three at once, in the COMPOUND idiom
  // ("has the Blinded and Restrained conditions") that a singular-only scan
  // misses — the gap the owner caught, 2026-10-21
  swallow: ['Prone', 'Blinded', 'Restrained'],
  trample: 'Prone',
  snare: 'Restrained',
  contagion: 'Poisoned',
  spew: 'Poisoned',
  'resonant-body': 'Deafened',
  'active-toll': 'Deafened',
  adhesive: 'Grappled',           // "is also Grappled by it (escape DC)"
  snatch: 'Grappled',             // behind a size gate — still an imposition
  'bolt-restrain': 'Restrained',  // behind a size gate
  'shield-bash': 'Prone',         // behind a size gate
  pounce: 'Prone',
  'charge-push': 'Prone',
  'gaze-aura': 'Frightened',
  lure: 'Charmed',
  'hook-drag': ['Grappled', 'Restrained'], // Restrained follows the grapple from 10-12 up
  'pull-through': 'Prone',   // "the target emerges Prone" — a bare condition word, no "condition" noun
  'stunning-strike': { '3-5': 'Stunned', '6-9': 'Stunned', '10-12': 'Stunned', '13-20': 'Stunned', '21+': 'Stunned' },
  leap: { '3-5': 'Prone', '6-9': 'Prone', '10-12': 'Prone' },
  'thrown-burst': { '6-9': 'Prone', '10-12': 'Prone', '21+': 'Prone' },
  charge: { '3-5': 'Prone', '6-9': 'Prone', '10-12': 'Prone', '13-20': 'Prone', '21+': 'Prone' },
  'burrow-ambush': { '0-2': 'Prone', '3-5': 'Prone', '6-9': 'Prone', '10-12': 'Prone', '13-20': 'Prone' },
  reel: { '13-20': 'Prone' },
  execute: { '3-5': 'Unconscious' },
  'condition-payoff': { '21+': 'Stunned' },
  'gaze-single': { '0-2': 'Frightened', '3-5': 'Frightened', '13-20': 'Paralyzed', '21+': 'Blinded' },
};

// the condition a given template's given CR band imposes, or null
export function imposedByFrame(id, band) {
  const d = IMPOSES_BY_TEMPLATE[id];
  if (!d) return null;
  if (typeof d === 'string' || Array.isArray(d)) return d;
  return d[band] ?? null;
}

export function renderTemplate(t, ctx, fills = {}, { blind = false } = {}) {
  let saveOverride = null; // why the engine overrode the model's save_stat, for the trace
  let pickedCondition = null; // the condition this render imposes, chosen from the closed list below
  let consumedPick = null; // the condition this render REQUIRES on its target (a payoff), from the model's consumed_condition
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
      const v = shortFlavor(fills[k]) && !doublesFrameVerb(text, k, fills[k]) && fillKeepsFrame(k, fills[k]) ? fills[k] : BLIND_FILLS[k];
      if (!shortFlavor(v)) return null;
      const w = PREDICATE_SLOTS.has(k) ? (asPredicate(v) ?? asPredicate(BLIND_FILLS[k])) : v.trim();
      if (!w) return null;
      text = text.split(`{${k}}`).join(w);
    }
    // {duration} ON A SEED. Seeds render through their own pipeline, which fills
    // FLAVOR_SLOTS and then rejects any slot left over — so a seed carrying
    // {duration} rendered null until this ran (escalating-dread, 2026-10-23). Same
    // rule as the frame path: the call's choice if the effect is a condition and
    // the form is print's, else the template's own default.
    if (text.includes('{duration}')) {
      const allowedS = t.effect === 'condition' ? DURATIONS : [];
      const askedS = String(fills.duration ?? '').trim();
      const ddS = t.duration_default;
      const fallbackS = (ddS && typeof ddS === 'object' ? (ddS[bandFor(ctx.cr)] ?? ddS.default) : ddS) ?? 'target_end';
      const clauseS = durationClause(allowedS.includes(askedS) ? askedS : fallbackS);
      if (!clauseS) return null;
      text = text.split('{duration}').join(clauseS);
    }
    if (/\{[a-z_]+\}/.test(text)) return null;
    // the drawn card's own tag, which this return used to drop on the floor
    // (it built a fresh object and only looked at `pickedCondition`, which no
    // seed ever sets) — the same allow-list-forgets shape as the chassis rename
    // THE RECORD LIVES IN TWO PLACES AND THIS BRANCH READ ONLY ONE (2026-10-23).
    // A seed row declares `imposes` in the library; the TEMPLATE it is drawn for
    // declares the same thing in IMPOSES_BY_TEMPLATE. This branch took the library's
    // and stopped, so the adhesive seed — whose template declares Grappled — shipped
    // with no record at all (6 rows across four runs of the ten). The shape branch
    // below reads `imposedByFrame`; reading it here too is the same fix the body gate
    // needed when eight `needs_body` declarations were carried on one branch only.
    const seedImposes = drawn.row.imposes ?? imposedByFrame(t.id, bandFor(ctx.cr));
    return { name: t.name, text, section: SECTION_OF[t.section], gate: t.gate, ...(seedImposes ? { imposes: seedImposes } : {}) };
  }
  // A THROWN NAMED WEAPON KEEPS ITS OWN TYPE AND RANGE (the critic's second
  // species read: a spear hurled for Bludgeoning at 30/120). One table.
  const projW = /\{projectile\}/.test(t.frames?.[bandFor(ctx.cr)] ?? '') ? weaponProp(fills.projectile) : null;
  const projWeapon = projW?.thrown ? [null, projW.type, projW.range] : null;
  const projWeaponRange = projWeapon ? projWeapon[2] : null;
  const band = bandFor(ctx.cr);
  let text = t.frames[band];
  if (!text) return null;
  // THE WRITER RECORDS WHAT IT WROTE. The catalog declares what this frame
  // imposes, so no reader has to recover it from the rendered sentence.
  pickedCondition = imposedByFrame(t.id, band) ?? pickedCondition;
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

  const frameText = t.frames?.[bandFor(ctx.cr)] ?? '';
  const drains = /regains? (?:\d+ )?Hit Points|drains?|siphon/i.test(frameText); // a DRAIN is never a weapon type (Plague Siphon dealt Piercing — the critic's fourth read)
  const onHitRider = /takes an extra \{(?:avg|burst)/.test(frameText) && !/\{atk\}/.test(frameText); // an on-hit extra takes the HIT's type (Assassinate added Bludgeoning to spear hits)
  // A FEAR IS NEVER A WEAPON TYPE (critic, 2026-10-14: Bloodcurdling Howl and
  // Creeping Dread both dealt Piercing). Print's Banshee wails for Psychic; a
  // dread that hurts takes the concept's energy or Psychic, never a blade's type.
  const MENTAL = new Set(['escalating-dread', 'terror-pulse', 'wail']);
  const dtype = projWeapon ? projWeapon[1]
    : MENTAL.has(t.id) && PHYSICAL.includes(dtype0) ? (ctx.energy && !PHYSICAL.includes(ctx.energy) ? ctx.energy : 'Psychic')
    : t.id === 'spew' && !solid && PHYSICAL.includes(dtype0) ? (ctx.energy && !PHYSICAL.includes(ctx.energy) ? ctx.energy : 'Poison')
    : drains && PHYSICAL.includes(dtype0) ? (ctx.energy && !PHYSICAL.includes(ctx.energy) ? ctx.energy : 'Necrotic')
    : onHitRider && PHYSICAL.includes(dtype0) ? (ctx.energy && !PHYSICAL.includes(ctx.energy) ? ctx.energy : (ctx.meleeType && PHYSICAL.includes(ctx.meleeType) ? ctx.meleeType : dtype0))
    : dtype0; // a spewed cloud is never a weapon type: it takes the concept's energy or Poison (Noxious Spew dealt Piercing from a cloud of ash — the critic's species read)
  const engine = { ray_table: t.id === 'random-ray' ? composeRayTable(bandFor(ctx.cr)) : '', /* first: the composed table carries {dc} and damage slots the keys below fill */ dc: String(scaled.dc), atk: `+${scaled.atk}`, avg: String(full.avg), dice: full.dice, avg_half: String(half.avg), dice_half: half.dice, avg_x2: String(dbl.avg), dice_x2: dbl.dice, damage_type: dtype, melee_name: ctx.meleeName ?? 'Slam', ranged_name: ctx.rangedName ?? '' };
  // NOTHING INVENTED (2026-10-16). This default used to read `?? 'Longbow'`, so
  // a ranged-host template on a sheet with NO ranged attack rendered a weapon
  // the creature does not have: the Court Step-Wizard shipped "Missed Step
  // Riposte ... makes one Longbow attack" beside Slam and Spellcasting. The
  // call never chose that weapon — the engine supplied it. A template that
  // needs a row the sheet lacks is not renderable, so it declines here and the
  // seat falls through to one that fits.
  // {target} — THE AREA SHAPE, chosen by the call from a closed enum, sized by the
  // engine. CONSERVATIVE (owner, 2026-10-22): an area shape is only honoured on a
  // template that is already GATED, because nothing prices an ungated area row.
  // An unusable or absent choice falls to the template's own first declared shape,
  // never to a miss — the same ladder every other slot uses.
  // {duration} — HOW LONG IT LASTS, chosen by the call from print's closed set,
  // defaulting to the form the template's own text already read as. Offered only
  // where the template's declared effect is a CONDITION: print attests all four
  // forms there (n = 71) and attests NO lengthening for a self-buff, recurring
  // damage or a persistent area — its persistence is always anchored to something
  // (a grapple, a wound, concentration, an environment), and nothing here prices
  // duration. An unusable or absent choice falls to the default, never to a miss.
  if (/\{duration\}/.test(frameOf(t, ctx.cr) ?? '')) {
    const allowed = t.effect === 'condition' ? DURATIONS : [];
    const asked = String(fills.duration ?? '').trim();
    // the default may be PER BAND, like target_sizes: gaze-single's 21+ frame used
    // a different form from its lower bands, and collapsing them silently changed
    // that band's printed text (caught by diffing rendered output, not by reading
    // source — three source-parsing attempts got it wrong first, 2026-10-23)
    const dd = t.duration_default;
    const fallback = (dd && typeof dd === 'object' ? (dd[bandFor(ctx.cr)] ?? dd.default) : dd) ?? 'target_end';
    const pick = allowed.includes(asked) ? asked : fallback;
    const clause = durationClause(pick);
    if (!clause) return null;
    engine.duration = clause;
  }
  if (/\{target\}/.test(frameOf(t, ctx.cr) ?? '')) {
    const allowed = (t.targets ?? []).filter((sh) => AREA_SHAPES.includes(sh) || t.target_sizes?.[sh]);
    const asked = String(fills.area_shape ?? '').trim();
    const pick = (t.gate && allowed.includes(asked)) ? asked : allowed[0];
    const clause = pick ? areaClause(pick, bandFor(ctx.cr), t.target_sizes ?? null) : null;
    if (!clause) return null; // a {target} frame with no declared shape cannot render
    engine.target = clause;
  }
  if (/\{ranged_name\}/.test(frameOf(t, ctx.cr) ?? '') && !ctx.rangedName) return null;
  for (const [k, v] of Object.entries(engine)) text = text.split(`{${k}}`).join(v);
  if (obscuring && text.includes('has the Poisoned condition')) pickedCondition = 'Blinded'; // the retype below moves the record with the text
  if (obscuring) text = text.replace('has the Poisoned condition', 'has the Blinded condition'); // the Poison-breath frame's own rider, retyped for what ash does
  // A GULLET MATCHES THE BODY IT IS IN (flagged four times, 2026-10-14: a
  // rime-scaled wyrm swallowed for 18 (4d8) Cold and digested in Acid). Print's
  // swallows digest in Acid and the frame says so, but a creature whose own
  // words name an energy digests in that energy. A physical type never applies —
  // nothing is digested in Bludgeoning.
  if (t.id === 'swallow' && dtype && !['Bludgeoning', 'Piercing', 'Slashing'].includes(dtype)) text = text.replace(/Acid damage at the start/, `${dtype} damage at the start`);
  if (stomping) {
    const was = text;
    text = text.replace(/ damage\. \*Success:\* Half damage\.$/, ' damage, and the target has the Prone condition. *Success:* Half damage only.');
    if (text !== was) pickedCondition = 'Prone'; // this line WROTE the rider, so this line records it
  }
  // THE SAVE FOLLOWS THE CONDITION on a condition aura (critic fresh four: Stench
  // is Con on the toad and became Wis on the kilnblight — the stat drifted to the
  // caster's spell stat). Print: Poisoned/Deafened = Constitution, Frightened =
  // Wisdom, Prone = Strength. Engine-owned; the model's proposal is overruled.
  const modelSave = SAVE_STATS.includes(String(fills.save_stat)) ? String(fills.save_stat) : null; // the MODEL's pick, read before the engine's condition-save block below writes over it
  if (text.includes('{save_stat}') && text.includes('{condition_minor}')) {
    const proposedC = String(fills.condition_minor ?? '').trim();
    const condPick = MINOR.find((x) => x.toLowerCase() === proposedC.toLowerCase()) ?? (MINOR.includes(ctx.conditionMinor) ? ctx.conditionMinor : 'Frightened');
    fills = { ...fills, condition_minor: condPick, save_stat: saveStatsFor({ imposes: condPick })[0] }; // the call picked the condition from the closed list; the shared table pairs print's save stat
    // THE PICK IS KEPT (2026-10-20). This block already chooses the condition
    // from the closed MINOR list, validates the model's proposal against it, and
    // pairs print's own save stat — then discarded the choice, so every reader
    // downstream had to re-derive it from the prose. The condition and its save
    // are decided together here; the row should say so.
    pickedCondition = condPick;
  }
  if (text.includes('{save_stat}')) {
    // THE MODEL'S PICK IS CONSULTED FIRST (owner, 2026-10-25: "metadata back from
    // the LLM over string matching"). This block used to overwrite
    // `fills.save_stat` unconditionally — zero reads of the model's own answer —
    // so the VOCAB enum it chose from was decorative. Now the pick stands unless
    // print is decisive against it, and every override traces its reason.
    //
    // What the gate reads is DECLARED, not prose (owner's audit, 2026-10-25):
    //  - the imposition comes from `imposedConditions`, the one shared reader,
    //    which prefers the row's own record and otherwise reads print's "has the
    //    X condition" grammar. The prose ladder this replaces answered Wisdom for
    //    `execute`'s CR 0-2 frame, whose "one Frightened creature" is a condition
    //    it REQUIRES of its target — bar 1's own failure living inside the gate
    //    built to stop it. A targeting clause cannot match the imposition grammar.
    //  - a dead `isShove` word list (`pushed|shoved?|pulled|knocked`) sat here
    //    too: no frame carrying `{save_stat}` holds a shove verb, so it could
    //    never fire, and the shove rule is already enforced one layer down in
    //    A2 off the row's own `imposesMovement` flag. Deleted rather than fixed.
    const eff = text.replace(/\{save_stat\}/g, '');
    const picked = modelSave; // NOT fills.save_stat: the condition-save block above may already have written the engine's own choice there, and the replay showed every pick - and no pick - reading as Wisdom
    // DAMAGE IS THE POINT OF THE ROW. This stays a token read, and the declared
    // `effect` cell cannot replace it: `seal` declares effect:'condition' and
    // carries damage dice, so the two fields answer different questions — what
    // the row is FOR, versus whether its damage dominates the save. Every damage
    // token the frames use is matched ({avg} {avg_half} {avg_x2}); the first cut
    // missed _x2 and condition-payoff (the critic's Molten Weld) slipped through
    // on Wisdom. The damage is still a TOKEN here; the number fills later.
    const damageDominant = /\{avg[a-z_0-9]*\} \(\{dice[a-z_0-9]*\}\)|\d+ \(\d+d\d+/.test(eff);
    // A condition AURA binds its own save — it imposes a condition and deals no
    // damage (noxious-aura, gaze-single). When a frame carries BOTH (condition-payoff:
    // 59 fire AND a one-turn Frightened) the damage is the row and the condition
    // the rider, so the damage rule wins; the first cut re-derived Molten Weld to
    // Wisdom "because it imposes Frightened".
    const imposed = pickedCondition ?? imposedConditions({ text: eff })[0] ?? null;
    const want = saveStatsFor({ imposes: imposed, damageDominant });
    const contradicts = picked && want.length > 0 && !want.includes(picked);
    const fallback = want[0] ?? null;
    if (picked && !contradicts) fills = { ...fills, save_stat: picked };
    else if (fallback) fills = { ...fills, save_stat: fallback };
    if (picked && contradicts) saveOverride = `"${picked}" -> ${fallback}: ${damageDominant && !SAVE_FOR_CONDITION[String(imposed ?? '')] ? 'a damage-dominant row saves by Dexterity or Constitution in print, never Wisdom' : damageDominant ? `the damage is the row and ${imposed} the rider, so print saves by ${want.join(' or ')}` : `a ${imposed} row saves by ${want.join(' or ')} in print`}`;
  }
  for (const [k, list] of Object.entries(VOCAB)) {
    if (!text.includes(`{${k}}`)) continue;
    const proposed = String(fills[k] ?? '').trim();
    const pick = list.find((x) => x.toLowerCase() === proposed.toLowerCase())
      ?? (k === 'condition_minor' && list.includes(ctx.conditionMinor) ? ctx.conditionMinor : null)
      ?? ({ save_stat: 'Wisdom', consumed_condition: ctx.imposed?.[0] ?? 'Frightened', condition_minor: 'Frightened', restraint: 'Restrained', r_vuln: 'Fire' })[k];
    if (k === 'consumed_condition') consumedPick = pick; // the model's answer, recorded on the row so a ship-time gate can check the sheet supplies it
    text = text.split(`{${k}}`).join(pick);
  }
  for (const k of FLAVOR_SLOTS) {
    if (!text.includes(`{${k}}`)) continue;
    const v = shortFlavor(fills[k]) && !doublesFrameVerb(text, k, fills[k]) && fillKeepsFrame(k, fills[k]) ? fills[k] : BLIND_FILLS[k];
    if (!shortFlavor(v)) return null;
    const w = PREDICATE_SLOTS.has(k) ? (asPredicate(v) ?? asPredicate(BLIND_FILLS[k])) : v.trim();
    if (!w) return null;
    text = text.split(`{${k}}`).join(w);
  }
  if (/\{[a-z_]+\}/.test(text)) return null;
  return { name: t.name, text, section: SECTION_OF[t.section], gate: t.gate, ...(pickedCondition ? { imposes: pickedCondition } : {}), ...(consumedPick ? { consumes: consumedPick } : {}), ...(saveOverride ? { saveOverride } : {}) };
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

export function buildIdeaPrompt({ name, cr, concept, sheetLines, seats = null, energy = null, wantTrait = true, engines = [], verbs = [], owedClause = null, bodyRequirements = [], askedMechanic = null }) {
  return `You are inventing the SIGNATURE ability for a nearly-complete D&D monster. Everything below is already final. Describe the ability in PLAIN WORDS — what it does, when it fires, whom it affects, what limits it. NO rules grammar, NO numbers, NO dice, NO DCs, NO condition names in capitals: the engine owns every number and will pour your idea into a printed rules shape afterwards. Your job is the IDEA a fan would riot to find missing.
THE SHEET SO FAR (${name}, CR ${cr}) — everything already on it, header and rows:
${sheetLines}
CONCEPT: ${concept}
${askedMechanic ? `WHAT THE GM ASKED A ROW TO DO: **${askedMechanic}**. An earlier call read this from the GM's own words, and the catalog has a shape that DOES it — so an idea serving this will be printed as that shape, and an idea that wanders will be fitted to whatever it happens to resemble instead. This is the ask; serve it in your own fiction.` : ''}
${owedClause ? `THE CLAUSE THIS ABILITY IS FOR — the sheet is a PRINTED creature plus what the GM added, and this is what they added. It is the whole reason this sheet is not just the printed monster, and nothing on it answers the clause yet. Invent the ability that makes THIS true of THIS creature; do not describe the creature in general: "${String(owedClause).replace(/"/g, "'")}"
` : ''}${verbs.length ? `THE CONCEPT'S OWN VERBS: ${verbs.join(', ')} — the signature is one of these verbs made mechanical; an idea that abandons them for something the concept never said (a teleport, a mist, a generic burst) is the wrong idea however clever. ` : ''}${seats ? `BUILD THIS: the action idea builds "${seats.action}"${wantTrait && !seats.packaged ? `; the trait idea makes "${seats.trait}" true on the sheet` : ''}. ` : ''}${engines.length ? `THE SHEET'S ENGINE IS ALREADY BUILT: ${engines.join(', ')} — the concept's holding, swallowing, or caging is DONE by those rows; do not describe it again in any wording. Build the concept's OTHER face. ` : ''}The rows above already OWN their fiction — never describe another version of one; the best ideas key off a condition a row applies, or set up a state the rows exploit.${energy ? ` This creature's energy is ${energy}.` : ''}
NOT A SIGNATURE (the wide run's biggest miss class, 12 of 48): a damage resistance or immunity, "blades only chip it", "can't be moved", "immune to its own fire", or a saving-throw bonus — those are the HEADER's to grant and the engine already derives them from type and energy. A trait idea must be a RULE that happens. In print a trait is most often one of these — choose the one THIS concept actually implies, not the first listed: how it MOVES (through walls or earth, over water, up sheer faces, without provoking, where others cannot); what its PRESENCE does to the space around it each turn (an emanation of cold, stench, dread, light, or broken ground); what it SPENDS or RECOVERS (regeneration with a catch, a reserve it draws on, a change when Bloodied or when an ally falls); what it SENSES or how it HIDES (what it can always find, what it can pass for); how it gets STRONGER mid-fight (a condition on the target it exploits, allies beside it). What happens to whoever touches or hits it is the RAREST trait in print — 3 of 324 — and belongs only to a body that is plainly corrosive, barbed, or adhesive; a bias toward it makes every monster the same monster. Tag each idea: "section" is action | bonus_action | reaction | rider (a clause on the creature's own attack: "when it hits, …")${wantTrait ? ' (the trait idea is always a trait)' : ''}; "trigger" is one of ${TRIGGERS.join(' | ')}; "effect" is one of ${EFFECTS.join(' | ')}.
${bodyRequirements.length ? `IS IT TRUE OF THIS BODY? ("body_verdicts") The engine has abilities it can only give this creature if certain things are TRUE OF ITS BODY. For each one below, say whether it is.
${bodyRequirements.map((r) => `- ${r.id}: ${r.needs}`).join('\n')}
Judge the BODY, not the creature's temperament, job, mood or gear: a man with a crab's temperament is not a crab, a fierce bear is not sticky, and a poisoner is not made of metal. A thing the creature merely CARRIES or USES is not its body.
But the concept does not have to use the requirement's words — judge what the body plainly IS. A pit of tar is sticky without the word "sticky". A thing bound to a shrine HAS a ward. A creature shaped like a chest can pass for one. Say true when the body is plainly that thing even if the concept never names it.
Both mistakes cost something. A wrong TRUE puts a rule on the page a GM can see is nonsense \u2014 a bear that glues people to itself. A wrong FALSE takes away an ability the creature obviously should have \u2014 a mimic that isn't sticky. Weigh them evenly and answer on the body. "because" quotes the concept's OWN WORDS, and only for a true answer.
` : ''}Return ONLY JSON: {"action": {"idea": "<2-3 plain sentences>", "section": "<action|bonus_action|reaction>", "trigger": "<...>", "effect": "<...>"}${wantTrait ? ', "trait": {"idea": "<1-2 plain sentences: a passive rule of its body or nature>", "trigger": "<...>", "effect": "<...>"}' : ''}${bodyRequirements.length ? ', "body_verdicts": [{"id": "<id copied exactly>", "means": <true|false>, "because": "<the concept\'s own words, or \\"\\">"}]' : ''}}`;
}

export function validateIdeaResponse(jsonString) {
  const p = tryParse(jsonString);
  // `body_verdicts` is deliberately NOT required here: a missing or malformed
  // answer falls back to the template's own `keys`, so a body question can never
  // fail a generation. Validate the SHAPE of what arrives, never the judgement.
  return p != null && typeof p.action?.idea === 'string' && p.action.idea.trim().length >= 20;
}

/**
 * The call's body verdicts as {id: boolean}. Anything malformed is simply absent,
 * and an absent id falls back to that template's `keys` in the menu filter.
 */
export function readBodyVerdicts(answer) {
  // Takes the RAW string callLLM returns, or an already-parsed object. The
  // expression judge never functioned for exactly this reason — callLLM returns a
  // string and the reader read `.element_claims` off it, so every claim was
  // revoked for "no verdict" (critic-response-2026-10-23.md). Parse here.
  const parsed = typeof answer === 'string' ? tryParse(answer) : answer;
  const rows = Array.isArray(parsed?.body_verdicts) ? parsed.body_verdicts : [];
  const out = {};
  for (const r of rows) {
    if (r && typeof r.id === 'string' && typeof r.means === 'boolean' && NEEDS_BODY[r.id]) out[r.id] = r.means;
  }
  return Object.keys(out).length ? out : null;
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

/** The catalog as the model reads it: one line per template, best match first.
 *  One owner for the format — the fit call and the re-roll call show the same shelf. */
export function templateMenuLines(menu, { cr, concept = '', idea = '' } = {}) {
  // TWO LABEL MODES, by what the caller actually knows.
  //
  // `idea` an OBJECT (the signature fit): it carries the AI's own `trigger` and
  // `effect` tags, so each line shows the template's declared cells and marks
  // the ones that agree. The keyword label this replaced was followed by the
  // call and fired wrong 55% of the time — see `orderByStamps`.
  //
  // `idea` a STRING (the re-roll path, format-2024/generate.mjs): there is no
  // invented idea and no tags, only the text of the row being replaced, so
  // there are no stamps to compare and the key-word label is the only signal
  // that path has. It keeps it, UNCHANGED and unmeasured — the 55% was measured
  // on the signature path and the fix belongs there. Flagged: these key words
  // read meaning out of the GM's text and the re-roll deserves its own pass.
  const ideaObj = idea && typeof idea === 'object' ? idea : null;
  const ranked = ideaObj ? null : rankByVerb(menu, concept, String(idea ?? ''));
  return (ranked ? ranked.map((r) => r.t) : menu).map((t, i) => {
    const cv = ranked ? ranked[i].concept : [];
    const iv = ranked ? ranked[i].idea : [];
    const matched = [...cv.map((k) => `${k} (concept)`), ...iv.map((k) => `${k} (idea)`)];
    const flav = t.flavor.length ? ` — you fill: ${t.flavor.map((f) => (PREDICATE_SLOTS.has(f) ? `{${f}} (a PREDICATE, no subject and no full stop — the frame already says "Each creature in the area": answer like "has Disadvantage on attack rolls")` : SLOT_CONTRACTS[f] ? `{${f}} (${SLOT_CONTRACTS[f]})` : `{${f}}`)).join(', ')}` : '';
    const vocab = slotsOf(frameOf(t, cr)).filter((s) => VOCAB[s]).map((s) => `{${s}} ∈ ${VOCAB[s].join('/')}${VOCAB_GUIDANCE[s] ? ` — ${VOCAB_GUIDANCE[s]}` : ''}`);
    // A TEMPLATE WITH A VARIABLE AREA SHAPE HAS TO SAY SO. The frame carries
    // `{target}` (an engine-filled clause, sized by band) while the choice the
    // model makes is `area_shape` — two names on purpose, so the model never sets
    // a distance. Without this line the menu advertised neither and the choice was
    // unreachable (2026-10-22).
    if ((t.targets ?? []).length > 1) vocab.push(`"area_shape" ∈ ${t.targets.join('/')} — the engine sizes it`);
    // same two-name split as area_shape: the frame carries {duration}, the choice
    // the model makes is "duration", so the menu has to name it or it is unreachable
    if (/\{duration\}/.test(frameOf(t, cr) ?? '') && t.effect === 'condition') vocab.push(`"duration" ∈ ${DURATIONS.join('/')} — how long the condition lasts`);
    return `- ${t.id} [${SECTION_OF[t.section]}${t.gate ? `, ${t.gate}` : ''}]${ideaObj ? ` (fires: ${t.trigger}, does: ${t.effect}${stampAgrees(t, ideaObj) ? ' — matches the idea' : ''})` : (matched.length ? ` VERB MATCH: ${matched.join(', ')}` : '')}: ${frameOf(t, cr).replace(/\*/g, '')}${flav}${vocab.length ? ` — choose: ${vocab.join('; ')}` : ''}`;
  }).join('\n');
}

export function buildFitPrompt({ name, idea, menu, cr, concept = '', sheet = null, clause = null, elements = [], asked = null }) {
  const lines = templateMenuLines(menu, { cr, concept, idea }); // the OBJECT: its `trigger`/`effect` tags are what mark and order the menu now
  // WHAT THE ENGINE ALREADY KNOWS, handed over instead of re-inferred (owner's
  // architecture, 2026-10-23: "the final prompt is just taking instruction after
  // we have properly sorted things out"). The identity, resolve and clause calls
  // already classified this sheet — archetype, creature type, the mechanic the GM
  // asked for, and per clause its SHAPE, its trigger and its limit — each with a
  // quote from the GM's own words. None of it reached this prompt, so the model
  // was re-reading raw text the engine had already judged.
  const askedLines = [
    asked?.mechanic ? `- the mechanic the GM asked for: ${asked.mechanic}` : null,
    asked?.shape ? `- the SHAPE that clause asks for: ${asked.shape}` : null,
    asked?.when ? `- when it fires: ${asked.when}` : null,
    asked?.often ? `- how often: ${asked.often}` : null,
  ].filter(Boolean);
  return `A monster's signature ability has been described in plain words. Pour it into ONE of the printed rules templates below, or say none fits. The template's rules are FIXED; the engine fills every {slot} shown in braces except the ones marked "you fill". Do not rewrite the template.
MONSTER: ${name} (CR ${cr})${sheet ? `\nTHE SHEET SO FAR — read it before you pick; a save stat, a damage type, a reach all come from here:\n${sheet}` : ''}
THE IDEA (${idea.section} / ${idea.trigger} / ${idea.effect}): ${idea.idea}${clause ? `
THE CLAUSE THIS ROW IS FOR — the GM wrote it and nothing on the sheet answers it yet; pick the template that answers THIS, and answer "asked" with it: "${String(clause).replace(/"/g, "'")}"` : ''}
THE USER TYPED — the GM's own words, and the ONLY text "asked" may quote: ${concept ? `"${String(concept).replace(/"/g, "'")}"` : '(the user typed nothing — answer "asked" with "")'}
${askedLines.length ? `WHAT THE ENGINE HAS ALREADY CLASSIFIED — these came from earlier calls on the GM's own words, so do not re-derive them. Pick the template that matches THIS classification; if none does, say none.
${askedLines.join('\n')}
` : ''}TEMPLATES:
${lines}
THE CLASSIFICATION DECIDES, AND THE IDEA'S OWN TAGS ORDER THE LIST. Each template shows (fires: <when>, does: <what>) — its own declared cells — and the list is sorted by how well those agree with the tags THIS idea already carries (fires: ${idea.trigger ?? '—'}, does: ${idea.effect ?? '—'}). A template marked "matches the idea" agrees on both. That ordering is a HINT, not a verdict: it is a comparison of two labels, not a reading of your idea. Judge each template's printed rules against the classification above, the clause, and what the idea actually describes — and answer none when nothing carries it.
WHAT THE ORDER IS NOT. It is not a ranking of fit, and nothing in the GM's wording nominates a template any more. Earlier the engine searched the GM's words for each template's key words and labelled the hits, and that label was followed: a bell-ghost whose idea was "every blow it LANDS leaves a ring" was given a template that damages whoever hits IT, three runs in four, because "bell" was one of its words. Read the rules; the GM's phrasing is context, not a vote. A template low on the list can be the right one, and the first one can be wrong.
EVEN IF YOU ANSWER none, fill its "you fill" slots in "fills" — the engine may still use a template you declined, and your fills travel with it. Quote the user's own words (a phobia of chickens fills {phobia} with "chickens"; a warden of the reef fills {place} with "the reef").
WHY NONE FITS. When you answer "none", answer "declined_because" with exactly one of: collision (the creature's words or kind suggest this template but it does not mean that mechanic here), already_answered (the sheet or the creature's own kind already does this), no_fit (nothing offered carries the idea). Answer "" when you did pick a template.
A RIDER THAT MOVES THE TARGET OUT OF REACH does not belong on a row the Multiattack repeats: push the target 10 feet on the first hit and the second and third cannot land, so the creature defeats its own Multiattack. Read the sheet's Multiattack and reach before offering a push or pull rider; refuse it there (the Horseman's Saber, 2026-10-25). A REFUSAL NAMES ITS GAP. "no_fit" is not an answer on its own — say which of the offered templates comes CLOSEST ("closest"), what the rules would have to do that none of them does ("missing"), and WHICH KIND OF EFFECT that missing thing is ("missing_effect"), exactly one of: damage | condition | movement | resource | defense. Judge the effect by what the row DOES to its target, not by words that appear in passing: a row that only applies against an already-prone target is not a condition row, and a row that resists being pushed is defense, not movement. In a few plain words naming the MECHANIC, not the fiction: "pulls the creature back to where it started", "picks one target and holds the aim", "costs the creature something when it fails". Never "nothing fits" and never a restatement of the idea. These accumulate into a list of templates worth building, so a vague answer is a wasted one.
DID THE USER ASK FOR IT? Answer "asked" with the user's OWN WORDS that ask for this template's mechanic, quoted verbatim from THE USER TYPED line above — never from THE IDEA, which is the engine's own prose and is not the user
${elements.length ? `WHICH OF THIS CREATURE'S OWN ELEMENTS DOES THE ROW EXPRESS? Answer "expresses" with ONE of these, copied exactly, or "" if the row expresses none of them. These were drawn from the GM's description, so naming one is a receipt even when you cannot quote the GM directly — a trait seat usually cannot. Answer "" honestly: a row that does not express any of them is decoration, and saying so is the right answer.\n${elements.map((e) => `  - ${String(e).replace(/"/g, "'")}`).join('\n')}` : ''}'s words. The few words, not a sentence. Leave it "" when the user's words never ask for it and your pick rests on the idea you were given or on the template's shape. Answering "" is not a failure and does not withdraw your pick; it tells the engine the pick is yours, not the GM's, and some seats take only what the GM asked for.
Return ONLY JSON: {"template": "<id from the list, or none>", "because": "<the words of the idea the template carries>", "asked": "<the user's own words asking for this, or \"\">", "expresses": "<one of the creature's own elements listed above, copied exactly, or \"\">", "declined_because": "<collision | already_answered | no_fit, or \"\" when you picked one>", "closest": "<on a refusal: the offered id that comes nearest, else \"\">", "missing": "<on a refusal: the mechanic none of them does, else \"\">", "missing_effect": "<on a refusal: damage | condition | movement | resource | defense, else \"\">", "name": "<2-3 words, Title Case the way print writes a row name: Dreadful Glare, Wing Attack, Cloud of Insects — every word capitalised except of/the/and/to/with>", "fills": {"<slot>": "<value>"}, "wrong": ["<ids whose word match does not mean its mechanic here>"]}`;
}

export function validateFitResponse(jsonString) {
  const p = tryParse(jsonString);
  return p != null && typeof p.template === 'string';
}

export function parseFit(raw, menu, creatureName = '', elements = []) {
  const p = tryParse(raw) ?? {};
  const id = String(p.template ?? '').trim().toLowerCase();
  const t = id && id !== 'none' ? (menu.find((m) => m.id === id) ?? menu.find((m) => id.includes(m.id)) ?? null) : null;
  const nm = String(p.name ?? '').trim();
  return {
    template: t,
    because: String(p.because ?? '').trim().slice(0, 80),
    name: nm && !/^(?:none|n\/a|null|no fit|nothing)$/i.test(nm) && nm.split(/\s+/).length <= 3 && noDigits(nm) && !(creatureName && nm.toLowerCase().includes(creatureName.toLowerCase().split(/\s+/).pop())) ? nm : null, // "none" is the model saying no fit, never a row name (a row named "none" shipped on Meshrin — the critic's third species read, rerun)
    fills: p.fills && typeof p.fills === 'object' ? p.fills : {},
    // DID THE USER ASK FOR IT — the call's answer, not the engine's keyword
    // table (critic's hold 1 door 5, 2026-10-16). Three seats refuse a
    // template the GM never asked for; they used to decide that by running
    // rankByVerb over the pick and reading its own [verb:] tally back out of a
    // trace string. rankByVerb still RANKS the menu — ranking is cheap and
    // judges nothing — but whether the GM asked is a question about meaning,
    // so the call answers it with a receipt and generate.mjs checks the quote
    // against the words the GM actually typed.
    asked: String(p.asked ?? '').trim().slice(0, 80),
    // THE RECEIPT A TRAIT SEAT CAN ACTUALLY PRODUCE (owner's ruling, 2026-10-21).
    // `asked` requires quoting the GM, and the trait seat is not shown text it can
    // quote — which is why 1d killed six twists in one forty, each "quoting none of
    // the GM's words" while being exactly what the GM asked for. The signature
    // elements were themselves drawn from the GM's description by the concept call,
    // so naming one is a receipt of the same kind. Validated by MEMBERSHIP of that
    // closed list: the call may pick one or answer none, and cannot invent a third.
    expresses: (() => { const v = String(p.expresses ?? '').trim(); return v && elements.some((e) => String(e).trim() === v) ? v : null; })(),
    // STAGE 2 ITEM 1 (owner's fix order, 2026-10-16): on 31% of blocks the GM's
    // words key a template, the call is shown it, and the call says no fit —
    // then 71% fall to a generic seed and 22% ship nothing. Which fix that needs
    // depends on WHY: a collision means the call is working, already_answered
    // means the held-rate metric is wrong rather than the engine, and no_fit is
    // the only one that calls for a successor. The first collection run came back
    // 27 of 27 unanswered, which an exact-token whitelist could not distinguish
    // from a differently-phrased answer — so normalise, and keep the raw value
    // so the trace says which it was.
    declined_because: (() => {
      const k = String(p.declined_because ?? '').trim().toLowerCase().replace(/[^a-z]+/g, '_').replace(/^_|_$/g, '');
      if (/^collision/.test(k)) return 'collision';
      if (/already|answered|on_the_sheet/.test(k)) return 'already_answered';
      if (/no_?fit|none|nothing/.test(k)) return 'no_fit';
      return null;
    })(),
    declined_raw: String(p.declined_because ?? '').trim().slice(0, 40),
    // 1c (critic, 2026-10-20): a decline that names no missing mechanic is a
    // schema failure, not an answer. The engine keeps both fields so the gap
    // list can be read across runs; the caller decides what a bare refusal costs.
    closest: String(p.closest ?? '').trim().slice(0, 40) || null,
    missing: String(p.missing ?? '').trim().slice(0, 120) || null,
    // the EFFECT AXIS is the call's answer too, validated against the catalog's
    // own closed list. My own classification of these from the gap text measured
    // 40% accurate on a 30-item hand check: a condition word anywhere in the
    // sentence captured it, whether the row imposed that condition, required it,
    // or named it only to say what it was not. The model is answering about its
    // own refusal; it does not have to infer it from prose.
    missing_effect: EFFECTS.includes(String(p.missing_effect ?? '').trim().toLowerCase()) ? String(p.missing_effect).trim().toLowerCase() : null,
    // THE WORD MATCH IS THE ENGINE'S, THE MEANING IS THE CALL'S (owner, 2026-10-13:
    // "engineer less deterministic gating when the llm can make these judgements"):
    // a key word in the modifier slot of a compound, or one the sheet already
    // answers, is a collision — the call names it and the engine drops its own
    // force-bind. Only ids actually offered count (a model may invent one).
    wrong: Array.isArray(p.wrong) ? [...new Set(p.wrong.map((w) => String(w ?? '').trim().toLowerCase()).filter((w) => menu.some((m) => m.id === w)))] : [],
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
// ONE DEFINITION OF A ROW'S GATE (2026-10-22). Five sites used to recover a gate
// by re-reading the row's NAME — novasOf in the checker, hasChassisNova, the late
// nova damage cap, settleSheetBudgets, and valueCheck's own `gated` read, which
// llm-metadata-over-regex already called "the third copy of the same name-only
// blind spot". The field is now authoritative: a gate declared in donor data, one
// written inside a donor's name, and one chosen by pricing all land on `e.gate`
// (equivalence verified on gatefield4-2026-10-22T02-10-51 — 4 engine rows, 0
// unstamped, 0 disagreeing).
//
// The NAME stays as a FALLBACK rather than being deleted, deliberately:
//   * for a PRINT row it is canonical — print's own furniture carries the rate in
//     its name and the engine never stamps it;
//   * for anything else it is a SIGNAL. An engine row reaching here with a gate in
//     its name and no field means a stamping site was missed, and the fallback
//     keeps that a cosmetic miss rather than a dropped nova.
// `gateFromName` is exported so a checker can report that case instead of
// silently benefiting from it.
export const gateFromName = (e) => (/\((Recharge [\d–-]+|\d+\/Day)\)\s*$/.exec(String(e?.name ?? '')) ?? [])[1] ?? null;
export const gateOf = (e) => e?.gate ?? gateFromName(e);

export function valueCheck(row, { scaled, sections, section, cr = null, noGate = false, template = null, forceUngated = false }) {
  const perHit = Math.max(3, Math.round(scaled.per_hit ?? 6));
  const attackEV = P_HIT * perHit;
  const gated = !!gateOf(row); // one definition; the field first, the name as fallback
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
  // A PAYOFF PAYS FOR ITS PREREQUISITE (owner's spot check, 2026-10-19: Ripened Reaping dealt 27 for a
  // Slam's 24 and only on a target already Poisoned — "not worth the trade"). Print's payoffs double
  // (Assassinate); a row that needs a condition the sheet must first impose prices at 2× the attack
  // it replaces, ceiling 3×, and the ladder below carries it there.
  const payoff = !!template && REQUIRES_IMPOSED.has(String(template));
  const floor = bonus ? 0.25 * attackEV : gated ? 1.3 * maEV : (payoff ? 2.0 : 0.8) * replaced; // a free row still has to DO something; a payoff doubles (Assassinate)
  const ceiling = bonus ? 1.5 * attackEV : gated ? 2.5 * maEV : (payoff ? 3.0 : 1.5) * (replaced || attackEV);
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
  // THE GATE IS A DECISION, SO IT IS RETURNED — not left for a consumer to read
  // back off the name it just built (owner, 2026-10-22: send the metadata back
  // rather than inferring it with a pattern). Donor rows carry no gate: a chassis
  // nova gets its `(Recharge 5-6)` HERE, from pricing, which is why 0 of 18 gated
  // rows in sweep-2026-10-21T22-17-49 carried a declared gate.
  let gateChosen = null;
  // THE ACTION ECONOMY IS THE LIMIT (owner's ruling, 2026-10-22). When a sheet
  // carries two Recharge novas, the extra one loses its gate — and the gate
  // cannot be refused, because leaving it ships a defect print never has (1 of
  // 329 blocks carries a pair, and only the Vrock's are both print's). The
  // voluntary branch below needs `hasDamage && !kill && !recurring`, so a
  // kill-shaped template like `wail` fell through it and was re-gated on the
  // spot — the Air Elemental's Stolen Chorus beside print's Whirlwind.
  //
  // Forced, the row keeps its MECHANICS — the save, the condition, the area —
  // and only its damage moves: down to the MULTIATTACK SUM (`maEV`), the
  // owner's ceiling. Using it costs the whole action, so at or below the sum of
  // what attacking would have dealt it is never the strictly better play. That
  // is what makes it safe without the gate, and why the kill guard does not
  // need to hold here: the economy limits the use, not the recharge.
  const ceilNow = forceUngated ? Math.max(perHit, maEV) : ceiling;
  if (forceUngated && v.ev > ceilNow && v.hasDamage) {
    let cur = v.avg;
    for (let i = 0; i < 12 && v.ev > ceilNow && cur > perHit; i += 1) {
      const d = saveDamageDiceFor(Math.max(perHit, Math.floor(cur * ceilNow / v.ev)));
      if (d.avg >= cur) break;
      text = text.replace(DMG, `${d.avg} (${d.dice})`); v = value(text); cur = v.avg;
    }
    steps.push(`un-gated by the one-nova rule — dice to ${v.avg}, at or under the Multiattack sum (${Math.round(maEV)}); the action economy is the limit`);
  } else if (v.ev > ceiling && !gated && section !== 'Traits' && !controlOnly && noGate && v.hasDamage && !kill && !recurring) { // a nova already stands on the sheet: this row stays ungated and scales to the ceiling instead (the wyrm's Frozen Maw beside Freezing Breath, step 7 twelve)
    let cur = v.avg; for (let i = 0; i < 8 && v.ev > ceiling && cur > perHit; i += 1) { const d = saveDamageDiceFor(Math.max(perHit, Math.floor(cur * ceiling / v.ev))); if (d.avg >= cur) break; text = text.replace(DMG, `${d.avg} (${d.dice})`); v = value(text); cur = v.avg; }
    steps.push(`a nova already stands — kept ungated, dice to ${v.avg} at the ceiling`);
  } else if (!forceUngated && v.ev > ceiling && !gated && section !== 'Traits' && !controlOnly) { name = `${name} (Recharge 5-6)`; gateChosen = 'Recharge 5-6'; steps.push('over the ceiling — gated Recharge 5-6'); }
  else if (v.ev > ceiling && !gated && section !== 'Traits' && controlOnly) steps.push('over the ceiling but a control row (no damage, no KO) — print leaves these ungated');
  return { text, name, ev: Math.round(v.ev * 10) / 10, floor: Math.round(floor * 10) / 10, replaced: label, steps, gate: gateChosen };
}
