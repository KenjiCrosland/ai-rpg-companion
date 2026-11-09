/**
 * THE REPAIR CALL (step 7; was the authoring call of step 5). After the template path, the model authors one row per UNCLAIMED clause INTO THE FORMS (reskin/forms.mjs)
 * and never writes a number: damage types from the closed list, conditions from the closed list, targets from the closed
 * shapes, a save's DC and every die from the engine. The chassis contributes budget and shape only. Flavor is welcome as
 * its own field; mechanics are forms. One cross-row reference per sheet is asked for — a rider one row applies and another
 * row exploits — which is where the old blocks' interlock came from.
 */
export const DAMAGE_TYPES = ['Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];
export const CONDITIONS = ['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Paralyzed', 'Poisoned', 'Prone', 'Restrained', 'Stunned'];
// A TRAIT IS A POSITIVE OR NEGATIVE PASSIVE EFFECT ON THE CREATURE (owner's
// ruling, 2026-10-30). Measured against print's 324 traits before fixing this
// vocabulary: 210 land on a rules word (a save or DC 90, Advantage 57, movement
// 43, a condition 32, senses 22, damage 21), and the other 114 are capabilities
// or limitations in plain words — Amphibious "can breathe air and water", Flyby
// "doesn't provoke an Opportunity Attack", Siege Monster "deals double damage to
// objects", against Immutable Form "can't shape-shift" and Limited
// Amphibiousness "must be submerged at least once every 4 hours to avoid
// suffocating". So a rules-WORD test would reject a third of print; the question
// goes to the call, and the engine only checks the answer is in this list.
export const PASSIVE_EFFECTS = ['ability', 'bonus', 'protection', 'threat', 'limitation', 'none'];
export const STATS = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
// A SPHERE OR CUBE TARGET CARRIES ITS ORIGIN (R10 · H1, 2026-11-03). This enum accepted
// "each creature in a 10-foot Sphere" and the sheet shipped it (G09): print always says
// where a Sphere is centred, while a Cone, Line or Emanation comes from the creature by
// convention and needs nothing. The first fix for this read the RENDERED row for a
// Sphere with no "centered on" — which is class D, meaning read off engine text where a
// declared field exists. The declared field is this one, so the refusal belongs here.
const TARGET_OK = /^(?:one creature within \d+ feet|each creature in a \d+-foot (?:Cone|Line|Emanation)|each creature in a \d+-foot (?:Sphere|Cube) centered on a point within \d+ feet|each creature within \d+ feet|one creature it can see within \d+ feet)$/;
const HAS_NUMBER = /\d/;
// print's longest trait text is 714 characters (Loathsome Limbs); 240 refused 9% of print's 324
const RULES_TEXT_CAP = 720;

/**
 * THE FORMS, ONE DEFINITION (R4 step 2). Two calls author into these: the repair call below, which writes a
 * row per unanswered clause at the end of generation, and `buildSeatPrompt`, which writes the ONE row a
 * signature seat needs when the fit call refused every template the catalog offered. The forms are the
 * contract `parseAuthorResponse` validates, so a second copy of this text would drift from the parser that
 * reads it. `attackCap` of 0 omits the attack form entirely: the engine prices an attack row off one of the
 * creature's own weapon rows, so a caller with no such row to clone must not invite one.
 */
export function formsSpec({ name, inline, attackCap = 2 }) {
  return [`THE FORMS`,
    ...(attackCap > 0 ? [`- attack (a weapon or body part): { "key": null, "clause", "name", "mode": "melee"|"ranged"|"both", "type": one of ${DAMAGE_TYPES.join('/')}, "rider": one of ${CONDITIONS.join('/')} or null, "flavor": optional } — up to ${attackCap} new rows.`] : []),
    `- save (a curse, a breath, a shove, a gaze): { "clause", "name", "stat": one of ${STATS.join('/')}, "target": "one creature within N feet" | "each creature in a N-foot Cone|Sphere|Line|Emanation", "damage": true|false, "type": one of the damage types or null, "condition": one of the conditions or null, "movement": "pushed up to N feet"|"pulled up to N feet"|null, "success": "half"|"none", "recharge": true|false }.`,
    `- trait (a passive, a style, a resource — it costs the creature NOTHING; never write "uses its Reaction" here, that is the reaction form below): { "clause", "name", "trigger": a when/while/if clause or null, "effect": one sentence; write {dc} where a save DC belongs and {dmg} where damage belongs — never a number, "imposes": one of ${CONDITIONS.join('/')} or null, "condition_relation": one of inflicts/requires/immune/self/none, "acts": the name of another creature or object this row makes act, or null, "heals": true if it restores this creature Hit Points every round for free, "mechanics": how many separate things a table must do, "quantities": how many numbers the row promises, "passive_effect": one of ${PASSIVE_EFFECTS.join('/')} }.`,
    `- A row that HEALS states the Hit Points as {dmg}, the action it costs, and a limit (a trigger, "1/Day", or "Recharge 5-6"): "restores hit points to the faithful" and "after minutes" are not rows a table can run.`,
    `- reaction: { "clause", "name", "trigger": one sentence, "response": one sentence, same tokens, "imposes": one of ${CONDITIONS.join('/')} or null, "condition_relation": one of inflicts/requires/immune/self/none, "acts": the name of another creature or object this row makes act, or null, "heals": true if it restores this creature Hit Points every round for free, "mechanics": how many separate things a table must do, "quantities": how many numbers the row promises }.`,
    `- "acts" ON A TRAIT OR REACTION: name anything OTHER than this creature that your row makes act — attack, rise, move, carry, obey — exactly as the sheet above names it, or null. A table can only run it if that thing is a row on the sheet with rules of its own; if it is not, rewrite the row so this creature does the work. (A row that raises "a spore-puppet" needs a spore-puppet on the sheet.)`,
    `- "heals" ON A TRAIT OR REACTION: true if the row gives this creature Hit Points back on its own, every round, with no action spent; false otherwise. A one-off heal, a heal that costs an action, and a heal on another creature are all false.`,
    `- "quantities" ON A TRAIT OR REACTION: how many separate NUMBERS the row needs a table to know — every damage amount, every distance or area size, every bonus or penalty. Count them and answer the number. Then WRITE every one of them: {dmg} for damage the engine should fill, {dc} for a save DC, and a literal number for a distance or an area ("a 15-foot Emanation", "within 30 feet"). A row that promises a number and does not write it cannot be run at a table and is refused — "gains Temporary Hit Points" with no amount, "an Emanation" with no size, "deals extra Fire damage" with no amount. If the row needs no numbers at all, answer 0. A BONUS YOU ONLY DESCRIBE IS STILL A NUMBER: "deals extra Fire damage", "gains Temporary Hit Points", "is fiercer while Bloodied" each need an amount a table can read, so COUNT them. If you cannot give the amount as {dmg}, do not promise it.`,
    `- "mechanics" ON A TRAIT OR REACTION: how many separate things the row makes a table do — count them, and answer the number. One row, one mechanic: a row that turns a blow back AND steps in front of an ally is two, a row that hides it AND heals it is two. Write the one that matters and leave the other out; we take only rows that answer 1.`,
    `- "imposes" ON A TRAIT OR REACTION: name the condition the row involves, or null if it involves none. A row that requires one condition and inflicts another names the one it INFLICTS.`,
    `- "passive_effect" ON A TRAIT: a trait must change what this creature CAN or CANNOT do. Name which, exactly one of: ability (it can do something other creatures cannot — breathe water, fly past without being struck at, pinpoint metal through stone) | bonus (it rolls better or hits harder under a stated circumstance) | protection (it resists, is immune to, or cannot be given something) | threat (merely standing near it, or striking it, costs the other creature something) | limitation (it CANNOT do something, or pays a price others do not — it can't shape-shift, it must submerge every few hours, it suffers in sunlight) | none. Answer NONE when the row only DESCRIBES the creature — how it waits, watches, perches, stalks, broods or looks. That is prose, not a trait, and we will drop the row: a trait with no positive and no negative effect on the creature is a line a GM cannot run (owner's ruling, 2026-10-30; shipped as the Dayvault Warden's "Patience", which said it "waits motionless on its perch, watching its prey, without taking any action").`,
    `- "condition_relation" ON A TRAIT OR REACTION: how the row relates to that condition. Exactly one of: inflicts (the row APPLIES it to a target — the only value that hands the condition out) | requires (the target must ALREADY have it for the row to work: "a creature that has the Prone condition", "a creature it is grappling") | immune (the row says the creature CANNOT be given it) | self (it lands on THIS CREATURE, not a target) | none (no condition involved; answer null for "imposes" too). A word that merely DESCRIBES is not the condition: "a frightening ruin", "a horrifying stench", "a paralysing cold" are prose, not rules — answer none unless the row names the condition as a game effect.`,
    `- A clause that is speech goes to "unplaced" with "where": "languages"; pure lore goes to "unplaced" with "where": "description". Never invent a clause the creator did not type. Never write "the ${String(name).toLowerCase()}" if ${name} is a person; write "${inline}".`,
  ].join('\n');
}

/** THE REPAIR PASS (step 6): the sheet exists; these clauses have no row. Same forms, same rules, new rows only. */
export function buildRepairPrompt({ name, inline, clauses, cr, sheet, attackCap = 2, lacks = [], taken = [] }) {
  return `You are repairing the ABILITIES of a D&D monster: the sheet below is finished except that some of what its creator typed has no row yet. Write ONE row per listed clause, into closed forms, in the creator's own register. You never write a number: no attack bonus, no damage dice, no DC — the engine prices every row.

THE CREATURE: ${name} (${inline}), CR ${cr}.
THE SHEET SO FAR (keep every row; add to it — numbers are the engine's):
${sheet}

THE CREATOR'S CLAUSES WITH NO ROW:
${clauses.map((c, i) => `${i + 1}. ${c.text}`).join('\n')}${taken.length ? `\n\nNAMES ALREADY ON THE SHEET — never reuse one, every new row needs its own name: ${taken.map((n) => `"${n}"`).join(', ')}.` : ''}${lacks.length ? `\n\nTHE CREATOR SAID IT DOES NOT HAVE: ${lacks.map((l) => `"${l}"`).join(', ')}. No row you write may grant any of these in any wording — a creature that "never holds" gets no Grappled condition, one with "no magic at all" casts nothing.` : ''}

${formsSpec({ name, inline, attackCap })}

Answer with ONE JSON object:
{ "attacks": [ ... ], "saves": [ ... ], "traits": [ ... ], "reactions": [ ... ], "crossRef": null, "answered": [ { "clause": "...", "row": "..." } ], "unplaced": [ { "clause": "...", "where": "languages"|"description", "text": "one line in the creator's register" } ] }

IF THE SHEET ALREADY ANSWERS A CLAUSE, SAY SO INSTEAD OF WRITING A ROW. Read THE SHEET SO FAR above. Where one of the clauses listed below is already carried by a row that is on it — the same mechanic in different words — put it in "answered" with that row's EXACT name, and write no new row for it. The words need not match: a row reading "cannot be moved against its will" answers "holds its ground", and one reading "its wounds close over" answers "knits itself back together". Answering twice is the defect this prevents. Use [] when every clause still needs a row, and never name a row that is not on the sheet.`;
}

/**
 * ONE ROW FOR ONE SEAT (R4, owner's decisions 2026-11-02). The fit call has been shown every template the
 * catalog holds for this seat and answered `none` with `declined_because: no_fit` — "nothing offered carries
 * the mechanic". Measured across three runs, 220 of 220 refusals that reached the nearest-template fallback
 * answered exactly that, so re-asking cannot help (the clause-first retry was measured at 34 calls for 6
 * successes and retired): the menu is missing the SHAPE. So the seat writes the row itself, into the same
 * closed forms the repair call above uses and through the same parser.
 *
 * No attack form is offered: the engine prices an attack row off one of the creature's own weapon rows, and a
 * seat has none to clone, so what a seat can hold is a save, a trait or a reaction. An empty answer is a real
 * answer — the caller still has the nearest template to fall back on.
 *
 * THE SAVE-STAT BLOCK MIRRORS `saveStatsFor` (templates.mjs), which is the table the checker's `save-fit`
 * gate enforces, because the first live run of this path shipped the Arrears Collector's Crushing Ledger — a
 * Strength save for 18 (4d8) Bludgeoning in an Emanation — and failed on it. One sentence of the handoff's
 * wording is deliberately NOT here: "a magical or mental effect saves by the faculty it attacks". Published
 * monsters do write those that way (11 of the 97 published rows that save, damage and impose nothing sit on
 * Strength, Wisdom or Intelligence — the Gold Dragon's Weakening Breath, the Sea Hag's Death Glare, the
 * Aboleth's Consume Memories), but those rows are EXEMPT from the gate (`e.print`) and ours are not. Telling
 * the call to write them that way would produce exactly the failure this block exists to prevent. The
 * discrepancy between the gate and its own corpus is the owner's open question, recorded in the R4 results
 * block; this prompt follows the gate.
 */
/**
 * ONE FREE ROW, RE-AUTHORED AGAINST WHAT THE AUDIT SAID (owner's ruling, 2026-11-05).
 *
 * A free row is a row nothing in the GM's words asked for — the engine offered it. The
 * owner ruled such a row is a FEATURE and is to be REPAIRED, not evicted: *"a free row
 * provides pleasant surprises. As long as it's sound and makes sense within the action
 * economy and is not a dead row it should go in. Repair call is fine, we may as well add
 * flavor which could prevent a new block generation."* A repair call is cheap; a GM who
 * finds the block flat and regenerates it is not.
 *
 * Why this is a re-AUTHOR and not a rewrite. The audit already has a rewrite actuator,
 * but it carries a rewrite only for principle 4 — copy-editing seams — so the defects
 * that prompted the ruling never get one: Vashka's Lacquered Line gave allies "the same
 * bonus to AC that Vashka's armor and shield provide" (a number the GM cannot compute),
 * and an Ordained Exile trait answered every speaker "with a Boulder attack" (unlimited,
 * no action cost). Those are principles 1-2.
 *
 * Sending it back through THESE forms is what fixes them, rather than any instruction to
 * be careful: the model writes no numbers here — the engine prices every `{dmg}` and
 * `{dc}` — so an uncomputable bonus cannot survive the round trip, and a form carries its
 * own action economy, so an effect must declare what it costs. The three tests in the
 * ruling map onto the forms: sound (the engine's numbers), action economy (the form's
 * kind and gate), not a dead row (the row must still be worth choosing).
 *
 * The row KEEPS ITS NAME. A name/text mismatch is the audit's rename actuator's job, and
 * it already works — nine sheets on the 2026-11-05 sweep took an audit rename.
 */
export function buildFreeRowFixPrompt({ name, inline, cr, sheet, row, problems = [], kind = 'an action', taken = [], lacks = [] }) {
  return `You are REPAIRING one ability of a D&D monster. The sheet below is finished, and one row on it does not work at a table. Rewrite that ONE row into the closed forms below, keeping what makes it interesting. You never write a number: no attack bonus, no damage dice, no DC — the engine prices every row.

THE CREATURE: ${name} (${inline}), CR ${cr}.
THE SHEET AS IT STANDS (every other row stays exactly as it is; never name a row that is not on it):
${sheet}

THE ROW TO REPAIR — it is called **"${row.name}"** and currently reads:
${row.text}

WHAT IS WRONG WITH IT:
${problems.map((x) => `- ${x}`).join('\n')}

KEEP THE NAME "${row.name}" EXACTLY. Keep the idea — this row exists because it was a nice surprise on this creature, and a GM who likes it should still get it. Change only what makes it unrunnable.

THREE TESTS YOUR REPAIR MUST PASS:
1. SOUND. Everything a GM needs is on the row. No bonus, radius, duration or amount that the GM would have to work out from somewhere else — if a number is needed, use the form's token and let the engine write it.
2. THE ACTION ECONOMY. The row costs something real. A trait that hands out a free attack whenever a condition is met, with no action and no limit, is the defect this test exists to catch — if an effect should fire often, gate it (a recharge, once per turn, or the creature's action).
3. NOT A DEAD ROW. It must be worth choosing on the creature's turn, or worth having as a passive. A row a GM would never pick is as bad as one they cannot run.

IT IS ${kind}. Write exactly one row, of that kind, and leave the other arrays empty.${taken.length ? `\n\nNAMES ALREADY ON THE SHEET — the repaired row keeps "${row.name}" and must not take any other: ${taken.map((n) => `"${n}"`).join(', ')}.` : ''}${lacks.length ? `\n\nTHE CREATOR SAID IT DOES NOT HAVE: ${lacks.map((l) => `"${l}"`).join(', ')}. The repaired row may not grant any of these in any wording.` : ''}

${formsSpec({ name, inline, attackCap: 0 })}`;
}

export function buildSeatPrompt({ name, inline, cr, sheet, idea, missing = '', kind = 'an action', taken = [], lacks = [], clause = '' }) {
  return `You are writing ONE ability for a D&D monster — the one ability it is still missing. Write it into the closed forms below, in the creature's own register. You never write a number: no attack bonus, no damage dice, no DC — the engine prices the row.

THE CREATURE: ${name} (${inline}), CR ${cr}.
THE SHEET SO FAR (complete but for this one ability; never restate a row it already carries, and never name a row that is not on it):
${sheet}

THE ABILITY TO WRITE, in the words it was described in:
${idea}${clause ? `

THE CLAUSE THIS ROW MUST ANSWER — the creator typed these words and nothing on the sheet answers them yet: **"${clause}"**. The row you write is for this and nothing else. A row that is good in itself and answers something else is the wrong row.` : ''}${missing ? `\n\nWHY YOU ARE WRITING IT RATHER THAN PICKING A READY-MADE ONE — no ready-made ability could do this: ${missing}` : ''}

IT IS ${kind}. Write exactly one row, of that kind, and leave the other arrays empty.${taken.length ? `\n\nNAMES ALREADY ON THE SHEET — never reuse one, the new row needs a name of its own: ${taken.map((n) => `"${n}"`).join(', ')}.` : ''}${lacks.length ? `\n\nTHE CREATOR SAID IT DOES NOT HAVE: ${lacks.map((l) => `"${l}"`).join(', ')}. The row may not grant any of these in any wording — a creature that "never holds" gets no Grappled condition, one with "no magic at all" casts nothing.` : ''}

${formsSpec({ name, inline, attackCap: 0 })}

THE SAVE'S STAT. Published monsters pair a save with the stat whose faculty the effect attacks, and the same pairings are held to here:
- the row deals damage — Dexterity, or Constitution. Not Strength and not Wisdom, whatever condition rides along with the damage.
- the row's whole effect is moving the target, a shove or a pull or a haul — Strength.
- the row applies a condition and deals no damage — Strength for Prone, Grappled or Restrained; Constitution for Poisoned, Blinded, Deafened, Stunned or Paralyzed; Wisdom for Frightened or Charmed.
- the row does none of those — whichever stat its own fiction asks for.

Answer with ONE JSON object, the row in the one array its form belongs to:
{ "attacks": [], "saves": [ ... ], "traits": [ ... ], "reactions": [ ... ], "crossRef": null, "unplaced": [] }

IF THE ABILITY CANNOT BE WRITTEN AS ONE OF THESE FORMS — it is speech, or lore, or it needs a second row beside it to make sense — answer with every array empty and say where it belongs in "unplaced". That is a real answer and costs nothing: the sheet has a ready-made ability to fall back on, and a row that does not work at a table is worse than one that is merely close.`;
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
// THE CONDITION A ROW REQUIRES IS RECORDED, NOT DISCARDED (forty #2, 2026-11-02).
// `imposesFromRelation` correctly returns null when the call says `requires` — the
// row does not hand the condition out — and the NAME went nowhere, so a row that
// needs its target already Grappled left no trace of needing anything. The
// consumer in generate.mjs read `t.condition`, a field no trait or reaction form
// has ever carried, so `requireOn` has never once fired for an authored row: the
// Chalk-Hound's Daubing Cling shipped requiring a grapple no row on its sheet
// imposes, and the guard written for exactly that had nothing to read. The call's
// answer is kept here, validated by membership like everything else.
const requiredConditionFrom = (condition, relation) => (CONDITIONS.includes(condition) && relation === 'requires' ? condition : null);
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
  // RULES TEXT IS NEVER AMPUTATED (forty #2, 2026-11-02). This sliced at 240
  // characters MID-WORD and the renderer then put a full stop on the stump: the
  // Chalk-Hound's Daubing Cling came out "…a creature pulled into an o." — 288
  // characters of rendered text, which is exactly its 44-character trigger plus a
  // 240-character amputation. It is invisible from the output, because the stump
  // ends in a period like any finished sentence.
  //
  // The CAP was wrong too, not only the slicing. Measured against print
  // (srd52-monsters.json, 324 trait rows): median 95, p95 362, **max 714**
  // (Loathsome Limbs), and **28 of 324 — 9% — run past 240**. So a refusal at 240
  // would refuse rows print itself writes. The cap is print's own longest, and a
  // form past it is REFUSED with its reason rather than cut.
  const clean = (s) => String(typeof s === 'string' ? s.trim() : '').replace(/\d+ \(\d+d\d+(?: [+-] \d+)?\)/g, '{dmg}').replace(/\bDC \d+\b/g, 'DC {dc}');
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
  const traitsAll = (Array.isArray(p.traits) ? p.traits : []).map((t) => ({ clause: str(t?.clause, 120), name: str(t?.name, 40), imposes: imposesFromRelation(t?.imposes, t?.condition_relation), requiresConditionNamed: requiredConditionFrom(t?.imposes, t?.condition_relation), acts: str(t?.acts, 60) || null, heals: t?.heals === true, mechanics: Number.isFinite(Number(t?.mechanics)) ? Number(t.mechanics) : null, quantities: Number.isFinite(Number(t?.quantities)) ? Number(t.quantities) : null, condition_relation: CONDITION_RELATIONS.includes(t?.condition_relation) ? t.condition_relation : null, trigger: perTurn(clean(t?.trigger) || null, clean(t?.effect)), effect: scrubDmg(clean(t?.effect)), flavor: str(t?.flavor, 160) || null,
    // AN EXPLICIT "none" DROPS THE ROW; A MISSING ANSWER DOES NOT. The call saying
    // "this only describes the creature" is an answer and we act on it. The field
    // absent means the call failed or is an older shape, and a failed call never
    // costs a row — the house rule's fallback direction (a word list, or here a
    // silence, "acts as a fallback only when the call fails, never as a tiebreaker
    // against it").
    passive_effect: PASSIVE_EFFECTS.includes(t?.passive_effect) ? t.passive_effect : null })).filter((t) => t.name && t.effect && t.passive_effect !== 'none');
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
  // THE DECLARED ANSWER DECIDES, AND THE WORD LIST IS THE FALLBACK (roadmap R3.3,
  // 2026-11-01; measured against print). `MECHANIC` was the gate on whether a
  // trait has a mechanical effect at all — and it refuses **67 of print's own 324
  // trait rows, 21%**: Amphibious ("The dragon can breathe air and water"),
  // Spider Climb, the Bugbear Stalker's Abduct, the Aboleth's Probing Telepathy.
  // Not one of those carries a word on the list, and every one of them changes
  // what the creature can do.
  //
  // The form already asks the model that exact question — `passive_effect`, one of
  // ability/bonus/protection/threat/limitation/none — so the word list was a
  // second, worse answer overruling a declared one (§2's class D). An explicit
  // `none` still drops the row: that is the call saying "this only describes the
  // creature", and we act on it. `MECHANIC` now runs ONLY where the call answered
  // nothing, which is the direction the house rule sets for a failed call.
  //
  // The other three tests stay, because each is a specific SOUNDNESS rule rather
  // than a reading of meaning: a trait is not a save (a prose save belongs in the
  // save form, which is fields-in and rendered by the engine), `{dc}` stands only
  // where a DC stands, a heal names its amount and limit, an escalation names its
  // ceiling.
  // A CONDITION THE GAME DOES NOT HAVE IS NOT A CONDITION (forty #4, #13). The
  // Toll-Bell Wraith shipped "the toll-bell wraith is not subject to the sleep
  // condition and cannot be put to sleep" — there is no sleep condition in 5e, so the
  // sentence means nothing at a table. This reads the closed list the engine already
  // owns (`ALL_CONDITIONS`), on the one phrase that claims a condition exists: "the X
  // condition". Nothing is inferred about meaning — the row either names a real
  // condition or it names none.
  const bogusCondition = (t) => {
    for (const m of String(`${t.trigger ?? ''} ${t.effect ?? ''} ${t.response ?? ''}`).matchAll(/\bthe ([A-Za-z]+) condition\b/g)) {
      if (!ALL_CONDITIONS.some((c) => c.toLowerCase() === m[1].toLowerCase())) return m[1];
    }
    return null;
  };
  // PRINT NEVER WRITES "the first time each turn" (0 of 329, measured 2026-11-03).
  // It is not a style nit: the phrase means the row fires once on EVERY creature's
  // turn, so at a four-player table it resolves five times a round. The gate forty
  // shipped Brother Halric's Blood-Sworn Radiance — an area of damage plus a heal,
  // on every creature's turn, at CR 3. Print's once-a-round idiom is "once on each of
  // ITS turns", which names whose turn it is; `perTurn` above already writes that one.
  // The row is refused, never rewritten (the critic's top line, forty #4).
  const firstTimeEachTurn = (x) => /\bthe first time each turn\b/i.test(`${x?.trigger ?? ''} ${x?.effect ?? ''} ${x?.response ?? ''}`);
  // AND NO PRINT ROW BOTH DEALS DAMAGE AND HEALS (0 of 329). `heals` is the call's own
  // declared field and `{dmg}` is the engine's own token, so this reads no meaning off
  // prose. Halric's row did both in one pulse; print splits them across rows.
  // TWO tokens, not one: a heal writes its own amount as `{dmg}` too ("it regains {dmg}
  // Hit Points"), so testing for the token's presence refused every heal on the sheet.
  // The pair is what print never does — damage dealt AND hit points restored in one row.
  const damagesAndHeals = (x) => x?.heals === true && (`${x?.effect ?? ''} ${x?.response ?? ''}`.match(/\{dmg\}/g) ?? []).length >= 2;
  // A ROW STATES EVERY NUMBER IT PROMISES (the critic's top Fix cause all week,
  // 2026-11-03). Four rows across one forty and the Pumpkin set promised a quantity and
  // never gave it: the Hydra's Knitting Flesh "gains Temporary Hit Points" with no
  // amount; Cracked Candleflare's "an Emanation" with no size AND "fiercer while
  // Bloodied" with no number; Ember Regrowth's "extra Fire damage" with no amount.
  //
  // THE CALL COUNTS, THE ENGINE CHECKS — the `mechanics` contract, applied to numbers.
  // A word list was the alternative and was refused: two of those three rows DO carry a
  // number elsewhere ("10 (3d6) Fire damage"), so "does this row contain a number" passes
  // all three, and catching them by prose would mean a verb list for every way English
  // promises a quantity — the same open-ended list that let "recharges" walk past
  // `danglingRefIn` for weeks.
  //
  // Counting is on EXPRESSIONS, not digits: "10 (3d6) Fire damage" is one quantity and
  // three numerals. A missing answer passes, as every other declared field's does.
  const quantitiesStated = (x) => (String(`${x?.trigger ?? ''} ${x?.effect ?? ''} ${x?.response ?? ''}`)
    .replace(/\d+\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\)/g, '#')  // a filled damage expression
    .replace(/\{dmg\}|\{dc\}/g, '#')                        // an unfilled engine slot
    .replace(/\d+d\d+/g, '#')
    .replace(/\b\d+(?:-foot|\s*feet|\s*ft\.)/g, '#')
    .replace(/\b\d+\b/g, '#')
    .match(/#/g) ?? []).length;
  const quantitiesOk = (x) => !Number.isFinite(Number(x?.quantities)) || Number(x.quantities) <= quantitiesStated(x);
  // A SAVE'S OUTCOME IS A SAVE TOO (critic, 2026-11-04). This tested for the words
  // "saving throw", so a row that skipped the form and wrote only its RESULT slipped
  // through: the gate forty's Pit Fiend shipped "Collateral Word", whose effect turns on
  // "on a failed save" while naming neither the ability nor a DC — a GM cannot run it.
  // The outcome phrasings are the same defect as the form and refuse for the same
  // reason: a trait is not a save. 1 of 523 authored rows in the saved runs, and it is
  // that row, so the widening refuses the defect and nothing else.
  const traitIsSave = (t) => /saving throw|\bon a (?:failed|successful) save\b|\bfails? the save\b|\bsucceeds? on the save\b/i.test(`${t.trigger ?? ''} ${t.effect}`);
  const dcMisused = (t) => /\{dc\}\s+(?:feet|ft)\b|within \{dc\}/i.test(`${t.trigger ?? ''} ${t.effect}`);
  // ONE DEFINITION FOR THE VERDICT AND ITS REASON (2026-11-01). The reason was
  // computed separately from the test and had drifted: every refusal that was not
  // a heal or an escalation reported "no mechanic in the effect", so a trait
  // refused for carrying a saving throw lied about why. A decline that lies is
  // worse than one that is silent — it sends the next reader to the wrong gate.
  const overCap = (x) => Math.max(String(x?.trigger ?? '').length, String(x?.effect ?? '').length, String(x?.response ?? '').length) > RULES_TEXT_CAP;
  // ONE ROW, ONE MECHANIC (the critic, forty #4: four run-on traits — Shallows Shroud
  // welded invisibility to regeneration in one 70-word sentence, Ringing Retort spliced
  // a reflect to an intercept). The call counts its own mechanics and the engine takes
  // only rows that answer 1. NOT a word count: print writes 714-character traits that
  // are one mechanic. A missing answer is an older shape and passes, the way every
  // other declared field's absence does.
  const tooManyMechanics = (x) => (x?.mechanics != null && x.mechanics > 1 ? x.mechanics : null);
  const traitWhy = (t) => (tooManyMechanics(t) ? `the call counts ${tooManyMechanics(t)} mechanics in one row — one row, one mechanic`
    : bogusCondition(t) ? `it names "the ${bogusCondition(t)} condition", which is not a condition in this game`
    : !quantitiesOk(t) ? `the call counts ${t.quantities} number(s) the row promises and only ${quantitiesStated(t)} are written — a promised amount, area or bonus with no number cannot be run`
    : firstTimeEachTurn(t) ? 'it fires "the first time each turn", which print never writes (0 of 329) — on every creature\'s turn is five times a round at a four-player table'
    : damagesAndHeals(t) ? 'it deals damage and heals in one row, which no printed block does (0 of 329)'
    : overCap(t) ? `the trigger or effect runs past ${RULES_TEXT_CAP} characters, longer than any trait print writes — it is refused rather than cut mid-word`
    : traitIsSave(t) ? 'a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence'
    : dcMisused(t) ? '{dc} is written where a distance belongs, not where a DC belongs'
      : !healOk(t) ? 'heal names no amount or no limit'
        : !escalationOk(t) ? 'escalation names no amount or no ceiling'
          : !t.passive_effect && !MECHANIC.test(`${t.trigger ?? ''} ${t.effect}`) ? 'the call named no passive effect and the sentence states no rule'
            : null);
  const traitOk = (t) => traitWhy(t) === null;
  const refusedTraits = traitsAll.filter((t) => !traitOk(t));
  const traits = traitsAll.filter(traitOk).slice(0, traitSlots);
  // A REACTION'S REFUSAL CARRIES ITS REASON TOO (2026-11-02). Reactions were
  // filtered silently on `name && trigger && response`, so a reaction dropped for
  // any reason looked identical to a call that wrote none — the same blindness the
  // trait refusals were given a reason for on 2026-10-25.
  const reactionsAll = (Array.isArray(p.reactions) ? p.reactions : []).map((r) => ({ clause: str(r?.clause, 120), name: str(r?.name, 40), imposes: imposesFromRelation(r?.imposes, r?.condition_relation), requiresConditionNamed: requiredConditionFrom(r?.imposes, r?.condition_relation), acts: str(r?.acts, 60) || null, heals: r?.heals === true, mechanics: Number.isFinite(Number(r?.mechanics)) ? Number(r.mechanics) : null, quantities: Number.isFinite(Number(r?.quantities)) ? Number(r.quantities) : null, condition_relation: CONDITION_RELATIONS.includes(r?.condition_relation) ? r.condition_relation : null, trigger: clean(r?.trigger), response: clean(r?.response) }));
  const reactionWhy = (r) => (tooManyMechanics(r) ? `the call counts ${tooManyMechanics(r)} mechanics in one row — one row, one mechanic`
    : bogusCondition(r) ? `it names "the ${bogusCondition(r)} condition", which is not a condition in this game`
    : !r.name ? 'the call named no row'
    : !r.trigger || !r.response ? 'a reaction needs both a trigger and a response'
      : !quantitiesOk(r) ? `the call counts ${r.quantities} number(s) the row promises and only ${quantitiesStated(r)} are written — a promised amount, area or bonus with no number cannot be run`
      : firstTimeEachTurn(r) ? 'it fires "the first time each turn", which print never writes (0 of 329)'
      : damagesAndHeals(r) ? 'it deals damage and heals in one row, which no printed block does (0 of 329)'
      : overCap(r) ? `the trigger or response runs past ${RULES_TEXT_CAP} characters, longer than any reaction print writes — it is refused rather than cut mid-word`
        : null);
  const refusedReactions = reactionsAll.filter((r) => reactionWhy(r) !== null);
  const reactions = reactionsAll.filter((r) => reactionWhy(r) === null).slice(0, 1);
  const crossRef = p.crossRef && typeof p.crossRef === 'object' && CONDITIONS.includes(p.crossRef.condition) ? { riderRow: str(p.crossRef.riderRow, 40), payoffRow: str(p.crossRef.payoffRow, 40), condition: p.crossRef.condition } : null;
  const answered = (Array.isArray(p.answered) ? p.answered : []).map((a) => ({ clause: str(a?.clause, 120), row: str(a?.row, 60) })).filter((a) => a.clause && a.row); // the engine checks the row is really on the sheet
  const unplaced = (Array.isArray(p.unplaced) ? p.unplaced : []).map((u) => ({ clause: str(u?.clause, 120), where: u?.where === 'languages' ? 'languages' : 'description', text: str(u?.text, 160) })).filter((u) => u.clause);
  for (const a of refusedAttacks) if (a.clause) unplaced.push({ clause: a.clause, where: 'description', text: a.flavor ?? a.name });
  for (const t of refusedTraits) if (t.clause) unplaced.push({ clause: t.clause, where: 'description', text: t.effect });
  // A DECLINE MUST SAY WHY (2026-10-25): a refused trait folded silently into
  // `unplaced`, so a sheet that lost its ramp to escalationOk and a sheet whose
  // call never wrote one looked identical from outside. The reason rides out
  // for the caller to trace; nothing about the refusal itself changes.
  const refused = [...refusedTraits.map((t) => ({ name: t.name, why: traitWhy(t) })), ...refusedReactions.map((r) => ({ name: r.name || '(unnamed reaction)', why: reactionWhy(r) }))]; // one definition: the reason IS the test
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
// A SIZE GATE IS NOT A PRECONDITION (2026-11-01). `PRECONDITION`'s first arm is
// "an `if` appears earlier in this sentence", and it earns its keep on exactly one
// print row — the Evasion-style "It can't use this trait if it has the
// Incapacitated condition". Measured against the corpus, 47 of the 49 `if` clauses
// standing before "has the X condition" are a SIZE restriction on the imposition
// ("If the target is a Large or smaller creature, it has the Prone condition", 24
// times; Medium 18; Huge 5) or an HP threshold, and every one of those is a real
// imposition. So that arm was suppressing 47 true readings to catch 1.
//
// The restriction clause is removed from the window before the guard runs, which
// leaves the guard's one real case intact. Both wordings are covered: print's "if
// the target is a Large or smaller creature" and our donors' "if it is Large or
// smaller". Closed vocabulary (print's six sizes), print's own grammar, no prose.
const SIZE_OR_HP_GATE = /\bif\s+(?:the target|it)\s+(?:is\s+(?:an?\s+)?(?:Tiny|Small|Medium|Large|Huge|Gargantuan)\s+or\s+(?:smaller|larger)(?:\s+creature)?|has\s+\d+\s+Hit\s+Points\s+or\s+(?:fewer|less))\s*,?\s*/gi;
const unguarded = (window) => String(window).replace(SIZE_OR_HP_GATE, '');
const PRECONDITION = /\bif\b[^.]*$|\balready\b\s*$|\b(?:that|which|who)\s*$|\b(?:can't|cannot|never|immune to being|resistance to being)\s*$/i;

// AFFLICTIONS: the conditions a row inflicts ON A TARGET, which is the subset
// the duplicate-mechanic gate counts. The four left out of ALL_CONDITIONS here
// describe a creature's own state rather than something done to a target —
// a row reading "the hull has the Invisible condition" is a self-buff, and
// three of those are not the repetition the gate is looking for.
// THE CONDITIONS THAT TAKE A CREATURE OUT OF THE FIGHT, ONE DEFINITION (2026-11-09).
// The engine's dead-control block and the checker's `gate-fit` rule each carried their own copy
// of this list, and they disagreed: the engine SKIPS a KO condition (a row that grapples or
// paralyses is worth an action by itself), the checker had no such exclusion — so it failed a
// grapple-and-drag row on three `typed40` runs running (Death Roll, Reel In, Debtor's Pin, all
// three imposing Grappled, all three ours rather than print's).
//
// Print's warrant for the shape: of 329 blocks, exactly 3 carry an at-will no-damage condition
// action on a sheet with no Multiattack — the Brass Dragon Wyrmling's Sleep Breath, the Harpy's
// Luring Song, the Homunculus's Bite — and ALL THREE impose a KO condition. Those rows do not
// fail the live gate, because a print row carries `print: true` and the rule skips it; they DO
// fail when print is scored as a sheet, which is how this was measured and how the release bar's
// print no-op check reads print.
//
// It lives here because `author.mjs` imports nothing and already owns the condition vocabulary
// (`AFFLICTIONS`, `CONDITIONS`), and both readers already import it. `sheet-lints.mjs` was the
// first attempt and is wrong: it imports FROM the checker, so the checker cannot import it back.
export const KO_CONDITIONS = /\b(?:Paralyzed|Stunned|Incapacitated|Unconscious|Petrified|Restrained|Grappled)\b/;

export const AFFLICTIONS = ['Grappled', 'Restrained', 'Prone', 'Incapacitated', 'Paralyzed', 'Stunned', 'Blinded', 'Poisoned', 'Frightened', 'Charmed', 'Deafened'];
// THE CONDITIONS THAT TAKE A TURN AWAY. Print never puts one of these on a Bonus
// Action: 0 of 329 blocks, measured 2026-11-03, where 15 bonus actions DO impose a
// condition (Behir/Swallow, Cloaker/Moan, Pirate Captain's Charm) and not one of them
// denies a turn. The gate forty shipped the Mirebind Witch stunning a target 60 feet
// away as a bonus action, every turn, with no limit — the critic's hottest sheet.
// NOT a ceiling on turn-denial itself: print imposes these at will from an ACTION 16
// times below CR 10 (Ghoul/Claw at CR 1, Harpy/Luring Song at CR 1, Chuul at CR 4),
// which is why the proposed "recharge or X/day below CR 10" rule was refused twice.
// The bonus action is the part print never does.
export const TURN_DENIAL = ['Stunned', 'Paralyzed', 'Incapacitated'];

/**
 * Is damage over an AREA the point of this row? ONE DEFINITION, EVERY READER —
 * the same reason `imposedConditions` lives here.
 *
 * Two copies of this grew: the engine's save-stat pass (generate.mjs) and the
 * checker's save-fit gate. They are the input to `saveStatsFor`, which decides
 * whether Strength and Wisdom are allowed on a row, so a drift between them is
 * the engine and its gate disagreeing about the same sheet — which is exactly
 * what the forty of 2026-10-27 found when one was updated for the owner's GM
 * read and the other was not.
 *
 * DECLARED FIRST, PROSE SECOND, like every reader in this file. `area` is
 * stamped by the sites that CHOOSE the geometry (renderTemplate resolves the
 * `{target}` clause from `area_shape`), and only about 1 row in 10 on a finished
 * sheet is template-built — print, donor and chassis rows carry no stamp and
 * never will, so the prose arm is not scaffolding to be removed later. What the
 * field buys is that a shape's own geometry is no longer re-derived from the
 * sentence the engine just wrote, and what this function buys is that there is
 * one grammar instead of two.
 */
/**
 * Is DAMAGE the point of this row? ONE DEFINITION, EVERY READER.
 *
 * `areaDamage` answers the narrower question the save table was built around —
 * an area that damages. But a SINGLE-TARGET row that deals dice and imposes
 * nothing is just as much a damage row, and the table had no opinion about it,
 * so the model's own `save_stat` stood unchallenged. The critic's find on the
 * forty of 2026-10-27: the Brass Tyrant's payoff carried a STRENGTH save for 71
 * Fire damage, and both grapple-payoffs on other sheets carried DEXTERITY — the
 * stat was tracking the condition the row REQUIRES rather than the damage it
 * deals ("the payload has to pick, not the precondition").
 *
 * Print never does this. Measured over its single-target, damage-only save rows:
 * Dexterity 11, Constitution 11, Wisdom 3, Charisma 2, Intelligence 1 —
 * STRENGTH 0 of 28. Strength is for a shove or a haul, which is why
 * `saveStatsFor` keeps it only for a displacement.
 *
 * A row that imposes a condition is unaffected: its condition still picks.
 */
// `referentsOf` IS WITHDRAWN (R10 · H1, 2026-11-03, owner's catch: "is this string
// matching? looks like string matching"). It was — class D in §2's table, meaning read
// off engine-written text where a declared field exists, three times over:
//   the Sphere origin  -> the declared field is `TARGET_OK` above, which was accepting
//                         an origin-less Sphere. Refused there now; the form cannot
//                         produce one, so no reader is needed.
//   the sense check    -> "within its tremorsense range" was matched out of the finished
//                         prose. No field declares which senses a row leans on, so the
//                         honest build is to ASK — a `senses` field on the trait and
//                         reaction forms, naming any sense the row relies on, validated
//                         against the header. Proposed, not built.
//   the amount and DC  -> already refused in this session at 75 false positives on
//                         print; they want the same treatment, a field at the call.
// Two further checks had reached 0 false positives on print's 1,291 rows, which is why
// they looked safe. A clean corpus is necessary and not sufficient: the test is whether
// a DECLARED answer already exists, and for two of these it did.

export function damageIsThePoint(row) {
  const t = String((typeof row === 'object' ? (row?.text ?? row?.description) : row) ?? '');
  if (!/\d+ \(\d+d\d+/.test(t)) return false;
  if (areaDamage(row)) return true;
  // A PAYOFF: the condition is its PREREQUISITE, so the damage is all it does.
  // Keyed on the declared `consumes`, not on "no condition imposed" — that wider
  // test was a FALSE POSITIVE on a displacement row (Mirelda Sedge's Mire Sink,
  // the balance twelve of 2026-10-27: "7 (2d6) Poison damage, and Mirelda drags
  // the target up to 15 feet through a wall … the target emerges Prone"). Its
  // point is the drag, Strength is print's save for a haul, and the shared
  // reader saw no condition only because the row says "emerges Prone" rather
  // than "has the Prone condition". A drag row is not a damage row.
  return !!(typeof row === 'object' && row?.consumes);
}

export function areaDamage(row) {
  const dice = /\d+ \(\d+d\d+/.test(String((typeof row === 'object' ? (row?.text ?? row?.description) : row) ?? ''));
  if (!dice) return false;
  if (typeof row === 'object' && row?.area != null) return !!row.area;
  return /each creature|Cone|Sphere|Line|Emanation|radius/i.test(String(row?.text ?? row?.description ?? row ?? ''));
}

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
    if (PRECONDITION.test(unguarded(t.slice(Math.max(0, m.index - 46), m.index)))) continue;
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
    if (PRECONDITION.test(unguarded(t.slice(Math.max(0, t.search(re) - 46), t.search(re))))) continue;
    out.add(c);
  }
  return [...out];
}

export function imposedCondition(row) {
  return imposedConditions(row)[0] ?? null;
}
