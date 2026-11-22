/**
 * A RIBBON, AND WHAT DISQUALIFIES ONE.
 *
 * A ribbon is a trait with no price in a fight. It senses something, sheds light, moves or speaks
 * strangely, has a taboo. The owner wants one on most sheets, outside the free-row budget, with the
 * engine picking the family and the model filling the theme.
 *
 * THIS IS NOT A MEANING TABLE. The standing order forbids word lists that decide what the GM meant
 * — class, archetype, mechanic, polarity, trigger. This file decides nothing of the kind. It
 * validates an answer the model already wrote against the rules' OWN closed vocabulary: the
 * fourteen conditions, the thirteen damage types, and the phrases "saving throw", "Attack Roll",
 * "Armor Class", "Advantage" and "Disadvantage". Those are closed facts, like the weapon table and
 * print's names. A sentence either uses them or it does not, and no judgement sits in between.
 *
 * THE RULES, from the handoff of 2026-11-21: no damage, no saving throw, no condition, no bonus to
 * an attack, to Armor Class or to a save, and no Advantage or Disadvantage on an attack roll or a
 * saving throw. On an ABILITY CHECK print allows both — the Sphinx's Inscrutable gives Disadvantage
 * on Insight checks — so a check is the one place those two words may stand.
 *
 * WHAT IS DELIBERATELY NOT CHECKED: length. The ask says one or two sentences, and print's own row
 * for the eighth family breaks it — Troll Spawn is four. Length is the prompt's business; a
 * validator that refused it would refuse print.
 *
 * EVERY REFUSAL IS CONSERVATIVE. Where the sentence cannot be read with certainty — "Advantage"
 * with neither an attack roll nor a check beside it — it is refused. The probe prints every refusal
 * with its reason so the owner can say which were wrong; an over-refusal is visible, a miss is not.
 */

/**
 * THE SIX FAMILIES. Two of the eight went after the owner read the eighty: HIDING, because it was a
 * second Stealth with a number the model invented, and BOUND, which folded into the taboo family as
 * a TETHER — "1) distance 2) consequence to that creature if they go over that distance".
 *
 * `mustHold` is what the owner's ruling requires of a ribbon in that family. `checks` names the
 * part of it this file can actually decide; the rest is the ask's business and the owner's read, and
 * saying which is which here is the point of the field.
 */
export const RIBBON_FAMILIES = [
  { key: 'senses', label: 'Senses a thing',
    print: 'Rust Monster, Iron Scent: The rust monster can pinpoint the location of ferrous metal within 30 feet of itself.',
    mustHold: 'What it pinpoints, and a range.',
    checks: 'a range, and that the range is one of the four distances' },
  { key: 'speaks', label: 'Speaks strangely',
    print: 'Green Hag, Mimicry: The hag can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.',
    mustHold: 'A check to understand it or to tell it from the real thing, or a limit on what it can say.',
    checks: 'that a check or a limit is there' },
  { key: 'taboo', label: 'Has a taboo, a need, or a tether',
    print: 'Sahuagin, Limited Amphibiousness: The sahuagin can breathe air and water, but it must be submerged at least once every 4 hours to avoid suffocating outside water.',
    mustHold: 'Something it cannot do, must do, or will not do. A tether has a distance and says what the creature does at the end of it.',
    checks: 'that a restriction is there, and that a tether carries both its distance and its consequence' },
  { key: 'leaves-at-death', label: 'Leaves something when it dies',
    print: "Troll Limb, Troll Spawn: The limb uncannily has the same senses as a whole troll. If the limb isn't destroyed within 24 hours, roll 1d12. On a 12, the limb turns into a Troll. Otherwise, the limb withers away.",
    mustHold: 'An object, what it does, and when that ends. What it does is one of four: it sheds light, it gives the direction of something, it tells a fact to whoever makes an ability check, or it makes a sound.',
    checks: 'that it does one of the four things, and that it ends' },
  { key: 'moves', label: 'Moves strangely',
    print: "Earth Elemental, Earth Glide: The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn't disturb the material it moves through.",
    mustHold: 'A movement it can make that others cannot, over a named surface or through a named thing.',
    checks: 'that a movement is actually granted' },
  { key: 'sheds', label: 'Sheds or leaves a trail',
    print: 'Azer, Illumination: The azer sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.',
    mustHold: 'A light with its radius, or a trail and how it is followed.',
    checks: 'that a radius or a check is there',
    largeOrLarger: true },
];

