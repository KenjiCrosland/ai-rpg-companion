/**
 * 2024 statblock lint (build-order step 4 of docs/2024-architecture.md).
 *
 * Enforces the spec's lint_rules against the JSON block model (the same shape
 * srd52-monsters.json uses and the generation pipeline emits). The validation
 * section of scripts/parse-srd52.py is the reference implementation for the
 * consistency math (HP dice averages, mod/save sets, PB/XP tables) and the
 * text-extraction regexes.
 *
 * Severities (per the architecture contract):
 * - 'correctable' — out-of-budget or inconsistent NUMBERS. Findings carry the
 *   expected value; the caller clamps the numbers deterministically.
 * - 'reject' — the flavor itself is wrong. The generation pipeline routes
 *   these through a repair ladder, cheapest tool first (see generate.mjs):
 *   deterministic string surgery (caps/to-hit/second-person) → targeted fix
 *   calls (entry rewrites, seed-leakage renames) → full regeneration (only
 *   for STRUCTURAL_REJECTS: missing slots/sections/counts). Entry-scoped
 *   findings carry `loc: { section, entry }` so fix calls can address them.
 *
 * Rule groups:
 * - Context-free rules always run. Calibrated against all 329 SRD blocks:
 *   zero false positives (the corpus test pins this), with one caveat — the
 *   SRD itself contains two vestigial "to hit" strings and 13 legitimate
 *   "to hit with spell attacks" spellcasting headers; the rule excepts the
 *   spellcasting phrasing only.
 * - Budget rules run when opts.chassis (archetype-adjusted, from
 *   applyArchetype/chassisFor) is provided.
 * - Structural rules run when opts.plan (from slotPlanFor) is provided.
 *   Required slots use the slot-tag protocol: the prompt layer instructs the
 *   model to tag each section entry with the slot id it fills (entry.slot);
 *   passive slots (stat/field obligations) are checked directly against the
 *   model's fields.
 */
import { pbFor } from '../chassis/chassis.mjs';
import srdMonsters from '@/data/srd52-monsters.json';

const HP_BAND = [0.75, 1.35];

const XP_BY_CR = {
  0: 10, 0.125: 25, 0.25: 50, 0.5: 100, 1: 200, 2: 450, 3: 700, 4: 1100,
  5: 1800, 6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900, 11: 7200, 12: 8400,
  13: 10000, 14: 11500, 15: 13000, 16: 15000, 17: 18000, 18: 20000, 19: 22000,
  20: 25000, 21: 33000, 22: 41000, 23: 50000, 24: 62000, 25: 75000, 26: 90000,
  27: 105000, 28: 120000, 29: 135000, 30: 155000,
};

const ABILITIES = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];

// 2024 conditions that must render capitalized. "Exhaustion" is excluded —
// it appears legitimately in prose forms the SRD itself uses. Exported for
// the legacy converter's damage-vs-condition immunity classification.
export const CONDITIONS = [
  'Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated',
  'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained',
  'Stunned', 'Unconscious',
];
const LOWERCASE_CONDITION_RE = new RegExp(
  `\\b(${CONDITIONS.map((c) => c.toLowerCase()).join('|')})\\b`
);

