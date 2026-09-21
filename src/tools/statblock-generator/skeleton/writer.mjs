/**
 * THE WRITER CALL (owner-approved, 2026-08-15 — the expressiveness package,
 * component 3).
 *
 * A second, small LLM call that runs AFTER the block is assembled and
 * corrected: it sees a digest of what exists and may write ONE ability the
 * concept demands that nothing on the block provides — the Gilded Censer's
 * mirage, the Ashgrave Warden's protective ring. Fidelity over tokens
 * (owner call): a 2k-character prompt whose only job is "write this thing
 * to these exact numbers" obeys where a 20k-character prompt drifts.
 *
 * The trust boundary is the same one the trait renderer proved: the model
 * REPRODUCES engine numbers, never invents them, and verification is
 * mechanical equality. Any failure drops the slot — one optional entry,
 * never the block.
 */
import { CONDITIONS } from '../format-2024/lint.mjs';
import { saveDamageDiceFor } from '../format-2024/dice.mjs';

const ENERGY_AND_PHYSICAL = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic',
  'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];

/** The engine-priced envelopes the writer may use. */
export function writerEnvelopes(skeleton) {
  const dmg = saveDamageDiceFor(Math.max(4, Math.round(skeleton.per_attack_damage * 0.55)));
  return {
    save: { dc: skeleton.save_dc, damage: dmg.avg, dice: dmg.dice },
    conditionMenu: ['Frightened', 'Poisoned', 'Blinded', 'Deafened'],
  };
}

export function buildWriterPrompt(monster, skeleton, { concept = '', proposedTraits = null } = {}) {
  const env = writerEnvelopes(skeleton);
  const digest = Object.entries(monster.sections ?? {})
    .flatMap(([sec, list]) => list.map((e) => `- [${sec}] ${e.name}: ${e.text.replace(/\*/g, '').slice(0, 80)}`))
    .join('\n');
  return `You are finishing a D&D 2024 monster. The block below is COMPLETE and correct; do not restate or modify it.

CONCEPT: ${concept}

THE BLOCK (digest):
${digest}

If the concept promises one distinctive thing this block does not deliver — a signature behavior a reader would miss — write it as ONE ability. If the block already says everything the concept does, omit it: an empty answer is a good answer.

Pick exactly one SHAPE and reproduce its numbers EXACTLY:
(a) save: "*[Strength|Dexterity|Constitution|Wisdom] Saving Throw*: DC ${env.save.dc}, one creature the creature can see within 60 feet. *Failure:* ${env.save.damage} (${env.save.dice}) <one damage type the block already deals> damage." — you may add ONE rider from: the target's Speed is halved until the end of its next turn / the target can't take Reactions until the start of the creature's next turn.
(b) condition: no damage. "*[same saves] Saving Throw*: DC ${env.save.dc}, one creature within 60 feet. *Failure:* The target has the <one of: ${env.conditionMenu.join(', ')}> condition until the end of the creature's next turn."
(c) utility: no damage, no saving throw, no conditions — movement, stance, senses, or trickery only, at most 45 words, and it must GRANT a concrete rule (a named action, a numbered distance or duration, Advantage or Disadvantage) — description alone is not an ability.

Rules: never a Recharge or /Day gate; never a condition the block already imposes; write "the creature" for the monster's name (it is substituted); the NAME is plain English in the creature's own register.

Return ONLY JSON: {"use": true|false, "section": "Actions"|"Bonus Actions"|"Traits", "shape": "a"|"b"|"c", "name": "<entry name>", "text": "<the ability text>"}
If omitting: {"use": false}`;
}

export function validateWriterResponse(jsonString) {
  try {
    const p = JSON.parse(String(jsonString).replace(/^```json\s*|```\s*$/g, '').trim());
    if (p && p.use === false) return true;
    return !!p && p.use === true
      && ['Actions', 'Bonus Actions', 'Traits'].includes(p.section)
      && ['a', 'b', 'c'].includes(p.shape)
      && typeof p.name === 'string' && p.name.trim().length > 1 && p.name.trim().split(/\s+/).length <= 4
      && typeof p.text === 'string' && p.text.trim().length > 10;
  } catch { return false; }
}

/**
 * Mechanical verification: the written entry must live inside its envelope.
 * Returns null when it passes, or the reason it fails.
 */
