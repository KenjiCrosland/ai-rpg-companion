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
export { bandFor }; // the CR band is a shared closed fact; generate.mjs reads a template's per-band declarations with it
import { LIBRARY_SEEDS, drawLibraryRow } from './library.mjs';
import { attackDamageDiceFor, saveDamageDiceFor } from '../format-2024/dice.mjs';
import { readPhrases } from './lexicon.mjs';
import { weaponProp } from './weapons.mjs';
import { AREA_TARGETS, ESCALATION_SHAPES, SEVERE_CONDITIONS, capSingleTargetSave, escalateFrom, escalationClause, escalationShapesFor } from './card-budgets.mjs';
import { imposedConditions } from './author.mjs'; // ONE reader for the condition a row imposes: the declared record first, print's grammar second

export const SECTION_OF = { trait: 'Traits', action: 'Actions', bonus_action: 'Bonus Actions', reaction: 'Reactions', rider: 'Rider' }; // Rider = a clause appended to the melee attack row
export const TRIGGERS = ['on_hit', 'save', 'on_being_hit', 'start_of_turn', 'once_per_fight', 'always'];
export const EFFECTS = ['damage', 'condition', 'movement', 'resource', 'defense'];
const SAVE_STATS = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
const CONDITIONS = ['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned'];
const MINOR = ['Prone', 'Poisoned', 'Deafened', 'Frightened', 'Blinded']; // Blinded joined for obscuring breaths (2026-09-28); the aura save map covers it
// WHICH DAMAGE EARNS FEAR. Counted over the 682 rows in srd52-monsters.json
// that deal a damage type (2026-10-27, owner's question: "things that cause
// physical damage don't cause frightened often yes?"). Print imposes Frightened
// on 11 rows: SEVEN deal no damage at all, three deal Psychic, one Thunder.
// Physical damage: 0 of 11 — while physical damage dominates every bodily
// condition (Prone 55 rows, Grappled 38, Restrained 29, Poisoned 24). Fire,
// Cold, Necrotic, Radiant, Lightning, Acid, Poison and Force: 0 each.
//
// This is a CLOSED FACT about the corpus, in the same class as the weapon table
// and the CR math — it records what print writes, and infers nothing about what
// the GM meant. The call still chooses the condition; this only refuses a
// pairing print never writes. The owner's instinct also named Necrotic and
// Radiant, which print does not support (Radiant pairs with Blinded and Prone).
// NECROTIC JOINS BY THE OWNER'S RULING (2026-10-27: "necrotic in fear from is
// fine"). Print does not attest it — 0 of its 11 Frightened rows deal Necrotic —
// but print's whole evidence base for damaging fear is FOUR rows (Psychic 3,
// Thunder 1), which is too thin to rule a type out, and our own fiction carries
// it well (Toll of Dread, Knell of Dread, Harvested Trophy — 9 rows measured).
// This is the owner's taste where print is silent, which is exactly the split
// recorded in [[print-is-a-resource-not-a-veto]]: print rules CALIBRATION, not
// whether a mechanic may exist. The strong half of the rule is untouched —
// physical damage never frightens, and that rests on 11 rows against a
// well-attested opposite pattern (Prone 55, Grappled 38, Restrained 29).
const FEAR_FROM = ['Psychic', 'Thunder', 'Necrotic'];

/**
 * May a row that DEALS `damageType` impose `condition`? Today this rules on
 * Frightened only, which is where the corpus is emphatic (0 of 11 print rows
 * pair it with physical damage, 0 with Fire, Cold, Necrotic, Radiant,
 * Lightning, Acid, Poison or Force). Every other condition passes.
 *
 * ONE OWNER ON PURPOSE. Two places fill a condition beside damage — the
 * template validator in `renderTemplate` and the donor chassis fill site in
 * generate.mjs — and the donor site is the bigger of the two by far (26 of the
 * 33 off-print rows measured were donor "Area Nova" breaths, against 1 template
 * in the validator's whole domain). A rule with a copy in each would drift, and
 * the first version of this fix lived only in the validator and reached almost
 * nothing (plans/, "a private copy hides the fix").
 *
 * Pass a falsy `damageType` for a row that deals none: print's modal fear row
 * deals no damage at all (7 of 11), so those are always allowed.
 */
export const conditionEarnedByDamage = (condition, damageType) => condition !== 'Frightened' || !damageType || FEAR_FROM.includes(damageType);
// RESTRAINTS (['Grappled','Restrained']) retired 2026-10-27: its only consumer was
// the `restraint` VOCAB entry, which was asking for a condition where the frame
// renders a destructible object. See the note on VOCAB below.

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
  // NO STRENGTH ON A DAMAGE-DOMINANT ROW (owner's GM read, 2026-10-27). Strength
  // was in this list until a 67-damage poison fly-by and an 84-damage cold payoff
  // both shipped on it: the Prone rider named the stat and the damage was
  // ignored. print's one Strength save on an area-damage-plus-Prone row is the
  // Centaur Trooper's Trampling Charge, which MOVES its target — and that case
  // is the `movement` arm above, which returns Strength first. So a row that
  // shoves or hauls keeps Strength; a row whose point is damage does not.
  if (want === 'Strength') return damageDominant ? ['Dexterity', 'Constitution'] : ['Strength', 'Dexterity'];
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

/**
 * THE GEOMETRY A FRAME ALREADY STATES, read ONCE from our own catalog.
 *
 * Roadmap item 1b wanted `area` declared so the checker and `areaDamage` stop
 * reading `each creature|Cone|Sphere` and `(\d+)-foot (Cone|…)` off the rendered
 * sentence. The render only resolved a shape for templates carrying `targets` —
 * TWO of them — while THIRTEEN state their geometry inside the frame text itself
 * (`energy-aura` "5-foot Emanation", `wail` "30-foot Emanation", `thrown-burst`
 * "10-foot-radius Sphere", …). So the field could never have covered more than 2
 * of the 11 area rows on a forty.
 *
 * The frames are OUR OWN catalog: finite, static, and authored here. Reading them
 * once at module load and declaring the result is the same boundary move that
 * `gateFromName` makes on a donor's own name and `PRINT_ROW_NAMES` makes on the
 * corpus — a fact we already hold, converted into the field consumers read. It is
 * not inference over prose, and nothing re-derives it per generation.
 */
const FRAME_AREA = /(\d+)-foot(?:-long)?(?:-radius)? (Cone|Line|Emanation|Cube|Sphere)\b/i;
export const areaOfFrame = (frameText) => {
  const m = FRAME_AREA.exec(String(frameText ?? ''));
  return m ? { shape: m[2].replace(/^./, (c) => c.toUpperCase()), size: Number(m[1]) } : null;
};
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
export const areaSizeFor = (shape, band, sizes = null) => sizes?.[shape]?.[band] ?? AREA_LADDER[shape]?.[band] ?? null;
export const areaClause = (shape, band, sizes = null) => {
  const n = areaSizeFor(shape, band, sizes);
  const form = AREA_FORM[shape];
  if (!n || !form) return null;
  return form(n);
};

// `restraint` IS AN OBJECT, NOT A CONDITION (owner's spot check, 2026-10-27:
// the Pumpkin King's Root Snare read "the target has the Restrained condition
// until the Restrained is destroyed (AC 15; HP 20)").
//
// The slot renders as the destructible THING a Restrained creature breaks out
// of — print writes "until the rope is destroyed" (Erinyes) and "until the web
// is destroyed" (Ettercap, Giant Spider). It was listed here against
// RESTRAINTS = ['Grappled', 'Restrained'], so the prompt asked the model for a
// condition name for an object slot and the ladder below replaced any real
// answer ("a tangle of roots") with the literal string 'Restrained'. It is
// already in FLAVOR_SLOTS, where a short bounded phrase is validated and
// BLIND_FILLS supplies "the binding" when the call offers nothing.
const VOCAB = { shutoff_damage: DAMAGE, area_shape: AREA_SHAPES, duration: DURATIONS, save_stat: SAVE_STATS, consumed_condition: CONDITIONS, condition_minor: MINOR, r_vuln: DAMAGE, escalation: ESCALATION_SHAPES };
// WHAT A SLOT OWES ITS OWN FRAME. Print parameterises the QUALIFIER and keeps the
// noun — "an infernal wound" (Bearded Devil) — which is why its frame can go on to
// say "While wounded… The wound closes… stanch the wound". Our slot took the whole
// noun phrase instead, so a fill of "tar-snared footing" rendered "The target
// receives a tar-snared footing. While wounded… stanch the wound (DC 15 Medicine)"
// — a tar-fouled foot you bandage (focused ten, 2026-10-23). The frame cannot drop
// those three references without losing print's shape, so the FILL carries the noun
// and its own article, and the contract says so where the model can read it.
/**
 * AUGMENTATIONS: A CLOSED SET OF CLAUSES AN EXISTING TRAIT CAN TAKE (2026-10-29).
 *
 * The owner's design. Measured on the 2026-10-29 forty: 53 templated rows across
 * 39 sheets drew 40 DISTINCT templates, so the catalog's breadth is not the
 * problem — but ten templates repeated, and only one of the ten had a slot. The
 * difference shows: `terrain-walk` landed three times and reads as three
 * different rows ("mud", "rubble, broken stone, and collapsed timber", "swamp
 * muck, reed beds, and standing water") because `{terrain}` varies, while
 * `push-prone` landed four times and reads as four copies.
 *
 * So the lever is a PARAMETER on an existing trait, not another trait. An
 * augmented row is also genuinely different in play, which makes a distinct name
 * honest rather than paint — the tension the one-mechanic-one-name ruling left.
 *
 * A CLOSED SET, not free text. Five rounds of probing established that free-text
 * rewriting finds a new way to break every time it is constrained: it bolted on
 * preconditions, moved an attack's damage to a MISS, wrote a trigger true of every
 * living target. The call picks a KIND by id and fills one bounded slot; the
 * engine writes the clause.
 *
 * BOTH OF THESE ARE FREE. Neither adds damage, a save or a condition, so the CR
 * budget cannot drift — which is the same reason `death-restoration` is safe.
 * Print's priced augmentations exist (Fire Form's "that creature takes 5 (1d10)
 * Fire damage") and are deliberately NOT here: they need the damage ladder, and a
 * little drift on every augmented row would not show until a forty read hot.
 */
const AUGMENTATIONS = {
  // STRENGTHS FIRST (owner, 2026-10-29: "traits are strengths too... GMs actually
  // want strong monsters"). The first cut of this set was two weaknesses, because
  // I reasoned free == CR-negative == weakness and pointed the whole design at
  // making creatures WORSE. Print's free augmentations are mostly BOONS: it squeezes
  // through a 1-inch gap (8 rows), it ignores its own terrain (4), it sees in its
  // own medium (4), it stands in a creature's space (2). None of them costs a die.
  squeeze: {
    cite: "Air Elemental/Air Form (CR 5); 8 print rows: \"It can move through a space as narrow as 1 inch without expending extra movement to do so.\"",
    slot: null, priced: false,
    writes: () => 'It can move through a space as narrow as 1 inch without expending extra movement to do so.',
  },
  space_hold: {
    cite: "Air Elemental/Fire Elemental — Air Form, Fire Form (CR 5): \"It can enter a creature's space and stop there.\"",
    slot: null, priced: false,
    writes: () => "It can enter a creature's space and stop there.",
  },
  own_medium_sight: {
    cite: 'Ghost/Ethereal Sight (CR 4); Xorn, Chuul, Rust Monster — 4 print rows: the creature sees what its own element hides',
    slot: 'sense_target', priced: false,
    writes: (v) => `The creature can pinpoint the location of ${v} within 60 feet of itself.`,
  },
  terrain_boon: {
    // print: Adult/Ancient/Young White Dragon — Ice Walk's own second sentence
    cite: 'White Dragon/Ice Walk (CR 6, 13, 20): "Additionally, Difficult Terrain composed of ice or snow doesn\'t cost it extra movement."',
    slot: 'terrain', priced: false,
    writes: (v) => `Additionally, Difficult Terrain composed of ${v} doesn't cost the creature extra movement.`,
  },
};
export const AUGMENTATION_KINDS = Object.keys(AUGMENTATIONS);

const SLOT_CONTRACTS = {
  restraint: 'a BARE NOUN, no article, naming the physical thing that holds the target and that a party could attack or cut — print writes "until the rope is destroyed" (Erinyes) and "until the web is destroyed" (Ettercap, Giant Spider): "web", "roots", "brambles", "tar", "needles", "chain". Never a condition name: the frame already supplies "the" and the word "Restrained"',
  relic: 'a noun phrase WITH its article naming a THING the creature keeps, carries or wears and that a party could attack: "its severed head", "the soul bag", "a daughter\'s carapace". 2-4 words. It must be an OBJECT — not an effect, not a place, not a creature, because the frame gives it AC and Hit Points',
  finisher: 'a PREDICATE naming HOW the creature falls on a target that is already caught or down — no subject, no full stop, 3-6 words, lowercase: "brings the hammer down two-handed", "drives a knee into the ribs", "tightens the coils", "sets a hoof on the chest". This is the ONLY part of this row the call writes, and it is what makes one payoff read unlike another: 169 of these shipped under 147 different names and FOUR different sentences. Never name a condition, a save or a number — the frame supplies those',
  kill_consequence: 'a PREDICATE naming what becomes of the BODY — no subject, no full stop, 2-5 words, lowercase: "crumbles to dust", "loses its head", "is absorbed into the swarm". It is what the killing leaves behind, never damage and never a condition',
  // MEASURED, NOT GUESSED (2026-10-29). Across today's runs `{terrain}` took the
  // concept's own words on 99 of 106 rows while `{sense_target}` managed 1 of 8 —
  // and the difference is that "terrain" says what it wants and "sense_target"
  // does not. These two say it.
  mimicked: 'a BARE NOUN PHRASE naming the SOUNDS this creature copies, no article — print writes "animal sounds and humanoid voices" (Green Hag) and "simple sounds it has heard, such as a whisper or chitter" (Raven): "a child crying", "the voices of the drowned", "tolling bells"',
  sense_target: 'a BARE NOUN PHRASE naming WHAT this creature can always find, no article — print senses a KIND of thing, not a creature: "iron and rust" (Rust Monster), "precious metals and gems" (Xorn), "magic" (Chuul). Never "creatures" and never its own name',
  counter: 'a CLAUSE naming what someone must DO to the remains to stop it coming back — a verb and an object, 4-8 words, lowercase: "the severed head is laid to rest", "its ashes are scattered at sea", "a silvered blade is left in the grave"',
  wound_phrase: 'a whole noun phrase WITH its article and ending in the word "wound" — like print\'s "an infernal wound": "a tar-fouled wound", "a weeping wound". The frame later says "While wounded", "The wound closes" and "stanch the wound", so a fill that is not a wound makes nonsense of them',
};
// Does the fill keep the promise its frame already makes? The frame's own noun is a
// CLOSED FACT — print writes "wound" three more times after the slot and we cannot
// drop those lines without losing print's shape — so this VALIDATES the call's
// answer against it rather than inferring anything about meaning (CLAUDE.md allows
// exactly that, and the ladder below falls to the blind default, never to a miss).
// What a call would catch that this does not: a fill that says "wound" and still
// does not read as an injury ("a wound of silence"). This is the cheap half.
// A FILL IS NEVER THE CREATURE ITSELF (the forty of 2026-10-27, Trench Choir
// Leviathan). `phobia` names the thing the creature is AFRAID OF — its frame
// reads "While the creature can see {phobia} within 30 feet of itself … must
// move away from {phobia}" — and the call answered "the leviathan", so the sheet
// shipped a 542-HP monster afraid of itself and fleeing from its own position,
// next to a row that pulls creatures toward it. The critic read the pair as
// contradicting each other.
//
// Every flavor slot can take this: a `relic` the creature keeps, a `disguise` it
// passes for, a `sense_target` it tracks. None of them is the creature. Compared
// against the names the sheet already carries rather than a word list.
const fillIsSelf = (v, ctx) => {
  const val = String(v ?? '').toLowerCase().replace(/^(?:the|a|an) /, '').trim();
  if (val.length < 3) return false;
  // BOTH DIRECTIONS (2026-10-29). The test only caught a fill that ENDS WITH the
  // creature's name, so "Trench Sovereign Leviathan" with a `{phobia}` fill of
  // "the leviathan" sailed through and shipped "While the leviathan can see the
  // leviathan within 30 feet of itself" — the creature afraid of itself. The fill
  // was the TAIL of the name, not the other way round, so the name has to be
  // checked against the fill as well.
  return [ctx?.name, ctx?.inline].map((n) => String(n ?? '').toLowerCase().replace(/^(?:the|a|an) /, '').trim())
    .filter((n) => n.length >= 3).some((n) => n === val || val.endsWith(` ${n}`) || n.endsWith(` ${val}`));
};
const fillKeepsFrame = (k, v) => {
  const val = String(v ?? '').trim();
  // print writes "an infernal wound" three more times after the slot, so the
  // fill has to be a wound
  if (k === 'wound_phrase') return /\bwounds?\b/i.test(val);
  // AN OBJECT SLOT REFUSES A CONDITION NAME (owner's spot check, 2026-10-27).
  // `{restraint}` is the destructible thing a Restrained creature breaks out of
  // — print's "until the rope is destroyed", "until the web is destroyed" — and
  // the Pumpkin King shipped "until the Restrained is destroyed". Removing the
  // slot's bogus condition VOCABULARY stopped the engine SUBSTITUTING one, but
  // nothing stopped the call from answering one: "Grappled" still rendered
  // "until the Grappled is destroyed". Checked against the declared condition
  // list, not a word list of my own.
  if (k === 'restraint') return !CONDITIONS.some((c) => c.toLowerCase() === val.toLowerCase());
  // THE COUNTER IS SOMETHING DONE TO THE REMAINS, NOT A CONDITION. The frame reads
  // "...regains all its Hit Points unless {counter}", so a bare condition name
  // renders "unless Restrained." — the same nonsense `{restraint}` shipped before
  // the line above was written. Checked against the declared condition list, not a
  // word list of my own, and it must read as a CLAUSE: print's counters are
  // "*Dispel Evil and Good* is cast on its remains" and "its remains are sprinkled
  // with holy water", both of which have a verb.
  if (k === 'counter') return !CONDITIONS.some((c) => c.toLowerCase() === val.toLowerCase()) && val.includes(' ');
  return true;
};
// flavor slots: the model's words, bounded (no digits, no rules grammar, short)
export const FLAVOR_SLOTS = ['mimicked', 'counter', 'finisher', 'kill_consequence', 'relic', 'phobia', 'restraint', 'projectile', 'wound_phrase', 'zone_effect', 'zone_rule', 'disguise', 'shell', 'telegraph', 'lure_source', 'hook', 'douse', 'terrain', 'sense_target', 'anchor', 'ward'];
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
  'energy-aura': ['start_of_turn', 'damage'], 'noxious-aura': ['start_of_turn', 'condition'], 'bloodied-fury': ['always', 'defense'], 'blood-frenzy': ['always', 'damage'], 'death-restoration': ['always', 'defense'], 'pack-tactics': ['always', 'damage'] /* EFFECTS has no 'buff_self': an advantage aura is this catalog's 'defense'. `ally-aura` was authored here on 2026-10-27 and REVERTED the same day — it drew 0 of 10 because three `leader` donors already carry Aura of Authority as a `rules` row and the hobgoblin kit grants it too. An EIGHTH way to ship inert, not in the plan's list of seven: a donor already carries the row. */, 'uncanny-sense': ['always', 'defense'], 'earth-glide': ['always', 'movement'], tunneler: ['always', 'movement'], berserk: ['always', 'condition'], 'shielded-mind': ['always', 'defense'], evasion: ['always', 'defense'],
  'relentless-pursuit': ['always', 'movement'], bound: ['always', 'movement'], 'marking-light': ['always', 'condition'], 'sealed-body': ['always', 'defense'], 'warded-mending': ['start_of_turn', 'resource'], 'guarded-stance': ['always', 'defense'], 'undead-fortitude': ['always', 'defense'], mimicry: ['always', 'defense'], wail: ['once_per_fight', 'damage'], 'truth-aura': ['start_of_turn', 'condition'], 'gaze-aura': ['start_of_turn', 'condition'], 'fear-aura': ['start_of_turn', 'condition'], 'charge-push': ['on_hit', 'movement'],
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
/**
 * THE TEN FAMILIES A SIGNATURE IDEA CAN BELONG TO. The idea call answers one,
 * from this closed list, on the same call that already answers `section`,
 * `trigger` and `effect` — a judgement, so it is a call field and never a word
 * match. Only families with a GRAMMAR below change any behaviour; the rest are
 * tagged so a run can be counted and the next family chosen from the call's own
 * answers rather than by hand-clustering gap text.
 *
 * Derived from the 122 "what is missing" records across 100 sheets
 * (body-reaction 22, zone 20, payoff 12, mark 10, sentinel 8, drag 8, heal 5,
 * breach 4, kill-growth 3).
 */
