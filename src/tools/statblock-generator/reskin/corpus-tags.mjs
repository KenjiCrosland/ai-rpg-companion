/**
 * THE COOKBOOK INDEX (plan step 3, 2026-09-21): every print ability tagged in
 * the SAME grammar the template signature tags ideas with — section, trigger,
 * effect (TRIGGERS/EFFECTS from templates.mjs), plus the bare words a verb
 * ranker can match. A `signature miss:` line is then a LOOKUP into print
 * ("trait / on_being_hit / damage" → Death Burst, Death Throes …), so
 * authoring the next template is a copy from print, never a search.
 * Pure: `scripts/tag-corpus.mjs` writes the index; `smoke-misses.mjs` reads it.
 */
import { TRIGGERS, EFFECTS } from './templates.mjs';

export const SECTION_OF = { Traits: 'trait', Actions: 'action', 'Bonus Actions': 'bonus_action', Reactions: 'reaction', 'Legendary Actions': 'legendary' };

const CONDITION = /\b(?:Restrained|Grappled|Charmed|Paralyzed|Stunned|Incapacitated|Petrified|Frightened|Deafened|Blinded|Poisoned|Prone|Unconscious|Exhaustion)\b/;
const STOP = new Set(['the', 'and', 'that', 'with', 'its', 'each', 'creature', 'target', 'this', 'until', 'end', 'start', 'next', 'turn', 'damage', 'condition', 'saving', 'throw', 'attack', 'roll', 'feet', 'within', 'one', 'can', 'must', 'has', 'takes', 'make', 'makes', 'use', 'uses', 'from', 'that', 'when', 'while', 'then', 'they', 'them', 'their', 'have', 'into', 'also', 'only', 'more', 'than', 'which', 'other', 'another']);

export function triggerOf(section, text) {
  const t = String(text ?? '');
  if (section === 'reaction') return 'on_being_hit'; // print reactions all answer something done to the creature
  if (/hits it with a melee attack|touches (?:the|it)\b|takes damage|is hit by|when (?:it|the \w+) (?:is|becomes) Bloodied|is reduced to 0 Hit Points|when (?:it|the \w+) dies|explodes when/i.test(t)) return 'on_being_hit';
  if (/at the (?:start|end) of each of (?:its|the \w+'s) turns|start of each of the \w+'s turns/i.test(t)) return 'start_of_turn';
  if (/\d\/Day|Recharge/.test(t)) return 'once_per_fight';
  if (/Saving Throw/.test(t)) return 'save';
  return 'always';
}

export function effectOf(text) {
  const t = String(text ?? '');
  if (CONDITION.test(t)) return 'condition';
  if (/\d+ \(\d+d\d+/.test(t) || /takes \d+ .* damage/.test(t)) return 'damage';
  if (/teleports|moves up to|pulled|pushed|Speed|Fly|Climb|Burrow|Swim|difficult terrain/i.test(t)) return 'movement';
  if (/Hit Points|regains|Temporary|\/Day|Recharge/.test(t)) return 'resource';
  return 'defense';
}

export function keysOf(name, text) {
  return [...new Set(`${name} ${text}`.toLowerCase().replace(/\*|\([^)]*\)/g, ' ').split(/[^a-z-]+/).filter((w) => w.length >= 4 && !STOP.has(w)))].slice(0, 24);
}

/** One print row → its tag, or null when the row is not a signature (Multiattack, a bare attack row with no rider). */
export function tagEntry(sectionLabel, name, text) {
  const t = String(text ?? '').trim();
  if (!t || /^Multiattack\b/i.test(name ?? '')) return null;
  let section = SECTION_OF[sectionLabel] ?? String(sectionLabel).toLowerCase().replace(/\s+/g, '_');
  let body = t;
  if (/Attack Roll:\*/.test(t)) {
    // the rider is what follows the damage sentence; a row that is only damage is not a signature
    const m = /damage(?: plus \d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) \w+ damage)*\.\s*(.*)$/s.exec(t);
    body = m ? m[1].trim() : '';
    if (!body) return null;
    section = 'rider';
    return { section, trigger: 'on_hit', effect: effectOf(body), keys: keysOf(name, body) };
  }
  return { section, trigger: triggerOf(section, body), effect: effectOf(body), keys: keysOf(name, body) };
}

/** The whole corpus → flat tagged rows. */
export function tagCorpus(monsters) {
  const out = [];
  for (const m of monsters) {
    for (const [label, es] of Object.entries(m.sections ?? {})) {
      for (const e of es ?? []) {
        const tag = tagEntry(label, e.name, e.text);
        if (!tag) continue;
        if (!TRIGGERS.includes(tag.trigger) || !EFFECTS.includes(tag.effect)) throw new Error(`corpus tag outside the template grammar: ${tag.trigger}/${tag.effect} on ${m.name} · ${e.name}`);
        out.push({ monster: m.name, cr: m.cr ?? m.cr_str ?? null, type: m.type ?? null, name: e.name, ...tag, text: e.text });
      }
    }
  }
  return out;
}
