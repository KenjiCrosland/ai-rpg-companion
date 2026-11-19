/**
 * THE FOUR FORMS (fidelity pipeline step 3). A mechanical row is one of four closed shapes, held as FIELDS and
 * rendered by one function per edition — the model will author into these (step 5) and never write rules prose.
 *   attack   { bonus, reach?, range?, avg, dice, type, rider? }        reach "5", range "30/120"; rider is a sentence after the damage
 *   save     { stat, dc, target, failure, success? }                   target "one creature within 60 feet" | "each creature in a 30-foot Cone"
 *   trait    { trigger?, effect }                                      a passive trait has no trigger: "The creature can breathe air and water."
 *   reaction { trigger, response } — or { trigger, save: { stat, dc, target, failure, success } }
 *                                      when the response forces a save (print: the Chain Devil)
 * Every form may carry `flavor`: text with no rules weight that no renderer prints inside the row (it routes to the
 * Languages line or the description — owner 2026-10-04).
 */
const cap = (s) => String(s ?? '').trim().replace(/^./, (c) => c.toUpperCase());
// THE WORD AFTER THE JOIN IS LOWERCASED, FULL STOP (forty #2, 2026-11-02). This
// carried a six-word list — The|It|Each|Any|Every|One — and a trigger/effect join
// produces a capital from whatever the call happened to write: forty #2 shipped
// "…takes damage from a melee attack, A memento of the attacker…", "…within reach
// of the hushfall, That creature cannot…" and "…in a straight line, When the
// bull's movement…". Three of four joins on that run were wrong and the list could
// never close, because it is not a list — it is the first word of a sentence.
//
// Two exemptions, both CLOSED FACTS rather than readings: a word of the creature's
// own name (forty #2's fourth case was "…in Dim Light or Darkness, Thrust has
// Advantage…", where Thrust IS the Unanswered Thrust), and nothing else — a rules
// term that lands here lowercase is restored by `capsFix2024`, which runs over
// every row's text after every row has landed and exists for exactly this.
// A PROPER NOUN IS CAPITALISED WHERE IT IS DECLARED (the critic, forty #3). The
// first cut of this took every word of every name string, and the engine's inline
// for a kind is "the cairn-wight" — so "the" entered the keep set and ELEVEN sheets
// still shipped "…, The target takes…". Every one of the critic's eight mid-sentence
// capitals was the word "The", kept by my own exemption. Reading only the words
// that are Capitalised in the name needs no article list and no stopword list: "the
// cairn-wight" contributes nothing, "Unanswered Thrust" still protects "Thrust".
const low = (s, keep = []) => {
  const t = String(s ?? '').trim();
  // A POSSESSIVE IS THE SAME NOUN (item 1.3, 2026-11-18). The match below takes the apostrophe
  // with the word, so Krennik Skullstandard's trait opened "krennik's Iron-Shod Standard attacks
  // have a reach of 10 feet": the kept set holds "krennik", the word looked up was "krennik's",
  // and the creature's own name was lowercased in its own trait. The key is normalised, not the
  // list widened.
  const key = (w) => String(w).replace(/['\u2019]s$/i, '').toLowerCase();
  const kept = new Set(keep.flatMap((k) => String(k ?? '').split(/[^A-Za-z']+/)).filter((w) => /^[A-Z]/.test(w)).map(key));
  return t.replace(/^[A-Za-z][\w']*/, (w) => (kept.has(key(w)) ? w : w.charAt(0).toLowerCase() + w.slice(1)));
};
/** a prose rider-save ("each creature within 5 feet must succeed on a DC 12 Dexterity saving throw or take …") becomes the skeleton the lint requires */
export function skeletonSave(text) {
  const VERB = { take: 'The target takes ', takes: 'The target takes ', be: 'The target is ', become: 'The target is ', becomes: 'The target is ', have: 'The target has ', has: 'The target has ' };
  return String(text ?? '').replace(/\b((?:each|any|every|one|all) [^.:]*?)\s+must (?:succeed on|make) a DC (\d+|\{dc\}) (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw(?:,? or |, taking )([^.]+)\.?/g,
    (m0, target, dc, stat, eff) => `*${stat} Saving Throw*: DC ${dc}, ${target.trim()}. *Failure:* ${cap(eff.trim().replace(/^(take|takes|be|become|becomes|have|has) /, (v) => VERB[v.trim()] ?? v))}.`);
}
const end = (s) => (s && !/[.!?]$/.test(s.trim()) ? `${s.trim()}.` : String(s ?? '').trim());

export function renderForm(form, edition = '2024', { properNouns = [] } = {}) {
  const lowN = (x) => low(x, properNouns);
  const is2014 = edition === '2014';
  switch (form.kind) {
    case 'attack': {
      const both = form.reach && form.range; const where = both ? `reach ${form.reach} ft. or range ${form.range} ft.` : form.range ? `range ${form.range} ft.` : `reach ${form.reach ?? 5} ft.`;
      const dmg = `${form.avg} (${form.dice}) ${is2014 ? String(form.type).toLowerCase() : form.type} damage`;
      const rider = form.rider ? (/^(?:and|or|plus)\b/i.test(form.rider) ? `, ${end(form.rider)}` : ` ${end(cap(form.rider))}`) : '.';
      if (is2014) { const label = both ? 'Melee or Ranged' : form.range ? 'Ranged' : 'Melee'; return `${label} ${form.spell ? 'Spell' : 'Weapon'} Attack: +${form.bonus} to hit, ${where}, one target. Hit: ${dmg}${rider === '.' ? '.' : rider}`; }
      const label = both ? 'Melee or Ranged' : form.range ? 'Ranged' : 'Melee';
      return `*${label} Attack Roll:* +${form.bonus}, ${where} ${dmg}${rider === '.' ? '.' : rider}`;
    }
    case 'save': {
      // AN EMANATION NAMES WHAT IT COMES FROM; A CONE AND A LINE DO NOT (the critic's
      // §2a, gate of 2026-11-08). Their #25 was the Black Iron Sentinel's Iron Root:
      // "Each creature in a 10-foot-radius sphere must succeed on a DC 16 Strength saving
      // throw" — an area with no centre, which a GM cannot place. The 2024 twin was no
      // better ("each creature in a 10-foot Emanation"), so the 2014 converter did not
      // drop the anchor: it was never written. The authoring form (`TARGET_OK`) accepts a
      // bare Cone/Line/Emanation while REQUIRING "centered on a point" for a Sphere,
      // because its comment reasoned an Emanation "comes from the creature by definition".
      // Print disagrees for one of the three and agrees for the other two:
      //
      //   Emanation: 33 of 34 mentions carry "originating from"  -> ANCHOR IT
      //   Cone:       0 of 55                                     -> leave alone
      //   Line:       0 of 24                                     -> leave alone
      //
      // So this anchors an Emanation only; anchoring cones would have made 55 print-shaped
      // rows unlike print. Measured on 3 saved forties: 11 of 11 authored area rows ship
      // with no anchor, so this is ~3-4 rows a forty, not one sheet.
      //
      // `form.anchor` is the creature's inline, supplied by the caller. With no anchor the
      // behaviour is exactly what it was, so every other caller is untouched.
      const target = form.anchor && /\d+-foot Emanation\b/.test(String(form.target)) && !/originating from/i.test(String(form.target))
        ? String(form.target).replace(/(\d+-foot Emanation)\b/, `$1 originating from ${form.anchor}`)
        : form.target;
      form = { ...form, target };
      if (is2014) {
        const dmg = /^(\d+ \(\d+d\d+(?: [+-] \d+)?\) \w+ damage)[.,]?\s*(?:and\s+)?([^]*)$/.exec(String(form.failure).trim());
        const half = /half(?: as much)? damage/i.test(form.success ?? '');
        // 2014 HAS ITS OWN AURA IDIOM, and it carries the anchor: "each creature within
        // 10 feet of the sentinel". The old conversion wrote "a 10-foot radius" — a shape
        // with no centre, which is what shipped on the critic's #25. An unanchored
        // Emanation still falls back to the radius wording, because there is nothing to
        // name; with an anchor the idiomatic form is available and is used.
        const t14 = (x) => String(x).replace(/(\d+)-foot (Cone|Sphere|Line|Cube|Cylinder)\b/g, (m0, n, sh) => `${n}-foot ${sh.toLowerCase()}`)
          .replace(/in a (\d+)-foot Emanation originating from ([^,.]+)/g, 'within $1 feet of $2')
          .replace(/(\d+)-foot Emanation/g, '$1-foot radius'); // 2014 lowercases its shapes, as the grammar pass does
        let s = dmg ? `${cap(t14(form.target))} must make a DC ${form.dc} ${form.stat} saving throw, taking ${dmg[1].replace(/ ([A-Z][a-z]+) damage$/, (m0, t) => ` ${t.toLowerCase()} damage`)} on a failed save${half ? ', or half as much damage on a successful one' : ''}.`
          : `${cap(t14(form.target))} must make a DC ${form.dc} ${form.stat} saving throw. On a failed save, ${lowN(end(form.failure))}`;
        if (dmg && dmg[2].trim()) s += ` On a failed save, ${lowN(end(dmg[2]))}`;
        if (form.success && !half) s += ` On a successful save, ${lowN(end(form.success))}`;
        return s;
      }
      return `*${form.stat} Saving Throw*: DC ${form.dc}, ${form.target}. *Failure:* ${end(cap(form.failure))}${form.success ? ` *Success:* ${end(cap(form.success))}` : ''}`; // the engine's convention: the asterisk closes before the colon
    }
    case 'trait': return skeletonSave(form.trigger ? `${cap(form.trigger).replace(/[.,]$/, '')}, ${lowN(end(form.effect))}` : end(cap(form.effect)));
    case 'reaction': {
      // A REACTION THAT FORCES A SAVE writes it in the save form after "Response", which is how
      // print writes its one example: the Chain Devil's Unnerving Gaze reads
      //   *Trigger:* … *Response—Wisdom Saving Throw:* DC 15, the triggering creature. *Failure:* …
      // A save as PROSE inside the response is the 2014 wording and is refused upstream, so this
      // renders the fields or nothing.
      // A DEFENSIVE RESPONSE THE ENGINE WRITES (Box 2, 18 November evening). The model supplies the
      // name and the trigger; the sentence is print's own, from the Bandit Captain, the Warrior
      // Veteran, the Pirate Captain and the Mummy Lord — four rows, one wording. `pb` is the
      // creature's Proficiency Bonus, which is what print's "+2"/"+3" is.
      if (form.response_kind === 'parry') {
        const bump = Number(form.pb) || 2;
        const sentence = `The ${form.inline ?? 'creature'} adds ${bump} to its AC against that attack, possibly causing it to miss.`;
        return is2014
          ? `${end(cap(form.trigger))} ${sentence}`
          : `*Trigger:* ${end(cap(form.trigger))} *Response:* ${sentence}`;
      }
      if (form.save) {
        const sv = form.save;
        const head2024 = `*Trigger:* ${end(cap(form.trigger))} *Response—${sv.stat} Saving Throw:* DC ${sv.dc}, ${sv.target}. *Failure:* ${end(cap(sv.failure))}${sv.success ? ` *Success:* ${end(cap(sv.success))}` : ''}`;
        const head2014 = `${cap(form.trigger).replace(/[.,]$/, '')}, ${lowN(cap(sv.target))} must make a DC ${sv.dc} ${sv.stat} saving throw. On a failed save, ${lowN(end(sv.failure))}${sv.success ? ` On a successful save, ${lowN(end(sv.success))}` : ''}`;
        return skeletonSave(is2014 ? head2014 : head2024);
      }
      return skeletonSave(is2014 ? `${cap(form.trigger).replace(/[.,]$/, '')}, ${lowN(end(form.response))}` : `*Trigger:* ${end(cap(form.trigger))} *Response:* ${end(cap(form.response))}`);
    }
    default: throw new Error(`unknown form kind: ${form.kind}`);
  }
}

/** How a row RESOLVES, read from its text: 'attack' | 'save' | 'trigger' | 'passive' | null (a row that names damage or a target and resolves by none of these is not adjudicable) */
export function resolutionOf(text) {
  const t = String(text ?? '');
  if (/Attack Roll:|(?:Weapon|Spell) Attack:/.test(t)) return 'attack';
  // a row IMPOSES a save (a DC and a stat); a trait that merely mentions saving throws (Magic Resistance, Legendary Resistance) is a rule statement
  if (/\*?(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw\*?:\*?\s*DC \d+/.test(t) || /* the engine writes `Throw*: DC` and the model's own rows write `Throw:* DC` — both are the structured save */ /must (?:make|succeed on) a DC \d+ (?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw/i.test(t)) return 'save';
  if (/\*Trigger:\*|\b(?:when|whenever|while|if|unless|after|until|at the (?:start|end) of|immediately after|the first time|once per)\b/i.test(t) || /\b(?:a|any|each|every|one) (?:\w+ )?creature (?:that|who|which)\b|\bthat (?:touches|hits|enters|starts|ends|moves)\b|\badhered to\b/i.test(t)) return 'trigger'; // print's relative-clause triggers: "A creature that touches the mimic", "adhered to"
  return 'passive';
}
export const TARGET_CLAUSE = /\b(?:one|two|three|each|every|any|all|a|an|up to \w+)\s+(?:\w+\s+){0,4}creatures?\b|\b(?:each|every|any) (?:enemy|ally|target)\b|\bin a \d+-foot(?:-\w+)?\s+(?:Cone|Sphere|Line|Cube|Cylinder|Emanation|radius|cone|sphere|line|cube|cylinder|emanation)\b|\bwithin \d+ feet\b|\bone target\b|\bthe target\b|\bthat (?:creature|target)\b/i; // "at a point within 5 feet of one creature … that creature" is one target (the Gullet-Wyrm, sprint run 2026-10-12)
export const SAVE_OUTCOME = /\*Failure:\*|On a failed save|or (?:be|take|become|have|suffer)\b|\bfails?\b[^.]*\b(?:takes?|has|is)\b/i;
