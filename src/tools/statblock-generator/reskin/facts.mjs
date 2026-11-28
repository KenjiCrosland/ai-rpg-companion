/**
 * WHAT THE GM TYPED ABOUT THE CREATURE ITSELF, READ BY A CALL (Fable, round two Part B, 2026-11-27).
 *
 * The engine's own reader catches a fact written as the sheet writes it — "AC 17", "around 110 HP".
 * It cannot read "a cat, now the size of a horse", "wearing full plate" or "pixie", because those
 * need to know what the words MEAN. The house rule is that meaning comes from a call and is
 * validated against the GM's words, never from a word list in code.
 *
 * This call reads only the GM's two fields and returns facts. It changes no existing prompt, so
 * every recording stays valid. Nothing on the sheet uses its answer yet: this round ends at a probe.
 */

export const FACT_FIELDS = ['size', 'type', 'armour', 'shield', 'ac', 'hp', 'speed', 'movement', 'attacks', 'immune', 'resistant', 'vulnerable'];
export const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
export const TYPES = ['Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon', 'Elemental', 'Fey', 'Fiend', 'Giant', 'Humanoid', 'Monstrosity', 'Ooze', 'Plant', 'Undead'];
export const ARMOUR = ['padded', 'leather', 'studded leather', 'hide', 'chain shirt', 'scale mail', 'breastplate', 'half plate', 'ring mail', 'chain mail', 'splint', 'plate'];
export const MODES = ['fly', 'swim', 'climb', 'burrow'];
export const DAMAGE_TYPES = ['Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];
export const CONDITIONS = ['Blinded', 'Charmed', 'Deafened', 'Exhaustion', 'Frightened', 'Grappled', 'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned', 'Unconscious'];

export function buildFactsPrompt({ name = '', description = '' } = {}) {
  return `A game master filled in a monster form. Read ONLY their words and report the FACTS they state about the creature itself — what it is, not what it does.

Name field: "${String(name)}"
Description field: "${String(description)}"

A fact is something that belongs at the TOP of a statblock: its size, its creature type, armour it wears, a shield, its AC, its hit points, its walking speed, a movement mode, how many attacks it makes, or something it is immune, resistant or vulnerable to.

An ABILITY is not a fact. "regains 10 HP at the start of its turn", "makes 2 attacks when bloodied" and "allies within 10 feet are immune to fear" describe what the creature DOES; report nothing for them.

Answer JSON: {"facts": [{"field": ..., "value": ..., "quote": ..., "from": ...}]}
- "field": one of ${FACT_FIELDS.join(', ')}
- "value": size one of ${SIZES.join('/')}; type one of ${TYPES.join('/')}; armour one of ${ARMOUR.join('/')}; shield true; ac/hp/speed/attacks a number; movement one of ${MODES.join('/')}; immune/resistant/vulnerable a damage type or a condition
- "quote": the game master's OWN words for this fact, copied exactly from the two fields, six words at most
- "from": "stated" when their words say the fact itself ("AC 17", "the size of a horse", "undead", "full plate"); "kind" when it follows from a kind of creature they named (a pixie flies; a dwarf is a Humanoid). For "kind" the quote is the kind word.

Report only what their words support. An empty list is a good answer. Grandeur is not a size: "a titan of the deep" and "an archlich enthroned on a sun of bone" state no size.`;
}

/** Drops any fact the GM's words do not carry, or whose field or value is off the lists. */
export function validateFacts(raw, { name = '', description = '' } = {}) {
  const words = `${name} ${description}`.toLowerCase();
  const kept = []; const dropped = [];
  const listFor = (f) => ({ size: SIZES, type: TYPES, armour: ARMOUR, movement: MODES,
    immune: [...DAMAGE_TYPES, ...CONDITIONS], resistant: [...DAMAGE_TYPES, ...CONDITIONS], vulnerable: [...DAMAGE_TYPES, ...CONDITIONS] }[f] ?? null);
  for (const f of (Array.isArray(raw?.facts) ? raw.facts : [])) {
    const field = String(f?.field ?? '').trim().toLowerCase();
    const quote = String(f?.quote ?? '').trim();
    const from = String(f?.from ?? '').trim().toLowerCase();
    const note = (why) => dropped.push({ ...f, why });
    if (!FACT_FIELDS.includes(field)) { note(`field "${f?.field}" is not one the engine reads`); continue; }
    if (!quote) { note('no quote'); continue; }
    if (!words.includes(quote.toLowerCase())) { note(`the quote "${quote}" is not in the game master's words`); continue; }
    if (quote.split(/\s+/).length > 6) { note(`the quote is ${quote.split(/\s+/).length} words`); continue; }
    if (!['stated', 'kind'].includes(from)) { note(`"from" is "${f?.from}"`); continue; }
    const list = listFor(field);
    let value = f?.value;
    if (field === 'shield') value = true;
    else if (['ac', 'hp', 'speed', 'attacks'].includes(field)) {
      if (!Number.isFinite(Number(value))) { note(`${field} "${value}" is not a number`); continue; }
      value = Number(value);
    } else if (list) {
      const hit = list.find((x) => x.toLowerCase() === String(value).trim().toLowerCase());
      if (!hit) { note(`${field} "${value}" is not on that field's list`); continue; }
      value = hit;
    }
    kept.push({ field, value, quote, from });
  }
  return { kept, dropped };
}