/** Every family but `sheds`, which the owner keeps for a Large creature or larger. */
export const familyKeys = () => RIBBON_FAMILIES.map((f) => f.key);
export const familyByKey = (key) => RIBBON_FAMILIES.find((f) => f.key === key) ?? null;

/**
 * THE ENGINE'S NUMBERS. Whatever the model writes after "DC" is replaced by these, so a ribbon's
 * difficulty is the engine's and not a number the model liked the sound of. Twenty-two of the
 * eighty carried a DC the model chose, from 10 to 20. Three numbers in one place, to be changed.
 */
export const RIBBON_DC_BY_CR = [{ throughCr: 4, dc: 10 }, { throughCr: 12, dc: 13 }, { throughCr: Infinity, dc: 15 }];
export const ribbonDcFor = (cr) => (RIBBON_DC_BY_CR.find((b) => Number(cr) <= b.throughCr) ?? RIBBON_DC_BY_CR.at(-1)).dc;
/** Replace every DC the model wrote with the engine's. Applied after the validator passes. */
export const applyRibbonDc = (text, cr) => String(text ?? '').replace(/\bDC\s*\d+/g, `DC ${ribbonDcFor(cr)}`);

/**
 * A DISTANCE IS ONE OF FOUR, and a tether may also be 100 feet. Lengths of time are free, so
 * "for 1 hour" and "1d20 days" are not distances and are not read here. Print predates this rule —
 * the Azer's 10-foot Illumination would be refused by it — because these are the numbers the engine
 * will write from now on, not a description of what print does.
 */
export const RIBBON_FEET = [30, 60, 120];
export const TETHER_FEET = 100;
const distancesIn = (text) => {
  const out = [];
  for (const m of String(text).matchAll(/(\d+)\s*(?:-|\s)\s*(?:foot|feet|ft\.?)\b/gi)) out.push({ feet: Number(m[1]), said: m[0] });
  for (const m of String(text).matchAll(/\b(\d+|an?)\s+miles?\b/gi)) {
    const n = /^an?$/i.test(m[1]) ? 1 : Number(m[1]);
    out.push({ miles: n, said: m[0] });
  }
  return out;
};

/** The rules' own closed lists. Not extensible by a fix — these are the printed rules. */
const CONDITIONS = ['Blinded', 'Charmed', 'Deafened', 'Exhaustion', 'Frightened', 'Grappled',
  'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained',
  'Stunned', 'Unconscious'];
const DAMAGE_TYPES = ['Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic',
  'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];

const DICE = /\b\d+d\d+\b/;
const sentencesOf = (text) => String(text ?? '').split(/(?<=[.!?])\s+/).filter((s) => s.trim());

/**
 * A condition NAMED is not a condition IMPOSED. Print's Pack Tactics turns on whether an ally
 * "doesn't have the Incapacitated condition", and the Azer's Fire Aura stops "unless the azer has
 * the Incapacitated condition" — both only READ a condition another rule set. A ribbon may do the
 * same. So a condition refuses only where nothing before it negates or conditions the having.
 *
 * This reads the sentence's own grammar around a closed rules term; it does not guess at meaning.
 *
 * KNOWN GAP, left as it is on purpose. The phrasings below are print's. A reference print never
 * writes — "while no ally has the Incapacitated condition" — reads as an imposition and is refused.
 * That is the conservative side, and widening this needs the owner's word, not a fix.
 */
const REFERENCE_BEFORE = /(?:does ?n[o']?t have|is ?n[o']?t|are ?n[o']?t|has ?n[o']?t|without|unless|lacks|other than|except)\b[^.]{0,40}$/i;
const imposesCondition = (text, condition) => {
  // Case-sensitive, because print's convention IS the signal: the rules term is capitalized
  // ("has the Frightened condition"), and the lowercase word is an ordinary adjective. Probe A
  // found this the hard way — "its blinded eye collapses into a red crystal" was refused for the
  // Blinded condition when the GM had typed "blind in one eye" and no creature gained anything.
  const re = new RegExp(`\\b${condition}\\b`, 'g');
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (!REFERENCE_BEFORE.test(text.slice(0, m.index))) return true;
  }
  return false;
};

/**
 * The reason this sentence is not a ribbon, or null when it is one.
 * One reason, the first that applies, in the order the rules name them.
 */
