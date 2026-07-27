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
      if (/\*?Success:\*?\s*(?:No effect|None|The \w+ is not [A-Z]\w+)\.?/.test(entry.text)) {
        push('success-no-effect', 'reject', `${where}: a Success clause that does nothing — omit *Success:* entirely when success has no effect`, undefined, loc);
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
    // "uses X" / "a use of X" references must resolve too (live finding: a
    // Multiattack and a 1/Day both referenced "Wing Burst" after the recharge
    // action was renamed "Shardstorm" — the reuse texts were never rewritten,
    // leaving an unadjudicable block). Extraction handles alternations
    // ("Pummel or Spellcasting"), trailing words ("Nightmare Haunting
    // action", "Holy Burst twice"), and clause boundaries ("Bite while…") —
    // 26/26 official uses-references resolve under it.
    for (const ref of entry.text.matchAll(/\b(?:uses?|(?:a|one) use of)\s+(?:(?:a|one) use of\s+)?(?:its\s+)?([A-Z][\w' -]+?)(?= to cast|\s+again\b|\s+if\b|\s+without\b|\s+while\b|\s+when\b|[.,;:]|$)/g)) {
      for (const part of ref[1].split(/ or /)) {
        const name = part.replace(/^\([A-C]\)\s*/, '').replace(/\s+(?:action|attack|twice|once)$/, '').trim();
        if (!name || !/^[A-Z]/.test(name) || /^(?:Spellcasting|Multiattack)$/i.test(name)) continue;
        if (!entryNames.some((n) => n === name || n.startsWith(name))) {
          push('undefined-attack-ref', 'reject', `${where} references a use of "${name}", which is not defined anywhere in the statblock — rewrite the reference to name a real entry`, undefined, loc);
        }
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
    if (swarmNoHeal && /swarm regains \d+/i.test(entry.text)) {
      push('swarm-heal-contradiction', 'reject', `${where} heals the swarm, but the Swarm trait says it can't regain hit points — replace the healing with a different benefit`, undefined, loc);
    }
    if (/centred/.test(entry.text)) {
      push('spelling-centred', 'reject', `${where}: "centred" — the books use American spelling ("centered")`, undefined, loc);
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
    // Substance check for the swarm's half-damage obligation: the model can
    // satisfy the slot-TAG protocol without writing the mechanic (live
    // finding). The official clause must exist in an attack line.
    if (chassis.archetype === 'swarm'
      && !entriesOf(monster).some(({ entry }) => /half of its hit points or fewer/i.test(entry.text))) {
      const atk = entriesOf(monster).find(({ entry }) => ATTACK_LINE_RE.test(entry.text));
      push('swarm-half-damage', 'reject', `The swarm's main attack must carry the official reduced-damage clause: "..., or <about half> damage if the swarm has half of its Hit Points or fewer" — add it to the attack's Hit line`, undefined, atk ? { section: atk.section, entry: atk.entry.name } : undefined);
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
    // Resistance tokens must be damage types (canonical conditions are the
    // resistance-conditions rule's business — it moves them to immunities).
    // Anything else is junk ("Blindness, Deafness" — live finding; 5e has no
    // such resistances). Corpus: 0/329 real lines (one Half-Dragon template
    // placeholder string, moot under the chassis gate). Fix: drop the junk.
    if (is2024 && monster.resistances) {
      const toks = splitTokens(monster.resistances);
      const junk = toks.filter((t) => !DAMAGE_TYPE_WORD_RE.test(t) && !CONDITION_TOKEN_SET.has(t.toLowerCase()));
      if (junk.length) {
        const kept = toks.filter((t) => !junk.includes(t));
        push('resistance-unknown', 'correctable',
          `Resistances carry tokens that are neither damage types nor conditions (${junk.join(', ')}) — dropped`,
          kept.join(', '), { field: 'resistances' });
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
        const reuse = /\buses ([A-Z][\w' -]+?)(?:\s+again|\s+to cast|[.,]|$)/.exec(entry.text);
        if (!reuse || /^spellcasting$/i.test(reuse[1].trim())) continue;
        const target = actions.find((a) => baseName(a.name) === baseName(reuse[1]));
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
        for (const g of multi.text.matchAll(/(?:replace[^.]*? with (?:a use of |one use of )?|can use |and uses |or uses )([^.]+?)(?= in place of| if available|\.|$)/gi)) {
          for (const part of g[1].split(/ or |, /)) {
            referenced.push(part.replace(/^\([A-C]\)\s*/, '').replace(/ to cast.*/, '').trim());
          }
        }
        for (const name of referenced) {
          const target = actions.find((a) => baseName(a.name) === baseName(name));
          if (!target || /Attack Roll/i.test(target.text)) continue;
          if (/\((?:Recharge|\d+\s*\/\s*Day)/i.test(target.name)) continue;
          const dmg = Math.max(0, ...[...target.text.matchAll(/(\d+)\s*\(\d+d\d+/g)].map((mm) => Number(mm[1])));
          if (dmg > perAttack * 2) {
            push('multiattack-substitution', 'correctable',
              `Actions/Multiattack: weaves in "${target.name}" (${dmg} damage, above the ${perAttack * 2} cap = 2× per-attack) — the single-target save number is a standalone action, never a Multiattack component; the reference is removed`,
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
      const HYBRID_SAME = /(?:forces?|compels?|targets?|chooses?|must (?:make|succeed on))[^.]*?Saving Throw\*?:?\s*DC \d+,\s*(?:one|each) creature/i;
      const HYBRID_ADJACENT = /(?:targets?|chooses?|forces?)[^.]*? (?:one|each) creature[^.]*\.\s*\*?\w+ Saving Throw\*?:?\s*DC \d+,\s*(?:one|each) creature/i;
      for (const { section, entry } of entriesOf(monster)) {
        if (HYBRID_SAME.test(entry.text) || HYBRID_ADJACENT.test(entry.text)) {
          push('hybrid-targeting', 'reject',
            `${section}/${entry.name}: the lead-in already names the target, then the save skeleton adds a second targeting clause — keep ONE: either "<Ability> Saving Throw: DC N, <the real target>." with no forcing lead-in, or fold the constraint into the skeleton's targeting clause`,
            undefined, { section, entry: entry.name });
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
        const TRIGGER_RE = /\b(when|whenever|if (?:a|an|the|another|it) |at the (?:start|end)|starts its turn|enters|ends its turn|is hit|takes .* damage|while (?:in|within|it))\b/i;
        for (const entry of monster.sections?.Traits ?? []) {
          const skel = /Saving Throw\*?:?\s*DC \d+,\s*(?:one|each) creature/i.exec(entry.text);
          // The trigger must appear BEFORE the Failure clause — scanning the
          // whole entry let the Failure clause's own "takes 44 damage"
          // satisfy the trigger check (live finding: Softening Tremor, a
          // (1/Day) 44-damage save nuke that shipped in Traits). Pre-Failure
          // (not pre-skeleton) because officials put aura triggers in the
          // TARGETING clause: the Aboleth's "each creature that touches the
          // aboleth ... while within 5 feet".
          const preFailure = entry.text.split(/\*?\bFailure:?\*?/i)[0];
          if (skel && !TRIGGER_RE.test(preFailure)) {
            push('trait-imposes-save', 'correctable',
              `Traits/${entry.name}: a Trait never forces a saving throw without a trigger — as written this ability can never fire; it moves to Actions`,
              undefined, { section: 'Traits', entry: entry.name });
          }
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

    // Entries the trait-imposes-save fix relocated from Traits to Actions
    // still count against their ORIGINAL section's plan range — relocation is
    // a correction, not a redesign, and must never trigger the counts reject
    // it would otherwise cause (the exempt half of relocate-and-exempt).
    const relocated = actions.filter((e) => e.relocated).length;
    const nTraits = (monster.sections?.Traits ?? []).length + relocated;
    const nActions = actions.length - relocated;
    if (nTraits < plan.traits.min || nTraits > plan.traits.max) {
      push('counts', 'reject', `${nTraits} traits outside plan range [${plan.traits.min}, ${plan.traits.max}]`);
    }
    if (nActions < plan.actions.min || nActions > plan.actions.max) {
      push('counts', 'reject', `${nActions} actions outside plan range [${plan.actions.min}, ${plan.actions.max}]`);
    }
  }

  return { ok: findings.length === 0, findings };
}
