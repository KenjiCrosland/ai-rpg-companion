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
- trait (a passive, a style, a resource — it costs the creature NOTHING; never write "uses its Reaction" here, that is the reaction form below): { "clause", "name", "trigger": a when/while/if clause or null, "effect": one sentence; write {dc} where a save DC belongs and {dmg} where damage belongs — never a number, "imposes": one of ${CONDITIONS.join('/')} or null, "condition_relation": one of inflicts/requires/immune/self/none }.
- A row that HEALS states the Hit Points as {dmg}, the action it costs, and a limit (a trigger, "1/Day", or "Recharge 5-6"): "restores hit points to the faithful" and "after minutes" are not rows a table can run.
- reaction: { "clause", "name", "trigger": one sentence, "response": one sentence, same tokens, "imposes": one of ${CONDITIONS.join('/')} or null, "condition_relation": one of inflicts/requires/immune/self/none }.
- "imposes" ON A TRAIT OR REACTION: name the condition the row involves, or null if it involves none. A row that requires one condition and inflicts another names the one it INFLICTS.
- "condition_relation" ON A TRAIT OR REACTION: how the row relates to that condition. Exactly one of: inflicts (the row APPLIES it to a target — the only value that hands the condition out) | requires (the target must ALREADY have it for the row to work: "a creature that has the Prone condition", "a creature it is grappling") | immune (the row says the creature CANNOT be given it) | self (it lands on THIS CREATURE, not a target) | none (no condition involved; answer null for "imposes" too). A word that merely DESCRIBES is not the condition: "a frightening ruin", "a horrifying stench", "a paralysing cold" are prose, not rules — answer none unless the row names the condition as a game effect.
- A clause that is speech goes to "unplaced" with "where": "languages"; pure lore goes to "unplaced" with "where": "description". Never invent a clause the creator did not type. Never write "the ${String(name).toLowerCase()}" if ${name} is a person; write "${inline}".

Answer with ONE JSON object:
{ "attacks": [ ... ], "saves": [ ... ], "traits": [ ... ], "reactions": [ ... ], "crossRef": null, "answered": [ { "clause": "...", "row": "..." } ], "unplaced": [ { "clause": "...", "where": "languages"|"description", "text": "one line in the creator's register" } ] }

IF THE SHEET ALREADY ANSWERS A CLAUSE, SAY SO INSTEAD OF WRITING A ROW. Read THE SHEET SO FAR above. Where one of the clauses listed below is already carried by a row that is on it — the same mechanic in different words — put it in "answered" with that row's EXACT name, and write no new row for it. The words need not match: a row reading "cannot be moved against its will" answers "holds its ground", and one reading "its wounds close over" answers "knits itself back together". Answering twice is the defect this prevents. Use [] when every clause still needs a row, and never name a row that is not on the sheet.`;
}

