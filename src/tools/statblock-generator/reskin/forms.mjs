/**
 * THE FOUR FORMS (fidelity pipeline step 3). A mechanical row is one of four closed shapes, held as FIELDS and
 * rendered by one function per edition — the model will author into these (step 5) and never write rules prose.
 *   attack   { bonus, reach?, range?, avg, dice, type, rider? }        reach "5", range "30/120"; rider is a sentence after the damage
 *   save     { stat, dc, target, failure, success? }                   target "one creature within 60 feet" | "each creature in a 30-foot Cone"
 *   trait    { trigger?, effect }                                      a passive trait has no trigger: "The creature can breathe air and water."
 *   reaction { trigger, response }
 * Every form may carry `flavor`: text with no rules weight that no renderer prints inside the row (it routes to the
 * Languages line or the description — owner 2026-10-04).
 */
const cap = (s) => String(s ?? '').trim().replace(/^./, (c) => c.toUpperCase());
const low = (s) => String(s ?? '').trim().replace(/^(The|It|Each|Any|Every|One)\b/, (w) => w.toLowerCase());
/** a prose rider-save ("each creature within 5 feet must succeed on a DC 12 Dexterity saving throw or take …") becomes the skeleton the lint requires */
export function skeletonSave(text) {
  const VERB = { take: 'The target takes ', takes: 'The target takes ', be: 'The target is ', become: 'The target is ', becomes: 'The target is ', have: 'The target has ', has: 'The target has ' };
  return String(text ?? '').replace(/\b((?:each|any|every|one|all) [^.:]*?)\s+must (?:succeed on|make) a DC (\d+|\{dc\}) (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw(?:,? or |, taking )([^.]+)\.?/g,
    (m0, target, dc, stat, eff) => `*${stat} Saving Throw*: DC ${dc}, ${target.trim()}. *Failure:* ${cap(eff.trim().replace(/^(take|takes|be|become|becomes|have|has) /, (v) => VERB[v.trim()] ?? v))}.`);
}
const end = (s) => (s && !/[.!?]$/.test(s.trim()) ? `${s.trim()}.` : String(s ?? '').trim());

export function renderForm(form, edition = '2024') {
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
      if (is2014) {
        const dmg = /^(\d+ \(\d+d\d+(?: [+-] \d+)?\) \w+ damage)[.,]?\s*(?:and\s+)?([^]*)$/.exec(String(form.failure).trim());
        const half = /half(?: as much)? damage/i.test(form.success ?? '');
        const t14 = (x) => String(x).replace(/(\d+)-foot (Cone|Sphere|Line|Cube|Cylinder)\b/g, (m0, n, sh) => `${n}-foot ${sh.toLowerCase()}`).replace(/(\d+)-foot Emanation/g, '$1-foot radius'); // 2014 lowercases its shapes, as the grammar pass does
        let s = dmg ? `${cap(t14(form.target))} must make a DC ${form.dc} ${form.stat} saving throw, taking ${dmg[1].replace(/ ([A-Z][a-z]+) damage$/, (m0, t) => ` ${t.toLowerCase()} damage`)} on a failed save${half ? ', or half as much damage on a successful one' : ''}.`
          : `${cap(t14(form.target))} must make a DC ${form.dc} ${form.stat} saving throw. On a failed save, ${low(end(form.failure))}`;
        if (dmg && dmg[2].trim()) s += ` On a failed save, ${low(end(dmg[2]))}`;
        if (form.success && !half) s += ` On a successful save, ${low(end(form.success))}`;
        return s;
      }
      return `*${form.stat} Saving Throw*: DC ${form.dc}, ${form.target}. *Failure:* ${end(cap(form.failure))}${form.success ? ` *Success:* ${end(cap(form.success))}` : ''}`; // the engine's convention: the asterisk closes before the colon
    }
    case 'trait': return skeletonSave(form.trigger ? `${cap(form.trigger).replace(/[.,]$/, '')}, ${low(end(form.effect))}` : end(cap(form.effect)));
    case 'reaction': return skeletonSave(is2014 ? `${cap(form.trigger).replace(/[.,]$/, '')}, ${low(end(form.response))}` : `*Trigger:* ${end(cap(form.trigger))} *Response:* ${end(cap(form.response))}`);
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