export function ribbonRefusal(text) {
  const s = String(text ?? '').trim();
  if (!s) return 'it is empty';

  // An attack row is not a trait at all.
  if (/\b(?:Melee|Ranged)\s+Attack\s+Roll\b|\bAttack\s+Roll\s*:/i.test(s)) return 'it is an attack';

  // Damage. The word alone is flavour ("the damage of a hundred years"); the word in a rules
  // context is a price. A damage type, a dice expression or "takes" beside it makes it one.
  if (/\bdamage\b/i.test(s)
    && (DICE.test(s) || /\btakes?\b/i.test(s)
      || new RegExp(`\\b(?:${DAMAGE_TYPES.join('|')})\\b`).test(s))) return 'it does damage';

  if (/\bsaving throw\b/i.test(s)) return 'it calls for a saving throw';

  const imposed = CONDITIONS.find((c) => imposesCondition(s, c));
  if (imposed) return `it imposes the ${imposed} condition`;

  if (/\bArmor Class\b|\bAC\b/.test(s)) return 'it touches Armor Class';
  if (/\+\s?\d+\s+(?:to|on)\b|[+−-]\s?\d+\s+(?:to hit|bonus)|\bbonus to\b/i.test(s)) return 'it gives a bonus';

  // Advantage and Disadvantage. Allowed on an ability check, nowhere else. Read per sentence, so a
  // ribbon may mention a check in one sentence and something else in the next.
  for (const one of sentencesOf(s)) {
    if (!/\b(?:Advantage|Disadvantage)\b/i.test(one)) continue;
    if (/\battack rolls?\b/i.test(one)) return 'it gives Advantage or Disadvantage on an attack roll';
    if (/\bsaving throws?\b|\bsaves?\b/i.test(one)) return 'it gives Advantage or Disadvantage on a saving throw';
    if (!/\bchecks?\b/i.test(one)) return 'it gives Advantage or Disadvantage and does not say on what';
  }

  return null;
}

/** True when the sentence is a ribbon. */
export const isRibbon = (text) => ribbonRefusal(text) === null;

/* ───────────────────────── THE FAMILY RULES ─────────────────────────
 *
 * `ribbonRefusal` above says whether a sentence is a ribbon AT ALL — no damage, no save, no
 * condition, no bonus, no Advantage off an ability check. These say whether it holds what its
 * family must hold.
 *
 * WHERE THIS READS VOCABULARY, AND WHY. Everything here is structure — a number in a closed set, a
 * name's word count, whether a check or a restriction is present — except two places, both
 * declared:
 *
 *   - `moves` must grant a movement, and "grants no movement" is a refusal that cannot be read off
 *     grammar alone. Vashka "moves in the exact cadence of a marching shield wall" and grants
 *     nothing; the Mire Huldra "can cross quicksand or standing fen water without sinking" and
 *     grants something. The difference is a permission applied to a movement the RULES define, so
 *     the list below is the rules' movement vocabulary and nothing else.
 *   - `leaves-at-death` must do one of four things, and the four are the owner's own list, quoted
 *     in the ruling. Enumerating them is implementing the spec, not guessing at meaning.
 *
 * What a ribbon is ABOUT is never decided here. Whether the thing it pinpoints is worth
 * pinpointing, whether a trail suits the creature, whether a taboo is interesting — those are the
 * ask's business and the owner's read, and `checks` on each family says so in the open.
 */

/** Rule 1. The name is two or three words; the sentence is 40 words at most. */
export const MAX_RIBBON_WORDS = 40;
export const wordsIn = (text) => String(text ?? '').trim().split(/\s+/).filter(Boolean).length;

/** A check: the engine will rewrite the number, but one has to be there to rewrite. */
const hasCheck = (t) => /\bDC\s*\d+[^.]{0,60}?\bchecks?\b/i.test(t) || /\bability check\b/i.test(t);

/**
 * A restriction — something it cannot do, must do, or will not do. Grammar, not vocabulary: these
 * are the forms English has for refusing and requiring.
 */