const CONDITION_RELATIONS = ['inflicts', 'requires', 'immune', 'self', 'none'];
// THE RECORD IS HONOURED ONLY WHEN THE CALL SAYS IT INFLICTS (owner's ruling,
// 2026-10-22: "the question"). One nullable `imposes` was being asked to carry
// five different relationships, and the call answered `imposes: Deafened` for the
// Drowned Choir's One Voice, which GRANTS IMMUNITY to Deafened — a false
// `condition-duration` FAIL on a correct row. The prompt already spelled out all
// five cases, so the fix is not more instruction: it is asking the relation as its
// own enum and validating by MEMBERSHIP (the engine's half of the split).
//
// Probed alone against 15 hand-labelled rows × 3 runs
// (scripts/probe-condition-relation.mjs): 42/45 exact and **45/45 on the only
// distinction the engine acts on** — inflicts vs not.
const imposesFromRelation = (condition, relation) => {
  if (!CONDITIONS.includes(condition)) return null;
  if (relation == null) return condition;          // older answers carry no relation: unchanged behaviour
  if (!CONDITION_RELATIONS.includes(relation)) return condition; // not a value we know: fall back rather than guess
  return relation === 'inflicts' ? condition : null;
};

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
  const traitsAll = (Array.isArray(p.traits) ? p.traits : []).map((t) => ({ clause: str(t?.clause, 120), name: str(t?.name, 40), imposes: imposesFromRelation(t?.imposes, t?.condition_relation), condition_relation: CONDITION_RELATIONS.includes(t?.condition_relation) ? t.condition_relation : null, trigger: perTurn(clean(t?.trigger) || null, clean(t?.effect)), effect: scrubDmg(clean(t?.effect)), flavor: str(t?.flavor, 160) || null })).filter((t) => t.name && t.effect);
  // a trait is not a save (a prose save belongs in the save form — the wyrm's "must succeed on a DC 21 Dexterity saving throw" trait, step 7 twelve), and {dc} stands only where a DC stands ("within {dc} feet" is not a DC)
  // an unquantified heal is refused: it must carry {dmg} and a trigger or a limit (critic A8, 2026-10-18 — Heal the Faithful, Harbour-Mud Rising, Gleeful Growth, Waxen Reknitting)
  const healOk = (t) => { const tx = `${t.trigger ?? ''} ${t.effect}`; if (!/\b(?:regains?|restores?|heals?|recovers?)\b[^.]*\bhit points\b/i.test(tx)) return true; return /\{dmg\}/.test(tx) && (!!t.trigger || /\b(?:\d\/Day|Recharge|once)\b/i.test(tx)); };
  // AN ESCALATION NAMES ITS AMOUNT (critic's table read, 2026-10-25: Glacier's
  // Heart, "this bonus increases each time it applies" — no amount, unadjudicable
  // at the table; and "resets when the heart regains Hit Points" beside
  // Regeneration 15/turn, so it reset every turn). Same shape as healOk, same
  // class: this VALIDATES the model's own answer, it infers nothing about the
  // GM's words. An effect that says the bonus grows must carry {dmg} — the
  // engine's token for a stated amount — and a ceiling ("to a maximum of",
  // "up to"). What a call would catch that this will not: an escalation phrased
  // without these verbs. The audit cannot repair an authored row (rewrites touch
  // `entry.model` only), so refusing here is the only gate it has.
  const escalationOk = (t) => { const tx = `${t.trigger ?? ''} ${t.effect}`; if (!/\b(?:increases?|grows?|stacks?|doubles?|escalates?|compounds?)\b[^.]*\b(?:each|every) time\b|\b(?:each|every) time\b[^.]*\b(?:increases?|grows?|stacks?|doubles?)\b/i.test(tx)) return true; return /\{dmg\}/.test(tx) && /\b(?:to a maximum of|up to|at most|maximum)\b/i.test(tx); };
  const traitOk = (t) => { const tx = `${t.trigger ?? ''} ${t.effect}`; return MECHANIC.test(tx) && healOk(t) && escalationOk(t) && !/saving throw/i.test(tx) && !/\{dc\}\s+(?:feet|ft)\b|within \{dc\}/i.test(tx); };
  const refusedTraits = traitsAll.filter((t) => !traitOk(t));
  const traits = traitsAll.filter(traitOk).slice(0, traitSlots);
  const reactions = (Array.isArray(p.reactions) ? p.reactions : []).map((r) => ({ clause: str(r?.clause, 120), name: str(r?.name, 40), imposes: imposesFromRelation(r?.imposes, r?.condition_relation), condition_relation: CONDITION_RELATIONS.includes(r?.condition_relation) ? r.condition_relation : null, trigger: clean(r?.trigger), response: clean(r?.response) })).filter((r) => r.name && r.trigger && r.response).slice(0, 1);
  const crossRef = p.crossRef && typeof p.crossRef === 'object' && CONDITIONS.includes(p.crossRef.condition) ? { riderRow: str(p.crossRef.riderRow, 40), payoffRow: str(p.crossRef.payoffRow, 40), condition: p.crossRef.condition } : null;
  const answered = (Array.isArray(p.answered) ? p.answered : []).map((a) => ({ clause: str(a?.clause, 120), row: str(a?.row, 60) })).filter((a) => a.clause && a.row); // the engine checks the row is really on the sheet
  const unplaced = (Array.isArray(p.unplaced) ? p.unplaced : []).map((u) => ({ clause: str(u?.clause, 120), where: u?.where === 'languages' ? 'languages' : 'description', text: str(u?.text, 160) })).filter((u) => u.clause);
  for (const a of refusedAttacks) if (a.clause) unplaced.push({ clause: a.clause, where: 'description', text: a.flavor ?? a.name });
  for (const t of refusedTraits) if (t.clause) unplaced.push({ clause: t.clause, where: 'description', text: t.effect });
  // A DECLINE MUST SAY WHY (2026-10-25): a refused trait folded silently into
  // `unplaced`, so a sheet that lost its ramp to escalationOk and a sheet whose
  // call never wrote one looked identical from outside. The reason rides out
  // for the caller to trace; nothing about the refusal itself changes.
  const refused = refusedTraits.map((t) => ({ name: t.name, why: !escalationOk(t) ? 'escalation names no amount or no ceiling' : !healOk(t) ? 'heal names no amount or no limit' : 'no mechanic in the effect' }));
  // the rider slots: a rider is an attack row's condition; past the slot count, later riders fold to flavor
  let riders = 0; for (const a of attacksKept) if (a.rider) { riders += 1; if (riders > riderSlots) { a.flavor = [a.flavor, `(${a.rider})`].filter(Boolean).join(' '); a.rider = null; } }
  return { attacks: attacksKept, saves: saves.slice(0, 1), refused, traits, reactions, crossRef: crossRef && crossRef.payoffRow !== crossRef.riderRow ? crossRef : null, answered, unplaced }; // a payoff on its own rider row is pointless (the bog hound's bite, check-in 2026-10-11)
}
export function validateAuthorResponse(raw) { return !!parseAuthorResponse(raw); } // a well-formed answer with nothing to add is valid: "no row for this clause" is an answer, not a failure to retry (Meshrin's repair call, step 7 twelve)

