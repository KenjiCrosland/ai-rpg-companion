import { weaponProp } from './weapons.mjs';

/**
 * THE FEATURE TABLE (step 8, owner's brief 2026-10-12): about fifteen closed entries, keyed by what the user typed, rendered as
 * form data — a rider on the weapon's row, a trait, or a reaction. A named weapon earns ONE feature tied to it: a heavy weapon
 * earns Great Weapon Master (+PB damage on a hit), any other weapon its 2024 mastery property. A style word ("fighting style",
 * "trained", "disciplined", "veteran", "martial", "technique") earns Trip Attack (a rider with a save, at will) and Riposte (a
 * reaction). The feature's real name is the row's name. The remaining feats and class signatures belong to the character project.
 */
// MELEE heavy only (the critic's fifth read: "Great Weapon Master on a Longbow.
// Even if the 2024 feat's Heavy wording covers a bow, a GM reads it as a
// mistake"). A heavy ranged weapon takes its mastery property instead.
const HEAVY = (w) => { const p = weaponProp(w); return !!(p?.heavy && p.reach && !p.launcher); };
const MASTERY = (w) => weaponProp(w)?.mastery ?? null;
const STYLE_CUE = /\b(?:fighting styles?|trained|disciplined|veteran|martial|technique|drilled|well-trained)\b/i;
const STYLES = [
  [/\barchery\b|\barcher\b/i, 'Archery', (c) => `${c.Inline} has a +2 bonus to attack rolls made with ranged weapons.`],
  [/\bdefen[cs]e\b/i, 'Defense', (c) => `While ${c.inline} wears armor, it has a +1 bonus to Armor Class (included).`],
  [/\bdueling\b|\bduelist\b/i, 'Dueling', (c) => `When ${c.inline} hits with a melee weapon it holds in one hand, the attack deals an extra 2 damage.`],
  [/\bgreat weapon fighting\b/i, 'Great Weapon Fighting', (c) => `When ${c.inline} rolls damage for a melee weapon it holds in two hands, it treats any 1 or 2 on a damage die as a 3.`],
  [/\bprotection\b/i, 'Protection', null], // a reaction, below
  [/\btwo-weapon fighting\b|\btwo weapons\b|\bdual[- ]wield\w*/i, 'Two-Weapon Fighting', (c) => `When ${c.inline} attacks with a second weapon in its other hand, it adds its ability modifier to that attack's damage.`],
];
const cap = (s) => String(s ?? '').replace(/^./, (ch) => ch.toUpperCase());
const saveRider = (stat, dc, effect) => `, and the target is subjected to the following effect. *${stat} Saving Throw*: DC ${dc}. *Failure:* ${effect}`; // print's shape (the Homunculus's Bite)

/**
 * @param record the clause record; @param parts the part rows landed (name, clause, type, mode, rider)
 * @returns rows: { kind: 'rider', row, text, clause, name } | { kind: 'trait'|'reaction', name, text, clause }
 */