export const IDEA_FAMILIES = ['body-reaction', 'zone', 'payoff', 'mark', 'sentinel', 'drag', 'heal', 'breach', 'kill-growth', 'nova'];

export const FAMILY_GLOSS = {
  'body-reaction': 'something happens to whoever hits, touches or grabs it',
  zone: 'ground or air around it, or trailing behind it, that harms or slows',
  payoff: 'it hits harder against a target that is already wounded or afflicted',
  mark: 'it marks one foe, and that mark has a consequence',
  sentinel: 'it answers a foe that moves past, away from, or into its reach',
  drag: 'it moves a creature it has hold of, or hauls several at once',
  heal: 'it mends or feeds on damage, death or suffering nearby',
  breach: 'it goes through walls, obstacles or difficult ground others cannot',
  'kill-growth': 'it grows stronger each time it fells a creature',
  nova: 'one big area effect on its own turn',
};

// print's own retaliation ladder, read off `heated-body`/`resonant-body`, which
// are calibrated against the corpus. A composed damage reaction is priced by
// being this ladder, not by a formula.
const RETAL_LADDER = { '0-2': '3 (1d6)', '3-5': '5 (1d10)', '6-9': '7 (2d6)', '10-12': '10 (3d6)', '13-20': '10 (3d6)', '21+': '14 (4d6)' };
// A LANE'S WIDTH IS THE BODY THAT CUT IT (critic, 2026-10-26: "space" is the
// wrong word for a big creature — a Huge body's space is 15x15, so a trail
// described by its spaces never says which squares). A Line with a stated width
// is print's own way of describing a lasting strip (the wall spells, Line
// breaths), and it needs two points, one of which is the mini.
export const LINE_MOVE = ['trample', 'rampage', 'charge', 'charge-push']; // the rows that already make a GM measure a straight line
const LANE_WIDTH = { Tiny: '5-foot', Small: '5-foot', Medium: '5-foot', Large: '10-foot', Huge: '15-foot', Gargantuan: '20-foot' };

/**
 * A FAMILY GRAMMAR: the same form a template is, with three blanks open.
 *
 * A template is a form with every blank pinned; this is the form with its
 * trigger, its consequence and (where the consequence needs one) its condition
 * left to the call, each a closed list. The call picks items — it never writes
 * rules prose — and the engine assembles the skeleton. So soundness still lives
 * in the skeleton, the lists, the engine's numbers and `bans`.
 *
 * `body-reaction`'s skeleton is the Black Pudding's Corrosive Form, the single
 * reactive trait in SRD 5.2 (the 2014 idiom is the Fire Elemental's Fire Form),
 * and the triggers are `heated-body`'s own wording.
 */
export const GRAMMARS = {
  // THE PAYOFF FAMILY, SECOND DESIGN — a RIDER on the creature's own attack.
  //
  // The first attempt was an ACTION grammar and served 2 of 176 payoff ideas,
  // offering nothing across its whole run. `normaliseTag` turns any action idea
  // whose trigger is `on_hit` into a rider ("when it hits" IS a rider), and that
  // is what "the hammer finds the terrified" is. Measured: rider/on_hit 39
  // (21 condition + 18 damage), trait/always 25, action 6.
  //
  // It also fixes the fiction the owner called out — "how do you tighten coils to
  // restrain if they aren't first tethered… a confusing ability all around". The
  // target here is the one the creature JUST HIT, so there is no tether to
  // explain and no area keyed on a condition a stranger might have.
  //
  // The idiom is our own `isolation`, which is already this shape ("If no
  // creature other than the creature is within 5 feet of the target, the target
  // takes an extra …"), and print's `charge-push` lance clause. Print has no
  // row that targets by an existing condition, and by the owner's ruling of the
  // same day that is not an argument: use print where it exists, invent what
  // fits where it does not.
  //
  // NO CONDITION STACKING. The owner: "do we really stack conditions like that?
  // pretty sure not restrained and prone". Print's 7 rows naming both are
  // Swallow SEQUENCES ("no longer Grappled"), never a rider piling a second
  // condition on. So the condition payload EXTENDS the one already there instead
  // of adding another — which is also the better fiction: the blow keeps them
  // terrified rather than knocking them over as well.
  payoff: {
    section: 'rider',
    trigger_tag: 'on_hit',
    slots: ['consequence'],
    skeleton: 'If the target already has the {consumed_condition} condition, {consequence}.',
    consequence: [
      // ONCE PER TURN IS LOAD-BEARING HERE, and it is written in rather than
      // left to the weld. A rider is appended to a Multiattack row and riders
      // skip the value check, so an unlimited conditional bonus multiplies by
      // the attack count: measured +42 at CR 11 (21 x 2 attacks) against a band
      // whose ceiling is 0.97x. The weld's own no-save-hold gate DID limit this,
      // but only by accident — its predicate reads a condition name out of the
      // text, and this row NAMES the condition it requires, so the limit landed
      // for Restrained and Grappled and missed Frightened, Poisoned and Prone,
      // which are the conditions a sheet most often imposes. Print's idiom for a
      // repeatable conditional bonus is exactly this limit (Sneak Attack).
      'the target takes an extra {avg_half} ({dice_half}) {damage_type} damage. This effect can be applied only once per turn',
      "the {consumed_condition} condition on the target lasts until the end of the creature's next turn",
      'the creature pulls the target up to 10 feet straight toward itself',
    ],
    effect: ['damage', 'condition', 'movement'],
  },
  'body-reaction': {
    section: 'trait',
    trigger_tag: 'on_being_hit',
    slots: ['trigger', 'consequence'],   // the blanks the call fills, in order
    condition_slot: 'consequence',       // which blank's choice may need a condition
    skeleton: 'A creature that {trigger} {consequence}.',
    trigger: [
      'hits the creature with a melee attack while within 5 feet of it',
      'touches the creature or hits it with a melee attack while within 5 feet of it',
      'grapples the creature or is grappled by it',
    ],
    consequence: [
      `takes ${'{retal}'} {damage_type} damage`,
      'has the {condition_minor} condition until the end of its next turn',
      'has its Speed halved until the end of its next turn',
      'is pushed up to 5 feet straight away from the creature',
    ],
    // the consequence's own effect cell, by index — the declared field the
    // stamp-ordered menu and the family cap both read
    effect: ['damage', 'condition', 'movement', 'movement'],
    // only this consequence takes a condition, and Prone is not among them
    // (owner, 2026-10-25: "not worth an attack... Prone has a rider on a damage
    // dealer even at low CR") — a reaction whose whole payload is Prone is a row
    // that does nothing worth the ink.
    condition_for: 1,
    // MEASURED AGAINST PRINT, after the first canary composed a no-save Blinded
    // on every melee hit at CR 8 (2026-10-26). The skeleton has no saving throw,
    // so only a condition print itself imposes WITHOUT one belongs here, and the
    // corpus is lopsided: Poisoned 14 rows with no save, Blinded 2 (both actions
    // that wrap a creature's head and give it a way out), Frightened 1,
    // Deafened 0 with no save but 3 with one and it is nearly harmless in a
    // fight. Blinded and Frightened are out: Blinded hands every attacker
    // Advantage and compounds with each striker, and Frightened on being hit
    // forbids melee outright, since a Frightened creature cannot willingly move
    // toward what it fears. Both are available WITH a save through the
    // save-bearing templates (noxious-aura, gaze-aura); a save-bearing variant of
    // this form is phase 2.
    conditions: ['Poisoned', 'Deafened'],
    // refused pairs, stated in the prompt AND enforced in parseFit
    bans: [
      { trigger: 2, consequence: 3, why: 'a creature grappling this one cannot be pushed away by it — the grapple holds them together' },
    ],
    ban_notes: [
      'No counter, no "each time", no stacking, and no reference to another row on the sheet: the GM must be able to run this from the one sentence (the `tally` shape was cut for exactly that).',
      'No Prone payload.',
      'One creature only — not everyone nearby.',
    ],
  },

  // THE ZONE FAMILY INVENTS NO TEXT. It is the family the idea call tags most
  // (6 of 18 ideas in each of three tens) and half of those are a PRESENCE
  // around the creature — furnace heat, a dread that unmans, a shroud of flies,
  // turbulent air. print writes that three ways and the catalog HOLDS all three;
  // they were refused on body questions written for one specific fiction each
  // (noxious-aura wants "a SMELL or a choking cloud, not merely cold or dark";
  // gaze-aura wants "a face or form that is horrifying to look at"), so a dread
  // presence had no template to go to and shipped as a nearest match. This form
  // offers those same frames, band for band, and lets the call say which payload.
  //
  // Two rules measured off the corpus:
  //  - an always-on aura is damage OR a condition, NEVER both. Every
  //    damage-plus-condition emanation in SRD 5.2 (Nalfeshnee's Horror Nimbus,
  //    Vrock's Stunning Screech and Spores, the sphinx roars) is a Recharge or
  //    n/Day ACTION, not a trait.
  //  - a condition aura carries a SAVING THROW (Stench, Fear Aura, Vile
  //    Appearance), which is why Frightened and Blinded belong here though both
  //    are banned from `body-reaction`, whose skeleton has no save.
  // The TRAILING placement half of this family ("the ground it walks over") has
  // NO print peer — the only wake in the corpus is the Ankheg's tunnel, which
  // has no effect — and it costs the GM the creature's path for a round, so it
  // goes through the critic loop before the catalog, not into this form.
  zone: {
    section: 'trait',
    trigger_tag: 'start_of_turn', // interchangeable with `always` for a trait since 2026-10-26
    slots: ['payload'],
    condition_slot: 'payload',
    // each payload IS an existing catalog template, copied frame for frame, so
    // the sizes by band (5/10/20 ft) and print's damage ladder come along and
    // the two can never drift apart
    frames_from: ['energy-aura', 'noxious-aura', 'aberrant-ground', null], // the lane has no printed peer to copy; its text is below
    // 2024's own wording for a lasting area — "enters for the first time on a
    // turn or ends its turn there". The critic's read killed "starts its turn
    // there": a one-round zone expires before anyone's next turn, so that clause
    // fires only after forced movement, and "enters" without "first time on a
    // turn" leaves the GM asking whether it is once per square.
    lane: 'When the creature moves at least 20 feet in a straight line on its turn, the {lane_width}-wide Line it moved along becomes Difficult Terrain until the start of its next turn. A creature that enters the Line for the first time on a turn or ends its turn there takes {lane_dmg} {damage_type} damage.',
    payload: [
      'damage to everything close by at the end of each of its turns, no saving throw (the engine sets the number and takes the damage type from this creature)',
      'a saving throw for anyone who starts its turn close by, against ONE condition you name',
      'the ground close by is Difficult Terrain',
      'a LANE of hazardous ground left behind a straight-line charge: the Line it moved along becomes Difficult Terrain and hurts anyone who enters or ends a turn in it (only for a creature that already charges or tramples)',
    ],
    effect: ['damage', 'condition', 'movement', 'movement'],
    requires: [null, null, null, 'line-move'],
    id_of: ['damage', 'condition', 'terrain', 'lane'], // the id segment per payload — `effect` alone would collide (terrain and lane are both movement)
    condition_for: 1,
    conditions: ['Poisoned', 'Frightened', 'Deafened', 'Blinded'],
    bans: [],
    ban_notes: [
      'Damage OR a condition, never both: every aura in print that does both is a Recharge action, not an always-on trait.',
      'No Prone.',
      'No counter and no "it grows stronger the longer they stand there": the GM must run it from the one sentence.',
      'The area is the creature\'s own surroundings. An effect left BEHIND it as it moves is a different shape and is not offered here.',
    ],
  },
};

/**
 * The template object the engine runs when the call filled a form instead of
 * picking. It is an ordinary catalog entry built at request time: the same
 * fields `renderTemplate` reads (`frames`, `section`, `effect`, `gate`,
 * `duration_default`, `targets`, `target_sizes`, `flavor`, `key`, `id`), so a
 * composed row goes through rendering, the trait ceiling, the checker and the
 * weld on the normal path and nothing downstream needs to know.
 *
 * `frames` is per band rather than one seed text because a damage reaction's
 * number IS print's retaliation ladder (3 (1d6) at CR 0-2 up to 14 (4d6) at
 * 21+), which is how the row stays priced without a formula.
 */
export function composedTemplate(pick) {
  const { family, condition = null } = pick ?? {};
  const g = GRAMMARS[family];
  if (!g) return null;
  // the index the call chose in the grammar's LAST slot decides the effect cell
  // and, where the grammar copies frames, which template's frames to copy
  const idx = g.slots.map((k) => g[k].indexOf(pick[k]));
  if (idx.some((i) => i < 0)) return null;
  const choice = idx[idx.length - 1];
  // TWO WAYS TO BUILD A FRAME SET, by what the grammar declares.
  // `frames_from`: the payload IS a printed template (the zone family) — copy
  // its frames band for band, so its sizes and its damage ladder stay the
  // catalog's and cannot drift from the template they came from.
  // otherwise: assemble the skeleton from the chosen blanks (body-reaction).
  const src = g.frames_from?.[choice] ?? null;
  const frames = g.frames_from
    ? (src
      ? { ...(BY_ID.get(src)?.frames ?? {}) } // BY_ID is this module's own map (exported as TEMPLATE_BY_ID); it is built below, which is fine because this runs per request, never at module evaluation
      // a payload with no printed peer carries the grammar's own sentence, with
      // the per-band number taken from the aura template that IS calibrated
      : Object.fromEntries(Object.keys(RETAL_LADDER).map((band) => [band, g.lane.replace('{lane_dmg}', (/takes (\d+ \(\d+d\d+\))/.exec(String(BY_ID.get('energy-aura')?.frames?.[band] ?? '')) ?? [, '7 (2d6)'])[1])])))
    : Object.fromEntries(Object.keys(RETAL_LADDER).map((band) => [band, g.slots.reduce(
      (acc, k) => acc.replace(`{${k}}`, pick[k].replace('{retal}', RETAL_LADDER[band])), g.skeleton,
    )]));
  if (!Object.keys(frames).length) return null;
  return {
    // THE ID NAMES THE CHOICE, not just the family: the parser resolves a pick
    // by id against the menu it was handed, so two candidates of one family must
    // not share one. `effect` plus the slot index is enough and stays readable in
    // a trace ("composed:zone:damage", "composed:zone:lane").
    id: `composed:${family}:${g.id_of?.[choice] ?? g.effect[choice]}`, key: `composed:${family}:${g.id_of?.[choice] ?? g.effect[choice]}`,
    name: 'Composed Row', kind: 'shape', composed: family,
    section: g.section, trigger: g.trigger_tag, effect: g.effect[choice],
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], gate: null, nova: false, // every role: the call already judged this body when it chose the trigger
    requires_movement: null, requires_style: null, supersedes: null, deny_types: null,
    requires_row: null, requires_claim: null, requires_size: null, needs_body: null, owns_weapon: false, augments: null,
    family: null, mechanic: null, targets: [], target_sizes: null, duration_default: null,
    host: null, keys: [], flavor: [],
    // a COPIED frame keeps its own {condition_minor} and {save_stat} slots, so
    // renderTemplate fills them and the save contract (saveStatsFor) runs on the
    // row exactly as it does for the template it came from; an ASSEMBLED frame
    // has no save clause, so the condition is written in here
    frames: (g.frames_from || g.keeps_condition_token) /* no grammar sets this today; the reverted payoff family did, and a rider payoff will need it too — the save contract binds its stat off the {condition_minor} token */ ? frames : Object.fromEntries(Object.entries(frames).map(([b, f]) => [b, f.replace('{condition_minor}', condition ?? '')])),
    ...(condition ? { imposes: condition } : {}), // DECLARED, not left to be re-read off the finished text
    // A COPIED FRAME KEEPS ITS {condition_minor} TOKEN ON PURPOSE — the save
    // contract binds the stat off that token (a Frightened aura saves by Wisdom,
    // a Poisoned one by Constitution), so substituting the word in would silently
    // cost the row its save stat. The call's choice therefore travels as a
    // declared FILL, which renderTemplate applies and the contract then reads.
    ...(condition && (g.frames_from || g.keeps_condition_token) ? { fills: { condition_minor: condition } } : {}),
  };
}