/**
 * THE CONDITION A FINISHED ROW IMPOSES — one definition, every reader.
 *
 * The row's own `imposes` record is the truth when it has one: the call answered
 * it, validated against CONDITIONS above. Many rows have none, because a
 * condition reaches a row's text from more places than record it, and five
 * attempts to enumerate those places did not close the gap.
 *
 * So this reads the finished row as a FALLBACK. That is a parse of our own
 * canonical output, not a judgement about what a GM meant: print writes an
 * imposed condition as "has the X condition" in 220 of its 221 such phrases,
 * and the single exception sits inside an if-clause — which is the one real
 * distinction here and is excluded structurally. A condition the row merely
 * REQUIRES ("if the target is already Prone") is not one it imposes, and
 * confusing the two is what made the save pass pick the wrong stat.
 *
 * Two readers: the save-stat pass, which picks the stat print pairs with the
 * condition, and the 2014 condition gate, which decides whether that edition
 * wants a saving throw, an escape DC, or nothing.
 */
// TWO DIFFERENT LISTS, deliberately. CONDITIONS above is what the authoring
// call may CHOOSE from — a curated set the engine is happy to author. This is
// every condition the rules define, which is what a finished row might be
// carrying however it got there (print's Ghoul paralyzes; its Basilisk
// petrifies). Reading a row against the authoring list alone missed Unconscious
// and Petrified entirely.
export const ALL_CONDITIONS = ['Blinded', 'Charmed', 'Deafened', 'Exhaustion', 'Frightened', 'Grappled', 'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned', 'Unconscious'];

