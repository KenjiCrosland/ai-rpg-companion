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
import srd51 from '@/data/srd-monsters.json';
import { CLASSES } from './classes.mjs';
import { SPECIES } from './species.mjs';

export const ASSEMBLIES = ['twist', 'class_npc', 'homebrew'];
export const PATHS = ['exact', 'twist', 'class_npc', 'homebrew', 'blank'];
const CLASS_KEYS = CLASSES.map((c) => c.key);
const SPECIES_KEYS = SPECIES.map((s) => s.key);
const CORPUS = (Array.isArray(printBlocks) ? printBlocks : []).map((b) => ({ name: String(b.name ?? ''), type: String(b.type ?? '') }));
// THE 2014 BOOK'S OWN NAMES ARE PRINT TOO (owner's ruling, 2026-10-20). The two
// corpora do not share every name: 5.1 has "Goblin" where 5.2 has "Goblin
// Warrior", so a 2014 GM typing "Goblin" had their print_body refused for not
// being in the corpus — checked against the 5.2 book alone — and the sheet fell
// to homebrew. Found by the ruling's own smoke. A name print carries in EITHER
// book is a print name; the edition decides which block gets served, not
// whether the name is real.
const CORPUS_2014 = (Array.isArray(srd51) ? srd51 : []).map((b) => ({ name: String(b.name ?? ''), type: String(b.type_and_alignment ?? '').replace(/^\w+\s+/, '') }));