const hasRestriction = (t) => /\b(?:can(?:not|'t)|could not|couldn't|may not|must|will not|won't|never|only|unable to|no longer|refuses? to|forbidden)\b/i.test(t);

/** The rules' movement vocabulary, under a permission. See the note above. */
const RULES_MOVEMENTS = 'move|moves|cross|crosses|crossing|walk|walks|climb|climbs|swim|swims|fly|flies|burrow|burrows|glide|glides|squeeze|squeezes|pass|passes|step|steps|tread|treads';
const grantsMovement = (t) => new RegExp(`\\b(?:can|may|is able to|are able to)\\b[^.]{0,48}?\\b(?:${RULES_MOVEMENTS})\\b`, 'i').test(t)
  || /\b(?:ignores?|is unaffected by|need not|needn't)\b[^.]{0,48}?\b(?:difficult terrain|movement restrictions?|movement costs?|webs?)\b/i.test(t);

/** Rule 6's four things, which are the owner's list. */
const LEAVES_DOES = [
  ['it sheds light', /\b(?:sheds?|gives? off|casts?|glows?|glimmers?|shines?)\b[^.]{0,30}\blight\b|\b(?:bright|dim)\s+light\b/i],
  ['it gives the direction of something', /\bdirection\b|\bpoints? (?:toward|towards|to)\b/i],
  ['it tells a fact to whoever makes an ability check', /\bDC\s*\d+[^.]{0,60}?\bchecks?\b|\bability check\b/i],
  ['it makes a sound', /\b(?:hums?|rumbl\w+|rings?|chimes?|tolls?|sings?|whispers?|moans?|sounds?|audible|hisses?|crackl\w+)\b/i],
];
/** Rule 6 also: it ends after a stated time, or works once. */
const endsOrIsOnce = (t) => /\bfor\s+(?:\d+|\dd\d+|a|an|one)\s+\w*\s*(?:round|rounds|minute|minutes|hour|hours|day|days|week|weeks|year|years)\b/i.test(t)
  || /\b(?:until|after)\b[^.]{0,60}\b(?:dawn|dusk|sunrise|sunset|long rest|short rest)\b/i.test(t)
  || /\bonce\b|\bthen (?:crumbles|withers|fades|melts|goes (?:cold|dark|silent))\b|\b(?:crumbles|withers|fades|melts|dissolves)\b/i.test(t);

/**
 * Every reason this sentence does not work as a ribbon of this family, base rules first.
 * An empty array means it stands. The first entry is what the re-ask is given.
 */
export function ribbonFaults(sentence, { family, name } = {}) {
  const t = String(sentence ?? '').trim();
  const out = [];

  const base = ribbonRefusal(t);
  if (base) out.push(base);

  const fam = familyByKey(family);
  if (!fam) {
    out.push(family ? `"${family}" is not one of the six families` : 'it names no family');
    return out;
  }

  // THE FAMILY'S OWN FAULT COMES FIRST. `ribbonFamilyRefusal` hands the first reason to the re-ask,
  // and "it grants no movement" tells the model something it can act on; "it is 45 words" sends it
  // back to shorten a sentence that was never the right shape. Vashka's cadence is both.
  const shape = [];

  // Rule 1.
  if (name !== undefined) {
    const n = wordsIn(name);
    if (n < 2 || n > 3) shape.push(`its name is ${n} word${n === 1 ? '' : 's'}, and a ribbon's name is two or three`);
  }
  const words = wordsIn(t);
  if (words > MAX_RIBBON_WORDS) shape.push(`it is ${words} words, and a ribbon is ${MAX_RIBBON_WORDS} at most`);

  // Rule 4. A tether may also be 100 feet; nothing else may.
  const allowedFeet = fam.key === 'taboo' ? [...RIBBON_FEET, TETHER_FEET] : RIBBON_FEET;
  for (const d of distancesIn(t)) {
    if (d.miles !== undefined) {
      if (d.miles !== 1) shape.push(`"${d.said}" is not one of the distances a ribbon may use (30 feet, 60 feet, 120 feet, 1 mile)`);
    } else if (!allowedFeet.includes(d.feet)) {
      shape.push(`"${d.said}" is not one of the distances a ribbon may use (${allowedFeet.map((f) => `${f} feet`).join(', ')}, 1 mile)`);
    }
  }

  switch (fam.key) {
    case 'senses':
      if (!distancesIn(t).length) out.push('it names no range, and a ribbon that senses says how far');
      break;
    case 'speaks':
      if (!hasCheck(t) && !hasRestriction(t)) {
        out.push('it carries neither a check to understand it nor a limit on what it can say');
      }
      break;
    case 'taboo': {
      if (!hasRestriction(t)) {
        out.push('it names nothing the creature cannot do, must do, or will not do — and no tether, '
          + 'which is a distance it cannot pass and what it does at the end of one');
        break;
      }
      // A tether is the one shape in this family that owes two things. It is recognised by what it
      // restricts — going, travelling, leaving — not by a word for "tether".
      const readsAsTether = /\b(?:travel|travels|travelling|traveling|go|goes|move|moves|stray|strays|leave|leaves|wander|wanders|venture|ventures)\b[^.]{0,40}\b(?:more than|farther|further|beyond|away from|from)\b/i.test(t)
        || /\b(?:more than|farther than|further than|beyond)\b[^.]{0,20}\b\d+\s*(?:-|\s)\s*(?:foot|feet|ft\.?)\b/i.test(t);
      if (readsAsTether && !distancesIn(t).length) {
        out.push('it reads as a tether but names no distance it cannot pass');
      }
      break;
    }
    case 'leaves-at-death': {
      const did = LEAVES_DOES.filter(([, re]) => re.test(t)).map(([what]) => what);
      if (!did.length) {
        out.push('what it leaves does none of the four things: sheds light, gives the direction of '
          + 'something, tells a fact to whoever makes an ability check, or makes a sound');
      }
      if (!endsOrIsOnce(t)) out.push('it never says when what it leaves ends, and it does not work only once');
      break;
    }
    case 'moves':
      if (!grantsMovement(t)) out.push('it grants no movement the creature could not otherwise make');
      break;
    case 'sheds':
      if (!distancesIn(t).length && !hasCheck(t)) {
        out.push('it gives neither a radius for its light nor a check for following its trail');
      }
      break;
  }
  out.push(...shape);
  return out;
}

/** The first reason, or null. What the re-ask is told. */
export const ribbonFamilyRefusal = (sentence, opts) => ribbonFaults(sentence, opts)[0] ?? null;

/**
 * Similes. Eleven of the eighty reached for "as though", "as if" or "like a". The owner wants
 * print's flat voice, and the ask asks for it — but a simile is NOT refused. This is for the report.
 */
export const similesIn = (text) => (String(text ?? '').match(/\b(?:as though|as if|like)\b/gi) ?? []).length;

/* ──────────────── WHICH SHEETS, AND WHICH FAMILIES ────────────────
 *
 * None of this is left to the model. It declined nothing in eighty asks, so the engine decides.
 */

/** Print's own size ladder. `sheds` is kept for Large and larger — "the goblin boss with dandruff is weird". */
const LARGE_OR_LARGER = ['Large', 'Huge', 'Gargantuan'];
export const shedsSuits = (size) => LARGE_OR_LARGER.includes(String(size ?? '').trim());

/**
 * Whether this sheet takes a ribbon, read from what the route already decided — the path, and
 * whether the GM typed anything beyond a printed name. The GM's words are NOT read again here.
 *
 * The owner: "I don't like us adding ribbons to owlbear and goblin boss. If they are twists and if
 * it's a specific ask it can be a ribbon but not otherwise." On the forty that is exactly the three
 * sheets whose path is `exact` — s19, s21, s22 — and no others.
 *
 * The blank form takes one. That is Fable's call, not the owner's: the whole creature is invented
 * there, so a ribbon is no more of an addition than its name. Recorded here so it can be reversed
 * in one line.
 */
export function sheetTakesARibbon({ path, twist } = {}) {
  const p = String(path ?? '');
  if (p === 'exact' && !twist) {
    return { yes: false, because: 'a printed creature typed by name alone takes no ribbon' };
  }
  if (p === 'blank') {
    return { yes: true, because: 'the blank form invents the whole creature, so a ribbon is no more of an addition than its name' };
  }
  if (p === 'exact') return { yes: true, because: 'a printed creature with a twist takes a ribbon' };
  return { yes: true, because: `the ${p || 'unknown'} path is a creature of the GM's own` };
}

/**
 * The three families this sheet is offered. A FIXED FUNCTION OF THE INPUT, so the same input is
 * offered the same three and a replay is stable — the ribbon call's prompt must not drift between
 * runs the way `cr: "auto"` does on s22.
 *
 * FNV-1a over the typed text seeds a small LCG, which shuffles the eligible families; the first
 * three are offered. Over many inputs each family is offered about as often as the others, which is
 * what the test asserts.
 */
export const RIBBONS_OFFERED = 3;
const fnv1a = (text) => {
  let h = 0x811c9dc5;
  for (const ch of String(text ?? '')) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
  return h >>> 0;
};
export function ribbonFamiliesOffered(typedText, { size } = {}) {
  const eligible = RIBBON_FAMILIES.filter((f) => !f.largeOrLarger || shedsSuits(size)).map((f) => f.key);
  let seed = fnv1a(typedText) || 1;
  const next = () => { seed = (Math.imul(seed, 1103515245) + 12345) >>> 0; return seed / 0x100000000; };
  const pool = [...eligible];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(RIBBONS_OFFERED, pool.length));
}