// REQUIRED, NOT IMPOSED — three grammars, not two. "if the target has…" and
// "already…" were covered; a RELATIVE CLAUSE was not. The deciding word is the
// relative pronoun, not the noun: "one creature within 5 ft THAT has the Prone
// condition" selects a target, while "and THE TARGET has the Prone condition"
// inflicts one, and both end in a noun. Reading the first as an imposition put
// a false `imposes: Prone` on print's own Trample and made the
// duplicate-mechanic gate fail a sheet that imposes Prone only twice.
const PRECONDITION = /\bif\b[^.]*$|\balready\b\s*$|\b(?:that|which|who)\s*$|\b(?:can't|cannot|never|immune to being|resistance to being)\s*$/i;

// AFFLICTIONS: the conditions a row inflicts ON A TARGET, which is the subset
// the duplicate-mechanic gate counts. The four left out of ALL_CONDITIONS here
// describe a creature's own state rather than something done to a target —
// a row reading "the hull has the Invisible condition" is a self-buff, and
// three of those are not the repetition the gate is looking for.
export const AFFLICTIONS = ['Grappled', 'Restrained', 'Prone', 'Incapacitated', 'Paralyzed', 'Stunned', 'Blinded', 'Poisoned', 'Frightened', 'Charmed', 'Deafened'];

/**
 * Every condition a finished row imposes. ONE DEFINITION, EVERY READER: the
 * duplicate-mechanic gate and the engine's stripping pass each grew a private
 * copy of this grammar, so widening the exclusion here fixed neither of them
 * and the gate failed a sheet the engine saw nothing wrong with.
 */
export function imposedConditions(row) {
  // the record may name one condition or several — hook-drag's victim is
  // Grappled AND Restrained, and masking the second would hide a real triple
  const rec = typeof row === 'object' ? row?.imposes : null;
  const recs = (Array.isArray(rec) ? rec : rec ? [rec] : []).map(String).filter((c) => ALL_CONDITIONS.includes(c));
  if (recs.length) return recs;
  const t = String((typeof row === 'object' ? (row?.text ?? row?.description) : row) ?? '');
  const out = new Set();
  // PRINT'S TWO-CONDITION FORM IS PLURAL (2026-10-23). "has the Blinded and
  // Restrained conditions" appears 13 times in the corpus — 8 of them the Swallow
  // row — and the singular-only pattern matched NEITHER condition, so print's own
  // swallow wording read as imposing nothing. This reader runs once and becomes the
  // field every consumer reads, so widening it here is less text-reading overall,
  // not more; it still misses a three-condition form and any wording print has not
  // used. The PRECONDITION guard below is what keeps Evasion's "can't use this
  // trait if it has the Incapacitated condition" out, and it still applies.
  for (const m of t.matchAll(/has the (\w+)(?: and (\w+))? conditions?/g)) {
    if (PRECONDITION.test(t.slice(Math.max(0, m.index - 46), m.index))) continue;
    for (const c of [m[1], m[2]]) if (c && ALL_CONDITIONS.includes(c)) out.add(c);
  }
  if (out.size) return [...out];
  // the 2014 printing says it differently: "is poisoned", "is knocked prone"
  for (const c of ALL_CONDITIONS) {
    // "or BE paralyzed" is standard 2014 phrasing for a save-or-suffer row, and it
    // was unreadable here: Ossuar's Paralyzing Touch imposed indefinite paralysis and
    // no reader saw a condition at all (critic, 2026-10-21). `be` is admitted, with
    // negation excluded below — "can't be paralyzed" and "immune to being paralyzed"
    // describe what CANNOT be done to the creature, the opposite of an imposition.
    const re = new RegExp(`\\b(?:is|are|becomes?|be)\\s+(?:knocked\\s+)?${c}\\b`, 'i');
    if (!re.test(t)) continue;
    if (PRECONDITION.test(t.slice(Math.max(0, t.search(re) - 46), t.search(re)))) continue;
    out.add(c);
  }
  return [...out];
}

export function imposedCondition(row) {
  return imposedConditions(row)[0] ?? null;
}