/**
 * THE CANDIDATES THIS SEAT COULD COMPOSE, as ordinary templates, built before
 * the call looks at anything.
 *
 * The call was offered these as a FORM to fill and refused it five times in
 * three runs — three of those on ideas whose own gap record described the
 * form's payload nearly word for word. The form was a second task: after the
 * menu, labelled as what to do when nothing fits, showing descriptions instead
 * of rules text, with an explicit exit. Picking from a menu is the task the call
 * does well, so the engine composes first and lets it choose.
 *
 * Every gate that used to live in the prompt or in a post-answer check is a
 * filter HERE instead, which is why a banned combination can no longer arrive:
 *  - the seat gate: a grammar is written for one section (body reactions and
 *    auras are traits in print), so an action-seat idea enumerates nothing;
 *  - `requires`: a payload the sheet cannot carry is never materialised (a lane
 *    needs a row that already makes the GM measure a straight line);
 *  - `bans`: the refused pairs are skipped;
 *  - the idea's own `effect` tag pre-picks body-reaction's consequences, so a
 *    menu gains at most a few lines rather than all twelve combinations.
 *
 * `can` is the set of facts this sheet has (today: 'line-move').
 */
/**
 * WHY `composedCandidates` RETURNED NOTHING — the same three gates it applies,
 * reported instead of applied (owner asked for logging under the hood,
 * 2026-10-27).
 *
 * It returns an empty array for reasons that look identical from outside: the
 * family has no grammar, the grammar is for another seat, no payload matches the
 * idea's declared effect, or a payload's prerequisite is absent from the sheet.
 * Today's funnel is 99 eligible trait ideas -> 61 offered, and the 38 that fell
 * out were unattributable. Null when candidates WOULD be produced.
 */
export function composedReason(idea, { can = [] } = {}) {
  const g = GRAMMARS[idea?.family];
  if (!g) return `has no grammar — composable families are ${Object.keys(GRAMMARS).join(', ')}`;
  if (g.section !== idea.section) return `composes a ${g.section} and this is the ${idea.section} seat`;
  const payloadSlot = g.slots[g.slots.length - 1];
  const matching = g[payloadSlot].map((_, i) => i).filter((i) => g.effect[i] === idea.effect);
  if (!matching.length) return `has no payload that does "${idea.effect}" (it offers ${[...new Set(g.effect)].join(', ')})`;
  const blocked = matching.filter((i) => g.requires?.[i] && !can.includes(g.requires[i]));
  if (blocked.length === matching.length) return `needs ${[...new Set(blocked.map((i) => g.requires[i]))].join(' or ')} on the sheet and it is not there`;
  return null;
}

export function composedCandidates(idea, { can = [] } = {}) {
  const g = GRAMMARS[idea?.family];
  if (!g || g.section !== idea.section) return [];
  const out = [];
  const payloadSlot = g.slots[g.slots.length - 1];
  const others = g.slots.slice(0, -1);
  // every combination of the leading slots x the payloads this sheet allows
  const combos = others.reduce((acc, k) => acc.flatMap((c) => g[k].map((v) => ({ ...c, [k]: v }))), [{}]);
  for (let i = 0; i < g[payloadSlot].length; i += 1) {
    if (g.requires?.[i] && !can.includes(g.requires[i])) continue;
    // PRE-PICKED BY THE IDEA'S OWN EFFECT. Showing a damage consequence to an
    // idea the call tagged `condition` is noise it has to read past.
    if (g.effect[i] !== idea.effect) continue;
    const condition = i === g.condition_for ? g.conditions : [null];
    for (const c of combos) {
      const ix = { ...Object.fromEntries(others.map((k) => [k, g[k].indexOf(c[k])])), [payloadSlot]: i };
      if (g.bans?.some((b) => g.slots.every((k) => b[k] === undefined || b[k] === ix[k]))) continue;
      for (const cond of condition) {
        const t = composedTemplate({ family: idea.family, ...c, [payloadSlot]: g[payloadSlot][i], condition: cond });
        if (!t) continue;
        // THE ID NAMES THE WHOLE COMBINATION, not just the payload: three
        // body-reaction triggers against one consequence are three different
        // rows, and `parseFit` resolves a pick by id against the menu it was
        // handed — identical ids would make them indistinguishable.
        const suffix = [...others.map((k) => `${k[0]}${g[k].indexOf(c[k])}`), ...(cond && condition.length > 1 ? [cond.toLowerCase()] : [])].join(':');
        const id = suffix ? `${t.id}:${suffix}` : t.id;
        out.push({ ...t, id, key: id });
      }
    }
  }
  return out;
}

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
  'energy-aura': ['contact-damage', 'aura'], 'noxious-aura': ['aura'], 'truth-aura': ['aura'], 'gaze-aura': ['aura'], 'fear-aura': ['aura'], 'charge-push': ['charge-rider'], 'sealed-body': ['immutable-form', 'shielded-mind'], 'shielded-mind': ['shielded-mind'], 'warded-mending': ['regeneration'],
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
  'energy-aura': ['aura', 'radiates', 'radiating', 'waste heat', 'heat around', 'furnace', 'shimmers', 'wildfire', 'blaze', 'inferno', 'bonfire', 'pyre', 'flames', 'firestorm', 'scalding air', 'freezing air', 'chill around', 'crackles', 'static', 'emanates', 'wreathed in', 'halo of', 'sheds heat', 'cold around her', 'chills the air', 'chills the room', 'chill around', 'grave-cold', 'lose their warmth', 'warms nobody'],
  'noxious-aura': ['stench', 'reek', 'reeks', 'stink', 'stinks', 'miasma', 'rot', 'fumes', 'spores', 'aura of', 'presence', 'hymn', 'dirge', 'chant', 'keening', 'wail', 'drone', 'voices', 'stops hearts', 'dread presence', 'terrible to behold', 'true form', 'sickening', 'nauseating', 'foul', 'carrion', 'unclean'],
  'death-restoration': ['returns', 'comes back', 'reforms', 'rises again', 'cannot be killed', 'cannot truly die', 'undying', 'deathless', 'immortal', 'reborn', 'always returns', 'death is no end'],
  'blood-frenzy': ['blood', 'blood frenzy', 'smells blood', 'scents blood', 'finishes the wounded', 'preys on the weak', 'culls', 'shark', 'feeding frenzy', 'tastes blood'],
  'pack-tactics': ['formation', 'shield wall', 'ranks', 'never breaks ranks', 'fights as one', 'in formation', 'pack', 'wolf pack', 'hunts in packs', 'flanks', 'drills', 'disciplined'],
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
  'fear-aura': ['terrifies', 'terrifying', 'terror', 'dread', 'dreadful', 'fear', 'fearsome', 'frightens', 'frightening', 'horrifying', 'horror', 'panic', 'unnerving', 'presence', 'aura of fear', 'quail', 'cower', 'cowers', 'flee', 'flees'],
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
const TEMPLATE_DENY = { 'heated-body': new RegExp(`(?:hates?|loathes?|fears?|vulnerable to|weak to|extra damage from|takes? extra damage from)\\s+(?:the\\s+)?(?:fire|flames?|heat|burning)`, 'i'), 'energy-aura': new RegExp(`(?:hates?|loathes?|fears?|vulnerable to|weak to|extra damage from|takes? extra damage from)\\s+(?:the\\s+)?(?:fire|flames?|heat|burning)`, 'i') };
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
  // NOT ORDERED BY WHETHER THE TRIGGER EXISTS, and the attempt is recorded because the
  // measurement looked convincing. Over 3,279 saved sheets, 76 imposed a condition and
  // got an escalate row keyed on something else against 41 where the payoff landed, so
  // ordering the payoff first inside the mechanic group looked like the lever. Built and
  // measured on a batch of 12 concepts each carrying a hold AND an escalation intent:
  // 5 of the 6 sheets that imposed a condition had an EARLY imposer the ordering could
  // see, and the payoff still landed on 1. The seat goes elsewhere or the fit call
  // declines; the menu's order was never the constraint. Reverted rather than left
  // inert (owner, 2026-11-05: "if it's not working?").
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

/**
 * WHY THE FIT CALL IS WORTH MAKING — read off DECLARED fields, not key words.
 *
 * `fitSeat` refused to spend a call unless some template on the menu shared a
 * key word with the concept or the idea ("the fit would be a shape fit by
 * construction"). Sound when a key word was the only bridge from the GM's text
 * to a shape; stale now. Measured over the 7 tens of 2026-10-26 the gate fired
 * 11 times — the largest named loss cause — and 8 of those had a template on the
 * menu whose declared trigger AND effect already matched the idea's own tags,
 * with 13 candidates offered and none shown to the call. `rankByVerb`'s
 * `matched` is key words only; the declared mechanic moved nothing but the sort.
 *
 * Both cells must agree, not one: a trigger-only match is how `spider-climb`
 * (always/movement) would "warrant" an always/damage idea, which is the shape
 * fit the gate exists to prevent.
 *
 * Spends no call that was not already going to be spent — the fit call is made
 * immediately after this point and the gate was returning before it.
 */
/**
 * THE MECHANIC THIS SEAT WAS ASKED FOR — its own clause's, not the sheet's.
 *
 * The route call names ONE `asked_mechanic` per sheet and it led every seat's
 * menu (tier 0 of `orderByStamps`). On a two-clause concept that is the first
 * clause's answer imposed on the second clause's seat: "a brass tyrant whose
 * furnace breath terrifies and whose hammer finds the terrified" took `fear`
 * from the breath, so the HAMMER seat was shown fear templates first and the
 * `condition-payoff` it needed — which was on the menu — sat behind them.
 * Measured before the fix: the sheet's ask lands on 6 of 18 sheets, and on 0 of
 * the 4 sheets with two mechanical clauses.
 *
 * The clause call now answers a mechanic per clause (`askMechanic`), and the
 * seat already knows which clause it serves (`assignSeats`). Matching is by the
 * clause's own words, the way `askedFor` already finds a record: the seat's
 * element text and the clause text are two phrasings of the same thing the GM
 * typed, so the longest shared run of words decides, not an exact compare.
 *
 * Falls back to the sheet's value when the seat has no clause, when the matched
 * clause declared nothing, or when there are no records — so a one-clause
 * concept behaves exactly as before.
 */
export function leadForSeat(seatElement, clauseRecords = [], sheetMechanic = null) {
  const seat = String(seatElement ?? '').toLowerCase();
  if (!seat || !Array.isArray(clauseRecords) || !clauseRecords.length) return sheetMechanic;
  const words = (t) => String(t ?? '').toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3);
  const seatWords = new Set(words(seat));
  if (!seatWords.size) return sheetMechanic;
  let best = null; let bestScore = 0;
  for (const c of clauseRecords) {
    if (!c?.askMechanic) continue;
    const shared = words(c.text).filter((w) => seatWords.has(w)).length;
    if (shared > bestScore) { bestScore = shared; best = c; }
  }
  return bestScore > 0 ? best.askMechanic : sheetMechanic;
}

