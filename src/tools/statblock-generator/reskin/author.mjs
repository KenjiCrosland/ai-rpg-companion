/**
 * THE REPAIR CALL (step 7; was the authoring call of step 5). After the template path, the model authors one row per UNCLAIMED clause INTO THE FORMS (reskin/forms.mjs)
 * and never writes a number: damage types from the closed list, conditions from the closed list, targets from the closed
 * shapes, a save's DC and every die from the engine. The chassis contributes budget and shape only. Flavor is welcome as
 * its own field; mechanics are forms. One cross-row reference per sheet is asked for — a rider one row applies and another
 * row exploits — which is where the old blocks' interlock came from.
 */
export const DAMAGE_TYPES = ['Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];
export const CONDITIONS = ['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Paralyzed', 'Poisoned', 'Prone', 'Restrained', 'Stunned'];
export const STATS = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
const TARGET_OK = /^(?:one creature within \d+ feet|each creature in a \d+-foot (?:Cone|Sphere|Line|Cube|Emanation)|each creature within \d+ feet|one creature it can see within \d+ feet)$/;
const HAS_NUMBER = /\d/;


/** THE REPAIR PASS (step 6): the sheet exists; these clauses have no row. Same forms, same rules, new rows only. */
export function buildRepairPrompt({ name, inline, clauses, cr, sheet, attackCap = 2, lacks = [], taken = [] }) {
  return `You are repairing the ABILITIES of a D&D monster: the sheet below is finished except that some of what its creator typed has no row yet. Write ONE row per listed clause, into closed forms, in the creator's own register. You never write a number: no attack bonus, no damage dice, no DC — the engine prices every row.

THE CREATURE: ${name} (${inline}), CR ${cr}.
THE SHEET SO FAR (keep every row; add to it — numbers are the engine's):
${sheet}

THE CREATOR'S CLAUSES WITH NO ROW:
${clauses.map((c, i) => `${i + 1}. ${c.text}`).join('\n')}${taken.length ? `\n\nNAMES ALREADY ON THE SHEET — never reuse one, every new row needs its own name: ${taken.map((n) => `"${n}"`).join(', ')}.` : ''}${lacks.length ? `\n\nTHE CREATOR SAID IT DOES NOT HAVE: ${lacks.map((l) => `"${l}"`).join(', ')}. No row you write may grant any of these in any wording — a creature that "never holds" gets no Grappled condition, one with "no magic at all" casts nothing.` : ''}

THE FORMS
- attack (a weapon or body part): { "key": null, "clause", "name", "mode": "melee"|"ranged"|"both", "type": one of ${DAMAGE_TYPES.join('/')}, "rider": one of ${CONDITIONS.join('/')} or null, "flavor": optional } — up to ${attackCap} new rows.
- save (a curse, a breath, a shove, a gaze): { "clause", "name", "stat": one of ${STATS.join('/')}, "target": "one creature within N feet" | "each creature in a N-foot Cone|Sphere|Line|Emanation", "damage": true|false, "type": one of the damage types or null, "condition": one of the conditions or null, "movement": "pushed up to N feet"|"pulled up to N feet"|null, "success": "half"|"none", "recharge": true|false }.
- trait (a passive, a style, a resource): { "clause", "name", "trigger": a when/while/if clause or null, "effect": one sentence; write {dc} where a save DC belongs and {dmg} where damage belongs — never a number }.
- A row that HEALS states the Hit Points as {dmg}, the action it costs, and a limit (a trigger, "1/Day", or "Recharge 5-6"): "restores hit points to the faithful" and "after minutes" are not rows a table can run.
- reaction: { "clause", "name", "trigger": one sentence, "response": one sentence, same tokens }.
- A clause that is speech goes to "unplaced" with "where": "languages"; pure lore goes to "unplaced" with "where": "description". Never invent a clause the creator did not type. Never write "the ${String(name).toLowerCase()}" if ${name} is a person; write "${inline}".

Answer with ONE JSON object:
{ "attacks": [ ... ], "saves": [ ... ], "traits": [ ... ], "reactions": [ ... ], "crossRef": null, "unplaced": [ { "clause": "...", "where": "languages"|"description", "text": "one line in the creator's register" } ] }`;
}

export function parseAuthorResponse(raw, { attackKeys = [], attackCap = 3, riderSlots = 2, traitSlots = 1 } = {}) {
  let p; try { p = JSON.parse(String(raw).replace(/^```json\s*|```\s*$/g, '').trim()); } catch { return null; }
  if (!p || typeof p !== 'object') return null;
  const str = (v, max = 80) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  const clean = (s) => str(s, 240).replace(/\d+ \(\d+d\d+(?: [+-] \d+)?\)/g, '{dmg}').replace(/\bDC \d+\b/g, 'DC {dc}');
  const attacks = (Array.isArray(p.attacks) ? p.attacks : []).map((a) => ({
    key: attackKeys.includes(a?.key) ? a.key : null, clause: str(a?.clause, 120), name: str(a?.name, 40), mode: ['melee', 'ranged', 'both'].includes(a?.mode) ? a.mode : 'melee',
    type: DAMAGE_TYPES.includes(a?.type) ? a.type : null, rider: CONDITIONS.includes(a?.rider) ? a.rider : null, flavor: str(a?.flavor, 160) || null,
  })).filter((a) => a.name && a.type && !HAS_NUMBER.test(a.name));
  // a noun that does not strike is not an attack row (the hermit's "Glass-Cut Stare" as a melee weapon attack — check-in 2026-10-11): it leaves the forms and its clause goes to the description
  const NON_STRIKING = /\b(?:stare|gaze|glare|look|eyes?|voice|aura|presence|scent|stench|smell|whisper|song|shadow|breath)\b/i;
  const refusedAttacks = attacks.filter((a) => NON_STRIKING.test(a.name));
  const attacksKept = attacks.filter((a) => !NON_STRIKING.test(a.name)).slice(0, attackCap);
  const saves = (Array.isArray(p.saves) ? p.saves : []).map((s) => ({
    clause: str(s?.clause, 120), name: str(s?.name, 40), stat: STATS.includes(s?.stat) ? s.stat : 'Dexterity', target: TARGET_OK.test(str(s?.target, 80)) ? str(s?.target, 80) : 'one creature within 30 feet',
    damage: !!s?.damage, type: DAMAGE_TYPES.includes(s?.type) ? s.type : null, condition: CONDITIONS.includes(s?.condition) ? s.condition : null, movement: (/\b(pushed|pulled|dragged|knocked back|moved) (?:up to )?(\d+) feet\b/i.exec(str(s?.movement, 80)) ?? null) && (([, verb, n]) => `${/pull|drag/i.test(verb) ? 'pulled' : 'pushed'} up to ${n} feet`)(/\b(pushed|pulled|dragged|knocked back|moved) (?:up to )?(\d+) feet\b/i.exec(str(s?.movement, 80))), success: s?.success === 'half' ? 'half' : 'none', recharge: !!s?.recharge,
  })).map((s) => (s.damage || s.condition || s.movement ? s : { ...s, damage: true })) /* a save that names no effect deals damage — the row must DO something (the placeholder's "Disadvantage on its next attack roll" shipped as Drag Under, critic's step-5 read) */ .filter((s) => s.name);
  // a damage-taken trigger with no frequency is permanent resistance phrased as a reaction (the hag's Cloud of Ash fired on every instance of damage — critic's step-5 read): once per turn
  const perTurn = (trig, eff = '') => (trig && /\b(?:takes? damage|would take damage|is hit|is damaged|is struck|is attacked)\b/i.test(trig) && /\{dmg\}|resistance|regains?|heals?|teleports?|dissolves?|moves?/i.test(eff) && !/\b(?:once per|the first time|on (?:its|her|his|their) turn|each turn|per round)\b/i.test(trig) ? `Once per turn, ${trig.replace(/^./, (c) => c.toLowerCase())}` : trig); // the hag's ash-cloud resistance is a resource; the bull's adamantine immunity is a rule
  // a trait is a RULE: it names a DC, damage, a number, a condition, or a rule verb — a sentence with none is flavor and goes to the description (the archlich's "Bound Dead of the Kingdom", check-in 2026-10-11)
  const scrubDmg = (eff) => String(eff ?? '').replace(/\s*\{dmg\}(?:\s+damage)?/g, (tok, off, whole) => (/\b(?:takes?|deals?|dealing|taking|extra|additional|plus|regains?|suffers?|an extra)\s*$/i.test(whole.slice(0, off)) ? tok : '')).replace(/\s{2,}/g, ' '); // the same rule the landing applies: a {dmg} that deals nothing is not a mechanic ("granting it {dmg} or a defensive benefit" — Meshrin, step 7 twelve)
  const MECHANIC = /\{dc\}|\{dmg\}|\d|\b(?:Advantage|Disadvantage|Resistance|Immun\w*|Vulnerab\w*|condition|saving throw|attack roll|Hit Points|Temporary|Speed|reach|range|can't|cannot|ignores?|regains?|takes? (?:no|half|extra|double|additional)|deals? (?:extra|double|additional)|Blinded|Charmed|Deafened|Frightened|Grappled|Paralyzed|Poisoned|Prone|Restrained|Stunned|Incapacitated|Invisible|Difficult Terrain|indistinguishable|motionless|rather than|counts as)\b/i;
  const traitsAll = (Array.isArray(p.traits) ? p.traits : []).map((t) => ({ clause: str(t?.clause, 120), name: str(t?.name, 40), trigger: perTurn(clean(t?.trigger) || null, clean(t?.effect)), effect: scrubDmg(clean(t?.effect)), flavor: str(t?.flavor, 160) || null })).filter((t) => t.name && t.effect);
  // a trait is not a save (a prose save belongs in the save form — the wyrm's "must succeed on a DC 21 Dexterity saving throw" trait, step 7 twelve), and {dc} stands only where a DC stands ("within {dc} feet" is not a DC)
  // an unquantified heal is refused: it must carry {dmg} and a trigger or a limit (critic A8, 2026-10-18 — Heal the Faithful, Harbour-Mud Rising, Gleeful Growth, Waxen Reknitting)
  const healOk = (t) => { const tx = `${t.trigger ?? ''} ${t.effect}`; if (!/\b(?:regains?|restores?|heals?|recovers?)\b[^.]*\bhit points\b/i.test(tx)) return true; return /\{dmg\}/.test(tx) && (!!t.trigger || /\b(?:\d\/Day|Recharge|once)\b/i.test(tx)); };
  const traitOk = (t) => { const tx = `${t.trigger ?? ''} ${t.effect}`; return MECHANIC.test(tx) && healOk(t) && !/saving throw/i.test(tx) && !/\{dc\}\s+(?:feet|ft)\b|within \{dc\}/i.test(tx); };
  const refusedTraits = traitsAll.filter((t) => !traitOk(t));
  const traits = traitsAll.filter(traitOk).slice(0, traitSlots);
  const reactions = (Array.isArray(p.reactions) ? p.reactions : []).map((r) => ({ clause: str(r?.clause, 120), name: str(r?.name, 40), trigger: clean(r?.trigger), response: clean(r?.response) })).filter((r) => r.name && r.trigger && r.response).slice(0, 1);
  const crossRef = p.crossRef && typeof p.crossRef === 'object' && CONDITIONS.includes(p.crossRef.condition) ? { riderRow: str(p.crossRef.riderRow, 40), payoffRow: str(p.crossRef.payoffRow, 40), condition: p.crossRef.condition } : null;
  const unplaced = (Array.isArray(p.unplaced) ? p.unplaced : []).map((u) => ({ clause: str(u?.clause, 120), where: u?.where === 'languages' ? 'languages' : 'description', text: str(u?.text, 160) })).filter((u) => u.clause);
  for (const a of refusedAttacks) if (a.clause) unplaced.push({ clause: a.clause, where: 'description', text: a.flavor ?? a.name });
  for (const t of refusedTraits) if (t.clause) unplaced.push({ clause: t.clause, where: 'description', text: t.effect });
  // the rider slots: a rider is an attack row's condition; past the slot count, later riders fold to flavor
  let riders = 0; for (const a of attacksKept) if (a.rider) { riders += 1; if (riders > riderSlots) { a.flavor = [a.flavor, `(${a.rider})`].filter(Boolean).join(' '); a.rider = null; } }
  return { attacks: attacksKept, saves: saves.slice(0, 1), traits, reactions, crossRef: crossRef && crossRef.payoffRow !== crossRef.riderRow ? crossRef : null, unplaced }; // a payoff on its own rider row is pointless (the bog hound's bite, check-in 2026-10-11)
}
export function validateAuthorResponse(raw) { return !!parseAuthorResponse(raw); } // a well-formed answer with nothing to add is valid: "no row for this clause" is an answer, not a failure to retry (Meshrin's repair call, step 7 twelve)