export function verifyWrittenEntry(entry, monster, skeleton, { roleExclusion = null } = {}) {
  const env = writerEnvelopes(skeleton);
  const text = entry.text;
  const blockText = Object.values(monster.sections ?? {}).flat().map((e) => e.text).join(' ');

  if (/Recharge|\/Day/i.test(entry.name + text)) return 'gate invented';
  if (/Attack Roll/.test(text)) return 'attack roll outside every shape';
  const conds = CONDITIONS.filter((c) => new RegExp(`\\b${c} condition\\b`).test(text));
  const dealt = ENERGY_AND_PHYSICAL.filter((t) => new RegExp(`\\b${t} damage\\b`).test(text));
  const blockDealt = ENERGY_AND_PHYSICAL.filter((t) => new RegExp(`\\b${t} damage\\b`).test(blockText));

  if (entry.shape === 'a') {
    if (!text.includes(`DC ${env.save.dc}`)) return 'DC not the engine DC';
    if (!text.includes(`${env.save.damage} (${env.save.dice})`)) return 'damage not the engine dice';
    if (!dealt.length || dealt.some((t) => !blockDealt.includes(t))) return 'damage type outside the block palette';
    if (conds.length) return 'shape a carries no conditions';
  } else if (entry.shape === 'b') {
    if (/\d+\s*\(\d+d\d+/.test(text)) return 'shape b deals no damage';
    if (conds.length !== 1) return 'shape b imposes exactly one condition';
    if (!env.conditionMenu.includes(conds[0])) return 'condition off the menu';
    if (new RegExp(`\\b${conds[0]} condition\\b`).test(blockText)) return 'condition already imposed by the block';
    if (!text.includes(`DC ${env.save.dc}`)) return 'DC not the engine DC';
  } else {
    if (/\d+\s*\(\d+d\d+|Saving Throw|DC \d+/.test(text)) return 'shape c is pure utility';
    if (conds.length) return 'shape c carries no conditions';
    if (text.split(/\s+/).length > 55) return 'shape c over length';
    // description alone is not an ability (the Corpse-Candle class)
    if (!/\d|Advantage|Disadvantage|Dash|Disengage|Hide|Dodge|Search/.test(text)) return 'shape c grants no rule';
  }
  if (roleExclusion && roleExclusion(({ template_2024: text }))) return 'fights the combat role';
  // structural dedupe: a rewrite of an existing entry is a duplicate, not a gift
  const sentences = (t) => new Set(t.split(/(?<=\.)\s+/).map((x) => x.trim().toLowerCase()).filter((x) => x.length > 30));
  const mine = sentences(text);
  for (const e of Object.values(monster.sections ?? {}).flat()) {
    let overlap = 0;
    for (const sN of sentences(e.text)) if (mine.has(sN)) overlap += 1;
    if (overlap >= 1) return `duplicates "${e.name}"`;
    if (e.name.trim().toLowerCase() === entry.name.trim().toLowerCase()) return 'name collides';
  }
  return null;
}

// ---------------------------------------------------------------------------
// COMPONENT 4 — the writer as AUTHOR (owner go, 2026-08-16). The engine
// states each row's numbers and closure paths; the model writes what the
// ability IS, in the creature's voice — the donor sentence is never shown.
// Verification is number-MULTISET equality plus condition/type/save-stat set
// equality (the audit-rewrite actuator's proven trick): every number the
// engine priced must appear, nothing new may. Any failure keeps the
// engine-filled text for that row — never-fail holds PER ROW.
// ---------------------------------------------------------------------------

const RULES_ROW = /^(Multiattack|Spellcasting|Legendary Resistance|Legendary Action Uses)/i;

/** Author-eligible rows: the wordy non-attack rows where donor voice lives. */
export function pickVoiceRows(monster, cap = 4) {
  const rows = [];
  for (const [section, list] of Object.entries(monster.sections ?? {})) {
    for (const e of list) {
      if (RULES_ROW.test(e.name ?? '') || /Attack Roll:/.test(e.text ?? '')) continue;
      if ((e.text ?? '').length < 90) continue; // one-liners carry no voice
      rows.push({ section, name: e.name, text: e.text });
    }
  }
  return rows.sort((x, y) => y.text.length - x.text.length).slice(0, cap);
}

/** The row's mechanical facts — what the authored text MUST reproduce. */
export function specOf(text) {
  const facts = [];
  const save = text.match(/(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw[^,.]*?DC (\d+)/);
  if (save) facts.push(`${save[1]} Saving Throw, DC ${save[2]}`);
  const tgt = text.match(/(each creature in [^.,;]+|one creature[^.,;]*?within \d+ feet[^.,;]*)/);
  if (tgt) facts.push(tgt[1].trim());
  for (const m of text.matchAll(/(\d+) \((\d+d\d+(?:\s*[+-]\s*\d+)?)\) (\w+) damage/g)) {
    facts.push(`${m[1]} (${m[2]}) ${m[3]} damage`);
  }
  for (const c of CONDITIONS) {
    const m = text.match(new RegExp(`\\b${c} condition( until [^.]+)?`));
    if (m) facts.push(`${c} condition${m[1] ?? ''}`);
  }
  for (const m of text.matchAll(/\b(AC \d+|HP \d+|\d+ feet|\d+ ft\.|\d+d\d+ days?|escape DC \d+|\d+ Hit Points(?: or fewer)?)\b/g)) {
    facts.push(m[1]);
  }
  for (const kw of RULES_KEYWORDS) {
    const m = text.match(new RegExp(`[^.]*\\b${kw}\\b[^.]*`));
    if (m) facts.push(`(keep this rule) ${m[0].trim().slice(0, 180)}`);
  }
  return [...new Set(facts)];
}

const numsOf = (t) => (String(t).match(/\d+d\d+(?:\s*[+-]\s*\d+)?|\d+/g) ?? [])
  .map((x) => x.replace(/\s+/g, '')).sort();
// Rules KEYWORDS are mechanics too (the Rotting Bull's Corpse-Candle Glow:
// an illumination row's Advantage clause replaced by "no prey escapes" —
// asserted consequence, no rule — passed every numeric check). The authored
// text must carry the same rules vocabulary the engine row carried.
const RULES_KEYWORDS = ['Advantage', 'Disadvantage', 'Opportunity Attack', 'Reaction',
  'Half damage', 'Emanation', 'Cone', 'Line', 'Sphere', 'Dash', 'Disengage', 'Hide',
  'Dodge', 'Search', 'automatically succeeds', 'escape DC', 'Speed'];
const setOf = (t, list, re) => list.filter((x) => new RegExp(re(x)).test(t)).sort().join('|');

/** null when the authored text lives inside the engine row's envelope. */
export function verifyAuthoredRow(original, authored) {
  if (typeof authored !== 'string' || authored.trim().length < 20) return 'no text';
  const a = authored.trim();
  // floored at print's own p95 (measured 2026-08-17: 643 printed non-attack
  // rows — median 138, p90 349, p95 439, max 967). The first floor (300)
  // was a guess that executed print-normal lengths: three of the author
  // path's first six losses were "over length" on prose shorter than
  // print's 95th percentile.
  if (a.length > Math.max(original.length * 1.7 + 100, 440)) return 'over length';
  if (JSON.stringify(numsOf(original)) !== JSON.stringify(numsOf(a))) return 'numbers differ';
  const condRe = (c) => `\\b${c} condition\\b`;
  if (setOf(original, CONDITIONS, condRe) !== setOf(a, CONDITIONS, condRe)) return 'conditions differ';
  const typeRe = (d) => `\\b${d} damage\\b`;
  if (setOf(original, ENERGY_AND_PHYSICAL, typeRe) !== setOf(a, ENERGY_AND_PHYSICAL, typeRe)) return 'damage types differ';
  const stats = (t) => (String(t).match(/(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)(?= Saving Throw)/g) ?? []).sort().join('|');
  if (stats(original) !== stats(a)) return 'save stats differ';
  if ((a.match(/Attack Roll/g) ?? []).length !== (original.match(/Attack Roll/g) ?? []).length) return 'attack rolls differ';
  if (/Recharge|\/Day/i.test(a) && !/Recharge|\/Day/i.test(original)) return 'gate invented';
  const kwRe = (k) => `\\b${k}\\b`;
  if (setOf(original, RULES_KEYWORDS, kwRe) !== setOf(a, RULES_KEYWORDS, kwRe)) return 'rules terms differ';
  return null;
}

export function buildAuthorPrompt(monster, skeleton, { concept = '', rows = [] } = {}) {
  const env = writerEnvelopes(skeleton);
  const digest = Object.entries(monster.sections ?? {})
    .flatMap(([sec, list]) => list.map((e) => `- [${sec}] ${e.name}`)).join('\n');
  const specs = rows.map((r) => {
    const facts = specOf(r.text);
    // Verification is a number MULTISET check against the engine row, so
    // any numeric token the fact regexes didn't classify still has to
    // reach the author — an honest writer can't reproduce a number it was
    // never shown (durations, push distances, counts).
    const covered = numsOf(facts.join(' '));
    const leftovers = [];
    const pool = [...covered];
    for (const nTok of numsOf(r.text)) {
      const i = pool.indexOf(nTok);
      if (i === -1) leftovers.push(nTok); else pool.splice(i, 1);
    }
    return `### "${r.name}" [${r.section}]\nRequired materials — every fact below must appear in your text, numbers EXACTLY as written, nothing added:\n${facts.map((f) => `- ${f}`).join('\n')}${leftovers.length ? `\n- your text must also contain, verbatim: ${[...new Set(leftovers)].join(', ')}` : ''}`;
  }).join('\n\n');
  return `You are finishing a D&D 2024 monster. Its mechanics are FIXED; you are its writer, not its designer.

CONCEPT: ${concept}

THE BLOCK (names only):
${digest}

SAVE-ROW FORM: a row whose facts include a Saving Throw keeps the printed frame — "*<Stat> Saving Throw*: DC <n>, <target>. *Failure:* <your prose>." The frame is rules text; your voice lives inside the Failure clause, never in the frame.

REWRITE THE ROWS BELOW as RULES TEXT, not prose. A statblock entry is a rule a DM executes: state the mechanics in print's canonical sentence shapes, in the creature's vocabulary, with AT MOST one short flavor clause per row. NEVER assert an effect you do not grant — "marks its prey", "no one escapes", "relentless pursuit" are banned unless the sentence states the actual rule (the condition, the Advantage, the numbered distance). If a fact below names a rules term (Advantage, a condition, an action), your text keeps that exact term doing that exact job. Write "the creature" wherever the monster's name belongs. Every number and fact listed is mandatory and unalterable; add NO new damage, conditions, saves, or numbers of any kind.

${specs}

ALSO: if the concept promises one distinctive thing this block does not deliver, write it as ONE extra ability using exactly this shape: "*[Strength|Dexterity|Constitution|Wisdom] Saving Throw*: DC ${env.save.dc}, one creature within 60 feet. *Failure:* The target has the <one of: ${env.conditionMenu.join(', ')}> condition until the end of its next turn." Omit it if the block already says everything — {"use": false} is a good answer.

Return ONLY JSON:
{"rows": [{"name": "<the row's exact name, unchanged>", "text": "<your prose>"}], "slot": {"use": true|false, "section": "Actions"|"Bonus Actions"|"Traits", "shape": "b", "name": "<name>", "text": "<text>"}}`;
}

export function validateAuthorResponse(jsonString) {
  try {
    const p = JSON.parse(String(jsonString).replace(/^```json\s*|```\s*$/g, '').trim());
    if (!p || !Array.isArray(p.rows)) return false;
    for (const r of p.rows) {
      if (!r || typeof r.name !== 'string' || typeof r.text !== 'string') return false;
    }
    return p.slot == null || p.slot.use === false
      || (p.slot.use === true && ['Actions', 'Bonus Actions', 'Traits'].includes(p.slot.section)
        && typeof p.slot.name === 'string' && typeof p.slot.text === 'string');
  } catch { return false; }
}

/**
 * Deterministic case repair for authored prose (the Pelted Hound smoke:
 * 3 of 4 authored rows died of capitalization — lowercase "fire damage"
 * failed type equality, lowercase "reaction" tripped the caps lint). A
 * fixed term list title-cased in place cannot alter mechanics; it runs
 * BEFORE verification so honest prose isn't executed for its case.
 */
const CASED_TERMS = [...ENERGY_AND_PHYSICAL.map((t) => `${t} damage`), ...CONDITIONS.map((c) => `${c} condition`),
  'Opportunity Attack', 'Opportunity Attacks', 'Reaction', 'Reactions', 'Bonus Action',
  'Hit Points', 'Hit Point maximum', 'Saving Throw', 'Advantage', 'Disadvantage',
  'Long Rest', 'Short Rest', 'Difficult Terrain', 'Speed',
  'Hide action', 'Dash action', 'Disengage action', 'Dodge action', 'Search action'];
export function normalizeAuthoredCase(text) {
  let out = String(text);
  for (const term of CASED_TERMS) {
    out = out.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), term);
  }
  return out;
}
