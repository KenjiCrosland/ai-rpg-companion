/**
 * THE PATH CALL AND THE DISPATCHER (critic's Five Pipelines brief, 2026-10-18; step 2).
 *
 * One small call, run first, decides which pipeline a prompt runs on, from the form
 * fields alone. Code decides the closed cases before the call (an exact print name, a
 * blank roll, a Name-field print name beside a description); the call reads only when
 * free text has to be read; code validates every field after it; the dispatcher picks
 * once. Step 2 runs this in SHADOW: the path is computed, traced as the first [path]
 * line, and compared with the canon matcher — no sheet changes until the owner reads
 * the disagreement rate (step 3).
 *
 * Rulings in force: meaning is a call field, never a word list — the only word-shaped
 * things here are closed facts (the corpus names, the eight class keys, the species
 * kit keys) and validators (a receipt is a span of the GM's words).
 */
import printBlocks from '@/data/srd52-monsters.json';
import { CLASSES } from './classes.mjs';
import { SPECIES } from './species.mjs';

export const ASSEMBLIES = ['twist', 'class_npc', 'homebrew'];
export const PATHS = ['exact', 'twist', 'class_npc', 'homebrew', 'blank'];
const CLASS_KEYS = CLASSES.map((c) => c.key);
const SPECIES_KEYS = SPECIES.map((s) => s.key);
const CORPUS = (Array.isArray(printBlocks) ? printBlocks : []).map((b) => ({ name: String(b.name ?? ''), type: String(b.type ?? '') }));

