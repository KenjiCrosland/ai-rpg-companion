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

/** The eight families, with print's own row as the example. From srd52-monsters.json. */
export const RIBBON_FAMILIES = [
  { key: 'senses', label: 'Senses a thing',
    example: 'Rust Monster, Iron Scent: The rust monster can pinpoint the location of ferrous metal within 30 feet of itself.' },
  { key: 'sheds', label: 'Sheds or leaves something',
    example: 'Azer, Illumination: The azer sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.' },
  { key: 'moves', label: 'Moves strangely',
    example: "Earth Elemental, Earth Glide: The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn't disturb the material it moves through." },
  { key: 'speaks', label: 'Speaks strangely',
    example: 'Dryad, Speak with Beasts and Plants: The dryad can communicate with Beasts and Plants as if they shared a language.' },
  { key: 'hides', label: 'Hides, or cannot be read',
    example: "Gelatinous Cube, Transparent: Even when the cube is in plain sight, a creature must succeed on a DC 15 Wisdom (Perception) check to notice the cube if the creature hasn't witnessed the cube move or otherwise act." },
  { key: 'taboo', label: 'Has a taboo or a need',
    example: 'Sahuagin, Limited Amphibiousness: The sahuagin can breathe air and water, but it must be submerged at least once every 4 hours to avoid suffocating outside water.' },
  { key: 'bound', label: 'Is bound to something',
    example: 'Homunculus, Telepathic Bond: While the homunculus is on the same plane of existence as its master, the two of them can communicate telepathically with each other.' },
  { key: 'leaves-at-death', label: 'Leaves something when it dies',
    example: "Troll Limb, Troll Spawn: The limb uncannily has the same senses as a whole troll. If the limb isn't destroyed within 24 hours, roll 1d12. On a 12, the limb turns into a Troll. Otherwise, the limb withers away." },
];

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
  const re = new RegExp(`\\b${condition}\\b`, 'gi');
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
  if (/[+−-]\s?\d+\s+(?:to hit|bonus)|\bbonus to\b/i.test(s)) return 'it gives a bonus';

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