export function gateStandsDown(menu, idea, askedMechanic = null) {
  const no = { down: false, because: null, ids: [] };
  if (!Array.isArray(menu) || !menu.length || !idea) return no;
  const stamps = menu.filter((t) => stampAgrees(t, idea));
  if (stamps.length) return { down: true, because: `${stamps.length} template(s) whose declared stamps match the idea (${idea.trigger}/${idea.effect})`, ids: stamps.map((t) => t.id) };
  const mech = askedMechanic ? menu.filter((t) => t.mechanic === askedMechanic) : [];
  if (mech.length) return { down: true, because: `a template declaring the mechanic the GM asked for (${askedMechanic})`, ids: mech.map((t) => t.id) };
  return no; // no third arm: a family with a grammar puts its CANDIDATES on the pool, so a match reaches the stamps arm above
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
  fear: ['fear-aura', 'escalating-dread', 'terror-pulse', 'phobia', 'wail'],
  dazzle: ['sensory-strike', 'reveal', 'marking-light', 'bolt-mark'],
  charge: ['trample', 'charge', 'leap', 'pounce', 'burrow-ambush', 'relentless-pursuit'],
  breath: ['spew', 'noxious-aura'],
  burst: ['thrown-burst', 'thrown-burst-seed', 'ground-burst', 'death-burst', 'bloodied-burst', 'active-toll', 'throw-retrieve'],
  drain: ['drain', 'life-drain'],
  curse: ['curse-debt', 'delayed-brand', 'affliction', 'contagion', 'seal'],
  retaliate: ['heated-body', 'resonant-body', 'ward-retaliation', 'riposte', 'own-turn-punisher', 'weapon-lodge', 'coating', 'interpose', 'snap-shot'],
  climb: ['spider-climb', 'web-walker', 'terrain-walk', 'earth-glide', 'tunneler'],
  teleport: ['blink', 'phase-slip', 'self-invisibility'],
  zone: ['zone', 'zone-seed', 'blighted-ground', 'aberrant-ground', 'energy-aura'],
  disguise: ['false-appearance', 'mimicry', 'blurred-form'],
  // split from one bucket of 8, which was the worst in the measurement
  harden: ['shell-withdraw', 'sealed-body', 'guarded-stance', 'patient-defense'],
  resist: ['absorption', 'evasion', 'shielded-mind', 'undead-fortitude'],
  escalate: ['bloodied-fury', 'blood-frenzy', 'rampage', 'berserk', 'execute', 'condition-payoff', 'exploiter', 'assassinate', 'isolation', 'wind-up'],
  mend: ['lay-on-hands', 'second-wind', 'warded-mending', 'death-restoration'],
  command: ['rally', 'volley-order', 'herd', 'pack-tactics'],
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
  // THE PRINT-NAMED STOCK ROWS (critic, twice: 2026-10-28 and 2026-10-30). A print
  // name is exempt from the NAME check, not from the warrant check. Measured
  // before writing these: print has exactly ONE Shield Bash, the Gladiator's at
  // AC 16 (armor plus a shield), and FOURTEEN Spider Climbers — every one an ooze,
  // a spider or other many-legged monstrosity, a lizard, a vampire, a roper or a
  // swarm. Not one is an armored humanoid or a rigid machine. We shipped it on a
  // warlord in lacquered plate and a timber siege golem, and Shield Bash on a
  // drake and a scree-wight that carry no shield.
  //
  // Note what is NOT asked: a Climb speed. Print pairs the two 12 times in 14 and
  // the correlation is still the wrong test, because the trait GRANTS the
  // climbing — print's own Vampire Spawn has Spider Climb and no Climb speed.
  'spider-climb': 'a body that could hold onto a sheer wall or hang from a ceiling — many legs, hooks, claws or clinging tendrils, suckers, a soft or boneless form, or an undead\'s unnatural grip. Not a heavy armored body, a rigid machine, or a thing of beams and plate, which a GM would see cannot cling to a ceiling',
  'shield-bash': 'a shield it actually carries — the row slams that shield into a creature, so the creature must be described or equipped as a shield-bearer. A beast, a thing with no arms, or a fighter whose hands are full of a two-handed weapon carries none',
  'relic-object': 'something it keeps apart from its own body — a vessel, a trophy, a tool, a jar, a severed part; a creature that carries nothing and is all of one piece has no relic to bind',
  'kill-denial': 'a way of killing that destroys or keeps the body — teeth, fire, rot, a blade, something that consumes; not a death by fright or persuasion alone',
  adhesive: 'a surface that is sticky, secreting, or coated in something adhesive',
  'resonant-body': 'a body of metal, crystal, glass, or something hollow that rings when struck',
  'active-toll': 'a body that rings, tolls, or resonates',
  'heated-body': 'a body that is burning hot, molten, or wreathed in flame',
  'energy-aura': 'a body that radiates its own energy into the space around it — burning heat, killing cold, searing light, or creeping rot — so that merely standing near it is harmful. Not a body that merely LOOKS cold or dark, and not a creature whose only reach is its weapon', // the frame fills {damage_type} from the sheet's own energy, so this was never a fire question; a glacier was refused the cold aura the engine's own gap record asked for (2026-10-26)
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
    gate: s.gate ?? null, nova: s.replaces === 'nova', owns_weapon: s.owns_weapon ?? false, augments: s.augments ?? null, requires_movement: s.requires_movement ?? null, requires_style: s.requires_style ?? null, supersedes: s.supersedes ?? null, deny_types: s.deny_types ?? null, requires_row: s.requires_row ?? null, requires_claim: s.requires_claim ?? null, requires_size: s.requires_size ?? null, needs_body: NEEDS_BODY[s.id] ?? null, frame_save: Object.fromEntries(Object.entries(s.frames ?? {}).map(([b, t]) => [b, /Saving Throw/.test(String(t))])), frame_area: Object.fromEntries(Object.entries(s.frames ?? {}).map(([b, t]) => [b, areaOfFrame(t)]).filter(([, g]) => g)), family: FAMILY[s.id] ?? null, mechanic: MECHANIC_OF[s.id] ?? null, targets: s.targets ?? null, target_sizes: s.target_sizes ?? null, duration_default: s.duration_default ?? null,
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
    // A SEED MAY DECLARE ITS OWN CELL (owner's ruling, 2026-11-05, option b).
    //
    // These two lines are a word rule deciding meaning, and the meaning they decide
    // builds the MENU: `templatesFor` offers templates by cell, so whatever these regexes
    // say a row does is what the engine will look for it under. The `effect` line reads
    // condition > damage > movement in that order, off the row's own prose.
    //
    // What that cost (homebrew40 #30, 2026-11-05). `disarm` is "the target drops the held
    // object" — no "damage", no "condition" — so it filed as `movement`, correctly. The
    // moment a damage term was added so it could clear the value floor, /damage/ matched
    // and the row silently REFILED as `save/damage`, leaving the movement shelf without
    // its disarm. Print's ordinary shape is "damage AND an effect" — 140 of its 146
    // action-cost save rows carry damage or a condition — so a taxonomy with one slot per
    // row, inferred from prose, cannot describe print's own monsters: every row we repair
    // toward print's grammar gets refiled away from the cell that should hold it.
    //
    // So a seed declares `trigger` and `effect` when it knows them, and the inference
    // stays as the fallback for the rows that never declared anything. Nothing existing
    // moves; a row that wants damage and its own shelf can now have both.
    trigger: seed.trigger ?? (/When (?:the creature|it) hits\b/i.test(seed.text) ? 'on_hit'
      : /\*Trigger:\*|hits the creature|is hit by|takes damage/i.test(seed.text) ? 'on_being_hit'
      : /at the start of each of (?:its|the creature's) turns/i.test(seed.text) ? 'start_of_turn' // the recurring idiom; "until the start of its next turn" is a duration
      : /Saving Throw/.test(seed.text) ? 'save' : 'always'),
    effect: seed.effect ?? (/condition/.test(seed.text) ? 'condition' : /damage/.test(seed.text) ? 'damage' : 'movement'),
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
const PASSIVE = new Set(['always', 'start_of_turn']); // a trait's two ways of saying "no action needed"
export function triggerCompatible(want, have, section = null) {
  if (!want) return true;
  // A TRAIT THAT ACTS EACH TURN IS A PASSIVE TRAIT (2026-10-26). `start_of_turn`
  // sits in TEMPORAL so that an on-hit rider can never fill a save slot, and that
  // is right for actions and riders — but it also made `always` and
  // `start_of_turn` mutually exclusive for TRAITS, where they are near-synonyms:
  // print writes Fire Aura and Aberrant Ground as plain traits with no trigger at
  // all. Measured: a trait idea the AI tagged `start_of_turn` came back with **2
  // of 31** trait templates, every `always` trait filtered out, so the three
  // catalog gaps in save10-2026-10-26T15-11-53 were starvation — `orderByStamps`
  // had nothing to rank. The filter now admits both for traits and the STAMPS do
  // the preferring, which is this engine's own division of labour: filter on what
  // is structurally illegal, rank on what fits.
  if (section === 'trait' && PASSIVE.has(want) && PASSIVE.has(have)) return true;
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

/**
 * THE CONDITIONS THIS SHEET ALREADY IMPOSES TWICE — one definition (2026-11-02).
 * Measured over the 329-block corpus: 181 blocks impose a condition on exactly one
 * row, 11 on two, and NOT ONE on three, which the checker fails as
 * `duplicate-mechanic`. `templatesFor` uses this to withhold a template that would
 * be the third, and the signature seat's authoring attempt uses it to refuse a row
 * it just wrote for the same reason — an authored row reaches no menu, so the menu
 * filter could not see it, and the Quarry Scree shipped a third Restrained row on
 * the first run of that path. `imposedConditions` is the shared reader; this is
 * declared data throughout.
 */
export function conditionsImposedTwice(rows) {
  return new Set(
    Object.entries((rows ?? []).flatMap((e) => imposedConditions(e)).reduce((m, c) => ({ ...m, [c]: (m[c] ?? 0) + 1 }), {}))
      .filter(([, n]) => n >= 2).map(([c]) => c),
  );
}

export function templatesFor({ archetype, style = null, cr, movement = '', sections = {}, section = null, trigger = null, text = null, imposed = null, type = '', concept = '', size = '', holds = null, bodyVerdicts = null, shapes = null, shapeCap = SHAPE_MENU_CAP, diagnose = null, gmAsked = false } = {}) {
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
  // NO SHEET IMPOSES ONE CONDITION THREE WAYS (the forty of 2026-10-27, Purple
  // Worm: Bite, Gut Plate Shear and Swallow all Restrained). Measured over the
  // 329-block corpus: 181 blocks impose a condition on exactly one row, 11 on
  // two, and NOT ONE on three. The checker has always failed this
  // (`duplicate-mechanic`); the engine had no matching rule, so it shipped what
  // the gate would reject — and on a print body two of the three rows are
  // print's own, so the only row that can give way is ours.
  //
  // This is the pool, not the ship: the template leaves the MENU, the call picks
  // something else, and the sheet keeps a full row rather than losing one late.
  // Declared data throughout — `imposedConditions` is the one shared reader and
  // `IMPOSES_BY_TEMPLATE` is the template's own record.
  const imposedTwice = conditionsImposedTwice(rows);
  const wouldBeThird = (t) => {
    if (!imposedTwice.size) return false;
    const d = IMPOSES_BY_TEMPLATE[t.id];
    const all = d == null ? [] : typeof d === 'string' ? [d] : Array.isArray(d) ? d : Object.values(d).flat();
    return [...new Set(all.filter(Boolean))].some((c) => imposedTwice.has(String(c)));
  };
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
  // WHICH FILTER WITHHELD A TEMPLATE (2026-11-03). This was one short-circuit `&&`
  // expression, and the diagnostic below reported every failure among it as the
  // single word `legality` — 3,815 of 5,650 same-seat rejections across ten runs,
  // the largest category of "why the idea's template was not on the menu" and by
  // construction unlabelled. The gap log could not answer "why are simple
  // action/save/condition templates being lost?" because the answer was discarded on
  // the last line, in the very function whose comment says only it holds the context.
  //
  // Same predicates, same order, same short-circuit: `restFail` returns the NAME of
  // the first check a template fails, or null when it passes all of them, and `rest`
  // reads that as a boolean. Every predicate is a pure read, so stopping at the first
  // failure is exactly what the `&&` chain did. No behaviour change.
  const REST_CHECKS = [
    ['engine-family', (t) => (!(EXCLUDE_ON[t.id] ?? []).some((fam) => engines.has(fam)) || supersedesRow(t))
    ],
    ['cr-range', (t) => cr >= t.cr_range[0] && cr <= t.cr_range[1]
    ],
    ['band-frame', (t) => (t.kind !== 'shape' || t.frames[band])
    ],
    ['movement', (t) => (!t.requires_movement || new RegExp(t.requires_movement, 'i').test(movement))
    ],
    ['requires-style', (t) => (!t.requires_style || t.requires_style === style) // a ward-shaped reaction needs the warden seat, not just a defender line
    ],
    ['deny-type', (t) => !(t.deny_types && type && t.deny_types.some((ty) => new RegExp(`^${ty}\\b`, 'i').test(String(type))))
    ],
    ['condition-three-ways', (t) => !wouldBeThird(t) // print has no block imposing one condition three ways (0 of 329)
    // A BODY-MASS REQUIREMENT, read off the DECLARED size — never off the text.
    // Fails OPEN when size is unknown, like `type` and `movement` above, so the
    // call sites that pass no size are unaffected. Only two templates declare
    // it: trample (print 4 of 4 Large+) and leap. Measured against print, which
    // is also how the circular Climb gate on spider-climb was caught — print
    // CORRELATION is not a requirement, so the test is whether a GM would read a
    // contradiction (a Tiny body trampling a Medium one), not whether every
    // print instance happens to satisfy it (2026-10-22).
    ],
    ['size', (t) => !(t.requires_size && size && SIZES.indexOf(String(size)) >= 0
      && SIZES.indexOf(String(size)) < SIZES.indexOf(t.requires_size))
    ],
    ['requires-row', (t) => !(t.requires_row instanceof RegExp && rows.length && !rows.some((e) => t.requires_row.test(e.text ?? '')) && !(t.keys ?? []).some((k) => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(readPhrases(String(concept ?? ''))))) // a body-plan filter: a hurled weapon needs something to throw — a thrown/ranged row on the sheet, or a weapon the USER's words name (the armor's lance; never the gong) // a body trait is a BODY's: contact damage on a Humanoid pirate queen read her name as brine (critic, new lines 2026-09-28)
    ],
    ['section', (t) => (!section || t.section === section)
    ],
    ['trigger', (t) => triggerCompatible(trigger, t.trigger, t.section)
    ],
    ['denied-clause', (t) => !(text && deniedBy(t, text).length)
    ],
    ['needs-imposed', (t) => !(REQUIRES_IMPOSED.has(t.id) && Array.isArray(imposed) && !imposed.length)
    // THE CALL DECIDES WHETHER THIS CREATURE HOLDS (owner's preference, 2026-10-17:
    // calls and keywords returned from the LLM over deterministic gates). The
    // route call answers `holds` with the GM's own words as its receipt, and
    // `engineKeyOk` is the word list asking the same question. A thieves'-guild
    // bookkeeper answered holds=false and the engine landed an "Accountant's
    // Ledger Hook" anyway, which the checker then failed for having no key
    // (gate-2026-10-17T19-30-16). The answer decides where the row LANDS, not
    // only where it is reported. A null answer leaves the word list deciding.
    ],
    ['engine-key', (t) => !(NEEDS_ENGINE_KEY.has(t.id) && (holds === null ? !engineKeyOk(concept) : !holds))
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
    ],
    ['body-verdict', (t) => !(t.needs_body && (() => {
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
    ],
    ['requires-claim', (t) => !(t.requires_claim instanceof RegExp && !t.requires_claim.test(String(concept ?? '')) && !rows.some((e) => t.requires_claim.test(`${e.name ?? ''} ${e.text ?? ''}`)))
    // a rider needs its host row on the sheet (a ranged rider was offered to a phantom with no ranged row)
    ],
    ['host-row', (t) => !(t.host && rows.length && !rows.some((e) => (t.host === 'ranged' ? /Ranged Attack Roll/ : /Melee Attack Roll/).test(e.text ?? '')))
    ],
    ['nova-taken', (t) => !(t.nova && hasNova)
    ],
    ['owned', (t) => !owned.has(t.name.toLowerCase())
    ],
  ];
  const restFail = (t) => { for (const [name, ok] of REST_CHECKS) { if (!ok(t)) return name; } return null; };
  const rest = (t) => restFail(t) === null;
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
      // `legality` was a catch-all for nineteen separate predicates; it now names the
      // one that fired, so the gap log is a ranked list of gates instead of one word.
      .map((t) => `${t.id}:${!onShelf(t) ? 'role' : !onStyle(t) ? 'style' : restFail(t) ?? 'legality'}`);
  }
  // ROLE IS A TASTE FILTER, AND TASTE DOES NOT OVERRULE AN ASK (owner's ruling,
  // 2026-11-05: "lets not role gate if the gm is asking for something...but we want to
  // keep gating when the gm doesn't ask for specific abilities or modifications").
  //
  // `askedList` below already lifted role and style for an asked template — the
  // mechanism was right and its TRIGGER was a word list. `askedFor` matches the GM's
  // text against each template's `keys`, and a GM who typed "makes you drop what you are
  // carrying" got no disarm, because `disarm.keys` holds disarm/twist/strip/weapon/
  // snatch/steal/pluck/wrench/knock away/take and not "drop". The whole chain downstream
  // was then correct on a false premise: the lurker's action menu held 12 templates and
  // none disarmed, the fit call answered no_fit truthfully, the seat authored a
  // substitute, and the trait seat reached for `phobia` — the critic's §3 subject flip
  // that breaks the monster (#30 Ledger Ghaunt, homebrew40 2026-11-05).
  //
  // Adding "drop" to the key list would fix that one sheet and is the move the house
  // rule forbids. So the lift keys off something that judges nothing: the IDEA CALL has
  // already said whether this seat's idea answers a clause the GM typed (`idea.clause`,
  // traced as "idea anchored"). When it does, the GM is asking, and every legal template
  // is shown regardless of role or style — the call picks, as it always did. When the
  // idea is unanchored the engine is inventing a row, and role and style still apply,
  // which is the half of the ruling that keeps a caster from being offered a shove.
  //
  // Legality (`rest`) is never lifted: CR range, engine family, movement and denials are
  // renderability, not taste. And the lift APPENDS, so a pick the shelf already had
  // keeps its order — the re-roll's reel pin holds.
  const onShelfList = TEMPLATES.filter((t) => onShelf(t) && onStyle(t) && rest(t));
  const askedList = TEMPLATES.filter((t) => !(onShelf(t) && onStyle(t)) && (gmAsked || askedFor(t)) && rest(t));
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
const BLIND_FILLS = { mimicked: 'animal sounds and humanoid voices', counter: 'its remains are burned and the ashes scattered', finisher: 'strikes where the target cannot guard', kill_consequence: 'crumbles to dust', relic: 'a sealed reliquary', /* print's own: the Mummy's victim "dies and turns to dust" */ phobia: 'the thing it fears', restraint: 'binding' /* NO article: the frame reads "until the {restraint} is destroyed", and 'the binding' rendered "until the the binding" (2026-10-27) */, /* the snare's object noun: an empty slot printed "Restrained until the Restrained is destroyed" (critic's blockers audit 2026-10-03) */ douse: 'tear the brand away', projectile: 'a hurled object', wound_phrase: 'a festering wound', zone_effect: 'a choking haze', zone_rule: 'has Disadvantage on attack rolls', disguise: 'an ordinary object', shell: 'its shell', telegraph: 'its whole frame tensing', lure_source: 'the creature', hook: 'its grip', terrain: 'mud', sense_target: 'moving creatures', anchor: 'its resting place', ward: 'its ward' }; // sense_target is the neutral sense: a rejected fill on a hound printed "precious metal" (the fourteen, 2026-09-28)
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
  'fear-aura': 'Frightened',
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

// TWO FACTS A SHAPE DECLARES ABOUT ITS OWN DAMAGE (owner, 2026-10-27, after the
// damage-type stamp: the two reads that remained were regexes over the
// template's OWN frame text, deciding what kind of shape it is from its wording).
//
// `renderTemplate` asked its frame two questions to correct the damage type:
// does this shape take life (so its damage is Necrotic, never a weapon type —
// Plague Siphon shipped Piercing, the critic's fourth read), and is it an extra
// on the creature's own hit (so it takes the HIT's type — Assassinate added
// Bludgeoning to spear hits). Both are fixed properties of the catalog, so
// reading them off the prose each render was a word list standing in for a
// field, on the same path as the damage type itself.
//
// The sets are EXACTLY what the two regexes matched across the catalog on
// 2026-10-27, checked band by band, so this changes no row. `warded-mending` is
// in the first set because its frame says "regains Hit Points" — it is a heal,
// not a drain, and whether it belongs is a separate question from whether this
// is a field; narrowing the set would change rows and is not this change.
// `__REGEX_WAS` keeps the retired predicates so the spec can prove the sets and
// the prose still agree, and fails if a new shape joins one and not the other.
const DAMAGE_FROM_LIFE = new Set(['contagion', 'seal', 'relic-object', 'warded-mending', 'drain']);
const EXTRA_ON_OWN_HIT = new Set(['charge-push', 'isolation', 'assassinate', 'charge', 'coating']);
export const __REGEX_WAS = {
  drains: /regains? (?:\d+ )?Hit Points|drains?|siphon/i,
  ridesHit: (f) => /takes an extra \{(?:avg|burst)/.test(f) && !/\{atk\}/.test(f),
  sets: { DAMAGE_FROM_LIFE, EXTRA_ON_OWN_HIT },
};

// the condition a given template's given CR band imposes, or null
export function imposedByFrame(id, band) {
  const d = IMPOSES_BY_TEMPLATE[id];
  if (!d) return null;
  if (typeof d === 'string' || Array.isArray(d)) return d;
  return d[band] ?? null;
}

// THE RIDER CLAUSE IS A SEGMENT OF THE FRAME, NOT A SENTENCE TO CUT BACK OUT
// (roadmap R3, 2026-11-01: "the engine edits fields, never sentences; text is
// rendered from fields at the end").
//
// Our own frames write a minor-condition rider in ONE closed shape — ", and the
// target has the <condition> condition<how long>." — 67 of them across shapes
// and donors. Four sites then cut it back out of the FINISHED sentence with
// `[^.]*` patterns, and each one was a different near-miss of the same string:
// the payoff-vestigial strip and the fear-unearned strip matched only "the
// target" (never "it"), and print-canon's matched only the bare condition form,
// which is how the Dire Wolf shipped a rest-long contagion on print's own Bite —
// a welded SAVE block is a different shape and survived the cut.
//
// So the clause is split off the frame ONCE, before any fill, and the frame
// carries a `{minor_clause}` token in its place. Keeping the rider means filling
// that token; dropping it means filling it with nothing. No reader cuts prose.
// This is a boundary read of our OWN catalog at render time, the same warrant as
// `frame_save` and `frame_area` — never a read of anyone's meaning.
//
// FOUR COPIES, NOT ONE (found while converting the first, 2026-11-01). The same
// cut lives at the authored-row repair, the print-canon clone, the print-canon
// rename and the one-fact-one-home shed — written four times, each with its own
// near-miss ("the target" only at two of them, a `cond` filter at the fourth).
// One definition, every reader: `only` restricts the split to a named condition,
// which is what the shed needs and what the other three must not have.
// THE TAIL SHAPE STAYS EXACTLY AS NARROW AS IT WAS. A first cut at the stepped payoff
// widened this — `and` optional, `also` admitted — to catch the reward clause, and that
// moved the match EARLIER in print's grapple sentence: ", it has the Grappled condition
// (escape DC 22), and it has the Restrained condition until the grapple ends" matched at
// the Grappled half, so the guard below saw no imposition before it and split a pair it
// has always refused. The conditional reward has its own shape instead
// (CONDITIONAL_RIDER_SHAPE), which is the right place for it: that clause is a whole
// sentence, not a tail. Caught by the grapple-pair test, which is why it exists.
const MINOR_CLAUSE_SHAPE = /,? and (?:the target|it) has the (\{condition_minor\}|[A-Z][a-z]+) condition[^.]*(?=\.|$)/;
// A PLACEHOLDER IS NOT A NAME (N4, 2026-11-02). A composed template is built at
// request time and carries `name: 'Composed Row'` until something names the row —
// a label for a trace, never for a card. The Rivenhearted Glacier shipped a trait
// called "Composed Row" (critic's S0, forty #1): its own name "Killing Wake"
// collided with a row already on the sheet, and BOTH collision fallbacks hand the
// row its template's name, which for a composed template is this placeholder.
// Declared here so the two rename sites and the sheet lint read one list.
export const PLACEHOLDER_ROW_NAMES = ['Composed Row', 'Composed', 'Trait', 'Row', 'Action', 'Reaction', 'Bonus Action'];
export const isPlaceholderRowName = (n) => PLACEHOLDER_ROW_NAMES
  .some((p) => p.toLowerCase() === String(n ?? '').replace(/ \(.*\)$/, '').trim().toLowerCase());

// A CONDITIONAL REWARD IS ONE UNIT, TRIGGER AND EFFECT TOGETHER. The shape above is a
// TAIL that may be dropped without harming its sentence — that is the whole contract the
// `{minor_clause}` token rests on. A stepped payoff's reward is not a tail: cut its
// effect and the frame keeps "If the target already has the Prone condition." — a
// trigger with nothing behind it, which is worse than the rider it removed. So the
// conditional sentence is matched WHOLE and travels as one segment: keeping it keeps
// both halves, dropping it drops the sentence and leaves the damage clause clean.
const CONDITIONAL_RIDER_SHAPE = /\s*If the target already has the (?:\{consumed_condition\}|[A-Z][a-z]+) condition, (?:the target|it) (?:also )?has the (\{condition_minor\}|[A-Z][a-z]+) condition[^.]*(?=\.|$)\.?/;
export const splitMinorClause = (frame, { only = null } = {}) => {
  const text = String(frame ?? '');
  const cond = CONDITIONAL_RIDER_SHAPE.exec(text);
  if (cond && !(only && String(cond[1]).toLowerCase() !== String(only).toLowerCase())) {
    return {
      body: `${text.slice(0, cond.index)}{minor_clause}${text.slice(cond.index + cond[0].length)}`,
      clause: cond[0],
      condition: cond[1],
      hasToken: cond[1] === '{condition_minor}',
      conditional: true, // the reward's trigger rides inside the clause, so a reader must not look for it in the body
    };
  }
  const m = MINOR_CLAUSE_SHAPE.exec(text);
  const miss = { body: text, clause: null, condition: null, hasToken: false };
  if (!m) return miss;
  if (only && String(m[1]).toLowerCase() !== String(only).toLowerCase()) return miss;
  // A GRAPPLE PAIR IS ONE FACT, NOT A RIDER (measured against print, 2026-11-01).
  // Print writes 52 rows in this shape and 10 of them are the SECOND half of a
  // grapple: "The target has the Grappled condition (escape DC 16), and it has
  // the Restrained condition until the grapple ends" — the Behir, Chain Devil,
  // Couatl, Kraken, Marilith, Purple Worm, Remorhaz, Roc, Roper, Salamander. The
  // trailing clause is bound to the hold its own sentence just imposed; cut it
  // and the grapple does nothing. Two of the four patterns this replaces cut it
  // (the Roper's Poisoned half and the Purple Worm's Restrained half), so this
  // is a fault they shared, not a new restriction. The test is positional and
  // closed: does the same sentence already impose a condition before this clause?
  //
  // `only` BYPASSES IT, and that is the whole distinction: the guard stops a
  // BLIND cut (print canon and the authored repair take whatever rider they
  // find), while a caller passing `only` has already decided that this named
  // condition has too many homes on the sheet and is shedding it on purpose.
  // Keeping the guard there regressed the Roper: step 1 refused the pair, and
  // the shed's second pattern — a whole-sentence cut this site has not reached
  // yet — then took the Poisoned half and left a dangling "and". Caught by
  // replaying print's own row, not by the batch.
  const sentence = text.slice(Math.max(text.lastIndexOf('.', m.index) + 1, 0), m.index);
  // A CONDITIONAL REWARD IS NOT A GRAPPLE PAIR (owner's redesign, 2026-11-05). The guard
  // above reads "this sentence already imposed a condition, so the trailing clause is
  // bound to it" — true for print's ten grapple rows, and FALSE for a stepped payoff,
  // whose first half is a TRIGGER rather than an imposition: "If the target already has
  // the Prone condition, it also has the Frightened condition until the end of its next
  // turn." Without this distinction the split refused, so the rider was never lifted out
  // of the frame: nothing declared `imposes`, and a payoff whose reward matched its own
  // trigger printed "already has the Prone condition, it also has the Prone condition".
  //
  // The test is positional and closed, like the guard it narrows: the preceding half is
  // a trigger only when it is an `if` clause reading `already has the … condition`. No
  // frame in the catalog, the library or the donors wrote that phrase before today, so
  // this admits the new shape and nothing else — print's grapple pairs say "The target
  // has the Grappled condition", never "if … already has".
  const isConditionalTrigger = /\bif\b[^.]*\balready has the\b/i.test(sentence);
  if (!only && !isConditionalTrigger && /has the [A-Za-z{}_]+ condition/.test(sentence)) return miss;
  return {
    body: `${text.slice(0, m.index)}{minor_clause}${text.slice(m.index + m[0].length)}`,
    clause: m[0],
    condition: m[1],
    hasToken: m[1] === '{condition_minor}',
  };
};

export function renderTemplate(t, ctx, fills = {}, { blind = false } = {}) {
  let saveOverride = null; // why the engine overrode the model's save_stat, for the trace
  let pickedCondition = null; // the condition this render imposes, chosen from the closed list below
  let consumedPick = null; // the condition this render REQUIRES on its target (a payoff), from the model's consumed_condition
  let vestigialStripped = null;
  let escalationShape = null; // which rung shape this render used, for the trace and the row // a payoff's rider that would have imposed the very condition it requires — the clause is removed instead
  // the fiction ladder: the model's fill > the sheet's own noun > the blind
  // default; an empty fills object cost four signatures (critic, 2026-09-22)
  // the terrain of a FORCED bind is the concept's, not the blind default (an ice
  // goat's Sure Footing printed "composed of mud", 2026-09-28)
  const TERRAIN_OF = [[/\b(?:ice|icy|snow|frozen|freez|glacier|rime|frost)/i, 'ice or snow'], [/\b(?:mire|bog|swamp|marsh|fen|mud)/i, 'mud'], [/\b(?:sand|dune|desert)/i, 'sand'], [/\b(?:rubble|scree|shale|broken stone)/i, 'rubble'], [/\b(?:webs?|silk)\b/i, 'webs'], [/\b(?:ash|cinder|ember)/i, 'ash'], [/\b(?:thicket|bramble|briar|undergrowth)/i, 'undergrowth']];
  const terrainOf = (TERRAIN_OF.find(([re]) => re.test(String(ctx.concept ?? ''))) ?? [])[1];
  fills = { ...BLIND_FILLS, ...(terrainOf ? { terrain: terrainOf } : {}), ...(ctx.projectile ? { projectile: ctx.projectile } : {}), ...Object.fromEntries(Object.entries(fills).filter(([, v]) => typeof v === 'string' && v.trim())) };
  void blind;
  // ONE POOL, READ BY ALL THREE VALIDATORS. `condition_minor` is checked in three places
  // with three fallbacks — the reward choice below, the pick-and-strip block, and the
  // final VOCAB fill loop — and unifying only the first two shipped a row whose
  // `imposes` field said Restrained while its sentence printed Frightened, because the
  // fill loop fell back to the mild list. A declared field contradicting the printed
  // text is worse than either being wrong alone, so the pool is defined ONCE here and
  // every site reads it through `poolFor`.
  //
  // WHY A SEVERE POOL AT ALL: every single-target save row print writes at CR 13+ takes
  // a turn away rather than competing on damage — Mummy Lord/Dreadful Glare Paralyzed
  // (15), Adult Gold Dragon/Banish Incapacitated (17), Kraken/Swallow Restrained (23),
  // Solar/Blinding Gaze Blinded (21). A gated payoff trading one attack for 31 damage
  // and Disadvantage is a button no GM presses up there (owner, 2026-11-05). Below CR 10
  // the mild pool is right: print's own payoffs there are Frightened, Charmed and Prone.
  // `MINOR` stays untouched for the four other templates on this slot and the 14 donor
  // frames; only a payoff, and only at CR 10+, draws from the severe list.
  const condPool = (t?.rewardsCondition && Number(ctx.cr) >= 10) ? SEVERE_CONDITIONS : MINOR;
  // the model does not choose a payoff's reward at all: the LADDER does, off the
  // condition the target already has. The pool above is what the three validators will
  // accept, and `escalateFrom` picks the rung inside it.
  const poolFor = (slot) => (slot === 'condition_minor' ? condPool : VOCAB[slot]);
  // A REWARD MUST BE AN UPGRADE, NOT A SECOND LABEL (owner's spot check, 2026-11-05:
  // "restrained to prone is kind of underwhelming"). A stepped payoff rewards a target
  // it finds already afflicted, and the first cut only required the reward to DIFFER
  // from the trigger — so it offered Prone to a Restrained creature, which gives a GM
  // nothing: the attackers already have Advantage, the target already has speed 0, and
  // it cannot stand up while Restrained.
  //
  // print attests which condition upgrades into which (CONDITION_ESCALATION, counts in
  // card-budgets.mjs), and every pair it writes is strictly worse than its trigger. The
  // model's proposal is kept when print attests it and corrected when it does not, so
  // Restrained now rewards Petrified — print's own pairing, reached the way print
  // reaches it, by a second failure rather than a first. A trigger print never upgrades
  // (Prone, Frightened, Blinded, Deafened) gets NO condition reward and the frame falls
  // back to its damage step, which is better than inventing a weak pair.
  if (t?.rewardsCondition && fills.consumed_condition) {
    // THE POOL IS PER-TEMPLATE, NOT GLOBAL. `MINOR` stays mild for the four other
    // templates that use this slot and for the 14 donor frames; a payoff draws from the
    // SEVERE pool at the CRs where print's own single-target saves do, because up there
    // a mild rider on a gated row is a button no GM presses — print's high-CR saves take
    // a turn away (Paralyzed, Incapacitated, Restrained, Blinded) and do not compete on
    // damage. Below CR 10 the mild pool is right: print's payoffs there are Frightened,
    // Charmed and Prone.
    const up = escalateFrom(fills.consumed_condition, MINOR, { severe: Number(ctx.cr) >= 10 });
    if (up !== fills.condition_minor) fills = { ...fills, condition_minor: up ?? '' };
  }
  // THE ESCALATION'S SHAPE IS THE CALL'S TO JUDGE, its numbers and rules the engine's
  // (owner, 2026-11-05). A payoff's frame writes the CONDITION shape, and that shape is
  // declared and stripped by the minor-clause machinery. The other three replace the
  // reward clause HERE, before that split runs, so they never enter it — they impose no
  // condition, so `imposes` stays null for them, which is the honest answer.
  //
  // An out-of-band answer degrades to the condition rung rather than failing the row:
  // exhaustion is refused below CR 10 (print writes it at 11 and 17), and anything not
  // on the shelf is ignored.
  if (t?.rewardsCondition) {
    const allowed = escalationShapesFor(ctx.cr);
    const asked = String(fills.escalation ?? '').trim().toLowerCase();
    const shape = allowed.includes(asked) ? asked : 'condition';
    if (shape === 'damage') {
      // print's two-step amount is a REPLACEMENT, not an addition: the Mimic deals "7
      // (1d8 + 3)—or 12 (2d8 + 3)", never 7 plus 12. An additive extra put 31 + 32 = 63
      // on an afflicted target against a ceiling of 31, so the damage shape swaps the
      // whole Failure half for the stepped form, whose upper amount IS the ceiling
      // ({avg_up}) and whose base is about 60% of it.
      escalationShape = shape;
      t = { ...t, frames: Object.fromEntries(Object.entries(t.frames ?? {}).map(([b, f]) => [b,
        String(f).replace(
          /\{avg\} \(\{dice\}\) \{damage_type\} damage\. If the target already has the \{consumed_condition\} condition, it also has the \{condition_minor\} condition until the end of its next turn\./,
          '{avg_base} ({dice_base}) {damage_type} damage, or {avg_up} ({dice_up}) {damage_type} damage if the target already has the {consumed_condition} condition.',
        )])) };
    } else if (shape !== 'condition') {
      const clause = escalationClause(shape, {
        inline: String(ctx.inline ?? 'the creature'),
        damageType: String(fills.damage_type ?? 'Force'),
      });
      if (clause) {
        escalationShape = shape;
        t = { ...t, frames: Object.fromEntries(Object.entries(t.frames ?? {}).map(([b, f]) => [b,
          String(f).replace(/it also has the \{condition_minor\} condition until the end of its next turn\./, `${clause}.`)])) };
      }
    }
  }
  const { scaled } = ctx;
  // THE DURATION THE WRITER CHOSE, kept so no reader has to recover it from the
  // finished sentence. `durationClause` turns a key into text and the key was
  // then thrown away — which is why `condition-duration` had to guess from prose
  // and had to be downgraded to `soft` after nought true positives (it reads
  // "until the end of" but not a state bound like "while swallowed"). Same move
  // that retired the prose reader for `imposes`.
  let boundBy = null;
  if (t.kind === 'seed') {
    let boundByS = null;
    const drawn = drawLibraryRow(scaled, { archetype: ctx.archetype, energy: ctx.energy, mix: ctx.mix, name: ctx.name ?? '', shapeKey: t.key, imposed: ctx.imposed ?? [], mechanics: ctx.mechanics ?? null, cr: ctx.cr });
    if (!drawn || drawn.seed !== t.key) return null; // the seed was not legal on this sheet
    let text = drawn.row.text;
    for (const k of FLAVOR_SLOTS) {
      if (!text.includes(`{${k}}`)) continue;
      // the same ladder as a shape: a fill the bound rejects falls to the blind
      // default, never to a miss (the ledger's Delayed Brand died on its douse, fresh two)
      const v = shortFlavor(fills[k]) && !doublesFrameVerb(text, k, fills[k]) && fillKeepsFrame(k, fills[k]) && !fillIsSelf(fills[k], ctx) ? fills[k] : BLIND_FILLS[k];
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
      const pickS = allowedS.includes(askedS) ? askedS : fallbackS;
      const clauseS = durationClause(pickS);
      if (!clauseS) return null;
      text = text.split('{duration}').join(clauseS);
      boundByS = pickS; // THE WRITER RECORDS WHAT IT WROTE — see the return below
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
    // AND THE DECLARED DAMAGE TYPE RIDES ALONG, for the same reason `imposes`
    // does: this branch rebuilds the row from the drawn one and anything it does
    // not carry is lost, so a consumer would have to scrape the sentence to get
    // it back. `drawLibraryRow` stamps the type its own fill spent (2026-10-27).
    const seedType = drawn.row.damageType ?? null;
    return { name: t.name, text, section: SECTION_OF[t.section], gate: t.gate, ...(seedType ? { damageType: seedType } : {}), ...(boundByS ? { duration: boundByS } : {}), ...(seedImposes ? { imposes: seedImposes } : {}) };
  }
  // A THROWN NAMED WEAPON KEEPS ITS OWN TYPE AND RANGE (the critic's second
  // species read: a spear hurled for Bludgeoning at 30/120). One table.
  const projW = /\{projectile\}/.test(t.frames?.[bandFor(ctx.cr)] ?? '') ? weaponProp(fills.projectile) : null;
  const projWeapon = projW?.thrown ? [null, projW.type, projW.range] : null;
  const projWeaponRange = projWeapon ? projWeapon[2] : null;
  const band = bandFor(ctx.cr);
  let text = t.frames[band];
  if (!text) return null;
  // Does this frame deal damage? Read from the frame BEFORE its engine slots are
  // filled, because by the time the condition is validated below they are digits.
  // It matters because print's MODAL fear row deals no damage (7 of 11), so the
  // pairing rule below must only judge rows that actually hit for something.
  const framesDamage = /\{avg(?:_half|_x2)?\}|\d+ \(\d+d\d+/.test(String(t.frames[band]));
  // THE WRITER RECORDS WHAT IT WROTE. The catalog declares what this frame
  // imposes, so no reader has to recover it from the rendered sentence.
  pickedCondition = imposedByFrame(t.id, band) ?? t.imposes ?? pickedCondition;
  // a lane's width is the body's own space — ctx.size is the DECLARED size the
  // sheet already carries for requires_size, so nothing new is read
  if (text.includes('{lane_width}')) text = text.split('{lane_width}').join(LANE_WIDTH[String(ctx.size ?? '').trim()] ?? '10-foot'); // `t.imposes` so a template BUILT at request time can declare its own condition: the static map is keyed by id, a composed row has no entry, and its Deafened had to be recovered from the finished text downstream ("record completed", 2026-10-26)
  if (projWeaponRange) text = text.replace(/range \d+\/\d+ ft\./, `range ${projWeaponRange} ft.`);
  // A SINGLE-TARGET SAVE IS NOT A BREATH WEAPON (critic's #06, confirmed by the
  // unproven-twelve 2026-11-05). `per_hit` is the round's damage budget, and a save
  // frame spends it whole — which is right for a cone, where four characters split it
  // and each halves it on a success, and WRONG for "one creature within 60 feet". The
  // Merciless Strike shipped 65 at CR 13 against print's hardest single-target save row
  // of 31, and 66 at CR 16: one failed save removing a character outright. 47 of the
  // catalog's 87 save frames are single-target, so this is the budget's bug and not one
  // template's — rescaling condition-payoff's token alone took 130 to 65 and left it
  // over the line.
  //
  // print's ceiling is a MEASURED closed fact (SINGLE_TARGET_SAVE_CEILING, n recorded
  // per band), so the clamp never makes a row gentler than print's hardest; it only
  // stops us exceeding it. print's own payoffs sit lower still — Glabrezu/Pummel 15 of
  // 29 at CR 9 — so this is a ceiling, not a target.
  const per = capSingleTargetSave(Math.max(3, Math.round(scaled.per_hit ?? 6)), text, Number(ctx.cr));
  // A STEPPED ROW'S TWO AMOUNTS. print writes a base and a larger amount conditional on
  // the target's state in 11 rows — the Mimic's "7 (1d8 + 3)—or 12 (2d8 + 3) if the
  // target is Grappled", the Chimera's 11 or 18, the Blood Hawk's 4 or 6 — and the step
  // sits at 1.5-1.7x. `{avg_up}` is print's single-target ceiling and `{avg_base}` is
  // about 60% of it, so a stepped frame rewards the setup without the base ever being
  // the whole budget. Both are clamped by construction, so a stepped frame cannot
  // reintroduce the 65-at-CR-13 the cap exists to stop.
  const stepUpAvg = capSingleTargetSave(Math.max(3, Math.round(scaled.per_hit ?? 6)), text, Number(ctx.cr));
  const stepUp = saveDamageDiceFor(stepUpAvg);
  const stepBase = saveDamageDiceFor(Math.max(3, Math.round(stepUpAvg * 0.6)));
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

  let chosenArea = null; // the geometry this render resolved, declared on the row below
  const frameText = t.frames?.[bandFor(ctx.cr)] ?? '';
  const drains = DAMAGE_FROM_LIFE.has(t.id); // a DRAIN is never a weapon type (Plague Siphon dealt Piercing — the critic's fourth read)
  const onHitRider = EXTRA_ON_OWN_HIT.has(t.id); // an on-hit extra takes the HIT's type (Assassinate added Bludgeoning to spear hits)
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
  const engine = { ray_table: t.id === 'random-ray' ? composeRayTable(bandFor(ctx.cr)) : '', /* first: the composed table carries {dc} and damage slots the keys below fill */ dc: String(scaled.dc), atk: `+${scaled.atk}`, avg: String(full.avg), dice: full.dice, avg_half: String(half.avg), dice_half: half.dice, avg_x2: String(dbl.avg), dice_x2: dbl.dice, avg_base: String(stepBase.avg), dice_base: stepBase.dice, avg_up: String(stepUp.avg), dice_up: stepUp.dice, damage_type: dtype, melee_name: ctx.meleeName ?? 'Slam', ranged_name: ctx.rangedName ?? '' };
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
    boundBy = pick; // THE WRITER RECORDS WHAT IT WROTE — see the return below
  }
  if (/\{target\}/.test(frameOf(t, ctx.cr) ?? '')) {
    const allowed = (t.targets ?? []).filter((sh) => AREA_SHAPES.includes(sh) || t.target_sizes?.[sh]);
    const asked = String(fills.area_shape ?? '').trim();
    const pick = (t.gate && allowed.includes(asked)) ? asked : allowed[0];
    const clause = pick ? areaClause(pick, bandFor(ctx.cr), t.target_sizes ?? null) : null;
    if (!clause) return null; // a {target} frame with no declared shape cannot render
    engine.target = clause;
    // THE SHAPE RECORDS THE GEOMETRY IT CHOSE (owner, 2026-10-27). `areaDamage`
    // in author.mjs reads this field before it reads the sentence, so a row the
    // engine itself shaped is never re-derived from its own wording. A single
    // target ("one creature within 30 feet") is a shape too and declares false.
    // EVERY SHAPE `areaClause` CAN RENDER IS AN AREA (fixed 2026-11-01). This read
    // `AREA_SHAPES.includes(pick)`, which is `Object.keys(AREA_LADDER)` — Cone and
    // Line only — so a 30-foot EMANATION declared `area: false`. Emanation reaches
    // here through a template's own `target_sizes`, not the shared ladder. The
    // declaration was never carried to the row, so nothing read the false value;
    // carrying it without this fix would have made `areaDamage` answer "not an
    // area" for every Emanation row. All three `AREA_FORM` shapes say "each
    // creature in a …", so a rendered clause IS an area, and the geometry is
    // declared rather than left as a bare boolean.
    chosenArea = { shape: pick, size: areaSizeFor(pick, bandFor(ctx.cr), t.target_sizes ?? null) };
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
  // the clause comes off the frame here — after `stomping`, which WRITES one, and
  // after `obscuring`, which retypes the frame's own Poisoned rider
  const minor = splitMinorClause(text);
  let minorKeep = !!minor.clause;
  text = minor.body;
  // THE SAVE FOLLOWS THE CONDITION on a condition aura (critic fresh four: Stench
  // is Con on the toad and became Wis on the kilnblight — the stat drifted to the
  // caster's spell stat). Print: Poisoned/Deafened = Constitution, Frightened =
  // Wisdom, Prone = Strength. Engine-owned; the model's proposal is overruled.
  const modelSave = SAVE_STATS.includes(String(fills.save_stat)) ? String(fills.save_stat) : null; // the MODEL's pick, read before the engine's condition-save block below writes over it
  // the token may be the row's WHOLE point ("*Failure:* The target has the
  // {condition_minor} condition") rather than a rider clause — noxious-aura and
  // the gazes. Those were never strippable (the old `,? and the target has…`
  // pattern could not match them either), but this block still decides their
  // condition and their save, so it reads the token wherever it sits.
  const hasMinorToken = minor.hasToken || text.includes('{condition_minor}');
  if (text.includes('{save_stat}') && hasMinorToken) {
    const proposedC = String(fills.condition_minor ?? '').trim();
    // A PAYOFF NEVER IMPOSES WHAT IT REQUIRES, AND THE CLAUSE IS STRIPPED RATHER
    // THAN SWAPPED (owner's GM read, 2026-10-27: "strip the vestigial Prone
    // clause"). `condition-payoff` asks its target to already HAVE a condition
    // and then imposes a minor one, and nothing stopped both being the same: a
    // row shipped reading "one creature that has the Prone condition … and the
    // target has the Prone condition", which can never do anything. A2 then read
    // that dead `imposes: Prone` and paired it with print's Strength on a row
    // whose point was 84 Cold damage. Swapping in a DIFFERENT condition was the
    // first cut and it was worse — it put a Poisoned rider on a cold row. A
    // payoff's reward is its damage; the rider is optional, so where it would be
    // vestigial the clause leaves and the row says only what it does.
    const required = String(fills.consumed_condition ?? '').trim();
    const named = condPool.find((x) => x.toLowerCase() === proposedC.toLowerCase());
    const condPick = named ?? (condPool.includes(ctx.conditionMinor) ? ctx.conditionMinor : condPool[0] ?? 'Frightened');
    if (required && condPick.toLowerCase() === required.toLowerCase()) {
      // the clause is this engine's own frame text, removed by its own token
      // the whole clause, duration and all: these frames write it literally
      // ("until the end of its next turn"), so the removal must reach the stop
      minorKeep = false;
      vestigialStripped = required;
    } else if (framesDamage && !conditionEarnedByDamage(condPick, dtype)) {
      // FEAR DOES NOT COME FROM A BLOW. See FEAR_FROM: print pairs Frightened
      // with Psychic or Thunder damage and with nothing else, and most often
      // with no damage at all. Ours ran the other way — 62 of 101 Frightened
      // rows carried damage print never pairs it with (Fire 37, Bludgeoning 10,
      // Necrotic 8, Cold 3, Lightning 2, Slashing 2).
      //
      // THE CLAUSE LEAVES RATHER THAN BEING SWAPPED, for the reason recorded
      // just above — swapping put a Poisoned rider on a cold row — and for a
      // second reason measured here: Prone is print's pairing for almost every
      // damage type, so re-steering these rows would have turned 57 of them
      // Prone, manufacturing the very sameness this is meant to reduce.
      // Stripping is also what print does: a Fire row imposes nothing in 52 of
      // its 61 rows. The row keeps its damage and its save and says only what it
      // does.
      minorKeep = false;
      vestigialStripped = condPick;
    }
    // THE PICK IS KEPT (2026-10-20). This block already chooses the condition
    // from the closed MINOR list, validates the model's proposal against it, and
    // pairs print's own save stat — then discarded the choice, so every reader
    // downstream had to re-derive it from the prose. The condition and its save
    // are decided together here; the row should say so. With the clause stripped
    // there is no imposition, so the stat is left to the damage rule below.
    if (!vestigialStripped) {
      fills = { ...fills, condition_minor: condPick, save_stat: saveStatsFor({ imposes: condPick })[0] };
      pickedCondition = condPick;
    }
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
    const imposed = pickedCondition ?? imposedConditions({ text: eff.split('{minor_clause}').join(minorKeep ? minor.clause : '') })[0] ?? null; // the rider is a field now, so the save read is handed the sentence that WILL print
    const want = saveStatsFor({ imposes: imposed, damageDominant });
    const contradicts = picked && want.length > 0 && !want.includes(picked);
    const fallback = want[0] ?? null;
    if (picked && !contradicts) fills = { ...fills, save_stat: picked };
    else if (fallback) fills = { ...fills, save_stat: fallback };
    if (picked && contradicts) saveOverride = `"${picked}" -> ${fallback}: ${damageDominant && !SAVE_FOR_CONDITION[String(imposed ?? '')] ? 'a damage-dominant row saves by Dexterity or Constitution in print, never Wisdom' : damageDominant ? `the damage is the row and ${imposed} the rider, so print saves by ${want.join(' or ')}` : `a ${imposed} row saves by ${want.join(' or ')} in print`}`;
  }
  text = text.split('{minor_clause}').join(minorKeep ? minor.clause : ''); // the rider rides, or it does not — the VOCAB loop below fills its {condition_minor}
  for (const [k] of Object.entries(VOCAB)) {
    if (!text.includes(`{${k}}`)) continue;
    const list = poolFor(k); // the payoff's severe pool at CR 10+, VOCAB's own list otherwise
    const proposed = String(fills[k] ?? '').trim();
    const pick = list.find((x) => x.toLowerCase() === proposed.toLowerCase())
      ?? (k === 'condition_minor' && list.includes(ctx.conditionMinor) ? ctx.conditionMinor : null)
      ?? (k === 'condition_minor' ? list[0] : null) // the blind default follows the pool, not the mild list
      ?? ({ save_stat: 'Wisdom', consumed_condition: ctx.imposed?.[0] ?? 'Frightened', condition_minor: 'Frightened', r_vuln: 'Fire' })[k]; // `restraint` is gone from here with its VOCAB entry: it is an object slot, and its blind fill is "the binding"
    if (k === 'consumed_condition') consumedPick = pick; // the model's answer, recorded on the row so a ship-time gate can check the sheet supplies it
    text = text.split(`{${k}}`).join(pick);
  }
  for (const k of FLAVOR_SLOTS) {
    if (!text.includes(`{${k}}`)) continue;
    const v = shortFlavor(fills[k]) && !doublesFrameVerb(text, k, fills[k]) && fillKeepsFrame(k, fills[k]) && !fillIsSelf(fills[k], ctx) ? fills[k] : BLIND_FILLS[k];
    if (!shortFlavor(v)) return null;
    const w = PREDICATE_SLOTS.has(k) ? (asPredicate(v) ?? asPredicate(BLIND_FILLS[k])) : v.trim();
    if (!w) return null;
    text = text.split(`{${k}}`).join(w);
  }
  if (/\{[a-z_]+\}/.test(text)) return null;
  // THE ROW DECLARES THE DAMAGE IT DEALS (owner, 2026-10-27: "we want to retire
  // it with a declared damage type, we don't want to rely on regex where so many
  // edge cases have been proven to pop up").
  //
  // `dtype` is this function's own answer after every correction it makes — the
  // thrown weapon's type, Psychic for a mental shape, Poison for a spewed cloud,
  // Necrotic for a drain, the host hit's type for an on-hit rider. Nothing
  // downstream could reproduce that from the rendered sentence without redoing
  // all of it, so the reader that tried (a `/(\w+) damage/` scrape in the
  // checker's save-fit gate) was always going to meet an edge it had not seen.
  // Stamped here, once, by the site that decides it — the same move as `imposes`.
  // THE AUGMENTATION IS APPENDED LAST, so it never disturbs the frame's own
  // substitutions. The template declares which kinds it will take (`augments`),
  // the call names one, and the engine writes the sentence — enum membership for
  // the kind, and the kind's own slot for its fill. A kind the template does not
  // declare is ignored rather than refused: this is a bonus clause, and a row
  // without it is still the row.
  let augmented = null;
  if (Array.isArray(t.augments) && t.augments.length) {
    const want = String(fills.augmentation ?? '').trim();
    const kind = t.augments.includes(want) ? AUGMENTATIONS[want] : null;
    if (kind) {
      // A SLOTLESS KIND NEEDS NOTHING FILLED. Print's free boons are whole
      // sentences — "It can move through a space as narrow as 1 inch" — with no
      // variable in them, so there is nothing to validate and nothing to wait for.
      // That also means they do not depend on the header, which the shut-off does.
      const raw = kind.slot ? String(fills[kind.slot] ?? '').trim() : null;
      const ok = !kind.slot ? true
        : VOCAB[kind.slot]
          ? VOCAB[kind.slot].find((x) => x.toLowerCase() === raw.toLowerCase())
          : (shortFlavor(raw) && fillKeepsFrame(kind.slot, raw) && !fillIsSelf(raw, ctx) ? raw : null);
      if (ok) { text = `${text.trimEnd()} ${kind.writes(ok === true ? null : ok)}`; augmented = { kind: want, ...(ok === true ? {} : { fill: ok }) }; }
    }
  }
  // a frame that STATES its geometry declares it too — 13 templates do, against
  // 2 that take a {target} slot, which is why this field could never have covered
  // more than 2 of the 11 area rows on a forty
  if (chosenArea == null && t.frame_area?.[band]) chosenArea = t.frame_area[band];
  // THE ROW CARRIES THE CLAUSE IT RENDERED, so a later pass that must drop the
  // rider (print's own row carries print's rider and no other; fear unearned by
  // the damage) removes a segment THIS writer declared instead of pattern-matching
  // the finished sentence. Read back off the final text so every fill is in it.
  const minorClauseText = minorKeep ? splitMinorClause(text).clause : null;
  return { name: t.name, text, section: SECTION_OF[t.section], gate: t.gate, ...(minorClauseText ? { minorClause: minorClauseText } : {}), ...(augmented ? { augmented } : {}), ...(chosenArea != null ? { area: chosenArea } : {}), ...(boundBy ? { duration: boundBy } : {}), ...(dtype ? { damageType: dtype } : {}), ...(pickedCondition ? { imposes: pickedCondition } : {}), ...(consumedPick ? { consumes: consumedPick } : {}), ...(saveOverride ? { saveOverride } : {}) };
}

// SEAT DEFAULTS (critic run four): some seats OWE a trait by print — the 2024
// Assassin has Assassinate whatever else it does. When the trait seat misses
// on such a seat, the default renders blind; when it fits, the fit wins.
// a CLAIMED MECHANIC owes a trait the way a seat does (critic: both gaze concepts rendered no gaze — the action form floored; the trait form is free)
export const MECHANIC_OWED_TRAIT = { gaze: ['gaze-aura'] };
// WHAT A SEAT OWES BY PRINT — and `assassinate` never did (2026-10-27).
// Measured across every saved run: 331 of the ambush template's 366 shipped rows
// came from THIS table. When a skulker's or lurker's trait seat missed, the
// engine rendered it BLIND — `{ blind: true }`, no idea call, no fit call — so
// every lurker got the same trait whether or not the GM's words asked for an
// ambush. That is the engine choosing a mechanic, which is the one thing it may
// not do ([[the-call-judges-the-engine-validates]]).
//
// Its stated warrant was false. The comment here used to read "the 2024 Assassin
// carries Assassinate AND Evasion"; print was checked on 2026-10-27 and the
// 2024 Assassin carries Evasion, Multiattack, Shortsword, Light Crossbow and
// Cunning Action — no Assassinate. Evasion STAYS owed because print really does
// put it there; the ambush trait is removed from both seats.
//
// A seat that misses now ships nothing rather than a blind row. That is the
// intended trade: a thinner skulker sheet beats 331 identical ones. The idea and
// fit calls can still land the ambush shape whenever they want it — it is not
// gated on any body (see class-features-need-a-class.spec.js).
export const SEAT_DEFAULT_TRAIT = { phantom: [], skulker: ['evasion'], trap: ['false-appearance'], warden: ['interpose'], lurker: [] }; // a LIST: print's composition for the seat, not one row // keyed by style, else by family

// ---------------------------------------------------------------- the two calls

/** The verbs the concept itself names, across the whole catalog (not menu-limited) — the idea's brief. */
export function conceptVerbs(conceptText) {
  return [...new Set(rankByVerb(TEMPLATES, conceptText).flatMap((r) => r.concept))];
}

export function buildIdeaPrompt({ name, cr, concept, sheetLines, seats = null, energy = null, wantTrait = true, engines = [], verbs = [], owedClause = null, bodyRequirements = [], askedMechanic = null, openClauses = [] }) {
  // THE REGISTER, NOT THE LENGTH (owner, 2026-10-27: "tell deepseek this is for
  // dnd but also to use maximum creativity so then it'll be easier to match to
  // an existing template... encourage the llm to be creative, thematic,
  // evocative. really try to swing for the fences in terms of originality and
  // concept but yes be aware of gaming constraints").
  //
  // This paragraph used to ban "rules grammar" and "condition names in capitals"
  // outright. The call obeyed and returned narrative prose — and the FIT call
  // then had to match that prose against templates whose cells are declared in
  // exactly the banned terms (trigger, effect, the condition). Measured over 490
  // sheets: of 94 seats that never got a pick, 91% had a menu OFFERED and the fit
  // call refused every template on it, and the refused ideas ran a median of 50
  // words because prose invites two or three mechanics at once. One of them, with
  // ten templates on its menu, described wrenching a blade free AND hurling a
  // handaxe at a second enemy AND leaving the first unable to strike back. The
  // refusal was correct; the prose was what we asked for.
  //
  // The ban bundled two things that had to be separated. The NUMBERS stay banned
  // — the engine owns pricing and CR math, and an invented DC is a real defect
  // class. The VOCABULARY is now allowed, because it is the only vocabulary that
  // makes an idea matchable to a shape.
  //
  // Creativity is not traded away for matchability: the owner's reason for
  // leaving this call free stands ("I wanted the llm to be free from prejudice
  // when creating a signature ability"). The constraint is the IDIOM, never the
  // content. See plans/idea-register-not-length-2026-10-28.md for what to
  // measure afterwards and when to revert.
  return `You are inventing the SIGNATURE ability for a nearly-complete D&D 5e monster — the one ability this creature is remembered for. Everything below is already final.

SWING FOR THE FENCES. Be creative, thematic and evocative; reach for the striking image and the original idea, not the safe one. Your job is the IDEA a fan would riot to find missing — the thing a GM retells after the session.

BUT THINK LIKE A 5e DESIGNER WHILE YOU DO IT. This has to be something that could exist in a game and be run at a table. So say it the way the game says things: a saving throw, a condition the target gets (Frightened, Prone, Restrained, Poisoned, Blinded, Grappled), an area or an emanation, a reaction to something, a rider on its own attack, something that happens on its turn or when a creature comes close. ONE mechanic, the size of a single printed row on a stat block — not two or three joined together.

NO NUMBERS: no dice, no DCs, no distances in feet, no damage amounts, no uses per day. The engine owns every number and will pour your idea into a printed rules shape afterwards — your job is the mechanic and the fiction, in the game's own language.
THE SHEET SO FAR (${name}, CR ${cr}) — everything already on it, header and rows:
${sheetLines}
CONCEPT: ${concept}
${askedMechanic ? `WHAT THE GM ASKED A ROW TO DO: **${askedMechanic}**. An earlier call read this from the GM's own words, and the catalog has a shape that DOES it — so an idea serving this will be printed as that shape, and an idea that wanders will be fitted to whatever it happens to resemble instead. This is the ask; serve it in your own fiction.` : ''}
${owedClause ? `THE CLAUSE THIS ABILITY IS FOR — the sheet is a PRINTED creature plus what the GM added, and this is what they added. It is the whole reason this sheet is not just the printed monster, and nothing on it answers the clause yet. Invent the ability that makes THIS true of THIS creature; do not describe the creature in general: "${String(owedClause).replace(/"/g, "'")}"
` : ''}${openClauses.length ? `THE GM'S OWN ASKS THAT NOTHING ON THE SHEET ANSWERS YET — each idea you invent must ANSWER ONE OF THESE, and must say WHICH BY ITS NUMBER in its "clause" field:
${openClauses.map((c, i) => `${i + 1}. "${c.handed}"${c.mechanic ? ` — an earlier call read this as asking for: ${c.mechanic}` : ''}`).join('\n')}
This is the whole point of the ability. A row that is good in itself and answers none of these is the wrong row: the GM typed these words and is waiting to see them on the page. If two seats are asked for, give them DIFFERENT numbers where there are two to give. "clause" is REQUIRED on every idea: answer the number of the ask it serves, or 0 if it serves none of them.
` : ''}${verbs.length ? `THE CONCEPT'S OWN VERBS: ${verbs.join(', ')} — the signature is one of these verbs made mechanical; an idea that abandons them for something the concept never said (a teleport, a mist, a generic burst) is the wrong idea however clever. ` : ''}${seats ? `BUILD THIS: the action idea builds "${seats.action}"${wantTrait && !seats.packaged ? `; the trait idea makes "${seats.trait}" true on the sheet` : ''}. ` : ''}${engines.length ? `THE SHEET'S ENGINE IS ALREADY BUILT: ${engines.join(', ')} — the concept's holding, swallowing, or caging is DONE by those rows; do not describe it again in any wording. Build the concept's OTHER face. ` : ''}The rows above already OWN their fiction — never describe another version of one; the best ideas key off a condition a row applies, or set up a state the rows exploit.${energy ? ` This creature's energy is ${energy}.` : ''}
NOT A SIGNATURE (the wide run's biggest miss class, 12 of 48): a damage resistance or immunity, "blades only chip it", "can't be moved", "immune to its own fire", or a saving-throw bonus — those are the HEADER's to grant and the engine already derives them from type and energy. A trait idea must be a RULE that happens. In the published statblocks a trait is most often one of these — choose the one THIS concept actually implies, not the first listed: how it MOVES (through walls or earth, over water, up sheer faces, without provoking, where others cannot); what its PRESENCE does to the space around it each turn (an emanation of cold, stench, dread, light, or broken ground); what it SPENDS or RECOVERS (regeneration with a catch, a reserve it draws on, a change when Bloodied or when an ally falls); what it SENSES or how it HIDES (what it can always find, what it can pass for); how it gets STRONGER mid-fight (a condition on the target it exploits, allies beside it). What happens to whoever touches or hits it is the RAREST trait in the published statblocks — 3 of 324 — and belongs only to a body that is plainly corrosive, barbed, or adhesive; a bias toward it makes every monster the same monster. Tag each idea: "section" is action | bonus_action | reaction | rider (a clause on the creature's own attack: "when it hits, …")${wantTrait ? ' (the trait idea is always a trait)' : ''}; "trigger" is one of ${TRIGGERS.join(' | ')}; "effect" is one of ${EFFECTS.join(" | ")}; and "family" is the KIND of ability this is, one of:
${IDEA_FAMILIES.map((f) => `  ${f} — ${FAMILY_GLOSS[f]}`).join("\n")}
Pick the family that describes what you just invented, not what the creature is. An idea can be only one.
${bodyRequirements.length ? `IS IT TRUE OF THIS BODY? ("body_verdicts") The engine has abilities it can only give this creature if certain things are TRUE OF ITS BODY. For each one below, say whether it is.
${bodyRequirements.map((r) => `- ${r.id}: ${r.needs}`).join('\n')}
Judge the BODY, not the creature's temperament, job, mood or gear: a man with a crab's temperament is not a crab, a fierce bear is not sticky, and a poisoner is not made of metal. A thing the creature merely CARRIES or USES is not its body.
But the concept does not have to use the requirement's words — judge what the body plainly IS. A pit of tar is sticky without the word "sticky". A thing bound to a shrine HAS a ward. A creature shaped like a chest can pass for one. Say true when the body is plainly that thing even if the concept never names it.
Both mistakes cost something. A wrong TRUE puts a rule on the page a GM can see is nonsense \u2014 a bear that glues people to itself. A wrong FALSE takes away an ability the creature obviously should have \u2014 a mimic that isn't sticky. Weigh them evenly and answer on the body. "because" quotes the concept's OWN WORDS, and only for a true answer.
` : ''}Return ONLY JSON: {"action": {"idea": "<2-3 sentences in the game\'s own language: one mechanic, striking and specific>", "section": "<action|bonus_action|reaction>", "trigger": "<...>", "effect": "<...>", "family": "<...>"${openClauses.length ? `, "clause": <required: the NUMBER 1-${openClauses.length} of the ask this answers, or 0 for none>` : ''}}${wantTrait ? ', "trait": {"idea": "<1-2 sentences in the game\'s own language: a passive rule of its body or nature, and make it a memorable one. In the published statblocks about ONE trait IN A HUNDRED fires when the creature is hit (3 of 324). Nearly every published trait is always-on — how it senses, where it can walk, what its body is made of, how it fights, what it ignores — or it happens on its own turn. Do NOT reach for \"when something hits it, the attacker is hurt\" unless the concept is genuinely ABOUT the creature\'s surface (a body of fire, a hide of spines). A tracker, a climber, a thing that is hard to see, a thing that keeps coming: those are traits too>", "trigger": "<...>", "effect": "<...>", "family": "<...>"}' : ''}${bodyRequirements.length ? ', "body_verdicts": [{"id": "<id copied exactly>", "means": <true|false>, "because": "<the concept\'s own words, or \\"\\">"}]' : ''}}`;
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

export function parseIdeas(raw, openClauses = []) {
  const p = tryParse(raw);
  // THE CLAUSE IS VALIDATED BY MEMBERSHIP, NEVER BY WORD MATCH (R7 · ANCHOR,
  // 2026-11-02). The call is handed the GM's open asks and copies one back; the
  // engine checks the answer is one of the lines it handed over, exactly as it does
  // for `family`, `section` and every other enum. An answer that matches nothing —
  // or no answer at all — leaves `clause` null, which is today's behaviour, and the
  // caller traces it as unanchored. Nothing here reads the GM's prose.
  const norm = (o, forced) => {
    if (!o || typeof o.idea !== 'string' || o.idea.trim().length < 20) return null;
    const section0 = forced ?? (['action', 'bonus_action', 'reaction', 'rider'].includes(String(o.section).toLowerCase()) ? String(o.section).toLowerCase() : 'action');
    const trigger0 = TRIGGERS.includes(o.trigger) ? o.trigger : 'always';
    const { section, trigger } = normaliseTag(section0, trigger0);
    // THE FAMILY IS THE CALL'S ANSWER, from the closed list. The fallback is
    // structural, not a word rule: a trait that fires on being hit IS a body
    // reaction whatever it was tagged. Anything else with no valid family stays
    // null and no grammar is offered for it.
    const family = IDEA_FAMILIES.includes(String(o.family)) ? String(o.family)
      : (section === 'trait' && trigger === 'on_being_hit' ? 'body-reaction' : null);
    // THE ANSWER IS AN INDEX, NOT A STRING (forty #4). Asking the call to "copy that
    // line back exactly" produced two failures and both were the prompt's fault: 49
    // seats left the field out — the wording offered "or left out if it answers none",
    // which is an invitation a model takes when unsure — and 20 copied the WHOLE
    // rendered line, annotation included (`"drags fishermen under" — an earlier call
    // read this as asking for: grapple`), which the membership check then refused. A
    // number cannot carry an annotation and cannot be copied wrong, and validating it
    // is a bounds test with no string comparison anywhere: strictly tighter than what
    // it replaces. A string answer is still accepted for one release, so a run mid-
    // deploy does not lose its anchors.
    const rawAns = typeof o.clause === 'number' ? o.clause : String(o.clause ?? '').trim();
    const clauseRaw = String(rawAns).slice(0, 160);
    const asIndex = /^\d+$/.test(String(rawAns)) ? Number(rawAns) : null;
    const clause = asIndex !== null
      ? (asIndex >= 1 && asIndex <= openClauses.length ? openClauses[asIndex - 1] : null)
      : (openClauses.includes(clauseRaw) ? clauseRaw : null);
    return { idea: o.idea.trim().slice(0, 400), section, trigger, effect: EFFECTS.includes(o.effect) ? o.effect : 'damage', family, clause, ...(clause ? {} : { clauseRaw: clauseRaw || null }) };
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
    // A TEMPLATE THAT ACCEPTS AN AUGMENTATION HAS TO SAY SO IN THE MENU, or the
    // feature is inert — a shape added earlier this sprint shipped dead because one
    // registration never reached the prompt and only a verification probe caught it.
    const aug = Array.isArray(t.augments) && t.augments.length
      ? ` — may ALSO take ONE augmentation, or none: ${t.augments.map((k) => (AUGMENTATIONS[k].slot ? `"${k}" (then fill {${AUGMENTATIONS[k].slot}})` : `"${k}" (nothing to fill)`)).join(' or ')}`
      : '';
    // A TEMPLATE WITH A VARIABLE AREA SHAPE HAS TO SAY SO. The frame carries
    // `{target}` (an engine-filled clause, sized by band) while the choice the
    // model makes is `area_shape` — two names on purpose, so the model never sets
    // a distance. Without this line the menu advertised neither and the choice was
    // unreachable (2026-10-22).
    if ((t.targets ?? []).length > 1) vocab.push(`"area_shape" ∈ ${t.targets.join('/')} — the engine sizes it`);
    // same two-name split as area_shape: the frame carries {duration}, the choice
    // the model makes is "duration", so the menu has to name it or it is unreachable
    if (/\{duration\}/.test(frameOf(t, cr) ?? '') && t.effect === 'condition') vocab.push(`"duration" ∈ ${DURATIONS.join('/')} — how long the condition lasts`);
    // AND A PAYOFF'S ESCALATION, for the same reason, with the same two-name split: the
    // frame carries no token for it because the engine REWRITES the reward clause from
    // the shape, so the menu is the only place the choice can be offered. Added after
    // the shelf shipped unreachable — `escalation` was registered in VOCAB, but VOCAB is
    // read off the frame's own tokens, so the model was never asked and every row
    // degraded to the condition rung. The warning three comments up is about exactly
    // this failure, from an earlier shape this sprint; it happened again.
    if (t.rewardsCondition) vocab.push(`"escalation" ∈ ${escalationShapesFor(cr).join('/')} — what finding the target ALREADY afflicted adds: a worse condition (the engine picks the rung), 1 Exhaustion level, a bigger damage step, or marking it for Advantage. The engine writes every number and duration`);
    return `- ${t.id} [${SECTION_OF[t.section]}${t.gate ? `, ${t.gate}` : ''}]${ideaObj ? ` (fires: ${t.trigger}, does: ${t.effect}${stampAgrees(t, ideaObj) ? ' — matches the idea' : ''})` : (matched.length ? ` VERB MATCH: ${matched.join(', ')}` : '')}: ${frameOf(t, cr).replace(/\*/g, '')}${flav}${vocab.length ? ` — choose: ${vocab.join('; ')}` : ''}${aug}`;
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
WHO DOES THE CLAUSE'S THING, AND WHO DOES THE TEMPLATE'S? A refused template still ships as the nearest match, and the commonest way that goes wrong is that the nearest one turns the clause around — it acts on the CREATURE where the clause acts on its victims, or the reverse. Live examples, all three shipped: a ghost that "hoards coin" got a row making the GHOST flee carried coin, which cripples it because almost every party carries coin; a hag who "takes over the bodies of things she kills" got rejuvenation for HERSELF instead of raising the dead; a wight afraid of running water got a row that FRIGHTENS OTHERS. So on a refusal, answer "closest_subject" about the id you named in "closest": "same" when its effect lands on whoever the clause says it lands on, "flipped" when the clause's doer and the template's doer are opposite parties, and "" when the clause draws no such distinction. Judge the template's own rules text, not its name. A "flipped" nearest is not used at all, so answer honestly rather than helpfully — absence is better than a monster that turns its own trick on itself.

Return ONLY JSON: {"template": "<id from the list, or none>", "because": "<the words of the idea the template carries>", "asked": "<the user's own words asking for this, or \"\">", "expresses": "<one of the creature's own elements listed above, copied exactly, or \"\">", "declined_because": "<collision | already_answered | no_fit, or \"\" when you picked one>", "closest": "<on a refusal: the offered id that comes nearest, else \\"\\">", "missing": "<on a refusal: the mechanic none of them does, else \"\">", "missing_effect": "<on a refusal: damage | condition | movement | resource | defense, else \"\">", "closest_subject": "<on a refusal naming a closest: same | flipped, else \"\">", "name": "<2-3 words, Title Case the way the published statblocks write a row name: Dreadful Glare, Wing Attack, Cloud of Insects — every word capitalised except of/the/and/to/with>", "augmentation": "<only if the chosen template offered one above: the kind's id, and put its slot in \"fills\" — otherwise \"\">", "fills": {"<slot>": "<value>"}, "wrong": ["<ids whose word match does not mean its mechanic here>"]}`;
}

export function validateFitResponse(jsonString) {
  const p = tryParse(jsonString);
  return p != null && typeof p.template === 'string';
}

export function parseFit(raw, menu, creatureName = '', elements = []) { // a composed option is a MENU LINE now, resolved by id against the menu it was handed — no `compose` answer to validate
  const p = tryParse(raw) ?? {};
  const id = String(p.template ?? '').trim().toLowerCase();
  const t = id && id !== 'none' ? (menu.find((m) => m.id === id) ?? menu.find((m) => id.includes(m.id)) ?? null) : null;
  const nm = String(p.name ?? '').trim();
  return {
    template: t,
    because: String(p.because ?? '').trim().slice(0, 80),
    name: nm && !/^(?:none|n\/a|null|no fit|nothing)$/i.test(nm) && nm.split(/\s+/).length <= 3 && noDigits(nm) && !(creatureName && nm.toLowerCase().includes(creatureName.toLowerCase().split(/\s+/).pop())) ? nm : null, // "none" is the model saying no fit, never a row name (a row named "none" shipped on Meshrin — the critic's third species read, rerun)
    // THE AUGMENTATION RIDES IN `fills`, because that is what `bindFills` passes to
    // the renderer. It was advertised in the menu and absent from the response
    // schema, so the model had nowhere to put the answer and the feature was INERT
    // — a ten drew five augmentable traits and augmented none of them. The same
    // one-end-only mistake as the shape that shipped dead earlier this sprint.
    fills: { ...(p.fills && typeof p.fills === 'object' ? p.fills : {}), ...(typeof p.augmentation === 'string' && p.augmentation.trim() ? { augmentation: p.augmentation.trim() } : {}) },
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
    // THE FILLED FORM, validated the way every call answer here is: by exact
    // membership of a closed list. The call copies items; anything it invented,
    // any banned pair, a condition where none belongs (or Prone), or a form
    // filled alongside a real pick, all collapse to null and the engine falls
    // back to its existing closest/decoration path. A composed row is NOT
    // decoration — it carries the idea — so this is checked before that path.
    closest: String(p.closest ?? '').trim().slice(0, 40) || null,
    // WHOSE THING IT IS — the call's answer, validated against a closed pair and
    // nothing else (the critic's §3, homebrew40 2026-11-05). A nearest template that
    // acts on the creature where the clause acts on its victims ships a monster that
    // turns its own trick on itself; `generate.mjs` drops such a nearest and leaves the
    // seat empty, which is the owner's standing negation ruling. Anything but an exact
    // "flipped" reads as no answer and the nearest lands as it did before, so a model
    // that ignores the field costs nothing — and `closest_subject` is in the schema
    // line above as well, because a field advertised in the prompt and missing from
    // this return is the inert-feature bug recorded two comments up.
    closest_subject: ['same', 'flipped'].includes(String(p.closest_subject ?? '').trim().toLowerCase()) ? String(p.closest_subject).trim().toLowerCase() : null,
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
// A CAP IS PRINT'S CEILING, NOT PRINT'S AVERAGE (owner, 2026-10-27: novas back
// to ~1.0x of the round they replace).
//
// Measured over print's 69 gated damage rows, the MAXIMUM observed by CR:
// CR 2 → 22, CR 3 → 28, CR 5 → 31, CR 6 → 40, CR 7 → 49, CR 9 → 55, CR 11 → 66.
// The old low-CR arm (5.5 × CR) put CR 7 at 39 against print's 49 and CR 6 at 33
// against print's 40, so the cap was below what print actually ships and it cut
// into the row's own FLOOR (1.3 × the Multiattack EV, which is print's 0.95x in
// raw damage). Two bounds disagreeing, and the cruder one won: our gated rows
// came in at a median 0.60x of their round where print sits at 0.95x.
//
// 5.5 × CR + 8 is the tightest fit of the four tried: never more than 3 points
// under print's max (CR 2, 3, 7) and over it by >15% only at CR 4-5, where print's
// sample is two rows. The floor of 18 covers the wyrmling tier, whose breath is
// large for its CR. For contrast the old arm was under print's max at ALL ELEVEN
// low CRs — it could never allow a nova print actually ships. Above
// CR 11 the old arm stands — there it is already the generous side of print
// (ours 95 at CR 20 against print's 63), and the row's own ceiling governs.
//
// The checker's `nova-cap` gate reads this same constant, so the engine and its
// gate cannot drift apart on it.
// ABOVE CR 11 THE CAP IS PRINT'S OWN, NOT A LINE (R10 · H3, 2026-11-03). The old
// formula kept climbing — `4 * cr + 15` — while print PLATEAUS: its recharge-gated area
// rows measure, by CR, 66 at 11 · 55 at 13 · 54 at 14 · 56 at 15 · 60 at 16 · 66 at 17 ·
// 63 at 20, and only climb again at 21-24 (67 · 82 · 88 · 91). So the cap sat 12 to 32
// points over print's own maximum from CR 13 up, which is the critic's "recharge AoE is
// about +10 at CR 11-17" (Reefwrack 67@13, Glacier 71@15, Brass Tyrant 72@17).
//
// At or below CR 11 the old curve is within +1..+8 of print's maxima and is left alone:
// it is a ceiling on abuse, not a cut below the round (owner, 2026-10-27). Above it the
// ceiling is print's observed plateau, then print's own climb at the top of the ladder.
// Numbers only — nothing here reads a word.
export const NOVA_CAP = (cr) => {
  const n = Number(cr);
  if (!Number.isFinite(n)) return 18;
  if (n <= 11) return Math.round(Math.max(18, 5.5 * n + 8));
  if (n <= 20) return 66;   // print's maximum anywhere in CR 12-20
  if (n <= 22) return 82;   // print: 67 at 21, 82 at 22
  return 91;                // print: 88 at 23, 91 at 24
};
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
  // A DEFENSIVE OR UTILITY FREE ROW IS NOT PRICED BY DAMAGE (owner's ruling, 2026-11-05:
  // "We need to price those defensive and utility rows differently").
  //
  // The 0.25 floor existed so a free row still had to DO something, and it measured that
  // in damage — so three rows that do exactly what they promise scored EV 0 and were
  // dropped in all 20 contexts of the 2026-11-05 audit: `interpose` (a reaction that
  // shields an ally), `patient-defense` (the SRD Monk feature) and `self-invisibility`.
  // Print ships rows of this shape; pricing them by offense asks a Dodge to deal damage.
  //
  // The split is DECLARED, not read off the text: a free row whose template declares
  // `effect: damage` keeps the damage floor, because a row promising damage and
  // delivering none is the defect the floor was built for (`riposte`, `snap-shot`,
  // `ward-retaliation`, `own-turn-punisher` all declare damage and all clear it). A free
  // row declaring `defense`, `resource` or `movement` does something by declaration, so
  // the floor stands down and only the CEILING governs it — a free row still may not be
  // worth more than an attack.
  const freeDecl = bonus && template ? BY_ID.get(String(template)) : null; // BY_ID is this module's own map; TEMPLATE_BY_ID is only its export alias and is not a binding in here
  const freeUtility = !!freeDecl && freeDecl.effect !== 'damage';
  // A GATED ROW WHOSE WHOLE POINT IS THE CONDITION PRICES AS AN ATTACK, NOT A ROUND
  // (owner's ruling, 2026-11-07). The gated floor asks 1.3x the whole Multiattack, and a
  // qualifying condition credits `P_FAIL * perHit` — ONE attack — so a control row with
  // no damage could never clear its floor by arithmetic, however good the condition.
  //
  // Print ships exactly that row: of its 81 gated action rows, 10 (12%) impose a
  // condition and deal NO damage, and they are iconic — the Gorgon's Petrifying Breath,
  // the Doppelganger's Unsettling Visage, the Dust Mephit's Blinding Breath, the
  // Ettercap's Web Strand, the Aboleth's Dominate Mind, the Dretch's Fetid Cloud. Ours
  // were dropped and a fallback stood in: `pacify` (Incapacitated) read EV 18 and
  // `terror-pulse` (Frightened) EV 18, both against a floor of 54 at CR 9.
  //
  // The gate IS the price of such a row — print pays for it in frequency, not damage —
  // so a gated row that declares a condition is held to one attack's worth rather than
  // the round's. The CEILING is untouched: it may still grow to nova size if it also
  // deals damage, which is the other 80% of print's gated rows.
  //
  // Read off DECLARED data, never the text: `row.imposes` is the condition the row says
  // it applies, and the condition in a TARGETING frame ("one creature that is Grappled")
  // is a prerequisite rather than a payload — the mistake `rowValue` records above.
  const gatedControl = gated && !!row.imposes;
  const floor = freeUtility ? 0
    : bonus ? 0.25 * attackEV
      : gated ? (gatedControl ? 0.8 * attackEV : 1.3 * maEV)
        : (payoff ? 2.0 : 0.8) * replaced; // a free row still has to DO something; a payoff doubles (Assassinate)
  const ceiling = bonus ? 1.5 * attackEV : gated ? 2.5 * maEV : (payoff ? 3.0 : 1.5) * (replaced || attackEV);
  // `let`, not `const`: the widening rung below can turn a single-target control
  // row into an area one, and the EV closure reads this.
  let area = /each creature/i.test(row.text);
  // an AREA nova earns its premium by TARGETS (the Adult Red's breath deals about
  // its Multiattack's damage to each creature in the cone) — its per-target
  // budget is the round's damage; a single-target nova takes 2x the round's EV
  // AN AREA NOVA PRICES AT ITS OWN FLOOR, NOT BELOW IT (owner, 2026-10-27).
  // This arm was `ma.attacks * perHit` — one round's EV — while the floor three
  // lines up declares 1.3x for a gated row, so an area nova was priced BELOW the
  // minimum the same function calls acceptable, and `min(budget0, …)` then made
  // that the ceiling. Measured against print in RAW damage, which is what a GM
  // reads: print's gated rows sit at a median 0.95x of the round they replace,
  // and 1.0x of the EV round renders as ~0.72x raw (the storm drake: 39 against a
  // 54 round). 1.3x EV is print's 0.95x raw — the floor was right all along and
  // only this arm disagreed with it.
  const budget0 = gated ? (area ? Math.max(perHit, Math.round(floor)) : Math.max(perHit, Math.round(2 * maEV))) : perHit;
  // NOVA_CAP IS A CEILING ON ABUSE, NOT A CUT BELOW THE ROUND (owner, 2026-10-27:
  // "make sure our novas go back up to .95x or really 1 to 1").
  //
  // `budget0` two lines up already encodes print's design — an area nova's
  // per-target budget IS the round's damage — but the CR-keyed cap then clamped
  // it down, and the cap is miscalibrated below CR 12. Measured: print's gated
  // rows sit at a MEDIAN 0.95x of the Multiattack round they replace (55 rows,
  // half of them weaker than the round); ours sat at 0.60x, and our wind-up
  // novas at 0.60x median. NOVA_CAP(5) is 28 where print's CR-5 median is 28 and
  // a CR-5 round is ~34, so the cap cut a third of the punch off the row a GM
  // spends a whole turn setting up ("I'd rather do the multiattack" — the Knife
  // Ball, the owner's spot check).
  //
  // The cap still binds against runaway dice; it just cannot price a nova below
  // the round it replaces. Print's own ceiling is honoured above CR 12, where
  // NOVA_CAP is the GENEROUS side of print (ours 95 at CR 20 against print's 63).
  const budget = gated && cr != null ? Math.min(budget0, Math.max(perHit, NOVA_CAP(cr))) : budget0;
  let text = row.text; let name = row.name; const steps = [];
  // MASS effects are priced by targets whether gated or not (the hermit's each-
  // creature lure read 11.6 as one target and should have gated, critic 2026-09-22)
  // a RECURRING tick ("at the start of each of its turns until it uses its action")
  // is worth about two turns and its die is print's small one (Fire Form 1d10 beside
  // a 10-point hit) — the thorn-wall's brand climbed to 6d6 a turn priced as one hit
  // (critic, new lines 2026-09-28)
  const recurring = /at the start of each of its turns until/i.test(text);
  // THE TARGET DISCOUNT IS FOR AN AT-WILL AREA ROW, NOT FOR A NOVA (owner,
  // 2026-10-27, on the Knife Ball for the third time: "still has the double
  // gated blade burst" … "Recharge novas should be a little frightening").
  //
  // Measured over print, area damage rows as a ratio of the round they sit beside:
  //   GATED (novas):   n=52, median 1.00x  — the FULL round, to each target
  //   AT-WILL (auras): n=23, median 0.17x  — a sixth of it
  //
  // So `AREA_TARGETS` is right for an aura and wrong for a nova, and applying it
  // to both is what kept our gated rows small: the Knife Ball's wind-up read
  // EV 34.1 against a floor of 30.4 and so was judged "worth the trade" while
  // dealing 22 raw against a 34 round. The EV cleared the floor ONLY because the
  // 22 was multiplied by two targets. Refitting NOVA_CAP earlier did nothing here
  // because the cap was never the binding constraint — this was.
  //
  // A nova is now valued at what it does to ONE target, which is how print prices
  // it and how a GM reads it. NOVA_CAP and the 2.5x ceiling still bound it.
  const value = (t) => { const r = rowValue(t, perHit, { area }); const mult = (area && !gated ? AREA_TARGETS : 1) * (recurring ? 2 : 1); return mult === 1 ? r : { ...r, ev: r.ev * mult }; };
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
  // WIDEN RATHER THAN DROP (owner, 2026-10-28: "I don't particularly like seeing
  // dead rows though so maybe we try to up the severity of abilities that get
  // dropped for being too soft").
  //
  // Every rung above this one adjusts DICE, so a control row with no damage has
  // nothing to climb and falls off the ladder — the trace even names what it
  // needs ("needs a condition from the worth-an-attack list") and then drops it.
  // Measured over the homebrew forty: the floor is the single biggest killer of
  // picks the call had already accepted, 9 of 19, and the rows are all the same
  // shape — push-prone x3, obstacle-pull x2, sensory-strike, slow-bolt — single
  // target, no damage, a minor effect, failing by a hair (Barrow Shove EV 1.9
  // against a floor of 7.3).
  //
  // WIDENING IS PRINT'S OWN ANSWER for this exact row. Print's no-damage
  // minor-condition actions are mostly areas: Repulsion Breath (30-foot Cone,
  // pushed + Prone — push-prone's twin), Blinding Breath (15-foot Cone, Blinded
  // — sensory-strike's twin), Fetid Cloud, Cacophony. And the sizes are FLAT, not
  // laddered: Repulsion Breath is a 30-foot Cone at CR 2 and at CR 22 alike, so
  // this takes print's low end (15 feet, the Dust Mephit at CR 1/2) below CR 5
  // and its common one (30) above.
  //
  // The scoring already rewards it — `area && MINOR_EFFECT` earns the same credit
  // as a hard condition — so no pricing rule changes; the row simply stops being
  // mispriced as a single-target effect print would never write at this cost.
  // Print keeps "The target" singular in the failure clause, so only the target
  // clause is rewritten. A row that DEALS damage is untouched (the dice rungs own
  // it, and that is what excludes delayed-brand's branded tick).
  if (v.ev < floor && !priced && !v.hasDamage && !area && !bonus && !gated && section !== 'Traits' && MINOR_EFFECT.test(text)) {
    const span = cr != null && cr >= 5 ? 30 : 15;
    const was = text;
    // NO "originating from" ON A CONE. Print writes "each creature in a 30-foot
    // Cone." and nothing more — 55 cones in the corpus, NONE carry the clause,
    // while 33 of its 34 Emanations do. It also fixed a defect the focused ten
    // caught: `valueCheck` runs AFTER the inline rename, so the self-reference in
    // the inserted text never became the creature's name and the row read "a
    // 30-foot Cone originating from the creature … pushed away from the guardian".
    text = text.replace(/one creature(?: that the creature can see| the creature can see)? within \d+ feet/i, `each creature in a ${span}-foot Cone`);
    if (text !== was) {
      area = true; v = value(text);
      steps.push(`widened to a ${span}-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath)`);
    }
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
  // THE LADDER RECORDS WHEN IT CHANGED THE MECHANIC (N4, 2026-11-02). Widening a
  // single-target row to a Cone is a print-shaped repair of its value, but it makes
  // the row no longer do what its template does — and the one-mechanic-one-name
  // rename then handed it the template's name anyway. "Sundering Shove" shipped as
  // a 30-foot Cone on the Scaffold Ram and as "one creature within 5 feet" on the
  // Stone Golem: one name, two rules, which is worse for a GM than two names.
  // Declared here, at the site that did it, so the rename can read a field.
  return { text, name, ev: Math.round(v.ev * 10) / 10, floor: Math.round(floor * 10) / 10, replaced: label, steps, gate: gateChosen, ...(area && /each creature in a \d+-foot/.test(text) && !/each creature in a \d+-foot/.test(row.text ?? '') ? { widened: true } : {}) };
}