const norm = (s) => String(s ?? '').toLowerCase().replace(/[’`]/g, "'").replace(/[—–-]/g, ' ').replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const stripArticle = (s) => norm(s).replace(/^(?:a|an|the) /, '');
const words = (s) => norm(s).split(' ').filter(Boolean);

/** A whole print name, article and case aside — a closed fact, never a judgement. */
export function printNameOf(text) {
  const t = stripArticle(text);
  if (!t) return null;
  const hit = CORPUS.find((b) => norm(b.name) === t);
  return hit ? hit.name : null;
}
export function corpusEntry(name) {
  const n = stripArticle(name); if (!n) return null;
  const exact = CORPUS.find((b) => norm(b.name) === n); if (exact) return exact;
  // a VARIANT the call named ("Cave Troll", "Stone Giant Exile") is the printed creature its
  // tail names — a closed-fact lookup (the longest corpus name the answer contains as whole words — tail or head), not a
  // reading of the GM's words; probe 2026-10-19: "Cave Troll" was refused and the troll went homebrew
  const within = CORPUS.filter((b) => new RegExp(`(?:^| )${norm(b.name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?: |$)`).test(n)).sort((a, b) => b.name.length - a.name.length);
  return within[0] ?? null;
}
/** a print body whose block is a person — an NPC stat block or a folk; a class word outranks it (the brief's precedence) */
export const isPersonBody = (name) => { const e = corpusEntry(name); return !!e && /^(?:Humanoid|Fey)\b/i.test(e.type) && !/dragon/i.test(e.name); };

/** The head clause: the GM's words up to the first relative or conjunction boundary. */
export const headClause = (concept) => String(concept ?? '').split(/,|;|:|—|–| - | who | whose | that | which | with | and | but | while | when /i)[0].trim();

export function buildPathPrompt({ name = '', concept = '', cr = null, role = null, edition = '2024', caster = false } = {}) {
  const fields = [`Name field: ${JSON.stringify(name ?? '')}`, `Description field: ${JSON.stringify(concept ?? '')}`, `CR: ${cr ?? 'not set'}`, `Role: ${role ?? 'not set'}`, `Edition: ${edition}`, caster ? 'Caster: yes' : null].filter(Boolean).join('\n');
  return `A game master filled in a monster form. Decide what KIND of build their words ask for. Read only the fields below; quote their words back as receipts.

${fields}

Answer with ONLY this JSON object, no commentary:
{
  "assembly": "<twist | class_npc | homebrew>",
  "assembly_receipt": "<the GM's own words, a short span, that decide the assembly>",
  "print_body": "<the published D&D monster or NPC stat block the words NAME as the creature itself, by its PRINTED name (Troll, not Cave Troll; Stone Giant, not Stone Giant Exile; Skeleton; Dire Wolf; Priest; Hobgoblin Warrior), or null>",
  "print_body_receipt": "<the GM's words naming it, or null>",
  "relation": "<is | resembles | null — 'is' when the words say the creature IS that published creature (a troll that grows back; a stone giant exile); 'resembles' when they only evoke it (a golem of lashed timber is not the Clay Golem; an archon of flies is not a swarm)>",
  "species": "<one of ${SPECIES_KEYS.join(' | ')} if the words name that people, else null>",
  "species_receipt": "<the species word, or null>",
  "class": "<one of ${CLASS_KEYS.join(' | ')} if the words name a trained person by class, title or trade (a ninja is a rogue, a warlord a fighter, a priest a cleric, a templar a paladin, a skald a bard, a witch a mage), else null>",
  "class_receipt": "<the words that name the class: the class word itself wherever it sits (\"is a barbarian who rages\" → \"barbarian\"), or for an IMPLIED class the title or trade from the FIRST clause, or null>",
  "title": "<a leadership, rank or honorific word in the GM's words — king, tyrant, jarl, warlord, chieftain, captain, boss, queen, lord, Brother, Sister, Dame, Ser, Father, Mother — copied verbatim, or null>"
}
Rules: "twist" = a published creature IS the body and the words add or remove something, however much the clause adds: a skeleton with a greatsword is a twist on the Skeleton; a cave troll that speaks only Giant on the Troll; "a vampire who runs a bathhouse" on the Vampire; "a chapel bell-ringer's ghost that tolls for the dying" on the Ghost; "a wolf with two heads" on the Wolf; "Hydra whose stumps smoke instead of regrowing" on the Hydra; "a hobgoblin with a halberd" on the Hobgoblin Warrior; "an archlich enthroned on a sun of bone" on the Lich (an archlich IS a lich; a greater or lesser variant of a published creature is that creature). A creature noun that is a published name is that body unless the words say it only resembles it — even beside a job word: "an imp rogue who picks locks for a devil" is a twist on the Imp (print_body Imp, relation is), "a goblin assassin" a twist on the Goblin, because a MONSTER named as itself outranks a class word; the class word then rides as flavour. A PEOPLE's name (hobgoblin, goblin, kobold, lizardfolk, orc, tabaxi, goliath, tiefling) is never a class — class needs a trained role (ninja, warlord, priest, templar, skald, witch, monk, rogue). TWO WORDS, A PEOPLE AND A ROLE, IS ALWAYS class_npc with that role as the class and that people as the species: "lizardfolk monk" is class_npc (monk, lizardfolk), "lizardfolk ninja" (rogue, lizardfolk), "tabaxi cutpurse" (rogue, tabaxi), "goliath berserker" (barbarian, goliath) — never homebrew. "class_npc" = a person defined by a class, title, trade or personal name (a name alone — "Grik", "Dame Oriel" — is class_npc). "homebrew" = neither: an invented creature, or one that only resembles a published one. A class word outranks a people (a kuo-toa priest is class_npc); a published MONSTER named as itself outranks a title (a frost giant jarl is a twist on the Frost Giant). A TITLE on an invented creature (pumpkin king, a tyrant of burning brass) marks a LEADER and goes in "title" — the creature itself is homebrew, not a person with a class; a personal name alone (Grik, Dame Oriel) is class_npc. A RELIGIOUS or KNIGHTLY title on a PERSON names their class and both fields are answered: "Brother"/"Sister"/"Father"/"Mother" is a cleric, "Dame"/"Ser"/"Sir" a paladin, "Captain"/"Sergeant"/"Warlord"/"Marshal" a fighter, "Archmage"/"Magus" a mage — with that title as the class receipt. Every receipt must be copied from the fields verbatim.`;
}

export function validatePathResponse(raw) {
  try { const p = typeof raw === 'string' ? JSON.parse(raw) : raw; return !!p && typeof p === 'object' && !Array.isArray(p) && ASSEMBLIES.includes(String(p.assembly ?? '').toLowerCase()); } catch { return false; }
}

const isSpan = (receipt, concept) => { const r = norm(receipt); return !!r && norm(concept).includes(r); };
const shorter = (receipt, concept) => words(concept).length <= 3 || words(receipt).length < words(concept).length;

/** Validators, not judgements: each refusal is named for the trace. */
export function readPath(raw, { concept = '' } = {}) {
  let p; try { p = typeof raw === 'string' ? JSON.parse(raw) : raw; } catch { p = null; }
  const refused = [];
  if (!p || typeof p !== 'object') return { assembly: null, print_body: null, relation: null, species: null, class: null, receipts: {}, refused: ['the call returned no object'] };
  const out = { assembly: null, print_body: null, relation: null, species: null, class: null, title: null, receipts: {}, refused };
  if (p.title != null && !/^null$/i.test(String(p.title)) && String(p.title).trim()) { if (isSpan(p.title, concept)) out.title = String(p.title).trim(); else refused.push(`title "${p.title}" is not a span of the GM's words`); }
  const a = String(p.assembly ?? '').toLowerCase();
  if (ASSEMBLIES.includes(a)) out.assembly = a; else refused.push(`assembly "${p.assembly}" is not twist|class_npc|homebrew`);
  if (p.assembly_receipt && isSpan(p.assembly_receipt, concept)) out.receipts.assembly = String(p.assembly_receipt).trim(); else if (p.assembly_receipt) refused.push(`assembly receipt "${p.assembly_receipt}" is not a span of the GM's words`);
  if (p.print_body != null && String(p.print_body).trim() && !/^null$/i.test(String(p.print_body))) {
    const hit = corpusEntry(p.print_body);
    if (hit) out.print_body = hit.name; else refused.push(`print_body "${p.print_body}" is not in the corpus`);
    if (hit && p.print_body_receipt && isSpan(p.print_body_receipt, concept)) out.receipts.print_body = String(p.print_body_receipt).trim();
    else if (hit) { refused.push(`print_body receipt "${p.print_body_receipt ?? ''}" is not a span of the GM's words — the body is refused with it`); out.print_body = null; }
  }
  const rel = String(p.relation ?? '').toLowerCase();
  if (out.print_body && (rel === 'is' || rel === 'resembles')) out.relation = rel;
  else if (out.print_body) refused.push(`relation "${p.relation}" is neither is nor resembles — read as resembles`), out.relation = 'resembles';
  if (p.species != null && !/^null$/i.test(String(p.species)) && String(p.species).trim()) {
    const s = String(p.species).toLowerCase().trim();
    if (!SPECIES_KEYS.includes(s)) refused.push(`species "${p.species}" has no kit`);
    else if (!(p.species_receipt && isSpan(p.species_receipt, concept))) refused.push(`species "${s}" offered no receipt from the GM's words`);
    else { out.species = s; out.receipts.species = String(p.species_receipt).trim(); }
  }
  if (p.class != null && !/^null$/i.test(String(p.class)) && String(p.class).trim()) {
    const c = String(p.class).toLowerCase().trim();
    const rc = p.class_receipt ? String(p.class_receipt).trim() : '';
    // AN EXPLICIT CLASS NAME IS ITS OWN RECEIPT, ANYWHERE IN THE GM'S WORDS (the critic's correction
    // of its own rule, 2026-10-19): "He is a barbarian who rages" names the class in a relative clause
    // and was refused for it. The head-clause test exists for IMPLIED words — a title or a trade,
    // where position carries the claim ("a kuo-toa priest" is a cleric; "priest" deep in a sentence
    // about priests they hunt is not). So: the receipt names the class itself → accepted wherever it
    // sits; the receipt is an implied word → it must sit in the head clause, as before.
    const saysTheClassItself = !!rc && new RegExp(`\\b${c}s?\\b`, 'i').test(rc);
    if (!CLASS_KEYS.includes(c)) refused.push(`class "${p.class}" is not one of the eight`);
    else if (!rc || !isSpan(rc, concept)) refused.push(`class "${c}" offered no receipt from the GM's words`);
    else if (!shorter(rc, concept)) refused.push(`class receipt "${rc}" is the whole concept`);
    else if (!saysTheClassItself && !isSpan(rc, headClause(concept))) refused.push(`class receipt "${rc}" names no class and is not in the head clause ("${headClause(concept)}")`);
    else { out.class = c; out.receipts.class = rc; }
  }
  return out;
}

/**
 * The dispatcher: code's closed cases first, then the validated call. The only
 * place that decides what is being built.
 *   fields: { name, concept, cr, role } — the form, verbatim
 *   read:   readPath()'s output, or null when the call did not run / failed
 */
export function dispatch({ name = '', concept = '', role = null } = {}, read = null) {
  const nameT = String(name ?? '').trim(); const conceptT = String(concept ?? '').trim();
  const whole = printNameOf(nameT) ?? (!nameT ? printNameOf(conceptT) : null);
  if (whole && (!conceptT || !nameT)) return { path: 'exact', by: 'code', print_body: whole, relation: 'is', class: null, species: null, receipt: whole };
  if (!nameT && !conceptT) return { path: 'blank', by: 'code', print_body: null, relation: null, class: null, species: null, receipt: role ? `role: ${role}` : 'an empty form' };
  const named = printNameOf(nameT);
  if (named && conceptT) return { path: 'twist', by: 'code', print_body: named, relation: 'is', class: read?.class ?? null, species: read?.species ?? null, receipt: `Name field: ${named}` };
  if (!read || !read.assembly) return { path: null, by: 'call', failed: true, print_body: null, relation: null, class: null, species: null, receipt: read?.refused?.join('; ') || 'the path call failed' };
  const body = read.print_body; const rel = read.relation;
  // a class word or title outranks a PERSON body (NPC block, folk); a MONSTER named as itself outranks the title
  if (read.class && body && rel === 'is' && !isPersonBody(body)) return { path: 'twist', by: 'call', print_body: body, relation: 'is', class: read.class, species: read.species, receipt: read.receipts.print_body ?? body };
  if (read.class) return { path: 'class_npc', by: 'call', print_body: body && isPersonBody(body) ? body : null, relation: body ? rel : null, class: read.class, species: read.species, receipt: read.receipts.class };
  if (body && rel === 'is') return { path: 'twist', by: 'call', print_body: body, relation: 'is', class: null, species: read.species, receipt: read.receipts.print_body ?? body };
  const properName = /^(?:[A-Z][\w'-]*\s*){1,3}$/.test(`${nameT} ${conceptT}`.trim()) && !/^(?:a|an|the)\b/i.test(conceptT); // a personal name alone (Grik, Dame Oriel) — a lower-case "pumpkin king" is an invented creature with a title (owner, 2026-10-19)
  if (read.assembly === 'class_npc' && words(conceptT).length <= 3 && properName) return { path: 'class_npc', by: 'call', print_body: null, relation: null, class: null, species: read.species, title: read.title, receipt: read.receipts.assembly ?? conceptT };
  return { path: 'homebrew', by: 'call', print_body: body ?? null, relation: body ? rel : null, class: null, species: read.species, title: read.title, receipt: read.receipts.assembly ?? (body ? `${body} (resembles)` : 'no published body named') };
}

/** What the canon matcher decided, in the dispatcher's vocabulary — for the shadow comparison. */
export function matcherPath(pc) {
  if (!pc) return { path: 'homebrew', print_body: null };
  if (pc.exact) return { path: 'exact', print_body: pc.name };
  if (pc.borrowOnly) return { path: 'twist', print_body: pc.name };
  return { path: 'print-plain', print_body: pc.name };
}

export function pathLine(d, concept = '') {
  if (!d) return '[path] none — no decision recorded';
  if (d.failed) return `[path] FAILED — ${d.receipt}`;
  const body = d.print_body ? ` — ${d.print_body}${d.relation ? ` (${d.relation})` : ''}` : '';
  const cls = d.class ? ` — class ${d.class}` : ''; const sp = d.species ? ` — species ${d.species}` : ''; const ti = d.title ? ` — title ${d.title}` : '';
  return `[path] ${d.path}${body}${cls}${sp}${ti} — "${String(d.receipt ?? concept).slice(0, 80)}" (${d.by})`;
}

/**
 * A PERSON WITH NO CLASS STILL STANDS ON A PERSON (critic B, 2026-10-19): "Brother Halric" answered
 * class null, so `bodyForClass` had nothing, no kit landed, and he fell through to a monster chassis
 * with a "Hurled Scripture" row. Print's own generic people are the fallback body, nearest CR —
 * the Commoner through the Warrior Veteran ladder every NPC block is built on.
 */
const PERSON_LADDER = ['Commoner', 'Guard', 'Warrior Infantry', 'Scout', 'Spy', 'Priest Acolyte', 'Berserker', 'Warrior Veteran', 'Guard Captain', 'Gladiator', 'Mage', 'Assassin', 'Archmage'];
export function bodyForPerson(cr) {
  const crN = Number(cr);
  const withCr = PERSON_LADDER.map((n) => corpusEntry(n)).filter(Boolean)
    .map((e) => ({ name: e.name, cr: Number((printBlocks.find((b) => b.name === e.name) ?? {}).cr ?? NaN) })).filter((x) => Number.isFinite(x.cr));
  if (!withCr.length) return null;
  if (!Number.isFinite(crN)) return withCr[0].name;
  return withCr.sort((a, b) => Math.abs(a.cr - crN) - Math.abs(b.cr - crN) || a.cr - b.cr)[0].name;
}

/** The print NPC body a class stands on when the GM named none: the class's own list, nearest CR (pipeline 3). */
export function bodyForClass(classKey, cr) {
  const c = CLASSES.find((x) => x.key === classKey); if (!c?.bodies?.length) return null;
  const crN = Number(cr); const withCr = c.bodies.map((n) => corpusEntry(n)).filter(Boolean).map((e) => ({ name: e.name, cr: Number((printBlocks.find((b) => b.name === e.name) ?? {}).cr ?? NaN) }));
  if (!withCr.length) return null;
  if (!Number.isFinite(crN)) return withCr[0].name;
  return withCr.sort((a, b) => Math.abs(a.cr - crN) - Math.abs(b.cr - crN) || a.cr - b.cr)[0].name;
}
