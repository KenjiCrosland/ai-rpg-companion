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
const LOWERCASE_TERM_RE = /\b(hit points?|opportunity attacks?)\b/;

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

/** Highest count word in a Multiattack text ("makes two attacks: one... and one..."). */
function multiattackCount(monster) {
  const entry = (monster.sections?.Actions ?? []).find((e) => e.name?.startsWith('Multiattack'));
  if (!entry) return 1;
  const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
  let max = 1;
  for (const m of entry.text.matchAll(/\b(one|two|three|four|five|six|\d+)\b/gi)) {
    const v = WORDS[m[1].toLowerCase()] ?? Number(m[1]);
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

  // Entry names any attack reference may resolve against (parentheticals
  // like "(2/Day)" stripped, prefix matches allowed — mirrors the corpus
  // calibration).
  const entryNames = entriesOf(monster).map(({ entry }) => entry.name.replace(/\s*\(.*\)$/, ''));

  for (const { section, entry } of entriesOf(monster)) {
    const where = `${section}/${entry.name}`;
    const loc = { section, entry: entry.name };
    if (is2024) {
      if (/(Melee|Ranged)\s+(Weapon|Spell)\s+Attack/.test(entry.text)) {
        push('phrasing-2014', 'reject', `2014 attack phrasing in ${where} — use "Melee Attack Roll:" form`, undefined, loc);
      }
      if (/to hit(?! with spell attacks)/.test(entry.text)) {
        push('phrasing-to-hit', 'reject', `"to hit" phrasing in ${where} — 2024 attack lines carry no "to hit"`, undefined, loc);
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
    }
    for (const ref of entry.text.matchAll(ATTACK_REF_RE)) {
      const name = ref[1].trim();
      if (!entryNames.some((n) => n === name || n.startsWith(name))) {
        push('undefined-attack-ref', 'reject', `${where} references a "${name}" attack that is not defined anywhere in the statblock`, undefined, loc);
      }
    }
    if (SECOND_PERSON_RE.test(entry.text)) {
      push('second-person', 'reject', `Second-person voice in ${where} — statblocks are third person ("of the creature's choice", never "of your choice")`, undefined, loc);
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
    // Design vocabulary leaking into entry names ("Hungry Absorption
    // (Half-Damage Mode)") — slot/budget language is instructions, not
    // content; zero corpus occurrences. Renameable, like coinages.
    if (/\b(mode|nova|slot|budget|tier|dpr|half-damage)\b/i.test(entry.name)) {
      push('entry-name-design-term', 'reject', `${where}: entry name leaks design vocabulary — name the ability in-world (never "mode", "slot", "budget", "tier", "nova"). Rename it`, undefined, loc);
    }
    // Coined entry names ("Thul-eg"): official hyphenated names join FULL
    // English words (Shape-Shift, Mind-Rending Roar — every corpus fragment
    // is ≥4 letters); a sub-4-letter fragment marks a coinage. Ability names
    // must describe the ability; coinages belong to creature names only.
    {
      const base = entry.name.split(' (')[0];
      if (base.includes('-') && base.split('-').some((frag) => frag.length < 4)) {
        push('entry-name-coinage', 'reject', `${where}: entry name "${base}" reads as a coined word — ability names describe what the ability does in plain English (coined words belong to the creature's name only). Rename it`, undefined, loc);
      }
    }
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
      const sums = [...entry.text.matchAll(DAMAGE_EXPR_RE)].map((m) => Number(m[1]));
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
    // Matches both editions: "Melee Attack Roll: +9" and "Melee Weapon Attack: +7 to hit".
    const maxAttack = maxExtracted(monster, /Attack(?: Roll)?:\*?\s*\+(\d+)/g);
    if (maxAttack != null && Math.abs(maxAttack - chassis.attack_bonus) > 1) {
      push('attack-band', 'correctable', `Attack bonus +${maxAttack} outside ±1 of budget +${chassis.attack_bonus}`, chassis.attack_bonus);
    }
    // SAVE DCs only — check DCs (Investigation, escape DCs) are excluded, or
    // a high skill-check DC masks under-budget save DCs (live finding: an
    // Investigation DC 20 hid save DCs sitting 2 under a 21 budget).
    const maxDC = Math.max(
      maxExtracted(monster, /Saving Throw\*?:?\s*DC\s+(\d+)/gi) ?? -Infinity,
      maxExtracted(monster, /DC\s+(\d+)\s+\w+ saving throw/gi) ?? -Infinity,
    );
    if (Number.isFinite(maxDC) && Math.abs(maxDC - chassis.save_dc) > 1) {
      push('dc-band', 'correctable', `Save DC ${maxDC} outside ±1 of budget ${chassis.save_dc}`, chassis.save_dc);
    }
    // Swarm archetype demands the swarm type line (live finding: a 2014
    // swarm came out "Medium aberration" — the clause was missing from the
    // 2014 prompt). Deterministic: wrap the written type.
    if (chassis.archetype === 'swarm' && monster.type && !/^swarm of/i.test(monster.type)) {
      push('swarm-type', 'correctable', `Swarm-archetype type must read "Swarm of Tiny <Creature>", not "${monster.type}"`, `Swarm of Tiny ${monster.type.replace(/s$/i, '')}s`, { field: 'type' });
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
      if (plan[field] === 'forbidden' && (monster.sections?.[section] ?? []).length > 0) {
        push('section-structure', 'reject', `${section} are not allowed at this tier`);
      }
    }

    const nTraits = (monster.sections?.Traits ?? []).length;
    const nActions = actions.length;
    if (nTraits < plan.traits.min || nTraits > plan.traits.max) {
      push('counts', 'reject', `${nTraits} traits outside plan range [${plan.traits.min}, ${plan.traits.max}]`);
    }
    if (nActions < plan.actions.min || nActions > plan.actions.max) {
      push('counts', 'reject', `${nActions} actions outside plan range [${plan.actions.min}, ${plan.actions.max}]`);
    }
  }

  return { ok: findings.length === 0, findings };
}