export function featureRows(record, { parts = [], meleeRows = [], inline = 'the creature', pb = 2, dc = 12, mod = 0, dexMod = null, cap: capN = 3 } = {}) {
  // A MASTERY SAVE USES THE ABILITY ITS ATTACK USES (critic, 2026-10-14: Coral
  // Vurthax's trident attacked off DEX and its Topple DC keyed off STR). Finesse
  // weapons roll Dexterity; everything else melee rolls Strength.
  const FINESSE = /\b(?:dagger|dart|rapier|scimitar|shortsword|whip|sickle)s?\b/i;
  const masteryMod = (w) => (dexMod != null && FINESSE.test(String(w ?? '')) ? dexMod : mod);
  const c = { inline, Inline: cap(inline) }; const out = []; const used = new Set();
  const weaponParts = parts.filter((p) => p.part && p.weapon);
  // one feature per named weapon
  for (const p of weaponParts) {
    if (out.length >= capN) break;
    const w = p.weapon.toLowerCase();
    if (HEAVY(w)) { if (!used.has('gwm')) { used.add('gwm'); out.push({ kind: 'trait', name: 'Great Weapon Master', text: `When ${c.inline} hits a creature with its ${p.name}, the attack deals an extra ${pb} damage.`, clause: p.clause }); } continue; }
    const prop = MASTERY(w); if (!prop || used.has(`mastery:${p.name}`)) continue; used.add(`mastery:${p.name}`);
    const rider = {
      // 2024 mastery: the save is against 8 + the attacker's weapon mod + PB —
      // never the sheet's best DC, which may be a mental stat's (the critic's
      // fifth read: Othyn's Topple read DC 13 where 8 + STR 3 + PB 3 = 14)
      Topple: saveRider('Constitution', 8 + masteryMod(w) + pb, 'The target has the Prone condition.'),
      Sap: `, and the target has Disadvantage on its next attack roll before the start of ${c.inline}'s next turn.`,
      Slow: `, and the target's Speed is reduced by 10 feet until the start of ${c.inline}'s next turn.`,
      Push: `, and if the target is Large or smaller, it is pushed up to 10 feet straight away from ${c.inline}.`,
      Vex: `, and ${c.inline} has Advantage on its next attack roll against the target before the end of its next turn.`,
    }[prop];
    if (rider) out.push({ kind: 'rider', row: p.name, text: rider, name: prop, clause: p.clause });
    else if (prop === 'Graze') out.push({ kind: 'trait', name: 'Graze', text: `When ${c.inline} misses a creature with its ${p.name}, the target takes ${Math.max(1, mod)} damage of the attack's type.`, clause: p.clause });
    else if (prop === 'Cleave') out.push({ kind: 'trait', name: 'Cleave', text: `Once per turn, immediately after ${c.inline} hits a creature with its ${p.name}, it can make one ${p.name} attack against a second creature within 5 feet of the first that it can see; on a hit, that attack deals ${Math.max(1, mod)} damage of the attack's type.`, clause: p.clause });
  }
  // a style clause earns Trip Attack and Riposte; a named style earns its own trait or reaction
  const styleClause = record.find((cl) => cl.kind === 'mechanical' && !cl.head && !cl.polarity && STYLE_CUE.test(cl.text) && !/\b(?:magic|spell|arcane)\b/i.test(cl.text));
  if (styleClause && out.length < capN) {
    const named = STYLES.find(([re]) => re.test(styleClause.text));
    if (named) {
      const [, name, fx] = named;
      if (fx) out.push({ kind: 'trait', name, text: fx(c), clause: styleClause.text });
      else out.push({ kind: 'reaction', name, text: `*Trigger:* A creature ${c.inline} can see attacks a target other than ${c.inline} that is within 5 feet of it. *Response:* ${c.Inline} imposes Disadvantage on the attack roll.`, clause: styleClause.text });
    } else {
      const tripRow = parts.find((p) => p.part && p.rider === 'Prone' && p.mode !== 'ranged') ?? parts.find((p) => p.part && p.mode !== 'ranged') ?? null;
      const meleeName = tripRow?.name ?? meleeRows[0] ?? null;
      if (tripRow) out.push({ kind: 'rider', row: tripRow.name, text: saveRider('Strength', dc, 'The target has the Prone condition.'), name: 'Trip Attack', clause: styleClause.text, replacesProne: true });
      if (meleeName && out.length < capN) out.push({ kind: 'reaction', name: 'Riposte', text: `*Trigger:* A creature misses ${c.inline} with a melee attack roll. *Response:* ${c.Inline} makes one ${meleeName} attack against that creature.`, clause: styleClause.text });
    }
  }
  // a riposte asked for by name lands beside a NAMED style (Dueling took the style seat and the riposte never came — the stone giant duelist, sprint run 2026-10-12)
  const riposteClause = record.find((cl) => !cl.polarity && /\briposte\b/i.test(cl.text));
  if (riposteClause && !out.some((f) => f.name === 'Riposte') && out.length < capN) { const meleeName = parts.find((p) => p.part && p.mode !== 'ranged')?.name ?? meleeRows[0] ?? null; if (meleeName) out.push({ kind: 'reaction', name: 'Riposte', text: `*Trigger:* A creature misses ${c.inline} with a melee attack roll. *Response:* ${c.Inline} makes one ${meleeName} attack against that creature.`, clause: riposteClause.text }); }
  // "tripping" is the Trip rider's own verb: a clause that says trip earns Trip Attack on a melee part without a style word (Grik's "knack for tripping bigger creatures" was filed as flavor — the critic's green-light read, 2026-10-12)
  const tripClause = record.find((cl) => !cl.polarity && /\btrip(?:s|ping|ped)?\b/i.test(cl.text) && !/\b(?:trip ?wire|tripwires?)\b/i.test(cl.text));
  if (tripClause && !out.some((f) => f.name === 'Trip Attack') && out.length < capN) { const tripRow = parts.find((p) => p.part && p.rider === 'Prone' && p.mode !== 'ranged') ?? parts.find((p) => p.part && p.mode !== 'ranged') ?? null; const rowName = tripRow?.name ?? meleeRows[0] ?? null; if (rowName) out.push({ kind: 'rider', row: rowName, text: saveRider('Strength', dc, 'The target has the Prone condition.'), name: 'Trip Attack', clause: tripClause.text, replacesProne: true }); }
  const sneak = record.find((cl) => cl.kind === 'mechanical' && !cl.head && /\bsneak attack|\bbackstab/i.test(cl.text)) ?? record.find((cl) => cl.kind === 'mechanical' && !cl.head && /\bassassin\b|\brogue\b/i.test(cl.text)); // the clause that SAYS sneak attack is the row's provenance; "a halfling assassin" is the fallback cue (Vell read 2/4, sprint run 2026-10-12)
  if (sneak && out.length < capN && meleeRows[0]) out.push({ kind: 'trait', name: 'Sneak Attack', text: `Once per turn, when ${c.inline} hits a creature with an attack roll while it has Advantage on the roll or while an ally of ${c.inline} is within 5 feet of the target, the attack deals an extra {dmg} damage.`, clause: sneak.text });
  return out.slice(0, capN);
}