// 2014-style lead-in glued onto the structured 2024 save skeleton
// ("...must make a Dexterity Saving Throw: DC 27, each creature...").
// Never legal 2024; zero hits across the SRD corpus.
const HYBRID_SAVE_RE =
  /must (?:make|succeed on) an? \*?(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\*? \*?Saving Throw\*?\s*:/i;

// Game terms the 2024 SRD always capitalizes (case-sensitive; zero lowercase
// occurrences across the corpus).
const LOWERCASE_TERM_RE = /\b(hit points?|opportunity attacks?|advantage|disadvantage|long rest|short rest|speed)\b/;

// "make(s) a <Name> attack" references — every one must resolve to a defined
// entry name (168 references across the corpus, zero dangling). Catches
// blocks that tell the DM to make an attack that was never written.
const ATTACK_REF_RE = /\bmakes? (?:a|an|one|two|three|four|up to \w+) ((?:[A-Z][\w'-]*\s?)+?) attacks?/g;

// Statblocks are third person; zero second-person occurrences in the corpus.
const SECOND_PERSON_RE = /\byours?\b/i;

// Blanket self-mitigation as a passive trait ("halves the damage against it")
// — a defensive multiplier the numeric bands can't see, effectively doubling
// HP outside the chassis budget. Zero occurrences in corpus Traits sections;
// the correctly priced form is a Reaction (one attack per round), which stays
// allowed. Edition-shared: classic Uncanny Dodge is a reaction in 2014 too.
// Spell save DCs must derive from the named ability: DC = 8 + PB + mod
// (±1 — one official block deviates by exactly 1). Matches both editions'
// phrasings. The fix direction is raising the ABILITY to meet the budget DC,
// never lowering the DC — so this is a reject, not a correctable.
const SPELL_DC_RES = [
  /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability \(spell save DC (\d+)/,
  /spellcasting ability is (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\s*\(spell save DC (\d+)/,
];
const ABILITY_ABBR = {
  Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON',
  Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA',
};

// 2024 capitalizes damage types ("Fire damage") and area shapes ("15-foot
// Cone") everywhere — zero lowercase occurrences across the corpus. Both are
// deterministically fixable string surgery.
const LOWERCASE_DAMAGE_TYPE_RE = /\b(bludgeoning|piercing|slashing|fire|lightning|cold|acid|thunder|necrotic|radiant|poison|psychic|force) damage\b/;
const LOWERCASE_AREA_RE = /\b\d+-foot (cone|line|sphere|cylinder|emanation|cube)\b/;
const DAMAGE_TYPE_WORD_RE = /\b(bludgeoning|piercing|slashing|fire|lightning|cold|acid|thunder|necrotic|radiant|poison|psychic|force)\b/i;

const SELF_MITIGATION_RE =
  /(halves?|halving|reduces?)[^.]{0,50}damage (against|dealt to|it takes|taken)|damage (against|dealt to) (it|the \w+'?s?\w*) is (halved|reduced)|halves? the( attack'?s?)? damage/i;

const SECTION_FOR_CATEGORY = {
  trait: 'Traits',
  action: 'Actions',
  bonus_action: 'Bonus Actions',
  reaction: 'Reactions',
};

// Passive required slots are field-level obligations, checked directly.
// Case-insensitive: 2024 blocks capitalize defense fields, 2014 blocks
// lowercase them — both are correct for their edition (live finding: a 2014
// swarm's lowercase "bludgeoning, piercing, slashing" failed the slot check
// and forced a doomed full regeneration).
// Canonical SRD creature names (cased), for stat-block references like
// "(use Stirge statistics)" — a misspelled reference ("Strige") is
// unadjudicable, and a unique close match respells deterministically.
const SRD_NAME_BY_LOWER = new Map(srdMonsters.map((m) => [m.name.toLowerCase(), m.name]));
function editDistance(a, b) {
  // Damerau-Levenshtein (OSA): adjacent transpositions cost 1 — "Strige" is
  // one swap from "Stirge" but two substitutions from "Sprite", so the
  // transposition-aware distance breaks that tie in the right direction.
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
      }
    }
  }
  return dp[a.length][b.length];
}

/** "Monstrosity" → "Monstrosities", "Undead"/"Fey" invariant, else +s.
 *  Accepts singular or (possibly mangled) plural input. */
export function pluralizeCreatureType(word) {
  const base = word.trim().replace(/ies$/i, 'y').replace(/(?<!s)s$/i, '');
  const cased = base[0].toUpperCase() + base.slice(1).toLowerCase();
  if (cased === 'Undead' || cased === 'Fey') return cased;
  if (/y$/i.test(cased)) return cased.replace(/y$/i, 'ies');
  return `${cased}s`;
}

const hasAll = (value, terms) => {
  const lower = (value ?? '').toLowerCase();
  return terms.every((t) => lower.includes(t));
};
const PASSIVE_SLOT_CHECKS = {
  'high STR': (m) => (m.stats?.STR ?? 0) >= 16,
  'resistance package: Bludgeoning/Piercing/Slashing': (m) =>
    hasAll(m.resistances, ['bludgeoning', 'piercing', 'slashing']),
  'condition immunities: Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned':
    (m) => hasAll(m.immunities, ['charmed', 'frightened', 'grappled', 'paralyzed', 'petrified', 'prone', 'restrained', 'stunned']),
};

/** floor(NdD average) + mod — mirrors avg_dice in parse-srd52.py. */
export function avgDice(expr) {
  const m = /^\s*(\d+)d(\d+)\s*([+-]\s*\d+)?\s*$/.exec(expr ?? '');
  if (!m) return null;
  const n = Number(m[1]);
  const d = Number(m[2]);
  const mod = m[3] ? Number(m[3].replace(/\s/g, '')) : 0;
  return Math.floor((n * (d + 1)) / 2) + mod;
}

const modOf = (score) => Math.floor((score - 10) / 2);

function entriesOf(monster) {
  const out = [];
  for (const [section, entries] of Object.entries(monster.sections ?? {})) {
    for (const entry of entries ?? []) out.push({ section, entry });
  }
  return out;
}

function maxExtracted(monster, re) {
  let max = null;
  for (const { entry } of entriesOf(monster)) {
    for (const m of entry.text.matchAll(re)) {
      const v = Number(m[1]);
      if (max === null || v > max) max = v;
    }
  }
  return max;
}

const ATTACK_LINE_RE = /(?:Melee|Ranged)(?: or Ranged)?(?: Weapon| Spell)? Attack(?: Roll)?:/;
const DAMAGE_EXPR_RE = /(\d+)\s*\((\d+d\d+(?:\s*[+-]\s*\d+)?)\)/g;

/**
 * Attack count from a Multiattack text. A stated bare total wins ("makes
 * three attacks: one Bite and two Claws" → 3); otherwise named groups SUM
 * ("makes two Barbed Thorn attacks and one Claw attack" → 3 — the old
 * max-of-any-number heuristic read that as 2, sizing each attack at half
 * the budget instead of a third and shipping a 150% routine); the max
 * heuristic remains only as a last resort.
 */
function multiattackCount(monster) {
  const entry = (monster.sections?.Actions ?? []).find((e) => e.name?.startsWith('Multiattack'));
  if (!entry) return 1;
  const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
  const val = (w) => WORDS[w.toLowerCase()] ?? Number(w);
  // Substitution clauses ("It can replace one Claw attack with a use of X")
  // name an attack that is SWAPPED OUT, not an extra one. Counting it
  // inflated the attack count, which shrank the per-attack budget and let
  // genuinely under-damage attacks pass the band (live: a CR 16 block whose
  // 3 attacks were counted as 4, dropping the budget from 14 to 11).
  const text = entry.text.replace(/\b(?:it )?can replace [^.]*\.?/gi, '');
  const total = /\bmakes (one|two|three|four|five|six|\d+) attacks?\b/i.exec(text);
  if (total && Number.isFinite(val(total[1]))) return Math.min(6, Math.max(1, val(total[1])));
  let sum = 0;
  for (const m of text.matchAll(/\b(one|two|three|four|five|six|\d+)\s+[A-Z][\w' -]*?\s+attacks?\b/g)) {
    if (Number.isFinite(val(m[1]))) sum += val(m[1]);
  }
  if (sum) return Math.min(6, sum);
  let max = 1;
  for (const m of entry.text.matchAll(/\b(one|two|three|four|five|six|\d+)\b/gi)) {
    const v = val(m[1]);
    if (Number.isFinite(v) && v > max && v <= 6) max = v;
  }
  return max;
}

const CONDITION_TOKEN_SET = new Set(
  [...CONDITIONS, 'Exhaustion'].map((c) => c.toLowerCase())
);

// Resistance cost by how often PLAYERS deal the type — psychic resistance is
// nearly free, fire resistance is a real tax. Immunity costs double;
// "nonmagical" qualifiers halve (their value decays as parties gear up).
export const DEFENSE_WEIGHTS = {
  bludgeoning: 1, piercing: 1, slashing: 1, fire: 1, lightning: 1,
  cold: 0.5, acid: 0.5, thunder: 0.5, necrotic: 0.5, radiant: 0.5, poison: 0.5,
  psychic: 0.25, force: 0.25,
};

function tokenWeight(token) {
  const lower = token.toLowerCase();
  let weight = 1; // unknown phrasing → conservative
  for (const [type, w] of Object.entries(DEFENSE_WEIGHTS)) {
    if (lower.includes(type)) { weight = w; break; }
  }
  return /nonmagical/.test(lower) ? weight / 2 : weight;
}

function splitTokens(value) {
  return (value ?? '').split(/[;,]/).map((s) => s.trim()).filter(Boolean);
}

// Canonical type-flavor defenses ride free (official design treats these as
// the type's identity, not a durability purchase): undead don't pay for
// poison immunity.
export const TYPE_FREEBIES = {
  undead: ['poison'], construct: ['poison', 'psychic'], elemental: ['poison'],
  ooze: ['acid'], celestial: ['radiant'], fiend: ['fire'],
};

const DAMAGE_TYPE_RE = new RegExp(
  `\\b(${Object.keys(DEFENSE_WEIGHTS).join('|')}) damage\\b`, 'gi'
);

// Body-material words → the damage type that material implies. An ice
// creature whose spikes deal piercing never says "cold damage", but it IS
// cold — material grants the freebie the dealt-type scan misses. Words are
// chosen to avoid common-prose collisions (no "light", no bare "burn").
const MATERIAL_LEXICON = {
  cold: ['ice', 'icy', 'frost', 'frozen', 'glacial', 'rime', 'snow'],
  fire: ['fire', 'flame', 'molten', 'magma', 'ember', 'burning'],
  lightning: ['lightning', 'storm'],
  thunder: ['thunder'],
  acid: ['acid', 'caustic', 'corrosive'],
  poison: ['venom', 'toxic'],
  necrotic: ['rot', 'rotted', 'grave', 'carrion'],
};

/** Damage types this creature is free to resist: its type's canonical
 * package, anything it DEALS itself (the fire-elemental principle), and
 * anything its body is MADE OF (the material principle). */
function freebieTypes(monster) {
  const free = new Set(TYPE_FREEBIES[(monster.type ?? '').toLowerCase()] ?? []);
  const prose = [monster.name ?? '', ...entriesOf(monster).map(({ entry }) => `${entry.name} ${entry.text}`)]
    .join(' ').toLowerCase();
  for (const m of prose.matchAll(DAMAGE_TYPE_RE)) free.add(m[1].toLowerCase());
  for (const [type, words] of Object.entries(MATERIAL_LEXICON)) {
    if (words.some((w) => new RegExp(`\\b${w}\\b`).test(prose))) free.add(type);
  }
  return free;
}

export function lintStatblock(monster, { chassis, plan, edition = '2024', seedTokens, perAttack, totalDamage, defenseCaps } = {}) {
  if (!monster || typeof monster !== 'object') {
    throw new TypeError('lintStatblock expects a statblock model object');
  }
  const is2024 = edition !== '2014';
  const findings = [];
  const push = (rule, severity, message, expected, loc) => {
    const f = { rule, severity, message };
    if (expected !== undefined) f.expected = expected;
    if (loc) f.loc = loc; // { section, entry } for entry-scoped findings
    findings.push(f);
  };

  // --- Context-free consistency rules -------------------------------------
  // the field-disjunction leak (the Unspoken's "telepathy 60 ft. (but
  // never initiates) or None", 2026-09-02 — the field picker printed both
  // candidates with an "or"; the alignment-lore leak's sibling)
  if (/(?:^|\s)or None\b/i.test(String(monster.languages ?? ''))) {
    push('field-disjunction', 'reject', `The languages line prints both candidates ("${monster.languages}") — pick one; a field never shows its deliberation`);
  }
  if (monster.hp != null && monster.hp_formula != null) {
    const avg = avgDice(monster.hp_formula);
    if (avg === null) {
      push('hp-formula', 'correctable', `HP formula "${monster.hp_formula}" is not parseable NdD ± mod`);
    } else if (avg !== monster.hp) {
      push('hp-formula', 'correctable', `HP listed ${monster.hp} but formula ${monster.hp_formula} averages ${avg}`, avg);
    }
  }

  if (monster.stats && monster.saves) {
    const pb = monster.pb ?? (monster.cr != null ? pbFor(monster.cr) : null);
    for (const [ab, save] of Object.entries(monster.saves)) {
      const score = monster.stats[ab];
      if (typeof score !== 'number') continue;
      const mod = modOf(score);
      const legal = pb == null ? [mod] : [mod, mod + pb, mod + 2 * pb];
      if (!legal.includes(save)) {
        push('saves', 'correctable', `${ab} save ${save} is not mod (${mod}) or mod+PB`, mod);
      }
    }
  }

  // Initiative absence is fine (the renderer derives it from DEX); when
  // present, the passive score must be 10 + bonus.
  if (monster.initiative_bonus != null || monster.initiative_score != null) {
    if (
      monster.initiative_bonus == null ||
      monster.initiative_score !== 10 + monster.initiative_bonus
    ) {
      const expected = monster.initiative_bonus != null ? 10 + monster.initiative_bonus : undefined;
      push('initiative', 'correctable', 'Initiative must pair a bonus with passive score 10 + bonus', expected);
    }
  }

  if (monster.pb != null && monster.cr != null) {
    const expected = pbFor(monster.cr);
    if (monster.pb !== expected) {
      push('pb', 'correctable', `PB +${monster.pb} inconsistent with CR ${monster.cr} (table says +${expected})`, expected);
    }
  }

  if (monster.xp != null && monster.cr != null) {
    const expected = XP_BY_CR[monster.cr];
    const ok = monster.cr === 0 ? monster.xp === 0 || monster.xp === 10 : monster.xp === expected;
    if (expected != null && !ok) {
      push('xp', 'correctable', `XP ${monster.xp} inconsistent with CR ${monster.cr} (table says ${expected})`, expected);
    }
  }

  // 2024 dropped the "from nonmagical attacks" qualifier — resistance and
  // immunity lines list bare damage types (zero corpus occurrences).
  // 2014 phrasing legitimately uses the qualifier, so 2024-only.
  for (const field of is2024 ? ['resistances', 'immunities', 'vulnerabilities'] : []) {
    if (monster[field] && /\s*from nonmagical attacks?/i.test(monster[field])) {
      push(
        'nonmagical', 'correctable',
        `"${field}" carries a 2014 "from nonmagical attacks" qualifier`,
        monster[field].replace(/\s*from nonmagical attacks?/gi, '')
      );
    }
  }

  // A damage type listed as both resisted and immune is contradictory —
  // immunity supersedes; zero corpus occurrences (live finding: acid in
  // both lines on an ooze). Correctable: drop it from resistances.
  if (monster.resistances && monster.immunities) {
    const typeOf = (tok) => DAMAGE_TYPE_WORD_RE.exec(tok)?.[1].toLowerCase();
    const immuneTypes = new Set(splitTokens(monster.immunities).map(typeOf).filter(Boolean));
    const kept = [];
    const dropped = [];
    for (const tok of splitTokens(monster.resistances)) {
      const t = typeOf(tok);
      (t && immuneTypes.has(t) ? dropped : kept).push(tok);
    }
    if (dropped.length) {
      push('defense-overlap', 'correctable', `Damage resistances repeat immune types (${dropped.join(', ')}) — immunity supersedes resistance`, kept.join(', '), { field: 'resistances' });
    }
  }
    // Full physical IMMUNITY has no printed home at all: 0 of 329 blocks
    // are immune to Bludgeoning, Piercing, AND Slashing — even swarms and
    // ghosts only resist. An unkillable-by-martials block shipped it live
    // at CR 8. Demoted to the resistance package, which at least has the
    // swarm/incorporeal precedent (and then answers to bps-resistance).
    if (is2024 && hasAll(monster.immunities, ['bludgeoning', 'piercing', 'slashing'])) {
      const kept = splitTokens(monster.immunities)
        .filter((tok) => !/(bludgeoning|piercing|slashing)/i.test(tok));
      push('bps-immunity', 'correctable',
        'Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities',
        kept.join(', '), { field: 'immunities' });
    }
    // A type both granted and suffered is a contradiction print never
    // states (resistance-vs-immunity overlap is defense-overlap's, above;
    // this covers the VULNERABILITY axis it does not).
    {
      const weak = splitTokens(monster.vulnerabilities).map((t) => t.toLowerCase());
      const granted = new Set([...splitTokens(monster.resistances), ...splitTokens(monster.immunities)]
        .map((t) => t.toLowerCase()));
      const clash = weak.filter((t) => granted.has(t));
      if (clash.length) {
        push('defense-line-overlap', 'correctable',
          `Vulnerable to ${clash.join(', ')} while also resisting or immune to it — the vulnerability is dropped`,
          splitTokens(monster.vulnerabilities).filter((t) => !clash.includes(t.toLowerCase())).join(', '),
          { field: 'vulnerabilities' });
      }
    }

  // Multiattack leads the Actions section in every official block (0/329
  // exceptions); a buried Multiattack (live: listed after the recharge
  // action) reads as an oversight. Deterministic reorder.
  {
    const acts = monster.sections?.Actions ?? [];
    const mi = acts.findIndex((e) => /^Multiattack/i.test(e.name ?? ''));
    if (mi > 0) {
      push('multiattack-order', 'correctable', `Actions: Multiattack is listed ${mi + 1} entries deep — officials always lead with it; it moves to the top`, undefined, { section: 'Actions', entry: acts[mi].name });
    }
  }

  // Duplicate entry texts within a section (live finding: two legendary
  // options with identical text under different names — one wasted slot).
  // 0/329. Reject: the fix call rewrites the duplicate into something new.
  for (const [dupSection, dupList] of Object.entries(monster.sections ?? {})) {
    const nameSeen = new Set();
    for (const e of dupList ?? []) {
      const base = (e.name ?? '').split(' (')[0].trim().toLowerCase();
      if (base && nameSeen.has(base)) {
        push('duplicate-name', 'correctable',
          `${dupSection}/${e.name}: two entries in this section share a name — identical copies are dropped; a genuinely different second ability must be renamed`,
          undefined, { section: dupSection, entry: e.name });
      } else if (base) {
        nameSeen.add(base);
      }
    }
    const seen = new Map();
    for (const e of dupList ?? []) {
      const key = (e.text ?? '').trim().toLowerCase();
      if (key && seen.has(key)) {
        push('duplicate-entry', 'reject',
          `${dupSection}/${e.name}: identical text to "${seen.get(key)}" — two names, one ability; rewrite this entry into something distinct`,
          undefined, { section: dupSection, entry: e.name });
      } else if (key) {
        seen.set(key, e.name);
      }
    }
  }

  // The same ability defined twice across sections (live 2014 finding:
  // "Crystal Burst" as a Trait AND "Crystal Burst (Reaction)" — one
  // paraphrased mechanic in two homes). Same-name attack-REUSE entries are
  // corpus-legal (legendary "Pseudopod: makes one Pseudopod attack"), so
  // only pairs whose texts substantially overlap flag. The Traits copy is
  // the wart (the sectioned copy is properly housed) — correctable drop;
  // a non-Traits pair goes to the fix call.
  {
    const bareName = (n) => {
      // Strip trailing parentheticals REPEATEDLY — a doubled suffix
      // ("Disengage (Bonus Action) (Bonus Action)", live) defeated the
      // single-strip match.
      let b = (n ?? '').trim();
      while (/\s*\([^)]*\)$/.test(b)) b = b.replace(/\s*\([^)]*\)$/, '').trim();
      return b.toLowerCase();
    };
    const tokensOf = (t) => new Set((t ?? '').toLowerCase().match(/[a-z']+/g) ?? []);
    const flat = Object.entries(monster.sections ?? {}).flatMap(([s, es]) => (es ?? []).map((e) => ({ s, e })));
    for (let i = 0; i < flat.length; i++) {
      for (let j = i + 1; j < flat.length; j++) {
        const a = flat[i];
        const b = flat[j];
        if (a.s === b.s || !bareName(a.e.name) || bareName(a.e.name) !== bareName(b.e.name)) continue;
        const ta = tokensOf(a.e.text);
        const tb = tokensOf(b.e.text);
        const inter = [...ta].filter((w) => tb.has(w)).length;
        if (inter / ((ta.size + tb.size - inter) || 1) < 0.5) continue;
        const traitCopy = a.s === 'Traits' ? a : (b.s === 'Traits' ? b : null);
        if (traitCopy) {
          const other = traitCopy === a ? b : a;
          push('duplicate-cross-section', 'correctable', `Traits/${traitCopy.e.name}: the same mechanic is defined again under ${other.s} — one ability, two homes; the Traits copy is dropped`, undefined, { section: 'Traits', entry: traitCopy.e.name });
        } else {
          push('duplicate-cross-section', 'reject', `${a.s}/${a.e.name} and ${b.s}/${b.e.name} define the same mechanic twice — merge them into one properly-housed entry`, undefined, { section: b.s, entry: b.e.name });
        }
      }
    }
  }

  // Seed-leakage (random-seeded generations only): the rolled trait words
  // must not surface in the creature's name or its ability names — the seed
  // is design guidance, not vocabulary. Promoted from a prompt rule after a
  // live failure ("drifting form" → "Driftking" + "Drifting Step").
  if (seedTokens?.length) {
    const leaksIn = (label, text) => {
      const lower = (text ?? '').toLowerCase();
      for (const token of seedTokens) {
        if (lower.includes(token)) {
          push('seed-leakage', 'reject', `${label} "${text}" uses the seed word "${token}" — seed traits are design guidance, never name vocabulary; invent unrelated names`);
        }
      }
    };
    leaksIn('Creature name', monster.name);
    for (const { section, entry } of entriesOf(monster)) {
      leaksIn(`${section} entry name`, entry.name);
    }
  }

  // Defense stacking (generated blocks only): weighted point budget — the
  // chassis HP already assumes a typical package, so surplus multiplies
  // effective HP past budget. Spend order: immunities first (identity
  // defenses survive), then resistances; conditions ride free.
  if (defenseCaps?.points != null) {
    let remaining = defenseCaps.points;
    const free = freebieTypes(monster);
    const results = {};
    for (const [field, mult] of [['immunities', 2], ['resistances', 1]]) {
      const kept = [];
      const conditions = [];
      let trimmedAny = false;
      for (const token of splitTokens(monster[field])) {
        if (CONDITION_TOKEN_SET.has(token.toLowerCase())) { conditions.push(token); continue; }
        const isFree = [...free].some((t) => token.toLowerCase().includes(t));
        const cost = isFree ? 0 : tokenWeight(token) * mult;
        if (cost <= remaining) { remaining -= cost; kept.push(token); }
        else trimmedAny = true;
      }
      if (trimmedAny) {
        results[field] = [kept.join(', '), conditions.join(', ')].filter(Boolean).join('; ');
      }
    }
    for (const [field, value] of Object.entries(results)) {
      push('defense-count', 'correctable',
        `damage ${field} exceed the ${defenseCaps.points}-point defense budget (weighted by how often players deal each type; immunities cost double)`,
        value || '', { field });
    }
  }

  // Defense lines separate damage types from conditions with a semicolon
  // ("Fire; Charmed, Frightened") — a comma-only line mixing both (live:
  // "Fire, Charmed, Frightened...") drops the official structure. 0/329.
  // Deterministic rebuild.
  for (const field of ['immunities', 'resistances']) {
    const v = monster[field];
    if (!v || v.includes(';')) continue;
    const toks = v.split(',').map((t) => t.trim()).filter(Boolean);
    const dmgToks = toks.filter((t) => DAMAGE_TYPE_WORD_RE.test(t));
    const condToks = toks.filter((t) => CONDITION_TOKEN_SET.has(t.toLowerCase()));
    if (dmgToks.length && condToks.length && dmgToks.length + condToks.length === toks.length) {
      push('defense-line-separator', 'correctable',
        `The ${field} line mixes damage types and conditions without the official semicolon separator`,
        `${dmgToks.join(', ')}; ${condToks.join(', ')}`, { field });
    }
  }

  // Conditions cannot be "resisted" in 5e — condition tokens belong in
  // immunities (live finding: "Resistances: ..., Fire; Charmed, Frightened").
  // Zero corpus occurrences. The applicator moves them across fields.
  {
    const conds = splitTokens(monster.resistances)
      .filter((t) => CONDITION_TOKEN_SET.has(t.toLowerCase()));
    if (conds.length) {
      push('resistance-conditions', 'correctable', `Conditions listed as resistances (${conds.join(', ')}) — 5e has no condition resistance; they move to immunities`, undefined, { field: 'resistances' });
    }
  }

  // Internal swarm contradiction: the Swarm trait says "can't regain hit
  // points", then another entry heals the swarm (live finding: Corpse
  // Feast). Keyed on the swarm-form clause so the Aboleth's target-side
  // curse ("the target can't regain Hit Points") stays legal.
  const swarmNoHeal = entriesOf(monster).some(({ entry }) =>
    /swarm can't regain hit points/i.test(entry.text));

  // Entry names any attack reference may resolve against (parentheticals
  // like "(2/Day)" stripped, prefix matches allowed — mirrors the corpus
  // calibration).
  const entryNames = entriesOf(monster).map(({ entry }) => entry.name.replace(/\s*\(.*\)$/, ''));

  for (const { section, entry } of entriesOf(monster)) {
    const where = `${section}/${entry.name}`;
    const loc = { section, entry: entry.name };
    // An entry with a name and no rules text is unusable at the table
    // (0/329 + 0/327 near-empty; live: Lullaby Maw shipped "Psionic
    // Lullaby (1/Day)." with nothing under it — the audit even caught it
    // but the finding died on strict entry-name matching). The fix call
    // writes the mechanic.
    // _stub entries are the reroll pseudo-block's name-only context rows.
    if (!entry._stub && (entry.text ?? '').trim().length < 3) {
      push('empty-entry', 'reject', `${where}: the entry has no rules text — write the complete mechanic this name promises`, undefined, loc);
      continue;
    }
    if (entry._stub) continue;
    // Damage RIDERS are pure dice — the flat bonus belongs to the primary
    // expression only (0/329 + engine discipline; live: "plus 12 (2d8 + 3)
    // Fire"). Deterministic: recompute the rider as pure dice.
    if (/\bplus \d+\s*\(\d+d\d+\s*[+-]\s*\d+\)/.test(entry.text)) {
      push('rider-flat-bonus', 'correctable', `${where}: a damage rider carries a flat bonus — riders are pure dice; the flat is dropped and the average recomputed`, undefined, loc);
    }
    // A Bonus Actions entry opening "As a Bonus Action," restates its own
    // section (0/329). Deterministic strip.
    if (section === 'Bonus Actions' && /^As a Bonus Action,?\s*/i.test(entry.text.trim())) {
      push('ba-opener', 'correctable', `${where}: a Bonus Actions entry doesn't announce "As a Bonus Action" — the section already says it`, undefined, loc);
    }
    // Prone never takes a duration — standing up IS its exit (0/329 2024,
    // 0/327 2014; live: Zizzak's Swarm Rush shipped "Prone condition until
    // the end of the zizzak's next turn" via an audit-suggested fix).
    // Both editions; deterministic strip.
    if (/\b(?:the [Pp]rone condition|knocked [Pp]rone|falls? [Pp]rone) (?:until|for)\b/.test(entry.text)) {
      push('prone-duration', 'correctable', `${where}: Prone carries a duration — officials never duration Prone (standing up is the exit); the duration is stripped`, undefined, loc);
    }
    // Action references must name a STANDARD action or one of the block's
    // own entries — officials reference only Hide/Dash/their own attacks
    // (live: Prism Lurcher "takes the withdrawal action", which no rules
    // text defines). Fix ladder rewrites to a real action.
    {
      const STANDARD_ACTIONS = new Set(['attack', 'dash', 'disengage', 'dodge', 'help', 'hide', 'ready', 'search', 'study', 'utilize', 'magic', 'grapple', 'shove', 'influence', 'multiattack']);
      const GENERIC = new Set(['same', 'chosen', 'following', 'listed', 'previous', 'triggering', 'this', 'that', 'an', 'another', 'legendary', 'bonus']);
      const ownNames = new Set(entriesOf(monster).map((x) => x.entry.name.split(' (')[0].toLowerCase()));
      for (const m of entry.text.matchAll(/\bthe (\w+) action\b/gi)) {
        const ref = m[1].toLowerCase();
        if (!STANDARD_ACTIONS.has(ref) && !GENERIC.has(ref) && !ownNames.has(ref)) {
          push('unknown-action-ref', 'reject', `${where}: "the ${m[1]} action" is not a standard action or one of this block's entries — reference a real action (Dash, Disengage, Dodge, Hide…) or an entry by name`, undefined, loc);
        }
      }
    }
    // Swarm-defining mechanics on a block that isn't typed as a swarm
    // (live: Shimmerscale Serpent, a Medium Monstrosity with "Swarm Form"
    // and a colony that disperses). Corpus-safe: every official with these
    // phrases carries "Swarm of" in its name (7/7). Structural — the fix
    // is an identity decision (commit to Swarm typing with the half-damage
    // law, or drop the colony mechanics), so it earns a regeneration.
    if (/occupy another creature's space|opening large enough for a Tiny/i.test(entry.text)
      && !/swarm/i.test(`${monster.type ?? ''} ${monster.name ?? ''} ${monster.subtype ?? ''}`)) {
      push('swarm-content-untyped', 'reject', `${where}: swarm/colony mechanics on a non-swarm block — either type it "Swarm of Tiny <X>" (with the swarm trait set and half-damage attack clauses) or remove the colony mechanics`, undefined, loc);
    }
    // Entry-name parentheticals outside the official metering set are
    // meta-instructions leaking into the name (live: "Disengage (if not
    // already used)"). Strip to the base name.
    {
      const pm = /\(([^)]+)\)\s*$/.exec(entry.name);
      // Official paren set (full corpus enumeration): metering (Recharge…,
      // N/Day…, Costs N), requirements (Requires …), and form qualifiers
      // (… Form Only). Everything else is a meta-instruction leak.
      if (pm && !/^(?:Recharge[\s\d]|\d+\/Day|Costs \d+|Bonus Action$|Reaction$|\d+\/Turn|Requires )/i.test(pm[1].trim())
        && !/Form Only$/i.test(pm[1].trim()) && !/^Recharge after/i.test(pm[1].trim())) {
        push('entry-name-meta-paren', 'correctable', `${where}: "(${pm[1]})" in an entry name is not official metering (Recharge/N-Day/Costs) — the parenthetical is stripped`, undefined, loc);
      }
    }
    // "uses <X>" must resolve to a real entry (live: a legendary action
    // named "Swarm Eruption" whose text says "uses Swarm Eruption" — no
    // such entry exists anywhere in the block; the real action was
    // "Swarm's Talons"). Officials resolve 100% after or-list/multiplier
    // normalization. Self-loops count as dangling unless ANOTHER entry
    // carries the name (a legendary "Scatter" may use the ACTION Scatter).
    {
      const allEntries = entriesOf(monster);
      const OK_REFS = new Set(['spellcasting', 'multiattack', 'dash', 'disengage', 'dodge', 'hide', 'help', 'ready', 'search', 'attack']);
      const ownBase = entry.name.split(' (')[0].toLowerCase();
      for (const m of entry.text.matchAll(/\buses? (?:its |the )?([A-Z][\w' -]+?)(?:\s+(?:action|reaction))?(?=[.,;]|\s+(?:if|to|again|twice|three|or|while|on|against|and|as|instead)\b)/g)) {
        for (const refRaw of m[1].split(/\s+or\s+/)) {
          const ref = refRaw.trim().replace(/\s*\(.*$/, '').replace(/'s\b.*$/, '').replace(/\s+(?:stat block|twice|three times)$/i, '').toLowerCase(); // possessive strip: "Molten Crown's AC bonus" refs Molten Crown (FP 2026-09-01)
          if (!ref || OK_REFS.has(ref) || /stat block/i.test(refRaw)) continue;
          const resolvedElsewhere = allEntries.some((x) => x.entry !== entry && x.entry.name.split(' (')[0].toLowerCase() === ref);
          // Self-mentions are official (reuse-restriction prose inside the
          // same entry) — dangling only when the ENTIRE entry is a bare
          // delegation to itself with nothing else to point at (live:
          // "Swarm Eruption. The boulderhatch uses Swarm Eruption...").
          const bareDelegation = ref === ownBase
            && new RegExp(`^The [\\w' -]+ uses (?:its |the )?${ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^.]*\\.?$`, 'i').test(entry.text.trim());
          if (!resolvedElsewhere && (ref !== ownBase || bareDelegation)) {
            push('dangling-use-ref', 'reject', `${where}: "uses ${refRaw.trim()}" references an entry that doesn't exist — reference a real entry by its exact name`, undefined, loc);
          }
        }
      }
    }
    // Self-afflicted condition the block is IMMUNE to — a hard
    // contradiction whatever the phrasing (live: a Construct immune to
    // Stunned that stuns ITSELF as a cost, three times). Name-subject
    // anchored so "The target has the Stunned condition" never matches;
    // the older generic self-afflicted-condition rule stays for the
    // sentence-shape inversions.
    {
      const immLine = `${monster.immunities ?? ''} ${monster.condition_immunities ?? ''}`.toLowerCase();
      const headWord = (monster.name ?? '').trim().split(/\s+/).pop();
      if (headWord && headWord.length >= 4) {
        // Subject position only: the name must follow a sentence boundary
        // with at most an adverb before "has" — "pushed away from the
        // elemental and has the Prone condition" (official Whirlwind) puts
        // the name in OBJECT position and must not match.
        const subj = `(?:^|[.:?!]\\s+|\\*\\s*)[Tt]he (?:${(monster.name ?? '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|${headWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`;
        const m = new RegExp(`${subj}(?: then| now| also| afterward)? has the (Blinded|Charmed|Deafened|Frightened|Grappled|Incapacitated|Paralyzed|Petrified|Poisoned|Prone|Restrained|Stunned|Unconscious) condition`, 'i').exec(entry.text);
        if (m && immLine.includes(m[1].toLowerCase())) {
          push('self-condition-immunity-contradiction', 'reject', `${where}: the creature gives ITSELF the ${m[1]} condition but its Immunities line includes ${m[1]} — remove one side of the contradiction (immune creatures cannot be afflicted, even by themselves)`, undefined, loc);
        }
      }
    }
    // A statue-still disguise expressed as the Invisible condition —
    // Invisible means unseen, not indistinguishable (0/329; live: False
    // Appearance granting Invisible for standing motionless). Redesign to
    // the disguise form ("indistinguishable from an ordinary <object>").
    if (/motionless[^.]*Invisible condition|Invisible condition[^.]*motionless/i.test(entry.text)) {
      push('motionless-invisible', 'reject', `${where}: motionless disguise written as the Invisible condition — a still creature is indistinguishable from an object, not unseen; use "is indistinguishable from an ordinary <object>"`, undefined, loc);
    }
    // Fused "Grappled (escape DC N) and the Restrained condition" leaves
    // the Restrained end-condition undefined — the official form links it
    // to the grapple ("until the grapple ends", 2/2 official uses; the
    // fused form is 0/329). Deterministic rewrite.
    if (/Grappled condition \(escape DC \d+\) and the Restrained condition/.test(entry.text)) {
      push('grapple-restrain-linkage', 'correctable', `${where}: Restrained is granted alongside the grapple with no end condition — linked to the grapple per the official form`, undefined, loc);
    }
    // Necrotic damage on substance-mechanical types has ZERO official
    // precedent (Elemental/Construct/Beast/Ooze/Celestial: 0 of 141
    // blocks; live: a necromantic "Elemental" whose whole suite was
    // death magic). Monstrosity/Plant/Fiend/Humanoid carry it officially
    // and stay legal. The fix call re-themes the damage — or the audit
    // retypes the block.
    if (/Necrotic damage/.test(entry.text)
      && /^(?:Elemental|Construct|Beast|Ooze|Celestial)$/i.test((monster.type ?? '').split(' ')[0])) {
      push('type-damage-affinity', 'reject', `${where}: Necrotic damage on ${monster.type} — no official ${monster.type} deals Necrotic; re-theme the damage to the creature's substance (or the type itself is wrong)`, undefined, loc);
    }
    // Raise-the-dead necromancy on substance-mechanical types (same
    // restricted set as type-damage-affinity). Officials put it on Undead
    // AND a Dragon (Create Undead) — so only the types where death magic
    // has no story are flagged.
    {
      const necroSpell = /(Animate Dead|Create Undead|Finger of Death|Circle of Death|Danse Macabre)/.exec(entry.text);
      if (necroSpell && /^(?:Elemental|Construct|Beast|Ooze|Celestial)$/i.test((monster.type ?? '').split(' ')[0])) {
        push('spell-type-affinity', 'reject', `${where}: ${necroSpell[1]} on ${monster.type} — raise-the-dead necromancy belongs to Undead (and mortal or fiendish necromancers); pick spells that express this creature's type`, undefined, loc);
      }
    }
    // "Immune to damage" + a damage-threshold end condition in one entry
    // is an unadjudicable loop — if immune, the threshold can never be
    // reached (live: Entomb's Petrified target "Immune to damage" that
    // frees at 50+ damage). 0/329.
    if (/[Ii]mmune to (?:all )?damage/.test(entry.text) && /takes? \d+ (?:or more )?damage/.test(entry.text)) {
      push('immune-damage-end-contradiction', 'reject', `${where}: the target is immune to damage AND the effect ends on a damage threshold — one side must go (officials use Resistance to all damage for entombment, keeping the threshold reachable)`, undefined, loc);
    }
    // Conditions imposed via ability CHECK — effects use SAVING THROWS;
    // checks belong to escapes and contests (0/329 for "succeed on a X
    // check ... or <effect>"; live: an aura imposing Prone on a failed
    // "Strength check (DC 25)").
    if (/succeed on a (?:DC \d+ )?\w+ check(?: \(DC \d+\))? or /i.test(entry.text)) {
      push('check-imposes-condition', 'reject', `${where}: an imposed effect uses an ability CHECK — effects are resisted with SAVING THROWS ("<Ability> Saving Throw: DC n"); checks are for escapes and contests`, undefined, loc);
    }
    // A BUFF gated behind a saving throw is inverted mechanics — allies
    // don't save against help, and the live case granted MORE on a failed
    // save (Glimmering Dome: Failure 15 THP + Advantage, Success 7 THP).
    // 0/329 with the target-beneficial pattern (the Sphinx "gains 1
    // Exhaustion level" and the Wisp regaining its OWN HP don't match).
    if (/(?:Failure|Success):[^.]*target (?:gains \d+ (?:temporary )?Hit Points|regains \d+ Hit Points|has Advantage)/i.test(entry.text)) {
      push('buff-behind-save', 'reject', `${where}: a beneficial effect sits behind a saving throw — buffs are granted, never saved against; redesign without the save frame`, undefined, loc);
    }
    // "can't be has the X condition" — two 2024 idioms fused into garble
    // (live: Starfilth's Drifting Form). Deterministic.
    if (/\bbe has the\b/.test(entry.text)) {
      push('garbled-condition-grammar', 'correctable', `${where}: "be has the" is fused grammar — normalized to "have the"`, undefined, loc);
    }
    // Flat damage REDUCTION doesn't exist in officials (0/329) — mitigation
    // is Resistance or an AC/save mechanic (live: "reduces the damage by
    // 10 (3d6)"). Needs a redesign → fix ladder.
    if (/reduc\w+ (?:the |that )?damage (?:taken )?by \d+/i.test(entry.text)) {
      push('flat-damage-reduction', 'reject', `${where}: flat damage reduction is not a 5e mechanic — express mitigation as Resistance, Half Cover, or an AC bonus`, undefined, loc);
    }
    // "once per combat/encounter" is video-game vocabulary — 0/329 + 0/327
    // (live: Reedwrack's Sunken Lunge). Deterministic: becomes "once per
    // day", the nearest official metering.
    if (/\bper (?:combat|encounter)\b/i.test(entry.text)) {
      push('per-combat-vocab', 'correctable', `${where}: "per combat/encounter" is not 5e vocabulary — officials meter with per day/turn; rewritten to per day`, undefined, loc);
    }
    // An area-effect referent with no area defined before it ("each
    // creature in that area" and nothing establishes the area) is
    // unadjudicable — the audit prompt's own exemplar class, caught
    // deterministically. 0/329; the 2014 corpus's 50 uses ALL define the
    // area first (0 dangling). Needs new content → reject, fix ladder.
    {
      const areaRef = /(?:each|a|any) creature in (?:that|the) area/i.exec(entry.text)
        ?? /\b(?:enters?|starts its turn (?:in|inside)|within) the (?:cloud|zone|aura|mist|vapor|web|field)\b/i.exec(entry.text)
        ?? /(?:each|a|any) creature in the (?:line|path|trail|wake)\b/i.exec(entry.text);
      if (areaRef && !/Emanation|Cone|Line|Sphere|Cylinder|Cube|radius|-foot/i.test(entry.text.slice(0, areaRef.index))) {
        push('undefined-area', 'reject', `${where}: targets an area or zone ("${areaRef[0]}") that is never defined — name the shape, size, and origin (e.g. "a 20-foot Emanation originating from it")`, undefined, loc);
      }
    }
    // A repeat-save sentence in an entry that contains NO save ("The
    // target repeats the save...") is an orphan — usually duplicated from
    // the entry it synergizes with (live: Sussanyx's Spore Saturation
    // copied Spore Breath's repeat line into a trait where "the save" has
    // no referent). 0/329 + 0/327. Deterministic strip; the entry stands
    // complete without it.
    if (/repeats? the sav|ending the (?:effect|condition) on a success/i.test(entry.text)
      && !/DC \d+|[Ss]aving [Tt]hrow/.test(entry.text)) {
      push('orphan-repeat-save', 'correctable', `${where}: has a repeat-save sentence but no save — "the save" has no referent here; the sentence is stripped`, undefined, loc);
    }
    if (is2024) {
      if (/(Melee|Ranged)\s+(Weapon|Spell)\s+Attack/.test(entry.text)) {
        push('phrasing-2014', 'reject', `2014 attack phrasing in ${where} — use "Melee Attack Roll:" form`, undefined, loc);
      }
      if (/to hit(?! with spell attacks)/.test(entry.text)) {
        push('phrasing-to-hit', 'reject', `"to hit" phrasing in ${where} — 2024 attack lines carry no "to hit"`, undefined, loc);
      }
      if (/Saving Throw \(DC \d+\)/.test(entry.text)) {
        push('phrasing-saving-throw', 'reject', `Saving throw in ${where} writes its DC in a parenthetical — the skeleton is "*Ability Saving Throw:* DC n, <targets>"`, undefined, loc);
      }
      // Rider saves (trait triggers, attack riders, bonus actions) revert to
      // 2014 phrasing while primary saves get the skeleton (live: Pumpkin
      // King ×3, Tarwretch ×2). Subject-scoped, 0/329: officials' swallow
      // regurgitation saves have the MONSTER as saver ("the behir must
      // succeed…"), and ability CHECKS legitimately keep the "must succeed
      // on a DC 15 Wisdom (Perception) check" form (Gelatinous Cube).
      // The optional bridge covers targeting qualifiers ("each creature in
      // that area must succeed") but excludes commas — "one creature inside
      // it, the behir must succeed" hands the verb to a NEW subject.
      if (/\b(?:the target|the attacker|each creature|that creature|a creature|the creature|its target)(?:\s+(?:in|within|that|of|inside|touching|near)[^,.]{0,120})?\s+must succeed on a DC \d+\s+\w+\s+saving throw/i.test(entry.text)
        || /unless the (?:attacker|target|creature) succeeds on a DC \d+/i.test(entry.text)) {
        push('phrasing-rider-save', 'reject', `2014 rider-save phrasing in ${where} — rider saves use the skeleton too: "*<Ability> Saving Throw:* DC n, <target>. *Failure:* <effect>"`, undefined, loc);
      }
      // Rider-save targeting that contradicts the entry's own attack/prose
      // range (live: Reedwrack "On a hit, ... one creature within 60 feet"
      // — WHICH creature? — and Wracking Flense prose "within 5 feet"
      // against a "within 60 feet" skeleton). 0/329 both shapes.
      if (/On a hit,?\s*\*?[A-Z]\w+ Saving Throw\*?:?\s*DC \d+,\s*one creature within \d+ feet/i.test(entry.text)
        || (/Attack Roll:/i.test(entry.text) && /Saving Throw\*?:?\s*DC \d+,\s*one creature within \d+ feet/i.test(entry.text))) {
        push('rider-target-mismatch', 'correctable', `${where}: an on-hit rider save re-targets "one creature within N feet" — the saver is the creature that was hit; targeting becomes "the target"`, undefined, loc);
      } else {
        const prose = /within (\d+) feet of (?:it|the [\w' -]+?)\b/i.exec(entry.text);
        const skel = /Saving Throw\*?:?\s*DC \d+,\s*one creature within (\d+) feet/i.exec(entry.text);
        if (prose && skel && prose[1] !== skel[1]) {
          push('rider-target-mismatch', 'correctable', `${where}: prose says within ${prose[1]} feet but the save targets one creature within ${skel[1]} feet — the skeleton takes the prose range`, undefined, loc);
        }
      }
      // Emanation vocabulary: officials size Emanations plainly and they
      // ORIGINATE from the creature — never "-radius" and never "centered
      // on" (0/329; live: Reedwrack's Stifling Bog). Deterministic.
      if (/-radius Emanation/i.test(entry.text) || /Emanation cent(?:er|r)ed on/i.test(entry.text)
        || /within an? \d+-foot Emanation/i.test(entry.text)) {
        push('emanation-form', 'correctable', `${where}: Emanations are sized plainly, originate from the creature, and targets are IN them ("each creature in a 20-foot Emanation originating from") — never "-radius", "centered on", or "within a"`, undefined, loc);
      }
      // Lines carry BOTH dimensions — all 24 official Lines are
      // "N-foot-long, M-foot-wide" (0/329 one-dimensional; live: Gongthokk
      // "10-foot Line"). Deterministic: the official default width is 5 feet.
      if (/\b\d+-foot Line\b/.test(entry.text) || /-foot-wide Line that is \d+ feet wide/i.test(entry.text)) {
        push('line-dimensions', 'correctable', `${where}: a Line needs length AND width exactly once ("60-foot-long, 5-foot-wide Line")`, undefined, loc);
      }
      // Flat damage bonuses don't exist in officials (0/329 + 0/327) —
      // damage riders are extra DICE ("deals an extra 4 (1d8)"), and the
      // engine's damage discipline is dice + stat mod exactly (live:
      // Gongthokk's Echoing Shards "+2 bonus to damage rolls").
      if (/\+\d+ (?:bonus )?to (?:its )?damage rolls/i.test(entry.text)) {
        push('flat-damage-bonus', 'reject', `${where}: grants a flat damage bonus — officials express damage riders as extra dice ("deals an extra 4 (1d8) damage"); rewrite it that way`, undefined, loc);
      }
      // "Success: Half damage and no push." — the official idiom for
      // rider-cancels-on-success is "Half damage only." (11 official uses,
      // 0 of the "and no X" form; live: Cinderstone Giant). Deterministic.
      if (/Success:\*?\s*Half damage,? and (?:no |the (?:target|creature) (?:isn't|is not) )/i.test(entry.text)) {
        push('success-half-only', 'correctable', `${where}: "Half damage and no <rider>" normalizes to the official "Half damage only."`, undefined, loc);
      }
      // "falls Prone" is 2014 vocabulary (6 official 2014 uses) — 2024
      // writes "has the Prone condition" (0/329 "falls Prone"). 2024-gated.
      if (/\bfalls? Prone\b/.test(entry.text) || /\bknocked Prone\b/.test(entry.text)) {
        push('prone-vocab', 'correctable', `${where}: "falls/knocked Prone" is 2014 phrasing — 2024 writes "has the Prone condition"`, undefined, loc);
      }
      // "of the <noun>'s choice" where the noun is neither this monster nor
      // the DM — a stale identity leak (live: "any creature of the herder's
      // choice" on a block named Grinding Hardshell). Officials use their
      // OWN name or "of its choice"; the rewrite is the safe official form.
      {
        const cm = /of the (\w+)'s choice/i.exec(entry.text);
        if (cm) {
          const nameWords = new Set(`${monster.name ?? ''}`.toLowerCase().split(/\s+/));
          const ok = nameWords.has(cm[1].toLowerCase()) || ['dm', 'gm'].includes(cm[1].toLowerCase());
          if (!ok) {
            push('choice-referent', 'correctable', `${where}: "${cm[0]}" names something that isn't this creature — rewritten to "of its choice"`, cm[0], loc);
          }
        }
      }
      // A "cannot be <Condition>" clause restating the Immunities line is
      // redundant (0/329; the one 2014 near-miss — Mummy Lord's whirlwind
      // form — has the condition NOT on its line, hence the immunities
      // gate). The fix call drops the clause.
      {
        const restated = /can(?:'t|not) be (Charmed|Frightened|Grappled|Paralyzed|Poisoned|Stunned|Restrained|Petrified|Blinded|Deafened)/i.exec(entry.text);
        const immLine = `${monster.immunities ?? ''} ${monster.condition_immunities ?? ''}`.toLowerCase();
        if (restated && immLine.includes(restated[1].toLowerCase())) {
          push('immunity-restated-clause', 'reject', `${where}: "cannot be ${restated[1]}" restates the Immunities line — the line is the authority; drop the clause`, undefined, loc);
        }
      }
      for (const m of entry.text.matchAll(/Saving Throw/g)) {
        const before = entry.text.slice(0, m.index);
        if (!new RegExp(`(${ABILITIES.join('|')})[*\\s]*$`).test(before)) {
          push('phrasing-saving-throw', 'reject', `Saving throw in ${where} must name an ability: "*Constitution Saving Throw*: DC n"`, undefined, loc);
          break;
        }
      }
      const lower = LOWERCASE_CONDITION_RE.exec(entry.text);
      if (lower) {
        push('condition-caps', 'reject', `Lowercase condition "${lower[1]}" in ${where} — 2024 conditions are capitalized`, undefined, loc);
      }
      if (HYBRID_SAVE_RE.test(entry.text)) {
        push('phrasing-hybrid-save', 'reject', `Hybrid save phrasing in ${where} — the "*Ability Saving Throw*: DC n, <targets>" skeleton is the whole sentence; drop the "must make a" lead-in`, undefined, loc);
      }
      const term = LOWERCASE_TERM_RE.exec(entry.text);
      if (term) {
        push('term-caps', 'reject', `Lowercase game term "${term[1]}" in ${where} — 2024 capitalizes Hit Points and Opportunity Attacks`, undefined, loc);
      }
      const lcType = LOWERCASE_DAMAGE_TYPE_RE.exec(entry.text);
      if (lcType) {
        push('damage-type-caps', 'reject', `Lowercase damage type "${lcType[1]}" in ${where} — 2024 capitalizes damage types ("Fire damage")`, undefined, loc);
      }
      const lcArea = LOWERCASE_AREA_RE.exec(entry.text);
      if (lcArea) {
        push('area-term-caps', 'reject', `Lowercase area shape "${lcArea[0]}" in ${where} — 2024 capitalizes shapes ("15-foot Cone")`, undefined, loc);
      }
      // THE DICE BELT (2026-09-02, the Last Dawn Knight's flat "58 Radiant
      // damage" — second sighting of the exact number, which is the
      // wildcard prompt's own damage cap echoed back as prose). Print
      // always writes dice with the average; a flat figure also evades
      // the per-hit and area caps, which key on the "N (XdY)" format.
      // Lint-side so it catches the class wherever the dice vanish.
      // exemption: print's ONE flat-damage shape is the self-inflicted
      // weakness ("the vampire takes 20 Acid damage if it ends its turn
      // in running water" — Vampire/Spawn, the corpus's only 4 sightings)
      const flatDmg = /\b\d{2,3} (?:Acid|Bludgeoning|Cold|Fire|Force|Lightning|Necrotic|Piercing|Poison|Psychic|Radiant|Slashing|Thunder) damage(?! if it (?:starts|ends) its turn)/.exec(entry.text);
      if (flatDmg) {
        push('diceless-damage', 'reject', `Flat "${flatDmg[0]}" in ${where} — damage prints its dice ("58 (13d8+3) Radiant damage"); a diceless figure evades the damage caps`, undefined, loc);
      }
      // "30-foot-radius circle" — not a 5e area term (the one corpus "circle"
      // is the *Magic Circle* spell); the official shape is a Sphere.
      if (/\b\d+-foot(?:-radius)? circle\b/i.test(entry.text)) {
        push('area-circle', 'reject', `${where}: "circle" is not a 5e area — use a Sphere`, undefined, loc);
      }
      if (section === 'Legendary Actions' && /\(Costs \d+ Actions?\)/i.test(entry.name)) {
        push('legendary-cost-2024', 'correctable', `${where}: 2024 legendary options never carry cost suffixes (the uses pool replaced them; zero corpus occurrences)`, entry.name.replace(/\s*\(Costs \d+ Actions?\)/i, ''), loc);
      }
      // 2024 removed the surprised state (surprise now = Disadvantage on
      // initiative); "a creature that is surprised" is 2014 assassin-template
      // language. Zero corpus occurrences.
      if (/\bsurprised\b/i.test(entry.text)) {
        push('phrasing-surprised', 'reject', `${where} references "surprised" — 2024 has no surprised state (surprise gives Disadvantage on initiative); phrase the trigger as "a creature that hasn't taken a turn in combat yet"`, undefined, loc);
      }
      // Fake statuses smuggled in WITHOUT the "has the X condition" wrapper
      // ("is Slowed" — 4e-ism; live finding). Context-anchored so legit
      // sentence-start words don't collide; "Cursed" excluded (Rakshasa
      // uses it officially).
      {
        const fake = /\b(?:is|becomes|remains) (Slowed|Dazed|Weakened|Hastened|Winded|Chilled|Confused)\b/.exec(entry.text);
        if (fake) {
          push('condition-fake', 'reject', `${where}: "${fake[1]}" is not a 5e condition — use a real condition or describe the effect mechanically (e.g. "its Speed is halved")`, undefined, loc);
        }
      }
      // "*Success:* No effect." / "Success: The target is not X." — official
      // style OMITS the Success clause when success does nothing (zero
      // corpus occurrences). Deterministically stripped.
      if (/\*?Success:\*?\s*(?:No effect|No damage|None|The \w+ is not [A-Z]\w+)\.?/i.test(entry.text)) {
        push('success-no-effect', 'reject', `${where}: a Success clause that does nothing — omit *Success:* entirely when success has no effect`, undefined, loc);
      }
      // 2014 residue in a Success clause ("Success: Half as much Lightning
      // damage.") — 2024 writes "Success: Half damage only." (0/329; live
      // 2014→2024 conversion leak, three blocks in one batch).
      if (/Success:\*?\s*Half as much/i.test(entry.text)) {
        push('success-half-phrasing', 'reject', `${where}: "Half as much damage" is the 2014 form — 2024 Success clauses read "Half damage only."`, undefined, loc);
      }
      // A save skeleton fused mid-sentence ("...damage and Strength Saving
      // Throw: DC 17, the target.") — skeletons always start a sentence
      // (0/329; live conversion artifact).
      if (/(?:\band |[a-z]\w*: |, )\*?(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw:?\*?\s*DC/.test(entry.text)) {
        push('skeleton-fusion', 'reject', `${where}: a save skeleton is fused mid-sentence (after "and", a colon, or a comma) — skeletons always start a sentence`, undefined, loc);
      }
      // Trigger:/Response: is the REACTION format — in any other section it
      // is a conversion garble ("Trigger: The storm takes this action.
      // Response: It does so." — live legendary actions). 0/329.
      if (section !== 'Reactions' && /\*?Trigger:\*?/.test(entry.text)) {
        push('trigger-outside-reactions', 'correctable', `${where}: Trigger:/Response: markers belong to Reactions only — the entry states its effect directly`, undefined, loc);
      }
      // A creature declaring a CONDITION on itself ("The facetwing has the
      // Poisoned condition." — live conversion INVERSION of "is immune to
      // the poisoned condition"). Only the Invisible Stalker's permanent
      // Invisibility does this legitimately (1/329) — Invisible is exempt.
      const selfAfflict = /(?:^|\. )The [\w' -]+ has the (Blinded|Charmed|Deafened|Frightened|Grappled|Incapacitated|Paralyzed|Petrified|Poisoned|Prone|Restrained|Stunned|Unconscious) condition\./.exec(entry.text);
      if (selfAfflict) {
        push('self-afflicted-condition', 'reject', `${where}: the creature declares the ${selfAfflict[1]} condition on ITSELF — almost certainly an inverted immunity or garbled effect; state the immunity in the Immunities line or describe the real effect`, undefined, loc);
      }
      // A hybrid attack whose Failure clause REPEATS the attack line's own
      // damage as a bare average ("25 Poison damage" with no dice) double-
      // counts it (live conversion artifact, Spore Volley). Officials'
      // hybrid Failure clauses only ever carry EXTRA dice damage (0/329).
      {
        const atk = /Attack Roll:\*?\s*[+-]\d+[^]*?(\d+)\s*\(\d*d\d+[^)]*\)\s*(\w+) damage/.exec(entry.text);
        if (atk && new RegExp(`Failure:\\*?[^.]*?\\b${atk[1]} ${atk[2]} damage(?!\\s*\\()`).test(entry.text)) {
          push('failure-damage-echo', 'correctable', `${where}: the Failure clause repeats the attack's own ${atk[1]} ${atk[2]} damage — the attack already dealt it; the echo is removed`, { avg: atk[1], type: atk[2] }, loc);
        }
      }
      // "The creature casts..." as the SUBJECT — generic-referent leak; the
      // monster names itself (0/329).
      if (/(?:^|\. )The creature (?:casts|makes|uses)\b/.test(entry.text)) {
        push('generic-self-reference', 'correctable', `${where}: "The creature" as the acting subject — the monster names itself`, undefined, loc);
      }
      // 2024 renamed the entry: "Spellcasting", never "Innate Spellcasting"
      // (0/329).
      if (/^Innate Spellcasting$/i.test((entry.name ?? '').trim())) {
        push('spellcasting-entry-name', 'correctable', `${where}: 2024 names this entry "Spellcasting"`, 'Spellcasting', loc);
      }
      // Invented conditions: "has the X condition" where X isn't one of the
      // 14 real conditions (+ Exhaustion). The model occasionally imports
      // 4e-isms ("Dazed") or invents status names. The SRD's compound form
      // ("has the Blinded and Restrained conditions") validates per token.
      for (const cm of entry.text.matchAll(/has the ([A-Za-z]\w*(?:(?:,? and |, )[A-Za-z]\w*)*) conditions?\b/g)) {
        for (const token of cm[1].split(/,? and |, /)) {
          if (!CONDITION_TOKEN_SET.has(token.toLowerCase())) {
            push('condition-unknown', 'reject', `${where} grants a condition that does not exist in 5e: "${token}" — use only real conditions (${CONDITIONS.join(', ')}), or phrase the effect without the word "condition"`, undefined, loc);
          }
        }
      }
      // A flavor sentence targeting "one creature within X feet" followed by
      // a save skeleton targeting "one creature within Y feet" contradicts
      // itself (live: "lunges at one creature within 15 feet. *Dexterity
      // Saving Throw:* DC 17, one creature within 60 feet"). Officials never
      // state a one-creature range twice in an entry (0/329, even matching
      // ranges) — the flavor range is the design; the skeleton follows it.
      const dual = /\bone creature within (\d+) feet\b[^.]*\.[^]*?(Saving Throw:?\*?\s*DC \d+, one creature within )(\d+)(?= feet)/.exec(entry.text);
      if (dual && dual[1] !== dual[3]) {
        push('hybrid-range-mismatch', 'correctable', `${where} targets one creature within ${dual[1]} feet in prose but within ${dual[3]} feet in the save skeleton — the skeleton follows the stated range`, { from: dual[3], to: dual[1] }, loc);
      }
    } else {
      // 2014 edition: the inverse phrasing gate — 2024-isms are the defect.
      if (/(Melee|Ranged)(?: or Ranged)? Attack Roll:/.test(entry.text) || /\*?Failure:\*?/.test(entry.text)) {
        push('phrasing-2024-in-2014', 'reject', `2024 phrasing in ${where} — 2014 blocks use "Melee Weapon Attack: +X to hit" and "must succeed on a DC n ... saving throw" forms, never "Attack Roll:" or "Failure:" markers`, undefined, loc);
      }
      // "must make a DC n X saving throw OR <condition>" mixes the two
      // classic constructions — "make ... , taking damage" pairs with
      // damage, "succeed on ... or" pairs with conditions. Deterministic.
      if (/\bmust (?:also )?make an? DC \d+ [A-Za-z]+ saving throw or\b/.test(entry.text)) {
        push('phrasing-save-or', 'reject', `Mixed save construction in ${where} — condition saves read "must succeed on a DC n <Ability> saving throw or ..."`, undefined, loc);
      }
      // 2024 vocabulary that does not exist in 2014 — conversion leaks
      // (live batch: six converted soak-3 blocks leaked all four classes).
      // Definitionally absent from the 2014 SRD (0/327 sweep each):
      // Bloodied and Emanation were introduced in 2024, and 2014 prose
      // writes "is stunned" with lowercase area shapes.
      if (/\b[Bb]loodied\b/.test(entry.text)) {
        push('bloodied-in-2014', 'reject', `${where} uses "Bloodied" — the term does not exist in 2014; write "has half of its hit points or fewer"`, undefined, loc);
      }
      if (/\b[Ee]manation\b/.test(entry.text)) {
        push('emanation-in-2014', 'reject', `${where} uses "Emanation" — a 2024-only area shape; 2014 writes "each creature within N feet of it" or an "N-foot-radius sphere"`, undefined, loc);
      }
      const capArea = /\b(?:\d+-foot(?:-radius|-long|-wide)? |[Tt]he )(Cone|Line|Sphere|Cylinder|Cube)\b/.exec(entry.text);
      if (capArea) {
        push('area-caps-in-2014', 'reject', `Capitalized area shape "${capArea[1]}" in ${where} — 2014 lowercases shapes ("15-foot cone")`, undefined, loc);
      }
      if (/\bha(?:s|ve) the [A-Za-z]\w*(?:(?:,? and |, )[A-Za-z]\w*)* conditions?\b/.test(entry.text)) {
        push('condition-phrase-in-2014', 'reject', `${where} uses 2024 condition grammar ("has the X condition") — 2014 writes "is X"`, undefined, loc);
      }
      // Spell tiers flattened onto one line ("...components: At will: minor
      // illusion, blade ward 1/day each: fear") — official 2014 spellcasting
      // puts every tier marker at a line start ("\n\nAt will: ..."; 19/19
      // corpus spellcasters). Live finding: the conversion call dropped the
      // newlines and the tier list became unreadable.
      if (/[^\n] (?:[Aa]t will:|\d+\/[Dd]ay each:)/.test(entry.text) || /(?:^|\n)at will:/.test(entry.text)) {
        push('spell-tiers-inline', 'reject', `${where}: spell tier markers ("At will:", "N/day each:") must each start their own line with corpus casing`, undefined, loc);
      }
      // Capitalized conditions mid-sentence are a 2024-ism leaking into 2014
      // prose (live: "becomes Restrained until the end of its next turn").
      // 0/327 in official entry prose; the immunity LINES stay capitalized
      // per the internal convention and are not entry text.
      const capCond = /[a-z,;] (Blinded|Charmed|Deafened|Frightened|Grappled|Incapacitated|Invisible|Paralyzed|Petrified|Poisoned|Prone|Restrained|Stunned|Unconscious)\b/.exec(entry.text);
      if (capCond) {
        push('condition-caps-in-2014', 'reject', `${where}: capitalized condition "${capCond[1]}" mid-sentence — 2014 prose lowercases conditions`, undefined, loc);
      }
      // "half as much on a successful one" drops the word "damage" —
      // corpus always writes "half as much damage" (0/327).
      if (/half as much on a success/i.test(entry.text)) {
        push('half-as-much-phrasing', 'reject', `${where}: "half as much on a successful one" — corpus writes "half as much damage on a successful one"`, undefined, loc);
      }
      // A grapple imposed with no escape DC is unadjudicable (live: "or be
      // grappled. While grappled in this way, the creature is restrained."
      // — no DC anywhere). 0/327 + 0/329 for both imposition shapes (the
      // save-or form and the Hit-rider form; "grappled by" preconditions
      // and escape traits never match). Mirrors the 2024 grapple-exit rule,
      // whose anchors are 2024-phrasing-bound.
      if (chassis && !/escape DC/i.test(entry.text)
        && (/(?:saving throw|ability check) or (?:be|is|becomes?) grappled\b/i.test(entry.text)
          || (/Hit:/.test(entry.text) && /\bis grappled\b(?!\s*\()(?! by)/i.test(entry.text)))) {
        push('grapple-escape-dc-2014', 'correctable',
          `${where}: a grapple is imposed with no escape DC — 5e grapples always carry one; stamping (escape DC ${Math.max(8, chassis.save_dc - 2)})`,
          Math.max(8, chassis.save_dc - 2), loc);
      }
    }
    for (const ref of entry.text.matchAll(ATTACK_REF_RE)) {
      const name = ref[1].trim();
      if (!entryNames.some((n) => n === name || n.startsWith(name))) {
        push('undefined-attack-ref', 'reject', `${where} references a "${name}" attack that is not defined anywhere in the statblock`, undefined, loc);
      }
    }
    // "uses X" / "a use of X" references must resolve too (live finding: a
    // Multiattack and a 1/Day both referenced "Wing Burst" after the recharge
    // action was renamed "Shardstorm" — the reuse texts were never rewritten,
    // leaving an unadjudicable block). Extraction handles alternations
    // ("Pummel or Spellcasting"), trailing words ("Nightmare Haunting
    // action", "Holy Burst twice"), and clause boundaries ("Bite while…") —
    // 26/26 official uses-references resolve under it.
    // Stat-block references ("use Stirge statistics" / "uses the Treant stat
    // block") must name a real SRD creature or the block itself — a
    // misspelled reference ("Strige", live finding) sends the GM hunting for
    // a statblock that doesn't exist. A unique close match (edit distance
    // ≤ 2) respells deterministically; anything else goes to the fix call.
    for (const sb of entry.text.matchAll(/\buses? (?:the )?([A-Z][\w' -]+?) (?:stat block|statistics)\b/gi)) {
      const raw = sb[1].trim();
      const lower = raw.toLowerCase();
      if (SRD_NAME_BY_LOWER.has(lower) || lower === (monster.name ?? '').toLowerCase()) continue;
      // Unique minimum-distance match within 2 wins; a tie is ambiguous.
      const scored = [...SRD_NAME_BY_LOWER.keys()]
        .filter((n) => Math.abs(n.length - lower.length) <= 2)
        .map((n) => [n, editDistance(n, lower)])
        .filter(([, d]) => d <= 2)
        .sort((x, y) => x[1] - y[1]);
      const close = scored.length && (scored.length === 1 || scored[0][1] < scored[1][1]) ? [scored[0][0]] : [];
      if (close.length === 1) {
        push('stat-ref', 'correctable', `${where}: "${raw}" is not an SRD stat block — respelling to "${SRD_NAME_BY_LOWER.get(close[0])}"`,
          SRD_NAME_BY_LOWER.get(close[0]), { section, entry: entry.name, from: raw });
      } else {
        push('stat-ref', 'reject', `${where}: "${raw}" is not an SRD stat block — reference a real SRD creature's statistics or drop the reference`, undefined, loc);
      }
    }
    // Lookahead additions (live gap: "use its Storm Invisibility (or a
    // similar trait...)" — the parenthetical defeated every terminator, so
    // the undefined reference went unchecked): `\s*\(` ends a name at a
    // parenthetical, and `\s+and\b`/`\s+to\b` end it at clause boundaries
    // (the Aboleth's "uses Consume Memories and regains 5 (2d4)..." must
    // capture "Consume Memories", not the whole clause). Prefix-matching
    // resolution keeps names that legitimately contain " and"/" to" safe.
    // ...plus the official substitution phrasings the first 2014-corpus
    // sweep of this rule exposed as over-captures ("Hurl Flame in place of
    // any melee attack", "Swallow instead of its bite", "Engulf on it").
    for (const ref of entry.text.matchAll(/\b(?:uses?|(?:a|one) use of)\s+(?:(?:a|one) use of\s+)?(?:its\s+)?([A-Z][\w' -]+?)(?= to\b|\s+and\b|\s+again\b|\s+if\b|\s+in\b|\s+instead\b|\s+on\b|\s+against\b|\s+without\b|\s+while\b|\s+when\b|\s+stat(?:istics|\s+block)\b|\s*\(|[.,;:]|$)/g)) {
      // Stat-block references ("use Stirge statistics") are stat-ref's
      // business, not entry-reference resolution's.
      if (/^\s+stat(?:istics|\s+block)\b/i.test(entry.text.slice(ref.index + ref[0].length))) continue;
      for (const part of ref[1].split(/ or /)) {
        const name = part.replace(/^\([A-C]\)\s*/, '').replace(/'s\b.*$/, '').replace(/\s+(?:action|attack|twice|once)$/, '').trim();
        if (!name || !/^[A-Z]/.test(name) || /^(?:Spellcasting|Multiattack)$/i.test(name)) continue;
        if (!entryNames.some((n) => n === name || n.startsWith(name))) {
          push('undefined-attack-ref', 'reject', `${where} references a use of "${name}", which is not defined anywhere in the statblock — rewrite the reference to name a real entry`, undefined, loc);
        }
      }
    }
    if (SECOND_PERSON_RE.test(entry.text)) {
      push('second-person', 'reject', `Second-person voice in ${where} — statblocks are third person ("of the creature's choice", never "of your choice")`, undefined, loc);
    }
    // A passive triggered rider filed under Actions ("The first time on
    // each of the bonecradle's turns that it hits..." — nothing a creature
    // DOES with its action; live 2014 finding, Grasping Earth). Officials:
    // 0/329 + 0/327 actions open with a trigger phrase. Relocates to Traits.
    if (section === 'Actions' && /^(?:When(?:ever)? |The first time )/i.test(entry.text.trim())) {
      push('action-passive-rider', 'correctable', `${where}: the entry is a triggered rider, not something the creature does with its action — it moves to Traits`, undefined, loc);
    }
    // An entry named after the MONSTER itself ("Shusspore. While buried..."
    // on a monster named Shusspore) — officials never do this (0/329 +
    // 0/327); the name says nothing about what the ability does.
    if ((entry.name ?? '').trim().toLowerCase() === (monster.name ?? '').trim().toLowerCase() && (monster.name ?? '').trim()) {
      push('entry-named-after-monster', 'reject', `${where}: the entry is named after the creature itself — rename it to plain English describing what the ability does`, undefined, loc);
    }
    // The naming prompt's own example ability names, copied verbatim as an
    // entry name (live 2014 finding: a trait shipped named "Helping Snarl" —
    // the rename-guidance example). Instruction-leak family.
    if (/^(?:Helping Snarl|Tar Tendril)$/i.test((entry.name ?? '').trim())) {
      push('prompt-example-name', 'reject', `${where}: "${entry.name}" is a verbatim example from the naming instructions, not a name for THIS ability — rename it to plain English describing what the ability does`, undefined, loc);
    }
    // "adjacent" is 3e vocabulary — zero corpus occurrences in either
    // edition (0/329 + 0/327); 5e writes "within 5 feet of".
    if (/\badjacent\b/i.test(entry.text)) {
      push('vocab-adjacent', 'reject', `${where} uses "adjacent" — not 5e vocabulary in either edition; write "within 5 feet of"`, undefined, loc);
    }
    // "has the inability to X" — a condition-izing garble of "can't X"
    // (live conversion artifact; 0/329 + 0/327).
    if (/ha(?:s|ve) the inability to/i.test(entry.text)) {
      push('inability-phrasing', 'reject', `${where}: "has the inability to" — write "can't"`, undefined, loc);
    }
    // Off-register vocabulary with zero corpus occurrences in either
    // edition: "attacks of opportunity" (word order) and "may" (5e writes
    // "can" — 0/329 + 0/327).
    if (/attacks? of opportunity/i.test(entry.text) || /\bmay\b/.test(entry.text)) {
      push('vocab-register', 'reject', `${where}: off-corpus register — "opportunity attacks" (never "attacks of opportunity") and "can" (never "may")`, undefined, loc);
    }
    // Prose distances write "feet" — "within 30 ft.", "by 10 ft.", "a 10 ft.
    // radius" appear in zero corpus entries in either edition (the ft.
    // abbreviation belongs to reach/range clauses and stat lines).
    if (/\b(?:within|up to|by) \d+ ft\.|\ba \d+ ft\. radius|\b\d+ ft\. away/i.test(entry.text)) {
      push('prose-ft-abbrev', 'reject', `${where}: prose distances write "feet", never "ft." ("within 30 feet", "a 10-foot radius")`, undefined, loc);
    }
    // ALL-CAPS entry names ("CRACKLE (1/Day)") — style wart, deterministically
    // title-cased by the corrections pass. Judged on the base name so
    // mixed-case parentheticals don't mask it.
    {
      const base = entry.name.split(' (')[0];
      if (base.length > 3 && /[A-Z]{3}/.test(base) && base === base.toUpperCase()) {
        const titled = entry.name.replace(base,
          base.toLowerCase().replace(/(^|\s)\w/g, (c) => c.toUpperCase()));
        push('entry-name-caps', 'correctable', `${where}: all-caps entry name`, titled, loc);
      }
    }
    // A reaction with no trigger is a free action in disguise — the trigger
    // is what prices it (once per round, only when the event occurs). 2024
    // uses the official "*Trigger:* ... *Response:* ..." form (the SRD has no
    // bespoke-reaction exemplar; its only 3 reactions delegate via "in
    // response to the spell's trigger", which stays legal — corpus: 3/3 pass).
    // 2014 triggers are loose prose (Parry has no "when" at all), so this is
    // prompt-enforced only there. Empty text = pseudo-block stub, skip.
    if (is2024 && section === 'Reactions' && entry.text.trim()
        && !/\*Trigger:\*/.test(entry.text) && !/\bin response to\b/i.test(entry.text)) {
      push('reaction-trigger', 'reject', `${where} has no trigger — a Reaction is not a free action; it must state when it fires: "*Trigger:* <specific event>. *Response:* <what the creature does>."`, undefined, loc);
    }
    // Recharge is action-economy — zero corpus Traits carry it (33 use the
    // legal "(N/Day)" form). Deterministic: swap the marker.
    if (section === 'Traits' && /\(Recharge[^)]*\)/i.test(entry.name)) {
      push('trait-recharge', 'correctable', `${where}: Recharge belongs to actions — a limited trait uses (N/Day)`, entry.name.replace(/\s*\(Recharge[^)]*\)/i, ' (1/Day)'), loc);
    }
    // Comedic/gross-out entry names ("Slurp" as a stealth trait) — the
    // bathos ban pickName applies to creature names, extended to abilities.
    if (/\b(slurp|burp|gulp|squelch|splat|boop|bonk|tickle|wiggle|giggle|snuggle|slink[iy]|bounc[iy]|squish[iy]|wobbl[iy])\w*\b/i.test(entry.name)) {
      push('entry-name-bathos', 'reject', `${where}: comedic/diminutive entry name — name the ability with words that keep their menace. Rename it`, undefined, loc);
    }
    // An entry named after the creature itself ("Uulmoth" as a trait name)
    // — zero corpus occurrences; ability names describe the ability.
    if (monster.name && entry.name.split(' (')[0].toLowerCase() === monster.name.toLowerCase()) {
      push('entry-name-self', 'reject', `${where}: the entry is named after the creature itself — name what the ability DOES. Rename it`, undefined, loc);
    }
    // Anchor covers any subject ("the swarm/the Klakkhorde/it regains N") —
    // the old literal "swarm regains" missed name and pronoun subjects
    // (live finding: a can't-heal swarm shipped with TWO healing mechanics).
    // Correctable now: heal clauses strip deterministically; an entry that
    // was ONLY a heal is removed.
    if (swarmNoHeal && /\bregains? \d+[^.]*Hit Points/i.test(entry.text)) {
      push('swarm-heal-contradiction', 'correctable', `${where} heals the swarm, but the Swarm trait says it can't regain Hit Points — the healing is stripped (heal-only entries are removed)`, undefined, loc);
    }
    if (/centred/.test(entry.text)) {
      push('spelling-centred', 'reject', `${where}: "centred" — the books use American spelling ("centered")`, undefined, loc);
    }
    // A legendary option that RECHARGES another ability breaks recharge
    // economics — one legendary use converts a once-per-2.5-rounds nova into
    // an every-round nova (live: "Recharge Cannon. The golem recharges its
    // Chest Cannon."). 0/329. Fix call replaces the option.
    if (section === 'Legendary Actions' && !/\((?:Recharge|\d+\s*\/\s*Day)/i.test(entry.name)
      && (/\brecharges? (?:its |the )?[A-Z]/.test(entry.text)
        || /no Recharge(?: roll)? (?:is )?(?:required|needed)|without (?:expending|requiring) (?:a |its )?Recharge|retakes? [^.]*Recharge/i.test(entry.text))) {
      push('legendary-recharge', 'reject', `${where}: a legendary option must never recharge another ability — that converts a Recharge nova into an every-round attack; replace this option with a small independent action`, undefined, loc);
    }
    // Design vocabulary leaking into entry names ("Hungry Absorption
    // (Half-Damage Mode)") — slot/budget language is instructions, not
    // content; zero corpus occurrences. Renameable, like coinages.
    if (/\b(mode|nova|slot|budget|tier|dpr|half-damage)\b/i.test(entry.name)) {
      push('entry-name-design-term', 'reject', `${where}: entry name leaks design vocabulary — name the ability in-world (never "mode", "slot", "budget", "tier", "nova"). Rename it`, undefined, loc);
    }
    // Mechanic suffixes are Multiattack's business, not the name's (live
    // finding: "Pinning Grip (Replaces One Attack)"); 0/329 officials.
    if (/replaces? one attack|in place of (?:an|one) attack/i.test(entry.name)) {
      push('entry-name-design-term', 'reject', `${where}: the substitution mechanic belongs in Multiattack's text ("can replace one attack with a use of X"), never in an entry name. Strip the suffix and state the substitution in Multiattack`, undefined, loc);
    }
    // "makes two Chain Blade Attack attacks" — an entry name ending in
    // "Attack" doubles every reference; the noun IS the attack (0/329).
    // Renamed with propagation (references must follow).
    if (/ Attacks?$/i.test(entry.name) && ATTACK_LINE_RE.test(entry.text)) {
      push('entry-name-attack-suffix', 'correctable',
        `${where}: entry names never end in "Attack" — references double up ("makes two ${entry.name} attacks"). Renamed to "${entry.name.replace(/ Attacks?$/i, '')}"`,
        entry.name.replace(/ Attacks?$/i, ''), loc);
    }
    // An entry name that promises a MOVEMENT MODE the creature lacks reads
    // as capability the sheet doesn't back ("Burrow-Burst" on a block with
    // no Burrow speed — live: the Chasmvein). 0 of 329 printed entries
    // name a mode their block lacks. The text delivering the mode ("the
    // creature burrows...") clears it — the name then describes the entry.
    {
      // fly is deliberately absent: "Flying X" names an object's property
      // (print's animated Flying Sword flies itself), and Flyby-on-walker
      // is the movement gate's job at pick time.
      const MODES = [['burrow', /\bburrow(?:s|ing)?\b/i], ['swim', /\bswim(?:s|ming)?\b/i], ['climb', /\bclimb(?:s|ing)?\b/i]];
      const speed = String(monster.speed ?? '').toLowerCase();
      for (const [mode, re] of MODES) {
        if (re.test(entry.name) && !speed.includes(mode) && !re.test(entry.text)) {
          push('entry-name-mode-mismatch', 'reject', `${where}: the name promises ${mode} but the block has no ${mode} speed and the text never ${mode}s — rename the entry or add the speed`, undefined, loc);
        }
      }
    }
    // An entry name that declares a damage type the entry doesn't deal
    // reads as crossed wires (live: "Furnace Lightning" dealing Thunder on
    // a Lightning-immune block). 0 of 329 printed blocks do this — every
    // type-named official entry deals its named type. Correctable: the
    // named type swaps to the type actually dealt, with reference
    // propagation. Entries that deal no typed damage are skipped (a
    // "Lightning Ward" that only grants immunity is fine).
    {
      const TYPE_WORDS = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder'];
      const ALL_TYPES = TYPE_WORDS.concat(['Bludgeoning', 'Piercing', 'Slashing']);
      const dealt = [...entry.text.matchAll(/(\w+) damage/g)].map((m) => m[1])
        .filter((t) => ALL_TYPES.includes(t));
      if (dealt.length) {
        for (const ty of TYPE_WORDS) {
          if (new RegExp(`\\b${ty}\\b`, 'i').test(entry.name) && !dealt.includes(ty)) {
            const fixed = entry.name.replace(new RegExp(`\\b${ty}\\b`, 'i'), dealt[0]);
            push('entry-name-type-mismatch', 'correctable',
              `${where}: the name says ${ty} but the entry deals ${dealt.join('/')} — a type-named ability must deal its named type (0/329 officials mismatch). Renamed to "${fixed}"`,
              fixed, loc);
            break;
          }
        }
      }
    }
    // "casts *Fog Cloud*, *Stinking Cloud*" reads as casting BOTH at once —
    // a comma splice where print writes "or" (every printed in-entry cast
    // names one spell or an or-list). Deterministic repair: the comma
    // between two spell names inside one casts clause becomes " or".
    {
      // ...but "casts *A*, *B*, or *C*" is print's own Oxford or-list (the
      // Priest's Divine Aid) — the splice is only a splice when the list
      // never reaches an "or".
      const spliced = entry.text.match(/casts (\*[^*]+\*), (\*[^*]+\*)(?!\s*(?:,|or\b))/);
      if (spliced) {
        push('cast-comma-splice', 'correctable',
          `${where}: "casts ${spliced[1]}, ${spliced[2]}" — a comma splice that reads as casting both simultaneously; print writes "or"`,
          entry.text.replace(/casts (\*[^*]+\*), (\*[^*]+\*)/, 'casts $1 or $2'), loc);
      }
    }
    // "can squeeze through a space ... without squeezing" (live garble) —
    // the official Amorphous verb is "move through". Deterministic.
    if (/can squeeze through [^.]*? without squeezing/i.test(entry.text)) {
      push('squeeze-phrasing', 'correctable',
        `${where}: "can squeeze through ... without squeezing" contradicts itself — the official verb is "move through"`,
        undefined, loc);
    }
    // Reaction-phrased text outside the Reactions section (live finding: a
    // re-rolled ACTION came back as "can use its Reaction to force..." —
    // wrong section, and the entry contradicts its own header). 0/329.
    // Reject: the fix call (or re-roll retry) rewrites it as a true entry of
    // its section; in re-roll flow a failed retry preserves the original.
    if (section !== 'Reactions' && /\b(?:can use|uses) (?:its|a|her|his|their) Reaction\b/i.test(entry.text)) {
      push('section-shape', 'reject', `${where}: this is written as a Reaction ("uses its Reaction") but sits under ${section} — write a true ${section} entry, or it belongs in Reactions with the *Trigger:*/*Response:* form`, undefined, loc);
    }
    // A bare "Hit:" marker is 2014 phrasing and is off-skeleton: 0/329 in the
    // corpus, since our attack skeleton states damage directly. Live finding:
    // a "Hit:" clause DUPLICATING the damage already stated ("21 (4d6 + 7)
    // Piercing damage. Hit: 21 (4d6 + 7) damage, or ..."). Fix call rewrites
    // — deduplication surgery is not safely deterministic.
    //
    // "*Hit or Miss:*" is EXEMPT: it is official 2024 phrasing for weapons
    // that return to the wielder, used by the Ice Devil, Merfolk Skirmisher,
    // Salamander and Solar (4/329). This rule previously caught it and the
    // corpus sweep still read 0/329, because all four blocks carried a parse
    // artifact ("HitomThe") that hid the marker from both the rule and the
    // sweep. Repairing the corpus surfaced the false positive.
    if (is2024 && /(?<!or Miss)\bHit:/.test(entry.text)) {
      push('phrasing-hit-marker', 'reject', `${where}: "Hit:" markers are not part of the 2024 skeleton — state damage directly after the attack roll (and never state it twice); riders are plain sentences`, undefined, loc);
    }
    // Bare "Legendary Resistance" without a uses suffix is unlimited — the
    // name IS the mechanic's budget (live finding; officials always carry
    // "(3/Day)" or "(3/Day, or 4/Day in Lair)"). Deterministic rename.
    if (/^Legendary Resistance$/.test(entry.name.trim())) {
      push('legendary-resistance-uses', 'correctable',
        `${where}: Legendary Resistance must carry its uses ("(3/Day)") — a bare name reads as unlimited`,
        'Legendary Resistance (3/Day)', loc);
    }
    // A reaction trigger whose subject is "The target" has no referent —
    // nothing has defined a target yet (live finding: "Trigger: The target
    // takes damage from a melee attack roll" on a block whose reaction
    // meant "the dust"). 0/329. Fix call rewrites with a real actor.
    if (/(?:\*Trigger:\*|Trigger:)\s*The target\b/.test(entry.text)) {
      push('reaction-trigger-referent', 'reject',
        `${where}: the trigger's subject "The target" has no referent — name the creature itself or the acting enemy ("A creature within 30 feet hits the swarm...")`,
        undefined, loc);
    }
    // A trait CONTRADICTING the defense lines (live finding: "Icy Carapace.
    // The swarm has Resistance to Cold damage..." on a block whose
    // Immunities line says Cold) — the line is the authority; the sentence
    // is stripped, keeping any real mechanic that follows. Only fires when
    // something follows (entire-text restatements are defense-restated's
    // business). 0/329 contradictions in officials.
    if (section === 'Traits') {
      const claim = /The [\w' -]+ has (Resistance|Immunity) to ([A-Z]\w+)(?: and ([A-Z]\w+))? damage\.\s*/.exec(entry.text);
      if (claim && entry.text.trim() !== claim[0].trim()) {
        const imm = (monster.immunities ?? '').toLowerCase();
        const res = (monster.resistances ?? '').toLowerCase();
        const contradicts = [claim[2], claim[3]].filter(Boolean).some((t) => {
          const lower = t.toLowerCase();
          return (claim[1] === 'Resistance' && imm.includes(lower))
            || (claim[1] === 'Immunity' && res.includes(lower) && !imm.includes(lower));
        });
        if (contradicts) {
          push('defense-contradiction', 'correctable',
            `${where}: the trait claims ${claim[1]} to ${claim[2]} but the defense lines say otherwise — the lines are the authority; the sentence is stripped`,
            undefined, loc);
        }
      }
    }
    // A trait whose ENTIRE text restates the defense lines ("The swarm has
    // resistance to Cold and Lightning damage" — live finding, Rattling
    // Shell) is a wasted trait slot; the lines already carry it. 0/329.
    // Partial restatements with a real mechanic attached (Frozen Carapace)
    // stay legal. Fix call replaces it with an actual mechanic.
    // Edition-robust: 2014 text lowercases types and chains compounds ("has
    // resistance to cold damage and immunity to poison damage and the
    // poisoned condition" — live 2014 finding, "Glimborg"), which the
    // original capitalized two-branch regex sailed past.
    if (section === 'Traits'
      && (/^The [\w' -]+ (?:has|is) (?:resistance|resistant|immunity|immune)[^.]*(?:damage|conditions?)\.$/i.test(entry.text.trim())
        || /^The [\w' -]+(?:'s [\w' -]+)? is [^.]*grants? (?:it|the [\w' -]+) (?:resistance|immunity)[^.]*\.$/i.test(entry.text.trim()))) {
      push('defense-restated', 'reject', `${where}: this trait only restates the Resistances/Immunities lines — the lines already carry it; replace it with a real mechanic or drop it`, undefined, loc);
    }
    // The coined-name detector is RETIRED (owner call, 2026-08-05): its
    // hyphen-fragment heuristic could not tell "Tar-Slick Claw" from
    // "Thul-eg" without a dictionary — an allowlist would never be long
    // enough — and its failure mode, reverting good names to donor
    // placeholders ("Slaying Bow" re-exposed on a tar zombie), was
    // strictly worse than an occasional odd coinage, which the audit's
    // judgment layer can flag. Naming discipline lives in the flavor
    // prompt now.
    if (section === 'Traits' && SELF_MITIGATION_RE.test(entry.text)) {
      push('trait-mitigation', 'reject', `Blanket damage mitigation as a passive trait in ${where} — the chassis already prices defenses; single-attack mitigation must be a Reaction (once per round)`, undefined, loc);
    }
    // Per-attack damage must land within the HP-band ratios of the budget —
    // the model sometimes writes internally-consistent dice at half (or
    // double) the skeleton, silently shifting the effective CR. Runs only
    // when the pipeline supplies perAttack; recharge novas are exempt (they
    // legitimately exceed the per-attack budget).
    if (perAttack != null && ATTACK_LINE_RE.test(entry.text) && !/recharge/i.test(entry.name)) {
      // The effective per-attack budget respects the ACTUAL multiattack count
      // — a tier where multiattack is optional gets the single-attack budget,
      // but if the block voluntarily includes "makes two attacks", each
      // attack owns half the turn total (live finding: 2× DPR at CR 2).
      const actualAttacks = multiattackCount(monster);
      const budget = actualAttacks > 1 && totalDamage != null
        ? Math.max(1, Math.round(totalDamage / actualAttacks))
        : perAttack;
      // The swarm reduced-damage expression is an ALTERNATIVE, not additive
      // — summing it double-counted every correct half-clause attack into a
      // phantom multi-expression reject (live: a lint message echoed into
      // entry text by a fix call chasing an unfixable "41 vs 27"). Strip
      // the reduction clause before extracting damage expressions.
      const bandText = entry.text
        .replace(/,?\s*or \d+\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\)[^.]*?(?:half of its Hit Points or fewer|if the swarm is Bloodied)/i, '')
        .replace(/\s*If the [\w' -]+? has half of its Hit Points or fewer, the damage (?:is|decreases to)[^.]*\./i, '');
      const sums = [...bandText.matchAll(DAMAGE_EXPR_RE)].map((m) => Number(m[1]));
      if (sums.length) {
        const total = sums.reduce((a, b) => a + b, 0);
        const ratio = total / budget;
        if (ratio < HP_BAND[0] || ratio > HP_BAND[1]) {
          if (sums.length === 1) {
            push('attack-damage-band', 'correctable', `${where}: attack damage ${total} outside [${HP_BAND[0]}, ${HP_BAND[1]}] of the ${budget} per-attack budget`, budget, loc);
          } else {
            push('attack-damage-band', 'reject', `${where}: total attack damage ${total} (across ${sums.length} expressions) outside [${HP_BAND[0]}, ${HP_BAND[1]}] of the ${budget} per-attack budget — restructure to total ${budget}`, undefined, loc);
          }
        }
      }
    }
    // "Success: Half damage" on a save whose Failure deals NO damage (live
    // finding: a restrain-only save whose success clause halved nothing) —
    // the orphan reference contradicts itself. 0/329. Deterministic: strip
    // the phantom half-damage from the Success clause.
    {
      const fail = /\*?\bFailure:?\*?([^]*?)(?=\*?\bSuccess|$)/.exec(entry.text)?.[1] ?? '';
      const succ = /\*?\bSuccess:?\*?([^]*)$/.exec(entry.text)?.[1] ?? '';
      if (/\*?\bFailure/.test(entry.text) && /half damage/i.test(succ) && !/\d+\s*\(\d+d\d+/.test(fail)) {
        push('success-damage-orphan', 'correctable',
          `${where}: the Success clause halves damage the Failure clause never deals — the phantom reference is stripped`,
          undefined, loc);
      }
    }
    // Reaction damage is PUNISH-scale — half an attack, not a free extra
    // attack every round (live finding: a re-rolled reaction at 33 damage =
    // full attack scale; official SRD reactions deal NO damage at all, and
    // every generated punish reaction until then sat at 7-14 ≈ perAttack/2,
    // the scale our own prompt example teaches). Cap = perAttack/2, band
    // ×1.3 like the attack band; the fix re-solves the dice.
    if (perAttack != null && section === 'Reactions' && !/Attack Roll/i.test(entry.text)) {
      const sums = [...entry.text.matchAll(DAMAGE_EXPR_RE)].map((m) => Number(m[1]));
      const total = sums.reduce((a, b) => a + b, 0);
      const cap = Math.max(4, Math.round(perAttack / 2));
      if (sums.length && total > Math.round(cap * 1.3)) {
        push('reaction-damage-band', 'correctable',
          `${where}: reaction damage ${total} is attack-scale — a reaction is a half-attack punish (cap ~${cap}); the dice are re-solved`,
          cap, loc);
      }
    }
    if (monster.stats && monster.pb != null) {
      for (const re of SPELL_DC_RES) {
        const sc = re.exec(entry.text);
        if (!sc) continue;
        const derived = 8 + monster.pb + modOf(monster.stats[ABILITY_ABBR[sc[1]]]);
        if (Math.abs(Number(sc[2]) - derived) > 1) {
          push('spell-dc-ability', 'reject', `${where}: spell save DC ${sc[2]} doesn't derive from ${sc[1]} (8 + PB + mod = ${derived}) — raise the spellcasting ability's score to support the DC`, undefined, loc);
        }
      }
    }
    // Attack flat damage bonuses derive from an ability mod — officials key
    // them to STR/DEX/INT/WIS/CHA (never bare CON; 2 documented corpus
    // quirks: Frost Giant's War Cry, Giant Frog's Bite). Catches riders like
    // "1d6 + 4" on a +7 DEX striker. Style-tier: fix calls correct it,
    // stubborn cases ship.
    if (monster.stats && ATTACK_LINE_RE.test(entry.text)) {
      const nonConMods = ['STR', 'DEX', 'INT', 'WIS', 'CHA'].map((k) => modOf(monster.stats[k]));
      for (const dm of entry.text.matchAll(/\d+\s*\(\d+d\d+\s*\+\s*(\d+)\)/g)) {
        if (!nonConMods.includes(Number(dm[1]))) {
          push('attack-mod-coherence', 'reject', `${where}: flat damage bonus +${dm[1]} matches none of the creature's STR/DEX/INT/WIS/CHA modifiers — attack damage bonuses derive from the attack ability`, undefined, loc);
          break;
        }
      }
    }
    // Every damage expression must be internally consistent: N (XdY ± Z)
    // with N = floor-average. Calibrated against all 728 expressions in the
    // SRD corpus: zero mismatches, so full strictness is safe.
    for (const dm of entry.text.matchAll(/(\d+)\s*\((\d+d\d+(?:\s*[+-]\s*\d+)?)\)/g)) {
      const avg = avgDice(dm[2]);
      if (avg !== null && avg !== Number(dm[1])) {
        push('damage-dice', 'correctable', `${where}: "${dm[0]}" — ${dm[2]} averages ${avg}`, avg, loc);
      }
    }
  }

  // --- Budget rules (need archetype-adjusted chassis) ---------------------
  // One Recharge entry per block: 0 of 329 printed blocks carry two.
  // Pick-time caps enforce this; the lint is the tripwire for bypass paths
  // (live: the web signature seated beside a breath — two Recharge 5-6
  // actions idling on the same dice).
  {
    const gated = entriesOf(monster).filter(({ entry }) => /\(Recharge [^)]+\)/i.test(entry.name));
    if (gated.length >= 2) {
      push('dual-recharge', 'reject', `Two Recharge-gated entries (${gated.map((g) => g.entry.name).join(', ')}) — print never fields two; one should be 1/Day, ungated, or replaced`, undefined,
        { section: 'Actions', entry: gated[1].entry.name });
    }
  }

  if (chassis) {
    if (monster.hp != null) {
      const ratio = monster.hp / chassis.hp;
      if (ratio < HP_BAND[0] || ratio > HP_BAND[1]) {
        push('hp-band', 'correctable', `HP ${monster.hp} outside [${HP_BAND[0]}, ${HP_BAND[1]}] of budget ${chassis.hp}`, chassis.hp);
      }
    }
    if (monster.ac != null && Math.abs(monster.ac - chassis.ac) > 1) {
      push('ac-band', 'correctable', `AC ${monster.ac} outside ±1 of budget ${chassis.ac}`, chassis.ac);
    }
    // Two entries sharing >= 2 identical long sentences are the same
    // mechanic written twice (live: Toll of Silence vs Frantic Ringing —
    // identical Failure AND Success sentences; only the area and a 1/Day
    // gate differ). Officials share at most ONE boilerplate sentence
    // (paired dragon breaths) — 0/329 at the two-sentence threshold.
    {
      const seen = new Map();
      const pairCounts = new Map();
      for (const { entry } of entriesOf(monster)) {
        for (const sent of entry.text.split(/(?<=\.)\s+/)) {
          const t = sent.trim();
          if (t.length < 60) continue;
          if (seen.has(t) && seen.get(t) !== entry.name) {
            const key = `${seen.get(t)}\u0000${entry.name}`;
            pairCounts.set(key, (pairCounts.get(key) ?? 0) + 1);
          } else if (!seen.has(t)) {
            seen.set(t, entry.name);
          }
        }
      }
      for (const [key, count] of pairCounts) {
        if (count >= 2) {
          const [a, bName] = key.split('\u0000');
          push('duplicate-mechanic', 'reject', `"${a}" and "${bName}" share ${count} identical sentences — the same mechanic written twice; merge them or make the second genuinely different`, undefined, { section: 'Actions', entry: bName });
        }
      }
    }
    // Energy damage-type spread: 96% of officials use <= 2 distinct energy
    // types; 4+ is 1/329. Generated hodgepodges stack unrelated elements.
    {
      const TYPES = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder'];
      const allText = entriesOf(monster)
        .filter(({ entry }) => !/^Spellcasting/i.test(entry.name))
        .map(({ entry }) => entry.text).join(' ');
      const used = TYPES.filter((t) => new RegExp(`\\b${t} damage`).test(allText));
      if (used.length >= 4) {
        push('energy-type-spread', 'reject', `Block uses ${used.length} distinct energy damage types (${used.join(', ')}) — officials almost never exceed two; consolidate to the types the creature's substance earns`, undefined, { section: 'Actions', entry: (monster.sections?.Actions?.[0]?.name ?? '') });
      }
    }
    // Primordial's parenthetical lists ONLY elemental dialects (Aquan,
    // Auran, Ignan, Terran — 8/8 official forms). Anything else moves out
    // as its own language (live: "Primordial (Giant, Aquan)").
    if (typeof monster.languages === 'string') {
      const pm = /Primordial\s*\(([^)]+)\)/i.exec(monster.languages);
      if (pm) {
        const DIALECTS = new Set(['aquan', 'auran', 'ignan', 'terran']);
        const toks = pm[1].split(',').map((t) => t.trim()).filter(Boolean);
        const bad = toks.filter((t) => !DIALECTS.has(t.toLowerCase()));
        if (bad.length) {
          const good = toks.filter((t) => DIALECTS.has(t.toLowerCase()));
          const fixedPrim = good.length ? `Primordial (${good.join(', ')})` : 'Primordial';
          const expected = `${bad.join(', ')}, ${monster.languages.replace(pm[0], fixedPrim)}`
            .replace(/^,\s*/, '');
          push('primordial-dialects', 'correctable', `Languages: "${pm[0]}" parenthesizes non-dialects (${bad.join(', ')}) — only Aquan/Auran/Ignan/Terran are Primordial dialects`, expected, { field: 'languages' });
        }
      }
    }
    // Movement modes never sit in parentheses — "30 ft., Burrow 20 ft.",
    // not "30 ft. (Burrow 20 ft.)". Officials' only speed parenthetical is
    // "(hover)" (0/329 + 0/327 otherwise; live: Rustking Mycelium).
    if (typeof monster.speed === 'string' && /\((?:Burrow|Climb|Swim|Fly)\s/i.test(monster.speed)) {
      push('speed-paren', 'correctable', `Speed line parenthesizes a movement mode ("${monster.speed}") — modes are comma-separated`,
        monster.speed.replace(/\s*\((Burrow|Climb|Swim|Fly)(\s+\d+\s*ft\.?[^)]*)\)/gi, ', $1$2'), { field: 'speed' });
    }
    // Matches both editions: "Melee Attack Roll: +9" and "Melee Weapon Attack: +7 to hit".
    const maxAttack = maxExtracted(monster, /Attack(?: Roll)?:\*?\s*\+(\d+)/g);
    if (maxAttack != null && Math.abs(maxAttack - chassis.attack_bonus) > 1) {
      push('attack-band', 'correctable', `Attack bonus +${maxAttack} outside ±1 of budget +${chassis.attack_bonus}`, chassis.attack_bonus);
    }
    // SAVE DCs only — check DCs (Investigation, escape DCs) are excluded, or
    // a high skill-check DC masks under-budget save DCs (live finding: an
    // Investigation DC 20 hid save DCs sitting 2 under a 21 budget).
    // PER-INSTANCE, not max-only: a rider save can sit 2 under budget while
    // the primary save masks it (live: Tarwretch's Sticky Ichor/Tar Tendril
    // at DC 15 under a DC 17 chassis — the max check passed clean). Escape
    // DCs are exempt by construction: "(escape DC 15)" matches neither
    // save-context regex, and they sit at save_dc−2 by design.
    const dcOut = new Set();
    for (const re of [/Saving Throw\*?:?\s*DC\s+(\d+)/gi, /DC\s+(\d+)\s+\w+ saving throw/gi]) {
      for (const { entry } of entriesOf(monster)) {
        for (const m of entry.text.matchAll(re)) {
          if (Math.abs(Number(m[1]) - chassis.save_dc) > 1) dcOut.add(Number(m[1]));
        }
      }
    }
    if (dcOut.size) {
      push('dc-band', 'correctable', `Save DC${dcOut.size > 1 ? 's' : ''} ${[...dcOut].join(', ')} outside ±1 of budget ${chassis.save_dc}`, chassis.save_dc);
    }
    // A legendary creature's budget assumes its legendary actions carry
    // roughly the share the routine discount removes. If EVERY option is
    // utility (move, hide, teleport), the creature quietly delivers ~60%
    // of its tier. Officials never do this: 30/30 legendary blocks have at
    // least one option that deals damage or delegates to an attack.
    {
      // Re-roll pseudo-blocks carry name-only stubs for the entries that
      // aren't being re-rolled; they carry no text to judge.
      const legendary = (monster.sections?.['Legendary Actions'] ?? []).filter((e) => !e._stub);
      if (legendary.length) {
        const pays = legendary.some((e) => /\d+\s*\(\d+d\d+/.test(e.text) || /\b(?:makes|uses)\b/.test(e.text));
        if (!pays) {
          push('legendary-no-damage', 'reject', 'Every legendary option is utility — a legendary creature\'s damage budget assumes its legendary actions carry part of the load; give at least one option an attack or damaging effect', undefined,
            { section: 'Legendary Actions', entry: legendary[0].name });
        }
      }
    }
    // A save DC must be supported by an ability score: officials never
    // exceed 8 + PB + their best modifier (0/136 blocks with both data
    // points; 54 sit exactly on it). The chassis sets DC by CR and
    // archetype, so a role that bumps the DC can outrun the stats the
    // model chose (live: a CR 16 controller stamped DC 21 with a best
    // modifier of +7 and PB +5, a ceiling of 20). Deterministic clamp.
    if (monster.stats && monster.pb != null) {
      const best = Math.max(...Object.values(monster.stats).map((v) => Math.floor((Number(v) - 10) / 2)));
      const ceiling = 8 + monster.pb + best;
      const over = new Set();
      for (const { entry } of entriesOf(monster)) {
        for (const m of entry.text.matchAll(/Saving Throw\*?:?\s*DC\s+(\d+)/gi)) {
          if (Number(m[1]) > ceiling) over.add(Number(m[1]));
        }
      }
      if (over.size) {
        push('save-dc-unsupported', 'correctable', `Save DC ${[...over].join(', ')} above what any ability score supports (8 + PB ${monster.pb} + best modifier ${best >= 0 ? '+' : ''}${best} = ${ceiling})`, ceiling);
      }
    }
    // Escape DCs are exempt from dc-band BY DESIGN, which made them the
    // one number a fix-call rewrite could corrupt unchecked (live: a 2014
    // block shipped an off-policy escape DC).
    // Engine policy: escape DC = 8 + PB + strike mod, i.e. attack_bonus + 8.
    // Measured on the 39 printed escape DCs: 46% match this exactly and the
    // rest sit 1-3 BELOW it; the old save_dc − 2 policy matched only 17%
    // (live: an escape DC 19 that reconciled with nothing on the block).
    {
      const escapeDC = Math.max(8, (chassis.attack_bonus ?? chassis.save_dc - 6) + 8);
      const bad = new Set();
      for (const { entry } of entriesOf(monster)) {
        for (const m of entry.text.matchAll(/escape DC (\d+)/gi)) {
          if (Number(m[1]) !== escapeDC) bad.add(Number(m[1]));
        }
      }
      if (bad.size) {
        push('escape-dc-band', 'correctable', `Escape DC${bad.size > 1 ? 's' : ''} ${[...bad].join(', ')} off the 8 + PB + strike-mod policy (${escapeDC})`, escapeDC);
      }
    }
    // Swarm archetype demands the swarm type line (live finding: a 2014
    // swarm came out "Medium aberration" — the clause was missing from the
    // 2014 prompt). Deterministic: wrap the written type. Pluralization is
    // irregular (live findings: "Monstrositys", "Undeads" — the old naive
    // "+s" was OUR bug): y → ies, Undead/Fey invariant.
    // Gate on the archetype OR a swarm-shaped type line — a concept-path
    // swarm ("swarm of animated sewing needles") can resolve to a non-swarm
    // archetype and previously skipped ALL swarm machinery (live: a "Tiny
    // Swarm (Beast)" shipped malformed with no half-damage clause).
    const isSwarmBlock = chassis.archetype === 'swarm' || /\bswarm\b/i.test(monster.type ?? '');
    if (isSwarmBlock && monster.type) {
      // One unified path: canonical "Swarm of Tiny <Plural>" survives; every
      // other shape (bare type, "Swarm (Beast)", bad plural) resolves a
      // component and rebuilds the canonical form.
      const canonical = /^Swarm of Tiny ([A-Za-z]+)$/i.exec(monster.type.trim());
      if (!canonical || canonical[1] !== pluralizeCreatureType(canonical[1])) {
        const comp = canonical?.[1]
          ?? /\(([A-Za-z]+)\)/.exec(monster.type)?.[1]
          ?? /swarm of (?:tiny )?([A-Za-z]+)/i.exec(monster.type)?.[1]
          ?? (!/swarm/i.test(monster.type) ? monster.type : null);
        push('swarm-type', 'correctable', `Swarm type must read "Swarm of Tiny <CreaturePlural>", not "${monster.type}"`, `Swarm of Tiny ${comp ? pluralizeCreatureType(comp) : 'Beasts'}`, { field: 'type' });
      }
      // Swarm SIZE is Medium or Large — the components are Tiny, never the
      // swarm itself (live: a Tiny swarm of Tiny needles).
      if (/^(?:Tiny|Small|Gargantuan|Huge)$/i.test(monster.size ?? '')) {
        push('swarm-size', 'correctable', `A swarm's size is Medium or Large (the COMPONENTS are Tiny), not ${monster.size}`, 'Medium', { field: 'size' });
      }
      // The subtype must never carry a second swarm phrase (live finding:
      // "Swarm of Tiny Monstrositys (Swarm of Tiny Beasts)").
      if (monster.subtype && /swarm of/i.test(monster.subtype)) {
        push('swarm-type', 'correctable', `The subtype duplicates the swarm phrase ("${monster.subtype}") — dropped`, '', { field: 'subtype' });
      }
    }
    // Substance check for the swarm's half-damage obligation. A REAL
    // reduction = the half/Bloodied clause plus a second damage expression
    // in the same entry (swarm-half-value polices the arithmetic). Two live
    // evasions: the clause absent entirely, and the clause NEGATED ("If the
    // crawler has half of its Hit Points or fewer, the damage is not
    // reduced" — malicious compliance with the phrase check). Both are
    // deterministically injectable when the main attack's dice count ≥ 2
    // (halve the dice, keep the flat — the official law); n = 1 keeps the
    // old reject for the fix call.
    if (isSwarmBlock) {
      const swarmEntries = entriesOf(monster);
      const hasReal = swarmEntries.some(({ entry }) =>
        /half of its Hit Points or fewer|if the swarm is Bloodied/i.test(entry.text)
        && !/not reduced/i.test(entry.text)
        && [...entry.text.matchAll(/\d+\s*\(\d+d\d+/g)].length >= 2);
      if (!hasReal) {
        const atk = swarmEntries.find(({ entry }) => ATTACK_LINE_RE.test(entry.text)
          && /half of its Hit Points or fewer[^.]*not reduced/i.test(entry.text))
          ?? swarmEntries.find(({ entry }) => ATTACK_LINE_RE.test(entry.text));
        const prim = atk ? /(\d+)\s*\((\d+)d(\d+)(?:\s*([+-])\s*(\d+))?\)\s+(\w+) damage/.exec(atk.entry.text) : null;
        if (prim && Number(prim[2]) >= 2) {
          const n = Number(prim[2]);
          const die = Number(prim[3]);
          const flat = prim[5] ? (prim[4] === '-' ? -1 : 1) * Number(prim[5]) : 0;
          const half = Math.floor(n / 2);
          const avg = Math.floor((half * (die + 1)) / 2) + flat;
          const dice = `${half}d${die}${flat ? ` ${flat > 0 ? '+' : '-'} ${Math.abs(flat)}` : ''}`;
          push('swarm-half-damage', 'correctable',
            `${atk.section}/${atk.entry.name}: the swarm's reduced-damage clause is missing or negated — injecting the official form at ${avg} (${dice})`,
            `${avg} (${dice}) ${prim[6]} damage`, { section: atk.section, entry: atk.entry.name });
        } else {
          push('swarm-half-damage', 'reject', `The swarm's main attack must carry the official reduced-damage clause: "..., or <about half> damage if the swarm has half of its Hit Points or fewer" — add it to the attack's Hit line`, undefined, atk ? { section: atk.section, entry: atk.entry.name } : undefined);
        }
      }
    }
    // The swarm's reduced-damage VALUE must follow the official law: halve
    // the dice count, keep the flat (Crawling Claws 4d8+2 → 2d8+2; Insects
    // 2d4+1 → 1d4+1). Live finding: a 4d8 (18) attack "reduced" to 2d8+4
    // (13) — an invented flat inflating the Bloodied tier by 44%. Only
    // n ≥ 2 primaries are checked (n = 1 reductions are irregular in the
    // corpus: Ravens drops the flat, Venomous Snakes shrinks the die).
    for (const { section, entry } of entriesOf(monster)) {
      if (!/half of its Hit Points or fewer|if the swarm is Bloodied/i.test(entry.text)) continue;
      // Typed riders ("plus 4 (1d8) Fire damage") shifted the expression
      // pairing and silently exempted the entry (live: Sorrowsand shipped
      // "7d8+6 → 18 (4d8)" — dice rounded UP and the flat dropped). Strip
      // riders before pairing.
      const riderless = entry.text.replace(/\s*plus \d+\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\)\s*\w+ damage/gi, '');
      const exprs = [...riderless.matchAll(/(\d+)\s*\((\d+)d(\d+)(?:\s*([+-])\s*(\d+))?\)/g)];
      if (exprs.length !== 2) continue;
      const [, , nStr, dieStr, sign, flatStr] = exprs[0];
      const n = Number(nStr);
      if (n < 2) continue;
      const die = Number(dieStr);
      const flat = flatStr ? (sign === '-' ? -1 : 1) * Number(flatStr) : 0;
      const half = Math.floor(n / 2);
      const expectedAvg = Math.floor((half * (die + 1)) / 2) + flat;
      // Structural law, not just average: halved COUNT and kept FLAT (live:
      // "7d8+6, or 18 (4d8)" sat inside the ±1 average tolerance with the
      // wrong dice shape and a dropped flat). 0/329 + 0/327 structural.
      const [, , n2Str, die2Str, sign2, flat2Str] = exprs[1];
      const flat2 = flat2Str ? (sign2 === '-' ? -1 : 1) * Number(flat2Str) : 0;
      if (Math.abs(Number(exprs[1][1]) - expectedAvg) > 1
        || Number(n2Str) !== half || Number(die2Str) !== die || flat2 !== flat) {
        const dice = `${half}d${die}${flat ? ` ${flat > 0 ? '+' : '-'} ${Math.abs(flat)}` : ''}`;
        push('swarm-half-value', 'correctable',
          `${section}/${entry.name}: the reduced swarm damage ${exprs[1][0]} doesn't follow from ${exprs[0][0]} — official law halves the dice and keeps the flat (expected ${expectedAvg} (${dice}))`,
          `${expectedAvg} (${dice})`, { section, entry: entry.name });
      }
    }
    // Escape DCs (grapple riders) are excluded from dc-band by design (the
    // Investigation-masking fix) and official values aren't formulaic — the
    // corpus deviates from 8+PB+STR in 21/39 cases, ALWAYS low. So the
    // sanity band is asymmetric: an escape DC may sit well under the save
    // DC (official style) but never meaningfully above it. Correction
    // lands on save_dc − 2, the typical official offset.
    for (const { section, entry } of entriesOf(monster)) {
      for (const em of entry.text.matchAll(/escape DC (\d+)/gi)) {
        const v = Number(em[1]);
        if (v > chassis.save_dc + 1 || v < chassis.save_dc - 6) {
          push('escape-dc', 'correctable', `${section}/${entry.name}: escape DC ${v} out of the sane band for the chassis save DC ${chassis.save_dc}`, Math.max(8, chassis.save_dc - 2), { section, entry: entry.name });
        }
      }
    }
    // The 2024 MM all but eliminated the unqualified B/P/S resistance
    // package — in SRD 5.2.1 it survives on swarms, incorporeal undead, a
    // handful of elementals, and one-off mythics (Tarrasque). Generated
    // blocks must EARN it: swarm identity or incorporeal movement. Elemental
    // type is deliberately NOT whitelisted (follow the 2025 direction, not
    // the legacy carriers). Chassis-gated so the corpus sweep — which lints
    // officials without a chassis — never sees this rule; 2024-only because
    // 2014 designs legitimately use the nonmagical-qualified package.
    if (is2024 && hasAll(monster.resistances, ['bludgeoning', 'piercing', 'slashing'])) {
      const isSwarm = chassis.archetype === 'swarm' || /\bswarm of\b/i.test(monster.type ?? '');
      const incorporeal = entriesOf(monster).some(({ entry }) =>
        /incorporeal|move through (?:other )?creatures and objects/i.test(`${entry.name} ${entry.text}`));
      if (!isSwarm && !incorporeal) {
        const kept = splitTokens(monster.resistances)
          .filter((tok) => !/(bludgeoning|piercing|slashing)/i.test(tok));
        push('bps-resistance', 'correctable',
          'Unqualified Bludgeoning/Piercing/Slashing resistance without a swarm or incorporeal identity — 2024 reserves the full physical package for those; the physical types are stripped',
          kept.join(', '), { field: 'resistances' });
      }
    }
    // Defense tokens must be damage types or canonical conditions (the
    // resistance-conditions rule relocates conditions). Anything else is
    // junk ("Blindness, Deafness"; "prismatic" — live 2014 finding, an
    // invented damage type in Immunities). Edition-agnostic and covering
    // all three lines (was resistances-only + is2024-gated, which let
    // "prismatic" ship). 0/329 + 0/327 real lines.
    for (const field of ['resistances', 'immunities', 'vulnerabilities']) {
      if (!monster[field]) continue;
      const toks = splitTokens(monster[field]);
      const junk = toks.filter((t) => !DAMAGE_TYPE_WORD_RE.test(t) && !CONDITION_TOKEN_SET.has(t.toLowerCase()));
      if (junk.length) {
        const kept = toks.filter((t) => !junk.includes(t));
        push('resistance-unknown', 'correctable',
          `${field} carry tokens that are neither damage types nor conditions (${junk.join(', ')}) — dropped`,
          kept.join(', '), { field });
      }
    }
    // Identity immunity (owner call, 3 live instances: a fire-dealing magma
    // elemental, a Glacial Golem, and a Frostpounder all shipped RESISTING
    // their own element): a creature whose NAME carries an elemental
    // material AND that deals the matching damage type is elementally
    // BODIED — officials give those immunity, never resistance (Fire
    // Elemental, Winter Wolf, every dragon's breath type). The deals-check
    // exempts the Giant Fire Beetle (named for its glow, deals no fire).
    // Fix: move the type from resistances to immunities.
    if (monster.resistances) {
      // Material-NAME branch runs on both editions (0/327 swept — Winter
      // Wolf law holds in 2014); the Elemental-TYPE branch below stays
      // 2024-only (the 2014 Djinni legitimately resists its own lightning).
      const MATERIAL_TYPES = [
        [/(ice|frost|glacial|glacier|snow|rime|winter|chill)/i, 'Cold'],
        [/(fire|flame|magma|lava|cinder|ember|pyre|molten)/i, 'Fire'],
        [/(storm|lightning)/i, 'Lightning'],
        [/(thunder)/i, 'Thunder'],
      ];
      const dealtTypes = new Set();
      for (const { entry } of entriesOf(monster)) {
        for (const g of entry.text.matchAll(/\)\s+(\w+) damage/g)) dealtTypes.add(g[1].toLowerCase());
      }
      // Two triggers: an elemental-material NAME (any type), or the
      // Elemental TYPE itself (live gap: "Shiveroth" — cold identity, no
      // listed stem). Elemental-type checks NONPHYSICAL types only (the
      // official Water Elemental legitimately resists the Bludgeoning it
      // deals).
      const NONPHYSICAL = new Set(['cold', 'fire', 'lightning', 'thunder', 'acid', 'poison', 'necrotic', 'radiant', 'psychic', 'force']);
      const candidates = new Set();
      for (const [re, type] of MATERIAL_TYPES) {
        if (re.test(monster.name ?? '') && dealtTypes.has(type.toLowerCase())) candidates.add(type);
      }
      if (is2024 && /^elemental$/i.test(monster.type ?? '')) {
        for (const t of dealtTypes) {
          if (NONPHYSICAL.has(t)) candidates.add(t[0].toUpperCase() + t.slice(1));
        }
      }
      for (const type of candidates) {
        const resToks = splitTokens(monster.resistances);
        if (!resToks.some((t) => t.toLowerCase() === type.toLowerCase())) continue;
        if ((monster.immunities ?? '').toLowerCase().includes(type.toLowerCase())) continue;
        push('identity-immunity', 'correctable',
          `The creature is ${type.toLowerCase()}-bodied (identity + dealt damage) but only RESISTS ${type} — officials give elemental bodies immunity to their own element; ${type} moves to Immunities`,
          type, { field: 'resistances' });
      }
    }
    // Grapple/Restrain machinery must carry counterplay — the SRD 5.2.1
    // convention is 52/52 (see docs/investigations/07-grapple-machinery.md).
    // A Grappled condition needs an escape DC (2024's escape action is defined
    // against it, so a bare Grappled is unadjudicable); a Restrained effect
    // needs a repeat save, fixed duration, or breakable binding. A "maintain
    // the condition" clause VOIDS a duration exit — the hold is sustainable
    // forever — so those need a strong exit even when a duration is present.
    // 2024-only (the "has the X condition" anchor is 2024 phrasing) and
    // chassis-gated (the corpus sweep passes no chassis; belt-and-suspenders).
    if (is2024) {
      const STRONG_EXIT = [
        /escape DC \d+/i,
        /AC \d+[^.]*(?:HP|Hit Points) \d+/i,           // breakable binding (statted)
        /until [\w' -]+ is destroyed|to release the (?:target|creature)/i, // breakable/release (Erinyes)
        /repeats? the sav|ending the effect on a success/i,
        // Interior escapes: the official phrasing, plus the generated
        // variants a live block used ("until the wardwall dies", "uses an
        // action to make a DC 15 Strength check").
        /escape by taking an action|(?:if|until) the [\w' -]+ dies/i,
        /uses? an action to make a DC \d+/i,
      ];
      const DURATION_EXIT = /until the (?:end|start) of|for \d+ (?:minute|hour)/i;
      for (const { section, entry } of entriesOf(monster)) {
        // Anchor covers the canonical "has the X condition" AND the
        // nonstandard "the target is Restrained" application phrasing a live
        // block shipped with — a phrasing wart must not blind the machinery
        // check. PRECONDITIONS must not match: parentheticals are stripped
        // (Bugbear "(with Advantage if the target is Grappled)"), "if/that"-
        // led conditionals are excluded (Mimic, Ettercap), and the vampires'
        // "has the Grappled, Incapacitated, or Restrained condition"
        // targeting never matches the contiguous canonical form.
        const stripped = entry.text.replace(/\([^)]*\)/g, '');
        const applies = /has the (Grappled|Restrained) condition/.exec(stripped)
          ?? /(?<!if )(?<!If )(?<!that )(?<!That )\b(?:[Tt]he target|[Tt]he creature|[Ii]t) (?:is|becomes) (?:[A-Z]\w+ and )?(Grappled|Restrained)\b/.exec(stripped);
        if (!applies) continue;
        const strong = STRONG_EXIT.some((re) => re.test(entry.text));
        const maintained = /maintain the (?:Grappled|Restrained)/i.test(entry.text);
        const hasExit = strong || (!maintained && DURATION_EXIT.test(entry.text));
        if (!hasExit) {
          const cond = applies[1];
          const guidance = cond === 'Grappled'
            ? 'add an "(escape DC N)" rider'
            : 'add a repeat save, fixed duration, or breakable binding';
          push('grapple-exit', 'correctable',
            `${section}/${entry.name}: the ${cond} condition has no counterplay — ${guidance} (5e always gives Grappled/Restrained an exit)`,
            cond, { section, entry: entry.name });
        }
      }
      // The same counterplay principle, generalized to REMOVAL FROM PLAY
      // (banish, swallow, forced plane shift — live: Shissk's Void Latch
      // removed the target on a plain hit for up to a minute). Gating
      // (1/Day, Bloodied) limits frequency, not target agency: officials
      // always pair removal with a save gate or an escape/interior-escape
      // clause (Banishment = save + Concentration; every swallow carries
      // interior-escape). Subject-scoped anchor, 0/329 — self-removal on
      // death (Diabolical/Exalted Restoration) has the monster as subject.
      const REMOVAL_RE = /\b(?:target|creature) (?:disappears|is banished|is transported|vanishes)|(?:swallows|banishes|shunts) the target/i;
      for (const { section, entry } of entriesOf(monster)) {
        const m = REMOVAL_RE.exec(entry.text);
        if (!m) continue;
        if (/Saving Throw/i.test(entry.text)) continue;
        if (STRONG_EXIT.some((re) => re.test(entry.text))
          || /Concentration|regurgitat|takes \d+ damage or more/i.test(entry.text)) continue;
        push('removal-counterplay', 'reject',
          `${section}/${entry.name}: removes the target from play ("${m[0]}") with no save and no escape — gate it behind a saving throw or add an escape clause the target can use while removed`,
          undefined, { section, entry: entry.name });
      }
    }
    // Ungated area effect that deals damage AND applies a HARD condition
    // (Stunned/Paralyzed/Petrified/Unconscious — Incapacitated is spent
    // freely by officials, so excluded). The conjunction is 0/329 in SRD
    // 5.2.1 (docs/investigations/04-hard-cc-detection.md): WotC either
    // recharge-gates such effects (Mind Flayer / dragon breath) or ladders a
    // no-damage version. Correctable: stamp (Recharge 5-6) onto the name,
    // turning it into the official gated shape. Chassis-gated + 2024-only.
    if (is2024) {
      for (const { section, entry } of entriesOf(monster)) {
        if (/\((?:Recharge|\d+\s*\/\s*Day)/i.test(entry.name) || /once per day/i.test(entry.text)) continue;
        const failPart = entry.text.split(/\*?\bFailure:?\*?/i)[1];
        if (!failPart) continue;
        const preSuccess = failPart.split(/\*?\bSuccess|\*?\bSecond Failure/i)[0];
        const hard = /(?:target|creature) has the (Stunned|Paralyzed|Petrified|Unconscious) condition/i.exec(preSuccess);
        const area = /each creature (?:in|within \d+ feet of (?!the space))/i.test(entry.text);
        const dmg = /\d+ \(\d+d\d+(?:\s*[+-]\s*\d+)?\)\s+\w+ damage/.test(preSuccess);
        if (hard && area && dmg) {
          push('cc-aoe', 'correctable',
            `${section}/${entry.name}: an area effect that deals damage may not also apply ${hard[1]} unless it is gated — officials recharge-gate this (0/329 ungated); adding (Recharge 5-6)`,
            `${entry.name} (Recharge 5-6)`, { section, entry: entry.name });
        }
      }
      // At-will NO-DAMAGE attacks that apply Restrained don't exist in
      // officials (0/329 — web appliers are save-based AND Recharge-gated,
      // e.g. Giant Spider's Web). Live: Moon Moth's Web Lasso, at-will and
      // legendary-reusable for 3+ restrains a round. Same fix shape as
      // cc-aoe: stamp the gate.
      for (const { section, entry } of entriesOf(monster)) {
        if (/\((?:Recharge|\d+\s*\/\s*Day)/i.test(entry.name)) continue;
        if (!/Attack Roll:/i.test(entry.text)) continue;
        if (/\d+d\d+/.test(entry.text)) continue;
        if (!/\bRestrained\b/.test(entry.text)) continue;
        push('restrain-gate', 'correctable',
          `${section}/${entry.name}: a no-damage attack applying Restrained is never at-will in officials (0/329) — adding (Recharge 5-6)`,
          `${entry.name} (Recharge 5-6)`, { section, entry: entry.name });
      }
    }
    // Legendary reuse must not replay an ungated area or oversized save-for-
    // damage effect: legendary uses refresh every round, so reusing a
    // party-wide AoE (Psychic Pulse) or a save nova above the per-use ceiling
    // (Buried Grasp, 1.49× per-attack) multiplies output past the aggregate
    // budget (docs/investigations/01-legendary-costing.md). Officials reuse
    // only single-target attacks, Spellcasting, or Recharge/N-Day actions.
    if (is2024 && perAttack != null) {
      const legendary = monster.sections?.['Legendary Actions'] ?? [];
      const actions = monster.sections?.Actions ?? [];
      const baseName = (n) => (n ?? '').replace(/\s*\(.*/, '').trim().toLowerCase();
      for (const entry of legendary) {
        // A legendary OPTION that is itself gated ("Envelop (1/Day)") fires
        // at nova cadence — priced like a recharge weave, exempt.
        if (/\((?:Recharge|\d+\s*\/\s*Day)/i.test(entry.name)) continue;
        const reuse = /\buses (?:its |the )?([A-Z][\w' -]+?)(?:\s+again|\s+to cast|[.,]|$)/.exec(entry.text);
        if (!reuse || /^spellcasting$/i.test(reuse[1].trim())) continue;
        const refName = reuse[1].replace(/\s+action$/i, '');
        const target = actions.find((a) => baseName(a.name) === baseName(refName));
        if (!target || /\((?:Recharge|\d+\s*\/\s*Day)/i.test(target.name)) continue;
        const isAreaSave = /each creature (?:in|within)/i.test(target.text) && /Saving Throw/i.test(target.text);
        const dmg = Math.max(0, ...[...target.text.matchAll(/(\d+)\s*\(\d+d\d+/g)].map((mm) => Number(mm[1])));
        const overNova = /Saving Throw/i.test(target.text) && dmg > perAttack * 1.5;
        if (isAreaSave || overNova) {
          push('legendary-reuse', 'correctable',
            `Legendary Actions/${entry.name}: reuses "${target.name}"${isAreaSave ? ' (an ungated area effect)' : ` (${dmg} damage, above the ~${Math.round(perAttack * 1.5)} per-use ceiling)`} — legendary uses refresh every round; reuse only a single-target attack or a Recharge/1-Day action`,
            undefined, { section: 'Legendary Actions', entry: entry.name });
        }
      }
      // Multiattack-substituted save novas: the prompt's single-target save
      // number is the WHOLE turn's budget (a standalone action); weaving it
      // into Multiattack ("replace one attack with Ward's Rebuke") converts it
      // into a partial-turn component and runs ~1.7× the intended routine.
      // Officials substitute damaging save entries at up to 1.86× their best
      // attack (Lamia) — so the cap is 2× per-attack, corpus-clean at 0/329.
      // Recharge/N-Day targets are exempt (nova cadence prices them); attack
      // targets are the attack-damage-band's business.
      const multi = actions.find((a) => /^Multiattack/i.test(a.name));
      if (multi) {
        const referenced = [];
        for (const g of multi.text.matchAll(/(?:replace[^.]*? with (?:a use of |one use of |an? )?|can use |and uses |or uses )([^.]+?)(?= in place of| if available|\.|$)/gi)) {
          for (const part of g[1].split(/ or |, /)) {
            // "a use of its Enveloping Feed action" — strip the possessive
            // prefix and the "action"/"attack" suffix (live finding: the
            // unstripped forms broke resolution, so a 99-damage feed stayed
            // woven into Multiattack unflagged).
            referenced.push(part.replace(/^\([A-C]\)\s*/, '').replace(/^(?:its|the)\s+/i, '').replace(/ to cast.*/, '').replace(/\s+(?:action|attack)$/i, '').trim());
          }
        }
        for (const name of referenced) {
          const target = actions.find((a) => baseName(a.name) === baseName(name));
          if (!target || /Attack Roll/i.test(target.text)) continue;
          if (/\((?:Recharge|\d+\s*\/\s*Day)/i.test(target.name)) continue;
          const dmg = Math.max(0, ...[...target.text.matchAll(/(\d+)\s*\(\d+d\d+/g)].map((mm) => Number(mm[1])));
          // Official substitution law (both swept): single-target damage
          // saves weave at up to ~1.86× per-attack (Lamia), and DAMAGE-LESS
          // area saves weave freely (Brass Sleep Breath) — but a DAMAGING
          // ungated area save never does (live: an at-budget 33-damage cone
          // replacing an attack every round).
          // State-gated substitutions (Kraken Fling/Swallow need a Grappled
          // creature as ammunition) are the official woven pattern — exempt.
          const stateGated = /creature Grappled by|creature (?:it|the [\w' -]+?) (?:has )?Grappled|swallowed/i.test(target.text);
          const areaSave = /each creature (?:in|within)/i.test(target.text) && /Saving Throw/i.test(target.text);
          // State-gating exempts only the AREA branch (a thrown body's
          // splash, the Kraken Fling pattern) — an OVERSIZED state-gated
          // weave (a 99-damage grapple-feed) still flags.
          if ((areaSave && dmg > 0 && !stateGated) || dmg > perAttack * 2) {
            push('multiattack-substitution', 'correctable',
              `Actions/Multiattack: weaves in "${target.name}" (${areaSave && dmg > 0 ? `a damaging area save — officials only weave damage-less area saves` : `${dmg} damage, above the ${perAttack * 2} cap = 2× per-attack`}) — it stays a standalone action; the reference is removed`,
              target.name, { section: 'Actions', entry: multi.name });
          }
        }
      }
    }
    // Bare-targeting save effect: "*<Ability> Saving Throw*: DC N, each
    // creature. *Failure:* ..." with NOTHING qualifying "each creature" — no
    // area, range, or trigger. Unadjudicable (a DM cannot know who is
    // affected); 0/329 in the SRD (docs/investigations/03-orphaned-mechanics.md
    // — officials always write "in a 10-foot Emanation", "within N feet", or a
    // relational qualifier). Deterministic fix: default to a 10-foot Emanation,
    // the standard aura shape — makes it adjudicable without a fix call.
    if (is2024) {
      for (const { section, entry } of entriesOf(monster)) {
        // Both quantifiers: bare "each creature" (an aura with no area) and
        // bare "one creature" (a single-target save with no range) are equally
        // unadjudicable and equally 0/329 in the SRD. Default an area target
        // to a 10-foot Emanation; default a single target to "within 60 feet".
        const bare = /Saving Throw\*?:?\s*DC \d+,\s*(one|each) creature\b([^.*]*?)(?:\.|\*Failure)/i.exec(entry.text);
        if (bare && bare[2].trim() === '') {
          const quant = bare[1].toLowerCase();
          push('bare-targeting', 'correctable',
            `${section}/${entry.name}: "${quant} creature" has no ${quant === 'one' ? 'range' : 'area'} or trigger — the effect is unadjudicable; defaulting to ${quant === 'one' ? '"within 60 feet"' : 'a 10-foot Emanation'}`,
            quant, { section, entry: entry.name });
        }
      }
      // Hybrid double-targeting: a forcing lead-in that already names the
      // target, followed by the skeleton with its OWN targeting clause
      // ("forces one creature it has Grappled to make a Strength Saving
      // Throw: DC 15, one creature within 60 feet" — live finding, Stalking
      // Wardwall). The two clauses contradict; 0/329 officials. Reject-tier:
      // there is no safe deterministic merge, the fix call rewrites it.
      // Two sub-shapes, both 0/329: same-sentence ("forces one creature it
      // has Grappled to make a Strength Saving Throw: DC 15, one creature
      // within 60 feet" — Wardwall) and adjacent-sentence ("targets one
      // creature it can see within 30 feet. Strength Saving Throw: DC 15,
      // one creature within 60 feet" — Feymire Muck; a skeleton right after
      // a targeting sentence must say "the target", never name a fresh one).
      const HYBRID_SAME = /(?:forces?|compels?|targets?|chooses?|(?:is|are) (?:also )?(?:affected by|subjected to)|must (?:make|succeed on))[^.]*?Saving Throw\*?:?\s*DC \d+,\s*(?:one|each) creature/i;
      // Adjacent form generalized past specific verbs (live: "fires a thorn
      // at a creature it can see within 300 feet. Constitution Saving
      // Throw: DC 21, one creature within 60 feet" — contradictory ranges):
      // any range-bearing single-target lead-in sentence followed by a
      // skeleton that names a FRESH generic target instead of "that
      // creature"/"the target".
      const HYBRID_ADJACENT = /(?:an?|one) creature[^.]*? within \d+ feet[^.]*\.\s*\*?\w+ Saving Throw\*?:?\s*DC \d+,\s*(?:one|each) creature/i;
      // Third form (live: a melee chain attack followed by "Strength Saving
      // Throw: DC 14, one creature within 60 feet" — the rider must say
      // "the target", never re-target fresh at a different range).
      const HYBRID_ATTACK = /Attack Roll:\*?[^*]*?\.\s*\*?\w+ Saving Throw\*?:?\s*DC \d+,\s*(?:one|each) creature\b/i;
      for (const { section, entry } of entriesOf(monster)) {
        if (HYBRID_SAME.test(entry.text) || HYBRID_ADJACENT.test(entry.text) || HYBRID_ATTACK.test(entry.text)) {
          push('hybrid-targeting', 'reject',
            `${section}/${entry.name}: the lead-in already names the target, then the save skeleton adds a second targeting clause — keep ONE: either "<Ability> Saving Throw: DC N, <the real target>." with no forcing lead-in, or fold the constraint into the skeleton's targeting clause`,
            undefined, { section, entry: entry.name });
        }
      }
      // A trait written as an ACTIVE Bonus Action ("As a Bonus Action, the X
      // collapses into dust and teleports...") belongs under Bonus Actions —
      // official traits only GRANT bonus-action uses ("can take the
      // Disengage action as a Bonus Action"), never open with the cost.
      // 0/329. Relocate-and-exempt, like trait-imposes-save.
      for (const entry of monster.sections?.Traits ?? []) {
        if (/^As a Bonus Action[, ]/i.test(entry.text.trim())) {
          push('trait-bonus-action', 'correctable',
            `Traits/${entry.name}: opens with "As a Bonus Action" — an active bonus action lives in the Bonus Actions section; it moves there`,
            undefined, { section: 'Traits', entry: entry.name });
        }
      }
    }

    // A Trait that IMPOSES a save on a target with no trigger/timing phrase
    // is an action filed in the wrong section — as written it never fires
    // (live findings: Spectral Tangle, Pacifying Aura). Officials: 0/329
    // (their trait-saves are all self-saves like Magic Resistance/Undead
    // Fortitude, or carry a trigger — auras say "at the start of each of
    // its turns"). Fix: relocate to Actions, marked `relocated` so the
    // counts rule still scores it against the Traits range.
    {
      const TRIGGER_RE = /\b(when|whenever|if (?:a|an|the|another|it) |at the (?:start|end)|starts its turn|enters|ends its turn|is hit|takes .* damage|while (?:in|within|it)|that touches|that has \d+ hit points)\b/i;
      for (const entry of monster.sections?.Traits ?? []) {
      // Both dialects: the 2024 skeleton AND 2014 prose ("must make a DC
      // 23 Dexterity saving throw" — live: a 1/Day nova shipped in
      // Traits because the check only knew the 2024 form).
        const skel = /Saving Throw\*?:?\s*DC \d+,\s*(?:one|each) creature/i.exec(entry.text)
        ?? /must (?:make|succeed on) a DC \d+ \w+ saving throw/i.exec(entry.text);
      // The trigger must appear BEFORE the Failure clause — scanning the
      // whole entry let the Failure clause's own "takes 44 damage"
      // satisfy the trigger check (live finding: Softening Tremor, a
      // (1/Day) 44-damage save nuke that shipped in Traits). Pre-Failure
      // (not pre-skeleton) because officials put aura triggers in the
      // TARGETING clause: the Aboleth's "each creature that touches the
      // aboleth ... while within 5 feet".
        // Cut at the 2024 Failure marker OR the 2014 outcome phrases ("On a
        // failed save", ", taking") — otherwise the outcome's own "takes 44
        // damage" satisfies the trigger scan (Softening Tremor, both dialects).
        const preFailure = entry.text.split(/\*?\bFailure:?\*?|On a fail(?:ed|ure) save|, taking /i)[0];
        if (skel && !TRIGGER_RE.test(preFailure)) {
        push('trait-imposes-save', 'correctable',
          `Traits/${entry.name}: a Trait never forces a saving throw without a trigger — as written this ability can never fire; it moves to Actions`,
          undefined, { section: 'Traits', entry: entry.name });
        }
      }
      }
  }

  // --- Structural rules (need slot plan) ----------------------------------
  if (plan) {
    const all = entriesOf(monster);

    for (const slot of plan.required_slots) {
      const passiveCheck = PASSIVE_SLOT_CHECKS[slot.description];
      if (slot.category === 'passive' && passiveCheck) {
        if (!passiveCheck(monster)) {
          push('slot-missing', 'reject', `Required passive slot not satisfied: ${slot.description}`);
        }
        continue;
      }
      const categories = Array.isArray(slot.category) ? slot.category : [slot.category];
      const sections = categories.map((c) => SECTION_FOR_CATEGORY[c]).filter(Boolean);
      const filled = all.some(
        ({ section, entry }) => entry.slot === slot.description && sections.includes(section)
      );
      if (!filled) {
        push('slot-missing', 'reject', `Required slot not filled (tag an entry in ${sections.join(' or ')} with slot id): ${slot.description}`);
      }
    }

    const actions = monster.sections?.Actions ?? [];
    const hasMultiattack = actions.some((e) => e.name.startsWith('Multiattack'));
    if (plan.multiattack.status === 'required' && !hasMultiattack) {
      push('multiattack', 'reject', 'Multiattack action is required at this tier');
    }
    if (plan.multiattack.status === 'forbidden' && hasMultiattack) {
      push('multiattack', 'reject', 'Multiattack is not allowed at this tier');
    }

    const legendary = monster.sections?.['Legendary Actions'] ?? [];
    if (plan.legendary.status === 'required' && legendary.length === 0) {
      push('legendary', 'reject', 'Legendary Actions are required at this tier');
    }
    if (plan.legendary.status === 'forbidden' && legendary.length > 0) {
      push('section-structure', 'reject', 'Legendary Actions are not allowed at this tier');
    }
    for (const [field, section] of [['bonus_action', 'Bonus Actions'], ['reaction', 'Reactions']]) {
      // Relocated entries are corrections, not designs — they never violate
      // a forbidden-section rule.
      if (plan[field] === 'forbidden' && (monster.sections?.[section] ?? []).filter((e) => !e.relocated).length > 0) {
        push('section-structure', 'reject', `${section} are not allowed at this tier`);
      }
    }

    // Entries the relocation fixes moved out of Traits (to Actions or Bonus
    // Actions) still count against their ORIGINAL section's plan range —
    // relocation is a correction, not a redesign, and must never trigger the
    // counts reject it would otherwise cause (the exempt half of
    // relocate-and-exempt).
    const relocatedAnywhere = Object.values(monster.sections ?? {}).flat().filter((e) => e.relocated).length;
    const relocatedInActions = actions.filter((e) => e.relocated).length;
    // The inverse relocation (action-passive-rider → Traits) carries its own
    // marker: those entries still score as ACTIONS, not traits.
    const relocatedToTraits = (monster.sections?.Traits ?? []).filter((e) => e.relocatedToTraits).length;
    const nTraits = (monster.sections?.Traits ?? []).length - relocatedToTraits + relocatedAnywhere;
    const nActions = actions.length - relocatedInActions + relocatedToTraits;
    if (nTraits < plan.traits.min || nTraits > plan.traits.max) {
      push('counts', 'reject', `${nTraits} traits outside plan range [${plan.traits.min}, ${plan.traits.max}]`);
    }
    if (nActions < plan.actions.min || nActions > plan.actions.max) {
      push('counts', 'reject', `${nActions} actions outside plan range [${plan.actions.min}, ${plan.actions.max}]`);
    }
  }

  // Slot/instruction language leaking into entry text as meta-commentary
  // (live finding: "This is a buff, heal, or enable action targeting
  // allies." — the support slot's own description, parroted verbatim).
  // Officials never write "This is a..." sentences (0/329 + 0/327). EDITION-
  // AGNOSTIC — previously sat inside the is2024 block, which let "This
  // attack is a heavy melee attack." ship on the 2014 path (live, Bloatbough).
  for (const { section, entry } of entriesOf(monster)) {
    // Shapes: meta-SENTENCE ("This is a buff, heal, or enable action..."),
    // meta-PARENTHETICAL ("(conditions can be applied by this action
    // description)"), LINT MESSAGE ECHO (a fix call pasted reject feedback
    // into the text), and slot-vocabulary CLASSIFIER ("This attack is a
    // heavy melee attack.").
    if (/\bThis is an? [^.]{0,90}?\b(?:buff|heals?|enables?|slot|budget|role)\b[^.]*\./i.test(entry.text)
      || /\bThis attack is an? [\w -]*attack\./i.test(entry.text)
      || /Credits?:|fills the (?:required )?slot|\bslot: /i.test(entry.text)
      || /\([^)]*(?:action description|this entry|these instructions)[^)]*\)/i.test(entry.text)
      || /\([^)]*or a similar (?:trait|ability|effect)[^)]*\)/i.test(entry.text)
      || /outside the allowed range|restructure to total \d+|per-attack budget|the total for both expressions/i.test(entry.text)) {
      push('instruction-leak', 'correctable',
        `${section}/${entry.name}: instruction language leaked as meta-commentary — the sentence/parenthetical is deleted`,
        undefined, { section, entry: entry.name });
    }
  }

  {
    // An ability that ends a condition on ITSELF which its own immunity
    // line already prevents (live: a grapple-immune swarm's escape action
    // "ends any grappled or restrained condition on itself") — dead
    // mechanics. 0/329 + 0/327. The dead clause strips.
    const immLine = `${monster.immunities ?? ''} ${monster.condition_immunities ?? ''}`.toLowerCase();
    for (const { section, entry } of entriesOf(monster)) {
      const m = /ends? (?:any|the) (\w+)(?: or (\w+))? conditions? on itself/i.exec(entry.text);
      if (m && [m[1], m[2]].filter(Boolean).every((c) => immLine.includes(c.toLowerCase()))) {
        push('self-escape-immune-condition', 'correctable',
          `${section}/${entry.name}: it ends the ${[m[1], m[2]].filter(Boolean).join('/')} condition on itself, but its immunity line already prevents ${[m[1], m[2]].filter(Boolean).length > 1 ? 'those conditions' : 'that condition'} — the dead clause is removed`,
          undefined, { section, entry: entry.name });
      }
    }
  }

  // A Beast with genius INT is a mistyped Monstrosity — the official Beast
  // ceiling is INT 8 (Giant Eagle/Owl); 0/329 + 0/327 above it. Substance
  // law: a smart unnatural predator IS a monstrosity (live: an INT-18
  // "beast"). Correctable retype.
  if (/^Beast$/i.test(monster.type ?? '') && (monster.stats?.INT ?? 0) > 8) {
    push('beast-intelligence', 'correctable',
      `type Beast with INT ${monster.stats.INT} — beasts cap at INT 8 (Giant Owl); a genius predator is a Monstrosity`,
      'Monstrosity', { field: 'type' });
  }

  {
    // A grapple-DEPENDENT effect ("one target grappled by the uuloth") in a
    // block where NOTHING imposes the grapple — the entry can never be used
    // (live 2014 finding: Constrict + Sand Sink both referenced a grapple no
    // attack ever created). 0/327 + 0/329: every official grapple reference
    // has an imposer. Design surgery isn't deterministic — fix call.
    const blockText = Object.values(monster.sections ?? {}).flat().map((e) => e.text ?? '').join('\n');
    const needsGrapple = /(?:target|creature) (?:it is |that is |currently )?grappled by\b|grappled by (?:the|it)\b/i.test(blockText);
    const imposesGrapple = /grappled (?:by [\w' ]+ )?\(escape|Grappled condition|\bgrapples\b|is (?:also )?grappled\b|has grappled|can grapple/i.test(blockText);
    if (needsGrapple && !imposesGrapple) {
      push('grapple-dependency-orphan', 'reject', 'an entry depends on a target being grappled, but nothing in the block imposes the Grappled condition — give an attack a grapple rider (with an escape DC) or drop the dependency');
    }
  }

  {
    // Epithet self-references (block-level: needs the cross-entry tally).
    // Officials self-refer by a name word, the head morpheme of a name word
    // (Androsphinx → "the sphinx", Warhorse → "the horse"), the creature
    // type, or "the swarm" — never an unrelated epithet (live finding: a
    // monster named Tarwurm calling itself "the tar coil" in every entry).
    // 0/329 srd52 + 0/327 srd-2014 under this contract.
    const texts = Object.values(monster.sections ?? {}).flat().map((e) => e.text ?? '');
    const epithet = findEpithetSelfReference(monster.name, monster.type, texts);
    if (epithet) {
      const head = (monster.name ?? '').trim().split(/\s+/).pop()?.toLowerCase();
      if (head && head !== epithet.phrase) {
        push('epithet-self-reference', 'correctable',
          `the block self-refers as "the ${epithet.phrase}" (${epithet.count}×) but is named ${monster.name} — officials self-refer by a name word or creature type; rewriting to "the ${head}"`,
          { from: epithet.phrase, to: head });
      }
    }
  }

  return { ok: findings.length === 0, findings };
}

// Subject-position self-reference extraction for the epithet rule. The verb
// anchor keeps object mentions ("through the portal") and target language
// ("the creature") out of the tally; the stoplist covers common non-self
// subjects that do take these verbs.
const SELF_REF_VERBS = "makes|can|cannot|has|have|is|isn't|regains|moves|uses|takes|deals|gains|releases|exhales|targets|chooses|dies|fails|succeeds|magically|doesn't|returns|attacks|knows|senses|teleports|casts|must|adds|emits|shifts|hits|remains|sheds|whips|extends|withdraws|spews|swallows|creates|slams";
const SELF_REF_RE = new RegExp(`\\b[Tt]he ([a-z][a-z'-]+(?: [a-z][a-z'-]+)?) (?:${SELF_REF_VERBS})\\b`, 'g');
// Exported: applyRenameMapping's head-noun word-pair fallback must never map
// these — a provisional name ending in a common OBJECT noun ("… Barrier" →
// "Shardwisp") otherwise rewrites every "the barrier" in the texts,
// including objects the abilities CREATE (live corruption: "the shardwisp
// lasts for 1 minute… any creature within the shardwisp gains half cover").
export const SELF_REF_STOP = new Set([
  'target', 'targets', 'creature', 'creatures', 'attacker', 'grappled',
  'swallowed', 'charmed', 'frightened', 'restrained', 'poisoned', 'cursed',
  'zone', 'area', 'effect', 'effects', 'damage', 'condition', 'save',
  'saving', 'attack', 'action', 'wall', 'portal', 'cloud', 'light',
  'darkness', 'fire', 'water', 'sphere', 'cone', 'line', 'cube', 'tentacle',
  'tentacles', 'head', 'heads', 'arm', 'legs', 'object', 'spell', 'curse',
  'disease', 'poison', 'venom', 'web', 'rope', 'chain', 'chains', 'weapon',
  'bite', 'claw', 'claws', 'tail', 'wing', 'wings', 'breath', 'gaze',
  'aura', 'magic', 'illusion', 'duplicate', 'duplicates', 'copy', 'image',
  'host', 'victim', 'wearer', 'user', 'initiative', 'result', 'roll',
  'first', 'second', 'new', 'barrier', 'shield', 'veil', 'field',
]);

/**
 * Find the block's dominant self-reference phrase if it violates the
 * name/type contract. Returns { phrase, count } or null. Exported so corpus
 * sweeps exercise the shipped logic, not a copy.
 */
export function findEpithetSelfReference(name, type, texts) {
  const ok = new Set([
    ...(name ?? '').toLowerCase().split(/[^a-z']+/),
    ...(type ?? '').toLowerCase().split(/[^a-z']+/),
    'swarm',
  ].filter(Boolean));
  const nameWords = (name ?? '').toLowerCase().split(/\s+/).filter(Boolean);
  const suffixOk = (tok) => tok.length >= 4 && nameWords.some((w) => w.endsWith(tok));
  const tally = new Map();
  for (const t of texts) {
    for (const m of (t ?? '').matchAll(SELF_REF_RE)) {
      tally.set(m[1], (tally.get(m[1]) ?? 0) + 1);
    }
  }
  const sorted = [...tally.entries()].sort((a, b) => b[1] - a[1]);
  if (!sorted.length) return null;
  const [phrase, count] = sorted[0];
  if (count < 2) return null;
  // Hyphen-split for membership so "the half-dragon" matches name words.
  const words = phrase.split(/[ -]+/).filter(Boolean);
  if (words.every((w) => ok.has(w))) return null;
  const last = words[words.length - 1];
  if (ok.has(last) || suffixOk(last)) return null;
  if (SELF_REF_STOP.has(words[0])) return null;
  return { phrase, count };
}