const norm = (s) => String(s ?? '').toLowerCase().replace(/[’`]/g, "'").replace(/[—–-]/g, ' ').replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const stripArticle = (s) => norm(s).replace(/^(?:a|an|the) /, '');
const words = (s) => norm(s).split(' ').filter(Boolean);

/** A whole print name, article and case aside — a closed fact, never a judgement. */
export function printNameOf(text, { edition = '2024' } = {}) {
  const t = stripArticle(text);
  if (!t) return null;
  const hit = CORPUS.find((b) => norm(b.name) === t);
  if (hit) return hit.name;
  // only a 2014 SHEET may stand on a name only the 2014 book carries, so a 2024
  // sheet can never dispatch "Goblin" as exact and then find no 5.2 block.
  if (edition === '2014') { const h14 = CORPUS_2014.find((b) => norm(b.name) === t); if (h14) return h14.name; }
  return null;
}
// A JOB OR FOLK WORD IS A PRINT BLOCK, AND BOTH LOOKUPS MUST KNOW IT (2026-11-09).
// These two lived in `generate.mjs`, which imports THIS file — so `corpusEntry` could not see
// them and had a second, poorer idea of what a print name is: `printCanonFor('kobold')` returns
// Kobold Warrior while `corpusEntry('Kobold')` returned "not in the corpus", and the GM-register
// forty paid for it — Pip's bio asked for the one thing a kobold has (Pack Tactics, "dangerous
// in a group") and the species kit was refused. Moved DOWN here, where both readers can import
// one definition; `generate.mjs` re-exports them so every existing caller is unchanged.
export const hagFor = (text) => (/\b(?:sea|coast|coastal|tide|tidal|salt|shore|ocean|reef|harbou?r)\b/i.test(String(text ?? '')) ? 'Sea Hag' : /\b(?:night|dreams?|nightmares?|ethereal|sleep|sleeping)\b/i.test(String(text ?? '')) ? 'Night Hag' : 'Green Hag'); // a hag is a print hag by context: forest and bog are the Green Hag's (critic's step-8 read)
export const PRINT_ALIAS = { /* hag, hags, crone resolve by context through hagFor */ archlich: 'Lich', demilich: 'Lich', /* the Lich's own kin by prefix (critic's release audit 2026-10-03: an archlich routed as a ghost) */ kobold: 'Kobold Warrior', kobolds: 'Kobold Warrior', goblin: 'Goblin Warrior', goblins: 'Goblin Warrior', hobgoblin: 'Hobgoblin Warrior', hobgoblins: 'Hobgoblin Warrior', bugbear: 'Bugbear Warrior', bugbears: 'Bugbear Warrior', gnoll: 'Gnoll Warrior', gnolls: 'Gnoll Warrior', sahuagin: 'Sahuagin Warrior', /* the renamed 2024 commons (a kobold got no Pack Tactics, critic form-ten 2026-10-01) */ archer: 'Scout', archers: 'Scout', bowman: 'Scout', bowmen: 'Scout', huntsman: 'Scout', ranger: 'Scout', crossbowman: 'Bandit', brigand: 'Bandit', footpad: 'Bandit', outlaw: 'Bandit', highwayman: 'Bandit', soldier: 'Warrior Infantry', 'foot soldier': 'Warrior Infantry', infantryman: 'Warrior Infantry', veteran: 'Warrior Veteran', mercenary: 'Warrior Veteran', 'sellsword': 'Warrior Veteran', wizard: 'Mage', sorcerer: 'Mage', warlock: 'Mage', cleric: 'Priest', /* monk: no longer an alias — the class table owns the word, and print's Priest is a cleric-shaped NPC, not a martial artist (landing two, 2026-10-14) */ thief: 'Spy', rogue: 'Spy', burglar: 'Spy', guardsman: 'Guard', sentry: 'Guard', watchman: 'Guard', paladin: 'Knight', cavalier: 'Knight', peasant: 'Commoner', villager: 'Commoner', farmer: 'Commoner', zealot: 'Cultist', brawler: 'Tough', bruiser: 'Tough', thug: 'Tough', duelist: 'Gladiator', champion: 'Gladiator' };
/** the print block a bare job/folk word names, resolving a hag by context; null when the word is nobody's */
export const printAliasFor = (word, text = '') => (/^(?:hag|hags|crone)$/i.test(String(word ?? '').trim()) ? hagFor(text) : (PRINT_ALIAS[String(word ?? '').trim().toLowerCase()] ?? null));

/**
 * EVERY PRINTED NAME THE GM'S WORDS CARRY (the names arm, 2026-11-14).
 *
 * The swap test showed the path call often fails to RECOGNISE a printed creature the prompt
 * does not use as an example — the Troll is named five times in the prompt and scores 10/10,
 * the Ogre and Ghoul are named nowhere and score 3-6/10. Recall, not judgement. So code finds
 * the names and the call chooses among them: a selection problem instead of a recall problem.
 *
 * CLOSED FACTS ONLY. Whole corpus names matched as whole words, plus the alias table this file
 * already owns. No new word list and no new matching rule.
 *
 * THE LONGEST NAME WINS. "Dire Wolf" over "Wolf"; "Goblin Boss" also drops the "goblin" alias,
 * which would otherwise offer the Goblin Warrior beside it.
 *
 * THE FINDER DECIDES NOTHING, AND TODAY NOTHING IN PRODUCTION READS IT. The arm that offered
 * these names to the call was measured against `path-key.json` on 2026-11-14 and MISSED ITS
 * BAR — offering a name made the call accept it, so "clockwork spider" fell from 10/10 to
 * 6/10 and "goblin assassin" from 8/10 to 6/10, and the more-than-one-path count rose from 6
 * to 10. It did fix recall: "ogre blacksmith" went 5/10 to 10/10. The numbers are in
 * `scripts/smoke-evidence/HANDOFF-names-arm-2026-11-14.md` and routing went back to the owner.
 *
 * This is kept because `scripts/probe-path-key.mjs` reads it to reproduce that measurement,
 * and whatever replaces the arm will need the same closed-fact finder. It is not wired into
 * `buildPathPrompt` or `readPath`.
 */
export function namesInTheWords(text, { edition = '2024', peoples = false } = {}) {
  const t = ` ${norm(text)} `;
  if (!t.trim()) return [];
  const hits = [];
  for (const b of (edition === '2014' ? [...CORPUS_2014, ...CORPUS] : CORPUS)) {
    const n = norm(b.name);
    if (!n) continue;
    const at = t.indexOf(` ${n} `);
    if (at >= 0) hits.push({ name: b.name, ask: b.name, quote: b.name, at, len: n.length, alias: false });
  }
  // THE GM'S OWN WORD, WHEN THE ALIAS TABLE FOUND IT (2026-11-14). The first arm asked whether
  // the creature is a "Green Hag" and "not" was a fair answer to that — the GM wrote "hag".
  // The call is asked about the word it can see; code still picks WHICH hag, through the same
  // alias lookup, once the call says "is".
  for (const w of new Set(norm(text).split(' '))) {
    const a = printAliasFor(w, text);
    if (!a) continue;
    const e = corpusEntry(a, { edition });
    if (!e || hits.some((h) => h.name === e.name)) continue;
    const at = t.indexOf(` ${w} `);
    if (at >= 0) hits.push({ name: e.name, ask: w, quote: w, at, len: w.length, alias: true });
  }
  // THE LONGEST NAME WINS WITHIN ONE MENTION ONLY (2026-11-14). "Dire Wolf" covers the "wolf"
  // inside it and the Wolf yields. But "the druid's wolf companion … tougher than a dire wolf"
  // names two creatures in two PLACES, so both stand — the first arm offered only the Dire Wolf
  // and the call's "resembles" was the right answer to the wrong offer.
  // A 2014 SHEET SEARCHES BOTH BOOKS, so a name both carry hits twice on the same span. Dedupe
  // by name first: two identical spans would otherwise each "cover" the other and both would
  // be dropped, which silently emptied the offer on every 2014 monster prompt.
  const byName = new Map();
  for (const h of hits) if (!byName.has(h.name)) byName.set(h.name, h);
  const uniq = [...byName.values()];
  // containment is STRICT: a longer name covering this one's span wins ("Dire Wolf" over the
  // "wolf" inside it); an equal span is the same mention, not a cover.
  const covered = (h) => uniq.some((o) => o !== h && o.len > h.len && o.at <= h.at && o.at + o.len >= h.at + h.len);
  return uniq
    .filter((h) => !covered(h))
    // MONSTERS ONLY by default: a job block or a people's block is never OFFERED to the path
    // call. `peoples: true` lifts that for ruling C's fill (2026-11-15), which needs the
    // opposite — the declared peoples and nothing else. One finder, one definition.
    .filter((h) => peoples || !isPersonBody(h.name))
    .sort((a, b) => b.len - a.len || a.at - b.at);
}

export function corpusEntry(name, { edition = '2024' } = {}) {
  const n = stripArticle(name); if (!n) return null;
  const exact = CORPUS.find((b) => norm(b.name) === n); if (exact) return exact;
  if (edition === '2014') { const in2014 = CORPUS_2014.find((b) => norm(b.name) === n); if (in2014) return in2014; }
  // a VARIANT the call named ("Cave Troll", "Stone Giant Exile") is the printed creature its
  // tail names — a closed-fact lookup (the longest corpus name the answer contains as whole words — tail or head), not a
  // reading of the GM's words; probe 2026-10-19: "Cave Troll" was refused and the troll went homebrew
  const within = CORPUS.filter((b) => new RegExp(`(?:^| )${norm(b.name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?: |$)`).test(n)).sort((a, b) => b.name.length - a.name.length);
  if (within[0]) return within[0];
  // THE OTHER DIRECTION, which this function never had: the name may be the HEAD of a print
  // block rather than contain one. 2024 renamed the commons with a role suffix, so a GM (or the
  // call) says "Kobold" where print says "Kobold Warrior". `printAliasFor` is the same closed
  // fact `printCanonFor` reads, so the two lookups now agree instead of disagreeing.
  const aliased = printAliasFor(n, name);
  if (aliased) { const hit = CORPUS.find((b) => norm(b.name) === norm(aliased)); if (hit) return hit; }
  return null;
}
/** a print body whose block is a person — an NPC stat block or a folk; a class word outranks it (the brief's precedence) */
/**
 * WHO IS A PERSON (owner's ruling, 2026-11-14). In the owner's words: a creature is not a
 * person if its identity is inseparable from its abilities. Goblins can do all sorts of
 * things; hags are limited. So a goblin is a people and takes a class; a hag is a monster and
 * a job word rides on her.
 *
 * For a PERSON the class decides the body. For a MONSTER the body stands and a class, if there
 * is one, sits on top. The split is not "has a class or not" — a fiend is a monster that can
 * carry a class, and a centaur is a person even though print gives it a martial block.
 *
 * WHY A DECLARED LIST, AND WHY IT CANNOT GROW. The 2024 book files the goblinoids and the hags
 * under one type, Fey, so the type alone cannot carry the ruling: reading `Fey` as a person
 * made Mother Ash rank below a class word, and that is half of why she shipped as a Priest.
 * The Fey type is exactly 15 blocks and the ruling names 14 of them, so the list below is
 * COMPLETE rather than a sample — and `the-person-rule.spec.js` asserts it partitions the type
 * exactly, so a Fey block added to the corpus fails that test instead of silently defaulting.
 *
 * The 2014 book's type was the other candidate and it was refused: it would read the Satyr as
 * a monster, the Kobold Warrior as a person, and the Werewolf, Gnoll Warrior and Sahuagin
 * Warrior as people, none of which the ruling wants.
 *
 * RULED 2026-11-15: the Satyr and the Kobold Warrior are both PEOPLE — either can take any
 * job, so a class decides the body. The Satyr was already on the Fey list; the Kobold Warrior
 * is typed Dragon by print and needs its own declared entry, `OFF_TYPE_PEOPLES`.
 */
export const FEY_PEOPLES = [
  'Goblin Warrior', 'Goblin Boss', 'Goblin Minion',
  'Hobgoblin Warrior', 'Hobgoblin Captain',
  'Bugbear Warrior', 'Bugbear Stalker',
  'Centaur Trooper', // ruled: print gives it a martial block, but it could be a warlock
  'Satyr', // RULED a person, 2026-11-15: it can take any job, so a class decides the body
];
/**
 * PEOPLES PRINT DOES NOT TYPE Fey OR Humanoid (owner's ruling 3, 2026-11-15). The Kobold
 * Warrior is typed Dragon, so neither the Humanoid test nor the Fey list reaches it — and a
 * kobold can take any job, so a class decides its body exactly as a goblin's does. Its own
 * declared list, because the type cannot carry the ruling. `isPersonBody` rejects any name
 * containing "dragon"; the Kobold Warrior's own name does not.
 */
export const OFF_TYPE_PEOPLES = ['Kobold Warrior'];
const OFF_TYPE_SET = new Set(OFF_TYPE_PEOPLES.map((n) => n.toLowerCase()));
const FEY_PEOPLE_SET = new Set(FEY_PEOPLES.map((n) => n.toLowerCase()));
export const isPersonBody = (name) => {
  const e = corpusEntry(name);
  if (!e || /dragon/i.test(e.name)) return false;
  if (/^Humanoid\b/i.test(e.type)) return true;
  if (OFF_TYPE_SET.has(e.name.toLowerCase())) return true;
  return /^Fey\b/i.test(e.type) && FEY_PEOPLE_SET.has(e.name.toLowerCase());
};

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
  "print_body": "<the published D&D monster or NPC stat block the words NAME as the creature itself, by its PRINTED name (Troll, not Cave Troll; Stone Giant, not Stone Giant Exile; Skeleton; Dire Wolf; Priest; Hobgoblin Warrior), or null. ANSWER THIS INDEPENDENTLY OF \"class\": they are different questions and both can be filled. If a published creature noun is in the words, name it HERE even when you also answer a class, a trade or a title — the job word describes what the creature DOES, and this field is what it IS>",
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
export function readPath(raw, { concept = '', edition = '2024' } = {}) {
  let p; try { p = typeof raw === 'string' ? JSON.parse(raw) : raw; } catch { p = null; }
  const refused = [];
  if (!p || typeof p !== 'object') return { assembly: null, print_body: null, relation: null, species: null, class: null, receipts: {}, refused: ['the call returned no object'] };
  const out = { assembly: null, print_body: null, relation: null, species: null, class: null, title: null, receipts: {}, refused };
  if (p.title != null && !/^null$/i.test(String(p.title)) && String(p.title).trim()) { if (isSpan(p.title, concept)) out.title = String(p.title).trim(); else refused.push(`title "${p.title}" is not a span of the GM's words`); }
  const a = String(p.assembly ?? '').toLowerCase();
  if (ASSEMBLIES.includes(a)) out.assembly = a; else refused.push(`assembly "${p.assembly}" is not twist|class_npc|homebrew`);
  if (p.assembly_receipt && isSpan(p.assembly_receipt, concept)) out.receipts.assembly = String(p.assembly_receipt).trim(); else if (p.assembly_receipt) refused.push(`assembly receipt "${p.assembly_receipt}" is not a span of the GM's words`);
  if (p.print_body != null && String(p.print_body).trim() && !/^null$/i.test(String(p.print_body))) {
    const hit = corpusEntry(p.print_body, { edition });
    if (hit) out.print_body = hit.name; else refused.push(`print_body "${p.print_body}" is not in the corpus`);
    if (hit && p.print_body_receipt && isSpan(p.print_body_receipt, concept)) out.receipts.print_body = String(p.print_body_receipt).trim();
    else if (hit) { refused.push(`print_body receipt "${p.print_body_receipt ?? ''}" is not a span of the GM's words — the body is refused with it`); out.print_body = null; }
  }
  const rel = String(p.relation ?? '').toLowerCase();
  if (out.print_body && (rel === 'is' || rel === 'resembles')) out.relation = rel;
  else if (out.print_body) refused.push(`relation "${p.relation}" is neither is nor resembles — read as resembles`), out.relation = 'resembles';
  // set where the refusal is pushed and read below, rather than matching the refusal's own
  // text — a message is for a human, not a control signal (owner, 2026-11-14)
  let noKit = false;
  if (p.species != null && !/^null$/i.test(String(p.species)) && String(p.species).trim()) {
    const s = String(p.species).toLowerCase().trim();
    if (!SPECIES_KEYS.includes(s)) { noKit = true; refused.push(`species "${p.species}" has no kit`); }
    else if (!(p.species_receipt && isSpan(p.species_receipt, concept))) refused.push(`species "${s}" offered no receipt from the GM's words`);
    else { out.species = s; out.receipts.species = String(p.species_receipt).trim(); }
  }
  // A PEOPLE WITH A PRINTED BLOCK KEEPS ITS BODY (owner's ruling 3, 2026-11-14): "a goblin
  // assassin" is an assassin who is visibly a goblin — a class NPC standing on the Goblin
  // Warrior's printed body, not a rogue with nothing goblin about it.
  //
  // Goblin, hobgoblin and kobold sit on the path prompt's list of PEOPLES but have no species
  // kit, so the species above is refused ("has no kit") and nothing else carries them. When the
  // call also names a class and no body, the sheet shipped with the people erased.
  //
  // This is a closed-fact lookup — the corpus and the alias table this file already owns — not
  // a new word list and not a new matching rule. It fills `print_body` for the dispatcher to
  // judge; it decides no path itself. The species receipt rule is unchanged: a claim about the
  // GM's words still carries a quote found in them.
  if (noKit && !out.print_body && p.class != null && String(p.class).trim() && !/^null$/i.test(String(p.class))) {
    const word = String(p.species).toLowerCase().trim();
    const rec = p.species_receipt ? String(p.species_receipt).trim() : '';
    const block = corpusEntry(printAliasFor(word, concept) ?? word, { edition });
    if (block && rec && isSpan(rec, concept)) {
      out.print_body = block.name;
      out.relation = 'is';
      out.receipts.print_body = rec;
      refused.push(`species "${word}" has no kit, but print carries it as ${block.name} — the body stands so the people is not erased`);
    }
  }
  // A KOBOLD IS A KOBOLD FIRST, WITH MAGE FEATURES (owner's ruling C, 2026-11-15). The fill
  // above needs the call to NAME the people as a species with a receipt. On "kobold sorcerer"
  // and "goblin wizard" the call named a class and no species at all, so nothing carried the
  // people and both shipped as the Mage: Small Humanoid, the Mage's own scores, no darkvision,
  // nothing of the people but a language and a flavour trait. Measured earlier, "goblin wizard"
  // kept its body on 7 of 10, 5 of 10 and 0 of 5 rolls — it depended on an answer the call was
  // not reliably giving.
  //
  // So the fill stops depending on the species answer. When the call names a class and no body
  // and the HEAD CLAUSE names exactly one declared people, that people's block is the body.
  //
  // THE DECLARED PEOPLES ONLY, found by the closed-fact finder this file already owns. Not every
  // Humanoid block: "goblin assassin" names the Goblin Warrior AND the printed Assassin, and
  // only the first is a people — the second is a job. The head clause, so "a wizard who hunts
  // goblins" names none. Two peoples fill nothing. A body the call did name is never overridden.
  if (!out.print_body && p.class != null && String(p.class).trim() && !/^null$/i.test(String(p.class))) {
    const declared = new Set([...FEY_PEOPLES, ...OFF_TYPE_PEOPLES].map((n) => n.toLowerCase()));
    const peoplesIn = (t) => namesInTheWords(t, { edition, peoples: true }).filter((h) => declared.has(h.name.toLowerCase()));
    // the POSITIVE find is the head clause, so "a wizard who hunts goblins" names none; the
    // AMBIGUITY check is the whole words, because `headClause` cuts at " and " and would read
    // "a goblin and a hobgoblin, both clerics" as naming only the goblin
    const inHead = peoplesIn(headClause(concept));
    const inAll = peoplesIn(concept);
    if (inAll.length > 1) {
      refused.push(`the words name ${inAll.length} peoples (${inAll.map((h) => h.name).join(', ')}) — none is filled, since they do not say which the creature is`);
    } else if (inHead.length === 1) {
      out.print_body = inHead[0].name;
      out.relation = 'is';
      out.receipts.print_body = inHead[0].quote;
      refused.push(`the head clause names the ${inHead[0].name}, a people — a ${String(p.class).trim()} who is visibly one stands on its printed body (owner's ruling, 2026-11-15)`);
    }
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
export function dispatch({ name = '', concept = '', role = null, edition = '2024' } = {}, read = null) {
  const nameT = String(name ?? '').trim(); const conceptT = String(concept ?? '').trim();
  const whole = printNameOf(nameT, { edition }) ?? (!nameT ? printNameOf(conceptT, { edition }) : null);
  if (whole && (!conceptT || !nameT)) return { path: 'exact', by: 'code', print_body: whole, relation: 'is', class: null, species: null, receipt: whole };
  if (!nameT && !conceptT) return { path: 'blank', by: 'code', print_body: null, relation: null, class: null, species: null, receipt: role ? `role: ${role}` : 'an empty form' };
  const named = printNameOf(nameT, { edition });
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
